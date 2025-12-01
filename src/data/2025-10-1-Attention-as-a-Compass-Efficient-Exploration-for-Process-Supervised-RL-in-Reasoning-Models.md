---
title: "[논문리뷰] Attention as a Compass: Efficient Exploration for Process-Supervised RL
  in Reasoning Models"
excerpt: "이 [arXiv]에 게시한 'Attention as a Compass: Efficient Exploration for Process-Supervised RL
  in Reasoning Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Process-Supervised RL
  - Large Language Models
  - Reasoning Models
  - Attention Mechanism
  - Efficient Exploration
  - Adaptive Sampling
  - Off-Policy Training

permalink: /ai/review/2025-10-1-Attention-as-a-Compass-Efficient-Exploration-for-Process-Supervised-RL-in-Reasoning-Models/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.26628)

**저자:** Runze Liu, Jiakang Wang, Yuling Shi, Zhihui Xie, Chenxin An, Kaiyan Zhang, Jian Zhao, Xiaodong Gu, Lei Lin, Wenping Hu, Xiu Li, Fuzheng Zhang, Guorui Zhou, Kun Gai



## 핵심 연구 목표
본 논문은 LLM의 추론 능력 강화를 위한 기존 **Process-Supervised Reinforcement Learning (PSRL)** 방법론의 **제한된 탐색 효율성** 문제를 해결하고자 합니다. 특히, 분기 위치 선정 및 샘플링 비효율성을 개선하고, 전반적인 훈련 효율성을 높이는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 효율적인 탐색을 위한 새로운 PSRL 프레임워크인 **AttnRL** 을 제안합니다. 주요 방법론은 다음과 같습니다: (1) 높은 어텐션 점수(`FCI score`)를 보이는 단계를 중요한 추론 행동과 연관시켜 분기점으로 활용하는 **Attention-based Tree Branching (ATB)** ; (2) 문제 난이도와 과거 배치 크기를 고려하여 **non-zero advantage values** 를 유지하는 **Adaptive Sampling (ADS)** ; (3) 샘플링 비효율성을 줄이기 위해 단일 샘플링 작업으로 훈련을 수행하는 **One-step Off-policy Training** 파이프라인.

## 주요 결과
**AttnRL** 은 6가지 수학적 추론 벤치마크에서 기존 **GRPO** 및 **TreeRL** 과 같은 베이스라인 대비 일관되게 우수한 성능과 효율성을 입증했습니다. 특히, **DS-R1-Distill-Qwen-1.5B** 모델에서 평균 **7.5%** 의 성능 향상을 달성했으며, **TreeRL** 대비 평균 **1.8%** , **GRPO** 대비 평균 **1.9%** 높은 성능을 보였습니다. 또한, 원스텝 오프폴리시 훈련 파이프라인을 통해 기존 **TreeRL** 구현 대비 훈련 시간을 **8%** 단축하고 더 많은 **5.6B** 개의 유효 토큰으로 훈련하면서도 더 높은 최종 성능인 **57.2%** 를 달성했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 추론 모델 훈련 시 **어텐션 메커니즘** 을 활용하여 핵심 추론 단계를 식별하고, 이를 효과적인 **탐색 전략** 으로 전환할 수 있음을 보여줍니다. **적응형 샘플링** 과 **원스텝 오프폴리시 훈련** 은 제한된 컴퓨팅 자원 내에서 LLM을 보다 효율적으로 훈련하고 배포하려는 AI/ML 엔지니어에게 **훈련 시간과 비용을 절감** 할 수 있는 실용적인 해결책을 제공합니다. 이는 특히 복잡한 추론 문제 해결을 위한 LLM의 개발 및 운영에 큰 이점을 가져다줄 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.