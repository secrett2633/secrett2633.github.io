---
title: "[Final] PEP 492 - Coroutines with async and await syntax"
excerpt: "Python Enhancement Proposal 492: 'Coroutines with async and await syntax'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/492/
toc: true
toc_sticky: true
date: 2025-09-26 22:37:54+0900
last_modified_at: 2025-09-26 22:37:54+0900
published: true
---
> **원문 링크:** [PEP 492 - Coroutines with async and await syntax](https://peps.python.org/pep-0492/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 09-Apr-2015

## PEP 492 – `async` 및 `await` 구문을 사용한 코루틴

**저자:** Yury Selivanov
**상태:** Final
**유형:** Standards Track
**생성일:** 2015년 4월 9일
**Python 버전:** 3.5

### 초록 (Abstract)

인터넷의 성장과 전반적인 연결성 증가는 반응성(responsive)과 확장성(scalable) 있는 코드에 대한 필요성을 비례적으로 증가시켰습니다. 이 제안은 명시적인 비동기(asynchronous), 동시성(concurrent) Python 코드를 더 쉽게 작성하고 Pythonic하게 만들어서 이러한 요구에 부응하는 것을 목표로 합니다.

이 PEP는 코루틴(coroutines)을 Python의 적절한 독립 개념으로 만들고 새로운 지원 구문을 도입할 것을 제안합니다. 궁극적인 목표는 Python에서 비동기 프로그래밍에 대한 공통적이고 쉽게 접근할 수 있는 사고 모델을 확립하고 이를 동기 프로그래밍에 최대한 가깝게 만드는 것입니다.

이 PEP는 비동기 작업이 `stdlib` 모듈 `asyncio.events.AbstractEventLoop`와 유사한 이벤트 루프(Event Loop)에 의해 스케줄링되고 조정된다고 가정합니다. 이 PEP는 특정 이벤트 루프 구현에 얽매이지 않지만, `yield`를 스케줄러에 대한 신호(signal)로 사용하여 이벤트(예: I/O)가 완료될 때까지 코루틴이 대기할 것임을 나타내는 종류의 코루틴에만 관련됩니다.

이 제안의 변경 사항은 빠르게 성장하는 비동기 프로그래밍 분야에서 Python이 관련성을 유지하고 경쟁력을 갖추는 데 도움이 될 것으로 예상됩니다. 많은 다른 언어들도 유사한 기능을 채택했거나 채택할 계획이기 때문입니다.

### API 설계 및 구현 수정 (API Design and Implementation Revisions)

Python 3.5 초기 베타 릴리스에 대한 피드백 결과, 이 PEP를 지원하는 객체 모델이 재설계되어 네이티브 코루틴(native coroutines)을 제너레이터(generators)와 더 명확하게 분리했습니다. 이제 네이티브 코루틴은 새로운 종류의 제너레이터가 아닌, 완전히 별개의 고유한 타입입니다. 이 변경은 주로 Tornado 웹 서버에 네이티브 코루틴 지원을 통합하려는 시도에서 발생한 문제들 때문에 구현되었습니다.

CPython 3.5.2에서는 `__aiter__` 프로토콜이 업데이트되었습니다. 3.5.2 이전에는 `__aiter__`가 비동기 이터레이터(asynchronous iterator)로 확인되는 awaitable을 반환해야 했습니다. 3.5.2부터 `__aiter__`는 비동기 이터레이터를 직접 반환해야 합니다. 3.5.2에서 이전 프로토콜을 사용하면 `PendingDeprecationWarning`이 발생합니다. CPython 3.6에서는 이전 `__aiter__` 프로토콜이 `DeprecationWarning`과 함께 계속 지원됩니다. CPython 3.7에서는 이전 `__aiter__` 프로토콜이 더 이상 지원되지 않으며, `__aiter__`가 비동기 이터레이터 이외의 것을 반환하면 `RuntimeError`가 발생합니다.

### 근거 및 목표 (Rationale and Goals)

현재 Python은 PEP 342를 통해 제너레이터(generators)를 이용한 코루틴 구현을 지원하며, PEP 380에 도입된 `yield from` 구문을 통해 더욱 강화되었습니다. 하지만 이 접근 방식에는 몇 가지 단점이 있습니다:

*   코루틴과 일반 제너레이터가 동일한 구문을 공유하기 때문에 혼동하기 쉽습니다. 특히 새로운 개발자에게는 더욱 그렇습니다.
*   함수가 코루틴인지 여부는 본문에 `yield` 또는 `yield from` 문이 있는지 여부로 결정되는데, 이는 리팩토링(refactoring) 중에 이러한 문이 함수 본문에 나타나거나 사라질 때 명확하지 않은 오류로 이어질 수 있습니다.
*   비동기 호출 지원은 `yield`가 문법적으로 허용되는 표현식으로 제한되어 `with` 및 `for` 문과 같은 구문 기능의 유용성을 제한합니다.

이 제안은 코루틴을 Python 언어의 네이티브(native) 기능으로 만들고, 제너레이터와 명확하게 분리합니다. 이는 제너레이터/코루틴의 모호성을 제거하고, 특정 라이브러리에 의존하지 않고 코루틴을 안정적으로 정의할 수 있게 합니다. 또한 린터(linters)와 IDE가 정적 코드 분석 및 리팩토링을 개선할 수 있도록 합니다.

네이티브 코루틴과 관련 새 구문 기능을 통해 컨텍스트 관리자(context manager) 및 이터레이션(iteration) 프로토콜을 비동기적으로 정의할 수 있습니다. 이 제안에서 나중에 보여주듯이, 새로운 `async with` 문을 사용하면 Python 프로그램이 런타임 컨텍스트(runtime context)에 진입하고 종료할 때 비동기 호출을 수행할 수 있으며, 새로운 `async for` 문을 사용하면 이터레이터(iterators)에서 비동기 호출을 수행할 수 있습니다.

### 명세 (Specification)

이 제안은 Python의 코루틴 지원을 강화하기 위한 새로운 구문과 의미론을 소개합니다.

이 명세는 Python의 코루틴 구현(PEP 342 및 PEP 380)에 대한 지식을 전제로 합니다. 여기서 제안된 구문 변경에 대한 동기는 `asyncio` 프레임워크(PEP 3156)와 "Cofunctions" 제안(PEP 3152, 현재 이 명세에 찬성하여 거부됨)에서 비롯됩니다.

이 문서의 이 시점부터 우리는 새로운 구문을 사용하여 선언된 함수를 지칭하기 위해 **네이티브 코루틴(native coroutine)**이라는 단어를 사용합니다. 제너레이터 구문에 기반한 코루틴을 지칭할 필요가 있을 때는 **제너레이터 기반 코루틴(generator-based coroutine)**이 사용됩니다. 두 정의 모두 적용 가능한 맥락에서는 **코루틴(coroutine)**이 사용됩니다.

#### 새로운 코루틴 선언 구문 (New Coroutine Declaration Syntax)

네이티브 코루틴을 선언하는 데 다음의 새로운 구문이 사용됩니다:

```python
async def read_data(db):
    pass
```

코루틴의 주요 특징은 다음과 같습니다:

*   `async def` 함수는 `await` 표현식을 포함하지 않더라도 항상 코루틴입니다.
*   `async` 함수 내에 `yield` 또는 `yield from` 표현식이 있는 것은 `SyntaxError`입니다.
*   내부적으로 두 개의 새로운 코드 객체 플래그가 도입되었습니다:
    *   `CO_COROUTINE`은 네이티브 코루틴(새 구문으로 정의됨)을 표시하는 데 사용됩니다.
    *   `CO_ITERABLE_COROUTINE`은 제너레이터 기반 코루틴을 네이티브 코루틴과 호환되게 만드는 데 사용됩니다(`types.coroutine()` 함수에 의해 설정됨).
*   일반 제너레이터는 호출될 때 제너레이터 객체를 반환하는 것과 유사하게, 코루틴은 코루틴 객체를 반환합니다.
*   `StopIteration` 예외는 코루틴 밖으로 전파되지 않으며, `RuntimeError`로 대체됩니다. 일반 제너레이터의 경우 이러한 동작은 `__future__` import를 필요로 합니다 (PEP 479 참조).
*   네이티브 코루틴이 가비지 컬렉션될 때, 한 번도 `await`되지 않았다면 `RuntimeWarning`이 발생합니다 (디버깅 기능 참조).

#### `types.coroutine()`

`types` 모듈에 새로운 함수 `coroutine(fn)`이 추가됩니다. 이 함수는 `asyncio`의 기존 제너레이터 기반 코루틴과 이 PEP에 의해 도입된 네이티브 코루틴 간의 상호 운용성을 허용합니다:

```python
@types.coroutine
def process_data(db):
    data = yield from read_data(db)
    # ...
```

이 함수는 제너레이터 함수의 코드 객체에 `CO_ITERABLE_COROUTINE` 플래그를 적용하여 코루틴 객체를 반환하도록 만듭니다. `fn`이 제너레이터 함수가 아닌 경우, 래핑됩니다. 제너레이터를 반환하는 경우, awaitable 프록시 객체로 래핑됩니다 (awaitable 객체 정의 참조). `CO_COROUTINE` 플래그는 `types.coroutine()`에 의해 적용되지 않아 새로운 구문으로 정의된 네이티브 코루틴과 제너레이터 기반 코루틴을 분리할 수 있도록 합니다.

#### `await` 표현식 (Await Expression)

코루틴 실행 결과를 얻기 위해 다음의 새로운 `await` 표현식이 사용됩니다:

```python
async def read_data(db):
    data = await db.fetch('SELECT ...')
    # ...
```

`await`는 `yield from`과 유사하게 `db.fetch` awaitable이 완료되고 결과 `data`를 반환할 때까지 `read_data` 코루틴의 실행을 일시 중단합니다. 이는 인수의 유효성을 검사하는 추가 단계와 함께 `yield from` 구현을 사용합니다. `await`는 다음 중 하나인 awaitable만 허용합니다:

*   네이티브 코루틴 함수에서 반환된 네이티브 코루틴 객체.
*   `types.coroutine()`으로 데코레이트된 함수에서 반환된 제너레이터 기반 코루틴 객체.
*   이터레이터(iterator)를 반환하는 `__await__` 메서드를 가진 객체.

`yield from` 호출 체인은 항상 `yield`로 끝납니다. 이는 Futures가 구현되는 근본적인 메커니즘입니다. 내부적으로 코루틴은 특별한 종류의 제너레이터이므로, 모든 `await`는 `await` 호출 체인의 어딘가에서 `yield`에 의해 일시 중단됩니다 (자세한 설명은 PEP 3156 참조).

코루틴에 이 동작을 활성화하기 위해 `__await__`라는 새로운 매직 메서드가 추가됩니다. 예를 들어 `asyncio`에서 `Future` 객체를 `await` 문에서 사용할 수 있도록 하려면 `asyncio.Future` 클래스에 `__await__ = __iter__` 줄을 추가하는 것만으로 충분합니다. 이 PEP의 나머지 부분에서 `__await__` 메서드를 가진 객체를 `Future-like objects`라고 부릅니다.

`__await__`가 이터레이터가 아닌 다른 것을 반환하면 `TypeError`가 발생합니다. CPython C API로 정의된 객체는 `__await__` 메서드와 유사하게 이터레이터를 반환하는 `tp_as_async.am_await` 함수를 가질 수 있습니다. `async def` 함수 외부에서 `await`를 사용하는 것은 `SyntaxError`입니다 ( `def` 함수 외부에서 `yield`를 사용하는 것이 `SyntaxError`인 것과 같습니다). awaitable 객체가 아닌 다른 것을 `await` 표현식에 전달하는 것은 `TypeError`입니다.

**업데이트된 연산자 우선순위 표 (Updated operator precedence table)**

`await` 키워드는 다음과 같이 정의됩니다:

```
power ::= await ["**" u_expr]
await ::= ["await"] primary
```

여기서 "primary"는 언어의 가장 강력하게 바인딩된 연산을 나타냅니다. `await` 연산자의 우선순위는 `[]`, `()`, `.`보다 낮지만 `**` 연산자보다 높도록 결정되었습니다.

**`await` 표현식의 예시 (Examples of “await” expressions)**

유효한 구문 예시:

```python
if await fut: pass
pair = await fut, 'spam'
with await fut, open(): pass
await foo()['spam'].baz()()
return await coro()
res = await coro() ** 2
func(a1=await coro(), a2=0)
await foo() + await bar()
-await foo()
```

유효하지 않은 구문 예시 (수정 제안과 함께):

```python
# Expression           Should be written as
# await await coro()   await (await coro())
# await -coro()        await (-coro())
```

#### 비동기 컨텍스트 관리자 및 `async with` (Asynchronous Context Managers and “async with”)

비동기 컨텍스트 관리자는 `enter` 및 `exit` 메서드에서 실행을 일시 중단할 수 있는 컨텍스트 관리자입니다. 이를 가능하게 하기 위해 비동기 컨텍스트 관리자를 위한 새로운 프로토콜이 제안됩니다. `__aenter__` 및 `__aexit__`라는 두 가지 새로운 매직 메서드가 추가됩니다. 둘 다 awaitable을 반환해야 합니다.

비동기 컨텍스트 관리자의 예시:

```python
class AsyncContextManager:
    async def __aenter__(self):
        await log('entering context')
    async def __aexit__(self, exc_type, exc, tb):
        await log('exiting context')
```

**새 구문 (New Syntax)**

비동기 컨텍스트 관리자를 위한 새로운 문장이 제안됩니다:

```python
async with EXPR as VAR:
    BLOCK
```

이는 의미론적으로 다음과 동일합니다:

```python
mgr = (EXPR)
aexit = type(mgr).__aexit__
aenter = type(mgr).__aenter__
VAR = await aenter(mgr)
try:
    BLOCK
except:
    if not await aexit(mgr, *sys.exc_info()):
        raise
else:
    await aexit(mgr, None, None, None)
```

일반 `with` 문과 마찬가지로, 단일 `async with` 문에서 여러 컨텍스트 관리자를 지정할 수 있습니다. `__aenter__` 및 `__aexit__` 메서드가 없는 일반 컨텍스트 관리자를 `async with`에 전달하는 것은 오류입니다. `async def` 함수 외부에서 `async with`를 사용하는 것은 `SyntaxError`입니다.

#### 비동기 이터레이터 및 `async for` (Asynchronous Iterators and “async for”)

비동기 이터러블(asynchronous iterable)은 `iter` 구현에서 비동기 코드를 호출할 수 있으며, 비동기 이터레이터는 `next` 메서드에서 비동기 코드를 호출할 수 있습니다. 비동기 이터레이션을 지원하려면:

*   객체는 비동기 이터레이터 객체를 반환하는 `__aiter__` 메서드를 구현해야 합니다 (또는 CPython C API로 정의된 경우 `tp_as_async.am_aiter` 슬롯).
*   비동기 이터레이터 객체는 awaitable을 반환하는 `__anext__` 메서드를 구현해야 합니다 (또는 CPython C API로 정의된 경우 `tp_as_async.am_anext` 슬롯).
*   이터레이션을 중지하려면 `__anext__`는 `StopAsyncIteration` 예외를 발생시켜야 합니다.

비동기 이터러블의 예시:

```python
class AsyncIterable:
    def __aiter__(self):
        return self
    async def __anext__(self):
        data = await self.fetch_data()
        if data:
            return data
        else:
            raise StopAsyncIteration
    async def fetch_data(self):
        # ...
```

**새 구문 (New Syntax)**

비동기 이터레이터를 통해 반복하기 위한 새로운 문장이 제안됩니다:

```python
async for TARGET in ITER:
    BLOCK
else:
    BLOCK2
```

이는 의미론적으로 다음과 동일합니다:

```python
iter = (ITER)
iter = type(iter).__aiter__(iter)
running = True
while running:
    try:
        TARGET = await type(iter).__anext__(iter)
    except StopAsyncIteration:
        running = False
    else:
        BLOCK
else:
    BLOCK2
```

`__aiter__` 메서드가 없는 일반 이터러블을 `async for`에 전달하는 것은 `TypeError`입니다. `async def` 함수 외부에서 `async for`를 사용하는 것은 `SyntaxError`입니다. 일반 `for` 문과 마찬가지로 `async for`는 선택적 `else` 절을 가집니다.

**왜 `StopAsyncIteration`인가? (Why StopAsyncIteration?)**

코루틴은 내부적으로 여전히 제너레이터에 기반합니다. PEP 479 이전에는 `def g1(): yield from fut; return 'spam'`과 `def g2(): yield from fut; raise StopIteration('spam')` 사이에 근본적인 차이가 없었습니다. PEP 479가 승인되어 코루틴에 기본적으로 활성화되었기 때문에, `async def a1(): await fut; raise StopIteration('spam')`과 같은 예시에서는 `StopIteration`이 `RuntimeError`로 래핑됩니다.

외부 코드에 이터레이션이 종료되었음을 알리는 유일한 방법은 `StopIteration` 이외의 다른 예외를 발생시키는 것입니다. 따라서 새로운 내장 예외 클래스 `StopAsyncIteration`이 추가되었습니다. 더욱이, PEP 479의 의미론에 따라 코루틴에서 발생한 모든 `StopIteration` 예외는 `RuntimeError`로 래핑됩니다.

#### 코루틴 객체 (Coroutine objects)

이 섹션은 `CO_COROUTINE` 플래그가 있는 네이티브 코루틴, 즉 새로운 `async def` 구문으로 정의된 코루틴에만 적용됩니다. `asyncio`의 기존 **제너레이터 기반 코루틴**의 동작은 변경되지 않습니다. 코루틴과 제너레이터가 별개의 개념으로 다루어지도록 많은 노력이 기울여졌습니다:

*   네이티브 코루틴 객체는 `__iter__` 및 `__next__` 메서드를 구현하지 않습니다. 따라서 `iter()`, `list()`, `tuple()` 및 다른 내장 함수를 통해 반복하거나 전달할 수 없습니다. 또한 `for..in` 루프에서 사용할 수 없습니다.
*   네이티브 코루틴 객체에 `__iter__` 또는 `__next__`를 사용하려고 시도하면 `TypeError`가 발생합니다.
*   일반 제너레이터는 네이티브 코루틴에서 `yield from`을 사용할 수 없습니다. 그렇게 하면 `TypeError`가 발생합니다.
*   제너레이터 기반 코루틴(`asyncio` 코드는 `@asyncio.coroutine`으로 데코레이트되어야 함)은 네이티브 코루틴 객체에서 `yield from`을 사용할 수 있습니다.
*   `inspect.isgenerator()` 및 `inspect.isgeneratorfunction()`은 네이티브 코루틴 객체 및 네이티브 코루틴 함수에 대해 `False`를 반환합니다.

**코루틴 객체 메서드 (Coroutine object methods)**

코루틴은 내부적으로 제너레이터에 기반하므로 구현을 공유합니다. 제너레이터 객체와 마찬가지로 코루틴은 `throw()`, `send()`, `close()` 메서드를 가집니다. `StopIteration` 및 `GeneratorExit`는 코루틴에 대해 동일한 역할을 수행합니다 (비록 PEP 479가 코루틴에 기본적으로 활성화되어 있지만). `throw()`, `send()` 메서드는 `Future-like objects`에 값을 푸시하고 오류를 발생시키는 데 사용됩니다.

#### 디버깅 기능 (Debugging Features)

초보적인 실수는 코루틴에서 `yield from`을 사용하는 것을 잊는 것입니다:

```python
@asyncio.coroutine
def useful():
    asyncio.sleep(1) # 'yield from' 없이는 아무것도 하지 않습니다.
```

이러한 종류의 실수를 디버깅하기 위해 `asyncio`에는 특별한 디버그 모드가 있습니다. 이 모드에서 `@coroutine` 데코레이터는 모든 함수를 소멸자(destructor)로 경고를 기록하는 특수 객체로 래핑합니다. 래핑된 제너레이터가 가비지 컬렉션될 때마다, 데코레이터 함수가 정확히 어디에 정의되었는지, 컬렉션된 위치의 스택 트레이스(stack trace) 등에 대한 정보를 담은 자세한 로깅 메시지가 생성됩니다. 래퍼(wrapper) 객체는 또한 제너레이터에 대한 자세한 정보와 함께 편리한 `__repr__` 함수를 제공합니다.

이러한 디버그 기능을 활성화하는 방법이 문제입니다. 디버그 기능은 프로덕션 모드에서는 아무런 작동을 하지 않아야 하므로, `@coroutine` 데코레이터는 OS 환경 변수 `PYTHONASYNCIODEBUG`를 기반으로 래핑 여부를 결정합니다. 이 방식으로 `asyncio` 자체 함수가 계측된 `asyncio` 프로그램을 실행할 수 있습니다. `EventLoop.set_debug`는 다른 디버그 기능이며, `@coroutine` 데코레이터의 동작에는 영향을 미치지 않습니다.

이 제안을 통해 코루틴은 제너레이터와 구별되는 네이티브 개념이 됩니다. 한 번도 `await`되지 않은 코루틴에 대해 `RuntimeWarning`이 발생하는 것 외에도, `sys` 모듈에 두 개의 새로운 함수를 추가할 것이 제안됩니다: `set_coroutine_wrapper` 및 `get_coroutine_wrapper`. 이는 `asyncio` 및 다른 프레임워크(예: 코루틴이 정확히 어디에서 생성되었는지 표시하거나, 가비지 컬렉션된 위치의 더 자세한 스택 트레이스 표시)에서 고급 디버깅 기능을 활성화하기 위함입니다.

#### 새로운 표준 라이브러리 함수 (New Standard Library Functions)

*   `types.coroutine(gen)`: 자세한 내용은 `types.coroutine()` 섹션 참조.
*   `inspect.iscoroutine(obj)`: `obj`가 네이티브 코루틴 객체이면 `True`를 반환.
*   `inspect.iscoroutinefunction(obj)`: `obj`가 네이티브 코루틴 함수이면 `True`를 반환.
*   `inspect.isawaitable(obj)`: `obj`가 awaitable이면 `True`를 반환.
*   `inspect.getcoroutinestate(coro)`: 네이티브 코루틴 객체의 현재 상태를 반환 (`inspect.getfgeneratorstate(gen)`를 미러링).
*   `inspect.getcoroutinelocals(coro)`: 네이티브 코루틴 객체의 로컬 변수와 해당 값의 매핑을 반환 (`inspect.getgeneratorlocals(gen)`를 미러링).
*   `sys.set_coroutine_wrapper(wrapper)`: 네이티브 코루틴 객체 생성을 가로챌 수 있도록 합니다. `wrapper`는 하나의 인자(코루틴 객체)를 받는 호출 가능 객체이거나 `None`이어야 합니다. `None`은 래퍼를 재설정합니다. 두 번 호출되면 새 래퍼가 이전 래퍼를 대체합니다. 이 함수는 스레드별(thread-specific)입니다.
*   `sys.get_coroutine_wrapper()`: 현재 래퍼 객체를 반환합니다. 래퍼가 설정되지 않은 경우 `None`을 반환합니다. 이 함수는 스레드별입니다.

#### 새로운 추상 기본 클래스 (New Abstract Base Classes)

기존 프레임워크(예: Tornado) 및 컴파일러(예: Cython)와의 더 나은 통합을 허용하기 위해 두 개의 새로운 추상 기본 클래스(ABC)가 추가됩니다:

*   `collections.abc.Awaitable`: `__await__` 메서드를 구현하는 `Future-like classes`를 위한 ABC.
*   `collections.abc.Coroutine`: `send(value)`, `throw(type, exc, tb)`, `close()`, `__await__()` 메서드를 구현하는 코루틴 객체를 위한 ABC.

`CO_ITERABLE_COROUTINE` 플래그가 있는 제너레이터 기반 코루틴은 `__await__` 메서드를 구현하지 않으므로, `collections.abc.Coroutine` 및 `collections.abc.Awaitable` ABC의 인스턴스가 아닙니다:

```python
@types.coroutine
def gencoro():
    yield
assert not isinstance(gencoro(), collections.abc.Coroutine)
# 하지만:
assert inspect.isawaitable(gencoro())
```

객체가 비동기 이터레이션을 지원하는지 쉽게 테스트할 수 있도록 두 개의 ABC가 더 추가됩니다:

*   `collections.abc.AsyncIterable`: `__aiter__` 메서드를 테스트합니다.
*   `collections.abc.AsyncIterator`: `__aiter__` 및 `__anext__` 메서드를 테스트합니다.

#### 용어 설명 (Glossary)

*   **Native coroutine function (네이티브 코루틴 함수):** `async def`로 선언된 코루틴 함수. `await` 및 `return value`를 사용합니다.
*   **Native coroutine (네이티브 코루틴):** 네이티브 코루틴 함수에서 반환됩니다.
*   **Generator-based coroutine function (제너레이터 기반 코루틴 함수):** 제너레이터 구문에 기반한 코루틴. `@asyncio.coroutine`으로 데코레이트된 함수가 가장 일반적인 예시입니다.
*   **Generator-based coroutine (제너레이터 기반 코루틴):** 제너레이터 기반 코루틴 함수에서 반환됩니다.
*   **Coroutine (코루틴):** 네이티브 코루틴 또는 제너레이터 기반 코루틴.
*   **Coroutine object (코루틴 객체):** 네이티브 코루틴 객체 또는 제너레이터 기반 코루틴 객체.
*   **Future-like object (퓨처 유사 객체):** `__await__` 메서드를 가진 객체, 또는 `tp_as_async->am_await` 함수를 가진 C 객체로 이터레이터를 반환합니다. 코루틴의 `await` 표현식에 의해 소비될 수 있습니다. 퓨처 유사 객체를 기다리는 코루틴은 퓨처 유사 객체의 `__await__`가 완료되고 결과를 반환할 때까지 일시 중단됩니다.
*   **Awaitable (어웨이터블):** 퓨처 유사 객체 또는 코루틴 객체.
*   **Asynchronous context manager (비동기 컨텍스트 관리자):** `__aenter__` 및 `__aexit__` 메서드를 가지며 `async with`와 함께 사용할 수 있습니다.
*   **Asynchronous iterable (비동기 이터러블):** 비동기 이터레이터 객체를 반환해야 하는 `__aiter__` 메서드를 가진 객체. `async for`와 함께 사용할 수 있습니다.
*   **Asynchronous iterator (비동기 이터레이터):** `__anext__` 메서드를 가집니다.

#### 전환 계획 (Transition Plan)

`async` 및 `await` 키워드와의 하위 호환성 문제를 피하기 위해 `tokenizer.c`를 다음과 같이 수정하기로 결정했습니다:

*   `async def NAME` 토큰 조합을 인식합니다.
*   `async def` 블록을 토큰화하는 동안, `'async'` `NAME` 토큰을 `ASYNC`로, `'await'` `NAME` 토큰을 `AWAIT`로 대체합니다.
*   `def` 블록을 토큰화하는 동안, `'async'` 및 `'await'` `NAME` 토큰을 그대로 반환합니다.

이 접근 방식은 새로운 구문 기능(모두 `async` 함수에서만 사용 가능)과 기존 코드의 원활한 조합을 허용합니다.

```python
class Spam:
    async = 42
    async def ham():
        print(getattr(Spam, 'async')) # 코루틴이 실행되어 '42'를 출력합니다.
```

#### 하위 호환성 (Backwards Compatibility)

이 제안은 100% 하위 호환성을 유지합니다.

**asyncio**

`asyncio` 모듈은 코루틴 및 새로운 문과 함께 작동하도록 조정되고 테스트되었습니다. 하위 호환성은 100% 유지됩니다. 즉, 모든 기존 코드는 그대로 작동합니다.

필요한 변경 사항은 주로 다음과 같습니다:

*   `@asyncio.coroutine` 데코레이터를 새로운 `types.coroutine()` 함수를 사용하도록 수정합니다.
*   `asyncio.Future` 클래스에 `__await__ = __iter__` 줄을 추가합니다.
*   `async()` 함수의 별칭으로 `ensure_future()`를 추가합니다.
*   `async()` 함수를 Deprecate합니다.

**asyncio 마이그레이션 전략 (asyncio migration strategy)**

일반 제너레이터는 네이티브 코루틴 객체에서 `yield from`을 사용할 수 없으므로(자세한 내용은 제너레이터와의 차이점 섹션 참조), 새로운 구문을 사용하기 전에 모든 제너레이터 기반 코루틴이 `@asyncio.coroutine`으로 데코레이트되었는지 확인하는 것이 좋습니다.

#### 문법 업데이트 (Grammar Updates)

문법 변경은 상당히 미미합니다:

```
decorated: decorators (classdef | funcdef | async_funcdef)
async_funcdef: ASYNC funcdef
compound_stmt: (if_stmt | while_stmt | for_stmt | try_stmt | with_stmt | funcdef | classdef | decorated | async_stmt)
async_stmt: ASYNC (funcdef | with_stmt | for_stmt)
power: atom_expr ['**' factor]
atom_expr: [AWAIT] atom trailer*
```

#### 폐지 계획 (Deprecation Plans)

`async` 및 `await` 이름은 CPython 3.5 및 3.6에서 소프트하게 폐지됩니다. 3.7에서는 이들을 적절한 키워드로 전환할 것입니다. 3.7 이전에 `async` 및 `await`를 적절한 키워드로 만들면 사람들이 코드를 Python 3으로 포팅하기 더 어려워질 수 있습니다.

#### 설계 고려 사항 (Design Considerations)

**왜 `async`와 `await` 키워드인가 (Why “async” and “await” keywords)**

`async/await`는 프로그래밍 언어에서 새로운 개념이 아닙니다.

*   C#은 오래 전부터 이 기능을 가지고 있습니다.
*   ECMAScript 7에 `async/await`를 추가하려는 제안이 있습니다.
*   Facebook의 Hack/HHVM.
*   Google의 Dart 언어.
*   Scala.
*   C++에 `async/await`를 추가하려는 제안이 있습니다.
*   그리고 다른 많은 덜 인기 있는 언어들에도 존재합니다.

이는 일부 사용자들이 이미 `async/await` 경험이 있고, 한 프로젝트에서 여러 언어(예: Python과 ECMAScript 7)를 함께 사용하는 것을 더 쉽게 만들기 때문에 큰 이점입니다.

**왜 `async` 키워드가 중요한가 (Importance of “async” keyword)**

`await` 표현식만 구현하고 최소한 하나의 `await`를 가진 모든 함수를 코루틴으로 처리하는 것도 가능하지만, 이 접근 방식은 API 설계, 코드 리팩토링 및 장기적인 지원을 더 어렵게 만듭니다.

Python에 `await` 키워드만 있다고 가정해 봅시다:

```python
def useful():
    # ...
    await log(...)
    # ...

def important():
    await useful()
```

만약 `useful()` 함수가 리팩토링되어 누군가 그 안의 모든 `await` 표현식을 제거한다면, 그것은 일반 Python 함수가 될 것이고, `important()`를 포함하여 그 함수에 의존하는 모든 코드가 망가질 것입니다. 이 문제를 완화하려면 `@asyncio.coroutine`과 유사한 데코레이터를 도입해야 합니다.

**왜 `async def`인가 (Why “async def”)**

일부 사람들에게는 `async name(): pass`와 같은 간단한 구문이 `async def name(): pass`보다 더 매력적으로 보일 수 있습니다. 분명히 타이핑하기 더 쉽습니다. 그러나 다른 한편으로는 `async def`, `async with`, `async for` 사이의 대칭을 깨뜨립니다. 여기서 `async`는 문장이 비동기임을 나타내는 수식어(modifier)입니다. 또한 기존 문법과 더 일관성이 있습니다.

**왜 매직 메서드는 "a"로 시작하는가 (Why magic methods start with “a”)**

새로운 비동기 매직 메서드 `__aiter__`, `__anext__`, `__aenter__`, `__aexit__`는 모두 동일한 접두사 "a"로 시작합니다. 대안 제안은 "async" 접두사를 사용하여 `__anext__`를 `__async_next__`로 만드는 것이었습니다. 그러나 새로운 매직 메서드를 `__radd__` 및 `__iadd__`와 같은 기존 메서드와 일치시키기 위해 더 짧은 버전을 사용하기로 결정했습니다.

**왜 기존 매직 이름을 재사용하지 않는가 (Why not reuse existing magic names)**

새로운 비동기 이터레이터 및 컨텍스트 관리자에 대한 대안 아이디어는 선언에 `async` 키워드를 추가하여 기존 매직 메서드를 재사용하는 것이었습니다:

```python
class CM:
    async def __enter__(self): # __aenter__ 대신
        # ...
```

이 접근 방식에는 다음과 같은 단점이 있습니다:

*   `with` 및 `async with` 문 모두에서 작동하는 객체를 생성할 수 없습니다.
*   Python <= 3.4에서는 `__enter__` 및/또는 `__exit__`에서 `Future-like objects`를 반환하는 것을 금지하지 않으므로 하위 호환성을 깨뜨릴 수 있습니다.
*   이 제안의 주요 목적 중 하나는 네이티브 코루틴을 가능한 한 간단하고 오류 방지(foolproof)로 만드는 것이므로, 프로토콜을 명확하게 분리하는 것이 중요합니다.

**왜 기존 `for` 및 `with` 문을 재사용하지 않는가 (Why not reuse existing “for” and “with” statements)**

기존 제너레이터 기반 코루틴과 이 제안의 비전은 사용자가 코드가 언제 일시 중단될 수 있는지 쉽게 파악할 수 있도록 하는 것입니다. 기존 `for` 및 `with` 문이 비동기 이터레이터 및 컨텍스트 관리자를 인식하도록 만들면 필연적으로 암시적인 일시 중단 지점(suspend points)이 생성되어 코드를 추론하기 더 어려워질 것입니다.

### 성능 (Performance)

**전반적인 영향 (Overall Impact)**

이 제안은 관찰 가능한 성능 영향을 도입하지 않습니다.

### 구현 (Implementation)

PEP 492는 2015년 5월 5일 Guido에 의해 승인되었습니다. 구현은 이슈 24017에서 추적되었으며, 2015년 5월 11일에 커밋되었습니다.

**주요 변경 사항 및 새로운 프로토콜 목록 (List of high-level changes and new protocols)**

*   코루틴 정의를 위한 새 구문: `async def` 및 새 키워드 `await`.
*   `Future-like objects`를 위한 새 `__await__` 메서드, `PyTypeObject`의 새 `tp_as_async.am_await` 슬롯.
*   비동기 컨텍스트 관리자를 위한 새 구문: `async with` 및 `__aenter__`, `__aexit__` 메서드와 관련된 프로토콜.
*   비동기 이터레이션을 위한 새 구문: `async for` 및 `__aiter__`, `__anext__` 메서드, 새 내장 예외 `StopAsyncIteration`과 관련된 프로토콜.
*   `PyTypeObject`의 새 `tp_as_async.am_aiter` 및 `tp_as_async.am_anext` 슬롯.
*   새로운 AST 노드: `AsyncFunctionDef`, `AsyncFor`, `AsyncWith`, `Await`.
*   새로운 함수: `sys.set_coroutine_wrapper(callback)`, `sys.get_coroutine_wrapper()`, `types.coroutine(gen)`, `inspect.iscoroutinefunction(func)`, `inspect.iscoroutine(obj)`, `inspect.isawaitable(obj)`, `inspect.getcoroutinestate(coro)`, `inspect.getcoroutinelocals(coro)`.
*   코드 객체를 위한 새 `CO_COROUTINE` 및 `CO_ITERABLE_COROUTINE` 비트 플래그.
*   새로운 ABC: `collections.abc.Awaitable`, `collections.abc.Coroutine`, `collections.abc.AsyncIterable`, `collections.abc.AsyncIterator`.
*   C API 변경: 새 `PyCoro_Type` (Python에 `types.CoroutineType`으로 노출) 및 `PyCoroObject`. `PyCoro_CheckExact(*o)`로 `o`가 네이티브 코루틴인지 테스트.

이 변경 사항 및 새로운 요소 목록이 짧지는 않지만, 대부분의 사용자가 이러한 기능을 직접 사용하지 않을 것이라는 점을 이해하는 것이 중요합니다. 이는 프레임워크와 라이브러리에서 사용되어 `async def`, `await`, `async for`, `async with` 구문을 통해 사용자에게 편리하고 모호하지 않은 API를 제공하기 위한 것입니다.

**작동 예시 (Working example)**

이 PEP에서 제안된 모든 개념은 구현되었으며 테스트할 수 있습니다.

```python
import asyncio

async def echo_server():
    print('Serving on localhost:8000')
    await asyncio.start_server(handle_connection, 'localhost', 8000)

async def handle_connection(reader, writer):
    print('New connection...')
    while True:
        data = await reader.read(8192)
        if not data:
            break
        print('Sending {:.10}... back'.format(repr(data)))
        writer.write(data)

loop = asyncio.get_event_loop()
loop.run_until_complete(echo_server())
try:
    loop.run_forever()
finally:
    loop.close()
```

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.