---
title: "[논문리뷰] LightCache: Memory-Efficient, Training-Free Acceleration for Video
  Generation"
excerpt: "Zheng Zhan이 arXiv에 게시한 'LightCache: Memory-Efficient, Training-Free Acceleration for Video
  Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Diffusion Models
  - Memory Efficiency
  - Inference Acceleration
  - Training-Free
  - Cache Mechanism
  - GPU Optimization

permalink: /ai/review/2025-10-8-LightCache-Memory-Efficient-Training-Free-Acceleration-for-Video-Generation/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05367)

**저자:** Yang Xiao, Gen Li, Kaiyuan Deng, Yushu Wu, Zheng Zhan, Bo Hui, Yanzhi Wang, Xiaolong Ma



## 핵심 연구 목표
본 논문은 확산 모델 기반 비디오 생성 과정에서 발생하는 **높은 GPU 메모리 사용량** 과 **긴 추론 시간** 문제를 해결하고자 합니다. 특히 기존 캐싱 기반 가속화 방법이 야기하는 **메모리 급증 현상** 을 극복하고, **모델 훈련 없이** 메모리 효율적인 가속화를 달성하여 실제 환경 배포의 제약을 완화하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 추론 과정을 인코딩, 디노이징, 디코딩 세 단계로 나누어 각 단계의 특성에 맞는 **메모리 최적화 전략** 을 제안합니다. 주요 방법론으로는 비활성 캐시된 특징 맵을 CPU로 옮겨 GPU 메모리 부담을 줄이는 **비동기 캐시 스와핑(Asynchronous Cache Swapping)** , 디노이징 단계에서 특징 맵의 **높이와 너비를 선택적으로 분할(Feature Chunk)** 하는 기법, 그리고 디코딩 단계에서 대규모 입력을 작은 배치로 분할하여 프레임별로 처리하는 **VAE 슬라이싱(Slicing Latents to Decode)** 이 있습니다.

## 주요 결과
제안된 **LightCache** 는 **AnimateDiff-Lightning** 에서 **1.59배의 속도 향상** 과 함께 **8.0 GB** 의 메모리 사용량 감소(13.562 GB에서 5.559 GB로)를 달성했습니다. **Stable-Video-Diffusion-Img2vid-XT** 에서는 **2.86배의 속도 향상** 과 **1.4 GB** 의 메모리 절감(15.346 GB에서 13.937 GB로)을 보여주었습니다. 이는 **DeepCache** 를 포함한 기존 방법론 대비 향상된 속도와 현저히 낮은 메모리 사용량을 제공하며, 품질 저하를 허용 가능한 범위 내로 유지합니다.

## AI 실무자를 위한 시사점
**LightCache** 는 **GPU 리소스가 제한적인 환경** 에서 고해상도 비디오 생성 모델을 효율적으로 운영해야 하는 AI/ML 엔지니어들에게 매우 실용적인 솔루션을 제공합니다. **모델을 재훈련할 필요 없이** 기존 확산 모델에 적용 가능하며, **DeepCache** 와 같은 캐싱 기반 가속화 기법의 고질적인 메모리 오버헤드 문제를 해결하는 효과적인 접근 방식을 제시합니다. 이는 **비디오 생성 모델의 실제 애플리케이션 확장성** 을 크게 향상시킬 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.