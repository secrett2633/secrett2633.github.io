---
title: "[논문리뷰] DuPO: Enabling Reliable LLM Self-Verification via Dual Preference
  Optimization"
excerpt: "Yu Lu이 [arXiv]에 게시한 'DuPO: Enabling Reliable LLM Self-Verification via Dual Preference
  Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Optimization
  - Self-Verification
  - Dual Learning
  - Preference Optimization
  - Self-Supervised Learning
  - Mathematical Reasoning
  - Multilingual Translation
  - RLHF

permalink: /ai/review/2025-8-21-DuPO-Enabling-Reliable-LLM-Self-Verification-via-Dual-Preference-Optimization/

toc: true
toc_sticky: true

date: 2025-08-21 13:15:28+0900
last_modified_at: 2025-08-21 13:15:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.14460)

**저자:** Shuaijie She♠, Yu Bao♠, Yu Lu, Lu Xu♠, Tao Li, Wenhao Zhu, Shujian Huang(✉), Shanbo Cheng♠(✉), Lu Lu♠, Yuxuan Wang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)의 자기 검증 신뢰성을 높여 **비용이 많이 드는 사람의 주석이나 검증 가능한 답변에 대한 외부 의존성 없이** 성능을 최적화하는 것을 목표로 합니다. 기존 강화 학습(RLHF, RLVR) 및 전통적인 듀얼 러닝 프레임워크가 가진 `높은 주석 비용`, `제한된 적용 가능성(비가역적 태스크)`, `양방향 역량 비대칭성` 등의 핵심 한계를 해결하고자 합니다.

## 핵심 방법론
제안하는 **DuPO(Dual Learning-based Preference Optimization)**는 일반화된 듀얼리티 프레임워크를 도입합니다. 이는 **프라이멀 태스크의 입력을 알려진(`xk`) 부분과 알려지지 않은(`xu`) 부분으로 분해**하고, 듀얼 태스크는 **프라이멀 출력(`y`)과 알려진(`xk`) 정보를 사용하여 알려지지 않은(`xu`) 부분을 재구성**하도록 설계됩니다. 이 재구성의 품질을 **자기 지도 보상 신호**로 활용하여 프라이멀 태스크를 최적화하며, **단일 LLM이 프라이멀 및 듀얼 태스크를 모두 수행**하도록 하여 시너지를 창출합니다. 최적화에는 **Group Relative Policy Optimization (GRPO)** 알고리즘이 사용됩니다.

## 주요 결과
DuPO는 다양한 태스크에서 상당한 성능 향상을 달성했습니다. 다국어 번역에서 **Seed-X-7B-Instruct** 모델의 평균 **COMET 점수를 2.13점** 향상시켰습니다. 수학적 추론에서는 세 가지 챌린지 벤치마크에서 평균 **6.4점**의 정확도 향상을 보였으며, 특히 **Qwen3-4B** 모델은 **77.2%에서 83.6%**로 성능이 크게 상승했습니다. 또한, **추론 시 재랭킹(reranking) 메커니즘**으로 활용 시 추가 훈련 없이 성능을 **9.3점**까지 향상시켰습니다.

## AI 실무자를 위한 시사점
DuPO는 **사람의 주석이나 외부 감독 없이 LLM을 최적화**할 수 있는 확장 가능하고 일반적인 프레임워크를 제공합니다. 이는 **대규모 모델 학습 및 배포 비용을 크게 절감**할 수 있는 잠재력을 가집니다. 특히, **수학적 추론과 다국어 번역**과 같은 복잡한 문제 해결 능력을 자가 학습 방식으로 향상시키는 데 유용하며, **모델의 잠재적 추론 능력을 깨우고 일반화**하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.