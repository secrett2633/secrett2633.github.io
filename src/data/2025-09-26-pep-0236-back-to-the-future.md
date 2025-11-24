---
title: "[Final] PEP 236 - Back to the __future__"
excerpt: "Python Enhancement Proposal 236: 'Back to the __future__'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/236/
toc: true
toc_sticky: true
date: 2025-09-26 17:05:02+0900
last_modified_at: 2025-09-26 17:05:02+0900
published: true
---
> **원문 링크:** [PEP 236 - Back to the __future__](https://peps.python.org/pep-0236/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 26-Feb-2001


## 동기 (Motivation)

때때로 Python은 핵심 언어 구문의 공표된 의미(semantics)에 호환되지 않는 변경을 가하거나, 의도치 않은(구현에 의존하는) 동작을 변경합니다. 이러한 변경은 신중하게 이루어지며 장기적으로 언어를 개선하기 위함이지만, 단기적으로는 논란의 여지가 있고 혼란을 야기할 수 있습니다.

PEP 5, "Guidelines for Language Evolution"은 이러한 어려움을 완화하기 위한 방법을 제시하며, 이 PEP는 이를 지원하는 메커니즘을 소개합니다.

PEP 227, "Statically Nested Scopes"가 첫 번째 적용 사례이며, 이 PEP에서 예시로 사용됩니다.

## 목표 (Intent)

핵심 언어 구문이나 의미론에 호환되지 않는 변경이 있을 때 다음 정책이 적용됩니다.

*   변경을 도입하는 릴리스 C에서는 기본적으로 구문이나 의미론이 변경되지 않습니다.
*   새로운 구문이나 의미론이 강제될 미래 릴리스 R이 지정됩니다.
*   가능한 경우, 릴리스 R에서 의미가 변경될 수 있는 구문이나 연산에 대해 PEP 230, "Warning Framework"에 설명된 메커니즘을 사용하여 경고가 생성됩니다.
*   새로운 `future_statement` (아래 참조)를 모듈 M에 명시적으로 포함하여, 모듈 M의 코드가 현재 릴리스 C에서 새로운 구문이나 의미론을 사용하도록 요청할 수 있습니다.

따라서, 오래된 코드는 최소한 한 릴리스 동안은 기본적으로 계속 작동하지만, 새로운 경고 메시지가 발생할 수 있습니다. 새로운 구문이나 의미론으로의 마이그레이션은 이 기간 동안 진행될 수 있으며, `future_statement`를 사용하여 해당 모듈이 새로운 구문이나 의미론이 이미 강제되고 있는 것처럼 작동하도록 만듭니다.

기존 코드를 손상시킬 수 있는 경우가 아니라면 새로운 기능에 `future_statement` 메커니즘을 사용할 필요가 없다는 점에 유의해야 합니다. 완전히 하위 호환되는 추가 기능은 해당 `future_statement` 없이 도입될 수 있으며, 그렇게 해야 합니다.

## 구문 (Syntax)

`future_statement`는 예약된 모듈 이름 `__future__`를 사용하는 단순한 `from/import` 문입니다.

```
future_statement: "from" "__future__" "import" feature ["as" name] (","feature ["as" name])*
feature: identifier
name: identifier
```


또한, 모든 `future_statement`는 모듈의 거의 맨 위(near the top)에 나타나야 합니다. `future_statement` 앞에 올 수 있는 유일한 줄은 다음과 같습니다.

*   모듈 docstring (있는 경우)
*   주석 (Comments)
*   빈 줄 (Blank lines)
*   다른 `future_statement`

**예시:**

```python
"""This is a module docstring."""
# This is a comment, preceded by a blank line and followed by
# a future_statement.
from __future__ import nested_scopes
from math import sin
from __future__ import alabaster_weenoblobs # compile-time error!
# That was an error because preceded by a non-future-statement.
```


## 의미론 (Semantics)

`future_statement`는 컴파일 시간에 특별히 인식되고 처리됩니다. 핵심 구문의 의미론 변경은 종종 다른 코드를 생성함으로써 구현되기 때문입니다. 새로운 기능이 새로운 비호환 구문(예: 새로운 예약어)을 도입하는 경우, 컴파일러가 모듈을 다르게 파싱해야 할 수도 있습니다. 이러한 결정은 런타임으로 미뤄질 수 없습니다.

주어진 릴리스에서 컴파일러는 어떤 기능 이름이 정의되었는지 알고 있으며, `future_statement`에 알려지지 않은 기능이 포함되어 있으면 컴파일 시간 오류를 발생시킵니다.

직접적인 런타임 의미론은 다른 `import` 문과 동일합니다. 즉, 나중에 설명할 표준 모듈 `__future__.py`가 있으며, `future_statement`가 실행될 때 일반적인 방식으로 임포트됩니다.

흥미로운 런타임 의미론은 모듈에 나타나는 `future_statement`에 의해 "임포트"된 특정 기능에 따라 달라집니다.

`import __future__ [as name]` 문은 특별한 의미나 구문 제약이 없는 일반적인 `import` 문이며, `future_statement`가 아니라는 점에 유의해야 합니다.

## 예시 (Example)

`scope.py` 파일의 다음 코드를 고려해봅시다.

```python
x = 42
def f():
    x = 666
    def g():
        print "x is", x
    g()
f()
```


*   Python 2.0에서는 `"x is 42"`를 출력합니다.
*   중첩 스코프(PEP 227)는 2.1에 도입되었지만, 2.1에서도 `"x is 42"`를 출력하고 경고를 발생시킵니다.
*   Python 2.2부터는, 또는 2.1에서 `scope.py` 맨 위에 `from __future__ import nested_scopes`가 포함된 경우 `"x is 666"`을 출력합니다.

## 표준 모듈 `__future__.py`

`Lib/__future__.py`는 실제 모듈이며 다음 세 가지 목적을 수행합니다.

1.  `import` 문을 분석하고 임포트하는 모듈을 찾으려고 하는 기존 도구를 혼란스럽게 하지 않기 위함입니다.
2.  Python 2.1 이전 릴리스에서 `future_statement`가 실행될 경우, 최소한 런타임 예외가 발생하도록 보장합니다(`__future__` 임포트가 실패하기 때문).
3.  호환되지 않는 변경이 언제 도입되었고, 언제 강제될 예정이거나 강제되었는지 문서화합니다. 이는 실행 가능한 문서 형태이며, `__future__`를 임포트하고 그 내용을 검사함으로써 프로그래밍 방식으로 확인할 수 있습니다.

`__future__.py`의 각 문은 다음과 같은 형태를 가집니다.

```
FeatureName = "_Feature(" OptionalRelease "," MandatoryRelease ")"
```


여기서 일반적으로 `OptionalRelease < MandatoryRelease`이며, 둘 다 `sys.version_info`와 동일한 형태의 5-튜플입니다.

```python
(PY_MAJOR_VERSION,    # 2.1.0a3에서 2; 정수
 PY_MINOR_VERSION,    # 1; 정수
 PY_MICRO_VERSION,    # 0; 정수
 PY_RELEASE_LEVEL,    # "alpha", "beta", "candidate" 또는 "final"; 문자열
 PY_RELEASE_SERIAL    # 3; 정수
)
```


*   `OptionalRelease`는 `from __future__ import FeatureName`이 허용된 첫 번째 릴리스를 기록합니다.
*   아직 발생하지 않은 `MandatoryRelease`의 경우, 해당 기능이 언어의 일부가 될 릴리스를 예측합니다.
*   그 외의 경우, `MandatoryRelease`는 기능이 언어의 일부가 된 시점을 기록합니다. 이 릴리스 이후에는 모듈이 해당 기능을 사용하기 위해 `from __future__ import FeatureName`를 더 이상 필요로 하지 않지만, 계속 사용할 수는 있습니다.
*   `MandatoryRelease`는 `None`일 수도 있으며, 이는 계획된 기능이 중단되었음을 의미합니다.

`_Feature` 클래스의 인스턴스에는 `.getOptionalRelease()` 및 `.getMandatoryRelease()`라는 두 가지 해당 메서드가 있습니다.

`__future__.py`에서 기능 라인이 삭제되는 일은 없습니다.

**예시 라인:**

```python
nested_scopes = _Feature((2, 1, 0, "beta", 1), (2, 2, 0, "final", 0))
```


이는 `from __future__ import nested_scopes`가 2.1b1 이후의 모든 릴리스에서 작동하며, 중첩 스코프는 2.2 릴리스부터 강제될 예정임을 의미합니다.

## 해결된 문제: 런타임 컴파일 (Resolved Problem: Runtime Compilation)

몇 가지 Python 기능은 모듈의 런타임 동안 코드를 컴파일할 수 있습니다.

*   `exec` 문
*   `execfile()` 함수
*   `compile()` 함수
*   `eval()` 함수
*   `input()` 함수

기능 F를 명시하는 `future_statement`를 포함하는 모듈 M이 현재 릴리스에서 F와 관련하여 미래 릴리스처럼 작동하도록 요청하므로, M 내에서 이러한 함수 중 하나에 전달된 텍스트로부터 동적으로 컴파일된 코드도 F와 관련된 새로운 구문이나 의미론을 사용해야 합니다. Python 2.1 릴리스는 이런 식으로 동작합니다.

그러나 항상 이런 동작이 바람직한 것은 아닙니다. 예를 들어, `doctest.testmod(M)`는 M의 문자열에서 가져온 예제를 컴파일하며, 이 예제는 `doctest` 모듈의 선택이 아니라 M의 선택을 사용해야 합니다. 2.1 릴리스에서는 이것이 불가능하며, 이를 해결할 방법은 아직 제시되지 않았습니다. 참고: PEP 264는 나중에 `compile()`에 선택적 인수를 추가하여 유연한 방식으로 이 문제를 해결했습니다.

어떤 경우든, `exec`, `execfile()`, `compile()`에 의해 동적으로 컴파일된 텍스트의 "거의 맨 위"(위의 구문 참조)에 나타나는 `future_statement`는 생성된 코드 블록에 적용되지만, 해당 `exec`, `execfile()`, `compile()`을 실행하는 모듈에는 더 이상 영향을 미치지 않습니다. 그러나 `eval()`이나 `input()`에는 영향을 미칠 수 없는데, 이는 이들이 표현식 입력만 허용하고 `future_statement`는 표현식이 아니기 때문입니다.

## 해결된 문제: 네이티브 대화형 셸 (Resolved Problem: Native Interactive Shells)

대화형 셸을 얻는 방법에는 두 가지가 있습니다.

*   스크립트 인수 없이 명령줄에서 Python을 호출합니다.
*   `-i` 스위치와 스크립트 인수를 사용하여 명령줄에서 Python을 호출합니다.

대화형 셸은 런타임 컴파일의 극단적인 경우로 볼 수 있습니다. 사실상, 대화형 셸 프롬프트에서 입력된 각 문은 `exec`, `compile()`, `execfile()`의 새 인스턴스를 실행합니다. 대화형 셸에서 입력된 `future_statement`는 마치 `future_statement`가 모듈의 맨 위에 나타난 것처럼 셸 세션의 나머지 수명 동안 적용됩니다.

## 해결된 문제: 시뮬레이션된 대화형 셸 (Resolved Problem: Simulated Interactive Shells)

IDLE 및 Emacs Python 모드와 같은 도구에 의해 "수동으로 빌드된" 대화형 셸은 네이티브 대화형 셸처럼 동작해야 합니다. 그러나 네이티브 대화형 셸에서 내부적으로 사용되는 메커니즘이 노출되지 않았으므로, 자체 대화형 셸을 구축하는 도구들이 원하는 동작을 달성할 명확한 방법이 없었습니다.

참고: PEP 264는 나중에 표준 `codeop.py`에 기능을 추가하여 이 문제를 해결했습니다. 표준 라이브러리 셸 헬퍼를 사용하지 않는 시뮬레이션된 셸은 PEP 264에 의해 추가된 `compile()`의 새로운 선택적 인수를 활용하여 유사한 효과를 얻을 수 있습니다.

## 질의응답 (Questions and Answers)

**Q: 이전 동작으로 돌아가기 위한 "`from __past__`" 버전은 어떻습니까?**
A: 이 PEP의 범위 밖입니다. 저자는 가능성이 낮다고 생각합니다. 이를 추진하려면 PEP를 작성해야 합니다.

**Q: Python 가상 머신 변경으로 인한 비호환성은 어떻습니까?**
A: 이 PEP의 범위 밖입니다. PEP 5는 이 경우에도 유예 기간을 제안하며, `future_statement`도 여기에 역할을 할 수 있습니다.

**Q: Python의 C API 변경으로 인한 비호환성은 어떻습니까?**
A: 이 PEP의 범위 밖입니다.

**Q: `future_statement`를 `try/except` 블록으로 래핑하여 실행 중인 Python 버전에 따라 다른 코드를 사용하고 싶습니다. 왜 할 수 없나요?**
A: 죄송합니다! `try/except`는 런타임 기능이고, `future_statement`는 주로 컴파일 시간 메커니즘입니다. `try/except`는 컴파일러 작업이 완료된 한참 후에 발생합니다. 즉, `try/except`를 수행할 때쯤이면 모듈에 적용되는 의미론은 이미 확정된 상태입니다. `try/except`가 의도한 바를 달성하지 못할 것이므로 단순히 허용되지 않습니다. 또한, 이러한 특별한 문들을 매우 쉽게 찾고 인식할 수 있도록 유지하고자 합니다.
`__future__`를 직접 임포트하고 그 안에 있는 정보와 `sys.version_info`를 사용하여 실행 중인 릴리스가 특정 기능의 상태와 관련하여 어떤 위치에 있는지 파악할 수 있다는 점에 유의하세요.

**Q: `nested_scopes` 예시로 돌아가서, 릴리스 2.2가 나왔는데도 제 코드를 아직 변경하지 않았다면 어떻게 됩니까? 2.1 동작을 유지하려면 어떻게 해야 합니까?**
A: 코드를 변경하기 전까지는 2.2로 옮겨가지 않고 2.1을 계속 사용하면 됩니다. `future_statement`의 목적은 최신 릴리스에 제때 맞춰가는 사람들의 삶을 더 쉽게 만드는 것입니다. 그렇지 않더라도 당신을 싫어하지는 않지만, 당신의 문제는 훨씬 더 해결하기 어렵고, 그런 문제를 가진 사람은 해당 문제를 다루는 PEP를 작성해야 할 것입니다. `future_statement`는 다른 대상을 목표로 합니다.

**Q: `import`를 오버로드하는 것은 좋지 않습니다. 왜 이를 위해 새로운 문을 도입하지 않습니까?**
A: 예를 들어 `lambda lambda nested_scopes`와 같은 것 말입니까? 즉, 새로운 키워드를 도입하지 않는 한, 완전히 새로운 문을 도입할 수 없습니다. 그러나 새로운 키워드를 도입한다면, 그 자체가 오래된 코드를 손상시킬 것입니다. 그것은 너무 아이러니해서 견딜 수 없을 것입니다. 예, `import`를 오버로드하는 것은 좋지 않지만, 대안만큼 강력하게 나쁘지는 않습니다. 현재로서는 `future_statement`는 100% 하위 호환됩니다.

## 저작권 및 참고 자료 (Copyright and References)

이 문서는 공개 도메인으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.