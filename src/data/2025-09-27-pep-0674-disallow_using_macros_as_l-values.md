---
title: "[Deferred] PEP 674 - Disallow using macros as l-values"
excerpt: "Python Enhancement Proposal 674: 'Disallow using macros as l-values'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/674/
toc: true
toc_sticky: true
date: 2025-09-27 10:07:42+0900
last_modified_at: 2025-09-27 10:07:42+0900
published: true
---
> **원문 링크:** [PEP 674 - Disallow using macros as l-values](https://peps.python.org/pep-0674/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 30-Nov-2021

## PEP 674 – 매크로를 좌변값(l-value)으로 사용하는 것을 금지

### 초록 (Abstract)
이 PEP는 C API에서 매크로를 좌변값(l-value)으로 사용하는 것을 금지하는 것을 제안합니다. 예를 들어, `Py_TYPE(obj) = new_type`과 같은 코드는 이제 컴파일러 오류를 발생시킵니다.

실제로는 대부분의 영향을 받는 프로젝트에서 단 두 가지만 변경하면 됩니다.
*   `Py_TYPE(obj) = new_type`을 `Py_SET_TYPE(obj, new_type)`으로 교체합니다.
*   `Py_SIZE(obj) = new_size`를 `Py_SET_SIZE(obj, new_size)`로 교체합니다.

### PEP 연기 (PEP Deferral)
이 PEP는 2022년 2월에 스티어링 카운실(Steering Council)의 결정에 따라 연기되었습니다.

### 도입 배경 (Rationale)

#### 매크로를 좌변값으로 사용하기 (Using a macro as an l-value)
Python C API에서 일부 함수는 일반 함수보다 매크로로 작성하는 것이 더 간단하기 때문에 매크로로 구현됩니다. 매크로가 구조체 멤버를 직접 노출하는 경우, 기술적으로 이 매크로를 사용하여 구조체 멤버를 가져올 뿐만 아니라 설정하는 것도 가능합니다.

예를 들어, Python 3.10의 `Py_TYPE()` 매크로는 다음과 같습니다.
```c
#define Py_TYPE(ob) (((PyObject *)(ob))->ob_type)
```
이 매크로는 객체의 타입을 얻기 위한 우변값(r-value)으로 사용될 수 있습니다:
```c
type = Py_TYPE(object);
```
또한, 객체의 타입을 설정하기 위한 좌변값(l-value)으로도 사용될 수 있습니다:
```c
Py_TYPE(object) = new_type;
```
`Py_REFCNT()` 및 `Py_SIZE()` 매크로를 사용하여 객체의 참조 카운트와 객체 크기를 설정하는 것도 가능합니다.

객체 속성을 직접 설정하는 것은 현재의 정확한 CPython 구현에 의존합니다. 이 기능을 다른 Python 구현에서 구현하면 C API 구현의 효율성이 떨어질 수 있습니다.

#### CPython nogil 포크 (CPython nogil fork)
Sam Gross는 GIL(Global Interpreter Lock)을 제거하기 위해 Python 3.9를 포크(fork)하여 `nogil` 브랜치를 만들었습니다. 이 포크에는 `PyObject.ob_refcnt` 멤버가 없지만, 참조 카운팅을 위한 더 정교한 구현이 있어서 `Py_REFCNT(obj) = new_refcnt;` 코드는 컴파일러 오류를 발생시킵니다.

`nogil` 포크를 CPython 메인 브랜치에 병합하려면 먼저 이 C API 호환성 문제를 해결해야 합니다. 이는 C API로 인해 간접적으로 차단된 Python 최적화의 구체적인 예입니다.
`Py_REFCNT()` 매크로는 이미 Python 3.10에서 좌변값으로 사용되지 않도록 수정되었습니다.

#### HPy 프로젝트 (HPy project)
HPy 프로젝트는 핸들과 함수 호출만 사용하는 새로운 Python용 C API입니다. 핸들은 불투명하며, 구조체 멤버에 직접 접근할 수 없고, 포인터를 역참조할 수 없습니다.

`Py_SIZE()`와 같은 매크로의 이상한 사용법을 찾아 바꾸는 것보다 `Py_SET_SIZE()`를 찾아 바꾸는 것이 더 쉽고 안전합니다. `Py_SIZE()`는 `HPy_Length()`로 반자동으로 교체될 수 있지만, `Py_SET_SIZE()`를 보면 코드를 HPy로 포팅하기 위해 더 큰 변경(예: `HPyTupleBuilder` 또는 `HPyListBuilder` 사용)이 필요하다는 것을 즉시 알 수 있습니다.
매크로를 통해 노출되는 내부 세부 사항이 적을수록 HPy가 직접적인 동등물을 제공하기 쉬워집니다. "비공개" 인터페이스를 참조하는 모든 매크로는 해당 인터페이스를 사실상 공개적으로 노출합니다.

#### GraalVM Python
GraalVM에서 Python 객체가 Python C API에 의해 접근될 때, C API 에뮬레이션 계층은 GraalVM 객체를 CPython 구조체(PyObject, PyLongObject, PyTypeObject 등)의 내부 구조를 노출하는 래퍼(wrapper)로 감싸야 합니다. 이는 C 코드가 직접 또는 매크로를 통해 접근할 때, GraalVM이 가로챌 수 있는 것은 구조체 오프셋에서의 읽기뿐이며, 이를 GraalVM의 표현으로 다시 매핑해야 하기 때문입니다. 매크로를 함수로 대체하여 노출되는 구조체 멤버의 "실제" 수가 적을수록 GraalVM 래퍼가 더 간단해질 수 있습니다.
이 PEP만으로는 GraalVM의 래퍼를 제거하기에 충분하지 않지만, 장기적인 목표를 향한 한 걸음입니다. GraalVM은 이미 장기적으로 더 나은 솔루션인 HPy를 지원합니다.

### 명세 (Specification)

#### 매크로를 좌변값으로 사용하는 것을 금지 (Disallow using macros as l-values)
다음 65개 매크로는 좌변값으로 사용하는 것을 금지하도록 수정됩니다.

*   **`PyObject` 및 `PyVarObject` 매크로:**
    *   `Py_TYPE()`: 대신 `Py_SET_TYPE()`을 사용해야 합니다.
    *   `Py_SIZE()`: 대신 `Py_SET_SIZE()`를 사용해야 합니다.

*   **`GET` 매크로:** `PyByteArray_GET_SIZE()`, `PyBytes_GET_SIZE()`, `PyCFunction_GET_CLASS()` 등 다수의 `GET` 매크로가 포함됩니다.

*   **`AS` 매크로:** `PyByteArray_AS_STRING()`, `PyBytes_AS_STRING()`, `PyFloat_AS_DOUBLE()` 등.

*   **`PyUnicode` 매크로:** `PyUnicode_1BYTE_DATA()`, `PyUnicode_2BYTE_DATA()`, `PyUnicode_4BYTE_DATA()` 등.

*   **`PyDateTime GET` 매크로:** `PyDateTime_DATE_GET_FOLD()`, `PyDateTime_DATE_GET_HOUR()` 등 다수의 `GET` 매크로가 포함됩니다.

#### C 확장 모듈을 Python 3.11로 포팅 (Port C extensions to Python 3.11)
실제로 이 PEP의 영향을 받는 대부분의 프로젝트는 단 두 가지만 변경하면 됩니다.
*   `Py_TYPE(obj) = new_type`을 `Py_SET_TYPE(obj, new_type)`으로 교체합니다.
*   `Py_SIZE(obj) = new_size`를 `Py_SET_SIZE(obj, new_size)`로 교체합니다.

`pythoncapi_compat` 프로젝트를 사용하여 C 확장 모듈을 자동으로 업데이트할 수 있습니다. 이 프로젝트는 Python 3.8 이하 버전을 지원하면서 Python 3.11 지원을 추가할 수 있도록 `Py_SET_REFCNT()`, `Py_SET_TYPE()`, `Py_SET_SIZE()` 함수를 제공하는 헤더 파일을 제공합니다.

#### `PyTuple_GET_ITEM()` 및 `PyList_GET_ITEM()`은 변경되지 않음 (PyTuple_GET_ITEM() and PyList_GET_ITEM() are left unchanged)
`PyTuple_GET_ITEM()` 및 `PyList_GET_ITEM()` 매크로는 변경되지 않습니다. `&PyTuple_GET_ITEM(tuple, 0)` 및 `&PyList_GET_ITEM(list, 0)` 코드 패턴은 여전히 내부 `PyObject**` 배열에 접근하기 위해 일반적으로 사용됩니다. 이 매크로들을 변경하는 것은 이 PEP의 범위를 벗어납니다.

#### `PyDescr_NAME()` 및 `PyDescr_TYPE()`은 변경되지 않음 (PyDescr_NAME() and PyDescr_TYPE() are left unchanged)
`PyDescr_NAME()` 및 `PyDescr_TYPE()` 매크로는 변경되지 않습니다. 이 매크로들은 `PyDescrObject.d_name` 및 `PyDescrObject.d_type` 멤버에 접근을 제공하며, 이 멤버들을 설정하기 위한 좌변값으로 사용될 수 있습니다.
SWIG 프로젝트는 이 매크로들을 좌변값으로 사용하여 이 멤버들을 설정합니다. `PyDescrObject` 구조체는 성능에 중요하지 않고 곧 변경될 가능성이 적으므로 SWIG를 수정하여 `PyDescrObject` 구조체 멤버를 직접 설정하는 것을 방지하는 것은 그리 가치 있는 일이 아닙니다.

### 구현 (Implementation)
구현은 bpo-45476: [C API] PEP 674: Disallow using macros as l-values에서 추적됩니다.

#### `Py_TYPE()` 및 `Py_SIZE()` 매크로 (Py_TYPE() and Py_SIZE() macros)
2020년 5월, `Py_TYPE()` 및 `Py_SIZE()` 매크로는 좌변값으로 사용하는 것을 금지하도록 수정되었습니다.
2020년 11월, 너무 많은 서드파티 프로젝트를 깨뜨렸기 때문에 변경 사항이 되돌려졌습니다.
2021년 6월, 대부분의 서드파티 프로젝트가 업데이트된 후 두 번째 시도가 있었으나, Windows에서 `test_exceptions`를 깨뜨렸기 때문에 다시 되돌려져야 했습니다.
2021년 9월, `test_exceptions`가 수정된 후 `Py_TYPE()` 및 `Py_SIZE()`가 최종적으로 변경되었습니다.
2021년 11월, 이 하위 호환성 없는 변경은 스티어링 카운실 예외를 얻었습니다.
2022년 10월, Python 3.11은 `Py_TYPE()` 및 `Py_SIZE()`의 비호환성 변경 사항과 함께 출시되었습니다.

### 하위 호환성 (Backwards Compatibility)
제안된 C API 변경 사항은 의도적으로 하위 호환성이 없습니다.
실제로 `Py_TYPE()` 및 `Py_SIZE()` 매크로만 좌변값으로 사용됩니다.
이 변경 사항은 PEP 387의 비권장(deprecation) 프로세스를 따르지 않습니다. 매크로가 좌변값으로 사용될 때만 비권장 경고를 발행하고 다른 방식으로 사용될 때는 경고를 발행하지 않는 알려진 방법이 없기 때문입니다.

`PyDescr_NAME()`, `PyDescr_TYPE()`, `PyList_GET_ITEM()`, `PyTuple_GET_ITEM()`의 4개 매크로는 영향을 받는 프로젝트의 수를 줄이기 위해 변경되지 않습니다.

### 통계 (Statistics)
총 34개의 프로젝트(PyPI 및 PyPI 외)가 이 PEP의 영향을 받는 것으로 알려져 있습니다.
*   16개 프로젝트(47%)는 이미 수정되었습니다.
*   18개 프로젝트(53%)는 아직 수정되지 않았습니다 (수정 대기 중이거나 Cython 코드를 재생성해야 함).

2022년 9월 1일 기준으로, 이 PEP는 PyPI 상위 5000개 프로젝트 중 18개 프로젝트(0.4%)에 영향을 미칩니다.
*   15개 프로젝트(0.3%)는 Cython 코드를 재생성해야 합니다.
*   3개 프로젝트(0.1%)는 수정 대기 중입니다.

#### PyPI 상위 5000개 (Top 5000 PyPI)
수정 대기 중인 프로젝트 (3개): `datatable`, `guppy3`, `scipy`.
수정 사항이 릴리스된 프로젝트 (12개): `bitarray`, `Cython`, `immutables`, `mercurial`, `mypy`, `numpy`, `pycurl`, `PyGObject`, `pyside2`, `python-snappy`, `recordclass`, `zstd`.

이 PEP의 영향을 받는 두 개의 백포트(backport) 프로젝트도 있습니다: `pickle5`, `pysha3`. 이들은 Python 3.11에서는 사용하면 안 됩니다.

#### 기타 영향 받는 프로젝트 (Other affected projects)
수정 사항이 릴리스된 기타 프로젝트 (4개): `boost`, `breezy`, `duplicity`, `gobject-introspection`.

### HPy 프로젝트와의 관계 (Relationship with the HPy project)

#### HPy 프로젝트 (The HPy project)
HPy 프로젝트는 포팅을 쉽게 하고 기존 API만큼 성능을 내기 위해 원래 API와 유사한 C API를 제공하는 것을 목표로 합니다. 동시에 HPy는 구현 세부 사항을 노출하지 않는 "C 확장 API"로서 충분히 분리되어 있습니다. 이 속성을 보장하기 위해 HPy 프로젝트는 CPython, PyPy, GraalVM Python을 위해 모든 것을 병렬로 개발하려고 노력합니다.

HPy는 아직 빠르게 발전하고 있습니다. NumPy를 마이그레이션하는 동안에도 문제가 해결되고 있으며, Cython에 HPy 지원을 추가하는 작업이 시작되었습니다. `pybind11`에 대한 작업도 곧 시작될 예정입니다.

장기적으로 HPy 프로젝트는 Python C 확장 모듈을 작성하기 위한 권장 API가 되기를 원합니다. HPy 프로젝트는 장기적으로 좋은 솔루션이며, Python 외부에서 개발되며 C API 변경이 필요 없다는 장점이 있습니다.

#### C API는 몇 년 더 유지될 것입니다 (The C API is here to stay for a few more years)
HPy에 대한 첫 번째 우려는 현재 HPy가 성숙하지 않고 널리 사용되지 않으며, CPython은 HPy로 곧 포팅될 것 같지 않은 많은 C 확장 모듈을 계속 지원해야 한다는 것입니다.
두 번째 우려는 새로운 최적화를 구현하기 위해 CPython 내부를 발전시킬 수 없다는 점과 PyPy, GraalPython 등에서 현재 C API의 비효율적인 구현입니다. 안타깝게도 HPy는 대부분의 C 확장 모듈이 HPy로 완전히 포팅되어 "레거시" Python C API를 버리는 것을 고려하는 것이 합리적일 때만 이러한 문제를 해결할 것입니다.

C 확장 모듈을 HPy로 포팅하는 것은 CPython에서 점진적으로 수행할 수 있지만, 많은 코드를 수정해야 하고 시간이 걸립니다. 대부분의 C 확장 모듈을 HPy로 포팅하는 데는 몇 년이 걸릴 것으로 예상됩니다.
이 PEP는 실제 문제를 야기하는 것으로 명확하게 식별된 문제, 즉 좌변값으로 사용되는 매크로를 수정하여 C API를 "덜 나쁘게" 만드는 것을 제안합니다. 이 PEP는 소수의 C 확장 모듈만 업데이트하면 되며, 일반적으로 영향을 받는 확장 모듈에서는 몇 줄만 변경하면 됩니다.

예를 들어, NumPy 1.22는 307,300줄의 C 코드로 구성되어 있으며, 이 PEP에 NumPy를 적용하는 데 단 11줄만 수정(Py_SET_TYPE 및 Py_SET_SIZE 사용)하고 4줄을 추가(Python 3.8 이하 버전을 위해 Py_SET_TYPE 및 Py_SET_SIZE 정의)했습니다. HPy로 NumPy를 포팅하는 초기 단계에서는 이미 이보다 더 많은 줄을 수정해야 했습니다.
현재로서는 어떤 접근 방식이 최선인지 예측하기 어렵습니다. 현재 C API를 수정하는 것인지, 아니면 HPy에 집중하는 것인지 말입니다. HPy에만 집중하는 것은 위험할 수 있습니다.

### 거부된 아이디어: 매크로를 그대로 두기 (Rejected Idea: Leave the macros as they are)
각 함수의 문서는 개발자들이 Python 객체를 수정하기 위해 매크로를 사용하는 것을 막을 수 있습니다.
만약 할당이 필요하다면, setter 함수를 추가하고 매크로 문서에서 setter 함수를 사용하도록 요구할 수 있습니다. 예를 들어, `Py_SET_TYPE()` 함수는 Python 3.9에 추가되었고 `Py_TYPE()` 문서는 이제 객체 타입을 설정하기 위해 `Py_SET_TYPE()` 함수를 사용하도록 요구합니다.
개발자가 매크로를 좌변값으로 사용하고 코드가 깨지면 이는 개발자의 책임이지 Python의 책임이 아닙니다. 우리는 '동의하는 성인' 원칙(consenting adults principle)에 따라 작동합니다. Python C API 사용자는 문서에 따라 이를 사용하고, 그렇지 않을 경우 문제가 발생하면 그 결과에 대한 책임을 져야 한다고 예상합니다.

이 아이디어는 소수의 개발자만이 문서를 읽고, 소수만이 Python C API 문서의 변경 사항을 추적하기 때문에 거부되었습니다. 대부분의 개발자는 CPython만 사용하므로 다른 Python 구현과의 호환성 문제를 알지 못합니다.
게다가, 매크로를 좌변값으로 계속 사용하는 것을 허용하는 것은 HPy 프로젝트에 도움이 되지 않으며, GraalVM의 Python 구현에 매크로를 에뮬레이션하는 부담을 남깁니다.

#### 이미 수정된 매크로 (Macros already modified)
다음 C API 매크로들은 이미 좌변값으로 사용하는 것을 금지하도록 수정되었습니다.
`PyCell_SET()`, `PyList_SET_ITEM()`, `PyTuple_SET_ITEM()`, `Py_REFCNT()` (Python 3.10), `_PyGCHead_SET_FINALIZED()`, `_PyGCHead_SET_NEXT()`, `asdl_seq_GET()`, `asdl_seq_GET_UNTYPED()`, `asdl_seq_LEN()`, `asdl_seq_SET()`, `asdl_seq_SET_UNTYPED()`.
예를 들어, `PyList_SET_ITEM(list, 0, item) < 0`은 예상대로 컴파일러 오류를 발생시킵니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.