---
title: "[Final] PEP 688 - Making the buffer protocol accessible in Python"
excerpt: "Python Enhancement Proposal 688: 'Making the buffer protocol accessible in Python'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/688/
toc: true
toc_sticky: true
date: 2025-09-27 10:13:02+0900
last_modified_at: 2025-09-27 10:13:02+0900
published: true
---
> **원문 링크:** [PEP 688 - Making the buffer protocol accessible in Python](https://peps.python.org/pep-0688/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 23-Apr-2022



## PEP 688 – Python에서 버퍼 프로토콜 접근성 확보

### 초록 (Abstract)
이 PEP는 현재 C 코드에서만 접근 가능한 버퍼 프로토콜(buffer protocol)에 대해 Python 레벨 API를 제안합니다. 이를 통해 타입 체커(type checker)가 객체가 프로토콜을 구현하는지 여부를 평가할 수 있게 됩니다.

### 동기 (Motivation)
CPython C API는 객체의 기본 메모리에 접근하기 위한 다용도 메커니즘인 버퍼 프로토콜을 제공합니다. 이 프로토콜은 PEP 3118에서 도입되었으며, 이진 데이터를 받아들이는 함수는 일반적으로 버퍼 프로토콜을 구현하는 모든 객체를 처리하도록 작성됩니다. 현재 Python 코드에서는 객체가 버퍼 프로토콜을 지원하는지 여부를 검사할 방법이 없습니다. 또한, 정적 타입 시스템(static type system)은 이 프로토콜을 나타내는 타입 어노테이션(type annotation)을 제공하지 않아, 제네릭 버퍼를 허용하는 코드의 타입 어노테이션을 작성할 때 문제가 발생했습니다.

유사하게, Python으로 작성된 클래스가 버퍼 프로토콜을 지원하는 것은 불가능했습니다. Python에서 버퍼 클래스를 만들 수 있다면 사용자는 C 버퍼 객체를 쉽게 래핑(wrap)하거나, 버퍼 프로토콜을 사용하는 API의 동작을 테스트할 수 있을 것입니다.

### 합리적 근거 (Rationale)

#### 현재의 대안 (Current options)
타입 시스템에서 버퍼 타입을 어노테이션하기 위한 두 가지 알려진 방법이 있었지만, 둘 다 적절하지 않았습니다.
1.  **typeshed의 타입 별칭(type alias):** `bytes`, `bytearray`, `memoryview`, `array.array`와 같은 표준 라이브러리의 잘 알려진 버퍼 타입을 나열하는 방식입니다. 이 방법은 표준 라이브러리에는 작동하지만, 서드 파티 버퍼 타입에는 적용되지 않습니다.
2.  **`typing.ByteString` 문서:** `bytes`를 `bytes`, `bytearray`, `memoryview` 타입의 시퀀스를 나타내는 약어로 사용할 수 있다고 명시되어 있습니다. 그러나 이 사용법은 어떤 타이핑 PEP에서도 명시되지 않았고, 모든 가능한 버퍼 타입을 포함하지 않으며, 타입 어노테이션에서 `bytes` 타입을 모호하게 만듭니다. 예를 들어, `bytes` 객체에는 유효하지만 `memoryview` 객체에는 유효하지 않은 많은 연산이 있으며, 함수가 `bytes`는 허용하지만 `memoryview`는 허용하지 않는 경우가 있을 수 있습니다.

#### 버퍼의 종류 (Kinds of buffers)
C 버퍼 프로토콜은 스트라이드(stride), 연속성(contiguity), 쓰기 지원 등 여러 옵션을 지원합니다. 이 중 일부는 타입 시스템에서 유용할 수 있지만, C 버퍼 프로토콜에서는 대부분의 옵션을 타입 객체에서 직접 쿼리할 수 없습니다. 특정 플래그를 지원하는지 여부를 파악하는 유일한 방법은 실제로 버퍼를 요청하는 것이며, `memoryview`와 같은 일부 타입의 경우 지원되는 플래그가 인스턴스에 따라 달라집니다. 결과적으로 타입 시스템에서 이러한 플래그 지원을 표현하기는 어렵습니다.

### 명세 (Specification)

#### Python 레벨 버퍼 프로토콜 (Python-level buffer protocol)
PEP 688은 `__buffer__`와 `__release_buffer__`라는 두 가지 Python 레벨 특수 메서드를 추가할 것을 제안합니다. 이 메서드를 구현하는 Python 클래스는 C 코드에서 버퍼로 사용될 수 있으며, 반대로 C로 구현된 버퍼 프로토콜을 지원하는 클래스는 Python 코드에서 접근 가능한 합성 메서드(synthesized methods)를 얻게 됩니다.

-   **`__buffer__(self, flags: int, /) -> memoryview`**: 이 메서드는 `memoryview()` 생성자와 같이 Python 객체에서 버퍼를 생성하기 위해 호출됩니다. C의 `bf_getbuffer` 슬롯에 해당하며, `memoryview` 객체를 반환해야 합니다.
-   **`__release_buffer__(self, buffer: memoryview, /) -> None`**: 이 메서드는 `__buffer__`에 의해 반환된 버퍼가 더 이상 필요 없을 때 호출되어야 합니다. C의 `bf_releasebuffer` 슬롯에 해당하며, 버퍼 프로토콜의 선택적 부분입니다. `__buffer__`를 직접 호출하는 Python 코드는 버퍼 사용이 끝나면 동일한 객체에 대해 `__release_buffer__`를 호출해야 합니다.

#### `inspect.BufferFlags`
`__buffer__` 구현을 돕기 위해 `enum.IntFlag`의 서브클래스인 `inspect.BufferFlags`가 추가됩니다. 이 열거형(enum)은 C 버퍼 프로토콜에 정의된 모든 플래그를 포함합니다.

#### `collections.abc.Buffer`
새로운 추상 베이스 클래스(Abstract Base Class, ABC)인 `collections.abc.Buffer`가 추가되며, 이는 `__buffer__` 메서드를 요구합니다. 이 클래스는 주로 타입 어노테이션에 사용됩니다.

```python
from collections.abc import Buffer

def need_buffer(b: Buffer) -> memoryview:
    return memoryview(b)

need_buffer(b"xy") # ok
need_buffer("xy") # 정적 타입 체커에 의해 거부됨 (rejected by static type checkers)
```
또한, `isinstance` 및 `issubclass` 검사에도 사용할 수 있습니다.

```python
from collections.abc import Buffer
isinstance(b"xy", Buffer) # True
issubclass(bytes, Buffer) # True
issubclass(memoryview, Buffer) # True
isinstance("xy", Buffer) # False
issubclass(str, Buffer) # False
```

#### `bytes`에 대한 특별한 의미 제거 (No special meaning for bytes)
`bytes`가 다른 `ByteString` 타입의 약어로 사용될 수 있다는 특별한 경우는 타이핑 문서에서 제거될 것입니다. `collections.abc.Buffer`가 대안으로 제공됨에 따라 `bytes`를 약어로 허용할 정당한 이유가 없어집니다.

### 하위 호환성 (Backwards Compatibility)

#### `__buffer__` 및 `__release_buffer__` 속성
이 PEP의 런타임 변경 사항은 새로운 기능만 추가하므로 하위 호환성 문제는 거의 없습니다. 그러나 다른 목적으로 `__buffer__` 또는 `__release_buffer__` 속성을 사용하는 코드는 영향을 받을 수 있습니다. 조사 결과, 이 PEP의 `__buffer__` 메서드 사용은 PyPy와의 상호 운용성을 개선하고 주요 Python 패키지의 현재 버전에 영향을 미치지 않을 것입니다. `__release_buffer__`라는 이름은 공개적으로 접근 가능한 코드에서 사용되지 않습니다.

#### `bytes` 특별 사례 제거
타입 체커에서 `bytes`의 특별한 동작을 제거하라는 권고는 사용자에게 하위 호환성 영향을 미칩니다. `mypy`를 사용한 실험에 따르면, `bytes` 승격(promotion)이 제거될 경우 타입 검사에 사용하는 여러 주요 오픈 소스 프로젝트에서 새로운 오류가 발생할 것입니다. 이러한 오류 중 상당수는 `typeshed`의 스텁(stub) 파일을 개선하여 수정할 수 있습니다. 전반적으로 이 변경은 타입 안정성을 향상시키고 타입 시스템을 더 일관성 있게 만듭니다.

### 교육 방법 (How to Teach This)
`typing.python.org` 및 `mypy` 치트 시트(cheat sheet)와 같은 문서의 적절한 위치에 `collections.abc.Buffer`를 가리키는 설명을 추가할 것입니다. 타입 체커는 오류 메시지에 추가적인 지침을 제공할 수 있습니다. 예를 들어, 버퍼 객체가 `bytes`만 허용하도록 어노테이션된 함수에 전달될 때, 오류 메시지는 `collections.abc.Buffer` 사용을 제안하는 설명을 포함할 수 있습니다.

### 채택되지 않은 아이디어 (Rejected Ideas)

#### `types.Buffer`
이전 버전의 PEP에서는 `__instancecheck__`가 C로 구현된 새로운 `types.Buffer` 타입을 추가하여 `isinstance()` 검사를 통해 타입이 버퍼 프로토콜을 구현하는지 확인할 수 있도록 제안했습니다. 그러나 이 접근 방식은 `types.Buffer`가 명목(nominal) 타입이지 구조(structural) 타입이 아니므로 나머지 타입 시스템과 잘 통합되지 않습니다. 예를 들어, "버퍼 프로토콜과 `__len__`을 모두 지원하는 객체"를 표현할 방법이 없었습니다. 현재 제안은 `__buffer__`가 다른 특수 메서드와 동일하게 작동하므로, `Protocol`을 사용하여 다른 메서드와 결합할 수 있습니다.

#### `bytearray`를 `bytes`와 호환되게 유지 (Keep bytearray compatible with bytes)
`memoryview`가 항상 `bytes`와 호환되도록 하는 특별한 경우는 제거하고 `bytearray`의 경우는 유지하자는 제안이 있었습니다. 그러나 여러 표준 라이브러리 함수(예: `re.compile`, `socket.getaddrinfo`)는 `bytes`는 허용하지만 `bytearray`는 허용하지 않습니다. 대부분의 코드베이스에서 `bytearray`는 흔한 타입이 아니며, PEP 688은 사용자가 허용되는 타입을 명시적으로 지정하거나(`PEP 544`의 `Protocol` 사용) 선호합니다.

#### 가변 버퍼와 불변 버퍼 구분 (Distinguish between mutable and immutable buffers)
버퍼 타입 내에서 가장 자주 사용되는 구분은 버퍼의 가변성(mutability) 여부입니다. 일부 함수는 가변 버퍼만 허용하고, 다른 함수는 모든 버퍼를 허용합니다. 이전 버전의 PEP는 `bf_releasebuffer` 슬롯의 존재 여부를 사용하여 버퍼 타입이 가변인지 여부를 결정할 것을 제안했지만, 이 규칙은 대부분의 표준 라이브러리 버퍼 타입에는 적용되지만 절대적이지는 않습니다. (예: NumPy 배열은 가변이지만 이 슬롯이 없음) 현재 버퍼 프로토콜은 버퍼 타입이 가변 또는 불변 버퍼를 나타내는지 여부를 안정적으로 판단할 방법을 제공하지 않으므로, 이 PEP는 이 구분에 대한 타입 시스템 지원을 추가하지 않습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.