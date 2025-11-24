---
title: "[논문리뷰] Don't Blind Your VLA: Aligning Visual Representations for OOD
  Generalization"
excerpt: "Aleksandr I. Panov이 [arXiv]에 게시한 'Don't Blind Your VLA: Aligning Visual Representations for OOD
  Generalization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - OOD Generalization
  - Representation Alignment
  - Fine-tuning
  - Robotics
  - Visual Representations
  - Attention Maps
  - t-SNE

permalink: /ai/review/2025-11-5-Dont-Blind-Your-VLA-Aligning-Visual-Representations-for-OOD-Generalization/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25616)

**저자:** Nikita Kachaev, Mikhail Kolosov, Daniil Zelezetsky, Alexey K. Kovalev, Aleksandr I. Panov



## 핵심 연구 목표
논문은 사전 훈련된 Vision-Language-Action (VLA) 모델이 로봇 액션 태스크에 **미세 조정될 때 발생하는 시각 표현의 퇴화(degradation)** 문제를 해결하고자 합니다. 특히, 기존 VL(Vision-Language) 지식과 표현이 손실되어 **OOD(Out-of-Distribution) 시나리오**에서의 일반화 성능이 저하되는 현상을 방지하고 개선하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **VL-Think Task Suite**라는 진단 도구와 **t-SNE 시각화** 및 **어텐션 맵 분석**을 통해 표현 퇴화를 체계적으로 연구했습니다. 이를 해결하기 위해, VLA의 시각 표현을 **강력한 비전 티처 모델(C-RADIOv3)**의 특징에 고정시키는 **Visual Representation Alignment**라는 경량화된 방법을 제안합니다. 이 방법은 **MLP Ln&D 프로젝터**와 **Backbone2Enc 정렬 방식**을 사용하며, 주로 **중간 레이어(Layer 16)**에 **Cosine 유사도 손실**과 **계수 0.2**를 적용합니다.

## 주요 결과
제안된 **Visual Representation Alignment** 방법은 기존 **SFT(Supervised Fine-Tuning)** 대비 **OOD 일반화 성능을 최대 10% 상대적으로 향상**시켰습니다 (Table 1). 특히, **ImageNet-100 선형 프로빙** 결과에서 **OpenVLA SFT의 77.48%**에 비해 **OpenVLA Align이 82.13%**의 정확도를 달성하여 표현 품질의 향상을 입증했습니다 (Table 3). 또한, **C-RADIOv3 티처 모델**이 가장 효과적이었으며(Table 4), 중간 레이어 정렬이 **Semantic, Vision, Execution** 세 축 모두에서 가장 큰 개선을 가져왔음을 보여주었습니다(Table 7).

## AI 실무자를 위한 시사점
VLA 모델을 로봇 액션에 미세 조정할 때 발생하는 **시각 표현 퇴화 및 OOD 일반화 성능 저하** 문제를 명확히 진단하고 실용적인 해결책을 제시합니다. **경량화된 Visual Representation Alignment** 기법은 기존 VLM의 풍부한 지식을 유지하면서 로봇 제어 능력을 향상시키는 효율적인 방법으로, 복잡한 VLA 모델 개발 시 **전이 학습의 함정**을 피하고 **일반화 성능을 개선**하는 데 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.