---
title: "[논문리뷰] Agentic Very Long Video Understanding"
excerpt: "이 [arXiv]에 게시한 'Agentic Very Long Video Understanding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long-Horizon Video Understanding
  - Agentic AI
  - Entity Graph
  - Multimodal Reasoning
  - Video Question Answering
  - EgoLifeQA
  - Retrieval Augmented Generation

permalink: /ai/review/2026-01-27-Agentic-Very-Long-Video-Understanding/

toc: true
toc_sticky: true

date: 2026-01-27 00:00:00+0900+0900
last_modified_at: 2026-01-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.18157)

**저자:** Aniket Rege, Arka Sadhu, Yuliang Li, Kejie Li, Ramya Korlakai Vinayak, Yuning Chai, Yong Jae Lee, Hyo Jin Kim



## 핵심 연구 목표
본 논문은 `항상 켜져 있는 개인 AI 비서`가 요구하는 `매우 긴 비디오 이해`의 과제를 해결하는 것을 목표로 합니다. 기존 대규모 언어 모델(LLM) 및 검색 증강 생성(RAG) 방식이 가진 **제한된 컨텍스트 윈도우** 와 **복합적인 다중 홉 추론 능력 부족** 문제를 극복하고, 며칠에서 몇 달에 걸친 시각 및 오디오 정보를 해석하고 회상할 수 있는 시스템을 개발하고자 합니다.

## 핵심 방법론
제안하는 `EGAgent`는 **엔티티 씬 그래프(entity scene graph)** 를 중심으로 하는 **에이전트 기반 프레임워크** 입니다. 이 그래프는 사람, 장소, 사물 및 그 관계를 시간 경과에 따라 **시간적 간격으로 주석** 하여 표현합니다. **계획 에이전트(planning agent)** 는 질의를 하위 태스크로 분해하고, **시각 검색(visual search)** , **오디오 전사 검색(audio transcript search)** , 그리고 **엔티티 그래프 검색(entity graph search)** 도구를 사용하여 관련 정보를 검색합니다. 검색된 정보는 **분석기 도구(analyzer tool)** 를 통해 정제된 후 **VQA 에이전트** 에 전달되어 최종 답변을 생성합니다.

## 주요 결과
`EgoLifeQA` 벤치마크에서 **57.5%** 의 정확도를 달성하며 이전 최첨단 성능을 **20.6% 초과** 달성했습니다. 특히, 다중 홉 관계형 추론이 필요한 `RelationMap` 카테고리에서 **62.4%** 를 기록하여 이전 SOTA 대비 **32%** 향상되었고, `TaskMaster` 카테고리에서는 **74.6%** 로 **39.7%** 향상된 성능을 보였습니다. `Video-MME (Long)` 벤치마크에서는 **74.1%** 의 경쟁력 있는 성능을 달성했으며, `AdaVideoRAG`와 유사한 성능을 보이면서도 **10배 적은 프레임을 처리** 했습니다.

## AI 실무자를 위한 시사점
**엔티티 씬 그래프** 를 활용한 구조화된 지식 표현은 LLM의 컨텍스트 한계를 넘어 **매우 긴 비디오에서 복잡한 다중 홉 및 교차 모달 추론** 을 가능하게 합니다. 이는 **개인 AI 비서** 와 같은 애플리케이션에서 장기적인 사용자 습관 분석, 사회적 상호작용 이해 등 `시간적 일관성 있는 비디오 이해`를 위한 중요한 발전입니다. 하지만 엔티티 그래프 구축의 정확성은 **상위 지각 및 언어 모델의 품질** 에 크게 의존하므로, 업스트림 모델의 성능 개선이 지속적으로 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.