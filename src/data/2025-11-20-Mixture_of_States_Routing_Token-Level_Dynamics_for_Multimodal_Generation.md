---
title: "[논문리뷰] Mixture of States: Routing Token-Level Dynamics for Multimodal Generation"
excerpt: "이 [arXiv]에 게시한 'Mixture of States: Routing Token-Level Dynamics for Multimodal Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Diffusion
  - Mixture of States (MoS)
  - Token-Level Routing
  - Dynamic Conditional Fusion
  - Text-to-Image Generation
  - Image Editing
  - Transformer Architecture

permalink: /ai/review/2025-11-20-Mixture_of_States_Routing_Token-Level_Dynamics_for_Multimodal_Generation/

toc: true
toc_sticky: true

date: 2025-11-20 00:00:00+0900+0900
last_modified_at: 2025-11-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.12207)

**저자:** Haozhe Liu, Ding Liu, Mingchen Zhuge, Zijian Zhou, Tian Xie, Sen He, Yukang Yang, Shuming Liu, Yuren Cong, Jiadong Guo, Hongyu Xu, Ke Xu, Kam-Woh Ng, Juan C. Pérez, Juan-Manuel Pérez-Rúa, Tao Xiang, Wei Liu, Shikun Liu, Jürgen Schmidhuber



## 핵심 연구 목표
본 논문은 멀티모달 확산 모델에서 텍스트 및 시각 신호의 효과적인 정렬 문제를 해결하고자 합니다. 기존의 고정되거나 수작업으로 설계된 융합 방식의 한계를 극복하고, 유연하고 동적인 **상태 기반 상호작용**을 통해 토큰 수준의 특징을 확산 궤적과 정확하게 정렬하는 새로운 패러다임인 **Mixture of States (MoS)**를 제안하는 것을 목표로 합니다.

## 핵심 방법론
**MoS**는 이해(Understanding) 타워와 생성(Generation) 타워로 구성된 **듀얼-타워 아키텍처**를 사용합니다. 핵심은 학습 가능한 **토큰-수준 라우터(token-wise router)**가 **디노이징 스텝(denoising timestep)**, 노이즈가 추가된 이미지 임베딩, 컨텍스트 임베딩을 기반으로 모달리티 간의 히든 스테이트를 동적으로 선택하고 통합하는 것입니다. 이 라우터는 **경량 트랜스포머**이며, **e-greedy top-k 전략**(k=2, ε=0.05)으로 훈련되어 최소한의 오버헤드로 효율적이고 희소한 컨텍스트 특징 선택을 가능하게 합니다.

## 주요 결과
**MoS** 기반 모델은 텍스트-이미지 생성(MoS-Image) 및 이미지 편집(MoS-Edit) 태스크에서 **최첨단(state-of-the-art) 성능**을 달성했습니다. 특히, **5B 파라미터**의 **MoS-L** 모델은 최대 **4배 더 큰 20B 파라미터** 모델의 성능과 동등하거나 능가함을 입증했습니다. 라우터는 반복당 **0.008초**의 무시할 만한 계산 오버헤드를 발생시키며, **e-greedy 전략**은 학습 수렴을 가속화했습니다.

## AI 실무자를 위한 시사점
**MoS**는 기존 멀티모달 융합 방식의 비효율성을 극복하고 **동적이고 토큰 수준의 상호작용**을 통해 고품질의 시각적 콘텐츠를 생성하는 새로운 방법을 제시합니다. **비대칭 백본 아키텍처 지원**과 **경량 라우터**는 컴퓨팅 리소스가 제한된 환경에서도 **확장 가능하고 비용 효율적인** 멀티모달 모델 개발을 가능하게 합니다. 이러한 결과는 텍스트-이미지 생성 및 편집과 같은 다양한 AI 애플리케이션에 대한 강력한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.