---
title: "[Withdrawn] PEP 209 - Multi-dimensional Arrays"
excerpt: "Python Enhancement Proposal 209: 'Multi-dimensional Arrays'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/209/
toc: true
toc_sticky: true
date: 2025-09-26 16:21:26+0900
last_modified_at: 2025-09-26 16:21:26+0900
published: true
---
> **원문 링크:** [PEP 209 - Multi-dimensional Arrays](https://peps.python.org/pep-0209/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 03-Jan-2001


# PEP 209 – 다차원 배열 (Multi-dimensional Arrays)

*   **저자:** Paul Barrett, Travis Oliphant
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2001년 1월 3일
*   **Python 버전:** 2.2
*   **Post-History:** N/A (정보 없음)

## 요약 (Abstract)
이 PEP는 다차원 배열 모듈인 `Numeric`을 재설계하고 재구현하여 새로운 기능과 확장을 더 쉽게 추가할 수 있도록 제안합니다. `Numeric 2`의 주요 초점은 기가바이트를 초과하는 대규모 배열과 이기종 데이터 구조(inhomogeneous data structures) 또는 레코드(records)에 대한 효율적인 접근이었습니다. 제안된 설계는 네 가지 Python 클래스(`ArrayType`, `UFunc`, `Array`, `ArrayView`)와 효율적인 배열 연산을 처리하기 위한 저수준 C-확장 모듈 `_ufunc`를 사용합니다. 또한, 각 배열 타입은 자체 C-확장 모듈을 가지며, 이는 해당 타입의 강제 변환(coercion) 규칙, 연산 및 메서드를 정의합니다. 이 설계는 새로운 타입, 기능 및 확장을 모듈 방식으로 추가할 수 있도록 합니다. 새 버전은 기존 `Numeric`과의 일부 비호환성을 도입할 예정이었습니다.

## 동기 (Motivation)
다차원 배열은 과학, 공학 및 컴퓨팅 분야에서 데이터를 저장하고 조작하는 데 일반적으로 사용됩니다. Python에는 현재 `Numeric` (이후 `Numeric 1`)이라는 확장 모듈이 있으며, 이는 중간 크기(약 10MB)의 동종(homogeneous) 데이터 배열을 조작하는 사용자에게 만족스러운 기능을 제공합니다. 그러나 더 큰 배열(100MB 이상)과 이기종 데이터에 접근하는 경우, `Numeric 1`의 구현은 비효율적이고 번거롭습니다. 미래에는 PEP 211, PEP 225에서 보듯이 Numerical Python 커뮤니티의 추가 기능 요청이 많아질 것으로 예상되었습니다.

## 제안 (Proposal)
이 제안은 `Numeric 1`을 `Numeric 2`로 재설계하고 재구현할 것을 권장하며, 이를 통해 새로운 타입, 기능 및 확장을 쉽고 모듈화된 방식으로 추가할 수 있게 합니다. `Numeric 2`의 초기 설계는 다양한 타입의 배열을 조작하기 위한 일반적인 프레임워크를 제공하고, 새로운 배열 타입과 `UFunc`를 추가하는 간단한 메커니즘을 가능하게 하는 데 중점을 두어야 합니다. 다양한 분야에 더 특화된 기능적 메서드는 이 핵심 위에 계층화될 수 있습니다. 이 새로운 모듈은 여전히 `Numeric`이라고 불리며 `Numeric 1`에서 발견되는 대부분의 동작은 유지될 예정이었습니다.

제안된 설계는 `ArrayType`, `UFunc`, `Array`, `ArrayView`의 네 가지 Python 클래스와 배열 연산을 효율적으로 처리하는 저수준 C-확장 모듈을 사용합니다. 각 배열 타입은 해당 타입의 강제 변환 규칙, 연산 및 메서드를 정의하는 자체 C-확장 모듈을 가집니다. 핵심 기능이 안정화되면 일부 Python 클래스는 C-확장 타입으로 변환될 수 있습니다.

몇 가지 계획된 기능은 다음과 같습니다:
*   **개선된 메모리 사용량 (Improved memory usage):** 대규모 배열 처리 시 특히 중요하며, 성능 및 메모리 사용량을 크게 개선할 수 있습니다.
    *   **로컬 강제 변환 모델 사용 (Use a local coercion model):** `PEP 208`에 설명된 대로 Python의 전역 강제 변환 모델 대신 연산자에게 강제 변환 책임을 위임하는 로컬 모델을 구현합니다.
    *   **임시 배열 생성 방지 (Avoid creation of temporary arrays):** 복잡한 배열 표현식에서 임시 배열의 데이터 버퍼를 재사용하여 성능을 향상시킵니다.
    *   **메모리 맵 파일의 선택적 사용 (Optional use of memory-mapped files):** 사용 가능한 메모리보다 큰 데이터를 처리하거나 매우 큰 파일의 데이터에 접근하기 위해 메모리 맵 배열을 투명하게 사용할 수 있도록 합니다.
*   **레코드 접근 (Record access):** 이기종 데이터를 저장하는 레코드 또는 C-like 구조에 대한 접근을 지원합니다. 바이트 정렬 및 바이트 스와핑(byte swapping)과 같은 문제를 자동으로 처리하도록 설계되었습니다.
*   **추가 배열 타입 (Additional array types):** `ushort`, `uint`, `ulong`과 같은 부호 없는 정수 타입이나 비트(bit) 타입과 같은 새로운 배열 타입을 쉽게 추가할 수 있도록 `Numeric`의 재설계가 필요합니다.
*   **비트 타입 (Bit type):** 배열 간의 풍부한 비교(rich comparison) 결과로 생성되는 불리언(boolean) 값을 저장하는 데 `char` 타입 대신 비트 타입을 사용하여 메모리 사용량을 1/8로 줄입니다.
*   **향상된 배열 인덱싱 문법 (Enhanced array indexing syntax):** 불규칙한 간격의 인덱스 목록이 필요한 경우 1차원 배열을 인수로 허용하는 향상된 배열 인덱싱 문법을 제안합니다.
*   **풍부한 비교 (Rich comparisons):** `PEP 207`의 `Rich Comparisons` 기능을 `Numeric 2`에 구현하여 배열 조작 시 유연성을 높입니다.
*   **배열 브로드캐스팅 규칙 (Array broadcasting rules):** 스칼라와 배열 간의 연산에서 스칼라 값이 배열의 형태를 가지는 새로운 배열로 확장되는 `array broadcasting` 동작을 구현합니다.

## 설계 및 구현 (Design and Implementation)
`Numeric 2`의 설계는 네 가지 주요 클래스를 가집니다:

### ArrayType
배열 타입의 기본 속성(이름, 바이트 단위 크기, 다른 타입과의 강제 변환 관계 등)을 설명하는 간단한 클래스입니다.
*   **속성 (Attributes):** `.name`, `.typecode` (하위 호환성), `.size`, `.array_rules`, `.pyobj_rules`, `.doc`.
*   **메서드 (Methods):** `__init__()`, `__del__()`, `__repr__()`.
*   **C-API:** 추가 정의 필요.

### UFunc
`Numeric 2`의 핵심 클래스입니다. `ArrayType`과 유사하게, 이름, 총 인수 수, 입력 인수 수, 문서 문자열 및 비어 있는 `CFunc` 사전을 속성으로 가지는 단일 호출 가능 객체(`singleton callable object`)를 생성합니다. `__call__` 메서드는 배열에 연산이 적용될 때 호출되며, 인수의 타입을 확인하고 `CFunc` 사전을 통해 적절한 C 함수를 찾아 연산을 수행합니다.
*   **속성 (Attributes):** `.name`, `.nargs`, `.iargs`, `.cfuncs`, `.doc`.
*   **메서드 (Methods):** `__init__()`, `__del__()`, `__repr__()`, `__call__()`, `initrule()`, `uninitrule()`, `register()`, `unregister()`.
*   **C-API:** 추가 정의 필요.

### Array
배열의 형상(shape), 타입, 데이터의 엔디안(endianness)과 같은 정보를 포함하는 클래스입니다. `+`, `-` 등의 연산자는 해당 `UFunc` 함수를 호출합니다.
*   **속성 (Attributes):** `.shape`, `.format`, `.real` (복소수만 해당), `.imag` (복소수만 해당).
*   **메서드 (Methods):** `__init__()`, `__del__()`, `__repr__()`, `__str__()`, `__cmp__()`, `__len__()`, `__getitem__()`, `__setitem__()`, `__getslice__()`, `__setslice__()`, `copy()`, `aslist()`, `asstring()`.
*   **함수 (Functions):** `fromlist()`, `fromstring()`, `array()`, `concat()`, `resize()`.
*   **C-API:** 추가 정의 필요.

### ArrayView
`Array` 클래스와 유사하지만, `reshape` 및 `flat` 메서드는 예외를 발생시킵니다. 이는 비연속적인 배열은 포인터와 스텝(step-size) 정보만으로는 재형상화(reshape)하거나 평탄화(flatten)할 수 없기 때문입니다.
*   **C-API:** 추가 정의 필요.

### C-확장 모듈 (C-extension modules)
`Numeric 2`는 여러 C-확장 모듈을 가질 예정이었습니다.
*   `_ufunc`: 최소한의 기능, 즉 지정된 C 함수를 사용하여 배열을 반복(iterate)하는 역할을 담당합니다.
*   `_int32`, `_real64` 등: 각 배열 타입별 C-확장 모듈로, `UFunc` 모듈에 의해 임포트될 때 자동으로 함수와 강제 변환 규칙을 등록합니다.

## 미해결 과제 (Open Issues)
`PEP 209`는 다음과 같은 여러 미해결 과제를 언급했습니다:

*   **슬라이싱 문법의 기본 동작 (Does slicing syntax default to copy or view behavior?):** Python 리스트와 일관성을 위해 복사(copy) 동작을 할 것인지, `Numeric 1`처럼 성능을 위해 뷰(view) 동작을 할 것인지에 대한 논의가 있었습니다.
*   **아이템 문법의 기본 동작 (Does item syntax default to copy or view behavior?):** 슬라이싱 문법과 유사하게, `a[0]`과 같은 아이템 접근 시 복사본을 반환할지 뷰를 반환할지에 대한 문제입니다.
*   **스칼라 강제 변환 구현 방식 (How is scalar coercion implemented?):** Python의 `float` 타입이 `double`이기 때문에 `Numeric` 배열이 예상치 않게 `double`로 변환되는 문제를 해결하기 위한 스칼라 강제 변환 규칙 정의가 필요했습니다.
*   **정수 나눗셈 처리 방식 (How is integer division handled?):** Python 3에서 정수 나눗셈의 동작이 변경됨에 따라 `Numeric 2`에서 `//` 연산의 일관성을 어떻게 유지할지에 대한 문제입니다.
*   **레코드 구현 방식 (How should records be implemented?):** 레코드를 별도의 배열 클래스로 구현할지, 아니면 다양한 배열 타입 중 하나로 구현할지에 대한 접근 방식 논의가 있었습니다.
*   **레코드 시맨틱스 정의 및 구현 방식 (How are record semantics defined and implemented?):** 레코드의 하위 필드에 접근하고 조작하는 문법 및 의미론에 대한 결정이 필요했습니다.
*   **마스크드 배열 구현 방식 (How are masked-arrays implemented?):** `Numeric 1`에서는 별도의 배열 클래스였지만, `Numeric 2`에서는 새로운 배열 타입으로 구현될 가능성이 있었습니다.
*   **수치 오류 처리 방식 (How are numerical errors handled?):** `divide-by-zero`, `underflow`, `overflow`와 같은 수치 오류를 어떻게 처리할지 (예: 메시지 출력, 오류 추적 등)에 대한 여러 옵션이 제시되었습니다.
*   **FORTRAN 라이브러리 및 코드 통합을 용이하게 하는 데 필요한 기능 (What features are needed to ease the integration of FORTRAN libraries and code?):** FORTRAN 코드와의 통합을 용이하게 하는 기능에 대한 고려가 필요했습니다.

## 구현 단계 (Implementation Steps)
제안된 구현 단계는 다음과 같습니다:
1.  **기본 `UFunc` 기능 구현:** 최소한의 `Array`, `ArrayType`, `UFunc` 클래스 및 `_UFunc` C-확장 모듈을 구현하여 1차원 배열의 기본 연산(예: `c = add(a, b)`)을 가능하게 합니다.
2.  **`UFunc` 이터레이터 및 `Array` 클래스 지속적으로 개선:** `print`, `repr`, `getitem`, `setitem`과 같은 `Array` 클래스의 접근 메서드를 구현하고, 다차원 배열을 지원하며, `UFunc`를 사용하여 기본 배열 메서드를 구현합니다.
3.  **표준 `UFunc` 및 `Array` 클래스 동작 완료:** `getslice`, `setslice` 동작, 배열 브로드캐스팅 규칙, 레코드 타입 등을 구현합니다.
4.  **추가 기능 추가:** 더 많은 `UFunc`와 버퍼 또는 `mmap` 접근을 구현합니다.

## 비호환성 (Incompatibilities)
`Numeric 1`과 `Numeric 2` 간의 행동 비호환성은 다음과 같았습니다:

*   **스칼라 강제 변환 규칙 (Scalar coercion rules):** `Numeric 1`의 단일 강제 변환 규칙 대신, `Numeric 2`는 배열과 Python 숫자 타입용, 그리고 배열 전용의 두 가지 강제 변환 규칙을 가질 예정이었습니다.
*   **`savespace` 속성 없음 (No savespace attribute):** `Numeric 1`의 `savespace` 속성은 `Numeric 2`에 없으며, 따라서 일반 배열 강제 변환 규칙이 적용될 예정이었습니다.
*   **슬라이싱 문법이 복사본 반환 (Slicing syntax returns a copy):** `Numeric 1`의 슬라이싱 문법은 원본 배열의 뷰를 반환했지만, `Numeric 2`는 복사본을 반환할 예정이었습니다. 뷰를 얻으려면 `ArrayView` 클래스를 사용해야 할 것이었습니다.
*   **불리언 비교가 불리언 배열 반환 (Boolean comparisons return a boolean array):** Python의 제약으로 인해 `Numeric 1`에서는 배열 간 비교 결과가 불리언 스칼라였지만, Python 2.1의 `Rich Comparisons` 도입으로 불리언 배열을 반환할 수 있게 될 예정이었습니다.
*   **타입 문자가 더 이상 사용되지 않음 (Type characters are deprecated):** `Numeric 2`는 `Int8`, `Int16`, `Int32`와 같은 `ArrayType` 클래스를 가질 예정이었으며, `Numeric 1`의 `typecode` 체계는 하위 호환성을 위해 제공되지만 더 이상 사용되지 않을 예정이었습니다.

## 부록 (Appendices)
### 암시적 하위 배열 이터레이션 (Implicit sub-arrays iteration)
`J` 언어를 기반으로 `Numeric 1` 개발자들이 구현하려 했으나 완성하지 못했던 기능으로, 다차원 배열에서 하위 배열에 대한 연산을 암시적으로 수행하는 방식이었습니다. `Numeric 2`에서 배열 브로드캐스팅 규칙이 이 동작을 완전히 지원하지 않는다면 구현될 예정이었습니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 있습니다.

## 관련 PEP (Related PEPs)
*   PEP 207: Rich Comparisons
*   PEP 208: Reworking the Coercion Model
*   PEP 211: Adding New Linear Algebra Operators to Python
*   PEP 225: Elementwise/Objectwise Operators
*   PEP 228: Reworking Python's Numeric Model

## 참조 (References)
*   Greenfield 2000. private communication.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.