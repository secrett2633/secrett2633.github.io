---
title: "[논문리뷰] Data Repetition Beats Data Scaling in Long-CoT Supervised Fine-Tuning"
excerpt: "Yuki M. Asano이 [arXiv]에 게시한 'Data Repetition Beats Data Scaling in Long-CoT Supervised Fine-Tuning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Supervised Fine-tuning (SFT)
  - Chain-of-Thought (CoT)
  - Data Repetition
  - Data Scaling
  - LLM Training
  - Generalization
  - Overfitting
  - Reasoning Models

permalink: /ai/review/2026-02-12-Data-Repetition-Beats-Data-Scaling-in-Long-CoT-Supervised-Fine-Tuning/

toc: true
toc_sticky: true

date: 2026-02-12 00:00:00+0900+0900
last_modified_at: 2026-02-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.11149)

**저자:** Dawid J. Kopiczko, Sagar Vaze, Tijmen Blankevoort, Yuki M. Asano



## 핵심 연구 목표
본 논문은 Chain-of-Thought (CoT) 데이터를 활용한 지도 미세 조정(SFT) 단계에서 **제한된 고품질 데이터** 를 가장 효과적으로 활용하는 방법을 탐구합니다. 기존의 데이터 확장 직관과는 반대로, 더 많은 고유 샘플을 사용하는 대신 **데이터 반복(epochs)** 이 성능에 미치는 영향을 분석하여 최적의 훈련 전략을 제시하고자 합니다.

## 핵심 방법론
연구팀은 **Olmo3-7B, Qwen3-4B, Qwen3-8B** 등 사전 훈련된 LLM을 사용하여 **Dolci SFT 7B 데이터셋** 에서 실험했습니다. **고정된 총 그라디언트 업데이트 예산(B = 51,200)** 하에 에포크 수와 고유 샘플 수를 체계적으로 변경하며, **Acc@n, Pass@n, Termination rate** 등의 추론 성능 지표를 측정했습니다. 또한, **훈련 토큰 정확도, 검증 손실, MMLU** 등을 통해 메모리화 및 치명적 망각 현상을 분석했습니다.

## 주요 결과
**Olmo3-7B 모델** 은 **400개 샘플로 128 에포크** 훈련 시, **51,200개 샘플로 1 에포크** 훈련 대비 AIME 및 GPQA 벤치마크에서 **12-26%p** 더 높은 성능을 보였습니다. 고정된 **51,200 업데이트 예산** 에서 **1,600개 샘플로 32 에포크** 훈련 시 **39%** 정확도를 달성하며, **51,200개 샘플로 1 에포크** 훈련의 **17%** 정확도를 크게 상회했습니다. 성능 향상은 모델이 훈련 데이터에 대해 거의 완벽한 **다음 토큰 예측 정확도(완전한 메모리화)** 에 도달할 때까지 지속되며, 이는 **높은 종료율** 과 강한 상관관계를 보였습니다.

## AI 실무자를 위한 시사점
AI/ML 실무자들은 **고품질의 CoT SFT 데이터** 가 제한적일 때, 단순히 데이터셋 크기를 늘리기보다 **기존 데이터를 여러 에포크 반복하여 훈련** 하는 전략을 고려해야 합니다. 훈련 과정 중 **훈련 토큰 정확도가 수렴** 하는 시점을 **효과적인 조기 종료 기준** 으로 활용하여 컴퓨팅 자원을 절약할 수 있습니다. 이는 고전적인 **과적합 지표(검증 손실 증가)** 에도 불구하고 추론 성능이 향상될 수 있음을 시사하며, **소규모 데이터셋에서의 다중 에포크 훈련** 이 데이터 스케일링보다 **치명적 망각** 을 덜 유발하는 더 나은 전략임을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.