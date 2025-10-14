---
title: "[Rejected] PEP 455 - Adding a key-transforming dictionary to collections"
excerpt: "Python Enhancement Proposal 455: 'Adding a key-transforming dictionary to collections'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/455/
toc: true
toc_sticky: true
date: 2025-09-26 22:05:06+0900
last_modified_at: 2025-09-26 22:05:06+0900
published: true
---
> **원문 링크:** [PEP 455 - Adding a key-transforming dictionary to collections](https://peps.python.org/pep-0455/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 13-Sep-2013



# PEP 455 – `collections` 모듈에 키 변환 딕셔너리 추가

## 개요 (Abstract)

이 PEP는 `collections` 모듈을 위한 새로운 데이터 구조인 "TransformDict"를 제안합니다. TransformDict는 조회를 수행할 때 주어진 함수를 사용하여 키를 변환하지만, 값을 읽을 때는 원래 키를 유지하는 가변 매핑(Mutable Mapping)입니다.

## 제안 거부 (Rejection)

이 제안은 최종적으로 거부되었습니다. 거부 사유에 대한 자세한 내용은 Python 개발자 메일링 리스트 아카이브에서 확인할 수 있습니다.

## 배경 (Rationale)

이러한 패턴의 수많은 특수화된 버전이 이미 존재합니다. 가장 흔한 예시는 대소문자를 구분하지 않으면서도 원래 대소문자를 보존하는 딕셔너리(case-insensitive case-preserving dict)입니다. 즉, 키를 대소문자 구분 없이 일치시키지만 원래의 대소문자 표기법을 유지하는 딕셔너리 형태의 컨테이너를 말합니다. 이는 네트워크 프로그래밍에서 매우 흔하게 요구되는 기능인데, 많은 프로토콜 메시지에서 키/값 속성 배열을 사용하며, 이 키들은 수신 시 대소문자를 무시하도록 지정되어 있지만, 재전송 시에는 규격이나 관례에 따라 보존되거나 비자명하게 정규화(canonicalized)되어야 하기 때문입니다.

또 다른 일반적인 요청은 `id()` 함수에 따라 키를 일치시키는 identity dict입니다.

이 두 가지 모두, 키를 조회할 때 주어진 변환 함수를 적용하는 더 일반적인 패턴의 인스턴스입니다. 전자의 예시에서는 `str.lower` 또는 `str.casefold` 함수가, 후자의 예시에서는 내장 `id` 함수가 사용됩니다.

(이러한 패턴은 사용자에게 보이는 키 집합을 내부 조회 집합으로 투영(projects)한다고 볼 수 있습니다.)

## TransformDict의 의미 (Semantics)

TransformDict는 `MutableMapping` 구현체입니다. 즉, `dict` 자체와 표준 라이브러리의 다른 딕셔너리 유사 클래스처럼 잘 알려진 가변 매핑 API를 충실히 구현합니다. 따라서 이 PEP에서는 대부분의 TransformDict 메서드 의미론을 다시 설명하지 않습니다.

변환 함수는 전단사(bijective)일 필요는 없으며, 대소문자 구분 없는 예시처럼 엄격히 전사(surjective)일 수 있습니다 (즉, 다른 키들이 동일한 값을 조회할 수 있습니다):

```python
>>> d = TransformDict(str.casefold)
>>> d['SomeKey'] = 5
>>> d['somekey']
5
>>> d['SOMEKEY']
5
```

TransformDict는 항목을 생성할 때 사용된 첫 번째 키를 유지합니다:

```python
>>> d = TransformDict(str.casefold)
>>> d['SomeKey'] = 1
>>> d['somekey'] = 2
>>> list(d.items())
[('SomeKey', 2)]
```

변환 함수가 해시 가능한(hashable) 값을 반환하는 한, 원래 키는 해시 가능할 필요가 없습니다:

```python
>>> d = TransformDict(id)
>>> l = [None]
>>> d[l] = 5
>>> l in d
True
```

### 생성자 (Constructor)

위 예시에서 볼 수 있듯이, TransformDict를 생성하려면 키 변환 함수를 첫 번째 인자로 전달해야 합니다 (마치 `defaultdict`를 생성할 때 팩토리 함수를 첫 번째 인자로 전달하는 것과 유사합니다).

생성자는 또한 특정 키-값 쌍으로 TransformDict를 초기화하는 데 사용할 수 있는 다른 선택적 인자들을 받습니다. 이 선택적 인자들은 `dict` 및 `defaultdict` 생성자와 동일합니다:

```python
>>> d = TransformDict(str.casefold, [('Foo', 1)], Bar=2)
>>> sorted(d.items())
[('Bar', 2), ('Foo', 1)]
```

### 원본 키 가져오기 (Getting the original key)

TransformDict는 저장된 키와 해당 값을 함께 반환하는 조회 메서드를 제공합니다:

```python
>>> d = TransformDict(str.casefold, {'Foo': 1})
>>> d.getitem('FOO')
('Foo', 1)
>>> d.getitem('bar')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'bar'
```

메서드 이름 `getitem()`은 가변 매핑의 표준 `popitem()` 메서드를 따릅니다.

### 변환 함수 가져오기 (Getting the transformation function)

TransformDict는 변환 함수를 반환하는 간단한 읽기 전용 속성 `transform_func`를 가집니다.

## 대안 제안 및 질문 (Alternative proposals and questions)

### 마지막 원본 키 유지 (Retaining the last original key)

대부분의 python-dev 응답자들은 마지막으로 제공된 키를 유지하는 것보다 첫 번째로 제공된 키를 유지하는 것이 더 직관적이라고 생각했습니다. 또한, 이는 다른 키이지만 동일한 값을 가질 때 `dict` 객체 자체의 동작과 일치합니다:

```python
>>> d = {}
>>> d[1] = 'hello'
>>> d[1.0] = 'world'
>>> d
{1: 'world'}
```

더 나아가, 첫 번째 키를 유지하는 체계에서 명시적으로 마지막 키를 유지하는 것은 다음 접근 방식을 사용하여 여전히 가능합니다:

```python
d.pop(key, None)
d[key] = value
```

반대로, 마지막 키를 유지하는 체계에서 첫 번째 키를 유지하는 것은 컨테이너 코드의 일부를 다시 작성하지 않고는 불가능해 보입니다.

### 인코더 / 디코더 쌍 사용 (Using an encoder / decoder pair)

컨테이너가 원래 키를 유지하므로 함수 쌍을 사용할 필요가 없습니다. 또한, 인코더/디코더 쌍은 변환이 전단사적(bijective)이어야 하므로, 대소문자 구분 없는 매칭과 같은 중요한 사용 사례를 방해합니다.

### 값에 대한 변환 함수 제공 (Providing a transformation function for values)

딕셔너리 값은 조회에 사용되지 않으며, 그 의미론은 컨테이너의 동작과 전혀 관련이 없습니다. 따라서 "원본" 값과 "변환된" 값 모두를 가질 이유가 없습니다. 변환된 값은 어떤 용도로도 사용되지 않을 것입니다.

### 일반적이지 않은 특수화된 컨테이너 제공 (Providing a specialized container, not generic)

왜 특수화된 대소문자 구분 없는 `dict` 변형 대신 일반적인 TransformDict 구조를 제공하는지에 대한 질문이 있었습니다. 답은 일반적인 구조를 제공하는 것이 (코드 및 성능 면에서) 거의 비용이 적게 들고, 더 많은 사용 사례를 충족시킬 수 있기 때문입니다.

심지어 대소문자 구분 없는 딕셔너리조차도 실제로 다른 변환 함수를 유발할 수 있습니다: `str.lower`, `str.casefold` 또는 ASCII 호환 인코딩으로 인코딩된 텍스트로 작업할 때는 `bytes.lower`를 사용합니다.

### 다른 생성자 패턴 (Other constructor patterns)

Serhiy Storchaka에 의해 두 가지 다른 생성자 패턴이 제안되었습니다:

**타입 팩토리(type factory) 방식:**

```python
d = TransformDict(str.casefold)(Foo=1)
```

**서브클래싱(subclassing) 방식:**

```python
class CaseInsensitiveDict(TransformDict):
    __transform__ = str.casefold

d = CaseInsensitiveDict(Foo=1)
```

두 접근 방식 모두 옹호될 수 있지만, 표준 라이브러리의 확립된 관행을 따르지 않으므로 거부되었습니다.

## 구현 (Implementation)

`collections` 모듈용 패치는 버그 트래커(http://bugs.python.org/issue18986)에서 추적되었습니다.

## 기존 작업 (Existing work)

대소문자 구분 없는 딕셔너리는 인기 있는 요청이었습니다.

*   [twistedmatrix.com의 `twisted.python.util.InsensitiveDict`](http://twistedmatrix.com/documents/current/api/twisted.python.util.InsensitiveDict.html)
*   Python-list 및 Stack Overflow 등 다양한 논의와 구현 사례들이 존재합니다.

Identity dict 또한 요청된 바 있습니다.

*   `pickle`, `json`, `copy`, `cProfile`, `doctest`, `_threading_local`과 같은 표준 라이브러리의 여러 모듈은 객체 메모이제이션(object memoization)을 위해 identity lookups를 사용합니다.

## 다른 언어 (Other languages)

*   **C# / .Net:** `IEqualityComparer`를 사용자 정의할 수 있는 일반 `Dictionary` 클래스를 제공합니다.
*   **Java:** 특수화된 `CaseInsensitiveMap`과 `IdentityHashMap`을 제공합니다.
*   **C++:** C++ Standard Template Library는 사용자 정의 해시 및 동등 함수를 가진 `unordered_map`을 특징으로 합니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.