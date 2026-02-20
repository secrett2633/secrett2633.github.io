---
title: "[논문리뷰] ReplicationBench: Can AI Agents Replicate Astrophysics Research Papers?"
excerpt: "Ian L. V. Roque이 arXiv에 게시한 'ReplicationBench: Can AI Agents Replicate Astrophysics Research Papers?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Agents
  - Astrophysics Research
  - Reproducibility Benchmark
  - Large Language Models
  - Scientific Workflow
  - Code Execution
  - Evaluation Framework

permalink: /ai/review/2025-10-29-ReplicationBench-Can-AI-Agents-Replicate-Astrophysics-Research-Papers/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24591)

**저자:** Christine Ye, Sihan Yuan, Suchetha Cooray, Steven Dillmann, Ian L. V. Roque



## 핵심 연구 목표
이 논문은 AI 에이전트, 특히 대규모 언어 모델(LLM) 기반 에이전트가 과학 연구를 수행하는 능력을 평가하는 것을 목표로 합니다. 구체적으로 **ReplicationBench** 라는 평가 프레임워크를 도입하여 AI 에이전트가 천체물리학 연구 논문 전체를 얼마나 충실하고 정확하게 재현할 수 있는지를 측정하고, 이는 개방형 과학 연구 워크플로우에서 에이전트의 신뢰성을 판단하는 기준이 됩니다.

## 핵심 방법론
**ReplicationBench** 는 19개의 천체물리학 논문에서 파생된 **107개의 전문가 작성 연구 등급 태스크** 와 ReplicationBench-Plus 확장의 **58개 LLM 생성, 전문가 큐레이션 태스크** 로 구성됩니다. 에이전트는 **샌드박스화된 코드 실행 환경** 에서 논문의 실험 설정, 파생, 데이터 분석 및 코드베이스를 포함한 핵심 기여를 재현해야 하며, 최대 **6시간의 실행 시간** 과 **500만 토큰** 제한 내에서 평가됩니다. 평가의 공정성을 위해 원본 논문의 수치 데이터는 마스킹 처리됩니다.

## 주요 결과
**ReplicationBench** 는 현재 첨단 언어 모델들에게 매우 어려운 과제로, 가장 성능이 좋은 모델인 **Claude 3.7 Sonnet** 조차 평균 **19.3%** 의 낮은 점수를 기록했습니다. 전반적으로 모든 모델은 **20% 미만** 의 점수를 보였으며, **Gemini 2.5 Pro** 는 **10.6%** , **Claude 3.7 Sonnet** 은 **19.3%** 를 달성했습니다. 질적 분석을 통해 **끈기 부족** , **절차적 오류** (개념적 오해 및 지시 따르기 실패), **기술적 실행 실패** (자원 제약, 부정확한 코드 생성) 등 다양한 실패 모드가 확인되었으며, 암기율은 **9% 미만** 으로 측정되었습니다.

## AI 실무자를 위한 시사점
AI 에이전트가 복잡한 과학 연구를 재현하는 데 있어 현재 상당한 한계를 가지고 있음을 보여주며, **개념적 이해** 와 **견고한 실행 능력** 향상의 필요성을 강조합니다. 이 벤치마크는 천체물리학을 넘어선 데이터 기반 과학 분야에서 에이전트의 신뢰성을 평가하기 위한 **확장 가능하고 객관적인 프레임워크** 를 제공합니다. 향후 AI 에이전트 개발은 **끈기** , **절차적 정확성** , **기술적 숙련도** 를 개선하는 데 중점을 두어야 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.