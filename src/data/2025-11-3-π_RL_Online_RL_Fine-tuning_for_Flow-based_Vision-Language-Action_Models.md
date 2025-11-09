---
title: "[논문리뷰] π_RL: Online RL Fine-tuning for Flow-based
  Vision-Language-Action Models"
excerpt: "이 [arXiv]에 게시한 'π_RL: Online RL Fine-tuning for Flow-based
  Vision-Language-Action Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - Vision-Language-Action Models (VLAs)
  - Flow-based Models
  - Policy Optimization
  - Robotics
  - Flow Matching
  - SDE
  - MDP

permalink: /ai/review/2025-11-3-π_RL_Online_RL_Fine-tuning_for_Flow-based_Vision-Language-Action_Models/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25889)

**저자:** Kang Chen, Zhihao Liu, Tonghe Zhang, Zhen Guo, Si Xu, Hao Lin, Hongzhi Zang, Quanlu Zhang, Zhaofei Yu, Guoliang Fan, Tiejun Huang, Yu Wang, Chao Yu



## 핵심 연구 목표
본 논문은 `π0` 및 `π0.5`와 같은 **플로우 기반(Flow-based) VLA (Vision-Language-Action) 모델**에 대규모 RL을 적용할 때 발생하는 **액션 로그-우도(log-likelihood) 계산의 난해함**을 해결하는 것을 목표로 합니다. 이를 통해 SFT(Supervised Fine-Tuning)된 플로우 기반 VLA 모델의 성능과 일반화 능력을 온라인 RL 미세조정을 통해 향상시키고자 합니다.

## 핵심 방법론
저자들은 **Flow-Noise**와 **Flow-SDE**라는 두 가지 RL 알고리즘을 구현한 `π_RL` 프레임워크를 제안합니다. **Flow-Noise**는 디노이징(denoising) 과정을 **학습 가능한 노이즈 네트워크**를 포함하는 **이산 시간 MDP(Markov Decision Process)**로 모델링하여 정확한 로그-우도 계산을 가능하게 합니다. **Flow-SDE**는 ODE 디노이징 과정을 **SDE(Stochastic Differential Equation)**로 변환하여 **두 계층 MDP**를 구성하고, 효율적인 RL 탐색을 위해 **하이브리드 ODE-SDE 샘플링 기법**을 활용합니다. 두 방법론 모두 **PPO(Proximal Policy Optimization)** 알고리즘으로 최적화됩니다.

## 주요 결과
`π_RL`은 few-shot SFT 모델인 `π0` 및 `π0.5`의 성능을 크게 향상시켰습니다. `LIBERO` 벤치마크에서 `π0`의 성공률은 **57.6%에서 97.6%로**, `π0.5`는 **77.1%에서 98.3%로** 상승했습니다. 특히 `LIBERO-Long` 벤치마크에서 `π0.5`의 one-shot SFT 성능은 **43.9%에서 94.0%로** 크게 개선되었습니다. `ManiSkill`에서도 `π_RL`은 **4,352개 작업 조합**에 걸쳐 `π0`의 성공률을 **41.6%에서 85.7%로**, `π0.5`는 **40.0%에서 84.8%로** 높여 확장 가능한 멀티태스크 RL 능력을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 로봇 제어에 필수적인 **플로우 기반 VLA 모델**에 온라인 RL을 적용하기 위한 실용적인 프레임워크 `π_RL`을 제공합니다. AI 실무자들은 **Flow-Noise** 또는 **Flow-SDE**를 활용하여 플로우 기반 모델의 로그-우도 추정 문제를 극복하고, SFT 대비 **향상된 성능과 일반화 능력**을 달성할 수 있습니다. 본 연구의 오픈소스 공개는 **복잡한 멀티태스크 로봇 시나리오**에서의 VLA 시스템 개발 및 적용을 가속화할 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.