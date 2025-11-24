---
title: "[논문리뷰] LongLive: Real-time Interactive Long Video Generation"
excerpt: "이 [arXiv]에 게시한 'LongLive: Real-time Interactive Long Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long Video Generation
  - Real-time
  - Interactive AI
  - Autoregressive Models
  - KV Cache
  - Streaming Tuning
  - Attention Sink
  - Diffusion Models

permalink: /ai/review/2025-9-29-LongLive-Real-time-Interactive-Long-Video-Generation/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22622)

**저자:** Shuai Yang, Wei Huang, Ruihang Chu, Yicheng Xiao, Yuyang Zhao, Xianbang Wang, Muyang Li, Enze Xie, Yingcong Chen, Yao Lu, Song Han, Yukang Chen



## 핵심 연구 목표
실시간 및 대화형으로 고품질의 긴 비디오를 생성하는 데 따르는 효율성, 일관성, 그리고 시맨틱 일관성 문제를 해결하는 것을 목표로 합니다. 특히, 프롬프트 전환 시 시각적 일관성과 동적 콘텐츠 생성을 위한 상호작용성 부족이라는 기존 AR 및 Diffusion 모델의 한계를 극복하고자 합니다.

## 핵심 방법론
`LONGLIVE`는 프레임 레벨의 **autoregressive (AR)** 설계를 채택하여 **KV 캐싱 메커니즘**을 활용합니다. 특히, 프롬프트 전환 시 **KV-recache 메커니즘**을 도입하여 이전 비디오와 새로운 프롬프트 임베딩을 결합해 캐시된 상태를 갱신함으로써 부드러운 전환을 가능하게 합니다. 긴 비디오 훈련을 위해 **streaming long tuning** 전략을 사용하고, 빠른 생성과 장거리 일관성을 위해 **short window attention**과 **frame-level attention sink**를 결합했습니다.

## 주요 결과
`LONGLIVE`는 **1.3B-파라미터** 모델을 **32 GPU-days** 만에 분 단위 비디오 생성에 파인튜닝했으며, 단일 **NVIDIA H100**에서 **20.7 FPS**의 실시간 추론 속도를 달성합니다. **VBench** 평가에서 단편 및 장편 비디오 모두에서 강력한 성능을 보였으며, 특히 30초 길이 비디오에서 **83.52의 Total Score**를 기록했습니다. 또한, **INT8 양자화**를 통해 모델 크기를 **1.9배 감소**시키고 처리량을 **1.3배 향상**시키면서도 품질 손실은 미미함을 입증했습니다.

## AI 실무자를 위한 시사점
`LONGLIVE`는 실시간 상호작용이 가능한 긴 비디오 생성 모델을 구축하려는 AI/ML 엔지니어에게 중요한 통찰력을 제공합니다. **KV-recache**, **streaming long tuning**, 그리고 **attention sink**와 같은 혁신적인 기술들은 대규모 AR 모델의 효율성과 장거리 일관성 문제를 해결하는 데 효과적인 패턴으로 활용될 수 있습니다. 특히, 적은 훈련 비용으로 기존 모델을 긴 비디오 생성에 활용하는 **LoRA 파인튜닝** 및 **INT8 양자화** 전략은 실제 서비스 환경에서의 배포 가능성을 높여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.