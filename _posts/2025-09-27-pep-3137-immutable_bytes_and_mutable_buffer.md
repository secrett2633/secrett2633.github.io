---
title: "[Final] PEP 3137 - Immutable Bytes and Mutable Buffer"
excerpt: "Python Enhancement Proposal 3137: 'Immutable Bytes and Mutable Buffer'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3137/
toc: true
toc_sticky: true
date: 2025-09-27 14:34:47+0900
last_modified_at: 2025-09-27 14:34:47+0900
published: true
---
> **원문 링크:** [PEP 3137 - Immutable Bytes and Mutable Buffer](https://peps.python.org/pep-3137/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 26-Sep-2007

Python Enhancement Proposal (PEP) 3137은 Python 3.0에서 `bytes` 타입의 불변성(immutable)과 가변성(mutable)을 명확하게 분리하는 제안입니다. 이 PEP는 초기 Python 3.0a1 버전에서 `bytes` 타입이 가변(mutable)으로 도입된 이후, 불변 `bytes` 타입의 필요성이 제기되면서 시작되었습니다.

## 목표
Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것입니다.

## 도입 배경 (Introduction)
Python 3.0a1에서 가변(mutable) `bytes` 타입이 출시된 후, 불변(immutable) `bytes`를 표현할 방법이 필요하다는 압력이 커졌습니다. 초기에는 PEP 3118의 새로운 버퍼 API를 사용하여 `bytes` 객체를 일시적으로 불변하게 만드는 패치가 제안되었지만, 이는 적절한 접근 방식이 아니라고 판단되었습니다.

이후, `bytes` 타입을 불변으로 만들고 테스트 스위트의 오류를 수정하는 패치가 준비되었습니다. 이 작업은 `bytes`의 가변성에 의존하는 부분이 많지 않다는 것을 보여주었으며, 주로 작은 조각들을 모아 반환 값을 구성하는 코드에서만 가변성이 필요하다는 점이 드러났습니다.

이러한 논의와 `array` 모듈을 가변 `bytes` 타입의 대안으로 사용하는 것이 이상적이지 않다는 점을 고려하여, 가변 `bytes`와 불변 `bytes` 타입을 모두 가지는 제안이 나왔고, 이는 긍정적인 반응을 얻어 이 PEP의 필요성을 야기했습니다. 구현 전략 또한 명확해졌는데, 기존 `PyString` 구현에서 로케일 지원 및 암시적 유니코드 변환을 제거하여 불변 `bytes` 타입으로 사용하고, 새로운 `PyBytes` 구현을 가변 `bytes` 타입으로 유지하는 방식입니다.

## 장점 (Advantages)
*   불변 `bytes` 타입의 한 가지 장점은 코드 객체에서 이를 사용할 수 있다는 점입니다.
*   `bytes`를 키로 사용하여 효율적인 해시 테이블(hash table)을 생성할 수 있게 하여, HTTP 또는 SMTP와 같이 텍스트를 나타내는 `bytes` 기반 프로토콜을 파싱할 때 유용할 수 있습니다.
*   Python 2.x에서 바이너리 데이터(또는 인코딩된 텍스트)를 조작하던 코드를 새로운 디자인으로 포팅하는 것이 초기 3.0 디자인(가변 `bytes`)을 사용하는 것보다 쉬워집니다. 단순히 `str`을 `bytes`로 바꾸고 `b'...'` 리터럴을 사용하는 것만으로 가능해집니다.

## 명명 (Naming)
Python 레벨에서 다음과 같은 타입 이름을 제안합니다:
*   `bytes`: 불변(immutable) `bytes` 배열 (`PyString`에 해당)
*   `bytearray`: 가변(mutable) `bytes` 배열 (`PyBytes`에 해당)
*   `memoryview`: 다른 객체에 대한 `bytes` 뷰 (`PyMemory`에 해당)

이전의 `buffer` 타입은 PEP 3118에서 도입된 새로운 `memoryview` 타입과 너무 유사하여 중복되므로 제거됩니다.

## 요약 (Summary)
다양한 Python 버전에서의 타입 이름은 다음과 같이 요약됩니다:

| C 이름       | 2.x repr    | 3.0a1 repr  | 3.0a2 repr            |
| :----------- | :---------- | :---------- | :-------------------- |
| `PyUnicode`  | `unicode u''` | `str ''`    | `str ''`              |
| `PyString`   | `str ''`    | `str8 s''`  | `bytes b''`           |
| `PyBytes`    | N/A         | `bytes b''` | `bytearray bytearray(b'')` |
| `PyBuffer`   | `buffer`    | `buffer`    | N/A                   |
| `PyMemoryView` | N/A         | `memoryview`| `memoryview <...>`    |

## 리터럴 표기법 (Literal Notations)
Python 3.0a1에 도입된 `b'...'` 표기법은 불변 `bytes` 객체를 반환합니다. 가변 `bytes` 배열을 생성하려면 `bytearray(b'...')` 또는 `bytearray([...])`를 사용합니다. 후자의 형태는 `range(256)` 범위의 정수 리스트를 인자로 받습니다.

## 기능 (Functionality)

### PEP 3118 버퍼 API (PEP 3118 Buffer API)
`bytes`와 `bytearray` 모두 PEP 3118 버퍼 API를 구현합니다.
*   `bytes` 타입은 읽기 전용(read-only) 요청만 구현합니다.
*   `bytearray` 타입은 쓰기 가능한(writable) 요청 및 데이터 잠금(data-locked) 요청도 허용합니다.
*   요소 데이터 타입은 항상 `'B'`(부호 없는 바이트)입니다.

### 생성자 (Constructors)
`bytes`와 `bytearray` 모두에 적용되는 네 가지 형태의 생성자가 있습니다.
*   `bytes(<bytes>)`, `bytes(<bytearray>)`, `bytearray(<bytes>)`, `bytearray(<bytearray>)`: 간단한 복사 생성자입니다. `bytes(<bytes>)`는 (불변) 인자를 반환할 수 있지만, `bytearray(<bytearray>)`는 항상 복사본을 만듭니다.
*   `bytes(<str>, <encoding>[, <errors>])`, `bytearray(<str>, <encoding>[, <errors>])`: 텍스트 문자열을 인코딩합니다. `str.encode()` 메서드는 불변 `bytes` 객체를 반환합니다. `<encoding>` 인자는 필수이며, `<errors>`는 선택 사항입니다.
*   `bytes(<memory view>)`, `bytearray(<memory view>)`: PEP 3118 버퍼 API를 구현하는 모든 객체로부터 `bytes` 또는 `bytearray` 객체를 생성합니다.
*   `bytes(<iterable of ints>)`, `bytearray(<iterable of ints>)`: `range(256)` 범위의 정수 스트림으로부터 `bytes` 또는 `bytearray` 객체를 생성합니다.
*   `bytes(<int>)`, `bytearray(<int>)`: 주어진 길이의 0으로 초기화된 `bytes` 또는 `bytearray` 객체를 생성합니다.

### 비교 (Comparisons)
`bytes`와 `bytearray` 타입은 서로 비교 및 정렬이 가능합니다. 예를 들어, `b'abc' == bytearray(b'abc') < b'abd'`는 참입니다.
두 타입 중 하나를 `str` 객체와 동등성 비교하면 내용에 관계없이 `False`를 반환합니다. `str`과의 정렬 비교는 `TypeError`를 발생시킵니다.

### 슬라이싱 (Slicing)
*   `bytes` 객체를 슬라이싱하면 `bytes` 객체가 반환됩니다.
*   `bytearray` 객체를 슬라이싱하면 `bytearray` 객체가 반환됩니다.
*   `bytearray` 객체에 대한 슬라이스 할당(slice assignment)은 PEP 3118 버퍼 API를 구현하는 모든 객체 또는 `range(256)` 범위의 정수 iterable을 허용합니다.

### 인덱싱 (Indexing)
*   `bytes`와 `bytearray`를 인덱싱하면 작은 정수(small ints)를 반환합니다.
*   `bytearray` 객체의 항목에 대한 할당은 `range(256)` 범위의 정수를 허용합니다. (바이트 시퀀스에서 할당하려면 슬라이스 할당을 사용합니다.)

### `Str()` 및 `Repr()`
`str()` 및 `repr()` 함수는 이들 객체에 대해 동일한 것을 반환합니다.
*   `bytes` 객체의 `repr()`은 `b'...'` 스타일의 리터럴을 반환합니다.
*   `bytearray`의 `repr()`은 `"bytearray(b'...')" `형태의 문자열을 반환합니다.

### 연산자 (Operators)
다음 연산자들은 언급된 경우를 제외하고 `bytes` 및 `bytearray` 타입에 의해 구현됩니다:
*   `b1 + b2`: 연결(concatenation). `bytes`/`bytearray` 혼합 피연산자의 경우, 반환 타입은 첫 번째 인자의 타입입니다.
*   `b1 += b2`: `b1`이 `bytearray` 객체인 경우 `b1`을 변경합니다.
*   `b * n`, `n * b`: 반복(repetition); `n`은 정수여야 합니다.
*   `b *= n`: `b`가 `bytearray` 객체인 경우 `b`를 변경합니다.
*   `b1 in b2`, `b1 not in b2`: 부분 문자열(substring) 테스트; `b1`은 PEP 3118 버퍼 API를 구현하는 모든 객체가 될 수 있습니다.
*   `i in b`, `i not in b`: 단일 바이트 멤버십(membership) 테스트; `i`는 정수여야 합니다.
*   `len(b)`: 바이트 수.
*   `hash(b)`: 해시 값; `bytes` 타입에서만 구현됩니다.
`%` 연산자는 구현되지 않습니다.

### 메서드 (Methods)
다음 메서드들은 `bytes`와 `bytearray` 모두에 유사한 의미론으로 구현됩니다. 이들은 `bytes` 인자에 대해 PEP 3118 버퍼 API를 구현하는 모든 것을 허용하며, 메서드가 호출된 객체(`self`)와 동일한 타입을 반환합니다:
`.capitalize()`, `.center()`, `.count()`, `.decode()`, `.endswith()`, `.expandtabs()`, `.find()`, `.index()`, `.isalnum()`, `.isalpha()`, `.isdigit()`, `.islower()`, `.isspace()`, `.istitle()`, `.isupper()`, `.join()`, `.ljust()`, `.lower()`, `.lstrip()`, `.partition()`, `.replace()`, `.rfind()`, `.rindex()`, `.rjust()`, `.rpartition()`, `.rsplit()`, `.rstrip()`, `.split()`, `.splitlines()`, `.startswith()`, `.strip()`, `.swapcase()`, `.title()`, `.translate()`, `.upper()`, `.zfill()`

이는 Python 2.x의 `str` 타입에 있던 메서드들과 정확히 동일한 집합이며, `.encode()`는 제외됩니다. 서명과 의미론도 동일합니다. 그러나, 문자, 공백, 소문자 등과 같은 문자 클래스가 사용될 때는 ASCII 정의가 사용됩니다. `.encode()` 메서드는 Python 3000에서 인코딩 및 디코딩에 대한 더 엄격한 정의 때문에 제외됩니다.

또한, 두 타입 모두 16진수 값을 포함하는 문자열로부터 객체를 구성하는 클래스 메서드 `.fromhex()`를 구현합니다.
`bytearray` 타입은 MutableSequence ABC (PEP 3119 참조)에서 온 다음과 같은 추가 메서드를 구현합니다:
`.extend()`, `.insert()`, `.append()`, `.reverse()`, `.pop()`, `.remove()`

### `Bytes`와 `Str` 타입 (Bytes and the Str Type)
Python 3.0a1의 `bytes` 타입과 마찬가지로, `bytes`(또는 `bytearray`) 객체와 `str` 객체를 인코딩을 지정하지 않고 혼합하려는 시도는 `TypeError` 예외를 발생시킵니다. (그러나, `bytes`/`bytearray`와 `str` 객체의 동등성 비교는 단순히 `False`를 반환합니다.)

`bytes` 또는 `bytearray` 객체와 `str` 객체 간의 변환은 항상 인코딩을 사용하여 명시적이어야 합니다. 두 가지 동등한 API가 있습니다:
*   `str(b, <encoding>[, <errors>])`는 `b.decode(<encoding>[, <errors>])`와 동일합니다.
*   `bytes(s, <encoding>[, <errors>])`는 `s.encode(<encoding>[, <errors>])`와 동일합니다.

한 가지 예외가 있습니다: `str(b)`를 작성하여 인코딩을 지정하지 않고 `bytes` (또는 `bytearray`)를 `str`로 변환할 수 있습니다. 이는 `repr(b)`와 동일한 결과를 생성합니다. 이 예외는 모든 객체가 출력될 수 있다는 일반적인 약속 때문에 필요하며, 출력은 `str`로의 변환의 특별한 경우입니다. 그러나 `bytes` 객체를 출력할 때 개별 바이트를 문자로 해석한다는 보장은 없습니다.

`str` 타입은 현재 PEP 3118 버퍼 API를 구현하고 있습니다. 이는 가끔 편리할 수 있지만, 버퍼 API를 통해 접근되는 바이트가 플랫폼 의존적인 인코딩을 나타내므로 잠재적으로 혼란스러울 수 있습니다. 따라서 PEP 3118 버퍼 API는 `str` 타입에서 제거될 예정입니다.

### `basestring` 타입 (The basestring Type)
`basestring` 타입은 언어에서 제거될 것입니다. `isinstance(x, basestring)`를 사용하던 코드는 `isinstance(x, str)`를 사용하도록 변경되어야 합니다.

### 피클링 (Pickling)
이 내용은 독자의 연습 문제로 남겨져 있습니다.

---
이 PEP는 Python 3.0에서 `bytes`와 `bytearray`라는 두 가지 별개의 타입을 도입하여, 바이너리 데이터 처리를 더욱 명확하고 안전하게 만들었습니다. 불변 `bytes`는 해싱 가능한 바이너리 시퀀스에 사용하고, 가변 `bytearray`는 바이너리 데이터를 조작할 때 사용함으로써 개발자들이 의도에 맞는 타입을 선택할 수 있도록 돕습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.