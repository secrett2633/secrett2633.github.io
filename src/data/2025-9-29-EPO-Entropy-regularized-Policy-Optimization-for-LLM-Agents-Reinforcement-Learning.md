---
title: "[논문리뷰] EPO: Entropy-regularized Policy Optimization for LLM Agents
  Reinforcement Learning"
excerpt: "Li Yu-Jhe이 arXiv에 게시한 'EPO: Entropy-regularized Policy Optimization for LLM Agents
  Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Reinforcement Learning
  - Entropy Regularization
  - Policy Optimization
  - Sparse Rewards
  - Multi-turn Environments
  - Exploration-Exploitation

permalink: /ai/review/2025-9-29-EPO-Entropy-regularized-Policy-Optimization-for-LLM-Agents-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22576)

**저자:** Wujiang Xu, Wentian Zhao, Zhenting Wang, Yu-Jhe Li, Can Jin, Mingyu Jin, Kai Mei, Kun Wan, Dimitris N. Metaxas



## 핵심 연구 목표
본 논문은 **LLM 에이전트** 가 **스파스한 보상** 을 제공하는 **다중 턴 환경** 에서 겪는 "탐색-활용 캐스케이드 실패" 문제를 해결하고자 합니다. 이는 초기 단계의 정책 조기 수렴과 후기 단계의 정책 붕괴로 이어지는 불안정한 학습 패턴을 야기하며, 전통적인 RL의 엔트로피 제어로는 해결하기 어려운 고유한 과제를 해결하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 세 가지 메커니즘을 통합한 **Entropy-regularized Policy Optimization (EPO)** 프레임워크를 제안합니다. 첫째, **다중 턴 엔트로피 정규화** 를 통해 탐색을 강화하고, 둘째, **엔트로피 스무딩 정규화** 로 정책 엔트로피를 과거 평균(`HWk`) 내로 제한하여 급격한 변동을 방지합니다. 셋째, **적응형 단계 기반 가중치 부여(`βk`)** 를 통해 훈련 과정 전반에 걸쳐 탐색과 활용의 균형을 동적으로 조절합니다.

## 주요 결과
**EPO** 는 **ScienceWorld** 벤치마크에서 최대 **152%** 의 성능 향상을 달성했으며, **ALFWorld** 에서는 **19.8%** 까지 개선되었습니다. 특히, **PPO+EPO** 는 **ScienceWorld IID 태스크** 에서 평균 성공률( **152.1%** 향상)로 **GiGPO(53.4%)** 및 **RLVMR(67.2%)** 와 같은 에이전트 특화 RL 방법을 크게 능가했습니다. 또한, 기존에는 훈련 불가능했던 시나리오를 원활하게 수렴하는 최적화 문제로 전환하여 학습 안정성을 크게 개선했습니다.

## AI 실무자를 위한 시사점
**다중 턴 및 스파스 보상 환경** 에서 LLM 에이전트 훈련은 기존 RL과 근본적으로 다른 엔트로피 제어가 필요하다는 중요한 통찰을 제공합니다. **EPO 프레임워크** 는 복잡하고 장기적인 LLM 에이전트 태스크에서 성능과 훈련 안정성을 동시에 향상시키는 강력한 솔루션을 제시하며, 이는 LLM 에이전트 개발 및 응용에 있어 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.