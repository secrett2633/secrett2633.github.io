---
title: "[Accepted] PEP 749 - Implementing PEP 649"
excerpt: "Python Enhancement Proposal 749: 'Implementing PEP 649'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/749/
toc: true
toc_sticky: true
date: 2025-09-27 13:37:09+0900
last_modified_at: 2025-09-27 13:37:09+0900
published: true
---
> **원문 링크:** [PEP 749 - Implementing PEP 649](https://peps.python.org/pep-0749/)
>
> **상태:** Accepted | **유형:** Standards Track | **작성일:** 28-May-2024

PEP 749 – PEP 649 구현

이 문서는 PEP 649를 보완하는 Python Enhancement Proposal (PEP)입니다. PEP 649의 사양에 대한 다양한 조정 및 추가 사항을 제공하여, Python 3.14에서 annotations의 동작을 명확히 하고 개선하는 것을 목표로 합니다.

**작성자:** Jelle Zijlstra
**상태:** Accepted (수락됨)
**유형:** Standards Track
**주제:** Typing
**필요한 PEP:** 649
**생성일:** 2024년 5월 28일
**Python 버전:** 3.14
**해결일:** 2025년 5월 5일

---

## 요약 (Abstract)

이 PEP는 PEP 649의 사양에 여러 조정 및 추가 사항을 제공함으로써 이를 보완합니다. 주요 내용은 다음과 같습니다.

*   `from __future__ import annotations` (PEP 563)는 적어도 Python 3.13의 end-of-life까지 현재 동작을 유지합니다. 이후에는 DeprecationWarning이 발생하고, 최종적으로 제거될 예정입니다.
*   새로운 표준 라이브러리 모듈인 `annotationlib`가 추가되어 annotations를 위한 도구를 제공합니다. 여기에는 `get_annotations()` 함수, annotation 형식을 위한 enum, `ForwardRef` 클래스, 그리고 `__annotate__` 함수 호출을 돕는 헬퍼 함수가 포함될 것입니다.
*   REPL에서의 annotations는 다른 모듈 레벨 annotations와 마찬가지로 지연 평가(lazily evaluated)됩니다.
*   `classmethod()`나 `functools.wraps()`를 사용하는 코드와 같이 `__annotations__`를 제공하는 래퍼(wrapper) 객체의 동작을 명시합니다.
*   `__annotate__` 함수가 "가짜 전역(fake globals)" 환경에서 실행될 수 있음을 표시하는 코드 플래그는 사용되지 않습니다. 대신, 세 번째 형식인 `VALUE_WITH_FAKE_GLOBALS`가 추가되어 `annotate` 함수의 서드파티 구현자가 지원하는 형식을 나타낼 수 있도록 합니다.
*   `__annotations__` 속성을 직접 삭제하면 `__annotate__`도 지워집니다.
*   PEP 695 및 PEP 696에 의해 추가된 타입 별칭(type alias) 값, 타입 매개변수 바운드(bound), 및 기본값(default)을 PEP 649와 유사한 방식으로 평가할 수 있는 기능이 추가됩니다.
*   `SOURCE` 형식의 이름이 `STRING`으로 변경되어 명확성을 높이고 사용자 혼동의 위험을 줄입니다.
*   조건부로 정의된 클래스 및 모듈 annotations가 올바르게 처리됩니다.
*   부분적으로 실행된 모듈에서 annotations에 접근할 경우, 지금까지 실행된 annotations가 반환되지만, 캐시되지 않습니다.

---

## 동기 (Motivation)

PEP 649는 Python에서 annotations에 대한 더 나은 의미론을 만들기 위한 훌륭한 프레임워크를 제공합니다. 이는 정적 타입 힌트(static type hints) 및 런타임 타이핑(runtime typing)을 사용하는 사용자의 일반적인 어려움을 해결하며, 언어를 더욱 우아하고 강력하게 만듭니다. 이 PEP는 원래 Python 3.10을 위해 2021년에 제안되었고 2023년에 승인되었습니다. 그러나 구현에 예상보다 오랜 시간이 걸렸으며, 이제 Python 3.14에서 구현될 것으로 예상됩니다.

CPython에서 PEP 구현 작업을 시작하면서, 원래 PEP가 일부 영역을 불분명하게 남겨두었으며, 특정 코너 케이스에서의 결정이 의문스럽다는 것을 발견했습니다. 이 새로운 PEP는 이러한 문제를 해결하기 위해 사양에 여러 변경 및 추가 사항을 제안합니다.

이 PEP는 PEP 649를 대체하는 것이 아니라 보완합니다. 여기서 제안된 변경 사항은 전반적인 사용자 경험을 개선해야 하지만, 이전 PEP의 일반적인 프레임워크를 변경하지는 않습니다.

---

## `from __future__ import annotations`의 미래

PEP 563은 이전에 `from __future__ import annotations`를 도입하여 모든 annotations를 문자열로 변경했습니다. PEP 649는 이 future import가 필요 없는 대안적인 접근 방식을 제안하며 다음과 같이 명시합니다.

> 이 PEP가 승인되면, PEP 563은 deprecated되고 최종적으로 제거될 것입니다.

그러나 PEP 649는 이 deprecation에 대한 상세한 계획을 제공하지 않습니다.

### 명세 (Specification)

다음과 같은 deprecation 계획이 제안됩니다.

*   **Python 3.14에서는** `from __future__ import annotations`가 이전과 동일하게 작동하며, annotations를 문자열로 변환합니다.
    *   future import가 활성화된 경우, annotations를 가진 객체의 `__annotate__` 함수는 `VALUE` 형식으로 호출될 때 `__annotations__`의 동작을 반영하여 annotations를 문자열로 반환합니다.
*   PEP 649 의미론을 지원하지 않는 마지막 릴리스(예상 3.13)가 end-of-life에 도달한 후, `from __future__ import annotations`는 deprecated됩니다. future import를 사용하는 모든 코드는 `DeprecationWarning`을 발생시킵니다. 이는 Python 3.13이 end-of-life에 도달한 후 첫 번째 릴리스보다 빠르지 않으며, 커뮤니티는 더 오래 기다리기로 결정할 수도 있습니다.
*   최소 두 릴리스 이후, future import는 제거되며, annotations는 항상 PEP 649에 따라 평가됩니다. future import를 계속 사용하는 코드는 다른 정의되지 않은 future import와 유사하게 `SyntaxError`를 발생시킵니다.

### 거부된 대안 (Rejected alternatives)

*   **future import를 즉시 no-op으로 만들기:** Python 3.14에서 모든 코드에 PEP 649 의미론을 적용하여 future import를 no-op으로 만드는 것을 고려했습니다. 그러나 이는 3.13에서 작동하는 특정 코드를 손상시킬 수 있습니다. 예를 들어, `__future__ import annotations`가 활성화되어 있고, 포워드 레퍼런스(forward references)에 의존하는 annotations가 메타클래스(metaclass) 또는 클래스/함수 데코레이터에 의해 import 시점에 즉시 평가되는 경우입니다 (예: `typing_extensions.TypedDict`의 릴리스 버전). 이는 일반적인 패턴으로 예상되므로, 3.13에서 3.14로 업그레이드하는 동안 이러한 코드를 손상시킬 수는 없습니다.
*   **future import를 즉시 deprecate하기:** Python 3.13이 end-of-life에 도달할 때까지 기다리는 대신, future import가 사용될 때 즉시 경고를 발생시킬 수 있었습니다. 그러나 많은 라이브러리가 이미 `from __future__ import annotations`를 annotations에서 무제한 포워드 레퍼런스를 활성화하는 우아한 방법으로 사용하고 있습니다. 즉시 deprecate하면, 이러한 라이브러리가 지원되는 모든 Python 버전에서 deprecation 경고를 피하면서 무제한 포워드 레퍼런스를 사용하는 것이 불가능해집니다.
*   **future import를 영원히 유지하기:** future import를 무기한으로 유지하는 것도 고려할 수 있었습니다. 그러나 이는 Python 언어의 동작을 영구적으로 분기시킬 것이며, 언어는 단일 의미론을 가져야 하므로 바람직하지 않습니다.
*   **미래에 future import를 no-op으로 만들기:** `from __future__ import annotations`를 `SyntaxError`로 만드는 대신, Python 3.13이 end-of-life에 도달한 후 어느 시점에서 아무것도 하지 않도록 만들 수 있었습니다. 이는 현재 no-op으로 만드는 것과 동일한 몇 가지 문제를 여전히 가지고 있지만, 생태계가 적응할 시간이 더 길어졌을 것입니다. 사용자가 문자열화된 annotations에 의존하지 않는다는 것을 확인한 후에는 코드에서 future import를 명시적으로 제거하는 것이 더 좋습니다.

---

## 새로운 `annotationlib` 모듈 (New annotationlib module)

PEP 649는 `inspect` 모듈에 annotations 관련 도구를 추가할 것을 제안합니다. 그러나 해당 모듈은 상당히 크고, 최소 35개의 다른 표준 라이브러리 모듈에 직간접적으로 의존하며, import 시간이 너무 느려서 다른 표준 라이브러리 모듈에서 import하는 것이 종종 권장되지 않습니다. 또한, `inspect.get_annotations()` 함수와 `VALUE`, `FORWARDREF`, `SOURCE` 형식 외에 더 많은 도구를 추가할 것으로 예상됩니다.

새로운 표준 라이브러리 모듈은 이 기능을 위한 논리적인 보금자리를 제공하며, annotations 소비자를 위한 더 유용한 도구를 추가할 수 있도록 합니다.

### 근거 (Rationale)

PEP 649는 `inspect.get_annotations()`에서 `FORWARDREF` 형식을 구현하는 데 `typing.ForwardRef`를 사용해야 한다고 명시합니다. 그러나 `typing.ForwardRef`의 기존 구현은 `typing` 모듈의 나머지 부분과 얽혀 있으며, 일반적인 `get_annotations()` 함수에 `typing` 특정 동작을 추가하는 것은 의미가 없습니다. 또한, `typing.ForwardRef`는 문제가 있는 클래스입니다. 공개되고 문서화되어 있지만, 문서에는 속성이나 메서드가 나열되어 있지 않습니다. 그럼에도 불구하고, 서드파티 라이브러리는 일부 문서화되지 않은 속성을 사용합니다 (예: Pydantic 및 Typeguard는 `_evaluate` 메서드를 사용하고, beartype 및 pyanalyze는 `__forward_arg__` 속성을 사용합니다).

기존의 불분명하게 명시된 `typing.ForwardRef`를 새로운 클래스인 `annotationlib.ForwardRef`로 대체합니다. 이는 `typing.ForwardRef` 클래스의 기존 사용과 대부분 호환되도록 설계되었지만, `typing` 모듈에 특정한 동작은 없습니다. 기존 사용자와의 호환성을 위해 private `_evaluate` 메서드를 유지하지만, deprecated로 표시합니다. 이는 타입 힌트에 특정한 방식으로 포워드 레퍼런스를 평가하도록 설계된 `typing` 모듈의 새로운 public 함수 `typing.evaluate_forward_ref`로 위임됩니다.

`__annotate__` 함수를 호출하기 위한 헬퍼 함수로 `annotationlib.call_annotate_function`을 추가합니다. 이는 클래스가 구성되는 동안 annotations를 부분적으로 평가해야 하는 기능을 구현할 때 유용한 구성 요소입니다. 예를 들어, `typing.NamedTuple`의 구현은 namedtuple 클래스 자체가 구성되기 전에 클래스 네임스페이스 딕셔너리에서 annotations를 검색해야 합니다. 왜냐하면 annotations가 namedtuple에 어떤 필드가 존재하는지 결정하기 때문입니다.

### 명세 (Specification)

새로운 모듈 `annotationlib`가 표준 라이브러리에 추가됩니다. 그 목적은 annotations를 introspecting하고 래핑하기 위한 도구를 제공하는 것입니다.

모듈의 설계는 표준 라이브러리(예: `dataclasses` 및 `typing.TypedDict`)를 PEP 649 의미론을 사용하도록 업데이트한 경험을 바탕으로 합니다.

모듈은 다음 기능을 포함합니다.

*   `get_annotations()`: 함수, 모듈 또는 클래스의 annotations를 반환하는 함수입니다. 이는 `inspect.get_annotations()`를 대체합니다. 후자는 이 새로운 함수에 위임될 것입니다. 궁극적으로 deprecated될 수 있지만, 혼란을 최소화하기 위해 즉각적인 deprecation은 제안하지 않습니다.
*   `get_annotate_from_class_namespace(namespace: Mapping[str, Any])`: 클래스 네임스페이스 딕셔너리에서 `__annotate__` 함수를 반환하거나, 없는 경우 `None`을 반환하는 함수입니다. 이는 클래스 구성 중 메타클래스에서 유용합니다. `__annotate__` 함수의 내부 저장소에 대한 구현 세부 정보를 노출하지 않기 위해 별도의 함수입니다.
*   `Format`: 가능한 annotations 형식을 포함하는 enum입니다. 이는 PEP 649의 `VALUE`, `FORWARDREF`, `SOURCE` 형식을 대체합니다. PEP 649는 이 값들을 `inspect` 모듈의 전역 멤버로 만들 것을 제안했지만, enum 내부에 배치하는 것을 선호합니다. 네 번째 형식인 `VALUE_WITH_FAKE_GLOBALS`를 추가할 것을 제안합니다.
*   `ForwardRef`: 포워드 레퍼런스를 나타내는 클래스입니다. 형식이 `FORWARDREF`일 때 `get_annotations()`에 의해 반환될 수 있습니다. 기존 클래스 `typing.ForwardRef`는 이 클래스의 별칭이 됩니다.
    *   멤버는 다음과 같습니다.
        *   `__forward_arg__`: 포워드 레퍼런스의 문자열 인수입니다.
        *   `evaluate(globals=None, locals=None, type_params=None, owner=None)`: 포워드 레퍼런스를 평가하려고 시도하는 메서드입니다. `ForwardRef` 객체는 원래 객체의 전역(globals) 및 기타 네임스페이스에 대한 참조를 가질 수 있습니다. 그렇다면 이 네임스페이스는 포워드 레퍼런스를 평가하는 데 사용될 수 있습니다. `owner` 인수는 원래 annotations를 포함하는 객체(예: 클래스 또는 모듈 객체)일 수 있으며, 전역 및 지역 네임스페이스가 제공되지 않은 경우 이를 추출하는 데 사용됩니다.
        *   `_evaluate()`: 기존 `ForwardRef._evaluate` 메서드와 동일한 인터페이스를 가집니다. 문서화되지 않고 즉시 deprecated됩니다. `typing.ForwardRef`의 기존 사용자와의 호환성을 위해 제공됩니다.
*   `call_annotate_function(func: Callable, format: Format)`: 주어진 형식으로 `__annotate__` 함수를 호출하기 위한 헬퍼입니다. 함수가 이 형식을 지원하지 않으면, `call_annotate_function()`은 PEP 649에 설명된 대로 "가짜 전역(fake globals)" 환경을 설정하고, 해당 환경을 사용하여 원하는 annotations 형식을 반환합니다.
*   `call_evaluate_function(func: Callable | None, format: Format)`: `call_annotate_function`과 유사하지만, 함수가 annotations 딕셔너리를 반환하는 것에 의존하지 않습니다. 이는 PEP 695 및 PEP 696에 의해 도입된 지연된 속성을 평가하는 데 사용될 예정입니다. 편의를 위해 `func`는 `None`일 수 있으며, `None`이 전달되면 함수도 `None`을 반환합니다.
*   `annotations_to_string(annotations: dict[str, object]) -> dict[str, str]`: annotations 딕셔너리의 각 값을 문자열 표현으로 변환하는 함수입니다. 원본 소스를 사용할 수 없는 경우(예: `typing.TypedDict`의 함수형 구문) `SOURCE` 형식을 구현하는 데 유용합니다.
*   `type_repr(value: object) -> str`: 단일 값을 문자열 표현으로 변환하는 함수입니다. `annotations_to_string`에서 사용됩니다. 대부분의 값에 대해 `repr()`를 사용하지만, 타입의 경우 완전한 정규화된 이름(fully qualified name)을 반환합니다. `typing` 및 `collections.abc` 모듈의 여러 객체의 `repr()`를 위한 헬퍼로도 유용합니다.

또한, `typing` 모듈에 새로운 함수 `typing.evaluate_forward_ref`가 추가됩니다. 이 함수는 `ForwardRef.evaluate` 메서드의 래퍼이지만, 타입 힌트에 특정한 추가 작업을 수행합니다. 예를 들어, 복합 타입(complex types)으로 재귀하여 이러한 타입 내의 추가 포워드 레퍼런스를 평가합니다.

PEP 649와 달리, annotation 형식(`VALUE`, `FORWARDREF`, `SOURCE`)은 `inspect` 모듈의 전역 멤버로 추가되지 않습니다. 이러한 상수를 참조하는 유일한 권장 방법은 `annotationlib.Format.VALUE`와 같이 `annotationlib` 모듈 내에서 참조하는 것입니다.

### 거부된 대안 (Rejected alternatives)

*   **다른 이름 사용:** 여러 이름을 고려했지만, `annotationlib`가 가장 좋은 선택으로 보입니다. `annotations`, `annotation`, `annotools`, `annotationtools`, `annotation_tools`, `annotationslib` 등이 고려되었지만, 기존 모듈과의 혼동, 이름의 모호성, 또는 PyPI 패키지 충돌 등의 이유로 거부되었습니다.
*   **`inspect` 모듈에 기능 추가:** `inspect` 모듈은 이미 너무 크고, import 시간이 일부 사용 사례에 방해가 됩니다.
*   **`typing` 모듈에 기능 추가:** annotations는 주로 타이핑에 사용되지만, 다른 목적에도 사용될 수 있습니다. annotations를 introspecting하는 기능과 타입 힌트에만 국한된 기능을 깔끔하게 분리하는 것을 선호합니다.
*   **`types` 모듈에 기능 추가:** `types` 모듈은 타입과 관련된 기능을 위한 것이며, annotations는 타입뿐만 아니라 함수와 모듈에도 존재할 수 있습니다.
*   **서드파티 패키지에서 기능 개발:** 이 새로운 모듈의 기능은 순수 Python 코드이며, 인터프리터가 생성하는 `__annotate__` 함수와 직접 상호작용하여 동일한 기능을 제공하는 서드파티 패키지를 구현하는 것이 가능합니다. 그러나 제안된 새 모듈의 기능은 표준 라이브러리 자체(예: `dataclasses` 및 `typing.NamedTuple` 구현)에서도 확실히 유용할 것이므로, 표준 라이브러리에 포함하는 것이 합리적입니다.
*   **private 모듈에 기능 추가:** 처음에는 private 표준 라이브러리 모듈(예: `_annotations`)에서 모듈을 개발하고, API에 대한 경험을 더 얻은 후에 공개할 수도 있었습니다. 그러나 우리는 이미 표준 라이브러리 자체(예: `dataclasses` 및 `typing.NamedTuple` 구현)를 위해 이 모듈의 일부가 필요하다는 것을 알고 있습니다. private로 만들더라도 모듈은 필연적으로 서드파티 사용자에게 사용될 것입니다. 서드파티 사용자가 표준 라이브러리만큼 철저하게 PEP 649 의미론을 지원할 수 있도록 처음부터 명확하고 문서화된 API로 시작하는 것이 바람직합니다.

---

## REPL의 동작 (Behavior of the REPL)

PEP 649는 대화형 REPL의 다음 동작을 명시합니다.

> 단순화를 위해 이 경우 지연 평가를 포기합니다. REPL 셸의 모듈 레벨 annotations는 "기본 의미론(stock semantics)"과 동일하게 작동하며, 즉시 평가되고 결과가 `__annotations__` 딕셔너리 내부에 직접 설정됩니다.

이 제안된 동작에는 여러 문제가 있습니다. REPL을 annotations가 여전히 즉시 평가되는 유일한 컨텍스트로 만들어서 사용자에게 혼란을 주고 언어를 복잡하게 만듭니다. 또한, REPL 구현을 더 복잡하게 만드는데, 모든 문장이 "대화형(interactive)" 모드로 컴파일되도록 해야 합니다. 가장 중요한 것은, 경험이 부족한 사용자가 겪을 수 있는 몇 가지 그럴듯한 사용 사례를 깨뜨린다는 것입니다.

예를 들어, 사용자가 파일에 다음과 같이 작성할 수 있습니다.

```python
a: X | None = None
class X:
    ...
```

PEP 649에서는 `X`가 `a`의 annotations에서 사용될 때 아직 정의되지 않았더라도 annotations가 지연 평가되므로 제대로 작동합니다. 그러나 사용자가 이 동일한 코드를 REPL에 붙여넣고 한 줄씩 실행하면, `NameError`가 발생합니다. 왜냐하면 `X`라는 이름이 아직 정의되지 않았기 때문입니다.

### 명세 (Specification)

대화형 콘솔을 다른 모듈 레벨 코드와 동일하게 처리하고, annotations를 지연 평가하도록 제안합니다. 이는 언어를 더욱 일관성 있게 만들고 모듈과 REPL 간의 미묘한 동작 변경을 방지합니다.

REPL이 한 줄씩 평가되므로, annotations를 포함하는 전역 스코프의 모든 평가된 문장에 대해 새로운 `__annotate__` 함수를 생성합니다. annotations를 포함하는 줄이 평가될 때마다 이전 `__annotate__` 함수는 손실됩니다.

```python
>>> x: int
>>> __annotate__(1)
{'x': <class 'int'>}
>>> y: str
>>> __annotate__(1)
{'y': <class 'str'>}
>>> z: doesntexist
>>> __annotate__(1)
Traceback (most recent call last):
  File "<python-input-5>", line 1, in <module>
    __annotate__(1)
    ~~~~~~~~~~~~^^^
  File "<python-input-4>", line 1, in __annotate__
    z: doesntexist
       ^^^^^^^^^^^
NameError: name 'doesntexist' is not defined
```

REPL의 전역 네임스페이스에는 `__annotations__` 키가 없습니다. 모듈 네임스페이스에서는 모듈 객체의 `__annotations__` 디스크립터에 접근할 때 이 키가 지연 생성되지만, REPL에는 그러한 모듈 객체가 없습니다.

REPL 내에서 정의된 클래스와 함수도 다른 클래스와 마찬가지로 작동하므로, 해당 annotations의 평가는 지연됩니다. `__annotations__` 및 `__annotate__` 속성에 접근하거나 `annotationlib` 모듈을 사용하여 annotations를 introspect하는 것이 가능합니다.

---

## `__annotations__`를 제공하는 래퍼 (Wrappers that provide __annotations__)

표준 라이브러리 및 기타 여러 객체는 래핑된 객체에 대한 annotations를 제공합니다. PEP 649는 이러한 래퍼가 어떻게 동작해야 하는지 명시하지 않습니다.

### 명세 (Specification)

annotations를 제공하는 래퍼는 다음 목표를 염두에 두고 설계되어야 합니다.

*   `__annotations__`의 평가는 내장 함수, 클래스 및 모듈의 동작과 일관되게 가능한 한 오랫동안 지연되어야 합니다.
*   PEP 649 구현 이전의 동작과의 하위 호환성(Backward compatibility)이 유지되어야 합니다.
*   `__annotate__` 및 `__annotations__` 속성은 래핑된 객체의 의미론과 일관된 의미론을 제공해야 합니다.

더 구체적으로:

*   `functools.update_wrapper()` (따라서 `functools.wraps()`)는 래핑된 객체에서 래퍼로 `__annotate__` 속성만 복사합니다. 래퍼 함수의 `__annotations__` 디스크립터는 복사된 `__annotate__`를 사용합니다.
*   `classmethod()` 및 `staticmethod()`의 생성자는 현재 래핑된 객체에서 래퍼로 `__annotations__` 속성을 복사합니다. 대신, `__annotate__` 및 `__annotations__`에 대한 쓰기 가능한(writable) 속성을 가질 것입니다. 이러한 속성을 읽으면 기본 호출 가능(callable) 객체에서 해당 속성을 검색하고 래퍼의 `__dict__`에 캐시합니다. 이러한 속성에 쓰는 것은 래핑된 호출 가능 객체에 영향을 주지 않고 `__dict__`를 직접 업데이트합니다.

---

## Annotations와 메타클래스 (Annotations and metaclasses)

이 PEP의 초기 구현 테스트에서 메타클래스와 클래스 annotations 간의 상호작용에 심각한 문제가 발견되었습니다.

### 기존 버그 (Pre-existing bugs)

이 PEP에서 명시할 동작을 조사하는 동안 클래스에 대한 `__annotations__`의 기존 동작에서 여러 버그가 발견되었습니다. Python 3.13 및 이전 버전에서 이러한 버그를 수정하는 것은 이 PEP의 범위를 벗어나지만, 처리해야 할 코너 케이스를 설명하기 위해 여기에 언급합니다.

Python 3.10에서 3.13까지, 클래스에 annotations가 있는 경우 `__annotations__` 딕셔너리는 클래스 네임스페이스에 배치됩니다. annotations가 없으면 클래스가 생성될 때 `__annotations__` 클래스 딕셔너리 키가 없지만, `cls.__annotations__`에 접근하면 `type`에 정의된 디스크립터가 호출되어 빈 딕셔너리를 반환하고 이를 클래스 딕셔너리에 저장합니다. 정적 타입(static types)은 예외입니다. annotations를 절대 가지지 않으며, `.__annotations__`에 접근하면 `AttributeError`가 발생합니다.

다음 코드는 Python 3.10에서 3.13까지 동일하게 실패합니다.

```python
class Meta(type): pass
class X(metaclass=Meta): a: str
class Y(X): pass
Meta.__annotations__ # important
assert Y.__annotations__ == {}, Y.__annotations__ # fails: {'a': <class 'str'>}
```

메타클래스 `Meta`의 annotations에 `Y`의 annotations보다 먼저 접근하면, 기본 클래스 `X`의 annotations가 `Y`로 유출됩니다. 그러나 메타클래스의 annotations에 접근하지 않으면(즉, 위 `Meta.__annotations__` 줄이 제거되면), `Y`의 annotations는 올바르게 비어 있습니다.

마찬가지로, annotations가 있는 메타클래스의 annotations는 메타클래스의 인스턴스인 annotations 없는 클래스로 유출됩니다.

```python
class Meta(type): a: str
class X(metaclass=Meta): pass
assert X.__annotations__ == {}, X.__annotations__ # fails: {'a': <class 'str'>}
```

이러한 동작의 원인은 메타클래스가 클래스 딕셔너리에 `__annotations__` 항목을 포함하는 경우, 메타클래스의 인스턴스가 기본 `type` 클래스의 `__annotations__` 데이터 디스크립터를 사용하는 것을 방지하기 때문입니다.

### PEP 649를 사용한 메타클래스 동작 (Metaclass behavior with PEP 649)

PEP 649를 사용하면 메타클래스가 포함될 때 클래스에서 `.__annotations__` 속성에 접근하는 동작이 더욱 불규칙해집니다. 왜냐하면 이제 `__annotations__`가 annotations가 있는 클래스에도 클래스 딕셔너리에 지연적으로만 추가되기 때문입니다. 새로운 `__annotate__` 속성도 annotations가 없는 클래스에 지연적으로 생성되어 메타클래스가 포함될 때 추가적인 오동작을 유발합니다.

이러한 문제의 원인은 `__annotate__` 및 `__annotations__` 클래스 딕셔너리 항목을 특정 상황에서만 설정하고, 설정되지 않은 경우 `type`에 정의된 디스크립터에 의존하여 채워 넣기 때문입니다. 일반적인 속성 조회가 사용될 때, 이 접근 방식은 메타클래스의 존재 시점에 무너집니다. 왜냐하면 메타클래스의 자체 클래스 딕셔너리의 항목이 디스크립터를 보이지 않게 만들 수 있기 때문입니다.

여러 해결책을 고려했지만, `__annotate__` 및 `__annotations__` 객체를 클래스 딕셔너리에 다른 내부 전용 이름으로 저장하는 방법을 채택했습니다. 이는 클래스 딕셔너리 항목이 `type`에 정의된 디스크립터와 충돌하지 않음을 의미합니다.

이 접근 방식은 클래스 객체의 `.__annotate__` 및 `.__annotations__` 객체가 대부분 직관적으로 동작하도록 하지만, 몇 가지 단점이 있습니다.

*   하나는 `from __future__ import annotations`가 정의된 클래스와의 상호작용에 관한 것입니다. 이들은 클래스 딕셔너리에 `__annotations__` 항목을 계속 가질 것이며, 이는 일부 버그 있는 동작을 계속 보여줄 것입니다.
*   둘째, 이전 Python 버전에서는 annotations가 있는 사용자 정의 클래스의 인스턴스에서 `__annotations__` 속성에 접근하는 것이 가능했습니다. 그러나 이 동작은 문서화되지 않았고 `inspect.get_annotations()`에서 지원되지 않았으며, 새로운 `object.__annotations__` 디스크립터와 같은 더 큰 변경 없이는 PEP 649 프레임워크에서 보존될 수 없습니다. 이 동작 변경은 포팅 가이드에서 언급되어야 합니다.

### 명세 (Specification)

클래스 객체의 `.__annotate__` 및 `.__annotations__` 속성은 사용자 정의 메타클래스가 있더라도 각각 `annotate` 함수와 annotations 딕셔너리를 안정적으로 반환해야 합니다.

사용자는 annotations 또는 `annotate` 함수에 접근하기 위해 클래스 딕셔너리에 직접 접근해서는 안 됩니다. 클래스 딕셔너리에 저장된 데이터는 구현 세부 사항이며, 그 형식은 미래에 변경될 수 있습니다. 클래스 네임스페이스 딕셔너리만 사용할 수 있는 경우(예: 클래스가 구성 중일 때), `annotationlib.get_annotate_from_class_namespace`를 사용하여 클래스 딕셔너리에서 `annotate` 함수를 검색할 수 있습니다.

---

## `VALUE_WITH_FAKE_GLOBALS` 형식 추가 (Adding the VALUE_WITH_FAKE_GLOBALS format)

PEP 649는 다음과 같이 명시합니다.

> 이 PEP는 서드파티 라이브러리가 자체 `__annotate__` 메서드를 구현할 수 있다고 가정하며, 이러한 함수는 "가짜 전역(fake globals)" 환경에서 실행될 때 거의 확실히 올바르게 작동하지 않을 것입니다. 이러한 이유로, 이 PEP는 코드 객체에 플래그(co_flags의 사용되지 않는 비트 중 하나)를 할당하여 "이 코드 객체는 '가짜 전역' 환경에서 실행될 수 있습니다"를 의미하도록 합니다. 이는 "가짜 전역" 환경을 엄격하게 옵트인(opt-in) 방식으로 만들고, Python 컴파일러가 생성하는 `__annotate__` 메서드만 이를 설정할 것으로 예상됩니다.

그러나 이 메커니즘은 구현을 코드 객체의 저수준 세부 사항과 연결합니다. 코드 객체 플래그는 CPython 특정이며, 문서는 명시적으로 값에 의존하지 말라고 경고합니다.

Larry Hastings는 코드 플래그에 의존하지 않는 대안적인 접근 방식을 제안했습니다. 네 번째 형식인 `VALUE_WITH_FAKE_GLOBALS`입니다. 컴파일러가 생성한 `annotate` 함수는 `VALUE` 및 `VALUE_WITH_FAKE_GLOBALS` 형식만 지원하며, 둘 다 동일하게 구현됩니다. 표준 라이브러리는 특수한 "가짜 전역" 환경에서 `annotate` 함수를 호출할 때 `VALUE_WITH_FAKE_GLOBALS` 형식을 사용합니다.

이 접근 방식은 미래에 새로운 annotation 형식을 추가하기 위한 forward-compatible 메커니즘으로 유용합니다. `annotate` 함수를 수동으로 작성하는 사용자는 `VALUE_WITH_FAKE_GLOBALS` 형식이 요청되면 `NotImplementedError`를 발생시켜야 합니다. 그래야 표준 라이브러리가 수동으로 작성된 `annotate` 함수를 예측할 수 없는 결과를 초래할 수 있는 "가짜 전역"으로 호출하지 않을 것입니다.

annotation 형식의 이름은 `__annotate__` 함수가 반환해야 하는 객체의 종류를 나타냅니다. `STRING` 형식은 문자열을 반환해야 하고, `FORWARDREF` 형식은 포워드 레퍼런스를 반환해야 하며, `VALUE` 형식은 값을 반환해야 합니다. `VALUE_WITH_FAKE_GLOBALS`라는 이름은 함수가 여전히 값을 반환해야 하지만, 특이한 "가짜 전역" 환경에서 실행되고 있음을 나타냅니다.

### 명세 (Specification)

`annotationlib` 모듈의 `Format` enum에 추가 형식 `VALUE_WITH_FAKE_GLOBALS`가 값 2와 함께 추가됩니다. (결과적으로, 다른 형식의 값은 PEP 649에 비해 변경될 것입니다: `FORWARDREF`는 3, `SOURCE`는 4가 됩니다.) 이러한 형식의 정수 값은 C로 구현된 `__annotate__` 함수와 같이 enum을 쉽게 사용할 수 없는 곳에서 사용하기 위해 지정됩니다.

컴파일러가 생성한 `annotate` 함수는 이 형식을 지원하며 `VALUE` 형식과 동일한 값을 반환합니다. 표준 라이브러리는 `FORWARDREF` 및 `SOURCE` 형식을 구현하는 데 사용되는 "가짜 전역" 환경에서 `__annotate__` 함수가 호출될 때 이 형식을 전달합니다. `format` 인수를 허용하는 `annotationlib` 모듈의 모든 public 함수는 `VALUE_WITH_FAKE_GLOBALS` 형식이 전달되면 `NotImplementedError`를 발생시킵니다.

`__annotate__` 함수를 구현하는 서드파티 코드는 `VALUE_WITH_FAKE_GLOBALS` 형식이 전달되고 함수가 "가짜 전역" 환경에서 실행될 준비가 되어 있지 않은 경우 `NotImplementedError`를 발생시켜야 합니다. 이는 `__annotate__`에 대한 데이터 모델 문서에 언급되어야 합니다.

---

## `__annotations__` 삭제의 영향 (Effect of deleting __annotations__)

PEP 649는 다음과 같이 명시합니다.

> `o.__annotations__`를 유효한 값으로 설정하면 자동으로 `o.__annotate__`가 `None`으로 설정됩니다.

그러나 PEP는 `__annotations__` 속성이 `del`을 사용하여 삭제되면 어떻게 되는지 명시하지 않습니다. 속성을 삭제하면 `__annotate__`도 삭제되는 것이 가장 일관성 있어 보입니다.

### 명세 (Specification)

함수, 모듈 및 클래스에서 `__annotations__` 속성을 삭제하면 `__annotate__`가 `None`으로 설정됩니다.

---

## PEP 695 및 696 객체의 지연 평가 (Deferred evaluation of PEP 695 and 696 objects)

PEP 649가 작성된 이후, Python 3.12 및 3.13은 annotations에 대해 이 PEP가 제안하는 동작과 유사하게 지연 평가를 사용하는 몇 가지 새로운 기능을 지원하게 되었습니다.

*   `type` 문을 통해 생성된 타입 별칭(type aliases)의 값 (PEP 695)
*   제네릭(generics) 구문을 통해 생성된 `typing.TypeVar` 객체의 바운드(bound) 및 제약 조건(constraints) (PEP 695)
*   `typing.TypeVar`, `ParamSpec`, 및 `typing.TypeVarTuple` 객체의 기본값 (PEP 696)

현재 이러한 객체는 지연 평가를 사용하지만, 지연 평가에 사용되는 함수 객체에 직접 접근할 수는 없습니다. 이제 annotations에 대해 가능한 동일한 종류의 introspection을 가능하게 하기 위해, 내부 함수 객체를 노출하여 사용자가 `FORWARDREF` 및 `SOURCE` 형식을 사용하여 이를 평가할 수 있도록 제안합니다.

### 명세 (Specification)

다음과 같은 새로운 속성이 추가될 것입니다.

*   `evaluate_value` on `typing.TypeAliasType`
*   `evaluate_bound`, `evaluate_constraints`, and `evaluate_default` on `typing.TypeVar`
*   `evaluate_default` on `typing.ParamSpec`
*   `evaluate_default` on `typing.TypeVarTuple`

`evaluate_value`를 제외하고, 이러한 속성은 객체가 바운드, 제약 조건 또는 기본값을 가지지 않는 경우 `None`일 수 있습니다. 그렇지 않으면, 이 속성은 `__annotate__` 함수와 유사하게 단일 정수 인수를 받아 평가된 값을 반환하는 호출 가능 객체(callable)입니다. `__annotate__` 함수와 달리, 이러한 호출 가능 객체는 annotations 딕셔너리가 아닌 단일 값을 반환합니다. 이러한 속성은 읽기 전용입니다.

일반적으로, 사용자는 `annotationlib.call_evaluate_function`과 함께 이러한 속성을 사용할 것입니다. 예를 들어, `TypeVar`의 바운드를 `SOURCE` 형식으로 얻으려면 `annotationlib.call_evaluate_function(T.evaluate_bound, annotationlib.Format.SOURCE)`와 같이 작성할 수 있습니다.

---

## `dataclass` 필드 타입의 동작 (Behavior of dataclass field types)

annotations의 지연 평가의 한 가지 결과는 `dataclass`가 annotations에서 포워드 레퍼런스를 사용할 수 있다는 것입니다.

```python
>>> from dataclasses import dataclass
>>> @dataclass
... class D:
...     x: undefined
...
```

그러나 `FORWARDREF` 형식이 dataclass의 필드 타입으로 유출됩니다.

```python
>>> fields(D)[0].type
ForwardRef('undefined')
```

필드 객체의 `.type` 속성이 annotations 평가를 트리거하여, dataclass 자체가 생성된 후 그러나 필드 타입에 접근하기 전에 정의된 포워드 레퍼런스의 경우 실제 값을 포함할 수 있도록 변경하는 것을 고려했습니다. 그러나 이는 `.type`에 접근하는 것이 이제 annotations에서 임의의 코드를 실행하고 `NameError`와 같은 오류를 발생시킬 수 있다는 것을 의미하기도 합니다.

따라서, `ForwardRef` 객체를 타입에 유지하고, 포워드 레퍼런스를 해결하려는 사용자는 `ForwardRef.evaluate` 메서드를 사용할 수 있도록 문서화하는 것이 더 사용자 친화적이라고 생각합니다.

미래에 사용 사례가 발생하면, annotations를 처음부터 다시 평가하는 새로운 메서드와 같은 추가 기능을 추가할 수 있습니다.

---

## `SOURCE`를 `STRING`으로 이름 변경 (Renaming SOURCE to STRING)

`SOURCE` 형식은 원본 소스 코드에 가까운 사람이 읽을 수 있는 형식을 표시해야 하는 도구를 위한 것입니다. 그러나 `__annotate__` 함수에서는 원본 소스를 검색할 수 없으며, 어떤 경우에는 원본 코드에 접근할 수 없는 Python 코드에 `__annotate__` 함수가 있습니다. 예를 들어, `dataclasses.make_dataclass()` 및 `typing.TypedDict`의 호출 기반 구문에 해당합니다.

이로 인해 `SOURCE`라는 이름이 다소 오해의 소지가 있습니다. 형식의 목표는 실제로 소스를 재현하는 것이지만, 이름은 실제로 사용자를 오도할 가능성이 있습니다. 더 중립적인 이름은 형식이 문자열만 포함하는 annotation 딕셔너리를 반환한다는 것을 강조할 것입니다. `STRING`을 제안합니다.

### 명세 (Specification)

`SOURCE` 형식이 `STRING`으로 이름 변경됩니다. 이 PEP의 변경 사항을 다시 한번 요약하면, 현재 지원되는 네 가지 형식은 다음과 같습니다.

*   `VALUE`: 기본 형식으로, annotations를 평가하고 결과 값을 반환합니다.
*   `VALUE_WITH_FAKE_GLOBALS`: 내부용입니다. 가짜 전역으로 실행을 지원하는 `annotate` 함수에 의해 `VALUE`와 같이 처리되어야 합니다.
*   `FORWARDREF`: 정의되지 않은 이름을 `ForwardRef` 객체로 대체합니다.
*   `STRING`: 문자열을 반환하고, 원본 소스에 가까운 코드를 재현하려고 시도합니다.

---

## 조건부로 정의된 Annotations (Conditionally defined annotations)

PEP 649는 클래스 또는 모듈 본문에서 조건부로 정의된 annotations를 지원하지 않습니다.

> 현재 `if` 또는 `try` 문 내부에 annotations가 있는 모듈 및 클래스 속성을 설정하는 것이 가능하며, 예상대로 작동합니다. 이 PEP가 활성화될 때 이 동작을 지원하는 것은 어렵습니다.

그러나 널리 사용되는 SQLAlchemy 라이브러리의 유지보수자는 이 패턴이 실제로 일반적이고 중요하다고 보고했습니다.

```python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from some_module import SpecialType

class MyClass:
    somevalue: str
    if TYPE_CHECKING:
        someothervalue: SpecialType
```

PEP 649에서 구상된 동작에 따르면, `MyClass`의 `__annotations__`는 `somevalue`와 `someothervalue` 모두에 대한 키를 포함할 것입니다.

다행히도, 이 코드가 예상대로 다시 작동하도록 만드는 실행 가능한 구현 전략이 있습니다. 이 전략은 몇 가지 우연한 상황에 의존합니다.

*   이 동작 변경은 로컬 스코프의 annotations는 무시되기 때문에 모듈 및 클래스 annotations에만 관련이 있습니다.
*   모듈 및 클래스 본문은 한 번만 실행됩니다.
*   클래스의 annotations는 클래스 본문의 실행이 완료될 때까지 외부에서 볼 수 없습니다. 모듈의 경우, 부분적으로 실행된 모듈이 다른 import된 모듈에 표시될 수 있으므로 완전히 사실은 아니지만, 이 경우는 다른 이유로 문제가 됩니다.

이는 다음 구현 전략을 허용합니다.

*   각 annotation된 할당에는 고유 식별자(예: 정수)가 할당됩니다.
*   클래스 또는 모듈 본문이 실행되는 동안, 처음에는 비어 있는 집합이 생성되어 정의된 annotations의 식별자를 보유합니다.
*   annotation된 할당이 실행될 때, 해당 식별자가 집합에 추가됩니다.
*   생성된 `__annotate__` 함수는 집합을 사용하여 클래스 또는 모듈 본문에서 어떤 annotations가 정의되었는지 결정하고, 해당 annotations만 반환합니다.

이는 python/cpython#130935에 구현되었습니다.

### 명세 (Specification)

클래스 및 모듈의 경우, `__annotate__` 함수는 클래스 또는 모듈 본문이 실행될 때 실행된 할당에 대한 annotations만 반환합니다.

---

## 부분적으로 실행된 모듈에서 Annotations 캐싱 (Caching of annotations on partially executed modules)

PEP 649는 클래스 및 모듈의 `__annotations__` 속성 값은 `__annotate__` 함수를 호출하여 처음 접근할 때 결정되고, 나중에 접근하기 위해 캐시된다고 명시합니다. 이는 대부분의 경우에 정확하고 호환성을 유지하지만, 부분적으로 실행된 모듈이라는 한 가지 예외적인 경우에 놀라운 동작으로 이어질 수 있습니다.

다음 예시를 고려해보십시오.

```python
# recmod/__main__.py
from . import a
print("in __main__:", a.__annotations__)

# recmod/a.py
v1: int
from . import b
v2: int

# recmod/b.py
from . import a
print("in b:", a.__annotations__)
```

`recmod/b.py`가 실행되는 동안 `recmod.a` 모듈은 정의되었지만, 아직 실행이 완료되지 않았다는 점에 유의하십시오.

3.13에서는 다음과 같이 출력됩니다.

```
$ python3.13 -m recmod
in b: {'v1': <class 'int'>}
in __main__: {'v1': <class 'int'>, 'v2': <class 'int'>}
```

그러나 원래 제안된 대로 PEP 649가 구현되면, `__annotate__` 함수는 모듈 실행이 완료될 때만 설정되므로 빈 딕셔너리를 두 번 출력합니다. 이는 명백히 직관적이지 않습니다.

구현은 python/cpython#131550을 참조하십시오.

### 명세 (Specification)

부분적으로 실행된 모듈에서 `__annotations__`에 접근하면 이전 Python 버전의 동작과 유사하게 지금까지 실행된 annotations를 계속 반환합니다. 그러나 이 경우 `__annotations__` 딕셔너리는 캐시되지 않으므로, `__annotations__` 속성에 대한 나중의 접근은 새로운 딕셔너리를 반환할 것입니다. 이는 추가 annotations를 통합하기 위해 `__annotate__`를 다시 호출해야 하기 때문에 필요합니다.

---

## 기타 구현 세부 사항 (Miscellaneous implementation details)

PEP 649는 구현의 일부 측면에 대해 상당한 세부 사항을 다룹니다. 혼란을 피하기 위해 현재 구현이 PEP에 설명된 것과 다른 몇 가지 측면을 설명합니다. 그러나 이러한 세부 사항은 미래에 유지될 것이라는 보장이 없으며, 언어 참조에 문서화되지 않는 한 미래에 예고 없이 변경될 수 있습니다.

### `ForwardRef` 객체에 대한 지원되는 작업 (Supported operations on ForwardRef objects)

`SOURCE` 형식은 "stringizer" 기술로 구현됩니다. 이 기술은 함수의 전역 딕셔너리를 증강하여 모든 조회가 객체에 대해 수행되는 작업을 재구성하는 데 사용할 수 있는 특수 객체를 반환하도록 합니다.

PEP 649는 다음과 같이 명시합니다.

> 실제로 "stringizer" 기능은 현재 `typing` 모듈에 정의된 `ForwardRef` 객체에 구현될 것입니다. `ForwardRef`는 모든 stringizer 기능을 구현하도록 확장될 것이며, 포함된 문자열을 평가하여 실제 값(참조된 모든 심볼이 정의되어 있다고 가정)을 생성하도록 확장될 것입니다.

그러나 이는 실제로 혼란을 초래할 수 있습니다. stringizer 기능을 구현하는 객체는 `__getattr__` 및 `__eq__`를 포함하여 거의 모든 특수 메서드를 구현하여 새로운 stringizer를 반환해야 합니다. 이러한 객체는 작업하기에 혼란스럽습니다. 모든 작업은 성공하지만, 사용자가 예상하는 것과 다른 객체를 반환할 가능성이 있습니다.

현재 구현은 대신 `ForwardRef` 클래스에 몇 가지 유용한 메서드만 구현합니다. annotations 평가 중에는 `ForwardRef` 대신 private stringizer 클래스의 인스턴스가 사용됩니다. 평가가 완료된 후, `FORWARDREF` 형식의 구현은 이러한 내부 객체를 `ForwardRef` 객체로 변환합니다.

### `__annotate__` 함수의 시그니처 (Signature of __annotate__ functions)

PEP 649는 `__annotate__` 함수의 시그니처를 `__annotate__(format: int) -> dict`로 명시합니다.

그러나 `format`을 매개변수 이름으로 사용하면 annotation에서 `format`이라는 심볼을 사용하는 경우 충돌이 발생할 수 있습니다. 이 문제를 피하기 위해 현재 구현은 함수 시그니처에서 `format`이라는 이름을 가지지만, annotation 내에서 `format` 이름의 사용을 가리지 않는 위치 전용 매개변수(positional-only parameter)를 사용합니다.

---

## 하위 호환성 (Backwards Compatibility)

PEP 649는 기존 코드(stock 또는 PEP 563 의미론을 사용하는)에 대한 하위 호환성 영향에 대해 철저하게 논의합니다.

그러나 또 다른 호환성 문제가 있습니다. PEP 649 의미론을 가정하고 작성되었지만, annotations를 즉시 평가하는 기존 도구를 사용하는 새로운 코드입니다. 예를 들어, `__annotations__`에 직접 접근하거나 `inspect.get_annotations()`를 호출하여 데코레이트된 클래스에서 annotation된 필드를 검색하는 `dataclass`와 유사한 클래스 데코레이터 `@annotator`를 고려해보십시오.

PEP 649가 구현되면 다음과 같은 코드는 제대로 작동합니다.

```python
class X:
    y: Y
class Y:
    pass
```

그러나 `@annotator`가 새로운 `FORWARDREF` 형식을 사용하도록 변경되지 않으면 다음과 같은 코드는 작동하지 않습니다.

```python
@annotator
class X:
    y: Y
class Y:
    pass
```

이는 이전에 작동하던 코드가 손상되지 않으므로 엄격하게 하위 호환성 문제는 아닙니다. PEP 649 이전에는 이 코드가 런타임에 `NameError`를 발생시켰을 것입니다. 어떤 의미에서는 서드파티 라이브러리에서 지원해야 하는 다른 새로운 Python 기능과 다르지 않습니다. 그럼에도 불구하고, introspection을 수행하는 라이브러리에게는 심각한 문제이며, 라이브러리가 새 의미론을 간단하고 사용자 친화적인 방식으로 지원할 수 있도록 최대한 쉽게 만드는 것이 중요합니다.

`dataclasses`, `typing.TypedDict`, `typing.NamedTuple`을 포함한 표준 라이브러리의 여러 기능이 이 문제의 영향을 받습니다. 이들은 새로운 `annotationlib` 모듈의 기능을 사용하여 이 패턴을 지원하도록 업데이트되었습니다.

---

## 보안 고려 사항 (Security Implications)

PEP 649의 한 가지 결과는 객체(함수 또는 모듈일지라도)의 annotations에 접근하는 것이 이제 임의의 코드를 실행할 수 있다는 것입니다. 이는 `STRING` 형식이 사용되는 경우에도 마찬가지입니다. stringizer 메커니즘은 전역 네임스페이스만 재정의하며, 이는 Python 코드를 완전히 샌드박스화하기에 충분하지 않기 때문입니다.

이전 Python 버전에서는 함수 또는 모듈의 annotations에 접근하는 것이 임의의 코드를 실행할 수 없었지만, 클래스 및 다른 객체는 이미 `__annotations__` 속성에 접근할 때 임의의 코드를 실행할 수 있었습니다. 마찬가지로, annotations에 대한 거의 모든 추가 introspection(예: `isinstance() 사용`, `typing.get_origin`과 같은 함수 호출, 또는 `repr()`로 annotations 표시)은 이미 임의의 코드를 실행할 수 있었습니다. 물론, 신뢰할 수 없는 코드에서 annotations에 접근하는 것은 신뢰할 수 없는 코드가 이미 import되었음을 의미합니다.

---

## 교육 방법 (How to Teach This)

이 PEP에 의해 수정된 PEP 649의 의미론은 코드에 annotations를 추가하는 사용자에게 대체로 직관적일 것입니다. 우리는 포워드 레퍼런스가 필요한 annotations 주위에 수동으로 따옴표를 추가할 필요성을 없애는데, 이는 사용자에게 큰 혼란의 원인이었습니다.

annotations를 introspect해야 하는 고급 사용자에게는 이야기가 더 복잡해집니다. 새로운 `annotationlib` 모듈의 문서는 annotations와 프로그래밍 방식으로 상호작용해야 하는 사용자를 위한 참조 역할을 할 것입니다.

---

## 참고 구현 (Reference Implementation)

이 PEP에서 제안된 변경 사항은 CPython 저장소의 main 브랜치에 구현되었습니다.

---

## 감사의 말 (Acknowledgments)

먼저, PEP 649를 작성한 Larry Hastings에게 감사합니다. 이 PEP는 그의 초기 결정 중 일부를 수정하지만, 전체적인 디자인은 여전히 그의 것입니다.

이 PEP의 초기 초안에 대한 피드백을 제공한 Carl Meyer와 Alex Waygood에게 감사합니다. Alex Waygood, Alyssa Coghlan, David Ellis는 메타클래스와 `__annotations__` 간의 상호작용에 대한 통찰력 있는 피드백과 제안을 제공했습니다. Larry Hastings도 이 PEP에 유용한 피드백을 제공했습니다. Nikita Sobolev는 PEP 649 기능을 사용하는 표준 라이브러리에 다양한 변경을 가했으며, 그의 경험은 디자인 개선에 도움이 되었습니다.

---

## 부록 (Appendix)

### 어떤 표현식이 문자열화될 수 있는가? (Which expressions can be stringified?)

PEP 649는 stringizer가 모든 표현식을 처리할 수 없다는 것을 인정합니다. 이제 초안 구현이 있으므로, 처리할 수 있는 표현식과 처리할 수 없는 표현식에 대해 더 정확하게 설명할 수 있습니다. 아래는 Python AST에서 stringizer가 복구할 수 있는 모든 표현식과 복구할 수 없는 모든 표현식의 목록입니다. 전체 목록은 문서에 추가되지 않을 수 있지만, 이를 만드는 것은 유용한 연습입니다.

첫째, stringizer는 컴파일된 코드에 존재하지 않는 정보(주석, 공백, 괄호, AST 최적화 도구에 의해 단순화되는 작업 등)를 복구할 수 없습니다.

둘째, stringizer는 특정 스코프에서 조회되는 이름을 포함하는 거의 모든 작업을 가로챌 수 있지만, 상수(constants)에 전적으로 작동하는 작업은 가로챌 수 없습니다. 결과적으로, 이는 신뢰할 수 없는 코드에서 `SOURCE` 형식을 요청하는 것이 안전하지 않다는 것을 의미합니다. Python은 전역(globals) 또는 내장(builtins)에 접근하지 않고도 임의 코드 실행을 달성할 수 있을 만큼 강력합니다.

다음은 지원됩니다(때로는 주의사항과 함께).

*   `BinOp`
*   `UnaryOp`
    *   `Invert` (`~`), `UAdd` (`+`), `USub` (`-`)는 지원됩니다.
    *   `Not` (`not`)은 지원되지 않습니다.
*   `Dict` (`**` 언패킹을 사용하는 경우 제외)
*   `Set`
*   `Compare`
    *   `Eq` 및 `NotEq`는 지원됩니다.
    *   `Lt`, `LtE`, `Gt`, `GtE`는 지원되지만, 피연산자(operand)가 뒤집힐 수 있습니다.
    *   `Is`, `IsNot`, `In`, `NotIn`은 지원되지 않습니다.
*   `Call` (`**` 언패킹을 사용하는 경우 제외)
*   `Constant` (상수의 정확한 표현은 아님; 예를 들어, 문자열의 이스케이프 시퀀스는 손실됨; 16진수는 10진수로 변환됨)
*   `Attribute` (값이 상수가 아니라고 가정)
*   `Subscript` (값이 상수가 아니라고 가정)
*   `Starred` (`*` 언패킹)
*   `Name`
*   `List`
*   `Tuple`
*   `Slice`

다음은 지원되지 않지만, stringizer가 만나면 유익한 오류를 발생시킵니다.

*   `FormattedValue` (f-string; `!r`과 같은 변환 지정자가 사용되면 오류가 감지되지 않음)
*   `JoinedStr` (f-string)

다음은 지원되지 않으며 잘못된 출력을 초래합니다.

*   `BoolOp` (`and` 및 `or`)
*   `IfExp`
*   `Lambda`
*   `ListComp`
*   `SetComp`
*   `DictComp`
*   `GeneratorExp`

다음은 annotation 스코프에서 허용되지 않으므로 관련이 없습니다.

*   `NamedExpr` (`:=`)
*   `Await`
*   `Yield`
*   `YieldFrom`

---

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 게시됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.