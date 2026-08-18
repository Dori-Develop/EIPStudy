/* 취약 챕터 대시보드 (T23) — 정리본 목록(chapters.html) 위쪽에만 그린다.

   🔑 「무엇을 모르나」가 아니라 **「지금 안 하면 몇 점을 잃나」**를 보여 준다.
      정답률만 늘어놓으면 1%짜리 3단원과 33%짜리 10단원이 같은 크기로 보인다.

        손실   = 출제 비중(%) × (1 − 숙련도)
        숙련도 = 진도 × 정확도        ← **읽은 만큼 나아가고, 틀린 만큼 되돌아온다**
          진도   = 학습 완료한 섹션 ÷ 전체 섹션        (eip.done.chNN)
          정확도 = (맞힌 문항 − 아직 틀리는 문항) ÷ 푼 문항   (안 풀었으면 1)

   🚨 **진도가 기준이고 퀴즈는 보정이다** (사용자 확인, 08-18). 처음에는 「퀴즈를
      푼 섹션」으로 진행을 셌는데, **이 사이트의 학습은 정리본을 읽는 것**이고
      퀴즈는 확인하는 수단이다. 읽고 체크만 해도 진도가 나가야 맞다.
      💬 *"섹션 문제를 푸는게 아니라 이 섹션 학습 완료에 따라서 체크되어야 할 것 같아."*
   🚨 **퀴즈를 안 풀었다고 깎지 않는다** — 깎으면 읽기만 하는 사람은 영원히 0 이다.
      대신 **풀어서 틀린 것은 그대로 깎는다.**
   🚨 **오답노트를 빼지 않으면 「다시 풀어 맞혔다」가 취약을 지운다.** 섹션 퀴즈는
      최근 성적만 남기므로, 여러 번 틀린 이력은 eip.wrong.all 에만 남아 있다.

   🔒 새 저장 키를 만들지 않는다 (T8 동기화 순서에 영향이 없다). 읽기만 한다 —
        eip.done.chNN = ["s01.html", …]                  ← 학습 완료 섹션 (진도)
        eip.quiz.chNN = { 섹션번호: {score, total, at} }   ← 섹션 퀴즈 최근 성적
        eip.wrong.all = { 문항id: {w,o,last,at,cat} }      ← 아직 틀리는 문항
      출제 비중은 assets/strategy.js 의 표 **한 벌**을 그대로 쓴다 (EIP_STRATEGY).
      섹션별 문항 수는 build.sh 가 toc.js 에 심어 둔 `q` 다 —
      🚨 **은행 12개는 700KB 라 여기서 싣지 않는다.**
   📌 진도의 분모는 **부록을 포함한 전체 섹션**이다 — 위쪽 진도 막대(app.js)와
      같은 분모여야 한 화면에서 두 숫자가 어긋나 보이지 않는다.

   ES5 로 쓴다 (화살표·const·템플릿 리터럴 금지) → CLAUDE.md 3장 */
