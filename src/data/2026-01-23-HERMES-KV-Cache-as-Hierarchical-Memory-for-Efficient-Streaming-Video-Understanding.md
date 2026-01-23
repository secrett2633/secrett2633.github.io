---
title: "[논문리뷰] HERMES: KV Cache as Hierarchical Memory for Efficient Streaming Video Understanding"
excerpt: "이 [arXiv]에 게시한 'HERMES: KV Cache as Hierarchical Memory for Efficient Streaming Video Understanding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Streaming Video Understanding
  - KV Cache Management
  - Hierarchical Memory
  - MLLMs
  - Low Latency
  - Training-free
  - Memory Efficiency

permalink: /ai/review/2026-01-23-HERMES-KV-Cache-as-Hierarchical-Memory-for-Efficient-Streaming-Video-Understanding/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.14724)

**저자:** Haowei Zhang, Shudong Yang, Jinlan Fu, See-Kiong Ng, Xipeng Qiu



## 핵심 연구 목표
기존 **Multimodal Large Language Models (MLLMs)** 이 스트리밍 비디오 이해에서 겪는 성능 불안정, 높은 응답 지연 시간, 높은 GPU 메모리 사용량 등의 문제를 해결하는 것을 목표로 합니다. 특히, 리소스 제약이 있는 환경에서 **훈련 없이** 실시간으로 정확하게 비디오 스트림을 이해하는 **HERMES** 라는 새로운 아키텍처를 제안합니다.

## 핵심 방법론
**HERMES** 는 기계적 어텐션 분석을 기반으로 **KV 캐시를 계층적 메모리 프레임워크** 로 개념화합니다. 이 프레임워크는 **계층적 KV 캐시 관리** , **교차 레이어 메모리 스무딩** , 그리고 **위치 재인덱싱** 세 가지 주요 구성 요소를 포함합니다. **계층적 관리** 는 shallow 레이어를 감각 메모리, deep 레이어를 장기 메모리, middle 레이어를 작업 메모리로 활용하여 각기 다른 방식으로 토큰의 중요도를 평가합니다. **교차 레이어 메모리 스무딩** 은 깊은 레이어에서 얕은 레이어로 중요도 신호를 전파하여 일관성을 확보하고, 폐기된 토큰은 **요약 토큰** 으로 집계하여 장기 정보를 보존합니다.

## 주요 결과
**HERMES** 는 기존 SOTA 방법론 대비 **Time to First Token (TTFT)을 10배 빠르게** 달성하며 ( **28ms** 대 **290ms** ), 비디오 토큰을 최대 **68%** 까지 줄임에도 불구하고 동등하거나 더 우수한 정확도를 보였습니다. 스트리밍 벤치마크에서는 **Qwen2.5-VL-7B** 기반으로 최대 **11.4%의 정확도 향상** (예: StreamingBench에서 **79.44%** 달성)을 기록했습니다. 또한, 입력 프레임 수가 증가하더라도 **일관되게 낮은 응답 지연 시간** 과 **안정적인 GPU 메모리 사용량** 을 유지하여 OOM 오류 없이 작동함을 입증했습니다.

## AI 실무자를 위한 시사점
**HERMES** 는 추가적인 훈련 없이 기존 MLLM에 쉽게 통합될 수 있어, **실시간 비디오 분석, 자율 주행, 스마트 감시 시스템** 과 같이 낮은 지연 시간과 효율적인 메모리 관리가 필수적인 AI 애플리케이션에 매우 유용합니다. 특히, **KV 캐시를 계층적 메모리 구조로 재해석** 하고 효율적으로 관리하는 방법론은 제한된 컴퓨팅 리소스로 대규모 스트리밍 데이터를 처리해야 하는 AI/ML 엔지니어들에게 실용적인 가이드라인을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.