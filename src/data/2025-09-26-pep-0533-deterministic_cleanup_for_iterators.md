---
title: "[Deferred] PEP 533 - Deterministic cleanup for iterators"
excerpt: "Python Enhancement Proposal 533: 'Deterministic cleanup for iterators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/533/
toc: true
toc_sticky: true
date: 2025-09-26 23:25:05+0900
last_modified_at: 2025-09-26 23:25:05+0900
published: true
---
> **원문 링크:** [PEP 533 - Deterministic cleanup for iterators](https://peps.python.org/pep-0533/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 18-Oct-2016

## PEP 533 – 이터레이터의 확정적 정리 (Deterministic cleanup for iterators)

### 요약 (Abstract)
본 PEP는 이터레이터 프로토콜에 새로운 `__(a)iterclose__` 슬롯(slot)을 확장할 것을 제안합니다. 이 슬롯은 `for` (또는 `async for`) 루프가 어떤 방식으로든 종료될 때 자동으로 호출됩니다. 이를 통해 가비지 컬렉터(garbage collector)에 의존하지 않고 이터레이터가 보유한 리소스(resource)를 편리하고 확정적으로 정리할 수 있습니다. 특히 비동기 제너레이터(async generator)에 매우 유용합니다.

### 시기에 대한 참고 (Note on timing)
실용적인 측면에서 이 제안은 두 가지 부분으로 나뉩니다. 비동기 이터레이터(async iterator) 처리는 가능한 한 빨리 구현되어야 하며, 일반 이터레이터(regular iterator) 처리는 더 큰 규모의 프로젝트이지만 3.7 버전 이후에나 시작할 수 있는 여유로운 프로젝트입니다. 하지만 변경 사항들이 밀접하게 연관되어 있고, 장기적으로 비동기 이터레이터와 일반 이터레이터가 서로 다르게 작동하는 것을 원치 않으므로, 이들을 함께 살펴보는 것이 유용하다고 판단됩니다.

### 배경 및 동기 (Background and motivation)
Python의 이터러블(iterable) 객체는 종종 정리가 필요한 리소스를 보유합니다. 예를 들어, 파일 객체는 닫아야 합니다. WSGI 사양은 일반 이터레이터 프로토콜 외에 `close` 메서드를 추가하고, 소비자가 적절한 시기에 이를 호출하도록 요구합니다 (그러나 이를 잊어버리는 것이 흔한 버그의 원인이 됩니다). PEP 342 (PEP 325 기반)는 제너레이터(generator) 객체를 확장하여 `close` 메서드를 추가하여 제너레이터가 스스로 정리할 수 있도록 했습니다.

일반적으로, 스스로 정리해야 하는 객체는 결국 가비지 컬렉트(garbage collected)될 때 정리가 이루어지도록 보장하기 위해 `__del__` 메서드를 정의합니다. 하지만 이와 같이 가비지 컬렉터에 의존하여 정리를 하는 것은 몇 가지 경우에 심각한 문제를 야기합니다.

*   **참조 카운팅(reference counting)을 사용하지 않는 Python 구현체 (예: PyPy, Jython):** `__del__` 호출이 임의로 지연될 수 있습니다. 그러나 많은 상황에서 리소스의 즉각적인 정리가 필요합니다. 지연된 정리는 파일 디스크립터(file descriptor) 고갈로 인한 크래시(crash)나 잘못된 시간을 수집하는 WSGI 타이밍 미들웨어(middleware)와 같은 문제를 발생시킵니다.
*   **비동기 제너레이터 (PEP 525):** 적절한 코루틴(coroutine) 러너(runner)의 감독 하에서만 정리를 수행할 수 있습니다. `__del__`은 코루틴 러너에 접근할 수 없으며, 심지어 제너레이터 객체보다 먼저 코루틴 러너가 가비지 컬렉트될 수도 있습니다. 따라서 어떤 종류의 언어 확장 없이는 가비지 컬렉터에 의존하는 것이 사실상 불가능합니다. (PEP 525가 그러한 확장을 제공하지만, 이 제안이 해결하는 여러 가지 제한 사항이 있습니다. 자세한 내용은 아래 "대안" 섹션에서 논의됩니다.)

다행히 Python은 `with` 블록을 사용하여 리소스 정리를 보다 구조화된 방식으로 수행할 수 있는 표준 도구를 제공합니다. 예를 들어, 다음 코드는 파일을 열지만 가비지 컬렉터에 파일 닫기를 의존합니다.

```python
def read_newline_separated_json(path):
    for line in open(path):
        yield json.loads(line)

for document in read_newline_separated_json(path):
    ...
```

최근 CPython 버전은 `ResourceWarning`을 발행하여 `with` 블록을 추가하여 문제를 해결하도록 안내합니다.

```python
def read_newline_separated_json(path):
    with open(path) as file_handle:  # <-- with block
        for line in file_handle:
            yield json.loads(line)

for document in read_newline_separated_json(path): # <-- outer for loop
    ...
```

그러나 `with` 블록과 제너레이터의 상호작용으로 인해 미묘한 문제가 발생합니다. `with` 블록은 Python의 주요 정리 관리 도구이며 강력합니다. 왜냐하면 리소스의 수명(lifetime)을 스택 프레임(stack frame)의 수명에 고정시키기 때문입니다. 하지만 이는 누군가가 스택 프레임을 정리할 것을 전제로 하며, 제너레이터의 경우 누군가가 제너레이터를 닫아야 합니다.

이 경우 `with` 블록을 추가하는 것만으로는 `ResourceWarning`을 없애기에는 충분하지만, 이는 오해의 소지가 있습니다. 여기서 파일 객체 정리는 여전히 가비지 컬렉터에 의존합니다. `with` 블록은 `read_newline_separated_json` 제너레이터가 닫힐 때만 해제됩니다. 만약 외부 `for` 루프가 끝까지 실행되면 정리는 즉시 발생하지만, `break` 또는 예외(exception)로 인해 루프가 조기에 종료되면 제너레이터 객체가 가비지 컬렉트될 때까지 `with` 블록은 실행되지 않습니다.

올바른 해결책은 이 API의 모든 사용자가 모든 `for` 루프를 자체 `with` 블록으로 래핑(wrap)해야 한다는 것입니다.

```python
from contextlib import closing

with closing(read_newline_separated_json(path)) as genobj:
    for document in genobj:
        ...
```

여러 개의 중첩된 제너레이터(nested generators)로 복잡한 파이프라인(pipeline)을 분해하는 관용구(idiom)를 고려하면 상황은 더욱 악화됩니다.

```python
def read_users(path):
    with closing(read_newline_separated_json(path)) as gen:
        for document in gen:
            yield User.from_json(document)

def users_in_group(path, group):
    with closing(read_users(path)) as gen:
        for user in gen:
            if user.group == group:
                yield user
```

일반적으로 N개의 중첩된 제너레이터가 있다면, 1개의 파일을 정리하기 위해 N+1개의 `with` 블록이 필요합니다. 좋은 방어적 프로그래밍(defensive programming)은 제너레이터를 사용할 때마다, 현재 또는 미래에 잠재적으로 하나 이상의 `with` 블록이 호출 스택(call stack) 어딘가에 있을 가능성을 가정하고 항상 `with`로 래핑할 것을 제안합니다. 그러나 실제로는 프로그래머들이 지루하고 반복적인 코드보다는 버그가 있는 코드를 작성하는 경향이 있기 때문에 거의 아무도 이렇게 하지 않습니다. 이와 같은 간단한 경우에는 좋은 Python 개발자들이 아는 몇 가지 해결책이 있지만 (예: 이 간단한 경우 파일 핸들(file handle)을 전달하고 리소스 관리를 최상위 수준으로 옮기는 것이 관용적입니다), 일반적으로 제너레이터 내에서 `with`/`finally` 사용을 피할 수 없으므로 이 문제를 어떤 식으로든 처리해야 합니다. "아름다움"과 "정확성"이 충돌할 때 아름다움이 이기는 경향이 있으므로, 올바른 코드를 아름답게 만드는 것이 중요합니다.

여전히 이 문제를 해결할 가치가 있을까요? 비동기 제너레이터가 등장하기 전까지는 그렇다고 주장했겠지만, 우선순위가 낮다고 생각했습니다. 모두가 그럭저럭 잘 지내고 있는 것처럼 보였기 때문입니다. 하지만 비동기 제너레이터는 이 문제를 훨씬 더 시급하게 만듭니다. 비동기 제너레이터는 사람들이 실제로 사용할 확정적 정리 메커니즘 없이는 전혀 정리를 수행할 수 없으며, 비동기 제너레이터는 파일 디스크립터와 같은 리소스를 보유할 가능성이 특히 높습니다. (결국, I/O를 수행하지 않았다면 비동기 제너레이터가 아니라 일반 제너레이터였을 것입니다.) 따라서 우리는 뭔가 해야 하며, 근본적인 문제에 대한 포괄적인 해결책을 마련하는 것이 좋습니다. 그리고 비동기 제너레이터가 처음 출시될 때 이 문제를 해결하는 것이 나중에 해결하는 것보다 훨씬 쉽습니다.

제안 자체는 개념적으로 간단합니다. 이터레이터 프로토콜에 `__(a)iterclose__` 메서드를 추가하고, `for` (또는 `async for`) 루프가 `break` 또는 예외 해제(exception unwinding)를 통해 종료되더라도 이 루프가 종료될 때 이를 호출하도록 합니다. 효과적으로 우리는 현재의 번거로운 관용구 (`with` 블록 + `for` 루프)를 결합하여 더 멋진 `for` 루프를 만드는 것입니다. 이는 비직교적(non-orthogonal)으로 보일 수 있지만, 제너레이터의 존재가 `with` 블록이 안정적으로 작동하기 위해 이터레이터 정리에 의존한다는 점과 이터레이터 정리가 그 자체로 바람직한 기능인 경우가 많다는 경험을 고려하면 합리적입니다.

### 대안 (Alternatives)

#### PEP 525 asyncgen hooks
PEP 525는 새로운 `sys.{get/set}_asyncgen_hooks()` 함수로 관리되는 전역 스레드-로컬(thread-local) 훅(hook) 집합을 제안합니다. 이는 이벤트 루프(event loop)가 가비지 컬렉터와 통합되어 비동기 제너레이터의 정리를 실행할 수 있도록 합니다. 원칙적으로 이 제안과 PEP 525는 `with` 블록과 `__del__`이 상호보완적인 방식과 같이 상호보완적입니다. 이 제안은 대부분의 경우 확정적 정리를 보장하는 반면, PEP 525의 GC 훅은 놓칠 수 있는 모든 것을 정리합니다. 그러나 `__aiterclose__`는 GC 훅 단독으로는 얻을 수 없는 여러 장점을 제공합니다.

*   **추상 프로토콜 준수:** GC 훅의 시맨틱(semantics)은 추상 비동기 이터레이터 프로토콜의 일부가 아니라, 비동기 제너레이터 구체 타입(concrete type)에만 한정됩니다. 만약 다음과 같이 클래스를 사용하여 구현된 비동기 이터레이터가 있다면:

    ```python
    class MyAsyncIterator:
        async def __anext__():
            ...
    ```

    이를 시맨틱 변경 없이 비동기 제너레이터로 리팩토링(refactor)할 수 없으며, 그 반대도 마찬가지입니다. 이는 매우 Python적이지 않습니다. (`__aiterclose__`와 달리) 클래스 기반 비동기 이터레이터가 비동기 제너레이터와 정확히 동일한 정리 문제에 직면한다는 점을 감안할 때, 이들이 정확히 무엇을 해야 하는지에 대한 의문도 남습니다. 반면 `__aiterclose__`는 프로토콜 수준에서 정의되므로, 덕 타이핑(duck-typing) 친화적이며 제너레이터뿐만 아니라 모든 이터레이터에서 작동합니다.

*   **비-CPython 구현체 호환성:** PyPy와 같은 비-CPython 구현체에서 작동하는 코드는 일반적으로 정리를 위해 GC에 의존할 수 없습니다. `__aiterclose__`가 없다면, CPython에서 개발하고 테스트하는 개발자들이 PyPy에서 사용될 때 리소스를 누출하는 라이브러리(library)를 만들 가능성이 거의 확실합니다. 대체 구현체를 목표로 하는 개발자들은 모든 `for` 루프를 `with` 블록으로 래핑하는 방어적인 접근 방식을 취하거나, 어떤 제너레이터가 정리 코드를 포함할 수 있는지 신중하게 코드를 감사(audit)하고 해당 부분에만 `with` 블록을 추가해야 할 것입니다. `__aiterclose__`를 사용하면 이식성(portable) 있는 코드를 작성하는 것이 쉽고 자연스러워집니다.

*   **예외 전파(exception propagation)의 견고성:** 견고한 소프트웨어(robust software)를 구축하는 중요한 부분은 예외가 손실되지 않고 항상 올바르게 전파되도록 하는 것입니다. `async`/`await`가 전통적인 콜백(callback) 기반 시스템에 비해 가장 흥미로운 점 중 하나는 수동 체인(manual chaining)이 필요 없이 런타임(runtime)이 오류 전파의 무거운 작업을 수행하여 견고한 코드를 훨씬 쉽게 작성할 수 있다는 것입니다. 그러나 이 새로운 그림에는 한 가지 큰 공백이 있습니다. 제너레이터 정리를 위해 GC에 의존한다면, 정리 중에 발생한 예외는 손실됩니다. 따라서 다시 한번, `__aiterclose__`가 없다면, 이러한 종류의 견고성에 관심 있는 개발자들은 모든 `for` 루프를 `with` 블록으로 래핑하는 방어적인 접근 방식을 취하거나, 어떤 제너레이터가 정리 코드를 포함할 수 있는지 신중하게 코드를 감사해야 할 것입니다. `__aiterclose__`는 호출자(caller)의 컨텍스트(context)에서 정리를 수행하여 이 공백을 메우므로, 더 견고한 코드를 작성하는 것이 가장 쉬운 방법이 됩니다.

*   **WSGI와 같은 API의 즉각적인 정리 요구사항:** WSGI 경험은 CPython에서조차 즉각적인 정리가 필요하고 GC에 의존할 수 없는 중요한 이터레이터 기반 API가 존재함을 시사합니다. 예를 들어, `async`/`await` 및 비동기 이터레이터를 기반으로 하는 가상의 WSGI와 같은 API를 고려해 봅시다. 여기서 응답 핸들러(response handler)는 요청 헤더(header) + 요청 본문(body)에 대한 비동기 이터레이터를 가져와 응답 헤더 + 응답 본문을 산출하는 비동기 제너레이터입니다. (이것은 사실 제가 처음 비동기 제너레이터에 관심을 갖게 된 사용 사례입니다. 즉, 가상이 아닙니다.) 자식 이터레이터가 올바르게 닫혀야 한다는 WSGI 요구사항을 따른다면, `__aiterclose__` 없이는 시스템에서 가장 최소한의 미들웨어는 다음과 같습니다.

    ```python
    from contextlib import aclosing

    async def noop_middleware(handler, request_header, request_body):
        async with aclosing(handler(request_body, request_body)) as aiter:
            async for response_item in aiter:
                yield response_item
    ```

    일반 코드에서는 제너레이터의 내부 구현을 얼마나 잘 이해하는지에 따라 `for` 루프 주변의 `with` 블록을 건너뛸 수 있다고 주장할 수 있습니다. 그러나 여기서는 임의의 응답 핸들러를 처리해야 하므로, `__aiterclose__`가 없으면 이 `with` 구성은 모든 미들웨어의 필수적인 부분이 됩니다.

    `__aiterclose__`는 모든 미들웨어에서 필수적인 상용구(boilerplate)와 추가적인 들여쓰기(indentation) 수준을 제거할 수 있도록 합니다.

    ```python
    async def noop_middleware(handler, request_header, request_body):
        async for response_item in handler(request_header, request_body):
            yield response_item
    ```

    따라서 `__aiterclose__` 접근 방식은 GC 훅보다 상당한 이점을 제공합니다.

이것은 GC 훅 + `__aiterclose__`의 조합을 원하는지, 아니면 `__aiterclose__`만 원하는지에 대한 질문을 남깁니다. 대다수의 제너레이터는 `for` 루프 또는 이와 동등한 것을 사용하여 이터레이션(iteration)되므로, GC가 개입할 기회를 갖기 전에 `__aiterclose__`가 대부분의 상황을 처리합니다. GC 훅이 추가적인 가치를 제공하는 경우는 수동 이터레이션(manual iteration)을 수행하는 코드, 예를 들어 다음과 같습니다.

```python
agen = fetch_newline_separated_json_from_url(...)
while True:
    document = await type(agen).__anext__(agen)
    if document["id"] == needle:
        break # 'await agen.aclose()'를 호출하지 않음
```

만약 GC 훅 + `__aiterclose__` 접근 방식을 따른다면, 이 제너레이터는 결국 GC가 제너레이터의 `__del__` 메서드를 호출함으로써 정리될 것이며, 이는 훅을 사용하여 이벤트 루프를 다시 호출하여 정리 코드를 실행합니다.

만약 GC 훅을 사용하지 않는 접근 방식을 따른다면, 이 제너레이터는 결국 가비지 컬렉트될 것이며, 다음과 같은 효과가 발생합니다.

*   `__del__` 메서드는 제너레이터가 닫히지 않았다는 경고를 발행합니다 (기존의 "코루틴이 한 번도 `await`되지 않았습니다" 경고와 유사).
*   관련된 기본 리소스는 여전히 정리됩니다. 왜냐하면 제너레이터 프레임(frame)이 여전히 가비지 컬렉트되어, 보유하고 있는 파일 핸들이나 소켓(socket)에 대한 참조를 해제하고, 해당 객체의 `__del__` 메서드가 실제 운영체제 리소스를 해제하기 때문입니다. 그러나 제너레이터 자체 내의 모든 정리 코드 (예: 로깅, 버퍼 플러싱)는 실행될 기회를 얻지 못할 것입니다.

여기서의 해결책은 — 경고가 나타내듯이 — 코드를 수정하여 `__aiterclose__`를 호출하도록 하는 것입니다. 예를 들어 `with` 블록을 사용합니다.

```python
async with aclosing(fetch_newline_separated_json_from_url(...)) as agen:
    while True:
        document = await type(agen).__anext__(agen)
        if document["id"] == needle:
            break
```

기본적으로 이 접근 방식에서 규칙은 만약 이터레이터 프로토콜을 수동으로 구현하고자 한다면, 모든 것을 구현할 책임이 있으며, 이제 여기에는 `__(a)iterclose__`도 포함된다는 것입니다.

GC 훅은 (a) 새로운 전역 인터프리터 상태, (b) 다소 복잡한 제어 흐름 (예: 비동기 제너레이터 GC는 항상 부활(resurrection)을 포함하므로 PEP 442의 세부 사항이 중요합니다), (c) 사용자가 적절한 시기에 호출해야 할 새로운 asyncio 공용 API (`await loop.shutdown_asyncgens()`)의 형태로 상당한 복잡성을 추가합니다. (이 마지막 요점은 특히 GC 훅이 정리를 보장하는 안전한 백업(backup)을 제공한다는 주장을 어느 정도 약화시킵니다. 왜냐하면 `shutdown_asyncgens()`가 올바르게 호출되지 않으면 제너레이터가 정리 코드가 호출되지 않고 조용히 폐기될 가능성이 있다고 생각하기 때문입니다. `__aiterclose__` 전용 접근 방식과 비교해 보면, 최악의 경우에도 경고가 출력됩니다. 이것은 수정될 수 있습니다.) 이 모든 것을 고려할 때, GC 훅은 수동으로 `__anext__`를 호출하고 싶지만 수동으로 `__aiterclose__`를 호출하고 싶지 않은 사람들에게만 도움이 된다는 점을 감안할 때 논란의 여지가 있습니다. 그러나 Yury는 이 점에 대해 저와 의견이 다릅니다 :-). 그리고 두 옵션 모두 실행 가능합니다.

