---
title: "[Rejected] PEP 707 - A simplified signature for __exit__ and __aexit__"
excerpt: "Python Enhancement Proposal 707: 'A simplified signature for __exit__ and __aexit__'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/707/
toc: true
toc_sticky: true
date: 2025-09-27 13:09:56+0900
last_modified_at: 2025-09-27 13:09:56+0900
published: true
---
> **원문 링크:** [PEP 707 - A simplified signature for __exit__ and __aexit__](https://peps.python.org/pep-0707/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 18-Feb-2023

## PEP 707: `__exit__` 및 `__aexit__` 메서드의 간소화된 시그니처 (거부됨)

### 거부 공지

이 PEP는 Python Steering Council(SC)에 의해 **거부되었습니다**. SC는 제안된 변경사항의 "마법(magic)"과 잠재적인 호환성 파괴(breakage) 위험이 얻을 수 있는 이점보다 크다고 판단했습니다. 하지만 컨텍스트 매니저(Context Manager) v2 API 또는 새로운 `__leave__` 메서드의 도입 가능성에 대해서는 지지하는 입장을 보였습니다.

### 개요

PEP 707은 컨텍스트 매니저(Context Manager)의 `__exit__()` 및 `__aexit__()` 메서드가 단일 예외 인스턴스(exception instance)만을 인자로 받도록 허용하는 것을 제안했습니다. 이는 기존의 `(typ, exc, tb)` 형태의 세 가지 인자를 받는 시그니처를 하위 호환성(backwards compatibility)을 위해 계속 지원하면서, 동시에 새로운 간소화된 시그니처를 도입하려는 시도였습니다.

이 제안은 Python 언어에서 예외를 나타내는 3가지 요소(유형, 값, 트레이스백)의 중복성을 제거하려는 지속적인 노력의 일환이었습니다. 이 3가지 요소는 초기 Python 버전의 잔재로, 현재는 사용자에게 혼란을 주고 인터프리터(interpreter)에 복잡성과 오버헤드(overhead)를 추가한다는 지적이 있었습니다.

제안된 구현은 인트로스펙션(introspection)을 사용하며, 이는 특정 사용 사례에 맞춰 설계되었습니다. 이 솔루션은 모호하지 않은 경우에만 새로운 기능을 지원하여 안전성을 보장하려고 했습니다. 특히, 세 가지 인자를 받을 수 있는 모든 시그니처는 세 가지 인자를 예상하는 것으로 간주됩니다.

### 동기 (Motivation)

과거에는 Python의 여러 부분에서 예외가 예외의 유형(type), 값(value), 트레이스백(traceback)이라는 세 가지 요소의 튜플(tuple)로 표현되었습니다. 당시에는 이러한 설계에 합당한 이유가 있었지만, 이제는 예외 인스턴스에서 유형과 트레이스백을 안정적으로 추론할 수 있게 되면서 그 필요성이 사라졌습니다. 최근 몇 년 동안 예외 표현을 단순화하려는 여러 노력이 있었습니다.

예를 들어, Python 3.10부터 CPython PR #70577을 통해 `traceback` 모듈의 함수는 위에서 설명한 3-튜플 또는 단일 예외 인스턴스를 인자로 허용합니다. 인터프리터 내부적으로도 예외를 더 이상 3개 요소로 표현하지 않습니다. 3.11에서는 처리된 예외(handled exception)에 대해, 3.12에서는 발생한 예외(raised exception)에 대해 이 변경이 이루어졌습니다. 결과적으로, 3개 요소를 노출하는 여러 API가 더 간단한 대안으로 대체될 수 있게 되었습니다.

| 기존 API (Legacy API) | 대체 API (Alternative) |
| :-------------------- | :--------------------- |
| `sys.exc_info()`      | `sys.exception()`      |
| `PyErr_GetExcInfo()`  | `PyErr_GetHandledException()` |
| `PyErr_SetExcInfo()`  | `PyErr_SetHandledException()` |
| `PyErr_Fetch()`       | `PyErr_GetRaisedException()` |
| `PyErr_Restore()`     | `PyErr_SetRaisedException()` |
| `PyErr_NormalizeException()` | N/A |

이 제안은 이 과정의 한 단계로, 3-튜플 표현이 언어에 남아있는 마지막 사례 중 하나에 대한 향후 방향을 고려했습니다. 이러한 모든 작업의 동기는 크게 두 가지입니다.

#### 1. 언어 구현의 간소화 (Simplify the implementation of the language)

처리된 예외의 내부 표현을 단일 객체로 줄임으로써 인터프리터 구현에 상당한 간소화가 이루어졌습니다. 이전에는 인터프리터가 예외와 관련된 작업을 할 때마다 스택(stack)에 세 가지 항목을 푸시/팝(push/pop)해야 했습니다. 이는 스택 깊이를 증가시키고 (캐시 및 레지스터에 압력을 가함) 일부 바이트코드(bytecodes)를 복잡하게 만들었습니다. 이를 단일 항목으로 줄임으로써 `ceval.c` (인터프리터의 평가 루프 구현)에서 약 100줄의 코드를 제거했으며, 이후에는 일반적인 스택 조작 명령으로 대체될 만큼 단순해진 `POP_EXCEPT_AND_RERAISE` opcode가 제거되었습니다. 마이크로-벤치마크(micro-benchmarks) 결과, 예외 포착 및 발생, 제너레이터(generator) 생성에서 약 10%의 속도 향상이 나타났습니다. 요약하자면, Python 내부에서 이러한 중복성을 제거하는 것은 인터프리터를 간소화하고 더 빠르게 만들었습니다.

컨텍스트 매니저를 벗어날 때 `__exit__` / `__aexit__` 호출의 성능 또한 다중 인자 함수 호출을 단일 인자 함수 호출로 대체함으로써 개선될 수 있었습니다. 마이크로-벤치마크 결과, 단일 인자 `__exit__`를 사용하는 컨텍스트 매니저의 진입 및 종료가 약 13% 더 빨랐습니다.

#### 2. 언어 자체의 간소화 (Simplify the language itself)

Python이 인기를 얻은 이유 중 하나는 그 단순성입니다. `sys.exc_info()` 튜플은 새로운 학습자에게는 이해하기 어렵고, 이를 이해하는 사람들에게도 그 중복성은 혼란을 줍니다.

`sys.exc_info()`를 `deprecated`할 수 있는 시점까지 도달하는 데는 여러 릴리스가 걸릴 것입니다. 그러나 새로운 학습자들이 레거시 코드(legacy code)를 유지보수하기 전까지는 `sys.exc_info()`나 3-튜플 표현에 대해 알 필요가 없는 단계에 비교적 빠르게 도달할 수 있습니다.

### 근거 (Rationale)

이러한 변경이 가져올 수 있는 혼란에 대한 우려가 없다면, 3-튜플이 언어에 남아있는 마지막 부분을 제거하는 것에 반대할 이유가 없습니다. 이 PEP의 목표는 `__exit__`의 경우에 이 변경을 안전하고 점진적이며 최소한의 혼란으로 수행하는 방법을 제안하고, 이를 통해 메서드 시그니처(method signature)를 발전시키기 위한 옵션에 대한 논의를 시작하는 것이었습니다.

`traceback` 모듈의 API의 경우, 함수를 하이브리드 시그니처(hybrid signature)로 발전시키는 것은 비교적 간단하고 안전합니다. 함수는 하나의 위치 인자(positional argument)와 두 개의 선택적 인자(optional arguments)를 취하고, 해당 유형에 따라 해석합니다. 이는 기본값으로 센티넬(sentinels)을 사용할 때 안전합니다. 사용자 프로그램에 의해 정의되는 콜백(callback)의 시그니처는 발전시키기 더 어렵습니다.

가장 안전한 옵션은 사용자가 콜백이 기대하는 시그니처를 추가 속성으로 표시하거나 다른 이름을 부여하여 명시적으로 나타내도록 하는 것입니다. 예를 들어, 인터프리터가 컨텍스트 매니저에서 `__leave__` 메서드를 찾고, 존재하면 단일 인자로 호출하도록 할 수 있었습니다 (그렇지 않으면 `__exit__`를 찾고 현재와 같이 작동). 여기에서 제안된 인트로스펙션 기반의 대안은 사용자가 새로운 코드를 작성할 때 더 편리하도록 의도되었습니다. 왜냐하면 사용자는 단일 인자 버전을 사용하고 레거시 API를 몰라도 되기 때문입니다. 하지만 인트로스펙션의 한계가 너무 심각하다고 판단되면 명시적인 옵션을 고려해야 했습니다. 유사한 기능을 가진 `__exit__`와 `__leave__`가 5~10년 동안 공존하는 것은 이상적이지 않지만, 하나의 옵션이었습니다.

제안서의 한계는 다음과 같습니다. 2-인자 Python 함수와 `METH_O` C 함수를 단일 인자 시그니처로 식별하고, 그 외의 모든 것은 3개 인자를 예상한다고 가정합니다. 이 휴리스틱(heuristic)에 대해 거짓 부정(false negatives, 즉 단일 인자 콜백인데도 그렇게 식별되지 않는 경우)이 발생하는 것이 가능합니다. 이런 방식으로 작성된 컨텍스트 매니저는 작동하지 않고, `__exit__` 함수가 세 개의 인자로 호출될 때 현재와 같이 실패할 것입니다.

이것이 실제 문제로 이어지지 않을 것이라고 제안자는 믿었습니다. 첫째, 모든 기존 코드는 계속 작동할 것이므로, 이는 기존 코드에 영향을 미치는 문제라기보다는 새로운 코드에 대한 한계입니다. 둘째, 이례적인 호출 가능(callable) 유형은 `__exit__`에 거의 사용되지 않으며, 필요한 경우 일반적인 메서드로 감싸서 콜백에 위임할 수 있습니다.

```python
class C:
    __enter__ = lambda self: self
    __exit__ = ExoticCallable()

# 다음과 같이 변경할 수 있습니다.

class CM:
    __enter__ = lambda self: self
    _exit = ExoticCallable()
    __exit__ = lambda self, exc: CM._exit(exc)
```
이 PEP에서 문제의 실제 영향을 논의할 때, 대부분의 `__exit__` 함수는 인자를 전혀 사용하지 않는다는 점에 주목할 필요가 있습니다. 일반적으로 컨텍스트 매니저는 종료 시 일부 정리 작업이 수행되도록 구현됩니다. `__exit__` 함수가 컨텍스트 내에서 발생한 예외를 처리하는 것은 드물며, 일반적으로 예외는 `__exit__`를 벗어나 호출 함수로 전파되도록 허용됩니다. 이는 대부분의 `__exit__` 함수가 인자에 전혀 접근하지 않는다는 것을 의미하며, 다양한 솔루션이 Python 사용자 기반에 미치는 영향을 평가할 때 이를 고려해야 합니다.

### 명세 (Specification)

컨텍스트 매니저의 `__exit__` / `__aexit__` 메서드는 단일 인자 시그니처를 가질 수 있으며, 이 경우 인터프리터는 예외 인스턴스 또는 `None`을 인자로 호출합니다.

```python
>>> class C:
...     def __enter__(self):
...         return self
...     def __exit__(self, exc):
...         print(f'__exit__ called with: {exc!r}')
...
>>> with C():
...     pass
...
__exit__ called with: None
>>> with C():
...     1/0
...
__exit__ called with: ZeroDivisionError('division by zero')
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
ZeroDivisionError: division by zero
```
`__exit__` / `__aexit__`가 다른 시그니처를 가지면, 현재와 같이 3-튜플 `(typ, exc, tb)`로 호출됩니다.

```python
>>> class C:
...     def __enter__(self):
...         return self
...     def __exit__(self, *exc): # 가변 인자 시그니처는 3-튜플로 간주
...         print(f'__exit__ called with: {exc!r}')
...
>>> with C():
...     pass
...
__exit__ called with: (None, None, None)
>>> with C():
...     1/0
...
__exit__ called with: (<class 'ZeroDivisionError'>, ZeroDivisionError('division by zero'), <traceback object at 0x1039cb570>)
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
ZeroDivisionError: division by zero
```
다음과 같은 `__exit__` 메서드도 3-튜플로 호출됩니다.

```python
def __exit__(self, typ, *exc): pass
def __exit__(self, typ, exc, tb): pass
```
인터프리터가 컨텍스트 매니저의 스코프(scope) 끝에 도달하여 관련 `__exit__` 또는 `__aexit__` 함수를 호출할 때, 단일 인자 버전인지 레거시(legacy) 3-인자 버전인지 판단하기 위해 이 함수를 인트로스펙션합니다. 제안된 PR에서는 이 인트로스펙션을 `is_legacy___exit__` 함수가 수행했습니다.

요약하자면, `exit_func`는 다음과 같은 경우 단일 인자로 호출됩니다.
*   `self`를 포함하여 `argcount`가 2이고 `vararg`가 없는 `PyMethod`인 경우.
*   `METH_O` 플래그가 있는 `PyCFunction`인 경우.

### 하위 호환성 (Backwards Compatibility)

이전에 작동했던 모든 컨텍스트 매니저는 인터프리터가 세 개의 인자를 받을 수 있는 경우에 항상 세 개의 인자로 호출하므로, 동일하게 계속 작동합니다. `exit_func`가 단일 인자를 기대했기 때문에 `TypeError` 예외가 발생하며 작동하지 않았던 컨텍스트 매니저는 이제 호출이 성공할 수 있습니다. 이는 이론적으로 기존 코드의 동작을 변경할 수 있지만, 실제로는 문제가 될 가능성이 낮습니다.

하위 호환성 문제는 라이브러리가 컨텍스트 매니저를 다중 인자 시그니처에서 단일 인자 시그니처로 마이그레이션(migrate)하려고 할 때 발생할 수 있습니다. 인터프리터의 평가 루프 이외의 코드에서 `__exit__` 또는 `__aexit__`가 호출되는 경우 인트로스펙션은 자동으로 발생하지 않습니다. 예를 들어, 컨텍스트 매니저가 서브클래싱(subclassing)되고 파생된 `__exit__`에서 `__exit__` 메서드가 직접 호출되는 경우입니다. 이러한 컨텍스트 매니저는 사용자와 함께 단일 인자 버전으로 마이그레이션해야 하며, 기존 API를 중단하는 대신 병렬 API를 제공할 수 있습니다. 또는 슈퍼클래스(superclass)는 `__exit__(self, *args)` 시그니처를 유지하고 단일 인자와 세 개의 인자 모두를 지원할 수 있습니다. 대부분의 컨텍스트 매니저는 `__exit__`의 인자 값을 사용하지 않고 예외가 계속 전파되도록 허용하므로, 이것이 일반적인 접근 방식이 될 가능성이 높습니다.

### 교육 방법 (How to Teach This)

언어 튜토리얼(tutorial)은 단일 인자 버전을 제시하고, 컨텍스트 매니저 문서에는 `__exit__` 및 `__aexit__`의 레거시 시그니처에 대한 섹션이 포함될 예정이었습니다.

### 참고 구현 (Reference Implementation)

CPython PR #101995에서 이 PEP의 제안을 구현했습니다.

### 거부된 아이디어 (Rejected Ideas)

#### `__leave__(self, exc)` 지원

새로운 시그니처를 가진 `__leave__`와 같은 새로운 이름의 메서드를 지원하는 방안이 고려되었습니다. 이는 프로그래머가 사용하려는 시그니처를 명시적으로 선언하도록 하여 인트로스펙션의 필요성을 피하게 합니다.

이 아이디어의 다양한 변형은 `__leave__`와 `__exit__` 사이의 동등성을 자동화하는 데 도움이 될 수 있는 다양한 양의 "마법(magic)"을 포함합니다. 예를 들어, Mark Shannon은 클래스에 `__exit__`와 `__leave__` 중 하나가 정의될 때마다 타입 생성자(type constructor)가 각각에 대한 기본 구현을 추가할 것을 제안했습니다. 이 기본 구현은 사용자 함수를 호출하는 트램폴린(trampoline) 역할을 합니다. 이는 상속(inheritance)이 원활하게 작동하게 하고, 특정 클래스의 `__exit__`에서 `__leave__`로의 마이그레이션도 가능하게 했을 것입니다. 인터프리터는 `__leave__`를 호출하기만 하면 되고, 필요할 때 `__exit__`를 호출했을 것입니다.

이 제안은 현재 제안보다 여러 가지 장점이 있었지만, 두 가지 단점이 있었습니다. 첫째, 데이터 모델에 새로운 던더(dunder) 이름(`__leave__`)을 추가하게 되며, 결국 동일한 의미를 가지면서 시그니처만 약간 다른 두 개의 던더를 갖게 됩니다. 둘째, 모든 `__exit__`를 `__leave__`로 마이그레이션해야 하는 반면, 인트로스펙션을 사용하면 인자에 접근하지 않는 많은 `__exit__(*arg)` 메서드를 변경할 필요가 없었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.