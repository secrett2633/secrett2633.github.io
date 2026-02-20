---
title: "[논문리뷰] Personalized Safety Alignment for Text-to-Image Diffusion Models"
excerpt: "Kaidong Yu이 arXiv에 게시한 'Personalized Safety Alignment for Text-to-Image Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Personalized Safety Alignment
  - Text-to-Image Diffusion Models
  - DPO
  - User Preferences
  - Content Moderation
  - Generative AI
  - Cross-Attention
  - Safety Alignment

permalink: /ai/review/2025-8-5-Personalized-Safety-Alignment-for-Text-to-Image-Diffusion-Models/

toc: true
toc_sticky: true

date: 2025-08-05 11:40:52+0900
last_modified_at: 2025-08-05 11:40:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.01151)

**저자:** Yu Lei, Jinbin Bai, Qingyu Shi, Aosong Feng, Kaidong Yu



## 핵심 연구 목표
현재 텍스트-투-이미지(T2I) 확산 모델의 안전 메커니즘이 사용자의 다양한 연령, 정신 건강, 개인 신념 등의 선호도를 고려하지 않고 일률적인 기준을 적용하여 발생하는 한계를 해결하고자 합니다. 본 연구는 사용자별 안전 선호도에 맞춰 모델의 동작을 동적으로 조정하는 **개인화된 안전 정렬(PSA)** 프레임워크를 제안하여, 이미지 품질을 유지하면서도 맞춤형 유해 콘텐츠 제어를 목표로 합니다.

## 핵심 방법론
사용자별 안전 선호도 학습을 위해 **Sage 데이터셋** 을 구축했으며, 이는 10가지 민감한 카테고리와 800개 이상의 유해 개념을 포함합니다. 사용자 프로필(연령, 성별, 종교, 건강 상태)은 **Qwen2.5-7B LLM** 을 통해 생성된 **사용자 임베딩** 으로 변환됩니다. 이 임베딩은 확산 U-Net의 **cross-attention 어댑터 아키텍처** 를 통해 모델에 주입되며, **개인화된 DPO (LPPD)** 손실 함수를 사용하여 사용자 정의 안전 경계에 맞춰 모델을 최적화합니다.

## 주요 결과
PSA는 **SD v1.5** 및 **SDXL** 백본에서 유해 콘텐츠 억제 성능을 일관되게 향상시켰습니다. 특히 **SDXL** 기반에서 PSA-L5는 **I2P IP 점수 0.05** , **UD IP 점수 0.09** 를 달성하며 기존 SafetyDPO를 포함한 모든 기준선을 능가했습니다. 개인화된 안전 정렬 측면에서는 **SDXL** 에서 기준 모델 대비 **86.2%(seen)** 및 **80.7%(unseen)** 의 높은 **Win Rate** 를 기록했고, **Pass Rate** 또한 **SDXL** 에서 **58.76%(seen)** 및 **64.29%(unseen)** 로 우수했습니다.

## AI 실무자를 위한 시사점
이 연구는 T2I 모델의 **안전 제어에 개인화된 접근 방식** 을 도입함으로써, 사용자별로 최적화된 콘텐츠 생성 환경을 제공할 수 있는 중요한 가능성을 제시합니다. **사용자 임베딩과 크로스-어텐션 메커니즘** 을 활용한 개인화 방식은 다른 생성 AI 모델에도 적용 가능하며, **Sage 데이터셋** 은 향후 안전 및 윤리적 AI 연구를 위한 귀중한 자원이 될 것입니다. 이는 단순히 유해 콘텐츠를 차단하는 것을 넘어, **사용자 중심의 AI 시스템** 을 설계하는 데 중요한 기반을 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.