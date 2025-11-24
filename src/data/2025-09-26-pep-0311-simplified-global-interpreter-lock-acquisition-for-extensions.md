---
title: "[Final] PEP 311 - Simplified Global Interpreter Lock Acquisition for Extensions"
excerpt: "Python Enhancement Proposal 311: 'Simplified Global Interpreter Lock Acquisition for Extensions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/311/
toc: true
toc_sticky: true
date: 2025-09-26 18:12:03+0900
last_modified_at: 2025-09-26 18:12:03+0900
published: true
---
> **원문 링크:** [PEP 311 - Simplified Global Interpreter Lock Acquisition for Extensions](https://peps.python.org/pep-0311/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 05-Feb-2003

다음은 PEP 311 문서의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다.

---

# PEP 311 – 확장 모듈을 위한 GIL(Global Interpreter Lock) 획득 간소화

*   **작성자**: Mark Hammond
*   **상태**: Final
*   **유형**: Standards Track
*   **생성일**: 2003년 2월 5일
*   **Python 버전**: 2.3

## 개요 (Abstract)

이 PEP(Python Enhancement Proposal)는 Python 확장 모듈이 GIL(Global Interpreter Lock)에 접근하기 위한 API를 간소화할 것을 제안합니다. 특히, Python의 현재 상태(즉, GIL의 상태)를 알 수 없는 복잡한 다중 스레드 확장 모듈 작성자들을 위한 해결책을 제공합니다.

이 PEP는 스레딩 지원과 함께 빌드된 플랫폼을 위해 Python 스레드 상태를 관리하는 새로운 API를 제안합니다. 초기, 플랫폼 독립적인 구현 전략과 함께 구현 방안도 제시됩니다.

## 배경 (Rationale)

현재 Python 인터프리터 상태 API는 간단한 단일 스레드 확장 모듈에는 적합하지만, 복잡한 다중 스레드 확장 모듈에서는 금세 매우 복잡해집니다.

현재 Python은 GIL을 처리하기 위한 두 가지 메커니즘을 제공합니다.

1.  **`Py_BEGIN_ALLOW_THREADS` 및 `Py_END_ALLOW_THREADS` 매크로**: 이 매크로들은 주로 GIL을 이미 소유하고 있는 간단한 Python 확장 모듈이 '외부' (즉, Python이 아닌), 일반적으로 비용이 많이 드는 호출을 하는 동안 임시적으로 GIL을 해제할 수 있도록 제공됩니다. GIL을 기다리며 블록된 모든 기존 Python 스레드들은 이때 실행될 수 있습니다. 이는 Python에서 외부로 호출을 하는 확장 모듈에는 적합하지만, 스레드 상태를 알 수 없을 때 Python을 호출해야 하는 확장 모듈에는 도움이 되지 않습니다.
2.  **`PyThreadState` 및 `PyInterpreterState` API**: 이 API 함수들은 확장 모듈/임베디드 애플리케이션이 GIL을 획득할 수 있도록 하지만, 심각한 부트스트랩(boot-strapping) 문제에 직면합니다. 즉, 이들을 사용하기 전에 Python 인터프리터와 GIL의 상태를 알아야 합니다. 특히, Python이 이전에 본 적 없는 스레드를 처리해야 하지만, 이 스레드에서 Python을 호출해야 하는 확장 모듈 작성자들에게 문제가 됩니다. 이러한 '새로운' 스레드들이 항상 GIL의 정확한 상태를 알고 있어서 이 API와 안정적으로 상호작용할 수 있도록 확장 모듈을 작성하는 것은 매우 어렵고 섬세하며 오류 발생 가능성이 높습니다.

이러한 이유로, 이러한 확장 모듈이 Python과 어떻게 상호작용해야 하는지에 대한 질문은 빠르게 FAQ(자주 묻는 질문)가 되고 있습니다. 이 PEP의 주요 동기는 `python-dev` 스레드에서 비롯되었으며, 즉시 다음과 같은 프로젝트들이 이와 동일한 문제를 겪고 있음을 확인했습니다:

*   win32all 확장 모듈
*   Boost
*   ctypes
*   Python-GTK 바인딩
*   Uno
*   PyObjC
*   Mac toolbox
*   PyXPCOM

현재 이 문제에 대한 합리적이고 이식성 있는(portable) 해결책이 없어서, 각 확장 모듈 작성자는 자신만의 수동 버전을 구현해야 합니다. 게다가 이 문제는 복잡하기 때문에, 많은 구현에서 오류가 발생할 가능성이 높으며, 이는 종종 단순히 "Python이 멈췄다"와 같은 다양한 문제로 나타날 수 있습니다.

기존 스레드 상태 API의 가장 큰 문제는 잠금(lock)의 현재 상태를 쿼리(query)할 수 없다는 것이지만, 확장 모듈 작성자에게 더 완전하고 간소화된 해결책이 제공되어야 한다고 판단했습니다. 이러한 해결책은 작성자들이 Python의 스레딩 메커니즘을 최대한 활용하는 오류 없는 복잡한 확장 모듈을 제공하도록 장려할 것입니다.

## 제한 사항 및 제외 사항 (Limitations and Exclusions)

이 제안은 복잡한 다중 스레드 요구사항을 가지지만 단일 `PyInterpreterState`만 필요한 확장 모듈 작성자를 위한 해결책을 제시합니다. 여러 인터프리터 상태를 요구하는 확장 모듈을 위한 시도는 없습니다. 작성 당시, 여러 `PyInterpreterState`를 요구하는 확장 모듈은 확인되지 않았으며, 실제로 해당 기능이 Python 자체에서 올바르게 작동하는지도 불분명합니다.

이 API는 Python의 자동 초기화를 수행하거나 다중 스레드 작동을 위해 Python을 초기화하지 않습니다. 확장 모듈 작성자는 계속해서 `Py_Initialize()`를 호출해야 하며, 다중 스레드 애플리케이션의 경우 `PyEval_InitThreads()`를 호출해야 합니다. 그 이유는 `PyEval_InitThreads()`를 호출하는 첫 번째 스레드가 Python에 의해 "메인 스레드"로 지정되기 때문에, 확장 모듈 작성자가 메인 스레드를 지정하도록 요구(첫 번째 호출을 하도록 요구)함으로써 모호성을 제거하기 위함입니다. `Py_Initialize()`는 `PyEval_InitThreads()`보다 먼저 호출되어야 하며, 이 두 함수 모두 현재 여러 번 호출을 지원하므로, 이는 확장 모듈 작성자에게 합리적인 부담으로 간주됩니다.

이 API는 Python GIL을 획득하는 데 필요한 모든 것이 될 것입니다. 기존의 표준 `Py_BEGIN_ALLOW_THREADS` 및 `Py_END_ALLOW_THREADS` 매크로를 제외하고는, 추가적인 스레드 상태 API 함수가 확장 모듈에 의해 사용되지 않을 것으로 가정합니다. 이러한 복잡한 요구사항을 가진 확장 모듈은 기존 스레드 상태 API를 계속 사용할 수 있습니다.

## 제안 (Proposal)

이 제안은 GIL 관리를 간소화하기 위해 Python에 새로운 API를 추가할 것을 권장합니다. 이 API는 `WITH_THREAD`가 정의된 모든 플랫폼에서 사용할 수 있습니다.

Python이 올바르게 초기화되었다고 가정할 때, 확장 모듈 작성자는 언제든지 어떤 스레드에서든 작고 잘 정의된 "프롤로그 댄스(prologue dance)"를 사용하여 해당 스레드에서 Python을 사용할 준비가 되었는지 확인할 수 있도록 하는 것이 목표입니다. 확장 모듈이 Python 사용을 마친 후에는 이전에 획득한 리소스를 해제하기 위해 "에필로그 댄스(epilogue dance)"를 수행해야 합니다. 이상적으로, 이러한 댄스는 단일 라인으로 표현될 수 있습니다.

구체적으로, 다음과 같은 새로운 API가 제안됩니다.

```c
/* Python의 현재 상태 또는 스레드 잠금 상태에 관계없이 현재 스레드가 Python C API를 호출할 준비가 되었는지 확인합니다.
이 함수는 각 호출이 PyGILState_Release() 호출과 짝을 이룬다면 스레드에 의해 원하는 만큼 여러 번 호출될 수 있습니다.
일반적으로, PyGILState_Ensure()와 PyGILState_Release() 호출 사이에 다른 스레드 상태 API를 사용할 수 있지만,
Release() 전에 스레드 상태가 이전 상태로 복원되어야 합니다. 예를 들어, Py_BEGIN_ALLOW_THREADS/Py_END_ALLOW_THREADS 매크로의
정상적인 사용은 허용됩니다.
반환 값은 PyGILState_Acquire()가 호출되었을 때의 스레드 상태에 대한 불투명한 "핸들"이며,
Python이 동일한 상태로 유지되도록 PyGILState_Release()에 전달되어야 합니다.
재귀적 호출은 허용되지만, 이 핸들은 공유될 수 없습니다. PyGILState_Ensure에 대한 각 고유한 호출은
자신의 PyGILState_Release 호출을 위해 핸들을 저장해야 합니다.
함수가 반환될 때, 현재 스레드는 GIL을 보유하게 됩니다. 실패는 치명적인 오류입니다. */
PyAPI_FUNC(PyGILState_STATE) PyGILState_Ensure(void);

/* 이전에 획득한 모든 리소스를 해제합니다. 이 호출 후에 Python의 상태는 해당 PyGILState_Acquire 호출 이전과 동일하게 됩니다
(그러나 일반적으로 이 상태는 호출자에게 알려지지 않으므로 GILState API를 사용합니다).
PyGILState_Ensure에 대한 모든 호출은 동일한 스레드에서 PyGILState_Release 호출과 짝을 이루어야 합니다. */
PyAPI_FUNC(void) PyGILState_Release(PyGILState_STATE);
```

일반적인 사용법은 다음과 같습니다.

```c
void SomeCFunction(void) {
    /* 잠금을 보유하고 있는지 확인합니다 */
    PyGILState_STATE state = PyGILState_Ensure();

    /* Python API를 사용합니다 */
    ...

    /* Python의 상태를 복원합니다 */
    PyGILState_Release(state);
}
```

## 설계 및 구현 (Design and Implementation)

`PyGILState_Ensure()`의 일반적인 작동 방식은 다음과 같습니다.

1.  Python이 초기화되었는지 확인합니다.
2.  현재 스레드에 대한 `PyThreadState`를 가져오고, 필요한 경우 생성하고 저장합니다.
3.  잠금의 현재 상태(소유됨/소유되지 않음)를 기억합니다.
4.  현재 상태가 GIL을 소유하지 않은 경우, GIL을 획득합니다.
5.  현재 스레드에서 `PyGILState_Ensure`가 호출된 횟수를 증가시킵니다.
6.  반환합니다.

`PyGILState_Release()`의 일반적인 작동 방식은 다음과 같습니다.

1.  현재 스레드가 잠금을 보유하고 있는지 확인합니다.
2.  이전 상태가 잠금이 이전에 잠금 해제되었음을 나타내면 GIL을 해제합니다.
3.  스레드에 대한 `PyGILState_Ensure` 카운터를 감소시킵니다.
4.  카운터가 0이면:
    *   `PyThreadState`를 해제하고 삭제합니다.
    *   `ThreadState`가 스레드에 의해 소유되는 것으로부터 잊어버립니다.
5.  반환합니다.

단일 스레드에 두 개의 개별 `PyThreadState`가 사용되는 것은 오류로 가정됩니다. `pystate.h`의 주석("State unique per thread")은 이 관점을 지지하지만, 직접적으로 명시되지는 않습니다. 따라서 이는 스레드 로컬 저장소(Thread Local Storage)의 일부 구현을 필요로 할 것입니다. 다행히도, Python 소스 트리 내 SGI 스레딩 포트에는 플랫폼 독립적인 스레드 로컬 저장소 구현이 이미 존재합니다. 이 코드는 플랫폼 독립적인 Python 코어에 통합될 것이지만, 플랫폼이 원하는 경우 더 최적화된 구현을 제공할 수 있는 방식으로 통합될 것입니다.

## 구현 (Implementation)

이 제안의 구현은 [https://bugs.python.org/issue684256](https://bugs.python.org/issue684256) 에서 찾을 수 있습니다.

## 참조 (References)

 David Abrahams, Extension modules, Threading, and the GIL [https://mail.python.org/pipermail/python-dev/2002-December/031424.html](https://mail.python.org/pipermail/python-dev/2002-December/031424.html)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.