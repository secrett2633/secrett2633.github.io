---
title: "[논문리뷰] SALAD: Achieve High-Sparsity Attention via Efficient Linear Attention Tuning for Video Diffusion Transformer"
excerpt: "이 [arXiv]에 게시한 'SALAD: Achieve High-Sparsity Attention via Efficient Linear Attention Tuning for Video Diffusion Transformer' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Diffusion Models
  - Sparse Attention
  - Linear Attention
  - Computational Efficiency
  - Transformer Tuning
  - Video Generation
  - LoRA
  - Gating Mechanism

permalink: /ai/review/2026-01-26-SALAD-Achieve-High-Sparsity-Attention-via-Efficient-Linear-Attention-Tuning-for-Video-Diffusion-Transformer/

toc: true
toc_sticky: true

date: 2026-01-26 00:00:00+0900+0900
last_modified_at: 2026-01-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.16515)

**저자:** Tongcheng Fang, Tianchen Zhao, Pengfei Wan, Hanling Zhang, Ruiqi Xie, Zhuo Han, Xin Tao, Wenbo Ding, Wanli Ouyang, Xuefei Ning, Yu Wang



## 핵심 연구 목표
비디오 Diffusion Transformer의 긴 입력 시퀀스로 인해 발생하는 **높은 계산 지연 시간** 문제를 해결하고, 기존의 스파스 어텐션 방식이 가진 **제한된 스파시티** 또는 **과도한 학습 오버헤드** 의 한계를 극복하고자 합니다. 적은 학습 데이터와 연산량으로 **고품질의 비디오 생성 성능** 을 유지하면서도 **높은 스파시티(90%)** 를 달성하는 효율적인 어텐션 메커니즘을 개발하는 것이 목표입니다.

## 핵심 방법론
본 연구는 경량의 **선형 어텐션(linear attention) 브랜치** 를 스파스 어텐션과 **병렬** 로 도입하는 `SALAD` 방법을 제안합니다. 이 방법은 **입력 의존적 스칼라 게이팅(input-dependent scalar gating) 메커니즘** 을 통해 두 브랜치의 기여도를 동적으로 조절하며, 선형 브랜치의 대부분 파라미터는 스파스 어텐션 모듈과 **공유** 하여 효율성을 높였습니다. 특히, **3D Rotary Position Embeddings (3D ROPE)** 를 통합하여 비디오 시퀀스의 시공간적 관계를 효과적으로 처리합니다.

## 주요 결과
`SALAD`는 **90%의 스파시티** 를 달성하면서도 추론 속도를 **1.72배** 향상시켰습니다. 특히, **Top-K w. SALAD** 는 Subject Consistency **97.15%** , Background Consistency **96.27%** , Imaging Quality **64.76%** , Text Consistency **25.83%** 를 기록하며 Full Attention baseline과 유사하거나 능가하는 비디오 생성 품질을 보였습니다. 이는 단 **2,000개의 비디오 샘플** 과 **1,600 스텝** 의 매우 효율적인 파인튜닝으로 달성된 결과입니다.

## AI 실무자를 위한 시사점
`SALAD`는 비디오 Diffusion Transformer의 **추론 효율성** 을 획기적으로 개선할 수 있는 실용적인 솔루션을 제공합니다. **적은 학습 데이터와 시간** 으로도 **고품질 비디오 생성 능력** 을 유지하면서 **높은 스파시티** 를 달성할 수 있어, 자원 제약이 있는 환경에서 대규모 비디오 생성 모델을 운영하는 AI 엔지니어에게 매우 유용합니다. 특히, **입력 의존적 게이팅 메커니즘** 은 복잡한 모델의 동적 최적화에 대한 새로운 통찰을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.