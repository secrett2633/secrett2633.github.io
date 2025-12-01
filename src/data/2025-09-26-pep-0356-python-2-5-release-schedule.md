---
title: "[Final] PEP 356 - Python 2.5 Release Schedule"
excerpt: "Python Enhancement Proposal 356: 'Python 2.5 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/356/
toc: true
toc_sticky: true
date: 2025-09-26 19:03:07+0900
last_modified_at: 2025-09-26 19:03:07+0900
published: true
---
> **원문 링크:** [PEP 356 - Python 2.5 Release Schedule](https://peps.python.org/pep-0356/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 07-Feb-2006

## PEP 356 – Python 2.5 릴리스 스케줄

이 문서는 Python 2.5의 개발 및 릴리스 스케줄을 설명하는 PEP(Python Enhancement Proposal)입니다. 주로 PEP 규모의 항목들을 다루며, 소규모 기능은 첫 번째 베타 릴리스까지 추가될 수 있고, 버그는 최종 릴리스까지 수정될 수 있습니다.

### 개요 (Abstract)
PEP 356은 Python 2.5의 개발 및 릴리스 스케줄을 상세히 기술합니다. 주요 관심사는 PEP 규모의 제안들이며, 작은 기능들은 첫 번째 베타 릴리스까지 포함될 수 있었습니다. 버그는 최종 릴리스 전까지 수정 가능했습니다.

최소 두 번의 알파 릴리스, 두 번의 베타 릴리스, 그리고 한 번의 릴리스 후보(Release Candidate)가 계획되었으며, 최종 릴리스는 2006년 9월 12일로 예정되었습니다.

### 릴리스 관리자 (Release Manager)
Anthony Baxter가 릴리스 관리자(Release Manager)를 맡았습니다. Martin von Loewis는 Windows 설치 프로그램을, Ronald Oussoren은 Mac 설치 프로그램을, Fred Drake는 문서 패키지를, Sean Reifschneider는 RPM을 빌드했습니다.

### 릴리스 스케줄 (Release Schedule)
Python 2.5의 릴리스 스케줄은 다음과 같이 진행되었습니다 (모두 완료됨):
*   **alpha 1:** 2006년 4월 5일
*   **alpha 2:** 2006년 4월 27일
*   **beta 1:** 2006년 6월 20일
*   **beta 2:** 2006년 7월 11일
*   **beta 3:** 2006년 8월 3일
*   **rc 1:** 2006년 8월 17일
*   **rc 2:** 2006년 9월 12일
*   **final:** 2006년 9월 19일

### Python 2.5에 포함된 주요 기능들 (Completed features for 2.5)

Python 2.5 릴리스에는 다음과 같은 중요한 PEP 및 기능들이 포함되었습니다:

#### PEP 관련 기능들
*   **PEP 308: Conditional Expressions (조건부 표현식)** : `A if condition else B`와 같은 삼항 연산자 도입.
*   **PEP 309: Partial Function Application (부분 함수 적용)** : `functools.partial`을 통한 함수 인자 부분 적용.
*   **PEP 314: Metadata for Python Software Packages v1.1** : Python 소프트웨어 패키지 메타데이터 표준 업데이트.
*   **PEP 328: Absolute/Relative Imports (절대/상대 임포트)** : 모듈 임포트 방식 개선.
*   **PEP 338: Executing Modules as Scripts (모듈을 스크립트로 실행)** : `-m` 옵션을 통한 모듈 실행 기능.
*   **PEP 341: Unified try-except/try-finally to try-except-finally** : `try-except-finally` 문의 통합.
*   **PEP 342: Coroutines via Enhanced Generators (강화된 제너레이터를 통한 코루틴)** : `yield from` (Python 3.3에 도입)의 전신 격인 `generator.send()` 등 제너레이터 메서드 도입으로 코루틴 구현의 기반을 마련.
*   **PEP 343: The “with” Statement (`with` 문)** : `with` 문 도입으로 컨텍스트 관리 프로토콜(`__enter__`, `__exit__`)을 사용하는 리소스 관리를 간편하게 함 (예: 파일, 락).
*   **PEP 352: Required Superclass for Exceptions (예외를 위한 필수 슈퍼클래스)** : 모든 사용자 정의 예외가 `BaseException` (또는 그 서브클래스)를 상속하도록 강제.
*   **PEP 353: Using ssize_t as the index type (인덱스 타입으로 ssize_t 사용)** : C API에서 인덱스 타입으로 `ssize_t`를 사용하여 더 큰 시퀀스 지원.
*   **PEP 357: Allowing Any Object to be Used for Slicing (어떤 객체든 슬라이싱에 사용 가능)** : 슬라이싱 작업에 더 다양한 객체를 사용할 수 있도록 허용.

#### 기타 주목할 만한 기능들
*   기본 인코딩이 ASCII로 변경되었습니다.
*   AST(Abstract Syntax Tree) 기반 컴파일러가 도입되었고, 새로운 `_ast` 모듈을 통해 Python에서 C AST에 접근할 수 있게 되었습니다.
*   `any()` 및 `all()` 빌트인(Built-in) 진리 함수가 추가되었습니다.
*   **새로운 표준 라이브러리 모듈:**
    *   `cProfile`: 최소한의 오버헤드로 장시간 실행되는 애플리케이션 프로파일링에 적합.
    *   `ctypes`: Windows 설치 프로그램의 선택적 구성 요소. 외부 C 라이브러리 호출을 지원.
    *   `ElementTree` 및 `cElementTree`: XML 파싱 및 생성을 위한 라이브러리.
    *   `hashlib`: SHA-224, -256, -384, -512 지원을 추가 (기존 `md5` 및 `sha` 모듈 대체).
    *   `msilib`: MSI 파일 생성 및 `distutils`의 `bdist_msi`를 위함.
    *   `pysqlite`: SQLite 데이터베이스 바인딩.
    *   `uuid`: UUID(Universally Unique Identifier) 생성.
    *   `wsgiref`: WSGI(Web Server Gateway Interface) 참조 구현.
*   쉐도우 패스워드(shadow passwords) 읽기 지원이 추가되었습니다.
*   Unicode 4.1 UCD 지원이 추가되었습니다.
*   `warnings`, `linecache`, `inspect`, `traceback`, `site`, `doctest` 모듈에 PEP 302 `zipfile` / `__loader__` 지원이 추가되었습니다.
*   `pybench` Python 벤치마크 스위트가 추가되었습니다.
*   메일박스(mailboxes)에 대한 쓰기 지원이 추가되었습니다.
*   "fat" Mac 바이너리(Intel 및 PPC) 빌드 지원이 추가되었습니다.
*   `functools`에 래퍼(wrapper) 함수 작성을 돕는 새로운 유틸리티가 추가되었습니다.
*   `pyexpat`가 expat 2.0을 사용하도록 업그레이드되었습니다.
*   Python 코어가 `g++`로 깨끗하게 컴파일되도록 개선되었습니다.

### 2.6으로 연기된 기능들 (Deferred until 2.6)
*   `distutils` 패키지의 `bdist_deb`.
*   `distutils` 패키지의 `bdist_egg`.
*   순수 Python `pgen` 모듈.
*   `fpectl` 모듈 제거 (고려).
*   `Modules/` 내의 모든 것이 `g++`로 깔끔하게 빌드되도록 변경하는 작업.

### 오픈 이슈 (Open issues)
릴리스 전에 해결되어야 할 버그는 없었으나, 2.5.1 또는 그 이후 버전으로 연기된 몇몇 버그와 문서화 및 테스트 관련 이슈들이 있었습니다.
*   `socket` 모듈의 스레드 안전성 문제 (https://bugs.python.org/issue1544279).
*   Windows에서 `tools` 및 `demo` 누락 문제 (https://bugs.python.org/issue1541420).
*   중첩된 `try/finally`에서 `continue` 사용 시 크래시 (https://bugs.python.org/issue1542451).
*   `gettext.py` 버그 (https://bugs.python.org/issue1475523).
*   `%-formatting` 및 `dicts` 관련 문제 (https://bugs.python.org/issue1467929).
*   `unicode()`가 `LookupError`를 발생시키지 않는 문제 (https://bugs.python.org/issue1446043).

또한, `pkgutil`, `runpy`, `pydoc`에 대한 PEP 302 변경 사항이 문서화되어야 했고, `test_zipfile64` 테스트의 긴 실행 시간 및 디스크 공간 문제, 그리고 문서화되지 않은 C 모듈의 제거 여부 등이 논의되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.