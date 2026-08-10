/* ==========================================================================
   EIP Study — 오답노트

   설계는 EIPStudy-notes/PLAN-quiz.md 10장.

   분류 1~3 은 (틀린 횟수, 마지막 결과)로 자동 결정되고 서로 배타적이다.
   ★ 저장은 독립 축이라 1~3 과 동시에 성립한다.

   문항 데이터는 필요한 챕터의 은행만 골라 내려받는다.
   fetch 는 file:// 에서 CORS 로 막히므로 <script src> 로 싣는다.

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  var W = window.EIP_WRONG;
  var Q = window.EIP_QCARD;
  var TOC = window.EIP_TOC || {};

  var TABS = [
    { k: 1, label: '한번 틀림' },
    { k: 2, label: '틀렸다 맞음' },
    { k: 3, label: '여러번 틀림' },
    { k: 0, label: '★ 저장' }      /* k=0 은 저장 축 */
  ];

  /* 정렬 기준. dir 은 이 기준을 골랐을 때의 기본 방향 —
     날짜·횟수는 큰 것부터, 챕터 순서는 ch01 부터가 자연스럽다. */
  var SORTS = [
    { k: 'at', label: '마지막 기록', dir: -1 },
    { k: 'w',  label: '틀린 횟수',   dir: -1 },
    { k: 'id', label: '챕터·섹션 순', dir: 1 }
  ];

  var root, ctlEl, tabsEl, listEl, emptyEl;
  var current = 1;
  var sortKey = 'at';
  var sortDir = -1;   /* 1 오름차순 · -1 내림차순 */
  var chFilter = '';  /* '' 이면 전체 챕터 */

  /* 💬 "몇 개씩 보기 설정할 수 있도록 하고, 좌우 페이지 넘길 수 있도록"
     한 화면에 수십 장이 깔리면 아래로 내려갈수록 무엇을 보고 있었는지 놓친다.
     🔒 페이지 크기는 저장하지 않는다 — 정렬·필터와 같은 기준이다 (아래 「고른 값은 저장하지 않는다」). */
  var PAGE_SIZES = [10, 20, 50, 0];   /* 0 = 전체 */
  var pageSize = 10;
  var page = 0;
  var byId = {};      /* 문항 id → 문항 */
  var entries = {};   /* 문항 id → 기록 */
  var favs = {};

  /* --------------------------------------------------------------- DOM */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  /* ------------------------------------------------------- 문항 위치 이름 */
  /* 'ch10-s05-03' → { ch:'ch10', sec:5 } */
  function locate(id) {
    var m = /^(ch\d\d)-s(\d\d)-\d\d$/.exec(id || '');
    if (!m) return null;
    return { ch: m[1], sec: parseInt(m[2], 10) };
  }

  function locationText(id) {
    var loc = locate(id);
    if (!loc) return id;
    var chapter = TOC[loc.ch];
    if (!chapter) return loc.ch;
    var sec = (chapter.s || [])[loc.sec - 1];
    return chapter.t + (sec ? '  ·  ' + sec.t : '');
  }

  function sectionHref(id) {
    var loc = locate(id);
    if (!loc) return null;
    var chapter = TOC[loc.ch];
    var sec = chapter && (chapter.s || [])[loc.sec - 1];
    return sec ? (loc.ch + '/' + sec.f) : null;
  }

  function dateText(ms) {
    if (!ms) return '';
    var d = new Date(ms);
    var mm = d.getMonth() + 1, dd = d.getDate();
    return (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd;
  }

  /* ------------------------------------------------------------ 은행 로드 */
  /* 기록이 있는 챕터의 은행만 내려받는다. 12개를 다 싣지 않는다. */
  function neededChapters() {
    var need = {}, id, loc;
    for (id in entries) {
      if (!Object.prototype.hasOwnProperty.call(entries, id)) continue;
      loc = locate(id);
      if (loc && TOC[loc.ch] && TOC[loc.ch].bank) need[loc.ch] = 1;
    }
    for (id in favs) {
      if (!Object.prototype.hasOwnProperty.call(favs, id)) continue;
      loc = locate(id);
      if (loc && TOC[loc.ch] && TOC[loc.ch].bank) need[loc.ch] = 1;
    }
    var out = [], k;
    for (k in need) { if (Object.prototype.hasOwnProperty.call(need, k)) out.push(k); }
    return out;
  }

  function loadBanks(list, done) {
    var left = list.length;
    if (!left) { done(); return; }
    list.forEach(function (ch) {
      if (window['EIP_BANK_' + ch]) { if (--left === 0) done(); return; }
      var s = document.createElement('script');
      s.src = 'assets/bank-' + ch + '.js';
      /* 실패해도 계속 간다 — 그 챕터 문항만 빠진다 */
      s.onload = s.onerror = function () { if (--left === 0) done(); };
      document.head.appendChild(s);
    });
  }

  function indexBanks() {
    var k, bank, i;
    for (k in TOC) {
      if (!Object.prototype.hasOwnProperty.call(TOC, k)) continue;
      bank = window['EIP_BANK_' + k];
      if (!bank) continue;
      for (i = 0; i < bank.length; i++) byId[bank[i].id] = bank[i];
    }
  }

  /* ------------------------------------------------------------- 목록 계산 */
  function has(obj, k) { return Object.prototype.hasOwnProperty.call(obj, k); }

  function inFilter(id) {
    if (!chFilter) return true;
    var loc = locate(id);
    return !!loc && loc.ch === chFilter;
  }

  /* ★ 탭에는 한 번도 틀린 적 없는 문항도 들어온다. 그때는 저장한 시각을 쓴다. */
  function atOf(id) {
    var e = entries[id];
    if (e && e.at) return e.at;
    return favs[id] || 0;
  }
  function wOf(id) {
    var e = entries[id];
    return e ? (e.w || 0) : 0;
  }

  function compare(a, b) {
    var d = 0;
    if (sortKey === 'w') {
      d = wOf(a) - wOf(b);
      if (d === 0) d = atOf(a) - atOf(b);   /* 같은 횟수면 최근 것을 뒤로 */
    } else if (sortKey === 'id') {
      d = a < b ? -1 : (a > b ? 1 : 0);     /* id 가 챕터·섹션·번호 순서를 그대로 품는다 */
    } else {
      d = atOf(a) - atOf(b);
      if (d === 0) d = a < b ? -1 : (a > b ? 1 : 0);
    }
    return d * sortDir;
  }

  function idsFor(tab) {
    var out = [], id;
    var pool = tab === 0 ? favs : entries;
    for (id in pool) {
      if (!has(pool, id)) continue;
      if (!inFilter(id)) continue;
      if (tab !== 0 && W.classify(entries[id]) !== tab) continue;
      out.push(id);
    }
    out.sort(compare);
    return out;
  }

  /* 탭 옆 숫자도 챕터 필터를 따른다 — 목록과 숫자가 어긋나면 필터가 걸린 줄 모른다 */
  function counts() {
    var c = { 1: 0, 2: 0, 3: 0, 0: 0 }, id, k;
    for (id in entries) {
      if (!has(entries, id) || !inFilter(id)) continue;
      k = W.classify(entries[id]);
      if (c[k] !== undefined) c[k]++;
    }
    for (id in favs) {
      if (has(favs, id) && inFilter(id)) c[0]++;
    }
    return c;
  }

  /* 기록이 있는 챕터만 — 없는 챕터를 선택지에 넣으면 항상 빈 목록이 된다 */
  function chaptersWithRecords() {
    var seen = {}, out = [], id, loc, k;
    function scan(obj) {
      for (id in obj) {
        if (!has(obj, id)) continue;
        loc = locate(id);
        if (loc) seen[loc.ch] = 1;
      }
    }
    scan(entries);
    scan(favs);
    for (k in seen) { if (has(seen, k)) out.push(k); }
    out.sort();
    return out;
  }

  /* --------------------------------------------------------------- 렌더 */
  function refresh() {
    entries = W.all();
    favs = W.favs();
    renderControls();
    renderTabs();
    renderList();
  }

  /* 정렬·필터 줄. 고른 값은 저장하지 않는다 —
     새 localStorage 키를 만들면 T8 동기화의 병합 대상이 하나 늘어난다. */
  function renderControls() {
    var chapters = chaptersWithRecords();
    ctlEl.innerHTML = '';

    /* ---- 챕터 필터 ---- */
    if (chapters.length > 1) {
      var chSel = el('select', 'wctl__sel');
      chSel.title = '챕터로 거르기';
      chSel.setAttribute('aria-label', '챕터로 거르기');
      var all = el('option', null, '전체 챕터');
      all.value = '';
      chSel.appendChild(all);
      chapters.forEach(function (ch) {
        var op = el('option', null, (TOC[ch] && TOC[ch].t) || ch);
        op.value = ch;
        chSel.appendChild(op);
      });
      chSel.value = chFilter;
      chSel.addEventListener('change', function () {
        chFilter = chSel.value;
        page = 0;
        renderTabs();
        renderList();
      });
      ctlEl.appendChild(chSel);
    } else if (chFilter) {
      chFilter = '';   /* 선택지가 사라졌는데 필터만 남는 일이 없도록 */
    }

    /* ---- 정렬 기준 ---- */
    var sortSel = el('select', 'wctl__sel');
    sortSel.title = '정렬 기준';
    sortSel.setAttribute('aria-label', '정렬 기준');
    SORTS.forEach(function (s) {
      var op = el('option', null, s.label);
      op.value = s.k;
      sortSel.appendChild(op);
    });
    sortSel.value = sortKey;
    sortSel.addEventListener('change', function () {
      sortKey = sortSel.value;
      page = 0;
      /* 기준을 바꾸면 그 기준의 자연스러운 방향으로 되돌린다 */
      SORTS.forEach(function (s) { if (s.k === sortKey) sortDir = s.dir; });
      renderControls();
      renderList();
    });
    ctlEl.appendChild(sortSel);

    /* ---- 방향 ---- */
    var dirBtn = el('button', 'wctl__dir', sortDir < 0 ? '↓ 내림차순' : '↑ 오름차순');
    dirBtn.type = 'button';
    dirBtn.title = '정렬 방향 바꾸기';
    dirBtn.addEventListener('click', function () {
      sortDir = -sortDir;
      dirBtn.textContent = sortDir < 0 ? '↓ 내림차순' : '↑ 오름차순';
      page = 0;
      renderList();
    });
    ctlEl.appendChild(dirBtn);

    /* ---- 몇 개씩 보기 ---- */
    var sizeSel = el('select', 'wctl__sel');
    sizeSel.title = '한 화면에 보여 줄 개수';
    sizeSel.setAttribute('aria-label', '한 화면에 보여 줄 개수');
    PAGE_SIZES.forEach(function (n) {
      var op = el('option', null, n ? n + '개씩' : '전체 보기');
      op.value = String(n);
      sizeSel.appendChild(op);
    });
    sizeSel.value = String(pageSize);
    sizeSel.addEventListener('change', function () {
      pageSize = parseInt(sizeSel.value, 10) || 0;
      page = 0;
      renderList();
    });
    ctlEl.appendChild(sizeSel);
  }

  function renderTabs() {
    var c = counts();
    tabsEl.innerHTML = '';
    TABS.forEach(function (t) {
      var b = el('button', 'wtab');
      b.type = 'button';
      b.appendChild(el('span', null, t.label));
      b.appendChild(el('span', 'wtab__n', String(c[t.k])));
      b.setAttribute('aria-pressed', t.k === current ? 'true' : 'false');
      b.addEventListener('click', function () {
        current = t.k;
        page = 0;
        renderTabs();
        renderList();
      });
      tabsEl.appendChild(b);
    });
  }

  function pageCount(n) {
    if (!pageSize) return 1;
    return Math.max(1, Math.ceil(n / pageSize));
  }

  /* 페이지 넘김 줄 — 목록 위아래에 같은 것을 둔다.
     아래에만 두면 위에서 넘기려고 끝까지 내려가야 한다.

     🚨 넘긴 뒤에 스크롤을 옮기지 않는다. 예전에는 목록 맨 위로 옮겼는데
        **버튼이 손 밑에서 사라져 연속으로 못 눌렀다.** 제자리에 있어야 계속 넘긴다. */
  function buildPager(total) {
    var pages = pageCount(total);
    if (pages <= 1) return null;

    var box = el('div', 'wpager');

    var prev = el('button', 'wpager__btn', '←');
    prev.type = 'button';
    prev.title = '이전 페이지';
    prev.setAttribute('aria-label', '이전 페이지');
    prev.disabled = page <= 0;
    prev.addEventListener('click', function () { goPage(page - 1); });
    box.appendChild(prev);

    /* 번호로 바로 간다. 페이지가 많으면 현재 둘레만 보이고 사이는 … 로 접는다 */
    pageNumbers(pages).forEach(function (n) {
      if (n < 0) { box.appendChild(el('span', 'wpager__gap', '…')); return; }
      var b = el('button', 'wpager__no', String(n + 1));
      b.type = 'button';
      b.setAttribute('aria-label', (n + 1) + '페이지');
      if (n === page) {
        b.setAttribute('aria-current', 'page');
        b.classList.add('is-now');
      }
      b.addEventListener('click', function () { goPage(n); });
      box.appendChild(b);
    });

    var next = el('button', 'wpager__btn', '→');
    next.type = 'button';
    next.title = '다음 페이지';
    next.setAttribute('aria-label', '다음 페이지');
    next.disabled = page >= pages - 1;
    next.addEventListener('click', function () { goPage(page + 1); });
    box.appendChild(next);

    return box;
  }

  /* 보여 줄 번호들. -1 은 「…」 자리 */
  function pageNumbers(pages) {
    var out = [], i;
    if (pages <= 7) {
      for (i = 0; i < pages; i++) out.push(i);
      return out;
    }
    var from = Math.max(1, page - 1);
    var to = Math.min(pages - 2, page + 1);

    out.push(0);
    if (from > 1) out.push(-1);
    for (i = from; i <= to; i++) out.push(i);
    if (to < pages - 2) out.push(-1);
    out.push(pages - 1);
    return out;
  }

  function goPage(n) {
    page = n;
    renderList();
  }

  function renderList() {
    listEl.innerHTML = '';
    var all = idsFor(current);

    /* 필터·정렬이 바뀌어 페이지가 범위를 넘으면 마지막 페이지로 당긴다 */
    if (page >= pageCount(all.length)) page = pageCount(all.length) - 1;
    if (page < 0) page = 0;

    var ids = pageSize ? all.slice(page * pageSize, (page + 1) * pageSize) : all;

    if (!all.length) {
      emptyEl.hidden = false;
      if (chFilter) {
        emptyEl.textContent = ((TOC[chFilter] && TOC[chFilter].t) || chFilter) +
          ' 에는 해당하는 문제가 없습니다.';
      } else {
        emptyEl.textContent = current === 0
          ? '저장한 문제가 없습니다. 섹션 퀴즈에서 ★ 을 눌러 담아 두세요.'
          : '해당하는 문제가 없습니다.';
      }
      return;
    }
    emptyEl.hidden = true;

    var top = buildPager(all.length);
    if (top) listEl.appendChild(top);

    ids.forEach(function (id) {
      var item = byId[id];
      /* 은행이 아직 없는 챕터의 기록이면 최소 정보만 보여 준다 */
      listEl.appendChild(item ? buildCard(item) : buildStub(id));
    });

    var bottom = buildPager(all.length);
    if (bottom) listEl.appendChild(bottom);
  }

  function buildStub(id) {
    var box = el('article', 'wcard');
    box.appendChild(el('div', 'wcard__loc', locationText(id)));
    box.appendChild(el('div', 'wcard__stub', '문항 데이터를 찾지 못했습니다 (' + id + ')'));
    return box;
  }

  function buildCard(item) {
    var id = item.id;
    var e = entries[id] || W.entry(id);
    var box = el('article', 'wcard');

    /* ---- 머리: 위치 + ★ ---- */
    var head = el('div', 'wcard__head');
    var href = sectionHref(id);
    if (href) {
      var a = el('a', 'wcard__loc', locationText(id));
      a.href = href;
      a.title = '이 섹션으로 이동';
      head.appendChild(a);
    } else {
      head.appendChild(el('span', 'wcard__loc', locationText(id)));
    }

    var fav = el('button', 'quiz__fav', '★');
    fav.type = 'button';
    fav.title = '저장한 문제로 표시';
    fav.setAttribute('aria-label', '저장한 문제로 표시');
    fav.setAttribute('aria-pressed', W.isFav(id) ? 'true' : 'false');
    fav.addEventListener('click', function () {
      var on = W.toggleFav(id);
      fav.setAttribute('aria-pressed', on ? 'true' : 'false');
      favs = W.favs();
      renderTabs();
      /* ★ 탭에서 해제하면 목록에서 빠져야 한다 */
      if (current === 0 && !on) renderList();
    });
    head.appendChild(fav);
    box.appendChild(head);

    /* ---- 통계 ---- */
    if (e && e.w) {
      var stat = '틀림 ' + e.w + ' · 맞음 ' + e.o +
                 ' · 마지막 ' + (e.last === 1 ? '정답' : '오답');
      if (e.at) stat += ' · ' + dateText(e.at);
      if (e.cat) stat += ' · 직접 옮김';
      box.appendChild(el('div', 'wcard__stat', stat));
    }

    /* ---- 문항 본문 + 입력 ---- */
    var body = el('div', 'wcard__body');
    box.appendChild(body);
    var card = Q.create(item, body);

    /* ---- 조작 ---- */
    var foot = el('div', 'wcard__foot');

    var gradeBtn = el('button', 'quiz__grade', '채점하기');
    gradeBtn.type = 'button';
    gradeBtn.addEventListener('click', function () {
      if (card.isGraded()) return;
      var res = card.judge();
      card.lock();
      card.showResult(res);
      box.classList.add(res.ok ? 'is-ok' : 'is-no');
      gradeBtn.disabled = true;

      /* 다시 푼 결과가 기록에 반영되어 분류가 자동으로 바뀐다 */
      W.record(id, res.ok);
      entries = W.all();
      renderTabs();
      note.textContent = '기록됨 — 지금 분류: ' + tabName(W.classify(entries[id]));
    });
    card.onEnter(function () { gradeBtn.click(); });
    foot.appendChild(gradeBtn);

    /* 분류 이동 — 사용자가 자동 규칙을 덮어쓸 수 있다 */
    var sel = el('select', 'wcard__cat');
    [
      { v: '', t: '자동 분류' },
      { v: '1', t: '1 한번 틀림' },
      { v: '2', t: '2 틀렸다 맞음' },
      { v: '3', t: '3 여러번 틀림' }
    ].forEach(function (o) {
      var op = el('option', null, o.t);
      op.value = o.v;
      sel.appendChild(op);
    });
    sel.value = (e && e.cat) ? String(e.cat) : '';
    sel.title = '분류를 직접 옮깁니다';
    sel.addEventListener('change', function () {
      var v = sel.value ? parseInt(sel.value, 10) : null;
      W.setCat(id, v);
      entries = W.all();
      renderTabs();
      renderList();   /* 옮겼으면 이 탭에서 빠진다 */
    });
    foot.appendChild(sel);

    var note = el('span', 'wcard__note');
    foot.appendChild(note);

    box.appendChild(foot);
    return box;
  }

  function tabName(k) {
    var i;
    for (i = 0; i < TABS.length; i++) { if (TABS[i].k === k) return TABS[i].label; }
    return '없음';
  }

  /* ---------------------------------------------------------------- 시작 */
  function start() {
    root = document.getElementById('wrong');
    if (!root || !W || !Q) return;

    tabsEl = el('div', 'wtabs');
    ctlEl = el('div', 'wctl');
    listEl = el('div', 'wlist');
    emptyEl = el('p', 'wempty');
    emptyEl.hidden = true;
    root.appendChild(tabsEl);
    root.appendChild(ctlEl);
    root.appendChild(emptyEl);
    root.appendChild(listEl);

    entries = W.all();
    favs = W.favs();

    loadBanks(neededChapters(), function () {
      indexBanks();
      refresh();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
