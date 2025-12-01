---
title: "[Draft] PEP 788 - PyInterpreterRef: Interpreter References in the C API"
excerpt: "Python Enhancement Proposal 788: 'PyInterpreterRef: Interpreter References in the C API'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/788/
toc: true
toc_sticky: true
date: 2025-09-27 14:03:48+0900
last_modified_at: 2025-09-27 14:03:48+0900
published: true
---
> **원문 링크:** [PEP 788 - PyInterpreterRef: Interpreter References in the C API](https://peps.python.org/pep-0788/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 23-Apr-2025

## PEP 788 – PyInterpreterRef: C API의 인터프리터 참조 (Interpreter References in the C API)

### 초록 (Abstract)

C API에서 스레드는 현재 스레드에 연결된 스레드 상태(thread state)를 보유함으로써 인터프리터와 상호 작용할 수 있습니다. 이는 잘 작동하지만, 스레드 안전(thread-safe) 방식으로 스레드 상태를 생성하고 연결하는 데 있어 복잡성을 야기할 수 있습니다.

특히 C API는 스레드 상태를 생성하거나 연결할 때 인터프리터가 호출될 준비가 된 상태인지 확인할 방법이 없습니다. 이로 인해 스레드 상태 연결 시 스레드가 멈추거나, 서브 인터프리터(subinterpreters)에서 인터프리터 구조가 할당 해제되어 충돌(crash)이 발생할 수 있습니다. 이는 Python 코드를 다른 네이티브 코드와 함께 실행하려는 대규모 애플리케이션에서 다루기 힘든 문제가 될 수 있습니다.

또한, PyGILState_Ensure()는 Python이 한 번도 실행되지 않은 스레드에서 항상 메인 인터프리터(main interpreter)를 위한 스레드 상태를 생성하기 때문에 서브 인터프리터 내부에서 사용될 인터프리터에 대한 가정이 종종 잘못되는 경향이 있습니다.

이 PEP는 인터프리터가 종료되는 것을 방지하는 인터프리터 참조(interpreter references)를 도입하여 이러한 종류의 문제를 해결하고자 합니다. (더 정확히 말하면, 스레드 상태 연결 시 스레드가 멈추는 단계로 진입하는 것을 방지합니다.) 이는 인터프리터와 호출자 사이에 동기화(synchronization) 계층을 강제함으로써 스레드 상태 관리의 구조와 신뢰성을 높여줍니다.

이 새로운 시스템을 채택하기 위해서는 CPython과 서드파티 라이브러리에서 많은 변경이 필요합니다. 예를 들어, 호출자에게 연결된 스레드 상태를 보유하도록 요구하지 않는 API에서는 올바른 인터프리터를 대상으로 하고 인터프리터가 동시에 자체적으로 할당 해제되지 않도록 강력한 인터프리터 참조(strong interpreter reference)를 전달해야 합니다. CPython에서 가장 좋은 예는 PyGILState_Ensure()입니다. 이 제안의 일부로, 강력한 인터프리터 참조를 받는 PyThreadState_Ensure()가 현대적인 대체제로 제공됩니다.

### 동기 (Motivation)

#### 비-Python 스레드는 종료 시 항상 멈춥니다 (Non-Python Threads Always Hang During Finalization)

많은 대규모 라이브러리는 원하는 인터프리터(일반적으로 메인 인터프리터)가 종료 중이거나 삭제될 수 있는 고도로 비동기적인 상황에서 Python 코드를 호출해야 할 수 있지만, 인터프리터 호출 후에도 코드를 계속 실행하기를 원합니다. 이러한 요구는 사용자들에 의해 제기되었습니다. 예를 들어, Python 코드를 호출하려는 콜백(callback)은 다음과 같은 경우에 호출될 수 있습니다.

*   GPU에서 커널(kernel) 실행이 완료되었을 때.
*   네트워크 패킷이 수신되었을 때.
*   스레드가 종료되고 네이티브 라이브러리가 스레드 로컬 스토리지(thread local storage)의 정적 종료자(static finalizers)를 실행하고 있을 때.

일반적으로 이러한 패턴은 다음과 같습니다.

```c
static void some_callback(void *closure) {
    /* Do some work */
    /* ... */
    PyGILState_STATE gstate = PyGILState_Ensure();
    /* Invoke the C API to do some computation */
    PyGILState_Release(gstate);
    /* ... */
}
```
현재 C API에서는 `threading` 모듈을 통해 생성되지 않은 모든 비-Python 스레드는 "데몬(daemon)"으로 간주됩니다. 이는 인터프리터가 종료되기 전에 해당 스레드를 기다리지 않는다는 것을 의미합니다. 대신, 인터프리터는 스레드 상태를 연결할 때 스레드를 멈추게 하여 해당 시점 이후로 스레드를 사용할 수 없게 만듭니다. 스레드 상태 연결은 바이트코드 명령어 사이(GIL을 다른 스레드에 양보하기 위해) 또는 C 함수가 `Py_BEGIN_ALLOW_THREADS` 블록을 종료할 때와 같이 Python을 호출하는 어느 시점에서든 발생할 수 있으므로, 단순히 인터프리터가 종료 중인지를 확인하는 것만으로는 Python 코드를 안전하게 호출하기에 충분하지 않습니다. (스레드를 멈추게 하는 것은 비교적 새로운 동작이며, 이전 버전에서는 스레드가 종료되었지만 문제는 동일합니다.)

이는 비-Python 스레드가 언제든지 종료될 수 있음을 의미하며, 이는 호출 흐름에서 단순히 Python 코드만 실행하는 것 이상의 작업을 원하는 사용자에게 심각한 제약이 됩니다.

#### Py_IsFinalizing()은 불충분합니다 (Py_IsFinalizing Is Insufficient)

현재 문서에서는 스레드 종료를 막기 위해 Py_IsFinalizing()을 사용하는 것을 권장합니다.

런타임이 종료되는 동안 스레드에서 이 함수를 호출하면, 스레드가 Python에 의해 생성되지 않았더라도 스레드가 종료됩니다. 원치 않는 종료를 피하기 위해 이 함수를 호출하기 전에 Py_IsFinalizing() 또는 sys.is_finalizing()을 사용하여 인터프리터가 종료 프로세스 중인지 확인할 수 있습니다.

안타깝게도 `Py_IsFinalizing()` 호출 시점과 사용 시점 간의 문제(time-of-call to time-of-use issues) 때문에 이는 올바르지 않습니다. `Py_IsFinalizing()` 호출 시에는 인터프리터가 종료 중이 아닐 수 있지만, 그 직후에 종료를 시작하여 스레드 상태 연결 시 스레드를 멈추게 할 수 있습니다.

#### 데몬 스레드가 종료를 방해할 수 있습니다 (Daemon Threads Can Break Finalization)

락(lock)을 획득할 때 교착 상태(deadlock)를 방지하기 위해 스레드 상태를 분리하는 것이 매우 중요합니다. 이는 GIL이 있는 빌드와 Free-threading 빌드 모두에 해당합니다.

GIL이 활성화된 경우, GIL이 해제되지 않으면 락을 획득할 때 교착 상태가 쉽게 발생할 수 있습니다. 스레드 A가 락을 잡고 스레드 상태 연결을 기다리는 동안, 스레드 B는 GIL을 잡고 락을 기다릴 수 있습니다. Free-threading 빌드에서는 가비지 컬렉터(garbage collector) 실행 시 Stop-the-world 일시 중지(pauses) 중에 유사한 교착 상태가 발생할 수 있습니다.

이는 CPython 자체에 영향을 미치며, 현재 API로는 이를 해결할 수 있는 방법이 거의 없습니다. 예를 들어, python/cpython#129536에서는 `ssl` 모듈이 종료 시 치명적인 오류를 발생시킬 수 있다고 지적합니다. 이는 데몬 스레드가 `sys.stderr`의 락을 잡은 채 멈춘 다음, 종료자(finalizer)가 여기에 쓰려고 시도했기 때문입니다. 이상적으로는 스레드가 락을 잡고 있는 동안 인터프리터가 자신을 멈추게 하는 것을 일시적으로 방지할 수 있어야 합니다.

그러나 일반적으로 종료자(finalizer)에서 Python 락(예: `threading.Lock`)을 획득하는 것은 안전하지 않습니다. 락이 잡혀 있는 동안 가비지 컬렉터가 실행될 수 있으며, 다른 종료자가 락을 획득하려고 하면 교착 상태가 발생하기 때문입니다. `sys.stderr`와 같은 많은 C 락에는 해당되지 않는데, 락이 잡혀 있는 동안 Python 코드가 실행될 수 없기 때문입니다. 이 PEP는 Python 락이 아닌 C 락에 대한 이 문제를 해결하고자 합니다.

#### 데몬 스레드가 문제의 근원이 아닙니다 (Daemon Threads Are Not the Problem)

이 PEP 이전에 데몬 스레드(daemon threads)의 사용 중단에 대해 광범위하게 논의되었습니다. 데몬 스레드는 기술적으로 이 제안에서 설명된 많은 문제의 원인이 되므로, 데몬 스레드를 제거하는 것이 잠재적인 해결책으로 여겨질 수 있습니다. 데몬 스레드를 제거하는 주된 주장은 인터프리터에서 많은 문제의 원인이 된다는 것입니다.

그러나 데몬 스레드는 실제로 안정적으로 작동하지 않습니다. 런타임 종료 시 런타임이 종료된 후에도 Python 인터프리터 리소스를 실행하고 사용하려고 시도합니다. 즉, 인터프리터의 전역 상태에 대한 포인터(pointers)를 가지고 있습니다.

하지만 실제로는 데몬 스레드가 Python의 많은 스레딩 애플리케이션을 단순화하는 데 유용하며, 대부분의 경우 프로그램이 곧 종료될 것이므로 스레드를 정상적으로 종료하려고 노력하는 추가적인 복잡성만큼의 가치가 없습니다.

데몬 스레드가 필요한 경우, 링크된 이슈의 예시에서 "오래 실행되고, 중단할 수 없는 서드파티 작업(Long-running, uninterruptible, third-party task)"에 해당하는 경우가 많았습니다. 기본적으로 백그라운드에서 실행해야 하지만, 프로세스 종료 외에는 이를 종료할 쉬운 방법이 없었습니다.

마지막으로, Python 수준의 데몬 스레드를 제거하는 것만으로는 전체 문제가 해결되지 않습니다. 이 PEP에서 언급했듯이, 확장 모듈은 자체 스레드를 생성하고 스레드 상태를 연결할 수 있습니다. 데몬 스레드와 마찬가지로 Python은 종료 중에 이러한 스레드를 조인(join)하려고 시도하지 않으므로, 데몬 스레드 전체를 제거하려는 시도는 C API에서 이를 제거하는 것을 포함할 것이며, 이는 현재 제안된 것보다 훨씬 더 대규모의 API 변경이 필요할 것입니다.

데몬 스레드를 제거하더라도 확장 모듈 코드는 Python이 추적하지 않는 자체 스레드를 생성할 수 있습니다. 이는 현실적으로 데몬 스레드의 다른 형태이며, 결코 금지되지 않을 것입니다.

#### 스레드를 조인하는 것이 항상 좋은 생각은 아닙니다 (Joining the Thread Isn't Always a Good Idea)

데몬 스레드에서도 `atexit` 함수를 통해 비-Python 스레드의 멈춤을 일반적으로 방지할 수 있습니다. 일부 C 함수에 의해 스레드가 시작된 다음, 해당 스레드가 `atexit`에 의해 조인되는 한 스레드는 멈추지 않을 것입니다.

`atexit`는 함수에 항상 선택지가 될 수는 없습니다. 이를 호출하려면 스레드에 이미 연결된 스레드 상태가 있어야 하기 때문입니다. 이에 대한 보장이 없다면, 스레드가 멈출 위험 없이 `atexit.register()`를 안전하게 호출할 수 없습니다. 이는 스레드를 조인하는 책임을 호출자(caller)가 아닌 피호출자(callee)에게 전가하며, 이는 실제로는 신뢰할 수 있는 해결책이 아닙니다.

예를 들어, 대규모 C++ 애플리케이션은 Python 코드를 호출할 수 있는 인터페이스를 노출하기를 원할 수 있습니다. 이를 위해 C++ API는 Python 객체를 가져와서 `PyGILState_Ensure()`를 호출하여 안전하게 상호 작용합니다. (예를 들어, 이를 호출함으로써) 인터프리터가 종료 중이거나 종료되었다면 스레드는 멈추게 되어 C++ 호출 흐름을 방해합니다.

#### GIL-state API는 버그가 많고 혼란스럽습니다 (The GIL-state APIs Are Buggy and Confusing)

현재 사용자가 스레드를 위한 스레드 상태를 생성하고 연결하는 두 가지 공개적인 방법이 있습니다: PyThreadState_New()와 PyThreadState_Swap()의 수동 사용, 또는 편리한 PyGILState_Ensure()입니다.

후자인 PyGILState_Ensure()는 코드 검색에서 거의 3,000건이 발견될 정도로 훨씬 더 일반적이며, PyThreadState_New()는 400건 미만입니다.

##### PyGILState_Ensure()의 종료 동작은 변경할 수 없습니다 (Finalization Behavior for PyGILState_Ensure Cannot Change)

Python 프로그램에는 `PyGILState_Ensure()`가 더 이상 스레드 상태를 연결할 수 없는 시점이 항상 존재해야 합니다. 인터프리터가 오랫동안 종료되었다면, Python은 분명히 스레드에 이를 호출할 방법을 제공할 수 없습니다. `PyGILState_Ensure()`는 실패를 반환할 의미 있는 방법이 없으므로, python/cpython#124622에서 언급했듯이 스레드를 종료하거나 치명적인 오류를 발생시키는 수밖에 없습니다.

이러한 이유로, `PyGILState_Ensure()`의 종료 시 작동 방식에 실제 변경을 가할 수 없습니다. 이는 기존 코드를 손상시킬 것이기 때문입니다.

##### PyGILState_Ensure()는 일반적으로 종료 시 충돌합니다 (PyGILState_Ensure Generally Crashes During Finalization)

작성 시점에 `PyGILState_Ensure()`의 현재 동작은 항상 문서와 일치하지는 않습니다. 이전에 언급했듯이 종료 시 스레드를 멈추게 하는 대신, segmentation fault로 충돌할 수 있습니다. 이는 CPython에서 수정될 수 있는 알려진 문제이지만, 이 PEP의 수락 및 구현이 `PyGILState_Ensure()`로 인한 기존 충돌을 해결할 가능성이 높으므로 여기에 언급할 가치가 있습니다.

##### "GIL"이라는 용어는 Free-threading에서 혼란스럽습니다 (The Term “GIL” Is Tricky for Free-threading)

C API에서 "GIL"이라는 용어의 큰 문제는 의미상 오해의 소지가 있다는 것입니다. 이는 이 PEP의 저자들이 만든 python/cpython#127989에서 지적되었습니다.

가장 큰 문제는 Free-threading의 경우 GIL이 없으므로, 사용자들이 Py_BEGIN_ALLOW_THREADS 블록 내에서 C API를 잘못 호출하거나 새로운 스레드에서 PyGILState_Ensure를 생략한다는 것입니다.

다시 말하지만, `PyGILState_Ensure()`는 GIL이 있는 빌드와 Free-threading 빌드 모두에서 스레드에 연결된 스레드 상태를 가져옵니다. C API를 호출하려면 항상 연결된 스레드 상태가 필요하므로, Free-threading 빌드에서도 `PyGILState_Ensure()`를 호출해야 하지만, "GIL 확보(ensure GIL)"와 같은 이름으로는 그 사실이 즉시 명확하지 않습니다.

##### PyGILState_Ensure()는 올바른 인터프리터를 추측하지 못합니다 (PyGILState_Ensure Doesn't Guess the Correct Interpreter)

문서에서 언급했듯이, PyGILState 함수는 서브 인터프리터에서 공식적으로 지원되지 않습니다.

`PyGILState_*` 함수는 하나의 전역 인터프리터(Py_Initialize()에 의해 자동으로 생성됨)만 존재한다고 가정합니다. Python은 추가 인터프리터 생성을 지원하지만, 여러 인터프리터와 `PyGILState_*` API를 혼용하는 것은 지원되지 않습니다.

이는 `PyGILState_Ensure()`가 어떤 인터프리터가 스레드를 생성했는지 알 방법이 없으므로, 메인 인터프리터라고 가정해야 하기 때문입니다. 런타임에 이를 감지할 방법이 없으므로, 서브 인터프리터에 의해 생성된 스레드에서 잘못된 인터프리터에 대한 동기화가 스레드 간에 공유되는 객체에 사용되어 잘못된 경쟁 조건(spurious races)이 발생할 수밖에 없습니다.

예를 들어, 스레드가 서브 인터프리터에 속하는 객체 A에 접근할 수 있었지만 `PyGILState_Ensure()`를 호출했다면, 스레드는 서브 인터프리터가 아닌 메인 인터프리터를 가리키는 연결된 스레드 상태를 갖게 됩니다. 이는 객체에 대한 GIL 가정(GIL assumptions)이 잘못되었음을 의미합니다! 두 GIL 사이에 동기화가 없으므로, 스레드와 메인 스레드 모두 동시에 객체의 참조 카운트(reference count)를 증가시키려 시도하여 데이터 경쟁(data race)을 유발할 수 있습니다.

##### 인터프리터는 동시에 할당 해제될 수 있습니다 (An Interpreter Can Concurrently Deallocate)

비-Python 스레드를 생성하는 다른 방법인 `PyThreadState_New()`와 `PyThreadState_Swap()`은 서브 인터프리터를 지원하는 데 훨씬 더 좋지만 (PyThreadState_New()가 메인 인터프리터가 요청되었다고 가정하는 대신 명시적인 인터프리터를 받기 때문에), C API의 현재 멈춤(hanging) 문제에 의해 여전히 제한됩니다. 스레드 상태의 수동 생성(PyGILState_Ensure()에서의 암묵적인 생성과 대조적으로 "수동")은 앞에서 언급한 스레드 상태와 관련된 스레드 안전성(thread-safety) 문제 중 어떤 것도 해결하지 못합니다.

게다가 서브 인터프리터는 일반적으로 메인 인터프리터보다 수명이 훨씬 짧으므로, 호출 스레드와 생성된 스레드 사이에 동기화가 없다면, 스레드에 전달된 인터프리터 상태가 이미 완료되어 할당 해제되어 사용 후 해제(use-after-free) 충돌을 일으킬 가능성이 훨씬 높습니다. 작성 시점에는 비교적 이론적인 문제이지만, 최근 PEP 734의 승인으로 인해 최신 버전에서는 더욱 문제가 될 가능성이 높습니다.

### 근거 (Rationale)

#### 참조 카운팅으로 인터프리터 종료 방지 (Preventing Interpreter Shutdown With Reference Counting)

이 PEP는 인터프리터에 종료를 방지하는 참조 카운트(reference count)를 부여하는 접근 방식을 취합니다. 따라서 인터프리터에 "강력한 참조(strong reference)"를 보유하면 스레드가 멈추는 것에 대해 걱정하지 않고 C API를 안전하게 호출할 수 있게 됩니다.

이는 Python과 상호 작용하는 것(예: C++ 라이브러리에서)이 객체를 안전하게 호출하기 위해 인터프리터에 대한 참조를 필요로 한다는 것을 의미하며, 이는 메인 인터프리터가 올바른 선택이라고 가정하는 것보다 확실히 더 불편하지만, 다른 옵션은 실제로 없습니다. 미래의 제안은 객체의 인터프리터를 추적하는 메커니즘(예: `PyObject`의 필드)을 추가하여 이를 더 깔끔하게 만들 수 있을 것입니다.

일반적으로 강력한 인터프리터 참조는 수명이 짧아야 합니다. 인터프리터 참조는 락(lock) 또는 "임계 구역(critical section)"과 유사하게 작동해야 하며, 이 기간 동안 인터프리터는 스레드를 멈추게 하거나 할당 해제되어서는 안 됩니다. 예를 들어, IO 락을 획득할 때, 락을 획득하기 전에 강력한 인터프리터 참조를 획득하고, 락이 해제되면 참조도 해제되어야 합니다.

#### 약한 참조 (Weak References)

이 제안은 인터프리터가 종료되는 것을 방지하지는 않지만, 사용자가 C API를 호출하기로 결정했을 때 강력한 참조로 승격(promote)될 수 있는 인터프리터에 대한 약한 참조(weak references)도 함께 제공합니다. 인터프리터가 파괴되었거나 강력한 참조를 생성할 수 있는 시점을 지났다면, 약한 참조의 승격은 실패합니다.

약한 참조는 일반적으로 강력한 참조보다 훨씬 오래 지속됩니다. 이는 이전에 언급된 많은 비동기 상황에서 유용합니다. 여기서 스레드 자체는 원하는 인터프리터가 종료되는 것을 방지해서는 안 되지만, 필요할 때 Python을 실행할 수 있도록 허용해야 합니다.

예를 들어, (비재진입성) 이벤트 핸들러(event handler)는 `void *arg` 매개변수에 약한 인터프리터 참조를 저장할 수 있으며, Python 코드를 호출할 때 해당 약한 참조는 강력한 참조로 승격됩니다.

#### 오래된 GIL-state API 제거 (Removing the Outdated GIL-state APIs)

`PyGILState`의 해결 불가능한 문제들로 인해, 이 PEP는 이들을 완전히 제거하려고 합니다. 오늘날의 C API에서 모든 `PyGILState` 함수는 서브 인터프리터와 호환되는 PyThreadState 대응 함수로 대체될 수 있습니다.

*   `PyGILState_Ensure()`: `PyThreadState_Swap()` 및 `PyThreadState_New()`
*   `PyGILState_Release()`: `PyThreadState_Clear()` 및 `PyThreadState_Delete()`
*   `PyGILState_GetThisThreadState()`: `PyThreadState_Get()` (대략적으로)
*   `PyGILState_Check()`: `PyThreadState_GetUnchecked() != NULL`

이 PEP는 이러한 함수의 사용 중단을 명시합니다 (안정적인 ABI(stable ABI)에는 유지됩니다). 이는 `PyThreadState_Ensure()` 및 `PyThreadState_Release()`가 특정 인터프리터 요구 사항으로 인해 `PyGILState_Ensure()` 및 `PyGILState_Release()`의 더 올바른 대체 역할을 할 것이기 때문입니다.

이 사용 중단(deprecation)의 정확한 세부 사항은 아직 명확하지 않습니다. PEP 387에 명시된 일반적인 5년 사용 중단 기간은 너무 짧을 가능성이 있으므로, 당분간 이 함수들에는 특정 제거 날짜가 없을 것입니다.

#### PyGILState_Ensure()를 위한 호환성 Shim (Compatibility Shim for PyGILState_Ensure)

이 제안은 `PyGILState_Ensure()`의 일부 사용자를 위한 호환성 해킹(compatibility hack)으로 `PyUnstable_GetDefaultInterpreterRef()`를 제공합니다. 이는 메인(또는 "기본") 인터프리터에 대한 강력한 참조를 획득하는 스레드 안전한 방법입니다.

`PyThreadState_Ensure()`로 새 코드를 포팅하는 주요 단점은 인터프리터 참조 인수가 필요하므로 `PyGILState_Ensure()`의 드롭인(drop-in) 대체제가 아니라는 것입니다. 일부 대규모 애플리케이션에서는 모든 곳에서 `PyInterpreterRef`를 사용하도록 리팩토링하는 것이 어려울 수 있습니다. 따라서 이 함수는 서브 인터프리터에 대한 지원을 명시적으로 허용하지 않으려는 사용자에게 만능 해결책(silver bullet) 역할을 합니다.

### 명세 (Specification)

#### 종료를 방지하기 위한 인터프리터 참조 (Interpreter References to Prevent Shutdown)

인터프리터는 C API 사용자가 관리하는 참조 카운트(reference count)를 유지합니다. 인터프리터가 종료되기 시작하면, 참조 카운트가 0에 도달할 때까지 기다린 다음, 스레드가 멈추고 상태를 할당 해제할 수 있는 단계로 진행합니다. 인터프리터는 `threading.Thread` 객체가 조인되는 시점과 거의 동시에 참조 카운트를 기다리지만, 이는 스레드를 조인하는 것과 같지 않습니다. 인터프리터는 참조 카운트가 0이 될 때까지 기다린 다음 진행합니다. 참조 카운트가 0에 도달한 후에는 스레드가 인터프리터의 종료를 더 이상 방지할 수 없습니다. (따라서 `PyInterpreterRef_FromCurrent()` 및 `PyInterpreterWeakRef_Promote()`는 실패합니다.)

인터프리터에 대한 약한 참조는 종료를 방지하지 않으며, 인터프리터가 강력한 참조 생성을 더 이상 지원하지 않게 된 후에도, 심지어 인터프리터 상태가 삭제된 후에도 안전하게 접근할 수 있습니다. 약한 참조의 삭제 및 복제는 항상 허용되지만, 인터프리터가 강력한 참조를 기다린 시점에 도달한 후에는 승격(`PyInterpreterWeakRef_Promote()`)이 항상 실패합니다.

##### 강력한 인터프리터 참조 (Strong Interpreter References)

*   **`type PyInterpreterRef`** : 인터프리터에 대한 불투명한(opaque), 강력한 참조입니다. 인터프리터는 종료하기 전에 강력한 참조가 해제될 때까지 기다립니다. 이 타입은 포인터 크기임을 보장합니다.
*   **`PyInterpreterRef PyInterpreterRef_FromCurrent(void)`** : 현재 인터프리터에 대한 강력한 참조를 획득합니다. 성공 시 현재 인터프리터에 대한 강력한 참조를 반환하며, 실패 시 예외를 설정하고 0을 반환합니다. 실패는 일반적으로 인터프리터가 강력한 참조를 기다리는 것을 이미 완료했음을 나타냅니다. 호출자는 연결된 스레드 상태를 보유해야 합니다.
*   **`PyInterpreterRef PyUnstable_GetDefaultInterpreterRef(PyInterpreterRef *ref)`**: 메인 인터프리터에 대한 강력한 참조를 획득합니다. 이 함수는 특정 인터프리터를 저장할 수 없는 특별한 경우에만 존재합니다. 가능하면 `PyInterpreterRef_FromCurrent()`를 통해 안전하게 참조를 획득하는 것을 선호합니다. 성공 시 메인 인터프리터에 대한 강력한 참조를 반환하며, 실패 시 예외를 설정하지 않고 0을 반환합니다. 실패는 일반적으로 메인 인터프리터가 참조 카운트를 기다리는 것을 이미 완료했음을 나타냅니다. 호출자는 연결된 스레드 상태를 보유할 필요가 없습니다.
*   **`PyInterpreterState *PyInterpreterRef_GetInterpreter(PyInterpreterRef ref)`**: `ref`가 나타내는 `PyInterpreterState` 포인터를 반환합니다. 이 함수는 실패할 수 없으며, 호출자는 연결된 스레드 상태를 보유할 필요가 없습니다.
*   **`PyInterpreterRef PyInterpreterRef_Dup(PyInterpreterRef ref)`** : 인터프리터에 대한 강력한 참조를 복제합니다. 성공 시 `ref`가 나타내는 인터프리터에 대한 강력한 참조를 반환하며, 실패 시 예외를 설정하지 않고 0을 반환합니다. 호출자는 연결된 스레드 상태를 보유할 필요가 없습니다.
*   **`void PyInterpreterRef_Close(PyInterpreterRef ref)`** : 인터프리터에 대한 강력한 참조를 해제하여, 남은 참조가 없으면 종료할 수 있도록 합니다. 이 함수는 실패할 수 없으며, 호출자는 연결된 스레드 상태를 보유할 필요가 없습니다.

##### 약한 인터프리터 참조 (Weak Interpreter References)

*   **`type PyInterpreterWeakRef`** : 인터프리터에 대한 불투명한(opaque), 약한 참조입니다. 인터프리터는 종료하기 전에 이 참조가 해제될 때까지 기다리지 않습니다. 이 타입은 포인터 크기임을 보장합니다.
*   **`int PyInterpreterWeakRef_FromCurrent(PyInterpreterWeakRef *wref)`**: 현재 인터프리터에 대한 약한 참조를 획득합니다. 이 함수는 일반적으로 `PyInterpreterWeakRef_Promote()`와 함께 사용됩니다. 성공 시 현재 인터프리터에 대한 약한 참조를 반환하며, 실패 시 예외를 설정하고 0을 반환합니다. 호출자는 연결된 스레드 상태를 보유해야 합니다.
*   **`PyInterpreterWeakRef PyInterpreterWeakRef_Dup(PyInterpreterWeakRef wref)`** : 인터프리터에 대한 약한 참조를 복제합니다. 성공 시 `wref`가 나타내는 인터프리터에 대한 0이 아닌 약한 참조를 반환하며, 실패 시 예외를 설정하지 않고 0을 반환합니다. 이 함수는 실패할 수 없으며, 호출자는 연결된 스레드 상태를 보유할 필요가 없습니다.
*   **`PyInterpreterRef PyInterpreterWeakRef_Promote(PyInterpreterWeakRef wref)`** : 약한 참조를 통해 인터프리터에 대한 강력한 참조를 획득합니다. 성공 시 `wref`가 나타내는 인터프리터에 대한 강력한 참조를 반환합니다. 이 함수를 호출한 후에도 약한 참조는 여전히 유효합니다. 인터프리터가 더 이상 존재하지 않거나 참조 카운트가 0에 도달하기를 기다리는 것을 이미 완료했다면, 이 함수는 예외를 설정하지 않고 0을 반환합니다. 이 함수는 재진입(re-entrant) 시그널 핸들러에서 안전하게 호출할 수 없습니다. 호출자는 연결된 스레드 상태를 보유할 필요가 없습니다.
*   **`void PyInterpreterWeakRef_Close(PyInterpreterWeakRef wref)`** : 인터프리터에 대한 약한 참조를 해제합니다. 이 함수는 실패할 수 없으며, 호출자는 연결된 스레드 상태를 보유할 필요가 없습니다.

#### 스레드 상태 확보 및 해제 (Ensuring And Releasing Thread States)

이 제안은 `PyGILState_Ensure()` 및 `PyGILState_Release()`를 대체하려는 두 가지 새로운 고수준 스레딩 API를 포함합니다.

*   **`type PyThreadRef`** : 스레드 상태에 대한 불투명한(opaque) 참조입니다. 초기 구현에서는 스레드 참조를 보유하는 것이 스레드 또는 인터프리터의 종료를 막지 않습니다. 이는 미래에 변경될 수 있습니다. 이 타입은 포인터 크기임을 보장합니다.
*   **`int PyThreadState_Ensure(PyInterpreterRef ref, PyThreadRef *thread)`**: 스레드가 `ref`가 나타내는 인터프리터에 대해 연결된 스레드 상태를 가지고 있어서 해당 인터프리터를 안전하게 호출할 수 있도록 보장합니다. 스레드가 이미 연결된 스레드 상태를 가지고 있더라도, 이에 상응하는 `PyThreadState_Release()` 호출이 있다면 이 함수를 호출해도 괜찮습니다. 이 함수에 대한 중첩 호출은 때때로 새로운 스레드 상태를 생성할 뿐입니다. 연결된 스레드 상태가 없다면, 이 함수는 이 스레드에 의해 사용된 가장 최근의 연결된 스레드 상태를 확인합니다. 아무것도 없거나 `ref`와 일치하지 않으면 새로운 스레드 상태가 생성됩니다. `ref`와 일치하면 다시 연결됩니다. 연결된 스레드 상태가 있다면 유사한 확인이 발생합니다. 인터프리터가 `ref`와 일치하면 연결되고, 그렇지 않으면 새로운 스레드 상태가 생성됩니다. 이전 스레드 상태는 `*thread`에 스레드 참조로 저장되며, `PyThreadState_Release()`에 의해 복원됩니다. 성공 시 0을 반환하고, 실패 시 예외를 설정하지 않고 -1을 반환합니다.
*   **`void PyThreadState_Release(PyThreadRef ref)`** : `PyThreadState_Ensure()` 호출을 해제합니다. 해당 `PyThreadState_Ensure()` 호출 이전에 연결된 스레드 상태는 반환 시 복원됨이 보장됩니다. `PyThreadState_Ensure()` 및 `PyGILState_Ensure()`에서 사용된 캐시된 스레드 상태도 복원됩니다. 이 함수는 실패할 수 없습니다.

#### GIL-state API 사용 중단 (Deprecation of GIL-state APIs)

이 PEP는 기존 및 새로운 `PyThreadState` API를 선호하여 기존의 모든 `PyGILState` API의 사용을 중단합니다. 구체적으로 다음과 같습니다.

*   `PyGILState_Ensure()`: 대신 `PyThreadState_Ensure()`를 사용하십시오.
*   `PyGILState_Release()`: 대신 `PyThreadState_Release()`를 사용하십시오.
*   `PyGILState_GetThisThreadState()`: 대신 `PyThreadState_Get()` 또는 `PyThreadState_GetUnchecked()`를 사용하십시오.
*   `PyGILState_Check()`: 대신 `PyThreadState_GetUnchecked() != NULL`을 사용하십시오.

모든 `PyGILState` API는 향후 Python 버전에서 비제한 C API(non-limited C API)의 공개 헤더(public headers)에서 제거될 예정입니다. 호환성을 위해 안정적인 ABI(stable ABI)에는 계속 유지됩니다.

`PyThreadState_Get()` 및 `PyThreadState_GetUnchecked()`가 `PyGILState_GetThisThreadState()`의 완벽한 대체제가 아니라는 점을 주목할 가치가 있습니다. `PyGILState_GetThisThreadState()`는 분리된(detached) 상태에서도 스레드 상태를 반환할 수 있기 때문입니다. 이 PEP는 GIL-state 포인터(스레드에 의해 마지막으로 사용된 스레드 상태를 보유함)가 `PyThreadState_Ensure()` 또는 유사한 기능을 구현하는 사람들에게만 유용하며, 사용자로서 일반적으로 원하는 API가 아니므로 의도적으로 완벽한 대체제를 제공하지 않습니다.

### 하위 호환성 (Backwards Compatibility)

이 PEP는 향후 버전에서 비제한 C API의 공개 헤더에서 모든 `PyGILState` API를 제거함으로써 호환성이 깨지는 변경(breaking change)을 명시합니다.

### 보안 영향 (Security Implications)

이 PEP에는 알려진 보안 영향이 없습니다.

### 교육 방법 (How to Teach This)

모든 C API 함수와 마찬가지로, 이 PEP의 모든 새 API는 C API 문서, 이상적으로는 "비-Python이 생성한 스레드" 섹션(Non-Python created threads section) 아래에 문서화될 것입니다. 기존 `PyGILState` 문서는 새 API를 가리키도록 accordingly 업데이트되어야 합니다.

### 예시 (Examples)

이 예시들은 이 PEP에 설명된 API를 이해하는 데 도움이 됩니다. 이상적으로는 문서에 재사용될 수 있습니다.

#### 예시: 라이브러리 인터페이스 (Example: A Library Interface)

로깅을 위한 C 라이브러리를 개발한다고 상상해보세요. 사용자에게 Python 파일 객체에 로깅할 수 있는 API를 제공하고 싶을 수 있습니다.

이 PEP를 사용하면 다음과 같이 구현할 수 있습니다.

```c
int LogToPyFile(PyInterpreterWeakRef wref, PyObject *file, const char *text) {
    PyInterpreterRef ref = PyInterpreterWeakRef_Promote(wref);
    if (ref == 0) {
        /* Python interpreter has shut down */
        return -1;
    }
    PyThreadRef thread_ref;
    if (PyThreadState_Ensure(ref, &thread_ref) < 0) {
        PyInterpreterRef_Close(ref);
        fputs("Cannot call Python.\n", stderr);
        return -1;
    }
    char *to_write = do_some_text_mutation(text);
    int res = PyFile_WriteString(to_write, file);
    free(to_write);
    PyErr_Print();
    PyThreadState_Release(thread_ref);
    PyInterpreterRef_Close```

이 경우에는 `PyGILState_Ensure()`를 사용했다면, 인터프리터가 그 시점에 종료 중이었다면 스레드가 멈췄을 것입니다! 또한, 이 API는 서브 인터프리터를 지원합니다. 메인 인터프리터가 파일 객체를 생성했다고 가정한다면 (`PyGILState_Ensure()`를 통해), 서브 인터프리터가 소유한 파일 객체를 사용하는 것은 충돌을 일으킬 수 있습니다.

#### 예시: 단일 스레드 Ensure (Example: A Single-threaded Ensure)

이 예시는 Python 메서드에서 락을 획득하는 것을 보여줍니다.

이것이 데몬 스레드에서 호출된다면, 인터프리터는 스레드 상태를 재연결하는 동안 스레드를 멈추게 하여 락이 잡힌 채로 남겨둘 수 있습니다. 락을 획득하려는 미래의 모든 종료자는 교착 상태에 빠질 것입니다!

```c
static PyObject * my_critical_operation(PyObject *self, PyObject *unused) {
    assert(PyThreadState_GetUnchecked() != NULL);
    PyInterpreterRef ref = PyInterpreterRef_FromCurrent();
    if (ref == 0) {
        /* Python interpreter has shut down */
        return NULL;
    }
    Py_BEGIN_ALLOW_THREADS;
    acquire_some_lock();
    /* Do something while holding the lock. The interpreter won't finalize during this period. */
    // ...
    release_some_lock();
    Py_END_ALLOW_THREADS;
    PyInterpreterRef_Close(ref);
    Py_RETURN_NONE;
}
```

#### 예시: 레거시 함수에서 전환 (Example: Transitioning From the Legacy Functions)

다음 코드는 `PyGILState` API를 사용합니다.

```c
static int thread_func(void *arg) {
    PyGILState_STATE gstate = PyGILState_Ensure();
    /* It's not an issue in this example, but we just attached a thread state for the main interpreter. If my_method() was originally called in a subinterpreter, then we would be unable to safely interact with any objects from it. */
    if (PyRun_SimpleString("print(42)") < 0) {
        PyErr_Print();
    }
    PyGILState_Release(gstate);
    return 0;
}
static PyObject * my_method(PyObject *self, PyObject *unused) {
    PyThread_handle_t handle;
    PyThead_indent_t indent;
    if (PyThread_start_joinable_thread(thread_func, NULL, &ident, &handle) < 0) {
        return NULL;
    }
    Py_BEGIN_ALLOW_THREADS;
    PyThread_join_thread(handle);
    Py_END_ALLOW_THREADS;
    Py_RETURN_NONE;
}
```

새로운 함수를 사용하도록 다시 작성된 동일한 코드는 다음과 같습니다.

```c
static int thread_func(void *arg) {
    PyInterpreterRef interp = (PyInterpreterRef)arg;
    PyThreadRef thread_ref;
    if (PyThreadState_Ensure(interp, &thread_ref) < 0) {
        PyInterpreterRef_Close(interp);
        return -1;
    }
    if (PyRun_SimpleString("print(42)") < 0) {
        PyErr_Print();
    }
    PyThreadState_Release(thread_ref);
    PyInterpreterRef_Close(interp);
    return 0;
}
static PyObject * my_method(PyObject *self, PyObject *unused) {
    PyThread_handle_t handle;
    PyThead_indent_t indent;
    PyInterpreterRef ref = PyInterpreterRef_FromCurrent();
    if (ref == 0) {
        return NULL;
    }
    if (PyThread_start_joinable_thread(thread_func, (void *)ref, &ident, &handle) < 0) {
        PyInterpreterRef_Close(ref);
        return NULL;
    }
    Py_BEGIN_ALLOW_THREADS
    PyThread_join_thread(handle);
    Py_END_ALLOW_THREADS
    Py_RETURN_NONE;
}
```

#### 예시: 데몬 스레드 (Example: A Daemon Thread)

이 PEP를 사용하면 데몬 스레드는 현재 C API에서 비-Python 스레드가 작동하는 방식과 매우 유사합니다. `PyThreadState_Ensure()`를 호출한 후에는 인터프리터 참조를 해제하여 인터프리터가 종료될 수 있도록 합니다 (그리고 현재 스레드를 영원히 멈추게 합니다).

```c
static int thread_func(void *arg) {
    PyInterpreterRef ref = (PyInterpreterRef)arg;
    PyThreadRef thread_ref;
    if (PyThreadState_Ensure(ref, &thread_ref) < 0) {
        PyInterpreterRef_Close(ref);
        return -1;
    }
    /* Release the interpreter reference, allowing it to finalize. This means that print(42) can hang this thread. */
    PyInterpreterRef_Close(ref);
    if (PyRun_SimpleString("print(42)") < 0) {
        PyErr_Print();
    }
    PyThreadState_Release(thread_ref);
    return 0;
}
static PyObject * my_method(PyObject *self, PyObject *unused) {
    PyThread_handle_t handle;
    PyThead_indent_t indent;
    PyInterpreterRef ref = PyInterpreterRef_FromCurrent();
    if (ref == 0) {
        return NULL;
    }
    if (PyThread_start_joinable_thread(thread_func, (void *)ref, &ident, &handle) < 0) {
        PyInterpreterRef_Close(ref);
        return NULL;
    }
    Py_RETURN_NONE;
}
```

#### 예시: 비동기 콜백 (Example: An Asynchronous Callback)

일부 경우 스레드는 콜백과 같이 시작되지 않을 수도 있습니다. 강력한 참조가 해제되지 않으면 인터프리터를 교착 상태에 빠뜨릴 수 있으므로 여기서는 강력한 참조를 사용할 수 없습니다.

```c
typedef struct {
    PyInterpreterWeakRef wref;
} ThreadData;
static int async_callback(void *arg) {
    ThreadData *data = (ThreadData *)arg;
    PyInterpreterWeakRef wref = data->wref;
    PyInterpreterRef ref = PyInterpreterWeakRef_Promote(wref);
    if (ref == 0) {
        fputs("Python has shut down!\n", stderr);
        return -1;
    }
    PyThreadRef thread_ref;
    if (PyThreadState_Ensure(ref, &thread_ref) < 0) {
        PyInterpreterRef_Close(ref);
        return -1;
    }
    if (PyRun_SimpleString("print(42)") < 0) {
        PyErr_Print();
    }
    PyThreadState_Release(thread_ref);
    PyInterpreterRef_Close(ref);
    return 0;
}
static PyObject * setup_callback(PyObject *self, PyObject *unused) {
    // Weak reference to the interpreter. It won't wait on the callback
    // to finalize.
    ThreadData *tdata = PyMem_RawMalloc(sizeof(ThreadData));
    if (tdata == NULL) {
        PyErr_NoMemory();
        return NULL;
    }
    PyInterpreterWeakRef wref = PyInterpreterWeakRef_FromCurrent();
    if (wref == 0) {
        PyMem_RawFree(tdata);
        return NULL;
    }
    tdata->wref = wref;
    register_callback(async_callback, tdata);
    Py_RETURN_NONE;
}
```

#### 예시: 콜백 매개변수 없이 Python 호출 (Example: Calling Python Without a Callback Parameter)

콜백 함수가 콜백 매개변수(`void *arg`)를 받지 않아 특정 인터프리터에 대한 참조를 획득할 수 없는 경우가 있습니다. 이 문제에 대한 해결책은 `PyUnstable_GetDefaultInterpreterRef()`를 통해 메인 인터프리터에 대한 참조를 획득하는 것입니다.

하지만 `PyGILState_Ensure()`가 올바른 인터프리터를 추측하지 못한다는 점 때문에 서브 인터프리터에서 문제가 발생하지 않을까요? 다행히 콜백에 콜백 매개변수가 없으므로 호출자가 객체나 인터프리터별 데이터를 전달할 수 없기 때문에 여기서는 메인 인터프리터를 선택하는 것이 완전히 안전합니다.

```c
static void call_python(void) {
    PyInterpreterRef ref = PyUnstable_GetDefaultInterpreterRef();
    if (ref == 0) {
        fputs("Python has shut down.", stderr);
        return;
    }
    PyThreadRef thread_ref;
    if (PyThreadState_Ensure(ref, &thread_ref) < 0) {
        PyInterpreterRef_Close(ref);
        return -1;
    }
    if (PyRun_SimpleString("print(42)") < 0) {
        PyErr_Print();
    }
    PyThreadState_Release(thread_ref);
    PyInterpreterRef_Close(ref);
    return 0;
}
```

### 참조 구현 (Reference Implementation)

이 PEP의 참조 구현은 python/cpython#133110에서 찾을 수 있습니다.

### 미해결 문제 (Open Issues)

#### API는 어떻게 실패를 알려야 하는가? (How Should the APIs Fail?)

`PyInterpreter[Weak]Ref` API가 호출자에게 실패를 알리는 방법에 대한 의견 불일치가 약간 있습니다. 두 가지 경쟁 아이디어가 있습니다.

1.  실패를 나타내기 위해 -1을 반환하고, 성공을 나타내기 위해 0을 반환합니다. 성공 시 함수는 인수로 전달된 `PyInterpreter[Weak]Ref` 포인터에 할당합니다.
2.  `PyInterpreter[Weak]Ref`를 직접 반환하며, 0 값은 `NULL`과 동일하게 실패를 나타냅니다.

현재 PEP는 후자를 따릅니다.

### 거부된 아이디어 (Rejected Ideas)

#### 비-데몬 스레드 상태 (Non-daemon Thread States)

이 PEP의 이전 반복에서는 인터프리터 참조가 인터프리터의 속성이 아니라 스레드 상태의 속성이었습니다. 이는 `PyThreadState_Ensure()`가 강력한 인터프리터 참조를 "훔치고", `PyThreadState_Release()` 호출 시 해제된다는 것을 의미했습니다. 인터프리터에 대한 참조를 보유하는 스레드 상태는 "비-데몬 스레드 상태"로 알려져 있었습니다. 처음에는 참조의 수명 관리를 사용자 대신 스레드로 전환하여 일부 상용구(boilerplate)를 제거했기 때문에 개선된 것처럼 보였습니다.

그러나 이는 결국 제안을 훨씬 더 복잡하게 만들었고 제안의 목표를 저해했습니다.

가장 중요하게는 비-데몬 스레드 상태가 데몬 스레드를 문제의 원인으로 너무 강조하여 PEP의 명확성을 해쳤습니다. 또한 "비-데몬"이라는 문구는 추가적인 혼란을 야기했는데, 비-데몬 Python 스레드는 명시적으로 조인되는 반면, 비-데몬 C 스레드는 참조를 해제할 때까지 기다릴 뿐이기 때문입니다. 많은 경우 인터프리터 참조는 단일 스레드 상태보다 오래 지속되어야 합니다. `PyThreadState_Ensure()`가 비-데몬 스레드 상태로 참조를 "훔치지" 않는 경우 인터프리터 참조의 소유권 스토리를 모호하게 만들어 더 혼란스러운 API로 이어질 수 있었습니다.

#### 기존 구조를 참조 카운트로 개조 (Retrofiting the Existing Structures with Reference Counts)

##### 참조 카운팅을 위한 인터프리터 상태 포인터 (Interpreter-State Pointers for Reference Counting)

원래 이 PEP는 `PyInterpreterState_Hold()` 및 `PyInterpreterState_Release()`를 통해 인터프리터에 대한 강력한 참조를 관리하고, 인터프리터 ID(약한 참조)를 강력한 참조로 변환하는 `PyInterpreterState_Lookup()`을 명시했습니다.

결국 이는 불필요하게 혼란스럽다는 이유로 거부되었습니다. 인터프리터 상태는 이전에 참조 카운트가 없었으므로, 무엇이 강력한 참조인지에 대한 직관이 부족했습니다. `PyInterpreterRef` 및 `PyInterpreterWeakRef` 타입이 훨씬 더 명확하게 보입니다.

##### 참조 카운팅을 위한 인터프리터 ID (Interpreter IDs for Reference Counting)

이 API의 일부 반복에서는 `PyInterpreterState *interp` 대신 `int64_t interp_id` 매개변수를 사용했습니다. 인터프리터 ID는 동시에 삭제될 수 없고 Use-after-free 위반을 일으키지 않기 때문입니다. 이 PEP의 참조 카운팅 API는 어쨌든 이 문제를 회피하지만, 인터프리터 ID는 마법(magic)이 덜 필요하다는 장점이 있습니다.

*   거의 모든 기존 인터프리터 API는 인터프리터 ID가 아닌 `PyInterpreterState` 포인터를 반환합니다. `PyThreadState_GetInterpreter()`와 같은 함수는 `PyInterpreterState_GetID()`에 대한 혼란스러운 호출을 수반해야 할 것입니다.
*   스레드는 일반적으로 `int64_t arg`가 아닌 `void *arg` 매개변수를 받습니다. 따라서 참조를 전달하는 것이 사용자에게 훨씬 적은 상용구를 필요로 합니다. 추가 구조 정의 또는 힙 할당이 인터프리터 ID를 저장하는 데 필요하기 때문입니다. 이는 `void *`가 `int64_t`에 비해 너무 작은 32비트 시스템에서 특히 문제입니다.
*   유용성을 유지하려면 인터프리터 ID API는 여전히 참조 카운트를 유지해야 합니다. 그렇지 않으면 비-Python 스레드가 연결할 기회를 얻기 전에 인터프리터가 종료될 수 있습니다.
*   인터프리터 ID를 사용하는 문제점은 참조 카운트가 "보이지 않아야" 한다는 것입니다. 이는 인터프리터의 다른 곳에서 추적되어야 하며, 이는 `PyInterpreterRef_FromCurrent()`보다 더 복잡할 가능성이 있습니다. 또한 독립적인 정수(standalone integer)가 참조 카운트를 가질 수 있다는 직관이 부족합니다.

#### Ensure / Clear 대신 Activate / Deactivate API 노출 (Exposing an Activate / Deactivate API Instead of Ensure / Clear)

이 API의 이전 논의에서 스레드 상태의 소유권 및 수명을 더 명확하게 하기 위해 API에 실제 `PyThreadState` 포인터를 제공하는 것이 제안되었습니다.

더 중요하게는, 이것이 누가 스레드 상태를 소유하는지 더 명확하게 만든다고 생각합니다. 수동으로 생성된 것은 그것을 생성한 코드에 의해 제어되며, 일단 삭제되면 다시 활성화할 수 없습니다.

이는 궁극적으로 두 가지 이유로 거부되었습니다.

*   제안된 API는 `PyGILState_Ensure()` 및 `PyGILState_Release()`와 더 가까운 사용 방식을 가지므로, 기존 코드베이스의 전환을 용이하게 합니다.
*   Cython과 같은 코드 생성기가 `PyThreadState` 포인터를 추적하는 추가적인 복잡성 없이 사용하기 훨씬 쉽습니다.

#### PyThreadState_Ensure()의 반환 값으로 PyStatus 사용 (Using PyStatus for the Return Value of PyThreadState_Ensure)

이 API의 이전 반복에서는 `PyThreadState_Ensure()`가 실패를 나타내기 위해 정수 대신 `PyStatus`를 반환했으며, 이는 오류 메시지를 제공하는 이점이 있었습니다.

이것은 오류 메시지가 그렇게 유용할지 불분명하다는 이유로 거부되었습니다. 이 API에 대해 구상된 모든 사용 사례는 Python을 호출할 수 없는 이유를 나타내는 메시지에 그다지 신경 쓰지 않을 것입니다. 따라서 API는 불필요하게 사용하기 어려워질 뿐이며, 이는 `PyGILState_Ensure()`로부터의 전환을 저해할 것입니다.

또한 `PyStatus`는 C API에서 일반적으로 사용되지 않습니다. 인터프리터 초기화와 관련된 몇몇 함수(예외를 발생시킬 수 없기 때문에)만 이를 사용하며, `PyThreadState_Ensure()`는 해당 범주에 속하지 않습니다.

### 감사의 글 (Acknowledgements)

이 PEP는 Victor Stinner, Antoine Pitrou, Da Woods, Sam Gross, Matt Page, Ronald Oussoren, Matt Wozniski, Eric Snow, Steve Dower, Petr Viktorin, Gregory P. Smith를 포함한 많은 사람들의 이전 작업, 피드백 및 논의를 기반으로 합니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain) 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.
---

