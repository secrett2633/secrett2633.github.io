---
title: "[Draft] PEP 793 - PyModExport: A new entry point for C extension modules"
excerpt: "Python Enhancement Proposal 793: 'PyModExport: A new entry point for C extension modules'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/793/
toc: true
toc_sticky: true
date: 2025-09-27 14:07:12+0900
last_modified_at: 2025-09-27 14:07:12+0900
published: true
---
> **원문 링크:** [PEP 793 - PyModExport: A new entry point for C extension modules](https://peps.python.org/pep-0793/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 23-May-2025



## PEP 793: PyModExport - C 확장 모듈을 위한 새로운 진입점

*   **작성자:** Petr Viktorin
*   **상태:** Draft (초안)
*   **생성일:** 2025년 5월 23일
*   **Python 버전:** 3.15

### 개요 (Abstract)
PEP 793은 C 확장 모듈을 위한 새로운 진입점(entry point)을 제안합니다. 이 진입점을 통해 개발자들은 `PyModuleDef` 구조체 없이 `PyModuleDef_Slot` 구조체 배열을 사용하여 모듈을 정의할 수 있습니다. 이는 확장 모듈 개발자들이 정적으로 할당된 `PyObject`를 사용하지 않도록 하여, 단일 컴파일된 라이브러리 파일이 일반(regular) 빌드와 자유 스레딩(free-threaded) 빌드 CPython 모두에서 사용 가능하도록 하는 가장 큰 장애물을 제거합니다.

이 제안은 `PyModuleDef`의 필드를 대체할 새로운 모듈 슬롯 타입을 명시하고, `Py_tp_token`과 유사한 토큰을 추가할 수 있도록 합니다. 또한 슬롯을 사용하여 모듈을 동적으로 정의하는 API도 추가합니다. 기존 `PyInit_*` API는 소프트 비권장(soft-deprecated)됩니다. 즉, 경고 없이 계속 작동하고 문서화 및 지원되지만, 새 기능은 추가되지 않을 예정입니다.

### 배경 및 동기 (Background & Motivation)

**문제점:**
Python 객체의 메모리 레이아웃은 일반 빌드와 자유 스레딩 빌드 간에 다릅니다. 따라서 두 가지 빌드 모두를 지원하는 ABI(Application Binary Interface)는 현재의 `PyObject` 메모리 레이아웃을 포함할 수 없습니다. 기존 ABI와의 호환성을 유지하기 위해 정적으로 할당된 Python 객체를 지원할 수 없습니다.

대부분의 확장 모듈에 필요하며 거의 모든 경우에 정적으로 할당되는 객체는 모듈 내보내기 훅(`PyInit_*` 함수)에서 반환되는 `PyModuleDef`입니다.

**인터프리터 전환 (The interpreter switch):**
Python 3.12에서는 모듈이 서브 인터프리터(sub-interpreter)에 로드될 수 있는지 표시하는 `Py_mod_multiple_interpreters` 슬롯이 추가되었습니다. 이 슬롯을 "지원하지 않음(not supported)" 값으로 설정하면 확장이 메인 인터프리터에서만 로드될 수 있음을 나타냅니다.

문제는 Python이 모듈 내보내기 훅을 호출해야만 이 정보를 얻을 수 있다는 점입니다. 싱글 페이즈(single-phase) 모듈의 경우, 이는 모듈 객체를 생성하고 임의의 초기화 코드를 실행합니다. `Py_mod_multiple_interpreters`를 "지원하지 않음"으로 설정한 모듈의 경우, 이 초기화는 메인 인터프리터에서 이루어져야 합니다.

이를 위해, 새로운 모듈이 서브 인터프리터에 로드되면 Python은 임시적으로 메인 인터프리터로 전환하고, 그곳에서 내보내기 훅을 호출한 다음, 다시 원래 인터프리터로 전환하거나 가져오기를 실패하게 합니다. 이러한 불필요하고 취약한 추가 작업은 근본적인 설계 문제를 보여줍니다. 즉, Python은 확장 모듈이 잠재적으로 완전히 자신을 초기화하기 전에 해당 확장에 대한 정보를 얻을 방법이 없습니다.

### 제안의 근거 (Rationale)

정적으로 할당된 `PyObject*`를 요구하는 모듈 내보내기 훅을 피하기 위해 두 가지 옵션이 고려되었습니다.

1.  **동적으로 할당된 객체 반환:** 인터프리터로 소유권이 이전되는 동적으로 할당된 객체를 반환합니다. 이 구조체는 기존 `PyModuleDef`와 매우 유사할 수 있지만, 참조 카운트(reference-counted)되어야 합니다.
2.  **새로운 내보내기 훅 추가:** `PyObject*`를 반환하지 않는 새로운 내보내기 훅을 추가합니다.

PEP 489에서 Python 3.5를 위해 두 번째 옵션이 고려되었으나, `PyInit` 훅 이름을 유지하는 것이 더 간단한 해결책으로 판단되어 기각되었습니다. 그러나 10년이 지난 지금, 그 선택의 함의를 수정하는 작업은 더 이상 간단하지 않습니다.

새로운 훅은 Python이 "인터프리터 전환" 문제를 피할 수 있도록 합니다. 효과적으로 이는 다중 페이즈 초기화(multi-phase initialization)에 새로운 단계를 추가하여 Python이 모듈의 호환성을 미리 확인할 수 있게 합니다.

**래퍼 구조체 없는 슬롯 사용 (Using slots without a wrapper struct):**
기존 `PyModuleDef`는 고정 필드와 "slots" 배열을 가진 구조체입니다. 슬롯과 달리 고정 필드는 개별적으로 비권장하거나 교체할 수 없습니다. 이 제안은 고정 필드를 제거하고 래퍼 구조체 없이 슬롯 배열을 직접 사용하는 것을 제안합니다.

**토큰 (Tokens):**
정적 `PyModuleDef`는 모듈 생성 방법을 설명하는 것 외에 또 다른 목적을 가집니다. 모듈 객체에 연결된 정적으로 할당된 싱글톤으로서, 확장 개발자가 주어진 Python 모듈이 "자신의 것"인지 확인할 수 있게 합니다. 즉, 모듈 객체가 알려진 `PyModuleDef`를 가지면 해당 모듈 상태는 알려진 메모리 레이아웃을 가집니다.

유형(type)의 경우 유사한 문제가 `Py_tp_token`을 추가함으로써 해결되었습니다. 이 제안은 모듈에도 동일한 메커니즘을 추가합니다.

**기존 내보내기 훅의 소프트 비권장 (Soft-deprecating the existing export hook):**
기존 확장의 개발자가 여기에 제안된 API로 전환할 유일한 이유는 단일 모듈이 자유 스레딩 및 비자유 스레딩 빌드 모두에서 작동하도록 허용하기 때문입니다. Python이 이를 허용하는 것이 중요하지만, 많은 기존 모듈의 경우 Python 3.14 이하 버전과의 호환성을 잃을 가치가 없습니다.

따라서, 이 PEP는 `PyInit_*` 방식에 새로운 기능을 추가하는 것을 중단할 것을 제안합니다. 결국, 확장 개발자가 전환하기에 가장 좋은 시점은 어차피 모듈 초기화를 수정하려는 때입니다.

### 명세 (Specification)

**새로운 내보내기 훅:**
확장 모듈을 가져올 때, Python은 이제 다음과 같은 내보내기 훅을 먼저 찾습니다.

```c
PyModuleDef_Slot *PyModExport_<NAME>(PyObject *spec);
```

`<NAME>`은 모듈의 이름입니다. 비 ASCII 이름의 경우, `PyModExportU_<NAME>`을 찾으며, `<NAME>`은 기존 `PyInitU_*` 훅과 같이 인코딩됩니다.

만약 찾지 못하면, 이전 Python 버전과 동일하게 (`PyInit_*` 또는 `PyInitU_*` 함수를 찾아) 가져오기가 계속됩니다.

훅을 찾으면, Python은 적절한 `importlib.machinery.ModuleSpec` 객체를 `spec`으로 사용하여 훅을 호출합니다. 훅은 성공 시 `PyModuleDef_Slot` 구조체 배열에 대한 포인터를 반환해야 하며, 실패 시 `NULL`을 반환하고 예외를 설정해야 합니다.

**동적 생성 (Dynamic creation):**
슬롯 배열에서 모듈을 생성하는 새로운 함수가 추가됩니다:

```c
PyObject *PyModule_FromSlotsAndSpec(PyModuleDef_Slot *slots, PyObject *spec)
```
`slots` 인수는 `PyModuleDef_Slot` 구조체 배열을 가리켜야 하며, `{0}`으로 끝나는 슬롯으로 종료되어야 합니다.

모듈의 `exec` 슬롯(들)을 실행하는 새로운 함수 `PyModule_Exec`도 추가됩니다.

```c
int PyModule_Exec(PyObject *module)
```
이 함수는 모듈을 완전히 초기화하는 데 필요하며, `PyModule_FromSlotsAndSpec`는 이를 실행하지 않습니다.

**토큰 (Tokens):**
모듈 객체는 선택적으로 "토큰"을 저장합니다. 이는 유형(type)의 `Py_tp_token`과 유사한 `void*` 포인터입니다.

새로운 `Py_mod_token` 슬롯을 사용하여 지정된 경우, 모듈 토큰은 모듈보다 오래 존재해야 하며 해당 확장 모듈에 "속해야" 합니다. `PyModule_GetToken` 함수가 추가되어 토큰을 얻을 수 있습니다.

**새로운 슬롯 (New slots):**
`PyModuleDef_HEAD_INIT`를 제외한 `PyModuleDef` 구조체의 각 필드에 대해 새로운 슬롯 ID가 제공됩니다. 예를 들어, `Py_mod_name`, `Py_mod_doc`, `Py_mod_clear` 등이 있습니다. 모듈 객체보다는 모듈 상태와 관련된 슬롯은 `Py_mod_state_` 접두사를 사용합니다.

**기존 내보내기 훅의 소프트 비권장 (Soft-deprecating the existing export hook):**
`PyInit_*` 내보내기 훅은 소프트 비권장됩니다.

**새로운 API 요약 (New API summary):**
새로운 모듈 내보내기 훅: `PyModExport_<NAME>` 및 `PyModExportU_<ENCODED_NAME>`
새로운 함수:
*   `PyObject *PyModule_FromSlotsAndSpec(PyModuleDef_Slot *, PyObject *spec)`
*   `int PyModule_Exec(PyObject *)`
*   `int PyModule_GetToken(PyObject *, void**)`
*   `PyObject *PyType_GetModuleByToken(PyTypeObject *type, void *token)`
*   `int PyModule_GetStateSize(PyObject *, Py_ssize_t *result)`

새로운 매크로: `PyMODEXPORT_FUNC`

새로운 슬롯 타입: `Py_mod_name`, `Py_mod_doc`, `Py_mod_state_size`, `Py_mod_methods`, `Py_mod_state_traverse`, `Py_mod_state_clear`, `Py_mod_state_free`, `Py_mod_token`

이 모든 것은 Limited API에 추가될 예정입니다.

### 하위 호환성 (Backwards Compatibility)

기존 모듈이 새 메커니즘을 사용하도록 포팅되면 `PyModule_GetDef`는 해당 모듈에 대해 `NULL`을 반환하기 시작합니다. 이는 모듈이 정의된 방식이 해당 모듈의 구현 세부 사항이므로 호환성을 깨는 변경으로 간주되어서는 안 됩니다.

`PyType_GetModuleByDef` 함수는 이제 `def` 인수로 모듈 토큰을 허용합니다.

### 포팅 가이드 (Porting Guide)

기존 모듈을 새 API로 변환하기 위한 가이드입니다.

1.  **`PyModule_GetDef` 사용 검토:** 이 함수는 새 메커니즘을 사용하는 모듈에 대해 `NULL`을 반환합니다. 대신 `PyModule_GetNameObject`나 `__doc__` 속성, `PyModule_GetStateSize` 등을 사용하여 모듈의 속성을 얻거나, 모듈 객체가 "자신의 것"인지 테스트하려면 `PyModule_GetToken`을 사용합니다.
2.  **`PyType_GetModuleByDef` 사용 검토:** 이를 `PyType_GetModuleByToken`으로 대체하는 것을 고려합니다. (하위 호환성을 위해 `PyType_GetModuleByDef`가 토큰을 허용하도록 변경됩니다.)
3.  **`Py_mod_create` 함수 검토:** 이 함수의 두 번째 인수가 `NULL`로 호출될 수 있으므로 사용하지 않도록 합니다. 대신 기존 `PyModuleDef` 구조체를 직접 사용합니다.
4.  **`Py_mod_exec` 슬롯 통합:** 여러 `Py_mod_exec` 슬롯이 있는 경우 하나로 통합합니다.
5.  **새로운 `PyModuleDef_Slot` 배열 생성:** 기존 `PyModuleDef`의 `m_slots` 멤버가 가리키는 `PyModuleDef_Slot` 배열을 복사하거나 새로 생성합니다.
6.  **새로운 슬롯 추가:** 기존 `PyModuleDef` 구조체의 모든 멤버에 대한 슬롯을 추가합니다. 예: `Py_mod_name`, `Py_mod_doc` 등.
7.  **`Py_mod_token` 슬롯 추가:** `PyModule_GetToken` 또는 `PyType_GetModuleByToken`을 사용하는 경우, 기존 `PyModuleDef` 구조체를 가리키는 `Py_mod_token` 슬롯을 추가합니다.
8.  **새로운 내보내기 훅 추가:** `PyMODEXPORT_FUNC PyModExport_examplemodule(PyObject *spec)`와 같은 형식의 훅을 추가하여 새로 정의한 슬롯 배열을 반환합니다.
9.  **하위 버전 지원 중단 시 `PyInit_` 함수 제거:** 모듈이 더 낮은 버전의 Python을 지원하지 않게 되면 `PyInit_` 함수와 사용되지 않는 `PyModuleDef` 구조체를 제거할 수 있습니다.

### 보안 관련 사항 (Security Implications)
알려진 보안 관련 사항은 없습니다.

### 교육 방법 (How to Teach This)
정기적인 참조 문서 외에, 포팅 가이드를 새로운 HOWTO 문서로 추가해야 합니다.

### 예시 (Example)
(PEP 문서에 포함된 C 코드 예시를 번역 대신 간략히 설명합니다.)
이 PEP는 C 수준의 모듈 전역 상태를 가지는 예시 모듈을 제공하며, 이 모듈은 일반 빌드와 자유 스레딩 빌드 모두에서 성공적으로 실행됩니다. 이 예시는 `Py_LIMITED_API`를 사용하여 CPython 버전별 ABI 종속성을 피하고, 새로운 `PyModExport` 훅과 `PyModuleDef_Slot` 배열을 사용하여 모듈을 정의합니다.

### 가능한 향후 방향 (Possible Future Directions)
*   **슬롯 개선:** `void *` 사용으로 인한 타입 안전성 문제 및 알려지지 않은 슬롯 ID에 대한 제한된 전방 호환성 문제를 해결할 수 있습니다.
*   **기본값 업데이트:** `Py_mod_multiple_interpreters` 및 `Py_mod_gil` 슬롯의 기본값을 업데이트할 수 있습니다.
*   **inittab:** `inittab`에서 `PyModuleDef` 없는 슬롯을 허용해야 할 수도 있습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.