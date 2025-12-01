---
title: "[논문리뷰] Agent-R1: Training Powerful LLM Agents with End-to-End Reinforcement Learning"
excerpt: "Yucong Luo이 [arXiv]에 게시한 'Agent-R1: Training Powerful LLM Agents with End-to-End Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Reinforcement Learning
  - Markov Decision Process
  - Tool Use
  - Multi-turn Interaction
  - Policy Optimization
  - Reward Shaping
  - Agent Framework

permalink: /ai/review/2025-11-19-Agent-R1-Training-Powerful-LLM-Agents-with-End-to-End-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-11-19 00:00:00+0900+0900
last_modified_at: 2025-11-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.14460)

**저자:** Mingyue Cheng, Jie Ouyang, Shuo Yu, Ruiran Yan, Yucong Luo, Zirui Liu, Daoyu Wang, Qi Liu, Enhong Chen



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)을 복잡한 다중 턴(multi-turn) 상호작용 태스크를 수행하는 에이전트로 훈련시키기 위한 **강화 학습(RL)의 효과적인 적용 방안** 을 모색합니다. 특히, 기존 RL 방법론의 한계와 유연한 훈련 프레임워크의 부재 문제를 해결하여, LLM 에이전트의 안정적이고 효율적인 end-to-end RL 훈련을 가능하게 하는 것을 목표로 합니다.

## 핵심 방법론
표준 **마르코프 결정 과정(MDP) 프레임워크를 LLM 에이전트의 문맥에 맞게 확장** 하여 상태 공간, 행동 공간, 상태 전이 확률, 보상 함수를 재정의합니다. 이 확장된 MDP를 기반으로, 모듈식의 유연한 훈련 프레임워크인 **Agent-R1** 을 제안합니다. Agent-R1은 외부 도구 호출 및 환경 상호작용을 처리하는 핵심 모듈인 **`Tool`과 `ToolEnv`** 를 포함하며, 다중 턴 롤아웃을 지원합니다. 또한, 정책 최적화 과정에서는 **`Action Mask`** 를 통해 에이전트가 생성한 토큰에만 손실을 계산하고, **`Advantage Mask`** 를 통해 정확한 신용 할당을 보장하며, **`intermediate process rewards`** 를 활용하여 더 조밀한 피드백을 제공합니다.

## 주요 결과
다중 홉 질의응답(Multi-hop QA) 벤치마크 태스크(HotpotQA, 2WikiMultihopQA, Musique)에서 실험한 결과, 모든 RL 훈련 에이전트가 **Base Tool Call(0.0847)** 및 **Naive RAG(0.1328)** 와 같은 기준선 모델을 **크게 능가** 했습니다. 특히 **GRPO 알고리즘** 이 평균 **EM 0.3877** 로 가장 우수한 성능을 보였으며, 가장 낮은 성능의 RL 에이전트( **REINFORCE++** , 평균 EM **0.3300** )조차도 Naive RAG보다 약 **2.5배** 높은 성능을 달성했습니다. 또한, **`loss mask`와 `advantage mask`** 의 유무에 따른 ablation study를 통해 이 두 요소가 정책 최적화에 **결정적인 역할** 을 함이 확인되었습니다.

## AI 실무자를 위한 시사점
이 연구는 RL이 LLM 에이전트의 복잡한 다중 턴 추론 및 도구 사용 능력 향상에 **핵심적인 기술** 임을 실증했습니다. **Agent-R1 프레임워크** 는 LLM 에이전트 개발자들이 다양한 외부 도구와 환경을 유연하게 통합하고, **정교한 보상 설계** 및 **정확한 신용 할당 메커니즘** 을 통해 에이전트를 효과적으로 훈련할 수 있는 기반을 제공합니다. 이를 통해 실무자들은 더 복잡하고 자율적인 AI 에이전트 시스템을 구축하고 배포하는 데 필요한 **강력한 방법론과 도구** 를 얻을 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.