---
title: "[논문리뷰] PixelGen: Pixel Diffusion Beats Latent Diffusion with Perceptual Loss"
excerpt: "이 [arXiv]에 게시한 'PixelGen: Pixel Diffusion Beats Latent Diffusion with Perceptual Loss' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Pixel Diffusion
  - Perceptual Loss
  - Latent Diffusion
  - Image Generation
  - LPIPS
  - DINOv2
  - x-prediction
  - End-to-End Generation

permalink: /ai/review/2026-02-03-PixelGen-Pixel-Diffusion-Beats-Latent-Diffusion-with-Perceptual-Loss/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.02493)

**저자:** Zehong Ma, Ruihan Xu, Shiliang Zhang



## 핵심 연구 목표
본 논문은 기존 픽셀 확산 모델이 고차원 픽셀 공간의 지각적으로 중요하지 않은 신호를 학습하는 데 어려움을 겪어 잠재 확산 모델보다 성능이 뒤처지는 문제를 해결하고자 합니다. VAE 기반의 2단계 잠재 확산 모델에서 발생하는 아티팩트와 병목 현상을 피하면서, 픽셀 확산 모델이 전체 이미지 매니폴드 대신 **의미 있는 지각 매니폴드** 를 학습하도록 유도하여 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
PixelGen은 **x-예측(x-prediction) 방식** 을 채택하여 확산 모델이 노이즈가 있는 입력에서 직접 깨끗한 이미지를 예측하도록 합니다. 특히, **LPIPS 손실(LPIPS loss)** 을 도입하여 로컬 텍스처와 미세한 디테일을 개선하고, **DINO 기반 지각 손실(P-DINO loss)** 을 사용하여 전반적인 장면 레이아웃과 객체 의미론과 같은 글로벌 의미론을 강화합니다. 또한, 샘플 다양성 유지를 위해 확산 초기 **높은 노이즈 단계(high-noise time steps)에서는 지각 손실을 비활성화하는 노이즈-게이팅(noise-gating) 전략** 을 적용합니다.

## 주요 결과
PixelGen은 **ImageNet-256** 에서 **Classifier-Free Guidance(CFG) 없이 단 80 에포크** 훈련으로 **FID 5.11** 을 달성하여, **800 에포크 훈련으로 FID 5.90** 을 기록한 강력한 잠재 확산 모델 **REPA** 를 능가했습니다. **CFG 적용 시에는 160 에포크 훈련으로 FID 1.83** 을 달성했으며, 대규모 텍스트-이미지 생성 벤치마크인 **GenEval** 에서 **0.79의 전반적인 점수** 를 기록하여 최신 대규모 모델과 동등하거나 우수한 성능을 보였습니다.

## AI 실무자를 위한 시사점
PixelGen은 **VAE 및 보조 단계 없이** 픽셀 공간에서 직접 이미지를 생성하는 **간소화된 엔드-투-엔드 파이프라인** 을 제공하며, 이는 잠재 확산 모델의 병목 현상과 아티팩트 문제를 해결합니다. **LPIPS와 P-DINO** 를 통한 지각적 지도(perceptual supervision)는 고품질 이미지 생성에 필수적이며, **노이즈-게이팅 전략** 은 지각 손실 적용 시 샘플 다양성을 유지하는 데 중요합니다. 이는 AI 엔지니어들에게 더 강력하고 효율적인 이미지 생성 모델을 설계하는 새로운 패러다임을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.