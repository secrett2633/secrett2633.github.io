---
title: "[논문리뷰] HiFi-Inpaint: Towards High-Fidelity Reference-Based Inpainting for Generating Detail-Preserving Human-Product Images"
excerpt: "arXiv에 게시된 'HiFi-Inpaint: Towards High-Fidelity Reference-Based Inpainting for Generating Detail-Preserving Human-Product Images' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reference-Based Inpainting
  - High-Fidelity Image Generation
  - Human-Product Images
  - Diffusion Models
  - Detail Preservation
  - Attention Mechanisms
  - Loss Functions
  - Dataset Construction

permalink: /ai/review/2026-03-06-HiFi-Inpaint-Towards-High-Fidelity-Reference-Based-Inpainting-for-Generating-Detail-Preserving-Human-Product-Images/

toc: true
toc_sticky: true

date: 2026-03-06 00:00:00+0900+0900
last_modified_at: 2026-03-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.02210)

**저자:** Yichen Liu, Donghao Zhou, Jie Wang, Xin Gao, Guisheng Liu, Jiatong Li, Quanwei Zhang, Qiang Lyu, Lanqing Guo, Shilei Wen, Weiqiang Wang, Pheng-Ann Heng



## 핵심 연구 목표
본 논문은 인간-제품 이미지 생성 시 제품 디테일의 **높은 충실도(high-fidelity) 보존** 을 보장하는 문제를 해결하고자 합니다. 기존 참조 기반 인페인팅 방법론의 한계, 즉 다양한 대규모 훈련 데이터 부족, 제품 디테일 보존에 대한 모델의 초점 부족, 그리고 정밀한 안내를 위한 거친(coarse) 감독의 문제점을 극복하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **HiFi-Inpaint** 라는 새로운 고충실도 참조 기반 인페인팅 프레임워크를 제안합니다. 이를 위해, (1) 자체 합성 및 자동 필터링을 통해 구축된 대규모 데이터셋 **HP-Image-40K** 를 활용합니다. (2) **Shared Enhancement Attention (SEA)** 을 도입하여 이중 스트림(dual-stream) visual DiT 블록 내에서 고주파 맵 토큰을 활용해 세밀한 제품 특징을 정제합니다. (3) 고주파 맵을 사용하여 정확한 픽셀 수준의 감독을 강제하는 **Detail-Aware Loss (DAL)** 를 제안하여 미세한 디테일 재구성을 강화합니다.

## 주요 결과
HiFi-Inpaint는 합성 데이터 평가에서 **CLIP-I 95.0%** , **DINO 91.9%** , **SSIM-HF 42.9%** 를 기록하며 기존 최신(SOTA) 방법론들을 능가하는 성능을 달성했습니다. 사용자 연구 결과에서도 텍스트 정렬 **36.4%** , 시각적 일관성 **41.5%** , 생성 품질 **39.5%** 에서 가장 높은 인간 선호도를 보였습니다. 또한, HP-Image-40K, SEA, DAL 각각의 구성 요소가 성능 향상에 기여함을 ablation study를 통해 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 고품질의 **인간-제품 이미지 생성** 을 자동화하여 광고, 전자상거래 등 산업 분야에서 수동 디자인 작업을 줄일 수 있는 실용적인 솔루션을 제공합니다. **HP-Image-40K 데이터셋** , **SEA** 및 **DAL** 과 같은 새로운 기술은 다른 도메인의 고충실도 이미지 생성 및 디테일 보존 문제에도 적용 가능하며, **FLUX.1-Dev** 와 같은 기반 모델의 활용 가능성을 확장합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.