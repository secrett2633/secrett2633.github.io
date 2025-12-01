---
title: "[논문리뷰] Graph2Eval: Automatic Multimodal Task Generation for Agents via
  Knowledge Graphs"
excerpt: "Zeyi Liao이 [arXiv]에 게시한 'Graph2Eval: Automatic Multimodal Task Generation for Agents via
  Knowledge Graphs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agent Evaluation
  - Task Generation
  - Knowledge Graphs
  - Multimodal AI
  - Web Interaction
  - Document Comprehension
  - LLM-driven Agents

permalink: /ai/review/2025-10-7-Graph2Eval-Automatic-Multimodal-Task-Generation-for-Agents-via-Knowledge-Graphs/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.00507)

**저자:** Yurun Chen, Xavier Hu, Yuhan Liu, Ziqi Wang, Zeyi Liao, Lin Chen, Feng Wei, Yuxi Qian, Bo Zheng, Keting Yin, Shengyu Zhang



## 핵심 연구 목표
본 논문은 정적 데이터셋 기반의 평가가 **LLM 기반 에이전트** 의 실제 역량(특히 동적 환경 및 다단계 상호작용)을 적절히 측정하지 못하는 문제점을 해결하고자 합니다. 에이전트의 추론, 협업, 상호작용 능력을 포괄적으로 평가할 수 있는 **멀티모달 문서 이해** 및 **웹 상호작용 태스크** 를 자동으로 생성하는 프레임워크인 **GRAPH2EVAL** 을 제안하는 것이 주요 연구 목표입니다.

## 핵심 방법론
**GRAPH2EVAL** 은 멀티소스 외부 데이터(문서 및 웹)로부터 **지식 그래프** 를 구축하여 태스크 생성 공간으로 활용합니다. 이 지식 그래프에서 **하위 그래프 샘플링** , **태스크 템플릿** , 그리고 **메타-패스** 를 통해 의미론적 관계를 구조화된 멀티모달 태스크로 변환합니다. 생성된 태스크의 품질과 실행 가능성을 보장하기 위해 노드 도달성, **LLM 기반 스코어링** , 및 유사성 분석에 기반한 **다단계 필터링 파이프라인** 이 적용됩니다.

## 주요 결과
**GRAPH2EVAL-BENCH** 라는 1,319개의 태스크(문서 이해 1,002개, 웹 상호작용 317개)로 구성된 데이터셋을 구축했습니다. 태스크 생성 효율성 면에서 문서 이해 태스크는 평균 **34.87초** , 웹 상호작용 태스크는 평균 **95.51초** 가 소요되었습니다. 실험 결과, **GRAPH2EVAL** 은 **GPT-4o** 및 **Deepseek-V3** 와 같은 다양한 에이전트-모델 조합의 성능 차이를 효과적으로 구분했으며, 특히 **Agent S 2.5** 가 **SoM Agent** 보다 웹 상호작용에서 전반적으로 우수한 성능을 보여주었고, **gemini-2.5-flash** 와 조합 시 **69.20%** 의 성공률을 달성했습니다.

## AI 실무자를 위한 시사점
**GRAPH2EVAL** 은 LLM 기반 에이전트 평가를 위한 **확장 가능하고 동적인 태스크 생성 방법** 을 제시하여 수동 데이터셋 구축의 병목 현상을 해결합니다. 지식 그래프 기반 접근 방식은 복잡한 추론, 멀티모달성, 그리고 다단계 상호작용을 포함하는 에이전트의 역량을 심층적으로 평가할 수 있는 토대를 마련합니다. 이는 다양한 에이전트 아키텍처와 LLM 모델의 강점과 약점을 파악하고, 에이전트 개발 및 개선 방향을 제시하는 데 실질적인 도움이 됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.