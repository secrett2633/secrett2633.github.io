---
title: "[Final] PEP 652 - Maintaining the Stable ABI"
excerpt: "Python Enhancement Proposal 652: 'Maintaining the Stable ABI'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/652/
toc: true
toc_sticky: true
date: 2025-09-27 01:41:49+0900
last_modified_at: 2025-09-27 01:41:49+0900
published: true
---
> **원문 링크:** [PEP 652 - Maintaining the Stable ABI](https://peps.python.org/pep-0652/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 09-Feb-2021


## PEP 652 – Stable ABI 유지 관리

### 개요

PEP 652는 CPython의 Limited C-API와 Stable ABI(PEP 384에서 도입)를 단일하고 명확한 파일로 공식화하고, 이를 테스트하며 문서화하는 것을 목표로 합니다. 이를 통해 CPython 확장 모듈 개발자들이 바이너리 호환성을 유지하면서 여러 Python 버전에서 모듈을 사용할 수 있도록 지원합니다.

### 도입 배경 (Motivation)

PEP 384는 Limited API와 Stable ABI를 정의하여 CPython 확장 및 임베딩 사용자들이 3.x 버전의 모든 후속 버전과 바이너리 호환성을 갖는 확장 모듈을 컴파일할 수 있도록 했습니다. 이는 다음과 같은 이점을 제공했습니다:

*   **다중 Python 버전 지원:** 한 번의 빌드로 여러 Python 버전을 지원하여 빌드에 필요한 시간, 전력 및 유지 관리자의 노력을 줄일 수 있습니다.
*   **사전 릴리스 기간 테스트:** Stable ABI를 사용하는 바이너리 휠(wheel)은 사전 릴리스 기간 동안에도 새로운 CPython 버전과 호환되어, 소스 코드 빌드가 어려운 환경에서도 테스트가 가능합니다.
*   **대체 Python 구현 지원:** Limited API가 구현 세부 사항을 숨기므로, 전체 C API와 호환되지 않는 대체 Python 구현의 유효한 타겟이 될 수 있습니다.

하지만 PEP 384 및 그 구현에는 다음과 같은 여러 문제가 있었습니다:

*   **불명확한 정의:** Stable ABI에 대한 명확한 opt-out/opt-in 메커니즘이 부족했으며, `#define` 매크로의 최신 상태 유지 및 문서 업데이트 프로세스가 부재했습니다.
*   **잦은 손상:** 함수가 매크로로 변경되는 경우처럼 Stable ABI가 쉽게 손상되는 경향이 있었습니다.
*   **폐기 절차 부재:** Limited API의 일부를 폐기(deprecate)할 방법이 없었습니다.
*   **불완전성:** 일부 필수 작업이 Stable ABI에서 누락된 경우가 있었습니다.

PEP 652는 이러한 문제들을 해결하여 Limited API를 더 명확히 정의하고, Stable ABI와 Limited API를 더욱 유용하고 견고하게 만들기 위한 프로세스를 도입합니다.

### 제안 (Rationale)

이 PEP의 핵심은 Stable ABI의 모든 멤버를 수작업으로 관리되는 단일 "매니페스트(manifest)" 파일에 명시적으로 나열하는 것입니다. 자동 생성 방식도 고려되었지만, 플랫폼별 차이점과 API 변경 작업의 중요성을 고려할 때 수동 관리가 더 적절하다고 판단되었습니다. 이 매니페스트 파일을 통해 문서화 및 DLL 콘텐츠 등을 자동으로 생성하고, 향후 테스트 자동화도 가능하게 할 예정입니다.

### Stable ABI vs. Limited API

PEP 384와 이 문서는 Limited API와 Stable ABI라는 두 가지 관련 있지만 별개의 개념을 다룹니다.

*   **Stable ABI:** CPython 3.x로 컴파일된 특정 확장 기능이 3.x의 모든 후속 버전과 바이너리 호환성을 가질 것이라는 약속입니다. 이는 하위 수준의 세부 사항(예: 메모리 내 구조체 레이아웃, 함수 호출 규칙)이 안정적일 때만 적용됩니다. Stable ABI는 성능과 맞바꾸어 안정성을 제공하며, 향후 Python 버전에서 일부 멤버가 폐기될 수 있습니다.
*   **Limited API:** Stable ABI 약속이 유효하도록 코드가 제한되는 CPython C API의 하위 집합입니다. 이 API를 대상으로 하는 확장 기능은 전처리기 매크로 `Py_LIMITED_API`를 정의해야 합니다. Limited API는 미래에 폐기되거나 제거될 수 있지만, Stable ABI는 안정적으로 유지되어야 합니다. Limited API의 목표는 인터프리터와 상호 작용하는 데 필요한 모든 것을 포함하는 것이며, 다른 Python 구현체들도 이를 구현하도록 권장됩니다.

### 명세 (Specification)

Stable ABI를 더 유용하고 견고하게 만들기 위해 다음 변경 사항이 제안됩니다:

#### Stable ABI Manifest

Stable ABI의 모든 멤버(함수, typedef, struct, 데이터, 매크로, 상수)는 `Misc/stable_abi.txt`라는 단일 "매니페스트" 파일에 명시적으로 나열됩니다. Struct의 경우, 사용자가 접근할 수 있는 필드도 명시적으로 나열됩니다. 이 매니페스트는 Limited API의 최종 목록 역할도 하며, 특정 시스템에서만 사용 가능한 항목은 해당 기능 매크로(예: `MS_WINDOWS`, `HAVE_FORK`)와 함께 기록됩니다.

이 ABI 매니페스트로부터 다음이 생성됩니다:
*   Windows 공유 라이브러리 소스 (`PC/python3dll.c`).
*   문서화 입력.
*   런타임 시 기호 가용성을 확인하는 테스트 케이스.

또한, 연속 통합(CI)의 일부로 매니페스트에 대해 다음이 확인됩니다:
*   참조 카운트 요약 (`Doc/data/refcounts.txt`)에 Stable ABI의 모든 함수가 포함되어 있는지.
*   `Py_LIMITED_API`가 설정된 `Python.h`가 포함될 때 선언되는 함수/구조체 및 정의되는 상수/매크로.

#### Stable ABI의 내용

초기 Stable ABI 매니페스트에는 PEP 384에 명시된 Stable ABI, `PC/python3dll.c`에 나열된 모든 것, 그리고 이러한 함수가 반환하거나 인수로 사용하는 모든 구조체(struct typedefs) 등이 포함됩니다.

#### Limited API 문서화

Python 문서에 "Part of the Limited API"라는 주석이 자동으로 추가되며, Limited API의 모든 멤버에 대한 완전한 목록도 문서에 포함됩니다.

#### Stable ABI 테스트

Stable ABI에 포함된 모든 기호가 컴파일 시간에 사용 가능한지 확인하기 위해 자동으로 생성된 테스트 모듈이 추가됩니다.

#### Limited API 변경

Limited API 변경(새 항목 추가 및 기존 항목 제거 포함)을 위한 체크리스트가 개발자 가이드(Devguide)에 추가됩니다. 이 체크리스트는 Python C API 설계의 모범 사례와 일반적인 함정을 언급하고, Limited API 변경 시 수정해야 할 파일과 실행해야 할 스크립트를 안내합니다.

주요 설계 고려 사항은 다음과 같습니다:
*   Python 3.5 이후 버전의 Stable ABI를 손상시키지 않아야 합니다.
*   노출된 이름은 비공개(예: 밑줄로 시작)이지 않아야 합니다.
*   새로운 API는 잘 문서화되어야 합니다.
*   새로운 API 및 그 의도된 사용은 PEP 7에 명시된 C 방언을 포함하여 표준 C를 따라야 합니다.
*   참조 카운팅 규칙을 따라야 합니다.
*   소유권 규칙과 모든 해당 구조체 필드, 인수 및 반환 값의 수명이 잘 정의되어야 합니다.

#### 확장 및 임베딩 사용자(Extenders and Embedders)를 위한 조언

문서에 확장 모듈 개발자를 위한 다음 사항이 추가됩니다:
*   확장 모듈 작성자는 지원하는 모든 Python 버전으로 테스트하고, 가급적 가장 낮은 버전으로 빌드해야 합니다.
*   `Py_LIMITED_API`를 정의하여 컴파일하는 것이 코드가 Limited API 또는 Stable ABI를 준수한다는 보장은 아닙니다. 이 매크로는 정의만 다루지만, API는 예상되는 의미 체계와 같은 다른 문제도 포함합니다. `Py_LIMITED_API`가 방지하지 못하는 문제의 예로는 유효하지 않은 인수로 함수 호출, 특정 구조체 필드의 비공개 성격 등이 있습니다.

#### Python 재배포자를 위한 참고 사항

Stable ABI 약속은 메모리 내 구조체 레이아웃 및 함수 호출 규칙과 같은 하위 ABI 세부 정보에 의존하며, 이는 컴파일러 및 해당 설정의 영향을 받습니다. 이 약속이 유효하려면 특정 플랫폼에서 CPython 3.x 릴리스 간에 이러한 세부 정보가 변경되지 않아야 합니다.

### 이전 버전과의 호환성 (Backwards Compatibility)

이 PEP는 기존 Stable ABI 및 Limited API와 완전히 호환되도록 하는 것을 목표로 하지만, 해당 용어를 더 명시적으로 정의합니다.

### 보안 영향 (Security Implications)

알려진 보안 영향은 없습니다.

### 교육 방법 (How to Teach This)

기술 문서는 `Doc/c-api/stable`에 제공되며, "What's New" 문서에서 링크될 예정입니다. CPython 핵심 개발자를 위한 문서는 개발자 가이드에 추가됩니다.

### 향후 계획 (Ideas for the Future)

이 PEP의 범위는 아니지만, 다음과 같은 향후 방향이 고려됩니다:
*   폐기(deprecation) 및 제거(removal) 프로세스 정의.
*   ABI 매니페스트를 C 헤더 파일로 만들거나 매니페스트에서 헤더 파일을 생성하는 C 문법 도입.## PEP 652 – Stable ABI 유지 관리

### 개요

PEP 652는 CPython의 Limited C-API와 Stable ABI(PEP 384에서 도입)를 단일하고 명확한 파일로 공식화하고, 이를 테스트하며 문서화하는 것을 목표로 합니다. 이 제안의 핵심은 CPython 확장 모듈 개발자들이 바이너리 호환성을 유지하면서 여러 Python 버전에서 모듈을 안정적으로 사용할 수 있도록 돕는 것입니다.

### 도입 배경 (Motivation)

PEP 384는 Limited API와 Stable ABI를 통해 CPython 확장 모듈이 Python 3.x의 모든 후속 버전과 바이너리 호환성을 갖도록 했습니다. 이는 한 번의 빌드로 여러 Python 버전을 지원하고, 사전 릴리스 기간 동안에도 테스트를 가능하게 하며, 대체 Python 구현을 지원하는 등의 이점을 제공했습니다.

그러나 PEP 384의 구현은 불명확한 정의, 잦은 Stable ABI 손상, Limited API의 폐기 절차 부재, 그리고 일부 필수 기능의 누락과 같은 여러 문제점을 가지고 있었습니다. PEP 652는 이러한 문제들을 해결하여 Limited API를 명확히 하고, Stable ABI와 Limited API의 유용성과 견고성을 높이기 위한 새로운 프로세스를 도입하고자 합니다.

### 제안 (Rationale)

이 PEP의 주요 기술적 변경 사항은 Stable ABI의 모든 멤버를 수작업으로 관리되는 단일 "매니페스트(manifest)" 파일인 `Misc/stable_abi.txt`에 명시적으로 나열하는 것입니다. 이 매니페스트는 문서, Windows 공유 라이브러리 소스 및 테스트 케이스를 자동으로 생성하는 데 사용되며, 지속적인 통합(CI)의 일부로 검증될 예정입니다.

### Stable ABI vs. Limited API

이 두 용어는 관련이 있지만 다음과 같이 구분됩니다:

*   **Stable ABI:** CPython 3.x로 컴파일된 확장 기능이 3.x의 모든 후속 버전과 바이너리 호환성을 가질 것이라는 약속입니다. 이는 낮은 수준의 세부 사항(예: 메모리 내 구조체 레이아웃)이 안정적일 때만 유효하며, 성능과 안정성을 교환하는 개념입니다.
*   **Limited API:** Stable ABI 약속이 유효하도록 코드가 제한되는 CPython C API의 하위 집합입니다. 이 API를 대상으로 하는 코드는 전처리기 매크로 `Py_LIMITED_API`를 정의해야 합니다. Limited API는 미래에 폐기되거나 제거될 수 있지만, Stable ABI는 안정적으로 유지되어야 합니다.

### 명세 (Specification)

Stable ABI를 강화하기 위한 주요 명세는 다음과 같습니다:

*   **Stable ABI Manifest:** 모든 Stable ABI 멤버가 `Misc/stable_abi.txt` 파일에 명시적으로 나열됩니다. 이 파일은 Limited API의 최종 목록 역할도 합니다.
*   **문서화:** Python 문서에 "Part of the Limited API" 주석과 함께 Limited API의 모든 멤버 목록이 자동으로 추가됩니다.
*   **테스트:** Stable ABI에 포함된 모든 심볼이 컴파일 시간에 사용 가능한지 확인하는 자동 생성 테스트 모듈이 추가됩니다.
*   **Limited API 변경 가이드:** Limited API 변경을 위한 체크리스트가 Devguide에 추가되어, 모범 사례를 제시하고 변경 시 필요한 파일 및 스크립트 실행을 안내합니다.
*   **확장 및 임베딩 사용자 조언:** `Py_LIMITED_API` 정의가 코드의 Limited API 준수를 완전히 보장하지 않으므로, 모든 Python 버전으로 테스트하고 가장 낮은 버전으로 빌드하는 것이 권장됩니다.

### 향후 계획 (Ideas for the Future)

이 PEP의 범위는 아니지만, Limited API의 폐기 및 제거 프로세스 정의, 그리고 ABI 매니페스트를 C 헤더 파일로 만들거나 헤더 파일을 매니페스트에서 생성하는 C 문법 도입 등이 향후 고려될 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.