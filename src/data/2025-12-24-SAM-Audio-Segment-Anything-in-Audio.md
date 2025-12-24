---
title: "[논문리뷰] SAM Audio: Segment Anything in Audio"
excerpt: "이 [arXiv]에 게시한 'SAM Audio: Segment Anything in Audio' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio Source Separation
  - Foundation Models
  - Multimodal Prompting
  - Diffusion Transformers
  - Flow Matching
  - Self-Supervised Learning
  - Reference-Free Evaluation
  - Audio-Visual Learning

permalink: /ai/review/2025-12-24-SAM-Audio-Segment-Anything-in-Audio/

toc: true
toc_sticky: true

date: 2025-12-24 00:00:00+0900+0900
last_modified_at: 2025-12-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.18099)

**저자:** Bowen Shi, Andros Tjandra, John Hoffman, Helin Wang, Yi-Chiao Wu, Luya Gao, Julius Richter, Matt Le, Apoorv Vyas, Sanyuan Chen, Christoph Feichtenhofer, Piotr Dollár, Wei-Ning Hsu, Ann Lee (Meta Superintelligence Labs)



## 핵심 연구 목표
본 논문은 기존의 도메인 특화되거나 단일 모달 프롬프트에 한정된 오디오 분리 모델의 한계를 극복하고자 합니다. 텍스트, 시각, 시간 스팬 프롬프팅을 단일 프레임워크 내에서 통합하여 일반 오디오 분리를 위한 **범용 파운데이션 모델** 을 개발하는 것을 목표로 합니다. 또한, 현실 세계의 오디오에 대한 통일된 벤치마크와 신뢰할 수 있는 참조 없는 평가 모델의 부재를 해결합니다.

## 핵심 방법론
이 모델은 **Diffusion Transformer** 아키텍처를 기반으로 하며, **Flow matching** 을 사용하여 대규모 음성, 음악, 일반 사운드 혼합 데이터로 훈련됩니다. **DAC-VAE** 잠재 공간에서 타겟 및 잔여 오디오를 동시에 생성하며, **Text Encoder (T5-base)** , **Video Encoder (Perception Encoder)** , **Span Encoder** 를 통해 멀티모달 프롬프트를 처리합니다. **Pseudo-labeling 데이터 생성 파이프라인** 을 통해 고품질의 학습 데이터를 확장하고, **SAM AUDIO-BENCH** 라는 새로운 멀티모달 벤치마크 및 **SAM Audio Judge** 라는 참조 없는 평가 모델을 제시합니다.

## 주요 결과
**SAM AUDIO** 는 일반 사운드, 음성, 음악, 악기 분리 등 다양한 벤치마크에서 **최첨단 성능** 을 달성했습니다. 텍스트 프롬프트 기반 분리에서 SoloAudio 대비 **약 36%의 순 승률 (net win rate)** 을 보였으며, 스피커 분리에서는 AudioShake 대비 **약 39%의 순 승률 개선** 을 이루었습니다. 시각 프롬프트 기반 분리에서는 DAVIS-Flow 대비 **5%에서 48%까지 순 승률이 개선** 되었고, **SAM Audio Judge** 는 인간의 지각적 판단과 **PCC 0.883 (음성)** 로 높은 상관관계를 보였습니다.

## AI 실무자를 위한 시사점
**SAM AUDIO** 는 멀티모달 프롬프트(텍스트, 시각, 시간 스팬)를 통합하여 실제 환경의 복잡한 오디오 분리 태스크에 유연하게 적용될 수 있는 강력한 기반 모델을 제공합니다. 특히 **대규모 의사-레이블링 데이터** 와 **Flow matching** 의 결합은 복잡한 사운드스케이프에서 효과적인 분리를 가능하게 합니다. **SAM Audio Judge** 는 참조 없이 분리 품질을 평가할 수 있는 신뢰할 수 있는 도구를 제공하여, AI/ML 엔지니어들이 실제 애플리케이션에서 모델 성능을 객관적으로 평가하고 개선하는 데 실질적인 도움을 줄 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.