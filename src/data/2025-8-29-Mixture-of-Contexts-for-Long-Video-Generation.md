---
title: "[논문리뷰] Mixture of Contexts for Long Video Generation"
excerpt: "Junfei Xiao이 [arXiv]에 게시한 'Mixture of Contexts for Long Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long Video Generation
  - Diffusion Transformers (DiT)
  - Sparse Attention
  - Context Routing
  - Memory Management
  - Generative Models
  - Video Synthesis

permalink: /ai/review/2025-8-29-Mixture-of-Contexts-for-Long-Video-Generation/

toc: true
toc_sticky: true

date: 2025-08-29 13:14:44+0900
last_modified_at: 2025-08-29 13:14:44+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21058)

**저자:** Shengqu Cai, Ceyuan Yang, Lvmin Zhang, Yuwei Guo, Junfei Xiao, Ziyan Yang, Yinghao Xu, Zhenheng Yang, Alan Yuille, Leonidas Guibas, Maneesh Agrawala, Lu Jiang, Gordon Wetzstein



## 핵심 연구 목표
본 논문은 Diffusion Transformer (DiT) 기반의 장시간 비디오 생성 모델에서 발생하는 **quadratic cost의 self-attention** 문제로 인한 연산 및 메모리 비효율성을 해결하고, 모델이 긴 시퀀스에 걸쳐 **일관된 장기 기억** 을 유지하면서 표류하거나 붕괴되지 않도록 하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 장시간 비디오 생성을 **내부 정보 검색 태스크** 로 재정의하고, 학습 가능한 희소 어텐션 라우팅 모듈인 **Mixture of Contexts (MoC)** 를 제안합니다. MoC는 토큰 스트림을 **콘텐츠 정렬 청크** 로 분할한 후, 각 쿼리가 **파라미터 없는 학습 가능한 top-k 라우터** 를 통해 몇 개의 정보성 청크와 **필수 앵커(캡션, 지역 윈도우)** 를 동적으로 선택하도록 합니다. **인과적 라우팅 마스크** 를 적용하여 루프 클로저를 방지하고, **Flash-Attention 커널** 을 활용하여 효율적인 처리를 구현합니다.

## 주요 결과
**MoC** 는 토큰 쌍의 **85% 이상** 을 가지치기하고, 어텐션 FLOPS를 최대 **7배** 까지 감소시켜 분 단위 길이 시퀀스(약 **180k 토큰** )에서 **2.2배** 의 종단 간 생성 속도 향상을 달성했습니다. 싱글 샷 비디오 생성에서 **83%의 희소성** 에도 불구하고 Subject Consistency **0.9398** , Background Consistency **0.9670** 로 기본 모델과 동등하거나 우수한 성능을 보였고, 멀티 샷 비디오 생성에서는 **85% 희소성** 하에 Dynamic Degree를 **0.4583에서 0.5625** 로 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
본 연구는 **quadratic attention 병목 현상** 을 해결하여, 분 단위 길이의 비디오 생성을 단시간 비디오 생성 비용에 준하는 수준으로 실용화할 수 있는 길을 열었습니다. 이는 AI/ML 엔지니어가 **확장 가능하고 제어 가능한 장시간 비디오 생성 모델** 을 개발하는 데 중요한 기반을 제공합니다. 또한, **MoC** 가 다른 사전 훈련된 백본에도 적용 가능하며 **제로샷 환경** 에서도 일관성을 유지함을 보여 확장성과 범용성을 입증했습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.