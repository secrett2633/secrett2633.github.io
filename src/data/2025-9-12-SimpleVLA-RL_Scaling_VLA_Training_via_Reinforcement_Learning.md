---
title: "[논문리뷰] SimpleVLA-RL: Scaling VLA Training via Reinforcement Learning"
excerpt: "Zhaohui Yang이 [arXiv]에 게시한 'SimpleVLA-RL: Scaling VLA Training via Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - Vision-Language-Action (VLA) Models
  - Robotic Manipulation
  - Data Scarcity
  - Generalization
  - Sim-to-Real Transfer
  - Online RL
  - Long-Horizon Planning

permalink: /ai/review/2025-9-12-SimpleVLA-RL_Scaling_VLA_Training_via_Reinforcement_Learning/

toc: true
toc_sticky: true

date: 2025-09-12 13:12:46+0900
last_modified_at: 2025-09-12 13:12:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09674)

**저자:** Zhaohui Yang, Yuhao Zhang, Jiale Yu, Yuxin Zuo, Haozhan Li, et al.



## 핵심 연구 목표
본 논문은 Vision-Language-Action (VLA) 모델이 로봇 조작 태스크에서 겪는 **데이터 희소성**과 **일반화 능력 부족**이라는 두 가지 근본적인 문제를 해결하는 것을 목표로 합니다. 특히, 강화 학습(RL)을 통해 VLA 모델의 장기적이고 단계별 액션 플래닝 능력을 향상시키는 방법을 모색합니다.

## 핵심 방법론
본 연구는 VLA 모델을 위한 효율적인 온라인 RL 프레임워크인 **SimpleVLA-RL**을 제안합니다. 이는 **veRL**을 기반으로 **VLA 특정 궤적 샘플링**, **확장 가능한 병렬화**, **다중 환경 렌더링**, **최적화된 손실 계산**을 도입합니다. 단순한 **이진 결과 보상 모델링** (성공 1, 실패 0)을 사용하며, **동적 샘플링**, 조정된 **GRPO 클리핑 범위** (예: **[0.8, 1.28]**), **높은 롤아웃 온도** (예: **1.0에서 1.6**) 등의 탐색 강화 전략을 통해 학습 안정성을 높입니다.

## 주요 결과
**SimpleVLA-RL**은 **LIBERO-Long** 벤치마크에서 단 한 번의 시연 데이터만으로 성공률을 **17.1%에서 91.7%**로 대폭 향상시켰습니다. 또한, **RoboTwin1.0**에서 **OpenVLA-OFT** 대비 **30.6%** (39.8%에서 **70.4%**) 성능 향상을 보였으며, **RoboTwin2.0**에서는 **80%**의 상대적 개선(38.3%에서 **68.8%**)을 달성했습니다. 특히, RL 훈련 과정에서 데모 데이터에 없던 'pushcut'과 같은 **새로운 효율적 행동 패턴**을 발견하는 현상을 확인했습니다.

## AI 실무자를 위한 시사점
**SimpleVLA-RL**은 VLA 모델의 훈련에 필요한 고품질 데이터 의존도를 크게 줄일 수 있는 실용적인 방법을 제시합니다. 시뮬레이션에서 훈련된 정책이 실제 로봇 환경으로 효과적으로 이전됨을 입증하여, **대규모 시뮬레이션 기반 RL 훈련**을 통해 실제 로봇의 성능을 향상시킬 수 있는 가능성을 열었습니다. RL을 통해 모델이 **예상치 못한 효율적인 전략**을 스스로 발견할 수 있음을 보여주어, 로봇의 자율성과 적응성을 높이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.