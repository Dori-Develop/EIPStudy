/* ==========================================================================
   08. SQL 응용 — 문제 은행

   id  ch08-sNN-MM   한 번 부여하면 절대 바꾸지 않는다 (오답노트가 참조)
   sec  섹션 번호 (ch08/sNN.html 과 동일)
   t    ox | short | choice | code
   a    ox → true/false · short/code → 정답 문자열 배열 · choice → 정답 인덱스(0-based)
   c    choice 의 보기 배열
   d    난이도 1(쉬움) ~ 3(어려움)
   y    이 개념이 출제된 연도. 확인된 것만 적는다 — 추측으로 채우지 말 것

   ⚠️ 음수·부호가 답인 문항은 short 가 아니라 code 로 낸다.
      short 는 채점 시 '-' 를 지우고 한 번 더 비교하므로 -13 과 13 이 같아진다.

   목표 54문항 (s18 부록은 제외 — 다른 섹션과 중복되므로 출제하지 않는다)
   예제 테이블은 본문과 같은 도서관 도메인(회원·도서·대출)을 쓴다.
   ========================================================================== */
window.EIP_BANK_ch08 = [


  /* ========================================================= s01 SQL의 분류 */

  {
    id: 'ch08-s01-01', ch: 8, sec: 1,
    t: 'choice',
    q: 'SQL 명령어의 분류가 <b>잘못</b> 짝지어진 것은?',
    c: ['DDL — CREATE, ALTER, DROP', 'DML — SELECT, INSERT, DELETE, UPDATE', 'DCL — GRANT, REVOKE, COMMIT, ROLLBACK', 'DDL — INSERT, UPDATE, TRUNCATE'],
    a: 3,
    why: '<b>INSERT·UPDATE 는 DML</b> 이다. DDL 은 구조를 정의하는 <b>CREATE·ALTER·DROP</b> 이다. (TRUNCATE 는 DDL 이 맞다)',
    d: 1, y: [], tag: ['SQL분류'], lang: null, code: null
  },

  {
    id: 'ch08-s01-02', ch: 8, sec: 1,
    t: 'short',
    q: '트랜잭션 내에 <b>ROLLBACK 할 위치인 저장점을 지정</b>하는 명령어는?',
    a: ['SAVEPOINT', '세이브포인트', 'CHECKPOINT'],
    why: '<b>SAVEPOINT</b> 다. <code>ROLLBACK TO 저장점명</code> 으로 그 지점까지만 되돌린다. 저장점 없이 <code>ROLLBACK</code> 만 하면 <b>트랜잭션 시작 시점</b>까지 되돌아간다.',
    d: 2, y: [], tag: ['TCL', 'SAVEPOINT'], lang: null, code: null
  },


  /* ======================================================= s02 DDL — CREATE */

  {
    id: 'ch08-s02-01', ch: 8, sec: 2,
    t: 'short',
    q: '참조 무결성 옵션 중, 참조 테이블의 튜플이 삭제·변경되면 <b>관련 튜플도 함께 삭제·변경</b>되도록 하는 것은?',
    a: ['CASCADE', '캐스케이드'],
    why: '<b>CASCADE</b> 다. 나머지는 <b>NO ACTION</b>(아무 조치 안 함), <b>SET NULL</b>(NULL 로 변경), <b>SET DEFAULT</b>(기본값으로 변경) 이다.',
    d: 2, y: [2022, 2023], tag: ['CREATE', '참조무결성'], lang: null, code: null
  },

  {
    id: 'ch08-s02-02', ch: 8, sec: 2,
    t: 'code', lang: 'sql',
    code: "CREATE TABLE 회원\n    (회원번호 VARCHAR(10) NOT NULL,\n     이름     VARCHAR(20) NOT NULL,\n     등급     VARCHAR(10) DEFAULT '일반',\n     (      ㉠      )(회원번호));",
    q: '회원번호를 기본키로 지정하려 한다. ㉠ 에 들어갈 예약어를 쓰시오.',
    a: ['PRIMARY KEY', 'PRIMARYKEY'],
    why: '<b>PRIMARY KEY</b> 다. 대체키는 <b>UNIQUE</b>, 외래키는 <b>FOREIGN KEY ~ REFERENCES ~</b> 로 지정한다.',
    d: 1, y: [], tag: ['CREATE', '기본키']
  },

  {
    id: 'ch08-s02-03', ch: 8, sec: 2,
    t: 'short',
    q: 'CREATE TABLE 에서 <b>대체키</b>로 사용할 속성을 지정하는 예약어는?',
    a: ['UNIQUE', '유니크'],
    why: '<b>UNIQUE</b> 다. 중복된 값을 가질 수 없지만 <b>기본키와 달리 NULL 은 허용</b>된다.',
    d: 2, y: [], tag: ['CREATE', '대체키'], lang: null, code: null
  },

  {
    id: 'ch08-s02-04', ch: 8, sec: 2,
    t: 'ox',
    q: 'CREATE VIEW 의 서브 쿼리에는 ORDER BY 절을 사용할 수 있다.',
    a: false,
    why: '뷰 정의의 서브 쿼리에는 <b>UNION 이나 ORDER BY 절을 사용할 수 없다.</b>',
    d: 3, y: [], tag: ['CREATE', '뷰'], lang: null, code: null
  },

  {
    id: 'ch08-s02-05', ch: 8, sec: 2,
    t: 'code', lang: 'sql',
    code: 'CREATE (  ㉠  ) INDEX 회원_IDX\nON 회원(회원번호 ASC);',
    q: '중복 값을 허용하지 않는 인덱스를 만들려 한다. ㉠ 에 들어갈 예약어를 쓰시오.',
    a: ['UNIQUE', '유니크'],
    why: '<b>UNIQUE</b> 를 붙이면 중복 값을 허용하지 않고, 생략하면 허용한다. 정렬 방향을 생략하면 <b>오름차순(ASC)</b> 이 기본이다.',
    d: 2, y: [], tag: ['CREATE', '인덱스']
  },


  /* ================================================== s03 DDL — ALTER, DROP */

  {
    id: 'ch08-s03-01', ch: 8, sec: 3,
    t: 'code', lang: 'sql',
    code: 'ALTER TABLE 회원 (  ㉠  ) 가입일 DATE;',
    q: '회원 테이블에 가입일 속성을 추가하려 한다. ㉠ 에 들어갈 예약어를 쓰시오.',
    a: ['ADD', '애드'],
    why: '<b>ADD</b> 다. 속성 삭제는 <b>DROP COLUMN</b>, 기본값 변경은 <b>ALTER ~ SET DEFAULT</b> 다.',
    d: 1, y: [], tag: ['ALTER']
  },

  {
    id: 'ch08-s03-02', ch: 8, sec: 3,
    t: 'short',
    q: 'DROP 명령에서 <b>다른 개체가 제거할 요소를 참조 중이면 제거를 취소</b>하는 옵션은?',
    a: ['RESTRICT', '리스트릭트'],
    why: '<b>RESTRICT</b> 다. 반대로 <b>CASCADE</b> 는 참조하는 다른 개체까지 <b>함께 제거</b>한다.',
    d: 2, y: [], tag: ['DROP', 'RESTRICT'], lang: null, code: null
  },

  {
    id: 'ch08-s03-03', ch: 8, sec: 3,
    t: 'choice',
    q: 'DROP · TRUNCATE · DELETE 의 차이로 옳은 것은?',
    c: [
      'DROP 은 구조와 데이터를 모두 삭제, TRUNCATE 는 데이터만 삭제, DELETE 는 조건에 맞는 행만 삭제',
      'DROP 은 데이터만 삭제, TRUNCATE 는 구조까지 삭제, DELETE 는 전체 삭제',
      '셋 다 DML 이며 롤백이 가능하다',
      'TRUNCATE 는 DML 이라 롤백이 가능하다'
    ],
    a: 0,
    why: '<b>DROP</b>(DDL) 은 구조+데이터, <b>TRUNCATE</b>(DDL) 는 데이터만(롤백 불가), <b>DELETE</b>(DML) 는 조건에 맞는 행만(롤백 가능) 삭제한다.',
    d: 2, y: [], tag: ['DROP', 'TRUNCATE', 'DELETE'], lang: null, code: null
  },


  /* ============================================================== s04 DCL */

  {
    id: 'ch08-s04-01', ch: 8, sec: 4,
    t: 'code', lang: 'sql',
    code: '(  ㉠  ) SELECT ON 회원 TO 홍길동;',
    q: "사용자 '홍길동'에게 회원 테이블의 검색 권한을 부여하려 한다. ㉠ 에 들어갈 명령어를 쓰시오.",
    a: ['GRANT', '그랜트'],
    why: '<b>GRANT</b> 다. 권한을 회수할 때는 <b>REVOKE ~ FROM ~</b> 을 쓴다.',
    d: 1, y: [], tag: ['DCL', 'GRANT']
  },

  {
    id: 'ch08-s04-02', ch: 8, sec: 4,
    t: 'short',
    q: '부여받은 권한을 <b>다른 사용자에게 다시 부여할 수 있는 권한</b>까지 주는 GRANT 옵션은?',
    a: ['WITH GRANT OPTION', 'GRANT OPTION'],
    why: '<b>WITH GRANT OPTION</b> 이다. 회수할 때 <b>GRANT OPTION FOR</b> 를 쓰면 재부여 권한만 취소된다.',
    d: 3, y: [], tag: ['DCL', 'GRANT'], lang: null, code: null
  },

  {
    id: 'ch08-s04-03', ch: 8, sec: 4,
    t: 'short',
    q: '트랜잭션 처리가 정상 종료되어 <b>변경 내용을 DB 에 영구 반영</b>하는 명령어는?',
    a: ['COMMIT', '커밋'],
    why: '<b>COMMIT</b> 이다. 비정상 종료 시 변경을 취소하는 것은 <b>ROLLBACK</b> 이다.',
    d: 1, y: [], tag: ['TCL', 'COMMIT'], lang: null, code: null
  },

  {
    id: 'ch08-s04-04', ch: 8, sec: 4,
    t: 'choice',
    q: '데이터베이스 사용자 등급이 <b>아닌</b> 것은?',
    c: ['DBA', 'RESOURCE', 'CONNECT', 'PUBLIC'],
    a: 3,
    why: '사용자 등급은 <b>DBA</b>(관리자) · <b>RESOURCE</b>(DB·테이블 생성 가능) · <b>CONNECT</b>(단순 사용자) 세 가지다.',
    d: 3, y: [], tag: ['DCL', '사용자등급'], lang: null, code: null
  },


  /* ======================================= s05 DML — INSERT, DELETE, UPDATE */

  {
    id: 'ch08-s05-01', ch: 8, sec: 5,
    t: 'code', lang: 'sql',
    code: "(  ㉠  ) 회원(회원번호, 이름, 등급)\nVALUES ('M004', '최바람', '일반');",
    q: '회원 테이블에 새 튜플을 삽입하려 한다. ㉠ 에 들어갈 구문을 쓰시오.',
    a: ['INSERT INTO', 'INSERTINTO'],
    why: '<b>INSERT INTO ~ VALUES ~</b> 다. 속성명을 생략하면 <b>테이블 정의 시의 순서대로</b> 삽입된다.',
    d: 1, y: [2023], tag: ['INSERT']
  },

  {
    id: 'ch08-s05-02', ch: 8, sec: 5,
    t: 'ox',
    q: '<code>DELETE FROM 회원;</code> 을 실행하면 회원 테이블 자체가 삭제된다.',
    a: false,
    why: '모든 <b>튜플(행)</b>만 삭제되고 <b>테이블 구조는 남는다.</b> 구조까지 지우려면 <b>DROP TABLE</b> 을 써야 한다.',
    d: 2, y: [2023], tag: ['DELETE'], lang: null, code: null
  },

  {
    id: 'ch08-s05-03', ch: 8, sec: 5,
    t: 'code', lang: 'sql',
    code: "UPDATE 회원\n(  ㉠  ) 등급 = '우수'\nWHERE 회원번호 = 'M002';",
    q: '㉠ 에 들어갈 예약어를 쓰시오.',
    a: ['SET', '셋'],
    why: '<b>UPDATE ~ SET ~ WHERE ~</b> 형식이다. WHERE 를 빠뜨리면 <b>전체 튜플이 갱신</b>되므로 주의한다.',
    d: 1, y: [], tag: ['UPDATE']
  },


  /* ==================================================== s06 DML — SELECT 기본 */

  {
    id: 'ch08-s06-01', ch: 8, sec: 6,
    t: 'choice',
    q: 'SELECT 문의 <b>실행 순서</b>로 옳은 것은?',
    c: [
      'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
      'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY',
      'FROM → SELECT → WHERE → GROUP BY → HAVING → ORDER BY',
      'WHERE → FROM → GROUP BY → SELECT → HAVING → ORDER BY'
    ],
    a: 0,
    why: '작성 순서(SELECT 가 맨 앞)와 <b>실행 순서가 다르다.</b> 실행은 <b>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</b> 다.',
    d: 3, y: [], tag: ['SELECT', '실행순서'], lang: null, code: null
  },

  {
    id: 'ch08-s06-02', ch: 8, sec: 6,
    t: 'short',
    q: 'SELECT 결과에서 <b>중복된 튜플을 제거</b>하고 한 번만 표시하는 예약어는?',
    a: ['DISTINCT', '디스팅트'],
    why: '<b>DISTINCT</b> 다. 생략하면 기본값인 <b>ALL</b> 이 적용돼 모든 튜플이 나온다.',
    d: 1, y: [2022], tag: ['SELECT', 'DISTINCT'], lang: null, code: null
  },

  {
    id: 'ch08-s06-03', ch: 8, sec: 6,
    t: 'code', lang: 'sql',
    code: "SELECT * FROM 회원\nWHERE 이름 LIKE '김%';",
    q: '위 질의가 검색하는 대상을 고르시오.<br>① 이름이 정확히 「김」인 회원<br>② 이름이 「김」으로 시작하는 회원<br>③ 이름이 「김」으로 끝나는 회원<br>④ 이름에 「김」이 포함된 회원',
    a: ['2', '②'],
    why: '<b>%</b> 는 <b>임의의 문자열</b>(0자 이상)이다. <code>김%</code> 는 「김」으로 <b>시작</b>하는 값을 찾는다. <b>_</b> 는 임의의 <b>한 문자</b>다.',
    d: 2, y: [], tag: ['SELECT', 'LIKE']
  },

  {
    id: 'ch08-s06-04', ch: 8, sec: 6,
    t: 'ox',
    q: '연락처가 비어 있는 회원을 찾으려면 <code>WHERE 연락처 = NULL</code> 로 쓴다.',
    a: false,
    why: 'NULL 은 <b>비교 연산자로 판단할 수 없다.</b> 반드시 <b>IS NULL</b> / <b>IS NOT NULL</b> 을 써야 한다.',
    d: 2, y: [], tag: ['SELECT', 'NULL'], lang: null, code: null
  },


  /* ============================================= s07 DML — 그룹 함수와 그룹 검색 */

  {
    id: 'ch08-s07-01', ch: 8, sec: 7,
    t: 'short',
    q: '그룹으로 묶은 <b>후</b>의 조건을 지정하는 절은? (그룹 함수를 조건으로 쓸 수 있다)',
    a: ['HAVING', '해빙'],
    why: '<b>HAVING</b> 이다. <b>WHERE</b> 는 그룹으로 묶기 <b>전(개별 행)</b> 의 조건이라 그룹 함수를 쓸 수 없다.',
    d: 2, y: [2023], tag: ['GROUP BY', 'HAVING'], lang: null, code: null
  },

  {
    id: 'ch08-s07-02', ch: 8, sec: 7,
    t: 'ox',
    q: 'COUNT(연락처) 는 연락처가 NULL 인 행도 포함해서 센다.',
    a: false,
    why: '<b>COUNT(속성명)</b> 은 <b>NULL 을 제외</b>하고 센다. NULL 까지 포함해 전체 행을 세려면 <b>COUNT(*)</b> 를 써야 한다. SUM·AVG 도 NULL 은 계산에서 빠진다.',
    d: 3, y: [], tag: ['그룹함수', 'NULL'], lang: null, code: null
  },

  {
    id: 'ch08-s07-03', ch: 8, sec: 7,
    t: 'code', lang: 'sql',
    code: 'SELECT 등급, COUNT(*) AS 인원수\nFROM 회원\nGROUP BY 등급\nHAVING COUNT(*) >= 2;',
    q: '회원 테이블의 등급이 일반 3명, 우수 2명, 특별 1명일 때 결과로 출력되는 <b>행의 개수</b>를 쓰시오.',
    a: ['2'],
    why: '등급별로 묶으면 일반(3) · 우수(2) · 특별(1) 세 그룹이다. <code>HAVING COUNT(*) &gt;= 2</code> 로 <b>일반·우수 두 그룹만</b> 남는다.',
    d: 2, y: [], tag: ['GROUP BY', 'HAVING']
  },


  /* ========================================= s08 DML — 하위 질의와 집합 연산자 */

  {
    id: 'ch08-s08-01', ch: 8, sec: 8,
    t: 'short',
    q: '하위 질의의 결과 <b>모두를 만족</b>해야 참이 되는 연산자는?',
    a: ['ALL', '올'],
    why: '<b>ALL</b> 이다. <b>ANY(SOME)</b> 는 <b>어느 하나라도</b> 만족하면 참, <b>IN</b> 은 결과 중 하나와 일치하면 참, <b>EXISTS</b> 는 결과가 존재하면 참이다.',
    d: 2, y: [2022], tag: ['하위질의', 'ALL'], lang: null, code: null
  },

  {
    id: 'ch08-s08-02', ch: 8, sec: 8,
    t: 'short',
    q: '두 SELECT 문의 결과를 합치되 <b>중복을 제거하지 않는</b> 집합 연산자는?',
    a: ['UNION ALL', 'UNIONALL'],
    why: '<b>UNION ALL</b> 이다. <b>UNION</b> 은 중복을 제거한다. 중복 제거가 필요 없으면 정렬 비용이 없는 UNION ALL 이 더 빠르다.',
    d: 2, y: [2023], tag: ['집합연산자', 'UNION'], lang: null, code: null
  },

  {
    id: 'ch08-s08-03', ch: 8, sec: 8,
    t: 'ox',
    q: '집합 연산자를 쓰려면 두 SELECT 문의 속성 개수와 데이터 타입이 일치해야 한다.',
    a: true,
    why: '맞다. <b>속성 개수와 데이터 타입이 일치</b>해야 UNION·INTERSECT·EXCEPT 를 쓸 수 있다.',
    d: 2, y: [], tag: ['집합연산자'], lang: null, code: null
  },


  /* ========================================================= s09 DML — JOIN */

  {
    id: 'ch08-s09-01', ch: 8, sec: 9,
    t: 'short',
    q: '왼쪽 테이블의 <b>모든 행</b>을 포함하고, 오른쪽에 짝이 없으면 NULL 로 채우는 조인은?',
    a: ['LEFT OUTER JOIN', 'LEFT JOIN', '좌측 외부 조인', 'LEFTOUTERJOIN'],
    why: '<b>LEFT OUTER JOIN</b> 이다. "대출 기록이 없는 회원도 보고 싶다" 같은 경우에 쓴다.',
    d: 2, y: [], tag: ['JOIN', 'OUTER JOIN'], lang: null, code: null
  },

  {
    id: 'ch08-s09-02', ch: 8, sec: 9,
    t: 'short',
    q: 'EQUI JOIN 에서 <b>중복된 속성을 한 번만 표기</b>하는 조인 방법을 무엇이라 하는가?',
    a: ['NATURAL JOIN', '자연 조인', '자연조인', 'NATURALJOIN'],
    why: '<b>자연 조인(NATURAL JOIN)</b> 이다. 공통 속성을 자동으로 찾아 조인하고 중복 열을 하나로 합친다.',
    d: 2, y: [], tag: ['JOIN', 'NATURAL JOIN'], lang: null, code: null
  },

  {
    id: 'ch08-s09-03', ch: 8, sec: 9,
    t: 'code', lang: 'sql',
    code: 'SELECT *\nFROM 회원, 대출;',
    q: '회원 테이블이 5행, 대출 테이블이 4행일 때 결과 행의 개수를 쓰시오.',
    a: ['20'],
    why: '조인 조건이 없으면 <b>교차곱(CROSS JOIN)</b> 이 되어 모든 조합이 나온다. <b>5 × 4 = 20행</b> 이다.',
    d: 2, y: [], tag: ['JOIN', 'CROSS JOIN']
  },

  {
    id: 'ch08-s09-04', ch: 8, sec: 9,
    t: 'code', lang: 'sql',
    code: 'SELECT 회원.이름, 대출.대출일\nFROM 회원 (  ㉠  ) 대출\nON 회원.회원번호 = 대출.회원번호;',
    q: '두 테이블에서 <b>조건에 맞는 행만</b> 검색하려 한다. ㉠ 에 들어갈 조인 구문을 쓰시오.',
    a: ['INNER JOIN', 'JOIN', 'INNERJOIN'],
    why: '<b>INNER JOIN</b>(내부 조인) 이다. <code>INNER</code> 는 생략하고 <code>JOIN</code> 만 써도 된다.',
    d: 2, y: [], tag: ['JOIN', 'INNER JOIN']
  },

  {
    id: 'ch08-s09-05', ch: 8, sec: 9,
    t: 'short',
    q: '<b>같은 테이블끼리</b> 조인하는 방법으로, 별칭(Alias)을 반드시 사용해야 하는 것은?',
    a: ['SELF JOIN', '자체 조인', '자체조인', 'SELFJOIN'],
    why: '<b>SELF JOIN(자체 조인)</b> 이다. 같은 테이블을 두 번 참조하므로 구분할 별칭이 필요하다.',
    d: 2, y: [], tag: ['JOIN', 'SELF JOIN'], lang: null, code: null
  },


  /* ====================================================== s10 WINDOW 함수 */

  {
    id: 'ch08-s10-01', ch: 8, sec: 10,
    t: 'short',
    q: '동일한 값에 같은 순위를 주되 <b>그 개수만큼 다음 순위를 건너뛰는</b> 순위 함수는? (1, 2, 2, 4)',
    a: ['RANK', 'RANK()', '랭크'],
    why: '<b>RANK()</b> 다. <b>DENSE_RANK()</b> 는 건너뛰지 않아 1, 2, 2, 3 이 되고, <b>ROW_NUMBER()</b> 는 동일 값에도 다른 순위를 줘 1, 2, 3, 4 가 된다.',
    d: 2, y: [], tag: ['WINDOW함수', 'RANK'], lang: null, code: null
  },

  {
    id: 'ch08-s10-02', ch: 8, sec: 10,
    t: 'code', lang: 'sql',
    code: '누적대출수: 30, 25, 25, 20\n\nSELECT 이름,\n       DENSE_RANK() OVER (ORDER BY 누적대출수 DESC) AS 순위\nFROM 회원;',
    q: '위 데이터에 대해 출력되는 <b>순위 값을 순서대로</b> 쓰시오. (예: 1,2,3,4)',
    a: ['1,2,2,3', '1223', '1, 2, 2, 3'],
    why: '<b>DENSE_RANK</b> 는 동일 값에 같은 순위를 주고 <b>건너뛰지 않는다.</b> RANK 였다면 1, 2, 2, <b>4</b> 가 된다.',
    d: 3, y: [], tag: ['WINDOW함수', 'DENSE_RANK']
  },

  {
    id: 'ch08-s10-03', ch: 8, sec: 10,
    t: 'short',
    q: 'WINDOW 함수에서 <b>그룹으로 나눌 기준</b>을 지정하는 절은?',
    a: ['PARTITION BY', 'PARTITIONBY'],
    why: '<b>PARTITION BY</b> 다. GROUP BY 와 달리 <b>행의 개수를 줄이지 않고</b> 각 행에 집계 결과를 붙여 준다.',
    d: 2, y: [], tag: ['WINDOW함수', 'PARTITION BY'], lang: null, code: null
  },


  /* ================================================ s11 절차형 SQL — 프로시저 */

  {
    id: 'ch08-s11-01', ch: 8, sec: 11,
    t: 'short',
    q: '프로시저 구성 요소 중 <b>명칭·변수·인수·데이터 타입을 정의</b>하는 선언부는?',
    a: ['DECLARE', '디클레어'],
    why: '<b>DECLARE</b> 다. 구성은 DECLARE · BEGIN/END · CONTROL · SQL · EXCEPTION · <b>TRANSACTION</b> 이다.',
    d: 2, y: [], tag: ['프로시저'], lang: null, code: null
  },

  {
    id: 'ch08-s11-02', ch: 8, sec: 11,
    t: 'short',
    q: '프로시저 파라미터 중 <b>호출 프로그램이 값을 전달하고 다시 반환받는</b> 유형은?',
    a: ['INOUT', 'IN OUT'],
    why: '<b>INOUT</b> 이다. <b>IN</b> 은 전달만, <b>OUT</b> 은 반환만 한다.',
    d: 3, y: [], tag: ['프로시저', '파라미터'], lang: null, code: null
  },

  {
    id: 'ch08-s11-03', ch: 8, sec: 11,
    t: 'choice',
    q: '프로시저를 실행하는 명령어가 <b>아닌</b> 것은?',
    c: ['EXECUTE', 'EXEC', 'CALL', 'RETURN'],
    a: 3,
    why: '<b>RETURN</b> 은 사용자 정의 함수가 값을 돌려줄 때 쓴다. 프로시저 실행은 <b>EXECUTE · EXEC · CALL</b> 이다.',
    d: 2, y: [], tag: ['프로시저', '실행'], lang: null, code: null
  },


  /* ================================================== s12 절차형 SQL — 트리거 */

  {
    id: 'ch08-s12-01', ch: 8, sec: 12,
    t: 'short',
    q: '데이터의 삽입·갱신·삭제 <b>이벤트가 발생할 때마다 자동으로 수행</b>되는 절차형 SQL 은?',
    a: ['트리거', 'Trigger', '트리거(Trigger)'],
    why: '<b>트리거(Trigger)</b> 다. 데이터 무결성 유지, 로그 기록 등에 쓴다.',
    d: 1, y: [], tag: ['트리거'], lang: null, code: null
  },

  {
    id: 'ch08-s12-02', ch: 8, sec: 12,
    t: 'ox',
    q: '트리거 안에서는 COMMIT · ROLLBACK 같은 DCL 을 사용할 수 있다.',
    a: false,
    why: '트리거 구문에는 <b>DCL(COMMIT·ROLLBACK·GRANT·REVOKE)을 사용할 수 없다.</b> DCL 이 포함된 프로시저·함수를 호출해도 오류가 난다. 그래서 프로시저와 달리 <b>TRANSACTION 구성 요소가 없다.</b>',
    d: 3, y: [], tag: ['트리거', 'DCL'], lang: null, code: null
  },

  {
    id: 'ch08-s12-03', ch: 8, sec: 12,
    t: 'code', lang: 'sql',
    code: 'CREATE OR REPLACE TRIGGER 대출증가\n(  ㉠  ) INSERT ON 대출\nREFERENCING (  ㉡  ) AS 신규\nFOR EACH ROW\nBEGIN\n    UPDATE 회원 SET 누적대출수 = 누적대출수 + 1\n    WHERE 회원번호 = :신규.회원번호;\nEND;',
    q: '대출이 삽입된 <b>직후</b> 실행되며, <b>새로 추가된</b> 데이터를 참조하려 한다. ㉠·㉡ 에 들어갈 예약어를 쓰시오.',
    a: ['AFTER NEW', 'AFTER, NEW', 'AFTER NEW '],
    why: '동작 시기는 <b>AFTER</b>(조작 후) / BEFORE(조작 전), 참조 별칭은 <b>NEW</b>(새로 추가·변경될 데이터) / OLD(변경·삭제 전 데이터) 다.',
    d: 3, y: [], tag: ['트리거', 'NEW/OLD']
  },

  {
    id: 'ch08-s12-04', ch: 8, sec: 12,
    t: 'short',
    q: '트리거를 <b>각 행마다</b> 적용하도록 지정하는 구문은?',
    a: ['FOR EACH ROW', 'FOREACHROW'],
    why: '<b>FOR EACH ROW</b> 다. 생략하면 문장 단위로 한 번만 실행된다.',
    d: 3, y: [], tag: ['트리거'], lang: null, code: null
  },


  /* ========================================== s13 절차형 SQL — 사용자 정의 함수 */

  {
    id: 'ch08-s13-01', ch: 8, sec: 13,
    t: 'short',
    q: '사용자 정의 함수가 프로시저와 결정적으로 다른 점은, 종료 시 <b>반드시 무엇을 해야</b> 한다는 것인가?',
    a: ['RETURN', '반환값', '값을 반환', '리턴'],
    why: '사용자 정의 함수는 <b>반드시 하나의 값을 RETURN</b> 해야 한다. 프로시저는 반환값이 없거나 OUT 으로 여러 개를 넘길 수 있다.',
    d: 2, y: [], tag: ['사용자정의함수', 'RETURN'], lang: null, code: null
  },

  {
    id: 'ch08-s13-02', ch: 8, sec: 13,
    t: 'choice',
    q: '프로시저와 사용자 정의 함수의 비교로 <b>틀린</b> 것은?',
    c: [
      '함수는 반드시 하나의 값을 반환한다',
      '함수는 SELECT 등 SQL 문 안에서 직접 호출할 수 있다',
      '프로시저는 EXECUTE · CALL 로 실행한다',
      '함수는 프로시저와 달리 DML 을 자유롭게 사용할 수 있다'
    ],
    a: 3,
    why: '거꾸로다. <b>사용자 정의 함수는 DML 사용이 제한</b>된다. DML 을 자유롭게 쓸 수 있는 쪽은 프로시저다.',
    d: 3, y: [], tag: ['사용자정의함수', '프로시저'], lang: null, code: null
  },

  {
    id: 'ch08-s13-03', ch: 8, sec: 13,
    t: 'short',
    q: '사용자 정의 함수의 구성 요소 중, 프로시저의 <b>TRANSACTION 자리에 대신 들어가는</b> 것은?',
    a: ['RETURN', '리턴'],
    why: '함수 구성은 DECLARE · BEGIN/END · CONTROL · SQL · EXCEPTION · <b>RETURN</b> 이다.',
    d: 3, y: [], tag: ['사용자정의함수'], lang: null, code: null
  },


  /* ===================================================== s14 제어문과 커서 */

  {
    id: 'ch08-s14-01', ch: 8, sec: 14,
    t: 'choice',
    q: '커서(Cursor)의 수행 순서로 옳은 것은?',
    c: ['OPEN → FETCH → CLOSE', 'DECLARE → OPEN → CLOSE', 'FETCH → OPEN → CLOSE', 'OPEN → CLOSE → FETCH'],
    a: 0,
    why: '<b>OPEN</b>(쿼리 실행 후 결과 저장) → <b>FETCH</b>(한 행씩 읽음) → <b>CLOSE</b>(메모리 해제) 순이다.',
    d: 2, y: [], tag: ['커서'], lang: null, code: null
  },

  {
    id: 'ch08-s14-02', ch: 8, sec: 14,
    t: 'short',
    q: '<b>사용자가 직접 정의해서 사용</b>하며, 주로 여러 개의 행을 처리할 때 쓰는 커서는?',
    a: ['명시적 커서', '명시적', 'Explicit Cursor', 'Explicit'],
    why: '<b>명시적 커서</b> 다. <b>묵시적 커서</b> 는 DBMS 가 자동으로 생성하며, 속성 조회로 직전 SQL 의 결과를 알 수 있다.',
    d: 2, y: [], tag: ['커서'], lang: null, code: null
  },

  {
    id: 'ch08-s14-03', ch: 8, sec: 14,
    t: 'short',
    q: '묵시적 커서 속성 중 직전 SQL 로 <b>영향을 받은 행의 수</b>를 돌려주는 것은?',
    a: ['SQL%ROWCOUNT', 'ROWCOUNT', 'SQL % ROWCOUNT'],
    why: '<b>SQL%ROWCOUNT</b> 다. 나머지는 <b>SQL%FOUND</b>(1행 이상이면 TRUE) · <b>SQL%NOTFOUND</b>(0행이면 TRUE) · <b>SQL%ISOPEN</b> 이다.',
    d: 3, y: [], tag: ['커서', '묵시적커서'], lang: null, code: null
  },


  /* ============================================== s15 DBMS 접속과 동적 SQL */

  {
    id: 'ch08-s15-01', ch: 8, sec: 15,
    t: 'short',
    q: '<b>개발 언어에 관계없이</b> 데이터베이스에 접근할 수 있는, 마이크로소프트가 개발한 표준 개방형 API 는?',
    a: ['ODBC', '오디비씨'],
    why: '<b>ODBC</b> 다. <b>JDBC</b> 는 <b>Java 전용</b> 표준 API 이고, <b>MyBatis</b> 는 JDBC 코드를 단순화한 SQL Mapping 프레임워크다.',
    d: 2, y: [], tag: ['DBMS접속', 'ODBC'], lang: null, code: null
  },

  {
    id: 'ch08-s15-02', ch: 8, sec: 15,
    t: 'ox',
    q: '동적 SQL 은 정적 SQL 보다 실행 성능이 빠르고 SQL 삽입 공격에도 안전하다.',
    a: false,
    why: '반대다. <b>동적 SQL</b> 은 실행 시점에 구문을 만들어 <b>성능이 느리고 SQL 삽입 공격에 취약</b>하다. 대신 사용자 입력을 유연하게 받을 수 있다.',
    d: 3, y: [], tag: ['동적SQL'], lang: null, code: null
  },


  /* ===================================================== s16 SQL 테스트와 ORM */

  {
    id: 'ch08-s16-01', ch: 8, sec: 16,
    t: 'short',
    q: '<b>객체와 관계형 데이터베이스의 데이터를 자동으로 매핑</b>해 주는 기술을 무엇이라 하는가?',
    a: ['ORM', 'Object-Relational Mapping', '객체 관계 매핑'],
    why: '<b>ORM(Object-Relational Mapping)</b> 이다. Java 의 <b>Hibernate·JPA</b> 가 대표적이다. SQL 을 직접 쓰지 않고 객체로 데이터를 다룬다.',
    d: 1, y: [], tag: ['ORM'], lang: null, code: null
  },

  {
    id: 'ch08-s16-02', ch: 8, sec: 16,
    t: 'choice',
    q: 'ORM 의 한계로 보기 <b>어려운</b> 것은?',
    c: ['자동 생성 SQL 이 최적화되지 않아 성능이 저하될 수 있다', '복잡한 쿼리를 표현하기 어렵다', '대량 데이터 처리에 부적합할 수 있다', '개발자가 SQL 을 반드시 알아야만 쓸 수 있다'],
    a: 3,
    why: 'ORM 은 오히려 <b>SQL 을 몰라도 데이터베이스를 다룰 수 있게</b> 해 주는 기술이다. 나머지 셋은 실제 한계가 맞다.',
    d: 2, y: [], tag: ['ORM'], lang: null, code: null
  },


  /* ==================================================== s17 쿼리 성능 최적화 */

  {
    id: 'ch08-s17-01', ch: 8, sec: 17,
    t: 'short',
    q: '테이블·인덱스의 <b>통계 정보를 바탕으로 비용을 계산</b>해 실행 계획을 선택하는 옵티마이저는?',
    a: ['비용 기반 옵티마이저', 'CBO', 'Cost Based Optimizer', '비용기반'],
    why: '<b>비용 기반 옵티마이저(CBO)</b> 다. 현대 DBMS 의 기본이다. <b>규칙 기반(RBO)</b> 은 미리 정해진 우선순위에 따른다.',
    d: 2, y: [], tag: ['옵티마이저'], lang: null, code: null
  },

  {
    id: 'ch08-s17-02', ch: 8, sec: 17,
    t: 'short',
    q: '옵티마이저가 수립한 SQL 의 <b>실행 절차와 방법을 확인</b>하는 명령어는?',
    a: ['EXPLAIN PLAN', 'EXPLAIN', 'EXPLAINPLAN'],
    why: '<b>EXPLAIN PLAN</b> 이다. 조인 순서·조인 기법·액세스 기법 등이 표시된다.',
    d: 3, y: [], tag: ['실행계획'], lang: null, code: null
  }
,

  /* ======================================================================
     🚨 T46 4절 — SQL 코드 문항 (2026-08-17)

     SQL 이 12문항(1.7%)뿐이었다. 실제는 회차당 2.5문항(9%)이고 최근 15% 로 느는 중이다.
     📌 **실제는 「결과값」을 묻는다.** 표를 주고 질의를 던져 몇 행·무슨 값이 나오는지 쓴다.
        → exam-archive/README.md 2장

     🔒 표는 문항 안에 함께 준다 — 본문 예제(회원·도서)의 결을 따르되 값은 새로 짠다.
     ====================================================================== */

  {
    id: 'ch08-s06-05', ch: 8, sec: 6,
    t: 'code', lang: 'sql',
    code: '[회원]\n'
        + '이름   | 등급   | 대출수\n'
        + '-------+--------+------\n'
        + '김하늘 | 일반   | 3\n'
        + '이바다 | 우수   | 7\n'
        + '박구름 | 일반   | NULL\n'
        + '최나무 | 우수   | 5\n'
        + '정보람 | 일반   | 2\n'
        + '\n'
        + 'SELECT COUNT(*), COUNT(대출수)\n'
        + 'FROM 회원;',
    q: '위 SQL 의 실행 결과를 쓰시오. (예: 3, 2)',
    a: ['5, 4', '5,4', '5 4'],
    why: '🚨 <b>COUNT(*) 는 NULL 을 포함해 세고, COUNT(속성명) 은 NULL 을 뺀다.</b> '
       + '전체 5행이지만 대출수가 NULL 인 박구름이 빠져 <b>4</b> 다.',
    d: 2, y: [], tag: ['COUNT', 'NULL', '그룹함수']
  },

  {
    id: 'ch08-s07-04', ch: 8, sec: 7,
    t: 'code', lang: 'sql',
    code: '[회원]\n'
        + '이름   | 등급 | 대출수\n'
        + '-------+------+------\n'
        + '김하늘 | 일반 | 3\n'
        + '이바다 | 우수 | 7\n'
        + '박구름 | 일반 | 1\n'
        + '최나무 | 우수 | 5\n'
        + '정보람 | 일반 | 2\n'
        + '\n'
        + 'SELECT 등급, SUM(대출수)\n'
        + 'FROM 회원\n'
        + 'GROUP BY 등급\n'
        + 'HAVING COUNT(*) >= 3;',
    q: '위 SQL 의 실행 결과로 나오는 <b>행 수</b>와 <b>SUM(대출수)</b> 값을 쓰시오. (예: 2, 10)',
    a: ['1, 6', '1,6', '1 6'],
    why: '일반 3명(3+1+2=6) · 우수 2명. <code>HAVING COUNT(*) &gt;= 3</code> 이 <b>그룹으로 묶은 뒤</b> '
       + '거르므로 <b>일반 그룹 한 행</b>만 남는다.',
    d: 3, y: [], tag: ['GROUP BY', 'HAVING', 'SUM']
  },

  {
    id: 'ch08-s07-05', ch: 8, sec: 7,
    t: 'code', lang: 'sql',
    code: '[성적]\n'
        + '학번 | 과목 | 점수\n'
        + '-----+------+-----\n'
        + '101  | DB   | 90\n'
        + '101  | OS   | 70\n'
        + '102  | DB   | 60\n'
        + '102  | OS   | 80\n'
        + '103  | DB   | 100\n'
        + '\n'
        + 'SELECT 과목, AVG(점수)\n'
        + 'FROM 성적\n'
        + 'WHERE 점수 >= 70\n'
        + 'GROUP BY 과목;',
    q: 'DB 과목의 <b>AVG(점수)</b> 값을 쓰시오.',
    a: ['95'],
    why: '🚨 <code>WHERE</code> 는 <b>묶기 전</b>에 거른다. DB 의 60점이 먼저 빠져 '
       + '(90+100)÷2=<b>95</b> 다. <code>HAVING</code> 이었다면 평균이 83.3 이 된다.',
    d: 3, y: [], tag: ['WHERE', 'GROUP BY', 'AVG']
  },

  {
    id: 'ch08-s08-04', ch: 8, sec: 8,
    t: 'code', lang: 'sql',
    code: '[A]        [B]\n'
        + '값         값\n'
        + '---        ---\n'
        + '1          2\n'
        + '2          3\n'
        + '3          4\n'
        + '3\n'
        + '\n'
        + 'SELECT 값 FROM A\n'
        + 'UNION\n'
        + 'SELECT 값 FROM B;',
    q: '위 SQL 의 결과 <b>행 수</b>를 쓰시오.',
    a: ['4'],
    why: '<b>UNION 은 중복을 제거</b>한다. A(1,2,3,3) ∪ B(2,3,4) 를 합쳐 <b>1,2,3,4</b> 네 행이다. '
       + '<code>UNION ALL</code> 이었다면 7행이다.',
    d: 2, y: [], tag: ['UNION', '집합연산자']
  },

  {
    id: 'ch08-s08-05', ch: 8, sec: 8,
    t: 'code', lang: 'sql',
    code: '[회원]\n'
        + '이름   | 대출수\n'
        + '-------+------\n'
        + '김하늘 | 3\n'
        + '이바다 | 7\n'
        + '박구름 | 1\n'
        + '최나무 | 5\n'
        + '\n'
        + 'SELECT 이름\n'
        + 'FROM 회원\n'
        + 'WHERE 대출수 > (SELECT AVG(대출수) FROM 회원);',
    q: '위 SQL 의 결과에 나오는 이름을 모두 쓰시오. (쉼표로 구분)',
    a: ['이바다, 최나무', '이바다,최나무', '이바다 최나무'],
    why: '평균은 (3+7+1+5)÷4=<b>4</b> 다. 4보다 큰 것은 7(이바다)과 5(최나무)다. '
       + '<b>하위 질의를 먼저 수행</b>해 그 값을 조건에 쓴다.',
    d: 3, y: [], tag: ['하위질의', 'AVG']
  },

  {
    id: 'ch08-s09-06', ch: 8, sec: 9,
    t: 'code', lang: 'sql',
    code: '[학생]              [학과]\n'
        + '학번 | 이름 | 학과코드   학과코드 | 학과명\n'
        + '-----+------+---------   ---------+-------\n'
        + '1    | 김   | A          A        | 컴퓨터\n'
        + '2    | 이   | B          B        | 전자\n'
        + '3    | 박   | NULL       C        | 기계\n'
        + '\n'
        + 'SELECT COUNT(*)\n'
        + 'FROM 학생 S INNER JOIN 학과 D\n'
        + '  ON S.학과코드 = D.학과코드;',
    q: '위 SQL 의 결과값을 쓰시오.',
    a: ['2'],
    why: '<b>INNER JOIN 은 양쪽에 다 있는 것만</b> 남긴다. 학과코드가 NULL 인 박은 짝이 없고, '
       + '학과 C 도 학생이 없다. 남는 것은 <b>2행</b>이다.',
    d: 3, y: [], tag: ['JOIN', 'INNER JOIN', 'NULL']
  },

  {
    id: 'ch08-s09-07', ch: 8, sec: 9,
    t: 'code', lang: 'sql',
    code: '[학생]              [학과]\n'
        + '학번 | 이름 | 학과코드   학과코드 | 학과명\n'
        + '-----+------+---------   ---------+-------\n'
        + '1    | 김   | A          A        | 컴퓨터\n'
        + '2    | 이   | B          B        | 전자\n'
        + '3    | 박   | NULL       C        | 기계\n'
        + '\n'
        + 'SELECT COUNT(*)\n'
        + 'FROM 학생 S LEFT OUTER JOIN 학과 D\n'
        + '  ON S.학과코드 = D.학과코드;',
    q: '위 SQL 의 결과값을 쓰시오.',
    a: ['3'],
    why: '<b>LEFT OUTER JOIN 은 왼쪽 표를 모두 남긴다.</b> 짝이 없는 박도 학과 쪽을 '
       + 'NULL 로 채워 남으므로 <b>3행</b>이다. 오른쪽에만 있는 기계과는 안 나온다.',
    d: 3, y: [], tag: ['JOIN', 'OUTER JOIN']
  },

  {
    id: 'ch08-s06-06', ch: 8, sec: 6,
    t: 'code', lang: 'sql',
    code: '[도서]\n'
        + '도서명       | 가격\n'
        + '-------------+------\n'
        + '자료구조     | 25000\n'
        + '운영체제     | 30000\n'
        + '데이터베이스 | 28000\n'
        + '네트워크     | 22000\n'
        + '\n'
        + 'SELECT 도서명\n'
        + 'FROM 도서\n'
        + 'WHERE 가격 BETWEEN 25000 AND 30000\n'
        + 'ORDER BY 가격 DESC;',
    q: '결과의 <b>첫 번째 행</b>에 오는 도서명과 <b>전체 행 수</b>를 쓰시오. (예: 도서명, 2)',
    a: ['운영체제, 3', '운영체제,3', '운영체제 3'],
    why: '🚨 <code>BETWEEN</code> 은 <b>양 끝을 포함</b>한다(25000·30000 포함) — 세 권이 걸린다. '
       + '<code>DESC</code> 라 가장 비싼 <b>운영체제</b>가 맨 앞이다.',
    d: 2, y: [], tag: ['BETWEEN', 'ORDER BY']
  },

  {
    id: 'ch08-s06-07', ch: 8, sec: 6,
    t: 'code', lang: 'sql',
    code: '[회원]\n'
        + '이름\n'
        + '------\n'
        + '김하늘\n'
        + '김바다\n'
        + '이하늘\n'
        + '박구름\n'
        + '\n'
        + "SELECT COUNT(*) FROM 회원 WHERE 이름 LIKE '김%';\n"
        + "SELECT COUNT(*) FROM 회원 WHERE 이름 LIKE '_하늘';",
    q: '두 SQL 의 결과값을 차례로 쓰시오. (예: 1, 1)',
    a: ['2, 2', '2,2', '2 2'],
    why: '<code>%</code> 는 <b>여러 글자</b>, <code>_</code> 는 <b>한 글자</b>다. '
       + '<code>김%</code> 는 김하늘·김바다 <b>2</b>개, <code>_하늘</code> 은 '
       + '김하늘·이하늘 <b>2</b>개다.',
    d: 2, y: [], tag: ['LIKE', '와일드카드']
  },

  {
    id: 'ch08-s05-04', ch: 8, sec: 5,
    t: 'code', lang: 'sql',
    code: '[재고]\n'
        + '품번 | 수량\n'
        + '-----+-----\n'
        + '1    | 10\n'
        + '2    | 5\n'
        + '3    | 20\n'
        + '\n'
        + 'UPDATE 재고\n'
        + 'SET 수량 = 수량 * 2\n'
        + 'WHERE 수량 < 15;\n'
        + '\n'
        + 'SELECT SUM(수량) FROM 재고;',
    q: '위 SQL 을 차례로 실행한 뒤 <b>SUM(수량)</b> 값을 쓰시오.',
    a: ['50'],
    why: '15 미만인 품번 1(10→20)과 2(5→10)만 두 배가 된다. 20+10+20=<b>50</b> 이다.',
    d: 2, y: [], tag: ['UPDATE', 'SUM']
  },

  {
    id: 'ch08-s05-05', ch: 8, sec: 5,
    t: 'code', lang: 'sql',
    code: '[사원]\n'
        + '사번 | 부서 | 급여\n'
        + '-----+------+------\n'
        + '1    | 영업 | 300\n'
        + '2    | 개발 | 500\n'
        + '3    | 영업 | 400\n'
        + '4    | 개발 | 200\n'
        + '\n'
        + "DELETE FROM 사원 WHERE 부서 = '영업';\n"
        + '\n'
        + 'SELECT COUNT(*), MAX(급여) FROM 사원;',
    q: '위 SQL 을 차례로 실행한 결과를 쓰시오. (예: 3, 500)',
    a: ['2, 500', '2,500', '2 500'],
    why: '영업 두 행이 지워져 개발만 남는다 — <b>2</b>행이고 최고 급여는 <b>500</b> 이다. '
       + '🚨 <code>DELETE</code> 는 <b>행</b>을 지우는 것이고 표 자체는 남는다.',
    d: 2, y: [], tag: ['DELETE', 'COUNT', 'MAX']
  },

  {
    id: 'ch08-s10-04', ch: 8, sec: 10,
    t: 'code', lang: 'sql',
    code: '[점수]\n'
        + '이름 | 점수\n'
        + '-----+-----\n'
        + '김   | 90\n'
        + '이   | 80\n'
        + '박   | 80\n'
        + '최   | 70\n'
        + '\n'
        + 'SELECT 이름,\n'
        + '       RANK() OVER (ORDER BY 점수 DESC) AS R,\n'
        + '       DENSE_RANK() OVER (ORDER BY 점수 DESC) AS D\n'
        + 'FROM 점수;',
    q: '<b>최</b> 의 R 과 D 값을 차례로 쓰시오. (예: 3, 3)',
    a: ['4, 3', '4,3', '4 3'],
    why: '🚨 <b>RANK 는 동점 다음 순위를 건너뛰고 DENSE_RANK 는 건너뛰지 않는다.</b> '
       + '80점 둘이 공동 2위라 RANK 는 1,2,2,<b>4</b> · DENSE_RANK 는 1,2,2,<b>3</b> 이다.',
    d: 3, y: [], tag: ['WINDOW함수', 'RANK', 'DENSE_RANK']
  },

  {
    id: 'ch08-s04-05', ch: 8, sec: 4,
    t: 'code', lang: 'sql',
    code: 'GRANT SELECT, UPDATE ON 회원 TO 홍길동 WITH GRANT OPTION;\n'
        + '\n'
        + '-- 홍길동이 다음을 실행\n'
        + 'GRANT SELECT ON 회원 TO 김철수;\n'
        + '\n'
        + '-- 관리자가 다음을 실행\n'
        + 'REVOKE UPDATE ON 회원 FROM 홍길동;',
    q: '위 실행 뒤 <b>홍길동</b>이 회원 테이블에 대해 가진 권한을 쓰시오.',
    a: ['SELECT'],
    why: '<code>WITH GRANT OPTION</code> 은 <b>받은 권한을 남에게 다시 줄 수 있게</b> 한다. '
       + '뒤에 UPDATE 만 회수했으므로 <b>SELECT</b> 가 남는다.',
    d: 3, y: [], tag: ['DCL', 'GRANT', 'REVOKE']
  },

  {
    id: 'ch08-s03-04', ch: 8, sec: 3,
    t: 'code', lang: 'sql',
    code: 'ALTER TABLE 회원 ADD 전화번호 VARCHAR(20);\n'
        + 'ALTER TABLE 회원 ALTER 등급 SET DEFAULT \'일반\';\n'
        + 'ALTER TABLE 회원 DROP COLUMN 주소;',
    q: '위 세 문장이 하는 일을 차례로 쓰시오. — 속성 (㉠), 기본값 (㉡), 속성 (㉢)',
    parts: [
      { label: '㉠', a: ['추가', 'ADD'] },
      { label: '㉡', a: ['설정', '지정', 'SET'] },
      { label: '㉢', a: ['삭제', '제거', 'DROP'] }
    ],
    why: '<code>ALTER</code> 는 표의 <b>구조</b>를 바꾼다 — <b>ADD</b> 추가 · '
       + '<b>ALTER ~ SET DEFAULT</b> 기본값 설정 · <b>DROP COLUMN</b> 삭제.',
    d: 2, y: [], tag: ['ALTER', 'DDL']
  },

  {
    id: 'ch08-s06-08', ch: 8, sec: 6,
    t: 'code', lang: 'sql',
    code: '[주문]\n'
        + '주문번호 | 고객 | 금액\n'
        + '---------+------+------\n'
        + '1        | 김   | 1000\n'
        + '2        | 이   | 2000\n'
        + '3        | 김   | 1500\n'
        + '4        | 박   | 3000\n'
        + '5        | 이   | 500\n'
        + '\n'
        + 'SELECT DISTINCT 고객\n'
        + 'FROM 주문\n'
        + 'WHERE 금액 >= 1000;',
    q: '위 SQL 의 결과 <b>행 수</b>를 쓰시오.',
    a: ['3'],
    why: '1000 이상인 주문은 1·2·3·4 네 건이고 고객은 김·이·김·박이다. '
       + '<b>DISTINCT 가 중복을 지워</b> 김·이·박 <b>3행</b>이 된다.',
    d: 2, y: [], tag: ['DISTINCT', 'WHERE']
  },

  {
    id: 'ch08-s08-06', ch: 8, sec: 8,
    t: 'code', lang: 'sql',
    code: '[사원]              [부서]\n'
        + '이름 | 부서코드      부서코드 | 부서명\n'
        + '-----+---------      ---------+-------\n'
        + '김   | 10            10       | 영업\n'
        + '이   | 20            20       | 개발\n'
        + '박   | 10            30       | 총무\n'
        + '\n'
        + 'SELECT 부서명\n'
        + 'FROM 부서\n'
        + 'WHERE 부서코드 IN (SELECT 부서코드 FROM 사원);',
    q: '위 SQL 의 결과에 나오는 부서명을 모두 쓰시오. (쉼표로 구분)',
    a: ['영업, 개발', '영업,개발', '영업 개발'],
    why: '하위 질의가 사원의 부서코드 <b>10, 20</b> 을 내놓는다. '
       + '<code>IN</code> 은 그중 하나와 같은 행을 고르므로 <b>영업·개발</b>이다. '
       + '사원이 없는 총무는 빠진다.',
    d: 3, y: [], tag: ['하위질의', 'IN']
  },

  {
    id: 'ch08-s07-06', ch: 8, sec: 7,
    t: 'code', lang: 'sql',
    code: '[판매]\n'
        + '지점 | 품목 | 수량\n'
        + '-----+------+-----\n'
        + '서울 | A    | 10\n'
        + '서울 | B    | 20\n'
        + '부산 | A    | 30\n'
        + '\n'
        + 'SELECT 지점, SUM(수량)\n'
        + 'FROM 판매\n'
        + 'GROUP BY ROLLUP(지점);',
    q: '위 SQL 의 결과 <b>행 수</b>를 쓰시오.',
    a: ['3'],
    why: '<b>ROLLUP 은 그룹별 소계에 전체 합계를 한 줄 더한다.</b> '
       + '서울 30 · 부산 30 · <b>전체 60</b> 으로 <b>3행</b>이다.',
    d: 3, y: [], tag: ['ROLLUP', 'GROUP BY']
  },

  {
    id: 'ch08-s11-04', ch: 8, sec: 11,
    t: 'code', lang: 'sql',
    code: 'CREATE PROCEDURE 대출증가(IN 번호 VARCHAR(10))\n'
        + 'BEGIN\n'
        + '    DECLARE 현재 INT;\n'
        + '    SELECT 대출수 INTO 현재 FROM 회원 WHERE 회원번호 = 번호;\n'
        + '    IF 현재 < 5 THEN\n'
        + '        UPDATE 회원 SET 대출수 = 대출수 + 1 WHERE 회원번호 = 번호;\n'
        + '    END IF;\n'
        + '    ( ㉠ );\n'
        + 'END;',
    q: '변경 내용을 데이터베이스에 <b>확정</b>하려 한다. ㉠ 에 들어갈 명령어를 쓰시오.',
    a: ['COMMIT'],
    why: '<b>COMMIT</b> 이다. 되돌리는 것은 <b>ROLLBACK</b>, 되돌릴 지점을 잡아 두는 것은 '
       + '<b>SAVEPOINT</b> 다 — 셋을 묶어 <b>TCL</b> 이라 한다.',
    d: 2, y: [], tag: ['프로시저', 'TCL', 'COMMIT']
  },

  {
    id: 'ch08-s12-05', ch: 8, sec: 12,
    t: 'code', lang: 'sql',
    code: 'CREATE TRIGGER 대출로그\n'
        + '( ㉠ ) INSERT ON 대출\n'
        + 'FOR EACH ROW\n'
        + 'BEGIN\n'
        + '    INSERT INTO 로그(내용, 시각)\n'
        + '    VALUES (CONCAT(\'대출 \', ( ㉡ ).회원번호), NOW());\n'
        + 'END;',
    q: '삽입이 <b>끝난 뒤</b>에 동작하고 <b>새로 들어온 행</b>을 참조하려 한다. ㉠·㉡ 을 쓰시오.',
    parts: [
      { label: '㉠', a: ['AFTER'] },
      { label: '㉡', a: ['NEW'] }
    ],
    why: '<b>AFTER</b> 는 이벤트 뒤, <b>BEFORE</b> 는 앞이다. '
       + '<b>NEW</b> 는 새로 들어온 값, <b>OLD</b> 는 바뀌기 전 값을 가리킨다.',
    d: 3, y: [], tag: ['트리거', 'AFTER', 'NEW']
  },

  {
    id: 'ch08-s06-09', ch: 8, sec: 6,
    t: 'code', lang: 'sql',
    code: '[회원]\n'
        + '이름   | 등급 | 비고\n'
        + '-------+------+------\n'
        + '김하늘 | 일반 | NULL\n'
        + '이바다 | 우수 | 우수\n'
        + '박구름 | 일반 | NULL\n'
        + '\n'
        + 'SELECT COUNT(*) FROM 회원 WHERE 비고 IS NULL;\n'
        + 'SELECT COUNT(*) FROM 회원 WHERE 비고 = NULL;',
    q: '두 SQL 의 결과값을 차례로 쓰시오. (예: 1, 1)',
    a: ['2, 0', '2,0', '2 0'],
    why: '🚨 <b>NULL 은 = 로 비교할 수 없다.</b> 값이 아니라 「없음」이라 '
       + '<code>= NULL</code> 은 참이 되는 행이 하나도 없어 <b>0</b> 이다. '
       + '반드시 <code>IS NULL</code> 을 쓴다.',
    d: 3, y: [], tag: ['NULL', 'IS NULL']
  },


  /* ===== T46 2차 — SQL 코드 문항 28 (32 → 60, 목표 달성) ===== */

  {
    id: 'ch08-s02-06', ch: 8, sec: 2,
    t: 'code', lang: 'sql',
    code: 'CREATE TABLE 대출\n'
        + '    (대출번호 VARCHAR(10) NOT NULL,\n'
        + '     회원번호 VARCHAR(10),\n'
        + '     대출일   DATE,\n'
        + '     ( ㉠ ) KEY(대출번호),\n'
        + '     ( ㉡ ) KEY(회원번호) ( ㉢ ) 회원(회원번호)\n'
        + '        ON DELETE CASCADE);',
    q: '대출번호를 <b>기본키</b>로, 회원번호를 회원 테이블을 <b>참조하는 외래키</b>로 지정하려 한다. ㉠~㉢ 에 들어갈 예약어를 쓰시오.',
    parts: [
      { label: '㉠', a: ['PRIMARY'] },
      { label: '㉡', a: ['FOREIGN'] },
      { label: '㉢', a: ['REFERENCES'] }
    ],
    why: '<b>PRIMARY KEY</b> 가 기본키, <b>FOREIGN KEY ~ REFERENCES ~</b> 가 외래키다. '
       + '<code>ON DELETE CASCADE</code> 는 참조하던 회원이 지워지면 <b>그 회원의 대출 기록도 함께 지운다.</b> '
       + '아무것도 하지 않으려면 <b>NO ACTION</b>, NULL 로 바꾸려면 <b>SET NULL</b> 이다.',
    d: 2, y: [], tag: ['CREATE', '외래키', '참조무결성']
  },

  {
    id: 'ch08-s02-07', ch: 8, sec: 2,
    t: 'code', lang: 'sql',
    code: 'CREATE ( ㉠ ) 우수회원(회원번호, 이름)\n'
        + '( ㉡ ) SELECT 회원번호, 이름\n'
        + '   FROM 회원\n'
        + '   WHERE 등급 = \'우수\';',
    q: '등급이 우수인 회원만 보여 주는 <b>가상 테이블</b>을 만들려 한다. ㉠·㉡ 에 들어갈 예약어를 쓰시오.',
    parts: [
      { label: '㉠', a: ['VIEW', '뷰'] },
      { label: '㉡', a: ['AS'] }
    ],
    why: '<b>CREATE VIEW ~ AS SELECT문</b> 이다. <b>AS 절의 SELECT 문이 곧 뷰의 정의</b>가 된다. '
       + '🚨 그 서브 쿼리에는 <b>UNION 과 ORDER BY 를 쓸 수 없다.</b> '
       + '속성명을 안 적으면 SELECT 문의 속성명이 그대로 쓰인다.',
    d: 2, y: [], tag: ['CREATE', '뷰']
  },

  {
    id: 'ch08-s02-08', ch: 8, sec: 2,
    t: 'code', lang: 'sql',
    code: 'CREATE ( ㉠ ) INDEX 회원_IDX\n'
        + 'ON 회원(회원번호 ( ㉡ ));',
    q: '<b>중복 값을 허용하지 않고</b> 회원번호를 <b>오름차순</b>으로 정렬하는 인덱스를 만들려 한다. ㉠·㉡ 에 들어갈 예약어를 쓰시오.',
    parts: [
      { label: '㉠', a: ['UNIQUE'] },
      { label: '㉡', a: ['ASC'] }
    ],
    why: '<b>UNIQUE</b> 를 빼면 중복 값을 허용한다. 정렬은 <b>ASC</b>(오름차순) · <b>DESC</b>(내림차순)이고 '
       + '생략하면 오름차순이다. 뒤에 <b>CLUSTER</b> 를 붙이면 그 속성 기준으로 레코드를 묶는다.',
    d: 2, y: [], tag: ['CREATE', '인덱스']
  },

  {
    id: 'ch08-s03-05', ch: 8, sec: 3,
    t: 'code', lang: 'sql',
    code: '-- 뷰 \'우수회원\' 이 테이블 \'회원\' 을 참조하고 있다.\n'
        + '\n'
        + 'DROP TABLE 회원 ( ㉠ );   -- 뷰까지 함께 지운다\n'
        + 'DROP TABLE 회원 ( ㉡ );   -- 참조 중이므로 취소된다',
    q: '㉠·㉡ 에 들어갈 옵션을 쓰시오.',
    parts: [
      { label: '㉠', a: ['CASCADE'] },
      { label: '㉡', a: ['RESTRICT'] }
    ],
    why: '🚨 <b>CASCADE = 참조하는 것까지 같이 삭제</b>, <b>RESTRICT = 참조 중이면 삭제를 취소</b>. '
       + '둘 다 참조 무결성을 지키려는 것인데 <b>방향이 반대다.</b>',
    d: 2, y: [], tag: ['DROP', 'CASCADE', 'RESTRICT']
  },

  {
    id: 'ch08-s04-06', ch: 8, sec: 4,
    t: 'code', lang: 'sql',
    code: 'GRANT UPDATE ON 회원 TO 홍길동 ( ㉠ );\n'
        + '\n'
        + 'REVOKE ( ㉡ ) UPDATE ON 회원 FROM 홍길동;',
    q: '홍길동에게 갱신 권한을 주면서 <b>그 권한을 남에게 다시 줄 수 있게</b> 하려면 ㉠, 나중에 그 <b>「남에게 줄 수 있는 권한」만</b> 거두려면 ㉡ 에 무엇을 쓰는가?',
    parts: [
      { label: '㉠', a: ['WITH GRANT OPTION', 'WITH GRANT OPTION;'] },
      { label: '㉡', a: ['GRANT OPTION FOR'] }
    ],
    why: '<b>WITH GRANT OPTION</b> 은 「받은 권한을 남에게 다시 줄 권한」까지 준다. '
       + '<b>GRANT OPTION FOR</b> 는 그 <b>재부여 권한만</b> 거두고 본인의 UPDATE 권한은 남긴다. '
       + '권한 자체를 연쇄로 거두려면 뒤에 <b>CASCADE</b> 를 붙인다.',
    d: 3, y: [], tag: ['DCL', 'GRANT', 'WITH GRANT OPTION']
  },

  {
    id: 'ch08-s04-07', ch: 8, sec: 4,
    t: 'code', lang: 'sql',
    code: 'GRANT ( ㉠ ) TO 홍길동 IDENTIFIED BY 1234;\n'
        + '\n'
        + 'GRANT SELECT ON 회원 TO 이순신;\n'
        + 'REVOKE SELECT ON 회원 FROM 이순신 ( ㉡ );',
    q: '홍길동에게 <b>테이블을 생성할 수 있는 등급</b>을 주고(㉠), 이순신의 검색 권한을 거두면서 <b>이순신이 남에게 준 권한까지 연쇄로</b> 거두려 한다(㉡).',
    parts: [
      { label: '㉠', a: ['RESOURCE'] },
      { label: '㉡', a: ['CASCADE'] }
    ],
    why: '사용자 등급은 셋이다 — <b>DBA</b>(관리자) · <b>RESOURCE</b>(DB·테이블 생성 가능) · '
       + '<b>CONNECT</b>(단순 사용자). 권한 취소의 <b>CASCADE</b> 는 그 사용자가 남에게 부여한 권한까지 함께 거둔다.',
    d: 2, y: [], tag: ['DCL', 'GRANT', '사용자등급']
  },

  {
    id: 'ch08-s05-06', ch: 8, sec: 5,
    t: 'code', lang: 'sql',
    code: '[회원]\n'
        + '회원번호 | 이름   | 등급\n'
        + '---------+--------+------\n'
        + 'M001     | 김하늘 | 일반\n'
        + 'M002     | 이바다 | 우수\n'
        + 'M003     | 박구름 | 우수\n'
        + 'M004     | 최나무 | 일반\n'
        + '\n'
        + '-- 우수회원목록 은 비어 있다.\n'
        + 'INSERT INTO 우수회원목록\n'
        + 'SELECT 회원번호, 이름 FROM 회원 WHERE 등급 = \'우수\';\n'
        + '\n'
        + 'SELECT COUNT(*) FROM 우수회원목록;',
    q: '위 SQL 의 마지막 문장의 결과값을 쓰시오.',
    a: ['2'],
    why: '<b>INSERT INTO ~ SELECT</b> 는 VALUES 대신 <b>다른 테이블의 검색 결과를 그대로 넣는다.</b> '
       + '등급이 우수인 이바다·박구름 <b>2행</b>이 들어간다.',
    d: 2, y: [], tag: ['INSERT', 'SELECT']
  },

  {
    id: 'ch08-s05-07', ch: 8, sec: 5,
    t: 'code', lang: 'sql',
    code: '[도서]\n'
        + '도서번호 | 제목     | 대출횟수\n'
        + '---------+----------+--------\n'
        + 'B001     | 자료구조 | 12\n'
        + 'B002     | 운영체제 | 7\n'
        + 'B003     | 네트워크 | 3\n'
        + '\n'
        + 'UPDATE 도서 SET 대출횟수 = 대출횟수 * 2 WHERE 대출횟수 >= 7;\n'
        + '\n'
        + 'SELECT SUM(대출횟수) FROM 도서;',
    q: '위 SQL 의 마지막 문장의 결과값을 쓰시오.',
    a: ['41'],
    why: 'WHERE 조건에 걸리는 것은 <b>12 와 7</b> 이다 — <code>&gt;=</code> 라서 <b>7 도 포함된다.</b> '
       + '두 배가 되어 24 · 14 가 되고, 3 은 그대로다. 24 + 14 + 3 = <b>41</b>.',
    d: 2, y: [], tag: ['UPDATE', 'WHERE', 'SUM']
  },

  {
    id: 'ch08-s06-10', ch: 8, sec: 6,
    t: 'code', lang: 'sql',
    code: '[회원]\n'
        + '이름   | 등급\n'
        + '-------+--------\n'
        + '김하늘 | 일반\n'
        + '이바다 | 우수\n'
        + '박구름 | 최우수\n'
        + '최나무 | 일반\n'
        + '정보람 | 우수\n'
        + '\n'
        + 'SELECT COUNT(*)\n'
        + 'FROM 회원\n'
        + 'WHERE 등급 NOT IN (\'일반\', \'우수\');',
    q: '위 SQL 의 결과값을 쓰시오.',
    a: ['1'],
    why: '<b>IN</b> 은 목록 중 하나와 일치하는 것을 고르고, <b>NOT IN</b> 은 그것을 뒤집는다. '
       + '일반·우수가 아닌 것은 <b>최우수 한 명</b>뿐이다.',
    d: 1, y: [], tag: ['IN', 'WHERE']
  },

  {
    id: 'ch08-s06-11', ch: 8, sec: 6,
    t: 'code', lang: 'sql',
    code: '[성적]\n'
        + '학번 | 점수\n'
        + '-----+-----\n'
        + '1001 | 85\n'
        + '1002 | 90\n'
        + '1003 | 85\n'
        + '1004 | 90\n'
        + '\n'
        + 'SELECT 학번\n'
        + 'FROM 성적\n'
        + 'ORDER BY 점수 DESC, 학번 ASC;',
    q: '위 SQL 의 결과를 <b>나오는 순서대로</b> 쓰시오. (예: 1001, 1002, 1003, 1004)',
    a: ['1002, 1004, 1001, 1003', '1002,1004,1001,1003'],
    why: '<b>정렬 기준이 여럿이면 앞의 것이 먼저다.</b> 점수를 내림차순으로 90 · 85 로 나눈 뒤, '
       + '점수가 같은 것끼리 학번 오름차순으로 정렬한다. '
       + '💡 <b>ASC 는 기본값이라 생략해도 되지만 DESC 는 반드시 적어야 한다.</b>',
    d: 2, y: [], tag: ['ORDER BY', 'SELECT']
  },

  {
    id: 'ch08-s06-12', ch: 8, sec: 6,
    t: 'code', lang: 'sql',
    code: '[대출]\n'
        + '회원번호 | 연체일수\n'
        + '---------+--------\n'
        + 'M001     | 3\n'
        + 'M002     | 0\n'
        + 'M003     | 12\n'
        + '\n'
        + 'SELECT 회원번호, 연체일수 * 100 AS 연체료\n'
        + 'FROM 대출\n'
        + 'WHERE 연체일수 > 0;',
    q: '결과 표의 <b>연체료</b> 열 값을 위에서부터 차례로 쓰시오. (예: 100, 200)',
    a: ['300, 1200', '300,1200'],
    why: 'SELECT 절에는 속성뿐 아니라 <b>계산식</b>도 쓸 수 있고, <b>AS 로 별칭</b>을 붙여 결과 열 이름을 정한다. '
       + '연체일수가 0 인 M002 는 <code>&gt; 0</code> 에 걸려 빠진다.',
    d: 2, y: [], tag: ['SELECT', '별칭', 'WHERE']
  },

  {
    id: 'ch08-s07-07', ch: 8, sec: 7,
    t: 'code', lang: 'sql',
    code: '[대출]\n'
        + '대출번호 | 회원번호\n'
        + '---------+--------\n'
        + 'L001     | M001\n'
        + 'L002     | M002\n'
        + 'L003     | M001\n'
        + 'L004     | M003\n'
        + 'L005     | M002\n'
        + '\n'
        + 'SELECT COUNT(*), COUNT(DISTINCT 회원번호)\n'
        + 'FROM 대출;',
    q: '위 SQL 의 결과값을 쓰시오. (예: 3, 2)',
    a: ['5, 3', '5,3', '5 3'],
    why: '<b>COUNT(*)</b> 는 전체 5행, <b>COUNT(DISTINCT 회원번호)</b> 는 중복을 지운 뒤 세므로 '
       + 'M001 · M002 · M003 <b>3</b> 이다. 「몇 번 빌렸나」와 「몇 명이 빌렸나」는 다른 질문이다.',
    d: 2, y: [], tag: ['COUNT', 'DISTINCT', '그룹함수']
  },

  {
    id: 'ch08-s07-08', ch: 8, sec: 7,
    t: 'code', lang: 'sql',
    code: '[회원]\n'
        + '이름   | 대출수\n'
        + '-------+------\n'
        + '김하늘 | 6\n'
        + '이바다 | NULL\n'
        + '박구름 | 4\n'
        + '최나무 | 2\n'
        + '\n'
        + 'SELECT SUM(대출수), AVG(대출수)\n'
        + 'FROM 회원;',
    q: '위 SQL 의 결과값을 쓰시오. (예: 10, 5)',
    a: ['12, 4', '12,4', '12 4'],
    why: '🚨 <b>AVG 의 분모는 4 가 아니라 3 이다.</b> 그룹 함수는 <b>NULL 을 계산에서 아예 뺀다</b> — '
       + '더하는 값에서도 빠지고 <b>세는 개수에서도 빠진다.</b> 12 ÷ 3 = <b>4</b>.',
    d: 3, y: [], tag: ['AVG', 'SUM', 'NULL', '그룹함수']
  },

  {
    id: 'ch08-s07-09', ch: 8, sec: 7,
    t: 'code', lang: 'sql',
    code: '[회원]\n'
        + '이름   | 등급 | 대출수\n'
        + '-------+------+------\n'
        + '김하늘 | 일반 | 3\n'
        + '이바다 | 우수 | 7\n'
        + '박구름 | 일반 | 5\n'
        + '최나무 | 우수 | 2\n'
        + '정보람 | 일반 | 6\n'
        + '\n'
        + 'SELECT 등급, COUNT(*)\n'
        + 'FROM 회원\n'
        + 'WHERE 대출수 >= 3\n'
        + 'GROUP BY 등급\n'
        + 'HAVING COUNT(*) >= 3;',
    q: '위 SQL 의 결과를 쓰시오. (예: 우수, 2)',
    a: ['일반, 3', '일반,3', '일반 3'],
    why: '🚨 <b>WHERE 는 묶기 전에 행을 거르고, HAVING 은 묶은 뒤에 그룹을 거른다.</b> '
       + '대출수 2 인 최나무가 <b>WHERE 에서</b> 먼저 빠진다. 남은 것을 묶으면 일반 3명 · 우수 1명이고, '
       + '<b>HAVING 에서</b> 우수 그룹이 빠져 <b>일반, 3</b> 한 행만 남는다.',
    d: 3, y: [], tag: ['GROUP BY', 'HAVING', 'WHERE']
  },

  {
    id: 'ch08-s07-10', ch: 8, sec: 7,
    t: 'code', lang: 'sql',
    code: '[대출]\n'
        + '등급 | 월 | 건수\n'
        + '-----+----+-----\n'
        + '일반 | 1  | 3\n'
        + '일반 | 2  | 2\n'
        + '우수 | 1  | 5\n'
        + '\n'
        + 'SELECT 등급, 월, SUM(건수)\n'
        + 'FROM 대출\n'
        + 'GROUP BY CUBE(등급, 월);',
    q: '위 SQL 의 결과는 몇 행인가?',
    a: ['8', '8행', '8개'],
    why: '<b>CUBE 는 모든 조합의 소계를 낸다</b> — (등급,월) 3행 + 등급별 2행 + 월별 2행 + 전체 1행 = <b>8행</b>. '
       + '같은 자리에 <b>ROLLUP(등급, 월)</b> 을 쓰면 <b>계층적으로만</b> 집계해 '
       + '(등급,월) 3행 + 등급별 2행 + 전체 1행 = <b>6행</b>이다.',
    d: 3, y: [], tag: ['CUBE', 'ROLLUP', 'GROUP BY']
  },

  {
    id: 'ch08-s08-07', ch: 8, sec: 8,
    t: 'code', lang: 'sql',
    code: '[회원]                 [대출]\n'
        + '회원번호 | 이름        회원번호 | 도서번호\n'
        + '---------+--------     ---------+--------\n'
        + 'M001     | 김하늘      M001     | B001\n'
        + 'M002     | 이바다      M003     | B002\n'
        + 'M003     | 박구름      M001     | B003\n'
        + 'M004     | 최나무\n'
        + '\n'
        + 'SELECT COUNT(*)\n'
        + 'FROM 회원 A\n'
        + 'WHERE EXISTS (SELECT 1 FROM 대출 B\n'
        + '              WHERE B.회원번호 = A.회원번호);',
    q: '위 SQL 의 결과값을 쓰시오.',
    a: ['2'],
    why: '<b>EXISTS 는 하위 질의에 행이 하나라도 있으면 참</b>이다. 대출 기록이 있는 회원은 M001 · M003 <b>둘</b>. '
       + '🚨 <b>몇 행인지는 세지 않는다</b> — 대출이 두 건인 M001 도 <b>한 번만</b> 센다.',
    d: 3, y: [], tag: ['하위질의', 'EXISTS']
  },

  {
    id: 'ch08-s08-08', ch: 8, sec: 8,
    t: 'code', lang: 'sql',
    code: '[대출2024]     [대출2025]\n'
        + '회원번호       회원번호\n'
        + '--------       --------\n'
        + 'M001           M002\n'
        + 'M002           M003\n'
        + 'M003           M001\n'
        + 'M004\n'
        + '\n'
        + 'SELECT 회원번호 FROM 대출2024\n'
        + 'INTERSECT\n'
        + 'SELECT 회원번호 FROM 대출2025;',
    q: '위 SQL 의 결과는 몇 행인가?',
    a: ['3', '3행', '3개'],
    why: '<b>INTERSECT 는 양쪽에 다 있는 행만</b> 남긴다 — M001 · M002 · M003 <b>3행</b>이다. '
       + '2025 에 없는 M004 가 빠진다. 「두 해 모두 빌린 회원」을 묻는 것과 같다.',
    d: 2, y: [], tag: ['집합연산자', 'INTERSECT']
  },

  {
    id: 'ch08-s08-09', ch: 8, sec: 8,
    t: 'code', lang: 'sql',
    code: '[전체회원]     [탈퇴회원]\n'
        + '아이디         아이디\n'
        + '------         ------\n'
        + 'A              B\n'
        + 'B              D\n'
        + 'C\n'
        + 'D\n'
        + 'E\n'
        + '\n'
        + 'SELECT 아이디 FROM 전체회원\n'
        + 'EXCEPT\n'
        + 'SELECT 아이디 FROM 탈퇴회원;',
    q: '위 SQL 의 결과를 <b>오름차순으로</b> 쓰시오. (예: A, B)',
    a: ['A, C, E', 'A,C,E', 'A C E'],
    why: '<b>EXCEPT 는 첫 결과에서 두 번째 결과를 뺀다</b> — 오라클에서는 <b>MINUS</b> 라고 쓴다. '
       + '탈퇴한 B · D 가 빠지고 <b>A · C · E</b> 가 남는다. '
       + '⚠️ 집합 연산자를 쓰려면 두 SELECT 의 <b>속성 개수와 데이터 타입이 같아야 한다.</b>',
    d: 2, y: [], tag: ['집합연산자', 'EXCEPT', 'MINUS']
  },

  {
    id: 'ch08-s08-10', ch: 8, sec: 8,
    t: 'code', lang: 'sql',
    code: '[A]     [B]\n'
        + '값      값\n'
        + '---     ---\n'
        + '1       2\n'
        + '2       3\n'
        + '3       4\n'
        + '\n'
        + 'SELECT 값 FROM A UNION     SELECT 값 FROM B;   -- ㉠\n'
        + 'SELECT 값 FROM A UNION ALL SELECT 값 FROM B;   -- ㉡',
    q: '두 문장의 결과 행 수를 각각 쓰시오.',
    parts: [
      { label: '㉠', a: ['4', '4행'] },
      { label: '㉡', a: ['6', '6행'] }
    ],
    why: '<b>UNION 은 중복을 지우고 UNION ALL 은 그대로 둔다.</b> 2 와 3 이 양쪽에 겹치므로 '
       + 'UNION 은 1·2·3·4 <b>4행</b>, UNION ALL 은 3 + 3 = <b>6행</b>이다.',
    d: 2, y: [], tag: ['UNION', 'UNION ALL', '집합연산자']
  },

  {
    id: 'ch08-s09-08', ch: 8, sec: 9,
    t: 'code', lang: 'sql',
    code: '[회원]                 [대출]\n'
        + '회원번호 | 이름        회원번호 | 도서\n'
        + '---------+--------     ---------+-----\n'
        + 'M001     | 김하늘      M001     | B001\n'
        + 'M002     | 이바다      M001     | B002\n'
        + 'M003     | 박구름      M003     | B003\n'
        + '\n'
        + 'SELECT COUNT(*)\n'
        + 'FROM 회원 A LEFT OUTER JOIN 대출 B\n'
        + '  ON A.회원번호 = B.회원번호;',
    q: '위 SQL 의 결과값을 쓰시오.',
    a: ['4'],
    why: '<b>LEFT OUTER JOIN 은 왼쪽(회원)의 모든 행을 남긴다.</b> 다만 M001 은 대출이 둘이라 '
       + '<b>2행으로 늘고</b>, 대출이 없는 M002 는 오른쪽이 NULL 인 1행으로 남는다. 2 + 1 + 1 = <b>4행</b>. '
       + '🚨 「왼쪽 행 수만큼 나온다」가 아니다 — <b>짝이 여럿이면 늘어난다.</b>',
    d: 3, y: [], tag: ['JOIN', 'OUTER JOIN']
  },

  {
    id: 'ch08-s09-09', ch: 8, sec: 9,
    t: 'code', lang: 'sql',
    code: '[학생]                [동아리]\n'
        + '학번 | 동아리코드     코드 | 이름\n'
        + '-----+-----------     -----+------\n'
        + '1    | C1             C1   | 사진\n'
        + '2    | C2             C2   | 등산\n'
        + '3    | NULL           C3   | 요리\n'
        + '\n'
        + 'SELECT COUNT(*)\n'
        + 'FROM 학생 S FULL OUTER JOIN 동아리 D\n'
        + '  ON S.동아리코드 = D.코드;',
    q: '위 SQL 의 결과값을 쓰시오.',
    a: ['4'],
    why: '<b>FULL OUTER JOIN 은 양쪽 모두를 남긴다</b> — 짝이 맞는 2행 + 동아리가 없는 학생 3번 1행 + '
       + '학생이 없는 동아리 C3 1행 = <b>4행</b>. 같은 자료로 <b>INNER JOIN 이었으면 2행</b>이다.',
    d: 3, y: [], tag: ['JOIN', 'OUTER JOIN', 'NULL']
  },

  {
    id: 'ch08-s09-10', ch: 8, sec: 9,
    t: 'code', lang: 'sql',
    code: '[색상]     [사이즈]\n'
        + '이름       이름\n'
        + '----       ----\n'
        + '빨강       S\n'
        + '파랑       M\n'
        + '초록       L\n'
        + '           XL\n'
        + '\n'
        + 'SELECT COUNT(*) FROM 색상 CROSS JOIN 사이즈;',
    q: '위 SQL 의 결과값을 쓰시오.',
    a: ['12'],
    why: '<b>CROSS JOIN(교차 조인)은 모든 조합을 만든다.</b> 결과 행 수는 두 테이블 행 수의 '
       + '<b>곱</b>(교차곱, Cartesian Product)이라 3 × 4 = <b>12</b> 다. 조인 조건이 없다.',
    d: 2, y: [], tag: ['JOIN', 'CROSS JOIN']
  },

  {
    id: 'ch08-s09-11', ch: 8, sec: 9,
    t: 'code', lang: 'sql',
    code: '[회원]\n'
        + '회원번호 | 이름   | 추천인번호\n'
        + '---------+--------+----------\n'
        + 'M001     | 김하늘 | NULL\n'
        + 'M002     | 이바다 | M001\n'
        + 'M003     | 박구름 | M001\n'
        + 'M004     | 최나무 | M002\n'
        + '\n'
        + 'SELECT COUNT(*)\n'
        + 'FROM 회원 A, 회원 B\n'
        + 'WHERE A.추천인번호 = B.회원번호;',
    q: '위 SQL 의 결과값을 쓰시오.',
    a: ['3'],
    why: '<b>같은 테이블을 별칭 둘로 나눠 붙이는 자체 조인(SELF JOIN)</b> 이다. '
       + '추천인이 있는 M002 · M003 · M004 <b>3행</b>이 맞는다. '
       + '🚨 추천인이 <b>NULL 인 김하늘은 빠진다</b> — NULL 은 <code>=</code> 로 비교할 수 없다.',
    d: 3, y: [], tag: ['JOIN', 'SELF JOIN', 'NULL']
  },

  {
    id: 'ch08-s10-05', ch: 8, sec: 10,
    t: 'code', lang: 'sql',
    code: '[회원]\n'
        + '이름   | 대출수\n'
        + '-------+------\n'
        + '김하늘 | 9\n'
        + '이바다 | 7\n'
        + '박구름 | 7\n'
        + '최나무 | 5\n'
        + '\n'
        + 'SELECT 이름,\n'
        + '       ROW_NUMBER() OVER (ORDER BY 대출수 DESC) AS 번호\n'
        + 'FROM 회원;',
    q: '결과 표의 <b>번호</b> 열 값을 위에서부터 차례로 쓰시오. (예: 1, 2, 3, 4)',
    a: ['1, 2, 3, 4', '1,2,3,4', '1 2 3 4'],
    why: '<b>ROW_NUMBER 는 값이 같아도 다른 순위를 준다</b> — 7 이 둘이지만 <b>2 · 3</b> 으로 갈린다. '
       + '같은 자료로 <b>RANK 는 1, 2, 2, 4</b>(건너뜀) · <b>DENSE_RANK 는 1, 2, 2, 3</b>(안 건너뜀)이다.',
    d: 2, y: [], tag: ['WINDOW함수', 'ROW_NUMBER']
  },

  {
    id: 'ch08-s10-06', ch: 8, sec: 10,
    t: 'code', lang: 'sql',
    code: '[성적]\n'
        + '반 | 이름 | 점수\n'
        + '---+------+-----\n'
        + 'A  | 김   | 90\n'
        + 'A  | 이   | 80\n'
        + 'B  | 박   | 95\n'
        + 'B  | 최   | 85\n'
        + 'B  | 정   | 85\n'
        + '\n'
        + 'SELECT 이름,\n'
        + '       RANK() OVER (PARTITION BY 반 ORDER BY 점수 DESC) AS 순위\n'
        + 'FROM 성적;',
    q: '결과 표의 <b>순위</b> 열 값을 위에서부터 차례로 쓰시오. (예: 1, 2, 1, 2, 3)',
    a: ['1, 2, 1, 2, 2', '1,2,1,2,2', '1 2 1 2 2'],
    why: '<b>PARTITION BY 는 그룹을 나눠 그 안에서만 순위를 매긴다</b> — 반이 바뀌면 <b>1 부터 다시</b> 센다. '
       + 'B 반의 85 는 둘이 같은 <b>2위</b>다. '
       + '💡 WINDOW 함수는 GROUP BY 와 달리 <b>행의 개수를 줄이지 않는다</b> — 5행 그대로 나온다.',
    d: 3, y: [], tag: ['WINDOW함수', 'PARTITION BY', 'RANK']
  },

  {
    id: 'ch08-s12-06', ch: 8, sec: 12,
    t: 'code', lang: 'sql',
    code: 'CREATE OR REPLACE TRIGGER 반납감소 ( ㉠ ) DELETE ON 대출\n'
        + 'REFERENCING ( ㉡ ) AS 이전\n'
        + 'FOR EACH ROW\n'
        + 'BEGIN\n'
        + '    UPDATE 회원 SET 누적대출수 = 누적대출수 - 1\n'
        + '    WHERE 회원번호 = :이전.회원번호;\n'
        + 'END;',
    q: '대출 기록이 <b>삭제되기 직전에</b> 실행되고, <b>삭제되기 전의 데이터</b>를 참조하게 하려 한다. ㉠·㉡ 에 들어갈 예약어를 쓰시오.',
    parts: [
      { label: '㉠', a: ['BEFORE'] },
      { label: '㉡', a: ['OLD'] }
    ],
    why: '동작 시기는 조작 <b>전이면 BEFORE</b>, <b>후면 AFTER</b> 다. 별칭은 '
       + '<b>OLD = 변경·삭제 전 데이터</b>, <b>NEW = 새로 추가·변경될 데이터</b>. '
       + '🚨 트리거 안에는 <b>COMMIT·ROLLBACK·GRANT·REVOKE 같은 DCL 을 쓸 수 없다.</b>',
    d: 3, y: [], tag: ['트리거', 'BEFORE', 'OLD']
  },

  {
    id: 'ch08-s13-04', ch: 8, sec: 13,
    t: 'code', lang: 'sql',
    code: 'CREATE OR REPLACE ( ㉠ ) 연체료계산(i_연체일수 IN NUMBER)\n'
        + 'RETURN NUMBER\n'
        + 'IS\n'
        + '    v_연체료 NUMBER;\n'
        + 'BEGIN\n'
        + '    v_연체료 := i_연체일수 * 100;\n'
        + '    ( ㉡ ) v_연체료;\n'
        + 'END;\n'
        + '\n'
        + 'SELECT 연체료계산(7) FROM DUAL;   -- 결과: ( ㉢ )',
    q: '㉠·㉡ 에 들어갈 예약어와 ㉢ 의 결과값을 쓰시오.',
    parts: [
      { label: '㉠', a: ['FUNCTION'] },
      { label: '㉡', a: ['RETURN'] },
      { label: '㉢', a: ['700'] }
    ],
    why: '<b>사용자 정의 함수는 반드시 반환값이 있어</b> RETURN 이 두 번 나온다 — '
       + '위는 <b>반환 타입 선언</b>, 아래가 <b>실제 반환</b>이다. 7 × 100 = <b>700</b>. '
       + '🚨 프로시저는 <code>EXECUTE·CALL</code> 로 부르지만 <b>함수는 SQL 문 안에서 바로 쓴다.</b>',
    d: 2, y: [], tag: ['사용자정의함수', 'RETURN']
  },

  {
    id: 'ch08-s14-04', ch: 8, sec: 14,
    t: 'code', lang: 'sql',
    code: 'DECLARE\n'
        + '    CURSOR c_회원 IS SELECT 이름 FROM 회원;\n'
        + '    v_이름 VARCHAR2(20);\n'
        + 'BEGIN\n'
        + '    ( ㉠ ) c_회원;\n'
        + '    LOOP\n'
        + '        ( ㉡ ) c_회원 INTO v_이름;\n'
        + '        EXIT WHEN c_회원%NOTFOUND;\n'
        + '    END LOOP;\n'
        + '    ( ㉢ ) c_회원;\n'
        + 'END;',
    q: '㉠~㉢ 에 들어갈 커서 명령어를 순서대로 쓰시오.',
    parts: [
      { label: '㉠', a: ['OPEN'] },
      { label: '㉡', a: ['FETCH'] },
      { label: '㉢', a: ['CLOSE'] }
    ],
    why: '커서의 수행 순서는 <b>OPEN → FETCH → CLOSE</b> 다. '
       + '<b>OPEN</b> 이 쿼리를 실행해 결과를 커서에 담고, <b>FETCH</b> 가 <b>한 행씩</b> 읽어 변수에 넣고, '
       + '<b>CLOSE</b> 가 메모리를 놓는다. 사용자가 직접 정의했으므로 <b>명시적 커서</b>다.',
    d: 2, y: [], tag: ['커서', '명시적커서']
  },

  /* ======================================================================
     🚨 T46 7절 — 보기 선택 문항 (`pool` + `t:'pick'`) · 2026-08-17
     ====================================================================== */

  {
    id: 'ch08-s01-03', ch: 8, sec: 1,
    t: 'multi-blank',
    q: '다음 설명에 해당하는 SQL 명령어를 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ 이미 만들어진 테이블의 <b>구조를 변경</b>한다<br>'
     + '㉡ 사용자에게 준 <b>권한을 거둔다</b><br>'
     + '㉢ 트랜잭션에서 수행한 변경 내용을 <b>취소</b>한다',
    pool: ['CREATE', 'ALTER', 'DROP', 'SELECT', 'INSERT',
           'GRANT', 'REVOKE', 'COMMIT', 'ROLLBACK'],
    parts: [
      { label: '㉠', t: 'pick', a: ['ALTER'] },
      { label: '㉡', t: 'pick', a: ['REVOKE'] },
      { label: '㉢', t: 'pick', a: ['ROLLBACK'] }
    ],
    why: '<b>DDL</b> 은 구조를 만들고 바꾸고 지운다 — <b>CREATE·ALTER·DROP</b>. '
       + '<b>DCL</b> 은 권한을 준다 뺏는다 — <b>GRANT·REVOKE</b>. '
       + '<b>TCL</b> 은 트랜잭션을 확정하거나 되돌린다 — <b>COMMIT·ROLLBACK·SAVEPOINT</b>. '
       + '🚨 <b>DROP 은 구조를 지우고 ROLLBACK 은 데이터 변경을 되돌린다</b> — 「취소」라는 말에 끌려가지 말 것.',
    d: 1, y: [], tag: ['SQL분류', 'DDL', 'DCL', 'TCL'], lang: null, code: null
  },

  {
    id: 'ch08-s02-09', ch: 8, sec: 2,
    t: 'multi-blank',
    q: '<code>CREATE TABLE</code> 의 참조 무결성 옵션(<code>ON DELETE</code>·<code>ON UPDATE</code>)에 대한 설명이다. '
     + '각 설명에 해당하는 옵션을 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ 참조 테이블의 튜플이 삭제·변경되면 관련 튜플도 함께 삭제·변경된다<br>'
     + '㉡ 참조 테이블에 변화가 있으면 관련 튜플의 속성 값을 <b>NULL 로</b> 바꾼다<br>'
     + '㉢ 참조 테이블에 변화가 있어도 <b>아무 조치도 하지 않는다</b>',
    pool: ['NO ACTION', 'CASCADE', 'SET NULL', 'SET DEFAULT', 'RESTRICT'],
    parts: [
      { label: '㉠', t: 'pick', a: ['CASCADE'] },
      { label: '㉡', t: 'pick', a: ['SET NULL'] },
      { label: '㉢', t: 'pick', a: ['NO ACTION'] }
    ],
    why: '🚨 <b>같은 <code>CASCADE</code> 라도 자리에 따라 뜻이 다르다.</b> '
       + '<code>ON DELETE CASCADE</code> 는 <b>참조하던 행을 같이 지우는 것</b>이고, '
       + '<code>DROP TABLE ~ CASCADE</code> 는 <b>참조하는 개체까지 지우는 것</b>이다. '
       + '📌 <code>RESTRICT</code> 는 <code>DROP</code> 쪽 옵션이라 여기서는 답이 아니다.',
    d: 3, y: [], tag: ['CREATE', '참조무결성', 'CASCADE'], lang: null, code: null
  },

  {
    id: 'ch08-s04-08', ch: 8, sec: 4,
    t: 'multi-blank',
    q: 'DCL 의 사용자 등급과 옵션에 대한 설명이다. 각 설명에 해당하는 것을 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ 데이터베이스 및 <b>테이블을 생성</b>할 수 있는 등급<br>'
     + '㉡ 부여받은 권한을 <b>다른 사용자에게 다시 부여</b>할 수 있게 해 주는 옵션<br>'
     + '㉢ 권한을 거둘 때 <b>다른 사용자에게 부여된 권한까지 연쇄적으로</b> 거두는 옵션',
    pool: ['DBA', 'RESOURCE', 'CONNECT',
           'WITH GRANT OPTION', 'GRANT OPTION FOR', 'CASCADE', 'RESTRICT'],
    parts: [
      { label: '㉠', t: 'pick', a: ['RESOURCE'] },
      { label: '㉡', t: 'pick', a: ['WITH GRANT OPTION'] },
      { label: '㉢', t: 'pick', a: ['CASCADE'] }
    ],
    why: '등급은 셋이다 — <b>DBA</b>(관리자) · <b>RESOURCE</b>(DB·테이블 생성) · <b>CONNECT</b>(단순 사용자). '
       + '🚨 <b><code>WITH GRANT OPTION</code> 과 <code>GRANT OPTION FOR</code> 는 방향이 반대다</b> — '
       + '앞은 <b>줄 때</b> 재부여 권한까지 주는 것, 뒤는 <b>거둘 때</b> 그 재부여 권한만 거두는 것이다.',
    d: 3, y: [], tag: ['DCL', '사용자등급', 'WITH GRANT OPTION'], lang: null, code: null
  },

  {
    id: 'ch08-s06-13', ch: 8, sec: 6,
    t: 'multi-blank',
    q: '<code>WHERE</code> 절의 조건 연산자에 대한 설명이다. 각 설명에 해당하는 연산자를 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ 두 값 사이의 값을 고른다. <b>양 끝을 포함</b>한다<br>'
     + '㉡ 패턴이 일치하는 것을 고른다. <code>%</code> 는 임의의 문자열, <code>_</code> 는 임의의 한 문자<br>'
     + '㉢ 값이 <b>없는지</b> 판단한다. <code>= NULL</code> 로는 비교할 수 없다',
    pool: ['BETWEEN A AND B', 'IN (값1, 값2, ...)', 'LIKE', 'IS NULL',
           'ALL', 'DISTINCT', 'EXISTS'],
    parts: [
      { label: '㉠', t: 'pick', a: ['BETWEEN A AND B'] },
      { label: '㉡', t: 'pick', a: ['LIKE'] },
      { label: '㉢', t: 'pick', a: ['IS NULL'] }
    ],
    why: '🚨 <b>NULL 은 값이 아니라 「없음」</b> 이라 <code>=</code> 로 비교하면 참이 되는 행이 하나도 없다 — '
       + '반드시 <code>IS NULL</code> 을 쓴다. '
       + '📌 <code>BETWEEN 20 AND 29</code> 는 <b>20 과 29 를 포함</b>한다 — 「사이」라는 말에 속아 빼지 말 것.',
    d: 1, y: [], tag: ['WHERE', 'BETWEEN', 'LIKE', 'IS NULL'], lang: null, code: null
  },

  {
    id: 'ch08-s08-11', ch: 8, sec: 8,
    t: 'multi-blank',
    q: '하위 질의와 집합 연산자에 대한 설명이다. 각 설명에 해당하는 것을 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ 하위 질의 결과 <b>모두를 만족</b>해야 한다<br>'
     + '㉡ 하위 질의 결과가 <b>존재하기만 하면</b> 참이다<br>'
     + '㉢ 두 SELECT 결과의 <b>공통된 행만</b> 남긴다',
    pool: ['IN', 'ANY / SOME', 'ALL', 'EXISTS',
           'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT'],
    parts: [
      { label: '㉠', t: 'pick', a: ['ALL'] },
      { label: '㉡', t: 'pick', a: ['EXISTS'] },
      { label: '㉢', t: 'pick', a: ['INTERSECT'] }
    ],
    why: '앞의 넷은 <b>다중행 하위 질의</b> 연산자다 — <b>IN</b>(하나와 일치) · '
       + '<b>ANY/SOME</b>(어느 하나라도 만족) · <b>ALL</b>(모두 만족) · <b>EXISTS</b>(있기만 하면 참). '
       + '🚨 <b>EXISTS 는 몇 행인지 세지 않는다</b> — 있는지 없는지만 본다. '
       + '뒤의 넷은 집합 연산자이고 <b>UNION 은 중복을 지우지만 UNION ALL 은 그대로 둔다.</b>',
    d: 2, y: [], tag: ['하위질의', 'ALL', 'EXISTS', '집합연산자'], lang: null, code: null
  },

  {
    id: 'ch08-s09-12', ch: 8, sec: 9,
    t: 'multi-blank',
    q: 'JOIN 에 대한 설명이다. 각 설명에 해당하는 것을 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ EQUI JOIN 에서 <b>중복된 속성을 한 번만</b> 표기하는 방법<br>'
     + '㉡ 두 테이블의 <b>모든 행을 조합</b>한다. 결과 행 수는 두 테이블 행 수의 곱이다<br>'
     + '㉢ <b>오른쪽 테이블의 모든 행</b>을 포함하고 왼쪽에 짝이 없으면 NULL 을 채운다',
    pool: ['EQUI JOIN', 'NON-EQUI JOIN', 'NATURAL JOIN', 'SELF JOIN', 'CROSS JOIN',
           'LEFT OUTER JOIN', 'RIGHT OUTER JOIN', 'FULL OUTER JOIN'],
    parts: [
      { label: '㉠', t: 'pick', a: ['NATURAL JOIN'] },
      { label: '㉡', t: 'pick', a: ['CROSS JOIN'] },
      { label: '㉢', t: 'pick', a: ['RIGHT OUTER JOIN'] }
    ],
    why: 'INNER 는 <b>양쪽에 다 있는 것만</b>, OUTER 는 <b>짝이 없는 쪽까지</b> 남긴다. '
       + '🚨 <b>LEFT 인지 RIGHT 인지는 「모두 남기는 쪽」으로 정해진다</b> — '
       + '「NULL 이 채워지는 쪽」이 아니다. '
       + '<b>SELF JOIN</b> 은 같은 테이블을 별칭 둘로 나눠 붙이는 것이다.',
    d: 2, y: [], tag: ['JOIN', 'NATURAL JOIN', 'CROSS JOIN', 'OUTER JOIN'], lang: null, code: null
  },

  {
    id: 'ch08-s10-07', ch: 8, sec: 10,
    t: 'multi-blank',
    q: 'WINDOW 함수에 대한 설명이다. 각 설명에 해당하는 함수를 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ 같은 값에 같은 순위를 주고 <b>그 개수만큼 다음 순위를 건너뛴다</b> (1, 2, 2, 4)<br>'
     + '㉡ <b>이전 행</b>의 값을 가져온다<br>'
     + '㉢ 파티션 내에서 <b>가장 먼저 나온</b> 값을 가져온다',
    pool: ['ROW_NUMBER()', 'RANK()', 'DENSE_RANK()',
           'FIRST_VALUE()', 'LAST_VALUE()', 'LAG()', 'LEAD()'],
    parts: [
      { label: '㉠', t: 'pick', a: ['RANK()'] },
      { label: '㉡', t: 'pick', a: ['LAG()'] },
      { label: '㉢', t: 'pick', a: ['FIRST_VALUE()'] }
    ],
    why: '🚨 <b>RANK 는 건너뛰고 DENSE_RANK 는 안 건너뛴다</b> (1,2,2,4 대 1,2,2,3). '
       + '<b>ROW_NUMBER 는 같은 값에도 다른 번호</b>를 준다 (1,2,3,4). '
       + '💡 <b>LAG 은 뒤처진다(이전 행), LEAD 는 앞선다(다음 행)</b> 로 뜻을 붙잡아 둔다.',
    d: 2, y: [], tag: ['WINDOW함수', 'RANK', 'LAG', 'FIRST_VALUE'], lang: null, code: null
  },

  {
    id: 'ch08-s14-05', ch: 8, sec: 14,
    t: 'multi-blank',
    q: '묵시적 커서의 속성에 대한 설명이다. 각 설명에 해당하는 속성을 <b>보기에서 골라</b> 쓰시오.<br>'
     + '㉠ 실행 결과로 <b>영향을 받은 행의 수</b><br>'
     + '㉡ 실행 결과가 <b>0행이면</b> TRUE<br>'
     + '㉢ 커서가 열려 있으면 TRUE. <b>묵시적 커서에서는 항상 FALSE</b> 다',
    pool: ['SQL%FOUND', 'SQL%NOTFOUND', 'SQL%ROWCOUNT', 'SQL%ISOPEN'],
    parts: [
      { label: '㉠', t: 'pick', a: ['SQL%ROWCOUNT'] },
      { label: '㉡', t: 'pick', a: ['SQL%NOTFOUND'] },
      { label: '㉢', t: 'pick', a: ['SQL%ISOPEN'] }
    ],
    why: '<b>묵시적 커서</b>는 DBMS 가 알아서 만들어 쓰는 커서라 <b>직전 SQL 문의 결과</b>를 이 속성들로 알 수 있다. '
       + '🚨 <b><code>SQL%ISOPEN</code> 이 늘 FALSE 인 이유</b> — 묵시적 커서는 '
       + '문장이 끝나는 순간 <b>자동으로 닫히기</b> 때문이다. '
       + '사용자가 직접 <code>OPEN → FETCH → CLOSE</code> 하는 것은 <b>명시적 커서</b> 다.',
    d: 3, y: [], tag: ['커서', '묵시적커서'], lang: null, code: null
  }

];
