---
title: "[Deferred] PEP 3150 - Statement local namespaces (aka “given” clause)"
excerpt: "Python Enhancement Proposal 3150: 'Statement local namespaces (aka “given” clause)'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3150/
toc: true
toc_sticky: true
date: 2025-09-27 14:40:31+0900
last_modified_at: 2025-09-27 14:40:31+0900
published: true
---
> **원문 링크:** [PEP 3150 - Statement local namespaces (aka “given” clause)](https://peps.python.org/pep-3150/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 09-Jul-2010

다음은 PEP 3150 문서의 내용을 한국어로 번역하고 정리한 것입니다.

# PEP 3150 – Statement local namespaces (일명 "given" 절)

*   **작성자:** Alyssa Coghlan
*   **상태:** Deferred (보류됨)
*   **유형:** Standards Track
*   **생성일:** 2010년 7월 9일
*   **Python 버전:** 3.4

## 개요 (Abstract)

이 PEP는 현재 연관된 코드 스위트(code suite)가 없는 여러 Python 문장에 선택적 `given` 절을 추가할 것을 제안합니다. 이 절은 연관된 문장 내에서 접근 가능하지만, 포함하는 네임스페이스(namespace)의 일부가 되지 않는 추가적인 이름들을 위한 문장 로컬 네임스페이스(statement local namespace)를 생성합니다.

연관된 코드 스위트 실행을 통해 생성된 네임스페이스에 대한 전방 참조(forward reference)를 나타내기 위해 새로운 기호인 `?`를 도입할 것을 제안합니다. 이 `?`는 `types.SimpleNamespace` 객체에 대한 참조가 될 것입니다.

## 제안 배경 (Motivation)

주된 동기는 보다 선언적인 프로그래밍 스타일(declarative style of programming)을 가능하게 하는 것입니다. 이는 수행될 연산을 독자에게 먼저 제시하고, 필요한 하위 계산(subcalculations)의 세부 사항을 들여쓰기된 스위트(indented suite)에 제시하는 방식입니다. 예를 들어, 일반 할당 문장(assignment statement)을 `class` 및 `def` 문장과 동등하게 만들어, 정의될 항목의 이름이 해당 항목의 값이 계산되는 방식에 대한 세부 사항보다 먼저 독자에게 제시될 수 있도록 합니다. 또한, 이름이 현재 표현식에서만 플레이스홀더(placeholder)로 사용된 다음 이어지는 스위트에서 정의되는 "다중 라인 람다(multi-line lambda)" 방식으로 이름 있는 함수를 사용할 수 있게 합니다.

두 번째 동기는 모듈(module) 및 클래스(class) 수준 코드에서 중간 계산(interim calculations)을 단순화하면서도 결과 네임스페이스를 오염시키지 않는 것입니다.

이 `given` 절과 특정 연산을 수행하는 별도의 함수 정의 간의 관계는, 명시적인 `while` 루프와 동일한 연산 시퀀스를 생성하는 제너레이터(Generator) 간의 기존 관계와 유사하게 의도됩니다.

## 제안 (Proposal)

이 PEP는 표현식을 포함하거나 순전히 문법적 목적으로 그러한 문장을 대체할 수 있는 단순 문장(simple statements)의 구문에 선택적 `given` 절을 추가할 것을 제안합니다. 이 추가의 영향을 받는 단순 문장 목록은 다음과 같습니다:

*   `expression statement` (표현식 문장)
*   `assignment statement` (할당 문장)
*   `augmented assignment statement` (증강 할당 문장)
*   `del statement` (`del` 문장)
*   `return statement` (`return` 문장)
*   `yield statement` (`yield` 문장)
*   `raise statement` (`raise` 문장)
*   `assert statement` (`assert` 문장)
*   `pass statement` (`pass` 문장)

`given` 절은 헤더 라인에서 하위 표현식(subexpressions)을 이름으로 참조할 수 있게 하며, 실제 정의는 들여쓰기된 절에 이어집니다. 간단한 예시는 다음과 같습니다:

```python
sorted_data = sorted(data, key=?.sort_key)
given:
    def sort_key(item):
        return item.attr1, item.attr2
```
새로운 기호 `?`는 `given` 네임스페이스를 참조하는 데 사용됩니다. 이는 `types.SimpleNamespace` 인스턴스가 되므로, `?.sort_key`는 `given` 절에 정의된 이름에 대한 전방 참조로 작동합니다.

`given` 절에는 독스트링(docstring)이 허용되며, 결과 네임스페이스의 `__doc__` 속성으로 첨부됩니다.

### 의미론 (Semantics)

다음 문장:

```python
op(?.f, ?.g)
given bound_a=a, bound_b=b in:
    def f():
        return bound_a + bound_b
    def g():
        return bound_a - bound_b
```
은 대략 다음 코드와 동일하게 작동합니다:

```python
__arg1 = a
__arg2 = b
def __scope(bound_a, bound_b):
    def f():
        return bound_a + bound_b
    def g():
        return bound_a - bound_b
    return types.SimpleNamespace(**locals())
__ref = __scope(__arg1, __arg2)
__ref.__doc__ = __scope.__doc__
op(__ref.f, __ref.g)
```

`given` 절은 본질적으로 생성된 다음 즉시 실행되는 중첩 함수(nested function)입니다. 명시적으로 전달되지 않는 한, 이름은 일반적인 스코핑 규칙(scoping rules)을 사용하여 조회되며, 따라서 클래스 스코프(class scope)에 정의된 이름은 보이지 않습니다. 전방 참조로 선언된 이름은 반환되어 헤더 문장에서 사용되며, 주변 네임스페이스에 로컬로 바인딩되지 않습니다.

### 문법 변경 (Syntax Change)

제안된 문법 변경은 `given_clause`를 여러 단순 문장에 선택적으로 추가합니다.

새로운 `given_clause`의 정의:
```
given_clause: "given" [(NAME '=' test)+ "in"]":" suite
```

이러한 변경은 문법적 모호성을 피하기 위해 기존 문장의 선택적 요소로 추가됩니다. 그러나 `simple_stmt` 정의와 관련하여 문제가 발생할 수 있으며, 이는 문법의 비 trivial한 재구조화를 필요로 할 수 있다고 언급됩니다.

### 새로운 PEP 8 가이드라인 (New PEP 8 Guidelines)

`python-ideas`에서 논의된 바와 같이, 일반 변수 할당 대신 `given` 절을 언제 사용해야 하는지에 대한 적절한 지침을 제공하기 위해 새로운 PEP 8 가이드라인이 개발되어야 합니다. PEP는 PEP 8의 "프로그래밍 컨벤션(Programming Conventions)" 섹션에 다음과 같은 추가를 제안합니다:

*   별도의 함수로 합리적으로 분리될 수 있지만 현재 재사용되지 않는 코드의 경우, `given` 절 사용을 고려해야 합니다. 이는 어떤 변수들이 알고리즘 또는 애플리케이션 상태를 유지하기보다는 다른 문장의 하위 구성 요소를 정의하는 데만 사용되는지를 명확하게 보여줍니다. 이는 호출 가능한 인수를 취하는 연산에 다중 라인 함수를 전달할 때 특히 유용한 기술입니다.
*   `given` 절은 간결하게 유지해야 합니다. 복잡해지면 여러 단계로 나누거나 세부 사항을 별도의 함수로 옮겨야 합니다.

## 설계 논의 (Design Discussion)

### 키워드 선택 (Keyword Choice)

이 제안은 처음에는 Haskell의 유사한 구문 이름을 기반으로 `where`를 사용했습니다. 그러나 NumPy와 같은 기존 Python 라이브러리에서 SQL 쿼리 조건의 의미로 이미 `where`를 사용하고 있어 혼란을 야기할 수 있다는 지적이 있었습니다.

`given`은 변수 이름으로도 사용될 수 있지만 (따라서 새로운 키워드 도입을 위한 일반적인 `__future__` 절차에 따라 사용이 중단될 수 있음), 새로운 절에 대한 "여기에 이 표현식이 사용할 수 있는 추가 변수들이 있습니다"라는 의미와 훨씬 더 강하게 연관됩니다.

`with` 키워드를 재사용하는 것도 제안되었지만, `with` 절과 `with` 문장이 비슷하게 보이지만 완전히 다른 작업을 수행하므로 혼란의 가능성이 높다고 지적되었습니다.

### PEP 403과의 관계 (Relation to PEP 403)

PEP 403 (`General Purpose Decorator Clause`)은 기존 데코레이터(decorator) 문법에서 영감을 받은 덜 급진적인 언어 변경을 통해 이 PEP의 주요 목표를 달성하려고 시도합니다.

두 PEP는 동일한 저자임에도 불구하고 서로 직접 경쟁 관계에 있습니다. PEP 403은 현 상태에서 최소한의 변경으로 유용한 기능을 달성하려는 미니멀리스트적 접근 방식을 대표합니다. 반면 이 PEP는 언어에 더 큰 변경을 요구하는 더 유연한 독립형 문장 설계를 목표로 합니다.

PEP 403이 제너레이터 표현식(generator expressions)의 동작을 더 잘 설명하는 데 적합한 반면, 이 PEP는 일반적으로 데코레이터 절의 동작을 설명하는 데 더 적합합니다. 두 PEP 모두 컨테이너 컴프리헨션(container comprehensions)의 의미론에 대한 적절한 설명을 지원합니다.

### 컨테이너 컴프리헨션 및 제너레이터 표현식 설명 (Explaining Container Comprehensions and Generator Expressions)

제안된 `given` 구문은 컨테이너 컴프리헨션의 스코핑(scoping) 및 실행 순서 의미론을 설명하는 데 원시적인 형태로 사용될 수 있습니다.

```python
seq2 = [x for x in y if q(x) for y in seq if p(y)]
# 대략적으로 다음과 동일
seq2 = ?.result
given seq=seq:
    result = []
    for y in seq:
        if p(y):
            for x in y:
                if q(x):
                    result.append(x)
```
이 확장에서 중요한 점은 컴프리헨션이 클래스 스코프에서 오작동하는 것처럼 보이는 이유를 설명한다는 것입니다: 가장 바깥쪽 이터레이터(iterator)만 클래스 스코프에서 평가되고, 모든 조건자(predicates), 중첩된 이터레이터 및 값 표현식은 중첩된 스코프 내에서 평가됩니다.

### 데코레이터 절 평가 및 적용 설명 (Explaining Decorator Clause Evaluation and Application)

데코레이터 절의 평가 및 적용에 대한 표준 설명은 실행 순서 단계를 보여주기 위해 숨겨진 컴파일러 변수(hidden compiler variables) 개념을 다루어야 합니다. `given` 문장을 사용하면 다음과 같은 데코레이트된 함수 정의를:

```python
@classmethod
def classname(cls):
    return cls.__name__
```
대략 다음과 같이 설명할 수 있습니다:

```python
classname = ?.d1(classname)
given:
    d1 = classmethod
    def classname(cls):
        return cls.__name__
```

## 예상되는 반대 의견 (Anticipated Objections)

### 두 가지 방법 (Two Ways To Do It)

많은 코드가 이제 값을 사용하기 전에 정의하거나 `given` 절에서 나중에 정의할 수 있게 되어, 두 가지 방법이 생기고, 그 중 어느 것을 선택해야 할지 명확한 방법이 없을 수 있습니다.

이 PEP는 이것이 "하나의 명확한 방법(one obvious way)"이라는 격언의 잘못된 적용이라고 주장합니다. Python은 이미 코드를 작성하는 여러 방법을 제공하며, 언어는 사람들이 생각하는 방식에 맞춰 코드를 작성할 수 있도록 설계되었습니다. 이러한 스타일 질문은 코드베이스를 담당하는 개발 그룹에 맡겨져야 합니다. 그러나 CPython 및 표준 라이브러리를 위한 명시적인 PEP 8 지침이 필요할 것입니다.

### 순서가 뒤바뀐 실행 (Out of Order Execution)

`given` 절은 `given` 절의 본문이 절 헤더의 단순 문장보다 먼저 실행되므로 실행이 다소 이상하게 왔다 갔다 합니다. Python의 다른 부분 중 가장 유사한 것은 리스트 컴프리헨션, 제너레이터 표현식 및 조건 표현식에서의 순서가 뒤바뀐 평가(out of order evaluation)와 데코레이터 함수의 지연된 적용(delayed application)입니다.

이것이 사실이지만, 이 문법은 사람들이 문제를 (언어의 관점에서 볼 때) 순서 없이 생각하는 경우를 위한 것입니다. 예를 들어, "이 시퀀스의 항목들을 각 항목의 `attr1`과 `attr2` 값에 따라 정렬하고 싶다"는 생각을 Python 사용자가 다음과 같이 표현할 수 있게 합니다:

```python
sorted_list = sorted(original, key=?.key)
given:
    def key(item):
        return item.attr1, item.attr2
```
이는 사용자가 원래 생각한 순서와 동일하며, 정렬 기준에 대한 이름을 따로 만들 필요 없이 키워드 인수 이름을 직접 재사용할 수 있습니다.

### 인트로스펙션(Introspection)에 해로움 (Harmful to Introspection)

모듈(module) 및 클래스(class) 내부를 조사하는 것은 화이트박스 테스트(white-box testing) 및 인터랙티브 디버깅(interactive debugging)에 매우 유용한 도구입니다. `given` 절은 계산 중에 사용되는 임시 상태(temporary state)에 대한 접근을 상당히 효과적으로 방지할 것입니다.

이는 타당한 우려이지만, 테스트 가능성(testability)을 위한 설계는 프로그래밍의 여러 측면에 걸쳐 있는 문제입니다. 구성 요소가 독립적으로 테스트되어야 하는 경우, `given` 문장은 정보가 테스트 스위트에 노출되도록 별도의 문장으로 리팩토링(refactored)되어야 합니다. 이는 함수나 제너레이터 내부에 숨겨진 연산을 단순히 독립적으로 테스트하기 위해 별도의 함수로 리팩토링하는 것과 크게 다르지 않습니다.

### 실제 영향 평가 부족 (Lack of Real World Impact Assessment)

현재 PEP의 예시는 거의 모두 비교적 작은 "장난감(toy)" 예시입니다. 이 PEP의 제안은 실제 코드의 가독성이 진정으로 향상되는 예시를 찾기 위해 대규모 코드베이스 (예: 표준 라이브러리 또는 대규모 Twisted 애플리케이션)에 적용되는 테스트를 거쳐야 합니다.

## 미해결 질문 (Open Questions)

### 전방 참조를 위한 문법 (Syntax for Forward References)

`?` 기호는 짧고 현재 사용되지 않으며 "여기에 나중에 채워질 무언가가 누락되어 있다"는 것을 암시하기 때문에 `given` 네임스페이스에 대한 전방 참조에 제안되었습니다. 이 제안은 기존 Python 기능과 깔끔하게 일치하지 않으므로 이미 사용 중인 기호 재사용은 의도적으로 피했습니다.

### `nonlocal` 및 `global` 처리 (Handling of nonlocal and global)

`nonlocal` 및 `global`은 `given` 절 스위트 내에서 명시적으로 허용되지 않으며, 발생 시 문법 오류가 될 것입니다. 해당 스위트 내의 `def` 문장 내에 나타나면 정상적으로 작동합니다.

### `break` 및 `continue` 처리 (Handling of break and continue)

`break` 및 `continue`는 익명 함수(anonymous functions)가 위 확장과 같이 정의된 것처럼 작동할 것입니다. `given` 절 스위트 내에 나타나면 문법 오류가 되지만, 해당 스위트의 일부로 `for` 또는 `while` 루프 내에 나타나면 정상적으로 작동합니다.

### `return` 및 `yield` 처리 (Handling of return and yield)

`return` 및 `yield`는 `given` 절 스위트 내에서 명시적으로 허용되지 않으며, 발생 시 문법 오류가 될 것입니다. 해당 스위트 내의 `def` 문장 내에 나타나면 정상적으로 작동합니다.

## 예시 (Examples)

### 이벤트 기반 프로그래밍을 위한 콜백 정의 (Defining callbacks for event driven programming)

```python
# 기존 Python
def cb(sock):
    # 소켓으로 뭔가 처리
def eb(exc):
    logging.exception(
        "Failed connecting to %s:%s", host, port)
loop.create_connection((host, port), cb, eb)

# becomes:
loop.create_connection((host, port), ?.cb, ?.eb)
given:
    def cb(sock):
        # 소켓으로 뭔가 처리
    def eb(exc):
        logging.exception(
            "Failed connecting to %s:%s", host, port)
```

### 일반적으로 단일 인스턴스만 갖는 "일회성" 클래스 정의 (Defining “one-off” classes which typically only have a single instance)

```python
# becomes:
public_name = ?.MeaningfulClassName(*params)
given:
    class MeaningfulClassName():
        ... # 여러 라인
```

### 로컬 네임스페이스를 오염시키지 않고 속성 계산 (Calculating attributes without polluting the local namespace)

```python
# 기존 Python (수동 네임스페이스 정리)
def _createenviron():
    ... # 27라인 함수
environ = _createenviron()
del _createenviron

# becomes:
environ = ?._createenviron()
given:
    def _createenviron():
        ... # 27라인 함수
```

### 기본 인수 해킹(default argument hack) 대체 (Replacing default argument hack)

```python
# becomes:
return ?.decorating_function
given:
    # Cell 변수이지 locals는 아니지만, 유사한 속도 향상 제공
    tuple, sorted, len, KeyError = tuple, sorted, len, KeyError
    def decorating_function(user_function):
        ... # 60라인 함수
```

## 거부된 대안 (Rejected Alternatives)

이 PEP의 이전 버전은 후행 스위트(trailing suite)의 이름에 대한 암묵적인 전방 참조와 암묵적인 조기 바인딩(early binding) 의미론을 허용했습니다. 이 두 아이디어 모두 표현력의 충분한 증가 없이 제안을 상당히 복잡하게 만들었습니다. 명시적 전방 참조와 조기 바인딩을 가진 현재 제안은 새로운 구문을 기존 스코핑 의미론에 맞추어, 아이디어가 실제로 구현될 가능성을 크게 높였습니다.

두 스위트 "순서대로(in-order)" 변형에 대한 제안도 있었는데, 이는 순서가 뒤바뀐 실행을 지원하지 않고 이름의 제한된 스코핑을 제공합니다. 그러나 이러한 제안은 사람들이 다중 라인 람다 지원을 요청할 때 불평하는 요점, 즉 하위 표현식의 이름을 정하는 것이 특히 어렵다는 것이 아니라, 사용하는 문장보다 먼저 함수의 이름을 정하는 것이 개발자가 문제를 생각하는 방식과 코드가 일치하지 않게 만든다는 점을 놓치고 있다고 PEP는 주장합니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.