---
title: "[논문리뷰] ARE: Scaling Up Agent Environments and Evaluations"
excerpt: "Matteo Bettini이 [arXiv]에 게시한 'ARE: Scaling Up Agent Environments and Evaluations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agent Environments
  - Agent Evaluation
  - LLM Agents
  - Asynchronous Systems
  - Reinforcement Learning
  - Tool Use
  - Multi-agent Collaboration
  - Benchmark

permalink: /ai/review/2025-9-23-ARE-Scaling-Up-Agent-Environments-and-Evaluations/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17158)

**저자:** Pierre Andrews, Amine Benhalloum, Matteo Bettini, Virginie Do, Romain Froger, et al.



## 핵심 연구 목표
논문은 AI 에이전트 개발 및 평가를 위한 **확장 가능한 연구 플랫폼인 Meta Agents Research Environments (ARE)**를 소개하고, 이를 기반으로 **일반 에이전트 역량을 측정하는 벤치마크인 Gaia2**를 제시합니다. 기존 벤치마크의 한계인 정적이고 이상화된 환경을 넘어, **실시간 상호작용, 동적 환경 적응, 비동기 통신**이 가능한 현실적인 에이전트 시스템의 성능을 평가하고 발전시키는 것을 목표로 합니다.

## 핵심 방법론
**ARE**는 **이벤트 중심(event-based)의 비동기 시뮬레이션 플랫폼**으로, **앱(Apps)**, **환경(Environments)**, **이벤트(Events)**, **알림(Notifications)**, **시나리오(Scenarios)**의 다섯 가지 핵심 개념을 통해 복잡한 상호작용을 모델링합니다. **Gaia2 벤치마크**는 스마트폰 환경을 모방한 **모바일 환경(Mobile environment)**에서 1,120개의 검증 가능한 시나리오로 구성되며, **ReAct 루프 기반의 에이전트 조정(orchestration)**과 **LLM 심판(judge)이 포함된 강력한 검증 시스템**을 사용하여 에이전트의 **읽기(read) 및 쓰기(write) 동작**을 평가합니다.

## 주요 결과
실험 결과, **GPT-5 (high) 모델**이 전반적인 성능에서 가장 뛰어나며 (**평균 42.1%**), 특히 **모호성(Ambiguity, 51.9%)**과 **적응성(Adaptability, 40.4%)**과 같은 어려운 범주에서 강점을 보였습니다. 하지만 모든 모델에서 **지능 스펙트럼 전반에 걸쳐 지배적인 시스템은 없었으며**, **시간(Time) 시나리오**에서는 추론 능력이 뛰어난 모델일수록 **추론 시간 증가**로 인해 성능이 저하되는 **역 스케일링(inverse scaling) 현상**이 관찰되었습니다. **Gaia2 예산 스케일링 곡선**은 현재 아키텍처와 컴퓨팅 전략에 대한 개선의 필요성을 강조했습니다.

## AI 실무자를 위한 시사점
**ARE 플랫폼**은 개발자가 현실과 유사한 **동적이고 비동기적인 환경**에서 에이전트를 개발하고 평가할 수 있는 기반을 제공합니다. 특히, **Gaia2 벤치마크**는 **시간 제약, 모호성 처리, 다중 에이전트 협업, 환경 노이즈 대응** 등 실용적인 에이전트에게 필요한 핵심 역량을 측정함으로써, 기존 정적 벤치마크의 한계를 뛰어넘는 새로운 평가 기준을 제시합니다. 에이전트 개발 시 **정확성뿐만 아니라 효율성과 응답 속도**를 고려한 **적응형 컴퓨팅 전략**의 중요성이 부각됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.