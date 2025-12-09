---
title: "[논문리뷰] Beyond Token-level Supervision: Unlocking the Potential of Decoding-based Regression via Reinforcement Learning"
excerpt: "Jiacheng Chen이 [arXiv]에 게시한 'Beyond Token-level Supervision: Unlocking the Potential of Decoding-based Regression via Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Decoding-based Regression
  - Reinforcement Learning
  - Numerical Prediction
  - Large Language Models
  - Policy Gradient
  - Tokenization
  - Sequence Generation

permalink: /ai/review/2025-12-09-Beyond-Token-level-Supervision-Unlocking-the-Potential-of-Decoding-based-Regression-via-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.06533)

**저자:** Ming Chen, Sheng Tang, Rong-Xi Tan, Ziniu Li, Jiacheng Chen, Ke Xue, Chao Qian



## 핵심 연구 목표
이 논문은 디코딩 기반 회귀 모델이 개별 토큰 수준의 목표(예: cross-entropy)와 연속적인 수치 값 사이의 불일치로 인해 겪는 한계를 해결하고자 합니다. 궁극적으로 **Reinforcement Learning (RL)** 을 활용하여 디코딩 기반 회귀의 잠재력을 최대한 발휘하고, 보다 정확하고 일반화 가능한 수치 예측 패러다임을 확립하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 디코딩 기반 회귀 프로세스를 **Markov Decision Process (MDP)** 로 재구성하고, **시퀀스-수준 보상 신호** 를 사용하여 모델을 최적화하는 **Generative Reinforced Regressor (GenRe²)** 를 제안합니다. 특히, **ReMax** 및 **GRPO** 와 같은 **REINFORCE-스타일 알고리즘** 을 통해 **cross-entropy(CE)로 사전 훈련된 모델** 을 미세 조정하며, 보상 함수는 **negative Mean Squared Error (MSE)** 와 같은 전체 시퀀스 기반의 거리 메트릭으로 정의됩니다.

## 주요 결과
**GenRe² (ReMax 및 GRPO 결합)** 는 **TALENT 벤치마크의 tabular regression** 과 **code metric regression** 을 포함한 다양한 실험에서 최첨단 토큰 수준 baseline 및 전통적인 회귀 헤드를 일관되게 능가했습니다. 특히, **GenRe²-ReMax** 는 TALENT 벤치마크에서 **RMSE, R², Rank Correlation** 등 모든 주요 메트릭에서 가장 우수한 성능을 보였으며, **R²의 평균 0.6459** 를 달성하여 토큰 수준 방식보다 크게 향상되었습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM을 활용한 수치 예측 시, 개별 토큰 손실 대신 **전체 예측 시퀀스의 수치 정확도를 직접적으로 보상** 하는 RL 기법이 모델 성능을 크게 향상시킬 수 있음을 입증합니다. AI/ML 엔지니어는 기존 디코딩 기반 회귀 모델의 **fine-tuning** 에 **ReMax** 또는 **GRPO** 와 같은 RL 알고리즘을 적용하여 예측 정밀도를 높일 수 있습니다. 하지만 RL이 출력 분포를 **과도하게 sharpen하여 불확실성 추정 능력에 영향을 미칠 수 있으므로** , 활용 시 이 점을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.