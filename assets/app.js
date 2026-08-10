/* ==========================================================================
   EIP Study — 공통 스크립트
   - 테마(라이트/다크) 전환
   - 마크다운 렌더링 (marked) + 다이어그램 (mermaid)
   - 사이드바 목차 : 챕터의 모든 섹션을 링크로, 현재 섹션은 소제목까지 펼침
   - 섹션 단위 학습 완료 체크 + 진도율 (localStorage)
   - 챕터 전체 검색 (검색을 열 때만 본문을 내려받음)
   - 읽기 진행바, 맨 위로, 모바일 서랍 메뉴
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- 저장소 */
  var NS = 'eip.';
  var store = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem(NS + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch (e) {}
    },
    remove: function (key) {
      try { localStorage.removeItem(NS + key); } catch (e) {}
    },
    keys: function () {
      var out = [];
      try {
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (k && k.indexOf(NS) === 0) out.push(k.slice(NS.length));
        }
      } catch (e) {}
      return out;
    }
  };

  /* ------------------------------------------------------------------ 테마 */
  var theme = {
    apply: function (mode) {
      document.documentElement.setAttribute('data-theme', mode);
      var btn = document.querySelector('.js-theme');
      if (btn) {
        btn.textContent = mode === 'dark' ? '☀️' : '🌙';
        btn.setAttribute('aria-label', mode === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
      }
      document.dispatchEvent(new CustomEvent('themechange', { detail: { mode: mode } }));
    },
    current: function () {
      return document.documentElement.getAttribute('data-theme') || 'light';
    },
    init: function () {
      var saved = store.get('theme', null);
      var mode = saved || (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      this.apply(mode);

      var btn = document.querySelector('.js-theme');
      if (btn) {
        btn.addEventListener('click', function () {
          var next = theme.current() === 'dark' ? 'light' : 'dark';
          store.set('theme', next);
          theme.apply(next);
        });
      }
    }
  };

  /* -------------------------------------------------------------- 작은 도구 */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function debounce(fn, ms) {
    var t;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms);
    };
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function escapeRe(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function slugify(text) {
    return String(text)
      .trim()
      .toLowerCase()
      .replace(/[📌🖼️⭐⚠️💡✅❌]/g, '')
      .replace(/[^\w가-힣ㄱ-ㅎㅏ-ㅣ().\- ]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'sec';
  }
  function queryParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }

  /* 이 페이지가 속한 챕터 정보 */
  var CH = window.EIP_CHAPTER || null;

  function doneList() {
    if (!CH) return [];
    var v = store.get('done.' + CH.id, []);
    return Object.prototype.toString.call(v) === '[object Array]' ? v : [];
  }
  function setDone(file, on) {
    var cur = doneList();
    var at = cur.indexOf(file);
    if (on && at < 0) cur.push(file);
    if (!on && at >= 0) cur.splice(at, 1);
    store.set('done.' + CH.id, cur);
    saveMeta();
    return cur;
  }
  function saveMeta() {
    if (!CH) return;
    store.set('meta.' + CH.id, {
      total: CH.sections.length,
      title: CH.subtitle || CH.title,
      updated: Date.now()
    });
  }
  function sectionHref(file) {
    return CH.base + CH.id + '/' + file;
  }

  /* ============================ 진도 요약 (index.html · chapters.html 공통) */
  /* 챕터별 진도는 chapters.html 에만 있고, 홈에는 카드가 없다.
     그래서 총계는 **카드 DOM 이 아니라 EIP_TOC 로** 센다 — 홈에서도 값이 나와야 한다.
     toc.js 에 12챕터의 섹션 목록이 있어 카드 없이도 총 섹션 수를 알 수 있다.

     ⚠️ 실제 총계는 eip.meta.chNN(그 챕터를 한 번이라도 연 기록)을 우선한다.
        toc 는 빌드 시점의 값이고 meta 는 사용자가 실제로 본 페이지의 값이라
        둘이 어긋나면 meta 가 맞다. */
  function chapterIds() {
    var out = [], k;
    if (window.EIP_TOC) {
      for (k in window.EIP_TOC) {
        if (Object.prototype.hasOwnProperty.call(window.EIP_TOC, k)) out.push(k);
      }
      out.sort();
    }
    return out;
  }

  function chapterTotal(id) {
    var meta = store.get('meta.' + id, null);
    if (meta && meta.total) return meta.total;
    var toc = window.EIP_TOC && window.EIP_TOC[id];
    return (toc && toc.s) ? toc.s.length : 0;
  }

  function chapterDone(id) {
    var raw = store.get('done.' + id, []);
    return (Object.prototype.toString.call(raw) === '[object Array]' ? raw : []).length;
  }

  function initHome() {
    var host = $('.js-chapters');
    var ids = chapterIds();
    var totalAll = 0, doneAll = 0, i, id, total, done;

    /* 챕터 카드가 있는 페이지(chapters.html)에서는 카드마다 진도를 그린다 */
    if (host) {
      $$('.js-progress', host).forEach(function (node) {
        var cid = node.getAttribute('data-chapter');
        var t = chapterTotal(cid);
        var d = chapterDone(cid);
        var pct = t ? Math.round(d / t * 100) : 0;
        var card = node.closest('.card') || node.parentNode;
        var bar = $('.bar > i', card);
        var lbl = $('.js-progress-label', node);
        if (bar) bar.style.width = pct + '%';
        if (lbl) {
          lbl.textContent = t ? d + ' / ' + t + '개 섹션 · ' + pct + '%' : '아직 열어보지 않음';
        }
      });
    }

    /* 총계는 카드 유무와 무관하게 센다 */
    if (ids.length) {
      for (i = 0; i < ids.length; i++) {
        id = ids[i];
        total = chapterTotal(id);
        done = chapterDone(id);
        totalAll += total;
        doneAll += Math.min(done, total || done);
      }
    } else if (host) {
      /* toc.js 가 없는 페이지를 위한 대비 — 카드에서 센다 */
      $$('.js-progress', host).forEach(function (node) {
        var cid = node.getAttribute('data-chapter');
        totalAll += chapterTotal(cid);
        doneAll += chapterDone(cid);
      });
    }

    var pctAll = totalAll ? Math.round(doneAll / totalAll * 100) : 0;
    var oBar = $('.js-overall-bar');
    var oPct = $('.js-overall-pct');
    var oTxt = $('.js-overall-text');
    if (oBar) oBar.style.width = pctAll + '%';
    if (oPct) oPct.textContent = pctAll + '%';
    if (oTxt) {
      oTxt.textContent = totalAll
        ? doneAll + ' / ' + totalAll + '개 섹션 완료'
        : '챕터를 한 번 열면 진도 추적이 시작됩니다';
    }

    /* 홈의 「학습 정리본」 카드 — 들어가지 않아도 진도가 보이게 */
    var sum = $('.js-summary-sections');
    if (sum) {
      sum.textContent = totalAll
        ? doneAll + ' / ' + totalAll + '개 섹션 · ' + pctAll + '%'
        : '챕터를 한 번 열면 진도가 보입니다';
    }
  }

  /* ------------------------------------------------------------- 초기화 버튼 */
  /* 두 갈래다. "진도만"은 done. 만 지우고, "전체"는 eip. 로 시작하는 학습 기록을
     통째로 지운다. 어떤 것이 지워지는지 확인 문구에 반드시 적는다 —
     오답노트와 저장한 문제는 다시 만들 수 없는 기록이다. */
  function initReset() {
    /* 학습 기록이 아니라서 전체 초기화에서도 남기는 키.
       📌 T8 에서 만들 6자리 동기화 코드(sync.*)도 여기 넣어야 한다.
          안 그러면 초기화 한 번에 다른 기기와의 연결이 끊긴다. */
    var KEEP = ['theme'];

    function isKept(key) {
      var i;
      for (i = 0; i < KEEP.length; i++) {
        if (key === KEEP[i] || key.indexOf(KEEP[i] + '.') === 0) return true;
      }
      return false;
    }

    var reset = $('.js-reset');
    if (reset) {
      reset.addEventListener('click', function () {
        if (!confirm('섹션 학습 완료 표시를 모두 지웁니다.\n' +
                     '오답노트와 저장한 문제는 그대로 남습니다.\n\n계속할까요?')) return;
        store.keys().forEach(function (k) {
          if (k.indexOf('done.') === 0) store.remove(k);
        });
        location.reload();
      });
    }

    var resetAll = $('.js-reset-all');
    if (resetAll) {
      resetAll.addEventListener('click', function () {
        if (!confirm('이 브라우저에 쌓인 학습 기록을 전부 지웁니다.\n\n' +
                     '  · 섹션 학습 진도\n' +
                     '  · 오답노트 (틀린 횟수 · 분류)\n' +
                     '  · ★ 저장한 문제\n' +
                     '  · 저장한 암기 카드\n\n' +
                     '되돌릴 수 없습니다. 계속할까요?')) return;
        store.keys().forEach(function (k) {
          if (!isKept(k)) store.remove(k);
        });
        location.reload();
      });
    }
  }

  /* ------------------------------------------------- 사이드바 목차 (공통) */
  function buildSidebar(doc) {
    var nav = $('#toc');
    if (!nav || !CH) return;

    var done = doneList();
    var list = el('ul', 'toc');

    CH.sections.forEach(function (sec, idx) {
      var isCurrent = CH.page === 'section' && idx === CH.index;

      var li = el('li');
      var row = el('div', 'toc__row');

      var a = el('a');
      a.href = sectionHref(sec.f);
      a.appendChild(el('span', 'num', sec.n === '·' ? '·' : sec.n + '.'));
      a.appendChild(document.createTextNode(' ' + sec.t));
      if (done.indexOf(sec.f) >= 0) a.classList.add('done');
      if (isCurrent) a.classList.add('is-active');
      row.appendChild(a);
      li.appendChild(row);

      /* 현재 보고 있는 섹션만 소제목(H3)을 펼쳐 준다 */
      if (isCurrent && doc) {
        var subs = $$('h3', doc);
        if (subs.length) {
          var sublist = el('ul', 'toc__sub is-open');
          subs.forEach(function (h3) {
            var sli = el('li');
            var sa = el('a');
            sa.href = '#' + h3.id;
            sa.setAttribute('data-target', h3.id);
            sa.textContent = h3.textContent.trim();
            sli.appendChild(sa);
            sublist.appendChild(sli);
          });
          li.appendChild(sublist);
        }
      }

      list.appendChild(li);
    });

    nav.appendChild(list);

    /* 소제목 클릭 → 부드럽게 이동 */
    nav.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[data-target]') : null;
      if (!a) return;
      e.preventDefault();
      var target = document.getElementById(a.getAttribute('data-target'));
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + target.id);
      closeSidebar();
    });

    paintProgress();

    /* 현재 섹션이 사이드바 화면 밖이면 보이는 위치로 당겨 온다 */
    var active = $('#toc a.is-active');
    var box = $('.sidebar__body');
    if (active && box) {
      var ar = active.getBoundingClientRect();
      var br = box.getBoundingClientRect();
      if (ar.top < br.top || ar.bottom > br.bottom) {
        box.scrollTop += (ar.top - br.top) - (box.clientHeight / 2);
      }
    }
  }

  function paintProgress() {
    if (!CH) return;
    var n = doneList().length;
    var total = CH.sections.length;
    var pct = total ? Math.round(n / total * 100) : 0;
    $$('.js-chapter-progress').forEach(function (node) {
      node.textContent = n + '/' + total + ' · ' + pct + '%';
    });
    $$('.js-overall-bar').forEach(function (node) { node.style.width = pct + '%'; });
    $$('.js-overall-text').forEach(function (node) {
      node.textContent = n + ' / ' + total + '개 섹션 완료 · ' + pct + '%';
    });
  }

  /* ============================================ 챕터 목차 페이지 (chNN.html) */
  function initChapterIndex() {
    if (!CH || CH.page !== 'index') return;

    var head = $('.chapterhead__title');
    if (head) head.textContent = CH.subtitle || CH.title;

    /* 소개 문단(마크다운) 렌더링 */
    var src = $('#markdown-source');
    var intro = $('#intro');
    if (src && intro && typeof window.marked !== 'undefined') {
      window.marked.setOptions({ gfm: true, breaks: false });
      intro.innerHTML = window.marked.parse(src.textContent);
      decorateQuotes(intro);
    }

    var host = $('.js-seclist');
    if (!host) return;

    var done = doneList();

    CH.sections.forEach(function (sec) {
      var isDone = done.indexOf(sec.f) >= 0;

      var row = el('div', 'seclist__item' + (isDone ? ' is-done' : ''));

      var a = el('a', 'seclist__link');
      a.href = sectionHref(sec.f);
      a.appendChild(el('span', 'seclist__num', sec.n === '·' ? '·' : sec.n));
      a.appendChild(el('span', 'seclist__title', sec.t));
      row.appendChild(a);

      var btn = el('button', 'seclist__check');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', isDone ? 'true' : 'false');
      btn.setAttribute('aria-label', sec.t + ' 학습 완료 표시');
      btn.title = '학습 완료 표시';
      btn.appendChild(el('span', 'box'));
      btn.addEventListener('click', function () {
        var nowDone = btn.getAttribute('aria-pressed') !== 'true';
        setDone(sec.f, nowDone);
        btn.setAttribute('aria-pressed', nowDone ? 'true' : 'false');
        row.classList.toggle('is-done', nowDone);
        paintProgress();
        refreshSidebarDone();
      });
      row.appendChild(btn);

      host.appendChild(row);
    });

    saveMeta();
    paintProgress();
  }

  function refreshSidebarDone() {
    var done = doneList();
    var links = $$('#toc > ul.toc > li > .toc__row > a');
    links.forEach(function (a, idx) {
      if (!CH.sections[idx]) return;
      a.classList.toggle('done', done.indexOf(CH.sections[idx].f) >= 0);
    });
  }

  /* ============================================== 섹션 페이지 (chNN/sMM.html) */
  function initSection() {
    if (!CH || CH.page !== 'section') return;

    var src = $('#markdown-source');
    var doc = $('#doc');
    if (!src || !doc) return;

    if (typeof window.marked === 'undefined') {
      doc.innerHTML =
        '<div class="formula" style="flex-direction:column;gap:6px">' +
        '<strong>본문을 불러오지 못했습니다.</strong>' +
        '<span class="cond">인터넷 연결을 확인한 뒤 새로고침해 주세요. ' +
        '(마크다운 렌더러를 CDN에서 가져옵니다)</span></div>';
      return;
    }

    window.marked.setOptions({ gfm: true, breaks: false });
    doc.innerHTML = window.marked.parse(src.textContent);

    /* 제목에 고정 id 부여 */
    var used = {};
    $$('h2, h3, h4', doc).forEach(function (h) {
      var base = slugify(h.textContent);
      var id = base, n = 2;
      while (used[id]) { id = base + '-' + n++; }
      used[id] = true;
      h.id = id;
    });

    wrapTables(doc);
    decorateQuotes(doc);
    var diagrams = extractDiagrams(doc);

    buildSidebar(doc);
    buildPageNav();
    buildDoneButton(doc);
    renderDiagrams(diagrams);
    initReadingProgress();

    /* 검색 결과로 들어온 경우 해당 부분으로 이동 */
    var q = queryParam('q');
    if (q) setTimeout(function () { flashMatch(doc, q); }, 80);

    if (location.hash) {
      var t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t) setTimeout(function () { t.scrollIntoView({ block: 'start' }); }, 60);
    }
  }

  function wrapTables(doc) {
    $$('table', doc).forEach(function (table) {
      var wrap = el('div', 'tablewrap');
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);

      var hint = el('p', 'scrollhint', '← 좌우로 밀어서 표 전체 보기');
      wrap.parentNode.insertBefore(hint, wrap.nextSibling);

      var check = function () {
        wrap.classList.toggle('is-scrollable', table.scrollWidth > wrap.clientWidth + 4);
      };
      check();
      window.addEventListener('resize', debounce(check, 200));
    });
  }

  function decorateQuotes(doc) {
    $$('blockquote', doc).forEach(function (q) {
      var t = q.textContent;
      if (t.indexOf('⚠️') >= 0) q.classList.add('is-warn');
      else if (t.indexOf('💡') >= 0 || t.indexOf('📌') >= 0) q.classList.add('is-tip');
    });
  }

  function extractDiagrams(doc) {
    var diagrams = [];
    $$('pre > code.language-mermaid', doc).forEach(function (code) {
      var definition = code.textContent;
      var pre = code.parentNode;

      var box = el('div', 'diagram diagram--pending');
      var target = el('div', 'mermaid');
      target.textContent = definition;
      box.appendChild(target);

      var zoom = el('button', 'diagram__zoom', '⤢');
      zoom.type = 'button';
      zoom.title = '크게 보기';
      zoom.setAttribute('aria-label', '다이어그램 크게 보기');
      box.appendChild(zoom);

      pre.parentNode.replaceChild(box, pre);
      diagrams.push({ box: box, target: target, def: definition });
    });
    return diagrams;
  }

  /* 이 섹션의 학습 완료 버튼 */
  function buildDoneButton(doc) {
    var sec = CH.sections[CH.index];
    if (!sec) return;

    var isDone = doneList().indexOf(sec.f) >= 0;

    var btn = el('button', 'sectiondone');
    btn.type = 'button';
    btn.setAttribute('aria-pressed', isDone ? 'true' : 'false');
    btn.appendChild(el('span', 'box'));
    btn.appendChild(el('span', null, '이 섹션 학습 완료'));
    btn.addEventListener('click', function () {
      var nowDone = btn.getAttribute('aria-pressed') !== 'true';
      setDone(sec.f, nowDone);
      btn.setAttribute('aria-pressed', nowDone ? 'true' : 'false');
      paintProgress();
      refreshSidebarDone();
    });
    doc.appendChild(btn);

    saveMeta();
  }

  /* 이전 / 다음 섹션 */
  function buildPageNav() {
    var host = $('.js-pagenav');
    if (!host) return;

    var prev = CH.sections[CH.index - 1];
    var next = CH.sections[CH.index + 1];

    if (prev) {
      var pa = el('a', 'pagenav__btn pagenav__btn--prev');
      pa.href = sectionHref(prev.f);
      pa.appendChild(el('span', 'pagenav__dir', '← 이전'));
      pa.appendChild(el('span', 'pagenav__title', prev.t));
      host.appendChild(pa);
    } else {
      host.appendChild(el('span', 'pagenav__spacer'));
    }

    var up = el('a', 'pagenav__up');
    up.href = CH.base + CH.id + '.html';
    up.textContent = '목차';
    host.appendChild(up);

    if (next) {
      var na = el('a', 'pagenav__btn pagenav__btn--next');
      na.href = sectionHref(next.f);
      na.appendChild(el('span', 'pagenav__dir', '다음 →'));
      na.appendChild(el('span', 'pagenav__title', next.t));
      host.appendChild(na);
    } else {
      host.appendChild(el('span', 'pagenav__spacer'));
    }
  }

  /* 검색어와 일치하는 첫 부분으로 이동 + 잠깐 강조 */
  function flashMatch(doc, q) {
    var needle = q.toLowerCase();
    var nodes = $$('h2, h3, h4, p, li, td, th, blockquote', doc);
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].textContent.toLowerCase().indexOf(needle) >= 0) {
        nodes[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        nodes[i].classList.add('flash');
        (function (node) {
          setTimeout(function () { node.classList.remove('flash'); }, 2200);
        })(nodes[i]);
        return;
      }
    }
  }

  /* --------------------------------------------------- 다이어그램(mermaid) */
  function renderDiagrams(diagrams) {
    var lb = $('#lightbox');
    var lbInner = $('#lightbox-inner');

    if (diagrams.length) {
      if (typeof window.mermaid === 'undefined') {
        diagrams.forEach(function (d) {
          d.box.classList.remove('diagram--pending');
          var pre = el('pre');
          var code = el('code');
          code.textContent = d.def;
          pre.appendChild(code);
          d.box.innerHTML = '';
          d.box.appendChild(pre);
        });
      } else {
        var run = function () {
          var dark = theme.current() === 'dark';
          window.mermaid.initialize({
            startOnLoad: false,
            theme: dark ? 'dark' : 'default',
            securityLevel: 'loose',
            fontFamily: 'inherit',
            flowchart: { htmlLabels: true, curve: 'basis', useMaxWidth: true },
            sequence: { useMaxWidth: true, wrap: true },
            'class': { useMaxWidth: true },
            'state': { useMaxWidth: true }
          });

          var nodes = diagrams.map(function (d) {
            d.target.removeAttribute('data-processed');
            d.target.innerHTML = '';
            d.target.textContent = d.def;
            return d.target;
          });

          var settle = function (err) {
            if (err) console.warn('mermaid 렌더링 실패:', err);
            diagrams.forEach(function (d) { d.box.classList.remove('diagram--pending'); });
          };

          try {
            var ran = window.mermaid.run({ nodes: nodes });
            if (ran && typeof ran.then === 'function') {
              ran.then(function () { settle(); }, settle);
            } else {
              settle();
            }
          } catch (err) {
            settle(err);
          }
        };

        run();
        document.addEventListener('themechange', debounce(run, 60));
      }
    }

    if (!lb || !lbInner) return;

    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.diagram__zoom') : null;
      if (!btn) return;
      var svg = $('svg', btn.parentNode);
      if (!svg) return;
      lbInner.innerHTML = svg.outerHTML;
      var clone = $('svg', lbInner);
      if (clone) {
        clone.removeAttribute('style');
        clone.style.width = 'auto';
        clone.style.minWidth = '640px';
      }
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    var closeLb = function () {
      lb.classList.remove('is-open');
      lbInner.innerHTML = '';
      document.body.style.overflow = '';
    };
    lb.addEventListener('click', function (e) {
      if (e.target === lb || (e.target.closest && e.target.closest('.lightbox__close'))) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLb();
    });
  }

  /* ------------------------------------------------------------- 읽기 진행바 */
  function initReadingProgress() {
    var bar = $('#readbar');
    if (!bar) return;

    var update = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', debounce(update, 150));
    update();
  }

  /* --------------------------------------------------- 맨 위로 / 맨 아래로 */
  /* 섹션이 길다. 특히 문항이 16~18개 붙는 챕터는 스크롤이 상당해서
     "맨 아래로"가 퀴즈·학습 완료 버튼으로 가는 지름길이 된다.

     빌드 산출물에는 ↑ 버튼 하나만 들어 있다. ↓ 는 여기서 만들어 붙인다 —
     페이지 껍데기를 고치면 226개 산출물을 다시 만들어야 하고,
     이 사이트는 어차피 화면 대부분을 JS 로 그린다. */
  var SCROLL_EDGE = 400;   /* 이만큼 떨어져 있어야 버튼이 나타난다 */

  function initScrollNav() {
    var nav = el('div', 'scrollnav');
    var up = $('#totop');

    if (up) {
      up.parentNode.insertBefore(nav, up);
      nav.appendChild(up);
    } else {
      up = el('button', 'totop', '↑');
      up.type = 'button';
      up.id = 'totop';
      up.setAttribute('aria-label', '맨 위로');
      nav.appendChild(up);
      document.body.appendChild(nav);
    }

    var down = el('button', 'totop', '↓');
    down.type = 'button';
    down.setAttribute('aria-label', '맨 아래로');
    down.title = '맨 아래로';
    nav.appendChild(down);

    var update = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      /* 스크롤할 것이 별로 없는 페이지에서는 둘 다 숨긴다 */
      var worth = max > SCROLL_EDGE;
      up.classList.toggle('is-show', worth && h.scrollTop > SCROLL_EDGE);
      down.classList.toggle('is-show', worth && (max - h.scrollTop) > SCROLL_EDGE);
    };

    up.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    down.addEventListener('click', function () {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', debounce(update, 150));
    /* 본문·퀴즈가 그려지면 문서 높이가 달라진다. 스크롤이 없어도 다시 재 준다. */
    window.addEventListener('load', update);
    setTimeout(update, 400);
    update();
  }

  /* ------------------------------------------------------- 챕터 전체 검색 */
  function initSearch() {
    var overlay = $('#search');
    var input = $('#search-input');
    var results = $('#search-results');
    if (!overlay || !input || !results || !CH) return;

    var index = null;      // [{file, title, text}]
    var loading = false;
    var failed = false;
    var cursor = -1;
    var shown = [];

    function corpusName() { return 'EIP_SEARCH_' + CH.id; }

    function loadCorpus(cb) {
      if (index) { cb(); return; }
      if (window[corpusName()]) { buildIndex(); cb(); return; }
      if (loading) return;
      loading = true;

      var s = document.createElement('script');
      s.src = CH.base + 'assets/search-' + CH.id + '.js';
      s.onload = function () {
        loading = false;
        buildIndex();
        cb();
      };
      s.onerror = function () {
        loading = false;
        failed = true;
        cb();
      };
      document.head.appendChild(s);
    }

    function buildIndex() {
      var corpus = window[corpusName()] || [];
      index = [];
      corpus.forEach(function (sec) {
        var lines = String(sec.x).split('\n');
        lines.forEach(function (line) {
          var text = line
            .replace(/^[#>\-*\d.\s|]+/, '')
            .replace(/[*`|]/g, '')
            .replace(/<br\s*\/?>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          if (text.length < 2) return;
          index.push({ file: sec.f, title: sec.t, text: text });
        });
      });
    }

    function render(query) {
      results.innerHTML = '';
      shown = [];
      cursor = -1;

      var q = query.trim().toLowerCase();
      if (q.length < 1) {
        results.innerHTML = '<div class="search__empty">검색어를 입력하세요<br>예: 스크럼, DFD, COCOMO, 다중도</div>';
        return;
      }
      if (failed) {
        results.innerHTML = '<div class="search__empty">검색 자료를 불러오지 못했습니다</div>';
        return;
      }
      if (!index) {
        results.innerHTML = '<div class="search__empty">본문을 불러오는 중…</div>';
        return;
      }

      var hits = [];
      for (var i = 0; i < index.length && hits.length < 60; i++) {
        var at = index[i].text.toLowerCase().indexOf(q);
        if (at >= 0) hits.push({ item: index[i], at: at });
      }

      if (!hits.length) {
        results.innerHTML = '<div class="search__empty">결과가 없습니다</div>';
        return;
      }

      hits.forEach(function (hit) {
        var t = hit.item.text;
        var start = Math.max(0, hit.at - 34);
        var snippet = (start > 0 ? '…' : '') + t.slice(start, hit.at + q.length + 90);

        var a = el('a', 'search__item');
        a.href = sectionHref(hit.item.file) + '?q=' + encodeURIComponent(query.trim());
        a.appendChild(el('div', 'search__sec', hit.item.title));

        var txt = el('div', 'search__txt');
        var re = new RegExp('(' + escapeRe(q) + ')', 'ig');
        txt.innerHTML = escapeHtml(snippet).replace(re, '<b>$1</b>');
        a.appendChild(txt);

        results.appendChild(a);
        shown.push(a);
      });
    }

    function open() {
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      input.value = '';
      render('');
      loadCorpus(function () { render(input.value); });
      setTimeout(function () { input.focus(); }, 30);
    }
    function close() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    $$('.js-search').forEach(function (b) { b.addEventListener('click', open); });

    input.addEventListener('input', debounce(function () { render(input.value); }, 130));

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', function (e) {
      var isOpen = overlay.classList.contains('is-open');

      if ((e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey))) && !isOpen) {
        var tag = (document.activeElement && document.activeElement.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        open();
        return;
      }
      if (!isOpen) return;

      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!shown.length) return;
        if (cursor >= 0) shown[cursor].classList.remove('is-cursor');
        cursor = e.key === 'ArrowDown'
          ? (cursor + 1) % shown.length
          : (cursor - 1 + shown.length) % shown.length;
        shown[cursor].classList.add('is-cursor');
        shown[cursor].scrollIntoView({ block: 'nearest' });
      }
      if (e.key === 'Enter' && cursor >= 0) {
        e.preventDefault();
        shown[cursor].click();
      }
    });
  }

  /* ------------------------------------------------------ 모바일 서랍 메뉴 */
  function closeSidebar() {
    var sb = $('#sidebar'), sc = $('#scrim');
    if (sb) sb.classList.remove('is-open');
    if (sc) sc.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function initSidebar() {
    var sb = $('#sidebar'), sc = $('#scrim');
    if (!sb) return;

    var openSidebar = function () {
      sb.classList.add('is-open');
      if (sc) sc.classList.add('is-open');
      if (window.innerWidth < 1060) document.body.style.overflow = 'hidden';
    };

    $$('.js-menu').forEach(function (b) { b.addEventListener('click', openSidebar); });
    $$('.js-menu-close').forEach(function (b) { b.addEventListener('click', closeSidebar); });
    if (sc) sc.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSidebar();
    });
    window.addEventListener('resize', debounce(function () {
      if (window.innerWidth >= 1060) closeSidebar();
    }, 150));
  }

  /* ----------------------------------------------------------------- 시작 */
  function boot() {
    theme.init();
    initSidebar();
    initHome();
    initReset();
    initScrollNav();

    if (CH && CH.page === 'index') {
      buildSidebar(null);
      initChapterIndex();
      renderDiagrams([]);
    }
    if (CH && CH.page === 'section') {
      initSection();
    }
    initSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.EIP = { store: store, theme: theme };
})();
