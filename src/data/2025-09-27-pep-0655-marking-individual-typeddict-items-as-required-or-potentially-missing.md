---
title: "[Final] PEP 655 - Marking individual TypedDict items as required or potentially-missing"
excerpt: "Python Enhancement Proposal 655: 'Marking individual TypedDict items as required or potentially-missing'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/655/
toc: true
toc_sticky: true
date: 2025-09-27 09:53:14+0900
last_modified_at: 2025-09-27 09:53:14+0900
published: true
---
> **원문 링크:** [PEP 655 - Marking individual TypedDict items as required or potentially-missing](https://peps.python.org/pep-0655/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-Jan-2021



# PEP 655 – TypedDict 개별 항목을 필수 또는 선택으로 표시하기

## 개요
PEP 589는 모든 키가 필수인 `TypedDict`와 모든 키가 선택인 `TypedDict`를 선언하는 방법을 정의하지만, 일부 키는 필수이고 다른 키는 선택인 `TypedDict`를 선언하는 메커니즘은 제공하지 않습니다. 이 PEP는 두 가지 새로운 표기법인 `Required[]`와 `NotRequired[]`를 도입합니다.

*   `Required[]`: `TypedDict`의 개별 항목을 필수로 표시하는 데 사용됩니다.
*   `NotRequired[]`: `TypedDict`의 개별 항목을 선택(잠재적으로 누락될 수 있음)으로 표시하는 데 사용됩니다.

이 PEP는 Python 문법을 변경하지 않습니다. `TypedDict`의 필수 및 선택 키의 올바른 사용은 정적 타입 체커에 의해서만 강제되며, Python 자체에서 런타임에 강제할 필요는 없습니다.

## 동기 (Motivation)
일부 키는 필수이고 다른 키는 선택인 `TypedDict`를 정의해야 하는 경우가 흔합니다. 현재 이러한 `TypedDict`를 정의하는 유일한 방법은 `total` 값이 다른 두 개의 `TypedDict`를 선언하고 상속하는 것입니다.

```python
class _MovieBase(TypedDict): # 암시적으로 total=True
    title: str

class Movie(_MovieBase, total=False):
    year: int
```
이러한 목적을 위해 두 가지 다른 `TypedDict` 타입을 선언해야 하는 것은 번거롭습니다.

이 PEP는 `typing.Required` 및 `typing.NotRequired`라는 두 가지 새로운 타입 한정자(type qualifier)를 도입하여 필수 및 선택 키가 혼합된 단일 `TypedDict`를 정의할 수 있도록 합니다.

```python
class Movie(TypedDict):
    title: str
    year: NotRequired[int]
```

또한, 이 PEP는 대안적인 함수형 문법(alternative functional syntax)으로 `TypedDict`를 정의할 때도 필수 및 선택 키를 혼합하여 사용할 수 있도록 합니다. 현재 이 함수형 문법은 상속을 지원하지 않아 혼합 키 사용이 불가능했습니다.

```python
Actor = TypedDict('Actor', {
    'name': str,
    'in': NotRequired[List[str]], # "in"은 키워드이므로 함수형 문법이 필요
})
```

## 이론적 근거 (Rationale)
`Required[]`와 `NotRequired[]`를 도입하게 된 주요 이유는 다음과 같습니다.

*   **`Optional[]`과의 충돌 방지:** 다른 언어(예: TypeScript의 `?` 연산자)에서는 선택적 키를 표시하는 표기법이 일반적이지만, Python에서 선택을 의미하는 가장 적절한 단어인 `Optional[]`은 이미 특정 타입 또는 `None`이 될 수 있는 값을 나타내는 데 사용되고 있습니다.
    ```python
    class Movie(TypedDict):
        year: Optional[int] # year는 int 또는 None을 의미하며, 키가 없을 수도 있다는 의미가 아님
    ```
    `Optional[]`과 혼동을 피하기 위해 `Missing[]`와 같은 다른 "optional" 동의어를 사용하는 것은 바람직하지 않다고 판단했습니다.
*   **긍정적 형태의 표기법 선호:** 따라서 필수 키에 대한 긍정적 형태의 표기법인 `Required[]`에 초점을 맞추기로 결정했습니다.
*   **`NotRequired[]`의 필요성:** 그러나 일반적으로 (total=True) `TypedDict`를 확장하여 소수의 선택적 키만 추가하려는 경우가 많으므로, 필수가 아닌 선택적 키를 표시하는 방법도 필요하여 `NotRequired[]` 형태도 허용되었습니다.

## 명세 (Specification)

### `typing.Required` 및 `typing.NotRequired` 사용
`typing.Required` 타입 한정자는 `TypedDict` 정의에서 변수가 필수 키임을 나타내는 데 사용됩니다.

```python
class Movie(TypedDict, total=False):
    title: Required[str] # 이 키는 필수임
    year: int            # total=False이므로 이 키는 선택임
```

`typing.NotRequired` 타입 한정자는 `TypedDict` 정의에서 변수가 선택적(잠재적으로 누락될 수 있는) 키임을 나타내는 데 사용됩니다.

```python
class Movie(TypedDict): # 암시적으로 total=True
    title: str           # 이 키는 필수임
    year: NotRequired[int] # 이 키는 선택임
```

*   `Required[]` 또는 `NotRequired[]`는 `TypedDict` 항목이 아닌 다른 위치에서 사용되면 오류입니다.
*   명시성을 위해 `Required[]` 또는 `NotRequired[]`를 중복하여 사용해도 유효합니다.
*   `Required[]`와 `NotRequired[]`를 동시에 사용하는 것은 오류입니다.

대안적인 함수형 `TypedDict` 문법도 `Required[]` 및 `NotRequired[]`를 지원합니다.

```python
Movie = TypedDict('Movie', {'name': str, 'year': NotRequired[int]})
```

### `total=False`와의 상호작용
`total=False`로 선언된 모든 PEP 589 스타일의 `TypedDict`는 암시적으로 `total=True`로 정의된 `TypedDict`와 동일하며, 모든 키가 `NotRequired[]`로 표시된 것과 같습니다.

```python
class _MovieBase(TypedDict): # 암시적으로 total=True
    title: str

class Movie(_MovieBase, total=False):
    year: int
```
위 코드는 다음과 동일합니다.
```python
class _MovieBase(TypedDict):
    title: str
class Movie(_MovieBase):
    year: NotRequired[int]
```

### `Annotated[]`와의 상호작용
`Required[]` 및 `NotRequired[]`는 `Annotated[]`와 어떤 중첩 순서로든 함께 사용할 수 있습니다.

```python
class Movie(TypedDict):
    title: str
    year: NotRequired[Annotated[int, ValueRange(-9999, 9999)]] # 유효함

class Movie(TypedDict):
    title: str
    year: Annotated[NotRequired[int], ValueRange(-9999, 9999)] # 유효함
```

### 런타임 동작 (Runtime behavior)

*   **`get_type_hints()`와의 상호작용:** `typing.get_type_hints()`는 기본적으로 `Required[]` 또는 `NotRequired[]` 타입 한정자를 제거합니다. 그러나 `typing.get_type_hints(..., include_extras=True)`는 이 한정자를 유지합니다.
*   **`get_origin()` 및 `get_args()`와의 상호작용:** `typing.get_origin()` 및 `typing.get_args()`는 `Required[]` 및 `NotRequired[]`를 인식하도록 업데이트됩니다.
*   **`__required_keys__` 및 `__optional_keys__`와의 상호작용:** `Required[]`로 표시된 항목은 해당 `TypedDict`의 `__required_keys__`에 항상 나타나고, `NotRequired[]`로 표시된 항목은 `__optional_keys__`에 항상 나타납니다.

## 하위 호환성 (Backwards Compatibility)
이 PEP는 하위 호환성을 깨는 변경 사항을 포함하지 않습니다.

## 학습 방법 (How to Teach This)

*   **대부분의 키가 필수이고 일부 키가 선택인 경우:** 일반적인 `TypedDict`를 `total` 키워드 없이 정의하고, 선택적인 몇몇 키만 `NotRequired[]`로 표시합니다.
*   **대부분의 키가 선택이고 일부 키가 필수인 경우:** `total=False` `TypedDict`를 정의하고, 필수적인 몇몇 키만 `Required[]`로 표시합니다.
*   **값으로 `None`을 허용하는 경우:** `Required[]` 또는 `NotRequired[]`와 `Optional[]`을 같은 `TypedDict` 정의 내에서 함께 사용하는 것을 피하기 위해 `TYPE | None` 표기법을 권장합니다.
    ```python
    # 권장 (Python 3.7-3.9용)
    from __future__ import annotations
    class Dog(TypedDict):
        name: str
        owner: NotRequired[str | None]
    ```

## Python < 3.11에서의 사용
코드에서 Python 3.11 이전 버전을 지원하면서 `Required[]` 또는 `NotRequired[]`를 사용하려면 `typing_extensions.TypedDict`를 사용해야 합니다.

```python
# Python <3.11 및 3.11+ 모두에서 사용 가능
from __future__ import annotations # Python 3.7-3.9용
from typing_extensions import NotRequired, TypedDict # Python <3.11에서 (Not)Required 사용용
class Dog(TypedDict):
    name: str
    owner: NotRequired[str | None]
```

## 거부된 아이디어 (Rejected Ideas)
이 PEP에서 고려되었지만 거부된 아이디어들은 다음과 같습니다.

*   **`TypedDict` 키 주변에 특별한 문법 사용:** `opt1?: str`와 같은 문법은 Python 문법 변경이 필요하며, `Optional[opt1]: str`와 같은 표기법은 `Optional[]`의 의미가 위치에 따라 달라져 혼란을 야기할 수 있어 거부되었습니다.
*   **연산자를 사용하여 필수 또는 선택 키 표시:** `+int`, `-str`, `~str`와 같이 단항 연산자를 사용하는 방법이 고려되었지만, 장기 형태(`Required[]`, `NotRequired[]`)를 먼저 도입하고 추후에 단기 형태를 재고하기로 결정되었습니다. 또한, `+`, `-`, `~`는 이미 Python 타입 시스템에서 공변(covariant), 반공변(contravariant), 불변(invariant)을 의미하는 데 사용되고 있어 혼란을 줄 수 있습니다.
*   **값의 부재를 표시하는 특별한 상수 도입 (`Missing`):** `str | Missing`와 같이 `Missing`이라는 새로운 타입 레벨 상수를 도입하는 아이디어는 다음과 같은 이유로 거부되었습니다.
    *   **유니온(union)이 값에 적용되는 방식과의 불일치:** `Union[..., Missing]`는 유니온이 일반적으로 나타내는 "값이 존재함"이라는 의미와 맞지 않습니다.
    *   **유니온이 세분화되는 방식과의 불일치:** `isinstance` 체크를 통해 유니온 타입을 분해하는 일반적인 방식과 `hasattr` 또는 `locals()` 체크를 통해 `Missing`을 처리하는 방식이 일치하지 않아 일관성이 없습니다.
    *   **구현의 어려움:** Pyright 타입 체커 팀은 `Union[..., Missing]` 스타일 표기법 구현이 어렵다고 언급했습니다.
    *   **두 번째 `null` 유사 값 도입:** `Missing` 상수를 도입하는 것은 `None` 외에 두 번째 `null`과 같은 런타임 값을 만드는 것이며, 이는 JavaScript의 `null`과 `undefined`의 혼란과 유사하게 사용자에게 혼란을 줄 수 있습니다.
*   **`Optional`을 `Nullable`로 대체하거나 의미 변경:** `Optional[]`은 너무 널리 사용되어 사용 중단하기 어렵고, 특정 컨텍스트에서 `Optional`의 의미를 변경하는 것은 사용자에게 더 많은 혼란을 줄 수 있습니다.
*   **"잠재적으로 누락될 수 있는 항목"에 대한 다양한 동의어:** `Omittable`, `OptionalItem`, `MayExist`, `MissingOk` 등 다양한 동의어가 고려되었으나, `Optional[]`과의 혼동, 길거나 모호하다는 등의 이유로 거부되었습니다.

---
**주요 참고사항:** 이 PEP는 역사적인 문서입니다. 최신 사양 및 문서는 `Required` 및 `NotRequired`, `typing.Required` 및 `typing.NotRequired`를 참조하십시오.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.