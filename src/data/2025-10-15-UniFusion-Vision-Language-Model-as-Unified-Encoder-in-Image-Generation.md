---
title: "[논문리뷰] UniFusion: Vision-Language Model as Unified Encoder in Image Generation"
excerpt: "arXiv에 게시된 'UniFusion: Vision-Language Model as Unified Encoder in Image Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Model
  - Unified Encoder
  - Image Generation
  - Diffusion Models
  - Multimodal Learning
  - Text-to-Image
  - Image Editing
  - Zero-shot Learning

permalink: /ai/review/2025-10-15-UniFusion-Vision-Language-Model-as-Unified-Encoder-in-Image-Generation/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12789)

**저자:** Kevin (Yu-Teng) Li, Manuel Brack, Sudeep Katakol, Hareesh Ravi, Ajinkya Kale (Adobe Applied Research)



## 핵심 연구 목표
기존 이미지 생성 모델들이 이미지와 텍스트에 대해 분리된 인코더를 사용하는 한계를 극복하고, 크로스-모달 추론 및 지식 전이 능력을 향상시키는 것을 목표로 합니다. 복잡한 공동 멀티모달 훈련 없이 **사전 학습된 대규모 VLM(Vision-Language Model)** 을 통합 인코더로 활용하여 이미지 생성, 편집, 레퍼런스 기반 합성 등 다양한 작업을 지원하는 모델을 개발하고자 합니다.

## 핵심 방법론
본 논문은 **UNIFUSION** 아키텍처를 제안하며, 핵심적으로 두 가지 메커니즘을 사용합니다: 첫째, **Layerwise Attention Pooling (LAP)** 은 **사전 학습된 VLM** 의 여러 레이어에서 텍스트 및 시각 토큰의 고급 의미론과 저수준 세부 정보를 추출하여 **Diffusion Transformer (DiT)** 에 주입합니다. 둘째, **VLM-Enabled Rewriting Injection with Flexible Inference (VERIFI)** 는 VLM의 추론 능력을 활용하여 프롬프트를 재작성하고, 이 재작성된 텍스트 토큰만을 **DiT** 컨디셔닝에 사용합니다. 이미지 입력의 경우, **VAE 토큰 없이 VLM에서 추출한 특징만을 사용** 하며, 세부 정보 보존을 위해 **VLM 이미지 타일 수를 늘립니다** .

## 주요 결과
**UNIFUSION** 은 (8B VLM 및 8B DiT 사용 시) **Flux.1 [dev]** 및 **BAGEL** 을 포함한 기존 모델들을 **DPG-Bench** 에서 더 적은 훈련 데이터셋(<10억 샘플)으로 능가하는 성능을 보였습니다. 특히, 편집 작업에서는 **Flux.1 Kontext [dev]** 및 **Qwen-Image-Edit** 와 대등한 성능을 달성했습니다. **LAP** 는 다른 shallow fusion 아키텍처보다 우수했으며, **VERIFI** 는 프롬프트 준수도를 크게 향상시켰습니다. 또한, 단일 이미지 편집 데이터로만 훈련했음에도 **다중 이미지 레퍼런스에 대한 제로샷 일반화 능력** 을 입증했습니다.

## AI 실무자를 위한 시사점
**UNIFUSION** 은 복잡한 공동 멀티모달 훈련 없이도 **VLM** 의 강력한 추론 능력을 이미지 생성 및 편집에 활용할 수 있는 효과적인 방법을 제시합니다. 이는 AI 엔지니어들이 기존 **VLM** 을 활용하여 **제로샷 일반화 능력** 이 뛰어나고 다양한 멀티모달 작업에 유연하게 적용 가능한 생성 모델을 구축하는 데 중요한 시사점을 제공합니다. **LAP** 및 **VERIFI** 는 **VLM** 특징을 미세하게 제어하고 활용하는 실용적인 기법으로, 개발 비용과 시간을 절약하면서도 고성능 모델을 구현할 수 있는 가능성을 열어줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.