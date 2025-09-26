---
title: "[Withdrawn] PEP 521 - Managing global context via ‘with’ blocks in generators and coroutines"
excerpt: "Python Enhancement Proposal 521: 'Managing global context via ‘with’ blocks in generators and coroutines'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/521/
toc: true
toc_sticky: true
date: 2025-09-26 23:14:33+0900
last_modified_at: 2025-09-26 23:14:33+0900
published: true
---
> **원문 링크:** [PEP 521 - Managing global context via ‘with’ blocks in generators and coroutines](https://peps.python.org/pep-0521/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 27-Apr-2015

PEP 521은 `Generator` 및 `Coroutine` 내 `with` 블록을 통해 전역 컨텍스트를 관리하는 방법을 제안했지만, PEP 567에 찬성하여 `Withdrawn` (철회됨) 상태입니다.

## PEP 521: Generator 및 Coroutine 내 'with' 블록을 통한 전역 컨텍스트 관리 (Withdrawn)

*   **작성자:** Nathaniel J. Smith
*   **상태:** Withdrawn (철회됨)
*   **유형:** Standards Track
*   **생성일:** 2015년 4월 27일
*   **Python 버전:** 3.6
*   **철회 사유:** PEP 567에 찬성하여 철회됨.

### 개요 (Abstract)

전역 상태(global state)를 가능한 한 피하려고 노력하지만, 그럼에도 불구하고 최선의 접근 방식으로 합의된 여러 상황이 존재합니다. Python에서 이러한 경우를 처리하는 표준 패턴은 전역 또는 스레드-로컬(thread-local) 스토리지에 전역 상태를 저장하고, `with` 블록을 사용하여 이 전역 상태의 수정 사항을 단일 동적 스코프(dynamic scope)로 제한하는 것입니다. 이 패턴이 사용되는 예로는 표준 라이브러리의 `warnings.catch_warnings` 및 `decimal.localcontext`, NumPy의 `numpy.errstate` (IEEE 754 부동 소수점 표준에서 제공하는 오류 처리 설정을 노출), 그리고 많은 서버 애플리케이션 프레임워크의 로깅 컨텍스트(logging context) 또는 HTTP 요청 컨텍스트(HTTP request context) 처리가 있습니다.

그러나 `Generator` 또는 `Coroutine`를 작성할 때 이러한 전역 상태에 대한 로컬 변경 사항을 관리할 수 있는 인체공학적(ergonomic) 방법은 현재 없습니다. 예를 들어, 다음 코드는:

```python
def f():
    with warnings.catch_warnings():
        for x in g():
            yield x
```

`g()`에 의해 발생하는 경고를 성공적으로 포착할 수도 있고, 코드의 다른 곳에서 트리거된 경고를 의도치 않게 삼킬 수도 있습니다. `f`와 그 호출자에게만 적용되도록 의도된 컨텍스트 매니저(context manager)는 호출자의 임의적이고 예측할 수 없는 부분을 포괄하는 동적 스코프를 가지게 됩니다. 이 문제는 특히 비동기(asynchronous) 코드를 작성할 때 심화되는데, 이 경우 거의 모든 함수가 `Coroutine`이 됩니다.

이 PEP는 스코프 내에서 실행이 일시 중단(suspended)되거나 다시 시작될(resumed) 때마다 컨텍스트 매니저에게 알림으로써, 컨텍스트 매니저가 그 효과를 적절하게 제한할 수 있도록 하여 이 문제를 해결할 것을 제안합니다.

### 상세 설명 (Specification)

컨텍스트 매니저 프로토콜에 두 개의 새로운 선택적(optional) 메서드인 `__suspend__`와 `__resume__`가 추가됩니다. 이 메서드들이 존재하면, `with` 블록의 컨텍스트 내에서 프레임(frame)의 실행이 일시 중단되거나 다시 시작될 때마다 호출됩니다.

더 형식적으로는, 다음 코드를 고려해볼 때:

```python
with EXPR as VAR:
    PARTIAL-BLOCK-1
    f((yield foo))
    PARTIAL-BLOCK-2
```

현재 이 코드는 (PEP 343에서 복사된) 다음 코드와 동일합니다:

```python
mgr = (EXPR)
exit = type(mgr).__exit__ # Not calling it yet
value = type(mgr).__enter__(mgr)
exc = True
try:
    try:
        VAR = value # Only if "as VAR" is present
        PARTIAL-BLOCK-1
        f((yield foo))
        PARTIAL-BLOCK-2
    except:
        exc = False
        if not exit(mgr, *sys.exc_info()):
            raise
    finally:
        if exc:
            exit(mgr, None, None, None)
```

이 PEP는 `with` 블록 처리를 다음과 같이 수정할 것을 제안합니다:

```python
mgr = (EXPR)
exit = type(mgr).__exit__ # Not calling it yet
### --- NEW STUFF ---
if the_block_contains_yield_points: # known statically at compile time
    suspend = getattr(type(mgr), "__suspend__", lambda: None)
    resume = getattr(type(mgr), "__resume__", lambda: None)
### --- END OF NEW STUFF ---
value = type(mgr).__enter__(mgr)
exc = True
try:
    try:
        VAR = value # Only if "as VAR" is present
        PARTIAL-BLOCK-1
        ### --- NEW STUFF ---
        suspend(mgr)
        tmp = yield foo
        resume(mgr)
        f(tmp)
        ### --- END OF NEW STUFF ---
        PARTIAL-BLOCK-2
    except:
        exc = False
        if not exit(mgr, *sys.exc_info()):
            raise
    finally:
        if exc:
            exit(mgr, None, None, None)
```

유사한 `suspend`/`resume` 호출은 `yield from`, `await`, `async with`, `async for` 구조 내에 내장된 `yield` 지점(points) 주변에도 래핑됩니다.

#### 중첩된 블록 (Nested blocks)

다음 코드를 고려해볼 때:

```python
def f():
    with OUTER:
        with INNER:
            yield VALUE
```

다음과 같은 순서로 작업이 수행됩니다:

1.  `INNER.__suspend__()`
2.  `OUTER.__suspend__()`
3.  `yield VALUE`
4.  `OUTER.__resume__()`
5.  `INNER.__resume__()`

이는 다음 리팩터링(refactoring)이 유효함을 보장합니다:

```python
def f():
    with OUTER:
        yield from g()

def g():
    with INNER:
        yield VALUE
```

마찬가지로, 여러 컨텍스트 매니저를 사용하는 `with` 문은 오른쪽에서 왼쪽으로 일시 중단되고(suspend), 왼쪽에서 오른쪽으로 다시 시작됩니다(resume).

#### 기타 변경 사항 (Other changes)

`warnings.catch_warnings` 및 `decimal.localcontext`에 적절한 `__suspend__` 및 `__resume__` 메서드가 추가됩니다.

### 제안 배경 (Rationale)

개요에서, 우리는 그럴듯하지만 올바르지 않은 코드의 예를 들었습니다:

```python
def f():
    with warnings.catch_warnings():
        for x in g():
            yield x
```

현재 Python에서 이 코드를 올바르게 만들려면 다음과 같이 작성해야 합니다:

```python
def f():
    with warnings.catch_warnings():
        it = iter(g())
        while True:
            with warnings.catch_warnings():
                try:
                    x = next(it)
                except StopIteration:
                    break
                yield x
```

반면에, 이 PEP가 수락된다면 원래 코드는 그대로 올바르게 작동할 것입니다. 만약 이것이 설득력이 없다면, 또 다른 깨진 코드의 예시를 들어보겠습니다. 이 코드를 고치려면 훨씬 더 복잡한 조작이 필요하며, 이는 독자를 위한 연습 문제로 남겨둡니다:

```python
async def test_foo_emits_warning():
    with warnings.catch_warnings(record=True) as w:
        await foo()
        assert len(w) == 1
        assert "xyzzy" in w[0].message
```

그리고 이 마지막 예시는 전혀 인위적이지 않습니다. 이것이 `async`/`await`를 사용하는 `Coroutine`가 경고를 올바르게 발생시키는지 테스트하는 방법입니다. `async`/`await`를 사용하는 코드에서 `warnings.catch_warnings`, `decimal.localcontext`, 또는 `numpy.errstate`를 사용하는 거의 모든 경우에 유사한 문제가 발생합니다. 따라서 해결해야 할 실제 문제가 분명히 존재하며, `async` 코드의 중요성이 커짐에 따라 더욱 시급해지고 있습니다.

#### 대안적 접근 방식 (Alternative approaches)

제안된 주요 대안은 "스레드-로컬 스토리지(thread-local storage)"와 유사한 일종의 "태스크-로컬 스토리지(task-local storage)"를 만드는 것입니다. 본질적으로 이 아이디어는 이벤트 루프(event loop)가 스케줄링하는 각 태스크에 대해 새로운 "태스크 네임스페이스(task namespace)"를 할당하고, 언제든지 현재 실행 중인 태스크에 해당하는 네임스페이스를 가져올 수 있는 API를 제공한다는 것입니다. 해결해야 할 많은 세부 사항이 있지만, 기본적인 아이디어는 실행 가능해 보이며, 비동기 애플리케이션 프레임워크의 최상위 레벨에서 발생하는 종류의 전역 컨텍스트(예: 웹 프레임워크에서 컨텍스트 객체 설정)를 처리하는 특히 자연스러운 방법입니다. 그러나 여기에는 여러 가지 결함도 있습니다:

*   이것은 비동기 이벤트 루프로 `yield`하는 `Coroutine`에 대한 전역 상태 관리 문제만 해결합니다. 하지만 이 문제는 `asyncio`에만 국한된 것이 아닙니다. 위 예시에서 보듯이, 단순한 `Generator`도 정확히 같은 문제에 직면합니다.
*   이벤트 루프와 전역 상태를 관리해야 하는 코드 사이에 불필요한 결합(coupling)을 생성합니다. 비동기 웹 프레임워크는 어쨌든 일부 이벤트 루프 API와 상호 작용해야 하므로 이 경우에는 큰 문제가 아닙니다. 그러나 `warnings` 또는 `decimal` 또는 `NumPy`가 자체적으로 비동기 코드를 포함하지 않음에도 불구하고 내부 상태에 액세스하기 위해 비동기 라이브러리의 API를 호출해야 한다는 것은 이상합니다. 더 나쁜 것은, 일반적으로 사용되는 여러 이벤트 루프 API가 있기 때문에 어떤 API와 통합해야 할지 명확하지 않습니다 (CPython이 `asyncio`, Twisted, tornado 등이 함께 작동할 수 있는 "태스크-로컬 도메인"을 생성하고 전환하기 위한 표준 API를 제공함으로써 어느 정도 완화될 수 있습니다).
*   이것이 허용할 수 있을 정도로 빠르게 만들어질 수 있을지는 전혀 명확하지 않습니다. `NumPy`는 모든 산술 연산에서 부동 소수점 오류 설정을 확인해야 합니다. 스레드-로컬 스토리지에서 데이터 조각을 확인하는 것은 터무니없이 빠릅니다. 왜냐하면 현대 플랫폼은 이 경우를 최적화하는 데 막대한 자원(예: 이 목적을 위한 CPU 레지스터 전용)을 투자했기 때문입니다. 이벤트 루프에서 메서드를 호출하여 네임스페이스에 대한 핸들을 가져온 다음 그 네임스페이스에서 조회를 수행하는 것은 훨씬 느립니다.

더 중요한 것은, 이 추가 비용은 이벤트 루프를 전혀 사용하지 않는 프로그램에서도 전역 데이터에 대한 모든 액세스에 대해 지불되어야 한다는 것입니다. 이 PEP의 제안은 대조적으로, 실제로 `with` 블록과 `yield` 문을 혼합하는 코드에만 영향을 미치므로, 비용을 경험하는 사용자가 이점도 얻는 사용자와 동일합니다.

반면에, 태스크 컨텍스트와 이벤트 루프 간의 이러한 긴밀한 통합은 현재 제안의 범위를 넘어서는 다른 기능을 잠재적으로 허용합니다. 예를 들어, 이벤트 루프는 태스크가 `call_soon`을 호출했을 때 어떤 태스크 네임스페이스가 유효했는지 기록하고, 콜백이 실행될 때 동일한 태스크 네임스페이스에 액세스할 수 있도록 준비할 수 있습니다. 이것이 유용한지, 또는 스레드 간 호출의 경우 잘 정의되어 있는지(두 스레드에서 동시에 액세스되는 태스크-로컬 스토리지가 의미하는 바는 무엇인가?)는 이벤트 루프 구현자가 고민할 과제로 남겨져 있습니다. 이 제안의 어떤 것도 이러한 향상을 배제하지 않습니다. 그러나 이러한 기능은 이미 이벤트 루프와 긴밀하게 통합된 상태에 주로 유용할 것으로 보입니다. 요청 ID가 `call_soon`을 통해 유지되기를 원할 수 있지만, 대부분의 사람들은 다음을 예상하지 않을 것입니다:

```python
with warnings.catch_warnings():
    loop.call_soon(f)
```

`f`가 경고가 비활성화된 상태로 실행되는 결과는 `call_soon`이 전역 컨텍스트를 일반적으로 보존한다면 발생할 것입니다. `warnings` 컨텍스트 매니저의 `__exit__`가 `f`보다 먼저 호출된다는 점을 고려할 때 이것이 어떻게 작동할지도 불분명합니다.

따라서 이 PEP는 `__suspend__` / `__resume__`와 "태스크-로컬 스토리지"가 서로 다른 상황에서 모두 유용한 두 가지 보완적인 도구라는 입장을 취합니다.

### 하위 호환성 (Backwards compatibility)

`__suspend__` 및 `__resume__`는 선택 사항이며 기본적으로 아무것도 하지 않는(no-ops) 메서드이기 때문에, 모든 기존 컨텍스트 매니저는 이전과 동일하게 작동합니다.

속도 면에서, 이 제안은 `with` 블록에 진입할 때 추가 오버헤드(추가 메서드를 확인해야 함; CPython에서 속성 조회 실패는 `AttributeError` 할당을 포함하므로 상당히 느림)와 일시 중단 지점(suspension points)에서 추가 오버헤드를 추가합니다. `with` 블록과 일시 중단 지점의 위치는 정적으로 알려져 있으므로, 컴파일러는 실제로 `with` 내부에 `yield`가 있는 경우를 제외하고는 모든 경우에 이 오버헤드를 쉽게 최적화할 수 있습니다. 또한, `__suspend__` 및 `__resume__`에 대한 속성 검사는 `with` 블록 시작 시 한 번만 수행하므로, 이 속성들이 정의되지 않은 경우 `yield` 당 오버헤드는 단일 C 레벨 `if (frame->needs_suspend_resume_calls) { ... }`로 최적화될 수 있습니다. 따라서 전체 오버헤드는 무시할 수 있을 것으로 예상됩니다.

### PEP 492와의 상호작용 (Interaction with PEP 492)

PEP 492는 새로운 비동기 컨텍스트 매니저(asynchronous context managers)를 추가했습니다. 이는 일반 컨텍스트 매니저와 유사하지만, 일반 메서드인 `__enter__` 및 `__exit__` 대신 `Coroutine` 메서드인 `__aenter__` 및 `__aexit__`를 가집니다.

이 패턴을 따르면, 이 제안이 `__asuspend__` 및 `__aresume__` `Coroutine` 메서드를 추가할 것으로 예상할 수 있습니다. 그러나 이는 그다지 의미가 없습니다. 왜냐하면 `__suspend__`는 실행 스레드를 `yield`하고 다른 코드가 실행되도록 허용하기 전에 호출되어야 한다는 것이 요점이기 때문입니다. `__asuspend__`를 `Coroutine`으로 만듦으로써 우리가 달성하는 유일한 것은 `__asuspend__` 자체에서 `yield`를 가능하게 하는 것입니다. 따라서 `__asuspend__` 내부에서 `__asuspend__`를 재귀적으로 호출하거나, 아니면 포기하고 `suspend` 콜백을 호출하지 않고 이러한 `yield`가 발생하도록 허용해야 합니다. 어느 쪽이든 전체 요점을 무효화합니다.

단, 한 가지 예외가 있습니다. `Coroutine` 코드의 한 가지 가능한 패턴은 `Coroutine` 러너(runner)와 통신하기 위해 `yield`를 호출하지만, 실제로 실행을 일시 중단하지는 않는 것입니다 (즉, `Coroutine`는 `Coroutine` 러너가 `yield`된 메시지를 처리한 직후에 `Coroutine`를 즉시 다시 시작할 것이라는 것을 알 수 있습니다). 이에 대한 예시는 `curio.timeout_after` 비동기 컨텍스트 매니저입니다. 이 매니저는 특별한 `set_timeout` 메시지를 `curio` 커널에 `yield`하고, 커널은 메시지를 보낸 `Coroutine`를 즉시(동기적으로) 다시 시작합니다. 그리고 사용자 관점에서, 이 타임아웃(timeout) 값은 이 PEP를 촉발한 전역 변수와 유사하게 작동합니다. 그러나 중요한 차이점이 있습니다. 이러한 종류의 비동기 컨텍스트 매니저는 정의상 `Coroutine` 러너와 긴밀하게 통합됩니다. 따라서 `Coroutine` 러너는 이 PEP가 전혀 필요 없이 어떤 타임아웃이 어떤 `Coroutine`에 적용되는지 추적하는 책임을 맡을 수 있습니다 (그리고 이것이 실제로 `curio.timeout_after`가 작동하는 방식입니다).

이는 비동기 컨텍스트 매니저를 처리하는 두 가지 합리적인 접근 방식을 남깁니다:

1.  일반 `__suspend__` 및 `__resume__` 메서드를 추가합니다.
2.  비동기 컨텍스트 매니저에 대한 경험이 더 많아질 때까지는 현재 상태로 둡니다.

두 가지 모두 그럴듯해 보이므로, 게으름과 YAGNI (You Ain't Gonna Need It) 원칙에 따라 이 PEP는 잠정적으로 옵션 (2)를 고수할 것을 제안합니다.

### 참고 자료 (References)

*   `https://groups.google.com/forum/#!topic/python-tulip/zix5HQxtElg` `https://github.com/python/asyncio/issues/165`
*   예를 들어, 모든 사용자가 공유하는 단일 태스크-로컬 네임스페이스가 있는지(이 경우 여러 타사 라이브러리가 이 네임스페이스에 대한 액세스를 조정할 방법이 필요함), 아니면 여러 태스크-로컬 네임스페이스가 있다면 각 라이브러리가 적절한 시점에 태스크-로컬 네임스페이스를 생성하고 파괴하는 메커니즘이 필요한지 결정해야 합니다. 위 GitHub 이슈에서 연결된 예비 패치(preliminary patch)는 이러한 라이프사이클 관리 메커니즘을 제공하지 않는 것으로 보입니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.