#### 항상 리소스를 주입하고, 모든 정리는 최상위 수준에서 수행
`python-dev` 및 `python-ideas`의 여러 코멘터들은 이러한 문제를 피하기 위한 패턴으로 항상 위에서부터 리소스를 전달하는 것을 제안했습니다. 예를 들어, `read_newline_separated_json`은 경로(path) 대신 파일 객체를 받아야 하고, 정리는 최상위 수준에서 처리되어야 합니다.

```python
def read_newline_separated_json(file_handle):
    for line in file_handle:
        yield json.loads(line)

def read_users(file_handle):
    for document in read_newline_separated_json(file_handle):
        yield User.from_json(document)

with open(path) as file_handle:
    for user in read_users(file_handle):
        ...
```

이것은 간단한 경우에 잘 작동합니다. 여기서는 "N+1 with 블록 문제"를 피할 수 있습니다. 그러나 안타깝게도 상황이 더 복잡해지면 빠르게 한계에 도달합니다. 파일에서 읽는 대신, 제너레이터가 스트리밍 HTTP GET 요청에서 읽는다고 가정해 봅시다. 이 경우 OAUTH를 통해 리다이렉트(redirect) 및 인증(authentication)을 처리합니다. 그러면 소켓은 최상위 수준이 아니라 HTTP 클라이언트 라이브러리 내에서 관리되기를 원할 것입니다. 또한 제너레이터 내에 포함된 `finally` 블록이 그 자체로 중요한 다른 경우도 있습니다: DB 트랜잭션 관리, 정리 중에 로깅 정보 발행 (WSGI `close`의 주요 동기 부여 사용 사례 중 하나) 등. 따라서 이것은 간단한 경우를 위한 해결책이지, 일반적인 해결책은 아닙니다.

