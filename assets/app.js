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
      .replace(/[📌🖼️★⚠️💡✅❌]/g, '')
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

  /* ==================================== 진도 요약 (chapters.html 전용) */
  /* 📌 **홈에는 진도를 그리지 않는다** (2026-08-10, 사용자 결정).
     같은 숫자를 두 곳에서 보여 줄 이유가 없고, 홈은 도구를 고르는 자리다.
     그래서 이 함수는 홈에서 그릴 것을 하나도 못 찾고 조용히 끝난다.

     총계는 **카드 DOM 이 아니라 EIP_TOC 로** 센다. 카드가 없어도 값이 나오고,
     카드 12장의 합과도 어긋나지 않는다.

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
    /* 🚨 챕터·섹션 페이지에서는 손대지 않는다.
       거기의 `.js-overall-*` 은 **그 챕터의 진도**를 보여 주는 자리고
       paintProgress() 가 맡는다. 둘이 같은 요소에 쓰면 순서 싸움이 된다 —
       toc.js 를 섹션 페이지에도 싣게 되면서 실제로 부딪히기 시작했다. */
    if (CH) return;

    var host = $('.js-chapters');
    var oBar = $('.js-overall-bar');
    var oPct = $('.js-overall-pct');
    var oTxt = $('.js-overall-text');
    if (!host && !oBar && !oPct && !oTxt) return;   /* 홈·도구 페이지 — 그릴 것이 없다 */

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
    if (oBar) oBar.style.width = pctAll + '%';
    if (oPct) oPct.textContent = pctAll + '%';
    if (oTxt) {
      oTxt.textContent = totalAll
        ? doneAll + ' / ' + totalAll + '개 섹션 완료'
        : '챕터를 한 번 열면 진도 추적이 시작됩니다';
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

    /* 🚨 `confirm()` 을 쓰지 않는다 — 제목 줄을 코드로 못 바꿔 앱 이름이나 도메인이 붙는다
       (VS Code 내장 브라우저에서는 "Code"). 대화상자는 `dialog.js` 한 벌뿐이다. */
    function ask(opts) {
      if (window.EIP_DIALOG) { window.EIP_DIALOG.confirm(opts); return; }
      /* dialog.js 가 없는 페이지에서도 되돌릴 수 없는 일이 조용히 실행되면 안 된다 */
      if (window.confirm(opts.title + '\n\n' + (opts.body || ''))) opts.onOk();
    }

    var reset = $('.js-reset');
    if (reset) {
      reset.addEventListener('click', function () {
        ask({
          title: '진도만 초기화할까요?',
          sub: '섹션 학습 완료 표시',
          body: '오답노트 · ★ 저장한 문제 · 암기 카드 · 메모는 그대로 남습니다.',
          ok: '진도 지우기',
          danger: true,
          onOk: function () {
            store.keys().forEach(function (k) {
              if (k.indexOf('done.') === 0) store.remove(k);
            });
            location.reload();
          }
        });
      });
    }

    var resetAll = $('.js-reset-all');
    if (resetAll) {
      resetAll.addEventListener('click', function () {
        ask({
          title: '전체 초기화할까요?',
          sub: '이 브라우저에 쌓인 학습 기록 전부',
          body: '섹션 학습 진도 · 오답노트(틀린 횟수·분류) · ★ 저장한 문제 · ' +
                '저장한 암기 카드 · 섹션마다 적어 둔 메모가 모두 사라집니다. ' +
                '되돌릴 수 없습니다 — 먼저 「기록 내보내기」로 받아 두세요.',
          ok: '전부 지우기',
          danger: true,
          onOk: function () {
            store.keys().forEach(function (k) {
              if (!isKept(k)) store.remove(k);
            });
            location.reload();
          }
        });
      });
    }
  }

  /* ==================================== 도구 바로가기 (도구 페이지 푸터) */
  /* 도구가 여섯이다. 홈으로 갔다가 다시 고르면 두 번 이동이라
     푸터에서 바로 건너갈 수 있게 한다.

     🔒 **고정 하단 탭바로 만들지 않는다.**
        ① 오른쪽 아래에 이미 ↑↓ 버튼(.scrollnav)이 있어 겹친다
        ② 암기 카드는 화면을 꽉 채우는 구조라(T26) 하단 바가 그 높이를 먹는다
        ③ 시험 중에는 방해다 — 잘못 누르면 답안이 날아간다

     📌 HTML 여섯 장에 각각 적지 않고 여기서 그린다. 도구가 늘어도 이 배열만 고친다. */
  var TOOLS = [
    { href: 'index.html', label: '홈' },
    { href: 'chapters.html', label: '학습 정리본' },
    { href: 'exam.html', label: '모의 문제지' },
    { href: 'cards.html', label: '암기 카드' },
    { href: 'wrong.html', label: '오답노트' },
    { href: 'notes.html', label: '메모 모아보기' },
    { href: 'glossary.html', label: '약어 사전' }
  ];

  /* ==================================== 헤더 뒤로가기 (도구 페이지 공통) */
  /* 💬 "오답노트 보기 누르면 오답노트로 가는데 여기는 뒤로가기 버튼이 없어.
        오답노트 보기 누르기 직전으로 가고 싶어."

     도구끼리 오갈 때 「직전으로」 돌아갈 길이 필요하다. 그 기록은 이미 브라우저가
     들고 있으므로 따로 저장하지 않는다 — history.back() 을 부르면 된다.

     🚨 다만 그냥 back() 을 걸면 안 된다. 주소를 직접 치고 들어왔거나 새 탭으로 열었으면
        돌아갈 데가 없어 사이트 밖으로 나가 버린다.
        **같은 사이트에서 왔을 때만** 뒤로가고, 아니면 홈으로 보낸다.

     📌 exam.js 는 한 페이지 안에서 화면이 바뀌므로 자기 setBack 으로 덮어쓴다.
        여기서는 첫 상태만 정한다. */
  /* 🚨 뒤로가기 링크의 **주인은 여기 하나다.**
     app.js 와 exam.js 가 각각 핸들러를 걸었더니, exam.js 가 자기 것만 떼고
     app.js 것은 그대로 둬서 **둘 다 실행됐다.** history.back() 이 이겨
     「← 모의 문제지」를 눌러도 홈으로 갔다.
     핸들러를 하나만 두고 setBack 이 매번 갈아 끼운다. */
  var backHandler = null;

  function setBack(label, where, fn) {
    var a = $('.js-back');
    var w = $('.js-where');
    if (w && where != null) w.textContent = where;
    if (!a) return;

    if (backHandler) { a.removeEventListener('click', backHandler); backHandler = null; }
    a.textContent = label;

    if (fn) {
      a.href = '#';
      backHandler = function (e) { e.preventDefault(); fn(); };
      a.addEventListener('click', backHandler);
    } else {
      a.href = 'index.html';
    }
  }

  /* 페이지를 열었을 때의 기본 상태.
     직전이 우리 사이트면 **그 화면으로 돌아간다.** 아니면 갈 데가 없으므로 홈이다 —
     주소를 직접 치거나 새 탭으로 열면 history 가 비어 있어 back() 이 사이트 밖으로 나간다.

     🔒 **라벨은 「어디로 가는가」로 적는다.** 「← 뒤로」는 어디로 갈지 안 알려 준다.
        직전이 「모의 문제지」면 그렇게 적고, 모르면 홈이다.
        한 페이지 안에서 화면만 바뀔 때(exam.js)도 같은 규칙이다. */
  /* HTML 에 적혀 있던 기본 링크. 되돌릴 자리가 필요하다 —
     🚨 exam.js 처럼 화면마다 라벨을 바꾸는 곳에서 「처음 상태로」를 부르면
        그냥 빠져나가서는 안 된다. 직전 화면의 라벨이 그대로 남는다. */
  var authored = null;

  /* 🔒 **둘을 갈랐다** (2026-08-12, 사용자 요청).

     > 💬 *"아무리 생각해도 뒤로가기랑 상위 페이지로 이동을 분리해야 할 것 같아."*

     | 어디 | 무엇 | 어디로 |
     |---|---|---|
     | **왼쪽 위** `.js-back` | **상위로** | 섹션 → 챕터 목차, 도구 → 홈. **늘 같은 곳** |
     | **왼쪽 아래** `.backnav` | **뒤로** | 직전에 보던 화면. `history.back()` |

     🚨 **전에는 왼쪽 위 하나가 둘을 겸했다.** 어디서 왔느냐에 따라 같은 버튼이
        다른 데로 가서, **누르기 전에는 어디로 갈지 알 수 없었다.**
        「상위로」는 위치가 정하고 「뒤로」는 발자취가 정한다 — 서로 다른 것이다.

     📌 exam.js 의 `setBack` 은 그대로 둔다. 한 페이지 안에서 화면이 바뀔 때
        (복기 → 응시 이력) 그것도 **상위로 가는 것**이라 왼쪽 위가 맞다. */
  function initBackLink() {
    var a = $('.js-back');
    if (!a) return;
    /* HTML 에 적힌 그대로가 곧 「상위」다. 발자취로 덮어쓰지 않는다.
       🔑 exam.js 의 resetBack() 이 이 함수를 불러 **처음 상태로 되돌린다** —
          setBack 으로 갈아 끼웠던 라벨을 여기서 원래대로 돌린다. */
    if (!authored) authored = { label: a.textContent, href: a.getAttribute('href') };
    restoreBack();
  }

  /* ------------------------------------------------ 왼쪽 아래 뒤로가기 */
  /* 🚨 **`document.referrer` 로 판정하다 두 번 틀렸다** (2026-08-12).

     | 증상 | 왜 |
     |---|---|
     | *"필요한 때에 안 떠"* | `file://` 이나 새 탭에서는 **referrer 가 빈 문자열**이다 |
     | *"눌러도 반응 안 할 때가 있어"* | 새 탭은 **referrer 는 있는데 히스토리가 비어 있다.**<br>`history.back()` 이 갈 데가 없어 아무 일도 안 일어난다 |

     🔒 **물어야 할 것은 「어디서 왔나」가 아니라 「돌아갈 데가 있나」다.**
        그건 `history.length` 가 답한다 — referrer 와 달리 **`back()` 과 같은 것을 본다.**

     📌 다른 사이트에서 들어왔으면 밖으로 나갈 수 있다. 그것이 브라우저 뒤로가기의
        본래 동작이고, **이 버튼은 그것을 그대로 꺼내 놓은 것**이다. */
  /* 🔒 **몇 번째 화면인가**를 히스토리 항목에 직접 새긴다.

     `history.length` 는 **탭 전체**를 세고 앞으로 갈 항목까지 포함한다 —
     「내 뒤에 화면이 있나」를 못 말한다. `document.referrer` 는 `file://`·새 탭에서 빈다.
     🔑 **둘 다 짐작이었다.** 여기서는 페이지마다 `history.replaceState` 로 번호를 박는다.

       첫 화면 0 → 다음 1 → 다음 2 …   **0 이면 뒤에 아무것도 없다.**

     뒤로 오면 그 항목에 박아 둔 번호가 **그대로 살아 돌아온다.** 그래서 어긋나지 않는다. */
  var NAV_D = 'eip.nav.depth';

  function navDepth() {
    var s = history.state;
    var d;
    if (s && typeof s.eipD === 'number') {
      d = s.eipD;                       /* 뒤로·앞으로 와서 되살아난 항목 */
    } else {
      var prev = null;
      try { prev = sessionStorage.getItem(NAV_D); } catch (e) {}
      d = prev === null ? 0 : parseInt(prev, 10) + 1;
      try { history.replaceState({ eipD: d }, ''); } catch (e) {}
    }
    try { sessionStorage.setItem(NAV_D, String(d)); } catch (e) {}
    return d;
  }

  function initBackNav() {
    /* 🚨 bfcache 로 되살아나면 다시 불린다. **두 개가 되면 안 된다.** */
    if ($('.backnav')) return;
    if (!window.history || navDepth() < 1) return;

    /* 🚨 넓은 화면에서 **사이드바가 왼쪽 300px 를 차지한다.** 그 아래 깔려 안 보였다.
       사이드바가 있는 페이지에서만 그만큼 오른쪽으로 민다 — 홈·도구에는 없다. */
    var nav = el('div', 'backnav' + ($('.sidebar') ? ' backnav--aside' : ''));
    var btn = el('button', 'backbtn', '←');
    btn.type = 'button';
    /* 🔒 **글자는 넣지 않는다** (사용자 요청). 툴팁에만 갈 곳 이름을 적는다 —
       버튼이 커지면 본문을 가리고, 왼쪽 아래는 좁은 화면에서 특히 빠듯하다. */
    var ref = document.referrer || '';
    var name = ref ? pageName(ref) : '';
    btn.title = name ? name + '(으)로 뒤로가기' : '뒤로가기';
    btn.setAttribute('aria-label', btn.title);
    btn.addEventListener('click', function () { history.back(); });
    nav.appendChild(btn);
    document.body.appendChild(nav);
    /* 다음 프레임에 띄운다 — 처음부터 보이면 페이지가 덜컹인다 */
    setTimeout(function () { btn.classList.add('is-show'); }, 0);
  }

  /* HTML 에 적혀 있던 그대로 되돌린다 (섹션 페이지는 「← 학습 정리본」, 도구는 「← 홈」) */
  function restoreBack() {
    var a = $('.js-back');
    if (!a || !authored) return;
    if (backHandler) { a.removeEventListener('click', backHandler); backHandler = null; }
    a.textContent = authored.label;
    a.href = authored.href;
  }

  /* 주소에서 화면 이름을 찾는다. 모르는 주소(섹션 페이지 등)면 「홈」이 아니라
     그 페이지가 무엇인지 모른다는 뜻이므로 무난하게 「이전 화면」으로 적는다. */
  /* 🔒 **화면 하나에 이름 하나.** 뒤로가기 라벨이 「어디로 가는가」를 말하려면
     섹션 200장이 전부 「학습 정리본」이어서는 안 된다. 섹션은 제 제목을 쓴다.
     그래야 **섹션 → 섹션** 이동에서도 어디로 돌아가는지 보인다. */
  function pageName(url) {
    var path = String(url).split('#')[0].split('?')[0];
    var file = path.split('/').pop().toLowerCase();
    /* 🚨 홈은 대개 `…/EIPStudy/` 처럼 슬래시로 끝난다. 그러면 파일명이 빈 문자열이라
       아무것도 못 찾고 「이전 화면」이 떴다. 디렉터리 주소는 index.html 이다. */
    if (!file) file = 'index.html';

    var i;
    for (i = 0; i < TOOLS.length; i++) {
      if (TOOLS[i].href.toLowerCase() === file) return TOOLS[i].label;
    }

    var toc = window.EIP_TOC || {};

    /* 섹션 페이지 — .../chNN/sMM.html */
    var m = /\/(ch\d\d)\/(s\d\d\.html)$/i.exec(path);
    if (m) {
      var c = toc[m[1].toLowerCase()];
      var list = (c && c.s) || [];
      for (i = 0; i < list.length; i++) {
        if (list[i].f === m[2].toLowerCase()) return list[i].t;
      }
      return '학습 정리본';
    }

    /* 챕터 목차 페이지 — chNN.html */
    var m2 = /^(ch\d\d)\.html$/.exec(file);
    if (m2) {
      var c2 = toc[m2[1]];
      return (c2 && c2.t) || '학습 정리본';
    }

    return '이전 화면';
  }

  function initToolNav() {
    var host = $('.js-toolnav');
    if (!host) return;

    /* 🚨 섹션 페이지는 `chNN/` 안에 있다. 상대 경로를 그대로 쓰면
       `ch01/exam.html` 을 찾다가 **404 가 뜬다.** 한 단계 올라가야 한다. */
    var base = (CH && CH.base) || '';

    /* 지금 보고 있는 페이지는 뺀다 — 제자리로 가는 링크는 눌러 볼 이유가 없다 */
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    host.innerHTML = '';
    /* 💬 "바로가기라는 말이 좀 애매해" · "제목같지 않고 뭔가 이상해"
       칩과 같은 줄에 두니 칩 하나로 보였다. **줄을 나눠 제목 자리를 준다.** */
    host.appendChild(el('h2', 'toolnav__title', '빠른 이동'));

    var row = el('div', 'toolnav__row');

    TOOLS.forEach(function (t) {
      if (t.href.toLowerCase() === here) return;
      var a = el('a', 'toolnav__item');
      a.href = base + t.href;
      a.textContent = t.label;
      row.appendChild(a);
    });

    host.appendChild(row);
  }

  /* 🔒 **「빠른 이동은 발자취를 지운다」를 걷어냈다** (2026-08-12).

     > 💬 *"그냥 페이지 이동에서는 (뒤로가기 버튼이) 안 떠."*

     🚨 **범인이 이것이었다.** 「빠른 이동」 칩을 누르면 `eip.navreset` 이 켜지고,
        도착한 페이지가 그것을 보고 뒤로가기를 **숨겼다.** 칩은 섹션마다 바닥에 있어
        실제로 가장 많이 쓰는 이동 수단인데, 하필 거기서만 버튼이 사라졌다.

     🔑 **그 규칙은 버튼이 하나였을 때의 것이다.** 그때는 왼쪽 위 하나가 「상위로」와
        「뒤로」를 겸했고, *"빠른 이동으로 왔으면 여기가 새 출발점"* 은 **라벨이
        엉뚱한 곳을 가리키지 않게** 하려던 규칙이었다.
        둘을 가른 지금 **뒤로가기는 브라우저 뒤로가기를 그대로 비출 뿐**이고,
        브라우저 뒤로가기는 빠른 이동을 했다고 사라지지 않는다.

     ✅ 그래서 `TRAIL_RESET`·`markTrailReset`·`takeTrailReset` 을 지웠다.
        **제약이 사라지면 그 제약이 만든 코드도 지운다.** */

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
    paintStars(list);          /* 07-02 처럼 제목에 ★ 가 든 섹션 */

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
      paintStars(intro);
    }

    var host = $('.js-seclist');
    if (!host) return;

    var done = doneList();

    CH.sections.forEach(function (sec) {
      var isDone = done.indexOf(sec.f) >= 0;

      var row = el('div', 'seclist__item' + (isDone ? ' is-done' : ''));
      row.setAttribute('data-sec', sec.f);   /* 되살아났을 때 이 행이 어느 섹션인지 */

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

    paintStars(host);
    saveMeta();
    paintProgress();
  }

  /* 「학습 완료」 표시가 나오는 곳을 **한 번에** 저장소와 맞춘다.
     사이드바 목차 · 챕터 목차의 섹션 행 · 섹션 페이지의 완료 버튼 셋이다.

     🔒 세 곳을 각자 갱신하면 반드시 한 곳이 빠진다. 실제로 그랬다 —
        bfcache 로 되살아났을 때 진도 막대만 고치고 **행의 체크는 옛날 그대로**였다.
     🚨 initChapterIndex() 를 다시 부르는 것으로는 못 고친다. 그쪽은 목록을
        host 에 덧붙이는 방식이라 섹션이 두 벌로 늘어난다. */
  function refreshSidebarDone() {
    if (!CH) return;
    var done = doneList();
    function isDone(f) { return done.indexOf(f) >= 0; }

    var links = $$('#toc > ul.toc > li > .toc__row > a');
    links.forEach(function (a, idx) {
      if (!CH.sections[idx]) return;
      a.classList.toggle('done', isDone(CH.sections[idx].f));
    });

    $$('.js-seclist .seclist__item').forEach(function (row) {
      var f = row.getAttribute('data-sec');
      if (!f) return;
      row.classList.toggle('is-done', isDone(f));
      var box = $('.seclist__check', row);
      if (box) box.setAttribute('aria-pressed', isDone(f) ? 'true' : 'false');
    });

    var here = CH.sections[CH.index];
    var mine = $('.sectiondone');
    if (here && mine) mine.setAttribute('aria-pressed', isDone(here.f) ? 'true' : 'false');
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
    paintStars(doc);          /* 🔒 중요도 ★ 는 여기서 한 번만 칠한다 */
    extractDiagrams(doc);

    buildSidebar(doc);
    buildPageNav();
    buildDoneButton(doc);
    renderDiagrams();
    initReadingProgress();

    /* 검색 결과로 들어온 경우 해당 부분으로 이동 */
    var q = queryParam('q');
    if (q) setTimeout(function () { flashMatch(doc, q); }, 80);

    if (location.hash) {
      var t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t) setTimeout(function () { t.scrollIntoView({ block: 'start' }); }, 60);
    }
  }

  /* ------------------------------------------------------- 중요도 별 (★) */
  /* 본문의 중요도 표시를 이모지 ⭐ 에서 **글자 ★** 로 바꿨다 (2026-08-12).
     이모지는 글꼴을 타고 색을 못 입혀 제목 안에서 튄다. 글자면 색을 준다.

     🔒 **칠하는 규칙은 여기 한 곳뿐이다.** 마크다운이 그려진 뒤 텍스트 노드를 훑어
        ★ 뭉치만 `<span class="imp">` 로 감싼다. 본문에 태그를 적지 않는다 —
        같은 글이 목차·검색·카드에서는 textContent 로도 쓰이기 때문이다.

     🚨 `code`·`pre` 안은 건드리지 않는다. 코드에 ★ 가 나오면 그건 코드다.
     🚨 즐겨찾기 버튼의 ★ 와 글자가 같다 — 그쪽은 `.qstar` 같은 제 클래스가 있고
        색도 `--star`(호박색)라 섞이지 않는다. 이건 `--accent`(파랑)다. */
  var STAR_SKIP = { CODE: 1, PRE: 1, SCRIPT: 1, STYLE: 1, TEXTAREA: 1, BUTTON: 1 };

  function paintStars(root) {
    if (!root || !window.document.createTreeWalker) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var hits = [], node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.indexOf('★') < 0) continue;
      var p = node.parentNode, skip = false;
      while (p && p !== root) {
        if (STAR_SKIP[p.nodeName] || (p.className && String(p.className).indexOf('imp') >= 0)) {
          skip = true; break;
        }
        p = p.parentNode;
      }
      if (!skip) hits.push(node);
    }
    hits.forEach(function (t) {
      var parts = t.nodeValue.split(/(★+)/);
      var frag = document.createDocumentFragment();
      parts.forEach(function (s) {
        if (!s) return;
        if (s.charAt(0) === '★') frag.appendChild(el('span', 'imp', s));
        else frag.appendChild(document.createTextNode(s));
      });
      if (t.parentNode) t.parentNode.replaceChild(frag, t);
    });
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

  /* 🔒 **그림은 본문에만 있는 것이 아니다.** 문항에도 붙는다(`fig`) —
     그래서 「정의 문자열 → 그릴 상자」를 여기 한 벌만 두고 `EIP.diagram` 으로 내보낸다.
     mermaid 설정을 두 벌로 만들면 본문과 문항의 그림이 서로 다르게 그려진다. */
  var diagramReg = [];

  function diagramBox(definition) {
    var box = el('div', 'diagram diagram--pending');
    var target = el('div', 'mermaid');
    target.textContent = definition;
    box.appendChild(target);

    var zoom = el('button', 'diagram__zoom', '⤢');
    zoom.type = 'button';
    zoom.title = '크게 보기';
    zoom.setAttribute('aria-label', '다이어그램 크게 보기');
    box.appendChild(zoom);

    diagramReg.push({ box: box, target: target, def: definition });
    return box;
  }

  function extractDiagrams(doc) {
    $$('pre > code.language-mermaid', doc).forEach(function (code) {
      var pre = code.parentNode;
      pre.parentNode.replaceChild(diagramBox(code.textContent), pre);
    });
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
  /* 🚨 **여러 번 불릴 수 있다.** 본문은 한 번이지만 문항은 화면이 바뀔 때마다 새로 그린다 —
     그래서 **배선(테마 변경·확대 창)은 한 번만** 하고 그리기만 되풀이한다.
     안 그러면 테마를 한 번 바꿀 때 렌더가 문제지 수만큼 돈다. */
  var diagramWired = false;

  function renderDiagrams() {
    var diagrams = diagramReg;

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
            /* 🔒 **넘치는 그림은 줄여서 담는다.** 가로로 밀어 보게 만들었다가 되돌렸다 —
               💬 *"좌우로 미는 기능 그냥 다시 없애. 크게 보는 버튼 누르는 데에 의지하자."*
               🔑 **확대 버튼(⤢)이 이미 있다.** 미는 것은 그것과 하는 일이 겹치면서
                  **본문 스크롤과 싸운다** — 손가락이 어느 쪽을 미는지 헷갈린다. */
            sequence: { useMaxWidth: true, wrap: true },
            /* 🚨 빈 클래스도 구획 셋을 다 그려서 **관계만 보여 주는 그림이 상자 3단**이 됐다.
               💬 *"사각형 3개가 하나의 오브젝트로 되어있는 거 의도 맞아?"* → 아니다.
               속성·오퍼레이션이 없으면 **이름 칸만** 남긴다 (mermaid 11 의 옵션). */
            /* 🚨 `rankSpacing` 을 올려 봤지만 소용없었다 — **선 길이가 문제가 아니었다.**
               `direction LR` 이면 mermaid 가 **양쪽 다중도를 도착 쪽에 겹쳐 쌓는다.**
               → 그런 그림은 `flowchart` 로 그린다 (라벨을 선 가운데에 한 번만 놓는다). */
            'class': { useMaxWidth: true, hideEmptyMembersBox: true },
            'state': { useMaxWidth: true }
          });

          var nodes = diagrams.map(function (d) {
            d.target.removeAttribute('data-processed');
            d.target.innerHTML = '';
            d.target.textContent = d.def;
            return d.target;
          });

          /* 그려 놓고 **실제로 넘치는지** 재서 붙인다. 종류로 미리 정하지 않는다 —
             참여 객체가 셋뿐인 시퀀스는 안 넘치고, 넘치면 무엇이든 밀 수 있어야 한다. */
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
        if (!diagramWired) document.addEventListener('themechange', debounce(run, 60));
      }
    }

    if (diagramWired) return;
    diagramWired = true;

    /* 🔒 **확대 창은 없으면 만든다.** 본문 페이지에만 껍데기가 들어 있어서
       모의 문제지·오답노트의 그림 문항은 ⤢ 를 눌러도 아무 일이 없었다.
       226개 산출물을 다시 만들지 않고 여기서 채운다 (아래·↓ 버튼과 같은 방식). */
    var lb = $('#lightbox');
    var lbInner = $('#lightbox-inner');
    if (!lb) {
      lb = el('div', 'lightbox');
      lb.id = 'lightbox';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.setAttribute('aria-label', '다이어그램 크게 보기');
      var close = el('button', 'lightbox__close', '✕');
      close.type = 'button';
      close.setAttribute('aria-label', '닫기');
      lb.appendChild(close);
      lbInner = el('div', 'lightbox__inner');
      lbInner.id = 'lightbox-inner';
      lb.appendChild(lbInner);
      document.body.appendChild(lb);
    }
    if (!lbInner) return;

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
  /* ============================ 되살아난 화면 (bfcache) */
  /* 🚨 뒤로가기로 돌아오면 브라우저가 페이지를 **통째로 되살린다.**
     `DOMContentLoaded` 가 다시 나지 않으므로 `boot()` 도, 진도 그리기도 안 돈다.
     섹션에서 「학습 완료」를 누르고 돌아오면 **저장은 됐는데 화면만 옛 값**이었다.

     🔒 화면마다 `pageshow` 를 달면 또 흩어진다. **여기서 한 번 듣고**
        `document` 에 `eip:revive` 를 쏜다 — `themechange` 와 같은 방식이다.
        각 화면(오답노트·메모 모아보기·모의 문제지…)은 그것만 구독하면 된다. */
  function initRevive() {
    window.addEventListener('pageshow', function (e) {
      if (!e.persisted) return;   /* 새로 연 것이면 boot() 가 이미 그렸다 */

      initHome();                 /* 홈·챕터 목록 — CH 가 있으면 스스로 빠진다 */
      initBackNav();              /* 🔑 되살아난 페이지는 이제 돌아갈 데가 생겼을 수 있다 */
      if (CH) {
        paintProgress();          /* 챕터 목차·섹션의 진도 막대 */
        refreshSidebarDone();     /* 사이드바 목차의 완료 표시 */
      }
      document.dispatchEvent(new CustomEvent('eip:revive'));
    });
  }

  function boot() {
    theme.init();
    initSidebar();
    initHome();
    initReset();
    initBackLink();
    initBackNav();
    initToolNav();
    initScrollNav();
    initRevive();

    if (CH && CH.page === 'index') {
      buildSidebar(null);
      initChapterIndex();
      renderDiagrams();
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

  /* exam.js 는 한 페이지 안에서 화면이 바뀌므로 「← 홈」 상태로 되돌릴 때
     같은 규칙(직전이 우리 사이트면 뒤로)을 다시 적용해야 한다. */
  window.EIP = {
    store: store, theme: theme, initBack: initBackLink, setBack: setBack,
    /* 🔒 그림은 여기 한 벌로만 그린다 — qcard 의 `fig` 문항이 이것을 쓴다 */
    diagram: { box: diagramBox, render: renderDiagrams }
  };
})();
