---
title: "[논문리뷰] Large Scale Diffusion Distillation via Score-Regularized Continuous-Time
  Consistency"
excerpt: "Jintao Zhang이 [arXiv]에 게시한 'Large Scale Diffusion Distillation via Score-Regularized Continuous-Time
  Consistency' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Distillation
  - Consistency Models
  - Score Regularization
  - Large-Scale Generative Models
  - Text-to-Image
  - Text-to-Video
  - Model Acceleration
  - JVP

permalink: /ai/review/2025-10-10-Large_Scale_Diffusion_Distillation_via_Score-Regularized_Continuous-Time_Consistency/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08431)

**저자:** Kaiwen Zheng, Yuji Wang, Qianli Ma, Huayu Chen, Jintao Zhang, Yogesh Balaji, Jianfei Chen, Ming-Yu Liu, Jun Zhu, Qinsheng Zhang



## 핵심 연구 목표
본 논문은 **연속 시간 일관성 증류 (sCM)**를 대규모 **텍스트-투-이미지 (T2I)** 및 **텍스트-투-비디오 (T2V)** 확산 모델에 적용할 때 발생하는 한계점을 해결하는 것을 목표로 합니다. 특히, **Jacobian-vector product (JVP)** 계산의 인프라적 제약과 미세한 디테일 생성에서의 품질 저하 및 오류 축적 문제를 극복하고자 합니다.

## 핵심 방법론
저자들은 대규모 모델 훈련을 위한 **FlashAttention-2 JVP 커널**을 개발하여 **100억 개 이상의 매개변수**와 고차원 비디오 태스크에서 sCM 훈련을 가능하게 했습니다. 또한, **스코어 증류 (score distillation)**를 장거리 스킵 정규화 기법으로 통합한 **스코어 정규화 연속 시간 일관성 모델 (rCM)**을 제안하여, sCM의 "모드 커버링" 특성과 스코어 증류의 "모드 시킹" 특성을 보완했습니다. 불안정한 JVP 계산을 안정화하기 위해 **세미-연속 시간 (Semi-Continuous Time)** 및 **고정밀 시간 (High-Precision Time)** 기법을 도입했습니다.

## 주요 결과
제안된 **rCM**은 **Cosmos-Predict2** 및 **Wan2.1 (최대 14B 매개변수)**과 같은 대규모 모델에서 **1~4단계**로 고품질 샘플을 생성하며, 확산 샘플링 속도를 **15배~50배** 가속화합니다. **GenEval** T2I 태스크에서 4단계로 **최대 0.83**의 전체 점수, **VBench** T2V 태스크에서 2단계로 **최대 85.05**의 총점을 달성하며 기존 **DMD2** 대비 품질 지표에서 동등하거나 우수한 성능을 보였습니다. 특히, **rCM**은 **DMD2**보다 우수한 생성 다양성을 제공합니다.

## AI 실무자를 위한 시사점
**rCM**은 대규모 T2I 및 T2V 생성 모델을 **적은 샘플링 단계**로 효율적으로 가속화할 수 있는 실용적인 방법론을 제공합니다. **FlashAttention-2 JVP 커널**의 개발과 병렬화 호환성 확보는 복잡한 미분 계산을 대규모 딥러닝 모델에 적용하는 중요한 기술적 진전을 보여줍니다. **스코어 정규화**를 통한 품질 및 다양성 향상은 실제 서비스에서 고품질의 다양한 결과물이 필요한 AI 애플리케이션 개발에 크게 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.