---
title: "[논문리뷰] Equilibrium Matching: Generative Modeling with Implicit Energy-Based
  Models"
excerpt: "이 [arXiv]에 게시한 'Equilibrium Matching: Generative Modeling with Implicit Energy-Based
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generative Models
  - Equilibrium Dynamics
  - Energy-Based Models (EBMs)
  - Flow Matching
  - Diffusion Models
  - Optimization-Based Sampling
  - Image Generation

permalink: /ai/review/2025-10-8-Equilibrium_Matching_Generative_Modeling_with_Implicit_Energy-Based_Models/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.02300)

**저자:** Runqian Wang, Yilun Du



## 핵심 연구 목표
기존 확산(Diffusion) 및 플로우(Flow) 기반 생성 모델의 **비평형, 시간-조건부 동역학**의 한계를 극복하고, 단일 **시간 불변 평형 기울기**를 학습하는 새로운 생성 모델링 프레임워크인 **Equilibrium Matching (EqM)**을 제안하는 것이 목표입니다. 이를 통해 최적화 기반 샘플링을 가능하게 하고, 샘플링 유연성과 효율성을 개선하며, 기존 모델에서는 지원되지 않던 고유한 속성을 제공하고자 합니다.

## 핵심 방법론
EqM은 시간-조건부 역학을 버리고 **암시적 에너지 경관의 평형 기울기**를 학습합니다. 훈련 목표인 **`LeqM = (f(xy) – (e – x)c(γ))²`**를 통해 데이터 다양체(manifold)에서 기울기가 0이 되도록 설계되었으며, **`c(γ)`** 함수는 기울기 크기를 조절합니다. 추론 시에는 학습된 경관에서 **경사 하강법(Gradient Descent)**을 사용하여 샘플을 생성하며, **Nesterov Accelerated Gradient (NAG-GD)** 및 **적응형 컴퓨트(Adaptive Compute)**와 같은 최적화 기술을 활용하여 샘플링 효율성을 높입니다.

## 주요 결과
EqM은 **ImageNet 256x256** 이미지 생성에서 **FID 1.90**을 달성하여 기존 확산/플로우 모델을 능가하는 **최첨단 성능**을 보였습니다. 특히 **SiT-XL/2** 모델에 대해 **FID 2.10 (Euler ODE)** 및 **FID 2.06 (Heun SDE)**의 Flow Matching 모델보다 우수했습니다. 또한, **부분적으로 노이즈가 있는 이미지 디노이징**, **OOD 탐지(AUROC 0.68)**, 그리고 **이미지 합성**과 같은 독특한 능력을 입증했습니다.

## AI 실무자를 위한 시사점
EqM은 **확산 모델의 성능**과 **EBM의 유연성**을 결합한 새로운 생성 모델링 패러다임을 제공합니다. **최적화 기반 샘플링**은 적응형 스텝 사이즈, 다양한 옵티마이저, 적응형 컴퓨트 할당 등 **추론 시 높은 유연성**을 가능하게 하여, 실제 AI 시스템에 통합될 때 효율적인 리소스 관리를 기대할 수 있습니다. **부분 노이즈 처리** 및 **OOD 탐지**와 같은 내장된 기능은 다양한 응용 분야에서 잠재적 가치를 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.