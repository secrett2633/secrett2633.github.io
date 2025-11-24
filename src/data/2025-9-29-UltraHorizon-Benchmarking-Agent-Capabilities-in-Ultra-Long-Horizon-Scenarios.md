---
title: "[논문리뷰] UltraHorizon: Benchmarking Agent Capabilities in Ultra Long-Horizon
  Scenarios"
excerpt: "Zeyu Qin이 [arXiv]에 게시한 'UltraHorizon: Benchmarking Agent Capabilities in Ultra Long-Horizon
  Scenarios' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Long-Horizon Reasoning
  - Benchmarking
  - Partially Observable
  - Tool Use
  - Memory Management
  - Exploration

permalink: /ai/review/2025-9-29-UltraHorizon-Benchmarking-Agent-Capabilities-in-Ultra-Long-Horizon-Scenarios/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21766)

**저자:** Zeyu Qin, Haoyu Wang, Xuelin Zhang, Huaisong Zhang, Haotian Luo



## 핵심 연구 목표
기존 LLM 에이전트 벤치마크가 짧은 호라이즌과 완전 관측 가능한 태스크에 집중하여 실제 복합 태스크에 필수적인 **지속적인 추론, 계획, 메모리 관리, 툴 사용 능력**을 충분히 평가하지 못하는 문제를 해결하는 것을 목표로 합니다. 장기 호라이즌 및 부분 관측 환경에서 에이전트의 근본적인 능력을 체계적으로 측정하기 위한 새로운 벤치마크를 제시합니다.

## 핵심 방법론
새로운 벤치마크 **UltraHorizon**을 도입했으며, 이는 **Mystery Grid**, **Sequence Exploration**, **Alien Genetics Laboratory**의 세 가지 고유한 환경에서 에이전트가 숨겨진 규칙을 반복적으로 발견하고 활용하는 **탐색 기반 태스크**를 수행하도록 설계되었습니다. 에이전트는 환경과의 지속적인 상호작용을 통해 추론, 계획, 메모리 및 툴 관리를 수행해야 합니다.

## 주요 결과
**UltraHorizon**의 가장 어려운 설정에서 에이전트 궤적은 평균 **200k+ 토큰**과 **400+ 툴 호출**에 달했으며, 표준 설정에서도 **35k 토큰**과 **60개 이상의 툴 호출**을 포함했습니다. LLM 에이전트는 이러한 설정에서 일관되게 낮은 성능을 보였고, 인간 참가자들이 더 높은 점수를 달성했습니다. 에이전트 실패의 주요 원인으로는 초기 패턴에 고착되는 **In-context Locking**과 장기 추론, 메모리 사용, 툴 호출 능력의 부족인 **Foundational Capability Gaps**가 확인되었습니다.

## AI 실무자를 위한 시사점
현재의 LLM 에이전트가 복잡한 실제 장기 태스크에 필요한 **지속적인 추론 및 탐색 능력**에서 상당한 한계를 가지고 있음을 명확히 보여줍니다. 단순히 상호작용 단계를 늘리는 **Naive Scaling**으로는 성능 향상이 제한적이며, **Context Refresh with Notes Recall (CRNR)**과 같은 지능적인 컨텍스트 관리 전략의 필요성을 강조합니다. 이 벤치마크는 차세대 에이전트 아키텍처 및 메모리 통합 연구를 위한 중요한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.