### 요약 및 Python 사용에 미치는 영향

PEP 788은 Python C API에서 인터프리터 종료(finalization) 및 스레드 상태(thread state) 관리에 대한 오랜 문제들을 해결하기 위해 **`PyInterpreterRef`** 라는 새로운 개념을 도입합니다. 기존의 `PyGILState` API는 여러 가지 버그와 설계상의 문제점을 가지고 있었으며, 특히 서브 인터프리터(subinterpreters) 환경이나 비-Python 스레드(non-Python threads)에서 안전하게 Python 코드를 호출하기 어렵게 만들었습니다.

**주요 제안 내용 및 변경 사항:**

1.  **인터프리터 참조 (Interpreter References) 도입:**
    *   **강력한 인터프리터 참조 (`PyInterpreterRef`):** 인터프리터가 종료되는 것을 방지하는 참조 카운트 메커니즘을 제공합니다. C API를 호출할 때 인터프리터가 안전하게 활성 상태를 유지하도록 보장합니다.
    *   **약한 인터프리터 참조 (`PyInterpreterWeakRef`):** 인터프리터 종료를 방지하지 않지만, 필요할 때 강력한 참조로 승격될 수 있습니다. 이는 특히 비동기 콜백(asynchronous callbacks)과 같이 인터프리터의 수명에 직접적으로 영향을 미치지 않으면서 Python 코드를 실행해야 하는 경우에 유용합니다.

