---
title: "[Rejected] PEP 3133 - Introducing Roles"
excerpt: "Python Enhancement Proposal 3133: 'Introducing Roles'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3133/
toc: true
toc_sticky: true
date: 2025-09-27 14:33:16+0900
last_modified_at: 2025-09-27 14:33:16+0900
published: true
---
> **원문 링크:** [PEP 3133 - Introducing Roles](https://peps.python.org/pep-3133/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 01-May-2007


# PEP 3133 – 역할(Roles) 소개 (PEP 3133 – Introducing Roles)

*   **작성자:** Collin Winter
*   **상태:** 거부됨 (Rejected)
*   **유형:** 표준 트랙 (Standards Track)
*   **요구 사항:** PEP 3115, PEP 3129
*   **작성일:** 2007년 5월 1일
*   **Python 버전:** 3.0
*   **게시 이력:** 2007년 5월 13일

## 거부 공지 (Rejection Notice)

이 PEP는 PEP 3119를 더 건전하고 미니멀리스트적인 접근 방식으로 발전시키는 데 도움이 되었지만, PEP 3119의 최신 버전을 훨씬 선호합니다. - GvR (Guido van Rossum)

## 요약 (Abstract)

Python의 기존 객체 모델은 객체를 구현 방식에 따라 조직합니다. 하지만 특히 Python과 같은 덕 타이핑(duck typing) 기반 언어에서는 객체가 해당 부분을 어떻게 충족하는지(구현)보다는 더 큰 시스템에서 어떤 역할을 하는지(의도)에 따라 객체를 조직하는 것이 바람직한 경우가 많습니다. 이 PEP는 객체를 구현보다는 의도에 따라 조직하는 메커니즘인 '역할(roles)' 개념을 소개합니다.

## 배경 (Rationale)

처음에 객체는 프로그래머가 기능과 상태를 결합하고 다형성(polymorphism) 및 상속(inheritance)과 같은 개념을 통해 코드 재사용성을 높일 수 있도록 해주었으며, 이는 매우 좋은 것이었습니다. 그러나 상속과 다형성만으로는 부족한 시기가 왔습니다. 개(dogs)와 나무(trees)라는 두 가지 개념의 등장으로, 우리는 단순히 "짖는(bark) 것을 이해하는가?"를 아는 것만으로는 만족할 수 없게 되었습니다. 이제 우리는 주어진 객체가 "짖는다"는 것을 무엇을 의미한다고 생각하는지 알아야 할 필요가 생겼습니다.

여기서 자세히 설명하는 한 가지 해결책은 전통적인 클래스/인스턴스 시스템에 직교적(orthogonal)이며 상호 보완적인 메커니즘인 '역할'입니다. 클래스가 상태와 구현에 초점을 맞추는 반면, 역할 메커니즘은 주어진 클래스에 구현된 '행동(behaviours)'만을 다룹니다.

이 시스템은 원래 "traits"라고 불렸고 Squeak Smalltalk에서 구현되었습니다. 이후 Perl 6에서 "roles"라는 이름으로 채택되었으며, 주로 여기서 이 개념이 Python 3용으로 해석되었습니다. Python 3에서는 "roles"라는 이름을 유지할 예정이었습니다.

요컨대, 역할은 객체가 '무엇을 하는지'를 알려주고, 클래스는 객체가 '어떻게 하는지'를 알려줍니다. 이 PEP에서는 주어진 객체의 "짖는다"는 이해가 나무와 같은지 개와 같은지를 쉽게 결정할 수 있는 Python 3용 시스템을 제시할 것입니다. (더 심각한 예시들도 있을 수 있습니다.)

## 구문 관련 참고 사항 (A Note on Syntax)

이 PEP에 제시된 구문 제안들은 잠정적인 것이며 단순한 아이디어로 간주되어야 합니다. 이 PEP가 의존하는 필수적인 부분들, 즉 PEP 3115의 클래스 정의 구문과 PEP 3129의 클래스 데코레이터(class decorators)는 아직 공식화 중이며 변경될 수 있습니다. 함수 이름은 물론, 오랜 시간 동안 논쟁의 대상이 될 것입니다.

## 역할 수행 (Performing Your Role)

### 정적 역할 할당 (Static Role Assignment)

`Tree` 및 `Dog` 클래스를 정의하는 것부터 시작해 봅시다.

```python
class Tree(Vegetable):
    def bark(self):
        return self.is_rough()

class Dog(Animal):
    def bark(self):
        return self.goes_ruff()
```

두 클래스 모두 동일한 시그니처(signature)를 가진 `bark()` 메서드를 구현하지만, 완전히 다른 작업을 수행합니다. 우리가 기대하는 바를 구별할 수 있는 방법이 필요합니다. 상속과 간단한 `isinstance()` 테스트에 의존하는 것은 코드 재사용을 제한하거나, 모든 개와 유사한 클래스가 `Dog`에서 상속받도록 강제할 수 있습니다. 역할이 도움이 될 수 있는지 살펴보겠습니다.

```python
@perform_role(Doglike)
class Dog(Animal):
    ...

@perform_role(Treelike)
class Tree(Vegetable):
    ...

@perform_role(SitThere)
class Rock(Mineral):
    ...
```

우리는 PEP 3129의 클래스 데코레이터를 사용하여 특정 역할(들)을 클래스와 연결합니다. 이제 클라이언트 코드(client code)는 들어오는 객체가 `Doglike` 역할을 수행하는지 확인할 수 있으며, 이를 통해 `Wolf`, `LaughingHyena`, `Aibo` 인스턴스도 처리할 수 있습니다.

역할은 일반적인 상속을 통해 구성될 수 있습니다.

```python
@perform_role(Guard, MummysLittleDarling)
class GermanShepherd(Dog):
    def guard(self, the_precious):
        while True:
            if intruder_near(the_precious):
                self.growl()
    def get_petted(self):
        self.swallow_pride()
```

여기서 `GermanShepherd` 인스턴스는 세 가지 역할을 수행합니다. `Guard`와 `MummysLittleDarling`은 직접 적용되고, `Doglike`는 `Dog`로부터 상속됩니다.

### 런타임 역할 할당 (Assigning Roles at Runtime)

역할은 데코레이터가 제공하는 문법적 설탕(syntactic sugar)을 풀어서 런타임에도 할당할 수 있습니다.

다른 모듈에서 `Robot` 클래스를 가져왔다고 가정해 봅시다. `Robot`이 이미 `Guard` 인터페이스를 구현하고 있다는 것을 알고 있으므로, `Guard` 관련 코드와 잘 작동하도록 만들고 싶습니다.

```python
>>> perform(Guard)(Robot)
```

이것은 즉시 효력을 발휘하며 `Robot`의 모든 인스턴스에 영향을 미칩니다.

### 역할에 대해 질문하기 (Asking Questions About Roles)

로봇 군대에게 그들이 경비원(guards)이라고 말했다고 해서, 가끔 그들의 임무를 확인하고 싶을 것입니다.

```python
>>> performs(our_robot, Guard)
True
```

저기 저 로봇은 어떻습니까?

```python
>>> performs(that_robot_over_there, Guard)
True
```

`performs()` 함수는 주어진 객체가 주어진 역할을 수행하는지 묻는 데 사용됩니다. 그러나 클래스에 그 인스턴스가 역할을 수행하는지 묻는 데는 사용할 수 없습니다.

```python
>>> performs(Robot, Guard)
False
```

이는 `Robot` 클래스가 `Robot` 인스턴스와 상호 교환될 수 없기 때문입니다.

## 새 역할 정의 (Defining New Roles)

### 빈 역할 (Empty Roles)

역할은 일반 클래스처럼 정의되지만, `Role` 메타클래스(metaclass)를 사용합니다.

```python
class Doglike(metaclass=Role):
    ...
```

메타클래스는 `Doglike`가 5가 `int`이고 `tuple`이 `type`인 것과 같은 방식으로 `Role`임을 나타내는 데 사용됩니다.

### 상속을 통한 역할 구성 (Composing Roles via Inheritance)

역할은 다른 역할을 상속받을 수 있으며, 이는 역할을 구성하는 효과를 가집니다. 여기서 `Dog`의 인스턴스는 `Doglike`와 `FourLegs` 역할을 모두 수행할 것입니다.

```python
class FourLegs(metaclass=Role):
    pass

class Doglike(FourLegs, Carnivor):
    pass

@perform_role(Doglike)
class Dog(Mammal):
    pass
```

### 구체적인 메서드 요구 (Requiring Concrete Methods)

지금까지 우리는 빈 역할만을 정의했는데, 이는 그다지 유용하지 않습니다. 이제 `Doglike` 역할을 수행한다고 주장하는 모든 클래스가 `bark()` 메서드를 정의하도록 요구해 봅시다.

```python
class Doglike(FourLegs):
    def bark(self):
        pass
```

메서드를 "추상(abstract)"으로 표시하기 위해 데코레이터가 필요하지 않으며, 이 메서드는 절대로 호출되지 않을 것이므로 포함된 코드(있는 경우)는 무관합니다. 역할은 추상 메서드만 제공합니다. 구체적인 기본 구현은 믹스인(mixins)과 같은 다른, 더 적합한 메커니즘에 맡겨집니다.

역할을 정의하고 클래스가 해당 역할을 수행한다고 주장하면, 그 주장이 검증되는 것이 필수적입니다. 여기서는 프로그래머가 역할에 필요한 메서드 중 하나를 잘못 입력했습니다.

```python
@perform_role(FourLegs)
class Horse(Mammal):
    def run_like_teh_wind(self)
        ...
```

이는 역할 시스템이 `run_like_the_wind()` 메서드가 없다고 불평하며 예외(exception)를 발생시키게 할 것입니다. 역할 시스템은 클래스가 주어진 역할을 수행한다고 표시되는 즉시 이러한 검사를 수행합니다.

구체적인 메서드는 역할이 요구하는 시그니처와 정확히 일치해야 합니다. 여기서는 `bark()`의 구체적인 버전을 정의하여 역할을 충족시키려 했지만, 조금 어긋났습니다.

```python
@perform_role(Doglike)
class Coyote(Mammal):
    def bark(self, target=moon):
        pass
```

이 메서드의 시그니처는 `Doglike` 역할이 기대했던 것과 정확히 일치하지 않으므로, 역할 시스템은 약간 문제를 일으킬 것입니다.

## 메커니즘 (Mechanism)

다음은 Python에서 역할이 어떻게 표현될 수 있는지에 대한 아이디어입니다. 여기 예시들은 역할 메커니즘이 Python 인터프리터(interpreter)를 변경하지 않고도 구현될 수 있도록 구성되었습니다. (예시는 Curtis Poe의 Perl 6 역할에 대한 기사에서 각색되었습니다.)

### 정적 클래스 역할 할당 (Static class role assignment)

```python
@perform_role(Thieving)
class Elf(Character):
    ...
```

`perform_role()`은 여러 인수를 허용하므로 다음도 유효합니다.

```python
@perform_role(Thieving, Spying, Archer)
class Elf(Character):
    ...
```

`Elf` 클래스는 이제 `Thieving`, `Spying`, `Archer` 역할을 모두 수행합니다.

### 인스턴스 쿼리 (Querying instances)

```python
if performs(my_elf, Thieving):
    ...
```

`performs()`의 두 번째 인수는 `__contains__()` 메서드를 가진 무엇이든 될 수 있으므로 다음도 유효합니다.

```python
if performs(my_elf, set([Thieving, Spying, BoyScout])):
    ...
```

`isinstance()`와 마찬가지로, 객체는 표현식이 `True`가 되기 위해 세트(set) 중 단 하나의 역할만 수행하면 됩니다.

## 추상 기본 클래스(Abstract Base Classes)와의 관계 (Relationship to Abstract Base Classes)

이 PEP의 초기 초안은 역할을 PEP 3119에서 제안된 추상 기본 클래스와 경쟁하는 것으로 보았습니다. 추가 논의와 숙고 끝에, 다음과 같이 책임과 사용 사례의 타협 및 위임이 이루어졌습니다.

역할은 객체의 '의미론(semantics)'과 '추상적인 능력(abstract capabilities)'을 나타내는 방법을 제공합니다. 역할은 추상 메서드를 정의할 수 있지만, 이는 특정 의미론에 접근하는 인터페이스를 묘사하는 방법으로만 사용됩니다. `Ordering` 역할은 특정 정렬 연산자(ordering operators) 집합이 정의되도록 요구할 수 있습니다.

```python
class Ordering(metaclass=Role):
    def __ge__(self, other): pass
    def __le__(self, other): pass
    def __ne__(self, other): pass
    # ...and so on
```

이러한 방식으로, 우리는 특정 구현에 제약을 받거나 신경 쓰지 않고도 더 큰 시스템 내에서 객체의 역할이나 기능을 나타낼 수 있습니다.

이와 대조적으로, 추상 기본 클래스는 일반적이고 개별적인 구현 단위(discrete units of implementation)를 재사용하는 방법입니다. 예를 들어, 다른 연산자를 기반으로 여러 정렬 연산자를 구현하는 `OrderingMixin`을 정의할 수 있습니다.

```python
class OrderingMixin:
    def __ge__(self, other): return self > other or self == other
    def __le__(self, other): return self < other or self == other
    def __ne__(self, other): return not self == other
    # ...and so on
```

이 추상 기본 클래스—더 정확히는 구체적인 믹스인(concrete mixin)—를 사용하면 프로그래머는 제한된 연산자 집합을 정의하고 믹스인이 다른 연산자를 사실상 "파생"하도록 할 수 있습니다.

이 두 가지 직교적인 시스템을 결합함으로써, 우리는 a) 기능을 제공하고, b) 소비자 시스템에 이 기능의 존재와 가용성을 알릴 수 있습니다. 예를 들어, 위의 `OrderingMixin` 클래스는 `Ordering` 역할에서 표현된 인터페이스와 의미론을 만족시키므로, 우리는 믹스인이 해당 역할을 수행한다고 말합니다.

