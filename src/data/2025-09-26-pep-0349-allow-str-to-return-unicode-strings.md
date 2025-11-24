---
title: "[Rejected] PEP 349 - Allow str() to return unicode strings"
excerpt: "Python Enhancement Proposal 349: 'Allow str() to return unicode strings'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/349/
toc: true
toc_sticky: true
date: 2025-09-26 18:57:18+0900
last_modified_at: 2025-09-26 18:57:18+0900
published: true
---
> **원문 링크:** [PEP 349 - Allow str() to return unicode strings](https://peps.python.org/pep-0349/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 02-Aug-2005


# PEP 349 – `str()` 함수가 유니코드(Unicode) 문자열을 반환하도록 허용

*   **작성자:** Neil Schemenauer
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2005년 8월 2일
*   **Python 버전:** 2.5
*   **해결:** Python-Dev 메시지

## 개요 (Abstract)

이 PEP는 내장 함수 `str()`이 유니코드(Unicode) 문자열을 반환할 수 있도록 변경하는 것을 제안합니다. 이 변경으로 인해 두 가지 종류의 문자열(바이트 문자열 `str`과 유니코드 문자열 `unicode`) 모두와 작동하는 코드를 더 쉽게 작성할 수 있으며, 일부 기존 코드가 유니코드 문자열을 더 잘 처리하게 될 것입니다. C 함수 `PyObject_Str()`는 변경되지 않고, 대신 `PyString_New()` 함수가 추가될 예정이었습니다.

## 배경 (Rationale)

Python은 오랫동안 유니코드 문자열 타입을 지원해왔지만, 그 활용은 아직 널리 퍼지지 않았습니다. 여전히 많은 Python 코드가 문자열 데이터가 `str` 인스턴스로 표현된다고 가정합니다. Python의 장기적인 계획은 `str` 타입을 점진적으로 없애고 모든 문자열 데이터에 `unicode`를 사용하는 것입니다. 이를 위해서는 원활한 전환 경로가 반드시 제공되어야 합니다.

기존의 `str` 인스턴스에 맞춰 작성된 라이브러리들을 "모든 유니코드 문자열 세상(all-unicode string world)"에서 작동할 수 있도록 업그레이드해야 합니다. 모든 필수 라이브러리가 유니코드 처리가 가능해질 때까지는 이 "모든 유니코드 세상"으로 완전히 전환할 수 없습니다. 모든 라이브러리를 한 번에 업그레이드하는 것은 실현 가능해 보이지 않습니다. 더 현실적인 전략은 각 라이브러리를 개별적으로 유니코드 문자열을 처리할 수 있도록 만들되, 현재의 `str` 중심 환경에서의 동작을 유지하는 것입니다.

첫째, `unicode` 인스턴스를 `str` 인스턴스로 강제 변환(coerce)하려 하지 않고도 받아들일 수 있는 코드를 작성할 수 있어야 합니다. 이러한 코드를 "유니코드-안전(Unicode-safe)"하다고 부릅니다. 유니코드-안전한 라이브러리는 모든 유니코드 세상에서 사용될 수 있습니다.

둘째, 오직 `str` 인스턴스만 제공될 때, 유니코드 결과를 생성하지 않는 코드를 작성할 수 있어야 합니다. 이러한 코드를 "`str`-안정(str-stable)"하다고 부릅니다. `str`-안정적인 라이브러리는 아직 유니코드-안전하지 않은 다른 라이브러리나 애플리케이션에서 사용될 수 있습니다.

때로는 `str`-안정적이면서 유니코드-안전한 코드를 작성하는 것이 간단합니다. 예를 들어, 다음 함수는 단순히 작동합니다.

```python
def appendx(s):
    return s + 'x'
```

이는 `unicode` 타입이 작업을 더 쉽게 하도록 설계되었기 때문에 놀라운 일이 아닙니다. 기본 원칙은 `str`과 `unicode` 인스턴스가 만나면 결과는 `unicode` 인스턴스가 된다는 것입니다. 하지만, 코드가 객체의 문자열 표현을 요구할 때 한 가지 주목할 만한 어려움이 발생합니다. 이는 전통적으로 내장 함수 `str()`을 사용하여 수행되는 작업입니다.

현재의 `str()` 함수를 사용하면 코드는 유니코드-안전하지 않게 됩니다. `str()` 호출을 `unicode()` 호출로 대체하면 코드는 `str`-안정적이지 않게 됩니다. `str()`이 유니코드 인스턴스를 반환할 수 있도록 변경하면 이 문제가 해결될 것입니다. 추가적인 이점으로, 현재 `str()`을 사용하기 때문에 유니코드-안전하지 않은 일부 코드가 유니코드-안전하게 될 것입니다.

## 명세 (Specification)

`str()` 내장 함수의 Python 구현은 다음과 같습니다.

```python
def str(s):
    """객체의 적절한 문자열 표현을 반환합니다.
    반환 값은 str 또는 unicode 인스턴스입니다.
    """
    if type(s) is str or type(s) is unicode:
        return s
    r = s.__str__()
    if not isinstance(r, (str, unicode)):
        raise TypeError('__str__ returned non-string')
    return r
```

다음 함수가 C API에 추가될 것이며, 이는 `str()` 내장 함수와 동등한 역할을 할 것입니다 (이상적으로는 `PyObject_Str`로 불려야 하지만, 해당 함수를 변경하면 엄청난 수의 호환성 문제가 발생할 수 있습니다).

```c
PyObject *PyString_New(PyObject *);
```

참고 구현은 Sourceforge에서 패치 형태로 제공됩니다.

## 하위 호환성 (Backwards Compatibility)

일부 코드는 `str()`이 반드시 `str` 인스턴스를 반환할 것을 요구할 수 있습니다. 표준 라이브러리에서는 현재까지 그러한 사례가 단 한 건 발견되었습니다. `email.header_decode()` 함수는 `str` 인스턴스를 요구하며, `email.Header.decode_header()` 함수는 인수에 대해 `str()`을 호출하여 이를 보장하려고 합니다. 이 코드는 "header = str(header)" 줄을 다음으로 변경하여 수정되었습니다.

```python
if isinstance(header, unicode):
    header = header.encode('ascii')
```

`decode_header()`가 실제로는 문자열(character string)이 아닌 바이트 문자열(byte string)에 대해 작동하므로, 이것이 진정한 버그인지는 의문입니다. `unicode` 인스턴스를 전달하는 코드는 그 자체로 버그로 간주될 수도 있습니다.

## 대안 솔루션 (Alternative Solutions)

`str()`을 변경하는 대신 새로운 내장 함수를 추가할 수도 있습니다. 이렇게 하면 사실상 하위 호환성 문제가 발생하지 않을 것입니다. 그러나 호환성 문제가 드물 것으로 예상되므로, 새로운 내장 함수를 추가하는 것보다 `str()`을 변경하는 것이 더 선호되는 것으로 보입니다.

`str()`을 변경하는 대신 `basestring` 타입을 제안된 동작을 갖도록 변경할 수도 있습니다. 그러나 추상 기본 타입(abstract base type)에 대한 이러한 동작은 혼란을 야기할 수 있습니다.

## 참고 자료 (References)

*   <https://bugs.python.org/issue1266570>

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.