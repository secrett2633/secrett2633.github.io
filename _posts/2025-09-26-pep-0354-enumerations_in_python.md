---
title: "[Superseded] PEP 354 - Enumerations in Python"
excerpt: "Python Enhancement Proposal 354: 'Enumerations in Python'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/354/
toc: true
toc_sticky: true
date: 2025-09-26 18:59:58+0900
last_modified_at: 2025-09-26 18:59:58+0900
published: true
---
> **원문 링크:** [PEP 354 - Enumerations in Python](https://peps.python.org/pep-0354/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 20-Dec-2005


# PEP 354 – Python의 Enumeration (열거형)

*   **작성자:** Ben Finney
*   **상태:** 폐기됨 (Superseded)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2005년 12월 20일
*   **Python 버전:** 2.6
*   **대체됨:** PEP 435 (2013년 5월 승인됨)

## 폐기 공지 (Rejection Notice)

이 PEP는 폐기되었습니다. 이 제안은 기존 모듈(예: `collections`)에 잘 맞지 않았고, Python 표준 라이브러리는 자체 모듈에 수많은 개별 데이터 구조를 포함하는 것을 피했습니다. 또한, 이 PEP는 광범위한 관심을 얻지 못했습니다. 열거형이 필요한 개발자들을 위해, Python Cookbook 레시피와 PyPI 패키지들이 이러한 요구사항을 충족하고 있습니다.

**참고:** 이 PEP는 2013년 5월에 승인된 PEP 435로 대체되었습니다.

## 개요 (Abstract)

이 PEP는 Python을 위한 열거형(enumeration) 데이터 타입을 명시합니다.

열거형은 임의의 고유한 값에 바인딩된 배타적인(exclusive) 심볼릭 이름(symbolic names) 집합입니다. 열거형 내의 값들은 반복(iterate)될 수 있고 비교될 수 있지만, 이 값들은 열거형 외부의 값들과는 본질적인 관계가 없습니다.

## 동기 (Motivation)

열거형의 속성들은 정의된 순서는 있지만 본질적인 의미론적 의미는 없는, 변경 불가능하며(immutable) 서로 관련된 상수 값들의 집합을 정의하는 데 유용합니다. 고전적인 예로는 요일(일요일부터 토요일까지)과 학교 성적('A'부터 'D', 'F')이 있습니다. 다른 예로는 오류 상태 값이나 정의된 프로세스 내의 상태들이 있습니다.

`int`나 `str`과 같은 다른 기본 타입의 값 시퀀스를 단순히 정의하여 개별적인 임의의 값을 나타내는 것도 가능합니다. 그러나 열거형은 이러한 값들이 다른 어떤 값과도 구별되며, 의미 없는 연산("수요일 곱하기 2")이 이러한 값들에 대해 정의되지 않도록 보장합니다.

## 명세 (Specification)

열거형 타입은 타입의 생성자에 전달되는 인자 시퀀스로부터 생성됩니다.

```python
>>> Weekdays = enum('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat')
>>> Grades = enum('A', 'B', 'C', 'D', 'F')
```
값이 없는 열거형은 무의미합니다. 생성자가 값 인자 없이 호출되면 `EnumEmptyError` 예외가 발생합니다.

값들은 새 열거형 객체의 속성에 바인딩됩니다.

```python
>>> today = Weekdays.mon
```
값들은 비교될 수 있습니다.

```python
>>> if today == Weekdays.fri:
... print "Get ready for the weekend"
```
열거형 내의 값들은 동일한 열거형의 값들과 비교할 때를 제외하고는 의미 있게 비교될 수 없습니다. 열거형의 값이 동일한 열거형에 속하지 않거나 다른 타입의 어떤 값과 비교될 때, 비교 연산 함수는 `NotImplemented`를 반환합니다.

```python
>>> gym_night = Weekdays.wed
>>> gym_night.__cmp__(Weekdays.mon)
1
>>> gym_night.__cmp__(Weekdays.wed)
0
>>> gym_night.__cmp__(Weekdays.fri)
-1
>>> gym_night.__cmp__(23)
NotImplemented
>>> gym_night.__cmp__("wed")
NotImplemented
>>> gym_night.__cmp__(Grades.B)
NotImplemented
```
이는 연산이 성공적으로 수행되어 부울(boolean) 값으로 평가되도록 합니다.

```python
>>> gym_night = Weekdays.wed
>>> gym_night < Weekdays.mon
False
>>> gym_night < Weekdays.wed
False
>>> gym_night < Weekdays.fri
True
>>> gym_night < 23
False
>>> gym_night > 23
True
>>> gym_night > "wed"
True
>>> gym_night > Grades.B
True
```
열거형의 값을 `str`로 강제 변환(coerce)하면, 열거형 생성 시 해당 값에 대해 지정된 문자열이 결과로 나옵니다.

```python
>>> gym_night = Weekdays.wed
>>> str(gym_night)
'wed'
```
열거형의 각 값의 시퀀스 인덱스(sequence index)는 해당 값의 `index` 속성을 통해 정수(integer)로 내보내집니다.

```python
>>> gym_night = Weekdays.wed
>>> gym_night.index
3
```
열거형은 반복될 수 있으며, 열거형이 생성될 때 지정된 순서대로 값을 반환합니다.

```python
>>> print [str(day) for day in Weekdays]
['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
```
열거형의 값은 해시 가능(hashable)하며 `dict` 키로 사용될 수 있습니다.

```python
>>> plans = {}
>>> plans[Weekdays.sat] = "Feed the horse"
```
열거형의 일반적인 사용법은 데이터 타입에 대한 가능한 값들의 집합을 제공하는 것으로, 이를 통해 값들에 대한 다른 정보와 매핑할 수 있습니다.

```python
>>> for report_grade in Grades:
... report_students[report_grade] = \
... [s for s in students if students.grade == report_grade]
```

## 고려했던 다른 설계 (Rationale – Other designs considered)

### 모든 것을 하나의 클래스 안에 (All in one class)

일부 구현에서는 열거형과 그 값들이 모두 단일 객체 또는 클래스의 속성으로 존재합니다.

이 PEP는 열거형을 컨테이너(container)로, 값들을 단순 비교 가능한(simple comparables) 요소로 지정하는 설계를 따릅니다. 열거형의 모든 속성을 단일 클래스 안에 배치하는 시도는 명백한 이점 없이 설계를 복잡하게 만든다고 판단되었습니다.

### 열거형 클래스 생성을 위한 메타클래스 (Metaclass for creating enumeration classes)

이 PEP에서 명시된 열거형은 `enum` 타입의 인스턴스(instance)입니다. 일부 대안 설계에서는 각 열거형을 자체 클래스로 구현하고, 모든 열거형의 공통 속성을 정의하기 위해 메타클래스(metaclass)를 사용합니다.

각 열거형에 대해 (인스턴스 대신) 클래스를 사용하는 한 가지 동기는 열거형의 서브클래스(subclass)를 허용하여 기존 열거형을 확장하고 변경하기 위함입니다. 그러나 클래스는 해당 클래스의 인스턴스가 생성될 것임을 의미합니다. "요일(days of the week)" 클래스의 별도 인스턴스를 갖는 것이 무엇을 의미하는지 상상하기 어렵습니다. 각 인스턴스에 모든 요일이 포함된다는 것은 싱글톤 패턴(Singleton pattern)을 따르게 되어 설계를 더욱 복잡하게 만듭니다.

대조적으로, 이 PEP는 확장되거나 수정될 것으로 예상되지 않는 열거형을 명시합니다. 물론, 기존 열거형의 문자열 값으로부터 새 열거형을 생성하거나, 원한다면 `enum` 타입을 서브클래싱하는 것도 가능합니다.

### 다른 타입과 관련된 값 (Values related to other types)

일부 설계에서는 각 열거형 값에 대해 특정 정수(integer) 또는 문자열(string)과 같은 다른 값과의 강한 관계를 표현합니다.

이로 인해 열거형이 의미 없는 컨텍스트에서 이러한 값들을 사용하게 되고, 설계를 불필요하게 복잡하게 만듭니다. 이 PEP에서 명시된 열거형 값들은 생성에 사용된 값들을 내보내고, 다른 어떤 값과도 동등성(equality)을 비교할 수 있지만, 열거형 외부의 값과의 시퀀스 비교(sequence comparison)는 명시적으로 구현되지 않습니다.

### 열거형 값의 속성 숨기기 (Hiding attributes of enumerated values)

이전 설계에서는 열거형 값들이 구현에 대해 가능한 한 많이 숨기려 했으며, 문자열 키와 시퀀스 인덱스조차 내보내지 않았습니다.

이 PEP의 설계는 프로그램이 열거형 값의 열거형 타입, 시퀀스 인덱스, 그리고 값에 대해 지정된 문자열 키를 아는 것이 편리하다는 점을 인정합니다. 이러한 정보들은 열거형 값에 의해 속성으로 내보내집니다.

## 구현 (Implementation)

이 설계는 부분적으로 Python Cookbook의 레시피를 기반으로 합니다.

PyPI 패키지 `enum`은 이 PEP에 설명된 데이터 타입의 Python 구현을 제공합니다.

## 참조 및 각주 (References and Footnotes)

 비교 연산에서 `NotImplemented` 반환 값은 Python 인터프리터에게 대체 비교나 다른 폴백(fallbacks)을 시도하도록 지시합니다.
 "First Class Enums in Python", Zoran Isailovski, Python Cookbook recipe 413486.
 Python Package Index, package enum.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.