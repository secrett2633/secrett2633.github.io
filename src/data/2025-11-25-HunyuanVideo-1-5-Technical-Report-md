---
title: "[논문리뷰] HunyuanVideo 1.5 Technical Report"
excerpt: "Fang Yang이 [arXiv]에 게시한 'HunyuanVideo 1.5 Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Diffusion Transformer
  - Sparse Attention
  - Super-Resolution
  - Open-Source
  - Multimodal Understanding
  - Training Optimization
  - Efficient Inference

permalink: /ai/review/2025-11-25-HunyuanVideo-1-5-Technical-Report/

toc: true
toc_sticky: true

date: 2025-11-25 00:00:00+0900+0900
last_modified_at: 2025-11-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.18870)

**저자:** Fang Yang, Duojun Huang, Changlin Li, Chang Zou, Bing Wu, et al.



## 핵심 연구 목표
경량화되면서도 강력한 오픈소스 비디오 생성 모델 **Hunyuan Video 1.5**를 개발하여, **8.3억** 파라미터로 최첨단 시각 품질과 움직임 일관성을 달성하고, 소비자용 GPU에서 효율적인 추론을 가능하게 하는 것을 목표로 합니다. 이를 통해 비디오 제작 및 연구의 진입 장벽을 낮추고 고급 비디오 생성을 더 많은 사용자에게 제공하고자 합니다.

## 핵심 방법론
본 모델은 초기 비디오 시퀀스를 생성하는 **Unified Diffusion Transformer (DiT)**와 출력을 **1080p**로 업스케일하는 **Video Super-Resolution Network**의 두 단계 파이프라인으로 구성됩니다. **Selective and Sliding Tile Attention (SSTA)** 메커니즘을 통해 불필요한 스페이시오템포럴 토큰을 제거하여 연산 오버헤드를 줄였으며, **Glyph-aware text encoding** 및 **Multimodal understanding**으로 이중 언어 이해를 강화했습니다. **Muon optimizer**와 다단계 점진적 학습 전략으로 훈련을 최적화했습니다.

## 주요 결과
**Hunyuan Video 1.5**는 **8.3억** 파라미터로 최첨단 성능을 달성하며, **SSTA** 적용 시 10초 길이 720p 비디오 생성에서 **FlashAttention-3** 대비 **1.87배**의 엔드-투-엔드 속도 향상을 보여주었습니다. 또한, 50 확산 단계 기준 720p, 241 프레임 비디오 생성 시 SSTA를 통해 추론 시간이 **96.78초**에서 **58.39초**로 단축되었습니다. 단일 소비자용 GPU(예: RTX 4090)에서 720p, 121 프레임 T2V/I2V 생성 시 최대 메모리 **13.6GB**를 요구하며 효율적인 자원 활용도를 보였습니다.

## AI 실무자를 위한 시사점
**Hunyuan Video 1.5**의 오픈소스 공개는 비디오 생성 분야의 연구 및 개발에 큰 기여를 할 것입니다. 특히, **소비자용 GPU**에서도 효율적인 추론이 가능하다는 점은 모델의 실제 적용 가능성을 높이며, **sparse attention**과 같은 최적화 기법은 장시간 비디오 생성의 효율성을 개선하는 데 중요한 참고 자료가 됩니다. **이중 언어 지원** 및 **강화된 텍스트 인코딩**은 다양한 언어 환경에서의 활용 가치를 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.