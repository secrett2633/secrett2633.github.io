---
title: "[Final] PEP 357 - Allowing Any Object to be Used for Slicing"
excerpt: "Python Enhancement Proposal 357: 'Allowing Any Object to be Used for Slicing'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/357/
toc: true
toc_sticky: true
date: 2025-09-26 19:03:31+0900
last_modified_at: 2025-09-26 19:03:31+0900
published: true
---
> **원문 링크:** [PEP 357 - Allowing Any Object to be Used for Slicing](https://peps.python.org/pep-0357/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 09-Feb-2006


## PEP 357 – 슬라이싱에 모든 객체 사용 허용

*   **작성자:** Travis Oliphant
*   **상태:** Final (최종)
*   **유형:** Standards Track
*   **작성일:** 2006년 2월 9일
*   **Python 버전:** 2.5
*   **사후 이력:** (생략)

### 요약 (Abstract)

이 PEP는 `PyNumberMethods`에 `nb_index` 슬롯을, 그리고 이에 상응하는 `__index__` 특별 메서드를 추가할 것을 제안합니다. 이를 통해 파이썬에서 정수가 명시적으로 필요한 경우(예: 슬라이스 문법)에 모든 임의의 객체를 사용할 수 있게 됩니다.

### 배경 (Rationale)

현재 파이썬에서 슬라이싱(`X[obj1:obj2]`)은 `obj1`과 `obj2`가 정수(integers) 또는 긴 정수(long integers)일 경우에만 유효합니다. 즉, 시퀀스(sequence) 프로토콜을 구현하는 객체 `X`에 대해 `obj1`과 `obj2`가 스스로를 시퀀스의 인덱스로 합리적으로 사용될 수 있다고 파이썬에 알릴 방법이 없습니다. 이는 불필요한 제약입니다.

예를 들어, NumPy 라이브러리에는 8비트, 16비트, 32비트, 64비트의 부호 있는/없는 정수에 해당하는 8가지 다른 정수 스칼라(scalar) 타입이 있습니다. 이 타입 객체들은 파이썬이 진정한 정수를 기대하는 많은 곳에서 정수처럼 합리적으로 사용될 수 있지만, 파이썬의 정수 타입과 메모리 레이아웃이 호환되지 않기 때문에 파이썬 정수 타입을 상속할 수 없습니다. 객체가 정수처럼 동작할 수 있다는 것을 파이썬에 알릴 방법이 필요합니다.

`nb_int` (및 `__int__` 특별 메서드)를 이 목적으로 사용할 수는 없습니다. 이 메서드는 객체를 정수로 강제 변환(coerce)하는 데 사용되기 때문입니다. 정수로 강제 변환될 수 있는 모든 객체를 파이썬이 진정한 정수를 기대하는 모든 곳에서 정수로 사용하도록 허용하는 것은 부적절합니다. 예를 들어, 슬라이싱에서 `__int__`를 사용하여 객체를 정수로 변환하도록 허용한다면, `float` 객체도 슬라이싱에 허용되어 `x[3.2:5.8]`와 같은 코드가 오류를 발생시키지 않을 것입니다.

### 제안 (Proposal)

`PyNumberMethods`에 `nb_index` 슬롯과 이에 상응하는 `__index__` 특별 메서드를 추가합니다. 객체는 `nb_index` 슬롯에 파이썬 정수(`int` 또는 `long`)를 반환하는 함수를 정의할 수 있습니다. 이 정수는 `PySequence_GetSlice`, `PySequence_SetSlice`, `PySequence_DelSlice` 등 파이썬이 필요로 할 때 `Py_ssize_t` 값으로 적절히 변환될 수 있습니다.

### 명세 (Specification)

`nb_index` 슬롯은 다음과 같은 시그니처를 가집니다:

```c
PyObject *index_func (PyObject *self)
```

반환되는 객체는 `Python IntType` 또는 `Python LongType`이어야 합니다. 오류 발생 시에는 적절한 오류가 설정된 채 `NULL`이 반환되어야 합니다.

`__index__` 특별 메서드는 다음과 같은 시그니처를 가집니다:

```python
def __index__(self):
    return obj
```

여기서 `obj`는 `int` 또는 `long`이어야 합니다.

새로운 추상 C-API 함수 3개가 추가됩니다:

1.  **`int PyIndex_Check(obj)`** : 객체가 `nb_index` 슬롯을 지원하고 채워져 있는지 확인합니다. 객체가 `nb_index` 슬롯을 정의하면 `true`를 반환합니다.

2.  **`PyObject *PyNumber_Index (PyObject *obj)` **: `nb_index` 호출을 감싸는 간단한 래퍼(wrapper)입니다. 호출이 불가능하거나 `int` 또는 `long`을 반환하지 않으면 `PyExc_TypeError`를 발생시킵니다.

3.  ** `Py_ssize_t PyNumber_AsSsize_t(PyObject *obj, PyObject *exc)`**: 객체에서 `Py_ssize_t` 값을 얻어야 하는 일반적인 상황을 처리하는 데 도움을 줍니다. `obj`의 `nb_index` 슬롯이 사용 가능하면 호출하고, 반환된 파이썬 정수를 `Py_ssize_t` 값으로 변환합니다. 반환된 정수가 `Py_ssize_t` 값에 맞지 않을 경우 `exc` 인수를 통해 동작을 제어할 수 있습니다.

`operator.index(obj)`라는 새 함수가 추가되어 `obj.__index__()`와 동등한 호출을 수행하며, `obj`가 특별 메서드를 구현하지 않으면 오류를 발생시킵니다.

### 구현 계획 (Implementation Plan)

*   `object.h`에 `nb_index` 슬롯을 추가하고 `typeobject.c`를 수정하여 `__index__` 메서드를 생성합니다.
*   `ceval.c`의 `ISINT` 매크로를 `ISINDEX`로 변경하고, `index` 슬롯이 정의된 객체를 수용하도록 수정합니다.
*   `_PyEval_SliceIndex` 함수를 `index` 슬롯이 정의된 객체를 수용하도록 변경합니다.
*   서브스크립트 접근을 위해 `as_mapping` 슬롯을 사용하고 정수 특별 검사를 수행하는 모든 내장 객체(예: 리스트)가 해당 슬롯도 검사하도록 변경합니다.
*   정수(integers)와 긴 정수(long integers)에 `nb_index` 슬롯을 추가합니다(이들은 자신을 반환).
*   `nb_index` 슬롯을 가진 모든 파이썬 객체에서 정수를 반환하는 `PyNumber_Index` C-API를 추가합니다.
*   `operator.index(x)` 함수를 추가합니다.
*   `arrayobject.c` 및 `mmapmodule.c`를 수정하여 새로운 C-API를 서브스크립트 및 기타 용도로 사용하도록 합니다.
*   단위 테스트를 추가합니다.

### 논의 질문 (Discussion Questions)

#### 속도 (Speed)

정수와 긴 정수가 인덱스로 사용될 때 동일한 수의 명령으로 완료되므로, 구현이 파이썬 속도를 저하시키지 않을 것입니다. 유일한 변경점은 이전에는 오류를 발생시키던 것이 이제는 허용된다는 점입니다.

#### 왜 기존의 `nb_int`를 사용하지 않는가? (Why not use nb_int which is already there?)

`nb_int` 메서드는 강제 변환(coercion)에 사용되므로, 여기서 요청하는 것과는 근본적으로 다른 의미를 가집니다. 이 PEP는 이미 정수로 간주될 수 있는 어떤 것이 파이썬이 정수를 필요로 할 때 그 정보를 전달하는 방법을 제안합니다. `nb_int`를 사용하는 것이 좋지 않은 가장 큰 예시는 `float` 객체가 이미 `nb_int` 메서드를 정의하지만, `float` 객체는 시퀀스의 인덱스로 사용되어서는 안 된다는 것입니다.

#### `__index__`라는 이름은 왜? (Why the name __index__ ?)

슬롯의 다른 해석이 가능함에도 불구하고 `__index__`라는 이름에 대한 질문이 제기되었습니다. 예를 들어, 이 슬롯은 파이썬이 내부적으로 정수를 필요로 할 때(`"mystring" * 3`와 같은 경우) 언제든지 사용될 수 있습니다. 귀도 반 로섬(Guido van Rossum)이 이 이름을 제안했는데, 슬라이싱 문법이 이러한 슬롯을 갖는 가장 큰 이유이며, 결국 더 나은 이름이 나오지 않았기 때문입니다. " `__discrete__` " 및 " `__ordinal__` "과 같은 제안된 이름의 예시는 논의 스레드를 참조하십시오.

#### `nb_index`가 `PyObject *`를 반환하는 이유는? (Why return PyObject * from nb_index ?)

처음에는 `Py_ssize_t`가 `nb_index` 슬롯의 반환 타입으로 선택되었습니다. 그러나 이는 보기 흉하고 불안정한 해킹 없이는 오버플로우(overflow) 및 언더플로우(underflow) 오류를 추적하고 구별할 수 없게 만들었습니다. `nb_index` 슬롯은 파이썬 코어에서 최소한 세 가지 다른 방식으로 사용되므로(정수를 얻기 위해, 슬라이스 끝점을 얻기 위해, 시퀀스 인덱스를 얻기 위해), 이 모든 경우를 처리하는 데 상당한 유연성이 필요합니다. 모든 사용 사례를 처리하는 데 필요한 유연성을 갖는 것이 중요합니다. 예를 들어, `nb_index`에 대해 `Py_ssize_t`를 반환하는 초기 구현은 32비트 머신에서 2GB 이상의 RAM을 사용할 때 `s = 'x' * (2 **100)`이 작동하지만 `len(s)`가 2147483647로 잘리는 문제를 발견하게 했습니다. 몇 가지 수정 사항이 제안되었지만, 결국 `nb_index`가 오버플로우를 올바르게 처리하기 위해 `nb_int` 및 `nb_long` 슬롯과 유사하게 파이썬 객체를 반환해야 한다고 결정되었습니다.

#### `__index__`가 `nb_index` 메서드를 가진 어떤 객체라도 반환할 수 없는 이유는? (Why can't __index__ return any object with the nb_index method?)

이는 확인하기 어려운 여러 가지 방식으로 무한 재귀를 허용할 수 있기 때문입니다. 이 제약은 `__nonzero__`가 `int` 또는 `bool`을 반환해야 한다는 요구 사항과 유사합니다.

### 참조 구현 (Reference Implementation)

SourceForge에 패치 1436368로 제출되었습니다.

### 참고 자료 (References)

 Travis Oliphant, PEP for adding an sq_index slot so that any object, a or b, can be used in X[a:b] notation,
    `https://mail.python.org/pipermail/python-dev/2006-February/thread.html#60594`

### 저작권 (Copyright)

이 문서는 공개 도메인에 있습니다.


> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.