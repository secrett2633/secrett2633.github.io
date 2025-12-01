---
title: "[Final] PEP 3002 - Procedure for Backwards-Incompatible Changes"
excerpt: "Python Enhancement Proposal 3002: 'Procedure for Backwards-Incompatible Changes'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3002/
toc: true
toc_sticky: true
date: 2025-09-27 14:12:06+0900
last_modified_at: 2025-09-27 14:12:06+0900
published: true
---
> **원문 링크:** [PEP 3002 - Procedure for Backwards-Incompatible Changes](https://peps.python.org/pep-3002/)
>
> **상태:** Final | **유형:** Process | **작성일:** 27-Mar-2006



# PEP 3002 – 하위 호환성을 깨는 변경사항을 위한 절차

*   **작성자:** Steven Bethard
*   **상태:** Final (최종)
*   **유형:** Process (프로세스)
*   **생성일:** 2006년 3월 27일

## 요약 (Abstract)

이 PEP는 Python 2.X 시리즈와 Python 3000 (Python 3.x의 초기 명칭) 사이에서 하위 호환성을 깨는 (backwards-incompatible) Python 변경사항에 대한 절차를 설명합니다. 이러한 모든 변경사항은 적절한 Python 3000 PEP에 문서화되어야 하며, Python 2.X 코드 조각이 Python 3000에서 문제가 될 수 있는 경우를 식별할 수 있는 코드를 동반해야 합니다.

## 도입 배경 (Rationale)

Python 3000은 주로 언어를 간소화하고 이전의 일부 설계 실수를 제거하기 위해 Python에 여러 하위 호환성을 깨는 변경사항을 도입할 예정입니다. 그러나 Python 3000은 Python 2.X 시리즈와 완전히 다른 새로운 언어가 될 의도는 아니며, 대부분의 Python 사용자 커뮤니티가 Python 3000이 출시될 때 전환할 것으로 예상됩니다.

이러한 전환을 장려하기 위해서는 Python 2.X 코드를 Python 3000 코드로 업그레이드하는 방법에 대한 명확하고 완전한 가이드를 제공하는 것이 중요합니다. 따라서, 모든 하위 호환성을 깨는 변경사항에 대해 다음 두 가지가 필요합니다.

1.  공식 Python Enhancement Proposal (PEP)
2.  Python 3000에서 문제가 될 수 있는 Python 2.X 코드 조각을 식별할 수 있는 코드

## Python Enhancement Proposals (PEP)

모든 하위 호환성을 깨는 변경사항은 PEP를 동반해야 합니다. 이 PEP는 일반적인 PEP 가이드라인을 따라야 하며, 하위 호환성을 깨는 변경사항의 목적과 근거를 설명해야 합니다. 일반적인 PEP 섹션 외에도, 하위 호환성을 깨는 변경사항을 제안하는 모든 PEP는 추가 섹션인 **Compatibility Issues (호환성 문제)** 를 포함해야 합니다. 이 섹션은 제안된 Python 변경사항이 무엇 때문에 하위 호환성이 없는지, 그리고 예상되는 주요 문제점(breakage)들을 설명해야 합니다.

PEP는 여전히 개별적으로 평가되어야 하지만, `Compatibility Issues` 섹션이 다음 중 하나를 시사하는 경우 Python 3000에 부적합할 수 있습니다.

*   Python 2.X 구조의 대부분 또는 모든 인스턴스가 Python 3000에서 올바르지 않고, Python 3000 구조의 대부분 또는 모든 인스턴스가 Python 2.X에서 올바르지 않은 경우.
    *   예를 들어, `for-loop`의 `else` 절의 의미를 "루프가 중단되지 않았을 때 실행"에서 "루프가 0번 반복되었을 때 실행"으로 변경한다면, 모든 Python 2.X `for-loop`의 `else` 절이 오작동하게 될 것입니다. 또한, Python 3000에 적합한 방식으로 `for-loop`의 `else` 절을 사용할 방법이 없게 됩니다. 따라서 이러한 아이디어에 대한 PEP는 아마도 거부될 것입니다.
*   Python 2.X 구조의 많은 인스턴스가 Python 3000에서 올바르지 않지만, 해당 PEP가 변경사항에 대한 실제 사용 사례(real-world use-cases)를 입증하지 못하는 경우.
    *   하위 호환성을 깨는 변경사항은 Python 3000에서 허용되지만, 과도해서는 안 됩니다. 하위 호환성을 깨는 변경사항을 제안하는 PEP는 변경사항으로 인해 가시적으로 이점을 얻는 코드의 좋은 예시를 제공해야 합니다.

PEP 작성은 시간이 많이 소요되므로, 여러 하위 호환성을 깨는 변경사항이 밀접하게 관련되어 있는 경우 같은 PEP에서 제안되어야 합니다. 이러한 PEP는 모든 제안된 변경사항에서 예상되는 문제점들을 설명해야 하므로, `Compatibility Issues` 섹션이 더 길어질 수 있습니다.

## 문제성 코드 식별 (Identifying Problematic Code)

PEP 요구사항 외에도, 하위 호환성을 깨는 Python 변경사항은 Python 3000에서 다르게 동작할 Python 2.X 코드 조각에 대해 경고를 발행하는 코드를 동반해야 합니다. 이러한 경고는 새로운 명령줄 스위치인 `-3`을 사용하여 Python 2.X에서 활성화될 것입니다. 모든 하위 호환성을 깨는 변경사항은 `-3`이 지정되었을 때 변경되는 각 구조에 대해 경고를 발행하는 Python 2.X용 패치를 동반해야 합니다.

예를 들어, Python 3000에서 `dict.keys()`가 이터레이터(iterator)를 반환하는 경우, Python 2.X 브랜치에 대한 패치는 다음과 같이 작동해야 합니다.

*   `-3`이 지정되었다면, `dict.keys()`가 `list`의 서브클래스(subclass)를 반환하도록 변경하고, `__iter__()` 메서드 외의 다른 메서드를 사용할 때마다 경고를 발행하도록 합니다.

이러한 패치는 Python 3000에 없을 기능이 사용될 때만 경고가 발행되도록 하며, 거의 모든 기존 코드는 계속 작동해야 합니다. (`dict.keys()`가 항상 `list`를 반환하고 서브클래스가 아님에 의존하는 코드는 거의 없을 것입니다.)

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.