```python
@perform_role(Ordering)
class OrderingMixin:
    def __ge__(self, other): return self > other or self == other
    def __le__(self, other): return self < other or self == other
    def __ne__(self, other): return not self == other
    # ...and so on
```

이제 이 믹스인을 사용하는 모든 클래스는 자동으로—즉, 추가적인 프로그래머의 노력 없이—`Ordering` 역할을 수행하는 것으로 태그됩니다.

관심사를 두 개의 별개의 직교 시스템으로 분리하는 것은 각 시스템을 개별적으로 사용할 수 있도록 해주기 때문에 바람직합니다. 예를 들어, 해시 값(hash value)을 결정할 때 내용을 고려하는 컨테이너임을 나타내는 `RecursiveHash` 역할을 제공하는 타사 패키지를 생각해 봅시다. Python의 내장 `tuple` 및 `frozenset` 클래스는 이 의미론을 따르므로, `RecursiveHash` 역할을 이들에게 적용할 수 있습니다.

```python
>>> perform_role(RecursiveHash)(tuple)
>>> perform_role(RecursiveHash)(frozenset)
```

이제 `RecursiveHash` 객체를 사용하는 모든 코드는 `tuple`과 `frozenset`도 사용할 수 있게 됩니다.

## 미해결 문제 (Open Issues)

