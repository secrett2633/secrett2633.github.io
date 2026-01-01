---
title: "[논문리뷰] Valori: A Deterministic Memory Substrate for AI Systems"
excerpt: "varam17이 [arXiv]에 게시한 'Valori: A Deterministic Memory Substrate for AI Systems' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deterministic AI
  - Reproducible Computation
  - Fixed-Point Arithmetic
  - Vector Databases
  - AI Memory
  - State Machine
  - Auditability

permalink: /ai/review/2026-01-01-Valori-A-Deterministic-Memory-Substrate-for-AI-Systems/

toc: true
toc_sticky: true

date: 2026-01-01 00:00:00+0900+0900
last_modified_at: 2026-01-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.22280)

**저자:** Varshith Gudur



## 핵심 연구 목표
현대 AI 시스템, 특히 RAG(Retrieval Augmented Generation) 및 에이전트 워크플로우에서 **부동 소수점(floating-point) 연산** 으로 인해 발생하는 **비결정론적(non-determinism) 메모리 상태** 문제를 해결하는 것이 목표입니다. 동일한 모델, 입력, 코드가 다른 하드웨어 아키텍처(예: **x86 대 ARM** )에서 상이한 메모리 상태와 검색 결과를 초래하여 **재생 가능성(replayability)** 과 **감사 추적(audit trail)** 을 저해하는 문제를 해결하고자 합니다.

## 핵심 방법론
Valori는 **IEEE 754 부동 소수점 메모리 연산** 을 **Q16.16 고정 소수점(fixed-point) 연산** 으로 대체하여 메모리 연산의 결정론을 확보합니다. 메모리를 **재생 가능한 상태 머신(replayable state machine)** 으로 모델링하고, **HNSW(Hierarchical Navigable Small World)** 와 같은 인덱싱 구조의 내재된 무작위성을 **고정 정렬(Fixed Ordering)** , **데이터 종속 정렬(Data-Dependent Ordering)** 및 **고정 소수점 거리 측정** 을 통해 제거합니다. 이 시스템은 **no_std Rust 커널** 로 구현되어 하드웨어 독립적인 결정론적 실행 환경을 제공합니다.

## 주요 결과
x86과 ARM 아키텍처에서 동일한 임베딩 생성 시 **모든 차원에서 비트 수준의 차이** 를 확인하여 비결정론의 존재를 입증했습니다. **스냅샷 전송(Snapshot Transfer)** 테스트에서 서로 다른 플랫폼 간에 **비트-동일한 메모리 상태(HA = HB)** 가 보장됨을 확인했습니다. 또한, **Q16.16 고정 소수점 인덱스** 가 표준 **Float32 HNSW 인덱스** 대비 **99.8%의 평균 Recall@10** 을 달성하여, 결정론이 검색 품질에 미치는 영향이 미미함을 보여주었습니다. retrieval latency는 **500µs 미만** 으로 실시간 애플리케이션에 적합합니다.

## AI 실무자를 위한 시사점
Valori는 로보틱스, 국방, 금융 감사와 같은 **안전 및 규제 중요 애플리케이션** 에서 AI 시스템의 **재현 가능한 행동** 과 **감사 가능성** 을 보장하는 핵심 기반 기술을 제공합니다. **하드웨어 아키텍처에 독립적인 메모리 상태** 를 통해 분산 AI 및 합의 시스템에서 신뢰성 있는 상태 동기화를 가능하게 합니다. AI 엔지니어는 요구사항에 따라 **Q16.16** 외에 **Q32.32, Q64.64/Q128** 등 다양한 정밀도 계층을 **"메모리 계약(memory contract)"** 으로 선택하여 정밀도와 성능 간의 균형을 조절할 수 있습니다. 단, 임베딩 모델 자체의 비결정론은 Valori의 범위를 벗어나므로, 전체 AI 파이프라인의 결정론을 위해서는 모델 레벨의 추가 고려가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.