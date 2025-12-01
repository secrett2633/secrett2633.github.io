---
title: "[논문리뷰] Foley Control: Aligning a Frozen Latent Text-to-Audio Model to Video"
excerpt: "이 [arXiv]에 게시한 'Foley Control: Aligning a Frozen Latent Text-to-Audio Model to Video' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Audio
  - Video-to-Audio
  - Foley Synthesis
  - Diffusion Models
  - Cross-Attention
  - Frozen Backbones
  - Video Embeddings
  - Rotary Position Embeddings

permalink: /ai/review/2025-10-27-Foley-Control-Aligning-a-Frozen-Latent-Text-to-Audio-Model-to-Video/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.21581)

**저자:** Ciara Rowles, Varun Jampani, Simon Donné, Shimon Vainer, Julian Parker, Zach Evans



## 핵심 연구 목표
본 논문은 사전 학습된 **텍스트-오디오(T2A) 모델** 을 동결시킨 상태에서, 비디오 가이드 **Foley 음향 합성** 을 위한 경량의 접근 방식을 제안합니다. 복잡한 멀티모달 시스템의 대규모 재학습 없이, **비디오 정보를 활용하여 오디오의 타이밍과 지역적 역학을 정교하게 제어** 하면서도 텍스트 프롬프트의 의미론적 제어 가능성을 유지하는 것을 목표로 합니다.

## 핵심 방법론
**V-JEPA2 비디오 임베딩** 을 동결된 **Stable Audio Open DiT 텍스트-오디오 모델** 에 연결하기 위해, 기존 텍스트 크로스-어텐션 이후에 **비디오 크로스-어텐션 레이어** 를 삽입합니다. 효율성을 위해 **비디오 토큰을 풀링** 하고, 시간적 정렬을 위해 **Rotary Position Embeddings (RoPE)** 를 사용합니다. 핵심 T2A 모델은 동결된 상태로 유지되며, 오직 이 **경량 비디오-오디오 브릿지** 의 파라미터만 학습합니다.

## 주요 결과
Foley Control은 **MovieGenBench 데이터셋** 에서 기존 멀티모달 시스템과 **경쟁력 있는 시간 및 의미론적 정렬** 을 달성하며, 훨씬 적은 학습 가능한 파라미터와 데이터 및 컴퓨팅 리소스를 사용했습니다. 특히, **MMAudio** 및 **HunyuanVideo-Foley** 와 비교하여 **거의 두 자릿수 낮은 데이터와 컴퓨팅 자원** 으로 유사한 성능을 보였으며, **KL-PANNs 지표** 에서 **단일 풀링 임베딩** 은 **그리드 기반 풀링** 과 유사하거나 약간 더 나은 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 프레임워크는 강력한 사전 학습 모델의 재활용을 통해 **V2A 시스템 구축의 실용성과 효율성** 을 크게 향상시킵니다. **모듈식 설계** 는 엔코더나 T2A 백본을 재훈련 없이 교체하거나 업그레이드할 수 있어, 변화하는 프로덕션 환경이나 제한된 컴퓨팅 자원에서 특히 유용합니다. 이는 **AI 모델의 확장성과 유지 보수성** 측면에서 중요한 가치를 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.