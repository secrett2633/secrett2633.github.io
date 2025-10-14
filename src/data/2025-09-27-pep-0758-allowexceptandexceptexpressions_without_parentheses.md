---
title: "[Final] PEP 758 - Allowexceptandexcept*expressions without parentheses"
excerpt: "Python Enhancement Proposal 758: 'Allowexceptandexcept*expressions without parentheses'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/758/
toc: true
toc_sticky: true
date: 2025-09-27 13:43:13+0900
last_modified_at: 2025-09-27 13:43:13+0900
published: true
---
> **원문 링크:** [PEP 758 - Allowexceptandexcept*expressions without parentheses](https://peps.python.org/pep-0758/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 30-Sep-2024

## PEP 758 – `except` 및 `except*` 표현식에서 괄호 없이 사용 허용

**저자:** Pablo Galindo, Brett Cannon
**상태:** Final
**타입:** Standards Track
**생성일:** 2024년 9월 30일
**Python 버전:** 3.14
**해결일:** 2025년 3월 14일

---

### 초록 (Abstract)

이 PEP는 Python의 예외 처리 구문에서 `as` 절을 사용하지 않을 경우에 한해, `except` 및 `except*` 블록에서 괄호 없는(unparenthesized) 표현식 사용을 허용할 것을 제안합니다. 현재 여러 예외를 처리할 때 예외 타입 주변에 괄호가 필요하며, 이는 Python 2의 잔재였습니다. 이 PEP는 이러한 괄호의 생략을 허용하여 구문을 단순화하고, 괄호가 선택적인 다른 구문과의 일관성을 높이며, 특정 경우에 가독성을 향상시키는 것을 목표로 합니다.

### 동기 (Motivation)

현재 여러 예외를 catch(포착)하기 위한 구문은 `except` 표현식 (및 `except*` 표현식)에 괄호를 요구합니다. 예를 들면 다음과 같습니다:

```python
try:
    ...
except (ExceptionA, ExceptionB, ExceptionC):
    ...
```

이 구문은 명확하고 모호하지 않지만, 특히 많은 수의 예외를 처리할 때 불필요하게 장황하게 느껴질 수 있습니다. 괄호 생략을 허용함으로써 구문을 다음과 같이 단순화할 수 있습니다:

```python
try:
    ...
except ExceptionA, ExceptionB, ExceptionC:
    ...
```

이 변경은 함수 인자, 함수 호출 내의 제너레이터 표현식, 튜플 리터럴과 같이 괄호가 선택적인 Python의 다른 쉼표로 구분된(comma-separated) 목록과 구문이 더욱 일치하도록 만들 것입니다.

동일한 변경이 `except*` 표현식에도 적용됩니다. 예를 들면 다음과 같습니다:

```python
try:
    ...
except* ExceptionA, ExceptionB, ExceptionC:
    ...
```

예외 인스턴스를 캡처하기 위해 `as` 절을 사용할 때는 이전과 마찬가지로 괄호를 사용해야 합니다. 일부 사용자들은 괄호를 요구하지 않으면 어떤 것이 정확히 대상에 할당되는지 불분명하여 혼란스러울 수 있다고 표명했습니다. 이는 언어의 다른 부분에서 비슷한 상황(예: `import` 및 `context manager`)에서 여러 `as` 절이 사용될 수 있기 때문입니다. 즉, 이전 예제에 `as` 절이 추가되는 경우 다음과 같이 해야 합니다:

```python
try:
    ...
except (ExceptionA, ExceptionB, ExceptionC) as e:
    ...
```

### 이론적 근거 (Rationale)

괄호 없는 `except` 블록을 허용하기로 한 결정은 다음 고려 사항을 기반으로 합니다:

*   **단순성 (Simplicity):** 괄호 요구 사항을 제거하면 구문이 단순해지고 언어의 다른 부분과 더욱 일관성을 갖게 됩니다.
*   **가독성 (Readability):** 많은 예외를 처리하는 경우 괄호 제거는 시각적 혼란을 줄여 가독성을 향상시킬 수 있습니다.
*   **일관성 (Consistency):** 이 변경은 모호하지 않은 쉼표로 구분된 목록이 괄호를 요구하지 않는 Python의 다른 부분과 `except` 절을 더욱 일관성 있게 만듭니다.

### 명세 (Specification)

`except` 절의 구문은 괄호 없는 예외 타입 목록을 허용하도록 수정됩니다. 문법은 다음과 같이 업데이트될 것입니다:

```
except_block:
    | 'except' expressions ':' block
    | 'except' expression 'as' NAME ':' block
    | 'except' ':' block
except_star_block
    | 'except' '*' expressions ':' block
    | 'except' '*' expression 'as' NAME ':' block
```

이는 `as` 키워드를 사용할 때 괄호를 요구하면서 현재의 괄호 있는 구문과 새로운 괄호 없는 구문을 모두 허용합니다:

```python
try:
    ...
except (ExceptionA, ExceptionB):  # 여전히 유효함
    ...
except ExceptionC, ExceptionD:    # 새로운 구문
    ...
except (ExceptionE, ExceptionF) as e: # 괄호는 여전히 필수
    ...
```

예외 처리의 의미는 변경되지 않습니다. 인터프리터는 괄호로 묶였든 그렇지 않든 나열된 예외 중 하나를 catch할 것입니다.

### 하위 호환성 (Backwards Compatibility)

이 변경은 완전히 하위 호환됩니다. 괄호로 묶인 `except` 및 `except*` 블록을 사용하는 모든 기존 코드는 수정 없이 계속 작동합니다. 새로운 구문은 순전히 추가적(additive)이며 기존 코드를 손상시키지 않습니다.

Python 2에서는 괄호 없는 구문이 두 요소와 함께 허용되었지만, 첫 번째 요소가 예외 타입으로 사용되고 두 번째 요소가 캡처 변수로 사용되는 다른 의미를 가졌다는 점을 주목할 가치가 있습니다. 이 변경은 Python 2의 의미를 다시 도입하지 않으며, 괄호 없는 구문은 괄호 있는 버전과 동일하게 동작할 것입니다.

### 보안 영향 (Security Implications)

이 변경으로 인한 알려진 보안 영향은 없습니다. 예외 처리의 의미는 동일하게 유지되며, 이는 순전히 구문적(syntactic) 변경입니다.

### 교육 방법 (How to Teach This)

새로운 Python 사용자에게는 괄호 없는 구문을 여러 예외를 catch하는 표준적인 방법으로 가르칠 수 있습니다:

```python
try:
    risky_operation()
except ValueError, TypeError, OSError:
    handle_errors()
```

경험이 많은 사용자에게는 괄호 있는 버전과 상호 교환적으로 사용할 수 있는 새로운 선택적 구문으로 소개할 수 있습니다. 문서는 두 형식이 동등함을 명시해야 합니다:

```python
# 다음은 동등합니다:
except (ValueError, TypeError):
    ...
except ValueError, TypeError:
    ...
```

이것이 순전히 구문적 변경이며 예외 처리의 동작에는 영향을 미치지 않는다는 점을 강조해야 합니다.

### 참조 구현 (Reference Implementation)

개념 증명(proof-of-concept) 구현은 https://github.com/pablogsal/cpython/commits/notuples/ 에서 확인할 수 있습니다. 이 구현은 Python 파서를 수정하여 새로운 구문을 받아들이고 괄호 있는 버전과 동일하게 동작하도록 보장합니다.

### 기각된 아이디어 (Rejected Ideas)

**괄호 있는 구문과 괄호 없는 구문 혼용 허용:**

```python
try:
    ...
except (ValueError, TypeError), OSError:
    ...
```

이것은 혼란을 야기할 가능성과 두 스타일 간의 명확한 구분을 유지하기 위해 기각되었습니다.

### 보류된 아이디어 (Deferred Ideas)

`as` 키워드를 사용할 때 괄호 없는 표현식을 허용하는 것. 이 특정 형식은 명확한 합의가 없으며 양측 모두에 합리적인 주장이 있으므로 보류하기로 결정했습니다. 괄호 요구 사항을 유지하는 것이 가장 안전한 접근 방식입니다. 왜냐하면 사용자에게 불일치가 너무 심하다고 판단될 경우 나중에 제거할 수 있지만, 제거했다가 사용자들이 나쁜 아이디어라고 판단하면 다시 되돌리기가 쉽지 않기 때문입니다.

### 각주 (Footnotes)

 원래 이름은 "Parenthetically Speaking, We Don't Need 'Em" 이었습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 있거나 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.