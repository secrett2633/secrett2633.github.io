---
title: "[Active] PEP 0 - Index of Python Enhancement Proposals (PEPs)"
excerpt: "Python Enhancement Proposal 0: 'Index of Python Enhancement Proposals (PEPs)'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/0/
toc: true
toc_sticky: true
date: 2025-09-27 21:19:02+0900
last_modified_at: 2025-09-27 21:19:02+0900
published: true
---
> **원문 링크:** [PEP 0 - Index of Python Enhancement Proposals (PEPs)](https://peps.python.org/pep-0000/)
>
> **상태:** Active | **유형:** Informational | **작성일:** 13-Jul-2000

## PEP 0 – Python Enhancement Proposals (PEPs) 색인

### 소개

PEP 번호는 PEP 편집자에 의해 할당되며, 한 번 할당되면 변경되지 않습니다. PEP 텍스트의 버전 관리 기록은 역사적 기록을 나타냅니다.

### 주제별 색인

전문 분야에 대한 PEP는 주제별로 색인화되어 있습니다.

*   **Governance PEPs (거버넌스 PEPs):** Python 프로젝트의 관리 및 운영 방식에 대한 제안.
*   **Packaging PEPs (패키징 PEPs):** Python 패키지 배포 및 관리에 대한 제안.
*   **Release PEPs (릴리스 PEPs):** Python 버전 릴리스 주기 및 프로세스에 대한 제안.
*   **Typing PEPs (타입 힌트 PEPs):** Python의 타입 힌트(Type Hinting) 기능 및 관련 표준에 대한 제안.

### API

PEPs API는 게시된 모든 PEP의 메타데이터를 담고 있는 JSON 파일입니다. 자세한 내용은 해당 API 문서를 참조하세요.

### 수치 색인

모든 PEP를 번호순으로 정렬한 표를 포함합니다.

### 카테고리별 색인

PEP는 상태와 유형에 따라 여러 카테고리로 분류됩니다.

#### 프로세스 및 메타-PEPs (Process and Meta-PEPs)

Python 커뮤니티의 절차, 워크플로우 또는 거버넌스 변경을 설명하거나 제안하는 PEPs입니다.

*   PEP 1: PEP 목적 및 가이드라인
*   PEP 8: Python 코드 스타일 가이드
*   PEP 13: Python 언어 거버넌스
*   PEP 602: Python 연간 릴리스 주기
*   PEP 609: Python Packaging Authority (PyPA) 거버넌스

#### 기타 정보 제공 PEPs (Other Informational PEPs)

Python 생태계에 대한 배경 정보, 가이드라인 또는 기타 비규범적인 정보를 담고 있는 PEPs입니다.

*   PEP 20: Python의 Zen
*   PEP 257: Docstring 컨벤션
*   PEP 333: Python 웹 서버 게이트웨이 인터페이스 (WSGI) v1.0
*   PEP 484: 타입 힌트 (Type Hints)
*   PEP 570: Python 위치 전용 매개변수 (Positional-Only Parameters)
*   PEP 572: 할당 표현식 (Assignment Expressions)

#### 임시 PEPs (Provisional PEPs)

잠정적으로 승인되었으나 인터페이스가 아직 변경될 수 있는 PEPs입니다.

*   PEP 708: 의존성 혼동 공격 (Dependency Confusion Attacks) 완화를 위한 Repository API 확장

#### 승인된 PEPs (Accepted PEPs)

승인되었으나 아직 구현되지 않았을 수 있는 PEPs입니다.

*   PEP 458: 서명된 저장소 메타데이터를 통한 안전한 PyPI 다운로드
*   PEP 649: Descriptors를 사용한 Annotation의 지연 평가 (Deferred Evaluation)
*   PEP 686: UTF-8 모드 기본값으로 만들기
*   PEP 703: CPython에서 GIL (Global Interpreter Lock)을 선택 사항으로 만들기
*   PEP 701: f-string의 문법적 형식화

#### 검토 중인 PEPs (Open PEPs)

현재 논의 및 수정 중인 제안입니다.

*   PEP 467: 바이너리 시퀀스를 위한 사소한 API 개선
*   PEP 480: PyPI 침해 상황에서 살아남기: 패키지의 엔드투엔드 서명
*   PEP 603: `collections`에 `frozenmap` 타입 추가
*   PEP 638: 문법적 매크로 (Syntactic Macros)

#### 완료된 PEPs (Finished PEPs)

승인되었고 구현이 완료되었거나 더 이상 활성화되지 않는 안정적인 인터페이스를 가진 PEPs입니다.

*   PEP 201: Lockstep Iteration
*   PEP 202: List Comprehensions
*   PEP 203: Augmented Assignments
*   PEP 205: Weak References
*   PEP 207: Rich Comparisons
*   PEP 208: Reworking the Coercion Model
*   PEP 214: Extended Print Statement
*   PEP 217: Display Hook for Interactive Use
*   PEP 218: Adding a Built-In Set Object Type
*   PEP 221: Import As
*   PEP 223: Change the Meaning of x Escapes
*   PEP 227: Statically Nested Scopes
*   PEP 229: Using Distutils to Build Python
*   PEP 230: Warning Framework
*   PEP 232: Function Attributes
*   PEP 234: Iterators
*   PEP 235: Import on Case-Insensitive Platforms
*   PEP 236: Back to the __future__
*   PEP 237: Unifying Long Integers and Integers
*   PEP 238: Changing the Division Operator
*   PEP 250: Using site-packages on Windows
*   PEP 252: Making Types Look More Like Classes
*   PEP 253: Subtyping Built-in Types
*   PEP 255: Simple Generators
*   PEP 260: Simplify xrange()
*   PEP 261: Support for “wide” Unicode characters
*   PEP 263: Defining Python Source Code Encodings
*   PEP 264: Future statements in simulated shells
*   PEP 273: Import Modules from Zip Archives
*   PEP 274: Dict Comprehensions
*   PEP 277: Unicode file name support for Windows NT
*   PEP 278: Universal Newline Support
*   PEP 279: The enumerate() built-in function
*   PEP 282: A Logging System
*   PEP 285: Adding a bool type
*   PEP 289: Generator Expressions
*   PEP 292: Simpler String Substitutions
*   PEP 293: Codec Error Handling Callbacks
*   PEP 301: Package Index and Metadata for Distutils
*   PEP 302: New Import Hooks
*   PEP 305: CSV File API
*   PEP 307: Extensions to the pickle protocol
*   PEP 308: Conditional Expressions
*   PEP 309: Partial Function Application
*   PEP 311: Simplified Global Interpreter Lock Acquisition for Extensions
*   PEP 318: Decorators for Functions and Methods
*   PEP 322: Reverse Iteration
*   PEP 324: subprocess - New process module
*   PEP 327: Decimal Data Type
*   PEP 328: Imports: Multi-Line and Absolute/Relative
*   PEP 331: Locale-Independent Float/String Conversions
*   PEP 338: Executing modules as scripts
*   PEP 341: Unifying try-except and try-finally
*   PEP 342: Coroutines via Enhanced Generators
*   PEP 343: The “with” Statement
*   PEP 352: Required Superclass for Exceptions
*   PEP 353: Using ssize_t as the index type
*   PEP 357: Allowing Any Object to be Used for Slicing
*   PEP 358: The “bytes” Object
*   PEP 362: Function Signature Object
*   PEP 366: Main module explicit relative imports
*   PEP 370: Per user site-packages directory
*   PEP 371: Addition of the multiprocessing package to the standard library
*   PEP 372: Adding an ordered dictionary to collections
*   PEP 376: Database of Installed Python Distributions
*   PEP 378: Format Specifier for Thousands Separator
*   PEP 380: Syntax for Delegating to a Subgenerator
*   PEP 383: Non-decodable Bytes in System Character Interfaces
*   PEP 384: Defining a Stable ABI
*   PEP 389: argparse - New Command Line Parsing Module
*   PEP 391: Dictionary-Based Configuration For Logging
*   PEP 393: Flexible String Representation
*   PEP 397: Python launcher for Windows
*   PEP 405: Python Virtual Environments
*   PEP 409: Suppressing exception context
*   PEP 412: Key-Sharing Dictionary
*   PEP 414: Explicit Unicode Literal for Python 3.3
*   PEP 415: Implement context suppression with exception attributes
*   PEP 417: Including mock in the Standard Library
*   PEP 418: Add monotonic time, performance counter, and process time functions
*   PEP 420: Implicit Namespace Packages
*   PEP 421: Adding sys.implementation
*   PEP 424: A method for exposing a length hint
*   PEP 425: Compatibility Tags for Built Distributions
*   PEP 427: The Wheel Binary Package Format 1.0
*   PEP 428: The pathlib module – object-oriented filesystem paths
*   PEP 435: Adding an Enum type to the Python standard library
*   PEP 436: The Argument Clinic DSL
*   PEP 440: Version Identification and Dependency Specification
*   PEP 441: Improving Python ZIP Application Support
*   PEP 442: Safe object finalization
*   PEP 443: Single-dispatch generic functions
*   PEP 445: Add new APIs to customize Python memory allocators
*   PEP 446: Make newly created file descriptors non-inheritable
*   PEP 448: Additional Unpacking Generalizations
*   PEP 450: Adding A Statistics Module To The Standard Library
*   PEP 451: A ModuleSpec Type for the Import System
*   PEP 453: Explicit bootstrapping of pip in Python installations
*   PEP 454: Add a new tracemalloc module to trace Python memory allocations
*   PEP 456: Secure and interchangeable hash algorithm
*   PEP 461: Adding % formatting to bytes and bytearray
*   PEP 465: A dedicated infix operator for matrix multiplication
*   PEP 466: Network Security Enhancements for Python 2.7.x
*   PEP 468: Preserving the order of **kwargs in a function.
*   PEP 471: os.scandir() function – a better and faster directory iterator
*   PEP 475: Retry system calls failing with EINTR
*   PEP 476: Enabling certificate verification by default for stdlib http clients
*   PEP 477: Backport ensurepip (PEP 453) to Python 2.7
*   PEP 479: Change StopIteration handling inside generators
*   PEP 484: Type Hints
*   PEP 485: A Function for testing approximate equality
*   PEP 486: Make the Python Launcher aware of virtual environments
*   PEP 487: Simpler customisation of class creation
*   PEP 488: Elimination of PYO files
*   PEP 489: Multi-phase extension module initialization
*   PEP 492: Coroutines with async and await syntax
*   PEP 493: HTTPS verification migration tools for Python 2.7
*   PEP 495: Local Time Disambiguation
*   PEP 498: Literal String Interpolation
*   PEP 503: Simple Repository API
*   PEP 506: Adding A Secrets Module To The Standard Library
*   PEP 508: Dependency specification for Python Software Packages
*   PEP 515: Underscores in Numeric Literals
*   PEP 517: A build-system independent format for source trees
*   PEP 518: Specifying Minimum Build System Requirements for Python Projects
*   PEP 519: Adding a file system path protocol
*   PEP 520: Preserving Class Attribute Definition Order
*   PEP 523: Adding a frame evaluation API to CPython
*   PEP 524: Make os.urandom() blocking on Linux
*   PEP 525: Asynchronous Generators
*   PEP 526: Syntax for Variable Annotations
*   PEP 527: Removing Un(der)used file types/extensions on PyPI
*   PEP 528: Change Windows console encoding to UTF-8
*   PEP 529: Change Windows filesystem encoding to UTF-8
*   PEP 530: Asynchronous Comprehensions
*   PEP 538: Coercing the legacy C locale to a UTF-8 based locale
*   PEP 539: A New C-API for Thread-Local Storage in CPython
*   PEP 540: Add a new UTF-8 Mode
*   PEP 544: Protocols: Structural subtyping (static duck typing)
*   PEP 552: Deterministic pycs
*   PEP 553: Built-in breakpoint()
*   PEP 557: Data Classes
*   PEP 560: Core support for typing module and generic types
*   PEP 561: Distributing and Packaging Type Information
*   PEP 562: Module __getattr__ and __dir__
*   PEP 564: Add new time functions with nanosecond resolution
*   PEP 565: Show DeprecationWarning in __main__
*   PEP 566: Metadata for Python Software Packages 2.1
*   PEP 567: Context Variables
*   PEP 570: Python Positional-Only Parameters
*   PEP 572: Assignment Expressions
*   PEP 573: Module State Access from C Extension Methods
*   PEP 574: Pickle protocol 5 with out-of-band data
*   PEP 578: Python Runtime Audit Hooks
*   PEP 584: Add Union Operators To dict
*   PEP 585: Type Hinting Generics In Standard Collections
*   PEP 586: Literal Types
*   PEP 587: Python Initialization Configuration
*   PEP 589: TypedDict: Type Hints for Dictionaries with a Fixed Set of Keys
*   PEP 590: Vectorcall: a fast calling protocol for CPython
*   PEP 591: Adding a final qualifier to typing
*   PEP 592: Adding “Yank” Support to the Simple API
*   PEP 593: Flexible function and variable annotations
*   PEP 594: Removing dead batteries from the standard library
*   PEP 597: Add optional EncodingWarning
*   PEP 600: Future 'manylinux' Platform Tags for Portable Linux Built Distributions
*   PEP 604: Allow writing union types as X | Y
*   PEP 610: Recording the Direct URL Origin of installed distributions
*   PEP 612: Parameter Specification Variables
*   PEP 613: Explicit Type Aliases
*   PEP 614: Relaxing Grammar Restrictions On Decorators
*   PEP 615: Support for the IANA Time Zone Database in the Standard Library
*   PEP 616: String methods to remove prefixes and suffixes
*   PEP 617: New PEG parser for CPython
*   PEP 618: Add Optional Length-Checking To zip
*   PEP 621: Storing project metadata in pyproject.toml
*   PEP 623: Remove wstr from Unicode
*   PEP 624: Remove Py_UNICODE encoder APIs
*   PEP 625: Filename of a Source Distribution
*   PEP 626: Precise line numbers for debugging and other tools.
*   PEP 627: Recording installed projects
*   PEP 628: Add math.tau
*   PEP 629: Versioning PyPI's Simple API
*   PEP 632: Deprecate distutils module
*   PEP 634: Structural Pattern Matching: Specification
*   PEP 639: Improving License Clarity with Better Package Metadata
*   PEP 643: Metadata for Package Source Distributions
*   PEP 644: Require OpenSSL 1.1.1 or newer
*   PEP 646: Variadic Generics
*   PEP 647: User-Defined Type Guards
*   PEP 652: Maintaining the Stable ABI
*   PEP 654: Exception Groups and except*
*   PEP 655: Marking individual TypedDict items as required or potentially-missing
*   PEP 656: Platform Tag for Linux Distributions Using Musl
*   PEP 657: Include Fine Grained Error Locations in Tracebacks
*   PEP 660: Editable installs for pyproject.toml based builds (wheel based)
*   PEP 667: Consistent views of namespaces
*   PEP 669: Low Impact Monitoring for CPython
*   PEP 670: Convert macros to functions in the Python C API
*   PEP 673: Self Type
*   PEP 675: Arbitrary Literal String Type
*   PEP 678: Enriching Exceptions with Notes
*   PEP 680: tomllib: Support for Parsing TOML in the Standard Library
*   PEP 681: Data Class Transforms
*   PEP 682: Format Specifier for Signed Zero
*   PEP 683: Immortal Objects, Using a Fixed Refcount
*   PEP 684: A Per-Interpreter GIL
*   PEP 685: Comparison of extra names for optional distribution dependencies
*   PEP 688: Making the buffer protocol accessible in Python
*   PEP 689: Unstable C API tier
*   PEP 692: Using TypedDict for more precise **kwargs typing
*   PEP 695: Type Parameter Syntax
*   PEP 696: Type Defaults for Type Parameters
*   PEP 697: Limited C API for Extending Opaque Types
*   PEP 698: Override Decorator for Static Typing
*   PEP 700: Additional Fields for the Simple API for Package Indexes
*   PEP 702: Marking deprecations using the type system
*   PEP 705: TypedDict: Read-only items
*   PEP 706: Filter for tarfile.extractall
*   PEP 709: Inlined comprehensions
*   PEP 715: Disabling bdist_egg distribution uploads on PyPI
*   PEP 721: Using tarfile.data_filter for source distribution extraction
*   PEP 723: Inline script metadata
*   PEP 730: Adding iOS as a supported platform
*   PEP 734: Multiple Interpreters in the Stdlib
*   PEP 735: Dependency Groups in pyproject.toml
*   PEP 737: C API to format a type fully qualified name
*   PEP 738: Adding Android as a supported platform
*   PEP 740: Index support for digital attestations
*   PEP 741: Python Configuration C API
*   PEP 742: Narrowing types with TypeIs
*   PEP 750: Template Strings
*   PEP 751: A file format to record Python dependencies for installation reproducibility
*   PEP 757: C API to import-export Python integers
*   PEP 758: Allow except and except* expressions without parentheses
*   PEP 765: Disallow return/break/continue that exit a finally block
*   PEP 782: Add PyBytesWriter C API
*   PEP 784: Adding Zstandard to the standard library
*   PEP 792: Project status markers in the simple index
*   PEP 3101: Advanced String Formatting
*   PEP 3102: Keyword-Only Arguments
*   PEP 3104: Access to Names in Outer Scopes
*   PEP 3105: Make print a function
*   PEP 3106: Revamping dict.keys(), .values() and .items()
*   PEP 3107: Function Annotations
*   PEP 3108: Standard Library Reorganization
*   PEP 3109: Raising Exceptions in Python 3000
*   PEP 3110: Catching Exceptions in Python 3000
*   PEP 3111: Simple input built-in in Python 3000
*   PEP 3112: Bytes literals in Python 3000
*   PEP 3113: Removal of Tuple Parameter Unpacking
*   PEP 3114: Renaming iterator.next() to iterator.__next__()
*   PEP 3115: Metaclasses in Python 3000
*   PEP 3116: New I/O
*   PEP 3118: Revising the buffer protocol
*   PEP 3119: Introducing Abstract Base Classes
*   PEP 3120: Using UTF-8 as the default source encoding
*   PEP 3121: Extension Module Initialization and Finalization
*   PEP 3123: Making PyObject_HEAD conform to standard C
*   PEP 3127: Integer Literal Support and Syntax
*   PEP 3129: Class Decorators
*   PEP 3131: Supporting Non-ASCII Identifiers
*   PEP 3132: Extended Iterable Unpacking
*   PEP 3134: Exception Chaining and Embedded Tracebacks
*   PEP 3135: New Super
*   PEP 3137: Immutable Bytes and Mutable Buffer
*   PEP 3138: String representation in Python 3000
*   PEP 3141: A Type Hierarchy for Numbers
*   PEP 3144: IP Address Manipulation Library for the Python Standard Library
*   PEP 3147: PYC Repository Directories
*   PEP 3148: futures - execute computations asynchronously
*   PEP 3149: ABI version tagged .so files
*   PEP 3151: Reworking the OS and IO exception hierarchy
*   PEP 3154: Pickle protocol version 4
*   PEP 3155: Qualified name for classes and functions
*   PEP 3156: Asynchronous IO Support Rebooted: the “asyncio” Module

#### 과거의 메타-PEPs 및 정보 제공 PEPs (Historical Meta-PEPs and Informational PEPs)

과거에 활동했던 메타-PEPs 및 정보 제공 PEPs입니다.

*   PEP 5: 언어 발전 지침 (Guidelines for Language Evolution)
*   PEP 200: Python 2.0 릴리스 일정 (Python 2.0 Release Schedule)

#### 연기된 PEPs (Deferred PEPs)

추가 연구 또는 업데이트를 위해 연기된 비활성 초안입니다.

*   PEP 213: 속성 접근 핸들러 (Attribute Access Handlers)
*   PEP 312: 간단한 암묵적 람다 (Simple Implicit Lambda)
*   PEP 403: 일반 목적 데코레이터 절 (General purpose decorator clause)

#### 거부, 대체, 철회된 PEPs (Rejected, Superseded, and Withdrawn PEPs)

공식적으로 거부되거나, 다른 PEP로 대체되거나, 제안자 또는 작성자에 의해 철회된 PEPs입니다.

*   PEP 3: 버그 보고서 처리 지침 (Guidelines for Handling Bug Reports)
*   PEP 42: 기능 요청 (Feature Requests)
*   PEP 204: 범위 리터럴 (Range Literals)

### 예약된 PEP 번호

특정 목적으로 예약된 PEP 번호입니다.

*   PEP 801: 예약됨 (Reserved)

### PEP 유형 키 (PEP Types Key)

PEP의 유형을 나타내는 키입니다.

*   **I — Informational (정보 제공):** Python 생태계에 대한 배경, 가이드라인 또는 기타 정보를 담고 있는 비규범적인 PEP입니다.
*   **P — Process (프로세스):** Python 커뮤니티 프로세스, 워크플로우 또는 거버넌스 변경을 설명하거나 제안하는 규범적인 PEP입니다.
*   **S — Standards Track (표준 트랙):** Python의 새로운 기능, CPython 구현 변경 또는 생태계 상호 운용성 표준에 대한 규범적인 PEP입니다.
*   자세한 내용은 [PEP 1](https://peps.python.org/pep-0001/)을 참조하세요.

### PEP 상태 키 (PEP Status Key)

PEP의 현재 상태를 나타내는 키입니다.

*   **A — Accepted (승인됨):** 구현을 위해 승인된 규범적 제안입니다.
*   **A — Active (활성):** 현재 유효한 정보 제공 지침이거나 사용 중인 프로세스입니다.
*   **D — Deferred (연기됨):** 나중에 다시 논의될 수 있는 비활성 초안입니다.
*   **<문자 없음> — Draft (초안):** 현재 활발히 논의 및 수정 중인 제안입니다.
*   **F — Final (최종):** 승인 및 구현이 완료되었거나 더 이상 활성화되지 않는 제안입니다.
*   **P — Provisional (임시):** 잠정적으로 승인되었으나 추가 피드백이 필요한 제안입니다.
*   **R — Rejected (거부됨):** 공식적으로 거부되어 수용되지 않을 제안입니다.
*   **S — Superseded (대체됨):** 다른 후속 PEP로 대체된 제안입니다.
*   **W — Withdrawn (철회됨):** 스폰서 또는 작성자에 의해 고려 대상에서 제거된 제안입니다.
*   자세한 내용은 [PEP 1](https://peps.python.org/pep-0001/)을 참조하세요.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.