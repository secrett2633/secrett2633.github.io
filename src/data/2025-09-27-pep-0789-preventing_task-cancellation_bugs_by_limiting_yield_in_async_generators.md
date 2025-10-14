---
title: "[Draft] PEP 789 - Preventing task-cancellation bugs by limiting yield in async generators"
excerpt: "Python Enhancement Proposal 789: 'Preventing task-cancellation bugs by limiting yield in async generators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/789/
toc: true
toc_sticky: true
date: 2025-09-27 14:04:23+0900
last_modified_at: 2025-09-27 14:04:23+0900
published: true
---
> **원문 링크:** [PEP 789 - Preventing task-cancellation bugs by limiting yield in async generators](https://peps.python.org/pep-0789/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 14-May-2024

PEP 789은 `async` 제너레이터에서 `yield` 사용을 제한하여 태스크 취소 관련 버그를 방지하는 것을 제안합니다. 이 PEP의 목표는 구조적 동시성(Structured Concurrency) 모델과 `yield`의 근본적인 비호환성으로 인해 발생하는 문제를 해결하는 것입니다.

## 초록 (Abstract)
Python에서 `asyncio.TaskGroup` 및 `asyncio.timeout`과 같은 구조적 동시성 인터페이스는 동시 태스크의 생명주기를 명확하게 관리하는 데 도움이 됩니다. 그러나 이러한 컨텍스트 내에서 `yield`를 사용하여 프레임을 일시 중단하면 잘못된 태스크가 취소되거나, 타임아웃이 무시되거나, 예외 처리가 잘못되는 문제가 발생합니다. 근본적으로 `TaskGroup` 내에서 프레임을 일시 중단하는 것은 자식 태스크가 부모 프레임 내에 캡슐화되어야 한다는 구조적 동시성 설계 원칙을 위반합니다.

이러한 문제를 해결하기 위해 PEP는 새로운 컨텍스트 매니저인 `sys.prevent_yields()`를 제안합니다. 이 컨텍스트 내에서 `yield`를 시도하면 `RuntimeError`가 발생하여 태스크가 `yield`할 수 없도록 합니다. 또한 `@contextmanager`와 같은 데코레이터가 데코레이트된 함수 내에서 `yield`를 허용할 수 있는 메커니즘도 제공될 예정입니다. `sys.prevent_yields()`는 `asyncio` 및 하위 라이브러리에서 태스크 그룹, 타임아웃, 취소 기능을 구현하는 데 사용될 것이며, `contextlib` 등에서는 제너레이터를 안전한 `yield`를 허용하는 컨텍스트 매니저로 변환하는 데 사용될 관련 메커니즘이 적용될 것입니다.

## 배경 (Background)
최신 `asyncio` 인터페이스와 Trio, anyio와 같은 서드파티 라이브러리의 형태로 Python에서 구조적 동시성이 점점 인기를 얻고 있습니다. 이러한 인터페이스는 사용자가 취소 범위(cancel scope) 내에서 프레임을 일시 중단하는 `yield`를 작성하지 않는 한, 구성적 추론(compositional reasoning)을 지원합니다.

취소 범위는 해당 컨텍스트 내에서 발생하는 작업을 취소할 수 있는 컨텍스트 매니저입니다. `asyncio`에서는 `with asyncio.timeout():` 또는 `async with asyncio.TaskGroup() as tg:`의 설계에 암시되어 있으며, 각각 지정된 기간 후에 포함된 작업을 취소하거나 자식 태스크 중 하나가 예외를 발생시켰을 때 형제 태스크를 취소합니다. 이 구조적 접근 방식은 취소 범위 내에서 `yield`를 통해 중첩 구조를 깨뜨릴 때까지는 잘 작동합니다. 이는 몇 개의 함수 간 `goto`를 추가하는 것과 유사하게 구조적 제어 흐름에 심각한 영향을 미칩니다:

*   타임아웃, 형제 태스크의 오류, 또는 다른 태스크를 취소하려는 명시적 요청으로 인해 **잘못된 태스크가 취소될 수 있습니다.**
*   `CancelledError`를 포함한 **예외가 잘못된 태스크로 전달될 수 있습니다.**
*   예외가 완전히 사라져 `ExceptionGroup`에 추가되지 않고 **누락될 수 있습니다.**

## 문제 진술 (Problem statement)
근본적인 문제는 `yield`가 호출 프레임을 일시 중단한다는 것입니다. `yield`는 리프 프레임(leaf frame)에서만 의미가 있습니다. 즉, 호출 스택이 A -> B -> C 순서일 때 C를 일시 중단할 수는 있지만, C가 실행 중인 상태에서 B를 일시 중단할 수는 없습니다.

하지만 `TaskGroup`은 단일 프레임이 여러 자식 프레임을 동시에 실행할 수 있는 "동시 호출(concurrent call)"의 한 종류입니다. 이는 `yield`와 `TaskGroup`을 혼합하여 사용하면 B가 일시 중단되었지만 C가 활발히 실행되는 상황이 발생할 수 있음을 의미합니다. 이는 말이 되지 않으며 심각한 실제 문제를 야기합니다 (예: C가 예외를 발생시켰는데 A가 이미 반환된 경우, 이를 전파할 방법이 없습니다).

이는 제너레이터 제어 흐름과 구조적 동시성 제어 흐름 간의 근본적인 비호환성이며, API를 조정해서는 해결할 수 없습니다. 유일한 해결책은 `TaskGroup` 내에서 `yield`를 금지하는 것으로 보입니다.

타임아웃은 자식 태스크를 남겨두지는 않지만, 이와 유사한 문제로 인해 `yield`는 `TaskGroup`뿐만 아니라 모든 취소 범위 내에서 금지되어야 한다고 결론 내립니다.

## 동기 부여 예시 (Motivating examples)
### 타임아웃이 외부 범위로 누출되는 경우 (Leaking a timeout to the outer scope)
각 요소에 대해 최대 `max_time`초 동안 대기하면서 비동기 이터레이터를 반복하고 싶다고 가정해 봅시다. 이 로직을 비동기 제너레이터로 캡슐화하여 호출 사이트가 일반적인 `async for` 루프를 계속 사용할 수 있도록 할 수 있습니다.

```python
async def iter_with_timeout(ait, max_time):
    try:
        while True:
            with timeout(max_time):
                yield await anext(ait)
    except StopAsyncIteration:
        return

async def fn():
    async for elem in iter_with_timeout(ait, max_time=1.0):
        await do_something_with(elem)
```
이 코드에는 버그가 있습니다. 제너레이터가 `yield`한 후 다시 재개되기 전에 타임아웃이 만료될 수 있습니다. 이 경우, 외부 태스크에서 `CancelledError`가 발생하며, 이는 `with timeout(max_time):` 문에 의해 잡히지 않습니다.

해결책은 간단합니다. 타임아웃 컨텍스트 내에서 다음 요소를 얻은 다음, 해당 컨텍스트 밖에서 `yield`하는 것입니다.

```python
async def correct_iter_with_timeout(ait, max_time):
    try:
        while True:
            with timeout(max_time):
                tmp = await anext(ait)
            yield tmp # yield는 타임아웃 컨텍스트 밖에서 이루어진다.
    except StopAsyncIteration:
        return
```

### 백그라운드 태스크 누출 (취소 및 예외 처리 위반) (Leaking background tasks (breaks cancellation and exception handling))
타임아웃만이 취소 범위를 감싸는 유일한 인터페이스는 아닙니다. 백그라운드 워커 태스크가 필요한 경우 `yield`하기 전에 `TaskGroup`을 단순히 닫을 수 없습니다.

여러 "센서"의 피드를 병합하는 팬인(fan-in) 제너레이터의 예를 들어봅시다.

```python
import asyncio, itertools

async def mock_sensor(name):
    for n in itertools.count():
        await asyncio.sleep(0.1)
        if n == 1 and name == "b":
            yield "PRESENT"
        elif n == 3 and name == "a":
            print("oops, raising RuntimeError")
            raise RuntimeError
        else:
            yield f"{name}-{n}"

async def move_elements_to_queue(ait, queue):
    async for obj in ait:
        await queue.put(obj)

async def combined_iterators(*aits):
    """여러 이터레이터에서 공유 큐로 요소를 이동하는 N개의 태스크를 시작하여 비동기 이터레이터를 결합합니다."""
    q = asyncio.Queue(maxsize=2)
    async with asyncio.TaskGroup() as tg:
        for ait in aits:
            tg.create_task(move_elements_to_queue(ait, q))
        while True:
            yield await q.get() # TaskGroup 내에서 yield 발생!

async def turn_on_lights_when_someone_gets_home():
    combined = combined_iterators(mock_sensor("a"), mock_sensor("b"))
    async for event in combined:
        print(event)
        if event == "PRESENT":
            break
    print("main task sleeping for a bit")
    await asyncio.sleep(1) # 다른 작업 수행

asyncio.run(turn_on_lights_when_someone_gets_home())
```
이 코드를 실행하면 `RuntimeError`가 발생했지만, 이 예외를 관찰하지 못하고 `CancelledError`가 외부 태스크에 주입됩니다. 이는 `TaskGroup` 내에서 `yield`했기 때문입니다.

이 문제를 해결하려면 비동기 제너레이터를 비동기 컨텍스트 매니저로 변환해야 합니다. 이 컨텍스트 매니저는 비동기 이터러블(여기서는 큐를 래핑하는 제너레이터)을 `yield`합니다.

```python
async def queue_as_aiterable(queue):
    # 취소 범위 내에서 `yield`하지 않는 비동기 제너레이터는 괜찮습니다!
    while True:
        try:
            yield await queue.get()
        except asyncio.QueueShutDown:
            return

@asynccontextmanager # 컨텍스트 매니저에서는 취소 범위 내에서 yield가 허용됩니다.
async def combined_iterators(*aits):
    q = asyncio.Queue(maxsize=2)
    async with asyncio.TaskGroup() as tg:
        for ait in aits:
            tg.create_task(move_elements_to_queue(ait, q))
        yield queue_as_aiterable(q) # yield는 컨텍스트 매니저의 일부로 허용됨

async def turn_on_lights_when_someone_gets_home():
    # ...
    async with combined_iterators(...) as ait:
        async for event in ait:
            # ...
```

### 사용자 정의 컨텍스트 매니저에서 (In a user-defined context manager)
취소 범위 내에서 `yield`하는 것은 제너레이터를 사용하여 컨텍스트 매니저를 구현하는 경우에만 안전합니다. 이 경우 전파되는 모든 예외는 예상된 태스크로 리디렉션됩니다. `flake8-async`의 `ASYNC101` 린터 규칙은 알려진 취소 범위 내에서 `yield`하는 것에 대해 경고합니다. 그러나 사용자 정의 컨텍스트 매니저도 취소 범위를 래핑할 수 있으며, 모든 경우를 인식하거나 린트하는 것은 불가능합니다.

## 사양 (Specification)
이러한 문제를 방지하기 위해 다음과 같이 제안합니다:

1.  새로운 컨텍스트 매니저인 `with sys.prevent_yields(reason): ...`를 도입하여, 이 컨텍스트 내에서 `yield`를 시도하면 `RuntimeError`를 발생시킵니다. `asyncio` 및 하위 코드의 취소 범위와 유사한 컨텍스트 매니저는 이를 래핑하여 `with` 블록 내에서 `yield`를 방지할 수 있습니다.
2.  제너레이터를 컨텍스트 매니저로 변환하는 데코레이터가 한 번의 호출에 걸쳐 `yield`를 허용할 수 있는 메커니즘을 제공합니다. 이는 `fn.__code__.co_allow_yields = True`와 같은 코드 객체 속성이나 `fn.__invoke_with_yields__`와 같은 호출 플래그가 될 수 있습니다.

## 구현 - 프레임 추적 (Implementation - tracking frames)
새로운 `sys.prevent_yields` 컨텍스트 매니저는 인터프리터 지원이 필요합니다. 각 프레임에 대해 이 컨텍스트 매니저의 진입 및 종료를 추적합니다.

`yield` 시 다음과 같이 동작합니다:
*   `entries != []`이고 `frame.allow_yield_flag`가 `False`인 경우, `yield` 대신 `RuntimeError`를 발생시킵니다 (이 PEP가 제안하는 새로운 동작).
*   그렇지 않으면 반환 시와 마찬가지로 스택을 부모 프레임에 병합합니다.

이는 태스크 내에서 프레임을 `yield`하는 것에 관한 것이므로, `syntactic yield` 및 `yield from`이 영향을 받지만 `await` 표현식은 영향을 받지 않습니다.

## 작동 예시 (Worked examples)
### `yield` 없는 예시 (No-yield example)
`sys.prevent_yields`에서 사용자 정의 `ContextManager`를 거쳐 원래 `Frame`으로 되감는 과정에서 스택 병합이 여러 번 발생합니다. `yield`가 없으면 오류가 발생하지 않으며, 진입 및 종료 횟수가 균형을 이루므로 프레임은 추가 추적 없이 평소와 같이 반환됩니다.

### `yield` 시도 예시 (Attempts-to-yield example)
이 예시에서는 `Frame`이 `sys.prevent_yields` 컨텍스트 내에서 `yield`를 시도합니다. 이는 인터프리터에 의해 감지되어 프레임을 일시 중단하는 대신 `RuntimeError`를 발생시킵니다.

### `yield` 허용 예시 (Allowed-to-yield example)
이 예시에서는 데코레이터가 `Frame`이 `yield`를 허용하도록 표시했습니다. 이는 `@contextlib.contextmanager` 또는 관련 데코레이터일 수 있습니다. `Frame`이 `yield`를 허용할 때, 진입/종료 스택은 일시 중단되기 전에 부모 프레임의 스택에 병합됩니다. `Frame`이 재개될 때 스택은 비어 있습니다. 마지막으로 `Frame`이 종료되면 종료가 부모 프레임의 스택에 병합되어 균형을 재조정합니다. 이는 부모 프레임이 남아있는 `sys.prevent_yields` 상태를 올바르게 상속하도록 보장하며, `Frame`이 안전하게 일시 중단 및 재개될 수 있도록 합니다.

## `sys.prevent_yields`의 오용 시 동작 (Behavior if sys.prevent_yields is misused)
`sys.prevent_yields.__enter__` 및 `.__exit__`를 유효한 중첩과 일치하지 않는 순서로 호출하거나 다른 방식으로 유효하지 않은 프레임 상태를 얻을 수 있습니다. `sys.prevent_yields.__exit__`가 유효하지 않은 상태를 감지할 수 있는 두 가지 방법이 있습니다. 첫째, `yield`가 방지되지 않은 경우, 상태를 변경하지 않고 예외를 발생시킬 수 있습니다. 둘째, 예상치 못한 진입이 스택의 맨 위에 있는 경우, 해당 진입을 팝하고 예외를 발생시킬 것을 제안합니다. 이는 순서가 뒤바뀐 호출도 스택을 비우면서도 문제가 있음을 명확히 합니다.

## 예상되는 용도 (Anticipated uses)
표준 라이브러리에서는 `asyncio.TaskGroup`, `asyncio.timeout`, `asyncio.timeout_at`에서 `sys.prevent_yields`를 사용할 수 있습니다. 하위 라이브러리에서는 `trio.CancelScope`, 비동기 픽스처(pytest-trio, anyio 등) 및 기타 여러 곳에서 사용될 것으로 예상됩니다.

제너레이터를 컨텍스트 매니저로 지원하는 기능은 `@contextlib.(async)contextmanager`에서 사용될 것이며, 필요한 경우 `(Async)ExitStack`에서도 사용될 것입니다.

## 하위 호환성 (Backwards Compatibility)
`sys.prevent_yields` 컨텍스트 매니저의 추가, `@contextlib.(async)contextmanager`의 변경, 그리고 해당 인터프리터 지원은 모두 완벽하게 하위 호환됩니다.

`asyncio.TaskGroup`, `asyncio.timeout`, `asyncio.timeout_at` 내에서 `yield`를 방지하는 것은 현재 사용 중인 일부 코드에 대한 **호환성 파괴 변경(breaking change)**이 될 수 있습니다. 이러한 코드는 안전하지 않더라도 실제 환경에서 작동하는 경우가 많을 수 있기 때문입니다.

표준 라이브러리 코드에 대한 적절한 비권장(deprecation) 경로에 대해 커뮤니티 피드백을 구할 것이며, 여기에는 비권장 기간의 길이도 포함됩니다. 초기 제안으로, 3.14 버전의 `asyncio` 디버그 모드에서만 표준 라이브러리 컨텍스트 내에서 일시 중단할 때 `DeprecationWarning`을 발생시키고, 3.15 버전에서는 기본적으로 경고를 발생시키고 디버그 모드에서 오류를 발생시키며, 마지막으로 3.16 버전에서는 하드 에러로 만들 수 있습니다.

표준 라이브러리 사용 여부와 관계없이 하위 프레임워크는 이 기능을 즉시 채택할 것입니다.

### 이 버그는 얼마나 널리 퍼져 있습니까? (How widespread is this bug?)
명확한 수치는 없지만, 많은 프로젝트가 영향을 받는 것으로 추정됩니다.

## 교육 방법 (How to Teach This)
대부분의 중급 및 고급 Python 프로그래머는 `TaskGroup`, `timeout`, `@contextmanager`의 사용자로서 이 PEP와 상호작용할 것입니다. 이 그룹에게는 명확한 예외 메시지와 문서로 충분할 것으로 예상됩니다.

`asyncio` 개발 페이지에 새 섹션이 추가되어, `async` 제너레이터는 "취소 범위" 컨텍스트(예: `TaskGroup` 또는 `timeout` 컨텍스트 매니저) 내에서 `yield`할 수 없다고 간략하게 명시할 것입니다.

각 취소 범위 컨텍스트 매니저(따라서 이제 `sys.prevent_yields`를 래핑하는) 문서에는 "[이 컨텍스트 매니저 내에서 `yield`하는 것은 오류입니다.]"와 같은 표준 문장이 포함될 것이며, 위의 설명으로 하이퍼링크될 것입니다.

## 거부된 대안 (Rejected alternatives)
### PEP 533, 이터레이터를 위한 결정론적 정리 (PEP 533, deterministic cleanup for iterators)
PEP 533은 이터레이터 프로토콜에 `__[a]iterclose__`를 추가하여 각 `(async) for` 루프를 `with [a]closing(ait)`으로 래핑하는 것을 제안합니다. 이는 이터레이터가 보유한 리소스의 시기적절하고 결정론적인 정리를 보장하는 데 유용하지만, 이 PEP가 해결하려는 모든 문제를 완전히 해결하지는 못합니다. PEP 533이 있더라도 잘못된 취소는 여전히 잘못된 태스크로 전달될 수 있으며, 이터레이터가 닫히기 전에 문제를 일으킬 수 있습니다. 또한, `TaskGroup`과의 근본적인 구조적 동시성 문제를 해결하지 못합니다.

### 비동기 제너레이터 전체를 비권장 (Deprecate async generators entirely)
2024년 언어 서밋에서 일부 참석자들은 대신 비동기 제너레이터를 완전히 비권장할 것을 제안했습니다. 하지만 Trio 코드에서는 표준 제너레이터로도 동일한 문제가 발생할 수 있습니다. 또한, `decimal.localcontext`와 같이 취소 범위가 아닌 일부 동기 컨텍스트 매니저도 관련 문제를 나타냅니다. 비동기 제너레이터를 언어에서 제거하기보다는 문제를 해결하는 것이 바람직하다는 의견이 있었습니다.

### 예외를 올바른 위치로 전달할 수 없습니까? (Can't we just deliver exceptions to the right place?)
PEP 568(컨텍스트 변수에 대한 제너레이터 민감성; PEP 550 참조)을 구현하면 타임아웃으로 인한 예외를 처리할 수 있을 것입니다. 그러나 이는 `TaskGroup`과의 또 다른 문제를 해결하지 못합니다. 제너레이터 모델은 스택 프레임을 일시 중단된 상태로 만들고 이를 저장, 이동, 또는 임의의 위치에서 폐기하거나 되살릴 수 있는 비활성 값으로 취급하는 것입니다. 구조적 동시성 모델은 스택이 트리(tree)가 되며, 자식 태스크가 부모 프레임 내에 캡슐화되는 것입니다. 이 두 모델은 기본 구조적 프로그래밍 모델을 다른, 그리고 불행히도 호환되지 않는 방향으로 확장하고 있습니다. 모든 자식 태스크를 함께 일시 중단하는 것을 가정해도, 다른 태스크에서 제너레이터를 재개할 수 있어 구조적 동시성의 "상향식" 불변성을 위반할 수 있습니다. TaskGroup 문제를 해결하지 못하면서 취소 범위를 처리하기 위해 많은 메커니즘을 추가하는 것은 가치가 없다고 생각됩니다.

### 대체 구현 - 바이트코드 검사 (Alternative implementation - inspecting bytecode)
`sys.prevent_yields`가 호출자의 바이트코드를 검사하여 호출 명령 포인터와 다음 컨텍스트 종료 사이에 `yield`가 없는지 확인하는 대안이 제안되었습니다. 그러나 사용자 정의 컨텍스트 매니저가 `sys.prevent_yields`를 래핑할 때 어떻게 작동할지 불분명하며, `__enter__()` 및 `__exit__()`에 대한 명시적 호출을 무시하여 `with` 문 사용 여부에 따라 컨텍스트 관리 프로토콜이 달라질 수 있습니다. "사용하는 경우에만 비용을 지불하는" 성능 비용은 매력적이지만, 프레임 객체 검사는 핵심 제어 흐름 구성 요소에 대해 지나치게 비싸고 전체 프로그램 속도 저하를 야기합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.