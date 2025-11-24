---
title: "[Rejected] PEP 500 - A protocol for delegating datetime methods to their tzinfo implementations"
excerpt: "Python Enhancement Proposal 500: 'A protocol for delegating datetime methods to their tzinfo implementations'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/500/
toc: true
toc_sticky: true
date: 2025-09-26 22:43:18+0900
last_modified_at: 2025-09-26 22:43:18+0900
published: true
---
> **원문 링크:** [PEP 500 - A protocol for delegating datetime methods to their tzinfo implementations](https://peps.python.org/pep-0500/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 08-Aug-2015

## PEP 500 – `datetime` 메서드를 `tzinfo` 구현체로 위임하기 위한 프로토콜

*   **작성자**: Alexander Belopolsky, Tim Peters
*   **논의**: Datetime-SIG list
*   **상태**: Rejected (거부됨)
*   **유형**: Standards Track
*   **요구 사항**: PEP 495
*   **생성일**: 2015년 8월 8일
*   **결의**: Datetime-SIG 메시지

---

### 초록 (Abstract)

이 PEP는 `datetime.tzinfo` 인터페이스의 구체적인 구현체들이 지역 시간(aware datetime)의 산술 연산, 포매팅 및 파싱을 재정의하는 데 사용할 수 있는 새로운 프로토콜인 PDDM ("A Protocol for Delegating Datetime Methods")을 명시합니다. 이 새로운 프로토콜을 지원하기 위한 `datetime.datetime` 클래스의 변경 사항들을 설명하고, 지역 시간 `datetime` 인스턴스가 "엄격한(strict)" 산술 규칙을 따르도록 하는 데 필요한 프로토콜의 일부를 구현하는 새로운 추상 클래스 `datetime.tzstrict`를 제안합니다.

### 도입 배경 (Rationale)

Python 3.5를 기준으로, 동일한 `tzinfo` 객체를 공유하는 지역 시간 `datetime` 인스턴스들은 (년, 월, 일, 시, 분, 초, 마이크로초) 7-튜플과 큰 정수 간의 단순한 일대일 대응(bijection)에 의해 유도되는 산술 규칙을 따릅니다. 이러한 산술 연산에서 `YEAR-11-02T12:00`와 `YEAR-11-01T12:00`의 차이는 항상 24시간입니다. 그러나, 예를 들어 `US/Eastern` 시간대에서는 2014년 11월 1일과 11월 2일 사이의 밤에 2014년 11월 2일 02:00에 현지 시계가 한 시간 되돌려지면서 추가적인 한 시간이 발생했기 때문에, 2014-11-01T12:00와 2014-11-02T12:00 사이에는 25시간이 존재합니다.

많은 비즈니스 애플리케이션에서는 Python의 단순화된 로컬 날짜 보기를 사용해야 합니다. 예를 들어, 어떤 자동차 렌탈 회사도 일광 절약 시간제(DST) 종료 시점을 지나는 한 주에 대해 다른 주보다 더 많은 요금을 청구하거나, 고객에게 한 시간 일찍 차량을 반납하도록 요구하지 않을 것입니다. 따라서 지역 시간 `datetime` 산술 규칙을 변경하는 것은 하위 호환성 문제(backward compatibility nightmare)를 야기할 뿐만 아니라, 합법적이고 일반적인 사용 사례에 대한 지원을 없앨 것입니다.

로컬 시간 산술 연산에 대한 보편적인 규칙을 선택하는 것이 불가능하기 때문에, PEP 500은 이러한 규칙의 구현을 `datetime.tzinfo` 인터페이스를 구현하는 클래스에 위임할 것을 제안했습니다. 이러한 위임이 이루어지면, 사용자들은 `tzinfo` 값으로 다른 클래스의 인스턴스를 선택하는 것만으로도 다른 산술 연산 규칙을 선택할 수 있게 될 것입니다.

### 프로토콜 (Protocol)

PDDM을 지원하는 `tzinfo` 서브클래스는 다음 메서드들을 정의할 수 있습니다.

#### `datetime`의 뺄셈 (Subtraction of datetime)

*   `__datetime_diff__(self, dt1, dt2)`: 두 `datetime.datetime` 인스턴스를 인수로 받아, 첫 번째 `datetime` 인스턴스부터 두 번째 인스턴스까지 경과한 시간을 나타내는 `datetime.timedelta` 인스턴스를 반환해야 합니다.

#### 덧셈 (Addition)

*   `__datetime_add__(self, dt, delta)`: `datetime`과 `timedelta` 인스턴스 두 개를 인수로 받아, `datetime` 인스턴스를 반환해야 합니다.

#### `timedelta`의 뺄셈 (Subtraction of timedelta)

*   `__datetime_sub__(self, dt, delta)`: `datetime`과 `timedelta` 인스턴스 두 개를 인수로 받아, `datetime` 인스턴스를 반환해야 합니다.

#### 포매팅 (Formatting)

*   `__datetime_isoformat__(self, dt, separator=None)`: `datetime` 인스턴스와 선택적 `separator`를 인수로 받아, 주어진 `datetime` 인스턴스의 문자열 표현을 생성해야 합니다.
*   `__datetime_strftime__(self, dt, format_string)`: `datetime` 인스턴스와 포맷 문자열을 인수로 받아, 주어진 포맷에 따라 `datetime` 인스턴스의 문자열 표현을 생성해야 합니다.

#### 파싱 (Parsing)

*   `__datetime_strptime__(cls, dt_string, format_string)` (클래스 메서드): `PDDM`을 지원하는 `tzinfo` 서브클래스는 `__datetime_strptime__`이라는 클래스 메서드를 정의하고, 자신이 구현하는 시간대의 "표준(canonical)" 이름을 레지스트리에 등록할 수 있습니다. (레지스트리에 대한 자세한 설명은 PEP에 TODO로 명시되어 있습니다.)

### `datetime` 메서드 변경 사항 (Changes to datetime methods)

#### 뺄셈 (Subtraction)

`datetime` 클래스의 `__sub__` 메서드는 다음과 같이 변경될 예정이었습니다.

```python
class datetime:
    def __sub__(self, other):
        if isinstance(other, datetime):
            try:
                self_diff = self.tzinfo.__datetime_diff__
            except AttributeError:
                self_diff = None
            try:
                other_diff = self.tzinfo.__datetime_diff__
            except AttributeError:
                other_diff = None

            if self_diff is not None:
                if self_diff is not other_diff and self_diff.__func__ is not other_diff.__func__:
                    raise ValueError("Cannot find difference of two datetimes with "
                                     "different tzinfo.__datetime_diff__ implementations.")
                return self_diff(self, other)
        elif isinstance(other, timedelta):
            try:
                sub = self.tzinfo.__datetime_sub__
            except AttributeError:
                pass
            else:
                return sub(self, other)
        return NotImplemented # current implementation
```

#### 덧셈 (Addition)

`datetime` 인스턴스에 `timedelta`를 더하는 연산은 `self.tzinfo.__datetime_add__` 메서드가 정의되어 있을 때 해당 메서드로 위임될 예정이었습니다.

### 엄격한 연산 (Strict arithmetics)

`datetime` 모듈에 `datetime.tzinfo` 클래스의 새로운 추상 서브클래스인 `datetime.tzstrict`가 추가될 예정이었습니다. 이 서브클래스는 `utcoffset()`, `tzname()`, `dst()` 메서드를 구현하지 않지만, PDDM의 일부 메서드를 구현할 예정이었습니다.

`tzstrict`에 의해 구현될 PDDM 메서드들은 다음 코드와 동등할 예정이었습니다.

```python
class tzstrict(tzinfo):
    def __datetime_diff__(self, dt1, dt2):
        utc_dt1 = dt1.astimezone(timezone.utc)
        utc_dt2 = dt2.astimezone(timezone.utc)
        return utc_dt2 - utc_dt1

    def __datetime_add__(self, dt, delta):
        utc_dt = dt.astimezone(timezone.utc)
        return (utc_dt + delta).astimezone(self)

    def __datetime_sub__(self, dt, delta):
        utc_dt = dt.astimezone(timezone.utc)
        return (utc_dt - delta).astimezone(self)
```

### 파싱 및 포매팅 (Parsing and formatting)

`datetime` 메서드인 `strftime`와 `isoformat`은 해당 메서드들이 `tzinfo` 멤버에 정의되어 있을 때 그 메서드들로 위임될 예정이었습니다.

`datetime.strptime` 메서드에 `%Z` 지시어가 포함된 포맷 문자열이 주어지면, 주어진 시간대 이름으로 레지스트리에서 `tzinfo` 구현체를 찾아 해당 `__datetime_strptime__` 메서드를 호출할 예정이었습니다.

### 적용 분야 (Applications)

이 PEP는 다음을 포함한 다양한 시간 관리 체계의 서드파티 구현을 가능하게 할 예정이었습니다.

*   율리우스력(Julian) / Microsoft Excel 달력
*   윤초(leap second)를 지원하는 "올바른(Right)" 시간대
*   프랑스 혁명력 (많은 작업 필요)

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.