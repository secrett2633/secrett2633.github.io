---
title: "[논문리뷰] Low-probability Tokens Sustain Exploration in Reinforcement Learning
  with Verifiable Reward"
excerpt: "이 [arXiv]에 게시한 'Low-probability Tokens Sustain Exploration in Reinforcement Learning
  with Verifiable Reward' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Exploration
  - Verifiable Reward
  - Low-Probability Regularization
  - Reasoning Sparks
  - Policy Entropy
  - KL Divergence
  - Mathematical Reasoning

permalink: /ai/review/2025-10-10-Low-probability-Tokens-Sustain-Exploration-in-Reinforcement-Learning-with-Verifiable-Reward/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03222)

**저자:** Guanhua Huang, Tingqiang Xu, Mingze Wang, Qi Yi, Xue Gong, Siheng Li, Ruibin Xiong, Kejiao Li, Yuhao Jiang, Bo Zhou



## 핵심 연구 목표
본 논문은 **Verifiable Reward를 사용하는 RL(RLVR)** 환경에서 Large Language Model(LLM)의 탐색 능력 저하, 즉 '탐색 붕괴' 문제를 해결하는 것을 목표로 합니다. 특히, 가치 있는 저확률 탐색 토큰인 " **Reasoning Sparks** "가 훈련 중 소멸되어 성능 정체 및 하락으로 이어지는 현상을 방지하고자 합니다.

## 핵심 방법론
저자들은 **Low-probability Regularization (Lp-Reg)** 방법을 제안합니다. 이 방법은 현재 정책 분포( **π_θ** )에서 노이즈로 추정되는 저확률 토큰을 **확률 임계값 (τ)** (동적인 **min-p threshold** 사용)으로 필터링하여 **덜 노이즈한 프록시 분포 (π_proxy)** 를 구축합니다. 이 프록시 분포는 Reasoning Sparks의 확률을 증폭시킨 후, **forward KL divergence (DKL(π_proxy || π_θ))** 를 사용하여 정책을 정규화함으로써 해당 토큰들이 소멸되지 않도록 보호합니다. 이 과정은 **GRPO(Group-Relative Policy Optimization)** 프레임워크 내에서 구현됩니다.

## 주요 결과
**Lp-Reg** 는 기존 엔트로피 제어 방법론이 붕괴하는 **약 1,000 스텝** 동안 안정적인 온-정책 훈련을 가능하게 했습니다. 다섯 가지 수학 벤치마크에서 **Qwen3-14B-Base 모델** 기준으로 **평균 60.17%** 의 정확도를 달성하여 기존 방법 대비 **2.66%** 향상된 최첨단 성능을 기록했습니다. 이는 가치 있는 저확률 탐색 토큰을 효과적으로 보존했음을 입증합니다.

## AI 실무자를 위한 시사점
**Lp-Reg** 는 LLM의 RL 파인튜닝 시 **탐색 붕괴** 문제를 해결하는 효과적인 방법을 제공합니다. 특히 복잡한 추론 태스크에서 **가치 있는 저확률 탐색 토큰** 의 중요성을 인식하고 이를 보호함으로써, AI/ML 엔지니어는 더욱 안정적이고 고성능의 **추론 모델** 을 개발할 수 있습니다. 이는 기존 엔트로피 기반 탐색 방식의 한계를 극복하고 **품질 중심의 탐색 전략** 으로 전환하는 데 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.