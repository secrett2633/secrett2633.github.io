---
title: "[논문리뷰] HERBench: A Benchmark for Multi-Evidence Integration in Video Question Answering"
excerpt: "이 [arXiv]에 게시한 'HERBench: A Benchmark for Multi-Evidence Integration in Video Question Answering' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Question Answering
  - Multi-evidence Integration
  - Video-LLMs
  - Benchmark
  - Temporal Reasoning
  - Frame Selection
  - Evidential Requirement
  - MRFS

permalink: /ai/review/2025-12-22-HERBench-A-Benchmark-for-Multi-Evidence-Integration-in-Video-Question-Answering/

toc: true
toc_sticky: true

date: 2025-12-22 00:00:00+0900+0900
last_modified_at: 2025-12-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.14870)

**저자:** Dan Ben-Ami, Gabriele Serussi, Kobi Cohen, Chaim Baskin



## 핵심 연구 목표
기존 VideoQA 벤치마크가 단일 단서나 언어 사전 지식에 의존하는 경향이 있어 다중 증거 통합 능력을 제대로 평가하지 못하는 문제를 해결하고자 합니다. **HERBench** 라는 새로운 벤치마크를 통해 **시간적으로 분리된 여러 시각적 증거** 를 통합하는 능력을 측정하고, 현재 Video-LLM의 이러한 복합적 추론 능력을 평가하는 것을 목표로 합니다.

## 핵심 방법론
**HERBench** 는 **26,806개** 의 객관식 질문으로 구성되며, 각 질문은 **최소 k ≥ 3개의 고유하고 비중복적인 시각적 단서** 를 통합해야만 정답을 맞힐 수 있도록 설계되었습니다. 증거 요구사항을 정량화하기 위해 모델이 정확한 답변을 위해 융합해야 하는 최소 프레임 수를 나타내는 **Minimum Required Frame-Set (MRFS)** 지표를 도입했습니다. **GPT-4o** 를 활용한 디커플링된 서술(A-카드, B-카드) 생성, **텍스트 전용 필터링** , 및 **인간 검증** 과정을 통해 언어적 편향과 단일 프레임 지름길을 배제했습니다.

## 주요 결과
**HERBench** 의 평균 **MRFS는 5.49** 로 기존 벤치마크(평균 **2.61~4.07** ) 대비 현저히 높았으며, 이는 다중 증거 통합의 필요성을 입증합니다. 최신 **13개 Video-LLM** 의 평균 정확도는 **38.2%** (최고 **42.1%** , 최저 **31.4%** )에 불과하여 **20%** 의 무작위 추측 기준선보다 약간 높은 수준입니다. 특히 **TSO** (Temporal Shot Ordering) 작업에서는 **0.1%** 의 낮은 정확도를 보여 다중 증거 통합 실패를 강조했습니다. 주요 병목 현상은 **프레임 선택 능력 부족** (Oracle Frames 대비 약 **3-6%** 낮은 성능)과 **정보 융합 능력 부족** (Oracle 프레임 제공 시에도 정확도 **50% 미만** )으로 나타났습니다.

## AI 실무자를 위한 시사점
**HERBench** 는 Video-LLM 개발자들이 **단순한 컨텍스트 길이 확장** 을 넘어 **다수의 분산된 시각적 단서를 효과적으로 통합** 하는 추론 능력 향상에 집중해야 함을 명확히 보여줍니다. 특히, **핵심 증거 프레임을 정확히 선택** 하는 알고리즘과 **제공된 정보를 종합적으로 융합** 하는 아키텍처 설계에 대한 연구가 시급합니다. **MRFS** 지표는 모델의 증거 요구사항 처리 능력을 정량적으로 추적하는 데 유용하며, 현재 모델의 낮은 성능은 이 분야에 상당한 발전 가능성이 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.