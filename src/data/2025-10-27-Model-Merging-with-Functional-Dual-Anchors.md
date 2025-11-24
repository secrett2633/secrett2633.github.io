---
title: "[논문리뷰] Model Merging with Functional Dual Anchors"
excerpt: "이 [arXiv]에 게시한 'Model Merging with Functional Dual Anchors' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Model Merging
  - Functional Dual Anchors
  - Input-Representation Space
  - Task Vectors
  - Knowledge Integration
  - Foundation Models
  - Gradient Matching
  - Post-training Strategy

permalink: /ai/review/2025-10-27-Model-Merging-with-Functional-Dual-Anchors/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.21223)

**저자:** Kexuan Shi, Yandong Wen, Weiyang Liu



## 핵심 연구 목표
본 논문은 파운데이션 모델의 finetuned 체크포인트에서 지식을 통합하는 **모델 병합(Model Merging)** 과정에서 발생하는 **파라미터 충돌**과 **태스크별 지식 충돌** 문제를 해결하는 것을 목표로 합니다. 기존의 **파라미터 공간(parameter space)** 기반 접근법의 한계를 극복하고, 대신 **입력-표현 공간(input-representation space)**에서 지식을 효과적으로 모델링하는 새로운 프레임워크를 제안합니다.

## 핵심 방법론
저자들은 **기능적 듀얼 앵커(Functional Dual Anchors, FDAs)**라는 합성 입력(synthetic inputs)을 생성하여 태스크 벡터의 역할을 시뮬레이션하는 새로운 프레임워크를 제시합니다. FDAs는 사전 훈련된 모델에 대한 유도된 기울기(induced gradients)가 해당 태스크 벡터와 정렬되도록 **기울기 매칭(gradient matching)**을 통해 최적화됩니다. 특히, **선형 가중치 샘플링(Linear Weight Sampling)** 또는 **스케일된 가우시안 샘플링(Scaled Gaussian Sampling)**을 통한 **원칙적인 초기화(principled initialization)** 방식을 제안하여 최적화의 수렴을 개선합니다. 이후, 생성된 FDAs를 사용하여 모델 파라미터를 직접 최적화하거나, 기존 **파라미터 중심 모델 병합** 방법론(예: **TA, TSV, WUDI**)의 태스크 벡터를 정제하는 데 활용합니다.

## 주요 결과
**FDAs**는 **ViT-B/16 모델**에서 기존 **태스크 산술(Task Arithmetic, TA)** 대비 **멀티태스크 성능을 18% 가까이 향상**시켰으며, **RoBERTa-Large GLUE 스코어**에서 **15.4% 향상**을 달성했습니다. 또한, FDAs는 기존 파라미터 중심 모델 병합 방법론인 **TA, TSV, WUDI**의 성능을 **ViT-B/16에서 약 5.10%**, **RoBERTa-Large에서 약 13%** 추가적으로 개선하는 상보적(complementary) 효과를 보였습니다. FDAs는 최적화 과정에서 **긴 꼬리 스펙트럼 구조(long-tailed spectrum structure)**로 진화하며, 실제 데이터의 고에너지 서브스페이스와 점진적으로 정렬되는 특성을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **파라미터 공간** 대신 **입력-표현 공간**에서 지식을 모델링하는 새로운 **모델 병합** 접근 방식을 제공하여, 기존 방법론의 한계를 극복하고 **더욱 견고하고 유연한 모델 통합**을 가능하게 합니다. 특히, **FDAs**는 기존의 **데이터-프리(data-free)** 또는 **데이터 기반(data-driven) 모델 병합 방법론**과 함께 사용될 때 성능을 더욱 향상시킬 수 있어, 다양한 AI 응용 분야에서 **지식 통합의 효율성**을 높일 수 있습니다. 제안된 **초기화 기법**과 **계층별 전략**은 대규모 **파운데이션 모델**에 대한 **FDAs**의 실용적인 적용 가능성을 보여주며, **멀티태스크 학습 환경**에서 **모델 재훈련 없이 성능을 향상**시키는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.