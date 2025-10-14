---
title: "[Superseded] PEP 5 - Guidelines for Language Evolution"
excerpt: "Python Enhancement Proposal 5: 'Guidelines for Language Evolution'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/5/
toc: true
toc_sticky: true
date: 2025-09-26 15:40:01+0900
last_modified_at: 2025-09-26 15:40:01+0900
published: true
---
> **원문 링크:** [PEP 5 - Guidelines for Language Evolution](https://peps.python.org/pep-0005/)
>
> **상태:** Superseded | **유형:** Process | **작성일:** 26-Oct-2000

# PEP 5 – 언어 진화를 위한 가이드라인

*본 문서는 PEP 387에 의해 대체(Superseded)되었습니다.*

*   **작성자:** Paul Prescod <paul at prescod.net>
*   **상태:** Superseded (대체됨)
*   **유형:** Process (프로세스)
*   **생성일:** 2000년 10월 26일
*   **후속 처리:** PEP 387에 의해 대체됨

## 개요 (Abstract)

프로그래밍 언어의 자연스러운 진화 과정에서 때로는 오래된 프로그램의 동작을 변경하는 수정이 필요할 수 있습니다. 이 PEP는 기존 Python 사용자 기반을 존중하는 방식으로 이러한 변경 사항을 구현하기 위한 정책을 제안합니다.

## 구현 세부 사항 (Implementation Details)

이 PEP의 구현은 공식적인 경고(warning) 및 비권장(deprecation) 기능을 추가해야 하며, 이는 다른 제안에서 설명될 것입니다.

## 범위 (Scope)

이 가이드라인은 이전 버전과 호환되지 않는(backward-incompatible) 동작을 도입하는 미래의 Python 버전에 적용됩니다. 호환되지 않는 동작은 표준 Python 문서에 설명된 이전 동작과 Python 해석에서 주요한 차이가 있는 경우를 의미합니다. 기능 제거 또한 동작 변경에 해당합니다.

이 PEP는 동적으로 호환 가능한 파서(parser)를 로드하는 것과 같은 다른 호환성 전략을 대체하거나 배제하지 않습니다. 그러나 "오래된 코드"의 실행에 특별한 스위치(switch)나 프라그마(pragma)가 필요한 경우, 이는 사용자 관점에서 동작 변경에 해당하며, 해당 변경 사항은 이 가이드라인에 따라 구현되어야 합니다.

일반적으로 이 가이드라인을 구현할 때는 상식(common sense)이 우선되어야 합니다. 예를 들어, "sys.copyright"를 변경하는 것은 이전 버전과 호환되지 않는 동작 변경에 해당하지 않습니다.

## 이전 버전과 호환되지 않는 기능 도입을 위한 단계 (Steps For Introducing Backwards-Incompatible Features)

이전 버전과 호환되지 않는 동작을 도입하려면 다음 단계를 거쳐야 합니다.

1.  **PEP를 통한 제안:** 이전 버전과 호환되지 않는 동작을 PEP로 제안해야 합니다. 이 PEP에는 나머지 단계를 완료하기 위한 상세 계획을 설명하는 '하위 호환성(backwards compatibility)' 섹션이 포함되어야 합니다.
2.  **대체 방법 구현:** PEP가 생산적인 방향으로 수락되면, 제거되거나 변경되는 기능이 이전에 제공했던 작업을 수행할 수 있는 대체 방법을 구현합니다. 예를 들어, 덧셈 연산자가 제거될 예정이라면, Python의 새 버전은 "add()" 내장 함수를 구현할 수 있습니다.
3.  **공식적인 비권장(Deprecation):** 더 이상 사용되지 않는 구성(construct)을 Python 문서에서 공식적으로 비권장(deprecate)합니다.
4.  **경고 모드 추가:** 비권장된 구성이 사용될 때 사용자에게 알리는 선택적 경고 모드를 파서에 추가합니다. 즉, 미래에 다르게 동작할 모든 프로그램은 이 모드에서 경고를 트리거해야 합니다. 런타임 경고보다는 컴파일 시간 경고가 더 선호됩니다. 경고 메시지는 사용자에게 비권장된 구성 대신 대체 구성으로 전환하도록 안내해야 합니다.
5.  **전환 기간 설정:** 전환 버전의 Python 릴리스와 이전 버전과 호환되지 않는 버전의 릴리스 사이에 최소 1년의 전환 기간이 있어야 합니다. 사용자들은 최소 1년 동안 프로그램을 테스트하고, 비권장된 구성에서 대체 구성으로 마이그레이션할 시간을 갖게 됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.