(function () {
  'use strict';

  var host = document.getElementById('weak');
  if (!host) return;

  var TOC = window.EIP_TOC;
  var S = window.EIP_STRATEGY;
  var W = window.EIP_WRONG;
  if (!TOC || !S || !window.EIP) return;

  var store = window.EIP.store;

  /* 상위 몇 장만 펼쳐 둔다. 12장을 다 늘어놓으면 아래 카드까지 밀린다 */
  var TOP = 4;

  /* ------------------------------------------------------------- DOM 헬퍼 */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function title(id) {
    var t = TOC[id] && TOC[id].t;
    return t ? t.replace(/^\d+\.\s*/, '') : id;
  }

  function num(id) { return id.replace('ch', '').replace(/^0/, ''); }

  /* ---------------------------------------------------- 아직 틀리는 문항 수 */
  /* 🔒 분류 규칙은 wrongstore.js 한 벌뿐이다. 여기서 다시 만들지 않는다.
     1(한 번 틀림)·3(여러 번 틀림)이 「아직 틀린다」. 2 는 고친 것이라 뺀다. */
  function wrongByCh() {
    var out = {};
    if (!W) return out;
    var all = W.all(), id, c, ch;
    for (id in all) {
      if (!Object.prototype.hasOwnProperty.call(all, id)) continue;
      c = W.classify(all[id]);
      if (c !== 1 && c !== 3) continue;
      ch = id.slice(0, 4);                 /* "ch10-s05-03" → "ch10" */
      out[ch] = (out[ch] || 0) + 1;
    }
    return out;
  }

  /* ------------------------------------------------------------ 챕터 집계 */
  /* ES3 에는 Array.indexOf 가 없다 (JScript 검사기가 걸린다) */
  function has(arr, v) {
    for (var i = 0; i < arr.length; i++) if (arr[i] === v) return true;
    return false;
  }

  function measure(chId, pct, wrong) {
    var toc = TOC[chId];
    var secs = (toc && toc.s) || [];
    var rec = store.get('quiz.' + chId, {}) || {};
    var readList = store.get('done.' + chId, []);
    if (Object.prototype.toString.call(readList) !== '[object Array]') readList = [];
    var i, s, r;

    var readSecs = 0;      /* 학습 완료로 체크한 섹션 */
    var qTotal = 0;        /* 그 단원 전체 문항 — 아직 안 푼 섹션까지 */
    var got = 0, asked = 0;
    var last = '';
    var next = null;       /* 아직 학습 완료가 아닌 첫 섹션 — 「여기부터」의 착지점 */

    for (i = 0; i < secs.length; i++) {
      s = secs[i];
      if (has(readList, s.f)) readSecs++;
      else if (!next) next = s;

      if (!s.q) continue;
      qTotal += s.q;
      r = rec[String(i + 1)];             /* quiz.js: secNo = index + 1 */
      if (r && r.total) {
        got += r.score || 0;
        asked += r.total;
        if (r.at && r.at > last) last = r.at;   /* YYYY-MM-DD 는 사전순 = 날짜순 */
      }
    }

    var read = secs.length ? readSecs / secs.length : 0;

    /* 🚨 모의 문제지도 오답을 적립하므로 wrong 이 got 를 넘을 수 있다 — 0 에서 막는다.
       퀴즈를 한 번도 안 풀었으면 깎지 않는다(1). 단 오답노트에 남은 것은 깎는다. */
    var acc = 1;
    if (asked) acc = (got - wrong) / asked;
    else if (qTotal) acc = 1 - wrong / qTotal;
    if (acc < 0) acc = 0;
    if (acc > 1) acc = 1;

    return {
      id: chId,
      pct: pct,
      secs: secs.length,
      readSecs: readSecs,
      qTotal: qTotal,
      wrong: wrong,
      asked: asked,
      shown: asked ? got / asked : 0,     /* 화면에 적는 정답률은 「푼 것 그대로」 */
      last: last,
      next: next,
      loss: pct * (1 - read * acc)
    };
  }

  var wrongs = wrongByCh();
  var rows = [];
  var i, c;
  for (i = 0; i < S.ch.length; i++) {
    c = S.ch[i];
    if (!TOC[c.id]) continue;
    rows.push(measure(c.id, c.pct, wrongs[c.id] || 0));
  }

  var touched = 0, maxLoss = 0;
  for (i = 0; i < rows.length; i++) {
    if (rows[i].readSecs) touched++;
    if (rows[i].loss > maxLoss) maxLoss = rows[i].loss;
  }

  /* 손실이 큰 순. 같으면 출제 비중이 큰 쪽을 위로 둔다 */
  rows.sort(function (a, b) { return (b.loss - a.loss) || (b.pct - a.pct); });

  /* ---------------------------------------------------------------- 그리기 */
  var card = el('section', 'weak');
  card.setAttribute('aria-label', '취약 단원');

  var head = el('div', 'weak__head');
  head.appendChild(el('p', 'weak__eyebrow',
    touched ? '진도와 퀴즈 성적으로 계산한 순서입니다'
            : '아직 학습 완료한 섹션이 없어 출제 비중 순으로 보여 줍니다'));

  /* ── 🔑 한 줄 결론 — 「여기부터 보세요」 ─────────────────────────
     🚨 문장으로만 두지 않고 **누를 수 있게** 만든다. 다음에 할 일을 알려 놓고
        찾아가는 것을 사용자에게 시키면 한 번 더 헤맨다. */
  var top = rows[0];
  var lead = el('a', 'weak__lead');

  if (maxLoss <= 0) {
    /* 🚨 다 돌았는데도 「여기부터 보세요」가 뜨면 거짓말이 된다.
       남은 손실이 없으면 **다음 할 일**은 정리본이 아니라 모의 문제지다. */
    lead.href = 'exam.html';
    lead.appendChild(el('span', 'weak__lead-k', '다 돌았습니다'));
    var doneT = el('span', 'weak__lead-t');
    doneT.appendChild(el('b', null, '모의 문제지로'));
    lead.appendChild(doneT);
    lead.appendChild(el('span', 'weak__lead-why',
      '12단원을 다 읽었고 아직 틀리는 문항도 없습니다'));
  } else {
    lead.href = top.next ? top.id + '/' + top.next.f : top.id + '.html';
    lead.appendChild(el('span', 'weak__lead-k', '여기부터'));

    var leadT = el('span', 'weak__lead-t');
    leadT.appendChild(el('b', null, num(top.id) + '단원 ' + title(top.id)));
    if (top.next) leadT.appendChild(document.createTextNode(' — ' + top.next.t));
    lead.appendChild(leadT);

    var why = '출제 비중 ' + top.pct.toFixed(1) + '% · ';
    if (!top.readSecs) {
      why += '아직 한 섹션도 안 봤습니다';
    } else if (top.readSecs < top.secs) {
      why += (top.secs - top.readSecs) + '개 섹션이 남았습니다';
    } else if (top.wrong) {
      why += '다 읽었지만 아직 틀리는 문항이 ' + top.wrong + '개';
    } else {
      why += '정답률 ' + Math.round(top.shown * 100) + '% — 다시 한 바퀴';
    }
    lead.appendChild(el('span', 'weak__lead-why', why));
  }

  head.appendChild(lead);
  card.appendChild(head);

  /* ── 표 ─────────────────────────────────────────────────────── */
  var list = el('ol', 'weak__list');

  function row(d, hidden) {
    var li = el('li', 'weak__row');
    if (hidden) li.setAttribute('hidden', '');

    var a = el('a', 'weak__name');
    a.href = d.id + '.html';
    a.appendChild(el('b', 'weak__no', num(d.id)));
    a.appendChild(el('span', 'weak__t', title(d.id)));
    li.appendChild(a);

    /* 막대는 「남은 손실」이다 — 길수록 급하다 */
    var bar = el('div', 'weak__bar');
    var fill = el('i', 'weak__fill');
    fill.style.width = (maxLoss ? Math.round(d.loss / maxLoss * 100) : 0) + '%';
    bar.appendChild(fill);
    li.appendChild(bar);

    li.appendChild(el('span', 'weak__pct', d.pct.toFixed(1) + '%'));

    /* 🚨 숫자를 늘어놓지 않고 **상태 한 마디**로 적는다.
       「정답률 62% · 진행 4/16」 은 무엇을 하라는 말인지 읽는 데 시간이 걸린다. */
    var meta = el('p', 'weak__meta');
    if (!d.readSecs) {
      meta.appendChild(el('span', 'weak__tag is-new', '시작 전'));
      meta.appendChild(el('span', null, d.secs + '개 섹션 · ' + d.qTotal + '문항'));
    } else {
      /* 🔑 앞머리는 **진도**다. 정답률은 퀴즈를 풀었을 때만 뒤에 붙는다 —
         안 풀었는데 「정답률 0%」가 뜨면 못한 것처럼 보인다. */
      meta.appendChild(el('span', 'weak__tag',
        '진도 ' + d.readSecs + '/' + d.secs));
      if (d.asked) {
        meta.appendChild(el('span', null, '정답률 ' + Math.round(d.shown * 100) + '%'));
      }
      if (d.wrong) meta.appendChild(el('span', 'weak__wrong', '아직 틀림 ' + d.wrong));
      if (d.last) meta.appendChild(el('span', 'weak__at', '마지막 ' + d.last.slice(5)));
    }
    li.appendChild(meta);
    return li;
  }

  for (i = 0; i < rows.length; i++) list.appendChild(row(rows[i], i >= TOP));
  card.appendChild(list);

  var more = el('button', 'weak__more');
  more.type = 'button';
  more.setAttribute('aria-expanded', 'false');
  more.textContent = '나머지 ' + (rows.length - TOP) + '단원 보기';
  more.addEventListener('click', function () {
    var open = more.getAttribute('aria-expanded') !== 'true';
    more.setAttribute('aria-expanded', open ? 'true' : 'false');
    var items = list.children;
    for (var k = TOP; k < items.length; k++) {
      if (open) items[k].removeAttribute('hidden');
      else items[k].setAttribute('hidden', '');
    }
    more.textContent = open ? '접기' : '나머지 ' + (rows.length - TOP) + '단원 보기';
  });
  if (rows.length > TOP) card.appendChild(more);

  host.appendChild(card);
}());