#### `__(a)iterclose__`의 더 복잡한 변형
`__(a)iterclose__`의 시맨틱은 `with` 블록에서 다소 영감을 받았지만, 컨텍스트 매니저(context manager)는 더 강력합니다. `__(a)exit__`는 정상 종료와 예외 해제(exception unwinding)를 구분할 수 있으며, 예외 발생 시 예외 세부 사항을 검토하고 선택적으로 전파를 억제할 수 있습니다. 여기에서 제안된 `__(a)iterclose__`는 이러한 기능을 가지고 있지 않지만, 이를 가능하게 하는 대체 설계를 상상할 수 있습니다.

그러나 이는 불필요한 복잡성으로 보입니다. 경험에 따르면 이터러블이 `close` 메서드를 갖는 것이 일반적이고, `self.close()`를 호출하는 `__exit__` 메서드를 갖는 것도 일반적이지만, `__exit__`의 모든 기능을 활용하는 일반적인 사례는 알지 못합니다. 또한 이것이 유용할 예시도 생각할 수 없습니다. 그리고 이터레이터가 예외를 삼킴으로써 흐름 제어(flow control)에 영향을 미치도록 허용하는 것은 불필요하게 혼란스러워 보입니다. 만약 정말로 그런 상황이 필요하다면, 어쨌든 실제 `with` 블록을 사용해야 할 것입니다.

