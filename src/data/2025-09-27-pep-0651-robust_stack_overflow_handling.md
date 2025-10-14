---
title: "[Rejected] PEP 651 - Robust Stack Overflow Handling"
excerpt: "Python Enhancement Proposal 651: 'Robust Stack Overflow Handling'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/651/
toc: true
toc_sticky: true
date: 2025-09-27 01:41:16+0900
last_modified_at: 2025-09-27 01:41:16+0900
published: true
---
> **원문 링크:** [PEP 651 - Robust Stack Overflow Handling](https://peps.python.org/pep-0651/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 18-Jan-2021


# PEP 651 – 견고한 스택 오버플로우 처리

*   **작성자:** Mark Shannon
*   **상태:** 거절됨 (Rejected)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2021년 1월 18일
*   **최종 수정일:** 2025년 2월 1일

## 거절 공지 (Rejection Notice)
이 PEP는 Python Steering Council에 의해 거절되었습니다.

## 초록 (Abstract)
이 PEP는 Python이 머신 스택 오버플로우(machine stack overflow)를 제어 불능 재귀(runaway recursion)와 다르게 처리해야 한다고 제안합니다. 이를 통해 프로그램이 필요에 따라 최대 재귀 깊이(maximum recursion depth)를 설정하고, 추가적인 안전 보장(safety guarantees)을 제공할 수 있습니다.

이 PEP가 수락된다면, 다음 프로그램은 안전하게 완료될 것입니다.

```python
sys.setrecursionlimit(1_000_000)
def f(n):
    if n:
        f(n-1)
f(500_000)
```

그리고 다음 프로그램은 VM 충돌 없이 `StackOverflow` 예외를 발생시킬 것입니다.

```python
sys.setrecursionlimit(1_000_000)
class X:
    def __add__(self, other):
        return self + other
X() + 1
```

## 동기 (Motivation)
CPython은 제어 불능 재귀와 C 스택 오버플로우를 모두 방지하기 위해 단일 재귀 깊이 카운터(recursion depth counter)를 사용합니다. 그러나 제어 불능 재귀와 머신 스택 오버플로우는 서로 다른 문제입니다. 머신 스택 오버플로우를 허용하는 것은 잠재적인 보안 취약점이 될 수 있지만, 재귀 깊이를 제한하는 것은 Python에서 일부 알고리즘의 사용을 막을 수 있습니다.

현재, 프로그램이 깊은 재귀를 필요로 하는 경우, 정확하게 실행하는 데 필요한 최소값과 메모리 보호 오류(memory protection error)를 피하기 위한 최대값 사이에서 허용되는 최대 재귀 깊이를 관리해야 합니다.

C 스택 오버플로우 검사와 재귀 깊이 검사를 분리함으로써, 순수 Python 프로그램은 필요한 재귀 수준을 사용하여 안전하게 실행될 수 있습니다.

## 근거 (Rationale)
CPython은 현재 가상 머신(Virtual Machine)의 잠재적으로 위험한 스택 오버플로우와 Python 프로그램의 제어 불능 재귀를 막기 위해 단일 제한(single limit)에 의존하고 있습니다. 이는 C 스택과 Python 호출 스택(call stacks)을 결합(couples)하는 구현의 결과입니다. 이 결합을 해제함으로써 CPython의 유용성(usability)과 안전성(safety)을 모두 향상시킬 수 있습니다.

재귀 제한은 제어 불능 재귀로부터 보호하기 위해 존재하며, 가상 머신의 무결성(integrity)은 이에 의존해서는 안 됩니다. 마찬가지로 재귀는 구현 세부 사항(implementation details)에 의해 제한되어서는 안 됩니다.

## 명세 (Specification)
`StackOverflow`와 `RecursionOverflow`라는 두 개의 새로운 예외 클래스가 추가될 예정이며, 둘 다 `RecursionError`의 서브클래스가 될 것입니다.

### `StackOverflow` 예외
인터프리터 또는 내장 모듈 코드가 C 스택이 안전 한계에 도달했거나 가까워지고 있다고 판단할 때마다 `StackOverflow` 예외가 발생합니다. `StackOverflow`는 `RecursionError`의 서브클래스이므로, `RecursionError`를 처리하는 모든 코드는 `StackOverflow`도 처리할 것입니다.

### `RecursionOverflow` 예외
Python 함수 호출이 재귀 제한을 초과할 때 `RecursionOverflow` 예외가 발생합니다. 이는 현재 `RecursionError`를 발생시키는 동작에서 약간의 변경입니다. `RecursionOverflow`는 `RecursionError`의 서브클래스이므로, `RecursionError`를 처리하는 모든 코드는 이전처럼 계속 작동할 것입니다.

### Python 스택과 C 스택 분리 (Decoupling the Python stack from the C stack)
위의 보장을 제공하고 이전에 작동했던 모든 프로그램이 계속 작동하도록 보장하려면, Python 스택과 C 스택을 분리해야 합니다. 즉, Python 함수에서 Python 함수를 호출할 때 C 스택 공간을 소비하지 않아야 합니다. 내장 함수(builtin functions)를 호출하거나 내장 함수로부터 호출할 때는 계속 C 스택 공간을 소비합니다.

C 스택의 크기는 구현에 따라 정의되며, 머신마다 다를 수 있습니다. 심지어 스레드(threads)마다 다를 수도 있습니다. 그러나 이전 기본값으로 재귀 제한이 설정되었을 때 실행될 수 있었던 모든 코드는 계속 실행될 것이라는 기대가 있습니다.

Python의 많은 연산은 C 레벨에서 어떤 종류의 호출을 수행합니다. 이들 대부분은 계속 C 스택을 소비하며, 통제되지 않은 재귀가 발생하면 `StackOverflow` 예외가 발생할 것입니다.

## 다른 구현 (Other Implementations)
다른 구현(예: PyPy, Jython)은 재귀 제한이 어떤 값으로 설정되더라도 안전하게 실패해야 합니다.

구현이 Python 스택을 기본 VM 또는 하드웨어 스택과 결합하는 경우, 재귀 제한을 초과하지만 기본 스택이 오버플로우되지 않을 때 `RecursionOverflow` 예외를 발생시켜야 합니다. 기본 스택이 오버플로우되거나 오버플로우에 가까운 경우, `StackOverflow` 예외가 발생해야 합니다.

## C-API
새로운 함수 `Py_CheckStackDepth()`가 추가될 예정이며, `Py_EnterRecursiveCall()`의 동작이 약간 수정될 것입니다.

### `Py_CheckStackDepth()`
`int Py_CheckStackDepth(const char *where)`는 C 스택 오버플로우의 즉각적인 위험이 없을 경우 `0`을 반환합니다. C 스택이 오버플로우에 가까운 경우 `-1`을 반환하고 예외를 설정합니다. `where` 매개변수는 `Py_EnterRecursiveCall()`의 `where` 매개변수와 같은 방식으로 예외 메시지에 사용됩니다.

### `Py_EnterRecursiveCall()`
`Py_EnterRecursiveCall()`은 현재 기능을 수행하기 전에 `Py_CheckStackDepth()`를 호출하도록 수정될 것입니다.

### `PyLeaveRecursiveCall()`
`Py_LeaveRecursiveCall()`은 변경되지 않고 유지될 것입니다.

## 하위 호환성 (Backwards Compatibility)
이 기능은 Python 레벨에서 완전히 하위 호환됩니다. 머신 코드 디버거(machine-code debuggers)와 같은 일부 낮은 수준의 도구는 수정이 필요할 것입니다. 예를 들어, Python용 gdb 스크립트는 C 프레임당 하나 이상의 Python 프레임이 있을 수 있음을 인지해야 할 것입니다.

`Py_EnterRecursiveCall()`, `PyLeaveRecursiveCall()` 함수 쌍을 사용하는 C 코드는 계속 올바르게 작동할 것입니다. 또한, `Py_EnterRecursiveCall()`은 `StackOverflow` 예외를 발생시킬 수 있습니다.

새로운 코드는 재귀 제한과 관련하여 Python 함수 호출로 간주되기를 원하지 않는 한 `Py_CheckStackDepth()` 함수를 사용해야 합니다.

Cython 생성 함수와 같은 "Python과 유사한(python-like)" 코드는 `Py_EnterRecursiveCall()`을 사용하고, 다른 코드는 `Py_CheckStackDepth()`를 사용할 것을 권장합니다.

## 보안 영향 (Security Implications)
재귀를 통해 CPython 가상 머신을 충돌시키는 것이 더 이상 불가능해질 것입니다.

## 성능 영향 (Performance Impact)
성능 영향은 중요하지 않을 것으로 예상됩니다.

필요한 추가 로직은 성능에 매우 작은 부정적인 영향을 미칠 것입니다. C 스택 사용 감소로 인한 참조 지역성(locality of reference) 향상은 작은 긍정적인 영향을 미칠 것입니다.

전반적인 효과가 긍정적일지 부정적일지 예측하기 어렵지만, 순 효과는 측정하기에는 너무 작을 가능성이 높습니다.

## 구현 (Implementation)

### C 스택 소비 모니터링 (Monitoring C stack consumption)
C 스택 오버플로우가 임박했는지 측정하는 것은 어렵습니다. 따라서 보수적으로 접근해야 합니다. 스택의 안전한 경계(safe bounds)를 결정해야 하는데, 이는 이식성 있는 C 코드(portable C code)에서는 불가능합니다.

주요 플랫폼의 경우, 플랫폼별 API를 사용하여 정확한 스택 경계를 제공할 것입니다. 그러나 마이너 플랫폼의 경우 어느 정도 추측이 필요할 수 있습니다. 이는 좋지 않게 들릴 수 있지만, `_PyEval_EvalFrameDefault`에서 `_PyEval_EvalFrameDefault`로 이어지는 호출 체인에 필요한 스택 공간의 최소 1000배가 C 스택 크기라고 추측하는 현재 상황보다 나쁘지 않습니다.

이는 일부 경우에 가능한 재귀 양이 줄어들 수 있음을 의미합니다. 그러나 일반적으로 많은 호출이 C 스택을 사용하지 않으므로 가능한 재귀 양은 증가해야 합니다.

C 스택에 대한 제한을 결정하는 일반적인 접근 방식은 호출 체인에서 가능한 한 빨리 현재 C 프레임 내의 주소를 얻는 것입니다. 그 다음, 해당 주소에 상수를 더하여 제한을 추측할 수 있습니다.

### C 스택을 소비하지 않는 Python-to-Python 호출 (Making Python-to-Python calls without consuming the C stack)
인터프리터 내의 호출은 `CALL_FUNCTION`, `CALL_FUNCTION_KW`, `CALL_FUNCTION_EX`, `CALL_METHOD` 명령에 의해 처리됩니다. 이러한 명령에 대한 코드는 Python 함수 또는 메서드가 호출될 때 C에서 호출을 수행하는 대신, 인터프리터가 호출 대상의 프레임(callee's frame)을 설정하고 평소처럼 해석을 계속하도록 수정될 것입니다.

`RETURN_VALUE` 명령은 역 작업을 수행하며, 현재 프레임이 인터프리터의 엔트리 프레임(entry frame)일 때는 평소처럼 반환됩니다.

## 거절된 아이디어 (Rejected Ideas)
현재까지 없음.

## 미해결 문제 (Open Issues)
현재까지 없음.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain) 또는 CC0-1.0-Universal 라이선스(둘 중 더 허용적인 것) 하에 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.