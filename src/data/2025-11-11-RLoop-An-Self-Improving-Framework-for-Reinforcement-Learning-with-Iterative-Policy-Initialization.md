---
title: "[논문리뷰] RLoop: An Self-Improving Framework for Reinforcement Learning with   Iterative Policy Initialization"
excerpt: "Wenhao Huang이 [arXiv]에 게시한 'RLoop: An Self-Improving Framework for Reinforcement Learning with   Iterative Policy Initialization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLMs
  - Generalization
  - Overfitting
  - Catastrophic Forgetting
  - Iterative Policy Optimization
  - Policy Diversity

permalink: /ai/review/2025-11-11-RLoop-An-Self-Improving-Framework-for-Reinforcement-Learning-with-Iterative-Policy-Initialization/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.04285)

**저자:** Zhiyuan Zeng, Jiashuo Liu, Zhangyue Yin, Ge Zhang, Wenhao Huang, Xipeng Qiu



## 핵심 연구 목표
대규모 추론 모델을 위한 **검증 가능한 보상 강화 학습 (RLVR)** 에서 발생하는 "RL 오버피팅" 문제를 해결하는 것이 목표입니다. 이 오버피팅은 훈련 보상은 증가하지만 일반화 성능이 저하되는 현상으로, 정책의 과도한 전문화와 훈련 과정 중 다양한 솔루션의 **catastrophic forgetting** 에 의해 발생합니다.

## 핵심 방법론
본 논문은 **RLoop** 라는 자체 개선 프레임워크를 제안합니다. 이는 표준 RL 훈련 과정을 반복적인 정책 초기화를 통한 선순환 구조로 전환합니다. 각 반복은 **탐색 단계 (RL)** 와 **활용 단계 (RFT)** 로 구성됩니다. 탐색 단계에서는 표준 RL을 사용하여 다양한 솔루션 궤적 풀을 생성하고, 활용 단계에서는 성공적인 궤적을 필터링하여 "전문가" 데이터셋을 구축합니다. 이 데이터셋은 **Rejection-sampling Fine-Tuning (RFT)** 을 통해 초기 정책을 개선하고 다음 반복을 위한 더 나은 시작점을 제공합니다. 또한, 활성 학습 전략을 적용하여 모델이 "어려운" 문제에 집중하도록 합니다.

## 주요 결과
**RLoop** 는 AIME 2024, MinervaMath, OmniMath, MATH 등 도전적인 수학 추론 벤치마크에서 **바닐라 RL 대비 평균 정확도 9% 및 pass@32 점수 15% 이상 향상** 이라는 중요한 성능 개선을 달성했습니다. **RLoop** 는 **catastrophic forgetting** 을 효과적으로 완화하고(이전 반복 간 망각율이 현저히 낮음), 더 높은 **궤적 다양성** 을 촉진하며(일관적으로 낮은 N-gram 유사성), RL 훈련의 불안정성을 줄여 **gradient norm** 을 안정적으로 유지함을 보였습니다.

## AI 실무자를 위한 시사점
**RLoop** 는 LLM의 RL 파인튜닝 시 고질적인 문제인 **오버피팅** 과 **catastrophic forgetting** 을 효과적으로 해결하는 실용적인 방법론을 제시합니다. 특히 **pass@k metrics** 의 향상은 모델이 더 다양하고 견고한 솔루션을 생성할 수 있음을 의미하므로, 복잡한 추론 및 문제 해결 능력이 요구되는 AI 애플리케이션 개발에 유용합니다. 이 프레임워크는 RL 훈련의 **안정성** 을 크게 높여, 대규모 모델의 장기적인 성능 개선 및 일반화 능력 향상에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.