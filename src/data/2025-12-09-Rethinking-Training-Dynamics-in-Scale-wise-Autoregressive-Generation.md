---
title: "[논문리뷰] Rethinking Training Dynamics in Scale-wise Autoregressive Generation"
excerpt: "arXiv에 게시된 'Rethinking Training Dynamics in Scale-wise Autoregressive Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Generation
  - Visual Synthesis
  - Exposure Bias
  - Student Forcing
  - Self-Autoregressive Refinement
  - Scale-wise Prediction
  - Image Generation

permalink: /ai/review/2025-12-09-Rethinking-Training-Dynamics-in-Scale-wise-Autoregressive-Generation/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.06421)

**저자:** Gengze Zhou, Chongjian Ge, Hao Tan, Feng Liu, Yicong Hong



## 핵심 연구 목표
본 연구는 스케일별 자동회귀(AR) 생성 모델이 겪는 **(1) 훈련-추론 불일치(exposure bias)** 와 **(2) 스케일별 학습 난이도 불균형** 문제로 인해 저하되는 생성 품질을 해결하는 것을 목표로 합니다. 이러한 근본적인 한계를 극복하고 모델의 추론 시 동작을 훈련 과정에 반영하여 스케일별 AR 모델의 생성 품질을 향상시키고자 합니다.

## 핵심 방법론
제안된 **Self-Autoregressive Refinement (SAR)** 는 경량의 사후 훈련 알고리즘으로, **Stagger-Scale Rollout (SSR)** 과 **Contrastive Student-Forcing Loss (CSFL)** 두 가지 핵심 구성 요소를 포함합니다. **SSR** 은 최소한의 계산 오버헤드(단 한 번의 추가 NFE)로 모델의 자체 중간 예측에 노출시켜 훈련-추론 격차를 해소하며, **CSFL** 은 학생 강제 예측을 교사 강제 예측과 정렬하여 안정적인 훈련 감독을 제공합니다. 이 접근 방식은 사전 훈련된 AR 모델에 추가 **10 에포크** 동안 적용됩니다.

## 주요 결과
**SAR** 는 최소한의 추가 계산량(사전 훈련 비용의 약 **5.5%** )으로 생성 품질을 지속적으로 향상시킵니다. **ImageNet-256** 에서 **FlexVAR-d16** 모델에 적용 시 **10 에포크** 이내에 **5.2%의 FID 감소** 를 달성했습니다. 특히, 310M, 600M, 1B 파라미터 모델에서 각각 **5.2%, 2.5%, 3.1%의 FID 감소** 를 보이며, 모든 AR 모델 중 가장 낮은 FID를 기록했습니다.

## AI 실무자를 위한 시사점
**SAR** 는 기존 **스케일별 자동회귀(Scale-wise AR) 모델** 의 생성 품질을 향상시키는 **실용적이고 효율적인 사후 훈련 방법론** 을 제공합니다. 이미 훈련된 모델에 **최소한의 추가 계산량** (예: **32 A100 GPU에서 5시간** )으로 노출 편향과 학습 난이도 불균형 문제를 효과적으로 완화하여, 대규모 시각 자동회귀 생성 모델의 견고성과 성능을 크게 높일 수 있습니다. 이는 AI 시스템의 배포 및 개선 과정에서 비용 효율적인 성능 향상을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.