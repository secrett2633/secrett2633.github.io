---
title: "[Final] PEP 435 - Adding an Enum type to the Python standard library"
excerpt: "Python Enhancement Proposal 435: 'Adding an Enum type to the Python standard library'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/435/
toc: true
toc_sticky: true
date: 2025-09-26 21:46:35+0900
last_modified_at: 2025-09-26 21:46:35+0900
published: true
---
> **원문 링크:** [PEP 435 - Adding an Enum type to the Python standard library](https://peps.python.org/pep-0435/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 23-Feb-2013


# PEP 435 – Python 표준 라이브러리에 Enum 타입 추가

## 요약 (Abstract)
이 PEP는 Python 표준 라이브러리에 열거형(enumeration type)을 추가할 것을 제안합니다. 열거형은 고유하고 상수적인 값에 바인딩된 심볼릭 이름의 집합입니다. 열거형 내에서 값은 식별자(identity)로 비교될 수 있으며, 열거형 자체는 순회(iterate)할 수 있습니다.

## 논의 현황 (Status of discussions)
Python에 Enum 타입을 추가하려는 시도는 PEP 354에서 처음 있었으나 2005년에 거부되었습니다. 최근 `python-ideas` 메일링 리스트에서 새로운 논의가 시작되었고, Guido van Rossum은 `flufl.enum`을 표준 라이브러리에 추가하는 것을 제안했습니다. PyCon 2013 언어 서밋에서 추가 논의가 있었고, 많은 개발자들이 `int`를 상속하는 Enum (`IntEnum`)을 원한다는 점이 명확해졌습니다. 이는 역호환성(backward compatibility)을 유지하면서 표준 라이브러리의 많은 정수 상수(integer constants)를 Enum으로 대체할 수 있게 합니다.

`Enum`과 `IntEnum` 사이의 핵심 차이점은 정수와의 비교가 의미론적으로 유효한지 여부입니다. 대부분의 경우 정수와의 비교를 거부하는 것이 바람직하지만, 기존 표준 라이브러리 상수(예: `socket.AF_INET`)를 대체하는 경우와 같이 정수와의 상호 운용성이 필요한 경우도 있습니다. 2013년 4월 말의 추가 논의를 통해 열거형 멤버의 타입은 해당 열거형에 속해야 한다(`type(Color.red) == Color`)는 결론이 나왔습니다. 또한, 열거형 멤버를 정의하지 않는 경우가 아니라면 열거형의 서브클래싱을 허용하지 않기로 결정했습니다. 이 PEP는 2013년 5월 10일 Guido에 의해 승인되었습니다.

## 도입 배경 (Motivation)
열거형의 속성은 불변하고(immutable), 서로 관련 있으며(related), 의미를 가질 수도 있고 아닐 수도 있는 상수 값의 집합을 정의하는 데 유용합니다. 고전적인 예로는 요일(`Sunday`부터 `Saturday`까지)이나 학점(`A`부터 `D`, 그리고 `F`)이 있습니다. 에러 상태 값이나 특정 프로세스 내의 상태도 좋은 예시입니다.

`int`나 `str` 같은 다른 기본 타입의 값 시퀀스를 단순히 정의하여 개별적인 임의의 값을 나타낼 수도 있습니다. 그러나 열거형은 이러한 값이 다른 어떤 값과도 구별되며(특히 다른 열거형 내의 값과도), 의미 없는 연산("`Wednesday` 곱하기 2")이 정의되지 않음을 보장합니다. 또한, 열거형 값을 정의할 때 지루한 반복 없이 편리한 출력 가능한 표현을 제공합니다 (예: `GREEN = 'green'`을 반복할 필요가 없음).

## 모듈 및 타입 이름 (Module and type name)
표준 라이브러리에 `enum`이라는 모듈을 추가할 것을 제안합니다. 이 모듈에서 노출되는 주요 타입은 `Enum`입니다. `Enum` 타입을 임포트하려면 다음과 같이 작성합니다.

```python
from enum import Enum
```

## 새로운 열거형 타입의 제안된 의미론 (Proposed semantics for the new enumeration type)

### Enum 생성 (Creating an Enum)
열거형은 클래스 문법을 사용하여 생성됩니다. 이는 읽고 쓰기 쉽습니다. 다음과 같이 `Enum`을 서브클래싱하여 열거형을 정의합니다.

```python
from enum import Enum

class Color(Enum):
    red = 1
    green = 2
    blue = 3
```
여기서 `Color`는 열거형(enumeration 또는 enum)이고, `Color.red`, `Color.green` 등은 열거형 멤버(enumeration members 또는 enum members)입니다. 열거형 멤버는 값(`Color.red`의 값은 `1`)을 가집니다.

### 프로그래밍 방식 접근 (Programmatic access to enumeration members)
열거형 멤버에 값으로 접근하거나 이름으로 접근할 수 있습니다.
```python
>>> Color(1)
<Color.red: 1>
>>> Color['red']
<Color.red: 1>
```

### Enum 멤버 및 값 중복 (Duplicating enum members and values)
동일한 이름을 가진 두 개의 Enum 멤버는 허용되지 않습니다 (`TypeError` 발생). 하지만 동일한 값을 가진 두 개의 Enum 멤버는 허용됩니다. 이 경우, 나중에 정의된 멤버는 이전에 정의된 동일한 값을 가진 멤버의 **별칭(alias)** 이 됩니다. Enum을 순회할 때는 별칭은 포함되지 않습니다. 모든 멤버(별칭 포함)에 접근하려면 특수 속성 `__members__`를 사용합니다.

```python
class Shape(Enum):
    square = 2
    diamond = 1
    circle = 3
    alias_for_square = 2 # alias_for_square는 square의 별칭

>>> list(Shape)
[<Shape.square: 2>, <Shape.diamond: 1>, <Shape.circle: 3>]
>>> for name, member in Shape.__members__.items():
...     print(name, member)
...
('square', <Shape.square: 2>)
('diamond', <Shape.diamond: 1>)
('circle', <Shape.circle: 3>)
('alias_for_square', <Shape.square: 2>)
```

### 비교 (Comparisons)
열거형 멤버는 식별자(identity)로 비교됩니다. 순서 비교(`Color.red < Color.blue`)는 지원되지 않지만, 동등성 비교(`==`, `!=`)는 정의됩니다. 열거형이 아닌 값과의 비교는 항상 같지 않음으로 간주됩니다 (단, `IntEnum`은 예외입니다).

### 허용되는 멤버 및 속성 (Allowed members and attributes of enumerations)
열거형은 Python 클래스와 동일하게 메서드 및 특수 메서드를 가질 수 있습니다. `__dunder__` 이름과 디스크립터(descriptor)를 제외한 모든 속성은 열거형의 멤버가 됩니다.

### 제한된 서브클래싱 (Restricted subclassing of enumerations)
열거형은 멤버를 정의하지 않는 경우에만 서브클래싱이 허용됩니다. 멤버를 정의한 열거형을 서브클래싱하려 하면 `TypeError`가 발생합니다. 이는 타입과 인스턴스의 중요한 불변성(invariants) 위반을 방지하기 위함입니다. 그러나 비어있는 열거형을 서브클래싱하는 것은 `IntEnum` 구현 등 일부 공통 동작을 공유하는 데 유용합니다.

### IntEnum
`IntEnum`은 `int`의 서브클래스이기도 한 `Enum`의 변형입니다. `IntEnum`의 멤버는 정수와 비교할 수 있으며, 다른 `IntEnum` 타입의 열거형끼리도 비교할 수 있습니다.

```python
from enum import IntEnum

class Shape(IntEnum):
    circle = 1
    square = 2

>>> Shape.circle == 1
True
```
하지만 `IntEnum`은 여전히 일반 `Enum`과는 비교할 수 없습니다. `IntEnum`은 `int`처럼 동작하여 `int()`로 변환되거나 리스트 인덱싱에 사용될 수 있습니다. 대부분의 코드에서는 `Enum`이 강력히 권장됩니다. `IntEnum`은 정수와 비교 가능하여 전이성(transitivity)으로 인해 관련 없는 다른 열거형과도 비교될 수 있으므로, 열거형의 일부 의미론적 약속을 깰 수 있습니다. `IntEnum`은 기존 정수 상수를 열거형으로 대체하고 역호환성이 필요한 특별한 경우에만 사용해야 합니다.

### 기타 파생 열거형 (Other derived enumerations)
`IntEnum`은 `enum` 모듈의 일부가 되지만, 다음과 같이 간단하게 독립적으로 구현할 수 있습니다.

```python
class IntEnum(int, Enum):
    pass
```
이는 `int` 대신 `str`을 섞어 넣는 `StrEnum`과 같은 유사한 파생 열거형을 정의하는 방법을 보여줍니다. `Enum`을 서브클래싱할 때, 믹스인(mix-in) 타입은 `Enum` 자체보다 먼저 기본 클래스 시퀀스에 나타나야 합니다. 또한, 추가 타입을 믹스인하면 모든 멤버는 해당 타입의 값을 가져야 합니다.

### 피클링 (Pickling)
열거형은 피클링(pickling) 및 언피클링(unpickling)이 가능합니다. 단, 피클링 가능한 Enum은 모듈의 최상위 레벨에 정의되어야 한다는 일반적인 제약이 적용됩니다.

### 함수형 API (Functional API)
`Enum` 클래스는 호출 가능하며, 다음과 같은 함수형 API를 제공합니다.

```python
Animal = Enum('Animal', 'ant bee cat dog')
>>> Animal.ant
<Animal.ant: 1>
```
이 API의 의미론은 `namedtuple`과 유사합니다. 첫 번째 인수는 열거형의 이름이고, 두 번째 인수는 열거형 멤버 이름의 소스(공백으로 구분된 문자열, 이름 시퀀스, 키/값 쌍 튜플 시퀀스, 또는 이름-값 매핑)입니다. 후자의 두 가지 옵션은 임의의 값을 할당할 수 있게 하며, 다른 옵션은 1부터 시작하는 증가하는 정수를 자동으로 할당합니다.

## 표준 라이브러리에서의 활용 사례 (Use-cases in the standard library)
Python 표준 라이브러리에는 현재 다른 관용구로 표현되는 많은 상수를 Enum으로 대체함으로써 이점을 얻을 수 있는 많은 장소가 있습니다. 이러한 사용 사례는 두 가지 범주로 나눌 수 있습니다:

*   **사용자 코드에 노출되는 상수 (User-code facing constants):** `os.SEEK_*`, `socket` 모듈 상수, `decimal` 반올림 모드, HTML 에러 코드 등은 사용자 코드가 정수를 기대할 수 있으므로 역호환성이 필요할 수 있습니다. 위에 설명된 `IntEnum`은 필요한 의미론을 제공하여, `int`의 서브클래스이므로 정수를 기대하는 사용자 코드에 영향을 미치지 않으면서 열거형 값에 대한 출력 가능한 표현을 허용합니다.
*   **내부 상수 (Internal constants):** 사용자 코드에는 보이지 않지만 표준 라이브러리 모듈 내부에서 사용되는 상수들입니다. 이들은 `Enum`으로 구현될 수 있습니다 (예: `binhex`, `imaplib`, `http.client` 등).

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.