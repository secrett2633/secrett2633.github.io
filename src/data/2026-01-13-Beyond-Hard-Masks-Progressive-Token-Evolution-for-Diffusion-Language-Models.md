---
title: "[논문리뷰] Beyond Hard Masks: Progressive Token Evolution for Diffusion Language Models"
excerpt: "Chenchen Jing이 arXiv에 게시한 'Beyond Hard Masks: Progressive Token Evolution for Diffusion Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - Masked Diffusion
  - Soft Tokens
  - Progressive Decoding
  - Iterative Refinement
  - Continuous Trajectory Supervision
  - KV-Caching
  - Blockwise Diffusion

permalink: /ai/review/2026-01-13-Beyond-Hard-Masks-Progressive-Token-Evolution-for-Diffusion-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.07351)

**저자:** Linhao Zhong, Linyu Wu, Bozhen Fang, Tianjian Feng, Chenchen Jing, Hao Chen, Chunhua Shen



## 핵심 연구 목표
대부분의 확산 언어 모델(DLMs)이 사용하는 **경직된 이진 마스킹** 과 **이산 토큰 할당** 의 한계를 극복하고, 초기 결정의 수정 불가 및 중간 확률적 표현의 활용 미흡 문제를 해결하는 것을 목표로 합니다. 이를 통해 **점진적이고 재수정 가능한 디코딩** 을 지원하는 새로운 확산 기반 언어 모델을 제안하고자 합니다.

## 핵심 방법론
본 논문은 **EvoToken-DLM** 을 제안하며, 경직된 이진 마스킹 대신 **진화하는 소프트 토큰 분포** 를 도입합니다. 각 토큰은 어휘에 대한 **확률 분포** 로 표현되며, `[MASK]`에서 `Soft([MASK] ∪ V)`, `Soft(V)`를 거쳐 최종 `[Decode]` 상태로 **반복적으로 정제** 됩니다. 이 진화 과정을 효과적으로 지원하기 위해 **연속적인 궤적 감독(continuous trajectory supervision)** 훈련 전략이 도입되어 훈련 목표를 반복적인 확률적 업데이트와 일치시킵니다.

## 주요 결과
EvoToken-DLM은 여러 벤치마크에서 강력한 확산 기반 및 마스킹 DLM 기준 모델들을 일관되게 능가하는 우수한 성능을 달성했습니다. 특히 **LLaDA-Instruct-8B** 모델 기반 평가에서, **Countdown** 에서 **17.45%** , **GSM8K** 에서 **3.08%** , **MATH500** 에서 **2.06%** , **SVAMP** 에서 **3.23%** 의 평균 정확도 향상을 보였습니다. 또한, **KV-캐싱 및 블록별 확산 아키텍처** 와 완벽하게 호환되며 **최소한의 지연 시간(+3.55%)** 만 추가됩니다.

## AI 실무자를 위한 시사점
**EvoToken-DLM** 은 **소프트 토큰 분포** 와 **점진적인 정제 메커니즘** 을 통해 기존 확산 언어 모델의 **디코딩 유연성과 정확도** 를 크게 향상시킬 수 있습니다. 특히 **수정 가능한 디코딩** 은 복잡한 추론 문제 해결에 중요하며, **연속적인 궤적 감독** 은 모델이 반복적인 개선 과정을 효과적으로 학습하도록 돕습니다. 이 방법론은 **KV-캐싱 및 블록별 확산 설정** 과의 호환성을 통해 **실제 AI 시스템에 효율적으로 통합 및 배포** 될 수 있는 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.