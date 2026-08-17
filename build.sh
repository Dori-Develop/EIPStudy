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
<script src=\"../assets/quiz.js\"></script>
<script src=\"../assets/concept.js\"></script>"
  fi

  # 메모는 은행 유무와 상관없이 모든 섹션에 붙는다.
  # 🚨 quiz.js 뒤여야 한다 — 둘 다 "학습 완료" 버튼 앞에 끼워 넣는 방식이라
  #    먼저 실린 쪽이 위로 간다. 메모 카드는 퀴즈 아래에 와야 한다.
  # dialog.js 는 memo.js 의 「메모 지우기」가 쓴다 (T32 에서 confirm 을 걷어냈다)
  # 🔤 약어 툴팁(T21) — 사전 하나로 전 챕터에 자동 적용된다. 본문은 손대지 않는다.
  #    17KB 를 섹션마다 더 싣는 값으로 본문 어디서나 뜻을 볼 수 있다.
  #    ⚠️ abbr.js 는 app.js 의 후처리 단계가 부른다 — 순서는 상관없지만 둘 다 있어야 한다.
  sec_scripts="${quiz_scripts}
<script src=\"../assets/dialog.js\"></script>
<script src=\"../assets/memo.js\"></script>
<script src=\"../assets/glossary-data.js\"></script>
<script src=\"../assets/abbr.js\"></script>"

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
    <a href="${base}chapters.html" class="js-back">← 학습 정리본</a>
    <small class="js-where">${subtitle}</small>
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
<script src="${base}assets/app.js"></script>
<script src="${base}assets/toc.js"></script>
<!-- 🔒 섹션별 출제 빈도 (T50). EIP_CHAPTER 이 있어야 하므로 app.js 다음 -->
<script src="${base}assets/secrank.js"></script>${extra}
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
      <footer class="footer">
        <nav class="toolnav js-toolnav" aria-label="다른 학습 도구"></nav>
      </footer>
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
      printf '    <nav class="pagenav js-pagenav" aria-label="이전·다음 섹션"></nav>
    <footer class="footer">
      <nav class="toolnav js-toolnav" aria-label="다른 학습 도구"></nav>
    </footer>\n'
      printf '<script type="text/markdown" id="markdown-source">\n'
      cat "$secfile"
      printf '</'
      printf 'script>\n'
      shell_tail "../" "$sec_scripts"
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

# ---- 8) 약어 사전 (glossary.html) ----
# 본문에서 "약어(풀네임)" 꼴을 훑어 assets/glossary-data.js 를 만든다.
# 섹션 제목은 담지 않는다 — toc.js 에 이미 있어서 [챕터, 섹션번호]만 있으면 찾아진다.
#
# ⚠️ 한글은 여러 바이트라 [가-힣] 같은 문자 "범위" 를 쓰면 깨진다.
#    범위 대신 ASCII 여부([A-Za-z] · [^ -~])로 뒤집어 판정한다.
#    (같은 이유로 2) 의 섹션 제목도 sed 로 처리하고 있다)
GLOSS_TSV=".glossarytmp"
GLOSS_KO=".glossaryko"

