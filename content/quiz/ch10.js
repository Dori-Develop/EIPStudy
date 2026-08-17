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
    q: '다음 C 코드의 출력 결과를 쓰시오.',
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
  },

  {
    id: 'ch10-s13-10', ch: 10, sec: 13,
    t: 'short',
    q: '람다식으로 받으려면 인터페이스에 <b>추상 메소드가 몇 개</b> 있어야 하는가?',
    a: ['1', '1개', '하나', '한 개'],
    why: '<b>하나</b>여야 한다. 이런 인터페이스를 <b>함수형 인터페이스</b>라 하고 <code>@FunctionalInterface</code> 로 검사할 수 있다. 🚨 둘 이상이면 <b>어느 메소드를 구현한 것인지 알 수 없어</b> 람다로 못 받는다. 📌 <code>default</code>·<code>static</code> 메소드는 여러 개여도 된다.',
    d: 3, y: [], tag: ['람다', '함수형인터페이스'], lang: null, code: null
  },

  {
    id: 'ch10-s13-11', ch: 10, sec: 13,
    t: 'choice',
    q: '표준 함수형 인터페이스 중 <b>받아서 참·거짓을 돌려주는</b> 것은?',
    c: ['Function', 'Supplier', 'Consumer', 'Predicate'],
    a: 3,
    why: '<b>Predicate</b> 는 <code>boolean test(T t)</code> 다. <b>Function</b> 은 받아서 바꿔 주고, <b>Supplier</b> 는 주기만 하고, <b>Consumer</b> 는 받아서 쓰기만 한다.',
    d: 3, y: [], tag: ['람다', '함수형인터페이스'], lang: null, code: null
  }
