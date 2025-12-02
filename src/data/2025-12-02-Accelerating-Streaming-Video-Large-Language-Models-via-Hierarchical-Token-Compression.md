---
title: "[논문리뷰] Accelerating Streaming Video Large Language Models via Hierarchical Token Compression"
excerpt: "이 [arXiv]에 게시한 'Accelerating Streaming Video Large Language Models via Hierarchical Token Compression' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Streaming Video LLMs
  - Token Compression
  - ViT Encoding
  - LLM Prefilling
  - Causal Compression
  - Caching
  - Pruning
  - Low-latency

permalink: /ai/review/2025-12-02-Accelerating-Streaming-Video-Large-Language-Models-via-Hierarchical-Token-Compression/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.00891)

**저자:** Yiyu Wang, Xuyang Liu, Xiyan Gui, Xinying Lin, Boxue Yang, Chenfei Liao, Tailai Chen, Linfeng Zhang



## 핵심 연구 목표
스트리밍 비디오 대규모 언어 모델(VideoLLMs)의 실시간 배포 시 발생하는 높은 연산 비용, 특히 **Vision Transformer(ViT) 인코딩 단계** 와 **LLM 사전 채우기(pre-filling) 단계** 의 병목 현상을 해결하여 효율적인 비디오 이해를 가속화하는 것이 목표입니다. 기존 압축 방법들이 스트리밍 시나리오의 인과적 제약(causal constraints)을 고려하지 못하거나 특정 단계만 최적화하는 한계를 극복하고자 합니다.

## 핵심 방법론
본 연구는 **Streaming Token Compression (STC)** 이라는 플러그-앤-플레이 계층적 프레임워크를 제안합니다. STC는 두 가지 모듈로 구성됩니다. 첫째, **STC-Cacher** 는 시간적으로 유사한 프레임의 시각적 특징을 캐싱하고 재사용하여 **ViT 인코딩 오버헤드** 를 줄입니다. 둘째, **STC-Pruner** 는 비전 인코더 이후 시각적 토큰 시퀀스를 압축하며, **Temporal Context Anchor (TCA)** 와 **Spatial Context Anchor (SCA)** 를 활용한 **듀얼-앵커 프루닝(dual-anchor pruning)** 전략으로 가장 중요한 토큰만을 보존하여 LLM 사전 채우기 지연 시간을 줄입니다.

## 주요 결과
**STC** 는 **ReKV 프레임워크** 에서 최대 **99%의 정확도** 를 유지하면서 **ViT 인코딩 지연 시간을 24.5%** , **LLM 사전 채우기 지연 시간을 45.3%** 감소시켰습니다. 또한, **OVO-Bench** 및 **StreamingBench** 벤치마크에서 기존 최첨단 방법인 **VidCom²** 대비 성능을 각각 **1.6%** 향상시키는 등 다른 압축 방법보다 뛰어난 성능-효율성 트레이드오프를 입증했습니다.

## AI 실무자를 위한 시사점
**STC** 는 기존 스트리밍 **VideoLLM** 에 **재훈련 없이** 쉽게 통합 가능한 플러그-앤-플레이 솔루션을 제공하여, 지연 시간에 민감한 애플리케이션에서 실시간 비디오 이해를 위한 실용적인 배포 가능성을 높입니다. **ViT 인코딩** 과 **LLM 사전 채우기** 라는 주요 병목 지점을 동시에 최적화함으로써, AI 엔지니어가 효율적인 시스템을 구축하는 데 중요한 기반 기술을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.