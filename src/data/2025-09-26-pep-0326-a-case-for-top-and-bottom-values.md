---
title: "[Rejected] PEP 326 - A Case for Top and Bottom Values"
excerpt: "Python Enhancement Proposal 326: 'A Case for Top and Bottom Values'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/326/
toc: true
toc_sticky: true
date: 2025-09-26 20:37:04+0900
last_modified_at: 2025-09-26 20:37:04+0900
published: true
---
> **원문 링크:** [PEP 326 - A Case for Top and Bottom Values](https://peps.python.org/pep-0326/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 20-Dec-2003

## PEP 326 – Top 및 Bottom 값에 대한 제안 (Max, Min 상수)

### 요약
PEP 326은 모든 다른 객체보다 높거나 낮게 비교되는 두 개의 싱글톤(singleton) 상수, `Max`와 `Min`을 도입할 것을 제안했습니다. 이 상수들은 코드의 가독성을 높이고, 임시적인 최소/최대 값이 필요하지만 실제 숫자 범위의 제한이 없는 특별한 경우(special cases)를 줄이는 데 목적을 두었습니다. 그러나 이 PEP는 Python의 BDFL(Benevolent Dictator For Life)인 Guido van Rossum에 의해 **거부되었습니다** .

### 결과
이 PEP는 BDFL에 의해 거부되었습니다. 제안된 동작을 구현하는 모듈이 존재하며, 해당 동작을 원하는 사용자들은 이 모듈을 사용할 것을 권장하고 있습니다.

### 제안 배경 (Rationale)
현재 Python에서 절대적인 최소/최대 값을 처리하는 방식에는 여러 한계가 있습니다.

*   **`None`의 사용:** `None`은 어떤 값보다도 작은 절대적인 최소값으로 사용될 수 있지만, Python 3.0에서 이러한 동작이 변경될 수 있어 의존해서는 안 됩니다.
*   **`sys.maxint` 및 부동 소수점 무한대:** `sys.maxint`는 대부분의 아키텍처에서 임의로 작을 수 있으며(예: 2 **31-1 또는 2** 63-1), `long` 정수나 부동 소수점 숫자에 의해 쉽게 초과될 수 있습니다. 또한, 가장 큰 부동 소수점 숫자보다 큰 `long` 정수를 어떤 `float`와 비교하면 `OverflowError`가 발생할 수 있습니다.

    ```python
    >>> cmp(1.0, 10**309)
    Traceback (most recent call last):
      File "<stdin>", line 1, in ?
    OverflowError: long int too large to convert to float
    ```
    `Max`와 `Min`을 도입하면 이러한 단점 없이 일관된 절대 최소/최대 값 비교를 가능하게 합니다.

### 동기 (Motivation)
수많은 알고리즘은 초기 값을 논리적 또는 숫자적 무한대나 음의 무한대로 설정하여 시작합니다. Python은 이러한 일관된 "진정한" 극단 값을 제공하지 않아, 개발자들은 임의의 큰 숫자를 사용하거나 `None`을 오버로드하는 등의 workaround를 사용해야 했습니다. `Max`와 `Min`을 추가함으로써, Python은 진정한 최대/최소 값을 가지게 되어 알고리즘의 특별한 경우(special cases)를 줄여 코드를 더 명확하게 만들 수 있습니다.

#### `Max` 사용 예시
*   **서버 테스트:** 특정 수의 클라이언트만 처리하고 종료하는 테스트 서버를 `Max`를 사용하여 최소한의 노력으로 프로덕션 서버로 전환할 수 있습니다.
*   **Dijkstra의 최단 경로 알고리즘:** 그래프의 모든 노드에 대한 거리를 무한대로 초기화하는 과정에서 `Max`를 사용하면 코드의 의미가 명확해집니다. 임의의 큰 숫자를 사용하는 대신 `Max`를 사용하면 오버플로(overflow) 문제나 가독성 문제를 피할 수 있습니다.

#### `Min` 사용 예시
*   **통신 네트워크 신뢰도 계산:** 그래프에서 두 노드 간의 채널 신뢰도(0과 1 사이의 확률)를 계산하는 알고리즘에서 `Min`을 사용하여 초기 신뢰도를 가장 낮은 값으로 설정할 수 있습니다.

#### 기타 예시
*   **범위 검색 데이터 구조:** Segment tree, Range tree, k-d tree, 데이터베이스 키 등 범위 검색(range searching)과 관련된 다양한 데이터 구조에서 `Max`와 `Min` 값이 즉각적으로 유용하게 사용될 수 있습니다. 현재는 `None`을 극단 값으로 오버로드하거나 임의의 큰 숫자를 사용하는데, 이는 `None`의 비교 동작 문제나 오버런/언더런 버그를 유발할 수 있습니다.

### 독립적인 구현의 문제 (Independent Implementations?)
`Min` / `Max` 개념을 사용자들이 독립적으로 구현할 경우, 호환되지 않거나 일관성 없는 정렬(ordering)을 초래할 가능성이 높습니다. 예를 들어, `MyMin`과 `YourMin`이라는 두 가지 독립적인 `Min` 구현이 있을 때, 정렬 시 이들 사이의 순서가 보장되지 않습니다. 이는 `heapq` 모듈과 같은 다른 자료구조 사용 시에도 문제가 발생할 수 있습니다.

이 PEP의 핵심은 "유일하고 진정한 `Max`"와 "유일하고 진정한 `Min`"을 도입하여 표준화된 동작을 제공하는 것이었습니다. 사용자 기반 구현은 장려되지 않으며, "유일하고 진정한 구현"의 사용이 권장되었습니다.

### 참조 구현 (Reference Implementation)
PEP에서 제안된 `Max`와 `Min`의 동작을 보여주는 간단한 Python 구현은 다음과 같습니다.

```python
class _ExtremeType(object):
    def __init__(self, cmpr, rep):
        object.__init__(self)
        self._cmpr = cmpr
        self._rep = rep

    def __cmp__(self, other):
        # 동일한 ExtremeType 인스턴스 간 비교 시 0 반환
        if isinstance(other, self.__class__) and \
           other._cmpr == self._cmpr:
            return 0
        return self._cmpr

    def __repr__(self):
        return self._rep

Max = _ExtremeType(1, "Max")
Min = _ExtremeType(-1, "Min")
```
이 구현은 `max()` 및 `min()` 함수와 함께 예상대로 작동하여 모든 값보다 크거나 작게 비교되는 것을 보여줍니다.

### 미해결 문제 (Open Issues)
PEP가 거부되었으므로 모든 미해결 문제는 이제 종결되었으며 중요하지 않습니다. 제안된 모듈은 `UniversalMaximum`과 `UniversalMinimum`이라는 이름을 사용할 것이며, 필요시 `from extremes import UniversalMaximum as uMax, UniversalMinimum as uMin`와 같이 `import` 시 이름을 변경하여 사용할 것을 제안합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.