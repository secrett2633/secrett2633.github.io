---
title: "[Rejected] PEP 677 - Callable Type Syntax"
excerpt: "Python Enhancement Proposal 677: 'Callable Type Syntax'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/677/
toc: true
toc_sticky: true
date: 2025-09-27 10:09:13+0900
last_modified_at: 2025-09-27 10:09:13+0900
published: true
---
> **원문 링크:** [PEP 677 - Callable Type Syntax](https://peps.python.org/pep-0677/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 13-Dec-2021


## 요약 (Abstract)

이 PEP는 `typing.Callable`과 동일한 기능을 지원하면서도, 타입이 지정된 함수 시그니처에서 영감을 받은 화살표 문법으로 `Callable` 타입을 표현하는 간결하고 친숙한 문법을 도입합니다. 이를 통해 `Callable[[int, str], bool]`과 같은 타입은 `(int, str) -> bool`로 작성할 수 있습니다.

제안된 문법은 `typing.Callable` 및 `typing.Concatenate`가 제공하는 모든 기능을 지원하며, 기존 문법을 대체할 수 있도록 의도되었습니다.

## 동기 (Motivation)

코드의 안정성과 분석 용이성을 높이는 한 가지 방법은 함수와 클래스에 적절한 타입을 지정하는 것입니다. Python은 PEP 484에 정의된 타입 어노테이션(type annotation)을 통해 버그를 찾고 탭 완성, 정적 분석 도구, 코드 리뷰와 같은 편집기 도구를 돕는 타입 힌트를 제공합니다.

기존 `Callable` 사용에는 몇 가지 문제점이 있습니다.

*   **장황함:** 특히 복잡한 함수 시그니처의 경우 매우 장황합니다.
*   **중첩된 괄호:** 다른 제네릭(generic) 타입과 달리 두 단계의 중첩된 대괄호(bracket)를 사용하며, 타입 파라미터(parameter) 자체가 제네릭 타입인 경우 읽기 어렵습니다.
*   **시각적 불일치:** 함수 시그니처를 작성하는 방식과 시각적으로 유사하지 않습니다.
*   **명시적 임포트:** `list`나 `dict`와 같은 다른 일반적인 타입과 달리 명시적인 임포트(`from typing import Callable`)가 필요합니다.

이러한 문제점들로 인해 개발자들은 `Callable` 타입을 완전히 작성하지 못하는 경우가 많습니다. 예를 들어 `Callable[..., Any]`와 같이 작성하여 파라미터 타입이나 반환 타입을 제대로 검사하지 못하게 되어 정적 타이핑의 이점을 상쇄할 수 있습니다.

이 제안된 문법을 사용하면 `(int) -> list[int]`와 같이 더 간결하고, 함수 헤더의 반환 타입을 나타내는 화살표와 유사하며, 중첩된 괄호를 피하고, 임포트가 필요 없는 형태로 작성할 수 있습니다.

## 근거 (Rationale)

`Callable` 타입은 널리 사용됩니다. 2021년 10월 기준으로 `Optional`, `Tuple`, `Union`, `List` 다음으로 typeshed에서 다섯 번째로 흔한 복합 타입이었습니다.

다른 타입들은 PEP 604나 PEP 585를 통해 문법이 개선되고 임포트 필요성이 제거되었습니다.

*   `typing.Optional[int]`는 `int | None`으로 작성됩니다.
*   `typing.Union[int, str]`은 `int | str`로 작성됩니다.
*   `typing.List[int]`는 `list[int]`로 작성됩니다.
*   `typing.Tuple[int, str]`은 `tuple[int, str]`로 작성됩니다.

`typing.Callable` 타입은 이들 타입만큼 자주 사용되지만, 읽고 쓰기가 더 복잡하며 여전히 임포트와 괄호 기반 문법이 필요합니다.

이 제안은 새로운 기능을 추가하지 않고 `typing.Callable`의 모든 기존 의미론을 지원하도록 선택되었습니다. 기존의 타입 지정된(typed) 및 타입 지정되지 않은(untyped) 오픈 소스 코드에서 각 기능이 얼마나 자주 사용되는지 분석한 결과, 대다수의 사용 사례가 포함된다고 판단했습니다.

명명된(named), 선택적(optional), 가변(variadic) 인자에 대한 지원 추가도 고려되었지만, 분석 결과 이러한 기능은 거의 사용되지 않으므로 포함하지 않기로 결정했습니다. 이러한 기능이 정말 필요한 경우에는 콜백 프로토콜(callback protocol)을 사용하여 타입을 지정할 수 있습니다.

### Callable 타입에 대한 화살표 문법 (An Arrow Syntax for Callable Types)

이 제안은 Python의 함수 헤더와 유사한 `typing.Callable`을 위한 간결하고 사용하기 쉬운 문법을 제안합니다. 이는 TypeScript, Kotlin, Scala와 같은 여러 인기 있는 언어에서 사용되는 문법과 매우 유사합니다.

목표는 다음과 같습니다.

*   이 문법을 사용하는 `Callable` 타입이 배우고 사용하기 쉬울 것, 특히 다른 언어 경험이 있는 개발자에게.
*   라이브러리 작성자가 `Callable`에 대해 더 표현력이 풍부한 타입을 사용할 가능성이 높아져, 타입 체커(type checker)가 코드를 더 잘 이해하고 버그를 찾을 수 있도록 돕는 것.

### ParamSpec을 위한 간결한 문법 (Compact Syntax for ParamSpec)

라이브러리 작성자가 `Callable`에 대한 타입 정보를 생략하는 특히 흔한 경우는 데코레이터(decorator)를 정의할 때입니다. `ParamSpec`을 사용하면 데코레이터의 시그니처를 정확하게 타입 지정할 수 있습니다.

PEP 612를 통해 `ParamSpec`을 사용하여 데코레이터를 올바르게 타입 지정할 수 있지만, 제안된 문법을 사용하면 더욱 간결하고 시각적으로 명확하게 표현할 수 있습니다. 예를 들어, `f: Callable[P, R]`는 `f: ( **P) -> R`로, `Callable[Concatenate[bool, P], R]`는 `(bool, ** P) -> R`로 표현됩니다.

### 다른 언어와의 비교 (Comparing to Other Languages)

많은 인기 있는 프로그래밍 언어들이 제안된 것과 유사한 화살표 문법을 사용합니다.

*   **TypeScript:** `(x: int, y: str) => bool`
*   **Kotlin:** `(Int, String) -> Bool`
*   **Scala:** `(Int, String) => Bool`
*   **ML 계열 언어 (F#, OCaml, Haskell 등):** `Integer -> String -> Bool` (자동 커링(currying)으로 인해 여러 화살표 사용)

Python은 함수 정의에서 `:`를 본문 시작에 사용하고 `->`를 반환 타입 어노테이션에 사용합니다. 이로 인해 `Callable` 타입을 포함하는 함수 정의를 읽을 때 혼란의 가능성이 있습니다. 제안된 PEP에서는 이러한 우려에 대한 피드백을 구했으며, `=>`를 사용하여 구별하는 아이디어도 언급되었습니다.

## 명세 (Specification)

### 타이핑 동작 (Typing Behavior)

타입 체커는 새로운 문법을 `typing.Callable`과 정확히 동일한 의미론으로 처리해야 합니다.

예를 들어, 다음 쌍은 타입 체커에서 동일하게 처리되어야 합니다.

*   `f0: () -> bool`과 `f0: Callable[[], bool]`
*   `f1: (int, str) -> bool`과 `f1: Callable[[int, str], bool]`
*   `f3: async (str) -> str`과 `f3: Callable[[str], Awaitable[str]]`
*   `f4: (**P) -> bool`과 `f4: Callable[P, bool]`
*   `f5: (int, **P) -> bool`과 `f5: Callable[Concatenate[int, P], bool]`
*   `f6: (*Ts) -> bool`과 `f6: Callable[[*Ts], bool]` (PEP 646 지원 시)

### 문법 및 AST (Grammar and AST)

제안된 새로운 문법은 Python의 문법(`Parser/Python.asdl`)에 AST(Abstract Syntax Tree) 변경을 통해 설명됩니다.

몇 가지 중요한 문법적 함의가 있습니다.

*   `->` 연산자는 다른 연산자보다 결합력이 약합니다.
*   `->` 연산자는 오른쪽으로 결합합니다.
*   `async` 키워드도 `Callable` 타입에서 사용할 수 있습니다.
*   함수 시그니처의 전례를 따라 빈 인자 목록에 쉼표를 넣는 것은 불법입니다.
*   `...`를 인자 타입으로 사용하는 것은 의미가 없으며, 혼란을 야기할 수 있으므로 문법에서 허용하지 않습니다.
*   ` **P`의 사용은 `kwargs`에 타입을 지정하기 위한 `** <some_type>`와 같은 미래 제안을 배제합니다.
*   `->` 기반의 람다 문법 (`(x, y) -> x + y`)과는 호환되지 않습니다. 람다에는 `=>`를 사용하는 것이 더 적합하다고 제안합니다.

## 런타임 동작 (Runtime Behavior)

새로운 AST 노드는 런타임 타입으로 평가되어야 하며, 다음 두 가지 목표를 가집니다.

*   명명된 인자(named argument)나 가변 인자(variadic argument)와 같은 새로운 기능을 포함하도록 타입을 확장하는 데 호환될 수 있을 만큼 서술적이고 강력한 구조화된 API를 노출해야 합니다.
*   `typing.Callable`과 하위 호환되는 API도 노출해야 합니다.

`types` 모듈에 새로운 빌트인 타입을 노출하여 새로운 AST 노드가 평가되도록 할 계획이었습니다.

## 거부된 대안 (Rejected Alternatives)

이 제안은 `typing.Callable`보다 더 표현력이 풍부한 많은 대안들을 고려했습니다. 예를 들어, 명명된, 선택적, 가변 인자를 포함하는 시그니처를 설명하는 지원을 추가하는 것 등이 있었습니다.

그러나 다음과 같은 이유로 현재의 단순한 제안을 선택했습니다.

*   대다수의 콜백은 기존 `typing.Callable` 의미론으로 올바르게 설명될 수 있습니다. (위치 인자, `ParamSpec`, `Concatenate`, `TypeVarTuple` 등)
*   명명된, 선택적, 가변 인자를 지원하는 확장된 문법은 구현이 더 어려웠으며, 사용 통계에 따르면 추가된 기능의 3% 미만이 유용했습니다. 이 기능들은 콜백 프로토콜을 사용하여 이미 표현 가능했습니다.
*   함수 시그니처와 더 유사한 문법은 대다수 사용 사례에서 더 장황해질 수 있고, `ParamSpec`의 스코핑 규칙과 충돌할 수 있었습니다.
*   함수를 타입으로 사용하는 아이디어, 하이브리드 키워드-화살표 문법, 괄호 없는 문법, 외부 괄호 요구, `->`의 결합력을 `|`보다 강하게 만드는 것, 타입-문자열(type-strings) 도입, 기존 `Callable` 타입의 사용성 개선 등의 대안들도 고려되었으나, 각각의 단점으로 인해 거부되었습니다.

## 후방 호환성 (Backward Compatibility)

이 PEP는 `typing.Callable`에 대한 주요 문법 개선을 제안하지만, 정적 의미론은 동일합니다. 따라서 후방 호환성을 위해서는 새로운 문법으로 지정된 타입이 `typing.Callable` 및 `typing.Concatenate` 값과 동일하게 동작하도록 보장하는 것뿐입니다.

## 참고 구현 (Reference Implementation)

제안된 문법이 원하는 동작을 갖는지 검증하는 AST 및 문법의 작동하는 구현이 있었습니다. 런타임 동작은 아직 구현되지 않았습니다.

## 미해결 문제 (Open Issues)

*   **런타임 API 세부 사항:** 런타임 API에 대한 완전한 동작 명세를 제공하려고 노력했지만, 전체 구현을 구축하기 전까지는 정의해야 할 더 많은 세부 사항이 있을 수 있습니다.
*   **`SyntaxError` 메시지 최적화:** 현재 참조 구현은 완벽하게 작동하는 파서(parser)를 가지고 있지만, 오류 메시지가 원하는 만큼 유용하지 않은 경우가 있습니다. 예를 들어 `(int, ...) -> bool`은 불법이지만 `(int, ...)`는 유효한 튜플이기 때문에, 실제 원인이 `...`를 인자 타입으로 사용한 것임에도 불구하고 `->`를 문제로 지적하는 구문 오류가 발생할 수 있습니다.

---
**PEP 677은 최종적으로 `Rejected`되었습니다.**

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.