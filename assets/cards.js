/* ==========================================================================
   EIP Study — 암기 카드

   설계는 EIPStudy-notes/TODO.md T17. 아래 세 가지는 확정된 결정이라 바꾸지 말 것.

   ① 뜻은 하나다 — 남긴다 / 흘려보낸다
        1단계 전체 카드 :  남긴다 = 저장        흘려보낸다 = 그냥 넘김
        2단계 저장함    :  남긴다 = 계속 보관   흘려보낸다 = 소거(다 외웠다)
      저장함을 넘기며 비워 나가는 것이 이 기능의 핵심이다.

   ② 축은 기기와 상관없이 좌우 하나다.
        좌 = 남긴다 · 우 = 흘려보낸다   (PC: 좌·우 끝 클릭 · ← → / 모바일: 좌우로 밀기)

      📌 한때 모바일만 세로였다. 좌우로 밀면 페이지 세로 스크롤과 부딪혔기 때문이다.
         **T26 에서 이 화면을 100dvh · overflow:hidden 으로 묶어 페이지가 아예
         스크롤되지 않게 되면서 그 제약이 사라졌다.** 축을 하나로 되돌린다.
         기기마다 방향이 다르면 PC 와 모바일을 오갈 때 손이 매번 헷갈린다.

      ⚠️ iOS 는 화면 **맨 왼쪽 가장자리**에서 시작하는 가로 스와이프를 「뒤로 가기」로
         가져간다. 카드에 좌우 여백이 있어 대개 그 구역 밖에서 시작하지만,
         가장자리를 정확히 짚으면 브라우저가 이긴다. 막을 방법이 없다.

   ③ 우클릭(contextmenu)은 입력으로 쓰지 않는다. 브라우저 메뉴가 뜨고,
      preventDefault 로 막으면 "붙여넣기가 안 되는 페이지"가 되어 사용자가 당황한다.
      마우스는 카드를 좌 · 가운데 · 우 세 구역으로 나눠 누른 위치로 구분한다.
      손가락은 구역을 나누지 않고 어디를 눌러도 뒤집기다 — 모바일에서 넘기는 방법은
      미는 것이라, 좁은 화면에서 구역까지 겨누게 하면 뒤집으려다 카드가 넘어간다.

   eip.card.saved = 저장한 카드 id 배열
   📌 eip.fav.all(★ 저장한 문제)과 다른 키다. 문항과 카드는 별개 축이다.

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  var CARDS = window.EIP_CARDS || [];
  var TOC = window.EIP_TOC || {};
  var S = (window.EIP && window.EIP.store) || null;

  var SWIPE_MIN = 55;      /* 이만큼 밀어야 넘김으로 친다 (px) */
  var ZONE = 0.34;         /* 카드 좌·우 끝 34% 가 넘김 구역, 가운데 32% 가 뒤집기 */
  var OUT_MS = 190;        /* 날아가는 동안 */

  /* 단계별로 "남긴다"·"흘려보낸다"가 무엇인지. 화면 문구와 동작이 한곳에서 나오도록 묶는다.
     📌 축이 기기마다 다르던 시절에는 라벨도 두 벌(pc/touch)이었다.
        이제 좌우 하나라 한 벌이다. */
  var STAGES = {
    1: {
      name: '전체 카드',
      left: { label: '← 저장', act: 'save' },
      right: { label: '넘김 →', act: 'skip' }
    },
    2: {
      name: '저장함',
      left: { label: '← 계속 보관', act: 'keep' },
      right: { label: '외웠다 →', act: 'drop' }
    }
  };

  var root, deckEl, cardEl, frontEl, backEl, metaEl, hintEl, tabsEl, ctlEl, doneEl;
  var stage = 1;
  var chFilter = '';
  var shuffled = false;
  var deck = [], pos = 0, flipped = false;
  var saved = {};
  var history = [];        /* 되돌리기 — {id, act, wasSaved} */
  var busy = false;        /* 날아가는 중에는 입력을 받지 않는다 */

  /* --------------------------------------------------------------- DOM */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }

  /* ------------------------------------------------------------- 저장소 */
  function loadSaved() {
    var arr = S ? S.get('card.saved', []) : [];
    if (Object.prototype.toString.call(arr) !== '[object Array]') arr = [];
    var m = {}, i;
    for (i = 0; i < arr.length; i++) m[arr[i]] = 1;
    return m;
  }
  function persist() {
    if (!S) return;
    var out = [], k;
    for (k in saved) { if (has(saved, k)) out.push(k); }
    S.set('card.saved', out);
  }
  function savedCount() {
    var n = 0, k;
    for (k in saved) { if (has(saved, k)) n++; }
    return n;
  }

  /* --------------------------------------------------------------- 덱 */
  /* 🚨 지금 단계에서 **실제로 카드가 있는 챕터만** 돌려준다.
     저장함(2단계)에서 담긴 것이 없는 챕터를 고를 수 있으면
     고르는 족족 빈 화면이 나온다. 고를 수 없게 하는 편이 맞다. */
  function chapters() {
    var seen = {}, out = [], i, k, c;
    for (i = 0; i < CARDS.length; i++) {
      c = CARDS[i];
      if (stage === 2 && !saved[c.id]) continue;
      seen[c.ch] = 1;
    }
    for (k in seen) { if (has(seen, k)) out.push(k); }
    out.sort();
    return out;
  }

  /* 단계를 바꾸면 고른 챕터가 그 단계에 없을 수 있다 (저장함에 그 챕터가 안 담겼다).
     그대로 두면 **선택창은 「전체 챕터」인데 목록은 비어 있는** 어긋난 상태가 된다. */
  function normalizeFilter() {
    if (!chFilter) return;
    var list = chapters(), i;
    for (i = 0; i < list.length; i++) { if (list[i] === chFilter) return; }
    chFilter = '';
  }

  function buildDeck() {
    normalizeFilter();
    var out = [], i, c;
    for (i = 0; i < CARDS.length; i++) {
      c = CARDS[i];
      if (chFilter && c.ch !== chFilter) continue;
      if (stage === 2 && !saved[c.id]) continue;
      out.push(c);
    }
    if (shuffled) shuffle(out);
    deck = out;
    pos = 0;
    flipped = false;
    history = [];
  }

  /* 피셔-예이츠. Math.random 을 쓰는 곳은 여기뿐이다. */
  function shuffle(a) {
    var i, j, t;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
  }

  function current() { return deck[pos] || null; }

  /* ------------------------------------------------------------- 동작 */
  /* side 는 뜻이자 방향이다 — 'left' 남긴다 · 'right' 흘려보낸다.
     민 방향으로 날아가야 방금 무엇을 했는지 손이 기억한다. */
  function act(side) {
    if (busy) return;
    var card = current();
    if (!card) return;

    var spec = STAGES[stage][side];
    history.push({ id: card.id, act: spec.act, wasSaved: !!saved[card.id] });
    if (history.length > 50) history.shift();

    if (spec.act === 'save') { saved[card.id] = 1; persist(); }
    if (spec.act === 'drop') { delete saved[card.id]; persist(); }

    busy = true;
    cardEl.classList.add(side === 'left' ? 'is-out-left' : 'is-out-right');
    setTimeout(function () {
      cardEl.classList.remove('is-out-left', 'is-out-right');
      busy = false;
      pos++;
      flipped = false;
      render();
    }, OUT_MS);
  }

  function undo() {
    if (busy || !history.length) return;
    var last = history.pop();
    if (last.wasSaved) saved[last.id] = 1; else delete saved[last.id];
    persist();
    if (pos > 0) pos--;
    flipped = false;
    render();
  }

  function flip() {
    if (busy || !current()) return;
    flipped = !flipped;
    render();
  }

  /* --------------------------------------------------------------- 렌더 */
  function render() {
    renderTabs();
    renderControls();
    renderCard();
  }

  function renderTabs() {
    tabsEl.innerHTML = '';
    [1, 2].forEach(function (k) {
      var b = el('button', 'ctab');
      b.type = 'button';
      b.appendChild(el('span', null, STAGES[k].name));
      if (k === 2) b.appendChild(el('span', 'ctab__n', String(savedCount())));
      b.setAttribute('aria-pressed', k === stage ? 'true' : 'false');
      b.addEventListener('click', function () {
        if (k === stage) return;
        stage = k;
        buildDeck();
        render();
      });
      tabsEl.appendChild(b);
    });
  }

  function renderControls() {
    ctlEl.innerHTML = '';

    var chSel = el('select', 'cctl__sel');
    chSel.title = '챕터 고르기';
    chSel.setAttribute('aria-label', '챕터 고르기');
    var all = el('option', null, '전체 챕터');
    all.value = '';
    chSel.appendChild(all);
    chapters().forEach(function (ch) {
      var op = el('option', null, (TOC[ch] && TOC[ch].t) || ch);
      op.value = ch;
      chSel.appendChild(op);
    });
    chSel.value = chFilter;
    chSel.addEventListener('change', function () {
      chFilter = chSel.value;
      buildDeck();
      render();
    });
    ctlEl.appendChild(chSel);

    /* 🔒 토글이 아니다. 두 번째로 누르면 원래 순서로 돌아가 「섞기」가 취소되는데,
       그건 여기서 아무도 원하지 않는 동작이다. **누를 때마다 다시 섞는다.** */
    var sh = el('button', 'cctl__btn', '🔀 섞기');
    sh.type = 'button';
    sh.title = '순서를 다시 섞는다';
    sh.addEventListener('click', function () {
      shuffled = true;
      buildDeck();
      render();
    });
    ctlEl.appendChild(sh);

    var un = el('button', 'cctl__btn', '↩ 되돌리기');
    un.type = 'button';
    un.disabled = !history.length;
    un.addEventListener('click', undo);
    ctlEl.appendChild(un);
  }

  function renderCard() {
    var card = current();

    /* ---- 다 넘긴 뒤 ---- */
    if (!card) {
      deckEl.hidden = true;
      doneEl.hidden = false;
      doneEl.innerHTML = '';

      if (!deck.length) {
        doneEl.appendChild(el('p', 'cdone__msg', stage === 2
          ? '저장함이 비어 있습니다. 「전체 카드」에서 왼쪽으로 넘겨 담아 두세요.'
          : '이 챕터에는 카드가 없습니다.'));
      } else {
        doneEl.appendChild(el('p', 'cdone__msg',
          deck.length + '장을 다 넘겼습니다.'));
        doneEl.appendChild(el('p', 'cdone__sub',
          '저장함에 ' + savedCount() + '장 담겨 있습니다.'));
      }

      /* 🚨 처음부터 넘길 카드가 없었으면 「처음부터 다시」는 아무 일도 안 한다.
         눌러도 같은 화면이 나와 고장으로 읽힌다. 다 넘긴 경우에만 보여 준다. */
      if (deck.length) {
        var again = el('button', 'cdone__btn', '처음부터 다시');
        again.type = 'button';
        again.addEventListener('click', function () { buildDeck(); render(); });
        doneEl.appendChild(again);
      }

      /* 챕터를 걸어 둔 상태면 **다 넘겼든 비었든** 여기서 풀 수 있게 한다.
         다 넘긴 뒤 다음 행동이 대개 「다른 챕터도 보기」다. */
      if (chFilter) {
        var all = el('button', 'cdone__btn', '전체 챕터로');
        all.type = 'button';
        all.addEventListener('click', function () {
          chFilter = '';
          buildDeck();
          render();
        });
        doneEl.appendChild(all);
      }

      if (stage === 1 && savedCount()) {
        var go = el('button', 'cdone__btn', '저장함으로 →');
        go.type = 'button';
        go.addEventListener('click', function () {
          stage = 2; buildDeck(); render();
        });
        doneEl.appendChild(go);
      }
      return;
    }

    deckEl.hidden = false;
    doneEl.hidden = true;

    /* 축이 좌우 하나가 되면서 라벨도 한 벌이 됐다.
       기기별로 갈리는 것은 「어떻게 조작하는가」뿐이라 그쪽(.ckeys)에만 남아 있다. */
    var spec = STAGES[stage];
    hintEl.innerHTML = '';
    ['left', 'right'].forEach(function (k) {
      hintEl.appendChild(el('span', 'chint__side', spec[k].label));
    });

    /* 어느 챕터 어느 섹션에서 온 카드인지. 그 섹션으로 바로 갈 수 있게 링크로 둔다 —
       카드만 봐서는 이해가 안 될 때 본문을 열어 보는 것이 유일한 다음 행동이다. */
    var chapter = TOC[card.ch];
    var sec = chapter && (chapter.s || [])[card.s];
    var where = card.ch.slice(2) +
      (chapter ? ' · ' + chapter.t.replace(/^\d+\.\s*/, '') : '') +
      (sec ? ' · ' + sec.t : '');

    metaEl.innerHTML = '';
    if (sec) {
      var link = el('a', 'cmeta__where', where);
      link.href = card.ch + '/' + sec.f;
      link.title = '이 카드가 나온 본문으로 이동';
      metaEl.appendChild(link);
    } else {
      metaEl.appendChild(el('span', 'cmeta__where', where));
    }
    if (saved[card.id]) metaEl.appendChild(el('span', 'cmeta__saved', '★ 저장됨'));
    metaEl.appendChild(el('span', 'cmeta__pos', (pos + 1) + ' / ' + deck.length));

    frontEl.innerHTML = card.f;
    backEl.innerHTML = card.b;
    cardEl.classList.toggle('is-flipped', flipped);
    cardEl.setAttribute('aria-label',
      '암기 카드 ' + (pos + 1) + '번. 가운데를 누르면 뒤집힙니다.');
  }

  /* ------------------------------------------------------- 입력 (셋 다) */
  function zoneOf(clientX) {
    var r = cardEl.getBoundingClientRect();
    var x = (clientX - r.left) / (r.width || 1);
    if (x < ZONE) return 'left';
    if (x > 1 - ZONE) return 'right';
    return 'mid';
  }

  function bindInput() {
    var startX = 0, startY = 0, dragging = false, swiped = false;
    var fromTouch = false;

    /* --- 누르기 ---
       마우스는 카드를 좌·가운데·우 세 구역으로 나눠 누른 위치로 구분한다.
       손가락은 구역을 나누지 않고 **어디를 눌러도 뒤집기**다 —
       모바일에서 넘기는 방법은 미는 것이고, 좁은 화면에서 구역까지 겨누게 하면
       뒤집으려다 카드가 넘어가 버린다. */
    cardEl.addEventListener('click', function (e) {
      if (swiped) { swiped = false; fromTouch = false; return; }   /* 스와이프 뒤 click 은 버린다 */
      if (fromTouch) { fromTouch = false; flip(); return; }
      var z = zoneOf(e.clientX);
      if (z === 'mid') flip(); else act(z);
    });

    /* --- 터치: 좌우로 밀기 ---
       카드 위 제스처는 통째로 우리가 받는다.
       한때 여기가 세로였다. 좌우로 밀면 페이지 세로 스크롤과 부딪혔기 때문인데,
       T26 에서 이 화면을 100dvh · overflow:hidden 으로 묶어 **페이지가 아예
       스크롤되지 않게 되면서** 그 이유가 사라졌다. 축을 좌우로 되돌렸다.

       🚨 CSS 의 touch-action: none 만 믿으면 안 된다. 실제로 바깥 스크롤이 따라왔다.
          .ccard__face 가 overflow-y: auto 라 스크롤 컨테이너가 되고, 브라우저마다
          어느 조상의 touch-action 을 볼지가 갈린다.
          touchmove 를 passive: false 로 열어 두고 직접 preventDefault 로 끊는다.
          passive 로 두면 막을 수단 자체가 없다.

       📌 이 화면은 어차피 페이지 전체가 스크롤되지 않는다 (cards.css 의 .page-cards). */
    function endDrag() {
      dragging = false;
      cardEl.classList.remove('is-dragging');
      cardEl.style.transform = '';
    }

    /* 링크에서 시작한 제스처는 건드리지 않는다 — 섹션으로 가려던 손이다 */
    function startsOnLink(node) {
      while (node && node !== deckEl) {
        if (node.tagName === 'A') return true;
        node = node.parentNode;
      }
      return false;
    }

    /* 🚨 카드 요소가 아니라 카드 블록(deckEl)에서 받는다.
       카드만 잡고 있으면 카드 둘레 여백이나 힌트 줄을 짚었을 때 밀기가 안 먹는다.
       눈에는 다 "카드 있는 자리"로 보이는데 손끝 몇 px 차이로 동작이 갈리면
       고장으로 읽힌다. */
    deckEl.addEventListener('touchstart', function (e) {
      if (busy || e.touches.length !== 1) return;
      if (startsOnLink(e.target)) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      dragging = true;
      swiped = false;
      fromTouch = true;
      cardEl.classList.add('is-dragging');
    }, { passive: true });

    deckEl.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      if (e.cancelable) e.preventDefault();   /* 바깥 스크롤을 끊는다 */
      var dx = e.touches[0].clientX - startX;
      cardEl.style.transform = 'translateX(' + dx + 'px)';
    }, { passive: false });

    deckEl.addEventListener('touchend', function (e) {
      if (!dragging) return;
      endDrag();
      var t = e.changedTouches[0] || {};
      var dx = t.clientX - startX;
      var dy = t.clientY - startY;
      /* 세로로 더 많이 갔으면 넘기려던 것이 아니다 — 제자리로 돌아간다 */
      if (Math.abs(dx) >= SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
        swiped = true;
        act(dx < 0 ? 'left' : 'right');   /* 왼쪽 = 남긴다 · 오른쪽 = 흘려보낸다 */
      }
    });

    deckEl.addEventListener('touchcancel', function () {
      if (dragging) endDrag();
    });

    /* --- 키보드 --- */
    document.addEventListener('keydown', function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); act('left'); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); act('right'); }
      else if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); flip(); }
      else if (e.key === 'Backspace') { e.preventDefault(); undo(); }
    });
  }

  /* ---------------------------------------------------------------- 시작 */
  function start() {
    root = document.getElementById('cards');
    if (!root) return;

    if (!CARDS.length) {
      root.appendChild(el('p', 'cempty',
        '카드 자료를 불러오지 못했습니다. bash build.sh 를 실행해 주세요.'));
      return;
    }

    saved = loadSaved();

    tabsEl = el('div', 'ctabs');
    root.appendChild(tabsEl);

    ctlEl = el('div', 'cctl');
    root.appendChild(ctlEl);

    deckEl = el('div', 'cdeck');

    metaEl = el('div', 'cmeta');
    deckEl.appendChild(metaEl);

    hintEl = el('div', 'chint');
    deckEl.appendChild(hintEl);

    cardEl = el('div', 'ccard');
    cardEl.setAttribute('role', 'button');
    cardEl.setAttribute('tabindex', '0');

    var inner = el('div', 'ccard__inner');

    /* 🚨 글은 반드시 .ccard__text 안에 넣는다. 면(.ccard__face)은 flex 컨테이너라
       거기에 innerHTML 을 바로 넣으면 <b> 하나하나가 개별 flex 항목이 되어
       조각마다 세로 칸처럼 쪼개진다. 자식 하나만 두어 가운데 정렬만 맡긴다. */
    var frontFace = el('div', 'ccard__face ccard__face--front');
    var backFace = el('div', 'ccard__face ccard__face--back');
    frontEl = el('div', 'ccard__text');
    backEl = el('div', 'ccard__text');
    frontFace.appendChild(frontEl);
    backFace.appendChild(backEl);
    inner.appendChild(frontFace);
    inner.appendChild(backFace);
    cardEl.appendChild(inner);
    deckEl.appendChild(cardEl);

    /* 뒤집기 안내를 카드 위 힌트 줄에서 뺐으므로 여기서만 알려 준다.
       쓰지 않는 조작을 읽게 하지 않는다 — 기기에 맞는 줄만 보인다. */
    var keys = el('p', 'ckeys');
    keys.appendChild(el('span', 'only-pc',
      '가운데를 눌러 뒤집기 · 좌우 끝을 눌러 넘기기' +
      '   ·   Space 뒤집기 · ← → 넘기기 · Backspace 되돌리기'));
    keys.appendChild(el('span', 'only-touch',
      '눌러서 뒤집기 · 좌우로 밀어 넘기기'));
    deckEl.appendChild(keys);

    root.appendChild(deckEl);

    doneEl = el('div', 'cdone');
    doneEl.hidden = true;
    root.appendChild(doneEl);

    bindInput();
    buildDeck();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
