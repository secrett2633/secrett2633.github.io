---
title: "[Rejected] PEP 726 - Module__setattr__and__delattr__"
excerpt: "Python Enhancement Proposal 726: 'Module__setattr__and__delattr__'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/726/
toc: true
toc_sticky: true
date: 2025-09-27 13:19:13+0900
last_modified_at: 2025-09-27 13:19:13+0900
published: true
---
> **원문 링크:** [PEP 726 - Module__setattr__and__delattr__](https://peps.python.org/pep-0726/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 24-Aug-2023

PEP 726 – 모듈 `__setattr__` 및 `__delattr__`

## 초록 (Abstract)
이 PEP는 모듈에 사용자 정의 `__setattr__` 및 `__delattr__` 메서드를 지원하여 PEP 562를 넘어선 모듈 속성 접근 사용자 정의를 확장할 것을 제안합니다.

## 동기 (Motivation)
모듈 `__setattr__`에는 몇 가지 잠재적인 사용 사례가 있습니다.

*   속성 설정을 전적으로 방지(즉, 읽기 전용으로 만듦)
*   할당될 값의 유효성 검사
*   속성 설정을 가로채고 다른 상태 업데이트

읽기 전용 속성에 대한 적절한 지원은 속성 삭제를 방지하기 위해 `__delattr__` 함수를 추가하는 것도 필요로 합니다.

기존의 `__getattr__` 및 `__dir__` 메서드와 함께, 이 제안은 모듈 인스턴스에 정의될 `object.__setattr__()` 및 `object.__delattr__()` 메서드처럼 작동하는 모듈 내 `__setattr__` 및 `__delattr__` 메서드를 인식하여 이러한 사용자 정의를 직접 지원하는 것이 편리할 것입니다. 이는 모듈 속성 접근 사용자 정의의 모든 변형을 간소화할 것입니다.

**예시:**

```python
# mplib.py
CONSTANT = 3.14
prec = 53
dps = 15

def dps_to_prec(n):
    """Return the number of bits required to represent n decimals accurately."""
    return max(1, int(round((int(n)+1)*3.3219280948873626)))

def prec_to_dps(n):
    """Return the number of accurate decimals that can be represented with n bits."""
    return max(1, int(round(int(n)/3.3219280948873626)-1))

def validate(n):
    n = int(n)
    if n <= 0:
        raise ValueError('Positive integer expected')
    return n

def __setattr__(name, value):
    if name == 'CONSTANT':
        raise AttributeError('Read-only attribute!')
    if name == 'dps':
        value = validate(value)
        globals()['dps'] = value
        globals()['prec'] = dps_to_to_prec(value)
        return
    if name == 'prec':
        value = validate(value)
        globals()['prec'] = value
        globals()['dps'] = prec_to_dps(value)
        return
    globals()[name] = value

def __delattr__(name):
    if name in ('CONSTANT', 'dps', 'prec'):
        raise AttributeError('Read-only attribute!')
    del globals()[name]
```
이 코드를 사용하면 다음과 같은 동작을 보입니다.
```python
>>> import mplib
>>> mplib.foo = 'spam' # 새로운 속성 추가
>>> mplib.CONSTANT = 42 # 읽기 전용 속성 수정 시도
Traceback (most recent call last):
...
AttributeError: Read-only attribute!
>>> del mplib.foo # 속성 삭제
>>> del mplib.CONSTANT # 읽기 전용 속성 삭제 시도
Traceback (most recent call last):
...
AttributeError: Read-only attribute!
>>> mplib.prec
53
>>> mplib.dps
15
>>> mplib.dps = 5 # 'dps' 변경 시 'prec'도 연동되어 변경
>>> mplib.prec
20
>>> mplib.dps = 0 # 유효성 검사 실패
Traceback (most recent call last):
...
ValueError: Positive integer expected
```

## 기존 대안 (Existing Options)
현재의 해결 방법은 모듈 객체의 `__class__`를 `types.ModuleType`의 사용자 정의 서브클래스에 할당하는 것입니다.

예를 들어, 속성의 수정 또는 삭제를 방지하기 위해 다음을 사용할 수 있습니다.

```python
# mod.py
import sys
from types import ModuleType

CONSTANT = 3.14

class ImmutableModule(ModuleType):
    def __setattr__(name, value):
        raise AttributeError('Read-only attribute!')
    def __delattr__(name):
        raise AttributeError('Read-only attribute!')

sys.modules[__name__].__class__ = ImmutableModule
```
그러나 이 방법은 제안된 솔루션보다 느리고(~2배), 속성 접근에 있어 눈에 띄는 속도 저하(~2-3배)를 야기합니다.

## 명세 (Specification)
모듈 레벨의 `__setattr__` 함수는 두 개의 인자(속성 이름과 할당될 값)를 받아야 하며, `None`을 반환하거나 `AttributeError`를 발생시켜야 합니다.

```python
def __setattr__(name: str, value: typing.Any, /) -> None: ...
```

`__delattr__` 함수는 하나의 인자(속성 이름)를 받아야 하며, `None`을 반환하거나 `AttributeError`를 발생시켜야 합니다.

```python
def __delattr__(name: str, /) -> None: ...
```

`__setattr__` 및 `__delattr__` 함수는 모듈의 `__dict__`에서 찾아집니다. 만약 존재하면, 속성 설정 또는 삭제를 사용자 정의하기 위해 해당 함수가 호출되고, 그렇지 않으면 일반적인 메커니즘(모듈 딕셔너리에 값 저장/삭제)이 작동합니다.

모듈 `__setattr__` 또는 `__delattr__`을 정의하는 것은 속성 접근 구문을 사용하여 이루어지는 조회에만 영향을 미칩니다. 모듈 전역(모듈 내 `globals()`를 통해 또는 모듈의 전역 딕셔너리 참조를 통해)에 직접 접근하는 것은 영향을 받지 않습니다.

예시:
```python
>>> import mod
>>> mod.__dict__['foo'] = 'spam' # __setattr__를 우회합니다.
```
또는
```python
# mod.py
def __setattr__(name, value):
    ...
foo = 'spam' # __setattr__를 우회합니다.
globals()['bar'] = 'spam' # 이 경우에도 마찬가지
def f():
    global x
    x = 123
f() # 여기도 마찬가지
```
모듈 전역을 사용하고 `__setattr__` (또는 `__delattr__`)를 트리거하려면, 모듈 코드 내에서 `sys.modules[__name__]`을 통해 접근할 수 있습니다.

```python
# mod.py
sys.modules[__name__].foo = 'spam' # __setattr__를 트리거합니다.
```
이러한 제한은 의도된 것입니다(PEP 562와 마찬가지로). 인터프리터가 모듈 전역 접근을 고도로 최적화하기 때문에, 이를 모두 비활성화하고 Python으로 작성된 특별 메서드를 통과하는 것은 코드 속도를 용납할 수 없을 정도로 느리게 만들 것입니다.

## 교육 방법 (How to Teach This)
문서의 "모듈 속성 접근 사용자 정의" 섹션은 새로운 함수를 포함하도록 확장될 것입니다.

## 참조 구현 (Reference Implementation)
이 PEP의 참조 구현은 CPython PR #108261에서 찾을 수 있습니다.

## 하위 호환성 (Backwards compatibility)
이 PEP는 모듈 레벨(전역) 이름인 `__setattr__` 및 `__delattr__`을 사용하는 코드를 손상시킬 수 있지만, 언어 참조는 모든 문서화되지 않은 던더(dunder) 이름을 명시적으로 예약하고 "경고 없이 손상될 수 있음"을 허용합니다.

이 PEP의 성능 영향은 작습니다. 추가적인 딕셔너리 조회는 딕셔너리에 값을 저장/삭제하는 것보다 훨씬 저렴하기 때문입니다. 또한, 사용자가 성능 문제가 될 만큼 속성을 여러 번 설정(및/또는 삭제)할 것으로 예상되는 모듈을 상상하기 어렵습니다. 반면에, 제안된 메커니즘은 속성 접근 속도에 영향을 미치지 않으면서 속성 설정/삭제를 재정의할 수 있게 해줍니다. 이는 성능 저하가 발생할 가능성이 훨씬 높은 시나리오입니다.

## 논의 (Discussion)
Victor Stinner가 지적했듯이, 제안된 API는 표준 라이브러리(stdlib)에서 이미 유용하게 사용될 수 있습니다. 예를 들어, `sys.modules`의 타입이 항상 `dict`임을 보장하거나 중요한 `sys` 속성의 삭제를 방지하는 데 사용될 수 있습니다.

예를 들어, `sys.modules`를 정수로 변경하면 다음과 같은 오류가 발생합니다.
```python
>>> import sys
>>> sys.modules = 123
>>> import asyncio
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<frozen importlib._bootstrap>", line 1260, in _find_and_load
AttributeError: 'int' object has no attribute 'get'
```
또한, `sys.stderr`를 사용하는 코드는 속성이 존재하는지, 그리고 `None`이 아닌지 확인해야 합니다. 현재는 함수를 포함하여 모든 `sys` 속성을 제거할 수 있습니다.
```python
>>> import sys
>>> del sys.excepthook
>>> 1+ # 다음 줄에 sys.excepthook이 없음을 주목하세요
sys.excepthook is missing
File "<stdin>", line 1
  1+
   ^
SyntaxError: invalid syntax
```
다른 stdlib 모듈도 재정의될 수 있는 속성을 가지고 있으며(기능으로서), 일부 입력 유효성 검사가 도움이 될 수 있습니다. 예시로는 `threading.excepthook`, `warnings.showwarning`, `io.DEFAULT_BUFFER_SIZE` 또는 `os.SEEK_SET` 등이 있습니다.

또한, 모듈 속성 접근을 사용자 정의하는 일반적인 사용 사례는 비권장(deprecation) 경고를 관리하는 것입니다. 그러나 PEP 562는 이 시나리오를 부분적으로만 달성합니다. 예를 들어, 이름이 변경된 속성을 변경하려는 시도 중에 경고를 발행하는 것은 불가능합니다.

## 각주 (Footnotes)
 모듈 속성 접근 사용자 정의 (Customizing module attribute access)
 예약된 식별자 클래스 (Reserved classes of identifiers)

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 있거나 CC0-1.0-Universal 라이선스 중 더 허용적인 조건으로 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.