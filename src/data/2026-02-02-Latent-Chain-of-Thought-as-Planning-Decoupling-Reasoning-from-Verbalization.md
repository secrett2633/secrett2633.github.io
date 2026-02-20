---
title: "[논문리뷰] Latent Chain-of-Thought as Planning: Decoupling Reasoning from Verbalization"
excerpt: "arXiv에 게시된 'Latent Chain-of-Thought as Planning: Decoupling Reasoning from Verbalization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Latent Reasoning
  - Chain-of-Thought (CoT)
  - Large Language Models (LLMs)
  - Planning
  - Reinforcement Learning
  - Mathematical Reasoning
  - Decoupling
  - Interpretability

permalink: /ai/review/2026-02-02-Latent-Chain-of-Thought-as-Planning-Decoupling-Reasoning-from-Verbalization/

toc: true
toc_sticky: true

date: 2026-02-02 00:00:00+0900+0900
last_modified_at: 2026-02-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.21358)

**저자:** Jiecong Wang, Hao Peng, Chunyang Liu



## 핵심 연구 목표
논문은 LLM의 **CoT(Chain-of-Thought) 추론** 이 가진 높은 연산 비용과 이산 토큰 샘플링으로 인한 추론 경로 붕괴 문제를 해결하고자 합니다. 궁극적으로 추론과 언어화 과정을 분리하여 연속적인 잠재 공간에서 계획(planning)으로 추론을 재구성함으로써, 동적 추론 종료와 향상된 추론 다양성을 가능하게 하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **PLaT (Planning with Latent Thoughts)** 프레임워크는 **Planner** 와 **Decoder** 로 구성됩니다. **Planner** 는 연속적인 매니폴드에서 잠재 계획 상태의 결정론적 궤적을 자가회귀적으로 발전시키며, **Decoder** 는 이러한 잠재 계획을 텍스트로 변환합니다. 효율적인 추론을 위해 **Lazy Decoding** 전략을 사용하여 동적 종료를 가능하게 하며, **Supervised Fine-Tuning (SFT)** 과 **Decoupled GRPO** 기반의 **Reinforcement Learning (RL)** 을 통해 모델을 학습시킵니다.

## 주요 결과
**PLaT** 는 기준선인 **Coconut** 및 **CODI** 에 비해 탐욕적 정확도는 낮지만, 추론 다양성에서 우수한 확장성을 보이며 **Pass@k** 지표에서 더 가파른 상승 곡선을 나타냅니다. 특히 **GSM8k Pass@128** 에서 **PLaT-2** 는 **74.2%** 를 달성하여 **Coconut (66.7%)** 와 **CODI (70.1%)** 를 능가했습니다. 또한, 명시적 **CoT (349.6ms)** 대비 추론 지연 시간을 **PLaT-1 (152.6ms)** 으로 약 **56%** 단축하여 상당한 효율성 향상을 입증했습니다.

## AI 실무자를 위한 시사점
**PLaT** 는 LLM의 추론 과정을 투명하고 동적으로 제어할 수 있는 잠재력을 제시하며, 이는 **시스템 2 추론 능력** 을 개선하려는 AI 엔지니어에게 중요합니다. 특히 **Tree-of-Thought** 또는 **rejection sampling** 과 같이 다양하고 탐색적인 추론 경로가 필요한 검색 기반 추론 알고리즘의 기반 기술로 활용될 수 있습니다. 현재 수학적 추론에 집중되어 있지만, **창의적 글쓰기, 상식 추론, 복잡한 코드 생성** 등 다양한 도메인으로의 확장 가능성이 높습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.