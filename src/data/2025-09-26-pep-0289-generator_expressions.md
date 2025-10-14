---
title: "[Final] PEP 289 - Generator Expressions"
excerpt: "Python Enhancement Proposal 289: 'Generator Expressions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/289/
toc: true
toc_sticky: true
date: 2025-09-26 17:59:59+0900
last_modified_at: 2025-09-26 17:59:59+0900
published: true
---
> **원문 링크:** [PEP 289 - Generator Expressions](https://peps.python.org/pep-0289/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-Jan-2002

## PEP 289 – 제너레이터 표현식 (Generator Expressions)

### 개요 (Abstract)
이 PEP(Python Enhancement Proposal)는 `List Comprehension` (PEP 202)과 `Generator (제너레이터)` (PEP 255)의 고성능, 메모리 효율적인 일반화 형태인 `Generator Expression (제너레이터 표현식)`을 소개합니다.

### 도입 배경 (Rationale)
`List Comprehension`은 Python에서 그 유용성이 널리 입증되었습니다. 그러나 많은 경우에 전체 리스트를 메모리에 생성할 필요 없이 요소를 하나씩 순회하기만 하면 됩니다.

예를 들어, 다음 합계 코드는 메모리에 제곱값들의 전체 리스트를 생성한 다음 해당 값들을 순회하고, 더 이상 참조가 필요 없을 때 리스트를 삭제합니다:
```python
sum([x*x for x in range(10)])
```
대신 `Generator Expression`을 사용하면 메모리를 절약할 수 있습니다:
```python
sum(x*x for x in range(10))
```
컨테이너 객체의 생성자에도 비슷한 이점이 적용됩니다:
```python
s = set(word for line in page for word in line.split())
d = dict( (k, func(k)) for k in keylist)
```
`Generator Expression`은 `sum()`, `min()`, `max()`처럼 반복 가능한 입력을 단일 값으로 줄이는 함수와 함께 특히 유용합니다:
```python
max(len(line) for line in file if line.strip())
```
`Generator Expression`은 `lambda`로 코딩된 일부 함수형(functionals) 예제도 해결합니다:
```python
reduce(lambda s, a: s + a.myattr, data, 0)
reduce(lambda s, a: s + a[3], data, 0)
```
위 코드는 다음과 같이 간소화됩니다:
```python
sum(a.myattr for a in data)
sum(a[3] for a in data)
```
`List Comprehension`은 `filter()` 및 `map()`의 필요성을 크게 줄였습니다. 마찬가지로, `Generator Expression`은 `itertools.ifilter()` 및 `itertools.imap()`의 필요성을 최소화할 것으로 예상됩니다. 반대로, 다른 `itertools`의 유틸리티는 `Generator Expression`에 의해 향상될 것입니다:
```python
dotproduct = sum(x*y for x,y in itertools.izip(x_vector, y_vector))
```
`List Comprehension`과 유사한 구문을 가지므로, 애플리케이션을 확장할 때 기존 코드를 `Generator Expression`으로 쉽게 변환할 수 있습니다.

초기 테스트에서는 `Generator`가 `List Comprehension`보다 상당한 성능 우위를 가졌지만, Py2.4에서 `List Comprehension`이 고도로 최적화되면서 이제는 작거나 중간 크기의 데이터 세트에서 성능이 거의 비슷합니다. 데이터 볼륨이 커질수록 `Generator Expression`은 캐시 메모리를 소모하지 않고 Python이 반복 사이에 객체를 재사용할 수 있도록 허용하므로 더 나은 성능을 보이는 경향이 있습니다.

### BDFL (Benevolent Dictator For Life)의 결정 (BDFL Pronouncements)
이 PEP는 Py2.4에 대해 승인(ACCEPTED)되었습니다.

### 세부 사항 (The Details)

`Generator Expression`의 의미론은 익명(anonymous) `Generator Function`을 생성하고 호출하는 것과 동일합니다. 예를 들어:
```python
g = (x**2 for x in range(10))
print g.next()
```
위 코드는 다음 코드를 생성하고 호출하는 것과 같습니다:
```python
def __gen(exp):
    for x in exp:
        yield x**2
g = __gen(iter(range(10)))
print g.next()
```
가장 바깥쪽 `for-expression`만 즉시 평가되며, 다른 표현식들은 `Generator`가 실행될 때까지 지연됩니다:
```python
g = (tgtexp for var1 in exp1 if exp2 for var2 in exp3 if exp4)
```
이는 다음 코드와 동일합니다:
```python
def __gen(bound_exp):
    for var1 in bound_exp:
        if exp2:
            for var2 in exp3:
                if exp4:
                    yield tgtexp
g = __gen(iter(exp1))
del __gen
```

구문상 `Generator Expression`은 항상 한 쌍의 괄호 안에 직접 있어야 하며 양쪽에 쉼표를 가질 수 없습니다.

다음과 같이 작성할 수 있습니다:
```python
sum(x**2 for x in range(10))
```
하지만 다음의 경우에는 추가 괄호를 사용해야 합니다:
```python
reduce(operator.add, (x**2 for x in range(10)))
```
그리고:
```python
g = (x**2 for x in range(10))
```
즉, 함수 호출에 단일 위치 인자(single positional argument)가 있는 경우, 추가 괄호 없이 `Generator Expression`이 될 수 있지만, 다른 모든 경우에는 괄호로 묶어야 합니다.

`for` 루프 변수(단순 변수 또는 단순 변수의 튜플인 경우)는 주변 함수에 노출되지 않습니다. 이는 구현을 용이하게 하고 일반적인 사용 사례를 더 안정적으로 만듭니다. Python의 일부 미래 버전에서는 `List Comprehension`도 유도 변수(induction variable)를 주변 코드에서 숨길 것입니다(그리고 Py2.4에서는 유도 변수에 접근하는 코드에 대해 경고가 발행됩니다).

예를 들어:
```python
x = "hello"
y = list(x for x in "abc")
print x # "c"가 아닌 "hello"를 출력합니다.
```
`List Comprehension`은 변경되지 않습니다. 예를 들어:
```python
[x for x in S] # 이것은 List Comprehension입니다.
[(x for x in S)] # 이것은 하나의 Generator Expression을 포함하는 리스트입니다.
```
불행히도 현재 약간의 구문적 차이가 있습니다. 다음 표현식은 유효합니다:
```python
[x for x in 1, 2, 3] # 이는 [x for x in (1, 2, 3)]을 의미합니다.
```
그러나 `Generator Expression`은 이전 버전을 허용하지 않습니다:
```python
(x for x in 1, 2, 3) # 이는 유효하지 않습니다.
```
이전 `List Comprehension` 구문은 Python 3.0에서 유효하지 않게 되며, Python 2.4 이상에서는 더 이상 사용되지 않도록 경고됩니다.

`List Comprehension`은 또한 루프 변수를 주변 스코프(scope)로 "누출(leak)"시킵니다. 이것 또한 Python 3.0에서 변경될 것이며, Python 3.0의 `List Comprehension`의 의미론적 정의는 `list(<generator expression>)`과 동일하게 됩니다. Python 2.4 이상에서는 `List Comprehension`의 루프 변수가 즉시 주변 스코프에서 사용되는 변수와 이름이 같을 경우 사용 중단 경고(deprecation warning)를 발행해야 합니다.

### 조기 바인딩 vs. 지연 바인딩 (Early Binding versus Late Binding)
많은 논의 끝에 첫 번째(가장 바깥쪽) `for-expression`은 즉시 평가되고 나머지 표현식은 `Generator`가 실행될 때 평가되도록 결정되었습니다.

첫 번째 표현식을 바인딩하는 이유에 대해 Guido는 다음과 같이 설명했습니다:
"sum(x for x in foo())를 고려해봅시다. foo()에 예외를 발생시키는 버그가 있고, sum()에 인자를 순회하기 전에 예외를 발생시키는 버그가 있다고 가정해봅시다. 어떤 예외를 보게 될 것이라고 예상하시겠습니까? 저는 sum()의 예외보다 foo()의 예외가 발생하는 것을 기대할 것입니다. 왜냐하면 foo() 호출은 sum()의 인자의 일부이고, 저는 함수가 호출되기 전에 인자가 처리될 것이라고 예상하기 때문입니다. 반면에 sum()과 foo()는 버그가 없지만 bar()가 예외를 발생시키는 sum(bar(x) for x in foo())에서는 sum()이 순회를 시작할 때까지 bar() 호출을 지연할 수밖에 없습니다. 이것은 `Generator`의 계약의 일부입니다. (그들은 `next()` 메서드가 처음 호출될 때까지 아무것도 하지 않습니다.)"

`Generator`가 정의될 때 모든 자유 변수를 바인딩하기 위한 다양한 사용 사례가 제안되었습니다. 그리고 일부 제안자들은 결과 표현식이 즉시 바인딩되면 이해하고 디버그하기 더 쉬울 것이라고 생각했습니다.

그러나 Python은 `lambda` 표현식에 지연 바인딩(late binding) 접근 방식을 취하며 자동 조기 바인딩(automatic, early binding)에 대한 선례가 없습니다. 새로운 패러다임을 도입하는 것은 불필요하게 복잡성을 증가시킬 것이라고 판단되었습니다.

많은 가능성을 탐색한 후, 바인딩 문제가 이해하기 어렵고 사용자는 인수를 즉시 소비하는 함수 내에서 `Generator Expression`을 사용하도록 강력히 권장되어야 한다는 합의가 나왔습니다. 더 복잡한 애플리케이션의 경우, 스코프, 수명(lifetime), 바인딩에 대해 명확하다는 점에서 완전한 `Generator` 정의가 항상 우수합니다.

### 감소 함수 (Reduction Functions)
`Generator Expression`의 유용성은 `sum()`, `min()`, `max()`와 같은 감소 함수와 결합될 때 크게 향상됩니다. Python 2.4의 `heapq` 모듈에는 `nlargest()`와 `nsmallest()`라는 두 가지 새로운 감소 함수가 포함되어 있습니다. 둘 다 `Generator Expression`과 잘 작동하며 한 번에 n개 이상의 항목을 메모리에 유지하지 않습니다.

### 감사 (Acknowledgements)
Raymond Hettinger는 2002년 1월에 "Generator Comprehensions" 아이디어를 처음 제안했습니다. Peter Norvig는 "Accumulation Displays" 제안에서 이 논의를 다시 시작했습니다. Alex Martelli는 `Generator Expression`의 성능 이점을 입증하는 중요한 측정값을 제공했습니다. 그는 또한 `Generator Expression`이 매우 바람직한 기능이라는 강력한 주장을 제시했습니다. Phillip Eby는 "iterator expressions"를 이름으로 제안했습니다. 이후 Tim Peters가 "generator expressions"라는 이름을 제안했습니다. Armin Rigo, Tim Peters, Guido van Rossum, Samuele Pedroni, Hye-Shik Chang 및 Raymond Hettinger는 조기 바인딩 대 지연 바인딩을 둘러싼 문제들을 정리했습니다. Jiwon Seo는 최종 버전을 포함하여 제안의 다양한 버전을 단독으로 구현했습니다. 진행되는 동안 Hye-Shik Chang와 Raymond Hettinger의 정기적인 코드 검토가 있었습니다. Guido van Rossum은 Armin Rigo의 의견과 뉴스그룹 토론 후 주요 설계 결정을 내렸습니다. Raymond Hettinger는 테스트 스위트, 문서, 튜토리얼 및 예제를 제공했습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.