# 8-1) 🔒 한글명 덮어쓰기 표 — **본문에서 캔 값보다 이 표를 우선한다.**
#
# 본문이 한글명을 늘 나란히 적어 주지는 않는다. `**NAC**(Network Access Control)` 처럼
# 풀네임만 붙는 자리가 많아 62개까지만 자동으로 채워졌다. 나머지를 여기서 채운다.
#
# 🚨 **음역(소리만 옮긴 것)은 넣지 않는다.** JSON·REST·SOAP·SSD·XP 처럼
#    한국어로 부르는 이름이 따로 없는 것은 **비워 두는 편이 옳다** —
#    「제이슨」 같은 것을 넣으면 사전이 거짓말을 한다.
# 🚨 **고유명사도 비운다.** RSA·ARIA·GoF·MD5·TFN·NTAF 는 사람·기관 이름의 머리글자다.
#
# 📌 생성물(assets/glossary-data.js)을 직접 고치면 다음 빌드에 날아간다. 표는 여기다.
cat > "$GLOSS_KO" <<'GLOSSKO'
AES	고급 암호화 표준
AH	인증 헤더
API	응용 프로그램 인터페이스
APM	애플리케이션 성능 관리
ARP	주소 결정 프로토콜
BaaS	서비스형 블록체인
BGP	경계 게이트웨이 프로토콜
CBD	컴포넌트 기반 개발
COCOMO	구성적 비용 산정 모형
CRM	고객 관계 관리
CVS	동시 버전 시스템
DBMS	데이터베이스 관리 시스템
DCL	데이터 제어어
DES	데이터 암호화 표준
DSA	전자 서명 알고리즘
DTD	문서 형식 정의
EAI	전사적 응용 통합
ECC	타원 곡선 암호
ERP	전사적 자원 관리
ESM	통합 보안 관리
ESP	캡슐화 보안 페이로드
ETL	추출·변환·적재
FCFS	선입 선처리
FDD	기능 중심 개발
FP	기능 점수
HCI	인간 컴퓨터 상호작용
HDLC	고급 데이터 링크 제어
HIDS	호스트 기반 침입 탐지 시스템
HIPO	계층적 입력 처리 출력
HRN	최고 응답률 우선
HTML	하이퍼텍스트 마크업 언어
HTTP	하이퍼텍스트 전송 규약
ICMP	인터넷 제어 메시지 프로토콜
IDEA	국제 데이터 암호화 알고리즘
IGMP	인터넷 그룹 관리 프로토콜
IP	인터넷 프로토콜
IPSec	IP 보안 프로토콜
JDBC	자바 데이터베이스 연결
KDSI	전달된 소스 코드 천 줄
KLOC	소스 코드 천 줄
L2TP	2계층 터널링 프로토콜
LFU	최소 빈도 사용
LRU	최근 최소 사용
MAC	강제 접근 통제 · 매체 접근 제어(MAC 주소)
MEMS	초소형 정밀 기계 기술
NAC	네트워크 접근 제어
NDN	데이터 중심 네트워킹
NFC	근거리 무선 통신
NFV	네트워크 기능 가상화
NIDS	네트워크 기반 침입 탐지 시스템
NUR	최근 미사용
ODBC	개방형 데이터베이스 연결
OLAP	온라인 분석 처리
OMG	객체 관리 그룹
OMT	객체 모델링 기법
ORM	객체 관계 매핑
OSI	개방형 시스템 상호 연결
OSPF	최단 경로 우선
OTP	일회용 비밀번호
PERT	프로그램 평가 및 검토 기법
PnP	자동 인식 기능
RAID	복수 배열 독립 디스크
RARP	역주소 결정 프로토콜
RIP	라우팅 정보 프로토콜
RPA	로봇 프로세스 자동화
RPO	목표 복구 시점
RTO	목표 복구 시간
SCM	공급망 관리 · 형상 관리
SCR	2차 기회 교체
SDN	소프트웨어 정의 네트워킹
SIEM	보안 정보·이벤트 관리
SJF	최단 작업 우선
SPICE	소프트웨어 처리 개선 및 능력 평가
SQL	구조적 질의 언어
SRT	최단 잔여 시간 우선
SSH	보안 셸
SSO	통합 인증
TCL	트랜잭션 제어어
TCP	전송 제어 프로토콜
TDE	투명 데이터 암호화
TKIP	임시 키 무결성 프로토콜
TOCTOU	검사 시점과 사용 시점
TPM	신뢰 플랫폼 모듈
UDP	사용자 데이터그램 프로토콜
UML	통합 모델링 언어
URL	통합 자원 위치
UWB	초광대역
UX	사용자 경험
WEP	유선 동등 프라이버시
WSDL	웹 서비스 기술 언어
XML	확장 마크업 언어
XSL	확장 스타일시트 언어
GLOSSKO
: > "$GLOSS_TSV"

