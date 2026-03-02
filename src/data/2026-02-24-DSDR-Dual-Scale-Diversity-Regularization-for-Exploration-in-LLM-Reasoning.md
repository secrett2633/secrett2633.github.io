---
title: "[논문리뷰] DSDR: Dual-Scale Diversity Regularization for Exploration in LLM Reasoning"
excerpt: "Donghao Zhou이 arXiv에 게시한 'DSDR: Dual-Scale Diversity Regularization for Exploration in LLM Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLM)
  - Reinforcement Learning with Verifiers (RLVR)
  - Exploration
  - Diversity Regularization
  - Dual-Scale
  - Reasoning
  - Policy Optimization

permalink: /ai/review/2026-02-24-DSDR-Dual-Scale-Diversity-Regularization-for-Exploration-in-LLM-Reasoning/

toc: true
toc_sticky: true

date: 2026-02-24 00:00:00+0900+0900
last_modified_at: 2026-02-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.19895)

**저자:** Zhongwei Wan, Yun Shen, Zhihao Dou, Donghao Zhou, Yu Zhang, Xin Wang, Hui Shen, Jing Xiong, Chaofan Tao, Zixuan Zhong, Peizhou Huang, Mi Zhang



## 핵심 연구 목표
LLM 추론을 위한 **RLVR** 훈련에서 발생하는 **제한적인 탐색(limited exploration)** 문제를 해결하는 것을 목표로 합니다. 기존 방법론들이 불충분한 로컬 무작위성이나 단일 스케일 다양성 조절에 그쳐 정책이 소수의 추론 패턴으로 수렴하고 깊은 탐색이 조기에 중단되는 문제를 극복하고자 합니다.

## 핵심 방법론
본 논문은 **DSDR (Dual-Scale Diversity Regularization)** 프레임워크를 제안합니다. 이는 LLM 추론 다양성을 **글로벌(경로) 및 로컬(토큰)** 구성 요소로 분해합니다. **글로벌 다양성 정규화** 는 **의미론적 임베딩** 과 **수식 수준 고유성** 을 통해 올바른 추론 궤적 간의 다양성을 촉진하고, **로컬 엔트로피 정규화** 는 올바른 궤적 내에서 길이 불변의 토큰 수준 엔트로피를 적용하여 엔트로피 붕괴를 방지합니다. 이 두 스케일은 **글로벌-로컬 할당 메커니즘** 을 통해 결합되어 더 독특한 올바른 궤적에 로컬 정규화를 집중시킵니다.

## 주요 결과
**DSDR** 는 여러 수학 추론 벤치마크( **AIME2024, AIME2025, MATH500, Minerva, Olympiad** )에서 **Pass@1 및 Avg@16 정확도** 를 포함하여 기존 베이스라인( **Backbone, GRPO, DAPO** )보다 일관된 성능 향상을 입증했습니다. 특히 **Qwen3-4B 모델** 에서 평균 성능 **48.0 / 46.8** 을 달성하며 상당한 개선을 보였고, **Pass@k** 평가에서도 우수한 성능을 보여 다양한 올바른 추론 전략을 효과적으로 탐색함을 강조했습니다.

## AI 실무자를 위한 시사점
**LLM의 추론 능력** 을 향상시키기 위한 **RLVR 훈련** 에서 **탐색 효율성** 을 높이는 실용적인 해결책을 제공합니다. 특히 **정답 편향 없는(correctness-aligned)** 방식으로 **글로벌 및 로컬 스케일의 다양성** 을 통합하여 모델이 더욱 **견고하고 일반화 가능한 추론 경로** 를 학습하도록 돕습니다. 이는 다양한 솔루션 경로가 요구되는 복잡한 문제 해결 시스템 개발에 중요한 통찰력을 제공하며, **사전 훈련된 모델** 의 추가적인 미세 조정에 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.