### 인스턴스가 클래스와 다른 역할을 수행하도록 허용 (Allowing Instances to Perform Different Roles Than Their Class)

Perl 6는 인스턴스가 클래스와 다른 역할을 수행하는 것을 허용합니다. 이러한 변경 사항은 단일 인스턴스에 국한되며 클래스의 다른 인스턴스에는 영향을 미치지 않습니다. 예를 들어:

```perl
my_elf = Elf();
my_elf.goes_on_quest();
my_elf.becomes_evil();
now_performs(my_elf, Thieving); # Only this one elf is a thief
my_elf.steals(["purses", "candy", "kisses"]);
```

Perl 6에서는 인스턴스의 원래 부모로부터 상속받고 추가 역할(들)을 수행하는 익명 클래스(anonymous class)를 생성하여 이를 수행합니다. 이는 Python 3에서도 가능하지만, 바람직한지는 또 다른 문제입니다.

이 기능을 포함하면 물론 Charles Dickens의 작품을 Python으로 표현하는 것이 훨씬 쉬워질 것입니다.

```python
>>> from literature import role, BildungsRoman
>>> from dickens import Urchin, Gentleman
>>>
>>> with BildungsRoman() as OliverTwist:
...     mr_brownlow = Gentleman()
...     oliver, artful_dodger = Urchin(), Urchin()
...     now_performs(artful_dodger, [role.Thief, role.Scoundrel])
...
...     oliver.has_adventures_with(ArtfulDodger)
...     mr_brownlow.adopt_orphan(oliver)
...     now_performs(oliver, role.RichWard)
```