### 명세 (Specification)
이 섹션에서는 궁극적으로 도달하고자 하는 목표를 설명합니다. 그러나 일부 하위 호환성(backwards compatibility) 문제가 있어 직접 도달할 수는 없습니다. 나중 섹션에서 전환 계획을 설명합니다.

#### 지침 원칙 (Guiding principles)
일반적으로 `__(a)iterclose__` 구현은 다음과 같아야 합니다.

*   **멱등성(idempotent):** `__(a)iterclose__`가 호출된 후에는 이터레이터가 다시 사용되지 않을 것이라는 가정하에 적절한 정리를 수행합니다. 특히, `__(a)iterclose__`가 호출된 후 `__(a)next__`를 호출하면 정의되지 않은 동작을 초래합니다.

그리고 일반적으로, 이터러블을 소진시킬 의도로 이터레이션을 시작하는 모든 코드는 이터레이터가 실제로 소진되었는지 여부에 관계없이 `__(a)iterclose__`가 결국 호출되도록 준비해야 합니다.

#### 이터레이션 변경 사항 (Changes to iteration)
핵심 제안은 `for` 루프의 동작 변경입니다. 다음 Python 코드를 고려하십시오.

```python
for VAR in ITERABLE:
    LOOP-BODY
else:
    ELSE-BODY
```

