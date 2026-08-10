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
      alert('아직 저장된 학습 기록이 없습니다.\n섹션을 읽거나 퀴즈를 풀면 기록이 쌓입니다.');
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
        catch (e) { alert('읽을 수 없는 파일입니다.\nEIP Study 에서 내보낸 .json 파일인지 확인해 주세요.'); return; }
        review(parsed, f.name);
      };
      reader.onerror = function () { alert('파일을 읽지 못했습니다.'); };
      reader.readAsText(f);
    });

    input.click();
  }

  /* 무엇이 들어오는지 보여 주고 확인받는다 — 덮어쓰기는 되돌릴 수 없다 */
  function review(parsed, filename) {
    var m = M();
    if (!m) return;

    if (!parsed || typeof parsed !== 'object' || !parsed.data || typeof parsed.data !== 'object') {
      alert('EIP Study 백업 파일이 아닙니다.');
      return;
    }
    if (parsed.v && parsed.v > FORMAT) {
      if (!confirm('더 새로운 형식(v' + parsed.v + ')의 파일입니다.\n' +
                   '일부 기록을 못 읽을 수 있습니다. 계속할까요?')) return;
    }

    var sum = m.summarize(parsed.data);
    if (!sum.keys) { alert('파일에 학습 기록이 없습니다.'); return; }

    openDialog(parsed, filename, sum);
  }

  var scrim, box;

  function closeDialog() {
    if (scrim) { scrim.parentNode.removeChild(scrim); scrim = null; }
    if (box) { box.parentNode.removeChild(box); box = null; }
    document.removeEventListener('keydown', onEsc);
  }

  function onEsc(e) { if (e.key === 'Escape' || e.keyCode === 27) closeDialog(); }

  function openDialog(parsed, filename, sum) {
    closeDialog();

    scrim = el('div', 'scrim is-open');
    scrim.addEventListener('click', closeDialog);
    document.body.appendChild(scrim);

    box = el('div', 'bkdlg');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', '학습 기록 가져오기');

    box.appendChild(el('h2', 'bkdlg__title', '이 기록을 가져옵니다'));
    box.appendChild(el('p', 'bkdlg__file', filename + ' · ' + dateText(parsed.at) + ' 에 내보냄'));

    var rows = [
      ['읽은 섹션', sum.sections],
      ['메모', sum.memos],
      ['오답 기록', sum.wrongs],
      ['★ 저장한 문제', sum.favs],
      ['저장한 암기 카드', sum.cards],
      ['모의 문제지 응시 이력', sum.exams]
    ];
    var list = el('dl', 'bkdlg__stats');
    rows.forEach(function (r) {
      if (!r[1]) return;
      list.appendChild(el('dt', null, r[0]));
      list.appendChild(el('dd', null, r[1] + '개'));
    });
    box.appendChild(list);

    /* 합치기 */
    var merge = el('button', 'bkdlg__go', '지금 기록과 합치기');
    merge.type = 'button';
    box.appendChild(merge);
    box.appendChild(el('p', 'bkdlg__hint',
      '읽은 섹션·오답·저장한 것은 양쪽을 모두 남깁니다. ' +
      '같은 섹션에 메모가 둘이면 이어 붙여 하나도 잃지 않습니다.'));

    /* 덮어쓰기 */
    var replace = el('button', 'bkdlg__go bkdlg__go--danger', '지금 기록을 지우고 덮어쓰기');
    replace.type = 'button';
    box.appendChild(replace);
    box.appendChild(el('p', 'bkdlg__hint',
      '이 파일의 상태로 되돌립니다. 파일에 없는 기록은 사라지고 되돌릴 수 없습니다.'));

    var cancel = el('button', 'bkdlg__cancel', '취소');
    cancel.type = 'button';
    cancel.addEventListener('click', closeDialog);
    box.appendChild(cancel);

    merge.addEventListener('click', function () { run(parsed, 'merge'); });
    replace.addEventListener('click', function () {
      if (!confirm('지금 이 브라우저의 학습 기록을 전부 지우고\n파일의 내용으로 바꿉니다.\n\n되돌릴 수 없습니다. 계속할까요?')) return;
      run(parsed, 'replace');
    });

    document.addEventListener('keydown', onEsc);
    document.body.appendChild(box);
    merge.focus();
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
