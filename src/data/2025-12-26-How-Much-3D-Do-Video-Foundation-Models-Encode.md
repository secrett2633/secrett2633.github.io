---
title: "[논문리뷰] How Much 3D Do Video Foundation Models Encode?"
excerpt: "arXiv에 게시된 'How Much 3D Do Video Foundation Models Encode?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Foundation Models
  - 3D Understanding
  - 3D Reconstruction
  - Model Agnostic
  - Feature Probing
  - Diffusion Models
  - Temporal Reasoning

permalink: /ai/review/2025-12-26-How-Much-3D-Do-Video-Foundation-Models-Encode/

toc: true
toc_sticky: true

date: 2025-12-26 00:00:00+0900+0900
last_modified_at: 2025-12-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.19949)

**저자:** Zixuan Huang, Xiang Li, Zhaoyang Lv, James M. Rehg



## 핵심 연구 목표
본 논문은 대규모 비디오 데이터로 사전 훈련된 Video Foundation Models (VidFMs) 내에 글로벌 3D 이해도가 자연스럽게 내재되어 있는지를 정량적으로 탐구하는 것을 목표로 합니다. 명시적인 3D 훈련 없이도 VidFMs가 얼마나 강력한 3D 정보를 인코딩하는지 파악하고, 확장 가능한 3D 모델 구축을 위한 실용적인 통찰력을 제공하고자 합니다.

## 핵심 방법론
연구진은 다양한 VidFMs ( **WAN2.1-14B** , **Open-Sora2.0** , **V-JEPA** , **DINOv2** , **Fast3R** )로부터 동결된(frozen) 공간-시간적 특징을 추출하는 **모델-불가지론적(model-agnostic) 프레임워크** 를 제안합니다. 추출된 특징을 입력으로 받아 **3D 포인트 맵** , **깊이 맵** , **카메라 포즈** 를 예측하는 얕은 **VGGT-like 트랜스포머 기반 프로브 모델** 을 학습시켰으며, 이는 **4개의 alternating-attention 레이어** 와 **3개의 리드아웃 헤드** 로 구성됩니다. 평가는 **CO3Dv2** 및 **DL3DV** 데이터셋에서 포인트 오류, 깊이 오류, 카메라 포즈 예측의 **AUC@** 지표를 사용하여 수행됩니다.

## 주요 결과
최신 비디오 생성 모델인 **WAN2.1-14B** 및 **Open-Sora2.0** 는 3D 전문가 모델인 **Fast3R** 보다 특히 **DL3DV** 데이터셋에서 **Point Err 1.051** 대 **1.379** 를 기록하며 우수한 **강력한 3D 이해도** 를 보였습니다. **시간적 추론** 은 글로벌 3D 이해에 매우 중요하며, 이미지 모델인 **DINOv2** 는 비디오 모델 대비 **글로벌 3D 이해도** 에서 크게 뒤처졌습니다 ( **DL3DV** 에서 **Point Err 2.814** ). 또한, 확산 모델의 경우 **중간 네트워크 계층** 과 **초기-그러나-첫 번째가 아닌** 디노이징 타임스텝에서 가장 높은 3D 인식 특징이 추출되었습니다.

## AI 실무자를 위한 시사점
본 연구는 대규모 비디오 데이터로 훈련된 **비디오 생성 모델** 이 명시적인 3D 훈련 없이도 강력한 3D 이해 능력을 내재하고 있음을 입증하며, 이는 **제한된 3D 데이터** 환경에서 효율적인 3D 재구성 솔루션을 제공할 수 있음을 시사합니다. **시간적 추론** 의 중요성과 **최적의 특징 추출 위치 (중간 레이어, 초기 디노이징 타임스텝)** 에 대한 발견은 향후 3D-aware VidFMs의 아키텍처 설계 및 최적화에 중요한 가이드라인이 될 수 있습니다. 이는 실무에서 3D 데이터 부족 문제를 완화하고, 비디오 모델을 활용한 새로운 3D 응용 분야 개척에 기여할 잠재력이 큽니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.