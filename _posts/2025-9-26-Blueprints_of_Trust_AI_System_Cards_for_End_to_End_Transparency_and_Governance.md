---
title: "[논문리뷰] Blueprints of Trust: AI System Cards for End to End Transparency and
  Governance"
excerpt: "Roman Zhukov이 [arXiv]에 게시한 'Blueprints of Trust: AI System Cards for End to End Transparency and
  Governance' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Governance
  - Transparency
  - AI System Card
  - Hazard-Aware System Card
  - Data Provenance
  - AI Safety
  - AI Risk Management
  - ISO/IEC 42001

permalink: /ai/review/2025-9-26-Blueprints_of_Trust_AI_System_Cards_for_End_to_End_Transparency_and_Governance/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.20394)

**저자:** Huzaifa Sidhpurwala, Emily Fox, Garth Mollett, Florencio Cano Gabarda, Roman Zhukov



## 핵심 연구 목표
본 논문은 AI 시스템의 개발 및 배포 과정에서 투명성과 책임성을 강화하기 위한 새로운 프레임워크인 **Hazard-Aware System Card (HASC)**를 소개합니다. 기존 모델 카드 및 시스템 카드 개념을 확장하여 AI 시스템의 보안 및 안전 상태를 포괄적이고 동적으로 기록하는 것을 목표로 하며, AI 시스템 수명 주기 전반에 걸쳐 정보에 기반한 의사 결정을 지원하고자 합니다.

## 핵심 방법론
제안된 **HASC** 프레임워크는 AI 시스템의 **시스템 청사진**, **사전 예방적 위험 분석 (Hazard Log)**, **사고 대응 및 위험 개선** 등 동적인 섹션을 포함하여 설계되었습니다. 특히, **ASH (AI Safety Hazard) ID**라는 새로운 표준화된 식별자를 도입하여 **CVE**와 유사하게 고정된 결함을 명확하고 일관되게 소통할 수 있도록 합니다. 또한, **JSON Schema**를 활용한 **자동화된 시스템 카드 생성** 방안을 제시하여 일관성과 기계 판독성을 확보하고, **ISO/IEC 42001:2023** 표준과의 연계성을 설명합니다.

## 주요 결과
논문은 **HASC**가 기존 시스템 카드에서 부족했던 **상호 운용성**과 **동적 업데이트** 기능을 제공하여 AI 시스템의 전체 수명 주기 동안 안전성을 추적하고 관리할 수 있음을 보여줍니다. 예를 들어, **AI Health Assistant** 챗봇 시나리오에서 **ASH-2025-0142**와 같은 특정 위험 식별자를 통해 문제 해결 및 시스템 카드 **v1.3** 업데이트 과정을 투명하게 기록하는 사례를 제시했습니다. HASC의 4가지 내용 범주가 **ISO/IEC 42001**의 다양한 요구사항을 충족하며, 특히 **데이터 출처** 및 **위험 관리**에 대한 규정 준수를 지원하는 것으로 나타났습니다. (HASC 프레임워크 자체의 정량적 성능 지표는 직접적으로 제시되지 않으며, 시스템 카드에 포함될 AI 모델의 성능 지표를 담는 방식에 대한 논의가 주를 이룹니다.)

## AI 실무자를 위한 시사점
**HASC**는 AI/ML 엔지니어와 데이터 과학자가 개발 중인 AI 시스템의 보안 및 안전 상태를 **종단 간(end-to-end)**으로 관리하고 소통하는 데 필수적인 도구를 제공합니다. 특히 **AI SBOM(Bill of Materials)**, **데이터 출처(Data Provenance)**, **위험 로그(Hazard Log)** 및 **ASH ID**의 통합은 규제 준수(예: **EU AI Act**, **NIST AI RMF**) 및 감사 역량을 크게 향상시킬 수 있습니다. 또한, **CI/CD 파이프라인**에 **HASC 생성 자동화**를 통합함으로써, '살아있는 문서'로서 AI 시스템의 변화에 실시간으로 대응하고, 개발 및 운영팀 간의 투명하고 효율적인 협업을 가능하게 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.