### 속성 요구 (Requiring Attributes)

Neal Norwitz는 메서드를 요구하는 것과 동일한 메커니즘을 사용하여 속성(attributes)의 존재에 대한 주장을 할 수 있는 기능을 요청했습니다. 역할은 클래스 정의 시점에 효력을 발휘하고, 대다수의 속성은 클래스의 `__init__()` 메서드에 의해 런타임에 정의되기 때문에, 메서드와 동시에 속성을 확인하는 좋은 방법은 없는 것 같습니다.

단지 문서화 목적이라도, 강제되지 않는 속성(non-enforced attributes)을 역할 정의에 포함하는 것이 여전히 바람직할 수 있습니다.

### 역할의 역할 (Roles of Roles)

제안된 의미론에 따르면, 역할도 자신만의 역할을 가질 수 있습니다.

```python
@perform_role(Y)
class X(metaclass=Role):
    ...
```

이것은 가능하지만, 역할은 일반적으로 인스턴스화되지 않기 때문에 의미가 없습니다. 이 표현에 의미를 부여하는 것에 대한 오프라인 논의가 있었지만, 아직 좋은 아이디어가 나오지 않았습니다.

### `class_performs()`

현재 클래스가 그 인스턴스가 특정 역할을 수행하는지 묻는 것은 불가능합니다. `performs()`의 아날로그를 제공하여 다음과 같이 만들 수 있습니다.

