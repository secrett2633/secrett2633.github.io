---
title: "[논문리뷰] Understanding vs. Generation: Navigating Optimization Dilemma in Multimodal Models"
excerpt: "Liwei Wang이 [arXiv]에 게시한 'Understanding vs. Generation: Navigating Optimization Dilemma in Multimodal Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Models
  - Generative AI
  - Understanding
  - Reason-Reflect-Refine (R3)
  - Reinforcement Learning (RL)
  - Text-to-Image Generation
  - Optimization Dilemma
  - Image Editing

permalink: /ai/review/2026-02-18-Understanding-vs-Generation-Navigating-Optimization-Dilemma-in-Multimodal-Models/

toc: true
toc_sticky: true

date: 2026-02-18 00:00:00+0900+0900
last_modified_at: 2026-02-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.15772)

**저자:** Sen Ye, Mengde Xu, Shuyang Gu, Di He, Liwei Wang, Han Hu



## 핵심 연구 목표
멀티모달 모델에서 생성 능력과 이해 능력 향상이 서로 상충되는 "최적화 딜레마"를 해결하는 것을 목표로 합니다. 생성과 이해가 경쟁적 목표가 아닌 시너지를 발휘하도록 하여, 강력한 생성 성능과 개선된 이해 능력을 동시에 달성하는 통합 프레임워크를 제시합니다.

## 핵심 방법론
이 논문은 **Reason-Reflect-Refine (R3) 프레임워크** 를 제안합니다. 이는 단일 단계의 생성 작업을 "생성-이해-재생성"의 다단계 프로세스로 재구성합니다. **Reason** 단계에서 초기 계획과 이미지를 생성하고, **Reflect** 단계에서 모델의 출력물을 평가하며, **Refine** 단계에서 수정 지침에 따라 이미지를 개선합니다. 이 반복적인 과정은 **Tree-RL 전략** 을 사용하여 학습 효율을 높이고, **GRPO** 및 **FlowGRPO** 를 활용하여 정책을 최적화합니다.

## 주요 결과
제안된 R3 프레임워크는 GenEval++ 벤치마크에서 **0.689** 의 생성 성능을 달성하여 베이스라인 **BAGEL (0.371)** 및 SOTA 모델인 **Echo-40 (0.679)** 을 능가했습니다. 또한, 이해 능력 평가에서 ITA 점수는 **73.37%** 로 BAGEL의 **60.60%** 대비 크게 향상되었으며, VQA 점수는 **89.63%** 로 BAGEL의 **86.48%** 대비 개선되었습니다. 특히, 카운팅 정확도는 **79.3%에서 84.6%** 로 증가하여 이해 능력의 동시 향상을 입증했습니다.

## AI 실무자를 위한 시사점
R3 프레임워크는 멀티모달 AI 개발에서 고질적인 생성-이해 딜레마를 효과적으로 해결하는 실용적인 접근법을 제시합니다. 모델의 이해 능력을 생성 과정에 적극적으로 통합함으로써, AI/ML 엔지니어는 더 강력하고 일관된 출력물을 생성하는 동시에 모델의 인지 능력까지 향상시킬 수 있습니다. 이는 차세대 통합 멀티모달 모델 설계에 대한 중요한 통찰력을 제공하며, 효율적인 다단계 생성 및 검증 파이프라인 구축에 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.