---
title: "[논문리뷰] SRPO: Self-Referential Policy Optimization for Vision-Language-Action Models"
excerpt: "이 [arXiv]에 게시한 'SRPO: Self-Referential Policy Optimization for Vision-Language-Action Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Vision-Language-Action Models
  - Reward Shaping
  - World Models
  - Self-Referential Learning
  - Robotics
  - Trajectory Optimization

permalink: /ai/review/2025-11-21-SRPO_Self-Referential_Policy_Optimization_for_Vision-Language-Action_Models/

toc: true
toc_sticky: true

date: 2025-11-21 00:00:00+0900+0900
last_modified_at: 2025-11-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.15605)

**저자:** Senyu Fei, Siyin Wang, Li Ji, et al.



## 핵심 연구 목표
Vision-Language-Action (VLA) 모델의 강화 학습(RL)에서 발생하는 **심각한 보상 희소성 문제**를 해결하고, 외부 전문가 시연이나 수동적인 보상 엔지니어링 없이 **높은 훈련 효율성**과 **일반화 능력**을 달성하는 것을 목표로 합니다. 특히 실패한 궤적에서 유용한 학습 신호를 추출하여 기존 GRPO 방식의 한계를 극복하고자 합니다.

## 핵심 방법론
본 논문은 **Self-Referential Policy Optimization (SRPO)**을 제안합니다. 이는 현재 훈련 배치 내에서 생성된 **성공적인 궤적**을 **자기 참조**로 활용하여 실패한 시도에 대해 **진행도 기반 보상 (progress-wise reward)**을 할당합니다. 특히, 사전 학습된 **월드 모델 (V-JEPA 2)**의 **잠재 세계 표현 (latent world representations)**을 사용하여 행동 유사성을 측정하고 보상을 구성하며, 성공 궤적 클러스터링을 위해 **DBSCAN**을 사용합니다.

## 주요 결과
SRPO는 **LIBERO 벤치마크**에서 **48.9%**의 기본 성공률에서 시작하여 단 **200 RL 단계** 만에 **99.2%**의 새로운 **최고 성능 성공률**을 달성하며 103%의 상대적 개선을 보였습니다. 또한, **LIBERO-Plus 벤치마크**에서 167%의 성능 향상을 통해 **강력한 일반화 능력**을 입증했으며, 실제 로봇 작업에서도 평균 **+66.8%에서 +86.7%**의 성공률 개선을 보여주었습니다.

## AI 실무자를 위한 시사점
SRPO는 로봇 조작을 위한 **VLA-RL 프레임워크**의 효율성과 자율성을 크게 향상시킵니다. **잠재 세계 표현**을 통한 **진행도 기반 보상**은 전문가 시연에 대한 의존도를 줄이고 훈련 비용을 절감하여 **실세계 로봇 시스템**에 VLA 모델을 보다 쉽게 배포할 수 있도록 합니다. 이는 **희소한 보상 환경**에서 학습하는 AI 에이전트의 개발에 중요한 진전을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.