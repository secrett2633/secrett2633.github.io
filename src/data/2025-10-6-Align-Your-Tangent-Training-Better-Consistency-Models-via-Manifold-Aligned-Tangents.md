---
title: "[논문리뷰] Align Your Tangent: Training Better Consistency Models via
  Manifold-Aligned Tangents"
excerpt: "Jong Chul Ye이 [arXiv]에 게시한 'Align Your Tangent: Training Better Consistency Models via
  Manifold-Aligned Tangents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Consistency Models
  - Generative Models
  - Manifold Learning
  - Tangent Alignment
  - Diffusion Models
  - Training Dynamics
  - Manifold Feature Distance

permalink: /ai/review/2025-10-6-Align-Your-Tangent-Training-Better-Consistency-Models-via-Manifold-Aligned-Tangents/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.00658)

**저자:** Beomsu Kim, Byunghee Cha, Jong Chul Ye



## 핵심 연구 목표
본 연구는 **Consistency Models (CMs)** 의 느린 수렴 문제와 높은 배치 사이즈 요구 사항을 해결하는 것을 목표로 합니다. 특히 CM 훈련 과정에서 발생하는 **CM tangents (출력 업데이트 방향)** 의 진동성(oscillatory) 특성이 데이터 매니폴드에 평행하게 움직여 수렴을 방해한다는 점을 발견하고, 이를 완화하여 더 빠르고 안정적인 CM 훈련을 가능하게 하고자 합니다.

## 핵심 방법론
저자들은 CM 훈련 동역학을 분석하여 **매니폴드-평행 진동 성분** 이 수렴을 방해한다는 가설을 세웠습니다. 이를 해결하기 위해 **Manifold Feature Distance (MFD)** 라는 새로운 손실 함수를 제안합니다. MFD는 **VGG16 네트워크** 를 기반으로 학습된 **매니폴드 특징 맵 (φ)** 을 사용하여, 이미지 변환(가우시안 노이즈, 블러, 믹스업, 기하학적/색상 변환)에 민감하게 반응하도록 훈련됩니다. 이 특징 맵은 매니폴드에 정렬된 탄젠트를 제공하여 훈련 시 진동 성분을 줄입니다.

## 주요 결과
제안된 **Align Your Tangent (AYT)** 방법은 CM 훈련을 기존 **pseudo-Huber 손실** 대비 **수십 배 빠르게 가속화** 합니다. **CIFAR10** 에서 1단계 FID를 **ECT의 3.60** 에서 **AYT의 2.61** 로 크게 개선했으며, **LPIPS** 보다 우수한 성능을 보였습니다. 특히, **16과 같이 극도로 작은 배치 사이즈** 로도 경쟁력 있는 FID 점수를 달성하여 배치 사이즈에 대한 강력한 견고성을 입증했습니다.

## AI 실무자를 위한 시사점
**AYT** 는 **Consistency Models** 의 훈련 효율성을 획기적으로 개선하여 실제 AI 애플리케이션에 대한 활용도를 높입니다. **대규모 컴퓨팅 자원이나 배치 사이즈** 없이도 고품질 생성 모델을 훈련할 수 있게 함으로써, 리소스 제약이 있는 환경에서도 **최첨단 생성 AI 모델** 을 개발하고 배포할 수 있는 가능성을 열어줍니다. 또한, **인간의 감독이 필요 없는 자체 감독 방식** 의 **매니폴드 특징 거리(MFD)** 는 다양한 도메인과 데이터셋에 쉽게 적용될 수 있는 범용적인 접근 방식입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.