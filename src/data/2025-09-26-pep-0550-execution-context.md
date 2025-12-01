---
title: "[Withdrawn] PEP 550 - Execution Context"
excerpt: "Python Enhancement Proposal 550: 'Execution Context'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/550/
toc: true
toc_sticky: true
date: 2025-09-26 23:36:24+0900
last_modified_at: 2025-09-26 23:36:24+0900
published: true
---
> **원문 링크:** [PEP 550 - Execution Context](https://peps.python.org/pep-0550/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 11-Aug-2017

PEP 550 – Execution Context 문서를 한국어로 번역하고 요약합니다.

## PEP 550: 실행 컨텍스트 (Execution Context) - 폐기됨 (Withdrawn)

**요약:**
PEP 550은 Python 제너레이터(generator) 및 코루틴(coroutine)과 같이 순서가 뒤섞인 실행(out-of-order execution) 환경에서 비-지역(non-local) 상태에 일관되게 접근할 수 있도록 하는 새로운 일반적인 메커니즘을 추가하려고 제안했습니다. `threading.local()`과 같은 스레드-지역 저장소(Thread-local storage, TLS)는 동일한 OS 스레드 내에서 동시(concurrently)에 실행되는 프로그램에는 부적합하다는 문제점을 해결하고자 했습니다.

하지만 이 PEP는 광범위한 내용과 일부 측면에 대한 합의 부족으로 인해 폐기되었으며, 더 단순화된 PEP 567로 대체되었습니다. PEP 567은 동일한 핵심 아이디어를 구현했지만, `ContextVar` 지원을 비동기 태스크(asynchronous tasks)로 제한하고 제너레이터의 동작은 변경하지 않았습니다. 제너레이터 동작에 대한 내용은 향후 PEP에서 다시 논의될 수 있습니다.

---

### 1. 도입 배경 (Rationale)

Python에서 비동기 프로그래밍이 등장하기 전에는 OS 스레드를 사용하여 동시성을 달성했습니다. `threading.local()`과 그에 상응하는 C-API `PyThreadState_GetDict()`는 스레드-고유 상태(thread-specific state)의 필요성을 해결했습니다.

TLS가 일반적으로 사용되는 몇 가지 예시는 다음과 같습니다.
*   `decimal` 컨텍스트, `numpy.errstate`, `warnings.catch_warnings`와 같은 컨텍스트 관리자(Context managers).
*   웹 애플리케이션의 보안 토큰, 요청 데이터, `gettext`의 언어 컨텍스트 등 요청 관련 데이터.
*   대규모 코드베이스의 프로파일링, 트레이싱 및 로깅.

하지만 TLS는 단일 스레드 내에서 동시적으로 실행되는 프로그램에는 제대로 작동하지 않습니다. Python 제너레이터는 동시 프로그램의 가장 간단한 예입니다.

**문제 예시:** `decimal` 모듈의 정밀도 설정
`decimal.localcontext()`는 스레드-로컬(thread-local)로 컨텍스트를 저장하기 때문에, 여러 제너레이터가 동시에 반복될 경우 상태가 손상됩니다.

```python
import decimal

def fractions(precision, x, y):
    with decimal.localcontext() as ctx:
        ctx.prec = precision
        yield decimal.Decimal(x) / decimal.Decimal(y)
        yield decimal.Decimal(x) / decimal.Decimal(y ** 2)

g1 = fractions(precision=2, x=1, y=3)
g2 = fractions(precision=6, x=2, y=3)
items = list(zip(g1, g2))

# 예상 결과: [(Decimal('0.33'), Decimal('0.666667')), (Decimal('0.11'), Decimal('0.222222'))]
# 실제 결과: [(Decimal('0.33'), Decimal('0.666667')), (Decimal('0.111111'), Decimal('0.222222'))]
```
위 예시에서 `g1`이 먼저 실행되어 `precision=2`로 설정되지만, `g2`가 실행될 때 `precision=6`으로 변경되어 `g1`의 두 번째 `yield`에서 `g2`의 컨텍스트를 사용하게 되어 예상치 못한 결과가 발생합니다. `Decimal`의 경우, 현재 유일한 해결책은 모든 산술 연산에 명시적인 컨텍스트 메서드 호출을 사용하는 것입니다. 이는 오버로드된 연산자(overloaded operators)의 유용성을 저해하고 코드를 읽고 쓰기 어렵게 만듭니다.

코루틴(Coroutines) 또한 TLS의 신뢰성 문제가 심각한 또 다른 Python 코드 클래스입니다. 비동기 코드에서 TLS의 부적절함은 범위가 제한적이고 필요한 모든 사용 사례를 지원하지 않는 임시방편적인 해결책들이 난립하게 만들었습니다.

`.NET` 런타임은 `async/await`를 지원하며, 이 문제에 대한 일반적인 솔루션으로 `ExecutionContext`를 가지고 있습니다.

### 2. 목표 (Goals)

PEP 550의 목표는 `threading.local()`을 대체할 보다 신뢰할 수 있는 메커니즘을 제공하는 것이었습니다.
*   코루틴 및 제너레이터의 비-지역 상태(non-local state) 문제를 해결하기 위한 메커니즘과 API 제공.
*   `decimal` 및 `numpy`와 같은 사용자가 기존 메커니즘과의 하위 호환성(backwards compatibility)을 깨뜨릴 위험을 최소화하면서 새로운 메커니즘으로 전환할 수 있도록 동기 코드(synchronous code)에 TLS와 유사한 의미론(semantics)을 구현.
*   C 확장(C extensions)을 포함하여 기존 코드나 새로운 메커니즘을 사용할 코드에 성능 영향이 없거나 무시할 수 있는 수준이어야 함.

---

### 3. 상위 수준 사양 (High-Level Specification)

이 PEP의 전체 사양은 세 부분으로 나뉩니다.
*   **상위 수준 사양 (High-Level Specification):** 전반적인 해결책에 대한 설명.
*   **세부 사양 (Detailed Specification):** 새로운 개념, API 및 표준 라이브러리의 관련 변경 사항에 대한 완전한 설명.
*   **구현 세부 사항 (Implementation Details):** 이 PEP를 구현하는 데 사용된 데이터 구조 및 알고리즘과 CPython에 필요한 변경 사항에 대한 설명 및 분석.

이 섹션에서는 **실행 컨텍스트(Execution Context, EC)** 를 동시 실행 환경에서 내용에 일관되게 접근할 수 있도록 하는 비-지역 상태의 불투명한 컨테이너(opaque container)로 정의합니다.

**컨텍스트 변수(context variable)** 는 실행 컨텍스트 내의 값을 나타내는 객체입니다. `contextvars.ContextVar(name)` 호출은 새로운 컨텍스트 변수 객체를 생성합니다. 컨텍스트 변수 객체는 세 가지 메서드를 가집니다.
*   `get()`: 현재 실행 컨텍스트에서 변수의 값을 반환합니다.
*   `set(value)`: 현재 실행 컨텍스트에서 변수의 값을 설정합니다.
*   `delete()`: 변수 상태를 복원하는 데 사용될 수 있으며, 목적과 의미론은 `Setting and restoring context variables` 섹션에서 설명됩니다.

#### 3.1. 일반 단일 스레드 코드 (Regular Single-threaded Code)

제너레이터나 코루틴을 포함하지 않는 일반적인 단일 스레드 코드에서 컨텍스트 변수는 전역 변수(globals)처럼 동작합니다.

```python
import contextvars

var = contextvars.ContextVar('var')

def sub():
    assert var.get() == 'main'
    var.set('sub')

def main():
    var.set('main')
    sub()
    assert var.get() == 'sub' # sub()에서 변경된 값이 유지됨

main()
```


#### 3.2. 다중 스레드 코드 (Multithreaded Code)

다중 스레드 코드에서 컨텍스트 변수는 스레드-로컬(thread locals)처럼 동작합니다.

```python
import contextvars
import threading

var = contextvars.ContextVar('var')

def sub():
    assert var.get() is None # 각 새 스레드에 대해 실행 컨텍스트는 비어 있음.
    var.set('sub')

def main():
    var.set('main')
    thread = threading.Thread(target=sub)
    thread.start()
    thread.join()
    assert var.get() == 'main' # main 스레드의 값은 변경되지 않음.

main()
```


#### 3.3. 제너레이터 (Generators)

일반 함수 호출과 달리 제너레이터는 실행 제어권을 호출자에게 협력적으로 양보할 수 있습니다. 또한 제너레이터는 양보 후에 실행이 어디서 계속될지 제어하지 않습니다. 임의의 코드 위치에서 재개될 수 있습니다.

이러한 이유로 제너레이터의 동작은 다음과 같습니다.
*   컨텍스트 변수에 대한 변경 사항은 항상 지역적(local)이며 외부 컨텍스트에서는 보이지 않지만, 제너레이터에 의해 호출되는 코드에는 보입니다.
*   일단 제너레이터 내에서 설정되면, 컨텍스트 변수는 반복 사이에 변경되지 않음을 보장합니다.
*   외부 컨텍스트(제너레이터가 반복되는 곳)에서 컨텍스트 변수에 대한 변경 사항은, 해당 변수들이 제너레이터 내부에서 또한 수정되지 않았다면 제너레이터에 보입니다.

**예시 재검토 (decimal precision):**

```python
import decimal
import contextvars

# 새로운 컨텍스트 변수 생성
decimal_ctx = contextvars.ContextVar('decimal context')

# PEP 550 이전 Decimal은 TLS에 의존했지만,
# 여기서는 실행 컨텍스트를 사용하도록 monkey-patching하여 예시를 만듦.
# 실제 수정은 C 구현도 업데이트해야 함.
def patched_setcontext(context):
    decimal_ctx.set(context)

def patched_getcontext():
    ctx = decimal_ctx.get()
    if ctx is None:
        ctx = decimal.Context()
        decimal_ctx.set(ctx)
    return ctx

decimal.setcontext = patched_setcontext
decimal.getcontext = patched_getcontext

# Decimal 클래스 대신 MyDecimal을 사용했다고 가정 (예시를 위해)
class MyDecimal(decimal.Decimal):
    pass

def fractions(precision, x, y):
    with decimal.localcontext() as ctx: # 이제 contextvars.ContextVar를 사용
        ctx.prec = precision
        yield MyDecimal(x) / MyDecimal(y)
        yield MyDecimal(x) / MyDecimal(y ** 2)

g1 = fractions(precision=2, x=1, y=3)
g2 = fractions(precision=6, x=2, y=3)
items = list(zip(g1, g2))

# 예상 결과와 일치:
# [(Decimal('0.33'), Decimal('0.666667')), (Decimal('0.11'), Decimal('0.222222'))]
```

이 예시에서는 `decimal_ctx`가 `ContextVar`로 구현되어, 각 제너레이터(`g1`, `g2`)가 고유한 컨텍스트를 가지게 되어 예상대로 동작합니다. 즉, `g1`에서 `precision=2`로 설정된 컨텍스트가 `g2`의 `precision=6` 설정에 의해 오염되지 않습니다.

#### 3.4. 코루틴 및 비동기 태스크 (Coroutines and Asynchronous Tasks)

제너레이터와 마찬가지로 코루틴도 제어권을 양보하고 다시 얻을 수 있습니다. 제너레이터와의 주요 차이점은 코루틴이 즉시 호출자에게 제어권을 양보하지 않는다는 것입니다. 대신, 전체 코루틴 호출 스택(await로 연결된 코루틴들)이 다른 코루틴 호출 스택으로 전환됩니다. 이러한 점에서 코루틴을 `await`하는 것은 개념적으로 일반 함수 호출과 유사하며, 코루틴 체인(또는 `asyncio.Task`와 같은 "태스크")은 개념적으로 스레드와 유사합니다.

이러한 유사성으로부터 코루틴의 컨텍스트 변수는 "태스크-로컬(task locals)"처럼 동작해야 한다고 결론 내립니다.
*   코루틴 내에서 컨텍스트 변수에 대한 변경 사항은 해당 코루틴을 `await`하는 코루틴에 보입니다.
*   `await`하기 전에 호출자(caller)에서 이루어진 컨텍스트 변수 변경 사항은 `await`된 코루틴에 보입니다.
*   한 태스크에서 이루어진 컨텍스트 변수 변경 사항은 다른 태스크에서는 보이지 않습니다.
*   다른 태스크에 의해 생성된 태스크는 부모 태스크(parent task)로부터 실행 컨텍스트를 상속받지만, 자식 태스크가 생성된 후 부모 태스크에서 이루어진 컨텍스트 변수 변경 사항은 보이지 않습니다.

마지막 지점은 OS 스레드와 다른 동작을 보여줍니다. OS 스레드는 기본적으로 실행 컨텍스트를 상속하지 않습니다. 주요 이유는 일반적인 사용 의도에 있습니다. 태스크는 종종 태스크를 생성한 코드와 논리적으로 연결된 비교적 짧게 실행되는 작업에 사용됩니다(예: `asyncio`에서 타임아웃이 있는 코루틴 실행). 반면에 OS 스레드는 일반적으로 장기 실행되고 논리적으로 분리된 코드에 사용됩니다.

하위 호환성과 관련하여, 실행 컨텍스트가 `threading.local()`처럼 동작하기를 원합니다. 이는 라이브러리들이 TLS 대신 실행 컨텍스트를 사용하여 기존 코드와의 호환성을 깨뜨릴 위험을 줄일 수 있도록 하기 위함입니다.

**단일 태스크 내 컨텍스트 변수 전파 예시:**

```python
import asyncio
import contextvars

var = contextvars.ContextVar('var')

async def main():
    var.set('main')
    await sub() # sub()의 효과가 보임
    assert var.get() == 'sub'

async def sub():
    assert var.get() == 'main'
    var.set('sub')
    assert var.get() == 'sub'

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```


**태스크 간 컨텍스트 변수 전파 예시:**

```python
import asyncio
import contextvars

var = contextvars.ContextVar('var')

async def main():
    var.set('main')
    loop.create_task(sub()) # sub()의 비동기 실행을 스케줄링
    assert var.get() == 'main'
    var.set('main changed') # 태스크 생성 후 var 변경

async def sub():
    # sleep으로 인해 main()에서 "var"가 수정된 후 sub()가 실행됨.
    await asyncio.sleep(1)
    # "var"의 값은 main()에서 상속받지만, 태스크가 생성된 후
    # main()에서 이루어진 "var"에 대한 변경 사항은 *보이지 않음*.
    assert var.get() == 'main'
    # 이 변경 사항은 sub()에 지역적이며, main()을 포함한 다른 태스크에는 보이지 않음.
    var.set('sub')

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```

위 예시에서 볼 수 있듯이, 실행 컨텍스트에 대한 변경 사항은 태스크에 지역적(local)이며, 태스크는 생성 시점에 실행 컨텍스트의 스냅샷(snapshot)을 얻습니다.

---

### 4. 세부 사양 (Detailed Specification)

개념적으로 실행 컨텍스트(EC)는 논리 컨텍스트(Logical Context, LC) 스택입니다. 각 Python 스레드당 항상 하나의 활성 EC가 존재합니다.
논리 컨텍스트(LC)는 특정 LC 내에서 컨텍스트 변수(context variables)를 해당 값에 매핑하는 것입니다.

컨텍스트 변수 객체는 `contextvars.ContextVar(name: str)`를 호출하여 생성됩니다. `name` 인수의 값은 EC 메커니즘에서 사용되지 않지만, 디버깅 및 인트로스펙션(introspection)에 사용될 수 있습니다.

컨텍스트 변수 객체는 다음과 같은 메서드와 속성을 가집니다.
*   `.name`: `ContextVar()`에 전달된 값.
*   `.get(*, topmost=False, default=None)`:
    *   `topmost`가 `False`(기본값)이면, 실행 컨텍스트를 위에서 아래로 순회하며 변수 값을 찾습니다.
    *   `topmost`가 `True`이면, 최상위 논리 컨텍스트(topmost logical context)에서 변수 값을 반환합니다.
    *   변수 값을 찾지 못하면 `default` 값을 반환합니다.
*   `.set(value)`: 최상위 논리 컨텍스트에서 변수 값을 설정합니다.
*   `.delete()`: 최상위 논리 컨텍스트에서 변수를 제거합니다. `set()` 호출 이전의 상태로 논리 컨텍스트를 복원할 때 유용합니다 (예: 컨텍스트 관리자에서).

#### 4.1. 제너레이터 (Generators)

생성될 때 각 제너레이터 객체는 자체 `__logical_context__` 속성에 빈 논리 컨텍스트 객체를 가집니다. 이 논리 컨텍스트는 각 제너레이터 반복 시작 시 실행 컨텍스트에 푸시되고, 끝날 때 팝됩니다.

#### 4.2. `contextlib.contextmanager`

`contextlib.contextmanager()` 데코레이터는 제너레이터를 컨텍스트 관리자로 변환하는 데 사용될 수 있습니다. 이 데코레이터는 `genobj.__logical_context__`를 `None`으로 설정하여, 제너레이터가 실행 컨텍스트 스택을 수정하는 것을 방지하도록 변경됩니다. 이렇게 함으로써 `with` 블록 내부에서 컨텍스트 변수 수정이 올바르게 이루어지게 합니다.

#### 4.3. 컨텍스트 변수 열거 (Enumerating context vars)

`ExecutionContext.vars()` 메서드는 실행 컨텍스트에 값을 가지는 `ContextVar` 객체 목록을 반환합니다. 이 메서드는 주로 인트로스펙션 및 로깅에 유용합니다.

#### 4.4. 코루틴 (coroutines)

CPython에서 코루틴은 제너레이터와 구현을 공유합니다. 차이점은 코루틴의 `__logical_context__`가 기본적으로 `None`이라는 것입니다. 이는 `async def` 코루틴과 `@types.coroutine`으로 데코레이트된 구식 제너레이터 기반 코루틴 모두에 영향을 미칩니다.

#### 4.5. 비동기 제너레이터 (Asynchronous Generators)

비동기 제너레이터의 실행 컨텍스트 의미론은 일반 제너레이터와 다르지 않습니다.

#### 4.6. `asyncio`

`asyncio`는 `Loop.call_soon`, `Loop.call_later`, `Loop.call_at`을 사용하여 함수의 비동기 실행을 스케줄링합니다. `asyncio.Task`는 `call_soon()`을 사용하여 래핑된 코루틴을 실행합니다.

`Loop.call_{at,later,soon}`은 새로운 선택적 `execution_context` 키워드 인수를 받도록 수정됩니다. 이 인수는 기본적으로 현재 실행 컨텍스트의 복사본으로 설정됩니다.
`contextvars.get_execution_context()` 함수는 현재 실행 컨텍스트의 얕은 복사본(shallow copy)을 반환합니다.
`contextvars.run_with_execution_context(ec, func, *args, **kwargs)` 함수는 `ec`를 실행 컨텍스트로 사용하여 `func(*args, **kwargs)`를 실행합니다.

#### 4.7. 이터레이터로 변환된 제너레이터 (Generators Transformed into Iterators)

모든 Python 제너레이터는 동등한 이터레이터로 표현될 수 있습니다. `contextvars.LogicalContext()` 함수는 새로운 빈 논리 컨텍스트를 생성하며, `contextvars.run_with_logical_context(lc, func, *args, **kwargs)` 함수는 지정된 논리 컨텍스트 내에서 함수를 실행하는 데 사용될 수 있습니다.

---

### 5. 구현 (Implementation)

실행 컨텍스트는 논리 컨텍스트의 불변 연결 리스트(immutable linked list)로 구현되며, 각 논리 컨텍스트는 불변 약한 키 매핑(immutable weak key mapping)입니다. 현재 활성 실행 컨텍스트에 대한 포인터는 OS 스레드 상태에 저장됩니다.

논리 컨텍스트는 기본적으로 `dict` 대신 `Hash Array Mapped Trie (HAMT)`를 사용하여 구현됩니다. HAMT는 O(log N)의 `set()` 연산을 제공하며, `get_execution_context()`의 스쿼싱(squashing)은 HAMT의 구조적 공유(structural sharing)로 인해 평균적으로 더 효율적입니다.

`ContextVar.get()` 메서드는 성능에 민감한 코드 경로(예: `numpy` 및 `decimal`)에서 효율적인 접근을 위해 캐시(cache)를 사용합니다. 캐시 히트(cache hit) 시 O(1) 연산이 됩니다.

---

### 6. 성능 고려 사항 (Performance Considerations)

이 PEP의 이전 버전 기반 참조 구현 테스트 결과, 제너레이터 마이크로벤치마크(microbenchmarks)에서 1-2%의 속도 저하를 보였고, 매크로벤치마크(macrobenchmarks)에서는 눈에 띄는 차이가 없었습니다. 제너레이터 및 비동기 코드가 아닌 코드의 성능에는 이 PEP의 영향을 받지 않습니다.

---

### 7. 새로운 API 요약 (Summary of the New APIs)

이 PEP는 다음과 같은 새로운 Python API를 도입했습니다.

** Python API:**
*   새로운 `contextvars.ContextVar(name: str='...')` 클래스:
    *   읽기 전용 `.name` 속성.
    *   `.get()` 메서드: 현재 실행 컨텍스트에서 변수 값을 반환.
    *   `.set()` 메서드: 현재 논리 컨텍스트에서 변수 값을 설정.
    *   `.delete()` 메서드: 현재 논리 컨텍스트에서 변수 값을 제거.
*   새로운 `contextvars.ExecutionContext()` 클래스: 실행 컨텍스트를 나타냄.
*   새로운 `contextvars.LogicalContext()` 클래스: 논리 컨텍스트를 나타냄.
*   `contextvars.get_execution_context()` 함수: 현재 실행 컨텍스트의 복사본을 나타내는 `ExecutionContext` 인스턴스를 반환.
*   `contextvars.run_with_execution_context(ec: ExecutionContext, func, *args, **kwargs)` 함수: 제공된 실행 컨텍스트로 `func`를 실행.
*   `contextvars.run_with_logical_context(lc: LogicalContext, func, *args, **kwargs)` 함수: 현재 실행 컨텍스트 위에 제공된 논리 컨텍스트로 `func`를 실행.

** C API:** (생략, Python 개발자를 위한 한국어 번역 지침에 따라 상세 내용은 제외하고 요약)
`PyContext_NewVar`, `PyContext_GetValue`, `PyContext_SetValue`, `PyContext_DelValue`, `PyLogicalContext_New`, `PyExecutionContext_New`, `PyExecutionContext_Get`, `PyContext_SetCurrent` 등 해당 기능에 대응하는 C API가 도입되었습니다.

---

### 8. 설계 고려 사항 (Design Considerations)

*   **`yield from`은 컨텍스트 변경 사항을 누설해야 하는가?**
    아니요. `yield from`은 함수 호출과 의미론적으로 동등하며 컨텍스트 변경 사항을 누설해야 한다고 주장할 수 있지만, 제너레이터 내에서 이루어진 컨텍스트 변경 사항이 `next(gen)`에서는 누설되지 않고 `yield from gen`에서는 누설된다는 두 가지 요구 사항을 동시에 만족하는 것은 불가능합니다.
    따라서, 제너레이터 내의 컨텍스트 변경 사항을 항상 격리하는 것이 유일하게 잘 정의되고 일관된 동작입니다.

*   **`PyThreadState_GetDict()`는 실행 컨텍스트를 사용해야 하는가?**
    아니요. `PyThreadState_GetDict`는 TLS 기반이며, 그 의미론을 변경하면 하위 호환성을 깨뜨릴 것입니다.

*   **PEP 521과의 관계:**
    PEP 521은 컨텍스트 관리자 프로토콜을 `__suspend__()` 및 `__resume__()` 메서드로 확장하는 대안적인 해결책을 제안했습니다. 이는 제너레이터 및 코루틴에서 올바르게 동작하는 비-지역 상태를 관리하는 컨텍스트 관리자를 구현할 수 있도록 합니다. 그러나 이 접근 방식은 컨텍스트 관리자 프로토콜과 인터프리터 구현에 상당한 복잡성을 추가하며, 제너레이터 및 코루틴의 성능에 부정적인 영향을 미칠 가능성이 있습니다. 또한 PEP 521의 해결책은 컨텍스트 관리자로 제한되며, 비동기 태스크 및 콜백에서 상태를 전파하는 메커니즘을 제공하지 않습니다.

*   **CPython 수정 없이 실행 컨텍스트를 구현할 수 있는가?**
    아니요. "태스크-로컬(task-locals)" 개념은 라이브러리에서 코루틴에 대해 구현될 수 있지만, 제너레이터는 Python 인터프리터에 의해 직접 관리되므로 그 컨텍스트 또한 인터프리터에 의해 관리되어야 합니다. 또한 실행 컨텍스트는 서드파티 모듈에서 전혀 구현될 수 없으며, 그렇지 않으면 `decimal`을 포함한 표준 라이브러리가 이에 의존할 수 없을 것입니다.

*   **`sys.displayhook` 및 기타 API를 EC를 사용하도록 업데이트해야 하는가?**
    `sys.stdout`를 덮어쓰거나 `sys.displayhook` 함수를 덮어쓰는 것과 같은 API는 설계상 전체 Python 프로세스에 영향을 미칩니다. 사용자들은 이러한 변경 사항의 효과가 OS 스레드 전체에 걸쳐 보일 것이라고 가정합니다. 따라서 이러한 API를 새로운 실행 컨텍스트를 사용하도록 만들 수는 없습니다. 컨텍스트를 인식하는 새로운 API를 설계하는 것은 가능하지만, 이는 이 PEP의 범위를 벗어납니다.

*   **Greenlets:**
    `greenlet` 패키지는 CPython의 일부는 아니지만, `gevent`와 같은 인기 프레임워크가 이에 의존하며, `greenlet`이 실행 컨텍스트를 지원하도록 수정될 수 있다는 것이 중요합니다. `greenlet`의 동작은 제너레이터와 매우 유사하므로, 실행 컨텍스트 지원을 추가하기 위해 `greenlet` 진입 및 종료 주변에 유사한 변경 사항을 적용할 수 있습니다. 이 PEP는 이를 위한 필요한 C API를 제공합니다.

*   **컨텍스트 변수 설정 및 복원:**
    `ContextVar.delete()` 메서드는 최상위 논리 컨텍스트에서 컨텍스트 변수를 제거합니다. 이는 중첩된 제너레이터가 논리 컨텍스트를 일시적으로 수정하려는 경우와 같이 논리 컨텍스트의 상태를 올바르게 복원해야 할 (드문) 필요가 있을 때 유용합니다.

---

### 9. 하위 호환성 (Backwards Compatibility)

이 제안은 100% 하위 호환성을 유지합니다.

---

### 10. 폐기된 아이디어 (Rejected Ideas)

*   **`threading.local()` 인터페이스의 복제:**
    `threading.local()`과 유사한 인터페이스를 컨텍스트 변수에 사용하는 것은 다음과 같은 이유로 고려되었지만 거부되었습니다.
    *   표준 라이브러리와 Django에 대한 조사는 `threading.local()` 사용의 대부분이 단일 속성을 포함하며, 이는 네임스페이스(namespace) 접근 방식이 현장에서 그렇게 유용하지 않음을 나타냅니다.
    *   값 조회를 위해 `.get()` 대신 `__getattr__()`를 사용하면 조회 깊이(예: 최상위 논리 컨텍스트만 검색)를 지정할 방법이 없습니다.
    *   단일 값 `ContextVar`는 가시성(visibility) 측면에서 추론하기 더 쉽습니다.
    *   단일 값 `ContextVar`는 조회 캐시(lookup cache)의 직접적인 구현을 가능하게 합니다.
    *   단일 값 `ContextVar` 인터페이스는 C-API를 간단하게 만들고 기본적으로 Python API와 동일하게 만듭니다.

*   **코루틴이 기본적으로 컨텍스트 변경 사항을 누설하지 않음:**
    이 PEP의 V4 버전에서는 코루틴이 실행 컨텍스트와 관련하여 제너레이터와 정확히 동일하게 동작하는 것으로 간주되었습니다. 즉, `await`된 코루틴의 변경 사항은 외부 코루틴에서 보이지 않았습니다. 이 아이디어는 태스크 및 스레드 모델의 의미론적 유사성을 깨뜨리고, 특히 `__aenter__`가 코루틴이기 때문에 컨텍스트 변수를 수정하는 비동기 컨텍스트 관리자를 안정적으로 구현하는 것을 불가능하게 만든다는 이유로 거부되었습니다.

---

### 11. 부록: HAMT 성능 분석 (Appendix: HAMT Performance Analysis)

벤치마크 결과는 다음과 같습니다.
*   **그림 1:** HAMT는 벤치마크된 모든 딕셔너리 크기에서 거의 O(1) 성능을 보여줍니다. `dict.copy()`는 약 100개 항목부터 매우 느려집니다.
*   **그림 2:** `dict`와 HAMT 기반 불변 매핑의 조회 비용을 비교합니다. HAMT 조회 시간은 평균적으로 Python `dict` 조회보다 30-40% 느리지만, `dict`가 매우 잘 최적화되어 있음을 고려할 때 매우 좋은 결과입니다.

---

**참고:**
이 PEP 550은 폐기되었지만, 여기에 담긴 핵심 아이디어와 문제 해결 접근 방식은 Python 3.7에 포함된 `ContextVar` 모듈의 기반이 되는 PEP 567에 영향을 주었습니다. `ContextVar`는 비동기 프로그래밍 환경에서 스레드-로컬과 유사한 컨텍스트를 안전하게 관리하는 데 사용됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.