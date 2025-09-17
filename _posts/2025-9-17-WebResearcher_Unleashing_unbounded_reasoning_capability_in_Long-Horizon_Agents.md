---
title: "[논문리뷰] WebResearcher: Unleashing unbounded reasoning capability in Long-Horizon
  Agents"
excerpt: "Wenbiao Yin이 [arXiv]에 게시한 'WebResearcher: Unleashing unbounded reasoning capability in Long-Horizon
  Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic AI
  - Deep Research
  - Iterative Reasoning
  - Long-Horizon Tasks
  - Context Management
  - Data Synthesis
  - Tool-Augmented LLMs
  - Markov Decision Process

permalink: /ai/review/2025-9-17-WebResearcher_Unleashing_unbounded_reasoning_capability_in_Long-Horizon_Agents/

toc: true
toc_sticky: true

date: 2025-09-17 13:16:01+0900
last_modified_at: 2025-09-17 13:16:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13309)

**저자:** Zile Qiao, Guoxin Chen, Xuanzhong Chen, Donglei Yu, Wenbiao Yin, Xinyu Wang, Zhen Zhang, Baixuan Li, Huifeng Yin, Kuan Li, Rui Min, Minpeng Liao, Yong Jiang, Pengjun Xie, Fei Huang, Jingren Zhou



## 핵심 연구 목표
본 논문은 기존의 심층 연구(deep-research) 에이전트들이 겪는 **컨텍스트 질식(context suffocation)** 및 **노이즈 오염(noise contamination)** 문제로 인한 추론 능력의 한계를 해결하는 것을 목표로 합니다. 특히 장기적인 연구 작업에서 **무한한 추론 능력(unbounded reasoning capability)**을 갖춘 AI 에이전트 개발을 통해 지식 발견 및 합성을 자동화하고자 합니다.

## 핵심 방법론
연구팀은 두 가지 핵심 요소로 **WebResearcher** 프레임워크를 제안합니다. 첫째, **IterResearch**는 심층 연구를 **Markov Decision Process**로 재정의하여 에이전트가 주기적으로 발견 사항을 통합하고 작업 공간을 재구성하도록 하여 컨텍스트 관리 문제를 극복합니다. 둘째, **WebFrontier**는 도구 증강 복잡도 확장(tool-augmented complexity escalation)을 통해 고품질의 훈련 데이터를 생성하는 확장 가능한 데이터 합성 엔진입니다.

## 주요 결과
**WebResearcher-heavy** 모델은 Humanity's Last Exam (HLE) 벤치마크에서 **36.7%**의 정확도를 달성하며 기존 최고 시스템인 **DeepSeek-V3.1 (29.8%)**과 **OpenAI Deep Research (26.6%)**를 능가했습니다. BrowseComp-en 웹 탐색 태스크에서는 **51.7%**의 정확도를 기록하여 최고 오픈소스 대안인 **DeepSeek-V3.1 (30.0%)**을 **21.7%p** 상회했습니다. 또한, 본 패러다임으로 생성된 훈련 데이터는 전통적인 단일 컨텍스트 방식의 에이전트 성능도 크게 향상시킴을 입증했습니다.

## AI 실무자를 위한 시사점
**WebResearcher**는 복잡한 장기 연구 태스크에서 **AI 에이전트의 지속적인 고품질 추론 능력**을 확보하는 데 필수적인 **반복적 합성 패러다임**을 제시합니다. **WebFrontier**를 통한 **고품질 합성 훈련 데이터** 생성 기법은 에이전트의 **도구 활용 능력**과 **정교한 추론 기술**을 강화하는 데 실용적인 해결책을 제공합니다. 이는 **context window 제약**이 있는 LLM 기반 에이전트의 성능 한계를 극복하고, 더욱 복잡하고 자율적인 AI 시스템을 구축하는 데 중요한 기반 기술이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.