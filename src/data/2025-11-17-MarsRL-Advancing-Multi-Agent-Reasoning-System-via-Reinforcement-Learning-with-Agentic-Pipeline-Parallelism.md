---
title: "[논문리뷰] MarsRL: Advancing Multi-Agent Reasoning System via Reinforcement Learning with Agentic Pipeline Parallelism"
excerpt: "이 [arXiv]에 게시한 'MarsRL: Advancing Multi-Agent Reasoning System via Reinforcement Learning with Agentic Pipeline Parallelism' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent Systems
  - Reinforcement Learning
  - LLMs
  - Pipeline Parallelism
  - Reasoning
  - Reward Shaping
  - Agentic AI

permalink: /ai/review/2025-11-17-MarsRL-Advancing-Multi-Agent-Reasoning-System-via-Reinforcement-Learning-with-Agentic-Pipeline-Parallelism/

toc: true
toc_sticky: true

date: 2025-11-17 00:00:00+0900+0900
last_modified_at: 2025-11-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.11373)

**저자:** Shulin Liu, Dong Du, Tao Yang, Yang Li, Boyu Qiu



## 핵심 연구 목표
대규모 언어 모델(LLMs) 기반 멀티 에이전트 추론 시스템이 **보상 잡음(reward noise)** 과 **훈련 비효율성** 으로 인해 오픈 소스 모델에 일반화되기 어려운 문제를 해결하는 것이 목표입니다. Solver, Verifier, Corrector와 같은 시스템 내 모든 에이전트를 공동으로 최적화하여 추론 깊이를 심화하고 적용 가능성을 넓히고자 합니다.

## 핵심 방법론
본 연구는 **Agentic Pipeline Parallelism** 을 특징으로 하는 새로운 강화 학습 프레임워크인 MarsRL을 제안합니다. 각 에이전트의 역할에 따라 **개별화된 보상 메커니즘** 을 할당하여 보상 잡음을 완화하고, **파이프라인 훈련 방식** 을 통해 에이전트의 디코딩이 완료되는 즉시 출력을 훈련 큐에 추가하여 긴 궤적 처리의 효율성을 크게 높였습니다. 기존 **GRPO** 프레임워크와 **UloRL** 의 기술(Segment Rollouts, Dynamic Masking of MPTs)을 통합하여 모델의 성능을 향상시켰습니다.

## 주요 결과
MarsRL을 **Qwen3-30B-A3B-Thinking-2507** 모델에 적용한 결과, **AIME2025 정확도가 86.5%에서 93.3%로 향상** 되었으며, **BeyondAIME 성능은 64.9%에서 73.8%로 개선** 되었습니다. 특히 이 결과는 더 큰 모델인 Qwen3-235B-A22B-Thinking-2507의 성능(AIME2025: 92.3%, BeyondAIME: 70.6%)을 뛰어넘는 수치입니다. 또한, MarsRL로 훈련된 Verifier와 Corrector가 다양한 Solver에 효과적으로 일반화됨을 입증했습니다.

## AI 실무자를 위한 시사점
MarsRL은 복잡한 추론 작업을 수행하는 **멀티 에이전트 LLM 시스템의 훈련 효율성과 성능을 혁신적으로 개선** 할 수 있음을 보여줍니다. **에이전트별 보상 설계** 와 **파이프라인 기반 훈련** 접근 방식은 긴 추론 궤적을 다루는 데 있어 실용적인 해결책을 제시하며, 오픈 소스 LLM의 추론 능력을 강화하고 다양한 AI 응용 분야에 멀티 에이전트 시스템을 적용하는 데 중요한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.