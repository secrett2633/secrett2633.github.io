---
title: "[논문리뷰] FastFit: Accelerating Multi-Reference Virtual Try-On via Cacheable
  Diffusion Models"
excerpt: "Zhen Wang이 arXiv에 게시한 'FastFit: Accelerating Multi-Reference Virtual Try-On via Cacheable
  Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Virtual Try-On
  - Diffusion Models
  - Cacheable Architecture
  - Multi-Reference
  - Semi-Attention
  - Efficiency
  - Image Synthesis

permalink: /ai/review/2025-9-3-FastFit-Accelerating-Multi-Reference-Virtual-Try-On-via-Cacheable-Diffusion-Models/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.20586)

**저자:** Zheng Chong, Yanwei Lei, Shiyue Zhang, Zhuandi He, Zhen Wang, Xujie Zhang, Xiao Dong, Yiling Wu, Dongmei Jiang & Xiaodan Liang



## 핵심 연구 목표
본 논문은 기존 가상 착용(Virtual Try-On) 기술이 다중 레퍼런스 의상 조합(가먼트 및 액세서리 포함)을 지원하지 못하고, 각 디노이징 단계에서 레퍼런스 피처의 중복 계산으로 인한 비효율성 문제를 해결하는 것을 목표로 합니다. 이를 통해 빠르고 일관된 다중 레퍼런스 가상 착용 프레임워크를 제공하고자 합니다.

## 핵심 방법론
저자들은 새로운 **캐시 가능한 확산 아키텍처(Cacheable Diffusion Architecture)** 기반의 **Cacheable UNet** 을 제안합니다. 이 아키텍처는 **Reference Class Embedding** 을 도입하여 레퍼런스 피처 인코딩을 디노이징 과정과 독립적으로 만들고, **Semi-Attention 메커니즘** 을 통해 레퍼런스 피처가 디노이징 피처에 의해 오염되지 않도록 합니다. 이를 통해 레퍼런스 피처를 한 번만 계산하여 모든 디노이징 단계에서 손실 없이 재사용하는 **Reference KV Cache** 를 가능하게 합니다. 또한, 다중 레퍼런스 가상 착용 연구를 위한 대규모 데이터셋인 **DressCode-MR** 를 구축했습니다.

## 주요 결과
FastFit은 비교 가능한 방법론 대비 평균 **3.5배의 추론 속도 향상** 을 달성했습니다. VITON-HD 데이터셋의 단일 레퍼런스 가상 착용에서 **1.16초** 의 추론 시간을 기록했으며, DressCode-MR 데이터셋의 다중 레퍼런스 가상 착용에서 **1.90초** 를 달성하여 기존 SOTA 모델들을 크게 상회하는 효율성을 보였습니다. 또한, 이미지 충실도 측면에서도 DressCode 데이터셋에서 **FID 2.836** , **KID 0.390** , **SSIM 0.907** , **LPIPS 0.057** 를 기록하는 등 최첨단 성능을 능가했습니다.

## AI 실무자를 위한 시사점
FastFit은 가상 착용 기술의 주요 병목인 효율성 문제를 해결하여, 실시간 상호작용 및 복잡한 의상 조합을 요구하는 실제 애플리케이션에서의 활용 가능성을 크게 높였습니다. **캐시 가능한 확산 아키텍처** 는 가상 착용 외의 다른 다중 레퍼런스 조건부 생성 태스크에도 적용될 수 있는 일반화된 접근 방식을 제시합니다. **DressCode-MR** 데이터셋은 다중 아이템 이미지 생성 및 의상 시각화 분야의 추가 연구를 위한 중요한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.