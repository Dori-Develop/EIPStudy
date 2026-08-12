/* 섹션별 출제 빈도 (T50) — 챕터 목차와 섹션 머리에 별을 붙인다.
   🔒 값의 원본은 EIPStudy-notes/exam-archive/pool/*.js 다 (비공개).
      거기서 `ch`·`sec` 을 세어 여기로 옮긴다 — **손으로 고치지 말 것.**
      다시 세는 명령은 exam-archive/sections.md 마지막 장에 있다.
   📕 기출 PDF 20회차 400문항 = 개정(2020) 이후 전 회차. 웹 2026-2 는 뺐다.
   ES5 로 쓴다 (화살표·const·템플릿 리터럴 금지) → CLAUDE.md 3장 */
(function () {
  'use strict';

  /* 키는 'CCSS' 네 자리 — 챕터 두 자리 + 섹션 두 자리. 값은 20회차 출제 문항 수.
     🚨 0 인 섹션은 아예 넣지 않는다 (103개다). 없으면 0 으로 읽는다. */
  var N = {
    '0101': 1, '0103': 1, '0106': 2, '0108': 1, '0110': 1, '0111': 2, '0115': 1
  , '0119': 3, '0124': 1
  , '0203': 1, '0204': 2, '0205': 4, '0206': 1, '0209': 1, '0210': 6, '0211': 2
  , '0212': 3, '0213': 7, '0214': 3, '0215': 2, '0216': 3, '0218': 1, '0219': 2
  , '0220': 1, '0224': 1, '0226': 2
  , '0304': 2, '0308': 2
  , '0404': 1, '0406': 11, '0408': 1, '0409': 13
  , '0506': 1, '0510': 5
  , '0601': 4, '0607': 1
  , '0702': 1, '0704': 9, '0705': 7, '0706': 3, '0707': 6, '0709': 3, '0711': 2
  , '0712': 1
  , '0802': 3, '0803': 2, '0804': 2, '0805': 5, '0806': 7, '0807': 5, '0808': 5
  , '0809': 6
  , '0901': 1, '0902': 1, '0903': 3, '0909': 7, '0910': 15, '0911': 5, '0912': 2
  , '0914': 8
  , '1001': 1, '1002': 7, '1003': 15, '1004': 23, '1005': 12, '1006': 13
  , '1007': 6, '1008': 10, '1009': 21, '1010': 22, '1013': 3
  , '1101': 2, '1103': 2, '1104': 7, '1106': 3, '1107': 1, '1109': 11, '1110': 2
  , '1112': 9, '1113': 11, '1114': 9
  , '1202': 1, '1203': 1, '1206': 2, '1207': 1
  };

  /* 등급 — 20회차 기준. 🔑 경계는 「회차당 몇 문항인가」로 잡았다.
       ★★★ 5문항 이상 (회차당 0.25+) — 31섹션. 이 31칸이 전체의 76% 다
       ★★   2~4문항                   — 29섹션
       ★     1문항                     — 25섹션
       ·     0회                       — 103섹션 (표시하지 않는다) */
  function grade(n) {
    if (n >= 5) return 3;
    if (n >= 2) return 2;
    if (n >= 1) return 1;
    return 0;
  }

  var LABEL = ['', '한 번 나왔다', '가끔 나온다', '자주 나온다'];

  function key(chId, file) {
    var m = /^ch(\d\d)$/.exec(chId);
    var s = /^s(\d+)\.html$/.exec(file);
    if (!m || !s) return null;
    return m[1] + (s[1].length < 2 ? '0' + s[1] : s[1]);
  }

  function count(chId, file) {
    var k = key(chId, file);
    return (k && N[k]) || 0;
  }

  /* 🔒 **여기만 ⭐(이모지)다.** 본문의 중요도 별은 ★(글자·파랑)이라 섞이지 않는다 —
     2026-08-12 에 둘을 맞바꿨다. 전에는 정반대였다.
     🔑 **어느 별이 무엇인지 한눈에 갈려야 한다** — 노란 ⭐ 는 「기출에 몇 번 나왔나」,
        파란 ★ 는 「본문이 중요하다고 표시한 곳」이다. */
  function stars(g) {
    var s = '';
    for (var i = 0; i < g; i++) s += '⭐';
    return s;
  }

  function badge(n) {
    var g = grade(n);
    if (!g) return null;
    var b = document.createElement('span');
    b.className = 'srank srank--' + g;
    b.textContent = stars(g);
    b.title = '기출 20회차에서 ' + n + '문항 — ' + LABEL[g];
    b.setAttribute('aria-label', b.title);
    return b;
  }

  var CH = window.EIP_CHAPTER;
  if (!CH) return;

  /* ── 챕터 목차의 섹션 목록 ─────────────────────────────────────
     🚨 app.js 가 그린 뒤라야 한다. DOMContentLoaded 뒤 한 번 더 본다. */
  function paint() {
    var rows = document.querySelectorAll('.js-seclist .seclist__item');
    var i;
    for (i = 0; i < rows.length; i++) {
      if (rows[i].getAttribute('data-srank')) continue;
      var a = rows[i].querySelector('.seclist__link');
      var t = rows[i].querySelector('.seclist__title');
      if (!a || !t) continue;
      var f = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
      var b = badge(count(CH.id, f));
      rows[i].setAttribute('data-srank', '1');
      if (b) t.appendChild(b);
    }

    /* 사이드바 목차 — 좁은 화면에서는 안 보이지만 같은 값을 쓴다 */
    var links = document.querySelectorAll('#toc > ul.toc > li > .toc__row > a');
    for (i = 0; i < links.length; i++) {
      if (links[i].getAttribute('data-srank')) continue;
      var lf = (links[i].getAttribute('href') || '').split('/').pop().toLowerCase();
      var lb = badge(count(CH.id, lf));
      links[i].setAttribute('data-srank', '1');
      if (lb) links[i].appendChild(lb);
    }
  }

  /* ── 섹션 페이지 머리 — 별만으로는 몇 문항인지 모른다 ────────── */
  function paintSection() {
    if (CH.page !== 'section') return;
    var sec = CH.sections && CH.sections[CH.index];
    if (!sec) return;
    /* 🚨 섹션 페이지에 `h1` 은 없다 — 본문이 `## (4) …` 로 시작해 첫 머리가 `h2` 다.
       `#doc` 은 app.js 가 마크다운을 넣은 뒤라야 차므로 아래 재시도에 기댄다. */
    var h1 = document.querySelector('#doc h2');
    if (!h1 || h1.getAttribute('data-srank')) return;
    h1.setAttribute('data-srank', '1');   /* 🔑 0회여도 찍는다 — 재시도를 멈추려면 */

    var n = count(CH.id, sec.f);
    var g = grade(n);
    if (!g) return;

    var p = document.createElement('p');
    p.className = 'srankline srankline--' + g;
    var b = document.createElement('b');
    b.textContent = stars(g);
    p.appendChild(b);
    p.appendChild(document.createTextNode(
      ' 기출 20회차에서 ' + n + '문항 — ' + LABEL[g]));
    if (h1.parentNode) h1.parentNode.insertBefore(p, h1.nextSibling);
  }

  function run() { paint(); paintSection(); }

  /* 🚨 우리가 그리는 것이 아니라 **남이 그린 뒤에** 얹는 일이다.
     목차는 app.js 가, 본문은 CDN 의 marked 가 채운다 — 언제 끝나는지 모른다.
     그래서 **다 붙을 때까지 잠깐 훑는다.** 붙은 자리는 data-srank 로 건너뛴다. */
  var tries = 0;
  function poll() {
    run();
    /* 🚨 「없다」를 「끝났다」로 읽으면 안 된다 — app.js 가 아직 안 그렸을 뿐일 수 있다.
       **하나라도 그려졌고 그중 안 붙은 것이 없을 때**만 끝난 것이다. */
    var items = document.querySelectorAll('.js-seclist .seclist__item');
    var listDone = CH.page === 'section' ||
      (items.length > 0 &&
       !document.querySelector('.js-seclist .seclist__item:not([data-srank])'));
    var secDone = CH.page !== 'section' || !!document.querySelector('#doc h2[data-srank]');
    if ((listDone && secDone) || ++tries > 20) return;
    setTimeout(poll, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', poll);
  } else { poll(); }
}());
