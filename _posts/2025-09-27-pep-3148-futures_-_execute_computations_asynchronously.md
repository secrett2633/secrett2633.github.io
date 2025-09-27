---
title: "[Final] PEP 3148 - futures - execute computations asynchronously"
excerpt: "Python Enhancement Proposal 3148: 'futures - execute computations asynchronously'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3148/
toc: true
toc_sticky: true
date: 2025-09-27 14:39:26+0900
last_modified_at: 2025-09-27 14:39:26+0900
published: true
---
> **원문 링크:** [PEP 3148 - futures - execute computations asynchronously](https://peps.python.org/pep-3148/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 16-Oct-2009

PEP 3148 – futures - 비동기 연산 실행

## 개요 (Abstract)

이 PEP는 스레드와 프로세스를 활용하여 호출 가능한(callable) 객체의 연산을 용이하게 하는 패키지 설계를 제안합니다. 이 패키지는 비동기 연산을 추상화하여 개발자가 병렬 처리 로직을 직접 관리하는 복잡성을 줄이고, 더 쉽고 효율적인 동시성 프로그래밍을 가능하게 합니다.

## 도입 배경 (Motivation)

Python은 현재 멀티스레드 및 멀티프로세스 애플리케이션을 구축하기 위한 강력한 기본 요소를 제공하지만, 단순한 작업을 병렬화하는 것은 많은 노력을 필요로 합니다. 예를 들어, 명시적으로 프로세스/스레드를 시작하고, 작업/결과 큐를 구성하며, 완료 또는 기타 종료 조건(예: 실패, 타임아웃)을 기다리는 과정이 복잡합니다. 또한, 각 구성 요소가 자체 병렬 실행 전략을 사용할 경우, 전역 프로세스/스레드 제한을 가진 애플리케이션을 설계하는 것이 어렵습니다. `futures` 패키지는 이러한 복잡성을 추상화하여 개발자가 더 쉽게 병렬 연산을 수행할 수 있도록 돕습니다.

## 사양 (Specification)

### 명명 (Naming)

제안된 패키지는 "futures"라고 불리며 새로운 최상위 패키지인 "concurrent" 안에 위치합니다. "concurrent" 네임스페이스에 포함시키는 이유는 다음과 같습니다:
1.  기존의 `from __future__ import x` 구문과의 혼동을 방지합니다.
2.  라이브러리가 동시성(concurrency)과 관련이 있음을 명확하게 나타냅니다.
3.  `multiprocessing.Pool` 작업과 같이 기존의 동시성 관련 라이브러리들을 미래에 이 네임스페이스로 이동하거나 추가할 수 있는 기반을 마련합니다.

### 인터페이스 (Interface)

제안된 패키지는 두 가지 핵심 클래스인 `Executor`와 `Future`를 제공합니다. `Executor`는 호출 가능한 객체와 인수를 받아 비동기 작업 요청을 처리하고, 해당 작업의 실행을 나타내는 `Future` 객체를 반환합니다.

#### Executor

`Executor`는 비동기적으로 호출을 실행하는 메서드를 제공하는 추상 클래스입니다.

*   `submit(fn, *args, **kwargs)`: `fn(*args, **kwargs)`로 실행될 호출 가능 객체를 스케줄링하고, 해당 호출의 실행을 나타내는 `Future` 인스턴스를 반환합니다. 이 메서드는 `Executor` 서브클래스에서 구현되어야 하는 추상 메서드입니다.
*   `map(func, *iterables, timeout=None)`: `map(func, *iterables)`와 유사하지만, `func`가 비동기적으로 실행되며 여러 `func` 호출이 동시에 이루어질 수 있습니다. 반환된 이터레이터는 `__next__()`가 호출되었을 때 `map()`에 대한 원래 호출로부터 `timeout` 초 후에 결과가 사용 가능하지 않으면 `TimeoutError`를 발생시킵니다.
*   `shutdown(wait=True)`: 현재 보류 중인 퓨처들의 실행이 완료되면 사용 중인 리소스를 해제해야 함을 Executor에 알립니다. `shutdown` 이후의 `Executor.submit` 및 `Executor.map` 호출은 `RuntimeError`를 발생시킵니다. `wait`가 `True`이면 모든 보류 중인 퓨처가 실행을 마치고 관련 리소스가 해제될 때까지 이 메서드는 반환되지 않습니다. `wait`가 `False`이면 즉시 반환되며, 리소스는 모든 퓨처가 완료된 후에 해제됩니다.
*   `__enter__()`, `__exit__(exc_type, exc_val, exc_tb)`: 컨텍스트 매니저로 `Executor`를 사용할 때, `__exit__`는 `Executor.shutdown(wait=True)`를 호출합니다.

#### ProcessPoolExecutor

`ProcessPoolExecutor` 클래스는 프로세스 풀을 사용하여 호출을 비동기적으로 실행하는 `Executor` 서브클래스입니다. `ProcessPoolExecutor.submit`에 전달되는 호출 가능한 객체와 인수는 `multiprocessing` 모듈과 동일한 제약 조건에 따라 `pickle` 가능해야 합니다. `ProcessPoolExecutor`에 제출된 호출 가능 객체 내에서 `Executor` 또는 `Future` 메서드를 호출하면 교착 상태(deadlock)가 발생할 수 있습니다.

*   `__init__(max_workers)`: 최대 `max_workers` 수의 프로세스 풀을 사용하여 호출을 비동기적으로 실행합니다. `max_workers`가 `None`이거나 제공되지 않으면 머신이 가진 프로세서 수만큼 워커 프로세스가 생성됩니다.

#### ThreadPoolExecutor

`ThreadPoolExecutor` 클래스는 스레드 풀을 사용하여 호출을 비동기적으로 실행하는 `Executor` 서브클래스입니다. `Future`와 관련된 호출 가능 객체가 다른 `Future`의 결과를 기다릴 때 교착 상태가 발생할 수 있습니다.

*   `__init__(max_workers)`: 최대 `max_workers` 수의 스레드 풀을 사용하여 호출을 비동기적으로 실행합니다.

#### Future 객체 (Future Objects)

`Future` 클래스는 호출 가능 객체의 비동기 실행을 캡슐화합니다. `Future` 인스턴스는 `Executor.submit`에 의해 반환됩니다.

*   `cancel()`: 호출을 취소하려고 시도합니다. 호출이 현재 실행 중인 경우 취소할 수 없으며 `False`를 반환하고, 그렇지 않으면 호출이 취소되고 `True`를 반환합니다.
*   `cancelled()`: 호출이 성공적으로 취소되었으면 `True`를 반환합니다.
*   `running()`: 호출이 현재 실행 중이며 취소할 수 없으면 `True`를 반환합니다.
*   `done()`: 호출이 성공적으로 취소되었거나 실행이 완료되었으면 `True`를 반환합니다.
*   `result(timeout=None)`: 호출에 의해 반환된 값을 반환합니다. 호출이 아직 완료되지 않은 경우 이 메서드는 `timeout` 초까지 기다립니다. `timeout` 내에 완료되지 않으면 `TimeoutError`가 발생합니다.
*   `exception(timeout=None)`: 호출에 의해 발생된 예외를 반환합니다. `result`와 유사하게 동작하며, 호출이 예외를 발생시키지 않고 완료되면 `None`을 반환합니다.
*   `add_done_callback(fn)`: 퓨처가 취소되거나 실행을 마쳤을 때 호출될 `fn`을 퓨처에 연결합니다. `fn`은 퓨처를 유일한 인수로 받아 호출됩니다.

#### 내부 Future 메서드 (Internal Future Methods)

다음 `Future` 메서드들은 단위 테스트 및 `Executor` 구현에서 사용하기 위한 것입니다.

*   `set_running_or_notify_cancel()`: `Future`와 관련된 작업을 실행하기 전에 `Executor` 구현에서 호출해야 합니다. `False`를 반환하면 `Future`가 취소되었음을 의미하며, `True`를 반환하면 `Future`가 취소되지 않고 실행 중 상태로 전환되었음을 의미합니다.
*   `set_result(result)`: `Future`와 관련된 작업의 결과를 설정합니다.
*   `set_exception(exception)`: `Future`와 관련된 작업의 결과를 주어진 `Exception`으로 설정합니다.

#### 모듈 함수 (Module Functions)

*   `wait(fs, timeout=None, return_when=ALL_COMPLETED)`: `fs`에 주어진 `Future` 인스턴스들이 완료되기를 기다립니다. 완료된 퓨처를 담는 "done" 세트와 미완료된 퓨처를 담는 "not_done" 세트의 명명된 2-튜플을 반환합니다. `return_when` 인수는 메서드가 언제 반환될지 지정합니다 (`FIRST_COMPLETED`, `FIRST_EXCEPTION`, `ALL_COMPLETED`).
*   `as_completed(fs, timeout=None)`: `fs`에 주어진 `Future` 인스턴스들이 완료(완료되거나 취소됨)될 때마다 해당 퓨처를 반환하는 이터레이터를 제공합니다.

### 예시

PEP는 `ProcessPoolExecutor`를 사용하여 소수(prime number)를 확인하는 예시와 `ThreadPoolExecutor`를 사용하여 웹 페이지를 크롤링하는 예시를 제공합니다. 이 예시들은 `concurrent.futures` 모듈이 복잡한 동시성 로직 없이 어떻게 병렬 작업을 쉽게 처리할 수 있는지 보여줍니다.

## 설계 근거 (Rationale)

이 모듈의 제안된 설계는 Java의 `java.util.concurrent` 패키지에 크게 영향을 받았습니다. Java와 마찬가지로 이 모듈의 개념적 기반은 비동기 연산의 진행 상황과 결과를 나타내는 `Future` 클래스입니다. `Future` 클래스는 스레드, 프로세스 또는 원격 프로시저 호출을 사용한 평가에 사용될 수 있습니다.

`Future` 객체는 `Executor` 클래스의 구체적인 구현체에 의해 생성됩니다. 참조 구현은 프로세스 또는 스레드 풀을 사용하여 연산을 적극적으로 평가하는 클래스를 제공합니다.

이 제안은 Python 언어 구문이나 의미에 어떤 변경도 도입하지 않습니다. PEP 3148에 대한 논의를 통해 `Executor` 클래스는 추상 기본 클래스로 만들어졌고, `Future.remove_done_callback` 메서드는 사용 사례 부족으로 제거되었으며, `Future.add_done_callback` 메서드는 동일한 호출 가능 객체를 여러 번 추가할 수 있도록 수정되었습니다. 또한, `Future` 클래스의 변경 메서드는 해당 퓨처를 생성한 `Executor`에만 비공개임을 나타내기 위해 문서화가 개선되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.