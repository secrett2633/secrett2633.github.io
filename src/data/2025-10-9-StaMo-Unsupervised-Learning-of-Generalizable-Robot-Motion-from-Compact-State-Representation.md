---
title: "[논문리뷰] StaMo: Unsupervised Learning of Generalizable Robot Motion from Compact
  State Representation"
excerpt: "이 [arXiv]에 게시한 'StaMo: Unsupervised Learning of Generalizable Robot Motion from Compact
  State Representation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robot Learning
  - State Representation
  - Motion Representation
  - Diffusion Models
  - Unsupervised Learning
  - World Modeling
  - Vision-Language Models
  - Latent Action

permalink: /ai/review/2025-10-9-StaMo-Unsupervised-Learning-of-Generalizable-Robot-Motion-from-Compact-State-Representation/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05057)

**저자:** Mingyu Liu, Jiuhe Shu, Hui Chen, Zeju Li, Canyu Zhao, Jiange Yang, Shenyuan Gao, Hao Chen, Chunhua Shen



## 핵심 연구 목표
로봇 시스템에서 효율적인 세계 모델링과 의사 결정을 위해 **표현적이고 압축적인 상태 표현** 을 개발하는 것이 핵심 목표입니다. 기존 방법론들이 과도한 중복성이나 핵심 정보 부족으로 겪던 한계를 극복하고, 로봇의 시각적 정보를 효과적으로 요약하여 행동에 직접 연결될 수 있는 표현을 학습하고자 합니다.

## 핵심 방법론
본 논문은 경량 인코더와 사전 학습된 **Diffusion Transformer (DiT) 디코더** 를 사용하여 이미지를 **두 개의 1024차원 토큰** 으로 압축하는 **비지도 학습 접근 방식인 StaMo** 를 제안합니다. 이 모델은 동결된 **DINOv2 인코더** 와 트랜스포머 기반 압축기로 구성된 인코더를 통해 시각적 상태를 압축하며, 인코딩된 상태 토큰 간의 **벡터 차이(`mt = E(ot+1) - E(ot)`)를 로봇 동작** 으로 정의합니다. 학습은 **Flow Matching 손실 함수** 를 사용하고, 기존 **OpenVLA** 아키텍처에 경량 MLP 헤드를 추가하여 다음 상태와 동작을 공동으로 예측하는 **복합 손실 함수** 로 최적화됩니다.

## 주요 결과
StaMo는 LIBERO 벤치마크에서 기존 OpenVLA 대비 **14.3%** 의 평균 성능 향상을 달성했으며, 실제 로봇 작업 성공률에서는 **30%** 의 개선을 보였습니다. 선형 프로빙 실험에서 다른 베이스라인보다 모든 예측 시야에서 **가장 낮은 MSE** 를 기록하여 잠재 동작 표현의 우수성을 입증했으며, 추론 속도에 **미미한 오버헤드** 만을 추가합니다. 또한, 정책 공동 학습 시 기존 방식 대비 **10.4%** 높은 성공률을 보여줍니다.

## AI 실무자를 위한 시사점
StaMo는 정적 이미지에서 추출한 **압축된 상태 표현** 을 통해 로봇 동작을 비지도 학습으로 효과적으로 파악할 수 있음을 보여줍니다. 이는 복잡한 **비디오 데이터 기반 동작 학습** 의 필요성을 줄여주며, **VLMs** 에 쉽게 통합되어 **세계 모델링 및 정책 학습 효율성** 을 크게 높일 수 있습니다. 특히, **sim-to-real 전이 학습 능력** 과 다양한 데이터 소스에서의 **확장성** 은 실제 로봇 시스템 개발에 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.