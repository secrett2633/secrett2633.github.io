---
title: "[논문리뷰] InfGen: A Resolution-Agnostic Paradigm for Scalable Image Synthesis"
excerpt: "Song Guo이 [arXiv]에 게시한 'InfGen: A Resolution-Agnostic Paradigm for Scalable Image Synthesis' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Synthesis
  - Resolution-Agnostic
  - Diffusion Models
  - Latent Space
  - VAE Decoder
  - High-Resolution Image Generation
  - Generative AI
  - Transformer Architecture

permalink: /ai/review/2025-9-15-InfGen-A-Resolution-Agnostic-Paradigm-for-Scalable-Image-Synthesis/

toc: true
toc_sticky: true

date: 2025-09-15 13:12:08+0900
last_modified_at: 2025-09-15 13:12:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.10441)

**저자:** Tao Han, Wanghan Xu, Junchao Gong, Xiaoyu Yue, Song Guo, Luping Zhou, Lei Bai



## 핵심 연구 목표
본 논문은 기존 확산 모델이 고해상도 이미지 생성 시 **해상도에 따라 연산 요구량이 제곱으로 증가** 하여 **4K 이미지 생성에 100초 이상** 이 소요되는 문제점을 해결하고자 합니다. 확산 모델의 고정된 잠재 공간 출력으로부터 **임의의 해상도 이미지를 효율적으로 합성** 할 수 있는 해상도 불가지론적 패러다임 **InfGen** 을 제안하여, **4K 이미지 생성 시간을 10초 미만** 으로 단축하는 것을 목표로 합니다.

## 핵심 방법론
**InfGen** 은 확산 모델의 **VAE 디코더를 새로운 제너레이터로 대체** 하는 방식으로, 확산 모델은 잠재 콘텐츠를 생성하고 **InfGen** 이 이를 임의의 해상도 이미지로 디코딩합니다. 이 제너레이터는 **Transformer 기반 아키텍처** 를 사용하여 고정 크기의 잠재 벡터로부터 이미지를 한 단계에 생성하며, **Implicit Neural Positional Embedding (INPE)** 을 통해 다양한 마스크 토큰 수에 대한 공간 정보를 동적으로 처리합니다. 훈련은 **L1, LPIPS, GAN 손실** 을 포함한 다중 최적화 목표를 사용하고, 초고해상도 생성을 위해 **반복적인 외삽 스키마** 를 도입합니다.

## 주요 결과
**InfGen** 은 **4K 이미지 생성 시간을 10초 미만** 으로 단축하여, 기존 모델 대비 **10배 이상** 빠른 속도를 달성했습니다 (예: **DiT 기반 모델의 4096x4096 이미지 생성 시간 약 7.4초** ). **3072x3072 해상도** 에서 **DiT의 FIDp를 41%** , **SD1.5의 FIDp를 44%** 개선하는 등 기존 모델의 생성 품질을 크게 향상시켰습니다. 특히 **InfGen+SDXL-B-1** 은 **1024x1024 해상도에서 35.14 FIDp** 를 기록하며 우수한 성능을 보였습니다.

## AI 실무자를 위한 시사점
**InfGen** 은 기존 **Latent Diffusion Model (LDM) 기반 시스템** 에 **플러그 앤 플레이 방식** 으로 통합되어, **확산 모델의 재훈련 없이** 해상도 확장성과 생성 품질을 혁신적으로 개선할 수 있습니다. 이는 **고해상도 이미지 및 비디오 생성 워크플로우** 의 **컴퓨팅 비용과 시간 제약** 을 크게 줄여, **실시간 또는 대규모 AI 콘텐츠 생성 애플리케이션** 개발에 실용적인 이점을 제공합니다. 또한, **다양한 디바이스에서 일관된 고품질 시각적 경험** 을 제공하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.