---
title: "[논문리뷰] VLA-RFT: Vision-Language-Action Reinforcement Fine-tuning with Verified
  Rewards in World Simulators"
excerpt: "Zirui Ge이 arXiv에 게시한 'VLA-RFT: Vision-Language-Action Reinforcement Fine-tuning with Verified
  Rewards in World Simulators' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Reinforcement Learning
  - World Models
  - Fine-tuning
  - Embodied AI
  - Robotics
  - Reward Design
  - Distribution Shift

permalink: /ai/review/2025-10-2-VLA-RFT-Vision-Language-Action-Reinforcement-Fine-tuning-with-Verified-Rewards-in-World-Simulators/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.00406)

**저자:** Hengtao Li, Pengxiang Ding, Runze Suo, Yihao Wang, Zirui Ge, Dongyuan Zang, Kexian Yu, Mingyang Sun, Hongyin Zhang, Donglin Wang, Weihua Su



## 핵심 연구 목표
본 논문은 모방 학습의 한계점(오류 누적, 분포 변화에 대한 낮은 강건성)과 기존 강화 학습(고비용, sim-to-real 간극)의 단점을 극복하고자 합니다. 이를 위해 **데이터 기반 월드 모델** 을 활용한 효율적이고 안전한 **강화 학습 미세 조정 프레임워크인 VLA-RFT** 를 제안하여, **VLA 모델의 강건성 및 일반화 성능** 을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
VLA-RFT는 크게 두 단계로 구성됩니다: 먼저 **오프라인 데이터셋** 으로 **월드 모델** 과 **VLA 정책** 을 사전 훈련합니다. 이후, 월드 모델은 **정책이 생성한 액션 시퀀스** 에 따라 미래 시각 관측치를 예측하는 **고충실도 시뮬레이터** 역할을 수행하며, 목표 달성 레퍼런스와 비교하여 **밀도 높은 궤적 수준의 검증된 보상** 을 제공합니다. 이 보상을 기반으로 **GRPO(Generalized Reinforcement Policy Optimization)** 를 통해 VLA 정책을 효율적으로 미세 조정합니다.

## 주요 결과
VLA-RFT는 표준 환경에서 **400번의 미세 조정 반복** 만으로 **평균 SR(성공률) 91.1%** 를 달성하며, **150K 반복의 강력한 지도 학습 기준선(86.6%)** 을 크게 능가했습니다. 또한, 다양한 교란 환경에서도 일관되게 높은 강건성을 보였으며, 특히 **조합형 교란 환경에서 3.0%p 이상의 SR 향상** 을 기록했습니다. 이는 **월드 모델 기반 RL** 이 기존 시뮬레이터 기반 RL보다 **현저히 적은 샘플 요구량** 으로 우수한 성능을 달성함을 입증합니다.

## AI 실무자를 위한 시사점
본 연구는 **월드 모델 기반 강화 학습** 이 VLA 모델의 **효율적이고 안전한 미세 조정** 을 위한 실용적인 방법론임을 제시합니다. **적은 학습 스텝(400회)** 만으로 높은 성능과 강건성을 확보함으로써, 현실 세계 로봇에 VLA 모델을 배포하는 데 필요한 **상호작용 비용과 시간** 을 획기적으로 줄일 수 있습니다. 특히, **분포 변화에 대한 모델의 강건성** 을 향상시키는 것은 실제 환경에서의 신뢰성 있는 AI 시스템 구축에 매우 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.