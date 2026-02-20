---
title: "[논문리뷰] Unified Latents (UL): How to train your latents"
excerpt: "[arXiv]에 게시된 'Unified Latents (UL): How to train your latents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Latent Representation Learning
  - VAE
  - Image Generation
  - Video Generation
  - Bitrate Control
  - Training Efficiency
  - Diffusion Prior
  - Diffusion Decoder

permalink: /ai/review/2026-02-20-Unified-Latents-UL-How-to-train-your-latents/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.17270)

**저자:** Jonathan Heek, Emiel Hoogeboom, Thomas Mensink, Tim Salimans



## 핵심 연구 목표
확산 모델을 위한 레이턴트 표현 학습에 있어 정보 내용과 재구성 품질 간의 근본적인 트레이드오프 문제를 해결하고자 합니다. 이 연구는 확산 사전(prior)과 확산 디코더(decoder)에 의해 공동으로 정규화되는 레이턴트 학습 프레임워크인 **Unified Latents (UL)** 를 제안하며, 레이턴트 비트레이트에 대한 해석 가능한 제어 및 훈련 효율성, 생성 품질 향상을 목표로 합니다.

## 핵심 방법론
**Unified Latents (UL)** 프레임워크는 인코더, 확산 사전, 확산 디코더를 공동으로 훈련합니다. 핵심 아이디어는 레이턴트를 **고정된 양의 가우시안 노이즈** 로 인코딩하고, 사전 확산 모델을 최소 노이즈 레벨에 맞춰 **KL 항을 노이즈 레벨에 대한 가중 MSE** 로 단순화하며, 디코더에 **시그모이드 가중치를 적용한 재가중 ELBO 손실** 을 사용하는 것입니다. 훈련은 주로 2단계로 진행되어, 최적의 샘플링 성능을 위해 인코더와 디코더를 고정시킨 후 사전을 기본 모델로 재훈련합니다.

## 주요 결과
**ImageNet-512** 에서 **1.4 FID** 를 달성하여 경쟁력 있는 성능을 보였고, 높은 재구성 품질( **PSNR** )을 유지하면서 **Stable Diffusion 레이턴트 기반 모델** 보다 **적은 훈련 FLOPs** 를 요구했습니다. **Kinetics-600** 에서는 **1.3 FVD** 를 달성하여 새로운 **최첨단(state-of-the-art)** 성능을 기록했습니다. 레이턴트 비트레이트 조절을 통해 성능 최적화가 가능하며, 특히 작은 모델의 경우 낮은 비트레이트에서 더 나은 성능을 보이는 경향이 있습니다.

## AI 실무자를 위한 시사점
**Unified Latents** 는 확산 모델의 훈련 효율성을 크게 향상시키고 생성 품질을 높이는 **새로운 레이턴트 학습 패러다임** 을 제시합니다. **손실 계수(loss factor)** 및 **시그모이드 바이어스(sigmoid bias)** 와 같은 하이퍼파라미터를 통해 레이턴트의 정보량을 명확하게 제어할 수 있어, AI 엔지니어가 특정 애플리케이션의 요구사항에 맞춰 모델을 세밀하게 조정할 수 있습니다. 비록 **GAN 기반 디코더** 에 비해 **계산 비용이 높을 수 있다는 한계** 가 있지만, 이 프레임워크는 대규모 모델의 스케일링과 이미지/비디오 생성 태스크에 광범위하게 적용될 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.