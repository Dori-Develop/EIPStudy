/* ==========================================================================
   EIP Study — 개념 겹쳐 보기 (공용)

   문항·카드에서 "이게 어느 개념이지?" 를 **페이지를 떠나지 않고** 확인한다.

   🚨 페이지를 옮기면 안 되는 이유
      · 시험 중이면 **답안이 통째로 날아간다**
      · 오답노트·암기 카드에서도 스크롤 위치와 고른 필터를 잃는다
      · 돌아올 길은 브라우저 뒤로가기뿐인데, bfcache 가 없으면 처음 화면이 뜬다

   🔒 한 벌만 존재해야 한다. quiz.js·exam.js·wrong.js·cards.js 가 모두 이것을 쓴다.
      (qcard.js·wrongstore.js·merge.js·memo.js 와 같은 이유)

   본문은 **이미 있는 것을 쓴다** — assets/search-chNN.js 에 섹션 원문이 통째로 있다.
   fetch 는 file:// 에서 막히므로 <script src> 로 싣는다.

   쓰는 법
     EIP_CONCEPT.open('ch01', 's05.html');           // 겹쳐 연다
     var a = EIP_CONCEPT.link('ch01', 's05.html', '1. 소프트웨어 생명 주기', 'wcard__loc');

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  /* 🚨 build.sh 의 MARKED_CDN 과 같은 값이어야 한다.
     한쪽만 올리면 페이지마다 다른 marked 가 돌아 렌더가 갈린다.
     섹션 페이지에는 이미 실려 있어 여기서는 받지 않는다. */
  var MARKED_CDN = 'https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js';

  var TOC = function () { return window.EIP_TOC || {}; };

  /* 이 페이지가 섹션 페이지면 assets 가 한 단계 위에 있다 */
  function base() {
    var CH = window.EIP_CHAPTER;
    return (CH && CH.base) || '';
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function sectionOf(ch, file) {
    var c = TOC()[ch];
    if (!c || !c.s) return null;
    var i;
    for (i = 0; i < c.s.length; i++) { if (c.s[i].f === file) return c.s[i]; }
    return null;
  }

  function href(ch, file) { return base() + ch + '/' + file; }

  /* ------------------------------------------------------------- 자료 로드 */
  function loadScript(src, done) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = function () { done(true); };
    s.onerror = function () { done(false); };
    document.head.appendChild(s);
  }

  function corpus(ch) { return window['EIP_SEARCH_' + ch]; }

  function needCorpus(ch, done) {
    if (corpus(ch)) { done(true); return; }
    loadScript(base() + 'assets/search-' + ch + '.js', function (ok) { done(ok && !!corpus(ch)); });
  }

  function needMarked(done) {
    if (window.marked) { done(true); return; }
    loadScript(MARKED_CDN, function (ok) { done(ok && !!window.marked); });
  }

  function bodyOf(ch, file) {
    var list = corpus(ch) || [], i;
    for (i = 0; i < list.length; i++) { if (list[i].f === file) return list[i].x || ''; }
    return '';
  }

  /* ------------------------------------------------------------------ 렌더 */
  /* mermaid 는 2.5MB 다. 개념 하나 보려고 받게 할 수 없다.
     다이어그램 자리는 「섹션에서 보기」 안내로 바꾼다. */
  function stripDiagrams(md) {
    return md.replace(/```mermaid[\s\S]*?```/g,
      '\n> 📊 여기에 다이어그램이 있습니다. **아래 「섹션 전체 보기」** 에서 볼 수 있습니다.\n');
  }

  function render(md) {
    if (!window.marked) return null;
    var text = stripDiagrams(String(md || ''));
    try {
      return window.marked.parse ? window.marked.parse(text) : window.marked(text);
    } catch (e) { return null; }
  }

  /* ------------------------------------------------------------------ 화면 */
  var scrim = null, box = null, lastFocus = null, prevOverflow = '';

  function close() {
    if (!box) return;
    if (scrim && scrim.parentNode) scrim.parentNode.removeChild(scrim);
    if (box.parentNode) box.parentNode.removeChild(box);
    scrim = null; box = null;

    document.documentElement.style.overflow = prevOverflow;
    document.removeEventListener('keydown', onKey);

    /* 열기 전에 있던 자리로 초점을 돌려준다 — 키보드로 열었으면 그 버튼으로 */
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
    lastFocus = null;
  }

  function onKey(e) {
    if (e.key === 'Escape' || e.keyCode === 27) { e.preventDefault(); close(); }
  }

  function open(ch, file) {
    close();
    lastFocus = document.activeElement;

    var sec = sectionOf(ch, file);
    var chapter = TOC()[ch];

    scrim = el('div', 'scrim is-open');
    scrim.addEventListener('click', close);
    document.body.appendChild(scrim);

    box = el('section', 'concept');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', (sec && sec.t) || '개념 보기');

    var head = el('div', 'concept__head');
    var titles = el('div', 'concept__titles');
    titles.appendChild(el('strong', 'concept__sec',
      sec ? ((sec.n && sec.n !== '·' ? sec.n + '. ' : '') + sec.t) : file));
    titles.appendChild(el('span', 'concept__ch', (chapter && chapter.t) || ch));
    head.appendChild(titles);

    var closeBtn = el('button', 'concept__close', '✕');
    closeBtn.type = 'button';
    closeBtn.title = '닫기 (Esc)';
    closeBtn.setAttribute('aria-label', '닫기');
    closeBtn.addEventListener('click', close);
    head.appendChild(closeBtn);
    box.appendChild(head);

    var body = el('div', 'concept__body');
    body.appendChild(el('p', 'concept__loading', '본문을 불러오는 중…'));
    box.appendChild(body);

    var foot = el('div', 'concept__foot');
    var go = el('a', 'concept__go', '섹션 전체 보기 →');
    go.href = href(ch, file);
    foot.appendChild(go);
    box.appendChild(foot);

    /* 🚨 뒤 화면이 같이 스크롤되지 않게 잠근다. 닫을 때 원래대로 돌린다 */
    prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    document.addEventListener('keydown', onKey);
    document.body.appendChild(box);
    closeBtn.focus();

    needCorpus(ch, function (ok) {
      if (!box) return;                       /* 그 사이 닫혔다 */
      if (!ok) { fail(body, ch, file); return; }
      needMarked(function (ok2) {
        if (!box) return;
        var md = bodyOf(ch, file);
        var out = ok2 ? render(md) : null;
        body.innerHTML = '';
        if (out) {
          var art = el('article', 'doc concept__doc');
          art.innerHTML = out;
          body.appendChild(art);
        } else if (md) {
          /* marked 가 없으면 원문이라도 보여 준다 — 아무것도 안 보이는 것보다 낫다 */
          var pre = el('pre', 'concept__raw');
          pre.textContent = md;
          body.appendChild(pre);
        } else {
          fail(body, ch, file);
        }
        body.scrollTop = 0;
      });
    });
  }

  function fail(body, ch, file) {
    body.innerHTML = '';
    body.appendChild(el('p', 'concept__loading',
      '본문을 불러오지 못했습니다. 아래 「섹션 전체 보기」로 열어 주세요.'));
  }

  /* --------------------------------------------------------------- 만들기 */
  /* 🔒 <a href> 로 만든다. 가운데 클릭·새 탭으로 열기가 그대로 되고,
     이 스크립트가 실패해도 **평범한 링크로 동작한다.** */
  function link(ch, file, text, cls) {
    var a = el('a', cls || 'concept__link', text);
    a.href = href(ch, file);
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;  /* 새 탭은 그대로 */
      if (!sectionOf(ch, file)) return;                                     /* 모르는 섹션이면 링크대로 */
      e.preventDefault();
      open(ch, file);
    });
    return a;
  }

  window.EIP_CONCEPT = {
    open: open,
    link: link,
    close: close,
    has: function (ch, file) { return !!sectionOf(ch, file); }
  };
})();
