---
title: "[Final] PEP 358 - The “bytes” Object"
excerpt: "Python Enhancement Proposal 358: 'The “bytes” Object'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/358/
toc: true
toc_sticky: true
date: 2025-09-26 19:04:13+0900
last_modified_at: 2025-09-26 19:04:13+0900
published: true
---
> **원문 링크:** [PEP 358 - The “bytes” Object](https://peps.python.org/pep-0358/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 15-Feb-2006


# PEP 358 – "bytes" 객체

*   **작성자:** Neil Schemenauer, Guido van Rossum
*   **상태:** Final (최종)
*   **유형:** Standards Track
*   **작성일:** 2006년 2월 15일
*   **Python 버전:** 2.6, 3.0
*   **최종 수정:** 2025년 2월 1일

## 개요 (Abstract)

이 PEP는 원시 바이트(raw bytes) 시퀀스 타입의 도입을 개괄합니다. `bytes` 타입의 추가는 Python 3.0에서 도입될 유니코드 기반의 `str` 객체로의 전환 과정 중 한 단계입니다.

이 PEP는 `bytes` 타입이 Python 2.6과 Python 3.0에서 어떻게 작동해야 하는지 설명합니다. (Python 2.6에서는 `str`과 `unicode`라는 두 가지 문자열 타입이 있는 반면, Python 3.0에서는 이름은 `str`이지만 2.6의 `unicode` 타입과 유사한 의미론을 갖는 하나의 문자열 타입만 존재하기 때문에 종종 차이가 발생합니다.)

## 동기 (Motivation)

Python의 현재 문자열 객체들은 과부하 상태입니다. 이들은 문자 시퀀스와 바이트 시퀀스라는 두 가지 역할을 모두 수행합니다. 이러한 목적의 과부하는 혼란과 버그를 초래합니다. Python의 미래 버전에서는 문자열 객체가 문자(character) 데이터를 저장하는 데 사용될 것입니다. `bytes` 객체는 바이트 컨테이너의 역할(role of a byte container)을 수행하게 될 것입니다. 궁극적으로 `unicode` 타입은 `str`로 이름이 변경되고, 기존의 `str` 타입은 제거될 것입니다.

## 사양 (Specification)

`bytes` 객체는 0부터 255까지의 범위에 있는 정수들의 가변(mutable) 시퀀스를 저장합니다. 문자열 객체와 달리, `bytes` 객체를 인덱싱하면 정수가 반환됩니다. 정수가 아닌 객체를 요소에 할당하거나 비교하면 `TypeError` 예외가 발생합니다. 요소에 0에서 255 범위를 벗어나는 값을 할당하면 `ValueError` 예외가 발생합니다. `bytes`의 `.__len__()` 메서드는 시퀀스에 저장된 정수(즉, 바이트 수)의 개수를 반환합니다.

`bytes` 객체의 생성자는 다음 시그니처(signature)를 가집니다:

```python
bytes([initializer[, encoding]])
```

인수가 제공되지 않으면 0개의 요소를 포함하는 `bytes` 객체가 생성되어 반환됩니다. `initializer` 인수는 문자열(2.6에서는 `str` 또는 `unicode`), 정수들의 이터러블(iterable), 또는 단일 정수일 수 있습니다. 생성자를 위한 의사 코드(pseudo-code)는 다음과 같습니다 (속도보다는 명확한 의미론을 위해 최적화됨):

```python
def bytes(initializer=0, encoding=None):
    if isinstance(initializer, int):
        # In 2.6, int -> (int, long)
        initializer = [0]*initializer
    elif isinstance(initializer, basestring):
        if isinstance(initializer, unicode): # In 3.0, "if True"
            if encoding is None: # In 3.0, raise TypeError("explicit encoding required")
                encoding = sys.getdefaultencoding()
            initializer = initializer.encode(encoding)
    else:
        if encoding is not None:
            raise TypeError("no encoding allowed for this initializer")
        tmp = []
        for c in initializer:
            if not isinstance(c, int):
                raise TypeError("initializer must be iterable of ints")
            if not 0 <= c < 256:
                raise ValueError("initializer element out of range")
            tmp.append(c)
        initializer = tmp
    new = <new bytes object of length len(initializer)>
    for i, c in enumerate(initializer):
        new[i] = c
    return new
```

`.__repr__()` 메서드는 `bytes` 리터럴을 포함하는 새 `bytes` 객체를 생성하도록 평가될 수 있는 문자열을 반환합니다:

```python
>>> bytes([10, 20, 30])
b'\n\x14\x1e'
```

`bytes` 객체는 `str` 객체의 `decode()` 메서드와 동일한 `decode()` 메서드를 가집니다. 또한, `[0-9a-fA-F ]` 집합의 문자열을 받아 `bytes` 객체를 반환하는 클래스 메서드 `fromhex()`를 가집니다 (`binascii.unhexlify`와 유사). 예를 들어:

```python
>>> bytes.fromhex('5c5350ff')
b'\\SP\xff'
>>> bytes.fromhex('5c 53 50 ff')
b'\\SP\xff'
```

`bytes` 객체는 역변환을 수행하는 `hex()` 메서드를 가집니다 (`binascii.hexlify`와 유사):

```python
>>> bytes([92, 83, 80, 255]).hex()
'5c5350ff'
```

`bytes` 객체는 `list` 메서드와 유사한 일부 메서드, 그리고 `str` 메서드와 유사한 다른 메서드들을 가집니다. 다음은 대략적인 시그니처와 함께 메서드의 전체 목록입니다:

*   `.__add__(bytes) -> bytes`
*   `.__contains__(int | bytes) -> bool`
*   `.__delitem__(int | slice) -> None`
*   `.__delslice__(int, int) -> None`
*   `.__eq__(bytes) -> bool`
*   `.__ge__(bytes) -> bool`
*   `.__getitem__(int | slice) -> int | bytes`
*   `.__getslice__(int, int) -> bytes`
*   `.__gt__(bytes) -> bool`
*   `.__iadd__(bytes) -> bytes`
*   `.__imul__(int) -> bytes`
*   `.__iter__() -> iterator`
*   `.__le__(bytes) -> bool`
*   `.__len__() -> int`
*   `.__lt__(bytes) -> bool`
*   `.__mul__(int) -> bytes`
*   `.__ne__(bytes) -> bool`
*   `.__reduce__(...) -> ...`
*   `.__reduce_ex__(...) -> ...`
*   `.__repr__() -> str`
*   `.__reversed__() -> bytes`
*   `.__rmul__(int) -> bytes`
*   `.__setitem__(int | slice, int | iterable[int]) -> None`
*   `.__setslice__(int, int, iterable[int]) -> Bote`
*   `append(int) -> None`
*   `count(int) -> int`
*   `decode(str) -> str | unicode` (# 3.0에서는 `str`만 해당)
*   `endswith(bytes) -> bool`
*   `extend(iterable[int]) -> None`
*   `find(bytes) -> int`
*   `index(bytes | int) -> int`
*   `insert(int, int) -> None`
*   `join(iterable[bytes]) -> bytes`
*   `partition(bytes) -> (bytes, bytes, bytes)`
*   `pop([int]) -> int`
*   `remove(int) -> None`
*   `replace(bytes, bytes) -> bytes`
*   `rindex(bytes | int) -> int`
*   `rpartition(bytes) -> (bytes, bytes, bytes)`
*   `split(bytes) -> list[bytes]`
*   `startswith(bytes) -> bool`
*   `reverse() -> None`
*   `rfind(bytes) -> int`
*   `rindex(bytes | int) -> int`
*   `rsplit(bytes) -> list[bytes]`
*   `translate(bytes, [bytes]) -> bytes`

`.isupper()`, `.upper()` 및 이와 유사한 메서드들의 부재에 주목하십시오. (아래 "Open Issues" 참조) 객체가 변경 가능(mutable)하므로 `.__hash__()`는 없습니다. `.sort()` 메서드에 대한 사용 사례는 없습니다.

`bytes` 타입은 버퍼 인터페이스(buffer interface)도 지원하여 이진(binary) 데이터(문자 데이터 제외)의 읽기 및 쓰기를 지원합니다.

## 범위 외 문제 (Out of Scope Issues)

Python 3k는 훨씬 다른 I/O 서브시스템을 가질 것입니다. 해당 I/O 서브시스템이 `bytes` 객체와 어떻게 작동하고 상호작용할지 결정하는 것은 이 PEP의 범위를 벗어납니다. 그러나 이진 I/O는 `bytes`를 읽고 쓰는 반면, 텍스트 I/O는 문자열을 읽을 것으로 예상됩니다. `bytes` 타입은 버퍼 인터페이스를 지원하므로 Python 2.6의 기존 이진 I/O 작업은 `bytes` 객체를 지원할 것입니다.

객체를 바이트 배열로 변환할 수 있도록 `.__bytes__()`라는 특별한 메서드를 언어에 추가해야 한다는 제안이 있었습니다. 이 결정은 범위 외(out of scope)입니다. `b"..."` 형태의 `bytes` 리터럴 또한 제안되었습니다. 이것은 [PEP 3112](https://peps.python.org/pep-3112/)의 주제입니다.

## 공개 문제 (Open Issues)

*   `decode()` 메서드는 `bytes` 객체 `b`를 `unicode(b, <encoding>)` (2.6에서) 또는 `str(b, <encoding>)` (3.0에서)를 호출하여 디코딩할 수 있으므로 중복됩니다. `encode`/`decode` 메서드가 과연 필요한가요? 어떤 의미에서는 생성자를 사용하는 표기가 더 깔끔합니다.
*   메서드들을 여전히 더 신중하게 지정해야 합니다.
*   피클링(pickling) 및 마샬링(marshalling) 지원을 지정해야 합니다.
*   이러한 모든 `list` 메서드들을 실제로 구현해야 할까요? 필수가변인수를 가진 `.ljust()`, `.rjust()`, `.center()`를 지원하는 것이 정당화될 수 있습니다. 필수가변인수를 가진 `.split()`을 지원하는 것이 정당화될 수 있습니다. ASCII 정의를 사용하여 문자와 숫자 및 공백에 대한 `.islower()`, `.isupper()`, `.isspace()`, `.isalpha()`, `.isalnum()`, `.isdigit()` 및 해당 변환 (`.lower()` 등)을 지원하는 것이 정당화될 수도 있습니다. 이것이 받아들여진다면, `.ljust()`, `.rjust()`, `.center()`, `.split()`에 대한 근거가 훨씬 강력해지며, 이들은 ASCII 공백 또는 모든 ASCII 공백을 사용하는 기본 인수를 가져야 합니다 (`.split()`의 경우).

## 자주 묻는 질문 (Frequently Asked Questions)

**Q: Unicode 객체의 `encode` 메서드가 동일한 작업을 수행하는데 왜 선택적 `encoding` 인수가 필요한가요?**

A: Python의 현재 버전에서 `encode` 메서드는 `str` 객체를 반환하며, 코드를 깨뜨리지 않고는 이를 변경할 수 없습니다. `bytes(s.encode(...))` 구문은 바이트 시퀀스를 여러 번 복사해야 하므로 비용이 많이 듭니다. 또한 Python은 일반적으로 타입 A의 객체를 타입 B의 객체로 변환하는 두 가지 방법을 제공합니다: A 인스턴스에 자신을 B로 변환하도록 요청하거나, 타입 B에 A로부터 새 인스턴스를 생성하도록 요청합니다. A와 B가 무엇이냐에 따라 두 API 모두 의미가 있습니다; 때로는 결합도(decoupling) 문제로 인해 A가 B에 대해 알 수 없는 경우, 후자의 접근 방식을 사용해야 합니다; 때로는 B가 A에 대해 알 수 없는 경우, 전자의 접근 방식을 사용해야 합니다.

**Q: `initializer`가 `str`인 경우 `bytes`가 `encoding` 인수를 무시하는 이유는 무엇인가요? (이것은 2.6에만 적용됩니다.)**

A: 해당 경우에 `encoding`이 가질 수 있는 합리적인 의미가 없습니다. `str` 객체는 바이트 배열이며, 포함된 문자 데이터의 인코딩에 대해 아무것도 알지 못합니다. 프로그래머가 이미 원하는 인코딩을 사용하는 `str` 객체를 제공했다고 가정해야 합니다. 바이트의 순수한 복사본 이외의 다른 것이 필요한 경우, 먼저 문자열을 디코딩해야 합니다. 예를 들어:

```python
bytes(s.decode(encoding1), encoding2)
```

**Q: `encoding` 인수의 기본값을 ASCII 대신 Latin-1 (또는 전체 바이트 범위를 포괄하는 다른 인코딩)으로 설정하지 않는 이유는 무엇인가요?**

A: Python의 시스템 기본 인코딩은 ASCII입니다. 이 기본값을 사용하는 것이 가장 혼란을 줄이는 방법인 것 같습니다. 또한 Py3k에서는 Latin-1을 기본값으로 사용하는 것이 사용자들이 예상하는 바가 아닐 수 있습니다. 예를 들어, 그들은 유니코드 인코딩을 선호할 수 있습니다. 어떤 기본값도 항상 예상대로 작동하지는 않을 것입니다. 적어도 ASCII는 비-ASCII 데이터를 인코딩하려고 시도하면 큰 소리로 불평할 것입니다.

---

## 저작권 (Copyright)

이 문서는 공용 도메인(public domain)에 공개되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.