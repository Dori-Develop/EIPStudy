/* 공부 전략 띠 (T49) — 홈에만 그린다.
   🔒 데이터는 여기 한 곳에만 둔다. 근거는 EIPStudy-notes/exam-archive/ 다 —
      chapters.md(챕터 분포) · rounds.md(회차) · topics.md(반복 출제).
   📕 기출 PDF 20회차 400문항 = 개정(2020) 이후 전 회차. 웹 2026-2 는 뺐다.
   ES5 로 쓴다 (화살표·const·템플릿 리터럴 금지) → CLAUDE.md 3장 */
(function () {
  'use strict';

  /* ── 챕터별 출제 비율 — 20회차 400문항 ────────────────────────────
     pick: 먼저 볼 여섯 장(2장 + 7~11장). 이 여섯이 합쳐 85% 다.
     hint: 그 장에서 무엇부터 볼지 한 줄. 없으면 생략한다.

     🔒 **이 표는 여기 한 벌뿐이다.** 취약 챕터 대시보드(T23)도 이것을 쓴다 —
        비중을 두 곳에 적으면 반드시 어긋난다. 아래에서 `EIP_STRATEGY` 로 내보낸다.
        🚨 **띠를 그리는 것과 데이터를 내보내는 것은 다른 일이다** — 처음에는
        `#strategy` 가 없으면 즉시 물러나서 **다른 화면이 이 표를 못 봤다.** */
  var CH = [
    { id: 'ch10', pct: 33.3, pick: true
    , hint: '배열과 문자열 · Python · Java 상속 · 제어문 · 구조체 · 포인터' }
  , { id: 'ch11', pct: 14.3, pick: true
    , hint: 'IP 주소와 서브네팅 · 경로 제어 · TCP/IP · 신기술 · 스케줄링' }
  , { id: 'ch09', pct: 10.5, pick: true
    , hint: '서비스 공격 유형 · 보안 솔루션 · 암호 알고리즘 · 서버 인증' }
  , { id: 'ch02', pct: 10.5, pick: true
    , hint: '관계 대수 · 릴레이션 용어 · 무결성 · 정규화' }
  , { id: 'ch08', pct: 8.8, pick: true
    , hint: 'SELECT · JOIN · GROUP BY · 하위 질의' }
  , { id: 'ch07', pct: 8.0, pick: true
    , hint: '화이트박스 커버리지 · 블랙박스 기법 · 스텁과 드라이버' }
  , { id: 'ch04', pct: 6.5, hint: '디자인 패턴 · 결합도와 응집도 — 이 두 절이 92%' }
  , { id: 'ch01', pct: 3.3, hint: 'UML 관계 · 패키지 다이어그램' }
  , { id: 'ch05', pct: 1.5 }
  , { id: 'ch06', pct: 1.3 }
  , { id: 'ch12', pct: 1.3 }
  , { id: 'ch03', pct: 1.0 }
  ];

  /* 🚨 3장·6장은 「안 나온다」가 아니다 — 개정 초기에만 나왔다.
     3장은 2021-1, 6장은 2022-1 이 마지막이고 그 뒤로 각각 15·12회차 0 이다.
     그래서 「나중에」로 적는다. → exam-archive/chapters.md 2장 */
  var LATE = { ch03: 1, ch06: 1, ch05: 1, ch12: 1 };

  /* 📤 다른 화면이 쓸 수 있게 내보낸다 — 취약 챕터 대시보드(`weak.js`)가 비중을 곱한다.
     `pct` 는 내림차순으로 정렬돼 있고, 그 순서가 곧 「먼저 볼 순서」다. */
  window.EIP_STRATEGY = { ch: CH, late: LATE };

  var host = document.getElementById('strategy');
  if (!host) return;                     /* 홈이 아니면 띠는 안 그린다 */

  var el = window.EIP_UTIL.el;

  function title(id) {
    var t = window.EIP_TOC && window.EIP_TOC[id] && window.EIP_TOC[id].t;
    if (!t) return id;
    return t.replace(/^\d+\.\s*/, '');   /* "01. 요구사항 확인" → "요구사항 확인" */
  }

  function num(id) { return id.replace('ch', '').replace(/^0/, ''); }

  var card = el('section', 'strat');
  card.setAttribute('aria-label', '공부 전략');

  /* ── 🔑 결론 — 접어도 이것만은 보인다 ────────────────────────────
     20회차 400문항 비율을 20문항으로 환산해 큰 단원부터 쌓은 값이다.
       10장 6.65 → 11장 2.85 → 9장 2.10 → 2장 2.10 = 13.7문항(68.5점)
       + 8장 1.75 + 7장 1.60                       = 17.1문항(85점)
     🚨 T50 의 재분류로 넷째 자리가 **8장 → 2장** 으로 바뀌었다
        (DB 이론 11문항이 8장에 잘못 붙어 있었다) → exam-archive/chapters.md 3장 */
  var head = el('div', 'strat__head');

  /* 눈썹 — 맥락만 얹는다. 제목 노릇은 아래 결론이 한다 */
  head.appendChild(el('p', 'strat__eyebrow', '합격선 60점 = 20문항 중 12문항'));

  /* 🔑 결론 — 한 덩어리로 둔다. 칩과 글이 갈리면 두 조각으로 읽힌다.
     📌 단원은 **번호 순**으로 적는다 (8 · 9 · 10 · 11).
        출제량 순(10·11·8·9)은 아래 막대가 이미 보여 준다. */
  var must = el('h2', 'strat__must');
  must.appendChild(el('b', 'strat__must-k', '2 · 9 · 10 · 11'));
  must.appendChild(document.createTextNode(' 네 단원을 완벽하게'));
  head.appendChild(must);

  head.appendChild(el('p', 'strat__must-sub',
    '이 넷만으로 평균 13.7문항 — 68점입니다.'));

  var plus = el('p', 'strat__plus');
  plus.appendChild(el('b', 'strat__plus-k', '+ 7 · 8'));
  plus.appendChild(document.createTextNode(
    ' 을 더하면 17.1문항 · 85점. 네 단원만 하면 그 안에서 88%를 맞혀야 하지만, ' +
    '여섯 단원이면 70%로 충분합니다.'));
  head.appendChild(plus);

  /* 각주 — 강조하지 않는다.
     🔑 「넷 중 하나만 빠져도 안 된다」가 네 단원을 고른 근거다.
        2장 빼면 58.0 · 9장 빼면 58.0 · 11장 빼면 54.3 · 10장 빼면 35.3점. */
  head.appendChild(el('p', 'strat__note',
    '넷 중 하나만 빠져도 54~58점 — 60점에 못 미칩니다.'));

  card.appendChild(head);

  /* ── 접기 ───────────────────────────────────────────────────── */
  var toggle = el('button', 'strat__toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.appendChild(el('span', 'strat__toggle-t', '단원별로 자세히'));
  toggle.appendChild(el('span', 'strat__caret', '▾'));
  card.appendChild(toggle);

  var body = el('div', 'strat__body');
  body.setAttribute('hidden', '');       /* 🔒 기본은 접힘 — 길어서 접자는 요청이었다 */
  card.appendChild(body);

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) body.removeAttribute('hidden');
    else body.setAttribute('hidden', '');
    toggle.firstChild.textContent = open ? '접기' : '단원별로 자세히';
  });

  /* ── 막대 ───────────────────────────────────────────────────── */
  var list = el('ol', 'strat__list');
  var max = CH[0].pct;

  for (var i = 0; i < CH.length; i++) {
    var c = CH[i];
    var li = el('li', 'strat__row' + (c.pick ? ' is-pick' : '') +
                      (LATE[c.id] ? ' is-late' : ''));

    var a = el('a', 'strat__name');
    a.href = c.id + '.html';
    a.appendChild(el('b', 'strat__no', num(c.id)));
    a.appendChild(el('span', 'strat__t', title(c.id)));
    li.appendChild(a);

    var bar = el('div', 'strat__bar');
    var fill = el('i', 'strat__fill');
    fill.style.width = Math.round(c.pct / max * 100) + '%';
    bar.appendChild(fill);
    li.appendChild(bar);

    li.appendChild(el('span', 'strat__pct', c.pct.toFixed(1) + '%'));

    /* 🚨 꼬리표를 힌트보다 먼저 넣는다. 힌트가 `grid-column: 2 / -1` 로 둘째 줄을
       차지하므로, 뒤에 오는 것은 셋째 줄로 밀려난다 (그리드는 되돌아가지 않는다). */
    li.appendChild(el('span', 'strat__tag',
      c.pick ? '먼저' : (LATE[c.id] ? '나중에' : '그다음')));
    if (c.hint) li.appendChild(el('p', 'strat__hint', c.hint));

    list.appendChild(li);
  }
  body.appendChild(list);

  /* ── 꼬리 — 놓치기 쉬운 것 셋 ───────────────────────────────── */
  var foot = el('div', 'strat__foot');

  function tip(k, v) {
    var p = el('p', 'strat__tip');
    p.appendChild(el('b', null, k));
    p.appendChild(document.createTextNode(' ' + v));
    foot.appendChild(p);
  }

  tip('프로그래밍은 버릴 수 없습니다.',
      '10단원만 최근 회차 기준 7~9문항(35~45점)입니다. ' +
      '버리면 나머지를 거의 다 맞혀야 60점이 됩니다.');
  tip('기출은 돌아옵니다.',
      '핵심 항목의 49%가 두 번 이상 나왔고 주기가 대략 3년입니다. ' +
      '출력값 문제까지 그대로 다시 나옵니다.');
  tip('「나중에」는 「버려라」가 아닙니다.',
      '3·5·6·12단원은 2020~2022년에 나오고 최근엔 뜸하지만, ' +
      '출제기준에는 그대로 있어 언제든 한 문항이 나올 수 있습니다.');

  var src = el('p', 'strat__src',
    '기출 PDF 20회차 400문항(2020-1 ~ 2026-1)을 문항 단위로 세어 낸 값입니다.');
  foot.appendChild(src);
  body.appendChild(foot);

  host.appendChild(card);
}());