2.  **새로운 스레드 상태 관리 API:**
    *   **`PyThreadState_Ensure(PyInterpreterRef ref, PyThreadRef *thread)`:** 특정 `PyInterpreterRef`에 대해 스레드에 연결된 스레드 상태를 보장하여 해당 인터프리터를 안전하게 호출할 수 있도록 합니다. 기존 `PyGILState_Ensure()`의 대체제 역할을 합니다.
    *   **`PyThreadState_Release(PyThreadRef ref)`:** `PyThreadState_Ensure()` 호출을 해제하고 이전 스레드 상태를 복원합니다.

3.  **`PyGILState` API의 사용 중단 (Deprecation):**
    *   `PyGILState_Ensure()`, `PyGILState_Release()`, `PyGILState_GetThisThreadState()`, `PyGILState_Check()`와 같은 기존 `PyGILState` 함수들은 비제한 C API의 공개 헤더에서 제거될 예정입니다. 이는 이들 API가 가진 근본적인 문제점(특히 서브 인터프리터 지원 부족, 혼란스러운 동작, Free-threading 환경에서의 오해 소지) 때문입니다.
    *   안정적인 ABI(stable ABI)에서는 호환성을 위해 유지될 것이며, 즉각적인 제거 날짜는 명시되지 않았습니다.

