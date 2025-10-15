---
title: "[논문리뷰] Advancing End-to-End Pixel Space Generative Modeling via Self-supervised
  Pre-training"
excerpt: "이 [arXiv]에 게시한 'Advancing End-to-End Pixel Space Generative Modeling via Self-supervised
  Pre-training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Pixel-space Generative Models
  - Diffusion Models
  - Consistency Models
  - Self-supervised Pre-training
  - End-to-end Training
  - Image Generation
  - FID
  - Representation Learning

permalink: /ai/review/2025-10-15-Advancing_End-to-End_Pixel_Space_Generative_Modeling_via_Self-supervised_Pre-training/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12586)

**저자:** Jiachen Lei, Keli Liu, Julius Berner, Haiming Yu, Hongkai Zheng, Jiahong Wu, Xiangxiang Chu



## 핵심 연구 목표
본 연구는 픽셀 공간(pixel-space) 기반 생성 모델이 잠재 공간(latent-space) 기반 모델에 비해 훈련이 어렵고 성능이 낮은 문제점을 해결하여, 성능 및 효율성 격차를 해소하는 것을 목표로 합니다. 사전 학습된 VAE와 같은 외부 모델에 의존하지 않고 고해상도 이미지에 대한 **End-to-End 픽셀 공간 생성 모델링**을 발전시키고자 합니다.

## 핵심 방법론
논문은 두 단계로 구성된 훈련 프레임워크를 제안합니다. 첫 번째 단계에서는 인코더를 **자기 지도(self-supervised) 방식으로 사전 훈련**하여 깨끗한 이미지에서 의미 있는 시맨틱을 학습시키고, 동일한 **확정적 샘플링 궤적(deterministic sampling trajectory)**을 따라가는 지점들과 정렬시킵니다. 이는 **대조 손실(contrastive loss)**과 **표현 일관성 손실(representation consistency loss)**을 활용하며, **선형 보간 온도 스케줄(linear interpolated temperature schedule)**을 적용하여 안정성을 확보합니다. 두 번째 단계에서는 사전 훈련된 인코더와 무작위로 초기화된 디코더를 통합하여 **확산(diffusion) 및 일관성(consistency) 모델** 모두에 대해 전체 모델을 **End-to-End** 방식으로 미세 조정합니다.

## 주요 결과
본 모델(**EPG**)은 **ImageNet-256**에서 **FID 2.04**를, **ImageNet-512**에서 **FID 2.35**를 **75 NFE(Number of Function Evaluations)**만으로 달성하여, 기존 픽셀 공간 방법론들을 크게 능가했습니다. 특히, 일관성 모델은 **단일 샘플링 스텝**으로 **ImageNet-256**에서 **FID 8.82**라는 인상적인 성능을 기록하여, 사전 훈련된 VAE나 확산 모델에 의존하지 않고 고해상도 이미지에서 일관성 모델을 성공적으로 훈련한 첫 사례입니다. 전체 계산 비용은 VAE 및 잠재 공간 모델을 훈련하는 비용보다 **상당히 낮았습니다**.

## AI 실무자를 위한 시사점
이 연구는 **End-to-End 픽셀 공간 생성 모델**이 잠재 공간 기반 모델과 대등하거나 더 나은 성능을 달성할 수 있음을 입증하며, **VAE 없이 고해상도 이미지 생성**을 가능하게 하는 실용적인 방법을 제시합니다. **자기 지도 사전 훈련**을 통해 **훈련 효율성**과 **생성 품질**을 동시에 높이는 전략은 새로운 모델 개발에 중요한 통찰력을 제공합니다. 특히, **단일 스텝 샘플링**으로 고품질 이미지를 생성하는 **일관성 모델**의 발전은 실시간 생성 애플리케이션에 큰 영향을 미칠 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.