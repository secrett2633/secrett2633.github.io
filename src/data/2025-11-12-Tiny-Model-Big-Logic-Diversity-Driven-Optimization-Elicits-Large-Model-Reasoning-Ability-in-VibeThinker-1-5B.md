---
title: "[논문리뷰] Tiny Model, Big Logic: Diversity-Driven Optimization Elicits Large-Model   Reasoning Ability in VibeThinker-1.5B"
excerpt: "arXiv에 게시된 'Tiny Model, Big Logic: Diversity-Driven Optimization Elicits Large-Model   Reasoning Ability in VibeThinker-1.5B' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Small Language Models
  - Reasoning
  - Diversity Optimization
  - Supervised Fine-Tuning (SFT)
  - Reinforcement Learning (RL)
  - Spectrum-to-Signal Principle (SSP)
  - Mathematical Reasoning
  - Code Generation

permalink: /ai/review/2025-11-12-Tiny-Model-Big-Logic-Diversity-Driven-Optimization-Elicits-Large-Model-Reasoning-Ability-in-VibeThinker-1-5B/

toc: true
toc_sticky: true

date: 2025-11-12 00:00:00+0900+0900
last_modified_at: 2025-11-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.06221)

**저자:** Sen Xu, Yi Zhou, Wei Wang, Jixin Min, Zhibin Yin, Yingwei Dai, Shixi Liu, Lianyu Pang, Yirong Chen, Junlin Zhang



## 핵심 연구 목표
이 논문은 소규모 모델이 강력한 추론 능력을 갖추기 어렵다는 기존의 통념에 도전하고, **1.5B 파라미터** 의 경량 모델인 **VibeThinker-1.5B** 가 대규모 모델에 필적하는 추론 능력을 경제적으로 달성할 수 있음을 입증하는 것을 목표로 합니다. 이를 통해 모델 크기에 대한 의존성을 줄이고 AI 연구의 접근성을 확대하고자 합니다.

## 핵심 방법론
제안하는 **VibeThinker-1.5B** 는 **"Spectrum-to-Signal Principle (SSP)"** 기반의 혁신적인 후처리 학습 방법론을 사용합니다. 이는 SFT 단계에서 **"Two-Stage Diversity-Exploring Distillation"** 을 통해 광범위한 솔루션 스펙트럼을 생성하고, RL 단계에서는 **"MaxEnt-Guided Policy Optimization (MGPO)"** 프레임워크를 활용하여 올바른 신호를 식별하고 증폭하는 방식으로 작동합니다. **MGPO** 는 모델이 불확실성이 높은 문제에 집중하도록 동적으로 학습 우선순위를 부여합니다.

## 주요 결과
**VibeThinker-1.5B** 는 **AIME24 (80.3 vs. 79.8)** , **AIME25 (74.4 vs. 70.0)** , **HMMT25 (50.4 vs. 41.7)** 등 세 가지 수학 벤치마크에서 **DeepSeek R1** 모델(671B 파라미터)을 능가했습니다. 또한, **LiveCodeBench V6** 코딩 벤치마크에서 **51.1** 점을 달성하여 **Magistral Medium (50.3)** 보다 우수하며, 총 훈련 비용은 **$7,800** 에 불과했습니다.

## AI 실무자를 위한 시사점
이 연구는 효율적인 방법론을 통해 소규모 모델도 대규모 모델에 필적하는 추론 능력을 갖출 수 있음을 보여주어, 훈련 및 추론 비용을 획기적으로 절감할 수 있는 실용적인 가능성을 제시합니다. **다양성 기반 최적화 (diversity-driven optimization)** 의 중요성을 강조하며, AI 개발 및 응용의 민주화를 가속화하는 데 기여할 수 있는 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.