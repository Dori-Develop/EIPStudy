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
  }

];
