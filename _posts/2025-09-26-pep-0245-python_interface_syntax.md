---
title: "[Rejected] PEP 245 - Python Interface Syntax"
excerpt: "Python Enhancement Proposal 245: 'Python Interface Syntax'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/245/
toc: true
toc_sticky: true
date: 2025-09-26 17:16:57+0900
last_modified_at: 2025-09-26 17:16:57+0900
published: true
---
> **원문 링크:** [PEP 245 - Python Interface Syntax](https://peps.python.org/pep-0245/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 11-Jan-2001

PEP 245 – Python 인터페이스 문법 (Python Interface Syntax)

**작성자:** Michel Pelletier
**상태:** Rejected (거부됨)
**유형:** Standards Track
**생성일:** 2001년 1월 11일
**Python 버전:** 2.2

### 거부 공지
이 PEP는 거부되었습니다. 5년이 지났습니다. 언젠가 Python에 인터페이스 기능이 추가될 것으로 예상하지만, 이 PEP에 제시된 문법과 유사할 것이라고 기대하는 것은 순진한 생각입니다. 또한, PEP 246도 완전히 다른 대안을 위해 거부되고 있으며, 인터페이스는 적응(adaptation)이나 그 대안에서 역할을 하지 않을 것입니다. - GvR.

### 서론
이 PEP는 Python에서 인터페이스 객체를 생성하기 위한 제안된 문법을 설명합니다.

### 개요
Types-SIG는 Python에 정적 타입 시스템을 추가하는 것을 고려하는 것 외에도, Python을 위한 인터페이스 시스템을 고안하는 임무를 맡았습니다. 1998년 12월, Jim Fulton은 SIG 논의를 기반으로 한 프로토타입 인터페이스 시스템을 발표했습니다. 이러한 논의와 프로토타입에 대한 많은 문제점과 배경 정보는 SIG 아카이브에서 찾아볼 수 있습니다.

2000년 말경, Digital Creations는 Zope를 위한 더 나은 컴포넌트 모델 설계를 고민하기 시작했습니다. Zope의 미래 컴포넌트 모델은 인터페이스 객체에 크게 의존합니다. 이는 Jim의 "Scarecrow" 인터페이스 프로토타입의 추가 개발로 이어졌습니다. Zope 2.3 버전부터는 Interface 패키지가 표준 소프트웨어로 제공됩니다. Zope의 Interface 패키지는 이 PEP의 참조 구현으로 사용됩니다.

이 PEP에서 제안하는 문법은 PEP 232에 설명된 문법 개선 사항에 의존하며, PEP 233이 기반할 수 있는 기본 프레임워크를 설명합니다. 인터페이스 객체와 Proxy 객체와 관련하여 진행 중인 작업이 있으므로, 이 PEP의 선택적 부분에 대해서는 해당 문서를 참조할 수 있습니다.

### 문제점
인터페이스는 소프트웨어 개발 시 발생하는 여러 문제를 해결하는 데 중요합니다.

1.  **암묵적인 프로토콜:** Python에는 일반적으로 "프로토콜"이라고 불리는 많은 암묵적인 인터페이스가 존재합니다. 현재 이러한 프로토콜을 확인하는 것은 구현 내부 검사(introspection)에 기반하지만, 종종 이것도 실패합니다. 예를 들어, `__getitem__`을 정의하는 것은 시퀀스와 매핑(전자는 순차적인 정수 키를 가짐)을 모두 암시합니다. 개발자가 객체가 어떤 프로토콜을 구현하려는 의도인지 명시적으로 지정할 방법이 없습니다.
2.  **타입과 클래스 분리:** 개발자의 관점에서 Python은 타입과 클래스 간의 분리로 인해 제한됩니다. 타입이 예상될 때, 소비자는 `type(foo) == type("")`와 같은 코드를 사용하여 `foo`가 문자열인지 확인합니다. 클래스의 인스턴스가 예상될 때, 소비자는 `isinstance(foo, MyString)`을 사용하여 `foo`가 `MyString` 클래스의 인스턴스인지 확인합니다. 객체가 특정 유효한 방식으로 사용될 수 있는지 여부를 결정하는 통합된 모델이 없습니다.
3.  **동적 타이핑의 한계:** Python의 동적 타이핑은 매우 유연하고 강력하지만, 타입 검사를 제공하는 정적 타입 언어의 이점을 가지지 못합니다. 정적 타입 언어는 훨씬 더 많은 타입 안전성(type safety)을 제공하지만, 객체가 공통 서브클래싱(subclassing)을 통해서만 일반화될 수 있고 형 변환(casting)을 통해 특정하게 사용되기 때문에(예: Java), 종종 지나치게 장황합니다.

인터페이스는 또한 여러 문서화 문제를 해결하고자 합니다.

1.  **소스 코드 분석 시간 낭비:** 개발자들은 객체가 어떻게 작동하는지 알아내기 위해 시스템의 소스 코드를 살펴보는 데 많은 시간을 낭비합니다.
2.  **오해와 오류 전파:** 시스템에 익숙하지 않은 개발자는 객체 작동 방식을 오해하여 사용 오류를 발생시키고 전파할 수 있습니다.
3.  **내부용 메서드 사용:** 인터페이스의 부재는 사용 방식이 소스 코드로부터 추론됨을 의미하며, 개발자들은 "내부용"으로만 의도된 메서드와 속성을 사용하게 될 수 있습니다.
4.  **초보 개발자의 어려움:** 코드 검사는 어려울 수 있으며, 전문가가 작성한 코드를 올바르게 이해하려는 초보 프로그래머에게는 매우 낙담적일 수 있습니다. 문서화되지 않은 소프트웨어와 같이 모호한 부분을 이해하려 노력하는 데 많은 사람들이 많은 시간을 낭비합니다. 인터페이스를 문서화하는 데 드는 초기 노력은 결과적으로 이러한 시간의 상당 부분을 절약할 것입니다.

인터페이스는 객체에 대한 계약적 의무(contractual obligation)를 지정하는 방법, 객체 사용 방법에 대한 문서화, 그리고 계약 및 문서를 발견하는 내장 메커니즘을 제공함으로써 이러한 문제들을 해결하고자 합니다.

Python은 매우 유용한 내부 검사(introspection) 기능을 가지고 있습니다. Python은 객체에 대한 모든 종류의 정보(타입, doc string, 인스턴스 딕셔너리, 기본 클래스, 비바운드 메서드 등)를 볼 수 있는 기능을 제공하기 때문에, 대화형 인터프리터에서 개념을 탐색하는 것을 더 쉽게 만든다는 것은 잘 알려져 있습니다.

이러한 기능 중 상당수는 소프트웨어의 구현을 내부 검사, 사용 및 변경하는 데 중점을 두며, 그 중 하나("doc string")는 문서화를 제공하는 데 중점을 둡니다. 이 제안은 객체의 인터페이스를 설명하는 이 자연스러운 내부 검사 프레임워크의 확장을 설명합니다.

### 인터페이스 문법 개요
대부분 인터페이스 문법은 클래스 문법과 매우 유사하지만, 미래의 요구 사항이나 논의에서 제기될 요구 사항에 따라 인터페이스 문법에 대한 새로운 가능성이 정의될 수 있습니다.

PEP 후반부에 공식적인 BNF 문법 설명이 제공되지만, 설명을 위해 다음은 제안된 문법으로 생성된 두 가지 다른 인터페이스의 예시입니다.

```python
interface CountFishInterface:
    "Fish counting interface"
    def oneFish():
        "Increments the fish count by one"
    def twoFish():
        "Increments the fish count by two"
    def getFishCount():
        "Returns the fish count"

interface ColorFishInterface:
    "Fish coloring interface"
    def redFish():
        "Sets the current fish color to red"
    def blueFish():
        "Sets the current fish color to blue"
    def getFishColor():
        "This returns the current fish color"
```

이 코드는 평가될 때 `CountFishInterface`와 `ColorFishInterface`라는 두 개의 인터페이스를 생성합니다. 이 인터페이스들은 `interface` 문으로 정의됩니다.

인터페이스와 해당 메서드에 대한 설명 문서는 doc string에서 가져옵니다. 메서드 시그니처 정보는 `def` 문의 시그니처에서 가져옵니다. `def` 문에 본문이 없는 방식에 주목하십시오. 인터페이스는 어떤 서비스도 구현하지 않으며, 단지 서비스를 설명할 뿐입니다. 인터페이스 및 인터페이스 메서드의 문서화 문자열(doc string)은 필수이며, `pass` 문을 제공할 수 없습니다. `pass` 문에 해당하는 인터페이스는 빈 doc string입니다.

다른 인터페이스를 "확장"하는 인터페이스를 만들 수도 있습니다. 다음은 `CountFishInterface`와 `ColorFishInterface`를 확장하는 새로운 유형의 인터페이스입니다.

```python
interface FishMarketInterface(CountFishInterface, ColorFishInterface):
    "This is the documentation for the FishMarketInterface"
    def getFishMonger():
        "Returns the fish monger you can interact with"
    def hireNewFishMonger(name):
        "Hire a new fish monger"
    def buySomeFish(quantity=1):
        "Buy some fish at the market"
```

`FishMarketInterface`는 `CountFishInterface`와 `ColorFishInterface`를 확장합니다.

### 인터페이스 명시 (Interface Assertion)
다음 단계는 인터페이스를 구현한다고 명시하는 구체적인 Python 클래스를 생성하여 클래스와 인터페이스를 결합하는 것입니다. 다음은 이를 수행할 수 있는 `FishMarket` 컴포넌트의 예시입니다.

```python
class FishError(Error):
    pass

class FishMarket implements FishMarketInterface:
    number = 0
    color = None
    monger_name = 'Crusty Barnacles'

    def __init__(self, number, color):
        self.number = number
        self.color = color

    def oneFish(self):
        self.number += 1

    def twoFish(self):
        self.number += 2

    def redFish(self):
        self.color = 'red'

    def blueFish(self):
        self.color = 'blue'

    def getFishCount(self):
        return self.number

    def getFishColor(self):
        return self.color

    def getFishMonger(self):
        return self.monger_name

    def hireNewFishMonger(self, name):
        self.monger_name = name

    def buySomeFish(self, quantity=1):
        if quantity > self.count:
            raise FishError("There's not enough fish")
        self.count -= quantity
        return quantity
```

이 새로운 클래스 `FishMarket`은 `FishMarketInterface`를 구현하는 구체적인 클래스를 정의합니다. `implements` 문 뒤에 오는 객체를 "인터페이스 명시(interface assertion)"라고 합니다. 인터페이스 명시는 인터페이스 객체이거나 인터페이스 명시 튜플일 수 있습니다.

이와 같은 클래스 문에서 제공되는 인터페이스 명시는 클래스의 `__implements__` 클래스 속성에 저장됩니다. 위 예시를 해석한 후, `implements` 내장 함수를 사용하여 다음과 같이 검사할 수 있는 클래스 문을 갖게 됩니다.

```python
>>> FishMarket
<class FishMarket at 8140f50>
>>> FishMarket.__implements__
(<Interface FishMarketInterface at 81006f0>,)
>>> f = FishMarket(6, 'red')
>>> implements(f, FishMarketInterface)
1
>>>
```

클래스는 하나 이상의 인터페이스를 구현할 수 있습니다. 예를 들어, 객체가 컨테이너 객체에서 항목으로 작동하는 방식을 설명하는 `ItemInterface`라는 인터페이스가 있다고 가정해 봅시다. `FishMarket` 인스턴스가 `FishMarketInterface`뿐만 아니라 `ItemInterface`도 구현한다고 명시하려면, `FishMarket` 클래스에 인터페이스 객체 튜플을 포함하는 인터페이스 명시를 제공할 수 있습니다.

```python
class FishMarket implements FishMarketInterface, ItemInterface:
    # ...
```

인터페이스 명시는 한 클래스가 인터페이스를 구현하고, 다른 클래스가 구현하는 모든 인터페이스를 구현한다고 명시하려는 경우에도 사용될 수 있습니다.

```python
class MyFishMarket implements FishMarketInterface, ItemInterface:
    # ...
class YourFishMarket implements FooInterface, MyFishMarket.__implements__:
    # ...
```

이 새로운 클래스 `YourFishMarket`은 `FooInterface`와 `MyFishMarket` 클래스가 구현하는 인터페이스들을 구현한다고 명시합니다.

인터페이스 명시에 대해 좀 더 자세히 설명할 가치가 있습니다. 인터페이스 명시는 인터페이스 객체이거나 인터페이스 명시 튜플입니다. 예를 들어:

```
FooInterface
FooInterface, (BarInterface, BobInterface)
FooInterface, (BarInterface, (BobInterface, MyClass.__implements__))
```

모두 유효한 인터페이스 명시입니다. 두 인터페이스가 동일한 속성을 정의할 때, 명시에서 정보가 선호되는 순서는 위에서 아래로, 왼쪽에서 오른쪽입니다.

단순성을 위해 클래스와 인터페이스의 개념을 결합하여 간단한 인터페이스 강제를 제공하는 다른 인터페이스 제안들도 있습니다. 인터페이스 객체에는 이 동작을 구현하는 지연된 클래스(deferred class)를 반환하는 지연된 메서드(deferred method)가 있습니다.

```python
>>> FM = FishMarketInterface.deferred()
>>> class MyFM(FM): pass
>>> f = MyFM()
>>> f.getFishMonger()
Traceback (innermost last):
  File "<stdin>", line 1, in ?
Interface.Exceptions.BrokenImplementation: An object has failed to implement interface FishMarketInterface
The getFishMonger attribute was not provided.
>>>
```

이는 인터페이스 구현에 무엇을 잊었는지 알려줌으로써 약간의 수동적인 인터페이스 강제(passive interface enforcement)를 제공합니다.

### 공식 인터페이스 문법
Python 문법은 Python 참조 매뉴얼에 설명된 수정된 BNF 문법 표기법으로 정의됩니다. 이 섹션은 이 문법을 사용하여 제안된 인터페이스 문법을 설명합니다.

```
interfacedef: "interface" interfacename [extends] ":" suite
extends: "(" [expression_list] ")"
interfacename: identifier
```

인터페이스 정의는 실행 가능한 문(executable statement)입니다. 먼저 `extends` 목록이 있으면 이를 평가합니다. `extends` 목록의 각 항목은 인터페이스 객체로 평가되어야 합니다.

그런 다음 인터페이스의 `suite`는 새로 생성된 로컬 네임스페이스와 원래 전역 네임스페이스를 사용하여 새로운 실행 프레임(Python 참조 매뉴얼, 섹션 4.1 참조)에서 실행됩니다. 인터페이스의 `suite` 실행이 완료되면, 해당 실행 프레임은 폐기되지만 로컬 네임스페이스는 인터페이스 요소로 저장됩니다. 그런 다음 `extends` 목록을 기본 인터페이스로 사용하고 저장된 인터페이스 요소를 사용하여 인터페이스 객체가 생성됩니다. 인터페이스 이름은 원래 로컬 네임스페이스에서 이 인터페이스 객체에 바인딩됩니다.

이 PEP는 또한 Python의 `class` 문에 대한 확장을 제안합니다.

```
classdef: "class" classname [inheritance] [implements] ":" suite
implements: "implements" implist
implist: expression-list
classname, inheritance, suite, expression-list: see the Python Reference Manual
```

클래스의 `suite`가 실행되기 전에, `inheritance` 및 `implements` 문이 있으면 평가됩니다. `inheritance` 동작은 언어 참조의 섹션 7.6에 정의된 대로 변경되지 않습니다.

`implements`는 있으면 상속 후에 평가됩니다. 이는 인터페이스 또는 인터페이스 사양 튜플인 인터페이스 사양(interface specification)으로 평가되어야 합니다. 유효한 인터페이스 사양이 존재하면, 이 명시는 클래스 객체의 `__implements__` 속성에 튜플로 할당됩니다.

이 PEP는 함수 정의 또는 할당 문법에 대한 변경을 제안하지 않습니다.

### 클래스와 인터페이스
위 예시의 인터페이스는 메서드에 대한 어떤 종류의 동작도 설명하지 않으며, 단지 일반적인 `FishMarket` 객체가 구현할 인터페이스를 설명할 뿐입니다.

다른 인터페이스를 확장하는 인터페이스와 다른 클래스를 서브클래싱하는 클래스 사이에 유사성이 있음을 알 수 있습니다. 이것은 유사한 개념입니다. 그러나 인터페이스는 인터페이스를 확장하고 클래스는 클래스를 서브클래싱한다는 점에 유의하는 것이 중요합니다. 클래스를 확장하거나 인터페이스를 서브클래싱할 수 없습니다. 클래스와 인터페이스는 분리되어 있습니다.

클래스의 목적은 객체가 작동하는 방식의 구현을 공유하는 것입니다. 인터페이스의 목적은 객체가 어떻게 구현되는지가 아니라 객체를 다루는 방법을 문서화하는 것입니다. 매우 다른 구현을 가진 여러 다른 클래스가 동일한 인터페이스를 구현할 수 있습니다.

또한, 인터페이스 기능을 부분적으로 혼합하여 여러 클래스가 하나의 인터페이스를 구현하거나, 반대로 하나의 클래스가 여러 인터페이스를 구현하는 것도 가능합니다. 이 때문에 인터페이스와 클래스를 혼동하거나 뒤섞어서는 안 됩니다.

### 인터페이스 인지 내장 함수 (Interface-aware built-ins)
인터페이스 객체를 고려할 때 Python의 내장 함수 목록에 유용한 확장은 `implements()`가 될 것입니다. 이 내장 함수는 객체와 인터페이스 두 개의 인수를 예상하며, 객체가 인터페이스를 구현하면 True를, 그렇지 않으면 False를 반환합니다. 예를 들어:

```python
>>> interface FooInterface: pass
>>> class Foo implements FooInterface: pass
>>> f = Foo()
>>> implements(f, FooInterface)
1
```

현재 이 기능은 참조 구현에서 `Interface` 패키지의 함수로 존재하며, 사용하려면 `import Interface`가 필요합니다. 내장 함수로 존재하는 것은 편의를 위한 것이며, 인터페이스를 사용하는 데 필수적이지는 않으며, 클래스의 `isinstance()`와 유사합니다.

### 하위 호환성 (Backward Compatibility)
제안된 인터페이스 모델은 Python에서 어떠한 하위 호환성 문제도 발생시키지 않습니다. 그러나 제안된 문법은 하위 호환성 문제를 일으킬 수 있습니다.

`interface`를 식별자(identifier)로 사용하는 기존 코드는 작동하지 않을 것입니다. `interface`를 새로운 키워드로 정의함으로써 발생할 수 있는 다른 종류의 하위 호환성 문제가 있을 수 있습니다. 이 Python 문법 확장은 기존 문법을 하위 호환되지 않는 방식으로 변경하지 않습니다.

새로운 `from __future__` Python 문법(PEP 236)과 새로운 경고 프레임워크(PEP 230)는 이러한 하위 호환성 문제를 해결하는 데 이상적입니다. 현재 인터페이스 문법을 사용하려면 개발자는 다음 문을 사용할 수 있습니다.

```python
from __future__ import interfaces
```

또한, `interface` 키워드를 식별자로 사용하는 모든 코드에는 Python에서 경고가 발행될 것입니다. 적절한 기간이 지난 후, 인터페이스 문법은 표준이 되고, 위 import 문은 아무것도 하지 않으며, `interface`라는 식별자는 예외를 발생시킬 것입니다. 이 기간은 24개월로 제안되었습니다.

### Python에 제안된 변경 사항 요약
*   새로운 `interface` 키워드 추가 및 `implements`를 통한 `class` 문법 확장.
*   클래스 인터페이스를 `__implements__`를 포함하도록 확장.
*   `implements(obj, interface)` 내장 함수 추가.

### 위험
이 PEP는 Python 언어에 `interface`라는 새로운 키워드를 추가할 것을 제안합니다. 이는 기존 코드를 손상시킬 것입니다.

### 반대 의견
이 PEP는 아직 python-dev에서 논의되지 않았습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.