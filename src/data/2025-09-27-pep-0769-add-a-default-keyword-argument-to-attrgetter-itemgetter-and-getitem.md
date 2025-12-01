---
title: "[Rejected] PEP 769 - Add a ‘default’ keyword argument to ‘attrgetter’, ‘itemgetter’ and ‘getitem’"
excerpt: "Python Enhancement Proposal 769: 'Add a ‘default’ keyword argument to ‘attrgetter’, ‘itemgetter’ and ‘getitem’'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/769/
toc: true
toc_sticky: true
date: 2025-09-27 13:50:33+0900
last_modified_at: 2025-09-27 13:50:33+0900
published: true
---
> **원문 링크:** [PEP 769 - Add a ‘default’ keyword argument to ‘attrgetter’, ‘itemgetter’ and ‘getitem’](https://peps.python.org/pep-0769/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 22-Dec-2024



# PEP 769 – `attrgetter`, `itemgetter`, `getitem`에 `default` 키워드 인자 추가 제안

*   **작성자:** Facundo Batista
*   **토론:** Discourse thread
*   **상태:** Rejected (거절됨)
*   **유형:** Standards Track
*   **생성일:** 2024년 12월 22일
*   **Python 버전:** 3.14
*   **최근 이력:** 2025년 1월 7일
*   **결정일:** 2025년 3월 14일

## 목차
*   [요약](#요약)
*   [동기](#동기)
*   [근거](#근거)
*   [사양 (Specification)](#사양-specification)
    *   [`attrgetter` 예시](#attrgetter-예시)
    *   [`itemgetter` 예시](#itemgetter-예시)
    *   [`getitem` 예시](#getitem-예시)
*   [구현 가능성에 대한 고려사항](#구현-가능성에-대한-고려사항)
*   [코너 케이스 (Corner Cases)](#코너-케이스-corner-cases)
*   [거절된 아이디어](#거절된-아이디어)
    *   [다중 기본값 (Multiple Default Values)](#다중-기본값-multiple-default-values)
    *   [튜플 반환 일관성 (Tuple Return Consistency)](#튜플-반환-일관성-tuple-return-consistency)
*   [오픈 이슈](#오픈-이슈)
*   [교육 방법](#교육-방법)
*   [하위 호환성](#하위-호환성)
*   [보안 영향](#보안-영향)
*   [저작권](#저작권)

---

## 요약

이 제안은 `operator` 모듈의 `attrgetter`, `itemgetter`, `getitem` 함수에 `default` 키워드 인자를 추가하여 기능을 개선하는 것을 목표로 했습니다. 이 인자가 추가되면, 지정된 속성 (attribute) 또는 항목 (item)이 없을 때 특정 기본값 (default value)을 반환하여 예외 발생을 방지하고 선택적 속성 또는 항목을 처리하는 코드를 간소화할 수 있습니다.

## 동기

현재 `attrgetter`와 `itemgetter`는 지정된 속성이나 항목이 존재하지 않으면 예외를 발생시킵니다. 이러한 한계 때문에 개발자는 추가적인 오류 처리를 구현해야 했고, 이는 코드를 더 복잡하고 가독성이 떨어지게 만들었습니다.

`default` 매개변수를 도입하면 선택적 속성이나 항목과 관련된 작업을 간소화하고, 반복적인 코드 (boilerplate code)를 줄이며, 코드의 명확성을 높일 수 있습니다.

`getitem`의 경우에도 비슷한 상황이 발생하는데, 이 경우 `default` 값을 지정할 수 있게 하면 내장 함수인 `getattr()`와 오랫동안 존재했던 비대칭성을 해결할 수 있다는 추가적인 이점이 있습니다.

## 근거

주요 설계 결정은 지정된 모든 속성 또는 항목에 적용되는 단일 `default` 매개변수를 도입하는 것이었습니다.

이러한 접근 방식은 단순성을 유지하고 여러 속성 또는 항목에 개별 기본값을 할당하는 복잡성을 피합니다. 다중 기본값을 허용하는 것에 대한 논의도 있었지만, 복잡성 증가와 혼란 가능성 때문에 모든 경우에 단일 기본값을 선호하게 되었습니다 (자세한 내용은 아래의 "거절된 아이디어" 참조).

## 사양 (Specification)

제안된 동작은 다음과 같습니다:

*   **`attrgetter`** : `f = attrgetter("name", default=XYZ)`를 사용한 다음 `f(obj)`를 호출하면, 속성이 존재할 경우 `obj.name`을 반환하고, 그렇지 않으면 `XYZ`를 반환합니다.
*   **`itemgetter`** : `f = itemgetter(2, default=XYZ)`를 사용한 다음 `f(obj)`를 호출하면, `obj[2]`가 유효할 경우 이를 반환하고, 그렇지 않으면 `XYZ`를 반환합니다.
*   **`getitem`** : `getitem(obj, k, XYZ)` 또는 `getitem(obj, k, default=XYZ)`를 사용하면, `obj[k]`가 유효할 경우 이를 반환하고, 그렇지 않으면 `XYZ`를 반환합니다.

처음 두 가지 경우에 이 개선 사항은 단일 및 다중 속성/항목 검색에 모두 적용되며, 누락된 속성이나 항목에 대해 `default` 값이 반환됩니다.

추가적인 `default` (키워드) 인자가 사용되지 않는 경우에는 어떤 경우에도 기능 변경이 없습니다.

### `attrgetter` 예시

#### 현재 동작 (변경 없음):
```python
>>> class C:
...     class D:
...         class X:
...             pass
...     class E:
...         pass
...
>>> attrgetter("D")(C)
<class '__main__.C.D'>
>>> attrgetter("badname")(C)
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
AttributeError: type object 'C' has no attribute 'badname'
>>> attrgetter("D", "E")(C)
(<class '__main__.C.D'>, <class '__main__.C.E'>)
>>> attrgetter("D", "badname")(C)
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
AttributeError: type object 'C' has no attribute 'badname'
>>> attrgetter("D.X")(C)
<class '__main__.C.D.X'>
>>> attrgetter("D.badname")(C)
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
AttributeError: type object 'D' has no attribute 'badname'
```

#### 이 PEP를 적용한 제안된 `default` 키워드 사용 시:
```python
>>> attrgetter("D", default="noclass")(C)
<class '__main__.C.D'>
>>> attrgetter("badname", default="noclass")(C)
'noclass'
>>> attrgetter("D", "E", default="noclass")(C)
(<class '__main__.C.D'>, <class '__main__.C.E'>)
>>> attrgetter("D", "badname", default="noclass")(C)
(<class '__main__.C.D'>, 'noclass')
>>> attrgetter("D.X", default="noclass")(C)
<class '__main__.C.D.X'>
>>> attrgetter("D.badname", default="noclass")(C)
'noclass'
```

### `itemgetter` 예시

#### 현재 동작 (변경 없음):
```python
>>> obj = ["foo", "bar", "baz"]
>>> itemgetter(1)(obj)
'bar'
>>> itemgetter(5)(obj)
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
IndexError: list index out of range
>>> itemgetter(1, 0)(obj)
('bar', 'foo')
>>> itemgetter(1, 5)(obj)
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
IndexError: list index out of range
```

#### 이 PEP를 적용한 제안된 `default` 키워드 사용 시:
```python
>>> itemgetter(1, default="XYZ")(obj)
'bar'
>>> itemgetter(5, default="XYZ")(obj)
'XYZ'
>>> itemgetter(1, 0, default="XYZ")(obj)
('bar', 'foo')
>>> itemgetter(1, 5, default="XYZ")(obj)
('bar', 'XYZ')
```

### `getitem` 예시

#### 현재 동작 (변경 없음):
```python
>>> obj = ["foo", "bar", "baz"]
>>> getitem(obj, 1)
'bar'
>>> getitem(obj, 5)
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
IndexError: list index out of range
```

#### 이 PEP를 적용한 제안된 `default` 인자 (위치 인자 또는 키워드 인자) 사용 시:
```python
>>> getitem(obj, 1, "XYZ")
'bar'
>>> getitem(obj, 5, "XYZ")
'XYZ'
>>> getitem(obj, 1, default="XYZ")
'bar'
>>> getitem(obj, 5, default="XYZ")
'XYZ'
```

## 구현 가능성에 대한 고려사항

`attrgetter`의 구현은 비교적 간단합니다. `getattr`를 사용하고 발생할 수 있는 `AttributeError`를 캐치하는 것을 의미합니다. 따라서 `attrgetter("name", default=XYZ)(obj)`는 다음과 유사하게 동작할 것입니다:

```python
try:
    value = getattr(obj, "name")
except AttributeError:
    value = XYZ
```

참고로, 속성 체인 (예: `attrgetter("foo.bar.baz", default=XYZ)`)이 지정될 때 각 단계에서 무엇이 반환되었는지 구별할 수 없으므로, `getattr`에 기본값을 사용하여 구현할 수는 없습니다.

`itemgetter`와 `getitem`의 구현은 그리 쉽지 않습니다. 가장 직관적인 방법은 `__getitem__`을 시도하고 가능한 예외를 캐치하는 것입니다. 이렇게 하면 `itemgetter(123, default=XYZ)(obj)` 또는 `getitem(obj, 123, default=XYZ)`는 다음 코드와 동일하게 동작할 것입니다:

```python
try:
    value = obj[123]
except (IndexError, KeyError):
    value = XYZ
```

그러나 성능상의 이유로 구현은 다음과 같이 보일 수 있으며, 이는 정확히 동일한 동작을 합니다:

```python
if type(obj) == dict:
    value = obj.get(123, XYZ)
else:
    try:
        value = obj[123]
    except (IndexError, KeyError):
        value = XYZ
```

여기서 확인은 `isinstance`를 사용하지 않고 정확한 `type`에 대해 이루어집니다. 이는 `dict`를 상속하지만 `get` 메서드를 덮어쓰는 사용자 정의 객체인 경우 정확한 동작을 보장하기 위함입니다.

이러한 방식은 성능이 더 좋지만, 이는 구현 세부 사항일 뿐이므로 동작 방식에 대한 원래 설명을 유지할 수 있습니다.

캡처할 예외와 관련하여, `__getitem__`은 `IndexError`, `KeyError`, 또는 `TypeError`를 발생시킬 수 있지만 (참조), 컨테이너에 지정된 키나 인덱스가 없는 경우에만 처음 두 가지가 발생할 수 있습니다. `TypeError`는 코드의 버그를 나타낼 가능성이 높으므로 기본 동작을 트리거하기 위해 캡처하지 않습니다.

## 코너 케이스 (Corner Cases)

기본값 옵션은 항목/속성 접근이 일반적인 경우 실패할 때만 작동합니다. 즉, 접근하는 객체 자체가 기본값을 처리해서는 안 됩니다.

예를 들어, `defaultdict`는 항목에 접근할 때 결코 오류를 발생시키지 않으므로 다음 코드는 중복되거나 혼란스러울 수 있습니다:

```python
>>> from collections import defaultdict
>>> from operator import itemgetter
>>> dd = defaultdict(int)
>>> itemgetter("foo", default=-1)(dd)
0
```

`__getitem__` 또는 `__getattr__`을 오버로드하여 자체 대체 (fallback) 로직을 구현하는 모든 사용자 정의 객체에도 동일하게 적용됩니다.

## 거절된 아이디어

### 다중 기본값 (Multiple Default Values)

여러 속성 또는 항목에 대해 여러 기본값을 허용하는 아이디어가 고려되었습니다.

두 가지 대안이 논의되었습니다. 하나는 `attrgetter` / `itemgetter`에 전달된 매개변수의 개수와 동일한 수의 항목을 가져야 하는 이터러블 (iterable)을 사용하는 것이었고, 다른 하나는 `attrgetter` / `itemgetter`에 전달된 이름과 일치하는 키를 가진 딕셔너리를 사용하는 것이었습니다.

여기서 해결하기 정말 복잡한 문제 (기능을 설명하기 어렵게 만들고 혼란스러운 코너 케이스를 유발하는)는 이터러블이나 딕셔너리가 모든 항목에 대해 실제로 원하는 기본값일 경우 어떤 일이 발생하느냐였습니다. 예를 들어:

```python
>>> itemgetter("a", default=(1, 2))({})
(1, 2)
>>> itemgetter("a", "b", default=(1, 2))({})
((1, 2), (1, 2))
```

`default`를 사용하여 "다중 기본값"을 허용한다면, 위 예시의 첫 번째 경우는 `default`에 이름보다 많은 항목이 있기 때문에 예외가 발생하고, 두 번째 경우는 `((1, 2), (1, 2))`를 반환할 것입니다. 이 때문에 다중 기본값에 대해 다른 이름 (예: `defaults` - 표현력이 좋지만 `default`와 너무 비슷하여 오류 발생 가능성이 있음)을 사용하는 가능성을 고려했습니다.

다중 기본값을 가능하게 하는 또 다른 제안은 `attrgetter`와 `itemgetter`의 조합을 허용하는 것이었습니다. 예를 들어:

```python
>>> ig_a = itemgetter("a", default=1)
>>> ig_b = itemgetter("b", default=2)
>>> ig_combined = itemgetter(ig_a, ig_b)
>>> ig_combined({"a": 999})
(999, 2)
>>> ig_combined({})
(1, 2)
```

그러나 `itemgetter` 또는 `attrgetter`를 조합하는 것은 완전히 새로운 동작이며 정의하기 매우 복잡합니다. 불가능하지는 않지만, 이 PEP의 범위를 벗어납니다.

결론적으로, 다중 기본값을 갖는 것은 지나치게 복잡하고 잠재적으로 혼란스러울 수 있다고 판단되었으며, 단순성과 예측 가능성을 위해 단일 `default` 매개변수가 선호되었습니다.

### 튜플 반환 일관성 (Tuple Return Consistency)

또 다른 거절된 제안은 주어진 키/이름/인덱스의 개수와 상관없이 항상 튜플을 반환하도록 하는 플래그를 추가하는 것이었습니다. 예를 들어:

```python
>>> letters = ["a", "b", "c"]
>>> itemgetter(1, return_tuple=True)(letters)
('b',)
>>> itemgetter(1, 2, return_tuple=True)(letters)
('b', 'c')
```

이것은 다중 기본값 일관성에 거의 도움이 되지 않으며, 추가적인 논의가 필요하고, 이 PEP의 범위를 벗어납니다.

## 오픈 이슈

현재 열려 있는 이슈는 없습니다.

## 교육 방법

기본 동작이 수정되지 않으므로, `attrgetter`와 `itemgetter`를 처음 가르칠 때는 이 새로운 `default` 기능을 생략할 수 있습니다. 기능이 필요할 때만 소개될 수 있습니다.

## 하위 호환성

제안된 변경 사항은 하위 호환성을 가집니다. `default` 매개변수는 선택 사항이며, 이 매개변수 없이 기존 코드는 이전과 동일하게 작동할 것입니다. 새로운 `default` 매개변수를 명시적으로 사용하는 코드만 새로운 동작을 보일 것이며, 현재 구현에 어떤 방해도 주지 않습니다.

## 보안 영향

`default` 매개변수를 도입하는 것은 본질적으로 보안 취약점을 유발하지 않습니다.

## 저작권

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 허용적인 조건에 따라 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.