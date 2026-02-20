---
title: "[논문리뷰] SpargeAttention2: Trainable Sparse Attention via Hybrid Top-k+Top-p Masking and Distillation Fine-Tuning"
excerpt: "[arXiv]에 게시된 'SpargeAttention2: Trainable Sparse Attention via Hybrid Top-k+Top-p Masking and Distillation Fine-Tuning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Sparse Attention
  - Diffusion Models
  - Video Generation
  - Hybrid Masking
  - Distillation Fine-Tuning
  - Model Acceleration
  - Top-k
  - Top-p

permalink: /ai/review/2026-02-20-SpargeAttention2-Trainable-Sparse-Attention-via-Hybrid-Top-kTop-p-Masking-and-Distillation-Fine-Tuning/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.13515)

**저자:** Jintao Zhang, Kai Jiang, Chendong Xiang, Weiqi Feng, Yuezhou Hu, Haocheng Xi, Jianfei Chen, Jun Zhu



## 핵심 연구 목표
이 논문은 비디오 확산 모델에서 높은 희소성(sparsity)에서도 생성 품질 저하 없이 효율적인 **학습 가능한(trainable) 스파스 어텐션** 을 구현하는 것을 목표로 합니다. 특히, 기존 **Top-k** 및 **Top-p 마스킹** 규칙의 실패 사례를 분석하고, 학습 가능한 스파스 어텐션이 훈련 없는(training-free) 방식보다 높은 희소성을 달성하는 이유를 밝히며, 확산 손실(diffusion loss)을 통한 미세 조정의 한계를 극복하고자 합니다.

## 핵심 방법론
본 연구는 세 가지 핵심 요소로 구성된 **SpargeAttention2** 를 제안합니다. 첫째, 어텐션 가중치 분포의 균일성 또는 편향성에 관계없이 견고한 마스킹을 위해 **Top-k와 Top-p를 결합한 하이브리드 마스킹 규칙** 을 사용합니다. 둘째, **FlashAttention** 을 기반으로 **CUDA 최적화된 블록 스파스 어텐션 커널** 을 구현하여 효율적인 학습 가능한 스파스 어텐션을 가능하게 합니다. 셋째, 미세 조정 중 생성 품질 유지를 위해, 확산 손실 대신 **velocity distillation loss** 를 사용하여 스파스 어텐션 모델의 속도 예측을 고정된 전체 어텐션 모델의 예측과 정렬합니다.

## 주요 결과
**SpargeAttention2** 는 비디오 확산 모델에서 **95%의 어텐션 희소성** 을 달성하며, **16.2배의 어텐션 런타임 속도 향상** (예: **Wan2.1-1.3B 480p** 모델에서 97초에서 6초로 감소)을 보였습니다. 또한, **4.7배의 종단 간(end-to-end) 비디오 생성 속도 향상** (예: **Wan2.1-14B 720p** 모델에서 3043초에서 650초로 감소)을 이루면서도, 기존 전체 어텐션 모델과 유사하거나 더 나은 생성 품질을 유지했습니다.

## AI 실무자를 위한 시사점
이 연구는 대규모 비디오 확산 모델의 추론 속도를 획기적으로 개선할 수 있는 실용적인 방법을 제공하여, **생성형 AI 모델의 배포 및 활용 비용을 크게 절감** 합니다. 특히 **하이브리드 마스킹** 과 **증류 기반 미세 조정** 전략은 높은 희소성 환경에서도 모델 성능을 유지하는 데 중요한 통찰을 주며, 실제 AI 제품 및 서비스에서 **효율적인 스파스 어텐션 설계** 에 직접적으로 적용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.