---
title: "[Final] PEP 415 - Implement context suppression with exception attributes"
excerpt: "Python Enhancement Proposal 415: 'Implement context suppression with exception attributes'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/415/
toc: true
toc_sticky: true
date: 2025-09-26 21:34:10+0900
last_modified_at: 2025-09-26 21:34:10+0900
published: true
---
> **원문 링크:** [PEP 415 - Implement context suppression with exception attributes](https://peps.python.org/pep-0415/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 26-Feb-2012


# PEP 0415: 예외 속성을 이용한 컨텍스트 억제 구현

## 개요 (Abstract)

PEP 0415는 `raise exc from None` 구문을 통해 예외 컨텍스트 표시를 명시적으로 억제할 수 있도록 PEP 0409에서 도입된 언어 수준의 변경 사항을 유지합니다. 그러나 이 PEP는 기존 PEP 0409의 내부 구현 메커니즘을 모든 `BaseException` 인스턴스에 새로운 `__suppress_context__` 속성을 도입하는 더 간단한 방식으로 대체합니다.

## PEP 수락 (PEP Acceptance)

이 PEP는 2012년 5월 14일 Alyssa Coghlan에 의해 수락되었습니다.

## 배경 (Rationale)

PEP 0409에서는 `__cause__`가 기본적으로 `Ellipsis`가 되도록 변경했습니다. 그런 다음 `raise exc from None`을 통해 `__cause__`가 `None`으로 설정되면, 해당 예외가 포착되지 않았을 때 컨텍스트나 원인(cause)이 출력되지 않도록 했습니다.

이 방식의 주요 문제는 `__cause__`의 역할을 복잡하게 만든다는 점입니다. `__cause__`는 예외의 원인을 나타내야 하며, `__context__`가 출력되어야 하는지 여부를 나타내는 용도가 아닙니다. 또한, 이 `__cause__`의 사용법은 미래에 쉽게 확장하기 어렵습니다. 예를 들어, 언젠가 프로그래머가 `__context__`와 `__cause__` 중 어느 것을 출력할지 선택할 수 있도록 허용하고 싶을 수도 있지만, PEP 0409의 구현 방식으로는 이러한 확장이 어렵습니다.

`Ellipsis`의 사용 또한 일종의 "꼼수(hack)"입니다. PEP 0409 이전에는 `Ellipsis`가 주로 확장 슬라이싱(extended slicing)에서만 사용되었습니다. 확장 슬라이싱은 예외와 아무런 관련이 없기 때문에, 예외 객체를 검사하는 사람이 왜 `__cause__`가 `Ellipsis`로 설정되어야 하는지 명확하게 이해하기 어려웠습니다. 기본적으로 `__cause__`에 `Ellipsis`를 사용하는 것은 `__context__`와의 비대칭성을 야기했습니다.

## 제안 (Proposal)

`BaseException`에 새로운 속성인 `__suppress_context__`가 도입될 예정입니다.

`__cause__`가 설정될 때마다 `__suppress_context__`는 `True`로 설정됩니다. 특히 `raise exc from cause` 구문은 `exc.__suppress_context__`를 `True`로 설정합니다.

예외 출력 코드는 이 속성을 확인하여 컨텍스트와 원인(cause)이 출력될지 여부를 결정하게 됩니다.

`__cause__`는 원래의 목적과 값으로 돌아갑니다.

`__suppress_context__`의 선례는 `print_line_and_file` 예외 속성에서 찾아볼 수 있습니다.

요약하자면, `raise exc from cause`는 다음과 동일하게 작동합니다:

```python
exc.__cause__ = cause
raise exc
```

여기서 `exc.__cause__ = cause`는 암묵적으로 `exc.__suppress_context__`를 설정합니다.

## 패치 (Patches)

관련 패치는 Issue 14133에서 확인할 수 있습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.