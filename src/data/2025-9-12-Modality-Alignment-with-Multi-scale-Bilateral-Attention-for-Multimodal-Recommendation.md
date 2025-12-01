---
title: "[논문리뷰] Modality Alignment with Multi-scale Bilateral Attention for Multimodal
  Recommendation"
excerpt: "Dong-Ho Lee이 [arXiv]에 게시한 'Modality Alignment with Multi-scale Bilateral Attention for Multimodal
  Recommendation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Recommendation
  - Modality Alignment
  - Attention Mechanism
  - Dilated Convolution
  - Maximum Mean Discrepancy
  - Contrastive Learning
  - Dimensionality Reduction

permalink: /ai/review/2025-9-12-Modality-Alignment-with-Multi-scale-Bilateral-Attention-for-Multimodal-Recommendation/

toc: true
toc_sticky: true

date: 2025-09-12 13:12:46+0900
last_modified_at: 2025-09-12 13:12:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09114)

**저자:** Kelin Ren, Chan-Yang Ju*, Dong-Ho Lee*



## 핵심 연구 목표
본 논문은 기존 멀티모달 추천 시스템의 두 가지 주요 한계를 해결하고자 합니다: (1) 미세-정교한 교차-모달 연관성을 모델링하는 능력 부족으로 인한 최적 이하의 융합 품질, (2) 전역 분포 수준의 일관성 부족으로 발생하는 표현 편향. 이를 위해 지역 특징 정렬과 전역 분포 정규화를 통합하는 새로운 프레임워크를 제안합니다.

## 핵심 방법론
제안된 **MambaRec** 프레임워크는 세 가지 핵심 구성 요소로 이루어져 있습니다. 지역 특징 정렬을 위해 **Dilated REfinement Attention Module (DREAM)** 을 도입하여 **멀티-스케일 팽창 컨볼루션** 과 **채널-wise 및 공간 어텐션** 을 통해 시각 및 텍스트 모달리티 간의 미세-정교한 의미 패턴을 정렬합니다. 전역 분포 일관성 확보를 위해 **Maximum Mean Discrepancy (MMD) 손실 함수** 와 **InfoNCE 대비 손실 함수** 를 적용하여 모달리티 정렬을 강화합니다. 또한, 고차원 멀티모달 특징의 계산 비용을 줄이고 확장성을 향상시키기 위해 **차원 축소 전략** 을 사용합니다.

## 주요 결과
실제 전자상거래 데이터셋에 대한 광범위한 실험 결과, **MambaRec** 은 기존 최첨단 방법론보다 뛰어난 융합 품질, 일반화 및 효율성을 달성했습니다. 예를 들어, Baby 데이터셋에서 **Recall@20은 0.1013** , **NDCG@20은 0.0454** 를 기록하며 모든 데이터셋에서 일관되게 가장 우수한 성능을 보였습니다. DREAM 모듈과 MMD 손실 함수가 모델 성능에 필수적임을 입증하는 **세밀한 제거 연구(ablation study)** 결과도 제시되었습니다.

## AI 실무자를 위한 시사점
본 연구는 미세-정교한 지역 특징 정렬과 전역 분포 일관성이 멀티모달 추천 시스템의 성능 향상에 결정적임을 보여줍니다. 특히 **DREAM 모듈** 과 **MMD/InfoNCE** 의 결합은 모달 간의 복잡한 관계를 효과적으로 포착하고 표현의 견고성을 높이는 실용적인 방법을 제공합니다. 또한, **차원 축소 전략** 은 고차원 멀티모달 데이터를 처리할 때 메모리 오버헤드를 줄여 실제 서비스 배포에 적합한 효율적인 솔루션을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.