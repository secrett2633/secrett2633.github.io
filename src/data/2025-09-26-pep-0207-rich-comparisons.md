---
title: "[Final] PEP 207 - Rich Comparisons"
excerpt: "Python Enhancement Proposal 207: 'Rich Comparisons'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/207/
toc: true
toc_sticky: true
date: 2025-09-26 16:18:40+0900
last_modified_at: 2025-09-26 16:18:40+0900
published: true
---
> **원문 링크:** [PEP 207 - Rich Comparisons](https://peps.python.org/pep-0207/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 25-Jul-2000

PEP 207 – 풍부한 비교 (Rich Comparisons)

## 개요 (Abstract)
이 PEP는 비교 연산자에 대한 몇 가지 새로운 기능을 제안합니다.
- 클래스와 C 확장 모두에서 `<`, `>`, `<=`, `>=`, `==`, `!=` 연산자를 개별적으로 오버로딩할 수 있도록 허용합니다.
- 오버로딩된 연산자가 부울(Boolean) 결과 외에 다른 값을 반환할 수 있도록 허용합니다.

## 동기 (Motivation)
주요 동기는 NumPy에서 비롯됩니다. NumPy 사용자들은 `A < B`가 요소별(elementwise) 비교 결과를 담은 배열을 반환해야 한다고 동의하지만, 현재는 `A < B`가 부울 값만 반환하거나 예외를 발생시키기 때문에 `less(A, B)`와 같이 명시적으로 작성해야 합니다.

또한, 타입이 자연스러운 순서를 갖지 않지만 동등성(equality) 비교는 필요한 경우가 있습니다. 현재 이러한 타입은 동등성 테스트를 위해 임의의 순서를 정의하는 비교 연산자를 구현해야 합니다.

일부 객체 타입의 경우, 동등성 테스트를 순서 테스트보다 훨씬 효율적으로 구현할 수 있습니다. 예를 들어, 길이가 다른 리스트와 딕셔너리는 같지 않지만, 순서를 비교하려면 일부(잠재적으로 모든) 항목을 검사해야 합니다.

## 이전 작업 (Previous Work)
풍부한 비교는 이전에 David Ascher에 의해 제안된 바 있으며, 특히 Numerical Python 경험에서 비롯되었습니다. 이 PEP의 대부분 내용은 David의 제안에서 파생되었습니다.

## 우려 사항 (Concerns)
- **하위 호환성:** Python 레벨(`__cmp__`를 사용하는 클래스는 변경할 필요 없음)과 C 레벨(tp_compare를 정의하는 확장은 변경할 필요 없음, `PyObject_Compare()`를 사용하는 코드는 새로운 풍부한 비교 체계를 사용하더라도 작동해야 함) 모두에서 중요합니다.
- `A < B`가 요소별 비교 행렬을 반환할 때, 이 표현식을 부울 컨텍스트에서 사용하는 쉬운 실수가 있습니다. 특별한 조치 없이는 항상 참(True)으로 간주될 것입니다. 이 경우 대신 예외를 발생시켜야 합니다.
- 클래스가 `x == y`만 오버라이드하고 다른 것은 오버라이드하지 않는 경우, `x != y`는 `not(x == y)`로 계산되어야 할까요, 아니면 실패해야 할까요? `<`와 `>=` 또는 `>`와 `<=` 사이의 유사한 관계는 어떨까요?
- 비슷하게, `x < y`를 `y > x`로부터 계산하거나, `x <= y`를 `not(x > y)`로부터, `x == y`를 `y == x`로부터, `x != y`를 `y != x`로부터 허용해야 할까요?
- 비교 연산자가 요소별 비교를 반환할 때, `A < B < C`, `A < B and C < D`, `A < B or C < D`와 같은 단축(shortcut) 연산자는 어떻게 처리해야 할까요?
- `min()`, `max()`, `'in'` 및 `'not in'` 연산자, `list.sort()`, 딕셔너리 키 비교 및 내장(built-in) 연산자에 의한 다른 비교 사용은 어떻게 해야 할까요?

## 제안된 해결책 (Proposed Resolutions)

- **완벽한 하위 호환성:** 객체가 `tp_compare()`는 정의했지만 `tp_richcompare()`는 정의하지 않았을 때, 풍부한 비교가 요청되면 `tp_compare()`의 결과가 명확한 방식으로 사용됩니다. 예를 들어, `<`가 요청되면, `tp_compare()`가 음수를 반환하면 결과는 1이고, 0 또는 양수를 반환하면 0이 됩니다.
- **완벽한 상위 호환성:** `tp_richcompare()`를 구현하는 객체에 대해 전통적인 비교가 요청되면, 최대 세 가지 비교가 시도됩니다. 먼저 `==`가 시도되고 참을 반환하면 0이 반환됩니다. 다음으로 `<`가 시도되고 참을 반환하면 -1이 반환됩니다. 마지막으로 `>`가 시도되고 참을 반환하면 +1이 반환됩니다. 시도된 연산자 중 어느 것이라도 부울이 아닌 값을 반환하면, 부울로의 변환으로 인해 발생하는 예외가 전달됩니다.
- 부울 대신 부울 컬렉션을 반환하는 모든 타입은 `__nonzero__()` (Python 3에서는 `__bool__`로 변경됨)를 정의하여 예외를 발생시켜야 합니다. 이러한 타입은 비-부울(non-Boolean)로 간주됩니다.
- `==`와 `!=` 연산자는 서로의 보완 관계로 가정되지 않습니다 (예: IEEE 754 부동 소수점 숫자는 이를 만족하지 않습니다). 타입이 원할 경우 이를 구현하는 것은 타입의 책임입니다. `<`와 `>=` 또는 `>`와 `<=`도 마찬가지입니다.
- Python은 반사성(reflexivity) 규칙을 가정합니다. 따라서 인터프리터는 `y > x`를 `x < y`로, `y >= x`를 `x <= y`로, `x == y`와 `x != y`의 인수를 바꿀 수 있습니다.
- 현재 제안에서 `A < B`가 요소별 비교 배열을 반환할 때, 이 결과는 비-부울로 간주되며, 단축 연산자에 의해 부울로 해석될 경우 예외를 발생시킵니다. `A < B < C` 대신 `(A < B) & (B < C)`로 작성할 수 있습니다.
- `min()` 및 `list.sort()` 연산은 오직 `<` 연산자만 사용합니다. `max()`는 오직 `>` 연산자만 사용합니다. `'in'`, `'not in'` 연산자 및 딕셔너리(dictionary) 조회(lookup)는 오직 `==` 연산자만 사용합니다.

## 구현 제안 (Implementation Proposal)
이 제안은 David Ascher의 제안을 밀접하게 따릅니다.

### C API
새로운 함수가 추가됩니다.
- `PyObject *PyObject_RichCompare(PyObject *, PyObject *, int)`: 요청된 풍부한 비교를 수행하고 Python 객체를 반환하거나 예외를 발생시킵니다. 세 번째 인수는 `Py_LT`, `Py_LE`, `Py_EQ`, `Py_NE`, `Py_GT` 또는 `Py_GE` 중 하나여야 합니다.
- `int PyObject_RichCompareBool(PyObject *, PyObject *, int)`: 요청된 풍부한 비교를 수행하고 부울 값을 반환합니다. 예외의 경우 -1, 거짓(false)의 경우 0, 참(true)의 경우 1을 반환합니다. `PyObject_RichCompare()`가 비-부울 객체를 반환할 때, `PyObject_RichCompareBool()`은 예외를 발생시킵니다.

새로운 `typedef`가 추가됩니다.
- `typedef PyObject *(*richcmpfunc) (PyObject *, PyObject *, int);`

타입 객체(type object)의 슬롯에 새로운 `richcmpfunc` 슬롯 `tp_richcompare`가 추가됩니다. 이 함수는 `PyObject_RichCompare()`와 동일한 시그니처를 가져야 합니다.
`PyObject_Compare()`는 정의된 경우 풍부한 비교를 시도하도록 변경됩니다.

### 인터프리터 변경 사항 (Changes to the interpreter)
`PyObject_Compare()`가 특정 비교의 결과를 얻기 위해 호출될 때마다 (예: `list.sort()` 및 `ceval.c`의 비교 연산자), 코드는 대신 `PyObject_RichCompare()` 또는 `PyObject_RichCompareBool()`을 호출하도록 변경됩니다. C 코드가 비교의 결과를 알아야 하는 경우, 결과에 대해 `PyObject_IsTrue()`가 호출됩니다 (이는 예외를 발생시킬 수 있습니다).
현재 비교를 정의하는 대부분의 내장 타입은 대신 풍부한 비교를 정의하도록 수정될 것입니다.

### 클래스 (Classes)
클래스는 해당하는 연산자 (`<`, `<=`, `==`, `!=`, `>`, `>=`)를 오버라이드하기 위해 새로운 특수 메서드 `__lt__`, `__le__`, `__eq__`, `__ne__`, `__gt__`, `__ge__`를 정의할 수 있습니다.
클래스가 `__cmp__`도 정의하는 경우, 이는 `__lt__` 등이 시도되어 `NotImplemented`를 반환할 때만 사용됩니다.

## 연쇄 비교 (Chained Comparisons)

### 문제 (Problem)
`x < y < z`와 같이 비교 결과가 -1, 0, 1이 아닌 객체가 연쇄 비교(chained comparisons)에 사용될 수 있도록 허용하는 것이 좋습니다.
현재 Python은 이를 다음과 같이 해석합니다.

```python
temp1 = x < y
if temp1:
    return y < z
else:
    return temp1
```
이는 비교 결과의 참(truth) 값을 테스트해야 하며, 오른쪽 비교 테스트가 "단축(shortcutting)"될 가능성이 있습니다. 배열의 경우, `x < y < z`는 `x`와 `z` 사이의 `y` 요소에 해당하는 위치에 1이 있는 배열이 되기를 기대하는데, 이는 `x < y`의 결과와 관계없이 오른쪽 항이 평가되어야 함을 의미하며, 현재 파서(parser)에서 사용되는 메커니즘과 호환되지 않습니다.

### 해결책 (Solution)
Guido는 연쇄 비교에 의해 생성되는 코드를 변경하여 배열이 지능적으로 연쇄 비교될 수 있도록 하는 한 가지 방법을 언급했습니다.
`x < y < z`에 대해 생성되는 코드는 다음과 같을 것입니다.

```python
temp1 = x < y
if temp1:
    temp2 = y < z
    return boolean_combine(temp1, temp2)
else:
    return temp1
```
여기서 `boolean_combine`은 다음과 유사한 새로운 함수입니다.

```python
def boolean_combine(a, b):
    if hasattr(a, '__boolean_and__') or \
       hasattr(b, '__boolean_and__'):
        try:
            return a.__boolean_and__(b)
        except:
            return b.__boolean_and__(a)
    else:
        # standard behavior
        if a:
            return b
        else:
            return 0
```
`__boolean_and__` 특수 메서드는 C-레벨 타입에 대해 `richcmp` 함수의 세 번째 인수의 다른 값으로 구현됩니다.
따라서 풍부한 비교에 의해 반환된 객체는 항상 참으로 테스트되어야 하지만, 자신과 인수의 부울 조합을 생성하는 다른 특수 메서드를 정의해야 합니다.
이 해결책은 연쇄 비교가 배열에 대해 작동하도록 허용하는 장점이 있습니다.
정수 비교를 처리하는 인라이닝(inlining)은 여전히 적용되어 가장 일반적인 경우 성능 비용이 발생하지 않습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.