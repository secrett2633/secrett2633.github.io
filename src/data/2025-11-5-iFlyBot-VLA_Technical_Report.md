---
title: "[논문리뷰] iFlyBot-VLA Technical Report"
excerpt: "Jiajia wu이 [arXiv]에 게시한 'iFlyBot-VLA Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Robotics
  - Imitation Learning
  - Latent Actions
  - Diffusion Models
  - Dual-Arm Manipulation
  - Pretraining
  - Flow-Matching

permalink: /ai/review/2025-11-5-iFlyBot-VLA_Technical_Report/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01914)

**저자:** Yuan Zhang, Chenyu Xue, Wenjie Xu, Chao Ji, Jiajia wu, Jia Pan



## 핵심 연구 목표
iFlyBot-VLA는 장기적인 로봇 조작 작업을 위한 대규모 **Vision-Language-Action (VLA) 모델**을 개발하는 것을 목표로 합니다. 특히, 연속적인 정밀 제어가 필요한 작업에서 **오토회귀 모델의 한계를 극복**하고, VLM의 일반적인 인지 및 추론 능력을 유지하면서 확산 모델 기반의 액션 전문가가 정확하고 부드러운 동작을 생성할 수 있도록 하는 훈련 전략을 설계하는 문제를 해결하고자 합니다.

## 핵심 방법론
본 연구는 세 가지 핵심 방법론을 제안합니다: 첫째, 대규모 인간 및 로봇 조작 비디오로 훈련된 **잠재 액션 모델(latent action model)**을 사용합니다. 둘째, **이중-레벨 액션 표현 프레임워크**를 통해 VLM과 액션 전문가를 동시 감독 훈련하여 **잠재 액션**과 **구조화된 이산 액션 토큰**을 학습합니다. 셋째, 로봇 궤적 데이터와 **일반 QA 및 공간 QA 데이터셋**을 혼합한 **훈련 전략**을 사용하여 VLM 백본의 **3D 인지 및 추론 능력**을 향상시킵니다. 액션 생성에는 **Flow-Matching Diffusion Transformer** 아키텍처를 기반으로 한 액션 전문가 모듈을 사용합니다.

## 주요 결과
iFlyBot-VLA는 **LIBERO Franka 벤치마크**에서 평균 **93.8%**의 성공률을 달성하여 기존 VLA 모델인 **πθ (86%)** 및 **OpenVLA (76.5%)**를 크게 능가했습니다. 실제 환경 평가에서는 기본적인 픽-앤-플레이스에서 **96.25%**의 성공률과 장기적인 소포 분류 작업에서 기준선 대비 **7.5% 더 높은 성공률**을 기록하는 등 다양한 작업에서 우수한 성능과 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡한 로봇 조작을 위한 **VLA 모델** 개발에 있어 **VLM의 일반화 능력 보존**과 **액션 전문가의 정밀도** 간의 균형이 중요함을 보여줍니다. **잠재 액션(implicit planning)**과 **이산 액션 토큰(explicit planning)**을 결합한 이중-레벨 접근 방식은 실용적인 로봇 시스템 설계에 유용하며, 특히 장기 조작 작업에서 효과적입니다. 또한, **대규모의 다양한 데이터셋**과 **혼합 훈련 전략**이 모델의 일반화 성능을 크게 향상시킬 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.