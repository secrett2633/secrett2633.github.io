---
title: "[논문리뷰] Beyond Pass@1: Self-Play with Variational Problem Synthesis Sustains
  RLVR"
excerpt: "Ying Nian Wu이 [arXiv]에 게시한 'Beyond Pass@1: Self-Play with Variational Problem Synthesis Sustains
  RLVR' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Self-Play
  - Variational Problem Synthesis
  - Policy Entropy
  - Pass@k
  - Reasoning Benchmarks

permalink: /ai/review/2025-8-25-Beyond_Pass1_Self-Play_with_Variational_Problem_Synthesis_Sustains_RLVR/

toc: true
toc_sticky: true

date: 2025-08-25 13:13:07+0900
last_modified_at: 2025-08-25 13:13:07+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.14029)

**저자:** Xiao Liang, Zhongzhi Li, Yeyun Gong, Yelong Shen, Ying Nian Wu, Zhijiang Guo, Weizhu Chen



## 핵심 연구 목표
본 논문은 **Verifiable Rewards (RLVR) 기반 Large Language Models (LLMs)** 학습 시 발생하는 **Pass@k 성능 한계**와 **정책 엔트로피 붕괴** 문제를 해결하는 것을 목표로 합니다. 기존 RLVR이 Pass@1 성능은 개선하지만, 생성 다양성을 감소시켜 복잡한 추론 문제 해결 능력을 제한하는 문제를 극복하고, 지속적인 모델 개선을 가능하게 하는 학습 전략을 제시하고자 합니다.

## 핵심 방법론
제안된 **Self-play with Variational problem Synthesis (SvS)** 전략은 온라인으로 학습 문제를 증강합니다. 정책 모델은 **하위 성능 학습 샘플**의 **정답 솔루션**을 활용하여 **변형 문제(variational problems)**를 합성하며, 이 변형 문제들은 원본 문제와 **동일한 레퍼런스 정답**을 유지합니다. 정책은 스스로 생성한 변형 문제를 해결하고, 그 정답과 원본 문제의 정답 간의 일관성을 통해 변형 문제의 정확성을 검증합니다. 특히, **중간 수준의 정확도**를 달성한 변형 문제에만 보상을 주는 **보상 쉐이핑(reward shaping)**을 적용하여 정책이 과도하게 힌트가 많거나 풀 수 없는 문제를 생성하지 않도록 유도합니다.

## 주요 결과
SvS는 표준 RLVR 대비 경쟁 수준 벤치마크에서 뛰어난 효율성과 효과를 보였습니다. 특히, **Qwen2.5-32B-Instruct** 모델을 **MATH-12k** 데이터셋으로 학습했을 때 **AIME24 Pass@32**에서 **12.3%p**, **AIME25 Pass@32**에서 **27.4%p**의 절대 성능 향상을 달성했습니다. SvS는 학습 중 **정책 엔트로피**를 안정적으로 유지하며, **Pass@k 성능**을 **k=1024**까지 확장했을 때도 지속적인 개선을 보였습니다. 또한, 12개 추론 벤치마크 및 **3B에서 32B**에 이르는 다양한 모델 크기에서 일관된 일반화 성능과 강건성을 입증했으며, 일반 Q&A/코드 벤치마크에서도 **73.77%의 평균 정확도**로 기존 모델을 능가했습니다.

## AI 실무자를 위한 시사점
AI 실무자는 SvS 전략을 통해 LLM의 **추론 능력 확장 및 지속적인 개선**을 달성할 수 있습니다. 특히, **고품질 학습 데이터의 부족**을 정책 자체의 **자기 개선(self-improvement)** 메커니즘으로 해결하여, 외부 데이터 어노테이션 없이도 데이터 다양성을 유지하고 학습 엔트로피 붕괴를 방지하는 실용적인 방법을 제공합니다. 이 방법은 **Pass@k 성능**이 중요한 복잡한 추론 작업에서 LLM의 잠재력을 최대한 활용하며, **다양한 RLVR 알고리즘**에 유연하게 통합될 수 있어 폭넓은 응용 가능성을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.