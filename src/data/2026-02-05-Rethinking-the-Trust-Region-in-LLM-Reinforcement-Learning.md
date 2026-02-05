---
title: "[논문리뷰] Rethinking the Trust Region in LLM Reinforcement Learning"
excerpt: "이 [arXiv]에 게시한 'Rethinking the Trust Region in LLM Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - Reinforcement Learning
  - Trust Region
  - PPO
  - DPPO
  - Policy Optimization
  - Training Stability
  - Divergence Approximation

permalink: /ai/review/2026-02-05-Rethinking-the-Trust-Region-in-LLM-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2026-02-05 00:00:00+0900+0900
last_modified_at: 2026-02-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.04879)

**저자:** Penghui Qi, Xiangxin Zhou, Zichen Liu, Tianyu Pang, Chao Du, Min Lin, Wee Sun Lee



## 핵심 연구 목표
Large Language Models (LLMs)의 강화학습 미세 조정 시, 기존 **Proximal Policy Optimization (PPO)** 의 비율 클리핑 메커니즘이 대규모 어휘 공간에 부적합하여 발생하는 훈련 비효율성과 불안정성을 해결하는 것을 목표로 합니다. 특히, 낮은 확률 토큰 과잉 제재 및 높은 확률 토큰 과소 제약 문제를 극복하고자 합니다.

## 핵심 방법론
저자들은 **Divergence Proximal Policy Optimization (DPPO)** 를 제안하여, PPO의 휴리스틱 클리핑을 정책 발산( **Total Variation (TV)** 또는 **KL divergence** )의 직접적인 추정치에 기반한 원칙적인 제약으로 대체합니다. LLM의 메모리 제약을 고려하여 **Binary divergence** 및 **Top-K divergence** 와 같은 효율적인 발산 근사 방식을 도입했으며, 유한-수평선, 할인되지 않은 LLM 생성 설정에 특화된 정책 개선 경계를 이론적으로 정립했습니다.

## 주요 결과
**DPPO** 는 **Qwen3-30B-A3B-Base** 모델을 사용한 **AIME24** 및 **AIME25** 벤치마크에서 **GRPO** 를 포함한 기존 방식들보다 **훨씬 우수한 훈련 안정성과 효율성** 을 보여주었습니다. 특히, 롤아웃 라우터 리플레이(R3) 없이도 **GRPO** +R3보다 뛰어난 성능을 달성했으며, **Binary TV/KL 근사** 가 복잡한 **Top-K 근사** 와 유사한 효과를 내면서도 충분히 효율적임을 입증했습니다.

## AI 실무자를 위한 시사점
LLM 미세 조정을 위한 강화학습에서 **PPO** 의 한계를 명확히 지적하고, 보다 **원칙적이고 안정적인 대안인 DPPO** 를 제시합니다. 이는 AI 엔지니어들이 LLM 미세 조정 시 겪는 훈련 불안정성 및 비효율성 문제를 해결하는 데 중요한 기여를 할 수 있습니다. 특히, **메모리 효율적인 발산 근사** 는 대규모 LLM 적용에 현실적인 해법을 제공하며, 트러스트 리전이 **원래의 행동 정책(rollout policy)에 고정** 되어야 한다는 실용적인 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.