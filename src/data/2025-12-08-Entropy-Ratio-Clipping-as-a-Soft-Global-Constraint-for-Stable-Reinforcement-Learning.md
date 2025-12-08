---
title: "[논문리뷰] Entropy Ratio Clipping as a Soft Global Constraint for Stable Reinforcement Learning"
excerpt: "Zijia Lin이 [arXiv]에 게시한 'Entropy Ratio Clipping as a Soft Global Constraint for Stable Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Policy Optimization
  - Trust Region
  - Entropy Clipping
  - Large Language Models
  - Training Stability
  - Distributional Shift

permalink: /ai/review/2025-12-08-Entropy-Ratio-Clipping-as-a-Soft-Global-Constraint-for-Stable-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-12-08 00:00:00+0900+0900
last_modified_at: 2025-12-08 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.05591)

**저자:** Zijia Lin, Tiehua Mei, Minxuan Lv, Leiyu Pan, Suu



## 핵심 연구 목표
대규모 언어 모델(LLMs)을 위한 강화 학습(RL)은 **trust-region deviation** 과 **훈련 불안정성** 문제에 직면해 있습니다. 기존 **PPO-clip** 이 샘플링된 액션에만 제약을 가하여 샘플링되지 않은 액션의 분포 변화를 무시하고, 이는 결국 상당한 **trust-region drift** 로 이어지는 한계를 해결하는 것이 목표입니다. 본 연구는 새로운 정책과 이전 정책 간의 **엔트로피 비율(entropy ratio)** 을 전역적인 탐색 변화 측정 지표로 도입하고, 이를 기반으로 **Entropy Ratio Clipping (ERC)** 메커니즘을 제안하여 훈련 안정성을 높이는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 새로운 지표인 **엔트로피 비율** 을 정의하는데, 이는 새로운 정책과 이전 정책의 엔트로피 비율로 전체 액션 분포에 걸친 변화를 측정합니다. 제안된 **ERC 메커니즘** 은 **PPO-clip** 에서 영감을 받아, **엔트로피 비율** 이 미리 정의된 범위( **1 - $\beta_{low}$** 와 **1 + $\beta_{high}$** )를 벗어날 경우 해당 토큰의 기울기를 제거하는 방식으로 작동합니다. **ERC** 는 기존 **DAPO** 와 같은 RL 목적 함수에 추가적인 제약으로 통합되어, **PPO-clip** 이 다루지 못하는 샘플링되지 않은 액션의 분포 변화까지 양방향 클리핑을 통해 효과적으로 제어합니다.

## 주요 결과
실험 결과, **ERC** 를 통합한 모델은 다양한 수학적 추론 벤치마크(예: **AIME24, AIME25, HMMT25** )에서 기존 RL 기준선(예: **DAPO, GRPO** ) 대비 일관되게 우수한 성능을 보였습니다. 예를 들어, **DS-R1-Distill-Qwen-1.5B 모델** 에 **ERC-DAPO** 를 적용했을 때, 평균 성능이 **53.4%에서 55.1%** 로 향상되었으며, **DS-R1-Distill-Qwen-7B 모델** 에서는 **65.3%에서 66.2%** 로 향상되었습니다. 또한, **ERC** 는 훈련 중 **엔트로피 곡선** 과 **그라디언트 노름(gradient norm)** 을 안정화하여 훈련 역학을 개선했으며, **PPO-clip** 의 클리핑 비율(약 **0.02%** )보다 훨씬 높은 약 **20.29%** 의 클리핑 비율을 통해 더 광범위한 분포 수준 이탈을 제어함을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM의 RL 훈련 시 발생하는 **불안정성 문제** 에 대한 강력한 해결책을 제시하여 **정책 최적화의 견고성** 을 크게 향상시킬 수 있습니다. **ERC** 는 기존 **PPO-clip** 의 한계였던 **전역적인 분포 변화 제어 부족** 을 보완하여 **trust-region drift** 를 줄이고 훈련을 안정화하는 데 중요한 기여를 합니다. 이는 **더 안정적이고 효율적인 LLM 훈련** 을 가능하게 하며, 특히 복잡한 추론 및 생성 태스크에서 모델 성능을 향상시키는 데 핵심적인 역할을 할 수 있어 다양한 AI 애플리케이션에 긍정적인 영향을 미칠 잠재력이 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.