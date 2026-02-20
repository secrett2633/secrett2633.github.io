---
title: "[논문리뷰] Structure From Tracking: Distilling Structure-Preserving Motion for Video Generation"
excerpt: "Qifeng Chen이 arXiv에 게시한 'Structure From Tracking: Distilling Structure-Preserving Motion for Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Motion Tracking
  - Diffusion Models
  - Structure Preservation
  - SAM2
  - Feature Distillation
  - Local Gram Flow

permalink: /ai/review/2025-12-15-Structure-From-Tracking-Distilling-Structure-Preserving-Motion-for-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-15 00:00:00+0900+0900
last_modified_at: 2025-12-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.11792)

**저자:** Yang Fei, George Stoica, Jingyuan Liu, Qifeng Chen, Ranjay Krishna, Xiaojuan Wang, Benlin Liu



## 핵심 연구 목표
본 논문은 비디오 생성 모델, 특히 **diffusion 모델** 이 관절형 및 변형 가능한 객체에 대해 물리적으로 그럴듯하고 구조를 보존하는 움직임을 생성하는 데 겪는 어려움을 해결하는 것을 목표로 합니다. 기존 방식의 노이즈가 많거나 불완전한 외부 모션 표현(예: 광학 흐름, 스켈레톤)에 대한 의존성을 넘어, 모델 자체의 내재적인 구조 이해를 강화하고자 합니다.

## 핵심 방법론
제안된 **SAM2VideoX** 모델은 최첨단 비디오 트래킹 모델인 **SAM2** 의 구조 보존 모션 사전 정보를 **CogVideoX** 와 같은 비디오 Diffusion 모델로 증류(distillation)합니다. 이를 위해 (1) **양방향 특징 융합 모듈** 을 도입하여 **SAM2** 의 순환(causal) 특징에서 전역적인 구조 보존 모션 사전 정보를 추출하고, (2) **Local Gram Flow loss** 를 사용하여 국부적인 특징들이 함께 움직이는 방식을 정렬합니다. **DiT** 모델의 중간 특징을 **SAM2** 의 특징 공간으로 투영한 후 **KL divergence** 기반의 손실 함수를 적용하여 학습을 진행합니다.

## 주요 결과
**VBench** 평가에서 **SAM2VideoX** 는 **95.51%** 의 Motion Score를 달성하여 기존 **REPA(92.91%)** 보다 **2.60%** P 향상되었습니다. 또한, FVD(Fréchet Video Distance)를 **360.57** 로 크게 감소시켜 **REPA** 및 **LoRA-finetuning** 대비 각각 **21.20%** 및 **22.46%** 개선을 보였습니다. 인간 선호도 조사에서는 참가자의 **71.4%** 가 본 모델의 결과를 선호하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
본 연구는 외부 제어 신호 없이 복잡한 움직임을 가진 비디오를 생성하는 AI 모델의 현실성과 일관성을 크게 향상시킬 수 있는 실용적인 방법론을 제시합니다. 특히 **SAM2** 와 같은 강력한 트래킹 모델의 내재된 모션 이해를 증류하는 접근 방식은, **Diffusion 모델** 이 더욱 견고한 구조 보존 움직임을 학습하는 데 활용될 수 있음을 보여줍니다. 이는 **합성 데이터 생성** , **가상 환경 시뮬레이션** 등 다양한 AI 애플리케이션의 품질을 높이는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.