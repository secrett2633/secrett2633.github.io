---
title: "[논문리뷰] Memory-V2V: Augmenting Video-to-Video Diffusion Models with Memory"
excerpt: "이 [arXiv]에 게시한 'Memory-V2V: Augmenting Video-to-Video Diffusion Models with Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video-to-Video Diffusion
  - Explicit Memory
  - Multi-turn Video Editing
  - Cross-consistency
  - Dynamic Tokenization
  - Adaptive Token Merging
  - Video Novel View Synthesis
  - Text-guided Video Editing

permalink: /ai/review/2026-01-26-Memory-V2V-Augmenting-Video-to-Video-Diffusion-Models-with-Memory/

toc: true
toc_sticky: true

date: 2026-01-26 00:00:00+0900+0900
last_modified_at: 2026-01-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.16296)

**저자:** Dohun Lee, Chun-Hao Paul Huang, Xuelin Chen, Jong Chul Ye, Duygu Ceylan, Hyeonho Jeong



## 핵심 연구 목표
본 논문은 반복적인 비디오 편집 과정에서 기존 **Video-to-Video (V2V) Diffusion 모델** 들이 순차적인 편집 간의 **일관성(cross-consistency)** 을 유지하지 못하는 문제를 해결하는 것을 목표로 합니다. 사용자 피드백 기반의 다중 턴 비디오 편집 워크플로우를 지원하기 위해, 모델에 **명시적인 시각적 기억(explicit visual memory)** 을 부여하여 이전에 편집된 비디오들과 일관성을 유지하는 프레임워크를 제안합니다.

## 핵심 방법론
제안하는 **Memory-V2V** 프레임워크는 외부 캐시의 과거 편집 비디오들을 활용하며, 이를 위해 효율적인 **태스크별 검색 메커니즘** 과 **학습 가능한 동적 토크나이저** 를 도입합니다. 동적 토크나이저는 비디오 관련성에 따라 **1x2x2, 1x4x4, 1x8x8** 등의 다양한 커널 크기로 토큰을 할당하고, **어텐션 기반 반응성 점수** 를 통해 덜 중요한 토큰들을 **DiT 백본의 블록 10과 20** 에서 **적응적으로 병합** 하여 계산 효율성을 높입니다.

## 주요 결과
**Memory-V2V** 는 비디오 신규 시점 합성 및 텍스트 기반 장편 비디오 편집 두 가지 태스크에서 강력한 **교차-반복 일관성** 을 달성했습니다. 특히, 기존 베이스라인 대비 **30% 이상의 연산량 감소** 와 함께 시각적 품질을 유지하거나 향상시켰습니다. 비디오 신규 시점 합성에서는 베이스라인 대비 **Multi-view Consistency** 를 크게 개선했으며(예: **0.1168** vs **0.1875** ), 텍스트 기반 편집에서는 **Subject Consistency 0.9326** , **DINO-F 0.8019** , **CLIP-F 0.8741** 등의 지표에서 우수함을 입증했습니다.

## AI 실무자를 위한 시사점
**Memory-V2V** 는 실제 비디오 편집 워크플로우에서 필수적인 **다중 턴 일관성** 문제를 해결하는 실용적인 솔루션을 제공합니다. 기존 V2V 모델에 **명시적 기억** 을 효율적으로 통합하는 방법을 제시하며, **동적 토큰화** 및 **적응형 토큰 병합** 전략을 통해 대규모 비디오 처리의 연산 부담을 크게 줄일 수 있음을 보여주었습니다. 이는 향후 **대화형(interactive) 및 기억 기반 비디오 편집 도구** 개발에 중요한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.