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

  var root, tabsEl, listEl, emptyEl;
  var current = 1;
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
  function html(tag, cls, markup) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (markup != null) n.innerHTML = markup;
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
  function idsFor(tab) {
    var out = [], id;
    if (tab === 0) {
      for (id in favs) {
        if (Object.prototype.hasOwnProperty.call(favs, id)) out.push(id);
      }
      out.sort(function (a, b) { return (favs[b] || 0) - (favs[a] || 0); });
      return out;
    }
    for (id in entries) {
      if (!Object.prototype.hasOwnProperty.call(entries, id)) continue;
      if (W.classify(entries[id]) === tab) out.push(id);
    }
    /* 최근에 손댄 것이 위로 */
    out.sort(function (a, b) { return (entries[b].at || 0) - (entries[a].at || 0); });
    return out;
  }

  function counts() {
    var c = { 1: 0, 2: 0, 3: 0, 0: 0 }, id, k;
    for (id in entries) {
      if (!Object.prototype.hasOwnProperty.call(entries, id)) continue;
      k = W.classify(entries[id]);
      if (c[k] !== undefined) c[k]++;
    }
    for (id in favs) {
      if (Object.prototype.hasOwnProperty.call(favs, id)) c[0]++;
    }
    return c;
  }

  /* --------------------------------------------------------------- 렌더 */
  function refresh() {
    entries = W.all();
    favs = W.favs();
    renderTabs();
    renderList();
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
        renderTabs();
        renderList();
      });
      tabsEl.appendChild(b);
    });
  }

  function renderList() {
    listEl.innerHTML = '';
    var ids = idsFor(current);

    if (!ids.length) {
      emptyEl.hidden = false;
      emptyEl.textContent = current === 0
        ? '저장한 문제가 없습니다. 섹션 퀴즈에서 ★ 을 눌러 담아 두세요.'
        : '해당하는 문제가 없습니다.';
      return;
    }
    emptyEl.hidden = true;

    ids.forEach(function (id) {
      var item = byId[id];
      /* 은행이 아직 없는 챕터의 기록이면 최소 정보만 보여 준다 */
      listEl.appendChild(item ? buildCard(item) : buildStub(id));
    });
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
    listEl = el('div', 'wlist');
    emptyEl = el('p', 'wempty');
    emptyEl.hidden = true;
    root.appendChild(tabsEl);
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
