---
title: "[논문리뷰] HiGS: History-Guided Sampling for Plug-and-Play Enhancement of Diffusion
  Models"
excerpt: "Romann M. Weber이 arXiv에 게시한 'HiGS: History-Guided Sampling for Plug-and-Play Enhancement of Diffusion
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Sampling
  - Generative AI
  - Image Generation
  - Plug-and-Play
  - Training-Free
  - Guidance
  - Momentum-Based Methods

permalink: /ai/review/2025-9-29-HiGS-History-Guided-Sampling-for-Plug-and-Play-Enhancement-of-Diffusion-Models/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22300)

**저자:** Seyedmorteza Sadat, Farnood Salehi, Romann M. Weber



## 핵심 연구 목표
확산 모델이 적은 NFEs(Neural Function Evaluations) 또는 낮은 guidance scale에서 비현실적인 출력과 세부 정보 부족을 보이는 문제를 해결하고, 확산 샘플링의 품질과 효율성을 향상시키는 것을 목표로 합니다. 특히, 추가적인 훈련이나 미세 조정 없이 다양한 샘플링 예산과 guidance scale에 걸쳐 전역 구조, 세부 사항, 선명도를 일관되게 개선하고자 합니다.

## 핵심 방법론
본 논문은 확산 모델의 샘플링 과정을 개선하기 위한 **HiGS(History-Guided Sampling)** 라는 새로운 **모멘텀 기반 샘플링 기법** 을 제안합니다. 이 방법론은 각 추론 단계에서 최근 모델 예측을 통합하여 샘플링 과정을 더 사실적인 출력으로 유도합니다. 구체적으로, 현재 예측과 **과거 예측의 가중 평균 간의 차이** (`g(Hk)`)를 활용하여 샘플링 방향을 조절합니다. 또한, guidance term에 대한 **제곱근 가중치 스케줄링** (`wHiGS(t)`)을 적용하고, 오버채도 및 색상 아티팩트 방지를 위해 업데이트 벡터에 **직교 투영** 을 적용합니다. 마지막으로, 비현실적인 색상 구성을 해결하기 위해 **DCT(Discrete Cosine Transform) 기반의 고역 통과 필터링** 을 적용합니다.

## 주요 결과
HiGS는 다양한 모델 및 아키텍처에서 이미지 품질을 일관되게 향상시키는 것을 입증했습니다. 특히, 사전 훈련된 **SiT 모델** 을 사용하여 256x256 무가이드 **ImageNet 생성에서 30 샘플링 단계(기존 250단계 대비)** 만으로 **1.61의 FID** 를 달성하여 새로운 SOTA(State-Of-The-Art)를 기록했습니다. **Stable Diffusion XL** 에서는 FID를 28.49에서 **26.18** 로, IS를 35.07에서 **36.22** 로 개선했으며, **Stable Diffusion 3.5** 에서도 HPSv2 win rate를 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
HiGS는 추가적인 훈련이나 미세 조정 없이 기존 확산 모델의 생성 품질을 향상시킬 수 있는 **플러그 앤 플레이** 솔루션을 제공합니다. 특히, **적은 샘플링 단계** 또는 **낮은 CFG(Classifier-Free Guidance) 스케일** 에서도 높은 품질의 이미지를 생성할 수 있어, **빠르고 효율적인 이미지 생성** 이 필요한 AI 실무자에게 매우 유용합니다. **DCT 기반 필터링** 과 **직교 투영** 을 통해 색상 아티팩트와 오버채도를 효과적으로 완화하여 생성물의 사실감을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.