4.  **`PyUnstable_GetDefaultInterpreterRef()`:** `PyGILState_Ensure()`에서 `PyThreadState_Ensure()`로의 전환을 돕기 위한 호환성 shim으로, 메인 인터프리터에 대한 강력한 참조를 얻는 스레드 안전한 방법을 제공합니다. 서브 인터프리터 지원이 필요 없는 경우에 유용합니다.

**도입 배경:**

*   **비-Python 스레드의 종료 시 멈춤:** `threading` 모듈로 생성되지 않은 스레드에서 Python C API를 호출할 때 인터프리터 종료 중에 스레드가 멈추거나 (hang) 충돌하는 문제가 있었습니다.
*   **`Py_IsFinalizing()`의 불충분함:** 인터프리터 종료 여부를 확인하는 `Py_IsFinalizing()` 함수가 호출 시점과 사용 시점 간의 문제로 인해 안전하지 않았습니다.
*   **데몬 스레드 문제:** 데몬 스레드가 락을 잡고 있는 동안 인터프리터 종료로 인해 멈추면 교착 상태를 유발할 수 있었습니다.
*   **`PyGILState` API의 버그 및 혼란:** `PyGILState_Ensure()`는 종료 시 충돌을 일으킬 수 있었고, "GIL"이라는 이름이 Free-threading 환경에서 오해를 불러일으켰으며, 서브 인터프리터와 함께 사용될 때 올바른 인터프리터를 추측하지 못했습니다.
*   **인터프리터 동시 할당 해제 문제:** 서브 인터프리터와 같이 수명이 짧은 인터프리터의 경우, 스레드와 인터프리터 상태 간의 동기화 부족으로 인해 Use-after-free 충돌이 발생할 위험이 있었습니다.

