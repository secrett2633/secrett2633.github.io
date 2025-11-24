---
title: "[Rejected] PEP 254 - Making Classes Look More Like Types"
excerpt: "Python Enhancement Proposal 254: 'Making Classes Look More Like Types'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/254/
toc: true
toc_sticky: true
date: 2025-09-26 17:33:28+0900
last_modified_at: 2025-09-26 17:33:28+0900
published: true
---
> **원문 링크:** [PEP 254 - Making Classes Look More Like Types](https://peps.python.org/pep-0254/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 18-Jun-2001



# PEP 254 – 클래스를 타입처럼 보이게 만들기 (Making Classes Look More Like Types)

## 요약

이 PEP는 작성되지 않은 상태로 제출된 초안(stub entry)이며, 결국 채워지지 않고 폐기되었습니다. 이 PEP의 의도된 기능 대부분은 Python 2.2 버전에서 도입된 "new-style types and classes"를 통해 구현되었습니다.

## 상태

이 PEP는 초안(stub entry)이었으며, 내용이 채워지지 않은 채로 결국 폐기되었습니다. 이 PEP가 의도했던 기능의 대부분은 Python 2.2 버전에서 새로운 스타일의 타입과 클래스(new-style types and classes)를 통해 구현되었습니다.

## 도입 배경 및 Python 사용에 미치는 영향 (예측)

PEP 254는 "클래스를 타입처럼 보이게 만들기(Making Classes Look More Like Types)"라는 제목에서 유추할 수 있듯이, Python의 타입 시스템과 클래스 정의 방식 간의 일관성 및 통합을 개선하려는 초기 시도였을 것으로 보입니다.

Python 2.2 이전에는 '클래식 클래스(classic classes)'와 내장 타입(built-in types) 간에 중요한 차이가 있었습니다. 예를 들어, 모든 클래스는 궁극적으로 `object`로부터 상속받는 것이 아니었으며, 메타클래스(metaclass) 시스템도 현재와 같은 형태로 완전히 정립되지 않았습니다. 이러한 차이점은 상속 구조, 메서드 해결 순서(MRO), 속성 접근 방식 등에서 혼란을 야기할 수 있었습니다.

PEP 254는 이러한 문제를 해결하고, 사용자 정의 클래스(user-defined classes)가 내장 타입(built-in types)과 유사하게 동작하고 더 일관된 객체 모델을 제공하도록 하려 했을 것입니다. 그러나 이 PEP 자체가 구체적인 내용으로 채워지지 않은 채 폐기되었기 때문에, 정확히 어떤 제안을 담았는지는 알 수 없습니다.

중요한 점은, 이 PEP의 목표로 추정되는 바가 Python 2.2에서 도입된 "new-style types and classes"를 통해 상당 부분 실현되었다는 것입니다. "New-style classes"는 모든 클래스가 `object`로부터 상속받도록 강제함으로써, 클래스와 타입 간의 일관성을 크게 높였습니다. 이는 다음과 같은 영향을 미쳤습니다.

*   **통일된 객체 모델:** 모든 것이 `object`를 상속받는 계층 구조를 갖게 되어, 내장 타입이든 사용자 정의 클래스든 동일한 방식으로 동작하게 되었습니다.
*   **메타클래스 기능 강화:** `type`을 메타클래스로 사용하는 것이 표준화되면서, 클래스 생성 자체를 제어하고 커스터마이징하는 강력한 메커니즘이 제공되었습니다.
*   **일관된 속성 및 메서드 해결:** `__slots__`, 디스크립터(descriptors) 등 고급 객체 지향 기능을 클래스와 타입 모두에서 일관되게 사용할 수 있게 되었습니다.

결론적으로 PEP 254는 구체적인 내용을 제시하지 못하고 폐기되었지만, 그 제목이 암시하는 방향성은 Python의 객체 모델이 발전하는 데 중요한 역할을 했습니다. 이 PEP의 "의도된 기능"은 Python 2.2의 "new-style classes"를 통해 성공적으로 구현되었으며, 이는 오늘날 우리가 사용하는 Python의 객체 지향 프로그래밍 패러다임의 초석이 되었습니다.

## 저작권

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.