/* ==========================================================================
   dialog.js — 확인 대화상자 한 벌

   🚨 **브라우저 `confirm()` 을 쓰지 않는다.** 제목 줄을 코드로 바꿀 수 없어
      앱 이름이나 도메인이 붙는다 — VS Code 내장 브라우저에서는 **"Code"** 다.
      무슨 창인지 알아볼 수 없다.
      💬 사용자 — *"덮어쓰기 2중 질문할 때 타이틀에 Code는 뭐야. 바꿔야 할것 같네"*

   🔒 **한 벌만 둔다.** `qcard.js`(채점) · `wrongstore.js`(분류) · `merge.js`(병합)와
      같은 이유다. 두 곳이 만지면 반드시 어긋난다.

   원래 `backup.js` 안에 있던 `shell()` 을 떼어 냈다 (T32 에서 필요해졌고
   T28 이 가려던 방향이 이것이다).

   ── 쓰는 법 ──────────────────────────────────────────────────────────────
     EIP_DIALOG.confirm({
       title: '저장함을 비울까요?',
       sub:   '카드 12장',                      // 없어도 된다
       body:  '저장한 카드가 모두 사라집니다.',   // 없어도 된다
       ok:    '비우기',
       danger: true,                            // 되돌릴 수 없는 일이면
       onOk:  function () { … }
     });

     EIP_DIALOG.shell(title, sub)  → 빈 상자를 돌려준다 (backup.js 처럼 직접 채울 때)
     EIP_DIALOG.close()

   ⚠️ ES5 문법으로 작성한다. 화살표 함수 · const/let · 템플릿 리터럴 금지.
   ========================================================================== */
(function () {
  'use strict';

  var scrim = null, box = null, lastFocus = null;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function close() {
    if (scrim && scrim.parentNode) scrim.parentNode.removeChild(scrim);
    if (box && box.parentNode) box.parentNode.removeChild(box);
    scrim = null;
    box = null;
    document.removeEventListener('keydown', onEsc);
    /* 열기 전에 있던 자리로 초점을 돌려준다 — 키보드로만 쓰는 사람이 길을 잃지 않게 */
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
    lastFocus = null;
  }

  function onEsc(e) {
    if (e.key === 'Escape' || e.keyCode === 27) close();
  }

  /* 빈 상자를 만들어 돌려준다. 부르는 쪽이 버튼까지 직접 채운다. */
  function shell(title, sub) {
    close();
    lastFocus = document.activeElement;

    scrim = el('div', 'scrim is-open');
    scrim.addEventListener('click', close);
    document.body.appendChild(scrim);

    box = el('div', 'bkdlg');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', title);
    box.appendChild(el('h2', 'bkdlg__title', title));
    if (sub) box.appendChild(el('p', 'bkdlg__file', sub));

    document.addEventListener('keydown', onEsc);
    document.body.appendChild(box);
    return box;
  }

  /* 흔한 모양 — 「할까요? / 취소」 한 쌍 */
  function ask(opts) {
    if (!opts || !opts.title) return;
    var b = shell(opts.title, opts.sub);

    if (opts.body) b.appendChild(el('p', 'bkdlg__hint', opts.body));

    var go = el('button', 'bkdlg__go' + (opts.danger ? ' bkdlg__go--danger' : ''),
                opts.ok || '계속');
    go.type = 'button';
    go.addEventListener('click', function () {
      close();                          /* 🚨 먼저 닫는다 — onOk 가 화면을 다시 그려도 안전하게 */
      if (opts.onOk) opts.onOk();
    });
    b.appendChild(go);

    var cancel = el('button', 'bkdlg__cancel', opts.cancel || '취소');
    cancel.type = 'button';
    cancel.addEventListener('click', close);
    b.appendChild(cancel);

    /* 되돌릴 수 없는 일은 **취소에 초점을 둔다** — 엔터를 눌러 놓친 것이 지워지지 않게 */
    if (opts.danger) cancel.focus();
    else go.focus();
  }

  window.EIP_DIALOG = { shell: shell, confirm: ask, close: close };
})();
