/* build.sh 가 content/*.md 의 부록 표에서 뽑아 생성한다. 직접 고치지 말 것.
   id · ch 챕터 · s 부록 섹션 순번(0부터) · f 앞면(구분) · b 뒷면(암기 포인트) */
window.EIP_CARDS = [
{id:"ch01-card-생명주기모형",ch:"ch01",s:30,f:"<b>생명 주기 모형</b>",b:"폭포수 / 프로토타입 / 나선형(보헴) / 애자일"}
,{id:"ch01-card-나선형4활동",ch:"ch01",s:30,f:"<b>나선형 4활동</b>",b:"<b>계획</b>하고 <b>분석</b>한 후 <b>개발</b>하고 <b>평가</b>한다"}
,{id:"ch01-card-애자일4대가치",ch:"ch01",s:30,f:"<b>애자일 4대 가치</b>",b:"개인·상호작용 / 실행 SW / 고객 협업 / 변화 반응"}
,{id:"ch01-card-스크럼팀",ch:"ch01",s:30,f:"<b>스크럼 팀</b>",b:"PO(백로그 작성) · SM(가이드) · DT(개발)"}
,{id:"ch01-card-스크럼프로세스",ch:"ch01",s:30,f:"<b>스크럼 프로세스</b>",b:"계획 → 스프린트 → (일일)회의 → 검토 → <b>회고</b>"}
,{id:"ch01-card-스프린트vs이터레이션",ch:"ch01",s:30,f:"<b>스프린트 vs 이터레이션</b>",b:"스크럼 <b>2~4주</b> / XP <b>1~3주</b>"}
,{id:"ch01-card-XP5대가치",ch:"ch01",s:30,f:"<b>XP 5대 가치</b>",b:"<b>의사소통 · 단순성 · 용기 · 존중 · 피드백</b>"}
,{id:"ch01-card-XP프로세스",ch:"ch01",s:30,f:"<b>XP 프로세스</b>",b:"계획 → 이터레이션 → 승인검사 → 소규모 릴리즈"}
,{id:"ch01-card-요구사항프로세스",ch:"ch01",s:30,f:"<b>요구사항 프로세스</b>",b:"<b>도</b>출 → <b>분</b>석 → <b>명</b>세 → <b>확</b>인 (<b>도분명확</b>)"}
,{id:"ch01-card-DFD4기호",ch:"ch01",s:30,f:"<b>DFD 4기호</b>",b:"프로세스(Process) · 자료 흐름(Data Flow) · 자료 저장소(Data Store) · 단말(Terminator)"}
,{id:"ch01-card-자료사전기호",ch:"ch01",s:30,f:"<b>자료 사전 기호</b>",b:"<code>=</code> 정의, <code>+</code> 연결, <code>()</code> 생략, <code>[]</code> 선택, <code>{}</code> 반복, <code>**</code> 주석"}
,{id:"ch01-card-정형명세",ch:"ch01",s:30,f:"<b>정형 명세</b>",b:"VDM, Z, Petri-net, CSP"}
,{id:"ch01-card-비정형명세",ch:"ch01",s:30,f:"<b>비정형 명세</b>",b:"FSM, Decision Table, ER모델링, State Chart"}
,{id:"ch01-card-분석CASE짝",ch:"ch01",s:30,f:"<b>분석 CASE 짝</b>",b:"RSL↔REVS(SREM, TRW) · PSL↔PSA(미시간 대학) · SADT(SoftTech)"}
,{id:"ch01-card-HIPO3종",ch:"ch01",s:30,f:"<b>HIPO 3종</b>",b:"가시적 도표 · 총체적 도표 · 세부적 도표"}
,{id:"ch01-card-UML구성",ch:"ch01",s:30,f:"<b>UML 구성</b>",b:"사물(Things) · 관계(Relationships) · 다이어그램(Diagram)"}
,{id:"ch01-card-UML관계6종",ch:"ch01",s:30,f:"<b>UML 관계 6종</b>",b:"연관 · 집합(빈 마름모) · 포함(찬 마름모) · 일반화(빈 화살표) · 의존(점선) · 실체화(점선+빈 화살표)"}
,{id:"ch01-card-구조적다이어그램6종",ch:"ch01",s:30,f:"<b>구조적 다이어그램 6종</b>",b:"클래스 · 객체 · 컴포넌트 · 배치 · 복합체 구조 · 패키지"}
,{id:"ch01-card-행위다이어그램7종",ch:"ch01",s:30,f:"<b>행위 다이어그램 7종</b>",b:"유스케이스 · 시퀀스 · 커뮤니케이션 · 상태 · 활동 · 상호작용 개요 · 타이밍"}
,{id:"ch01-card-럼바우모델링",ch:"ch01",s:30,f:"<b>럼바우 모델링</b>",b:"객체 모델링 → <b>객체</b> 다이어그램 / 동적 모델링 → <b>상태</b> 다이어그램"}
,{id:"ch01-card-활동다이어그램헷갈림",ch:"ch01",s:30,f:"<b>활동 다이어그램 헷갈림</b>",b:"마름모 = 조건(입1/출多) vs 병합(입多/출1) · 굵은 막대 = 포크(입1/출多) vs 조인(입多/출1)"}
,{id:"ch01-card-객체지향5원칙",ch:"ch01",s:30,f:"<b>객체지향 5원칙</b>",b:"캡슐화 · 정보 은닉 · 추상화 · 상속성 · 다형성"}
,{id:"ch01-card-개발방법론중심축",ch:"ch01",s:30,f:"<b>개발 방법론 중심축</b>",b:"구조적=처리 · 정보공학=자료 · 객체지향=객체 · CBD=컴포넌트 · 제품 계열=공통 기능"}
,{id:"ch01-card-재사용방법",ch:"ch01",s:30,f:"<b>재사용 방법</b>",b:"합성 중심(블록) · 생성 중심(패턴)"}
,{id:"ch01-card-하향식비용산정",ch:"ch01",s:30,f:"<b>하향식 비용 산정</b>",b:"전문가 감정 · 델파이"}
,{id:"ch01-card-상향식비용산정",ch:"ch01",s:30,f:"<b>상향식 비용 산정</b>",b:"LOC · 개발 단계별 인월수 · 수학적(COCOMO/Putnam/FP)"}
,{id:"ch01-card-LOC예측치",ch:"ch01",s:30,f:"<b>LOC 예측치</b>",b:"(낙관치 + 4×기대치 + 비관치) ÷ 6"}
,{id:"ch01-card-LOC공식",ch:"ch01",s:30,f:"<b>LOC 공식</b>",b:"노력=LOC÷1인당 생산성 · 기간=노력÷인원 · 생산성=LOC÷노력"}
,{id:"ch01-card-COCOMO유형",ch:"ch01",s:30,f:"<b>COCOMO 유형</b>",b:"조직형(50K↓) · 반분리형(300K↓) · 내장형(300K↑) — 보헴"}
,{id:"ch01-card-COCOMO종류",ch:"ch01",s:30,f:"<b>COCOMO 종류</b>",b:"기본형(크기·유형) · 중간형(4가지 특성) · 발전형(개발 공정별, 후반부)"}
,{id:"ch01-card-Putnam",ch:"ch01",s:30,f:"<b>Putnam</b>",b:"Rayleigh-Norden 곡선, 생명 주기 예측 모형"}
,{id:"ch01-card-FP",ch:"ch01",s:30,f:"<b>FP</b>",b:"알브레히트(Albrecht) 제안"}
,{id:"ch01-card-자동화추정도구",ch:"ch01",s:30,f:"<b>자동화 추정 도구</b>",b:"SLIM ← Putnam · ESTIMACS ← FP"}
,{id:"ch01-card-일정계획도구",ch:"ch01",s:30,f:"<b>일정 계획 도구</b>",b:"WBS · PERT/CPM · 간트 차트"}
,{id:"ch01-card-PERT예측치",ch:"ch01",s:30,f:"<b>PERT 예측치</b>",b:"(비관치 + 4×기대치 + 낙관치) ÷ 6"}
,{id:"ch01-card-ISOIEC12207",ch:"ch01",s:30,f:"<b>ISO/IEC 12207</b>",b:"기본 · 지원 · 조직 생명 주기 프로세스"}
,{id:"ch01-card-CMMI5단계",ch:"ch01",s:30,f:"<b>CMMI 5단계</b>",b:"초기 → 관리 → 정의 → 정량적 관리 → 최적화"}
,{id:"ch01-card-SPICE6단계",ch:"ch01",s:30,f:"<b>SPICE 6단계</b>",b:"불완전 → 수행 → 관리 → 확립 → 예측 → 최적화"}
,{id:"ch01-card-SPICE5범주",ch:"ch01",s:30,f:"<b>SPICE 5범주</b>",b:"고객-공급자(10) · 공학(9) · 지원(8) · 관리(4) · 조직(9)"}
,{id:"ch01-card-테일러링절차",ch:"ch01",s:30,f:"<b>테일러링 절차</b>",b:"특징 정의 → 표준 프로세스 선정·검증 → 상위 커스터마이징 → 세부 커스터마이징 → 문서화"}
,{id:"ch01-card-테일러링기준",ch:"ch01",s:30,f:"<b>테일러링 기준</b>",b:"내부 4개(목표 환경·요구사항·프로젝트 규모·보유 기술) / 외부 2개(법적 제약사항·표준 품질 기준)"}
,{id:"ch01-card-프레임워크특성",ch:"ch01",s:30,f:"<b>프레임워크 특성</b>",b:"모듈화 · 재사용성 · 확장성 · <b>제어의 역흐름(IoC)</b>"}
,{id:"ch02-card-데이터전환",ch:"ch02",s:32,f:"<b>데이터 전환</b>",b:"<b>ETL</b> — 추출(Extraction) → 변환(Transformation) → 적재(Load)"}
,{id:"ch02-card-오류상태",ch:"ch02",s:32,f:"<b>오류 상태</b>",b:"Open → Assigned → Fixed → Closed / Deferred / Classified"}
,{id:"ch02-card-DB정의",ch:"ch02",s:32,f:"<b>DB 정의</b>",b:"통합·저장·운영·공용 데이터"}
,{id:"ch02-card-DB특징",ch:"ch02",s:32,f:"<b>DB 특징</b>",b:"실시간 접근성 · 계속적인 변화 · 동시 공용 · 내용에 의한 참조"}
,{id:"ch02-card-DBMS필수기능",ch:"ch02",s:32,f:"<b>DBMS 필수 기능</b>",b:"<b>정의 · 조작 · 제어</b>"}
,{id:"ch02-card-스키마3층",ch:"ch02",s:32,f:"<b>스키마 3층</b>",b:"외부(여럿) · <b>개념(하나)</b> · 내부"}
,{id:"ch02-card-DB설계순서",ch:"ch02",s:32,f:"<b>DB 설계 순서</b>",b:"요구 조건 분석 → <b>개념 → 논리 → 물리</b> → 구현"}
,{id:"ch02-card-개념적설계산출물",ch:"ch02",s:32,f:"<b>개념적 설계 산출물</b>",b:"<b>E-R 다이어그램</b>"}
,{id:"ch02-card-데이터모델구성",ch:"ch02",s:32,f:"<b>데이터 모델 구성</b>",b:"<b>구조 · 연산 · 제약 조건</b>"}
,{id:"ch02-card-논리적데이터모델",ch:"ch02",s:32,f:"<b>논리적 데이터 모델</b>",b:"관계형(표) · 계층형(트리, 1:N) · 네트워크형(그래프, N:M)"}
,{id:"ch02-card-ER기호",ch:"ch02",s:32,f:"<b>E-R 기호</b>",b:"□ 개체 · ◇ 관계 · ○ 속성 · 밑줄 타원 기본키"}
,{id:"ch02-card-릴레이션용어",ch:"ch02",s:32,f:"<b>릴레이션 용어</b>",b:"차수 = <b>열 개수</b>, 카디널리티 = <b>행 개수</b>"}
,{id:"ch02-card-릴레이션특징",ch:"ch02",s:32,f:"<b>릴레이션 특징</b>",b:"튜플 유일성 · 튜플 무순서 · 속성 무순서 · 속성 원자성"}
,{id:"ch02-card-키",ch:"ch02",s:32,f:"<b>키</b>",b:"슈퍼(유일성) → 후보(유일+최소) → 기본(대표) → 대체(나머지) → 외래(참조)"}
,{id:"ch02-card-무결성",ch:"ch02",s:32,f:"<b>무결성</b>",b:"<b>개체=기본키(NULL 불가)</b>, <b>참조=외래키</b>, 도메인, 사용자 정의"}
,{id:"ch02-card-순수관계연산자",ch:"ch02",s:32,f:"<b>순수 관계 연산자</b>",b:"<b>σ Select(행)</b> · <b>π Project(열)</b> · ⋈ Join · ÷ Division"}
,{id:"ch02-card-관계대수vs해석",ch:"ch02",s:32,f:"<b>관계대수 vs 해석</b>",b:"대수 = <b>절차적(How)</b>, 해석 = <b>비절차적(What)</b>"}
,{id:"ch02-card-이상",ch:"ch02",s:32,f:"<b>이상</b>",b:"삽입 · 삭제 · 갱신"}
,{id:"ch02-card-함수종속",ch:"ch02",s:32,f:"<b>함수 종속</b>",b:"완전 · 부분 · 이행적"}
,{id:"ch02-card-정규화",ch:"ch02",s:32,f:"<b>정규화</b>",b:"<b>두부이걸다조</b> (도메인원자값·부분제거·이행제거·결정자·다치·조인)"}
,{id:"ch02-card-반정규화",ch:"ch02",s:32,f:"<b>반정규화</b>",b:"테이블 통합/분할 · 중복 테이블 추가 · 중복 속성 추가"}
,{id:"ch02-card-시스템카탈로그",ch:"ch02",s:32,f:"<b>시스템 카탈로그</b>",b:"데이터 사전. <b>검색은 가능, 직접 갱신 불가</b>"}
,{id:"ch02-card-트랜잭션ACID",ch:"ch02",s:32,f:"<b>트랜잭션 ACID</b>",b:"<b>원자성 · 일관성 · 독립성 · 영속성</b>"}
,{id:"ch02-card-CRUD우선순위",ch:"ch02",s:32,f:"<b>CRUD 우선순위</b>",b:"<b>C &gt; D &gt; U &gt; R</b>"}
,{id:"ch02-card-인덱스vs클러스터",ch:"ch02",s:32,f:"<b>인덱스 vs 클러스터</b>",b:"인덱스 = 분포도 <b>좁을 때</b>, 클러스터 = 분포도 <b>넓을 때</b>"}
,{id:"ch02-card-뷰",ch:"ch02",s:32,f:"<b>뷰</b>",b:"가상 테이블. 인덱스 불가, 정의 변경 불가, 기본 테이블 삭제 시 자동 삭제"}
,{id:"ch02-card-파티션",ch:"ch02",s:32,f:"<b>파티션</b>",b:"범위 · 해시 · 조합 · 목록 · 라운드 로빈"}
,{id:"ch02-card-분산DB투명성",ch:"ch02",s:32,f:"<b>분산 DB 투명성</b>",b:"<b>위중병장</b> (위치·중복·병행·장애)"}
,{id:"ch02-card-DB이중화",ch:"ch02",s:32,f:"<b>DB 이중화</b>",b:"Eager(즉시) / Lazy(커밋 후) · Active-Standby / Active-Active"}
,{id:"ch02-card-접근통제",ch:"ch02",s:32,f:"<b>접근통제</b>",b:"<b>DAC = 신원</b>, <b>MAC = 등급</b>, <b>RBAC = 역할</b>"}
,{id:"ch02-card-회복기법",ch:"ch02",s:32,f:"<b>회복 기법</b>",b:"지연 갱신(Undo 불필요) · 즉각 갱신 · 검사점 · 그림자 페이징(로그 없음)"}
,{id:"ch02-card-REDOUNDO",ch:"ch02",s:32,f:"<b>REDO / UNDO</b>",b:"REDO = 완료된 트랜잭션 재실행, UNDO = 미완료 트랜잭션 취소"}
,{id:"ch02-card-스토리지",ch:"ch02",s:32,f:"<b>스토리지</b>",b:"DAS(직접) · <b>NAS(파일 단위)</b> · <b>SAN(블록 단위)</b>"}
,{id:"ch02-card-논리물리변환",ch:"ch02",s:32,f:"<b>논리→물리 변환</b>",b:"개체→테이블, 속성→컬럼, 주식별자→기본키, 외부식별자→외래키"}
,{id:"ch02-card-자료구조",ch:"ch02",s:32,f:"<b>자료 구조</b>",b:"선형(배열·리스트·<b>스택</b>·<b>큐</b>·데크) / 비선형(<b>트리</b>·<b>그래프</b>)"}
,{id:"ch02-card-스택큐",ch:"ch02",s:32,f:"<b>스택 / 큐</b>",b:"스택 = <b>LIFO</b>, 큐 = <b>FIFO</b>"}
,{id:"ch02-card-트리운행",ch:"ch02",s:32,f:"<b>트리 운행</b>",b:"전위 <b>DLR</b> · 중위 <b>LDR</b> · 후위 <b>LRD</b>"}
,{id:"ch02-card-정렬Onlogn",ch:"ch02",s:32,f:"<b>정렬 O(n log n)</b>",b:"<b>힙 · 합병</b> (항상) / <b>퀵</b> (평균만, 최악 O(n²))"}
,{id:"ch02-card-해싱용어",ch:"ch02",s:32,f:"<b>해싱 용어</b>",b:"버킷 · 슬롯 · 충돌 · 동의어 · 오버플로"}
,{id:"ch03-card-통합구현구성요소",ch:"ch03",s:9,f:"<b>통합 구현 구성 요소</b>",b:"송신 시스템 · 수신 시스템 · <b>중계 시스템(선택)</b> · 연계 데이터 · 네트워크"}
,{id:"ch03-card-연계데이터식별절차",ch:"ch03",s:9,f:"<b>연계 데이터 식별 절차</b>",b:"범위·항목 정의 → 코드 변환·매핑 → 식별자·변경구분 추가 → 표현 방법 정의 → 정의서·명세서 작성"}
,{id:"ch03-card-데이터표현방법",ch:"ch03",s:9,f:"<b>데이터 표현 방법</b>",b:"태그 방식(XML) · 구분자 방식 · 고정 길이 방식"}
,{id:"ch03-card-직접연계방식",ch:"ch03",s:9,f:"<b>직접 연계 방식</b>",b:"<b>DB Link · DB Connection · JDBC · API/Open API · 하이퍼링크</b>"}
,{id:"ch03-card-간접연계방식",ch:"ch03",s:9,f:"<b>간접 연계 방식</b>",b:"<b>EAI · ESB · 소켓 · 웹 서비스</b>"}
,{id:"ch03-card-EAI구축유형",ch:"ch03",s:9,f:"<b>EAI 구축 유형</b>",b:"<b>Point-to-Point · Hub &amp; Spoke · Message Bus · Hybrid</b>"}
,{id:"ch03-card-EAIvsESB",ch:"ch03",s:9,f:"<b>EAI vs ESB</b>",b:"EAI = <b>애플리케이션 중심</b>, ESB = <b>서비스 중심(느슨한 결합)</b>"}
,{id:"ch03-card-오류유형",ch:"ch03",s:9,f:"<b>오류 유형</b>",b:"연계 시스템 오류 · 연계 데이터 오류 · 응용 애플리케이션 오류"}
,{id:"ch03-card-전송구간보안",ch:"ch03",s:9,f:"<b>전송 구간 보안</b>",b:"<b>VPN · SSL/TLS · IPSec</b>"}
,{id:"ch03-card-암복호화절차",ch:"ch03",s:9,f:"<b>암·복호화 절차</b>",b:"대상 선정 → 알고리즘·키 선정 → 송신 암호화 → 수신 복호화 → 검증"}
,{id:"ch03-card-XML",ch:"ch03",s:9,f:"<b>XML</b>",b:"W3C 표준. <b>태그 직접 정의</b>, 대소문자 구분, 루트 하나, 속성값 따옴표"}
,{id:"ch03-card-웹서비스3요소",ch:"ch03",s:9,f:"<b>웹 서비스 3요소</b>",b:"<b>SOAP</b>(메시지) · <b>WSDL</b>(기술) · <b>UDDI</b>(등록·검색)"}
,{id:"ch03-card-SOAP구조",ch:"ch03",s:9,f:"<b>SOAP 구조</b>",b:"<b>Envelope → Header → Body</b>"}
,{id:"ch03-card-REST",ch:"ch03",s:9,f:"<b>REST</b>",b:"HTTP URI 로 자원 명시 + HTTP 메서드로 처리. <b>무상태</b>, JSON 사용"}
,{id:"ch03-card-연계테스트절차",ch:"ch03",s:9,f:"<b>연계 테스트 절차</b>",b:"케이스 작성 → 환경 구축 → 수행 → 결과 검증"}
,{id:"ch04-card-개발언어선정기준",ch:"ch04",s:14,f:"<b>개발 언어 선정 기준</b>",b:"<b>적효이친범</b> (적정성·효율성·이식성·친밀성·범용성)"}
,{id:"ch04-card-아키텍처설계원리",ch:"ch04",s:14,f:"<b>아키텍처 설계 원리</b>",b:"<b>모듈화 · 추상화 · 단계적 분해 · 정보 은닉</b>"}
,{id:"ch04-card-추상화유형",ch:"ch04",s:14,f:"<b>추상화 유형</b>",b:"과정 · 데이터 · 제어"}
,{id:"ch04-card-협약에의한설계",ch:"ch04",s:14,f:"<b>협약에 의한 설계</b>",b:"선행 조건 · 결과 조건 · 불변 조건"}
,{id:"ch04-card-아키텍처패턴",ch:"ch04",s:14,f:"<b>아키텍처 패턴</b>",b:"레이어(OSI) · 클라이언트-서버 · <b>파이프-필터(UNIX 쉘)</b> · <b>MVC</b> · 마스터-슬레이브 · 브로커 · 피어투피어 · 이벤트버스 · 블랙보드 · 인터프리터"}
,{id:"ch04-card-객체지향구성요소",ch:"ch04",s:14,f:"<b>객체 지향 구성 요소</b>",b:"<b>객체 · 클래스 · 메시지</b>"}
,{id:"ch04-card-객체지향5원칙",ch:"ch04",s:14,f:"<b>객체 지향 5원칙</b>",b:"캡슐화 · 정보 은닉 · 추상화 · 상속성 · 다형성"}
,{id:"ch04-card-다형성종류",ch:"ch04",s:14,f:"<b>다형성 종류</b>",b:"<b>오버로딩</b>(같은 이름·다른 매개변수) / <b>오버라이딩</b>(재정의)"}
,{id:"ch04-card-설계원칙",ch:"ch04",s:14,f:"<b>설계 원칙</b>",b:"<b>SOLID</b> — SRP·OCP·LSP·ISP·DIP"}
,{id:"ch04-card-객체지향분석방법론",ch:"ch04",s:14,f:"<b>객체 지향 분석 방법론</b>",b:"<b>럼바우(OMT)</b> · 부치(미시·거시) · <b>Jacobson(유스케이스)</b> · Coad&amp;Yourdon(ERD) · Wirfs-Brock"}
,{id:"ch04-card-럼바우분석절차",ch:"ch04",s:14,f:"<b>럼바우 분석 절차</b>",b:"<b>객동기</b> — 객체(객체 다이어그램) → 동적(상태 다이어그램) → 기능(<b>DFD</b>)"}
,{id:"ch04-card-결합도약강",ch:"ch04",s:14,f:"<b>결합도(약→강)</b>",b:"<b>자스제외공내</b> (자료·스탬프·제어·외부·공통·내용)"}
,{id:"ch04-card-응집도강약",ch:"ch04",s:14,f:"<b>응집도(강→약)</b>",b:"<b>기순교절시논우</b> (기능·순차·교환·절차·시간·논리·우연)"}
,{id:"ch04-card-좋은설계",ch:"ch04",s:14,f:"<b>좋은 설계</b>",b:"결합도 <b>낮게</b>, 응집도 <b>높게</b>, 팬인 <b>높게</b>, 팬아웃 <b>낮게</b>"}
,{id:"ch04-card-IPC",ch:"ch04",s:14,f:"<b>IPC</b>",b:"공유 메모리 · 소켓 · 세마포어 · 파이프 · 메시지 큐"}
,{id:"ch04-card-공통모듈명세원칙",ch:"ch04",s:14,f:"<b>공통 모듈 명세 원칙</b>",b:"<b>정명완일추</b> (정확성·명확성·완전성·일관성·추적성)"}
,{id:"ch04-card-코드종류",ch:"ch04",s:14,f:"<b>코드 종류</b>",b:"순차 · 블록 · 10진 · 그룹 분류 · <b>연상</b> · <b>표의 숫자</b> · 합성"}
,{id:"ch04-card-GoF분류",ch:"ch04",s:14,f:"<b>GoF 분류</b>",b:"<b>생성 5 · 구조 7 · 행위 11 = 23</b>"}
,{id:"ch04-card-생성패턴5",ch:"ch04",s:14,f:"<b>생성 패턴 5</b>",b:"추상 팩토리 · 빌더 · 팩토리 메소드 · 프로토타입 · <b>싱글톤</b>"}
,{id:"ch04-card-구조패턴7",ch:"ch04",s:14,f:"<b>구조 패턴 7</b>",b:"<b>어댑터</b> · 브리지 · 컴포지트 · 데코레이터 · <b>퍼사드</b> · 플라이웨이트 · <b>프록시</b>"}
,{id:"ch04-card-행위패턴11",ch:"ch04",s:14,f:"<b>행위 패턴 11</b>",b:"책임 연쇄 · 커맨드 · 인터프리터 · 반복자 · 중재자 · 메멘토 · <b>옵서버</b> · 상태 · <b>전략</b> · 템플릿 메소드 · 방문자"}
,{id:"ch04-card-빌드도구",ch:"ch04",s:14,f:"<b>빌드 도구</b>",b:"<b>Ant(XML)</b> · <b>Maven(의존성)</b> · <b>Gradle(Groovy)</b> · <b>Jenkins(CI)</b>"}
,{id:"ch04-card-서버프레임워크",ch:"ch04",s:14,f:"<b>서버 프레임워크</b>",b:"Spring(JAVA) · Node.js(JS) · Django(Python) · Codeigniter(PHP) · Ruby on Rails(Ruby)"}
,{id:"ch04-card-보안취약점",ch:"ch04",s:14,f:"<b>보안 취약점</b>",b:"<b>SQL 삽입 · XSS · CSRF · 버퍼 오버플로</b>"}
,{id:"ch04-card-배치필수요소",ch:"ch04",s:14,f:"<b>배치 필수 요소</b>",b:"<b>대자견안성</b> (대용량·자동화·견고성·안정성·성능)"}
,{id:"ch04-card-배치스케줄러",ch:"ch04",s:14,f:"<b>배치 스케줄러</b>",b:"스프링 배치 · Quartz · <b>Cron(리눅스)</b>"}
,{id:"ch04-card-Cron순서",ch:"ch04",s:14,f:"<b>Cron 순서</b>",b:"<b>분 시 일 월 요일</b>"}
,{id:"ch05-card-요구사항검증방법",ch:"ch05",s:13,f:"<b>요구사항 검증 방법</b>",b:"<b>동료 검토</b>(작성자가 설명) · <b>워크스루</b>(사전 배포 후 회의) · <b>인스펙션</b>(작성자 제외 전문가)"}
,{id:"ch05-card-베이스라인",ch:"ch05",s:13,f:"<b>베이스라인</b>",b:"검토·합의되어 <b>변경을 통제해야 할 시점의 기준</b>이 되는 산출물"}
,{id:"ch05-card-인터페이스표준항목",ch:"ch05",s:13,f:"<b>인터페이스 표준 항목</b>",b:"<b>시스템 공통부</b> · <b>거래 공통부</b>"}
,{id:"ch05-card-통신유형",ch:"ch05",s:13,f:"<b>통신 유형</b>",b:"단방향 · <b>동기</b>(응답 대기) · <b>비동기</b>(응답 대기 안 함)"}
,{id:"ch05-card-처리유형",ch:"ch05",s:13,f:"<b>처리 유형</b>",b:"실시간 · 지연 처리 · 배치"}
,{id:"ch05-card-미들웨어종류",ch:"ch05",s:13,f:"<b>미들웨어 종류</b>",b:"DB · <b>RPC</b>(원격 프로시저) · <b>MOM</b>(비동기 메시지) · <b>TP-Monitor</b>(예약 업무) · <b>ORB</b>(CORBA, 객체) · <b>WAS</b>(동적 콘텐츠)"}
,{id:"ch05-card-인터페이스구현방법",ch:"ch05",s:13,f:"<b>인터페이스 구현 방법</b>",b:"<b>데이터 통신</b>(JSON/XML 파싱) · <b>인터페이스 엔티티</b>(테이블 이용)"}
,{id:"ch05-card-JSON",ch:"ch05",s:13,f:"<b>JSON</b>",b:"속성-값 쌍. <b>AJAX</b> 에서 XML 을 대체. XML 보다 가볍고 빠름"}
,{id:"ch05-card-계층별보안",ch:"ch05",s:13,f:"<b>계층별 보안</b>",b:"네트워크(<b>IPSec·SSL/TLS·S-HTTP</b>) · 애플리케이션(보안 가이드) · DB(암호화)"}
,{id:"ch05-card-DB암호화기법",ch:"ch05",s:13,f:"<b>DB 암호화 기법</b>",b:"<b>API</b>(애플리케이션 레벨) · <b>Plug-In</b>(DB 레벨) · <b>TDE</b> · Hybrid"}
,{id:"ch05-card-구현검증도구",ch:"ch05",s:13,f:"<b>구현 검증 도구</b>",b:"<b>xUnit</b> · <b>STAF</b> · <b>FitNesse</b>(웹 기반) · <b>NTAF</b>(FitNesse+STAF, NHN) · <b>Selenium</b>(웹) · watir(Ruby)"}
,{id:"ch05-card-감시도구",ch:"ch05",s:13,f:"<b>감시 도구</b>",b:"<b>APM</b> — 스카우터(Scouter) · 제니퍼(Jennifer)"}
,{id:"ch06-card-UI구분",ch:"ch06",s:7,f:"<b>UI 구분</b>",b:"<b>CLI</b>(텍스트) · <b>GUI</b>(그래픽) · <b>NUI</b>(말·행동) · <b>VUI</b>(음성) · <b>OUI</b>(입출력 일체)"}
,{id:"ch06-card-UI기본원칙",ch:"ch06",s:7,f:"<b>UI 기본 원칙</b>",b:"<b>직유학유</b> — 직관성 · 유효성 · 학습성 · 유연성"}
,{id:"ch06-card-웹3요소",ch:"ch06",s:7,f:"<b>웹 3요소</b>",b:"웹 표준 · 웹 접근성 · 웹 호환성"}
,{id:"ch06-card-와이어프레임",ch:"ch06",s:7,f:"<b>와이어프레임</b>",b:"기획 초기, <b>뼈대만</b> 설계"}
,{id:"ch06-card-목업",ch:"ch06",s:7,f:"<b>목업</b>",b:"실제 화면과 유사한 <b>정적 모형</b>. 동작 안 함"}
,{id:"ch06-card-프로토타입",ch:"ch06",s:7,f:"<b>프로토타입</b>",b:"<b>인터랙션 적용, 동적 모형</b>. 테스트 가능"}
,{id:"ch06-card-스토리보드",ch:"ch06",s:7,f:"<b>스토리보드</b>",b:"와이어프레임 + 설명 + 화면 이동 흐름 = <b>최종 작업 지침서</b>"}
,{id:"ch06-card-정황시나리오",ch:"ch06",s:7,f:"<b>정황 시나리오</b>",b:"가장 기초적인 시나리오. <b>육하원칙</b>에 따라 작성"}
,{id:"ch06-card-ISOIEC9126",ch:"ch06",s:7,f:"<b>ISO/IEC 9126</b>",b:"<b>기신사효유이</b> — 기능성·신뢰성·사용성·효율성·유지보수성·이식성"}
,{id:"ch06-card-기능성하위",ch:"ch06",s:7,f:"<b>기능성 하위</b>",b:"적절성 · 정밀성 · <b>상호 운용성</b> · 보안성 · 준수성"}
,{id:"ch06-card-신뢰성하위",ch:"ch06",s:7,f:"<b>신뢰성 하위</b>",b:"<b>성숙성 · 고장 허용성 · 회복성</b>"}
,{id:"ch06-card-ISOIEC12119",ch:"ch06",s:7,f:"<b>ISO/IEC 12119</b>",b:"<b>패키지 소프트웨어</b> 품질 요구사항 및 테스트"}
,{id:"ch06-card-ISOIEC14598",ch:"ch06",s:7,f:"<b>ISO/IEC 14598</b>",b:"품질 <b>측정·평가 절차</b>. 반복성·재현성·공정성·객관성"}
,{id:"ch06-card-ISOIEC25000",ch:"ch06",s:7,f:"<b>ISO/IEC 25000</b>",b:"<b>SQuaRE</b>. 9126 + 14598 + 12119 <b>통합</b>"}
,{id:"ch06-card-UI설계서순서",ch:"ch06",s:7,f:"<b>UI 설계서 순서</b>",b:"표지 → 개정 이력 → 요구사항 정의서 → 시스템 구조 → 사이트 맵 → 프로세스 정의서 → 화면 설계"}
,{id:"ch06-card-UI시나리오원칙",ch:"ch06",s:7,f:"<b>UI 시나리오 원칙</b>",b:"완전성 · 일관성 · 이해성 · 가독성 · 수정 용이성 · 추적 용이성"}
,{id:"ch06-card-HCI",ch:"ch06",s:7,f:"<b>HCI</b>",b:"사람이 시스템을 편리·안전하게 쓰도록 연구하는 학문. 목표는 <b>최적의 UX</b>"}
,{id:"ch06-card-UX특징",ch:"ch06",s:7,f:"<b>UX 특징</b>",b:"<b>주관성 · 정황성 · 총체성</b>"}
,{id:"ch06-card-UIvsUX",ch:"ch06",s:7,f:"<b>UI vs UX</b>",b:"UI = <b>수단(장치·소프트웨어)</b>, UX = <b>총체적 경험</b>. <b>UI ⊂ UX</b>"}
,{id:"ch06-card-감성공학접근",ch:"ch06",s:7,f:"<b>감성공학 접근</b>",b:"1류(정성적, <b>SD법</b>) · 2류(생활·인지 특성) · 3류(<b>생리적 감각 측정</b>)"}
,{id:"ch07-card-검증vs확인",ch:"ch07",s:14,f:"<b>검증 vs 확인</b>",b:"<b>검증(Verification) = 개발자 시각</b>, <b>확인(Validation) = 사용자 시각</b>"}
,{id:"ch07-card-테스트기본원리",ch:"ch07",s:14,f:"<b>테스트 기본 원리</b>",b:"<b>파레토(20%/80%)</b> · <b>살충제 패러독스</b> · 완벽한 테스트 불가능 · 오류-부재의 궤변 · 정황 의존"}
,{id:"ch07-card-실행여부별",ch:"ch07",s:14,f:"<b>실행 여부별</b>",b:"<b>정적</b>(워크스루·인스펙션·코드 검사) / <b>동적</b>(블랙박스·화이트박스)"}
,{id:"ch07-card-테스트기반별",ch:"ch07",s:14,f:"<b>테스트 기반별</b>",b:"명세 기반(동등 분할·경계값) · 구조 기반(구문·결정·조건) · 경험 기반(에러 추정·체크리스트·탐색적)"}
,{id:"ch07-card-목적별",ch:"ch07",s:14,f:"<b>목적별</b>",b:"<b>회안강성구회병</b> (회복·안전·강도·성능·구조·회귀·병행)"}
,{id:"ch07-card-화이트박스종류",ch:"ch07",s:14,f:"<b>화이트박스 종류</b>",b:"<b>기초 경로 검사</b> · 제어 구조 검사(조건·루프·데이터 흐름)"}
,{id:"ch07-card-화이트박스검증기준",ch:"ch07",s:14,f:"<b>화이트박스 검증 기준</b>",b:"<b>문장 → 분기(결정) → 조건 → 분기/조건</b>"}
,{id:"ch07-card-분기vs조건",ch:"ch07",s:14,f:"<b>분기 vs 조건</b>",b:"분기 = 조건문 <b>전체</b> 결과 T/F, 조건 = <b>개별 조건식</b> 각각 T/F"}
,{id:"ch07-card-블랙박스종류",ch:"ch07",s:14,f:"<b>블랙박스 종류</b>",b:"<b>동치 분할 · 경계값 분석 · 원인-효과 그래프 · 오류 예측 · 비교 검사</b>"}
,{id:"ch07-card-화이트vs블랙",ch:"ch07",s:14,f:"<b>화이트 vs 블랙</b>",b:"화이트 = 내부 구조, 테스트 <b>초기</b> / 블랙 = 기능, 테스트 <b>후반</b>"}
,{id:"ch07-card-V모델대응",ch:"ch07",s:14,f:"<b>V-모델 대응</b>",b:"요구사항 분석↔<b>인수</b>, 분석↔<b>시스템</b>, 설계↔<b>통합</b>, 구현↔<b>단위</b>"}
,{id:"ch07-card-알파vs베타",ch:"ch07",s:14,f:"<b>알파 vs 베타</b>",b:"<b>알파 = 개발자 장소(통제됨)</b>, <b>베타 = 사용자 장소(통제 안 됨)</b>"}
,{id:"ch07-card-하향식통합",ch:"ch07",s:14,f:"<b>하향식 통합</b>",b:"상위→하위. <b>스텁(Stub)</b> 필요. 깊이 우선/넓이 우선"}
,{id:"ch07-card-상향식통합",ch:"ch07",s:14,f:"<b>상향식 통합</b>",b:"하위→상위. <b>드라이버(Driver)</b> 필요. <b>클러스터</b> 구성"}
,{id:"ch07-card-혼합식",ch:"ch07",s:14,f:"<b>혼합식</b>",b:"<b>샌드위치식</b>. 하위는 상향식, 상위는 하향식"}
,{id:"ch07-card-테스트오라클",ch:"ch07",s:14,f:"<b>테스트 오라클</b>",b:"<b>참 · 샘플링 · 추정(휴리스틱) · 일관성 검사</b>"}
,{id:"ch07-card-오류결함실패",ch:"ch07",s:14,f:"<b>오류/결함/실패</b>",b:"에러(사람 실수) → 결함(제품 결함) → 실패(결과 불일치)"}
,{id:"ch07-card-결함상태",ch:"ch07",s:14,f:"<b>결함 상태</b>",b:"Open → Reviewed → Assigned → Resolved → Closed / Deferred / Clarified"}
,{id:"ch07-card-결함측정지표",ch:"ch07",s:14,f:"<b>결함 측정 지표</b>",b:"결함 <b>분포</b> · 결함 <b>추세</b> · 결함 <b>에이징</b>"}
,{id:"ch07-card-자동화도구유형",ch:"ch07",s:14,f:"<b>자동화 도구 유형</b>",b:"정적 분석 · 테스트 실행 · 성능 테스트 · 테스트 통제 · <b>테스트 하네스</b>"}
,{id:"ch07-card-테스트하네스구성",ch:"ch07",s:14,f:"<b>테스트 하네스 구성</b>",b:"<b>드라이버 · 스텁 · 슈트 · 케이스 · 스크립트 · 목 오브젝트</b>"}
,{id:"ch07-card-성능측정지표",ch:"ch07",s:14,f:"<b>성능 측정 지표</b>",b:"<b>처응경자</b> (처리량·응답 시간·경과 시간·자원 사용률)"}
,{id:"ch07-card-성능테스트도구",ch:"ch07",s:14,f:"<b>성능 테스트 도구</b>",b:"<b>JMeter · LoadUI · OpenSTA</b>"}
,{id:"ch07-card-순환복잡도",ch:"ch07",s:14,f:"<b>순환 복잡도</b>",b:"<b>V(G) = E − N + 2</b> = <b>분기점 수 + 1</b>. 10 이하 권장"}
,{id:"ch07-card-클린코드원칙",ch:"ch07",s:14,f:"<b>클린 코드 원칙</b>",b:"<b>가단의중추</b> (가독성·단순성·의존성 배제·중복성 최소화·추상화)"}
,{id:"ch07-card-정적분석도구",ch:"ch07",s:14,f:"<b>정적 분석 도구</b>",b:"pmd · cppcheck · <b>SonarQube</b> · checkstyle · ccm · cobertura"}
,{id:"ch07-card-동적분석도구",ch:"ch07",s:14,f:"<b>동적 분석 도구</b>",b:"<b>Avalanche · Valgrind</b>"}
,{id:"ch08-card-DDL",ch:"ch08",s:17,f:"<b>DDL</b>",b:"<b>CREATE · ALTER · DROP</b> — 구조 정의"}
,{id:"ch08-card-DML",ch:"ch08",s:17,f:"<b>DML</b>",b:"<b>SELECT · INSERT · DELETE · UPDATE</b> — 데이터 조작"}
,{id:"ch08-card-DCL",ch:"ch08",s:17,f:"<b>DCL</b>",b:"<b>GRANT · REVOKE · COMMIT · ROLLBACK</b> — 보안·무결성·회복"}
,{id:"ch08-card-참조무결성옵션",ch:"ch08",s:17,f:"<b>참조 무결성 옵션</b>",b:"NO ACTION · <b>CASCADE</b> · SET NULL · SET DEFAULT"}
,{id:"ch08-card-DROP옵션",ch:"ch08",s:17,f:"<b>DROP 옵션</b>",b:"<b>CASCADE</b>(같이 삭제) · <b>RESTRICT</b>(참조 중이면 취소)"}
,{id:"ch08-card-DROPTRUNCATEDELETE",ch:"ch08",s:17,f:"<b>DROP/TRUNCATE/DELETE</b>",b:"DROP=구조+데이터 / TRUNCATE=데이터만(롤백X) / DELETE=행 단위(롤백O)"}
,{id:"ch08-card-사용자등급",ch:"ch08",s:17,f:"<b>사용자 등급</b>",b:"<b>DBA · RESOURCE · CONNECT</b>"}
,{id:"ch08-card-GRANT옵션",ch:"ch08",s:17,f:"<b>GRANT 옵션</b>",b:"<b>WITH GRANT OPTION</b>(재부여 권한까지)"}
,{id:"ch08-card-TCL",ch:"ch08",s:17,f:"<b>TCL</b>",b:"<b>COMMIT · ROLLBACK · SAVEPOINT</b>"}
,{id:"ch08-card-SELECT절순서",ch:"ch08",s:17,f:"<b>SELECT 절 순서</b>",b:"SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY"}
,{id:"ch08-card-SELECT실행순서",ch:"ch08",s:17,f:"<b>SELECT 실행 순서</b>",b:"<b>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</b>"}
,{id:"ch08-card-PREDICATE",ch:"ch08",s:17,f:"<b>PREDICATE</b>",b:"ALL(기본) · <b>DISTINCT</b>(중복 제거)"}
,{id:"ch08-card-기타연산자",ch:"ch08",s:17,f:"<b>기타 연산자</b>",b:"BETWEEN · IN · <b>LIKE(<code>%</code> 문자열, <code>_</code> 한 문자)</b> · <b>IS NULL</b>"}
,{id:"ch08-card-그룹함수",ch:"ch08",s:17,f:"<b>그룹 함수</b>",b:"COUNT · SUM · AVG · MAX · MIN · STDDEV · VARIANCE"}
,{id:"ch08-card-WHEREvsHAVING",ch:"ch08",s:17,f:"<b>WHERE vs HAVING</b>",b:"WHERE = <b>그룹 전(행)</b>, HAVING = <b>그룹 후(그룹)</b>"}
,{id:"ch08-card-집합연산자",ch:"ch08",s:17,f:"<b>집합 연산자</b>",b:"<b>UNION</b>(중복 제거) · <b>UNION ALL</b>(중복 포함) · INTERSECT · EXCEPT"}
,{id:"ch08-card-JOIN분류",ch:"ch08",s:17,f:"<b>JOIN 분류</b>",b:"INNER(EQUI·NON-EQUI) / OUTER(LEFT·RIGHT·FULL) / SELF / CROSS"}
,{id:"ch08-card-자연조인",ch:"ch08",s:17,f:"<b>자연 조인</b>",b:"EQUI JOIN 에서 <b>중복 속성을 한 번만</b> 표기"}
,{id:"ch08-card-순위함수",ch:"ch08",s:17,f:"<b>순위 함수</b>",b:"ROW_NUMBER(1,2,3,4) · <b>RANK(1,2,2,4)</b> · <b>DENSE_RANK(1,2,2,3)</b>"}
,{id:"ch08-card-프로시저구성",ch:"ch08",s:17,f:"<b>프로시저 구성</b>",b:"DECLARE · BEGIN/END · CONTROL · SQL · EXCEPTION · <b>TRANSACTION</b>"}
,{id:"ch08-card-함수구성",ch:"ch08",s:17,f:"<b>함수 구성</b>",b:"프로시저와 같되 TRANSACTION 대신 <b>RETURN</b>"}
,{id:"ch08-card-트리거",ch:"ch08",s:17,f:"<b>트리거</b>",b:"이벤트 발생 시 자동 실행. <b>DCL 사용 불가</b>. BEFORE/AFTER + NEW/OLD"}
,{id:"ch08-card-프로시저vs함수",ch:"ch08",s:17,f:"<b>프로시저 vs 함수</b>",b:"함수는 <b>반드시 RETURN</b>, SQL 문 내에서 직접 호출"}
,{id:"ch08-card-커서순서",ch:"ch08",s:17,f:"<b>커서 순서</b>",b:"<b>OPEN → FETCH → CLOSE</b>"}
,{id:"ch08-card-커서종류",ch:"ch08",s:17,f:"<b>커서 종류</b>",b:"<b>묵시적</b>(DBMS 자동) · <b>명시적</b>(사용자 정의, 여러 행)"}
,{id:"ch08-card-DBMS접속기술",ch:"ch08",s:17,f:"<b>DBMS 접속 기술</b>",b:"<b>JDBC</b>(Java) · <b>ODBC</b>(언어 무관, MS) · <b>MyBatis</b>(SQL Mapping)"}
,{id:"ch08-card-동적SQL",ch:"ch08",s:17,f:"<b>동적 SQL</b>",b:"실행 시점에 구성. 유연하나 <b>느리고 SQL 삽입에 취약</b>"}
,{id:"ch08-card-ORM",ch:"ch08",s:17,f:"<b>ORM</b>",b:"객체↔테이블 자동 매핑. Hibernate/JPA. 한계는 <b>성능·복잡 쿼리</b>"}
,{id:"ch08-card-옵티마이저",ch:"ch08",s:17,f:"<b>옵티마이저</b>",b:"<b>RBO</b>(규칙 기반) · <b>CBO</b>(비용 기반, 통계 정보)"}
,{id:"ch08-card-실행계획확인",ch:"ch08",s:17,f:"<b>실행 계획 확인</b>",b:"<b>EXPLAIN PLAN</b>"}
,{id:"ch08-card-조인기법",ch:"ch08",s:17,f:"<b>조인 기법</b>",b:"Nested Loop(소량) · Sort Merge(정렬) · <b>Hash(대량)</b>"}
,{id:"ch09-card-보안3대요소",ch:"ch09",s:15,f:"<b>보안 3대 요소</b>",b:"<b>기무가</b> — 기밀성 · 무결성 · 가용성 (CIA)"}
,{id:"ch09-card-SecureSDLC방법론",ch:"ch09",s:15,f:"<b>Secure SDLC 방법론</b>",b:"<b>CLASP</b> · <b>SDL</b>(MS) · <b>Seven Touchpoints</b>"}
,{id:"ch09-card-보안점검항목7",ch:"ch09",s:15,f:"<b>보안 점검 항목 7</b>",b:"<b>입보시에코캡API</b> — 입력 검증·보안 기능·시간과 상태·에러 처리·코드 오류·캡슐화·API 오용"}
,{id:"ch09-card-입력검증약점",ch:"ch09",s:15,f:"<b>입력 검증 약점</b>",b:"<b>SQL 삽입 · XSS · 경로 조작 · OS 명령어 삽입 · 위험한 파일 업로드 · 버퍼 오버플로</b>"}
,{id:"ch09-card-SQL삽입대응",ch:"ch09",s:15,f:"<b>SQL 삽입 대응</b>",b:"<b>정적 쿼리(PreparedStatement)</b> 사용"}
,{id:"ch09-card-XSS대응",ch:"ch09",s:15,f:"<b>XSS 대응</b>",b:"<b>HTML 특수문자 치환</b>"}
,{id:"ch09-card-시간상태약점",ch:"ch09",s:15,f:"<b>시간·상태 약점</b>",b:"<b>경쟁 조건(Race Condition, TOCTOU)</b> · 종료되지 않는 반복문"}
,{id:"ch09-card-코드오류약점",ch:"ch09",s:15,f:"<b>코드 오류 약점</b>",b:"<b>널 포인터 역참조</b> · 부적절한 자원 해제 · 초기화되지 않은 변수"}
,{id:"ch09-card-대칭키블록",ch:"ch09",s:15,f:"<b>대칭키 블록</b>",b:"<b>DES(64/56) · AES(128) · SEED(KISA) · ARIA(국정원) · IDEA(64/128)</b>"}
,{id:"ch09-card-대칭키스트림",ch:"ch09",s:15,f:"<b>대칭키 스트림</b>",b:"<b>RC4 · LFSR</b>"}
,{id:"ch09-card-비대칭키",ch:"ch09",s:15,f:"<b>비대칭키</b>",b:"<b>RSA(소인수분해) · ECC(타원곡선) · Diffie-Hellman(키 교환) · Rabin · DSA</b>"}
,{id:"ch09-card-해시단방향",ch:"ch09",s:15,f:"<b>해시(단방향)</b>",b:"<b>MD5(128) · SHA(160~512) · HAS-160 · N-NASH · SNEFRU</b>"}
,{id:"ch09-card-키개수",ch:"ch09",s:15,f:"<b>키 개수</b>",b:"대칭키 <b>N(N−1)/2</b>, 공개키 <b>2N</b>"}
,{id:"ch09-card-DoS공격",ch:"ch09",s:15,f:"<b>DoS 공격</b>",b:"<b>Ping of Death</b>(큰 패킷) · <b>SMURFING</b> · <b>SYN Flooding</b>(3-Way-Handshake) · TearDrop · <b>LAND</b>(송수신 IP 동일)"}
,{id:"ch09-card-DDoS도구",ch:"ch09",s:15,f:"<b>DDoS 도구</b>",b:"트리누 · TFN · 스타첼드라트"}
,{id:"ch09-card-웜vs트로이목마",ch:"ch09",s:15,f:"<b>웜 vs 트로이 목마</b>",b:"웜 = <b>자기 복제 O</b>, 트로이 목마 = <b>자기 복제 X</b>"}
,{id:"ch09-card-제로데이공격",ch:"ch09",s:15,f:"<b>제로 데이 공격</b>",b:"<b>패치 발표 전</b>에 이뤄지는 공격"}
,{id:"ch09-card-스니핑vs스푸핑",ch:"ch09",s:15,f:"<b>스니핑 vs 스푸핑</b>",b:"스니핑 = <b>엿봄</b>, 스푸핑 = <b>위조·가장</b>"}
,{id:"ch09-card-인증유형",ch:"ch09",s:15,f:"<b>인증 유형</b>",b:"<b>지소생위행</b> — 지식·소유·생체·위치·행위"}
,{id:"ch09-card-커버로스",ch:"ch09",s:15,f:"<b>커버로스</b>",b:"<b>대칭키 기반 티켓 인증</b> 프로토콜"}
,{id:"ch09-card-리눅스로그",ch:"ch09",s:15,f:"<b>리눅스 로그</b>",b:"<b>wtmp(성공)</b> · <b>btmp(실패)</b> · utmp(현재) · lastlog · secure"}
,{id:"ch09-card-보안솔루션",ch:"ch09",s:15,f:"<b>보안 솔루션</b>",b:"방화벽 · <b>IDS</b>(탐지) · <b>IPS</b>(차단) · DLP · 웹 방화벽 · VPN · NAC · ESM · <b>SIEM</b>"}
,{id:"ch09-card-IDS위치별",ch:"ch09",s:15,f:"<b>IDS 위치별</b>",b:"<b>HIDS</b>(호스트) · <b>NIDS</b>(네트워크)"}
,{id:"ch09-card-IDS탐지별",ch:"ch09",s:15,f:"<b>IDS 탐지별</b>",b:"<b>오용 탐지</b>(알려진 패턴) · <b>이상 탐지</b>(정상에서 벗어난 행위)"}
,{id:"ch09-card-ISO27001",ch:"ch09",s:15,f:"<b>ISO 27001</b>",b:"정보보호 관리 체계(<b>ISMS</b>) 국제 표준"}
,{id:"ch10-card-C자료형크기",ch:"ch10",s:13,f:"<b>C 자료형 크기</b>",b:"char 1 · short 2 · <b>int 4</b> · float 4 · <b>double 8</b> Byte"}
,{id:"ch10-card-기억클래스",ch:"ch10",s:13,f:"<b>기억 클래스</b>",b:"auto(스택) · register(레지스터) · <b>static</b>(데이터 영역) · extern"}
,{id:"ch10-card-연산자우선순위",ch:"ch10",s:13,f:"<b>연산자 우선순위</b>",b:"<b>단산시관비논삼대순</b>"}
,{id:"ch10-card-증감연산자",ch:"ch10",s:13,f:"<b>증감 연산자</b>",b:"<code>++a</code> = <b>먼저 증가</b>, <code>a++</code> = <b>먼저 사용</b>"}
,{id:"ch10-card-switch",ch:"ch10",s:13,f:"<b>switch</b>",b:"<b><code>break</code> 없으면 다음 case 까지 실행</b>"}
,{id:"ch10-card-whilevsdowhile",ch:"ch10",s:13,f:"<b>while vs do~while</b>",b:"do~while 은 <b>최소 한 번 실행</b>"}
,{id:"ch10-card-breakvscontinue",ch:"ch10",s:13,f:"<b>break vs continue</b>",b:"break = <b>반복 종료</b>, continue = <b>다음 반복으로</b>"}
,{id:"ch10-card-배열인덱스",ch:"ch10",s:13,f:"<b>배열 인덱스</b>",b:"<b>0부터 시작</b>. <code>arr[5]</code> 는 인덱스 0~4"}
,{id:"ch10-card-포인터연산자",ch:"ch10",s:13,f:"<b>포인터 연산자</b>",b:"<code>&amp;</code> = 주소, <code>*</code> = 값(참조)"}
,{id:"ch10-card-포인터배열등가",ch:"ch10",s:13,f:"<b>포인터-배열 등가</b>",b:"**<code>*(p+n)</code> = <code>p[n]</code> = <code>arr[n]</code>**"}
,{id:"ch10-card-구조체접근",ch:"ch10",s:13,f:"<b>구조체 접근</b>",b:"변수는 <b><code>.</code></b>, 포인터는 <b><code>-&gt;</code></b>"}
,{id:"ch10-card-매개변수전달",ch:"ch10",s:13,f:"<b>매개변수 전달</b>",b:"<b>Call by Value</b>(원본 유지) / <b>Call by Reference</b>(원본 변경)"}
,{id:"ch10-card-Java접근제어자",ch:"ch10",s:13,f:"<b>Java 접근 제어자</b>",b:"<b>private &lt; default &lt; protected &lt; public</b>"}
,{id:"ch10-card-오버로딩vs오버라이딩",ch:"ch10",s:13,f:"<b>오버로딩 vs 오버라이딩</b>",b:"오버로딩 = 같은 클래스·<b>매개변수 다름</b> / 오버라이딩 = 상속 관계·<b>시그니처 같음</b>"}
,{id:"ch10-card-추상클래스vs인터페이스",ch:"ch10",s:13,f:"<b>추상 클래스 vs 인터페이스</b>",b:"추상 = <b>단일 상속(extends)</b> / 인터페이스 = <b>다중 구현(implements)</b>"}
,{id:"ch10-card-Python자료형",ch:"ch10",s:13,f:"<b>Python 자료형</b>",b:"리스트<code>[]</code>(변경O) · <b>튜플<code>()</code>(변경X)</b> · 딕셔너리<code>{k:v}</code> · <b>세트<code>{}</code>(중복X)</b>"}
,{id:"ch10-card-Python슬라이싱",ch:"ch10",s:13,f:"<b>Python 슬라이싱</b>",b:"<code>a[시작:끝]</code> → <b>끝은 미포함</b>. <code>a[::-1]</code> = 역순"}
,{id:"ch10-card-Pythonrange",ch:"ch10",s:13,f:"<b>Python range</b>",b:"<code>range(a,b)</code> = <b>a 이상 b 미만</b>"}
,{id:"ch10-card-절차적언어",ch:"ch10",s:13,f:"<b>절차적 언어</b>",b:"<b>C(데니스 리치, UNIX)</b> · ALGOL · COBOL(사무) · FORTRAN(과학) · PASCAL"}
,{id:"ch10-card-객체지향언어",ch:"ch10",s:13,f:"<b>객체 지향 언어</b>",b:"<b>JAVA(JVM, 독립적)</b> · C++ · <b>Smalltalk(최초 GUI)</b>"}
,{id:"ch10-card-서버용스크립트",ch:"ch10",s:13,f:"<b>서버용 스크립트</b>",b:"<b>ASP(Windows만) · JSP(Java) · PHP · Python</b>"}
,{id:"ch10-card-클라이언트용스크립트",ch:"ch10",s:13,f:"<b>클라이언트용 스크립트</b>",b:"<b>JavaScript · VBScript</b>"}
,{id:"ch10-card-선언형언어",ch:"ch10",s:13,f:"<b>선언형 언어</b>",b:"함수형(<b>LISP, ML, Haskell</b>) · 논리형(<b>PROLOG</b>) · HTML · XML · SQL"}
,{id:"ch10-card-C헤더파일",ch:"ch10",s:13,f:"<b>C 헤더 파일</b>",b:"<b>stdio.h</b>(입출력) · <b>math.h</b>(수학) · <b>string.h</b>(문자열) · <b>stdlib.h</b>(변환·메모리) · time.h"}
,{id:"ch10-card-Java패키지",ch:"ch10",s:13,f:"<b>Java 패키지</b>",b:"<b>java.lang(자동 포함)</b> · java.util · java.io · java.net · java.awt"}
,{id:"ch10-card-예외처리블록",ch:"ch10",s:13,f:"<b>예외 처리 블록</b>",b:"<b>try - catch - finally</b>. <b>finally 는 항상 실행</b>"}
,{id:"ch10-card-주요예외",ch:"ch10",s:13,f:"<b>주요 예외</b>",b:"ArithmeticException(0 나누기) · <b>ArrayIndexOutOfBoundsException</b> · <b>NullPointerException</b> · NumberFormatException"}
,{id:"ch11-card-OS성능평가",ch:"ch11",s:15,f:"<b>OS 성능 평가</b>",b:"<b>처리 능력·사용 가능도·신뢰도는 향상</b>, <b>반환 시간은 단축</b>"}
,{id:"ch11-card-UNIX구성",ch:"ch11",s:15,f:"<b>UNIX 구성</b>",b:"<b>커널</b>(하드웨어 관리) · <b>쉘</b>(명령어 해석) · 유틸리티"}
,{id:"ch11-card-기억장치전략",ch:"ch11",s:15,f:"<b>기억장치 전략</b>",b:"<b>반입 · 배치 · 교체</b>"}
,{id:"ch11-card-배치전략",ch:"ch11",s:15,f:"<b>배치 전략</b>",b:"<b>최초 적합 · 최적 적합</b>(단편화 최소) · <b>최악 적합</b>(단편화 최대)"}
,{id:"ch11-card-단편화",ch:"ch11",s:15,f:"<b>단편화</b>",b:"내부(남는 공간) / 외부(못 들어감). 해결 = <b>통합 · 압축</b>"}
,{id:"ch11-card-가상기억장치",ch:"ch11",s:15,f:"<b>가상기억장치</b>",b:"<b>페이징</b>(같은 크기, 내부 단편화) / <b>세그먼테이션</b>(다른 크기, 외부 단편화)"}
,{id:"ch11-card-페이지교체",ch:"ch11",s:15,f:"<b>페이지 교체</b>",b:"<b>OPT · FIFO · LRU · LFU · NUR · SCR</b>"}
,{id:"ch11-card-Locality",ch:"ch11",s:15,f:"<b>Locality</b>",b:"<b>시간 구역성</b>(반복·스택) / <b>공간 구역성</b>(배열·순차)"}
,{id:"ch11-card-스래싱",ch:"ch11",s:15,f:"<b>스래싱</b>",b:"페이지 교체 시간 &gt; 처리 시간. <b>워킹 셋·PFF</b> 로 방지"}
,{id:"ch11-card-프로세스상태전이",ch:"ch11",s:15,f:"<b>프로세스 상태 전이</b>",b:"<b>Dispatch</b>(준비→실행) · <b>Timer Runout</b>(실행→준비) · <b>Block</b>(실행→대기) · <b>Wake Up</b>(대기→준비)"}
,{id:"ch11-card-비선점스케줄링",ch:"ch11",s:15,f:"<b>비선점 스케줄링</b>",b:"<b>FCFS · SJF · HRN · 우선순위 · 기한부</b>"}
,{id:"ch11-card-선점스케줄링",ch:"ch11",s:15,f:"<b>선점 스케줄링</b>",b:"<b>Round Robin · SRT · 다단계 큐 · 다단계 피드백 큐</b>"}
,{id:"ch11-card-HRN공식",ch:"ch11",s:15,f:"<b>HRN 공식</b>",b:"<b>(대기 시간 + 서비스 시간) ÷ 서비스 시간</b>. 클수록 우선"}
,{id:"ch11-card-chmod",ch:"ch11",s:15,f:"<b>chmod</b>",b:"<b>r=4, w=2, x=1</b>. 소유자·그룹·기타 순"}
,{id:"ch11-card-IPv6",ch:"ch11",s:15,f:"<b>IPv6</b>",b:"<b>128비트</b>, 16비트 8부분, 콜론 구분. <b>유니·멀티·애니캐스트</b>(브로드캐스트 없음)"}
,{id:"ch11-card-호스트수",ch:"ch11",s:15,f:"<b>호스트 수</b>",b:"<b>2^(호스트 비트) − 2</b>"}
,{id:"ch11-card-OSI7계층",ch:"ch11",s:15,f:"<b>OSI 7계층</b>",b:"<b>물데네전세표응</b>"}
,{id:"ch11-card-계층별장비",ch:"ch11",s:15,f:"<b>계층별 장비</b>",b:"물리(<b>리피터·허브</b>) · 데이터링크(<b>브리지·스위치</b>) · 네트워크(<b>라우터</b>) · 전송 이상(<b>게이트웨이</b>)"}
,{id:"ch11-card-TCPvsUDP",ch:"ch11",s:15,f:"<b>TCP vs UDP</b>",b:"TCP = <b>연결형·신뢰성·느림</b> / UDP = <b>비연결형·빠름·8Byte 헤더</b>"}
,{id:"ch11-card-ARPRARP",ch:"ch11",s:15,f:"<b>ARP / RARP</b>",b:"<b>ARP = IP→MAC</b>, <b>RARP = MAC→IP</b>"}
,{id:"ch11-card-경로제어",ch:"ch11",s:15,f:"<b>경로 제어</b>",b:"<b>RIP</b>(소규모, 거리 벡터, 홉 15) · <b>OSPF</b>(대규모, 링크 상태) · <b>BGP</b>(AS 간)"}
,{id:"ch11-card-트래픽제어",ch:"ch11",s:15,f:"<b>트래픽 제어</b>",b:"흐름 제어(<b>슬라이딩 윈도우</b>) · 폭주 제어 · 교착 상태 방지"}
,{id:"ch11-card-RAID",ch:"ch11",s:15,f:"<b>RAID</b>",b:"0(스트라이핑·속도) · 1(미러링·안정) · 5(분산 패리티, 최소 3개)"}
,{id:"ch11-card-OLAP연산",ch:"ch11",s:15,f:"<b>OLAP 연산</b>",b:"<b>Roll-up · Drill-down · Slicing · Dicing · Pivoting</b>"}
,{id:"ch11-card-맵리듀스",ch:"ch11",s:15,f:"<b>맵리듀스</b>",b:"<b>Map(분산) + Reduce(취합)</b>"}
,{id:"ch11-card-고유식별정보",ch:"ch11",s:15,f:"<b>고유식별정보</b>",b:"<b>주민등록번호 · 여권번호 · 운전면허번호 · 외국인등록번호</b>"}
,{id:"ch11-card-병행제어문제",ch:"ch11",s:15,f:"<b>병행 제어 문제</b>",b:"<b>갱신 분실 · 비완료 의존성 · 모순성 · 연쇄 복귀</b>"}
,{id:"ch11-card-병행제어기법",ch:"ch11",s:15,f:"<b>병행 제어 기법</b>",b:"<b>로킹 · 타임 스탬프 · 최적 병행 수행 · 다중 버전</b>"}
,{id:"ch11-card-로킹단위",ch:"ch11",s:15,f:"<b>로킹 단위</b>",b:"크면 <b>병행성 ↓ 오버헤드 ↓</b>, 작으면 <b>병행성 ↑ 오버헤드 ↑</b>"}
,{id:"ch11-card-교착상태4조건",ch:"ch11",s:15,f:"<b>교착 상태 4조건</b>",b:"<b>상점비환</b> — 상호 배제·점유와 대기·비선점·환형 대기"}
,{id:"ch11-card-교착상태해결",ch:"ch11",s:15,f:"<b>교착 상태 해결</b>",b:"<b>예방 · 회피(은행원 알고리즘) · 발견 · 회복</b>"}
,{id:"ch11-card-데이터표준",ch:"ch11",s:15,f:"<b>데이터 표준</b>",b:"데이터 <b>명칭 · 정의 · 형식 · 규칙</b>"}
,{id:"ch12-card-패키징원칙",ch:"ch12",s:9,f:"<b>패키징 원칙</b>",b:"<b>개발자가 아니라 사용자 중심</b>으로 진행"}
,{id:"ch12-card-패키징고려사항",ch:"ch12",s:9,f:"<b>패키징 고려사항</b>",b:"사용자 시스템 환경 · UI 제공 · 관리 서비스 형태 · 다양한 배포 형태"}
,{id:"ch12-card-패키징순서",ch:"ch12",s:9,f:"<b>패키징 순서</b>",b:"기능 식별 → 모듈화 → 빌드 → 사용자 환경 분석 → 패키징·적용 시험 → 변경 개선 → 배포"}
,{id:"ch12-card-릴리즈노트Header",ch:"ch12",s:9,f:"<b>릴리즈 노트 Header</b>",b:"문서 이름 · 소프트웨어 이름 · <b>릴리즈 버전 · 릴리즈 날짜</b> · 노트 날짜 · 노트 버전"}
,{id:"ch12-card-DRM구성요소",ch:"ch12",s:9,f:"<b>DRM 구성 요소</b>",b:"<b>클리어링 하우스(라이선스·결제)</b> · 콘텐츠 제공자 · <b>패키저(암호화)</b> · 콘텐츠 분배자 · 소비자 · <b>DRM 컨트롤러</b> · 보안 컨테이너"}
,{id:"ch12-card-DRM기술요소",ch:"ch12",s:9,f:"<b>DRM 기술 요소</b>",b:"암호화 · 키 관리 · 암호화 파일 생성 · 식별 · 저작권 표현 · 정책 관리 · <b>크랙 방지</b> · 인증"}
,{id:"ch12-card-설치사용자매뉴얼",ch:"ch12",s:9,f:"<b>설치/사용자 매뉴얼</b>",b:"둘 다 <b>목차 및 개요 · 서문 · 기본 사항</b>으로 구성. <b>사용자 기준</b>으로 작성"}
,{id:"ch12-card-형상관리절차",ch:"ch12",s:9,f:"<b>형상 관리 절차</b>",b:"<b>식통감기</b> — 형상 식별 → 형상 통제 → 형상 감사 → 형상 기록"}
,{id:"ch12-card-형상관리적용범위",ch:"ch12",s:9,f:"<b>형상 관리 적용 범위</b>",b:"개발 <b>전 단계</b> + <b>유지보수 단계</b>까지"}
,{id:"ch12-card-버전등록용어",ch:"ch12",s:9,f:"<b>버전 등록 용어</b>",b:"저장소 · Import · <b>Check-Out</b> · <b>Check-In</b> · <b>Commit</b> · Update"}
,{id:"ch12-card-버전등록과정",ch:"ch12",s:9,f:"<b>버전 등록 과정</b>",b:"가져오기 → 인출 → 예치 → 동기화 → 차이"}
,{id:"ch12-card-공유폴더방식",ch:"ch12",s:9,f:"<b>공유 폴더 방식</b>",b:"<b>SCCS · RCS · PVCS · QVCS</b>"}
,{id:"ch12-card-클라이언트서버방식",ch:"ch12",s:9,f:"<b>클라이언트/서버 방식</b>",b:"<b>CVS · SVN · Clear Case · Perforce</b>"}
,{id:"ch12-card-분산저장소방식",ch:"ch12",s:9,f:"<b>분산 저장소 방식</b>",b:"<b>Git · Mercurial · Bazaar · Bitkeeper</b>"}
,{id:"ch12-card-CVS한계",ch:"ch12",s:9,f:"<b>CVS 한계</b>",b:"<b>파일 이름·디렉터리 변경, 심볼릭 링크 미지원</b>"}
,{id:"ch12-card-Git개발자",ch:"ch12",s:9,f:"<b>Git 개발자</b>",b:"<b>리누스 토발즈</b>. 유지보수는 주니오 하마노"}
,{id:"ch12-card-Git영역",ch:"ch12",s:9,f:"<b>Git 영역</b>",b:"작업 트리 → <b>스테이지(add)</b> → 지역 저장소(commit) → <b>원격 저장소(push)</b>"}
,{id:"ch12-card-fetchvspull",ch:"ch12",s:9,f:"<b>fetch vs pull</b>",b:"fetch = <b>가져오기만</b>, pull = <b>가져와서 병합</b>(fetch+merge)"}
,{id:"ch12-card-빌드도구",ch:"ch12",s:9,f:"<b>빌드 도구</b>",b:"<b>Ant(XML, 규칙 없음)</b> · <b>Maven(XML, 의존성·규칙 있음)</b> · <b>Gradle(Groovy, 안드로이드)</b> · <b>Jenkins(CI, 웹 GUI)</b>"}
,{id:"ch12-card-CICD",ch:"ch12",s:9,f:"<b>CI / CD</b>",b:"CI = 지속적 <b>통합</b>(빌드·테스트 자동화) / CD = 지속적 <b>제공·배포</b>"}
];
