---
title: "[Final] PEP 669 - Low Impact Monitoring for CPython"
excerpt: "Python Enhancement Proposal 669: 'Low Impact Monitoring for CPython'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/669/
toc: true
toc_sticky: true
date: 2025-09-27 10:04:48+0900
last_modified_at: 2025-09-27 10:04:48+0900
published: true
---
> **원문 링크:** [PEP 669 - Low Impact Monitoring for CPython](https://peps.python.org/pep-0669/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 18-Aug-2021

PEP 669 – CPython을 위한 저영향 모니터링 (Low Impact Monitoring for CPython)

## 개요 (Abstract)

CPython에서 프로파일러(profiler)나 디버거(debugger)를 사용하는 것은 프로그램 성능에 심각한 영향을 미칠 수 있으며, 성능 저하가 한 자릿수(order of magnitude)에 달하는 경우가 흔합니다. 이 PEP(Python Enhancement Proposal)는 CPython에서 실행되는 Python 프로그램을 모니터링하기 위한 API를 제안하며, 이를 통해 낮은 비용으로 모니터링이 가능하도록 합니다.

이 PEP는 구현을 직접 명시하지는 않지만, PEP 659의 퀵닝(quickening) 단계를 사용하여 구현될 것으로 예상됩니다. 관련 함수와 상수를 포함하는 `sys.monitoring` 네임스페이스가 추가될 것입니다.

## 동기 (Motivation)

개발자는 디버거, 프로파일러 및 유사한 도구를 사용하는 데 불합리한 비용을 지불해서는 안 됩니다. C++ 및 Java 개발자는 디버거 아래에서 프로그램을 거의 완전한 속도로 실행할 수 있을 것으로 기대합니다. Python 개발자들도 마찬가지여야 합니다.

## 합리적 근거 (Rationale)

PEP 659에서 제공하는 퀵닝 메커니즘은 실행 중인 Python 바이트코드(bytecode)를 동적으로 수정하는 방법을 제공합니다. 이러한 수정은 수정되는 코드 부분을 제외하고는 비용이 거의 없으며, 수정되는 부분에 대해서도 상대적으로 낮은 비용을 발생시킵니다. 이 메커니즘을 활용하여 Python 3.10 또는 그 이전 버전에서는 불가능했던 효율적인 모니터링 메커니즘을 제공할 수 있습니다.

퀵닝을 사용함으로써, Python 3.12에서 디버거 아래에서 실행되는 코드가 Python 3.11에서 디버거 없이 실행되는 코드보다 더 나은 성능을 보일 것으로 예상됩니다. 프로파일링은 여전히 실행 속도를 늦추겠지만, Python 3.11보다 훨씬 적은 영향을 미칠 것입니다.

## 명세 (Specification)

Python 프로그램 모니터링은 이벤트에 대한 콜백(callback) 함수를 등록하고, 일련의 이벤트를 활성화함으로써 수행됩니다. 콜백 등록과 이벤트 활성화는 서로 독립적입니다.

콜백 등록과 이벤트 활성화는 모두 도구별(per-tool basis)로 이루어집니다. 여러 도구가 서로 다른 이벤트 세트에 응답할 수 있습니다. `sys.settrace()`와 달리, 이벤트 및 콜백은 스레드(thread)당이 아닌 인터프리터(interpreter)당(per interpreter) 적용됩니다.

### 이벤트 (Events)

코드 객체가 실행될 때 도구에 유용할 수 있는 다양한 이벤트가 발생합니다. 이벤트를 활성화하고 콜백 함수를 등록함으로써 도구는 이러한 이벤트에 적합한 방식으로 응답할 수 있습니다. 이벤트는 전역적으로(globally) 또는 개별 코드 객체(individual code objects)에 대해 설정할 수 있습니다.

Python 3.12의 CPython은 다음 이벤트를 지원합니다:

*   `PY_START`: Python 함수의 시작 (호출 직후 발생, 호출된 함수의 프레임이 스택에 있음)
*   `PY_RESUME`: `throw()` 호출을 제외한 Python 함수 재개 (제너레이터(generator) 및 코루틴(coroutine) 함수용)
*   `PY_THROW`: `throw()` 호출에 의해 Python 함수가 재개됨
*   `PY_RETURN`: Python 함수에서 반환 (반환 직전 발생, 호출된 함수의 프레임이 스택에 있음)
*   `PY_YIELD`: Python 함수에서 yield (yield 직전 발생, 호출된 함수의 프레임이 스택에 있음)
*   `PY_UNWIND`: 예외 언와인딩(exception unwinding) 중 Python 함수에서 종료
*   `CALL`: Python 코드 내의 호출 (호출 전에 이벤트 발생)
*   `C_RETURN`: Python 함수를 제외한 모든 호출 가능(callable) 객체에서 반환 (반환 후 이벤트 발생)
*   `C_RAISE`: Python 함수를 제외한 모든 호출 가능 객체에서 예외 발생 (종료 후 이벤트 발생)
*   `RAISE`: `STOP_ITERATION` 이벤트를 일으키는 예외를 제외하고 예외가 발생함
*   `EXCEPTION_HANDLED`: 예외가 처리됨
*   `LINE`: 이전 명령(instruction)과 다른 라인 번호를 가진 명령이 실행될 예정
*   `INSTRUCTION`: VM 명령이 실행될 예정
*   `JUMP`: 제어 흐름 그래프에서 무조건적인 점프(unconditional jump)가 발생함
*   `BRANCH`: 조건부 분기(conditional branch)가 수행됨 (또는 수행되지 않음)
*   `STOP_ITERATION`: 인공적인 `StopIteration`이 발생함 (STOP_ITERATION 이벤트 참조)

향후 더 많은 이벤트가 추가될 수 있습니다. 모든 이벤트는 `sys.monitoring` 네임스페이스의 `events` 속성이 될 것입니다. 모든 이벤트는 2의 거듭제곱 정수로 표현되므로 `|` 연산자로 조합할 수 있습니다.

이벤트는 세 가지 그룹으로 나뉩니다:

#### 로컬 이벤트 (Local events)

로컬 이벤트는 프로그램의 일반적인 실행과 연관되며 명확히 정의된 위치에서 발생합니다. 모든 로컬 이벤트는 비활성화될 수 있습니다. 로컬 이벤트는 다음과 같습니다:

*   `PY_START`
*   `PY_RESUME`
*   `PY_RETURN`
*   `PY_YIELD`
*   `CALL`
*   `LINE`
*   `INSTRUCTION`
*   `JUMP`
*   `BRANCH`
*   `STOP_ITERATION`

#### 보조 이벤트 (Ancillary events)

보조 이벤트는 다른 이벤트처럼 모니터링할 수 있지만, 다른 이벤트에 의해 제어됩니다:

*   `C_RAISE`
*   `C_RETURN`

`C_RETURN` 및 `C_RAISE` 이벤트는 `CALL` 이벤트에 의해 제어됩니다. 해당 `CALL` 이벤트가 모니터링되고 있는 경우에만 `C_RETURN` 및 `C_RAISE` 이벤트가 발생합니다.

#### 기타 이벤트 (Other events)

기타 이벤트는 프로그램의 특정 위치에 반드시 묶여 있지는 않으며 개별적으로 비활성화할 수 없습니다. 모니터링할 수 있는 기타 이벤트는 다음과 같습니다:

*   `PY_THROW`
*   `PY_UNWIND`
*   `RAISE`
*   `EXCEPTION_HANDLED`

#### `STOP_ITERATION` 이벤트 (The STOP_ITERATION event)

PEP 380은 제너레이터나 코루틴에서 값을 반환할 때 `StopIteration` 예외가 발생한다고 명시합니다. 그러나 이는 값을 반환하는 매우 비효율적인 방법이므로, 일부 Python 구현(특히 CPython 3.12 이상)은 다른 코드에 노출되지 않는 한 예외를 발생시키지 않습니다. 도구가 제너레이터와 코루틴의 속도를 늦추지 않고 실제 예외를 모니터링할 수 있도록 `STOP_ITERATION` 이벤트가 제공됩니다. `STOP_ITERATION`은 `RAISE`와 달리 로컬에서 비활성화할 수 있습니다.

### 도구 식별자 (Tool identifiers)

VM은 최대 6개의 도구를 동시에 지원할 수 있습니다. 이벤트를 등록하거나 활성화하기 전에 도구는 식별자를 선택해야 합니다. 식별자는 0에서 5까지의 정수입니다.

*   `sys.monitoring.use_tool_id(id, name:str) -> None`
*   `sys.monitoring.free_tool_id(id) -> None`
*   `sys.monitoring.get_tool(id) -> str | None`

`sys.monitoring.use_tool_id`는 `id`가 사용 중인 경우 `ValueError`를 발생시킵니다. `sys.monitoring.get_tool`은 `id`가 사용 중인 경우 도구의 이름을 반환하고, 그렇지 않으면 `None`을 반환합니다.

모든 ID는 이벤트와 관련하여 VM에 의해 동일하게 처리되지만, 도구 간의 협업을 쉽게 하기 위해 다음 ID가 미리 정의되어 있습니다:

*   `sys.monitoring.DEBUGGER_ID = 0`
*   `sys.monitoring.COVERAGE_ID = 1`
*   `sys.monitoring.PROFILER_ID = 2`
*   `sys.monitoring.OPTIMIZER_ID = 5`

ID를 설정할 의무는 없으며, 도구가 이미 사용 중인 ID를 사용하는 것을 막는 것도 아닙니다. 그러나 도구는 고유한 ID를 사용하고 다른 도구를 존중하도록 권장됩니다. 예를 들어, 디버거가 연결되었고 `DEBUGGER_ID`가 사용 중인 경우, 계속 진행하기보다는 오류를 보고해야 합니다. `OPTIMIZER_ID`는 Cinder 또는 PyTorch와 같이 Python 코드를 최적화하려는 도구를 위해 제공되지만, 더 넓은 컨텍스트에 따라 무엇을 최적화할지 결정해야 합니다.

### 전역적으로 이벤트 설정 (Setting events globally)

모니터링되는 이벤트 세트를 수정하여 이벤트를 전역적으로 제어할 수 있습니다:

*   `sys.monitoring.get_events(tool_id:int)->int`: 활성 이벤트의 int 표현을 반환합니다.
*   `sys.monitoring.set_events(tool_id:int, event_set: int)`: `event_set`에 설정된 모든 이벤트를 활성화합니다. `tool_id`가 사용 중이 아니면 `ValueError`를 발생시킵니다.

기본적으로 활성 이벤트는 없습니다.

### 코드 객체별 이벤트 (Per code object events)

이벤트는 코드 객체별로도 제어할 수 있습니다:

*   `sys.monitoring.get_local_events(tool_id:int, code: CodeType)->int`: `code`에 대한 모든 로컬 이벤트를 반환합니다.
*   `sys.monitoring.set_local_events(tool_id:int, code: CodeType, event_set: int)`: `event_set`에 설정된 `code`에 대한 모든 로컬 이벤트를 활성화합니다. `tool_id`가 사용 중이 아니면 `ValueError`를 발생시킵니다.

로컬 이벤트는 전역 이벤트에 추가되지만, 전역 이벤트를 마스크(mask)하지는 않습니다. 즉, 로컬 이벤트와 상관없이 모든 전역 이벤트는 코드 객체에 대해 트리거됩니다.

### 콜백 함수 등록 (Register callback functions)

이벤트에 대한 호출 가능(callable) 객체를 등록하려면 다음을 호출합니다:

*   `sys.monitoring.register_callback(tool_id:int, event: int, func: Callable | None) -> Callable | None`

주어진 `tool_id`와 `event`에 대해 다른 콜백이 등록되어 있었다면, 해당 콜백은 등록 해제되고 반환됩니다. 그렇지 않으면 `register_callback`은 `None`을 반환합니다. `sys.monitoring.register_callback(tool_id, event, None)`을 호출하여 함수를 등록 해제할 수 있습니다. 콜백 함수는 언제든지 등록 및 등록 해제할 수 있습니다. 콜백 함수를 등록하거나 등록 해제하면 `sys.audit` 이벤트가 생성됩니다.

### 콜백 함수 인자 (Callback function arguments)

활성 이벤트가 발생하면 등록된 콜백 함수가 호출됩니다. 서로 다른 이벤트는 콜백 함수에 다음과 같이 다른 인자를 제공합니다:

*   `PY_START` 및 `PY_RESUME`:
    `func(code: CodeType, instruction_offset: int) -> DISABLE | Any`
*   `PY_RETURN` 및 `PY_YIELD`:
    `func(code: CodeType, instruction_offset: int, retval: object) -> DISABLE | Any`
*   `CALL`, `C_RAISE` 및 `C_RETURN`:
    `func(code: CodeType, instruction_offset: int, callable: object, arg0: object | MISSING) -> DISABLE | Any`
    인자가 없으면 `arg0`은 `MISSING`으로 설정됩니다.
*   `RAISE` 및 `EXCEPTION_HANDLED`:
    `func(code: CodeType, instruction_offset: int, exception: BaseException) -> DISABLE | Any`
*   `LINE`:
    `func(code: CodeType, line_number: int) -> DISABLE | Any`
*   `BRANCH`:
    `func(code: CodeType, instruction_offset: int, destination_offset: int) -> DISABLE | Any`
    `destination_offset`은 코드가 다음에 실행될 위치입니다. 수행되지 않은 분기(untaken branch)의 경우, 이는 분기 다음 명령의 오프셋(offset)이 됩니다.
*   `INSTRUCTION`:
    `func(code: CodeType, instruction_offset: int) -> DISABLE | Any`

콜백 함수가 `DISABLE`을 반환하면, `sys.monitoring.restart_events()`가 호출될 때까지 해당 `(code, instruction_offset)`에 대해 해당 함수는 더 이상 호출되지 않습니다. 이 기능은 이벤트를 한 번만 보는 데 관심 있는 커버리지(coverage) 및 기타 도구를 위해 제공됩니다. `sys.monitoring.restart_events()`는 특정 도구에 한정되지 않으므로, 도구는 `DISABLE`하기로 선택한 이벤트라도 다시 받을 준비가 되어 있어야 합니다.

### 콜백 함수 내의 이벤트 (Events in callback functions)

콜백 함수와 그 호출된 함수(callees) 내에서는 해당 콜백을 등록한 도구에 대해 이벤트가 일시 중단됩니다. 이는 다른 도구가 다른 도구의 콜백 함수 내에서 이벤트를 볼 수 있음을 의미합니다. 이는 프로파일링 도구를 디버깅하는 데 유용할 수 있지만, 디버거 도구가 프로필에 나타나므로 오해의 소지가 있는 프로필을 생성할 수 있습니다.

### 이벤트 순서 (Order of events)

명령이 여러 이벤트를 트리거하는 경우 다음 순서로 발생합니다:

1.  `LINE`
2.  `INSTRUCTION`
3.  다른 모든 이벤트 (각 명령당 이 이벤트 중 하나만 발생할 수 있음)

각 이벤트는 ID의 오름차순으로 도구에 전달됩니다.

### "호출" 이벤트 그룹 (The “call” event group)

대부분의 이벤트는 독립적입니다. 하나의 이벤트를 설정하거나 비활성화하는 것이 다른 이벤트에 영향을 미치지 않습니다. 그러나 `CALL`, `C_RAISE`, `C_RETURN` 이벤트는 그룹을 형성합니다. 이 이벤트 중 하나라도 설정되거나 비활성화되면, 그룹 내의 모든 이벤트가 그렇게 됩니다. `CALL` 이벤트를 비활성화해도 일치하는 `C_RAISE` 또는 `C_RETURN`은 비활성화되지 않지만, 이후의 모든 이벤트는 비활성화됩니다.

### `sys.monitoring` 네임스페이스의 속성 (Attributes of the sys.monitoring namespace)

*   `def use_tool_id(id)->None`
*   `def free_tool_id(id)->None`
*   `def get_events(tool_id: int)->int`
*   `def set_events(tool_id: int, event_set: int)->None`
*   `def get_local_events(tool_id: int, code: CodeType)->int`
*   `def set_local_events(tool_id: int, code: CodeType, event_set: int)->None`
*   `def register_callback(tool_id: int, event: int, func: Callable)->Optional[Callable]`
*   `def restart_events()->None`
*   `DISABLE: object`
*   `MISSING: object`

### "디버그 전용" 기능 접근 (Access to “debug only” features)

표준 라이브러리의 일부 기능은 일반 코드에서는 접근할 수 없지만, 디버거에서는 접근할 수 있습니다. 예를 들어, 로컬 변수 설정 또는 라인 번호 등이 있습니다. 이러한 기능은 콜백 함수에서 사용할 수 있게 될 것입니다.

## 하위 호환성 (Backwards Compatibility)

이 PEP는 대부분 하위 호환성을 유지합니다. PEP 523 플러그인의 동작이 VM의 제어 밖에 있기 때문에 PEP 523과 일부 호환성 문제가 있습니다. PEP 523 플러그인은 이 PEP의 의미론(semantics)을 존중해야 합니다. VM의 상태를 변경하지 않고 `_PyEval_EvalFrameDefault()`로 실행을 위임하는 간단한 플러그인은 계속 작동해야 합니다.

`sys.settrace()` 및 `sys.setprofile()`는 각각 도구 6 및 7처럼 작동하므로 이 PEP와 함께 사용할 수 있습니다. 이는 `sys.settrace()` 및 `sys.setprofile()`가 모든 PEP 523 플러그인과 올바르게 작동하지 않을 수 있음을 의미합니다. 그러나 위에서 설명한 간단한 PEP 523 플러그인은 괜찮을 것입니다.

## 성능 (Performance)

활성 이벤트가 없는 경우, 이 PEP는 성능에 약간 긍정적인 영향을 미쳐야 합니다. 실험에 따르면 `sys.settrace()`를 직접 지원하지 않음으로써 1~2%의 속도 향상이 나타났습니다. `sys.settrace()`의 성능은 거의 동일할 것입니다. `sys.setprofile()`의 성능은 더 좋아야 합니다. 그러나 `sys.settrace()` 및 `sys.setprofile()`에 의존하는 도구는 이 PEP가 제공하는 API를 사용하여 훨씬 빠르게 만들 수 있습니다.

디버거와 같이 소수의 이벤트만 활성화되어 있는 경우, 콜백 오버헤드(overhead)는 `sys.settrace()`보다 몇 자릿수(orders of magnitudes) 적고 PEP 523을 사용하는 것보다 훨씬 저렴할 것입니다. 커버리지 도구는 모든 콜백에서 `DISABLE`을 반환함으로써 매우 낮은 비용으로 구현될 수 있습니다.

`LINE`과 같이 많이 계측(instrumented)된 코드의 경우, 성능은 `sys.settrace`보다 좋지만, 콜백에 소요되는 시간이 성능을 지배할 것이므로 그렇게까지 큰 차이는 없을 것입니다.

CPython의 미래 버전(그리고 이 API를 지원하기로 선택한 경우 PyPy)과 같은 최적화 가상 머신의 경우, 장기 실행 프로그램 중간에 활성 이벤트 세트를 변경하는 것은 매우 비용이 많이 들 수 있으며, 비최적화(de-optimizations)를 유발하여 수백 밀리초가 소요될 수 있습니다. 이러한 비최적화가 발생한 후에는 VM이 계측된 코드를 다시 최적화할 수 있으므로 성능이 회복되어야 합니다.

일반적으로 다음 작업은 빠르다고 간주됩니다:

*   `def get_events(tool_id: int)->int`
*   `def get_local_events(tool_id: int, code: CodeType)->int`
*   `def register_callback(tool_id: int, event: int, func: Callable)->Optional[Callable]`
*   `def get_tool(tool_id) -> str | None`

다음 작업은 더 느리지만, 특별히 그렇지는 않습니다:

*   `def set_local_events(tool_id: int, code: CodeType, event_set: int)->None`

그리고 다음 작업은 느리다고 간주해야 합니다:

*   `def use_tool_id(id, name:str)->None`
*   `def free_tool_id(id)->None`
*   `def set_events(tool_id: int, event_set: int)->None`
*   `def restart_events()->None`

느린 작업의 속도는 언제 발생하는지에 따라 다릅니다. 프로그램 초기에, 모듈이 로드되기 전에 수행되면 비교적 비용이 적게 듭니다.

## 메모리 사용량 (Memory Consumption)

사용되지 않을 때, 이 PEP는 메모리 사용량에 무시할 수 있는 변화를 가져올 것입니다. 메모리 사용 방식은 구현 세부 사항(implementation detail)이지만, 3.12에서는 코드 객체당 추가 메모리 사용량이 대략 다음과 같을 것으로 예상됩니다:

| 이벤트           | 도구       | 기타      |
| :--------------- | :--------- | :-------- |
| `LINE`, `INSTRUCTION` | 하나       | ≈40%      |
|                  | 두 개 이상 | ≈80%      |
|                  |            | ≈120% ≈200% |

## 보안 영향 (Security Implications)

실행 중인 코드를 수정하는 것은 일부 보안 영향을 미치지만, 새 코드를 생성하고 호출하는 기능보다 더 크지는 않습니다. 위에 나열된 모든 새 함수는 감사 훅(audit hooks)을 트리거할 것입니다.

## 구현 (Implementation)

이 섹션은 CPython 3.12에 대한 제안된 구현을 간략하게 설명합니다. 이후 CPython 버전 및 다른 Python 구현의 실제 구현은 상당히 다를 수 있습니다. 이 PEP의 제안된 구현은 PEP 659에 설명된 CPython 3.11의 퀵닝 단계 위에 구축될 것입니다. 계측(Instrumentation)은 퀵닝과 거의 동일한 방식으로 작동하며, 필요에 따라 바이트코드가 계측된 바이트코드로 대체됩니다.

예를 들어, `CALL` 이벤트가 켜지면 모든 호출 명령은 `INSTRUMENTED_CALL` 명령으로 대체됩니다. 이는 특수화(specialization)와 충돌하여 등록된 호출 가능 객체 호출 오버헤드 외에 일부 성능 저하를 초래할 것입니다.

활성 이벤트 세트가 변경되면 VM은 모든 스레드의 호출 스택(call stack)에 있는 모든 코드 객체를 즉시 업데이트합니다. 또한 모든 코드 객체가 호출될 때 올바르게 계측되도록 트랩(trap)을 설정합니다. 결과적으로 활성 이벤트 세트를 변경하는 것은 비용이 많이 드는 작업일 수 있으므로 가능한 한 드물게 수행해야 합니다.

`RAISE`와 같은 다른 이벤트는 코드 계측에 의존하지 않고 기본 이벤트가 발생할 때 런타임 검사(runtime checks)에 의존하므로 저렴하게 켜고 끌 수 있습니다. 계측이 필요한 정확한 이벤트 세트는 구현 세부 사항이지만, 현재 설계에서는 다음 이벤트에 계측이 필요합니다:

*   `PY_START`
*   `PY_RESUME`
*   `PY_RETURN`
*   `PY_YIELD`
*   `CALL`
*   `LINE`
*   `INSTRUCTION`
*   `JUMP`
*   `BRANCH`

각 계측된 바이트코드는 계측이 적용되는 도구를 기록하기 위해 추가 8비트 정보가 필요합니다. `LINE` 및 `INSTRUCTION` 이벤트는 추가 정보가 필요합니다. 이는 원래 명령을 저장하거나, 다른 계측과 겹치는 경우 계측된 명령까지 저장해야 하기 때문입니다.

## 도구 구현 (Implementing tools)

이 PEP의 철학은 타사 모니터링 도구가 고성능을 달성할 수 있도록 하는 것이지, 그들이 쉽게 그렇게 할 수 있도록 하는 것이 아닙니다. 이벤트를 사용자에게 의미 있는 데이터로 변환하는 것은 도구의 책임입니다. 모든 이벤트는 비용이 들며, 도구는 가장 적게 트리거되면서도 필요한 정보를 제공하는 이벤트 세트를 사용하려고 노력해야 합니다.

### 디버거 (Debuggers)

#### 중단점 삽입 (Inserting breakpoints)

중단점(breakpoints)은 `LINE` 또는 `INSTRUCTION`과 같은 코드 객체별 이벤트를 설정하고, 중단점과 일치하지 않는 모든 이벤트에 대해 `DISABLE`을 반환하여 삽입할 수 있습니다.

#### 스텝핑 (Stepping)

디버거는 일반적으로 단일 명령 또는 라인별로 실행을 스텝(step)하는 기능을 제공합니다. 중단점과 마찬가지로 스텝핑은 코드 객체별 이벤트를 설정하여 구현할 수 있습니다. 정상적인 실행이 재개될 때, 로컬 이벤트를 해제할 수 있습니다.

#### 연결 (Attaching)

디버거는 `PY_START` 및 `PY_RESUME` 이벤트를 사용하여 코드 객체가 처음 발견될 때 정보를 받아 필요한 중단점을 삽입할 수 있습니다.

### 커버리지 도구 (Coverage Tools)

커버리지 도구는 제어 그래프(control graph)의 어떤 부분이 실행되었는지 추적해야 합니다. 이를 위해 `PY_` 이벤트와 `JUMP` 및 `BRANCH`를 등록해야 합니다. 이 정보는 실행 완료 후 라인 기반 보고서로 다시 변환될 수 있습니다.

### 프로파일러 (Profilers)

간단한 프로파일러는 호출에 대한 정보를 수집해야 합니다. 이를 위해 프로파일러는 다음 이벤트를 등록해야 합니다:

*   `PY_START`
*   `PY_RESUME`
*   `PY_THROW`
*   `PY_RETURN`
*   `PY_YIELD`
*   `PY_UNWIND`
*   `CALL`
*   `C_RAISE`
*   `C_RETURN`

#### 라인 기반 프로파일러 (Line based profilers)

라인 기반 프로파일러는 `LINE` 및 `JUMP` 이벤트를 사용할 수 있습니다. 프로파일러 구현자는 `LINE` 이벤트를 계측하는 것이 성능에 큰 영향을 미칠 수 있음을 인지해야 합니다. 계측 프로파일러는 상당한 오버헤드를 가지며 프로파일링 결과(results of profiling)를 왜곡할 수 있습니다. 정확한 호출 횟수가 필요하지 않은 경우, 통계적 프로파일러(statistical profiler) 사용을 고려하십시오.

## 거부된 아이디어 (Rejected ideas)

이 PEP의 초안 버전에서는 VM이 아닌 사용자에게 모니터링 명령을 삽입하는 책임을 부여할 것을 제안했습니다. 그러나 이는 도구에 너무 많은 부담을 주고 디버거 연결을 거의 불가능하게 만들 것입니다.

이 PEP의 이전 버전에서는 이벤트를 enum으로 저장할 것을 제안했습니다:

```python
class Event(enum.IntFlag):
    PY_START = ...
```

그러나 이는 `enum` 모듈이 로드되기 전에 코드를 모니터링하는 것을 방해하고 불필요한 오버헤드를 유발할 수 있습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있거나 CC0-1.0-Universal 라이선스(둘 중 더 관대한 라이선스)에 따릅니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.