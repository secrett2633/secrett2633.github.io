---
title: "[논문리뷰] HiStream: Efficient High-Resolution Video Generation via Redundancy-Eliminated Streaming"
excerpt: "arXiv에 게시된 'HiStream: Efficient High-Resolution Video Generation via Redundancy-Eliminated Streaming' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - High-Resolution Video Generation
  - Diffusion Models
  - Autoregressive
  - Efficiency
  - Caching
  - Attention Mechanisms
  - Video Streaming
  - Temporal Consistency

permalink: /ai/review/2025-12-25-HiStream-Efficient-High-Resolution-Video-Generation-via-Redundancy-Eliminated-Streaming/

toc: true
toc_sticky: true

date: 2025-12-25 00:00:00+0900+0900
last_modified_at: 2025-12-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.21338)

**저자:** Haonan Qiu, Shikun Liu, Zijian Zhou, Zhaochong An, Weiming Ren, Zhiheng Liu, Jonas Schult, Sen He, Shoufa Chen, Yuren Cong, Tao Xiang, Ziwei Liu, Juan-Manuel Perez-Rua



## 핵심 연구 목표
고해상도 비디오 생성은 확산 모델의 **제곱 복잡도** 로 인해 계산적으로 병목 현상이 발생하여 실용적인 추론이 불가능하다는 문제를 해결하고자 합니다. 이 연구는 공간, 시간, 타임스텝 축 전반의 중복성을 체계적으로 줄이는 효율적인 **자기회귀(autoregressive) 프레임워크** 를 개발하여 고해상도 비디오 생성을 실용적이고 확장 가능하게 만드는 것을 목표로 합니다.

## 핵심 방법론
이 논문은 세 가지 주요 최적화 기법을 제안합니다. 첫째, **Dual-Resolution Caching (DRC)** 을 통해 저해상도에서 전역 구조를 파악한 후 캐시된 특징을 사용하여 고해상도 디테일을 정제하여 공간적 중복성을 줄입니다. 둘째, **Anchor-Guided Sliding Window (AGSW)** 는 첫 프레임을 고정된 "앵커"로 사용하고 인접 프레임 캐시를 활용하여 일정한 추론 속도를 유지하며 시간적 중복성을 줄입니다. 셋째, **Asymmetric Denoising Strategy** (HiStream+에서 적용)는 초기 청크에만 전체 디노이징 스텝을 적용하고, 후속 청크에는 더 적은 스텝을 적용하여 타임스텝 중복성을 최적화합니다.

## 주요 결과
기본 **HiStream 모델** 은 1080p 벤치마크에서 기존 **Wan2.1 baseline** 대비 **76.2배 더 빠른 디노이징** 속도(36.56초 → 0.48초/프레임)를 달성하며 최고 수준의 시각적 품질을 유지합니다. 더 빠른 변형인 **HiStream+** 는 **107.5배 가속** (0.34초/프레임)을 이루어 속도와 품질 간의 강력한 절충점을 제공합니다. 사용자 선호도 연구에서 HiStream은 비디오 품질, 의미론적 정렬, 세부 표현력에서 가장 높은 선호도(각각 **73.41%** , **70.24%** , **75.79%** )를 받았습니다.

## AI 실무자를 위한 시사점
HiStream은 고해상도 비디오 생성의 **실용적 적용 가능성** 을 크게 높입니다. 특히, **고정 크기 캐시(AGSW)** 와 **단계적 디노이징(DRC)** 접근 방식은 긴 길이의 비디오 생성에서도 **안정적인 추론 속도** 를 보장하여 확장 가능한 서비스 개발에 기여할 수 있습니다. **VAE 디코더** 와 **훈련 메모리** 가 새로운 병목으로 지적된 점은 향후 연구 및 최적화 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.