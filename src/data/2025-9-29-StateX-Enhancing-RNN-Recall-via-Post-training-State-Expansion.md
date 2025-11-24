---
title: "[논문리뷰] StateX: Enhancing RNN Recall via Post-training State Expansion"
excerpt: "Zhiyuan Liu이 [arXiv]에 게시한 'StateX: Enhancing RNN Recall via Post-training State Expansion' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - RNN
  - State Expansion
  - Post-training
  - Long-context Recall
  - Linear Attention
  - State Space Models
  - GLA
  - Mamba2

permalink: /ai/review/2025-9-29-StateX-Enhancing-RNN-Recall-via-Post-training-State-Expansion/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22630)

**저자:** Xingyu Shen*, Yingfa Chen*, Zhen Leng Thai, Xu Han, Zhiyuan Liu, & Maosong Sun



## 핵심 연구 목표
본 논문은 Transformer 대비 긴 컨텍스트 처리 효율이 높은 RNN 계열 모델들이 **고정된 크기의 recurrent state**로 인해 장문 컨텍스트에서의 정보 **회상 능력(recall ability)**이 떨어지는 문제를 해결하고자 합니다. 특히, 기존 방식처럼 더 큰 상태 크기로 RNN을 직접 훈련하는 높은 비용 없이, **사전 훈련된 RNN의 상태 크기를 효율적으로 확장**하여 회상 능력을 향상시키는 새로운 훈련 파이프라인인 **StateX**를 제안합니다.

## 핵심 방법론
**StateX**는 사전 훈련된 RNN의 상태를 **포스트 트레이닝(post-training)** 단계에서 확장하며, 이는 장문 컨텍스트 포스트 트레이닝(LPT) 이전에 수행됩니다. 구체적으로, **GLA(Gated Linear Attention)** 모델의 경우 여러 헤드를 하나의 더 큰 헤드로 병합하여 상태 크기를 늘리고, **Mamba2**와 같은 **State Space Models(SSM)**의 경우 **키(key) 차원(dk)**을 확장하는 아키텍처 수정을 도입합니다. 새롭게 도입된 파라미터는 **토큰 믹싱 관련 모듈만 재초기화**하고, FFN 및 임베딩 테이블은 기존 파라미터를 상속하며, 전체 레이어 중 **일부 레이어(기본값 4개)**만 확장하여 과도한 변경을 피합니다.

## 주요 결과
**StateX**는 1.3B 파라미터 **GLA** 모델에서 회상 집약적 태스크의 정확도를 **3.36%**, In-Context Learning(ICL) 성능을 **7.2%** 향상시켰으며, **64K 컨텍스트 길이**에서 NIAH(Needle-In-A-Haystack) 정확도를 **26.0%에서 42.2%**로 크게 개선했습니다. **Mamba2** 모델에서도 회상 태스크 정확도 **1.1%**, ICL 성능 **1.0%** 향상, NIAH 정확도 **33.2%에서 39.2%**로 개선되는 등 일관된 성능 향상을 보였습니다. 이는 **StateX**가 총 상태 크기를 약 **50%** 증가시키면서 달성된 결과입니다.

## AI 실무자를 위한 시사점
**StateX**는 AI 실무자들이 기존에 잘 훈련된 **RNN 모델**의 **장문 컨텍스트 처리 능력**을 효율적으로 개선할 수 있는 실용적인 방법을 제공합니다. 특히, **고비용의 전체 재훈련 없이** 상태 크기를 확장하고 성능을 향상시킬 수 있다는 점에서 자원 효율적인 모델 최적화에 기여합니다. **GLA**와 **Mamba2**와 같은 최신 RNN 아키텍처에 적용 가능한 구체적인 방법론을 제시하여, **Transformer에 대한 효율적인 대안**으로서 RNN의 활용 가능성을 넓혔습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.