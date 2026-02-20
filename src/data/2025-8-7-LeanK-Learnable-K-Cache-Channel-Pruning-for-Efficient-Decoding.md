---
title: "[논문리뷰] LeanK: Learnable K Cache Channel Pruning for Efficient Decoding"
excerpt: "Yuqing Yang이 arXiv에 게시한 'LeanK: Learnable K Cache Channel Pruning for Efficient Decoding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - KV Cache Optimization
  - Model Pruning
  - Efficient Decoding
  - Memory Optimization
  - Static Sparsity
  - Transformer

permalink: /ai/review/2025-8-7-LeanK-Learnable-K-Cache-Channel-Pruning-for-Efficient-Decoding/

toc: true
toc_sticky: true

date: 2025-08-07 13:38:21+0900
last_modified_at: 2025-08-07 13:38:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.02215)

**저자:** Yike Zhang, Zhiyuan He, Huiqiang Jiang, Chengruidong Zhang, Yuqing Yang, Jianyong Wang, Lili Qiu



## 핵심 연구 목표
대규모 언어 모델(LLMs)에서 증가하는 Key-Value(KV) 캐시 크기로 인한 GPU 메모리 사용량 증가와 느린 추론 속도 문제를 해결하는 것이 목표입니다. 특히 K 캐시의 채널 차원 내에 존재하는 활용되지 않는 희소성을 활용하여 불필요한 K 캐시 채널을 가지치기함으로써 효율적인 장문 컨텍스트 디코딩을 가능하게 하고자 합니다.

## 핵심 방법론
본 연구는 **LeanK** 라는 학습 기반 방법을 제안하며, K 캐시의 **정적 채널 희소성** 을 활용하여 불필요한 채널을 가지치기합니다. 이는 **두 단계의 학습 과정** 을 통해 이루어지는데, 첫 번째 단계에서는 각 K 채널의 전역 중요도를 나타내는 **연속적인 스케일링 팩터(α)** 를 학습합니다. 두 번째 단계에서는 학습된 스케일링 팩터를 대상 희소성 비율 및 하드웨어 정렬 요구사항을 준수하는 **이진 마스크(β)** 로 변환하여 배포에 적합하게 만듭니다.

## 주요 결과
**LeanK** 는 K 캐시 메모리를 약 **70%** , V 캐시 메모리를 **16%-18%** 까지 줄이는 데 성공했습니다. 또한, 맞춤형 디코딩 커널을 통해 어텐션 계산에서 **1.3배의 속도 향상** 을 달성했습니다. **Llama-3.1-8B-Instruct** 및 **Qwen2.5-7B-Instruct** 모델에서 70% 가지치기 비율에도 불구하고 **0.3%~3.1%** 의 미미한 성능 저하만을 보였으며, **KIVI 양자화** 와 결합 시 전체 KV 캐시 압축률을 **5.3배에서 9.7배** 로 향상시켰습니다.

## AI 실무자를 위한 시사점
**LeanK** 는 LLM의 장문 컨텍스트 추론 시 **GPU 메모리 사용량과 추론 지연 시간을 크게 줄여** AI/ML 엔지니어에게 실질적인 비용 절감 및 성능 향상 기회를 제공합니다. **정적 채널 희소성** 을 학습하고 적용하는 방식은 동적 가지치기 방법에 비해 런타임 오버헤드 없이 **일관된 성능 개선** 을 보장합니다. 또한, 기존의 KV 캐시 최적화 기법(예: 양자화, 제거)과 상호 운용 가능하여 **다중 최적화 전략을 결합** 하여 더 큰 효율성을 달성할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.