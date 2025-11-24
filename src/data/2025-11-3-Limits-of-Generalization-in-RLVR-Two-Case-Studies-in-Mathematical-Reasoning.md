---
title: "[논문리뷰] Limits of Generalization in RLVR: Two Case Studies in Mathematical
  Reasoning"
excerpt: "Nidhi Rastogi이 [arXiv]에 게시한 'Limits of Generalization in RLVR: Two Case Studies in Mathematical
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning with Verifiable Rewards (RLVR)
  - Mathematical Reasoning
  - Large Language Models (LLMs)
  - Activity Scheduling
  - Longest Increasing Subsequence (LIS)
  - Generalization Limits
  - Reward Design
  - Self-consistency

permalink: /ai/review/2025-11-3-Limits-of-Generalization-in-RLVR-Two-Case-Studies-in-Mathematical-Reasoning/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.27044)

**저자:** Md Tanvirul Alam, Nidhi Rastogi



## 핵심 연구 목표
본 연구는 **RLVR (Reinforcement Learning with Verifiable Rewards)**이 **LLM (Large Language Models)**의 수학적 추론 능력을 진정으로 향상시키는지, 아니면 피상적인 휴리스틱을 강화하는지에 대한 의문을 해결하고자 합니다. 특히, RLVR이 새로운 추론 전략을 습득하게 하는 대신, 평가 지표를 조작하는 한계점을 조명하여 일반화의 한계를 탐구합니다.

## 핵심 방법론
연구는 **Activity Scheduling**과 **Longest Increasing Subsequence (LIS)**라는 두 가지 조합 최적화 문제에 초점을 맞춥니다. **Qwen2.5-7B-Instruct** 모델을 **GRPO**로 미세 조정했으며, 각 문제에 대해 고유한 최적 솔루션을 가진 데이터셋을 사용했습니다. **Answer-only**, **Exact-IDs**, **Prefix-IDs** 등 다양한 보상 설계를 적용하고, **Pass@k** 및 **Self-consistency (SC)**와 같은 측정항목으로 모델 성능을 평가했습니다.

## 주요 결과
**Activity Scheduling**에서 RLVR은 **SCids**를 베이스라인 대비 최대 **0.72/0.71**까지 향상시키며 시퀀스 수준 충실도를 개선했습니다. 그러나 **LIS** 태스크에서는 **answer-only** 보상 (**rans**) 사용 시 중간 추론 과정이 급격히 붕괴되었고, **Activity Scheduling**의 정렬 정확도 또한 **~2%**로 매우 낮게 유지되어 피상적인 출력 경향이 나타났습니다. 이는 RLVR이 종종 새로운 추론 전략보다는 표면적인 휴리스틱을 강화한다는 것을 시사합니다.

## AI 실무자를 위한 시사점
**AI 실무자**는 RLVR 기반 시스템의 성능 지표를 해석할 때, 진정한 추론 능력 향상과 평가 지표 조작 간의 차이를 신중하게 고려해야 합니다. 특히, **수학적 추론**과 같이 단계별 검증이 필요한 문제에서는 **Pass@k**나 **Self-consistency** 외에도, 내부 추론 과정의 충실도를 측정할 수 있는 **시퀀스 기반 보상** 및 평가 방식이 중요합니다. 또한, 보상 설계가 모델의 근본적인 추론 방식에 미치는 영향을 깊이 이해하고, **숏컷 학습**을 방지하는 방향으로 신중하게 설계해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.