---
title: "[Final] PEP 461 - Adding % formatting to bytes and bytearray"
excerpt: "Python Enhancement Proposal 461: 'Adding % formatting to bytes and bytearray'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/461/
toc: true
toc_sticky: true
date: 2025-09-26 22:09:29+0900
last_modified_at: 2025-09-26 22:09:29+0900
published: true
---
> **원문 링크:** [PEP 461 - Adding % formatting to bytes and bytearray](https://peps.python.org/pep-0461/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 13-Jan-2014



# PEP 461: `bytes` 및 `bytearray`에 `%` 포매팅 추가

*   **작성자:** Ethan Furman
*   **상태:** Final (최종)
*   **유형:** Standards Track
*   **생성일:** 2014년 1월 13일
*   **Python 버전:** 3.5
*   **해결:** Python-Dev 메시지

## 요약 (Abstract)

이 PEP는 Python 2의 `str` 타입과 유사한 `%` 포매팅 연산을 `bytes` 및 `bytearray` 객체에 추가할 것을 제안합니다.

## 배경 및 동기 (Rationale and Motivation)

인터폴레이션(interpolation)은 일반적으로 문자열(string) 연산으로 여겨지지만, `bytes` 또는 `bytearray` 객체에 대한 인터폴레이션이 필요한 경우가 있습니다. 이러한 기능이 없을 때 발생하는 추가적인 작업은 코드의 전반적인 가독성을 저해합니다.

Python 3에서 `str`과 `bytes` 타입이 분리되면서, 프로그래밍의 작지만 중요한 영역 중 하나인 "와이어 포맷 프로토콜(wire format protocols)" 작업이 약간 더 어려워지고 훨씬 더 고통스러워졌습니다. 이 영역은 바이너리 데이터와 ASCII 호환 텍스트 세그먼트(ASCII 인코딩된 텍스트)가 혼합된 것이 특징입니다. `bytes` 및 `bytearray`에 제한적인 `%` 인터폴레이션을 다시 도입함으로써 새로운 와이어 포맷 코드를 작성하고 Python 2의 와이어 포맷 코드를 포팅하는 데 도움이 될 것입니다.

일반적인 사용 사례로는 `dbf` 및 `pdf` 파일 포맷, 이메일 포맷, FTP 및 HTTP 통신 등이 있습니다.

## `bytes` 및 `bytearray` 포매팅을 위한 제안된 Semantics

### `%`-인터폴레이션

모든 숫자 포매팅 코드 (`d`, `i`, `o`, `u`, `x`, `X`, `e`, `E`, `f`, `F`, `g`, `G` 및 Python 3에 추가될 수 있는 모든 코드)가 지원되며, `str` 타입과 동일하게 작동합니다. 여기에는 패딩(padding), 정렬(justification) 및 기타 관련 수정자(현재 `#`, `0`, `-`, `space`, `+` 및 Python 3에 추가될 수 있는 모든 것)가 포함됩니다. 허용되는 비숫자 코드는 `c`, `b`, `a`뿐이며, `s`는 `b`의 동의어(synonym)입니다.

숫자 코드의 경우, `str`과 `bytes` (또는 `bytearray`) 인터폴레이션의 유일한 차이점은 이러한 코드의 결과가 유니코드(unicode)가 아닌 ASCII 인코딩된 텍스트라는 것입니다. 즉, 모든 숫자 포매팅 코드 `%x`에 대해 `b"%x" % val`은 `("%x" % val).encode("ascii")`와 동일합니다.

**예시:**
```python
>>> b'%4x' % 10
b' a'
>>> b'%#4x' % 10
b' 0xa'
>>> b'%04X' % 10
b'000A'
```

*   `%c`는 단일 바이트를 삽입합니다. 이는 `range(256)` 범위의 정수이거나 길이가 1인 `bytes` 인자여야 하며, `str`은 허용되지 않습니다.

    **예시:**
    ```python
    >>> b'%c' % 48
    b'0'
    >>> b'%c' % b'a'
    b'a'
    ```

*   `%b`는 일련의 바이트를 삽입합니다. 이 바이트는 두 가지 방법 중 하나로 수집됩니다:
    *   입력 타입이 `Py_buffer`를 지원하는 경우, 이를 사용하여 필요한 바이트를 수집합니다.
    *   입력 타입이 다른 경우, 해당 객체의 `__bytes__` 메서드를 사용합니다. 이 메서드가 없으면 `TypeError`가 발생합니다.

    특히, `%b`는 숫자나 `str`을 허용하지 않습니다. `str`은 문자열을 바이트로 변환하는 데 인코딩이 필요하며, 시스템이 이를 추측하는 것을 거부하므로 거부됩니다. 숫자가 거부되는 이유는 다음과 같습니다:
    *   어떤 숫자가 허용되는지 모호합니다(float? Decimal? Fraction? 사용자 정의 타입?).
    *   숫자를 허용하면 숫자와 숫자의 텍스트 표현(예: `3.14`와 `'3.14'`) 사이에 모호성이 발생할 수 있습니다.
    *   와이어 포맷의 특성을 고려할 때, 명시적인 것이 암시적인 것보다 훨씬 낫습니다.

    `%s`는 Python 2/3 코드베이스를 더 쉽게 유지 관리하기 위한 유일한 목적으로 `%b`의 동의어로 포함됩니다. Python 3 전용 코드는 `%b`를 사용해야 합니다.

    **예시:**
    ```python
    >>> b'%b' % b'abc'
    b'abc'
    >>> b'%b' % 'some string'.encode('utf8')
    b'some string'
    >>> b'%b' % 3.14
    Traceback (most recent call last):
    ...
    TypeError: b'%b' does not accept 'float'
    >>> b'%b' % 'hello world!'
    Traceback (most recent call last):
    ...
    TypeError: b'%b' does not accept 'str'
    ```

*   `%a`는 인터폴레이션된 값에 대해 `repr(some_obj).encode('ascii', 'backslashreplace')`와 동일한 결과를 제공합니다. 사용 사례에는 새로운 프로토콜 개발 및 스트림에 랜드마크(landmarks) 작성, 기존 프로토콜로 들어가는 데이터를 디버깅하여 문제가 프로토콜 자체인지 또는 잘못된 데이터인지 확인하는 것, 직렬화 포맷의 대체(fall-back), 또는 `__bytes__` 정의가 적절하지 않지만 읽을 수 있고 유익한 표현이 필요한 모든 상황이 포함됩니다.

    `%r`은 Python 2/3 코드베이스를 더 쉽게 유지 관리하기 위한 유일한 목적으로 `%a`의 동의어로 포함됩니다. Python 3 전용 코드는 `%a`를 사용해야 합니다.

    **예시:**
    ```python
    >>> b'%a' % 3.14
    b'3.14'
    >>> b'%a' % b'abc'
    b"b'abc'"
    >>> b'%a' % 'def'
    b"'def'"
    ```

### Python 2와의 호환성 (Compatibility with Python 2)

위에서 언급했듯이, `%s` 및 `%r`은 Python 2에서 마이그레이션을 용이하게 하거나, Python 2와 단일 코드베이스를 유지하기 위한 목적으로만 포함됩니다. 이는 현재 Python 2 `str` 타입을 바이트 컨테이너로 사용하고 따라서 `%s`를 바이트 인터폴레이터로 사용하는 모듈이 많기 때문에 중요합니다.

그러나 새로운 Python 3 전용 코드에서는 `%b` 및 `%a`를 사용해야 하므로, `%s` 및 `%r`은 즉시 Deprecated(사용 중단 예정)되지만, 3.x 시리즈에서 제거되지는 않을 것입니다.

### 제안된 변경사항 (Proposed variations)

*   `%b`에 `str` 인자가 주어졌을 때 자동으로 `.encode('ascii','strict')`를 사용하도록 제안되었지만, 이는 간헐적인 오류를 유발할 수 있으므로 거부되었습니다. 문제가 되는 지점을 올바르게 수정할 수 있도록 연산이 항상 실패하는 것이 낫습니다.
*   값이 `str`일 때 `%b`가 ASCII 인코딩된 `repr`을 반환하도록 제안되었지만(예: `b'%b' % 'abc'` –> `b“'abc'”`), 이는 문제 지점과 멀리 떨어진 디버깅하기 어려운 오류를 유발할 수 있으므로 거부되었습니다. 문제가 되는 지점을 쉽게 수정할 수 있도록 연산이 항상 실패하는 것이 낫습니다.
*   원래 이 PEP는 포맷 스타일 포매팅(`format` 메서드)도 추가할 것을 제안했지만, `format` 및 관련 메커니즘은 모두 엄격하게 텍스트(`str`) 기반이라고 결정되어 제외되었습니다.
*   `__ascii__`, `__format_bytes__` 등 다양한 새로운 특별 메서드(special methods)가 제안되었지만, 현재로서는 필요하지 않으며, 실제 사용에서 이 솔루션의 단점이 드러나면 나중에 다시 논의될 수 있습니다.
*   경쟁 PEP인 PEP 460 (`Add binary interpolation and formatting`)도 존재합니다.

## 반대 의견 (Objections)

이 PEP에 대한 주요 반대 의견은 두 가지 주제의 변형이었습니다:
1.  `bytes` 및 `bytearray` 타입은 인코딩에 대한 가정이 없는 순수한 바이너리 데이터를 위한 것이다.
2.  ASCII 인코딩을 가정하는 `%` 인터폴레이션을 제공하는 것은 "매력적인 성가심(attractive nuisance)"이 될 것이며, Python 2의 `str` / 유니코드 텍스트 모델의 문제점으로 다시 돌아가게 할 것이다.

논의 중에 드러났듯이, `bytes` 및 `bytearray`는 혼합된 바이너리 데이터와 ASCII 호환 세그먼트(예: `dbf` 및 `pdf`와 같은 파일 포맷, `ftp` 및 이메일과 같은 네트워크 프로토콜)에도 사용됩니다.

`bytes` 및 `bytearray`는 이미 `upper()`, `isalpha()`, `expandtabs()` 등 ASCII 호환 인코딩을 가정하는 여러 메서드를 가지고 있습니다. 매우 제한적인 미니 언어를 가진 `%` 인터폴레이션은 이미 존재하는 메서드보다 더 성가시지 않을 것입니다.

일부는 십진수(decimal)만으로도 충분하다는 주장으로 모든 범위의 숫자 포매팅 코드를 허용하는 것에 반대했지만, 적어도 두 가지 포맷(`dbf` 및 `pdf`)은 비십진수(non-decimal numbers)를 사용합니다.

## 저작권 (Copyright)

이 문서는 공개 도메인(public domain)에 있습니다.

---다음은 Python Enhancement Proposal (PEP) 461 문서의 내용에 대한 번역 및 정리입니다.

---

# PEP 461 – `bytes` 및 `bytearray`에 `%` 포매팅 추가

*   **작성자:** Ethan Furman
*   **상태:** Final (최종)
*   **유형:** Standards Track
*   **생성일:** 2014년 1월 13일
*   **Python 버전:** 3.5
*   **해결:** Python-Dev 메시지

## 요약 (Abstract)

이 PEP는 Python 2의 `str` 타입과 유사한 `%` 포매팅 연산을 `bytes` 및 `bytearray` 객체에 추가할 것을 제안합니다.

## 배경 (Rationale) 및 동기 (Motivation)

인터폴레이션(interpolation)은 일반적으로 문자열(string) 연산으로 간주되지만, `bytes` 또는 `bytearray` 객체에 대한 인터폴레이션이 필요한 경우가 있습니다. 이러한 기능이 없을 때 필요한 추가적인 작업은 코드의 전반적인 가독성을 떨어뜨립니다.

Python 3에서 `str`과 `bytes` 타입이 분리되면서, "와이어 포맷 프로토콜(wire format protocols)"과 같은 특정 프로그래밍 영역의 작업이 다소 어려워졌습니다. 이 영역은 바이너리 데이터와 ASCII 호환 텍스트 세그먼트(즉, ASCII 인코딩된 텍스트)가 혼합되어 사용되는 것이 특징입니다. `bytes` 및 `bytearray`에 제한적인 `%` 인터폴레이션을 다시 도입함으로써 새로운 와이어 포맷 코드를 작성하고 기존 Python 2 와이어 포맷 코드를 Python 3으로 포팅하는 데 도움이 될 것입니다.

일반적인 사용 사례로는 `dbf` 및 `pdf` 파일 포맷, 이메일 포맷, FTP 및 HTTP 통신 등이 있습니다.

## `bytes` 및 `bytearray` 포매팅을 위한 제안된 Semantics

### `%`-인터폴레이션

모든 숫자 포매팅 코드 (`d`, `i`, `o`, `u`, `x`, `X`, `e`, `E`, `f`, `F`, `g`, `G`, 그리고 향후 Python 3에 추가될 수 있는 모든 코드)가 지원됩니다. 이들은 `str` 타입과 동일하게 작동하며, 패딩(padding), 정렬(justification), 그리고 기타 관련 수정자(현재 `#`, `0`, `-`, `space`, `+`, 그리고 향후 Python 3에 추가될 수 있는 모든 것)를 포함합니다. 허용되는 비숫자 코드(non-numeric codes)는 `c`, `b`, `a`뿐이며, `%s`는 `%b`의 동의어(synonym)입니다.

숫자 코드의 경우, `str`과 `bytes` (또는 `bytearray`) 인터폴레이션의 유일한 차이점은 이러한 코드의 결과가 유니코드(unicode)가 아닌 ASCII 인코딩된 텍스트라는 것입니다. 다시 말해, 모든 숫자 포매팅 코드 `%x`에 대해 `b"%x" % val`은 `("%x" % val).encode("ascii")`와 동일합니다.

**예시:**
```python
>>> b'%4x' % 10
b' a'
>>> b'%#4x' % 10
b' 0xa'
>>> b'%04X' % 10
b'000A'
```

*   `%c`는 단일 바이트를 삽입합니다. 이는 `range(256)` 범위의 정수이거나 길이가 1인 `bytes` 인자여야 하며, `str`은 허용되지 않습니다.

    **예시:**
    ```python
    >>> b'%c' % 48
    b'0'
    >>> b'%c' % b'a'
    b'a'
    ```

*   `%b`는 일련의 바이트를 삽입합니다. 이 바이트는 다음 두 가지 방법 중 하나로 수집됩니다:
    *   입력 타입이 `Py_buffer`를 지원하는 경우, 이를 사용하여 필요한 바이트를 수집합니다.
    *   입력 타입이 다른 경우, 해당 객체의 `__bytes__` 메서드를 사용합니다. 이 메서드가 없으면 `TypeError`가 발생합니다.

    특히, `%b`는 숫자나 `str`을 허용하지 않습니다. `str`은 문자열을 바이트로 변환하는 데 인코딩이 필요하지만 시스템이 이를 추측하는 것을 거부하기 때문에 거부됩니다. 숫자가 거부되는 이유는 다음과 같습니다:
    *   허용되는 숫자의 범위가 모호합니다(float, Decimal, Fraction, 사용자 정의 타입 등).
    *   숫자를 허용하면 숫자 값과 숫자의 텍스트 표현(예: `3.14`와 `'3.14'`) 사이에 모호성이 발생할 수 있습니다.
    *   와이어 포맷의 특성상 명시적인 것이 암시적인 것보다 훨씬 바람직합니다.

    `%s`는 Python 2/3 코드베이스의 유지 관리를 용이하게 하기 위한 유일한 목적으로 `%b`의 동의어로 포함됩니다. Python 3 전용 코드는 `%b`를 사용해야 합니다.

    **예시:**
    ```python
    >>> b'%b' % b'abc'
    b'abc'
    >>> b'%b' % 'some string'.encode('utf8')
    b'some string'
    >>> b'%b' % 3.14
    Traceback (most recent call last):
    ...
    TypeError: b'%b' does not accept 'float'
    >>> b'%b' % 'hello world!'
    Traceback (most recent call last):
    ...
    TypeError: b'%b' does not accept 'str'
    ```

*   `%a`는 인터폴레이션된 값에 대해 `repr(some_obj).encode('ascii', 'backslashreplace')`와 동일한 결과를 제공합니다. 이는 새로운 프로토콜 개발 시 스트림에 랜드마크를 작성하거나, 기존 프로토콜로 들어가는 데이터를 디버깅하여 문제의 원인이 프로토콜 자체인지 잘못된 데이터인지 확인하는 경우, 직렬화 포맷의 대체(fall-back) 용도, 또는 `__bytes__` 정의가 적절하지 않지만 읽을 수 있고 유익한 표현이 필요한 모든 상황에서 유용합니다.

    `%r`은 Python 2/3 코드베이스의 유지 관리를 용이하게 하기 위한 유일한 목적으로 `%a`의 동의어로 포함됩니다. Python 3 전용 코드는 `%a`를 사용해야 합니다.

    **예시:**
    ```python
    >>> b'%a' % 3.14
    b'3.14'
    >>> b'%a' % b'abc'
    b"b'abc'"
    >>> b'%a' % 'def'
    b"'def'"
    ```

### Python 2와의 호환성 (Compatibility with Python 2)

위에서 언급했듯이, `%s` 및 `%r`은 Python 2에서 마이그레이션을 용이하게 하거나, Python 2와 단일 코드베이스를 유지하기 위한 목적으로만 포함됩니다. 이는 현재 Python 2의 `str` 타입을 바이트 컨테이너로 사용하고 `%s`를 바이트 인터폴레이터로 사용하는 모듈들이 많기 때문에 중요합니다.

그러나 새로운 Python 3 전용 코드에서는 `%b` 및 `%a`를 사용해야 하므로, `%s` 및 `%r`은 즉시 Deprecated(사용 중단 예정)되지만, 3.x 시리즈에서 제거되지는 않을 것입니다.

### 제안되었으나 거부된 변경사항 (Proposed Variations)

*   `%b`에 `str` 인자가 주어졌을 때 자동으로 `.encode('ascii','strict')`를 사용하도록 제안되었으나, 간헐적인 오류를 유발할 수 있어 거부되었습니다. 문제가 되는 지점을 명확히 파악하고 수정하기 위해 연산이 항상 실패하는 것이 더 낫다고 판단했습니다.
*   값이 `str`일 때 `%b`가 ASCII 인코딩된 `repr`을 반환하도록 제안되었으나, 이는 문제 발생 지점과 멀리 떨어진 디버깅하기 어려운 오류를 유발할 수 있어 거부되었습니다.
*   원래 이 PEP는 포맷 스타일(`str.format` 메서드와 같은) 포매팅도 추가할 것을 제안했지만, `format` 및 관련 메커니즘은 모두 엄격하게 텍스트(`str`) 기반이라고 결정되어 제외되었습니다.
*   `__ascii__`, `__format_bytes__` 등 다양한 새로운 특별 메서드(special methods)가 제안되었으나, 현재로서는 필요하지 않으며, 실제 사용에서 이 솔루션의 단점이 드러나면 나중에 다시 논의될 수 있다고 언급되었습니다.
*   경쟁 PEP인 PEP 460 (`Add binary interpolation and formatting`)도 존재합니다.

## 반대 의견 (Objections)

이 PEP에 대한 주요 반대 의견은 크게 두 가지 주제였습니다:
1.  `bytes` 및 `bytearray` 타입은 인코딩에 대한 가정이 없는 순수한 바이너리 데이터를 위한 것이다.
2.  ASCII 인코딩을 가정하는 `%` 인터폴레이션을 제공하는 것은 "매력적인 성가심(attractive nuisance)"이 되어, Python 2의 `str` / 유니코드 텍스트 모델의 문제점으로 다시 돌아가게 할 것이다.

그러나 논의 과정에서, `bytes` 및 `bytearray`는 `dbf` 및 `pdf`와 같은 파일 포맷, `ftp` 및 이메일과 같은 네트워크 프로토콜 등 혼합된 바이너리 데이터와 ASCII 호환 세그먼트에도 사용된다는 점이 강조되었습니다.

`bytes` 및 `bytearray`는 이미 `upper()`, `isalpha()`, `expandtabs()` 등 ASCII 호환 인코딩을 가정하는 여러 메서드를 가지고 있습니다. 매우 제한적인 미니 언어를 가진 `%` 인터폴레이션은 기존 메서드보다 더 큰 문제가 되지 않을 것입니다.

일부에서는 십진수(decimal)만으로도 충분하다는 주장으로 모든 범위의 숫자 포매팅 코드를 허용하는 것에 반대했지만, 적어도 두 가지 포맷(`dbf` 및 `pdf`)은 비십진수(non-decimal numbers)를 사용합니다.

## 저작권 (Copyright)

이 문서는 공개 도메인(public domain)에 있습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.