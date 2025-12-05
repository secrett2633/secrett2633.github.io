---
title: "[논문리뷰] Generative Neural Video Compression via Video Diffusion Prior"
excerpt: "이 [arXiv]에 게시한 'Generative Neural Video Compression via Video Diffusion Prior' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Neural Video Compression
  - Diffusion Models
  - Generative Models
  - Video Compression
  - Temporal Coherence
  - Perceptual Quality
  - Flow Matching
  - Video Diffusion Transformer (VideoDiT)

permalink: /ai/review/2025-12-05-Generative-Neural-Video-Compression-via-Video-Diffusion-Prior/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.05016)

**저자:** Qi Mao, Hao Cheng, Tinghan Yang, Libiao Jin, Siwei Ma



## 핵심 연구 목표
본 논문은 기존 비디오 압축 방식이 초저비트레이트 환경에서 발생하는 흐릿함, 세부 정보 손실, 그리고 지각적 깜빡임(perceptual flickering) 문제를 해결하는 것을 목표로 합니다. 특히, 이미지 기반 생성형 모델을 활용한 이전 접근 방식의 프레임 단위 한계를 극복하고, **비디오 네이티브 확산 모델** 을 활용하여 시간적으로 일관되고 지각적으로 충실한 비디오 재구성을 달성하고자 합니다.

## 핵심 방법론
제안하는 **GNVC-VD** 는 **contextual transform codec** 를 통해 시공간 잠재 표현을 압축하고, 사전 훈련된 **VideoDiT(Video Diffusion Transformer)** 기반의 **flow-matching latent refinement module** 을 사용하여 시퀀스 레벨에서 잠재 표현을 개선합니다. 순수한 가우시안 노이즈 대신 디코딩된 시공간 잠재 표현에서 직접 정제를 시작하고, **압축 인식 조건부 어댑터(compression-aware conditioning adapter)** 를 통해 압축으로 인한 왜곡에 확산 모델을 적응시킵니다. 효과적인 학습을 위해 **잠재 레벨 정렬(latent-level alignment)** 과 **픽셀 레벨 미세 조정(pixel-level fine-tuning)** 의 두 단계 훈련 전략을 사용합니다.

## 주요 결과
**GNVC-VD** 는 UVG 데이터셋에서 왜곡 중심의 **DCVC-RT** 대비 DISTS에서 **98% 이상의 BD-rate 감소** 및 LPIPS에서 **56%의 BD-rate 감소** 를 달성했습니다. 또한, 기존 생성형 코덱인 **GLC-Video** 와 비교했을 때, DISTS에서 **86% BD-rate 감소** 및 LPIPS에서 **21% BD-rate 감소** 를 기록했습니다. 정성적 비교와 사용자 연구에서 **GNVC-VD** 는 기존 방식 대비 더 선명한 텍스처와 현저히 감소된 깜빡임, 강력한 시간적 일관성을 제공함을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **비디오 네이티브 확산 모델** 이 초저비트레이트 비디오 압축에서 지각 품질과 시간적 일관성을 혁신적으로 개선할 수 있음을 보여줍니다. AI 실무자들은 **DiT 기반의 시퀀스 레벨 생성형 정제** 방식이 미래 비디오 압축 시스템 설계의 핵심 요소가 될 수 있음을 인지해야 합니다. 특히, **flow-matching** 및 **압축 인식 조건부** 메커니즘은 다른 멀티미디어 압축 및 생성 태스크에도 적용될 수 있는 중요한 기술적 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.