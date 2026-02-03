---
title: "[논문리뷰] Causal Forcing: Autoregressive Diffusion Distillation Done Right for High-Quality Real-Time Interactive Video Generation"
excerpt: "이 [arXiv]에 게시한 'Causal Forcing: Autoregressive Diffusion Distillation Done Right for High-Quality Real-Time Interactive Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Video Generation
  - Diffusion Models
  - Model Distillation
  - Real-Time AI
  - Causal Attention
  - ODE Distillation
  - Frame-level Injectivity
  - Teacher Forcing

permalink: /ai/review/2026-02-03-Causal-Forcing-Autoregressive-Diffusion-Distillation-Done-Right-for-High-Quality-Real-Time-Interactive-Video-Generation/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.02214)

**저자:** Hongzhou Zhu, Min Zhao, Guande He, Hang Su, Chongxuan Li, Jun Zhu



## 핵심 연구 목표
실시간 상호작용 비디오 생성을 위해 기존의 양방향(bidirectional) 비디오 확산 모델을 소수 스텝의 자기회귀(autoregressive, AR) 모델로 증류하는 과정에서 발생하는 **아키텍처 간극(architectural gap)** 과 **프레임 수준의 단사성(frame-level injectivity) 위반 문제** 를 해결하고자 합니다. 이는 기존 방법론이 흐릿하고 비일관적인 비디오를 생성하는 원인이 됩니다.

## 핵심 방법론
본 연구는 **Causal Forcing** 이라는 3단계 방법론을 제안합니다. 첫째, **Teacher Forcing** 을 사용하여 AR 확산 모델을 AR 교사 모델로 훈련시킵니다. 둘째, 이 AR 교사 모델의 **확률 흐름 상미분 방정식(PF-ODE)** 궤적을 샘플링하여 AR 학생 모델을 훈련하는 **Causal ODE Distillation** 을 수행합니다. 이 과정은 프레임 수준의 단사성 조건을 만족시켜 교사의 흐름 맵을 정확히 학습하게 합니다. 마지막으로, **비대칭 Distribution Matching Distillation (DMD)** 단계를 적용하여 소수 스텝 AR 학생 모델을 최적화합니다.

## 주요 결과
제안된 방법은 모든 평가 지표에서 기준 모델을 능가하며, SOTA인 **Self Forcing** 대비 **Dynamic Degree에서 19.3%** , **VisionReward에서 8.7%** , **Instruction Following에서 16.7%** 의 상당한 성능 향상을 달성했습니다. 또한, 양방향 확산 모델인 **Wan2.1** 과 동등하거나 이를 능가하는 성능을 보이면서도 **2079% 더 높은 처리량** 과 현저히 빠른 추론 속도를 제공합니다.

## AI 실무자를 위한 시사점
본 연구는 실시간 AR 비디오 생성 모델 증류 과정에서 발생하는 핵심적인 이론적 문제를 규명하고 이를 해결하는 실용적인 접근법을 제시합니다. AI 개발자들은 **Causal Forcing** 파이프라인을 활용하여 기존의 양방향 모델을 AR 아키텍처로 변환 시 발생하는 품질 저하를 극복하고, 더욱 일관되고 동적인 **고품질 실시간 상호작용 비디오 생성 시스템** 을 구축할 수 있습니다. 특히 AR 교사 모델의 활용이 성능 향상에 결정적인 역할을 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.