---
title: "[논문리뷰] Transition Models: Rethinking the Generative Learning Objective"
excerpt: "Yangguang Li이 [arXiv]에 게시한 'Transition Models: Rethinking the Generative Learning Objective' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generative Models
  - Diffusion Models
  - Training Objective
  - Continuous-Time Dynamics
  - State Transition
  - Few-Step Generation
  - Scalable Training
  - Image Generation

permalink: /ai/review/2025-9-5-Transition-Models-Rethinking-the-Generative-Learning-Objective/

toc: true
toc_sticky: true

date: 2025-09-05 13:07:20+0900
last_modified_at: 2025-09-05 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.04394)

**저자:** Zidong Wang, Yiyuan Zhang, Xiangyu Yue, Xiaoyu Yue, Yangguang Li, Wanli Ouyang, Lei Bai



## 핵심 연구 목표
본 논문은 반복적인 확산 모델의 높은 품질과 효율적인 소수 단계 모델의 성능 포화 사이의 근본적인 딜레마를 해결하고자 합니다. 이 충돌이 제한적인 훈련 목표에서 비롯된다고 판단하고, **임의의 유한 시간 간격(Δt)** 에 걸쳐 상태 전이를 분석적으로 정의하는 **정확한 연속 시간 동역학 방정식** 을 도입하여 새로운 생성 패러다임을 제시하는 것이 목표입니다.

## 핵심 방법론
제안하는 **Transition Models (TiM)** 은 상태 전이 동역학에 대한 **정확한 연속 시간 방정식** 을 기반으로 **새로운 훈련 목표** 를 정의합니다. 이 목표는 **내재적 궤적 일관성** 과 **시간 기울기 매칭(Time-Slope Matching)** 을 통해 모델이 생성 프로세스의 전체 해법 다양체(solution manifold)를 학습하도록 강제합니다. 특히, 시간 미분 계산을 위해 기존 JVP 대신 **Differential Derivation Equation (DDE)** 을 사용하여 **확장 가능한 훈련** 을 가능하게 합니다.

## 주요 결과
**TiM** 은 865M의 상대적으로 적은 파라미터로 **GenEval 벤치마크** 에서 모든 NFE(Number of Function Evaluations) 수에 걸쳐 최첨단 성능을 달성했습니다. 1-NFE에서 **0.67 GenEval 점수** 를 기록하고, 128-NFE에서는 **0.83** 까지 향상되며 **SD3.5-Large (8B)** 및 **FLUX.1 (12B)** 와 같은 대규모 모델을 능가했습니다. 또한, 최대 **4096x4096** 해상도에서 뛰어난 충실도를 제공하며, NFE 증가에 따른 품질의 단조로운 향상을 입증했습니다.

## AI 실무자를 위한 시사점
**TiM** 은 효율성과 품질 사이의 균형을 혁신적으로 개선하여 AI 실무자들이 **단일 모델** 로 다양한 생성 요구사항을 충족할 수 있게 합니다. **DDE** 를 통한 효율적인 훈련 방식은 **FlashAttention** 및 **FSDP** 와 같은 최적화 기법과의 호환성을 높여, **수십억 파라미터 규모의 파운데이션 모델** 을 처음부터 훈련하는 데 실용적인 길을 열어줍니다. 이는 대규모 언어/비전 모델 개발에서 계산 비용과 확장성 문제를 완화하는 데 중요한 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.