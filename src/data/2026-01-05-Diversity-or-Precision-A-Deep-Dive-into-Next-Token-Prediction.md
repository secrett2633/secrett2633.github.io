---
title: "[논문리뷰] Diversity or Precision? A Deep Dive into Next Token Prediction"
excerpt: "arXiv에 게시된 'Diversity or Precision? A Deep Dive into Next Token Prediction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Next Token Prediction
  - Reinforcement Learning
  - Large Language Models
  - Reward Shaping
  - Pre-training Objective
  - Policy Gradient
  - Exploration-Exploitation

permalink: /ai/review/2026-01-05-Diversity-or-Precision-A-Deep-Dive-into-Next-Token-Prediction/

toc: true
toc_sticky: true

date: 2026-01-05 00:00:00+0900+0900
last_modified_at: 2026-01-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.22955)

**저자:** Haoyuan Wu1,2, Hai Wang1,†, Jiajia Wu¹, Jinxiang Ou¹, Keyao Wang¹, Weile Chen¹, Zihao Zheng¹, Bei Yu²



## 핵심 연구 목표
본 연구는 LLM의 사전 훈련된 토큰 출력 분포가 후속 **강화 학습(RL)** 을 위한 탐색 공간에 미치는 영향을 체계적으로 조사하는 것을 목표로 합니다. 특히, **다음 토큰 예측** 을 확률적 결정 과정으로 재해석하여 다양성과 정밀도 간의 균형이 전체적인 추론 성능에 어떻게 영향을 미치는지 밝히고자 합니다.

## 핵심 방법론
논문은 다음 토큰 예측을 위한 **일반화된 사전 훈련 목표 함수** 를 제안합니다. 이는 **보상 형성(reward shaping) 전략** 을 통합하여 다양성과 정밀도 간의 균형을 명시적으로 조절합니다. 구체적으로, **긍정적 보상 스케일링 계수 (β)** 를 통해 정답 토큰에 대한 확률 집중도를 제어하고, **순위 인식 메커니즘 (λ, κ)** 을 도입하여 높은 순위와 낮은 순위의 부정적 토큰을 비대칭적으로 처리함으로써 토큰 출력 분포를 재구성합니다.

## 주요 결과
기존의 통념과 달리, **정밀도 지향적인 사전 훈련 (β < 0)** 이 RL에 더 우수한 탐색 공간을 제공하고 최종 추론 성능을 향상시킨다는 것을 발견했습니다. 특히, **4B dense** 및 **10B-A0.5B MoE** 모델에서 **전역적으로 낮은 엔트로피 설정 (β = -0.25)** 이 **Avg@128, Cons@128, Pass@64** 와 같은 모든 평가 지표에서 일관되게 우수한 성능을 보였습니다. perplexity (PPL)는 모든 설정에서 유사하게 낮은 값으로 수렴하여 보상 형성 전략이 예측 정확도를 저해하지 않음을 입증했습니다.

## AI 실무자를 위한 시사점
LLM 사전 훈련 시, 무작정 높은 엔트로피를 추구하기보다는 **정밀도 지향적(낮은 엔트로피) 토큰 분포** 를 유도하는 것이 후속 RL 단계 및 장기 CoT 추론 능력 향상에 더 효과적임을 시사합니다. **보상 스케일링** 및 **순위 인식 부정 토큰 억제** 와 같은 **보상 형성 전략** 을 활용하여 특정 RL 목표에 최적화된 사전 훈련 모델을 개발할 수 있습니다. 이는 AI 엔지니어가 모델의 탐색-활용 균형을 정교하게 제어할 수 있는 실질적인 가이드를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.