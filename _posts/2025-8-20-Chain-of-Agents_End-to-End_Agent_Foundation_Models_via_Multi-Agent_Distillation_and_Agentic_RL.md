---
title: "[논문리뷰] Chain-of-Agents: End-to-End Agent Foundation Models via Multi-Agent
  Distillation and Agentic RL"
excerpt: "Liam-Liu이 [arXiv]에 게시한 'Chain-of-Agents: End-to-End Agent Foundation Models via Multi-Agent
  Distillation and Agentic RL' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Chain-of-Agents
  - Agent Foundation Models
  - Multi-Agent Systems
  - Tool-Integrated Reasoning
  - Multi-agent Distillation
  - Agentic Reinforcement Learning
  - LLMs
  - End-to-End Learning

permalink: /ai/review/2025-8-20-Chain-of-Agents_End-to-End_Agent_Foundation_Models_via_Multi-Agent_Distillation_and_Agentic_RL/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.13167)

**저자:** Liam-Liu, hugteste, kangz, wanwan1212, tianyue818



## 핵심 연구 목표
본 논문은 기존의 다중 에이전트 시스템(MAS)과 도구 통합 추론(TIR) 패러다임이 가진 한계를 극복하고, 단일 **LLM(Large Language Model)** 내에서 다중 에이전트 협업 능력을 내재화하여 복잡한 문제 해결을 위한 **종단 간(End-to-End)** 에이전트 파운데이션 모델(AFM)을 구축하는 것을 목표로 합니다. 이는 높은 계산 오버헤드, 일반화 어려움, 데이터 중심 학습 부족 문제를 해결하고자 합니다.

## 핵심 방법론
저자들은 **Chain-of-Agents (CoA)**라는 새로운 LLM 추론 패러다임을 제안합니다. 이는 **롤 플레잉 에이전트(예: Thinking Agent, Plan Agent)**와 **도구 에이전트(예: Search Agent, Code Generate Agent)**를 동적으로 조율하여 복잡한 태스크를 해결합니다. 핵심 훈련 방식으로는 최첨단 다중 에이전트 프레임워크의 역량을 LLM으로 이전하는 **다중 에이전트 증류(Multi-agent Distillation)**와, 검증 가능한 에이전트 태스크에 대한 **에이전트 강화 학습(Agentic Reinforcement Learning)**을 통해 모델의 성능을 최적화합니다.

## 주요 결과
제안된 AFM은 약 20개의 다양한 에이전트 벤치마크에서 새로운 최고 성능을 달성했습니다. 특히, **32B 모델** 크기에서 GAIA 웹 에이전트 벤치마크에서 **Pass@1 성공률 55.3%**, LiveCodeBench v5에서 **47.9%**, AIME2025 수학 추론 벤치마크에서 **59.8%**의 해결률을 기록하며 기존 TIR 방법론을 크게 능가했습니다. 또한, 전통적인 다중 에이전트 시스템 대비 추론 비용(토큰 소비량)을 **84.6%** 절감하는 효율성을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 단일 LLM으로 복잡한 다중 에이전트 협업을 효율적으로 처리할 수 있는 새로운 가능성을 제시합니다. AI/ML 엔지니어는 **Chain-of-Agents** 프레임워크를 통해 복잡한 웹 탐색, 코드 생성, 수학적 추론 등 다양한 도메인에서 보다 효율적이고 강력한 에이전트 애플리케이션을 개발할 수 있습니다. 특히, **계산 비용 절감**과 **향상된 일반화 능력**은 실제 서비스 배포에 큰 이점을 제공하며, 오픈 소스화된 연구 결과는 관련 분야의 후속 연구 및 개발에 중요한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.