**실제 Python 사용에 미치는 영향:**

*   **C 확장 모듈 개발자:** 기존 `PyGILState` API를 사용하는 C 확장 모듈은 새로운 `PyInterpreterRef` 및 `PyThreadState` 기반 API로 전환해야 합니다. 이는 코드 변경을 수반하지만, 더 안정적이고 스레드 안전하며 서브 인터프리터 친화적인 코드를 작성할 수 있게 합니다. 특히 Python 외부에서 스레드를 생성하고 Python 코드를 호출하는 경우 더욱 중요해집니다.
*   **Free-threading 사용자:** Free-threading 빌드에서 "GIL"이라는 용어로 인한 혼란이 해소되고, `PyGILState_Ensure()`와 같은 API의 목적이 "GIL 확보"가 아닌 "스레드 상태 확보"임이 명확해집니다.
*   **대규모 애플리케이션 및 임베딩:** Python을 다른 네이티브 코드와 함께 임베딩하거나 대규모 비동기 애플리케이션을 개발하는 경우, 인터프리터의 수명과 스레드 상태를 명확하게 제어할 수 있게 되어 안정성이 크게 향상됩니다.
*   **서브 인터프리터 사용자:** `PyInterpreterRef`를 통해 서브 인터프리터 환경에서 스레드 상태를 올바르게 관리하고, 인터프리터가 안전하게 활성 상태를 유지하도록 보장할 수 있게 됩니다. 이는 서브 인터프리터의 활용성을 높일 것입니다.

