---
title: "[논문리뷰] LazyDrag: Enabling Stable Drag-Based Editing on Multi-Modal Diffusion
  Transformers via Explicit Correspondence"
excerpt: "Lionel M. Ni이 [arXiv]에 게시한 'LazyDrag: Enabling Stable Drag-Based Editing on Multi-Modal Diffusion
  Transformers via Explicit Correspondence' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Editing
  - Diffusion Models
  - Multi-Modal Transformers
  - Drag-based Editing
  - Explicit Correspondence
  - Attention Control
  - Identity Preservation
  - Training-Free

permalink: /ai/review/2025-9-16-LazyDrag_Enabling_Stable_Drag-Based_Editing_on_Multi-Modal_Diffusion_Transformers_via_Explicit_Correspondence/

toc: true
toc_sticky: true

date: 2025-09-16 13:16:41+0900
last_modified_at: 2025-09-16 13:16:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.12203)

**저자:** Zixin Yin, Xili Dai, Duomin Wang, Xianfang Zeng, Lionel M. Ni, Gang Yu, Heung-Yeung Shum



## 핵심 연구 목표
본 논문은 드래그 기반 이미지 편집에서 **Multi-Modal Diffusion Transformers (MM-DiTs)**의 불안정성을 해결하고, 기존 방식의 암묵적 점 매칭 및 **Test-Time Optimization (TTO)** 또는 약화된 인버전 강도 의존성으로 인한 한계를 극복하는 것을 목표로 합니다. 이를 통해 모델의 생성 능력을 저해하지 않으면서 안정적이고 고품질의 드래그 기반 편집을 가능하게 하고자 합니다.

## 핵심 방법론
LazyDrag는 사용자 드래그 입력으로부터 **명시적 대응 맵(explicit correspondence map)**을 생성하여 **MM-DiTs**의 어텐션 제어를 강화합니다. 이 맵을 통해 **완전한 인버전 강도(full-strength inversion)**를 유지하면서 **TTO 없이** 안정적인 편집을 구현하며, **두 부분으로 구성된 어텐션 제어**를 사용합니다. **키(K)와 값(V) 토큰을 소스 토큰과 연결**하여 아이덴티티를 보존하고, 어텐션 출력은 명시적 맵에 기반한 **게이팅된 블렌딩(gated blending)**으로 정제됩니다.

## 주요 결과
LazyDrag는 **DragBench** 벤치마크에서 **Test-Time Optimization (TTO)** 없이 **state-of-the-art (SOTA)** 성능을 달성했습니다. 특히, 드래그 정확도(**MD↓ 21.49**)와 지각 품질(**PQ↑ 8.395**, **SC↑ 8.205**, **O↑ 8.210**)에서 모든 기존 기준 모델들을 능가했습니다. 사용자 연구에서는 참가자의 **61.88%**가 LazyDrag의 결과를 선호했으며, 이는 드래그 정확도와 지각 품질 측면에서 우수함을 입증합니다.

## AI 실무자를 위한 시사점
이 연구는 **드래그 기반 이미지 편집**에서 **Multi-Modal Diffusion Transformers**의 잠재력을 최대한 활용할 수 있는 **안정적이고 학습이 필요 없는(training-free)** 방법을 제시합니다. AI 엔지니어는 LazyDrag를 활용하여 복잡한 지오메트리 제어와 텍스트 기반 가이던스를 통합한 **고품질의 인페인팅 및 시맨틱 편집**을 수행할 수 있습니다. 이는 기존에 달성하기 어려웠던 개 입 벌리기, 테니스 공 추가 등과 같은 정교한 작업을 가능하게 하여 AI 기반 창작 워크플로우를 크게 개선할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.