---
title: "[논문리뷰] Terminal Velocity Matching"
excerpt: "Jiaming Song이 [arXiv]에 게시한 'Terminal Velocity Matching' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generative Models
  - Flow Matching
  - Diffusion Models
  - One-Step Generation
  - Few-Step Generation
  - Wasserstein Distance
  - Transformer Architecture
  - Lipschitz Continuity

permalink: /ai/review/2025-11-27-Terminal-Velocity-Matching/

toc: true
toc_sticky: true

date: 2025-11-27 00:00:00+0900+0900
last_modified_at: 2025-11-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19797)

**저자:** Linqi Zhou, Mathias Parger, Ayaan Haque, Jiaming Song



## 핵심 연구 목표
논문은 고품질 샘플을 빠르고 효율적으로 생성하며, 고차원 데이터에 확장 가능한 생성 모델을 단일 훈련 단계로 구축하는 것을 목표로 합니다. 특히, 기존 Diffusion Models 및 Flow Matching의 다단계 샘플링 과정으로 인한 느린 추론 속도 문제를 해결하고, 분포 매칭에 대한 명시적인 이론적 보증을 제공하고자 합니다.

## 핵심 방법론
제안된 **Terminal Velocity Matching (TVM)**은 Flow Matching의 일반화된 형태로, 궤적의 초기 시간이 아닌 **종단 시간에서의 속도**를 정규화하여 학습합니다. 이는 **2-Wasserstein 거리**에 대한 상한을 제공하며, **Diffusion Transformers**의 Lipschitz 연속성 부족 문제를 해결하기 위해 **RMSNorm 기반 QK-normalization** 및 시간 임베딩 정규화를 도입합니다. 또한, 효율적인 **Flash Attention 커널**을 개발하여 **Jacobian-Vector Products (JVP)**의 역전파를 지원합니다.

## 주요 결과
**ImageNet-256x256**에서 단일 함수 평가(1 NFE)로 **3.29 FID**를, 4 NFE로 **1.99 FID**를 달성하여 SOTA 성능을 기록했습니다. **ImageNet-512x512**에서는 1 NFE로 **4.32 FID**, 4 NFE로 **2.94 FID**를 달성하여 기존 Flow Matching 및 Diffusion 모델의 베이스라인을 능가했습니다. 이는 처음부터 학습된 1/few-step 모델 중 최고 성능에 해당합니다.

## AI 실무자를 위한 시사점
TVM은 고품질의 이미지를 단일 또는 소수의 스텝으로 생성할 수 있게 하여, **고비용 추론 문제를 해결**합니다. 특히, **Diffusion Transformers**의 훈련 안정성을 저해하는 Lipschitz 연속성 문제를 해결하기 위한 아키텍처 수정은 실제 모델 배포에 중요한 시사점을 제공합니다. 또한, **JVP를 지원하는 Flash Attention 커널**은 대규모 트랜스포머 기반 모델의 효율적인 훈련에 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.