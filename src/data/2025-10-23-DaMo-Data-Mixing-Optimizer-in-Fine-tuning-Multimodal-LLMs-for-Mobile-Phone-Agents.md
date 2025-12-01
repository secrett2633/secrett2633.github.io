---
title: "[논문리뷰] DaMo: Data Mixing Optimizer in Fine-tuning Multimodal LLMs for Mobile
  Phone Agents"
excerpt: "이 [arXiv]에 게시한 'DaMo: Data Mixing Optimizer in Fine-tuning Multimodal LLMs for Mobile
  Phone Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Fine-tuning
  - Data Mixing Optimization
  - Mobile Phone Agents
  - Downstream Task Prediction
  - Benchmark
  - Neural Networks

permalink: /ai/review/2025-10-23-DaMo-Data-Mixing-Optimizer-in-Fine-tuning-Multimodal-LLMs-for-Mobile-Phone-Agents/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.19336)

**저자:** Kai Shi*, Jun Yang*, Ni Yang*, Binqiang Pan, Qingsong Xie†, Chao Zhang, Zhenyu Yang, Tianhuang Su, Haonan Lu



## 핵심 연구 목표
본 논문은 Multimodal Large Language Models (MLLMs)의 다중 작업 지도 미세 조정(SFT)에서 최적의 데이터 혼합 전략을 찾아 성능을 극대화하는 문제를 해결합니다. 특히, 모바일 폰 에이전트(MPA)의 다양한 기능을 동시에 처리하는 MLLM의 효율성을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **DaMo (Data Mixture Optimizer)** 라는 새로운 솔루션을 제안했습니다. 이는 **학습 가능한 신경망(MLP)** 을 사용하여 주어진 데이터 비율에 대한 다운스트림 작업 성능을 예측하여 최적의 데이터 혼합을 결정합니다. 또한, MLLM을 모바일 폰 작업에 평가하기 위한 최초의 전문 벤치마크인 **PhoneAgentBench** 를 도입했습니다.

## 주요 결과
DaMo는 소규모 파일럿 실험에서 **R2=0.81** 의 강력한 예측 능력을 보여주었으며, PhoneAgentBench에서 다른 방법론 대비 **3.38%의 성능 향상** 을 달성했습니다. 또한, BFCL-v3, MME-Reasoning, MME-Perception, OCRBench 등 기존 벤치마크 전반에 걸쳐 평균 점수에서 **2.57% 더 우수한 일반화 성능** 을 보였습니다.

## AI 실무자를 위한 시사점
DaMo는 MLLM 미세 조정에서 데이터 혼합을 최적화하는 효율적인 방법을 제공하여 개발자들이 비용이 많이 드는 수동 반복 없이도 모델 성능을 향상시킬 수 있도록 돕습니다. **PhoneAgentBench** 는 모바일 에이전트 개발에 필수적인 실제 산업 시나리오에 특화된 평가 기준을 제공합니다. 이는 **다양한 MLLM 아키텍처에 대한 DaMo의 강력한 확장성(Pearson 상관관계 0.75~0.95)** 을 통해 폭넓게 적용 가능함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.