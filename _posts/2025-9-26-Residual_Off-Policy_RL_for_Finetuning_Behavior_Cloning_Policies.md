---
title: "[논문리뷰] Residual Off-Policy RL for Finetuning Behavior Cloning Policies"
excerpt: "Pieter Abbeel이 [arXiv]에 게시한 'Residual Off-Policy RL for Finetuning Behavior Cloning Policies' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - Behavior Cloning (BC)
  - Residual Learning
  - Off-Policy RL
  - Robot Manipulation
  - Real-World Robotics
  - High-DoF Systems
  - Sample Efficiency

permalink: /ai/review/2025-9-26-Residual_Off-Policy_RL_for_Finetuning_Behavior_Cloning_Policies/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19301)

**저자:** Lars Ankile, Zhenyu Jiang, Rocky Duan, Guanya Shi, Pieter Abbeel, Anusha Nagabandi



## 핵심 연구 목표
본 논문은 행동 복제(BC) 기반 정책의 한계(데이터 품질, 수동 데이터 수집, 성능 포화)와 실제 로봇에서의 직접적인 강화 학습(RL)의 어려움(샘플 비효율성, 안전성, 희소 보상)을 해결하는 것을 목표로 합니다. 특히, **고자유도(High-DoF) 시스템**에서 BC 정책의 성능을 향상시키기 위한 실용적인 RL 배포 방안을 제시하고자 합니다.

## 핵심 방법론
저자들은 **ResFiT (Residual Fine-Tuning)**이라는 오프-정책 잔차 RL 접근 방식을 제안합니다. 이 방법은 먼저 데모 데이터를 사용하여 **행동 청킹(action chunking)** 기반의 **베이스 정책(base policy)**을 BC로 훈련한 후 고정합니다. 이어서, 이 베이스 정책의 동작에 대한 **단계별 잔차 보정(per-step residual correction)**을 학습하기 위해 **샘플 효율적인 오프-정책 RL**을 적용합니다. 이 과정에서 **UTD(Update-to-Data) 비율 > 1**, **n-step 리턴(n=3)**, **계층 정규화(layer normalization)**, **폴리악 평균(Polyak averaging)**, **타겟 정책 스무딩**, **Randomized Ensembled Double Q-Learning**과 같은 기법들이 활용됩니다.

## 주요 결과
시뮬레이션에서 기존 온-정책 잔차 RL (PPO) 대비 **BoxCleanup 태스크**에서 **약 200배**의 샘플 효율성 향상(200k 스텝 vs 40M 스텝)을 달성했습니다. 모든 시뮬레이션 태스크에서 **거의 완벽한 정책**을 수렴시켰습니다. 실제 세계에서는 **Vega 휴머노이드 로봇**에서 **WoollyBallPnP 태스크**의 성공률을 **14%에서 64%로** 향상시켰고, **PackageHandover 태스크**의 성공률은 **23%에서 64%로** 높였습니다. 이는 5-손가락 손을 가진 휴머노이드 로봇에 대한 최초의 실제 RL 훈련 성공 사례입니다.

## AI 실무자를 위한 시사점
**ResFiT**는 BC 정책의 강력한 사전 지식을 활용하면서도 RL의 정교함을 더하여 **고자유도 실제 로봇**에 RL을 적용할 수 있는 실용적인 방법론을 제시합니다. 베이스 정책을 **블랙박스**로 취급하여 대규모 모델의 파라미터를 직접 최적화할 필요 없이 효율적으로 정책을 개선할 수 있습니다. 이는 제한된 데이터와 안전 제약이 있는 실제 로봇 환경에서 **샘플 효율적이고 안정적인 정책 학습**을 가능하게 하여, 로봇 제어 분야의 발전에 크게 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.