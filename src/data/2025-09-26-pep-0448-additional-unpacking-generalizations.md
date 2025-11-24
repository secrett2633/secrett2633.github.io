---
title: "[Final] PEP 448 - Additional Unpacking Generalizations"
excerpt: "Python Enhancement Proposal 448: 'Additional Unpacking Generalizations'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/448/
toc: true
toc_sticky: true
date: 2025-09-26 22:00:00+0900
last_modified_at: 2025-09-26 22:00:00+0900
published: true
---
> **원문 링크:** [PEP 448 - Additional Unpacking Generalizations](https://peps.python.org/pep-0448/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 29-Jun-2013

## PEP 448 – 추가적인 언패킹 일반화 (Additional Unpacking Generalizations)

### 요약 (Abstract)
이 PEP(Python Enhancement Proposal)는 `*` 이터러블 언패킹(iterable unpacking) 연산자와 `**` 딕셔너리 언패킹(dictionary unpacking) 연산자의 확장된 사용법을 제안합니다. 이를 통해 더 많은 위치에서, 임의의 횟수로 언패킹을 허용하며, 특히 함수 호출(function calls) 및 디스플레이(displays, 즉 리터럴 컨테이너 생성 시) 내에서 언패킹을 가능하게 합니다.

함수 호출에서는 단 한 번의 언패킹이 아니라 임의의 횟수만큼 언패킹을 지원하도록 제안됩니다.
예시:
```python
>>> print(*[1], *[2], 3)
1 2 3
>>> dict(**{'x': 1}, y=2, **{'z': 3})
{'x': 1, 'y': 2, 'z': 3}
```
또한, 튜플(tuple), 리스트(list), 세트(set), 딕셔너리(dictionary) 디스플레이(컨테이너 리터럴) 내부에서도 언패킹이 허용됩니다.
예시:
```python
>>> *range(4), 4
(0, 1, 2, 3, 4)
>>> [*range(4), 4]
[0, 1, 2, 3, 4]
>>> {*range(4), 4}
{0, 1, 2, 3, 4}
>>> {'x': 1, **{'y': 2}}
{'x': 1, 'y': 2}
```
딕셔너리에서는 나중에 오는 값이 항상 이전 값을 덮어씁니다.
예시:
```python
>>> {'x': 1, **{'x': 2}}
{'x': 2}
>>> {**{'x': 2}, 'x': 1}
{'x': 1}
```
이 PEP는 리스트, 세트, 딕셔너리 컴프리헨션(comprehensions) 내에서의 언패킹 연산자 포함은 다루지 않으며, 이는 향후 제안으로 고려될 수 있습니다.

### 배경 (Rationale)

현재 `*` 이터러블 언패킹 연산자의 사용에는 불필요한 제약이 있어 코드 가독성을 해칠 수 있습니다.

여러 이터러블을 여러 번 언패킹하는 것은 분명한 이유가 있습니다. 여러 이터러블을 함수 정의로 언패킹하거나 언패킹 뒤에 추가적인 위치 인수(positional arguments)를 붙이려면 가장 자연스러운 방법은 다음과 같이 작성하는 것일 것입니다.
```python
function(**kw_arguments, **more_arguments)
function(*arguments, argument)
```
`print`나 `str.format` 같은 간단한 예시에서 이러한 기능이 유용합니다. 대신, 다음과 같이 작성해야 할 수 있습니다.
```python
kwargs = dict(kw_arguments)
kwargs.update(more_arguments)
function(**kwargs)
args = list(arguments)
args.append(arg)
function(*args)
```
또는, 방법을 알고 있다면 다음과 같이 작성할 수 있습니다.
```python
from collections import ChainMap
function(**ChainMap(more_arguments, arguments))
from itertools import chain
function(*chain(args, [arg]))
```
이러한 방식은 불필요한 코드의 복잡성을 추가하고, 첫 번째 방법은 작업의 중복을 야기합니다.

컨테이너(튜플, 리스트, 세트, 딕셔너리) 내부에서 언패킹을 허용하는 두 가지 주요 이유가 있습니다.
첫째, 할당(assignment)의 대칭성(symmetry)이 있습니다. 예를 들어 `fst, *other, lst = elems`와 `elems = fst, *other, lst`는 타입의 세부 사항을 무시하면 대략적인 역관계입니다. 이는 특별한 경우(special cases)를 제거하여 언어를 단순화하는 효과가 있습니다.

둘째, 딕셔너리 결합과 같은 "추가(addition)" 유형을 명확하고 잘 정의된 방식으로 크게 단순화합니다.
```python
combination = {**first_dictionary, "x": 1, "y": 2}
```
다음과 같이 작성하는 대신:
```python
combination = first_dictionary.copy()
combination.update({"x": 1, "y": 2})
```
이는 표현식(expressions)이 선호되는 맥락에서 특히 중요합니다. 또한, `my_list + list(my_tuple) + list(my_range)`와 같이 이터러블을 리스트로 합치는 것을 더욱 가독성 좋은 방법인 `[*my_list, *my_tuple, *my_range]`로 대체할 수 있게 하여 유용합니다.

### 명세 (Specification)

함수 호출은 무제한의 `*` 및 `**` 언패킹을 허용할 수 있습니다. 위치 인수와 `*` 언패킹의 순서에 대한 제약은 없으며, 키워드 인수와 `**` 언패킹의 순서에 대한 제약도 없습니다.

함수 호출은 여전히 키워드 인수가 위치 인수 뒤에 와야 한다는 제약을 가지며, `**` 언패킹은 추가적으로 `*` 언패킹 뒤에 와야 합니다.

현재, 인수가 여러 번 주어지는 경우(예: 위치 인수와 키워드 인수로 동시에 주어지는 경우)에는 `TypeError`가 발생합니다. 이는 여러 `**` 언패킹을 통해 중복 인수가 제공되는 경우에도 마찬가지입니다(예: `f(**{'x': 2}, **{'x': 3})`), 다만 이 오류는 런타임에 감지됩니다.

함수는 다음과 같은 형태를 가집니다:
```
function( argument or *args, argument or *args, ..., kwargument or *args, kwargument or *args, ..., kwargument or **kwargs, kwargument or **kwargs, ... )
```
튜플, 리스트, 세트, 딕셔너리는 언패킹을 허용할 것입니다. 이는 언패킹되는 항목의 요소들이 함수 호출 시의 언패킹과 매우 유사하게 언패킹 위치에 순서대로 삽입되는 것처럼 작동합니다. 딕셔너리는 `**` 언패킹을 필요로 하며, 다른 모든 컨테이너는 `*` 언패킹을 필요로 합니다.

딕셔너리의 키는 오른쪽에서 왼쪽으로 우선순위를 유지합니다. 따라서 `{**{'a': 1}, 'a': 2, **{'a': 3}}`는 `{'a': 3}`으로 평가됩니다. 언패킹의 수나 위치에 대한 제약은 없습니다.

### 단점 (Disadvantages)

함수 호출에서 인수에 허용되는 순서는 이전보다 더 복잡해졌습니다. 규칙에 대한 가장 간단한 설명은 "위치 인수는 키워드 인수 및 `**` 언패킹보다 선행하며; `*` 언패킹은 `**` 언패킹보다 선행한다"일 수 있습니다.

`*elements, = iterable`는 `elements`를 리스트로 만드는 반면, `elements = *iterable,`는 `elements`를 튜플로 만듭니다. 이러한 구성에 익숙하지 않은 사람들에게는 그 이유가 혼란스러울 수 있습니다.

딕셔너리에서 중복 키는 허용되지만, 함수 호출 구문에서 중복 키는 에러를 발생시키는 예상치 못한 차이에 대한 우려가 제기되었습니다. 비록 이는 현재 구문에서도 마찬가지이지만, 이 제안은 문제를 악화시킬 수 있습니다. 이것이 실제 사용에서 얼마나 큰 문제가 될지는 아직 지켜봐야 합니다.

### 변형 (Variations)

이 PEP는 원래 함수 호출에서 인수 타입(위치, 키워드, `*`, `**`)의 순서가 덜 엄격해질 수 있는지 고려했습니다. 그러나 이는 거의 지지를 받지 못하여 폐기되었습니다.

이 PEP의 초기 버전에서는 리스트, 세트, 딕셔너리 컴프리헨션 내부에서 언패킹 연산자를 컨테이너 이터러블에 대한 플래트닝(flattening) 연산자로 허용했습니다.
예시:
```python
>>> ranges = [range(i) for i in range(5)]
>>> [*item for item in ranges]
[0, 0, 1, 0, 1, 2, 0, 1, 2, 3]
>>> {*item for item in ranges}
{0, 1, 2, 3}
```
이는 가독성에 대한 강한 우려와 미약한 지지를 동시에 받았습니다. PEP의 논란이 적은 측면들에 불이익을 주지 않기 위해, 이 부분은 나머지 제안과 함께 받아들여지지 않았습니다.

`f(x for x in it)`와 같이 함수 호출 내에서 괄호 없는 컴프리헨션(unbracketed comprehensions)은 이미 유효합니다. 이는 다음과 같이 확장될 수 있었습니다.
```python
f(*x for x in it) == f((*x for x in it))
f(**x for x in it) == f({**x for x in it})
```
그러나 이것이 최선의 동작인지, 아니면 `f` 호출의 인수로 언패킹되어야 하는지는 명확하지 않았습니다. 이는 혼란스러울 가능성이 높고 유용성이 매우 미미하므로 이 PEP에는 포함되지 않았습니다. 대신, 이들은 `SyntaxError`를 발생시키며, 명시적인 괄호가 있는 컴프리헨션을 대신 사용해야 합니다.

### 승인 (Approval)

이 PEP는 2015년 2월 25일 Guido van Rossum에 의해 승인되었습니다.

### 구현 (Implementation)

Python 3.5를 위한 구현은 버그 트래커의 Issue 2292에서 찾을 수 있습니다. 이 구현은 현재 컴프리헨션 내 언패킹 지원을 포함하고 있으며, 이는 제거되어야 합니다.

### 참고 자료 (References)

*   PEP accepted, “PEP 448 review”, Guido van Rossum (https://mail.python.org/pipermail/python-dev/2015-February/138564.html)
*   Issue 2292, “Missing * -unpacking generalizations”, Thomas Wouters (https://github.com/python/cpython/issues/46545)
*   Discussion on Python-ideas list, “list / array comprehensions extension”, Alexander Heger (https://mail.python.org/pipermail/python-ideas/2011-December/013097.html)

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.