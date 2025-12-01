---
title: "[논문리뷰] DoPE: Denoising Rotary Position Embedding"
excerpt: "Min Yang이 [arXiv]에 게시한 'DoPE: Denoising Rotary Position Embedding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Rotary Position Embedding
  - Transformer
  - Length Extrapolation
  - Attention Sink
  - Matrix Entropy
  - Denoising
  - Large Language Models

permalink: /ai/review/2025-11-17-DoPE-Denoising-Rotary-Position-Embedding/

toc: true
toc_sticky: true

date: 2025-11-17 00:00:00+0900+0900
last_modified_at: 2025-11-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.09146)

**저자:** Jing Xiong, Liyang Fan, Hui Shen, Zunhai Su, Min Yang, Lingpeng Kong, Ngai Wong



## 핵심 연구 목표
본 논문은 Transformer 모델 내 **Rotary Position Embedding (RoPE)** 의 내재된 한계로 인해 발생하는 길이 외삽 능력 약화와 **attention sink 현상** 을 해결하는 것을 목표로 합니다. 특히, 기존 RoPE 방식의 한계를 극복하고 LLM의 **길이 일반화 및 추론 안정성** 을 개선하는 새로운 방법론을 제시하고자 합니다.

## 핵심 방법론
저자들은 포지셔널 인코딩을 포함한 어텐션 맵을 '노이즈가 많은 특징 맵'으로 재해석하고, **truncated matrix entropy** 를 기반으로 이상 주파수 대역을 감지하는 훈련 없는 기법인 **Denoising Positional Encoding (DOPE)** 을 제안합니다. 이 방법은 특징 맵의 노이즈 특성을 활용하여 **파라미터 없는 가우시안 분포** 로 재매개변수화함으로써 견고한 길이 외삽을 달성합니다. **DoPE-by-parts** , **DoPE-by-all** , **DoPE-by-Gaussian** 의 세 가지 변형이 제시되었습니다.

## 주요 결과
**needle-in-a-haystack** 및 **many-shot in-context learning** 태스크 실험을 통해 DOPE가 확장된 컨텍스트(최대 **64K 토큰** )에서 검색 정확도와 추론 안정성을 크게 향상시킴을 입증했습니다. 특히, 노이즈가 있는 환경에서 **DOPE-by-Gaussian** 은 24k 토큰 기준 **75.417에서 84.354로 성능을 개선** 하였고, **훈련 없이** 최대 **10점의 성능 향상** 을 보여주었습니다. 이는 포지셔널 임베딩의 노이즈 제거 전략이 attention sink를 효과적으로 완화하고 균형 잡힌 어텐션 패턴을 복원함을 시사합니다.

## AI 실무자를 위한 시사점
**RoPE 기반 LLM의 장거리 컨텍스트 처리 능력** 을 개선하는 **훈련 없는** 실용적인 솔루션을 제공합니다. **truncated matrix entropy** 를 통해 **attention sink 현상** 의 근본 원인을 파악하고 이를 해결함으로써, **컨텍스트 길이 확장** 이 필수적인 LLM 애플리케이션 개발에 직접적으로 적용될 수 있습니다. 특히, 복잡하거나 잡음이 많은 데이터 환경에서 **모델의 견고성 및 안정성** 을 높이는 데 기여하며, **기존 모델 아키텍처에 최소한의 변경** 으로 성능 개선을 이끌어낼 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.