---
title: "[Final] PEP 201 - Lockstep Iteration"
excerpt: "Python Enhancement Proposal 201: 'Lockstep Iteration'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/201/
toc: true
toc_sticky: true
date: 2025-09-26 16:10:52+0900
last_modified_at: 2025-09-26 16:10:52+0900
published: true
---
> **원문 링크:** [PEP 201 - Lockstep Iteration](https://peps.python.org/pep-0201/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 13-Jul-2000


# PEP 201 – Lockstep Iteration

*   **작성자** : Barry Warsaw <barry at python.org>
*   **상태** : Final
*   **유형** : Standards Track
*   **생성일** : 2000년 7월 13일
*   **Python 버전** : 2.0
*   **게시 이력** : 2000년 7월 27일

## 서론 (Introduction)

이 PEP는 'lockstep iteration' 제안을 설명합니다. 이 문서는 Python 2.0에 도입될 예정이었던 이 기능의 상태와 소유권을 추적합니다. 여기에는 기능에 대한 설명과 이 기능을 지원하는 데 필요한 변경 사항에 대한 개요가 포함되어 있습니다. 이 PEP는 메일링 리스트 포럼에서 진행된 논의를 요약하며, 필요에 따라 추가 정보에 대한 URL을 제공합니다. 이 파일의 CVS 리비전 히스토리는 확정적인 역사적 기록을 담고 있습니다.

## 동기 (Motivation)

Python의 표준 `for` 루프는 시퀀스가 소진될 때까지 시퀀스의 모든 요소를 반복합니다. 그러나 `for` 루프는 단일 시퀀스만 반복하며, 종종 여러 시퀀스를 'lock-step' 방식으로, 즉 루프의 i번째 반복에서 각 시퀀스의 i번째 요소를 포함하는 객체를 반환하는 방식으로 반복하는 것이 바람직합니다.

이를 달성하기 위해 사용되는 일반적인 관용구(idiom)는 직관적이지 않습니다. 이 PEP는 `zip`이라는 새로운 내장 함수를 도입하여 이러한 유형의 반복을 수행하는 표준적인 방법을 제안합니다.

`zip()`의 주요 동기는 lock-step iteration에서 비롯되지만, `zip()`을 내장 함수로 구현함으로써 `for` 루프 이외의 다른 컨텍스트에서도 추가적인 유용성을 가집니다.

## Lockstep For-Loops (Lockstep For-루프)

Lockstep `for` 루프는 둘 이상의 시퀀스에 대해 중첩되지 않은 반복을 수행하며, 루프를 한 번 통과할 때마다 각 시퀀스에서 하나의 요소를 가져와 대상을 구성합니다. 이 동작은 `map()` 내장 함수를 사용하여 Python에서 이미 달성할 수 있습니다:

```python
>>> a = (1, 2, 3)
>>> b = (4, 5, 6)
>>> for i in map(None, a, b):
...     print i
...
(1, 4)
(2, 5)
(3, 6)
>>> map(None, a, b)
[(1, 4), (2, 5), (3, 6)]
```

`for` 루프는 단순히 이 리스트를 정상적으로 반복합니다.

`map()` 관용구는 Python에서 흔히 사용되지만, 다음과 같은 몇 가지 단점이 있습니다:

*   함수형 프로그래밍 배경이 없는 프로그래머에게는 불분명합니다.
*   첫 번째 인수로 `None`을 사용하는 "마법" 같은 방식이 불분명합니다.
*   리스트의 길이가 같지 않을 때 임의적이고 종종 의도치 않은 유연하지 못한 의미를 가집니다. 짧은 시퀀스는 `None`으로 채워집니다:

    ```python
    >>> c = (4, 5, 6, 7)
    >>> map(None, a, c)
    [(1, 4), (2, 5), (3, 6), (None, 7)]
    ```

이러한 이유로 Python 2.0 베타 기간 동안 lockstep `for` 루프에 대한 구문 지원을 위한 여러 제안이 나왔습니다. 다음은 두 가지 제안입니다:

```python
for x in seq1, y in seq2: # stuff

for x, y in seq1, seq2: # stuff
```

이러한 형식 중 어느 것도 작동하지 않을 것입니다. 왜냐하면 둘 다 Python에서 이미 어떤 의미를 가지며, 그 의미를 변경하는 것은 기존 코드를 손상시키기 때문입니다. 새로운 구문에 대한 다른 모든 제안들도 동일한 문제를 겪었거나, 'list comprehensions'이라는 다른 제안된 기능(PEP 202 참조)과 충돌했습니다.

## 제안된 해결책 (The Proposed Solution)

제안된 해결책은 `__builtin__` 모듈에서 사용할 수 있는 새로운 내장 시퀀스 제너레이터(sequence generator) 함수를 도입하는 것입니다. 이 함수는 `zip`이라고 불리며 다음 서명을 가집니다:

```python
zip(seqa, [seqb, [...]])
```

`zip()`은 하나 이상의 시퀀스를 받아 `map(None, ...)`이 길이가 같은 시퀀스에서 하는 것처럼 요소들을 함께 엮습니다. 엮는 작업은 가장 짧은 시퀀스가 소진될 때 중지됩니다.

## 반환 값 (Return Value)

`zip()`은 `map()`이 하는 방식과 동일하게 실제 Python 리스트를 반환합니다.

## 예시 (Examples)

아래 참조 구현(Reference Implementation)을 기반으로 한 몇 가지 예시입니다:

```python
>>> a = (1, 2, 3, 4)
>>> b = (5, 6, 7, 8)
>>> c = (9, 10, 11)
>>> d = (12, 13)
>>> zip(a, b)
[(1, 5), (2, 6), (3, 7), (4, 8)]
>>> zip(a, d)
[(1, 12), (2, 13)]
>>> zip(a, b, c, d)
[(1, 5, 9, 12), (2, 6, 10, 13)]
```

시퀀스 길이가 같을 때 `zip()`은 역변환(reversible)이 가능합니다:

```python
>>> a = (1, 2, 3)
>>> b = (4, 5, 6)
>>> x = zip(a, b)
>>> y = zip(*x) # alternatively, apply(zip, x)
>>> z = zip(*y) # alternatively, apply(zip, y)
>>> x
[(1, 4), (2, 5), (3, 6)]
>>> y
[(1, 2, 3), (4, 5, 6)]
>>> z
[(1, 4), (2, 5), (3, 6)]
>>> x == z
True
```

시퀀스 길이가 모두 같지 않을 때는 이러한 방식으로 `zip`을 역변환할 수 없습니다.

## 참조 구현 (Reference Implementation)

다음은 `zip()` 내장 함수의 Python 참조 구현입니다. 최종 승인 후에는 C 구현으로 대체될 것입니다:

```python
def zip(*args):
    if not args:
        raise TypeError('zip() expects one or more sequence arguments')
    ret = []
    i = 0
    try:
        while 1:
            item = []
            for s in args:
                item.append(s[i])
            ret.append(tuple(item))
            i = i + 1
    except IndexError:
        return ret
```

## BDFL의 선언 (BDFL Pronouncements)

**참고** : BDFL은 Python의 자비로운 종신 독재자(Benevolent Dictator For Life)인 Guido van Rossum을 지칭합니다.

*   **함수 이름** : 이 PEP의 이전 버전에는 `zip()`에 대한 20개 이상의 대체 이름이 나열된 미해결 문제가 포함되어 있었습니다. 압도적으로 더 나은 선택지가 없는 상황에서, BDFL은 Haskell에서 유래했기 때문에 `zip()`을 강력히 선호했습니다. `zip()`은 내장 함수여야 합니다.
*   **선택적 패딩(Optional padding)** : 이 PEP의 이전 버전은 인자 시퀀스의 길이가 같지 않을 때 사용될 선택적 `pad` 키워드 인자를 제안했습니다. 이는 `map(None, ...)`의 의미와 유사하지만, 사용자가 `pad` 객체를 지정할 수 있도록 하는 것이었습니다. 이는 KISS (Keep It Simple, Stupid) 원칙에 따라 가장 짧은 시퀀스에 항상 잘라내는 것을 선호하여 BDFL에 의해 거부되었습니다.
*   **지연 평가(Lazy evaluation)** : 이 PEP의 이전 버전은 `zip()`이 `__getitem__()` 프로토콜을 사용하여 지연 평가를 수행하는 내장 객체를 반환할 것을 제안했습니다. 이는 실제 Python 리스트를 반환하는 것을 선호하여 BDFL에 의해 강력히 거부되었습니다. 미래에 지연 평가가 필요하다면, BDFL은 `xzip()` 함수를 추가할 것을 제안합니다.
*   **인자 없는 `zip()`** : BDFL은 `TypeError` 예외를 발생시키는 것을 강력히 선호했습니다.
*   **인자 하나를 가진 `zip()`** : BDFL은 이것이 1-튜플(1-tuple)의 리스트를 반환하는 것을 강력히 선호했습니다.
*   **내부 및 외부 컨테이너 제어(Inner and outer container control)** : 이 PEP의 이전 버전에는 일부 사람들이 원했던 기능, 즉 내부 및 외부 컨테이너 유형을 제어하는 기능에 대한 논의가 포함되어 있었습니다. 간소화된 API와 구현을 고려할 때, 이 기능은 거부되었습니다.

## `zip()`의 후속 변경 (Subsequent Change to zip())

Python 2.4에서 인자 없는 `zip()`은 `TypeError` 예외를 발생시키는 대신 빈 리스트를 반환하도록 수정되었습니다. 원래 동작은 인자의 부재가 프로그래밍 오류를 나타낸다고 생각되었기 때문입니다. 그러나 이는 `*` 연산자를 사용하여 가변 길이 인자 리스트를 언팩(unpack)하는 `zip()`의 사용을 예상하지 못했습니다. 예를 들어, `zip`의 역함수는 `unzip = lambda s: zip(*s)`와 같이 정의될 수 있습니다. 이러한 변환은 행렬 전치(matrix transpose)나 테이블의 행/열 교환에도 사용되며, 특히 레코드를 행으로, 필드를 열로 하는 데이터 파일을 읽을 때 유용합니다.

예를 들어, 다음 코드는:

```python
date, rain, high, low = zip(*csv.reader(file("weather.csv")))
```

각 필드가 개별 튜플로 수집되어 직접적인 반복 및 요약이 가능하도록 열 기반 데이터를 재정렬합니다. `zip(*[])`이 예외가 아닌 허용 가능한 경우로 처리될 경우 `zip(*args)`를 사용하는 것이 더 쉽게 코딩됩니다. 이 가능성을 보고, BDFL은 (약간의 망설임과 함께) Python 2.4에서 동작을 변경하는 것에 동의했습니다.

## 기타 변경 사항 (Other Changes)

위에서 논의된 `xzip()` 함수는 Python 2.3의 `itertools` 모듈에 `itertools.izip()`으로 구현되었습니다. 이 함수는 지연 동작(lazy behavior)을 제공하여, 각 반복에서 단일 요소를 소비하고 단일 튜플을 생성합니다. "Just-in-time" 방식은 메모리를 절약하고 리스트 기반 `zip()`보다 빠르게 실행됩니다. `itertools` 모듈은 또한 `itertools.repeat()`과 `itertools.chain()`을 추가했습니다. 이러한 도구들은 함께 사용하여 시퀀스를 `None`으로 채울 수 있습니다 (`map(None, seqn)`의 동작과 일치하도록):

```python
zip(firstseq, chain(secondseq, repeat(None)))
```

## 참고 자료 (References)

*   http://docs.python.org/reference/compound_stmts.html#for
*   http://www.haskell.org/onlinereport/standard-prelude.html#$vzip
*   Greg Wilson이 일부 CS 대학원생에게 제안된 구문에 대해 설문 조사: http://www.python.org/pipermail/python-dev/2000-July/013139.html

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.