---
title: "[Withdrawn] PEP 359 - The “make” Statement"
excerpt: "Python Enhancement Proposal 359: 'The “make” Statement'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/359/
toc: true
toc_sticky: true
date: 2025-09-26 19:06:53+0900
last_modified_at: 2025-09-26 19:06:53+0900
published: true
---
> **원문 링크:** [PEP 359 - The “make” Statement](https://peps.python.org/pep-0359/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 05-Apr-2006

PEP 359 – "make" Statement

**작성자:** Steven Bethard <steven.bethard at gmail.com>
**상태:** 철회됨 (Withdrawn)
**유형:** 표준 트랙 (Standards Track)
**생성일:** 2006년 4월 5일
**Python 버전:** 2.6
**이력:** 2006년 4월 5일, 2006년 4월 6일, 2006년 4월 13일

---

## 개요 (Abstract)

이 PEP는 `class` 선언 구문의 일반화인 `make` 문을 제안합니다. 제안된 구문과 의미는 `class` 정의 구문과 유사하며 다음과 같습니다.

```python
make <callable> <name> <tuple>:
    <block>
```

이것은 다음 할당으로 변환됩니다.

```python
<name> = <callable>("<name>", <tuple>, <namespace>)
```

여기서 `<namespace>`는 `<block>`을 실행하여 생성된 `dict`입니다. 이는 대부분 다음 구문의 신택스 슈거(syntactic sugar)입니다.

```python
class <name> <tuple>:
    __metaclass__ = <callable>
    <block>
```

그리고 `class`가 아닌 다른 객체가 생성될 때, 해당 문의 의도를 더 명확하게 표현하는 데 도움을 주려는 목적을 가집니다. 물론 이러한 문장에 대한 다른 구문도 가능하지만, `class` 문과 강력한 유사성을 유지함으로써 `class`와 메타클래스(metaclass)가 작동하는 방식에 대한 이해가 `make` 문이 작동하는 방식에 대한 이해로 이어지기를 기대합니다.

이 PEP는 `python-dev` 메일링 리스트에서 Michele Simionato의 제안을 기반으로 합니다.

## 철회 고지 (Withdrawal Notice)

이 PEP는 Guido의 요청에 따라 철회되었습니다. Guido는 이 제안을 마음에 들어 하지 않았으며, 특히 `property` 활용 사례가 `property`의 인스턴스 메서드를 다른 인스턴스 메서드와 다른 수준에 놓게 하고 `property` 함수에 고정된 이름을 요구하는 방식을 좋아하지 않았습니다.

## 동기 (Motivation)

`class` 문은 Python에 두 가지 훌륭한 기능을 제공합니다.

1.  일련의 문장들을 실행하고 그 결과로 생성된 바인딩(bindings)을 `dict` 형태로 메타클래스에 제공합니다.
2.  생성될 `class`가 자신이 할당될 이름을 알 수 있도록 하여 DRY(Don't Repeat Yourself) 원칙을 장려합니다.

따라서 다음과 같은 간단한 `class` 문에서:

```python
class C(object):
    x = 1
    def foo(self):
        return 'bar'
```

메타클래스(`type`)는 다음과 유사한 형태로 호출됩니다:

```python
C = type('C', (object,), {'x':1, 'foo':<function foo at ...>})
```

`class` 문은 위 할당 문의 단순한 신택스 슈거(syntactic sugar)에 불과하지만, 분명 매우 유용한 종류의 신택스 슈거입니다. 이는 `C`의 반복을 피할 뿐만 아니라, 일련의 문장으로 표현될 수 있도록 하여 `dict` 생성을 단순화합니다.

역사적으로 `type` 인스턴스(클래스 객체)만이 이러한 종류의 구문 지원을 받았습니다. `make` 문은 이러한 지원을 구문이 유용할 수 있는 다른 종류의 객체로 확장하는 것을 목표로 합니다.

### 예시: 단순한 네임스페이스 (simple namespaces)

모듈에 다음과 같이 접근하는 속성들이 있다고 가정해 봅시다:

```python
mod.thematic_roletype
mod.opinion_roletype
mod.text_format
mod.html_format
```

"네임스페이스는 정말 멋진 아이디어"이므로, 이 속성들을 다음과 같이 접근할 수 있기를 원합니다:

```python
mod.roletypes.thematic
mod.roletypes.opinion
mod.format.text
mod.format.html
```

현재 두 가지 주요 선택지가 있습니다:

1.  모듈을 패키지로, `roletypes`와 `format`을 서브모듈로 바꾸고, 속성들을 서브모듈로 옮깁니다.
2.  `roletypes`와 `format` 클래스를 만들고, 속성들을 클래스로 옮깁니다.

전자는 상당한 리팩토링(refactoring) 작업이며, 내용이 거의 없는 두 개의 작은 모듈을 생성합니다. 후자는 속성들을 모듈 내부에 유지하지만, 인스턴스를 생성할 의도가 전혀 없는 클래스를 만듭니다.

이러한 상황에서, 몇몇 속성을 담을 "네임스페이스"를 간단히 선언할 수 있다면 좋을 것입니다. 새로운 `make` 문을 사용하면 다음과 같이 새로운 네임스페이스를 도입할 수 있습니다:

```python
make namespace roletypes:
    thematic = ...
    opinion = ...
make namespace format:
    text = ...
    html = ...
```

이렇게 하면 인스턴스화할 의도가 없는 클래스를 만들지 않고도 속성들을 모듈 내부에 유지할 수 있습니다. 이를 가능하게 하는 `namespace`의 정의는 다음과 같습니다:

```python
class namespace(object):
    def __init__(self, name, args, kwargs):
        self.__dict__.update(kwargs)
```

이 정의에 따라 위의 `make` 문들이 끝날 때, `roletypes`와 `format`은 `namespace` 인스턴스가 될 것입니다.

### 예시: GUI 객체 (GUI objects)

GUI 툴킷에서 프레임(frames)이나 패널(panels)과 같은 객체는 종종 속성과 함수에 연결됩니다. `make` 문을 사용하면 다음과 같았던 코드를:

```python
root = Tkinter.Tk()
frame = Tkinter.Frame(root)
frame.pack()
def say_hi():
    print "hi there, everyone!"
hi_there = Tkinter.Button(frame, text="Hello", command=say_hi)
hi_there.pack(side=Tkinter.LEFT)
root.mainloop()
```

버튼의 함수를 선언과 함께 그룹화하도록 다음과 같이 재작성할 수 있습니다:

```python
root = Tkinter.Tk()
frame = Tkinter.Frame(root)
frame.pack()
make Tkinter.Button hi_there(frame):
    text = "Hello"
    def command():
        print "hi there, everyone!"
hi_there.pack(side=Tkinter.LEFT)
root.mainloop()
```

### 예시: 사용자 정의 디스크립터 (custom descriptors)

디스크립터(descriptor)는 속성에 대한 접근을 커스터마이징하는 데 사용되므로, 해당 속성의 이름을 아는 것이 유용할 때가 많습니다. 현재 Python은 이 이름을 쉽게 찾을 수 있는 방법을 제공하지 않으므로, Ian Bicking의 `setonce` 디스크립터와 같은 많은 사용자 정의 디스크립터들은 어떻게든 이 문제를 해결해야 합니다. `make` 문을 사용하면 다음과 같이 `setonce` 속성을 만들 수 있습니다:

```python
class A(object):
    ...
    make setonce x:
        "A's x attribute"
    ...
```

여기서 `setonce` 디스크립터는 다음과 같이 정의될 수 있습니다:

```python
class setonce(object):
    def __init__(self, name, args, kwargs):
        self._name = '_setonce_attr_%s' % name
        self.__doc__ = kwargs.pop('__doc__', None)
    def __get__(self, obj, type=None):
        if obj is None:
            return self
        return getattr(obj, self._name)
    def __set__(self, obj, value):
        try:
            getattr(obj, self._name)
        except AttributeError:
            setattr(obj, self._name, value)
        else:
            raise AttributeError("Attribute already set")
    def set(self, obj, value):
        setattr(obj, self._name, value)
    def __delete__(self, obj):
        delattr(obj, self._name)
```

원래 구현과 달리, 프라이빗 속성 이름이 디스크립터의 이름을 사용하기 때문에 안정적이며, 따라서 `class A`의 인스턴스는 `pickle` 가능합니다.

### 예시: `property` 네임스페이스 (property namespaces)

Python의 `property` 타입은 세 개의 함수 인자와 하나의 독스트링(docstring) 인자를 받는데, 이들은 `property` 자체와만 관련이 있지만, `property`를 호출하기 전에 선언된 다음 인자로 전달되어야 합니다. 예를 들어:

```python
class C(object):
    ...
    def get_x(self):
        ...
    def set_x(self):
        ...
    x = property(get_x, set_x, "the x of the frobulation")
```

이 문제는 이전에 제기되었으며, Guido와 다른 사람들은 `property` 선언을 더 쉽게 만들기 위한 대체 `property` 구문에 대해 간략하게 언급했습니다. `make` 문을 사용하면 다음 구문이 지원될 수 있습니다:

```python
class C(object):
    ...
    make block_property x:
        '''The x of the frobulation'''
        def fget(self):
            ...
        def fset(self):
            ...
```

`block_property`의 정의는 다음과 같습니다:

```python
def block_property(name, args, block_dict):
    fget = block_dict.pop('fget', None)
    fset = block_dict.pop('fset', None)
    fdel = block_dict.pop('fdel', None)
    doc = block_dict.pop('__doc__', None)
    assert not block_dict
    return property(fget, fset, fdel, doc)
```

### 예시: 인터페이스 (interfaces)

Guido와 다른 사람들은 가끔 Python에 인터페이스를 도입할 것을 제안했습니다. 대부분의 제안은 다음과 같은 구문을 제시했습니다:

```python
interface IFoo:
    """Foo blah blah"""
    def fumble ( name, count ):
        """docstring"""
```

그러나 Python에서 이러한 방식으로 인터페이스를 선언할 방법이 현재 없기 때문에, 대부분의 Python 인터페이스 구현은 대신 클래스 객체를 사용합니다. 예를 들어 Zope의 경우:

```python
class IFoo(Interface):
    """Foo blah blah"""
    def fumble(name, count):
        """docstring"""
```

새로운 `make` 문을 사용하면 이러한 인터페이스를 대신 다음과 같이 선언할 수 있습니다:

```python
make Interface IFoo:
    """Foo blah blah"""
    def fumble(name, count):
        """docstring"""
```

이는 (이것이 클래스가 아닌 인터페이스라는) 의도를 훨씬 더 명확하게 만듭니다.

## 명세 (Specification)

Python은 `make` 문을:

```python
make <callable> <name> <tuple>:
    <block>
```

다음 할당으로 변환합니다:

```python
<name> = <callable>("<name>", <tuple>, <namespace>)
```

여기서 `<namespace>`는 `<block>`을 실행하여 생성된 `dict`입니다. `<tuple>` 표현식은 선택 사항입니다. 만약 존재하지 않으면 빈 튜플이 가정됩니다.

이러한 의미론을 구현하는 패치를 사용할 수 있습니다.

`make` 문은 새로운 키워드 `make`를 도입합니다. 따라서 Python 2.6에서는 `make` 문을 `from __future__ import make_statement`를 사용하여 활성화해야 합니다.

## 미해결 과제 (Open Issues)

### 키워드 (Keyword)

`make` 키워드가 너무 많은 코드를 손상시키지는 않을까요? 원래 `make` 문은 `create` 키워드(Alyssa Coghlan의 제안)를 사용했습니다. 그러나 표준 라이브러리 및 Zope+Plone 코드에 대한 조사를 통해 `create`가 훨씬 더 많은 코드를 손상시킬 것이라는 사실이 밝혀져 대신 `make`가 키워드로 채택되었습니다. 그러나 `make`가 코드를 손상시킬 수 있는 몇 가지 인스턴스가 여전히 있습니다. 이 문에 더 나은 키워드가 있을까요?

일부 가능한 키워드와 표준 라이브러리(및 일부 설치된 패키지)에서의 사용 횟수는 다음과 같습니다:

*   `make` - 2회 (모두 테스트에서)
*   `create` - 19회 (`imaplib`의 기존 함수 포함)
*   `build` - 83회 (`distutils.command.build`의 기존 클래스 포함)
*   `construct` - 0회
*   `produce` - 0회

### 대체 생성자로서의 `make` 문 (The make-statement as an alternate constructor)

현재 (name, args, kwargs) 시그니처를 가진 함수는 많지 않습니다. 이는 다음과 같은 작업이 현재 불가능하다는 것을 의미합니다:

```python
make dict params:
    x = 1
    y = 2
```

`dict` 생성자가 다른 시그니처를 가지고 있기 때문입니다. 이러한 종류의 지원이 필요할까요? Carl Banks의 한 가지 제안은 `__call__` 대신 호출될 경우 `__make__`라는 매직 메서드를 추가하는 것이었습니다. `type`의 경우 `__make__` 메서드는 `__call__`과 동일하여 불필요하겠지만, `dict`는 다음과 같은 `__make__` 메서드를 `dict` 타입에 정의하여 `make` 문을 지원할 수 있습니다:

```python
def __make__(cls, name, args, kwargs):
    return cls(**kwargs)
```

물론, 또 다른 매직 메서드를 추가하는 대신, `dict` 타입은 `dict.fromblock`과 같은 클래스 메서드를 가질 수 있으며, 이는 다음과 같이 사용될 수 있습니다:

```python
make dict.fromblock params:
    x = 1
    y = 2
```

따라서 질문은 많은 타입이 `make` 문을 대체 생성자로 사용하고 싶어할 것인가? 그리고 그렇다면, 그 대체 생성자가 원래 생성자와 동일한 이름을 가질 필요가 있는가? 입니다.

### 블록이 실행되는 `dict` 사용자 정의 (Customizing the dict in which the block is executed)

`make` 문 사용자가 코드가 실행되는 `dict` 객체를 결정할 수 있어야 할까요? 이는 일반적인 `dict` 객체가 충분하지 않은 상황, 예를 들어 순서와 반복되는 이름이 허용되어야 하는 경우에 `make` 문을 사용할 수 있게 할 것입니다. 이러한 종류의 사용자 정의를 허용하면 XML을 요소 이름을 반복하지 않고, `make` 문의 중첩이 XML 요소의 중첩에 해당하도록 작성할 수 있습니다:

```python
make Element html:
    make Element body:
        text('before first h1')
        make Element h1:
            attrib(style='first')
            text('first h1')
            tail('after first h1')
        make Element h1:
            attrib(style='second')
            text('second h1')
            tail('after second h1')
```

만약 `make` 문이 콜러블(callable)의 `__make_dict__` 메서드를 호출하여 블록을 실행할 `dict`를 가져오려고 시도한다면, 다음 코드를 통해 `make` 문을 위와 같이 사용할 수 있습니다:

```python
class Element(object):
    class __make_dict__(dict):
        def __init__(self, *args, **kwargs):
            self._super = super(Element.__make_dict__, self)
            self._super.__init__(*args, **kwargs)
            self.elements = []
            self.text = None
            self.tail = None
            self.attrib = {}
        def __getitem__(self, name):
            try:
                return self._super.__getitem__(name)
            except KeyError:
                if name in ['attrib', 'text', 'tail']:
                    return getattr(self, 'set_%s' % name)
                else:
                    return globals()[name]
        def __setitem__(self, name, value):
            self._super.__setitem__(name, value)
            self.elements.append(value)
        def set_attrib(self, **kwargs):
            self.attrib = kwargs
        def set_text(self, text):
            self.text = text
        def set_tail(self, text):
            self.tail = text
        def __new__(cls, name, args, edict):
            get_element = etree.ElementTree.Element
            result = get_element(name, attrib=edict.attrib)
            result.text = edict.text
            result.tail = edict.tail
            for element in edict.elements:
                result.append(element)
            return result
```

그러나 이 코드는 다소 취약하다는 점에 유의해야 합니다. `attrib`, `text`, `tail`을 네임스페이스에 마법처럼 채워야 하며, `make` 문 본문 내의 모든 이름 바인딩이 `Element`를 생성한다고 가정합니다. 현재 상태로는 `for` 루프가 `make` 문 본문에 도입되면 이 코드는 깨질 것입니다. 왜냐하면 `for` 루프는 `Element`가 아닌 객체에 이름을 바인딩할 것이기 때문입니다. 이는 `isinstance` 확인 또는 속성 검사와 같은 것을 추가하여 해결할 수 있지만, 여전히 다소 취약한 솔루션으로 이어집니다.

또한 `with` 문이 훨씬 더 명시적인 구문으로 동등한 중첩을 제공할 수 있다는 점도 지적되었습니다:

```python
with Element('html') as html:
    with Element('body') as body:
        body.text = 'before first h1'
        with Element('h1', style='first') as h1:
            h1.text = 'first h1'
            h1.tail = 'after first h1'
        with Element('h1', style='second') as h1:
            h1.text = 'second h1'
            h1.tail = 'after second h1'
```

그리고 여기서 요소 이름의 반복이 DRY 원칙에 너무 많이 위배된다면, `Element`에 몇 가지 메서드를 추가하여 첫 번째를 제외한 모든 `as` 절을 제거할 수도 있습니다.

그렇다면 다른 타입의 `dict`에서 블록을 실행하는 실제 사용 사례가 있을까요? 그리고 그렇다면, `make` 문이 이를 지원하도록 확장되어야 할까요?

## 선택적 확장 (Optional Extensions)

### `make` 키워드 제거 (Remove the make keyword)

`make` 키워드를 제거하여, 이러한 문장이 호출될 콜러블로 시작하도록 할 수도 있습니다. 예를 들어:

```python
namespace ns:
    badger = 42
    def spam():
        ...
interface C(...):
    ...
```

그러나 거의 모든 다른 Python 문장은 키워드로 시작하며, 키워드를 제거하면 문서에서 이 구조를 찾아보기 어려워질 것입니다. 또한, 이는 문법에 약간의 복잡성을 추가할 것이고, 현재까지 저(Steven Bethard)는 키워드 없이 이 기능을 구현할 수 없었습니다.

### Python 3000에서 `__metaclass__` 제거 (Removing __metaclass__ in Python 3000)

`make` 문의 일반성의 부작용으로, 이 문은 `class` 객체에서 `__metaclass__` 속성의 필요성을 대부분 없앱니다. 따라서 Python 3000에서는 다음 대신:

```python
class <name> <bases-tuple>:
    __metaclass__ = <metaclass>
    <block>
```

메타클래스는 `make` 문에서 메타클래스를 콜러블로 사용하여 지원될 수 있습니다:

```python
make <metaclass> <name> <bases-tuple>:
    <block>
```

`__metaclass__` 훅을 제거하면 `BUILD_CLASS` opcode를 약간 단순화할 수 있습니다.

### Python 3000에서 `class` 문 제거 (Removing class statements in Python 3000)

`make` 문을 가장 극단적으로 적용하면, `class` 문 자체가 `make type` 문으로 대체되어 더 이상 사용되지 않을 수도 있습니다.

## 참고 자료 (References)

 Michele Simionato의 원본 제안 (https://mail.python.org/pipermail/python-dev/2005-October/057435.html)
 Guido의 철회 요청 (https://mail.python.org/pipermail/python-3000/2006-April/000936.html)
 Ian Bicking의 `setonce` 디스크립터 (http://blog.ianbicking.org/easy-readonly-attributes.html)
 Guido의 `property` 구문 고찰 (https://mail.python.org/pipermail/python-dev/2005-October/057404.html)
 네임스페이스 기반 `property` 레시피 (http://aspn.activestate.com/ASPN/Cookbook/Python/Recipe/442418)
 Python 인터페이스 (http://www.artima.com/weblogs/viewpost.jsp?thread=86641)
 Make Statement 패치 (http://ucsu.colorado.edu/~bethard/py/make_statement.patch)
 표준 라이브러리 내 `create` 인스턴스 (https://mail.python.org/pipermail/python-list/2006-April/335159.html)
 Zope+Plone 내 `create` 인스턴스 (https://mail.python.org/pipermail/python-list/2006-April/335284.html)
 `with` 문 XML에서 `as` 절 제거 (https://mail.python.org/pipermail/python-list/2006-April/336774.html)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

---

PEP 359 – "make" 문은 `class` 선언 구문을 일반화하여, `class`가 아닌 다른 객체를 생성할 때의 의도를 더 명확하게 표현하고자 제안된 구문입니다. 이 제안은 `make <callable> <name> <tuple>: <block>` 형태를 가지며, 이는 `<name> = <callable>("<name>", <tuple>, <namespace>)`와 같은 할당으로 변환됩니다. 여기서 `<namespace>`는 `<block>`을 실행하여 생성된 `dict`입니다.

**주요 제안 내용 및 도입 배경:**

*   **`class` 문의 일반화:** 기존 `class` 문이 `type` 인스턴스(클래스 객체)만을 위한 신택스 슈거(syntactic sugar) 역할을 했던 것과 달리, `make` 문은 `class` 외의 다양한 객체 생성에도 유사한 구문적 지원을 제공하고자 했습니다. `class` 문은 블록 내의 문장들을 실행하고 그 바인딩을 `dict`로 메타클래스에 제공하며, 생성될 클래스가 자신의 이름을 알 수 있도록 하여 DRY(Don't Repeat Yourself) 원칙을 장려합니다. `make` 문은 이러한 이점을 다른 객체 생성에도 확장하려 했습니다.
*   **다양한 활용 사례:**
    *   **단순 네임스페이스:** 인스턴스화할 필요 없는 속성 그룹을 명확하게 정의하는 데 사용될 수 있습니다. `make namespace roletypes: ...`와 같은 방식으로, 불필요한 클래스 생성을 피하고 모듈 내부에 속성을 유지할 수 있습니다.
    *   **GUI 객체:** `Tkinter.Button`과 같은 GUI 위젯의 속성 및 콜백 함수를 선언과 함께 그룹화하여 가독성을 높일 수 있습니다.
    *   **사용자 정의 디스크립터:** 디스크립터가 자신이 적용될 속성의 이름을 쉽게 알 수 있도록 하여, `setonce` 디스크립터와 같이 속성 이름을 기반으로 동작하는 코드를 더 견고하게 만들 수 있습니다.
    *   **`property` 네임스페이스:** `property`의 `fget`, `fset` 등 관련 함수와 독스트링을 `property` 선언 블록 안에 직접 포함시켜 `property` 정의를 단순화합니다.
    *   **인터페이스 선언:** 클래스가 아닌 인터페이스임을 명확히 나타내기 위해 `make Interface IFoo: ...`와 같은 구문으로 인터페이스를 선언할 수 있도록 합니다.

**철회 및 Python 사용에 미치는 영향:**

이 PEP는 Guido van Rossum의 요청에 따라 철회되었습니다. Guido는 `property` 사용 사례에서 인스턴스 메서드가 다른 메서드와 다른 수준에 놓이는 점과 `property` 함수에 고정된 이름이 요구되는 점 등을 비판했습니다.

따라서 `make` 문은 Python 언어에 도입되지 않았으며, 현재 Python 개발에 직접적인 영향을 미치지 않습니다. 제안된 `make` 문이 의도했던 일부 사용 사례는 `with` 문이나 클래스 데코레이터, 그리고 명시적인 객체 생성 함수 등을 통해 다른 방식으로 해결되고 있습니다. 특히, `with` 문은 XML 요소 중첩과 같은 구조적 표현에서 `make` 문보다 더 명시적이고 견고한 대안으로 제시되기도 했습니다.

**미해결 과제 (철회 전 논의):**

*   **키워드:** `make` 키워드가 기존 코드와 충돌할 가능성에 대한 우려가 있었습니다. `create`, `build` 등의 다른 키워드도 검토되었으나, 각각의 충돌 가능성 때문에 `make`가 선택되었으나 여전히 논의의 여지가 있었습니다.
*   **대체 생성자:** `make` 문이 `dict`와 같은 내장 타입의 대체 생성자로 사용될 수 있는지, 그리고 이를 위해 `__make__`와 같은 새로운 매직 메서드가 필요한지에 대한 논의가 있었습니다.
*   **블록 실행 `dict` 사용자 정의:** `make` 문 내부 블록이 실행될 `dict` 객체를 사용자가 지정할 수 있도록 할지에 대한 논의가 있었으며, 이는 XML과 같은 복잡한 구조를 생성하는 데 유용할 수 있지만, 구현의 복잡성과 취약성 문제가 제기되었습니다.

이 PEP는 Python 언어 디자인의 다양한 측면, 특히 `class` 구문의 유연성과 확장성에 대한 심도 있는 논의를 보여주었지만, 최종적으로 언어에 통합되지는 못했습니다.

`__metaclass__` 훅을 제거하면 `BUILD_CLASS` opcode를 약간 단순화할 수 있습니다.

### Python 3000에서 `class` 문 제거 (Removing class statements in Python 3000)

`make` 문을 가장 극단적으로 적용하면, `class` 문 자체가 `make type` 문으로 대체되어 더 이상 사용되지 않을 수도 있습니다.

## 참고 자료 (References)

 Michele Simionato의 원본 제안 (https://mail.python.org/pipermail/python-dev/2005-October/057435.html)
 Guido의 철회 요청 (https://mail.python.org/pipermail/python-3000/2006-April/000936.html)
 Ian Bicking의 `setonce` 디스크립터 (http://blog.ianbicking.org/easy-readonly-attributes.html)
 Guido의 `property` 구문 고찰 (https://mail.python.org/pipermail/python-dev/2005-October/057404.html)
 네임스페이스 기반 `property` 레시피 (http://aspn.activestate.com/ASPN/Cookbook/Python/Recipe/442418)
 Python 인터페이스 (http://www.artima.com/weblogs/viewpost.jsp?thread=86641)
 Make Statement 패치 (http://ucsu.colorado.edu/~bethard/py/make_statement.patch)
 표준 라이브러리 내 `create` 인스턴스 (https://mail.python.org/pipermail/python-list/2006-April/335159.html)
 Zope+Plone 내 `create` 인스턴스 (https://mail.python.org/pipermail/python-list/2006-April/335284.html)
 `with` 문 XML에서 `as` 절 제거 (https://mail.python.org/pipermail/python-list/2006-April/336774.html)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

---

PEP 359 – "make" 문은 `class` 선언 구문을 일반화하여, `class`가 아닌 다른 객체를 생성할 때의 의도를 더 명확하게 표현하고자 제안된 구문입니다. 이 제안은 `make <callable> <name> <tuple>: <block>` 형태를 가지며, 이는 `<name> = <callable>("<name>", <tuple>, <namespace>)`와 같은 할당으로 변환됩니다. 여기서 `<namespace>`는 `<block>`을 실행하여 생성된 `dict`입니다.

**주요 제안 내용 및 도입 배경:**

*   **`class` 문의 일반화:** 기존 `class` 문이 `type` 인스턴스(클래스 객체)만을 위한 신택스 슈거(syntactic sugar) 역할을 했던 것과 달리, `make` 문은 `class` 외의 다양한 객체 생성에도 유사한 구문적 지원을 제공하고자 했습니다. `class` 문은 블록 내의 문장들을 실행하고 그 바인딩을 `dict`로 메타클래스에 제공하며, 생성될 클래스가 자신의 이름을 알 수 있도록 하여 DRY(Don't Repeat Yourself) 원칙을 장려합니다. `make` 문은 이러한 이점을 다른 객체 생성에도 확장하려 했습니다.
*   **다양한 활용 사례:**
    *   **단순 네임스페이스:** 인스턴스화할 필요 없는 속성 그룹을 명확하게 정의하는 데 사용될 수 있습니다. `make namespace roletypes: ...`와 같은 방식으로, 불필요한 클래스 생성을 피하고 모듈 내부에 속성을 유지할 수 있습니다.
    *   **GUI 객체:** `Tkinter.Button`과 같은 GUI 위젯의 속성 및 콜백 함수를 선언과 함께 그룹화하여 가독성을 높일 수 있습니다.
    *   **사용자 정의 디스크립터:** 디스크립터가 자신이 적용될 속성의 이름을 쉽게 알 수 있도록 하여, `setonce` 디스크립터와 같이 속성 이름을 기반으로 동작하는 코드를 더 견고하게 만들 수 있습니다.
    *   **`property` 네임스페이스:** `property`의 `fget`, `fset` 등 관련 함수와 독스트링을 `property` 선언 블록 안에 직접 포함시켜 `property` 정의를 단순화합니다.
    *   **인터페이스 선언:** 클래스가 아닌 인터페이스임을 명확히 나타내기 위해 `make Interface IFoo: ...`와 같은 구문으로 인터페이스를 선언할 수 있도록 합니다.

**철회 및 Python 사용에 미치는 영향:**

이 PEP는 Guido van Rossum의 요청에 따라 철회되었습니다. Guido는 `property` 사용 사례에서 인스턴스 메서드가 다른 메서드와 다른 수준에 놓이는 점과 `property` 함수에 고정된 이름이 요구되는 점 등을 비판했습니다.

따라서 `make` 문은 Python 언어에 도입되지 않았으며, 현재 Python 개발에 직접적인 영향을 미치지 않습니다. 제안된 `make` 문이 의도했던 일부 사용 사례는 `with` 문이나 클래스 데코레이터, 그리고 명시적인 객체 생성 함수 등을 통해 다른 방식으로 해결되고 있습니다. 특히, `with` 문은 XML 요소 중첩과 같은 구조적 표현에서 `make` 문보다 더 명시적이고 견고한 대안으로 제시되기도 했습니다.

**미해결 과제 (철회 전 논의):**

*   **키워드:** `make` 키워드가 기존 코드와 충돌할 가능성에 대한 우려가 있었습니다. `create`, `build` 등의 다른 키워드도 검토되었으나, 각각의 충돌 가능성 때문에 `make`가 선택되었으나 여전히 논의의 여지가 있었습니다.
*   **대체 생성자:** `make` 문이 `dict`와 같은 내장 타입의 대체 생성자로 사용될 수 있는지, 그리고 이를 위해 `__make__`와 같은 새로운 매직 메서드가 필요한지에 대한 논의가 있었습니다.
*   **블록 실행 `dict` 사용자 정의:** `make` 문 내부 블록이 실행될 `dict` 객체를 사용자가 지정할 수 있도록 할지에 대한 논의가 있었으며, 이는 XML과 같은 복잡한 구조를 생성하는 데 유용할 수 있지만, 구현의 복잡성과 취약성 문제가 제기되었습니다.

이 PEP는 Python 언어 디자인의 다양한 측면, 특히 `class` 구문의 유연성과 확장성에 대한 심도 있는 논의를 보여주었지만, 최종적으로 언어에 통합되지는 못했습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.