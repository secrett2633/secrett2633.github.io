---
title: "[논문리뷰] SWE-Debate: Competitive Multi-Agent Debate for Software Issue Resolution"
excerpt: "Heng Lian이 [arXiv]에 게시한 'SWE-Debate: Competitive Multi-Agent Debate for Software Issue Resolution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent System
  - Software Engineering
  - Fault Localization
  - Issue Resolution
  - Large Language Models
  - Competitive Debate
  - Graph Traversal

permalink: /ai/review/2025-8-4-SWE-Debate-Competitive-Multi-Agent-Debate-for-Software-Issue-Resolution/

toc: true
toc_sticky: true

date: 2025-08-04 12:17:01+0900
last_modified_at: 2025-08-04 12:17:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.23348)

**저자:** Heng Lian, Xiaodong Gu, Shaoxin Lin, Yuling Shi, Han Li

**키워드:** `Multi-Agent System`, `Software Engineering`, `Fault Localization`, `Issue Resolution`, `Large Language Models`, `Competitive Debate`, `Graph Traversal`

## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 기반 소프트웨어 이슈 해결 시스템의 '제한된 관찰 범위(limited observation scope)' 문제를 해결하고자 합니다. 특히, 여러 코드 위치가 관련될 수 있는 복잡한 시나리오에서 단일 에이전트의 한계를 극복하고, 더 통합된 결함 위치 파악 및 해결을 위한 다양한 추론 경로를 활성화하는 것을 목표로 합니다.

## 핵심 방법론
SWE-Debate는 **경쟁적인 다중 에이전트 토론 프레임워크** 를 제안합니다. 먼저 코드베이스의 **정적 의존성 그래프** 를 구축하고, **의미론적 매칭** 을 통해 초기 진입 노드를 식별합니다. 이후, **그래프 탐색(BFS 및 DFS)** 을 통해 **여러 후보 결함 전파 추적(fault propagation traces)** 을 생성합니다. 마지막으로, **3단계 다중 에이전트 토론** (체인 선택, 수정 계획 제안, 경쟁적 전략 개선 및 종합)을 통해 가장 효과적인 수정 계획을 결정하며, 이는 **몬테카를로 트리 탐색(MCTS) 기반 패치 생성** 을 안내합니다.

## 주요 결과
**SWE-Bench-Verified 데이터셋** 에서 이슈 해결의 **Pass@1 성공률 41.4%** 를 달성하여, 동일 모델을 사용한 최강의 기준선( **DeepSeek-V3-0324 기반 OpenHands 및 SWE-Agent의 38.8%** ) 대비 **2.6% 포인트 개선** 을 보였습니다. 결함 위치 파악에서는 **SWE-Bench-Lite** 에서 **81.67%의 파일 수준 정확도** 를 기록하며, 최강의 기준선( **LocAgent with Claude-3.5 Sonnet의 77.74%** )보다 **3.93% 포인트 높은 성능** 을 나타냈습니다. 특히, **다중 체인 생성** 이 성능 향상에 **가장 크게 기여함(+10.0% Pass@1)** 이 입증되었습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡한 소프트웨어 엔지니어링 문제 해결에 있어 **구조화된 다중 에이전트 토론 및 그래프 기반 추론** 방식이 단일 에이전트 또는 단순 탐색 기반 방법론보다 우수함을 입증합니다. AI 실무자들은 이 프레임워크를 활용하여 **깊은 아키텍처 이해** 와 **다수의 잠재적 수정 위치에 대한 모호성 해결** 이 필요한 시나리오에서 더욱 견고하고 정확한 자동화된 이슈 해결 시스템을 구축할 수 있습니다. 이는 문제 해결 과정에서 순수한 협력보다는 **경쟁을 통한 다양한 추론 경로** 의 중요성을 시사하며 새로운 에이전트 시스템 설계 패러다임을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
