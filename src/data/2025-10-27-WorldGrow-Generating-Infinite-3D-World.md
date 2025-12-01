---
title: "[논문리뷰] WorldGrow: Generating Infinite 3D World"
excerpt: "Jia Lu이 [arXiv]에 게시한 'WorldGrow: Generating Infinite 3D World' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D World Generation
  - Infinite Scene Synthesis
  - Block-wise Generation
  - Coarse-to-Fine
  - 3D Inpainting
  - Structured Latent Representation
  - Virtual Environments
  - World Models

permalink: /ai/review/2025-10-27-WorldGrow-Generating-Infinite-3D-World/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.21682)

**저자:** Sikuang Li, Chen Yang, Jiemin Fang, Taoran Yi, Jia Lu, Jiazhong Cen, Lingxi Xie, Wei Shen, Qi Tian



## 핵심 연구 목표
논문은 **무한히 확장 가능한(infinitely extendable) 3D 세계** 를 일관된 기하학적 구조와 사실적인 외관으로 생성하는 핵심 과제를 해결하고자 합니다. 기존 2D-lifting, 3D implicit representation, 객체 중심 3D 파운데이션 모델의 한계(불일치, 확장성 부족, 장면 생성 비적합성)를 극복하고, 사전 훈련된 3D 모델의 강력한 생성 능력을 구조화된 장면 블록 생성에 활용하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **WorldGrow** 라는 계층적 프레임워크를 제안합니다. 주요 구성요소는 (1) **데이터 큐레이션 파이프라인** 을 통해 고품질 장면 블록을 추출하고, **TRELLIS의 SLAT 표현** 을 **scene-friendly SLAT** 으로 개조하여 구조화된 3D 컨텍스트 모델링에 적합하게 만듭니다. (2) **3D 블록 인페인팅 메커니즘** 은 **흐름 기반 Transformer** 를 사용하여 주변 컨텍스트를 기반으로 누락된 블록을 채우고 공간적 연속성을 보장합니다. (3) **coarse-to-fine 생성 전략** 은 먼저 **거친 블록(coarse block)** 으로 전역 레이아웃을 형성한 다음, **미세 블록(fine block)** 으로 상세 기하학적 구조와 텍스처를 **SDEdit 기반 denoising** 방식으로 정제합니다.

## 주요 결과
**WorldGrow** 는 **3D-FRONT 데이터셋** 에서 SOTA 성능을 달성하며, 특히 기하학적 재구성 및 시각적 충실도에서 뛰어난 결과를 보였습니다. **MMD, COV, 1-NNA** 와 같은 기하학적 지표에서 기존 방법론들을 능가했으며, **FID_CLIP 지표에서 3.95** 로 가장 우수한 시각적 품질을 입증했습니다 (Table 2). 인간 평가(Human Preference Study)에서도 **구조적 타당성(SP), 기하학적 세부성(GD), 외관 충실도(AF), 연속성(CO)** 모든 지표에서 **평균 4.33~4.69점** 으로 기존 SOTA 방법을 크게 앞섰습니다 (Table 3). 또한, **UrbanScene3D** 야외 장면 생성에서도 **SynCity** 보다 우수한 **MMD(0.41), COV(41.80%), FID(23.49)** 성능을 보여 다양한 도메인으로의 확장성을 입증했습니다 (Table 6).

## AI 실무자를 위한 시사점
**WorldGrow** 는 대규모 3D 환경을 생성하는 효율적이고 실용적인 방법을 제시하여 **가상 세계 구축, embodied AI 훈련 및 시뮬레이션** 분야에 혁신을 가져올 수 있습니다. **블록 기반의 모듈화된 접근 방식** 과 **coarse-to-fine 생성 전략** 은 제한된 컴퓨팅 자원(예: 10x10 실내 장면 생성에 30분, 13GB 메모리)으로도 광범위하고 디테일한 3D 월드를 생성할 수 있는 실용적인 솔루션을 제공합니다. **장면 컨텍스트에 맞게 재설계된 SLAT 표현** 과 **3D 블록 인페인팅 기술** 은 기존 객체 중심 모델의 한계를 극복하고, 확장 가능한 고품질 3D 콘텐츠 생성 파이프라인 구축에 효과적으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.