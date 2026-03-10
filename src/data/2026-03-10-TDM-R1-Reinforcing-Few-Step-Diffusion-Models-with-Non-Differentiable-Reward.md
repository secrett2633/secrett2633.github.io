---
title: "[논문리뷰] TDM-R1: Reinforcing Few-Step Diffusion Models with Non-Differentiable Reward"
excerpt: "arXiv에 게시된 'TDM-R1: Reinforcing Few-Step Diffusion Models with Non-Differentiable Reward' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Reinforcement Learning
  - Non-Differentiable Rewards
  - Few-Step Generation
  - Trajectory Distribution Matching
  - Surrogate Reward Learning
  - Text-to-Image

permalink: /ai/review/2026-03-10-TDM-R1-Reinforcing-Few-Step-Diffusion-Models-with-Non-Differentiable-Reward/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.07700)

**저자:** Yihong Luo, Tianyang Hu, Weijian Luo, Jing Tang



## 핵심 연구 목표
이 논문은 **Few-Step Diffusion Models** 이 **비미분 가능한(non-differentiable) 보상 신호** 를 효과적으로 활용하도록 강화 학습(RL)하는 문제를 해결하는 것을 목표로 합니다. 기존 RL 접근 방식은 미분 가능한 보상 모델에 의존하여 인간의 이진 선호도, 객체 개수, OCR 기반 텍스트 렌더링 정확도와 같은 중요한 실제 보상 신호를 배제하는 한계가 있었습니다.

## 핵심 방법론
제안하는 **TDM-R1** 은 기존 **Trajectory Distribution Matching (TDM)** 모델을 기반으로 하며, 학습 과정을 **서로게이트 보상 학습(surrogate reward learning)** 과 **생성자 학습(generator learning)** 으로 분리합니다. 특히, **TDM의 결정론적 생성 궤적(deterministic generation trajectory)** 을 활용하여 각 스텝별 보상을 효율적이고 편향 없이 추정합니다. 또한, **그룹 기반 선호도 최적화(group-based preference optimization)** 를 통해 **확산 모델 기반의 동적 서로게이트 보상 모델** 을 학습하여 안정적인 RL 감독을 제공합니다.

## 주요 결과
**TDM-R1** 은 **GenEval 벤치마크** 에서 **80-NFE 기반 모델(63%)** 과 **GPT-4o(84%)** 를 능가하는 **92%** 의 GenEval 점수를 달성했으며, 단 **4 NFEs** 로 이를 이루었습니다. 또한, **Z-Image** 와 같은 강력한 대규모 모델에도 효과적으로 적용되어, **100-NFE** 및 Few-Step 변형 모델들을 **4 NFEs** 로도 일관되게 능가하는 성능을 보였습니다. 이는 시각적 품질 및 선호도 정렬에서도 우수한 결과를 보여줍니다.

## AI 실무자를 위한 시사점
**TDM-R1** 은 Few-Step Diffusion Models에 다양한 **비미분 가능한 보상 신호** 를 통합할 수 있는 강력한 RL 패러다임을 제공하여, 모델이 복잡한 지시 사항을 따르거나 특정 인간 선호도에 맞춰 미세 조정될 수 있는 길을 열었습니다. **4 NFEs** 의 초고속 생성 효율성은 산업 제품 및 서비스에 Few-Step 모델을 적용할 때 발생하는 비용과 지연 문제를 크게 줄여, 더욱 빠르고 사용자 정의 가능한 AI 생성 시스템 개발을 가속화할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.