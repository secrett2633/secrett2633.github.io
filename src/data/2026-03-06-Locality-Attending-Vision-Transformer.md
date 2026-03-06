---
title: "[논문리뷰] Locality-Attending Vision Transformer"
excerpt: "arXiv에 게시된 'Locality-Attending Vision Transformer' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision Transformer
  - Semantic Segmentation
  - Attention Mechanism
  - Locality Bias
  - Gaussian Kernel
  - Patch Representation
  - Foundation Models

permalink: /ai/review/2026-03-06-Locality-Attending-Vision-Transformer/

toc: true
toc_sticky: true

date: 2026-03-06 00:00:00+0900+0900
last_modified_at: 2026-03-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.04892)

**저자:** Sina Hajimiri, Farzad Beizaee, Fereshteh Shakeri, Christian Desrosiers, Ismail Ben Ayed, Jose Dolz



## 핵심 연구 목표
본 논문은 이미지 분류 훈련 후 Vision Transformer (ViT)의 **dense prediction 성능, 특히 segmentation 성능을 향상** 시키는 것을 목표로 합니다. 전역 어텐션(global attention)이 세부 공간 정보를 희석시키고 `[CLS]` 토큰에 대한 패치 토큰의 정렬을 유발하는 문제를 해결하며, 기존 ViT 아키텍처를 유지하면서 지역적 디테일 보존을 강화하고자 합니다.

## 핵심 방법론
제안하는 **Locality-Attending (LocAt)** 애드온은 **Gaussian-Augmented (GAug) attention** 과 **Patch Representation Refinement (PRR)** 로 구성됩니다. **GAug attention** 은 학습 가능한 **Gaussian kernel** 을 어텐션 logit에 추가하여 인접 패치에 대한 어텐션을 편향시키고, **PRR** 은 분류 헤드 이전에 **parameter-free attention** 을 적용하여 패치 표현의 의미 있는 학습을 유도합니다.

## 주요 결과
**LocAt** 은 **ViT Tiny** 모델에서 **ADE20K, PASCAL Context, COCO Stuff** 의 segmentation mIoU를 각각 **+6.17%, +4.86%, +5.86%** 향상시켰습니다. 또한 **ImageNet-1K** 분류 정확도를 최대 **+1.55%** 개선했으며, **DINO self-supervised** 학습 환경에서도 **linear classification** 에서 **+2.13%** , **k-NN** 에서 **+2.27%** 의 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **Foundation 모델** 과 같이 대규모로 사전 훈련된 **Vanilla ViT 모델** 의 dense prediction 능력을 **최소한의 아키텍처 변경** 만으로 효과적으로 개선할 수 있는 실용적인 방법을 제시합니다. **GAug** 가 전역 어텐션을 사용하는 백본에서 특히 효과적이라는 점은, 기존 모델에 로컬리티를 주입하여 **fine-grained spatial details** 를 보존하는 유연한 전략으로 활용될 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.