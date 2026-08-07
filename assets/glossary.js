/* ==========================================================================
   EIP Study — 약어 사전

   assets/glossary-data.js (build.sh 생성) 를 읽어 화면을 그린다.
   섹션 제목은 담겨 있지 않다 — assets/toc.js 에서 [챕터, 섹션 순번]으로 찾는다.

   학습 도구가 아니라 참조 도구다. 풀고 채점하는 것이 없으므로
   localStorage 를 전혀 쓰지 않는다 → T8 동기화 대상이 늘지 않는다.

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  var DATA = window.EIP_GLOSSARY || [];
  var TOC = window.EIP_TOC || {};

  var root, inputEl, countEl, lettersEl, listEl, emptyEl;
  var query = '';
  var letter = '';     /* '' 이면 전체 */

  /* --------------------------------------------------------------- DOM */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function escapeRe(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  function debounce(fn, ms) {
    var t;
    return function () {
      var args = arguments, self = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(self, args); }, ms);
    };
  }

  /* 검색어와 겹치는 부분만 굵게. 없으면 그냥 이스케이프한 문자열 */
  function mark(text, q) {
    var safe = escapeHtml(text);
    if (!q) return safe;
    return safe.replace(new RegExp('(' + escapeRe(escapeHtml(q)) + ')', 'ig'), '<b>$1</b>');
  }

  /* ------------------------------------------------------------ 나오는 곳 */
  /* s 항목은 ["ch01", 3] — toc.js 의 sections 배열 순번이다 */
  function sectionOf(ref) {
    var chapter = TOC[ref[0]];
    if (!chapter) return null;
    var sec = (chapter.s || [])[ref[1]];
    if (!sec) return null;
    return {
      href: ref[0] + '/' + sec.f,
      /* "ch01" 에서 번호만 — 챕터 제목을 통째로 넣으면 칩이 너무 길어진다 */
      label: ref[0].slice(2) + ' · ' + sec.t,
      title: chapter.t + '  ·  ' + sec.t
    };
  }

  /* ---------------------------------------------------------- 목록 계산 */
  function initial(a) {
    var c = a.charAt(0).toUpperCase();
    return c >= 'A' && c <= 'Z' ? c : '#';
  }

  function matches(item, q) {
    if (!q) return true;
    return (item.a + ' ' + item.f + ' ' + item.k).toLowerCase().indexOf(q) >= 0;
  }

  function visible() {
    var q = query.toLowerCase();
    var out = [], i;
    for (i = 0; i < DATA.length; i++) {
      if (letter && initial(DATA[i].a) !== letter) continue;
      if (!matches(DATA[i], q)) continue;
      out.push(DATA[i]);
    }
    return out;
  }

  /* 검색어에 걸리는 항목이 있는 글자만 활성으로 둔다 */
  function lettersWithHits() {
    var q = query.toLowerCase();
    var seen = {}, i;
    for (i = 0; i < DATA.length; i++) {
      if (matches(DATA[i], q)) seen[initial(DATA[i].a)] = 1;
    }
    return seen;
  }

  /* --------------------------------------------------------------- 렌더 */
  function renderLetters() {
    var hits = lettersWithHits();
    var all = [], c;
    for (c = 65; c <= 90; c++) all.push(String.fromCharCode(c));
    if (hits['#']) all.push('#');

    lettersEl.innerHTML = '';

    var allBtn = el('button', 'gletter', '전체');
    allBtn.type = 'button';
    allBtn.setAttribute('aria-pressed', letter === '' ? 'true' : 'false');
    allBtn.addEventListener('click', function () { setLetter(''); });
    lettersEl.appendChild(allBtn);

    all.forEach(function (c2) {
      var b = el('button', 'gletter', c2);
      b.type = 'button';
      b.disabled = !hits[c2];
      b.setAttribute('aria-pressed', letter === c2 ? 'true' : 'false');
      b.addEventListener('click', function () { setLetter(letter === c2 ? '' : c2); });
      lettersEl.appendChild(b);
    });
  }

  function setLetter(c) {
    letter = c;
    renderLetters();
    renderList();
  }

  function renderList() {
    var items = visible();
    var q = query.toLowerCase();

    countEl.textContent = items.length + ' / ' + DATA.length + '개';
    listEl.innerHTML = '';

    if (!items.length) {
      emptyEl.hidden = false;
      emptyEl.textContent = query
        ? '"' + query + '" 에 해당하는 약어가 없습니다.'
        : '표시할 약어가 없습니다.';
      return;
    }
    emptyEl.hidden = true;

    var group = null, groupKey = '';

    items.forEach(function (item) {
      var key = initial(item.a);
      if (key !== groupKey) {
        groupKey = key;
        listEl.appendChild(el('h2', 'ggroup', key === '#' ? '기타' : key));
        group = el('div', 'gitems');
        listEl.appendChild(group);
      }
      group.appendChild(buildRow(item, q));
    });
  }

  function buildRow(item, q) {
    var row = el('article', 'gitem');

    var abbr = el('h3', 'gitem__abbr');
    abbr.innerHTML = mark(item.a, q);
    row.appendChild(abbr);

    if (item.f) {
      var full = el('p', 'gitem__full');
      full.innerHTML = mark(item.f, q);
      row.appendChild(full);
    }
    if (item.k) {
      var kor = el('p', 'gitem__kor');
      kor.innerHTML = mark(item.k, q);
      row.appendChild(kor);
    }

    var refs = el('div', 'gitem__refs');

    /* 정의 지점이 앞에 오도록 담겨 있어 순서가 뒤섞여 있다. 챕터·섹션 차례로 되돌린다 */
    var list = (item.s || []).slice().sort(function (x, y) {
      return x[0] === y[0] ? x[1] - y[1] : (x[0] < y[0] ? -1 : 1);
    });

    list.forEach(function (ref) {
      var sec = sectionOf(ref);
      if (!sec) return;
      var a = el('a', 'gref', sec.label);
      a.href = sec.href;
      a.title = sec.title;
      refs.appendChild(a);
    });

    /* 목록은 8곳까지만 담는다 — 나머지가 있으면 몇 곳인지라도 알려 준다 */
    var more = (item.n || list.length) - list.length;
    if (more > 0) refs.appendChild(el('span', 'gref gref--more', '외 ' + more + '곳'));

    if (refs.childNodes.length) row.appendChild(refs);

    return row;
  }

  /* ---------------------------------------------------------------- 시작 */
  function start() {
    root = document.getElementById('glossary');
    if (!root) return;

    if (!DATA.length) {
      root.appendChild(el('p', 'gempty',
        '약어 자료를 불러오지 못했습니다. bash build.sh 를 실행해 주세요.'));
      return;
    }

    var bar = el('div', 'gbar');

    inputEl = document.createElement('input');
    inputEl.type = 'search';
    inputEl.className = 'gsearch';
    inputEl.placeholder = '약어 · 풀네임 · 한글명 검색…  (예: DFD, Cost, 접근통제)';
    inputEl.setAttribute('autocomplete', 'off');
    inputEl.setAttribute('spellcheck', 'false');
    inputEl.setAttribute('aria-label', '약어 검색');
    bar.appendChild(inputEl);

    countEl = el('span', 'gcount');
    bar.appendChild(countEl);
    root.appendChild(bar);

    lettersEl = el('div', 'gletters');
    root.appendChild(lettersEl);

    emptyEl = el('p', 'gempty');
    emptyEl.hidden = true;
    root.appendChild(emptyEl);

    listEl = el('div', 'glist');
    root.appendChild(listEl);

    inputEl.addEventListener('input', debounce(function () {
      query = inputEl.value.trim();
      /* 검색어를 바꾸면 글자 필터는 푼다 — 둘이 겹치면 결과가 없는 이유를 알기 어렵다 */
      letter = '';
      renderLetters();
      renderList();
    }, 120));

    /* / 로 검색창에, Esc 로 비우기 */
    document.addEventListener('keydown', function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        inputEl.focus();
        return;
      }
      if (e.key === 'Escape' && document.activeElement === inputEl) {
        inputEl.value = '';
        query = '';
        renderLetters();
        renderList();
      }
    });

    renderLetters();
    renderList();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
