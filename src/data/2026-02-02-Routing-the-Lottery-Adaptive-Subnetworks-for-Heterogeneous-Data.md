---
title: "[논문리뷰] Routing the Lottery: Adaptive Subnetworks for Heterogeneous Data"
excerpt: "Michal Byra이 [arXiv]에 게시한 'Routing the Lottery: Adaptive Subnetworks for Heterogeneous Data' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Pruning
  - Lottery Ticket Hypothesis
  - Adaptive Subnetworks
  - Heterogeneous Data
  - Model Efficiency
  - Conditional Computation
  - Subnetwork Collapse

permalink: /ai/review/2026-02-02-Routing-the-Lottery-Adaptive-Subnetworks-for-Heterogeneous-Data/

toc: true
toc_sticky: true

date: 2026-02-02 00:00:00+0900+0900
last_modified_at: 2026-02-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.22141)

**저자:** Grzegorz Stefański, Alberto Presta, Michał Byra



## 핵심 연구 목표
본 논문은 **Lottery Ticket Hypothesis (LTH)** 가 하나의 보편적인 "winning ticket"을 가정하여 실제 데이터의 내재된 이질성을 간과하는 한계를 해결하고자 합니다. 데이터의 특성에 따라 여러 개의 특화된 서브네트워크를 학습함으로써 모델 구조를 데이터 이질성과 정렬시키고, 보다 모듈화되고 상황을 인지하는 딥러닝 모델을 구축하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **Routing the Lottery (RTL)** 프레임워크는 데이터셋을 클래스, 클러스터 또는 환경 조건에 따라 여러 하위 집합으로 분할합니다. 각 하위 집합에 대해 **Iterative Magnitude Pruning (IMP)** 의 변형을 통해 전용 바이너리 마스크 `mk`를 학습하여 "adaptive ticket"을 추출합니다. 이 마스크들은 공유된 초기 밀집 모델 파라미터 `θ`에 적용되며, 이후 각 서브네트워크가 해당 데이터 하위 집합에서만 학습되도록 마스킹된 기울기 업데이트를 사용하여 **공동 재훈련** 을 수행합니다. 또한, 과도한 가지치기로 인한 성능 저하(subnetwork collapse)를 진단하기 위한 **서브네트워크 유사도 점수(Jaccard 계수)** 를 도입합니다.

## 주요 결과
RTL은 **CIFAR-10** 에서 25% 희소성에서 **0.781의 균형 정확도** 를 달성하여 단일 마스크 및 다중 모델 IMP 기준선보다 크게 우수하며, 독립 모델 대비 **최대 10배 적은 파라미터** 를 사용합니다. **CIFAR-100** 에서도 25% 희소성에서 **0.765의 균형 정확도** 로 우수한 성능을 보였습니다. **Implicit Neural Representations (INRs)** 재구성 task에서는 25% 희소성에서 **18.86dB PSNR** 을 달성하며 IMP 기준선을 뛰어넘었으며, **음성 향상 (Speech Enhancement)** task에서는 25% 희소성에서 **7.248 SI-SNRi** 를 기록하며 모든 기준선보다 뛰어난 성능을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 RTL 프레임워크를 통해 이질적인 데이터를 처리할 때 **하나의 대규모 모델을 훈련하는 대신 데이터 특성에 맞는 맞춤형 서브네트워크를 활용** 하여 모델 효율성과 성능을 동시에 향상시킬 수 있습니다. 특히, 리소스 제약이 있는 환경에서 **적은 파라미터로 높은 성능** 을 유지하는 데 유리합니다. 또한, **서브네트워크 유사도 점수** 는 모델 가지치기 과정에서 과도한 희소성으로 인한 성능 저하(subnetwork collapse)를 **레이블 없이 미리 진단** 하는 유용한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.