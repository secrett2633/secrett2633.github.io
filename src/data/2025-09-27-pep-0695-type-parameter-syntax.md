---
title: "[Final] PEP 695 - Type Parameter Syntax"
excerpt: "Python Enhancement Proposal 695: 'Type Parameter Syntax'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/695/
toc: true
toc_sticky: true
date: 2025-09-27 13:03:44+0900
last_modified_at: 2025-09-27 13:03:44+0900
published: true
---
> **원문 링크:** [PEP 695 - Type Parameter Syntax](https://peps.python.org/pep-0695/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 15-Jun-2022


# PEP 695 – 타입 매개변수 구문

*   **작성자:** Eric Traut
*   **후원자:** Guido van Rossum
*   **상태:** Final
*   **타입:** Standards Track (표준 트랙)
*   **주제:** Typing (타입 힌트)
*   **생성일:** 2022년 6월 15일
*   **Python 버전:** 3.12
*   **해결책:** Discourse message

## 초록 (Abstract)

이 PEP는 제네릭 클래스, 함수 또는 타입 별칭 내에서 타입 매개변수를 지정하기 위한 개선된 구문을 명시합니다. 또한, 타입 별칭을 선언하기 위한 새로운 `type` 문(statement)을 도입합니다.

## 동기 (Motivation)

PEP 484는 타입 변수(TypeVar)를 언어에 도입했습니다. PEP 612는 매개변수 사양(ParamSpec)을 도입하여 이 개념을 확장했고, PEP 646은 가변 타입 변수(Variadic Type Variables)를 추가했습니다.

제네릭 타입과 타입 매개변수가 점점 더 널리 사용되고 있지만, 타입 매개변수를 지정하는 기존 구문은 여전히 Python에 "억지로 끼워 넣은" 듯한 느낌을 주어, 많은 Python 개발자들 사이에서 혼란의 원인이 되고 있습니다.

Python 정적 타입 시스템(static typing) 커뮤니티 내에서는 제네릭 타입을 지원하는 다른 현대 프로그래밍 언어와 유사한 공식 구문을 제공할 때가 되었다는 합의가 있었습니다. 25개의 인기 있는 타입 힌트가 적용된 Python 라이브러리를 분석한 결과, 모듈의 14%에서 타입 변수(특히 `typing.TypeVar` 심볼)가 사용된 것으로 나타났습니다.

### 혼란의 지점들 (Points of Confusion)

타입 변수의 사용이 널리 퍼졌음에도 불구하고, 코드 내에서 타입 변수를 지정하는 방식은 많은 Python 개발자들에게 혼란의 원인이 됩니다. 이러한 혼란을 야기하는 몇 가지 요인은 다음과 같습니다.

*   **스코핑 규칙의 어려움:** 타입 변수의 스코핑 규칙은 이해하기 어렵습니다. 타입 변수는 일반적으로 전역 스코프(global scope)에 할당되지만, 그 의미론적(semantic) 의미는 제네릭 클래스, 함수 또는 타입 별칭의 컨텍스트 내에서 사용될 때만 유효합니다. 단일 런타임 타입 변수 인스턴스는 여러 제네릭 컨텍스트에서 재사용될 수 있으며, 각 컨텍스트에서 다른 의미론적 의미를 가집니다. 이 PEP는 클래스, 함수 또는 타입 별칭 선언문 내에서 자연스러운 위치에 타입 매개변수를 선언함으로써 이러한 혼란을 해소하고자 합니다.
*   **제네릭 타입 별칭의 오용:** 개발자들이 타입 별칭이 사용될 때 타입 인수가 제공되어야 한다는 점을 명확히 알지 못해 제네릭 타입 별칭이 오용되는 경우가 많습니다. 이로 인해 의도하지 않은 `Any` 타입 인수가 암시적으로 적용되는 경우가 발생합니다. 이 PEP는 제네릭 타입 별칭 선언을 명확하게 하는 새로운 구문을 추가할 것을 제안합니다.
*   **분산(Variance) 개념의 복잡성:** PEP 483과 PEP 484는 제네릭 클래스 내에서 사용되는 타입 변수의 "분산(variance)" 개념을 도입했습니다. 타입 변수는 `invariant`, `covariant`, 또는 `contravariant`일 수 있습니다. 분산 개념은 대부분의 Python 개발자들에게 잘 이해되지 않는 타입 이론의 고급 세부 사항이지만, 첫 번째 제네릭 클래스를 정의할 때 이 개념에 직면해야 합니다. 이 PEP는 대부분의 개발자가 제네릭 클래스를 정의할 때 분산 개념을 이해할 필요성을 크게 줄입니다.
*   **타입 매개변수 순서의 혼란:** 여러 타입 매개변수가 제네릭 클래스나 타입 별칭과 함께 사용될 때, 타입 매개변수 순서에 대한 규칙이 혼란스러울 수 있습니다. 일반적으로 클래스 또는 타입 별칭 선언문 내에서 처음 나타나는 순서를 기반으로 합니다. 그러나 이는 `Generic` 또는 `Protocol` 기본 클래스를 포함함으로써 클래스 정의에서 재정의될 수 있습니다. 이 PEP는 모든 경우에 타입 매개변수 순서를 명시적으로 만들 것을 제안합니다.
*   **여러 제네릭 컨텍스트에서 타입 변수 공유 문제:** 여러 제네릭 컨텍스트에서 타입 변수를 공유하는 관행은 다른 문제를 야기합니다. 최신 에디터는 의미론적 수준에서 심볼에 대해 "모든 참조 찾기" 및 "모든 참조 이름 변경"과 같은 기능을 제공합니다. 타입 매개변수가 여러 제네릭 클래스, 함수 및 타입 별칭 간에 공유될 때 모든 참조는 의미론적으로 동일합니다.
*   **중복되고 번거로운 이름:** 전역 스코프에 정의된 타입 변수는 모듈에 대해 비공개임을 나타내기 위해 밑줄로 시작하는 이름을 지정해야 합니다. 또한, 전역적으로 정의된 타입 변수에는 분산을 나타내는 이름이 주어지는 경우가 많아 "_T_contra" 및 "_KT_co"와 같이 번거로운 이름이 됩니다. 현재 타입 변수를 할당하는 메커니즘은 개발자가 따옴표 안에 중복된 이름("T" = TypeVar("T"))을 제공해야 합니다. 이 PEP는 중복된 이름과 번거로운 변수 이름의 필요성을 없앱니다.
*   **`typing` 모듈 임포트의 필요성:** 현재 타입 매개변수를 정의하려면 `TypeVar` 및 `Generic` 심볼을 `typing` 모듈에서 임포트해야 합니다. 지난 몇몇 Python 릴리스에서 일반적인 사용 사례에 대해 `typing` 심볼을 임포트할 필요성을 없애려는 노력이 있었고, 이 PEP는 이 목표를 더욱 발전시킵니다.

## 요약 예시 (Summary Examples)

이 PEP 이전의 제네릭 클래스 정의는 다음과 같습니다.

```python
from typing import Generic, TypeVar

_T_co = TypeVar("_T_co", covariant=True, bound=str)

class ClassA(Generic[_T_co]):
    def method1(self) -> _T_co:
        ...
```

새로운 구문으로는 다음과 같습니다.

```python
class ClassA[T: str]:
    def method1(self) -> T:
        ...
```

현재 제네릭 함수의 예시입니다.

```python
from typing import TypeVar

_T = TypeVar("_T")

def func(a: _T, b: _T) -> _T:
    ...
```

새로운 구문으로는 다음과 같습니다.

```python
def func[T](a: T, b: T) -> T:
    ...
```

현재 제네릭 타입 별칭의 예시입니다.

```python
from typing import TypeAlias

_T = TypeVar("_T")
ListOrSet: TypeAlias = list[_T] | set[_T]
```

새로운 구문으로는 다음과 같습니다.

```python
type ListOrSet[T] = list[T] | set[T]
```

## 사양 (Specification)

### 타입 매개변수 선언 (Type Parameter Declarations)

제네릭 클래스, 함수 및 타입 별칭에 대한 타입 매개변수를 선언하는 새로운 구문은 다음과 같습니다. 이 구문은 클래스, 함수 또는 타입 별칭의 이름 뒤에 대괄호 안에 쉼표로 구분된 타입 매개변수 목록을 추가하는 것을 지원합니다.

*   단순(비가변) 타입 변수는 꾸밈 없는 이름으로 선언됩니다.
*   가변 타입 변수는 `*`가 앞에 붙습니다 (자세한 내용은 PEP 646 참조).
*   매개변수 사양(ParamSpec)은 `**`가 앞에 붙습니다 (자세한 내용은 PEP 612 참조).

```python
# 이 제네릭 클래스는 TypeVar T, TypeVarTuple Ts, ParamSpec P로 매개변수화됩니다.
class ChildClass[T, *Ts, **P]:
    ...
```

`Generic`을 기본 클래스로 포함할 필요가 없습니다. 타입 매개변수의 존재에 의해 `Generic`의 포함이 암시되며, 클래스의 `__mro__` 및 `__orig_bases__` 속성에 자동으로 포함됩니다. `Generic` 기본 클래스를 명시적으로 사용하면 런타임 오류가 발생합니다.

```python
class ClassA[T](Generic[T]): # 런타임 오류
    ...
```

타입 인수를 포함하는 `Protocol` 기본 클래스는 런타임 오류를 생성할 수 있습니다. 타입 검사기는 이 경우 오류를 생성해야 합니다.

```python
class ClassA[S, T](Protocol): # OK
    ...
class ClassB[S, T](Protocol[S, T]): # 타입 검사기 오류 권장
    ...
```

제네릭 클래스, 함수 또는 타입 별칭 내의 타입 매개변수 이름은 해당 클래스, 함수 또는 타입 별칭 내에서 고유해야 합니다. 중복된 이름은 컴파일 시 구문 오류를 생성합니다.

### 상한선 지정 (Upper Bound Specification)

비가변(non-variadic) 타입 매개변수의 경우, 타입 어노테이션(type annotation) 표현식을 사용하여 "상한선(upper bound)" 타입을 지정할 수 있습니다. 상한선이 지정되지 않으면 `object`가 상한선으로 가정됩니다.

```python
class ClassA[T: str]:
    ...
```

지정된 상한선 타입은 타입 어노테이션에서 허용되는 표현식 형태를 사용해야 합니다. 따옴표로 묶인 전방 참조(forward references)는 허용됩니다. 상한선 타입은 구체적(concrete)이어야 하며, 제네릭 타입을 사용하려는 시도는 타입 검사기에 의해 오류로 플래그되어야 합니다.

### 제약된 타입 지정 (Constrained Type Specification)

PEP 484는 두 개 이상의 타입으로 제약되는 "제약된 타입 변수(constrained type variable)" 개념을 도입했습니다. 새로운 구문은 두 개 이상의 타입을 포함하는 리터럴 튜플 표현식을 사용하여 이러한 타입의 제약을 지원합니다.

```python
class ClassA[AnyStr: (str, bytes)]: # OK
    ...
class ClassB[T: ("ForwardReference", bytes)]: # OK
    ...
class ClassC[T: ()]: # 타입 검사기 오류: 두 개 이상의 타입 필요
    ...
```

### 런타임에서의 상한선 및 제약 표현 (Runtime Representation of Bounds and Constraints)

`TypeVar` 객체의 상한선과 제약은 런타임에 `__bound__` 및 `__constraints__` 속성을 통해 접근할 수 있습니다. 새로운 구문을 통해 정의된 `TypeVar` 객체의 경우, 이러한 속성은 아래 "지연 평가(Lazy Evaluation)"에서 설명하는 대로 지연 평가됩니다.

### 제네릭 타입 별칭 (Generic Type Alias)

타입 별칭을 선언하기 위한 새로운 `type` 문을 도입합니다. `class` 및 `def` 문과 유사하게, `type` 문은 타입 매개변수에 대한 스코프(scope)를 정의합니다.

```python
# 비제네릭 타입 별칭
type IntOrStr = int | str
# 제네릭 타입 별칭
type ListOrSet[T] = list[T] | set[T]
```

타입 별칭은 따옴표를 사용하지 않고도 자신을 참조할 수 있습니다 (재귀 타입 별칭). `type` 키워드는 새로운 소프트 키워드(soft keyword)입니다.

### 런타임 타입 별칭 클래스 (Runtime Type Alias Class)

런타임에 `type` 문은 `typing.TypeAliasType`의 인스턴스를 생성합니다. 이 클래스는 타입 별칭을 나타내며, `__name__`, `__type_params__`, `__value__`와 같은 속성을 가집니다. 이 모든 속성은 읽기 전용입니다. 타입 별칭의 값은 지연 평가됩니다.

### 타입 매개변수 스코프 (Type Parameter Scopes)

새로운 구문이 사용될 때, 새로운 렉시컬 스코프(lexical scope)가 도입되고 이 스코프는 타입 매개변수를 포함합니다. 타입 매개변수는 내부 스코프에서 이름으로 접근할 수 있습니다.

*   타입 매개변수는 목록의 다른 곳에 선언된 다른 타입 매개변수에게 가시적입니다.
*   제네릭 클래스의 일부로 선언된 타입 매개변수는 클래스 본문 및 그 안에 포함된 내부 스코프 내에서 유효합니다.
*   제네릭 함수의 일부로 선언된 타입 매개변수는 함수 본문 및 그 안에 포함된 스코프 내에서 유효하며, 매개변수 및 반환 타입 어노테이션 내에서도 유효합니다.
*   제네릭 타입 별칭의 일부로 선언된 타입 매개변수는 타입 별칭 표현식 내에서 유효합니다.

새로운 타입 매개변수 구문으로 도입된 렉시컬 스코프는 `def` 또는 `class` 문으로 도입된 전통적인 스코프와 다릅니다. 타입 매개변수 스코프는 포함하는 스코프에 대한 임시 "오버레이(overlay)"처럼 작동합니다.

### 런타임에서 타입 매개변수 접근 (Accessing Type Parameters at Runtime)

제네릭 클래스, 함수 및 타입 별칭에 `__type_params__`라는 새로운 속성이 제공됩니다. 이 속성은 클래스, 함수 또는 별칭을 매개변수화하는 타입 매개변수(TypeVar, ParamSpec, TypeVarTuple 인스턴스)의 튜플입니다.

### 분산 추론 (Variance Inference)

이 PEP는 타입 매개변수에 대한 분산을 명시할 필요성을 없앱니다. 대신, 타입 검사기는 클래스 내에서의 사용법에 따라 타입 매개변수의 분산(invariant, covariant, contravariant)을 추론합니다.

분산 추론 알고리즘은 다음과 같습니다.
1.  타입 매개변수가 가변(TypeVarTuple)이거나 매개변수 사양(ParamSpec)인 경우, 항상 `invariant`로 간주됩니다.
2.  타입 매개변수가 `infer_variance`로 지정되지 않은 전통적인 `TypeVar` 선언에서 온 경우, 분산은 `TypeVar` 생성자 호출에 의해 지정됩니다.
3.  클래스의 두 가지 특수화된 버전(`upper` 및 `lower`)을 생성하여 해당 타입 매개변수의 호환성을 확인합니다.
4.  `lower`가 `upper`에 할당 가능한지, `upper`가 `lower`에 할당 가능한지 여부에 따라 `covariant`, `contravariant`, `invariant`를 결정합니다.

### TypeVar에 대한 자동 분산 (Auto Variance For TypeVar)

기존 `TypeVar` 클래스 생성자는 `covariant` 및 `contravariant` 키워드 매개변수를 받습니다. 이 둘 다 `False`이면 타입 변수는 `invariant`로 가정됩니다. 이 PEP는 `infer_variance`라는 또 다른 키워드 매개변수를 추가하여 타입 검사기가 타입 변수가 `invariant`, `covariant`, `contravariant` 중 어느 것인지 추론하도록 지시할 것을 제안합니다.

### 기존 TypeVar와의 호환성 (Compatibility with Traditional TypeVars)

`TypeVar`, `TypeVarTuple`, `ParamSpec`을 할당하는 기존 메커니즘은 하위 호환성을 위해 유지됩니다. 그러나 이러한 "전통적인" 타입 변수는 새로운 구문을 사용하여 할당된 타입 매개변수와 결합해서는 안 됩니다. 이러한 결합은 타입 검사기에 의해 오류로 플래그되어야 합니다.

## 런타임 구현 (Runtime Implementation)

### 문법 변경 (Grammar Changes)

이 PEP는 새로운 소프트 키워드 `type`를 도입합니다. 클래스 및 `def` 문에 선택적 타입 매개변수 절을 추가하고, 타입 별칭 정의를 위한 새로운 `type` 문을 추가하는 방식으로 문법을 수정합니다.

### AST 변경 (AST Changes)

이 PEP는 `TypeAlias`라는 새로운 AST(Abstract Syntax Tree) 노드 타입을 도입합니다. 또한 타입 매개변수를 나타내는 AST 노드 타입 (`TypeVar`, `ParamSpec`, `TypeVarTuple`)을 추가합니다. 기존 `FunctionDef`, `AsyncFunctionDef`, `ClassDef` AST 노드 타입은 함수 또는 클래스와 관련된 타입 매개변수 목록을 포함하는 `typeparams`라는 선택적 속성을 포함하도록 수정됩니다.

### 지연 평가 (Lazy Evaluation)

이 PEP는 `TypeVar` 경계, `TypeVar` 제약 및 타입 별칭의 값을 나타내는 표현식이 나타날 수 있는 세 가지 새로운 컨텍스트를 도입합니다. 이러한 표현식은 아직 정의되지 않은 이름에 대한 참조를 포함할 수 있습니다. PEP 563 및 PEP 649와 유사하게, 이러한 표현식은 런타임 오류를 방지하기 위해 지연 평가(lazy evaluation)를 사용합니다. 각 표현식은 코드 객체로 저장되며, 해당 속성(`TypeVar.__bound__`, `TypeVar.__constraints__`, `TypeAlias.__value__`)이 접근될 때만 평가됩니다.

### 스코프 동작 (Scoping Behavior)

새로운 구문은 기존 Python 스코프와 다르게 동작하는 새로운 종류의 스코프를 필요로 합니다. 새로운 스코프는 함수 스코프와 유사하게 동작하지만, 몇 가지 사소한 차이점이 있습니다. 특히, 클래스 스코프 내에 즉시 위치하는 경우, 클래스 스코프에 정의된 이름에 접근할 수 있습니다.

### 라이브러리 변경 (Library Changes)

`typing` 모듈의 여러 클래스(`TypeVar`, `TypeVarTuple`, `ParamSpec`, `Generic` 및 새로운 `TypeAliasType`)는 C로 부분적으로 구현되어야 합니다.

## 참조 구현 (Reference Implementation)

이 제안은 CPython PR #103764에서 프로토타입으로 구현되었습니다. Pyright 타입 검사기는 이 PEP에 설명된 동작을 지원합니다.

## 거부된 아이디어 (Rejected Ideas)

### 접두사 절 (Prefix Clause)

`def` 및 `class` 문 앞에 타입 매개변수를 지정하는 다양한 구문 옵션이 탐색되었으나, 스코핑 규칙이 불분명하고 데코레이터와 잘 작동하지 않아 거부되었습니다.

### 꺽쇠 괄호 (Angle Brackets)

다른 많은 언어에서 제네릭에 꺽쇠 괄호(`<>`)를 사용하지만, Python에서는 라인 브레이크 처리 문제와 `list[int]`와 같이 명시적인 특수화에 이미 대괄호(`[]`)를 사용하는 기존 관행과의 불일치 때문에 거부되었습니다.

### 경계 구문 (Bounds Syntax)

`Scala`의 `<:` 토큰, `extends` 또는 `with` 키워드, `typing.TypeVar` 생성자와 유사한 함수 호출 구문 등 다양한 경계 및 제약 구문이 고려되었으나, 단순한 콜론(`:`) 구문이 다른 많은 프로그래밍 언어와 일치하고 설문조사에서 Python 개발자들에게 크게 선호되어 채택되었습니다.

### 명시적 분산 (Explicit Variance)

타입 매개변수가 `invariant`, `covariant`, `contravariant` 중 무엇인지 명시적으로 지정하는 구문을 추가하는 것이 고려되었으나, 분산은 일반적으로 추론될 수 있으며 대부분의 현대 프로그래밍 언어가 사용법을 기반으로 분산을 추론하기 때문에 거부되었습니다.

### 이름 변환 (Name Mangling)

각 타입 매개변수에 컴파일러가 고유한 "변환된(mangled)" 이름을 부여하는 접근 방식이 고려되었으나, 정규화된 이름이 반드시 고유하지 않다는 문제와 따옴표로 묶인 (전방 참조) 타입 어노테이션을 평가하는 기술과 호환되지 않는다는 문제로 거부되었습니다.

## 부록 A: 타입 매개변수 구문 조사 (Appendix A: Survey of Type Parameter Syntax)

이 섹션에서는 제네릭 타입을 지원하는 다른 인기 있는 프로그래밍 언어에서 사용되는 옵션에 대한 조사를 제공합니다.

다음은 다양한 언어의 타입 매개변수 구문 요약입니다.

| 언어            | 선언 구문 | 상한선     | 하한선    | 기본값 | 분산 사이트 | 분산             |
| :-------------- | :-------- | :--------- | :-------- | :----- | :---------- | :--------------- |
| **C++**         | `template <>` | n/a        | n/a       | `=`    | n/a         | n/a              |
| **Java**        | `<>`      | `extends`  | `super`   | n/a    | 사용 (use)  | `super`, `extends` |
| **C#**          | `<>`      | `where`    | n/a       | n/a    | 선언 (decl) | `in`, `out`      |
| **TypeScript**  | `<>`      | `extends`  | n/a       | `=`    | 선언 (decl) | 추론, `in`, `out` |
| **Scala**       | `[]`      | `T <: X`   | `T >: X`  | n/a    | 사용, 선언  | `+`, `-`         |
| **Swift**       | `<>`      | `T: X`     | n/a       | n/a    | n/a         | n/a              |
| **Rust**        | `<>`      | `T: X`, `where` | n/a    | `=`    | n/a         | n/a              |
| **Kotlin**      | `<>`      | `T: X`, `where` | n/a    | n/a    | 사용, 선언  | `in`, `out`      |
| **Julia**       | `{}`      | `T <: X`   | `X <: T`  | n/a    | n/a         | n/a              |
| **Dart**        | `<>`      | `extends`  | n/a       | n/a    | 선언 (decl) | `in`, `out`, `inout` |
| **Go**          | `[]`      | `T X`      | n/a       | n/a    | n/a         | n/a              |
| **Python (제안)** | `[]`      | `T: X`     | n/a       | n/a    | 선언 (decl) | 추론             |

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.