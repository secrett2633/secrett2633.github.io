---
title: "[논문리뷰] EAGER: Entropy-Aware GEneRation for Adaptive Inference-Time Scaling"
excerpt: "Ahmet Üstün이 [arXiv]에 게시한 'EAGER: Entropy-Aware GEneRation for Adaptive Inference-Time Scaling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - Inference-Time Scaling
  - Entropy-Aware Generation
  - Adaptive Budget Allocation
  - Reasoning Benchmarks
  - Computational Efficiency
  - Chain-of-Thought

permalink: /ai/review/2025-10-16-EAGER-Entropy-Aware-GEneRation-for-Adaptive-Inference-Time-Scaling/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.11170)

**저자:** Daniel Scalena, Leonidas Zotos, Elisabetta Fersini, Malvina Nissim, Ahmet Üstün



## 핵심 연구 목표
본 논문은 추론 언어 모델(LLM)에서 여러 추론 경로를 탐색할 때 발생하는 **불필요한 계산 오버헤드** 를 줄이고자 합니다. 특히, 다양한 프롬프트가 서로 다른 복잡도와 계산 요구사항을 가진다는 전제하에, 모델의 **토큰별 엔트로피 분포** 를 활용하여 추론 중 컴퓨팅 예산을 동적으로 할당함으로써 효율성을 높이고 전반적인 성능을 개선하는 것이 목표입니다.

## 핵심 방법론
**EAGER** 는 **토큰 수준의 불확실성(엔트로피)** 을 모니터링하여 새로운 병렬 추론 경로를 언제 시작할지 결정하는 훈련 없는(training-free) 생성 방법입니다. **EAGER-init** 단계에서는 높은 엔트로피 토큰이 나타날 때만 분기하여 중복 계산을 줄이고 예산을 절약합니다. 절약된 예산은 **EAGER-adapt** (타겟 레이블 미접근 시) 또는 **full EAGER** (타겟 레이블 접근 시) 단계에서 더 어려운 프롬프트에 동적으로 재할당되어 추가 탐색을 지원합니다.

## 주요 결과
**EAGER** 는 **AIME 2025** 와 같은 복잡한 추론 벤치마크에서 **FULL PARALLEL sampling** 대비 일관되게 우수한 효율성-성능 트레이드오프를 달성했습니다. 타겟 레이블에 접근 가능한 경우, **full EAGER** 는 **최대 65% 더 적은 토큰** 을 생성하면서 **Pass@k** 에서 **최대 37%의 성능 향상** 을 보였습니다. 레이블 없이도 **EAGER-adapt** 는 **최대 13%의 성능 향상** 과 **40% 적은 토큰** 사용을 기록했습니다.

## AI 실무자를 위한 시사점
**EAGER** 는 **LLM의 추론 비용을 최적화** 하기 위한 실용적이고 훈련이 필요 없는 방법을 제공합니다. 모델의 불확실성을 기반으로 컴퓨팅 예산을 동적으로 할당함으로써, **성능 저하 없이** 계산 효율성을 크게 높일 수 있습니다. 특히 정답 레이블을 활용할 수 있는 **강화 학습(RL) 파이프라인** 에서는 더욱 강력한 성능 이점을 제공하며, 실시간 서비스 환경에서의 **LLM 배포 비용 절감** 에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.