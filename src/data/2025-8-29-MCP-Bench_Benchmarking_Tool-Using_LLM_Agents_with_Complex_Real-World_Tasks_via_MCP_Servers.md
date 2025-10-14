---
title: "[논문리뷰] MCP-Bench: Benchmarking Tool-Using LLM Agents with Complex Real-World
  Tasks via MCP Servers"
excerpt: "Shashank Biju이 [arXiv]에 게시한 'MCP-Bench: Benchmarking Tool-Using LLM Agents with Complex Real-World
  Tasks via MCP Servers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Tool Use
  - Benchmarking
  - Model Context Protocol (MCP)
  - Cross-Domain Orchestration
  - Fuzzy Instructions
  - Multi-Step Tasks
  - Real-World Scenarios

permalink: /ai/review/2025-8-29-MCP-Bench_Benchmarking_Tool-Using_LLM_Agents_with_Complex_Real-World_Tasks_via_MCP_Servers/

toc: true
toc_sticky: true

date: 2025-08-29 13:14:44+0900
last_modified_at: 2025-08-29 13:14:44+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.20453)

**저자:** Zhenting Wang, Qi Chang, Hemani Patel, Shashank Biju, Cheng-En Wu, Quan Liu, Aolin Ding, Alireza Rezazadeh, Ankit Shah, Yujia Bao, Eugene Siow



## 핵심 연구 목표
이 논문은 기존 도구 사용 벤치마크의 한계를 극복하고, **LLM 에이전트**가 실제와 같은 복잡한 다단계 작업을 수행할 수 있도록 평가하는 대규모 벤치마크인 **MCP-Bench**를 소개합니다. 특히 **퍼지 지침** 하에서의 도구 검색, **교차 도구 조정**, **정확한 매개변수 제어**, **장기 계획/추론** 능력을 평가하는 데 중점을 둡니다.

## 핵심 방법론
**MCP-Bench**는 **Model Context Protocol (MCP)**을 기반으로, **28개의 실제 MCP 서버**에 걸쳐 **250개의 도구**를 **LLM 에이전트**에 연결합니다. 작업은 **LLM 기반 합성 파이프라인**을 통해 자동으로 생성되며, 도구 I/O 서명에서 종속성 체인을 발견하고 **퍼지하고 지침이 최소화된 변형**으로 변환됩니다. 평가는 **도구 유효성, 스키마 준수, 런타임 성공**을 측정하는 **규칙 기반 검사**와 **LLM-as-a-Judge 채점 프레임워크**를 결합한 **이중 계층 프레임워크**를 사용합니다.

## 주요 결과
**20개의 고급 LLM**에 대한 실험 결과, **GPT-5 (0.749)** 및 **O3 (0.715)**와 같은 최강 모델이 **스키마 준수율 98% 이상**을 달성하며 강력한 도구 사용 능력을 보였지만, **높은 수준의 추론 능력** (계획 및 실행 효율성)에서는 여전히 어려움을 겪고 있음을 드러냈습니다. 특히 **멀티 서버 환경**에서 **작은 모델들은 성능 저하**가 두드러지며, **GPT-40** 및 **O3**와 같은 강력한 모델은 **30-40회 도구 호출과 6-8 라운드**로 더 효율적인 실행을 보여주었습니다.

## AI 실무자를 위한 시사점
**MCP-Bench**는 **LLM 에이전트**의 **장기 계획**, **교차 도메인 오케스트레이션**, **퍼지 지침** 하에서의 **도구 선택**과 같은 핵심 역량에 대한 지속적인 격차를 드러냅니다. 이는 AI 개발자들이 단순히 도구 사용의 정확성을 넘어, **실제 환경의 복잡성**과 **예측 불가능성**에 대처할 수 있는 **더욱 견고하고 적응력 있는 에이전트**를 구축하는 데 필요한 연구 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.