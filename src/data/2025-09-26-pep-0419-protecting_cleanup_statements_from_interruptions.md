---
title: "[Deferred] PEP 419 - Protecting cleanup statements from interruptions"
excerpt: "Python Enhancement Proposal 419: 'Protecting cleanup statements from interruptions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/419/
toc: true
toc_sticky: true
date: 2025-09-26 21:36:35+0900
last_modified_at: 2025-09-26 21:36:35+0900
published: true
---
> **원문 링크:** [PEP 419 - Protecting cleanup statements from interruptions](https://peps.python.org/pep-0419/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 06-Apr-2012

파이썬 PEP 419: 정리 코드 블록 보호

## 요약 (Abstract)
이 PEP는 `finally` 절 또는 Context Manager (컨텍스트 관리자)의 정리 과정 중에 Python 코드가 `KeyboardInterrupt`나 `GeneratorExit`와 같은 인터럽트(방해)로부터 보호될 수 있는 방법을 제안합니다.

## PEP 연기 (PEP Deferral)
이 PEP에서 다루는 개념에 대한 추가 탐색은 현재 이 PEP의 목표를 추진하고 피드백을 수집 및 통합하며, 이를 효과적으로 수행할 충분한 시간을 가진 담당자가 없기 때문에 연기되었습니다.

## 배경 (Rationale)
Python에는 `finally` 문과 `with` 문을 사용하는 Context Manager라는 두 가지 좋은 정리 방법이 있습니다. 그러나 이 두 가지 모두 `KeyboardInterrupt`나 `generator.throw()`에 의해 발생하는 `GeneratorExit`로부터 보호되지 않습니다.

예를 들어, 다음 코드를 살펴보겠습니다.

```python
lock.acquire()
try:
    print('starting')
    do_something()
finally:
    print('finished')
    lock.release()
```

만약 `print('finished')` 호출 직후 `KeyboardInterrupt`가 발생하면, `lock`은 해제되지 않습니다.

`with` 문을 사용하는 다음 코드도 유사한 문제를 겪습니다.

```python
from threading import Lock

class MyLock:
    def __init__(self):
        self._lock_impl = Lock()
    def __enter__(self):
        self._lock_impl.acquire()
        print("LOCKED")
    def __exit__(self):
        print("UNLOCKING")
        self._lock_impl.release()

lock = MyLock()
with lock:
    do_something
```

`print()` 호출 근처에서 `KeyboardInterrupt`가 발생하면 `lock`은 절대 해제되지 않을 수 있습니다.

### 코루틴 사용 사례 (Coroutine Use Case)
코루틴에서도 유사한 문제가 발생합니다. 코루틴 라이브러리는 종종 타임아웃으로 코루틴을 인터럽트(중단)하기를 원합니다. `generator.throw()` 메서드는 이 사용 사례에 적합하지만, 코루틴이 현재 `finally` 절 내에서 일시 중지되었는지 알 수 있는 방법이 없습니다.

다음은 `yield` 기반 코루틴을 사용하는 예시입니다.

```python
def run_locked():
    yield connection.sendall('LOCK')
    try:
        yield do_something()
        yield do_something_else()
    finally:
        yield connection.sendall('UNLOCK')

with timeout(5):
    yield run_locked()
```

위 예시에서 `yield something`은 현재 코루틴의 실행을 일시 중지하고 `something` 코루틴이 완료될 때까지 실행함을 의미합니다. `with timeout(5)` 문은 모든 코드가 5초 타임아웃 내에 실행되도록 보장합니다. 이는 타임아웃 발생 시 코루틴 스택의 최상위 프레임에서 `generator.throw()`를 호출하는 콜백을 메인 루프에 등록함으로써 이루어집니다.

## 제안 내용 (Specification)

### 프레임 플래그 `f_in_cleanup` (Frame Flag 'f_in_cleanup')
프레임 객체에 새로운 플래그 `f_in_cleanup`를 추가하는 것을 제안합니다. 이 프레임이 현재 `finally` 절을 실행 중인 경우 이 플래그는 `True`로 설정됩니다. 내부적으로 이 플래그는 현재 실행 중인 중첩된 `finally` 문의 카운터로 구현되어야 합니다.

이 내부 카운터는 `SETUP_WITH` 및 `WITH_CLEANUP` 바이트코드 실행 중에도 증가해야 하며, 이들 바이트코드 실행이 완료되면 감소해야 합니다. 이는 `__enter__()` 및 `__exit__()` 메서드도 보호할 수 있도록 합니다.

### `sys.setcleanuphook` 함수 (Function 'sys.setcleanuphook')
`sys` 모듈에 새로운 함수를 추가하는 것을 제안합니다. 이 함수는 `f_in_cleanup`가 `False`가 될 때마다 실행되는 콜백을 설정합니다. 콜백은 프레임 객체를 유일한 인수로 받아, 어디에서 호출되었는지 파악할 수 있습니다. 이 설정은 스레드 로컬이며 `PyThreadState` 구조체에 저장되어야 합니다.

### `inspect` 모듈 개선 (Inspect Module Enhancements)
`inspect` 모듈에 `isframeincleanup()` 및 `getcleanupframe()` 두 가지 새로운 함수를 제안합니다.

- `isframeincleanup()`: 프레임 또는 제너레이터 객체를 인수로 받아, 프레임 자체의 `f_in_cleanup` 속성 또는 제너레이터의 `gi_frame` 속성의 값을 반환합니다.
- `getcleanupframe()`: 프레임 객체를 인수로 받아, `f_in_cleanup` 값이 `True`인 가장 안쪽 프레임을 반환하거나, 스택에 해당 속성의 0이 아닌 값을 가진 프레임이 없으면 `None`을 반환합니다. `getouterframes()`와 마찬가지로 지정된 프레임부터 `f_back` 포인터를 사용하여 외부 프레임으로 탐색합니다.

### 예시 (Example)
안전하게 인터럽트(SIGINT)를 처리하는 핸들러 구현 예시는 다음과 같습니다.

```python
import inspect, sys, functools

def sigint_handler(sig, frame):
    if inspect.getcleanupframe(frame) is None:
        raise KeyboardInterrupt()
sys.setcleanuphook(functools.partial(sigint_handler, 0))
```

코루틴 예시는 코루틴 라이브러리에서 사용하는 트램폴린(또는 메인 루프)에 크게 의존하므로 이 문서의 범위 밖입니다.

## 미해결 문제 (Unresolved Issues)

### `with` 문 표현식 내부에서의 인터럽트 (Interruption Inside With Statement Expression)
다음과 같은 `with` 문에서 `open()`이 호출된 후, 하지만 `SETUP_WITH` 바이트코드가 실행되기 전에 Python이 인터럽트될 수 있습니다.

```python
with open(filename):
    do_something()
```

두 가지 해결책이 있습니다.
1. `with` 표현식을 보호합니다. 이는 현재 `with` 표현식의 시작을 인식하는 방법이 없으므로 다른 바이트코드를 필요로 할 것입니다.
2. 사용자가 중요하다고 생각하는 경우 래퍼(Wrapper)를 작성하게 합니다. 안전한 래퍼는 다음과 같을 수 있습니다.

   ```python
   class FileWrapper(object):
       def __init__(self, filename, mode):
           self.filename = filename
           self.mode = mode
       def __enter__(self):
           self.file = open(self.filename, self.mode)
       def __exit__(self):
           self.file.close()
   ```
   또는 `contextmanager()` 데코레이터를 사용하여 작성할 수 있습니다.

   ```python
   @contextmanager
   def open_wrapper(filename, mode):
       file = open(filename, mode)
       try:
           yield file
       finally:
           file.close()
   ```
   이 코드는 제너레이터의 첫 번째 부분(yield 이전)이 호출자의 `SETUP_WITH` 바이트코드 내에서 실행되므로 안전합니다.

### 예외 전파 (Exception Propagation)
때로는 `finally` 절이나 `__enter__()`/`__exit__()` 메서드에서 예외가 발생할 수 있습니다. `KeyboardInterrupt`나 `SystemExit`와 같은 더 중요한 예외가 대신 발생해야 하므로 일반적으로 문제는 되지 않습니다. 그러나 원래 예외를 `__context__` 속성에 유지할 수 있다면 좋을 수 있습니다. 따라서 정리 훅(cleanup hook) 시그니처에 예외 인수를 추가할 수 있습니다.

```python
def sigint_handler(sig, frame):
    if inspect.getcleanupframe(frame) is None:
        raise KeyboardInterrupt()
sys.setcleanuphook(retry_sigint)

def retry_sigint(frame, exception=None):
    if inspect.getcleanupframe(frame) is None:
        raise KeyboardInterrupt() from exception
```
Python 3에서는 예외에 `__traceback__` 속성이 있으므로 `__exit__` 메서드처럼 세 개의 인수가 필요하지 않습니다. 그러나 이렇게 하면 예외의 `__cause__`가 설정되는데, 이는 정확히 의도한 바가 아닙니다. 따라서 정리 훅에서 발생하는 모든 예외에 `__context__` 속성을 추가하기 위해 일부 숨겨진 인터프리터 로직이 사용될 수 있습니다.

### 자원 획득과 `try` 블록 사이의 인터럽트 (Interruption Between Acquiring Resource and Try Block)
첫 섹션의 예시는 완전히 안전하지 않습니다. 다음 코드를 다시 살펴보겠습니다.

```python
lock.acquire()
try:
    do_something()
finally:
    lock.release()
```
`lock.acquire()`가 실행된 직후 `try` 블록에 진입하기 전에 코드가 인터럽트되면 문제가 발생할 수 있습니다. 수정되지 않은 코드는 이 문제를 해결할 수 없습니다. 실제 해결책은 사용 사례에 크게 의존합니다. 일반적으로 `with` 문을 사용하여 코드를 수정할 수 있습니다.

```python
with lock:
    do_something()
```
그러나 코루틴의 경우 `acquire` 및 `release` 작업 모두에 `yield`가 필요하므로 `with` 문을 사용할 수 없는 경우가 많습니다. 따라서 코드는 다음과 같이 다시 작성될 수 있습니다.

```python
try:
    yield lock.acquire()
    do_something()
finally:
    yield lock.release()
```
실제 잠금(locking) 코드는 이 사용 사례를 지원하기 위해 더 많은 코드가 필요할 수 있지만, 구현은 일반적으로 간단합니다. 예를 들어, 잠금이 획득되었는지 확인하고 획득되었다면 잠금을 해제하는 식입니다.

### `finally` 내부에서 `EINTR` 처리 (Handling EINTR Inside a Finally)
`f_in_cleanup` 플래그를 확인하도록 준비된 시그널 핸들러가 있더라도, 해당 시스템 호출이 `EINTR` 오류를 반환했기 때문에 정리 핸들러에서 `InterruptedError`가 발생할 수 있습니다. 주요 사용 사례는 이를 처리하도록 준비되어 있습니다.

- Posix 뮤텍스(mutexes)는 `EINTR`를 반환하지 않습니다.
- 네트워킹 라이브러리는 항상 `EINTR`를 처리하도록 준비되어 있습니다.
- 코루틴 라이브러리는 일반적으로 시그널이 아닌 `throw()` 메서드로 인터럽트됩니다.

플랫폼 특정 함수 `siginterrupt()`를 사용하여 `EINTR`를 처리할 필요를 없앨 수 있습니다. 그러나 이로 인해 예측하기 어려운 결과가 발생할 수 있습니다. 예를 들어, 메인 스레드가 I/O 루틴에 갇혀 있으면 `SIGINT` 핸들러가 절대 호출되지 않을 수 있습니다.

더 나은 접근 방식은 일반적으로 정리 핸들러에서 사용되는 코드가 명시적으로 `InterruptedError`를 처리하도록 준비하는 것입니다. 파일 기반 잠금 구현이 이러한 코드의 예시가 될 수 있습니다.

`signal.pthread_sigmask`를 사용하여 `EINTR`로 인터럽트될 수 있는 정리 핸들러 내부에서 시그널을 블록할 수 있습니다.

### `finally` 자체 내부에서 인터럽트 컨텍스트 설정 (Setting Interruption Context Inside Finally Itself)
일부 코루틴 라이브러리는 `finally` 절 자체에 타임아웃을 설정해야 할 수 있습니다. 예를 들어:

```python
try:
    do_something()
finally:
    with timeout(0.5):
        try:
            yield do_slow_cleanup()
        finally:
            yield do_fast_cleanup()
```
현재 의미론으로는 `timeout`이 전체 `with` 블록을 보호하거나 전혀 보호하지 않을 수 있습니다. 이는 각 라이브러리의 구현에 따라 달라집니다. 작성자가 의도한 것은 `do_slow_cleanup`를 일반 코드로, `do_fast_cleanup`를 정리 코드(인터럽트 불가능한)로 취급하는 것입니다.

이 문제는 `f_in_cleanup`를 카운터로 노출하고, 카운터가 감소할 때마다 정리 훅을 호출하여 해결할 수 있습니다. 그러면 코루틴 라이브러리가 타임아웃 시작 시의 값을 기억하고 각 훅 실행 시 비교할 수 있습니다. 그러나 실제로는 이 예시가 너무 난해하여 고려할 가치가 없다고 간주됩니다.

### `KeyboardInterrupt` 수정 (Modifying KeyboardInterrupt)
기본 `SIGINT` 핸들러를 설명된 메커니즘을 사용하도록 수정해야 할지 결정해야 합니다. 초기 제안은 두 가지 이유로 이전 동작을 유지하는 것입니다.

1. 대부분의 애플리케이션은 종료 시 정리(외부 상태가 없거나 충돌 방지 방식으로 수정하는 경우)에 신경 쓰지 않습니다.
2. 정리가 너무 많은 시간을 소요하여 사용자에게 애플리케이션을 인터럽트할 기회를 주지 않을 수 있습니다.

후자의 경우는 `SIGINT` 핸들러가 두 번 호출되면 안전하지 않은 중단을 허용하여 해결할 수 있지만, 복잡성을 추가할 가치가 없는 것으로 보입니다.

## 다른 Python 구현 지원 (Alternative Python Implementations Support)
`f_in_cleanup`는 구현 세부 사항으로 간주됩니다. 실제 구현은 시그널 핸들러, 정리 훅에 전달되고 `getcleanupframe()`에서 반환되는 일부 가짜 프레임과 유사한 객체를 가질 수 있습니다. 유일한 요구 사항은 `inspect` 모듈 함수가 이러한 객체에서 예상대로 작동한다는 것입니다. 이러한 이유로 `isframeincleanup()` 함수에 제너레이터 객체를 전달하는 것도 허용하며, 이는 `gi_frame` 속성을 사용할 필요를 없앱니다.

`getcleanupframe()`이 다음 호출 시 정리 훅에 전달될 것과 동일한 객체를 반환해야 한다고 명시할 필요가 있을 수 있습니다.

## 대체 이름 (Alternative Names)
원래 제안에는 `f_in_finally` 프레임 속성이 있었는데, 원래 의도는 `finally` 절을 보호하는 것이었기 때문입니다. 그러나 `__enter__` 및 `__exit__` 메서드도 보호하도록 확장되면서 `f_in_cleanup` 이름이 더 적절해 보입니다. `__enter__` 메서드는 정리 루틴은 아니지만, Context Manager에 의해 수행되는 정리와 관련이 있습니다.

`setcleanuphook`, `isframeincleanup`, `getcleanupframe`는 해당 모듈의 명명 규칙을 따르지만, `set_cleanup_hook`, `is_frame_in_cleanup`, `get_cleanup_frame`로 명확하게 바꿀 수 있습니다.

## 대체 제안 (Alternative Proposals)

### `f_in_cleanup` 플래그 자동 전파 (Propagating 'f_in_cleanup' Flag Automatically)
이것은 `getcleanupframe()`를 불필요하게 만들 수 있습니다. 그러나 `yield` 기반 코루틴의 경우 직접 전파해야 합니다. 쓰기 가능하게 만들면 `sys.setcleanuphook()`의 동작이 다소 예측 불가능해집니다.

### 바이트코드 `INCR_CLEANUP`, `DECR_CLEANUP` 추가 (Add Bytecodes 'INCR_CLEANUP', 'DECR_CLEANUP')
이러한 바이트코드는 `with` 문 내부의 표현식을 보호하는 데 사용될 수 있으며, 카운터 증가를 더 명시적이고 디버그하기 쉽게 만들 수 있습니다(디스어셈블리 내부에서 확인 가능). `END_FINALLY` 및 `SETUP_WITH`가 암시적으로 카운터를 감소시키는 것과 같은 중간 지점이 선택될 수 있습니다(`END_FINALLY`는 모든 `with` 스위트 끝에 있습니다).

그러나 새 바이트코드를 추가하는 것은 매우 신중하게 고려해야 합니다.

### `f_in_cleanup`를 카운터로 노출 (Expose 'f_in_cleanup' as a Counter)
원래 의도는 최소한의 필요한 기능을 노출하는 것이었습니다. 그러나 프레임 플래그 `f_in_cleanup`를 구현 세부 사항으로 간주하므로 이를 카운터로 노출할 수 있습니다.

마찬가지로, 카운터가 있다면 카운터가 감소할 때마다 정리 훅을 호출해야 할 수도 있습니다. 중첩된 `finally` 절은 흔하지 않은 경우이므로 성능에 큰 영향을 미칠 가능성은 낮습니다.

### 코드 객체 플래그 `CO_CLEANUP` 추가 (Add code object flag 'CO_CLEANUP')
`SETUP_WITH` 및 `WITH_CLEANUP` 바이트코드 내에서 플래그를 설정하는 대안으로 `CO_CLEANUP` 플래그를 도입할 수 있습니다. 인터프리터가 `CO_CLEANUP`가 설정된 코드를 실행하기 시작하면 전체 함수 본문에 대해 `f_in_cleanup`를 설정합니다. 이 플래그는 `__enter__` 및 `__exit__` 특수 메서드의 코드 객체에 설정됩니다. 기술적으로는 `__enter__` 및 `__exit__`라는 함수에 설정될 수 있습니다.

이것은 덜 명확한 해결책으로 보입니다. 또한 `__enter__` 및 `__exit__`가 수동으로 호출되는 경우도 포함합니다. 이는 기능으로 받아들여지거나 불필요한 부작용(또는 발생 가능성은 낮지만 버그)으로 받아들여질 수 있습니다.

`__enter__` 또는 `__exit__` 함수가 C로 구현된 경우 `f_in_cleanup` 플래그를 확인할 코드 객체가 없으므로 문제가 발생할 수도 있습니다.

### 프레임 객체 자체에 정리 콜백 두기 (Have Cleanup Callback on Frame Object Itself)
프레임 객체는 `f_in_cleanup`가 0으로 재설정될 때 호출되는 `f_cleanup_callback` 멤버를 가질 수 있도록 확장될 수 있습니다. 이것은 다른 코루틴에 다른 콜백을 등록하는 데 도움이 될 것입니다.

겉으로 보기에 아름답지만, 이 해결책은 아무것도 추가하지 않습니다. 두 가지 주요 사용 사례는 다음과 같습니다.

- 시그널 핸들러에서 콜백을 설정하는 경우. 이 경우 콜백은 본질적으로 하나입니다.
- 코루틴 사용 사례에서 루프당 하나의 콜백을 사용하는 경우. 여기서는 거의 모든 경우에 스레드당 하나의 루프만 있습니다.

### 정리 훅 없음 (No Cleanup Hook)
원래 제안에는 정리 훅 명세가 포함되지 않았는데, 현재 도구를 사용하여 동일한 목표를 달성할 수 있는 몇 가지 방법이 있기 때문입니다.

- `sys.settrace()`와 `f_trace` 콜백 사용: 이는 디버깅에 문제가 될 수 있고 성능에 큰 영향을 미칩니다(인터럽트가 자주 발생하지는 않지만).
- 조금 더 기다렸다가 다시 시도: 코루틴 라이브러리에는 쉽습니다. 시그널의 경우 `signal.alert`를 사용하여 달성할 수 있습니다.

두 가지 방법 모두 너무 비실용적이라고 간주되며, `finally` 절에서 나가는 것을 catch하는 방법이 제안되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.