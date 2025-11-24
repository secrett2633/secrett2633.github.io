---
title: "[Rejected] PEP 712 - Adding a “converter” parameter to dataclasses.field"
excerpt: "Python Enhancement Proposal 712: 'Adding a “converter” parameter to dataclasses.field'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/712/
toc: true
toc_sticky: true
date: 2025-09-27 13:12:37+0900
last_modified_at: 2025-09-27 13:12:37+0900
published: true
---
> **원문 링크:** [PEP 712 - Adding a “converter” parameter to dataclasses.field](https://peps.python.org/pep-0712/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 01-Jan-2023

## PEP 712 – `dataclasses.field`에 "converter" 매개변수 추가 (거부됨)

### 개요
이 문서는 Python Enhancement Proposal (PEP) 712의 번역본입니다. PEP 712는 `dataclasses.field()` 함수에 `converter` 매개변수를 추가하여, dataclass 초기화 시 필드에 할당되는 값을 자동으로 변환하는 기능을 제안했습니다. 그러나 이 제안은 Python Steering Council에 의해 **거부되었습니다**.

### 거부 공지
2024년 Steering Council의 거부 사유는 다음과 같습니다:
*   **강력한 합의 부재:** 표준 라이브러리에 이 기능이 필요하다는 강력한 합의 증거를 찾지 못했습니다. 일부 지지자들은 서드 파티 패키지에 대한 의존도를 줄이기 위해 이 기능이 필요하다고 주장했으나, attrs나 Pydantic과 같은 기존 서드 파티 라이브러리(PEP에서 참조된)가 충분한 대안이라고 판단했습니다.
*   **표준 라이브러리 복잡성 증가:** 이 기능은 표준 라이브러리에 불필요한 "군더더기(cruft)"를 추가하여, dataclasses가 이상적으로 사용되는 "단순한(simple)" 사용 사례에서 더욱 멀어지게 할 수 있다고 보았습니다.
*   **높은 학습 곡선 및 복잡성:** PEP의 "How to Teach This" 섹션을 읽어보면, 잠재적인 이점보다 혼란과 복잡성을 야기하는 상당한 함정(pitfalls)과 주의할 점(gotchas)이 있음을 알 수 있습니다.
*   **타입 체커 지원에 대한 과도한 집중:** 이 PEP는 라이브러리 사용자보다는 타입 체커(type checker)를 돕는 데 더 집중하는 것처럼 보였습니다.

### 요약 (Abstract)
PEP 557은 Python 표준 라이브러리에 `dataclasses`를 추가했습니다. PEP 681은 `dataclass_transform()`을 추가하여 `attrs`, `Pydantic`, 그리고 `SQLAlchemy`, `Django`와 같은 ORM(Object Relational Mapper) 패키지와 같이 흔히 사용되는 여러 `dataclass` 유사 라이브러리를 타입 체커(type checker)가 이해하도록 도왔습니다.

다른 라이브러리들이 표준 라이브러리 구현보다 제공하는 일반적인 기능은 초기화 시 제공된 인수를, 사용자 제공 변환 함수를 사용하여 각 필드에 예상되는 타입으로 변환하는 기능입니다.

따라서 이 PEP는 `dataclasses.field()`에 `converter` 매개변수를 추가(및 `dataclasses.Field`와 `dataclass_transform()`에 필요한 변경사항 포함)하여, 각 필드의 입력 값을 dataclass에 저장될 표현형으로 변환하는 데 사용될 함수를 지정하도록 제안했습니다.

### 제안 배경 (Motivation)
`dataclasses` 또는 서드 파티 `dataclass` 유사 라이브러리가 타입 체크가 가능한 방식으로 인수 변환을 지원하는 기존의 표준 방법이 없습니다. 이러한 제약을 해결하기 위해 라이브러리 개발자/사용자는 다음 중 하나를 선택해야 합니다:
*   **커스텀 Mypy 플러그인 사용:** 이러한 플러그인은 Mypy가 변환 의미론을 이해하는 데 도움이 되지만, 다른 도구에는 적용되지 않습니다.
*   **`dataclass` 생성자 호출자에게 변환 책임 전가:** 이는 특정 `dataclass`를 생성하는 과정을 불필요하게 장황하고 반복적으로 만들 수 있습니다.
*   **"더 넓은(wider)" 매개변수 타입을 선언하고 적절한 속성을 설정할 때 변환하는 커스텀 `__init__` 제공:** 이는 `converter`와 `__init__` 사이에서 타입 어노테이션(typing annotations)을 중복시킬 뿐만 아니라, `dataclasses`가 제공하는 많은 기능에서 사용자를 제외시킵니다.
*   **변환이 필요한 매개변수 타입에 의미 있는 타입 어노테이션이 없는 커스텀 `__init__` 제공:**

이러한 선택지 중 어느 것도 이상적이지 않습니다.

### 이론적 근거 (Rationale)
인수 변환 의미론을 추가하는 것은 대부분의 `dataclass` 유사 라이브러리가 지원할 만큼 유용하고 이롭습니다. 이 기능을 표준 라이브러리에 추가하는 것은 더 많은 사용자가 서드 파티 라이브러리 없이 이러한 이점을 누릴 수 있음을 의미합니다. 또한 서드 파티 라이브러리들은 `dataclass_transform()`에 대한 추가 지원을 통해 자신들의 변환 의미론을 타입 체커에 알릴 수 있으며, 이는 해당 라이브러리 사용자들에게도 이점을 제공합니다.

### 명세 (Specification)

#### 새로운 `converter` 매개변수
이 명세는 `dataclasses.field()` 함수에 `converter`라는 새로운 매개변수를 도입합니다. 이 매개변수가 제공되면, 연관된 속성에 값을 할당할 때 모든 값을 변환하는 데 사용되는 단일 인자 호출 가능 객체(single-argument callable)를 나타냅니다.

*   `frozen` dataclasses의 경우, `converter`는 속성을 설정할 때 `dataclass`가 합성한(synthesized) `__init__` 내부에서만 사용됩니다.
*   `frozen`이 아닌 dataclasses의 경우, `converter`는 모든 속성 할당(예: `obj.attr = value`)에 사용되며, 이는 기본값(default values) 할당을 포함합니다.
*   `converter`는 속성을 읽을 때는 사용되지 않습니다. 속성은 이미 변환되었어야 하기 때문입니다.

이 매개변수를 추가하는 것은 또한 다음 변경 사항을 의미합니다:
*   `dataclasses.Field`에 `converter` 속성이 추가됩니다.
*   `dataclass_transform()`의 지원되는 필드 지정자(field specifier) 매개변수 목록에 `converter`가 추가됩니다.

#### 예시 (Example)

```python
import dataclasses
import pathlib
from typing import Any, Tuple, Optional

def str_or_none(x: Any) -> Optional[str]:
    return str(x) if x is not None else None

@dataclasses.dataclass
class InventoryItem:
    # `converter`를 타입(GenericAlias 포함)으로 사용
    id: int = dataclasses.field(converter=int)
    skus: Tuple[int, ...] = dataclasses.field(converter=tuple[int, ...])

    # `converter`를 호출 가능 객체(callable)로 사용
    vendor: Optional[str] = dataclasses.field(converter=str_or_none)
    names: Tuple[str, ...] = dataclasses.field(
        converter=lambda names: tuple(map(str.lower, names))
    )
    # 람다(lambda)는 지원되지만, 타입이 지정되지 않아 사용을 권장하지 않습니다.

    # 기본값(default value)도 변환됩니다; 따라서 다음은 타입 오류가 아닙니다.
    stock_image_path: pathlib.PurePosixPath = dataclasses.field(
        converter=pathlib.PurePosixPath, default="assets/unknown.png"
    )

    # 기본값 변환은 `default_factory`에도 적용됩니다;
    # 따라서 다음도 타입 오류가 아닙니다.
    shelves: tuple = dataclasses.field(
        converter=tuple, default_factory=list
    )

item1 = InventoryItem(
    "1", [234, 765], None, ["PYTHON PLUSHIE", "FLUFFY SNAKE"]
)

# item1의 repr은 다음과 같습니다 (가독성을 위해 줄바꿈 추가):
# InventoryItem(
# id=1,
# skus=(234, 765),
# vendor=None,
# names=('python plushie', 'fluffy snake'),
# stock_image_path=PurePosixPath('assets/unknown.png'),
# shelves=()
# )

# 속성 할당도 변환에 참여합니다.
item1.skus = [555]
# item1의 skus 속성은 이제 (555,)입니다.
```

#### 타이핑(Typing)에 미치는 영향 (Impact on typing)
`converter`는 단일 위치 인자(single positional argument)를 받는 호출 가능 객체여야 하며, 이 위치 인자에 해당하는 매개변수 타입은 해당 필드와 연관된 합성된 `__init__` 매개변수의 타입을 제공합니다.

즉, `converter` 매개변수에 제공되는 인수는 `Callable[[T], X]`와 호환되어야 합니다. 여기서 `T`는 `converter`의 입력 타입이고 `X`는 `converter`의 출력 타입입니다.

##### `default` 및 `default_factory`의 타입 체크 (Type-checking default and default_factory)
기본값은 `converter`를 사용하여 무조건 변환되므로, `converter` 인수가 `default` 또는 `default_factory`와 함께 제공될 경우, 기본값의 타입(제공된 경우 `default` 인수, 그렇지 않으면 `default_factory`의 반환 값)은 `converter` 호출 가능 객체의 단일 인자 타입을 사용하여 체크되어야 합니다.

##### `converter` 반환 타입 (Converter return type)
호출 가능 객체의 반환 타입은 필드의 선언된 타입과 호환되는 타입이어야 합니다. 이는 필드의 타입과 정확히 일치할 수도 있지만, 더 구체적인 타입(예: `list`로 어노테이션된 필드에 대해 `list[int]`를 반환하는 `converter`, 또는 `int | str`로 어노테이션된 필드에 대해 `int`를 반환하는 `converter`)일 수도 있습니다.

##### 허용 가능한 인자 타입의 간접성 (Indirection of allowable argument types)
이 PEP로 인해 발생하는 한 가지 단점은 `dataclass`의 `__init__` 및 속성 할당 시 허용되는 인자 타입을 읽는 것만으로는 즉시 파악하기 어렵다는 것입니다. 허용 가능한 타입은 `converter`에 의해 정의됩니다.

이는 소스 코드를 읽을 때 사실이지만, `typing.reveal_type` 및 IDE의 "IntelliSense"와 같은 타이핑 관련 도우미는 소스 코드를 읽을 필요 없이 정확히 어떤 타입이 허용되는지 쉽게 알 수 있도록 해야 합니다.

### 하위 호환성 (Backward Compatibility)
이러한 변경 사항은 선택적(opt-in) 새 기능을 도입하기 때문에 호환성 문제를 일으키지 않습니다.

### 보안 영향 (Security Implications)
이러한 변경 사항과 관련된 직접적인 보안 문제는 없습니다.

### 학습 방법 (How to Teach This)
새로운 매개변수와 동작을 설명하는 문서와 예시가 문서 사이트의 관련 섹션(`dataclasses` 섹션이 주)에 추가되고, "What's New" 문서에서 링크될 예정이었습니다.

추가된 문서/예시에는 `converter` 사용자에게 발생할 수 있는 "흔한 함정(common pitfalls)"도 포함될 예정이었습니다. 이러한 함정은 다음과 같습니다:
*   `None`/센티넬(sentinel) 값 처리 필요성.
*   이미 올바른 타입인 값 처리 필요성.
*   `converter`에 람다(lambdas) 사용 피하기 (합성된 `__init__` 매개변수의 타입이 `Any`가 되기 때문).
*   `frozen` dataclasses에서 사용자 정의 `__init__` 본문에서 값 변환을 잊는 경우.
*   `frozen`이 아닌 dataclasses에서 사용자 정의 `__setattr__` 본문에서 값 변환을 잊는 경우.

또한, 잠재적으로 혼란스러운 패턴 매칭(pattern matching) 의미론도 다뤄질 예정이었습니다:

```python
@dataclass
class Point:
    x: int = field(converter=int)
    y: int

match Point(x="0", y=0):
    case Point(x="0", y=0): # 매치되지 않음 (Won't be matched)
        ...
    case Point(): # 매치됨 (Will be matched)
        ...
    case _:
        ...
```

그러나 이러한 동작은 초기화자(initializer)에서 변환을 수행하는 모든 타입에 해당하며, 타입 체커가 이 함정을 포착할 수 있어야 한다는 점에 주목할 가치가 있습니다:

```python
match int("0"):
    case int("0"): # 매치되지 않음 (Won't be matched)
        ...
    case _: # 매치됨 (Will be matched)
        ...
```

### 참조 구현 (Reference Implementation)
`attrs` 라이브러리는 `@define` 클래스 데코레이터를 사용할 때 동일한 `converter` 의미론(초기화자와 속성 설정 시 변환)을 보여주는 `converter` 매개변수를 이미 포함하고 있습니다.

CPython 지원은 작성자의 포크(fork)에 있는 브랜치에 구현되어 있습니다.

### 거부된 아이디어 (Rejected Ideas)

#### `typing.dataclass_transform`의 `field_specifiers`에만 "converter" 추가
`dataclass_transform()`에만 이 추가를 한정하자는 아이디어는 Typing-SIG에서 짧게 논의되었으며, `dataclasses` 전체로 확장할 것을 제안했습니다.

또한, `dataclasses`에 이 기능을 추가하는 것은 추가 라이브러리 없이도 모든 사람이 이점을 얻을 수 있도록 보장합니다.

#### 기본값(default values)을 변환하지 않기
기본값을 변환하는 것과 변환하지 않는 것 모두 장단점이 있습니다. 기본값을 그대로 두면 타입 체커와 `dataclass` 작성자가 기본값의 타입이 필드의 타입과 일치할 것으로 예상할 수 있습니다. 그러나 기본값을 변환하는 것은 세 가지 큰 장점이 있습니다:
*   **일관성 (Consistency):** 속성에 할당되는 모든 값을 무조건 변환하는 것은 사용자가 기억해야 할 "특별한 규칙"을 줄입니다.
*   **더 간단한 기본값 (Simpler defaults):** 기본값이 사용자 제공 값과 동일한 타입을 가질 수 있도록 허용하면 `dataclass` 작성자는 호출자와 동일한 편의성을 얻습니다.
*   **attrs와의 호환성 (Compatibility with attrs):** `attrs`는 `converter`를 사용하여 기본값을 무조건 변환합니다.

#### 필드 타입 사용한 자동 변환 (Automatic conversion using the field's type)
한 가지 아이디어는 지정된 필드의 타입(예: `str` 또는 `int`)을 제공된 각 인수의 `converter`로 사용하도록 허용하는 것이었습니다. Pydantic의 데이터 변환은 이러한 접근 방식과 유사한 의미론을 가지고 있습니다.

이는 상당히 간단한 타입에서는 잘 작동하지만, 제네릭(generics)과 같은 복잡한 타입에서는 예상되는 동작에 모호성을 초래합니다. 예를 들어, `tuple[int, ...]`의 경우 `converter`가 단순히 이터러블(iterable)을 튜플로 변환해야 하는지, 아니면 각 요소 타입을 `int`로 추가로 변환해야 하는지가 모호합니다. 또는 호출 가능 객체가 아닌 `int | None`의 경우도 마찬가지입니다.

#### `converter`의 반환 타입에서 속성 타입 추론 (Deducing the attribute type from the return type of the converter)
또 다른 아이디어는 `converter` 인수가 있는 필드를 제공할 경우 사용자가 속성의 타입 어노테이션을 생략할 수 있도록 하는 것이었습니다. 비록 이 PEP가 도입하는 흔한 반복(예: `x: str = field(converter=str)`)을 줄일 수 있었겠지만, 현재 `dataclass` 의미론(특히, 합성된 `__init__` 또는 `dataclasses.fields`와 같은 것들을 위해 속성 순서가 유지된다는 점)을 유지하면서 이를 최적으로 지원하는 방법이 명확하지 않습니다. 이는 Python에서 (현재) 어노테이션만 있는 속성과 어노테이션이 없는 속성들이 정의된 순서대로 섞여 있을 때 쉽게 가져올 방법이 없기 때문입니다.

센티넬 어노테이션(예: `x: FromConverter = ...`)을 적용할 수 있었겠지만, 이는 타입 어노테이션의 근본적인 가정을 깨뜨립니다.

마지막으로, 모든 필드(converter가 없는 필드 포함)가 `dataclasses.field`에 할당되었다면 이는 가능합니다. 이는 클래스 자체의 네임스페이스가 순서를 유지함을 의미하지만, 타입+converter의 반복을 필드 할당의 반복과 맞바꾸는 결과를 낳습니다. 최종 결과는 반복의 이득이나 손실 없이 `dataclasses` 의미론의 복잡성만 추가될 뿐입니다.

이 PEP는 이것이 불가능하거나 수행되어서는 안 된다고 제안하지 않습니다. 단지 이 PEP에는 포함되지 않았을 뿐입니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.