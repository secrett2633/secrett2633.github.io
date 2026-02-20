---
title: "[논문리뷰] Evolving Language Models without Labels: Majority Drives Selection,
  Novelty Promotes Variation"
excerpt: "Kishan Panaganti이 arXiv에 게시한 'Evolving Language Models without Labels: Majority Drives Selection,
  Novelty Promotes Variation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Label-free Reinforcement Learning
  - LLMs
  - Self-improvement
  - Entropy Collapse
  - Novelty Reward
  - Test-Time RL
  - GRPO
  - Evolutionary Computing Principles

permalink: /ai/review/2025-9-19-Evolving-Language-Models-without-Labels-Majority-Drives-Selection-Novelty-Promotes-Variation/

toc: true
toc_sticky: true

date: 2025-09-19 13:12:21+0900
last_modified_at: 2025-09-19 13:12:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15194)

**저자:** Yujun Zhou, Zhenwen Liang, Haolin Liu, Wenhao Yu, Kishan Panaganti, Linfeng Song, Dian Yu, Xiangliang Zhang, Haitao Mi, Dong Yu



## 핵심 연구 목표
논문은 LLM이 라벨이나 외부 평가 없이 스스로 개선하려는 라벨-프리(label-free) 학습 환경에서 겪는 **엔트로피 붕괴(entropy collapse)** 문제를 해결하는 것을 목표로 합니다. 기존 다수결(majority-vote) 기반 방법론들이 탐색 능력을 축소시켜 모델의 생성 품질 저하와 일반화 능력 상실을 초래하는 문제를 극복하고, 모델의 본질적인 탐색 능력과 일반화 능력을 유지하면서 지속적으로 발전(evolving)할 수 있도록 하는 연구입니다.

## 핵심 방법론
저자들은 **EVOLution-Oriented and Label-free Reinforcement Learning (EVOL-RL)** 프레임워크를 제안합니다. 이 방법론은 **다수결 투표 결과(majority-voted answer)를 안정성(selection)의 기준** 으로 삼는 동시에, 생성된 응답들의 **추론 과정(reasoning traces) 간 의미적 차이(semantic dissimilarity)** 를 측정하여 **참신성(novelty)** 에 기반한 보상을 부여함으로써 **변화(variation)를 촉진** 합니다. 이는 **GRPO(Generalized Reward-consistency Policy Optimization)** 와 함께 **비대칭 클리핑(asymmetric clipping)** 및 **엔트로피 정규화(entropy regularizer)** 를 사용하여 구현됩니다.

## 주요 결과
EVOL-RL은 다수결 기반 **TTRL(Test-Time Reinforcement Learning)** 대비 일관되게 우수한 성능을 보였습니다. 특히, **라벨-프리 AIME24 훈련** 에서 Qwen3-4B-Base 모델의 **pass@1 정확도는 TTRL의 4.6%에서 16.4%로 상승** 했고, **pass@16 정확도는 18.5%에서 37.9%로 두 배 이상 향상** 되었습니다. 또한, EVOL-RL은 다양성 붕괴를 방지하고 더 길고 유익한 사고의 사슬(chains of thought)을 유지하며, **GPQA 같은 OOD(Out-of-Domain) 벤치마크** 에서도 강력한 일반화 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM이 **라벨 없는 실세계 환경에서 자율적으로 학습하고 개선** 할 수 있는 실용적인 방법을 제공합니다. AI/ML 엔지니어는 EVOL-RL의 '다수결을 통한 선택 + 참신성을 통한 변화' 원칙을 활용하여 모델의 **탐색-활용(exploration-exploitation) 균형** 을 효과적으로 관리하고, **생성 모델의 다양성 붕괴를 방지** 하며 **장기적인 일반화 성능** 을 확보할 수 있습니다. 이는 특히 복잡한 추론 문제 해결과 새로운 도메인으로의 지식 전이 능력을 향상시키는 데 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.