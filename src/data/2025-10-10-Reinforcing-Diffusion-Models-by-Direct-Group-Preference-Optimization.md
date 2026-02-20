---
title: "[논문리뷰] Reinforcing Diffusion Models by Direct Group Preference Optimization"
excerpt: "Jing Tang이 arXiv에 게시한 'Reinforcing Diffusion Models by Direct Group Preference Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Reinforcement Learning
  - Preference Optimization
  - Group Preference
  - Direct Preference Optimization
  - ODE Samplers
  - Efficient Training

permalink: /ai/review/2025-10-10-Reinforcing-Diffusion-Models-by-Direct-Group-Preference-Optimization/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08425)

**저자:** Yihong Luo, Tianyang Hu, Jing Tang



## 핵심 연구 목표
본 논문은 효율적인 **확산 모델** 을 **그룹 상대 선호도** 에 기반하여 정렬하는 과정에서 발생하는 핵심적인 문제를 해결합니다. 기존 **GRPO(Group Relative Policy Optimization)** 와 같은 강화 학습 방법론은 확률적 정책을 요구하지만, 확산 모델의 가장 효율적인 샘플러는 **결정론적 ODE(Ordinary Differential Equation)** 에 기반하여 불일치가 발생합니다. 이로 인해 비효율적인 **SDE(Stochastic Differential Equation)** 샘플러를 사용하거나 느린 수렴 문제가 발생하는데, 이러한 한계를 극복하는 것이 본 연구의 목표입니다.

## 핵심 방법론
저자들은 정책 경사 프레임워크를 완전히 우회하는 새로운 온라인 RL 알고리즘인 **DGPO(Direct Group Preference Optimization)** 를 제안합니다. **DGPO** 는 각 프롬프트에 대해 **효율적인 ODE 기반 롤아웃** 을 사용하여 **G개의 샘플** 을 생성하고, 이를 보상에 따라 긍정/부정 그룹으로 나눕니다. 모델은 그룹 수준의 선호도를 최대화하는 방향으로 직접 최적화되며, **Bradley-Terry 모델** 과 **advantage 기반 가중치 설계** 를 통해 intractable한 partition 함수를 제거합니다. 또한, 생성된 샘플의 낮은 품질로 인한 과적합을 방지하기 위해 **Timestep Clip Strategy** 를 도입합니다.

## 주요 결과
**DGPO** 는 **GenEval 벤치마크** 에서 **Flow-GRPO** 대비 약 **30배 더 빠른 훈련 속도** 를 달성했으며, 전체적으로 기존 SOTA 방법론보다 **20배 빠른 훈련 시간** 을 기록했습니다. **GenEval 스코어** 를 기준 모델의 **0.63에서 0.97** 로 크게 향상시켰으며 ( **Flow-GRPO** 는 0.95), **Aesthetic Score, DeQA, ImageReward, UnifiedReward** 와 같은 out-of-domain 지표에서도 강력한 성능을 유지했습니다. **Timestep Clip Strategy** 는 OCR Accuracy를 **0.96에서 0.95** 로 향상시키는 데 기여하며, **ODE 롤아웃** 이 **SDE 롤아웃** 보다 수렴 속도와 최종 메트릭에서 우수함을 입증했습니다.

## AI 실무자를 위한 시사점
**DGPO** 는 확산 모델의 사후 훈련(post-training)에 있어 **혁신적인 효율성** 을 제공합니다. 특히 **20~30배 빠른 훈련 속도** 는 AI 실무자들이 고품질의 확산 모델을 개발하고 반복하는 데 드는 시간과 비용을 획기적으로 줄일 수 있음을 의미합니다. 또한, 비효율적인 확률적 정책에 의존하지 않고 **효율적인 결정론적 ODE 샘플러** 를 직접 활용할 수 있게 함으로써, **사람의 선호도** 에 더욱 정확하게 정렬된 생성 모델을 만들 수 있는 실용적인 방법론을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.