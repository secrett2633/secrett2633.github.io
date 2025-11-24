---
title: "[Withdrawn] PEP 334 - Simple Coroutines via SuspendIteration"
excerpt: "Python Enhancement Proposal 334: 'Simple Coroutines via SuspendIteration'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/334/
toc: true
toc_sticky: true
date: 2025-09-26 18:43:20+0900
last_modified_at: 2025-09-26 18:43:20+0900
published: true
---
> **원문 링크:** [PEP 334 - Simple Coroutines via SuspendIteration](https://peps.python.org/pep-0334/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 26-Aug-2004

# PEP 334 – SuspendIteration을 통한 간단한 코루틴 (Simple Coroutines via SuspendIteration)

*   **작성자:** Clark C. Evans
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2004년 8월 26일
*   **Python 버전:** 3.0
*   **최종 수정일:** 2025년 2월 1일

## 개요 (Abstract)

Twisted 및 Peak와 같은 비동기 애플리케이션 프레임워크는 이벤트 큐(event queues) 또는 지연 실행(deferred execution)을 통한 협력적 멀티태스킹(cooperative multitasking)을 기반으로 합니다. 이러한 애플리케이션 개발 방식은 스레드를 사용하지 않으므로 특정 유형의 문제를 피할 수 있지만, 다른 종류의 프로그래밍 과제를 야기합니다. I/O 작업이 블록될 때, 다른 요청이 진행될 수 있도록 사용자 요청은 일시 중단(suspend)되어야 합니다. 코루틴(coroutine) 개념은 애플리케이션 개발자가 이러한 상태 관리의 어려움을 해결하는 데 도움이 될 수 있습니다.

이 PEP는 이터레이터 프로토콜(iterator protocol)의 확장을 기반으로 하는 제한적인 코루틴 접근 방식을 제안합니다. 현재 이터레이터는 더 이상 값을 생성할 수 없음을 나타내기 위해 `StopIteration` 예외를 발생시킵니다. 이 제안은 이 프로토콜에 `SuspendIteration`이라는 또 다른 예외를 추가합니다. 이 예외는 주어진 이터레이터가 아직 생성할 값이 더 있을 수 있지만, 현재는 그럴 수 없음을 나타냅니다.

## 배경 (Rationale)

현재 Python에 코루틴 기능을 도입하는 두 가지 접근 방식이 있습니다. Christian Tismer의 Stackless는 'C' 스택을 해킹하여 Python의 실행 모델을 근본적으로 재구성하는 방식입니다. 이 방식은 작동하지만, 그 동작을 설명하고 이식성을 유지하기가 어렵습니다. 관련 접근 방식으로는 Python 코드를 레지스터 기반의 가상 머신인 Parrot으로 컴파일하는 것이 있는데, Parrot은 코루틴을 지원합니다. 불행히도, 이 두 솔루션 모두 IronPython (CLR) 또는 Jython (JavaVM)과의 이식성이 좋지 않습니다.

이터레이터를 기반으로 하는 좀 더 제한적인 접근 방식이 애플리케이션 프로그래머에게 코루틴 기능을 제공하면서도 런타임 간 이식성을 유지할 수 있을 것이라고 생각되었습니다.

이터레이터는 'C' 스택에 있지 않은 지역 변수에 상태를 유지합니다. 이터레이터는 `next()` 메서드 호출 간에 상태가 멤버 변수에 저장되는 클래스로 볼 수 있습니다. 처리되지 않은 예외(uncaught exception)가 함수의 실행을 종료시킬 수 있지만, 처리되지 않은 예외가 반드시 이터레이터를 무효화할 필요는 없습니다. 제안된 `SuspendIteration` 예외는 이 기능을 사용합니다. 즉, `next()` 호출 중 하나가 예외를 발생시켰다고 해서 이터레이터 자체가 더 이상 값을 생성할 수 없음을 의미할 필요는 없다는 것입니다.

이 새로운 예외는 네 가지 영역에 영향을 미칩니다.

1.  PEP 255의 간단한 제너레이터(generator) 메커니즘은 이 `SuspendIteration` 예외를 안전하게 '잡아내고', 현재 상태를 저장하며, 예외를 호출자(caller)에게 전달하도록 확장될 수 있습니다.
2.  `itertools.izip`와 같은 표준 라이브러리의 다양한 이터레이터 필터는 이 `SuspendIteration` 예외를 인식하여 투명하게 전파할 수 있도록 만들어져야 합니다.
3.  파일 또는 소켓 리더와 같은 I/O 작업에서 생성된 이터레이터는 비블로킹(non-blocking) 방식으로 수정될 수 있습니다. 요청된 작업이 블록될 경우 `SuspendIteration`의 서브클래스(subclass)를 발생시킬 것입니다.
4.  `asyncore` 라이브러리는 이터레이터에서 값을 가져오는 기본적인 '러너(runner)'를 제공하도록 업데이트될 수 있습니다. `SuspendIteration` 예외가 잡히면, 러너는 실행 목록(`runlist`)에 있는 다음 이터레이터로 넘어갑니다. Twisted와 같은 외부 프레임워크는 FreeBSD의 `kqueue`나 Linux의 `epoll`을 기반으로 하는 대체 구현을 제공할 것입니다.

이러한 변경 사항이 극적으로 보일 수 있지만, continuations가 제공하는 유용성에 비하면 매우 적은 작업량입니다.

## 의미론 (Semantics)

이 섹션에서는 새로운 `SuspendIteration` 예외가 도입될 때 어떻게 동작하는지 높은 수준에서 설명합니다.

### 간단한 이터레이터 (Simple Iterators)

이터레이터의 현재 기능은 'one'과 'two' 두 값을 생성하는 간단한 예제를 통해 가장 잘 이해할 수 있습니다.

```python
class States:
    def __iter__(self):
        self._next = self.state_one
        return self
    def next(self):
        return self._next()
    def state_one(self):
        self._next = self.state_two
        return "one"
    def state_two(self):
        self._next = self.state_stop
        return "two"
    def state_stop(self):
        raise StopIteration
print(list(States()))
# 출력: ['one', 'two']
```

물론, 위와 동일한 이터레이션은 다음 제너레이터로 생성할 수 있습니다.

```python
def States():
    yield 'one'
    yield 'two'
print(list(States()))
# 출력: ['one', 'two']
```

### SuspendIteration 도입 (Introducing SuspendIteration)

'one'과 'two'를 생성하는 사이에 위의 제너레이터가 소켓 읽기에서 블록될 수 있다고 가정해 봅시다. 이 경우, 이터레이터가 값을 생성하는 것이 아직 완료되지 않았지만, 현재 값을 제공할 수 없음을 알리기 위해 `SuspendIteration`을 발생시키기를 원할 것입니다.

```python
from random import randint
from time import sleep

class SuspendIteration(Exception):
    pass

class NonBlockingResource:
    """임의로 두 번째 값을 생성할 수 없음"""
    def __iter__(self):
        self._next = self.state_one
        return self
    def next(self):
        return self._next()
    def state_one(self):
        self._next = self.state_suspend
        return "one"
    def state_suspend(self):
        rand = randint(1,10)
        if 2 == rand: # 2인 경우에만 두 번째 값을 생성 가능
            self._next = self.state_two
            return self.state_two()
        raise SuspendIteration() # 그렇지 않으면 SuspendIteration 발생
    def state_two(self):
        self._next = self.state_stop
        return "two"
    def state_stop(self):
        raise StopIteration

def sleeplist(iterator, timeout = .1):
    """리소스가 다음 값을 제공할 수 없을 때 다른 작업을 수행 (예: sleep)"""
    it = iter(iterator)
    retval = []
    while True:
        try:
            retval.append(it.next())
        except SuspendIteration:
            sleep(timeout) # 일시 중단되면 잠시 대기
            continue
        except StopIteration:
            break
    return retval

print(sleeplist(NonBlockingResource()))
# 출력: (랜덤 값에 따라 지연 후) ['one', 'two']
```

실제 상황에서 `NonBlockingResource`는 파일 이터레이터, 소켓 핸들 또는 기타 I/O 기반 생산자(producer)일 것입니다. `sleeplist`는 `asyncore` 또는 Twisted에서 발견되는 것과 같은 비동기 리액터(async reactor)일 것입니다. 물론 비블로킹 리소스는 제너레이터로 작성될 수도 있습니다.

```python
def NonBlockingResource():
    yield "one"
    while True:
        rand = randint(1,10)
        if 2 == rand: # 2인 경우에만 블록 해제
            break
        raise SuspendIteration() # 그렇지 않으면 SuspendIteration 발생
    yield "two"
```

대부분의 실제 콘텐츠 제너레이터는 애플리케이션 코드에 있지 않고, 저수준(low-level) I/O 기반 작업에 있을 것이므로 'suspend'라는 키워드를 추가할 필요는 없습니다. 대부분의 프로그래머가 `SuspendIteration()` 메커니즘에 노출될 필요가 없으므로 키워드는 필요하지 않습니다.

### 애플리케이션 이터레이터 (Application Iterators)

이전 예제는 다소 인위적이지만, 좀 더 '실제와 같은' 예제는 HTML 콘텐츠를 `yield`하고 데이터베이스에서 데이터를 가져오는 웹 페이지 제너레이터일 것입니다. 이것은 '생산자(producer)'도 '소비자(consumer)'도 아닌 필터(filter)의 예입니다.

```python
def ListAlbums(cursor):
    cursor.execute("SELECT title, artist FROM album")
    yield '<html><body><table><tr><td>Title</td><td>Artist</td></tr>'
    for (title, artist) in cursor:
        yield '<tr><td>%s</td><td>%s</td></tr>' % (title, artist)
    yield '</table></body></html>'
```

물론 문제는 데이터베이스가 어떤 행도 반환하기 전에 한동안 블록될 수 있고, 실행 중에 행이 한 번에 10개 또는 100개 블록으로 반환될 수 있다는 것입니다. 이상적으로는 데이터베이스가 다음 행 세트에 대해 블록될 경우, 다른 사용자 연결에 서비스를 제공할 수 있어야 합니다. 위 코드에는 `SuspendIteration`이 전혀 사용되지 않았다는 점에 주목하세요. 제대로 구현된다면, 애플리케이션 개발자는 동시성(concurrency) 문제보다는 기능에 집중할 수 있을 것입니다.

위 제너레이터에 의해 생성된 이터레이터는 상태를 유지하는 데 필요한 마법을 수행하면서도 예외를 하위 비동기 프레임워크로 전달해야 합니다. 다음은 클래스 기반 메서드로 코딩되었을 때 해당 이터레이터가 어떻게 보일지에 대한 예입니다.

```python
class ListAlbums:
    def __init__(self, cursor):
        self.cursor = cursor
    def __iter__(self):
        self.cursor.execute("SELECT title, artist FROM album")
        self._iter = iter(self.cursor) # 주의: 원문에는 self._cursor로 되어있으나 self.cursor가 맞음
        self._next = self.state_head
        return self
    def next(self):
        return self._next()
    def state_head(self):
        self._next = self.state_cursor
        return "<html><body><table><tr><td>Title</td><td>Artist</td></tr>"
    def state_tail(self):
        self._next = self.state_stop
        return "</table></body></html>"
    def state_cursor(self):
        try:
            (title,artist) = self._iter.next()
            return '<tr><td>%s</td><td>%s</td></tr>' % (title, artist)
        except StopIteration:
            self._next = self.state_tail
            return self.next()
        except SuspendIteration:
            # 그냥 통과(pass-through)
            raise
    def state_stop(self):
        raise StopIteration
```

### 복잡한 요인 (Complicating Factors)

위 예제는 간단하지만, 중간 제너레이터가 값을 '압축(condenses)'하는 경우, 즉 생성하는 각 값에 대해 두 개 이상의 값을 가져오는 경우 상황이 조금 더 복잡해집니다. 예를 들어:

```python
def pair(iterLeft,iterRight):
    rhs = iter(iterRight)
    lhs = iter(iterLeft)
    while True:
        yield (rhs.next(), lhs.next())
```

이 경우, 해당 이터레이터의 동작은 오른쪽 또는 왼쪽 이터레이터 중 하나가 `SuspendIteration`을 발생시키는 경우를 처리하기 위해 좀 더 미묘해야 합니다. 이는 생산 컨텍스트에서 `SuspendIteration` 예외가 발생할 수 있는 중간 상태를 인식하도록 제너레이터를 분해하는 문제입니다.

```python
class pair:
    def __init__(self, iterLeft, iterRight):
        self.iterLeft = iterLeft
        self.iterRight = iterRight
    def __iter__(self):
        self.rhs = iter(self.iterRight)
        self.lhs = iter(self.iterLeft)
        self._temp_rhs = None
        self._temp_lhs = None
        self._next = self.state_rhs
        return self
    def next(self):
        return self._next()
    def state_rhs(self):
        self._temp_rhs = self.rhs.next()
        self._next = self.state_lhs
        return self.next()
    def state_lhs(self):
        self._temp_lhs = self.lhs.next()
        self._next = self.state_pair
        return self.next()
    def state_pair(self):
        self._next = self.state_rhs
        return (self._temp_rhs, self._temp_lhs)
```

이 제안은 기존 제너레이터에 대해 이 클래스 기반 메서드를 사용하여 작성된 해당 이터레이터가 가능하다고 가정합니다. 문제는 제너레이터 내에서 일시 중단이 발생할 수 있는 별개의 상태를 식별하는 것으로 보입니다.

### 자원 정리 (Resource Cleanup)

현재 제너레이터 메커니즘은 `try/finally` 블록 내에서 `yield` 문이 허용되지 않는 예외와 이상한 상호작용을 합니다. `SuspendIteration` 예외는 또 다른 유사한 문제를 제공합니다. 이 문제의 영향은 명확하지 않습니다. 그러나 이전 섹션에서처럼 제너레이터를 상태 머신으로 다시 작성하는 것이 이 문제를 해결하여 상황이 더 나빠지지 않거나 심지어 `yield/finally` 상황을 제거할 수도 있습니다. 이 영역에 대한 추가 조사가 필요합니다.

### API 및 제한 사항 (API and Limitations)

이 제안은 이터레이터 체인을 '일시 중단(suspending)'하는 것만을 다루며, 일반 함수, 메서드 또는 'C' 확장 함수를 일시 중단하는 것은 다루지 않습니다. 'C' 코드에서 제너레이터를 생성하는 것에 대한 직접적인 지원은 없겠지만, `SuspendIteration` 의미론을 준수하는 네이티브 'C' 이터레이터는 확실히 가능합니다.

### 저수준 구현 (Low-Level Implementation)

PEP의 작성자는 아직 이 영역에 대해 언급할 만큼 Python 실행 모델에 익숙하지 않습니다.

## 참고 자료 (References)

*   Twisted (http://twistedmatrix.com)
*   Peak (http://peak.telecommunity.com)
*   C10K (http://www.kegel.com/c10k.html)
*   Coroutines (http://c2.com/cgi/wiki?CallWithCurrentContinuation)
*   Stackless Python (http://stackless.com)
*   Parrot /w coroutines (http://www.sidhe.org/~dan/blog/archives/000178.html)
*   itertools - Functions creating iterators (http://docs.python.org/library/itertools.html)
*   Microthreads in Python, David Mertz (http://www-106.ibm.com/developerworks/linux/library/l-pythrd.html)

## 저작권 (Copyright)

이 문서는 공개 도메인(public domain)에 배포되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.