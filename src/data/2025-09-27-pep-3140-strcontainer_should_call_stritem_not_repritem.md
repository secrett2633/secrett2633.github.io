---
title: "[Rejected] PEP 3140 - str(container) should call str(item), not repr(item)"
excerpt: "Python Enhancement Proposal 3140: 'str(container) should call str(item), not repr(item)'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3140/
toc: true
toc_sticky: true
date: 2025-09-27 14:35:43+0900
last_modified_at: 2025-09-27 14:35:43+0900
published: true
---
> **원문 링크:** [PEP 3140 - str(container) should call str(item), not repr(item)](https://peps.python.org/pep-3140/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 27-May-2008


# PEP 3140 – `str(container)`는 `repr(item)` 대신 `str(item)`을 호출해야 합니다.

*   **작성자:** Oleg Broytman, Jim J. Jewett
*   **상태:** Rejected (거절됨)
*   **유형:** Standards Track
*   **생성일:** 2008년 5월 27일

## 거절 사유

Guido van Rossum은 이 제안이 베타 버전 출시가 임박한 시점에 너무 많은 혼란을 야기할 것이라고 판단하여 거절했습니다.

## 개요 (Abstract)

이 문서는 현재 `str(container)` 구현 방식의 장단점을 논의합니다. 또한, `repr(item)` 대신 `str(item)`을 호출하는 다른 접근 방식의 장단점도 함께 다룹니다.

## 동기 (Motivation)

현재 `str(container)`는 컨테이너 내의 각 항목에 대해 `repr()`를 호출합니다.

**찬성 논거:**
*   컨테이너는 `str(container)` 호출 시 사용자가 어떤 내용을 보기를 원하는지 (예: 주위 문자, 구분 기호 등) 추측하지 않으려 합니다.
*   `repr(item)`은 일반적으로 타입 정보(예: 문자열 주변의 아포스트로피, 클래스 이름 등)를 표시합니다.

**반대 논거:**
*   이는 논리적이지 않습니다. `str()`은 존재한다면 `__str__`을 호출할 것으로 예상되며, `__repr__`을 호출할 것으로 예상되지 않습니다.
*   항목의 `__str__`을 호출하여 컨테이너 내용을 출력하는 표준적인 방법이 없으며, `__str__`과 `__repr__`이 다른 결과를 반환하는 경우에 불편합니다.
*   `repr(item)`은 때때로 잘못된 동작을 합니다 (예: 비-ASCII 문자열을 16진수로 이스케이프 처리).

이 PEP는 `str(container)`의 작동 방식을 변경할 것을 제안합니다. `repr(container)`의 작동 방식을 모방하되, 항목에 대해 `repr` 대신 `str`을 호출하는 한 가지 세부 사항만 다르게 할 것을 제안합니다. 이는 사용자가 `item.__repr__` 또는 `item.__str__` 중 어떤 결과를 얻을지 선택할 수 있도록 합니다.

## 현재 상황 (Current situation)

대부분의 컨테이너 타입(튜플, 리스트, 딕셔너리, 세트 등)은 `__str__` 메서드를 구현하지 않습니다. 따라서 `str(container)`는 `container.__repr__`을 호출하고, `container.__repr__`은 `str`로부터 호출되었는지 여부를 잊고 항상 컨테이너 항목에 대해 `repr`을 호출합니다.

이러한 동작에는 장단점이 있습니다. 한 가지 장점은 대부분의 항목이 타입 정보와 함께 표현된다는 것입니다. 예를 들어, 문자열은 아포스트로피로 둘러싸이고, 인스턴스는 클래스 이름과 인스턴스 데이터를 모두 가질 수 있습니다.

```python
>>> print([42, '42'])
[42, '42']
>>> print([Decimal('42'), datetime.now()])
[Decimal("42"), datetime.datetime(2008, 5, 27, 19, 57, 43, 485028)]
```


단점은 `__repr__`이 종종 기술적인 데이터(예: `<object at address>`) 또는 읽기 어려운 문자열(예: 비-ASCII 문자열의 경우 16진수로 인코딩된 문자열)을 반환한다는 것입니다.

```python
>>> print(['тест'])
['\xd4\xc5\xd3\xd4']
```


PEP 3138의 동기 중 하나는 `repr`과 `str` 모두 키가 비-ASCII 텍스트 문자열인 딕셔너리를 합리적으로 출력할 수 없다는 것입니다. 유니코드 식별자가 허용되면서, 이는 Python 자체의 속성 딕셔너리에도 해당됩니다. 또한 JSON 직렬화에도 영향을 미쳤습니다.

`str(container)`의 작동 방식을 변경하면 일반적인 경우에 쉬운 디버깅이 가능하고, 기계가 읽을 수 있는 경우에는 ASCII-only의 안전성을 유지할 수 있습니다. 유일한 단점은 `str(x)`와 `repr(x)`가 더 자주 달라질 수 있다는 것이지만, 이는 현재 거의 동일한 버전으로 불충분한 경우에만 해당됩니다.

또한 `str(container)`가 항목에 대해 `str` 대신 `repr`을 호출하는 것은 비논리적으로 보입니다. 다음 코드가 아래와 같이 출력될 것으로 예상하는 것이 논리적입니다.

```python
class Test:
    def __str__(self):
        return "STR"
    def __repr__(self):
        return "REPR"
test = Test()
print(test)
print(repr(test))
print([test])
print(str([test]))
```


예상되는 출력:
```
STR
REPR
[STR]
[STR]
```


하지만 실제 출력은 다음과 같습니다:
```
STR
REPR
[REPR]
[REPR]
```


특히 Python 2에서 `print`가 튜플로 보이는 것에 대해 호출될 때 `str`을 사용하는 것은 비논리적입니다.

```python
>>> print Decimal('42'), datetime.now()
42 2008-05-27 20:16:22.534285
```


실제 튜플에 대해서는 다음과 같이 출력됩니다.

```python
>>> print((Decimal('42'), datetime.now()))
(Decimal("42"), datetime.datetime(2008, 5, 27, 20, 16, 27, 937911))
```


## 다른 접근 방식: `str(item)` 호출 (A different approach - call str(item))

예를 들어, 숫자에서는 종종 값 자체에만 관심이 있습니다.

```python
>>> print Decimal('3')
3
```


그러나 이 값을 리스트에 넣으면, 마치 기계를 위해 `repr`이 호출된 것처럼 사용자는 타입 정보를 읽어야 합니다.

```python
>>> print [Decimal('3')]
[Decimal("3")]
```


이 변경 후에는 타입 정보가 `str` 출력에 혼란을 주지 않을 것입니다.

```python
>>> print "%s".format([Decimal('3')])
[3]
>>> str([Decimal('3')]) # == [3]
```


하지만 필요하다면 여전히 타입 정보를 얻을 수 있습니다.

```python
>>> print "%r".format([Decimal('3')])
[Decimal('3')]
>>> repr([Decimal('3')]) # == [Decimal('3')]
```


이 문제를 해결하기 위한 여러 전략이 있습니다. 가장 급진적인 방법은 `__repr__`이 새로운 매개변수(플래그) "str에서 호출되었으므로 항목에 대해 `repr`이 아닌 `str`을 호출하라"를 받아들이도록 변경하는 것입니다. 이 제안의 단점은 모든 `__repr__` 구현이 변경되어야 한다는 것입니다. 인트로스펙션(introspection)이 약간 도움이 될 수 있지만(호출하기 전에 `__repr__`이 2개 또는 3개의 매개변수를 받아들이는지 검사), 내장 컨테이너와 같이 C로 작성된 클래스에서는 인트로스펙션이 작동하지 않습니다.

덜 급진적인 제안은 내장 컨테이너 타입에 대해 `__str__` 메서드를 구현하는 것입니다. 명백한 단점은 노력의 중복입니다. 이 모든 `__str__`과 `__repr__` 구현은 항목에 대해 `str`을 호출할지 `repr`을 호출할지 여부라는 작은 세부 사항에서만 다릅니다.

가장 보수적인 제안은 `str`을 전혀 변경하지 않고 개발자가 자체 애플리케이션 또는 라이브러리별 "pretty-printers"를 구현하도록 허용하는 것입니다. 이 역시 노력의 증대와 많은 작고 구체적인 컨테이너 순회 알고리즘의 확산이라는 단점이 있습니다.

## 하위 호환성 (Backward compatibility)

타입 정보가 평소보다 더 중요한 경우, 명시적으로 `repr`을 호출하여 현재와 동일한 결과를 얻는 것이 여전히 가능할 것입니다.

## 참고 자료 (References)

*   Guido van Rossum, PEP: str(container) should call str(item), not repr(item) [https://mail.python.org/pipermail/python-3000/2008-May/013876.html](https://mail.python.org/pipermail/python-3000/2008-May/013876.html)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.