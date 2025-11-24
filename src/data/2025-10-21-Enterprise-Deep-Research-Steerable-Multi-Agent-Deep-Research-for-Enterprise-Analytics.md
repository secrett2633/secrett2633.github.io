---
title: "[논문리뷰] Enterprise Deep Research: Steerable Multi-Agent Deep Research for
  Enterprise Analytics"
excerpt: "이 [arXiv]에 게시한 'Enterprise Deep Research: Steerable Multi-Agent Deep Research for
  Enterprise Analytics' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent Systems
  - Deep Research
  - Enterprise AI
  - Human-in-the-Loop
  - Steerable AI
  - LLM Agents
  - Context Engineering
  - Enterprise Analytics

permalink: /ai/review/2025-10-21-Enterprise-Deep-Research-Steerable-Multi-Agent-Deep-Research-for-Enterprise-Analytics/

toc: true
toc_sticky: true

date: 2025-10-21 13:08:30+0900
last_modified_at: 2025-10-21 13:08:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17797)

**저자:** Akshara Prabhakar, Roshan Ram, Zixiang Chen, Silvio Savarese, Frank Wang*, Caiming Xiong, Huan Wang, Weiran Yao



## 핵심 연구 목표
본 논문은 기업이 비정형 데이터를 실용적인 통찰력으로 전환하는 과정에서 직면하는 어려움, 특히 기존 자율 에이전트의 도메인 특이성, 의도 정렬, 엔터프라이즈 통합 한계를 해결하고자 합니다. 기존 심층 연구 시스템의 불투명성과 비유연성을 극복하여, 동적이고 해석 가능한 인간-AI 협업을 통해 기업 분석을 위한 투명하고 조향 가능한 멀티 에이전트 프레임워크인 **Enterprise Deep Research (EDR)**를 구축하는 것을 목표로 합니다. 이는 사용자에게 세밀한 제어 권한을 제공하고 구조화된 증거 기반 보고서 생성을 자동화하는 것을 포함합니다.

## 핵심 방법론
EDR은 **LangGraph** 오케스트레이션을 통해 적응형 쿼리 분해를 수행하는 **Master Planning Agent**를 중심으로 구축됩니다. **ToDo Manager**는 `todo.md` 파일을 통해 작업 상태를 관리하고, **General, Academic, GitHub, LinkedIn** 등 네 가지 전문 검색 에이전트를 활용하여 광범위한 정보를 수집합니다. 또한 **NL2SQL**, 파일 분석, 시각화 및 엔터프라이즈 워크플로우를 지원하는 확장 가능한 **MCP 기반 도구 생태계**를 통합합니다. **Reflection Mechanism**은 지식 격차를 감지하고 연구 방향을 업데이트하며, 특히 **todo-driven steering framework**를 통해 사용자가 연구 실행 중에도 에이전트의 컨텍스트를 동적으로 수정하고 우선순위를 조정하여 인간-AI 협업을 강화합니다.

## 주요 결과
EDR은 **DeepResearch Bench**에서 **49.86**의 뛰어난 종합 점수를 달성하여 모든 독점 및 대부분의 오픈소스 에이전트 시스템을 능가했습니다. **DeepConsult** 평가에서는 **71.57%**의 최고 승률과 **6.82**의 평균 품질 점수를 기록하며 OpenAI DeepSearch 대비 우수한 성능을 입증했습니다. 내부 엔터프라이즈 유스케이스에서는 SQL 생성 및 실행에서 **95% 이상**의 정확도를, 시스템 가동 시간은 **99.9%**를 유지했습니다. 또한, 사용자 연구에서 **98%**의 작업 완료율과 복잡한 분석 작업에서 통찰력 확보 시간 **50% 감소**라는 실질적인 성과를 보였습니다.

## AI 실무자를 위한 시사점
EDR은 **LLM 기반 멀티 에이전트 시스템**이 기업의 이질적인 데이터 소스와 복잡한 워크플로우에 효과적으로 통합될 수 있음을 보여줍니다. 특히, **todo-driven steering framework**를 통한 인간-AI 협업과 실시간 조향 기능은 에이전트의 투명성과 제어 가능성을 대폭 향상시켜 엔터프라이즈 애플리케이션의 신뢰성과 유연성을 확보하는 데 핵심적입니다. 다양한 도메인별 전문 에이전트와 확장 가능한 도구 생태계는 기업의 광범위한 데이터에서 심층 연구를 자동화하고 고품질의 구조화된 보고서를 생성하는 데 중요한 전략적 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.