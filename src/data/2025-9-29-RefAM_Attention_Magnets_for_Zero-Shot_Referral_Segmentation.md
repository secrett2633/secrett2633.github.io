---
title: "[논문리뷰] RefAM: Attention Magnets for Zero-Shot Referral Segmentation"
excerpt: "Federico Tombari이 [arXiv]에 게시한 'RefAM: Attention Magnets for Zero-Shot Referral Segmentation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Zero-Shot Segmentation
  - Referring Segmentation
  - Diffusion Transformers (DiTs)
  - Attention Mechanisms
  - Attention Sinks
  - Stop Words
  - Vision-Language Models
  - Training-Free Methods

permalink: /ai/review/2025-9-29-RefAM_Attention_Magnets_for_Zero-Shot_Referral_Segmentation/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22650)

**저자:** Anna Kukleva, Enis Simsar, Alessio Tonioni, Muhammad Ferjad Naeem, Federico Tombari, Jan Eric Lenssen, Bernt Schiele



## 핵심 연구 목표
컴퓨터 비전 태스크에서 **CNN의 의존성을 완전히 제거**하고, 순수한 **Transformer 아키텍처**만으로 이미지 분류 성능을 달성하는 것을 목표로 합니다. 기존 CNN 기반 접근법의 한계를 극복하고 **self-attention 메커니즘**이 이미지 패치 간의 관계를 효과적으로 학습할 수 있음을 증명하고자 합니다.

## 핵심 방법론
이미지를 **16x16 크기의 패치**로 분할하고 각 패치를 **선형 임베딩**으로 변환한 후, **위치 인코딩**을 추가하여 Transformer 인코더에 입력합니다. **대규모 데이터셋에서의 사전 훈련** 후 하위 태스크로 전이학습하는 방식을 채택하였으며, **classification token**을 통해 최종 분류 결과를 출력합니다.

## 주요 결과
**ImageNet-21k**에서 사전 훈련 후 ImageNet에서 **88.55% top-1 accuracy**를 달성하여 기존 CNN 기반 모델들을 뛰어넘었습니다. **JFT-300M** 데이터셋 사용 시에는 더욱 뛰어난 성능을 보여주며, 대규모 데이터에서 **ViT-Huge 모델**이 **ResNet 대비 약 4배 적은 연산량**으로 동등한 성능을 달성했습니다.

## AI 실무자를 위한 시사점
컴퓨터 비전 분야에서 **Transformer 기반 모델의 가능성**을 입증하여 새로운 연구 방향을 제시했습니다. 하지만 **대규모 데이터셋이 필수**이며, 소규모 데이터에서는 여전히 CNN이 우수한 성능을 보이므로 **데이터 규모에 따른 모델 선택**이 중요합니다. **사전 훈련된 ViT 모델**들이 공개되어 전이학습 활용이 용이해졌습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.