---
title: "[Deferred] PEP 568 - Generator-sensitivity for Context Variables"
excerpt: "Python Enhancement Proposal 568: 'Generator-sensitivity for Context Variables'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/568/
toc: true
toc_sticky: true
date: 2025-09-26 23:51:20+0900
last_modified_at: 2025-09-26 23:51:20+0900
published: true
---
> **원문 링크:** [PEP 568 - Generator-sensitivity for Context Variables](https://peps.python.org/pep-0568/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 04-Jan-2018

다음은 Python Enhancement Proposal (PEP) 568 문서의 한국어 번역 및 정리입니다. 이 문서는 `Context Variable`에 대한 `Generator` 감도 (Generator-sensitivity)를 추가하는 내용을 다루고 있습니다.

---

# PEP 568 – Context Variables에 대한 Generator 감도

*   **작성자:** Nathaniel J. Smith <njs at pobox.com>
*   **상태:** Deferred (보류됨)
*   **유형:** Standards Track
*   **생성일:** 2018년 1월 4일
*   **Python 버전:** 3.8
*   **이력:** (Post-History는 생략)

## 초록 (Abstract)

`Context variable`은 스레드-로컬 저장소 (thread-local storage)와 유사하지만, `asyncio Task`와 같은 다른 종류의 스레드와 유사한 컨텍스트에도 작동하도록 일반화된, 동적이고 컨텍스트-로컬 (context-local) 상태를 추적하기 위한 일반적인 메커니즘을 제공합니다. [PEP 550]은 `Generator` 컨텍스트에도 민감하게 반응하는 컨텍스트-로컬 상태 메커니즘을 제안했지만, 이는 상당히 복잡했습니다. 이에 BDFL (Python의 자비로운 종신독재자)은 이를 단순화할 것을 요청했고, 그 결과로 [PEP 567]이 나왔으며 Python 3.7에 포함될 예정이었습니다. 이 PEP 568은 PEP 567의 메커니즘을 확장하여 `Generator` 컨텍스트 감도 (generator context sensitivity)를 추가합니다.

이 PEP는 Python 3.7 기능 동결 (feature freeze) 전에 충분한 시간을 가지고 검토할 수 없었으므로 "deferred" 상태로 시작되었습니다. 현재 유일한 목표는 Python 3.8에서 `Generator` 컨텍스트 감도를 추가하기 위해 무엇이 필요한지 이해하는 것이며, 이를 통해 Python 3.7에서 의도치 않게 이 기능을 배제하는 것을 방지하는 것입니다. (의도적으로 배제하는 것은 Python 3.8까지 기다릴 수 있습니다.)

## 배경 (Rationale)

(현재 이 PEP의 목적은 이것이 어떻게 작동할지 이해하는 것이며, 이것이 좋은 아이디어인지에 대한 논의는 Python 3.7 기능 동결 이후로 연기되었습니다. 따라서 배경은 미정입니다.)

## 높은 수준의 요약 (High-level summary)

기존에는 단일 `Context` 객체를 유지했지만, 이제 `threadstate`는 `Context` 객체들의 `ChainMap`을 유지합니다. `ContextVar.get` 및 `ContextVar.set`은 이 `ChainMap`을 기반으로 작동합니다. `Generator`와 `Async Generator`는 각각 자신과 연관된 `Context`를 가지고 있으며, 실행 중에 이 `Context`를 `ChainMap`에 `push`하여 호출자 (caller)로부터 컨텍스트-로컬 변경 사항을 격리합니다. 그러나 `@contextlib.contextmanager`와 같이 `Generator`로부터 `Context` 변경 사항이 호출자로 "누출 (leak)"되는 것이 바람직한 경우에는 이를 재정의할 수 있습니다.

## 상세 사양 (Specification)

### PEP 567 검토 (Review of PEP 567)

먼저 PEP 567이 어떻게 작동하는지 검토한 후, 다음 섹션에서 이 PEP와의 차이점을 설명합니다.

PEP 567에서 `Context`는 `ContextVar` 객체를 임의의 값에 매핑하는 `Mapping`입니다. 의사 코드 (pseudo-code)에서는 내부 저장소로 `dict`를 사용하는 것처럼 가정합니다. (실제 구현은 `dict`와 의미론적으로 동등하지만 성능 트레이드오프가 다른 HAMT를 사용합니다.)

```python
class Context(collections.abc.Mapping):
    def __init__(self):
        self._data = {}
        self._in_use = False

    def __getitem__(self, key):
        return self._data[key]

    def __iter__(self):
        return iter(self._data)

    def __len__(self):
        return len(self._data)
```


어떤 시점에서든 `threadstate`는 현재 `Context`를 유지합니다 (스레드 상태가 생성될 때 빈 `Context`로 초기화됩니다). `Context.run`을 사용하여 현재 `Context`를 일시적으로 전환할 수 있습니다.

```python
# Context.run
def run(self, fn, *args, **kwargs):
    if self._in_use:
        raise RuntimeError("Context already in use")
    tstate = get_thread_state()
    old_context = tstate.current_context
    tstate.current_context = self
    self._in_use = True
    try:
        return fn(*args, **kwargs)
    finally:
        tstate.current_context = old_context
        self._in_use = False
```


`copy_context`를 호출하여 현재 `Context`의 얕은 복사본 (shallow copy)을 가져올 수 있습니다. 이는 일반적으로 새 `task`를 생성할 때 사용되며, 자식 `task`가 부모로부터 `Context`를 상속받을 수 있도록 합니다.

```python
def copy_context():
    tstate = get_thread_state()
    new_context = Context()
    new_context._data = dict(tstate.current_context)
    return new_context
```


실제로 최종 사용자 (end user)가 주로 사용하는 것은 `ContextVar` 객체이며, 이것이 `Context`를 변경하는 유일한 방법입니다. `ContextVar`는 `Token`이라는 유틸리티 클래스와 함께 작동하며, `Token`은 `ContextVar`를 이전 값으로 복원하는 데 사용될 수 있습니다.

```python
class Token:
    MISSING = sentinel_value()
    # Note: constructor is private
    def __init__(self, context, var, old_value):
        self._context = context
        self.var = var
        self.old_value = old_value

    def reset(self):
        if self.old_value is self.MISSING:
            del self._context._data[self.context_var]
        else:
            self._context._data[self.context_var] = self.old_value

class ContextVar:
    def __init__(self, name, *, default=None):
        self.name = name
        self.default = default

    def get(self):
        context = get_thread_state().current_context
        return context.get(self, self.default)

    def set(self, new_value):
        context = get_thread_state().current_context
        token = Token(context, self, context.get(self, Token.MISSING))
        context._data[self] = new_value
        return token
```


### PEP 567에서 이 PEP로의 변경 사항 (Changes from PEP 567 to this PEP)

일반적으로 `Context`는 동일하게 유지됩니다. 그러나 이제 `threadstate`는 단일 `Context` 객체 대신 `Context` 객체 스택 (stack)을 저장합니다. 이 스택은 `collections.ChainMap`처럼 작동하므로, 의사 코드에서도 이를 사용합니다. 이에 따라 `Context.run`은 다음과 같이 변경됩니다.

```python
# Context.run
def run(self, fn, *args, **kwargs):
    if self._in_use:
        raise RuntimeError("Context already in use")
    tstate = get_thread_state()
    old_context_stack = tstate.current_context_stack
    tstate.current_context_stack = ChainMap([self]) # 변경됨 (changed)
    self._in_use = True
    try:
        return fn(*args, **kwargs)
    finally:
        tstate.current_context_stack = old_context_stack
        self._in_use = False
```


일부 변수 이름 업데이트 (예: `tstate.current_context` → `tstate.current_context_stack`) 외에, 유일한 변경 사항은 표시된 줄에서 `context`를 `ChainMap`으로 감싸서 `threadstate`에 저장하는 것입니다.

또한 `Context.push` 메서드가 추가됩니다. 이 메서드는 `Context.run`과 거의 동일하지만, 전체 스택을 일시적으로 교체하는 대신 기존 스택에 `Context`를 일시적으로 `push`한다는 점에서 다릅니다.

```python
# Context.push
def push(self, fn, *args, **kwargs):
    if self._in_use:
        raise RuntimeError("Context already in use")
    tstate = get_thread_state()
    tstate.current_context_stack.maps.insert(0, self) # run과 다름 (different from run)
    self._in_use = True
    try:
        return fn(*args, **kwargs)
    finally:
        tstate.current_context_stack.maps.pop(0) # run과 다름 (different from run)
        self._in_use = False
```


대부분의 경우 `push`가 직접 사용될 것이라고 예상하지는 않지만, 대신 `Generator`에 의해 암묵적으로 사용될 것입니다. 구체적으로, 모든 `Generator` 객체와 `Async Generator` 객체는 `.context`라는 새 속성을 갖게 됩니다. (Async) `Generator` 객체가 생성될 때, 이 속성은 빈 `Context`로 초기화됩니다 (`self.context = Context()`). 이 속성은 변경 가능하며, 사용자 코드에 의해 변경될 수 있습니다. 그러나 `Context` 객체나 `None`이 아닌 다른 값으로 설정하려고 하면 오류가 발생합니다.

`__next__`, `send`, `throw`, 또는 `close`를 통해 `Generator`에 진입하거나, `__anext__`, `asend`, `athrow`, 또는 `aclose` 코루틴 (coroutine) 중 하나를 호출하여 `Async Generator`에 진입할 때마다, 해당 `.context` 속성이 확인되며, `None`이 아닌 경우 자동으로 `push`됩니다.

```python
# GeneratorType.__next__
def __next__(self):
    if self.context is not None:
        return self.context.push(self.__real_next__)
    else:
        return self.__real_next__()
```


`Context.push`가 자주 사용될 것으로 예상하지는 않지만, 이를 공개 API로 만드는 것은 `Generator`가 항상 동등한 의미를 가진 명시적인 이터레이터 클래스 (iterator class)로 재작성될 수 있다는 원칙을 보존합니다.

또한, `contextlib.(async)contextmanager`는 해당 (async) `Generator` 객체의 `.context` 속성을 항상 `None`으로 설정하도록 수정됩니다.

```python
# contextlib._GeneratorContextManagerBase.__init__
def __init__(self, func, args, kwds):
    self.gen = func(*args, **kwds)
    self.gen.context = None # 추가됨 (added)
    # ...
```


이것은 다음 코드와 같은 코드가 예상대로 계속 작동하도록 보장합니다.

```python
@contextmanager
def decimal_precision(prec):
    with decimal.localcontext() as ctx:
        ctx.prec = prec
        yield

with decimal_precision(2):
    # ...
```


여기서의 일반적인 아이디어는 기본적으로 모든 `Generator` 객체가 자체 로컬 컨텍스트를 얻지만, 사용자가 명시적으로 다른 동작을 원하면 그렇게 할 수 있다는 것입니다.

그 외에는 `threadstate Context` 대신 `threadstate ChainMap`을 사용하도록 모든 것을 변경하는 것을 제외하고는 대부분 이전과 동일하게 작동합니다. 자세한 내용은 다음과 같습니다.

`copy_context` 함수는 이제 "유효한 (effective)" 컨텍스트의 평탄화된 (flattened) 복사본을 반환합니다. (최적화로, 구현은 이 평탄화를 지연시켜 수행할 수 있지만, 그렇게 하더라도 사용자에게는 보이지 않도록 할 것입니다.) 위의 이전 구현과 비교했을 때, 유일한 변경 사항은 `tstate.current_context`가 `tstate.current_context_stack`으로 대체되었다는 것입니다.

```python
def copy_context() -> Context:
    tstate = get_thread_state()
    new_context = Context()
    new_context._data = dict(tstate.current_context_stack)
    return new_context
```


`Token`은 변경되지 않았으며, `ContextVar.get`에 대한 변경 사항은 사소합니다.

```python
# ContextVar.get
def get(self):
    context_stack = get_thread_state().current_context_stack
    return context_stack.get(self, self.default)
```


`ContextVar.set`은 약간 더 흥미롭습니다. 다른 모든 것과 달리 `ChainMap` 메커니즘을 통하는 대신, 항상 스택에서 가장 위에 있는 `Context`를 변경하며, - 결정적으로! - 반환된 `Token`이 나중에 상태를 복원하도록 설정합니다. 이는 `old = var.get(); ...; var.set(old)`와 같이 수행할 경우 발생할 수 있는 스택의 다른 레벨 간에 값이 실수로 "승격 (promote)"되는 것을 방지합니다.

```python
# ContextVar.set
def set(self, new_value):
    top_context = get_thread_state().current_context_stack.maps[0]
    token = Token(top_context, self, top_context.get(self, Token.MISSING))
    top_context._data[self] = new_value
    return token
```


마지막으로, 전체 컨텍스트 스택을 내부에서 검사 (introspection)할 수 있도록 `contextvars.get_context_stack`이라는 새 함수가 제공됩니다.

```python
def get_context_stack() -> List[Context]:
    return list(get_thread_state().current_context_stack.maps)
```


이것이 전부입니다.

### PEP 550과의 비교 (Comparison to PEP 550)

PEP 550과의 주요 차이점은 PEP 550이 우리가 "contexts"와 "context stacks"라고 부르는 것을 두 가지 다른 구체적인 유형 (`LocalContext`와 `ExecutionContext`)으로 구체화했다는 것입니다. 이는 차이점이 무엇이며, 어떤 객체를 어느 곳에 사용해야 하는지에 대한 많은 혼란을 야기했습니다. 이 제안은 `Context`만 구체화함으로써 (`"just a dict"`) 상황을 단순화하고, "context stack"을 인터프리터 런타임 상태의 이름 없는 기능으로 만듭니다. 하지만 디버깅 및 기타 목적을 위해 `get_context_stack`을 사용하여 이를 내부에서 검사하는 것은 여전히 가능합니다.

### 구현 노트 (Implementation notes)

`Context`는 내부적으로 `dict` 대신 HAMT 기반의 매핑 구조를 계속 사용할 것입니다. 이는 `ContextVar.set` 호출보다 `copy_context` 호출이 훨씬 더 흔할 것으로 예상되기 때문입니다. 거의 모든 경우에 `copy_context`는 스택에 `Context`가 하나만 있음을 발견하고 (제너레이터가 새 작업을 생성하는 경우가 드물기 때문에) 단순히 이를 직접 재사용할 수 있습니다. 다른 경우에는 HAMT는 병합 비용이 저렴하며 지연하여 수행할 수 있습니다.

실제 `ChainMap` 객체 대신, `context stack`은 적절한 구조를 사용하여 표현될 것입니다. 가장 적절한 옵션은 `push`/`pop`을 사용할 수 있도록 스택의 "상단"이 리스트의 끝에 있는 일반 리스트이거나, 또는 효율적인 `push`/`pop`을 허용하기 위해 스택의 "상단"이 리스트의 시작 부분에 있는 침입형 연결 리스트 (`PyThreadState` → `Context` → `Context` → …)일 것입니다.

PEP 567의 중요한 최적화는 `ContextVar` 내부의 값 캐싱 (caching)입니다. 단일 `Context`에서 `Context stack`으로 전환하면 이것이 약간 더 복잡해지지만, 그리 많지는 않습니다. 현재는 `threadstate`의 현재 `Context`가 변경될 때마다 (스레드 전환 시, `Context.run` 진입/종료 시) 캐시를 무효화합니다. 여기서 가장 간단한 접근 방식은 스택이 변경될 때마다 (스레드 전환 시, `Context.run` 진입/종료 시, `Context.push` 진입/종료 시) 캐시를 무효화하는 것입니다. 이것의 주요 효과는 `Generator`를 이터레이션하는 것이 캐시를 무효화한다는 것입니다. 이것이 심각한 문제를 일으킬 가능성은 낮지만, 만약 그렇다면 `Context`를 `push`하고 `pop`하는 것이 `threadstate`를 이전 상태로 되돌린다는 것을 인식하는 더 영리한 캐시 키 (cache key)로 피할 수 있다고 생각합니다. (아이디어: 특정 스택 구성에 대한 캐시 키를 가장 상위 `Context`에 저장합니다.)

이 설계에서는 캐시되지 않은 `get`이 O(n)이 될 수밖에 없는 것으로 보입니다. 여기서 n은 `context stack`의 크기입니다. 그러나 n은 일반적으로 매우 작을 것입니다. 중첩된 `Generator`의 수와 대략 같으므로 보통 n=1이며, n이 예를 들어 5보다 큰 경우는 극히 드물 것입니다. 최악의 경우, n은 재귀 제한 (recursion limit)에 의해 제한됩니다. 또한, 깊은 `Generator` 재귀의 대부분의 경우 스택의 `Context` 대부분은 비어 있을 것이며, 따라서 조회 중에 매우 빠르게 건너뛸 수 있을 것으로 예상됩니다. 그리고 반복적인 조회에는 캐싱 메커니즘이 작동할 것입니다. 따라서 이것이 성능 문제를 일으키는 극단적인 경우를 구성하는 것이 가능할 수 있지만, 일반적인 코드는 본질적으로 영향을 받지 않을 것입니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.