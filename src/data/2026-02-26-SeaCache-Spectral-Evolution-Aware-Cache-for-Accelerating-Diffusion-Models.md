---
title: "[논문리뷰] SeaCache: Spectral-Evolution-Aware Cache for Accelerating Diffusion Models"
excerpt: "Geonho Cha이 arXiv에 게시한 'SeaCache: Spectral-Evolution-Aware Cache for Accelerating Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Model Acceleration
  - Feature Caching
  - Spectral Analysis
  - Generative AI
  - Image Generation
  - Video Generation
  - Latency Reduction

permalink: /ai/review/2026-02-26-SeaCache-Spectral-Evolution-Aware-Cache-for-Accelerating-Diffusion-Models/

toc: true
toc_sticky: true

date: 2026-02-26 00:00:00+0900+0900
last_modified_at: 2026-02-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.18993)

**저자:** Jiwoo Chung, Sangeek Hyun, MinKyu Lee, Byeongju Han, Geonho Cha, et al.



## 핵심 연구 목표
확산 모델의 느린 추론 속도를 개선하기 위해 기존 캐싱 방법론이 **원시 특징(raw feature) 차이** 에만 의존하여 콘텐츠와 노이즈를 혼합하고, 이로 인해 **스펙트럼 진화(spectral evolution)** 를 간과하는 문제를 해결하고자 합니다. 본 연구는 스펙트럼 진화를 고려한 캐싱 스케줄을 통해 더 나은 **지연 시간-품질(latency-quality) 트레이드오프** 를 달성하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **Spectral-Evolution-Aware Cache (SeaCache)** 를 제안하며, 이는 **스펙트럼 진화 인식(Spectral-Evolution-Aware, SEA) 필터** 를 사용하여 캐싱 재사용 결정을 내립니다. 이 필터는 **최적 선형 디노이저** 의 **타임스텝 의존 주파수 응답(timestep-dependent frequency response)** 에 기반하여 콘텐츠 관련 요소를 보존하고 노이즈를 억제하며, **FFT 및 iFFT 변환** 과 **밀도 정규화(density normalization)** 를 통해 특징을 변환합니다. 변환된 **SEA 필터링된 입력 특징** 간의 L1 거리를 측정하여 동적으로 연산 스킵 여부를 결정합니다.

## 주요 결과
SeaCache는 **FLUX.1-dev (텍스트-이미지)** 모델에서 약 30% 캐시 비율 시, 기존 캐싱 방법론 대비 **PSNR이 20.762 dB에서 26.285 dB로 크게 향상** 되며 **가장 빠른 지연 시간** 을 달성했습니다. **HunyuanVideo 및 Wan2.1 1.3B (텍스트-비디오)** 모델에서도 **PSNR이 약 8 dB 증가** 하는 등 일관되게 우수한 지연 시간-품질 트레이드오프를 보였습니다. 또한, **SEA 필터** 는 다른 필터 변형 대비 최고의 성능을 보이며, **DiCache** 와 같은 다른 캐싱 방법론과 결합 시에도 성능을 향상시키는 **플러그 앤 플레이** 특성을 입증했습니다.

## AI 실무자를 위한 시사점
SeaCache는 **재학습 없이 확산 모델의 추론 속도를 크게 향상** 시키면서도 이미지/비디오 생성 품질을 유지하는 효과적인 방안을 제공합니다. 특히 **다양한 시각 생성 모델** 에 적용 가능하며, 실제 서비스에서 **사용자 경험 개선** 및 **운영 비용 절감** 에 기여할 수 있습니다. 스펙트럼 진화를 캐싱 설계에 통합하는 새로운 접근 방식은 향후 확산 모델 가속화 연구에 중요한 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.