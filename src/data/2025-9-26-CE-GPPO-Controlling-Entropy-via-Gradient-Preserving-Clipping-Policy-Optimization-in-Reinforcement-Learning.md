---
title: "[논문리뷰] CE-GPPO: Controlling Entropy via Gradient-Preserving Clipping Policy
  Optimization in Reinforcement Learning"
excerpt: "Wenping Hu이 [arXiv]에 게시한 'CE-GPPO: Controlling Entropy via Gradient-Preserving Clipping Policy
  Optimization in Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Policy Optimization
  - PPO
  - Entropy Control
  - Gradient Clipping
  - Exploration-Exploitation

permalink: /ai/review/2025-9-26-CE-GPPO-Controlling-Entropy-via-Gradient-Preserving-Clipping-Policy-Optimization-in-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.20712)

**저자:** Zhenpeng Su, Leiyu Pan, Minxuan Lv, Yuntao Li, Wenping Hu, Fuzheng Zhang, Kun Gai, Guorui Zhou



## 핵심 연구 목표
본 논문은 **LLM (Large Language Model)** 을 위한 **강화 학습(RL)** 과정에서 **정책 엔트로피(policy entropy)** 의 불안정성을 해결하는 것을 목표로 합니다. 특히, 기존의 **PPO (Proximal Policy Optimization)** 및 그 변형들이 **클리핑 메커니즘** 으로 인해 저확률 토큰의 유용한 gradient 신호를 버려 **엔트로피 붕괴(entropy collapse)** 또는 **엔트로피 폭발(entropy explosion)** 을 야기하는 문제를 해결하고자 합니다.

## 핵심 방법론
제안하는 **CE-GPPO (Controlling Entropy via Gradient-Preserving Policy Optimization)** 알고리즘은 기존 **PPO** 의 클리핑 범위를 벗어난 토큰들(즉, **PA&LP** 및 **NA&LP** 토큰)에서 발생하는 gradient를 재도입하고 그 크기를 조절합니다. 이를 위해 **stop-gradient 연산** 과 함께 **`β1` (탐색 제어)** 및 **`β2` (활용 제어)** 라는 조정 가능한 스케일링 계수를 도입하여, policy entropy를 안정적이고 높은 수준으로 유지하면서 **탐색-활용 균형** 을 미세하게 제어합니다.

## 주요 결과
**CE-GPPO** 는 다양한 수학적 추론 벤치마크에서 강력한 기준선인 **GRPO** 및 **DAPO** 를 일관되게 능가합니다. 특히, **DeepSeek-R1-Distill-Qwen-1.5B 모델** 에서 평균 **54.9점** 을 달성하여 **DAPO** 의 **52.4점** 을 상회했으며, **7B 모델** 에서는 평균 **67.5점** 으로 **DAPO** 의 **64.5점** 을 넘어섰습니다. 또한, **CE-GPPO** 는 **엔트로피 붕괴** 와 **엔트로피 폭발** 을 효과적으로 완화하여 훈련 전반에 걸쳐 안정적인 엔트로피 다이내믹스를 유지하는 것을 보여줍니다.

## AI 실무자를 위한 시사점
이 연구는 **LLM 훈련** 에서 **정책 엔트로피** 를 안정적으로 관리하는 것이 모델 성능 향상에 필수적임을 강조합니다. **CE-GPPO** 는 기존 **PPO** 의 한계를 극복하고 **클리핑된 gradient 신호** 를 재활용하여 **탐색-활용 균형** 을 정교하게 제어할 수 있는 실용적인 방법론을 제시합니다. **`β1`과 `β2` 매개변수** 의 적절한 조정을 통해 훈련 단계별로 **탐색 및 활용 전략** 을 유연하게 적용하여 **수학적 추론** 과 같은 복잡한 **LLM 태스크** 의 성능을 최적화할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.