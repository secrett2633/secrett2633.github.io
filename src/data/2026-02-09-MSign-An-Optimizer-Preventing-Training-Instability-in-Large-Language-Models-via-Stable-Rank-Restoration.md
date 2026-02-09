---
title: "[논문리뷰] MSign: An Optimizer Preventing Training Instability in Large Language Models via Stable Rank Restoration"
excerpt: "이 [arXiv]에 게시한 'MSign: An Optimizer Preventing Training Instability in Large Language Models via Stable Rank Restoration' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Training Stability
  - Gradient Explosion
  - Stable Rank
  - Jacobian Alignment
  - Matrix Sign Operation
  - Optimizer
  - Transformer

permalink: /ai/review/2026-02-09-MSign-An-Optimizer-Preventing-Training-Instability-in-Large-Language-Models-via-Stable-Rank-Restoration/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.01734)

**저자:** Lianhai Ren, Yucheng Ding, Xiao Liu, Qianxiao Li, Peng Cheng, Yeyun Gong



## 핵심 연구 목표
대규모 언어 모델(LLM) 사전 학습 중 발생하는 갑작스러운 **그레디언트 폭발** 과 같은 훈련 불안정성 문제를 해결하는 것을 목표로 합니다. 특히, 이러한 불안정성의 근본적인 메커니즘을 규명하고 이를 효과적으로 방지하는 새로운 최적화 기법을 제안합니다.

## 핵심 방법론
훈련 실패 직전의 두 가지 현상인 **가중치 행렬의 Stable Rank 급락** 과 **인접 계층 Jacobian 간의 정렬 증가** 를 식별했습니다. 이를 기반으로, 주기적으로 **행렬 Sign Operation** (`sign(W) = UV^T`)을 적용하여 Stable Rank를 복원하는 **MSign 최적화 기법** 을 제안합니다. 이 연산은 비제로 특이값을 1로 균등화하며, 기존 **Frobenius Norm** 을 유지하도록 재조정하여 **P 스텝(일반적으로 P=100)** 마다 특정 **투영 가중치** 에 적용됩니다.

## 주요 결과
**5M에서 3B 파라미터** 에 이르는 다양한 모델(NanoGPT-5M, Sigma-40M, LLaMA-1B, LLaMA-MoE-3B)에서 **MSign** 이 훈련 불안정성을 효과적으로 방지함을 입증했습니다. 기존 AdamW 기반 훈련이 그레디언트 폭발로 실패한 반면, **MSign** 은 안정적인 수렴을 보였으며, 측정된 **계산 오버헤드는 7.0% 미만(4.6-6.7%)** 으로 낮게 유지되었습니다. 특히, **어텐션 레이어** 에 **MSign** 을 적용하는 것이 훈련 실패 방지에 필수적임을 확인했습니다.

## AI 실무자를 위한 시사점
**MSign** 은 LLM 훈련 시 발생하는 빈번하고 값비싼 그레디언트 폭발로 인한 재시작을 줄여 **계산 자원 낭비를 크게 줄일 수 있는 실용적인 솔루션** 을 제공합니다. Stable Rank와 Jacobian 정렬이 훈련 불안정성에 미치는 영향에 대한 이해는 향후 **LLM 아키텍처 및 최적화 기법 설계** 에 중요한 통찰력을 제공합니다. 낮은 오버헤드 덕분에 현재의 훈련 파이프라인에 쉽게 통합할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.