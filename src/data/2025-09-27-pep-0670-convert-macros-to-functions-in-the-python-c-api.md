---
title: "[Final] PEP 670 - Convert macros to functions in the Python C API"
excerpt: "Python Enhancement Proposal 670: 'Convert macros to functions in the Python C API'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/670/
toc: true
toc_sticky: true
date: 2025-09-27 10:05:27+0900
last_modified_at: 2025-09-27 10:05:27+0900
published: true
---
> **원문 링크:** [PEP 670 - Convert macros to functions in the Python C API](https://peps.python.org/pep-0670/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 19-Oct-2021

## PEP 670 – Python C API의 매크로를 함수로 변환

### 개요 (Abstract)

이 PEP (Python Enhancement Proposal)는 Python C API 내의 매크로(macros)를 `static inline` 함수 또는 일반 함수(regular functions)로 변환하는 것을 제안합니다. 이는 C/C++에서 발생할 수 있는 매크로의 잠재적 위험(pitfalls)을 피하고, 다른 프로그래밍 언어에서도 해당 기능들을 사용할 수 있도록 돕기 위함입니다.

컴파일러 경고를 방지하기 위해, 포인터 타입(pointer types)의 함수 인자(arguments)는 추가적인 매크로를 사용하여 적절한 타입으로 캐스팅(cast)됩니다. 하지만 제한된 C API(Limited C API) 버전 3.11에서는 이러한 캐스트가 적용되지 않으므로, 새로운 제한된 API를 사용하는 개발자는 명시적으로 필요한 타입으로 캐스팅해야 할 수 있습니다. 호환성 문제를 피하기 위해, 할당(assignment)에서 l-value로 사용될 수 있는 매크로는 변환되지 않습니다.

### 제안 배경 (Rationale)

매크로의 사용은 숙련된 C 개발자에게도 피하기 어려운 의도치 않은 부작용을 초래할 수 있습니다. 이러한 문제들은 오랫동안 알려져 왔거나 최근 Python에서 발견되기도 했습니다. 매크로의 함정을 회피하는 작업은 매크로 코드의 가독성과 유지보수성을 저하시킵니다.

매크로를 함수로 변환하는 것은 여러 가지 장점이 있습니다.

*   함수는 GCC 문서에서 설명하는 다음과 같은 매크로의 문제점들로부터 자유롭습니다:
    *   중첩 오류 (Misnesting)
    *   연산자 우선순위 문제 (Operator precedence problems)
    *   세미콜론 삼킴 현상 (Swallowing the semicolon)
    *   부작용 중복 (Duplication of side effects)
    *   자기 참조 매크로 (Self-referential macros)
    *   인자 사전 스캔 (Argument prescan)
    *   인자 내 개행 문자 (Newlines in arguments)
*   함수는 매크로의 문제점을 해결하기 위한 다음과 같은 우회 방법들이 필요 없어, 일반적으로 유사한 매크로 코드보다 읽고 유지보수하기 쉽습니다:
    *   인자 주위에 괄호 추가.
    *   여러 줄에 걸쳐 작성될 경우 줄 연속 문자(line continuation characters) 사용.
    *   여러 표현식을 실행하기 위한 쉼표 추가.
    *   여러 구문을 작성하기 위한 `do { ... } while (0)` 구조 사용.
*   함수의 인자 타입(argument types)과 반환 타입(return type)이 명확하게 정의됩니다.
*   디버거(debuggers)와 프로파일러(profilers)가 인라인된 함수의 이름을 검색할 수 있습니다.
*   디버거가 인라인된 함수에 중단점(breakpoints)을 설정할 수 있습니다.
*   변수(variables)가 명확한 스코프(scope)를 가집니다.
*   매크로와 `static inline` 함수를 일반 함수로 변환하면, Python을 사용하지만 매크로나 `static inline` 함수를 사용할 수 없는 프로젝트에서도 이 함수들에 접근할 수 있게 됩니다.

### 상세 규격 (Specification)

#### 매크로를 `static inline` 함수로 변환 (Convert macros to static inline functions)

대부분의 매크로는 `static inline` 함수로 변환됩니다. 다음 매크로들은 변환되지 않습니다:

*   객체형 매크로(Object-like macros, 즉 괄호와 인자가 필요 없는 매크로). 예를 들어:
    *   빈 매크로. 예: `#define Py_HAVE_CONDVAR`.
    *   값을 정의하기만 하는 매크로(심지어 잘 정의된 타입의 상수가 더 나을지라도). 예: `#define METH_VARARGS 0x0001`.
*   다양한 C 컴파일러, C 언어 확장 또는 최신 C 기능에 대한 호환성 레이어. 예: `Py_GCC_ATTRIBUTE()`, `Py_ALWAYS_INLINE`, `Py_MEMCPY()`.
*   동작보다는 정의를 위해 사용되는 매크로. 예: `PyAPI_FUNC`, `Py_DEPRECATED`, `Py_PYTHON_H`.
*   문자열화(stringification) 및 연결(concatenation)과 같은 C 전처리기(C preprocessor) 기능이 필요한 매크로. 예: `Py_STRINGIFY()`.
*   함수로 변환할 수 없는 매크로. 예: `Py_BEGIN_ALLOW_THREADS` (짝이 맞지 않는 `}` 포함), `Py_VISIT` (특정 변수 이름에 의존), `Py_RETURN_RICHCOMPARE` (호출 함수에서 반환).
*   할당에서 l-value로 사용될 수 있는 매크로. 이는 호환성 파기 변경(incompatible change)이 될 수 있으며 이 PEP의 범위를 벗어납니다. 예: `PyBytes_AS_STRING()`.
*   코드 경로 또는 인자에 따라 반환 타입이 다른 매크로.

#### `static inline` 함수를 일반 함수로 변환 (Convert static inline functions to regular functions)

공개 C API(public C API)의 `static inline` 함수는 일반 함수로 변환될 수 있지만, 함수 변경으로 인한 성능 영향이 측정 가능하지 않을 때만 가능합니다. 성능 영향은 벤치마크(benchmarks)를 통해 측정해야 합니다.

#### 포인터 인자 캐스팅 (Cast pointer arguments)

현재 대부분의 포인터를 인자로 받는 매크로는 포인터 인자를 예상 타입으로 캐스팅합니다. 예를 들어, Python 3.6의 `Py_TYPE()` 매크로는 인자를 `PyObject*`로 캐스팅합니다:

```c
#define Py_TYPE(ob) (((PyObject*)(ob))->ob_type)
```

`Py_TYPE()` 매크로는 `PyObject*` 타입을 받지만, `PyLongObject*` 및 `PyDictObject*`와 같은 다른 포인터 타입도 받습니다. 함수는 강력한 타입(strongly typed)이므로 한 가지 타입의 인자만 받을 수 있습니다.

기존 코드에서 컴파일러 오류 및 경고를 피하기 위해, 매크로가 함수로 변환되고 매크로가 하나 이상의 인자를 캐스팅할 경우, 캐스트를 유지하기 위한 새로운 매크로가 추가됩니다. 새로운 매크로와 함수는 같은 이름을 가집니다.

`Py_TYPE()` 매크로가 `static inline` 함수로 변환된 예시:

```c
static inline PyTypeObject* Py_TYPE(PyObject *ob) { return ob->ob_type; }
#define Py_TYPE(ob) Py_TYPE((PyObject*)(ob))
```

캐스트는 `PyObject*`뿐만 아니라 모든 포인터 타입에 대해 유지됩니다. 여기에는 `void*`로의 캐스트도 포함됩니다. `void*`로의 캐스트를 제거하면 `const void*` 변수로 함수가 호출될 때 새로운 경고가 발생할 수 있기 때문입니다. 예를 들어, `PyUnicode_WRITE()` 매크로는 `data` 인자를 `void*`로 캐스팅하므로 현재 `const void*` 타입을 받는데, 이 PEP는 이 점을 변경하지 않습니다.

#### 제한된 C API 버전 3.11에서 캐스트 회피 (Avoid the cast in the limited C API version 3.11)

제한된 C API 버전 3.11 이상에서는 캐스트가 제외됩니다. API 사용자가 새로운 제한된 API를 선택할 경우, 예상 타입을 전달하거나 직접 캐스트를 수행해야 합니다.

예시로, `Py_TYPE()`는 다음과 같이 정의됩니다:

```c
static inline PyTypeObject* Py_TYPE(PyObject *ob) { return ob->ob_type; }
#if !defined(Py_LIMITED_API) || Py_LIMITED_API+0 < 0x030b0000
# define Py_TYPE(ob) Py_TYPE((PyObject*)(ob))
#endif
```

#### 반환 타입 변경 없음 (Return type is not changed)

매크로가 함수로 변환될 때, 새로운 컴파일러 경고 발생을 막기 위해 반환 타입은 변경되지 않아야 합니다. 예를 들어, Python 3.7에서 `PyUnicode_AsUTF8()`의 반환 타입이 `char*`에서 `const char*`로 변경되었을 때, `char*`를 예상하는 C 확장 모듈을 빌드할 때 새로운 컴파일러 경고가 발생했습니다. 이 PEP는 이러한 문제를 방지하기 위해 반환 타입을 변경하지 않습니다.

### 하위 호환성 (Backwards Compatibility)

이 PEP는 C API의 호환성 파기 변경을 피하도록 설계되었습니다.

제한된 C API 버전 3.11을 명시적으로 대상으로 하는 C 확장 모듈만 이제 함수에 예상 타입을 전달해야 합니다. 포인터 인자는 더 이상 예상 타입으로 캐스팅되지 않습니다.

포인터 타입의 함수 인자는 여전히 캐스팅되며, 새로운 컴파일러 경고 발생을 막기 위해 반환 타입은 변경되지 않습니다.

할당에서 l-value로 사용될 수 있는 매크로는 호환성 파기 변경을 피하기 위해 이 PEP에 의해 수정되지 않습니다.

### 매크로 함정의 예시 (Examples of Macro Pitfalls)

#### 부작용 중복 (Duplication of side effects)

매크로:

```c
#define PySet_Check(ob) \
    (Py_IS_TYPE(ob, &PySet_Type) \
     || PyType_IsSubtype(Py_TYPE(ob), &PySet_Type))
#define Py_IS_NAN(X) ((X) != (X))
```

`op` 또는 `X` 인자에 부작용(side effect)이 있다면, 이 부작용은 `PySet_Check()` 및 `Py_IS_NAN()`에 의해 두 번 실행됩니다. 예를 들어, `PyUnicode_WRITE(kind, data, pos++, ch)` 코드에서 `pos++` 인자는 부작용을 가집니다. 이 코드는 `PyUnicode_WRITE()` 매크로가 세 번째 인자를 한 번만 사용하므로 `pos++`의 부작용이 중복되지 않아 안전합니다.

#### 중첩 오류 (Misnesting)

bpo-43181의 예시: Python 매크로는 인자를 보호하지 않습니다. `PyObject_TypeCheck()` 매크로는 수정되기 전 다음과 같았습니다:

```c
#define PyObject_TypeCheck(ob, tp) \
    (Py_IS_TYPE(ob, tp) || PyType_IsSubtype(Py_TYPE(ob), (tp)))
```

C++ 사용 예시:

```c
PyObject_TypeCheck(ob, U(f<a,b>(c)))
```

전처리기는 먼저 이를 다음과 같이 확장합니다:

```c
(Py_IS_TYPE(ob, f<a,b>(c)) || ...)
```

C++의 "<" 및 ">" 문자는 전처리기에 의해 괄호로 처리되지 않으므로, `Py_IS_TYPE()` 매크로는 세 개의 인자로 호출됩니다:

```
ob
f<a
b>(c)
```

`Py_IS_TYPE()`가 두 개의 인자만 받기 때문에 컴파일이 오류로 실패합니다.

이 버그는 `PyObject_TypeCheck()`의 `op`와 `tp` 인자가 괄호 안에 있어야 한다는 것입니다: `Py_IS_TYPE(ob, tp)`를 `Py_IS_TYPE((ob), (tp))`로 교체해야 합니다. 일반 C 코드에서는 이러한 괄호가 중복될 수 있으며 버그로 간주될 수 있어 매크로 작성 시 종종 잊혀집니다.

매크로 함정을 피하기 위해, `PyObject_TypeCheck()` 매크로는 `static inline` 함수로 변환되었습니다.

### 읽기 어려운 매크로의 예시 (Examples of hard to read macros)

#### `PyObject_INIT()`

반환 값을 가진 매크로에서 쉼표 사용을 보여주는 예시입니다.

Python 3.7 매크로:

```c
#define PyObject_INIT(op, typeobj) \
    ( Py_TYPE(op) = (typeobj), _Py_NewReference((PyObject *)(op)), (op) )
```

Python 3.8 함수 (간소화된 코드):

```c
static inline PyObject* _PyObject_INIT(PyObject *op, PyTypeObject *typeobj) {
    Py_TYPE(op) = typeobj;
    _Py_NewReference(op);
    return op;
}
#define PyObject_INIT(op, typeobj) \
    _PyObject_INIT(_PyObject_CAST(op), (typeobj))
```

함수는 줄 연속 문자 `\`가 필요 없습니다. 매크로 끝의 놀라운 `, (op)` 구문 대신 명시적인 `return op;`를 가집니다. 단일의 긴 줄로 작성되는 대신 여러 줄에 걸쳐 짧은 구문으로 작성됩니다. 함수 내부에서 `op` 인자는 `PyObject*`라는 잘 정의된 타입을 가지므로 `(PyObject *)(op)`와 같은 캐스트가 필요 없습니다. 인자는 괄호 안에 넣을 필요가 없습니다: `(typeobj)` 대신 `typeobj`를 사용합니다.

#### `_Py_NewReference()`

매크로 내에서 `#ifdef` 사용을 보여주는 예시입니다.

Python 3.7 매크로 (간소화된 코드):

```c
#ifdef COUNT_ALLOCS
# define _Py_INC_TPALLOCS(OP) inc_count(Py_TYPE(OP))
# define _Py_COUNT_ALLOCS_COMMA ,
#else
# define _Py_INC_TPALLOCS(OP)
# define _Py_COUNT_ALLOCS_COMMA
#endif /* COUNT_ALLOCS */

#define _Py_NewReference(op) ( \
    _Py_INC_TPALLOCS(op) _Py_COUNT_ALLOCS_COMMA \
    Py_REFCNT(op) = 1)
```

Python 3.8 함수 (간소화된 코드):

```c
static inline void _Py_NewReference(PyObject *op) {
    _Py_INC_TPALLOCS(op);
    Py_REFCNT(op) = 1;
}
```

#### `PyUnicode_READ_CHAR()`

이 매크로는 인자를 재사용하며, 잠재적으로 `PyUnicode_KIND`를 여러 번 호출합니다:

```c
#define PyUnicode_READ_CHAR(unicode, index) \
    (assert(PyUnicode_Check(unicode)), \
     assert(PyUnicode_IS_READY(unicode)), \
     (Py_UCS4) \
     (PyUnicode_KIND((unicode)) == PyUnicode_1BYTE_KIND ? \
         ((const Py_UCS1 *)(PyUnicode_DATA((unicode))))[(index)] : \
         (PyUnicode_KIND((unicode)) == PyUnicode_2BYTE_KIND ? \
             ((const Py_UCS2 *)(PyUnicode_DATA((unicode))))[(index)] : \
             ((const Py_UCS4 *)(PyUnicode_DATA((unicode))))[(index)] \
         ) \
     ))
```

`static inline` 함수로의 가능한 구현:

```c
static inline Py_UCS4 PyUnicode_READ_CHAR(PyObject *unicode, Py_ssize_t index) {
    assert(PyUnicode_Check(unicode));
    assert(PyUnicode_IS_READY(unicode));
    switch (PyUnicode_KIND(unicode)) {
    case PyUnicode_1BYTE_KIND:
        return (Py_UCS4)((const Py_UCS1 *)(PyUnicode_DATA(unicode)))[index];
    case PyUnicode_2BYTE_KIND:
        return (Py_UCS4)((const Py_UCS2 *)(PyUnicode_DATA(unicode)))[index];
    case PyUnicode_4BYTE_KIND:
    default:
        return (Py_UCS4)((const Py_UCS4 *)(PyUnicode_DATA(unicode)))[index];
    }
}
```

### Python 3.8 이후 함수로 변환된 매크로 (Macros converted to functions since Python 3.8)

다음은 Python 3.8에서 Python 3.11 사이에 이미 함수로 변환된 매크로 목록입니다. `Py_INCREF()`와 같이 일부 변환된 매크로는 C 확장 모듈에서 매우 흔하게 사용되지만, 이러한 변환은 Python 성능에 큰 영향을 미치지 않았고 대부분 하위 호환성을 깨뜨리지 않았습니다.

#### `static inline` 함수로 변환된 매크로 (Macros converted to static inline functions)

Python 3.8:

*   `Py_DECREF()`
*   `Py_INCREF()`
*   `Py_XDECREF()`
*   `Py_XINCREF()`
*   `PyObject_INIT()`
*   `PyObject_INIT_VAR()`
*   `_PyObject_GC_UNTRACK()`
*   `_Py_Dealloc()`

#### 일반 함수로 변환된 매크로 (Macros converted to regular functions)

Python 3.9:

*   `PyIndex_Check()`
*   `PyObject_CheckBuffer()`
*   `PyObject_GET_WEAKREFS_LISTPTR()`
*   `PyObject_IS_GC()`
*   `PyObject_NEW()`: `PyObject_New()`의 별칭(alias)
*   `PyObject_NEW_VAR()`: `PyObjectVar_New()`의 별칭

LTO 없이 빌드된 Python에서 성능 저하를 피하기 위해, 내부 C API에 private `static inline` 함수가 추가되었습니다:

*   `_PyIndex_Check()`
*   `_PyObject_IS_GC()`
*   `_PyType_HasFeature()`
*   `_PyType_IS_GC()`

#### `static inline` 함수에서 일반 함수로 변환된 함수 (Static inline functions converted to regular functions)

Python 3.11:

*   `PyObject_CallOneArg()`
*   `PyObject_Vectorcall()`
*   `PyVectorcall_Function()`
*   `_PyObject_FastCall()`

LTO 없이 빌드된 Python에서 성능 저하를 피하기 위해, 내부 C API에 private `static inline` 함수가 추가되었습니다:

*   `_PyVectorcall_FunctionInline()`

### 호환성 파기 변경 (Incompatible changes)

다른 변환된 매크로들은 하위 호환성을 깨뜨리지 않았지만, 한 가지 예외가 있습니다.

`Py_REFCNT()`, `Py_TYPE()`, `Py_SIZE()` 세 매크로는 Python 3.10 및 3.11에서 `static inline` 함수로 변환되어 할당에서 l-value로 사용될 수 없게 되었습니다. 이는 의도적인 호환성 파기 변경입니다. 자세한 내용은 bpo-39573을 참조하십시오.

이 PEP는 새로운 호환성 파기 변경을 도입하는 것을 피하기 위해 l-value로 사용될 수 있는 매크로의 변환을 제안하지 않습니다.

### 성능 문제 및 벤치마크 (Performance concerns and benchmarks)

매크로를 함수로 변환하면 성능이 저하될 수 있다는 우려가 있었습니다. 이 섹션에서는 성능 문제와 PR 29728을 사용한 벤치마크 결과를 설명합니다. 이 PR은 다음 `static inline` 함수들을 매크로로 대체합니다:

*   `PyObject_TypeCheck()`
*   `PyType_Check()`, `PyType_CheckExact()`
*   `PyType_HasFeature()`
*   `PyVectorcall_NARGS()`
*   `Py_DECREF()`, `Py_XDECREF()`
*   `Py_INCREF()`, `Py_XINCREF()`
*   `Py_IS_TYPE()`
*   `Py_NewRef()`
*   `Py_REFCNT()`, `Py_TYPE()`, `Py_SIZE()`

벤치마크는 Fedora 35 (Linux)에서 GCC 11을 사용하고 8개의 논리 CPU (4개의 물리적 CPU 코어)를 가진 노트북에서 실행되었습니다.

#### `static inline` 함수

무엇보다도, 매크로를 `static inline` 함수로 변환하는 것은 성능에 미미한 영향을 미칩니다. 측정된 차이는 무관한 요인으로 인한 노이즈와 일치합니다.

`static inline` 함수는 C99 표준의 새로운 기능입니다. 최신 C 컴파일러는 함수를 인라인할지 여부를 결정하는 효율적인 휴리스틱(heuristics)을 가지고 있습니다. C 컴파일러가 인라인하지 않기로 결정할 때는 합당한 이유가 있을 가능성이 높습니다. 예를 들어, 인라인하면 레지스터를 재사용하게 되어 스택에 레지스터 값을 저장/복원해야 하므로 스택 메모리 사용량이 증가하거나 효율성이 떨어질 수 있습니다.

`gcc -O3`, LTO, PGO로 릴리스 모드에서 빌드된 Python에서 `./python -m test -j5` 명령의 벤치마크:

*   매크로 (PR 29728): 361초 ± 1초
*   `static inline` 함수 (참고): 361초 ± 1초

`static inline` 함수가 인라인될 때 매크로와 `static inline` 함수 사이에 유의미한 성능 차이는 없습니다.

#### 디버그 빌드 (Debug build)

디버그 빌드(debug builds)에서는 매크로가 함수로 변환될 때 성능이 저하될 수 있습니다. 이는 더 나은 디버깅 가능성(debuggability)으로 보상됩니다: 디버거는 함수 이름을 검색하고, 함수 내부에 중단점을 설정하는 등의 작업을 할 수 있습니다.

Windows에서 Visual Studio로 Python이 디버그 모드로 빌드될 때, `static inline` 함수는 인라인되지 않습니다.

다른 플랫폼에서는 `./configure --with-pydebug` 명령이 지원하는 컴파일러(GCC 및 LLVM Clang 포함)에서 `-Og` 컴파일러 옵션을 사용합니다. `-Og`는 "디버깅 경험 최적화"를 의미합니다. 그렇지 않으면 `-O0` 컴파일러 옵션이 사용됩니다. `-O0`는 "대부분의 최적화 비활성화"를 의미합니다.

GCC 11에서 `gcc -Og`는 `static inline` 함수를 인라인할 수 있지만, `gcc -O0`는 `static inline` 함수를 인라인하지 않습니다.

`gcc -O0` (즉, 인라이닝을 포함한 컴파일러 최적화가 명시적으로 비활성화됨)로 디버그 모드에서 빌드된 Python에서 `./python -m test -j10` 명령의 벤치마크:

*   매크로 (PR 29728): 345초 ± 5초
*   `static inline` 함수 (참고): 360초 ± 6초

컴파일러가 `static inline` 함수를 인라인하지 않을 때 매크로를 `static inline` 함수로 대체하면 Python이 1.04배 느려집니다.

벤치마크는 Python 디버그 빌드에서 실행해서는 안 된다는 점에 유의하십시오. 또한, 최고의 성능과 신뢰할 수 있는 벤치마크를 위해 링크 타임 최적화(LTO) 및 프로파일 기반 최적화(PGO)를 사용하는 것이 권장됩니다. PGO는 컴파일러가 함수를 인라인할지 여부를 결정하는 데 도움이 됩니다.

#### 강제 인라이닝 (Force inlining)

`Py_ALWAYS_INLINE` 매크로는 인라이닝을 강제하는 데 사용될 수 있습니다. 이 매크로는 GCC 및 Clang에서는 `__attribute__((always_inline))`을, MSC에서는 `__forceinline`을 사용합니다.

이전에 `Py_ALWAYS_INLINE`을 사용하려는 시도는 어떤 이점도 보여주지 못하고 포기되었습니다. 예를 들어 bpo-45094 "디버그 빌드에서 `static inline` 함수 (`Py_INCREF`, `Py_TYPE`)에 `__forceinline` 및 `__attribute__((always_inline))` 사용 고려"를 참조하십시오.

2018년 `Py_INCREF()` 매크로가 `static inline` 함수로 변환되었을 때, 인라이닝을 강제하지 않기로 결정되었습니다. 여러 C 컴파일러 및 컴파일러 옵션으로 기계어 코드를 분석한 결과, `Py_INCREF()`는 인라이닝을 강제할 필요 없이 항상 인라인되었습니다. 인라인되지 않은 유일한 경우는 디버그 빌드였습니다. bpo-35059 "Convert Py_INCREF() and PyObject_INIT() to inlined functions"의 논의를 참조하십시오.

#### 인라이닝 비활성화 (Disabling inlining)

반대로, `Py_NO_INLINE` 매크로는 인라이닝을 비활성화하는 데 사용될 수 있습니다. 이는 스택 메모리 사용량을 줄이거나, 일반적으로 코드를 더 적극적으로 인라인하는 LTO+PGO 빌드에서 인라이닝을 방지하는 데 사용될 수 있습니다. (bpo-33720 참조). `Py_NO_INLINE` 매크로는 GCC 및 Clang에서는 `__attribute__ ((noinline))`을, MSC에서는 `__declspec(noinline)`을 사용합니다.

이 기술은 사용 가능하지만, 현재로서는 유용할 만한 구체적인 함수를 알지 못합니다. 매크로는 인라이닝을 전혀 비활성화할 수 없다는 점에 유의하십시오.

### 거부된 아이디어 (Rejected Ideas)

#### 매크로를 유지하되 일부 매크로 문제 수정 (Keep macros, but fix some macro issues)

매크로는 모든 C 컴파일러에서 항상 "인라인"됩니다. 부작용 중복은 매크로 호출자에서 해결될 수 있습니다. 매크로를 사용하는 사람들은 "동의하는 성인(consenting adults)"으로 간주되어야 합니다. 매크로에 대해 불안감을 느끼는 사람들은 단순히 매크로를 사용하지 않아야 합니다.

이러한 아이디어들은 매크로가 오류 발생 가능성이 높고, 매크로 코드를 작성하고 검토할 때 매크로 함정을 놓치기 너무 쉽기 때문에 거부되었습니다. 또한 매크로는 함수보다 읽고 유지보수하기 어렵습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.