---
title: "[논문리뷰] RPG: A Repository Planning Graph for Unified and Scalable Codebase
  Generation"
excerpt: "Steven Liu이 [arXiv]에 게시한 'RPG: A Repository Planning Graph for Unified and Scalable Codebase
  Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code Generation
  - LLMs
  - Repository Planning
  - Graph-based Representation
  - Software Engineering
  - Agent Frameworks
  - Scalable Codebase

permalink: /ai/review/2025-9-22-RPG_A_Repository_Planning_Graph_for_Unified_and_Scalable_Codebase_Generation/

toc: true
toc_sticky: true

date: 2025-09-22 13:11:29+0900
last_modified_at: 2025-09-22 13:11:29+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.16198)

**저자:** Steven Liu, Xin Zhang, Kyleraha, Cipherxzc, Luo2003



## 핵심 연구 목표
대규모 언어 모델(LLMs)이 함수 및 파일 수준 코드 생성에는 뛰어나지만, **완전한 저장소(repository)를 처음부터 생성**하는 데는 한계가 있습니다. 이는 제안 및 구현 단계 전반에 걸친 일관되고 신뢰할 수 있는 계획의 부재와 복잡한 소프트웨어 구조를 자연어가 모호하고 비구조적으로 표현하는 데서 비롯됩니다. 이 연구는 이러한 문제를 해결하고 장기적인 계획과 확장 가능한 저장소 생성을 가능하게 하는 통합된 표현 방식을 제안합니다.

## 핵심 방법론
본 연구는 제안 및 구현 수준의 계획을 통합하는 영구적인 표현인 **Repository Planning Graph (RPG)**를 도입합니다. RPG는 계층적 기능, 파일 구조, 데이터 흐름, 함수를 노드로, 의미적 관계와 데이터 흐름을 엣지로 인코딩하여 모호한 자연어를 명시적인 청사진으로 대체합니다. 이 RPG를 기반으로 **ZeroRepo**라는 그래프 기반 프레임워크를 개발하여, **제안 수준 계획**, **구현 수준 정제** (파일 스켈레톤, 인터페이스, 데이터 흐름 인코딩), **그래프 기반 코드 생성 및 테스트 검증**의 세 단계를 통해 저장소를 생성합니다.

## 주요 결과
**RepoCraft** 벤치마크(6개 실제 프로젝트, 1,052개 태스크)에서 ZeroRepo는 평균 **36K LOC** 규모의 저장소를 생성하여, 가장 강력한 기준선인 Claude Code보다 약 **3.9배**, 다른 기준선보다 약 **64배** 더 큽니다. 기능 커버리지 **81.5%**와 통과율 **69.7%**를 달성했으며, 이는 Claude Code를 각각 **27.3%**와 **35.8%p** 초과하는 수치입니다. 추가 분석 결과 RPG가 복잡한 종속성을 모델링하고, 기능성과 코드 크기의 거의 선형적인 확장을 지원하며, LLM의 저장소 이해도를 향상시켜 **에이전트 로컬라이제이션을 가속화**함을 보여줍니다.

## AI 실무자를 위한 시사점
RPG는 **대규모 소프트웨어 프로젝트**에서 **일관되고 확장 가능한 코드베이스 생성**을 위한 핵심적인 구조적 기반을 제공합니다. 이는 자연어 계획의 본질적인 한계를 극복하고, LLM 기반 에이전트가 **복잡한 종속성을 효율적으로 관리**하며 **장기적인 개발 주기**를 지원하도록 돕습니다. AI 실무자들은 RPG와 같은 그래프 기반 청사진을 활용하여 **코드 생성의 정확성과 효율성**을 극대화하고, LLM의 능력을 **단일 함수를 넘어선 시스템 수준**으로 확장하는 데 집중할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.