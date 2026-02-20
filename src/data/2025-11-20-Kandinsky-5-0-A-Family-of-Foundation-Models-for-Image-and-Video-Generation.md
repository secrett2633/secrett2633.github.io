---
title: "[논문리뷰] Kandinsky 5.0: A Family of Foundation Models for Image and Video Generation"
excerpt: "Vladimir Arkhipkin이 arXiv에 게시한 'Kandinsky 5.0: A Family of Foundation Models for Image and Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Generation
  - Video Generation
  - Diffusion Models
  - Flow Matching
  - Diffusion Transformer
  - NABLA
  - RLHF
  - Supervised Fine-tuning

permalink: /ai/review/2025-11-20-Kandinsky-5-0-A-Family-of-Foundation-Models-for-Image-and-Video-Generation/

toc: true
toc_sticky: true

date: 2025-11-20 00:00:00+0900+0900
last_modified_at: 2025-11-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.14993)

**저자:** Vladimir Arkhipkin, dendimitrov, kisnikser, AlexeyLetunovskiy, vvasilev



## 핵심 연구 목표
본 논문은 고품질의 일관되고 제어 가능한 이미지 및 비디오 생성을 위한 AI/ML 분야의 핵심 과제를 해결하고자 합니다. 특히, 최신 이미지 및 10초 비디오 합성을 위한 **Kandinsky 5.0** 이라는 최첨단 파운데이션 모델 제품군을 개발하여 최고 수준의 품질과 운영 효율성을 달성하는 것을 목표로 합니다.

## 핵심 방법론
**Kandinsky 5.0** 은 **latent diffusion pipeline** 과 **Flow Matching 패러다임** 을 기반으로 하며, 시각 및 텍스트 정보를 통합하는 **CrossDiT (Diffusion Transformer)** 아키텍처를 핵심으로 합니다. 고해상도 비디오 생성 효율성 향상을 위해 **Neighborhood Adaptive Block-Level Attention (NABLA)** 메커니즘을 도입하여 계산 복잡도를 크게 줄였습니다. 훈련은 **사전 훈련, 지도 미세 조정 (SFT), 증류(Distillation), RL 기반 사후 훈련** 을 포함하는 다단계 파이프라인으로 진행되었습니다.

## 주요 결과
**NABLA** 메커니즘은 훈련 및 추론 시간을 최대 **2.7배 단축** 하며 **90%의 희소성** 을 유지하면서도 FVD, VBench, CLIP-score 및 인간 평가에서 동등한 생성 품질을 보였습니다. 비디오 모델 증류를 통해 **NFE (Number of Function Evaluations)를 100에서 16으로 줄여** 추론 속도를 대폭 향상했습니다. 인간 평가 결과, **Kandinsky 5.0 Video Lite** 는 **Wan 모델** 대비 시각적 품질과 모션 역학에서 우위를 보였으며, **Kandinsky 5.0 Video Pro** 는 **Veo 3** 및 **Veo 3 fast** 대비 시각적 품질과 모션 역학에서 더 높은 점수를 얻었습니다.

## AI 실무자를 위한 시사점
**Kandinsky 5.0** 은 이미지 및 비디오 생성 분야에서 강력하고 효율적인 오픈 소스 파운데이션 모델 제품군을 제공합니다. **NABLA** 와 다단계 훈련(SFT, RLHF, 증류 포함) 전략은 고성능 생성 모델 개발에 대한 실용적인 가이드라인을 제시합니다. AI 실무자들은 **Image Lite, Video Lite, Video Pro** 모델을 활용하여 다양한 애플리케이션에서 품질과 속도 간의 균형을 맞출 수 있습니다. 또한, 모델 간의 프롬프트 일관성 및 시각적 품질 트레이드오프를 이해하여 특정 시나리오에 맞는 모델을 선택하거나 추가 연구를 진행할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.