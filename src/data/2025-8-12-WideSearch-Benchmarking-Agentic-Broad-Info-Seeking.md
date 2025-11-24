---
title: "[논문리뷰] WideSearch: Benchmarking Agentic Broad Info-Seeking"
excerpt: "Yan Gao이 [arXiv]에 게시한 'WideSearch: Benchmarking Agentic Broad Info-Seeking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Search
  - LLM
  - Benchmark
  - Information Seeking
  - Structured Output
  - Evaluation Metrics
  - Multi-agent Systems

permalink: /ai/review/2025-8-12-WideSearch-Benchmarking-Agentic-Broad-Info-Seeking/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.07999)

**저자:** Ryan Wong*, Jiawei Wang*, Junjie Zhao, Li Chen, Yan Gao, Long Zhang, Xuan Zhou, Zuo Wang, Kai Xiang, Ge Zhang, Wenhao Huang, Yang Wang, Ke Wang



## 핵심 연구 목표
본 논문은 광범위한 정보 탐색(WideSearch) 작업에서 LLM 기반 에이전트의 신뢰성과 완성도를 평가하기 위한 새로운 벤치마크를 제시합니다. 이는 기존 벤치마크가 놓치고 있던, **대규모의 원자적 정보를 철저하고 정확하게 수집하여 잘 정리된 출력으로 구성**하는 실세계 정보 탐색 시나리오를 평가하는 데 중점을 둡니다.

## 핵심 방법론
WideSearch 벤치마크는 실제 사용자 질의를 기반으로 수동으로 선별된 **200개(영어 100개, 중국어 100개)의 질문**으로 구성됩니다. 각 태스크는 에이전트가 **정의된 테이블 스키마**에 맞춰 대규모 정보를 수집하고 정렬하도록 요구하며, **엄격한 5단계 품질 관리 파이프라인**을 통해 데이터셋의 난이도, 완성도, 검증 가능성을 보장합니다. 평가는 **하이브리드 자동 평가 시스템** (규칙 기반 검사 및 **LLM-as-a-judge** 결합)을 통해 수행됩니다.

## 주요 결과
현재 최첨단 에이전트 검색 시스템들은 WideSearch 벤치마크에서 매우 낮은 성공률(SR)을 보이며, 심지어 최고 성능 모델도 **SR 5.1%**에 불과했습니다. 인간 평가자조차도 단일 작업에서 **SR 20%**를 기록했습니다. 실패의 주요 원인은 **불완전한 질의 분해**, **반성 및 반복 개선의 부족**, **증거 활용 오류**, **지식 환각** 등으로 나타났습니다. **멀티 에이전트 프레임워크**는 단일 에이전트 모드보다 **일관되게 우수한 성능**을 보였습니다.

## AI 실무자를 위한 시사점
현재 LLM 기반 에이전트는 **대규모 정보 탐색 작업에 심각한 한계**를 가지고 있으며, 이는 기본적인 인지 능력(계획, 반성)의 결함에서 비롯됩니다. **멀티 에이전트 아키텍처**는 작업의 광범위한 특성을 해결하는 데 더 효과적임을 입증하여, **병렬 검색 및 교차 검증**을 통한 인간의 협업 프로세스를 모방하는 방향으로의 발전이 중요함을 시사합니다. 미래 연구는 이러한 에이전트의 **견고성과 완성도를 개선**하는 데 집중해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.