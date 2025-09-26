---
title: "[Rejected] PEP 542 - Dot Notation Assignment In Function Header"
excerpt: "Python Enhancement Proposal 542: 'Dot Notation Assignment In Function Header'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/542/
toc: true
toc_sticky: true
date: 2025-09-26 23:30:04+0900
last_modified_at: 2025-09-26 23:30:04+0900
published: true
---
> **원문 링크:** [PEP 542 - Dot Notation Assignment In Function Header](https://peps.python.org/pep-0542/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 10-Feb-2017

# PEP 542 – 함수 헤더 내 점 표기법 할당 (Dot Notation Assignment In Function Header)

*   **작성자:** Markus Meskanen <markusmeskanen at gmail.com>
*   **상태:** Rejected (반려됨)
*   **유형:** Standards Track (표준 트랙)
*   **생성일:** 2017년 2월 10일
*   **해결:** Python-Dev message

---

## 목차
*   [요약 (Abstract)](#요약-abstract)
*   [제안 배경 (Rationale)](#제안-배경-rationale)
*   [구현 (Implementation)](#구현-implementation)
*   [하위 호환성 (Backwards Compatibility)](#하위-호환성-backwards-compatibility)
*   [저작권 (Copyright)](#저작권-copyright)

---

## 요약 (Abstract)

함수 정의는 함수가 할당 가능한 일급 객체(first class objects)임에도 불구하고, 단순한 함수 이름만 사용하도록 허용합니다. 이 PEP는 점 표기법(dot notation)을 사용하여 객체와 함수 이름을 분리함으로써, 함수 정의 헤더 내에서 함수를 클래스 또는 인스턴스 속성(attribute)에 직접 할당하는 기능을 추가할 것을 제안합니다.

비슷한 기능이지만, 이 PEP는 `dict` 키나 `list` 인덱스와 같이 할당을 지원하는 모든 것에 대한 일반적인 할당을 다루지는 않습니다.

## 제안 배경 (Rationale)

현재 함수를 클래스 또는 인스턴스 속성에 할당해야 하는 경우, 추가적인 할당문이 필요합니다.

```python
class MyClass:
    ...

my_instance = MyClass()

def my_function(self):
    ...

# 클래스 속성에 할당
MyClass.my_function = my_function

# 또는 인스턴스 속성에 할당
my_instance.my_function = my_function
```

이것이 일반적으로 불편하지는 않지만, 함수 헤더 내에서 점 표기법을 사용하여 직접 할당하는 방식은 이를 크게 단순화할 것입니다.

```python
class MyClass:
    ...

my_instance = MyClass()

# 클래스 속성에 할당
def MyClass.my_function(self):
    ...

# 또는 인스턴스 속성에 할당
def my_instance.my_function(self):
    ...
```

표준 클래스 메서드(standard class method) 대신 이 기능을 사용해야 하는 여러 가지 이유가 있습니다. 예를 들어, 데코레이터(decorators)나 타입 힌트(typing)와 같이 클래스가 함수 헤더 내에서 참조되는 경우입니다. 또한 인스턴스가 콜백(callback) 속성을 필요로 할 때도 유용합니다.

```python
class Menu:
    def __init__(self, items=None, select_callback=None):
        self.items = items if items is not None else []
        self.select_callback = select_callback

my_menu = Menu([item1, item2])

def my_menu.select_callback(item_index, menu):
    print(menu.items[item_index])
```

이는 다음과 같은 방식과 대조됩니다.

```python
my_menu = Menu([item1, item2])

def select_callback(item_index, menu):
    print(menu.items[item_index])

my_menu.select_callback = select_callback
```

또는 "자연스럽지 않은" 순서로 정의하는 경우:

```python
def select_callback(item_index, menu):
    print(menu.items[item_index])

my_menu = Menu([item1, item2], select_callback)
```

새로운 방식은 함수 정의 시 해당 함수가 무엇에 사용될지 이미 알고 있으므로, "자연스럽지 않은" 방식보다 더 잘 읽힙니다. 또한 한 줄의 코드를 절약하고 시각적인 복잡성을 줄여줍니다.

이 기능은 또한 함수의 이름이 전역 네임스페이스(global namespace)에 남는 것을 방지할 수 있습니다.

```python
eggs = 'something'

def Spam.eggs(self):
    ...

def Cheese.eggs(self):
    ...

assert eggs == 'something'
```

이상적으로는 이것이 단순히 문법적 설탕(syntactic sugar)으로 작동할 것입니다.

```python
def x.y():
    ...
# 아래와 동일
def y():
    ...
x.y = y
```

이는 데코레이터가 문법적 설탕으로 작동하는 방식과 유사합니다.

```python
@decorate
def f():
    ...
# 아래와 동일
def f():
    ...
f = decorate(f)
```

## 구현 (Implementation)

`__name__`은 일반 함수의 원칙을 따를 것입니다.

```python
class MyClass:
    def my_function1(self):
        ...
    def MyClass.my_function2(self): # 제안된 문법
        ...

assert my_function1.__name__ == 'my_function1'
assert my_function2.__name__ == 'my_function2'
```

문법(grammar)은 속성 체인(chaining of attributes)을 지원하기 위해 `dotted_name`을 사용할 것입니다.

```python
def Person.name.fset(self, value): # 'Person.name'과 같은 중첩된 속성 접근
    self._name = value
```

## 하위 호환성 (Backwards Compatibility)

이 PEP는 완벽하게 하위 호환됩니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.