이는 다음의 동등한 코드로 변환됩니다.

```python
_iter = iter(ITERABLE)
_iterclose = getattr(type(_iter), "__iterclose__", lambda: None)
try:
    traditional-for VAR in _iter:
        LOOP-BODY
    else:
        ELSE-BODY
finally:
    _iterclose(_iter)
```

여기서 "traditional-for statement"는 기존의 3.5 버전 이전의 `for` 루프 시맨틱에 대한 약어(shorthand)를 의미합니다.

최상위 `for` 문 외에도 Python에는 이터레이터가 소비되는 다른 여러 곳이 있습니다. 일관성을 위해 이들도 위의 시맨틱과 동일하게 `__iterclose__`를 호출해야 합니다. 여기에는 다음이 포함됩니다.

*   컴프리헨션(comprehensions) 내의 `for` 루프
*   `list(it)`, `tuple(it)`, `itertools.product(it1, it2, ...)` 등과 같이 이터러블을 받아 완전히 소비하는 언패킹(unpacking) 함수

또한, 성공적으로 호출된 제너레이터를 소진시키는 `yield from`은 마지막 단계로 `__iterclose__` 메서드를 호출해야 합니다. (근거: `yield from`은 이미 호출하는 제너레이터의 수명을 호출된 제너레이터의 수명에 연결합니다. 만약 호출하는 제너레이터가 `yield from` 중간에 닫히면, 이는 이미 호출된 제너레이터를 자동으로 닫을 것입니다.)

