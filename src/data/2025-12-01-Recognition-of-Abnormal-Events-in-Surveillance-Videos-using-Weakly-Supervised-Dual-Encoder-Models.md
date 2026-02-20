---
title: "[논문리뷰] Recognition of Abnormal Events in Surveillance Videos using Weakly Supervised Dual-Encoder Models"
excerpt: "Yehudit Aperstein이 arXiv에 게시한 'Recognition of Abnormal Events in Surveillance Videos using Weakly Supervised Dual-Encoder Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Anomaly Detection
  - Surveillance Videos
  - Weakly Supervised Learning
  - Multiple Instance Learning
  - Dual-Encoder
  - I3D
  - TimeSformer
  - Top-k Pooling

permalink: /ai/review/2025-12-01-Recognition-of-Abnormal-Events-in-Surveillance-Videos-using-Weakly-Supervised-Dual-Encoder-Models/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.13276)

**저자:** Noam Tsfaty, Avishai Weizman, Liav Cohen, Moshe Tshuva, Yehudit Aperstein



## 핵심 연구 목표
이 논문은 감시 비디오에서 희귀하고 다양한 **이상 이벤트(abnormal events)** 를 **비디오 수준의 약한 감독(video-level supervision)** 만을 사용하여 효율적으로 탐지하는 것을 목표로 합니다. 정밀한 시간적 주석의 높은 비용과 모호성으로 인한 실제 환경의 제약을 해결하고, 기존의 단일 모델 기반 접근법의 한계를 뛰어넘어 이상 탐지 정확도를 향상시키고자 합니다.

## 핵심 방법론
제안된 프레임워크는 두 가지 상호 보완적인 비디오 인코더인 **I3D(Inflated 3D ConvNet)** 와 **Transformer 기반 TimeSformer 아키텍처** 를 결합한 **듀얼-백본 MIL 네트워크** 를 사용합니다. 비디오를 **32개의 균일한 시간 세그먼트** 로 분할하고, 각 세그먼트에서 16프레임을 샘플링합니다. 각 세그먼트는 I3D(768차원)와 TimeSformer(1024차원) 인코더를 통해 특징을 추출하고, **l2-정규화 후 연결(concatenate)** 하여 **1792차원 통합 특징 벡터** 를 생성합니다. 이 특징은 경량 **FC(Fully Connected) 레이어** 를 거쳐 세그먼트별 이상 점수를 예측하며, 최종적으로 **top-k 풀링(top-k pooling)** 을 통해 비디오 수준의 이상 확률을 산출하고 **이진 교차 엔트로피 손실** 로 공동 최적화됩니다.

## 주요 결과
제안된 듀얼-백본 융합 모델은 **UCF-Crime 데이터셋** 에서 **90.7%의 AUC(Area Under the Curve)** 를 달성하며, 기존의 모든 경쟁 방법론들을 능가하는 가장 높은 성능을 보였습니다. 이는 트랜스포머 기반 모델, CLIP 기반 접근법, I3D+클러스터링, 그래프 기반 접근법 등 다양한 기존 방법을 뛰어넘는 결과로, 특히 **약한 감독 학습 환경** 에서 강력한 이상 탐지 능력을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 감시 비디오에서 **약한 감독 학습** 을 통해 이상 이벤트를 효과적으로 탐지하는 강력한 방법을 제시하며, **이종 모델(CNN과 Transformer)의 융합 효과** 를 명확히 보여주었습니다. AI 실무자들은 제한된 주석 데이터로 고성능의 비디오 이상 탐지 시스템을 구축할 때, 이 논문의 **듀얼-인코더 및 top-k 풀링 전략** 을 주요한 접근 방식으로 고려할 수 있습니다. 특히, 대규모의 정밀한 레이블링이 어려운 실제 환경의 시계열 또는 비디오 데이터 문제에 본 아키텍처를 적용하는 것이 유용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.