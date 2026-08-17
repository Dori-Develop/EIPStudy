/* ==========================================================================
   EIP Study — 학습 기록 내보내기 · 가져오기

   eip.* 전체를 JSON 파일 하나로 꺼내고 다시 읽어들인다.
   병합 규칙은 여기 없다 — assets/merge.js(window.EIP_MERGE)에만 있다.

   🚨 동기화(T8)가 생겨도 이 기능은 계속 필요하다.
      동기화는 두 기기를 **같게** 만드는 것이고, 백업은 한 시점을 **얼어붙게** 하는 것이다.
      「전체 초기화」 사고가 동기화로 전파되면 양쪽 다 날아간다.

   📌 fetch 를 쓰지 않는다. Blob + <a download> 와 FileReader 는
      file:// 에서도 동작한다 (CLAUDE.md 2장의 제약을 지킨다).

   ⚠️ ES5 문법으로 작성한다.
      화살표 함수 · const/let · 템플릿 리터럴 금지. JScript(ES3) 검사를 통과해야 한다.
   ========================================================================== */
(function () {
  'use strict';

  var FORMAT = 1;   /* 🚨 형식 판. 나중에 형식을 바꾸려면 이것이 있어야 한다 */

  function store() { return (window.EIP && window.EIP.store) || null; }
  function M() { return window.EIP_MERGE || null; }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* 🚨 `alert()` 도 제목 줄을 못 바꾼다 — 앱 이름이나 도메인이 붙는다.
     알림도 `dialog.js` 한 벌로 낸다 (T32). */
  function say(title, body) {
    if (window.EIP_DIALOG) window.EIP_DIALOG.alert(title, body);
    else window.alert(title + (body ? '\n\n' + body : ''));
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function today() {
    var d = new Date();
    return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
  }

  function dateText(ms) {
    if (!ms) return '시각 모름';
    var d = new Date(ms);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
           ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }

  /* ------------------------------------------------------------- 내보내기 */
  function doExport() {
    var s = store(), m = M();
    if (!s || !m) return;

    var data = m.exportable(s);
    var sum = m.summarize(data);
    if (!sum.keys) {
      say('내보낼 기록이 없습니다', '섹션을 읽거나 퀴즈를 풀면 기록이 쌓입니다.');
      return;
    }

    var payload = { v: FORMAT, at: (new Date()).getTime(), data: data };
    var text = JSON.stringify(payload);
    var name = 'eipstudy-backup-' + today() + '.json';

    /* Blob 이 없는 아주 낡은 브라우저는 data: URL 로 (한글이 있어 encodeURIComponent) */
    var url;
    try {
      url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    } catch (e) {
      url = 'data:application/json;charset=utf-8,' + encodeURIComponent(text);
    }

    var a = el('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { try { URL.revokeObjectURL(url); } catch (e) {} }, 4000);
  }

  /* ------------------------------------------------------------- 가져오기 */
  function pickFile() {
    var input = el('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.style.display = 'none';
    document.body.appendChild(input);

    input.addEventListener('change', function () {
      var f = input.files && input.files[0];
      document.body.removeChild(input);
      if (!f) return;

      var reader = new FileReader();
      reader.onload = function () {
        var parsed;
        try { parsed = JSON.parse(String(reader.result)); }
        catch (e) { say('읽을 수 없는 파일입니다', 'EIP Study 에서 내보낸 .json 파일인지 확인해 주세요.'); return; }
        review(parsed, f.name);
      };
      reader.onerror = function () { say('파일을 읽지 못했습니다'); };
      reader.readAsText(f);
    });

    input.click();
  }

  /* 무엇이 들어오는지 보여 주고 확인받는다 — 덮어쓰기는 되돌릴 수 없다 */
  function review(parsed, filename) {
    var m = M();
    if (!m) return;

    if (!parsed || typeof parsed !== 'object' || !parsed.data || typeof parsed.data !== 'object') {
      say('EIP Study 백업 파일이 아닙니다', '내보내기로 만든 .json 파일인지 확인해 주세요.');
      return;
    }
    var go = function () {
      var sum = m.summarize(parsed.data);
      if (!sum.keys) { say('파일에 학습 기록이 없습니다'); return; }
      openDialog(parsed, filename, sum);
    };

    /* ✅ T32 에서 `confirm()` 을 걷어냈다 — 대화상자는 `dialog.js` 한 벌뿐이다 */
    if (parsed.v && parsed.v > FORMAT) {
      var D = window.EIP_DIALOG;
      if (!D) return;
      D.confirm({
        title: '더 새로운 형식의 파일입니다',
        sub: 'v' + parsed.v + ' · 이 사이트는 v' + FORMAT + ' 까지 읽습니다',
        body: '일부 기록을 못 읽을 수 있습니다. 그래도 열어 볼까요?',
        ok: '계속',
        onOk: go
      });
      return;
    }
    go();
  }

  /* 🔒 대화상자는 `dialog.js` 한 벌뿐이다 (T32 에서 떼어 냈다).
     여기 있던 `shell`·`closeDialog`·`onEsc` 가 그것이다 — 두 벌이 되면 어긋난다. */
  var box;

  function closeDialog() {
    box = null;
    if (window.EIP_DIALOG) window.EIP_DIALOG.close();
  }

  /* 지금 · 파일 · 합친 뒤 를 나란히 보여 준다.
     🔒 「합친 뒤」는 merge.js 의 dryRun 으로 실제 합쳐 본 값이라 결과와 어긋나지 않는다. */
  function statsTable(now, file, after) {
    var rows = [
      ['읽은 섹션', 'sections'],
      ['메모', 'memos'],
      ['오답 기록', 'wrongs'],
      ['★ 저장한 문제', 'favs'],
      ['암기 카드', 'cards'],
      ['응시 이력', 'exams']
    ];

    var t = el('table', 'bkdlg__stats');
    var thead = el('thead');
    var htr = el('tr');
    htr.appendChild(el('th', null, ''));
    htr.appendChild(el('th', null, '지금'));
    htr.appendChild(el('th', null, '파일'));
    if (after) htr.appendChild(el('th', 'is-after', '합친 뒤'));
    thead.appendChild(htr);
    t.appendChild(thead);

    var tb = el('tbody');
    var any = false;
    rows.forEach(function (r) {
      var k = r[1];
      var a = now[k] || 0, b = file[k] || 0, c = after ? (after[k] || 0) : 0;
      if (!a && !b && !c) return;
      any = true;
      var tr = el('tr');
      tr.appendChild(el('th', null, r[0]));
      tr.appendChild(el('td', null, String(a)));
      tr.appendChild(el('td', null, String(b)));
      if (after) tr.appendChild(el('td', 'is-after', String(c)));
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    return any ? t : null;
  }

  function shell(title, subtitle) {
    box = window.EIP_DIALOG ? window.EIP_DIALOG.shell(title, subtitle) : null;
    return box;
  }

  /* 1단계 — 무엇이 들어오는지 보여 준다 */
  function openDialog(parsed, filename, fileSum) {
    var s = store(), m = M();
    if (!s || !m) return;

    var nowSum = m.summarize(m.exportable(s));
    var afterSum = m.summarize(m.dryRun(s, parsed.data));

    if (!shell('이 기록을 가져옵니다', filename + ' · ' + dateText(parsed.at) + ' 에 내보냄')) return;

    var t = statsTable(nowSum, fileSum, afterSum);
    if (t) box.appendChild(t);

    var merge = el('button', 'bkdlg__go', '지금 기록과 합치기');
    merge.type = 'button';
    merge.addEventListener('click', function () { run(parsed, 'merge'); });
    box.appendChild(merge);
    box.appendChild(el('p', 'bkdlg__hint',
      '읽은 섹션·오답·저장한 것은 양쪽을 모두 남깁니다. ' +
      '같은 섹션에 메모가 둘이면 이어 붙여 하나도 잃지 않습니다.'));

    var replace = el('button', 'bkdlg__go bkdlg__go--danger', '지금 기록을 지우고 덮어쓰기');
    replace.type = 'button';
    replace.addEventListener('click', function () { confirmReplace(parsed, filename, nowSum, fileSum); });
    box.appendChild(replace);
    box.appendChild(el('p', 'bkdlg__hint',
      '「파일」 열의 상태로 되돌립니다. 파일에 없는 기록은 사라집니다.'));

    var cancel = el('button', 'bkdlg__cancel', '취소');
    cancel.type = 'button';
    cancel.addEventListener('click', closeDialog);
    box.appendChild(cancel);

    merge.focus();
  }

  /* 2단계 — 덮어쓰기만 한 번 더 묻는다.
     📌 브라우저 confirm() 을 쓰지 않는다. 제목 줄에 앱 이름이나 도메인이 붙어
        (VS Code 내장 브라우저에서는 "Code") 무슨 창인지 알아보기 어렵다. */
  function confirmReplace(parsed, filename, nowSum, fileSum) {
    if (!shell('정말 덮어쓸까요?', filename)) return;

    box.appendChild(el('p', 'bkdlg__warn',
      '지금 이 브라우저의 학습 기록이 사라지고 파일의 기록만 남습니다. 되돌릴 수 없습니다.'));

    var t = statsTable(nowSum, fileSum, null);
    if (t) box.appendChild(t);

    var go = el('button', 'bkdlg__go bkdlg__go--danger', '지우고 덮어쓰기');
    go.type = 'button';
    go.addEventListener('click', function () { run(parsed, 'replace'); });
    box.appendChild(go);

    var back = el('button', 'bkdlg__cancel', '← 뒤로');
    back.type = 'button';
    back.addEventListener('click', function () {
      openDialog(parsed, filename, fileSum);
    });
    box.appendChild(back);

    back.focus();
  }

  function run(parsed, mode) {
    var s = store(), m = M();
    if (!s || !m) return;
    m.apply(s, parsed.data, mode);
    closeDialog();
    location.reload();
  }

  /* ------------------------------------------------------------------ 배선 */
  function init() {
    var out = document.querySelector('.js-export');
    var inn = document.querySelector('.js-import');
    if (out) out.addEventListener('click', doExport);
    if (inn) inn.addEventListener('click', pickFile);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