#### 비동기 이터레이션 변경 사항 (Changes to async iteration)
비동기 이터레이터 구성에도 유사한 변경 사항을 적용합니다. 단, 새로운 슬롯은 `__aiterclose__`라고 불리며, `await`되는 비동기 메서드입니다.

#### 기본 이터레이터 타입의 수정 (Modifications to basic iterator types)

**제너레이터 객체 (제너레이터 컴프리헨션으로 생성된 것도 포함):**
*   `__iterclose__`는 `self.close()`를 호출합니다.
*   `__del__`은 `self.close()`를 호출하고 (현재와 동일하게), 제너레이터가 소진되지 않았다면 추가적으로 `ResourceWarning`을 발행합니다. 이 경고는 기본적으로 숨겨져 있지만, CPython 특정 GC 시맨틱에 의도치 않게 의존하지 않도록 하고 싶은 사람들을 위해 활성화할 수 있습니다.

**비동기 제너레이터 객체 (비동기 제너레이터 컴프리헨션으로 생성된 것도 포함):**
*   `__aiterclose__`는 `self.aclose()`를 호출합니다.
*   `__del__`은 `aclose`가 호출되지 않았다면 `RuntimeWarning`을 발행합니다. 이는 "코루틴이 한 번도 `await`되지 않았습니다" 경고와 유사하게 잠재적인 버그를 나타낼 가능성이 높기 때문입니다.

**질문:** 파일 객체도 파일을 닫기 위해 `__iterclose__`를 구현해야 할까요? 한편으로는 이 변경이 더 파괴적(disruptive)일 수 있습니다. 다른 한편으로는 사람들이 `for line in open(...): ...`와 같이 작성하는 것을 정말 좋아하며, 이터레이터가 스스로 정리를 처리하는 것에 익숙해지면 파일이 그렇지 않을 경우 매우 이상하게 느껴질 수 있습니다.

#### 새로운 편의 함수 (New convenience functions)
`operator` 모듈은 다음의 시맨틱과 동등한 두 개의 새로운 함수를 얻습니다.

```python
import collections.abc
import operator

def iterclose(it):
    if not isinstance(it, collections.abc.Iterator):
        raise TypeError("not an iterator")
    if hasattr(type(it), "__iterclose__"):
        type(it).__iterclose__(it)

async def aiterclose(ait):
    if not isinstance(ait, collections.abc.AsyncIterator): # 'it' -> 'ait'로 수정
        raise TypeError("not an iterator")
    if hasattr(type(ait), "__aiterclose__"):
        await type(ait).__aiterclose__(ait)
```

`itertools` 모듈은 새로운 `iterator wrapper`를 얻습니다. 이는 새로운 `__iterclose__` 동작을 선택적으로 비활성화하는 데 사용할 수 있습니다.

```python
# 질문: 이것에 더 나은 이름이 있을 것 같다는 느낌이 듭니다.
class preserve(object): # object를 상속받는 class로 변경
    def __init__(self, iterable):
        self._it = iter(iterable)
    def __iter__(self):
        return self
    def __next__(self):
        return next(self._it)
    def __iterclose__(self):
        # __iterclose__를 전달하지 않고 삼킵니다.
        pass
```

예시 사용 (파일 객체가 `__iterclose__`를 구현한다고 가정):

```python
import itertools

with open(...) as handle:
    # 동일한 파일을 두 번 이터레이션합니다.
    for line in itertools.preserve(handle):
        ...
    handle.seek(0)
    for line in itertools.preserve(handle):
        ...
```

```python
import contextlib

@contextlib.contextmanager
def iterclosing(iterable):
    it = iter(iterable)
    try:
        yield preserve(it)
    finally:
        iterclose(it)
```

#### 이터레이터 래퍼를 위한 `__iterclose__` 구현 (`__iterclose__` implementations for iterator wrappers)
Python은 `map`, `zip`, `itertools.accumulate`, `csv.reader` 등 다른 이터레이터를 래핑하는 여러 이터레이터 타입을 제공합니다. 이러한 이터레이터는 `__iterclose__` 메서드를 정의하여 기본 이터레이터에 `__iterclose__`를 차례로 호출해야 합니다. 예를 들어, `map`은 다음과 같이 구현될 수 있습니다.

```python
# Helper function
def map_chaining_exceptions(fn, items, last_exc=None):
    for item in items:
        try:
            fn(item)
        except BaseException as new_exc:
            if new_exc.__context__ is None:
                new_exc.__context__ = last_exc
            last_exc = new_exc
    if last_exc is not None:
        raise last_exc

class MapIterator: # map은 내장 함수이므로 MapIterator로 이름 변경
    def __init__(self, fn, *iterables):
        self._fn = fn
        self._iters = [iter(iterable) for iterable in iterables]
    def __iter__(self):
        return self
    def __next__(self):
        return self._fn(*[next(it) for it in self._iters])
    def __iterclose__(self):
        map_chaining_exceptions(iterclose, self._iters) # operator.iterclose 대신 iterclose 사용

# chain 함수 예시 (부분 발췌)
def chain(*iterables):
    try:
        while iterables:
            for element in iterables[0]: # pop(0)는 리스트에만 적용되므로 인덱싱으로 변경
                yield element
            iterables = iterables[1:] # 0번째 요소를 제거하는 대신 나머지 슬라이싱
    except BaseException as e:
        def iterclose_iterable(iterable):
            iterclose(iter(iterable)) # operations.iterclose 대신 iterclose 사용
        map_chaining_exceptions(iterclose_iterable, iterables, last_exc=e)
```

