---
title: "[Rejected] PEP 294 - Type Names in the types Module"
excerpt: "Python Enhancement Proposal 294: 'Type Names in the types Module'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/294/
toc: true
toc_sticky: true
date: 2025-09-26 18:05:08+0900
last_modified_at: 2025-09-26 18:05:08+0900
published: true
---
> **원문 링크:** [PEP 294 - Type Names in the types Module](https://peps.python.org/pep-0294/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 19-Jun-2002


# PEP 294 – `types` 모듈의 타입 이름

*   **작성자:** Oren Tirosh
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2002년 6월 19일
*   **Python 버전:** 2.5

## 개요 (Abstract)

이 PEP는 `types` 모듈 내의 모든 기본(basic) Python 타입에 대해 타입 이름과 일치하는 심볼을 `types` 모듈에 추가할 것을 제안합니다.

예를 들어:
*   `types.IntegerType` -> `types.int`
*   `types.FunctionType` -> `types.function`
*   `types.TracebackType` -> `types.traceback`

현재 `types` 모듈에 있는 길고 대문자로 시작하는 이름들은 deprecated(사용 중단)될 예정이었습니다. 이 변경을 통해 `types` 모듈은 `new` 모듈을 대체할 수 있으며, `new` 모듈은 deprecated되고 PEP 4에 등재될 예정이었습니다.

## 결정 (Pronouncement)

타입 이름들을 중앙 집중식으로 저장하는 방식은 실수였습니다. `types` 모듈이나 `new` 모듈 모두 Python 3.0으로 계승되어서는 안 됩니다.

그러므로, 제안된 업데이트를 이 모듈들에 적용하는 것은 타당하지 않습니다. 이는 아무런 이점 없이 혼란만 야기할 것입니다.

대신, 일부 내부 타입(프레임, 함수 등)이 해당 모듈 외에는 존재하지 않는다는 문제는 `__builtin__` 또는 `sys` 모듈에 추가함으로써 해결될 수 있습니다. 이는 Python 3.0으로의 더 순조로운 전환을 제공할 것입니다.

## 배경 (Rationale)

동일한 객체에 두 가지 이름 세트를 사용하는 것은 불필요하며 혼란을 야기합니다.

Python 2.2 이전 버전에서는 많은 타입 이름과 일치하는 심볼들이 해당 타입의 팩토리 함수(factory function)에 의해 사용되었습니다. 이제 모든 기본 타입은 해당 팩토리 함수와 통합되었으므로, 타입 이름은 타입 객체를 일관되게 참조하는 데 사용할 수 있게 되었습니다.

대부분의 타입은 내장(builtins)으로 또는 `new` 모듈에서 접근할 수 있지만, `traceback`이나 `generator`와 같은 일부 타입은 `types` 모듈을 통해서만 타입 이름과 일치하지 않는 이름으로 접근할 수 있습니다. 이 PEP는 모든 기본 타입을 단일 이름 세트로 접근할 수 있는 통일된 방법을 제공하고자 했습니다.

## 명세 (Specification)

`types` 모듈은 다음 테스트를 통과해야 했습니다.

```python
import types
for t in vars(types).values():
    if type(t) is type:
        assert getattr(types, t.__name__) is t
```
`class`, `instance method`, `dict-proxy`와 같은 타입들은 이미 유효한 Python 식별자인 `classobj`, `instancemethod`, `dictproxy`로 이름이 변경되어 이 변경이 가능하게 되었습니다.

## 하위 호환성 (Backward compatibility)

기존의 긴 이름들이 광범위하게 사용되고 있기 때문에, 향후 버전에서 `types` 모듈에서 해당 이름들을 실제로 제거할 계획은 없었습니다. 그러나 새로운 코드에서 사용을 지양하도록 문서 및 라이브러리 소스에서 긴 이름들을 변경해야 했습니다.

## 참조 구현 (Reference Implementation)

이슈 #569328에서 참조 구현을 확인할 수 있었습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.