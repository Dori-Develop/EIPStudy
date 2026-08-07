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

];
