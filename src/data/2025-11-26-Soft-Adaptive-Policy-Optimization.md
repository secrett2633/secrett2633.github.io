---
title: "[논문리뷰] Soft Adaptive Policy Optimization"
excerpt: "이 [arXiv]에 게시한 'Soft Adaptive Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Policy Optimization
  - Importance Ratios
  - Soft Clipping
  - Trust Region
  - Mixture-of-Experts
  - Asymmetric Temperature

permalink: /ai/review/2025-11-26-Soft-Adaptive-Policy-Optimization/

toc: true
toc_sticky: true

date: 2025-11-26 00:00:00+0900+0900
last_modified_at: 2025-11-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20347)

**저자:** Chang Gao*, Chujie Zheng, Bowen Yu*, An Yang*, Xiong-Hui Chen, Shuai Bai, Kai Dang, Jingren Zhou, Shixuan Liu, Junyang Lin



## 핵심 연구 목표
본 논문은 LLM(Large Language Models)의 RL(Reinforcement Learning) 학습 과정에서 발생하는 **높은 분산의 토큰 레벨 중요도 비율** 문제와, MoE(Mixture-of-Experts) 모델에서 증폭되는 이러한 현상으로 인한 불안정한 정책 업데이트 문제를 해결하고자 합니다. 기존 **GSPO** 및 **GRPO** 와 같은 하드 클리핑 방식의 한계를 극복하여, 안정성과 효율적인 학습을 동시에 유지하는 최적화 전략을 제안하는 것이 목표입니다.

## 핵심 방법론
본 논문은 하드 클리핑 대신 **온도 제어 방식의 부드러운 소프트 게이트** 를 사용하는 **Soft Adaptive Policy Optimization (SAPO)** 를 제안합니다. SAPO는 중요도 비율의 **유계 시그모이드 형태 함수** 를 통해 토큰 레벨 업데이트에 가중치를 부여하며, 이는 **연속적인 신뢰 영역** 을 형성합니다. 특히, 긍정적인 토큰과 부정적인 토큰에 대해 **비대칭 온도(Tpos, Tneg)** 를 사용하여, 불안정성을 유발하기 쉬운 부정적인 토큰의 경사도가 더 빠르게 감소하도록 설계하여 안정성을 높였습니다.

## 주요 결과
SAPO는 수학적 추론 벤치마크(AIME25, HMMT25, BeyondAIME)에서 **GSPO** 및 **GRPO-R2** 대비 **향상된 학습 안정성** 과 **더 높은 Pass@1 성능** 을 달성했습니다. 특히, `Tneg > Tpos`(예: `Tneg = 1.05`, `Tpos = 1.0`) 설정을 통해 가장 안정적인 학습 동역학을 보였으며, 이는 조기 학습 붕괴 가능성을 크게 줄였습니다. 또한, **Qwen3-VL 모델 시리즈** 훈련에서 다양한 작업 및 모델 크기에 걸쳐 일관된 성능 향상을 입증했습니다.

## AI 실무자를 위한 시사점
SAPO는 LLM, 특히 **MoE 아키텍처** 를 사용하는 LLM의 RL 미세 조정 시 발생하는 불안정성을 효과적으로 완화하는 **더욱 신뢰할 수 있고 효율적인 전략** 을 제공합니다. 이는 기존의 하드 클리핑 방식이 초래하는 취약성을 개선하여 학습 과정을 더욱 견고하게 만듭니다. **비대칭 온도 설계** 는 대규모 어휘 공간과 조기 모델 붕괴 방지에 중요한 실용적인 통찰력을 제공하여, 실제 AI/ML 시스템 개발에 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.