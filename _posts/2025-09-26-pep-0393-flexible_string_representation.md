---
title: "[Final] PEP 393 - Flexible String Representation"
excerpt: "Python Enhancement Proposal 393: 'Flexible String Representation'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/393/
toc: true
toc_sticky: true
date: 2025-09-26 21:20:21+0900
last_modified_at: 2025-09-26 21:20:21+0900
published: true
---
> **원문 링크:** [PEP 393 - Flexible String Representation](https://peps.python.org/pep-0393/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 24-Jan-2010

PEP 393 – 유연한 문자열 표현 (Flexible String Representation)

## 개요 (Abstract)
이 PEP는 유니코드 문자열 타입이 여러 내부 표현 방식을 지원하도록 변경하는 것을 제안합니다. 이는 문자열 내 가장 큰 유니코드 코드 포인트(1, 2, 또는 4바이트)에 따라 내부 표현이 달라지도록 하여, 일반적인 경우 메모리 효율적인 표현을 가능하게 하면서도 모든 시스템에서 완전한 UCS-4에 접근할 수 있도록 합니다. 기존 API와의 호환성을 위해 여러 표현이 동시에 존재할 수 있으며, 시간이 지남에 따라 이러한 호환성은 점진적으로 제거될 것입니다. 이 변경으로 인해 "narrow" 및 "wide" 유니코드 빌드의 구분은 사라집니다.

## 도입 배경 (Rationale)
기존 `unicode` 타입 구현에는 두 가지 주요 불만이 있었습니다. 첫째, UTF-16만 지원하는 시스템에서는 BMP(Basic Multilingual Plane) 이외의 문자가 제대로 지원되지 않는다는 불만이 있었습니다. 둘째, 내부적으로 UCS-4를 사용하는 시스템(그리고 때로는 UCS-2를 사용하는 시스템)에서는 유니코드 문자열이 너무 많은 메모리를 차지한다는 불만이 있었습니다. 특히 Python 2.x에서는 동일한 코드가 종종 ASCII 문자열(즉, ASCII로 인코딩된 바이트 문자열)을 사용하여 메모리 사용량이 적었던 것에 비해 불만이 제기되었습니다.

제안된 접근 방식에 따르면, ASCII만 포함하는 유니코드 문자열은 다시 문자당 1바이트만 사용하게 됩니다. 동시에 BMP 이외의 문자를 포함하는 문자열은 문자당 4바이트를 사용하여 효율적인 인덱싱을 가능하게 합니다.

이 접근 방식의 한 가지 문제는 기존 애플리케이션(예: 확장 모듈)에 대한 지원입니다. 호환성을 위해 중복된 표현이 계산될 수 있습니다. 애플리케이션은 가능하면 특정 내부 표현에 대한 의존성을 점진적으로 줄여나갈 것을 권장합니다. 다른 라이브러리와의 상호작용 시 종종 어떤 형태의 내부 표현이 필요하므로, 이 PEP는 C 코드에 문자열을 노출하는 권장 방법으로 UTF-8을 선택합니다.

많은 문자열(예: ASCII)의 경우, 여러 표현이 실제로 메모리를 공유할 수 있습니다(예: 모든 문자가 ASCII인 경우 가장 짧은 형식과 UTF-8 형식이 공유될 수 있음). 이러한 공유를 통해 호환성 표현의 오버헤드가 줄어듭니다. 표현들이 데이터를 공유하는 경우, 구조체 필드를 생략하여 문자열 객체의 기본 크기를 줄일 수도 있습니다.

## 사양 (Specification)
유니코드 구조체는 이제 `PyASCIIObject`, `PyCompactUnicodeObject`, `PyUnicodeObject`와 같은 계층 구조로 정의됩니다.

- `PyASCIIObject`: 크기와 최대 문자를 생성 시점에 아는 객체 중 최대 문자가 128 미만인 경우 사용됩니다.
- `PyCompactUnicodeObject`: 크기와 최대 문자를 생성 시점에 아는 객체 중 비-ASCII 문자열에 사용됩니다. 이 객체들은 "compact" 유니코드 객체라고 불리며, 문자 데이터가 기본 구조체 바로 뒤에 옵니다. compact 객체의 크기 변경은 지원되지 않습니다.
- `PyUnicodeObject`: 생성 시점에 최대 문자가 주어지지 않는 객체("legacy" 객체)에 사용됩니다. 초기에는 `wstr` 포인터에만 데이터가 있으며, `PyUnicode_READY`가 호출될 때 `data` 포인터(union)가 할당됩니다. `PyUnicode_READY`가 호출되기 전까지는 크기 변경이 가능합니다.

필드는 다음과 같은 의미를 가집니다:
- `length`: 문자열의 코드 포인트 수
- `interned`: 3.2 버전과 동일한 interned-상태
- `kind`: 문자열의 형식 (00: 미초기화, 01: 1바이트 (Latin-1), 10: 2바이트 (UCS-2), 11: 4바이트 (UCS-4))
- `compact`: 객체가 compact 표현 중 하나를 사용하는지 여부 (ready를 의미)
- `ascii`: 객체가 `PyASCIIObject` 표현을 사용하는지 여부 (compact 및 ready를 의미)
- `ready`: 정식(canonical) 표현에 `PyUnicode_DATA` 및 `PyUnicode_GET_LENGTH`를 통해 접근할 준비가 되었는지 여부
- `wstr_length`, `wstr`: 플랫폼의 `wchar_t`로 표현된 null-종료 문자열. `wstr_length`는 surrogate pair가 있는 경우에만 `length`와 다릅니다.
- `utf8_length`, `utf8`: UTF-8 표현 (null-종료).
- `data`: 유니코드 문자열의 최단 형식 표현. 이 문자열도 해당 표현에서 null-종료됩니다.

세 가지 표현 모두 선택 사항이지만, `data` 형식은 정식 표현으로 간주되며, 문자열이 생성되는 동안에만 없을 수 있습니다. `Py_UNICODE` 타입은 여전히 지원되지만, 더 이상 사용되지 않습니다.

`data`와 `utf8` 포인터는 문자열이 ASCII 문자만 사용하는 경우 동일한 메모리를 가리킵니다. `data`와 `wstr` 포인터는 문자열이 플랫폼의 `wchar_t` 타입에 정확히 맞는 경우(예: `sizeof(wchar_t)`가 2일 때 BMP-non-Latin-1 문자를 사용하거나, `sizeof(wchar_t)`가 4일 때 BMP 이외의 문자를 사용하는 경우) 동일한 메모리를 가리킵니다.

### 문자열 생성 (String Creation)
유니코드 객체를 생성하는 권장 방법은 `PyUnicode_New` 함수를 사용하는 것입니다:
```c
PyObject* PyUnicode_New(Py_ssize_t size, Py_UCS4 maxchar);
```
두 매개변수는 문자열의 최종 크기/범위를 나타내야 합니다. `PyUnicode_FromString` 및 `PyUnicode_FromStringAndSize`는 UTF-8 입력을 처리하기 위해 계속 지원됩니다. `PyUnicode_FromUnicode`는 지원되지만 더 이상 사용되지 않습니다.

`PyUnicode_READY()`는 `wstr` 표현만 포함하는 문자열을 정식 표현으로 변환합니다. `wstr`와 `data`가 메모리를 공유할 수 없는 경우, `wstr` 표현은 변환 후 버려집니다.

### 문자열 접근 (String Access)
정식 표현은 `PyUnicode_Kind` 및 `PyUnicode_Data` 두 매크로를 사용하여 접근할 수 있습니다.
- `PyUnicode_Kind`: `PyUnicode_WCHAR_KIND (0)`, `PyUnicode_1BYTE_KIND (1)`, `PyUnicode_2BYTE_KIND (2)`, 또는 `PyUnicode_4BYTE_KIND (3)` 중 하나를 반환합니다.
- `PyUnicode_DATA`: 데이터에 대한 `void` 포인터를 반환합니다.

개별 문자에 접근하려면 `PyUnicode_{READ|WRITE}[_CHAR]`를 사용해야 합니다:
```c
PyUnicode_READ(kind, data, index)
PyUnicode_WRITE(kind, data, index, value)
PyUnicode_READ_CHAR(unicode, index)
```
이러한 매크로는 문자열이 정식 형식이라고 가정하므로, 호출자는 `PyUnicode_READY`를 호출하여 이를 보장해야 합니다.

UTF-8 표현에 접근하기 위해 새로운 함수 `PyUnicode_AsUTF8`가 제공됩니다. 이 함수는 처음 호출될 때 UTF-8 표현을 계산합니다.

### 새로운 API (New API)
새롭게 추가된 API는 다음과 같습니다:

- **내부 표현 접근 매크로 (읽기 전용):**
  `PyUnicode_IS_COMPACT_ASCII(o)`, `PyUnicode_IS_COMPACT(o)`, `PyUnicode_IS_READY(o)`
  `PyUnicode_GET_LENGTH(o)`
  `PyUnicode_KIND(o)`, `PyUnicode_CHARACTER_SIZE(o)`, `PyUnicode_MAX_CHAR_VALUE(o)`
  `PyUnicode_DATA(o)`, `PyUnicode_1BYTE_DATA(o)`, `PyUnicode_2BYTE_DATA(o)`, `PyUnicode_4BYTE_DATA(o)`

- **문자 접근 매크로:**
  `PyUnicode_READ(kind, data, index)`, `PyUnicode_READ_CHAR(o, index)`
  `PyUnicode_WRITE(kind, data, index, value)`

- **기타 매크로:**
  `PyUnicode_READY(o)`
  `PyUnicode_CONVERT_BYTES(from_type, to_type, begin, end, to)`

- **문자열 생성 함수:**
  `PyUnicode_New(size, maxchar)`
  `PyUnicode_FromKindAndData(kind, data, size)`
  `PyUnicode_Substring(o, start, end)`

- **문자 접근 유틸리티 함수:**
  `PyUnicode_GetLength(o)`, `PyUnicode_ReadChar(o, index)`, `PyUnicode_WriteChar(o, index, character)`
  `PyUnicode_CopyCharacters(to, to_start, from, from_start, how_many)`
  `PyUnicode_FindChar(str, ch, start, end, direction)`

- **표현 변환:**
  `PyUnicode_AsUCS4(o, buffer, buflen)`
  `PyUnicode_AsUCS4Copy(o)`
  `PyUnicode_AsUnicodeAndSize(o, size_out)`
  `PyUnicode_AsUTF8(o)`
  `PyUnicode_AsUTF8AndSize(o, size_out)`

- **UCS4 유틸리티 함수:**
  `Py_UCS4_{strlen, strcpy, strcat, strncpy, strcmp, strncmp, strchr, strrchr}`

### 안정적인 ABI (Stable ABI)
`PyUnicode_New`, `PyUnicode_Substring`, `PyUnicode_GetLength`, `PyUnicode_ReadChar`, `PyUnicode_WriteChar`, `PyUnicode_Find`, `PyUnicode_FindChar`와 같은 함수들은 유니코드 객체의 실제 표현과 독립적이므로 안정적인 ABI (PEP 384)에 추가됩니다.

### GDB 디버깅 훅 (GDB Debugging Hooks)
`Tools/gdb/libpython.py`는 CPython의 데이터 타입, 특히 `PyUnicodeObject` 인스턴스의 내부 지식을 포함하는 디버깅 훅을 제공하며, 이 변경 사항을 추적하도록 업데이트되었습니다.

### 사용 중단, 제거 및 비호환성 (Deprecations, Removals, and Incompatibilities)
`Py_UNICODE` 표현 및 관련 API는 이 PEP로 인해 사용 중단되지만, API 제거는 예정되어 있지 않습니다. 이 API는 PEP가 승인된 후 최소 5년 동안은 계속 사용할 수 있어야 합니다.

다음 매크로 및 함수들은 사용 중단됩니다:
`PyUnicode_FromUnicode`, `PyUnicode_GET_SIZE`, `PyUnicode_GetSize`, `PyUnicode_GET_DATA_SIZE`, `PyUnicode_AS_UNICODE`, `PyUnicode_AsUnicode`, `PyUnicode_AsUnicodeAndSize`, `PyUnicode_COPY`, `PyUnicode_FILL`, `PyUnicode_MATCH`, `PyUnicode_Encode`, `PyUnicode_EncodeUTF7`, `PyUnicode_EncodeUTF8`, `PyUnicode_EncodeUTF16`, `PyUnicode_EncodeUTF32`, `PyUnicode_EncodeUnicodeEscape`, `PyUnicode_EncodeRawUnicodeEscape`, `PyUnicode_EncodeLatin1`, `PyUnicode_EncodeASCII`, `PyUnicode_EncodeCharmap`, `PyUnicode_TranslateCharmap`, `PyUnicode_EncodeMBCS`, `PyUnicode_EncodeDecimal`, `PyUnicode_TransformDecimalToASCII`, `Py_UNICODE_{strlen, strcat, strcpy, strcmp, strchr, strrchr}`, `PyUnicode_AsUnicodeCopy`, `PyUnicode_GetMax`

`_PyUnicode_AsDefaultEncodedString`는 제거됩니다. 이 함수는 이전에 UTF-8 인코딩된 바이트 객체에 대한 빌린 참조(borrowed reference)를 반환했습니다. 유니코드 객체가 더 이상 이러한 참조를 캐시할 수 없으므로 메모리 누수 없이 이를 구현하는 것은 불가능합니다. 이 API는 내부용으로만 사용되었기 때문에 사용 중단 단계는 제공되지 않습니다.

레거시 API를 사용하는 확장 모듈은 객체가 준비되어야 하는 일부 API를 호출함으로써 의도치 않게 `PyUnicode_READY`를 호출한 다음, (이제는 유효하지 않은) `Py_UNICODE` 포인터에 계속 접근할 수 있습니다. 이러한 코드는 이 PEP와 함께 작동하지 않게 됩니다. 모듈이 이 문제에 직면하면 API 호출 후 `Py_UNICODE` 포인터를 다시 가져와야 합니다.

## 논의 (Discussion)
제시된 접근 방식에 대해 몇 가지 우려가 제기되었습니다.
- **구현의 복잡성 증가:** 이는 사실이지만, 얻는 이점을 고려할 때 가치가 있다고 판단됩니다.
- **`Py_UNICODE` 표현의 즉각적인 사용 불가로 인한 애플리케이션 속도 저하:** 이 또한 사실이지만, 이 문제에 관심 있는 애플리케이션은 `data` 표현을 사용하도록 재작성할 수 있습니다.

## 성능 (Performance)
이 패치의 성능은 메모리 소비와 런타임 효율성 모두에서 고려되어야 합니다.
- **메모리 소비:** 많은 큰 문자열을 가진 애플리케이션은 메모리 사용량이 감소할 것으로 예상됩니다. 작은 문자열의 경우, 시스템의 포인터 크기 및 `Py_UNICODE`/`wchar_t` 타입의 크기에 따라 영향이 달라집니다.
- **런타임 효율성:** 사용되는 API에 따라 런타임 영향이 크게 달라집니다. 관련 코드 조각을 새 API로 포팅한 후, `iobench`, `stringbench`, `json` 벤치마크는 일반적으로 1%에서 30%의 속도 저하를 보였습니다. 특정 벤치마크에서는 속도 향상이 발생할 수도 있고, 훨씬 더 큰 속도 저하가 발생할 수도 있습니다.

Django 애플리케이션에 대한 실제 측정 결과, 메모리 사용량이 크게 감소한 것을 확인할 수 있었습니다. 예를 들어, 유니코드 객체에 대한 저장 공간은 wide 유니코드 빌드의 경우 6,378,540바이트에서 2,216,807바이트로, narrow 유니코드 빌드의 경우 3,694,694바이트에서 2,216,807바이트로 감소했습니다(모두 32비트 시스템 기준). 이 감소는 해당 애플리케이션에서 ASCII 문자열이 지배적이었기 때문입니다.

Python 2와 비교했을 때, 유니코드와 바이트 문자열을 모두 고려해야 합니다. 테스트 애플리케이션에서 유니코드와 바이트 문자열을 합친 길이는 2.x에서 2,046,000 단위(바이트/문자)였고, 3.x에서는 2,200,000 단위였습니다. 32비트 시스템에서 2.x 빌드가 32비트 `wchar_t`/`Py_UNICODE`를 사용했을 때, 2.x 테스트는 3,620,000 바이트를 사용했고, 3.x 빌드는 3,340,000 바이트를 사용했습니다. 이 PEP를 사용한 3.x에서의 감소는 wide 유니코드 빌드와 비교할 때만 발생합니다.

## 포팅 가이드라인 (Porting Guidelines)
이 PEP의 영향을 받는 C 코드는 유니코드 문자열의 "내부"를 들여다봐야 하는 코드의 일부에 불과합니다. 기존 API가 계속 올바르게 작동하므로 해당 코드를 새 API로 포팅할 필요는 없습니다. 특히, Python 2와 Python 3를 모두 지원해야 하는 모듈은 이 새 API와 이전 유니코드 API를 동시에 지원할 경우 너무 복잡해질 수 있습니다.

모듈을 새 API로 포팅하려면 다음 API 요소의 사용을 제거하려고 노력하십시오:
`Py_UNICODE` 타입, `PyUnicode_AS_UNICODE` 및 `PyUnicode_AsUnicode`, `PyUnicode_GET_SIZE` 및 `PyUnicode_GetSize`, 그리고 `PyUnicode_FromUnicode`.

기존 문자열을 반복하거나 특정 문자를 볼 때는 포인터 연산 대신 인덱싱 연산을 사용하십시오. 인덱싱은 `PyUnicode_READ(_CHAR)` 및 `PyUnicode_WRITE`에 잘 작동합니다. 컴파일러가 유효하지 않은 역참조(dereferencing) 연산을 감지하도록 `void*`를 문자 버퍼 타입으로 사용하십시오.

새 문자열을 생성할 때 Python에서는 휴리스틱(heuristical) 버퍼 크기로 시작하여 휴리스틱이 실패하면 크기를 늘리거나 줄이는 것이 일반적이었습니다. 이 PEP에서는 문자열의 길이뿐만 아니라 최대 문자에 대한 휴리스틱도 필요하므로 이는 덜 실용적입니다.

휴리스틱을 피하려면 입력에 대해 두 번의 통과(two passes)를 수행해야 합니다. 한 번은 출력 길이와 최대 문자를 결정하고, 그 다음 `PyUnicode_New`로 대상 문자열을 할당하고 입력을 두 번째로 반복하여 최종 출력을 생성합니다.
만약 휴리스틱 경로를 택한다면, 크기 변경을 위한 문자열 할당은 피하십시오. 대신, 문자를 수집하기 위해 별도의 버퍼를 할당한 다음 `PyUnicode_FromKindAndData`를 사용하여 유니코드 객체를 구성하십시오. `Py_UCS4`를 버퍼 요소로 사용하여 최악의 문자 서수를 가정하는 옵션도 있습니다.

일반적인 작업의 경우 문자열 표현에 대한 직접 접근이 필요하지 않을 수 있습니다. `PyUnicode_Find`, `PyUnicode_FindChar`, `PyUnicode_Ord`, `PyUnicode_CopyCharacters`는 데이터 포인터 대신 인덱스를 사용하여 문자열 객체를 분석하고 생성하는 데 도움이 됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.