---
title: "[논문리뷰] Learn Hard Problems During RL with Reference Guided Fine-tuning"
excerpt: "arXiv에 게시된 'Learn Hard Problems During RL with Reference Guided Fine-tuning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Mathematical Reasoning
  - Reward Sparsity
  - Fine-tuning
  - Large Language Models
  - Reference-Guided Learning
  - DAPO

permalink: /ai/review/2026-03-03-Learn-Hard-Problems-During-RL-with-Reference-Guided-Fine-tuning/

toc: true
toc_sticky: true

date: 2026-03-03 00:00:00+0900+0900
last_modified_at: 2026-03-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.01223)

**저자:** Yangzhen Wu, Shanda Li, Zixin Wen, Xin zhou, Ameet Talwalkar, Yiming Yang, Wenhao Huang, Tianle Cai



## 핵심 연구 목표
이 논문은 수학적 추론을 위한 강화 학습(RL)에서 발생하는 **보상 희소성(reward sparsity)** 문제를 해결하는 것을 목표로 합니다. 특히, 대규모 언어 모델(LLM)이 어려운 문제에 대한 정확한 추론 궤적을 생성하지 못하여 유의미한 보상 신호를 받지 못하는 한계를 극복하고자 합니다.

## 핵심 방법론
저자들은 **Reference-Guided Fine-tuning (ReGFT)** 이라는 방법을 제안합니다. 이 방법은 인간이 작성한 참조 해답을 부분적인 힌트로 사용하여 모델이 **자체적인 추론 궤적** 을 생성하도록 안내합니다. 이는 모델의 추론 공간 내에서 참조 가이드의 이점을 활용하여 학습 데이터를 합성하며, 이후 **DAPO (Decoupled Clip and Dynamic Sampling Policy Optimization)** 기반 RL 학습을 위한 강력한 초기화를 제공합니다.

## 주요 결과
ReGFT는 **AIME'24, AIME'25, Beyond-AIME** 세 가지 벤치마크에서 원본 모델 대비 일관되게 **높은 지도 학습 정확도** 를 달성하고, **DAPO 훈련을 가속화** 하며 RL의 최종 성능을 향상시켰습니다. 특히, 참조 가이드 샘플링은 표준 샘플링으로 해결할 수 없는 문제의 **추가 5.85%** 를 해결 가능하게 하여 보상 희소성을 효과적으로 완화하고, **pass@k 성능** 에서도 지속적인 우위를 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **ReGFT** 를 활용하여 LLM의 수학적 추론 능력을 향상시킬 수 있으며, 특히 보상 희소성이 높은 어려운 문제에 대한 **강화 학습 효율성** 을 크게 개선할 수 있습니다. 모델의 고유한 추론 방식과 정렬된 **모델-생성 궤적** 의 중요성을 강조하며, 이는 인간 참조 데이터를 단순히 복사하는 것보다 효과적인 일반화 및 성능 향상에 기여함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.