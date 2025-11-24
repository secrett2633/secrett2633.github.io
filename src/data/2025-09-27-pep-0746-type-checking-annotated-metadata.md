---
title: "[Draft] PEP 746 - Type checking Annotated metadata"
excerpt: "Python Enhancement Proposal 746: 'Type checking Annotated metadata'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/746/
toc: true
toc_sticky: true
date: 2025-09-27 13:34:43+0900
last_modified_at: 2025-09-27 13:34:43+0900
published: true
---
> **원문 링크:** [PEP 746 - Type checking Annotated metadata](https://peps.python.org/pep-0746/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 20-May-2024

## PEP 746 – Annotated 메타데이터의 타입 체킹

### 요약

이 PEP는 `typing.Annotated` 타입을 사용하는 메타데이터에 대한 타입 체킹 메커니즘을 제안합니다. 새로운 `__supports_annotated_base__` 프로토콜을 구현하는 메타데이터 객체는 주어진 타입에 대해 메타데이터가 유효한지 정적 타입 체커에 의해 검사됩니다.

### 개요

*   **작성자:** Adrian Garcia Badaracco
*   **스폰서:** Jelle Zijlstra
*   **상태:** Draft (초안)
*   **타입:** Standards Track
*   **생성일:** 2024년 5월 20일
*   **Python 버전:** 3.15
*   **주제:** Typing

### 도입 배경 (Motivation)

PEP 593은 런타임 메타데이터를 타입에 첨부하는 방법으로 `Annotated`를 도입했습니다. 일반적으로 이 메타데이터는 정적 타입 체커를 위한 것이 아니지만, 그럼에도 불구하고 주어진 타입에 대해 메타데이터가 합리적인지 확인할 수 있으면 유용합니다.

예를 들어, PEP 593의 첫 번째 예시에서는 `Annotated`를 사용하여 필드에 직렬화 정보(`struct2.ctype("<10s")`)를 첨부합니다.
```python
class Student(struct2.Packed):
    name: Annotated[str, struct2.ctype("<10s")]
```
이 `struct2.ctype("<10s")` 메타데이터는 직렬화 라이브러리에서 필드를 직렬화하는 데 사용됩니다. 이러한 라이브러리는 특정 타입만 직렬화할 수 있으므로, `Annotated[list[str], struct2.ctype("<10s")]`와 같이 작성하는 것은 의미가 없습니다. 그러나 현재 타입 시스템은 이를 강제할 방법이 없으며, 메타데이터는 타입 체커에 의해 완전히 무시됩니다.

이러한 유스 케이스는 `pydantic` 및 `msgspec`과 같은 라이브러리에서 `Annotated`를 사용하여 필드에 유효성 검사 및 변환 정보를 첨부하거나, `fastapi`에서 파라미터를 헤더, 쿼리 문자열 또는 의존성 주입에서 추출된 것으로 표시하는 데 사용됩니다.

### 명세 (Specification)

이 PEP는 `Annotated` 메타데이터와 주어진 타입 간의 일관성을 검증하기 위해 정적 및 런타임 타입 체커가 사용할 수 있는 프로토콜을 도입합니다. 이 프로토콜을 구현하는 객체는 메타데이터가 주어진 타입에 유효한지 여부를 지정하는 `__supports_annotated_base__`라는 속성을 가집니다.

```python
class Int64:
    __supports_annotated_base__: int
```
이 속성은 `dataclasses`와의 상호작용을 피하기 위해 `ClassVar`로 표시될 수도 있습니다.
```python
from dataclasses import dataclass
from typing import ClassVar

@dataclass
class Gt:
    value: int
    __supports_annotated_base__: ClassVar[int]
```
정적 타입 체커가 `Annotated[T, M1, M2, ...]` 형식의 타입 표현식을 만날 때, `M1, M2, ...`의 각 메타데이터 요소에 대해 다음 중 하나가 참인지 강제해야 합니다.
1.  메타데이터 요소가 `__supports_annotated_base__` 속성이 없는 객체로 평가되는 경우.
2.  메타데이터 요소가 `__supports_annotated_base__` 속성을 가진 객체 `M`으로 평가되고, `T`가 `M.__supports_annotated_base__`의 타입에 할당 가능한 경우.

제네릭 `Gt` 메타데이터를 지원하기 위해 다음과 같이 작성할 수 있습니다.
```python
from typing import Protocol, ClassVar, Annotated

class SupportsGt[T](Protocol):
    def __gt__(self, __other: T) -> bool: ...

class Gt[T]:
    __supports_annotated_base__: ClassVar[SupportsGt[T]]
    def __init__(self, value: T) -> None:
        self.value = value

x1: Annotated[int, Gt(0)] = 1 # OK
x2: Annotated[str, Gt(0)] = "hello" # 타입 체커 오류: str은 SupportsGt[int]에 할당할 수 없습니다.
x3: Annotated[int, Gt(1)] = 0 # 정적 타입 체커에서는 OK; 런타임 타입 체커가 플래그할 수 있습니다.
```

### 하위 호환성 (Backwards Compatibility)

이 프로토콜을 구현하지 않는 메타데이터는 모든 타입에 대해 유효한 것으로 간주되므로, 기존 코드에 대한 호환성을 깨는 변경사항은 도입되지 않습니다. 새로운 검사는 이 PEP에 의해 지정된 프로토콜을 명시적으로 구현하는 메타데이터 객체에만 적용됩니다.

### 보안 영향 (Security Implications)

없습니다.

### 교육 방법 (How to Teach This)

이 프로토콜은 주로 `Annotated` 메타데이터를 제공하는 라이브러리를 위한 것입니다. 해당 라이브러리의 최종 사용자는 이 프로토콜을 직접 구현할 필요가 없을 것입니다. 이 프로토콜은 `typing.Annotated` 문서와 typing 명세에 언급되어야 합니다.

### 채택되지 않은 아이디어 (Rejected Ideas)

*   **제네릭 클래스 대신 타입 변수 도입:** `Annotated`의 내부 타입 `T`를 나타내기 위해 `AnnotatedT = TypeVar("AnnotatedT")`와 같은 특별한 타입 변수를 사용하는 방안이 고려되었으나, 이는 권장되지 않는 오래된 타입 변수 문법을 요구하고 타입 시스템의 다른 부분과 잘 맞지 않는 비정상적인 방식으로 타입 변수를 사용하게 됩니다.
*   **모든 메타데이터 객체가 서브클래싱해야 하는 새 타입 `typing.py`에 도입:** 이전 버전의 이 PEP는 메타데이터 객체가 서브클래싱할 새로운 제네릭 베이스 클래스 `TypedMetadata[U]`를 추가할 것을 제안했습니다. 그러나 이 메커니즘은 언어의 나머지 부분과 잘 통합되지 않고, 파이썬은 일반적으로 마커 베이스 클래스를 사용하지 않습니다. 또한, 오버로드를 허용하지 않고 메타데이터 객체가 새로운 베이스 클래스를 추가해야 하여 런타임 구현을 더 복잡하게 만들 수 있어 현재 제안보다 유연성이 떨어집니다.
*   **`__supports_annotated_base__`에 속성 대신 메서드 사용:** 프로토콜에 속성 대신 메서드를 사용하여 런타임에 메타데이터의 유효성을 확인하고 오버로드 또는 부울 리터럴 반환을 지원하는 방안이 고려되었습니다. 그러나 메서드를 사용하면 구현에 상용구(boilerplate)가 추가되고, 런타임 유스 케이스 또는 오버로드 및 부울 리터럴 반환을 포함하는 더 복잡한 시나리오의 가치가 명확하지 않았습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.