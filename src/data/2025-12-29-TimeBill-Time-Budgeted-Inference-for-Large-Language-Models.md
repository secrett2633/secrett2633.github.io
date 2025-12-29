---
title: "[논문리뷰] TimeBill: Time-Budgeted Inference for Large Language Models"
excerpt: "Yehan Ma이 [arXiv]에 게시한 'TimeBill: Time-Budgeted Inference for Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Inference
  - Time Budgeting
  - KV Cache Eviction
  - Response Length Prediction
  - Execution Time Estimation
  - Real-time AI
  - Performance Optimization

permalink: /ai/review/2025-12-29-TimeBill-Time-Budgeted-Inference-for-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-29 00:00:00+0900+0900
last_modified_at: 2025-12-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.21859)

**저자:** Qi Fan, An Zou, Yehan Ma



## 핵심 연구 목표
시간 제약이 있는 시스템(예: 로봇 공학, 자율 주행)에서 대규모 언어 모델(LLM)의 응답 성능을 유지하면서 주어진 시간 예산 내에 추론을 완료하는 문제를 해결하는 것이 목표입니다. 기존 LLM 추론 방식이 자동 회귀 특성으로 인해 실행 시간을 예측하기 어렵고, 고정된 **KV 캐시** 설정으로는 다양한 시간 예산에 적응하기 어렵다는 한계를 극복하고자 합니다.

## 핵심 방법론
본 논문은 **TimeBill** 이라는 새로운 시간 예산 추론 프레임워크를 제안합니다. 이는 **미세 조정된 응답 길이 예측기(RLP)** 를 통해 정확한 응답 길이를 예측하고, **작업 부하 기반 실행 시간 추정기(ETE)** 로 **FLOPs 분석** 과 **프로파일링 기반 피팅** 을 통합하여 종단 간 실행 시간을 추정합니다. 이 예측된 시간을 바탕으로, 시간 예산 제약 내에서 응답 성능을 최적화하기 위해 **KV 캐시 제거 비율(α)** 을 동적으로 조정하는 메커니즘을 개발했습니다.

## 주요 결과
**RLP** 는 기존 **BERT 기반 예측기(ProxyModel, S³)** 보다 우수한 성능을 보였으며, 특히 **512개 버킷** 설정에서 MAE **42.71** 로 가장 낮은 오차를 달성했습니다. **ETE** 는 prefill 단계에서 MAPE **1.22%** , 디코딩 단계에서 MAPE **1.69%** 라는 낮은 오차로 실행 시간을 정확하게 추정했습니다. **TimeBill** 은 **Vanilla** 추론, 고정 α **KV 캐시 제거** , **AWQ** 와 비교하여 최첨단 평균 응답 성능 점수를 달성했으며, 동시에 **α=95%** 와 유사한 높은 작업 완료율을 유지했습니다.

## AI 실무자를 위한 시사점
**TimeBill** 은 실시간 시스템에 LLM을 배포하려는 AI/ML 엔지니어에게 매우 실용적인 솔루션을 제공합니다. **응답 길이 및 실행 시간 예측** 을 통해 **KV 캐시 제거 비율** 을 동적으로 조정하여 시간 제약을 준수하면서도 성능을 최적화하는 방법을 제시합니다. 또한, **비관적 요인 k** (예: k=5)의 도입은 실시간 시스템의 견고성을 확보하는 데 중요한 고려사항임을 강조하며, 배포 환경과 요구 사항에 따라 신중한 설정이 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.