---
title: "[Final] PEP 560 - Core support for typing module and generic types"
excerpt: "Python Enhancement Proposal 560: 'Core support for typing module and generic types'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/560/
toc: true
toc_sticky: true
date: 2025-09-26 23:45:50+0900
last_modified_at: 2025-09-26 23:45:50+0900
published: true
---
> **원문 링크:** [PEP 560 - Core support for typing module and generic types](https://peps.python.org/pep-0560/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 03-Sep-2017

## PEP 560 – `typing` 모듈 및 제네릭 타입에 대한 핵심 지원

### 개요

PEP 560은 `typing` 모듈과 제네릭 타입(`Generic` types)을 더 효율적으로 지원하기 위해 CPython 인터프리터 코어에 두 가지 특별 메서드인 `__class_getitem__`과 `__mro_entries__`를 추가하는 것을 제안합니다. 초기 PEP 484는 CPython 코어 변경을 피하도록 설계되었지만, 타입 힌트(`type hints`)와 `typing` 모듈이 널리 사용되면서 이러한 제한이 해제될 필요성이 생겼습니다. 이 제안은 `typing` 모듈의 성능 문제, 메타클래스(metaclass) 충돌, 그리고 현재 존재하는 다양한 임시방편(hacks)과 버그를 해결하는 것을 목표로 합니다.

### 도입 배경 (Rationale)

CPython 코어를 수정하지 않으려는 초기 제한은 `typing` 모듈이 광범위하게 사용되면서 여러 의문스러운 설계 결정으로 이어졌습니다. 주요 문제점은 다음과 같습니다.

*   **성능 (Performance):** `typing` 모듈은 표준 라이브러리에서 가장 무겁고 느린 모듈 중 하나입니다. 주로 subscripted generic types (예: `List[int]`)가 클래스 객체로 처리되기 때문입니다. 제안된 특별 메서드를 통해 제네릭 클래스 생성 속도 향상, MRO(Method Resolution Order) 길이 단축, 제네릭 클래스 인스턴스화 속도 개선 등 성능을 크게 개선할 수 있습니다.
*   **메타클래스 충돌 (Metaclass conflicts):** 모든 제네릭 타입이 `GenericMeta`의 인스턴스이기 때문에, 사용자 정의 메타클래스를 사용하는 경우 해당 클래스를 제네릭으로 만들기 어렵습니다. 이 제안은 `GenericMeta` 메타클래스가 더 이상 필요 없게 함으로써 이 문제를 해결합니다.
*   **제거될 임시방편 및 버그 (Hacks and bugs that will be removed by this proposal):** 현재 `typing` 모듈에는 `_generic_new` hack, `_next_in_mro` speed hack, `sys._getframe` hack 등 다수의 임시방편과 버그가 존재합니다. 또한, 제네릭 타입 간의 속성 공유 문제와 `__slots__`를 사용하는 제네릭 문제도 있습니다. 이 제안은 이러한 문제들을 해결하고 `typing` 모듈의 구현 복잡성을 줄여 유지보수를 용이하게 합니다.

### 명세 (Specification)

#### `__class_getitem__`

`__class_getitem__`은 클래스 자체에서 호출되는 `__getitem__`의 정확한 아날로그입니다. 이를 통해 `Iterable[int]`와 같은 경우 `GenericMeta.__getitem__`을 피할 수 있습니다. 이 메서드는 자동으로 클래스 메서드(`classmethod`)처럼 작동하며, `@classmethod` 데코레이터가 필요 없고 일반 속성처럼 상속됩니다. 메타클래스가 `__getitem__`을 정의하는 경우, 해당 메타클래스의 메서드가 우선합니다.

**예시:**
```python
class MyList:
    def __getitem__(self, index):
        return index + 1
    def __class_getitem__(cls, item):
        return f"{cls.__name__}[{item.__name__}]"

class MyOtherList(MyList):
    pass

assert MyList()[0] == 1
assert MyList[int] == "MyList[int]"
assert MyOtherList()[0] == 1
assert MyOtherList[int] == "MyOtherList[int]"
```


#### `__mro_entries__`

클래스 정의의 `bases` 튜플에 클래스 객체가 아닌 객체가 나타날 경우, 해당 객체에서 `__mro_entries__` 메서드를 찾습니다. 이 메서드가 발견되면 원래 `bases` 튜플을 인자로 호출되며, 그 결과는 해당 객체를 대체하여 기본 클래스에 삽입될 튜플이어야 합니다. 이 과정은 클래스 생성 프로세스에서 가장 먼저 발생하며, 업데이트된 `bases`를 사용하여 MRO 계산 등 모든 다른 단계가 정상적으로 진행됩니다. 원래 `bases`는 클래스 네임스페이스에 `__orig_bases__`로 저장됩니다.

**예시:**
```python
class GenericAlias:
    def __init__(self, origin, item):
        self.origin = origin
        self.item = item
    def __mro_entries__(self, bases):
        return (self.origin,)

class NewList:
    def __class_getitem__(cls, item):
        return GenericAlias(cls, item)

class Tokens(NewList[int]):
    ...

assert Tokens.__bases__ == (NewList,)
assert Tokens.__orig_bases__ == (NewList[int],)
assert Tokens.__mro__ == (Tokens, NewList, object)
```


`__mro_entries__`를 통한 해결은 클래스 정의 구문(statement)의 `bases` 내에서만 발생합니다. `isinstance` 및 `issubclass`와 같은 내장 함수를 포함하여 클래스 객체가 예상되는 다른 모든 상황에서는 이러한 해결이 발생하지 않습니다.

**참고:** 이 두 메서드(`__class_getitem__` 및 `__mro_entries__`)의 이름은 `typing` 모듈 및 제네릭 타입 메커니즘을 위해 예약되어 있으며, 다른 용도로 사용하는 것은 권장되지 않습니다.

#### 동적 클래스 생성 및 `types.resolve_bases`

`type.__new__`는 MRO 엔트리 해결을 수행하지 않습니다. 따라서 `type('Tokens', (List[int],), {})`와 같은 직접 호출은 실패합니다. 이는 성능상의 이유와 암묵적인 변환(`implicit transformations`) 수를 최소화하기 위함입니다. 대신, 동적 클래스 생성 시 명시적인 `__mro_entries__` 해결을 허용하기 위해 `types` 모듈에 헬퍼 함수 `resolve_bases`가 추가될 것입니다. `types.new_class`는 이러한 새로운 클래스 생성 단계를 반영하도록 업데이트될 예정입니다.

#### C 확장에서의 `__class_getitem__` 사용

C 확장에서 `__class_getitem__`을 정의하려면 `METH_O|METH_CLASS` 플래그를 사용해야 합니다. 이는 C 확장 클래스를 제네릭으로 만들 수 있는 방법을 제공합니다.

### 하위 호환성 및 `typing`을 사용하지 않는 사용자에게 미치는 영향

이 제안은 `__class_getitem__` 및 `__mro_entries__` 이름을 현재 사용 중인 코드에 영향을 줄 수 있습니다. 그러나 언어 참조(language reference)는 문서화되지 않은 모든 던더(dunder) 이름을 명시적으로 예약하고 "경고 없이 변경될 수 있음"을 허용합니다.

이 제안은 현재 공개된 제네릭 타입 API와 거의 완전한 하위 호환성을 지원합니다. `typing` 모듈은 여전히 잠정적인(provisional) 상태입니다. 단 두 가지 예외는 다음과 같습니다.
1. 현재 `issubclass(List[int], List)`는 `True`를 반환하지만, 이 제안에서는 `TypeError`를 발생시킵니다.
2. subscript 되지 않은 사용자 정의 제네릭의 `repr()`은 더 이상 조작할 수 없으며 일반(비-제네릭) 클래스의 `repr()`과 일치하게 됩니다.

참조 구현(reference implementation)을 통해 측정된 결과, 일반(비-제네릭) 클래스에는 무시할 수 있는 수준의 성능 영향(마이크로 벤치마크에서 1% 미만)이 있었지만, 제네릭의 성능은 크게 향상되었습니다. 예를 들어:
*   `importlib.reload(typing)`은 최대 7배 빨라집니다.
*   사용자 정의 제네릭 클래스 생성은 최대 4배 빨라집니다 (빈 본문 마이크로 벤치마크 기준).
*   제네릭 클래스 인스턴스화는 최대 5배 빨라집니다 (빈 `__init__` 마이크로 벤치마크 기준).
*   제네릭 타입 및 인스턴스와 관련된 다른 작업(예: 메서드 조회 및 `isinstance()` 검사)은 약 10-20% 향상됩니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.