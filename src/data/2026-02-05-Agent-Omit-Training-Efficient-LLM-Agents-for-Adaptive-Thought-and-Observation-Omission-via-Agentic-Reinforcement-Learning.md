---
title: "[논문리뷰] Agent-Omit: Training Efficient LLM Agents for Adaptive Thought and Observation Omission via Agentic Reinforcement Learning"
excerpt: "arXiv에 게시된 'Agent-Omit: Training Efficient LLM Agents for Adaptive Thought and Observation Omission via Agentic Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Agent Efficiency
  - Context Management
  - Thought Omission
  - Observation Omission
  - Reinforcement Learning
  - Adaptive Policy

permalink: /ai/review/2026-02-05-Agent-Omit-Training-Efficient-LLM-Agents-for-Adaptive-Thought-and-Observation-Omission-via-Agentic-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2026-02-05 00:00:00+0900+0900
last_modified_at: 2026-02-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.04284)

**저자:** Yansong Ning, Jun Fang, Naiqiang Tan, Hao Liu



## 핵심 연구 목표
이 논문은 LLM 에이전트가 복잡한 실제 작업을 수행할 때 발생하는 **과도한 사고(thought) 및 관찰(observation) 컨텍스트 축적 문제** 를 해결하고 효율성을 향상시키는 것을 목표로 합니다. 기존 연구들이 상호작용 궤적 전체를 균일하게 처리하여 턴별로 변화하는 사고 필요성과 관찰 유용성을 간과하는 한계를 극복하고, 에이전트가 **적응적으로 불필요한 컨텍스트를 생략** 할 수 있는 프레임워크를 개발하는 것이 주된 목적입니다.

## 핵심 방법론
제안된 **Agent-Omit** 프레임워크는 두 단계로 구성됩니다. 첫째, `Agent Omission Behavior Synthesis` 단계에서는 에이전트에게 생략 행동 형식을 가르치기 위해 **단일 턴 및 다중 턴 생략 시나리오를 포함하는 콜드 스타트 데이터** 를 합성하고 **파라미터 전체 미세 조정** 을 수행합니다. 둘째, `Omit-Aware Agentic Reinforcement Learning` 단계에서는 **듀얼 샘플링 메커니즘** 과 **맞춤형 생략 보상(Omission Reward)** 을 통합하여 에이전트의 적응적 생략 능력을 점진적으로 향상시킵니다. 생략 보상 `Romit`는 절약된 토큰 비율을 기반으로 하며, 작업 보상 `Rtask`가 0일 경우 `Romit`도 0으로 설정하여 보상 해킹을 방지하고, **GRPO(Group Relative Policy Optimization)** 를 사용하여 다중 목표 정책 학습을 안정화합니다.

## 주요 결과
**Qwen3-8B** 모델을 기반으로 구축된 **Agent-Omit-8B** 는 5가지 에이전트 벤치마크(DeepSearch, WebShop, TextCraft, BabyAI, SciWorld)에서 실험되었습니다. 이 모델은 7개의 최첨단 LLM 에이전트(예: **DeepSeek-R1-0528** )와 비교하여 **Pass@1 정확도에서 대등한 성능** 을 달성하면서도 **토큰 비용을 크게 절감** 했습니다. 특히, 7개의 효율적인 LLM 에이전트 방법론(예: **Thinking-Retention** , **ReSum** ) 중에서도 **가장 우수한 효과-효율성(effectiveness-efficiency) 트레이드오프** 를 보였으며, 평균적으로 **3~4턴의 사고/관찰을 적응적으로 생략** 하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 에이전트의 효율성 향상에 있어 **컨텍스트 관리가 매우 중요** 하며, 단순히 컨텍스트를 압축하는 것을 넘어 **턴별로 적응적으로 불필요한 사고와 관찰을 생략** 하는 방식이 효과적임을 입증했습니다. 특히, **중간 턴에서의 생략 빈도가 높다** 는 분석 결과는 실제 에이전트 설계 시 초기 계획 및 최종 답변 생성 단계의 컨텍스트 보존 중요성을 시사합니다. **Agent-Omit** 프레임워크는 **데이터 합성 및 에이전트 강화 학습** 을 통해 이러한 적응적 생략 능력을 학습시키는 새로운 패러다임을 제공하여, 제한된 컴퓨팅 자원에서 LLM 에이전트의 성능을 극대화하려는 실무자들에게 유용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.