결론적으로, PEP 788은 Python C API의 핵심적인 동시성 및 인터프리터 관리 메커니즘을 현대화하고 안정화하여, 특히 복잡한 스레딩 시나리오와 서브 인터프리터 사용 환경에서 개발자들이 더 안전하고 예측 가능한 코드를 작성할 수 있도록 돕는 중요한 제안입니다. 기존 `PyGILState` API를 사용하는 코드베이스는 점진적인 전환이 필요할 것입니다.

### 참조 구현 (Reference Implementation)

이 PEP의 참조 구현은 python/cpython#133110에서 찾을 수 있습니다.

### 미해결 문제 (Open Issues)

#### API는 어떻게 실패를 알려야 하는가? (How Should the APIs Fail?)

`PyInterpreter[Weak]Ref` API가 호출자에게 실패를 알리는 방법에 대한 의견 불일치가 약간 있습니다. 두 가지 경쟁 아이디어가 있습니다.

1.  실패를 나타내기 위해 -1을 반환하고, 성공을 나타내기 위해 0을 반환합니다. 성공 시 함수는 인수로 전달된 `PyInterpreter[Weak]Ref` 포인터에 할당합니다.
2.  `PyInterpreter[Weak]Ref`를 직접 반환하며, 0 값은 `NULL`과 동일하게 실패를 나타냅니다.

