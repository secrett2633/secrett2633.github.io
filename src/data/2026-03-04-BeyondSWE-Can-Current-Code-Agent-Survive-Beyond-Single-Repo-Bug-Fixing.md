---
title: "[논문리뷰] BeyondSWE: Can Current Code Agent Survive Beyond Single-Repo Bug Fixing?"
excerpt: "arXiv에 게시된 'BeyondSWE: Can Current Code Agent Survive Beyond Single-Repo Bug Fixing?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code Agent Evaluation
  - Software Engineering LLMs
  - Cross-Repository Reasoning
  - Dependency Migration
  - Repository Generation
  - BeyondSWE
  - SearchSWE
  - External Knowledge Integration

permalink: /ai/review/2026-03-04-BeyondSWE-Can-Current-Code-Agent-Survive-Beyond-Single-Repo-Bug-Fixing/

toc: true
toc_sticky: true

date: 2026-03-04 00:00:00+0900+0900
last_modified_at: 2026-03-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.03194)

**저자:** Guoxin Chen, Fanzhe Meng, Jiale Zhao, Minghao Li, Daixuan Cheng, Huatong Song, Jie Chen, Yuzhi Lin, Hui Chen, Xin Zhao, Ruihua Song, Chang Liu, Cheng Chen, Kai Jia, Ji-Rong Wen



## 핵심 연구 목표
본 논문은 기존 코드 에이전트 벤치마크가 단일 저장소 버그 수정에 국한되어 크로스-저장소 추론, 도메인-특화 문제 해결, 의존성 기반 마이그레이션, 전체 저장소 생성과 같은 실제 소프트웨어 엔지니어링의 복잡한 요구사항을 간과하고 있음을 지적합니다. 이를 해결하기 위해 새로운 벤치마크 **BeyondSWE** 를 제시하여 현재 코드 에이전트의 실제 능력을 종합적으로 평가하고, 외부 지식 활용의 역할을 체계적으로 조사하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **500개의 실제 인스턴스** 와 **246개의 GitHub 저장소** 로 구성된 종합 벤치마크 **BeyondSWE** 를 구축했습니다. 이는 해결 범위와 지식 범위라는 두 가지 축을 따라 기존 평가를 확장합니다. 네 가지 평가 설정( **CrossRepo** , **DomainFix** , **DepMigrate** , **Doc2Repo** )을 통해 다양한 에이전트 능력을 측정합니다. 또한, 코드 작성 능력과 심층 연구 능력을 통합하는 에이전트 프레임워크인 **SearchSWE** 를 개발하여 웹 검색(SerpAPI 활용)과 코드 조작을 원활하게 연동하며, 치팅 방지를 위한 **블록리스트 메커니즘** 을 구현했습니다.

## 주요 결과
현재 최첨단 모델들은 **BeyondSWE** 에서 평균 **41.81% 미만의 성공률** 에 그쳐, **SWE-bench Verified** 에서의 80%+와는 대조적으로 상당한 역량 격차를 드러냈습니다. 특히 **DomainFix** 는 해결률이 **36%** 를 넘지 못해 도메인-특화 추론의 한계를 보였고, **Doc2Repo** 는 낮은 완전 성공률(최대 **2개 인스턴스** )로 아키텍처 일관성 문제점을 시사했습니다. **SearchSWE** 를 통한 검색 증강은 불일치한 성능 향상을 보였으며, 경우에 따라서는 성능 저하가 나타나(Seed-Coder의 CrossRepo 성능이 **44.72%에서 38.89%로 하락** ) 검색과 코딩 능력 간의 단절을 강조했습니다.

## AI 실무자를 위한 시사점
현재 코드 에이전트는 단일 저장소 버그 수정을 넘어선 복잡한 실제 소프트웨어 엔지니어링 문제에 **대응할 준비가 되어 있지 않음** 이 밝혀졌습니다. 단순히 검색 도구를 추가하는 것만으로는 불충분하며, 외부 지식을 효과적으로 통합하기 위해서는 관련 정보를 식별하고 노이즈를 필터링하는 **고도화된 통합 지능** 개발이 필수적입니다. **BeyondSWE** 는 이러한 통합 능력을 평가하기 위한 도전적이고 현실적인 벤치마크를 제공하며, 미래 코드 에이전트 연구의 촉매제가 될 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.