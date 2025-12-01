---
title: "[Final] PEP 3115 - Metaclasses in Python 3000"
excerpt: "Python Enhancement Proposal 3115: 'Metaclasses in Python 3000'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3115/
toc: true
toc_sticky: true
date: 2025-09-27 14:22:47+0900
last_modified_at: 2025-09-27 14:22:47+0900
published: true
---
> **원문 링크:** [PEP 3115 - Metaclasses in Python 3000](https://peps.python.org/pep-3115/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 07-Mar-2007



**상태** : Final (최종)
**유형** : Standards Track (표준 트랙)
**작성자** : Talin
**생성일** : 2007년 3월 7일
**Python 버전** : 3.0
**수정 이력** : 2007년 3월 11일, 2007년 3월 14일

---

## 요약 (Abstract)

이 PEP는 메타클래스 선언을 위한 구문을 변경하고, 메타클래스를 사용하는 클래스가 구성되는 방식의 의미론을 수정할 것을 제안합니다.

## 도입 배경 (Rationale)

이 PEP에는 다소 미묘한 두 가지 도입 배경이 있습니다.

메타클래스 작동 방식을 변경하는 주된 이유는, 현재로서는 불가능한, 클래스 구성 프로세스 초기에 메타클래스가 개입해야 하는 흥미로운 사용 사례가 많기 때문입니다. 현재 메타클래스 메커니즘은 본질적으로 후처리 단계입니다. 클래스 데코레이터(Class Decorators)의 등장으로, 이러한 후처리 작업의 대부분은 데코레이터 메커니즘으로 대체될 수 있습니다.

특히, 클래스 멤버가 선언되는 순서를 보존하는 것이 유용한 중요한 사용 사례들이 있습니다. 일반적인 Python 객체는 멤버를 딕셔너리에 저장하며, 이때 순서는 중요하지 않고 멤버는 이름으로만 접근됩니다. 그러나 Python은 종종 멤버가 암묵적인 순서에 따라 구성되는 외부 시스템과 인터페이스하는 데 사용됩니다. 예를 들어 C 구조체(C structs), COM 객체 선언; ORM(객체 관계형 매핑)에서 사용되는 것과 같이 Python 클래스를 IDL (인터페이스 정의 언어) 또는 데이터베이스 스키마로 자동 변환하는 경우 등이 있습니다.

이러한 경우, Python 프로그래머가 클래스 멤버의 선언 순서를 사용하여 직접 이러한 순서를 지정하는 것이 유용할 것입니다. 현재는 이러한 순서가 다른 메커니즘을 사용하여 명시적으로 지정되어야 합니다 (예시는 `ctypes` 모듈을 참조하십시오).

불행히도, 메타클래스가 작동할 시점에는 이미 순서 정보가 손실되기 때문에, 메타클래스를 선언하는 현재 방법으로는 이를 허용하지 않습니다. 메타클래스가 클래스 구성 프로세스에 더 일찍 개입할 수 있도록 함으로써, 새로운 시스템은 구성의 순서 또는 다른 초기 아티팩트를 보존하고 검사할 수 있도록 합니다.

제안된 메타클래스 메커니즘은 선언 순서를 보존하는 것 외에도 여러 다른 흥미로운 사용 사례를 지원합니다. 한 가지 사용 사례는 클래스 구성 중에만 유효한 심볼(symbol)을 클래스 본문의 네임스페이스에 삽입하는 것입니다. 이에 대한 예시로는 클래스 멤버 생성에 사용되는 작은 함수인 "필드 생성자(field constructors)"가 있을 수 있습니다. 또 다른 흥미로운 가능성은 선행 참조(forward references), 즉 클래스 본문 아래에 선언된 Python 심볼에 대한 참조를 지원하는 것입니다.

다른, 더 약한 도입 배경은 순전히 외관상의 문제입니다. 메타클래스를 지정하는 현재 방법은 특별 변수 `__metaclass__`에 할당하는 것인데, 이는 일부 사람들에게는 미학적으로 이상적이지 않다고 여겨집니다. 다른 사람들은 그 의견에 강력히 반대합니다. 이 PEP는 미학적 논쟁이 논리적 증명으로 해결될 수 없으므로, 이 문제를 언급하는 것 외에는 다루지 않을 것입니다.

## 명세 (Specification)

새로운 모델에서는 메타클래스를 지정하는 구문이 베이스 클래스(base classes) 목록의 키워드 인자(keyword argument)를 통해 이루어집니다.

```python
class Foo(base1, base2, metaclass=mymeta):
    ...
```

추가 키워드도 이곳에 허용되며, 다음 예시처럼 메타클래스로 전달됩니다.

```python
class Foo(base1, base2, metaclass=mymeta, private=True):
    ...
```

이 PEP는 이러한 다른 키워드가 무엇이 될지 정의하려 하지 않습니다. 그것은 메타클래스 구현자의 결정에 달려 있습니다.

더 일반적으로, 클래스 정의에 전달되는 매개변수 목록은 이제 함수 호출의 모든 기능을 지원합니다. 이는 이제 클래스 베이스 목록에서 `*args` 및 `**kwargs` 스타일 인자를 사용할 수 있음을 의미합니다.

```python
class Foo(*bases, **kwds):
    ...
```

## 메타클래스 호출 (Invoking the Metaclass)

현재 메타클래스 시스템에서 메타클래스 객체는 호출 가능한(callable) 어떤 유형이라도 될 수 있습니다. 이는 변하지 않지만, 모든 새로운 기능을 완전히 활용하려면 메타클래스는 클래스 사전 구성(pre-construction) 중에 사용되는 추가 속성을 가져야 합니다.

이 속성의 이름은 `__prepare__`이며, 클래스 본문이 평가되기 전에 함수로 호출됩니다. `__prepare__` 함수는 두 개의 위치 인자(positional arguments)와 임의의 수의 키워드 인자를 받습니다. 두 개의 위치 인자는 다음과 같습니다.

*   `name`: 생성되는 클래스의 이름
*   `bases`: 베이스 클래스 목록

인터프리터는 `__prepare__`를 호출하기 전에 항상 그 존재 여부를 테스트합니다. 만약 존재하지 않는다면, 다음 Python 코드 조각에 나타난 것처럼 일반 딕셔너리(`dict`)가 사용됩니다.

```python
def prepare_class(name, *bases, metaclass=None, **kwargs):
    if metaclass is None:
        metaclass = compute_default_metaclass(bases)
    prepare = getattr(metaclass, '__prepare__', None)
    if prepare is not None:
        return prepare(name, bases, ** kwargs)
    else:
        return dict()
```

위 예시는 `class`에 대한 인자가 어떻게 해석되는지를 보여줍니다. 클래스 이름이 첫 번째 인자이며, 그 뒤에 임의 길이의 베이스 클래스 목록이 옵니다. 베이스 클래스 뒤에는 하나 이상의 키워드 인자가 올 수 있으며, 그 중 하나는 `metaclass`가 될 수 있습니다. `metaclass` 인자는 일반적인 매개변수 할당 알고리즘에 의해 필터링되므로 `kwargs`에 포함되지 않습니다. (또한 `metaclass`는 PEP 3102에 따라 키워드 전용 인자(keyword-only argument)입니다.)

`__prepare__`가 필수는 아니지만, 기본 메타클래스인 `type`은 `super()`를 통해 서브클래스가 이를 호출할 수 있도록 편의를 위해 이를 구현합니다.

`__prepare__`는 클래스 본문 평가 중에 클래스 멤버 정의를 저장하는 데 사용되는 딕셔너리 같은 객체를 반환합니다. 즉, 클래스 본문은 함수 블록으로 평가되지만 (지금과 동일하게), 로컬 변수 딕셔너리가 `__prepare__`에서 반환된 딕셔너리로 대체됩니다. 이 딕셔너리 객체는 일반 딕셔너리 또는 사용자 정의 매핑 유형이 될 수 있습니다.

이 딕셔너리 같은 객체는 전체 딕셔너리 인터페이스를 지원할 필요는 없습니다. 제한된 딕셔너리 연산 집합을 지원하는 딕셔너리는 클래스 본문 평가 중에 발생할 수 있는 작업 종류를 제한할 것입니다. 최소한의 구현은 딕셔너리에 값을 추가하고 검색하는 것만 지원할 수 있습니다. 대부분의 클래스 본문은 평가 중에 그 이상을 수행하지 않을 것입니다. 일부 클래스의 경우 삭제도 지원하는 것이 바람직할 수 있습니다. 많은 메타클래스는 나중에 이 딕셔너리의 복사본을 만들어야 하므로, 딕셔너리 내용을 읽어내기 위한 반복 또는 다른 수단도 유용할 수 있습니다.

`__prepare__` 메서드는 메타클래스 인스턴스 (즉, 클래스 자체)가 생성되기 전에 호출되므로, 인스턴스 메서드보다는 클래스 메서드(class method)로 구현되는 경우가 많습니다.

클래스 본문 평가가 완료되면, 메타클래스는 클래스 딕셔너리(class dictionary)와 함께 (호출 가능한 객체로서) 호출됩니다. 이는 현재 메타클래스 메커니즘과 다르지 않습니다.

일반적으로 메타클래스는 사용자 정의 딕셔너리 ( `dict`의 서브클래스 또는 `dict`를 감싸는 래퍼)를 생성하는데, 이 딕셔너리에는 클래스 본문 평가 전이나 평가 중에 설정되는 추가 속성이 포함됩니다. 그런 다음 두 번째 단계에서 메타클래스는 이러한 추가 속성을 사용하여 클래스를 더욱 사용자 정의할 수 있습니다.

예를 들어, 멤버 선언의 순서에 대한 정보를 사용하여 C 구조체를 생성하는 메타클래스가 있을 수 있습니다. 이 메타클래스는 단순히 삽입 순서를 기록하는 사용자 정의 딕셔너리를 제공할 것입니다. 이는 완전한 '정렬된 딕셔너리(ordered dict)' 구현이 아니라, 각 삽입에 대해 추가되는 (키, 값) 쌍의 Python 리스트일 수 있습니다.

이러한 경우 메타클래스는 중복 키의 가능성을 처리해야 하지만, 대부분의 경우 이는 사소한 문제입니다. 메타클래스는 첫 번째 선언을 사용하거나, 마지막 선언을 사용하거나, 어떤 방식으로든 결합하거나, 단순히 예외를 발생시킬 수 있습니다. 이러한 경우를 어떻게 처리할지는 메타클래스에 달려 있습니다.

## 예시 (Example)

다음은 선언된 순서대로 모든 클래스 멤버의 이름 목록을 생성하는 간단한 메타클래스 예시입니다.

```python
# 사용자 정의 딕셔너리
class member_table(dict):
    def __init__(self):
        self.member_names = []
    def __setitem__(self, key, value):
        # 키가 아직 정의되지 않았다면, 키 목록에 추가합니다.
        if key not in self:
            self.member_names.append(key)
        # 슈퍼클래스 dict.__setitem__을 호출합니다.
        dict.__setitem__(self, key, value)

# 메타클래스
class OrderedClass(type):
    # prepare 함수
    @classmethod
    def __prepare__(metacls, name, bases):
        # 이 경우 키워드는 없습니다.
        return member_table()

    # 메타클래스 호출
    def __new__(cls, name, bases, classdict):
        # 클래스 생성 후 멤버 이름을 계속 기록하지 않도록
        # superclass에 전달하기 전에 classdict를 일반 dict로 교체합니다.
        result = type.__new__(cls, name, bases, dict(classdict))
        result.member_names = classdict.member_names
        return result

class MyClass(metaclass=OrderedClass):
    # method1은 배열 요소 0에 들어갑니다.
    def method1(self):
        pass
    # method2는 배열 요소 1에 들어갑니다.
    def method2(self):
        pass
```

## 샘플 구현 (Sample Implementation)

Guido van Rossum은 새로운 기능을 구현하는 패치(patch)를 생성했습니다: [https://bugs.python.org/issue1681101](https://bugs.python.org/issue1681101)

## 대안 제안 (Alternate Proposals)

Josiah Carlson은 실제로 지정되는 것이 유형의 유형(type of the type)이라는 이론에 따라 'metaclass' 대신 'type'이라는 이름을 사용할 것을 제안했습니다. 기술적으로는 맞지만, 새로운 클래스를 생성하는 프로그래머 관점에서는 혼란스러울 수 있습니다. 애플리케이션 프로그래머 관점에서 관심 있는 'type'은 자신이 작성하는 클래스이며, 그 유형의 유형은 메타클래스입니다.

토론에서 메타클래스가 두 번 호출되는 '두 단계(two-phase)' 생성 프로세스, 즉 한 번은 클래스 딕셔너리를 생성하고 다른 한 번은 클래스를 '마무리'하는 방식에 대한 일부 반대가 있었습니다. 일부 사람들은 이 두 단계가 완전히 분리되어야 하며, 사용자 정의 딕셔너리를 지정하는 것과 메타클래스를 지정하는 것에 대한 별도의 구문이 있어야 한다고 생각했습니다. 그러나 대부분의 경우 이 둘은 밀접하게 연결되어 있으며, 메타클래스는 클래스 딕셔너리의 내부 세부 사항을 잘 알고 있을 가능성이 높습니다. 프로그래머에게 올바른 딕셔너리 유형과 올바른 메타클래스 유형이 함께 사용되도록 보장하도록 요구하는 것은 프로그래머에게 추가적이고 불필요한 부담을 줍니다.

또 다른 좋은 제안은 단순히 모든 클래스에 대해 정렬된 딕셔너리(`ordered dict`)를 사용하고 전체 '사용자 정의 딕셔너리(custom dict)' 메커니즘을 건너뛰는 것이었습니다. 이는 사용자 정의 딕셔너리의 대부분의 사용 사례가 순서 정보를 보존하는 목적이라는 관찰에 기반했습니다. 그러나 이 아이디어는 몇 가지 단점을 가지고 있습니다. 첫째, `ordered dict` 구현이 Python의 내장 유형(built-in types) 세트에 추가되어야 함을 의미하고, 둘째, 모든 클래스 선언에 약간의 속도(및 복잡성) 페널티를 부과할 것입니다. 나중에 여러 사람들이 필드 순서 지정을 제외한 사용자 정의 딕셔너리의 사용 사례에 대한 아이디어를 내놓았고, 이 아이디어는 철회되었습니다.

## 하위 호환성 (Backwards Compatibility)

기존 `__metaclass__` 구문을 그대로 둘 수도 있습니다. 또는 Py3K 변환 도구의 구문 규칙을 수정하여 이전 구문에서 새 구문으로 변환하는 것은 그리 어렵지 않을 것입니다.

## 참고 자료 (References)

*   [Python-3000] Py3K의 메타클래스 (원래 제안) [https://mail.python.org/pipermail/python-3000/2006-December/005030.html](https://mail.python.org/pipermail/python-3000/2006-December/005030.html)
*   [Python-3000] Py3K의 메타클래스 (Guido의 제안된 구문) [https://mail.python.org/pipermail/python-3000/2006-December/005033.html](https://mail.python.org/pipermail/python-3000/2006-December/005033.html)
*   [Python-3000] Py3K의 메타클래스 (두 단계 초기화에 대한 반대) [https://mail.python.org/pipermail/python-3000/2006-December/005108.html](https://mail.python.org/pipermail/python-3000/2006-December/005108.html)
*   [Python-3000] Py3K의 메타클래스 (항상 정렬된 딕셔너리 사용) [https://mail.python.org/pipermail/python-3000/2006-December/005118.html](https://mail.python.org/pipermail/python-3000/2006-December/005118.html)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.