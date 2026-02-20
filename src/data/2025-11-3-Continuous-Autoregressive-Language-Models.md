---
title: "[논문리뷰] Continuous Autoregressive Language Models"
excerpt: "arXiv에 게시된 'Continuous Autoregressive Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Continuous Representation
  - Autoencoder
  - Likelihood-Free Modeling
  - Energy-Based Models
  - Next-Vector Prediction
  - Computational Efficiency
  - Temperature Sampling

permalink: /ai/review/2025-11-3-Continuous-Autoregressive-Language-Models/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.27688)

**저자:** Chenze Shao, Darren Li, Fandong Meng, Jie Zhou



## 핵심 연구 목표
Large Language Models (LLMs)의 비효율적인 순차적, 토큰 단위 생성 과정의 근본적인 한계를 극복하는 것이 목표입니다. 본 연구는 이산 토큰 예측에서 **연속 벡터 예측** 으로 패러다임을 전환하여, 각 생성 단계의 **의미론적 대역폭을 증가** 시킴으로써 LLM의 스케일링 및 계산 효율성을 향상시키고자 합니다.

## 핵심 방법론
논문은 **CALM(Continuous Autoregressive Language Models)** 프레임워크를 도입하여, K개의 이산 토큰 덩어리를 단일 연속 벡터로 압축하는 **고정밀 오토인코더** 를 구축했습니다. 이 오토인코더는 **Variational Regularization** 과 **Dropout** 을 통해 견고한 벡터 표현을 학습하며, 예측 불가능한 우도를 다루기 위해 **Energy Transformer** 기반의 **likelihood-free 프레임워크** 를 개발하여 단일 단계 연속 벡터 생성을 가능하게 합니다. 또한, 우도가 필요 없는 새로운 평가 지표인 **BrierLM** 과 **likelihood-free 온도 샘플링** 알고리즘을 제안합니다.

## 주요 결과
**K=4 토큰** 을 그룹화한 CALM-M 모델은 281M 파라미터의 Transformer-S 베이스라인과 유사한 BrierLM 점수를 달성하면서도, **학습 FLOPs는 44% 감소** 하고 **추론 FLOPs는 34% 감소** 하는 우수한 성능-연산 트레이드오프를 보여주었습니다. 이는 각 생성 단계의 정보 용량을 확장하는 것이 LLM의 계산 효율성을 높이는 강력한 수단임을 확인하며, 특히 **K=4에서 최적의 성능** 을 보였습니다.

## AI 실무자를 위한 시사점
CALM은 LLM의 **추론 효율성을 획기적으로 개선** 할 수 있는 새로운 접근 방식을 제시하여, 장문 텍스트 생성이나 대규모 컨텍스트 처리 시 발생하는 **계산 병목 현상을 완화** 할 수 있습니다. **연속 벡터 표현** 을 사용함으로써 이산 토큰 모델의 어휘 크기 제약을 벗어나 **정보 밀도를 유연하게 확장** 할 수 있는 가능성을 열었습니다. 이는 **에너지 기반 모델** 및 **likelihood-free 평가/샘플링 기법** 이 새로운 LLM 패러다임에서 중요한 도구가 될 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.