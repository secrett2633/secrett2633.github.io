---
title: "[Final] PEP 318 - Decorators for Functions and Methods"
excerpt: "Python Enhancement Proposal 318: 'Decorators for Functions and Methods'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/318/
toc: true
toc_sticky: true
date: 2025-09-26 18:28:53+0900
last_modified_at: 2025-09-26 18:28:53+0900
published: true
---
> **원문 링크:** [PEP 318 - Decorators for Functions and Methods](https://peps.python.org/pep-0318/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 05-Jun-2003


# PEP 318 – 함수 및 메서드를 위한 데코레이터 (Decorators for Functions and Methods)

## 개요 (Abstract)
기존에는 함수나 메서드를 변형(예: `classmethod` 또는 `staticmethod`로 선언)하는 방식이 복잡하여 코드 이해를 어렵게 만들었습니다. 이상적으로는 이러한 변형이 선언 지점에서 함께 이루어져야 합니다. 이 PEP는 함수 또는 메서드 선언의 변형을 위한 새로운 문법을 제안합니다.

## 동기 (Motivation)
기존에는 함수나 메서드에 변형을 적용할 때 실제 변형 코드가 함수 본문 뒤에 위치했습니다. 예를 들어:

```python
def foo(self):
    # 메서드 작업 수행
    pass
foo = classmethod(foo)
```

메서드의 길이가 길어질수록 이러한 방식은 가독성을 떨어뜨리며, 개념적으로 하나의 선언임에도 함수 이름을 세 번이나 반복하는 것은 Pythonic하지 않습니다.

이 문제에 대한 해결책은 메서드 변형을 메서드 선언에 더 가깝게 옮기는 것입니다. 새로운 문법은 다음과 같은 형태를 대체하는 것을 목표로 합니다:

```python
def foo(cls):
    pass
foo = synchronized(lock)(foo)
foo = classmethod(foo)
```

아래와 같이 데코레이션을 함수의 선언부에 직접 배치하여 코드를 개선합니다:

```python
@classmethod
@synchronized(lock)
def foo(cls):
    pass
```

클래스에 대한 데코레이터(Class Decorators)도 가능하지만, 그 이점은 함수/메서드 데코레이터만큼 명확하지 않습니다. 클래스 데코레이터로 할 수 있는 대부분의 작업은 메타클래스(Metaclasses)를 통해 가능하지만, 메타클래스는 다소 난해하므로 클래스에 간단한 수정을 가하는 더 쉬운 방법의 매력이 있습니다. Python 2.4에서는 함수/메서드 데코레이터만 추가되었습니다. PEP 3129는 Python 2.6부터 클래스 데코레이터를 추가할 것을 제안합니다.

### 왜 이렇게 어려웠을까? (Why Is This So Hard?)
`classmethod()`와 `staticmethod()` 두 데코레이터는 Python 2.2부터 사용할 수 있었고, 언어에 문법적 지원이 추가될 것이라는 가정이 있었습니다. 하지만 합의에 도달하기 어려웠던 몇 가지 이유가 있습니다:

*   **'의도 선언' 위치에 대한 불일치:** 함수 정의 끝에 데코레이터를 적용하는 것이 최적은 아니라는 데는 모두 동의하지만, 어디에 정보를 배치할지에 대한 명확한 합의가 없었습니다.
*   **문법적 제약:** Python은 시각적으로나 파서(parser) 측면에서 '일을 망치지 않고' 할 수 있는 일에 강한 제약을 가진 문법적으로 간단한 언어입니다.
*   **개념에 대한 전반적인 생소함:** 데코레이터 개념은 Python에서 접하기 전에는 많은 프로그래머에게 생소한 개념이었습니다.

## 배경 (Background)
현재의 상황에서 문법적 지원이 바람직하다는 것이 일반적인 합의였습니다. Guido van Rossum은 EuroPython 2004에서 여러 제안을 논의한 후, Java 스타일의 `@decorator` 문법을 선택했으며, 이는 Python 2.4a2에 처음으로 등장했습니다. Barry Warsaw는 이를 `@` 기호가 파이(pie)처럼 보여 '파이 데코레이터(pie-decorator)' 문법이라고 이름 붙였습니다.

### 'Decorator'라는 이름에 대하여 (On the name 'Decorator')
이 기능에 'decorator'라는 이름을 선택한 것에 대해 여러 불만이 제기되었습니다. 가장 큰 이유는 GoF(Gang of Four) 디자인 패턴 책에서의 사용과 일치하지 않는다는 것입니다. 'decorator'라는 이름은 컴파일러 분야에서 문법 트리를 탐색하고 주석을 다는 방식에서 영향을 받은 것으로 보이며, 더 좋은 이름이 나올 가능성도 있습니다.

## 설계 목표 (Design Goals)
새로운 문법은 다음을 목표로 해야 합니다:

*   사용자 정의 호출 가능 객체(`callables`) 및 기존의 `classmethod()`, `staticmethod()`를 포함한 **임의의 래퍼(wrappers)에 작동** 해야 합니다. 이는 데코레이터 문법이 래퍼 생성자(wrapper constructor)에 인자를 전달하는 것을 지원해야 함을 의미합니다.
*   하나의 정의에 **여러 래퍼와 함께 작동** 해야 합니다.
*   무슨 일이 일어나는지 **명확하게** 보여야 합니다. 적어도 새로운 사용자가 자신의 코드를 작성할 때 안전하게 무시할 수 있어야 합니다.
*   한 번 설명되면 **기억하기 쉬운 문법** 이어야 합니다.
*   향후 확장을 **어렵게 만들지 않아야** 합니다.
*   **입력하기 쉬워야** 합니다. 이 기능을 사용하는 프로그램은 매우 자주 사용할 것으로 예상됩니다.
*   코드를 빠르게 스캔하는 것을 **어렵게 만들지 않아야** 합니다.
*   언어 인식 편집기(language-sensitive editors)와 같은 보조 지원 도구를 **불필요하게 복잡하게 만들지 않아야** 합니다.
*   미래 컴파일러가 데코레이터를 **최적화할 수 있도록 허용** 해야 합니다.
*   함수 정의의 끝에 숨겨져 있던 것을 **앞으로 옮겨서 더 눈에 띄게** 해야 합니다.

## 현재 문법 (Current Syntax)
Python 2.4a2에 구현된 함수 데코레이터의 현재 문법은 다음과 같습니다:

```python
@dec2
@dec1
def func(arg1, arg2, ...):
    pass
```

이는 중간 변수 `func`에 대한 할당 없이 다음 코드와 동일합니다:

```python
def func(arg1, arg2, ...):
    pass
func = dec2(dec1(func))
```

데코레이터는 함수 선언 근처에 있습니다. `@` 기호는 새로운 일이 진행되고 있음을 명확히 합니다.
적용 순서(아래에서 위로)는 함수 적용의 일반적인 순서와 일치하는 것을 근거로 합니다. 수학에서 함수 합성 `(g o f)(x)`는 `g(f(x))`로 번역됩니다. Python에서 `@g @f def foo()`는 `foo=g(f(foo))`로 번역됩니다.

현재 문법은 데코레이터 선언이 데코레이터를 반환하는 함수를 호출하는 것도 허용합니다:

```python
@decomaker(argA, argB, ...)
def func(arg1, arg2, ...):
    pass
```

이는 다음 코드와 동일합니다:

```python
func = decomaker(argA, argB, ...)(func)
```

데코레이터를 반환하는 함수를 허용하는 근거는 `@` 기호 뒤의 부분이 표현식으로 간주될 수 있으며(문법적으로는 함수로 제한되지만), 그 표현식이 반환하는 것이 호출되기 때문입니다.

## 문법 대안 (Syntax Alternatives)
많은 다른 문법이 제안되었으며, 이를 개별적으로 논의하기보다는 문법 논의를 여러 영역으로 나누는 것이 가치가 있습니다.

### 데코레이터 위치 (Decorator Location)
데코레이터의 첫 번째 문법적 쟁점은 위치입니다. Python 2.4a2에서 사용된 `@` 문법을 기준으로 합니다.

1.  **`def` 문 앞:** 2.4a2에서 사용된 문법입니다.
    ```python
    @classmethod
    def foo(arg1,arg2): pass

    @accepts(int,int)
    @returns(float)
    def bar(low,high): pass
    ```
    이 위치에 대한 주요 반대는 Python에서 한 줄의 코드가 다음 줄에 영향을 미치는 첫 번째 실제 사례라는 점입니다. 최종적으로 Python 2.4에서는 한 줄에 하나의 데코레이터만 허용하도록 결정되었습니다. 장점으로는 데코레이터가 메서드 본문 밖에 존재하여 함수가 정의될 때 명확히 실행된다는 점과, 함수 정의 전에 코드의 의미론적 변화를 알 수 있다는 점이 있습니다.

2.  **`def`와 함수 이름 사이 또는 함수 이름과 인자 목록 사이:**
    ```python
    def @classmethod foo(arg1,arg2): pass
    def foo @classmethod (arg1,arg2): pass
    ```
    이 형식의 문제점은 소스 코드의 'greppability'를 깨뜨리고, 여러 데코레이터의 경우 문법이 매우 복잡해진다는 점입니다.

3.  **인자 목록과 `:` 사이:**
    ```python
    def foo(arg1,arg2) @classmethod: pass
    ```
    Guido는 이 형식이 중요한 정보(예: `staticmethod` 여부)를 시그니처 뒤에 숨겨 쉽게 놓칠 수 있고, 긴 인자 목록과 긴 데코레이터 목록 사이의 전환을 놓치기 쉬우며, 데코레이터 목록을 재사용하기 위해 잘라내기/붙여넣기(cut and paste)하기 번거롭다는 이유로 반대했습니다.

4.  **메서드 본문 시작 부분:** `docstrings`가 위치하는 곳과 동일합니다.
    ```python
    def foo(arg1,arg2):
        @classmethod
        pass
    ```
    이 형식의 주요 반대는 데코레이터를 결정하기 위해 메서드 본문 "안을 들여다봐야" 한다는 점입니다.

5.  **메서드 코드를 감싸는 새로운 블록:** `decorate` 키워드를 사용합니다.
    ```python
    decorate: classmethod
    def foo(arg1,arg2): pass
    ```
    이 형식은 데코레이트된 메서드와 그렇지 않은 메서드에 대해 일관되지 않은 들여쓰기를 초래하며, 데코레이트된 메서드의 본문이 세 단계 들여쓰기로 시작하게 됩니다.

### 문법 형식 (Syntax forms)

*   **`@decorator`:** `@` 기호가 Python에서 이전에 사용되지 않았고, Java 1.5의 어노테이션(annotations)과 유사하다는 점이 장점입니다. 이는 이전 버전의 Python에 의해 파싱될 가능성이 없어 미묘한 의미론적 버그로 이어지지 않는다는 것을 의미합니다.
*   **`|decorator`:** `@` 데코레이터 문법의 변형으로, IPython 및 Leo와 충돌하지 않는다는 장점이 있지만, `|` 기호가 대문자 'I'와 소문자 'l'처럼 보인다는 단점이 있습니다.
*   **`list syntax` (`[...]` 또는 `<...>`)** : 대괄호는 현재 의미가 있으며, 데코레이터라는 표시가 부족하다는 반대가 있었습니다. 꺾쇠 괄호는 파싱 문제를 일으킵니다.
*   **`decorate()` 함수:** 새로운 문법을 구현하지 않고, 함수를 조작하는 `magic function`을 사용하는 제안입니다. Guido는 새로운 문법이 없다면 이러한 함수의 '마법성'이 매우 높기 때문에 단호히 반대했습니다.
*   **새로운 키워드 (및 블록):** `using` 키워드를 사용하는 블록 형식이 `comp.lang.python`에서 합의된 대안이었습니다. Guido는 블록의 문법적 형태가 문장 시퀀스를 강하게 제안하지만 실제로는 그렇지 않다는 점과 `using` 키워드가 `if`, `while` 등과 같은 수준의 관심을 받을 자격이 없다는 이유로 이 제안을 거부했습니다.

### 왜 `@`인가? (Why @?)
Java에서 `@`는 처음에는 Javadoc 주석의 마커로, 나중에는 Java 1.5에서 Python 데코레이터와 유사한 어노테이션에 사용되었습니다. `@`가 Python에서 이전에 토큰으로 사용되지 않았다는 사실은 이러한 코드가 이전 버전의 Python에 의해 파싱될 가능성이 없어 미묘한 의미론적 버그로 이어지지 않는다는 것을 의미합니다. 또한 무엇이 데코레이터이고 무엇이 아닌지에 대한 모호성을 제거합니다.

## 현재 구현 및 역사 (Current Implementation, History)
Guido는 자신이 선호하는 문법을 구현할 자원자를 요청했고, Mark Russell이 패치를 게시했습니다. 이 새로운 문법은 Python 2.4a2에서 사용할 수 있게 되었습니다.

```python
@dec2
@dec1
def func(arg1, arg2, ...):
    pass
```

이것은 중간 변수 `func`의 생성 없이 다음 코드와 동일합니다:

```python
def func(arg1, arg2, ...):
    pass
func = dec2(dec1(func))
```

2.4a2에 구현된 버전은 한 줄에 여러 `@decorator` 절을 허용했지만, 2.4a3에서는 한 줄에 하나의 데코레이터만 허용하도록 강화되었습니다. 결국 `@` 문자는 유지되었습니다.

## 예시 (Examples)
데코레이터는 `staticmethod()` 및 `classmethod()`와 같은 내장 함수를 더 깔끔하게 사용하는 것 이상의 강력한 기능을 제공합니다. 다음은 몇 가지 사용 예시입니다:

*   **종료 시 실행될 함수 정의:** `atexit` 모듈을 사용하여 함수를 등록합니다.
    ```python
    def onexit(f):
        import atexit
        atexit.register(f)
        return f

    @onexit
    def func():
        print("프로그램 종료 시 실행됩니다.")
    ```

*   **싱글턴(Singleton) 인스턴스를 가진 클래스 정의:** 클래스의 유일한 인스턴스를 보장합니다.
    ```python
    def singleton(cls):
        instances = {}
        def getinstance():
            if cls not in instances:
                instances[cls] = cls()
            return instances[cls]
        return getinstance

    @singleton
    class MyClass:
        def __init__(self):
            print("MyClass 인스턴스 생성")
    ```

*   **함수에 속성 추가:** 함수에 메타데이터를 추가할 수 있습니다.
    ```python
    def attrs(**kwds):
        def decorate(f):
            for k in kwds:
                setattr(f, k, kwds[k])
            return f
        return decorate

    @attrs(versionadded="2.2", author="Guido van Rossum")
    def mymethod():
        pass
    ```

*   **함수 인자 및 반환 타입 강제:** 함수의 인자 및 반환 타입을 검사합니다.
    ```python
    def accepts(*types):
        def check_accepts(f):
            assert len(types) == f.func_code.co_argcount
            def new_f(*args, **kwds):
                for (a, t) in zip(args, types):
                    assert isinstance(a, t), \
                        "arg %r does not match %s" % (a,t)
                return f(*args, **kwds)
            new_f.func_name = f.func_name
            return new_f
        return check_accepts

    def returns(rtype):
        def check_returns(f):
            def new_f(*args, **kwds):
                result = f(*args, **kwds)
                assert isinstance(result, rtype), \
                    "return value %r does not match %s" % (result,rtype)
                return result
            new_f.func_name = f.func_name
            return new_f
        return check_returns

    @accepts(int, (int,float))
    @returns((int,float))
    def func(arg1, arg2):
        return arg1 * arg2
    ```

*   **클래스가 특정 인터페이스를 구현한다고 선언:** PyProtocols 경험을 기반으로 합니다.
    ```python
    # 예시를 위해 PyProtocols의 개념을 간략화함
    class Interface: pass
    def declareImplementation(typ, instancesProvide): pass

    def provides(*interfaces):
        def provides_decorator(typ):
            declareImplementation(typ, instancesProvide=interfaces)
            return typ
        return provides_decorator

    class IBar(Interface):
        pass

    @provides(IBar)
    class Foo(object):
        pass
    ```
물론 이 모든 예시는 문법적 지원 없이도 가능했지만, 데코레이터 문법을 통해 더욱 간결하고 명확하게 표현할 수 있게 되었습니다.

## (더 이상) 열린 문제 ((No longer) Open Issues)
클래스 데코레이터가 미래에 언어에 통합될지는 확실하지 않았지만, PEP 3129는 Python 2.6부터 클래스 데코레이터를 추가할 것을 제안했습니다. Python 2.4b1 이전에 `@` 문자 선택이 재검토될 예정이었으나, 결국 `@` 문자는 유지되었습니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.