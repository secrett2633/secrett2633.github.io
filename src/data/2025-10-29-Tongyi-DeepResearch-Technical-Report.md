---
title: "[논문리뷰] Tongyi DeepResearch Technical Report"
excerpt: "arXiv에 게시된 'Tongyi DeepResearch Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic LLM
  - Deep Research
  - Information Seeking
  - Reinforcement Learning
  - Synthetic Data
  - Context Management
  - Tool Use
  - Open-source AI

permalink: /ai/review/2025-10-29-Tongyi-DeepResearch-Technical-Report/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24701)

**저자:** Tongyi DeepResearch Team, Tongyi Lab Alibaba Group



## 핵심 연구 목표
본 논문은 장기적인 정보 탐색 및 심층 연구 태스크를 위해 설계된 에이전트형 대규모 언어 모델인 **Tongyi DeepResearch** 를 소개하고 오픈소스화하는 것을 목표로 합니다. 기존의 폐쇄형 시스템들이 가진 접근성의 한계를 극복하고, 확장 가능하며 체계적인 방법론을 통해 자율적인 AI 연구 에이전트 역량을 부여하고자 합니다.

## 핵심 방법론
**Tongyi DeepResearch** 는 **에이전트형 중간 훈련(agentic mid-training)** 과 **에이전트형 사후 훈련(agentic post-training)** 을 결합한 **종단 간 훈련 프레임워크** 를 통해 개발되었습니다. 이 훈련은 **완전히 자동화되고 확장 가능한 데이터 합성 파이프라인** 을 활용하며, 각 훈련 단계에 맞춰 맞춤형 환경을 구축합니다. 또한, **ReAct 프레임워크** 를 기반으로 하며 **마르코프식 상태 재구성을 통한 컨텍스트 관리 패러다임** 을 적용하여 긴 컨텍스트 문제를 해결합니다. **Search, Visit, Python Interpreter, Google Scholar, File Parser** 와 같은 다양한 도구를 활용하여 정보 탐색 및 문제 해결 능력을 강화합니다.

## 주요 결과
**Tongyi DeepResearch** 는 총 **30.5억 개의 파라미터** 를 가지며, 토큰당 **3.3억 개의 파라미터** 만 활성화됩니다. Humanity's Last Exam에서 **32.9** , BrowseComp에서 **43.4** , BrowseComp-ZH에서 **46.7** , WebWalkerQA에서 **72.2** , GAIA에서 **70.9** , xbench-DeepSearch에서 **75.0** , FRAMES에서 **90.6** 의 성능을 달성하여 다수의 에이전트형 심층 연구 벤치마크에서 최신 기술(SOTA)을 달성했습니다. 이는 **OpenAI-03, DeepSeek-V3.1** 과 같은 강력한 상용 시스템들을 능가하는 수치입니다. 특히 **Heavy Mode** 에서는 Humanity's Last Exam에서 **38.3%** , BrowseComp-ZH에서 **58.1%** 로 성능이 더욱 향상되었습니다.

## AI 실무자를 위한 시사점
**Tongyi DeepResearch** 는 오픈소스 심층 연구 에이전트의 새로운 표준을 제시하며, AI/ML 엔지니어들에게 **확장 가능한 에이전트 훈련 프레임워크** 와 **데이터 합성 파이프라인** 에 대한 실용적인 통찰력을 제공합니다. **3.3억 개의 활성화 파라미터** 라는 효율적인 구조는 엣지 디바이스 배포 및 다양한 실세계 시나리오에서의 활용 가능성을 높이며, **도구 사용 및 컨텍스트 관리** 의 중요성을 강조합니다. 이 모델과 프레임워크의 공개는 자율적인 AI 에이전트 연구 커뮤니티의 발전을 가속화할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.