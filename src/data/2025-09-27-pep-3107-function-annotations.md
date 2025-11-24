---
title: "[Final] PEP 3107 - Function Annotations"
excerpt: "Python Enhancement Proposal 3107: 'Function Annotations'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3107/
toc: true
toc_sticky: true
date: 2025-09-27 14:19:43+0900
last_modified_at: 2025-09-27 14:19:43+0900
published: true
---
> **원문 링크:** [PEP 3107 - Function Annotations](https://peps.python.org/pep-3107/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 02-Dec-2006

# PEP 3107 – 함수 Annotation (Function Annotations) 번역 및 설명

이 문서는 Python Enhancement Proposal (PEP) 3107의 내용을 한국어 사용자가 이해하기 쉽도록 번역하고 설명합니다. 이 PEP는 Python 함수에 임의의 메타데이터 Annotation을 추가하는 문법을 소개합니다.

## 개요 (Abstract)

이 PEP는 Python 함수에 임의의 메타데이터 Annotation을 추가하기 위한 문법을 도입합니다.

## 도입 배경 (Rationale)

Python 2.x 버전에서는 함수의 매개변수와 반환 값에 Annotation을 추가하는 표준적인 방법이 없었기 때문에, 이 공백을 메우기 위한 다양한 도구와 라이브러리가 등장했습니다. 일부는 PEP 318에서 소개된 데코레이터를 활용했고, 다른 일부는 함수의 docstring을 파싱하여 Annotation을 찾았습니다.

이 PEP는 이러한 정보를 지정하는 단일하고 표준적인 방법을 제공하여, 지금까지 존재했던 메커니즘과 문법의 광범위한 변화로 인해 발생했던 혼란을 줄이는 것을 목표로 합니다.

## 함수 Annotation의 기본 원리 (Fundamentals of Function Annotations)

Python 3.0의 함수 Annotation에 대한 세부 사항을 논의하기 전에, Annotation이 무엇이고 무엇이 아닌지에 대해 폭넓게 이야기해 봅시다.

1.  **완전한 선택 사항 (Completely Optional)**: 매개변수와 반환 값 모두에 대한 함수 Annotation은 전적으로 선택 사항입니다.
2.  **임의의 Python 표현식 (Arbitrary Python Expressions)**: 함수 Annotation은 컴파일 시점에 함수의 다양한 부분에 임의의 Python 표현식을 연결하는 방법일 뿐입니다.
3.  **Python 자체의 의미 없음 (No Intrinsic Meaning to Python)**: Python 자체는 Annotation에 특별한 의미나 중요성을 부여하지 않습니다. Python은 단순히 아래 "함수 Annotation 접근하기 (Accessing Function Annotations)" 섹션에서 설명하는 대로 이러한 표현식을 사용할 수 있도록 제공할 뿐입니다.
4.  **타사 라이브러리에 의해 해석 (Interpreted by Third-Party Libraries)**: Annotation이 의미를 가지는 유일한 방법은 타사 라이브러리에 의해 해석될 때입니다. 이 Annotation을 사용하는 라이브러리는 함수의 Annotation으로 원하는 모든 작업을 수행할 수 있습니다.

    *   **예시 1: 도움말 메시지 제공**
        예를 들어, 한 라이브러리는 문자열 기반 Annotation을 사용하여 다음과 같이 개선된 도움말 메시지를 제공할 수 있습니다.
        ```python
        def compile(source: "something compilable", filename: "where the compilable thing comes from", mode: "is this a single statement or a suite?"):
            ...
        ```
    *   **예시 2: 타입 검사 (Type Checking)**
        다른 라이브러리는 Python 함수 및 메서드에 대한 타입 검사를 제공하는 데 사용될 수 있습니다. 이 라이브러리는 Annotation을 사용하여 함수의 예상 입력 및 반환 타입을 나타낼 수 있으며, 다음과 같을 수 있습니다.
        ```python
        def haul(item: Haulable, *vargs: PackAnimal) -> Distance:
            ...
        ```
        그러나 첫 번째 예시의 문자열이나 두 번째 예시의 타입 정보는 그 자체로는 아무런 *의미가 없습니다*. 의미는 오직 타사의 Annotation 처리 라이브러리에서만 나옵니다.

5.  **표준 의미론 없음 (No Standard Semantics)**: 2번 항목에 따라, 이 PEP는 내장 타입에 대해서도 어떤 종류의 표준 의미론도 도입하려고 시도하지 않습니다. 이 작업은 타사 라이브러리에 맡겨질 것입니다.

## 문법 (Syntax)

### 매개변수 (Parameters)

매개변수에 대한 Annotation은 매개변수 이름 뒤에 오는 선택적 표현식의 형태를 취합니다.

```python
def foo(a: expression, b: expression = 5):
    ...
```

의사 문법(pseudo-grammar)에서 매개변수는 이제 `identifier [: expression] [= expression]` 형태를 가집니다. 즉, Annotation은 항상 매개변수의 기본값보다 먼저 오며, Annotation과 기본값은 모두 선택 사항입니다. 기본값을 나타내는 데 등호(`=`)가 사용되는 것과 마찬가지로, 콜론(`:`)은 Annotation을 표시하는 데 사용됩니다. 모든 Annotation 표현식은 기본값과 마찬가지로 함수 정의가 실행될 때 평가됩니다.

가변 매개변수 (즉, `*args` 및 `**kwargs`)에 대한 Annotation도 유사하게 표시됩니다.

```python
def foo(*args: expression, **kwargs: expression):
    ...
```

중첩된 매개변수(Nested parameters)의 Annotation은 항상 마지막 괄호가 아니라 매개변수 이름 뒤에 옵니다. 중첩된 매개변수의 모든 매개변수에 Annotation을 다는 것은 필수가 아닙니다.

```python
def foo((x1, y1: expression), (x2: expression, y2: expression)=(None, None)):
    ...
```

### 반환 값 (Return Values)

지금까지의 예시에서는 함수의 반환 값 타입을 Annotation하는 방법을 생략했습니다. 이는 다음과 같이 수행됩니다.

```python
def sum() -> expression:
    ...
```

즉, 매개변수 목록 뒤에 리터럴 `->`와 Python 표현식이 올 수 있습니다. 매개변수 Annotation과 마찬가지로, 이 표현식은 함수 정의가 실행될 때 평가됩니다.

함수 정의를 위한 문법은 이제 다음과 같습니다:

```
decorator: '@' dotted_name [ '(' [arglist] ')' ] NEWLINE
decorators: decorator+
funcdef: [decorators] 'def' NAME parameters ['->' test] ':' suite
parameters: '(' [typedargslist] ')'
typedargslist: ((tfpdef ['=' test] ',')* ('*' [tname] (',' tname ['=' test])* [',' '**' tname] | '**' tname) | tfpdef ['=' test] (',' tfpdef ['=' test])* [','])
tname: NAME [':' test]
tfpdef: tname | '(' tfplist ')'
tfplist: tfpdef (',' tfpdef)* [',']
```

### Lambda 함수 (Lambda)

`lambda` 함수의 문법은 Annotation을 지원하지 않습니다. 매개변수 목록을 괄호로 묶도록 요구함으로써 `lambda`의 문법을 변경하여 Annotation을 지원할 수 있었지만, 다음과 같은 이유로 이러한 변경을 하지 않기로 결정되었습니다:

*   호환되지 않는 변경이 될 것입니다.
*   `lambda`는 어차피 "중성화(neutered)"되어 있습니다. (기능이 제한적이라는 의미)
*   `lambda`는 항상 일반 함수로 변경할 수 있습니다.

## 함수 Annotation 접근하기 (Accessing Function Annotations)

컴파일되면 함수의 Annotation은 함수의 `__annotations__` 속성을 통해 사용할 수 있습니다. 이 속성은 매개변수 이름을 평가된 Annotation 표현식을 나타내는 객체에 매핑하는 변경 가능한(mutable) 딕셔너리입니다.

`__annotations__` 매핑에는 `"return"`이라는 특별한 키가 있습니다. 이 키는 함수의 반환 값에 대한 Annotation이 제공된 경우에만 존재합니다.

예를 들어, 다음 Annotation은:

```python
def foo(a: 'x', b: 5 + 6, c: list) -> max(2, 9):
    ...
```

다음과 같은 `__annotations__` 매핑을 생성합니다:

```python
{'a': 'x', 'b': 11, 'c': list, 'return': 9}
```

`"return"` 키는 매개변수 이름과 충돌할 수 없기 때문에 선택되었습니다. `return`을 매개변수 이름으로 사용하려고 하면 `SyntaxError`가 발생합니다.

함수에 Annotation이 없거나 `lambda` 표현식으로 함수가 생성된 경우 `__annotations__`는 비어 있는 변경 가능한 딕셔너리입니다.

## 사용 사례 (Use Cases)

Annotation을 논의하는 과정에서 여러 사용 사례가 제시되었습니다. 이들 중 일부는 전달하는 정보의 종류에 따라 그룹화되어 여기에 제시됩니다. Annotation을 활용할 수 있는 기존 제품 및 패키지의 예시도 포함되어 있습니다.

### 타입 정보 제공 (Providing typing information)

*   타입 검사 ()
*   IDE가 함수가 예상하는 타입과 반환하는 타입을 표시하도록 함 ()
*   함수 오버로딩 (Function overloading) / 제네릭 함수 (Generic functions) ()
*   외국어 브리지 (Foreign-language bridges) ()
*   어댑테이션 (Adaptation) ()
*   술어 논리 함수 (Predicate logic functions)
*   데이터베이스 쿼리 매핑 (Database query mapping)
*   RPC 매개변수 마샬링 (RPC parameter marshaling) ()

### 기타 정보 (Other information)

*   매개변수 및 반환 값에 대한 문서화 ()

## 표준 라이브러리 (Standard Library)

### `pydoc` 및 `inspect`

`pydoc` 모듈은 함수의 도움말을 표시할 때 함수 Annotation을 보여주어야 합니다. `inspect` 모듈은 Annotation을 지원하도록 변경되어야 합니다.

## 다른 PEP와의 관계 (Relation to Other PEPs)

### 함수 시그니처 객체 (PEP 362) (Function Signature Objects (PEP 362))

함수 시그니처 객체는 함수의 Annotation을 노출해야 합니다. `Parameter` 객체가 변경되거나 다른 변경이 필요할 수 있습니다.

## 구현 (Implementation)

참조 구현은 리비전 53170으로 py3k (이전에는 "p3yk") 브랜치에 체크인되었습니다.

## 거부된 제안 (Rejected Proposals)

BDFL(Benevolent Dictator For Life, 자비로운 종신 독재자 - 당시 귀도 반 로섬)은 제너레이터에 Annotation을 추가하기 위한 특별한 문법에 대한 저자의 아이디어를 "너무 추하다"고 하여 거부했습니다. 초기에 논의되었음에도 불구하고 (), 제너레이터 함수 및 고차 함수를 Annotation하기 위한 특별한 객체를 표준 라이브러리에 포함하는 것은 궁극적으로 타사 라이브러리에 더 적합하다고 판단되어 거부되었습니다. 이를 표준 라이브러리에 포함하는 것은 너무 많은 까다로운 문제를 야기했습니다. 표준 타입 매개변수화 문법에 대한 상당한 논의에도 불구하고, 이 또한 타사 라이브러리에 맡겨야 한다고 결정되었습니다 (). 더 많은 논의에도 불구하고, Annotation 상호 운용성을 위한 메커니즘을 표준화하지 않기로 결정되었습니다. 이 시점에서 상호 운용성 규칙을 표준화하는 것은 시기상조였습니다. 우리는 모든 사용자를 어떤 인위적인 계획에 강요하기보다는, 실제 사용과 필요에 따라 이러한 규칙이 자연스럽게 발전하도록 두는 것을 선호했습니다 ().

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.
```

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.