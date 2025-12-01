---
title: "[논문리뷰] SLA: Beyond Sparsity in Diffusion Transformers via Fine-Tunable
  Sparse-Linear Attention"
excerpt: "이 [arXiv]에 게시한 'SLA: Beyond Sparsity in Diffusion Transformers via Fine-Tunable
  Sparse-Linear Attention' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Transformers
  - Sparse Attention
  - Linear Attention
  - Model Acceleration
  - Video Generation
  - Attention Mechanisms
  - Fine-tuning

permalink: /ai/review/2025-9-30-SLA-Beyond-Sparsity-in-Diffusion-Transformers-via-Fine-Tunable-Sparse-Linear-Attention/

toc: true
toc_sticky: true

date: 2025-09-30 13:52:24+0900
last_modified_at: 2025-09-30 13:52:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.24006)

**저자:** Jintao Zhang, Haoxu Wang, Kai Jiang, Shuo Yang, Kaiwen Zheng, Haocheng Xi, Ziteng Wang, Hongzhou Zhu, Min Zhao, Ion Stoica, Joseph E. Gonzalez, Jun Zhu, Jianfei Chen



## 핵심 연구 목표
본 논문은 **Diffusion Transformer (DiT)** 모델, 특히 비디오 생성에서 긴 시퀀스 길이로 인한 어텐션의 2차 시간 복잡도 문제를 해결하고자 합니다. 어텐션 가중치가 소수의 고랭크(high-rank) 큰 가중치와 다수의 저랭크(low-rank) 작은 가중치로 분리될 수 있다는 핵심 관찰을 바탕으로, 계산 비용을 크게 줄이면서도 생성 품질을 유지하는 훈련 가능한 어텐션 방법론을 제안합니다.

## 핵심 방법론
제안하는 **SLA (Sparse-Linear Attention)** 는 어텐션 가중치를 **critical, marginal, negligible** 세 가지 범주로 동적으로 분류합니다. **Critical 가중치** 에는 **O(N²) FlashAttention** 을 적용하고, **marginal 가중치** 에는 **O(N) 선형 어텐션** 을 적용하며, **negligible 가중치** 는 계산에서 제외합니다. 이 하이브리드 접근 방식은 **단일 GPU 커널** 로 구현되어 순전파 및 역전파를 모두 지원하며, **몇 단계의 미세 조정** 만으로 모델에 통합됩니다.

## 주요 결과
**SLA** 는 **어텐션 계산을 20배 절감** 하고 **95%의 희소성** 을 달성하면서도 비디오 생성 품질 저하 없이 baselines를 능가합니다. 특히 **Wan2.1-1.3B 모델** 에서 어텐션 커널 속도를 **13.7배 가속화** 하고 엔드투엔드 비디오 생성 속도를 **2.2배 향상** 시켰습니다. 이미지 생성 ( **LightningDiT** ) 실험에서도 **87.50%의 희소성** 과 더 나은 **FID** 성능을 보였습니다.

## AI 실무자를 위한 시사점
**SLA** 는 **Diffusion Transformer** 모델의 계산 효율성을 혁신적으로 개선하여, 특히 고해상도 비디오 생성과 같이 긴 시퀀스 길이로 인해 연산 비용이 높았던 태스크에 매우 유용합니다. **높은 희소성(95%)** 과 **낮은 미세 조정 비용** 으로 모델 성능을 유지할 수 있다는 점은 대규모 AI 모델의 배포 및 학습 비용 절감에 직접적인 기여를 합니다. 이는 AI 엔지니어가 복잡한 모델을 더 효율적으로 운용할 수 있게 하는 실용적인 솔루션입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.