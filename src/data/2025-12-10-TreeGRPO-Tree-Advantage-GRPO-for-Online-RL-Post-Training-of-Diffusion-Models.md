---
title: "[논문리뷰] TreeGRPO: Tree-Advantage GRPO for Online RL Post-Training of Diffusion Models"
excerpt: "Weirui Ye이 [arXiv]에 게시한 'TreeGRPO: Tree-Advantage GRPO for Online RL Post-Training of Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Diffusion Models
  - Generative Models
  - Tree Search
  - Sample Efficiency
  - Credit Assignment
  - GRPO
  - Visual Generative Models

permalink: /ai/review/2025-12-10-TreeGRPO-Tree-Advantage-GRPO-for-Online-RL-Post-Training-of-Diffusion-Models/

toc: true
toc_sticky: true

date: 2025-12-10 00:00:00+0900+0900
last_modified_at: 2025-12-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.08153)

**저자:** Zheng Ding, Weirui Ye



## 핵심 연구 목표
본 논문은 시각적 생성 모델의 RL 후학습(post-training) 시 발생하는 **막대한 계산 비용** 문제를 해결하고, 기존 방법론들의 **낮은 샘플 효율성** 과 **투박한 신용 할당** 한계를 극복하여 인간의 선호도에 더 잘 부합하는 모델을 효율적으로 정렬하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **TreeGRPO** 는 denoising 과정을 **탐색 트리** 로 재구성합니다. 이는 공유된 노이즈 샘플에서 시작하여 중간 단계에서 전략적으로 **분기(branching)** 하며, **공통 프리픽스(common prefixes)** 를 재사용하여 여러 후보 궤적을 효율적으로 탐색합니다. 트리를 통해 보상을 **역전파(reward backpropagation)** 하여 **단계별 이점(step-specific advantages)** 을 계산하고, 이 이점을 사용하여 **GRPO-스타일의 목적 함수** 를 최적화함으로써 정책을 업데이트합니다. 특히, **SDE 윈도우** 에서만 분기를 허용하고 그 외에는 **ODE 단계** 로 진행하여 효율성을 극대화합니다.

## 주요 결과
TreeGRPO는 기존 GRPO 기반 방법론 대비 **2.4배 더 빠른 학습 속도** 를 달성하면서도 효율성-보상 트레이드오프에서 **우수한 파레토 프론티어** 를 구축했습니다. 특히, 단일 보상 훈련 설정에서 **HPSv2.1 점수 0.3735** 와 **Aesthetic 점수 6.5094** 로 최상의 성능을 보였으며, **반복당 72.0초** 의 시간으로 모든 베이스라인 중 가장 빨랐습니다. 멀티 보상 설정에서도 경쟁 모델들을 능가하는 성능과 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
TreeGRPO는 시각적 생성 모델을 인간의 선호도에 맞춰 정렬하는 데 있어 **획기적인 계산 효율성** 을 제공합니다. **높은 샘플 효율성** 과 **정확한 단계별 신용 할당** 은 학습 시간과 리소스 소비를 크게 줄여주므로, 실무에서 대규모 생성 모델의 **RL 후학습 적용을 가속화** 할 수 있습니다. 이는 **더욱 견고하고 고품질의 생성 결과** 를 가능하게 하여 실제 서비스에 적용될 AI 모델의 품질 향상 및 개발 비용 절감에 직접적으로 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.