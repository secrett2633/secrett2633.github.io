---
title: "[논문리뷰] STAPO: Stabilizing Reinforcement Learning for LLMs by Silencing Rare Spurious Tokens"
excerpt: "Zhilong Zheng이 [arXiv]에 게시한 'STAPO: Stabilizing Reinforcement Learning for LLMs by Silencing Rare Spurious Tokens' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Training Stability
  - Policy Optimization
  - Spurious Tokens
  - Entropy Regularization
  - Gradient Modulation

permalink: /ai/review/2026-02-18-STAPO-Stabilizing-Reinforcement-Learning-for-LLMs-by-Silencing-Rare-Spurious-Tokens/

toc: true
toc_sticky: true

date: 2026-02-18 00:00:00+0900+0900
last_modified_at: 2026-02-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.15620)

**저자:** Shiqi Liu, Zeyu He, Guojian Zhan, Letian Tao, Zhilong Zheng



## 핵심 연구 목표
대규모 언어 모델(LLM)의 강화 학습(RL) 미세 조정 과정에서 발생하는 훈련 불안정성, 특히 후반부 성능 저하 문제를 해결하는 것을 목표로 합니다. 기존 RL 미세 조정 방식이 엔트로피 정규화나 가중치 재조정과 같은 휴리스틱에 의존하여 불안정한 훈련을 겪는 근본적인 원인을 밝히고 이를 개선하고자 합니다.

## 핵심 방법론
토큰별 정책 기울기의 크기가 토큰 확률 및 로컬 정책 엔트로피와 음의 상관관계가 있음을 이론적으로 도출했습니다. 이를 바탕으로, 낮은 확률, 낮은 엔트로피, 양의 이점(advantage)을 가진 **"스퓨리어스 토큰(spurious tokens)"** 이 비정상적으로 증폭된 기울기 업데이트를 유발하여 훈련 불안정성을 초래함을 식별했습니다. 제안하는 **Spurious-Token-Aware Policy Optimization (STAPO)** 은 이러한 스퓨리어스 토큰(약 **0.01%** )의 기울기 기여를 선택적으로 마스킹하고 유효 토큰에 대해 손실을 재정규화하는 **Silencing Spurious Tokens (S2T) 메커니즘** 을 사용합니다.

## 주요 결과
**Qwen 1.7B, 8B, 14B** 기본 모델을 사용한 6가지 수학적 추론 벤치마크에서 **STAPO** 는 탁월한 엔트로피 안정성을 일관되게 보여주었습니다. **GRPO, 20-Entropy, JustRL** 대비 평균 **7.13%** 의 성능 향상을 달성했으며, 특히 **1.7B 모델** 에서는 **20-Entropy** 보다 평균 정확도에서 **13.50%** 상대적 개선을 보였습니다.

## AI 실무자를 위한 시사점
LLM의 RL 훈련 시 발생하는 불안정성의 미시적 원인(스퓨리어스 토큰)을 규명하고, 이를 효과적으로 완화하는 실용적인 방법론을 제시합니다. **STAPO** 는 최소한의 개입( **0.01%** 의 토큰 마스킹)으로 LLM의 추론 성능과 훈련 안정성을 크게 향상시켜, 복잡한 휴리스틱 정규화 기술에 대한 의존도를 줄일 수 있습니다. 이는 안정적이고 신뢰할 수 있는 LLM 개발에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.