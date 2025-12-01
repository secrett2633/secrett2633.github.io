---
title: "[Final] PEP 689 - Unstable C API tier"
excerpt: "Python Enhancement Proposal 689: 'Unstable C API tier'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/689/
toc: true
toc_sticky: true
date: 2025-09-27 10:13:23+0900
last_modified_at: 2025-09-27 10:13:23+0900
published: true
---
> **원문 링크:** [PEP 689 - Unstable C API tier](https://peps.python.org/pep-0689/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 22-Apr-2022



# PEP 689 – 불안정한 C API 계층 (Unstable C API tier)

## 요약 (Abstract)

이 PEP는 C-API의 일부 함수와 타입을 "불안정(unstable)"으로 지정할 것을 제안합니다. 이는 해당 API가 패치 (버그 수정/보안) 릴리스에서는 변경되지 않지만, 마이너 릴리스 (예: 3.11과 3.12 사이)에서는 폐기 예정 경고 없이 변경될 수 있음을 의미합니다. 또한, 선행 밑줄(leading underscore)이 붙은 모든 C API는 "내부(internal)"로 지정되어, 예고 없이 변경되거나 사라질 수 있습니다.

## 동기 및 배경 (Motivation & Rationale)

### 불안정한 C API 계층 (Unstable C API tier)

현재 Python C-API는 세 가지 안정성 계층으로 나뉩니다:
*   **제한된 API (Limited API):** 높은 호환성 기대를 가집니다.
*   **공개 API (Public API):** 하위 호환성 정책을 따르며, 변경 전에 폐기 예정 경고가 필요합니다.
*   **내부 (비공개) API (Internal (private) API):** 언제든지 변경될 수 있습니다.

CPython 내부 기능에 접근해야 하는 도구(예: 고급 디버거 및 JIT 컴파일러)는 종종 CPython의 마이너 시리즈 릴리스를 위해 빌드되며, 사용되는 C-API 내부 기능이 패치 릴리스에서는 변경되지 않는다고 가정합니다. 이러한 도구를 지원하기 위해, 공개 API와 비공개 C-API 사이에 마이너 시리즈 릴리스 전반에 걸쳐 안정성을 보장하는 새로운 계층, 즉 **불안정 계층 (Unstable tier)** 이 필요합니다.

`PyCode_New()`와 같은 일부 함수는 "불안정"으로 문서화되어 있으며 ("직접 호출하면 특정 Python 버전에 묶일 수 있다"), 실제로도 자주 변경됩니다. 불안정 계층은 이러한 함수의 상태를 문서를 주의 깊게 읽지 않는 사람들에게도 명확하게 하여, 실수로 사용하기 어렵게 만들 것입니다.

### 비공개 API를 위한 선행 밑줄 예약 (Reserving leading underscores for Private API)

현재 CPython 개발자들은 API 이름의 선행 밑줄에 대한 정확한 의미에 대해 일치된 의견이 없습니다. 선행 밑줄은 두 가지 다른 의미로 사용됩니다:
1.  여기서 제안된 불안정 계층처럼 마이너 릴리스 간에 변경될 수 있는 API (예: PEP 523에서 도입된 함수).
2.  완전히 비공개이며 CPython 외부에서는 사용해서는 안 되는 API (예: 예고 없이 변경될 수 있거나 CPython 코드만 보장할 수 있는 문서화되지 않은 가정에 의존하기 때문).

불명확한 의미는 밑줄의 유용성을 떨어뜨립니다. 만약 밑줄이 비공개 API만 표시한다면, CPython 개발자들은 밑줄이 붙은 함수를 변경하거나 사용하지 않는 함수를 제거할 때 외부에서 어떻게 문서화되거나 사용되는지 조사할 필요가 없을 것입니다.

전용 불안정 계층의 도입으로 선행 밑줄의 의미를 명확히 할 수 있으며, 이는 **비공개 API만 표시** 해야 합니다.

### 불필요하게 코드 손상 방지 (Not breaking code unnecessarily)

이 PEP는 불안정 계층의 API가 특별한 이름 접두사를 가져야 한다고 명시합니다. 이는 함수(매크로 등)의 이름이 변경되어야 함을 의미합니다. 이름 변경 후에도 비호환적인 변경이 이루어질 때까지 (즉, 호출 지점을 어차피 업데이트해야 할 때까지) 이전 이름은 계속 사용할 수 있어야 합니다. 즉, 단순히 함수의 계층을 변경하는 것만으로 사용자 코드를 손상시키지 않아야 합니다.

## 명세 (Specification)

C API는 안정성 기대치에 따라 세 가지 "섹션"(내부, 공개, 제한)으로 나뉘는데, 이를 이제부터 안정성 계층(tiers)이라고 부릅니다.

**불안정 계층 (Unstable tier)** 이 추가될 것입니다.
*   이 계층의 API (함수, 타입 등)는 `PyUnstable_` 접두사를 가지며, 선행 밑줄은 없습니다.
*   공개 API에 사용되는 헤더(예: `Include/*.h`)에 선언됩니다.

불안정 계층을 다루는 몇 가지 규칙이 도입됩니다:
*   불안정 API는 패치 릴리스 간에 하위 호환되지 않는 변경이 없어야 하지만, 마이너 릴리스(3.x.0, Alpha 및 Beta 릴리스 포함)에서는 변경되거나 제거될 수 있습니다. 이러한 변경 사항은 문서화되고 "새로운 기능 (What's New)" 문서에 언급되어야 합니다.
*   이러한 API에 대한 하위 호환되지 않는 변경은 이를 사용하는 코드가 새 버전으로 컴파일하기 위해 업데이트되어야 하도록 이루어져야 합니다 (예: 인수가 추가/제거되거나 함수 이름이 변경될 수 있지만, 인수의 의미론적 의미는 변경되어서는 안 됩니다).
*   불안정 API는 문서화되고 테스트되어야 합니다.

**API를 공개 계층에서 불안정 계층으로 이동하는 경우:**
*   새로운 `PyUnstable_*` 이름으로 노출되어야 합니다.
*   이전 이름은 폐기 예정(예: `Py_DEPRECATED` 사용)으로 표시되지만, API에 호환되지 않는 변경이 이루어질 때까지 계속 사용할 수 있어야 합니다. Python의 하위 호환성 정책(PEP 387)에 따라, 이 폐기 예정 기간은 최소 두 릴리스 동안 지속되어야 합니다 (SC 예외 없는 경우). 그러나 무기한으로 지속될 수도 있습니다.
*   다음과 같은 경우에는 SC 예외 없이 비호환적인 변경(따라서 폐기 예정 이름 제거)이 허용됩니다. 마치 해당 함수가 이미 불안정 계층의 일부였던 것처럼:
    *   Python 3.12 이전에 도입되었으며 기본값보다 안정성이 낮다고 문서화된 모든 API.
    *   Python 3.12 이전에 도입되었으며 선행 밑줄로 이름이 지정된 모든 API.

**내부 API를 불안정 계층으로 이동하는 경우:**
*   새로운 `PyUnstable_*` 이름으로 노출되어야 합니다.
*   이전 이름이 문서화되어 있거나 외부에서 널리 사용되는 경우, 호환되지 않는 변경이 이루어질 때까지 계속 사용할 수 있어야 합니다 (그리고 호출 지점을 업데이트해야 할 때까지). 폐기 예정 경고를 발생시키기 시작해야 합니다 (예: `Py_DEPRECATED` 사용).

**API를 불안정 계층에서 공개 계층으로 이동하는 경우:**
*   `PyUnstable_*` 접두사 없이 노출되어야 합니다.
*   이전 이름은 API가 폐기되거나 제거될 때까지 계속 사용할 수 있어야 합니다.

기존 기능에 대한 새로운 불안정 API를 추가하는 것은 베타 기능 동결(feature freeze) 이후에도 첫 번째 릴리스 후보(Release Candidate)까지 허용됩니다. 베타 기간에는 Core Development Discourse에서 합의가 필요합니다.

이러한 규칙은 개발 가이드(devguide)에 문서화될 것이며, 사용자 문서도 이에 따라 업데이트될 것입니다. `PyUnstable_*`로 이름이 지정된 C API에 대한 참조 문서는 불안정 계층 문서에 대한 링크가 포함된 노트를 자동으로 표시합니다.

### 선행 밑줄 (Leading underscore)

선행 밑줄이 붙은 C API와 `Py_BUILD_CORE`가 있을 때만 사용 가능한 API는 내부(internal)로 간주됩니다. 이는 다음을 의미합니다:
*   마이너 릴리스(3.x.0, Alpha 및 Beta 릴리스 포함)에서는 예고 없이 변경되거나 제거될 수 있습니다. 패치 릴리스나 릴리스 후보에서의 API 변경은 절대적으로 필요한 경우에만 이루어져야 합니다.
*   공개 문서가 아닌 소스 코드 주석 또는 개발 가이드에만 문서화되어야 합니다.
*   Python 3.12 이전에 도입되었으며 문서화되었거나 외부에서 널리 사용되는 API는 위에서 설명한 대로 불안정 계층으로 이동되어야 합니다.

이는 이 PEP가 승인된 후 오랜 시간이 지난 후에 발생할 수 있습니다. 결과적으로, 몇 년 동안 핵심 개발자들은 밑줄이 붙은 API를 변경하기 전에, 특히 `Py_BUILD_CORE`가 필요 없는 경우 일부 조사를 수행해야 합니다.

C API 사용자는 코드베이스에서 `_Py` 및 `_PY` 식별자 접두사를 검색하고, 발견된 모든 항목을 궁극적으로 해결해야 할 문제로 취급하도록 권장됩니다. 이는 기존 대안으로 전환하거나, 사용 사례에 대한 공개 API 노출을 요청하기 위해 CPython 이슈를 열고 궁극적으로 해당 API로 전환하는 방식입니다.

### 초기 불안정 API (Initial unstable API)

다음 API는 개념 증명으로 초기 구현에서 불안정 계층으로 이동됩니다.

**Code 객체 생성자:**
*   `PyUnstable_Code_New()` (`PyCode_New`에서 이름 변경)
*   `PyUnstable_Code_NewWithPosOnlyArgs()` (`PyCode_NewWithPosOnlyArgs`에서 이름 변경)

**Code 추가 정보 (PEP 523):**
*   `PyUnstable_Eval_RequestCodeExtraIndex()` (`_PyEval_RequestCodeExtraIndex`에서 이름 변경)
*   `PyUnstable_Code_GetExtra()` (`_PyCode_GetExtra`에서 이름 변경)
*   `PyUnstable_Code_SetExtra()` (`_PyCode_SetExtra`에서 이름 변경)

Python 3.12에서는 추가 PEP 없이 더 많은 API가 이동될 예정입니다.

## 하위 호환성 (Backwards Compatibility)

C API 하위 호환성 기대치가 더욱 명확해질 것입니다. 이름이 변경된 모든 API는 가능한 한 오랫동안 이전 이름으로 사용할 수 있을 것입니다.

## 교육 방법 (How to Teach This)

이 변경 사항은 숙련된 C 프로그래머에게 영향을 미치며, 이들은 업데이트된 참조 문서, 개발 가이드(devguide) 및/또는 "새로운 기능 (What's New)" 문서를 참조해야 합니다.

## 참고 구현 (Reference Implementation)

[https://github.com/python/cpython/compare/main...encukou:unstable-tier](https://github.com/python/cpython/compare/main...encukou:unstable-tier)

## 기각된 아이디어 (Rejected Ideas)

### 특별한 접두사 없음 (No special prefix)

이 PEP의 초기 버전에서는 불안정 API에 `PyUnstable` 접두사가 없었습니다. 대신, `Py_USING_UNSTABLE_API`를 정의하면 해당 소스 파일에서 API를 사용할 수 있었으며, 이는 파일 전체가 각 Python 릴리스마다 재검토될 가능성이 있음을 인지하는 것을 의미했습니다. 그러나 불안정성은 개별 이름에 노출되어야 한다고 결정되었습니다.

### 밑줄 접두사 (Underscore prefix)

비공개 API와 불안정 API를 모두 선행 밑줄로 표시하는 것도 가능했을 것입니다. 그러나 그렇게 하면 `_Py` 접두사의 의미가 희석될 것입니다. 접두사를 내부 API에만 예약하면 검색이 매우 쉬워집니다.

### 새로운 헤더 디렉터리 (New header directory)

다른 API 계층에는 헤더를 위한 전용 디렉터리(`Include/cpython/`, `Include/internal/`)가 있습니다. 그러나 불안정 계층은 매우 명확한 명명 규칙을 사용하고 이름이 항상 사용 가능하므로 `Include/unstable/`와 같은 디렉터리는 불필요합니다.

### Python API (Python API)

`types.CodeType`과 같은 Python (C가 아닌) API에도 유사한 계층을 추가하는 것이 좋을 수 있습니다. 그러나 이를 위한 메커니즘은 달라야 하며, 이는 이 PEP의 범위를 벗어납니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 허용적인 조건으로 제공됩니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.