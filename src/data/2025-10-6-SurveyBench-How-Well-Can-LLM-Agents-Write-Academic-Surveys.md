---
title: "[논문리뷰] SurveyBench: How Well Can LLM(-Agents) Write Academic Surveys?"
excerpt: "Shuo Wang이 [arXiv]에 게시한 'SurveyBench: How Well Can LLM(-Agents) Write Academic Surveys?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - LLM Agents
  - Academic Survey Generation
  - Evaluation Framework
  - Benchmark
  - Quiz-driven Evaluation
  - Content Quality Metrics

permalink: /ai/review/2025-10-6-SurveyBench-How-Well-Can-LLM-Agents-Write-Academic-Surveys/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03120)

**저자:** Zhaojun Sun, Xuzhou Zhu, Xuanhe Zhou, Xin Tong, Shuo Wang, Jie Fu, Guoliang Li, Zhiyuan Liu, Fan Wu



## 핵심 연구 목표
본 논문은 학술 조사 논문 작성에 대한 **대규모 언어 모델(LLM) 및 LLM 에이전트의 역량**을 엄격하게 평가하기 위해 **독자 요구사항에 부합하는 벤치마크**의 부재를 해결합니다. 기존 LLM 생성 요약의 **정보 불충분, 일관성 부족, 피상적 통찰력** 등의 한계를 체계적으로 밝히고, 이를 측정할 수 있는 **정교한 평가 프레임워크**를 제안하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **SurveyBench**라는 **세분화된 퀴즈 기반 평가 프레임워크**를 제안합니다. 이 프레임워크는 (1) **11,343개의 arXiv 논문**과 **4,947개의 고품질 서베이**에서 추출된 대표적인 서베이 주제 데이터셋을 포함합니다. (2) **인간 참조 기반** 및 **퀴즈 기반** 평가를 결합한 **이중 모드 평가 프로토콜**을 사용하며, (3) 개요 품질, 내용 품질, 비텍스트 요소의 풍부함을 평가하는 **다차원 지표 계층**을 포함합니다. 평가는 **LLM-as-judge** 방식과 **RAG(Retrieval-Augmented Generation) 기반 퀴즈**를 통해 이루어집니다.

## 주요 결과
**SurveyBench**를 통해 기존 LLM 기반 서베이 생성 방식들이 **인간 저술 서베이에 비해 현저히 낮은 성능**을 보임을 확인했습니다(내용 기반 평가에서 평균 **21% 낮은 점수**). 특히 LLM 생성 서베이는 **세부적인 내용, 연관 추론, 합성 및 추상화 능력**에서 부족함을 드러냈으며, 인간 서베이가 **비텍스트 요소 풍부함**에서 **OPENAI-DEEPRESEARCH** 대비 **약 5.56배** 높은 점수를 받았습니다. 그러나 LLM 모델들은 **미래 지향적 내용**을 일관되게 포함하는 강점을 보였습니다.

## AI 실무자를 위한 시사점
현재 LLM 기반 서베이 생성 시스템은 **기술적 깊이, 복합적 추론, 정보 합성** 측면에서 인간의 전문성에 크게 미치지 못합니다. AI 실무자들은 LLM이 **멀티모달 콘텐츠** (표, 그림), **심층적인 도메인 간 추론**, 그리고 단순 요약이 아닌 **고수준의 추상적 통찰력**을 생성하는 능력을 개선하는 데 집중해야 합니다. **SurveyBench**는 이러한 시스템의 한계를 명확히 드러내고, **독자 중심의 요구사항**을 반영하여 LLM 에이전트 기반 서베이 생성 기술을 발전시킬 수 있는 **강력한 평가 도구**를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.