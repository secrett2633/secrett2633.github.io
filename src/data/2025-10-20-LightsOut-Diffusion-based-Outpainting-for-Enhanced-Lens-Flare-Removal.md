---
title: "[논문리뷰] LightsOut: Diffusion-based Outpainting for Enhanced Lens Flare Removal"
excerpt: "arXiv에 게시된 'LightsOut: Diffusion-based Outpainting for Enhanced Lens Flare Removal' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Lens Flare Removal
  - Diffusion Models
  - Image Outpainting
  - Deep Learning
  - Image Restoration
  - Preprocessing
  - LoRA

permalink: /ai/review/2025-10-20-LightsOut-Diffusion-based-Outpainting-for-Enhanced-Lens-Flare-Removal/

toc: true
toc_sticky: true

date: 2025-10-20 13:04:24+0900
last_modified_at: 2025-10-20 13:04:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15868)

**저자:** Shr-Ruei Tsai, Wei-Cheng Chang, Jie-Ying Lee, Chih-Hai Su, Yu-Lun Liu



## 핵심 연구 목표
본 연구는 불완전하거나 프레임 외부의 광원이 존재할 때 기존 **단일 이미지 플레어 제거(SIFR) 모델** 의 성능이 저하되는 문제를 해결하고자 합니다. 완전한 광원 정보를 재구성함으로써 SIFR 모델의 성능을 크게 향상시키고 시각적 사실성을 높이는 것을 목표로 합니다.

## 핵심 방법론
제안하는 LightsOut은 세 단계 파이프라인으로 구성됩니다. 첫째, **다중 작업 회귀 모듈** 을 통해 프레임 외부 광원의 위치, 반경, 신뢰도를 예측하여 **광원 마스크** 를 생성합니다. 둘째, 이 마스크를 조건으로 **LoRA로 미세 조정된 Stable Diffusion v2 인페인팅 모델** 을 사용하여 누락된 광원과 플레어 아티팩트를 아웃페인팅합니다. 마지막으로, 생성된 이미지를 기존 SIFR 모델에 입력하여 플레어 제거 성능을 향상시킵니다.

## 주요 결과
LightsOut은 기존 SIFR 모델의 성능을 일관되게 향상시키는 것으로 나타났습니다. 특히, 광원 없는 실제 이미지에 대해 Flare7K++ [13] 모델의 PSNR을 **26.29dB에서 28.41dB로** 끌어올렸습니다. 광원 예측을 위한 다중 작업 회귀 모듈은 mIoU **0.6310(실제)** 및 **0.6619(합성)** 로, 기존 U-Net 대비 우수한 성능을 보였습니다.

## AI 실무자를 위한 시사점
LightsOut은 기존 SIFR 모델에 추가적인 재훈련 없이 적용 가능한 **플러그 앤 플레이(plug-and-play) 전처리 솔루션** 을 제공합니다. 이는 **Diffusion 모델** 과 **LoRA 미세 조정** 을 활용하여 복잡한 이미지 복원 문제를 해결하는 효과적인 방법론을 제시하며, **물리적 일관성을 유지하는 이미지 합성** 의 중요성을 강조합니다. 이 접근 방식은 객체 탐지와 같은 **다운스트림 컴퓨터 비전 태스크** 의 성능 향상에도 기여할 수 있지만, 아웃페인팅 단계 추가로 인한 **계산 오버헤드** 는 고려해야 할 실용적 문제입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.