---
title: "[Final] PEP 525 - Asynchronous Generators"
excerpt: "Python Enhancement Proposal 525: 'Asynchronous Generators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/525/
toc: true
toc_sticky: true
date: 2025-09-26 23:17:46+0900
last_modified_at: 2025-09-26 23:17:46+0900
published: true
---
> **원문 링크:** [PEP 525 - Asynchronous Generators](https://peps.python.org/pep-0525/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 28-Jul-2016

## PEP 525 – 비동기 제너레이터 (Asynchronous Generators)

### 개요 (Abstract)

PEP 492는 Python 3.5에 네이티브 코루틴(native coroutines)과 `async`/`await` 문법에 대한 지원을 도입했습니다. 이 PEP 525는 비동기 제너레이터(asynchronous generators) 지원을 추가하여 Python의 비동기 기능을 확장할 것을 제안합니다.

### 배경 및 목표 (Rationale and Goals)

PEP 255에서 도입된 일반 제너레이터(regular generators)는 복잡한 데이터 생산자를 우아하게 작성하고 이를 이터레이터(iterator)처럼 동작하게 하는 방법을 제공했습니다.

하지만 현재 비동기 이터레이션 프로토콜(`async for`)에는 이와 동등한 개념이 없습니다. 이로 인해 비동기 데이터 생산자를 작성하는 것이 불필요하게 복잡해지는데, `async for` 문에서 사용하려면 `__aiter__`와 `__anext__`를 구현하는 클래스를 정의해야 하기 때문입니다.

본 제안에 PEP 255의 목표와 배경을 비동기 실행 사례에 적용하면 그대로 유효합니다.

성능은 이 제안의 추가적인 강점입니다. 참조 구현(reference implementation) 테스트 결과, 비동기 제너레이터는 비동기 이터레이터(asynchronous iterator)로 구현된 동일한 기능보다 2배 더 빠릅니다.

코드 품질 개선의 예시로, 다음은 주어진 딜레이(delay)로 숫자를 출력하는 클래스입니다.

```python
class Ticker:
    """Yield numbers from 0 to `to` every `delay` seconds."""
    def __init__(self, delay, to):
        self.delay = delay
        self.i = 0
        self.to = to

    def __aiter__(self):
        return self

    async def __anext__(self):
        i = self.i
        if i >= self.to:
            raise StopAsyncIteration
        self.i += 1
        if i:
            await asyncio.sleep(self.delay)
        return i
```
동일한 기능을 훨씬 간단한 비동기 제너레이터로 구현할 수 있습니다.

```python
async def ticker(delay, to):
    """Yield numbers from 0 to `to` every `delay` seconds."""
    for i in range(to):
        yield i
        await asyncio.sleep(delay)
```

### 사양 (Specification)

이 제안은 Python에 비동기 제너레이터 개념을 도입합니다.
이 사양은 Python의 제너레이터와 코루틴(PEP 342, PEP 380, PEP 492) 구현에 대한 지식을 전제로 합니다.

#### 비동기 제너레이터 (Asynchronous Generators)

Python 제너레이터는 하나 이상의 `yield` 표현식을 포함하는 모든 함수입니다.

```python
def func(): # 일반 함수
    return

def genfunc(): # 제너레이터 함수
    yield
```

비동기 제너레이터를 정의하기 위해 동일한 접근 방식을 사용할 것을 제안합니다.

```python
async def coro(): # 코루틴 함수
    await smth()

async def asyncgen(): # 비동기 제너레이터 함수
    await smth()
    yield 42
```

비동기 제너레이터 함수를 호출한 결과는 PEP 492에 정의된 비동기 이터레이션 프로토콜(asynchronous iteration protocol)을 구현하는 비동기 제너레이터 객체입니다.

비동기 제너레이터에 비어있지 않은 `return` 문이 있는 경우 `SyntaxError`가 발생합니다.

#### 비동기 이터레이션 프로토콜 지원 (Support for Asynchronous Iteration Protocol)

이 프로토콜은 두 가지 특별한 메서드를 구현해야 합니다.
*   비동기 이터레이터(asynchronous iterator)를 반환하는 `__aiter__` 메서드.
*   값을 "yield"하기 위해 `StopIteration` 예외를 사용하고, 이터레이션의 끝을 알리기 위해 `StopAsyncIteration` 예외를 사용하는 `awaitable` 객체를 반환하는 `__anext__` 메서드.

비동기 제너레이터는 이 두 메서드를 모두 정의합니다. 간단한 비동기 제너레이터를 수동으로 이터레이션해봅시다.

```python
async def genfunc():
    yield 1
    yield 2

gen = genfunc()
assert gen.__aiter__() is gen
assert await gen.__anext__() == 1
assert await gen.__anext__() == 2
await gen.__anext__() # 이 줄은 StopAsyncIteration을 발생시킵니다.
```

#### 종료 (Finalization)

PEP 492는 코루틴을 실행하기 위해 이벤트 루프(event loop) 또는 스케줄러(scheduler)를 필요로 합니다. 비동기 제너레이터는 코루틴에서 사용하도록 설계되었으므로, 실행 및 종료(finalize)하기 위해서도 이벤트 루프가 필요합니다.

비동기 제너레이터는 `try..finally` 블록과 `async with`를 가질 수 있습니다. 부분적으로만 이터레이션되고 가비지 컬렉션(garbage collected) 되더라도 제너레이터가 안전하게 종료될 수 있도록 보장하는 것이 중요합니다. 예를 들어:

```python
async def square_series(con, to):
    async with con.transaction():
        cursor = con.cursor(
            'SELECT generate_series(0, $1) AS i', to)
        async for row in cursor:
            yield row['i'] ** 2

async for i in square_series(con, 1000):
    if i == 100:
        break
```

위 코드는 `async with`를 사용하여 트랜잭션(transaction) 내에서 데이터베이스 커서(cursor)를 이터레이션하는 비동기 제너레이터를 정의합니다. 이 제너레이터는 `async for`를 통해 이터레이션되며, 특정 시점에서 이터레이션이 중단됩니다.

`square_series()` 제너레이터는 가비지 컬렉션될 것이며, 제너레이터를 비동기적으로 닫는 메커니즘이 없으면 Python 인터프리터는 아무것도 할 수 없습니다.

이 문제를 해결하기 위해 다음을 제안합니다.

*   비동기 제너레이터에 특별한 `awaitable`을 반환하는 `aclose` 메서드를 구현합니다. 이 메서드를 `await`하면 정지된 제너레이터에 `GeneratorExit` 예외를 발생시키고, `GeneratorExit` 또는 `StopAsyncIteration`이 발생할 때까지 이터레이션합니다.
    이는 일반 Python 제너레이터에 `close()` 메서드가 하는 일과 매우 유사하지만, `aclose()`를 실행하려면 이벤트 루프가 필요하다는 점이 다릅니다.
*   비동기 제너레이터가 `finally` 블록에서 `yield` 표현식을 실행할 때 `RuntimeError`를 발생시킵니다 (그러나 `await`를 사용하는 것은 괜찮습니다).

    ```python
    async def gen():
        try:
            yield
        finally:
            await asyncio.sleep(1) # 'await' 사용 가능.
            yield # 'yield' 사용 불가,
                  # 이 줄은 RuntimeError를 발생시킵니다.
    ```
*   `sys` 모듈에 `set_asyncgen_hooks()` 및 `get_asyncgen_hooks()` 두 가지 새로운 메서드를 추가합니다.

    `sys.set_asyncgen_hooks()`의 아이디어는 이벤트 루프가 비동기 제너레이터의 이터레이션 및 종료를 가로챌 수 있도록 하여, 최종 사용자가 종료 문제에 신경 쓸 필요 없이 모든 것이 작동하도록 하는 것입니다.

    `sys.set_asyncgen_hooks()`는 두 가지 인수를 허용합니다.
    *   `firstiter`: 비동기 제너레이터가 처음 이터레이션될 때 호출될 호출 가능 객체(callable).
    *   `finalizer`: 비동기 제너레이터가 가비지 컬렉션되기 직전에 호출될 호출 가능 객체.

    비동기 제너레이터가 처음 이터레이션될 때, 현재 `finalizer`에 대한 참조를 저장합니다.
    비동기 제너레이터가 가비지 컬렉션되기 직전에 캐시된 `finalizer`를 호출합니다. `finalizer`는 이터레이션이 시작될 때 활성화된 루프와 함께 `aclose()` 호출을 스케줄링할 것이라고 가정합니다.

    예를 들어, `asyncio`가 비동기 제너레이터의 안전한 종료를 허용하도록 수정되는 방법은 다음과 같습니다.

    ```python
    # asyncio/base_events.py
    class BaseEventLoop:
        def run_forever(self):
            ...
            old_hooks = sys.get_asyncgen_hooks()
            sys.set_asyncgen_hooks(finalizer=self._finalize_asyncgen)
            try:
                ...
            finally:
                sys.set_asyncgen_hooks(*old_hooks)
            ...

        def _finalize_asyncgen(self, gen):
            self.create_task(gen.aclose())
    ```

    두 번째 인수 `firstiter`는 이벤트 루프가 자체 제어하에 인스턴스화된 비동기 제너레이터의 약한 집합(weak set)을 유지 관리할 수 있도록 합니다. 이를 통해 모든 열려있는 제너레이터를 안전하게 종료하고 이벤트 루프를 닫는 "종료(shutdown)" 메커니즘을 구현할 수 있습니다.

    `sys.set_asyncgen_hooks()`는 스레드별(thread-specific)이므로, 여러 이벤트 루프가 병렬 스레드에서 안전하게 사용할 수 있습니다.

    `sys.get_asyncgen_hooks()`는 `firstiter` 및 `finalizer` 필드를 가진 namedtuple과 유사한 구조를 반환합니다.

#### `asyncio`

`asyncio` 이벤트 루프는 `sys.set_asyncgen_hooks()` API를 사용하여 스케줄링된 모든 비동기 제너레이터의 약한 집합을 유지하고, 제너레이터가 가비지 컬렉션될 시점에 `aclose()` 코루틴 메서드를 스케줄링합니다.

`asyncio` 프로그램이 스케줄링된 모든 비동기 제너레이터를 안정적으로 종료할 수 있도록 하기 위해, 새로운 이벤트 루프 코루틴 메서드 `loop.shutdown_asyncgens()`를 추가할 것을 제안합니다. 이 메서드는 현재 열려있는 모든 비동기 제너레이터를 `aclose()` 호출로 닫도록 스케줄링합니다.

`loop.shutdown_asyncgens()` 메서드를 호출한 후, 이벤트 루프는 새로운 비동기 제너레이터가 처음 이터레이션될 때마다 경고를 발생시킬 것입니다. 이는 모든 비동기 제너레이터를 종료하도록 요청한 후에는 프로그램이 새로운 비동기 제너레이터를 이터레이션하는 코드를 실행해서는 안 된다는 아이디어입니다.

`shutdown_asyncgens` 코루틴을 사용하는 예시입니다.

```python
try:
    loop.run_forever()
finally:
    loop.run_until_complete(loop.shutdown_asyncgens())
    loop.close()
```

#### 비동기 제너레이터 객체 (Asynchronous Generator Object)

이 객체는 표준 Python 제너레이터 객체를 모델로 합니다. 본질적으로 비동기 제너레이터의 동작은 동기 제너레이터의 동작을 복제하도록 설계되었으며, 유일한 차이점은 API가 비동기라는 점입니다.

다음 메서드와 속성이 정의됩니다.

*   `agen.__aiter__()`: `agen`을 반환합니다.
*   `agen.__anext__()`: `await`될 때 하나의 비동기 제너레이터 이터레이션을 수행하는 `awaitable`을 반환합니다.
*   `agen.asend(val)`: `val` 객체를 `agen` 제너레이터로 푸시하는 `awaitable`을 반환합니다. `agen`이 아직 이터레이션되지 않은 경우, `val`은 `None`이어야 합니다.

    예시:

    ```python
    async def gen():
        await asyncio.sleep(0.1)
        v = yield 42
        print(v)
        await asyncio.sleep(0.2)

    g = gen()
    await g.asend(None) # 0.1초 동안 sleep 후 42를 반환합니다.
    await g.asend('hello') # 'hello'를 출력하고
                           # StopAsyncIteration을 발생시킵니다.
                           # (0.2초 동안 sleep 후)
    ```

*   `agen.athrow(typ, [val, [tb]])`: 예외를 `agen` 제너레이터로 던지는 `awaitable`을 반환합니다.

    예시:

    ```python
    async def gen():
        try:
            await asyncio.sleep(0.1)
            yield 'hello'
        except ZeroDivisionError:
            await asyncio.sleep(0.2)
            yield 'world'

    g = gen()
    v = await g.asend(None)
    print(v) # 0.1초 동안 sleep 후 'hello'를 출력합니다.
    v = await g.athrow(ZeroDivisionError)
    print(v) # 0.2초 동안 sleep 후 'world'를 출력합니다.
    ```

*   `agen.aclose()`: `GeneratorExit` 예외를 제너레이터로 던지는 `awaitable`을 반환합니다. `awaitable`은 `agen`이 예외를 처리했다면 `yield`된 값을 반환할 수 있고, 그렇지 않으면 `agen`이 닫히고 예외는 호출자(caller)에게 다시 전파됩니다.
*   `agen.__name__` 및 `agen.__qualname__`: 읽고 쓸 수 있는 이름 및 정규화된 이름(qualified name) 속성입니다.
*   `agen.ag_await`: `agen`이 현재 `await`하고 있는 객체 또는 `None`입니다. 이는 제너레이터의 `gi_yieldfrom` 및 코루틴의 `cr_await`와 유사합니다.
*   `agen.ag_frame`, `agen.ag_running`, `agen.ag_code`: 표준 제너레이터의 유사한 속성과 동일한 방식으로 정의됩니다.

`StopIteration`과 `StopAsyncIteration`은 비동기 제너레이터 밖으로 전파되지 않으며, `RuntimeError`로 대체됩니다.

#### 구현 세부 정보 (Implementation Details)

비동기 제너레이터 객체(`PyAsyncGenObject`)는 `PyGenObject`와 구조 레이아웃을 공유합니다. 또한, 참조 구현은 세 가지 새로운 객체를 도입합니다.

*   `PyAsyncGenASend`: `__anext__` 및 `asend()` 메서드를 구현하는 `awaitable` 객체입니다.
*   `PyAsyncGenAThrow`: `athrow()` 및 `aclose()` 메서드를 구현하는 `awaitable` 객체입니다.
*   `_PyAsyncGenWrappedValue`: 비동기 제너레이터에서 직접 `yield`된 모든 객체는 암시적으로 이 구조로 묶입니다. 이를 통해 제너레이터 구현은 일반 이터레이션 프로토콜을 사용하여 `yield`된 객체와 비동기 이터레이션 프로토콜을 사용하여 `yield`된 객체를 분리할 수 있습니다.

`PyAsyncGenASend`와 `PyAsyncGenAThrow`는 `awaitable` 객체이며(`__await__` 메서드가 `self`를 반환함), 코루틴과 유사한 객체입니다(`__iter__`, `__next__`, `send()`, `throw()` 메서드를 구현함). 본질적으로 이들은 비동기 제너레이터가 어떻게 이터레이션되는지를 제어합니다.

##### `PyAsyncGenASend` 및 `PyAsyncGenAThrow`

`PyAsyncGenASend`는 `__anext__` 및 `asend()` 메서드를 구동하고 비동기 이터레이션 프로토콜을 구현하는 코루틴과 유사한 객체입니다.
`agen.asend(val)` 및 `agen.__anext__()`는 `PyAsyncGenASend` 인스턴스(부모 `agen` 객체에 대한 참조를 유지)를 반환합니다.

데이터 흐름은 다음과 같이 정의됩니다.

*   `PyAsyncGenASend.send(val)`이 처음 호출되면, `val`은 부모 `agen` 객체로 푸시됩니다(`PyGenObject`의 기존 기능을 사용).
*   `PyAsyncGenASend` 객체에 대한 후속 이터레이션은 `None`을 `agen`으로 푸시합니다.
*   `_PyAsyncGenWrappedValue` 객체가 `yield`되면, 언박싱(unboxed)되고, 래핑되지 않은(unwrapped) 값을 인수로 하는 `StopIteration` 예외가 발생합니다.
*   `PyAsyncGenASend.throw(*exc)`가 처음 호출되면, `*exc`가 부모 `agen` 객체로 던져집니다.
*   `PyAsyncGenASend` 객체에 대한 후속 이터레이션은 `None`을 `agen`으로 푸시합니다.
*   `_PyAsyncGenWrappedValue` 객체가 `yield`되면, 언박싱되고, 래핑되지 않은 값을 인수로 하는 `StopIteration` 예외가 발생합니다.
*   비동기 제너레이터의 `return` 문은 `StopAsyncIteration` 예외를 발생시키며, 이는 `PyAsyncGenASend.send()` 및 `PyAsyncGenASend.throw()` 메서드를 통해 전파됩니다.

`PyAsyncGenAThrow`는 `PyAsyncGenASend`와 매우 유사합니다. 유일한 차이점은 `PyAsyncGenAThrow.send()`가 처음 호출될 때 부모 `agen` 객체에 예외를 던진다는 것입니다(값을 푸시하는 대신).

#### 새로운 표준 라이브러리 함수 및 타입 (New Standard Library Functions and Types)

*   `types.AsyncGeneratorType` – 비동기 제너레이터 객체의 타입입니다.
*   `sys.set_asyncgen_hooks()` 및 `sys.get_asyncgen_hooks()` 메서드는 이벤트 루프에서 비동기 제너레이터의 종료자(finalizers) 및 이터레이션 가로채기(interceptors)를 설정하는 데 사용됩니다.
*   `inspect.isasyncgen()` 및 `inspect.isasyncgenfunction()` 인트로스펙션(introspection) 함수.
*   `asyncio` 이벤트 루프의 새로운 메서드: `loop.shutdown_asyncgens()`.
*   새로운 `collections.abc.AsyncGenerator` 추상 기본 클래스(abstract base class).

#### 하위 호환성 (Backwards Compatibility)

이 제안은 완벽하게 하위 호환됩니다.
Python 3.5에서는 `yield` 표현식이 포함된 `async def` 함수를 정의하는 것이 `SyntaxError`이므로, 3.6에서 비동기 제너레이터를 도입하는 것은 안전합니다.

#### 성능 (Performance)

##### 일반 제너레이터 (Regular Generators)

일반 제너레이터에는 성능 저하가 없습니다. 다음 마이크로 벤치마크는 CPython에서 비동기 제너레이터 유무에 관계없이 동일한 속도로 실행됩니다.

```python
def gen():
    i = 0
    while i < 100000000:
        yield i
        i += 1
list(gen())
```

##### 비동기 이터레이터 대비 개선점 (Improvements over asynchronous iterators)

다음 마이크로 벤치마크는 비동기 제너레이터가 순수 Python으로 구현된 비동기 이터레이터보다 약 2.3배 빠름을 보여줍니다.

```python
N = 10 ** 7

async def agen():
    for i in range(N):
        yield i

class AIter:
    def __init__(self):
        self.i = 0
    def __aiter__(self):
        return self
    async def __anext__(self):
        i = self.i
        if i >= N:
            raise StopAsyncIteration
        self.i += 1
        return i
```

### 설계 고려 사항 (Design Considerations)

#### `aiter()` 및 `anext()` 내장 함수 (aiter() and anext() builtins)

원래 PEP 492는 `__aiter__`를 `awaitable` 객체를 반환해야 하는 메서드로 정의하여 비동기 이터레이터를 생성하도록 했습니다.
그러나 CPython 3.5.2에서 `__aiter__`는 비동기 이터레이터를 직접 반환하도록 재정의되었습니다. 하위 호환성을 깨는 것을 피하기 위해, Python 3.6에서는 두 가지 방식 모두를 지원하며, `__aiter__`가 여전히 `awaitable`을 반환할 수 있지만 `DeprecationWarning`이 발행되도록 결정되었습니다.

Python 3.6에서 `__aiter__`의 이러한 이중적인 특성 때문에 `aiter()` 내장 함수의 동기 구현을 추가할 수 없습니다. 따라서 Python 3.7까지 기다릴 것을 제안합니다.

#### 비동기 리스트/딕셔너리/세트 컴프리헨션 (Asynchronous list/dict/set comprehensions)

비동기 컴프리헨션(comprehensions)의 문법은 비동기 제너레이터 메커니즘과 관련이 없으며, 별도의 PEP에서 고려되어야 합니다.

#### 비동기 `yield from` (Asynchronous yield from)

비동기 제너레이터에 `yield from` 지원을 구현하는 것이 이론적으로 가능하지만, 제너레이터 구현을 심각하게 재설계해야 합니다.
`yield from`은 비동기 제너레이터에 덜 중요합니다. 코루틴 위에 다른 코루틴 프로토콜을 구현하는 메커니즘을 제공할 필요가 없기 때문입니다. 비동기 제너레이터를 구성하기 위해 간단한 `async for` 루프를 사용할 수 있습니다.

```python
async def g1():
    yield 1
    yield 2

async def g2():
    async for v in g1():
        yield v
```

#### `asend()` 및 `athrow()` 메서드가 필요한 이유 (Why the asend() and athrow() methods are necessary)

이 메서드들은 `contextlib.contextmanager`와 유사한 개념을 비동기 제너레이터를 사용하여 구현할 수 있게 합니다. 예를 들어, 제안된 설계로 다음 패턴을 구현할 수 있습니다.

```python
@async_context_manager
async def ctx():
    await open()
    try:
        yield
    finally:
        await close()

async with ctx():
    await ...
```

또 다른 이유는 `__anext__` 객체에서 반환된 객체를 사용하여 비동기 제너레이터로 데이터를 푸시하고 예외를 던지는 것이 가능하지만, 이를 올바르게 수행하기는 어렵다는 것입니다. 명시적인 `asend()` 및 `athrow()`를 추가하면 이를 안전하게 수행할 수 있는 길을 열어줄 것입니다.

구현 측면에서 `asend()`는 `__anext__`의 약간 더 일반적인 버전이며, `athrow()`는 `aclose()`와 매우 유사합니다. 따라서 비동기 제너레이터에 이러한 메서드를 정의해도 추가적인 복잡성은 발생하지 않습니다.

### 예시 (Example)

현재 참조 구현을 사용한 작동 예시 (0부터 9까지의 숫자를 1초 간격으로 출력합니다):

```python
async def ticker(delay, to):
    for i in range(to):
        yield i
        await asyncio.sleep(delay)

async def run():
    async for i in ticker(1, 10):
        print(i)

import asyncio
loop = asyncio.get_event_loop()
try:
    loop.run_until_complete(run())
finally:
    loop.close()
```

### 승인 (Acceptance)

PEP 525는 2016년 9월 6일 Guido에 의해 승인되었습니다.

### 구현 (Implementation)

구현은 이슈 28003에서 추적됩니다. 참조 구현 Git 저장소는에서 확인할 수 있습니다.

### 참고 자료 (References)

 https://github.com/1st1/cpython/tree/async_gen
 https://mail.python.org/pipermail/python-dev/2016-September/146267.html
 http://bugs.python.org/issue28003

### 감사 (Acknowledgments)

이 PEP에 대한 피드백, 코드 검토 및 토론에 대해 Guido van Rossum, Victor Stinner, Elvis Pranskevichus, Nathaniel Smith, Łukasz Langa, Andrew Svetlov 및 기타 여러 사람들에게 감사드립니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.