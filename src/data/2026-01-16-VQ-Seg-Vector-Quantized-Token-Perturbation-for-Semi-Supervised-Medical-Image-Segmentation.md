---
title: "[논문리뷰] VQ-Seg: Vector-Quantized Token Perturbation for Semi-Supervised Medical Image Segmentation"
excerpt: "Lei Zhu이 arXiv에 게시한 'VQ-Seg: Vector-Quantized Token Perturbation for Semi-Supervised Medical Image Segmentation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Semi-supervised Learning
  - Medical Image Segmentation
  - Vector Quantization
  - Consistency Learning
  - Feature Perturbation
  - Foundation Models
  - Dropout Replacement

permalink: /ai/review/2026-01-16-VQ-Seg-Vector-Quantized-Token-Perturbation-for-Semi-Supervised-Medical-Image-Segmentation/

toc: true
toc_sticky: true

date: 2026-01-16 00:00:00+0900+0900
last_modified_at: 2026-01-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.10124)

**저자:** Sicheng Yang, Zhaohu Xing, Lei Zhu



## 핵심 연구 목표
본 논문은 반지도 학습 기반 의료 영상 분할에서 기존 **dropout** 방식의 불안정하고 튜닝이 어려운 특성 교란 문제를 해결하고자 합니다. 특히, dropout rate( **DR** )에 따라 성능이 크게 저하되거나 불충분한 정규화가 발생하는 한계를 극복하고, 더욱 안정적이고 제어 가능한 특성 교란 전략을 개발하여 모델의 견고성과 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
VQ-Seg는 **Quantized Perturbation Module (QPM)** 을 도입하여 이산적인 **Vector Quantization (VQ)** 공간 내에서 특성을 교란합니다. 이는 코드북 인덱스의 공간적 위치를 섞는 방식으로 동작하여 기존 dropout보다 구조적이고 제어 가능한 정규화를 제공합니다. 또한, 양자화로 인한 정보 손실을 완화하기 위해 **dual-branch 아키텍처** 를 사용하여 이미지 재구성 및 분할 작업을 위한 **Post-VQ 특성 공간** 을 공유하며, **Post-VQ Feature Adapter (PFA)** 를 통해 **사전 학습된 Foundation Model (FM)** 의 시맨틱 임베딩과 양자화된 특성을 **대조 학습** 으로 정렬합니다.

## 주요 결과
새로 수집된 **Lung Cancer (LC)** 데이터셋에서 VQ-Seg는 5% 레이블 데이터 환경에서 **Dice 0.6643** , **Jaccard 0.5257** 를 달성하여 기존 SOTA 모델인 Unimatch의 Dice 0.6493, Jaccard 0.5071을 능가했습니다. 10% 레이블 데이터 환경에서는 **Dice 0.7852** , **Jaccard 0.6731** 로 MCNet의 Dice 0.7555, Jaccard 0.6414를 크게 앞섰습니다. 또한 **ACDC 데이터셋** 에서도 일관되게 최첨단 성능을 달성하며, **DINOv2** 기반 FM이 다른 대안보다 뛰어난 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 의료 영상 분할에서 **dropout** 의 대안으로 **VQ 기반의 구조화된 특성 교란** 이 더 안정적이고 효과적인 정규화 방법이 될 수 있음을 제시합니다. **Foundation Model** 을 활용하여 양자화된 특성에 풍부한 시맨틱 정보를 부여하는 전략은 제한된 레이블 데이터 환경에서 모델 성능을 크게 향상시킬 수 있음을 보여줍니다. 하지만 FM 사용으로 인한 추가적인 연산 오버헤드는 배포 시 고려해야 할 요소입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.