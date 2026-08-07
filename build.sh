#!/usr/bin/env bash
# ==========================================================================
# EIP Study — 정적 사이트 빌드
#
#   content/chNN.md  →  chNN.html          (챕터 목차 페이지)
#                    →  chNN/sMM.html      (H2 섹션마다 한 페이지)
#                    →  assets/search-chNN.js (검색용 본문, 검색 열 때만 로드)
#
# 사용법:  bash build.sh
# 새 챕터: content/ch02.md 를 만들고 다시 실행하면 ch02.* 가 생깁니다.
#          (index.html 의 챕터 카드는 직접 추가해 주세요)
# ==========================================================================
set -euo pipefail
cd "$(dirname "$0")"

MARKED_CDN="https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js"
MERMAID_CDN="https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js"

TMP=".buildtmp"

# JS 문자열 안에 넣을 수 있도록 역슬래시와 큰따옴표를 이스케이프
esc() { printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'; }

shopt -s nullglob
sources=(content/*.md)
if [ ${#sources[@]} -eq 0 ]; then
  echo "content/ 에 .md 파일이 없습니다."
  exit 1
fi

# 전 챕터 목차(assets/toc.js)를 만들기 위해 루프를 돌며 모은다.
# 오답노트·모의 문제지가 "이 문항이 어느 챕터 어느 섹션인가"를 이름으로 보여주려면
# 챕터 페이지 밖에서도 섹션 제목을 알 수 있어야 한다.
toc_js=""

for md in "${sources[@]}"; do
  id="$(basename "$md" .md)"                       # ch01
  title="$(grep -m1 '^# ' "$md" | sed 's/^# //' || true)"
  [ -z "$title" ] && title="$id"
  subtitle="${title##*— }"                          # 01. 요구사항 확인

  # 문제 은행(content/quiz/chNN.js)이 있으면 assets/ 로 복사해 섹션 페이지에 붙인다.
  # 파싱해서 섹션별로 쪼개지 않고 통째로 복사한다 —
  #   · 이 PC 에 jq/node 가 없어 bash 로 JS 를 자르는 것은 비용이 크고
  #   · 같은 파일을 나중에 모의 문제지(exam.html)가 그대로 다시 쓴다 (은행이 유일한 원본)
  # 섹션 필터링은 quiz.js 가 런타임에 sec 로 한다. 챕터 하나가 20~40KB 라 부담이 없다.
  # 앞의 줄바꿈까지 변수에 담는다 — 은행이 없는 챕터의 페이지에 빈 줄이 남지 않도록.
  quiz_scripts=""
  if [ -f "content/quiz/${id}.js" ]; then
    cp "content/quiz/${id}.js" "assets/bank-${id}.js"
    # 순서가 중요하다 — quiz.js 가 window.EIP_WRONG(기록)과 window.EIP_QCARD(위젯)를
    # 참조하므로 둘 다 먼저 실려야 한다. 못 실리면 quiz.js 가 조용히 물러난다.
    quiz_scripts="
<script src=\"../assets/bank-${id}.js\"></script>
<script src=\"../assets/wrongstore.js\"></script>
<script src=\"../assets/qcard.js\"></script>
<script src=\"../assets/quiz.js\"></script>"
  fi

  # 본문에 </script> 가 있으면 인라인 삽입이 깨진다
  if grep -q '</script>' "$md"; then
    echo "!! $md 에 </script> 가 있어 빌드를 중단합니다."
    exit 1
  fi

  rm -rf "$TMP"; mkdir -p "$TMP"

  # ---- 1) H2 기준으로 쪼개기 (코드 펜스 안의 ## 은 무시) ----
  awk -v out="$TMP" '
    BEGIN { n = 0; fence = 0 }
    {
      line = $0
      sub(/\r$/, "", line)
      if (line ~ /^```/) { fence = 1 - fence }
      if (fence == 0 && line ~ /^## /) {
        n++
        file = sprintf("%s/sec%02d.md", out, n)
        hdr = line
        sub(/^## /, "", hdr)
        print hdr > (out "/titles.txt")
      }
      if (n == 0) {
        if (line !~ /^# /) print line > (out "/intro.md")
      } else {
        print line > file
      }
    }
    END { print n > (out "/count.txt") }
  ' "$md"

  total="$(cat "$TMP/count.txt")"
  if [ "$total" -eq 0 ]; then
    echo "!! $md 에 '## ' 섹션이 없습니다."
    exit 1
  fi

  rm -rf "$id"; mkdir -p "$id"

  # ---- 2) 섹션 목록(JS 배열) 만들기 ----
  sections_js=""
  i=0
  while IFS= read -r raw; do
    i=$((i + 1))
    page="$(printf 's%02d.html' "$i")"
    if [[ "$raw" =~ ^\(([0-9]+)\)[[:space:]]*(.*)$ ]]; then
      num="${BASH_REMATCH[1]}"
      label="${BASH_REMATCH[2]}"
    else
      num="·"
      # 장식용 이모지 접두사만 걷어낸다 (바이트 단위 문자 클래스는 UTF-8 을 깨뜨림)
      label="$(printf '%s' "$raw" | sed -e 's/^📌[[:space:]]*//' -e 's/^🖼️[[:space:]]*//' -e 's/^[[:space:]]*//')"
    fi
    printf '%s\n' "$label" >> "$TMP/labels.txt"
    [ -n "$sections_js" ] && sections_js="${sections_js},"
    sections_js="${sections_js}{f:\"${page}\",n:\"$(esc "$num")\",t:\"$(esc "$label")\"}"
  done < "$TMP/titles.txt"

  # 전 챕터 목차에 이 챕터를 얹는다. bank 는 이 챕터에 문제 은행이 있는지 —
  # 오답노트가 필요한 은행만 골라 내려받는 데 쓴다.
  has_bank="false"
  [ -f "content/quiz/${id}.js" ] && has_bank="true"
  [ -n "$toc_js" ] && toc_js="${toc_js},"
  toc_js="${toc_js}${id}:{t:\"$(esc "$subtitle")\",bank:${has_bank},s:[${sections_js}]}"

  meta_js="id:\"${id}\",title:\"$(esc "$title")\",subtitle:\"$(esc "$subtitle")\",total:${total}"

  # ---- 3) 페이지 껍데기 ----
  # $1 = <title>, $2 = base('' | '../'), $3 = 추가 head 스크립트, $4 = 본문 영역
  shell_head() {
    local ptitle="$1" base="$2" extra="$3"
    cat <<HEAD
<!doctype html>
<html lang="ko" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="description" content="${title} — 도해와 표로 정리한 학습 노트">
<title>${ptitle}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📘</text></svg>">
<link rel="stylesheet" href="${base}assets/style.css">
<script>
/* 첫 페인트 전에 테마를 적용해 깜빡임 방지 */
(function(){try{var t=JSON.parse(localStorage.getItem('eip.theme'));
if(!t)t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
document.documentElement.setAttribute('data-theme',t);}catch(e){}})();
</script>
<script>
window.EIP_CHAPTER = {${meta_js},base:"${base}",${extra},sections:[${sections_js}]};
</script>
</head>
<body>

<header class="hdr">
  <button type="button" class="iconbtn js-menu" aria-label="목차 열기">☰</button>
  <div class="hdr__title">
    <a href="${base}index.html">← EIP Study</a>
    <small>${subtitle}</small>
  </div>
  <button type="button" class="iconbtn js-search" aria-label="검색 (단축키 /)" title="검색  /">🔍</button>
  <button type="button" class="iconbtn js-theme" aria-label="테마 전환">🌙</button>
</header>

<div class="progressbar" id="readbar"></div>

<div class="layout">
  <aside class="sidebar" id="sidebar">
    <div class="sidebar__head">
      <span>목차</span>
      <button type="button" class="iconbtn js-menu-close" aria-label="목차 닫기">✕</button>
    </div>
    <div class="sidebar__body">
      <div class="tocmeta">
        <span>학습 진도</span>
        <strong class="js-chapter-progress">0/0 · 0%</strong>
      </div>
      <nav id="toc" aria-label="문서 목차"></nav>
    </div>
  </aside>

  <main class="main">
HEAD
  }

  shell_tail() {
    local base="$1" extra="${2:-}"
    cat <<TAIL
  </main>
</div>

<div class="scrim" id="scrim"></div>
<button type="button" class="totop" id="totop" aria-label="맨 위로">↑</button>

<div class="search" id="search" role="dialog" aria-modal="true" aria-label="본문 검색">
  <div class="search__panel">
    <div class="search__inputrow">
      <span aria-hidden="true">🔍</span>
      <input type="search" class="search__input" id="search-input"
             placeholder="챕터 전체 검색…  (예: 스크럼, DFD, COCOMO)"
             autocomplete="off" autocorrect="off" spellcheck="false">
      <kbd style="font-size:11px;color:var(--fg-faint)">ESC</kbd>
    </div>
    <div class="search__results" id="search-results"></div>
    <div class="search__hint">↑↓ 이동 · Enter 열기 · / 로 검색 열기</div>
  </div>
</div>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="다이어그램 크게 보기">
  <button type="button" class="lightbox__close" aria-label="닫기">✕</button>
  <div class="lightbox__inner" id="lightbox-inner"></div>
</div>

<script src="${MARKED_CDN}"></script>
<script src="${MERMAID_CDN}"></script>
<script src="${base}assets/app.js"></script>${extra}
</body>
</html>
TAIL
  }

  # ---- 4) 챕터 목차 페이지 ----
  {
    shell_head "${subtitle} · EIP Study" "" 'page:"index",index:-1'
    cat <<'MID'
    <article class="wrap doc doc--index" id="doc">
      <div class="chapterhead">
        <h1 class="chapterhead__title"></h1>
        <div class="chapterhead__bar"><div class="bar"><i class="js-overall-bar"></i></div></div>
        <p class="chapterhead__meta js-overall-text"></p>
      </div>
      <div class="intro" id="intro">
MID
    printf '<script type="text/markdown" id="markdown-source">\n'
    cat "$TMP/intro.md"
    printf '</'
    printf 'script>\n'
    cat <<'MID2'
      </div>
      <nav class="seclist js-seclist" aria-label="섹션 목록"></nav>
    </article>
MID2
    shell_tail ""
  } > "${id}.html"

  # ---- 5) 섹션 페이지 ----
  i=0
  while [ "$i" -lt "$total" ]; do
    i=$((i + 1))
    page="$(printf 's%02d.html' "$i")"
    secfile="$(printf '%s/sec%02d.md' "$TMP" "$i")"
    label="$(sed -n "${i}p" "$TMP/labels.txt")"
    {
      shell_head "${label} · ${subtitle}" "../" "page:\"section\",index:$((i - 1))"
      printf '    <article class="wrap doc" id="doc">\n'
      printf '      <p style="color:var(--fg-faint)">본문을 불러오는 중…</p>\n'
      printf '    </article>\n'
      printf '    <nav class="pagenav js-pagenav" aria-label="이전·다음 섹션"></nav>\n'
      printf '<script type="text/markdown" id="markdown-source">\n'
      cat "$secfile"
      printf '</'
      printf 'script>\n'
      shell_tail "../" "$quiz_scripts"
    } > "${id}/${page}"
  done

  # ---- 6) 검색용 본문 (검색을 열 때만 내려받음) ----
  {
    printf 'window.EIP_SEARCH_%s = [' "$id"
    i=0
    while [ "$i" -lt "$total" ]; do
      i=$((i + 1))
      [ "$i" -gt 1 ] && printf ','
      printf '\n{"f":"%s","t":"%s","x":"' \
        "$(printf 's%02d.html' "$i")" \
        "$(esc "$(sed -n "${i}p" "$TMP/labels.txt")")"
      awk '{ sub(/\r$/,""); gsub(/\\/,"\\\\"); gsub(/"/,"\\\""); printf "%s\\n", $0 }' \
        "$(printf '%s/sec%02d.md' "$TMP" "$i")"
      printf '"}'
    done
    printf '\n];\n'
  } > "assets/search-${id}.js"

  rm -rf "$TMP"
  echo "  ✓ ${id}.html + ${id}/ (${total}개 섹션)  ←  ${md}"
done

# ---- 7) 전 챕터 목차 ----
# 챕터 페이지 밖(오답노트·모의 문제지·메모 모아보기)에서 섹션 제목을 쓰기 위한 파일.
# fetch 로 읽으면 file:// 에서 CORS 로 막히므로 전역 변수를 담은 스크립트로 만든다.
{
  printf '/* build.sh 가 생성한다. 직접 고치지 말 것.\n'
  printf '   t = 챕터 제목 · bank = 문제 은행 유무 · s = 섹션 목록 {f 파일, n 번호, t 제목} */\n'
  printf 'window.EIP_TOC = {%s};\n' "$toc_js"
} > "assets/toc.js"
echo "  ✓ assets/toc.js (전 챕터 목차)"

echo ""
echo "빌드 완료. ${sources[*]} → 챕터 목차 + 섹션 페이지"
