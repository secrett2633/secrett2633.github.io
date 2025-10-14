---
title: "[Rejected] PEP 351 - The freeze protocol"
excerpt: "Python Enhancement Proposal 351: 'The freeze protocol'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/351/
toc: true
toc_sticky: true
date: 2025-09-26 18:58:26+0900
last_modified_at: 2025-09-26 18:58:26+0900
published: true
---
> **원문 링크:** [PEP 351 - The freeze protocol](https://peps.python.org/pep-0351/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 14-Apr-2005

## PEP 351 – The freeze protocol (동결 프로토콜)

**작성자:** Barry Warsaw <barry at python.org>
**상태:** Rejected (거부됨)
**유형:** Standards Track
**생성일:** 2005년 4월 14일
**Python 버전:** 2.5
**게시 이력:** [원문 참고]

### 요약 (Abstract)
이 PEP는 가변(mutable) 객체의 동결된(frozen), 불변(immutable) 복사본을 요청하기 위한 간단한 프로토콜을 설명합니다. 또한, 이 프로토콜을 사용하여 협력하는(cooperating) 모든 객체에 대해 불변 복사본을 제공하는 새로운 내장 함수를 정의합니다.

### 거부 공지 (Rejection Notice)
이 PEP는 거부되었습니다. 그 이유에 대해서는 python-dev 스레드를 참조하십시오.

### 배경 (Rationale)
사전(dictionaries)과 집합(sets) 같은 내장 객체는 키로 오직 불변 객체만을 허용합니다. 이는 리스트(lists)와 같은 가변 객체가 딕셔너리의 키로 사용될 수 없다는 것을 의미합니다. 그러나 Python 프로그래머는 리스트를 튜플(tuple)로 변환할 수 있습니다. 이 두 객체는 유사하지만, 튜플은 불변이므로 딕셔너리 키로 사용될 수 있습니다.

서드파티 객체 또한 유사한 가변 및 불변 대응 객체를 가질 수 있으며, 이러한 객체들을 변환하기 위한 표준 프로토콜이 있다면 유용할 것입니다.

`sets.Set` 객체는 `sets.Set`의 `sets.Set`을 생성할 수 있도록 "불변으로 자동 변환하기 위한 프로토콜"을 노출합니다. PEP 218은 내장 `set`에서 이 기능을 의도적으로 제외했습니다. 이 PEP는 이 기능이 여전히 유용하다고 주장하며, 이를 지원하기 위한 표준 메커니즘을 제안합니다.

### 제안 (Proposal)
`freeze()`라는 새로운 내장 함수를 추가하는 것이 제안됩니다.

`freeze()` 함수에 불변 객체가 전달되면(해당 객체에 대한 `hash()` 호출 시 `TypeError`가 발생하지 않는 것으로 판단), 객체는 직접 반환됩니다.

`freeze()` 함수에 가변 객체가 전달되면(즉, 해당 객체의 `hash()` 호출 시 `TypeError`가 발생), `freeze()`는 해당 객체의 `__freeze__()` 메서드를 호출하여 불변 복사본을 얻습니다. 객체에 `__freeze__()` 메서드가 없으면 `TypeError`가 발생합니다.

### 예시 구현 (Sample implementations)
다음은 `freeze()` 내장 함수의 Python 구현입니다.

```python
def freeze(obj):
    try:
        hash(obj)
        return obj
    except TypeError:
        freezer = getattr(obj, '__freeze__', None)
        if freezer:
            return freezer()
        raise TypeError('object is not freezable')
```
다음은 의도된 동작을 보여주는 몇 가지 코드 샘플입니다.

```python
class xset(set):
    def __freeze__(self):
        return frozenset(self)

class xlist(list):
    def __freeze__(self):
        return tuple(self)

class imdict(dict):
    def __hash__(self):
        return id(self)
    def _immutable(self, *args, **kws):
        raise TypeError('object is immutable')
    __setitem__ = _immutable
    __delitem__ = _immutable
    clear = _immutable
    update = _immutable
    setdefault = _immutable
    pop = _immutable
    popitem = _immutable

class xdict(dict):
    def __freeze__(self):
        return imdict(self)
```

```python
>>> s = set([1, 2, 3])
>>> {s: 4}
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
TypeError: set objects are unhashable
>>> t = freeze(s)
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
  File "/usr/tmp/python-lWCjBK.py", line 9, in freeze
TypeError: object is not freezable
>>> t = xset(s)
>>> u = freeze(t)
>>> {u: 4}
{frozenset([1, 2, 3]): 4}
>>> x = 'hello'
>>> freeze(x) is x
True
>>> d = xdict(a=7, b=8, c=9)
>>> hash(d)
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
TypeError: dict objects are unhashable
>>> hash(freeze(d))
-1210776116
>>> {d: 4}
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
TypeError: dict objects are unhashable
>>> {freeze(d): 4}
{\{'a': 7, 'c': 9, 'b': 8}: 4}
```


### 참조 구현 (Reference implementation)
패치 1335812는 이 기능의 C 구현을 제공합니다. 이는 `freeze()` 내장 함수와 함께 리스트 및 집합에 대한 `__freeze__()` 메서드의 구현을 추가합니다. 딕셔너리는 현재 Python에서 쉽게 동결할 수 없으므로, `dict.__freeze__()`의 구현은 아직 제공되지 않습니다.

### 미해결 문제 (Open issues)
* 동결된 객체를 해동(thawing)하기 위한 유사한 프로토콜을 정의해야 할까요?
* 딕셔너리와 집합이 가변 키를 자동으로 동결해야 할까요?
* `sets.Set`의 `__as_temporarily_immutable__()`처럼 "임시 동결"(아마도 `__congeal__()` 메서드를 사용하여)을 지원해야 할까요?
* `sets.Set`과의 하위 호환성을 위해 `__as_immutable__()`을 지원해야 할까요? 아니면 `__freeze__()`의 이름을 `__as_immutable__()`으로 변경해야 할까요?

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.