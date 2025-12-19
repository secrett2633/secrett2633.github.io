---
title: "[논문리뷰] REGLUE Your Latents with Global and Local Semantics for Entangled Diffusion"
excerpt: "Giorgos Sfikas이 [arXiv]에 게시한 'REGLUE Your Latents with Global and Local Semantics for Entangled Diffusion' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Latent Diffusion Models
  - Vision Foundation Models
  - Semantic Compression
  - Global-Local Semantics
  - Image Generation
  - Representation Entanglement
  - Transformer Architecture

permalink: /ai/review/2025-12-19-REGLUE-Your-Latents-with-Global-and-Local-Semantics-for-Entangled-Diffusion/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16636)

**저자:** Giorgos Petsangourakis, Christos Sgouropoulos, Bill Psomas, Theodoros Giannakopoulos, Giorgos Sfikas, Ioannis Kakogeorgiou



## 핵심 연구 목표
본 논문은 최신 이미지 생성 모델인 **Latent Diffusion Models (LDMs)** 의 고질적인 문제인 느린 의미론적 정보 학습 및 샘플 품질 제한을 해결하고자 합니다. 기존 연구들이 **Vision Foundation Models (VFMs)** 의 의미론적 정보를 부분적으로만 활용하거나 선형 압축 방식을 사용하여 풍부한 비선형, 다층 공간 의미론을 충분히 활용하지 못하는 한계를 극복하는 것이 목표입니다.

## 핵심 방법론
본 연구는 **REGLUE (Representation Entanglement with Global-Local Unified Encoding)** 프레임워크를 제안합니다. 이는 **VAE 이미지 잠재 공간** , 경량의 **비선형 합성곱 의미론적 압축기** 로 압축된 국소(패치 수준) **VFM DINOv2 특징** , 그리고 전역(이미지 수준) **[CLS] 토큰** 을 단일 **SiT (Scalable Interpolant Transformer) 백본** 내에서 동시에 모델링합니다. 또한, 내부 표현이 **Frozen VFM 타겟** 과 일치하도록 유도하는 외부 정렬 손실을 적용하여 모델의 견고성과 성능을 강화합니다.

## 주요 결과
**ImageNet 256x256** 벤치마크에서 **REGLUE** 는 **FID (Fréchet Inception Distance)** 를 크게 개선하고 수렴 속도를 가속화했습니다. 특히, **SiT-B/2+REGLUE** 는 **400K 학습 단계** 에서 **12.9 FID** 를 달성하여 기존 **SiT-B/2** 기준선(33.0 FID) 대비 **60.9%** 향상되었고, **SiT-XL/2+REGLUE** 는 **700K 학습 단계** 에서 **2.7 FID** 를 달성하여 **REG** 의 **1M 단계** 성능과 동등하면서도 **30% 적은 반복** 만으로 이를 이뤄냈습니다.

## AI 실무자를 위한 시사점
본 연구는 **VFM** 의 풍부한 의미론적 정보를 효과적으로 **확산 모델** 에 통합하는 실용적인 방법을 제시하여, **고품질 이미지 생성** 및 **학습 효율성** 을 크게 향상시킬 수 있음을 보여줍니다. 특히, **비선형 공간 의미론적 압축** 의 중요성과 **전역-국소 특징 동시 모델링** 이 모델 성능에 결정적인 역할을 함을 입증하여, **제한된 데이터 환경** 에서도 높은 성능을 기대할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.