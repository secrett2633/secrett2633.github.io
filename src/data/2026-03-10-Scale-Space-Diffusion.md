---
title: "[논문리뷰] Scale Space Diffusion"
excerpt: "Abhinav Shrivastava이 arXiv에 게시한 'Scale Space Diffusion' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Scale Space Theory
  - Generative Models
  - Multi-resolution Image Generation
  - UNet Architecture
  - Image Upsampling
  - Non-Isotropic Noise

permalink: /ai/review/2026-03-10-Scale-Space-Diffusion/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.08709)

**저자:** Soumik Mukhopadhyay, Prateksha Udhayanan, Abhinav Shrivastava



## 핵심 연구 목표
본 논문은 확산 모델의 노이즈 열화 과정과 스케일 공간 이론의 저역 통과 필터링이 공유하는 정보 계층 구조를 공식화하여 통합하는 것을 목표로 합니다. 완전히 노이즈가 있는 이미지가 저해상도 이미지와 동등한 정보를 가짐에도 불구하고 고해상도로 처리되는 비효율성을 해결하고, 이를 통해 확산 모델의 효율성을 개선하고자 합니다.

## 핵심 방법론
저자들은 일반화된 선형 열화(degradation)를 확산 과정에 통합하여 **Scale Space Diffusion (SSD)** 프레임워크를 제안합니다. 특히, 이미지 **리사이징(resize) 연산자 M_t** 를 선형 열화로 사용하여 스케일 공간을 확산 과정에 직접 반영합니다. 이 프레임워크를 구현하기 위해, 해상도 보존 및 해상도 증가 디노이징을 모두 지원하며 입력 해상도에 따라 네트워크의 관련 레이어 서브셋을 동적으로 활성화하는 새로운 UNet 변형인 **Flexi-UNet** 아키텍처를 도입합니다. 또한, 비등방성 가우시안 노이즈 샘플링을 위해 **Lanczos 알고리즘** 을 활용합니다.

## 주요 결과
**Scale Space Diffusion (SSD)** 은 CelebA 및 ImageNet 데이터셋에서 평가되었으며, 해상도 스케일링에 따라 상당한 효율성 향상을 보였습니다. CelebA-256 해상도에서 **SSD (6L) 모델** 은 baseline **DDPM** 대비 **훈련 시간을 절반 이하** 로 단축(42.88시간 vs 87.31시간)하고 **GFLOPs를 크게 감소** 시켰습니다. ImageNet-64 벤치마크에서는 **DDPM-e (FID 12.82)** 와 **SSD (2L) (FID 13.08)** 이 **비슷한 FID 성능** 을 달성했으며, **Flexi-UNet** 은 기존 **Full UNet** 보다 더 나은 FID와 빠른 추론 속도를 보였습니다.

## AI 실무자를 위한 시사점
**Scale Space Diffusion (SSD)** 은 확산 모델의 **훈련 및 추론 효율성** 을 크게 향상시킬 수 있는 실용적인 방법론을 제시하므로, 고해상도 이미지 생성 태스크에서 컴퓨팅 리소스가 제한된 환경에 유용합니다. **Flexi-UNet** 아키텍처는 다양한 해상도 입력 및 출력에 유연하게 대응하며, 복잡한 다중 스케일 확산 프로세스를 효율적으로 처리할 수 있는 **새로운 모델 설계 방식** 을 제공합니다. 또한, 비등방성 노이즈 샘플링의 중요성을 강조하여, 향후 확산 모델 설계 시 **노이즈 모델링의 정확성** 에 대한 고려를 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.