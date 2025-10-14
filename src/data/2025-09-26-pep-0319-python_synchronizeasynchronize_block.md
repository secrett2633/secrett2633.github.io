---
title: "[Rejected] PEP 319 - Python Synchronize/Asynchronize Block"
excerpt: "Python Enhancement Proposal 319: 'Python Synchronize/Asynchronize Block'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/319/
toc: true
toc_sticky: true
date: 2025-09-26 18:29:20+0900
last_modified_at: 2025-09-26 18:29:20+0900
published: true
---
> **원문 링크:** [PEP 319 - Python Synchronize/Asynchronize Block](https://peps.python.org/pep-0319/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 24-Feb-2003

PEP 319 – Python Synchronize/Asynchronize 블록

**상태:** 거부됨 (Rejected)
**작성자:** Michel Pelletier
**생성일:** 2003년 2월 24일
**Python 버전:** 2.4
**참고:** 이 PEP는 PEP 343에 찬성하여 거부되었습니다.

---

## 초록 (Abstract)

이 PEP는 Python에 'synchronize'와 'asynchronize'라는 두 가지 새로운 키워드를 추가할 것을 제안합니다. 이 키워드들은 멀티스레드 환경에서 공유 데이터에 접근할 때 발생하는 동시성 문제를 보다 간결하고 안전하게 처리하기 위한 목적으로 제시되었습니다.

## 선언 (Pronouncement)

이 PEP는 PEP 343에 찬성하여 거부되었습니다. PEP 343은 'with' 문을 도입하여 자원 관리 및 동기화와 같은 패턴을 보다 일반적이고 유연하게 처리할 수 있도록 했습니다.

## 'synchronize' 키워드

Python에서 코드 동기화의 개념은 저수준(low-level)에 속합니다. 현재 프로그래머는 다음과 같은 의사 코드 패턴의 세부 사항을 인지하고 있어야 동기화 코드를 작성할 수 있습니다.

**현재의 동기화 패턴:**
```python
initialize_lock()
...
acquire_lock()
try:
    change_shared_data()
finally:
    release_lock()
```

이 `try/finally` 블록 내에서 락(lock)을 획득하고 해제하는 코드는 오류가 발생하기 쉬워 악명 높은 동시성 스레드 락킹 문제를 야기할 수 있습니다.

PEP 319는 위 코드를 다음과 같이 대체할 것을 제안합니다.

**제안된 'synchronize' 패턴:**
```python
synchronize:
    change_shared_data()
```

이 방식의 장점은 문법이 더 간단하고 사용자 오류의 가능성이 줄어든다는 것입니다.

## 'asynchronize' 키워드

'synchronize' 블록 내에서 코드를 실행하는 동안, 프로그래머는 잠시 비동기적으로 실행하여 블로킹 I/O 루틴이나 불확실한 시간을 필요로 하고 동기화를 요구하지 않는 다른 작업을 수행하기를 원할 수 있습니다. 이 코드는 일반적으로 다음 패턴을 따릅니다.

**현재의 비동기화 패턴 (동기화 블록 내):**
```python
initialize_lock()
...
acquire_lock()
try:
    change_shared_data()
    release_lock() # 비동기 상태로 전환
    do_blocking_io()
    acquire_lock() # 다시 동기화
    change_shared_data2()
finally:
    release_lock()
```

코드의 비동기 섹션은 시각적으로 명확하지 않아 주석으로 표시해야 합니다. 제안된 'asynchronize' 키워드를 사용하면 이 코드는 훨씬 깔끔해지고 이해하기 쉬워지며 오류 발생 가능성이 줄어듭니다.

**제안된 'asynchronize' 패턴:**
```python
synchronize:
    change_shared_data()
    asynchronize:
        do_blocking_io()
    change_shared_data2()
```

비동기 블록이 아닌 곳에서 'asynchronize' 키워드를 만나면 오류가 발생하거나 경고가 발생할 수 있습니다 (모든 코드 블록은 암묵적으로 비동기적이기 때문입니다). 이 키워드는 특히 메인 루프 내에서 블로킹 I/O를 위해 락을 해제하는 패턴에 유용하며, CPython 인터프리터 자체에서도 이 패턴이 광범위하게 사용됩니다.

## 동기화 대상 (Synchronization Targets)

제안된 'synchronize' 및 'asynchronize' 키워드는 코드 블록을 동기화합니다. 그러나 프로그래머는 스레드가 동기화할 대상 객체를 지정하기를 원할 수 있습니다. 모든 객체는 동기화 대상이 될 수 있습니다.

예를 들어, 두 개의 큐를 개별적으로 동기화하는 `TwoWayQueue` 클래스에서 `synchronize queue:`와 같이 특정 객체에 대한 동기화를 지정할 수 있습니다. 현재 Python에서는 이 기능을 위해 큐와 락을 연결하는 별도의 클래스를 정의해야 합니다.

**제안된 `synchronize` 키워드를 사용한 `TwoWayQueue` 예시:**
```python
class TwoWayQueue:
    def __init__(self):
        self.front = []
        self.rear = []

    # ... (putFront, getFront, putRear, getRear 메서드 생략)

    def put(self, item, queue):
        synchronize queue: # 'queue' 객체를 동기화 대상으로 지정
            queue.append(item)

    def get(self, queue):
        synchronize queue: # 'queue' 객체를 동기화 대상으로 지정
            item = queue[0]
            del queue[0]
            return item
```

**현재 Python에서의 동일한 기능 (락 객체를 직접 관리):**
```python
import thread

class LockableQueue:
    def __init__(self):
        self.queue = []
        self.lock = thread.allocate_lock()

class TwoWayQueue:
    def __init__(self):
        self.front = LockableQueue()
        self.rear = LockableQueue()

    # ... (putFront, getFront, putRear, getRear 메서드 생략)

    def put(self, item, queue):
        queue.lock.acquire()
        try:
            queue.queue.append(item)
        finally:
            queue.lock.release()

    def get(self, queue):
        queue.lock.acquire()
        try:
            item = queue.queue[0]
            del queue.queue[0]
            return item
        finally:
            queue.lock.release()
```
이전 예제는 락을 큐와 연결하기 위해 추가 클래스를 정의해야 했지만, 첫 번째 예제에서는 `synchronize` 키워드가 이 연결을 내부적으로 투명하게 수행합니다.

## 기타 동기화 패턴 (Other Patterns that Synchronize)

`acquire` 및 `release` 메서드에 인수를 제공해야 하는 경우나 락이 한 코드 블록에서 획득되고 다른 블록에서 해제되는 경우에는 `synchronize` 및 `asynchronize` 키워드가 락 메서드의 사용을 완전히 대체할 수 없습니다. Zope의 `ZRendevous` 클래스 예시를 통해 이러한 경우를 보여줍니다. 이 클래스는 명시적인 락 풀(pool)을 사용하며, 락의 획득 및 해제가 다른 코드 블록에서 이루어져 `synchronize`를 직접 사용할 수 없는 경우도 있습니다.

초보 프로그래머에게 'synchronize'와 'asynchronize'는 여러 `try/finally` 블록에서 다른 락에 대한 여러 `acquire` 및 `release` 메서드를 처리할 때 발생하는 많은 문제를 제거할 수 있습니다.

## 형식 문법 (Formal Syntax)

제안된 동기화 문법은 다음과 같습니다.

```bnf
synchronize_stmt: 'synchronize' [test] ':' suite
asynchronize_stmt: 'asynchronize' [test] ':' suite
compound_stmt: ... | synchronized_stmt | asynchronize_stmt
```

여기서 `test`는 동기화 대상 객체를 나타내며, `suite`는 동기화될 코드 블록입니다.

## 제안된 구현 (Proposed Implementation)

이 PEP의 작성자는 아직 구현을 탐색하지 않았습니다. 주요 구현 문제는 동기화 블록 동안 정확히 무엇이 락되고 언락되는지입니다. 대상 인수가 없는 'synchronize' 키워드 사용 시(unqualified synchronized block)에는 락이 생성되어 동기화된 코드 블록 객체와 연결될 수 있습니다. 'synchronize' 블록 내에서 'asynchronize' 키워드가 발생하면 내부 블록이 실행되기 전에 코드 블록 락이 해제되고, 내부 블록이 종료될 때 다시 락이 설정됩니다. 특정 동기화 대상이 지정되면 해당 객체에 락이 연결됩니다.

## 하위 호환성 (Backward Compatibility)

하위 호환성은 `from __future__` 구문 (PEP 236)과 새로운 경고 프레임워크 (PEP 230)를 통해 해결됩니다. 개발자는 `from __future__ import threadsync`와 같은 문장을 사용하여 이 새로운 문법을 사용할 수 있습니다. 또한, 'synchronize' 또는 'asynchronize'를 식별자로 사용하는 모든 코드는 Python에서 경고를 발행합니다.

## PEP 310 신뢰할 수 있는 획득/해제 쌍 (`with` 키워드)

PEP 310은 `synchronize`와 동일한 기능을 수행할 수 있는 `with` 키워드를 제안합니다 (단, `asynchronize` 기능은 없습니다). 다음 패턴:

```python
initialize_lock()
with the_lock:
    change_shared_data()
```

는 제안된 `synchronize the_lock: change_shared_data()`와 동일합니다. PEP 310의 `with` 문은 기존 락에 대해 동기화해야 하는 반면, 이 PEP는 자격 없는(unqualified) `synchronize` 문이 전역적, 내부적, 투명한 락에 대해서도 동기화할 것을 제안합니다. `with` 문은 락 초기화를 요구하는 반면, `synchronize` 문은 락을 포함한 모든 대상 객체에 대해 동기화할 수 있습니다.

`with` 문은 동기화보다 더 추상적이며 다양한 목적(예: 트랜잭션 관리)에 사용될 수 있습니다. 반면, `synchronize` 및 `asynchronize` 키워드는 스레드 동기화 외의 다른 일반적인 획득/해제 패턴에는 사용될 수 없습니다.

## Java는 어떻게 하는가 (How Java Does It)

Java는 'synchronized' 키워드를 정의합니다 (이 PEP의 'synchronize'와 문법적 시제 차이에 유의). 이 키워드는 모든 객체에 대해 한정되어야 하며, `synchronized (Expression) Block`과 같은 문법을 가집니다. `Expression`은 `Block`이 동기화될 유효한 객체를 생성해야 합니다.

## Jython은 어떻게 하는가 (How Jython Does It)

Jython은 정적 메서드 'make_synchronized'를 가진 'synchronize' 클래스를 사용합니다. 이 메서드는 하나의 호출 가능한 인수를 받아 인수를 감싸는 새롭고 동기화된 호출 가능한 "래퍼(wrapper)"를 반환합니다.

## Python에 제안된 변경 사항 요약 (Summary of Proposed Changes to Python)

언어에 새로운 'synchronize' 및 'asynchronize' 키워드를 추가하는 것이었습니다.

## 위험 (Risks)

*   이 PEP는 Python 언어에 두 개의 키워드를 추가하여 기존 코드를 손상시킬 수 있었습니다.
*   테스트할 구현이 없었습니다.
*   당시 Python 프로그래머가 직면한 가장 중요한 문제는 아니었습니다 (비록 꽤 악명 높은 문제이기는 했습니다).
*   Java의 유사 키워드는 과거 분사형 'synchronized'였지만, 이 PEP는 Python의 정신에 더 가깝게 현재 시제 'synchronize'를 제안했습니다.

## 반대 의견 (Dissenting Opinion)

이 PEP는 python-dev 메일링 리스트에서 논의되지 않았습니다.

---
Copyright: 이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.