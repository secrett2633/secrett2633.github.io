---
title: "[논문리뷰] SimWorld: An Open-ended Realistic Simulator for Autonomous Agents in Physical and Social Worlds"
excerpt: "Xuhong He이 [arXiv]에 게시한 'SimWorld: An Open-ended Realistic Simulator for Autonomous Agents in Physical and Social Worlds' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autonomous Agents
  - Realistic Simulator
  - Unreal Engine 5
  - LLM/VLM Agents
  - Procedural Generation
  - Multi-Agent Systems
  - Physical Simulation
  - Social Interaction

permalink: /ai/review/2025-12-03-SimWorld-An-Open-ended-Realistic-Simulator-for-Autonomous-Agents-in-Physical-and-Social-Worlds/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01078)

**저자:** Xuhong He, Lingjun Mao, Xiaokang Ye, Yan Zhuang, Jiawei Ren



## 핵심 연구 목표
본 논문은 기존 시뮬레이터들의 한계(제한된 환경, 비현실적인 물리/사회 규칙, LLM/VLM 에이전트 미지원)를 극복하고, 현실적이고 개방적인 환경에서 자율 에이전트의 개발 및 평가를 위한 **SIMWORLD** 시뮬레이터를 제시합니다. 에이전트가 복잡한 물리적, 사회적 세계에서 생존하고 번성할 수 있도록 대규모 상호작용, 추론, 훈련 및 평가를 지원하는 것을 목표로 합니다.

## 핵심 방법론
SIMWORLD는 **Unreal Engine 5** 를 기반으로 한 3계층 아키텍처를 채택하여, 사실적인 물리 및 사회 역학과 언어 기반의 절차적 환경 생성 기능을 제공합니다. 에이전트는 다중 모달 월드 입력(시각, Scene Graph, GPS)과 개방형 어휘 액션(고수준 의미론적 액션, 저수준 원시 액션)을 통해 환경과 상호작용하며, **액션 플래너** 는 고수준 명령을 저수준 액션 시퀀스로 변환합니다. 또한, **Text-to-3D 에셋 생성** 및 **LLM 기반 Scene Editing** 을 통해 환경의 개방성과 확장성을 극대화합니다.

## 주요 결과
**SIMWORLD** 는 **GPT-4o, Gemini-2.5-Flash, Claude-3.5, DeepSeek-Prover-V2** 등 최신 LLM 에이전트들을 활용한 다중 에이전트 배달 작업 시나리오에서 성능을 입증했습니다. **DeepSeek-V3** 와 **Claude-3.5-Sonnet** 은 평균적으로 가장 높은 수익을 달성했으며, Claude-3.5-Sonnet은 평균 성공 주문 **2.733 ± 1.102** 건과 에너지 효율성 **0.5411 ± 0.1981** 로 우수한 성과를 보였습니다. **GPT-4o-mini** 는 모든 지표에서 **0.000 ± 0.000** 의 결과를 보여 과제 이해도 부족을 시사했으며, 환경 구성과 에이전트 페르소나(예: **성실성, 쾌활성** )가 전략적 행동에 크게 영향을 미침을 확인했습니다.

## AI 실무자를 위한 시사점
**SIMWORLD** 는 LLM/VLM 기반 에이전트가 복잡한 물리적, 사회적 환경에서 학습하고 상호작용할 수 있는 현실적이고 확장 가능한 플랫폼을 제공합니다. 특히 **계층적 액션 공간** 과 **다중 모달 관측 기능** 은 장기적인 추론과 의사결정 능력을 갖춘 에이전트 개발에 유용합니다. 또한 **절차적 환경 생성** 및 **LLM 기반 Scene Editing** 기능은 다양한 시뮬레이션 시나리오를 효율적으로 구축할 수 있게 하여, AI 개발자가 실제 세계의 복잡성을 모방하는 데 필요한 시간과 노력을 크게 줄일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.