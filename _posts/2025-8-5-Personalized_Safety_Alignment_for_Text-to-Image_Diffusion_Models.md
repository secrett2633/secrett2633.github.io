---
title: "[논문리뷰] Personalized Safety Alignment for Text-to-Image Diffusion Models"
excerpt: "Kaidong Yu이 [arXiv]에 게시한 'Personalized Safety Alignment for Text-to-Image Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:  - Review
  - Personalized Safety Alignment
  - Text-to-Image Diffusion Models
  - User Profiles
  - Harmful Content Suppression
  - Direct Preference Optimization (DPO)
  - Content Moderation
  - Diffusion Models

permalink: /ai/review/2025-8-5-Personalized_Safety_Alignment_for_Text-to-Image_Diffusion_Models/

toc: true
toc_sticky: true

date: 2025-08-05 11:12:10+0900
last_modified_at: 2025-08-05 11:12:10+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.01151)

# Personalized Safety Alignment for Text-to-Image Diffusion Models

**저자:** Yu Lei, Jinbin Bai†, Qingyu Shi, Aosong Feng, Kaidong Yu

**키워드:** `Personalized Safety Alignment`, `Text-to-Image Diffusion Models`, `User Profiles`, `Harmful Content Suppression`, `Direct Preference Optimization (DPO)`, `Content Moderation`, `Diffusion Models`

## 핵심 연구 목표
본 논문은 텍스트-이미지(T2I) 확산 모델이 개인의 연령, 정신 건강, 신념 등 다양한 안전 선호도를 반영하지 못하고 획일적인 안전 기준을 적용하는 문제를 해결하고자 합니다. 사용자별 맞춤형 안전 제어를 통해 유해 콘텐츠 생성을 효과적으로 억제하고 사용자 선호도에 더 잘 부합하는 콘텐츠를 생성하는 것을 목표로 합니다.

## 핵심 방법론
사용자별 안전 선호도를 T2I 확산 과정에 통합하는 **Personalized Safety Alignment (PSA)** 프레임워크를 제안합니다. 이를 위해 사용자 선호도를 담은 새로운 데이터셋 **Sage**를 구축하고, 이 프로필을 **교차-어텐션 메커니즘**을 통해 확산 모델에 주입합니다. 특히, **개인화된 Diffusion DPO (LPPD)** 손실 함수를 활용하여 사용자별 안전 경계를 학습하고 **Stable Diffusion v1.5** 및 **SDXL** 모델에 적용합니다.

## 주요 결과
**PSA**는 기존 안전 메커니즘 대비 유해 콘텐츠 억제에서 뛰어난 성능을 입증했습니다. 특히 **SDXL** 기반 실험에서 **Win Rate**는 **SafetyDPO** 대비 **seen 사용자**에서 **80.7% (vs. 38.6%)**, **unseen 사용자**에서 **56.4% (vs. 42.0%)**로 크게 향상되었습니다. 또한, **IP(Inappropriate Probability)** 측면에서 **SDXL PSA-L5**는 **I2P**에서 **0.05**, **UD**에서 **0.09**를 달성하여 기존 방식보다 현저히 낮은 유해 콘텐츠 생성 비율을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 생성형 AI의 안전성을 **개인화된 관점**에서 접근하여 사용자별 맞춤형 콘텐츠 제어의 가능성을 제시합니다. **LLM**을 활용한 사용자 프로필 생성 및 데이터셋 구축 방식은 실제 서비스에 적용될 수 있는 효율적인 데이터 확보 전략을 제공하며, 다양한 문화적, 개인적 윤리 기준을 반영해야 하는 서비스 개발에 실질적인 도움을 줄 수 있습니다. 하지만 합성 프로필 의존성으로 인한 실제 사용자 입력 복잡성 반영의 한계는 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.