/* ==========================================================================
   EIP Study — 메모 모아보기 (notes.html)

   섹션마다 적어 둔 메모(eip.memo.chNN)를 챕터 순으로 한곳에 모은다.
   저장 형식과 읽고 쓰는 규칙은 memo.js(window.EIP_MEMO)에만 있다 — 여기서 다시 만들지 말 것.

   📌 섹션 제목은 assets/toc.js(window.EIP_TOC)에서 가져온다.
      메모에 제목을 함께 저장하는 방식은 버렸다 — 본문 제목을 고치면 낡은 제목이 남는다.

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  var M = window.EIP_MEMO;
  var TOC = window.EIP_TOC || {};

  var root, ctlEl, listEl, statEl;
  var keyword = '';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function has(obj, k) { return Object.prototype.hasOwnProperty.call(obj, k); }

  /* ------------------------------------------------------------ 자료 모으기 */
  /* [{ ch, title, items: [{ file, n, t, memo }] }] — 챕터 순 · 섹션 순 */
  function collect() {
    var out = [], ids = [], k;

    for (k in TOC) { if (has(TOC, k)) ids.push(k); }
    ids.sort();

    /* toc.js 가 모르는 챕터에 메모가 남아 있을 수도 있다 (챕터를 지운 뒤 등).
       버리지 않고 뒤에 붙인다 — 사용자가 쓴 글은 함부로 감추지 않는다. */
    M.chapters().forEach(function (ch) {
      if (ids.indexOf(ch) < 0) ids.push(ch);
    });

    ids.forEach(function (ch) {
      var memos = M.chapter(ch);
      var toc = TOC[ch];
      var order = (toc && toc.s) ? toc.s : [];
      var items = [], seen = {};

      order.forEach(function (s) {
        if (!has(memos, s.f)) return;
        seen[s.f] = 1;
        items.push({ file: s.f, n: s.n, t: s.t, memo: memos[s.f] });
      });

      /* 목차에 없는 파일명 — 같은 이유로 버리지 않는다 */
      var f;
      for (f in memos) {
        if (has(memos, f) && !seen[f]) {
          items.push({ file: f, n: '·', t: f.replace(/\.html$/, ''), memo: memos[f] });
        }
      }

      if (items.length) {
        out.push({ ch: ch, title: (toc && toc.t) || ch, items: items });
      }
    });

    return out;
  }

  function matches(group, item) {
    if (!keyword) return true;
    var hay = (group.title + ' ' + item.t + ' ' + item.memo.t).toLowerCase();
    return hay.indexOf(keyword) >= 0;
  }

  function filtered() {
    var out = [];
    collect().forEach(function (g) {
      var items = g.items.filter(function (it) { return matches(g, it); });
      if (items.length) out.push({ ch: g.ch, title: g.title, items: items });
    });
    return out;
  }

  function countOf(groups) {
    var n = 0;
    groups.forEach(function (g) { n += g.items.length; });
    return n;
  }

  /* ------------------------------------------------------------ 마크다운 변환 */
  function markdown(groups) {
    var lines = ['# 내 메모 — EIP Study', ''];
    groups.forEach(function (g) {
      lines.push('## ' + g.title, '');
      g.items.forEach(function (it) {
        lines.push('### ' + (it.n === '·' ? '' : it.n + '. ') + it.t);
        var when = M.stampText(it.memo.u);
        if (when) lines.push('', '*' + when + '*');
        lines.push('', it.memo.t, '');
      });
    });
    return lines.join('\n');
  }

  /* 클립보드는 file:// 나 낡은 브라우저에서 없을 수 있다.
     ⚠️ .catch(fn) 은 ES3 검사에 걸린다 — .then(ok, fail) 로 쓴다. */
  function copy(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { done(true); },
        function () { done(fallbackCopy(text)); }
      );
      return;
    }
    done(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  /* ---------------------------------------------------------------- 렌더링 */
  function renderControls() {
    ctlEl.innerHTML = '';

    var search = el('input', 'nctl__search');
    search.type = 'search';
    search.placeholder = '메모·섹션 제목 검색…';
    search.value = keyword;
    search.setAttribute('aria-label', '메모 검색');
    search.addEventListener('input', function () {
      keyword = search.value.toLowerCase().replace(/^\s+|\s+$/g, '');
      renderList();
    });
    ctlEl.appendChild(search);

    var copyBtn = el('button', 'nctl__copy', '전체 마크다운 복사');
    copyBtn.type = 'button';
    copyBtn.addEventListener('click', function () {
      var groups = filtered();
      if (!groups.length) return;
      copy(markdown(groups), function (ok) {
        copyBtn.textContent = ok ? '복사했습니다' : '복사하지 못했습니다';
        setTimeout(function () { copyBtn.textContent = '전체 마크다운 복사'; }, 1800);
      });
    });
    ctlEl.appendChild(copyBtn);

    statEl = el('span', 'nctl__stat');
    ctlEl.appendChild(statEl);
  }

  function renderList() {
    var groups = filtered();
    listEl.innerHTML = '';

    var all = countOf(collect());
    var shown = countOf(groups);
    statEl.textContent = keyword
      ? shown + ' / ' + all + '개'
      : (all ? all + '개 섹션에 메모가 있습니다' : '');

    if (!groups.length) {
      listEl.appendChild(el('p', 'wempty', keyword
        ? '검색어와 맞는 메모가 없습니다.'
        : '아직 메모가 없습니다. 섹션 페이지 아래쪽 「✏️ 내 메모」에 적어 보세요.'));
      return;
    }

    groups.forEach(function (g) {
      var sec = el('section', 'ngroup');
      sec.appendChild(el('h2', 'ngroup__title', g.title));

      g.items.forEach(function (it) {
        var card = el('article', 'ncard');

        var a = el('a', 'ncard__loc');
        a.href = g.ch + '/' + it.file;
        a.textContent = (it.n === '·' ? '' : it.n + '. ') + it.t;
        card.appendChild(a);

        var when = M.stampText(it.memo.u);
        if (when) card.appendChild(el('span', 'ncard__at', when));

        card.appendChild(el('p', 'ncard__body', it.memo.t));
        sec.appendChild(card);
      });

      listEl.appendChild(sec);
    });
  }

  function render() {
    root = document.getElementById('notes');
    if (!root || !M) return;

    root.innerHTML = '';
    ctlEl = el('div', 'nctl');
    listEl = el('div', 'nlist');
    root.appendChild(ctlEl);
    root.appendChild(listEl);

    renderControls();
    renderList();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
