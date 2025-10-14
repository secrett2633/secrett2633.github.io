---
title: "[Final] PEP 424 - A method for exposing a length hint"
excerpt: "Python Enhancement Proposal 424: 'A method for exposing a length hint'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/424/
toc: true
toc_sticky: true
date: 2025-09-26 21:39:24+0900
last_modified_at: 2025-09-26 21:39:24+0900
published: true
---
> **원문 링크:** [PEP 424 - A method for exposing a length hint](https://peps.python.org/pep-0424/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 14-Jul-2012

PEP 424 – 길이 힌트 노출을 위한 메서드

**저자:** Alex Gaynor
**상태:** Final (최종)
**유형:** Standards Track (표준 추적)
**생성일:** 2012년 7월 14일
**Python 버전:** 3.4
**수정 이력:** 2012년 7월 15일

---

## 초록 (Abstract)

현재 CPython은 여러 타입(예: 다양한 이터레이터)에 `__length_hint__` 메서드를 정의하고 있습니다. 이 메서드는 `list`와 같은 다른 여러 함수에 의해 `__length_hint__`가 반환하는 추정치에 기반하여 `list`의 크기를 미리 할당하는 데 사용됩니다. 크기가 정해져 있지 않아 `__len__`을 정의할 수 없는 타입도 `__length_hint__`를 정의하여 크기(예: 많은 이터레이터)를 추정하거나 계산할 수 있도록 합니다.

## 명세 (Specification)

이 PEP는 다른 인터프리터와 비표준 라이브러리(non-standard-library) Python 모듈이 구현할 수 있도록 `__length_hint__`를 공식적으로 문서화합니다.

`__length_hint__`는 정수(그렇지 않으면 `TypeError` 발생) 또는 `NotImplemented`를 반환해야 하며, 정확할 필요는 없습니다. 실제 컨테이너의 크기보다 크거나 작은 값을 반환할 수 있습니다. `NotImplemented`를 반환하는 것은 유한한 길이 추정치가 없음을 나타냅니다. 음수 값을 반환할 수 없습니다 (그렇지 않으면 `ValueError`가 발생합니다).

또한, 새로운 함수 `operator.length_hint`가 다음과 같은 의미론(semantics)으로 추가됩니다 (이는 `__length_hint__`가 어떻게 사용되어야 하는지를 정의합니다):

```python
def length_hint(obj, default=0):
    """obj에 있는 항목 수에 대한 추정치를 반환합니다.
    이는 이터러블(iterable)로부터 컨테이너를 빌드할 때 미리 크기를 할당하는 데 유용합니다.
    객체가 len()을 지원하면 결과는 정확합니다.
    그렇지 않으면 임의의 양만큼 과대 또는 과소 추정될 수 있습니다.
    결과는 0보다 크거나 같은 정수입니다.
    """
    try:
        return len(obj)
    except TypeError:
        try:
            get_hint = type(obj).__length_hint__
        except AttributeError:
            return default
        try:
            hint = get_hint(obj)
        except TypeError:
            return default
        if hint is NotImplemented:
            return default
        if not isinstance(hint, int):
            raise TypeError("Length hint must be an integer, not %r" % type(hint))
        if hint < 0:
            raise ValueError("__length_hint__() should return >= 0")
        return hint
```


## 배경 (Rationale)

`__length_hint__`에 의해 추정된 예상 크기를 기반으로 `list`를 미리 할당할 수 있는 기능은 상당한 최적화가 될 수 있습니다. CPython은 이러한 최적화가 존재한다는 이유만으로 PyPy보다 일부 코드를 더 빠르게 실행하는 것이 관찰되었습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.