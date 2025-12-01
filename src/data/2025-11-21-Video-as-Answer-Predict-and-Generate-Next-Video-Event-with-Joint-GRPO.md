---
title: "[논문리뷰] Video-as-Answer: Predict and Generate Next Video Event with Joint-GRPO"
excerpt: "이 [arXiv]에 게시한 'Video-as-Answer: Predict and Generate Next Video Event with Joint-GRPO' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Next Event Prediction
  - Reinforcement Learning
  - Vision-Language Model
  - Video Diffusion Model
  - Joint Optimization
  - Multimodal AI
  - Procedural Learning

permalink: /ai/review/2025-11-21-Video-as-Answer-Predict-and-Generate-Next-Video-Event-with-Joint-GRPO/

toc: true
toc_sticky: true

date: 2025-11-21 00:00:00+0900+0900
last_modified_at: 2025-11-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.16669)

**저자:** Junhao Cheng¹†, Liang Hou², Xin Tao², Jing Liao¹



## 핵심 연구 목표
이 연구는 기존의 텍스트 기반 다음 이벤트 예측(NEP)의 한계를 넘어, **비디오를 답변으로 제공** 하는 새로운 패러다임인 **Video-Next-Event Prediction (VNEP)** 을 개척합니다. 이는 복잡한 절차적 학습이나 예측적 시나리오에서 언어만으로는 전달하기 어려운 물리적 세계 정보를 직관적이고 맞춤화된 비디오로 제공하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 모델인 **VANS** 는 **Vision-Language Model (VLM)** 을 통해 질문 기반 추론을 수행하고, **Video Diffusion Model (VDM)** 을 통해 비디오를 생성하는 시스템입니다. 특히, **Joint-GRPO (Group Relative Policy Optimization)** 라는 2단계 강화 학습 전략을 사용하여 VLM과 VDM을 공동으로 최적화하며, 모델들의 출력을 기반으로 한 공유 보상을 통해 **시맨틱-비주얼 정합성** 을 달성합니다. 이를 위해 **VANS-Data-100K** 라는 10만 개의 비디오-질문-답변 데이터셋을 구축하여 학습에 활용했습니다.

## 주요 결과
**VANS (Joint-GRPO)** 는 절차적 벤치마크에서 **ROUGE-L 0.3631** , **CLIP-V 0.8021** 을 달성하며, 가장 강력한 캐스케이드 방식의 기준 모델인 **Gemini-FilmWeaver** 를 큰 폭으로 능가했습니다. 특히 **Joint-GRPO** 전략은 SFT 버전 대비 ROUGE-L에서 **29.1%** (0.2812 → 0.3631), CLIP-T에서 **19.4%** (0.3202 → 0.3824)의 상대적 성능 향상을 가져왔으며, **FVD를 78.32** 까지 낮추는 효과를 보였습니다. 인간 평가에서도 **VANS (Joint-GRPO)** 는 시맨틱 정확성, 시각적 일관성, 전반적인 만족도에서 최고 점수를 기록했습니다.

## AI 실무자를 위한 시사점
이 연구는 **비디오를 직접적인 답변으로 제공** 함으로써 사용자 경험을 혁신하고 AI의 응용 범위를 확장할 수 있음을 보여줍니다. 특히, **VLM과 VDM을 강화 학습 기반으로 공동 최적화** 하는 **Joint-GRPO** 접근 방식은 멀티모달 모델 간의 시맨틱-비주얼 불일치를 해결하는 효과적인 전략으로, 향후 유사한 멀티모달 생성 태스크에 적용될 수 있습니다. **VANS-Data-100K** 와 같은 고품질 데이터셋의 구축은 복잡한 멀티모달 추론 및 생성 모델 개발에 필수적인 자원임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.