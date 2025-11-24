---
title: "[논문리뷰] DeepAgent: A General Reasoning Agent with Scalable Toolsets"
excerpt: "Jiajie Jin이 [arXiv]에 게시한 'DeepAgent: A General Reasoning Agent with Scalable Toolsets' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autonomous Agents
  - Large Language Models
  - Tool Use
  - Reinforcement Learning
  - Memory Management
  - Tool Retrieval
  - Agentic Reasoning

permalink: /ai/review/2025-10-27-DeepAgent-A-General-Reasoning-Agent-with-Scalable-Toolsets/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.21618)

**저자:** Xiaoxi Li, Wenxiang Jiao, Jiarui Jin, Guanting Dong, Jiajie Jin, Yinuo Wang, Hao Wang, Yutao Zhu, Ji-Rong Wen, Yuan Lu, Zhicheng Dou



## 핵심 연구 목표
기존 LLM 기반 에이전트의 정형화된 워크플로우, 동적 도구 발견의 부재, 비효율적인 장기 상호작용 및 메모리 관리 한계를 극복하는 것을 목표로 합니다. **DeepAgent**는 자율적인 사고, 도구 발견, 행동 실행을 단일의 응집력 있는 추론 프로세스 내에서 수행하여 복잡한 실제 문제를 해결할 수 있는 일반적인 추론 에이전트를 개발하고자 합니다.

## 핵심 방법론
**DeepAgent**는 자율적으로 사고하고 도구를 검색하며 행동을 실행하는 단일 추론 프로세스를 따릅니다. 장기 상호작용 문제를 해결하기 위해 과거 상호작용을 구조화된 에피소드, 작업 및 도구 메모리로 압축하는 **자율 메모리 폴딩(Autonomous Memory Folding) 메커니즘**을 도입했습니다. 또한, 일반적인 도구 사용 능력을 효율적이고 안정적으로 훈련하기 위해 **LLM-시뮬레이션 API**와 도구 호출 토큰에 대한 **미세한 어드밴티지 할당(tool-call advantage attribution)**을 활용하는 종단 간 강화 학습 전략인 **ToolPO**를 개발했습니다.

## 주요 결과
**DeepAgent**는 8가지 벤치마크(ToolBench, API-Bank, TMDB, Spotify, ToolHop, ALFWorld, WebShop, GAIA, HLE)에서 기존 베이스라인 대비 일관되게 우수한 성능을 보였습니다. 특히, 일반 도구 사용 태스크에서 **TMDB** 성공률 **89.0%**, **Spotify** 성공률 **75.4%**를 달성했으며, 개방형 도구 검색 시나리오의 **ToolBench**에서 **64.0%**, **ToolHop**에서 **40.6%**를 기록하며 베이스라인을 크게 능가했습니다. **메모리 폴딩** 및 **ToolPO 훈련**은 DeepAgent의 성능에 필수적임이 ablation 연구를 통해 확인되었습니다.

## AI 실무자를 위한 시사점
**DeepAgent**는 자율적 도구 검색 및 사용을 통합한 에이전트 아키텍처를 제시하여 복잡한 실제 문제 해결을 위한 새로운 가능성을 열었습니다. **자율 메모리 폴딩 메커니즘**은 LLM 에이전트가 장기적인 대화 및 상호작용에서 발생하는 **컨텍스트 길이 문제**를 효과적으로 관리하는 실용적인 방법을 제공합니다. **ToolPO**와 **LLM-시뮬레이션 API**는 실제 API 사용의 불안정성 및 높은 비용 없이 대규모 도구 세트를 활용하는 에이전트를 **안정적이고 효율적으로 훈련**할 수 있는 강력한 접근 방식을 제공하여, 실제 애플리케이션에 대한 에이전트 배포 가능성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.