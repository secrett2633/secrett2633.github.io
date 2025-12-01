---
title: "[논문리뷰] Klear-Reasoner: Advancing Reasoning Capability via Gradient-Preserving
  Clipping Policy Optimization"
excerpt: "Guanting Dong이 [arXiv]에 게시한 'Klear-Reasoner: Advancing Reasoning Capability via Gradient-Preserving
  Clipping Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reasoning LLMs
  - Reinforcement Learning
  - PPO
  - Gradient Clipping
  - Supervised Fine-tuning
  - Math Reasoning
  - Code Generation
  - Policy Optimization

permalink: /ai/review/2025-8-12-Klear-Reasoner-Advancing-Reasoning-Capability-via-Gradient-Preserving-Clipping-Policy-Optimization/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.07629)

**저자:** Zhenpeng Su, Leiyu Pan, Xue Bai, Dening Liu, Guanting Dong, Jiaming Huang, Wenping Hu, Fuzheng Zhang, Guorui Zhou



## 핵심 연구 목표
본 논문은 고성능 추론 모델의 훈련 세부사항이 불완전하게 공개되어 재현이 어려운 문제를 해결하고, 기존 RL(강화 학습)의 **클리핑 메커니즘** 이 탐색 신호를 억제하고 비최적 궤적을 무시하는 한계를 극복하여 언어 모델의 추론 능력을 극대화하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Long Chain-of-Thought (CoT) Supervised Fine-tuning (SFT)** 과 새로운 RL 방법론인 **Gradient-Preserving Clipping Policy Optimization (GPPO)** 을 통합했습니다. SFT에서는 **고품질 데이터 소스** 를 우선시하고 어려운 샘플이 오히려 모델 탐색에 긍정적임을 발견했습니다. **GPPO** 는 클리핑된 토큰에서도 그래디언트를 부드럽게 역전파시켜, 중요한 학습 신호를 유지하고 안정적인 정책 업데이트를 가능하게 합니다. 또한, 수학 과제에는 이진 보상 시스템을, 코드 과제에는 **테스트 케이스 통과율** 에 비례하는 **부드러운 보상(soft reward)** 메커니즘을 적용했습니다.

## 주요 결과
**Klear-Reasoner-8B** 는 주요 추론 벤치마크에서 뛰어난 성능을 달성했습니다. **AIME 2024** 에서 **90.5%** , **AIME 2025** 에서 **83.2%** (avg@64)의 정확도를 기록했으며, **LiveCodeBench V5** 에서 **66.0%** , **LiveCodeBench V6** 에서 **58.1%** (avg@8)를 달성했습니다. **GPPO** 는 기존 **Clip-Higher** 및 **CISPO** 방법론 대비 우수한 안정성과 성능을 보였으며, 특히 혼합된(정답/오답 포함) 데이터로 어려운 작업을 훈련할 때 **AIME 2024 Hard** 에서 **1.66%** 의 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 고품질 데이터 큐레이션, 세심한 SFT, 그리고 진보된 RL 최적화 기법을 통해 **장문 추론(long-form reasoning)** 성능을 크게 향상시킬 수 있음을 보여줍니다. 특히 **GPPO** 는 기존 RL 클리핑 문제점을 해결하여 학습 효율성과 탐색 능력을 동시에 개선하는 강력한 방법론을 제공합니다. 이는 LLM 개발자가 **데이터 품질** 에 집중하고, **정교한 보상 설계** 및 **강화 학습 기법** 을 활용하여 모델의 추론 능력을 고도화하는 데 실질적인 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.