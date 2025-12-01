---
title: "[논문리뷰] Diversity Has Always Been There in Your Visual Autoregressive Models"
excerpt: "Yaxing Wang이 [arXiv]에 게시한 'Diversity Has Always Been There in Your Visual Autoregressive Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Autoregressive Models
  - Diversity Collapse
  - Generative Diversity
  - Soft-Suppression Regularization
  - Soft-Amplification Regularization
  - Training-Free
  - Image Generation
  - Singular Value Decomposition

permalink: /ai/review/2025-11-24-Diversity-Has-Always-Been-There-in-Your-Visual-Autoregressive-Models/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.17074)

**저자:** Yaxing Wang, Kai Wang, Nian Liu, Guanyu Yang, Tong Wang



## 핵심 연구 목표
Visual Autoregressive (VAR) 모델이 겪는 **다양성 붕괴(diversity collapse)** 문제를 해결하고, 추가적인 훈련 없이 모델의 내재된 생성 다양성을 발현시키면서도 이미지 품질과 텍스트-이미지 정렬을 효과적으로 유지하는 것을 목표로 합니다.

## 핵심 방법론
논문은 VAR 모델의 **다양성 붕괴** 가 초기 스케일에서 **특징 맵의 핵심 요소(pivotal component)** 에 의해 좌우된다는 점을 분석했습니다. 이를 바탕으로 추가 훈련 없이 추론 과정에 개입하는 **DiverseVAR** 를 제안합니다. 이 방법은 입력 특징 맵의 **특이값 분해(SVD)** 를 통해 **핵심 요소** 를 **Soft-Suppression Regularization (SSR)** 으로 억제하고, 출력 특징 맵에서는 **Soft-Amplification Regularization (SAR)** 으로 증폭하는 방식으로 다양성을 유도합니다. 이 과정은 초기 스케일(기본값으로 **스케일 4 및 6** )과 **Infinity backbone** 의 모든 블록에 적용됩니다.

## 주요 결과
**DiverseVAR** 는 COCO, GenEval, DPG 벤치마크에서 기존 VAR 모델 대비 생성 다양성을 **상당히 향상** 시켰습니다. 특히, **Infinity-8B** 모델 기준으로 **COCO2014-30K** 데이터셋에서 FID를 **18.79에서 14.26으로 낮추고** , Recall은 **0.451에서 0.497로, Coverage는 0.740에서 0.748로 증가** 시키면서도 CLIPScore는 유사하게 유지하여 텍스트-이미지 정렬을 보존했습니다. AFHQ 및 CelebA-HQ 벤치마크에서도 유사하게 다양성 지표가 개선되었습니다.

## AI 실무자를 위한 시사점
이 연구는 VAR 모델의 **다양성 붕괴** 문제를 해결하는 **훈련 없는(training-free)** 효과적인 방법을 제공하여, AI 실무자들이 더 다양한 이미지를 생성할 수 있도록 지원합니다. **Singular Value Decomposition (SVD)** 기반의 간단한 조작으로 기존 모델의 잠재된 다양성을 끌어내어, 고품질 이미지 생성뿐만 아니라 **생성 모델의 활용성** 을 높이는 데 기여합니다. 특히, 기존 모델의 재학습 없이 적용 가능하다는 점에서 **리소스 효율적인(resource-efficient)** 솔루션으로 활용 가치가 높습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.