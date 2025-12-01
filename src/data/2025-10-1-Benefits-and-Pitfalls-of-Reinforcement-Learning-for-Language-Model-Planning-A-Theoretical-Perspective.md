---
title: "[논문리뷰] Benefits and Pitfalls of Reinforcement Learning for Language Model
  Planning: A Theoretical Perspective"
excerpt: "이 [arXiv]에 게시한 'Benefits and Pitfalls of Reinforcement Learning for Language Model
  Planning: A Theoretical Perspective' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Planning
  - Policy Gradient
  - Q-learning
  - Supervised Fine-Tuning
  - Diversity Collapse
  - Reward Hacking

permalink: /ai/review/2025-10-1-Benefits-and-Pitfalls-of-Reinforcement-Learning-for-Language-Model-Planning-A-Theoretical-Perspective/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22613)

**저자:** Siwei Wang, Yifei Shen, Haoran Sun, Shi Feng, Shang-Hua Teng, Li Dong, Yaru Hao, Wei Chen



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLM)의 계획 능력 향상을 위한 **강화 학습(RL) 방법론** 의 이점과 한계를 이론적으로 분석하는 것을 목표로 합니다. 특히, **지도 학습 미세 조정(SFT)** 이 지닌 근본적인 한계를 밝히고, **정책 경사(Policy Gradient, PG)** 및 **Q-러닝(Q-learning)** 의 학습 역학을 심층적으로 탐구하여 실제 LLM 계획 시스템에 대한 실용적인 통찰을 제공하고자 합니다.

## 핵심 방법론
LLM 계획 문제를 **그래프 기반의 경로 찾기 문제** 로 추상화하여, **정책 경사(PG)** 및 **Q-러닝** 두 가지 주요 RL 알고리즘의 학습 동역학을 분석했습니다. Q-러닝에 대해서는 **결과 보상(outcome reward)** 과 **과정 보상(process reward)** 이라는 두 가지 보상 설계의 영향을 비교 분석했습니다. 이론적 분석의 검증을 위해 **Erdős-Rényi 그래프** 및 **Blocksworld** 벤치마크를 활용한 실험을 수행했습니다.

## 주요 결과
**SFT** 는 훈련 데이터의 **동시 발생 관계를 암기** 하여 잘못된 경로를 생성하는 경향이 있는 반면, **RL** 은 탐색을 통해 더 나은 일반화를 달성했습니다. **PG** 는 훈련 정확도 100% 달성 후에도 출력 다양성이 지속적으로 감소하는 **다양성 붕괴(diversity collapse)** 현상을 보였습니다. 반면, **Q-러닝** 은 **과정 보상** 사용 시 다양성을 보존하면서 최적 정확도에 수렴하고 **오프-정책 학습** 을 지원하는 이점을 보였으나, **결과 보상** 만 사용하면 **거의 0에 가까운 정확도** 로 수렴하는 **보상 해킹** 문제를 겪었습니다.

## AI 실무자를 위한 시사점
LLM 계획 시스템 개발 시, **RL의 탐색 기반 학습** 이 SFT의 암기 한계를 극복하고 **더 나은 일반화 성능** 을 제공할 수 있음을 고려해야 합니다. 특히 **Q-러닝의 과정 보상 설계** 는 모델의 견고성과 다양성 유지에 필수적이므로, 보상 설계에 대한 신중한 접근이 필요합니다. **오프-정책 학습** 을 지원하는 Q-러닝은 대규모 LLM 환경에서 학습 효율성을 높이는 중요한 전략이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.