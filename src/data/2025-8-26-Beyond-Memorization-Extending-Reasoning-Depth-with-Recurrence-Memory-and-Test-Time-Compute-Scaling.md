---
title: "[논문리뷰] Beyond Memorization: Extending Reasoning Depth with Recurrence, Memory
  and Test-Time Compute Scaling"
excerpt: "Daniil Orel이 [arXiv]에 게시한 'Beyond Memorization: Extending Reasoning Depth with Recurrence, Memory
  and Test-Time Compute Scaling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reasoning Depth
  - Cellular Automata
  - Transformer Architectures
  - Recurrence
  - Adaptive Computation Time
  - Chain-of-Thought
  - Reinforcement Learning
  - Generalization

permalink: /ai/review/2025-8-26-Beyond-Memorization-Extending-Reasoning-Depth-with-Recurrence-Memory-and-Test-Time-Compute-Scaling/

toc: true
toc_sticky: true

date: 2025-08-26 13:21:57+0900
last_modified_at: 2025-08-26 13:21:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.16745)

**저자:** Ivan Rodkin, Daniil Orel, Konstantin Smirnov, Arman Bolatov, Bilal Elbouardi, Besher Hassan, Yuri Kuratov, Aydar Bulatov, Preslav Nakov, Timothy Baldwin, Artem Shelmanov, Mikhail Burtsev



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM)의 **다단계 추론 능력** 을 향상시키는 것을 목표로 합니다. 특히, 추론이 단순한 암기(memorization)가 아닌 **진정한 일반화(generalization)** 에서 비롯되는지, 그리고 모델 아키텍처, 훈련 목표, 추론 절차가 추론 능력에 미치는 영향을 **1차원 셀룰러 오토마타(1dCA)** 프레임워크 내에서 탐구합니다.

## 핵심 방법론
훈련 및 테스트 규칙이 분리된 **1dCA-Reasoning 벤치마크** 를 사용하여 모델의 **규칙 추상화 능력** 을 평가했습니다. 실험에는 **GPTNeox (Transformer)** , **LSTM** , **Mamba (State Space Model)** , **ARMT (Associative Recurrent Memory Transformer)** 와 같은 다양한 아키텍처가 사용되었습니다. 추론 깊이 확장을 위해 **Adaptive Computation Time (ACT)** , **GRPO (Reinforcement Learning)** , **Chain-of-Thought (CoT) 학습** 기법들을 적용하여 비교 분석했습니다.

## 주요 결과
고정 깊이(4-layer) 모델들은 **k=1** 단계 예측에서 높은 정확도를 보였으나, **k≥2** 에서는 성능이 급격히 저하되었습니다. **ARMT** 는 **k=2** 까지 일반화를 확장했으며, **ACT** 는 **약 1단계의 유효 깊이** 를 추가하여 GPTNeox의 **k=2** 성능을 개선했습니다. 중간 감독 없이 **GRPO** 로 훈련된 모델은 **k=3** 까지 추론 성능을 달성했으며, **토큰 수준 CoT 훈련** 은 **k=4** 까지 거의 완벽한 예측 정확도를 보였습니다.

## AI 실무자를 위한 시사점
LLM의 다단계 추론 능력 향상에는 **명시적인 중간 표현(CoT)** 과 **적응적 계산 시간(ACT)** 같은 메커니즘이 필수적임을 보여줍니다. 이는 **대규모 데이터셋** 에서 **사전 훈련된 모델** 을 활용하여 **전이학습** 시킬 때, 추론 깊이를 효율적으로 확장하기 위한 실용적인 접근법을 제시합니다. **GRPO** 와 같은 **RL 기반 훈련** 은 중간 단계 감독 없이도 추론 깊이를 심화시킬 수 있는 잠재력을 가지므로, 복잡한 문제 해결을 위한 모델 훈련 전략에 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.