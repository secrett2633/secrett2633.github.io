---
title: "[논문리뷰] Optimal Brain Restoration for Joint Quantization and Sparsification of
  LLMs"
excerpt: "Luca Benini이 [arXiv]에 게시한 'Optimal Brain Restoration for Joint Quantization and Sparsification of
  LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Compression
  - Quantization
  - Sparsification
  - Post-training Quantization
  - Hessian-based Optimization
  - Error Compensation
  - Low-bit LLMs

permalink: /ai/review/2025-9-17-Optimal-Brain-Restoration-for-Joint-Quantization-and-Sparsification-of-LLMs/

toc: true
toc_sticky: true

date: 2025-09-17 13:16:01+0900
last_modified_at: 2025-09-17 13:16:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.11177)

**저자:** Hang Guo, Yawei Li, Luca Benini



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)의 효율적인 배포를 위해 **양자화(Quantization)**와 **희소화(Sparsification)**를 동시에 적용하는 새로운 압축 방법을 제안합니다. 특히, 양자화가 요구하는 **좁고 균일한 가중치 분포**와 희소화가 요구하는 **넓은 가중치 분포** 간의 내재적 충돌을 해결하고, 다운스트림 태스크의 성능 저하를 최소화하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **Optimal Brain Restoration (OBR)** 프레임워크는 가중치 섭동으로 인한 성능 저하를 최소화하기 위해 **2차 Hessian 목적 함수**를 공식화합니다. 이 목적 함수는 **row-wise decoupling**을 통해 단순화되고, **그룹 오류 보상(group error compensation)**을 통해 희소화와 양자화로 인한 오류를 재분배하여 **닫힌 형태(closed-form solution)**로 최적의 보상을 계산합니다. OBR은 **pruning-then-quantization** 순서를 따르며, 주로 **Hadamard 회전**이 적용된 가중치에 작동합니다.

## 주요 결과
OBR은 기존 LLM에 **W4A4KV4 양자화**와 **50% 희소성**을 성공적으로 적용하여 **FP16-dense 기준** 대비 최대 **4.72배 속도 향상**과 **6.4배 메모리 절감**을 달성했습니다. 특히, **Llama2-70B** 모델에서 전체 정밀도 모델과의 perplexity 격차를 **1.37**로 좁혔으며, **SparseGPT+GPTQ**와 같은 강력한 기존 기준선을 일관되게 능가하는 성능을 보였습니다.

## AI 실무자를 위한 시사점
OBR은 **추가 재훈련 없이** 강력한 LLM 압축을 가능하게 하는 **훈련 없는(training-free) 사후 훈련 프레임워크**를 제공합니다. 이는 특히 **자원 제약적인 엣지 디바이스**에 LLM을 배포하는 AI/ML 엔지니어들에게 상당한 **속도 향상**과 **메모리 절감** 이점을 제공합니다. 또한, 기존 프루닝 및 양자화 기법과 함께 유연하게 적용될 수 있는 **일반적인 보상 메커니즘**을 제시하여 다양한 LLM 압축 시나리오에 활용 가능합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.