현재 PEP는 후자를 따릅니다.

### 거부된 아이디어 (Rejected Ideas)

#### 비-데몬 스레드 상태 (Non-daemon Thread States)

이 PEP의 이전 반복에서는 인터프리터 참조가 인터프리터의 속성이 아니라 스레드 상태의 속성이었습니다. 이는 `PyThreadState_Ensure()`가 강력한 인터프리터 참조를 "훔치고", `PyThreadState_Release()` 호출 시 해제된다는 것을 의미했습니다. 인터프리터에 대한 참조를 보유하는 스레드 상태는 "비-데몬 스레드 상태"로 알려져 있었습니다. 처음에는 참조의 수명 관리를 사용자 대신 스레드로 전환하여 일부 상용구(boilerplate)를 제거했기 때문에 개선된 것처럼 보였습니다.

그러나 이는 결국 제안을 훨씬 더 복잡하게 만들었고 제안의 목표를 저해했습니다.

가장 중요하게는 비-데몬 스레드 상태가 데몬 스레드를 문제의 원인으로 너무 강조하여 PEP의 명확성을 해쳤습니다. 또한 "비-데몬"이라는 문구는 추가적인 혼란을 야기했는데, 비-데몬 Python 스레드는 명시적으로 조인되는 반면, 비-데몬 C 스레드는 참조를 해제할 때까지 기다릴 뿐이기 때문입니다. 많은 경우 인터프리터 참조는 단일 스레드 상태보다 오래 지속되어야 합니다. `PyThreadState_Ensure()`가 비-데몬 스레드 상태로 참조를 "훔치지" 않는 경우 인터프리터 참조의 소유권 스토리를 모호하게 만들어 더 혼란스러운 API로 이어질 수 있었습니다.

#### 기존 구조를 참조 카운트로 개조 (Retrofiting the Existing Structures with Reference Counts)

##### 참조 카운팅을 위한 인터프리터 상태 포인터 (Interpreter-State Pointers for Reference Counting)

원래 이 PEP는 `PyInterpreterState_Hold()` 및 `PyInterpreterState_Release()`를 통해 인터프리터에 대한 강력한 참조를 관리하고, 인터프리터 ID(약한 참조)를 강력한 참조로 변환하는 `PyInterpreterState_Lookup()`을 명시했습니다.

결국 이는 불필요하게 혼란스럽다는 이유로 거부되었습니다. 인터프리터 상태는 이전에 참조 카운트가 없었으므로, 무엇이 강력한 참조인지에 대한 직관이 부족했습니다. `PyInterpreterRef` 및 `PyInterpreterWeakRef` 타입이 훨씬 더 명확하게 보입니다.

##### 참조 카운팅을 위한 인터프리터 ID (Interpreter IDs for Reference Counting)

이 API의 일부 반복에서는 `PyInterpreterState *interp` 대신 `int64_t interp_id` 매개변수를 사용했습니다. 인터프리터 ID는 동시에 삭제될 수 없고 Use-after-free 위반을 일으키지 않기 때문입니다. 이 PEP의 참조 카운팅 API는 어쨌든 이 문제를 회피하지만, 인터프리터 ID는 마법(magic)이 덜 필요하다는 장점이 있습니다.

*   거의 모든 기존 인터프리터 API는 인터프리터 ID가 아닌 `PyInterpreterState` 포인터를 반환합니다. `PyThreadState_GetInterpreter()`와 같은 함수는 `PyInterpreterState_GetID()`에 대한 혼란스러운 호출을 수반해야 할 것입니다.
*   스레드는 일반적으로 `int64_t arg`가 아닌 `void *arg` 매개변수를 받습니다. 따라서 참조를 전달하는 것이 사용자에게 훨씬 적은 상용구를 필요로 합니다. 추가 구조 정의 또는 힙 할당이 인터프리터 ID를 저장하는 데 필요하기 때문입니다. 이는 `void *`가 `int64_t`에 비해 너무 작은 32비트 시스템에서 특히 문제입니다.
*   유용성을 유지하려면 인터프리터 ID API는 여전히 참조 카운트를 유지해야 합니다. 그렇지 않으면 비-Python 스레드가 연결할 기회를 얻기 전에 인터프리터가 종료될 수 있습니다.
*   인터프리터 ID를 사용하는 문제점은 참조 카운트가 "보이지 않아야" 한다는 것입니다. 이는 인터프리터의 다른 곳에서 추적되어야 하며, 이는 `PyInterpreterRef_FromCurrent()`보다 더 복잡할 가능성이 있습니다. 또한 독립적인 정수(standalone integer)가 참조 카운트를 가질 수 있다는 직관이 부족합니다.

