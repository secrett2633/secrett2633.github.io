---
title: "[논문리뷰] 10 Open Challenges Steering the Future of Vision-Language-Action Models"
excerpt: "이 [arXiv]에 게시한 '10 Open Challenges Steering the Future of Vision-Language-Action Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Embodied AI
  - Robotics
  - Multimodal Perception
  - Cross-Robot Generalization
  - Hierarchical Planning
  - World Models
  - Robot Safety

permalink: /ai/review/2025-11-11-10-Open-Challenges-Steering-the-Future-of-Vision-Language-Action-Models/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.05936)

**저자:** Soujanya Poria, Navonil Majumder, Chia-Yu Hung, Amir Ali Bagherzadeh, Chuan Li, Kenneth Kwok, Ziwei Wang, Cheston Tan, Jiajun Wu, David Hsu



## 핵심 연구 목표
본 논문은 **Vision-Language-Action (VLA) 모델** 의 개발과 광범위한 수용을 가속화하기 위해 현재 연구 분야에서 직면한 10가지 주요 개방형 과제를 식별하고 논의하는 것을 목표로 합니다. 특히 **다중 모드 센싱 및 인지, 강력한 추론, 데이터 품질, 교차 로봇 행동 일반화, 자원 효율성, 전신 조정, 안전 보장, 에이전트 프레임워크 내 VLA 모델, 인간-로봇 조정** 등의 과제에 초점을 맞춥니다.

## 핵심 방법론
이 논문은 새로운 방법론을 제시하기보다 VLA 모델의 주요 과제와 이를 해결하기 위한 **현재 및 미래의 연구 동향** 을 포괄적으로 분석합니다. 주요 논의는 **모방 학습(Imitation Learning)** 패러다임을 기반으로 한 **연속(diffusion processes)** 및 **이산(transformer-based tokenization)** 액션 모델의 장단점을 다루며, **계층적 계획(high-level LLM/VLM planner + low-level action expert)** , **공간 이해(depth perception)** , **범용 액션 표현(codebooks)** , **세계 모델링(generative models)** , **데이터 합성** , **후처리 학습(RL-based reward models)** 등 다양한 해결책을 제시합니다.

## 주요 결과
논문은 현재 VLA 모델이 **훈련 시나리오를 넘어 일반화하는 데 어려움** 을 겪고 있음을 강조합니다. 특히 이산 액션 모델은 **3-5Hz의 느린 추론 속도** 와 **양자화 오류** 로 인해 고주파 제어에 부적합하며, 확산 기반 연속 액션 모델은 **높은 계산 비용** 을 요구합니다. 대부분의 VLA 모델은 **명시적 깊이 정보** 를 무시하여 3D 환경에서 잘못된 추론을 할 위험이 있으며, 현재 평가는 **제어된 환경** 에 국한되어 **실제 성능과의 상관관계가 낮습니다** .

## AI 실무자를 위한 시사점
AI 실무자들은 VLA 모델의 **다양한 환경 및 작업에 대한 일반화 능력** 을 향상시키는 데 집중해야 합니다. **로봇의 온보드 배포** 를 위해 **자원 효율적인 모델** 개발이 중요하며, 동시에 성능 저하를 최소화하는 균형점을 찾아야 합니다. **명시적인 깊이 이해** 를 모델에 통합하여 3D 환경에서의 강건한 상호작용을 보장하고, **합성 데이터** 및 **후처리 학습 기법** 을 활용하여 데이터 수집의 한계를 극복하고 모델의 안전성 및 신뢰성을 높이는 데 주력해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.