/* build.sh 가 content/*.md 에서 뽑아 생성한다. 직접 고치지 말 것.
   a 약어 · f 풀네임 · k 한글명 · s 나오는 곳 [챕터, 섹션 순번(0부터)]
   섹션 제목은 assets/toc.js 에 있으므로 여기에 담지 않는다. */
window.EIP_GLOSSARY = [
{a:"ABM",f:"Asynchronous Balanced Mode",k:"비동기 균형 모드",n:1,s:[["ch11",11]]}
,{a:"ACID",f:"",k:"트랜잭션의 특성",n:2,s:[["ch02",18],["ch02",32]]}
,{a:"AES",f:"Advanced Encryption Standard",k:"고급 암호화 표준",n:5,s:[["ch09",8],["ch02",24],["ch03",5],["ch09",2],["ch09",15]]}
,{a:"AH",f:"Authentication Header",k:"인증 헤더",n:1,s:[["ch09",13]]}
,{a:"AI",f:"",k:"인공지능",n:1,s:[["ch11",13]]}
,{a:"AJAX",f:"Asynchronous JavaScript and XML",k:"",n:2,s:[["ch05",9],["ch05",13]]}
,{a:"API",f:"Application Programming Interface",k:"응용 프로그램 인터페이스",n:11,s:[["ch04",11],["ch03",3],["ch03",9],["ch05",0],["ch05",4],["ch05",11],["ch05",13],["ch08",14]]}
,{a:"APM",f:"Application Performance Management/Monitoring",k:"애플리케이션 성능 관리",n:3,s:[["ch05",12],["ch05",13],["ch08",16]]}
,{a:"APT",f:"Advanced Persistent Threat",k:"지능형 지속 위협",n:1,s:[["ch09",9]]}
,{a:"AR",f:"",k:"증강 현실",n:1,s:[["ch11",13]]}
,{a:"ARIA",f:"Academy, Research Institute, Agency",k:"",n:4,s:[["ch09",8],["ch02",24],["ch03",5],["ch09",15]]}
,{a:"ARM",f:"Asynchronous Response Mode",k:"비동기 응답 모드",n:2,s:[["ch11",11],["ch09",13]]}
,{a:"ARP",f:"Address Resolution Protocol",k:"주소 결정 프로토콜",n:3,s:[["ch11",11],["ch09",9],["ch11",15]]}
,{a:"ASP",f:"Active Server Page",k:"",n:2,s:[["ch10",10],["ch10",13]]}
,{a:"ATM",f:"Asynchronous Transfer Mode",k:"비동기 전송 모드",n:1,s:[["ch11",13]]}
,{a:"BaaS",f:"Blockchain as a Service",k:"서비스형 블록체인",n:1,s:[["ch11",13]]}
,{a:"BEC",f:"Backward Error Correction",k:"후진 오류 수정",n:1,s:[["ch11",12]]}
,{a:"BGP",f:"Border Gateway Protocol",k:"경계 게이트웨이 프로토콜",n:2,s:[["ch11",12],["ch11",15]]}
,{a:"BI",f:"Business Intelligence",k:"",n:1,s:[["ch04",13]]}
,{a:"CBD",f:"Component Based Design",k:"컴포넌트 기반 개발",n:2,s:[["ch01",19],["ch01",30]]}
,{a:"CBO",f:"Cost Based Optimizer",k:"비용 기반 옵티마이저",n:2,s:[["ch08",16],["ch08",17]]}
,{a:"CD",f:"Continuous Delivery/Deployment",k:"지속적 제공/배포",n:3,s:[["ch12",8],["ch11",5],["ch12",9]]}
,{a:"CI",f:"Continuous Integration",k:"지속적 통합",n:4,s:[["ch12",8],["ch04",9],["ch04",14],["ch12",9]]}
,{a:"CLR",f:"Common Language Runtime",k:"공용 언어 런타임",n:1,s:[["ch01",29]]}
,{a:"CMMI",f:"Capability Maturity Model Integration",k:"능력 성숙도 통합 모델",n:2,s:[["ch01",27],["ch01",30]]}
,{a:"COCOMO",f:"COnstructive COst MOdel",k:"구성적 비용 산정 모형",n:2,s:[["ch01",24],["ch01",30]]}
,{a:"CPM",f:"Critical Path Method",k:"임계 경로 기법",n:2,s:[["ch01",25],["ch01",30]]}
,{a:"CRC",f:"Cyclic Redundancy Check",k:"순환 중복 검사",n:1,s:[["ch11",12]]}
,{a:"CRM",f:"Customer Relationship Management",k:"고객 관계 관리",n:1,s:[["ch04",13]]}
,{a:"CSRF",f:"",k:"크로스사이트 요청 위조",n:2,s:[["ch04",11],["ch04",14]]}
,{a:"CVS",f:"Concurrent Version System",k:"동시 버전 시스템",n:3,s:[["ch12",6],["ch04",0],["ch12",9]]}
,{a:"DA",f:"Data Administrator",k:"데이터 관리자",n:1,s:[["ch11",7]]}
,{a:"DAC",f:"Discretionary Access Control",k:"임의 접근통제",n:3,s:[["ch02",24],["ch02",32],["ch09",2]]}
,{a:"DBMS",f:"DataBase Management System",k:"데이터베이스 관리 시스템",n:16,s:[["ch02",3],["ch01",4],["ch01",24],["ch02",4],["ch02",5],["ch02",8],["ch02",16],["ch02",22]]}
,{a:"DCL",f:"Data Control Language",k:"데이터 제어어",n:5,s:[["ch08",3],["ch08",0],["ch08",10],["ch08",11],["ch08",17]]}
,{a:"DD",f:"Data Dictionary",k:"자료 사전",n:2,s:[["ch01",7],["ch01",6]]}
,{a:"DES",f:"Data Encryption Standard",k:"데이터 암호화 표준",n:3,s:[["ch09",8],["ch02",24],["ch09",15]]}
,{a:"DFD",f:"Data Flow Diagram",k:"자료 흐름도",n:6,s:[["ch01",7],["ch04",4],["ch01",6],["ch01",13],["ch01",30],["ch04",14]]}
,{a:"DIP",f:"Dependency Inversion Principle",k:"의존 역전 원칙",n:2,s:[["ch04",3],["ch04",14]]}
,{a:"DLP",f:"Data Loss Prevention",k:"데이터 유출 방지",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"DoS",f:"Denial of Service",k:"서비스 거부",n:2,s:[["ch09",9],["ch09",15]]}
,{a:"DRM",f:"Digital Right Management",k:"디지털 저작권 관리",n:2,s:[["ch12",2],["ch12",9]]}
,{a:"DSA",f:"Digital Signature Algorithm",k:"전자 서명 알고리즘",n:2,s:[["ch09",8],["ch09",15]]}
,{a:"DT",f:"Development Team",k:"개발팀",n:2,s:[["ch01",1],["ch01",30]]}
,{a:"DTD",f:"Document Type Definition",k:"문서 형식 정의",n:1,s:[["ch03",6]]}
,{a:"DW",f:"Data Warehouse",k:"데이터 웨어하우스",n:2,s:[["ch04",13],["ch11",13]]}
,{a:"EAI",f:"Enterprise Application Integration",k:"전사적 응용 통합",n:4,s:[["ch03",3],["ch03",9],["ch05",0],["ch05",4]]}
,{a:"ECC",f:"Elliptic Curve Cryptography",k:"타원 곡선 암호",n:3,s:[["ch09",8],["ch02",24],["ch09",15]]}
,{a:"ERP",f:"Enterprise Resource Planning",k:"전사적 자원 관리",n:1,s:[["ch04",13]]}
,{a:"ESB",f:"Enterprise Service Bus",k:"",n:2,s:[["ch03",3],["ch03",9]]}
,{a:"ESM",f:"Enterprise Security Management",k:"통합 보안 관리",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"ESP",f:"Encapsulating Security Payload",k:"캡슐화 보안 페이로드",n:1,s:[["ch09",13]]}
,{a:"ETL",f:"Extraction, Transformation, Load",k:"추출·변환·적재",n:3,s:[["ch02",29],["ch02",17],["ch02",32]]}
,{a:"FCFS",f:"First Come First Served",k:"선입 선처리",n:2,s:[["ch11",3],["ch11",15]]}
,{a:"FDD",f:"Feature Driven Development",k:"기능 중심 개발",n:1,s:[["ch01",0]]}
,{a:"FEC",f:"Forward Error Correction",k:"전진 오류 수정",n:1,s:[["ch11",12]]}
,{a:"FIFO",f:"First In First Out",k:"선입선출",n:6,s:[["ch02",0],["ch11",2],["ch02",32],["ch11",1],["ch11",3],["ch11",15]]}
,{a:"FP",f:"Function Point",k:"기능 점수",n:2,s:[["ch01",24],["ch01",30]]}
,{a:"GoF",f:"Gang of Four",k:"",n:2,s:[["ch04",8],["ch04",14]]}
,{a:"HA",f:"High Availability",k:"고가용성",n:1,s:[["ch11",13]]}
,{a:"HCI",f:"Human Computer Interaction or Interface",k:"인간 컴퓨터 상호작용",n:2,s:[["ch06",6],["ch06",7]]}
,{a:"HDLC",f:"High-level Data Link Control",k:"고급 데이터 링크 제어",n:1,s:[["ch11",11]]}
,{a:"HIDS",f:"Host-Based IDS",k:"호스트 기반 침입 탐지 시스템",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"HIPO",f:"Hierarchy Input Process Output",k:"계층적 입력 처리 출력",n:2,s:[["ch01",8],["ch01",30]]}
,{a:"HRN",f:"Highest Response-ratio Next",k:"최고 응답률 우선",n:2,s:[["ch11",3],["ch11",15]]}
,{a:"HTML",f:"HyperText Markup Language",k:"하이퍼텍스트 마크업 언어",n:9,s:[["ch05",5],["ch03",6],["ch03",7],["ch04",0],["ch06",2],["ch09",1],["ch09",15],["ch10",10]]}
,{a:"HTTP",f:"HyperText Transfer Protocol",k:"하이퍼텍스트 전송 규약",n:9,s:[["ch05",5],["ch03",7],["ch03",9],["ch04",0],["ch05",11],["ch05",13],["ch07",11],["ch09",13]]}
,{a:"ICMP",f:"Internet Control Message Protocol",k:"인터넷 제어 메시지 프로토콜",n:2,s:[["ch11",11],["ch09",9]]}
,{a:"IDE",f:"Integrated Development Environment",k:"통합 개발 환경",n:3,s:[["ch04",0],["ch04",9],["ch04",7]]}
,{a:"IDEA",f:"International Data Encryption Algorithm",k:"국제 데이터 암호화 알고리즘",n:3,s:[["ch09",8],["ch02",24],["ch09",15]]}
,{a:"IDS",f:"Intrusion Detection System",k:"침입 탐지 시스템",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"IGMP",f:"Internet Group Management Protocol",k:"인터넷 그룹 관리 프로토콜",n:1,s:[["ch11",11]]}
,{a:"IoT",f:"Internet of Things",k:"사물 인터넷",n:1,s:[["ch11",13]]}
,{a:"IP",f:"Internet Protocol",k:"인터넷 프로토콜",n:11,s:[["ch11",11],["ch03",5],["ch04",3],["ch09",7],["ch09",9],["ch09",10],["ch09",13],["ch09",15]]}
,{a:"IPC",f:"Inter-Process Communication",k:"프로세스 간 통신",n:3,s:[["ch04",6],["ch11",3],["ch04",14]]}
,{a:"IPS",f:"Intrusion Prevention System",k:"침입 방지 시스템",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"IPSec",f:"IP Security",k:"IP 보안 프로토콜",n:5,s:[["ch09",13],["ch03",5],["ch03",9],["ch05",11],["ch05",13]]}
,{a:"ISP",f:"Interface Segregation Principle",k:"인터페이스 분리 원칙",n:2,s:[["ch04",3],["ch04",14]]}
,{a:"JDBC",f:"Java DataBase Connectivity",k:"자바 데이터베이스 연결",n:5,s:[["ch08",14],["ch03",3],["ch03",9],["ch07",11],["ch08",17]]}
,{a:"JSON",f:"JavaScript Object Notation",k:"",n:5,s:[["ch03",6],["ch05",9],["ch03",7],["ch03",9],["ch05",13]]}
,{a:"JSP",f:"Java Server Page",k:"",n:2,s:[["ch10",10],["ch10",13]]}
,{a:"KDSI",f:"Kilo Delivered Source Instruction",k:"전달된 소스 코드 천 줄",n:1,s:[["ch01",24]]}
,{a:"KISA",f:"",k:"한국인터넷진흥원",n:3,s:[["ch11",14],["ch09",8],["ch09",15]]}
,{a:"KLOC",f:"Kilo LOC",k:"소스 코드 천 줄",n:1,s:[["ch01",24]]}
,{a:"L2TP",f:"Layer 2 Tunneling Protocol",k:"2계층 터널링 프로토콜",n:1,s:[["ch09",13]]}
,{a:"LFU",f:"Least Frequently Used",k:"최소 빈도 사용",n:3,s:[["ch11",2],["ch11",1],["ch11",15]]}
,{a:"LIFO",f:"Last In First Out",k:"후입선출",n:2,s:[["ch02",0],["ch02",32]]}
,{a:"LOD",f:"Linked Open Data",k:"",n:1,s:[["ch11",13]]}
,{a:"LRU",f:"Least Recently Used",k:"최근 최소 사용",n:3,s:[["ch11",2],["ch11",1],["ch11",15]]}
,{a:"LSP",f:"Liskov Substitution Principle",k:"리스코프 치환 원칙",n:2,s:[["ch04",3],["ch04",14]]}
,{a:"MAC",f:"Mandatory Access Control",k:"강제 접근 통제 · 매체 접근 제어(MAC 주소)",n:7,s:[["ch02",24],["ch02",32],["ch09",2],["ch09",13],["ch11",10],["ch11",11],["ch11",15]]}
,{a:"MD5",f:"Message Digest 5",k:"",n:2,s:[["ch09",8],["ch09",15]]}
,{a:"MEMS",f:"Micro-Electro Mechanical Systems",k:"초소형 정밀 기계 기술",n:1,s:[["ch11",13]]}
,{a:"MFA",f:"",k:"다중 요소 인증",n:1,s:[["ch09",10]]}
,{a:"NAC",f:"Network Access Control",k:"네트워크 접근 제어",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"NAT",f:"Network Address Translation",k:"네트워크 주소 변환",n:1,s:[["ch11",8]]}
,{a:"NDN",f:"Named Data Networking",k:"데이터 중심 네트워킹",n:1,s:[["ch11",13]]}
,{a:"NFC",f:"Near Field Communication",k:"근거리 무선 통신",n:1,s:[["ch11",13]]}
,{a:"NFV",f:"Network Functions Virtualization",k:"네트워크 기능 가상화",n:1,s:[["ch11",13]]}
,{a:"NIDS",f:"Network-Based IDS",k:"네트워크 기반 침입 탐지 시스템",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"NRM",f:"Normal Response Mode",k:"정규 응답 모드",n:1,s:[["ch11",11]]}
,{a:"NTAF",f:"FitNesse+STAF, NHN",k:"",n:2,s:[["ch05",13],["ch05",12]]}
,{a:"NUR",f:"Not Used Recently",k:"최근 미사용",n:3,s:[["ch11",2],["ch11",1],["ch11",15]]}
,{a:"OCP",f:"Open-Closed Principle",k:"개방-폐쇄 원칙",n:2,s:[["ch04",3],["ch04",14]]}
,{a:"ODBC",f:"Open DataBase Connectivity",k:"개방형 데이터베이스 연결",n:2,s:[["ch08",14],["ch08",17]]}
,{a:"OLAP",f:"Online Analytical Processing",k:"온라인 분석 처리",n:2,s:[["ch11",13],["ch11",15]]}
,{a:"OMG",f:"Object Management Group",k:"객체 관리 그룹",n:1,s:[["ch01",9]]}
,{a:"OMT",f:"Object Modeling Technique",k:"객체 모델링 기법",n:3,s:[["ch04",4],["ch01",9],["ch04",14]]}
,{a:"OOA",f:"Object Oriented Analysis",k:"객체 지향 분석",n:1,s:[["ch04",4]]}
,{a:"OPT",f:"OPTimal replacement",k:"최적 교체",n:3,s:[["ch11",2],["ch11",1],["ch11",15]]}
,{a:"ORM",f:"Object-Relational Mapping",k:"객체 관계 매핑",n:2,s:[["ch08",15],["ch08",17]]}
,{a:"OS",f:"Operating System",k:"운영체제",n:9,s:[["ch01",4],["ch11",0],["ch04",0],["ch05",12],["ch07",13],["ch09",15],["ch11",14],["ch11",15]]}
,{a:"OSI",f:"Open System Interconnection",k:"개방형 시스템 상호 연결",n:5,s:[["ch11",9],["ch04",2],["ch04",14],["ch11",11],["ch11",15]]}
,{a:"OSPF",f:"Open Shortest Path First",k:"최단 경로 우선",n:2,s:[["ch11",12],["ch11",15]]}
,{a:"OTP",f:"One Time Password",k:"일회용 비밀번호",n:1,s:[["ch09",10]]}
,{a:"PCB",f:"Process Control Block",k:"프로세스 제어 블록",n:1,s:[["ch11",3]]}
,{a:"PERT",f:"Program Evaluation and Review Technique",k:"프로그램 평가 및 검토 기법",n:2,s:[["ch01",25],["ch01",30]]}
,{a:"PnP",f:"Plug and Play",k:"자동 인식 기능",n:1,s:[["ch11",0]]}
,{a:"PO",f:"Product Owner",k:"제품 책임자",n:2,s:[["ch01",1],["ch01",30]]}
,{a:"RAID",f:"Redundant Array of Independent Disk",k:"복수 배열 독립 디스크",n:2,s:[["ch11",13],["ch11",15]]}
,{a:"RARP",f:"Reverse ARP",k:"역주소 결정 프로토콜",n:2,s:[["ch11",11],["ch11",15]]}
,{a:"RBAC",f:"Role Based Access Control",k:"역할기반 접근통제",n:3,s:[["ch02",24],["ch02",32],["ch09",2]]}
,{a:"RBO",f:"Rule Based Optimizer",k:"규칙 기반 옵티마이저",n:2,s:[["ch08",16],["ch08",17]]}
,{a:"REST",f:"Representational State Transfer",k:"",n:2,s:[["ch03",7],["ch03",9]]}
,{a:"RIP",f:"Routing Information Protocol",k:"라우팅 정보 프로토콜",n:2,s:[["ch11",12],["ch11",15]]}
,{a:"RPA",f:"Robotic Process Automation",k:"로봇 프로세스 자동화",n:1,s:[["ch11",13]]}
,{a:"RPO",f:"Recovery Point Objective",k:"목표 복구 시점",n:1,s:[["ch02",23]]}
,{a:"RSA",f:"Rivest Shamir Adleman",k:"",n:4,s:[["ch09",8],["ch02",24],["ch03",5],["ch09",15]]}
,{a:"RTO",f:"Recovery Time Objective",k:"목표 복구 시간",n:1,s:[["ch02",23]]}
,{a:"SCM",f:"Supply Chain Management · Software Configuration Management",k:"공급망 관리 · 형상 관리",n:4,s:[["ch04",13],["ch12",5],["ch01",6],["ch12",6]]}
,{a:"SCR",f:"Second Chance Replacement",k:"2차 기회 교체",n:3,s:[["ch11",2],["ch11",1],["ch11",15]]}
,{a:"SDN",f:"Software Defined Networking",k:"소프트웨어 정의 네트워킹",n:1,s:[["ch11",13]]}
,{a:"SE",f:"Software Engineering",k:"소프트웨어 공학",n:1,s:[["ch01",0]]}
,{a:"SIEM",f:"Security Information and Event Management",k:"보안 정보·이벤트 관리",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"SJF",f:"Shortest Job First",k:"최단 작업 우선",n:2,s:[["ch11",3],["ch11",15]]}
,{a:"SM",f:"Scrum Master",k:"스크럼 마스터",n:2,s:[["ch01",1],["ch01",30]]}
,{a:"SOA",f:"",k:"서비스 지향 아키텍처",n:1,s:[["ch11",13]]}
,{a:"SOAP",f:"Simple Object Access Protocol",k:"",n:3,s:[["ch03",7],["ch03",3],["ch03",9]]}
,{a:"SOLID",f:"",k:"객체 지향 설계 원칙",n:2,s:[["ch04",3],["ch04",14]]}
,{a:"SPICE",f:"Software Process Improvement and Capability dEtermination",k:"소프트웨어 처리 개선 및 능력 평가",n:2,s:[["ch01",27],["ch01",30]]}
,{a:"SQL",f:"Structured Query Language",k:"구조적 질의 언어",n:18,s:[["ch08",0],["ch02",16],["ch04",11],["ch04",14],["ch08",10],["ch08",11],["ch08",12],["ch08",13]]}
,{a:"SRP",f:"Single Responsibility Principle",k:"단일 책임 원칙",n:2,s:[["ch04",3],["ch04",14]]}
,{a:"SRT",f:"Shortest Remaining Time",k:"최단 잔여 시간 우선",n:2,s:[["ch11",3],["ch11",15]]}
,{a:"SSD",f:"Solid State Drive",k:"",n:1,s:[["ch11",13]]}
,{a:"SSH",f:"Secure Shell",k:"보안 셸",n:2,s:[["ch09",13],["ch11",11]]}
,{a:"SSO",f:"Single Sign On",k:"통합 인증",n:2,s:[["ch09",10],["ch11",13]]}
,{a:"TCL",f:"Transaction Control Language",k:"트랜잭션 제어어",n:2,s:[["ch08",3],["ch08",17]]}
,{a:"TCP",f:"Transmission Control Protocol",k:"전송 제어 프로토콜",n:4,s:[["ch11",11],["ch09",9],["ch11",10],["ch11",15]]}
,{a:"TDE",f:"Transparent Data Encryption",k:"투명 데이터 암호화",n:2,s:[["ch05",11],["ch05",13]]}
,{a:"TFN",f:"Tribe Flood Network",k:"",n:2,s:[["ch09",9],["ch09",15]]}
,{a:"TKIP",f:"Temporal Key Integrity Protocol",k:"임시 키 무결성 프로토콜",n:1,s:[["ch09",8]]}
,{a:"TOCTOU",f:"Time Of Check to Time Of Use",k:"검사 시점과 사용 시점",n:2,s:[["ch09",3],["ch09",15]]}
,{a:"TPM",f:"Trusted Platform Module",k:"신뢰 플랫폼 모듈",n:1,s:[["ch09",13]]}
,{a:"UDDI",f:"Universal Description, Discovery and Integration",k:"",n:3,s:[["ch03",7],["ch03",3],["ch03",9]]}
,{a:"UDP",f:"User Datagram Protocol",k:"사용자 데이터그램 프로토콜",n:4,s:[["ch11",11],["ch09",9],["ch11",10],["ch11",15]]}
,{a:"UI",f:"User Interface",k:"사용자 인터페이스",n:10,s:[["ch06",0],["ch06",1],["ch06",2],["ch06",3],["ch06",5],["ch06",6],["ch06",7],["ch07",9]]}
,{a:"UML",f:"Unified Modeling Language",k:"통합 모델링 언어",n:5,s:[["ch01",9],["ch01",10],["ch01",11],["ch01",14],["ch01",30]]}
,{a:"URL",f:"Uniform Resource Locator",k:"통합 자원 위치",n:4,s:[["ch11",8],["ch09",1],["ch09",9],["ch11",10]]}
,{a:"UWB",f:"Ultra WideBand",k:"초광대역",n:1,s:[["ch11",13]]}
,{a:"UX",f:"User Experience",k:"사용자 경험",n:2,s:[["ch06",6],["ch06",7]]}
,{a:"VPN",f:"Virtual Private Network",k:"가상 사설 통신망",n:4,s:[["ch03",5],["ch09",13],["ch03",9],["ch09",15]]}
,{a:"VR",f:"",k:"가상 현실",n:1,s:[["ch11",13]]}
,{a:"WAS",f:"Web Application Server",k:"웹 애플리케이션 서버",n:4,s:[["ch01",4],["ch04",0],["ch05",5],["ch05",13]]}
,{a:"WDM",f:"",k:"파장 분할 다중화",n:1,s:[["ch11",13]]}
,{a:"WEP",f:"Wired Equivalent Privacy",k:"유선 동등 프라이버시",n:1,s:[["ch09",8]]}
,{a:"WSDL",f:"Web Services Description Language",k:"웹 서비스 기술 언어",n:3,s:[["ch03",7],["ch03",3],["ch03",9]]}
,{a:"XML",f:"eXtensible Markup Language",k:"확장 마크업 언어",n:12,s:[["ch03",6],["ch03",2],["ch03",7],["ch03",9],["ch04",9],["ch04",14],["ch05",9],["ch05",13]]}
,{a:"XP",f:"eXtreme Programming",k:"",n:3,s:[["ch01",0],["ch01",2],["ch01",30]]}
,{a:"XSL",f:"eXtensible Stylesheet Language",k:"확장 스타일시트 언어",n:1,s:[["ch03",6]]}
,{a:"XSS",f:"",k:"크로스사이트 스크립팅",n:6,s:[["ch04",11],["ch04",14],["ch09",1],["ch09",9],["ch09",13],["ch09",15]]}
];
