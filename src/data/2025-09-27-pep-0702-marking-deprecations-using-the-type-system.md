---
title: "[Final] PEP 702 - Marking deprecations using the type system"
excerpt: "Python Enhancement Proposal 702: 'Marking deprecations using the type system'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/702/
toc: true
toc_sticky: true
date: 2025-09-27 13:07:08+0900
last_modified_at: 2025-09-27 13:07:08+0900
published: true
---
> **원문 링크:** [PEP 702 - Marking deprecations using the type system](https://peps.python.org/pep-0702/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-Dec-2022

## PEP 702 – 타입 시스템을 이용한 Deprecation 표시

### 개요

이 PEP (Python Enhancement Proposal) 702는 `@warnings.deprecated()` 데코레이터를 추가하여 클래스나 함수가 더 이상 사용되지 않음(deprecated)을 표시하는 방법을 제안합니다. 이 데코레이터를 사용하면 정적 타입 체커(static type checker)가 해당 객체의 사용을 감지하여 경고를 발생시킬 수 있습니다. 기본적으로 이 데코레이터는 런타임에 `DeprecationWarning`을 발생시키기도 합니다.

### 목표

Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것입니다.

### 동기 (Motivation)

소프트웨어가 발전함에 따라 새로운 기능이 추가되고 오래된 기능은 쓸모없게 됩니다. 라이브러리 개발자들은 오래된 코드를 제거하는 방향으로 작업하면서도 사용자들에게 새로운 API로 마이그레이션(migration)할 시간을 주고 싶어 합니다. Python은 이러한 목표를 달성하기 위한 메커니즘으로 `DeprecationWarning` 경고 클래스를 제공하며, 이는 더 이상 사용되지 않는 기능이 사용될 때 경고를 표시하는 데 사용됩니다. 이 메커니즘은 널리 사용되고 있습니다.

그러나 현재의 메커니즘만으로는 더 이상 사용되지 않는 기능의 사용자들이 제때 코드를 업데이트하도록 보장하기에 불충분한 경우가 많습니다. 예를 들어, 오랫동안 더 이상 사용되지 않던 여러 `unittest` 기능의 제거는 사용자들에게 더 많은 업데이트 시간을 주기 위해 Python 3.11에서 되돌려져야 했습니다. 사용자들은 실용적인 이유로 경고를 비활성화한 채로 테스트 스위트(test suite)를 실행할 수 있거나, 테스트로 커버되지 않는 코드 경로에서 `deprecation`이 트리거될 수 있습니다.

사용자들이 더 이상 사용되지 않는 기능을 인지할 수 있는 더 많은 방법을 제공하면 마이그레이션 프로세스 속도를 높일 수 있습니다. 이 PEP는 정적 타입 체커를 활용하여 사용자에게 `deprecation`을 전달하는 것을 제안합니다. 이러한 체커는 사용자 코드에 대한 철저한 의미론적 이해를 가지고 있어, 단순히 `grep`만으로는 찾을 수 없는 `deprecation` 사용을 감지하고 보고할 수 있습니다. 또한, 많은 타입 체커는 IDE와 통합되어 사용자들이 편집기에서 바로 `deprecation` 경고를 볼 수 있도록 합니다.

### 근거 (Rationale)

언뜻 보기에 `deprecation`은 타입 체커가 다룰 주제가 아닌 것처럼 보일 수 있습니다. 타입 체커는 코드가 제대로 작동하는지 확인하는 데 관심이 있지, 잠재적인 미래 변경 사항에는 관심이 없기 때문입니다. 하지만 타입 체커가 타입 오류를 찾기 위해 코드에 대해 수행하는 분석은 많은 `deprecation` 사용을 감지하는 데 필요한 분석과 매우 유사합니다. 따라서 타입 체커는 `deprecation`을 찾고 보고하는 데 적합합니다.

다른 언어들 또한 유사한 기능을 이미 가지고 있습니다. 예를 들어, GCC는 함수 선언에 `deprecated` 속성을 지원하며, GraphQL, Kotlin, Scala, Swift, TypeScript 등도 유사한 `@deprecated` 기능이나 태그를 사용합니다.

여러 사용자들이 이러한 기능에 대한 지원을 요청해왔으며, `Deprecated` 라이브러리나 `flake8-deprecated`와 같은 유사한 서드파티 도구들도 존재합니다.

### 명세 (Specification)

새로운 `@deprecated()` 데코레이터가 `warnings` 모듈에 추가됩니다. 이 데코레이터는 클래스, 함수 또는 메서드를 더 이상 사용되지 않음으로 표시하는 데 사용될 수 있습니다. 여기에는 `typing.TypedDict` 및 `typing.NamedTuple` 정의도 포함됩니다. 오버로드된 함수(overloaded functions)의 경우, 데코레이터는 특정 오버로드가 더 이상 사용되지 않음을 나타내기 위해 개별 오버로드에 적용될 수 있습니다. 또한, 전체 함수가 더 이상 사용되지 않음을 나타내기 위해 오버로드 구현 함수(overload implementation function)에도 적용될 수 있습니다.

데코레이터는 다음 인수를 받습니다.
*   필수 위치 전용 인수(positional-only argument)는 `deprecation` 메시지를 나타냅니다.
*   `category` 및 `stacklevel`이라는 두 개의 키워드 전용 인수(keyword-only arguments)는 런타임 동작을 제어합니다.

위치 전용 인수는 `str` 타입이며, 데코레이트된 객체의 사용을 타입 체커가 발견했을 때 표시되어야 하는 메시지를 포함합니다. 이 메시지는 문자열 리터럴이어야 하며, `deprecation` 메시지의 내용은 사용자에게 달려 있지만, 더 이상 사용되지 않는 객체가 제거될 버전과 제안된 대체 API에 대한 정보를 포함할 수 있습니다.

타입 체커는 더 이상 사용되지 않음으로 표시된 객체의 사용을 발견할 때마다 진단(diagnostic)을 생성해야 합니다.

**예시 (Example)**

다음은 `library.pyi`라는 라이브러리 스텁 예시와 타입 체커가 이 라이브러리 사용을 어떻게 처리해야 하는지를 보여줍니다:

```python
# library.pyi
from warnings import deprecated
from typing import overload, Any

@deprecated("Use Spam instead")
class Ham:
    ...

@deprecated("It is pining for the fiords")
def norwegian_blue(x: int) -> int:
    ...

@overload
@deprecated("Only str will be allowed")
def foo(x: int) -> str:
    ...
@overload
def foo(x: str) -> str:
    ...

class Spam:
    @deprecated("There is enough spam in the world")
    def __add__(self, other: object) -> object:
        ...

    @property
    @deprecated("All spam will be equally greasy")
    def greasy(self) -> float:
        ...

    @property
    def shape(self) -> str:
        ...

    @shape.setter
    @deprecated("Shapes are becoming immutable")
    def shape(self, value: str) -> None:
        ...

# 타입 체커가 처리해야 하는 방식:
from library import Ham # error: Use of deprecated class Ham. Use Spam instead.
import library
library.norwegian_blue(1) # error: Use of deprecated function norwegian_blue. It is pining for the fiords.
map(library.norwegian_blue, [1, 2, 3]) # error: Use of deprecated function norwegian_blue. It is pining for the fiords.
library.foo(1) # error: Use of deprecated overload for foo. Only str will be allowed.
library.foo("x") # no error
ham = Ham() # no error (already reported above)
spam = library.Spam()
spam + 1 # error: Use of deprecated method Spam.__add__. There is enough spam in the world.
spam.greasy # error: Use of deprecated property Spam.greasy. All spam will be equally greasy.
spam.shape # no error
spam.shape = "cube" # error: Use of deprecated property setter Spam.shape. Shapes are becoming immutable.
```

진단 메시지의 정확한 문구는 타입 체커에 따라 다르며 명세의 일부는 아닙니다.

**런타임 동작 (Runtime behavior)**

`@deprecated` 데코레이터는 `category`와 `stacklevel`이라는 두 개의 키워드 전용 인수를 받습니다.
*   `category`: 경고 클래스입니다. 기본값은 `DeprecationWarning`입니다. `None`으로 설정하면 런타임에 경고가 발생하지 않고, `__deprecated__` 속성을 설정하는 것 외에는 원본 객체를 반환합니다.
*   `stacklevel`: 경고를 발생시킬 때 건너뛸 스택 프레임(stack frames) 수입니다. 기본값은 1이며, 더 이상 사용되지 않는 객체가 호출된 위치에서 경고가 발생해야 함을 나타냅니다.

데코레이트된 객체가 클래스인 경우, 데코레이터는 `__new__` 메서드를 래핑(wrap)하여 클래스를 인스턴스화할 때 경고가 발생하도록 합니다. 호출 가능 객체(callable)인 경우, 데코레이터는 원본 호출 가능 객체를 래핑하는 새 호출 가능 객체를 반환하지만, 호출될 때 경고를 발생시킵니다.

런타임 인트로스펙션(introspection)을 위해 데코레이터는 전달된 객체와 데코레이트된 클래스 및 함수에 대해 생성하는 래퍼 호출 가능 객체에 `__deprecated__` 속성을 설정합니다. 이 속성의 값은 데코레이터에 전달된 메시지입니다.

**타입 체커 동작 (Type checker behavior)**

이 PEP는 타입 체커가 `deprecation` 진단을 사용자에게 정확히 어떻게 제시해야 하는지는 명시하지 않습니다. 그러나 특정 버전의 Python만 대상으로 하는 애플리케이션 개발자와 같은 일부 사용자는 `deprecation`에 신경 쓰지 않을 수 있는 반면, 라이브러리 개발자와 같이 라이브러리가 향후 Python 버전과 호환되기를 원하는 사용자는 CI 파이프라인에서 더 이상 사용되지 않는 기능의 사용을 모두 포착하기를 원할 것입니다. 따라서 타입 체커가 두 사용 사례를 모두 포괄하는 구성 옵션을 제공하는 것이 권장됩니다. 다른 타입 체커 오류와 마찬가지로, `# type: ignore` 주석을 사용하여 `deprecation`을 무시할 수도 있습니다.

**Deprecation 정책 (Deprecation policy)**

CPython의 `deprecation` 정책(PEP 387)을 업데이트하여, 가능한 경우 새로운 `deprecation`이 이 PEP의 기능을 사용하여 사용자에게 `deprecation`을 알리도록 요구할 것을 제안합니다. 이는 새로운 `deprecation`이 `typeshed` 레포지토리에 적절한 위치에 `@deprecated` 데코레이터를 추가하는 변경을 동반해야 함을 의미합니다. 이 요구사항은 이 PEP의 기능으로 표현할 수 없는 `deprecation`에는 적용되지 않습니다.

### 하위 호환성 (Backwards compatibility)

새로운 데코레이터를 생성하는 것은 하위 호환성 문제를 일으키지 않습니다. 모든 새로운 타이핑 기능과 마찬가지로, `@deprecated` 데코레이터는 `typing_extensions` 모듈에 추가되어 이전 버전의 Python에서도 사용할 수 있도록 할 것입니다.

### 교육 방법 (How to teach this)

IDE 또는 타입 체커 출력에서 `deprecation` 경고를 접하는 사용자들에게는 받는 메시지가 명확하고 자명해야 합니다. `@deprecated` 데코레이터의 사용은 주로 라이브러리 작성자에게 관련성이 높은 고급 기능이 될 것입니다. 이 데코레이터는 관련 문서(예: PEP 387 및 `DeprecationWarning` 문서)에 더 이상 사용되지 않는 기능을 표시하는 추가적인 방법으로 언급되어야 합니다.

### 참조 구현 (Reference implementation)

`@deprecated` 데코레이터의 런타임 구현은 `typing-extensions` 라이브러리 버전 4.5.0부터 사용할 수 있습니다. `pyanalyze` 타입 체커는 `deprecation` 오류를 발생하는 프로토타입 지원을 가지고 있으며, Pyright도 마찬가지입니다.

### 기각된 아이디어 (Rejected ideas)

**모듈 및 속성의 Deprecation (Deprecation of modules and attributes)**

이 PEP는 클래스, 함수 및 오버로드의 `deprecation`을 다룹니다. 이는 타입 체커가 많은 `deprecation`을 감지할 수 있도록 하지만, 모든 `deprecation`을 감지하지는 못합니다. 추가 기능의 가치를 평가하기 위해 CPython 표준 라이브러리의 모든 현재 `deprecation`을 조사했습니다.

조사 결과, 모듈 전체의 `deprecation`이나 모듈 수준 상수, 객체 속성, 함수 매개변수 `deprecation`에 대한 지원은 이 PEP에 포함되지 않았습니다. 모듈 전체 `deprecation`은 필요성이 제한적이며 `grep`으로 쉽게 감지할 수 있기 때문입니다. 다른 유형의 `deprecation`은 타입 시스템 구현을 복잡하게 만들 수 있어 현재 포함되지 않았습니다. 이러한 기능은 향후 PEP에서 추가될 수 있습니다.

**`typing` 모듈에 데코레이터 배치 (Placing the decorator in the typing module)**

이 PEP의 초기 버전은 `@deprecated` 데코레이터를 `typing` 모듈에 배치할 것을 제안했습니다. 그러나 `typing` 모듈의 데코레이터가 런타임 동작을 갖는 것이 예상 밖일 것이라는 피드백이 있었습니다. 따라서 이 PEP는 대신 `warnings` 모듈에 데코레이터를 추가할 것을 제안합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.