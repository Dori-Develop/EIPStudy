/* ==========================================================================
   EIP Study — 섹션 개념 퀴즈

   섹션 페이지에서만 동작한다. 문제 은행(window.EIP_BANK_chNN)에서 이 섹션의
   문항만 걸러 본문 맨 아래, "학습 완료" 버튼 위에 카드로 붙인다.

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 · .catch() 금지.
      JScript(ES3) 문법 검사를 통과해야 하므로 예약어를 속성명으로 쓰지 않는다.
   ========================================================================== */
(function () {
  'use strict';

  var CH = window.EIP_CHAPTER;
  if (!CH || CH.page !== 'section') return;

  var bank = window['EIP_BANK_' + CH.id];
  if (!bank || !bank.length) return;

  var secNo = CH.index + 1;
  var items = [];
  var i;
  for (i = 0; i < bank.length; i++) {
    if (bank[i].sec === secNo) items.push(bank[i]);
  }
  /* 이 섹션에 문항이 없으면 아무것도 그리지 않는다 */
  if (!items.length) return;

  /* --------------------------------------------------------------- 저장소 */
  /* app.js 가 window.EIP.store 로 노출한다 (키에 'eip.' 접두사를 붙여 준다) */
  var store = (window.EIP && window.EIP.store) || null;

  function getJSON(key, fallback) {
    if (store) return store.get(key, fallback);
    return fallback;
  }
  function setJSON(key, value) {
    if (store) store.set(key, value);
  }

  /* 오답노트는 챕터를 나누지 않고 하나로 모은다.
     섹션 퀴즈와 모의 문제지가 같은 키를 공유해야 "틀린 문제가 다시 나온다"가 성립한다. */
  function recordResult(item, correct) {
    var wrong = getJSON('wrong.all', {}) || {};
    if (correct) {
      if (wrong[item.id]) delete wrong[item.id];
    } else {
      wrong[item.id] = (wrong[item.id] || 0) + 1;
    }
    setJSON('wrong.all', wrong);
  }

  function saveScore(score, total) {
    var all = getJSON('quiz.' + CH.id, {}) || {};
    var d = new Date();
    var mm = d.getMonth() + 1, dd = d.getDate();
    all[String(secNo)] = {
      score: score,
      total: total,
      at: d.getFullYear() + '-' + (mm < 10 ? '0' : '') + mm + '-' + (dd < 10 ? '0' : '') + dd
    };
    setJSON('quiz.' + CH.id, all);
  }

  /* ------------------------------------------------------------- 정답 판정 */
  function norm(s) {
    return String(s).replace(/\s+/g, ' ').replace(/^ | $/g, '').toLowerCase();
  }
  /* 공백·구두점을 모두 걷어낸 형태로 한 번 더 비교한다
     → '자료 흐름도' = '자료흐름도', 'CO-COMO' = 'cocomo' */
  function normHard(s) {
    return norm(s).replace(/[\s\-_.()]/g, '');
  }

  function matchText(input, answers, strict) {
    var a = norm(input);
    var b = normHard(input);
    var j;
    for (j = 0; j < answers.length; j++) {
      if (a === norm(answers[j])) return true;
      /* code 유형은 출력 형식 자체가 답일 수 있어 느슨한 비교를 쓰지 않는다 */
      if (!strict && b === normHard(answers[j])) return true;
    }
    return false;
  }

  /* ------------------------------------------------------------- DOM 헬퍼 */
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

  /* --------------------------------------------------------------- 렌더링 */
  /* ⚠️ 반드시 app.js 가 본문을 그린 뒤에 실행해야 한다.
     app.js 의 initSection 은 doc.innerHTML 을 통째로 갈아엎기 때문에,
     먼저 카드를 넣으면 그 자리에서 지워진다.
     app.js 가 이 파일보다 먼저 DOMContentLoaded 를 구독하므로
     같은 방식으로 구독하면 항상 app.js 다음에 실행된다. */
  var doc, card, list, gradeBtn, scoreBox;
  var rows = [];

  function render() {
    doc = document.getElementById('doc');
    if (!doc) return;

    card = el('section', 'quiz');
    card.setAttribute('aria-label', '개념 확인 퀴즈');

    var head = el('div', 'quiz__head');
    head.appendChild(el('h2', 'quiz__title', '📝 개념 확인'));
    head.appendChild(el('span', 'quiz__count', items.length + '문항'));
    card.appendChild(head);

    list = el('ol', 'quiz__list');
    var k;
    for (k = 0; k < items.length; k++) {
      rows.push(buildRow(items[k]));
    }
    card.appendChild(list);

    var foot = el('div', 'quiz__foot');
    gradeBtn = el('button', 'quiz__grade', '채점하기');
    gradeBtn.type = 'button';
    scoreBox = el('span', 'quiz__score');
    foot.appendChild(gradeBtn);
    foot.appendChild(scoreBox);
    card.appendChild(foot);

    gradeBtn.addEventListener('click', function () {
      if (rows.length && rows[0].graded) { location.reload(); return; }
      grade();
    });

    /* "학습 완료" 버튼 위에 넣는다 */
    var done = doc.querySelector('.sectiondone');
    if (done) doc.insertBefore(card, done);
    else doc.appendChild(card);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

  /* ----------------------------------------------------------- 문항 한 줄 */
  function buildRow(item) {
    var li = el('li', 'quiz__item');
    li.appendChild(html('div', 'quiz__q', item.q));

    if (item.t === 'code' && item.code) {
      var pre = el('pre', 'quiz__code');
      pre.appendChild(el('code', item.lang ? 'lang-' + item.lang : null, item.code));
      li.appendChild(pre);
    }

    var row = { item: item, li: li, graded: false };

    if (item.t === 'ox') {
      var oxWrap = el('div', 'quiz__ox');
      row.picked = null;
      row.buttons = [];
      ['O', 'X'].forEach(function (label, k) {
        var b = el('button', 'quiz__oxbtn', label);
        b.type = 'button';
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () {
          if (row.graded) return;
          row.picked = (k === 0);
          row.buttons.forEach(function (other, m) {
            other.setAttribute('aria-pressed', m === k ? 'true' : 'false');
          });
        });
        row.buttons.push(b);
        oxWrap.appendChild(b);
      });
      li.appendChild(oxWrap);

    } else if (item.t === 'choice') {
      var name = 'q-' + item.id;
      var opts = el('div', 'quiz__choices');
      row.radios = [];
      (item.c || []).forEach(function (text, k) {
        var lab = el('label', 'quiz__choice');
        var r = document.createElement('input');
        r.type = 'radio';
        r.name = name;
        r.value = String(k);
        lab.appendChild(r);
        lab.appendChild(el('span', null, text));
        opts.appendChild(lab);
        row.radios.push(r);
      });
      li.appendChild(opts);

    } else {
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'quiz__input';
      inp.setAttribute('autocomplete', 'off');
      inp.setAttribute('autocapitalize', 'off');
      inp.spellcheck = false;
      inp.placeholder = item.t === 'code' ? '출력 결과' : '답을 입력하세요';
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); grade(); }
      });
      li.appendChild(inp);
      row.input = inp;
    }

    list.appendChild(li);
    return row;
  }

  /* ------------------------------------------------------------------ 채점 */
  function judge(row) {
    var item = row.item;
    if (item.t === 'ox') {
      if (row.picked === null) return { ok: false, mine: '(무응답)' };
      return { ok: row.picked === item.a, mine: row.picked ? 'O' : 'X' };
    }
    if (item.t === 'choice') {
      var k = -1, n;
      for (n = 0; n < row.radios.length; n++) {
        if (row.radios[n].checked) k = n;
      }
      if (k < 0) return { ok: false, mine: '(무응답)' };
      return { ok: k === item.a, mine: (item.c || [])[k] };
    }
    var v = row.input.value;
    if (!norm(v)) return { ok: false, mine: '(무응답)' };
    return { ok: matchText(v, item.a, item.t === 'code'), mine: v };
  }

  function answerText(item) {
    if (item.t === 'ox') return item.a ? 'O' : 'X';
    if (item.t === 'choice') return (item.c || [])[item.a];
    return (item.a && item.a[0]) || '';
  }

  function grade() {
    var score = 0;
    rows.forEach(function (row) {
      var res = judge(row);
      row.graded = true;
      if (res.ok) score++;

      row.li.classList.add(res.ok ? 'is-ok' : 'is-no');

      /* 입력 잠금 */
      if (row.input) row.input.disabled = true;
      if (row.radios) row.radios.forEach(function (r) { r.disabled = true; });
      if (row.buttons) row.buttons.forEach(function (b) { b.disabled = true; });

      var fb = el('div', 'quiz__fb');
      var mark = el('span', 'quiz__mark', res.ok ? '정답' : '오답');
      fb.appendChild(mark);

      if (!res.ok) {
        fb.appendChild(html('span', 'quiz__ans',
          '내 답 <b>' + escapeHtml(String(res.mine)) + '</b> · 정답 <b>' +
          escapeHtml(String(answerText(row.item))) + '</b>'));
      }
      if (row.item.why) fb.appendChild(html('div', 'quiz__why', row.item.why));
      row.li.appendChild(fb);

      recordResult(row.item, res.ok);
    });

    saveScore(score, rows.length);

    gradeBtn.textContent = '다시 풀기';
    scoreBox.textContent = rows.length + '문항 중 ' + score + '개 정답';
    scoreBox.className = 'quiz__score' + (score === rows.length ? ' is-perfect' : '');
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})();
