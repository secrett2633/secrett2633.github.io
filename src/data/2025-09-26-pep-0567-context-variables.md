---
title: "[Final] PEP 567 - Context Variables"
excerpt: "Python Enhancement Proposal 567: 'Context Variables'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/567/
toc: true
toc_sticky: true
date: 2025-09-26 23:50:36+0900
last_modified_at: 2025-09-26 23:50:36+0900
published: true
---
> **원문 링크:** [PEP 567 - Context Variables](https://peps.python.org/pep-0567/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 12-Dec-2017

## PEP 567 – Context Variables 한국어 번역 및 요약

### 초록 (Abstract)

이 PEP(Python Enhancement Proposal)는 **컨텍스트 변수(context variables)**를 지원하기 위한 새로운 `contextvars` 모듈과 CPython C API 집합을 제안합니다. 이 개념은 스레드 로컬 저장소(thread-local storage, TLS)와 유사하지만, TLS와 달리 `asyncio.Task`와 같은 비동기 태스크별로 값들을 올바르게 추적할 수 있도록 합니다.

이 제안은 PEP 550의 간소화된 버전입니다. 핵심 차이점은 PEP 567이 제너레이터(generators)가 아닌 비동기 태스크를 위한 경우에만 초점을 맞춘다는 것입니다. 내장 타입이나 인터프리터에 대한 수정은 제안되지 않았습니다. 이 제안은 Python의 컨텍스트 매니저(Context Managers)와 엄격하게 관련되어 있지는 않지만, 컨텍스트 매니저가 상태를 저장하는 데 사용할 수 있는 메커니즘을 제공합니다.

### 배경 (Rationale)

스레드 로컬 변수(thread-local variables)는 동일한 OS 스레드 내에서 동시에 실행되는 비동기 태스크(asynchronous tasks)에는 불충분합니다. `threading.local()`을 사용하여 컨텍스트 값을 저장하고 복원하는 모든 컨텍스트 매니저는 `async/await` 코드에서 사용될 때 컨텍스트 값이 예기치 않게 다른 코드로 누출될 수 있습니다.

비동기 코드에서 컨텍스트 로컬 저장소(context local storage)가 필요한 몇 가지 예시는 다음과 같습니다:

*   `decimal` 컨텍스트 및 `numpy.errstate`와 같은 컨텍스트 매니저.
*   웹 애플리케이션의 보안 토큰 및 요청 데이터, `gettext`의 언어 컨텍스트 등 요청 관련 데이터.
*   대규모 코드베이스에서의 프로파일링(profiling), 트레이싱(tracing) 및 로깅(logging).

### 도입 (Introduction)

이 PEP는 컨텍스트 변수를 관리하기 위한 새로운 메커니즘을 제안합니다. 이 메커니즘에 관련된 핵심 클래스는 `contextvars.Context`와 `contextvars.ContextVar`입니다. 또한, 비동기 태스크 주변에서 이 메커니즘을 사용하는 정책도 제안합니다.

컨텍스트 변수에 접근하기 위한 제안된 메커니즘은 `ContextVar` 클래스를 사용합니다. 새로운 메커니즘을 사용하려는 모듈(예: `decimal`)은 다음을 수행해야 합니다:

*   `ContextVar`를 키(key)로 사용하는 모듈-전역 변수를 선언합니다.
*   키 변수의 `get()` 메서드를 통해 현재 값에 접근합니다.
*   키 변수의 `set()` 메서드를 통해 현재 값을 수정합니다.

"현재 값(current value)"의 개념은 특별한 고려가 필요합니다. 동시에 존재하고 실행되는 다른 비동기 태스크는 동일한 키에 대해 다른 값을 가질 수 있습니다. 이 아이디어는 스레드 로컬 저장소에서 잘 알려져 있지만, 이 경우에는 값의 지역성(locality)이 반드시 스레드에 묶여 있지 않습니다. 대신, 스레드 로컬 저장소에 저장되는 "현재 `Context`"라는 개념이 있습니다. 현재 컨텍스트의 조작은 `asyncio`와 같은 태스크 프레임워크의 책임입니다.

`Context`는 `ContextVar` 객체와 해당 값들의 매핑(mapping)입니다. `Context` 자체는 `abc.Mapping` 인터페이스를 노출하며 (`abc.MutableMapping`이 아님!), 따라서 직접 수정할 수 없습니다. `Context` 객체에서 컨텍스트 변수의 새 값을 설정하려면 사용자는 다음을 수행해야 합니다:

1.  `Context.run()` 메서드를 사용하여 `Context` 객체를 "현재(current)"로 만듭니다.
2.  `ContextVar.set()`을 사용하여 컨텍스트 변수의 새 값을 설정합니다.

`ContextVar.get()` 메서드는 `self`를 키로 사용하여 현재 `Context` 객체에서 변수를 찾습니다. 현재 `Context` 객체에 대한 직접 참조를 얻는 것은 불가능하지만, `contextvars.copy_context()` 함수를 사용하여 얕은 복사본을 얻을 수 있습니다. 이를 통해 `Context.run()` 호출자가 해당 `Context` 객체의 유일한 소유자임을 보장합니다.

### 명세 (Specification)

새로운 표준 라이브러리 모듈 `contextvars`가 다음 API와 함께 추가됩니다:

*   `copy_context() -> Context` 함수: 현재 OS 스레드의 현재 `Context` 객체의 복사본을 가져오는 데 사용됩니다.
*   `ContextVar` 클래스: 컨텍스트 변수를 선언하고 접근하는 데 사용됩니다.
*   `Context` 클래스: 컨텍스트 상태를 캡슐화합니다. 모든 OS 스레드는 현재 `Context` 인스턴스에 대한 참조를 저장합니다. 이 참조를 직접 제어하는 것은 불가능합니다. 대신 `Context.run(callable, *args, **kwargs)` 메서드를 사용하여 다른 컨텍스트에서 Python 코드를 실행합니다.

#### `contextvars.ContextVar`

`ContextVar` 클래스는 다음 생성자 시그니처를 가집니다: `ContextVar(name, *, default=_NO_DEFAULT)`.
`name` 매개변수는 인트로스펙션(introspection) 및 디버그 목적으로 사용되며, 읽기 전용 `ContextVar.name` 속성으로 노출됩니다. `default` 매개변수는 선택 사항입니다.

예시:

```python
# 'var'이라는 컨텍스트 변수를 기본값 42로 선언합니다.
var = ContextVar('var', default=42)
```

`ContextVar.get(default=_NO_DEFAULT)`는 현재 `Context`에 대한 컨텍스트 변수의 값을 반환합니다:

```python
# `var`의 값을 가져옵니다.
var.get()
```

현재 컨텍스트에 변수 값이 없으면 `ContextVar.get()`은 다음을 수행합니다:
*   제공된 경우 `get()` 메서드의 `default` 인자 값을 반환합니다.
*   제공된 경우 컨텍스트 변수의 기본값을 반환합니다.
*   그렇지 않으면 `LookupError`를 발생시킵니다.

`ContextVar.set(value) -> Token`은 현재 `Context`에 컨텍스트 변수의 새 값을 설정하는 데 사용됩니다:

```python
# 현재 컨텍스트에서 변수 'var'를 1로 설정합니다.
var.set(1)
```

`ContextVar.reset(token)`은 현재 컨텍스트에서 변수를 토큰을 생성한 `set()` 작업 이전의 값으로 재설정하거나 (또는 설정되지 않은 경우 변수를 제거) 하는 데 사용됩니다:

```python
# 가정: var.get(None) is None
# 'var'를 1로 설정합니다:
token = var.set(1)
try:
    # var.get() == 1
    pass
finally:
    var.reset(token)
    # 재설정 후: var.get(None) is None,
    # 즉 'var'는 현재 컨텍스트에서 제거되었습니다.
```

`ContextVar.reset()` 메서드는 다음 경우에 `ValueError`를 발생시킵니다:
*   다른 변수가 생성한 토큰 객체로 호출될 때.
*   현재 `Context` 객체가 토큰 객체가 생성된 컨텍스트와 일치하지 않을 때.
*   토큰 객체가 변수를 재설정하기 위해 이미 한 번 사용되었을 때 `RuntimeError`를 발생시킵니다.

#### `contextvars.Token`

`contextvars.Token`은 `ContextVar`를 이전 값으로 복원하거나, 변수가 이전에 설정되지 않은 경우 컨텍스트에서 제거하는 데 사용되어야 하는 불투명(opaque) 객체입니다. 이는 `ContextVar.set()`을 호출함으로써만 생성될 수 있습니다.

디버그 및 인트로스펙션 목적으로 다음 속성을 가집니다:
*   읽기 전용 속성 `Token.var`: 토큰을 생성한 변수를 가리킵니다.
*   읽기 전용 속성 `Token.old_value`: `set()` 호출 이전 변수가 가졌던 값으로 설정되거나, 변수가 이전에 설정되지 않은 경우 `Token.MISSING`으로 설정됩니다.

#### `contextvars.Context`

`Context` 객체는 컨텍스트 변수와 값의 매핑입니다.
`Context()`는 빈 컨텍스트를 생성합니다. 현재 OS 스레드의 현재 `Context`의 복사본을 얻으려면 `contextvars.copy_context()` 메서드를 사용합니다:

```python
ctx = contextvars.copy_context()
```

특정 `Context`에서 Python 코드를 실행하려면 `Context.run()` 메서드를 사용합니다:

```python
ctx.run(function)
```

`function`이 유발하는 모든 컨텍스트 변수 변경 사항은 `ctx` 컨텍스트에 포함됩니다:

```python
var = ContextVar('var')
var.set('spam')

def main():
    # 'copy_context()' 및 'ctx.run(main)' 호출 전에 'var'는 'spam'으로 설정되었습니다.
    # 따라서: var.get() == ctx[var] == 'spam'
    var.set('ham')
    # 이제 'var'를 'ham'으로 설정한 후:
    # var.get() == ctx[var] == 'ham'

ctx = copy_context()
# 'main' 함수가 'var'에 대해 수행하는 모든 변경 사항은 'ctx'에 포함됩니다.
ctx.run(main)

# 'main()' 함수는 'ctx' 컨텍스트에서 실행되었으므로,
# 'var'에 대한 변경 사항은 그 안에 포함됩니다:
# ctx[var] == 'ham'
# 그러나 'ctx' 외부에서는 'var'가 여전히 'spam'으로 설정되어 있습니다:
# var.get() == 'spam'
```

`Context.run()`은 두 개 이상의 OS 스레드에서 동일한 컨텍스트 객체에 대해 호출되거나, 재귀적으로 호출될 때 `RuntimeError`를 발생시킵니다.
`Context.copy()`는 컨텍스트 객체의 얕은 복사본을 반환합니다.

`Context` 객체는 `collections.abc.Mapping` ABC를 구현합니다. 이는 컨텍스트를 인트로스펙션하는 데 사용될 수 있습니다:

```python
ctx = contextvars.copy_context()
# 'ctx'에 있는 모든 컨텍스트 변수와 해당 값을 출력합니다:
print(ctx.items())
# 컨텍스트 'ctx'에서 'some_variable'의 값을 출력합니다:
print(ctx[some_variable])
```

`Context.__getitem__` 및 `Context.get`을 포함한 모든 `Mapping` 메서드는 컨텍스트 변수의 기본값(`ContextVar.default`)을 무시합니다. 즉, 기본값으로 생성되었지만 컨텍스트에서 설정되지 않은 변수 `var`의 경우:
*   `context[var]`는 `KeyError`를 발생시킵니다.
*   `var in context`는 `False`를 반환합니다.
*   변수는 `context.items()`에 포함되지 않습니다.

#### `asyncio`

`asyncio`는 `Loop.call_soon()`, `Loop.call_later()`, `Loop.call_at()`을 사용하여 함수의 비동기 실행을 스케줄링합니다. `asyncio.Task`는 `call_soon()`을 사용하여 래핑된 코루틴(coroutine)을 실행합니다.

`Loop.call_{at,later,soon}` 및 `Future.add_done_callback()`은 새로운 선택적 키워드 전용 인자 `context`를 받도록 수정되며, 기본값은 현재 컨텍스트입니다.

```python
def call_soon(self, callback, *args, context=None):
    if context is None:
        context = contextvars.copy_context()
    # ... 얼마 후
    context.run(callback, *args)
```

`asyncio`의 태스크는 생성된 시점부터 상속받는 자신만의 컨텍스트를 유지해야 합니다. `asyncio.Task`는 다음과 같이 수정됩니다:

```python
class Task:
    def __init__(self, coro):
        ...
        # 현재 컨텍스트 스냅샷을 가져옵니다.
        self._context = contextvars.copy_context()
        self._loop.call_soon(self._step, context=self._context)

    def _step(self, exc=None):
        ...
        # 래핑된 코루틴의 모든 진행은
        # 태스크의 컨텍스트 내에서 이루어집니다.
        self._loop.call_soon(self._step, context=self._context)
        ...
```

### 새로운 API 요약 (Summary of the New APIs)

#### Python API

*   `ContextVar`, `Context`, `Token` 클래스 및 `copy_context()` 함수를 포함하는 새로운 `contextvars` 모듈.
*   `asyncio.Loop.call_at()`, `asyncio.Loop.call_later()`, `asyncio.Loop.call_soon()`, `asyncio.Future.add_done_callback()`은 호출된 컨텍스트에서 콜백 함수를 실행합니다.
*   새로운 `context` 키워드 전용 매개변수를 사용하여 사용자 정의 컨텍스트를 지정할 수 있습니다.
*   `asyncio.Task`는 내부적으로 자신만의 컨텍스트를 유지하도록 수정됩니다.

#### C API

*   `PyObject * PyContextVar_New(char *name, PyObject *default)`: `ContextVar` 객체를 생성합니다. `default` 인수는 `NULL`일 수 있으며, 이는 변수에 기본값이 없음을 의미합니다.
*   `int PyContextVar_Get(PyObject *, PyObject *default_value, PyObject **value)`: 조회 중 오류가 발생하면 -1을 반환하고, 그렇지 않으면 0을 반환합니다. 컨텍스트 변수의 값이 발견되면 `value` 포인터에 설정됩니다. 그렇지 않으면 `default_value`가 `NULL`이 아닐 때 `value`는 `default_value`로 설정됩니다. `default_value`가 `NULL`이면 `value`는 변수의 기본값으로 설정되며, 이 또한 `NULL`일 수 있습니다. `value`는 항상 새로운 참조입니다.
*   `PyObject * PyContextVar_Set(PyObject *, PyObject *)`: 현재 컨텍스트에서 변수의 값을 설정합니다.
*   `PyContextVar_Reset(PyObject *, PyObject *)`: 컨텍스트 변수의 값을 재설정합니다.
*   `PyObject * PyContext_New()`: 새로운 빈 컨텍스트를 생성합니다.
*   `PyObject * PyContext_Copy(PyObject *)`: 전달된 컨텍스트 객체의 얕은 복사본을 반환합니다.
*   `PyObject * PyContext_CopyCurrent()`: 현재 컨텍스트의 복사본을 가져옵니다.
*   `int PyContext_Enter(PyObject *)` 및 `int PyContext_Exit(PyObject *)`: 현재 OS 스레드의 컨텍스트를 설정하고 복원할 수 있습니다. 이전 컨텍스트를 항상 복원해야 합니다.

```c
PyObject *old_ctx = PyContext_Copy();
if (old_ctx == NULL) goto error;
if (PyContext_Enter(new_ctx)) goto error;
// 일부 코드 실행
if (PyContext_Exit(old_ctx)) goto error;
```

### 거부된 아이디어 (Rejected Ideas)

몇 가지 아이디어가 제안되었지만 여러 이유로 거부되거나 연기되었습니다.

*   **`threading.local()` 인터페이스 복제**: PEP 550에서 자세히 다뤄졌습니다.
*   **`Token`을 `ContextVar.unset()`으로 대체**: `Token` API는 `ContextVar.unset()` 메서드를 피하게 해주며, 이는 PEP 550의 체인형 컨텍스트(chained contexts) 설계와 호환되지 않습니다. 또한 `Token` API는 값의 부재를 특별하게 처리할 필요가 없어 더 나은 사용성을 제공합니다.
*   **`ContextVar.reset()` 대신 `Token.reset()` 사용**: `Token` 클래스에 직접 `reset()` 메서드를 구현하는 아이디어였으나, 코드를 읽는 사람에게 어떤 변수가 재설정되는지 `ContextVar.reset()`이 더 명확하기 때문에 거부되었습니다.
*   **`Context` 객체를 피클 가능(picklable)하게 만들기**: `ProcessPoolExecutor`와 같은 경우에 `Context` 객체의 투명한 교차 프로세스 사용을 가능하게 할 수 있었으나, `ContextVar` 객체가 `__module__` 및 `__qualname__` 속성을 가지지 않아 간단한 피클링이 불가능하고, 모든 컨텍스트 변수가 피클 가능한 객체를 참조하는 것은 아니라는 점 등의 문제로 Python 3.8로 연기되었습니다.
*   **`Context`를 `MutableMapping`으로 만들기**: `Context` 클래스가 `abc.MutableMapping` 인터페이스를 구현하게 되면 `Context[var] = value` 및 `del Context[var]`와 같은 작업으로 변수를 설정 및 해제할 수 있습니다. 그러나 이는 컨텍스트 변수 변경 방식에 혼란을 초래할 수 있고, 컨텍스트가 개념적으로 복잡해질 수 있어 Python 3.8 이상으로 연기되었습니다.
*   **`ContextVar`에 초기 값(initial values) 갖기**: `ContextVar` 생성자에 `initial_value` 키워드 전용 인수를 필수로 두자는 제안이었으나, 일부 타입의 경우 `None` 외에 합리적인 "초기 값"이 없다는 점과, `threading.local()`과 같은 기존 방식과의 일관성을 위해 거부되었습니다.

### 하위 호환성 (Backwards Compatibility)

이 제안은 100% 하위 호환성을 유지합니다. `threading.local()`을 사용하여 컨텍스트 관련 값을 저장하는 라이브러리는 현재 동기 코드에서만 올바르게 작동합니다. 제안된 API를 사용하도록 전환하면 동기 코드의 동작은 변경되지 않지만, 비동기 코드에 대한 지원이 자동으로 활성화됩니다.

### 예시 (Examples)

#### `threading.local()`을 사용하는 코드 변환

`threading.local()`을 사용하는 일반적인 코드 조각은 다음과 같습니다:

```python
import threading

class PrecisionStorage(threading.local):
    # 기본값을 지정하기 위해 threading.local을 서브클래싱합니다.
    value = 0.0

precision = PrecisionStorage()

# 새 정밀도(precision)를 설정하려면:
precision.value = 0.5

# 현재 정밀도를 읽으려면:
print(precision.value)
```

이 코드는 `contextvars` 모듈을 사용하도록 변환할 수 있습니다:

```python
import contextvars

precision = contextvars.ContextVar('precision', default=0.0)

# 새 정밀도(precision)를 설정하려면:
precision.set(0.5)

# 현재 정밀도를 읽으려면:
print(precision.get())
```

#### 다른 스레드로 실행 오프로드 (Offloading execution to other threads)

현재 스레드 컨텍스트의 복사본을 사용하여 별도의 OS 스레드에서 코드를 실행할 수 있습니다:

```python
from concurrent.futures import ThreadPoolExecutor
import contextvars

executor = ThreadPoolExecutor()
current_context = contextvars.copy_context()
executor.submit(current_context.run, some_function)
```

### 수락 (Acceptance)

PEP 567은 2018년 1월 22일 월요일 Guido van Rossum에 의해 수락되었습니다. 참조 구현은 같은 날 병합되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.