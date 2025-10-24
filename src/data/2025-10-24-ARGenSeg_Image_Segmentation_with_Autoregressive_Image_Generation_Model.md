---
title: "[논문리뷰] ARGenSeg: Image Segmentation with Autoregressive Image Generation Model"
excerpt: "이 [arXiv]에 게시한 'ARGenSeg: Image Segmentation with Autoregressive Image Generation Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Segmentation
  - Autoregressive Generation
  - Multimodal Large Language Models (MLLMs)
  - Visual Understanding
  - VQ-VAE
  - Multi-scale Prediction
  - Referring Expression Segmentation
  - Image Generation

permalink: /ai/review/2025-10-24-ARGenSeg_Image_Segmentation_with_Autoregressive_Image_Generation_Model/

toc: true
toc_sticky: true

date: 2025-10-24 13:04:16+0900
last_modified_at: 2025-10-24 13:04:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20803)

**저자:** Xiaolong Wang, Lixiang Ru, Ziyuan Huang, Kaixiang Ji, Dandan Zheng, Jingdong Chen, Jun Zhou



## 핵심 연구 목표
본 논문은 기존 MLLM 기반 분할 방법론이 픽셀 수준의 미세한 시각적 디테일을 포착하는 데 한계가 있음을 지적하며, **Autoregressive Generation** 기반의 새로운 패러다임인 **ARGenSeg**를 제안합니다. 이미지 분할을 단일 MLLM 프레임워크 내에서 멀티모달 이해 및 픽셀 수준 인식을 통합하는 방식으로 해결하고, 전용 태스크 헤드 없이 SOTA 성능을 달성하는 것을 목표로 합니다.

## 핵심 방법론
ARGenSeg는 **VQ-VAE(Vector-Quantized Autoencoder)**를 사용하여 이미지를 이산적인 시각 토큰으로 양자화하고, MLLM이 이 토큰을 직접 출력하도록 훈련합니다. 특히, **Next-scale prediction 전략**을 통해 여러 스케일의 시각 토큰을 병렬로 생성하는 **다중 스케일 생성 프로세스**를 도입하여, coarse-to-fine 방식으로 세분화를 진행함으로써 분할 정확도와 추론 효율성을 높였습니다.

## 주요 결과
ARGenSeg는 **RefCOCO/+/g 벤치마크**에서 기존 MLLM 기반 분할 모델들을 뛰어넘는 성능을 보였으며, 특히 **RefCOCO-val**에서 **86.3% cIoU**를 달성했습니다. 또한, **1.28초**의 추론 시간으로 기존 순차적 토큰 생성 방식 대비 **10배 이상** 빠른 속도를 보여주며, 적은 분할 데이터로도 우수한 성능과 멀티모달 이해 능력을 유지함을 입증했습니다.

## AI 실무자를 위한 시사점
AI 엔지니어는 ARGenSeg를 통해 **단일 MLLM 프레임워크** 내에서 **고정밀 픽셀 수준 이미지 분할**과 **멀티모달 이해**를 동시에 구현할 수 있는 강력한 도구를 얻게 됩니다. **고속 추론**과 **강력한 일반화 능력** 덕분에 자율주행, 로봇 공학, 의료 영상 분석 등 실시간 응답이 필수적인 분야에 효과적으로 적용될 수 있습니다. **VQ-VAE 기반의 범용 토크나이저**와 **단계별 정제 전략**은 효율적인 모델 개발과 새로운 시각 태스크로의 확장에 중요한 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.