---
title: "[논문리뷰] Steering One-Step Diffusion Model with Fidelity-Rich Decoder for Fast
  Image Compression"
excerpt: "Yifei Ji이 [arXiv]에 게시한 'Steering One-Step Diffusion Model with Fidelity-Rich Decoder for Fast
  Image Compression' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Compression
  - Diffusion Models
  - One-Step Decoding
  - Fidelity Guidance
  - Rate Annealing
  - VAE
  - Perceptual Quality

permalink: /ai/review/2025-8-8-Steering-One-Step-Diffusion-Model-with-Fidelity-Rich-Decoder-for-Fast-Image-Compression/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.04979)

**저자:** Zheng Chen, Mingde Zhou, Jinpei Guo, Jiale Yuan, Yifei Ji, Yulun Zhang



## 핵심 연구 목표
본 논문은 확산 기반 이미지 압축 모델의 주요 단점인 **과도한 디코딩 지연 시간** 과 **낮은 충실도(fidelity)** 문제를 해결하고자 합니다. 특히 낮은 비트레이트 환경에서 높은 지각 품질과 빠른 디코딩 속도, 원본에 충실한 재구성을 동시에 달성하는 **단일 스텝 확산 이미지 압축 모델(SODEC)** 을 제안하는 것이 목표입니다.

## 핵심 방법론
제안된 **SODEC** 는 정보가 풍부한 잠재 공간을 위해 **사전 훈련된 VAE 기반 모델** 을 활용하고, 반복적인 디노이징 과정을 **단일 스텝 디코딩** 으로 대체하여 속도를 향상시킵니다. 충실도 개선을 위해 **Fidelity Guidance Module** 을 도입하여, VAE 모델이 생성한 고충실도 예비 재구성 이미지를 확산 모델의 조건부 가이드로 활용합니다. 또한, **Rate Annealing Training Strategy** 라는 3단계 학습 전략을 통해 매우 낮은 비트레이트에서도 효과적으로 학습하도록 합니다.

## 주요 결과
**SODEC** 는 DIV2K-Val 데이터셋에서 **DiffEIC** 대비 **38배 빠른 디코딩 속도(230ms vs 8,821ms)** 를 달성하며, **가장 낮은 LPIPS 값** 으로 최고의 지각 품질을 보였습니다. 정량적 평가에서 기존 확산 기반 압축 모델인 PerCo 및 DiffEIC를 포함한 모든 최신 모델보다 **MS-SSIM, LPIPS, DISTS 등** 전반적인 지표에서 우수한 성능을 보였습니다. Fidelity Guidance Module은 MS-SSIM을 **0.8212에서 0.8481** 로 크게 향상시키며 재구성 충실도 개선에 기여했습니다.

## AI 실무자를 위한 시사점
기존 확산 모델의 **높은 추론 비용 문제** 를 단일 스텝 디코딩으로 해결하여 **실시간 이미지 압축** 및 배포가 필요한 서비스에 SODEC를 적용할 가능성을 열었습니다. **fidelity guidance** 와 **rate annealing** 학습 전략은 저비트레이트 환경에서 이미지 품질과 충실도를 동시에 확보해야 하는 AI 모델 개발에 유용한 설계 패턴을 제공합니다. 이는 특히 **대규모 데이터셋** 없이도 효율적인 압축 모델을 구축하는 데 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.