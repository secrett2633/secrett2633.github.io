---
title: "[논문리뷰] Rectifying LLM Thought from Lens of Optimization"
excerpt: "Kai Chen이 arXiv에 게시한 'Rectifying LLM Thought from Lens of Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Reasoning
  - Chain-of-Thought
  - RLVR
  - Optimization Framework
  - Process-level Reward
  - Gradient Descent
  - Reasoning Efficiency
  - Suboptimal Reasoning

permalink: /ai/review/2025-12-02-Rectifying-LLM-Thought-from-Lens-of-Optimization/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01925)

**저자:** Junnan Liu, Hongwei Liu, Songyang Zhang, Kai Chen



## 핵심 연구 목표
본 논문은 Long Chain-of-Thought (CoT) LLM이 흔히 보이는 과도한 추론 및 불필요하게 긴 추론 사슬과 같은 **비최적 추론 행동** 을 해결하여, 성능 저하 및 높은 계산 비용 문제를 개선하는 것을 목표로 합니다. CoT를 최적화 과정으로 재개념화하고 이를 효과적으로 교정하고자 합니다.

## 핵심 방법론
저자들은 CoT를 각 추론 단계가 문제 해결을 향한 업데이트를 나타내는 **경사 하강(gradient descent) 절차** 로 분석합니다. 이를 바탕으로 **REPRO(Rectifying Process-level Reward)** 라는 새로운 접근 방식을 제시하며, LLM의 정답 토큰 시퀀스에 대한 perplexity를 통해 추론 과정의 **대리 객관식 함수** 를 정의합니다. 이 함수는 최적화 강도와 안정성을 측정하는 **이중 점수 시스템** 을 사용하며, 이는 **강화 학습(RLVR) 파이프라인** 에 통합됩니다. 보상 계산 오버헤드를 줄이기 위해 **엔트로피 기반 세그먼트 선택 전략** 이 활용됩니다.

## 주요 결과
**REPRO** 는 PPO, REINFORCE++, GRPO 등 다양한 RL 알고리즘과 DeepSeek-R1-Distill-Qwen-1.5B 및 Qwen3-1.7B 같은 LLM에서 수학, 과학, 코딩 벤치마크 전반에 걸쳐 **추론 성능을 일관되게 향상** 시켰습니다. DeepSeek-R1-Distill-Qwen-1.5B PPO 기반에서 **AIME24 정확도가 34.8%에서 36.3%로, MATH500은 86.9%에서 87.7%로** 개선되었습니다. 또한, 추론 토큰 비용을 최대 **36.8% 감소** 시키는 등 추론 효율성을 크게 높여, 비최적 추론 행동이 감소함을 정량적으로 입증했습니다.

## AI 실무자를 위한 시사점
**REPRO** 는 기존 RLVR 훈련 파이프라인에 **플러그 앤 플레이(plug-and-play)** 방식으로 쉽게 통합될 수 있어, LLM의 추론 성능과 효율성을 동시에 개선하는 실용적인 방법을 제공합니다. 이 방법론은 모델의 **과도한 추론(overthinking)** 및 비효율적인 패턴을 줄여 계산 자원과 시간을 절약하며, **엔트로피 기반 선택 전략** 을 통해 계산 오버헤드를 관리할 수 있습니다. 이는 자원 제약이 있는 환경이나 실시간 응용에서 LLM의 활용도를 높이는 데 중요한 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.