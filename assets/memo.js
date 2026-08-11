/* ==========================================================================
   EIP Study — 메모 저장 규칙 (섹션 · 문항)

   섹션 페이지(chNN/sMM.html)에 접이식 메모 카드를 붙이고,
   문항 메모의 읽고 쓰는 규칙도 여기 둔다 (위젯은 qcard.js).
   모아보기(notes.html)·병합(merge.js)이 같은 형식을 쓰므로 규칙은 여기 한 벌만 둔다.

   eip.memo.chNN = { "s01.html":     { t: "메모 본문", u: 1754530000000 } }   섹션
   eip.memo.q    = { "ch01-s05-03":  { t: "메모 본문", u: 1754530000000 } }   문항

   📌 **문항 메모는 챕터로 나누지 않는다.** 섹션 메모는 섹션 페이지에서 그 챕터만
      읽으면 되지만, 문항 메모는 오답노트가 **여러 챕터를 한 화면에 섞어** 보여 준다.
      챕터로 쪼개면 그 화면이 12개 키를 다 읽어야 한다.

   🚨 두 키의 값 구조가 같아야 한다 — merge.js 가 `memo.` 로 시작하는 키를
      **하나의 규칙(손실 0)** 으로 합친다. 문항 메모도 사람이 손으로 쓴 글이다.

   🚨 u(수정 시각)를 처음부터 넣는다.
      T8 기기 간 동기화가 "어느 쪽이 최신인가"를 판정할 근거가 이것뿐이다.
      나중에 필드를 늘려도 그 전에 쌓인 메모는 영원히 판정할 수 없다.

   📌 챕터 단위로 묶는다 — 키가 200개가 아니라 12개다. 진도(eip.done.chNN)와 같은 결.
      빈 메모는 저장하지 않고 지운다. 모아보기에 빈 줄이 뜨지 않게 하려는 것이다.

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  /* app.js 가 window.EIP.store 로 노출한다 (키에 'eip.' 접두사를 붙여 준다) */
  function box() { return (window.EIP && window.EIP.store) || null; }
  function now() { return (new Date()).getTime(); }

  function chapterMemos(ch) {
    var s = box();
    var v = s ? s.get('memo.' + ch, null) : null;
    return (v && typeof v === 'object') ? v : {};
  }

  function has(obj, k) { return Object.prototype.hasOwnProperty.call(obj, k); }

  /* 옛 형식(값이 문자열)도 읽어 준다. u 가 0 이면 "시각을 모른다" 는 뜻이고
     동기화 병합에서 항상 진다 — 오답 기록(wrongstore.js)의 at 과 같은 규칙이다. */
  function entry(v) {
    if (typeof v === 'string') return { t: v, u: 0 };
    if (v && typeof v === 'object') return { t: String(v.t || ''), u: v.u || 0 };
    return null;
  }

  /* 🔒 쓰기 규칙 한 벌 — 섹션 메모와 문항 메모가 같은 함수를 쓴다.
     빈 문자열(공백만인 것 포함)이면 지우고, 내용이 그대로면 시각도 건드리지 않는다.
     남은 것이 없으면 키 자체를 지운다 — 빈 객체가 쌓이면 내보내기 파일만 커진다.
     저장한 시각을 돌려준다 (지웠거나 안 바뀌었으면 0 또는 이전 시각). */
  function writeInto(storeKey, all, field, text) {
    var s = box();
    if (!s) return 0;

    var body = String(text == null ? '' : text);
    var stamp = 0;

    if (body.replace(/^\s+|\s+$/g, '') === '') {
      if (!has(all, field)) return 0;
      delete all[field];
    } else {
      var prev = has(all, field) ? entry(all[field]) : null;
      if (prev && prev.t === body) return prev.u;   /* 내용이 같으면 시각도 그대로 */
      stamp = now();
      all[field] = { t: body, u: stamp };
    }

    var left = 0, k;
    for (k in all) { if (has(all, k)) left++; }
    if (left) s.set(storeKey, all);
    else s.remove(storeKey);

    return stamp;
  }

  /* 값이 있는 것만 {t,u} 로 정리해 돌려준다 */
  function cleaned(all) {
    var out = {}, k, e;
    for (k in all) {
      if (!has(all, k)) continue;
      e = entry(all[k]);
      if (e && e.t) out[k] = e;
    }
    return out;
  }

  function qMemos() {
    var s = box();
    var v = s ? s.get('memo.q', null) : null;
    return (v && typeof v === 'object') ? v : {};
  }

  var MEMO = {

    /* 한 섹션의 메모 — 없으면 null */
    get: function (ch, file) {
      var all = chapterMemos(ch);
      return has(all, file) ? entry(all[file]) : null;
    },

    set: function (ch, file, text) {
      return writeInto('memo.' + ch, chapterMemos(ch), file, text);
    },

    /* ------------------------------------------------------------ 문항 메모 */
    /* 문항 id 하나에 메모 하나. 같은 문항이 섹션 퀴즈·모의 문제지·오답노트
       어디에 나오든 **같은 메모가 보인다** — 그러라고 회차가 아닌 문항에 붙였다. */
    q: {
      get: function (id) {
        var all = qMemos();
        return has(all, id) ? entry(all[id]) : null;
      },
      set: function (id, text) {
        return writeInto('memo.q', qMemos(), id, text);
      },
      all: function () { return cleaned(qMemos()); },
      count: function () {
        var all = cleaned(qMemos()), n = 0, k;
        for (k in all) { if (has(all, k)) n++; }
        return n;
      }
    },

    /* 챕터 하나의 메모 전체 — { 파일명: {t,u} } */
    chapter: function (ch) {
      return cleaned(chapterMemos(ch));
    },

    /* 메모가 있는 챕터 id 목록 (정렬됨)
       🚨 `memo.q`(문항 메모)를 'q' 라는 챕터로 내주면 안 된다.
          모아보기가 그것을 챕터로 알고 빈 묶음을 하나 그린다. */
    chapters: function () {
      var s = box();
      if (!s) return [];
      var out = [];
      s.keys().forEach(function (k) {
        if (k.indexOf('memo.') !== 0) return;
        var id = k.slice(5);
        if (id === 'q') return;
        out.push(id);
      });
      out.sort();
      return out;
    },

    /* "8/10 14:32" — 오늘이면 "14:32" */
    stampText: function (ms) {
      if (!ms) return '';
      var d = new Date(ms);
      var t = pad(d.getHours()) + ':' + pad(d.getMinutes());
      var today = new Date();
      var sameDay = d.getFullYear() === today.getFullYear() &&
                    d.getMonth() === today.getMonth() &&
                    d.getDate() === today.getDate();
      return sameDay ? t : (d.getMonth() + 1) + '/' + d.getDate() + ' ' + t;
    }
  };

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  window.EIP_MEMO = MEMO;

  /* ======================================================= 섹션 페이지 위젯 */
  /* 모아보기(notes.html)는 위 저장소만 쓰고 아래는 건너뛴다. */
  var CH = window.EIP_CHAPTER || null;
  if (!CH || CH.page !== 'section') return;

  var sec = CH.sections && CH.sections[CH.index];
  if (!sec) return;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var ta, head, state, bodyBox, savedEl, saveTimer = null, lastSaved = 0;

  function summary(text, stamp) {
    var body = String(text || '').replace(/^\s+|\s+$/g, '');
    if (!body) return '비어 있음';
    var when = MEMO.stampText(stamp);
    return body.length + '자' + (when ? ' · ' + when : '');
  }

  function flush() {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    var stamp = MEMO.set(CH.id, sec.f, ta.value);
    if (stamp) lastSaved = stamp;

    var body = ta.value.replace(/^\s+|\s+$/g, '');
    state.textContent = summary(ta.value, lastSaved);
    savedEl.textContent = body
      ? (lastSaved ? '저장됨 ' + MEMO.stampText(lastSaved) : '저장됨')
      : '';
    card.classList[body ? 'add' : 'remove']('has-memo');
  }

  function schedule() {
    /* 입력이 멎고 0.5초 뒤에 저장한다. 글자마다 쓰면 localStorage 를 계속 두드린다 */
    state.textContent = '입력 중…';
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(flush, 500);
  }

  function open(yes) {
    head.setAttribute('aria-expanded', yes ? 'true' : 'false');
    if (yes) bodyBox.removeAttribute('hidden');
    else bodyBox.setAttribute('hidden', '');
    if (yes) ta.focus();
  }

  var card;

  function render() {
    var doc = document.getElementById('doc');
    if (!doc) return;

    var saved = MEMO.get(CH.id, sec.f);
    lastSaved = saved ? saved.u : 0;

    card = el('section', 'memo');
    if (saved && saved.t) card.classList.add('has-memo');
    card.setAttribute('aria-label', '이 섹션의 메모');

    head = el('button', 'memo__head');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'false');
    head.appendChild(el('span', 'memo__title', '✏️ 내 메모'));
    state = el('span', 'memo__state', summary(saved && saved.t, lastSaved));
    head.appendChild(state);
    head.appendChild(el('span', 'memo__caret', '▾'));
    card.appendChild(head);

    bodyBox = el('div', 'memo__body');
    bodyBox.setAttribute('hidden', '');

    ta = el('textarea', 'memo__ta');
    ta.value = saved ? saved.t : '';
    ta.rows = 6;
    ta.placeholder = '이 섹션을 보며 떠오른 것 — 헷갈린 곳, 나만의 암기법, 기출에서 본 표현…\n' +
                     '적은 내용은 「메모 모아보기」에서 한꺼번에 볼 수 있습니다.';
    ta.setAttribute('aria-label', sec.t + ' 메모');
    bodyBox.appendChild(ta);

    var foot = el('div', 'memo__foot');
    savedEl = el('span', 'memo__saved', lastSaved ? '저장됨 ' + MEMO.stampText(lastSaved) : '');
    var clearBtn = el('button', 'memo__clear', '메모 지우기');
    clearBtn.type = 'button';
    foot.appendChild(savedEl);
    foot.appendChild(clearBtn);
    bodyBox.appendChild(foot);

    card.appendChild(bodyBox);

    head.addEventListener('click', function () {
      open(head.getAttribute('aria-expanded') !== 'true');
    });

    ta.addEventListener('input', schedule);
    ta.addEventListener('blur', flush);

    clearBtn.addEventListener('click', function () {
      if (!ta.value) { open(false); return; }
      if (!confirm('이 섹션의 메모를 지웁니다.\n되돌릴 수 없습니다. 계속할까요?')) return;
      ta.value = '';
      flush();
      ta.focus();
    });

    /* 탭을 닫거나 다른 페이지로 갈 때 — 0.5초를 못 채운 마지막 입력을 잃지 않게 */
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') flush();
    });

    /* 퀴즈 카드 아래 · "학습 완료" 버튼 위.
       memo.js 가 quiz.js 보다 뒤에 실리므로 같은 자리에 넣으면 퀴즈 다음이 된다. */
    var done = doc.querySelector('.sectiondone');
    if (done) doc.insertBefore(card, done);
    else doc.appendChild(card);

    /* 이미 적어 둔 것이 있으면 펼쳐 둔다 — 있는 줄 모르고 지나치지 않도록 */
    if (saved && saved.t) open(true);
  }

  /* ⚠️ app.js 의 initSection 이 doc.innerHTML 을 통째로 갈아엎는다.
     app.js 가 이 파일보다 먼저 DOMContentLoaded 를 구독하므로
     같은 방식으로 구독하면 항상 app.js 다음에 실행된다. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
