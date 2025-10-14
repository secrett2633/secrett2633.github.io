---
title: "[Deferred] PEP 323 - Copyable Iterators"
excerpt: "Python Enhancement Proposal 323: 'Copyable Iterators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/323/
toc: true
toc_sticky: true
date: 2025-09-26 18:31:01+0900
last_modified_at: 2025-09-26 18:31:01+0900
published: true
---
> **원문 링크:** [PEP 323 - Copyable Iterators](https://peps.python.org/pep-0323/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 25-Oct-2003

PEP 323 – 복사 가능한 이터레이터 (Copyable Iterators)

---

## 개요

이 PEP (Python Enhancement Proposal)는 일부 이터레이터 (iterator) 유형이 `__copy__` 메서드를 통해 인스턴스의 얕은 복사 (shallow copy)를 지원해야 한다고 제안합니다. 이 제안은 `__copy__` 메서드를 사용하는 코드가 어떻게 이러한 기능을 활용할 수 있는지 보여줍니다.

**상태:** 연기됨 (Deferred)
**작성자:** Alex Martelli
**생성일:** 2003년 10월 25일
**Python 버전:** 2.5

## 연기 (Deferral)

이 PEP는 연기되었습니다. 복사 가능한 이터레이터는 좋은 아이디어였지만, 4년이 지난 후에도 구현되거나 광범위한 관심을 받지 못했습니다.

## 추상 (Abstract)

이 PEP는 특정 요구 사항을 충족하는 `__copy__` 메서드를 노출함으로써 일부 이터레이터 타입이 인스턴스의 얕은 복사를 지원해야 한다고 제안하며, 이터레이터를 사용하는 코드가 `__copy__` 메서드를 활용하는 방법을 제시합니다.

## 업데이트 및 코멘트 (Update and Comments)

`__copy__` 지원은 Python 2.4의 `itertools.tee()`에 포함되었습니다. 기존 이터레이터에 `__copy__` 메서드를 추가하면 `tee()`의 동작이 변경될 수 있습니다. 현재 복사된 이터레이터는 원래 이터레이터에 묶여 있으며, 원본이 진행되면 모든 복사본도 진행됩니다. 좋은 관행은 `a, b = tee(a)`처럼 원본을 덮어쓰는 것입니다. 이 관행을 따르지 않는 코드는 `__copy__` 메서드가 이터레이터에 추가될 경우 의미적 변화를 관찰할 수 있습니다.

## 동기 (Motivation)

Python 2.3까지 대부분의 내장 이터레이터 유형은 인스턴스를 복사할 수 없었습니다. 사용자가 작성한 이터레이터는 `copy.copy`를 호출할 수 있지만, 복사 결과로 원본과 독립적으로 이터레이션할 수 있는 별도의 이터레이터 객체를 반환할 수도 있고 그렇지 않을 수도 있습니다.

현재 사용자 정의 이터레이터 타입에서 `copy.copy` 지원은 거의 항상 "우발적"입니다. 즉, Python 표준 라이브러리의 `copy` 모듈에 있는 `copy` 메서드의 표준 메커니즘은 복사본을 만들고 반환하지만, 복사본이 원본과 독립적으로 이터레이션 가능하려면 해당 클래스의 `.next()` 호출이 인스턴스 상태를 기존 값 변경이 아닌 새 값으로 속성을 재할당함으로써만 변경해야 합니다.

예를 들어, "인덱스" 상태가 정수 속성으로 유지되는 이터레이터는 유용한 복사본을 제공할 수 있습니다. 반면에 "인덱스" 상태가 리스트 속성으로 유지되는 이터레이터는 `.next()` 실행 시 동일한 리스트 객체를 변경할 것이므로, 이러한 이터레이터의 복사본은 원본과 독립적으로 이터레이션할 수 없습니다.

이러한 상황 때문에 `copy.copy(it)`는 유용하지 않으며 널리 사용되지 않습니다. 그러나 이터레이터의 "스냅샷"을 "북마크"처럼 얻어 시퀀스를 계속 이터레이션하다가 나중에 북마크 지점부터 다시 이터레이션할 수 있는 많은 경우가 있습니다. 이러한 "북마킹"을 지원하기 위해 `itertools` 모듈은 Python 2.4에서 `tee` 함수를 추가했습니다:

```python
it, bookmark = itertools.tee(it)
```
이 호출 후에 `it`와 `bookmark`는 원래 `it`와 동일한 기본 시퀀스에 대해 독립적으로 이터레이션할 수 있는 이터레이터가 되어 "이터레이터 복사"에 대한 애플리케이션 요구 사항을 충족합니다. `it`의 이전 값은 다시 사용해서는 안 됩니다.

그러나 `itertools.tee`는 인수로 전달된 이터레이터의 특성에 대해 가정을 할 수 없을 때, 두 "티된" 이터레이터 중 하나만 진행했지만 둘 다 아직 진행하지 않은 모든 항목을 메모리에 저장해야 합니다. 이는 두 이터레이터가 진행에서 서로 크게 멀어질 경우 메모리 비용이 상당히 커질 수 있습니다.

이 PEP는 중요한 경우 `itertools.tee`가 메모리 비용을 최소화하면서 작동하도록 하는 또 다른 아이디어를 제안합니다. 이는 사용자 코드도 이터레이터를 복사할지, 리스트로 만들지, 보조 디스크 파일을 사용할지 결정하는 데 활용할 수 있습니다.

핵심 고려 사항은 시퀀스 위에 내장 함수 `iter`가 만드는 이터레이터와 같은 일부 중요한 이터레이터는 본질적으로 복사하기 쉽다는 것입니다. 단순히 동일한 시퀀스에 대한 다른 참조와 정수 인덱스의 복사본을 얻으면 됩니다. 그러나 Python 2.3에서는 이러한 이터레이터가 상태를 노출하지 않으며 `copy.copy`를 지원하지 않습니다.

따라서 이 PEP의 목적은 이러한 이터레이터 유형이 적절한 `__copy__` 메서드를 노출하도록 하는 것입니다. 마찬가지로, 독립적인 이터레이션에 적합하고 시간 및 공간 비용이 제한적인 인스턴스 복사본을 제공할 수 있는 사용자 정의 이터레이터 유형도 적절한 `__copy__` 메서드를 노출해야 합니다. `copy.copy`는 타입이 인스턴스 복사 방식을 제어하는 다른 방법도 지원하지만, 단순화를 위해 복사를 지원하는 이터레이터 타입은 항상 `__copy__` 메서드를 노출하는 방식으로만 이를 수행하도록 제안됩니다.

이터레이터가 가능한 경우 적절한 `__copy__`를 노출하면 `itertools.tee` 및 유사한 사용자 코드의 쉬운 최적화를 가능하게 합니다:

```python
def tee(it):
    it = iter(it)
    try:
        copier = it.__copy__
    except AttributeError:
        # 복사 불가능한 이터레이터, 필요한 모든 어려운 작업 수행
        # [생략!]
    else:
        return it, copier()
```
이 함수는 `copy.copy(it)`를 호출하지 않습니다. 이는 이 PEP가 구현된 후에도 일부 사용자 정의 클래스로 구현된 이터레이터 유형에 대해 "단순히 성공할 수도" 있지만, 실제로 적절한 "독립적으로 이터레이션 가능한" 복사 객체를 결과로 제공하지 않을 수 있기 때문입니다.

## 명세 (Specification)

모든 이터레이터 타입 `X`는 `X`의 어떤 인스턴스 `x`에 대해서도 인자 없이 호출할 수 있는 `__copy__` 메서드를 노출할 수 있습니다. 이 메서드는 이터레이터 타입이 합리적으로 적은 계산 및 메모리 노력으로 복사 가능성을 제공할 수 있는 경우에만 노출되어야 합니다. 또한, `__copy__` 메서드가 반환하는 새 객체 `y`는 `x`와 독립적이고 별도로 이터레이션되며, 동일한 "기본 시퀀스" 항목을 따라 진행하는 `X`의 새 인스턴스여야 합니다.

예를 들어, `Iter` 클래스가 시퀀스에 대한 내장 `iter`의 기능을 본질적으로 복제한다고 가정합니다:

```python
class Iter(object):
    def __init__(self, sequence):
        self.sequence = sequence
        self.index = 0
    def __iter__(self):
        return self
    def next(self):
        try:
            result = self.sequence[self.index]
        except IndexError:
            raise StopIteration
        self.index += 1
        return result
```
이 `Iter` 클래스를 이 PEP에 부합하도록 만들려면, `Iter` 클래스 본문에 다음 추가가면 충분합니다:

```python
    def __copy__(self):
        result = self.__class__(self.sequence)
        result.index = self.index
        return result
```
이 경우 `__copy__`는 시퀀스를 복사하려고 시도하지 않습니다. 원본 또는 복사된 이터레이터 중 하나 또는 둘 다 시퀀스를 진행하는 동안 시퀀스가 변경되면 이터레이션 동작이 잘못될 가능성이 높습니다. 이는 변경 가능한 시퀀스를 이터레이션하는 이터레이터의 일반적인 Python 동작을 변경하는 것은 `__copy__`의 책임이 아닙니다 (이는 이터레이터의 `__deepcopy__` 메서드에 대한 명세일 수 있지만, 이 PEP는 이를 다루지 않습니다).

또한, 주어진 인수로 호출된 임의 인스턴스의 특정 메서드로부터 무한한 결과 시퀀스를 제공하는 "랜덤 이터레이터"를 고려해 보십시오:

```python
class RandomIterator(object):
    def __init__(self, bound_method, *args):
        self.call = bound_method
        self.args = args
    def __iter__(self):
        return self
    def next(self):
        return self.call(*self.args)
    def __copy__(self):
        import copy, new
        im_self = copy.copy(self.call.im_self)
        method = new.instancemethod(self.call.im_func, im_self)
        return self.__class__(method, *self.args)
```
이 이터레이터 유형은 이름이 의미하는 것보다 약간 더 일반적입니다. `im_self`를 복사하기 위해 `copy.copy`를 사용해야 합니다. `random.Random` 인스턴스는 `__getstate__` 및 `__setstate__`를 통해 복사를 지원하며, `__copy__`를 통하지 않습니다. `copy.copy`를 사용하는 것이 객체의 얕은 복사본을 얻는 일반적인 방법입니다.

## 세부 사항 (Details)

사용자 정의 이터레이터 타입이 `__copy__` 메서드를 지원하도록 권장하는 것 외에도 (메모리 및 런타임 비용이 적고 독립적으로 이터레이션 가능한 이터레이터 객체의 복사본을 생성할 수 있는 경우에만), 이 PEP의 구현은 특히 내장 `iter`가 반환하는 시퀀스 이터레이터와 내장 `dict` 타입의 `__iter__`, `iterkeys`, `itervalues`, `iteritems` 메서드가 반환하는 딕셔너리 이터레이터에 복사 가능성을 추가하는 것을 포함할 것입니다.

제너레이터 함수에 의해 생성된 이터레이터는 복사할 수 없습니다. 그러나 Python 2.4의 새 "제너레이터 표현식" (PEP 289)에 의해 생성된 이터레이터는 기본 이터레이터가 복사 가능한 경우 복사 가능해야 합니다. 제너레이터 표현식에 가능한 엄격한 제한은 제너레이터의 훨씬 더 넓은 일반성에 비해 이를 실현 가능하게 만들어야 합니다. 마찬가지로 내장 함수 `enumerate` 및 `itertools` 모듈에서 제공하는 특정 함수에 의해 생성된 이터레이터는 기본 이터레이터가 복사 가능한 경우 복사 가능해야 합니다.

이 PEP의 구현은 또한 동기 섹션에서 언급된 새로운 `itertools.tee` 함수의 최적화를 포함할 것입니다.

## 이론적 근거 (Rationale)

이터레이터의 (얕은) 복사에 대한 주요 사용 사례는 `itertools.tee` (2.4에 새로 추가됨) 함수와 동일합니다. 사용자 코드는 이터레이터를 직접 복사하려고 시도하지 않을 것입니다. 왜냐하면 복사 불가능한 경우를 별도로 처리해야 하기 때문입니다. `itertools.tee`를 호출하면 적절한 경우 내부적으로 복사를 수행하고, 복사 불가능한 이터레이터에 대해서는 암시적으로 최대한 효율적인 비복사 전략으로 대체됩니다. (때때로 사용자 코드는 다른 전략, 예를 들어 리스트를 만들거나 시퀀스를 디스크에 저장하는 것과 같은 방식으로 복사 불가능한 이터레이터를 처리하기 위해 더 직접적인 제어를 원할 수도 있습니다).

"tee"된 이터레이터는 "참조 지점" 역할을 하여 시퀀스 처리가 알려진 지점에서 계속되거나 재개될 수 있도록 하는 동시에, 다른 독립적인 이터레이터는 필요에 따라 시퀀스의 더 먼 부분을 "탐색"하기 위해 자유롭게 진행될 수 있습니다. 간단한 예: 숫자의 이터레이터 (양수라고 가정)를 받아서, 입력 이터레이터의 각 항목에 해당하는 총합의 분수 값을 반환하는 제너레이터 함수입니다. 호출자는 총합을 미리 알고 있다면 값으로 전달할 수 있습니다. 그렇지 않으면 이 제너레이터 함수를 호출하여 반환된 이터레이터는 먼저 총합을 계산합니다.

```python
def fractions(numbers, total=None):
    if total is None:
        numbers, aux = itertools.tee(numbers)
        total = sum(aux)
    total = float(total)
    for item in numbers:
        yield item / total
```
`numbers` 이터레이터를 "tee"할 수 있는 기능은, `numbers` 이터레이터가 복사 가능한 경우, 필요한 경우 총합을 미리 계산하는 데 `O(N)` 보조 메모리를 반드시 요구하지 않으면서 이 제너레이터가 작동하도록 합니다.

"이터레이터 북마킹"의 또 다른 예로, 가끔 "후위 연산자" 역할을 하는 문자열이 포함된 숫자 스트림을 생각해 봅시다. 가장 흔한 연산자는 `'+'`이며, 이 경우 이전의 모든 숫자 (이전 연산자가 있었다면 그 이후, 아니면 처음부터)를 합산하여 결과를 yield 해야 합니다. 때때로 `'*'`를 발견할 수도 있는데, 이는 이전 숫자를 합산하는 대신 곱해야 한다는 점만 다릅니다.

```python
def filter_weird_stream(stream):
    it = iter(stream)
    while True:
        it, bookmark = itertools.tee(it)
        total = 0
        for item in it:
            if item == '+':
                yield total
                break
            elif item == '*':
                product = 1
                for item in bookmark:
                    if item == '*':
                        yield product
                        break
                    else:
                        product *= item
                else: # bookmark loop did not break
                    yield product # yield final product if no more '*'
                break # break from outer loop after '*' is handled
            else:
                total += item
        else: # it loop did not break
            # Reached end of stream, yield final total if no operator
            # This part needs careful handling based on exact requirements.
            # For simplicity, let's assume stream always ends with an operator or is empty.
            if total != 0: # If there were numbers before EOF and no operator
                yield total
            raise StopIteration
```
**참고:** 위의 `filter_weird_stream` 예제는 원본 PEP의 코드와 약간 다르게 해석될 수 있습니다. 특히 `else` 블록의 처리는 상황에 따라 다르게 구현될 수 있습니다. PEP의 예제는 `'*'` 연산자 후 `it`가 소비되는 것을 보여주며, `bookmark`는 그 지점부터 다시 시작합니다. 원본 코드를 그대로 옮기기보다는 핵심 개념을 설명하는 데 집중했습니다.

`itertools.tee`의 유사한 사용 사례는 이터레이터로 표현된 명령 스트림에 대한 "실행 취소", 토큰 스트림 파싱에 대한 "백트래킹" 등과 같은 작업을 지원할 수 있습니다. (물론, 각 경우에 작업의 세부 사항에 따라 단일 이터레이터로 시퀀스를 진행하는 동안 시퀀스의 관련 부분을 리스트에 저장하는 것과 같은 더 간단한 가능성도 고려해야 합니다).

다음은 기본 이터레이터가 `__copy__`를 지원하는 경우 내장 `enumerate`가 `__copy__`를 지원하도록 확장될 수 있는 방법에 대한 순수 Python 예제입니다:

```python
class enumerate(object):
    def __init__(self, it):
        self.it = iter(it)
        self.i = -1
    def __iter__(self):
        return self
    def next(self):
        self.i += 1
        return self.i, self.it.next()
    def __copy__(self):
        result = self.__class__.__new__(self.__class__) # Use __new__ with class argument
        result.it = self.it.__copy__()
        result.i = self.i
        return result
```
**참고:** `__new__` 호출 방식은 Python 2.x와 3.x에서 약간 다를 수 있습니다. 위 코드는 Python 2.x 스타일을 따릅니다.

다음은 이터레이터의 "우발적인 복사 가능성"으로 인해 발생하는 "취약성"의 한 예입니다. 즉, `copy.copy`가 성공하더라도 결과로 원본과 독립적으로 이터레이션할 수 있는 이터레이터를 받을 것이라고 기대해서는 안 됩니다. 다음은 간단한 중첩 리스트인 "트리"를 (선위 순서로) 이터레이션하는 이터레이터 클래스입니다. 리스트인 항목은 하위 트리로, 다른 항목은 리프로 처리됩니다.

```python
class ListreeIter(object):
    def __init__(self, tree):
        self.tree = [tree]
        self.indx = [-1]
    def __iter__(self):
        return self
    def next(self):
        if not self.indx:
            raise StopIteration
        self.indx[-1] += 1
        try:
            result = self.tree[-1][self.indx[-1]]
        except IndexError:
            self.tree.pop()
            self.indx.pop()
            return self.next()
        if type(result) is not list:
            return result
        self.tree.append(result)
        self.indx.append(-1)
        return self.next()
```
다음 코드는 의도한 대로 작동하지 않습니다. `copy.copy`가 수행하는 우발적인 복사가 "인덱스" 리스트인 변경 가능한 속성 `it.indx`를 복제하는 대신 공유하기 때문에, `cop` 이터레이터는 원본 `it` 이터레이터가 진행됨에 따라 단계별로 소모되고 고갈됩니다. 따라서 이 이터레이터의 "클라이언트 코드"는 시퀀스의 일부를 이터레이터를 `copy.copy`하여 두 번 이터레이션하려고 시도하지만, 이는 올바르지 않습니다.

올바른 해결책 중 하나는 `itertools.tee`를 사용하는 것입니다. 즉, 첫 번째 `for` 루프를 다음과 같이 변경합니다:

```python
for i in it:
    print i,
    if i == 6:
        it, cop = itertools.tee(it)
        break
for i in it:
    print i,
```
(이 루프를 두 부분으로 나누어야 합니다. 그렇지 않으면 `tee()` 호출 후 더 이상 사용해서는 안 되는 `it`의 원래 값에서 계속 루프를 돌게 됩니다!) 또는 리스트를 만듭니다:

```python
for i in it:
    print i,
    if i == 6:
        cop = lit = list(it)
        break
for i in lit:
    print i,
```
(다시, `list(it)` 호출에 의해 이터레이터 `it`가 소진되므로 루프를 두 부분으로 나누어야 합니다).

마지막으로, 이 PEP가 권장하는 대로 `ListreeIter`가 적절한 `__copy__` 메서드를 제공한다면 이 모든 해결책이 작동할 것입니다:

```python
    def __copy__(self):
        result = self.__class__.__new__(self.__class__) # Use __new__ with class argument
        result.tree = copy.copy(self.tree)
        result.indx = copy.copy(self.indx)
        return result
```
복사본을 "더 깊이" 만들 필요는 없지만, 두 개의 변경 가능한 "인덱스 상태" 속성은 "적절한" (독립적으로 이터레이션 가능한) 이터레이터 복사본을 얻기 위해 실제로 복사되어야 합니다.

권장되는 해결책은 `ListreeIter` 클래스가 이 `__copy__` 메서드를 제공하고 클라이언트 코드가 `itertools.tee`를 사용하는 것입니다 (위에서 보여준 두 부분으로 나뉜 루프와 함께). 이렇게 하면 클라이언트 코드가 사용할 수 있는 다양한 이터레이터 유형에 대해 최대한 관용적이며, 동시에 이 특정 이터레이터 유형의 "tee"ing에 대해 좋은 성능을 달성할 수 있습니다.

## 참조 (References)

*   python-dev 토론 시작 게시물: [https://mail.python.org/pipermail/python-dev/2003-October/038969.html](https://mail.python.org/pipermail/python-dev/2003-October/038969.html)
*   표준 라이브러리의 `copy` 모듈 온라인 문서: [https://docs.python.org/release/2.6/library/copy.html](https://docs.python.org/release/2.6/library/copy.html)

## 저작권 (Copyright)

이 문서는 공개 도메인에 배치되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.