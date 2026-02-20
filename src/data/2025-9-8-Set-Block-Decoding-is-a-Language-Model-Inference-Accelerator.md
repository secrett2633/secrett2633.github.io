---
title: "[논문리뷰] Set Block Decoding is a Language Model Inference Accelerator"
excerpt: "Jeremy Reizenstein이 arXiv에 게시한 'Set Block Decoding is a Language Model Inference Accelerator' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Model Inference
  - Acceleration
  - Set Block Decoding
  - Next Token Prediction
  - Masked Token Prediction
  - Parallel Decoding
  - KV-caching
  - Diffusion Models

permalink: /ai/review/2025-9-8-Set-Block-Decoding-is-a-Language-Model-Inference-Accelerator/

toc: true
toc_sticky: true

date: 2025-09-08 13:10:18+0900
last_modified_at: 2025-09-08 13:10:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.04185)

**저자:** Itai Gat, Heli Ben-Hamu, Marton Havasi, Daniel Haziza, Jeremy Reizenstein, Gabriel Synnaeve, David Lopez-Paz, Brian Karrer, Yaron Lipman



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 추론, 특히 디코딩 단계에서 발생하는 높은 계산 및 메모리 비용 문제에 초점을 맞춥니다. 이러한 문제를 해결하여 LLM의 실용적인 배포를 가속화하고, **Next Token Prediction (NTP)** 과 **Masked Token Prediction (MATP)** 을 단일 아키텍처 내에 통합하는 유연한 패러다임인 **Set Block Decoding (SBD)** 을 제안합니다. 목표는 정확도 손실 없이 상당한 속도 향상을 달성하고, 기존 모델 아키텍처 변경이나 추가 훈련 하이퍼파라미터 없이도 **KV-caching** 과 호환되도록 하는 것입니다.

## 핵심 방법론
**Set Block Decoding (SBD)** 은 기존 **NTP Transformer 아키텍처** 를 미세 조정하여 **NTP** 와 **MATP** 를 동시에 지원합니다. 훈련 시에는 **k개의 미래 토큰 블록** 을 예측하도록 학습하며, 이 중 일부는 마스크 토큰('m')으로 가려집니다. 이때 이전 토큰에는 인과적 어텐션을, 미래 블록 내 토큰에는 양방향 어텐션을 적용합니다. 추론 단계에서는 **Entropy Bounded (EB) Sampler** 를 활용하여 순차적이지 않은 여러 미래 토큰을 병렬로 샘플링합니다. 이 방식은 **Llama-3.1 8B** 및 **Qwen-3 8B** 모델을 미세 조정하여 구현되었으며, 표준 **NTP** 훈련과 동일한 데이터 및 하이퍼파라미터를 사용했습니다.

## 주요 결과
**SBD** 는 **LiveCodeBench-V6** 를 포함한 다양한 벤치마크에서 기존 **NTP** 훈련과 동등한 성능(정확도)을 유지하면서, 생성에 필요한 **모델 포워드 패스(NFE) 수를 3-5배 감소** 시켰습니다. 예를 들어, **Llama-3.1 8B 모델** 에서는 **3.0x NFE 속도 향상** 을, **Qwen-3 8B 모델** 에서는 **3.2x NFE 속도 향상** 을 달성했습니다. 특히, **EB-Sampler** 의 **γ (감마) 하이퍼파라미터** 를 조절하여 속도-정확도 트레이드오프를 제어할 수 있음을 보여주었습니다. 또한, 훈련 시 **NTP 손실 항** 의 포함이 모델의 자기회귀(autoregressive) 능력 유지에 필수적임을 확인했습니다.

## AI 실무자를 위한 시사점
**SBD** 는 대규모 언어 모델의 추론 속도를 혁신적으로 가속화할 수 있는 실용적인 방법론을 제공합니다. 이는 복잡한 아키텍처 변경이나 추가적인 드래프트 모델 없이 기존 **NTP 모델** 을 효율적으로 활용하여 **3-5배의 포워드 패스 감소** 를 가능하게 합니다. 따라서 **LLM** 을 활용하는 실시간 애플리케이션의 지연 시간을 줄이고 처리량을 늘리는 데 크게 기여할 수 있습니다. 기존 모델의 **KV-caching** 호환성을 유지하며, 미세 조정을 통해 쉽게 통합될 수 있다는 점에서 실제 AI 시스템에 적용하기 용이합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.