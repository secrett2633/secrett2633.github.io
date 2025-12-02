---
title: "[논문리뷰] InternVideo-Next: Towards General Video Foundation Models without Video-Text Supervision"
excerpt: "이 [arXiv]에 게시한 'InternVideo-Next: Towards General Video Foundation Models without Video-Text Supervision' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Foundation Models
  - Self-Supervised Learning
  - Masked Video Modeling
  - Video-Text Supervision-Free
  - Encoder-Predictor-Decoder
  - Diffusion Decoder
  - Semantic Alignment
  - Latent World Model

permalink: /ai/review/2025-12-02-InternVideo-Next-Towards-General-Video-Foundation-Models-without-Video-Text-Supervision/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01342)

**저자:** Chenting Wang, Yuhan Zhu, Yicheng Xu, Jiange Yang, Ziang Yan, Yali Wang, Yi Wang, Limin Wang



## 핵심 연구 목표
본 논문은 노이즈 많고 제한적인 비디오-텍스트 지도 학습의 한계와 저수준 픽셀 재구성에 머무르거나 숏컷 학습을 유도하는 기존 **Masked Video Modeling (MVM)** 의 문제점을 해결하고자 합니다. 명시적인 비디오-텍스트 지도 없이도 일반적인 비디오 이해를 위한 강력하고 확장 가능한 비디오 기반 모델을 구축하는 것이 목표입니다.

## 핵심 방법론
저자들은 기존 인코더-디코더 설계를 **Encoder-Predictor-Decoder (EPD) 프레임워크** 로 분해하고, 두 단계의 사전 훈련 방식인 **InternVideo-Next** 를 제안합니다. **Stage 1** 에서는 **조건부 Diffusion Decoder** 를 사용하여 픽셀 재구성의 상세함과 **사전 훈련된 SigLIP 이미지-레벨 semantic priors** 를 주입하여 높은 의미론적 일관성을 동시에 확보합니다. **Stage 2** 에서는 **Stage 1** 에서 학습된 가중치로 초기화되고 고정된 Teacher 모델의 잠재 표현을 예측하는 **latent-space prediction objective** 를 통해 시공간적 역학 및 인과 관계를 학습하여 숏컷 학습을 방지합니다.

## 주요 결과
**InternVideo-Next** 는 공개된 비디오 데이터만을 사용하여 다양한 비디오 이해 벤치마크에서 SOTA 성능을 달성했습니다. 특히, **Kinetics-400 액션 인식 태스크에서 88.4% (Large 모델)** , **SSv2 (fine-grained motion recognition)에서 73.0% (Large 모델)** 의 정확도를 기록하며 기존 비디오-텍스트 사전 훈련 모델들을 능가했습니다. 또한, 깊이 추정 및 객체 추적과 같은 3D 공간 지능 태스크에서도 탁월한 일반화 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 비디오-텍스트 주석의 비싼 비용과 노이즈 문제에 대한 강력한 대안을 제시하며, **비디오-텍스트 지도 없이도 일반적인 비디오 파운데이션 모델을 구축할 수 있는 확장 가능한 경로** 를 제공합니다. **EPD 프레임워크** 와 **조건부 Diffusion Decoder** , **의미론적 정렬 손실** 을 통해 픽셀 수준의 충실도와 높은 수준의 의미론적 추상화를 동시에 달성하는 방법을 보여주어 모델 설계에 중요한 통찰을 줍니다. 향후 **Embodied AI, 절차적 추론, 멀티모달 LLM** 의 기반 인코더로 활용될 잠재력이 큽니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.