---
title: "[논문리뷰] Understanding DeepResearch via Reports"
excerpt: "Chengen Huang이 [arXiv]에 게시한 'Understanding DeepResearch via Reports' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - DeepResearch Agents
  - LLM-as-a-Judge
  - Report Evaluation
  - Agentic AI
  - Factuality
  - Redundancy
  - Research Automation
  - Benchmark

permalink: /ai/review/2025-10-13-Understanding_DeepResearch_via_Reports/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07861)

**저자:** Tianyu Fan, Xinyao Niu, Yuxiang Zheng, Fengji Zhang, Chengen Huang, Bei Chen, Junyang Lin, Chao Huang



## 핵심 연구 목표
본 논문은 지식 집약적 연구 작업을 수행하는 **DeepResearch 에이전트**의 복합적인 평가 문제에 주목합니다. 기존 LLM 평가 방법론은 단일 기능에 집중하여 시스템의 총체적 성능을 반영하지 못하므로, 연구 보고서를 통해 DeepResearch 시스템의 통합적 역량을 포괄적으로 평가할 수 있는 새로운 프레임워크를 제안하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 DeepResearch 시스템의 산출물인 보고서를 평가하기 위한 **DEEPRESEARCH-REPORTEVAL** 프레임워크를 제안합니다. 이 프레임워크는 **LLM-as-a-Judge** 방식을 사용하여 보고서의 **품질(Quality)**, **중복성(Redundancy)**, **사실성(Factuality)** 세 가지 핵심 차원을 평가합니다. 특히 품질은 **종합성, 일관성, 명확성, 통찰력, 전반적 품질**의 5개 하위 차원으로 구성되며, 중복성 평가에는 **LLM-as-a-Judge 기반의 단락 쌍별 중복성 측정**이 사용됩니다. 사실성은 **청구-출처 정렬 평가**를 통해 **평균 지원 점수(Average Support Score)** 및 **강력 지원 비율(Strong Support Rate)**로 측정되며, **LLM-인간 정렬 프로세스**를 통해 신뢰성을 확보합니다.

## 주요 결과
**DEEPRESEARCH-REPORTEVAL** 프레임워크는 **낮은 MAD(Mean Absolute Deviation)** 값(품질 **0.72**, 중복성 **0.31**, 사실성 **0.29**)으로 **인간 전문가 판단**과 높은 일치를 보였습니다. 또한, LLM 기반 평가와 인간 전문가 순위 간에 **61.11%**의 정확한 일치율을 달성했습니다. **OpenAI, Perplexity, Gemini, Qwen** 등 4가지 상용 DeepResearch 시스템 평가 결과, **Qwen**이 **종합성 3.80점, 전반적 품질 3.54점, 평균 지원 점수 0.55점, 강력 지원 비율 0.69%**로 가장 우수한 성능을 보이며 분석 깊이와 사실성에서 강점을 드러냈습니다.

## AI 실무자를 위한 시사점
**DEEPRESEARCH-REPORTEVAL** 프레임워크는 DeepResearch 시스템의 **종합적인 평가**를 위한 실용적이고 체계적인 방법론을 제공합니다. AI 실무자들은 이 프레임워크를 활용하여 **AI 에이전트의 보고서 품질, 내용의 중복성, 사실적 정확성**을 효과적으로 측정하고 개선할 수 있습니다. 특히, **LLM-as-a-Judge** 방법론의 높은 신뢰성은 복잡한 생성 AI 시스템 평가에 대한 새로운 방향성을 제시하며, DeepResearch 시스템의 **연구 자동화 및 신뢰성 향상**에 중요한 기여를 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.