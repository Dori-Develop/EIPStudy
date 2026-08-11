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
    if (item.t === 'ox') return item.a ? 'O' : 'X';
    if (item.t === 'choice') return (item.c || [])[item.a];
    return (item.a && item.a[0]) || '';
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

    container.appendChild(html('div', 'quiz__q', item.q));

    if (item.t === 'code' && item.code) {
      var pre = el('pre', 'quiz__code');
      pre.appendChild(el('code', item.lang ? 'lang-' + item.lang : null, item.code));
      container.appendChild(pre);
    }

    if (item.t === 'ox') {
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

      judge: function () {
        if (item.t === 'ox') {
          if (picked === null) return { ok: false, mine: '(무응답)' };
          return { ok: picked === item.a, mine: picked ? 'O' : 'X' };
        }
        if (item.t === 'choice') {
          var k = -1, n;
          for (n = 0; n < radios.length; n++) { if (radios[n].checked) k = n; }
          if (k < 0) return { ok: false, mine: '(무응답)' };
          return { ok: k === item.a, mine: (item.c || [])[k] };
        }
        var v = input.value;
        if (!norm(v)) return { ok: false, mine: '(무응답)' };
        return { ok: matchText(v, item.a, item.t === 'code'), mine: v };
      },

      lock: function () {
        graded = true;
        if (input) input.disabled = true;
        if (radios) radios.forEach(function (r) { r.disabled = true; });
        if (buttons) buttons.forEach(function (b) { b.disabled = true; });
      },

      /* 정답/오답 배지 + 해설을 container 에 붙인다 */
      showResult: function (res) {
        var fb = el('div', 'quiz__fb');
        fb.appendChild(el('span', 'quiz__mark', res.ok ? '정답' : '오답'));
        if (!res.ok) {
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
    memoToggle: memoToggle,
    memoShown: showAll
  };
})();
