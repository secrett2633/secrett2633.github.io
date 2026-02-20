---
title: "[논문리뷰] Qwen-Image Technical Report"
excerpt: "Kaiyuan Gao이 arXiv에 게시한 'Qwen-Image Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Generation
  - Text-to-Image
  - Image Editing
  - Text Rendering
  - Multimodal Diffusion Transformer
  - Curriculum Learning
  - Reinforcement Learning
  - Foundation Model

permalink: /ai/review/2025-8-5-Qwen-Image-Technical-Report/

toc: true
toc_sticky: true

date: 2025-08-05 11:40:52+0900
last_modified_at: 2025-08-05 11:40:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.02324)

**저자:** Kaiyuan Gao, Junyang Lin, Jingren Zhou, Jiahao Li, Chenfei Wu



## 핵심 연구 목표
본 논문은 복잡한 텍스트 렌더링 및 정밀한 이미지 편집 분야에서 기존 텍스트-이미지(T2I) 모델의 한계를 해결하는 것을 목표로 합니다. 특히, 다중 줄 레이아웃, 비알파벳 언어(예: 중국어) 렌더링, 그리고 편집 시 의미적/시각적 일관성 유지의 어려움을 극복하여, 광범위한 일반 기능과 탁월한 텍스트 렌더링 정확성을 겸비한 **Qwen-Image** 파운데이션 모델을 개발하고자 합니다.

## 핵심 방법론
**Qwen-Image** 는 **이중 스트림 MMDiT(Multimodal Diffusion Transformer)** 아키텍처를 기반으로 합니다. **Qwen2.5-VL** 모델에서 추출한 의미론적 텍스트 특징과 **VAE 인코더** 에서 얻은 재구성적 이미지 특징을 통합하는 **이중 인코딩 메커니즘** 을 사용하여 편집 일관성을 높였습니다. 복잡한 텍스트 렌더링을 위해 대규모 데이터 수집, 필터링, 합성, 균형 조정을 포함하는 포괄적인 **데이터 파이프라인** 과 단순한 텍스트부터 문단 수준의 설명까지 점진적으로 학습하는 **커리큘럼 학습 전략** 을 적용했습니다. 또한, **Multimodal Scalable ROPE (MSROPE)** 라는 새로운 위치 인코딩 스키마를 도입하여 이미지 및 텍스트 모달리티의 위치 정보를 효과적으로 인코딩합니다.

## 주요 결과
**Qwen-Image** 는 이미지 생성 및 편집 분야에서 **GenEval, DPG, OneIG-Bench, GEdit, ImgEdit, GSO** 등 다수의 공개 벤치마크에서 **최첨단(SOTA) 성능** 을 달성했습니다. 특히 텍스트 렌더링에서 뛰어난 성능을 보였으며, **ChineseWord** 벤치마크에서는 **58.30%의 전체 정확도** 를 기록하여 기존 **Seedream 3.0(33.05%)** 및 **GPT Image 1 [High](36.14%)** 모델을 크게 앞섰습니다. 이미지 편집 벤치마크인 **ImgEdit** 에서는 **4.27** 이라는 최고 전체 점수를 기록하며 **GPT Image 1 [High](4.20)** 보다 우위를 점했습니다.

## AI 실무자를 위한 시사점
**Qwen-Image** 는 이미지 생성 및 편집 분야에서 **최첨단 파운데이션 모델** 로서, 특히 기존 모델들이 어려움을 겪던 고품질 **텍스트 렌더링** 과 **이미지 편집 일관성** 문제를 효과적으로 해결했습니다. 이는 **중국어와 같은 복잡한 비알파벳 언어** 의 텍스트 생성 및 **미세한 이미지 수정** 이 필요한 실제 애플리케이션에서 높은 실용성을 제공합니다. 본 논문의 **포괄적인 데이터 파이프라인** 및 **점진적 학습 전략** 은 향후 대규모 멀티모달 모델 개발에 중요한 방법론적 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.