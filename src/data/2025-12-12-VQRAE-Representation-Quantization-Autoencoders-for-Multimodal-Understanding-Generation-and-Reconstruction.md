---
title: "[논문리뷰] VQRAE: Representation Quantization Autoencoders for Multimodal Understanding, Generation and Reconstruction"
excerpt: "arXiv에 게시된 'VQRAE: Representation Quantization Autoencoders for Multimodal Understanding, Generation and Reconstruction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Learning
  - Vector Quantization
  - Autoencoder
  - Unified Tokenizer
  - Image Generation
  - Image Reconstruction
  - Vision Transformers
  - Semantic Features

permalink: /ai/review/2025-12-12-VQRAE-Representation-Quantization-Autoencoders-for-Multimodal-Understanding-Generation-and-Reconstruction/

toc: true
toc_sticky: true

date: 2025-12-12 00:00:00+0900+0900
last_modified_at: 2025-12-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.23386)

**저자:** Sinan Du, Jiahao Guo, Bo Li, Shuhao Cui, Zhengzhuo Xu, Yifu Luo, Yongxian Wei, Kun Gai, Xinggang Wang, Kai Wu, Chun Yuan



## 핵심 연구 목표
멀티모달 이해, 생성 및 재구성 표현을 **단일 토크나이저** 내에서 통합하는 핵심 과제를 해결하고자 합니다. 기존의 듀얼 인코더 방식의 복잡성과 이산형 토크나이저의 의미 이해 능력 저하 문제를 극복하고, **연속형 의미 특징** 과 **이산형 미세 토큰** 을 동시에 생성할 수 있는 통합 토크나이저를 제안하는 것이 목표입니다.

## 핵심 방법론
본 논문은 **VQRAE (Vector Quantization version of Representation AutoEncoders)** 를 제안합니다. 이는 **사전 훈련된 Vision Foundation Models (VFMs)** 을 통합 인코더로 사용하고, 픽셀 재구성을 위한 **대칭형 ViT 디코더** 를 채택합니다. 훈련은 **2단계 전략** 으로 진행되는데, 1단계에서는 인코더를 고정하고 **고차원 VQ 코드북** 과 디코더를 픽셀 재구성 목표로 학습하며, 2단계에서는 인코더를 포함한 모든 구성 요소를 **자체 증류(self-distillation) 손실** 과 함께 최적화하여 의미론적 이해 능력을 유지합니다.

## 주요 결과
VQRAE는 ImageNet 50k 검증 세트에서 **22.88 PSNR** 및 **0.784 SSIM** 의 경쟁력 있는 재구성 품질을 달성하여, 기존 **TokenFlow** 모델의 **21.41 PSNR** 대비 향상된 성능을 보여줍니다. 멀티모달 이해 벤치마크에서는 LLaVA-1.5 설정에서 다른 통합 토크나이저 대비 **경쟁력 있는 성능** 을 보였으며, 특히 VQRAE-InternViT 모델은 **MME-P 벤치마크에서 1746.8점** 을 기록했습니다. 또한, VQRAE는 **1536 차원의 고차원 VQ 코드북** 에서 **100% 활용률** 을 성공적으로 달성했습니다.

## AI 실무자를 위한 시사점
**단일 토크나이저** 로 멀티모달 이해 및 생성 태스크를 효율적으로 처리할 수 있는 새로운 패러다임을 제시합니다. **사전 훈련된 VFMs** 를 활용한 설계는 모델 복잡성을 줄이고 훈련 효율성을 높일 수 있어, **경량 멀티모달 모델** 개발에 중요한 영감을 제공합니다. 특히 **고차원 VQ 코드북** 의 **100% 활용률** 달성은 코드북 붕괴(collapse) 문제 없이 의미론적 풍부도를 유지할 수 있음을 입증하여, 향후 VQ 기반 모델 설계에 새로운 통찰을 제공할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.