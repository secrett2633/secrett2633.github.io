---
title: "[Final] PEP 260 - Simplify xrange()"
excerpt: "Python Enhancement Proposal 260: 'Simplify xrange()'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/260/
toc: true
toc_sticky: true
date: 2025-09-26 17:42:10+0900
last_modified_at: 2025-09-26 17:42:10+0900
published: true
---
> **원문 링크:** [PEP 260 - Simplify xrange()](https://peps.python.org/pep-0260/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 26-Jun-2001


# PEP 260 – `xrange()` 단순화

## 요약 (Abstract)
이 PEP는 `xrange()` 객체에서 `x[i:j]`나 `x*n`와 같이 거의 사용되지 않는 일부 동작을 제거할 것을 제안합니다.

## 문제점 (Problem)
`xrange()` 함수는 주로 다음과 같은 한 가지 용도로 사용됩니다.

```python
for i in xrange(...):
    ...
```

그러나 `xrange()` 객체는 시퀀스(sequence)처럼 동작하게 하려는 여러 기능들을 가지고 있었지만, 이러한 기능들은 매우 드물게 사용되었습니다. 실제로 이 기능들에는 심각한 버그(예: off-by-one 오류)가 여러 릴리스 동안 감지되지 않고 존재했던 이력이 있습니다.

제안자는 사용되지 않는 이러한 기능을 제거하는 것이 더 나은 해결책이라고 주장합니다. 이를 통해 구현, 테스트 및 문서화가 단순해지고, 유지보수 및 코드 크기를 줄일 수 있습니다.

## 제안된 해결책 (Proposed Solution)
`xrange()` 객체를 최소한의 기능만 남기고 단순화할 것을 제안합니다. 유지되는 유일한 시퀀스 동작은 `x[i]`, `len(x)`, 그리고 `repr(x)`입니다. 특히, 다음 동작들이 제거됩니다.

*   `x[i:j]` (슬라이싱)
*   `x*n`, `n*x` (시퀀스 반복)
*   `cmp(x1, x2)` (비교)
*   `i in x` (포함 여부 테스트)
*   `x.tolist()` 메서드
*   `x.start`, `x.stop`, `x.step` 속성

또한, `PyRange_New()` C API의 시그니처에서 네 번째 인자(반복 횟수)를 제거하도록 변경할 것을 제안합니다.

사용자 정의 이터레이터(custom iterator) 타입을 구현함으로써 일반적인 사용 사례의 속도를 높일 수 있지만, 이는 필수는 아닙니다(기본 시퀀스 이터레이터로도 충분히 잘 작동합니다).

## 범위 (Scope)
이 PEP는 `xrange()` 내장 함수와 `PyRange_New()` C API에 영향을 미칩니다.

## 위험성 (Risks)
누군가의 코드가 확장된 `xrange()` 기능에 의존하고 있을 수 있으며, 이 경우 해당 코드가 제대로 작동하지 않을 수 있습니다. 그러나 역사적으로 확장된 코드의 버그가 오랫동안 감지되지 않았다는 점을 고려할 때, 영향을 받는 코드는 많지 않을 것으로 예상됩니다.

## 전환 (Transition)
하위 호환성(backwards compatibility)을 위해, 기존 기능은 Python 2.2에서도 여전히 존재하지만, 사용 시 경고(warning)를 발생시킬 것입니다. Python 2.2 정식 버전이 릴리스된 후 1년 뒤(아마도 Python 2.4에서) 해당 기능은 완전히 제거될 예정입니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.