---
title: "[논문리뷰] DenseGRPO: From Sparse to Dense Reward for Flow Matching Model Alignment"
excerpt: "arXiv에 게시된 'DenseGRPO: From Sparse to Dense Reward for Flow Matching Model Alignment' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Flow Matching Models
  - Dense Reward
  - Sparse Reward Problem
  - Preference Alignment
  - SDE Sampler
  - GRPO
  - Text-to-Image Generation

permalink: /ai/review/2026-02-02-DenseGRPO-From-Sparse-to-Dense-Reward-for-Flow-Matching-Model-Alignment/

toc: true
toc_sticky: true

date: 2026-02-02 00:00:00+0900+0900
last_modified_at: 2026-02-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.20218)

**저자:** Haoyou Deng, Keyu Yan, Chaojie Mao, Xiang Wang, Yu Liu, Changxin Gao, Nong Sang



## 핵심 연구 목표
본 논문은 **Flow Matching Model** 의 인간 선호도 정렬 과정에서 발생하는 **희소 보상(Sparse Reward) 문제** 를 해결하는 것을 목표로 합니다. 기존 **GRPO(Group Relative Policy Optimization)** 기반 접근법은 전체 디노이징 궤적의 최종 보상만을 사용하며, 이로 인해 전역 피드백과 중간 단계별 기여도 간의 불일치가 발생하여 정책 최적화를 저해합니다.

## 핵심 방법론
제안하는 **DenseGRPO** 는 각 디노이징 단계의 기여도를 평가하는 **밀집 보상(Dense Reward)** 을 도입합니다. 구체적으로, **ODE(Ordinary Differential Equation) 기반 접근 방식** 을 사용하여 중간 **클린 이미지** 에 **보상 모델** 을 적용함으로써 각 디노이징 단계의 **단계별 보상 이득(step-wise reward gain)** 을 예측합니다. 또한, 기존 GRPO 기반 방법론의 **균일 탐색 설정** 과 **시간 가변 노이즈 강도** 간의 불일치를 해결하기 위해 **SDE 샘플러** 에 **보상 인식(reward-aware) 방식** 을 적용하여 **시간 단계별 확률적 노이즈 주입(`ψ(t)`)** 을 적응적으로 조정하여 탐색 공간을 보정합니다.

## 주요 결과
**DenseGRPO** 는 여러 표준 벤치마크(구성 이미지 생성, 시각적 텍스트 렌더링, 인간 선호도 정렬)에서 경쟁 모델들을 뛰어넘는 우수한 성능을 달성했습니다. 특히, 인간 선호도 정렬 태스크에서 **PickScore** 가 경쟁 모델 대비 최소 **1.01점** 이상 증가하여 괄목할 만한 성능 향상을 보였습니다. 이는 유효한 **밀집 보상** 이 **Flow Matching Model** 정렬에 핵심적인 역할을 함을 입증합니다.

## AI 실무자를 위한 시사점
**DenseGRPO** 는 생성 모델의 **인간 선호도 정렬** 을 위한 **RL 훈련** 에서 **밀집 보상** 의 중요성을 강조합니다. 이는 AI/ML 엔지니어들이 기존 **희소 보상 문제** 를 극복하고 모델의 각 생성 단계에 대한 더 정확하고 세분화된 피드백을 활용할 수 있게 합니다. 또한, **탐색 공간 보정 기법** 은 RL 훈련의 효율성과 안정성을 높여, 복잡한 생성 모델의 미세 조정을 더욱 효과적으로 수행할 수 있는 실용적인 가이드라인을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.