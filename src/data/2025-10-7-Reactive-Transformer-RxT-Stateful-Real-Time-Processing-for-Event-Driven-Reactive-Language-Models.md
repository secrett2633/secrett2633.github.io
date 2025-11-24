---
title: "[논문리뷰] Reactive Transformer (RxT) -- Stateful Real-Time Processing for
  Event-Driven Reactive Language Models"
excerpt: "이 [arXiv]에 게시한 'Reactive Transformer (RxT) -- Stateful Real-Time Processing for
  Event-Driven Reactive Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reactive Transformer
  - Stateful LLM
  - Event-Driven AI
  - Asynchronous Memory
  - Conversational AI
  - Linear Scaling
  - Short-Term Memory (STM)
  - Memory Attention

permalink: /ai/review/2025-10-7-Reactive-Transformer-RxT-Stateful-Real-Time-Processing-for-Event-Driven-Reactive-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03561)

**저자:** Adam Filipek



## 핵심 연구 목표
이 논문은 기존 **Large Language Model (LLM)**의 **stateless** 특성과 **quadratic한 계산 복잡성(O(L²))**이 긴 대화에서 발생하는 비효율성(높은 비용, 지연 시간)을 해결하는 것을 목표로 합니다. 궁극적으로 **실시간(real-time), stateful, 이벤트 중심(event-driven)**의 대화형 AI를 위한 새로운 아키텍처를 제안하여 선형적 비용 스케일링을 가능하게 하고 지속적인 대화 맥락 유지 능력을 강화하고자 합니다.

## 핵심 방법론
논문은 대화 턴을 **이벤트(event)**로 처리하는 **Reactive Transformer (RxT)** 아키텍처를 소개합니다. RxT는 응답 생성과 메모리 업데이트를 분리하는 **비동기적(asynchronous) 운영 주기**를 가지며, **Generator-Decoder**가 현재 쿼리와 이전 **Short-Term Memory (STM)** 상태를 기반으로 응답을 생성합니다. 이후 **Memory Encoder**와 전용 **Memory Attention Network**가 전체 상호작용(**query + response**)을 비동기적으로 **STM**에 통합하고 업데이트하며, 다양한 **Memory Attention Variants (Simple, Self, Interlayer, Gated)**와 **Residual Gates**를 통해 메모리 관리를 최적화합니다.

## 주요 결과
RxT는 대화 턴 수에 따른 총 사용자 비용을 **O(N²·T)**에서 **O(N·T)**로 **선형적으로 감소**시켰습니다. 또한, 참조 **LLM**이 대화 단계에 따라 **0.09초에서 0.22초**로 지연 시간이 증가하는 것과 달리, RxT는 모든 단계에서 **약 0.06초**의 **거의 일정한 프롬프트 위상 지연 시간**을 유지했습니다. **RxT-Alpha Nano (12M 파라미터)** 모델은 **22M LLM Baseline**보다 높은 **2.74**의 **Perplexity (PPL)**를 달성하여 우수한 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**RxT**는 장기적이고 복잡한 대화 시스템을 구축하는 **AI 실무자**에게 중요한 해결책을 제시합니다. **선형적 비용 스케일링**과 **일정한 저지연 시간**은 대화형 AI 애플리케이션의 경제성과 실시간 상호작용을 가능하게 합니다. 특히, **비동기 메모리 업데이트**는 사용자 경험을 크게 향상시킬 수 있으며, 모델이 대화 맥락을 보다 효율적이고 일관성 있게 유지하도록 돕습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.