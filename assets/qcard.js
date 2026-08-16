/* ==========================================================================
   EIP Study — 문항 카드 위젯 (공용)

   한 문항을 그리고 채점하는 일만 한다. 섹션 퀴즈(quiz.js), 오답노트(wrong.js),
   앞으로 만들 모의 문제지(exam.html)가 모두 이것을 쓴다.

   🚨 세 곳에 복사하면 채점 규칙이 반드시 어긋난다. 특히 정규화 규칙은
      정답 배열을 쓰는 방식과 직결되므로 한 벌만 존재해야 한다.

   문항 메모도 여기서 낸다 — 세 화면이 모두 create() 한 줄로 문항을 그리므로
   여기 붙이면 어디서든 같은 메모가 같은 모양으로 나온다. 저장 규칙은 memo.js.

   쓰는 법
     var card = EIP_QCARD.create(item, container);   // container 에 그린다
     var res  = card.judge();                        // { ok, mine }
     card.showResult(res);                           // 정답/오답 배지 + 해설
     card.lock();                                    // 입력 잠금
     host.appendChild(EIP_QCARD.memoToggle());       // 「메모 보기」 (문항 목록 위)

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  /* 문항의 ch·sec 는 **숫자**다 (ch: 1, sec: 5). 화면·파일에서 쓰는 키로 바꾼다.
     ⚠️ id('ch01-s05-03')에서 잘라 쓰지 말 것 — 앞으로 id 규칙이 바뀌면 같이 깨진다. */
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function chapterKey(item) {
    return item && item.ch ? 'ch' + pad2(item.ch) : '';
  }
  function sectionFile(item) {
    return item && item.sec ? 's' + pad2(item.sec) + '.html' : '';
  }

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
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------------------------------------------------------- 정답 판정 */
  function norm(s) {
    return String(s).replace(/\s+/g, ' ').replace(/^ | $/g, '').toLowerCase();
  }
  /* 공백·구두점을 걷어낸 형태로 한 번 더 비교한다
     → '자료 흐름도' = '자료흐름도', 'CO-COMO' = 'cocomo' */
  function normHard(s) {
    return norm(s).replace(/[\s\-_.()]/g, '');
  }
  /* strict 는 code 유형에 쓴다. 출력 형식 자체가 답일 수 있어
     느슨한 비교를 쓰면 부호나 구두점 차이를 놓친다 (-13 과 13 이 같아짐). */
  function matchText(input, answers, strict) {
    var a = norm(input), b = normHard(input), j;
    for (j = 0; j < answers.length; j++) {
      if (a === norm(answers[j])) return true;
      if (!strict && b === normHard(answers[j])) return true;
    }
    return false;
  }

  function answerText(item) {
    if (item.parts) {
      return item.parts.map(function (p) {
        return (p.label ? p.label + ' ' : '') + ((p.a && p.a[0]) || '');
      }).join(' · ');
    }
    if (item.t === 'ox') return item.a ? 'O' : 'X';
    if (item.t === 'multi') {
      return (item.a || []).map(function (k) { return (item.c || [])[k]; }).join(' · ');
    }
    if (item.t === 'choice') return (item.c || [])[item.a];
    return (item.a && item.a[0]) || '';
  }

  /* ====================================================== 배점 (실기와 같게)
     20문항 × 5점 = 100점. 60점이면 합격 — 곧 12문항이다.

     🚨 **부분점수 규칙은 공개된 것이 아니라 추정이다.** 산업인력공단이 채점기준을
        공개하지 않는다. 화면에도 그렇게 밝힌다.
        → decisions/exam-format.md 6장

     🔑 **유형이 아니라 칸 수로 가른다.** 「프로그래밍은 부분점수 없음」이 아니라
        「출력값 문항이 부분점수 없음」이다 — 그것들이 1칸이라 그렇게 보였을 뿐이고,
        빈칸 채우기형 프로그래밍은 최대 4칸이라 부분점수가 붙는다.

     | 칸 수 | 하나당 | 근거 |
     |---|---|---|
     | 1 | — (5점 아니면 0점) | 확인됨 |
     | 2 | **2점** (2.5 아님) | 확인됨 — 비례배분보다 박하다 |
     | 3 | **1.5점** | 확인됨 |
     | 4 이상 | `5/n` 을 0.5 단위로 내림 | ⚠️ **추정.** 3칸까지의 결을 이었다 |

     다 맞으면 칸 수와 무관하게 **5점**이다 (부분점수의 합이 아니다). */
  var FULL_PT = 5;

  function partPt(n) {
    if (n <= 1) return FULL_PT;
    if (n === 2) return 2;                     /* 공식대로면 2.5 — 확인된 값이 더 박하다 */
    return Math.floor(FULL_PT / n * 2) / 2;    /* 3 → 1.5 · 4 → 1 · 6 이상 → 0.5 */
  }

  /* judge() 결과 하나를 점수로. exam.js 가 이것만 쓴다 — 규칙을 두 곳에 두지 않는다. */
  function score(res) {
    if (!res) return 0;
    var max = res.max || 1;
    if (res.ok) return FULL_PT;
    if (max <= 1) return 0;
    return (res.got || 0) * partPt(max);
  }

  /* ============================================================== 문항 메모 */
  /* 🚨 **기본은 감춤이다.** 메모에는 "객동기로 외울 것" 같은 정답 힌트가 들어간다.
     시험 중에 그것이 보이면 모의고사가 아니다.

     · 접혀 있을 때도 **메모가 있다는 것과 글자 수**는 보인다 — 있는 줄 모르고
       지나치지 않게. 내용이 아니라 존재만 알리는 것이라 답이 새지 않는다.
     · 「메모 보기」를 켜면 **적어 둔 것이 있는 문항만** 펼친다. 빈 것까지 펼치면
       화면이 문항 수만큼 길어지기만 한다.

     eip.ui.qmemo 는 **기기마다 다를 수 있는 화면 설정**이다 —
     merge.js 의 SKIP 에 `ui` 가 들어 있어 기기 간에 옮겨 다니지 않는다. */
  var UI_KEY = 'ui.qmemo';
  var SHOW_EVENT = 'eip:qmemo';

  /* ⚠️ **불러올 때가 아니라 쓸 때 찾는다.** 섹션 페이지에서는 `memo.js` 가
     이 파일보다 **뒤에** 실린다 (자기 위젯을 퀴즈 다음 자리에 넣어야 해서다).
     위에서 한 번 잡아 두면 섹션 퀴즈에서만 메모가 통째로 빠진다. */
  function store() { return (window.EIP && window.EIP.store) || null; }
  function memo() { return window.EIP_MEMO && window.EIP_MEMO.q; }

  function showAll() {
    var s = store();
    return !!(s && s.get(UI_KEY, false));
  }

  function setShowAll(on) {
    var s = store();
    if (s) s.set(UI_KEY, !!on);
    document.dispatchEvent(new CustomEvent(SHOW_EVENT, { detail: { on: !!on } }));
  }

  /* 문항 목록 위에 놓는 토글 하나. 세 화면이 같은 것을 쓴다. */
  function memoToggle() {
    var wrap = el('div', 'qmemo__toggle');
    var btn = el('button', 'qmemo__tbtn');
    btn.type = 'button';

    var note = el('span', 'qmemo__tnote');

    function paint() {
      var on = showAll();
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.textContent = (on ? '✏️ 메모 보는 중' : '✏️ 메모 보기');
      var n = memo() ? memo().count() : 0;
      note.textContent = on
        ? '메모에 정답 힌트가 있을 수 있습니다'
        : (n ? n + '개 문항에 메모가 있습니다' : '');
    }

    btn.addEventListener('click', function () { setShowAll(!showAll()); });
    document.addEventListener(SHOW_EVENT, paint);
    paint();

    wrap.appendChild(btn);
    wrap.appendChild(note);
    return wrap;
  }

  /* 문항 하나에 붙는 접이식 메모. create() 가 마지막에 붙인다. */
  function buildMemo(item) {
    var M = memo();
    if (!M || !item || !item.id) return null;

    var saved = M.get(item.id);
    var lastSaved = saved ? saved.u : 0;
    var timer = null;

    var card = el('section', 'qmemo');
    card.setAttribute('aria-label', '이 문항의 메모');

    var head = el('button', 'qmemo__head');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'false');
    head.appendChild(el('span', 'qmemo__title', '✏️ 메모'));
    var state = el('span', 'qmemo__state');
    head.appendChild(state);
    head.appendChild(el('span', 'qmemo__caret', '▾'));

    var body = el('div', 'qmemo__body');
    body.setAttribute('hidden', '');

    var ta = document.createElement('textarea');
    ta.className = 'qmemo__ta';
    ta.rows = 3;
    ta.value = saved ? saved.t : '';
    ta.placeholder = '이 문항에서 헷갈린 것 — 나만의 암기법, 함정, 비슷한 문항…';
    ta.setAttribute('aria-label', '문항 메모');
    body.appendChild(ta);

    var foot = el('div', 'qmemo__foot');
    var savedEl = el('span', 'qmemo__saved', '');
    var clearBtn = el('button', 'qmemo__clear', '지우기');
    clearBtn.type = 'button';
    foot.appendChild(savedEl);
    foot.appendChild(clearBtn);
    body.appendChild(foot);

    card.appendChild(head);
    card.appendChild(body);

    /* 접혀 있을 때 내용을 대신하는 한 줄. **본문을 쓰지 않는다** */
    function paintState() {
      var text = ta.value.replace(/^\s+|\s+$/g, '');
      card.classList[text ? 'add' : 'remove']('has-memo');
      state.textContent = text
        ? text.length + '자' + (lastSaved ? ' · ' + stampText(lastSaved) : '')
        : '비어 있음';
      savedEl.textContent = text && lastSaved ? '저장됨 ' + stampText(lastSaved) : '';
    }

    function flush() {
      if (timer) { clearTimeout(timer); timer = null; }
      var stamp = M.set(item.id, ta.value);
      if (stamp) lastSaved = stamp;
      paintState();
    }

    function open(yes) {
      head.setAttribute('aria-expanded', yes ? 'true' : 'false');
      if (yes) body.removeAttribute('hidden');
      else body.setAttribute('hidden', '');
    }

    head.addEventListener('click', function () {
      open(head.getAttribute('aria-expanded') !== 'true');
    });

    /* 입력이 멎고 0.5초 뒤에 저장한다 — 글자마다 쓰면 localStorage 를 계속 두드린다 */
    ta.addEventListener('input', function () {
      state.textContent = '입력 중…';
      if (timer) clearTimeout(timer);
      timer = setTimeout(flush, 500);
    });
    ta.addEventListener('blur', flush);

    clearBtn.addEventListener('click', function () {
      if (!ta.value) { open(false); return; }
      ta.value = '';
      flush();
      ta.focus();
    });

    /* 🚨 탭을 닫거나 다른 페이지로 갈 때 — 0.5초를 못 채운 마지막 입력을 잃지 않게.
       시험 중에는 이 창을 오래 열어 두므로 특히 중요하다. */
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flush();
    });

    /* 토글을 켜면 적어 둔 것이 있는 문항만 펼친다 */
    document.addEventListener(SHOW_EVENT, function (e) {
      var on = e && e.detail ? e.detail.on : showAll();
      if (on) { if (ta.value) open(true); }
      else open(false);
    });

    paintState();
    if (showAll() && ta.value) open(true);

    return card;
  }

  function stampText(ms) {
    if (window.EIP_MEMO && window.EIP_MEMO.stampText) return window.EIP_MEMO.stampText(ms);
    return '';
  }

  /* ------------------------------------------------------------ 위젯 생성 */
  function create(item, container) {
    var graded = false;
    var picked = null, buttons = null, radios = null, input = null;
    var checks = null;      /* t: 'multi' — 모두 고르시오 */
    var partIn = null;      /* parts — 칸마다 하나씩 */

    container.appendChild(html('div', 'quiz__q', item.q));

    /* 코드는 유형과 무관하게 있으면 낸다 — 빈칸 채우기형 프로그래밍은
       t 가 'code' 가 아니라 parts 를 쓴다 */
    if (item.code) {
      var pre = el('pre', 'quiz__code');
      pre.appendChild(el('code', item.lang ? 'lang-' + item.lang : null, item.code));
      container.appendChild(pre);
    }

    /* 보기 묶음 — parts 의 pick 칸들이 여기서 고른다.
       실제 시험도 보기를 한 번만 주고 여러 빈칸이 그것을 나눠 쓴다. */
    if (item.pool && item.pool.length) {
      var poolBox = el('div', 'quiz__pool');
      poolBox.appendChild(el('span', 'quiz__poollabel', '보기'));
      var poolList = el('div', 'quiz__poolitems');
      item.pool.forEach(function (text) {
        poolList.appendChild(html('span', 'quiz__poolitem', text));
      });
      poolBox.appendChild(poolList);
      container.appendChild(poolBox);
    }

    if (item.parts && item.parts.length) {
      /* 🔒 칸이 여럿인 문항. 여기서만 부분점수가 붙는다. */
      var pbox = el('div', 'quiz__parts');
      partIn = [];
      item.parts.forEach(function (p, k) {
        var row = el('div', 'quiz__part');
        row.appendChild(el('span', 'quiz__plabel', p.label || String(k + 1)));

        var ctrl;
        if (p.t === 'pick') {
          /* 보기에서 고른다 — 좁은 화면에서도 되고 키보드로도 된다 */
          ctrl = document.createElement('select');
          ctrl.className = 'quiz__pselect';
          var blank = el('option', null, '— 고르세요 —');
          blank.value = '';
          ctrl.appendChild(blank);
          (item.pool || []).forEach(function (text) {
            var op = el('option', null, text);
            op.value = text;
            ctrl.appendChild(op);
          });
        } else {
          ctrl = document.createElement('input');
          ctrl.type = 'text';
          ctrl.className = 'quiz__pinput';
          ctrl.setAttribute('autocomplete', 'off');
          ctrl.setAttribute('autocapitalize', 'off');
          ctrl.spellcheck = false;
          ctrl.placeholder = '답';
        }
        ctrl.setAttribute('aria-label', (p.label || (k + 1) + '번') + ' 답');
        row.appendChild(ctrl);
        pbox.appendChild(row);
        partIn.push(ctrl);
      });
      container.appendChild(pbox);

    } else if (item.t === 'multi') {
      /* 「모두 고르시오」 — 물음이 하나라 1칸이다. 전부 아니면 전무로 채점한다. */
      var mname = 'm-' + item.id;
      var mbox = el('div', 'quiz__choices');
      checks = [];
      (item.c || []).forEach(function (text, k) {
        var lab = el('label', 'quiz__choice');
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.name = mname;
        cb.value = String(k);
        lab.appendChild(cb);
        lab.appendChild(html('span', null, text));
        mbox.appendChild(lab);
        checks.push(cb);
      });
      container.appendChild(mbox);

    } else if (item.t === 'ox') {
      var oxWrap = el('div', 'quiz__ox');
      buttons = [];
      ['O', 'X'].forEach(function (label, k) {
        var b = el('button', 'quiz__oxbtn', label);
        b.type = 'button';
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () {
          if (graded) return;
          picked = (k === 0);
          buttons.forEach(function (other, m) {
            other.setAttribute('aria-pressed', m === k ? 'true' : 'false');
          });
        });
        buttons.push(b);
        oxWrap.appendChild(b);
      });
      container.appendChild(oxWrap);

    } else if (item.t === 'choice') {
      /* name 이 겹치면 서로 다른 문항의 라디오가 한 그룹으로 묶인다.
         오답노트는 여러 챕터의 문항을 한 화면에 섞으므로 id 를 그대로 쓴다. */
      var name = 'q-' + item.id;
      var opts = el('div', 'quiz__choices');
      radios = [];
      (item.c || []).forEach(function (text, k) {
        var lab = el('label', 'quiz__choice');
        var r = document.createElement('input');
        r.type = 'radio';
        r.name = name;
        r.value = String(k);
        lab.appendChild(r);
        /* 보기에도 <code> 같은 태그를 쓸 수 있어야 한다 — 문제 본문과 같은 방식 */
        lab.appendChild(html('span', null, text));
        opts.appendChild(lab);
        radios.push(r);
      });
      container.appendChild(opts);

    } else {
      input = document.createElement('input');
      input.type = 'text';
      input.className = 'quiz__input';
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('autocapitalize', 'off');
      input.spellcheck = false;
      input.placeholder = item.t === 'code' ? '출력 결과' : '답을 입력하세요';
      container.appendChild(input);
    }

    /* 메모는 문항의 맨 아래다. 채점 결과는 그 **위에** 끼워 넣는다 —
       답을 확인하러 내려왔다가 메모를 지나치게 하지 않으려는 것이다. */
    var memoCard = buildMemo(item);
    if (memoCard) container.appendChild(memoCard);

    return {
      item: item,

      /* 엔터로 채점하고 싶을 때 호출자가 붙인다 */
      onEnter: function (fn) {
        if (input) {
          input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); fn(); }
          });
        }
      },

      isGraded: function () { return graded; },

      /* { ok, mine, got, max } — max 는 칸 수, got 는 맞은 칸 수.
         칸이 하나인 문항도 max: 1 로 돌려 exam.js 가 한 가지 규칙만 쓰게 한다.
         parts 가 있으면 mine 은 **배열**이다 (복기에서 칸마다 되살려야 한다). */
      judge: function () {
        if (partIn) {
          var mine = [], got = 0, i, val, p;
          for (i = 0; i < partIn.length; i++) {
            p = item.parts[i];
            val = partIn[i].value;
            mine.push(val);
            if (norm(val) && matchText(val, p.a || [], p.t === 'code')) got++;
          }
          return { ok: got === item.parts.length, mine: mine, got: got, max: item.parts.length };
        }
        if (item.t === 'multi') {
          var picks = [], j;
          for (j = 0; j < checks.length; j++) { if (checks[j].checked) picks.push(j); }
          if (!picks.length) return { ok: false, mine: '(무응답)', got: 0, max: 1 };
          var want = (item.a || []).slice().sort();
          var same = picks.length === want.length;
          if (same) {
            var sorted = picks.slice().sort();
            for (j = 0; j < sorted.length; j++) { if (sorted[j] !== want[j]) same = false; }
          }
          var text = picks.map(function (k) { return (item.c || [])[k]; }).join(' · ');
          return { ok: same, mine: text, got: same ? 1 : 0, max: 1 };
        }
        if (item.t === 'ox') {
          if (picked === null) return { ok: false, mine: '(무응답)', got: 0, max: 1 };
          var oxOk = picked === item.a;
          return { ok: oxOk, mine: picked ? 'O' : 'X', got: oxOk ? 1 : 0, max: 1 };
        }
        if (item.t === 'choice') {
          var k2 = -1, n;
          for (n = 0; n < radios.length; n++) { if (radios[n].checked) k2 = n; }
          if (k2 < 0) return { ok: false, mine: '(무응답)', got: 0, max: 1 };
          var chOk = k2 === item.a;
          return { ok: chOk, mine: (item.c || [])[k2], got: chOk ? 1 : 0, max: 1 };
        }
        var v = input.value;
        if (!norm(v)) return { ok: false, mine: '(무응답)', got: 0, max: 1 };
        var tOk = matchText(v, item.a, item.t === 'code');
        return { ok: tOk, mine: v, got: tOk ? 1 : 0, max: 1 };
      },

      lock: function () {
        graded = true;
        if (input) input.disabled = true;
        if (radios) radios.forEach(function (r) { r.disabled = true; });
        if (buttons) buttons.forEach(function (b) { b.disabled = true; });
        if (checks) checks.forEach(function (c) { c.disabled = true; });
        if (partIn) partIn.forEach(function (c) { c.disabled = true; });
      },

      /* 정답/오답 배지 + 해설을 container 에 붙인다 */
      showResult: function (res) {
        var fb = el('div', 'quiz__fb');
        var max = res.max || 1;

        /* 부분 정답이 있으면 배지에 몇 칸 맞았는지까지 적는다 —
           「오답」만 뜨면 두 칸 중 하나를 맞힌 것이 안 보인다. */
        var mark = res.ok ? '정답'
          : (max > 1 && res.got ? '부분 정답 ' + res.got + '/' + max : '오답');
        fb.appendChild(el('span', 'quiz__mark', mark));

        if (!res.ok && partIn) {
          /* 칸마다 무엇을 썼고 무엇이 답인지 나란히 */
          var rows = el('div', 'quiz__pans');
          item.parts.forEach(function (p, i) {
            var mineVal = (res.mine && res.mine[i]) || '';
            var okThis = norm(mineVal) && matchText(mineVal, p.a || [], p.t === 'code');
            var row = el('div', 'quiz__pansrow' + (okThis ? ' is-ok' : ' is-no'));
            row.appendChild(el('span', 'quiz__plabel', p.label || String(i + 1)));
            row.appendChild(html('span', null,
              '내 답 <b>' + escapeHtml(mineVal || '(무응답)') + '</b> · 정답 <b>' +
              escapeHtml((p.a && p.a[0]) || '') + '</b>'));
            rows.appendChild(row);
          });
          fb.appendChild(rows);

        } else if (!res.ok) {
          fb.appendChild(html('span', 'quiz__ans',
            '내 답 <b>' + escapeHtml(res.mine) + '</b> · 정답 <b>' +
            escapeHtml(answerText(item)) + '</b>'));
        }
        if (item.why) fb.appendChild(html('div', 'quiz__why', item.why));

        /* 📌 개념 보기는 **채점한 뒤에만** 낸다.
           채점 전에도 열 수 있으면 모의 문제지가 모의고사가 아니게 된다.
           오답노트·복기는 처음부터 채점된 상태라 늘 보인다. */
        var C = window.EIP_CONCEPT;
        var chKey = chapterKey(item), file = sectionFile(item);
        if (C && chKey && file && C.has(chKey, file)) {
          fb.appendChild(C.link(chKey, file, '📖 개념 보기', 'quiz__concept'));
        }

        if (memoCard && memoCard.parentNode === container) container.insertBefore(fb, memoCard);
        else container.appendChild(fb);
        return fb;
      }
    };
  }

  window.EIP_QCARD = {
    create: create,
    answerText: answerText,
    norm: norm,
    matchText: matchText,
    score: score,          /* judge() 결과 → 점수. 배점 규칙은 여기 한 벌뿐이다 */
    partPt: partPt,
    FULL_PT: FULL_PT,
    memoToggle: memoToggle,
    memoShown: showAll
  };
})();
