---
title: "[논문리뷰] FinSearchComp: Towards a Realistic, Expert-Level Evaluation of Financial
  Search and Reasoning"
excerpt: "Jiashuo Liu이 [arXiv]에 게시한 'FinSearchComp: Towards a Realistic, Expert-Level Evaluation of Financial
  Search and Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Financial LLMs
  - Agent Benchmarking
  - Open-domain Search
  - Financial Reasoning
  - Time-Sensitive Data
  - Multi-hop QA
  - Tool Use

permalink: /ai/review/2025-9-19-FinSearchComp-Towards-a-Realistic-Expert-Level-Evaluation-of-Financial-Search-and-Reasoning/

toc: true
toc_sticky: true

date: 2025-09-19 13:12:21+0900
last_modified_at: 2025-09-19 13:12:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13160)

**저자:** Jiashuo Liu, Jianpeng Jiao, Liang Hu, Wenhao Huang, zhangysk



## 핵심 연구 목표
본 연구는 LLM 기반 에이전트의 현실적인 금융 데이터 검색 및 추론 능력을 평가하기 위한 **종단 간(end-to-end) 벤치마크**의 부재를 해결하는 것을 목표로 합니다. 기존 벤치마크들이 검색 능력이나 실제 금융 분석가의 복잡한 워크플로우를 충분히 반영하지 못하는 한계를 극복하고, 전문가 수준의 난이도를 가진 개방형 금융 검색 및 추론 평가 체계를 구축하고자 합니다.

## 핵심 방법론
연구팀은 **70명의 전문 금융 전문가**를 활용하여 **FinSearchComp** 벤치마크를 구축했습니다. 이 벤치마크는 **635개의 질문**으로 구성되며, **글로벌 및 중화권 시장**을 포괄하는 세 가지 현실적인 분석가 작업(Time-Sensitive Data Fetching, Simple Historical Lookup, Complex Historical Investigation)을 포함합니다. 평가 방법론으로는 동적인 답변과 숫자 허용 오차를 고려하여 **LLM-as-a-Judge** 방식을 채택했으며, **21개 모델**을 평가하여 웹 검색 및 금융 플러그인의 중요성을 분석했습니다.

## 주요 결과
평가 결과, **Grok 4 (web)**가 글로벌 서브셋에서 **68.9%**의 점수로 최고 성능을 달성하여 전문가 수준에 근접한 정확도를 보였습니다. 중화권 서브셋에서는 **DouBao (web)**가 선두를 차지했으나, 인간 전문가의 성능(**글로벌 75.0%**, **중화권 88.3%**)에는 여전히 상당한 격차가 존재합니다. 에이전트에 **웹 검색 및 금융 플러그인**을 장착했을 때 **FinSearchComp**에서의 성능이 크게 향상되었음이 입증되었습니다. 또한, **T1(시간 민감성)부터 T3(복합 조사)로 갈수록 모델 성능이 단조적으로 감소**하여 태스크의 난이도 증가를 확인했습니다.

## AI 실무자를 위한 시사점
**FinSearchComp**는 금융 분야 AI 에이전트 개발을 위한 현실적이고 도전적인 **종단 간 평가 프레임워크**를 제공합니다. 에이전트의 **정확한 도구 사용(tool use) 능력**과 **도메인 특화된 검색 인프라**의 중요성을 강조하며, **얕은 검색, 오래되거나 잘못된 시간 스탬프의 데이터, 단위 불일치, 회계 보고서 캘린더 정렬 오류** 등 현재 LLM의 주요 실패 모드를 명확히 제시하여 향후 연구 및 개발 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.