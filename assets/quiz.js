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

  /* 문항을 그리고 채점하는 일은 assets/qcard.js 가 전담한다.
     오답노트·모의 문제지가 같은 위젯을 쓰므로 채점 규칙이 갈라지지 않는다.
     build.sh 가 qcard.js 를 먼저 싣지만, 못 실었다면 조용히 물러난다. */
  var Q = window.EIP_QCARD;
  if (!Q) return;

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

  /* 오답 기록은 assets/wrongstore.js 가 전담한다.
     오답노트 화면(wrong.html)과 분류 규칙을 공유해야 하므로 여기서 직접 다루지 않는다.

     🚨 예전에는 정답이면 기록을 지웠다. 그러면 "틀렸다가 맞은 문제"(2번 분류)가
        원리상 만들어지지 않아서 폐기했다. → PLAN-quiz.md 10장 */
  var W = window.EIP_WRONG || null;

  function recordResult(item, correct) {
    if (W) W.record(item.id, correct);
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

  /* ------------------------------------------------------------- DOM 헬퍼 */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
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

    /* 🚨 「메모 보기」 토글을 여기엔 안 붙인다 (2026-08-11).
       섹션당 3~5문항뿐이라 **한꺼번에 펼 것이 없다.** 메모가 없는 섹션에서는
       눌러도 아무 일이 안 일어나 먹통으로 보였다 — 사용자가 짚었다.
       🔒 모의 문제지·오답노트에는 그대로 둔다. 거기는 문항이 많아 값이 있다. */

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

    /* ★ 저장한 문제 — 맞고 틀림과 무관한 별도 축이라 채점 전후 언제나 누를 수 있다 */
    if (W) {
      var fav = el('button', 'quiz__fav', '★');
      fav.type = 'button';
      fav.setAttribute('aria-label', '저장한 문제로 표시');
      fav.title = '저장한 문제로 표시';
      fav.setAttribute('aria-pressed', W.isFav(item.id) ? 'true' : 'false');
      fav.addEventListener('click', function () {
        fav.setAttribute('aria-pressed', W.toggleFav(item.id) ? 'true' : 'false');
      });
      li.appendChild(fav);
    }

    /* 문항 본문·입력·채점은 공용 위젯이 맡는다 */
    var card = Q.create(item, li);
    card.onEnter(grade);

    list.appendChild(li);
    return { item: item, li: li, card: card, graded: false };
  }

  /* ------------------------------------------------------------------ 채점 */
  function grade() {
    var score = 0;
    rows.forEach(function (row) {
      var res = row.card.judge();
      row.graded = true;
      if (res.ok) score++;

      row.li.classList.add(res.ok ? 'is-ok' : 'is-no');
      row.card.lock();
      row.card.showResult(res);

      recordResult(row.item, res.ok);
    });

    saveScore(score, rows.length);

    gradeBtn.textContent = '다시 풀기';
    scoreBox.textContent = rows.length + '문항 중 ' + score + '개 정답';
    scoreBox.className = 'quiz__score' + (score === rows.length ? ' is-perfect' : '');
  }
})();
