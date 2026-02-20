---
title: "[논문리뷰] General Agentic Memory Via Deep Research"
excerpt: "arXiv에 게시된 'General Agentic Memory Via Deep Research' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Agents
  - Memory Systems
  - Large Language Models (LLMs)
  - Just-in-Time (JIT) Compilation
  - Memorizer
  - Researcher
  - Reinforcement Learning
  - Context Management

permalink: /ai/review/2025-11-25-General-Agentic-Memory-Via-Deep-Research/

toc: true
toc_sticky: true

date: 2025-11-25 00:00:00+0900+0900
last_modified_at: 2025-11-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.18423)

**저자:** B.Y. Yan, Chaofan Li, Hongjin Qian, Shuqi Lu, Zheng Liu



## 핵심 연구 목표
AI 에이전트 분야에서 널리 사용되는 정적 메모리(AOT Compilation) 방식의 심각한 정보 손실 문제와 복잡한 컨텍스트 관리의 한계를 해결하는 것을 목표로 합니다. 이를 위해, 런타임에 최적화된 컨텍스트를 생성하고 전체 이력에 대한 효율적인 검색을 지원하는 새로운 프레임워크인 **General Agentic Memory (GAM)** 를 제안합니다.

## 핵심 방법론
**GAM** 은 **"just-in-time (JIT) compilation"** 원칙을 따르며, **Memorizer** 와 **Researcher** 라는 듀얼 에이전트 아키텍처를 활용합니다. **Memorizer** 는 오프라인 단계에서 핵심 이력 정보를 가벼운 메모리로 압축하고, 전체 이력은 **universal page-store** 에 보존합니다. **Researcher** 는 온라인 요청 시 사전 구축된 메모리의 안내를 받아 **page-store** 에서 필요한 정보를 검색, 통합하며, **반복적인 계획(Planning), 검색(Searching), 반성(Reflection)** 과정을 통해 심층 연구를 수행합니다. 또한, **강화 학습(reinforcement learning)** 기반의 **엔드-투-엔드 성능 최적화 프레임워크** 를 통해 **Memorizer** 와 **Researcher** 의 정책을 학습합니다.

## 주요 결과
**GAM** 은 **LoCoMo, HotpotQA, RULER, NarrativeQA** 등 다양한 메모리 기반 벤치마크에서 기존 메모리 시스템 대비 **일관되고 상당한 성능 향상** 을 보였습니다. 특히, **RULER** 벤치마크의 **multi-hop tracing (MT)** 작업에서 **90% 이상의 정확도** 를 달성하는 등, 복잡한 태스크와 긴 컨텍스트 길이에 대한 강력한 처리 능력을 입증했습니다. 또한, **GPT-4o-mini** 및 **Qwen2.5-14B** 같은 대규모 LLM 백본 사용 시 성능이 일관되게 향상되었으며, **연구 모듈(Researcher)** 이 **메모리 모듈(Memorizer)** 보다 **LLM 규모에 더 민감** 함을 보여주었습니다.

## AI 실무자를 위한 시사점
**GAM** 의 **JIT compilation** 접근 방식은 기존 **AOT 방식** 의 정보 손실 및 정적 구조 한계를 극복하며, **고충실도 및 작업 적응형 메모리 생성** 의 가능성을 제시합니다. 이는 AI 에이전트 개발 시 컨텍스트 관리의 효율성을 크게 향상시킬 수 있습니다. 또한, **LLM 기반 에이전트** 의 **테스트-시간 확장성** 을 활용하여 성능을 지속적으로 최적화할 수 있는 프레임워크를 제공하며, **다양한 검색 도구(embedding, BM25, page-ID)** 의 결합 사용과 **반성 깊이(reflection depth)** 조절을 통해 검색 성능을 극대화할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.