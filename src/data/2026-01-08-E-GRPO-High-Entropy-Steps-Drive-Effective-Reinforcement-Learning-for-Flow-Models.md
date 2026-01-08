---
title: "[논문리뷰] E-GRPO: High Entropy Steps Drive Effective Reinforcement Learning for Flow Models"
excerpt: "이 [arXiv]에 게시한 'E-GRPO: High Entropy Steps Drive Effective Reinforcement Learning for Flow Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Flow Models
  - Entropy-aware Sampling
  - Group Relative Policy Optimization
  - SDE
  - Human Preference Alignment
  - Image Generation

permalink: /ai/review/2026-01-08-E-GRPO-High-Entropy-Steps-Drive-Effective-Reinforcement-Learning-for-Flow-Models/

toc: true
toc_sticky: true

date: 2026-01-08 00:00:00+0900+0900
last_modified_at: 2026-01-08 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.00423)

**저자:** Shengjun Zhang, Zhang Zhang, Chensheng Dai, Yueqi Duan



## 핵심 연구 목표
기존 **GRPO(Group Relative Policy Optimization)** 기반의 플로우 모델들이 여러 디노이징 타임스텝에 걸쳐 정책을 최적화할 때 발생하는 **희소하고 모호한 보상 신호** 문제를 해결하는 것이 목표입니다. 특히, 모든 타임스텝에 걸쳐 균일하게 최적화하는 한계를 극복하고, **높은 엔트로피 타임스텝** 에서 더 효율적이고 효과적인 탐색을 유도하여 생성 모델의 인간 선호도 정렬 성능을 향상시키고자 합니다.

## 핵심 방법론
본 논문은 엔트로피를 고려한 **E-GRPO** 방법론을 제안합니다. 이는 **엔트로피 기반 스텝 병합 전략** 과 **다단계 그룹 정규화 어드밴티지 추정** 을 통합합니다. 구체적으로, 여러 **낮은 엔트로피 SDE(Stochastic Differential Equation) 스텝** 들을 하나의 효과적인 **높은 엔트로피 SDE 스텝** 으로 통합하고, 나머지 스텝에는 **ODE(Ordinary Differential Equation) 샘플링** 을 적용하여 탐색의 모호성을 제거합니다. 또한, 동일한 통합 SDE 디노이징 스텝을 공유하는 샘플 내에서 **그룹 상대적 어드밴티지** 를 계산하여 조밀하고 신뢰할 수 있는 보상 신호를 제공합니다.

## 주요 결과
실험 결과, 제안된 **E-GRPO** 는 단일 HPS-v2.1 보상 설정에서 **DanceGRPO** 를 **HPS 메트릭에서 10.8%p 능가** 하며 최신 성능을 달성했습니다 (adaptive merging strategy에서 **HPS 0.391** ). 다중 보상 설정(HPS-v2.1 + CLIP 점수)에서도 **ImageReward를 32.4%** , **PickScore를 4.4% 향상** 시키는 등 강력한 성능을 보였습니다. 특히, 초기 고엔트로피 스텝에 집중한 학습이 전체 스텝 학습보다 더 나은 성능과 효율성을 보임을 정량적으로 입증했습니다.

## AI 실무자를 위한 시사점
**E-GRPO** 는 흐름 모델 기반 이미지 생성에서 **RLHF(Reinforcement Learning from Human Feedback)** 의 효율성과 안정성을 크게 향상시킬 수 있습니다. 특히, 엔트로피 분석을 통해 **의미 있는 탐색이 발생하는 디노이징 스텝** 에 자원을 집중함으로써 학습 과정을 최적화할 수 있음을 보여줍니다. 이는 리소스가 제한된 환경에서 모델 학습의 효율성을 높이고, 생성 모델이 복잡한 인간의 선호도를 더 정확하게 반영하도록 돕는 중요한 설계 원칙을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.