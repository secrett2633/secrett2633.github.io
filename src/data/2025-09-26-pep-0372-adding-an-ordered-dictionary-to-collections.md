---
title: "[Final] PEP 372 - Adding an ordered dictionary to collections"
excerpt: "Python Enhancement Proposal 372: 'Adding an ordered dictionary to collections'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/372/
toc: true
toc_sticky: true
date: 2025-09-26 20:56:08+0900
last_modified_at: 2025-09-26 20:56:08+0900
published: true
---
> **원문 링크:** [PEP 372 - Adding an ordered dictionary to collections](https://peps.python.org/pep-0372/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 15-Jun-2008

PEP 372 – `collections` 모듈에 순서가 있는 딕셔너리 추가

## 개요
이 PEP는 `collections` 모듈에 "OrderedDict"라는 이름의 순서가 있는 딕셔너리(ordered dictionary)를 새로운 데이터 구조로 추가할 것을 제안합니다. 제안된 API는 다양한 실제 애플리케이션 및 다른 프로그래밍 언어에서 유사한 구현을 사용하며 얻은 경험을 통합합니다.

## 도입 배경
현재 Python 버전에서 널리 사용되는 내장 `dict` 타입은 저장된 키/값 쌍에 대한 순서를 지정하지 않습니다. 이로 인해 특정 사용 사례에서는 딕셔너리를 데이터 저장소로 사용하기 어렵습니다. PHP 및 Ruby 1.9와 같은 일부 동적 프로그래밍 언어는 이터레이션(iteration) 시 특정 순서를 보장합니다. 이러한 언어와 기존 Python의 순서 있는 딕셔너리(ordered-dict) 구현에서는 항목의 순서가 키가 삽입된 시간에 따라 정의됩니다. 새로운 키는 마지막에 추가되지만, 덮어쓰기되는 키는 마지막으로 이동하지 않습니다.

다음 예시는 간단한 할당에 대한 동작을 보여줍니다:
```python
>>> d = OrderedDict()
>>> d['parrot'] = 'dead'
>>> d['penguin'] = 'exploded'
>>> d.items()
[('parrot', 'dead'), ('penguin', 'exploded')]
```
순서가 유지된다는 점은 `OrderedDict`를 몇 가지 상황에서 유용하게 만듭니다:
*   XML/HTML 처리 라이브러리는 현재 속성(attribute)의 순서를 잃거나, 필터링이 번거로운 `dict` 대신 `list`를 사용하거나, 자체적인 순서 있는 딕셔너리를 구현하고 있습니다. 이는 `ElementTree`, `html5lib`, `Genshi` 및 더 많은 라이브러리에 영향을 미칩니다.
*   다양한 라이브러리 및 애플리케이션에 많은 순서 있는 딕셔너리 구현이 존재하며, 대부분 서로 미묘하게 호환되지 않습니다. 더욱이, `dict`를 서브클래싱(subclassing)하는 것은 간단한 작업이 아니며, 많은 구현이 모든 메서드를 제대로 오버라이드(override)하지 않아 예기치 않은 결과를 초래할 수 있습니다.
*   또한, 많은 순서 있는 딕셔너리는 비효율적인 방식으로 구현되어 있어 많은 연산이 필요 이상으로 복잡해집니다.
*   PEP 3115는 메타클래스(metaclass)가 클래스 본문에 사용되는 매핑 객체를 변경할 수 있도록 허용합니다. 순서 있는 딕셔너리는 C 구조체(struct)와 유사하게 순서 있는 멤버 선언을 만드는 데 사용될 수 있습니다. 이는 예를 들어, 미래의 `ctypes` 릴리스뿐만 아니라 Django 프레임워크가 제공하는 것과 같이 데이터베이스 테이블을 클래스로 정의하는 ORM에 유용할 수 있습니다. Django는 현재 데이터베이스 모델에서 멤버의 순서를 복원하기 위해 "ugly hack"을 사용하고 있습니다.
*   `RawConfigParser` 클래스는 애플리케이션이 내부적으로 사용되는 딕셔너리 타입을 설정할 수 있도록 `dict_type` 인수를 받습니다. 이 추가의 동기는 사용자가 순서 있는 딕셔너리를 제공할 수 있도록 명시적으로 허용하는 것이었습니다.
*   PHP와 같은 다른 프로그래밍 언어에서 포팅된 코드는 종종 순서 있는 딕셔너리에 의존합니다. 표준 라이브러리에 순서 유지 딕셔너리 구현이 있으면 전환을 용이하게 하고 다른 라이브러리 간의 호환성을 향상시킬 수 있습니다.

## OrderedDict API
`OrderedDict` API는 대부분 `dict` 및 기존의 순서 있는 딕셔너리와 호환됩니다. 이 PEP는 `collections.Mapping` 추상 베이스 클래스에 설명된 2.7 및 3.0 딕셔너리 API를 참조합니다.

생성자(`constructor`) 및 `update()` 메서드는 `dict`와 마찬가지로 튜플의 이터러블(iterable)뿐만 아니라 매핑(mapping)도 허용합니다. 일반 딕셔너리와 달리 삽입 순서가 보존됩니다.

```python
>>> d = OrderedDict([('a', 'b'), ('c', 'd')])
>>> d.update({'foo': 'bar'})
>>> d
collections.OrderedDict([('a', 'b'), ('c', 'd'), ('foo', 'bar')])
```
`OrderedDict`가 일반 `dict`로부터 업데이트될 경우, 새 키의 순서는 정의되지 않습니다.

`keys()`, `values()`, `items()`와 같은 모든 이터레이션(iteration) 메서드는 키가 처음 삽입된 시간에 따라 정렬된 값을 반환합니다.

```python
>>> d['spam'] = 'eggs'
>>> d.keys()
['a', 'c', 'foo', 'spam']
>>> d.values()
['b', 'd', 'bar', 'eggs']
>>> d.items()
[('a', 'b'), ('c', 'd'), ('foo', 'bar'), ('spam', 'eggs')]
```
`dict`에는 없는 새로운 메서드:
*   `OrderedDict.__reversed__()`: 키에 의한 역방향 이터레이션(reverse iteration)을 지원합니다.

### 질문과 답변

**기존 키가 재할당되면 어떻게 되나요?**
키는 이동하지 않고 제자리에서 새 값이 할당됩니다. 이는 기존 구현과 일치합니다.

**생성자에 전달된 리스트에 키가 여러 번 나타나면 어떻게 되나요?**
일반 `dict`와 동일하게, 나중에 오는 항목이 이전 항목을 덮어씁니다. 이는 실제로는 값만 덮어쓰여지기 때문에 첫 번째 키의 위치가 사용되는 부작용이 있습니다.

```python
>>> OrderedDict([('a', 1), ('b', 2), ('a', 3)])
collections.OrderedDict([('a', 3), ('b', 2)])
```
이 동작은 Python의 기존 구현, PHP 배열 및 Ruby 1.9의 해시맵(hashmap)과 일치합니다.

**Ordered Dict는 `dict` 서브클래스인가요? 왜 그런가요?**
네. `defaultdict`와 마찬가지로 `OrderedDict`는 `dict`를 서브클래스합니다. `dict`의 서브클래스이기 때문에 일부 메서드(`__getitem__`, `__len__` 등)를 더 빠르게 만듭니다. 더 중요한 것은, `dict`의 서브클래스라는 점이 `json`과 같이 `isinstance(d, dict)` 테스트를 통해 `dict` 입력을 요구하는 도구와 함께 `OrderedDict`를 사용할 수 있게 합니다.

**`dict`를 서브클래싱함으로써 발생하는 제한 사항이 있나요?**
네. `dict`의 API가 Py2.x와 Py3.x에서 다르기 때문에 `OrderedDict` API도 달라야 합니다. 따라서 Py2.7 버전은 `iterkeys`, `itervalues`, `iteritems`를 오버라이드해야 합니다.

**`OrderedDict.popitem()`은 특정 키/값 쌍을 반환하나요?**
네. 가장 최근에 삽입된 새 키와 해당 값을 꺼냅니다. 이는 전통적인 푸시/팝 쌍이 보이는 일반적인 LIFO(Last-In, First-Out) 동작에 해당합니다. 이는 의미론적으로 `k=list(od)[-1]; v=od[k]; del od[k]; return (k,v)`와 동일합니다. 실제 구현은 더 효율적이며 정렬된 키 목록에서 직접 꺼냅니다.

**OrderedDict는 인덱싱, 슬라이싱 등을 지원하나요?**
`OrderedDict`는 `Sequence` 인터페이스를 구현하지 않습니다. 오히려 키 삽입 순서를 기억하는 `MutableMapping`입니다. 유일한 시퀀스(sequence)와 유사한 추가 기능은 `reversed` 지원입니다.
인덱싱을 허용하지 않는 또 다른 장점은 연결 리스트(linked list)를 사용하는 빠른 C 구현 가능성을 열어둔다는 것입니다.

**OrderedDict는 알파벳순과 같은 다른 정렬 순서를 지원하나요?**
아니요. 다른 정렬 순서를 원하는 경우 다른 기술을 사용해야 합니다. `OrderedDict`는 삽입 순서를 기록하는 것에 관한 것입니다. 다른 순서에 관심이 있다면 다른 구조(예: 인메모리(in-memory) `dbm`)가 더 적합할 것입니다.

**OrderedDict는 `json` 모듈, PyYAML, `ConfigParser`와 얼마나 잘 작동하나요?**
*   `json`의 경우, `json`의 인코더(encoder)가 `OrderedDict`의 이터레이션 순서를 존중한다는 점이 좋습니다.

    ```python
    >>> items = [('one', 1), ('two', 2), ('three',3), ('four',4), ('five',5)]
    >>> json.dumps(OrderedDict(items))
    '{"one": 1, "two": 2, "three": 3, "four": 4, "five": 5}'
    ```
    Py2.6에서는 `json` 디코더(decoder)의 `object_hook`이 이미 빌드된 딕셔너리를 전달하므로 객체 훅이 보기 전에 순서가 손실됩니다. 이 문제는 순서를 보존하는 새로운 훅을 추가하여 Python 2.7/3.1에서 수정되고 있습니다. 새로운 훅을 사용하면 순서를 보존할 수 있습니다.

    ```python
    >>> jtext = '{"one": 1, "two": 2, "three": 3, "four": 4, "five": 5}'
    >>> json.loads(jtext, object_pairs_hook=OrderedDict)
    OrderedDict({'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5})
    ```
*   PyYAML의 경우, 완전한 왕복(round-trip)은 문제 없습니다.

    ```python
    >>> ytext = yaml.dump(OrderedDict(items))
    >>> print ytext
    !!python/object/apply:collections.OrderedDict
    - - [one, 1]
      - [two, 2]
      - [three, 3]
      - [four, 4]
      - [five, 5]
    >>> yaml.load(ytext)
    OrderedDict({'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5})
    ```
*   `ConfigParser` 모듈의 경우, 왕복 또한 문제 없습니다. 사용자 정의 딕셔너리는 Py2.6에서 순서 있는 딕셔너리를 특별히 지원하기 위해 추가되었습니다.

    ```python
    >>> config = ConfigParser(dict_type=OrderedDict)
    >>> config.read('myconfig.ini')
    >>> config.remove_option('Log', 'error')
    >>> config.write(open('myconfig.ini', 'w'))
    ```

**OrderedDict는 동등성 테스트(equality testing)를 어떻게 처리하나요?**
두 `OrderedDict`를 비교하는 것은 테스트가 순서에 민감하다는 것을 의미하므로 `list(od1.items()) == list(od2.items())`와 같이 동작합니다.
`OrderedDict`가 다른 `Mapping`과 비교될 때는 순서에 민감하지 않은 비교가 사용됩니다. 이를 통해 `OrderedDict`는 일반 딕셔너리가 사용되는 모든 곳에서 대체될 수 있습니다.

**`__repr__` 형식은 `repr`/`eval` 왕복 동안 순서를 어떻게 유지하나요?**
`OrderedDict([('a', 1), ('b', 2)])`와 같이 표현되어 순서를 유지합니다.

**가능한 기본 데이터 구조의 장단점은 무엇인가요?**
*   **정렬된 키 목록 유지:** `__delitem__()`을 제외한 모든 연산에서 빠릅니다. `__delitem__()`은 O(n) 연산이 됩니다. 이 데이터 구조는 매우 간단한 코드와 적은 공간 낭비를 가져옵니다.
*   **삽입 순서 번호를 기록하기 위한 별도의 딕셔너리 유지:** 코드가 약간 더 복잡해집니다. 모든 기본 연산은 O(1)이지만 `__setitem__()` 및 `__delitem__()`의 상수 인자(constant factor)가 증가하여 모든 사용 사례가 이 속도 향상에 대한 비용을 지불해야 합니다. 또한, 첫 번째 순회는 한 번의 O(n log n) 정렬 비용을 발생시킵니다. 저장 비용은 정렬된 키 목록 접근 방식의 두 배입니다.
*   **C로 작성된 버전(연결 리스트 사용):** 코드는 다른 두 접근 방식보다 더 복잡하지만, 공간을 절약하고 일반 딕셔너리와 동일한 O 표기법 성능을 유지합니다. 가장 빠르고 공간 효율적입니다.

## 참조 구현 (Reference Implementation)
테스트 및 문서가 포함된 구현은 OrderedDict patch에서 확인할 수 있습니다.

제안된 버전은 다음과 같은 몇 가지 장점이 있습니다:
*   `MutableMapping` API와의 엄격한 준수 및 새로운 메서드가 없어 학습 곡선이 거의 0입니다. 단순히 삽입 순서를 기억하는 딕셔너리입니다.
*   일반적으로 좋은 성능을 보입니다. 키 삭제가 O(n)인 것을 제외하고는 `dict`와 동일한 O 표기법 시간 복잡도를 가집니다.

여기서 제안된 API에 영감을 준 다른 Python 프로젝트 또는 독립형 라이브러리의 `OrderedDict` 구현은 다음과 같습니다:
*   Python의 `odict`
*   Babel의 `odict`
*   Django의 `OrderedDict`
*   `odict` 모듈
*   `ordereddict` (`odict` 모듈의 C 구현)
*   `StableDict`
*   Armin Rigo의 `OrderedDict`

## 향후 방향 (Future Directions)
표준 라이브러리에 `OrderedDict`가 도입됨에 따라 다른 라이브러리들도 이를 활용할 수 있습니다. 예를 들어, `ElementTree`는 향후 소스 파일의 속성 순서를 유지하는 `OrderedDict`를 반환할 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.