---
title: "[논문리뷰] BAPO: Stabilizing Off-Policy Reinforcement Learning for LLMs via
  Balanced Policy Optimization with Adaptive Clipping"
excerpt: "Junrui Shen이 [arXiv]에 게시한 'BAPO: Stabilizing Off-Policy Reinforcement Learning for LLMs via
  Balanced Policy Optimization with Adaptive Clipping' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Off-Policy Reinforcement Learning
  - Large Language Models
  - Adaptive Clipping
  - Policy Optimization
  - PPO
  - Entropy Preservation
  - RL Stabilization

permalink: /ai/review/2025-10-23-BAPO_Stabilizing_Off-Policy_Reinforcement_Learning_for_LLMs_via_Balanced_Policy_Optimization_with_Adaptive_Clipping/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.18927)

**저자:** Junrui Shen, Enyu Zhou, Yang Nan, Xin Guo, Zhiheng Xi



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)을 위한 오프-폴리시(off-policy) 강화 학습(RL)의 불안정성 문제를 해결하고자 합니다. 오프-폴리시 RL은 정책 엔트로피 급감, 불안정한 최적화, 그리고 훈련 붕괴로 이어지는 경향이 있어, 샘플 효율성에도 불구하고 LLMs에 적용하기 어렵습니다. 저자들은 최적화 불균형과 고정된 클리핑 메커니즘이 엔트로피 증가를 방해하는 문제를 근본 원인으로 지목합니다.

## 핵심 방법론
저자들은 이론적, 경험적 분석을 통해 **최적화 불균형**과 **Entropy-Clip Rule**이라는 두 가지 핵심 통찰을 제시합니다. 이를 바탕으로 **Balanced Policy Optimization with Adaptive Clipping (BAPO)**이라는 새로운 방법을 제안합니다. BAPO는 각 업데이트 단계에서 포지티브 및 네거티브 기여도를 재조정하고, 정책 엔트로피를 보존하며, RL 최적화를 안정화하기 위해 **클리핑 범위(`Clow` 및 `Chigh`)를 동적으로 조정**합니다.

## 주요 결과
**BAPO**는 다양한 오프-폴리시 시나리오에서 빠르고 안정적이며 데이터 효율적인 훈련을 달성했습니다. **7B BAPO 모델**은 **AIME24에서 70.8점**, **AIME25에서 62.5점**을 기록하여 **SkyWork-OR1-7B**와 같은 오픈소스 모델을 능가했습니다. 특히, **32B BAPO 모델**은 **AIME24에서 87.1점**, **AIME25에서 80.0점**을 달성하여 **Qwen3-32B**와 같은 동급 모델뿐만 아니라 **03-mini-medium** 및 **Gemini-2.5-Flash-Thinking**과 같은 선도적인 상용 시스템의 성능을 뛰어넘었습니다.

## AI 실무자를 위한 시사점
**BAPO**는 오프-폴리시 RL을 LLMs에 적용할 때 발생하는 주요 안정성 문제를 해결하는 **간단하지만 효과적인 방법**을 제공합니다. 이는 복잡한 수동 하이퍼파라미터 튜닝 없이도 LLM의 학습 안정성과 성능을 크게 향상시킬 수 있습니다. 특히 부분 롤아웃과 같은 최신 AI 인프라 환경에서 LLM의 **탐색 능력 유지** 및 **과도한 과잉 착취 방지**에 기여하여, 장기적이고 복잡한 LLM 태스크 개발에 실용적인 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.