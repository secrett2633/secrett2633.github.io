---
title: "[논문리뷰] Optimal Sparsity of Mixture-of-Experts Language Models for Reasoning
  Tasks"
excerpt: "Daisuke Nohara이 [arXiv]에 게시한 'Optimal Sparsity of Mixture-of-Experts Language Models for Reasoning
  Tasks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixture-of-Experts (MoE)
  - Sparsity
  - Scaling Laws
  - Reasoning Tasks
  - Memorization
  - Large Language Models
  - Generalization Gap
  - Top-k Routing

permalink: /ai/review/2025-8-27-Optimal-Sparsity-of-Mixture-of-Experts-Language-Models-for-Reasoning-Tasks/

toc: true
toc_sticky: true

date: 2025-08-27 13:22:18+0900
last_modified_at: 2025-08-27 13:22:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18672)

**저자:** Taishi Nakamura, Satoki Ishikawa, Masaki Kawamura, Takumi Okamoto, Daisuke Nohara, Taishi-N324



## 핵심 연구 목표
본 논문은 **MoE(Mixture-of-Experts)** 언어 모델에서 스파시티(sparsity)가 기억(memorization) 능력과 추론(reasoning) 능력에 미치는 영향을 규명하고, 고정된 연산 예산(compute budget) 내에서 태스크별 최적의 스파시티 구성을 찾는 것을 목표로 합니다. 특히 기존의 밀집(dense) 모델 스케일링 법칙이 간과하는 **MoE 스파시티**라는 새로운 차원을 탐구하고, 훈련-테스트 일반화 및 손실-정확도 간의 간극을 분석합니다.

## 핵심 방법론
저자들은 **총 파라미터 수**, **활성 파라미터 수**, 그리고 **top-k 라우팅**을 체계적으로 변화시키면서 **MoE Transformer** 모델군을 훈련했습니다. 모든 모델은 **고정된 연산 예산** 하에 훈련되었으며, **사전 훈련 손실**, **하류 태스크 손실**, 그리고 **정확도**를 기록했습니다. 기억 태스크(예: **TriviaQA**, **HellaSwag**)와 추론 태스크(예: **GSM8K**, **GSM-Plus**)에 대해 성능을 평가했으며, **GRPO(강화 학습)** 및 **테스트-시간 연산(Test-Time Compute)**, **학습률(learning rate)**과 같은 하이퍼파라미터의 영향도 함께 분석했습니다.

## 주요 결과
기억 태스크는 **총 파라미터 수**에 비례하여 단조롭게 성능이 향상되었지만, 추론 태스크는 **훈련 손실**이 특정 임계값 이하로 떨어지면 성능이 **포화되거나 오히려 감소하는 U자형 추세**를 보였습니다(그림 2). **GRPO**와 **테스트-시간 연산**은 전반적인 성능을 향상시켰지만, 지나치게 희소한 모델의 추론 능력 저하를 완전히 회복시키지는 못했습니다(그림 6). 또한, 고정된 FLOPs 예산에서 추론 태스크의 경우 **밀집 모델**이 **희소 모델**보다 더 나은 성능을 보이는 경향이 있었습니다(그림 5).

## AI 실무자를 위한 시사점
**MoE 모델**을 개발하는 AI 엔지니어는 목표 태스크의 특성(기억 vs. 추론)에 따라 **모델 스파시티**를 신중하게 조정해야 합니다. 추론 태스크의 경우, 단순한 **총 파라미터 수** 증가나 **훈련 손실** 감소가 반드시 성능 향상으로 이어지지 않으므로, **최적의 활성 파라미터 수**와 **밀집도**를 찾아야 합니다. **사전 훈련 후 적용되는 GRPO나 테스트-시간 연산**이 스파시티로 인한 추론 능력의 저하를 완전히 보완하지 못하므로, **사전 훈련 단계에서부터 최적의 MoE 아키텍처**를 설계하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.