```python
>>> isinstance(my_dwarf, Dwarf)
True
>>> performs(my_dwarf, Surly)
True
>>> performs(Dwarf, Surly)
False
>>> class_performs(Dwarf, Surly)
True
```

### 더 예쁜 동적 역할 할당 구문 (Prettier Dynamic Role Assignment Syntax)

이 PEP의 초기 초안에는 클래스에 동적으로 역할을 할당하는 별도의 메커니즘이 포함되어 있었습니다. 이는 다음과 같이 표현되었습니다.

```python
>>> now_perform(Dwarf, GoldMiner)
```

이 동일한 기능은 데코레이터가 제공하는 문법적 설탕을 풀어서 이미 존재합니다.

```python
>>> perform_role(GoldMiner)(Dwarf)
```

동적 역할 할당이 전용 표현을 정당화할 만큼 충분히 중요한지 여부가 문제입니다.

### 구문 지원 (Syntax Support)

이 PEP에 제시된 표현 방식은 역할 시스템이 독립형 패키지(stand-alone package)로 제공될 수 있도록 설계되었지만, 역할을 정의, 할당 및 쿼리하는 특수 구문을 추가하는 것이 바람직할 수 있습니다. 한 가지 예는 `role` 키워드일 수 있으며, 이는 다음을 변환할 것입니다.

```python
class MyRole(metaclass=Role):
    ...
```

다음으로:

```python
role MyRole:
    ...
```

역할 할당은 PEP 3115에서 제안된 클래스 정의 인수를 활용할 수 있습니다.

```python
class MyClass(performs=MyRole):
    ...
```

## 구현 (Implementation)

참조 구현(reference implementation)이 곧 나올 예정입니다.

## 감사 (Acknowledgements)

역할과 추상 기본 클래스 간의 차이점, 중복, 미묘한 지점들을 해결하기 위해 여러 시간 동안 직접 논의해준 Jeffery Yasskin, Talin, Guido van Rossum에게 감사합니다.

## 참조 (References)

*   <http://en.wikipedia.org/wiki/AIBO>
*   <http://www.perlmonks.org/?node_id=384858>
*   <http://dev.perl.org/perl6/doc/design/syn/S12.html>
*   <http://www.iam.unibe.ch/~scg/Archive/Papers/Scha03aTraits.pdf>
*   <https://mail.python.org/pipermail/python-3000/2007-April/007026.html>

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.