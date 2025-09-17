---
title: "[논문리뷰] Single-stream Policy Optimization"
excerpt: "Zihan Ding이 [arXiv]에 게시한 'Single-stream Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Optimization
  - Policy Gradient
  - Variance Reduction
  - Adaptive Sampling
  - Scalability
  - Agentic Systems
  - RLVR

permalink: /ai/review/2025-9-17-Single-stream_Policy_Optimization/

toc: true
toc_sticky: true

date: 2025-09-17 13:16:01+0900
last_modified_at: 2025-09-17 13:16:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13232)

**저자:** Zhongwen Xu, Zihan Ding



## 핵심 연구 목표
본 논문은 LLM을 위한 기존 그룹 기반 정책 최적화 방식(**GRPO** 등)이 겪는 비효율성(퇴화 그룹으로 인한 학습 신호 손실)과 동기화 장벽으로 인한 확장성 문제를 해결하고자 합니다. 연구 목표는 이러한 한계를 극복하고 LLM 추론을 위한 안정적이고 효율적이며 확장 가능한 학습 신호를 제공하는 단일 스트림 최적화 방법론을 제시하는 것입니다.

## 핵심 방법론
제안된 **Single-stream Policy Optimization (SPO)**은 세 가지 핵심 구성 요소를 통합합니다. 첫째, 각 프롬프트에 대한 성공 확률의 지속적인 베이지안 추정치를 유지하는 **KL-적응형 가치 추적기**를 사용하여 저분산 기준선(baseline)을 제공합니다. 둘째, 배치 전체에 걸쳐 이점(advantage)을 전역적으로 정규화하여 그룹별 통계의 불안정성을 방지합니다. 마지막으로, 우선순위 샘플링을 통해 학습 잠재력이 높은 프롬프트에 자원을 집중하는 **적응형 커리큘럼**을 구현합니다.

## 주요 결과
실험 결과, **SPO**는 **Qwen3-8B** 모델을 사용하여 5개의 난이도 높은 수학 벤치마크에서 **GRPO**보다 일관되게 우수한 성능을 보였습니다. 평균 **maj@32** 점수를 **GRPO** 대비 **+3.4%p** 향상시켰으며, 특히 **BRUMO 25 (+7.3%p)**, **AIME 25 (+4.4%p)**, **HMMT 25 (+3.3%p)**에서 상당한 절대 점수 상승을 달성했습니다. 또한, 그룹 동기화 병목 현상을 제거하여 에이전트 환경 시뮬레이션에서 **4.35배**의 학습 처리량 향상을 입증했습니다.

## AI 실무자를 위한 시사점
**SPO**는 LLM 최적화를 위한 보다 강력하고 확장 가능하며 효율적인 기반을 제공하여, 특히 상호작용 시간이 가변적인 복잡한 추론 및 에이전트 태스크에 유리합니다. 이는 RL 알고리즘에 불필요한 복잡성을 추가하는 경향에 도전하며, 기초적인 RL 원칙이 LLM 추론 발전의 다음 단계를 주도할 수 있음을 시사합니다. 따라서, 복잡한 에이전트 시스템이나 장기적인 추론 작업에서 LLM의 효율적인 훈련 및 배포에 중요한 영향을 미칠 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.