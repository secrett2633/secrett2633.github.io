---
title: "[Final] PEP 283 - Python 2.3 Release Schedule"
excerpt: "Python Enhancement Proposal 283: 'Python 2.3 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/283/
toc: true
toc_sticky: true
date: 2025-09-26 17:57:14+0900
last_modified_at: 2025-09-26 17:57:14+0900
published: true
---
> **원문 링크:** [PEP 283 - Python 2.3 Release Schedule](https://peps.python.org/pep-0283/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 27-Feb-2002

## PEP 283 – Python 2.3 릴리스 일정

**작성자:** Guido van Rossum
**상태:** Final (최종)
**유형:** Informational (정보성)
**주제:** Release (릴리스)
**생성일:** 2002년 2월 27일
**Python 버전:** 2.3
**이력:** 2002년 2월 27일

---

### 초록 (Abstract)

이 문서는 Python 2.3의 개발 및 릴리스 일정을 설명합니다. 이 일정은 주로 PEP(Python Enhancement Proposal) 규모의 항목에 중점을 둡니다. 사소한 기능들은 첫 번째 베타 릴리스까지 포함될 수 있으며, 버그는 최종 릴리스까지 수정될 수 있습니다.

Python 2.3은 최소 두 번의 알파 릴리스, 두 번의 베타 릴리스, 그리고 한 번의 릴리스 후보(Release Candidate)를 가질 예정이었습니다. 알파 및 베타 릴리스는 최소 4주 간격으로 진행되었으며 (이전 릴리스의 큰 실수를 수정하기 위한 비상 릴리스는 제외), 릴리스 후보는 최소 1주 간격으로 진행되었습니다 (마찬가지로 실수 수정은 제외).

**릴리스 일정:**
*   **alpha 1:** 2002년 12월 31일
*   **alpha 2:** 2003년 2월 19일
*   **beta 1:** 2003년 4월 25일
*   **beta 2:** 2003년 6월 29일
*   **candidate 1:** 2003년 7월 18일
*   **candidate 2:** 2003년 7월 24일
*   **final:** 2003년 7월 29일

### 릴리스 관리자 (Release Manager)

Barry Warsaw, Jeremy Hylton, Tim Peters

### Python 2.3 완료된 주요 기능 (Completed features for 2.3)

이 목록은 완전하지 않습니다. 자세한 내용은 CVS의 `Doc/whatsnew/whatsnew23.tex` 및 `Misc/NEWS`를 참조하십시오.

*   **Tk 8.4 업데이트**: Tkinter의 기반이 되는 Tk 라이브러리가 8.4 버전으로 업데이트되었습니다.
*   **bool 타입 및 True, False 상수**: `bool` 타입과 그 상수인 `True`, `False`가 도입되었습니다 (PEP 285).
*   **PyMalloc 개선**: PyMalloc이 크게 개선되었으며 기본적으로 활성화되었습니다.
*   **Universal Newline 지원**: 운영체제에 관계없이 일관된 개행 문자 처리를 위한 Universal Newline 지원이 추가되었습니다 (PEP 278).
*   **Python 소스 코드 인코딩 정의 (PEP 263)**: Python 소스 코드의 인코딩을 정의하는 기능이 구현되었습니다 (Lemburg).
*   **확장된 슬라이스 표기법**: 모든 내장 시퀀스(built-in sequences)에 대한 확장된 슬라이스(slice) 표기법이 추가되었습니다.
*   **리스트(list) 이터레이션 속도 향상**: `tp_iter` 채우기 및 기타 최적화를 통해 리스트 이터레이션 속도가 향상되었습니다. `xrange` 및 튜플(tuple)에도 적용되었습니다.
*   **Timeout 소켓**: 소켓 작업에 타임아웃(timeout)을 설정할 수 있는 기능이 추가되었습니다.
*   **int / long 통합 Stage B0 (PEP 237)**: `int`와 `long` 통합의 첫 번째 단계가 구현되었습니다. 이는 16진수 또는 8진수 변환이나 좌측 시프트(left shift)가 `int`와 동일한 값의 `long`에 대해 다른 값을 반환하는 상황에서 `FutureWarning`을 발생시키는 것을 의미합니다. Python 2.3에서는 의미론적 변경은 없으며, Python 2.4에서 변경될 예정입니다.
*   **모든 코드 객체에서 SET_LINENO 제거**: 디버거(debugger) 브레이크포인트(breakpoint)를 설정하는 다른 방법을 제공하여 Pystone 성능을 5% 이상 향상시킬 수 있었습니다. (아쉽게도 Pystone 성능 향상은 이루어지지 않았습니다.)
*   **pymemcompat.h 작성**: 확장(extension) 개발자들이 Python 1.5.2부터 2.3까지 모든 Python 버전에서 2.3 메모리 인터페이스를 사용할 수 있도록 `pymemcompat.h`가 추가되었습니다.
*   **"pending deprecation" 개념 도입**: `PendingDeprecationWarning`과 함께 "pending deprecation" 개념이 추가되었습니다. 이 경고는 일반적으로 비활성화되어 있지만, `-W` 옵션을 통해 활성화할 수 있습니다.
*   **확장 타입의 `tp_compare` 경고**: 확장 타입의 `tp_compare` 메서드가 -1, 0, 1 이외의 값을 반환할 때 경고를 발생시킵니다.
*   **`None` 할당 경고**: 다양한 형태로 `None`에 할당할 때 경고가 발생합니다.
*   **내장 Set 객체 타입 추가 (PEP 218)**: Greg Wilson의 프로토타입을 기반으로 한 `sets` 모듈이 표준 라이브러리에 포함되었습니다. (현재로서는 내장 타입으로 만들 계획은 없습니다.)
*   **코덱(Codec) 에러 핸들링 콜백 (PEP 293)**: `unicode.encode` 또는 `str.decode`에서 에러 처리를 사용자 정의할 수 있도록 완전히 구현되었습니다 (Dörwald).
*   **로깅 시스템 (PEP 282)**: Vinay Sajip의 로깅 시스템 구현이 패키지화되어 포함되었습니다.
*   **수정된 MRO (Method Resolution Order) 알고리즘**: C3 MRO 알고리즘이 채택되어 구현되었습니다.
*   **새로운 명령줄 옵션 파서**: Greg Ward의 Optik 패키지가 `optparse`라는 단일 모듈로 변환되어 채택되었습니다.
*   **표준 datetime 타입**: 새로운 표준 `datetime` 타입이 C로 구현되어 추가되었습니다.
*   **Zip 아카이브에서 모듈 임포트 (PEP 273)**: PEP 302 구현 작업의 일환으로 Zip 아카이브에서 모듈을 임포트하는 기능이 구현되었습니다.
*   **새로운 임포트 훅 (PEP 302)**: 새로운 임포트 훅이 구현되었습니다.
*   **새로운 pickling 프로토콜**: PEP 307에 따라 새로운 pickling 프로토콜이 추가되었습니다.
*   **CSV 파일 API (PEP 305)**: `csv` 모듈이 추가되었습니다.
*   **`itertools` 모듈**: Raymond Hettinger의 `itertools` 모듈이 포함되었습니다.
*   **확장을 위한 단순화된 GIL 획득 (PEP 311)**: Mark Hammond의 PEP 311이 베타 1에 포함되었습니다.
*   **새로운 `PyArg_Parse*()` 포맷 코드**: `'k'` (unsigned C long int) 및 `'K'` (unsigned C long long int) 포맷 코드가 추가되어 Python 인수의 하위 비트(bits)를 범위 검사 없이 수신합니다.
*   **새로운 IDLE 버전**: IDLEfork 프로젝트에서 새로운 IDLE 버전이 가져와졌습니다. 코드는 `idlelib` 패키지에 포함되었고 `idle` 스크립트는 `setup.py`에 의해 설치됩니다.

### Python 2.3 계획된 기능 (Planned features for 2.3)

이 시점에서는 더 이상 새로운 기능이 추가될 여지는 없습니다.

### 진행 중인 작업 (Ongoing tasks)

다음은 특정 완료 날짜를 기대하지 않고 계속해서 작업해야 할 항목들입니다.

*   **문서화**: 배포(distribution) 및 설치(installation) 매뉴얼을 완성합니다.
*   **문서화**: New-style 클래스(new-style classes)에 대한 문서화를 완성합니다.
*   `Demos/` 디렉토리를 검토하고 필요한 경우 업데이트합니다.
*   새로운 테스트를 추가합니다.
*   SF(SourceForge)의 문서 버그를 수정합니다.
*   코어(core)에서 더 이상 사용되지 않는(deprecated) 기능 사용을 제거합니다.
*   더 이상 사용되지 않는 기능을 적절히 문서화합니다.
*   더 이상 사용되지 않는 C API에 `Py_DEPRECATED`를 표시합니다.
*   유지보수되지 않는 모듈을 Deprecate하거나, 'Unmaintained' 카테고리를 새로 만듭니다.
*   전반적으로 많은 정리 작업을 통해 향후 진행을 용이하게 합니다.

### 미해결 문제 (Open issues)

최종 릴리스 전에 (그리고 가급적 첫 번째 베타 릴리스 전에) 더 많은 작업 및/또는 숙고가 필요할 수 있는 몇 가지 문제가 있었습니다.
*   남아있는 문제가 없습니다.

### Python 2.3에 포함되지 않은 기능 (Features that did not make it into Python 2.3)

*   **임포트(import) 락(lock) 재설계**: 임포트 락은 재설계가 필요할 수 있었습니다.
*   **Set API 문제**: `sets` 모듈이 완벽한지에 대한 논의가 있었지만, 더 많은 사용자 경험이 축적될 때까지는 충분히 좋다고 판단되었습니다.
*   **텍스트 파일(text files) 열기 API 개선**: 일부 사람들이 보기에 "U" 모드 플래그가 보기 흉하여, `textfile(filename, mode, encoding)`이라는 새로운 내장 타입 제안이 있었지만, 채택되지 않았습니다.
*   **Tkinter를 위한 새로운 위젯**: Tk 8.4에 새로운 위젯이 있었는지, 그리고 이를 Tkinter에 추가할 시간이 있었는지에 대한 논의가 있었지만, 진행되지 않았습니다.
*   **Fredrik Lundh의 basetime 제안**: 이 제안은 결국 채택되지 않았습니다.
*   **바이트코드(Bytecode) 파일 생성 제어 (PEP 304)**: 이 PEP는 동력을 잃은 것으로 보입니다.
*   **중첩 클래스(Nested Class)의 `__name__` 및 pickling**: 다른 클래스 안에 정의된 클래스의 `__name__`이 "outer.inner"가 되어야 하고 pickling이 작동해야 한다는 문제가 있었으나, 쉽지 않거나 올바르지 않다고 판단되었습니다.
*   **reST(reStructuredText) 표준 라이브러리 모듈화**: reST의 저자가 너무 불안정하다고 생각하여 표준 라이브러리 모듈로 추가되지 않았습니다.
*   **더 명확한 Deprecation 정책 결정**: 특히 모듈에 대한 Deprecation 정책을 결정하고 실행하는 것에 대한 논의가 있었지만, 충분한 관심 부족으로 진행되지 않았습니다.
*   **`types` 모듈의 일반적인 사용에 대한 대안 제공**: 이 아이디어에 대한 진전이 없었습니다.
*   **`types` 및 `string` 모듈에 Pending Deprecation 적용**: 아직 다루어지지 않은 부분(예: `string.whitespace` 및 `types.TracebackType`)에 대한 대안을 제공해야 했지만, 이에 대한 합의를 얻지 못했습니다.
*   **버퍼(buffer) 객체 Deprecate**: 이 문제는 해결되지 않았습니다.
*   **Python용 Pgen 모듈 (PEP 269)**: `pgen` 모듈 자체는 더 성숙해야 했습니다.
*   **오랫동안 기다려온 Python 카탈로그 지원 추가**: Zope 기반 구현이 있었지만, 호스팅 장소와 옹호자가 필요했습니다.
*   **전역(Global) 변수/속성 접근 최적화 (PEP 266, PEP 267, PEP 280)**: 세 가지 경쟁 제안이 있었고, 컴파일러(compiler) 재구성에 대한 논의가 있었지만, 진행이 더디거나 당장 구현하기 어렵다고 판단되었습니다.
*   **튜플(tuple) 게으른 추적(Lazily tracking tuples)**: 이 제안에 대한 열의가 부족했습니다.
*   **Enhanced Argument Tuples (PEP 286)**: 깊은 최적화 해킹(optimization hack)으로 보였으며, 검토할 시간이 부족했습니다.
*   **`as`를 키워드로 만들기**: `as`는 오랫동안 pseudo-keyword였지만, 키워드로 만들기에는 너무 많은 노력이 필요하다고 판단되었습니다.

---

**저작권:** 이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.