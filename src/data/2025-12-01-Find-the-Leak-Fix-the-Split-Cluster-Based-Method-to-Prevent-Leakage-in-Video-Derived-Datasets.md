---
title: "[논문리뷰] Find the Leak, Fix the Split: Cluster-Based Method to Prevent Leakage in Video-Derived Datasets"
excerpt: "Avishai Weizman이 [arXiv]에 게시한 'Find the Leak, Fix the Split: Cluster-Based Method to Prevent Leakage in Video-Derived Datasets' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Data Leakage
  - Video Datasets
  - Clustering
  - Frame Selection
  - Deep Learning
  - Object Detection
  - Dataset Partitioning
  - Dimensionality Reduction

permalink: /ai/review/2025-12-01-Find-the-Leak-Fix-the-Split-Cluster-Based-Method-to-Prevent-Leakage-in-Video-Derived-Datasets/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.13944)

**저자:** Noam Glazner, Sharon Shalev, Noam Tsfaty, Avishai Weizman



## 핵심 연구 목표
본 논문은 비디오 기반 데이터셋에서 발생하는 **정보 누출(information leakage)** 문제를 해결하는 것을 목표로 합니다. 연속된 프레임 간의 높은 시공간적 상관관계로 인해 훈련, 검증, 테스트 세트 분할 시 발생할 수 있는 데이터 누출은 모델 성능을 과대평가하고 일반화 능력을 저해하므로, 이를 방지하여 모델 평가의 신뢰성을 높이고자 합니다.

## 핵심 방법론
제안하는 방법론은 비디오 프레임에서 **CLIP** , **HOG** , **XFeat** , **DINO-V3** 와 같은 다양한 기술을 사용하여 특징 벡터를 추출하는 것으로 시작합니다. 추출된 특징 벡터는 **PaCMAP(Pairwise Controlled Manifold Approximation Projection)** 알고리즘을 통해 저차원 임베딩 공간으로 투영됩니다. 최종적으로, 이 임베딩된 프레임들은 **HDBSCAN(Hierarchy of Density-Based Spatial Clustering)** 알고리즘을 사용하여 시각적으로 유사한 프레임들로 클러스터링되며, 이 클러스터 단위로 데이터셋이 분할됩니다.

## 주요 결과
실험 결과, **ImageNet-VID** 및 **UCF101** 데이터셋에서 **Adjusted Mutual Information (AMI)** 및 **V-measure** 지표를 통해 클러스터링 품질을 평가했습니다. 특히 **DINO-V3 임베딩** 은 **ImageNet-VID** 에서 **0.96 V-measure** 와 **0.96 AMI** , **UCF101** 에서 **0.87 V-measure** 와 **0.80 AMI** 를 달성하여 가장 우수한 성능을 보였습니다. 이는 사전 훈련된 딥러닝 모델이 정보 누출 감지에 필요한 유사성을 포착하는 데 탁월함을 입증합니다.

## AI 실무자를 위한 시사점
AI/ML 엔지니어와 데이터 과학자는 이 방법론을 통해 비디오 기반 데이터셋의 **데이터 누출 문제** 를 효과적으로 완화할 수 있습니다. **DINO-V3** 와 같은 강력한 사전 훈련 모델의 임베딩을 활용하여 데이터 분할의 신뢰성을 높이고, 객체 탐지 모델의 과적합을 방지하며, 보다 견고한 모델 평가를 수행할 수 있습니다. 이는 기존 데이터셋 준비 파이프라인에 쉽게 통합되어 모델의 일반화 성능 향상에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.