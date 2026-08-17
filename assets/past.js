/* ==========================================================================
   past.js — 기출문제집 (본인 전용)

   🔒 **데이터가 없으면 아무것도 안 보인다.** 인증을 붙이지 않는다 —
      기출 원문(`pool/*.js`)은 비공개 저장소에만 있고 공개 저장소에는 이름조차 없다.
      남이 이 페이지를 열면 「기출 자료가 없습니다」만 뜬다. 유출될 파일 자체가 없다.

   🔒 **채점은 qcard 를 그대로 쓴다.** 규칙을 두 벌로 만들지 않는다 —
      배점(5점·부분점수)·정답 비교·해설·메모가 전부 거기 한 벌이다.

   ⚠️ 기출 풀은 **문제 은행과 스키마가 다르다.** 여기서 한 번 옮겨(`toCard`) qcard 에 넘긴다.
      → EIPStudy-notes/exam-archive/pool/README.md
   ========================================================================== */
(function () {
  'use strict';

  var DIR = 'pool/';
  var LABELS = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧'];

  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function html(tag, cls, markup) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    n.innerHTML = markup;
    return n;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function store() { return window.EIP && window.EIP.store; }

  var setupBox, sheetBox, rounds = [], cards = [], current = null, submitBtn;

  /* ------------------------------------------------------------ 자료 불러오기 */
  /* 🚨 `fetch()` 를 쓰지 않는다 — `file://` 에서 CORS 로 막힌다.
     `<script src>` 로 전역에 담는 것이 이 사이트의 방식이다 (bank-chNN.js 와 같다). */
  function loadScript(src, done) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = function () { done(true); };
    s.onerror = function () { done(false); };   /* 없으면 조용히 넘어간다 */
    document.head.appendChild(s);
  }

  function loadAll(done) {
    loadScript(DIR + 'pool-index.js', function () {
      var files = window.EIP_POOL_FILES;
      if (!files || !files.length) { done(); return; }
      var left = files.length;
      var i;
      for (i = 0; i < files.length; i++) {
        loadScript(DIR + files[i], function () { if (--left === 0) done(); });
      }
    });
  }

  /* 🔑 **전역 이름을 짐작하지 않는다.** `2026-2-web.js` 는 `EIP_POOL_2026_2_WEB` 이라
     파일명에서 규칙적으로 만들어지지 않는다. 실제로 올라온 것을 훑는다. */
  function collectRounds() {
    var out = [], k, v;
    for (k in window) {
      if (k.indexOf('EIP_POOL_') !== 0) continue;
      v = window[k];
      if (!v || !v.items || !v.items.length) continue;
      out.push(v);
    }
    out.sort(function (a, b) {
      if (a.y !== b.y) return b.y - a.y;                    /* 최신 회차가 위 */
      if (a.r !== b.r) return b.r - a.r;
      return String(a.src) < String(b.src) ? -1 : 1;
    });
    return out;
  }

  function roundKey(g) { return g.y + '-' + g.r + '-' + (g.src || 'x'); }
  function roundLabel(g) { return g.y + '년 ' + g.r + '회'; }

  /* --------------------------------------------------------- 풀 → qcard 문항 */
  function langOf(type) {
    if (type === 'code-c') return 'c';
    if (type === 'code-java') return 'java';
    if (type === 'code-python') return 'python';
    if (type === 'sql') return 'sql';
    return null;
  }

  /* 표·보기 상자(`box`)는 코드와 같은 자리에 낸다 — 둘 다 「같이 주는 자료」다.
     qcard 에 새 자리를 만들지 않는 편이 규칙을 한 벌로 두는 데 낫다. */
  function blockOf(q) {
    var parts = [];
    if (q.box && q.box.length) parts.push(q.box.join('\n'));
    if (q.code && q.code.length) parts.push(q.code.join('\n'));
    return parts.length ? parts.join('\n\n') : null;
  }

  function whyOf(q) {
    var bits = [];
    if (q.topic) bits.push('<b>' + esc(q.topic) + '</b>');
    bits.push(q.y + '년 ' + q.r + '회 ' + q.n + '번 · 복원본 <b>' + esc(q.src || '?') + '</b>');
    if (q.note) bits.push('🚨 ' + esc(q.note));
    return bits.join(' · ');
  }

  function toCard(q) {
    var lang = langOf(q.type);
    var n = q.parts || (q.a ? q.a.length : 1);
    var card = {
      id: q.id, ch: q.ch, sec: q.sec,
      q: esc(q.q),
      code: blockOf(q),
      lang: lang,
      fig: (q.fig && q.fig.t === 'mermaid' && q.fig.src) ? q.fig.src.join('\n') : null,
      pool: (q.opts && q.opts.length) ? q.opts : null,
      why: whyOf(q),
      d: 2, y: [q.y], tag: q.topic ? [q.topic] : []
    };

    /* 🚨 **`alt` 는 칸 수와 같을 때만 칸에 나눠 준다.**
       400문항 중 둘은 `parts` 가 3인데 `alt` 가 2·1이다 (2022-3-8 · 2026-1-13) —
       그대로 나누면 **엉뚱한 칸의 정답이 된다.** 어긋나면 아예 안 쓴다. */
    var alt = q.alt && q.alt.length ? q.alt : null;
    var altFits = alt && alt.length === n;

    if (n > 1) {
      card.t = 'multi-blank';
      card.parts = [];
      var i;
      for (i = 0; i < n; i++) {
        var acc = [q.a[i]];
        if (altFits) acc.push(alt[i]);
        card.parts.push({
          label: LABELS[i] || String(i + 1),
          a: acc,
          t: lang ? 'code' : null       /* 코드·SQL 은 부호·구두점을 보존해 비교한다 */
        });
      }
    } else {
      card.t = lang ? 'code' : 'short';
      card.a = alt ? [q.a[0]].concat(alt) : [q.a[0]];
    }
    return card;
  }

  /* ------------------------------------------------------------------ 이력 */
  function hist() {
    var v = store() ? store().get('past.hist', []) : [];
    return Object.prototype.toString.call(v) === '[object Array]' ? v : [];
  }
  function pushHist(rec) {
    var all = hist();
    all.unshift(rec);
    if (all.length > 60) all.length = 60;
    if (store()) store().set('past.hist', all);
  }

  /* ---------------------------------------------------------------- 화면 1 */
  function buildSetup() {
    setupBox.innerHTML = '';

    if (!rounds.length) {
      setupBox.appendChild(html('div', 'exam__histnone',
        '<strong>기출 자료가 없습니다.</strong><br>' +
        '이 도구는 <b>회차 자료가 있을 때만</b> 동작합니다.'));
      return;
    }

    var box = el('div', 'exam__form');
    box.appendChild(html('p', 'exam__note',
      '<b>' + rounds.length + '회차 · ' + (rounds.length * 20) + '문항.</b> ' +
      '한 회차는 20문항 100점이고 <b>60점이 합격선</b>입니다.'));

    var grid = el('div', 'past__rounds');
    rounds.forEach(function (g) {
      var b = el('button', 'past__round');
      b.type = 'button';
      b.appendChild(el('strong', null, roundLabel(g)));
      b.appendChild(el('span', null, g.items.length + '문항 · ' + (g.src || '?')));
      b.addEventListener('click', function () { start(g); });
      grid.appendChild(b);
    });
    box.appendChild(grid);
    setupBox.appendChild(box);

    /* 같은 회차에 복원본이 둘이면 나란히 선다 — 어느 쪽도 버리지 않는다 */
    var dup = {}, hasDup = false, i;
    for (i = 0; i < rounds.length; i++) {
      var k = rounds[i].y + '-' + rounds[i].r;
      if (dup[k]) hasDup = true;
      dup[k] = 1;
    }
    if (hasDup) {
      setupBox.appendChild(html('p', 'exam__note',
        '📌 같은 회차가 둘이면 <b>복원본이 다른 것</b>입니다. 문제가 통째로 다를 수 있어 둘 다 남겨 뒀습니다.'));
    }

    paintHist();
  }

  function paintHist() {
    var all = hist();
    if (!all.length) return;

    var wrap = el('div', 'exam__hist');
    var head = el('div', 'exam__histhead');
    head.appendChild(el('h2', 'exam__histtitle', '응시 이력'));
    head.appendChild(el('span', 'exam__histn', all.length + '회'));
    var clear = el('button', 'exam__histclear', '비우기');
    clear.type = 'button';
    /* 🚨 `confirm()` 을 쓰지 않는다 — 대화상자는 `dialog.js` 한 벌뿐이다 */
    clear.addEventListener('click', function () {
      var D = window.EIP_DIALOG;
      if (!D) return;
      D.confirm({
        title: '응시 이력을 지울까요?',
        sub: all.length + '회분',
        body: '기출문제집의 점수 기록만 사라집니다. 모의 문제지 이력과 진도는 그대로입니다.',
        ok: '이력 지우기',
        danger: true,
        onOk: function () {
          if (store()) store().set('past.hist', []);
          buildSetup();
        }
      });
    });
    head.appendChild(clear);
    wrap.appendChild(head);

    var list = el('div', 'exam__histlist');
    all.forEach(function (rec) {
      var pct = rec.ptMax ? Math.round(rec.pt / rec.ptMax * 100) : 0;
      var row = el('div', 'exam__histrow');
      var top = el('div', 'exam__histtop');
      top.appendChild(el('span', 'exam__histseed',
        rec.y + '년 ' + rec.r + '회 · ' + (rec.src || '?')));
      top.appendChild(el('span', 'exam__histscore', rec.pt + ' / ' + rec.ptMax + '점'));
      top.appendChild(el('span', 'exam__histpct', pct + '%'));
      row.appendChild(top);
      row.appendChild(el('div', 'exam__histch',
        '완전 정답 ' + rec.ok + ' / ' + rec.total + '문항' +
        (pct >= 60 ? ' · 합격선을 넘었습니다' : '')));
      list.appendChild(row);
    });
    wrap.appendChild(list);
    setupBox.appendChild(wrap);
  }

  /* ---------------------------------------------------------------- 화면 2 */
  function start(g) {
    var items = [], i;
    for (i = 0; i < g.items.length; i++) items.push(toCard(g.items[i]));
    current = { g: g, items: items };
    renderSheet();
  }

  function renderSheet() {
    setupBox.style.display = 'none';
    sheetBox.innerHTML = '';
    sheetBox.style.display = '';
    cards = [];

    var head = el('div', 'exam__head');
    var title = el('div', 'exam__headmain');
    title.appendChild(el('strong', null, roundLabel(current.g) + ' 기출'));
    title.appendChild(el('span', 'exam__headsub',
      current.items.length + '문항 · 100점 만점 · 복원본 ' + (current.g.src || '?')));
    head.appendChild(title);
    sheetBox.appendChild(head);

    if (window.EIP_QCARD.memoToggle) sheetBox.appendChild(window.EIP_QCARD.memoToggle());

    var list = el('ol', 'quiz__list exam__list');
    current.items.forEach(function (item) {
      var li = el('li', 'quiz__item');
      var card = window.EIP_QCARD.create(item, li);
      cards.push({ card: card, item: item, li: li });
      list.appendChild(li);
    });
    sheetBox.appendChild(list);

    var foot = el('div', 'exam__foot');
    submitBtn = el('button', 'quiz__grade', '제출하기');
    submitBtn.type = 'button';
    /* 채점 뒤에는 같은 버튼이 「나가기」가 된다 — 핸들러를 두 번 걸지 않는다
       (모의 문제지에서 그렇게 하다 한 번 눌러 둘 다 도는 사고가 났다) */
    submitBtn.addEventListener('click', function () {
      if (submitBtn.getAttribute('data-done') === '1') backToSetup();
      else doSubmit();
    });
    foot.appendChild(submitBtn);
    sheetBox.appendChild(foot);

    if (window.EIP && window.EIP.setBack) {
      window.EIP.setBack('← 회차 고르기', roundLabel(current.g) + ' 푸는 중', backToSetup);
    }
    window.scrollTo(0, 0);
  }

  function backToSetup() {
    current = null;
    cards = [];
    sheetBox.style.display = 'none';
    sheetBox.innerHTML = '';
    setupBox.style.display = '';
    buildSetup();
    if (window.EIP && window.EIP.initBack) window.EIP.initBack();
    window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------------- 채점 */
  function doSubmit() {
    if (!cards.length || cards[0].card.isGraded()) return;

    if (submitBtn) {
      submitBtn.setAttribute('data-done', '1');
      submitBtn.textContent = '↩ 회차 고르기로';
      submitBtn.className = 'exam__ghost';
    }

    /* 🔒 점수는 **배점**이다. 규칙(5점·부분점수)은 qcard 한 벌뿐이다. */
    var Q = window.EIP_QCARD;
    var pt = 0, ok = 0, perCh = {}, i;

    for (i = 0; i < cards.length; i++) {
      var row = cards[i];
      var res = row.card.judge();
      row.card.lock();
      row.card.showResult(res);
      row.li.className = 'quiz__item ' +
        (res.ok ? 'is-ok' : (res.got ? 'is-part' : 'is-no'));

      pt += Q.score(res);

      var c = row.item.ch;
      if (!perCh[c]) perCh[c] = { ok: 0, total: 0 };
      perCh[c].total++;
      if (res.ok) { ok++; perCh[c].ok++; }
    }

    var ptMax = cards.length * Q.FULL_PT;

    /* 🚨 **오답노트에는 적립하지 않는다.** 기출 풀은 남의 것이라
       `eip.wrong.all` 에 섞이면 상품(문제 은행)과 경계가 흐려진다.
       → EIPStudy-notes/exam-archive/pool/README.md */

    pushHist({
      key: roundKey(current.g), y: current.g.y, r: current.g.r,
      src: current.g.src || '?', ts: Date.now(),
      pt: pt, ptMax: ptMax, ok: ok, total: cards.length
    });

    showScore(pt, ptMax, ok, perCh);
  }

  function chapterTitle(n) {
    var id = 'ch' + (n < 10 ? '0' + n : n);
    var toc = window.EIP_TOC && window.EIP_TOC[id];
    return toc ? toc.t : n + '단원';
  }

  function showScore(pt, ptMax, ok, perCh) {
    var box = el('section', 'exam__result');
    var pct = ptMax ? Math.round(pt / ptMax * 100) : 0;

    var h = el('div', 'exam__score');
    h.appendChild(el('strong', null, pt + ' / ' + ptMax + '점'));
    h.appendChild(el('span', null, pct + '%'));
    box.appendChild(h);

    var passed = pct >= 60;
    box.appendChild(el('p', 'exam__pass' + (passed ? ' is-pass' : ''),
      passed ? '✅ 합격선(60점)을 넘었습니다'
             : '합격선은 60점입니다 — ' + (Math.ceil(ptMax * 0.6) - pt) + '점 모자랍니다'));

    /* 🚨 부분점수 규칙은 공개된 것이 아니라 추정이다. 여러 칸짜리가 있었을 때만 밝힌다. */
    var hasParts = false, i;
    for (i = 0; i < current.items.length; i++) {
      if (current.items[i].parts && current.items[i].parts.length > 1) hasParts = true;
    }
    if (hasParts) {
      box.appendChild(el('p', 'exam__note',
        '⚠️ 여러 칸짜리 문항의 부분점수(2칸 2점 · 3칸 1.5점)는 공개된 채점기준이 아니라 추정입니다.'));
    }

    var tbl = el('div', 'exam__bars');
    var nums = [], c;
    for (c in perCh) {
      if (Object.prototype.hasOwnProperty.call(perCh, c)) nums.push(parseInt(c, 10));
    }
    nums.sort(function (a, b) { return a - b; });
    nums.forEach(function (n) {
      var row = el('div', 'exam__barrow');
      row.appendChild(el('span', 'exam__barname', chapterTitle(n)));
      var bar = el('div', 'bar');
      var fill = el('i');
      fill.style.width = Math.round(perCh[n].ok / perCh[n].total * 100) + '%';
      bar.appendChild(fill);
      row.appendChild(bar);
      row.appendChild(el('span', 'exam__barnum', perCh[n].ok + '/' + perCh[n].total));
      tbl.appendChild(row);
    });
    box.appendChild(tbl);

    box.appendChild(el('p', 'exam__note',
      '완전 정답 ' + ok + ' / ' + cards.length + '문항. ' +
      '🔒 기출은 오답노트에 쌓이지 않습니다 — 문제 은행과 섞지 않기 위해서입니다.'));

    sheetBox.insertBefore(box, sheetBox.firstChild);
    window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------------- 시작 */
  function boot() {
    setupBox = $('#past-setup');
    sheetBox = $('#past-sheet');
    if (!setupBox || !sheetBox) return;

    setupBox.innerHTML = '<p class="exam__loading">기출 자료를 찾는 중…</p>';
    loadAll(function () {
      rounds = collectRounds();
      buildSetup();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
