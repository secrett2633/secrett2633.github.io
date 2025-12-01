---
title: "[Final] PEP 697 - Limited C API for Extending Opaque Types"
excerpt: "Python Enhancement Proposal 697: 'Limited C API for Extending Opaque Types'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/697/
toc: true
toc_sticky: true
date: 2025-09-27 13:04:45+0900
last_modified_at: 2025-09-27 13:04:45+0900
published: true
---
> **원문 링크:** [PEP 697 - Limited C API for Extending Opaque Types](https://peps.python.org/pep-0697/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 23-Aug-2022

## PEP 697 – 불투명 타입 확장을 위한 Limited C API

이 문서는 Python Enhancement Proposal (PEP) 697의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. 이 PEP는 C API를 사용하여 불투명(opaque) 타입을 확장하는 새로운 방법을 제안하며, 특히 CPython의 안정적인 ABI(Application Binary Interface)를 유지하면서 확장 모듈을 개발하는 데 중요한 개선 사항을 제공합니다.

### 초록 (Abstract)

PEP 697은 특정 (하위) 클래스에 특화된 데이터만 다룰 수 있도록 허용함으로써, 불투명 데이터를 가진 일부 타입을 확장하기 위한 Limited C API 지원을 추가합니다. 이 메커니즘은 `PyHeapTypeObject`와 함께 사용 가능해야 합니다. 이 PEP는 `tuple`이나 `int`와 같이 동적으로 크기가 조정되지 않는 가변 크기 객체(non-dynamically sized variable sized objects)를 확장하는 것을 제안하지는 않지만, 향후 필요할 경우 동일한 메커니즘을 통해 확장할 수 있는 여지를 남겨둡니다.

### 동기 (Motivation)

이 PEP가 해결하려는 핵심 문제는 사용자 정의 타입(custom types), 즉 메타클래스(`type`의 서브클래스)에 C 레벨 상태를 첨부하는 것입니다. 이는 종종 C++, Java, Rust와 같은 다른 타입 시스템을 Python 클래스로 노출하는 "래퍼(wrappers)"에서 필요합니다. 이러한 래퍼는 일반적으로 "래핑된(wrapped)" 비-Python 클래스에 대한 정보를 Python 타입 객체에 첨부해야 합니다.

이러한 작업은 Limited API에서 가능해야 하며, 이를 통해 언어 래퍼 또는 코드 생성기를 사용하여 안정적인 ABI 확장(Stable ABI extensions)을 만들 수 있습니다. (안정적인 ABI를 제공하는 이점은 PEP 652를 참조하세요.)

`type`을 확장하는 것은 상위 클래스가 사용하는 메모리 레이아웃에 의존하지 않으면서(느슨한 결합을 유지하면서) 클래스를 확장하는 더 일반적인 문제의 한 예시입니다.

### 근거 (Rationale)

#### 불투명 타입 확장 (Extending opaque types)

Limited API에서는 대부분의 `struct`가 불투명합니다. 즉, 그 크기와 메모리 레이아웃이 노출되지 않으므로 CPython의 새 버전(또는 C API의 대체 구현)에서 변경될 수 있습니다. 이는 일반적인 서브클래싱 패턴(기본 타입 인스턴스에 사용되는 `struct`를 파생 타입 인스턴스에 사용되는 `struct`의 첫 번째 요소로 만드는 것)이 작동하지 않음을 의미합니다. 예를 들어, `PyListObject`(`list`)를 확장하기 위한 기존 튜토리얼 예시는 다음과 같은 `struct`를 사용합니다.

```c
typedef struct {
    PyListObject list;
    int state;
} SubListObject;
```

`PyListObject`는 불투명하므로 Limited API에서는 위 코드가 컴파일되지 않습니다.

대신, 이 PEP는 서브클래스에서 필요한 상태만 포함하는 `struct`를 사용할 것을 제안합니다.

```c
typedef struct {
    int state;
} SubListState;
// (이 경우 `typedef int SubListState;` 로도 가능)
```

이제 서브클래스는 상위 클래스의 메모리 레이아웃(및 크기)과 완전히 분리될 수 있습니다.

현재도 `PyListObject->tp_basicsize + sizeof(SubListState)`를 `PyType_Spec.basicsize`로 사용하고, `PyListObject->tp_basicsize`를 인스턴스(`PyObject*`) 내부 오프셋으로 사용하여 데이터에 접근하는 방식으로 이러한 `struct`를 사용할 수 있습니다. 그러나 이 방법은 다음과 같은 단점이 있습니다.

*   기본 타입의 `basicsize`가 제대로 정렬되지 않아 일부 아키텍처에서 문제가 발생할 수 있습니다.
*   `PyTypeObject.tp_basicsize`가 Limited API에 노출되지 않아 `__basicsize__` 속성을 통해 접근해야 하므로 번거롭고 안전하지 않습니다.
*   가변 크기 객체(variable-size objects)가 처리되지 않습니다.

이러한 단점을 해결하고 느슨한 결합을 선호하는 프로젝트에서 쉽게 사용할 수 있도록, 이 PEP는 다음을 위한 API를 제안합니다.

*   클래스 생성 시 `list`에 대한 추가 정보 없이 `SubListState`를 `PyListObject`에 "추가"하도록 지정합니다. 이는 음수 `PyType_Spec.basicsize`(`-sizeof(SubListState)`)로 지정됩니다.
*   주어진 인스턴스와 서브클래스 `PyTypeObject*`로부터 `SubListState`에 대한 포인터를 가져옵니다. 이를 위해 새로운 함수 `PyObject_GetTypeData`가 추가됩니다.

기반 클래스는 `PyListObject`에만 국한되지 않고, 인스턴스 `struct`가 불투명하거나, 릴리스 간에 불안정하거나, 전혀 노출되지 않은 모든 기반 클래스를 확장하는 데 사용될 수 있습니다. 여기에는 `type` (`PyHeapTypeObject`) 또는 타사 확장(예: NumPy 배열)이 포함됩니다. 추가 상태가 필요하지 않은 경우 `basicsize`를 0으로 허용하며, 이 경우 기본 타입의 `tp_basicsize`가 상속됩니다.

#### 가변 크기 객체 확장 (Extending variable-size objects)

가변 크기 객체를 서브클래싱하면서 느슨한 결합을 유지하려면 추가적인 고려 사항이 필요합니다. 가변 크기 데이터가 서브클래스 데이터(위 예시의 `SubListState`)와 충돌할 수 있기 때문입니다. 현재 CPython은 이러한 충돌을 방지하는 방법을 제공하지 않습니다.

이 PEP는 동기를 부여하는 타입인 `PyHeapTypeObject`가 가변 크기이므로, 이를 안전하게 서브클래싱할 수 있는 방법을 제시합니다.

**가변 크기 레이아웃 (Variable-size layouts)**

가변 크기 객체에는 두 가지 주요 메모리 레이아웃이 있습니다.

1.  `int` 또는 `tuple`과 같은 타입: 가변 데이터가 고정 오프셋에 저장됩니다. 서브클래스가 추가 공간을 필요로 하는 경우, 가변 크기 데이터 뒤에 추가되어야 합니다.
    ```
    PyTupleObject: ┌───────────────────┬───┬───┬╌╌╌╌┐
                   │ PyObject_VAR_HEAD │var. data │
                   └───────────────────┴───┴───┴╌╌╌╌┘
    tuple subclass: ┌───────────────────┬───┬───┬╌╌╌╌┬─────────────┐
                    │ PyObject_VAR_HEAD │var. data │subclass data│
                    └───────────────────┴───┴───┴╌╌╌╌┴─────────────┘
    ```
2.  `PyHeapTypeObject`와 같은 타입: 가변 크기 데이터가 항상 인스턴스 메모리 영역의 끝에 위치합니다.
    ```
    heap type: ┌───────────────────┬──────────────┬───┬───┬╌╌╌╌┐
               │ PyObject_VAR_HEAD │Heap type data│var. data │
               └───────────────────┴──────────────┴───┴───┴╌╌╌╌┘
    type subclass: ┌───────────────────┬──────────────┬─────────────┬───┬───┬╌╌╌╌┐
                   │ PyObject_VAR_HEAD │Heap type data│subclass data│var. data │
                   └───────────────────┴──────────────┴─────────────┴───┴───┴╌╌╌╌┘
    ```
이 PEP는 `PyHeapTypeObject`에 초점을 맞추므로 두 번째 레이아웃에 대한 서브클래싱을 허용하는 API를 제안합니다.

**`PyHeapTypeObject`와 유사한 레이아웃을 가진 클래스 확장 (Extending classes with the PyHeapTypeObject-like layout)**

이 PEP는 `PyHeapTypeObject`와 유사한 레이아웃을 나타내는 타입 플래그인 `Py_TPFLAGS_ITEMS_AT_END`를 제안합니다. 이 플래그는 상위 클래스에서 설정하거나, 새 서브클래스에서 설정하여 상위 클래스가 적합함을 명시할 수 있습니다. 이 플래그는 음수 `basicsize`를 사용하여 가변 크기 타입을 확장하는 데 필요합니다.

또한, 이 PEP는 `Py_TPFLAGS_ITEMS_AT_END` 플래그를 사용하는 주어진 인스턴스의 가변 크기 데이터를 가져오는 헬퍼 함수 `PyObject_GetItemData`를 제안합니다. 이 함수는 필요한 포인터 연산을 숨기며, 향후 다른 레이아웃에도 적용될 수 있도록 API를 추상화합니다.

#### 큰 그림 (Big picture)

이 섹션에서는 `PyType_Spec.basicsize`의 값에 따른 타입 생성의 결정 트리를 설명합니다.

*   **`spec->basicsize > 0`** : 기존과 동일하며, 기본 클래스 레이아웃을 알고 있을 때 사용합니다.
*   **`spec->basicsize == 0`** : `basicsize`를 상속합니다. `base->tp_itemsize`에 따라 `itemsize`를 상속하거나 설정합니다.
*   **`spec->basicsize < 0`** : `basicsize`를 확장합니다.
    *   `base->tp_itemsize == 0` (고정 크기 클래스 확장): `spec->itemsize == 0`이면 `itemsize`는 0으로 설정됩니다. `spec->itemsize > 0`이면 실패합니다.
    *   `base->tp_itemsize > 0` (가변 크기 클래스 확장):
        *   `spec->itemsize == 0` (itemsize 상속): `Py_TPFLAGS_ITEMS_AT_END` 플래그가 사용된 경우 `itemsize`가 상속됩니다. 사용되지 않은 경우 (잠재적 충돌로 인해) 실패합니다.
        *   `spec->itemsize > 0`이면 (itemsize 변경/확장) 안전하게 수행할 수 없으므로 실패합니다.

`spec->itemsize < 0`는 항상 오류입니다. 이 PEP는 `tp->itemsize`를 단순히 상속하는 대신 확장하는 메커니즘을 제안하지 않습니다.

#### 상대 멤버 오프셋 (Relative member offsets)

`PyMemberDef.offset`에 대한 추가적인 변경 사항도 포함됩니다. 서브클래스별 `struct` (`SubListState`와 같은)를 사용하는 확장 모듈은 `PyObject` `struct`를 기준으로 하는 "절대" 오프셋 대신 이 `struct`를 기준으로 하는 "상대" 오프셋을 지정할 수 있는 방법을 얻게 됩니다.

이 PEP는 "상대" 오프셋을 위한 새로운 플래그인 `Py_RELATIVE_OFFSET`을 제안합니다. 이 플래그는 새로운 API와 함께 사용될 때 반드시 존재해야 하며, 다른 경우에는 사용해서는 안 됩니다. 초기 구현에서는 이 플래그가 오용을 방지하고 코드 리뷰어를 위한 힌트로만 사용됩니다.

### 명세 (Specification)

#### 상대 basicsize (Relative basicsize)

`PyType_Spec`의 `basicsize` 멤버는 0 또는 음수일 수 있습니다. 이 경우, 그 절댓값은 기본 클래스의 `basicsize`에 추가하여 새 클래스의 인스턴스가 요구하는 추가 저장 공간의 크기를 지정합니다. 결과 클래스의 `basicsize`는 다음과 같습니다.

```c
type->tp_basicsize = _align(base->tp_basicsize) + _align(-spec->basicsize);
```

여기서 `_align`은 `alignof(max_align_t)`의 배수로 올림합니다. `spec->basicsize`가 0일 경우, `basicsize`는 `base->tp_basicsize`로 직접 상속됩니다.

인스턴스에서 서브클래스에 특화된 메모리 영역(기본 클래스 외에 서브클래스가 예약하는 "추가 공간")은 새로운 함수 `PyObject_GetTypeData`를 통해 사용할 수 있습니다.

```c
void * PyObject_GetTypeData(PyObject *obj, PyTypeObject *cls) {
    return (char *)obj + _align(cls->tp_base->tp_basicsize);
}
```

이 메모리 영역의 크기를 검색하기 위한 또 다른 함수 `PyType_GetTypeDataSize`도 추가됩니다.

```c
Py_ssize_t PyType_GetTypeDataSize(PyTypeObject *cls) {
    return cls->tp_basicsize - _align(cls->tp_base->tp_basicsize);
}
```

이 새로운 `Get` 함수들은 `PyType_Spec.basicsize`를 음수로 사용하여 생성된 클래스에만 사용해야 합니다. 다른 클래스의 경우 동작이 정의되지 않습니다.

#### itemsize 상속 (Inheriting itemsize)

`spec->itemsize`가 0일 경우, `tp_itemsize`는 기본 클래스에서 상속됩니다. 새로운 타입 플래그 `Py_TPFLAGS_ITEMS_AT_END`가 추가되며, 이는 인스턴스의 가변 크기 부분이 인스턴스 메모리의 끝에 저장됨을 나타냅니다. 기본 메타타입(`PyType_Type`)은 이 플래그를 설정합니다.

이 새로운 플래그가 있는 타입의 가변 크기 콘텐츠를 위해 예약된 메모리에 접근하기 위한 새로운 함수 `PyObject_GetItemData`가 추가됩니다. 이 함수는 초기에는 Limited API에 추가되지 않습니다.

양수 `base->itemsize`를 가진 클래스를 음수 `spec->basicsize`를 사용하여 확장하는 것은 `Py_TPFLAGS_ITEMS_AT_END`가 기본 타입 또는 `spec->flags`에 설정되지 않으면 실패합니다. 양수 `spec->itemsize`를 가진 클래스를 음수 `spec->basicsize`를 사용하여 확장하는 것은 실패합니다.

#### 상대 멤버 오프셋 (Relative member offsets)

음수 `PyType_Spec.basicsize`를 사용하여 정의된 타입에서 `Py_tp_members`를 통해 정의된 멤버의 오프셋은 전체 `PyObject` `struct` 대신 추가 서브클래스 데이터를 기준으로 해야 합니다. 이는 `PyMemberDef.flags`의 새로운 플래그인 `Py_RELATIVE_OFFSET`으로 표시됩니다.

초기 구현에서 이 새로운 플래그는 중복되지만, 오프셋의 변경된 의미를 명확히 하고 실수를 방지하는 데 도움이 됩니다. 음수 `basicsize`와 함께 `Py_RELATIVE_OFFSET`을 사용하지 않거나, 다른 컨텍스트에서 사용하는 것은 오류입니다. CPython은 타입을 초기화할 때 오프셋을 조정하고 `Py_RELATIVE_OFFSET` 플래그를 지웁니다.

### 새로운 API 목록 (List of new API)

다음의 새로운 함수/값들이 제안됩니다.

**Limited API/Stable ABI에 추가될 것:**

*   `void * PyObject_GetTypeData(PyObject *obj, PyTypeObject *cls)`
*   `Py_ssize_t PyType_GetTypeDataSize(PyTypeObject *cls)`
*   `PyTypeObject.tp_flags`를 위한 `Py_TPFLAGS_ITEMS_AT_END` 플래그
*   `PyMemberDef.flags`를 위한 `Py_RELATIVE_OFFSET` 플래그

**Public C API에만 추가될 것:**

*   `void *PyObject_GetItemData(PyObject *obj)`

### 하위 호환성 (Backwards Compatibility)

알려진 하위 호환성 문제는 없습니다.

### 가정 (Assumptions)

구현은 `type->tp_base->tp_basicsize`와 `type->tp_basicsize` 오프셋 사이의 인스턴스 메모리가 해당 타입에 "속한다"고 가정합니다 (가변 길이 타입 제외). 이는 명시적으로 문서화되지 않았지만, CPython 3.11까지 서브클래스에 `__dict__`를 추가할 때 이 가정에 의존했으므로 안전합니다.

### 보안 영향 (Security Implications)

알려진 보안 영향은 없습니다.

### 승인 (Endorsements)

`pybind11`의 저자가 이 문제 해결을 요청했으며, HPy 프로젝트에서도 API가 일반적으로 좋다는 의견을 제시했습니다.

### 교육 방법 (How to Teach This)

초기 구현에는 참조 문서와 "새로운 기능(What's New)" 항목이 포함될 것이며, 이는 C 확장 라이브러리 개발자라는 대상 독자층에게 충분할 것입니다.

### 참조 구현 (Reference Implementation)

참조 구현은 `encukou/cpython` GitHub 리포지토리의 `extend-opaque` 브랜치에 있습니다.

### 가능한 향후 개선 사항 (Possible Future Enhancements)

*   **정렬 및 성능 (Alignment & Performance):** 현재 구현은 안전성과 사용 편의성에 중점을 두어 공간과 시간을 다소 희생할 수 있습니다. 필요하다면 API를 변경하지 않고 구현을 조정하여 성능을 개선할 수 있습니다. 예를 들어, 타입별 버퍼의 오프셋을 저장하거나 `PyType_Slot`을 통해 원하는 정렬을 지정할 수 있습니다.
*   **가변 크기 타입의 다른 레이아웃 (Other layouts for variable-size types):** `Py_TPFLAGS_ITEMS_AT_END`와 유사한 플래그를 "튜플과 유사한" 레이아웃을 나타내기 위해 추가하고, 이 PEP에서 제안하는 모든 메커니즘을 적용하여 지원할 수 있습니다. 하지만 실제적인 이점은 거의 없을 것으로 보입니다.

### 거부된 아이디어 (Rejected Ideas)

음수 `spec->basicsize` 대신 새로운 `PyType_Spec` 플래그를 추가하는 아이디어가 있었으나, 필드 값의 의미가 변경되는 상황에서 기존 코드에 미치는 영향은 동일할 것이므로 거부되었습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스에 따라 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.