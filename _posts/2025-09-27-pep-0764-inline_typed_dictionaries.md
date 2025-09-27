---
title: "[Draft] PEP 764 - Inline typed dictionaries"
excerpt: "Python Enhancement Proposal 764: 'Inline typed dictionaries'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/764/
toc: true
toc_sticky: true
date: 2025-09-27 13:45:41+0900
last_modified_at: 2025-09-27 13:45:41+0900
published: true
---
> **원문 링크:** [PEP 764 - Inline typed dictionaries](https://peps.python.org/pep-0764/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 25-Oct-2024

## PEP 764 – 인라인 TypedDict 제안 (Inline typed dictionaries)

### 개요 (Abstract)
[PEP 589](https://peps.python.org/pep-0589/)는 `TypedDict`를 생성하기 위한 클래스 기반 및 함수형(functional) 문법을 정의합니다. 그러나 이 두 방식 모두 클래스를 정의하거나 값에 할당하는 과정을 필요로 합니다. 특정 상황, 특히 `TypedDict`가 한 번만 사용되는 경우, 이는 불필요한 보일러플레이트(boilerplate) 코드를 추가할 수 있습니다.

이 PEP는 `TypedDict` 타입을 서브스크립트(subscripting)하는 새로운 인라인(inline) 문법을 추가할 것을 제안합니다.

예시:
```python
from typing import TypedDict

def get_movie() -> TypedDict[{'name': str, 'year': int}]:
    return {
        'name': 'Blade Runner',
        'year': 1982,
    }
```
### 동기 (Motivation)
Python 딕셔너리(dictionaries)는 언어의 필수적인 데이터 구조이며, 함수에서 구조화된 데이터를 반환하거나 받는 데 자주 사용됩니다. 그러나 `TypedDict` 클래스를 정의하는 과정은 다음과 같은 이유로 번거로울 수 있습니다:

*   `TypedDict`는 이름을 요구하지만, 그 이름이 항상 중요하지 않을 수 있습니다.
*   중첩된 딕셔너리는 두 개 이상의 클래스 정의를 필요로 합니다.

중첩된 구조화된 데이터를 반환하는 간단한 함수를 예로 들어보겠습니다:
```python
from typing import TypedDict

class ProductionCompany(TypedDict):
    name: str
    location: str

class Movie(TypedDict):
    name: str
    year: int
    production: ProductionCompany

def get_movie() -> Movie:
    return {
        'name': 'Blade Runner',
        'year': 1982,
        'production': {
            'name': 'Warner Bros.',
            'location': 'California',
        }
    }
```

### 이론적 근거 (Rationale)
새로운 인라인 문법은 이러한 문제들을 해결하는 데 사용될 수 있습니다.

```python
def get_movie() -> TypedDict[{'name': str, 'year': int, 'production': TypedDict[{'name': str, 'location': str}]}]:
    ...
```

인라인 `TypedDict`는 함수형 또는 클래스 기반 문법만큼 유용하지는 않지만, 별칭(alias)으로 변수에 할당할 수 있습니다.
```python
InlineTD = TypedDict[{'name': str}]
def get_movie() -> InlineTD:
    ...
```

### 상세 사양 (Specification)

`TypedDict` 스페셜 폼(special form)은 서브스크립트가 가능해지며, 함수형 문법과 동일한 의미론(semantics)을 따르는 단일 타입 인자(type argument)로 `dict`를 허용합니다 (딕셔너리 키는 필드 이름을 나타내는 문자열이며, 값은 유효한 Annotation 표현식입니다). 중괄호 생성자(`{k: <type>}`) 내의 쉼표로 구분된 `key: value` 쌍 목록만 허용되며, 타입 인자로 직접 지정되어야 합니다 (즉, 이전에 `dict` 인스턴스가 할당된 변수를 사용하는 것은 허용되지 않습니다).

인라인 `TypedDict`는 익명(anonymous)으로 참조될 수 있는데, 이는 특정 이름이 없음을 의미합니다 (런타임 동작 섹션 참조).

중첩된 인라인 딕셔너리를 정의하는 것이 가능합니다.
```python
Movie = TypedDict[{'name': str, 'production': TypedDict[{'location': str}]}]
# 참고: 다음은 업데이트된 `type_expression` 문법에 따라 유효하지 않습니다:
# Movie = TypedDict[{'name': str, 'production': {'location': str}}]
```

`total`과 같은 클래스 인자를 지정하는 것은 불가능하지만, 개별 필드에 대해서는 어떤 타입 한정자(qualifier)도 사용할 수 있습니다.
```python
Movie = TypedDict[{'name': NotRequired[str], 'year': ReadOnly[int]}]
```

인라인 `TypedDict`는 암묵적으로 `total`이며, 모든 키가 존재해야 합니다. 따라서 `Required` 타입 한정자를 사용하는 것은 중복입니다.

타입 변수(Type variables)는 외부 스코프(scope)에 바인딩되어 있다면 인라인 `TypedDict`에서 허용됩니다.
```python
class C[T]:
    inline_td: TypedDict[{'name': T}] # OK, `T`는 클래스 `C`의 스코프에 있습니다.
reveal_type(C[int]().inline_td['name']) # Revealed type is 'int'

def fn[T](arg: T) -> TypedDict[{'name': T}]: ... # OK: `T`는 함수 `fn`의 스코프에 있습니다.
reveal_type(fn('a')['name']) # Revealed type is 'str'

type InlineTD[T] = TypedDict[{'name': T}] # OK, `T`는 타입 별칭의 스코프에 있습니다.

T = TypeVar('T')
InlineTD = TypedDict[{'name': T}] # OK, 이전 타입 별칭과 동일하지만 구식 문법을 사용합니다.

def func():
    InlineTD = TypedDict[{'name': T}] # Not OK: `T`는 `func`의 스코프에 바인딩되지 않은 타입 변수를 참조합니다.
```

인라인 `TypedDict`는 확장될 수 있습니다.
```python
InlineTD = TypedDict[{'a': int}]
class SubTD(InlineTD):
    pass
```

#### 타이핑 사양 변경 (Typing specification changes)
인라인 `TypedDict`는 새로운 종류의 타입 표현식(type expression)을 추가합니다. 이에 따라 `type_expression` 프로덕션은 인라인 문법을 포함하도록 업데이트될 것입니다.

`new-type_expression ::= type_expression | <TypedDict> '[' '{' (string: ':' annotation_expression ',')* '}' ']'`
(여기서 `string`은 모든 문자열 리터럴입니다.)

#### 런타임 동작 (Runtime behavior)
인라인 `TypedDict`를 생성하면 새로운 클래스가 생성됩니다. 따라서 `T1`과 `T2`는 동일한 타입입니다.
```python
from typing import TypedDict
T1 = TypedDict('T1', {'a': int})
T2 = TypedDict[{'a': int}]
```

인라인 `TypedDict`는 익명으로 의도되었으므로, 해당 `__name__` 속성은 `<inline TypedDict>` 문자열 리터럴로 설정됩니다. 향후에는 명명된 클래스와 구별할 수 있도록 명시적인 클래스 속성이 추가될 수 있습니다.

`TypedDict`는 클래스로 문서화되어 있지만, 정의 방식은 구현 세부 사항(implementation detail)입니다. `TypedDict`가 서브스크립트 가능하도록 구현이 조정되어야 합니다.

### 하위 호환성 (Backwards Compatibility)
이 PEP는 하위 호환성을 깨뜨리는 변경 사항을 포함하지 않습니다.

### 보안 영향 (Security Implications)
이 PEP로 인해 발생하는 알려진 보안 문제는 없습니다.

### 교육 방법 (How to Teach This)
새로운 인라인 문법은 `typing` 모듈 문서와 타이핑 사양 모두에 문서화될 것입니다.

복잡한 딕셔너리 구조가 사용될 때, 모든 것을 한 줄에 정의하면 가독성을 해칠 수 있습니다. 코드 포맷터(Code formatters)는 인라인 타입 딕셔너리를 여러 줄에 걸쳐 포맷팅하여 도움을 줄 수 있습니다.
```python
def edit_movie(
    movie: TypedDict[{
        'name': str,
        'year': int,
        'production': TypedDict[{
            'location': str,
        }],
    }],
) -> None:
    ...
```

### 참조 구현 (Reference Implementation)
Mypy는 실험적인 기능으로 유사한 문법을 지원합니다.
```python
def test_values() -> {"int": int, "str": str}:
    return {"int": 42, "str": "test"}
```
이 PEP에 대한 지원은 이 풀 리퀘스트에서 추가됩니다.
Pyright는 버전 1.1.387에서 새로운 문법에 대한 지원을 추가했습니다.

#### 런타임 구현 (Runtime implementation)
필요한 변경 사항은 이 풀 리퀘스트의 `typing_extensions`에 처음 구현되었습니다.

### 거부된 아이디어 (Rejected Ideas)

#### 어노테이션에서 함수형 문법 사용 (Using the functional syntax in annotations)
대안적인 함수형 문법을 어노테이션으로 직접 사용할 수 있었습니다.
```python
def get_movie() -> TypedDict('Movie', {'title': str}):
    ...
```
그러나 호출 표현식(call expressions)은 현재 이러한 컨텍스트에서 여러 가지 이유(처리 비용이 많이 들고, 평가가 표준화되어 있지 않음)로 지원되지 않습니다. 또한, 때로는 중요하지 않은 이름이 필요할 것입니다.

#### 단일 타입 인자와 함께 `dict` 또는 `typing.Dict` 사용 (Using dict or typing.Dict with a single type argument)
동일한 개념을 표현하기 위해 단일 타입 인자와 함께 `dict` 또는 `typing.Dict`를 재사용할 수 있었습니다.
```python
def get_movie() -> dict[{'title': str}]:
    ...
```
이것은 `typing`에서 `TypedDict`를 import할 필요를 없애주지만, 이 해결책에는 몇 가지 단점이 있습니다.

*   타입 체커(type checkers)의 경우, `dict`는 두 개의 타입 변수를 가진 일반 클래스입니다. `dict`가 단일 타입 인자로 파라미터화(parametrized)되도록 허용하려면 타입 체커의 특별한 케이스 처리가 필요합니다. 이는 파라미터화 오버로드(overloads)를 표현할 방법이 없기 때문입니다. 반면에 `TypedDict`는 이미 스페셜 폼입니다.
*   향후 작업이 인라인 `TypedDict`가 할 수 있는 기능을 확장하더라도, `dict`와 기호(symbol)를 공유하는 것의 영향에 대해 걱정할 필요가 없습니다.
*   `typing.Dict`는 [PEP 585](https://peps.python.org/pe585/)에 의해 더 이상 사용되지 않습니다 (제거 계획은 없지만). 새로운 타이핑 기능에 이를 사용하면 사용자에게 혼란을 줄 것입니다 (그리고 코드 린터(linters)의 변경이 필요할 것입니다).

#### 단순 딕셔너리 사용 (Using a simple dictionary)
`TypedDict` 클래스를 서브스크립트하는 대신, 일반 딕셔너리를 어노테이션으로 사용할 수 있었습니다.
```python
def get_movie() -> {'title': str}:
    ...
```
그러나 [PEP 584](https://peps.python.org/pep-0584/)는 딕셔너리에 대한 union 연산자를 추가했고, [PEP 604](https://peps.python.org/pep-0604/)는 union 타입을 도입했습니다. 두 기능 모두 비트와이즈 OR(`|`) 연산자를 사용하므로, 특히 런타임 인트로스펙션(introspection)의 경우 다음과 같은 사용 사례가 호환되지 않습니다.
```python
# 딕셔너리가 병합됩니다:
def fn() -> {'a': int} | {'b': str}: ...

# 런타임에 타입 에러를 발생시킵니다:
def fn() -> {'a': int} | int: ...
```

#### 다른 TypedDict 확장 (Extending other typed dictionaries)
다른 `TypedDict`를 확장하는 기능을 갖기 위해 여러 문법이 사용될 수 있었습니다.
```python
InlineBase = TypedDict[{'a': int}]
Inline = TypedDict[InlineBase, {'b': int}]
# 또는, 슬라이스를 제공하여:
# Inline = TypedDict[{'b': int} : (InlineBase,)]
```
인라인 `TypedDict`는 기존 문법의 하위 집합만 지원하도록 의도되었으므로, 추가되는 복잡성을 고려할 때 이 확장 메커니즘을 지원하는 것은 충분히 설득력이 없습니다.
만약 인터섹션(intersections)이 타입 시스템에 추가된다면, 이 사용 사례를 다룰 수 있을 것입니다.

### 미해결 문제 (Open Issues)

#### 인라인 TypedDict와 추가 항목 (Inline typed dictionaries and extra items)
[PEP 728](https://peps.python.org/pep-0728/)은 닫힌(closed) `TypedDict`의 개념을 도입합니다. 이 PEP가 승인된다면, 인라인 `TypedDict`는 기본적으로 닫힌 상태가 될 것입니다. 이는 이 PEP가 그에 따라 업데이트될 수 있도록 PEP 728이 먼저 처리되어야 함을 의미합니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain) 또는 CC0-1.0-Universal 라이선스(둘 중 더 관대한 라이선스)로 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.