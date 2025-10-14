---
title: "[Rejected] PEP 281 - Loop Counter Iteration with range and xrange"
excerpt: "Python Enhancement Proposal 281: 'Loop Counter Iteration with range and xrange'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/281/
toc: true
toc_sticky: true
date: 2025-09-26 17:56:00+0900
last_modified_at: 2025-09-26 17:56:00+0900
published: true
---
> **원문 링크:** [PEP 281 - Loop Counter Iteration with range and xrange](https://peps.python.org/pep-0281/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 11-Feb-2002

## PEP 281 – `range` 및 `xrange`를 이용한 루프 카운터 반복 (Loop Counter Iteration with range and xrange)

**작성자:** Magnus Lie Hetland <magnus at hetland.org>
**상태:** Rejected (거부됨)
**유형:** Standards Track
**생성일:** 2002년 2월 11일
**Python 버전:** 2.3
**이력:** (내용 없음)

---

### 개요 (Abstract)

이 PEP는 `for-loop`에서 루프 카운터(loop counter)를 노출하는 또 다른 방법을 제안합니다. 기본적으로 PEP 212의 `indices()` 함수의 기능을 기존의 `range()` 및 `xrange()` 함수에 포함시키자는 제안입니다.

### 선언 (Pronouncement)

PEP 279의 `enumerate()` 함수에 대한 코멘트에서, 이 PEP의 작성자는 "PEP 281을 쓸모없게 만드는 것을 기쁘게 생각한다"고 언급했습니다. 이후 PEP 279는 Python 2.3에 채택되었습니다.

2005년 6월 17일, BDFL(Benevolent Dictator For Life, 귀도 반 로섬)은 이 PEP가 쓸모없어졌다는 것에 동의하며 이 PEP를 공식적으로 거부했습니다. 기록을 위해, 그는 몇 가지 예시가 다소 어색해 보인다고 언급했습니다.

```python
>>> range(range(5), range(10), range(2))
[5, 7, 9]
```

### 동기 (Motivation)

시퀀스의 인덱스(indices)를 반복(loop)하는 것은 종종 필요한 작업입니다. PEP 212는 이를 수행하는 여러 방법을 설명하며, `indices`라는 내장 함수를 추가하는 것을 포함합니다. 이 함수는 개념적으로 다음과 같이 정의됩니다.

```python
def indices(sequence):
    return range(len(sequence))
```

기존 내장 함수에 기능을 추가하는 것이 새로운 내장 함수를 추가하는 것보다 덜 침해적일 수 있다는 가정하에, 이 PEP는 이 기능을 기존의 `range()` 및 `xrange()` 함수에 추가할 것을 제안합니다.

### 명세 (Specification)

내장 함수 `range()` 및 `xrange()`의 세 가지 인자(start, stop, step) 모두 길이를 가지는 객체(즉, `__len__` 메서드를 구현하는 객체)가 허용되도록 제안됩니다. 만약 인자가 정수로 해석될 수 없다면(즉, `__int__` 메서드가 없다면), 대신 해당 인자의 길이가 사용됩니다.

**예시:**

```python
>>> range(range(10)) # range(10)의 길이는 10이므로, range(10)과 동일
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> range(range(5), range(10)) # range(5)의 길이는 5, range(10)의 길이는 10이므로, range(5, 10)과 동일
[5, 6, 7, 8, 9]
>>> range(range(5), range(10), range(2)) # range(5)의 길이는 5, range(10)의 길이는 10, range(2)의 길이는 2이므로, range(5, 10, 2)와 동일
[5, 7, 9]
>>> list(xrange(range(10)))
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
>>> list(xrange(xrange(10)))
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 파일의 줄 번호 매기기:
lines = file.readlines()
for num in range(lines): # 여기서 lines의 길이(len(lines))가 사용됨
    print num, lines[num]
```


### 대안 (Alternatives)

위 명세에 대한 자연스러운 대안은 `xrange()`가 인자들을 '게으른(lazy)' 방식으로 접근하도록 허용하는 것입니다. 따라서 명시적으로 길이를 사용하는 대신, `xrange`는 `stop` 인자의 각 요소에 대해 끝에 도달할 때까지 하나의 인덱스를 반환할 수 있습니다. 유사한 게으른 처리는 `start` 및 `step` 인자에는 별 의미가 없습니다. 왜냐하면 반복을 시작하기 전에 이들의 길이를 계산해야 하기 때문입니다. (실제로 `step` 인자의 길이는 두 번째 요소가 반환될 때까지 필요하지 않습니다.)

`stop` 인자만 사용하고, `stop`이 iterable이라고 가정하는 의사(pseudo) 구현은 다음과 같습니다.

```python
def xrange(stop):
    i = 0
    for x in stop:
        yield i
        i += 1
```

`int()`를 사용할지 아니면 게으른 반복을 사용할지 테스트하는 것은 `__iter__` 속성을 확인하여 수행할 수 있습니다. (이 예시는 제너레이터(generator)의 존재를 가정하지만, 일반적인 이터레이터(iterator) 객체로 쉽게 구현될 수 있습니다.)

이 기능이 진정으로 유용한지에 대해서는 의문이 있을 수 있습니다. 왜냐하면 `for` 루프 내에서 인덱싱을 통해 이터러블(iterable) 객체의 요소에 접근할 수 없기 때문입니다.

**예시:**

```python
# 파일의 줄 번호 출력:
for num in range(file): # 여기서 file 객체의 길이가 사용되지만, file의 실제 내용은 접근 불가
    print num # 줄 자체는 접근할 수 없음
```


(이 문제를 다루기 위한) 더 논쟁적인 대안은 시퀀스가 제공될 때 `range()`가 PEP 212의 `irange()` 함수처럼 동작하도록 하는 것입니다.

**예시:**

```python
>>> range(5)
[0, 1, 2, 3, 4]
>>> range('abcde') # 시퀀스가 제공되면 (인덱스, 값) 쌍을 반환하는 PEP 212의 irange와 유사
[(0, 'a'), (1, 'b'), (2, 'c'), (3, 'd'), (4, 'e')]
```


### 하위 호환성 (Backwards Compatibility)

이 제안은 `__int__`와 `__len__`을 모두 구현하는 인자(또는 `xrange`의 게으른 반복의 경우 `__iter__`)가 사용될 경우 하위 호환성(backwards incompatibilities) 문제를 야기할 수 있습니다. 작성자는 이것이 중대한 문제는 아니라고 생각합니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.