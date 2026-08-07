/* ==========================================================================
   10. 프로그래밍 언어 활용 — 문제 은행

   id  ch10-sNN-MM   한 번 부여하면 절대 바꾸지 않는다 (오답노트가 참조)
   sec  섹션 번호 (chNN/sNN.html 과 동일)
   t    ox | short | choice | code
   a    ox → true/false · short/code → 정답 문자열 배열 · choice → 정답 인덱스(0-based)
   c    choice 의 보기 배열
   d    난이도 1(쉬움) ~ 3(어려움)
   y    이 개념이 출제된 연도. 확인된 것만 적는다 — 추측으로 채우지 말 것

   ⚠️ 음수·부호가 답인 문항은 short 가 아니라 code 로 낸다.
      short 는 채점 시 '-' 를 지우고 한 번 더 비교하므로 -13 과 13 이 같아진다.
   ========================================================================== */
window.EIP_BANK_ch10 = [

  /* ===================================================== s01 데이터 타입과 변수 */

  {
    id: 'ch10-s01-01', ch: 10, sec: 1,
    t: 'short',
    q: 'C 언어에서 <b>unsigned char</b> 가 표현할 수 있는 값의 범위는?',
    a: ['0 ~ 255', '0~255', '0에서 255', '0 - 255'],
    why: '<b>unsigned</b> 를 붙이면 음수를 표현하지 않는 대신 양수 범위가 2배가 된다. char 는 1Byte 이므로 −128~127 이 <b>0~255</b> 가 된다.',
    d: 2, y: [], tag: ['자료형', 'unsigned'], lang: null, code: null
  },

  {
    id: 'ch10-s01-02', ch: 10, sec: 1,
    t: 'ox',
    q: 'C 언어에서 <b>long</b> 과 <b>int</b> 는 크기가 같다.',
    a: true,
    why: '둘 다 <b>4Byte</b> 다. 8Byte 정수가 필요하면 <b>long long</b> 을 쓴다. Java 의 long 이 8Byte 인 것과 헷갈리지 말 것.',
    d: 2, y: [], tag: ['자료형', 'C'], lang: null, code: null
  },

  {
    id: 'ch10-s01-03', ch: 10, sec: 1,
    t: 'ox',
    q: 'Java 의 <b>char</b> 는 C 언어와 마찬가지로 1Byte 다.',
    a: false,
    why: 'Java 의 char 는 <b>2Byte</b> 다. C 는 1Byte. 문자 타입 크기는 두 언어가 다르다.',
    d: 2, y: [], tag: ['자료형', 'Java'], lang: null, code: null
  },

  {
    id: 'ch10-s01-04', ch: 10, sec: 1,
    t: 'short',
    q: 'Java 에는 있고 C 언어의 기본 데이터 타입에는 없는, 참·거짓을 담는 <b>논리형</b> 타입의 이름은?',
    a: ['boolean', 'bool'],
    why: 'Java 의 <b>boolean</b> 은 1Byte 다. C 언어의 기본 타입 표에는 문자·정수·부동 소수점만 있고 논리형이 없다.',
    d: 1, y: [], tag: ['자료형', 'Java'], lang: null, code: null
  },

  {
    id: 'ch10-s01-05', ch: 10, sec: 1,
    t: 'choice',
    q: '기억 클래스 중 <b>스택(Stack)</b> 영역에 저장되는 것은?',
    c: ['자동 변수(auto)', '정적 변수(static)', '외부 변수(extern)', '레지스터 변수(register)'],
    a: 0,
    why: '<b>자동 변수(auto)</b> 만 스택에 잡힌다. static·extern 은 <b>데이터 영역</b>, register 는 <b>레지스터</b>에 저장된다.',
    d: 2, y: [], tag: ['기억클래스'], lang: null, code: null
  },

  {
    id: 'ch10-s01-06', ch: 10, sec: 1,
    t: 'short',
    q: '기억 클래스 중 <b>데이터 영역</b>에 저장되고 <b>프로그램 전체</b>에서 존재하며, 함수 내부에서도 선언할 수 있는 변수를 지정하는 예약어는?',
    a: ['static', '정적 변수', '정적변수'],
    why: '<b>static</b>(정적 변수)이다. extern 도 데이터 영역·프로그램 전체이지만 <b>외부</b> 변수를 참조할 때 쓴다. static 은 내부/외부 모두 가능하다.',
    d: 2, y: [], tag: ['기억클래스', 'static'], lang: null, code: null
  },

  {
    id: 'ch10-s01-07', ch: 10, sec: 1,
    t: 'short',
    q: '기억 클래스 중 <b>레지스터</b>에 값을 저장해 접근 속도를 높이려는 목적으로 쓰는 예약어는?',
    a: ['register', '레지스터 변수', '레지스터변수'],
    why: '<b>register</b> 다. 존재 범위는 auto 와 같이 <b>함수 내부</b>다.',
    d: 2, y: [], tag: ['기억클래스'], lang: null, code: null
  },

  {
    id: 'ch10-s01-08', ch: 10, sec: 1,
    t: 'ox',
    q: '변수명은 숫자로 시작할 수 있다.',
    a: false,
    why: '첫 글자는 <b>영문자나 밑줄(_)</b> 이어야 한다. 숫자로 시작할 수 없다. 두 번째 글자부터는 숫자를 쓸 수 있다.',
    d: 1, y: [], tag: ['변수명'], lang: null, code: null
  },

  {
    id: 'ch10-s01-09', ch: 10, sec: 1,
    t: 'ox',
    q: '변수명은 대·소문자를 구분하지 않으므로 <code>total</code> 과 <code>Total</code> 은 같은 변수다.',
    a: false,
    why: '<b>대·소문자를 구분한다.</b> total 과 Total 은 서로 다른 변수다.',
    d: 1, y: [], tag: ['변수명'], lang: null, code: null
  },

  {
    id: 'ch10-s01-10', ch: 10, sec: 1,
    t: 'choice',
    q: '변수명으로 <b>사용할 수 있는</b> 것은?',
    c: ['_total2', '2total', 'total price', 'int'],
    a: 0,
    why: '<b>_total2</b> 는 밑줄로 시작하고 영문자·숫자·밑줄만 썼으므로 적법하다. <code>2total</code> 은 숫자로 시작해서, <code>total price</code> 는 공백이 있어서, <code>int</code> 는 <b>예약어</b>라서 쓸 수 없다.',
    d: 2, y: [], tag: ['변수명'], lang: null, code: null
  },

  /* ============================================================= s02 연산자 */

  {
    id: 'ch10-s02-01', ch: 10, sec: 2,
    t: 'code', lang: 'c',
    code: 'int a = 5, b;\nb = ++a;\nprintf("%d", b);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['6'],
    why: '<b>전치(++a)</b> 는 먼저 1을 증가시킨 뒤 그 값을 쓴다. a 가 6이 되고 b 에도 6이 들어간다.',
    d: 1, y: [], tag: ['증감연산자', '전치']
  },

  {
    id: 'ch10-s02-02', ch: 10, sec: 2,
    t: 'code', lang: 'c',
    code: 'int a = 5, b;\nb = a++;\nprintf("%d %d", b, a);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['5 6'],
    why: '<b>후치(a++)</b> 는 먼저 연산에 쓴 뒤 1을 증가시킨다. b 에는 증가 전 값 5가 들어가고, 그 뒤 a 가 6이 된다.',
    d: 2, y: [], tag: ['증감연산자', '후치']
  },

  {
    id: 'ch10-s02-03', ch: 10, sec: 2,
    t: 'code', lang: 'c',
    code: 'int x = 5;\nprintf("%d", x++ + ++x);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['12'],
    why: '<code>x++</code> 는 <b>5를 쓰고</b> x 를 6으로 만든다. 이어서 <code>++x</code> 는 x 를 <b>7로 만든 뒤 7을 쓴다</b>. 따라서 5 + 7 = <b>12</b>.',
    d: 3, y: [], tag: ['증감연산자']
  },

  {
    id: 'ch10-s02-04', ch: 10, sec: 2,
    t: 'code', lang: 'c',
    code: 'int a = 12, b = 10;\nprintf("%d", a & b);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['8'],
    why: 'a = 1100, b = 1010. <b>AND</b> 는 둘 다 1인 자리만 1이므로 1000 = <b>8</b>.',
    d: 2, y: [], tag: ['비트연산자', 'AND']
  },

  {
    id: 'ch10-s02-05', ch: 10, sec: 2,
    t: 'code', lang: 'c',
    code: 'int a = 12, b = 10;\nprintf("%d", a | b);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['14'],
    why: 'a = 1100, b = 1010. <b>OR</b> 는 하나라도 1이면 1이므로 1110 = <b>14</b>.',
    d: 2, y: [], tag: ['비트연산자', 'OR']
  },

  {
    id: 'ch10-s02-06', ch: 10, sec: 2,
    t: 'code', lang: 'c',
    code: 'int a = 12, b = 10;\nprintf("%d", a ^ b);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['6'],
    why: 'a = 1100, b = 1010. <b>XOR</b> 는 서로 다른 자리만 1이므로 0110 = <b>6</b>.',
    d: 2, y: [], tag: ['비트연산자', 'XOR']
  },

  {
    id: 'ch10-s02-07', ch: 10, sec: 2,
    t: 'code', lang: 'c',
    code: 'int a = 12;\nprintf("%d", ~a);',
    q: '다음 C 코드의 출력 결과를 쓰시오. (부호까지 정확히 쓸 것)',
    a: ['-13', '−13'],
    why: '<b>~</b> 는 모든 비트를 반전한다. 2의 보수 체계에서 <code>~n</code> 은 <b>−(n+1)</b> 이므로 −13 이다.',
    d: 3, y: [], tag: ['비트연산자', 'NOT']
  },

  {
    id: 'ch10-s02-08', ch: 10, sec: 2,
    t: 'code', lang: 'c',
    code: 'int a = 12;\nprintf("%d %d", a << 1, a >> 1);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['24 6'],
    why: '<b>왼쪽 시프트는 ×2, 오른쪽 시프트는 ÷2</b> 다. 1100 &lt;&lt; 1 = 11000 = 24, 1100 &gt;&gt; 1 = 110 = 6.',
    d: 2, y: [], tag: ['비트연산자', '시프트']
  },

  {
    id: 'ch10-s02-09', ch: 10, sec: 2,
    t: 'choice',
    q: '연산자 우선순위를 <b>높은 것부터</b> 바르게 나열한 것은?',
    c: [
      '단항 → 산술 → 시프트 → 관계 → 비트 → 논리 → 삼항 → 대입 → 순서',
      '산술 → 단항 → 관계 → 시프트 → 논리 → 비트 → 대입 → 삼항 → 순서',
      '단항 → 산술 → 관계 → 시프트 → 논리 → 비트 → 삼항 → 대입 → 순서',
      '산술 → 시프트 → 단항 → 비트 → 관계 → 논리 → 대입 → 삼항 → 순서'
    ],
    a: 0,
    why: '암기: <b>"단산시관비논삼대순"</b> — 단항·산술·시프트·관계·비트·논리·삼항·대입·순서. 이 순서 자체가 자주 출제된다.',
    d: 3, y: [], tag: ['우선순위'], lang: null, code: null
  },

  {
    id: 'ch10-s02-10', ch: 10, sec: 2,
    t: 'ox',
    q: '논리 연산자(<code>&amp;&amp;</code>, <code>||</code>)는 비트 연산자(<code>&amp;</code>, <code>|</code>)보다 우선순위가 높다.',
    a: false,
    why: '<b>비트가 먼저다.</b> "단산시관<b>비논</b>삼대순" 순서에서 비트(8순위)가 논리(9순위)보다 앞선다.',
    d: 3, y: [], tag: ['우선순위'], lang: null, code: null
  },

  {
    id: 'ch10-s02-11', ch: 10, sec: 2,
    t: 'ox',
    q: '삼항 연산자(<code>? :</code>)는 대입 연산자(<code>=</code>)보다 우선순위가 높다.',
    a: true,
    why: '삼항이 10순위, 대입이 11순위다. 그래서 <code>x = a &gt; b ? a : b;</code> 에서 삼항이 먼저 계산되고 그 결과가 대입된다.',
    d: 2, y: [], tag: ['우선순위'], lang: null, code: null
  },

  {
    id: 'ch10-s02-12', ch: 10, sec: 2,
    t: 'choice',
    q: '우선순위가 <b>가장 높은</b> 연산자 그룹은?',
    c: [
      '<code>()</code> <code>[]</code> <code>-&gt;</code> <code>.</code>',
      '<code>!</code> <code>~</code> <code>++</code> <code>--</code>',
      '<code>*</code> <code>/</code> <code>%</code>',
      '<code>=</code> <code>+=</code> <code>-=</code>'
    ],
    a: 0,
    why: '<b>최우선 연산자</b>(괄호·배열 첨자·구조체 접근)가 1순위다. 그다음이 단항(2), 산술 곱셈류(3) 순이고 대입은 11순위로 거의 마지막이다.',
    d: 2, y: [], tag: ['우선순위'], lang: null, code: null
  },

  /* ============================================================= s03 제어문 */

  {
    id: 'ch10-s03-01', ch: 10, sec: 3,
    t: 'ox',
    q: '<b>while</b> 문은 조건이 처음부터 거짓이면 본문이 한 번도 실행되지 않는다.',
    a: true,
    why: 'while 은 <b>조건을 먼저 검사</b>한다. 처음부터 거짓이면 0회 실행이다.',
    d: 1, y: [], tag: ['반복문', 'while'], lang: null, code: null
  },

  {
    id: 'ch10-s03-02', ch: 10, sec: 3,
    t: 'ox',
    q: '<b>do~while</b> 문은 조건이 거짓이면 본문이 한 번도 실행되지 않는다.',
    a: false,
    why: 'do~while 은 <b>실행한 뒤에 조건을 검사</b>하므로 조건과 무관하게 <b>최소 한 번은 실행</b>된다. while 과의 이 차이가 자주 출제된다.',
    d: 1, y: [], tag: ['반복문', 'do-while'], lang: null, code: null
  },

  {
    id: 'ch10-s03-03', ch: 10, sec: 3,
    t: 'short',
    q: '조건의 참·거짓과 관계없이 본문이 <b>최소 한 번은 반드시 실행</b>되는 반복문은?',
    a: ['do~while', 'do while', 'dowhile', 'do-while문', 'do~while문'],
    why: '실행을 먼저 하고 조건을 나중에 검사하기 때문이다. for·while 은 조건을 먼저 본다.',
    d: 1, y: [], tag: ['반복문', 'do-while'], lang: null, code: null
  },

  {
    id: 'ch10-s03-04', ch: 10, sec: 3,
    t: 'code', lang: 'c',
    code: 'int sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i % 2 == 0) continue;\n    if (i > 7) break;\n    sum += i;\n}\nprintf("%d", sum);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['16'],
    why: '짝수는 <code>continue</code> 로 건너뛰므로 홀수만 남는다. 그중 7을 넘는 9에서 <code>break</code> 로 빠져나가므로 <b>1+3+5+7 = 16</b>.',
    d: 3, y: [], tag: ['반복문', 'break', 'continue']
  },

  {
    id: 'ch10-s03-05', ch: 10, sec: 3,
    t: 'code', lang: 'c',
    code: 'int i = 5;\nint n = 0;\nwhile (i > 10) {\n    n++;\n    i++;\n}\nprintf("%d", n);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['0'],
    why: 'while 은 조건을 <b>먼저</b> 검사한다. 처음부터 <code>5 &gt; 10</code> 이 거짓이라 본문이 한 번도 실행되지 않아 n 은 0 그대로다.',
    d: 2, y: [], tag: ['반복문', 'while']
  },

  {
    id: 'ch10-s03-06', ch: 10, sec: 3,
    t: 'code', lang: 'c',
    code: 'int i = 5;\nint n = 0;\ndo {\n    n++;\n    i++;\n} while (i > 10);\nprintf("%d", n);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['1'],
    why: 'do~while 은 <b>실행 후 조건 검사</b>다. 본문이 한 번 돌아 n 이 1이 되고, 그때 <code>6 &gt; 10</code> 이 거짓이라 끝난다. 바로 앞 while 문제와 비교할 것.',
    d: 2, y: [], tag: ['반복문', 'do-while']
  },

  {
    id: 'ch10-s03-07', ch: 10, sec: 3,
    t: 'code', lang: 'c',
    code: 'int x = 2;\nswitch (x) {\n    case 1: printf("A");\n    case 2: printf("B");\n    case 3: printf("C");\n    default: printf("D");\n}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['BCD'],
    why: '<b>break 가 없으면 다음 case 로 계속 흘러간다</b>(fall-through). case 2 부터 default 까지 전부 실행되어 <b>BCD</b> 가 출력된다.',
    d: 3, y: [], tag: ['switch', 'fall-through']
  },

  {
    id: 'ch10-s03-08', ch: 10, sec: 3,
    t: 'code', lang: 'c',
    code: 'int x = 2;\nswitch (x) {\n    case 1: printf("A"); break;\n    case 2: printf("B"); break;\n    case 3: printf("C"); break;\n    default: printf("D");\n}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['B'],
    why: '<code>break</code> 가 있으면 해당 case 만 실행하고 switch 를 빠져나간다. 앞 문제와의 차이가 곧 fall-through 다.',
    d: 1, y: [], tag: ['switch', 'break']
  },

  {
    id: 'ch10-s03-09', ch: 10, sec: 3,
    t: 'code', lang: 'c',
    code: 'int sum = 0;\nfor (int i = 1; i <= 5; i++) {\n    if (i == 3) continue;\n    sum += i;\n}\nprintf("%d", sum);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['12'],
    why: '<code>continue</code> 는 <b>그 회차만 건너뛰고 반복은 계속</b>한다. 3만 빠지므로 1+2+4+5 = <b>12</b>.',
    d: 2, y: [], tag: ['continue']
  },

  {
    id: 'ch10-s03-10', ch: 10, sec: 3,
    t: 'code', lang: 'c',
    code: 'int sum = 0;\nfor (int i = 1; i <= 5; i++) {\n    if (i == 3) break;\n    sum += i;\n}\nprintf("%d", sum);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['3'],
    why: '<code>break</code> 는 <b>반복문을 완전히 빠져나간다</b>. i 가 3이 되는 순간 끝나므로 1+2 = <b>3</b>. 앞 문제(continue, 12)와 비교할 것.',
    d: 2, y: [], tag: ['break']
  },

  {
    id: 'ch10-s03-11', ch: 10, sec: 3,
    t: 'choice',
    q: '반복문 안에서 <b>현재 회차만 건너뛰고 다음 반복으로 넘어가는</b> 명령은?',
    c: ['continue', 'break', 'goto', 'default'],
    a: 0,
    why: '<b>continue</b> 다. <code>break</code> 는 반복문 자체를 빠져나가고, <code>goto</code> 는 지정된 레이블로 이동한다.',
    d: 1, y: [], tag: ['continue', 'break'], lang: null, code: null
  },

  {
    id: 'ch10-s03-12', ch: 10, sec: 3,
    t: 'short',
    q: '지정된 <b>레이블(Label)</b> 위치로 실행 흐름을 옮기는 제어 명령은?',
    a: ['goto', 'goto문', 'goto 문'],
    why: '<b>goto</b> 다. 흐름을 임의로 옮겨 가독성을 해치므로 실무에서는 거의 쓰지 않지만 명령 자체는 출제 대상이다.',
    d: 1, y: [], tag: ['goto'], lang: null, code: null
  },

  {
    id: 'ch10-s03-13', ch: 10, sec: 3,
    t: 'ox',
    q: '<code>break</code> 는 반복문에서만 쓸 수 있고 <code>switch</code> 문에서는 쓸 수 없다.',
    a: false,
    why: 'break 는 <b>반복문과 switch 문 둘 다</b>에서 쓴다. switch 에서 break 를 빼면 fall-through 가 일어난다.',
    d: 2, y: [], tag: ['break', 'switch'], lang: null, code: null
  },

  /* ======================================================= s04 배열과 문자열 */

  {
    id: 'ch10-s04-01', ch: 10, sec: 4,
    t: 'ox',
    q: '배열은 <b>서로 다른 자료형</b>의 변수를 하나의 이름으로 묶는 자료 구조다.',
    a: false,
    why: '배열은 <b>같은 자료형</b>끼리만 묶는다. 서로 다른 자료형을 묶는 것은 <b>구조체</b>다.',
    d: 1, y: [], tag: ['배열'], lang: null, code: null
  },

  {
    id: 'ch10-s04-02', ch: 10, sec: 4,
    t: 'ox',
    q: '<code>int arr[5];</code> 로 선언했다면 <code>arr[5]</code> 도 사용할 수 있다.',
    a: false,
    why: '<b>인덱스는 0부터</b> 시작하므로 쓸 수 있는 것은 <code>arr[0]</code>~<code>arr[4]</code> 다. <code>arr[5]</code> 는 배열 범위를 벗어난다.',
    d: 2, y: [], tag: ['배열', '인덱스'], lang: null, code: null
  },

  {
    id: 'ch10-s04-03', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: 'int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};\nprintf("%d", arr[1][2]);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['6'],
    why: '<code>arr[1]</code> 은 두 번째 행 <code>{4, 5, 6}</code> 이고 그중 인덱스 2 는 세 번째 값이므로 <b>6</b> 이다. 행·열 모두 0부터 센다.',
    d: 2, y: [], tag: ['배열', '2차원']
  },

  {
    id: 'ch10-s04-04', ch: 10, sec: 4,
    t: 'short',
    q: 'C 언어에서 문자열의 <b>끝</b>에 자동으로 붙는 문자를 무엇이라 하는가?',
    a: ['널 문자', '널문자', 'NULL 문자', '\\0', 'null'],
    why: 'C 의 문자열은 문자 배열이고 끝에 <b>널 문자(<code>\\0</code>)</b> 가 붙는다. 그래서 문자 수보다 한 칸이 더 필요하다.',
    d: 2, y: [], tag: ['문자열', '널문자'], lang: null, code: null
  },

  {
    id: 'ch10-s04-05', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: 'char s[] = "HELLO";\nprintf("%d", strlen(s));',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['5'],
    why: '<code>strlen</code> 은 <b>널 문자를 제외한</b> 길이를 돌려준다. 저장에는 6칸이 필요하지만 길이는 <b>5</b> 다.',
    d: 2, y: [], tag: ['문자열', 'strlen']
  },

  {
    id: 'ch10-s04-06', ch: 10, sec: 4,
    t: 'ox',
    q: '문자열 <code>"HELLO"</code> 를 담으려면 char 배열이 최소 6칸 필요하다.',
    a: true,
    why: '문자 5개 + <b>널 문자 1개</b> = 6칸이다. 널 문자 자리를 빼먹는 것이 대표적인 함정이다.',
    d: 2, y: [], tag: ['문자열', '널문자'], lang: null, code: null
  },

  {
    id: 'ch10-s04-07', ch: 10, sec: 4,
    t: 'choice',
    q: '두 문자열이 <b>같은지 비교</b>하는 함수는?',
    c: ['strcmp(a, b)', 'strcpy(d, s)', 'strcat(d, s)', 'strlen(s)'],
    a: 0,
    why: '<b>strcmp</b> 는 두 문자열을 비교해 <b>같으면 0</b> 을 돌려준다. strcpy 는 복사, strcat 은 연결, strlen 은 길이다.',
    d: 1, y: [], tag: ['문자열', 'strcmp'], lang: null, code: null
  },

  {
    id: 'ch10-s04-08', ch: 10, sec: 4,
    t: 'short',
    q: '문자열 <code>d</code> 의 뒤에 문자열 <code>s</code> 를 <b>이어 붙이는</b> C 표준 함수는?',
    a: ['strcat', 'strcat()', 'strcat(d, s)'],
    why: '<b>strcat</b>(string concatenate)이다. 이름이 비슷한 <code>strcpy</code> 는 <b>덮어쓰는</b> 복사라 뜻이 다르다.',
    d: 2, y: [], tag: ['문자열', 'strcat'], lang: null, code: null
  },

  {
    id: 'ch10-s04-09', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: 'int arr[5] = {10, 20, 30, 40, 50};\nint sum = 0;\nfor (int i = 0; i < 5; i++) {\n    sum += arr[i];\n}\nprintf("%d", sum);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['150'],
    why: '인덱스 0~4 를 모두 더한다. 10+20+30+40+50 = <b>150</b>. 조건이 <code>i &lt; 5</code> 이므로 i 는 5가 되면 멈춘다.',
    d: 1, y: [], tag: ['배열', '반복문']
  },

  /* ============================================================= s05 포인터 */

  {
    id: 'ch10-s05-01', ch: 10, sec: 5,
    t: 'short',
    q: '변수의 <b>주소를 저장하는 변수</b>를 무엇이라 하는가?',
    a: ['포인터', 'Pointer', '포인터 변수', '포인터변수'],
    why: '<b>포인터(Pointer)</b> 다. 값이 아니라 <b>주소</b>를 담는다는 점이 일반 변수와 다르다.',
    d: 1, y: [], tag: ['포인터'], lang: null, code: null
  },

  {
    id: 'ch10-s05-02', ch: 10, sec: 5,
    t: 'short',
    q: '변수 앞에 붙여 <b>그 변수의 주소</b>를 구하는 <code>&amp;</code> 연산자의 이름은?',
    a: ['주소 연산자', '주소연산자', '번지 연산자'],
    why: '<code>&amp;</code> 는 <b>주소 연산자</b>다. 반대로 <code>*</code> 는 포인터가 가리키는 곳의 값을 꺼내는 <b>참조 연산자</b>다.',
    d: 2, y: [], tag: ['포인터', '주소연산자'], lang: null, code: null
  },

  {
    id: 'ch10-s05-03', ch: 10, sec: 5,
    t: 'short',
    q: '포인터가 <b>가리키는 주소의 값</b>을 구하는 <code>*</code> 연산자의 이름은?',
    a: ['참조 연산자', '참조연산자', '간접 연산자'],
    why: '<code>*</code> 는 <b>참조 연산자</b>다. 선언할 때 쓰는 <code>*</code>(포인터 변수 선언)와 모양은 같지만 역할이 다르다.',
    d: 2, y: [], tag: ['포인터', '참조연산자'], lang: null, code: null
  },

  {
    id: 'ch10-s05-04', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: 'int a = 10;\nint *p = &a;\nprintf("%d", *p);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['10'],
    why: '<code>p</code> 에는 a 의 <b>주소</b>가 들어 있고, <code>*p</code> 는 그 주소가 가리키는 곳의 <b>값</b>이므로 10 이다.',
    d: 1, y: [], tag: ['포인터']
  },

  {
    id: 'ch10-s05-05', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: 'int a = 10;\nint *p = &a;\n*p = 20;\nprintf("%d", a);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['20'],
    why: '<code>*p = 20</code> 은 p 가 가리키는 곳, 즉 <b>a 자체</b>를 바꾼다. a 를 직접 건드리지 않았는데 값이 바뀌는 것이 포인터의 핵심이다.',
    d: 2, y: [], tag: ['포인터', '값변경']
  },

  {
    id: 'ch10-s05-06', ch: 10, sec: 5,
    t: 'ox',
    q: '배열 이름은 그 자체가 <b>배열의 시작 주소</b>를 뜻한다.',
    a: true,
    why: '그래서 <code>int *p = arr;</code> 가 성립하고, 이는 <code>p = &amp;arr[0]</code> 과 같다.',
    d: 2, y: [], tag: ['포인터', '배열'], lang: null, code: null
  },

  {
    id: 'ch10-s05-07', ch: 10, sec: 5,
    t: 'ox',
    q: '<code>*(p+n)</code> · <code>p[n]</code> · <code>arr[n]</code> 은 모두 같은 값을 가리킨다. (단 <code>p = arr</code>)',
    a: true,
    why: '이 <b>등가 관계</b>가 포인터 문제의 뼈대다. 포인터에도 <code>[]</code> 표기를 쓸 수 있고, 배열에도 포인터 연산을 쓸 수 있다.',
    d: 2, y: [], tag: ['포인터', '배열'], lang: null, code: null
  },

  {
    id: 'ch10-s05-08', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: 'int arr[5] = {10, 20, 30, 40, 50};\nint *p = arr;\nprintf("%d", *(p + 2));',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['30'],
    why: '<code>p</code> 는 <code>arr[0]</code> 을 가리키므로 <code>*(p+2)</code> 는 <code>arr[2]</code> 인 <b>30</b> 이다.',
    d: 2, y: [], tag: ['포인터', '포인터연산']
  },

  {
    id: 'ch10-s05-09', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: 'int arr[5] = {10, 20, 30, 40, 50};\nint *p = arr;\nprintf("%d", p[3]);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['40'],
    why: '포인터에도 <code>[]</code> 를 쓸 수 있다. <code>p[3]</code> 은 <code>*(p+3)</code> 이자 <code>arr[3]</code> 이므로 <b>40</b> 이다.',
    d: 2, y: [], tag: ['포인터', '배열']
  },

  {
    id: 'ch10-s05-10', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: 'int a[] = {1, 2, 3, 4, 5};\nint *p = a;\nint sum = 0;\nfor (int i = 0; i < 5; i++) {\n    sum += *(p + i);\n}\nprintf("%d", sum);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['15'],
    why: '<code>*(p+i)</code> 가 <code>a[i]</code> 와 같으므로 배열 전체를 더한 것과 같다. 1+2+3+4+5 = <b>15</b>.',
    d: 2, y: [], tag: ['포인터', '반복문']
  },

  {
    id: 'ch10-s05-11', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: 'int a = 5, b = 10;\nint *p1 = &a, *p2 = &b;\nint temp;\n\ntemp = *p1;\n*p1 = *p2;\n*p2 = temp;\n\nprintf("%d %d", a, b);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['10 5'],
    why: '포인터를 통해 <b>원본 변수의 값 자체를 교환</b>했다. a 와 b 가 서로 바뀌어 <b>10 5</b> 가 출력된다.',
    d: 3, y: [], tag: ['포인터', '교환']
  },

  {
    id: 'ch10-s05-12', ch: 10, sec: 5,
    t: 'short',
    q: '<b>포인터의 주소를 저장하는 포인터</b>를 무엇이라 하는가?',
    a: ['이중 포인터', '이중포인터', '더블 포인터'],
    why: '<code>int **pp = &amp;p;</code> 처럼 선언한다. 값을 꺼내려면 <code>*</code> 를 두 번 붙여 <code>**pp</code> 로 쓴다.',
    d: 2, y: [], tag: ['포인터', '이중포인터'], lang: null, code: null
  },

  {
    id: 'ch10-s05-13', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: 'int a = 10;\nint *p = &a;\nint **pp = &p;\nprintf("%d", **pp);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['10'],
    why: '<code>pp</code> → <code>p</code> → <code>a</code> 로 두 단계를 거친다. <code>*</code> 를 두 번 붙여야 최종 값 <b>10</b> 에 닿는다.',
    d: 3, y: [], tag: ['포인터', '이중포인터']
  },

  {
    id: 'ch10-s05-14', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: 'int arr[5] = {10, 20, 30, 40, 50};\nint *p = arr;\n*(p + 1) = 99;\nprintf("%d", arr[1]);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['99'],
    why: '<code>*(p+1)</code> 은 <code>arr[1]</code> 자체다. 포인터로 쓴 값이 원본 배열에 그대로 반영된다.',
    d: 3, y: [], tag: ['포인터', '배열', '값변경']
  },

  {
    id: 'ch10-s05-15', ch: 10, sec: 5,
    t: 'choice',
    q: '포인터 변수 <code>p</code> 에 변수 <code>a</code> 의 주소를 넣는 올바른 문장은?',
    c: ['int *p = &a;', 'int *p = a;', 'int p = &a;', 'int &p = *a;'],
    a: 0,
    why: '선언에는 <code>*</code>, 주소를 구할 때는 <code>&amp;</code> 를 쓴다. <code>int *p = a;</code> 는 값을 주소로 오해해 넣는 꼴이라 틀렸다.',
    d: 2, y: [], tag: ['포인터', '선언'], lang: null, code: null
  },

  {
    id: 'ch10-s05-16', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: 'int a[] = {1, 2, 3, 4, 5};\nint *p = a;\nprintf("%d", *(p + 3) + p[1]);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['6'],
    why: '<code>*(p+3)</code> = <code>a[3]</code> = 4, <code>p[1]</code> = <code>a[1]</code> = 2. 두 표기가 같은 것을 가리킨다는 점만 알면 4+2 = <b>6</b>.',
    d: 3, y: [], tag: ['포인터', '포인터연산']
  },

  /* ============================================================= s06 구조체 */

  {
    id: 'ch10-s06-01', ch: 10, sec: 6,
    t: 'short',
    q: '<b>서로 다른 자료형</b>의 변수들을 하나로 묶어 쓰는 사용자 정의 자료형은?',
    a: ['구조체', 'Structure', 'struct'],
    why: '<b>구조체(Structure)</b> 다. 같은 자료형만 묶는 <b>배열</b>과의 차이가 그대로 출제 포인트다.',
    d: 1, y: [], tag: ['구조체'], lang: null, code: null
  },

  {
    id: 'ch10-s06-02', ch: 10, sec: 6,
    t: 'ox',
    q: '구조체 <b>포인터</b>로 멤버에 접근할 때는 <code>.</code> 을 쓴다.',
    a: false,
    why: '구조체 <b>변수</b>는 <code>.</code>, 구조체 <b>포인터</b>는 <code>-&gt;</code> 다. 이 구분이 자주 나온다.',
    d: 2, y: [], tag: ['구조체', '접근연산자'], lang: null, code: null
  },

  {
    id: 'ch10-s06-03', ch: 10, sec: 6,
    t: 'short',
    q: '구조체 포인터에서 멤버에 접근할 때 쓰는 <code>-&gt;</code> 연산자의 이름은?',
    a: ['화살표 연산자', '화살표연산자', '간접 멤버 연산자'],
    why: '<b>화살표 연산자</b>다. <code>p-&gt;나이</code> 는 <code>(*p).나이</code> 를 줄여 쓴 것이다.',
    d: 2, y: [], tag: ['구조체', '화살표연산자'], lang: null, code: null
  },

  {
    id: 'ch10-s06-04', ch: 10, sec: 6,
    t: 'ox',
    q: '<code>(*p).나이</code> 와 <code>p-&gt;나이</code> 는 같은 뜻이다.',
    a: true,
    why: '완전히 같다. <code>-&gt;</code> 는 <code>(*p).</code> 의 축약 표기일 뿐이다. 괄호를 빼먹으면(<code>*p.나이</code>) 우선순위 때문에 뜻이 달라지므로 축약형을 쓴다.',
    d: 3, y: [], tag: ['구조체', '화살표연산자'], lang: null, code: null
  },

  {
    id: 'ch10-s06-05', ch: 10, sec: 6,
    t: 'short',
    q: '자료형에 <b>새로운 이름을 붙이는</b> C 언어의 키워드는?',
    a: ['typedef'],
    why: '<code>typedef</code> 로 구조체에 이름을 붙이면 이후 <code>struct</code> 를 붙이지 않고 그 이름만으로 선언할 수 있다.',
    d: 1, y: [], tag: ['typedef'], lang: null, code: null
  },

  {
    id: 'ch10-s06-06', ch: 10, sec: 6,
    t: 'choice',
    q: '<code>typedef</code> 로 구조체 이름을 정의했을 때 얻는 것은?',
    c: [
      '선언할 때 <code>struct</code> 를 붙이지 않아도 된다',
      '구조체 멤버를 자동으로 초기화해 준다',
      '구조체를 배열처럼 인덱스로 접근할 수 있다',
      '구조체 크기가 줄어든다'
    ],
    a: 0,
    why: '<code>typedef</code> 는 <b>이름을 붙이는 것</b>이 전부다. 메모리 구조나 초기화 동작은 전혀 바뀌지 않는다.',
    d: 2, y: [], tag: ['typedef'], lang: null, code: null
  },

  {
    id: 'ch10-s06-07', ch: 10, sec: 6,
    t: 'code', lang: 'c',
    code: 'struct 회원 {\n    char 이름[20];\n    int  나이;\n};\n\nstruct 회원 m1 = {"김하늘", 25};\nstruct 회원 *p = &m1;\n\nprintf("%d", p->나이);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['25'],
    why: '<code>p</code> 는 <code>m1</code> 을 가리키는 구조체 포인터이므로 <code>p-&gt;나이</code> 는 <code>m1.나이</code> 인 <b>25</b> 다.',
    d: 2, y: [], tag: ['구조체', '화살표연산자']
  },

  {
    id: 'ch10-s06-08', ch: 10, sec: 6,
    t: 'ox',
    q: '구조체는 배열과 달리 멤버마다 자료형이 달라도 된다.',
    a: true,
    why: '이것이 구조체의 존재 이유다. 이름은 <code>char</code> 배열, 나이는 <code>int</code> 처럼 성격이 다른 값을 한 덩어리로 묶는다.',
    d: 1, y: [], tag: ['구조체', '배열'], lang: null, code: null
  },

  /* ==================================================== s07 사용자 정의 함수 */

  {
    id: 'ch10-s07-01', ch: 10, sec: 7,
    t: 'short',
    q: '매개변수에 <b>값을 복사해서 전달</b>하므로 원본이 바뀌지 않는 호출 방식은?',
    a: ['값에 의한 호출', '값에의한호출', 'Call by Value', 'call by value'],
    why: '<b>값에 의한 호출(Call by Value)</b> 이다. 함수 안에서 아무리 바꿔도 <b>복사본</b>을 바꾸는 것이라 원본에 영향이 없다.',
    d: 2, y: [], tag: ['매개변수', 'Call by Value'], lang: null, code: null
  },

  {
    id: 'ch10-s07-02', ch: 10, sec: 7,
    t: 'short',
    q: '매개변수에 <b>주소를 전달</b>하여 원본 값을 바꿀 수 있는 호출 방식은?',
    a: ['주소에 의한 호출', '주소에의한호출', 'Call by Reference', 'call by reference', '참조에 의한 호출'],
    why: '<b>주소에 의한 호출(Call by Reference)</b> 이다. 주소를 넘기므로 함수가 <b>원본 자체</b>를 건드린다.',
    d: 2, y: [], tag: ['매개변수', 'Call by Reference'], lang: null, code: null
  },

  {
    id: 'ch10-s07-03', ch: 10, sec: 7,
    t: 'code', lang: 'c',
    code: 'void swapValue(int a, int b) {\n    int t = a; a = b; b = t;\n}\n\nint x = 1, y = 2;\nswapValue(x, y);\nprintf("%d %d", x, y);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['1 2'],
    why: '값에 의한 호출이라 함수 안에서 바뀐 것은 <b>복사본</b>이다. 원본 x·y 는 그대로 <b>1 2</b> 다.',
    d: 3, y: [], tag: ['Call by Value']
  },

  {
    id: 'ch10-s07-04', ch: 10, sec: 7,
    t: 'code', lang: 'c',
    code: 'void swapRef(int *a, int *b) {\n    int t = *a; *a = *b; *b = t;\n}\n\nint x = 1, y = 2;\nswapRef(&x, &y);\nprintf("%d %d", x, y);',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['2 1'],
    why: '주소를 넘겼으므로 함수가 <b>원본 자체</b>를 교환한다. 바로 앞 문제(값에 의한 호출)와 결과를 비교할 것.',
    d: 3, y: [], tag: ['Call by Reference']
  },

  {
    id: 'ch10-s07-05', ch: 10, sec: 7,
    t: 'short',
    q: '<b>자기 자신을 다시 호출</b>하는 함수를 무엇이라 하는가?',
    a: ['재귀 함수', '재귀함수', 'Recursive Function', '재귀'],
    why: '<b>재귀 함수(Recursive Function)</b> 다. 팩토리얼·피보나치처럼 같은 규칙이 반복되는 문제에 쓴다.',
    d: 1, y: [], tag: ['재귀함수'], lang: null, code: null
  },

  {
    id: 'ch10-s07-06', ch: 10, sec: 7,
    t: 'ox',
    q: '재귀 함수는 종료 조건이 없어도 언젠가는 스스로 멈춘다.',
    a: false,
    why: '<b>반드시 종료 조건이 있어야 한다.</b> 없으면 호출이 끝없이 쌓여 <b>스택 오버플로</b>가 난다.',
    d: 2, y: [], tag: ['재귀함수'], lang: null, code: null
  },

  {
    id: 'ch10-s07-07', ch: 10, sec: 7,
    t: 'short',
    q: '재귀 함수에 종료 조건이 없을 때 호출이 끝없이 쌓여 발생하는 오류는?',
    a: ['스택 오버플로', '스택오버플로', 'Stack Overflow', '스택 오버플로우', '스택오버플로우'],
    why: '함수 호출 정보는 <b>스택</b>에 쌓인다. 되돌아 나오지 못하면 스택이 넘쳐 <b>스택 오버플로</b>가 발생한다.',
    d: 2, y: [], tag: ['재귀함수', '스택오버플로'], lang: null, code: null
  },

  {
    id: 'ch10-s07-08', ch: 10, sec: 7,
    t: 'code', lang: 'c',
    code: 'int add(int a, int b) {\n    return a + b;\n}\n\nprintf("%d", add(3, 5));',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['8'],
    why: '매개변수 a=3, b=5 가 전달되고 <code>return a + b</code> 로 <b>8</b> 이 돌아온다.',
    d: 1, y: [], tag: ['함수']
  },

  {
    id: 'ch10-s07-09', ch: 10, sec: 7,
    t: 'code', lang: 'c',
    code: 'int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nprintf("%d", factorial(5));',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['120'],
    why: '5×4×3×2×1 = <b>120</b>. <code>n &lt;= 1</code> 이 종료 조건이라 1에서 멈추고 되돌아 나오며 곱해진다.',
    d: 2, y: [], tag: ['재귀함수', '팩토리얼']
  },

  {
    id: 'ch10-s07-10', ch: 10, sec: 7,
    t: 'code', lang: 'c',
    code: 'int factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nprintf("%d", factorial(4));',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['24'],
    why: '4×3×2×1 = <b>24</b>. 앞 문제와 같은 함수이므로 n 만 바꿔 넣어 계산하면 된다.',
    d: 2, y: [], tag: ['재귀함수', '팩토리얼']
  },

  {
    id: 'ch10-s07-11', ch: 10, sec: 7,
    t: 'choice',
    q: '함수 호출 후 <b>원본 변수의 값이 바뀔 수 있는</b> 경우는?',
    c: [
      '매개변수로 변수의 주소를 넘긴 경우',
      '매개변수로 변수의 값을 넘긴 경우',
      '반환형이 void 인 경우',
      '매개변수가 없는 경우'
    ],
    a: 0,
    why: '<b>주소를 넘겨야</b> 함수가 원본에 닿는다. 값을 넘기면 복사본만 바뀐다. 반환형이나 매개변수 개수는 이와 무관하다.',
    d: 2, y: [], tag: ['매개변수'], lang: null, code: null
  },

  /* ======================================================= s08 Java의 클래스 */

  {
    id: 'ch10-s08-01', ch: 10, sec: 8,
    t: 'choice',
    q: '접근 제어자를 <b>접근 범위가 좁은 것부터</b> 바르게 나열한 것은?',
    c: [
      'private → default → protected → public',
      'private → protected → default → public',
      'default → private → protected → public',
      'public → protected → default → private'
    ],
    a: 0,
    why: '<b>private &lt; default &lt; protected &lt; public</b> 순으로 넓어진다. default 와 protected 의 순서가 자주 헷갈린다.',
    d: 2, y: [], tag: ['접근제어자'], lang: null, code: null
  },

  {
    id: 'ch10-s08-02', ch: 10, sec: 8,
    t: 'ox',
    q: '<code>protected</code> 로 선언한 멤버는 <b>다른 패키지의 아무 클래스</b>에서나 접근할 수 있다.',
    a: false,
    why: 'protected 는 같은 클래스·같은 패키지·<b>하위 클래스</b>까지다. 전체에 열려 있는 것은 <code>public</code> 뿐이다.',
    d: 2, y: [], tag: ['접근제어자'], lang: null, code: null
  },

  {
    id: 'ch10-s08-03', ch: 10, sec: 8,
    t: 'short',
    q: '접근 제어자를 <b>생략</b>했을 때 적용되는 것으로, 같은 패키지 안에서만 접근할 수 있는 제어자는?',
    a: ['default', '디폴트', '생략'],
    why: '<b>default</b> 다. 같은 클래스·같은 패키지까지만 허용하고 <b>하위 클래스라도 패키지가 다르면 접근할 수 없다</b>.',
    d: 2, y: [], tag: ['접근제어자'], lang: null, code: null
  },

  {
    id: 'ch10-s08-04', ch: 10, sec: 8,
    t: 'ox',
    q: '<code>default</code> 접근 제어자는 패키지가 다른 <b>하위 클래스</b>에서도 접근할 수 있다.',
    a: false,
    why: '하위 클래스까지 열어 주는 것은 <b>protected</b> 다. default 는 같은 패키지까지만이다.',
    d: 3, y: [], tag: ['접근제어자'], lang: null, code: null
  },

  {
    id: 'ch10-s08-05', ch: 10, sec: 8,
    t: 'short',
    q: '객체가 생성될 때 <b>자동으로 호출</b>되며, 클래스 이름과 같고 반환형이 없는 메소드는?',
    a: ['생성자', 'Constructor'],
    why: '<b>생성자(Constructor)</b> 다. 이름이 클래스와 같고 <b>반환형을 쓰지 않는다</b>는 두 가지가 식별 기준이다.',
    d: 1, y: [], tag: ['생성자'], lang: null, code: null
  },

  {
    id: 'ch10-s08-06', ch: 10, sec: 8,
    t: 'ox',
    q: '생성자는 반환형을 <code>void</code> 로 지정해야 한다.',
    a: false,
    why: '생성자는 <b>반환형 자체가 없다</b>. <code>void</code> 를 붙이면 생성자가 아니라 이름만 같은 일반 메소드가 된다.',
    d: 3, y: [], tag: ['생성자'], lang: null, code: null
  },

  {
    id: 'ch10-s08-07', ch: 10, sec: 8,
    t: 'ox',
    q: '생성자를 하나도 정의하지 않으면 <b>기본 생성자</b>가 자동으로 만들어진다.',
    a: true,
    why: '그래서 생성자를 안 써도 <code>new 클래스명()</code> 이 동작한다. 단 생성자를 하나라도 직접 정의하면 기본 생성자는 만들어지지 않는다.',
    d: 2, y: [], tag: ['생성자'], lang: null, code: null
  },

  {
    id: 'ch10-s08-08', ch: 10, sec: 8,
    t: 'short',
    q: '객체를 생성하지 않고도 쓸 수 있고, <b>모든 객체가 값을 공유</b>하는 필드·메소드를 지정하는 키워드는?',
    a: ['static', '스태틱', '정적'],
    why: '<b>static</b> 이다. 객체마다 따로 갖는 것이 아니라 <b>클래스에 하나만</b> 존재해 모두가 같은 값을 본다.',
    d: 2, y: [], tag: ['static'], lang: null, code: null
  },

  {
    id: 'ch10-s08-09', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class Counter {\n    static int count = 0;\n    Counter() { count++; }\n}\n\nnew Counter();\nnew Counter();\nnew Counter();\nSystem.out.print(Counter.count);',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['3'],
    why: '<code>count</code> 가 <b>static</b> 이라 객체마다 따로 있지 않고 <b>하나를 공유</b>한다. 생성자가 세 번 호출되어 3 이 된다.',
    d: 2, y: [], tag: ['static', '생성자']
  },

  {
    id: 'ch10-s08-10', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class 회원 {\n    int 누적대출수;\n    회원() { 누적대출수 = 0; }\n    void 대출() { 누적대출수++; }\n}\n\n회원 m = new 회원();\nm.대출();\nm.대출();\nSystem.out.print(m.누적대출수);',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['2'],
    why: '생성자가 0으로 초기화한 뒤 <code>대출()</code> 이 두 번 호출되어 <b>2</b> 가 된다. static 이 아니므로 이 값은 객체 m 만의 것이다.',
    d: 2, y: [], tag: ['클래스', '메소드']
  },

  {
    id: 'ch10-s08-11', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class Counter {\n    static int shared = 0;\n    int own = 0;\n    void up() { shared++; own++; }\n}\n\nCounter a = new Counter();\nCounter b = new Counter();\na.up();\nb.up();\nSystem.out.print(a.shared + " " + a.own);',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['2 1'],
    why: '<code>shared</code> 는 static 이라 a·b 가 <b>같은 값을 공유</b>해 2 가 된다. <code>own</code> 은 객체마다 따로라 a 의 것은 1 이다.',
    d: 3, y: [], tag: ['static']
  },

  {
    id: 'ch10-s08-12', ch: 10, sec: 8,
    t: 'choice',
    q: '<code>private</code> 로 선언한 멤버에 접근할 수 있는 범위는?',
    c: ['같은 클래스 안에서만', '같은 패키지까지', '하위 클래스까지', '어디서나'],
    a: 0,
    why: '<b>private 은 같은 클래스 안에서만</b> 접근할 수 있다. 정보 은닉의 기본 수단이다.',
    d: 1, y: [], tag: ['접근제어자'], lang: null, code: null
  },

  /* ================================================= s09 Java의 상속과 다형성 */

  {
    id: 'ch10-s09-01', ch: 10, sec: 9,
    t: 'short',
    q: '<b>상위 클래스의 메소드를 하위 클래스에서 재정의</b>하는 것을 무엇이라 하는가?',
    a: ['오버라이딩', 'Overriding', '재정의'],
    why: '<b>오버라이딩(Overriding)</b> 이다. <b>상속 관계</b>에서 일어나고 매개변수와 반환형이 <b>같아야</b> 한다.',
    d: 2, y: [], tag: ['오버라이딩'], lang: null, code: null
  },

  {
    id: 'ch10-s09-02', ch: 10, sec: 9,
    t: 'short',
    q: '<b>같은 클래스 안에서 같은 이름의 메소드를 여러 개</b> 정의하는 것을 무엇이라 하는가?',
    a: ['오버로딩', 'Overloading', '중복정의'],
    why: '<b>오버로딩(Overloading)</b> 이다. 이름이 같아도 <b>매개변수가 달라야</b> 구분된다.',
    d: 2, y: [], tag: ['오버로딩'], lang: null, code: null
  },

  {
    id: 'ch10-s09-03', ch: 10, sec: 9,
    t: 'ox',
    q: '오버라이딩은 매개변수가 <b>달라야</b> 성립한다.',
    a: false,
    why: '거꾸로다. 오버라이딩은 매개변수와 반환형이 <b>같아야</b> 한다. <b>달라야</b> 하는 것은 오버로딩이다.',
    d: 2, y: [], tag: ['오버라이딩', '오버로딩'], lang: null, code: null
  },

  {
    id: 'ch10-s09-04', ch: 10, sec: 9,
    t: 'ox',
    q: '오버로딩은 <b>상속 관계</b>의 클래스 사이에서 일어난다.',
    a: false,
    why: '오버로딩은 <b>같은 클래스 안</b>에서 일어난다. 상속 관계에서 일어나는 것은 오버라이딩이다.',
    d: 2, y: [], tag: ['오버로딩'], lang: null, code: null
  },

  {
    id: 'ch10-s09-05', ch: 10, sec: 9,
    t: 'choice',
    q: '오버로딩과 오버라이딩의 차이로 <b>옳은</b> 것은?',
    c: [
      '오버로딩은 매개변수가 달라야 하고, 오버라이딩은 같아야 한다',
      '오버로딩은 상속 관계에서, 오버라이딩은 같은 클래스에서 일어난다',
      '오버로딩은 반환형이 같아야 하고, 오버라이딩은 상관없다',
      '둘 다 매개변수가 같아야 한다'
    ],
    a: 0,
    why: '매개변수가 <b>달라야 오버로딩</b>, <b>같아야 오버라이딩</b>이다. 반환형은 오버로딩에서는 상관없고 오버라이딩에서는 같아야 한다.',
    d: 3, y: [], tag: ['오버로딩', '오버라이딩'], lang: null, code: null
  },

  {
    id: 'ch10-s09-06', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'class 자료 {\n    void 정보() { System.out.print("자료"); }\n}\n\nclass 도서 extends 자료 {\n    void 정보() { System.out.print("도서"); }\n}\n\n도서 d = new 도서();\nd.정보();',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['도서'],
    why: '하위 클래스가 <code>정보()</code> 를 <b>오버라이딩</b>했으므로 상위 클래스의 것이 아니라 <b>재정의한 쪽</b>이 실행된다.',
    d: 2, y: [], tag: ['상속', '오버라이딩']
  },

  {
    id: 'ch10-s09-07', ch: 10, sec: 9,
    t: 'short',
    q: '<b>현재 객체 자신</b>을 가리키는 Java 키워드는?',
    a: ['this'],
    why: '<code>this</code> 다. <code>this()</code> 로 쓰면 <b>같은 클래스의 다른 생성자</b>를 호출한다.',
    d: 1, y: [], tag: ['this'], lang: null, code: null
  },

  {
    id: 'ch10-s09-08', ch: 10, sec: 9,
    t: 'short',
    q: '<b>상위 클래스</b>를 가리키는 Java 키워드는?',
    a: ['super'],
    why: '<code>super</code> 다. <code>super()</code> 로 쓰면 <b>상위 클래스의 생성자</b>를 호출한다. this/super 와 this()/super() 의 구분이 출제 포인트다.',
    d: 1, y: [], tag: ['super'], lang: null, code: null
  },

  {
    id: 'ch10-s09-09', ch: 10, sec: 9,
    t: 'short',
    q: '메소드의 <b>구현을 강제</b>하는 것이 목적이고, <code>implements</code> 로 <b>다중 구현</b>이 가능한 것은?',
    a: ['인터페이스', 'interface', 'Interface'],
    why: '<b>인터페이스</b>다. 추상 클래스는 <code>extends</code> 로 <b>단일 상속</b>만 되지만 인터페이스는 여러 개를 한꺼번에 구현할 수 있다.',
    d: 2, y: [], tag: ['인터페이스'], lang: null, code: null
  },

  {
    id: 'ch10-s09-10', ch: 10, sec: 9,
    t: 'ox',
    q: '추상 클래스는 <b>다중 상속</b>이 가능하다.',
    a: false,
    why: '추상 클래스는 <code>extends</code> 로 <b>단일 상속</b>만 된다. 다중이 되는 것은 <code>implements</code> 로 구현하는 <b>인터페이스</b>다.',
    d: 2, y: [], tag: ['추상클래스', '인터페이스'], lang: null, code: null
  },

  {
    id: 'ch10-s09-11', ch: 10, sec: 9,
    t: 'ox',
    q: '추상 클래스에는 추상 메소드만 넣을 수 있고 일반 메소드는 넣을 수 없다.',
    a: false,
    why: '추상 클래스는 <b>일반 메소드 + 추상 메소드</b>를 함께 가질 수 있다. 그래서 "공통 기능을 물려준다"는 목적에 맞는다.',
    d: 3, y: [], tag: ['추상클래스'], lang: null, code: null
  },

  {
    id: 'ch10-s09-12', ch: 10, sec: 9,
    t: 'choice',
    q: '다음 중 <b>오버로딩</b>이 성립하는 짝은?',
    c: [
      '<code>int add(int a, int b)</code> 와 <code>double add(double a, double b)</code>',
      '<code>int add(int a, int b)</code> 와 <code>double add(int a, int b)</code>',
      '<code>int add(int a, int b)</code> 와 <code>int add(int x, int y)</code>',
      '<code>int add(int a, int b)</code> 와 <code>int add(int a, int b)</code>'
    ],
    a: 0,
    why: '오버로딩은 <b>매개변수의 개수나 타입</b>이 달라야 한다. 반환형만 다르거나 <b>매개변수 이름만</b> 다른 것은 구분이 되지 않아 성립하지 않는다.',
    d: 3, y: [], tag: ['오버로딩'], lang: null, code: null
  },

  /* ========================================================= s10 Python의 활용 */

  {
    id: 'ch10-s10-01', ch: 10, sec: 10,
    t: 'ox',
    q: 'Python 의 <b>튜플(Tuple)</b> 은 생성한 뒤에도 값을 바꿀 수 있다.',
    a: false,
    why: '튜플은 <b>변경 불가(immutable)</b> 다. 순서가 있고 중복을 허용하는 점은 리스트와 같지만 <b>수정이 안 된다</b>는 점이 다르다.',
    d: 2, y: [], tag: ['자료형', '튜플'], lang: null, code: null
  },

  {
    id: 'ch10-s10-02', ch: 10, sec: 10,
    t: 'ox',
    q: 'Python 의 <b>세트(Set)</b> 는 중복된 값을 허용한다.',
    a: false,
    why: '세트는 <b>순서가 없고 중복도 허용하지 않는다</b>. 중복 제거 용도로 자주 쓰인다.',
    d: 2, y: [], tag: ['자료형', '세트'], lang: null, code: null
  },

  {
    id: 'ch10-s10-03', ch: 10, sec: 10,
    t: 'short',
    q: 'Python 자료형 중 <b>순서가 있고 값을 바꿀 수 있으며 중복도 허용</b>하는, <code>[ ]</code> 로 표기하는 것은?',
    a: ['리스트', 'List', 'list'],
    why: '<b>리스트</b>다. 같은 대괄호 계열이라도 튜플은 <code>( )</code>, 세트·딕셔너리는 <code>{ }</code> 를 쓴다.',
    d: 1, y: [], tag: ['자료형', '리스트'], lang: null, code: null
  },

  {
    id: 'ch10-s10-04', ch: 10, sec: 10,
    t: 'short',
    q: 'Python 자료형 중 <b>키-값 쌍</b>으로 저장하고 키의 중복을 허용하지 않는 것은?',
    a: ['딕셔너리', 'Dictionary', 'dict', '사전'],
    why: '<b>딕셔너리</b>다. <code>{\'a\': 1}</code> 처럼 쓴다. 같은 중괄호를 쓰는 세트와 표기가 비슷하니 <b>콜론이 있는지</b>로 구분한다.',
    d: 1, y: [], tag: ['자료형', '딕셔너리'], lang: null, code: null
  },

  {
    id: 'ch10-s10-05', ch: 10, sec: 10,
    t: 'ox',
    q: '슬라이싱 <code>a[시작:끝]</code> 에서 <b>끝 인덱스도 포함</b>된다.',
    a: false,
    why: '<b>끝 인덱스는 포함되지 않는다.</b> <code>a[2:5]</code> 는 인덱스 2·3·4 세 개다. 가장 많이 틀리는 부분이다.',
    d: 2, y: [], tag: ['슬라이싱'], lang: null, code: null
  },

  {
    id: 'ch10-s10-06', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nprint(a[2:5])',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['[2, 3, 4]', '[2,3,4]'],
    why: '인덱스 <b>2 이상 5 미만</b>이므로 2·3·4 다. 끝 인덱스 5는 포함되지 않는다.',
    d: 2, y: [], tag: ['슬라이싱']
  },

  {
    id: 'ch10-s10-07', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nprint(a[:3])',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['[0, 1, 2]', '[0,1,2]'],
    why: '시작을 비우면 <b>처음부터</b>다. 3 미만이므로 0·1·2 다.',
    d: 1, y: [], tag: ['슬라이싱']
  },

  {
    id: 'ch10-s10-08', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nprint(a[7:])',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['[7, 8, 9]', '[7,8,9]'],
    why: '끝을 비우면 <b>끝까지</b>다. 인덱스 7부터 마지막까지이므로 7·8·9 다.',
    d: 1, y: [], tag: ['슬라이싱']
  },

  {
    id: 'ch10-s10-09', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nprint(a[::2])',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['[0, 2, 4, 6, 8]', '[0,2,4,6,8]'],
    why: '세 번째 자리는 <b>간격</b>이다. 2칸씩 건너뛰므로 짝수 인덱스만 남는다.',
    d: 2, y: [], tag: ['슬라이싱']
  },

  {
    id: 'ch10-s10-10', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [1, 2, 3]\nprint(a[::-1])',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['[3, 2, 1]', '[3,2,1]'],
    why: '간격이 <b>-1</b> 이면 <b>역순</b>으로 훑는다. 리스트를 뒤집는 관용 표현이다.',
    d: 2, y: [], tag: ['슬라이싱']
  },

  {
    id: 'ch10-s10-11', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\nprint(a[-3:])',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['[7, 8, 9]', '[7,8,9]'],
    why: '<b>음수 인덱스는 뒤에서부터</b> 센다. -3 은 뒤에서 세 번째이므로 마지막 세 개가 나온다.',
    d: 2, y: [], tag: ['슬라이싱']
  },

  {
    id: 'ch10-s10-12', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'total = 0\nfor i in range(1, 6):\n    total += i\nprint(total)',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['15'],
    why: '<code>range(1, 6)</code> 은 <b>1 이상 6 미만</b>이라 1~5 다. 1+2+3+4+5 = <b>15</b>.',
    d: 2, y: [], tag: ['range', '반복문']
  },

  {
    id: 'ch10-s10-13', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'print(len(range(5)))',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['5'],
    why: '<code>range(5)</code> 는 <b>0, 1, 2, 3, 4</b> 로 다섯 개다. 시작을 생략하면 0부터이고 끝은 포함되지 않는다.',
    d: 2, y: [], tag: ['range']
  },

  {
    id: 'ch10-s10-14', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'def add(a, b=10):\n    return a + b\n\nprint(add(5))',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['15'],
    why: '<code>b</code> 에 <b>기본값 10</b> 이 있어 인자를 하나만 넘기면 b 는 10 으로 채워진다. 5+10 = <b>15</b>.',
    d: 2, y: [], tag: ['함수', '기본값']
  },

  {
    id: 'ch10-s10-15', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'def add(a, b=10):\n    return a + b\n\nprint(add(5, 20))',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['25'],
    why: '인자를 둘 다 넘기면 <b>기본값은 무시</b>된다. 5+20 = <b>25</b>. 앞 문제와 비교할 것.',
    d: 1, y: [], tag: ['함수', '기본값']
  },

  {
    id: 'ch10-s10-16', ch: 10, sec: 10,
    t: 'short',
    q: 'Python 클래스의 메소드가 <b>첫 번째 매개변수로 반드시 받아야</b> 하는 것은?',
    a: ['self'],
    why: '<code>self</code> 는 <b>객체 자신</b>을 가리킨다. 생성자 <code>__init__</code> 을 포함해 모든 인스턴스 메소드가 받아야 한다.',
    d: 2, y: [], tag: ['클래스', 'self'], lang: null, code: null
  },

  {
    id: 'ch10-s10-17', ch: 10, sec: 10,
    t: 'short',
    q: 'Python 이 <code>{ }</code> 대신 <b>블록을 구분</b>하는 데 쓰는 것은?',
    a: ['들여쓰기', 'Indentation', 'indent', '인덴테이션'],
    why: '<b>들여쓰기(Indentation)</b> 로 블록을 나눈다. 그래서 들여쓰기가 어긋나면 문법 오류가 난다.',
    d: 1, y: [], tag: ['문법', '들여쓰기'], lang: null, code: null
  },

  {
    id: 'ch10-s10-18', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'class 회원:\n    def __init__(self, 이름):\n        self.이름 = 이름\n        self.대출수 = 0\n\n    def 대출(self):\n        self.대출수 += 1\n\nm = 회원("김하늘")\nm.대출()\nm.대출()\nm.대출()\nprint(m.대출수)',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['3'],
    why: '<code>__init__</code> 이 0으로 초기화한 뒤 <code>대출()</code> 이 세 번 호출되어 <b>3</b> 이 된다.',
    d: 2, y: [], tag: ['클래스', '생성자']
  },

  /* ================================================ s11 프로그래밍 언어의 분류 */

  {
    id: 'ch10-s11-01', ch: 10, sec: 11,
    t: 'short',
    q: '<b>1972년 벨 연구소의 데니스 리치</b>가 UNIX 운영체제를 만들기 위해 개발한, 이식성이 좋은 절차적 언어는?',
    a: ['C', 'C언어', 'C 언어'],
    why: '<b>C</b> 다. "벨 연구소 · 데니스 리치 · UNIX · 이식성" 네 단어가 그대로 출제 키워드다.',
    d: 2, y: [], tag: ['절차적언어', 'C'], lang: null, code: null
  },

  {
    id: 'ch10-s11-02', ch: 10, sec: 11,
    t: 'short',
    q: '<b>1980년대 앨런 케이</b>가 개발했으며 <b>최초로 GUI 를 제공</b>한 객체 지향 언어는?',
    a: ['Smalltalk', '스몰토크', '스몰톡'],
    why: '<b>Smalltalk</b> 이다. "앨런 케이 · 최초의 GUI" 조합으로 나온다.',
    d: 2, y: [], tag: ['객체지향언어', 'Smalltalk'], lang: null, code: null
  },

  {
    id: 'ch10-s11-03', ch: 10, sec: 11,
    t: 'short',
    q: '<b>1960년 매카시</b>가 개발했으며 <b>인공지능 분야</b>에 쓰이는 함수형 언어는?',
    a: ['LISP', '리스프'],
    why: '<b>LISP</b> 다. 같은 인공지능 분야라도 <b>논리형</b>인 PROLOG 와 구분해야 한다. LISP 은 <b>함수형</b>이다.',
    d: 2, y: [], tag: ['선언형언어', 'LISP'], lang: null, code: null
  },

  {
    id: 'ch10-s11-04', ch: 10, sec: 11,
    t: 'choice',
    q: '<b>논리학을 기초</b>로 하여 논리적 추론이나 <b>삼단 논법</b> 표현에 적합한 언어는?',
    c: ['PROLOG', 'LISP', 'Haskell', 'COBOL'],
    a: 0,
    why: '<b>PROLOG</b> 는 논리형 언어다. LISP·Haskell 은 <b>함수형</b>, COBOL 은 <b>사무 처리용 절차적</b> 언어다.',
    d: 2, y: [], tag: ['선언형언어', 'PROLOG'], lang: null, code: null
  },

  {
    id: 'ch10-s11-05', ch: 10, sec: 11,
    t: 'short',
    q: '<b>사무 처리용</b>으로 만들어져 영어 문장 형식으로 구성된 절차적 언어는?',
    a: ['COBOL', '코볼'],
    why: '<b>COBOL</b> 이다. 같은 절차적 언어 중 <b>FORTRAN 은 과학 기술 계산용</b>, <b>PASCAL 은 교육용</b> 이라는 대응도 함께 외운다.',
    d: 2, y: [], tag: ['절차적언어', 'COBOL'], lang: null, code: null
  },

  {
    id: 'ch10-s11-06', ch: 10, sec: 11,
    t: 'choice',
    q: '다음 중 <b>클라이언트용</b> 스크립트 언어로만 묶인 것은?',
    c: [
      'JavaScript, VBScript',
      'ASP, JSP, PHP',
      'JSP, JavaScript',
      'PHP, VBScript'
    ],
    a: 0,
    why: '<b>클라이언트(브라우저)에서 실행</b>되는 것은 JavaScript·VBScript 다. ASP·JSP·PHP·Python 은 <b>서버</b>에서 실행되고 결과만 내려보낸다.',
    d: 3, y: [], tag: ['스크립트언어'], lang: null, code: null
  },

  {
    id: 'ch10-s11-07', ch: 10, sec: 11,
    t: 'ox',
    q: 'ASP 는 <b>Windows 계열에서만</b> 수행할 수 있다.',
    a: true,
    why: 'ASP 는 Windows 전용이다. 반면 <b>JSP 는 Java 로 만들어져 다양한 운영체제</b>에서 쓸 수 있다는 점이 짝으로 나온다.',
    d: 2, y: [], tag: ['스크립트언어', 'ASP'], lang: null, code: null
  },

  {
    id: 'ch10-s11-08', ch: 10, sec: 11,
    t: 'ox',
    q: '스크립트 언어는 미리 기계어로 컴파일해 두므로 실행 속도가 빠르다.',
    a: false,
    why: '스크립트 언어는 <b>컴파일하지 않고 인터프리터가 읽어 해석</b>하며 실행한다. 그래서 <b>실행 속도가 느리고 런타임 오류가 많다</b>. 대신 바로 실행해 결과를 빨리 볼 수 있다.',
    d: 2, y: [], tag: ['스크립트언어'], lang: null, code: null
  },

  /* ========================================================== s12 라이브러리 */

  {
    id: 'ch10-s12-01', ch: 10, sec: 12,
    t: 'short',
    q: '<code>sqrt</code>·<code>pow</code>·<code>abs</code>·<code>ceil</code>·<code>floor</code> 를 제공하는 C 표준 헤더 파일은?',
    a: ['math.h', 'math'],
    why: '<b>math.h</b> 는 수학 함수를 모아 둔 헤더다. 제곱근·거듭제곱·절댓값·올림·내림이 여기 있다.',
    d: 2, y: [], tag: ['라이브러리', 'math.h'], lang: null, code: null
  },

  {
    id: 'ch10-s12-02', ch: 10, sec: 12,
    t: 'short',
    q: '<code>malloc</code>·<code>free</code>·<code>atoi</code>·<code>rand</code> 를 제공하는 C 표준 헤더 파일은?',
    a: ['stdlib.h', 'stdlib'],
    why: '<b>stdlib.h</b> 는 <b>자료형 변환·난수 발생·메모리 할당</b>을 담당한다. 메모리 관련 함수가 여기 있다는 점이 자주 나온다.',
    d: 3, y: [], tag: ['라이브러리', 'stdlib.h'], lang: null, code: null
  },

  {
    id: 'ch10-s12-03', ch: 10, sec: 12,
    t: 'choice',
    q: '<code>printf</code>·<code>scanf</code>·<code>fopen</code>·<code>fclose</code> 가 들어 있는 헤더 파일은?',
    c: ['stdio.h', 'stdlib.h', 'string.h', 'time.h'],
    a: 0,
    why: '<b>stdio.h</b>(standard input/output)는 <b>입·출력</b> 기능을 제공한다. 파일 입출력 함수도 여기 있다.',
    d: 1, y: [], tag: ['라이브러리', 'stdio.h'], lang: null, code: null
  },

  {
    id: 'ch10-s12-04', ch: 10, sec: 12,
    t: 'short',
    q: 'Java 패키지 중 기본 자료형·예외 처리 등을 제공하며 <b>import 없이 자동으로 포함</b>되는 것은?',
    a: ['java.lang', 'javalang', 'lang'],
    why: '<b>java.lang</b> 만 자동 포함이다. <code>String</code>·<code>System</code> 을 import 없이 쓰는 이유가 이것이다.',
    d: 2, y: [], tag: ['라이브러리', 'java.lang'], lang: null, code: null
  },

  {
    id: 'ch10-s12-05', ch: 10, sec: 12,
    t: 'ox',
    q: '<b>java.awt</b> 는 네트워크 관련 기능을 제공하는 패키지다.',
    a: false,
    why: '<b>java.awt 는 GUI</b> 관련이다. 네트워크는 <b>java.net</b> 이다. 입·출력은 java.io, 날짜·난수는 java.util 이다.',
    d: 2, y: [], tag: ['라이브러리', 'java.awt'], lang: null, code: null
  },

  {
    id: 'ch10-s12-06', ch: 10, sec: 12,
    t: 'short',
    q: '개발자들이 필요한 기능을 만들어 인터넷에 공유해 둔 것으로, <b>다운로드해 설치한 뒤</b> 쓰는 라이브러리를 무엇이라 하는가?',
    a: ['외부 라이브러리', '외부라이브러리'],
    why: '<b>외부 라이브러리</b>다. 언어에 기본으로 딸려 오는 <b>표준 라이브러리</b>와 대비된다.',
    d: 1, y: [], tag: ['라이브러리'], lang: null, code: null
  },

  /* =========================================================== s13 예외 처리 */

  {
    id: 'ch10-s13-01', ch: 10, sec: 13,
    t: 'short',
    q: 'Java 예외 처리에서 <b>예외 발생 여부와 관계없이 반드시 실행</b>되는 블록은?',
    a: ['finally', '파이널리'],
    why: '<b>finally</b> 다. 반드시 실행되므로 파일 닫기 같은 <b>자원 반환 코드</b>를 여기에 둔다.',
    d: 1, y: [], tag: ['예외처리', 'finally'], lang: null, code: null
  },

  {
    id: 'ch10-s13-02', ch: 10, sec: 13,
    t: 'ox',
    q: '<code>finally</code> 블록은 예외가 발생했을 때만 실행된다.',
    a: false,
    why: '예외가 나든 안 나든 <b>항상</b> 실행된다. 예외가 났을 때만 실행되는 것은 <code>catch</code> 다.',
    d: 2, y: [], tag: ['예외처리', 'finally'], lang: null, code: null
  },

  {
    id: 'ch10-s13-03', ch: 10, sec: 13,
    t: 'short',
    q: '<b>0으로 나누는</b> 등 산술 연산에 오류가 있을 때 발생하는 Java 예외 객체는?',
    a: ['ArithmeticException', '산술예외'],
    why: '<b>ArithmeticException</b> 이다. 예외 객체 이름은 <b>상황을 그대로 영어로 옮긴 것</b>이라 뜻으로 외우면 된다.',
    d: 2, y: [], tag: ['예외처리', '예외객체'], lang: null, code: null
  },

  {
    id: 'ch10-s13-04', ch: 10, sec: 13,
    t: 'short',
    q: '<b>배열의 범위를 벗어난 인덱스</b>에 접근할 때 발생하는 Java 예외 객체는?',
    a: ['ArrayIndexOutOfBoundsException'],
    why: '<b>ArrayIndexOutOfBoundsException</b> 이다. Array + Index + OutOfBounds 로 끊어 읽으면 외우기 쉽다.',
    d: 3, y: [], tag: ['예외처리', '예외객체'], lang: null, code: null
  },

  {
    id: 'ch10-s13-05', ch: 10, sec: 13,
    t: 'short',
    q: '<b>null 인 객체</b>의 멤버에 접근할 때 발생하는 Java 예외 객체는?',
    a: ['NullPointerException', 'NPE'],
    why: '<b>NullPointerException</b> 이다. 실무에서도 가장 흔한 예외라 약어 NPE 로 부른다.',
    d: 2, y: [], tag: ['예외처리', '예외객체'], lang: null, code: null
  },

  {
    id: 'ch10-s13-06', ch: 10, sec: 13,
    t: 'short',
    q: '<b>숫자로 변환할 수 없는 문자열</b>을 변환하려 할 때 발생하는 Java 예외 객체는?',
    a: ['NumberFormatException'],
    why: '<b>NumberFormatException</b> 이다. <code>Integer.parseInt("abc")</code> 같은 경우다. 인자 자체가 잘못된 경우인 <b>IllegalArgumentException</b> 과 구분한다.',
    d: 3, y: [], tag: ['예외처리', '예외객체'], lang: null, code: null
  },

  {
    id: 'ch10-s13-07', ch: 10, sec: 13,
    t: 'code', lang: 'java',
    code: 'try {\n    System.out.print("A");\n    int r = 10 / 0;\n    System.out.print("B");\n} catch (ArithmeticException e) {\n    System.out.print("C");\n} finally {\n    System.out.print("D");\n}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['ACD'],
    why: 'A 를 찍고 <code>10 / 0</code> 에서 예외가 나 <b>B 는 건너뛴다</b>. catch 로 넘어가 C, 마지막에 finally 가 반드시 실행되어 D. 따라서 <b>ACD</b>.',
    d: 3, y: [], tag: ['예외처리', 'try-catch-finally']
  },

  {
    id: 'ch10-s13-08', ch: 10, sec: 13,
    t: 'choice',
    q: '<code>try</code> · <code>catch</code> · <code>finally</code> 의 역할로 <b>옳은</b> 것은?',
    c: [
      'try 는 예외 가능성이 있는 코드, catch 는 예외 처리 코드, finally 는 항상 실행되는 코드',
      'try 는 예외 처리 코드, catch 는 항상 실행, finally 는 예외 가능성이 있는 코드',
      'try 는 항상 실행, catch 는 예외 가능성이 있는 코드, finally 는 예외 처리 코드',
      '세 블록 모두 예외가 발생했을 때만 실행된다'
    ],
    a: 0,
    why: '<b>try 에서 터지면 catch 가 받고, finally 는 무조건 실행</b>된다. 이 흐름이 그대로 문제로 나온다.',
    d: 1, y: [], tag: ['예외처리'], lang: null, code: null
  },

  {
    id: 'ch10-s13-09', ch: 10, sec: 13,
    t: 'ox',
    q: 'Python 의 예외 처리에는 <b>예외가 발생하지 않았을 때만</b> 실행되는 <code>else</code> 블록이 있다.',
    a: true,
    why: 'Java 에는 없고 <b>Python 에만 있는</b> 블록이다. 순서는 <code>try → except → else → finally</code> 다.',
    d: 3, y: [], tag: ['예외처리', 'Python'], lang: null, code: null
  }

];
