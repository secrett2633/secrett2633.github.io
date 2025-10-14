---
title: "[Rejected] PEP 244 - Thedirectivestatement"
excerpt: "Python Enhancement Proposal 244: 'Thedirectivestatement'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/244/
toc: true
toc_sticky: true
date: 2025-09-26 17:15:30+0900
last_modified_at: 2025-09-26 17:15:30+0900
published: true
---
> **원문 링크:** [PEP 244 - Thedirectivestatement](https://peps.python.org/pep-0244/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 20-Mar-2001



# PEP 244 – `directive` 문 (The directive statement)

*   **작성자:** Martin von Löwis
*   **상태:** 거부됨 (Rejected)
*   **유형:** Standards Track
*   **생성일:** 2001년 3월 20일
*   **Python 버전:** 2.1

## 1. 동기 (Motivation)

Python은 때때로 핵심 언어 구조의 공개된 의미(advertised semantics)에 호환되지 않는 변경을 가하거나, 우발적인(구현 의존적인) 동작을 변경합니다. 이러한 변경은 장기적으로 언어 개선을 목표로 하지만, 단기적으로는 논란의 여지가 있고 혼란을 야기할 수 있습니다.

PEP 5 "언어 진화 지침 (Guidelines for Language Evolution)"은 이러한 어려움을 완화할 방법을 제안하며, 이 PEP (244)는 이를 지원하는 메커니즘을 도입하고자 했습니다. PEP 227 "정적으로 중첩된 스코프 (Statically Nested Scopes)"는 이 메커니즘의 첫 적용 사례로 예시로 사용되었습니다.

새로운, 잠재적으로 호환되지 않는 언어 기능이 추가될 때, 일부 모듈과 라이브러리는 이를 사용할 수 있지만 다른 모듈은 사용하지 않을 수 있습니다. 이 제안은 모듈 작성자가 특정 언어 기능의 사용 여부를 나타낼 수 있는 구문을 도입하고자 했습니다.

이 PEP 논의 과정에서 "설정 가능한(settable)" 언어 기능은 두 가지 종류가 있다는 의견이 제시되었습니다:
1.  **궁극적으로 유일한 옵션이 될 기능:** PEP 236 "`__future__`로 돌아가기 (Back to the __future__)"가 제안한 기능들이 이 범주에 속합니다. 이 PEP는 이러한 기능을 선언하고, 새로운 기능으로 인해 의미가 변경된 구조의 "오래된" 의미를 단계적으로 폐지하는 것을 지원합니다. 그러나 어떤 기능이 궁극적으로 폐지되어야 하는지에 대한 정책은 정의하지 않습니다.
2.  **영원히 선택 사항으로 유지될 기능:** 예를 들어 인터프리터의 일부 기본 설정을 변경하는 경우입니다. 특정 모듈에 대해 항상 라인 번호 명령을 내보내도록 요청하는 것과 같은 설정이 예시가 될 수 있습니다. 이 제안에서는 이러한 종류의 특정 플래그를 제안하지 않았습니다.

이 PEP의 주요 목표는 기존 라이브러리를 즉시 깨뜨리지 않고 새로운 언어 구조를 지원하는 것이었으므로, 새로운 구문 도입으로 인해 기존 라이브러리가 손상되지 않도록 특별한 주의를 기울였습니다.

## 2. 구문 (Syntax)

`directive_statement`는 다음과 같은 형태의 문장입니다:

```
directive_statement: 'directive' NAME [atom] [';'] NEWLINE
```

*   `directive`: 새로운 키워드입니다.
*   `NAME`: 지시문(directive)의 종류를 나타냅니다.
*   `[atom]`: 선택 사항이며, 지시문의 종류에 따라 추가적인 구문적 또는 의미론적 제약이 있을 수 있습니다.
*   `;`: 선택 사항입니다.

지시문의 이름에 따라 `atom`의 존재 여부와 추가적인 구문적/의미론적 제약이 정의됩니다. 또한, 지시문의 이름에 따라 모듈 내에서의 지시문 위치와 같은 추가적인 제약이 부과될 수 있습니다 (예: 모듈의 최상단에만 위치).

PEP 5의 지침에 따라 `directive` 키워드는 처음에는 `directive` 문에서 사용될 때만 키워드로 간주됩니다.

## 3. 의미 (Semantics)

`directive` 문은 Python 인터프리터에게 소스 파일을 다른 방식으로 처리하도록 지시합니다. 처리의 구체적인 세부 사항은 지시문의 이름에 따라 달라집니다. 선택적 `atom`은 일반적으로 소스 코드가 처리될 때 해석되며, 해석의 세부 사항도 지시문에 따라 달라집니다.

## 4. 특정 지시문: `transitional` (Specific Directives: transitional)

Python에 호환되지 않는 구문적 또는 의미론적 변경이 추가될 경우, PEP 5는 언어의 `transitional` (과도기적) 진화를 의무화하며, 이때 새로운 기능은 이전 기능과 함께 초기에 사용 가능합니다. 이러한 전환은 `transitional` 지시문을 통해 가능합니다.

`transitional` 지시문에서는 `NAME`이 `'transitional'`입니다. `atom`은 반드시 존재해야 하며 `NAME`이어야 합니다. 이 이름에 대한 가능한 값은 언어 변경이 정의될 때 함께 정의됩니다.

예시는 다음과 같습니다:

```python
directive transitional nested_scopes
```

`transitional` 지시문은 문서 문자열(documentation string)을 제외하고 모듈의 다른 어떤 문장보다 먼저 나타나야 합니다 (즉, 첫 번째 문장이 `STRING+`인 경우에만 모듈의 두 번째 문장으로 나타날 수 있습니다).

## 5. 하위 호환성 (Backwards Compatibility)

`directive`를 새로운 키워드로 도입하는 것은 기존 코드와 호환성 문제를 일으킬 수 있습니다. PEP 5의 지침에 따라, 이 제안의 초기 구현에서는 `directive`가 유효한 `directive_statement`에서 사용된 경우에만 (즉, 모듈에서 첫 번째 비 문자열 토큰으로 나타났을 때) 새로운 키워드로 간주됩니다.

## 6. 미해결 문제: 첫 번째 식별자로서의 `directive` (Unresolved Problems: directive as the first identifier)

모듈에서 `directive = 1` 과 같이 `directive`를 사용하면, 이는 식별자가 아닌 키워드로 처리될 것입니다. 추가적인 룩어헤드(look-ahead) 토큰을 사용하여 `NAME`으로 분류할 수도 있겠지만, Python 토크나이저에서는 그러한 룩어헤드를 사용할 수 없습니다.

## 7. 질문 및 답변 (Questions and Answers)

*   **Q:** 이 PEP는 소스 코드 문자 집합 정의를 허용하기 위해 작성된 것 같아 보입니다. 사실인가요?
    *   **A:** 아닙니다. `directive` 기능이 소스 코드 인코딩을 허용하도록 확장될 수 있지만, 특정 지시문은 제안되지 않았습니다.

*   **Q:** 그렇다면 이 PEP는 왜 작성되었습니까?
    *   **A:** 이는 `import` 문에 새로운 의미를 부여할 것을 제안하는 PEP 236에 대한 반대 제안(counter-proposal) 역할을 합니다. 이 PEP는 문제를 더 일반적인 방식으로 해결할 수 있도록 합니다.

*   **Q:** 하지만 소스 인코딩과 언어 변경을 섞는 것은 "사과와 오렌지를 섞는 것"과 같지 않나요?
    *   **A:** 그럴 수도 있습니다. 이러한 차이를 다루기 위해 미리 정의된 `transitional` 지시문이 정의되었습니다.

## 8. 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.