---
title: "[논문리뷰] MotionStream: Real-Time Video Generation with Interactive Motion
  Controls"
excerpt: "이 [arXiv]에 게시한 'MotionStream: Real-Time Video Generation with Interactive Motion
  Controls' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Real-Time Video Generation
  - Motion Control
  - Diffusion Models
  - Autoregressive Generation
  - Self-Forcing
  - Attention Sink
  - Streaming Inference
  - Video Distillation

permalink: /ai/review/2025-11-4-MotionStream-Real-Time-Video-Generation-with-Interactive-Motion-Controls/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01266)

**저자:** Joonghyuk Shin, Zhengqi Li, Richard Zhang, Jun-Yan Zhu, Jaesik Park, Eli Schechtman, Xun Huang



## 핵심 연구 목표
기존 모션 제어 비디오 생성 모델의 **높은 지연 시간(수분 소요)** 과 **비인과적 처리** 문제로 인한 실시간 상호작용 불가능성을 해결하고, **대화형 모션 제어** 를 통해 **실시간으로 무한 길이의 비디오 스트리밍 생성** 을 가능하게 하는 새로운 프레임워크를 제안하는 것입니다.

## 핵심 방법론
본 연구는 먼저 **경량 트랙 헤드** 와 **결합된 텍스트-모션 가이던스** 를 사용하여 **모션 제어 기능** 이 추가된 **양방향 비디오 Diffusion Teacher 모델** 을 훈련합니다. 이 Teacher 모델을 **Self Forcing-style DMD (Distribution Matching Distillation)** 를 통해 **인과적(Causal) Student 모델** 로 증류합니다. 특히, 훈련 과정에 **슬라이딩 윈도우 인과적 어텐션(Sliding-Window Causal Attention)** 과 **어텐션 싱크(Attention Sinks)** , **KV 캐시 롤링** 을 도입하여 추론 시 긴 시퀀스에서도 **일정한 속도와 안정성** 을 유지하도록 시뮬레이션합니다.

## 주요 결과
MotionStream은 단일 GPU에서 **최대 29.5 FPS** 의 스트리밍 비디오 생성을 **0.39초의 낮은 지연 시간** 으로 달성하여, 기존 모션 제어 비디오 Diffusion 모델보다 **두 자릿수 이상 빠릅니다** . 모션 전송 벤치마크(Sora Subset)에서 Causal (Wan 2.1-1.3B, 480P) 모델이 **16.7 FPS** , **PSNR 16.67** , **LPIPS 0.360** 을 기록했으며, 카메라 제어(LLFF Dataset)에서는 기존 3D 기반 모델보다 **20배 이상 빠른 성능** 을 보였습니다.

## AI 실무자를 위한 시사점
**실시간 대화형 비디오 생성** 의 가능성을 열어 AI/ML 엔지니어가 **사용자 인터랙션이 중요한 애플리케이션(예: 실시간 모션 전송, 드래그 제어, 카메라 제어)** 을 개발할 수 있게 합니다. 특히, **경량 트랙 표현 방식** 과 **Teacher-Student 증류 전략** , 그리고 **어텐션 싱크** 와 같은 효율적인 구조는 대규모 모델을 경량화하여 **단일 GPU 환경** 에서도 고성능을 발휘할 수 있음을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.