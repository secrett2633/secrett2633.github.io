---
title: "[논문리뷰] Online Causal Kalman Filtering for Stable and Effective Policy Optimization"
excerpt: "이 [arXiv]에 게시한 'Online Causal Kalman Filtering for Stable and Effective Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - Large Language Models (LLMs)
  - Policy Optimization
  - Importance Sampling (IS) Ratio
  - Kalman Filter
  - Variance Reduction
  - Math Reasoning

permalink: /ai/review/2026-02-12-Online-Causal-Kalman-Filtering-for-Stable-and-Effective-Policy-Optimization/

toc: true
toc_sticky: true

date: 2026-02-12 00:00:00+0900+0900
last_modified_at: 2026-02-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.10609)

**저자:** Shuo He, Lang Feng, Xin Cheng, Lei Feng, Bo An



## 핵심 연구 목표
대규모 언어 모델(LLM)의 강화 학습(RL)에서 토큰 수준 중요도 샘플링(IS) 비율의 높은 분산이 정책 최적화의 불안정성을 야기하는 문제를 해결하고자 합니다. 기존 방법론들이 토큰 간의 시간적 비정책적 편차를 간과하여 정책 경사 업데이트를 왜곡하고 학습 실패로 이어질 수 있음을 식별하고, 이를 극복하여 안정적이고 효과적인 LLM 정책 최적화를 달성하는 것이 목표입니다.

## 핵심 방법론
이 논문은 `Online Causal Kalman Filtering for stable and effective Policy Optimization (KPO)`을 제안합니다. `KPO`는 원하는 IS 비율을 토큰 간에 진화하는 잠재 상태로 모델링하고, **Kalman 필터** 를 적용하여 과거 및 현재 토큰의 정보만을 사용하여 상태를 온라인으로 자기회귀적으로 업데이트합니다. 특히, IS 비율의 **로그 스페이스** 에서 필터링을 수행하고, **과정 노이즈(Q)** 및 **관측 노이즈(V)** 파라미터를 통해 평활화 강도를 조절합니다.

## 주요 결과
**KPO** 는 **Qwen3-4B** 모델을 사용하여 6개의 수학 추론 벤치마크에서 기존 최신 방법론(GRPO, GMPO, GSPO) 대비 **일관되게 우수한 성능** 을 달성했습니다. 예를 들어, **AIME'24** 벤치마크에서 **GSPO** 의 **avg@16 32.70%** 대비 **KPO-clipped** 는 **37.91%** 를 기록하며 크게 향상되었습니다. 또한 **Kalman 필터링** 을 통해 토큰의 `switch frequency`가 **0.43에서 0.01로** 대폭 감소하여, IS 비율의 국소적 구조적 일관성이 크게 개선되고 훈련 안정성이 향상됨을 입증했습니다.

## AI 실무자를 위한 시사점
**KPO** 는 LLM의 RL 학습에서 IS 비율 분산으로 인한 **훈련 불안정성 문제** 를 효과적으로 해결하는 실용적인 접근 방식을 제공합니다. 특히 **수학 추론과 같은 복잡한 멀티스텝 태스크** 에서 LLM의 성능과 안정성을 향상시킬 수 있으며, **Q/V 비율** 과 같은 **Kalman 필터 파라미터** 를 튜닝하여 다양한 도메인과 모델 특성(예: `MoE 모델` 사용)에 맞게 평활화 강도를 조절할 수 있습니다. 이는 복잡한 RL 환경에서 LLM을 성공적으로 훈련시키려는 AI 엔지니어들에게 중요한 도구가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.