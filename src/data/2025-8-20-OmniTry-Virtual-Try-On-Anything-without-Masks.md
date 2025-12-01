---
title: "[논문리뷰] OmniTry: Virtual Try-On Anything without Masks"
excerpt: "Xiaoduan Feng이 [arXiv]에 게시한 'OmniTry: Virtual Try-On Anything without Masks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Virtual Try-On
  - Diffusion Model
  - Mask-Free
  - Image Inpainting
  - ID Consistency
  - Wearable Objects
  - Generative AI

permalink: /ai/review/2025-8-20-OmniTry-Virtual-Try-On-Anything-without-Masks/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.13632)

**저자:** Xiaoduan Feng, Linlin Zhang, Hengyuan Cao, Yiming Chen, Jian Cao, Yuxiong Wu, Bin Wang



## 핵심 연구 목표
이 논문은 기존 가상 착용(VTON) 기술이 의류에 국한되고 입력 마스크를 필요로 하는 한계를 극복하고자 합니다. 마스크 없이도 주얼리, 액세서리 등 **다양한 종류의 착용 가능한 객체** 를 가상으로 착용시켜볼 수 있는 **범용적인 VTON 프레임워크인 OmniTry** 를 개발하여, 실제 응용 분야의 폭넓은 확장을 목표로 합니다.

## 핵심 방법론
**OmniTry** 는 두 단계의 학습 파이프라인과 **확산 모델(Diffusion Model)** 을 활용합니다. 첫 번째 단계에서는 **마스크가 필요 없는 지역화(Mask-Free Localization)** 를 위해 **대규모 비쌍둥이 이미지** 와 **텍스트-투-이미지 인페인팅 모델** ( **Diffusion Transformer, DiT** 기반)을 사용하여 객체를 제거하고 빈 영역을 채웁니다. 이 과정에서 **트레이스리스 지우기(traceless erasing)** 전략을 도입하여 자연스러운 합성 결과를 만듭니다. 두 번째 단계에서는 **ID 일관성 전이(ID Consistency Transferring)** 를 위해 **쌍둥이 이미지** 로 모델을 미세 조정하여 객체의 정체성과 인물 보존을 강화합니다.

## 주요 결과
**OmniTry** 는 자체 구축한 **OmniTry-Bench** 벤치마크에서 기존 VTON 방식들을 뛰어넘는 성능을 보였습니다. 특히, 전체 데이터셋에서 **객체 일관성(M-DINO) 0.6160** , **인물 보존(SSIM) 0.9333** 의 높은 수치를 달성하며 우수성을 입증했습니다. 이는 마스크 없이도 다양한 객체에 대해 **강력한 일반화 성능** 과 **높은 합성 품질** 을 제공함을 의미합니다.

## AI 실무자를 위한 시사점
**OmniTry** 는 의류뿐만 아니라 주얼리, 액세서리 등 광범위한 착용 가능한 객체에 대한 **마스크 없는 가상 착용 기능** 을 제공함으로써 이커머스, 패션 테크 분야에서 **새로운 사용자 경험** 을 창출할 수 있습니다. **확산 모델 기반의 2단계 학습 전략** 과 **대규모 비쌍둥이 데이터 활용** 은 데이터 제약이 있는 환경에서도 유연하게 적용될 수 있는 **강력한 생성 AI 모델 개발 패러다임** 을 제시하며, 향후 다양한 생성형 AI 애플리케이션에 대한 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.