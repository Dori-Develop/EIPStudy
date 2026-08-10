/* ==========================================================================
   EIP Study — 학습 기록 병합 규칙

   두 벌의 eip.* 데이터를 합친다. 키마다 규칙이 다르므로 여기 한 벌만 둔다.

   🚨 T22(내보내기·가져오기)와 T8(기기 간 동기화)이 **같은 파일을 쓴다.**
      T8 은 이 위에 전송 계층만 얹는다. 두 벌이 되면 반드시 어긋난다 —
      wrongstore.js 를 만든 이유와 같다.

   ── 키별 규칙 ────────────────────────────────────────────────────────────
   done.chNN    섹션 파일명 배열        → 합집합
   fav.all      문항 id → 저장 시각     → 합집합 (시각은 **이른 쪽** — 처음 저장한 때)
   card.saved   암기 카드 id 배열       → 합집합
   wrong.all    {w,o,last,at,cat}       → w·o 는 더하고, last·cat 은 at 최신 쪽
   memo.chNN    {파일: {t,u}}           → 🚨 손실 0 (아래)
   quiz.chNN    {섹션번호: {score,total,at}} → at 최신 쪽
   meta.chNN    {total,title,updated}   → updated 최신 쪽
   exam.history [{seed,at,score,…}]     → 합쳐서 at 내림차순 20개
   exam.recent  [[문항 id,…], …]        → 앞에서부터 번갈아, 최대 RECENT_KEEP
   theme        → **아예 옮기지 않는다** (학습 기록이 아니다)

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  var EXAM_HISTORY_KEEP = 20;   /* exam.js 와 같은 값 */
  var EXAM_RECENT_KEEP = 5;

  function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
  function isArr(v) { return Object.prototype.toString.call(v) === '[object Array]'; }
  function isObj(v) { return v !== null && typeof v === 'object' && !isArr(v); }
  function keys(o) {
    var out = [], k;
    for (k in o) { if (has(o, k)) out.push(k); }
    return out;
  }

  /* ------------------------------------------------------- 옮기지 않는 키 */
  /* 학습 기록이 아닌 것. 초기화의 KEEP 목록과 같은 기준이다.
     📌 T8 의 sync.* (6자리 코드)도 생기면 여기 넣을 것 — 남의 코드를 받아 오면 안 된다. */
  var SKIP = ['theme', 'sync'];

  function isSkipped(key) {
    var i;
    for (i = 0; i < SKIP.length; i++) {
      if (key === SKIP[i] || key.indexOf(SKIP[i] + '.') === 0) return true;
    }
    return false;
  }

  /* ================================================================ 메모 */
  /* 🚨 여기만 "하나를 골라야 하는" 자리다.
     진도·오답은 기계가 만든 기록이라 잃어도 다시 만들어지지만
     메모는 사람이 손으로 쓴 글이라 사라지면 복구가 안 되고,
     조용히 덮이면 **잃은 줄도 모른다.** 그래서 손실 0 으로 간다.

       같다               → 그대로
       한쪽이 다른 쪽을 포함 → 긴 쪽      (덧붙여 쓴 흔한 경우)
       그 밖              → 이어 붙인다  (진짜 다른 내용)

     "포함하면 긴 쪽" 이 두 가지를 한 번에 푼다.
       · 오타를 고치거나 덧붙였을 때 거의 같은 글이 두 벌 쌓이지 않는다
       · **이미 합친 것을 또 합쳐도 불어나지 않는다** — 합친 글이 원본을 포함하므로 */
  function mergeMemoText(mine, theirs, theirStamp) {
    var a = String(mine || '');
    var b = String(theirs || '');
    if (!a) return b;
    if (!b) return a;
    if (a === b) return a;
    if (a.indexOf(b) >= 0) return a;
    if (b.indexOf(a) >= 0) return b;

    var when = stampText(theirStamp);
    return a + '\n\n——— 다른 기기에서 쓴 메모' + (when ? ' (' + when + ')' : '') + ' ———\n' + b;
  }

  /* memo.js 의 stampText 와 같은 모양. 없으면 직접 만든다 (병합만 따로 돌 수도 있어서) */
  function stampText(ms) {
    if (!ms) return '';
    if (window.EIP_MEMO && window.EIP_MEMO.stampText) return window.EIP_MEMO.stampText(ms);
    var d = new Date(ms);
    return (d.getMonth() + 1) + '/' + d.getDate();
  }

  function memoEntry(v) {
    if (typeof v === 'string') return { t: v, u: 0 };
    if (isObj(v)) return { t: String(v.t || ''), u: v.u || 0 };
    return null;
  }

  function mergeMemo(mine, theirs) {
    var out = {}, k, a, b;
    if (isObj(mine)) {
      for (k in mine) { if (has(mine, k)) { a = memoEntry(mine[k]); if (a && a.t) out[k] = a; } }
    }
    if (!isObj(theirs)) return out;

    for (k in theirs) {
      if (!has(theirs, k)) continue;
      b = memoEntry(theirs[k]);
      if (!b || !b.t) continue;

      if (!has(out, k)) { out[k] = b; continue; }

      a = out[k];
      var text = mergeMemoText(a.t, b.t, b.u);
      out[k] = { t: text, u: Math.max(a.u || 0, b.u || 0) };
    }
    return out;
  }

  /* ================================================================ 오답 */
  /* 횟수는 실제로 그만큼 틀린 것이므로 더한다.
     last(마지막이 정답이었나)와 cat(사용자가 옮긴 분류)은 **하나만 참**이라
     at 이 더 최신인 쪽을 따른다. at 이 0 이면 "시각을 모른다" 는 뜻이고 항상 진다. */
  function wrongEntry(v) {
    if (typeof v === 'number') return { w: v, o: 0, last: 0, at: 0, cat: null };
    if (isObj(v)) {
      var c = v.cat;
      return {
        w: v.w || 0, o: v.o || 0, last: v.last ? 1 : 0, at: v.at || 0,
        cat: (c === 1 || c === 2 || c === 3) ? c : null
      };
    }
    return null;
  }

  function mergeWrong(mine, theirs) {
    var out = {}, k, a, b;
    if (isObj(mine)) {
      for (k in mine) { if (has(mine, k)) { a = wrongEntry(mine[k]); if (a) out[k] = a; } }
    }
    if (!isObj(theirs)) return out;

    for (k in theirs) {
      if (!has(theirs, k)) continue;
      b = wrongEntry(theirs[k]);
      if (!b) continue;
      if (!has(out, k)) { out[k] = b; continue; }

      a = out[k];
      var newer = (b.at || 0) > (a.at || 0) ? b : a;
      out[k] = {
        w: (a.w || 0) + (b.w || 0),
        o: (a.o || 0) + (b.o || 0),
        last: newer.last,
        at: Math.max(a.at || 0, b.at || 0),
        cat: newer.cat
      };
    }
    return out;
  }

  /* ============================================================ 일반 규칙 */

  /* 배열 합집합 — 순서는 내 것 먼저 */
  function unionArray(mine, theirs) {
    var out = [], seen = {}, i, v;
    var lists = [isArr(mine) ? mine : [], isArr(theirs) ? theirs : []];
    var j;
    for (j = 0; j < lists.length; j++) {
      for (i = 0; i < lists[j].length; i++) {
        v = lists[j][i];
        if (!seen[v]) { seen[v] = 1; out.push(v); }
      }
    }
    return out;
  }

  /* {id: 시각} 합집합. 시각은 이른 쪽 — "처음 저장한 때" 가 맞다 */
  function unionStamped(mine, theirs) {
    var out = {}, k;
    if (isObj(mine)) { for (k in mine) { if (has(mine, k)) out[k] = mine[k]; } }
    if (isObj(theirs)) {
      for (k in theirs) {
        if (!has(theirs, k)) continue;
        if (!has(out, k)) out[k] = theirs[k];
        else if (theirs[k] && out[k] && theirs[k] < out[k]) out[k] = theirs[k];
      }
    }
    return out;
  }

  /* {하위키: {…, at}} — 하위키마다 at(또는 지정 필드) 최신 쪽 */
  function newerByField(mine, theirs, field) {
    var out = {}, k;
    if (isObj(mine)) { for (k in mine) { if (has(mine, k)) out[k] = mine[k]; } }
    if (!isObj(theirs)) return out;
    for (k in theirs) {
      if (!has(theirs, k)) continue;
      if (!has(out, k)) { out[k] = theirs[k]; continue; }
      var a = out[k], b = theirs[k];
      var av = (a && a[field]) || 0, bv = (b && b[field]) || 0;
      if (bv > av) out[k] = b;
    }
    return out;
  }

  /* 통째로 최신 쪽 (meta.chNN) */
  function newerWhole(mine, theirs, field) {
    var a = (mine && mine[field]) || 0;
    var b = (theirs && theirs[field]) || 0;
    return b > a ? theirs : (mine || theirs);
  }

  /* 시험 이력 — 합쳐서 at 내림차순, 같은 seed 는 하나만 */
  function mergeExamHistory(mine, theirs) {
    var all = (isArr(mine) ? mine : []).concat(isArr(theirs) ? theirs : []);
    var seen = {}, out = [], i, r;
    for (i = 0; i < all.length; i++) {
      r = all[i];
      if (!isObj(r)) continue;
      var id = String(r.seed) + '|' + String(r.at);
      if (seen[id]) continue;
      seen[id] = 1;
      out.push(r);
    }
    out.sort(function (x, y) { return String(y.at || '').localeCompare(String(x.at || '')); });
    return out.slice(0, EXAM_HISTORY_KEEP);
  }

  /* 최근 회차 문항 목록 — 중복 출제를 피하려는 것이라 양쪽을 번갈아 담는다 */
  function mergeExamRecent(mine, theirs) {
    var a = isArr(mine) ? mine : [];
    var b = isArr(theirs) ? theirs : [];
    var out = [], i;
    for (i = 0; i < Math.max(a.length, b.length); i++) {
      if (i < a.length && isArr(a[i])) out.push(a[i]);
      if (i < b.length && isArr(b[i])) out.push(b[i]);
      if (out.length >= EXAM_RECENT_KEEP) break;
    }
    return out.slice(0, EXAM_RECENT_KEEP);
  }

  /* ================================================================ 진입점 */

  function mergeKey(key, mine, theirs) {
    if (mine === undefined || mine === null) return theirs;
    if (theirs === undefined || theirs === null) return mine;

    if (key.indexOf('done.') === 0) return unionArray(mine, theirs);
    if (key.indexOf('memo.') === 0) return mergeMemo(mine, theirs);
    if (key.indexOf('quiz.') === 0) return newerByField(mine, theirs, 'at');
    if (key.indexOf('meta.') === 0) return newerWhole(mine, theirs, 'updated');
    if (key === 'wrong.all') return mergeWrong(mine, theirs);
    if (key === 'fav.all') return unionStamped(mine, theirs);
    if (key === 'card.saved') return unionArray(mine, theirs);
    if (key === 'exam.history') return mergeExamHistory(mine, theirs);
    if (key === 'exam.recent') return mergeExamRecent(mine, theirs);

    /* 모르는 키 — 새 기능이 만든 것일 수 있다. 배열이면 합치고 아니면 상대 것을 쓴다.
       🚨 새 키를 만들면 위에 규칙을 추가할 것. 여기 떨어지면 조용히 덮인다. */
    if (isArr(mine) && isArr(theirs)) return unionArray(mine, theirs);
    return theirs;
  }

  /* 들어올 것을 요약한다 — 사용자에게 보여 주고 확인받기 위한 것 */
  function summarize(data) {
    var out = { sections: 0, memos: 0, wrongs: 0, favs: 0, cards: 0, exams: 0, keys: 0 };
    keys(data).forEach(function (k) {
      var v = data[k];
      out.keys++;
      if (k.indexOf('done.') === 0 && isArr(v)) out.sections += v.length;
      else if (k.indexOf('memo.') === 0 && isObj(v)) out.memos += keys(v).length;
      else if (k === 'wrong.all' && isObj(v)) out.wrongs += keys(v).length;
      else if (k === 'fav.all' && isObj(v)) out.favs += keys(v).length;
      else if (k === 'card.saved' && isArr(v)) out.cards += v.length;
      else if (k === 'exam.history' && isArr(v)) out.exams += v.length;
    });
    return out;
  }

  window.EIP_MERGE = {

    skipped: isSkipped,
    summarize: summarize,
    mergeKey: mergeKey,

    /* 옮길 키만 골라 낸다 (내보내기용) */
    exportable: function (store) {
      var out = {};
      store.keys().forEach(function (k) {
        if (isSkipped(k)) return;
        var v = store.get(k, null);
        if (v !== null && v !== undefined) out[k] = v;
      });
      return out;
    },

    /* 합친 결과를 저장소에 쓰지 않고 만들어 본다.
       🔒 미리보기와 실제 결과가 어긋나지 않도록 apply 가 이것을 그대로 쓴다. */
    dryRun: function (store, incoming) {
      var out = {};
      store.keys().forEach(function (k) {
        if (isSkipped(k)) return;
        var v = store.get(k, null);
        if (v !== null && v !== undefined) out[k] = v;
      });
      keys(incoming).forEach(function (k) {
        if (isSkipped(k)) return;
        out[k] = mergeKey(k, has(out, k) ? out[k] : null, incoming[k]);
      });
      return out;
    },

    /* 저장소에 반영한다. 바뀐 키 수를 돌려준다 */
    apply: function (store, incoming, mode) {
      var changed = 0;

      /* 덮어쓰기는 "이 파일의 상태로 되돌린다" 는 뜻이다.
         파일에 없는 학습 기록 키는 지운다 — 백업 복구가 그런 동작이다. */
      if (mode === 'replace') {
        keys(incoming).forEach(function (k) {
          if (isSkipped(k)) return;
          store.set(k, incoming[k]);
          changed++;
        });
        store.keys().forEach(function (k) {
          if (isSkipped(k)) return;
          if (!has(incoming, k)) { store.remove(k); changed++; }
        });
        return changed;
      }

      var merged = this.dryRun(store, incoming);
      keys(merged).forEach(function (k) {
        store.set(k, merged[k]);
        changed++;
      });
      return changed;
    }
  };
})();
