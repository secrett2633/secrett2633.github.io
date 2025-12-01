---
title: "[논문리뷰] Reinforcement Learning on Pre-Training Data"
excerpt: "Evander Yang이 [arXiv]에 게시한 'Reinforcement Learning on Pre-Training Data' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Pre-training
  - Large Language Models
  - Self-supervised Learning
  - Scaling Laws
  - Next-segment Reasoning
  - Reward Modeling

permalink: /ai/review/2025-9-24-Reinforcement-Learning-on-Pre-Training-Data/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19249)

**저자:** Siheng Li, Kejiao Li, Zenan Xu, Guanhua Huang, Evander Yang



## 핵심 연구 목표
논문은 대규모 언어 모델(LLM)의 훈련 시 발생하는 컴퓨팅 자원의 기하급수적 증가와 고품질 텍스트 데이터의 유한한 성장 사이의 불균형 문제를 해결하고자 합니다. 인간의 어노테이션에 의존하지 않고 사전 훈련 데이터에서 직접 보상 신호를 도출하는 **RLPT(Reinforcement Learning on Pre-Training data)** 라는 새로운 훈련 시간 스케일링 패러다임을 제안하여 LLM의 역량과 일반화된 추론 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
**RLPT** 는 **다음 세그먼트 추론(next-segment reasoning)** 을 RL 목표로 사용하며, 정책이 선행 컨텍스트를 기반으로 후속 텍스트 세그먼트를 정확하게 예측하도록 보상합니다. 이를 위해 **ASR(Autoregressive Segment Reasoning)** 및 **MSR(Middle Segment Reasoning)** 두 가지 세그먼트 수준 훈련 목표를 도입하고, 예측된 세그먼트와 참조 세그먼트 간의 **의미론적 일관성(semantic consistency)** 을 평가하는 **생성형 보상 모델(generative reward model) Grm** 을 활용합니다. 특히 **Grm** 은 예측 세그먼트가 참조 콘텐츠의 유효한 접두사인지 확인하여 엄격한 단어 일치 대신 유연한 보상 구조를 제공합니다.

## 주요 결과
**Qwen3-4B-Base** 모델에 적용했을 때, **RLPT** 는 MMLU에서 **3.0%p** , MMLU-Pro에서 **5.1%p** , GPQA-Diamond에서 **8.1%p** , KOR-Bench에서 **6.0%p** , AIME24에서 **6.6%p** , AIME25에서 **5.3%p** 의 절대 성능 향상을 달성했습니다. 또한, **RLVR** 와 함께 사용될 경우 AIME24에서 **2.3%p** , AIME25에서 **1.3%p** 의 추가적인 Pass@1 성능 개선을 보였습니다. **RLPT** 의 성능은 훈련 토큰 수에 따라 **멱법칙(power-law decay)** 스케일링 특성을 따르며, 이는 지속적인 성능 향상 가능성을 시사합니다.

## AI 실무자를 위한 시사점
**RLPT** 는 대규모 **사전 훈련 데이터** 에서 **RL** 을 직접 적용할 수 있는 길을 열어, 기존 **RLHF** 나 **RLVR** 의 **인간 어노테이션 의존성** 이라는 주요 한계를 극복합니다. 이 방법론은 LLM이 더 깊은 추론 능력을 탐색하고 일반화 능력을 향상시키는 데 기여하며, 특히 **수학적 추론** 과 같은 복잡한 도메인에서 효과적임을 보여줍니다. **멱법칙 스케일링** 은 컴퓨팅 자원을 추가함에 따라 **RLPT** 의 성능이 지속적으로 개선될 수 있음을 의미하므로, AI 모델 개발자들에게 LLM의 잠재력을 최대한 활용할 수 있는 중요한 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.