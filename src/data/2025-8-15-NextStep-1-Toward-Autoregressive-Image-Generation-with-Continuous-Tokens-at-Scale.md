---
title: "[논문리뷰] NextStep-1: Toward Autoregressive Image Generation with Continuous
  Tokens at Scale"
excerpt: "Quan Sun이 [arXiv]에 게시한 'NextStep-1: Toward Autoregressive Image Generation with Continuous
  Tokens at Scale' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Models
  - Text-to-Image Generation
  - Continuous Latent Tokens
  - Flow Matching
  - Image Editing
  - Multimodal Learning
  - Transformer Architecture

permalink: /ai/review/2025-8-15-NextStep-1-Toward-Autoregressive-Image-Generation-with-Continuous-Tokens-at-Scale/

toc: true
toc_sticky: true

date: 2025-08-15 13:09:31+0900
last_modified_at: 2025-08-15 13:09:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.10711)

**저자:** Quan Sun, Jingwei Wu, Guopeng Li, Chunrui Han, NextStep Team



## 핵심 연구 목표
이 논문은 텍스트-이미지 생성 분야에서 기존 autoregressive (AR) 모델이 직면한 **양자화 손실** 및 **무거운 확산 모델 의존성**의 한계를 극복하고자 합니다. **NextStep-1**을 통해 **연속형 이미지 토큰**과 **이산형 텍스트 토큰**을 사용하는 **next-token prediction** 패러다임을 발전시켜, 고품질 이미지 합성 및 이미지 편집에서 **최첨단 성능**을 달성하는 것을 목표로 합니다.

## 핵심 방법론
**NextStep-1**은 **140억 매개변수의 autoregressive Transformer 백본**과 **1억 5700만 매개변수의 경량 flow matching head**를 결합합니다. 이미지는 **Flux VAE**를 기반으로 한 **이미지 토크나이저**를 통해 **16채널 연속형 잠재 토큰**으로 변환되며, **채널 단위 정규화**와 **확률적 교란**을 적용하여 잠재 공간의 안정성을 확보합니다. 모델은 텍스트에 대한 **교차 엔트로피 손실**과 이미지에 대한 **flow matching 손실**의 가중 합으로 **end-to-end** 훈련되며, **다단계 커리큘럼(Stage1, Stage2, Annealing)**과 **Supervised Fine-Tuning (SFT), Direct Preference Optimization (DPO)**을 통해 정교화됩니다.

## 주요 결과
**NextStep-1**은 텍스트-이미지 생성 벤치마크에서 **AR 모델 중 최상위 성능**을 입증했습니다. **WISE 벤치마크**에서 **0.54 (Self-CoT 적용 시 0.67)**, **GenAI-Bench (고급 프롬프트)**에서 **0.67 (Self-CoT 적용 시 0.74)**, **DPG-Bench**에서 **85.28**을 달성했습니다. 특히 **OneIG-Bench (English)**에서는 **0.417**의 종합 점수를 기록하며 기존 AR 모델인 **Emu3 (0.311)** 및 **Janus-Pro (0.267)**를 크게 앞섰습니다. 이미지 편집 모델인 **NextStep-1-Edit**는 **GEdit-Bench-EN**에서 **6.58**, **ImgEdit-Bench**에서 **3.71**의 경쟁력 있는 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **연속형 토큰**을 활용한 **Autoregressive 모델**이 기존 VQ 기반 모델의 한계를 넘어 고품질 이미지 생성 및 편집 분야에서 **확산 모델과 동등한 경쟁력**을 가질 수 있음을 보여줍니다. **이미지 토크나이저의 설계** (채널 단위 정규화 및 노이즈 주입)가 생성 품질과 안정성에 핵심적인 역할을 하며, 이는 **강력한 classifier-free guidance** 적용의 기반이 됩니다. 하지만 **고해상도 이미지 생성 시 긴 훈련 단계**와 순차적 디코딩으로 인한 **추론 지연**은 여전히 실무적 배포를 위한 개선 과제입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.