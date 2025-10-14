---
title: "[Final] PEP 322 - Reverse Iteration"
excerpt: "Python Enhancement Proposal 322: 'Reverse Iteration'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/322/
toc: true
toc_sticky: true
date: 2025-09-26 18:30:23+0900
last_modified_at: 2025-09-26 18:30:23+0900
published: true
---
> **원문 링크:** [PEP 322 - Reverse Iteration](https://peps.python.org/pep-0322/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 24-Sep-2003


# PEP 322 – 역방향 이터레이션 (Reverse Iteration)

## 개요
이 제안은 시퀀스(sequence) 객체에 대한 역방향 이터레이션(reverse iteration)을 지원하는 내장 함수(builtin function)를 추가하는 것입니다.

## 동기 (Motivation)
현재 인덱싱 가능한(indexable) 객체에 대해 역방향으로 이터레이션하는 방식은 오류가 발생하기 쉽고(error prone), 자연스럽지 않으며, 가독성이 떨어집니다.

**기존 방식의 예시:**

1.  `xrange`를 사용한 인덱스 기반 역방향 반복:
    ```python
    for i in xrange(n-1, -1, -1):
        print seqn[i]
    ```
    이 방식은 인덱스 계산이 번거롭고 직관적이지 않습니다.

2.  리스트를 뒤집은 후 반복:
    ```python
    rseqn = list(seqn)
    rseqn.reverse()
    for value in rseqn:
        print value
    ```
    이 방식은 리스트 복사 및 뒤집는 과정에서 컴퓨터 자원(CPU 사이클, 메모리)과 코드 라인을 낭비합니다.

3.  확장 슬라이싱(Extended slicing) 사용:
    ```python
    for value in seqn[::-1]:
        print value
    ```
    이 방식은 코드 오버헤드는 줄이지만, 메모리 효율성, 미려함, 명확성 측면에서는 개선된 것이 없습니다. `[::-1]` 슬라이싱은 전체 시퀀스의 복사본을 생성하므로, 특히 큰 시퀀스에서는 비효율적입니다.

역방향 이터레이션은 순방향 이터레이션만큼 흔하지는 않지만, 실제 프로그래밍에서 정기적으로 필요로 하는 상황이 발생합니다.

## 제안 (Proposal)
`__getitem__()` 및 `__len__()`을 지원하는 시퀀스 객체에 대해 역방향 이터레이터(reverse iterator)를 생성하는 내장 함수 `reversed()`를 추가할 것을 제안합니다.

**`reversed()` 함수 사용 예시:**

위의 기존 예시들은 다음과 같이 간결해집니다:

1.  `xrange`와 함께 사용하는 경우:
    ```python
    for i in reversed(xrange(n)):
        print seqn[i]
    ```

2.  시퀀스 객체에 직접 사용하는 경우:
    ```python
    for elem in reversed(seqn):
        print elem
    ```

핵심 아이디어는 역방향 이터레이션을 지정하는 가장 명확하고 오류가 적은 방법은 순방향으로 지정한 다음 `reversed`라고 명시하는 것입니다.

**구현 예시 (개념적):**
이 함수의 구현은 다음과 같이 간단할 수 있습니다:
```python
def reversed(x):
    if hasattr(x, 'keys'):
        raise ValueError("mappings do not support reverse iteration")
    i = len(x)
    while i > 0:
        i -= 1
        yield x[i]
```
(실제 C 구현은 `https://bugs.python.org/issue834422`에 있습니다.)

이 제안은 언어 문법 변경이 필요 없으며, 완전한 하위 호환성을 가집니다.

## BDFL 승인 (BDFL Pronouncement)
이 PEP는 Python 2.4 버전에 조건부로 수락되었습니다. 조건은 만약 이 함수가 쓸모없다고 판단되면, Python 2.4b1 이전에 제거될 수 있다는 것을 의미합니다.

## 대체 메서드 이름 (Alternative Method Names)
다음과 같은 대체 이름들이 논의되었습니다:
*   `reviter`: `iter()`의 사용과 일치.
*   `ireverse`: `itertools`의 명명 규칙을 따름.
*   `inreverse`: 제안자 본인 외에는 선호하지 않는 이름.

`reverse`라는 이름은 `list.reverse()` 메서드(원본 리스트를 변경함)와 중복되기 때문에 후보에서 제외되었습니다.

## 논의 (Discussion)
이 PEP를 채택하지 않아야 한다는 의견은 내장 함수의 수를 적게 유지하려는 바람 때문이었습니다. 그러나 이는 `reversed()`를 다른 네임스페이스에 숨겨두는 것보다 내장 함수로 제공하여 얻는 단순성과 편의성과 저울질되어야 합니다.

## 실제 사용 사례 (Real World Use Cases)
표준 라이브러리에서 역방향 이터레이션이 필요한 몇 가지 실제 사례는 다음과 같습니다:

*   **`atexit.exit_handlers()`**:
    ```python
    while _exithandlers:
        func, targs, kargs = _exithandlers.pop()
        ...
    ```
    이 경우 `pop()`이 필요하므로, 새로운 `reversed()` 함수는 도움이 되지 않습니다.

*   **`heapq.heapify()`**:
    ```python
    for i in xrange(n//2 - 1, -1, -1)
    ```
    `heapify()`는 `n//2 - 1`부터 `0`까지 역방향으로 반복합니다. 이는 상위 레벨의 정렬이 하위 레벨의 정렬 쌍으로부터 더 쉽게 형성되기 때문입니다. 순방향 알고리즘도 가능하지만, 나머지 힙(heap) 코드의 복잡성을 증가시킵니다. `for i in reversed(xrange(n//2))`로 대체하면 반복 범위가 더 명확해집니다.

*   **`mhlib.test()`**:
    ```python
    testfolders.reverse(); for t in testfolders: do('mh.deletefolder(%s)' % `t`)
    ```
    반복 중에 기본 리스트의 꼬리 부분이 변경되므로 역방향 이터레이션이 필요합니다.

*   **`platform._dist_try_harder()`**:
    ```python
    for n in range(len(verfiles)-1,-1,-1)
    ```
    루프가 `verfiles`에서 특정 요소를 삭제하지만, 나머지 리스트는 추가 반복을 위해 그대로 남겨두어야 하기 때문에 역방향 반복을 사용합니다.

*   **`random.shuffle()`**:
    ```python
    for i in xrange(len(x)-1, 0, -1)
    ```
    이 알고리즘은 점점 줄어드는 풀(pool)에서 무작위로 요소를 선택하는 방식으로 가장 쉽게 이해됩니다. 순방향으로도 실행할 수 있지만, 덜 직관적이며 문헌에서도 그렇게 제시되는 경우가 드뭅니다. `for i in reversed(xrange(1, len(x)))`로 대체하면 시각적으로 훨씬 쉽게 검증할 수 있습니다.

*   **`rfc822.Message.__delitem__()`**:
    ```python
    list.reverse()
    for i in list:
        del self.headers[i]
    ```
    반복 중에 기본 리스트의 꼬리 부분이 변경되므로 역방향 이터레이션이 필요합니다.

## 기각된 대안 (Rejected Alternatives)
몇 가지 다른 제안이 제출되었는데, 이는 모든 이터러블(iterable)에 `reversed()`를 적용하여 이터러블을 끝까지 실행하고 결과를 저장한 다음, 그 결과에 대해 역방향 이터레이터를 반환하는 방식이었습니다.

*   **문제점:** 이러한 방식은 '완전한 일반성'이라는 일부 개념을 충족하지만, 입력 이터러블을 끝까지 실행하는 것은 이터레이터를 사용하는 본래 목적(메모리 효율성, 지연 평가)에 위배됩니다. 또한, 기본 이터레이터가 무한할 경우 심각한 문제가 발생할 수 있습니다.

이 함수를 다른 모듈에 넣거나 특정 타입 객체에 첨부하는 것은 고려되지 않았습니다. `zip()` 및 `enumerate()`와 같이, `reversed()` 함수도 일상적인 프로그래밍에서 직접 접근할 수 있어야 합니다. 이들은 각각 기본적인 루핑 문제(병렬 이터레이션, 루프 카운팅, 역방향 이터레이션)를 해결합니다. 특정 애플리케이션 도메인에 독립적인 핵심 루핑 구성 요소로서, 점(dotted) 접근 방식이 필요하면 단순성, 일상적 유용성 및 접근성을 저해할 것입니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.