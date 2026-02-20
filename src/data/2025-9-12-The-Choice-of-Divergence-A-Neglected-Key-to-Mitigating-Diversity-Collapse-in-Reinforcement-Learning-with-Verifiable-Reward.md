---
title: "[논문리뷰] The Choice of Divergence: A Neglected Key to Mitigating Diversity
  Collapse in Reinforcement Learning with Verifiable Reward"
excerpt: "Xiaoyu Tan이 arXiv에 게시한 'The Choice of Divergence: A Neglected Key to Mitigating Diversity
  Collapse in Reinforcement Learning with Verifiable Reward' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models (LLMs)
  - Diversity Collapse
  - f-divergence
  - Forward-KL
  - JS-divergence
  - Pass@k
  - Catastrophic Forgetting

permalink: /ai/review/2025-9-12-The-Choice-of-Divergence-A-Neglected-Key-to-Mitigating-Diversity-Collapse-in-Reinforcement-Learning-with-Verifiable-Reward/

toc: true
toc_sticky: true

date: 2025-09-12 13:12:46+0900
last_modified_at: 2025-09-12 13:12:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.07430)

**저자:** Long Li, Jiaran Hao, Jason Klein Liu, Zhijian Zhou, Xiaoyu Tan, et al.



## 핵심 연구 목표
본 논문은 **RLVR (Reinforcement Learning with Verifiable Reward)** 로 미세 조정된 대규모 언어 모델(LLM)에서 빈번하게 발생하는 **Pass@k 성능 저하** 및 **다양성 붕괴(diversity collapse)** 문제를 해결하는 것을 목표로 합니다. 특히, 기존 **reverse-KL 다이버전스** 의 모드 추구(mode-seeking) 특성이 다양성을 저해하고 파국적 망각(catastrophic forgetting)을 유발한다는 점을 지적하며, 적절한 다이버전스 선택이 문제 해결의 핵심임을 주장합니다.

## 핵심 방법론
연구팀은 **Diversity-Preserving Hybrid RL (DPH-RL)** 프레임워크를 제안하며, **Forward-KL** 및 **JS-divergence** 와 같은 **mass-covering f-divergence** 를 '리허설 메커니즘'으로 활용합니다. 이는 초기 정책을 지속적으로 참조하여 모델이 광범위한 솔루션 커버리지를 유지하도록 강제합니다. 특히, 훈련 데이터를 **Dpef (기본 모델이 완벽하게 해결하는 쿼리)** 와 **Dexp (RL 개선이 필요한 쿼리)** 로 분할하고, Dpef에는 f-divergence 손실을, Dexp에는 표준 **PPO-clip 목표** 를 적용하여 학습 효율성과 다양성 보존을 동시에 달성합니다.

## 주요 결과
**DPH-RL** 은 **SQL 및 수학 추론 작업** 전반에서 Pass@k 성능 저하를 성공적으로 해결했으며, **Pass@1 및 Pass@k** 모두에서 인-도메인 및 OOD(Out-Of-Domain) 성능을 향상시켰습니다. 예를 들어, **Llama-3.1-8B-Instruct** 모델을 SQL 작업에 적용했을 때, **DPH-JS** 는 **Bird 데이터셋에서 72.4% Pass@16** 을 달성하여 기존 GRPO(67.7%) 및 DAPO(69.0%)를 능가했습니다. 또한, **OOD Spider 데이터셋** 에서도 **86.7% Pass@16** 을 기록하여 다른 방법론보다 우수한 일반화 성능을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 RLVR 기반 LLM 미세 조정을 수행하는 AI/ML 엔지니어에게 다이버전스 선택이 다양성 붕괴와 파국적 망각을 완화하는 데 결정적인 역할을 한다는 중요한 통찰력을 제공합니다. **DPH-RL** 은 기존 방법론의 한계를 극복하고 모델의 **일반화 능력** 과 **다양한 추론 경로** 를 유지하는 실용적인 프레임워크를 제시합니다. 또한, **Generator-based implementation** 을 통해 온라인 참조 모델 없이도 학습이 가능하여 **훈련 효율성** 을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.