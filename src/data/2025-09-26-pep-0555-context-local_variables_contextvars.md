---
title: "[Withdrawn] PEP 555 - Context-local variables (contextvars)"
excerpt: "Python Enhancement Proposal 555: 'Context-local variables (contextvars)'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/555/
toc: true
toc_sticky: true
date: 2025-09-26 23:40:56+0900
last_modified_at: 2025-09-26 23:40:56+0900
published: true
---
> **원문 링크:** [PEP 555 - Context-local variables (contextvars)](https://peps.python.org/pep-0555/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 06-Sep-2017



# PEP 555: Context-local variables (contextvars) (컨텍스트-로컬 변수)

*   **작성자**: Koos Zevenhoven
*   **상태**: 철회됨 (Withdrawn)
*   **유형**: 표준 트랙 (Standards Track)
*   **생성일**: 2017년 9월 6일
*   **Python 버전**: 3.7
*   **사후 변경 이력**: 2017년 9월 6일

## 개요 (Abstract)

특별한 경우에, 코드는 함수 호출 체인을 따라 하위 호출자(callees)에게 명시적으로 인자를 전달하지 않고도 정보를 전달하기를 원할 때가 있습니다. 이 제안은 특정 컨텍스트 변수(context variable)에 주어진 값이 할당된 컨텍스트 안팎으로 코드가 명시적으로 전환될 수 있도록 하는 구조를 설명합니다.

이것은 전통적인 단일 스레드(또는 스레드-안전하지 않은) 코드의 전역 변수(global variables)나 전통적인 동시성-안전하지 않은 코드(단일 또는 다중 스레드)의 스레드-로컬 저장소(thread-local storage)와 같은 것들의 일부 사용에 대한 현대적인 대안입니다. 특히, 제안된 메커니즘은 비동기적으로 실행되는 코루틴(coroutines)과 같은 최신 동시성 실행 메커니즘에서도 사용할 수 있으며, 이때 동시적으로 실행되는 호출 체인들이 서로의 컨텍스트에 간섭하지 않습니다.

"호출 체인"은 일반 함수, `await`된 코루틴, 또는 제너레이터(generators)로 구성될 수 있습니다. 컨텍스트 변수 스코프(scope)의 의미론은 모든 경우에 동일하며, 컨텍스트 변수의 의미론에 영향을 주지 않고 코드를 서브루틴(여기서는 함수, 하위 제너레이터 또는 하위 코루틴을 의미)으로 자유롭게 리팩토링(refactoring)할 수 있습니다. 구현과 관련하여, 이 제안은 CPython 인터프리터 및 다른 Python 인터프리터에 대한 단순성과 최소한의 변경을 목표로 합니다.

## 배경 (Rationale)

이 제안에서 "호출 체인" 또는 "호출 트리"는 일반 함수 호출, `await` 또는 `yield from`을 사용하는 표현식 등 가능한 모든 조합을 사용하여 서브루틴이 체인(중첩)으로 실행되는 것을 의미합니다.

때때로 호출 체인을 따라 필요한 정보를 인자로 전달하는 것은 필요한 함수 시그니처(signature)를 상당히 복잡하게 만들거나, 실제로는 불가능할 수도 있습니다. 이러한 경우, 이 정보를 저장할 다른 장소를 찾을 수 있습니다. 몇 가지 역사적인 예시를 살펴보겠습니다.

가장 순진한(naive) 옵션은 값을 전역 변수(global variable) 또는 유사한 곳에 할당하여 호출 체인 아래의 코드가 접근할 수 있도록 하는 것입니다. 그러나 이는 코드를 즉시 스레드-안전하지 않게 만듭니다. 여러 스레드가 있을 때 모든 스레드가 동일한 전역 변수에 할당하며, 다른 스레드가 호출 체인의 어느 지점에서든 간섭할 수 있기 때문입니다.

약간 덜 순진한 옵션은 정보를 스레드-로컬 저장소(thread-local storage)에 스레드별(per-thread) 정보로 저장하는 것입니다. 여기서 각 스레드는 다른 스레드가 간섭할 수 없는 변수의 "자신만의 복사본"을 가집니다. 이것이 비록 이상적이지는 않지만, 많은 경우에 최선의 해결책이었습니다. 그러나 제너레이터와 코루틴 덕분에 호출 체인의 실행은 중단되었다가 재개될 수 있으며, 다른 컨텍스트의 코드가 동시적으로 실행될 수 있습니다. 따라서 스레드-로컬 저장소를 사용하는 것은 동시성-안전하지 않습니다(concurrency-unsafe). 다른 컨텍스트의 다른 호출 체인이 스레드-로컬 변수에 간섭할 수 있기 때문입니다.

이러한 문제점을 해결하기 위해 "동시성-로컬(concurrency-local)" 또는 "태스크-로컬(task-local) 저장소"와 같은 개념이 필요할 수 있습니다. 이는 비동기 실행 및 동시성을 위한 "스레드"와 유사한 개념으로, 실행 순서에 모호함 없이 순차적으로 실행될 것이 보장되는 가장 큰 코드 및 중첩 호출의 양으로 볼 수 있습니다. 이러한 동시성-로컬 변수에서는 다른 코드 경로가 백그라운드에서 값에 간섭하지 않고도 호출 체인을 따라 하위 호출자에게 정보를 전달할 수 있습니다.

그러나 전역 변수, 스레드-로컬 변수, 태스크-로컬 변수 모두 호출 체인을 따라 실행 컨텍스트 정보를 전달하는 목적으로 사용되도록 의도된 것은 아닙니다. 변수의 스코프는 프로그래머(일반적으로 라이브러리 작성자)에 의해 제어되어야 하며, 필요 이상으로 넓어서는 안 됩니다. 이 제안은 태스크-로컬 변수(및 전역 변수, 스레드-로컬 변수)가 이 제안이 의도하는 종류의 컨텍스트-바운드 정보 전달과는 무관하다고 주장합니다. 따라서 이 제안은 컨텍스트-로컬 변수(context-local variables, 또는 context variables, contextvars)의 의미론과 구현 개요를 설명합니다. 실제로, 이 PEP의 부작용으로 비동기 프레임워크는 제안된 기능을 사용하여 태스크-로컬 변수를 구현할 수 있습니다.

## 제안 (Proposal)

제안된 의미론은 Python에서 이미 사용 가능한 어떤 것의 직접적인 확장이 아니므로, 이 제안은 먼저 비교적 높은 수준에서 의미론과 API 측면에서 설명됩니다. 특히, `with` 문(Python `with statements`)은 제안된 의미론과 잘 맞기 때문에 설명에 많이 사용됩니다. 그러나 기본 `__enter__` 및 `__exit__` 메서드는 저수준의 속도 최적화된 (C) API의 함수에 해당합니다.

### 의미론 및 고수준 API (Semantics and higher-level API)

#### 핵심 개념 (Core concept)

컨텍스트-로컬 변수는 `contextvars.Var`의 단일 인스턴스(예: `cvar`)로 표현됩니다. `cvar` 객체에 접근할 수 있는 모든 코드는 현재 컨텍스트에 대한 `cvar`의 값을 요청할 수 있습니다. 고수준 API에서 이 값은 `cvar.value` 속성으로 제공됩니다.

```python
import contextvars

cvar = contextvars.Var(default="the default value", description="example context variable")
assert cvar.value == "the default value" # 기본값이 적용됩니다.

# 이 컨텍스트에 대한 cvar 할당이 없으므로, cvar.value는 기본값을 반환합니다.
```


`contextvars`에 새 값을 할당하는 것은 스코프(scope)를 매우 인식하는 방식으로 이루어집니다.

```python
with cvar.assign(new_value):
    assert cvar.value is new_value
    # 여기, 또는 여기에서 호출 체인 아래의 모든 코드는 다음을 봅니다:
    # cvar.value는 new_value입니다.
    # 중첩된 컨텍스트에서 다른 값이 할당되지 않는 한
    assert cvar.value is new_value
# cvar에 대한 new_value 할당은 더 이상 보이지 않습니다.
assert cvar.value == "the default value"
```


여기서 `cvar.assign(value)`는 다른 객체, 즉 `contextvars.Assignment(cvar, new_value)`를 반환합니다. 여기서 본질적인 부분은 컨텍스트 변수 할당(`Assignment.__enter__`)이 해제(`Assignment.__exit__`)와 짝을 이룬다는 것입니다. 이러한 연산은 할당된 값의 스코프 경계를 설정합니다.

동일한 컨텍스트 변수에 대한 할당은 중첩될 수 있으며, 더 좁은 컨텍스트에서 외부 할당을 재정의합니다.

```python
assert cvar.value == "the default value"
with cvar.assign("outer"):
    assert cvar.value == "outer"
    with cvar.assign("inner"):
        assert cvar.value == "inner"
    assert cvar.value == "outer"
assert cvar.value == "the default value"
```


또한 여러 변수가 서로 영향을 주지 않고 중첩 방식으로 할당될 수 있습니다.

```python
cvar1 = contextvars.Var()
cvar2 = contextvars.Var()

assert cvar1.value is None # 기본값은 None입니다.
assert cvar2.value is None

with cvar1.assign("value1"):
    assert cvar1.value == "value1"
    assert cvar2.value is None
    with cvar2.assign("value2"):
        assert cvar1.value == "value1"
        assert cvar2.value == "value2"
    assert cvar1.value == "value1"
    assert cvar2.value is None
assert cvar1.value is None
assert cvar2.value is None
```


더 편리한 Python 구문으로는 다음과 같습니다.

```python
with cvar1.assign("value1"), cvar2.assign("value2"):
    assert cvar1.value == "value1"
    assert cvar2.value == "value2"
```


다른 컨텍스트, 다른 스레드 또는 다른 동시적으로 실행되는 태스크(task)나 코드 경로에서는 컨텍스트 변수가 완전히 다른 상태를 가질 수 있습니다. 따라서 프로그래머는 현재 컨텍스트에 대해서만 걱정하면 됩니다.

#### 서브루틴으로 리팩토링 (Refactoring into subroutines)

`contextvars`를 사용하는 코드는 의미론에 영향을 주지 않고 서브루틴으로 리팩토링될 수 있습니다. 예를 들면 다음과 같습니다.

```python
assi = cvar.assign("new_value")
def apply():
    assi.__enter__()
    assert cvar.value == "the default value" # 이 부분은 예시 코드의 오류로 보이며, 사실은 'new_value'여야 합니다.
apply()
assert cvar.value == "new_value"
assi.__exit__()
assert cvar.value == "the default value"
```


비동기 컨텍스트(`await` 표현식이 사용되는 곳)에서도 유사하게 적용될 수 있습니다. 이제 서브루틴은 코루틴이 될 수 있습니다.

```python
assi = cvar.assign("new_value")
async def apply():
    assi.__enter__()
    assert cvar.value == "the default value" # 이 부분도 예시 코드의 오류로 보이며, 사실은 'new_value'여야 합니다.
await apply()
assert cvar.value == "new_value"
assi.__exit__()
assert cvar.value == "the default value"
```


서브루틴이 제너레이터인 경우:

```python
def apply():
    yield assi.__enter__()
```

이는 `yield from apply()` 또는 `next`나 `.send` 호출을 사용하여 호출됩니다.

#### 제너레이터 및 제너레이터 기반 코루틴의 의미론 (Semantics for generators and generator-based coroutines)

제너레이터, 코루틴, 비동기 제너레이터는 일반 함수와 매우 유사하게 서브루틴 역할을 합니다. 그러나 `yield` 표현식에 의해 중단될 수 있는 추가적인 가능성을 가집니다. 제너레이터 내에서 진입된 할당 컨텍스트는 일반적으로 `yield`를 넘어 보존됩니다.

```python
def genfunc():
    with cvar.assign("new_value"):
        assert cvar.value == "new_value"
        yield
        assert cvar.value == "new_value"

g = genfunc()
next(g) # yield까지 실행
assert cvar.value == "the default value" # 외부 컨텍스트에서는 기본값
with cvar.assign("another_value"):
    next(g) # 제너레이터 내부에서는 여전히 "new_value"를 보고 yield 다음 코드를 실행
```


그러나 제너레이터에 보이는 외부 컨텍스트는 `yield`를 넘어 상태를 변경할 수 있습니다.

```python
def genfunc():
    assert cvar.value == "value2" # 첫 번째 yield 전에 외부 컨텍스트의 "value2"를 봅니다.
    yield
    assert cvar.value == "value1" # 두 번째 yield 전에 외부 컨텍스트의 "value1"을 봅니다.
    yield
    with cvar.assign("value3"):
        assert cvar.value == "value3" # 내부에서 "value3"을 할당합니다.

with cvar.assign("value1"):
    g = genfunc()
    with cvar.assign("value2"):
        next(g) # genfunc()의 첫 번째 부분 실행
    next(g) # genfunc()의 두 번째 부분 실행
    next(g) # genfunc()의 세 번째 부분 실행
assert cvar.value == "value1" # 최종적으로 외부 컨텍스트는 "value1"로 돌아옵니다.
```


`async def ... yield ...`로 정의된 비동기 제너레이터에도 유사한 의미론이 적용됩니다.

기본적으로 제너레이터 내에서 할당된 값은 `yield`를 통해 제너레이터를 구동하는 외부 코드로 유출되지 않습니다. 그러나 제너레이터가 `StopIteration` 또는 다른 예외로 종료된 후에는 제너레이터 내에서 진입되고 열려 있던 할당 컨텍스트가 제너레이터 외부에서 보이게 됩니다.

```python
assi = cvar.assign("new_value")
def genfunc():
    yield assi.__enter__() # __enter__는 yield 이후에 호출될 것입니다.
    yield

g = genfunc()
assert cvar.value == "the default value"
next(g) # 첫 번째 yield까지 실행, 아직 __enter__()는 호출되지 않음
assert cvar.value == "the default value"
next(g) # assi.__enter__()가 여기서 호출됩니다. 두 번째 yield까지 실행
assert cvar.value == "new_value" # 이제 외부에서 'new_value'를 봅니다.
assi.__exit__() # 외부에서 직접 __exit__() 호출, 컨텍스트를 되돌립니다.
assert cvar.value == "the default value"
```


### 프레임워크 작성자를 위한 특별 기능 (Special functionality for framework authors)

`asyncio` 또는 서드파티 라이브러리와 같은 프레임워크는 Python 인터프리터에 의해 결정되지 않는 경우에 원하는 의미론을 달성하기 위해 `contextvars`의 추가 기능을 사용할 수 있습니다.

#### `leaking_yields` (유출되는 yield)

`contextvars.leaking_yields` 데코레이터를 사용하면 `yield` 표현식을 통해 컨텍스트가 제너레이터를 구동하는 외부 컨텍스트로 유출되도록 선택할 수 있습니다.

```python
@contextvars.leaking_yields
def genfunc():
    assert cvar.value == "outer"
    with cvar.assign("inner"):
        yield
        assert cvar.value == "inner"
    assert cvar.value == "outer"

g = genfunc()
with cvar.assign("outer"):
    assert cvar.value == "outer"
    next(g) # yield까지 실행, 내부 "inner"가 외부로 유출됩니다.
    assert cvar.value == "inner"
    next(g) # yield 이후 코드 실행, "inner" 컨텍스트를 빠져나오고 다시 "outer"가 유출됩니다.
    assert cvar.value == "outer"
```


#### `contextvar` 할당 캡처 (Capturing contextvar assignments)

`contextvars.capture()`를 사용하면 코드 블록에 의해 진입된 할당 컨텍스트를 캡처할 수 있습니다. 코드 블록에 의해 적용된 변경 사항은 나중에 다른 컨텍스트에서도 되돌리고 다시 적용할 수 있습니다.

```python
cvar1 = contextvars.Var()
cvar2 = contextvars.Var()

assert cvar1.value is None # 기본값
assert cvar2.value is None # 기본값

assi1 = cvar1.assign("value1_original")
assi2 = cvar1.assign("value2_overridden")

with contextvars.capture() as delta:
    assi1.__enter__() # cvar1 = "value1_original"
    with cvar2.assign("not captured"): # 이 할당은 capture() 블록 밖에서 이루어져 캡처되지 않습니다.
        assert cvar2.value == "not captured"
    assi2.__enter__() # cvar1 = "value2_overridden" (assi1 오버라이드)
    assert cvar1.value == "value2_overridden"

delta.revert() # 캡처된 변경사항을 되돌립니다.
assert cvar1.value is None
assert cvar2.value is None # "not captured"는 캡처되지 않았으므로 원래 상태

with cvar1.assign("some_other_value_1"), cvar2.assign("some_other_value_2"):
    delta.reapply() # 캡처된 변경사항을 다시 적용합니다.
    assert cvar1.value == "value2_overridden" # delta에 의해 다시 적용된 값
    assert cvar2.value == "some_other_value_2" # cvar2 할당은 캡처되지 않았고, 외부 with 블록의 영향을 받습니다.
```


그러나 `delta`의 내용에 해제(deassignments)가 포함되어 있다면 "delta"를 다시 적용하는 것이 불가능할 수 있습니다.

#### 컨텍스트 상태의 스냅샷 가져오기 (Getting a snapshot of context state)

`contextvars.get_local_state()` 함수는 함수가 호출된 컨텍스트에서 모든 컨텍스트-로컬 변수에 적용된 할당을 나타내는 객체를 반환합니다. 이는 실행 시작부터 모든 컨텍스트 변경 사항을 캡처하기 위해 `contextvars.capture()`를 사용하는 것과 동일하게 볼 수 있습니다. 반환된 객체는 위와 같이 `.revert()` 및 `.reapply()` 메서드를 지원합니다.

#### 클린 상태에서 코드 실행 (Running code in a clean state)

위의 기본 기능을 사용하여 적용된 모든 컨텍스트 변경 사항을 되돌릴 수 있지만, 클린 컨텍스트에서 코드 블록을 실행하는 더 편리한 방법이 제공됩니다.

```python
with context_vars.clean_context():
    # 여기서는 모든 컨텍스트 변수가 기본값으로 시작합니다.
    # 이 블록을 벗어나면, 상태는 with 블록 이전으로 돌아갑니다.
```


## 구현 (Implementation)

이 섹션은 설명된 의미론이 어떻게 구현될 수 있는지 다양한 수준의 세부 사항으로 설명합니다. 현재는 단순성을 목표로 하지만 충분한 기능을 가진 구현이 설명됩니다.

### 핵심 개념의 데이터 구조 및 구현 (Data structures and implementation of the core concept)

Python 인터프리터의 각 스레드는 `contextvars.Assignment` 객체의 자체 스택을 유지하며, 각 객체는 연결 리스트(linked list)처럼 이전(외부) 할당에 대한 포인터(pointer)를 가집니다. 로컬 상태(`contextvars.get_local_state()`에 의해 반환됨)는 스택의 상단에 대한 참조와 스택 하단에 대한 포인터/약한 참조(weak reference)로 구성됩니다. 이는 효율적인 스택 조작을 가능하게 합니다. `contextvars.capture()`에 의해 생성된 객체는 유사하지만, 캡처 블록 시작 시점의 스택 상단을 가리키는 하단 참조와 함께 스택의 일부만 참조합니다.

이제 스택은 할당 `__enter__` 및 `__exit__` 메서드에 따라 진화합니다. 예를 들어:

```python
cvar1 = contextvars.Var()
cvar2 = contextvars.Var()

# 스택: []
assert cvar1.value is None
assert cvar2.value is None

with cvar1.assign("outer"):
    # 스택: [Assignment(cvar1, "outer")]
    assert cvar1.value == "outer"
    with cvar1.assign("inner"):
        # 스택: [Assignment(cvar1, "outer"),
        #         Assignment(cvar1, "inner")]
        assert cvar1.value == "inner"
        with cvar2.assign("hello"):
            # 스택: [Assignment(cvar1, "outer"),
            #         Assignment(cvar1, "inner"),
            #         Assignment(cvar2, "hello")]
            assert cvar2.value == "hello"
        # 스택: [Assignment(cvar1, "outer"),
        #         Assignment(cvar1, "inner")]
        assert cvar1.value == "inner"
        assert cvar2.value is None
    # 스택: [Assignment(cvar1, "outer")]
    assert cvar1.value == "outer"
# 스택: []
assert cvar1.value is None
assert cvar2.value is None
```


`cvar1.value`를 사용하여 컨텍스트에서 값을 가져오는 것은 스택에서 `cvar1` 할당의 가장 위에 있는 항목을 찾아 해당 값을 반환하거나, 스택에서 할당을 찾지 못한 경우 기본값을 반환하는 방식으로 구현될 수 있습니다. 그러나 대부분의 경우 O(1) 연산으로 최적화될 수 있습니다. 스택을 검색하는 것만으로도 스택이 매우 커질 의도가 없기 때문에 합리적으로 빠를 수 있습니다.

### 제너레이터 및 코루틴 의미론의 구현 (Implementation of generator and coroutine semantics)

제너레이터, 코루틴, 비동기 제너레이터 내에서는 할당 및 해제가 다른 곳과 정확히 동일한 방식으로 처리됩니다. 그러나 내장 제너레이터 메서드 `send`, `__next__`, `throw`, `close`에 일부 변경이 필요합니다. 다음은 제너레이터의 `send`에 필요한 변경 사항의 Python 등가물입니다 (여기서 `_old_send`는 Python 3.6의 동작을 참조합니다).

```python
def send(self, value):
    if self.gi_contextvars is LEAK: # contextvars.leaking_yields로 데코레이트된 경우
        # yield를 통해 컨텍스트를 유출하기 위해 아무것도 할 필요가 없습니다 :)
        return self._old_send(value)
    try:
        with contextvars.capture() as delta:
            if self.gi_contextvars:
                # 이전 반복에서 캡처된 내용이 0이 아닌 경우
                self.gi_contextvars.reapply()
            ret = self._old_send(value)
    except Exception:
        raise # 호출 프레임으로 돌아갑니다 (예: StopIteration)
    else:
        # 일시 중단(suspending) 중, 컨텍스트 변경 사항을 되돌리지만 나중에 사용하기 위해 저장합니다.
        delta.revert()
        self.gi_contextvars = delta
        return ret
```


다른 메서드에 대한 해당 수정 사항은 본질적으로 동일합니다. 이는 코루틴 및 비동기 제너레이터에도 동일하게 적용됩니다.

`contextvars`를 사용하지 않는 코드의 경우, 추가 사항은 O(1)이며 본질적으로 몇 개의 포인터 비교로 줄어듭니다. `contextvars`를 사용하는 코드의 경우에도 대부분의 경우 추가 사항은 O(1)입니다.

## 하위 호환성 (Backwards compatibility)

완전히 새로운 기능이 제안되므로 직접적인 하위 호환성 문제는 없습니다.

그러나 스레드-로컬 저장소의 다양한 전통적인 사용법은 동시성-안전성을 위해 `contextvars`로의 원활한 전환이 필요할 수 있습니다. 이를 위한 몇 가지 접근 방식이 있으며, 비동기 프레임워크의 약간의 도움으로 태스크-로컬 저장소를 에뮬레이트(emulate)하는 것을 포함합니다. 원하는 의미론이 프레임워크의 설계에 따라 달라질 수 있으므로 완전히 일반적인 구현은 제공될 수 없습니다.

전환을 처리하는 또 다른 방법은 코드가 먼저 `contextvars`를 사용하여 생성된 컨텍스트를 찾는 것입니다. 새 스타일 컨텍스트가 설정되지 않았거나 코드가 이전 Python 버전에서 실행되어 실패하는 경우, 스레드-로컬 저장소로 폴백(fallback)됩니다.

## 미해결 문제 (Open Issues)

### 순서가 뒤바뀐 해제 (Out-of-order de-assignments)

이 제안에서 모든 변수 해제는 이전 할당과 반대 순서로 이루어집니다. 이는 두 가지 유용한 속성을 가집니다: `with` 문을 사용하여 할당 스코프를 정의하도록 권장하고 오류를 조기에 포착하는 경향이 있습니다 (`.__exit__()` 호출을 잊으면 의미 있는 오류가 발생하는 경우가 많습니다). 이를 요구 사항으로 두는 것은 구현 단순성과 성능 면에서도 유리합니다. 그럼에도 불구하고, 순서가 뒤바뀐 컨텍스트 종료를 허용하는 것이 전적으로 불가능한 것은 아니며, 이를 위한 합리적인 구현 전략도 존재합니다.

## 거부된 아이디어 (Rejected Ideas)

### 서브루틴 스코프에 연결된 동적 스코핑 (Dynamic scoping linked to subroutine scopes)

값 가시성(value visibility)의 스코프는 코드가 서브루틴으로 리팩토링되는 방식에 의해 결정되어서는 안 됩니다. 할당 스코프를 변수별로 제어하는 것이 필요합니다.

---
**참고:** 이 PEP 555는 "철회됨(Withdrawn)" 상태입니다. 이는 제안이 더 이상 활발하게 개발되거나 Python에 포함될 것으로 예상되지 않는다는 의미입니다. 하지만, `contextvars` 모듈은 이후 PEP 567: Context Variables 에 의해 Python 3.7에 도입되었으며, PEP 555의 아이디어는 `contextvars` 모듈의 기반이 되었습니다. PEP 567은 PEP 555를 기반으로 하고 있지만, 이 문서 자체는 철회된 것으로 명시되어 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.