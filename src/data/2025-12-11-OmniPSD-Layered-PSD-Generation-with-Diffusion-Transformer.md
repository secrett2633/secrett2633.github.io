---
title: "[논문리뷰] OmniPSD: Layered PSD Generation with Diffusion Transformer"
excerpt: "Cheng Liu이 arXiv에 게시한 'OmniPSD: Layered PSD Generation with Diffusion Transformer' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Transformer
  - PSD Generation
  - Image Decomposition
  - RGBA-VAE
  - In-Context Learning
  - Text-to-PSD
  - Image-to-PSD

permalink: /ai/review/2025-12-11-OmniPSD-Layered-PSD-Generation-with-Diffusion-Transformer/

toc: true
toc_sticky: true

date: 2025-12-11 00:00:00+0900+0900
last_modified_at: 2025-12-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.09247)

**저자:** Cheng Liu, Yiren Song, Haofan Wang, Mike Zheng Shou



## 핵심 연구 목표
본 논문은 기존 생성 모델의 한계인 단일 평면 이미지 출력 문제를 해결하고, 투명한 알파 채널을 포함하는 **레이어드 PSD 파일** 을 생성 및 재구성하는 통합 프레임워크인 **OmniPSD** 를 제안합니다. 이를 통해 텍스트 입력 또는 기존 이미지로부터 편집 가능한 다중 레이어 PSD 그래픽을 생성하여 전문적인 디자인 워크플로우를 지원하는 것이 목표입니다.

## 핵심 방법론
**OmniPSD** 는 **Flux** 생태계를 기반으로 하며, 텍스트-to-PSD 생성을 위한 **Flux-dev** 와 이미지-to-PSD 분해를 위한 **Flux-Kontext** 를 활용하는 통합 **Diffusion Transformer** 프레임워크입니다. 투명도 보존을 위해 **사전 학습된 RGBA-VAE** 를 공유 잠재 공간으로 사용하며, 텍스트-to-PSD는 계층적 캡션과 **2x2 그리드 기반 공간적 인-컨텍스트 학습** 을 통해 레이어 관계를 학습합니다. 이미지-to-PSD는 텍스트 및 전경 요소를 반복적으로 추출하고 배경을 복원하는 **반복적인 인-컨텍스트 편집** 방식으로 작동합니다.

## 주요 결과
텍스트-to-PSD 생성에서 **OmniPSD** 는 **FID 30.43** , **CLIP Score 37.64** , **GPT-4 Score 0.90** 를 달성하며 기존 LayerDiffuse SDXL 및 GPT-Image-1보다 우수한 성능을 보였습니다. RGBA 재구성에서는 **PSNR 32.5** , **SSIM 0.945** , **LPIPS 0.0348** 를 기록하며 다른 RGBA-VAE 변형보다 뛰어난 품질을 입증했습니다. 사용자 연구에서도 텍스트-to-PSD 및 이미지-to-PSD 모두에서 레이어 분리 및 전반적인 선호도에서 가장 높은 점수를 얻었습니다.

## AI 실무자를 위한 시사점
**OmniPSD** 는 AI 생성 모델의 결과물이 전문 디자인 툴에서 직접 활용될 수 있도록 **편집 가능한 레이어드 PSD 파일** 을 생성하는 새로운 패러다임을 제시합니다. 특히 투명도를 보존하는 **RGBA-VAE** 와 **Diffusion Transformer** 의 통합은 실질적인 디자인 워크플로우에 큰 이점을 제공하며, 창의적인 생성과 구조적 재구성이라는 두 가지 중요한 태스크를 하나의 아키텍처에서 처리하는 효율성을 보여줍니다. 이는 AI 기반 디자인 자동화 및 콘텐츠 생성 분야에 중요한 기여를 할 것으로 예상됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.