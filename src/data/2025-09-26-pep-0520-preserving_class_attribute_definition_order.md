---
title: "[Final] PEP 520 - Preserving Class Attribute Definition Order"
excerpt: "Python Enhancement Proposal 520: 'Preserving Class Attribute Definition Order'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/520/
toc: true
toc_sticky: true
date: 2025-09-26 23:13:52+0900
last_modified_at: 2025-09-26 23:13:52+0900
published: true
---
> **원문 링크:** [PEP 520 - Preserving Class Attribute Definition Order](https://peps.python.org/pep-0520/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 07-Jun-2016

PEP 520 – 클래스 속성 정의 순서 유지 (Preserving Class Attribute Definition Order)

## 요약 (Abstract)

클래스 정의 구문은 본질적으로 순서가 있습니다. 여기에 정의된 클래스 속성들 역시 순서가 존재합니다. 이러한 순서는 가독성을 높일 뿐만 아니라 때로는 그 자체가 중요하기도 합니다. 만약 이 순서가 클래스 정의 외부에서 자동으로 접근 가능하다면, 메타클래스(metaclass)를 사용하거나 속성 순서를 수동으로 열거하는 것과 같은 추가적인 상용구 코드(boilerplate) 없이도 속성 순서를 활용할 수 있게 될 것입니다. 이 정보가 이미 존재한다는 점을 고려할 때, 속성 정의 순서에 접근할 수 있도록 하는 것은 합리적인 기대입니다. 그러나 현재 Python은 클래스 정의에서 속성 순서를 보존하지 않습니다.

이 PEP는 클래스 정의 본문에서 속성이 도입되는 순서를 유지하도록 변경합니다. 이제 그 순서는 클래스의 `__definition_order__` 속성에 보존될 것입니다. 이는 클래스 데코레이터(class decorators) 등에서 원래의 정의 순서를 내부적으로 검사(introspection)할 수 있도록 합니다.

또한, 이 PEP는 기본 클래스 정의 네임스페이스(namespace)가 기본적으로 순서가 있는 매핑(ordered mapping, 예: `collections.OrderedDict`)이 될 것을 요구합니다. `__dict__`와 같은 오래된 클래스 네임스페이스는 계속 `dict`로 유지됩니다.

**참고:** Python 3.6에 compact `dict`가 도입된 이후, `__definition_order__`는 제거되었습니다. 대신 `cls.__dict__`가 이제 대부분 동일한 기능을 수행합니다.

## 동기 (Motivation)

클래스 정의의 속성 순서는 이름 순서에 의존하는 도구에 유용할 수 있습니다. 그러나 정의 순서가 자동으로 제공되지 않으면, 그러한 도구는 사용자에게 추가적인 요구 사항을 부과해야 합니다. 예를 들어, 특정 도구를 사용하려면 클래스가 특정 메타클래스를 사용하도록 요구될 수 있습니다. 이러한 요구 사항은 종종 도구 사용을 저해하는 요인이 됩니다.

이 PEP를 활용할 수 있는 몇 가지 도구는 다음과 같습니다.

*   문서 생성기 (documentation generators)
*   테스트 프레임워크 (testing frameworks)
*   CLI 프레임워크 (CLI frameworks)
*   웹 프레임워크 (web frameworks)
*   설정 생성기 (config generators)
*   데이터 직렬화기 (data serializers)
*   Enum 팩토리 (enum factories) (작성자의 원래 동기)

## 배경 (Background)

클래스 문(class statement)을 사용하여 클래스가 정의될 때, 클래스 본문(class body)은 네임스페이스 내에서 실행됩니다. 현재 기본적으로 이 네임스페이스는 `dict`입니다. 만약 메타클래스가 `__prepare__()`를 정의하면, 해당 호출 결과가 클래스 정의 네임스페이스로 사용됩니다.

실행이 완료되면 정의 네임스페이스는 새 `dict`로 복사됩니다. 그런 다음 원래 정의 네임스페이스는 폐기됩니다. 새 복사본은 클래스의 네임스페이스로 저장되고 읽기 전용 프록시(read-only proxy)를 통해 `__dict__`로 노출됩니다.

클래스 속성 정의 순서는 정의 네임스페이스에 이름이 삽입되는 순서로 표현됩니다. 따라서 정의 네임스페이스를 `collections.OrderedDict`와 같은 순서 있는 매핑으로 전환함으로써 정의 순서에 접근할 수 있습니다. 이는 위에서 설명한 대로 메타클래스와 `__prepare__`를 사용하여 가능합니다. 실제로 이는 `__prepare__`를 사용하는 가장 일반적인 사용 사례입니다.

이 시점에서 나중에 정의 순서에 접근하기 위해 유일하게 누락된 것은 정의 네임스페이스가 버려지기 전에 클래스에 저장하는 것입니다. 이 역시 메타클래스를 사용하여 수행할 수 있습니다. 그러나 이는 그러한 메타클래스를 사용하는 클래스에 대해서만 정의 순서가 유지된다는 것을 의미합니다. 여기에는 두 가지 실용적인 문제가 있습니다.

첫째, 메타클래스 사용이 필요합니다. 메타클래스는 코드에 추가적인 복잡성을 도입하며, 경우에 따라(예: 충돌) 문제가 될 수 있습니다. 따라서 기회가 있을 때 메타클래스 필요성을 줄이는 것은 가치 있는 일입니다. PEP 422와 PEP 487에서 이에 대해 자세히 논의합니다. 기본 클래스 정의 네임스페이스에 순서 있는 매핑(예: CPython의 경우 `OrderedDict`)을 사용하여 `__prepare__()`의 필요성을 사실상 없애는 기회가 있습니다.

둘째, `OrderedDict` 기반 메타클래스를 사용하기로 선택한 클래스만 정의 순서에 접근할 수 있습니다. 이는 정의 순서에 대한 보편적인 접근이 중요한 경우에 문제가 됩니다.

## 명세 (Specification)

**파트 1:**

*   모든 클래스는 `__definition_order__` 속성을 가집니다.
*   `__definition_order__`는 식별자(identifier) 튜플(tuple)이거나 `None`입니다.
*   `__definition_order__`는 항상 다음과 같이 설정됩니다.
    *   클래스 본문 실행 중, 클래스 정의 네임스페이스에 이름이 삽입되는 순서가 튜플에 저장됩니다.
    *   만약 `__definition_order__`가 클래스 본문에 정의되어 있다면, 식별자 튜플 또는 `None`이어야 합니다. 다른 값은 `TypeError`를 발생시킵니다.
    *   클래스 정의가 없는 클래스(예: 내장(builtins) 타입)는 `__definition_order__`가 `None`으로 설정됩니다.
    *   `__prepare__()`가 `OrderedDict`(또는 그 서브클래스)가 아닌 다른 것을 반환한 클래스는 `__definition_order__`가 `None`으로 설정됩니다 (단, 위 #2가 적용되는 경우는 예외).
*   변경되지 않는 사항:
    *   `dir()`은 `__definition_order__`에 의존하지 않습니다.
    *   디스크립터(descriptors)와 사용자 정의 `__getattribute__` 메서드는 `__definition_order__`와 관련하여 제약을 받지 않습니다.

**파트 2:**

*   기본 클래스 정의 네임스페이스는 이제 순서 있는 매핑(예: `OrderedDict`)입니다.
*   `cls.__dict__`는 변경되지 않고 `dict`를 둘러싼 읽기 전용 프록시로 유지됩니다.

순서 있는 `dict`를 가진 Python 구현체는 아무것도 변경할 필요가 없다는 점에 유의하십시오.

다음 코드는 파트 1과 파트 2에 대한 대략적으로 동등한 의미를 보여줍니다.

```python
from collections import OrderedDict

class Meta(type):
    @classmethod
    def __prepare__(cls, *args, **kwargs):
        return OrderedDict()

class Spam(metaclass=Meta):
    ham = None
    eggs = 5
    __definition_order__ = tuple(locals())
```

### 왜 튜플인가? (Why a tuple?)

튜플(tuple)을 사용하는 것은 클래스의 속성이 정의된 순서를 노출한다는 사실을 반영합니다. `__definition_order__`가 설정될 때쯤에는 정의가 이미 완료되었으므로, 값의 내용과 순서는 변경되지 않습니다. 따라서 우리는 불변성(immutability) 상태를 전달하는 타입을 사용합니다.

### 왜 읽기 전용 속성이 아닌가? (Why not a read-only attribute?)

`__definition_order__`를 읽기 전용 속성(예: `cls.__dict__`)으로 만드는 것에 대한 몇 가지 타당한 주장이 있습니다. 가장 주목할 만한 점은 읽기 전용 속성이 속성의 "완료" 상태를 전달하며, 이는 `__definition_order__`에 정확히 해당합니다. 특정 일회성 이벤트(클래스 정의 본문의 실행)의 상태를 나타내므로, 값을 교체하는 것을 허용하면 속성이 원래 클래스 본문에 해당하는지에 대한 신뢰를 떨어뜨릴 것입니다. 또한, 기본적으로 불변(immutable) 접근 방식은 데이터를 추론하기 더 쉽게 만드는 데 도움이 됩니다.

그러나 이 경우 Python에서 흔히 볼 수 있는 잘 확립된 선례에 반대할 강력한 이유는 여전히 없습니다. Guido에 따르면:

> 저는 이것이 읽기 전용 속성일 필요가 있다고 생각하지 않습니다. 그런 경우는 거의 없습니다. 일반적으로 우리는 할당을 제한해야 할 강력한 이유가 없는 한 (예: 인터프리터의 내부 상태가 손상될 수 있는 경우) 사용자가 모든 것을 가지고 놀 수 있도록 합니다. 여기에는 그러한 강력한 이유가 보이지 않습니다.

또한, 쓰기 가능한(writeable) `__definition_order__`는 동적으로 생성된 클래스(예: Cython에 의해)도 `__definition_order__`가 제대로 설정될 수 있도록 허용합니다. 이는 `type()` 또는 C-API와 같은 특정 클래스 생성 도구를 통해 처리될 수 있었으며, 읽기 전용 속성의 의미를 잃을 필요는 없었습니다. 그러나 쓰기 가능한 속성을 사용하면 논쟁의 여지가 없습니다.

### 왜 “`__attribute_order__`”가 아닌가? (Why not “__attribute_order__”?)

`__definition_order__`는 클래스 정의 본문에 초점을 맞춥니다. 정의 이후 클래스 네임스페이스(`__dict__`)를 다루는 사용 사례는 별개의 문제입니다. `__definition_order__`는 클래스 정의 이상에 초점을 맞춘 기능에 대해 상당히 오해의 소지가 있는 이름이 될 것입니다.

### 왜 “던더(dunder)” 이름을 무시하지 않는가? (Why not ignore “dunder” names?)

`__`로 시작하고 끝나는 이름은 인터프리터(interpreter) 사용을 위해 예약되어 있습니다. 실제로는 `__definition_order__` 사용자에게 관련이 없어야 합니다. 대신, 거의 모든 사람에게는 혼란을 야기하고 (던더 이름을 필터링하는) 동일한 추가 작업을 유발할 뿐입니다. 던더 이름이 중요한 경우에는 클래스 정의에서 `__definition_order__`를 수동으로 설정할 수 있어 일반적인 경우를 더 간단하게 만듭니다.

그러나 `__definition_order__`에서 던더 이름을 제외하면 정의 순서에서 해당 위치가 복구 불가능하게 손실됩니다. 기본적으로 던더 이름을 제외하면 던더 이름을 비관습적으로 사용하는 클래스에 예기치 않은 문제를 일으킬 수 있습니다. 이 경우 안전하게 모든 이름을 클래스 정의에서 보존하는 것이 좋습니다. 던더 이름을 필터링하는 것은 쉽기 때문에 큰 문제는 아닙니다.

```python
(name for name in cls.__definition_order__ if not (name.startswith('__') and name.endswith('__')))
```

사실, 일부 애플리케이션 컨텍스트에서는 `_`로 시작하는 이름을 무시하거나, 모든 메서드를 제외하거나, 디스크립터만 포함하는 등 유사한 필터링이 적용될 수 있는 다른 기준이 있을 수 있습니다. 궁극적으로 던더 이름은 특별한 경우로 취급할 만큼 특별하지 않습니다.

두어 개의 던더 이름(`__name__` 및 `__qualname__`)은 컴파일러에 의해 기본적으로 주입됩니다. 따라서 엄밀히 말해 클래스 정의 본문의 일부는 아니지만 포함될 것입니다.

### 왜 빈 튜플 대신 `None`인가? (Why None instead of an empty tuple?)

`__definition_order__`를 추가하는 핵심 목표는 이 PEP 이전에 손실되었던 클래스 정의의 정보를 보존하는 것입니다. 한 가지 결과는 `__definition_order__`가 원래 클래스 정의를 암시한다는 것입니다. `None`을 사용하면 정의 순서가 없는 클래스를 명확하게 구별할 수 있습니다. 빈 튜플은 정의 문에서 왔지만 속성을 정의하지 않은 클래스를 명확하게 나타냅니다.

### 왜 속성을 설정하지 않는 대신 `None`인가? (Why None instead of not setting the attribute?)

속성이 없는 것은 `__definition_order__`를 사용하는 소비자에게 `None`보다 더 복잡한 처리를 요구합니다.

### 왜 수동으로 설정된 값을 제약하는가? (Why constrain manually set values?)

만약 `__definition_order__`가 클래스 본문에 수동으로 설정된다면, 그것이 사용될 것입니다. 우리는 `__definition_order__`의 소비자들이 값에 대해 일관된 기대를 가질 수 있도록 식별자 튜플(또는 `None`)이어야 한다고 요구합니다. 이는 기능의 유용성을 극대화하는 데 도움이 됩니다.

수동으로 설정된 `__definition_order__`에 대해 임의의 이터러블(iterable)을 허용하고 튜플로 변환할 수도 있습니다. 그러나 모든 이터러블이 정의 순서를 추론하지는 않습니다(예: `set`). 따라서 우리는 튜플을 요구하는 것을 선택합니다.

### 왜 `non-type` 객체에서 `__definition_order__`를 숨기지 않는가? (Why not hide __definition_order__ on non-type objects?)

Python은 클래스 인스턴스에서 조회(lookup)할 때 클래스 특정 속성을 숨기기 위해 많은 노력을 기울이지 않습니다. `__definition_order__`를 클래스 전용 속성으로 간주하고 객체 조회 시 숨기는 것이 합리적일 수 있지만, 그 점에서 선례를 설정하는 것은 이 PEP의 목표를 넘어섭니다.

### `__slots__`는 어떤가? (What about __slots__?)

`__slots__`는 클래스 정의 본문의 다른 이름과 마찬가지로 `__definition_order__`에 추가됩니다. 실제 슬롯(slot) 이름은 정의 네임스페이스에 이름으로 설정되지 않으므로 `__definition_order__`에 추가되지 않습니다.

### `__definition_order__`가 왜 필요한가? (Why is __definition_order__ even necessary?)

정의 순서는 `__dict__`에 보존되지 않으므로 클래스 정의 실행이 완료되면 손실됩니다. 클래스는 본문에서 마지막으로 속성을 명시적으로 설정할 수 있습니다. 그러나 이 경우 독립적인 데코레이터는 그렇게 한 클래스만 사용할 수 있습니다. 대신, `__definition_order__`는 클래스 본문에서 이 정보를 보존하여 보편적으로 사용할 수 있도록 합니다.

## C-API 타입 지원 (Support for C-API Types)

대부분의 C로 정의된 Python 타입(예: 내장 타입, 확장 모듈)은 정의 순서와 대략적으로 동등한 개념을 가지고 있다고 주장할 수 있습니다. 따라서 `__definition_order__`는 이러한 타입에 대해 자동으로 설정될 수 있다고 생각할 수 있습니다. 이 PEP는 그러한 지원을 도입하지 않습니다. 그러나 금지하지도 않습니다. 하지만 `__definition_order__`는 일반적인 속성 할당을 통해 언제든지 설정될 수 있으므로 C-API에서 특별한 처리가 필요하지 않습니다.

특정 사례:

*   `builtin` 타입
*   `PyType_Ready`
*   `PyType_FromSpec`

## 호환성 (Compatibility)

이 PEP는 클래스 정의 네임스페이스로 엄격하게 `dict`에 의존하는 경우를 제외하고는 하위 호환성(backward compatibility)을 깨뜨리지 않습니다. `issubclass(OrderedDict, dict)`가 `True`이므로 이는 문제가 되지 않아야 합니다.

## 변경 사항 (Changes)

클래스 구문 외에도 다음은 새로운 동작을 노출합니다.

*   `builtins.__build_class__`
*   `types.prepare_class`
*   `types.new_class`

또한 `builtins.type()`의 3인자 형식은 전달되는 네임스페이스에 `__definition_order__`를 포함하는 것을 허용합니다. `__definition_order__`가 클래스 본문에 명시적으로 정의될 때와 동일한 제약을 받습니다.

## 다른 Python 구현체 (Other Python Implementations)

피드백에 따라 Python 구현체에 미치는 영향은 최소화될 것으로 예상됩니다. 모든 규정 준수 구현체는 이 PEP에 설명된 대로 `__definition_order__`를 설정할 것으로 예상됩니다.

## 구현 (Implementation)

구현은 트래커에서 찾을 수 있습니다.

## 대안 (Alternatives)

### 순서를 유지하는 `cls.__dict__` (An Order-preserving cls.__dict__)

정의 순서를 `__definition_order__`에 저장하는 대신, 이제 순서가 있는 정의 네임스페이스를 새 `OrderedDict`로 복사할 수 있었습니다. 그런 다음 이것은 `__dict__`로 프록시되는 매핑으로 사용될 것입니다. 이렇게 하면 대부분 동일한 의미를 제공할 것입니다.

그러나 `__dict__`에 `OrderedDict`를 사용하면 정의 네임스페이스와의 관계가 모호해져 유용성이 떨어집니다.

또한 (특히 `OrderedDict`의 경우) 이렇게 하면 구체적인 `dict` C-API의 의미론에 상당한 변경이 필요할 것입니다.

삽입 순서를 (대부분) 보존하는 compact `dict` 구현으로 전환하는 것에 대한 논의가 있었습니다. 그러나 명시적인 `__definition_order__`가 없다는 점은 여전히 어려운 문제로 남을 것입니다.

### 클래스 정의를 위한 “namespace” 키워드 인자 (A “namespace” Keyword Arg for Class Definition)

PEP 422는 클래스 정의에 새로운 "namespace" 키워드 인자를 도입했으며, 이는 `__prepare__()`의 필요성을 효과적으로 대체합니다. 그러나 이 제안은 더 간단한 PEP 487을 위해 철회되었습니다.

### `OrderedDict`로 `__prepare__()`를 구현하는 표준 라이브러리 메타클래스 (A stdlib Metaclass that Implements __prepare__() with OrderedDict)

이는 자신만의 메타클래스를 작성하는 것과 동일한 모든 문제를 가지고 있습니다. 유일한 장점은 이 메타클래스를 실제로 작성할 필요가 없다는 것입니다. 따라서 이 PEP의 맥락에서는 어떤 이점도 제공하지 않습니다.

### 컴파일 시 `__definition_order__` 설정 (Set __definition_order__ at Compile-time)

각 클래스의 `__qualname__`은 컴파일 시 결정됩니다. 이와 동일한 개념을 `__definition_order__`에 적용할 수 있었습니다. 컴파일 시 `__definition_order__`를 구성한 결과는 런타임에 수행하는 것과 거의 동일할 것입니다.

구현 난이도는 차치하고, 주요 차이점은 컴파일 시에는 클래스 본문에서 동적으로 설정되는 속성(예: `locals()[name] = value`)에 대한 정의 순서를 보존하는 것이 실용적이지 않다는 것입니다. 그러나 이러한 속성도 정의 순서에 반영되어야 합니다. 한 가지 가능한 해결책은 클래스 작성자가 동적으로 클래스 속성을 정의하는 경우 `__definition_order__`를 수동으로 설정하도록 요구하는 것입니다.

궁극적으로 런타임 또는 컴파일 시 `OrderedDict` 사용 여부는 거의 전적으로 구현 세부 사항입니다.

## 참조 (References)

*   [Original discussion](https://mail.python.org/pipermail/python-dev/2016-June/145150.html)
*   [Follow-up 1](https://mail.python.org/pipermail/python-dev/2016-June/145173.html)
*   [Follow-up 2](https://mail.python.org/pipermail/python-dev/2016-June/145214.html)
*   [Alyssa (Nick) Coghlan's concerns about mutability](https://mail.python.org/pipermail/python-dev/2016-June/145229.html)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.