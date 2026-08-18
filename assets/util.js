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

  window.EIP_UTIL = {
    el: el,
    has: has,
    inArray: inArray,
    $: $,
    $$: $$,
    pad2: pad2
  };
}());
