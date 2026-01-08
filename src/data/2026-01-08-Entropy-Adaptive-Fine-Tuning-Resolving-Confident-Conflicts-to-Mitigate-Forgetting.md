---
title: "[논문리뷰] Entropy-Adaptive Fine-Tuning: Resolving Confident Conflicts to Mitigate Forgetting"
excerpt: "이 [arXiv]에 게시한 'Entropy-Adaptive Fine-Tuning: Resolving Confident Conflicts to Mitigate Forgetting' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Supervised Fine-Tuning (SFT)
  - Catastrophic Forgetting
  - Entropy-Adaptive Fine-Tuning (EAFT)
  - Large Language Models (LLMs)
  - Domain Adaptation
  - Reinforcement Learning (RL)
  - Confident Conflicts

permalink: /ai/review/2026-01-08-Entropy-Adaptive-Fine-Tuning-Resolving-Confident-Conflicts-to-Mitigate-Forgetting/

toc: true
toc_sticky: true

date: 2026-01-08 00:00:00+0900+0900
last_modified_at: 2026-01-08 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.02151)

**저자:** Muxi Diao, Lele Yang, Wuxuan Gong, Yutong Zhang, Zhonghao Yan, Yufei Han, Kongming Liang, Weiran Xu, Zhanyu Ma



## 핵심 연구 목표
본 논문은 **Supervised Fine-Tuning (SFT)** 과정에서 발생하는 **catastrophic forgetting** 의 근본 원인을 분석하고, 이를 완화하기 위한 새로운 방법론을 제시합니다. 특히 **on-policy Reinforcement Learning (RL)** 이 일반적인 능력을 보존하는 반면 SFT가 실패하는 이유인 **"Confident Conflicts"** (낮은 확률, 낮은 엔트로피 토큰)를 식별하고 해결하고자 합니다.

## 핵심 방법론
제안하는 **Entropy-Adaptive Fine-Tuning (EAFT)** 는 토큰 수준의 엔트로피를 활용하여 훈련 손실을 동적으로 조절하는 소프트 게이팅 메커니즘을 사용합니다. 이는 모델이 자신의 예측에 강한 확신을 가지지만 실제 레이블과 상충하는 **"Confident Conflicts"** 토큰에 대한 기울기 업데이트를 억제하여 모델의 기존 지식을 보존하고, 불확실한 샘플로부터 학습을 촉진합니다. 효율성을 위해 **Top-K 엔트로피 근사** 방법을 채택했습니다.

## 주요 결과
**Qwen** 및 **GLM** 계열 모델(4B~32B)에 대한 광범위한 실험에서, **EAFT** 는 타겟 도메인 성능을 **표준 SFT** 와 동등하게 유지하거나 능가하면서도 일반적인 능력의 저하를 **크게 완화** 하는 파레토 개선을 달성했습니다. 예를 들어, **Qwen3-4B-Instruct** 모델에서 **CLUEWSC** 벤치마크 점수를 표준 SFT의 **74.5%** 에서 **83.7%** 로 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
**EAFT** 는 **LLM의 도메인 적응** 시 발생하는 **catastrophic forgetting** 을 효과적으로 줄일 수 있는 실용적인 해결책을 제공합니다. 특히 **모델의 기존 지식을 보존** 하면서 새로운 도메인에 적응해야 하는 시나리오에서 유용하며, 추가적인 **참조 모델 없이** 모델 자체의 엔트로피를 활용하여 **계산 효율성** 을 높일 수 있습니다. 이는 AI 모델의 견고성과 일반화 능력을 향상시키는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.