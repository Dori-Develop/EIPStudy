/* ==========================================================================
   abbr.js — 본문 약어에 풀네임·한글명 툴팁 (T21)

   `assets/glossary-data.js` 하나로 전 챕터에 자동 적용된다. 본문은 손대지 않는다.

   🚨 **모바일에는 hover 가 없다.** 그래서 hover 만으로 만들지 않았다 —
      탭하면 열리고 바깥을 탭하면 닫힌다. PC 는 대기만 해도 뜬다.
      이 때문에 사전 **페이지**(T18)를 먼저 만든 것이기도 하다.

   ⚠️ **`marked` 가 본문을 그린 뒤에 불러야 한다.** app.js 의 후처리 단계에서
      `EIP_ABBR.decorate(doc)` 를 부른다 — 그리기 전에 손대면 마크다운이 깨진다.

   🚨 **다이어그램 정의를 건드리면 안 된다.** `extractDiagrams()` 가 만든 `.mermaid`
      안에는 아직 안 그려진 **정의 문자열**이 들어 있다. 거기에 태그를 끼우면
      mermaid 가 문법 오류를 낸다. 그래서 건너뛸 곳을 명시해 둔다.

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  /* 🔒 여기 안쪽 글자는 건드리지 않는다.
     - `pre`·`code` : 코드와 SQL. 약어처럼 보이는 예약어가 널려 있다
     - `.diagram`·`.mermaid` : 아직 안 그려진 다이어그램 정의
     - `a`·`abbr` : 이미 링크·툴팁인 자리. 겹치면 클릭이 싸운다
     - `.quiz__*` : 문항은 qcard 가 그린다. 본문 후처리가 넘어갈 자리가 아니다 */
  var SKIP = { PRE: 1, CODE: 1, A: 1, ABBR: 1, SCRIPT: 1, STYLE: 1, TEXTAREA: 1, BUTTON: 1 };
  var SKIP_CLASS = ['diagram', 'mermaid', 'quiz', 'memo', 'formula'];

  /* 한 섹션에서 같은 약어에 툴팁을 몇 번까지 달 것인가.
     🔑 **처음 몇 번이면 충분하다.** 본문에 DFD 가 40번 나오는데 전부 밑줄이 그어지면
        읽는 흐름이 끊긴다 — 뜻을 모를 때 보는 것이지 매번 보는 것이 아니다. */
  var PER_ABBR = 3;

  var map = null, re = null, box = null, openFor = null;

  function build() {
    var G = window.EIP_GLOSSARY;
    if (!G || !G.length) return false;

    map = {};
    var keys = [], i, g;
    for (i = 0; i < G.length; i++) {
      g = G[i];
      if (!g || !g.a) continue;
      /* 풀네임도 한글명도 없으면 보여 줄 것이 없다 */
      if (!g.f && !g.k) continue;
      /* 🚨 한 글자·두 글자 약어는 본문 어디에나 걸린다 (IP 는 괜찮지만 위험이 크다).
         세 글자부터만 단다 — 짧은 것은 사전 페이지에서 찾는 편이 낫다. */
      if (g.a.length < 3) continue;
      map[g.a] = g;
      keys.push(g.a);
    }
    if (!keys.length) return false;

    /* 긴 것부터 — RARP 가 ARP 보다 먼저 걸려야 한다 */
    keys.sort(function (a, b) { return b.length - a.length; });

    var esc = [];
    for (i = 0; i < keys.length; i++) {
      esc.push(keys[i].replace(/[.*+?^${}()|[\]\\\/-]/g, '\\$&'));
    }
    /* 낱말 경계는 `\b` 로 잡지 않는다 — `\b` 는 한글을 낱말 문자로 안 봐서
       「DFD를」의 D 와 를 사이에도 경계가 생긴다. 앞뒤가 영숫자만 아니면 된다. */
    re = new RegExp('(^|[^A-Za-z0-9])(' + esc.join('|') + ')(?![A-Za-z0-9])', 'g');
    return true;
  }

  function skipped(node) {
    var n = node, cls, i;
    while (n && n.nodeType === 1) {
      if (SKIP[n.tagName]) return true;
      cls = ' ' + (n.className || '') + ' ';
      if (typeof cls === 'string') {
        for (i = 0; i < SKIP_CLASS.length; i++) {
          if (cls.indexOf(' ' + SKIP_CLASS[i]) >= 0) return true;
        }
      }
      n = n.parentNode;
    }
    return false;
  }

  function decorate(root) {
    if (!root) return;
    if (map === null && !build()) return;

    var used = {};                     /* 약어별로 몇 번 달았나 */
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var texts = [], node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.length > 2 && !skipped(node.parentNode)) texts.push(node);
    }

    var i;
    for (i = 0; i < texts.length; i++) mark(texts[i], used);
  }

  function mark(node, used) {
    var text = node.nodeValue;
    re.lastIndex = 0;
    if (!re.test(text)) return;
    re.lastIndex = 0;

    var frag = document.createDocumentFragment();
    var last = 0, m, any = false;

    while ((m = re.exec(text)) !== null) {
      var a = m[2];
      if ((used[a] || 0) >= PER_ABBR) continue;
      used[a] = (used[a] || 0) + 1;
      any = true;

      var at = m.index + m[1].length;
      if (at > last) frag.appendChild(document.createTextNode(text.slice(last, at)));

      var el = document.createElement('abbr');
      el.className = 'gl';
      el.textContent = a;
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', a + ' 뜻 보기');
      el.setAttribute('data-a', a);
      frag.appendChild(el);
      last = at + a.length;
    }
    if (!any) return;
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  }

  /* ---------------------------------------------------------------- 툴팁 */
  function tip() {
    if (box) return box;
    box = document.createElement('div');
    box.className = 'gltip';
    box.setAttribute('role', 'tooltip');
    document.body.appendChild(box);
    return box;
  }

  function close() {
    if (box) box.classList.remove('is-open');
    openFor = null;
  }

  function open(el) {
    var g = map && map[el.getAttribute('data-a')];
    if (!g) return;

    var b = tip();
    /* 📌 여기는 별명을 안 붙인다 — 이 파일은 `open(el)` 처럼 **`el` 을 인자 이름으로**
       쓰고 있어 별명을 두면 가려진다. 한 곳뿐이라 그대로 부른다. */
    window.EIP_UTIL.clear(b);

    var h = document.createElement('strong');
    h.className = 'gltip__a';
    h.textContent = g.a;
    b.appendChild(h);

    if (g.k) {
      var k = document.createElement('span');
      k.className = 'gltip__k';
      k.textContent = g.k;
      b.appendChild(k);
    }
    if (g.f) {
      var f = document.createElement('span');
      f.className = 'gltip__f';
      f.textContent = g.f;
      b.appendChild(f);
    }

    /* 사전에서 더 보기 — 나오는 곳 목록이 거기 있다 */
    var base = (window.EIP_CHAPTER && window.EIP_CHAPTER.base) || '';
    var more = document.createElement('a');
    more.className = 'gltip__more';
    more.href = base + 'glossary.html?q=' + encodeURIComponent(g.a);
    more.textContent = '약어 사전에서 보기 →';
    b.appendChild(more);

    b.classList.add('is-open');
    place(b, el);
    openFor = el;
  }

  /* 화면 밖으로 넘치지 않게 놓는다. 위가 좁으면 아래로 내린다. */
  function place(b, el) {
    var r = el.getBoundingClientRect();
    b.style.left = '0px';
    b.style.top = '0px';
    var w = b.offsetWidth, h = b.offsetHeight;
    var pad = 8;

    var left = r.left + r.width / 2 - w / 2;
    if (left < pad) left = pad;
    if (left + w > window.innerWidth - pad) left = window.innerWidth - pad - w;

    var top = r.top - h - 8;
    if (top < pad) top = r.bottom + 8;

    b.style.left = Math.round(left + window.pageXOffset) + 'px';
    b.style.top = Math.round(top + window.pageYOffset) + 'px';
  }

  function target(e) {
    var n = e.target;
    while (n && n !== document.body) {
      if (n.nodeType === 1 && n.tagName === 'ABBR' && n.className === 'gl') return n;
      n = n.parentNode;
    }
    return null;
  }

  /* 🚨 클릭 한 벌로 열고 닫는다. PC 의 hover 는 CSS 가 아니라 여기서 같이 다뤄야
     **탭으로 연 것과 싸우지 않는다** (마우스가 스쳐 지나가며 닫아 버리는 일). */
  document.addEventListener('click', function (e) {
    var el = target(e);
    if (!el) { close(); return; }
    e.preventDefault();
    if (openFor === el) close(); else open(el);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) close();
    if ((e.key === 'Enter' || e.keyCode === 13) && document.activeElement) {
      var el = document.activeElement;
      if (el.tagName === 'ABBR' && el.className === 'gl') {
        e.preventDefault();
        if (openFor === el) close(); else open(el);
      }
    }
  });

  window.addEventListener('scroll', function () { if (openFor) close(); }, { passive: true });
  window.addEventListener('resize', function () { if (openFor) close(); });

  window.EIP_ABBR = { decorate: decorate };
})();
