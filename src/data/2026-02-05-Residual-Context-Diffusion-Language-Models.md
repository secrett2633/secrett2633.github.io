---
title: "[논문리뷰] Residual Context Diffusion Language Models"
excerpt: "arXiv에 게시된 'Residual Context Diffusion Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - Residual Learning
  - Context Aggregation
  - Parallel Decoding
  - Masked Denoising
  - Reasoning Benchmarks
  - Entropy Weighting

permalink: /ai/review/2026-02-05-Residual-Context-Diffusion-Language-Models/

toc: true
toc_sticky: true

date: 2026-02-05 00:00:00+0900+0900
last_modified_at: 2026-02-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.22954)

**저자:** Yuezhou Hu, Harman Singh, Monishwaran Maheswaran, Haocheng Xi, Coleman Hooper, Jintao Zhang, Aditya Tomar, Michael W. Mahoney, Sewon Min, Mehrdad Farajtabar, Kurt Keutzer, Amir Gholami, Chenfeng Xu



## 핵심 연구 목표
Diffusion Large Language Models (dLLMs)가 병렬 디코딩의 잠재력에도 불구하고, 낮은 신뢰도의 토큰을 폐기하여 계산을 낭비하고 추론 정확도가 Autoregressive (AR) 모델에 뒤처지는 문제를 해결하고자 합니다. 본 연구는 모든 디노이징 단계에서 발생하는 정보 손실을 최소화하여 dLLM의 성능을 극대화하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 폐기된 토큰 표현을 컨텍스트 잔차로 변환하고 다음 디노이징 단계에 재주입하는 **Residual Context Diffusion (RCD)** 모듈을 제안합니다. 특히, 토큰의 확률 분포에 기반한 **엔트로피 가중 집계(entropy-based aggregation)** 를 사용하여 잔차 정보의 기여도를 동적으로 조절합니다. 메모리 병목 현상을 우회하기 위해 **두 단계 훈련 파이프라인(Reference Model 및 Target Model)** 을 사용하여 안정적인 잔차 신호를 제공합니다.

## 주요 결과
RCD는 **GSM8K 및 MATH500** 과 같은 벤치마크에서 기존 dLLM 대비 **5-10%의 정확도 향상** 을 일관되게 달성했습니다. 특히, 가장 도전적인 **AIME24/25** 태스크에서는 기준선 정확도를 거의 **2배 가까이 향상** 시켰으며, 동등한 정확도 수준에서 **4-5배 더 적은 디노이징 단계** 만을 필요로 합니다. 이는 **처리량(Tokens per Second)을 유지** 하면서 우수한 Accuracy-Latency 트레이드오프를 제공합니다.

## AI 실무자를 위한 시사점
RCD는 dLLM의 **계산 효율성을 높이면서 추론 정확도를 크게 개선** 할 수 있는 실용적인 방법론을 제시합니다. 특히 복잡한 추론 문제 해결에 있어 **적은 계산량으로 높은 정확도를 달성** 하여 실제 AI 애플리케이션에 유용하며, 기존 **사전 훈련된 dLLM을 효율적으로 RCD 패러다임으로 전환** 할 수 있어 활용성이 높습니다. **엔트로피 가중치 및 두 단계 학습 파이프라인** 은 안정적인 학습과 효과적인 컨텍스트 활용을 위한 중요한 기술적 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.