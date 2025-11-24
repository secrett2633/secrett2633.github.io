---
title: "[논문리뷰] Mitigating Attention Sinks and Massive Activations in Audio-Visual
  Speech Recognition with LLMS"
excerpt: "이 [arXiv]에 게시한 'Mitigating Attention Sinks and Massive Activations in Audio-Visual
  Speech Recognition with LLMS' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio-Visual Speech Recognition
  - Large Language Models
  - Attention Sinks
  - Massive Activations
  - Decorrelation Loss
  - Fine-tuning
  - Multimodal AI

permalink: /ai/review/2025-10-28-Mitigating-Attention-Sinks-and-Massive-Activations-in-Audio-Visual-Speech-Recognition-with-LLMS/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.22603)

**저자:** Anand, Umberto Cappellazzo, Stavros Petridis, Maja Pantic



## 핵심 연구 목표
본 연구는 멀티모달 LLM 기반 음성 인식(ASR, VSR, AVSR) 모델에서 발생하는 **attention sink** 및 **massive activation** 현상을 최초로 분석하고, 이들이 모델 성능에 미치는 영향을 이해하며, 효과적인 완화 전략을 개발하는 것을 목표로 합니다. 특히, 이러한 현상이 **BOS 토큰**뿐만 아니라 **중간 토큰**에서도 발생하는 원인을 규명하고 성능 개선을 시도합니다.

## 핵심 방법론
연구는 **Llama-AVSR [8]** 아키텍처를 기반으로 attention sink와 massive activation의 존재를 확인하고, massive activation이 트랜스포머 블록의 **MLP 컴포넌트**에서 시작되며, BOS 토큰과 중간 sink 토큰 간의 **높은 코사인 유사도**가 주요 원인임을 발견했습니다. 이를 해결하기 위해 **BOS 토큰과 다른 토큰 간의 코사인 유사도를 감소**시키는 **decorrelation loss (L_decorr)**를 제안하고, 이를 표준 **교차 엔트로피 손실(L_CE)**과 결합하여 **LoRA 기반 파인튜닝**에 적용했습니다.

## 주요 결과
제안된 **decorrelation loss**는 중간 attention sink와 massive activation을 효과적으로 완화하며, 특히 **높은 압축률 환경**에서 **ASR, VSR, AVSR** 태스크의 WER(Word Error Rate) 성능을 크게 향상시켰습니다. 예를 들어, **ASR(32) 설정에서 WER은 12.92%에서 11.50%로 1.42% 개선**되었고, **VSR(5)에서는 45.19%에서 34.08%로 11.11% 개선**, **AVSR(16,5)에서는 4.15%에서 3.72%로 0.43% 개선**되었습니다. 이는 기존의 **Attention Calibration (ACT)**보다 우수한 결과를 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 멀티모달 LLM의 내부 동작 메커니즘에 대한 중요한 통찰력을 제공하여 **모델의 견고성 및 성능 향상**에 기여합니다. 특히, **모델 아키텍처 변경 없이 간단한 손실 함수 추가**만으로 높은 압축률 환경에서 성능을 개선할 수 있어 **자원 제약이 있는 환경**에서의 AI 모델 배포에 실용적인 가치를 제공합니다. 제안된 **decorrelation loss**는 효과적이면서도 **계산 오버헤드가 적어** 기존 LoRA 기반 파인튜닝 파이프라인에 쉽게 통합될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.