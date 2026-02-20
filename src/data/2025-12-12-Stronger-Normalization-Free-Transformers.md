---
title: "[논문리뷰] Stronger Normalization-Free Transformers"
excerpt: "Zhuang Liu이 arXiv에 게시한 'Stronger Normalization-Free Transformers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Normalization-Free Transformers
  - Point-wise Functions
  - Error Function
  - Deep Learning
  - Transformer Architecture
  - Generalization
  - Normalization Layers

permalink: /ai/review/2025-12-12-Stronger-Normalization-Free-Transformers/

toc: true
toc_sticky: true

date: 2025-12-12 00:00:00+0900+0900
last_modified_at: 2025-12-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.10938)

**저자:** Mingzhi Chen, Taiming Lu, Jiachen Zhu, Mingjie Sun, Zhuang Liu



## 핵심 연구 목표
본 논문은 트랜스포머 아키텍처에서 필수적이었던 **정규화 계층(Normalization Layers)의 의존성을 제거** 하고, 단순히 기존 정규화 계층의 성능에 필적하는 것을 넘어 **이를 능가하는 새로운 점별 함수(point-wise function)를 발견** 하는 것을 목표로 합니다. 또한, 점별 함수의 내재적 속성이 훈련 역학 및 최종 성능에 미치는 영향을 체계적으로 연구하고자 합니다.

## 핵심 방법론
연구팀은 점별 함수에 대한 광범위한 탐색을 수행하기 위해 **영점 중심성(zero-centeredness), 유계성(boundedness), 중심 민감도(center sensitivity), 단조성(monotonicity)** 의 네 가지 핵심 속성을 분석했습니다. 이러한 통찰력을 바탕으로 **learnable parameter `a`와 `s`를 포함하는 동적 오차 함수(Dynamic erf, Derf)** , 즉 **`erf(ax + s)`** 를 제안했습니다. **Derf** 는 다양한 트랜스포머 기반 모델에서 기존 정규화 계층을 대체하여 그 성능을 평가했습니다.

## 주요 결과
**Derf** 는 **ViT-Base ImageNet-1K** 에서 **82.8%** 의 top-1 정확도를 달성하며 **LayerNorm (82.3%)** 및 **DyT (82.5%)** 를 능가했습니다. 이미지 생성 태스크에서도 **DiT-L/4** 에서 **43.94** 의 FID 점수를 기록하여 **LayerNorm (45.91)** 및 **DyT (45.66)** 보다 우수한 성능을 보였습니다. 이러한 성능 향상은 **Derf** 가 정규화 기반 모델보다 *높은 훈련 손실*을 보임에도 불구하고 달성되었으며, 이는 *향상된 일반화(generalization) 능력*에서 비롯됨을 시사합니다.

## AI 실무자를 위한 시사점
**Derf** 는 다양한 도메인(비전, 언어, 음성, DNA)에서 정규화 계층을 일관되게 능가하는 **간단하고 실용적인 정규화-프리(normalization-free) 대안** 을 제공합니다. 이는 **배치 의존적인 연산 제거** 를 통해 **모델 설계 단순화 및 효율성 증대** 에 기여할 수 있습니다. 또한, **Derf** 의 성공적인 설계 원칙은 향후 정규화-프리 활성화 함수 개발을 위한 명확한 가이드라인을 제시하며, **모델의 일반화 성능 향상** 에 중점을 둔 연구 방향의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.