for md in "${sources[@]}"; do
  awk -v ch="$(basename "$md" .md)" '
    BEGIN {
      sec = 0; fence = 0
      # 대문자로 쓰이지만 약어가 아닌 것 — SQL·프로그래밍 예약어와 관계 연산자.
      # 풀네임이 붙을 리 없는데 "한글명(KEYWORD)" 꼴로 본문에 자주 나온다.
      split("AND OR NOT IN ALL ANY EXISTS UNION INTERSECT EXCEPT MINUS SELECT INSERT UPDATE DELETE WHERE FROM JOIN GROUP ORDER HAVING INTO VALUES SET CASE WHEN THEN ELSE END NULL TRUE FALSE IF FOR WHILE DO BREAK CONTINUE RETURN OUT OUTPUT INPUT PRINT NEW CLASS PUBLIC PRIVATE STATIC VOID DIFFERENCE INTERSECTION PRODUCT DIVISION PROJECT SELECTION", bl, " ")
      for (bi in bl) BLOCK[bl[bi]] = 1
    }

    function trim(s) { gsub(/^[ \t]+|[ \t]+$/, "", s); return s }

    # 🚨 **awk 의 length() 는 바이트를 센다.** 한글 한 자가 3바이트라
    #    "침입 탐지 시스템"(8자)이 26바이트로 세어져 길이 제한에 걸려 버려졌다 —
    #    **한글명 151개 중 122개가 비어 있던 진짜 이유가 이것이었다** (T20, 08-17).
    #    ASCII 는 [ -~] 로 안전하게 세고(문자 범위·부정 클래스는 금지),
    #    나머지는 한글·전각 문장부호라 전부 3바이트다.
    function charLen(s,   i, c, a) {
      a = 0
      for (i = 1; i <= length(s); i++) {
        c = substr(s, i, 1)
        if (c ~ /[ -~]/) a++
      }
      return a + (length(s) - a) / 3
    }

    function plain(s) {
      gsub(/\*\*/, "", s); gsub(/`/, "", s)
      gsub(/<br>/, " ", s); gsub(/<br\/>/, " ", s)
      return s
    }

    # 괄호 뒤가 그 칸(또는 줄)의 끝인가. 별표(★)와 공백은 끝으로 친다.
    function cellEnds(rest) {
      gsub(/[ \t]/, "", rest)
      gsub(/★|☆/, "", rest)
      return (rest == "" || substr(rest, 1, 1) == "|")
    }

    # 마지막 콤마의 자리. awk 에 lastIndexOf 가 없어 직접 찾는다.
    function lastComma(s,   i) {
      for (i = length(s); i >= 1; i--) { if (substr(s, i, 1) == ",") return i }
      return 0
    }

    # 약어답게 생겼는가 — 대문자 둘 이상, 소문자는 둘 이하.
    # GoF·PnP·IPSec·BaaS 는 통과하고 Check-In·Fan-Out·End-to-End 은 걸린다.
    function isAbbr(a,   up, lo, i, c) {
      if (length(a) < 2 || length(a) > 15) return 0
      if (a !~ /^[A-Za-z][A-Za-z0-9\/&.+-]*$/) return 0
      up = 0; lo = 0
      for (i = 1; i <= length(a); i++) {
        c = substr(a, i, 1)
        if (c ~ /[A-Z]/) up++; else if (c ~ /[a-z]/) lo++
      }
      return up >= 2 && lo <= 2
    }

    # 괄호 안이 정말 그 약어의 풀이인가 — 약어의 글자가 순서대로 나타나야 한다.
    #   COCOMO ⊂ COnstructive COst MOdel  ✅
    #   SPICE  ⊄ ISO/IEC 15504            ❌ 버전 번호일 뿐
    #   SADT   ⊄ SoftTech                 ❌ 만든 회사일 뿐
    function expands(a, full,   ua, uf, i, j, n) {
      ua = toupper(a); gsub(/[^A-Z0-9]/, "", ua)
      uf = toupper(full); gsub(/[^A-Z0-9]/, "", uf)
      if (ua == "" || uf == "") return 0
      # 풀이 안에 약어가 낱말로 그대로 있으면 풀이가 아니다 — SQL(Dynamic SQL)
      if (toupper(full) ~ ("(^|[^A-Z])" toupper(a) "([^A-Z]|$)")) return 0
      j = 1
      for (i = 1; i <= length(ua); i++) {
        n = index(substr(uf, j), substr(ua, i, 1))
        if (n == 0) return 0
        j = j + n
      }
      return 1
    }

    # 여는 괄호 앞에서 한글명을 건진다.
    # 제목(#)이나 표 칸(|)처럼 시작점이 분명할 때만 캔다 —
    # 산문 한가운데서는 어디부터가 이름인지 알 수 없다.
    function korean(before, isHead,   s, n, parts) {
      korRank = 0
      if (isHead) { sub(/^#+[ \t]*/, "", before); s = before; korRank = 1 }
      else if (index(before, "|") > 0) { n = split(before, parts, /\|/); s = parts[n]; korRank = 2 }
      else return ""
      s = plain(s)
      sub(/^[ \t]*[(]?[0-9]+[).][ \t]*/, "", s)
      gsub(/①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩|⑪|⑫/, "", s)
      s = trim(s); sub(/[ \t]*[-·:,]+$/, "", s); s = trim(s)
      if (s == "" || charLen(s) > 20) { korRank = 0; return "" }   # 🚨 바이트가 아니라 글자 수
      if (s ~ /[A-Za-z]/) { korRank = 0; return "" }   # 영문이 섞였으면 이름이 아니다
      if (s !~ /[^ -~]/) { korRank = 0; return "" }    # ASCII 뿐이면 한글이 없다 ("&")
      return s
    }

    function emit(a, full, kor) {
      if (!isAbbr(a)) return
      if (a == toupper(a) && (a in BLOCK)) return
      # 🚨 **풀이가 아니면 그 자리의 한글명도 못 믿는다.**
      #    `### 동적 SQL(Dynamic SQL)` 은 SQL 을 **풀이하는 것이 아니라 한정하는** 자리다.
      #    (풀이 안에 약어가 그대로 있어 expands() 가 걸러 낸다.)
      #    그런데 앞의 「동적」을 이름으로 캐서 **SQL 의 한글명이 「동적」** 이 돼 있었다.
      #    사용자가 잡았다 — 💬 *"SQL 뜻이 동적 인데 이거 맞아?"*
      if (full != "" && !expands(a, full)) { full = ""; kor = "" }
      if (full == "" && kor == "") return
      # 풀네임이 없으면 짧은 것만 — DIFFERENCE 같은 전각 용어가 섞이는 것을 막는다
      if (full == "" && length(a) > 6) return
      print ch "\t" sec "\t" a "\t" full "\t" kor "\t" (kor == "" ? 9 : korRank)
    }

    {
      line = $0; sub(/\r$/, "", line)
      if (line ~ /^```/) { fence = 1 - fence; next }
      if (fence) next
      if (line ~ /^## /) sec++
      if (sec == 0) next

      isHead = (line ~ /^#{2,4} /)
      work = plain(line)
      pos = 1
      while (1) {
        rest = substr(work, pos)
        if (match(rest, /\([^()]*\)/) == 0) break
        start = pos + RSTART - 1
        inner = trim(substr(work, start + 1, RLENGTH - 2))
        before = substr(work, 1, start - 1)
        pos = start + RLENGTH

        # 🚨 **이름은 칸(또는 제목) 전체여야 한다.** 괄호 뒤에 그 칸의 글이 더 있으면
        #    앞의 한글은 이름이 아니라 **문장 조각**이다.
        #      | **API 방식** | **애플리케이션 레벨**에서 암호 모듈(API)을 적용 |
        #    ← 이것을 이름으로 캐서 "애플리케이션 레벨에서 암호 모듈" 이 들어갔었다.
        atEnd = cellEnds(substr(work, pos))
        kor = atEnd ? korean(before, isHead && start > 1) : ""

        # 괄호 안에 한글명이 함께 있는 꼴 — ABBR(Full Name, 한글명)
        #   | **VPN**(Virtual Private Network, 가상 사설 통신망) | …
        # 이 자리를 안 보고 있어서 보안 솔루션 아홉 개가 통째로 비어 있었다.
        innerKor = ""
        ci = lastComma(inner)
        if (ci > 0) {
          tail2 = trim(substr(inner, ci + 1))
          if (tail2 !~ /[A-Za-z]/ && tail2 ~ /[^ -~]/ && charLen(tail2) <= 20) {
            innerKor = tail2
            inner = trim(substr(inner, 1, ci - 1))
          }
        }

        # ① 한글명(ABBR; Full Name)
        if (inner ~ /;/) {
          p = index(inner, ";")
          # 🚨 `korRank` 를 여기서 무조건 2 로 덮어썼다가 **제목에서 캔 이름(1등급)이
          #    표 칸(2등급)에 밀렸다.** `### 통합 개발 환경(IDE; …)` 이 있는데도
          #    `| 구현 도구(IDE) |` 가 이겨서 IDE 의 한글명이 「구현 도구」였다.
          #    괄호 안에서 캔 것(innerKor)을 쓸 때만 2 로 내린다.
          kor1 = kor
          if (kor1 == "") { kor1 = innerKor; if (kor1 != "") korRank = 2 }
          emit(trim(substr(inner, 1, p - 1)), trim(substr(inner, p + 1)), kor1)
          continue
        }
        # ② ABBR(Full Name) — 괄호 바로 앞 낱말이 약어
        if (inner ~ /^[A-Za-z][A-Za-z0-9 ,.\/&*+-]*$/ && inner ~ / /) {
          tail = before
          sub(/^.*[^A-Za-z0-9\/&.+-]/, "", tail)
          a = trim(tail)
          if (isAbbr(a)) {
            kor2 = ""
            if (atEnd) kor2 = korean(substr(before, 1, length(before) - length(a)), isHead && start > 1)
            if (kor2 == "") { kor2 = innerKor; if (kor2 != "") korRank = 2 }
            emit(a, inner, kor2)
            continue
          }
        }
        # ③ 한글명(ABBR) — 풀네임 없이 이름만
        if (inner ~ /^[A-Za-z][A-Za-z0-9\/&.+-]*$/ && kor != "") emit(inner, "", kor)

        # 🚨 **`ABBR(한글명)` 꼴은 캐지 않는다.** 부록 요약이 그 모양이라 한때 넣어 봤는데
        #    `SUM(속성명)` · `CREATE(생성)` 처럼 **문법 예시와 낱말 풀이까지** 딸려 들어와
        #    항목이 151 → 224 로 불고 절반이 틀린 이름이 됐다.
        #    **괄호 안의 한글은 이름일 수도, 그냥 설명일 수도 있다** — 가릴 방법이 없다.
        #    남는 것은 아래 8-1) 의 **덮어쓰기 표**로 채운다.
      }
    }
  ' "$md" >> "$GLOSS_TSV"
