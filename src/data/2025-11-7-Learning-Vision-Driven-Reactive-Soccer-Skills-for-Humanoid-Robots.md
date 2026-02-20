---
title: "[논문리뷰] Learning Vision-Driven Reactive Soccer Skills for Humanoid Robots"
excerpt: "arXiv에 게시된 'Learning Vision-Driven Reactive Soccer Skills for Humanoid Robots' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Humanoid Robot
  - Reinforcement Learning
  - RoboCup
  - Soccer Skills
  - Vision-Driven Control
  - Adversarial Motion Priors
  - Sim-to-Real
  - Perception-Action Coordination

permalink: /ai/review/2025-11-7-Learning-Vision-Driven-Reactive-Soccer-Skills-for-Humanoid-Robots/

toc: true
toc_sticky: true

date: 2025-11-09 22:08:24+0900
last_modified_at: 2025-11-09 22:08:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.03996)

**저자:** Yushi Wang, Changsheng Luo, Penghui Chen, Jianran Liu, Weijian Sun, Tong Guo, Kechang Yang, Biao Hu, Yangang Zhang, Mingguo Zhao



## 핵심 연구 목표
본 연구는 기존 로봇 제어 시스템의 모듈 분리(decoupled modules)로 인한 지연된 반응과 비일관적인 행동 문제를 해결하고자 합니다. 특히, 휴머노이드 로봇이 시각 정보와 모션 제어를 직접 통합하여 동적 환경에서 반응적인 축구 기술(reactive soccer skills)을 습득하고, 불완전한 시각 관측으로부터 특권 상태(privileged states)를 복구하며, 인지-행동 간 활발한 조정을 확립하는 통합 제어기를 개발하는 것을 목표로 합니다.

## 핵심 방법론
이 논문은 **강화 학습(RL)** 기반의 통합 제어기를 제시하며, **Adversarial Motion Priors (AMP)** 프레임워크를 실제 세계의 동적 환경에서 시각적 인지 설정으로 확장합니다. 로봇은 **인코더-디코더(encoder-decoder) 아키텍처** 를 통해 시각적 단서를 제어 관련 잠재 표현으로 압축하고, 실제 세계의 시각적 특성을 모델링하는 **가상 인지 시스템(virtual perception system)** 을 도입하여 정책이 불완전한 관측으로부터 특권 상태를 복구할 수 있도록 합니다. 훈련은 **비대칭 액터-크리틱(AAC)** 과 **근접 정책 최적화(PPO)** 를 사용하여 **NVIDIA Isaac Gym** 시뮬레이션 환경에서 진행됩니다.

## 주요 결과
개발된 제어기는 강력한 반응성을 보였으며, **2025년 RoboCup Adult-size Humanoid League** 와 **2025년 World Humanoid Robot Games** 에서 우승하여 **76골을 득점하고 11골만 실점** 하는 뛰어난 실적을 기록했습니다. 시뮬레이션 테스트에서 로봇의 공 위치 추정 오차(RMSE)는 킥 직전 1초 동안 **0.344m에서 0.186m로 크게 감소** 하여 인지 데이터의 노이즈 제거 효과를 입증했습니다. 또한, 규칙 기반 전략 대비 공에 접근하여 킥을 수행하는 시간이 모든 방향에서 더 짧고 일관되었습니다.

## AI 실무자를 위한 시사점
이 연구는 **GAN 기반 모션 학습(GAN-based motion learning)** 을 시각 피드백과 인지-행동 조정을 포함하는 실제 동적 환경으로 확장할 수 있음을 보여주었습니다. **단일 단계 훈련 과정(single-stage training process)** 으로 복잡한 로봇 축구 기술을 습득하게 한 점은 AI 로봇 시스템 개발의 효율성을 크게 향상시킬 수 있습니다. 특히, **가상 인지 시스템** 을 통한 시뮬레이션-실제 간 격차 해소와 **인코더-디코더 네트워크** 를 활용한 노이즈 제거 및 상태 추정 능력은 실제 환경에 배포될 로봇 시스템의 견고성을 높이는 데 중요한 기여를 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.