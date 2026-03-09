---
title: "[논문리뷰] Layer by layer, module by module: Choose both for optimal OOD probing of ViT"
excerpt: "Ievgen Redko이 arXiv에 게시한 'Layer by layer, module by module: Choose both for optimal OOD probing of ViT' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision Transformer
  - Out-of-Distribution
  - Linear Probing
  - Distribution Shift
  - Foundation Models
  - Intermediate Layers
  - Module Analysis

permalink: /ai/review/2026-03-09-Layer-by-layer-module-by-module-Choose-both-for-optimal-OOD-probing-of-ViT/

toc: true
toc_sticky: true

date: 2026-03-09 00:00:00+0900+0900
last_modified_at: 2026-03-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.05280)

**저자:** Ambroise Odonnat, Vasilii Feofanov, Laetitia Chapel, Romain Tavenard, Ievgen Redko



## 핵심 연구 목표
사전 훈련된 **Vision Transformer (ViT)** 의 중간 레이어 행동을 심층적으로 분석하고, **분포 변화(distribution shift)** 상황에서 어떤 레이어와 모듈이 최적의 **선형 프로빙(linear probing)** 성능을 보이는지 규명하는 것을 목표로 합니다. 특히, 기존 연구에서 관찰된 중간 레이어의 우수성이 단순히 사전 훈련 방식 때문인지, 아니면 분포 변화 때문인지를 명확히 하고자 합니다.

## 핵심 방법론
**ImageNet-21k** 로 사전 훈련된 **86M 파라미터 ViT 모델** 을 사용하여 11가지 다양한 이미지 분류 벤치마크(예: Cifar10-C, DomainNet)에서 광범위한 **선형 프로빙 실험** 을 수행했습니다. 각 트랜스포머 레이어 내의 **8가지 내부 모듈(LN1, MHA, RC1, LN2, FC1, Act, FC2, RC2)** 각각의 출력을 개별적으로 프로빙하여 성능을 비교하고, 분포 변화의 강도에 따라 결과를 분석했습니다.

## 주요 결과
분포 변화가 큰 **OOD(Out-of-Distribution)** 환경에서는 **중간 레이어의 FeedForward 네트워크 활성화(Act)** 가 최적의 성능을 보였으며, 특히 Contrast 데이터셋에서 **80.20%** , Speckle Noise에서 **63.35%** 의 정확도를 달성하며 표준 프로빙 지점인 **RC2** 보다 우수했습니다. 반면, 분포 변화가 약한 **ID(In-Distribution)** 환경에서는 최종 레이어 또는 **FeedForward 네트워크 이전의 LayerNorm (LN2)** 이 더 나은 성능을 보였고, **FC2** 는 대부분의 데이터셋에서 최악의 성능을 기록했습니다.

## AI 실무자를 위한 시사점
AI 실무자는 **ViT 기반 모델** 을 **OOD 환경** 에서 활용할 때, 무조건 최종 레이어를 사용하는 대신 **중간 레이어의 FeedForward 활성화(Act)** 를 프로빙하는 것을 고려해야 합니다. 분포 변화의 강도를 미리 알기 어렵다면, **LN2 모듈** 의 출력을 프로빙하는 것이 비교적 안정적인 접근 방식이 될 수 있습니다. 이는 **분포 변화 감지** 및 **최적의 특징 추출 레이어/모듈 식별** 에 중요한 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.