done

# 8-2) 약어가 "나오는 곳" 을 모은다.
# 위에서 모은 것은 풀네임이 붙은 정의 지점뿐이라 약어당 한두 곳에 그친다.
# 실제로는 DFD 처럼 여러 챕터에 흩어져 나오는 것이 많아 그쪽이 더 쓸모 있다.
GLOSS_ABBR=".glossaryabbr"
GLOSS_HITS=".glossaryhits"
cut -f3 "$GLOSS_TSV" | sort -u > "$GLOSS_ABBR"
: > "$GLOSS_HITS"

for md in "${sources[@]}"; do
  awk -v ch="$(basename "$md" .md)" '
    NR == FNR { KNOWN[$1] = 1; next }          # 첫 파일 = 약어 목록
    {
      line = $0; sub(/\r$/, "", line)
      if (line ~ /^```/) { fence = 1 - fence; next }
      if (fence) next                          # 코드 블록 안의 SQL 예약어 등은 세지 않는다
      if (line ~ /^## /) sec++
      if (sec == 0) next
      # 영숫자가 아닌 것은 전부 구분자 — 한글이 바로 붙은 "DFD와" 도 갈라진다
      gsub(/[^A-Za-z0-9]/, " ", line)
      n = split(line, tok, " ")
      for (i = 1; i <= n; i++) {
        if (tok[i] in KNOWN) print tok[i] "\t" ch "\t" sec
      }
    }
  ' "$GLOSS_ABBR" "$md" >> "$GLOSS_HITS"
done

{
  printf '/* build.sh 가 content/*.md 에서 뽑아 생성한다. 직접 고치지 말 것.\n'
  printf '   a 약어 · f 풀네임 · k 한글명 · s 나오는 곳 [챕터, 섹션 순번(0부터)]\n'
  printf '   섹션 제목은 assets/toc.js 에 있으므로 여기에 담지 않는다. */\n'
  printf 'window.EIP_GLOSSARY = [\n'
  awk -F'	' -v cap=8 -v kofile="$GLOSS_KO" -v deffile="$GLOSS_TSV" '
    function esc(s) { gsub(/\\/, "\\\\", s); gsub(/"/, "\\\"", s); return s }

    # 섹션 하나를 "나오는 곳" 에 더한다. 목록은 cap 개까지만 담고
    # 전체 개수(total)는 따로 세어 화면이 "외 N곳" 을 말할 수 있게 한다.
    function addSec(a, c, s,   key) {
      key = a SUBSEP c SUBSEP s
      if (key in sseen) return
      sseen[key] = 1
      total[a]++
      if (scount[a] >= cap) return
      scount[a]++
      secs[a] = secs[a] (secs[a] == "" ? "" : ",") "[\"" c "\"," (s - 1) "]"
    }

    # ---- 첫 파일: 정의 지점 (약어 · 풀네임 · 한글명) ----
    # 🔒 덮어쓰기 표 — 본문에서 캔 값보다 이것이 이긴다
    FILENAME == kofile { if ($2 != "") KO[$1] = $2; next }

    FILENAME == deffile {
      a = $3
      if (!(a in seen)) { seen[a] = 1; order[++n] = a; kr[a] = ""; krank[a] = 9 }
      # 풀네임은 서로 다른 뜻이 있을 수 있다 — SCM 은 형상 관리이자 공급망 관리다
      if ($4 != "") {
        u = toupper($4)
        if (!((a SUBSEP u) in fseen) && fcount[a] < 2) {
          fseen[a SUBSEP u] = 1; fcount[a]++
          full[a] = (full[a] == "" ? $4 : full[a] " · " $4)
        }
      }
      # 한글명은 제목에서 캔 것(1)이 표 칸(2)을 이긴다
      if ($5 != "" && $6 + 0 < krank[a]) { kr[a] = $5; krank[a] = $6 + 0 }
      addSec(a, $1, $2)      # 정의 지점을 먼저 채운다 — 가장 볼 만한 곳이다
      next
    }

    # ---- 둘째 파일: 그냥 언급된 곳 ----
    { if ($1 in seen) addSec($1, $2, $3) }

    END {
      for (i = 1; i <= n; i++) sortkey[toupper(order[i]) "\t" order[i]] = order[i]
      PROCINFO["sorted_in"] = "@ind_str_asc"
      # ⚠️ 콤마를 항목 뒤가 아니라 앞에 찍는다. 배열 끝에 콤마가 남으면
      #    ES3 에서는 빈 칸이 하나 더 생겨 G[G.length-1] 이 undefined 가 된다.
      first = 1
      for (k in sortkey) {
        a = sortkey[k]
        ko = (a in KO) ? KO[a] : kr[a]     # 🔒 표가 본문보다 세다
        printf "%s{a:\"%s\",f:\"%s\",k:\"%s\",n:%d,s:[%s]}\n", (first ? "" : ","), \
               esc(a), esc(full[a]), esc(ko), total[a], secs[a]
        first = 0
      }
      # 🚨 표에만 있고 본문에 없는 약어는 **오타다.** 조용히 버리지 않고 알린다 —
      #    본문에서 약어가 사라지거나 이름이 바뀌면 표가 낡은 채로 남는다.
      for (a in KO) { if (!(a in seen)) print "!! 표에 있는데 본문에 없는 약어: " a > "/dev/stderr" }
    }
  ' "$GLOSS_KO" "$GLOSS_TSV" "$GLOSS_HITS"
  printf '];\n'
} > "assets/glossary-data.js"

gloss_n="$(wc -l < "$GLOSS_ABBR" | tr -d ' ')"
rm -f "$GLOSS_TSV" "$GLOSS_ABBR" "$GLOSS_HITS" "$GLOSS_KO"
echo "  ✓ assets/glossary-data.js (약어 ${gloss_n}개)"

# ---- 9) 암기 카드 (cards.html) ----
# 12개 챕터 전부 마지막 섹션이 "## 📌 부록 — 핵심 암기 요약" 이고
# `구분 | 암기 포인트` 2열 표다. 앞면 = 좌변 · 뒷면 = 우변.
#
# 🔒 id 는 행 번호로 매기지 않는다. 부록에 한 줄만 끼워 넣어도 그 아래가 전부 밀려
#    저장해 둔 카드가 딴 것으로 바뀐다. 좌변 텍스트를 슬러그로 만들어 쓴다.
#
# 📌 챕터별로 쪼개지 않고 파일 하나로 만든다. 은행(bank-chNN.js)은 섹션 퀴즈가
#    한 챕터만 쓰므로 쪼갤 값어치가 있지만, 암기 카드의 기본 모드는 "전체 카드"라
#    어차피 12개를 다 싣는다. 쪼개면 요청만 11개 늘어난다. 전체가 40KB 남짓이다.
{
  printf '/* build.sh 가 content/*.md 의 부록 표에서 뽑아 생성한다. 직접 고치지 말 것.\n'
  printf '   id · ch 챕터 · s 부록 섹션 순번(0부터) · f 앞면(구분) · b 뒷면(암기 포인트) */\n'
  printf 'window.EIP_CARDS = [\n'

  first_card=0
  for md in "${sources[@]}"; do
    awk -v ch="$(basename "$md" .md)" -v first="$first_card" '
      function trim(s) { gsub(/^[ \t]+|[ \t]+$/, "", s); return s }

      # 마크다운 강조를 HTML 로. <br> 는 살린다.
      # 순서가 중요하다 — 먼저 <br> 를 감춰 두고, & < > 를 이스케이프한 뒤, 강조를 편다.
      function render(s) {
        gsub(/<br[ ]*\/?>/, "\001", s)
        gsub(/&/, "\\&amp;", s)
        gsub(/</, "\\&lt;", s)
        gsub(/>/, "\\&gt;", s)
        while (match(s, /\*\*[^*]+\*\*/)) {
          s = substr(s, 1, RSTART - 1) "<b>" substr(s, RSTART + 2, RLENGTH - 4) "</b>" \
              substr(s, RSTART + RLENGTH)
        }
        while (match(s, /`[^`]+`/)) {
          s = substr(s, 1, RSTART - 1) "<code>" substr(s, RSTART + 1, RLENGTH - 2) "</code>" \
              substr(s, RSTART + RLENGTH)
        }
        gsub(/\001/, "<br>", s)
        gsub(/\\/, "\\\\", s); gsub(/"/, "\\\"", s)
        return s
      }

      # 좌변 텍스트 → id 슬러그.  "**결합도(약→강)**" → "결합도약강"
      # ⚠️ 한글을 살려야 하므로 [^A-Za-z0-9] 같은 부정 클래스를 쓰면 안 된다 —
      #    C 로케일에서는 바이트 단위로 매칭돼 한글이 통째로 지워진다.
      #    ASCII 만 담긴 클래스([ -~])로 "ASCII 인쇄문자인가"를 물어 한 글자씩 거른다.
      function slug(s,   i, c, out) {
        gsub(/\*\*/, "", s); gsub(/`/, "", s); gsub(/<br[ ]*\/?>/, " ", s)
        # 여러 바이트 문장부호는 낱개 리터럴로 지운다. 클래스에 넣으면 한글 바이트를 깨뜨린다.
        gsub(/→/, "", s); gsub(/←/, "", s); gsub(/↔/, "", s); gsub(/⇒/, "", s)
        gsub(/·/, "", s); gsub(/—/, "", s); gsub(/–/, "", s); gsub(/…/, "", s)
        gsub(/★/, "", s); gsub(/📌/, "", s); gsub(/⚠️/, "", s); gsub(/💡/, "", s)
        gsub(/×/, "", s); gsub(/～/, "", s); gsub(/’/, "", s); gsub(/‘/, "", s)
        out = ""
        for (i = 1; i <= length(s); i++) {
          c = substr(s, i, 1)
          if (c ~ /[A-Za-z0-9]/) { out = out c; continue }
          if (c ~ /[ -~]/) continue          # 그 밖의 ASCII(공백·괄호·기호)는 버린다
          out = out c                        # ASCII 가 아닌 것(한글 등)은 그대로 둔다
        }
        return out
      }

      BEGIN { sec = 0; fence = 0; inApx = 0; n = first + 0 }

      {
        line = $0; sub(/\r$/, "", line)
        if (line ~ /^```/) { fence = 1 - fence; next }
        if (fence) next
        if (line ~ /^## /) { sec++; inApx = (line ~ /부록/) }
        if (!inApx) next
        if (line !~ /^[ \t]*\|/) next

        cnt = split(line, cell, "|")
        # "| 앞 | 뒤 |" 는 split 결과가 4칸(양끝 빈칸 포함)이다. 2열이 아니면 버린다.
        if (cnt != 4) next
        f = trim(cell[2]); b = trim(cell[3])
        if (f == "" || b == "") next
        if (f ~ /^:?-+:?$/) next                                     # |---|---| 구분줄
        if (f == "구분" || b == "암기 포인트") next                  # 머리글

        id = slug(f)
        if (id == "") id = "row"
        if (id in used) { used[id]++; key = id "-" used[id] } else { used[id] = 1; key = id }

        printf "%s{id:\"%s-card-%s\",ch:\"%s\",s:%d,f:\"%s\",b:\"%s\"}\n", \
               (n ? "," : ""), ch, key, ch, sec - 1, render(f), render(b)
        n++
      }

      END { print n > "/dev/stderr" }
    ' "$md" 2> ".cardcount"
    first_card="$(cat .cardcount)"
  done

  printf '];\n'
} > "assets/cards-data.js"

