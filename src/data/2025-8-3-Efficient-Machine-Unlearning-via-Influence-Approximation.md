---
title: "[논문리뷰] Efficient Machine Unlearning via Influence Approximation"
excerpt: "Enhong Chen이 [arXiv]에 게시한 'Efficient Machine Unlearning via Influence Approximation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Machine Unlearning
  - Influence Function
  - Incremental Learning
  - Privacy Protection
  - Gradient Optimization
  - Model Editing
  - Computational Efficiency

permalink: /ai/review/2025-8-3-Efficient-Machine-Unlearning-via-Influence-Approximation/

toc: true
toc_sticky: true

date: 2025-08-03 07:35:17+0900
last_modified_at: 2025-08-03 07:35:17+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.23257)

**저자:** Jiawei Liu, Chenwang Wu, Defu Lian, and Enhong Chen

**키워드:** `Machine Unlearning`, `Influence Function`, `Incremental Learning`, `Privacy Protection`, `Gradient Optimization`, `Model Editing`, `Computational Efficiency`

## 핵심 연구 목표
본 논문은 대규모 데이터셋과 빈번한 삭제 요청이 발생하는 환경에서 기존 **영향 함수 기반 언러닝(unlearning)** 방식의 높은 계산 비용과 메모리 오버헤드 문제를 해결하고자 합니다. 연구는 인지 과학에서 영감을 받아 **증분 학습(incremental learning)**과 언러닝 간의 이론적 연결 고리를 확립함으로써, 효율적인 언러닝 메커니즘을 설계하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **Influence Approximation Unlearning (IAU)** 알고리즘은 언러닝을 **증분 학습의 관점**에서 접근하며, 이를 위해 세 가지 핵심 모듈을 포함합니다. 첫째, **증분 근사(incremental approximation)**는 잊혀진 데이터의 ‘음성 샘플’을 증분 학습하여 언러닝 효과를 달성하고, 고비용의 **Hessian 행렬 계산 및 역행렬 연산**을 회피합니다. 둘째, **경사 보정(gradient correction)**은 언러닝 단계에서 잔여 데이터의 경사 정보를 조정하여 ‘과도한 망각(over-forgetting)’을 방지합니다. 셋째, **경사 제한(gradient restriction)** 손실 함수를 모델 학습에 적용하여 비정상적인 경사의 영향을 완화하고 모델 수렴을 촉진합니다.

## 주요 결과
`CIFAR10`, `SVHN`, `Purchase100`, `CIFAR100` 데이터셋과 `LeNet5`, `ResNet18`, `MLP`, `VGG19` 모델 아키텍처에서 `IAU`는 기존 최첨단 방법론 대비 우수한 성능을 보였습니다. 특히 `LeNet5` 모델의 `CIFAR10` 데이터셋 실험에서 **평균 순위(Avg Rank) 1위**를 달성했으며, 언러닝 시간은 **13초**로 `Fisher` 방법의 **1294초**보다 훨씬 빨랐습니다. 이는 `IAU`가 **제거 보장, 언러닝 효율성, 모델 유틸리티** 사이에서 탁월한 균형을 제공함을 입증합니다.

## AI 실무자를 위한 시사점
`IAU`는 기계 학습 모델에서 데이터 삭제 요청을 효율적으로 처리할 수 있는 **실용적이고 확장 가능한 솔루션**을 제공합니다. 특히 **대규모 데이터셋**이나 **빈번한 언러닝 요청**이 발생하는 시나리오에서 **계산 비용을 크게 절감**하여 서비스 운영에 유리합니다. 또한, 언러닝 문제를 **증분 학습**의 관점에서 재해석한 것은 향후 **데이터 프라이버시 보호** 및 **모델 편집 기술** 연구에 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
