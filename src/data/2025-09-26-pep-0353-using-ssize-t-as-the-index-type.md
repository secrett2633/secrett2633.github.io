---
title: "[Final] PEP 353 - Using ssize_t as the index type"
excerpt: "Python Enhancement Proposal 353: 'Using ssize_t as the index type'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/353/
toc: true
toc_sticky: true
date: 2025-09-26 18:59:36+0900
last_modified_at: 2025-09-26 18:59:36+0900
published: true
---
> **원문 링크:** [PEP 353 - Using ssize_t as the index type](https://peps.python.org/pep-0353/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 18-Dec-2005

PEP 353 – `ssize_t`를 인덱스 타입으로 사용하기

## 개요 (Abstract)

Python 2.4에서는 시퀀스의 인덱스가 C 타입 `int`로 제한되었습니다. 이로 인해 64비트 머신에서는 시퀀스가 전체 주소 공간을 활용하지 못하고, 2^31개 요소로 제한되었습니다. 이 PEP는 이러한 제한을 변경하고, 플랫폼별 인덱스 타입인 `Py_ssize_t`를 도입할 것을 제안합니다. 제안된 변경 사항에 대한 구현은 `http://svn.python.org/projects/python/branches/ssize_t`에서 확인할 수 있습니다.

## 도입 배경 (Rationale)

64비트 머신이 보편화되고 주 메모리 크기가 4GiB를 초과함에 따라, Python은 현재 시퀀스(문자열, 유니코드 객체, 튜플, 리스트, `array.array` 등)가 2^31개 이상의 요소를 포함할 수 없다는 제한을 가지고 있습니다.

현재 대규모 리스트를 나타낼 만큼 메모리를 가진 머신은 매우 드뭅니다. 64비트 머신에서 각 포인터가 8B이므로, 그러한 리스트의 포인터만 저장하는 데 16GiB가 필요하며, 리스트에 데이터까지 포함하면 메모리 소비는 훨씬 더 커집니다. 그러나, 사용자들은 다음 세 가지 컨테이너 타입에 대한 개선을 요구하고 있습니다:

*   **문자열 (strings):** 현재 2GiB로 제한됩니다.
*   **mmap 객체:** 마찬가지로 제한되며, 시스템이 전체 객체를 동시에 메모리에 유지하지 못하는 경우가 많습니다.
*   **Numarray 객체 (Numerical Python):** (NumPy의 이전 버전)

제안된 변경 사항은 64비트 머신에서 호환성 문제를 일으킬 수 있으므로, 이러한 머신이 널리 사용되기 전에(즉, 가능한 한 빨리) 수행되어야 합니다.

## 상세 (Specification)

새로운 타입 `Py_ssize_t`가 도입됩니다. 이 타입은 컴파일러의 `size_t` 타입과 동일한 크기를 가지지만, 부호 있는(signed) 타입입니다. `ssize_t`가 사용 가능한 환경에서는 `ssize_t`의 `typedef`가 됩니다.

표준 배포판에 포함된 모든 컨테이너 타입의 `length` 필드의 내부 표현은 `int`에서 `ssize_t`로 변경됩니다. 특히, `PyObject_VAR_HEAD` 매크로를 사용하는 모든 확장 모듈에 영향을 미치도록 `PyObject_VAR_HEAD`가 `Py_ssize_t`를 사용하도록 변경됩니다.

타입 객체의 시퀀스 슬롯(sequence slots)과 버퍼 인터페이스를 포함하여 인덱스 및 길이 매개변수와 결과의 모든 발생이 `Py_ssize_t`를 사용하도록 변경됩니다.

새로운 변환 함수 `PyInt_FromSsize_t` 및 `PyInt_AsSsize_t`가 도입됩니다.
*   `PyInt_FromSsize_t`는 값이 `LONG_MAX`를 초과하면 투명하게 `long int` 객체를 반환합니다.
*   `PyInt_AsSsize_t`는 `long int` 객체를 투명하게 처리합니다.

새로운 함수 포인터 `typedef`인 `ssizeargfunc`, `ssizessizeargfunc`, `ssizeobjargproc`, `ssizessizeobjargproc`, 그리고 `lenfunc`가 도입됩니다. 버퍼 인터페이스 함수 타입은 이제 `readbufferproc`, `writebufferproc`, `segcountproc`, `charbufferproc`로 불립니다.

`PyArg_ParseTuple`, `Py_BuildValue`, `PyObject_CallFunction`, `PyObject_CallMethod`에 새로운 변환 코드 `'n'`이 도입됩니다. 이 코드는 `Py_ssize_t`에 대해 작동합니다.

변환 코드 `'s#'` 및 `'t#'`는 `Python.h`를 포함하기 전에 매크로 `PY_SSIZE_T_CLEAN`이 정의되어 있으면 `Py_ssize_t`를 출력하고, 매크로가 정의되어 있지 않으면 `int`를 계속 출력합니다.

`size_t`/`Py_ssize_t`에서 `int`로의 변환이 필요한 곳에서는 경우에 따라 변환 전략이 선택됩니다 (다음 섹션 참조).

32비트 사이즈 타입을 가정하는 확장 모듈이 64비트 사이즈 타입을 가진 인터프리터에 로드되는 것을 방지하기 위해, `Py_InitModule4`는 `Py_InitModule4_64`로 이름이 변경됩니다.

## 변환 가이드라인 (Conversion guidelines)

모듈 작성자는 이 PEP를 코드에서 지원할지 여부를 선택할 수 있으며, 지원하는 경우 다양한 수준의 호환성을 선택할 수 있습니다.

이 PEP를 지원하도록 변환되지 않은 모듈은 32비트 시스템에서 수정 없이 계속 작동합니다. 64비트 시스템에서는 컴파일 시간 오류 및 경고가 발생할 수 있으며, 경고를 무시할 경우 모듈이 인터프리터를 충돌시킬 수 있습니다.

모듈의 변환은 `int` 인덱스를 계속 사용하려고 시도하거나 `Py_ssize_t` 인덱스를 전체적으로 사용할 수 있습니다.

모듈이 `int` 인덱스를 계속 사용해야 하는 경우, `Py_ssize_t` 또는 `size_t`를 반환하는 함수를 호출할 때 특히 주의해야 합니다. 이는 객체의 길이를 반환하는 함수(`strlen` 함수 및 `sizeof` 연산자 포함)에 해당합니다. 좋은 컴파일러는 `Py_ssize_t`/`size_t` 값이 `int`로 잘릴 때 경고를 발생시킵니다. 이러한 경우 세 가지 전략을 사용할 수 있습니다.

1.  **정적으로(statically) 크기가 `int`를 초과할 수 없다고 판단되는 경우:** (예: 구조체의 `sizeof`를 취하거나 파일 경로 이름의 `strlen`을 취할 때) 이 경우 다음과 같이 작성합니다:
    ```c
    some_int = Py_SAFE_DOWNCAST(some_value, Py_ssize_t, int);
    ```
    이는 디버그 모드에서 값이 실제로 `int`에 맞는지 확인하는 `assertion`을 추가하고, 그렇지 않은 경우에는 단순히 `cast`를 추가합니다.

2.  **정적으로 값이 `int`를 오버플로우해서는 안 되지만 C 코드 어딘가에 버그가 있을 수 있다고 판단되는 경우:** 값이 `INT_MAX`보다 작은지 테스트하고, 그렇지 않으면 `InternalError`를 발생시킵니다.

3.  **그 외의 경우:** 값이 `int`에 맞는지 확인하고, 맞지 않으면 `ValueError`를 발생시킵니다.

`tp_as_sequence` 슬롯에도 동일한 주의가 필요하며, 또한 이러한 슬롯의 서명(signatures)이 변경되고 슬롯을 명시적으로 재캐스팅(recast)해야 합니다 (예: `intargfunc`에서 `ssizeargfunc`로). 이전 Python 버전과의 호환성은 다음 테스트를 통해 달성할 수 있습니다.

```c
#if PY_VERSION_HEX < 0x02050000 && !defined(PY_SSIZE_T_MIN)
typedef int Py_ssize_t;
#define PY_SSIZE_T_MAX INT_MAX
#define PY_SSIZE_T_MIN INT_MIN
#endif
```
그리고 나머지 코드에서 `Py_ssize_t`를 사용합니다. `tp_as_sequence` 슬롯의 경우 추가 `typedef`가 필요할 수 있습니다. 또는 다음을 대체하여:

```c
PyObject* foo_item(struct MyType* obj, int index) { ... }
```
이것으로:

```c
PyObject* foo_item(PyObject* _obj, Py_ssize_t index) {
    struct MyType* obj = (struct MyType*)_obj;
    ...
}
```
`cast`를 완전히 제거하는 것이 가능해집니다. 그러면 `foo_item`의 타입은 모든 Python 버전에서 `sq_item` 슬롯과 일치해야 합니다.

모듈이 `Py_ssize_t` 인덱스를 사용하도록 확장되어야 하는 경우, `int` 타입의 모든 사용을 검토하여 `Py_ssize_t`로 변경해야 하는지 확인해야 합니다. 컴파일러가 해당 위치를 찾는 데 도움이 되지만, 수동 검토도 여전히 필요합니다.

`PyArg_ParseTuple` 호출에 특히 주의해야 합니다. 모든 `s#` 및 `t#` 변환기를 확인해야 하며, 호출이 그에 따라 업데이트된 경우 `Python.h`를 포함하기 전에 `PY_SSIZE_T_CLEAN`을 정의해야 합니다.

Fredrik Lundh는 서명이 변경된 API 사용을 위해 C 모듈의 코드를 확인하는 스캐너를 작성했습니다.

## 논의 (Discussion)

### `size_t`를 사용하지 않는 이유 (Why not size_t)

이 기능을 구현하려는 초기 시도에서는 `size_t`를 사용하려고 했습니다. 그러나 이것이 작동할 수 없다는 것이 빠르게 드러났습니다. Python은 여러 곳에서 음수 인덱스(끝에서부터 계산을 나타내기 위해)를 사용합니다. `size_t`를 사용할 수 있는 곳에서도 너무 많은 코드 재작성이 필요했습니다. 예를 들어, 다음과 같은 루프에서:

```c
for(index = length-1; index >= 0; index--)
```
이 루프는 `index`가 `int`에서 `size_t`로 변경되면 절대로 종료되지 않습니다.

### `Py_intptr_t`를 사용하지 않는 이유 (Why not Py_intptr_t)

개념적으로 `Py_intptr_t`와 `Py_ssize_t`는 다른 것입니다. `Py_intptr_t`는 `void*`와 동일한 크기여야 하고, `Py_ssize_t`는 `size_t`와 동일한 크기여야 합니다. 포인터에 세그먼트와 오프셋이 있는 머신과 같이 이들은 다를 수 있습니다. 현재의 플랫-주소 공간 머신에서는 차이가 없으므로, 모든 실질적인 목적을 위해 `Py_intptr_t`도 작동했을 것입니다.

### 많은 코드를 손상시키지 않는가? (Doesn't this break much code?)

제안된 변경 사항으로 인해 코드 손상(code breakage)은 상당히 미미합니다. 32비트 시스템에서는 `Py_ssize_t`가 단순히 `int`의 `typedef`이기 때문에 어떤 코드도 손상되지 않습니다.

64비트 시스템에서는 컴파일러가 여러 곳에서 경고를 발생시킬 것입니다. 이러한 경고를 무시하더라도 컨테이너 크기가 2^31을 초과하지 않는 한 코드는 계속 작동하며, 이는 현재와 거의 동일하게 작동할 것입니다. 이 진술에는 두 가지 예외가 있습니다.
1.  확장 모듈이 시퀀스 프로토콜을 구현하는 경우, 업데이트되어야 합니다. 그렇지 않으면 호출 규칙(calling conventions)이 잘못됩니다.
2.  `Py_ssize_t`가 포인터를 통해 출력되는 곳(반환 값이 아닌)입니다. 이는 특히 코덱(codecs) 및 슬라이스 객체(slice objects)에 적용됩니다.

코드가 변환되면, 동일한 코드는 이전 Python 릴리스에서도 계속 작동할 수 있습니다.

### 너무 많은 메모리를 소비하지 않는가? (Doesn't this consume too much memory?)

모든 튜플, 문자열, 리스트 등에서 `Py_ssize_t`를 사용하는 것이 공간 낭비라고 생각할 수 있습니다. 그러나 이것은 사실이 아닙니다.
*   32비트 머신에서는 변경 사항이 없습니다.
*   64비트 머신에서는 많은 컨테이너의 크기가 변경되지 않습니다. 예를 들어:
    *   리스트와 튜플에서 포인터는 `ob_size` 멤버 바로 뒤에 옵니다. 이는 컴파일러가 현재 4바이트의 패딩 바이트를 삽입한다는 것을 의미합니다. 변경 사항이 적용되면 이러한 패딩 바이트가 크기의 일부가 됩니다.
    *   문자열에서 `ob_shash` 필드는 `ob_size` 뒤에 옵니다. 이 필드는 `long` 타입이며, 대부분의 64비트 시스템(Win64 제외)에서 64비트 타입이므로 컴파일러는 그 앞에도 패딩을 삽입합니다.

## 미해결 문제 (Open Issues)

Marc-Andre Lemburg는 기존 소스 코드와의 완벽한 하위 호환성이 유지되어야 한다고 언급했습니다. 특히, `Py_ssize_t*` 출력 인수를 가진 함수는 호출자가 `int*`를 전달하더라도 계속 올바르게 실행되어야 합니다.

이 요구 사항을 구현하는 데 어떤 전략을 사용할 수 있을지는 불분명합니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.