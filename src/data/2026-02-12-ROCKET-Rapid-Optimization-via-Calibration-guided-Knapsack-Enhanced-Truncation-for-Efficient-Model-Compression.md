---
title: "[논문리뷰] ROCKET: Rapid Optimization via Calibration-guided Knapsack Enhanced Truncation for Efficient Model Compression"
excerpt: "이 [arXiv]에 게시한 'ROCKET: Rapid Optimization via Calibration-guided Knapsack Enhanced Truncation for Efficient Model Compression' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Model Compression
  - LLM
  - Training-Free
  - Knapsack Problem
  - Sparse Matrix Factorization
  - Dictionary Learning
  - Post-Training Optimization
  - Weight Sparsification

permalink: /ai/review/2026-02-12-ROCKET-Rapid-Optimization-via-Calibration-guided-Knapsack-Enhanced-Truncation-for-Efficient-Model-Compression/

toc: true
toc_sticky: true

date: 2026-02-12 00:00:00+0900+0900
last_modified_at: 2026-02-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.11008)

**저자:** Ammar Ali, Baher Mohammad, Denis Makhov, Dmitriy Shopkhoev, Magauiya Zhussip, Stamatios Lefkimmiatis



## 핵심 연구 목표
ROCKET 논문은 대규모 언어 모델(LLMs)의 과도한 크기로 인한 연산 및 메모리 요구 사항을 해결하기 위해 빠르고 훈련 없는(training-free) 모델 압축 방법을 개발하는 것을 목표로 합니다. 특히, 기존 저랭크 근사(low-rank approximation)의 표현력 한계와 반복적인 딕셔너리 학습(dictionary learning)의 높은 계산 비용 문제를 극복하고자 합니다.

## 핵심 방법론
ROCKET은 두 가지 주요 혁신을 제시합니다. 첫째, **보정-유도(calibration-guided)** 기법을 사용하여 **whitened activation space** 에서 **단일 단계 구조화된 희소 행렬 분해(single-step structured sparse matrix factorization)** 를 통해 가중치 행렬을 압축합니다. 이는 **고유값 분해(eigen decomposition)** 및 **최소 제곱(least squares)** 을 활용하여 딕셔너리 학습의 반복 최적화 과정을 생략합니다. 둘째, 전역 압축 예산을 고려하여 각 레이어의 압축 수준을 최적화하기 위해 **다중 선택 배낭 문제(multi-choice knapsack problem)** 를 공식화하고 **동적 프로그래밍(dynamic programming)** 으로 해결합니다.

## 주요 결과
ROCKET은 **20-50% 압축률** 에서 기존 **팩터리제이션, 구조적 희소화, 동적 압축** 방법론을 일관적으로 능가합니다. 특히, **30% 압축** 시 미세 조정 없이 원본 모델 성능의 **90% 이상** 을 유지합니다. **Qwen3-14B** 모델을 **8B 파라미터(40% 압축)** 로 압축하고 **3천만 토큰** 으로 가벼운 미세 조정("healing")을 적용했을 때, 원본 **Qwen3-8B** 모델과 거의 동등한 성능을 달성했습니다. 또한, **CoSpaDi** 대비 **100배 적은 에너지 소비, 96배 빠른 압축 속도, 23배 낮은 CO2 배출량** 을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 ROCKET을 통해 **훈련이나 대규모 데이터셋 없이** LLM을 효과적으로 압축하여 **자원 제약적인 환경(예: 엣지 디바이스)** 에 배포할 수 있습니다. **동적 프로그래밍 기반의 배낭 문제 해결** 은 각 레이어에 대한 압축 예산을 지능적으로 할당하여 **성능 저하를 최소화** 할 수 있게 합니다. 또한, 효율적인 압축 과정은 **탄소 발자국을 크게 줄여** AI 개발의 지속 가능성을 높이는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.