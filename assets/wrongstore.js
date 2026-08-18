/* ==========================================================================
   EIP Study — 오답 기록 저장소

   섹션 퀴즈(quiz.js)와 앞으로 만들 오답노트 화면(wrong.html)이 함께 쓴다.
   분류 규칙이 두 곳에 흩어지면 반드시 어긋나므로 여기 한 벌만 둔다.

   eip.wrong.all = { "ch10-s05-03": { w, o, last, at, cat } }
   eip.fav.all   = { "ch10-s05-03": 저장한 시각 }

   분류 (설계는 EIPStudy-notes/PLAN-quiz.md 10장)
     w == 1 && last == 0  → 1  한번 틀림
               last == 1  → 2  틀렸다 맞음   (w 가 몇이든)
     w >= 2 && last == 0  → 3  여러번 틀림   (틀림→맞음→틀림도 여기)
     저장(fav)은 독립 축이라 1~3 과 동시에 성립한다.

   🚨 정답이어도 기록을 지우지 않는다. 지우면 2번 분류가 원리상 생기지 않는다.

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  /* app.js 가 window.EIP.store 로 노출한다 (키에 'eip.' 접두사를 붙여 준다) */
  var box = window.EIP_UTIL.store;
  function read(key, fallback) { var s = box(); return s ? s.get(key, fallback) : fallback; }
  function write(key, value) { var s = box(); if (s) s.set(key, value); }
  function now() { return (new Date()).getTime(); }

  /* 옛 형식(값이 숫자 = 오답 횟수)을 새 형식으로 감싼다.
     at 이 0 이면 "시각을 모른다" 는 뜻이고, 동기화 병합에서 항상 진다. */
  function entry(v) {
    if (v === null || v === undefined) {
      return { w: 0, o: 0, last: 0, at: 0, cat: null };
    }
    if (typeof v === 'number') {
      return { w: v, o: 0, last: 0, at: 0, cat: null };
    }
    var c = v.cat;
    return {
      w: v.w || 0,
      o: v.o || 0,
      last: v.last ? 1 : 0,
      at: v.at || 0,
      cat: (c === 1 || c === 2 || c === 3) ? c : null
    };
  }

  /* 0 은 "오답노트 대상이 아님"(한 번도 틀린 적 없음) */
  function classify(e) {
    if (!e || !e.w) return 0;
    if (e.cat) return e.cat;          /* 사용자가 옮긴 분류가 자동 규칙을 이긴다 */
    if (e.last === 1) return 2;
    return e.w >= 2 ? 3 : 1;
  }

  window.EIP_WRONG = {

    /* 전체를 새 형식으로 정규화해 돌려준다 (wrong.html 용) */
    all: function () {
      var raw = read('wrong.all', {}) || {}, out = {}, k;
      for (k in raw) {
        if (Object.prototype.hasOwnProperty.call(raw, k)) out[k] = entry(raw[k]);
      }
      return out;
    },

    entry: function (id) { return entry((read('wrong.all', {}) || {})[id]); },

    /* 채점 결과 기록. 정답이어도 지우지 않는다.
       단 한 번도 틀린 적 없는 문항은 애초에 담지 않는다 — 오답노트 대상이 아니다. */
    record: function (id, correct) {
      var raw = read('wrong.all', {}) || {};
      var e = entry(raw[id]);
      if (correct) { e.o = e.o + 1; e.last = 1; }
      else { e.w = e.w + 1; e.last = 0; }
      e.at = now();
      if (e.w > 0) { raw[id] = e; write('wrong.all', raw); }
      return e;
    },

    /* 사용자가 분류를 옮긴다. cat 이 1~3 이 아니면 자동 규칙으로 되돌린다. */
    setCat: function (id, cat) {
      var raw = read('wrong.all', {}) || {};
      if (!raw[id]) return null;
      var e = entry(raw[id]);
      e.cat = (cat === 1 || cat === 2 || cat === 3) ? cat : null;
      e.at = now();
      raw[id] = e;
      write('wrong.all', raw);
      return e;
    },

    classify: classify,

    /* 🔒 **지우는 것도 여기 한 벌이다** (T32). 화면이 직접 localStorage 를 만지면
       분류 규칙과 어긋난다 — 그것이 이 파일을 만든 이유다.
       `ids` 는 배열. 목록에 든 것만 지우므로 **보고 있는 것과 지워지는 것이 같다.** */
    remove: function (ids) {
      var raw = read('wrong.all', {}) || {}, i, n = 0;
      for (i = 0; i < (ids || []).length; i++) {
        if (raw[ids[i]]) { delete raw[ids[i]]; n++; }
      }
      if (n) write('wrong.all', raw);
      return n;
    },

    /* ★ 저장은 별도 축이라 따로 지운다 — 오답 기록은 남는다 */
    unfav: function (ids) {
      var f = read('fav.all', {}) || {}, i, n = 0;
      for (i = 0; i < (ids || []).length; i++) {
        if (f[ids[i]]) { delete f[ids[i]]; n++; }
      }
      if (n) write('fav.all', f);
      return n;
    },

    /* ---- 저장한 문제 (즐겨찾기) — 틀린 것과 별도 축 ---- */
    isFav: function (id) { return !!((read('fav.all', {}) || {})[id]); },

    toggleFav: function (id) {
      var f = read('fav.all', {}) || {};
      if (f[id]) { delete f[id]; } else { f[id] = now(); }
      write('fav.all', f);
      return !!f[id];
    },

    favs: function () { return read('fav.all', {}) || {}; }
  };
})();
