/* ==========================================================================
   EIP Study — 메모 모아보기 (notes.html)

   섹션마다 적어 둔 메모(eip.memo.chNN)를 챕터 순으로 한곳에 모은다.
   저장 형식과 읽고 쓰는 규칙은 memo.js(window.EIP_MEMO)에만 있다 — 여기서 다시 만들지 말 것.

   📌 섹션 제목은 assets/toc.js(window.EIP_TOC)에서 가져온다.
      메모에 제목을 함께 저장하는 방식은 버렸다 — 본문 제목을 고치면 낡은 제목이 남는다.

   문항 메모도 함께 모은다 (T41). **맞힌 문항에 적은 메모는 여기 말고는 다시 못 찾는다** —
   오답노트는 틀린 것만 모으고, 퀴즈·문제지는 그 문항이 다시 뽑혀야 보인다.
   🔒 **문항 본문도 저장하지 않는다.** 섹션 제목과 같은 이유다 — 문항을 고치면
      낡은 본문이 남는다. `assets/bank-chNN.js` 에서 읽되 **메모가 있는 챕터만** 받는다.

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  var M = window.EIP_MEMO;
  var TOC = window.EIP_TOC || {};

  var root, ctlEl, listEl, statEl;
  var keyword = '';

  var el = window.EIP_UTIL.el;
  var clear = window.EIP_UTIL.clear;
  var has = window.EIP_UTIL.has;
  var U = window.EIP_UTIL;

  /* 문항 본문은 은행에서 읽는다. 아직 안 받았으면 위치만 보여 준다 */
  var byId = {};
  var banksAsked = false;

  /* ------------------------------------------------------- 문항 메모 모으기 */
  /* [{ ch, title, items: [{ id, loc, sec, memo }] }] — 챕터 순 · 문항 id 순 */
  function collectQ() {
    var all = M.q.all(), ids = [], k;
    for (k in all) { if (has(all, k)) ids.push(k); }
    /* 🔑 id 가 `ch01-s05-03` 이라 **문자열 정렬이 곧 챕터·섹션·번호 순**이다
       (전부 자리를 채운 숫자라서). 따로 쪼개 정렬할 필요가 없다. */
    ids.sort();

    var out = [], cur = null, i, id, loc, chapter, sec;
    for (i = 0; i < ids.length; i++) {
      id = ids[i];
      loc = U.locate(id);
      chapter = loc && TOC[loc.ch];
      sec = chapter && (chapter.s || [])[loc.sec - 1];

      var chKey = loc ? loc.ch : '?';
      if (!cur || cur.ch !== chKey) {
        cur = { ch: chKey, title: (chapter && chapter.t) || chKey, items: [] };
        out.push(cur);
      }
      cur.items.push({
        id: id,
        sec: sec || null,
        loc: sec ? (sec.n === '·' ? sec.t : sec.n + '. ' + sec.t) : id,
        memo: all[id]
      });
    }
    return out;
  }

  /* 🚨 메모가 있는 챕터의 은행만 받는다. 12개를 다 받으면 700KB 다.
     오답노트가 하는 일과 같아서 `EIP_UTIL.loadBanks` 한 벌을 쓴다. */
  function askBanks(groups) {
    if (banksAsked) return;
    banksAsked = true;
    var need = [], i;
    for (i = 0; i < groups.length; i++) {
      if (groups[i].ch !== '?' && !window['EIP_BANK_' + groups[i].ch]) need.push(groups[i].ch);
    }
    /* 🚨 받을 것이 없으면 다시 그리지 않는다 — 이미 실린 은행은 `render()` 가
       **그리기 전에** `indexBanks()` 로 훑어 뒀다. 여기서 또 그리면 헛일이다. */
    if (!need.length) return;
    U.loadBanks(need, function () { indexBanks(); renderList(); });
  }

  function indexBanks() {
    var k, bank, i;
    for (k in TOC) {
      if (!has(TOC, k)) continue;
      bank = window['EIP_BANK_' + k];
      if (!bank) continue;
      for (i = 0; i < bank.length; i++) byId[bank[i].id] = bank[i];
    }
  }

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

  /* 문항 메모 검색 — 문항 본문도 훑는다 (아직 안 받았으면 그 부분만 빠진다) */
  function qMatches(group, item) {
    if (!keyword) return true;
    var body = byId[item.id] ? String(byId[item.id].q || '') : '';
    var hay = (group.title + ' ' + item.loc + ' ' + item.memo.t + ' ' + body).toLowerCase();
    return hay.indexOf(keyword) >= 0;
  }

  function filteredQ() {
    var out = [];
    collectQ().forEach(function (g) {
      var items = g.items.filter(function (it) { return qMatches(g, it); });
      if (items.length) out.push({ ch: g.ch, title: g.title, items: items });
    });
    return out;
  }

  function countOf(groups) {
    var n = 0;
    groups.forEach(function (g) { n += g.items.length; });
    return n;
  }

  /* 태그를 걷어낸 글 — 검색·마크다운에 쓴다. 문항 본문에 `<b>` 가 들어 있다 */
  function plain(html) {
    return String(html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ')
                             .replace(/^\s+|\s+$/g, '');
  }

  /* ------------------------------------------------------------ 마크다운 변환 */
  function markdown(groups, qgroups) {
    var lines = ['# 내 메모 — EIP Study', ''];

    if (groups.length) {
      lines.push('## 섹션 메모', '');
      groups.forEach(function (g) {
        lines.push('### ' + g.title, '');
        g.items.forEach(function (it) {
          lines.push('#### ' + (it.n === '·' ? '' : it.n + '. ') + it.t);
          var when = M.stampText(it.memo.u);
          if (when) lines.push('', '*' + when + '*');
          lines.push('', it.memo.t, '');
        });
      });
    }

    if (qgroups && qgroups.length) {
      lines.push('## 문항 메모', '');
      qgroups.forEach(function (g) {
        lines.push('### ' + g.title, '');
        g.items.forEach(function (it) {
          lines.push('#### ' + it.loc);
          var body = byId[it.id] ? plain(byId[it.id].q) : '';
          if (body) lines.push('', '> ' + body);
          var when = M.stampText(it.memo.u);
          if (when) lines.push('', '*' + when + '*');
          lines.push('', it.memo.t, '');
        });
      });
    }

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
    clear(ctlEl);

    var search = el('input', 'nctl__search');
    search.type = 'search';
    search.placeholder = '메모·섹션 제목·문항 검색…';
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
      var groups = filtered(), qgroups = filteredQ();
      if (!groups.length && !qgroups.length) return;
      copy(markdown(groups, qgroups), function (ok) {
        copyBtn.textContent = ok ? '복사했습니다' : '복사하지 못했습니다';
        setTimeout(function () { copyBtn.textContent = '전체 마크다운 복사'; }, 1800);
      });
    });
    ctlEl.appendChild(copyBtn);

    statEl = el('span', 'nctl__stat');
    ctlEl.appendChild(statEl);
  }

  /* 위치 줄 — 개념 창이 있으면 겹쳐 열고, 없으면 그 섹션으로 간다.
     🚨 **페이지를 옮기지 않는다.** 옮기면 검색어와 스크롤을 잃는다 (오답노트와 같은 이유). */
  function locLink(ch, file, text, cls) {
    var C = window.EIP_CONCEPT;
    if (C && file && C.has(ch, file)) {
      var link = C.link(ch, file, text, cls);
      link.title = '개념 보기';
      return link;
    }
    if (file) {
      var a = el('a', cls, text);
      a.href = ch + '/' + file;
      a.title = '이 섹션으로 이동';
      return a;
    }
    return el('span', cls, text);
  }

  function renderSectionGroups(groups) {
    groups.forEach(function (g) {
      var sec = el('section', 'ngroup');
      sec.appendChild(el('h3', 'ngroup__title', g.title));

      g.items.forEach(function (it) {
        var card = el('article', 'ncard');
        card.appendChild(locLink(g.ch, it.file,
          (it.n === '·' ? '' : it.n + '. ') + it.t, 'ncard__loc'));

        var when = M.stampText(it.memo.u);
        if (when) card.appendChild(el('span', 'ncard__at', when));

        card.appendChild(el('p', 'ncard__body', it.memo.t));
        sec.appendChild(card);
      });

      listEl.appendChild(sec);
    });
  }

  function renderQGroups(groups) {
    groups.forEach(function (g) {
      var sec = el('section', 'ngroup');
      sec.appendChild(el('h3', 'ngroup__title', g.title));

      g.items.forEach(function (it) {
        var card = el('article', 'ncard ncard--q');
        card.appendChild(locLink(g.ch, it.sec ? it.sec.f : '', it.loc, 'ncard__loc'));

        var when = M.stampText(it.memo.u);
        if (when) card.appendChild(el('span', 'ncard__at', when));

        /* 🔒 문항 본문은 **저장한 것이 아니라 은행에서 읽은 것**이다.
           아직 안 받았으면 자리만 비워 둔다 — 곧 다시 그린다. */
        var item = byId[it.id];
        if (item && item.q) {
          var q = el('p', 'ncard__q');
          q.innerHTML = item.q;
          card.appendChild(q);
        }

        card.appendChild(el('p', 'ncard__body', it.memo.t));
        sec.appendChild(card);
      });

      listEl.appendChild(sec);
    });
  }

  function renderList() {
    var groups = filtered(), qgroups = filteredQ();
    clear(listEl);

    var allSec = countOf(collect()), allQ = countOf(collectQ());
    var shown = countOf(groups) + countOf(qgroups);
    statEl.textContent = keyword
      ? shown + ' / ' + (allSec + allQ) + '개'
      : summary(allSec, allQ);

    if (!groups.length && !qgroups.length) {
      listEl.appendChild(el('p', 'wempty', keyword
        ? '검색어와 맞는 메모가 없습니다.'
        : '아직 메모가 없습니다. 섹션 아래쪽 「✏️ 내 메모」나 문항의 메모 칸에 적어 보세요.'));
      return;
    }

    /* 🔑 묶음 제목은 **양쪽이 다 있을 때만** 낸다. 하나뿐인데 큰 제목이 붙으면
       화면만 길어지고 무엇이 무엇인지는 이미 분명하다. */
    var both = groups.length && qgroups.length;

    if (groups.length) {
      if (both) listEl.appendChild(el('h2', 'nkind', '섹션 메모'));
      renderSectionGroups(groups);
    }
    if (qgroups.length) {
      if (both) listEl.appendChild(el('h2', 'nkind', '문항 메모'));
      renderQGroups(qgroups);
    }
  }

  function summary(nSec, nQ) {
    var parts = [];
    if (nSec) parts.push('섹션 ' + nSec + '개');
    if (nQ) parts.push('문항 ' + nQ + '개');
    return parts.length ? parts.join(' · ') + '에 메모가 있습니다' : '';
  }

  function render() {
    root = document.getElementById('notes');
    if (!root || !M) return;

    clear(root);
    ctlEl = el('div', 'nctl');
    listEl = el('div', 'nlist');
    root.appendChild(ctlEl);
    root.appendChild(listEl);

    /* 이미 실려 있는 은행부터 훑는다 (섹션에서 넘어온 경우 등) */
    indexBanks();

    renderControls();
    renderList();

    /* 🚨 그린 **뒤에** 없는 은행을 부른다 — 기다렸다 그리면 화면이 한참 비어 있다.
       도착하면 renderList() 가 다시 돌아 문항 본문이 채워진다. */
    askBanks(collectQ());
  }

  /* 되살아난 화면 — 섹션에서 메모를 쓰고 돌아오면 목록이 달라져 있다 */
  document.addEventListener('eip:revive', function () {
    if (root) render();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
