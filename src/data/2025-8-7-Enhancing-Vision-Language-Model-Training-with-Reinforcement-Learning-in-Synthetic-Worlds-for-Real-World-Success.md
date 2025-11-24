---
title: "[논문리뷰] Enhancing Vision-Language Model Training with Reinforcement Learning in
  Synthetic Worlds for Real-World Success"
excerpt: "Ruslan Rakhimov이 [arXiv]에 게시한 'Enhancing Vision-Language Model Training with Reinforcement Learning in
  Synthetic Worlds for Real-World Success' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Vision-Language Models
  - Synthetic Worlds
  - Transfer Learning
  - PPO
  - Actor-Critic
  - Embodied AI

permalink: /ai/review/2025-8-7-Enhancing-Vision-Language-Model-Training-with-Reinforcement-Learning-in-Synthetic-Worlds-for-Real-World-Success/

toc: true
toc_sticky: true

date: 2025-08-07 13:38:21+0900
last_modified_at: 2025-08-07 13:38:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.04280)

**저자:** George Bredis, Stanislav Dereka, Viacheslav Sinii, Ruslan Rakhimov, Daniil Gavrilov



## 핵심 연구 목표
본 논문은 대규모 시각-언어 모델(VLM)이 다단계의 상호작용적 에이전트 태스크에서 직면하는 어려움을 해결하고, 특히 훈련 환경을 넘어 실세계 벤치마크로 학습된 행동을 일반화하는 능력을 향상시키는 것을 목표로 합니다. 기존 RL 기법들이 가진 불안정한 하이퍼파라미터 튜닝, 밀집 보상 환경에 대한 의존성, 긴 시퀀스 학습의 한계 등을 극복하고자 합니다.

## 핵심 방법론
저자들은 **Vision-Language Decoupled Actor-Critic (VL-DAC)**이라는 경량화된 RL 알고리즘을 제안합니다. 이 방법은 **액션 토큰에 대한 PPO 업데이트**와 **환경 스텝 수준에서만 학습되는 가치 헤드(value head)**를 분리하며, **VLM 백본에서는 기울기를 정지(stop-gradient)**시킵니다. 또한, **KL 정규화** 및 **가치 웜업(value warm-up)**과 같은 안정화 기법을 적용하여 학습의 안정성을 높입니다.

## 주요 결과
**VL-DAC**는 저렴한 시뮬레이터(MiniWorld, Gym-Cards, ALFWorld, WebShop)에서의 훈련만으로도 실세계 벤치마크에서 상당한 성능 향상을 달성했습니다. 특히 **BALROG**에서 **50% 상대적 이득**, **VSI-Bench**에서 **5% 상대적 이득**, **VisualWebBench**에서 **2% 상대적 이득**을 보였습니다. 이는 **RL4VLM** 및 **LOOP**에 비해 더 빠른 수렴과 높은 최종 성능을 보여주며, 일반 이미지 이해 정확도를 저하시키지 않았습니다.

## AI 실무자를 위한 시사점
**VL-DAC**는 복잡한 하이퍼파라미터 튜닝 없이도 **VLM에 RL을 적용하여 실제 에이전트 역량**을 부여할 수 있음을 입증합니다. 저렴하고 다양한 시뮬레이터에서 훈련하는 것만으로도 실세계 태스크로의 효과적인 **기술 전이**가 가능하며, 이는 비용 효율적인 VLM 학습 및 환경 스케일링의 새로운 가능성을 열어줍니다. 특히 **희소 보상 환경**에서의 학습 안정성 개선은 실제 응용에 큰 강점입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.