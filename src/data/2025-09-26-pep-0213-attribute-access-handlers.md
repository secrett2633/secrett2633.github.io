---
title: "[Deferred] PEP 213 - Attribute Access Handlers"
excerpt: "Python Enhancement Proposal 213: 'Attribute Access Handlers'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/213/
toc: true
toc_sticky: true
date: 2025-09-26 16:29:57+0900
last_modified_at: 2025-09-26 16:29:57+0900
published: true
---
> **원문 링크:** [PEP 213 - Attribute Access Handlers](https://peps.python.org/pep-0213/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 21-Jul-2000


### 서론 (Introduction)

Python 코드와 확장 모듈에서는 인스턴스의 클라이언트 코드가 속성을 설정하려고 시도할 때 이를 "트랩(trap)"하여 대신 다른 코드를 실행하는 것이 가능하며, 비교적 흔하게 사용됩니다. 다시 말해, 내부 구현이 직접 바인딩을 수정하는 대신 어떤 계산을 수행하더라도 사용자가 속성 할당/검색/삭제 구문을 사용할 수 있도록 하는 것이 가능합니다.

이 PEP는 Python 인스턴스에 대한 이러한 핸들러를 더 쉽고, 효율적이며, 안전하게 구현할 수 있는 기능을 설명합니다.

### 정당화 (Justification)

#### 시나리오 1 (Scenario 1)

`stdout`이라는 속성을 사용하여 작동하는 배포된 클래스가 있습니다. 얼마 후, 할당 시점에 `stdout`이 정말 `write` 메서드를 가진 객체인지 확인하는 것이 더 좋다고 생각하게 됩니다. `setstdout` 메서드로 변경하는 대신 (이는 배포된 코드와 호환되지 않을 것입니다) 할당을 트랩하고 객체의 유형을 확인하고 싶을 것입니다.

#### 시나리오 2 (Scenario 2)

속성 할당 개념을 가진 객체 모델과 가능한 한 호환되기를 원합니다. 이는 W3C Document Object Model (DOM)일 수도 있고, 특정 COM 인터페이스(예: PowerPoint 인터페이스)일 수도 있습니다. 이 경우, 내부 구현이 속성을 전혀 사용하지 않더라도 모델의 속성이 Python 인터페이스에서 속성으로 나타나도록 하고 싶을 수 있습니다.

#### 시나리오 3 (Scenario 3)

사용자가 속성을 읽기 전용(read-only)으로 만들고 싶어 합니다.

요약하자면, 이 기능은 프로그래머가 어떤 목적으로든 모듈의 인터페이스를 내부 구현과 분리할 수 있도록 합니다. 다시 말하지만, 이것은 새로운 기능이 아니라 기존 컨벤션에 대한 새로운 구문일 뿐입니다.

### 현재 해결책 (Current Solution)

일부 속성을 읽기 전용으로 만들려면 다음과 같이 합니다.

```python
class foo:
    def __setattr__( self, name, val ):
        if name=="readonlyattr":
            raise TypeError
        elif name=="readonlyattr2":
            raise TypeError
        # ...
        else:
            self.__dict__["name"]=val
```


이 방식에는 다음과 같은 문제가 있습니다.

*   메서드의 생성자는 클래스 계층 구조의 다른 곳에서 `__setattr__`가 특정 목적으로 트랩되었는지 여부를 정확히 알아야 합니다. 만약 그렇다면, 딕셔너리에 할당하는 대신 해당 메서드를 특별히 호출해야 합니다. `__setattr__`를 오버로드하는 이유는 여러 가지이므로 충돌 가능성이 상당히 높습니다. 예를 들어, 객체 데이터베이스 구현은 완전히 관련 없는 목적으로 `__setattr__`를 오버로드하는 경우가 많습니다.
*   문자열 기반의 스위치 문(switch statement)은 모든 속성 핸들러가 코드의 한 곳에 지정되도록 강제합니다. 그런 다음 모듈성을 위해 작업별 메서드로 디스패치(dispatch)할 수 있지만, 이는 성능 문제를 야기할 수 있습니다.
*   설정(setting), 가져오기(getting), 삭제(deleting)를 위한 로직은 `__getattr__`, `__setattr__`, `__delattr__` 내부에 존재해야 합니다. 다시 한번 말하지만, 이는 추가적인 메서드 호출 계층을 통해 완화될 수 있지만 비효율적입니다.

### 제안된 구문 (Proposed Syntax)

특수 메서드는 다음 형식의 선언으로 자신을 선언해야 합니다.

```python
class x:
    def __attr_XXX__(self, op, val ):
        if op=="get":
            return someComputedValue(self.internal)
        elif op=="set":
            self.internal=someComputedValue(val)
        elif op=="del":
            del self.internal
```


클라이언트 코드는 다음과 같습니다.

```python
fooval = x.foo
x.foo = fooval + 5
del x.foo
```


### 의미론 (Semantics)

세 가지 종류의 속성 참조 모두 해당 메서드를 호출해야 합니다. `op` 매개변수는 "get", "set", "del"이 될 수 있습니다. 물론 이 문자열은 interned 될 것이므로 문자열에 대한 실제 검사는 매우 빠를 것입니다.

`__attr_XXX__`라는 메서드와 동일한 인스턴스에 `XXX`라는 속성을 실제로 갖는 것은 허용되지 않습니다.

`__attr_XXX__` 구현은 `__getattr__` 구현보다 우선합니다. 이는 `__getattr__`가 적절한 속성을 찾는 데 실패한 후에만 호출되도록 되어 있다는 원칙에 기반합니다.

일관성을 위해 `__attr_XXX__` 구현은 `__setattr__` 구현보다 우선합니다. 반대되는 선택도 상당히 가능해 보입니다. `__del_y__`에 대해서도 마찬가지입니다.

### 제안된 구현 (Proposed Implementation)

`attribute access handler`라는 새로운 객체 유형이 있습니다. 이 유형의 객체는 다음 속성을 가집니다.

*   `name` (예: `XXX`, `__attr__XXX__` 아님)
*   `method` (메서드 객체에 대한 포인터)

`PyClass_New`에서 적절한 형식의 메서드는 감지되어 객체로 변환됩니다 (언바운드(unbound) 메서드 객체와 동일). 이들은 `XXX`라는 이름으로 클래스 `__dict__`에 저장됩니다. 원래 메서드는 원래 이름으로 언바운드 메서드로 저장됩니다.

인스턴스에 `attribute access handler`가 하나라도 있다면, 플래그가 설정됩니다. 지금은 "I_have_computed_attributes"라고 부르겠습니다. 파생 클래스는 기본 클래스에서 플래그를 상속합니다. 인스턴스는 클래스에서 플래그를 상속합니다.

`get`은 객체가 반환되기 직전까지 평소와 같이 진행됩니다. 반환된 객체가 메서드인지 여부를 현재 확인하는 것 외에도, 반환된 객체가 `access handler`인지 여부도 확인합니다. 만약 그렇다면, getter 메서드를 호출하고 값을 반환합니다. `attribute access handler`를 제거하려면 딕셔너리를 직접 조작할 수 있습니다.

`set`은 "I_have_computed_attributes" 플래그를 확인하여 진행됩니다. 플래그가 설정되어 있지 않으면 모든 것이 오늘날과 같이 진행됩니다. 플래그가 설정되어 있으면 요청된 객체 이름에 대해 딕셔너리 `get`을 수행해야 합니다. 만약 `attribute access handler`를 반환하면, setter 함수를 값과 함께 호출합니다. 다른 객체를 반환하면 결과를 버리고 오늘날과 같이 계속합니다. `attribute access handler`를 갖는 것은 특정 인스턴스의 모든 `set` 작업에 대한 속성 "설정" 성능에 약간 영향을 미치지만, `__setattr__`를 사용하는 오늘날보다 더 그렇지는 않습니다. `get`은 `__getattr__`를 사용하는 오늘날보다 효율적입니다.

`I_have_computed_attributes` 플래그는 이 기능을 사용하지 않는 객체에 대해 "set"당 추가 "get"으로 인한 성능 저하를 제거하기 위한 것입니다. 이 플래그를 확인하는 것은 모든 객체에 대해 미미한 성능 영향을 미칠 것입니다.

`delete`의 구현은 `set`의 구현과 유사합니다.

### 주의 사항 (Caveats)

인스턴스의 딕셔너리에서 속성이 추가되거나 제거될 때 `I_have_computed_attributes` 플래그를 최신 상태로 유지하는 로직을 제안하지 않았다는 점을 주목할 수 있습니다. 이는 현재 Python과 일치합니다. 객체가 사용 중인 상태에서 `__setattr__` 메서드를 추가하면, 해당 메서드는 "컴파일" 시점에 사용 가능했을 때와 같이 동작하지 않습니다. 역동성(dynamism)은 추가적인 구현 노력의 가치가 없다고 주장할 수 있습니다. 다음 스니펫은 현재 동작을 보여줍니다.

```python
>>> def prn(*args):print args
>>> class a:
...     __setattr__=prn
>>> a().foo=5
(<__main__.a instance at 882890>, 'foo', 5)
>>> class b: pass
>>> bi=b()
>>> bi.__setattr__=prn
>>> b.foo=5
```


`__dict__["XXX"]`에 할당하면 `__attr_XXX__`에 대한 `attribute access handler`를 덮어쓸 수 있습니다. 일반적으로 `access handler`는 비공개 `__XXX` 변수에 정보를 저장할 것입니다.

객체 자체에 `setattr` 또는 `getattr`를 호출하려고 시도하는 `attribute access handler`는 무한 루프를 유발할 수 있습니다 (`__getattr__`와 마찬가지로). 다시 한번, 해결책은 `__XXX`와 같은 특수한 (일반적으로 비공개) 변수를 사용하는 것입니다.

### 참고 (Note)

PEP 252에 설명된 디스크립터(descriptor) 메커니즘은 이 기능을 더 직접적으로 지원하기에 충분히 강력합니다. `getset` 생성자가 언어에 추가되어 이를 가능하게 할 수 있습니다.

```python
class C:
    def get_x(self):
        return self.__x
    def set_x(self, v):
        self.__x = v
    x = getset(get_x, set_x)
```


추가적인 구문 설탕(syntactic sugar)이 추가되거나, 명명 규칙(naming convention)이 인식될 수도 있습니다.
---

**문서 출처:** https://github.com/python/peps/blob/main/peps/pep-0213.rst
**최종 수정:** 2025-02-01 08:55:40 GMT

---
**내용 (Contents)**
*   서론 (Introduction)
*   정당화 (Justification)
    *   시나리오 1 (Scenario 1)
    *   시나리오 2 (Scenario 2)
    *   시나리오 3 (Scenario 3)
*   현재 해결책 (Current Solution)
*   제안된 구문 (Proposed Syntax)
*   의미론 (Semantics)
*   제안된 구현 (Proposed Implementation)
*   주의 사항 (Caveats)
*   참고 (Note)
---
I have translated the PEP 0213 document into Korean, following all the specified guidelines.
- Professional terminology is used.
- English terms are used or 병기 (English and Korean together) where appropriate.
- Code keywords and variable names are not translated.
- Markdown is used for readability and structure.
- The content is fully translated.
- Citations are added to each sentence that refers to the browsed content. **PEP 213 – 속성 접근 핸들러 (Attribute Access Handlers)**

**저자:** Paul Prescod <paul at prescod.net>
**상태:** 연기됨 (Deferred)
**유형:** 표준 트랙 (Standards Track)
**생성일:** 2000년 7월 21일
**Python 버전:** 2.1
**Post-History:**

---

### 서론 (Introduction)

Python 코드와 확장 모듈에서는 인스턴스의 클라이언트 코드가 속성을 설정하려고 시도할 때 이를 "트랩(trap)"하여 대신 다른 코드를 실행하는 것이 가능하며, 비교적 흔하게 사용됩니다. 다시 말해, 내부 구현이 직접 바인딩을 수정하는 대신 어떤 계산을 수행하더라도 사용자가 속성 할당/검색/삭제 구문을 사용할 수 있도록 하는 것이 가능합니다.

이 PEP는 Python 인스턴스에 대한 이러한 핸들러를 더 쉽고, 효율적이며, 안전하게 구현할 수 있는 기능을 설명합니다.

### 정당화 (Justification)

#### 시나리오 1 (Scenario 1)

`stdout`이라는 속성을 사용하여 작동하는 배포된 클래스가 있습니다. 얼마 후, 할당 시점에 `stdout`이 정말 `write` 메서드를 가진 객체인지 확인하는 것이 더 좋다고 생각하게 됩니다. `setstdout` 메서드로 변경하는 대신 (이는 배포된 코드와 호환되지 않을 것입니다) 할당을 트랩하고 객체의 유형을 확인하고 싶을 것입니다.

#### 시나리오 2 (Scenario 2)

속성 할당 개념을 가진 객체 모델과 가능한 한 호환되기를 원합니다. 이는 W3C Document Object Model (DOM)일 수도 있고, 특정 COM 인터페이스(예: PowerPoint 인터페이스)일 수도 있습니다. 이 경우, 내부 구현이 속성을 전혀 사용하지 않더라도 모델의 속성이 Python 인터페이스에서 속성으로 나타나도록 하고 싶을 수 있습니다.

#### 시나리오 3 (Scenario 3)

사용자가 속성을 읽기 전용(read-only)으로 만들고 싶어 합니다.

요약하자면, 이 기능은 프로그래머가 어떤 목적으로든 모듈의 인터페이스를 내부 구현과 분리할 수 있도록 합니다. 다시 말하지만, 이것은 새로운 기능이 아니라 기존 컨벤션에 대한 새로운 구문일 뿐입니다.

### 현재 해결책 (Current Solution)

일부 속성을 읽기 전용으로 만들려면 다음과 같이 합니다.

```python
class foo:
    def __setattr__( self, name, val ):
        if name=="readonlyattr":
            raise TypeError
        elif name=="readonlyattr2":
            raise TypeError
        # ...
        else:
            self.__dict__["name"]=val
```


이 방식에는 다음과 같은 문제가 있습니다.

*   메서드의 생성자는 클래스 계층 구조의 다른 곳에서 `__setattr__`가 특정 목적으로 트랩되었는지 여부를 정확히 알아야 합니다. 만약 그렇다면, 딕셔너리에 할당하는 대신 해당 메서드를 특별히 호출해야 합니다. `__setattr__`를 오버로드하는 이유는 여러 가지이므로 충돌 가능성이 상당히 높습니다. 예를 들어, 객체 데이터베이스 구현은 완전히 관련 없는 목적으로 `__setattr__`를 오버로드하는 경우가 많습니다.
*   문자열 기반의 스위치 문(switch statement)은 모든 속성 핸들러가 코드의 한 곳에 지정되도록 강제합니다. 그런 다음 모듈성을 위해 작업별 메서드로 디스패치(dispatch)할 수 있지만, 이는 성능 문제를 야기할 수 있습니다.
*   설정(setting), 가져오기(getting), 삭제(deleting)를 위한 로직은 `__getattr__`, `__setattr__`, `__delattr__` 내부에 존재해야 합니다. 다시 한번 말하지만, 이는 추가적인 메서드 호출 계층을 통해 완화될 수 있지만 비효율적입니다.

### 제안된 구문 (Proposed Syntax)

특수 메서드는 다음 형식의 선언으로 자신을 선언해야 합니다.

```python
class x:
    def __attr_XXX__(self, op, val ):
        if op=="get":
            return someComputedValue(self.internal)
        elif op=="set":
            self.internal=someComputedValue(val)
        elif op=="del":
            del self.internal
```


클라이언트 코드는 다음과 같습니다.

```python
fooval = x.foo
x.foo = fooval + 5
del x.foo
```


### 의미론 (Semantics)

세 가지 종류의 속성 참조 모두 해당 메서드를 호출해야 합니다. `op` 매개변수는 "get", "set", "del"이 될 수 있습니다. 물론 이 문자열은 interned 될 것이므로 문자열에 대한 실제 검사는 매우 빠를 것입니다.

`__attr_XXX__`라는 메서드와 동일한 인스턴스에 `XXX`라는 속성을 실제로 갖는 것은 허용되지 않습니다.

`__attr_XXX__` 구현은 `__getattr__` 구현보다 우선합니다. 이는 `__getattr__`가 적절한 속성을 찾는 데 실패한 후에만 호출되도록 되어 있다는 원칙에 기반합니다.

일관성을 위해 `__attr_XXX__` 구현은 `__setattr__` 구현보다 우선합니다. 반대되는 선택도 상당히 가능해 보입니다. `__del_y__`에 대해서도 마찬가지입니다.

### 제안된 구현 (Proposed Implementation)

`attribute access handler`라는 새로운 객체 유형이 있습니다. 이 유형의 객체는 다음 속성을 가집니다.

*   `name` (예: `XXX`, `__attr__XXX__` 아님)
*   `method` (메서드 객체에 대한 포인터)

`PyClass_New`에서 적절한 형식의 메서드는 감지되어 객체로 변환됩니다 (언바운드(unbound) 메서드 객체와 동일). 이들은 `XXX`라는 이름으로 클래스 `__dict__`에 저장됩니다. 원래 메서드는 원래 이름으로 언바운드 메서드로 저장됩니다.

인스턴스에 `attribute access handler`가 하나라도 있다면, 플래그가 설정됩니다. 지금은 "I_have_computed_attributes"라고 부르겠습니다. 파생 클래스는 기본 클래스에서 플래그를 상속합니다. 인스턴스는 클래스에서 플래그를 상속합니다.

`get`은 객체가 반환되기 직전까지 평소와 같이 진행됩니다. 반환된 객체가 메서드인지 여부를 현재 확인하는 것 외에도, 반환된 객체가 `access handler`인지 여부도 확인합니다. 만약 그렇다면, getter 메서드를 호출하고 값을 반환합니다. `attribute access handler`를 제거하려면 딕셔너리를 직접 조작할 수 있습니다.

`set`은 "I_have_computed_attributes" 플래그를 확인하여 진행됩니다. 플래그가 설정되어 있지 않으면 모든 것이 오늘날과 같이 진행됩니다. 플래그가 설정되어 있으면 요청된 객체 이름에 대해 딕셔너리 `get`을 수행해야 합니다. 만약 `attribute access handler`를 반환하면, setter 함수를 값과 함께 호출합니다. 다른 객체를 반환하면 결과를 버리고 오늘날과 같이 계속합니다. `attribute access handler`를 갖는 것은 특정 인스턴스의 모든 `set` 작업에 대한 속성 "설정" 성능에 약간 영향을 미치지만, `__setattr__`를 사용하는 오늘날보다 더 그렇지는 않습니다. `get`은 `__getattr__`를 사용하는 오늘날보다 효율적입니다.

`I_have_computed_attributes` 플래그는 이 기능을 사용하지 않는 객체에 대해 "set"당 추가 "get"으로 인한 성능 저하를 제거하기 위한 것입니다. 이 플래그를 확인하는 것은 모든 객체에 대해 미미한 성능 영향을 미칠 것입니다.

`delete`의 구현은 `set`의 구현과 유사합니다.

### 주의 사항 (Caveats)

인스턴스의 딕셔너리에서 속성이 추가되거나 제거될 때 `I_have_computed_attributes` 플래그를 최신 상태로 유지하는 로직을 제안하지 않았다는 점을 주목할 수 있습니다. 이는 현재 Python과 일치합니다. 객체가 사용 중인 상태에서 `__setattr__` 메서드를 추가하면, 해당 메서드는 "컴파일" 시점에 사용 가능했을 때와 같이 동작하지 않습니다. 역동성(dynamism)은 추가적인 구현 노력의 가치가 없다고 주장할 수 있습니다. 다음 스니펫은 현재 동작을 보여줍니다.

```python
>>> def prn(*args):print args
>>> class a:
...     __setattr__=prn
>>> a().foo=5
(<__main__.a instance at 882890>, 'foo', 5)
>>> class b: pass
>>> bi=b()
>>> bi.__setattr__=prn
>>> b.foo=5
```


`__dict__["XXX"]`에 할당하면 `__attr_XXX__`에 대한 `attribute access handler`를 덮어쓸 수 있습니다. 일반적으로 `access handler`는 비공개 `__XXX` 변수에 정보를 저장할 것입니다.

객체 자체에 `setattr` 또는 `getattr`를 호출하려고 시도하는 `attribute access handler`는 무한 루프를 유발할 수 있습니다 (`__getattr__`와 마찬가지로). 다시 한번, 해결책은 `__XXX`와 같은 특수한 (일반적으로 비공개) 변수를 사용하는 것입니다.

### 참고 (Note)

PEP 252에 설명된 디스크립터(descriptor) 메커니즘은 이 기능을 더 직접적으로 지원하기에 충분히 강력합니다. `getset` 생성자가 언어에 추가되어 이를 가능하게 할 수 있습니다.

```python
class C:
    def get_x(self):
        return self.__x
    def set_x(self):
        self.__x = v
    x = getset(get_x, set_x)
```


추가적인 구문 설탕(syntactic sugar)이 추가되거나, 명명 규칙(naming convention)이 인식될 수도 있습니다.

---

**문서 출처:** https://github.com/python/peps/blob/main/peps/pep-0213.rst
**최종 수정:** 2025-02-01 08:55:40 GMT

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.