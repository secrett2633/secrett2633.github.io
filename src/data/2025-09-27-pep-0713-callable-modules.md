---
title: "[Rejected] PEP 713 - Callable Modules"
excerpt: "Python Enhancement Proposal 713: 'Callable Modules'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/713/
toc: true
toc_sticky: true
date: 2025-09-27 13:12:51+0900
last_modified_at: 2025-09-27 13:12:51+0900
published: true
---
> **원문 링크:** [PEP 713 - Callable Modules](https://peps.python.org/pep-0713/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 20-Apr-2023

PEP 713 – 호출 가능한 모듈 (Callable Modules)

**상태:** 거부됨 (Rejected)
**작성자:** Amethyst Reese
**후원자:** Łukasz Langa
**생성일:** 2023년 4월 20일
**Python 버전:** 3.12

---

### 거부 공지 (Rejection Notice)
PEP 713은 Python Steering Council에 의해 거부되었습니다. Steering Council은 일관성 측면에서 구현 가능하더라도, 이 PEP를 도입해야 할 설득력 있는 이유를 찾지 못했습니다. 그러나 이 아이디어가 미래에 다시 논의될 경우, 이 PEP는 유용한 사전 논의 자료로 활용될 수 있습니다.

### 개요 (Abstract)
현재 Python 모듈은 직접 호출할 수 없습니다. 클래스는 `__call__` 메서드를 정의하여 인스턴스 객체를 호출 가능하게 만들 수 있지만, 전역 모듈 스코프에 동일한 이름의 함수를 정의하는 것은 아무런 효과가 없으며, 해당 함수는 `module.__call__` 형태로 직접 임포트하거나 참조해야만 호출할 수 있습니다. PEP 562는 모듈을 위한 `__getattr__()` 및 `__dir__()` 지원을 추가했지만, `__getattr__`를 정의하여 `__call__`에 대한 값을 반환하더라도 모듈을 호출 가능하게 만들지는 못했습니다.

이 PEP는 모듈의 전역 네임스페이스에 `__call__` 객체(표준 함수 또는 임의의 호출 가능한 객체)를 정의함으로써 모듈을 직접 호출 가능하게 만드는 지원을 제안했습니다.

### 동기 (Motivation)
많은 모듈은 단 하나의 주된 기능을 제공하는 경우가 많습니다. 이러한 경우, 해당 인터페이스가 단일 호출 가능한 객체인 경우가 많으며, 모듈을 직접 임포트하여 호출 가능한 형태로 사용하는 것이 사용자에게 더 "Pythonic"한 인터페이스를 제공할 수 있습니다.

**예시:**
```python
# user.py
import fancy

@fancy
def func(...):
    ...
```

현재 이러한 스타일의 인터페이스를 제공하려면 런타임에 모듈 객체를 수정하여 호출 가능하게 만들어야 합니다.

일반적으로 이는 `sys.modules`에서 모듈 객체를 호출 가능한 대체 객체(예: 함수 또는 클래스 인스턴스)로 교체하여 수행됩니다.

**예시 (기존 방식 1):**
```python
# fancy.py
def fancy(...):
    ...
import sys
sys.modules[__name__] = fancy
```
이 방식은 `from module import member`와 같은 구문에서도 원본 모듈에 접근할 수 없게 만들며, `__doc__`, `__package__`, `__path__` 등과 같은 특수 모듈 속성들이 누락된 "모듈" 객체를 초래합니다.

또 다른 방법으로, 모듈 작성자는 모듈의 `__class__` 속성을 호출 가능한 인터페이스를 제공하는 커스텀 타입으로 오버라이드할 수 있습니다.

**예시 (기존 방식 2):**
```python
# fancy.py
def fancy(...):
    ...
import sys
import types
class FancyModule(types.ModuleType):
    def __call__(self, *args, **kwargs):
        return fancy(*args, **kwargs)
sys.modules[__name__].__class__ = FancyModule
```

두 가지 접근 방식 모두 추가적인 보일러플레이트 코드(boilerplate)를 유발할 뿐만 아니라, 런타임에 모듈이 호출 가능하다는 것을 인식하지 못하는 타입 검사기(type checker)에서 오류가 발생하는 단점이 있습니다.

** 타입 검사기 오류 예시: **
```
$ mypy user.py
user.py:3: error: Module not callable [operator]
Found 1 error in 1 file (checked 1 source file)
```


### 제안 사양 (Specification)
모듈 객체가 호출될 때, `__call__` 객체가 발견되면( `__getattr__` 또는 `__dict__` 조회를 통해), 해당 객체는 주어진 인수로 호출됩니다.
만약 `__call__` 객체가 발견되지 않으면, 기존 동작과 일치하게 `TypeError`가 발생합니다.

다음 예시들은 모두 유효하고 호출 가능한 모듈로 간주되었을 것입니다.

** 예시 1 (함수 사용):**
```python
# hello.py
def __call__(*args, **kwargs):
    pass
```

** 예시 2 (클래스 인스턴스 사용):**
```python
# hello.py
class Hello:
    def __call__(self, *args, **kwargs):
        pass
__call__ = Hello() # 또는 __call__ = Hello
```

** 예시 3 (__getattr__ 사용): **
```python
# hello.py
def hello():
    pass
def __getattr__(name):
    if name == "__call__":
        return hello
    raise AttributeError(f"module '{__name__}' has no attribute '{name}'")
```

첫 두 가지 방식이 타입 검사기와 같은 도구의 정적 분석을 더 쉽게 하기 때문에 일반적으로 선호되어야 합니다. 하지만 세 번째 방식도 구현의 일관성을 위해 허용될 수 있습니다. 이 제안의 의도는 임의의 호출 가능한 객체를 모듈의 `__call__` 속성에 할당하거나 모듈의 `__getattr__` 메서드에서 반환할 수 있도록 하여, 모듈 작성자가 사용자를 위해 모듈을 호출 가능하게 만드는 가장 적합한 메커니즘을 선택할 수 있도록 하는 것이었습니다.

### 하위 호환성 및 성능 영향 (Backwards Compatibility and Impact on Performance)
이 PEP는 하위 호환성 문제를 일으키지 않을 것으로 예상되었습니다. `__call__` 객체를 이미 포함하고 있는 모든 모듈은 이전과 동일하게 작동하며, 직접 호출될 수 있는 추가적인 기능만 갖게 될 것이었습니다. 기존 `__call__` 객체를 가진 모듈이 호출 시 `TypeError`를 발생시키는 기존 동작에 의존할 가능성은 낮다고 판단되었습니다.

이 PEP의 성능 영향은 최소화될 것으로 보았습니다. 왜냐하면 이는 새로운 인터페이스를 정의하기 때문입니다. 모듈을 호출하면 모듈 객체에서 `__call__` 이름에 대한 조회가 트리거됩니다. 호출 가능한 모듈을 만들기 위한 기존의 해결 방법들은 이미 일반 객체에 대한 이러한 동작에 의존하고 있으므로, 이러한 호출 가능한 모듈에 대해서도 유사한 성능을 보일 것이었습니다.

타입 검사기는 `__call__` 객체를 가진 모듈을 호출 가능한 것으로 처리하도록 업데이트되어야 했을 것입니다. 이는 호출 가능한 모듈을 지원하지 않는 이전 Python 버전을 대상으로 하는 코드를 검사할 때 타입 검사기에서 지원 가능해야 하며, 이러한 모듈도 모듈을 호출 가능하게 만들기 위해 위에서 언급된 해결 방법 중 하나를 포함할 것이라는 예상 하에 지원되어야 했을 것입니다.

### 교육 방법 (How to Teach This)
호출 가능한 타입(callable types)에 대한 문서에는 모듈이 목록에 포함되고, `__call__()`로 연결되는 링크가 추가될 예정이었습니다. "호출 가능한 객체 에뮬레이션(Emulating callable objects)" 문서에는 모듈 속성 접근 사용자 정의 섹션과 유사하게, 호출 가능한 모듈을 다루는 섹션이 예제 코드와 함께 포함될 예정이었습니다.

### 참조 구현 (Reference Implementation)
호출 가능한 모듈의 제안된 구현은 CPython PR #103742에서 확인 가능했습니다.

### 거부된 아이디어 (Rejected Ideas)
`__getattr__` 및 `__dir__`의 도입과 `__call__` 사용을 가능하게 하려는 제안을 고려했을 때, `__or__`, `__iter__`와 같은 모든 특수 메서드 이름(Special method names)을 모듈에 허용할 가치가 있는지에 대한 논의가 있었습니다. 이는 완전히 바람직하지 않은 것은 아니었지만, 하위 호환성 문제의 가능성을 높이고, 이러한 다른 특수 메서드들은 `__call__`에 비해 라이브러리 작성자에게 유용성이 적을 것으로 판단되어 채택되지 않았습니다.

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.