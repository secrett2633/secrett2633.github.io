---
title: "[논문리뷰] InstructX: Towards Unified Visual Editing with MLLM Guidance"
excerpt: "Xinghui Li이 arXiv에 게시한 'InstructX: Towards Unified Visual Editing with MLLM Guidance' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Editing
  - MLLM Guidance
  - Diffusion Models
  - Image Editing
  - Video Editing
  - Unified Framework
  - Multimodal AI
  - Instruction-based Editing

permalink: /ai/review/2025-10-10-InstructX-Towards-Unified-Visual-Editing-with-MLLM-Guidance/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08485)

**저자:** Chong Mou, Qichao Sun, Yanze Wu, Pengze Zhang, Xinghui Li, Fulong Ye, Songtao Zhao, Qian He



## 핵심 연구 목표
컴퓨터 비전 분야에서 **Multimodal Large Language Models (MLLM)** 의 강력한 시각 이해 및 추론 능력을 활용하여 **확산 모델(diffusion models)** 의 편집 성능을 향상시키는 것을 목표로 합니다. 특히, 이미지와 비디오 편집 작업을 **단일 모델(unified framework)** 내에서 통합하고, 기존 연구에서 부족했던 **MLLM 설계 선택** 에 대한 심층적인 분석을 통해 최적의 통합 방안을 모색하고자 합니다.

## 핵심 방법론
InstructX는 **QWen2.5-VL-3B** MLLM을 이해 모듈로, **Wan2.1-14B DiT** 를 생성 모듈로 사용하는 **통합 프레임워크** 를 제안합니다. MLLM과 DiT 간의 연결은 **학습 가능한 쿼리(learnable queries)** 와 **2계층 MLP 커넥터** 를 통해 이루어지며, MLLM은 **LoRA(Low-Rank Adaptation)** 를 사용하여 미세 조정됩니다. 이미지와 비디오 데이터를 혼합하여 **3단계 훈련 전략(feature alignment, full-data training, quality fine-tuning)** 을 적용하고, **모달리티별 MLLM 특징** 을 통합합니다.

## 주요 결과
InstructX는 **ImgEdit-Bench** 및 **GEdit-Bench** 이미지 편집 벤치마크에서 **최고 수준의 성능** 을 달성하며 오픈소스 모델들을 능가했습니다 (ImgEdit-Bench Overall 점수 **3.85** ). 비디오 편집에서는 새로운 **VIE-Bench** 벤치마크에서 Style/Tone/Weather Change, Hybrid Edit, Ref-Based Swap 태스크에서 **가장 높은 평균 점수** 를 기록했으며, 일부 폐쇄형 모델에 **비견할 만한 경쟁력** 을 보였습니다. 특히, 이미지 데이터 학습만으로도 **명시적인 비디오 지도 없이** 비디오 편집 능력이 나타남을 확인했습니다.

## AI 실무자를 위한 시사점
이 연구는 **MLLM과 확산 모델을 통합한 시각 편집 프레임워크** 의 효과적인 설계를 제시하며, **이미지 데이터만으로 비디오 편집 능력을 유도** 할 수 있음을 보여주어 **희소한 비디오 훈련 데이터 문제** 를 완화할 수 있는 실용적인 방안을 제공합니다. AI 개발자들은 **MLLM-guided diffusion 모델** 을 활용하여 광범위한 이미지 및 비디오 편집 애플리케이션을 구축할 수 있으며, **모달리티별 쿼리** 를 통해 다중 모달리티 처리를 최적화하는 전략을 고려할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.