,

  /* ======================================================================
     🚨 T46 4절 — Java 코드 문항 (2026-08-17)

     Java 가 5문항뿐이었다. 실제 기출은 C 와 거의 대등하다 (C 43 · Java 40 · Python 16).
     코드 길이도 우리는 중앙 10줄인데 실제는 **중앙 16줄**이다.

     📌 실제 회차의 결을 따른다 — 클래스·상속·다형성·배열·중첩 반복·재귀.
        길이는 11~20줄, 상한 28줄. → exam-archive/README.md 2장
     ====================================================================== */

  {
    id: 'ch10-s08-13', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class Account {\n'
        + '    static int total = 0;\n'
        + '    private int balance;\n'
        + '\n'
        + '    Account(int b) {\n'
        + '        balance = b;\n'
        + '        total += b;\n'
        + '    }\n'
        + '    int get() { return balance; }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        Account a = new Account(300);\n'
        + '        Account b = new Account(200);\n'
        + '        System.out.print(a.get() + "," + Account.total);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['300,500'],
    why: '<code>balance</code> 는 객체마다 따로라 a 의 것은 <b>300</b> 이다. '
       + '<code>total</code> 은 <b>static</b> 이라 모든 객체가 공유하므로 300+200=<b>500</b> 이 된다.',
    d: 2, y: [], tag: ['static', '생성자', '접근제어자']
  },

  {
    id: 'ch10-s08-14', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class Box {\n'
        + '    int w, h;\n'
        + '\n'
        + '    Box() {\n'
        + '        this(2, 3);\n'
        + '    }\n'
        + '    Box(int w, int h) {\n'
        + '        this.w = w;\n'
        + '        this.h = h;\n'
        + '    }\n'
        + '    int area() { return w * h; }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        Box p = new Box();\n'
        + '        Box q = new Box(4, 5);\n'
        + '        System.out.print(p.area() + q.area());\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['26'],
    why: '<code>this(2, 3)</code> 은 <b>같은 클래스의 다른 생성자</b>를 부른다. '
       + 'p 는 2×3=6, q 는 4×5=20 이라 합이 <b>26</b> 이다.',
    d: 2, y: [], tag: ['생성자', 'this', '오버로딩']
  },

  {
    id: 'ch10-s08-15', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class Util {\n'
        + '    static int add(int a, int b) { return a + b; }\n'
        + '    static double add(double a, double b) { return a + b; }\n'
        + '    static int add(int a, int b, int c) { return a + b + c; }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int x = Util.add(1, 2);\n'
        + '        int y = Util.add(1, 2, 3);\n'
        + '        double z = Util.add(1.5, 2.5);\n'
        + '        System.out.print(x + y + (int) z);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['13'],
    why: '<b>오버로딩</b> 은 매개변수의 개수나 타입으로 갈린다. '
       + 'x=3, y=6, z=4.0 이고 <code>(int) z</code> 가 4 이므로 3+6+4=<b>13</b> 이다.',
    d: 2, y: [], tag: ['오버로딩', '형변환']
  },

  {
    id: 'ch10-s08-16', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class Point {\n'
        + '    int x;\n'
        + '    Point(int x) { this.x = x; }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    static void change(Point p, int v) {\n'
        + '        p.x = v;\n'
        + '    }\n'
        + '    static void swap(int a, int b) {\n'
        + '        int t = a; a = b; b = t;\n'
        + '    }\n'
        + '    public static void main(String[] args) {\n'
        + '        Point p = new Point(1);\n'
        + '        int m = 1, n = 2;\n'
        + '        change(p, 9);\n'
        + '        swap(m, n);\n'
        + '        System.out.print(p.x + "" + m + n);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['912'],
    why: '객체는 <b>참조가 복사</b>되므로 <code>change</code> 안의 변경이 밖에 보인다(9). '
       + '기본형은 <b>값이 복사</b>되므로 <code>swap</code> 은 밖의 m·n 을 바꾸지 못한다(1, 2).',
    d: 3, y: [], tag: ['매개변수전달', '참조']
  },

  {
    id: 'ch10-s09-13', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'class Animal {\n'
        + '    void cry() { System.out.print("동물"); }\n'
        + '    void info() {\n'
        + '        cry();\n'
        + '        System.out.print("!");\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'class Dog extends Animal {\n'
        + '    void cry() { System.out.print("멍멍"); }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        Animal a = new Dog();\n'
        + '        a.info();\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['멍멍!'],
    why: '참조 변수의 타입은 Animal 이지만 <b>실제 객체가 Dog</b> 이라 재정의된 '
       + '<code>cry()</code> 가 불린다. 상위 클래스 안에서 부른 것도 마찬가지다 — '
       + '<b>오버라이딩된 메소드는 객체를 따라간다.</b>',
    d: 3, y: [], tag: ['오버라이딩', '다형성']
  },

  {
    id: 'ch10-s09-14', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'class A {\n'
        + '    A() { System.out.print("A"); }\n'
        + '    A(int n) {\n'
        + '        this();\n'
        + '        System.out.print(n);\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'class B extends A {\n'
        + '    B() {\n'
        + '        super(5);\n'
        + '        System.out.print("B");\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        new B();\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['A5B'],
    why: '<code>super(5)</code> 가 A(int) 를 부르고, 그것이 다시 <code>this()</code> 로 '
       + 'A() 를 부른다. <b>상위 생성자가 먼저 끝난 뒤</b> B 의 몸통이 실행되므로 A → 5 → B 다.',
    d: 3, y: [], tag: ['생성자', 'super', 'this']
  },

  {
    id: 'ch10-s09-15', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'abstract class Shape {\n'
        + '    abstract int area();\n'
        + '    void show() {\n'
        + '        System.out.print(area() + " ");\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'class Rect extends Shape {\n'
        + '    int area() { return 3 * 4; }\n'
        + '}\n'
        + 'class Squ extends Shape {\n'
        + '    int area() { return 5 * 5; }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        Shape[] arr = { new Rect(), new Squ() };\n'
        + '        for (Shape s : arr) s.show();\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['12 25', '12 25 '],
    why: '<b>추상 클래스 타입의 배열</b>에 자식 객체를 담아 같은 이름으로 부르면 '
       + '각자의 재정의가 실행된다. 3×4=12, 5×5=25.',
    d: 3, y: [], tag: ['추상클래스', '다형성', '향상된for']
  },

  {
    id: 'ch10-s09-16', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'interface Movable {\n'
        + '    int SPEED = 10;\n'
        + '    void move();\n'
        + '}\n'
        + 'interface Stoppable {\n'
        + '    void stop();\n'
        + '}\n'
        + '\n'
        + 'class Car implements Movable, Stoppable {\n'
        + '    public void move() { System.out.print(SPEED); }\n'
        + '    public void stop() { System.out.print("S"); }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        Car c = new Car();\n'
        + '        c.move();\n'
        + '        c.stop();\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['10S'],
    why: '인터페이스는 <b>다중 구현</b>이 된다(<code>implements A, B</code>). '
       + '인터페이스의 변수는 자동으로 <code>public static final</code> 이라 SPEED 는 10 이다.',
    d: 3, y: [], tag: ['인터페이스', '다중구현']
  },

  {
    id: 'ch10-s04-10', ch: 10, sec: 4,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int[][] a = new int[3][3];\n'
        + '        for (int i = 0; i < 3; i++) {\n'
        + '            for (int j = 0; j < 3; j++) {\n'
        + '                if (i == j) a[i][j] = 1;\n'
        + '                else a[i][j] = 0;\n'
        + '            }\n'
        + '        }\n'
        + '        int sum = 0;\n'
        + '        for (int i = 0; i < 3; i++) {\n'
        + '            for (int j = 0; j < 3; j++) {\n'
        + '                sum += a[i][j] * (i + j);\n'
        + '            }\n'
        + '        }\n'
        + '        System.out.print(sum);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['6'],
    why: '<b>단위 행렬</b>이 만들어져 대각선(i==j)만 1 이다. '
       + '더해지는 것은 i+j 가 0, 2, 4 인 세 자리뿐이라 <b>0+2+4=6</b> 이다.',
    d: 3, y: [], tag: ['2차원배열', '중첩반복문']
  },

  {
    id: 'ch10-s04-11', ch: 10, sec: 4,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int[] a = { 5, 3, 8, 1, 9 };\n'
        + '        for (int i = 0; i < a.length - 1; i++) {\n'
        + '            for (int j = 0; j < a.length - 1 - i; j++) {\n'
        + '                if (a[j] > a[j + 1]) {\n'
        + '                    int t = a[j];\n'
        + '                    a[j] = a[j + 1];\n'
        + '                    a[j + 1] = t;\n'
        + '                }\n'
        + '            }\n'
        + '        }\n'
        + '        System.out.print(a[0] + "," + a[4]);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['1,9'],
    why: '<b>버블 정렬</b>이다. 오름차순으로 정렬되어 맨 앞이 최솟값 <b>1</b>, '
       + '맨 뒤가 최댓값 <b>9</b> 가 된다.',
    d: 2, y: [], tag: ['배열', '정렬', '버블정렬']
  },

  {
    id: 'ch10-s04-12', ch: 10, sec: 4,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        String s = "Engineer";\n'
        + '        int cnt = 0;\n'
        + '        for (int i = 0; i < s.length(); i++) {\n'
        + '            char c = s.charAt(i);\n'
        + '            if (c == \'e\' || c == \'E\') cnt++;\n'
        + '        }\n'
        + '        System.out.print(s.substring(0, 3) + cnt);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['Eng3'],
    why: '<code>Engineer</code> 에서 e/E 는 맨 앞 E, 4번째 e, 마지막에서 두 번째 e 로 <b>3개</b>다. '
       + '<code>substring(0, 3)</code> 은 <b>0번부터 3번 앞까지</b>라 <code>Eng</code> 다.',
    d: 2, y: [], tag: ['문자열', 'substring', 'charAt']
  },

  {
    id: 'ch10-s03-14', ch: 10, sec: 3,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    static int f(int n) {\n'
        + '        if (n <= 1) return 1;\n'
        + '        return n * f(n - 1);\n'
        + '    }\n'
        + '    static int g(int n) {\n'
        + '        if (n <= 2) return 1;\n'
        + '        return g(n - 1) + g(n - 2);\n'
        + '    }\n'
        + '    public static void main(String[] args) {\n'
        + '        System.out.print(f(4) + "," + g(6));\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['24,8'],
    why: '<code>f</code> 는 <b>팩토리얼</b>이라 4×3×2×1=<b>24</b>. '
       + '<code>g</code> 는 <b>피보나치</b>로 1,1,2,3,5,<b>8</b> 이므로 g(6)=8 이다.',
    d: 3, y: [], tag: ['재귀', '팩토리얼', '피보나치']
  },

  {
    id: 'ch10-s03-15', ch: 10, sec: 3,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int sum = 0;\n'
        + '        for (int i = 1; i <= 10; i++) {\n'
        + '            if (i % 3 == 0) continue;\n'
        + '            if (i > 8) break;\n'
        + '            sum += i;\n'
        + '        }\n'
        + '        System.out.print(sum);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['27'],
    why: '3의 배수(3·6·9)는 <code>continue</code> 로 건너뛴다. i=10 은 9 에서 continue '
       + '한 뒤 10 에서 <code>break</code> 로 빠진다. 더해진 것은 1+2+4+5+7+8=<b>27</b> 이다.',
    d: 3, y: [], tag: ['제어문', 'continue', 'break']
  },

  {
    id: 'ch10-s03-16', ch: 10, sec: 3,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int n = 4;\n'
        + '        int total = 0;\n'
        + '        for (int i = 1; i <= n; i++) {\n'
        + '            for (int j = 1; j <= i; j++) {\n'
        + '                total += j;\n'
        + '            }\n'
        + '        }\n'
        + '        System.out.print(total);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['20'],
    why: '안쪽 반복이 1부터 i 까지 더한다. i=1→1, 2→3, 3→6, 4→10 이므로 '
       + '1+3+6+10=<b>20</b> 이다.',
    d: 2, y: [], tag: ['중첩반복문']
  },

  {
    id: 'ch10-s13-12', ch: 10, sec: 13,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    static int test() {\n'
        + '        try {\n'
        + '            int[] a = new int[2];\n'
        + '            a[3] = 1;\n'
        + '            return 1;\n'
        + '        } catch (ArrayIndexOutOfBoundsException e) {\n'
        + '            return 2;\n'
        + '        } finally {\n'
        + '            System.out.print("F");\n'
        + '        }\n'
        + '    }\n'
        + '    public static void main(String[] args) {\n'
        + '        System.out.print(test());\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['F2'],
    why: '길이 2인 배열의 <code>a[3]</code> 이라 <b>ArrayIndexOutOfBoundsException</b> 이 '
       + 'catch 로 간다. <code>finally</code> 는 <b>return 하기 전에</b> 실행되므로 F 가 먼저 찍히고 '
       + '그 뒤 반환값 2 가 찍힌다.',
    d: 3, y: [], tag: ['예외처리', 'finally']
  },

  {
    id: 'ch10-s13-13', ch: 10, sec: 13,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        String s = "10";\n'
        + '        int r = 0;\n'
        + '        try {\n'
        + '            r = Integer.parseInt(s) / 0;\n'
        + '        } catch (NumberFormatException e) {\n'
        + '            r = -1;\n'
        + '        } catch (ArithmeticException e) {\n'
        + '            r = -2;\n'
        + '        } finally {\n'
        + '            r += 100;\n'
        + '        }\n'
        + '        System.out.print(r);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['98'],
    why: '<code>"10"</code> 은 숫자로 잘 바뀌므로 NumberFormatException 이 아니라 '
       + '<b>0으로 나눠 ArithmeticException</b> 이 난다. r 이 −2 가 된 뒤 finally 에서 '
       + '100 을 더해 <b>98</b> 이다.',
    d: 3, y: [], tag: ['예외처리', 'ArithmeticException']
  },

  {
    id: 'ch10-s01-11', ch: 10, sec: 1,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int a = 7, b = 2;\n'
        + '        double c = 7 / 2;\n'
        + '        double d = 7 / 2.0;\n'
        + '        int e = (int) 3.9;\n'
        + '        System.out.print(a / b);\n'
        + '        System.out.print(" " + c);\n'
        + '        System.out.print(" " + d);\n'
        + '        System.out.print(" " + e);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['3 3.0 3.5 3'],
    why: '정수끼리 나누면 <b>몫만</b> 남는다(7/2=3). <code>7 / 2</code> 를 double 에 담아도 '
       + '이미 3 이라 <b>3.0</b> 이고, <code>7 / 2.0</code> 이라야 3.5 다. '
       + '<code>(int)</code> 형변환은 <b>버림</b>이라 3.9 → 3.',
    d: 3, y: [], tag: ['형변환', '정수나눗셈']
  },

  {
    id: 'ch10-s02-13', ch: 10, sec: 2,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int a = 5;\n'
        + '        int b = a++ + ++a;\n'
        + '        int c = a-- - --a;\n'
        + '        System.out.print(a + "," + b + "," + c);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['5,12,2'],
    why: '<code>a++</code> 는 5 를 쓰고 6, <code>++a</code> 는 7 이 되고 7 을 써서 b=<b>12</b>. '
       + '이어서 <code>a--</code> 는 7 을 쓰고 6, <code>--a</code> 는 5 가 되고 5 를 써서 '
       + 'c=7−5=<b>2</b>, a 는 <b>5</b> 로 남는다.',
    d: 3, y: [], tag: ['증감연산자']
  },

  {
    id: 'ch10-s08-17', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class Stack {\n'
        + '    private int[] buf = new int[5];\n'
        + '    private int top = 0;\n'
        + '\n'
        + '    void push(int v) {\n'
        + '        if (top < buf.length) buf[top++] = v;\n'
        + '    }\n'
        + '    int pop() {\n'
        + '        if (top == 0) return -1;\n'
        + '        return buf[--top];\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        Stack s = new Stack();\n'
        + '        s.push(1); s.push(2); s.push(3);\n'
        + '        s.pop();\n'
        + '        s.push(4);\n'
        + '        System.out.print(s.pop() + "" + s.pop());\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['42'],
    why: '<b>스택은 LIFO</b> 다. 1·2·3 을 넣고 3 을 꺼낸 뒤 4 를 넣으면 안에 1·2·4 가 있다. '
       + '두 번 꺼내면 <b>4</b>, 그다음 <b>2</b> 다.',
    d: 3, y: [], tag: ['배열', '스택', 'LIFO']
  },

  {
    id: 'ch10-s09-17', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'class Parent {\n'
        + '    String name = "P";\n'
        + '    String who() { return "parent"; }\n'
        + '}\n'
        + '\n'
        + 'class Child extends Parent {\n'
        + '    String name = "C";\n'
        + '    String who() { return "child"; }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        Parent p = new Child();\n'
        + '        System.out.print(p.name + p.who());\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['Pchild'],
    why: '🚨 <b>필드와 메소드가 다르게 움직인다.</b> 필드는 <b>참조 변수의 타입</b>을 따라 '
       + 'Parent 의 <code>P</code> 가 나오고, 메소드는 <b>실제 객체</b>를 따라 재정의된 '
       + '<code>child</code> 가 나온다.',
    d: 3, y: [], tag: ['오버라이딩', '다형성', '필드은닉']
  }
,

  /* ======================================================================
     🚨 T46 4절 — C 코드 문항 (2026-08-17)

     C 는 33문항이 있었지만 **전부 2~9줄**이었다. 실제는 11~20줄(중앙 15)이다.
     수보다 길이가 문제라 **긴 것을 새로 만든다** — 짧은 것은 섹션 퀴즈에 그대로 둔다.

     📌 실제 회차의 주제 — 포인터 산술 · 배열 인덱스 · 구조체 · 재귀 ·
        중첩 반복 · 문자열 · 자료구조. → exam-archive/README.md 2장
     ====================================================================== */

  {
    id: 'ch10-s05-17', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int a[5] = { 10, 20, 30, 40, 50 };\n'
        + '    int *p = a;\n'
        + '    int sum = 0;\n'
        + '\n'
        + '    p = p + 2;\n'
        + '    sum += *p;\n'
        + '    sum += *(p - 1);\n'
        + '    sum += *(a + 4);\n'
        + '    printf("%d", sum);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['100'],
    why: '<code>p = p + 2</code> 로 p 가 a[2] 를 가리킨다. '
       + '<code>*p</code>=30, <code>*(p-1)</code>=a[1]=20, <code>*(a+4)</code>=a[4]=50 이라 '
       + '30+20+50=<b>100</b> 이다. <b>포인터에 정수를 더하면 칸 단위로 움직인다.</b>',
    d: 3, y: [], tag: ['포인터', '포인터연산', '배열']
  },

  {
    id: 'ch10-s05-18', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'void swap(int *x, int *y) {\n'
        + '    int t = *x;\n'
        + '    *x = *y;\n'
        + '    *y = t;\n'
        + '}\n'
        + 'void bad(int x, int y) {\n'
        + '    int t = x; x = y; y = t;\n'
        + '}\n'
        + '\n'
        + 'int main() {\n'
        + '    int a = 1, b = 2, c = 3, d = 4;\n'
        + '    swap(&a, &b);\n'
        + '    bad(c, d);\n'
        + '    printf("%d%d%d%d", a, b, c, d);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['2134'],
    why: '<code>swap</code> 은 <b>주소를 받아</b> 원본을 바꾸므로 a·b 가 2·1 이 된다. '
       + '<code>bad</code> 는 <b>값을 복사</b>해 받아 밖의 c·d 는 3·4 그대로다.',
    d: 3, y: [], tag: ['포인터', '매개변수전달', 'CallByReference']
  },

  {
    id: 'ch10-s05-19', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int a[3][3] = { {1,2,3}, {4,5,6}, {7,8,9} };\n'
        + '    int *p = &a[0][0];\n'
        + '    int i, sum = 0;\n'
        + '\n'
        + '    for (i = 0; i < 9; i += 2) {\n'
        + '        sum += *(p + i);\n'
        + '    }\n'
        + '    printf("%d", sum);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['25'],
    why: '2차원 배열도 메모리에는 <b>한 줄로</b> 놓인다(1~9). i 가 0,2,4,6,8 이므로 '
       + '1+3+5+7+9=<b>25</b> 다.',
    d: 3, y: [], tag: ['포인터', '2차원배열', '메모리배치']
  },

  {
    id: 'ch10-s05-20', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    char s[] = "ABCDEF";\n'
        + '    char *p = s;\n'
        + '    int cnt = 0;\n'
        + '\n'
        + '    while (*p != \'\\0\') {\n'
        + '        if ((*p - \'A\') % 2 == 0) cnt++;\n'
        + '        p++;\n'
        + '    }\n'
        + '    printf("%d %c", cnt, *(s + 3));\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['3 D'],
    why: '<code>*p - \'A\'</code> 가 0~5 이고 짝수는 A·C·E 세 개다. '
       + '<code>*(s+3)</code> 은 s[3] 이라 <b>D</b>. 문자열의 끝은 <code>\'\\0\'</code> 이다.',
    d: 3, y: [], tag: ['포인터', '문자열', '아스키']
  },

  {
    id: 'ch10-s06-09', ch: 10, sec: 6,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'struct Book {\n'
        + '    int no;\n'
        + '    int price;\n'
        + '};\n'
        + '\n'
        + 'int main() {\n'
        + '    struct Book b[3] = { {1, 100}, {2, 200}, {3, 300} };\n'
        + '    struct Book *p = b;\n'
        + '    int sum = 0;\n'
        + '\n'
        + '    sum += p->price;\n'
        + '    p++;\n'
        + '    sum += p->price;\n'
        + '    sum += (p + 1)->no;\n'
        + '    printf("%d", sum);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['303'],
    why: '<b>포인터로 구조체를 가리키면 <code>-></code> 로 접근</b>한다. '
       + '100 + 200 + (세 번째의 no)3 = <b>303</b> 이다. '
       + '<code>p++</code> 는 구조체 <b>한 칸</b>만큼 움직인다.',
    d: 3, y: [], tag: ['구조체', '포인터', '화살표연산자']
  },

  {
    id: 'ch10-s06-10', ch: 10, sec: 6,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'struct P {\n'
        + '    char name[10];\n'
        + '    int age;\n'
        + '};\n'
        + '\n'
        + 'void grow(struct P *p) {\n'
        + '    p->age += 10;\n'
        + '}\n'
        + 'void grow2(struct P p) {\n'
        + '    p.age += 100;\n'
        + '}\n'
        + '\n'
        + 'int main() {\n'
        + '    struct P a = { "kim", 20 };\n'
        + '    grow(&a);\n'
        + '    grow2(a);\n'
        + '    printf("%d", a.age);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['30'],
    why: '구조체를 <b>값으로 넘기면 통째로 복사</b>되어 밖이 안 바뀐다(grow2). '
       + '주소로 넘긴 grow 만 반영되어 20+10=<b>30</b> 이다.',
    d: 3, y: [], tag: ['구조체', '포인터', '매개변수전달']
  },

  {
    id: 'ch10-s07-12', ch: 10, sec: 7,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int gcd(int a, int b) {\n'
        + '    if (b == 0) return a;\n'
        + '    return gcd(b, a % b);\n'
        + '}\n'
        + 'int sum(int n) {\n'
        + '    if (n <= 0) return 0;\n'
        + '    return n + sum(n - 2);\n'
        + '}\n'
        + '\n'
        + 'int main() {\n'
        + '    printf("%d %d", gcd(24, 18), sum(7));\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['6 16'],
    why: '<b>유클리드 호제법</b> — gcd(24,18)→gcd(18,6)→gcd(6,0)=<b>6</b>. '
       + '<code>sum(7)</code> 은 7+5+3+1=<b>16</b> 이다(2씩 줄어 홀수만 더한다).',
    d: 3, y: [], tag: ['재귀', '최대공약수']
  },

  {
    id: 'ch10-s07-13', ch: 10, sec: 7,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int cnt = 0;\n'
        + '\n'
        + 'int f(int n) {\n'
        + '    cnt++;\n'
        + '    if (n < 2) return n;\n'
        + '    return f(n - 1) + f(n - 2);\n'
        + '}\n'
        + '\n'
        + 'int main() {\n'
        + '    int r = f(5);\n'
        + '    printf("%d %d", r, cnt);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['5 15'],
    why: '<b>피보나치</b> f(5)=5 다. 호출 횟수는 f(n) 이 <code>2·f(n+1)−1</code> 번이라 '
       + 'f(5) 는 <b>15</b> 번 불린다 — 같은 값을 여러 번 다시 계산하는 것이 재귀의 약점이다.',
    d: 3, y: [], tag: ['재귀', '피보나치', '전역변수']
  },

  {
    id: 'ch10-s04-13', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int a[8] = { 3, 7, 1, 9, 4, 6, 2, 8 };\n'
        + '    int max = a[0], min = a[0];\n'
        + '    int i;\n'
        + '\n'
        + '    for (i = 1; i < 8; i++) {\n'
        + '        if (a[i] > max) max = a[i];\n'
        + '        if (a[i] < min) min = a[i];\n'
        + '    }\n'
        + '    printf("%d", max - min);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['8'],
    why: '최댓값 9, 최솟값 1 이므로 9−1=<b>8</b> 이다.',
    d: 2, y: [], tag: ['배열', '최대최소']
  },

  {
    id: 'ch10-s04-14', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int a[5] = { 1, 2, 3, 4, 5 };\n'
        + '    int i, j, t;\n'
        + '\n'
        + '    for (i = 0, j = 4; i < j; i++, j--) {\n'
        + '        t = a[i];\n'
        + '        a[i] = a[j];\n'
        + '        a[j] = t;\n'
        + '    }\n'
        + '    for (i = 0; i < 5; i++) printf("%d", a[i]);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['54321'],
    why: '양 끝에서 안쪽으로 오며 맞바꾸는 <b>배열 뒤집기</b>다. '
       + '가운데(a[2])는 i&lt;j 가 깨져 그대로 남는다.',
    d: 2, y: [], tag: ['배열', '뒤집기']
  },

  {
    id: 'ch10-s04-15', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '#include <string.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    char a[20] = "Hello";\n'
        + '    char b[] = "World";\n'
        + '\n'
        + '    strcat(a, b);\n'
        + '    printf("%d ", (int) strlen(a));\n'
        + '    printf("%c", a[5]);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['10 W'],
    why: '<code>strcat</code> 이 이어 붙여 <code>HelloWorld</code> 가 되므로 길이는 <b>10</b> '
       + '(널 문자는 세지 않는다). a[5] 는 여섯 번째 글자라 <b>W</b> 다.',
    d: 2, y: [], tag: ['문자열', 'strcat', 'strlen']
  },

  {
    id: 'ch10-s03-17', ch: 10, sec: 3,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int i, j;\n'
        + '    int cnt = 0;\n'
        + '\n'
        + '    for (i = 2; i <= 20; i++) {\n'
        + '        int prime = 1;\n'
        + '        for (j = 2; j * j <= i; j++) {\n'
        + '            if (i % j == 0) { prime = 0; break; }\n'
        + '        }\n'
        + '        if (prime) cnt++;\n'
        + '    }\n'
        + '    printf("%d", cnt);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['8'],
    why: '2 이상 20 이하의 <b>소수</b>를 센다 — 2, 3, 5, 7, 11, 13, 17, 19 로 <b>8개</b>다. '
       + '<code>j*j &lt;= i</code> 는 제곱근까지만 나눠 보는 것이다.',
    d: 3, y: [], tag: ['중첩반복문', '소수']
  },

  {
    id: 'ch10-s03-18', ch: 10, sec: 3,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int n = 1234;\n'
        + '    int rev = 0;\n'
        + '    int sum = 0;\n'
        + '\n'
        + '    while (n > 0) {\n'
        + '        int d = n % 10;\n'
        + '        sum += d;\n'
        + '        rev = rev * 10 + d;\n'
        + '        n /= 10;\n'
        + '    }\n'
        + '    printf("%d %d", rev, sum);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['4321 10'],
    why: '<code>%10</code> 으로 뒤에서부터 한 자리씩 떼어 <code>rev*10+d</code> 로 쌓으면 '
       + '<b>자릿수가 뒤집힌다</b>(4321). 자릿수 합은 1+2+3+4=<b>10</b> 이다.',
    d: 3, y: [], tag: ['반복문', '자릿수', '나머지연산']
  },

  {
    id: 'ch10-s03-19', ch: 10, sec: 3,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int i = 0, s = 0;\n'
        + '\n'
        + '    do {\n'
        + '        i++;\n'
        + '        if (i % 2 == 0) continue;\n'
        + '        s += i;\n'
        + '    } while (i < 10);\n'
        + '\n'
        + '    switch (s % 4) {\n'
        + '        case 0: s += 100;\n'
        + '        case 1: s += 10;\n'
        + '                break;\n'
        + '        default: s += 1;\n'
        + '    }\n'
        + '    printf("%d", s);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['35'],
    why: '<code>do~while</code> 에서 <code>continue</code> 는 <b>조건 검사로 간다</b>(빠져나가지 않는다). '
       + '홀수만 더해져 1+3+5+7+9=<b>25</b>. <code>25 % 4</code> 가 1 이라 '
       + '<code>case 1</code> 로 <b>바로 들어가</b> 10 을 더하고 <code>break</code> 로 나온다 → <b>35</b>. '
       + '🚨 <b>case 0 을 지나온 것이 아니므로 100 은 더해지지 않는다</b> — '
       + '폴스루는 <b>들어온 자리부터 아래로</b> 흐르는 것이지 위로 거슬러 가지 않는다.',
    d: 3, y: [], tag: ['do-while', 'switch', '폴스루']
  },

  {
    id: 'ch10-s02-14', ch: 10, sec: 2,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int a = 12;\n'
        + '    int b = 10;\n'
        + '\n'
        + '    printf("%d ", a & b);\n'
        + '    printf("%d ", a | b);\n'
        + '    printf("%d ", a ^ b);\n'
        + '    printf("%d", a << 1);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['8 14 6 24'],
    why: '12=1100, 10=1010. <b>AND</b> 1000=8, <b>OR</b> 1110=14, <b>XOR</b> 0110=6. '
       + '<code>&lt;&lt;1</code> 은 <b>2배</b>라 24 다.',
    d: 3, y: [], tag: ['비트연산', '시프트']
  },

  {
    id: 'ch10-s02-15', ch: 10, sec: 2,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int a = 5, b = 0, c = 0;\n'
        + '\n'
        + '    if (a > 3 || ++b > 0) c += 1;\n'
        + '    if (a < 3 && ++b > 0) c += 2;\n'
        + '    if (a > 3 && ++b > 0) c += 4;\n'
        + '    printf("%d %d", b, c);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['1 5'],
    why: '🚨 <b>단축 평가</b>다. 첫 줄은 앞이 참이라 <code>||</code> 의 뒤를 <b>안 본다</b>. '
       + '둘째 줄은 앞이 거짓이라 <code>&amp;&amp;</code> 의 뒤를 <b>안 본다</b>. '
       + '셋째 줄에서만 <code>++b</code> 가 실행되어 b=<b>1</b>, c=1+4=<b>5</b> 다.',
    d: 3, y: [], tag: ['논리연산자', '단축평가']
  },

  {
    id: 'ch10-s01-12', ch: 10, sec: 1,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    char c = \'A\';\n'
        + '    int i = c + 2;\n'
        + '    double d = 10 / 4;\n'
        + '    double e = (double) 10 / 4;\n'
        + '\n'
        + '    printf("%c ", c + 2);\n'
        + '    printf("%d ", i);\n'
        + '    printf("%.1f ", d);\n'
        + '    printf("%.1f", e);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['C 67 2.0 2.5'],
    why: '<code>\'A\'</code> 는 아스키 <b>65</b> 라 +2 는 67 이고 <code>%c</code> 로 찍으면 '
       + '<b>C</b> 다. <code>10 / 4</code> 는 정수 나눗셈이라 2 → <b>2.0</b>, '
       + '<code>(double)</code> 을 씌워야 <b>2.5</b> 다.',
    d: 3, y: [], tag: ['형변환', '아스키', '정수나눗셈']
  },

  {
    id: 'ch10-s05-21', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int a = 10;\n'
        + '    int *p = &a;\n'
        + '    int **pp = &p;\n'
        + '\n'
        + '    **pp = **pp + 5;\n'
        + '    *p = *p * 2;\n'
        + '    printf("%d %d", a, **pp);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['30 30'],
    why: '<b>이중 포인터</b> pp 는 p 를 가리키고 p 는 a 를 가리키므로 '
       + '<code>**pp</code> 와 <code>*p</code> 와 <code>a</code> 는 <b>같은 자리</b>다. '
       + '(10+5)×2=<b>30</b> 이고 둘 다 같은 값을 본다.',
    d: 3, y: [], tag: ['포인터', '이중포인터']
  },

  {
    id: 'ch10-s07-14', ch: 10, sec: 7,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int add(int n) {\n'
        + '    static int total = 0;\n'
        + '    int local = 0;\n'
        + '    total += n;\n'
        + '    local += n;\n'
        + '    return total * 10 + local;\n'
        + '}\n'
        + '\n'
        + 'int main() {\n'
        + '    add(1);\n'
        + '    add(2);\n'
        + '    printf("%d", add(3));\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['63'],
    why: '<code>static</code> 지역 변수는 <b>함수가 끝나도 값이 남는다</b>. '
       + 'total 은 1→3→6 으로 쌓이고 local 은 매번 0 에서 시작해 3 이다. '
       + '6×10+3=<b>63</b>.',
    d: 3, y: [], tag: ['함수', 'static', '지역변수']
  },

  {
    id: 'ch10-s04-16', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int a[5] = { 1, 3, 5, 7, 9 };\n'
        + '    int key = 7;\n'
        + '    int lo = 0, hi = 4, cnt = 0;\n'
        + '    int mid, found = -1;\n'
        + '\n'
        + '    while (lo <= hi) {\n'
        + '        cnt++;\n'
        + '        mid = (lo + hi) / 2;\n'
        + '        if (a[mid] == key) { found = mid; break; }\n'
        + '        else if (a[mid] < key) lo = mid + 1;\n'
        + '        else hi = mid - 1;\n'
        + '    }\n'
        + '    printf("%d %d", found, cnt);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['3 2'],
    why: '<b>이진 탐색</b>이다. 처음 mid=2(값 5)에서 작으니 lo=3 이 되고, '
       + '두 번째 mid=(3+4)/2=3(값 7)에서 찾는다. 인덱스 <b>3</b>, 비교 <b>2</b>번.',
    d: 3, y: [], tag: ['배열', '이진탐색']
  }
,

  /* ======================================================================
     🚨 T46 4절 — Java 코드 문항 2차 (2026-08-17)

     1차 20문항은 클래스·상속·배열·재귀·예외를 덮었다. 여기는 그 밖의 것 —
     문자열 비교와 불변성 · 컬렉션 · 초기화 순서 · instanceof · 인터페이스 기본 메소드 ·
     하노이 탑 · 비트 연산 · Arrays 유틸.

     📌 길이 11~20줄, 상한 28줄. → exam-archive/README.md 2장
     ====================================================================== */

  {
    id: 'ch10-s04-17', ch: 10, sec: 4,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        String a = "java";\n'
        + '        String b = "java";\n'
        + '        String c = new String("java");\n'
        + '\n'
        + '        System.out.print(a == b);\n'
        + '        System.out.print(" " + (a == c));\n'
        + '        System.out.print(" " + a.equals(c));\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['true false true'],
    why: '🚨 <b><code>==</code> 는 주소를, <code>equals</code> 는 내용을 비교한다.</b> '
       + '리터럴 <code>"java"</code> 는 상수 풀에서 <b>같은 객체를 공유</b>해 a==b 가 true 지만, '
       + '<code>new String</code> 은 <b>새 객체</b>라 a==c 는 false 다.',
    d: 3, y: [], tag: ['문자열', 'equals', '상수풀']
  },

  {
    id: 'ch10-s04-18', ch: 10, sec: 4,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        String s = "abc";\n'
        + '        s.concat("def");\n'
        + '        s = s.concat("!");\n'
        + '\n'
        + '        StringBuilder sb = new StringBuilder("abc");\n'
        + '        sb.append("def");\n'
        + '        sb.reverse();\n'
        + '\n'
        + '        System.out.print(s + " " + sb.toString());\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['abc! fedcba'],
    why: '🚨 <b><code>String</code> 은 불변이라</b> <code>s.concat("def")</code> 의 결과를 '
       + '받지 않으면 버려진다. 다시 대입한 <code>"!"</code> 만 남아 <b>abc!</b> 다. '
       + '<b><code>StringBuilder</code> 는 자기를 바꾸므로</b> abcdef 를 뒤집어 <b>fedcba</b> 가 된다.',
    d: 3, y: [], tag: ['문자열', '불변성', 'StringBuilder']
  },

  {
    id: 'ch10-s04-19', ch: 10, sec: 4,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        String s = "a,b,,c";\n'
        + '        String[] p = s.split(",");\n'
        + '        int len = 0;\n'
        + '\n'
        + '        for (String x : p) len += x.length();\n'
        + '        System.out.print(p.length + " " + len);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['4 3'],
    why: '<code>split(",")</code> 이 <code>a</code>·<code>b</code>·<b>빈 문자열</b>·<code>c</code> '
       + '넷으로 자른다 — <b>가운데 빈 칸도 한 조각</b>이다. 길이 합은 1+1+0+1=<b>3</b> 이다.',
    d: 3, y: [], tag: ['문자열', 'split']
  },

  {
    id: 'ch10-s12-07', ch: 10, sec: 12,
    t: 'code', lang: 'java',
    code: 'import java.util.ArrayList;\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        ArrayList<Integer> a = new ArrayList<>();\n'
        + '        a.add(10);\n'
        + '        a.add(20);\n'
        + '        a.add(30);\n'
        + '        a.remove(1);\n'
        + '        a.add(1, 40);\n'
        + '\n'
        + '        int sum = 0;\n'
        + '        for (int v : a) sum += v;\n'
        + '        System.out.print(a.size() + " " + a.get(1) + " " + sum);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['3 40 80'],
    why: '10·20·30 에서 <code>remove(1)</code> 이 <b>인덱스 1</b>(20)을 지워 10·30 이 되고, '
       + '<code>add(1, 40)</code> 이 그 자리에 끼워 넣어 <b>10·40·30</b> 이 된다. '
       + '크기 3 · 1번 40 · 합 <b>80</b>.',
    d: 3, y: [], tag: ['ArrayList', '컬렉션', 'java.util']
  },

  {
    id: 'ch10-s12-08', ch: 10, sec: 12,
    t: 'code', lang: 'java',
    code: 'import java.util.HashMap;\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        HashMap<String, Integer> m = new HashMap<>();\n'
        + '        String s = "banana";\n'
        + '\n'
        + '        for (int i = 0; i < s.length(); i++) {\n'
        + '            String k = String.valueOf(s.charAt(i));\n'
        + '            if (m.containsKey(k)) m.put(k, m.get(k) + 1);\n'
        + '            else m.put(k, 1);\n'
        + '        }\n'
        + '        System.out.print(m.size() + " " + m.get("a") + " " + m.get("n"));\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['3 3 2'],
    why: '<code>banana</code> 의 글자는 b·a·n 세 가지라 <b>key 는 3개</b>다. '
       + 'a 가 3번, n 이 2번 나온다. <b>Map 은 같은 키를 덮어쓰므로</b> 개수 세기에 쓴다.',
    d: 3, y: [], tag: ['HashMap', '컬렉션']
  },

  {
    id: 'ch10-s12-09', ch: 10, sec: 12,
    t: 'code', lang: 'java',
    code: 'import java.util.Arrays;\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int[] a = { 5, 2, 9, 1, 7 };\n'
        + '        int[] b = a;\n'
        + '        int[] c = a.clone();\n'
        + '\n'
        + '        Arrays.sort(a);\n'
        + '        System.out.print(b[0] + " " + c[0] + " ");\n'
        + '        System.out.print(Arrays.binarySearch(a, 7));\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['1 5 3'],
    why: '🚨 <code>b = a</code> 는 <b>같은 배열을 가리킬 뿐</b>이라 정렬이 b 에도 보인다(1). '
       + '<code>clone()</code> 은 <b>따로 복사</b>해 원래 순서를 지킨다(5). '
       + '정렬 뒤 {1,2,5,7,9} 에서 7 은 인덱스 <b>3</b> 이다.',
    d: 3, y: [], tag: ['배열', 'clone', 'Arrays', '이진탐색']
  },

  {
    id: 'ch10-s08-18', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class T {\n'
        + '    static int s;\n'
        + '    int i;\n'
        + '\n'
        + '    static { s = 1; System.out.print("S"); }\n'
        + '    { i = 2; System.out.print("I"); }\n'
        + '    T() { System.out.print("C"); }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        new T();\n'
        + '        new T();\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['SICIC'],
    why: '🚨 <b>정적 초기화 블록은 클래스가 처음 쓰일 때 딱 한 번</b> 돈다(S). '
       + '인스턴스 초기화 블록과 생성자는 <b>객체마다</b> 돌고, '
       + '순서는 <b>블록이 먼저 생성자가 나중</b>이라 IC 가 두 번 이어진다.',
    d: 3, y: [], tag: ['초기화블록', 'static', '생성자']
  },

  {
    id: 'ch10-s08-19', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class Node {\n'
        + '    int v;\n'
        + '    Node next;\n'
        + '    Node(int v) { this.v = v; }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        Node h = new Node(1);\n'
        + '        h.next = new Node(2);\n'
        + '        h.next.next = new Node(3);\n'
        + '\n'
        + '        int sum = 0;\n'
        + '        Node p = h;\n'
        + '        while (p != null) {\n'
        + '            sum += p.v;\n'
        + '            p = p.next;\n'
        + '        }\n'
        + '        System.out.print(sum + " " + h.next.v);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['6 2'],
    why: '<b>연결 리스트</b>다. 1→2→3 을 따라가며 더하면 <b>6</b> 이고, '
       + '<code>h.next.v</code> 는 두 번째 노드라 <b>2</b> 다. '
       + '<code>p != null</code> 이 끝을 알리는 조건이다.',
    d: 3, y: [], tag: ['연결리스트', '참조', '자료구조']
  },

  {
    id: 'ch10-s09-18', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'class A { void go() { System.out.print("A"); } }\n'
        + 'class B extends A { void go() { System.out.print("B"); }\n'
        + '                    void only() { System.out.print("b"); } }\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        A x = new B();\n'
        + '        x.go();\n'
        + '        if (x instanceof B) {\n'
        + '            B y = (B) x;\n'
        + '            y.only();\n'
        + '        }\n'
        + '        System.out.print(x instanceof A);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['Bbtrue'],
    why: '재정의된 <code>go()</code> 가 불려 <b>B</b>. 참조 타입이 A 라 '
       + '<code>only()</code> 는 <b>다운캐스팅</b>해야 부를 수 있다(b). '
       + '<b>자식 객체는 부모 타입이기도 하므로</b> <code>instanceof A</code> 는 true 다.',
    d: 3, y: [], tag: ['instanceof', '다운캐스팅', '다형성']
  },

  {
    id: 'ch10-s09-19', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'interface Greet {\n'
        + '    String name();\n'
        + '    default void hello() {\n'
        + '        System.out.print("Hi " + name());\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'class Kor implements Greet {\n'
        + '    public String name() { return "Kim"; }\n'
        + '}\n'
        + 'class Eng implements Greet {\n'
        + '    public String name() { return "Lee"; }\n'
        + '    public void hello() { System.out.print("Hello " + name()); }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        new Kor().hello();\n'
        + '        System.out.print("/");\n'
        + '        new Eng().hello();\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['Hi Kim/Hello Lee'],
    why: '<b>인터페이스의 <code>default</code> 메소드는 몸통을 가진다</b> — 구현하지 않으면 '
       + '그대로 쓰고(Kor), 재정의하면 그쪽이 이긴다(Eng).',
    d: 3, y: [], tag: ['인터페이스', 'default메소드', '오버라이딩']
  },

  {
    id: 'ch10-s13-14', ch: 10, sec: 13,
    t: 'code', lang: 'java',
    code: 'class MyEx extends Exception {\n'
        + '    MyEx(String m) { super(m); }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    static void check(int n) throws MyEx {\n'
        + '        if (n < 0) throw new MyEx("neg");\n'
        + '        System.out.print(n);\n'
        + '    }\n'
        + '    public static void main(String[] args) {\n'
        + '        try {\n'
        + '            check(1);\n'
        + '            check(-1);\n'
        + '            check(2);\n'
        + '        } catch (MyEx e) {\n'
        + '            System.out.print("[" + e.getMessage() + "]");\n'
        + '        }\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['1[neg]'],
    why: 'check(1) 이 1 을 찍고, check(−1) 이 예외를 던지는 순간 <b>try 블록의 나머지를 건너뛰고</b> '
       + 'catch 로 간다 — check(2) 는 실행되지 않는다. '
       + '<code>throw</code> 는 던지는 것, <code>throws</code> 는 「던질 수 있다」는 선언이다.',
    d: 3, y: [], tag: ['예외처리', '사용자정의예외', 'throw']
  },

  {
    id: 'ch10-s03-20', ch: 10, sec: 3,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    static int cnt = 0;\n'
        + '\n'
        + '    static void hanoi(int n, char a, char b, char c) {\n'
        + '        if (n == 0) return;\n'
        + '        hanoi(n - 1, a, c, b);\n'
        + '        cnt++;\n'
        + '        hanoi(n - 1, c, b, a);\n'
        + '    }\n'
        + '\n'
        + '    public static void main(String[] args) {\n'
        + '        hanoi(4, \'A\', \'B\', \'C\');\n'
        + '        System.out.print(cnt);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['15'],
    why: '<b>하노이 탑</b>의 이동 횟수는 <code>2ⁿ − 1</code> 이다. '
       + 'n=4 이므로 16−1=<b>15</b> 다.',
    d: 3, y: [], tag: ['재귀', '하노이탑']
  },

  {
    id: 'ch10-s03-21', ch: 10, sec: 3,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int n = 5;\n'
        + '        int r = 0;\n'
        + '\n'
        + '        switch (n) {\n'
        + '            case 3:\n'
        + '            case 4: r += 1;\n'
        + '            case 5: r += 2;\n'
        + '            case 6: r += 4; break;\n'
        + '            case 7: r += 8;\n'
        + '            default: r += 16;\n'
        + '        }\n'
        + '        System.out.print(r);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['6'],
    why: '🚨 <b><code>break</code> 가 없으면 아래로 흘러내린다</b>(폴스루). '
       + 'case 5 로 들어가 2 를 더하고, case 6 의 4 까지 더한 뒤 <code>break</code> 로 나온다 → '
       + '2+4=<b>6</b>. case 7·default 는 닿지 않는다.',
    d: 3, y: [], tag: ['switch', '폴스루']
  },

  {
    id: 'ch10-s02-16', ch: 10, sec: 2,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int a = 20, b = 7;\n'
        + '        int max = (a > b) ? a : b;\n'
        + '        String s = (a % 2 == 0) ? ((a > 10) ? "BIG" : "SMALL") : "ODD";\n'
        + '\n'
        + '        System.out.print(max + " " + s + " " + (a / b) + " " + (a % b));\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['20 BIG 2 6'],
    why: '<b>삼항 연산자</b>는 중첩할 수 있다 — 20 은 짝수이고 10 보다 크니 <b>BIG</b>. '
       + '정수 나눗셈은 몫만 남아 20/7=<b>2</b>, 나머지는 <b>6</b> 이다.',
    d: 2, y: [], tag: ['삼항연산자', '정수나눗셈']
  },

  {
    id: 'ch10-s02-17', ch: 10, sec: 2,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int a = 13;\n'
        + '        int b = 6;\n'
        + '\n'
        + '        System.out.print((a & b) + " ");\n'
        + '        System.out.print((a | b) + " ");\n'
        + '        System.out.print((a ^ b) + " ");\n'
        + '        System.out.print((a >> 2) + " ");\n'
        + '        System.out.print(a << 2);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['4 15 11 3 52'],
    why: '13=1101, 6=0110. <b>AND</b> 0100=4 · <b>OR</b> 1111=15 · <b>XOR</b> 1011=11. '
       + '<code>&gt;&gt;2</code> 는 4로 나눈 몫 <b>3</b>, <code>&lt;&lt;2</code> 는 4배 <b>52</b> 다.',
    d: 3, y: [], tag: ['비트연산', '시프트']
  },

  {
    id: 'ch10-s01-13', ch: 10, sec: 1,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        char c = \'A\';\n'
        + '        c += 2;\n'
        + '        int i = \'Z\' - \'A\';\n'
        + '        char d = (char) (\'a\' + 1);\n'
        + '\n'
        + '        System.out.print(c);\n'
        + '        System.out.print(" " + i);\n'
        + '        System.out.print(" " + d);\n'
        + '        System.out.print(" " + (int) c);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['C 25 b 67'],
    why: '<code>char</code> 는 숫자처럼 더할 수 있다. A(65)+2=67 이라 <b>C</b>, '
       + '<code>(int)</code> 로 보면 <b>67</b> 이다. Z(90)−A(65)=<b>25</b>, a(97)+1=98 이라 <b>b</b>.',
    d: 3, y: [], tag: ['char', '아스키', '형변환']
  },

  {
    id: 'ch10-s07-15', ch: 10, sec: 7,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    static int sum(int... nums) {\n'
        + '        int s = 0;\n'
        + '        for (int n : nums) s += n;\n'
        + '        return s;\n'
        + '    }\n'
        + '    static int sum(int a, int b) {\n'
        + '        return a * b;\n'
        + '    }\n'
        + '\n'
        + '    public static void main(String[] args) {\n'
        + '        System.out.print(sum(1, 2) + " " + sum(1, 2, 3) + " " + sum());\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['2 6 0'],
    why: '🚨 <b>정확히 맞는 메소드가 가변인자보다 먼저 뽑힌다.</b> '
       + '<code>sum(1, 2)</code> 는 두 개짜리가 걸려 1×2=<b>2</b>, '
       + '나머지는 가변인자로 가 6 과 <b>0</b> 이다.',
    d: 3, y: [], tag: ['가변인자', '오버로딩']
  },

  {
    id: 'ch10-s04-20', ch: 10, sec: 4,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int[][] a = new int[3][];\n'
        + '        a[0] = new int[1];\n'
        + '        a[1] = new int[2];\n'
        + '        a[2] = new int[3];\n'
        + '\n'
        + '        int cnt = 0;\n'
        + '        for (int i = 0; i < a.length; i++) {\n'
        + '            for (int j = 0; j < a[i].length; j++) {\n'
        + '                a[i][j] = i + j;\n'
        + '                cnt++;\n'
        + '            }\n'
        + '        }\n'
        + '        System.out.print(cnt + " " + a[2][2]);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['6 4'],
    why: '<b>가변 배열</b>이라 행마다 길이가 다르다(1·2·3). 칸은 1+2+3=<b>6</b> 개이고 '
       + '<code>a[2][2]</code> 는 2+2=<b>4</b> 다. <code>a[i].length</code> 로 행마다 재야 한다.',
    d: 3, y: [], tag: ['2차원배열', '가변배열']
  },

  {
    id: 'ch10-s08-20', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class Queue {\n'
        + '    private int[] buf = new int[5];\n'
        + '    private int front = 0, rear = 0;\n'
        + '\n'
        + '    void put(int v) { buf[rear++] = v; }\n'
        + '    int get() {\n'
        + '        if (front == rear) return -1;\n'
        + '        return buf[front++];\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        Queue q = new Queue();\n'
        + '        q.put(1); q.put(2); q.put(3);\n'
        + '        q.get();\n'
        + '        q.put(4);\n'
        + '        System.out.print(q.get() + "" + q.get());\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['23'],
    why: '<b>큐는 FIFO</b> 다. 1·2·3 을 넣고 한 번 꺼내면 1 이 나가고 2·3 이 남는다. '
       + '4 를 넣은 뒤 두 번 꺼내면 <b>2</b>, 그다음 <b>3</b> 이다. '
       + '스택(LIFO)과 반대다.',
    d: 3, y: [], tag: ['큐', 'FIFO', '자료구조']
  },

  {
    id: 'ch10-s09-20', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'class P {\n'
        + '    static String who() { return "P-static"; }\n'
        + '    String me() { return "P-me"; }\n'
        + '}\n'
        + 'class C extends P {\n'
        + '    static String who() { return "C-static"; }\n'
        + '    String me() { return "C-me"; }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        P x = new C();\n'
        + '        System.out.print(x.me() + " " + P.who());\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['C-me P-static'],
    why: '🚨 <b><code>static</code> 메소드는 오버라이딩되지 않는다</b> — 감춰질 뿐이고 '
       + '<b>어느 클래스로 불렀는지</b>가 정한다. 인스턴스 메소드만 실제 객체를 따라간다.',
    d: 3, y: [], tag: ['static', '오버라이딩', '다형성']
  }
,

  /* ======================================================================
     🚨 T46 4절 — Python 코드 문항 (2026-08-17)

     Python 이 11문항뿐이었다(목표 25). **길이보다 수가 먼저다** —
     실제 Python 은 중앙 6줄(4~12줄)이라 C·Java 와 달리 격차가 크지 않았다.

     📌 실제가 묻는 것 — 슬라이싱 · 자료형 넷의 차이 · 얕은 복사 ·
        컴프리헨션 · 기본 매개변수의 함정 · 클래스. → exam-archive/README.md 2장
     ====================================================================== */

  {
    id: 'ch10-s10-19', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n'
        + '\n'
        + 'print(a[2:5])\n'
        + 'print(a[:3])\n'
        + 'print(a[-3:])\n'
        + 'print(a[::3])',
    q: '다음 Python 코드의 출력 결과를 차례로 쓰시오.',
    a: ['[2, 3, 4] [0, 1, 2] [7, 8, 9] [0, 3, 6, 9]',
        '[2,3,4] [0,1,2] [7,8,9] [0,3,6,9]'],
    why: '🚨 <b>끝 인덱스는 포함되지 않는다.</b> <code>a[2:5]</code> 는 2·3·4 다. '
       + '<code>a[-3:]</code> 는 <b>뒤에서 3개</b>, <code>a[::3]</code> 은 <b>3칸씩 건너뛴다</b>.',
    d: 3, y: [], tag: ['슬라이싱', '리스트']
  },

  {
    id: 'ch10-s10-20', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 's = "PYTHON"\n'
        + '\n'
        + 'print(s[1:4])\n'
        + 'print(s[::-1])\n'
        + 'print(s[-1])\n'
        + 'print(len(s))',
    q: '다음 Python 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['YTH NOHTYP N 6'],
    why: '문자열도 <b>리스트처럼 잘린다</b>. <code>s[1:4]</code> 는 1·2·3번 글자라 YTH, '
       + '<code>[::-1]</code> 은 <b>뒤집기</b>, <code>s[-1]</code> 은 <b>마지막 글자</b>다.',
    d: 2, y: [], tag: ['문자열', '슬라이싱']
  },

  {
    id: 'ch10-s10-21', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [1, 2, 2, 3, 3, 3]\n'
        + 'b = set(a)\n'
        + 'c = tuple(b)\n'
        + 'd = {"x": 1, "y": 2, "x": 3}\n'
        + '\n'
        + 'print(len(a), len(b), len(c), len(d))',
    q: '다음 Python 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['6 3 3 2'],
    why: '<b>세트는 중복을 없앤다</b>(1·2·3 세 개). 튜플로 바꿔도 개수는 그대로다. '
       + '<b>딕셔너리는 키가 중복될 수 없어</b> 뒤의 <code>"x": 3</code> 이 앞을 덮어 <b>2</b> 개다.',
    d: 3, y: [], tag: ['세트', '튜플', '딕셔너리', '자료형']
  },

  {
    id: 'ch10-s10-22', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [1, 2, 3]\n'
        + 'b = a\n'
        + 'c = a[:]\n'
        + '\n'
        + 'b.append(4)\n'
        + 'c.append(5)\n'
        + 'print(a, c)',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['[1, 2, 3, 4] [1, 2, 3, 5]', '[1,2,3,4] [1,2,3,5]'],
    why: '🚨 <code>b = a</code> 는 <b>같은 리스트를 가리킬 뿐</b>이라 b 에 붙이면 a 도 바뀐다. '
       + '<code>c = a[:]</code> 는 <b>잘라서 새로 만든 것</b>이라 따로 논다.',
    d: 3, y: [], tag: ['리스트', '얕은복사', '참조']
  },

  {
    id: 'ch10-s10-23', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [x * 2 for x in range(5)]\n'
        + 'b = [x for x in a if x % 4 == 0]\n'
        + '\n'
        + 'print(a)\n'
        + 'print(b)\n'
        + 'print(sum(b))',
    q: '다음 Python 코드의 출력 결과를 차례로 쓰시오.',
    a: ['[0, 2, 4, 6, 8] [0, 4, 8] 12', '[0,2,4,6,8] [0,4,8] 12'],
    why: '<b>리스트 컴프리헨션</b>이다. <code>range(5)</code> 는 0~4 라 두 배 하면 '
       + '0·2·4·6·8, 그중 4의 배수는 0·4·8 이고 합은 <b>12</b> 다.',
    d: 3, y: [], tag: ['컴프리헨션', 'range', 'sum']
  },

  {
    id: 'ch10-s10-24', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'def f(a, b=10, *args):\n'
        + '    return a + b + len(args)\n'
        + '\n'
        + 'print(f(1))\n'
        + 'print(f(1, 2))\n'
        + 'print(f(1, 2, 3, 4))',
    q: '다음 Python 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['11 3 5'],
    why: '<code>b</code> 는 <b>기본값 10</b> 이라 <code>f(1)</code> 은 1+10+0=11. '
       + '<code>f(1, 2)</code> 는 b 가 2 로 덮여 3. '
       + '<code>f(1, 2, 3, 4)</code> 는 <b><code>*args</code> 가 나머지 둘을 받아</b> 1+2+2=<b>5</b> 다.',
    d: 3, y: [], tag: ['함수', '기본매개변수', '가변인자']
  },

  {
    id: 'ch10-s10-25', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'class Member:\n'
        + '    count = 0\n'
        + '\n'
        + '    def __init__(self, name):\n'
        + '        self.name = name\n'
        + '        Member.count += 1\n'
        + '\n'
        + 'a = Member("kim")\n'
        + 'b = Member("lee")\n'
        + 'print(a.name, Member.count)',
    q: '다음 Python 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['kim 2'],
    why: '<code>self.name</code> 은 <b>객체마다 따로</b>지만 <code>Member.count</code> 는 '
       + '<b>클래스가 하나만 가진다</b> — 생성자가 두 번 돌아 2 가 된다. '
       + 'Python 의 메소드는 첫 매개변수로 <code>self</code> 를 받는다.',
    d: 3, y: [], tag: ['클래스', '클래스변수', '생성자']
  },

  {
    id: 'ch10-s10-26', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'd = {"a": 1, "b": 2, "c": 3}\n'
        + '\n'
        + 'd["d"] = 4\n'
        + 'del d["a"]\n'
        + '\n'
        + 'print(len(d))\n'
        + 'print(sorted(d.keys()))\n'
        + 'print(sum(d.values()))',
    q: '다음 Python 코드의 출력 결과를 차례로 쓰시오.',
    a: ["3 ['b', 'c', 'd'] 9", '3 [b, c, d] 9'],
    why: 'd 를 넣고 a 를 지워 b·c·d 셋이 남는다. <code>sorted</code> 는 <b>정렬된 새 리스트</b>를 '
       + '내놓고, 값의 합은 2+3+4=<b>9</b> 다.',
    d: 3, y: [], tag: ['딕셔너리', 'sorted', 'sum']
  },

  {
    id: 'ch10-s10-27', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'n = 0\n'
        + 'for i in range(1, 10, 2):\n'
        + '    if i == 5:\n'
        + '        continue\n'
        + '    if i > 7:\n'
        + '        break\n'
        + '    n += i\n'
        + '\n'
        + 'print(n)',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['11'],
    why: '<code>range(1, 10, 2)</code> 는 1·3·5·7·9 다. 5 는 <code>continue</code> 로 건너뛰고 '
       + '9 에서 <code>break</code> 로 빠진다. 더해진 것은 1+3+7=<b>11</b> 이다.',
    d: 3, y: [], tag: ['range', 'continue', 'break']
  },

  {
    id: 'ch10-s10-28', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [3, 1, 4, 1, 5]\n'
        + 'b = sorted(a)\n'
        + 'a.sort(reverse=True)\n'
        + '\n'
        + 'print(b[0], a[0])\n'
        + 'print(max(a), min(a), len(a))',
    q: '다음 Python 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['1 5 5 1 5'],
    why: '🚨 <b><code>sorted</code> 는 새 리스트를 내놓고 <code>sort</code> 는 자기를 바꾼다.</b> '
       + 'b 는 오름차순이라 b[0]=1, a 는 내림차순이 되어 a[0]=5 다. '
       + '최댓값 5 · 최솟값 1 · 개수 5.',
    d: 3, y: [], tag: ['sorted', 'sort', '내장함수']
  },

  {
    id: 'ch10-s10-29', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'def fib(n):\n'
        + '    if n <= 1:\n'
        + '        return n\n'
        + '    return fib(n - 1) + fib(n - 2)\n'
        + '\n'
        + 'print([fib(i) for i in range(7)])',
    q: '다음 Python 코드의 출력 결과를 쓰시오.',
    a: ['[0, 1, 1, 2, 3, 5, 8]', '[0,1,1,2,3,5,8]'],
    why: '<b>피보나치</b>다. fib(0)=0, fib(1)=1 부터 앞의 둘을 더해 나간다. '
       + '<code>range(7)</code> 이 0~6 이라 일곱 개가 나온다.',
    d: 3, y: [], tag: ['재귀', '피보나치', '컴프리헨션']
  },

  {
    id: 'ch10-s10-30', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 's = "a-b-c-d"\n'
        + 'p = s.split("-")\n'
        + 'j = "+".join(p)\n'
        + '\n'
        + 'print(len(p))\n'
        + 'print(j)\n'
        + 'print(s.replace("-", ""))',
    q: '다음 Python 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['4 a+b+c+d abcd'],
    why: '<code>split</code> 은 <b>잘라서 리스트로</b>, <code>join</code> 은 <b>사이에 끼워 넣어 문자열로</b> 만든다. '
       + '<code>replace</code> 는 바꾸는 것이고 원본 s 는 변하지 않는다.',
    d: 2, y: [], tag: ['문자열', 'split', 'join']
  },

  {
    id: 'ch10-s10-31', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = (1, 2, 3)\n'
        + 'b = a + (4,)\n'
        + 'c = list(a)\n'
        + 'c[0] = 9\n'
        + '\n'
        + 'print(len(b), c[0], a[0])',
    q: '다음 Python 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['4 9 1'],
    why: '🚨 <b>튜플은 변경할 수 없다</b> — 더하면 <b>새 튜플</b>이 생길 뿐이다(4개). '
       + '리스트로 바꾼 c 는 고칠 수 있지만 <b>원래 튜플 a 는 그대로</b> 1 이다.',
    d: 3, y: [], tag: ['튜플', '불변', '리스트']
  },

  {
    id: 'ch10-s10-32', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [[0] * 3 for _ in range(3)]\n'
        + '\n'
        + 'for i in range(3):\n'
        + '    for j in range(3):\n'
        + '        a[i][j] = i * 3 + j\n'
        + '\n'
        + 'print(a[1])\n'
        + 'print(a[2][1])',
    q: '다음 Python 코드의 출력 결과를 차례로 쓰시오.',
    a: ['[3, 4, 5] 7', '[3,4,5] 7'],
    why: '<code>i * 3 + j</code> 라 0~8 이 차례로 들어간다. 두 번째 행(i=1)은 3·4·5 이고 '
       + '<code>a[2][1]</code> 은 2×3+1=<b>7</b> 이다.',
    d: 3, y: [], tag: ['2차원리스트', '컴프리헨션', '중첩반복문']
  },

  /* ======================================================================
     🚨 T46 5절 — Java 3차 15문항 (45 → 60, 목표 달성) · 2026-08-17

     1차는 클래스·상속·배열·재귀·예외, 2차는 문자열 함정·컬렉션·초기화 순서·
     instanceof·가변인자였다. 3차는 그 둘이 안 건드린 곳만 골랐다 —
     람다식과 함수형 인터페이스(본문 13장) · 예외 객체의 이름 · Set · Math ·
     toString · final · 캡슐화 · 추상 클래스 · 선택 정렬 · 문자 빈도 ·
     String 메소드 · break 의 범위 · 연산자 우선순위 · 자료형 오버플로.
     ====================================================================== */

  {
    id: 'ch10-s01-14', ch: 10, sec: 1,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        byte b = 127;\n'
        + '        b++;\n'
        + '        System.out.println(b);\n'
        + '\n'
        + '        int i = 10;\n'
        + '        double d = i / 4;\n'
        + '        System.out.println(d);\n'
        + '\n'
        + '        System.out.println(i / 4.0);\n'
        + '\n'
        + '        char ch = \'A\';\n'
        + '        System.out.println((char)(ch + 2));\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['-128 2.0 2.5 C'],
    why: '🚨 <b><code>byte</code> 는 1Byte 라 −128 ~ 127 이다.</b> 127 에서 1 을 더하면 '
       + '표현 범위를 넘어 <b>맨 아래인 −128 로 돌아간다</b>(오버플로). '
       + '<code>i / 4</code> 는 <b>둘 다 정수라 몫만 남아 2</b> 이고, double 에 담기며 <b>2.0</b> 으로 보인다. '
       + '한쪽이 실수인 <code>i / 4.0</code> 이라야 <b>2.5</b> 다. '
       + '<code>\'A\' + 2</code> 는 정수 67 이 되고 다시 char 로 바꾸면 <b>C</b> 다.',
    d: 3, y: [], tag: ['자료형', '오버플로']
  },

  {
    id: 'ch10-s02-18', ch: 10, sec: 2,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int a = 2, b = 3, c = 4;\n'
        + '\n'
        + '        System.out.println(a + b * c);\n'
        + '        System.out.println(a << 1 + 1);\n'
        + '        System.out.println((a > b) ? c : a + b);\n'
        + '        System.out.println(a + b > c && b % a == 1);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['14 8 5 true'],
    why: '🚨 <b><code>a &lt;&lt; 1 + 1</code> 은 <code>(a &lt;&lt; 1) + 1</code> 이 아니다.</b> '
       + '덧셈이 시프트보다 <b>먼저</b>라 <code>a &lt;&lt; 2</code> = 8 이다. '
       + '순서는 <b>단산시관비논삼대순</b> — 단항 → 산술 → 시프트 → 관계 → 비트 → 논리 → 삼항 → 대입 → 순서. '
       + '넷째 줄도 <b>산술 → 관계 → 논리</b> 차례라 <code>(2+3 &gt; 4) &amp;&amp; (3%2 == 1)</code> 로 읽는다.',
    d: 3, y: [], tag: ['연산자우선순위', '시프트']
  },

  {
    id: 'ch10-s03-22', ch: 10, sec: 3,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int cnt = 0, sum = 0;\n'
        + '\n'
        + '        for (int i = 1; i <= 3; i++) {\n'
        + '            for (int j = 1; j <= 3; j++) {\n'
        + '                if (i * j > 4) break;\n'
        + '                sum += i * j;\n'
        + '                cnt++;\n'
        + '            }\n'
        + '        }\n'
        + '        System.out.println(cnt + " " + sum);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['6 15'],
    why: '🚨 <b><code>break</code> 는 자기를 감싼 반복문 하나만 빠져나온다</b> — 바깥 <code>i</code> 는 계속 돈다. '
       + 'i=1 은 세 번 다 돌아 1+2+3, i=2 는 <code>2*3=6</code> 에서 끊겨 2+4, '
       + 'i=3 은 <code>3*2=6</code> 에서 끊겨 3 만 더한다. '
       + '📌 <code>i*j</code> 가 <b>4 일 때는 안 끊긴다</b> — 조건이 <code>&gt; 4</code> 다.',
    d: 3, y: [], tag: ['break', '중첩반복문']
  },

  {
    id: 'ch10-s04-21', ch: 10, sec: 4,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int[] a = {5, 2, 9, 1, 7};\n'
        + '\n'
        + '        for (int i = 0; i < a.length - 1; i++) {\n'
        + '            int min = i;\n'
        + '            for (int j = i + 1; j < a.length; j++) {\n'
        + '                if (a[j] < a[min]) min = j;\n'
        + '            }\n'
        + '            int t = a[i]; a[i] = a[min]; a[min] = t;\n'
        + '        }\n'
        + '\n'
        + '        for (int i = 0; i < a.length; i++) System.out.print(a[i] + " ");\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['1 2 5 7 9'],
    why: '<b>선택 정렬</b>이다. 안쪽 반복문이 <b>남은 구간에서 가장 작은 값의 자리를 찾고</b>, '
       + '한 바퀴가 끝날 때마다 그 값을 <code>i</code> 자리와 <b>한 번만</b> 바꾼다. '
       + '📌 <b>버블 정렬은 이웃끼리 계속 바꾸고, 선택 정렬은 한 바퀴에 한 번만 바꾼다</b> — 교환 횟수가 다르다.',
    d: 2, y: [], tag: ['배열', '정렬', '선택정렬']
  },

  {
    id: 'ch10-s04-22', ch: 10, sec: 4,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        String s = "BANANA";\n'
        + '        int[] cnt = new int[26];\n'
        + '\n'
        + '        for (int i = 0; i < s.length(); i++) {\n'
        + '            cnt[s.charAt(i) - \'A\']++;\n'
        + '        }\n'
        + '\n'
        + '        int max = 0, idx = 0;\n'
        + '        for (int i = 0; i < 26; i++) {\n'
        + '            if (cnt[i] > max) { max = cnt[i]; idx = i; }\n'
        + '        }\n'
        + '\n'
        + '        System.out.println((char)(\'A\' + idx) + " " + max);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['A 3'],
    why: '<b>문자를 배열의 인덱스로 쓰는 흔한 수법</b>이다. <code>charAt(i) - \'A\'</code> 가 '
       + 'A→0 · B→1 · N→13 으로 자리를 만든다. BANANA 는 <b>A 3개 · N 2개 · B 1개</b>. '
       + '🚨 <code>cnt[i] &gt; max</code> 라 <b>같으면 안 바꾼다</b> — 최빈 문자가 여럿이면 <b>앞의 것</b>이 남는다.',
    d: 3, y: [], tag: ['배열', '문자열', 'charAt']
  },

  {
    id: 'ch10-s04-23', ch: 10, sec: 4,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        String s = "Engineer Information Processing";\n'
        + '\n'
        + '        System.out.println(s.length());\n'
        + '        System.out.println(s.indexOf("Info"));\n'
        + '        System.out.println(s.substring(9, 13).toUpperCase());\n'
        + '        System.out.println(s.replace("i", "*").indexOf("*"));\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['31 9 INFO 3'],
    why: '공백까지 세어 길이는 <b>31</b>, <code>"Info"</code> 는 <b>9번</b> 자리에서 시작한다. '
       + '<code>substring(9, 13)</code> 은 <b>9·10·11·12</b> 넉 자라 <code>Info</code> → <b>INFO</b> 다 — '
       + '🚨 <b>끝 인덱스는 포함되지 않는다.</b> '
       + '<code>replace("i", "*")</code> 는 <b>대소문자를 구분해</b> 소문자 i 만 바꾸므로 '
       + '맨 앞 <code>Engineer</code> 의 <b>3번</b> 자리가 첫 <code>*</code> 다.',
    d: 3, y: [], tag: ['문자열', 'substring', 'indexOf']
  },

  {
    id: 'ch10-s08-21', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class 도서 {\n'
        + '    String 제목;\n'
        + '    int 대출수;\n'
        + '    도서(String 제목, int 대출수) {\n'
        + '        this.제목 = 제목;\n'
        + '        this.대출수 = 대출수;\n'
        + '    }\n'
        + '    public String toString() { return 제목 + "(" + 대출수 + ")"; }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        도서 a = new 도서("자료구조", 12);\n'
        + '        도서 b = new 도서("운영체제", 7);\n'
        + '        System.out.println(a);\n'
        + '        System.out.println("" + b + a.대출수);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['자료구조(12) 운영체제(7)12'],
    why: '<b>객체를 출력하거나 문자열과 <code>+</code> 로 이으면 <code>toString()</code> 이 자동으로 불린다.</b> '
       + '재정의하지 않았다면 <code>클래스명@해시값</code> 이 찍힌다. '
       + '둘째 줄은 왼쪽부터 이어 붙어 <code>""+b</code> 가 먼저 문자열이 되고, '
       + '🚨 그 뒤의 <code>a.대출수</code> 는 <b>더해지지 않고 이어 붙는다</b>.',
    d: 3, y: [], tag: ['toString', '클래스', '문자열']
  },

  {
    id: 'ch10-s08-22', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class 설정 {\n'
        + '    static final int 최대대출 = 5;\n'
        + '    static int 발급수 = 0;\n'
        + '    final int 번호;\n'
        + '\n'
        + '    설정() {\n'
        + '        발급수++;\n'
        + '        번호 = 발급수;\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        설정 a = new 설정();\n'
        + '        설정 b = new 설정();\n'
        + '        설정 c = new 설정();\n'
        + '        System.out.println(설정.최대대출 + " " + 설정.발급수 + " " + (a.번호 + c.번호));\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오.',
    a: ['5 3 4'],
    why: '<b><code>static</code> 은 객체마다가 아니라 클래스에 하나</b>라 셋을 만들면 발급수가 <b>3</b> 이 된다. '
       + '<b><code>final</code> 은 한 번 정해지면 못 바꾼다</b>는 뜻이지 「모두 같은 값」이 아니다 — '
       + '🚨 <b>인스턴스 <code>final</code> 은 생성자에서 정할 수 있어 객체마다 다르다.</b> '
       + 'a.번호 1 + c.번호 3 = <b>4</b>. <code>static final</code> 이라야 상수 하나다.',
    d: 3, y: [], tag: ['final', 'static', '생성자']
  },

  {
    id: 'ch10-s08-23', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class 계좌 {\n'
        + '    private int 잔액 = 0;\n'
        + '\n'
        + '    public void 입금(int 금액) {\n'
        + '        if (금액 <= 0) return;\n'
        + '        잔액 += 금액;\n'
        + '    }\n'
        + '    public boolean 출금(int 금액) {\n'
        + '        if (금액 > 잔액) return false;\n'
        + '        잔액 -= 금액;\n'
        + '        return true;\n'
        + '    }\n'
        + '    public int get잔액() { return 잔액; }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        계좌 c = new 계좌();\n'
        + '        c.입금(1000);\n'
        + '        c.입금(-500);\n'
        + '        System.out.println(c.출금(1200) + " " + c.출금(400) + " " + c.get잔액());\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['false true 600'],
    why: '<b>캡슐화</b>다 — 필드를 <code>private</code> 로 감추고 <b>메소드로만 바꾸게</b> 해서 '
       + '「음수 입금」·「잔액보다 큰 출금」 같은 잘못된 상태를 애초에 못 만들게 한다. '
       + '입금 −500 은 <code>return</code> 으로 무시되고, 출금 1200 은 잔액 1000 보다 커 <b>false</b> 다. '
       + '400 만 빠져 남는 것은 <b>600</b>.',
    d: 2, y: [], tag: ['캡슐화', '접근제어자', 'private']
  },

  {
    id: 'ch10-s09-21', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'abstract class 도형 {\n'
        + '    abstract int 넓이();\n'
        + '    String 이름() { return "도형"; }\n'
        + '    void 출력() { System.out.print(이름() + 넓이() + " "); }\n'
        + '}\n'
        + '\n'
        + 'class 사각형 extends 도형 {\n'
        + '    int w = 4, h = 3;\n'
        + '    int 넓이() { return w * h; }\n'
        + '    String 이름() { return "사각형"; }\n'
        + '}\n'
        + '\n'
        + 'class 정사각형 extends 사각형 {\n'
        + '    정사각형() { w = 5; h = 5; }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        도형[] arr = { new 사각형(), new 정사각형() };\n'
        + '        for (도형 d : arr) d.출력();\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 쓰시오. (공백으로 구분)',
    a: ['사각형12 사각형25'],
    why: '<b>추상 클래스는 객체를 못 만들지만 배열의 타입은 될 수 있다</b> — 담기는 것은 자식이다. '
       + '<code>출력()</code> 은 도형에만 있지만 그 안의 <code>이름()</code>·<code>넓이()</code> 는 '
       + '<b>실제 객체의 것</b>이 불린다. '
       + '🚨 <b>정사각형은 <code>이름()</code> 을 재정의하지 않아 부모인 사각형 것을 그대로 쓴다</b> — '
       + '그래서 둘 다 「사각형」이다. 필드는 부모 초기화(4·3) 뒤 <b>생성자가 5·5 로 덮는다.</b>',
    d: 3, y: [], tag: ['추상클래스', '다형성', '상속']
  },

  {
    id: 'ch10-s12-10', ch: 10, sec: 12,
    t: 'code', lang: 'java',
    code: 'import java.util.*;\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int[] data = {3, 7, 3, 9, 7, 1};\n'
        + '        Set<Integer> set = new HashSet<>();\n'
        + '        for (int d : data) set.add(d);\n'
        + '\n'
        + '        List<Integer> list = new ArrayList<>(set);\n'
        + '        Collections.sort(list);\n'
        + '\n'
        + '        System.out.println(set.size());\n'
        + '        System.out.println(list.get(0) + list.get(list.size() - 1));\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['4 10'],
    why: '<b><code>Set</code> 은 중복을 담지 않는다</b> — 3 과 7 이 두 번씩 들어가도 한 번만 남아 '
       + '<b>{1, 3, 7, 9} 네 개</b>다. 🚨 <b>순서도 보장하지 않으므로</b> '
       + '차례가 필요하면 위처럼 <b>List 로 옮겨 정렬</b>한다. 1 + 9 = <b>10</b>. '
       + '📌 <code>Set</code>·<code>List</code>·<code>Collections</code> 는 모두 <b>java.util</b> 이라 import 가 필요하다.',
    d: 3, y: [], tag: ['HashSet', '컬렉션', 'java.util']
  },

  {
    id: 'ch10-s12-11', ch: 10, sec: 12,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int a = -7, b = 3;\n'
        + '\n'
        + '        System.out.println(Math.abs(a));\n'
        + '        System.out.println(Math.max(a, b));\n'
        + '        System.out.println((int) Math.pow(b, 2));\n'
        + '        System.out.println((int) Math.ceil(7.0 / b));\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['7 3 9 3'],
    why: '<b><code>Math</code> 는 java.lang 이라 <code>import</code> 없이 쓴다</b> — '
       + 'java.lang 만 자동으로 포함된다. '
       + '<code>abs</code> 절댓값 · <code>max</code> 큰 값 · <code>pow(3,2)</code> = 9.0 · '
       + '<code>7.0/3</code> = 2.333… 을 <code>ceil</code> 이 <b>올려</b> 3.0 이 된다. '
       + '🚨 <code>7 / 3</code> 이었으면 정수 나눗셈이라 2 였다 — <b>7.0 이라야 실수로 나뉜다.</b>',
    d: 2, y: [], tag: ['Math', 'java.lang', '라이브러리']
  },

  {
    id: 'ch10-s13-15', ch: 10, sec: 13,
    t: 'code', lang: 'java',
    code: '@FunctionalInterface\n'
        + 'interface Calc {\n'
        + '    int apply(int a, int b);\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        Calc add = (a, b) -> a + b;\n'
        + '        Calc mul = (a, b) -> { return a * b; };\n'
        + '        Calc sub = (a, b) -> a - b;\n'
        + '\n'
        + '        System.out.println(add.apply(3, 4));\n'
        + '        System.out.println(mul.apply(3, 4));\n'
        + '        System.out.println(sub.apply(add.apply(2, 3), 4));\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['7 12 1'],
    why: '<b>람다식은 함수형 인터페이스의 하나뿐인 추상 메소드의 몸통</b>이다. '
       + '<code>(a, b) -&gt; a + b</code> 처럼 <b>식 하나면 <code>return</code> 과 중괄호를 생략</b>하고, '
       + '여러 줄이면 <code>{ … return v; }</code> 로 쓴다. '
       + '셋째 줄은 안쪽부터 — <code>add.apply(2,3)</code> = 5, 그 다음 <code>5 - 4</code> = <b>1</b>. '
       + '🚨 <b>추상 메소드가 둘 이상이면 람다로 못 받는다</b> — 어느 메소드인지 알 수 없기 때문이다.',
    d: 3, y: [], tag: ['람다식', '함수형인터페이스']
  },

  {
    id: 'ch10-s13-16', ch: 10, sec: 13,
    t: 'code', lang: 'java',
    code: 'import java.util.function.*;\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        Function<Integer, Integer> f = x -> x * 3;\n'
        + '        Predicate<Integer> p = x -> x % 2 == 0;\n'
        + '        Supplier<String> s = () -> "EIP";\n'
        + '\n'
        + '        int v = f.apply(4);\n'
        + '        System.out.println(v);\n'
        + '        System.out.println(p.test(v));\n'
        + '        System.out.println(s.get() + v);\n'
        + '    }\n'
        + '}',
    q: '다음 Java 코드의 출력 결과를 차례로 쓰시오. (공백으로 구분)',
    a: ['12 true eip12', '12 true EIP12'],
    why: '표준 함수형 인터페이스 넷은 <b>무엇을 받고 무엇을 내놓는가</b>로 갈린다 — '
       + '<b>Function</b> 받아서 바꿔 돌려줌(<code>apply</code>) · <b>Predicate</b> 받아서 참·거짓(<code>test</code>) · '
       + '<b>Supplier</b> 받지 않고 주기만(<code>get</code>) · <b>Consumer</b> 받아서 쓰기만(<code>accept</code>). '
       + '4×3 = 12, 12 는 짝수라 <b>true</b>, 마지막은 문자열에 이어 붙어 <b>EIP12</b> 다.',
    d: 3, y: [], tag: ['함수형인터페이스', '람다식', 'java.util']
  },

  {
    id: 'ch10-s13-17', ch: 10, sec: 13,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int[] arr = new int[3];\n'
        + '        String s = null;\n'
        + '\n'
        + '        try { arr[3] = 10; }\n'
        + '        catch (Exception e) { }          // ㉠ 이 잡힌다\n'
        + '\n'
        + '        try { int n = Integer.parseInt("12A"); }\n'
        + '        catch (Exception e) { }          // ㉡ 이 잡힌다\n'
        + '\n'
        + '        try { int len = s.length(); }\n'
        + '        catch (Exception e) { }          // ㉢ 이 잡힌다\n'
        + '    }\n'
        + '}',
    q: '㉠~㉢ 에서 각각 발생하는 <b>예외 객체의 이름</b>을 쓰시오.',
    parts: [
      { label: '㉠', a: ['ArrayIndexOutOfBoundsException'] },
      { label: '㉡', a: ['NumberFormatException'] },
      { label: '㉢', a: ['NullPointerException'] }
    ],
    why: '🚨 <b>이름 자체를 쓰게 하는 출제가 많다.</b> '
       + '<b>ArrayIndexOutOfBoundsException</b> 은 배열의 범위를 벗어난 인덱스 — '
       + '<code>new int[3]</code> 의 인덱스는 <b>0~2</b> 라 3 은 없다. '
       + '<b>NumberFormatException</b> 은 숫자로 바꿀 수 없는 문자열, '
       + '<b>NullPointerException</b> 은 <code>null</code> 인 객체의 멤버에 접근할 때다.',
    d: 2, y: [], tag: ['예외처리', '예외객체']
  }
  ,

  /* ======================================================================
     🚨 T46 6절 — C 3차 12문항 (53 → 65, 목표 달성) · 2026-08-17

     1·2차가 포인터·구조체·재귀·비트·제어문을 채웠다. 3차는 남은 곳만 —
     sizeof 와 자료형 범위 · 연산자 우선순위 · strcpy/strcmp ·
     정수 나눗셈 · 문자열 배열 · 2차원 대각합 · malloc/free ·
     typedef 구조체 배열 · 전역변수 가리기 · 재귀 진법 변환 · math.h · stdlib.h
     ====================================================================== */

  {
    id: 'ch10-s01-15', ch: 10, sec: 1,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    char c = 200;\n'
        + '    unsigned char u = 200;\n'
        + '    int a = sizeof(int), b = sizeof(double);\n'
        + '\n'
        + '    printf("%d %d ", a, b);\n'
        + '    printf("%d %d", c, u);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['4 8 -56 200'],
    why: '<code>int</code> 는 <b>4Byte</b>, <code>double</code> 은 <b>8Byte</b> 다. '
       + '🚨 <b><code>char</code> 는 1Byte 라 −128 ~ 127</b> 이어서 200 이 안 들어간다 — '
       + '한 바퀴 돌아 <b>200 − 256 = −56</b> 이 된다. '
       + '<code>unsigned</code> 를 붙이면 음수를 안 쓰는 대신 <b>0 ~ 255</b> 라 200 이 그대로 있다.',
    d: 3, y: [], tag: ['자료형', 'sizeof', 'unsigned']
  },

  {
    id: 'ch10-s02-19', ch: 10, sec: 2,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int a = 10, b = 4, c = 3;\n'
        + '\n'
        + '    printf("%d ", a - b % c);\n'
        + '    printf("%d ", a & b | c);\n'
        + '    printf("%d ", a > b == 1);\n'
        + '    printf("%d", a > b ? b > c ? 1 : 2 : 3);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['9 3 1 1'],
    why: '<b>단산시관비논삼대순</b> — 단항 → 산술 → 시프트 → 관계 → 비트 → 논리 → 삼항 → 대입 → 순서. '
       + '<code>%</code> 는 곱셈급이라 뺄셈보다 먼저라 <code>10 - 1</code> = 9. '
       + '비트는 <b><code>&amp;</code> → <code>^</code> → <code>|</code></b> 순이라 '
       + '<code>(10 &amp; 4) | 3</code> = <code>0 | 3</code> = 3. '
       + '관계(대소)가 등가(<code>==</code>)보다 먼저라 <code>(10&gt;4) == 1</code> = 1. '
       + '🚨 <b>삼항은 오른쪽부터 묶인다</b> — <code>a&gt;b ? (b&gt;c ? 1 : 2) : 3</code>.',
    d: 3, y: [], tag: ['연산자우선순위', '비트연산자']
  },

  {
    id: 'ch10-s04-24', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '#include <string.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    char a[20] = "EIP";\n'
        + '    char b[20];\n'
        + '\n'
        + '    strcpy(b, a);\n'
        + '    strcat(b, "Study");\n'
        + '\n'
        + '    printf("%d ", strcmp(a, "EIP") == 0);\n'
        + '    printf("%d ", strcmp(a, b) == 0);\n'
        + '    printf("%d", (int)strlen(b));\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['1 0 8'],
    why: '<code>strcpy</code> 는 <b>덮어쓰고</b> <code>strcat</code> 은 <b>뒤에 이어 붙인다</b> — '
       + 'b 는 <code>EIPStudy</code> 가 되어 길이 <b>8</b> 이다(널 문자는 안 센다). '
       + '🚨 <b><code>strcmp</code> 는 같을 때 0 을 돌려준다</b> — 1 이 아니다. '
       + 'C 에서 0 은 거짓이라 <code>if (strcmp(x, y))</code> 라고 쓰면 <b>「다를 때」 참</b>이 되어 뜻이 뒤집힌다.',
    d: 2, y: [], tag: ['문자열', 'strcpy', 'strcmp']
  },

  {
    id: 'ch10-s04-25', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int a[5] = {80, 75, 91, 66, 89};\n'
        + '    int sum = 0, i;\n'
        + '\n'
        + '    for (i = 0; i < 5; i++) sum += a[i];\n'
        + '\n'
        + '    printf("%d ", sum);\n'
        + '    printf("%d ", sum / 5);\n'
        + '    printf("%.1f", sum / 5.0);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['401 80 80.2'],
    why: '합은 <b>401</b> 이다. 🚨 <code>sum / 5</code> 는 <b>둘 다 정수라 소수점 아래를 버려 80</b> 이고, '
       + '<code>sum / 5.0</code> 이라야 실수로 나뉘어 <b>80.2</b> 다. '
       + '평균을 구하는 코드에서 가장 자주 나오는 함정이다 — <b>나누는 쪽 하나만 실수로 바꿔도 된다.</b>',
    d: 2, y: [], tag: ['배열', '정수나눗셈', '평균']
  },

  {
    id: 'ch10-s04-26', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '#include <string.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    char s[3][10] = {"apple", "kiwi", "banana"};\n'
        + '    int i, max = 0;\n'
        + '\n'
        + '    for (i = 1; i < 3; i++) {\n'
        + '        if (strlen(s[i]) > strlen(s[max])) max = i;\n'
        + '    }\n'
        + '\n'
        + '    printf("%s %d %c", s[max], (int)strlen(s[max]), s[1][2]);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['banana 6 w'],
    why: 'C 에서 <b>문자열의 배열은 2차원 문자 배열</b>이다 — <code>s[i]</code> 는 문자열 하나, '
       + '<code>s[i][j]</code> 는 그 안의 글자 하나다. '
       + '길이는 apple 5 · kiwi 4 · banana 6 이라 가장 긴 것은 <b>banana</b>. '
       + '<code>s[1][2]</code> 는 <code>kiwi</code> 의 <b>인덱스 2</b> 라 <b>w</b> 다 — 인덱스는 0부터다.',
    d: 3, y: [], tag: ['문자열', '2차원', 'strlen']
  },

  {
    id: 'ch10-s04-27', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int m[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};\n'
        + '    int i, d1 = 0, d2 = 0;\n'
        + '\n'
        + '    for (i = 0; i < 3; i++) {\n'
        + '        d1 += m[i][i];\n'
        + '        d2 += m[i][2 - i];\n'
        + '    }\n'
        + '\n'
        + '    printf("%d %d %d", d1, d2, m[1][2] + m[2][1]);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['15 15 14'],
    why: '<code>m[i][i]</code> 가 <b>왼쪽 위에서 오른쪽 아래로 가는 대각선</b>(1·5·9 = 15), '
       + '<code>m[i][2-i]</code> 가 <b>그 반대 방향 대각선</b>(3·5·7 = 15)이다. '
       + '🚨 <b><code>m[1][2]</code> 와 <code>m[2][1]</code> 은 다른 칸이다</b> — 앞이 행, 뒤가 열이라 '
       + '6 과 8 이고 합은 <b>14</b> 다.',
    d: 2, y: [], tag: ['2차원', '배열', '인덱스']
  },

  {
    id: 'ch10-s05-22', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '#include <stdlib.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int n = 5, i, sum = 0;\n'
        + '    int *p = (int *)malloc(sizeof(int) * n);\n'
        + '\n'
        + '    for (i = 0; i < n; i++) p[i] = (i + 1) * 2;\n'
        + '    for (i = 0; i < n; i++) sum += p[i];\n'
        + '\n'
        + '    printf("%d %d %d", sum, *(p + 2), p[n - 1]);\n'
        + '    free(p);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['30 6 10'],
    why: '<code>malloc</code>·<code>free</code> 는 <b>stdlib.h</b> 에 있고, 크기는 <b>바이트로</b> 준다 — '
       + '<code>sizeof(int) * n</code> 이라야 정수 다섯 칸이다. '
       + '값은 2·4·6·8·10 이라 합은 <b>30</b>. '
       + '📌 <b><code>p[i]</code> 와 <code>*(p + i)</code> 는 완전히 같은 뜻</b>이라 '
       + '<code>*(p+2)</code> 는 <b>6</b>, <code>p[4]</code> 는 <b>10</b> 이다. '
       + '🚨 <code>free</code> 를 빠뜨리면 <b>메모리 누수</b>가 된다.',
    d: 3, y: [], tag: ['포인터', 'malloc', '동적할당']
  },

  {
    id: 'ch10-s06-11', ch: 10, sec: 6,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'typedef struct {\n'
        + '    char 이름[10];\n'
        + '    int  점수;\n'
        + '} 학생;\n'
        + '\n'
        + 'int main() {\n'
        + '    학생 s[3] = {{"김", 80}, {"이", 95}, {"박", 88}};\n'
        + '    학생 *p = s;\n'
        + '    int i, max = 0;\n'
        + '\n'
        + '    for (i = 1; i < 3; i++) {\n'
        + '        if (s[i].점수 > s[max].점수) max = i;\n'
        + '    }\n'
        + '\n'
        + '    printf("%s %d %d", s[max].이름, (p + 2)->점수, p->점수 + s[1].점수);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['이 88 175'],
    why: '<b><code>typedef</code> 를 쓰면 <code>struct</code> 를 안 붙이고 <code>학생</code> 만으로 쓴다.</b> '
       + '점수가 가장 높은 것은 95 인 <b>이</b> 다. '
       + '🚨 <b><code>p + 2</code> 는 주소에 2 를 더하는 것이 아니라 구조체 <b>두 개 크기</b>만큼 건너뛴다</b> — '
       + '<code>s[2]</code> 를 가리켜 <b>88</b> 이다. '
       + '<code>p</code> 는 <code>s[0]</code> 이므로 80 + 95 = <b>175</b>. '
       + '📌 변수는 <code>.</code>, 포인터는 <code>-&gt;</code> 로 멤버에 접근한다.',
    d: 3, y: [], tag: ['구조체', 'typedef', '구조체배열']
  },

  {
    id: 'ch10-s07-16', ch: 10, sec: 7,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int x = 10;\n'
        + '\n'
        + 'void f() {\n'
        + '    int x = 20;\n'
        + '    x++;\n'
        + '    printf("%d ", x);\n'
        + '}\n'
        + '\n'
        + 'void g() {\n'
        + '    x++;\n'
        + '    printf("%d ", x);\n'
        + '}\n'
        + '\n'
        + 'int main() {\n'
        + '    f();\n'
        + '    g();\n'
        + '    printf("%d", x);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['21 11 11'],
    why: '🚨 <b>같은 이름이 있으면 지역 변수가 전역 변수를 가린다.</b> '
       + '<code>f</code> 안의 <code>x</code> 는 <b>자기 것</b>이라 21 이 되고 <b>전역은 10 그대로</b>다. '
       + '<code>g</code> 에는 지역 <code>x</code> 가 없어 <b>전역을 1 올려 11</b> 이 되고, '
       + 'main 에서 찍는 것도 그 전역이라 <b>11</b> 이다. '
       + '📌 전역 변수는 <b>데이터 영역</b>에 있어 프로그램이 끝날 때까지 산다.',
    d: 3, y: [], tag: ['전역변수', '지역변수', '기억클래스']
  },

  {
    id: 'ch10-s07-17', ch: 10, sec: 7,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'void bin(int n) {\n'
        + '    if (n == 0) return;\n'
        + '    bin(n / 2);\n'
        + '    printf("%d", n % 2);\n'
        + '}\n'
        + '\n'
        + 'int main() {\n'
        + '    bin(13);\n'
        + '    printf(" ");\n'
        + '    bin(8);\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['1101 1000'],
    why: '10진수를 2진수로 바꾸는 재귀다. '
       + '🚨 <b><code>printf</code> 가 재귀 호출 <b>뒤에</b> 있다</b> — 몫을 끝까지 내려간 다음 '
       + '<b>되돌아 나오면서</b> 나머지를 찍으므로 순서가 제대로 선다. '
       + '두 줄의 자리를 바꾸면 13 이 <b>1011</b> 로 거꾸로 나온다. '
       + '📌 <code>n == 0</code> 이 <b>종료 조건</b>이다 — 없으면 스택 오버플로가 난다.',
    d: 3, y: [], tag: ['재귀함수', '진법변환']
  },

  {
    id: 'ch10-s12-12', ch: 10, sec: 12,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '#include <math.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    double a = 7.6, b = -3.2;\n'
        + '\n'
        + '    printf("%d ", (int)sqrt(16.0));\n'
        + '    printf("%d ", (int)pow(2, 5));\n'
        + '    printf("%d ", (int)ceil(a));\n'
        + '    printf("%d", (int)floor(b));\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['4 32 8 -4'],
    why: '<b>math.h</b> — <code>sqrt</code> 제곱근 · <code>pow</code> 거듭제곱 · '
       + '<code>ceil</code> 올림 · <code>floor</code> 내림 · <code>abs</code> 절댓값. '
       + '🚨 <b><code>floor</code> 는 「소수점 버림」이 아니라 「작은 쪽」</b>이다 — '
       + '−3.2 는 −3 이 아니라 <b>−4</b> 다. 양수에서만 버림과 결과가 같다.',
    d: 3, y: [], tag: ['math.h', '라이브러리', '헤더파일']
  },

  {
    id: 'ch10-s12-13', ch: 10, sec: 12,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '#include <stdlib.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    char s1[] = "42";\n'
        + '    char s2[] = "7kg";\n'
        + '    char s3[] = "kg7";\n'
        + '\n'
        + '    printf("%d ", atoi(s1) + abs(-8));\n'
        + '    printf("%d ", atoi(s2));\n'
        + '    printf("%d", atoi(s3));\n'
        + '    return 0;\n'
        + '}',
    q: '다음 C 코드의 출력 결과를 쓰시오.',
    a: ['50 7 0'],
    why: '<b>stdlib.h</b> — <code>atoi</code> 문자열을 정수로 · <code>atof</code> 실수로 · '
       + '<code>rand</code> 난수 · <code>malloc</code>·<code>free</code> 메모리. '
       + '<code>atoi</code> 는 <b>앞에서부터 숫자로 읽히는 데까지만</b> 읽고 멈춘다 — '
       + '<code>"7kg"</code> 는 <b>7</b>, 처음부터 숫자가 아닌 <code>"kg7"</code> 는 <b>0</b> 이다. '
       + '🚨 그래서 <b>「변환 실패」와 「진짜 0」을 구분할 수 없다.</b>',
    d: 2, y: [], tag: ['stdlib.h', 'atoi', '라이브러리']
  },

  /* ======================================================================
     🚨 T46 7절 — 보기 선택 문항 (`pool` + `t:'pick'`) · 2026-08-17

     ch10 은 코드 문항이 150개라 여기서는 **개념 섹션만** 골랐다 —
     자료형·연산자 우선순위·언어 분류·라이브러리·예외·Python 자료형.
     ====================================================================== */

  {
    id: 'ch10-s01-16', ch: 10, sec: 1,
    t: 'multi-blank',
    q: 'C 언어의 기억 클래스에 대한 설명이다. 각 설명에 해당하는 것을 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ 기억 영역은 <b>스택</b>이고 존재 범위는 함수 내부다<br>'
     + '㉡ 기억 영역은 <b>데이터 영역</b>이고 존재 범위는 프로그램 전체다. 내부·외부 모두에 쓸 수 있다<br>'
     + '㉢ 기억 영역이 <b>레지스터</b>다',
    pool: ['auto(자동 변수)', 'register(레지스터 변수)',
           'static(정적 변수)', 'extern(외부 변수)'],
    parts: [
      { label: '㉠', t: 'pick', a: ['auto(자동 변수)'] },
      { label: '㉡', t: 'pick', a: ['static(정적 변수)'] },
      { label: '㉢', t: 'pick', a: ['register(레지스터 변수)'] }
    ],
    why: '🚨 <b>static 과 extern 은 둘 다 데이터 영역이라 헷갈린다</b> — '
       + '<b>static</b> 은 함수 안에 써도 <b>값이 유지되는</b> 변수이고, '
       + '<b>extern</b> 은 <b>다른 파일에 있는 변수를 끌어다 쓰겠다</b>는 선언이다. '
       + '📌 아무것도 안 붙이면 <b>auto</b> 다 — 함수가 끝나면 사라진다.',
    d: 3, y: [], tag: ['기억클래스', 'static', 'auto'], lang: null, code: null
  },

  {
    id: 'ch10-s02-20', ch: 10, sec: 2,
    t: 'multi-blank',
    q: '연산자 우선순위에 대한 설명이다. 각 자리에 해당하는 연산자 무리를 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ <b>산술 연산자 바로 다음</b> 순위<br>'
     + '㉡ <b>논리 연산자 바로 다음</b> 순위<br>'
     + '㉢ <b>가장 낮은</b> 순위',
    pool: ['단항 연산자', '산술 연산자', '시프트 연산자', '관계 연산자',
           '비트 연산자', '논리 연산자', '삼항 연산자', '대입 연산자', '순서 연산자'],
    parts: [
      { label: '㉠', t: 'pick', a: ['시프트 연산자'] },
      { label: '㉡', t: 'pick', a: ['삼항 연산자'] },
      { label: '㉢', t: 'pick', a: ['순서 연산자'] }
    ],
    why: '📌 <b>단산시관비논삼대순</b> — 단항 → 산술 → 시프트 → 관계 → 비트 → 논리 → 삼항 → 대입 → 순서. '
       + '🚨 <b>시프트가 산술보다 낮다</b>는 것이 함정이다 — '
       + '<code>a &lt;&lt; 1 + 1</code> 은 <code>a &lt;&lt; 2</code> 로 읽힌다. '
       + '비트는 그 안에서 <b><code>&amp;</code> → <code>^</code> → <code>|</code></b> 순이다.',
    d: 3, y: [], tag: ['연산자우선순위', '단산시관비논삼대순'], lang: null, code: null
  },

  {
    id: 'ch10-s09-22', ch: 10, sec: 9,
    t: 'multi-blank',
    q: '객체 지향 개념에 대한 설명이다. 각 설명에 해당하는 것을 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ <b>같은 클래스 안</b>에서 같은 이름의 메소드를 매개변수만 다르게 여러 개 정의한다<br>'
     + '㉡ <b>상속 관계</b>에서 상위 클래스의 메소드를 매개변수·반환형을 <b>그대로 두고</b> 다시 정의한다<br>'
     + '㉢ <b>구현을 강제</b>하는 것이 목적이고 <b>다중 구현</b>이 가능하다',
    pool: ['오버로딩', '오버라이딩', '추상 클래스', '인터페이스',
           '캡슐화', '정보 은닉', '다형성'],
    parts: [
      { label: '㉠', t: 'pick', a: ['오버로딩'] },
      { label: '㉡', t: 'pick', a: ['오버라이딩'] },
      { label: '㉢', t: 'pick', a: ['인터페이스'] }
    ],
    why: '🚨 <b>오버로딩은 매개변수가 달라야 하고 오버라이딩은 같아야 한다</b> — 정반대다. '
       + '반환형도 오버로딩은 상관없지만 오버라이딩은 같아야 한다. '
       + '<b>추상 클래스는 공통 기능을 물려주려는 것(단일 상속)</b>, '
       + '<b>인터페이스는 구현을 강제하려는 것(다중 구현)</b> 이다.',
    d: 2, y: [], tag: ['오버로딩', '오버라이딩', '인터페이스'], lang: null, code: null
  },

  {
    id: 'ch10-s10-33', ch: 10, sec: 10,
    t: 'multi-blank',
    q: 'Python 의 자료형에 대한 설명이다. 각 설명에 해당하는 것을 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ <code>(1, 2, 3)</code> 처럼 쓴다. <b>순서는 있지만 변경할 수 없다</b><br>'
     + '㉡ <code>{1, 2, 3}</code> 처럼 쓴다. <b>순서가 없고 중복을 허용하지 않는다</b><br>'
     + '㉢ <code>{\'a\': 1}</code> 처럼 쓴다. <b>키-값 쌍</b>이고 키는 중복될 수 없다',
    pool: ['리스트(List)', '튜플(Tuple)', '딕셔너리(Dictionary)', '세트(Set)'],
    parts: [
      { label: '㉠', t: 'pick', a: ['튜플(Tuple)'] },
      { label: '㉡', t: 'pick', a: ['세트(Set)'] },
      { label: '㉢', t: 'pick', a: ['딕셔너리(Dictionary)'] }
    ],
    why: '⚠️ <b>괄호 모양으로 먼저 갈린다</b> — <code>[ ]</code> 리스트 · <code>( )</code> 튜플 · '
       + '<code>{ }</code> 는 세트와 딕셔너리 둘이라 <b>안에 콜론이 있으면 딕셔너리</b> 다. '
       + '🚨 <b>튜플은 변경 불가, 세트는 중복 불가</b> 가 가장 자주 나오는 두 가지다.',
    d: 1, y: [], tag: ['Python', '자료형', '튜플', '세트'], lang: null, code: null
  },

  {
    id: 'ch10-s11-09', ch: 10, sec: 11,
    t: 'multi-blank',
    q: '프로그래밍 언어에 대한 설명이다. 각 설명에 해당하는 언어를 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ 1980년대 앨런 케이가 개발. <b>최초로 GUI 를 제공</b>한 객체 지향 언어<br>'
     + '㉡ 논리학을 기초로 한 언어. 인공지능 분야의 <b>논리적 추론이나 삼단 논법</b> 표현에 적합<br>'
     + '㉢ 서버용 스크립트 언어이며 <b>Windows 계열에서만</b> 수행할 수 있다',
    pool: ['C', 'COBOL', 'JAVA', 'Smalltalk', 'JavaScript',
           'JSP', 'PHP', 'ASP', 'LISP', 'PROLOG'],
    parts: [
      { label: '㉠', t: 'pick', a: ['Smalltalk'] },
      { label: '㉡', t: 'pick', a: ['PROLOG'] },
      { label: '㉢', t: 'pick', a: ['ASP'] }
    ],
    why: '🚨 <b>LISP 와 PROLOG 를 바꿔 쓰기 쉽다</b> — 둘 다 인공지능이지만 '
       + '<b>LISP 는 함수형</b>(1960년 매카시), <b>PROLOG 는 논리형</b> 이다. '
       + '스크립트는 <b>서버용(ASP·JSP·PHP·Python)</b> 과 '
       + '<b>클라이언트용(JavaScript·VBScript)</b> 으로 갈린다.',
    d: 3, y: [], tag: ['언어분류', 'Smalltalk', 'PROLOG', 'ASP'], lang: null, code: null
  },

  {
    id: 'ch10-s12-14', ch: 10, sec: 12,
    t: 'multi-blank',
    q: 'C 언어의 표준 라이브러리에 대한 설명이다. 각 함수가 들어 있는 <b>헤더 파일</b>을 보기에서 골라 쓰시오.<br>'
     + '㉠ <code>malloc</code>, <code>free</code>, <code>atoi</code>, <code>rand</code><br>'
     + '㉡ <code>sqrt</code>, <code>pow</code>, <code>ceil</code>, <code>floor</code><br>'
     + '㉢ <code>strlen</code>, <code>strcpy</code>, <code>strcmp</code>, <code>strcat</code>',
    pool: ['stdio.h', 'math.h', 'string.h', 'stdlib.h', 'time.h'],
    parts: [
      { label: '㉠', t: 'pick', a: ['stdlib.h'] },
      { label: '㉡', t: 'pick', a: ['math.h'] },
      { label: '㉢', t: 'pick', a: ['string.h'] }
    ],
    why: '이름이 그대로 힌트다 — <b>std<u>io</u></b> 입·출력 · <b>math</b> 수학 · '
       + '<b>string</b> 문자열 · <b>std<u>lib</u></b> 그 밖의 잡다한 것(형 변환·난수·메모리) · <b>time</b> 시간. '
       + '🚨 <b>메모리 할당(<code>malloc</code>)이 stdlib.h 에 있다</b>는 것이 가장 잘 틀리는 자리다.',
    d: 2, y: [], tag: ['라이브러리', '헤더파일', 'stdlib.h'], lang: null, code: null
  },

  {
    id: 'ch10-s13-18', ch: 10, sec: 13,
    t: 'multi-blank',
    q: 'Java 의 예외 객체에 대한 설명이다. 각 상황에 해당하는 예외를 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ <b>0으로 나누는</b> 등 산술 연산에 오류가 생겼다<br>'
     + '㉡ <b>숫자로 바꿀 수 없는 문자열</b>을 변환하려 했다<br>'
     + '㉢ <b>null 인 객체</b>의 멤버에 접근했다',
    pool: ['ClassNotFoundException', 'NoSuchMethodException', 'FileNotFoundException',
           'ArithmeticException', 'IllegalArgumentException', 'NumberFormatException',
           'ArrayIndexOutOfBoundsException', 'NullPointerException'],
    parts: [
      { label: '㉠', t: 'pick', a: ['ArithmeticException'] },
      { label: '㉡', t: 'pick', a: ['NumberFormatException'] },
      { label: '㉢', t: 'pick', a: ['NullPointerException'] }
    ],
    why: '🚨 <b>이름 자체를 쓰게 하는 출제가 많다</b> — 철자까지 외워 둔다. '
       + '📌 <code>Integer.parseInt("12A")</code> 는 <b>NumberFormatException</b>, '
       + '<code>new int[3]</code> 의 인덱스 3 은 <b>ArrayIndexOutOfBoundsException</b> 이다. '
       + '<b>finally 는 예외가 나든 안 나든 항상 실행된다.</b>',
    d: 2, y: [], tag: ['예외처리', '예외객체'], lang: null, code: null
  },

  {
    id: 'ch10-s07-18', ch: 10, sec: 7,
    t: 'multi-blank',
    q: '매개변수 전달 방식과 함수에 대한 설명이다. 각 설명에 해당하는 것을 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ 매개변수에 <b>값을 복사해서</b> 전달한다. 원본 값이 변경되지 않는다<br>'
     + '㉡ 매개변수에 <b>주소를 전달</b>한다. 원본 값이 변경된다<br>'
     + '㉢ 자기 자신을 다시 호출하는 함수. <b>종료 조건이 없으면</b> 스택 오버플로가 난다',
    pool: ['값에 의한 호출(Call by Value)', '주소에 의한 호출(Call by Reference)',
           '재귀 함수', '사용자 정의 함수', '라이브러리 함수'],
    parts: [
      { label: '㉠', t: 'pick', a: ['값에 의한 호출(Call by Value)'] },
      { label: '㉡', t: 'pick', a: ['주소에 의한 호출(Call by Reference)'] },
      { label: '㉢', t: 'pick', a: ['재귀 함수'] }
    ],
    why: '🔑 <b>C 는 기본이 값에 의한 호출</b>이라 원본을 바꾸려면 <b>포인터로 주소를 넘겨야</b> 한다 — '
       + '<code>swapValue(x, y)</code> 는 안 바뀌고 <code>swapRef(&amp;x, &amp;y)</code> 는 바뀐다. '
       + '📌 <b>Java 도 값에 의한 호출이지만 참조 타입은 「주소값」이 복사</b>되어 '
       + '가리키는 객체의 내용은 바뀐다 — 배열을 넘기면 원본이 바뀌는 이유다.',
    d: 2, y: [], tag: ['매개변수전달', 'CallByValue', '재귀함수'], lang: null, code: null
  },

  /* ======================================================================
     🚨 T46 8절 — 빈칸 키워드 15문항 (프로그래밍) · 2026-08-17

     실제 회차의 빈칸형은 **2020-1 ~ 2023-3 열세 회차에 15개**로 앞쪽에 몰려 있고
     2024 이후 일곱 회차에는 2개뿐이다. **0으로 두지는 않는다** — 2025-3 에 다시 나왔다.
     → exam-archive/answers.md 3장 · decisions/exam-format.md

     🔒 **빈칸은 「예약어나 표준 함수 이름」 자리에만 판다.**
        식이나 문장을 비우면 정답이 여럿이 되어 채점이 안 된다.
     ====================================================================== */

  {
    id: 'ch10-s01-17', ch: 10, sec: 1,
    t: 'code', lang: 'c',
    code: '#include <( ㉠ )>\n'
        + '\n'
        + 'void 세기() {\n'
        + '    ( ㉡ ) int cnt = 0;   /* 함수가 끝나도 값이 남는다 */\n'
        + '    cnt++;\n'
        + '    printf("%d ", cnt);\n'
        + '}\n'
        + '\n'
        + 'int main() {\n'
        + '    세기(); 세기(); 세기();\n'
        + '    return 0;\n'
        + '}',
    q: '출력이 <code>1 2 3</code> 이 되게 하려 한다. ㉠ 에 들어갈 <b>헤더 파일</b>과 ㉡ 에 들어갈 <b>기억 클래스</b>를 쓰시오.',
    parts: [
      { label: '㉠', a: ['stdio.h'] },
      { label: '㉡', a: ['static'] }
    ],
    why: '<code>printf</code> 는 <b>stdio.h</b> 에 있다. '
       + '🚨 <b><code>static</code> 을 빼면 <code>1 1 1</code> 이 나온다</b> — '
       + '보통의 지역 변수(<code>auto</code>)는 함수가 끝나면 사라져 다음 호출 때 다시 0 이 된다. '
       + '<b>static 은 데이터 영역에 놓여 프로그램이 끝날 때까지 값이 남는다.</b>',
    d: 2, y: [], tag: ['빈칸', '기억클래스', 'static']
  },

  {
    id: 'ch10-s05-23', ch: 10, sec: 5,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'void 바꾸기(int *x, int *y) {\n'
        + '    int t = ( ㉠ )x;\n'
        + '    ( ㉠ )x = ( ㉠ )y;\n'
        + '    ( ㉠ )y = t;\n'
        + '}\n'
        + '\n'
        + 'int main() {\n'
        + '    int a = 1, b = 2;\n'
        + '    바꾸기(( ㉡ )a, ( ㉡ )b);\n'
        + '    printf("%d %d", a, b);\n'
        + '    return 0;\n'
        + '}',
    q: '출력이 <code>2 1</code> 이 되게 하려 한다. ㉠·㉡ 에 들어갈 <b>연산자</b>를 쓰시오.',
    parts: [
      { label: '㉠', a: ['*'] },
      { label: '㉡', a: ['&'] }
    ],
    why: '🔑 <b><code>&amp;</code> 는 주소를 꺼내고 <code>*</code> 는 그 주소가 가리키는 값을 꺼낸다.</b> '
       + '주소를 넘기는 <b>주소에 의한 호출(Call by Reference)</b> 이라 원본이 바뀐다. '
       + '🚨 <code>&amp;</code> 를 빼고 값만 넘기면 <b>값에 의한 호출</b>이 되어 <code>1 2</code> 그대로다.',
    d: 2, y: [], tag: ['빈칸', '포인터', 'CallByReference']
  },

  {
    id: 'ch10-s06-12', ch: 10, sec: 6,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + '( ㉠ ) struct {\n'
        + '    char 이름[10];\n'
        + '    int  나이;\n'
        + '} 회원;\n'
        + '\n'
        + 'int main() {\n'
        + '    회원 m = {"김", 25};\n'
        + '    회원 *p = &m;\n'
        + '\n'
        + '    printf("%d ", m( ㉡ )나이);\n'
        + '    printf("%d", p( ㉢ )나이);\n'
        + '    return 0;\n'
        + '}',
    q: '<code>struct</code> 를 붙이지 않고 <code>회원</code> 만으로 쓰려 한다. ㉠ 에 들어갈 예약어와, ㉡·㉢ 에 들어갈 <b>멤버 접근 연산자</b>를 쓰시오.',
    parts: [
      { label: '㉠', a: ['typedef'] },
      { label: '㉡', a: ['.'] },
      { label: '㉢', a: ['->'] }
    ],
    why: '<b><code>typedef</code></b> 는 자료형에 새 이름을 붙인다. '
       + '⚠️ <b>구조체 변수는 <code>.</code>, 구조체 포인터는 <code>-&gt;</code></b> 로 멤버에 접근한다. '
       + '<code>p-&gt;나이</code> 는 <code>(*p).나이</code> 와 같은 뜻이다.',
    d: 2, y: [], tag: ['빈칸', '구조체', 'typedef']
  },

  {
    id: 'ch10-s07-19', ch: 10, sec: 7,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '#include <( ㉠ )>\n'
        + '\n'
        + 'int main() {\n'
        + '    char a[20] = "EIP";\n'
        + '    char b[20];\n'
        + '\n'
        + '    ( ㉡ )(b, a);          /* b 에 a 를 복사 */\n'
        + '    ( ㉢ )(b, "Study");    /* b 뒤에 이어 붙임 */\n'
        + '\n'
        + '    printf("%s", b);\n'
        + '    return 0;\n'
        + '}',
    q: '출력이 <code>EIPStudy</code> 가 되게 하려 한다. ㉠ 의 <b>헤더 파일</b>과 ㉡·㉢ 의 <b>함수 이름</b>을 쓰시오.',
    parts: [
      { label: '㉠', a: ['string.h'] },
      { label: '㉡', a: ['strcpy'] },
      { label: '㉢', a: ['strcat'] }
    ],
    why: '문자열 함수는 <b>string.h</b> 에 있다 — <code>strlen</code>(길이) · '
       + '<code>strcpy</code>(복사) · <code>strcat</code>(연결) · <code>strcmp</code>(비교). '
       + '🚨 <b>순서를 바꾸면 안 된다</b> — <code>strcat</code> 을 먼저 부르면 b 가 아직 비어 있지 않아 '
       + '엉뚱한 값 뒤에 붙는다.',
    d: 2, y: [], tag: ['빈칸', '문자열', 'string.h']
  },

  {
    id: 'ch10-s03-23', ch: 10, sec: 3,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '\n'
        + 'int main() {\n'
        + '    int i, sum = 0;\n'
        + '    for (i = 1; i <= 10; i++) {\n'
        + '        if (i % 2 == 0) ( ㉠ );   /* 짝수는 건너뛴다 */\n'
        + '        if (i > 7) ( ㉡ );        /* 7 을 넘으면 반복을 끝낸다 */\n'
        + '        sum += i;\n'
        + '    }\n'
        + '    printf("%d", sum);\n'
        + '    return 0;\n'
        + '}',
    q: '출력이 <code>16</code> 이 되게 하려 한다. ㉠·㉡ 에 들어갈 <b>제어문</b>을 쓰시오.',
    parts: [
      { label: '㉠', a: ['continue'] },
      { label: '㉡', a: ['break'] }
    ],
    why: '🔑 <b><code>continue</code> 는 이번 회만 건너뛰고 <code>break</code> 는 반복문을 아주 나온다.</b> '
       + '홀수 1·3·5·7 만 더해져 <b>16</b> 이다 — 9 는 <code>i &gt; 7</code> 에 걸려 못 들어온다. '
       + '🚨 <b>둘을 바꿔 쓰면 1 만 더해지고 끝난다.</b>',
    d: 2, y: [], tag: ['빈칸', '제어문', 'continue', 'break']
  },

  {
    id: 'ch10-s04-28', ch: 10, sec: 4,
    t: 'code', lang: 'c',
    code: '#include <stdio.h>\n'
        + '#include <( ㉠ )>\n'
        + '\n'
        + 'int main() {\n'
        + '    int n = 4, i, sum = 0;\n'
        + '    int *p = (int *)( ㉡ )(sizeof(int) * n);\n'
        + '\n'
        + '    for (i = 0; i < n; i++) p[i] = i + 1;\n'
        + '    for (i = 0; i < n; i++) sum += p[i];\n'
        + '\n'
        + '    printf("%d", sum);\n'
        + '    ( ㉢ )(p);\n'
        + '    return 0;\n'
        + '}',
    q: '정수 4개를 <b>동적으로 할당</b>했다가 반환하려 한다. ㉠ 의 <b>헤더 파일</b>과 ㉡·㉢ 의 <b>함수 이름</b>을 쓰시오.',
    parts: [
      { label: '㉠', a: ['stdlib.h'] },
      { label: '㉡', a: ['malloc'] },
      { label: '㉢', a: ['free'] }
    ],
    why: '🚨 <b>메모리 할당은 stdlib.h 에 있다</b> — 가장 잘 틀리는 자리다. '
       + '크기는 <b>바이트로</b> 주므로 <code>sizeof(int) * n</code> 이라야 정수 넉 칸이다. '
       + '<b><code>free</code> 를 빠뜨리면 메모리 누수</b>가 된다. 출력은 1+2+3+4 = <b>10</b>.',
    d: 3, y: [], tag: ['빈칸', 'malloc', 'stdlib.h']
  },

  {
    id: 'ch10-s08-24', ch: 10, sec: 8,
    t: 'code', lang: 'java',
    code: 'class 회원 {\n'
        + '    ( ㉠ ) int 인원 = 0;   /* 객체를 만들지 않고도 쓰고, 모든 객체가 공유한다 */\n'
        + '    String 이름;\n'
        + '\n'
        + '    회원(String 이름) {\n'
        + '        ( ㉡ ).이름 = 이름;\n'
        + '        인원++;\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        new 회원("김"); new 회원("이"); new 회원("박");\n'
        + '        System.out.println(회원.인원);\n'
        + '    }\n'
        + '}',
    q: '출력이 <code>3</code> 이 되게 하려 한다. ㉠·㉡ 에 들어갈 예약어를 쓰시오.',
    parts: [
      { label: '㉠', a: ['static'] },
      { label: '㉡', a: ['this'] }
    ],
    why: '<b><code>static</code></b> 은 객체마다가 아니라 <b>클래스에 하나</b>라 셋을 만들면 3 이 된다 — '
       + '🚨 빼면 <code>회원.인원</code> 이라고 부를 수조차 없다. '
       + '<b><code>this</code></b> 는 현재 객체 자신이라 <b>매개변수와 필드의 이름이 같을 때</b> 둘을 가른다.',
    d: 2, y: [], tag: ['빈칸', 'static', 'this']
  },

  {
    id: 'ch10-s09-23', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'interface 대출가능 {\n'
        + '    void 대출();\n'
        + '}\n'
        + '\n'
        + '( ㉠ ) class 자료 {\n'
        + '    ( ㉠ ) void 정보();          /* 몸통이 없다 */\n'
        + '    void 안내() { System.out.print("자료 "); }\n'
        + '}\n'
        + '\n'
        + 'class 도서 ( ㉡ ) 자료 ( ㉢ ) 대출가능 {\n'
        + '    public void 정보() { System.out.print("도서 "); }\n'
        + '    public void 대출() { System.out.print("대출"); }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        도서 d = new 도서();\n'
        + '        d.안내(); d.정보(); d.대출();\n'
        + '    }\n'
        + '}',
    q: '출력이 <code>자료 도서 대출</code> 이 되게 하려 한다. ㉠~㉢ 에 들어갈 예약어를 쓰시오.',
    parts: [
      { label: '㉠', a: ['abstract'] },
      { label: '㉡', a: ['extends'] },
      { label: '㉢', a: ['implements'] }
    ],
    why: '🚨 <b>클래스는 <code>extends</code>, 인터페이스는 <code>implements</code></b> 로 받는다 — '
       + '이 둘을 바꿔 쓰면 컴파일이 안 된다. '
       + '<b>추상 클래스는 단일 상속, 인터페이스는 다중 구현</b>이라 한 클래스가 둘을 함께 쓸 때는 '
       + '<b><code>extends</code> 가 먼저</b> 온다. '
       + '📌 몸통 없는 메소드가 하나라도 있으면 클래스에도 <code>abstract</code> 를 붙여야 한다.',
    d: 3, y: [], tag: ['빈칸', '추상클래스', 'extends', 'implements']
  },

  {
    id: 'ch10-s13-19', ch: 10, sec: 13,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        ( ㉠ ) {\n'
        + '            int r = 10 / 0;\n'
        + '        } ( ㉡ ) (ArithmeticException e) {\n'
        + '            System.out.print("오류 ");\n'
        + '        } ( ㉢ ) {\n'
        + '            System.out.print("종료");\n'
        + '        }\n'
        + '    }\n'
        + '}',
    q: '출력이 <code>오류 종료</code> 가 되게 하려 한다. ㉠~㉢ 에 들어갈 예약어를 쓰시오.',
    parts: [
      { label: '㉠', a: ['try'] },
      { label: '㉡', a: ['catch'] },
      { label: '㉢', a: ['finally'] }
    ],
    why: '<b><code>try</code></b> 는 예외가 날 만한 코드, <b><code>catch</code></b> 는 났을 때 할 일, '
       + '<b><code>finally</code></b> 는 <b>나든 안 나든 반드시</b> 하는 일이다 — 자원 반환을 여기에 둔다. '
       + '📌 0으로 나누면 <b>ArithmeticException</b> 이다.',
    d: 1, y: [], tag: ['빈칸', '예외처리', 'try-catch-finally']
  },

  {
    id: 'ch10-s09-24', ch: 10, sec: 9,
    t: 'code', lang: 'java',
    code: 'class 자료 {\n'
        + '    String 이름;\n'
        + '    자료(String 이름) { this.이름 = 이름; }\n'
        + '}\n'
        + '\n'
        + 'class 도서 extends 자료 {\n'
        + '    int 쪽수;\n'
        + '    도서(String 이름, int 쪽수) {\n'
        + '        ( ㉠ )(이름);        /* 상위 클래스의 생성자를 부른다 */\n'
        + '        ( ㉡ ).쪽수 = 쪽수;\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        도서 d = new 도서("자료구조", 300);\n'
        + '        System.out.println(d.이름 + " " + d.쪽수);\n'
        + '    }\n'
        + '}',
    q: '출력이 <code>자료구조 300</code> 이 되게 하려 한다. ㉠·㉡ 에 들어갈 예약어를 쓰시오.',
    parts: [
      { label: '㉠', a: ['super'] },
      { label: '㉡', a: ['this'] }
    ],
    why: '🚨 <b><code>super()</code> 는 반드시 생성자의 첫 줄</b>이라야 한다 — '
       + '부모가 다 만들어진 뒤에 자식 몫을 채우기 때문이다. '
       + '<b><code>super</code> 는 상위 클래스, <code>this</code> 는 현재 객체</b>이고, '
       + '<code>this()</code> 는 <b>같은 클래스의 다른 생성자</b>를 부른다.',
    d: 2, y: [], tag: ['빈칸', 'super', 'this', '생성자']
  },

  {
    id: 'ch10-s04-29', ch: 10, sec: 4,
    t: 'code', lang: 'java',
    code: 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        int[] arr = {10, 20, 30};\n'
        + '        String s = "EIPStudy";\n'
        + '        int sum = 0;\n'
        + '\n'
        + '        for (int v : arr) sum += v;\n'
        + '\n'
        + '        System.out.print(arr.( ㉠ ) + " ");\n'
        + '        System.out.print(s.( ㉡ ) + " ");\n'
        + '        System.out.print(sum);\n'
        + '    }\n'
        + '}',
    q: '출력이 <code>3 8 60</code> 이 되게 하려 한다. ㉠·㉡ 에 들어갈 것을 쓰시오.',
    parts: [
      { label: '㉠', a: ['length'] },
      { label: '㉡', a: ['length()'] }
    ],
    why: '🚨 <b>배열은 <code>length</code>(필드), 문자열은 <code>length()</code>(메소드)</b> 다 — '
       + '괄호 하나 차이라 가장 자주 틀리는 자리다. '
       + '📌 컬렉션(<code>ArrayList</code> 등)은 또 달라서 <code>size()</code> 를 쓴다. 셋을 함께 외운다.',
    d: 2, y: [], tag: ['빈칸', '배열', '문자열', 'length']
  },

  {
    id: 'ch10-s12-15', ch: 10, sec: 12,
    t: 'code', lang: 'java',
    code: '( ㉠ ) java.util.*;\n'
        + '\n'
        + 'public class Main {\n'
        + '    public static void main(String[] args) {\n'
        + '        List<Integer> a = new ArrayList<>();\n'
        + '        a.add(3); a.add(7); a.add(3);\n'
        + '\n'
        + '        Set<Integer> s = new ( ㉡ )<>(a);\n'
        + '\n'
        + '        System.out.print(a.size() + " " + s.size());\n'
        + '    }\n'
        + '}',
    q: '출력이 <code>3 2</code> 가 되게 하려 한다. ㉠ 의 예약어와 ㉡ 의 <b>클래스 이름</b>을 쓰시오.',
    parts: [
      { label: '㉠', a: ['import'] },
      { label: '㉡', a: ['HashSet'] }
    ],
    why: 'Java 는 라이브러리를 <b>패키지</b>로 주고 <b><code>import</code></b> 로 불러 쓴다 — '
       + '🚨 <b><code>java.lang</code> 만 자동으로 포함</b>되고 <code>java.util</code> 은 적어야 한다. '
       + '<b><code>Set</code> 은 중복을 담지 않아</b> 3 이 둘이어도 하나만 남는다.',
    d: 2, y: [], tag: ['빈칸', 'import', 'HashSet', 'java.util']
  },

  {
    id: 'ch10-s10-34', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'class 회원:\n'
        + '    def ( ㉠ )(( ㉡ ), 이름):\n'
        + '        ( ㉡ ).이름 = 이름\n'
        + '        ( ㉡ ).대출수 = 0\n'
        + '\n'
        + '    def 대출(( ㉡ )):\n'
        + '        ( ㉡ ).대출수 += 1\n'
        + '\n'
        + 'm = 회원("김하늘")\n'
        + 'm.대출()\n'
        + 'print(m.이름, m.대출수)',
    q: '출력이 <code>김하늘 1</code> 이 되게 하려 한다. ㉠ 의 <b>생성자 이름</b>과 ㉡ 의 <b>첫 매개변수</b>를 쓰시오.',
    parts: [
      { label: '㉠', a: ['__init__'] },
      { label: '㉡', a: ['self'] }
    ],
    why: 'Python 의 생성자는 <b><code>__init__</code></b> 이고 <b>앞뒤로 밑줄이 두 개씩</b>이다. '
       + '🚨 <b>메소드의 첫 매개변수는 반드시 <code>self</code></b> — 부를 때는 안 넘기지만 '
       + '정의할 때는 적어야 한다. 빠뜨리면 인자 개수가 안 맞는다는 오류가 난다.',
    d: 2, y: [], tag: ['빈칸', 'Python', '생성자', 'self']
  },

  {
    id: 'ch10-s10-35', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: 'a = [0, 1, 2, 3, 4, 5]\n'
        + '\n'
        + 'print(a[( ㉠ )])            # [5, 4, 3, 2, 1, 0]\n'
        + '\n'
        + 'for i in ( ㉡ )(1, 4):\n'
        + '    print(i, end=" ")     # 1 2 3',
    q: '주석과 같은 결과가 나오게 하려 한다. ㉠ 의 <b>슬라이싱 표기</b>와 ㉡ 의 <b>내장 함수</b>를 쓰시오.',
    parts: [
      { label: '㉠', a: ['::-1'] },
      { label: '㉡', a: ['range'] }
    ],
    why: '<b><code>a[::-1]</code></b> 은 간격을 −1 로 줘서 <b>뒤에서부터</b> 훑는다. '
       + '🚨 <b><code>range(1, 4)</code> 는 1 이상 4 <u>미만</u></b> 이라 1·2·3 이다 — '
       + '끝 값이 안 들어가는 것이 슬라이싱과 같다.',
    d: 2, y: [], tag: ['빈칸', 'Python', '슬라이싱', 'range']
  },

  {
    id: 'ch10-s10-36', ch: 10, sec: 10,
    t: 'code', lang: 'python',
    code: '( ㉠ ):\n'
        + '    r = 10 / 0\n'
        + '( ㉡ ) ZeroDivisionError:\n'
        + '    print("0으로 나눌 수 없음", end=" ")\n'
        + '( ㉢ ):\n'
        + '    print("예외 없음", end=" ")\n'
        + '( ㉣ ):\n'
        + '    print("항상 실행")',
    q: '출력이 <code>0으로 나눌 수 없음 항상 실행</code> 이 되게 하려 한다. ㉠~㉣ 에 들어갈 예약어를 쓰시오.',
    parts: [
      { label: '㉠', a: ['try'] },
      { label: '㉡', a: ['except'] },
      { label: '㉢', a: ['else'] },
      { label: '㉣', a: ['finally'] }
    ],
    why: '🚨 <b>Java 는 <code>catch</code>, Python 은 <code>except</code></b> 다. '
       + '💡 <b>Python 에만 <code>else</code> 가 있다</b> — <b>예외가 나지 않았을 때만</b> 실행된다. '
       + '여기서는 0으로 나눠 예외가 났으므로 <code>else</code> 는 건너뛰고 '
       + '<code>finally</code> 만 이어서 실행된다.',
    d: 3, y: [], tag: ['빈칸', 'Python', '예외처리']
  }

];
