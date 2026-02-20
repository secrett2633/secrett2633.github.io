---
title: "[논문리뷰] A Practitioner's Guide to Multi-turn Agentic Reinforcement Learning"
excerpt: "arXiv에 게시된 'A Practitioner's Guide to Multi-turn Agentic Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-turn Reinforcement Learning
  - LLM Agents
  - Text-based Environments
  - Reward Shaping
  - Policy Optimization
  - Supervised Fine-tuning (SFT)
  - Generalization
  - Environment Complexity

permalink: /ai/review/2025-10-6-A-Practitioners-Guide-to-Multi-turn-Agentic-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01132)

**저자:** Ruiyi Wang, Prithviraj Ammanabrolu



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)을 에이전트로 훈련하기 위한 다중 턴(multi-turn) 강화 학습(RL)의 파편화된 접근 방식을 해결하고, 환경, 보상, 정책 세 가지 핵심 축을 중심으로 **실용적인 훈련 레시피** 를 도출하는 것을 목표로 합니다. 특히, 어떤 설계 선택이 LLM 에이전트의 성능에 결정적인 영향을 미치는지 체계적으로 분석하고 실무자를 위한 지침을 제공하고자 합니다.

## 핵심 방법론
연구는 **TextWorld, ALFWorld, SWE-Gym** 세 가지 텍스트 기반 환경에서 **Qwen2.5-1.5B, Qwen2.5-7B, Qwen3-8B** 모델을 활용하여 진행되었습니다. 환경 복잡도(공간, 객체, 퀘스트 길이)와 작업 다양성이 훈련 효율성에 미치는 영향을 분석했으며, 보상 측면에서는 **희소 보상(sparse)과 밀집 보상(dense)** 의 영향을 조사했습니다. 정책 측면에서는 **PPO, GRPO(biased)** 및 **RLOO(unbiased) 정책 경사 방법론** 과 **SFT(Supervised Fine-tuning)** 와 RL 훈련 간의 최적 비율을 탐색했습니다.

## 주요 결과
LLM 에이전트의 성능은 환경 복잡도에 따라 달라지며, **객체 복잡도가 공간 복잡도보다 더 큰 도전** 을 제시했습니다. 간단한 환경에서 훈련된 에이전트가 복잡한 환경으로 **성능을 효과적으로 일반화** 할 수 있음(예: w2-03-q4 훈련 모델이 w8-012-q4 성능을 **48% 향상** )을 확인했습니다. **60개의 SFT 데모와 400개의 RL 에피소드** 를 포함하는 최적의 SFT:RL 비율이 **w2-03-q4에서 85% 성공률** 을 달성하며 작업 정확도와 일반화 균형을 이루었습니다. **밀집된 턴 수준 보상** 이 훈련을 가속화하지만, 알고리즘별 튜닝이 필요하며, **RLOO는 다양한 보상 체계에서 견고한 성능** 을 보였습니다.

## AI 실무자를 위한 시사점
LLM 에이전트 개발 시, 복잡한 환경의 경우 **환경 복잡도를 점진적으로 늘려가며 훈련** 하고, **단순한 환경에서의 학습을 통해 더 복잡한 환경으로 일반화** 하는 전략을 고려해야 합니다. 제한된 자원 하에서는 **SFT를 통한 초기 정책 학습** 이 중요하며, **RL 훈련과의 균형** 을 통해 견고성과 일반화 성능을 동시에 확보해야 합니다. 마지막으로, **밀집된 턴 수준 보상** 은 훈련 효율성을 높이지만, 선택한 **RL 알고리즘과의 적합성** 을 신중하게 평가하여 보상 설계를 최적화해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.