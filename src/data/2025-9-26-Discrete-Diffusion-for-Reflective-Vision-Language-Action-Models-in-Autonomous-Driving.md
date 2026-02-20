---
title: "[논문리뷰] Discrete Diffusion for Reflective Vision-Language-Action Models in
  Autonomous Driving"
excerpt: "Hang Zhao이 arXiv에 게시한 'Discrete Diffusion for Reflective Vision-Language-Action Models in
  Autonomous Driving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autonomous Driving
  - Vision-Language-Action Models
  - Discrete Diffusion
  - Reflection Mechanism
  - Trajectory Generation
  - Safety Constraints
  - Imitation Learning

permalink: /ai/review/2025-9-26-Discrete-Diffusion-for-Reflective-Vision-Language-Action-Models-in-Autonomous-Driving/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.20109)

**저자:** Pengxiang Li, Yinan Zheng, Yue Wang, Huimin Wang, Hang Zhao, Jingjing Liu, Xianyuan Zhan, Kun Zhan, Xianpeng Lang



## 핵심 연구 목표
본 논문은 자율주행 시스템에서 기존 모방 학습 기반 **VLA(Vision-Language-Action) 모델** 이 물리적 규칙 및 안전 제약 조건을 내재적으로 인코딩하는 데 어려움을 겪는 문제를 해결하고자 합니다. 특히, 기존 방식들이 복잡한 사후 정제 또는 계산 비용이 높은 그래디언트 계산에 의존하는 한계를 극복하여 **검증 가능하고 제어 가능한 E2E(End-to-End) 자율주행 시스템** 을 구축하는 것을 목표로 합니다.

## 핵심 방법론
**ReflectDrive** 는 2D 주행 공간을 **액션 코드북** 으로 이산화하여 **사전 훈련된 Diffusion Language Models (DLMs)** 을 미세 조정하여 경로 계획에 활용합니다. 핵심적으로 **그래디언트 계산 없이** 반복적인 자체 교정을 수행하는 **안전 인식 반영(reflection) 메커니즘** 을 도입했습니다. 이 메커니즘은 **목표 조건부 경로 생성** , **안전 스코어러(Global, Safety, Local Scorer)** 를 통한 평가, 안전하지 않은 웨이포인트에 대한 **로컬 탐색** 을 통한 안전 앵커 식별, 그리고 **인페인팅 기반 재구성** 을 통해 안전한 경로를 생성합니다.

## 주요 결과
**NAVSIM 벤치마크** 에서 ReflectDrive는 안전-임계 경로 생성에서 상당한 이점을 보였습니다. `ReflectDrive (w/o R.I.)` 대비 **DAC +3.9점, TTC +1.3점, NC +0.8점, EP +7.9점** 등 안전 지표 및 주행 진행도에서 상당한 개선을 달성했습니다. 특히, 지면 진실(ground truth) 에이전트 정보를 활용했을 때 **NC 99.7%, DAC 99.5%, TTC 99.1%, EP 88.9%** 를 기록하며 인간 수준에 근접하는 폐쇄 루프 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 논문은 자율주행 분야에서 **이산 확산(discrete diffusion) 모델** 의 적용 가능성을 제시하며, **안전 제약 조건** 을 효과적으로 통합할 수 있는 새로운 접근 방식을 제공합니다. **반영(reflection) 메커니즘** 을 통해 **그래디언트 계산 없이** 안전을 확보하는 효율적인 방법을 도입하여 실시간 자율주행 시스템 개발에 활용될 수 있습니다. 특히 **VLA 모델** 과 **이산 확산** 의 결합은 스케일러블한 학습과 해석 가능한 의사결정을 가능하게 하여, 기존 **모방 학습(imitation learning)** 의 한계를 극복하는 데 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.