card_n="$first_card"
rm -f .cardcount
echo "  ✓ assets/cards-data.js (카드 ${card_n}장)"

# ---- 10) 🔒 기출 풀 목록 (있을 때만) ----
# past.js 가 어느 회차 파일을 불러야 하는지 알려 주는 목록.
# 🚨 pool/ 은 **비공개 자료**다 — .git/info/exclude 에 있어 공개 저장소에 이름조차 안 남는다.
#    폴더가 없으면 이 단계는 통째로 건너뛴다. 빌드는 pool/ 없이도 정상이어야 한다.
if [ -d pool ]; then
  {
    printf '/* build.sh 가 생성한다. 직접 고치지 말 것.\n'
    printf '   🔒 기출 풀 파일 목록. 이 파일과 pool/*.js 는 공개 저장소에 넣지 않는다. */\n'
    printf 'window.EIP_POOL_FILES = ['
    sep=''
    for f in pool/*.js; do
      base="$(basename "$f")"
      [ "$base" = "pool-index.js" ] && continue
      printf '%s"%s"' "$sep" "$base"
      sep=','
    done
    printf '];\n'
  } > "pool/pool-index.js"
  pool_n="$(ls pool/*.js 2>/dev/null | grep -v 'pool-index.js' | wc -l | tr -d ' ')"
  echo "  🔒 pool/pool-index.js (기출 ${pool_n}회차 — 비공개)"
fi

echo ""
echo "빌드 완료. ${sources[*]} → 챕터 목차 + 섹션 페이지"
