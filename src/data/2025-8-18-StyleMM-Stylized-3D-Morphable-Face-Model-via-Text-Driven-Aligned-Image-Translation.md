---
title: "[논문리뷰] StyleMM: Stylized 3D Morphable Face Model via Text-Driven Aligned Image
  Translation"
excerpt: "Junyong Noh이 [arXiv]에 게시한 'StyleMM: Stylized 3D Morphable Face Model via Text-Driven Aligned Image
  Translation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Morphable Model
  - Face Stylization
  - Text-to-Image Translation
  - Diffusion Model
  - Attribute Preservation
  - Generative AI
  - Computer Graphics

permalink: /ai/review/2025-8-18-StyleMM-Stylized-3D-Morphable-Face-Model-via-Text-Driven-Aligned-Image-Translation/

toc: true
toc_sticky: true

date: 2025-08-18 13:14:38+0900
last_modified_at: 2025-08-18 13:14:38+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.11203)

**저자:** Seungmi Lee, Kwan Yun, Junyong Noh



## 핵심 연구 목표
본 논문은 기존 3D Morphable Model (3DMM)의 한계, 즉 일관된 메쉬 구조, 분리된 제어, 그리고 사실적 범위를 넘어서는 스타일화라는 세 가지 핵심 요구사항을 동시에 충족하지 못하는 문제를 해결하고자 합니다. 사용자 정의 텍스트 설명에 따라 다양한 스타일의 3DMM을 자동으로 생성하는 프레임워크인 StyleMM을 개발하는 것이 주요 목표입니다.

## 핵심 방법론
StyleMM은 사실적인 인간 얼굴용으로 사전 훈련된 **메쉬 변형 네트워크(Dsrc)** 와 **텍스처 생성기(Gsrc)** 를 미세 조정하여 스타일화된 3DMM을 구축합니다. 특히, **Explicit Attribute-preserving Stylization (EAS)** 기법을 도입하여 이미지 스타일화 과정에서 얼굴의 아이덴티티, 표정, 정렬과 같은 핵심 속성들을 명시적으로 보존합니다. 이를 위해 **Explicit Attribute-preserving Module (EAM)** 을 **SDXL** 과 통합하여 얼굴 랜드마크, 머리 회전, 표정을 조건으로 사용합니다. 또한, **Consistent Displacement Loss (CDL)** 를 통해 스타일화 과정에서 아이덴티티 수준의 다양성을 유지하고 모드 붕괴를 방지합니다. 학습은 **Geometry Warm-up, Joint Fine-tuning, Texture Refinement** 의 3단계로 진행됩니다.

## 주요 결과
정량적 평가에서 StyleMM은 대부분의 평가된 스타일에서 **가장 높은 Face Diversity를 달성(평균 11.9)** 하여 다양한 아이덴티티 표현 능력을 입증했으며, **경쟁력 있는 Style Score (평균 0.28)** 를 기록하여 텍스트 프롬프트와의 높은 일치도를 보였습니다. 특히, **CDL 제거 시 Face Diversity가 1.812로 크게 감소** 하여 이 손실 함수의 효과를 명확히 보여주었습니다. 정성적 결과 또한 일관된 **vertex correspondence** 와 **shape, expression, texture의 분리된 제어** , 그리고 **사실적 범위를 넘어서는 표현적인 스타일화** 가 가능함을 시사합니다.

## AI 실무자를 위한 시사점
StyleMM은 대규모 스타일화된 3D 데이터셋 구축 없이도 **텍스트 기반 이미지 스타일화** 를 통해 복잡한 3DMM을 생성하는 혁신적인 접근법을 제시합니다. **EAS 및 EAM** 과 같은 **속성 보존 기법** 은 AI 기반 생성 모델에서 특정 특징을 유지하며 변형을 가해야 하는 시나리오에 유용하게 적용될 수 있습니다. 또한, **CDL** 은 생성 모델 학습 시 **다양성 유지 및 모드 붕괴 방지** 를 위한 효과적인 전략으로 활용 가능합니다. 이 기술은 영화, 애니메이션, 게임 분야에서 **캐릭터 제작 및 애니메이션 워크플로우를 효율화** 하는 데 크게 기여할 수 있는 잠재력을 가집니다. 다만, 극단적인 스타일화 시 기하학적 불일치나 **self-intersection** 등의 한계점은 향후 연구 과제입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.