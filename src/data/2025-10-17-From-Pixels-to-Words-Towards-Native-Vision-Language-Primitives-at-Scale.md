---
title: "[논문리뷰] From Pixels to Words -- Towards Native Vision-Language Primitives at
  Scale"
excerpt: "이 [arXiv]에 게시한 'From Pixels to Words -- Towards Native Vision-Language Primitives at
  Scale' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Native VLMs
  - Early Fusion
  - Multimodal Learning
  - Transformer Architecture
  - Rotary Position Embeddings
  - Pixel-Word Alignment
  - End-to-End Training

permalink: /ai/review/2025-10-17-From-Pixels-to-Words-Towards-Native-Vision-Language-Primitives-at-Scale/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14979)

**저자:** Haiwen Diao, Mingxuan Li, Silei Wu, Linjun Dai, Xiaohua Wang, Hanming Deng, Lewei Lu, Dahua Lin, Ziwei Liu



## 핵심 연구 목표
본 논문은 기존의 모듈형 Vision-Language Models (VLMs)이 가진 강한 시각적 인코딩 편향과 복잡한 인프라 문제를 해결하고, 초기 퓨전 방식의 단일(monolithic) VLM 아키텍처인 '네이티브 VLM'의 근본적인 제약을 극복하는 것을 목표로 합니다. 나아가 네이티브 VLMs의 연구를 대중화하고 발전을 가속화하기 위한 방법론을 제시합니다.

## 핵심 방법론
제안된 **NEO** 아키텍처는 가볍운 **Patch Embedding Layer**와 **Word Embedding Layer**를 통해 이미지와 텍스트를 토큰 시퀀스로 변환한 후, **monolithic decoder-only** 구조를 사용합니다. 특히, **Native VLM Primitive**는 이미지와 텍스트 간의 관계를 완전히 분리하는 **Native Rotary Position Embedding (Native-RoPE)**과 **혼합 마스킹(mixed masking)**을 적용한 **Multi-Head Native Attention (MHNA)**을 통해 교차 모달 특성을 통합합니다. 훈련은 **Pre-Buffer**와 **Post-LLM**을 활용한 **3단계(Pre-Training, Mid-Training, Supervised Fine-Tuning)** 점진적 학습 절차를 따릅니다.

## 주요 결과
**NEO-2.2B** 모델은 **390M** 이미지-텍스트 데이터만으로 훈련되었음에도 불구하고, VLMEvalKit 벤치마크에서 모듈형 VLM에 필적하는 **종합 평균 48.6%**를 달성했습니다. 특히, 시각적 질의응답 벤치마크에서는 **80.1%**의 평균 성능을 기록하며 기존의 여러 네이티브 VLM들을 능가했습니다. **Native-RoPE**는 다른 RoPE 변형에 비해 **최소 0.8%**의 평균 정확도 향상을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **단일하고 통일된 아키텍처**로 시각 및 언어 이해를 통합하는 **네이티브 VLM의 높은 잠재력**을 보여줍니다. **모듈형 VLM**의 복잡성과 사전 훈련된 시각 인코더의 제약에서 벗어나, **Native-RoPE** 및 **혼합 어텐션**과 같은 새로운 프리미티브 설계는 **효율적인 픽셀-단어 정렬**과 **교차 모달 추론**을 가능하게 합니다. 이는 제한된 자원으로 **고성능 멀티모달 시스템**을 구축하려는 AI 실무자들에게 비용 효율적인 대안을 제시하며, 향후 **멀티모달 AI 개발**의 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.