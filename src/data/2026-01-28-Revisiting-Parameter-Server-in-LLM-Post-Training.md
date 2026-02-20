---
title: "[논문리뷰] Revisiting Parameter Server in LLM Post-Training"
excerpt: "arXiv에 게시된 'Revisiting Parameter Server in LLM Post-Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Post-Training
  - Parameter Server
  - Distributed Training
  - FSDP
  - On-Demand Communication
  - Workload Imbalance
  - Communication Optimization
  - Deep Learning

permalink: /ai/review/2026-01-28-Revisiting-Parameter-Server-in-LLM-Post-Training/

toc: true
toc_sticky: true

date: 2026-01-28 00:00:00+0900+0900
last_modified_at: 2026-01-28 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.19362)

**저자:** Xinyi Wan, Penghui Qi, Guangxing Huang, Chaoyi Ruan, Min Lin & Jialin Li



## 핵심 연구 목표
대규모 언어 모델(LLM) 후처리 훈련 과정에서 **시퀀스 길이의 높은 편차** 로 인해 발생하는 **워크로드 불균형 문제** 를 해결하는 것이 목표입니다. 기존 **FSDP(Fully Sharded Data Parallel)** 의 집합적 통신(collective communication)이 야기하는 **미세한 동기화 장벽** 으로 인한 디바이스 유휴 시간과 비효율성을 개선하고자 합니다.

## 핵심 방법론
본 논문은 **On-Demand Communication (ODC)** 이라는 새로운 통신 방식을 제안합니다. 이는 **FSDP** 의 계층별 집합적 통신(all-gather 및 reduce-scatter)을 **직접적인 점대점 통신** 으로 대체합니다. ODC는 서버와 워커 역할을 공동 배치하는 **분산형 파라미터 서버** 형태로 **FSDP** 를 재구성하며, 동기화 수준을 계층별에서 **미니배치 수준** 으로 완화하여 디바이스 진행 상황을 분리합니다. 효율적인 부하 분산을 위해 **RDMA 기반 인터페이스(CUDA IPC, NVSHMEM)** 와 **Triton-Distributed** 를 활용합니다.

## 주요 결과
**ODC** 는 다양한 LLM 후처리 태스크(SFT, RL)에서 디바이스 활용도와 훈련 처리량을 일관되게 향상시켰습니다. 특히 SFT 태스크에서는 표준 **FSDP 대비 최대 36%의 속도 향상** 을 달성했습니다. **ODC** 는 미니배치 수준 부하 분산 전략인 `LB-Mini`와 결합 시 작은 미니배치 크기에서 기존 `LB-Micro` 대비 뛰어난 성능을 보였습니다. 단일 노드 내에서는 집합적 통신과 유사한 대역폭을 보이지만, 노드 간 통신에서는 다소 느려지는 경향이 관찰되었습니다.

## AI 실무자를 위한 시사점
LLM 훈련 시 **긴 시퀀스 길이로 인한 워크로드 불균형** 은 흔히 발생하는 문제로, **ODC** 는 이러한 비효율성을 효과적으로 완화하는 실용적인 솔루션을 제공합니다. **점대점 통신** 으로의 전환은 기존 분산 훈련 시스템의 동기화 병목 현상을 줄여 훈련 시간을 단축하고 컴퓨팅 자원 활용을 최적화할 수 있습니다. 다만, 노드 간 통신 오버헤드는 **계산-통신 오버랩** 이나 **하이브리드 샤딩** 과 같은 추가적인 최적화 기법을 통해 보완될 필요가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.