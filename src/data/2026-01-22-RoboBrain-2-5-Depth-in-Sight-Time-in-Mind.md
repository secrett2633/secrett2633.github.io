---
title: "[논문리뷰] RoboBrain 2.5: Depth in Sight, Time in Mind"
excerpt: "Yuheng Ji이 [arXiv]에 게시한 'RoboBrain 2.5: Depth in Sight, Time in Mind' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied AI
  - Foundation Model
  - 3D Spatial Reasoning
  - Temporal Value Estimation
  - Robotics
  - Manipulation
  - Multimodal Learning

permalink: /ai/review/2026-01-22-RoboBrain-2-5-Depth-in-Sight-Time-in-Mind/

toc: true
toc_sticky: true

date: 2026-01-22 00:00:00+0900+0900
last_modified_at: 2026-01-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.14352)

**저자:** Yuheng Ji, Yijie Xu, Zhiyu Li, Huajie Tan, Zhoues



## 핵심 연구 목표
본 논문은 기존 embodied AI foundation model의 2D pixel 기반 grounding 및 sparse temporal supervision의 한계를 극복하고, **정확한 3D 공간 추론(Precise 3D Spatial Reasoning)** 과 **밀집 시간 가치 예측(Dense Temporal Value Estimation)** 능력을 통해 로봇의 물리적 상호작용 신뢰성과 실행 인지도를 향상시키는 것을 목표로 합니다. 이를 통해 복잡하고 정밀한 로봇 조작을 가능하게 하는 차세대 embodied AI 모델을 제시합니다.

## 핵심 방법론
3D 공간 추론을 위해 **depth-aware coordinate prediction** 과 **절대적인 metric constraint** 를 이해하는 **decoupled (u, v, d) 표현** 을 도입하여 완전한 3D 조작 궤적을 생성합니다. 시간 가치 예측을 위해서는 **hop-based relative progress normalization** 을 통해 진행 상황을 예측하고, **multi-perspective fusion** (incremental, forward-anchored, backward-anchored) 및 **bi-directional consistency checking** 으로 안정적인 피드백 신호를 생성합니다. 모델은 **12.4M개의 고품질 시공간 데이터** 로 2단계 학습 전략을 통해 훈련되었습니다.

## 주요 결과
RoboBrain 2.5는 공간 추론 및 시간 가치 예측 벤치마크에서 **새로운 SOTA 성능** 을 달성했습니다. 2D 공간 추론에서 **75.82점의 평균 점수** 를 기록했으며, 특히 3D 공간 추론에서는 **VABench-V에서 0.1189 (MTT)의 최저 오류율** 과 **ShareRobot-T에서 0.1164 (NVIDIA)의 최저 오류율** 을 보였습니다. 시간 가치 예측에서는 RoboCasa (MTT)에서 **98.54/99.58의 VOC+/VOC¯ 점수** 를 달성하는 등 강력한 시간 일관성을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 로봇 공학 분야에서 **정확한 3D 조작 및 실시간 실행 모니터링** 의 중요성을 강조하며, 실제 환경에서의 로봇 배포 신뢰성을 크게 향상시킬 잠재력을 보여줍니다. 모델이 제공하는 **밀집된, 단계별 보상 신호** 는 강화 학습(RL) 효율성을 높이고, 예기치 않은 외부 교란에도 로봇이 스스로 복구할 수 있는 능력을 제공하여 **강력한 자율 에이전트 개발** 에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.