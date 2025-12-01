---
title: "[Final] PEP 3106 - Revamping dict.keys(), .values() and .items()"
excerpt: "Python Enhancement Proposal 3106: 'Revamping dict.keys(), .values() and .items()'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3106/
toc: true
toc_sticky: true
date: 2025-09-27 14:18:13+0900
last_modified_at: 2025-09-27 14:18:13+0900
published: true
---
> **원문 링크:** [PEP 3106 - Revamping dict.keys(), .values() and .items()](https://peps.python.org/pep-3106/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 19-Dec-2006

## PEP 3106 – `dict.keys()`, `.values()`, `.items()` 메서드 개편

### 요약 (Abstract)
이 PEP(Python Enhancement Proposal)는 내장 `dict` 타입의 `.keys()`, `.values()`, `.items()` 메서드가 더 이상 키, 값 또는 아이템의 복사본인 리스트(list)를 반환하지 않고, 대신 기본 딕셔너리에서 내용을 파생하는 **세트-유사(set-like) 또는 비정렬 컨테이너 객체** 를 반환하도록 제안합니다. 또한, `.iterkeys()`, `.itervalues()`, `.iteritems()` 메서드는 제거됩니다. 이 접근 방식은 Java Collections Framework에서 영감을 받았습니다.

### 서론 (Introduction)
Python 2.x에서 `dict`의 `.keys()`, `.values()`, `.items()` 메서드는 리스트를 반환하여 딕셔너리가 커질수록 메모리 효율성이 떨어지는 문제가 있었습니다. 이러한 문제를 해결하고 보다 가벼운 객체를 반환하기 위해 오랫동안 계획되어 왔으며, `iterkeys()`, `itervalues()`, `iteritems()`와 같은 이터레이터(iterator)를 반환하는 메서드를 없애는 것이 목표였습니다.

기존 Python 2.x에서 다음과 같았던 코드는:
```python
for k, v in d.iteritems():
    ...
```
Python 3.x에서는 다음과 같이 다시 작성되어야 합니다:
```python
for k, v in d.items():
    ...
```
마찬가지로, 명시적으로 리스트가 필요한 경우에는 다음과 같이 변경해야 합니다:
```python
a = list(d.keys())
```

이 목표를 달성하는 방법은 두 가지가 있었습니다. 하나는 단순히 `keys()`, `values()`, `items()`가 Python 2.x의 `iterkeys()`, `itervalues()`, `iteritems()`와 동일하게 이터레이터를 반환하도록 하는 것이었습니다. 그러나 Java Collections Framework는 더 나은 해결책을 제시했는데, 그것은 메서드가 키, 값 또는 아이템의 복사본을 포함하지 않고, 오히려 기본 딕셔너리를 참조하고 필요에 따라 값을 가져오는 객체를 반환하는 방식입니다. `.keys()`와 `.items()` 메서드는 세트(set)와 같은 동작을, `.values()` 메서드는 멀티세트(multiset) (또는 백(bag))와 같은 동작을 가집니다.

이 접근 방식의 장점은 다음과 같은 코드를 계속 작성할 수 있다는 것입니다:
```python
a = d.items()
for k, v in a:
    ...
# 나중에 다시:
for k, v in a:
    ...
```
Python 3.0에서 `iter(d.keys())` 등은 Python 2.x의 `d.iterkeys()` 등과 동일하게 작동하며, 대부분의 `for` 루프 컨텍스트에서는 `iter()` 호출을 명시적으로 작성할 필요가 없습니다.

`.keys()`와 `.items()`가 반환하는 객체는 세트처럼 작동합니다. 따라서 두 딕셔너리가 동일한 키를 가지는지 다음과 같이 쉽게 확인할 수 있습니다:
```python
if a.keys() == b.keys():
    ...
```
이러한 연산은 스레드에 안전하며, 잘못된 사용으로 인해 예외가 발생할 수는 있지만 내부 표현이 손상되지는 않습니다. Python 2.x와 마찬가지로, 이터레이터를 사용하여 딕셔너리를 순회하는 동안 딕셔너리를 변경하면 정의되지 않은 효과가 발생하며, 대부분의 경우 `RuntimeError` 예외가 발생합니다. `.keys()`와 `.items()`가 반환하는 객체는 내장 `set` 및 `frozenset` 타입의 인스턴스와 완벽하게 상호 운용됩니다. 예를 들어, `set(d.keys()) == d.keys()`는 `True`를 보장합니다 (다른 스레드에서 `d`가 동시에 수정되는 경우 제외).

### 명세 (Specification)
이 PEP는 `dict` 클래스의 `keys()`, `items()`, `values()` 메서드가 각각 `d_keys`, `d_items`, `d_values`라는 임시 클래스 인스턴스를 반환하는 것으로 시맨틱(semantics)을 정의합니다. `.iterkeys()`, `.itervalues()`, `.iteritems()` 메서드는 제거됩니다.

**`d_keys` 클래스 (d_keys Class):**
*   `__len__()`: 기본 딕셔너리의 길이를 반환합니다.
*   `__contains__(key)`: 키가 기본 딕셔너리에 있는지 확인합니다.
*   `__iter__()`: 기본 딕셔너리의 키에 대한 이터레이터를 반환합니다.
*   세트와 호환되는 `<`, `<=`, `==`, `!=`, `>=`, `>`, `&`, `|`, `^`, `-` 연산자 및 메서드(`.union()` 등)를 구현합니다.

**`d_items` 클래스 (d_items Class):**
*   `__len__()`: 기본 딕셔너리의 길이를 반환합니다.
*   `__contains__((key, value))`: 키와 값이 기본 딕셔너리에 모두 존재하는지 확인합니다.
*   `__iter__()`: 기본 딕셔너리의 (키, 값) 쌍에 대한 이터레이터를 반환합니다.
*   `d_keys`와 유사하게 세트 연산을 지원합니다. 값(value)이 해시 가능하지 않아도 효율적으로 구현될 수 있습니다.

**`d_values` 클래스 (d_values Class):**
*   `__len__()`: 기본 딕셔너리의 길이를 반환합니다.
*   `__contains__(value)`: 값이 기본 딕셔너리에 존재하는지 확인합니다. 이는 느릴 수 있지만, 명시적으로 지원됨을 나타냅니다.
*   `__iter__()`: 기본 딕셔너리의 값에 대한 이터레이터를 반환합니다.
*   `__eq__(other)`: 다른 `d_values` 인스턴스와의 동일성을 비교합니다.

**주요 사항 (Notes):**
*   뷰(view) 객체는 직접 변경할 수 없지만, `__hash__()`를 구현하지 않습니다. 기본 딕셔너리가 변경되면 뷰 객체의 값도 변경될 수 있습니다.
*   기본 딕셔너리에 필요한 유일한 요구 사항은 `__getitem__()`, `__contains__()`, `__iter__()`, `__len__()`를 구현하는 것입니다.
*   `.copy()` 메서드는 구현되지 않습니다. 특정 타입의 복사본(예: `list` 또는 `set`)을 원하면 `list()` 또는 `set()` 생성자에 뷰 객체를 전달하면 됩니다.
*   `.keys()`, `.values()`, `.items()`가 반환하는 항목의 순서는 동일합니다 (Python 2.x와 동일하게). 이는 `list(d.items()) == list(zip(d.keys(), d.values()))` 불변식으로 표현됩니다.

### 미해결 문제 (Open Issues)
*   키와 아이템에 대해 복사 없이 세트 연산을 수행할 수 있다는 점 외에 추가적인 동기 부여가 필요한가?
*   다양한 세트 연산의 구현에서 작은 예상치 못한 문제가 발생할 수 있다.
*   `d.keys()` 등의 여러 호출이 동일한 객체를 반환하는 것이 좋은가? 모든 `dict` 객체에 추가 슬롯(slot)을 할당할 가치가 있는가?
*   `d_keys`, `d_values`, `d_items`가 기본 딕셔너리를 검색할 수 있는 공개 인스턴스 변수 또는 메서드를 가져야 하는가?
*   `d_keys`, `d_values`, `d_items`보다 더 나은 이름이 있는가? 이 클래스들은 다른 매핑(mapping) 타입의 `.keys()`, `.values()`, `.items()` 메서드에 의해 재사용될 수 있도록 공개될 수 있는가?
*   `d_keys`, `d_values`, `d_items` 클래스들을 재사용 가능하고 서브클래싱(subclassing) 가능하게 해야 하는가?

결정 사항(특히 이름 지정에 관한)은 실제 구현을 제출하는 사람에게 맡겨졌습니다.

### 참고 문헌 (References)
 Java Collections Framework.
    `http://java.sun.com/docs/books/tutorial/collections/index.html`

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.