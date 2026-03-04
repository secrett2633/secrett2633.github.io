---
title: "[논문리뷰] InfoPO: Information-Driven Policy Optimization for User-Centric Agents"
excerpt: "Yuyu Luo이 arXiv에 게시한 'InfoPO: Information-Driven Policy Optimization for User-Centric Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Policy Optimization
  - Information Gain
  - Credit Assignment
  - Multi-turn Interaction
  - User-centric Agents
  - Counterfactual Reasoning

permalink: /ai/review/2026-03-04-InfoPO-Information-Driven-Policy-Optimization-for-User-Centric-Agents/

toc: true
toc_sticky: true

date: 2026-03-04 00:00:00+0900+0900
last_modified_at: 2026-03-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.00656)

**저자:** Fanqi Kong, Jiayi Zhang, Mingyi Deng, Chenglin Wu, Yuyu Luo, Bang Liu



## 핵심 연구 목표
본 논문은 사용자 중심의 대규모 언어 모델(LLM) 에이전트가 **불완전하게 명시된(underspecified) 사용자 목표** 를 해결하기 위한 **다중 턴(multi-turn) 상호작용의 비효율성** 문제를 다룹니다. 특히, 기존의 GRPO(Group-Relative Policy Optimization) 기반 방법론이 겪는 **희소하고 지연된 보상** 으로 인한 **크레딧 할당(credit assignment) 문제** 와 학습 불안정성을 해결하고, 상호작용을 통한 능동적인 불확실성 감소 과정을 최적화하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **InfoPO(Information-Driven Policy Optimization)** 는 상호작용의 각 턴에서 **카운터팩츄얼 정보 이득(turn-level counterfactual information-gain)** 보상을 계산합니다. 이 보상은 에이전트의 다음 행동 분포에 대한 피드백이 얼마나 의미 있는 변화를 유도했는지 측정하며, 실제 피드백과 **마스킹된 피드백 카운터팩츄얼** 을 비교하여 산출됩니다. 이 내재적 보상 신호는 태스크 완료를 위한 외부 보상과 **적응형 분산 게이팅(adaptive variance-gated fusion)** 전략을 통해 결합되어, 정보 탐색과 태스크 지향적 목표 달성 사이의 균형을 유지하며 학습 안정성을 높입니다.

## 주요 결과
InfoPO는 **UserGym, ColBench, T²-Bench** 세 가지 벤치마크에서 기존의 강력한 프롬프팅 및 다중 턴 RL 기준선들을 일관되게 능가하는 성능을 보였습니다. 특히, GRPO 기반 방법론 대비 **14%에서 16%** 더 높은 성능을 달성했으며, 초기 학습 단계에서 **0에 가까운 외부 보상 분산** 으로 인해 학습이 정체되는 상황을 효과적으로 해결했습니다. 또한, 사용자 시뮬레이터 변경 및 비사용자 상호작용 환경에서도 견고한 일반화 성능을 입증했습니다.

## AI 실무자를 위한 시사점
InfoPO는 **LLM 에이전트의 복잡한 사용자 협업 최적화** 를 위한 원칙적이고 확장 가능한 메커니즘을 제공합니다. 특히 **희소한 보상 환경** 에서 **밀도 높은 턴-레벨 크레딧 할당** 을 통해 학습 효율성을 크게 향상시킬 수 있습니다. 이를 통해 AI 에이전트가 사용자의 불분명한 의도를 조기에 파악하고 정보 탐색과 실제 태스크 실행을 효과적으로 조화시키는 전략을 자율적으로 학습하는 데 기여하며, **보다 견고하고 안정적인 대화형 AI 시스템 구축** 에 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.