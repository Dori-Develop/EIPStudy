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
     회차별 단원 분포 — 🔒 **개정 이후 21회차 420문항 실측** (T45).
     값은 그 회차에서 해당 단원이 몇 문항 나왔는가. 각 행의 합은 20이다.

     옛 표는 7회차 139문항 표본이었다. 21회차를 다 담아 교체했다.
     🔑 10장이 22% → 33% 로 늘었고, 3·6장은 개정 초기에만 나왔다
     (3장은 2021-1, 6장은 2022-1 이 마지막) — 그래도 0으로 빼지 않는다.
     → EIPStudy-notes/exam-archive/chapters.md
     ------------------------------------------------------------------------ */
  var EXAM_DIST = {
    '2020-1': { 1:1, 2:2, 3:0, 4:2, 5:2, 6:0, 7:2, 8:1, 9:2, 10:3, 11:4, 12:1 },
    '2020-2': { 1:1, 2:2, 3:1, 4:1, 5:1, 6:1, 7:1, 8:3, 9:2, 10:3, 11:3, 12:1 },
    '2020-3': { 1:1, 2:2, 3:1, 4:1, 5:0, 6:1, 7:2, 8:3, 9:0, 10:5, 11:3, 12:1 },
    '2020-4': { 1:1, 2:2, 3:0, 4:1, 5:0, 6:0, 7:2, 8:1, 9:2, 10:5, 11:6, 12:0 },
    '2021-1': { 1:1, 2:4, 3:2, 4:1, 5:0, 6:0, 7:2, 8:1, 9:2, 10:4, 11:3, 12:0 },
    '2021-2': { 1:1, 2:2, 3:0, 4:2, 5:0, 6:1, 7:2, 8:3, 9:1, 10:5, 11:3, 12:0 },
    '2021-3': { 1:2, 2:1, 3:0, 4:2, 5:0, 6:1, 7:3, 8:2, 9:3, 10:5, 11:1, 12:0 },
    '2022-1': { 1:0, 2:3, 3:0, 4:0, 5:0, 6:1, 7:4, 8:1, 9:3, 10:7, 11:1, 12:0 },
    '2022-2': { 1:0, 2:3, 3:0, 4:2, 5:1, 6:0, 7:2, 8:2, 9:2, 10:6, 11:2, 12:0 },
    '2022-3': { 1:1, 2:2, 3:0, 4:1, 5:0, 6:0, 7:1, 8:2, 9:4, 10:6, 11:2, 12:1 },
    '2023-1': { 1:0, 2:2, 3:0, 4:1, 5:1, 6:0, 7:1, 8:2, 9:3, 10:8, 11:2, 12:0 },
    '2023-2': { 1:0, 2:2, 3:0, 4:1, 5:0, 6:0, 7:2, 8:2, 9:1, 10:9, 11:2, 12:1 },
    '2023-3': { 1:1, 2:2, 3:0, 4:0, 5:0, 6:0, 7:1, 8:1, 9:2, 10:8, 11:5, 12:0 },
    '2024-1': { 1:0, 2:1, 3:0, 4:2, 5:0, 6:0, 7:1, 8:3, 9:2, 10:8, 11:3, 12:0 },
    '2024-2': { 1:0, 2:2, 3:0, 4:3, 5:0, 6:0, 7:0, 8:1, 9:2, 10:9, 11:3, 12:0 },
    '2024-3': { 1:1, 2:2, 3:0, 4:1, 5:0, 6:0, 7:1, 8:1, 9:2, 10:9, 11:3, 12:0 },
    '2025-1': { 1:0, 2:2, 3:0, 4:2, 5:0, 6:0, 7:1, 8:1, 9:2, 10:9, 11:3, 12:0 },
    '2025-2': { 1:0, 2:3, 3:0, 4:1, 5:1, 6:0, 7:1, 8:0, 9:1, 10:9, 11:4, 12:0 },
    '2025-3': { 1:1, 2:2, 3:0, 4:0, 5:0, 6:0, 7:2, 8:2, 9:3, 10:8, 11:2, 12:0 },
    '2026-1': { 1:1, 2:1, 3:0, 4:2, 5:0, 6:0, 7:1, 8:3, 9:3, 10:7, 11:2, 12:0 },
    '2026-2': { 1:0, 2:1, 3:0, 4:2, 5:0, 6:0, 7:1, 8:4, 9:1, 10:7, 11:4, 12:0 }
  };
  var ROUNDS = ['2020-1', '2020-2', '2020-3', '2020-4',
                '2021-1', '2021-2', '2021-3',
                '2022-1', '2022-2', '2022-3',
                '2023-1', '2023-2', '2023-3',
                '2024-1', '2024-2', '2024-3',
                '2025-1', '2025-2', '2025-3',
                '2026-1', '2026-2'];

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
  /* 🔒 **응시 하나를 가리키는 키.** seed 가 아니다 —
     같은 문제지를 두 번 풀 수 있고, seed 로만 묶으면 **앞의 답안이 덮인다.**
     옛 기록에는 ts 가 없으므로 seed 로 물러난다. */
  function histKey(rec) {
    return rec && rec.ts ? String(rec.ts) : String(rec && rec.seed);
  }

  function saveAnswers(key, map) {
    var all = answerBook();
    all[String(key)] = { at: (new Date()).getTime(), a: map };

    var live = {}, hist = historyList(), i, n = 0, k2;
    for (i = 0; i < hist.length && n < ANSWERS_KEEP; i++) {
      k2 = histKey(hist[i]);
      if (!live[k2]) { live[k2] = 1; n++; }
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

  /* 🔒 이력에 적힌 문항 목록을 **그대로** 다시 낸다.
     seed 로 다시 뽑으면 그 사이 바뀐 것들 때문에 다른 문제지가 된다 —
     최근 출제 이력(recent)·오답 가중치·회차 수가 전부 추출에 끼어든다.
     ids 가 없는 옛 기록만 seed 재계산으로 물러난다. */
  function replayRecord(rec) {
    if (!rec.ids || !rec.ids.length) {
      /* 옛 기록 — seed 로 다시 뽑는다. 그때와 다를 수 있다고 알린다. */
      generate({ scope: 'all', mode: 'real', n: rec.total, mins: 0, boost: false, seed: rec.seed });
      return;
    }
    var items = [], missing = 0, i, it;
    for (i = 0; i < rec.ids.length; i++) {
      it = itemById(rec.ids[i]);
      if (it) items.push(it); else missing++;
    }
    if (!items.length) { alert('그때의 문항을 은행에서 찾지 못했습니다.'); return; }
    if (missing) {
      alert('문항 ' + missing + '개는 은행에서 찾지 못해 빼고 냅니다. 그 사이 문항이 바뀐 것입니다.');
    }
    current = {
      seed: rec.seed, items: items, mins: 0,
      scope: 'all', mode: 'real', n: items.length,
      boost: false, roundKey: null, partial: false
    };
    renderSheet();
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
  /* 🔒 **O/X 는 모의 문제지에 넣지 않는다.** 실기 기출 400문항 중 O/X 는 0이다 —
     전부 필답 단답이다. 은행의 O/X 124문항은 버리지 않고 **섹션 퀴즈에만** 남긴다.
     개념을 빨리 확인하는 데는 쓸모가 있다. → decisions/exam-format.md 6장 */
  function inExam(item) {
    return item && item.t !== 'ox';
  }

  function poolByChapter() {
    var out = {}, keys = bankChapters(), i, bank, n, pool;
    for (i = 0; i < keys.length; i++) {
      bank = window['EIP_BANK_' + keys[i]];
      if (!bank || !bank.length) continue;
      pool = bank.filter(inExam);
      if (!pool.length) continue;
      n = numOf(keys[i]);
      out[n] = pool;
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
  /* 🔒 **실제 시험은 20문항 중 7~9가 프로그래밍이다** (최근 회차 기준 40%).
     챕터 분포만 맞추면 10단원이 6~7문항 들어오지만 **그 안에서 코드 문항이
     뽑히리라는 보장이 없다** — 우리 10단원 은행은 3분의 2가 개념 문항이라
     실제로 코드가 2문항밖에 안 나왔다.

     그래서 **단원 배정은 그대로 두고, 그 안에서 코드 문항을 먼저 채운다.**
     목표에 닿으면 우대를 멈춰 개념 문항도 들어온다.

     ✅ **은행이 코드 210문항을 채웠다** (C 65 · Java 60 · SQL 60 · Python 25, 2026-08-17).
        실제 파일을 불러 12회 뽑아 보면 **코드 평균 7.8 / 20 · 전부 뒤쪽 · 중복 0 ·
        이웃 회차 겹침 1.7** 이다. 이제 이 규칙이 제값을 한다. */
  var CODE_SHARE = 0.4;

  /* 🔒 **보기 선택 문항도 같은 문제를 겪는다** — 실제 회차는 2~5문항인데
     은행에서 차지하는 비율이 낮아 그냥 뽑으면 회차당 **1.75** 밖에 안 들어왔다.
     코드와 똑같이 **목표 수까지만 앞으로 당긴다.**
     🔑 값이 0.10 인 것은 **넘침을 막지 않기 때문**이다 — 목표 2 로 잡으면
     실제로는 **4.0** 이 들어와 2~5 한가운데에 선다 (80문항 · 12회 추출 실측).
     0.15 로 하면 4.67 로 위쪽 끝에 붙는다. */
  var PICK_SHARE = 0.10;

  /* 🖼️ **그림 문항도 같다** — 기출은 회차마다 흐름도가 하나쯤 나오는데
     은행에 12문항뿐이라 그냥 뽑으면 **세 회차에 한 번**(0.33)밖에 안 나왔다.
     넘침을 막지 않으므로 목표 1 로 잡아도 실제로는 1.5 안팎이 된다. */
  var FIG_SHARE = 0.05;

  function pickItems(opts) {
    var rng = makeRng(opts.seed);
    var rounds = recentRounds();
    var picked = [];
    var codeWant = Math.round(opts.n * CODE_SHARE);
    var codeGot = 0;
    var pickWant = Math.round(opts.n * PICK_SHARE);
    var pickGot = 0;
    var figWant = Math.round(opts.n * FIG_SHARE);
    var figGot = 0;

    function scoreOf(item) {
      var s = rng();
      if (opts.wrongBoost) {
        var e = window.EIP_WRONG ? window.EIP_WRONG.entry(item.id) : null;
        /* 최근 2회 연속으로 나온 문항에는 가산점을 주지 않는다 —
           안 그러면 틀린 문제 몇 개만 계속 돌아온다 (PLAN-exam 5-3) */
        if (e && e.w > 0 && recentCount(rounds, item.id) < 2) s *= 2.0;
      }
      /* 목표에 닿을 때까지만 코드 문항을 앞으로 당긴다.
         난수보다 큰 값을 더해 같은 신선도 안에서는 코드가 먼저 서게 한다. */
      if (item.t === 'code' && codeGot < codeWant) s += 10;
      /* 보기 선택도 같은 방식으로. 코드보다 가산점이 낮아 **코드가 먼저 선다** */
      else if (item.fig && figGot < figWant) s += 7;    /* 코드 다음, 보기 선택 앞 */
      else if (item.pool && pickGot < pickWant) s += 5;
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
      /* 예산은 **문항 단위로** 센다. 챕터가 끝난 뒤에 세면 한 챕터에서 한꺼번에
         뽑혀 목표를 넘긴다 (10단원 하나로 7문항이 다 코드가 된다). */
      var out = [], seen = {};
      function fill(list, allowOverCode) {
        var k, it2;
        for (k = 0; k < list.length && out.length < want; k++) {
          it2 = list[k].it;
          if (seen[it2.id]) continue;          /* 완화 패스에서 같은 문항을 또 담지 않게 */
          if (it2.t === 'code') {
            if (!allowOverCode && codeGot >= codeWant) continue;   /* 예산 초과 */
            codeGot++;
          } else if (it2.fig) {
            /* 🚨 그림만은 **막는다.** 은행에 12문항뿐이라 넘치게 두면 회차마다 1.75 가
               들어오고 **같은 그림이 자꾸 되돌아온다**(이웃 겹침 2.0 → 2.45).
               기출도 회차당 하나쯤이라 막는 편이 실제에 가깝다. */
            if (!allowOverCode && figGot >= figWant) continue;
            figGot++;
          } else if (it2.pool) {
            /* 🚨 보기 선택은 **넘쳐도 막지 않는다.** 코드와 달리 개념 문항이라
               몇 개 더 들어와도 시험지가 이상해지지 않고, 막으면 은행이 얇은
               단원에서 자리를 못 채운다. 세기만 해서 가산점을 멈춘다. */
            pickGot++;
          }
          seen[it2.id] = 1;
          out.push(it2);
        }
      }
      fill(bySc(fresh), false);
      if (out.length < want) fill(bySc(stale), false);   /* 신규가 모자라면 완화 */
      /* 그래도 못 채웠으면 코드 예산을 넘겨서라도 채운다 —
         빈 자리로 두는 것보다 낫다 (은행이 얇은 단원에서 일어난다) */
      if (out.length < want) { fill(bySc(fresh), true); fill(bySc(stale), true); }
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

    /* 🔒 **실제 시험은 프로그래밍이 뒤쪽에 몰린다** — 최근 회차는 뒤 7~9문항이고
       끝은 늘 20번이다. 무작위로 흩어 놓으면 시간 배분 연습이 안 된다.
       섞은 결과를 유지한 채 **코드 문항만 뒤로 옮긴다** (안정 분할).
       → EIPStudy-notes/exam-archive/README.md 2장 「배치」 */
    var head = [], tail = [], i3;
    for (i3 = 0; i3 < picked.length; i3++) {
      if (picked[i3].t === 'code') tail.push(picked[i3]);
      else head.push(picked[i3]);
    }
    return head.concat(tail);
  }

  /* ============================================================== 화면 */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function $(sel) { return document.querySelector(sel); }

  var setupBox, sheetBox, cards = [], timerId = null, current = null;
  var submitBtn = null, againBtn = null;
  /* 남은 시간 — startTimer 안에 가둬 두면 시트를 감췄다 되살릴 때 이어 갈 수 없다 */
  var timeLeft = 0;

  /* ------------------------------------------------- 브라우저 뒤로가기
     🚨 exam.html 은 한 페이지 안에서 **설정 ↔ 시험지**를 오간다.
     히스토리에 아무것도 쌓지 않으면 브라우저 뒤로가기가 **사이트 홈으로 나가 버린다** —
     방금 보던 문제지로 돌아가지 못한다.

     화면을 바꿀 때마다 항목을 하나 쌓고, 뒤로 오면 그 항목이 말하는 화면을 되살린다.

       exam.html(설정) → [문제지 생성] sheet → [홈으로] setup'
       뒤로가기 → sheet → 뒤로가기 → 설정 → 뒤로가기 → 사이트 홈

     🔑 **`eipD` 를 그대로 물려준다.** app.js 가 그 번호로 「뒤에 화면이 있나」를
        판정하므로 빠뜨리면 왼쪽 아래 뒤로가기 버튼이 어긋난다. */
  var sheetTag = '';        /* 지금 sheetBox 에 그려져 있는 것의 이름 */
  var viewSeq = 0;

  function pushView(tag) {
    if (!window.history || !history.pushState) return;
    var s = history.state || {};
    try { history.pushState({ eipD: s.eipD, exam: tag }, ''); } catch (e) {}
  }

  /* 시험지·복기를 새로 그렸다고 알린다. 항목마다 이름이 달라야
     옛 항목으로 돌아갔을 때 **엉뚱한 시험지**를 되살리지 않는다. */
  function markSheet(kind, seed) {
    sheetTag = kind + ':' + seed + ':' + (++viewSeq);
    pushView(sheetTag);
  }

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
    /* 최신 회차부터 — 고를 일이 많은 것이 위에 있어야 한다.
       ⚠️ ROUNDS 자체는 오래된 순서다 (`real` 모드의 무작위 추출이 그 순서에 걸려 있어
          뒤집으면 같은 seed 가 다른 회차를 가리킨다). **표시만 뒤집는다.** */
    for (i = ROUNDS.length - 1; i >= 0; i--) {
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
      /* 같은 문제지를 두 번 풀면 날짜·seed 가 같다 — 시각이 있어야 구분된다 */
      top.appendChild(el('span', 'exam__histat', r.at + (r.hm ? ' ' + r.hm : '')));
      top.appendChild(el('span', 'exam__histseed', '#' + r.seed));
      /* pt 가 있으면 배점으로 — 없으면 옛 기록이라 문항 수로 보여 준다 */
      var hasPt = typeof r.pt === 'number' && r.ptMax;
      var pct = hasPt ? Math.round(r.pt / r.ptMax * 100)
                      : (r.total ? Math.round(r.score / r.total * 100) : 0);
      top.appendChild(el('strong', 'exam__histscore', hasPt
        ? ptText(r.pt) + ' / ' + r.ptMax + '점'
        : r.score + ' / ' + r.total));
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
      if (has(book, histKey(r))) {
        var rev = el('button', 'exam__histbtn', '복기 →');
        rev.type = 'button';
        rev.addEventListener('click', function () { renderReview(r); });
        acts.appendChild(rev);
      } else {
        acts.appendChild(el('span', 'exam__histnone', '답안 없음'));
      }

      var again = el('button', 'exam__histbtn', '↻ 같은 문제지 다시 풀기');
      again.type = 'button';
      again.addEventListener('click', function () {
        replayRecord(r);
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
    /* 🔒 응시 단위(histKey)로 본다 — seed 로 보면 **같은 문제지의 다른 응시 답안**을
       같이 지운다. 같은 seed 가 이력에 또 있어도 그 응시의 답안은 따로 있다. */
    var key = histKey(r), stillThere = false;
    for (i = 0; i < out.length; i++) { if (histKey(out[i]) === key) { stillThere = true; break; } }
    if (!stillThere) {
      var book = answerBook();
      if (has(book, key)) {
        delete book[key];
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

  /* ✅ T32 에서 `dialog.js` 로 바꿨다 — `confirm()` 은 제목 줄에 앱 이름이 붙어
     무슨 창인지 알아볼 수 없다. 대화상자는 한 벌뿐이다. */
  function clearHistory() {
    var D = window.EIP_DIALOG;
    if (!D) return;
    D.confirm({
      title: '응시 이력을 지울까요?',
      sub: historyList().length + '회분 · 저장된 답안 포함',
      body: '오답노트와 진도는 그대로 남습니다. ' +
            '지우기 전에 홈에서 「기록 내보내기」로 받아 두면 되돌릴 수 있습니다.',
      ok: '이력 지우기',
      danger: true,
      onOk: function () {
        var s = store();
        if (s) { s.remove('exam.history'); s.remove('exam.answers'); }
        refreshHistory();
      }
    });
  }

  /* ------------------------------------------------------------ 복기 */
  /* 🔒 채점 위젯(qcard)을 그대로 쓴다. 답을 채워 넣고 잠근 뒤 결과를 그린다 —
     복기 전용 렌더를 따로 만들면 채점 화면과 생김새가 갈린다. */
  function renderReview(rec) {
    var book = answerBook();
    var saved = book[histKey(rec)];
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
      rec.at + ' · ' + (typeof rec.pt === 'number' && rec.ptMax
        ? ptText(rec.pt) + ' / ' + rec.ptMax + '점'
        : rec.score + ' / ' + rec.total)));
    head.appendChild(title);
    sheetBox.appendChild(head);

    setBack('← 응시 이력', '문제지 복기 #' + rec.seed, backToSetup);
    markSheet('review', rec.seed);

    if (window.EIP_QCARD.memoToggle) sheetBox.appendChild(window.EIP_QCARD.memoToggle());

    var list = el('ol', 'quiz__list exam__list');
    var missing = 0, id;

    for (id in saved.a) {
      if (!has(saved.a, id)) continue;
      var item = itemById(id);
      if (!item) { missing++; continue; }

      var li = el('li', 'quiz__item');
      var card = window.EIP_QCARD.create(item, li);
      var mine = saved.a[id];
      var g = gradeSaved(item, mine);
      card.lock();
      card.showResult({ ok: g.ok, mine: mine, got: g.got, max: g.max });
      li.className = 'quiz__item ' + (g.ok ? 'is-ok' : (g.got ? 'is-part' : 'is-no'));
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

    var again = el('button', 'quiz__grade', '↻ 같은 문제지 다시 풀기');
    again.type = 'button';
    again.addEventListener('click', function () {
      replayRecord(rec);
    });
    foot.appendChild(again);
    sheetBox.appendChild(foot);

    window.scrollTo(0, 0);
  }

  /* 배점 — 규칙은 qcard 한 벌뿐이다. 없으면 옛 방식(맞으면 1점)으로 물러난다. */
  function qscore(res) {
    var Q = window.EIP_QCARD;
    if (Q && Q.score) return Q.score(res);
    return res && res.ok ? 5 : 0;
  }
  function fullPt() {
    var Q = window.EIP_QCARD;
    return (Q && Q.FULL_PT) || 5;
  }
  /* 소수 첫째 자리까지만 — 2.5 는 그대로, 5.0 은 5 로 */
  function ptText(n) {
    return (Math.round(n * 10) / 10).toString();
  }

  /* 저장된 답을 다시 채점한다 — 칸 수까지 돌려줘야 복기에서도 부분 정답이 보인다. */
  function gradeSaved(item, mine) {
    var Q = window.EIP_QCARD;
    var max = (item.parts && item.parts.length) || 1;
    if (max === 1) {
      var ok1 = matchesSaved(item, mine);
      return { ok: ok1, got: ok1 ? 1 : 0, max: 1 };
    }
    var got = 0, i, p;
    if (Q && Q.matchText && Object.prototype.toString.call(mine) === '[object Array]') {
      for (i = 0; i < item.parts.length; i++) {
        p = item.parts[i];
        if (Q.matchText(mine[i] || '', p.a || [], p.t === 'code')) got++;
      }
    }
    return { ok: got === max, got: got, max: max };
  }

  /* 저장된 답이 정답이었는지 — 채점 규칙은 qcard 것을 그대로 쓴다.
     ⚠️ 규칙을 여기서 다시 짜지 말 것. 정규화가 어긋나면 복기 결과가 그때와 달라진다. */
  function matchesSaved(item, mine) {
    var Q = window.EIP_QCARD;
    if (!Q || !Q.matchText) return false;
    if (mine === '(무응답)' || mine == null) return false;
    /* parts 는 칸마다 배열로 저장된다 — 전부 맞아야 정답이다 */
    if (item.parts) {
      if (Object.prototype.toString.call(mine) !== '[object Array]') return false;
      var i, p;
      for (i = 0; i < item.parts.length; i++) {
        p = item.parts[i];
        if (!Q.matchText(mine[i] || '', p.a || [], p.t === 'code')) return false;
      }
      return true;
    }
    if (item.t === 'ox') return (mine === 'O') === !!item.a;
    if (item.t === 'multi') {
      return mine === (item.a || []).map(function (k) { return (item.c || [])[k]; }).join(' · ');
    }
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
    /* 채점 뒤에는 같은 버튼이 「나가기」가 된다 — 핸들러를 새로 걸지 않고
       여기서 갈라 준다. 두 번 걸면 한 번 눌러 둘 다 도는 사고가 난다. */
    submitBtn.addEventListener('click', function () {
      if (submitBtn.getAttribute('data-done') === '1') backToSetup();
      else doSubmit(false);
    });
    foot.appendChild(submitBtn);

    againBtn = el('button', 'exam__ghost', '↩ 다른 문제지 만들기');
    againBtn.type = 'button';
    againBtn.addEventListener('click', backToSetup);
    foot.appendChild(againBtn);
    sheetBox.appendChild(foot);

    setBack('← 모의 문제지 생성',
      (current.partial ? '틀린 것만 다시 풀기' : '문제 풀기') + ' #' + current.seed,
      backToSetup);

    timeLeft = 0;
    if (current.mins) startTimer(current.mins * 60);
    markSheet('sheet', current.seed);
    window.scrollTo(0, 0);
  }

  /* 화면만 바꾼다 — 히스토리는 건드리지 않는다.
     🚨 **시험지를 지우지 않고 감추기만 한다.** 지우면 뒤로가기로 돌아왔을 때
        빈 화면이 뜬다. 새 시험지는 renderSheet 가 스스로 비우고 그린다. */
  function showSetup() {
    stopTimer();
    sheetBox.style.display = "none";
    setupBox.style.display = "";
    resetBack("모의 문제지 생성");
    /* 방금 푼 회차가 이력에 보여야 한다. 설정은 건드리지 않고 이력만 다시 그린다 —
       buildSetup 을 통째로 부르면 골라 둔 범위·분포가 초기화된다. */
    refreshHistory();
    paintResume();
    window.scrollTo(0, 0);
  }

  /* 「방금 문제지로」 — 히스토리를 안 쌓는 대신 화면에 돌아갈 길을 둔다.
     시험지가 아직 살아 있을 때만 뜬다. */
  function paintResume() {
    var old = setupBox.querySelector('.exam__resume');
    if (old) old.parentNode.removeChild(old);
    if (!sheetTag || !sheetBox.childNodes.length) return;

    var graded = cards.length && cards[0].card.isGraded();
    var btn = el('button', 'exam__resume', (graded ? '← 방금 채점 결과로' : '← 풀던 문제지로') +
      (current && current.seed ? ' #' + current.seed : ''));
    btn.type = 'button';
    btn.addEventListener('click', function () {
      showSheetAgain();
      pushView(sheetTag);   /* 다시 [설정, 시험지] 둘이 된다 */
    });
    setupBox.insertBefore(btn, setupBox.firstChild);
  }

  /* 🚨 **히스토리를 쌓지 않는다.** 「홈으로」가 항목을 밀어 넣으면 만들고 나가기를
     되풀이할수록 쌓여 **설정에서 사이트 홈까지 뒤로가기를 여러 번** 눌러야 한다
     (세 번 되풀이하면 7번이었다).

     시험지 항목이 바로 뒤에 있으므로 `back()` 이 곧 「나가기」다. 그러면 항목은
     늘 **[설정, 시험지] 둘**로 고정되고 뒤로가기가 예측대로 움직인다.

       시험지 → 뒤로가기 → 설정 → 뒤로가기 → 사이트 홈

     📌 방금 보던 시험지로는 설정 화면의 **「방금 문제지로」 버튼**으로 돌아간다 —
        브라우저 앞으로가기는 모바일에서 잘 쓰지 않는다. */
  function backToSetup() {
    var s = history.state || {};
    if (s.exam && s.exam === sheetTag && window.history && history.back) {
      history.back();     /* popstate 가 showSetup 을 부른다 */
      return;
    }
    showSetup();
  }

  /* 뒤로가기로 시험지에 되돌아왔을 때 */
  function showSheetAgain() {
    setupBox.style.display = 'none';
    sheetBox.style.display = '';
    var graded = cards.length && cards[0].card.isGraded();
    setBack('← 모의 문제지 생성',
      (graded ? '채점 결과' : '문제 풀기') + (current && current.seed ? ' #' + current.seed : ''),
      backToSetup);
    /* 채점 전이면 남은 시간부터 이어 간다. 나갔다 온 사이는 흐르지 않는다 —
       개인 학습 도구라 그 편이 쓸모 있고, 채점이 끝났으면 다시 세지 않는다. */
    if (!graded && current && current.mins && timeLeft > 0) startTimer(timeLeft);
    window.scrollTo(0, 0);
  }

  window.addEventListener('popstate', function () {
    if (!setupBox || !sheetBox) return;
    var s = history.state || {};
    if (s.exam && s.exam === sheetTag && sheetBox.childNodes.length) showSheetAgain();
    else showSetup();
  });

  function refreshHistory() {
    var old = setupBox.querySelector('.exam__hist');
    if (old) old.parentNode.removeChild(old);
    buildHistory();
  }

  /* ------------------------------------------------------- 헤더 뒤로가기 */
  /* 🚨 **링크의 주인은 app.js 하나다.** 여기서 따로 핸들러를 걸었더니
     app.js 것과 둘 다 실행돼 「← 모의 문제지」를 눌러도 홈으로 갔다.
     한 페이지 안에서 화면이 바뀌는 것만 여기서 알려 준다. */
  /* 🔒 버튼 기호 규칙 — cards.js 와 같다.
       되돌리는 것 : 기호를 **앞**에   ↩ 새 문제지 · ↻ 같은 문제지 다시 풀기
       옮겨 가는 것 : 화살표를 **뒤**에  복기 → · 오답노트 보기 →
       그냥 동작인 것 : 기호 없음        제출하기 · 채점하기
     ⚠️ 모든 버튼에 붙이면 오히려 안 보인다. **화면을 옮기는 것에만** 붙인다. */

  /* 제목은 두 곳에 뜬다 — 헤더의 작은 글씨와 화면 위 큰 제목.
     💬 "그 제목들이 실제로 페이지 내에서도 뜨면 좋겠어."
     헤더만으로는 지금 어느 화면인지 눈에 잘 안 들어온다. 한 번에 같이 바꾼다. */
  var HERO = {
    '모의 문제지 생성':
      '최근 7회분 기출의 단원별 출제 비율을 그대로 재현해 문제를 뽑습니다. ' +
      '회차마다 구성이 달라지므로 매번 다른 시험지가 나옵니다.',
    '문제 풀기': '다 풀고 아래 「제출하기」를 누르면 채점합니다.',
    '틀린 것만 다시 풀기': '이 회차는 응시 이력에 남지 않습니다. 원래 기록을 지키기 위해서입니다.',
    '채점 결과': '틀린 문제는 오답노트에 쌓였습니다.',
    '문제지 복기': '그때 쓴 답과 정답을 나란히 봅니다.'
  };

  function setHero(where) {
    var t = document.querySelector('.js-exam-title');
    var d = document.querySelector('.js-exam-desc');
    if (t) t.textContent = where;
    if (d) {
      /* 「채점 결과 #48213」처럼 뒤에 번호가 붙어도 설명은 찾아지게 앞부분으로 맞춘다 */
      var key, hit = '';
      for (key in HERO) {
        if (Object.prototype.hasOwnProperty.call(HERO, key) && where.indexOf(key) === 0) hit = HERO[key];
      }
      d.textContent = hit;
      d.style.display = hit ? '' : 'none';
    }
  }

  function setBack(label, where, fn) {
    if (window.EIP && window.EIP.setBack) window.EIP.setBack(label, where, fn);
    if (where != null) setHero(where);
  }
  /* 화면 전환이 끝나고 「처음 상태」로 돌아갈 때 — 직전이 우리 사이트면 그리로 간다 */
  function resetBack(where) {
    var w = document.querySelector('.js-where');
    if (w) w.textContent = where;
    setHero(where);
    if (window.EIP && window.EIP.initBack) window.EIP.initBack();
  }

  /* ------------------------------------------------------------- 타이머 */
  function startTimer(sec) {
    timeLeft = sec;
    var node = document.getElementById('exam-timer');
    function paint() {
      var m = Math.floor(timeLeft / 60), s = timeLeft % 60;
      if (node) {
        node.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        if (timeLeft <= 60) node.className = 'exam__timer is-urgent';
      }
    }
    paint();
    timerId = setInterval(function () {
      timeLeft--;
      if (timeLeft <= 0) { stopTimer(); paint(); doSubmit(true); return; }
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
    /* 📌 채점이 끝나면 이 자리에 할 일은 「나가기」뿐이다.
       비활성 「채점 완료」로 두면 문항을 다 훑고 맨 아래에 왔을 때 죽은 버튼만 남는다.
       (채점 결과는 맨 위에 붙으므로 여기서 나가도 놓치는 것이 없다.)
       옆의 「다른 문제지 만들기」는 같은 일을 하므로 숨긴다 — 둘이 나란히 서면 헷갈린다. */
    if (submitBtn) {
      submitBtn.setAttribute('data-done', '1');
      submitBtn.textContent = '↩ 모의 문제지 홈으로';
      submitBtn.className = 'exam__ghost';
    }
    if (againBtn) againBtn.style.display = 'none';

    /* 🔒 점수는 **배점**이다 — 문항 수가 아니다.
       한 문항 5점, 20문항이면 100점 만점. 여러 칸짜리는 부분점수가 붙어
       score 가 소수(1.5·2.5…)가 될 수 있다. 배점 규칙은 qcard 한 벌뿐이다. */
    var score = 0;       /* 배점 합 */
    var okCount = 0;     /* 완전 정답 문항 수 — 단원별 표와 오답노트가 쓴다 */
    var perCh = {};      /* 단원 번호 → {ok, total} */
    var wrongItems = [];
    var answers = {};    /* 문항 id → 내가 쓴 답 (parts 면 배열) */

    cards.forEach(function (row) {
      var res = row.card.judge();
      row.card.lock();
      row.card.showResult(res);
      /* 부분 정답은 오답과 다르게 보여야 한다 — 두 칸 중 하나를 맞힌 것이 묻히지 않게 */
      row.li.className = 'quiz__item ' +
        (res.ok ? 'is-ok' : (res.got ? 'is-part' : 'is-no'));

      answers[row.item.id] = res.mine;
      score += qscore(res);

      var c = row.item.ch;
      if (!perCh[c]) perCh[c] = { ok: 0, total: 0 };
      perCh[c].total++;
      if (res.ok) { okCount++; perCh[c].ok++; }
      else wrongItems.push(row.item);

      /* 🔒 오답노트는 **완전 정답이 아니면 오답**으로 적립한다.
         실기는 한 문항을 다 맞아야 만점이라 부분 정답을 「맞은 것」으로 두면
         다시 볼 문항이 목록에서 빠진다. 오답 가중치 설정과 무관하게 항상 적립한다. */
      if (window.EIP_WRONG) window.EIP_WRONG.record(row.item.id, res.ok);
    });

    /* 🚨 「틀린 것만 다시 풀기」는 기록하지 않는다.
       seed 가 원래 회차와 같아서 답안을 덮어써 버리고 (그 회차 복기가 12문항짜리로 줄어든다),
       이력에도 「12문항 중 12점」 같은 왜곡된 줄이 남는다.
       원래 회차의 기록을 지키는 쪽이 맞다. */
    if (!current.partial) {
      saveAnswers(histKey(saveHistory(okCount, score, perCh)), answers);
    }
    renderResult(score, perCh, wrongItems, byTimeout);
  }

  /* okCount 는 완전 정답 문항 수, pt 는 배점 합이다.
     🔒 **score/total 의 뜻을 바꾸지 않고 pt 를 더했다.** 이미 쌓인 이력이
     「14 / 20」으로 남아 있는데 뜻을 바꾸면 옛 줄이 조용히 거짓말을 한다. */
  function saveHistory(okCount, pt, perCh) {
    var ids = current.items.map(function (i) { return i.id; });
    var rounds = recentRounds();
    rounds.unshift(ids);
    while (rounds.length > RECENT_KEEP) rounds.pop();
    write('exam.recent', rounds);

    var hist = read('exam.history', []) || [];
    var d = new Date();
    var mm = d.getMonth() + 1, dd = d.getDate();
    var hh = d.getHours(), mi = d.getMinutes();
    var rec = {
      seed: current.seed,
      /* 🔒 **응시 시각.** 같은 문제지를 두 번 풀면 seed·날짜가 같아
         병합에서 한 줄이 조용히 사라진다. 응시마다 다른 값이 있어야 한다. */
      ts: d.getTime(),
      at: d.getFullYear() + '-' + (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd,
      hm: (hh < 10 ? '0' : '') + hh + ':' + (mi < 10 ? '0' : '') + mi,
      score: okCount,                          /* 완전 정답 문항 수 (옛 뜻 그대로) */
      total: current.items.length,             /* 문항 수 */
      pt: Math.round(pt * 10) / 10,            /* 배점 합 — 소수 가능 */
      ptMax: current.items.length * fullPt(),  /* 만점 */
      /* 🔒 **문제지의 정체는 seed 가 아니라 이 목록이다.**
         seed 로 다시 뽑으면 그 사이 바뀐 것들(최근 출제 이력·오답 가중치·회차 수)
         때문에 다른 문항이 나온다. 목록을 그대로 들고 있으면 그럴 일이 없다. */
      ids: ids,
      chapters: perCh
    };
    hist.unshift(rec);
    while (hist.length > HISTORY_KEEP) hist.pop();
    writeHistory(hist);
    return rec;
  }

  function renderResult(score, perCh, wrongItems, byTimeout) {
    var box = el('section', 'exam__result');

    /* 🔒 실기와 같은 배점이다 — 한 문항 5점, 20문항이면 100점 만점.
       합격선 60점은 곧 12문항이다. */
    var full = current.items.length * fullPt();
    var pct = full ? Math.round(score / full * 100) : 0;
    var h = el('div', 'exam__score');
    h.appendChild(el('strong', null, ptText(score) + ' / ' + full + '점'));
    h.appendChild(el('span', null, pct + '%'));
    box.appendChild(h);

    /* 20문항 기준일 때만 합격/불합격을 말한다 — 5문항짜리에 「합격」은 뜻이 없다 */
    if (current.items.length >= 20) {
      var passed = pct >= 60;
      box.appendChild(el('p', 'exam__pass' + (passed ? ' is-pass' : ''),
        passed ? '✅ 합격선(60점)을 넘었습니다' : '합격선은 60점입니다 — ' +
          ptText(full * 0.6 - score) + '점 모자랍니다'));
    }

    if (byTimeout) {
      box.appendChild(el('p', 'exam__timeout', '시간이 끝나 자동으로 제출되었습니다.'));
    }

    /* 🚨 부분점수 규칙은 공개된 것이 아니라 추정이다. 그렇게 밝힌다.
       ⚠️ **점수가 소수인지로 판정하면 안 된다** — 2칸 부분점수는 2점이라 정수다.
          부분점수가 붙을 수 있는 문항(여러 칸짜리)이 있었는지로 가른다. */
    var hasParts = false;
    current.items.forEach(function (it) { if (it.parts && it.parts.length > 1) hasParts = true; });
    if (hasParts) {
      box.appendChild(el('p', 'exam__note',
        '⚠️ 여러 칸짜리 문항의 부분점수(2칸 2점 · 3칸 1.5점)는 공개된 채점기준이 아니라 추정입니다.'));
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
      var re = el('button', 'quiz__grade', '↻ 틀린 것만 다시 풀기 (' + wrongItems.length + ')');
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
    var nw = el('button', 'exam__ghost', '↩ 새 문제지');
    nw.type = 'button';
    nw.addEventListener('click', backToSetup);
    acts.appendChild(nw);

    var toWrong = el('a', 'exam__ghost', '오답노트 보기 →');
    toWrong.href = 'wrong.html';
    acts.appendChild(toWrong);
    box.appendChild(acts);

    sheetBox.insertBefore(box, sheetBox.firstChild);

    /* 채점이 끝나면 같은 화면이라도 성격이 달라진다 — 제목도 따라간다 */
    setBack('← 모의 문제지 생성',
      (current && current.partial ? '틀린 것만 다시 풀기' : '채점 결과') +
      (current && current.seed ? ' #' + current.seed : ''),
      backToSetup);

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

  /* 되살아난 화면 — 설정 화면일 때만 이력을 다시 그린다.
     시험지·복기 중이면 건드리지 않는다 (답안이 화면에 그대로 있다) */
  document.addEventListener('eip:revive', function () {
    if (setupBox && setupBox.style.display !== 'none') refreshHistory();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
