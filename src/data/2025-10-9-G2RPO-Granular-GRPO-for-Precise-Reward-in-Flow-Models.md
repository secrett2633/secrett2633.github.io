---
title: "[논문리뷰] G^2RPO: Granular GRPO for Precise Reward in Flow Models"
excerpt: "이 [arXiv]에 게시한 'G^2RPO: Granular GRPO for Precise Reward in Flow Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Flow Models
  - Generative Models
  - Human Preference Alignment
  - Stochastic Differential Equations (SDE)
  - Reward Signal
  - Multi-Granularity

permalink: /ai/review/2025-10-9-G2RPO-Granular-GRPO-for-Precise-Reward-in-Flow-Models/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01982)

**저자:** Yujie Zhou, Pengyang Ling, Jiazi Bu, Yibin Wang, Yuhang Zang, Jiaqi Wang, Li Niu, Guangtao Zhai



## 핵심 연구 목표
본 논문은 확산 및 플로우 모델에서 인간 선호도에 맞춰 생성 모델을 정렬하는 기존 **GRPO(Group Relative Policy Optimization)** 방법론의 한계, 즉 **희소하고 부정확한 보상 신호** 및 **불완전한 평가** 문제를 해결하고자 합니다. 특히, 샘플링 방향에 대한 정확하고 포괄적인 보상 평가를 통해 플로우 모델의 강화 학습 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Singular Stochastic Sampling** 전략을 도입하여 **SDE(Stochastic Differential Equations)** 샘플링 시 개별 단계에만 확률성을 집중시켜 보상과 주입된 노이즈 간의 강한 상관관계를 확보합니다. 또한, **Multi-Granularity Advantage Integration (MGAI)** 모듈을 제안하여, 다양한 스케일에서 얻은 이점을 통합함으로써 샘플링 방향에 대한 보다 포괄적이고 견고한 평가를 가능하게 합니다.

## 주요 결과
**G²RPO** 는 기존 플로우 기반 **GRPO** 모델들 대비 우수한 성능을 보였습니다. 특히, **HPS-v2.1** 및 **CLIP Score** 를 사용한 공동 훈련 시 **G²RPO** 는 **HPS-v2.1 스코어 0.376** , **CLIP 스코어 0.406** , **ImageReward 1.483** , **Unified Reward 3.783** 를 달성하여 모든 평가 지표에서 기준 모델들을 능가했습니다. 또한, 추론 단계 수가 **10단계** 로 줄었을 때도 성능 저하 없이 강력한 강건성을 유지했습니다.

## AI 실무자를 위한 시사점
**G²RPO** 는 생성 모델을 인간 선호도에 맞춰 미세 조정하려는 AI/ML 엔지니어에게 매우 유용한 프레임워크를 제공합니다. **정밀하고 조밀한 보상 신호** 를 통해 모델 최적화의 정확도를 높이고, **다중 세분화 이점 통합** 을 통해 다양한 생성 결과에 대한 포괄적인 평가를 가능하게 하여 **더 높은 품질의 이미지를 생성** 할 수 있습니다. 특히, **낮은 추론 단계에서도 견고한 성능** 을 보여줌으로써 효율적인 모델 서빙 및 사용자 경험 개선에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.