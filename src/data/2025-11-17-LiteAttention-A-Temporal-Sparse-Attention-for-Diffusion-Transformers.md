---
title: "[논문리뷰] LiteAttention: A Temporal Sparse Attention for Diffusion Transformers"
excerpt: "이 [arXiv]에 게시한 'LiteAttention: A Temporal Sparse Attention for Diffusion Transformers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Transformers
  - Sparse Attention
  - Temporal Coherence
  - Video Generation
  - Computational Efficiency
  - FlashAttention
  - CUDA Kernels

permalink: /ai/review/2025-11-17-LiteAttention-A-Temporal-Sparse-Attention-for-Diffusion-Transformers/

toc: true
toc_sticky: true

date: 2025-11-17 00:00:00+0900+0900
last_modified_at: 2025-11-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.11062)

**저자:** Dor Shmilovich, Tony Wu, Aviad Dahan, Yuval Domb



## 핵심 연구 목표
본 논문은 비디오 생성 Diffusion Transformers (DiT)의 **Quadratic attention complexity** 로 인한 과도한 지연 시간 문제를 해결하고자 합니다. 기존의 동적(dynamic) 또는 정적(static) 희소성(sparsity) 방법론의 한계를 극복하고, 어텐션 패턴의 **시간적 일관성(temporal coherence)** 을 활용하여 효율적이고 적응적인 연산 생략 기법을 제안하는 것이 목표입니다.

## 핵심 방법론
LiteAttention은 디노이징 단계 전반에 걸쳐 희소성 패턴의 **시간적 일관성** 을 활용하는 **evolutionary skip framework** 를 도입합니다. 초기 디노이징 단계에서 건너뛸 수 있는 타일들을 식별하고, 이 **skip decision** 들을 전체 궤적에 걸쳐 **전파(propagate)** 하여 반복적인 프로파일링 없이 **attention computation** 을 완전히 제거합니다. 이는 **FlashAttention** 기반의 최적화된 **LiteAttention 커널** 과 효율적인 **Skip-Mask** 및 **Skip-List** 구조를 통해 구현되며, **accumulated-error calibration** 으로 정확도를 유지합니다.

## 주요 결과
LiteAttention은 기존 **SparseVideoGen** 및 **RadialAttention** 대비 **최소 10% 더 큰 런타임 개선** 을 달성하면서도 **Full Attention (FA3)과 유사한 시각적 품질** 을 유지했습니다. 예를 들어, **Wan2.1-14B 모델** 에서 **902초** 의 런타임으로 FA3의 1707초, SVG의 1019초, Radial의 1192초보다 우수한 성능을 보였습니다. 또한, 모델의 복잡성은 **sub-quadratic** 하게 스케일되며, 런타임 감소는 건너뛴 연산량과 **거의 1대1로 비례** 함을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자에게 LiteAttention은 **비디오 Diffusion Transformers의 추론 속도를 획기적으로 향상** 시킬 수 있는 실용적인 방법론을 제공합니다. 기존 모델의 **재훈련이나 아키텍처 변경 없이** **FlashAttention 기반 커널** 에 쉽게 통합될 수 있어 도입 장벽이 낮습니다. 어텐션 희소성 패턴의 시간적 일관성이라는 새로운 관점은 다른 시퀀스 기반 생성 모델 최적화에도 중요한 시사점을 줄 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.