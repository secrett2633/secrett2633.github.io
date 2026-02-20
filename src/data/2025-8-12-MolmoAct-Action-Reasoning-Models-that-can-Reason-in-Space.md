---
title: "[논문리뷰] MolmoAct: Action Reasoning Models that can Reason in Space"
excerpt: "Shuo Liu이 arXiv에 게시한 'MolmoAct: Action Reasoning Models that can Reason in Space' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robotics
  - Action Reasoning
  - Vision-Language Models
  - Spatial Planning
  - Depth Perception
  - Trajectory Generation
  - Explainable AI

permalink: /ai/review/2025-8-12-MolmoAct-Action-Reasoning-Models-that-can-Reason-in-Space/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.07917)

**저자:** Jason Lee, Jiafei Duan, Haoquan Fang, Yuquan Deng, Shuo Liu



## 핵심 연구 목표
기존 로봇 파운데이션 모델들이 지각과 명령을 직접 제어로 매핑하여 적응성, 일반화, 의미론적 기반이 부족한 문제를 해결하는 것을 목표로 합니다. 본 연구는 **Action Reasoning Models (ARMs)** 이라는 새로운 비전-언어-액션 모델 계열을 제안하여, **구조화된 3단계 파이프라인** 을 통해 지각, 계획, 제어를 통합함으로써 목적 지향적인 행동을 구현하고자 합니다.

## 핵심 방법론
제안된 모델 **MOLMOACT** 는 관측과 명령을 **깊이 인식 지각 토큰(depth-aware perception tokens)** 으로 인코딩한 후, **편집 가능한 궤적 추적(editable trajectory traces)** 형태의 중간 수준 공간 계획을 생성합니다. 마지막으로, 이를 바탕으로 정확한 저수준 로봇 동작을 예측하며, 이 전체 과정은 **액션 Chain-of-Thought(CoT)** 프레임워크를 통해 공간적으로 직접 기반을 두고 **자동회귀적으로(autoregressively)** 학습됩니다.

## 주요 결과
**MOLMOACT** 는 다양한 시뮬레이션 및 실제 환경에서 강력한 성능을 입증했습니다. **SimplerEnv Visual Matching** 태스크에서 **70.5%의 제로샷 정확도** 를 달성하여 기존 모델들을 능가했으며, **LIBERO** 에서는 **평균 86.6%의 성공률** 로 **ThinkAct** 대비 **장기 태스크에서 +6.3% 성능 향상** 을 보였습니다. 또한, 실제 환경 미세 조정을 통해 **π0-FAST** 대비 단일 팔에서 **+10%** , 양팔에서 **+22.7%** 의 태스크 진행도 향상을 달성했습니다.

## AI 실무자를 위한 시사점
**MOLMOACT** 는 로봇이 공간적으로 추론하고 목적에 따라 행동할 수 있는 **새로운 아키텍처 청사진** 을 제시합니다. 특히, **깊이 인식 토큰** 과 **시각적 궤적 추적** 을 통해 모델의 의사결정 과정을 설명 가능하고 사용자 상호작용을 통한 **조정 가능성(steerability)** 을 제공하여 로봇 제어의 실용성을 높였습니다. 공개된 **MOLMOACT DATASET** 은 로봇 학습 연구 커뮤니티에 중요한 기여를 할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.