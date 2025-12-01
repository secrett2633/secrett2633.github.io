---
title: "[Withdrawn] PEP 724 - Stricter Type Guards"
excerpt: "Python Enhancement Proposal 724: 'Stricter Type Guards'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/724/
toc: true
toc_sticky: true
date: 2025-09-27 13:17:29+0900
last_modified_at: 2025-09-27 13:17:29+0900
published: true
---
> **원문 링크:** [PEP 724 - Stricter Type Guards](https://peps.python.org/pep-0724/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 28-Jul-2023



# PEP 724 – Stricter Type Guards (더 엄격한 Type Guard)

**상태:** 이 PEP는 **철회되었습니다 (Withdrawn)** . Typing Council이 이 제안에 대해 합의에 도달하지 못하여, 저자들이 철회하기로 결정했습니다.

## 개요 (Abstract)

PEP 647은 사용자 정의 `TypeGuard` 함수 개념을 도입했습니다. 이 함수는 첫 번째 매개변수로 전달된 표현식의 타입이 `TypeGuard` 반환 타입과 일치할 경우 `True`를 반환합니다. 예를 들어, `TypeGuard[str]`를 반환하는 함수는 첫 번째 입력 매개변수에 전달된 표현식의 타입이 `str`인 경우에만 `True`를 반환하는 것으로 간주됩니다. 이를 통해 타입 체커는 사용자 정의 `TypeGuard` 함수가 `True`를 반환할 때 타입을 더 좁게 추론(narrowing)할 수 있게 되었습니다.

PEP 724는 PEP 647에서 도입된 `TypeGuard` 메커니즘을 개선하고자 했습니다. 주된 목적은 사용자 정의 `TypeGuard` 함수가 `False`를 반환할 때도 타입 체커가 타입을 좁게 추론할 수 있도록 허용하고, 특정 상황에서 `True`를 반환할 때 추가적으로 더 정밀한 타입 추론을 적용할 수 있도록 하는 것이었습니다.

## 도입 배경 (Motivation)

사용자 정의 `TypeGuard` 함수는 타입 체커가 표현식을 인자로 받을 때 해당 표현식의 타입을 좁게 추론하도록 돕습니다. PEP 647에서 도입된 `TypeGuard` 메커니즘은 유연하지만, 이러한 유연성으로 인해 개발자들이 불편함을 겪는 몇 가지 제한 사항이 있었습니다.

**제한 사항 1: `TypeGuard` 함수가 `False`를 반환하는 경우 타입 체커는 타입을 좁게 추론할 수 없었습니다.** 이는 "else" 절에서 타입이 좁혀지지 않음을 의미합니다.

**제한 사항 2: `TypeGuard` 함수가 `True`를 반환하면, 타입 체커는 사전 추론된 타입에 기반하여 추가적인 추론을 적용할 수 있는지 여부와 상관없이 `TypeGuard` 반환 타입을 사용해야 했습니다.**

다음 코드 예시는 이 두 가지 제한 사항을 보여줍니다:

```python
def is_iterable(val: object) -> TypeGuard[Iterable[Any]]:
    return isinstance(val, Iterable)

def func(val: int | list[int]):
    if is_iterable(val):
        # TypeGuard 반환 타입에 따라 'Iterable[Any]'로 타입이 좁혀집니다.
        reveal_type(val) # Iterable[Any]
    else:
        # "False"인 경우 타입이 좁혀지지 않습니다.
        reveal_type(val) # int | list[int]

    # 사용자 정의 TypeGuard 함수 대신 "isinstance"를 사용하면 결과가 달라집니다.
    # 타입 체커는 "isinstance"에 대해 추가적인 로직을 적용하기 때문입니다.
    if isinstance(val, Iterable):
        # "Iterable[Any]"보다 더 좁고 정확한 타입인 "list[int]"로 좁혀집니다.
        reveal_type(val) # list[int]
    else:
        # 원래 유니온에서 "list[int]"가 제거되어 "int"로 좁혀집니다.
        reveal_type(val) # int
```


PEP 647은 `TypeGuard` 반환 타입이 입력 타입의 서브타입이 아닌 사용 사례를 지원하기 위해 이러한 제한 사항을 두었습니다.

## 제안 배경 (Rationale)

더 엄격한 `TypeGuard`가 해결책이 될 수 있었던 여러 이슈들이 있었습니다. 예를 들어, `TypeGuard`가 `isinstance`처럼 타입을 교차(intersect)하지 않거나, 특정 분기에서 가능성을 제거하지 못하거나, `Literal` 타입 추론이 작동하지 않는 등의 문제들이 제기되었습니다.

## 명세 (Specification)

이 PEP는 위에서 논의된 제한 사항을 해결하기 위해 PEP 647에 대한 몇 가지 수정을 제안했습니다. 이러한 제한 사항들은 특정 조건이 충족될 때에만 안전하게 제거될 수 있습니다. 특히, 사용자 정의 `TypeGuard` 함수의 결과 타입 `R`이 첫 번째 입력 매개변수 `I`의 타입과 **일관적(consistent)** 일 때, 타입 체커는 더 엄격한 `TypeGuard` 의미론을 적용해야 한다고 제안되었습니다.

**더 엄격한 `TypeGuard` 의미론이 적용될 때, 사용자 정의 `TypeGuard` 함수의 적용 방식은 두 가지로 변경됩니다:**

1.  **부정 ("else") 케이스에서도 타입 추론이 적용됩니다.**
    ```python
    def is_str(val: str | int) -> TypeGuard[str]:
        return isinstance(val, str)

    def func(val: str | int):
        if not is_str(val):
            reveal_type(val) # int (이전에는 str | int)
    ```
   

2.  **긍정 ("if") 케이스에서도 해당하는 경우 추가적인 타입 추론이 적용됩니다.**
    ```python
    def is_cardinal_direction(val: str) -> TypeGuard[Literal["N", "S", "E", "W"]]:
        return val in ("N", "S", "E", "W")

    def func(direction: Literal["NW", "E"]):
        if is_cardinal_direction(direction):
            reveal_type(direction) # "Literal[E]" (이전에는 Literal["N", "S", "E", "W"] 또는 str)
        else:
            reveal_type(direction) # "Literal[NW]"
    ```
   

**타입 추론을 위한 타입 이론적 규칙:**

|                  | 비-엄격 (Non-strict) `TypeGuard` | 엄격 (Strict) `TypeGuard`   |
| :--------------- | :------------------------------- | :-------------------------- |
| 적용 시점        | `R`이 `I`와 일관적이지 않을 때   | `R`이 `I`와 일관적일 때     |
| 긍정 추론 타입 NP | `R`                              | `A ∧ R` (인자 타입과 반환 타입의 교집합) |
| 부정 추론 타입 NN | `A`                              | `A ∧ ¬R` (인자 타입에서 반환 타입을 제외) |

실제로 엄격한 `TypeGuard`에 대한 이론적 타입은 Python 타입 시스템에서 정확하게 표현하기 어렵기 때문에, 타입 체커는 실용적인 근사치에 의존해야 합니다. 일반적으로 타입 체커는 `isinstance`를 처리하는 방식과 동일한 타입 추론 로직을 사용해야 하며, 일관된 결과를 얻어야 합니다.

## 하위 호환성 (Backwards Compatibility)

이 PEP는 `TypeGuard`의 기존 동작을 변경하는 것을 제안했지만, 런타임에는 영향을 미치지 않고 타입 체커가 평가하는 타입만 변경됩니다.

```python
def is_int(val: int | str) -> TypeGuard[int]:
    return isinstance(val, int)

def func(val: int | str):
    if is_int(val):
        reveal_type(val) # "int"
    else:
        # 이전에는 "int | str"로 평가되었지만, 이제는 "str"로 평가됩니다.
        reveal_type(val)
```


이러한 동작 변경은 타입 체커가 평가하는 타입에 변화를 가져오므로, 새로운 타입 오류를 발생시키거나 기존 오류를 가릴 수 있습니다. 그러나 타입 체커가 종종 추론 로직을 개선하거나 버그를 수정하기 때문에, 정적 타이핑 사용자는 이러한 종류의 동작 변경에 익숙할 것으로 예상되었습니다.

또한, 기존의 타입이 지정된 Python 코드가 `TypeGuard`의 현재 동작에 의존할 가능성은 낮다고 가정했습니다. Pyright에서 제안된 변경 사항을 구현하고 약 25개의 타입 코드베이스에 대해 실행했을 때, 동작 변경의 영향은 미미했습니다. 유일하게 주목할 만한 변화는 일부 `# type: ignore` 주석이 더 이상 필요 없게 되었다는 것이며, 이는 해당 코드베이스가 이미 `TypeGuard`의 기존 제한 사항을 우회하고 있었음을 나타냅니다.

**호환성을 깨뜨리는 변경 (Breaking change):** 사용자 정의 `TypeGuard` 함수가 이전 동작에 의존하는 경우, 새로운 동작으로 인해 문제가 발생할 수 있습니다. 예를 들어 `is_positive_int`와 같은 함수에서 `else` 절의 타입 추론이 의도와 다르게 `str`로 좁혀질 수 있습니다. 그러나 실제 코드에서는 이러한 `TypeGuard`가 존재할 가능성은 낮다고 판단되었습니다.

## 교육 방법 (How to Teach This)

`TypeGuard`에 익숙하지 않은 사용자들은 이 PEP에서 설명된 동작을 자연스럽게 기대할 가능성이 높으므로, `TypeGuard`를 가르치고 설명하기가 더 쉬워질 것이라고 예상되었습니다.

## 참고 구현 (Reference Implementation)

이 아이디어에 대한 참조 구현은 Pyright에 존재합니다. 수정된 동작을 활성화하려면 구성 플래그 `enableExperimentalFeatures`를 `true`로 설정해야 합니다. 이는 `# pyright: enableExperimentalFeatures=true`와 같은 주석을 통해 파일 단위로 설정할 수 있습니다.

## 기각된 아이디어 (Rejected Ideas)

1.  **`StrictTypeGuard`:** 더 엄격한 `TypeGuard` 의미론을 명시적으로 적용하는 새로운 구문 `StrictTypeGuard`가 제안되었습니다. 그러나 대부분의 경우 불필요하고 복잡성을 가중하며, 두 형태 간의 미묘한 차이에 대해 개발자를 교육해야 하므로 기각되었습니다.

2.  **두 번째 출력 타입을 가진 `TypeGuard`:** `TypeGuard`가 부정 ("else") 케이스에서 추론에 사용될 타입을 나타내는 두 번째 선택적 타입 인자를 지원하도록 하는 아이디어가 제안되었습니다.
    ```python
    def is_int(val: int | str) -> TypeGuard[int, str]:
        return isinstance(val, int)
    ```
    이 아이디어는 너무 복잡하고 `TypeGuard`의 두 가지 주요 제한 사항 중 하나만 해결했기 때문에 기각되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.