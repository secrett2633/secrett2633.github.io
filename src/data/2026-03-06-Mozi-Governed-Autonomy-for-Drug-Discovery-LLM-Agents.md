---
title: "[논문리뷰] Mozi: Governed Autonomy for Drug Discovery LLM Agents"
excerpt: "arXiv에 게시된 'Mozi: Governed Autonomy for Drug Discovery LLM Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Drug Discovery
  - Governed Autonomy
  - Multi-Agent System
  - Workflow Orchestration
  - Human-in-the-Loop
  - Computational Biology
  - Reproducibility

permalink: /ai/review/2026-03-06-Mozi-Governed-Autonomy-for-Drug-Discovery-LLM-Agents/

toc: true
toc_sticky: true

date: 2026-03-06 00:00:00+0900+0900
last_modified_at: 2026-03-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.03655)

**저자:** He Caot, Siyu Liu, Fan Zhang, Zijing Liu, Hao Li, Bin Feng, Shengyuan Bai, Leqing Chen, Kai Xie, Yu Li



## 핵심 연구 목표
약물 발견과 같은 고위험 과학 도메인에서 **제한 없는 LLM 에이전트** 가 겪는 도구 사용 환각, 재현 불가능성, 그리고 장기적 신뢰성 부족 문제를 해결하고자 합니다. 유연한 LLM 추론 능력과 엄격한 계산 생물학 요구 사항을 결합하여, **거버넌스 기반 자율성** 을 갖춘 에이전트 프레임워크인 **Mozi** 를 제안하는 것이 목표입니다.

## 핵심 방법론
**Mozi** 는 **듀얼 레이어 아키텍처** 를 채택합니다. **Layer A (Control Plane)** 는 역할 기반 도구 격리, 제약된 행동 공간, 및 리플렉션 기반 재계획을 강제하는 계층적 감독-작업자 시스템으로 구성됩니다. **Layer B (Workflow Plane)** 는 타겟 식별부터 리드 최적화까지의 표준 약물 발견 단계를 **상태 저장형 구성 가능한 스킬 그래프(DAGs)** 로 구현하고, 엄격한 데이터 계약 및 **Human-in-the-Loop (HITL) 체크포인트** 를 통합하여 과학적 유효성을 보장합니다.

## 주요 결과
**PharmaBench 벤치마크** 에서 기존 기준선 대비 우수한 오케스트레이션 정확도를 입증했습니다. 예를 들어, **Mozi (Qwen3-235B)** 는 회귀 작업에서 **1.169 SMAPE** 를 달성하여 기준선(1.599)보다 뛰어났으며, HLE 약물 발견 태스크에서 **Mozi (Deepseek-V3.2)** 는 **21.42%의 정확도** 로 Gemini-2.5-Pro(10.71%)를 능가했습니다. 또한, 크론병, 파킨슨병, 패혈증에 대한 종단 간 사례 연구를 통해 대규모 화학 공간 탐색, 엄격한 독성 필터 적용, 그리고 임상적으로 경쟁력 있는 **in silico 후보 물질(예: 크론병 -8.8 kcal/mol, 파킨슨병 -8.924 kcal/mol, 패혈증 -8.4 kcal/mol의 결합 점수)** 생성 능력을 성공적으로 시연했습니다.

## AI 실무자를 위한 시사점
**Mozi** 는 **LLM 에이전트의 신뢰성과 안전성** 을 획기적으로 향상시키는 아키텍처를 제시하여, 복잡하고 규제가 엄격한 과학 분야에서 **AI 기반 자동화 시스템 개발** 의 새로운 가능성을 열었습니다. **듀얼 레이어 설계, 스킬 그래프, 그리고 HITL 통합** 은 장기적인 과학 워크플로우에서 **오류 전파를 효과적으로 방지** 하고, 자율성과 인간 전문가의 검증을 동시에 달성하는 실용적인 접근법을 제공합니다. 이는 **AI 기반 약물 발견 시스템** 의 실제 배포를 가속화하는 중요한 설계 원칙과 구현 전략을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.