/* ==========================================================================
   EIP Study — 모의 문제지 (exam.html)

   문제 은행에서 실제 출제 분포에 맞춰 N문항을 뽑아 시험지를 만든다.
   설계는 EIPStudy-notes/PLAN-exam.md 4~6장에 확정돼 있다.

   🚨 문항을 그리고 채점하는 일은 assets/qcard.js 가 전담한다.
      채점 규칙을 여기서 다시 짜지 말 것. 정규화 규칙이 어긋난다.
   🚨 오답 적립은 assets/wrongstore.js (EIP_WRONG) 가 전담한다.
      섹션 퀴즈와 같은 키(eip.wrong.all)를 써야 "틀린 문제가 다시 나온다"가 성립한다.

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  var TOC = window.EIP_TOC || {};

  /* ------------------------------------------------------------------------
     회차별 단원 분포 — PLAN-exam.md 4-2 (7회분 139문항 실측)
     값은 그 회차에서 해당 단원이 몇 문항 나왔는가.
     ------------------------------------------------------------------------ */
  var EXAM_DIST = {
    '2022-1': { 1:0, 2:3, 3:0, 4:0, 5:0, 6:1, 7:4, 8:1, 9:3, 10:7, 11:1, 12:0 },
    '2022-2': { 1:0, 2:3, 3:0, 4:2, 5:0, 6:0, 7:2, 8:2, 9:2, 10:6, 11:3, 12:0 },
    '2022-3': { 1:1, 2:2, 3:0, 4:1, 5:0, 6:0, 7:1, 8:2, 9:4, 10:6, 11:2, 12:1 },
    '2023-1': { 1:0, 2:3, 3:0, 4:1, 5:1, 6:0, 7:1, 8:2, 9:2, 10:6, 11:4, 12:0 },
    '2023-2': { 1:0, 2:1, 3:0, 4:1, 5:0, 6:0, 7:2, 8:2, 9:2, 10:9, 11:2, 12:1 },
    '2023-3': { 1:1, 2:2, 3:0, 4:0, 5:0, 6:0, 7:1, 8:1, 9:2, 10:8, 11:5, 12:0 },
    '2024-1': { 1:0, 2:2, 3:0, 4:2, 5:0, 6:0, 7:1, 8:1, 9:2, 10:8, 11:3, 12:0 }
  };
  var ROUNDS = ['2022-1', '2022-2', '2022-3', '2023-1', '2023-2', '2023-3', '2024-1'];

  function roundLabel(key) {
    return key.slice(0, 4) + '년 ' + key.slice(5) + '회';
  }

  function avgDist() {
    var out = {}, c, i;
    for (c = 1; c <= 12; c++) {
      out[c] = 0;
      for (i = 0; i < ROUNDS.length; i++) out[c] += EXAM_DIST[ROUNDS[i]][c];
      out[c] = out[c] / ROUNDS.length;
    }
    return out;
  }

  /* ---------------------------------------------------------------- 난수 */
  /* JScript(ES3) 에는 Math.imul 이 없어 문법 검사 대상 파일에서는 직접 만든다.
     32비트 곱을 16비트 둘로 쪼개 오버플로를 피한다. */
  function imul(a, b) {
    var aHi = (a >>> 16) & 0xffff, aLo = a & 0xffff;
    var bHi = (b >>> 16) & 0xffff, bLo = b & 0xffff;
    return ((aLo * bLo) + (((aHi * bLo + aLo * bHi) << 16) >>> 0)) | 0;
  }
  /* mulberry32 — 시드 하나로 같은 문제지를 재현할 수 있게 한다 */
  function makeRng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      var t = imul(s ^ (s >>> 15), 1 | s);
      t = (t + imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ------------------------------------------------------------- 저장소 */
  function store() { return (window.EIP && window.EIP.store) || null; }
  function read(k, d) { var s = store(); return s ? s.get(k, d) : d; }
  function write(k, v) { var s = store(); if (s) s.set(k, v); }

  /* 응시 이력 상한. 하루 한 판씩 반년을 봐도 180회라 사실상 무제한이다.
     한 건이 400바이트쯤이라 200회는 80KB — localStorage 한도(보통 5MB)에 여유가 크다.

     🚨 그래도 상한을 없애지는 않는다. localStorage 가 꽉 차면 **조용히 실패**하는데,
        그러면 이력만이 아니라 **진도·오답·메모까지 저장이 안 된다.**
        학습 기록 전체를 잃는 쪽이 오래된 이력을 잃는 쪽보다 훨씬 나쁘다. */
  var HISTORY_KEEP = 200;

  /* 답안은 이력보다 훨씬 무겁다 — 회차당 2KB 쯤이라 이력의 다섯 배다.
     그래서 상한을 따로, 더 짧게 잡는다. 복기는 최근 것을 주로 본다. */
  var ANSWERS_KEEP = 40;

  /* 넣어 보고, 안 들어갔으면 절반으로 줄여 다시 넣는다.
     app.js 의 store.set 은 예외를 삼키므로 **읽어서 확인하는 수밖에 없다.** */
  function writeHistory(hist) {
    var n = hist.length;
    while (n > 1) {
      write('exam.history', hist.slice(0, n));
      var back = read('exam.history', null);
      if (back && back.length === n) return n;
      n = Math.floor(n / 2);
    }
    write('exam.history', hist.slice(0, 1));
    return 1;
  }

  function historyList() {
    var h = read('exam.history', []);
    return (Object.prototype.toString.call(h) === '[object Array]') ? h : [];
  }
  function answerBook() {
    var a = read('exam.answers', {});
    return (a && typeof a === 'object' && !a.length) ? a : {};
  }

  /* 회차의 답안을 넣고, 이력에서 사라진 회차의 답안은 함께 지운다.
     🚨 안 지우면 아무도 못 여는 고아 데이터가 계속 쌓인다. */
  function saveAnswers(seed, map) {
    var all = answerBook();
    all[String(seed)] = { at: (new Date()).getTime(), a: map };

    var live = {}, hist = historyList(), i, n = 0;
    for (i = 0; i < hist.length && n < ANSWERS_KEEP; i++) {
      if (!live[String(hist[i].seed)]) { live[String(hist[i].seed)] = 1; n++; }
    }
    var out = {}, k;
    for (k in all) { if (has(all, k) && live[k]) out[k] = all[k]; }

    write('exam.answers', out);
  }

  function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }

  /* 문항 id → 문항. 은행은 boot 에서 전부 실려 있다 */
  function itemById(id) {
    var ch = String(id).slice(0, 4);
    var bank = window['EIP_BANK_' + ch] || [];
    var i;
    for (i = 0; i < bank.length; i++) { if (bank[i].id === id) return bank[i]; }
    return null;
  }

  /* 최근 K회 문제지에 나온 문항 — 중복 회피용. [[id,…], …] 최신이 앞 */
  var RECENT_KEEP = 3;
  function recentRounds() {
    var r = read('exam.recent', []);
    return (r && r.length && typeof r[0] === 'object' && r[0].length !== undefined) ? r : [];
  }
  function recentCount(rounds, id) {
    var n = 0, i;
    for (i = 0; i < rounds.length; i++) {
      if (rounds[i].indexOf(id) >= 0) n++;
    }
    return n;
  }

  /* ------------------------------------------------------------- 은행 */
  function chapterKeys() {
    var out = [], k;
    for (k in TOC) { if (Object.prototype.hasOwnProperty.call(TOC, k)) out.push(k); }
    out.sort();
    return out;
  }
  function numOf(chKey) { return parseInt(chKey.replace('ch', ''), 10); }

  function bankChapters() {
    var out = [], keys = chapterKeys(), i;
    for (i = 0; i < keys.length; i++) {
      if (TOC[keys[i]] && TOC[keys[i]].bank) out.push(keys[i]);
    }
    return out;
  }
  /* 균형 모드는 모든 단원 최소 1문항을 보장한다.
     은행이 비어 있는 단원이 하나라도 있으면 그 자리가 빈 채로 나가므로 켜지 않는다. */
  function allBanksReady() {
    return bankChapters().length === chapterKeys().length && chapterKeys().length > 0;
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

  /* 단원 번호 → 문항 배열 */
  function poolByChapter() {
    var out = {}, keys = bankChapters(), i, bank, n;
    for (i = 0; i < keys.length; i++) {
      bank = window['EIP_BANK_' + keys[i]];
      if (!bank || !bank.length) continue;
      n = numOf(keys[i]);
      out[n] = bank.slice(0);
    }
    return out;
  }

  /* ------------------------------------------------------- 분포 → 목표 수 */
  /* 최대잔여법으로 n 문항을 가중치대로 나눈다.
     은행이 모자란 단원은 있는 만큼만 받고 남은 몫은 다른 단원이 흡수한다. */
  function allocate(weights, n, capacity) {
    var keys = [], k, total = 0;
    for (k in weights) {
      if (!Object.prototype.hasOwnProperty.call(weights, k)) continue;
      if (!capacity[k]) continue;              /* 은행이 없는 단원은 제외 */
      if (weights[k] <= 0) continue;
      keys.push(k); total += weights[k];
    }
    var out = {}, i;
    for (i = 0; i < keys.length; i++) out[keys[i]] = 0;
    if (!keys.length || total <= 0) return out;

    var left = n, guard = 0;
    while (left > 0 && guard++ < 200) {
      /* 이번 회차에 더 받을 수 있는 단원만 대상으로 비율을 다시 계산 */
      var open = [], sum = 0;
      for (i = 0; i < keys.length; i++) {
        k = keys[i];
        if (out[k] < capacity[k]) { open.push(k); sum += weights[k]; }
      }
      if (!open.length || sum <= 0) break;

      var frac = [], given = 0;
      for (i = 0; i < open.length; i++) {
        k = open[i];
        var exact = left * weights[k] / sum;
        var whole = Math.floor(exact);
        if (out[k] + whole > capacity[k]) whole = capacity[k] - out[k];
        out[k] += whole; given += whole;
        frac.push({ k: k, r: exact - Math.floor(exact) });
      }
      var rest = left - given;
      if (rest <= 0 && given === 0) {
        /* 전부 소수점만 남았다 — 잔여가 큰 순으로 1개씩 */
        rest = left;
      }
      frac.sort(function (a, b) { return b.r - a.r; });
      for (i = 0; i < frac.length && rest > 0; i++) {
        k = frac[i].k;
        if (out[k] < capacity[k]) { out[k]++; rest--; }
      }
      var placed = 0;
      for (i = 0; i < keys.length; i++) placed += out[keys[i]];
      if (placed >= n) break;
      if (given === 0 && rest === left) break;   /* 진전이 없으면 중단 */
      left = n - placed;
    }
    return out;
  }

  function targetCounts(mode, roundKey, n, capacity) {
    var w = {}, c;

    if (mode === 'round') {
      w = EXAM_DIST[roundKey] || avgDist();
    } else if (mode === 'real') {
      w = EXAM_DIST[roundKey];                  /* 호출자가 회차를 뽑아 넘긴다 */
    } else if (mode === 'avg') {
      w = avgDist();
    } else if (mode === 'even') {
      /* 균형 — 먼저 모든 단원에 1문항씩 깔고, 남은 몫만 평균 비율로 */
      var base = {}, used = 0, avg = avgDist();
      for (c = 1; c <= 12; c++) {
        if (capacity[c]) { base[c] = 1; used++; }
      }
      var rest = allocate(avg, Math.max(0, n - used), (function () {
        var cap = {}, x;
        for (x = 1; x <= 12; x++) cap[x] = Math.max(0, (capacity[x] || 0) - (base[x] || 0));
        return cap;
      })());
      var out = {};
      for (c = 1; c <= 12; c++) {
        var v = (base[c] || 0) + (rest[c] || 0);
        if (v > 0) out[c] = v;
      }
      return out;
    }
    return allocate(w, n, capacity);
  }

  /* --------------------------------------------------------------- 추출 */
  function pickItems(opts) {
    var rng = makeRng(opts.seed);
    var rounds = recentRounds();
    var picked = [];

    function scoreOf(item) {
      var s = rng();
      if (opts.wrongBoost) {
        var e = window.EIP_WRONG ? window.EIP_WRONG.entry(item.id) : null;
        /* 최근 2회 연속으로 나온 문항에는 가산점을 주지 않는다 —
           안 그러면 틀린 문제 몇 개만 계속 돌아온다 (PLAN-exam 5-3) */
        if (e && e.w > 0 && recentCount(rounds, item.id) < 2) s *= 2.0;
      }
      return s;
    }
    function take(cand, want) {
      var fresh = [], stale = [], i;
      for (i = 0; i < cand.length; i++) {
        if (recentCount(rounds, cand[i].id) > 0) stale.push(cand[i]);
        else fresh.push(cand[i]);
      }
      function bySc(arr) {
        var m = [], j;
        for (j = 0; j < arr.length; j++) m.push({ it: arr[j], s: scoreOf(arr[j]) });
        m.sort(function (a, b) { return b.s - a.s; });
        return m;
      }
      var out = [], m = bySc(fresh);
      for (i = 0; i < m.length && out.length < want; i++) out.push(m[i].it);
      if (out.length < want) {            /* 신규가 모자라면 제외 조건을 완화 */
        m = bySc(stale);
        for (i = 0; i < m.length && out.length < want; i++) out.push(m[i].it);
      }
      return out;
    }

    if (opts.pool) {                      /* 단원 지정 · 오답만 — 분포를 쓰지 않는다 */
      picked = take(opts.pool, opts.n);
    } else {
      var pools = opts.pools, c;
      for (c in opts.targets) {
        if (!Object.prototype.hasOwnProperty.call(opts.targets, c)) continue;
        picked = picked.concat(take(pools[c] || [], opts.targets[c]));
      }
    }

    /* 순서 무작위화 (Fisher-Yates) */
    var i2, j2, tmp;
    for (i2 = picked.length - 1; i2 > 0; i2--) {
      j2 = Math.floor(rng() * (i2 + 1));
      tmp = picked[i2]; picked[i2] = picked[j2]; picked[j2] = tmp;
    }
    return picked;
  }

  /* ============================================================== 화면 */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function $(sel) { return document.querySelector(sel); }

  var setupBox, sheetBox, cards = [], timerId = null, current = null, submitBtn = null;

  function chapterTitle(n) {
    var k = 'ch' + (n < 10 ? '0' : '') + n;
    return (TOC[k] && TOC[k].t) || k;
  }

  /* ---------------------------------------------------------- 설정 화면 */
  function buildSetup() {
    setupBox.innerHTML = '';

    var form = el('div', 'exam__form');

    /* 범위 */
    var scope = el('select', 'exam__sel');
    scope.id = 'exam-scope';
    scope.appendChild(new Option('전 범위', 'all'));
    scope.appendChild(new Option('틀렸던 문제만', 'wrong'));
    var bk = bankChapters(), i;
    for (i = 0; i < bk.length; i++) {
      scope.appendChild(new Option(TOC[bk[i]].t, bk[i]));
    }
    form.appendChild(field('범위', scope));

    /* 분포 */
    var mode = el('select', 'exam__sel');
    mode.id = 'exam-mode';
    mode.appendChild(new Option('실전 랜덤 — 회차 하나를 골라 그 구성 그대로', 'real'));
    mode.appendChild(new Option('평균 — 7회분 평균 비율', 'avg'));
    var evenOpt = new Option('균형 — 모든 단원 최소 1문항', 'even');
    if (!allBanksReady()) {
      evenOpt.disabled = true;
      evenOpt.text = '균형 — 모든 단원 최소 1문항 (전 단원 은행이 채워지면 열립니다)';
    }
    mode.appendChild(evenOpt);
    for (i = 0; i < ROUNDS.length; i++) {
      mode.appendChild(new Option(roundLabel(ROUNDS[i]) + ' 구성으로', 'r:' + ROUNDS[i]));
    }
    form.appendChild(field('분포', mode));

    /* 문항 수 */
    var cnt = el('div', 'exam__radios');
    [10, 20, 30].forEach(function (v) {
      cnt.appendChild(radio('exam-n', String(v), v + '문항', v === 20));
    });
    form.appendChild(field('문항 수', cnt));

    /* 타이머 */
    var tm = el('div', 'exam__radios');
    [[0, '끄기'], [30, '30분'], [60, '60분'], [150, '150분']].forEach(function (p) {
      tm.appendChild(radio('exam-t', String(p[0]), p[1], p[0] === 0));
    });
    form.appendChild(field('타이머', tm));

    /* 오답 가중치 */
    var boostWrap = el('label', 'exam__check');
    var boost = document.createElement('input');
    boost.type = 'checkbox'; boost.id = 'exam-boost'; boost.checked = true;
    boostWrap.appendChild(boost);
    boostWrap.appendChild(el('span', null, '틀렸던 문제 더 자주 출제'));
    form.appendChild(field('', boostWrap));

    setupBox.appendChild(form);

    var go = el('button', 'quiz__grade exam__go', '문제지 만들기');
    go.type = 'button';
    go.addEventListener('click', function () { generate(null); });
    setupBox.appendChild(go);

    var note = el('p', 'exam__note');
    var have = bk.length, all = chapterKeys().length;
    note.textContent = have < all
      ? '문제 은행이 준비된 단원은 ' + have + '/' + all + ' 개입니다. 나머지 단원은 아직 출제되지 않습니다.'
      : '전 단원 문제 은행이 준비되어 있습니다.';
    setupBox.appendChild(note);

    buildHistory();
  }

  /* ------------------------------------------------------------ 응시 이력 */
  /* 📌 이력은 예전부터 쌓이고 있었는데 보여 주는 화면이 없었다.
     그래서 「저장이 안 된다」로 보였다. 데이터는 그대로 쓰고 화면만 붙인다. */
  function buildHistory() {
    var hist = historyList();
    if (!hist.length) return;

    var box = el('section', 'exam__hist');

    var head = el('div', 'exam__histhead');
    head.appendChild(el('h2', 'exam__histtitle', '응시 이력'));
    head.appendChild(el('span', 'exam__histn', hist.length + '회'));
    var clear = el('button', 'exam__histclear', '이력 지우기');
    clear.type = 'button';
    clear.addEventListener('click', clearHistory);
    head.appendChild(clear);
    box.appendChild(head);

    var book = answerBook();
    var list = el('ol', 'exam__histlist');

    hist.forEach(function (r) {
      var li = el('li', 'exam__histrow');

      var top = el('div', 'exam__histtop');
      top.appendChild(el('span', 'exam__histat', r.at));
      top.appendChild(el('span', 'exam__histseed', '#' + r.seed));
      var pct = r.total ? Math.round(r.score / r.total * 100) : 0;
      top.appendChild(el('strong', 'exam__histscore', r.score + ' / ' + r.total));
      top.appendChild(el('span', 'exam__histpct', pct + '%'));
      li.appendChild(top);

      var bar = el('div', 'bar');
      var fill = el('i');
      fill.style.width = pct + '%';
      bar.appendChild(fill);
      li.appendChild(bar);

      li.appendChild(el('div', 'exam__histch', chapterSummary(r.chapters)));

      var acts = el('div', 'exam__histacts');

      /* 답안이 남아 있는 회차만 복기할 수 있다 — 상한을 넘겨 밀려난 것은 못 연다 */
      if (has(book, String(r.seed))) {
        var rev = el('button', 'exam__histbtn', '복기');
        rev.type = 'button';
        rev.addEventListener('click', function () { renderReview(r); });
        acts.appendChild(rev);
      } else {
        acts.appendChild(el('span', 'exam__histnone', '답안 없음'));
      }

      var again = el('button', 'exam__histbtn', '같은 문제지 다시 풀기');
      again.type = 'button';
      again.addEventListener('click', function () {
        generate({ scope: 'all', mode: 'real', n: r.total, mins: 0, boost: false, seed: r.seed });
      });
      acts.appendChild(again);

      /* 🔒 한 건 삭제는 그 자리에서 한 번 더 묻는다.
         confirm() 은 제목 줄에 앱 이름·도메인이 붙어 무슨 창인지 알아볼 수 없다 (T28).
         행 안에서 「지울까요? 예 / 아니오」로 바꾸는 편이 무엇을 지우는지도 분명하다. */
      var del = el('button', 'exam__histdel', '삭제');
      del.type = 'button';
      del.title = '이 회차만 지웁니다';
      del.setAttribute('aria-label', r.at + ' 회차 삭제');
      del.addEventListener('click', function () { askDelete(li, acts, r); });
      acts.appendChild(del);

      li.appendChild(acts);
      list.appendChild(li);
    });

    box.appendChild(list);
    setupBox.appendChild(box);
  }

  /* 버튼 줄을 「이 회차를 지울까요? 지운다 / 그만두기」로 잠깐 바꾼다 */
  function askDelete(li, acts, r) {
    acts.innerHTML = '';
    li.classList.add('is-asking');

    acts.appendChild(el('span', 'exam__histask', '이 회차를 지울까요?'));

    var yes = el('button', 'exam__histdel exam__histdel--go', '지운다');
    yes.type = 'button';
    yes.addEventListener('click', function () { deleteRound(r); });
    acts.appendChild(yes);

    var no = el('button', 'exam__histbtn', '그만두기');
    no.type = 'button';
    no.addEventListener('click', function () {
      li.classList.remove('is-asking');
      /* 원래 버튼을 되살리는 대신 다시 그린다 —
         innerHTML 로 되돌리면 이벤트 핸들러가 안 살아난다 */
      refreshHistory();
    });
    acts.appendChild(no);

  }

  function deleteRound(r) {
    var hist = historyList();
    var out = [], i;
    for (i = 0; i < hist.length; i++) {
      if (hist[i].seed === r.seed && hist[i].at === r.at) continue;
      out.push(hist[i]);
    }
    write('exam.history', out);

    /* 이력에서 사라졌으니 그 회차 답안도 함께 지운다 — 아무도 못 여는 데이터다.
       ⚠️ 같은 seed 가 이력에 또 있으면 남긴다 (다른 날 같은 문제지를 푼 경우). */
    var stillThere = false;
    for (i = 0; i < out.length; i++) { if (out[i].seed === r.seed) { stillThere = true; break; } }
    if (!stillThere) {
      var book = answerBook();
      if (has(book, String(r.seed))) {
        delete book[String(r.seed)];
        write('exam.answers', book);
      }
    }

    refreshHistory();
  }

  function chapterSummary(perCh) {
    if (!perCh) return '';
    var nums = [], c;
    for (c in perCh) { if (has(perCh, c)) nums.push(parseInt(c, 10)); }
    nums.sort(function (a, b) { return a - b; });
    return nums.map(function (n) {
      return String(n) + '단원 ' + perCh[n].ok + '/' + perCh[n].total;
    }).join(' · ');
  }

  function clearHistory() {
    if (!confirmClear()) return;
    var s = store();
    if (s) { s.remove('exam.history'); s.remove('exam.answers'); }
    refreshHistory();
  }

  /* T28 에서 화면 안 대화상자로 바꿀 자리 — 지금은 confirm 이다 */
  function confirmClear() {
    return confirm('응시 이력과 저장된 답안을 모두 지웁니다.\n' +
                   '오답노트와 진도는 그대로 남습니다.\n\n' +
                   '지우기 전에 홈에서 「기록 내보내기」로 백업해 두면 되돌릴 수 있습니다.\n\n계속할까요?');
  }

  /* ------------------------------------------------------------ 복기 */
  /* 🔒 채점 위젯(qcard)을 그대로 쓴다. 답을 채워 넣고 잠근 뒤 결과를 그린다 —
     복기 전용 렌더를 따로 만들면 채점 화면과 생김새가 갈린다. */
  function renderReview(rec) {
    var book = answerBook();
    var saved = book[String(rec.seed)];
    if (!saved || !saved.a) return;

    stopTimer();
    setupBox.style.display = 'none';
    sheetBox.innerHTML = '';
    sheetBox.style.display = '';
    cards = [];
    current = null;

    var head = el('div', 'exam__head');
    var title = el('div', 'exam__headmain');
    title.appendChild(el('strong', null, '복기 — 모의 문제지 #' + rec.seed));
    title.appendChild(el('span', 'exam__headsub',
      rec.at + ' · ' + rec.score + ' / ' + rec.total));
    head.appendChild(title);
    sheetBox.appendChild(head);

    setBack('← 이력으로', '복기 #' + rec.seed, backToSetup);

    var list = el('ol', 'quiz__list exam__list');
    var missing = 0, id;

    for (id in saved.a) {
      if (!has(saved.a, id)) continue;
      var item = itemById(id);
      if (!item) { missing++; continue; }

      var li = el('li', 'quiz__item');
      var card = window.EIP_QCARD.create(item, li);
      var mine = saved.a[id];
      var ok = matchesSaved(item, mine);
      card.lock();
      card.showResult({ ok: ok, mine: mine });
      li.className = 'quiz__item ' + (ok ? 'is-ok' : 'is-no');
      list.appendChild(li);
    }
    sheetBox.appendChild(list);

    if (missing) {
      sheetBox.appendChild(el('p', 'exam__note',
        '문항 ' + missing + '개는 은행에서 찾지 못했습니다. 그 사이 문항이 바뀐 것입니다.'));
    }

    var foot = el('div', 'exam__acts');
    var back = el('button', 'exam__ghost', '← 이력으로');
    back.type = 'button';
    back.addEventListener('click', backToSetup);
    foot.appendChild(back);

    var again = el('button', 'quiz__grade', '같은 문제지 다시 풀기');
    again.type = 'button';
    again.addEventListener('click', function () {
      generate({ scope: 'all', mode: 'real', n: rec.total, mins: 0, boost: false, seed: rec.seed });
    });
    foot.appendChild(again);
    sheetBox.appendChild(foot);

    window.scrollTo(0, 0);
  }

  /* 저장된 답이 정답이었는지 — 채점 규칙은 qcard 것을 그대로 쓴다.
     ⚠️ 규칙을 여기서 다시 짜지 말 것. 정규화가 어긋나면 복기 결과가 그때와 달라진다. */
  function matchesSaved(item, mine) {
    var Q = window.EIP_QCARD;
    if (!Q || !Q.matchText) return false;
    if (mine === '(무응답)') return false;
    if (item.t === 'ox') return (mine === 'O') === !!item.a;
    if (item.t === 'choice') return mine === (item.c || [])[item.a];
    return Q.matchText(mine, item.a, item.t === 'code');
  }

  function field(label, control) {
    var row = el('div', 'exam__row');
    row.appendChild(el('span', 'exam__label', label));
    var box = el('div', 'exam__ctrl');
    box.appendChild(control);
    row.appendChild(box);
    return row;
  }
  function radio(name, value, label, checked) {
    var lab = el('label', 'exam__radio');
    var r = document.createElement('input');
    r.type = 'radio'; r.name = name; r.value = value;
    if (checked) r.checked = true;
    lab.appendChild(r);
    lab.appendChild(el('span', null, label));
    return lab;
  }
  function radioValue(name) {
    var list = document.getElementsByName(name), i;
    for (i = 0; i < list.length; i++) { if (list[i].checked) return list[i].value; }
    return null;
  }

  /* ------------------------------------------------------------ 생성 */
  function generate(forced) {
    var scope = forced ? forced.scope : $('#exam-scope').value;
    var modeRaw = forced ? forced.mode : $('#exam-mode').value;
    var n = forced ? forced.n : parseInt(radioValue('exam-n'), 10);
    var mins = forced ? forced.mins : parseInt(radioValue('exam-t'), 10);
    var boost = forced ? forced.boost : $('#exam-boost').checked;
    var seed = forced && forced.seed ? forced.seed : (Math.floor(Math.random() * 900000) + 100000);

    var pools = poolByChapter();
    var opts = { seed: seed, n: n, wrongBoost: boost, pools: pools };
    var rng0 = makeRng(seed);
    var mode = modeRaw, roundKey = null;

    if (modeRaw.indexOf('r:') === 0) { mode = 'round'; roundKey = modeRaw.slice(2); }
    else if (modeRaw === 'real') { roundKey = ROUNDS[Math.floor(rng0() * ROUNDS.length)]; }

    if (scope === 'wrong') {
      opts.pool = wrongPool(pools);
      if (!opts.pool.length) { alert('아직 틀린 문제가 없습니다. 먼저 문제를 풀어 주세요.'); return; }
    } else if (scope !== 'all') {
      opts.pool = pools[numOf(scope)] || [];
      if (!opts.pool.length) { alert('이 단원은 아직 문제 은행이 없습니다.'); return; }
    } else {
      var cap = {}, c;
      for (c in pools) {
        if (Object.prototype.hasOwnProperty.call(pools, c)) cap[c] = pools[c].length;
      }
      opts.targets = targetCounts(mode, roundKey, n, cap);
    }

    var items = pickItems(opts);
    if (!items.length) { alert('문항을 뽑지 못했습니다.'); return; }

    current = {
      seed: seed, items: items, mins: mins,
      scope: scope, mode: modeRaw, n: n, boost: boost,
      roundKey: roundKey
    };
    renderSheet();
  }

  function wrongPool(pools) {
    if (!window.EIP_WRONG) return [];
    var all = window.EIP_WRONG.all(), out = [], c, i, id;
    for (c in pools) {
      if (!Object.prototype.hasOwnProperty.call(pools, c)) continue;
      for (i = 0; i < pools[c].length; i++) {
        id = pools[c][i].id;
        if (all[id] && all[id].w > 0) out.push(pools[c][i]);
      }
    }
    return out;
  }

  /* ------------------------------------------------------------ 시험지 */
  function renderSheet() {
    stopTimer();
    setupBox.style.display = 'none';
    sheetBox.innerHTML = '';
    sheetBox.style.display = '';
    cards = [];

    var head = el('div', 'exam__head');
    var title = el('div', 'exam__headmain');
    title.appendChild(el('strong', null, '모의 문제지 #' + current.seed));
    var sub = current.items.length + '문항';
    if (current.roundKey) sub += ' · ' + roundLabel(current.roundKey) + ' 구성';
    if (current.mins) sub += ' · ' + current.mins + '분';
    title.appendChild(el('span', 'exam__headsub', sub));
    head.appendChild(title);

    if (current.mins) {
      var t = el('span', 'exam__timer', '--:--');
      t.id = 'exam-timer';
      head.appendChild(t);
    }
    sheetBox.appendChild(head);

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
    submitBtn.addEventListener('click', function () { doSubmit(false); });
    foot.appendChild(submitBtn);

    var again = el('button', 'exam__ghost', '다른 문제지 만들기');
    again.type = 'button';
    again.addEventListener('click', backToSetup);
    foot.appendChild(again);
    sheetBox.appendChild(foot);

    setBack("← 모의 문제지", "#" + current.seed, backToSetup);

    if (current.mins) startTimer(current.mins * 60);
    window.scrollTo(0, 0);
  }

  function backToSetup() {
    stopTimer();
    sheetBox.style.display = "none";
    sheetBox.innerHTML = "";
    setupBox.style.display = "";
    resetBack("모의 문제지");
    /* 방금 푼 회차가 이력에 보여야 한다. 설정은 건드리지 않고 이력만 다시 그린다 —
       buildSetup 을 통째로 부르면 골라 둔 범위·분포가 초기화된다. */
    refreshHistory();
    window.scrollTo(0, 0);
  }

  function refreshHistory() {
    var old = setupBox.querySelector('.exam__hist');
    if (old) old.parentNode.removeChild(old);
    buildHistory();
  }

  /* ------------------------------------------------------- 헤더 뒤로가기 */
  /* 🚨 **링크의 주인은 app.js 하나다.** 여기서 따로 핸들러를 걸었더니
     app.js 것과 둘 다 실행돼 「← 모의 문제지」를 눌러도 홈으로 갔다.
     한 페이지 안에서 화면이 바뀌는 것만 여기서 알려 준다. */
  function setBack(label, where, fn) {
    if (window.EIP && window.EIP.setBack) window.EIP.setBack(label, where, fn);
  }
  /* 화면 전환이 끝나고 「처음 상태」로 돌아갈 때 — 직전이 우리 사이트면 그리로 간다 */
  function resetBack(where) {
    var w = document.querySelector('.js-where');
    if (w) w.textContent = where;
    if (window.EIP && window.EIP.initBack) window.EIP.initBack();
  }

  /* ------------------------------------------------------------- 타이머 */
  function startTimer(sec) {
    var left = sec;
    var node = document.getElementById('exam-timer');
    function paint() {
      var m = Math.floor(left / 60), s = left % 60;
      if (node) {
        node.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        if (left <= 60) node.className = 'exam__timer is-urgent';
      }
    }
    paint();
    timerId = setInterval(function () {
      left--;
      if (left <= 0) { stopTimer(); paint(); doSubmit(true); return; }
      paint();
    }, 1000);
  }
  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  /* -------------------------------------------------------------- 채점 */
  function doSubmit(byTimeout) {
    if (!cards.length || cards[0].card.isGraded()) return;
    stopTimer();
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = '채점 완료'; }

    var score = 0;
    var perCh = {};      /* 단원 번호 → {ok, total} */
    var wrongItems = [];
    var answers = {};    /* 문항 id → 내가 쓴 답 */

    cards.forEach(function (row) {
      var res = row.card.judge();
      row.card.lock();
      row.card.showResult(res);
      row.li.className = 'quiz__item ' + (res.ok ? 'is-ok' : 'is-no');

      answers[row.item.id] = res.mine;

      var c = row.item.ch;
      if (!perCh[c]) perCh[c] = { ok: 0, total: 0 };
      perCh[c].total++;
      if (res.ok) { score++; perCh[c].ok++; }
      else wrongItems.push(row.item);

      /* 오답 가중치 설정과 무관하게 항상 적립한다 */
      if (window.EIP_WRONG) window.EIP_WRONG.record(row.item.id, res.ok);
    });

    /* 🚨 「틀린 것만 다시 풀기」는 기록하지 않는다.
       seed 가 원래 회차와 같아서 답안을 덮어써 버리고 (그 회차 복기가 12문항짜리로 줄어든다),
       이력에도 「12문항 중 12점」 같은 왜곡된 줄이 남는다.
       원래 회차의 기록을 지키는 쪽이 맞다. */
    if (!current.partial) {
      saveHistory(score, perCh);
      saveAnswers(current.seed, answers);
    }
    renderResult(score, perCh, wrongItems, byTimeout);
  }

  function saveHistory(score, perCh) {
    var ids = current.items.map(function (i) { return i.id; });
    var rounds = recentRounds();
    rounds.unshift(ids);
    while (rounds.length > RECENT_KEEP) rounds.pop();
    write('exam.recent', rounds);

    var hist = read('exam.history', []) || [];
    var d = new Date();
    var mm = d.getMonth() + 1, dd = d.getDate();
    hist.unshift({
      seed: current.seed,
      at: d.getFullYear() + '-' + (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd,
      score: score,
      total: current.items.length,
      chapters: perCh
    });
    while (hist.length > HISTORY_KEEP) hist.pop();
    writeHistory(hist);
  }

  function renderResult(score, perCh, wrongItems, byTimeout) {
    var box = el('section', 'exam__result');

    var pct = Math.round(score / current.items.length * 100);
    var h = el('div', 'exam__score');
    h.appendChild(el('strong', null, score + ' / ' + current.items.length));
    h.appendChild(el('span', null, pct + '%'));
    box.appendChild(h);

    if (byTimeout) {
      box.appendChild(el('p', 'exam__timeout', '시간이 끝나 자동으로 제출되었습니다.'));
    }

    var tbl = el('div', 'exam__bars');
    var nums = [], c;
    for (c in perCh) { if (Object.prototype.hasOwnProperty.call(perCh, c)) nums.push(parseInt(c, 10)); }
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

    var acts = el('div', 'exam__acts');
    if (wrongItems.length) {
      var re = el('button', 'quiz__grade', '틀린 것만 다시 풀기 (' + wrongItems.length + ')');
      re.type = 'button';
      re.addEventListener('click', function () {
        current = {
          seed: current.seed, items: wrongItems.slice(0), mins: 0,
          scope: current.scope, mode: current.mode, n: wrongItems.length,
          boost: current.boost, roundKey: null,
          partial: true   /* 이력·답안에 남기지 않는다 — doSubmit 주석 참고 */
        };
        renderSheet();
      });
      acts.appendChild(re);
    }
    var nw = el('button', 'exam__ghost', '새 문제지');
    nw.type = 'button';
    nw.addEventListener('click', backToSetup);
    acts.appendChild(nw);

    var toWrong = el('a', 'exam__ghost', '오답노트 보기');
    toWrong.href = 'wrong.html';
    acts.appendChild(toWrong);
    box.appendChild(acts);

    sheetBox.insertBefore(box, sheetBox.firstChild);
    window.scrollTo(0, 0);
  }

  /* -------------------------------------------------------------- 시작 */
  function boot() {
    setupBox = document.getElementById('exam-setup');
    sheetBox = document.getElementById('exam-sheet');
    if (!setupBox || !sheetBox) return;

    setupBox.innerHTML = '<p class="exam__loading">문제 은행을 불러오는 중…</p>';
    loadBanks(bankChapters(), function () {
      buildSetup();
      /* exam.html?seed=48213 으로 같은 문제지를 다시 열 수 있다 */
      var m = /[?&]seed=(\d+)/.exec(location.search);
      if (m) {
        generate({
          scope: 'all', mode: 'real', n: 20, mins: 0, boost: true,
          seed: parseInt(m[1], 10)
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
