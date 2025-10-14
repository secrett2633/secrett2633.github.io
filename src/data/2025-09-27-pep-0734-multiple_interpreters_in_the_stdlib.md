---
title: "[Final] PEP 734 - Multiple Interpreters in the Stdlib"
excerpt: "Python Enhancement Proposal 734: 'Multiple Interpreters in the Stdlib'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/734/
toc: true
toc_sticky: true
date: 2025-09-27 13:25:59+0900
last_modified_at: 2025-09-27 13:25:59+0900
published: true
---
> **원문 링크:** [PEP 734 - Multiple Interpreters in the Stdlib](https://peps.python.org/pep-0734/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 06-Nov-2023


# PEP 734 – Stdlib 내 다중 인터프리터 (Multiple Interpreters in the Stdlib)

*이 문서는 역사적인 기록입니다. 최신 공식 문서는 `concurrent.interpreters`에서 찾을 수 있습니다.*

## 요약 (Abstract)
이 PEP는 현재 프로세스 내에서 여러 인터프리터를 조사하고, 생성하며, 코드를 실행하는 것을 지원하기 위해 새로운 모듈인 `interpreters`를 추가할 것을 제안합니다. 이 모듈에는 기본 인터프리터를 나타내는 `Interpreter` 객체가 포함됩니다. 또한, 인터프리터 간 통신을 위한 기본적인 `Queue` 클래스도 제공할 것입니다. 마지막으로, `interpreters` 모듈을 기반으로 하는 새로운 `concurrent.futures.InterpreterPoolExecutor`가 추가될 예정입니다.

## 서론 (Introduction)

근본적으로 "인터프리터"는 파이썬 스레드가 공유해야 하는 (거의) 모든 런타임 상태의 집합을 의미합니다. 먼저 스레드에 대해 살펴본 후 인터프리터로 돌아가겠습니다.

### 스레드 및 스레드 상태 (Threads and Thread States)
파이썬 프로세스에는 파이썬 코드를 실행하거나 C API와 상호작용하는 하나 이상의 OS 스레드가 있습니다. 각 스레드는 고유한 스레드 상태(`PyThreadState`)를 사용하여 CPython 런타임과 상호작용하며, 이 스레드 상태는 해당 스레드에 고유한 모든 런타임 상태를 보유합니다. 또한 여러 OS 스레드 간에 공유되는 런타임 상태도 있습니다.

어떤 OS 스레드라도 다른 OS 스레드가 현재 사용 중이거나 사용했던 스레드 상태가 아니라면, 현재 사용 중인 스레드 상태를 전환할 수 있습니다. 이 "현재" 스레드 상태는 런타임에 스레드 로컬 변수에 저장되며, `PyThreadState_Get()`을 통해 명시적으로 조회할 수 있습니다. 초기 ("메인") OS 스레드와 `threading.Thread` 객체에 대해서는 자동으로 설정됩니다. C API에서는 `PyThreadState_Swap()`에 의해 설정(및 해제)될 수 있으며, `PyGILState_Ensure()`에 의해 설정될 수 있습니다. 대부분의 C API는 현재 스레드 상태가 암시적으로 조회되거나 인수로 전달되어야 한다고 요구합니다.

OS 스레드와 스레드 상태의 관계는 일대다입니다. 각 스레드 상태는 최대 하나의 OS 스레드와 연결되며 해당 스레드 ID를 기록합니다. 스레드 상태는 두 개 이상의 OS 스레드에 사용되지 않습니다. 그러나 반대 방향으로는 하나의 OS 스레드가 여러 스레드 상태와 연결될 수 있지만, 다시 말하지만 하나만 현재 상태일 수 있습니다.

하나의 OS 스레드에 둘 이상의 스레드 상태가 있을 때, `PyThreadState_Swap()`은 해당 OS 스레드에서 스레드 상태를 전환하는 데 사용되며, 요청된 스레드 상태가 현재 상태가 됩니다. 이전 스레드 상태를 사용하던 스레드에서 실행 중이던 모든 것은 해당 스레드 상태가 다시 스왑될 때까지 효과적으로 일시 중지됩니다.

### 인터프리터 상태 (Interpreter States)
앞서 언급했듯이, 여러 OS 스레드가 공유하는 일부 런타임 상태가 있습니다. 그 중 일부는 `sys` 모듈을 통해 노출되지만, 많은 부분은 내부적으로 사용되며 명시적으로 노출되지 않거나 C API를 통해서만 노출됩니다.

이 공유 상태를 인터프리터 상태(`PyInterpreterState`)라고 부릅니다. 여기서는 때때로 "인터프리터"라고만 부르기도 하지만, 이는 파이썬 실행 파일, 파이썬 구현, 그리고 바이트코드 인터프리터(예: `exec()` / `eval()`)를 지칭하는 데도 사용됩니다.

CPython은 1.5 버전(1997년)부터 동일한 프로세스 내에서 여러 인터프리터(즉, "하위 인터프리터(subinterpreters)")를 지원해 왔습니다. 이 기능은 C API를 통해 사용할 수 있었습니다.

### 인터프리터와 스레드 (Interpreters and Threads)
스레드 상태는 OS 스레드와 프로세스가 (높은 수준에서) 관련되는 방식과 거의 동일한 방식으로 인터프리터 상태와 관련됩니다. 우선, 그 관계는 일대다입니다. 스레드 상태는 단일 인터프리터에 속하며 (해당 인터프리터에 대한 포인터를 저장합니다). 이 스레드 상태는 다른 인터프리터에 사용되지 않습니다. 그러나 반대 방향으로는 인터프리터에 0개 이상의 스레드 상태가 연결될 수 있습니다. 인터프리터는 해당 스레드 상태 중 하나가 현재 상태인 OS 스레드에서만 활성 상태로 간주됩니다.

인터프리터는 `Py_NewInterpreterFromConfig()` (또는 `Py_NewInterpreter()`, 이는 `Py_NewInterpreterFromConfig()`의 가벼운 래퍼임)를 사용하여 C API를 통해 생성됩니다. 이 함수는 다음을 수행합니다.
*   새 인터프리터 상태 생성
*   새 스레드 상태 생성
*   스레드 상태를 현재 상태로 설정 (인터프리터 초기화를 위해 현재 `tstate`가 필요함)
*   해당 스레드 상태를 사용하여 인터프리터 상태 초기화
*   스레드 상태 반환 (여전히 현재 상태)

반환된 스레드 상태는 즉시 폐기될 수 있다는 점에 유의하십시오. 인터프리터가 실제로 사용될 의도가 있는 경우를 제외하고는 인터프리터에 스레드 상태가 있어야 한다는 요구 사항은 없습니다. 그 시점에는 현재 OS 스레드에서 활성화되어야 합니다.

현재 OS 스레드에서 기존 인터프리터를 활성화하려면 C API 사용자는 먼저 해당 인터프리터에 해당 스레드 상태가 있는지 확인해야 합니다. 그런 다음 해당 스레드 상태를 사용하여 `PyThreadState_Swap()`이 정상적으로 호출됩니다. 다른 인터프리터에 대한 스레드 상태가 이미 현재 상태였다면 정상적으로 스왑 아웃되고, OS 스레드에서 해당 인터프리터의 실행은 다시 스왑될 때까지 효과적으로 일시 중지됩니다.

일단 인터프리터가 현재 OS 스레드에서 그렇게 활성화되면, 스레드는 `PyEval_EvalCode()` (즉, `exec()`)와 같은 C API를 호출할 수 있습니다. 이는 현재 스레드 상태를 런타임 컨텍스트로 사용하여 작동합니다.

### "메인" 인터프리터 (The “Main” Interpreter)
파이썬 프로세스가 시작되면 현재 OS 스레드에 대해 단일 스레드 상태를 가진 단일 인터프리터 상태("메인" 인터프리터)를 생성합니다. 그런 다음 파이썬 런타임은 이를 사용하여 초기화됩니다.

초기화 후, 스크립트 또는 모듈 또는 REPL은 이를 사용하여 실행됩니다. 이 실행은 인터프리터의 `__main__` 모듈에서 발생합니다.

프로세스가 요청된 파이썬 코드 또는 REPL 실행을 메인 OS 스레드에서 완료하면, 메인 인터프리터를 사용하여 해당 스레드에서 파이썬 런타임이 최종화됩니다.

런타임 최종화는 메인 인터프리터든 하위 인터프리터든 여전히 실행 중인 파이썬 스레드에 미미하고 간접적인 영향만 미칩니다. 이는 곧 모든 비데몬(non-daemon) 파이썬 스레드가 완료될 때까지 무기한으로 대기하기 때문입니다.

C API를 쿼리할 수는 있지만, `threading._register_atexit()`을 사용하여 등록되었을 수 있는 "atexit" 함수를 제외하고는 어떤 파이썬 스레드도 최종화가 시작되었다는 직접적인 알림을 받는 메커니즘은 없습니다.

남아있는 하위 인터프리터는 나중에 자체적으로 최종화되지만, 그 시점에는 어떤 OS 스레드에서도 현재 상태가 아닙니다.

### 인터프리터 격리 (Interpreter Isolation)
CPython의 인터프리터는 서로 엄격하게 격리되도록 설계되었습니다. 이는 인터프리터가 객체를 공유하지 않음을 의미합니다 (불멸(immortal), 불변(immutable) 빌트인 객체와 같은 매우 특정한 경우는 제외). 각 인터프리터는 자체 모듈(`sys.modules`), 클래스, 함수 및 변수를 가집니다. 두 인터프리터가 동일한 클래스를 정의하더라도 각각 자체 복사본을 가집니다. C의 상태, 확장 모듈의 상태도 마찬가지입니다. CPython C API 문서는 더 자세히 설명합니다.

특히, 인터프리터가 항상 공유하는 일부 프로세스 전역 상태가 있으며, 일부는 변경 가능하고 일부는 변경 불가능합니다. 불변 상태를 공유하는 것은 몇 가지 문제를 일으키지 않으며 (주로 성능) 일부 이점을 제공합니다. 그러나 모든 공유 가능한 변경 가능 상태는 특별한 관리가 필요하며, 특히 스레드 안전성(thread-safety)에 있어서는 OS가 일부를 처리합니다.

**변경 가능한 공유 상태 (Mutable):**
*   파일 디스크립터(file descriptors)
*   하위 수준 환경 변수(low-level env vars)
*   프로세스 메모리 (단, 할당자는 격리됨)
*   인터프리터 목록

**변경 불가능한 공유 상태 (Immutable):**
*   내장 타입 (예: `dict`, `bytes`)
*   싱글톤 (예: `None`)
*   내장/확장/고정(frozen) 모듈의 기본 정적 모듈 데이터 (예: 함수)

### 기존 실행 구성 요소 (Existing Execution Components)
하위 인터프리터에서 코드가 실행되는 방식을 이해하는 데 도움이 될 수 있는 파이썬의 여러 기존 부분이 있습니다.

CPython에서 각 구성 요소는 다음 C API 함수(또는 변형) 중 하나를 중심으로 구축됩니다.
*   `PyEval_EvalCode()`: 주어진 코드 객체로 바이트코드 인터프리터를 실행합니다.
*   `PyRun_String()`: 컴파일 + `PyEval_EvalCode()`
*   `PyRun_File()`: 읽기 + 컴파일 + `PyEval_EvalCode()`
*   `PyRun_InteractiveOneObject()`: 컴파일 + `PyEval_EvalCode()`
*   `PyObject_Call()`: `PyEval_EvalCode()`를 호출합니다.

#### `builtins.exec()`
내장 함수 `exec()`는 파이썬 코드를 실행하는 데 사용될 수 있습니다. 이는 기본적으로 C API 함수 `PyRun_String()` 및 `PyEval_EvalCode()`의 래퍼입니다.

내장 함수 `exec()`의 몇 가지 관련 특성은 다음과 같습니다.
*   현재 OS 스레드에서 실행되며, `exec()`가 완료될 때까지 해당 스레드에서 실행 중이던 모든 것을 일시 중지합니다. 다른 OS 스레드는 영향을 받지 않습니다. (현재 파이썬 스레드의 일시 중지를 피하려면 `threading.Thread`에서 `exec()`를 실행하십시오.)
*   추가 스레드를 시작할 수 있으며, 이는 `exec()`를 중단시키지 않습니다.
*   "globals" 네임스페이스 (및 "locals" 네임스페이스)에 대해 실행됩니다. 모듈 수준에서 `exec()`는 기본적으로 현재 모듈의 `__dict__` (즉, `globals()`)를 사용합니다. `exec()`는 해당 네임스페이스를 있는 그대로 사용하며, 실행 전후에 지우지 않습니다.
*   실행된 코드에서 포착되지 않은 예외를 전파합니다. 예외는 원래 `exec()`를 호출한 파이썬 스레드의 `exec()` 호출에서 발생합니다.

#### 명령줄 (Command-line)
`python` CLI는 파이썬 코드를 실행하는 여러 방법을 제공합니다. 각 경우에 해당하는 C API 호출에 매핑됩니다.
*   `<no args>`, `-i` - REPL 실행 (`PyRun_InteractiveOneObject()`)
*   `<filename>` - 스크립트 실행 (`PyRun_File()`)
*   `-c <code>` - 주어진 파이썬 코드 실행 (`PyRun_String()`)
*   `-m module` - 모듈을 스크립트로 실행 (`runpy._run_module_as_main()`을 통한 `PyEval_EvalCode()`)

각 경우에 이는 메인 인터프리터의 `__main__` 모듈 최상위 수준에서 `exec()`를 실행하는 변형입니다.

#### `threading.Thread`
파이썬 스레드가 시작되면 `PyObject_Call()`을 사용하여 새로운 스레드 상태로 "target" 함수를 실행합니다. `globals` 네임스페이스는 `func.__globals__`에서 오며, 포착되지 않은 예외는 폐기됩니다.

## 동기 (Motivation)
`interpreters` 모듈은 다중 인터프리터 기능에 대한 고수준 인터페이스를 제공할 것입니다. 목표는 CPython의 기존 다중 인터프리터 기능을 파이썬 코드에서 더 쉽게 접근할 수 있도록 하는 것입니다. CPython이 인터프리터당 GIL (PEP 684)을 갖게 되었고 사람들이 다중 인터프리터 사용에 더 많은 관심을 가지게 된 지금, 이 제안은 특히 중요합니다.

stdlib 모듈이 없으면, 사용자들은 C API에만 국한되어 다중 인터프리터를 시도하고 활용할 수 있는 정도가 제한됩니다.

이 모듈은 인터프리터 간 통신을 위한 기본적인 메커니즘을 포함할 것입니다. 이러한 메커니즘이 없으면 다중 인터프리터는 훨씬 덜 유용한 기능이 됩니다.

## 명세 (Specification)

`interpreters` 모듈은 다음을 제공할 것입니다.
*   기존 다중 인터프리터 지원을 노출합니다.
*   인터프리터 간 통신을 위한 기본적인 메커니즘을 도입합니다.

이 모듈은 새로운 저수준 `_interpreters` 모듈을 래핑할 것입니다 (`threading` 모듈과 동일한 방식). 그러나 이 저수준 API는 공개 사용을 위한 것이 아니므로 이 제안의 일부가 아닙니다.

### 인터프리터 사용 (Using Interpreters)
이 모듈은 다음 함수들을 정의합니다.

*   `get_current() -> Interpreter`: 현재 실행 중인 인터프리터에 대한 `Interpreter` 객체를 반환합니다.
*   `list_all() -> list[Interpreter]`: 현재 어떤 OS 스레드에서 실행 중이든 아니든, 모든 기존 인터프리터에 대한 `Interpreter` 객체를 반환합니다.
*   `create() -> Interpreter`: 새 인터프리터를 생성하고 해당 `Interpreter` 객체를 반환합니다. 인터프리터는 자체적으로 아무것도 하지 않으며 어떤 OS 스레드에도 본질적으로 묶여 있지 않습니다. 이는 인터프리터에서 실제로 무언가 실행될 때 (예: `Interpreter.exec()`)만 발생하며, 실행 중일 때만 해당됩니다. 인터프리터는 사용 준비가 된 스레드 상태를 가질 수도 있고 가지지 않을 수도 있지만, 이는 엄격하게 내부 구현 세부 사항입니다.

### `Interpreter` 객체 (Interpreter Objects)
`interpreters.Interpreter` 객체는 해당 고유 ID를 가진 인터프리터(`PyInterpreterState`)를 나타냅니다. 주어진 인터프리터에 대해 하나의 객체만 존재합니다.

인터프리터가 `interpreters.create()`로 생성된 경우, 해당 ID를 가진 모든 `Interpreter` 객체가 (모든 인터프리터에서) 삭제되는 즉시 파괴됩니다.

`Interpreter` 객체는 `interpreters.create()`로 생성된 것 외의 다른 인터프리터를 나타낼 수도 있습니다. 예를 들어, 파이썬 런타임 초기화 시 생성되는 메인 인터프리터와 `Py_NewInterpreter()`를 사용하여 C-API를 통해 생성되는 인터프리터가 있습니다. 이러한 `Interpreter` 객체는 `Interpreter.exec()` 등을 통해 해당 인터프리터와 상호작용할 수 없습니다 (향후 이 제한을 완화할 수 있습니다).

**속성 및 메서드 (Attributes and methods):**

*   `id` (읽기 전용): 이 `Interpreter` 인스턴스가 나타내는 인터프리터를 식별하는 0 이상의 `int` 값입니다. 개념적으로 프로세스 ID와 유사합니다.
*   `__hash__()`: 인터프리터의 `id` 해시를 반환합니다. 이는 ID의 정수 값의 해시와 동일합니다.
*   `is_running() -> bool`: 인터프리터가 현재 `__main__` 모듈에서 코드를 실행 중이면 `True`를 반환합니다. 이는 서브 스레드를 제외합니다. OS 스레드가 인터프리터의 `__main__` 모듈에서 스크립트(코드)를 실행 중인지 여부만 나타냅니다. 기본적으로 `Interpreter.exec()`가 어떤 OS 스레드에서 실행 중인지 여부를 의미합니다. 서브 스레드에서 실행되는 코드는 무시됩니다.
*   `prepare_main(**kwargs)`: 인터프리터의 `__main__` 모듈에 하나 이상의 객체를 바인딩합니다. 키워드 인수 이름은 속성 이름으로 사용됩니다. 대부분의 객체에 대해 복사본이 인터프리터에 바인딩되며, 중간에 `pickle`이 사용됩니다. `memoryview`와 같은 일부 객체의 경우 기본 데이터는 인터프리터 간에 공유됩니다. Shareable Objects를 참조하십시오. `prepare_main()`은 인터프리터에서 코드를 실행하기 전에 `globals`를 초기화하는 데 유용합니다.
*   `exec(code, /)`: 인터프리터의 `__main__` 모듈을 사용하여 인터프리터(현재 OS 스레드)에서 주어진 소스 코드를 실행합니다. 아무것도 반환하지 않습니다. 이는 기본적으로 현재 OS 스레드에서 이 인터프리터로 전환한 다음, 이 인터프리터의 `__main__` 모듈의 `__dict__`를 `globals` 및 `locals`로 사용하여 내장 함수 `exec()`를 호출하는 것과 동일합니다. 현재 OS 스레드에서 실행 중인 코드(다른 인터프리터)는 `Interpreter.exec()`가 완료될 때까지 효과적으로 일시 중지됩니다. 일시 중지를 피하려면 새 `threading.Thread`를 생성하고 그 안에서 `Interpreter.exec()`를 호출하십시오 ( `Interpreter.call_in_thread()`가 하는 것처럼). `Interpreter.exec()`는 인터프리터의 상태나 `__main__` 모듈을 실행 전후에 재설정하지 않으므로, 각 연속 호출은 이전 호출이 중단된 지점에서 계속됩니다. 이는 인터프리터를 초기화하는 일부 코드(예: 임포트)를 실행한 다음 나중에 반복 작업을 수행하는 데 유용할 수 있습니다. 포착되지 않은 예외가 발생하면 `ExecutionFailed`로 호출자 인터프리터로 전파됩니다. 호출된 인터프리터에 상대적으로 생성된 원래 예외의 전체 오류 표시는 전파된 `ExecutionFailed`에 보존됩니다. 여기에는 구문 오류 세부 정보 및 연쇄 예외와 같은 모든 추가 정보가 포함된 전체 트레이스백이 포함됩니다. `ExecutionFailed`가 포착되지 않으면, 마치 전파된 예외가 메인 인터프리터에서 발생하여 포착되지 않은 것처럼 전체 오류 표시가 나타납니다. 전체 트레이스백을 갖는 것은 디버깅에 특히 유용합니다. 예외 전파를 원하지 않는다면 `Interpreter.exec()`에 전달된 코드 주변에 명시적인 `try-except`를 사용해야 합니다. 마찬가지로, 예외의 특정 정보에 의존하는 오류 처리는 주어진 코드 주변에 명시적인 `try-except`를 사용해야 합니다. 왜냐하면 `ExecutionFailed`는 해당 정보를 보존하지 않기 때문입니다.
*   `call(callable, /)`: 인터프리터에서 호출 가능(callable) 객체를 호출합니다. 반환 값은 버려집니다. 호출 가능 객체가 예외를 발생시키면 `Interpreter.exec()`와 동일한 방식으로 `ExecutionFailed` 예외로 전파됩니다. 현재로서는 일반 함수만 지원되며, 인수가 없고 셀 변수가 없는 함수만 지원됩니다. 자유 전역 변수(Free globals)는 대상 인터프리터의 `__main__` 모듈에 대해 해결됩니다. 향후에는 인수, 클로저 및 더 다양한 호출 가능 객체에 대한 지원을 추가할 수 있습니다(적어도 부분적으로는 `pickle`을 통해). 반환 값을 버리지 않는 것도 고려할 수 있습니다. 초기 제한 사항은 모듈의 기본 기능을 사용자에게 더 빨리 제공하기 위한 것입니다.
*   `call_in_thread(callable, /) -> threading.Thread`: 본질적으로 새로운 스레드에서 `Interpreter.call()`을 적용합니다. 반환 값은 버려지고 예외는 전파되지 않습니다. `call_in_thread()`는 대략 다음 코드와 동일합니다.
    ```python
    def task():
        interp.call(func)
    t = threading.Thread(target=task)
    t.start()
    ```
*   `close()`: 기본 인터프리터를 파괴합니다.

### 인터프리터 간 통신 (Communicating Between Interpreters)
이 모듈은 특수 큐를 통해 기본적인 통신 메커니즘을 도입합니다.

`interpreters.Queue` 객체가 있지만, 이는 실제 데이터 구조를 프록시(proxy)할 뿐입니다: 어떤 인터프리터 외부에도 존재하는 무제한 FIFO 큐입니다. 이 큐는 인터프리터 격리를 위반하지 않고 인터프리터 간에 객체 데이터를 안전하게 전달하기 위한 특별한 조치를 취합니다. 여기에는 스레드 안전성(thread-safety)도 포함됩니다.

파이썬의 다른 큐와 마찬가지로, 각 "put"에 대해 객체가 뒤에 추가되고 각 "get"은 앞에서 다음 객체를 가져옵니다. 추가된 모든 객체는 푸시된 순서대로 가져와집니다.

`pickle`될 수 있는 모든 객체는 `interpreters.Queue`를 통해 전송될 수 있습니다.

실제 객체가 전송되는 것이 아니라, 기본 데이터가 전송된다는 점에 유의하십시오. 결과 객체는 원본과 엄격하게 동일합니다. 대부분의 객체에 대해 기본 데이터는 직렬화됩니다(예: `pickle`됨). `memoryview`와 같은 몇 가지 경우에서는 기본 데이터가 직렬화 없이 전송(및 공유)됩니다. Shareable Objects를 참조하십시오.

이 모듈은 다음 함수를 정의합니다.

*   `create_queue(maxsize=0) -> Queue`: 새 큐를 생성합니다. `maxsize`가 0 또는 음수이면 큐는 무제한입니다.

### `Queue` 객체 (Queue Objects)
`interpreters.Queue` 객체는 `interpreters` 모듈이 노출하는 기본 크로스-인터프리터-안전 큐(cross-interpreter-safe queues)의 프록시 역할을 합니다. 각 `Queue` 객체는 해당 고유 ID를 가진 큐를 나타냅니다. 주어진 큐에 대해 하나의 객체만 존재합니다.

`Queue`는 `task_done()` 및 `join()`을 제외한 `queue.Queue`의 모든 메서드를 구현하므로 `asyncio.Queue` 및 `multiprocessing.Queue`와 유사합니다.

**속성 및 메서드 (Attributes and methods):**

*   `id` (읽기 전용): 해당 크로스-인터프리터 큐를 식별하는 0 이상의 `int` 값입니다. 개념적으로 파이프에 사용되는 파일 디스크립터와 유사합니다.
*   `maxsize` (읽기 전용): 큐에 허용되는 항목 수입니다. 0은 "무제한"을 의미합니다.
*   `__hash__()`: 큐의 `id` 해시를 반환합니다. 이는 ID의 정수 값의 해시와 동일합니다.
*   `empty()`: 큐가 비어 있으면 `True`를, 그렇지 않으면 `False`를 반환합니다. 이는 호출 시점의 상태 스냅샷일 뿐입니다. 다른 스레드나 인터프리터가 이를 변경할 수 있습니다.
*   `full()`: 큐에 `maxsize` 항목이 있으면 `True`를 반환합니다. `maxsize=0` (기본값)으로 초기화된 큐의 경우 `full()`은 결코 `True`를 반환하지 않습니다. 이는 호출 시점의 상태 스냅샷일 뿐입니다. 다른 스레드나 인터프리터가 이를 변경할 수 있습니다.
*   `qsize()`: 큐의 항목 수를 반환합니다. 이는 호출 시점의 상태 스냅샷일 뿐입니다. 다른 스레드나 인터프리터가 이를 변경할 수 있습니다.
*   `put(obj, timeout=None)`: 객체를 큐에 추가합니다. `maxsize > 0`이고 큐가 가득 찼으면 빈 슬롯이 사용 가능할 때까지 차단됩니다. `timeout`이 양수이면 해당 시간(초) 동안만 차단되며, 이후 `interpreters.QueueFull`을 발생시킵니다. 그렇지 않으면 영원히 차단됩니다. 거의 모든 객체를 큐를 통해 전송할 수 있습니다. `memoryview`와 같은 몇 가지 경우에서는 기본 데이터가 단순히 복사되는 것이 아니라 실제로 공유됩니다. Shareable Objects를 참조하십시오. 객체가 큐에 남아 있고, 큐에 넣은 인터프리터(즉, 객체가 속한 인터프리터)가 파괴되면, 객체는 즉시 큐에서 제거됩니다. (나중에 제거된 객체를 큐의 센티넬로 바꾸거나 해당 `get()` 호출에 대해 예외를 발생시키는 옵션을 추가할 수 있습니다.)
*   `put_nowait(obj)`: `put()`과 유사하지만 사실상 즉시 타임아웃됩니다. 따라서 큐가 가득 차면 즉시 `interpreters.QueueFull`을 발생시킵니다.
*   `get(timeout=None) -> object`: 큐에서 다음 객체를 가져와 반환합니다. 큐가 비어 있는 동안 차단됩니다. 양수 `timeout`이 제공되고 해당 시간(초) 동안 객체가 큐에 추가되지 않으면 `interpreters.QueueEmpty`를 발생시킵니다.
*   `get_nowait() -> object`: `get()`과 유사하지만 차단하지 않습니다. 큐가 비어 있지 않으면 다음 항목을 반환합니다. 그렇지 않으면 `interpreters.QueueEmpty`를 발생시킵니다.

### 공유 가능한 객체 (Shareable Objects)
"공유 가능한" 객체는 하나의 인터프리터에서 다른 인터프리터로 전달될 수 있는 객체입니다. 객체는 인터프리터에 의해 실제로 직접 공유되지 않습니다. 그러나 공유 객체는 변경 가능성(mutability)에 대한 주의 사항과 함께 직접 공유되는 것처럼 처리되어야 합니다.

`pickle`될 수 있는 모든 객체는 공유 가능합니다. 따라서 거의 모든 객체가 공유 가능합니다. `interpreters.Queue` 객체도 공유 가능합니다.

객체가 `interp.prepare_main()` 또는 `queue.put()`을 통해 다른 인터프리터로 전송되는 거의 모든 경우에, 실제 객체는 전송되지 않습니다. 대신, 객체의 기본 데이터가 전송됩니다. 대부분의 객체에 대해 객체는 `pickle`되고 수신 인터프리터는 이를 `unpickle`합니다.

`memoryview`와 같이 "버퍼(buffer)" 프로토콜을 구현하는 객체는 주목할 만한 예외입니다. 이들의 기본 `Py_buffer`는 실제로 인터프리터 간에 공유됩니다. `interp.prepare_main()` 및 `queue.get()`은 새 `memoryview` 객체로 버퍼를 래핑합니다.

대부분의 변경 가능한 객체의 경우, 하나가 다른 인터프리터로 전송될 때 복사됩니다. 따라서 원본 또는 복사본에 대한 변경 사항은 다른 쪽과 동기화되지 않습니다. `pickle`을 통해 공유되는 변경 가능한 객체가 이 범주에 속합니다. 그러나 `interpreters.Queue` 및 버퍼 프로토콜을 구현하는 객체는 기본 데이터가 인터프리터 간에 공유되므로 객체가 동기화되는 주목할 만한 경우입니다.

인터프리터가 실제로 변경 가능한 데이터를 공유할 때 항상 데이터 경쟁(data races)의 위험이 있습니다. 스레드 안전성을 포함한 크로스-인터프리터 안전성(Cross-interpreter safety)은 `interpreters.Queue`의 기본 기능입니다.

그러나 버퍼 프로토콜(즉, `Py_buffer`)은 데이터 경쟁에 대한 기본 보호 기능을 가지고 있지 않습니다. 대신 사용자는 큐를 통해 안전성을 나타내는 토큰을 주고받거나 (Synchronization 참조), 개별 인터프리터에 하위 범위 독점권을 할당하는 방식으로 스레드 안전성을 관리할 책임이 있습니다.

대부분의 객체는 인터프리터가 서로 정보를 통신할 때 큐(`interpreters.Queue`)를 통해 공유됩니다. 코드를 실행하기 전에 인터프리터를 설정하기 위해 `prepare_main()`을 통해 객체가 공유되는 경우는 덜 빈번합니다. 그러나 `prepare_main()`은 다른 인터프리터에 추가 통신 수단을 제공하기 위해 큐를 공유하는 주요 방법입니다.

### 동기화 (Synchronization)
두 인터프리터가 동기화되어야 하는 상황이 있습니다. 여기에는 리소스 공유, 작업자 관리 또는 순차적 일관성 유지가 포함될 수 있습니다.

스레드 프로그래밍에서 일반적인 동기화 기본 요소는 뮤텍스(mutexes)와 같은 타입입니다. `threading` 모듈은 여러 가지를 노출합니다. 그러나 인터프리터는 객체를 공유할 수 없으므로 `threading.Lock` 객체를 공유할 수 없습니다.

`interpreters` 모듈은 그러한 전용 동기화 기본 요소를 제공하지 않습니다. 대신, `interpreters.Queue` 객체가 필요한 모든 것을 제공합니다.

예를 들어, 관리된 접근이 필요한 공유 리소스가 있다면, 큐를 사용하여 이를 관리할 수 있습니다. 여기서 인터프리터는 리소스를 사용할 수 있는 주체를 나타내는 객체를 주고받습니다.

```python
import interpreters
from mymodule import load_big_data, check_data

numworkers = 10
control = interpreters.create_queue()
data = memoryview(load_big_data())

def worker():
    interp = interpreters.create()
    interp.prepare_main(control=control, data=data)
    interp.exec("""if True:
    from mymodule import edit_data
    while True:
        token = control.get()
        edit_data(data)
        control.put(token)
    """)

threads = [threading.Thread(target=worker) for _ in range(numworkers)]
for t in threads:
    t.start()

token = 'football'
control.put(token)
while True:
    control.get()
    if not check_data(data):
        break
    control.put(token)
```

### 예외 (Exceptions)
*   `InterpreterError`: 인터프리터 관련 오류가 발생했음을 나타냅니다. 이 예외는 `Exception`의 서브클래스입니다.
*   `InterpreterNotFoundError`: 기본 인터프리터가 (예: C-API를 통해) 파괴된 후 `Interpreter` 메서드에서 발생합니다. 이 예외는 `InterpreterError`의 서브클래스입니다.
*   `ExecutionFailed`: `Interpreter.exec()` 및 `Interpreter.call()`에서 포착되지 않은 예외가 있을 때 발생합니다. 이 예외의 오류 표시는 포착되지 않은 예외의 트레이스백을 포함하며, 이는 일반 오류 표시 다음에 표시됩니다. `ExceptionGroup`과 유사하게 동작합니다.
    *   **속성 (Attributes):**
        *   `type`: 원래 예외 클래스의 표현으로, `__name__`, `__module__`, `__qualname__` 속성을 가집니다.
        *   `msg`: 원래 예외의 `str(exc)`입니다.
        *   `snapshot`: 원래 예외에 대한 `traceback.TracebackException` 객체입니다.
    이 예외는 `InterpreterError`의 서브클래스입니다.
*   `QueueError`: 큐 관련 오류가 발생했음을 나타냅니다. 이 예외는 `Exception`의 서브클래스입니다.
*   `QueueNotFoundError`: 기본 큐가 파괴된 후 `interpreters.Queue` 메서드에서 발생합니다. 이 예외는 `QueueError`의 서브클래스입니다.
*   `QueueEmpty`: `Queue.get()` (또는 기본값이 없는 `get_nowait()`)에서 큐가 비어 있을 때 발생합니다. 이 예외는 `QueueError`와 표준 라이브러리 `queue.Empty`의 서브클래스입니다.
*   `QueueFull`: `Queue.put()` (타임아웃 사용 시) 또는 `put_nowait()`에서 큐가 이미 최대 크기에 도달했을 때 발생합니다. 이 예외는 `QueueError`와 표준 라이브러리 `queue.Empty`의 서브클래스입니다.

### `InterpreterPoolExecutor`
새로운 `interpreters` 모듈과 함께 새로운 `concurrent.futures.InterpreterPoolExecutor`가 있을 것입니다. 이는 `ThreadPoolExecutor`의 파생형으로, 각 작업자는 자체 스레드에서 실행되지만, 각 스레드는 자체 하위 인터프리터를 가집니다.

다른 Executor와 마찬가지로, `InterpreterPoolExecutor`는 작업 및 초기화 함수에 대한 호출 가능(callable) 객체를 지원할 것입니다. 또한 다른 Executor와 마찬가지로, 두 경우 모두 인수는 대부분 제한이 없을 것입니다. 호출 가능 객체와 인수는 일반적으로 작업자 인터프리터로 전송될 때 직렬화됩니다(예: `pickle` 사용), 이는 `ProcessPoolExecutor`가 작동하는 방식과 유사합니다. 이는 (적어도 초기에는) 훨씬 더 제한적인 `Interpreter.call()`과는 대조적입니다.

작업자 간 또는 Executor (또는 일반적으로 해당 인터프리터)와 작업자 간의 통신은 초기화 함수를 통해 설정된 `interpreters.Queue` 객체를 통해 계속 수행될 수 있습니다.

### `sys.implementation.supports_isolated_interpreters`
파이썬 구현은 하위 인터프리터를 지원할 필요는 없지만, 대부분의 주요 구현은 지원합니다. 구현이 이를 지원한다면 `sys.implementation.supports_isolated_interpreters`는 `True`로 설정됩니다. 그렇지 않으면 `False`입니다. 이 기능이 지원되지 않으면 `interpreters` 모듈을 임포트할 때 `ImportError`가 발생합니다.

## 예시 (Examples)

### 예시 1: 작업 분배 및 결과 처리 (Task Distribution and Result Handling)
하위 스레드의 작업자를 통해 처리될 요청 스트림이 있습니다.
*   각 작업자 스레드는 자체 인터프리터를 가집니다.
*   작업자에게 작업을 보내는 큐 하나와 결과를 반환하는 큐 하나가 있습니다.
*   결과는 전용 스레드에서 처리됩니다.
*   각 작업자는 "stop" 센티넬(`None`)을 받을 때까지 계속됩니다.
*   결과 핸들러는 모든 작업자가 중지될 때까지 계속됩니다.

```python
import interpreters
import threading # 표준 라이브러리의 threading 모듈도 필요합니다.
from mymodule import iter_requests, handle_result # 예시를 위한 가상의 모듈

tasks = interpreters.create_queue()
results = interpreters.create_queue()
numworkers = 20
threads = []

def results_handler():
    running = numworkers
    while running:
        try:
            res = results.get(timeout=0.1)
        except interpreters.QueueEmpty:
            # 마지막 이후로 어떤 작업자도 요청을 완료하지 않았습니다.
            pass
        else:
            if res is None:
                # 작업자가 중지되었습니다.
                running -= 1
            else:
                handle_result(res)
    # 큐가 완전히 비어 있는지 확인
    empty = object()
    assert results.get_nowait(empty) is empty #

threads.append(threading.Thread(target=results_handler))

def worker():
    interp = interpreters.create()
    interp.prepare_main(tasks=tasks, results=results)
    interp.exec("""if True:
    from mymodule import handle_request, capture_exception
    while True:
        req = tasks.get()
        if req is None: # Stop!
            break
        try:
            res = handle_request(req)
        except Exception as exc:
            res = capture_exception(exc)
        results.put(res)
    # 결과 핸들러에 알림
    results.put(None)
    """)

threads.extend(threading.Thread(target=worker) for _ in range(numworkers))

for t in threads:
    t.start()

for req in iter_requests():
    tasks.put(req)

# "stop" 신호 전송
for _ in range(numworkers):
    tasks.put(None)

for t in threads:
    t.join()
```

### 예시 2: 공유 메모리뷰를 사용한 대량 데이터 처리 (Processing Large Data with Shared Memoryview)
이 경우도 하위 스레드에 여러 작업자가 있다는 점에서 이전 사례와 유사합니다. 그러나 이번에는 코드가 큰 데이터 배열을 청크(chunk)로 나누어 각 작업자가 한 번에 한 청크를 처리합니다. 이 데이터를 각 인터프리터에 복사하는 것은 매우 비효율적이므로, 코드는 `memoryview` 버퍼를 직접 공유하는 이점을 활용합니다.
*   모든 인터프리터가 소스 배열의 버퍼를 공유합니다.
*   각 인터프리터는 두 번째 공유 버퍼에 결과를 기록합니다.
*   작업자에게 작업을 보내는 큐를 사용합니다.
*   오직 한 작업자만 소스 배열의 특정 인덱스를 읽습니다.
*   오직 한 작업자만 결과의 특정 인덱스에 기록합니다 (이것이 스레드 안전성을 보장하는 방법입니다).

```python
import interpreters
import queue # queue 모듈이 필요할 수 있지만, 여기서는 interpreters.Queue를 사용
import threading # 표준 라이브러리의 threading 모듈도 필요합니다.
from mymodule import read_large_data_set, use_results, reduce_chunk # 예시를 위한 가상의 모듈

numworkers = 3
data, chunksize = read_large_data_set()
buf = memoryview(data)
numchunks = (len(buf) + chunksize - 1) // chunksize # 정확한 청크 수 계산
results = memoryview(bytearray(numchunks)) # 결과를 저장할 bytearray

tasks = interpreters.create_queue()

def worker(id):
    interp = interpreters.create()
    interp.prepare_main(data=buf, results=results, tasks=tasks)
    interp.exec("""if True:
    from mymodule import reduce_chunk
    while True:
        req = tasks.get()
        if req is None: # Stop!
            break
        resindex, start, end = req
        chunk = data[start: end]
        res = reduce_chunk(chunk)
        results[resindex] = res
    """)

threads = [threading.Thread(target=worker, args=(i,)) for i in range(numworkers)]
for t in threads:
    t.start()

for i in range(numchunks):
    start = i * chunksize
    end = start + chunksize
    if end > len(buf):
        end = len(buf)
    tasks.put((i, start, end)) # resindex, start, end

# "stop" 신호 전송
for _ in range(numworkers):
    tasks.put(None)

for t in threads:
    t.join()

use_results(results)
```

## 근거 (Rationale)

### 최소한의 API (A Minimal API)
코어 개발팀은 파이썬 코드에서 다중 인터프리터를 어떻게 활용할지에 대한 실제 경험이 없으므로, 이 제안은 초기 API를 가능한 한 간결하고 최소한으로 유지합니다. 목표는 나중에 필요에 따라 더 (더 고급) 기능을 추가할 수 있는 잘 고려된 기반을 제공하는 것입니다.

그럼에도 불구하고, 제안된 설계는 커뮤니티의 기존 하위 인터프리터 사용, 기존 stdlib 모듈 및 다른 프로그래밍 언어에서 얻은 교훈을 통합합니다. 또한 CPython 테스트 스위트에서 하위 인터프리터를 사용하고 동시성 벤치마크에서 이를 사용한 경험도 고려합니다.

### `create()`, `create_queue()`
일반적으로 사용자는 인스턴스를 생성하기 위해 타입을 호출하고, 그 시점에서 객체의 리소스가 프로비저닝됩니다. `interpreters` 모듈은 다른 접근 방식을 취하며, 사용자는 새 인터프리터를 얻기 위해 `create()`를 호출하거나 새 큐를 위해 `create_queue()`를 호출해야 합니다. `interpreters.Interpreter()`를 직접 호출하는 것은 기존 인터프리터에 대한 래퍼만 반환합니다 ( `interpreters.Queue()`도 마찬가지입니다).

이는 인터프리터(및 큐)가 특별한 리소스이기 때문입니다. 이들은 프로세스 전체에 전역적으로 존재하며 현재 인터프리터에 의해 관리/소유되지 않습니다. 따라서 `interpreters` 모듈은 인터프리터(또는 큐) 생성을 `interpreters.Interpreter`(또는 `interpreters.Queue`) 인스턴스 생성과 시각적으로 구별되는 작업으로 만듭니다.

### `Interpreter.prepare_main()`이 여러 변수를 설정하는 이유 (Interpreter.prepare_main() Sets Multiple Variables)
`prepare_main()`은 일종의 setter 함수로 볼 수 있습니다. `interp.prepare_main(spam=1, eggs=2)`와 같이 한 번에 여러 이름을 설정하는 것을 지원하지만, 대부분의 setter는 한 번에 하나의 항목을 설정합니다. 주된 이유는 효율성입니다.

인터프리터의 `__main__.__dict__`에 값을 설정하려면, 구현은 먼저 OS 스레드를 식별된 인터프리터로 전환해야 하며, 여기에는 무시할 수 없는 오버헤드가 수반됩니다. 값을 설정한 후에는 다시 전환해야 합니다. 또한, 인터프리터 간에 객체를 전달하는 메커니즘에도 일부 추가 오버헤드가 있으며, 여러 값을 한 번에 설정하면 총 오버헤드를 줄일 수 있습니다.

따라서 `prepare_main()`은 여러 값을 한 번에 설정하는 것을 지원합니다.

### 예외 전파 (Propagating Exceptions)
`Interpreter.exec()`를 통해 하위 인터프리터에서 포착되지 않은 예외는 `threading.Thread()`가 하는 것처럼 (실질적으로) 무시되거나, 내장 `exec()`가 하는 것처럼 전파될 수 있습니다. `Interpreter.exec()`는 내장 `exec()`와 같은 동기 작업이므로, 포착되지 않은 예외는 전파됩니다.

그러나 이러한 예외는 직접 발생하지 않습니다. 이는 인터프리터가 서로 격리되어 있으며 예외를 포함한 객체를 공유해서는 안 되기 때문입니다. 이는 예외의 요약, 복사본 또는 래핑하는 프록시와 같은 예외의 대리자(surrogate)를 발생시킴으로써 해결할 수 있습니다. 이러한 것들은 디버깅에 유용한 트레이스백을 보존할 수 있습니다. 발생하는 `ExecutionFailed`가 바로 그러한 대리자입니다.

고려해야 할 또 다른 문제가 있습니다. 전파된 예외가 즉시 포착되지 않으면, 포착될 때까지 (또는 포착되지 않을 때까지) 호출 스택을 통해 버블링됩니다. 다른 곳의 코드가 이를 포착할 수 있는 경우, 예외가 현재 인터프리터에서 온 것이 아니라 하위 인터프리터(즉, "원격" 소스)에서 왔음을 식별하는 것이 도움이 됩니다. 이것이 `Interpreter.exec()`가 `ExecutionFailed`를 발생시키고, 원래 예외와 일치하는 클래스를 가진 복사본이나 프록시가 아니라 일반 `Exception`인 이유입니다. 예를 들어, 하위 인터프리터에서 발생한 포착되지 않은 `ValueError`는 나중에 `try: ... except ValueError: ...`에서 결코 포착되지 않습니다. 대신, `ExecutionFailed`를 직접 처리해야 합니다.

대조적으로, `Interpreter.call()`에서 전파된 예외는 `ExecutionFailed`를 포함하지 않고, 호출자 인터프리터에서 발생한 것처럼 직접 발생합니다. 이는 `Interpreter.call()`이 일반적으로 인터프리터 간에 전달할 수 없는 객체를 지원하기 위해 `pickle`을 사용하는 더 높은 수준의 메서드이기 때문입니다.

### 객체 대 ID 프록시 (Objects vs. ID Proxies)
인터프리터와 큐 모두에 대해 저수준 모듈은 해당 프로세스 전역 ID를 통해 기본 상태를 노출하는 프록시 객체를 사용합니다. 두 경우 모두 상태는 프로세스 전역이며 여러 인터프리터에서 사용됩니다. 따라서 인터프리터별 데이터에만 실제로 옵션인 `PyObject`로 구현하는 것은 적합하지 않습니다. 이것이 `interpreters` 모듈이 대신 ID를 통해 약하게 연결된 객체를 제공하는 이유입니다.

## 거부된 아이디어 (Rejected Ideas)
PEP 554를 참조하십시오.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.