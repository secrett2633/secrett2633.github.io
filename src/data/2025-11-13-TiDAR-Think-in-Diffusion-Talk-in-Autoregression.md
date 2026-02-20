---
title: "[논문리뷰] TiDAR: Think in Diffusion, Talk in Autoregression"
excerpt: "arXiv에 게시된 'TiDAR: Think in Diffusion, Talk in Autoregression' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Hybrid LLM Architecture
  - Diffusion-Autoregressive
  - Parallel Token Generation
  - Speculative Decoding
  - Structured Attention Masks
  - LLM Inference Acceleration
  - KV Cache

permalink: /ai/review/2025-11-13-TiDAR-Think-in-Diffusion-Talk-in-Autoregression/

toc: true
toc_sticky: true

date: 2025-11-13 00:00:00+0900+0900
last_modified_at: 2025-11-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.08923)

**저자:** Jingyu Liu, Xin Dong, Zhifan Ye, Rishabh Mehta, Yonggan Fu, Vartika Singh, Jan Kautz, Ce Zhang, Pavlo Molchanov



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM)의 생성 과정에서 **확산 모델(Diffusion Models)** 의 빠른 병렬 생성 능력과 **자기회귀(Autoregressive, AR) 모델** 의 높은 품질을 동시에 달성하는 것을 목표로 합니다. 기존 **추측성 디코딩(Speculative Decoding)** 방법론의 비효율성과 확산 모델의 품질 저하 문제를 해결하며, **높은 GPU 활용률** 과 AR 수준의 품질을 제공하는 하이브리드 아키텍처를 제안합니다.

## 핵심 방법론
제안하는 **TiDAR** 는 토큰을 **확산(Diffusion)** 방식으로 병렬적으로 초안(Thinking)하고, **자기회귀(Autoregression)** 방식으로 최종 출력을 샘플링(Talking)하는 시퀀스 레벨 하이브리드 아키텍처입니다. 이 모든 과정은 **특수 설계된 구조화된 어텐션 마스크** 를 사용하여 단일 순방향(forward) 패스 내에서 이루어집니다. 훈련 시 확산 부분의 모든 토큰을 마스크 처리하여 손실 신호를 강화하고, **정확한 KV 캐시 지원** 을 통해 효율성을 극대화합니다.

## 주요 결과
TiDAR는 AR 모델에 필적하는 품질을 유지하면서 처리량을 크게 개선했습니다. 특히, **TiDAR 1.5B** 모델은 AR 대비 **4.71배** 높은 처리량(토큰/초)을 달성했으며, **TiDAR 8B** 모델은 **5.91배** 의 처리량 향상을 보였습니다. 이는 Dream 및 Llada와 같은 기존 확산 모델과 **EAGLE-3** 와 같은 추측성 디코딩 방법론보다 효율성과 품질 면에서 우수함을 입증합니다.

## AI 실무자를 위한 시사점
TiDAR는 고품질과 고속 생성이 동시에 요구되는 **대기 시간 민감형 애플리케이션** 에 대한 실용적인 솔루션을 제공합니다. 단일 모델 내에서 확산과 자기회귀의 장점을 결합하여 **별도의 드래프트 모델 없이** 효율적인 추론이 가능하며, 이는 LLM 아키텍처 및 추론 최적화의 새로운 연구 방향을 제시합니다. **GPU의 "무료 토큰 슬롯"** 을 효과적으로 활용하여 비용 효율적인 성능 향상을 기대할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.