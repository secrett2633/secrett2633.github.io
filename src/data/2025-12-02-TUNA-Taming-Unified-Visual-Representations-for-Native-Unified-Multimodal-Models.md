---
title: "[논문리뷰] TUNA: Taming Unified Visual Representations for Native Unified Multimodal Models"
excerpt: "이 [arXiv]에 게시한 'TUNA: Taming Unified Visual Representations for Native Unified Multimodal Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Unified Multimodal Models
  - Visual Representation
  - VAE
  - Flow Matching
  - Multimodal Understanding
  - Multimodal Generation
  - Image Editing
  - State-of-the-Art

permalink: /ai/review/2025-12-02-TUNA-Taming-Unified-Visual-Representations-for-Native-Unified-Multimodal-Models/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.02014)

**저자:** Zhiheng Liu, Weiming Ren, Haozhe Liu, Zijian Zhou, Shoufa Chen, Haonan Qiu, Xiaoke Huang, Zhaochong An, Fanny Yang, Aditya Patel, Viktar Atliha, Tony Ng, Xiao Han, Chuyan Zhu, Chenyang Zhang, Ding Liu, Juan-Manuel Perez-Rua, Sen He, Jürgen Schmidhuber, Wenhu Chen, Ping Luo, Wei Liu, Tao Xiang, Jonas Schult, Yuren Cong



## 핵심 연구 목표
논문은 멀티모달 이해와 생성 태스크를 단일 프레임워크 내에서 원활하게 수행하는 `TUNA`라는 **네이티브 통합 멀티모달 모델(UMM)** 을 개발하는 것을 목표로 합니다. 기존 UMM의 **분리된 또는 편향된 시각 표현 방식** 으로 인한 한계를 극복하고, 이해와 생성 모두에 효과적인 **통합된 연속 시각 표현 공간** 을 구축하고자 합니다.

## 핵심 방법론
`TUNA`는 **VAE 인코더** 와 **표현 인코더** 를 계층적으로 연결하여 통합 시각 표현을 구성합니다. 이 표현은 텍스트 토큰과 결합되어 **LLM 디코더(Qwen-2.5)** 에 의해 처리되며, 디코더는 이해 태스크를 위해 **자동회귀 텍스트 생성** 을, 생성 태스크(이미지/비디오 생성 및 편집)를 위해 **플로우 매칭 기반 시각 생성** 을 수행합니다. 모델은 **3단계 훈련 전략** 을 통해 점진적으로 이해 및 생성 태스크에 적응하며, 특히 VAE 잠재 공간에서 **강력한 사전 훈련된 SigLIP 2 표현 인코더** 를 사용하여 고수준의 의미론적 특징을 추출합니다.

## 주요 결과
`TUNA`는 다양한 멀티모달 이해 및 생성 벤치마크에서 **최첨단 성능(SOTA)** 을 달성했습니다. 멀티모달 이해에서 **MMStar 벤치마크에서 61.2%** 를, `GenEval`에서 **0.90** 을 기록했습니다. 이미지 생성에서는 `Janus-Pro`, `BAGEL`, `Mogao`와 같은 기존 모델들을 일관적으로 능가했으며, 특히 `OneIG-Bench`에서 **텍스트 렌더링 품질** 에서 상당한 우위를 보였습니다. 이미지 편집 태스크에서는 `ImgEdit-Bench`에서 **종합 점수 4.31** 을 기록하여 모든 UMM 중 최고 순위를 차지했습니다.

## AI 실무자를 위한 시사점
`TUNA`는 **통합된 시각 표현** 을 통해 멀티모달 이해, 생성, 편집을 단일 모델로 처리하는 효율적인 방법을 제시합니다. 이는 AI 엔지니어가 **여러 태스크를 위한 별도의 모델을 구축할 필요 없이** `TUNA`와 같은 통합 아키텍처를 활용하여 개발 복잡성과 비용을 줄일 수 있음을 의미합니다. 또한, **강력한 사전 훈련된 표현 인코더의 중요성** 을 강조하여, 실무에서 모델의 기반이 되는 인코더 선택에 신중을 기해야 함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.