어떤 경우에는 미묘한 작업이 필요합니다. 예를 들어, `itertools.tee`는 모든 복제된 이터레이터(clone iterators)에서 `__iterclose__`가 호출될 때까지 기본 이터레이터에 `__iterclose__`를 호출해서는 안 됩니다.

### 예시 / 근거 (Example / Rationale)
이 모든 것의 효과는 이제 다음과 같이 간단한 코드를 작성할 수 있다는 것입니다.

```python
def read_newline_separated_json(path):
    for line in open(path):
        yield json.loads(line)
```

그리고 최종 사용자가 복잡한 경우에도 특별한 노력을 기울일 필요 없이 파일이 확정적으로 정리될 것이라고 확신할 수 있습니다. 예를 들어, 이 어리석은 파이프라인을 고려해 봅시다.

```python
list(map(lambda key: key.upper(), doc["key"] for doc in read_newline_separated_json(path)))
```

만약 파일에 `doc["key"]`가 정수(integer)로 판명되는 문서가 포함되어 있다면, 다음 일련의 사건이 발생할 것입니다.

1.  `key.upper()`가 `AttributeError`를 발생시키고, 이는 `map`에서 전파되어 `list` 내부의 암묵적인 `finally` 블록을 트리거합니다.
2.  `list`의 `finally` 블록은 `map` 객체에 `__iterclose__()`를 호출합니다.
3.  `map.__iterclose__()`는 제너레이터 컴프리헨션(generator comprehension) 객체에 `__iterclose__()`를 호출합니다.
4.  이는 제너레이터 컴프리헨션 본문으로 `GeneratorExit` 예외를 주입합니다. 이 시점에서 제너레이터 컴프리헨션은 컴프리헨션의 `for` 루프 본문 내에서 일시 중단되어 있습니다.
5.  예외가 `for` 루프에서 전파되어 `for` 루프의 암묵적인 `finally` 블록을 트리거하고, 이는 `read_newline_separated_json` 호출을 나타내는 제너레이터 객체에 `__iterclose__`를 호출합니다.
6.  이는 `read_newline_separated_json` 본문으로 내부 `GeneratorExit` 예외를 주입합니다. 이 시점에서 `read_newline_separated_json`은 `yield`에서 일시 중단되어 있습니다.
7.  내부 `GeneratorExit`가 `for` 루프에서 전파되어 `for` 루프의 암묵적인 `finally` 블록을 트리거하고, 이는 파일 객체에 `__iterclose__()`를 호출합니다.
8.  파일 객체가 닫힙니다.
9.  내부 `GeneratorExit`가 전파를 재개하고, 제너레이터 함수의 경계에 도달하여 `read_newline_separated_json`의 `__iterclose__()` 메서드가 성공적으로 반환하도록 합니다.
10. 제어는 제너레이터 컴프리헨션 본문으로 돌아오고, 외부 `GeneratorExit`는 계속 전파되어 컴프리헨션의 `__iterclose__()`가 성공적으로 반환할 수 있도록 합니다.
11. 나머지 `__iterclose__()` 호출은 아무 문제 없이 해제되어 `list`의 본문으로 돌아갑니다.
12. 원래의 `AttributeError`가 전파를 재개합니다.

(위의 세부 사항은 `file.__iterclose__`를 구현한다고 가정합니다. 그렇지 않다면 `read_newline_separated_json`에 `with` 블록을 추가하고 기본적으로 동일한 로직이 적용됩니다.)

물론, 사용자 관점에서 보면 이것은 단순히 다음과 같이 단순화될 수 있습니다.

1.  `int.upper()`가 `AttributeError`를 발생시킵니다.
2.  파일 객체가 닫힙니다.
3.  `AttributeError`가 `list`에서 전파됩니다.

따라서 우리는 사용자가 생각할 필요 없이 "그냥 작동"하도록 만들겠다는 목표를 달성했습니다.

### 전환 계획 (Transition plan)
대부분의 기존 `for` 루프는 동일한 결과를 계속해서 생성하겠지만, 제안된 변경 사항은 일부 경우에 하위 호환되지 않는(backwards-incompatible) 동작을 생성할 것입니다. 예시:

```python
def read_csv_with_header(lines_iterable):
    lines_iterator = iter(lines_iterable)
    for line in lines_iterator:
        column_names = line.strip().split("\t")
        break
    for line in lines_iterator:
        values = line.strip().split("\t")
        record = dict(zip(column_names, values))
        yield record
```

이 코드는 이전에는 올바랐지만, 이 제안이 구현된 후에는 첫 번째 `for` 루프에 `itertools.preserve` 호출을 추가해야 합니다.

