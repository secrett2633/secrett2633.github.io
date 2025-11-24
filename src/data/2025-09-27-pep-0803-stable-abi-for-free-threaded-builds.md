---
title: "[Draft] PEP 803 - Stable ABI for Free-Threaded Builds"
excerpt: "Python Enhancement Proposal 803: 'Stable ABI for Free-Threaded Builds'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/803/
toc: true
toc_sticky: true
date: 2025-09-27 14:09:56+0900
last_modified_at: 2025-09-27 14:09:56+0900
published: true
---
> **원문 링크:** [PEP 803 - Stable ABI for Free-Threaded Builds](https://peps.python.org/pep-0803/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 19-Aug-2025


---

## PEP 803 – 자유 스레드 빌드를 위한 Stable ABI

### 개요 (Abstract)

이 PEP (Python Enhancement Proposal)는 Python 3.15 버전의 Stable ABI가 자유 스레드(free-threaded) 빌드와 GIL-enabled 빌드 모두와 호환되도록 제안합니다. 이를 위해, PyObject 내부 구조 및 관련 API는 Limited API 3.15 버전에서 제거될 예정이며, 모듈 정의 및 대부분의 클래스와 같은 일반적인 작업을 위한 새로운 API로 마이그레이션이 필요합니다. Limited API 버전 3.15 이상으로 빌드된 이진 배포판(휠)은 `abi3.abi3t` ABI 태그를 사용해야 합니다.

### 용어 (Terminology)

이 PEP에서 "GIL-enabled build"는 `Py_GIL_DISABLED` 없이 빌드된 인터프리터 또는 확장 기능을 의미하는 "free-threaded build"의 반의어로 사용됩니다.

### 동기 (Motivation)

현재 Stable ABI는 자유 스레드 빌드에서는 사용할 수 없습니다. `Py_LIMITED_API`가 정의된 경우 확장 기능은 빌드에 실패하며, CPython의 GIL-enabled 빌드를 위해 빌드된 확장 기능은 자유 스레드 빌드에서 로드되지 않거나 (또는 충돌) 발생합니다.

PEP 779 수락 게시물에서 Steering Council은 "Python 3.15를 위해 자유 스레딩용 Stable ABI가 준비되고 정의되어야 한다"고 밝혔습니다. 이 PEP는 자유 스레딩을 위한 Stable ABI를 제안합니다.

### 배경 (Background)

PEP 384 및 PEP 652에 정의된 Python의 Stable ABI는 CPython 인터프리터의 여러 마이너 버전에서 로드할 수 있는 확장 모듈을 컴파일하는 방법을 제공합니다. 여러 프로젝트에서 이를 사용하여 각 릴리스에 대해 빌드 및 배포해야 하는 휠(이진 아티팩트)의 수를 제한하거나, Python의 사전 릴리스 버전으로 쉽게 테스트할 수 있도록 합니다.

자유 스레드 빌드(PEP 703)가 궁극적으로 기본값(PEP 779)이 되는 방향으로 진행됨에 따라, 이러한 빌드에서 Stable ABI를 사용할 수 있도록 하는 방법이 필요합니다.

Stable ABI에 대해 빌드하려면 확장 기능은 Limited API를 사용해야 합니다. 이는 CPython이 노출하는 함수, 구조 등의 하위 집합만을 의미합니다. Limited API는 버전이 지정되며, Limited API 3.X에 대해 빌드하면 CPython 3.X 및 이후 버전과 ABI 호환되는 확장 기능이 생성됩니다. 그러나 Limited API는 "안정적"이지 않습니다. 최신 버전은 이전 버전에 포함되었던 API를 제거할 수 있습니다. 이 PEP는 지금까지 가장 중요한 제거를 제안합니다.

### 이론적 근거 (Rationale)

이 PEP의 설계는 몇 가지 가정을 전제로 합니다.

*   **하나의 ABI:** 단일 컴파일된 확장 모듈은 자유 스레드 빌드와 GIL-enabled 빌드 모두를 지원해야 합니다.
*   **현재는 하위 호환성 없음:** 새로운 Limited API는 CPython 3.14 이하를 지원하지 않습니다. 이러한 지원이 필요한 프로젝트는 3.14 자유 스레드 인터프리터 및 이전 Stable ABI 버전을 위해 별도의 확장 기능을 빌드할 수 있습니다.
*   **API 변경은 허용됨:** 새로운 Limited API는 확장 기능 작성자에게 코드에 상당한 변경을 요구할 수 있습니다. 아직 이를 수행할 수 없는 프로젝트는 Limited API 3.14를 계속 사용하여 GIL-enabled 빌드와만 호환되는 확장 기능을 생성할 수 있습니다.
*   **추가 구성 없음:** API 가용성 및 ABI 호환성에 영향을 미치는 새로운 "노브(knobs)"는 도입되지 않습니다.

### 사양 (Specification)

#### 불투명 PyObject (Opaque PyObject)

Limited API 3.15 버전은 다음을 수행합니다.

*   다음 구조체를 불투명(C 용어로는 불완전한 타입)하게 만듭니다: `PyObject`, `PyVarObject`, `PyModuleDef_Base`, `PyModuleDef`.
*   더 이상 다음 매크로를 포함하지 않습니다: `PyObject_HEAD`, `_PyObject_EXTRA_INIT`, `PyObject_HEAD_INIT`, `PyObject_VAR_HEAD`, `Py_SET_TYPE()`.
*   다음 매크로를 함수로 ABI에 내보냅니다: `Py_SIZE()`, `Py_SET_SIZE()`.

#### 영향 (Implications)

`PyObject`, `PyVarObject`, `PyModuleDef` 구조체를 불투명하게 만든다는 것은 다음을 의미합니다.

*   **필드에 직접 접근할 수 없습니다.** 예를 들어, `o->ob_type` 대신 `Py_TYPE(o)`를 사용해야 합니다.
*   **크기와 정렬을 사용할 수 없습니다.** `sizeof(PyObject)`와 같은 표현식은 더 이상 작동하지 않습니다.
*   **다른 구조체에 임베드할 수 없습니다.** 이는 주로 PEP 697에서 추가된 API(즉, `PyObject` 또는 다른 기본 클래스 구조체 없이 `struct`를 사용하고 메모리 접근을 위해 `PyObject_GetTypeData()` 호출이 필요한)를 사용하여 정의해야 하는 확장 정의 타입의 인스턴스 구조체에 영향을 미칩니다.
*   **이러한 타입의 변수를 생성할 수 없습니다.** 이는 주로 확장 모듈을 정의하는 데 필요한 정적 `PyModuleDef` 변수에 영향을 미칩니다. 확장 기능은 PEP 793에서 추가된 API로 전환해야 합니다.

다음 함수는 새 Limited API에서 확장 기능이 유효하고 정적으로 할당된 입력을 생성할 수 없으므로 사실상 사용할 수 없게 됩니다. 확장 개발자의 전환을 용이하게 하기 위해 아직 Limited API에서 제거되지는 않습니다.

*   `PyModuleDef_Init()`
*   `PyModule_Create()`, `PyModule_Create2()`
*   `PyModule_FromDefAndSpec()`, `PyModule_FromDefAndSpec2()`

#### 새로운 Export Hook (PEP 793)

이 PEP의 구현은 PEP 793 (PyModExport: C 확장 모듈을 위한 새로운 진입점)이 수락되어 확장 모듈을 정의하기 위한 새로운 "내보내기 훅(export hook)"을 제공해야 합니다. 새 훅 사용은 Limited API 3.15에서 필수 사항이 됩니다.

#### 런타임 ABI 검사 (Runtime ABI checks)

CPython은 오래되었거나 잘못 구성된 도구 또는 사람의 실수에 대한 방어책으로 기본 ABI 정보를 포함하는 새로운 모듈 슬롯을 추가할 것입니다. 이 정보는 모듈이 로드될 때 확인되며, 호환되지 않는 확장 기능은 거부됩니다. 이 슬롯은 PEP 793에서 추가된 새 내보내기 훅과 함께 필수가 됩니다.

*   **이전 abi3 확인:** 추가적으로, 자유 스레드 빌드에서는 `PyModuleDef_Init()`가 자유 스레딩 이전의 Stable ABI를 사용하는 확장 기능을 감지하고, 로드될 때 정보 메시지를 발행하며 예외를 발생시킵니다.

#### `abi3t` 휠 태그 (The abi3t wheel tag)

자유 스레드 CPython 빌드와 호환되는 Stable ABI를 사용하는 휠은 새로운 ABI 태그인 `abi3t`를 사용해야 합니다. Limited API 3.15를 사용하여 빌드된 휠은 GIL-enabled 빌드와 자유 스레드 빌드 모두와 호환되므로, `abi3.abi3t` 압축 ABI 태그 세트를 사용해야 합니다.

#### 새로운 API (New API)

이 PEP를 구현하면 자유 스레드 Python에서 성공적으로 로드할 수 있는 확장 기능을 빌드할 수 있지만, GIL 없이 스레드 안전한 것은 아닐 수 있습니다. GIL 없이 스레드 안전성을 허용하는 Limited API(예: `PyMutex`, `PyCriticalSection` 등)는 C API 워킹 그룹을 통해 또는 후속 PEP에서 추가될 예정입니다.

### 하위 및 상위 호환성 (Backwards and Forwards Compatibility)

Limited API 3.15는 PEP 793에서 추가된 새로운 `PyModExport` API를 사용해야 하므로 이전 CPython 릴리스와 하위 호환되지 않습니다. 전환할 수 없는 확장 기능 작성자는 Limited API 3.14 이하를 계속 사용할 수 있습니다. 자유 스레드 빌드와의 호환성을 위해서는 버전별 ABI를 사용하여 컴파일할 수 있습니다.

Limited API 3.15는 CPython 3.x의 향후 버전과 상위 호환됩니다. 이전 버전의 Limited API(3.14 이하)는 해당 Limited API를 도입한 버전부터 CPython 3.x의 GIL-enabled 빌드와 계속 상위 호환됩니다.

#### 호환성 개요 (Compatibility Overview)

다음 표는 휠 태그와 CPython 인터프리터 간의 호환성을 요약합니다. "GIL"은 GIL-enabled 인터프리터를 나타내고, "FT"는 자유 스레드 인터프리터를 나타냅니다.

| Wheel tag       | 3.14 (GIL) | 3.14 (FT) | 3.15 (GIL) | 3.15 (FT) | 3.16+ (GIL) | 3.16+ (FT) |
| :-------------- | :--------: | :-------: | :--------: | :-------: | :---------: | :-------: |
| `cp314-cp314`   |    ✅    |    ❌     |    ❌     |    ❌     |     ❌     |    ❌     |
| `cp314-cp314t`  |    ❌     |    ✅     |    ❌     |    ❌     |     ❌     |    ❌     |
| `cp314-abi3`    |    ✅    |    ❌     |    ✅    |    ❌     |     ✅     |    ❌     |
| `cp315-cp315`   |    ❌     |    ❌     |    ✅    |    ❌     |     ❌     |    ❌     |
| `cp315-cp315t`  |    ❌     |    ❌     |    ❌     |    ✅     |     ❌     |    ❌     |
| `cp315-abi3`    |    ❌     |    ❌     |    ✅    |    ❌     |     ✅     |    ❌     |
| `cp315-abi3.abi3t` |    ❌     |    ❌     |    ✅    |    ✅     |     ✅     |    ✅     |

다음 표는 주어진 인터프리터 및 `Py_LIMITED_API` 매크로로 빌드된 확장 기능에 대해 어떤 휠 태그를 사용해야 하는지 요약합니다.

| 휠 태그를 얻으려면… | 다음에서 컴파일… | `Py_LIMITED_API`를 다음으로 설정… | 참고    |
| :------------------ | :--------------: | :-----------------------------: | :------ |
| `cp314-cp314`       |   3.14 (GIL)   |            (미설정)            | 기존    |
| `cp314-cp314t`      |   3.14 (FT)    |            (미설정)            | 기존    |
| `cp314-abi3`        |   3.14+ (GIL)  |      `PY_PACK_VERSION(3, 14)`     | 기존    |
| `cp315-cp315`       |   3.15 (GIL)   |            (미설정)            | 계속됨  |
| `cp315-cp315t`      |   3.15 (FT)    |            (미설정)            | 계속됨  |
| `cp315-abi3`        |   3.15+ (GIL)  |      `PY_PACK_VERSION(3, 15)`     | 사용 중단 |
| `cp315-abi3.abi3t`  |   3.15+ (any)  |      `PY_PACK_VERSION(3, 15)`     | 신규    |

**참고 열의 값:**

*   **기존:** 휠 태그가 현재 사용 중입니다.
*   **계속됨:** 휠 태그가 기존 체계를 계속합니다.
*   **사용 중단:** 휠 태그가 기존 체계를 계속하지만, 사용이 권장되지 않습니다. 오래된 도구는 여전히 이를 생성할 수 있습니다.
*   **신규:** 이 PEP에서 제안되었습니다.

### 보안 영향 (Security Implications)

알려진 바 없습니다.

### 교육 방법 (How to Teach This)

PEP 697 (Limited C API for Extending Opaque Types) 및 PEP 793 (PyModExport)에서 추가된 API로 이동하는 방법을 설명하는 포팅 가이드가 필요합니다.

### 참조 구현 (Reference Implementation)

이 PEP는 여러 부분을 개별적으로 구현합니다.

*   불투명 `PyObject`는 `_Py_OPAQUE_PYOBJECT` 매크로 정의 후 CPython main 브랜치에서 사용할 수 있습니다.
*   `PyModExport`는 PEP 793을 참조하십시오.
*   버전 확인 슬롯은 GitHub pull request python/cpython#137212에서 구현되었습니다.
*   이전 `abi3` 확인은 GitHub pull request python/cpython#137957에서 구현되었습니다.
*   휠 태그에 대한 구현은 아직 없습니다.
*   포팅 가이드는 아직 작성되지 않았습니다.

### 거부된 아이디어 (Rejected Ideas)

*   **자유 스레딩을 위한 대체 Stable ABI 추가:** `abi3t`라는 새로운 Stable ABI를 추가하여 기존 `abi3`와 호환되지 않도록 하는 방안은 너무 복잡하고, `PyObject`의 자유 스레딩 메모리 레이아웃을 Stable ABI의 일부로 만들어 향후 조정을 방해할 수 있어 거부되었습니다.
*   **CPython 3.14와의 호환성을 위한 Shim:** 불투명 `PyObject` 및 `PyModuleDef`로 인해 확장 모듈을 초기화하는 것이 불가능하다는 점이 주요 문제입니다. 이 문제는 PEP 793이 Python 3.15에 추가될 예정입니다. 3.14 ABI가 "고정"되어 있으므로, 실행 중인 인터프리터를 쿼리하고 3.14의 경우 감지된 빌드의 `PyModuleDef`에 해당하는 구조체 정의를 사용하는 해결 방법이 가능합니다. 그러나 이는 현재 CPython의 Limited API에서 지원하고 테스트하기에는 너무 번거로워 거부되었습니다.
*   **호환성 결정을 위해 Python 휠 태그 사용:** `abi3t` 대신 `abi3` 태그가 Python 태그가 `cp315` 이상인 경우 자유 스레딩과 호환된다고 지정하는 이전 버전의 이 PEP는 거부되었습니다. 이는 CPython 3.14 이하의 GIL-enabled 및 자유 스레드 빌드 모두와 호환되는 확장 기능을 표현할 수 없기 때문입니다.
*   **`abi4` 휠 태그 추가:** `abi3t` 대신 `abi4`를 사용하는 방안은 휠 태그에서 주로 외관상의 차이만 있을 뿐이며, 파일명 태그 변경 시 GIL-enabled 빌드와의 호환성을 유지하면서 불필요한 기술적 변경을 초래할 수 있어 거부되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.