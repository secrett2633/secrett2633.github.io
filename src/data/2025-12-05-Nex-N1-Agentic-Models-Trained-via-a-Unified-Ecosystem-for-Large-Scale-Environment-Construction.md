---
title: "[논문리뷰] Nex-N1: Agentic Models Trained via a Unified Ecosystem for Large-Scale Environment Construction"
excerpt: "이 [arXiv]에 게시한 'Nex-N1: Agentic Models Trained via a Unified Ecosystem for Large-Scale Environment Construction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Models
  - Large Language Models (LLMs)
  - Agentic Scaling
  - Environment Construction
  - NexAU
  - NexA4A
  - NexGAP
  - Interactive Environments

permalink: /ai/review/2025-12-05-Nex-N1-Agentic-Models-Trained-via-a-Unified-Ecosystem-for-Large-Scale-Environment-Construction/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04987)

**저자:** Tao Gui, Yining Zheng, Xinchi Chen, Jie Zhou, et al. (Nex-AGI Team)



## 핵심 연구 목표
본 논문은 **LLM이 수동적 응답자에서 자율 에이전트로 발전** 하는 데 필요한 확장 가능한 고품질 상호작용 신호 인프라의 부족 문제를 해결하고자 합니다. 특히, 기존 학습 패러다임이 가진 정적 모방의 한계를 극복하고 **동적이고 복잡한 상호작용 환경을 체계적으로 확장** 하여 효율적인 정책 학습을 가능하게 하는 종합적인 방법을 제시하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 세 가지 핵심 구성 요소로 이루어진 통합 시스템을 제안합니다. 첫째, **NexAU (Agent Universe)** 는 복잡한 에이전트 계층 구조를 지원하는 유연한 런타임 프레임워크로, 에이전트 정의와 실행을 분리하여 확장성을 확보합니다. 둘째, **NexA4A (Agent for Agent)** 는 자연어 사양으로부터 다양한 에이전트 아키텍처와 워크플로우를 자동으로 생성하여 환경의 다양성을 극대화합니다. 셋째, **NexGAP (General Agent-data Pipeline)** 은 실제 **MCP(Model Context Protocol) 도구** 와 정보 융합을 통합하여 시뮬레이션-현실 간극을 메우고, 대규모의 실제 기반 궤적(trajectory) 생성을 가능하게 합니다.

## 주요 결과
**Nex-N1 모델** 은 제안된 인프라를 통해 훈련되었으며, **SWE-bench** 및 **τ²** 와 같은 벤치마크에서 뛰어난 성능을 보였습니다. 특히, **τ²-bench** 에서 **88.1%** 를 달성하여 **GPT-5 (84.2%)** 를 능가했으며, **SWE-bench Verified** 에서는 **77.2%** 로 **Claude-Sonnet-4.5** 와 동등하고 **GPT-5 (74.9%)** 를 상회하는 경쟁력을 입증했습니다. 또한, 에이전트 코딩에 대한 인간 평가에서 **Claude-Sonnet-4.5** 대비 **64.5%** , **MiniMax-M2** 대비 **92.9%** 의 시나리오에서 승리하거나 동등한 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 AI 실무자들에게 **LLM 기반 에이전트 개발을 위한 확장 가능하고 견고한 인프라** 를 제공합니다. **NexAU, NexA4A, NexGAP** 프레임워크는 에이전트 환경 구축의 수동적 노력을 줄이고, **다양하고 현실적인 상호작용 데이터** 를 대규모로 생성할 수 있는 방법을 제시합니다. 이는 에이전트의 일반화 능력과 실세계 문제 해결 능력을 향상시키는 데 필수적이며, 공개된 **Nex 생태계와 모델 가중치** 는 후속 연구 및 응용 개발에 중요한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.