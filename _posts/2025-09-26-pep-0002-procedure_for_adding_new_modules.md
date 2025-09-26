---
title: "[Active] PEP 2 - Procedure for Adding New Modules"
excerpt: "Python Enhancement Proposal 2: 'Procedure for Adding New Modules'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/2/
toc: true
toc_sticky: true
date: 2025-09-26 15:36:38+0900
last_modified_at: 2025-09-26 15:36:38+0900
published: true
---
> **원문 링크:** [PEP 2 - Procedure for Adding New Modules](https://peps.python.org/pep-0002/)
>
> **상태:** Active | **유형:** Process | **작성일:** 07-Jul-2001

## PEP 2 – 새 모듈 추가 절차

### 개요
이 문서는 Python 표준 라이브러리에 새 모듈을 추가하는 절차에 대해 설명합니다. Python의 성공에 크게 기여하는 표준 라이브러리의 유용성을 유지하고, 추가되는 각 모듈에 대한 지속적인 유지보수 비용과 사용자들의 인지 부하(cognitive load)를 관리하기 위한 중요한 절차입니다.

### 작성자
*   Brett Cannon
*   Martijn Faassen

### 상태
Active (활성)

### 유형
Process (절차)

### 생성일
2001년 7월 7일

### 1. 서론 (Introduction)

Python 표준 라이브러리는 Python의 성공에 지대한 영향을 미칩니다. Python은 "batteries included"(배터리가 포함되어 있음)라는 철학을 가지고 있어, 사용자들이 표준 라이브러리만으로도 쉽게 생산성을 높일 수 있습니다. 따라서 표준 라이브러리의 유용성을 유지하는 것이 매우 중요합니다.

표준 라이브러리는 그 가시성과 중요성 때문에 신중하게 관리되어야 합니다. 라이브러리 내의 모든 코드는 Python 개발 팀에 의해 유지보수되어야 하며, 이는 각 추가 항목에 대해 영구적인 비용을 발생시킵니다. 또한, 사용자들은 표준 라이브러리에 어떤 내용이 포함되어 있는지 파악해야 하는 추가적인 인지 부하를 갖게 됩니다.

새로운 기능은 일반적으로 새 모듈의 형태로 라이브러리에 추가됩니다. 이 PEP는 새 모듈 추가 절차에 대해 설명합니다. 모듈 폐기(deprecation) 절차, 즉 표준 라이브러리에서 오래되고 사용되지 않는 모듈을 제거하는 절차는 PEP 4에서 다룹니다.

### 2. 승인 절차 (Acceptance Procedure)

*   **최상위 모듈/패키지 (Top-level modules/packages):** 최상위 모듈 또는 패키지를 표준 라이브러리에 추가하려면 PEP (Python Enhancement Proposal)가 필요합니다. PEP 작성 절차는 PEP 1에 설명되어 있습니다.
*   **기존 패키지의 서브모듈 (Submodules of a preexisting package):** 표준 라이브러리에 이미 존재하는 패키지의 서브모듈 추가는 일반 Python 개발 팀 및 그 구성원의 재량에 따라 결정됩니다.
*   **일반적인 지침 (General guidance):** 일반적으로 표준 라이브러리에 어떤 모듈이 수용되는지, 전반적인 프로세스 등은 개발자 가이드(developer's guide)에 설명되어 있습니다.

### 3. 유지보수 절차 (Maintenance Procedure)

표준 라이브러리에 한 번 승인된 모든 항목은 Python의 개발 인프라 내에서 주로 유지보수될 것으로 예상됩니다. 개발 팀의 일부 구성원이 표준 라이브러리 외부에서 모듈의 백포트(backport)를 유지보수하기로 선택할 수도 있지만, 외부 코드를 적절하게 동기화하는 것은 해당 구성원의 책임입니다.

### 4. 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.