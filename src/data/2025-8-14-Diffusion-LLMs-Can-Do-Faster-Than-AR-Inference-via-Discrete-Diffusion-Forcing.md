---
title: "[논문리뷰] Diffusion LLMs Can Do Faster-Than-AR Inference via Discrete Diffusion
  Forcing"
excerpt: "Hao Zhang이 [arXiv]에 게시한 'Diffusion LLMs Can Do Faster-Than-AR Inference via Discrete Diffusion
  Forcing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion LLMs
  - Faster Inference
  - Discrete Diffusion Forcing (D2F)
  - Autoregressive Generation
  - KV Cache Optimization
  - Parallel Decoding
  - Text Generation
  - Model Distillation

permalink: /ai/review/2025-8-14-Diffusion-LLMs-Can-Do-Faster-Than-AR-Inference-via-Discrete-Diffusion-Forcing/

toc: true
toc_sticky: true

date: 2025-08-14 13:19:02+0900
last_modified_at: 2025-08-14 13:19:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.09192)

**저자:** Xu Wang, Chenkai Xu, Yijie Jin, Jiachun Jin, Hao Zhang, Zhijie Deng



## 핵심 연구 목표
본 논문은 기존 오픈소스 Diffusion Large Language Models (dLLMs)가 Autoregressive (AR) LLMs에 비해 추론 속도에서 우위를 점하지 못하는 문제를 해결하는 것을 목표로 합니다. 특히, dLLMs의 병렬 디코딩 잠재력을 활용하여 AR LLMs보다 빠른 추론 속도를 달성하고, 동시 출력 품질을 유지하고자 합니다.

## 핵심 방법론
제안된 **Discrete Diffusion Forcing (D2F)** 는 dLLMs에 **블록 단위 AR 생성** 과 **블록 간 병렬 디코딩** 기능을 부여합니다. 이는 **블록별 인과적 어텐션 마스크** 를 사용하여 **KV 캐시** 를 효율적으로 활용하며, 이전 블록의 완료를 기다리지 않고 다음 토큰을 예측합니다. 또한, 사전 훈련된 dLLMs로부터 **비대칭 증류 과정** 을 통해 **D2F dLLMs** 를 학습시키고, 효율성-효과성 트레이드오프를 관리하는 **파이프라인 병렬 디코딩 알고리즘** 을 도입했습니다.

## 주요 결과
**D2F dLLMs** 는 **GSM8K** 벤치마크에서 **LLaMA3** 및 **Qwen2.5** 대비 **2.5배 이상 빠른 추론 속도** 를 달성했습니다. 특히 **D2F-Dream-Base-7B** 는 **GSM8K** 에서 **119.9 토큰/초** 를 기록했으며, **LLaDA** 및 **Dream** 과 같은 바닐라 dLLMs에 비해 **50배 이상** 가속화되면서도 유사한 출력 품질을 유지했습니다. **HumanEval** 에서는 **1.6배** 더 빠른 속도를 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **dLLMs가 AR LLMs보다 빠른 추론 속도를 달성할 수 있음** 을 최초로 입증하여, **dLLMs의 실용적인 적용 가능성** 을 크게 확장했습니다. 특히 **실시간 대화 시스템** 이나 **대규모 텍스트 생성 작업** 에서 처리량 개선을 통해 운영 비용을 절감할 수 있는 잠재력을 제공합니다. 기존 **사전 훈련된 dLLMs를 활용한 증류 방식** 은 새로운 모델 개발 없이도 성능 향상을 꾀할 수 있는 실용적인 방법론을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.