---
title: "[논문리뷰] MoGA: Mixture-of-Groups Attention for End-to-End Long Video Generation"
excerpt: "이 [arXiv]에 게시한 'MoGA: Mixture-of-Groups Attention for End-to-End Long Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long Video Generation
  - Sparse Attention
  - Diffusion Transformers
  - Mixture-of-Groups Attention
  - Token Routing
  - Computational Efficiency
  - Context Length

permalink: /ai/review/2025-10-22-MoGA-Mixture-of-Groups-Attention-for-End-to-End-Long-Video-Generation/

toc: true
toc_sticky: true

date: 2025-10-22 13:07:20+0900
last_modified_at: 2025-10-22 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.18692)

**저자:** Weinan Jia, Yuning Lu, Mengqi Huang, Hualiang Wang, Binyuan Huang, Nan Chen, Mu Liu, Jidong Jiang, Zhendong Mao



## 핵심 연구 목표
본 논문은 Diffusion Transformers (DiTs) 기반의 긴 비디오 생성에서 발생하는 **전체 어텐션의 2차 시간 복잡도 문제**를 해결하고자 합니다. 기존의 sparse attention 방법론들이 블록 크기에 의해 효율성과 정확도 간의 trade-off가 제약되는 한계를 극복하고, 장거리 상호작용에 효과적인 end-to-end 비디오 생성 모델을 목표로 합니다.

## 핵심 방법론
제안하는 **Mixture-of-Groups Attention (MoGA)**은 가벼운 **학습 가능한 토큰 라우터(단일 선형 레이어)**를 사용하여 토큰들을 의미론적으로 응집된 그룹에 정밀하게 할당합니다. 각 그룹 내에서는 **FlashAttention**과 같은 현대 어텐션 커널을 활용하여 전체 어텐션을 수행하며, **spatiotemporal window attention (STGA)**과 결합하여 지역적 연속성과 장거리 일관성을 모두 확보합니다. 또한, 라우터가 특정 그룹으로 토큰을 편향되게 할당하는 것을 방지하기 위해 **그룹 밸런싱 손실 (Lgb)**을 도입하였습니다.

## 주요 결과
MoGA는 30초 비디오 생성 시 **전체 어텐션의 6.94 PFLOPs** 대비 **2.26 PFLOPs (MoGA M=5)**로 연산량을 크게 줄여 **1.7배의 학습 및 추론 속도 향상**을 달성했습니다. 본 모델은 약 **580k 토큰의 컨텍스트 길이**로 분 단위, 멀티샷, **480p 해상도 24fps** 비디오를 생성할 수 있습니다. 다양한 비디오 생성 태스크에서 SOTA sparse attention 및 멀티샷 모델 대비 **일관된 성능 향상**을 보였으며, 특히 **71.25%의 높은 희소성**에도 불구하고 기존 full attention 모델과 유사하거나 더 나은 성능을 기록했습니다.

## AI 실무자를 위한 시사점
MoGA는 **대규모 Diffusion Transformers**를 활용한 긴 비디오 생성의 **주요 연산 및 메모리 병목 현상**을 해결하는 실용적인 방법을 제시합니다. **학습 가능한 토큰 라우팅** 접근 방식은 어텐션 메커니즘의 효율성을 획기적으로 개선하며, **FlashAttention 및 시퀀스 병렬화**와의 호환성을 통해 기존 딥러닝 인프라에 쉽게 통합될 수 있습니다. 이를 통해 **일관된 캐릭터 및 배경 유지**와 같은 실제 비디오 생성 모델의 핵심 과제를 해결하여, 보다 현실적이고 편집 가능한 장편 비디오 콘텐츠 생성을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.