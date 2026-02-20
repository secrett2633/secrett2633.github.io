---
title: "[논문리뷰] GISA: A Benchmark for General Information-Seeking Assistant"
excerpt: "arXiv에 게시된 'GISA: A Benchmark for General Information-Seeking Assistant' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Search Agents
  - Information Seeking
  - Benchmark
  - LLM-driven Agents
  - Human Trajectories
  - Deep and Wide Search
  - Deterministic Evaluation
  - Dynamic Evaluation

permalink: /ai/review/2026-02-10-GISA-A-Benchmark-for-General-Information-Seeking-Assistant/

toc: true
toc_sticky: true

date: 2026-02-10 00:00:00+0900+0900
last_modified_at: 2026-02-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.08543)

**저자:** Yutao Zhu, Xingshuo Zhang, Maosen Zhang, Jiajie Jin, Liancheng Zhang, Xiaoshuai Song, Kangzhi Zhao, Wencong Zeng, Ruiming Tang, Han Li, Ji-Rong Wen, Zhicheng Dou



## 핵심 연구 목표
기존 검색 에이전트 벤치마크들이 갖는 비현실적인 태스크 구성, 단일 정보 유형 집중, 정적 데이터로 인한 데이터 오염, 과정 수준 감독 부재 등의 한계를 극복하는 것을 목표로 합니다. 이를 위해 실제 정보 탐색 시나리오를 반영하고 심층 추론 및 광범위한 정보 통합을 지원하는 **종합적인 벤치마크 GISA** 를 제시합니다.

## 핵심 방법론
**373개의 수작업 질의** 로 구성된 GISA는 **아이템, 세트, 리스트, 테이블** 의 네 가지 구조화된 답변 형식을 제공하여 **결정론적 평가** 를 가능하게 합니다. 또한, 실시간 정보 접근이 필요한 **라이브 데이터셋** 을 포함하여 모델 암기 방지 및 동적 평가를 지원하며, 모든 질의에 대한 **완전한 인간 검색 궤적** 을 제공하여 과정 수준 감독 및 모방 학습에 활용될 수 있도록 합니다.

## 주요 결과
최고 성능 모델인 **Claude 4.5 Sonnet (thinking)조차 전체 EM 점수 19.30%** 에 그쳐, 현존하는 검색 에이전트들이 복잡한 정보 탐색 태스크를 안정적으로 해결하는 데 아직 갈 길이 멂을 보여줍니다. 특히, 복잡한 계획과 광범위한 정보 수집이 필요한 **테이블 형식 태스크** 에서 성능 저하가 두드러지며, 상업용 검색 제품들도 LLM 기반 ReAct 에이전트를 능가하지 못했습니다.

## AI 실무자를 위한 시사점
현재 AI 검색 에이전트는 문제 분해, 적응형 검색 계획, 효율적인 도구 활용 및 **구조화된 답변 형식 처리** 등 여러 방면에서 상당한 개선이 필요합니다. GISA의 **인간 검색 궤적** 은 에이전트 훈련을 위한 귀중한 **모방 학습** 및 **보상 모델링** 데이터를 제공하며, **라이브 데이터셋** 은 모델이 실제 검색 능력을 개발하도록 유도하는 데 중요한 역할을 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.