---
title: "[논문리뷰] EmoVid: A Multimodal Emotion Video Dataset for Emotion-Centric Video Understanding and Generation"
excerpt: "Zeyu Wang이 arXiv에 게시한 'EmoVid: A Multimodal Emotion Video Dataset for Emotion-Centric Video Understanding and Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Dataset
  - Emotion Recognition
  - Video Generation
  - Affective Computing
  - Stylized Media
  - Diffusion Models
  - Video Understanding
  - Text-to-Video

permalink: /ai/review/2025-11-17-EmoVid-A-Multimodal-Emotion-Video-Dataset-for-Emotion-Centric-Video-Understanding-and-Generation/

toc: true
toc_sticky: true

date: 2025-11-17 00:00:00+0900+0900
last_modified_at: 2025-11-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.11002)

**저자:** Zongyang Qiu, Bingyuan Wang, Xingbei Chen, Yingqing He, Zeyu Wang



## 핵심 연구 목표
기존 비디오 생성 시스템이 감성적 차원을 소홀히 다루고 특히 스타일화되거나 비현실적인 콘텐츠에서 감정 이해와 생성 간의 격차가 크다는 문제를 해결하고자 합니다. 감정 중심의 비디오 이해 및 생성을 위한 **멀티모달 감정 비디오 데이터셋 EmoVid** 를 구축하고, 이를 통해 감성 표현이 강화된 비디오 생성 기술의 발전을 목표로 합니다.

## 핵심 방법론
**22,758개의 비디오 클립** 으로 구성된 **EmoVid 데이터셋** 은 카툰 애니메이션, 영화 클립, 애니메이션 스티커 등 세 가지 유형의 콘텐츠를 포함합니다. 각 비디오는 **Mikels의 8가지 감정 범주** , **밝기, 색채, 색조** 와 같은 시각적 속성, 그리고 **VLM(Vision-Language Model)이 생성한 텍스트 캡션** 으로 어노테이션되었습니다. 확장 가능한 어노테이션을 위해 **NVILA-Lite-2B VLM** 을 파인튜닝하여 인간 어노테이션과 유사한 품질을 달성했으며, 이를 통해 감정-조건부 비디오 생성을 위한 **Wan2.1 모델** 을 텍스트-비디오(T2V) 및 이미지-비디오(I2V) 작업에 파인튜닝했습니다.

## 주요 결과
**EmoVid 데이터셋** 을 기반으로 파인튜닝된 **Wan2.1 모델** 은 감정 표현 능력에서显著한 향상을 보였습니다. T2V 작업에서 baseline 대비 **EA-8cls(8개 감정 분류 정확도) 48.33%** 를 달성했으며, I2V 작업에서는 **EA-8cls 76.25%** 로 경쟁 모델들을 능가했습니다. 사용자 연구 결과, **감정 표현 측면에서 66.2%의 Top-1 선호도** 를 기록하며 파인튜닝된 모델이 감정 정확도와 시각적 품질 모두에서 우수함이 입증되었습니다.

## AI 실무자를 위한 시사점
**EmoVid** 는 스타일화된 미디어 콘텐츠에서 감정 인지 비디오 이해 및 생성을 위한 중요한 벤치마크와 자원을 제공합니다. **Diffusion model** 을 감정 데이터로 파인튜닝하는 접근 방식은 생성 모델의 **감성 표현 능력** 을 효과적으로 향상시킬 수 있으며, 이는 **감정 기반 아바타 생성, 소셜 미디어 콘텐츠 제작, 감성적 비디오 편집** 등 다양한 실용적 AI 애플리케이션에 직접적으로 활용될 수 있습니다. 또한, 데이터셋의 **멀티모달(비디오, 오디오, 텍스트) 특성** 은 향후 더욱 통합적인 감성 AI 모델 개발의 가능성을 열어줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.