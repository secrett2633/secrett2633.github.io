---
title: "[Final] PEP 203 - Augmented Assignments"
excerpt: "Python Enhancement Proposal 203: 'Augmented Assignments'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/203/
toc: true
toc_sticky: true
date: 2025-09-26 16:13:23+0900
last_modified_at: 2025-09-26 16:13:23+0900
published: true
---
> **원문 링크:** [PEP 203 - Augmented Assignments](https://peps.python.org/pep-0203/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 13-Jul-2000



## PEP 203: 증강 할당 (Augmented Assignments)

*   **작성자:** Thomas Wouters
*   **상태:** Final (최종)
*   **유형:** Standards Track
*   **생성일:** 2000년 7월 13일
*   **Python 버전:** 2.0

### 서론

PEP 203은 Python 2.0에 도입될 증강 할당(augmented assignment) 연산자에 대한 제안을 다룹니다. 이 문서는 해당 기능의 상태와 소유권을 추적하며, 기능에 대한 설명과 이를 지원하기 위해 필요한 변경 사항을 설명합니다. 또한, 메일링 리스트 포럼에서 진행된 논의를 요약하고 추가 정보가 필요한 경우 URL을 제공합니다.

### 제안된 의미론 (Proposed Semantics)

증강 할당은 `+=`, `-=`, `*=`, `/=`, `%=`, `**=`, `<<=`, `>>=`, `&=`, `^=`, `|=`와 같은 새로운 연산자를 도입합니다. 이 연산자들은 일반적인 이항(binary) 연산자와 동일하게 작동하지만, 좌변 객체가 이를 지원하는 경우 제자리(in-place)에서 연산을 수행하며, 좌변은 한 번만 평가됩니다.

`x += y`와 같은 표현식에서, 객체 `x`가 로드된 후 `y`가 `x`에 더해지고, 그 결과 객체가 원래 위치에 다시 저장됩니다. 두 인수에 대한 정확한 동작은 `x`의 타입과 `y`의 타입에 따라 달라집니다.

Python에서 증강 할당의 핵심 아이디어는 단순히 이항 연산의 결과를 좌변 피연산자에 저장하는 일반적인 방식을 더 쉽게 작성하는 것을 넘어, 좌변 피연산자가 자체적으로 수정되어야 함을 인지하고 수정된 복사본을 생성하는 대신 자체적으로 연산하도록 하는 것입니다.

이를 가능하게 하기 위해, Python 클래스 및 C 확장 타입에 여러 새로운 훅(hook)이 추가되었습니다. 이 훅들은 해당 객체가 증강 할당 연산의 좌변으로 사용될 때 호출됩니다. 클래스나 타입이 in-place 훅을 구현하지 않으면, 해당 이항 연산에 대한 일반 훅이 사용됩니다.

예를 들어, `x`라는 인스턴스 객체에 대해 `x += y` 표현식은 `x.__iadd__(y)`를 호출하려고 시도합니다. 이는 `__add__`의 in-place 변형입니다. 만약 `__iadd__`가 없으면 `x.__add__(y)`가 시도되고, `__add__`도 없으면 `y.__radd__(x)`가 시도됩니다. `__iadd__`에는 우변(right-hand-side) 변형이 없습니다. `__iadd__` 훅은 `__add__`와 유사하게 동작해야 하며, `x` 변수에 할당될 연산의 결과(자신일 수도 있음)를 반환해야 합니다.

C 확장 타입의 경우, 훅은 `PyNumberMethods` 및 `PySequenceMethods` 구조체의 멤버입니다. 일반적인 `x <augop> y`의 경우, 주 연산 대상 객체는 `x`입니다. In-place 연산은 in-place 수정이 지원되지 않을 때 일반 이항 연산으로 대체됩니다.

### 도입 배경 (Rationale)

이 기능을 Python에 추가하는 주요 이유는 표현의 간결성(simplicity of expression)과 in-place 연산(in-place operations) 지원이라는 두 가지입니다. 궁극적인 결과는 구문(syntax)의 간결성과 표현의 간결성 사이의 절충점입니다. 증강 할당은 이전에 불가능했던 것을 추가하는 것이 아니라, 이러한 작업을 더 쉽게 만듭니다.

증강 할당을 추가하면 Python의 구문이 더 복잡해집니다. 그러나 이러한 새로운 할당 형식은 할당과 이항 연산 간의 결합으로 이해하기 쉽고, 이해하는 데 큰 개념적 도약이 필요하지 않습니다. 또한, 증강 할당을 가진 다른 언어들이 이 기능이 인기 있고 많이 사용된다는 것을 보여주었습니다.

`<x> = <x> <operator> <y>` 형태의 표현식은 이러한 언어에서 추가 구문을 사용할 가치가 있을 만큼 충분히 흔하며, Python에서도 이러한 표현식이 적지 않습니다. 특히 Python에서는 이항 연산자로 리스트를 연결할 수 있어 자주 사용됩니다. 이러한 표현식을 `<x> <operator>= <y>`로 작성하는 것이 더 읽기 쉽고 오류 발생 가능성이 적습니다.

새로운 in-place 연산은 특히 행렬 계산 및 대규모 객체를 필요로 하는 다른 응용 프로그램에 유용합니다. 이러한 패키지들은 현재의 이항 연산이 항상 새 객체를 생성하므로, 기존의 (대규모) 객체에 단일 항목을 추가하는 것이 전체 객체를 복사하고 (메모리 부족을 유발할 수 있음) 단일 항목을 추가한 다음, 참조 횟수에 따라 원본 객체를 삭제하는 결과를 초래할 수 있습니다.

이 문제를 해결하기 위해 현재 패키지들은 객체를 in-place로 수정하기 위해 메서드나 함수를 사용해야 하는데, 이는 증강 할당 표현식보다 가독성이 떨어집니다. 증강 할당은 이 모든 문제를 해결하지는 못하겠지만, 시작점입니다.

### 새로운 메서드 (New Methods)

제안된 구현은 Python 클래스가 증강 할당 연산자를 오버로드(overload)하기 위해 구현할 수 있는 11가지 훅을 추가합니다. 이들은 다음과 같습니다:

*   `__iadd__` (in-place addition)
*   `__isub__` (in-place subtraction)
*   `__imul__` (in-place multiplication)
*   `__idiv__` (in-place division)
*   `__imod__` (in-place modulo)
*   `__ipow__` (in-place power)
*   `__ilshift__` (in-place left shift)
*   `__irshift__` (in-place right shift)
*   `__iand__` (in-place bitwise AND)
*   `__ixor__` (in-place bitwise XOR)
*   `__ior__` (in-place bitwise OR)

`__iadd__`에서 'i'는 'in-place'를 의미합니다.

C 확장 타입의 경우, `PyNumberMethods`에 `nb_inplace_*` 멤버가, `PySequenceMethods`에는 `sq_inplace_concat` 및 `sq_inplace_repeat` 멤버가 추가됩니다. 바이너리 호환성(binary compatibility)을 유지하기 위해 `tp_flags` `TypeObject` 멤버는 이 슬롯에 할당된 공간이 있는지 확인하는 데 사용됩니다.

### 구현 (Implementation)

증강 할당의 현재 구현은 앞서 언급된 메서드와 슬롯 외에 13개의 새로운 바이트코드(bytecodes)와 13개의 새로운 API 함수를 추가합니다.

새로운 API 함수는 기존 이항 연산 API 함수의 in-place 버전입니다:
*   `PyNumber_InPlaceAdd`
*   `PyNumber_InPlaceSubtract`
*   `PyNumber_InPlaceMultiply`
*   `PyNumber_InPlaceDivide`
*   `PyNumber_InPlaceRemainder`
*   `PyNumber_InPlacePower`
*   `PyNumber_InPlaceLshift`
*   `PyNumber_InPlaceRshift`
*   `PyNumber_InPlaceAnd`
*   `PyNumber_InPlaceXor`
*   `PyNumber_InPlaceOr`
*   `PySequence_InPlaceConcat`
*   `PySequence_InPlaceRepeat`

이 함수들은 Python 클래스 훅(객체가 Python 클래스 인스턴스인 경우) 또는 C 타입의 숫자(number) 또는 시퀀스(sequence) 메서드를 호출합니다.

새로운 바이트코드는 다음과 같습니다:
*   `INPLACE_ADD`, `INPLACE_SUBTRACT`, `INPLACE_MULTIPLY`, `INPLACE_DIVIDE`, `INPLACE_REMAINDER`, `INPLACE_POWER`, `INPLACE_LEFTSHIFT`, `INPLACE_RIGHTSHIFT`, `INPLACE_AND`, `INPLACE_XOR`, `INPLACE_OR` (이들은 `BINARY_*` 바이트코드의 미러링 버전이며, InPlace API 함수 호출로 구현됩니다.)
*   `ROT_FOUR` (상위 4개 스택 항목을 회전)
*   `DUP_TOPX` (상위 N개 항목을 복제)

`DUP_TOPX`는 편의를 위한 바이트코드이며 필수는 아닙니다.

### 공개 문제 (Open Issues)

*   `PyNumber_InPlace` API는 일반 `PyNumber` API의 부분 집합으로, 증강 할당 구문을 지원하는 데 필요한 함수만 포함합니다. 다른 in-place API 함수가 필요하면 나중에 추가될 수 있습니다.
*   `DUP_TOPX` 바이트코드는 편의성 바이트코드로, 실제로 필수는 아닙니다. 이 바이트코드가 가치가 있는지 고려해야 합니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.