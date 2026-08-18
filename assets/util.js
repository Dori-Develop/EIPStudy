/* 공용 헬퍼 (T35) — **가장 먼저 실린다.**

   🚨 `el()` 이 15벌, `has()` 가 6벌 똑같이 흩어져 있었다. 바이트까지 같았다.
      한 벌로 모아 둔다 — 규칙이 두 벌이면 반드시 어긋난다는 것을 여러 번 겪었다.

   📌 쓰는 쪽은 **줄 하나로 별명을 붙인다.** 부르는 자리(`el(...)`)는 그대로다.

        var el = window.EIP_UTIL.el;

   🚨 **`window.EIP` 에 넣지 않는다.** 그것은 `app.js` 가 만드는데,
      `strategy.js` 는 `app.js` 보다 **먼저** 실린다. 그래서 별도 파일이다.

   ES5 로 쓴다 (화살표·const·템플릿 리터럴 금지) → CLAUDE.md 3장 */
(function () {
  'use strict';

  /* 요소 하나 만들기. text 는 **글로만** 들어간다 (마크업은 안 먹는다) */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* 자기 속성인지. `{}` 에 없는 키를 물었을 때 프로토타입 것이 딸려오는 것을 막는다 */
  function has(obj, k) {
    return Object.prototype.hasOwnProperty.call(obj, k);
  }

  /* 배열에 있나 — ES3 에는 Array.indexOf 가 없다 (JScript 검사기가 걸린다) */
  function inArray(arr, v) {
    if (!arr) return false;
    for (var i = 0; i < arr.length; i++) if (arr[i] === v) return true;
    return false;
  }

  function $(sel, root) { return (root || document).querySelector(sel); }

  /* 🚨 **진짜 배열로 바꿔서 돌려준다.** NodeList 는 `forEach` 가 없는 브라우저가 있다 */
  function $$(sel, root) {
    var list = (root || document).querySelectorAll(sel), out = [], i;
    for (i = 0; i < list.length; i++) out.push(list[i]);
    return out;
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  /* 날짜는 **쓰는 모양이 화면마다 다르다.** 모양까지 통일하지 않고 조각만 모은다 —
     `YYYY-MM-DD`(퀴즈 기록) · `MM-DD`(오답노트) · `M/D`(병합) · `YYYYMMDD`(백업 파일명). */
  function ymd(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }
  function mmdd(d) {
    d = d || new Date();
    return pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  /* 문제 은행을 필요한 것만 내려받는다 (모의 문제지·오답노트).
     🚨 `fetch()` 를 안 쓴다 — `file://` 에서 CORS 로 막힌다. → CLAUDE.md 3장

     📌 **TODO 는 `assets/bankload.js` 로 따로 빼자고 적혀 있었지만 여기 둔다.**
        util.js 는 이미 **모든 페이지에 실리므로** 「어느 페이지에 넣는 걸 잊었다」가
        원천적으로 안 생긴다. 12줄이라 실어 두는 값이 잊는 값보다 싸다. */
  function loadBanks(list, done) {
    var left = list.length;
    if (!left) { done(); return; }
    for (var i = 0; i < list.length; i++) {
      (function (ch) {
        if (window['EIP_BANK_' + ch]) { if (--left === 0) done(); return; }
        var s = document.createElement('script');
        s.src = 'assets/bank-' + ch + '.js';
        /* 실패해도 계속 간다 — 그 챕터 문항만 빠진다 */
        s.onload = s.onerror = function () { if (--left === 0) done(); };
        document.head.appendChild(s);
      }(list[i]));
    }
  }

  window.EIP_UTIL = {
    el: el,
    has: has,
    inArray: inArray,
    $: $,
    $$: $$,
    pad2: pad2,
    ymd: ymd,
    mmdd: mmdd,
    loadBanks: loadBanks
  };
}());
