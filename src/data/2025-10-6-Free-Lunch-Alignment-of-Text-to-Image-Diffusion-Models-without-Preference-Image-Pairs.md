---
title: "[논문리뷰] Free Lunch Alignment of Text-to-Image Diffusion Models without
  Preference Image Pairs"
excerpt: "arXiv에 게시된 'Free Lunch Alignment of Text-to-Image Diffusion Models without
  Preference Image Pairs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Image Models
  - Diffusion Models
  - Preference Optimization
  - LLMs
  - RLHF
  - Prompt Editing
  - Free Lunch Alignment
  - TDPO
  - TKTO

permalink: /ai/review/2025-10-6-Free-Lunch-Alignment-of-Text-to-Image-Diffusion-Models-without-Preference-Image-Pairs/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25771)

**저자:** Jia Jun Cheng Xian, Muchen Li, Haotian Yang, Xin Tao, Pengfei Wan, Leonid Sigal, Renjie Liao



## 핵심 연구 목표
본 연구는 확산 기반 Text-to-Image (T2I) 모델의 텍스트-이미지 정렬(alignment)을 개선하는 것을 목표로 합니다. 특히, 기존의 **강화 학습(RLHF)** 및 **선호도 기반 최적화(DPO, KTO)** 방법론이 요구하는 **고비용의 인간 선호도 이미지 쌍 데이터** 없이, "무료 점심(free-lunch)" 방식으로 정렬을 달성하고자 합니다.

## 핵심 방법론
저자들은 **Text Preference Optimization (TPO)** 이라는 새로운 프레임워크를 제안합니다. 이 방법론은 인간 선호도 이미지 쌍 대신 **LLM(Large Language Model)을 활용하여 원본 캡션을 조작함으로써, 일치하는 프롬프트와 불일치하는 프롬프트 쌍을 자동 생성** 합니다. 이 프롬프트 조작은 **콘텐츠, 속성, 공간, 문맥적 수정** 의 네 가지 원칙에 따라 이루어집니다. 이렇게 생성된 텍스트 선호도 데이터 쌍을 사용하여 **DPO** 와 **KTO** 를 TPO 설정에 맞게 확장한 **TDPO** 와 **TKTO** 를 통해 확산 모델을 정렬합니다. 학습 과정의 안정화를 위해 **네거티브 샘플 항에 클리핑 메커니즘** 을 도입했습니다.

## 주요 결과
**Stable Diffusion v1.5** 모델을 사용하여 다양한 벤치마크(HPSv2, Parti-Prompts, Pick-a-Pic, OpenImagePref)에서 정량적 및 정성적 평가를 수행했습니다. 제안된 **TDPO** 및 **TKTO** 방법은 모든 데이터셋 및 평가 지표에서 기존 **Diffusion-DPO** 및 **Diffusion-KTO** 베이스라인을 일관되게 능가했습니다. 예를 들어, **HPSv2** 데이터셋의 **PickScore** 에서 **Ours-TDPO** 는 **83.25%의 승률** 을 달성하여 **Diff-DPO** 의 77.00%를 뛰어넘었습니다. 또한, 암묵적 선호도 점수와 인간 선호도 점수 사이에 강한 양의 상관관계가 있음을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 **고비용의 인간 선호도 데이터** 없이 T2I 모델의 정렬 성능을 크게 향상시킬 수 있는 실용적인 방법을 제시합니다. 이는 AI 모델 개발 비용을 절감하고 확장성을 높이는 데 기여할 수 있습니다. **LLM을 활용한 프롬프트 엔지니어링** 을 통해 합성 선호도 데이터를 생성하는 접근 방식은 다양한 도메인에서 모델 정렬 문제에 적용될 수 있는 잠재력을 가집니다. 특히, **기존의 DPO 및 KTO와 같은 선호도 기반 알고리즘에 쉽게 통합될 수 있는 일반화된 프레임워크** 를 제공하여, AI 개발자들이 보다 효율적으로 T2I 모델을 최적화할 수 있도록 돕습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.