#### Ensure / Clear 대신 Activate / Deactivate API 노출 (Exposing an Activate / Deactivate API Instead of Ensure / Clear)

이 API의 이전 논의에서 스레드 상태의 소유권 및 수명을 더 명확하게 하기 위해 API에 실제 `PyThreadState` 포인터를 제공하는 것이 제안되었습니다.

더 중요하게는, 이것이 누가 스레드 상태를 소유하는지 더 명확하게 만든다고 생각합니다. 수동으로 생성된 것은 그것을 생성한 코드에 의해 제어되며, 일단 삭제되면 다시 활성화할 수 없습니다.

이는 궁극적으로 두 가지 이유로 거부되었습니다.

*   제안된 API는 `PyGILState_Ensure()` 및 `PyGILState_Release()`와 더 가까운 사용 방식을 가지므로, 기존 코드베이스의 전환을 용이하게 합니다.
*   Cython과 같은 코드 생성기가 `PyThreadState` 포인터를 추적하는 추가적인 복잡성 없이 사용하기 훨씬 쉽습니다.

#### PyThreadState_Ensure()의 반환 값으로 PyStatus 사용 (Using PyStatus for the Return Value of PyThreadState_Ensure)

이 API의 이전 반복에서는 `PyThreadState_Ensure()`가 실패를 나타내기 위해 정수 대신 `PyStatus`를 반환했으며, 이는 오류 메시지를 제공하는 이점이 있었습니다.

이것은 오류 메시지가 그렇게 유용할지 불분명하다는 이유로 거부되었습니다. 이 API에 대해 구상된 모든 사용 사례는 Python을 호출할 수 없는 이유를 나타내는 메시지에 그다지 신경 쓰지 않을 것입니다. 따라서 API는 불필요하게 사용하기 어려워질 뿐이며, 이는 `PyGILState_Ensure()`로부터의 전환을 저해할 것입니다.

또한 `PyStatus`는 C API에서 일반적으로 사용되지 않습니다. 인터프리터 초기화와 관련된 몇몇 함수(예외를 발생시킬 수 없기 때문에)만 이를 사용하며, `PyThreadState_Ensure()`는 해당 범주에 속하지 않습니다.

### 감사의 글 (Acknowledgements)

이 PEP는 Victor Stinner, Antoine Pitrou, Da Woods, Sam Gross, Matt Page, Ronald Oussoren, Matt Wozniski, Eric Snow, Steve Dower, Petr Viktorin, Gregory P. Smith를 포함한 많은 사람들의 이전 작업, 피드백 및 논의를 기반으로 합니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain) 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.
---

### 요약 및 Python 사용에 미치는 영향

PEP 788은 Python C API에서 인터프리터 종료(finalization) 및 스레드 상태(thread state) 관리에 대한 오랜 문제들을 해결하기 위해 **`PyInterpreterRef`** 라는 새로운 개념을 도입합니다. 기존의 `PyGILState` API는 여러 가지 버그와 설계상의 문제점을 가지고 있었으며, 특히 서브 인터프리터(subinterpreters) 환경이나 비-Python 스레드(non-Python threads)에서 안전하게 Python 코드를 호출하기 어렵게 만들었습니다.

**주요 제안 내용 및 변경 사항:**

1.  **인터프리터 참조 (Interpreter References) 도입:**
    *   **강력한 인터프리터 참조 (`PyInterpreterRef`):** 인터프리터가 종료되는 것을 방지하는 참조 카운트 메커니즘을 제공합니다. C API를 호출할 때 인터프리터가 안전하게 활성 상태를 유지하도록 보장합니다.
    *   **약한 인터프리터 참조 (`PyInterpreterWeakRef`):** 인터프리터 종료를 방지하지 않지만, 필요할 때 강력한 참조로 승격될 수 있습니다. 이는 특히 비동기 콜백(asynchronous callbacks)과 같이 인터프리터의 수명에 직접적으로 영향을 미치지 않으면서 Python 코드를 실행해야 하는 경우에 유용합니다.

2.  **새로운 스레드 상태 관리 API:**
    *   **`PyThreadState_Ensure(PyInterpreterRef ref, PyThreadRef *thread)`:** 특정 `PyInterpreterRef`에 대해 스레드에 연결된 스레드 상태를 보장하여 해당 인터프리터를 안전하게 호출할 수 있도록 합니다. 기존 `PyGILState_Ensure()`의 대체제 역할을 합니다.
    *   **`PyThreadState_Release(PyThreadRef ref)`:** `PyThreadState_Ensure()` 호출을 해제하고 이전 스레드 상태를 복원합니다.

3.  **`PyGILState` API의 사용 중단 (Deprecation):**
    *   `PyGILState_Ensure()`, `PyGILState_Release()`, `PyGILState_GetThisThreadState()`, `PyGILState_Check()`와 같은 기존 `PyGILState` 함수들은 비제한 C API의 공개 헤더에서 제거될 예정입니다. 이는 이들 API가 가진 근본적인 문제점(특히 서브 인터프리터 지원 부족, 혼란스러운 동작, Free-threading 환경에서의 오해 소지) 때문입니다.
    *   안정적인 ABI(stable ABI)에서는 호환성을 위해 유지될 것이며, 즉각적인 제거 날짜는 명시되지 않았습니다.

4.  **`PyUnstable_GetDefaultInterpreterRef()`:** `PyGILState_Ensure()`에서 `PyThreadState_Ensure()`로의 전환을 돕기 위한 호환성 shim으로, 메인 인터프리터에 대한 강력한 참조를 얻는 스레드 안전한 방법을 제공합니다. 서브 인터프리터 지원이 필요 없는 경우에 유용합니다.

**도입 배경:**

*   **비-Python 스레드의 종료 시 멈춤:** `threading` 모듈로 생성되지 않은 스레드에서 Python C API를 호출할 때 인터프리터 종료 중에 스레드가 멈추거나 (hang) 충돌하는 문제가 있었습니다.
*   **`Py_IsFinalizing()`의 불충분함:** 인터프리터 종료 여부를 확인하는 `Py_IsFinalizing()` 함수가 호출 시점과 사용 시점 간의 문제로 인해 안전하지 않았습니다.
*   **데몬 스레드 문제:** 데몬 스레드가 락을 잡고 있는 동안 인터프리터 종료로 인해 멈추면 교착 상태를 유발할 수 있었습니다.
*   **`PyGILState` API의 버그 및 혼란:** `PyGILState_Ensure()`는 종료 시 충돌을 일으킬 수 있었고, "GIL"이라는 이름이 Free-threading 환경에서 오해를 불러일으켰으며, 서브 인터프리터와 함께 사용될 때 올바른 인터프리터를 추측하지 못했습니다.
*   **인터프리터 동시 할당 해제 문제:** 서브 인터프리터와 같이 수명이 짧은 인터프리터의 경우, 스레드와 인터프리터 상태 간의 동기화 부족으로 인해 Use-after-free 충돌이 발생할 위험이 있었습니다.

**실제 Python 사용에 미치는 영향:**

*   **C 확장 모듈 개발자:** 기존 `PyGILState` API를 사용하는 C 확장 모듈은 새로운 `PyInterpreterRef` 및 `PyThreadState` 기반 API로 전환해야 합니다. 이는 코드 변경을 수반하지만, 더 안정적이고 스레드 안전하며 서브 인터프리터 친화적인 코드를 작성할 수 있게 합니다. 특히 Python 외부에서 스레드를 생성하고 Python 코드를 호출하는 경우 더욱 중요해집니다.
*   **Free-threading 사용자:** Free-threading 빌드에서 "GIL"이라는 용어로 인한 혼란이 해소되고, `PyGILState_Ensure()`와 같은 API의 목적이 "GIL 확보"가 아닌 "스레드 상태 확보"임이 명확해집니다.
*   **대규모 애플리케이션 및 임베딩:** Python을 다른 네이티브 코드와 함께 임베딩하거나 대규모 비동기 애플리케이션을 개발하는 경우, 인터프리터의 수명과 스레드 상태를 명확하게 제어할 수 있게 되어 안정성이 크게 향상됩니다.
*   **서브 인터프리터 사용자:** `PyInterpreterRef`를 통해 서브 인터프리터 환경에서 스레드 상태를 올바르게 관리하고, 인터프리터가 안전하게 활성 상태를 유지하도록 보장할 수 있게 됩니다. 이는 서브 인터프리터의 활용성을 높일 것입니다.

결론적으로, PEP 788은 Python C API의 핵심적인 동시성 및 인터프리터 관리 메커니즘을 현대화하고 안정화하여, 특히 복잡한 스레딩 시나리오와 서브 인터프리터 사용 환경에서 개발자들이 더 안전하고 예측 가능한 코드를 작성할 수 있도록 돕는 중요한 제안입니다. 기존 `PyGILState` API를 사용하는 코드베이스는 점진적인 전환이 필요할 것입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.