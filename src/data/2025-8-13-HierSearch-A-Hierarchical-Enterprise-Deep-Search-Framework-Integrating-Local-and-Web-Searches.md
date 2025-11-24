---
title: "[논문리뷰] HierSearch: A Hierarchical Enterprise Deep Search Framework Integrating
  Local and Web Searches"
excerpt: "Qiang Ju이 [arXiv]에 게시한 'HierSearch: A Hierarchical Enterprise Deep Search Framework Integrating
  Local and Web Searches' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Hierarchical Reinforcement Learning
  - Deep Search
  - Multi-source RAG
  - Agentic AI
  - Knowledge Integration
  - Enterprise Search
  - Large Reasoning Models

permalink: /ai/review/2025-8-13-HierSearch-A-Hierarchical-Enterprise-Deep-Search-Framework-Integrating-Local-and-Web-Searches/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.08088)

**저자:** Jiejun Tan, Zhicheng Dou, Yan Yu, Jiehan Cheng, Qiang Ju, Jian Xie, Ji-Rong Wen



## 핵심 연구 목표
이 논문은 기업 환경에서 **로컬(사내 문서/지식 그래프) 및 웹 지식 소스**를 동시에 활용하는 딥 서치 시스템의 필요성에 주목합니다. 기존 단일 소스 딥 서치나 평면(flat) 강화 학습(RL) 기반의 다중 도구 통합 방식이 낮은 학습 효율성과 복잡한 도구 활용 능력 부족이라는 한계를 가짐에 따라, 이를 극복할 수 있는 **계층적 에이전트 기반 딥 서치 프레임워크**를 제안하여 사용자 질문에 대한 정확하고 포괄적인 답변을 제공하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **HierSearch**는 **계층적 강화 학습(HRL)**을 기반으로 하며, **로컬 딥 서치 에이전트**, **웹 딥 서치 에이전트** (하위 레벨) 및 이들을 조율하는 **플래너 에이전트** (상위 레벨)로 구성됩니다. 각 하위 에이전트는 해당 지식 소스 내의 검색 도구(예: **<chunk_search>**, **<graph_search>**, **<web_search>**, **<browse_url>**)를 전문적으로 숙달하며, 플래너 에이전트는 검색 계획을 수립하고 하위 에이전트의 결과를 통합합니다. 특히, **추론 인식 지식 리파이너**를 도입하여 하위 에이전트가 반환하는 **환각 및 비관련 증거**를 필터링합니다.

## 주요 결과
HierSearch는 **MuSiQue, OmniEval, BioASQ** 등 6개 벤치마크에서 기존 평면 RL 및 다양한 딥 서치/다중 소스 RAG 기준선 대비 **일관되게 우수한 성능**을 보였습니다. MuSiQue에서 **53.00 EM** 및 **62.83 F1** 점수를 달성하여 평면 RL 방식(HierSearchw/o HRL: 50.75 EM, 60.76 F1)을 능가했습니다. 또한, **병렬 검색 방식 대비 적은 검색 도구 호출**로 높은 효율성을 보이며, 특히 **웹 검색 도구 호출 빈도를 줄여** 비용 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡한 **다중 도메인 지식 통합**이 필요한 엔터프라이즈 AI 시스템 개발에 대한 실용적인 솔루션을 제공합니다. **HRL**의 적용은 대규모 도구 공간에서 **AI 에이전트의 학습 효율성 및 안정성을 개선**할 수 있음을 보여주므로, 복잡한 의사 결정 및 도구 활용을 요구하는 AI 시스템 설계에 중요한 통찰을 줍니다. 또한 **지식 리파이너**의 개념은 RAG 시스템의 **신뢰성과 정확성**을 높이는 데 기여하여, 실제 환경에서의 환각 문제 해결에 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.