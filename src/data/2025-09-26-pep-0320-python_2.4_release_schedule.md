---
title: "[Final] PEP 320 - Python 2.4 Release Schedule"
excerpt: "Python Enhancement Proposal 320: 'Python 2.4 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/320/
toc: true
toc_sticky: true
date: 2025-09-26 18:29:42+0900
last_modified_at: 2025-09-26 18:29:42+0900
published: true
---
> **원문 링크:** [PEP 320 - Python 2.4 Release Schedule](https://peps.python.org/pep-0320/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 29-Jul-2003

## PEP 320: Python 2.4 릴리스 일정

본 문서는 Python 2.4의 개발 및 릴리스 일정을 설명하는 PEP (Python Enhancement Proposal)입니다. 이 PEP는 주로 PEP로 지정된 규모의 변경 사항에 중점을 둡니다. 작은 기능들은 첫 번째 베타 릴리스까지 추가될 수 있으며, 버그는 최종 릴리스 전까지 수정될 수 있습니다.

### 초록 (Abstract)
이 문서는 Python 2.4의 개발 및 릴리스 일정을 기술합니다. 일정은 주로 PEP 규모의 항목들을 다룹니다. 작은 기능들은 첫 번째 베타 릴리스까지 추가될 수 있으며, 버그는 최종 릴리스 전까지 수정될 수 있습니다.
최소 두 번의 알파 릴리스, 두 번의 베타 릴리스, 그리고 한 번의 릴리스 후보(Release Candidate)가 있을 예정입니다. 최종 릴리스 날짜는 2004년 11월 30일이었습니다.

### 릴리스 관리자 (Release Manager)
Anthony Baxter가 릴리스 관리자를 맡았습니다.
Martin von Lowis는 Windows 설치 관리자를, Fred는 문서 패키지를, Sean은 RPM을 빌드했습니다.

### 릴리스 일정 (Release Schedule)
*   **7월 9일:** alpha 1 [완료]
*   **8월 5/6일:** alpha 2 [완료]
*   **9월 3일:** alpha 3 [완료]
*   **10월 15일:** beta 1 [완료]
*   **11월 3일:** beta 2 [완료]
*   **11월 18일:** release candidate 1 [완료]
*   **11월 30일:** final [완료]

### 2.4에서 완료된 기능들 (Completed features for 2.4)
*   **PEP 218:** 내장 `Set` 객체 (Builtin Set Objects).
*   **PEP 289:** 제너레이터 표현식 (Generator expressions).
*   **PEP 292:** 모듈로 구현될 더 간단한 문자열 대체 (Simpler String Substitutions).
*   **PEP 318:** `@syntax`를 사용한 함수/메서드 데코레이터 문법 (Function/method decorator syntax).
*   **PEP 322:** 역방향 이터레이션 (Reverse Iteration).
*   **PEP 327:** 고정 정밀도 연산을 위한 `Decimal` 패키지.
*   **PEP 328:** 여러 줄 가져오기 (Multi-line Imports).
*   `list.sort()`를 위한 `decorate-sort-undecorate` 패턴을 키워드로 캡슐화했습니다.
*   표현식에서 사용할 수 있는 내장 함수 `sorted()`가 추가되었습니다.
*   `itertools` 모듈에 `tee()`와 `groupby()` 두 가지 새로운 함수가 추가되었습니다.
*   `deque()` 객체를 포함하는 `collections` 모듈이 추가되었습니다.
*   `heapq` 모듈에 두 가지 통계/환원 함수 `nlargest()`와 `nsmallest()`가 추가되었습니다.
*   Python의 Windows 설치 관리자가 MSI를 사용하게 되었습니다.

### 2.5로 연기된 기능들 (Deferred until 2.5)
*   PEP 4에 나열된 모듈들 (`posixfile`, `gopherlib`, `pre` 등)을 더 이상 사용하지 않도록 하거나(deprecate) 제거합니다.
*   PEP 11에 설명된 플랫폼에 대한 지원을 제거합니다.
*   Distutils의 `bdist_dpkg` 명령 구현을 완료합니다.
*   섀도우 비밀번호(shadow passwords) 읽기 지원을 추가합니다.
*   내장 SSL 소켓 타입을 논블로킹 SSL I/O에 사용할 수 있었으면 좋겠습니다. 현재 Twisted와 같이 SSL을 사용하여 비동기 서버를 구현하는 패키지들은 `pyopenssl`과 같은 서드파티 패키지를 요구해야 합니다.
*   AST 기반 컴파일러: 이 브랜치는 2.4에 맞춰 완료되지 않았지만, 2.4 최종 버전 출시 후 트렁크에 포함되어 2.5에 들어갈 예정입니다.
*   reST(reStructuredText)가 Zope3에서 많이 사용될 예정입니다. 표준 라이브러리 모듈이 될 수 있을까요? (reST의 저자는 너무 불안정하다고 생각하므로, 이를 진행하지 않는 경향이 있습니다.)

### 진행 중인 작업 (Ongoing tasks)
다음은 특정 완료 날짜를 기대하지 않고 작업해야 할 진행 중인 TODO 항목들입니다.
*   **문서화:** 배포 및 설치 설명서(distribution and installation manuals)를 완료합니다.
*   **문서화:** 새로운 스타일 클래스(new-style classes)에 대한 문서화를 완료합니다.
*   `Demos/` 디렉토리를 검토하고 필요한 경우 업데이트합니다.
*   새로운 테스트를 추가합니다.
*   SF(SourceForge)의 문서 버그를 수정합니다.
*   코어에서 더 이상 사용되지 않는 기능(deprecated features) 사용을 제거합니다.
*   더 이상 사용되지 않는 기능들을 적절히 문서화합니다.
*   더 이상 사용되지 않는 C API를 `Py_DEPRECATED`로 표시합니다.
*   유지보수되지 않는 모듈들을 더 이상 사용하지 않도록 하거나, 'Unmaintained'라는 새로운 카테고리를 만들 수 있습니다.
*   전반적으로 많은 정리를 통해 앞으로 나아가기 쉽게 만듭니다.

### 미해결 문제 (Open issues)
현재는 없습니다.

### Python 2.3에서 이월된 기능들 (Carryover features from Python 2.3)
*   `import` 잠금(lock)은 재설계가 필요할 수 있습니다.
*   일부 사람들이 보기에 보기 흉한 "U" 모드 플래그를 대체할, 텍스트 파일을 여는 더 나은 API가 필요합니다. `textfile(filename, mode, encoding)`이라는 새로운 내장 타입에 대한 제안이 있습니다. (`bufsize` 인자도 있어야 하지 않을까요?)
*   Tkinter를 위한 새로운 위젯?
    *   누군가 이것을 위한 시간을 가졌나요? Tk 8.4에 새로운 위젯이 있나요? 이미 더 나은 Tix 지원을 받고 있지만 (Windows에서는 아직 아님) 말입니다.
*   PEP 304 (Montanaro의 바이트코드 파일 생성 제어)는 추진력을 잃은 것 같습니다.
*   다른 클래스 내부에 정의된 클래스의 경우, `__name__`은 "outer.inner"여야 하며, 피클링(pickling)이 작동해야 합니다. (이것이 쉽거나 심지어 올바른지 더 이상 확신할 수 없습니다.)
*   더 명확한 deprecation 정책(특히 모듈에 대한)을 결정하고 실행합니다. Neal Norwitz의 이 메시지를 시작으로 보세요. 조직적인 방식으로 이를 더 발전시키는 데 충분한 관심이 없는 것 같고, 그리 중요하지 않습니다.
*   `types` 모듈의 일반적인 용도에 대한 대안을 제공합니다. Skip Montanaro가 이 아이디어에 대한 proto-PEP를 게시했습니다. 제가 아는 한 이에 대한 진전은 없습니다.
*   `types` 및 `string` 모듈에 대해 pending deprecation을 사용합니다. 이는 아직 다루어지지 않은 부분(예: `string.whitespace` 및 `types.TracebackType`)에 대한 대안을 제공해야 합니다. 이에 대한 합의를 얻을 수 없는 것 같습니다.
*   **PEP 262:** 설치된 Python 패키지 데이터베이스 (Database of Installed Python Packages, Kuchling).
    *   이것은 Jack Jansen의 Python 설치 관리자에게 유용하다는 것이 밝혀져, 데이터베이스를 구현할 가치가 있습니다. 코드는 `sandbox/pep262`에 들어갈 것입니다.
*   **PEP 269:** Python용 Pgen 모듈 (Pgen Module for Python, Riehl).
    *   (일부 필요한 변경 사항은 적용되었지만, `pgen` 모듈 자체는 더 성숙해야 합니다.)
*   **PEP 266:** 전역 변수/속성 접근 최적화 (Optimizing Global Variable/Attribute Access, Montanaro).
*   **PEP 267:** 모듈 네임스페이스에 대한 최적화된 접근 (Optimized Access to Module Namespaces, Hylton).
*   **PEP 280:** 전역 변수 접근 최적화 (Optimizing access to globals, van Rossum).
    *   이들은 기본적으로 세 가지 우호적인 경쟁 제안입니다. Jeremy는 새로운 컴파일러로 약간의 진전을 보였지만, 진행이 느리고 컴파일러는 첫 번째 단계일 뿐입니다. 이번 릴리스에서 컴파일러를 리팩터링할 수 있을지도 모릅니다. 우리는 너무 기대하지 않을 것입니다.
*   게으르게 튜플을 추적하는 것? 큰 열정이 없는 것 같습니다.
*   **PEP 286:** 향상된 인자 튜플 (Enhanced Argument Tuples, von Loewis).
    *   이것을 철저히 검토할 시간이 없었습니다. 깊은 최적화 핵(hack)처럼 보이지만, 더 나은 정확성 보장도 제공합니다.
*   `'as'`를 키워드로 만듭니다. 오랫동안 의사 키워드(pseudo-keyword)였습니다. 귀찮게 하기에는 너무 많은 노력입니다.

### 참고 자료 (References)
 Shadow Password Support Module (https://bugs.python.org/issue579435)
 PyErr_Warn may cause import deadlock (https://bugs.python.org/issue683658)
 Nested class __name__ (https://bugs.python.org/issue633930)
 Neal Norwitz, random vs whrandom (https://mail.python.org/pipermail/python-dev/2002-April/023165.html)
 Skip Montanaro, python/dist/src/Lib types.py,1.26,1.27 (https://mail.python.org/pipermail/python-dev/2002-May/024346.html)
 Daniel Dunbar, Lazily GC tracking tuples (https://mail.python.org/pipermail/python-dev/2002-May/023926.html)
 GC: untrack simple objects (https://bugs.python.org/issue558745)

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.