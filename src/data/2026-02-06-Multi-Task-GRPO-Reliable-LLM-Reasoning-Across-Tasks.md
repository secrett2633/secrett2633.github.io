---
title: "[논문리뷰] Multi-Task GRPO: Reliable LLM Reasoning Across Tasks"
excerpt: "Zhiyong Wang이 [arXiv]에 게시한 'Multi-Task GRPO: Reliable LLM Reasoning Across Tasks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Multi-Task Learning
  - Reinforcement Learning
  - Policy Optimization
  - GRPO
  - Task Reweighting
  - Robustness
  - Reasoning Benchmarks

permalink: /ai/review/2026-02-06-Multi-Task-GRPO-Reliable-LLM-Reasoning-Across-Tasks/

toc: true
toc_sticky: true

date: 2026-02-06 00:00:00+0900+0900
last_modified_at: 2026-02-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.05547)

**저자:** Shyam Sundhar Ramesh, Xiaotong Ji, Matthieu Zimmer, Sangwoong Yoon, Aurelien Lucchi, Zhiyong Wang, Haitham Bou Ammar, Ilija Bogunovic



## 핵심 연구 목표
본 논문은 **GRPO(Group-Relative Policy Optimization)** 기반의 RL 사후 훈련이 개별 추론 작업에서는 우수한 성능을 보이지만, 실제 환경에서는 다양한 작업 전반에 걸쳐 **신뢰할 수 있는 성능** 을 제공하지 못하는 문제를 해결하고자 합니다. 기존의 다중 작업 GRPO는 작업 불균형과 불규칙한 **0-그래디언트 프롬프트** 비율로 인해 최적화가 비효율적인 한계를 가집니다.

## 핵심 방법론
저자들은 두 가지 핵심 아이디어를 기반으로 새로운 **Multi-Task GRPO (MT-GRPO)** 알고리즘을 제안합니다. 첫째, **개선 인지 작업 재가중치 (improvement-aware task reweighting)** 를 통해 작업 수준 보상과 개선 신호를 활용하여 **최악 작업 성능** 을 명시적으로 최적화하고 균형 잡힌 진행을 촉진합니다. 둘째, **비율 보존 샘플러 (ratio-preserving sampler)** 를 도입하여, 학습된 작업 가중치가 실제 그래디언트 기여에 정확히 반영되도록 보장합니다.

## 주요 결과
실험 결과, MT-GRPO는 3개 및 9개 작업 설정 모두에서 최악 작업 정확도 측면에서 기존 베이스라인을 일관되게 능가했습니다. 특히, **표준 GRPO** 대비 **16-28%** , **DAPO** 대비 **6%** 의 최악 작업 성능 절대 개선을 달성했으며, 동시에 경쟁력 있는 평균 정확도를 유지했습니다. 또한, 3개 작업 설정에서 **50% 최악 작업 정확도** 에 도달하는 데 **50% 더 적은 훈련 단계** 가 필요하여 효율성이 크게 향상되었습니다.

## AI 실무자를 위한 시사점
MT-GRPO는 **LLM의 신뢰성 있는 다중 작업 추론 능력** 을 향상시키는 실용적인 방법론을 제공합니다. **개선 인지 재가중치** 와 **비율 보존 샘플링** 은 다중 작업 학습에서 흔히 발생하는 작업 간 불균형 및 0-그래디언트 문제에 대한 효과적인 해결책을 제시합니다. 이는 AI 엔지니어들이 **균형 잡힌 성능** 과 **빠른 모델 개발** 을 통해 LLM을 더욱 안정적이고 범용적으로 배포하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.