[질문: 현재, 제너레이터를 닫고 나서 그것을 이터레이션하려고 하면 단순히 `Stop(Async)Iteration`을 발생시키므로, 동일한 제너레이터 객체를 여러 `for` 루프에 전달하고 `itertools.preserve`를 사용하는 것을 잊어버린 코드는 명확한 오류를 보지 못할 것입니다. 두 번째 `for` 루프는 즉시 종료될 뿐입니다. 닫힌 제너레이터를 이터레이션하려고 할 때 `RuntimeError`를 발생시키는 것이 더 나을까요? 파일은 이러한 문제가 없다는 점에 유의하십시오. 닫힌 파일 객체를 이터레이션하려고 하면 이미 `ValueError`가 발생합니다.]

구체적으로, 비호환성은 다음 요소들이 모두 충족될 때 발생합니다.

*   `__(a)iterclose__`의 자동 호출이 활성화됨
*   이전에 이터러블이 `__(a)iterclose__`를 정의하지 않았음
*   이제 이터러블이 `__(a)iterclose__`를 정의함
*   `for` 루프 종료 후 이터러블이 재사용됨

따라서 문제는 이러한 전환을 어떻게 관리할 것인가이며, 이것이 우리가 다룰 수 있는 지렛대(levers)입니다.

먼저, `__aiterclose__`를 추가할 것을 제안하는 유일한 비동기 이터러블은 비동기 제너레이터이며, 현재 비동기 제너레이터를 사용하는 기존 코드는 없으므로 (매우 곧 변경되기 시작하겠지만), 비동기 변경 사항은 하위 호환성 문제를 일으키지 않습니다. (비동기 이터레이터를 사용하는 기존 코드는 있지만, 새 `async for` 루프를 오래된 비동기 이터레이터에 사용하는 것은 해롭지 않습니다. 왜냐하면 오래된 비동기 이터레이터는 `__aiterclose__`를 가지고 있지 않기 때문입니다.) 또한 PEP 525는 잠정적으로 승인되었으며, 비동기 제너레이터는 이 PEP의 제안된 변경 사항의 가장 큰 수혜자입니다. 따라서 `async for` 루프와 비동기 제너레이터에 `__aiterclose__`를 가능한 한 빨리, 이상적으로는 3.6.0 또는 3.6.1에 활성화하는 것을 강력히 고려해야 한다고 생각합니다.

비동기 세계가 아닌 경우 상황은 더 어렵지만, 잠재적인 전환 경로는 다음과 같습니다.

**3.7 버전:**
우리의 목표는 기존의 안전하지 않은 코드가 경고를 발행하기 시작하고, 미래의 기능을 사용하고 싶은 사람들은 즉시 옵트인(opt-in)할 수 있도록 하는 것입니다.

*   위에 설명된 모든 `__iterclose__` 메서드를 즉시 추가합니다.
*   `from __future__ import iterclose`가 적용되면, `for` 루프와 `*` 언패킹은 위에 명시된 대로 `__iterclose__`를 호출합니다.
*   `__future__`가 활성화되지 않으면, `for` 루프와 `*` 언패킹은 `__iterclose__`를 호출하지 않습니다. 그러나 대신 다른 메서드, 예를 들어 `__iterclose_warning__`을 호출합니다.
*   마찬가지로, `list`와 같은 함수는 스택 인트로스펙션(stack introspection)(!!)을 사용하여 직접 호출자가 `__future__.iterclose`를 활성화했는지 확인하고, 이를 사용하여 `__iterclose__` 또는 `__iterclose_warning__`을 호출할지 결정합니다.
*   모든 래퍼 이터레이터(wrapper iterators)의 경우, 기본 이터레이터 또는 이터레이터의 `__iterclose_warning__` 메서드로 전달되는 `__iterclose_warning__` 메서드도 추가합니다.
*   제너레이터 (그리고 파일, 그렇게 하기로 결정한다면)의 경우, `__iterclose_warning__`은 내부 플래그(flag)를 설정하도록 정의되고, 객체의 다른 메서드는 이 플래그를 확인하도록 수정됩니다. 만약 플래그가 설정된 것을 발견하면, `PendingDeprecationWarning`을 발행하여 사용자에게 미래에는 이 시퀀스가 `use-after-close` 상황으로 이어졌을 것이며 `preserve()`를 사용해야 한다고 알립니다.

**3.8 버전:**
*   `PendingDeprecationWarning`에서 `DeprecationWarning`으로 전환합니다.

**3.9 버전:**
*   `__future__`를 무조건적으로 활성화하고 모든 `__iterclose_warning__` 관련 내용을 제거합니다.

저는 이 전환 계획이 이러한 종류의 전환에 대한 일반적인 요구 사항을 충족한다고 생각합니다. 초기에는 옵트인, 영향을 받을 경우에만 정확하게 경고를 발생시키고, 긴 Deprecation Cycle을 제공합니다.

아마도 이것의 가장 논란이 많거나 위험한 부분은 이터러블을 소비하는 함수가 `__future__` 설정에 민감하게 반응하도록 스택 인트로스펙션을 사용하는 것입니다. 아직까지 이것이 실제로 잘못될 수 있는 상황은 생각하지 못했지만 말입니다.

### 감사의 글 (Acknowledgements)
이 아이디어의 초기 버전에 대한 유용한 논의를 해주신 Yury Selivanov, Armin Rigo, Carl Friedrich Bolz에게 감사드립니다.

### 저작권 (Copyright)
이 문서는 공공 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.