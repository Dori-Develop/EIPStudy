/* build.sh 가 content/*.md 에서 뽑아 생성한다. 직접 고치지 말 것.
   a 약어 · f 풀네임 · k 한글명 · s 나오는 곳 [챕터, 섹션 순번(0부터)]
   섹션 제목은 assets/toc.js 에 있으므로 여기에 담지 않는다. */
window.EIP_GLOSSARY = [
{a:"AES",f:"Advanced Encryption Standard",k:"",n:5,s:[["ch09",8],["ch02",24],["ch03",5],["ch09",2],["ch09",15]]}
,{a:"AI",f:"",k:"인공지능",n:1,s:[["ch11",13]]}
,{a:"AJAX",f:"Asynchronous JavaScript and XML",k:"",n:2,s:[["ch05",9],["ch05",13]]}
,{a:"API",f:"Application Programming Interface",k:"",n:11,s:[["ch04",11],["ch03",3],["ch03",9],["ch05",0],["ch05",4],["ch05",11],["ch05",13],["ch08",14]]}
,{a:"APM",f:"Application Performance Management/Monitoring",k:"",n:3,s:[["ch05",12],["ch05",13],["ch08",16]]}
,{a:"AR",f:"",k:"증강 현실",n:1,s:[["ch11",13]]}
,{a:"ARIA",f:"Academy, Research Institute, Agency",k:"",n:4,s:[["ch09",8],["ch02",24],["ch03",5],["ch09",15]]}
,{a:"ARP",f:"Address Resolution Protocol",k:"",n:3,s:[["ch11",11],["ch09",9],["ch11",15]]}
,{a:"AS",f:"",k:"자율 시스템",n:4,s:[["ch11",12],["ch08",1],["ch08",11],["ch11",15]]}
,{a:"ASP",f:"Active Server Page",k:"",n:2,s:[["ch10",10],["ch10",13]]}
,{a:"BaaS",f:"Blockchain as a Service",k:"",n:1,s:[["ch11",13]]}
,{a:"BGP",f:"Border Gateway Protocol",k:"",n:2,s:[["ch11",12],["ch11",15]]}
,{a:"BI",f:"Business Intelligence",k:"",n:1,s:[["ch04",13]]}
,{a:"CBD",f:"Component Based Design",k:"컴포넌트 기반",n:2,s:[["ch01",19],["ch01",30]]}
,{a:"CBO",f:"Cost Based Optimizer",k:"",n:2,s:[["ch08",16],["ch08",17]]}
,{a:"CI",f:"Continuous Integration",k:"",n:4,s:[["ch12",8],["ch04",9],["ch04",14],["ch12",9]]}
,{a:"COCOMO",f:"COnstructive COst MOdel",k:"",n:2,s:[["ch01",24],["ch01",30]]}
,{a:"CRM",f:"Customer Relationship Management",k:"",n:1,s:[["ch04",13]]}
,{a:"CVS",f:"Concurrent Version System",k:"",n:3,s:[["ch12",6],["ch04",0],["ch12",9]]}
,{a:"DA",f:"Data Administrator",k:"데이터 관리자",n:1,s:[["ch11",7]]}
,{a:"DAC",f:"Discretionary Access Control",k:"임의 접근통제",n:2,s:[["ch02",24],["ch02",32]]}
,{a:"DBMS",f:"DataBase Management System",k:"",n:16,s:[["ch02",3],["ch01",4],["ch01",24],["ch02",4],["ch02",5],["ch02",8],["ch02",16],["ch02",22]]}
,{a:"DCL",f:"Data Control Language",k:"",n:5,s:[["ch08",3],["ch08",0],["ch08",10],["ch08",11],["ch08",17]]}
,{a:"DD",f:"Data Dictionary",k:"자료 사전",n:2,s:[["ch01",7],["ch01",6]]}
,{a:"DES",f:"Data Encryption Standard",k:"",n:3,s:[["ch09",8],["ch02",24],["ch09",15]]}
,{a:"DFD",f:"Data Flow Diagram",k:"자료 흐름도",n:6,s:[["ch01",7],["ch04",4],["ch01",6],["ch01",13],["ch01",30],["ch04",14]]}
,{a:"DIP",f:"Dependency Inversion Principle",k:"의존 역전 원칙",n:2,s:[["ch04",3],["ch04",14]]}
,{a:"DLP",f:"Data Loss Prevention",k:"",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"DRM",f:"Digital Right Management",k:"",n:2,s:[["ch12",2],["ch12",9]]}
,{a:"DSA",f:"Digital Signature Algorithm",k:"",n:2,s:[["ch09",8],["ch09",15]]}
,{a:"DT",f:"Development Team",k:"개발팀",n:2,s:[["ch01",1],["ch01",30]]}
,{a:"DTD",f:"Document Type Definition",k:"",n:1,s:[["ch03",6]]}
,{a:"DW",f:"Data Warehouse",k:"",n:2,s:[["ch04",13],["ch11",13]]}
,{a:"EAI",f:"Enterprise Application Integration",k:"",n:4,s:[["ch03",3],["ch03",9],["ch05",0],["ch05",4]]}
,{a:"ECC",f:"Elliptic Curve Cryptography",k:"",n:3,s:[["ch09",8],["ch02",24],["ch09",15]]}
,{a:"ERP",f:"Enterprise Resource Planning",k:"",n:1,s:[["ch04",13]]}
,{a:"ESB",f:"Enterprise Service Bus",k:"",n:2,s:[["ch03",3],["ch03",9]]}
,{a:"ESM",f:"Enterprise Security Management",k:"",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"ETL",f:"Extraction, Transformation, Load",k:"",n:3,s:[["ch02",29],["ch02",17],["ch02",32]]}
,{a:"FCFS",f:"First Come First Served",k:"",n:2,s:[["ch11",3],["ch11",15]]}
,{a:"FDD",f:"Feature Driven Development",k:"",n:1,s:[["ch01",0]]}
,{a:"FIFO",f:"First In First Out",k:"",n:6,s:[["ch11",2],["ch02",0],["ch02",32],["ch11",1],["ch11",3],["ch11",15]]}
,{a:"FP",f:"Function Point",k:"기능 점수",n:2,s:[["ch01",24],["ch01",30]]}
,{a:"GoF",f:"Gang of Four",k:"",n:2,s:[["ch04",8],["ch04",14]]}
,{a:"HA",f:"High Availability",k:"고가용성",n:1,s:[["ch11",13]]}
,{a:"HCI",f:"Human Computer Interaction or Interface",k:"",n:2,s:[["ch06",6],["ch06",7]]}
,{a:"HIDS",f:"Host-Based IDS",k:"",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"HIPO",f:"Hierarchy Input Process Output",k:"",n:2,s:[["ch01",8],["ch01",30]]}
,{a:"HRN",f:"Highest Response-ratio Next",k:"",n:2,s:[["ch11",3],["ch11",15]]}
,{a:"ICMP",f:"Internet Control Message Protocol",k:"",n:2,s:[["ch11",11],["ch09",9]]}
,{a:"IDE",f:"Integrated Development Environment",k:"통합 개발 환경",n:2,s:[["ch04",0],["ch04",9]]}
,{a:"IDEA",f:"International Data Encryption Algorithm",k:"",n:3,s:[["ch09",8],["ch02",24],["ch09",15]]}
,{a:"IDS",f:"Intrusion Detection System",k:"",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"IGMP",f:"Internet Group Management Protocol",k:"",n:1,s:[["ch11",11]]}
,{a:"IP",f:"Internet Protocol",k:"",n:11,s:[["ch11",11],["ch03",5],["ch04",3],["ch09",7],["ch09",9],["ch09",10],["ch09",13],["ch09",15]]}
,{a:"IPC",f:"Inter-Process Communication",k:"",n:2,s:[["ch04",6],["ch04",14]]}
,{a:"IPS",f:"Intrusion Prevention System",k:"",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"ISP",f:"Interface Segregation Principle",k:"",n:2,s:[["ch04",3],["ch04",14]]}
,{a:"JDBC",f:"Java DataBase Connectivity",k:"",n:5,s:[["ch08",14],["ch03",3],["ch03",9],["ch07",11],["ch08",17]]}
,{a:"JSON",f:"JavaScript Object Notation",k:"",n:5,s:[["ch03",6],["ch05",9],["ch03",7],["ch03",9],["ch05",13]]}
,{a:"JSP",f:"Java Server Page",k:"",n:2,s:[["ch10",10],["ch10",13]]}
,{a:"KDSI",f:"Kilo Delivered Source Instruction",k:"",n:1,s:[["ch01",24]]}
,{a:"KLOC",f:"Kilo LOC",k:"",n:1,s:[["ch01",24]]}
,{a:"LFU",f:"Least Frequently Used",k:"",n:3,s:[["ch11",2],["ch11",1],["ch11",15]]}
,{a:"LRU",f:"Least Recently Used",k:"",n:3,s:[["ch11",2],["ch11",1],["ch11",15]]}
,{a:"LSP",f:"Liskov Substitution Principle",k:"",n:2,s:[["ch04",3],["ch04",14]]}
,{a:"MAC",f:"Mandatory Access Control",k:"강제 접근통제",n:6,s:[["ch02",24],["ch11",11],["ch02",32],["ch09",13],["ch11",10],["ch11",15]]}
,{a:"MD5",f:"Message Digest 5",k:"",n:2,s:[["ch09",8],["ch09",15]]}
,{a:"MEMS",f:"Micro-Electro Mechanical Systems",k:"",n:1,s:[["ch11",13]]}
,{a:"MFA",f:"",k:"다중 요소 인증",n:1,s:[["ch09",10]]}
,{a:"NAC",f:"Network Access Control",k:"",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"NDN",f:"Named Data Networking",k:"",n:1,s:[["ch11",13]]}
,{a:"NFC",f:"Near Field Communication",k:"",n:1,s:[["ch11",13]]}
,{a:"NFV",f:"Network Functions Virtualization",k:"",n:1,s:[["ch11",13]]}
,{a:"NIDS",f:"Network-Based IDS",k:"",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"NTAF",f:"FitNesse+STAF, NHN",k:"",n:2,s:[["ch05",13],["ch05",12]]}
,{a:"NUR",f:"Not Used Recently",k:"",n:3,s:[["ch11",2],["ch11",1],["ch11",15]]}
,{a:"OCP",f:"Open-Closed Principle",k:"개방-폐쇄 원칙",n:2,s:[["ch04",3],["ch04",14]]}
,{a:"ODBC",f:"Open DataBase Connectivity",k:"",n:2,s:[["ch08",14],["ch08",17]]}
,{a:"OLAP",f:"Online Analytical Processing",k:"",n:2,s:[["ch11",13],["ch11",15]]}
,{a:"OMG",f:"Object Management Group",k:"",n:1,s:[["ch01",9]]}
,{a:"OMT",f:"Object Modeling Technique",k:"럼바우",n:3,s:[["ch04",4],["ch04",14],["ch01",9]]}
,{a:"OOA",f:"Object Oriented Analysis",k:"객체 지향 분석",n:1,s:[["ch04",4]]}
,{a:"ORM",f:"Object-Relational Mapping",k:"",n:2,s:[["ch08",15],["ch08",17]]}
,{a:"OS",f:"Operating System",k:"운영체제",n:9,s:[["ch01",4],["ch04",0],["ch11",0],["ch05",12],["ch07",13],["ch09",15],["ch11",14],["ch11",15]]}
,{a:"OSI",f:"Open System Interconnection",k:"레이어",n:5,s:[["ch04",14],["ch11",9],["ch04",2],["ch11",11],["ch11",15]]}
,{a:"OSPF",f:"Open Shortest Path First",k:"",n:2,s:[["ch11",12],["ch11",15]]}
,{a:"OTP",f:"One Time Password",k:"",n:1,s:[["ch09",10]]}
,{a:"PERT",f:"Program Evaluation and Review Technique",k:"",n:2,s:[["ch01",25],["ch01",30]]}
,{a:"PnP",f:"Plug and Play",k:"",n:1,s:[["ch11",0]]}
,{a:"PO",f:"Product Owner",k:"제품 책임자",n:2,s:[["ch01",1],["ch01",30]]}
,{a:"RAID",f:"Redundant Array of Independent Disk",k:"",n:2,s:[["ch11",13],["ch11",15]]}
,{a:"RARP",f:"Reverse ARP",k:"",n:2,s:[["ch11",11],["ch11",15]]}
,{a:"RBAC",f:"Role Based Access Control",k:"",n:2,s:[["ch02",24],["ch02",32]]}
,{a:"RBO",f:"Rule Based Optimizer",k:"",n:2,s:[["ch08",16],["ch08",17]]}
,{a:"REST",f:"Representational State Transfer",k:"",n:2,s:[["ch03",7],["ch03",9]]}
,{a:"RIP",f:"Routing Information Protocol",k:"",n:2,s:[["ch11",12],["ch11",15]]}
,{a:"RPA",f:"Robotic Process Automation",k:"",n:1,s:[["ch11",13]]}
,{a:"RPO",f:"Recovery Point Objective",k:"",n:1,s:[["ch02",23]]}
,{a:"RSA",f:"Rivest Shamir Adleman",k:"",n:4,s:[["ch09",8],["ch02",24],["ch03",5],["ch09",15]]}
,{a:"RTO",f:"Recovery Time Objective",k:"",n:1,s:[["ch02",23]]}
,{a:"SCM",f:"Supply Chain Management · Software Configuration Management",k:"",n:4,s:[["ch04",13],["ch12",5],["ch01",6],["ch12",6]]}
,{a:"SCR",f:"Second Chance Replacement",k:"",n:3,s:[["ch11",2],["ch11",1],["ch11",15]]}
,{a:"SDN",f:"Software Defined Networking",k:"",n:1,s:[["ch11",13]]}
,{a:"SE",f:"Software Engineering",k:"",n:1,s:[["ch01",0]]}
,{a:"SIEM",f:"Security Information and Event Management",k:"",n:2,s:[["ch09",13],["ch09",15]]}
,{a:"SJF",f:"Shortest Job First",k:"",n:2,s:[["ch11",3],["ch11",15]]}
,{a:"SM",f:"Scrum Master",k:"스크럼 마스터",n:2,s:[["ch01",1],["ch01",30]]}
,{a:"SOAP",f:"Simple Object Access Protocol",k:"",n:3,s:[["ch03",7],["ch03",3],["ch03",9]]}
,{a:"SPICE",f:"Software Process Improvement and Capability dEtermination",k:"",n:2,s:[["ch01",27],["ch01",30]]}
,{a:"SQL",f:"Structured Query Language",k:"동적",n:18,s:[["ch08",0],["ch08",14],["ch02",16],["ch04",11],["ch04",14],["ch08",10],["ch08",11],["ch08",12]]}
,{a:"SRP",f:"Single Responsibility Principle",k:"단일 책임 원칙",n:2,s:[["ch04",3],["ch04",14]]}
,{a:"SRT",f:"Shortest Remaining Time",k:"",n:2,s:[["ch11",3],["ch11",15]]}
,{a:"SSD",f:"Solid State Drive",k:"",n:1,s:[["ch11",13]]}
,{a:"SSO",f:"Single Sign On",k:"",n:2,s:[["ch09",10],["ch11",13]]}
,{a:"TCL",f:"Transaction Control Language",k:"",n:2,s:[["ch08",3],["ch08",17]]}
,{a:"TCP",f:"Transmission Control Protocol",k:"",n:4,s:[["ch11",11],["ch09",9],["ch11",10],["ch11",15]]}
,{a:"TDE",f:"Transparent Data Encryption",k:"",n:2,s:[["ch05",11],["ch05",13]]}
,{a:"TFN",f:"Tribe Flood Network",k:"",n:2,s:[["ch09",9],["ch09",15]]}
,{a:"TOCTOU",f:"Time Of Check to Time Of Use",k:"",n:2,s:[["ch09",3],["ch09",15]]}
,{a:"UDDI",f:"Universal Description, Discovery and Integration",k:"",n:3,s:[["ch03",7],["ch03",3],["ch03",9]]}
,{a:"UDP",f:"User Datagram Protocol",k:"",n:4,s:[["ch11",11],["ch09",9],["ch11",10],["ch11",15]]}
,{a:"UI",f:"User Interface",k:"",n:10,s:[["ch06",0],["ch06",1],["ch06",2],["ch06",3],["ch06",5],["ch06",6],["ch06",7],["ch07",9]]}
,{a:"UML",f:"Unified Modeling Language",k:"",n:5,s:[["ch01",9],["ch01",10],["ch01",11],["ch01",14],["ch01",30]]}
,{a:"UWB",f:"Ultra WideBand",k:"",n:1,s:[["ch11",13]]}
,{a:"UX",f:"User Experience",k:"",n:2,s:[["ch06",6],["ch06",7]]}
,{a:"VPN",f:"Virtual Private Network",k:"",n:4,s:[["ch03",5],["ch03",9],["ch09",13],["ch09",15]]}
,{a:"VR",f:"",k:"가상 현실",n:1,s:[["ch11",13]]}
,{a:"WAS",f:"Web Application Server",k:"",n:4,s:[["ch01",4],["ch04",0],["ch05",5],["ch05",13]]}
,{a:"WSDL",f:"Web Services Description Language",k:"",n:3,s:[["ch03",7],["ch03",3],["ch03",9]]}
,{a:"XML",f:"eXtensible Markup Language",k:"태그 방식",n:12,s:[["ch03",6],["ch03",9],["ch03",2],["ch03",7],["ch04",9],["ch04",14],["ch05",9],["ch05",13]]}
,{a:"XP",f:"eXtreme Programming",k:"",n:3,s:[["ch01",0],["ch01",2],["ch01",30]]}
,{a:"XSL",f:"eXtensible Stylesheet Language",k:"",n:1,s:[["ch03",6]]}
];
