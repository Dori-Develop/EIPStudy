/* ==========================================================================
   EIP Study — 문항 카드 위젯 (공용)

   한 문항을 그리고 채점하는 일만 한다. 섹션 퀴즈(quiz.js), 오답노트(wrong.js),
   앞으로 만들 모의 문제지(exam.html)가 모두 이것을 쓴다.

   🚨 세 곳에 복사하면 채점 규칙이 반드시 어긋난다. 특히 정규화 규칙은
      정답 배열을 쓰는 방식과 직결되므로 한 벌만 존재해야 한다.

   쓰는 법
     var card = EIP_QCARD.create(item, container);   // container 에 그린다
     var res  = card.judge();                        // { ok, mine }
     card.showResult(res);                           // 정답/오답 배지 + 해설
     card.lock();                                    // 입력 잠금

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

        container.appendChild(fb);
        return fb;
      }
    };
  }

  window.EIP_QCARD = {
    create: create,
    answerText: answerText,
    norm: norm,
    matchText: matchText
  };
})();
