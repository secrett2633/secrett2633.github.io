---
title: "[논문리뷰] CoIRL-AD: Collaborative-Competitive Imitation-Reinforcement Learning in
  Latent World Models for Autonomous Driving"
excerpt: "arXiv에 게시된 'CoIRL-AD: Collaborative-Competitive Imitation-Reinforcement Learning in
  Latent World Models for Autonomous Driving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autonomous Driving
  - Imitation Learning
  - Reinforcement Learning
  - World Models
  - Latent Space
  - Dual-Policy
  - Competitive Learning

permalink: /ai/review/2025-10-16-CoIRL-AD-Collaborative-Competitive-Imitation-Reinforcement-Learning-in-Latent-World-Models-for-Autonomous-Driving/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12560)

**저자:** Xiaoji Zheng, Ziyuan Yang, Yanhao Chen, Yuhang Peng, Yuanrong Tang, Gengyuan Liu, Bokui Chen, Jiangtao Gong



## 핵심 연구 목표
본 논문은 모방 학습(IL)에만 의존하는 자율주행 모델이 겪는 **일반화 성능 저하 및 롱테일 시나리오 대응 문제** 를 해결하고자 합니다. 또한, 강화 학습(RL)의 샘플 비효율성 및 불안정한 수렴 문제를 극복하기 위해, **IL과 RL을 효과적으로 통합** 하여 보다 견고하고 일반화된 자율주행 정책을 개발하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **CoIRL-AD** 프레임워크는 **IL 액터** 와 **RL 액터** 로 구성된 **듀얼-정책 아키텍처** 를 사용하며, 이들은 **경쟁 기반 학습 메커니즘** 을 통해 상호작용하며 병렬적으로 훈련됩니다. **잠재 세계 모델(latent world model)** 은 상상 기반 시뮬레이션의 반응형 시뮬레이터로 활용되어, RL 액터가 미래 상태를 탐색하고 예측할 수 있도록 합니다. RL 액터는 **그룹 샘플링** 을 사용하여 탐색하고 **규칙 기반 보상 함수** (모방 및 충돌 보상)로 액션 시퀀스를 평가하며, 새로운 **역방향 계획(backward planning)** 메커니즘을 도입하여 액션 시퀀스 생성을 개선합니다.

## 주요 결과
**nuScenes 데이터셋** 실험에서 기존 IL 기반 모델 대비 **충돌률 18% 감소** 를 달성했으며, 특히 **LAW+CoIRL-AD (ADCGS)** 는 **0.18%** 의 충돌률(LAW의 0.22% 대비)을 기록했습니다. **Navsim 벤치마크** 에서는 **PDMS 점수 88.2** 를 달성하여 최신 기술 모델들을 능가했으며, **NC (+0.4), DAC (+0.4), TTC (+0.8)** 등 여러 하위 지표에서 개선을 보였습니다. 또한, 교차 도시 일반화(L2 오류 0.931m에서 0.702m, 충돌률 0.686%에서 0.218%로 감소) 및 롱테일 시나리오에서 뛰어난 성능을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **모방 학습** 과 **강화 학습** 을 오프라인 환경에서 효과적으로 통합하여 더욱 강력하고 일반화 가능한 자율주행 시스템을 개발하는 유망한 방향을 제시합니다. **잠재 세계 모델** 을 활용한 상상 기반 시뮬레이션은 외부 시뮬레이터 의존성을 줄여 실용적인 접근법을 제공합니다. AI 실무자들은 이 **듀얼-정책 경쟁 학습 프레임워크** 를 기존 엔드투엔드 주행 모델에 적용하여 복잡한 롱테일 시나리오에서의 성능을 향상시키고 충돌률을 줄이며, 추가적인 추론 지연 없이 모델의 안정성을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.