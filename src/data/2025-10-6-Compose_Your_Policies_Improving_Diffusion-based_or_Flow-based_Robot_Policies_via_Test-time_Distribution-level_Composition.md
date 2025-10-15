---
title: "[논문리뷰] Compose Your Policies! Improving Diffusion-based or Flow-based Robot
  Policies via Test-time Distribution-level Composition"
excerpt: "이 [arXiv]에 게시한 'Compose Your Policies! Improving Diffusion-based or Flow-based Robot
  Policies via Test-time Distribution-level Composition' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Flow-based Models
  - Robotics Control
  - Policy Composition
  - Test-time Optimization
  - Score-based Models
  - Training-free

permalink: /ai/review/2025-10-6-Compose_Your_Policies_Improving_Diffusion-based_or_Flow-based_Robot_Policies_via_Test-time_Distribution-level_Composition/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01068)

**저자:** Jiahang Cao, Yize Huang, Hanzhong Guo, Rui Zhang, Mu Nan, Weijian Mai, Jiaxu Wang, Hao Cheng, Jingkai Sun, Gang Han, Wen Zhao, Qiang Zhang, Yijie Guo, Qihao Zheng, Chunfeng Song, Xiao Li, Ping Luo, Andrew F. Luo



## 핵심 연구 목표
본 논문의 핵심 목표는 **추가적인 모델 훈련 없이** 확산(diffusion) 또는 플로우(flow) 기반 로봇 정책의 성능을 향상시키는 것입니다. 특히, 대규모 상호작용 데이터셋 획득의 높은 비용으로 인해 제한되는 기존 정책들의 **성능 한계를 극복**하고, 여러 사전 학습된 정책들을 조합하여 개별 정책보다 우수한 성능을 달성하는 새로운 패러다임을 제시합니다.

## 핵심 방법론
본 연구는 **General Policy Composition (GPC)**이라는 훈련 없는 프레임워크를 제안합니다. GPC는 여러 사전 학습된 정책의 **분포 스코어(distributional scores)를 볼록 조합(convex combination)**하고, **테스트 시간(test-time) 탐색**을 통해 최적의 조합 가중치를 찾아 성능을 향상시킵니다. 이 방법론은 **이종 모델(VA, VLA, 확산, 플로우 모델)** 및 다양한 시각 모달리티를 유연하게 통합할 수 있도록 설계되었으며, **볼록 스코어 조합**이 단일 단계에서 더 나은 기능적 목표를 제공하고 이 이점이 전체 궤적 생성으로 전파됨을 이론적으로 증명합니다.

## 주요 결과
GPC는 **Robomimic**, **PushT**, **RoboTwin** 벤치마크 및 실제 로봇 환경에서 일관된 성능 향상을 보였습니다. Robomimic 및 PushT에서는 평균 **최대 +7.55%**, RoboTwin에서는 **+7%**, 실제 환경 태스크에서는 **+10%**의 성공률 증가를 달성했습니다. 예를 들어, Robomimic의 Florence-Policy-F+FP 조합은 평균 성공률을 **+7.55%** 증가시켰고, RoboTwin의 RDT + DPpcd 조합은 **+7%** 증가를 기록했습니다.

## AI 실무자를 위한 시사점
이 연구는 기존의 **확산 및 플로우 기반 로봇 정책**의 성능을 **추가적인 훈련 비용 없이** 향상시킬 수 있는 실용적인 방법을 제공합니다. GPC의 **플러그 앤 플레이(plug-and-play) 특성**은 다양한 사전 학습 모델과 모달리티를 손쉽게 통합하여 로봇 제어 시스템의 유연성을 크게 높일 수 있습니다. 또한, **테스트 시간 가중치 탐색**을 통해 특정 작업에 맞춰 정책 조합을 최적화할 수 있어, 실제 로봇 애플리케이션에서 **강건하고 적응력 있는 정책 배포**에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.