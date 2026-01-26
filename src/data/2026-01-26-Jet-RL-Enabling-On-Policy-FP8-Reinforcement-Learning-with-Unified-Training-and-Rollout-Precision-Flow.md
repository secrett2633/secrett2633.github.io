---
title: "[논문리뷰] Jet-RL: Enabling On-Policy FP8 Reinforcement Learning with Unified Training and Rollout Precision Flow"
excerpt: "이 [arXiv]에 게시한 'Jet-RL: Enabling On-Policy FP8 Reinforcement Learning with Unified Training and Rollout Precision Flow' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - FP8 Quantization
  - LLM Training
  - On-Policy RL
  - Unified Precision Flow
  - Training Efficiency
  - Rollout Acceleration

permalink: /ai/review/2026-01-26-Jet-RL-Enabling-On-Policy-FP8-Reinforcement-Learning-with-Unified-Training-and-Rollout-Precision-Flow/

toc: true
toc_sticky: true

date: 2026-01-26 00:00:00+0900+0900
last_modified_at: 2026-01-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.14243)

**저자:** Haocheng Xi, Charlie Ruan, Peiyuan Liao, Yujun Lin, Han Cai, Yilong Zhao, Shuo Yang, Kurt Keutzer, Song Han, Ligeng Zhu



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 강화 학습(RL) 훈련 파이프라인에서 발생하는 계산 비효율성, 특히 전체 훈련 시간의 70% 이상을 차지하는 롤아웃(rollout) 단계의 병목 현상을 해결하고자 합니다. 기존의 **BF16-train + FP8-rollout 전략** 이 긴 롤아웃 및 난이도 높은 태스크에서 훈련 불안정성과 치명적인 정확도 저하를 겪는 문제를 분석하고, 이를 극복할 수 있는 강력한 **FP8 RL 훈련 프레임워크** 를 제시하는 것이 목표입니다.

## 핵심 방법론
제안하는 **Jet-RL** 프레임워크는 훈련과 롤아웃 모두에 **통일된 FP8 정밀도 플로우** 를 적용하여 수치적 불일치를 최소화하고 on-policy RL 훈련을 안정화합니다. 이를 위해, 포워드(FProp), 백워드(WGrad, DGrad) 연산에 사용되는 모든 **GEMM(General Matrix Multiply)** 연산을 **FP8 정밀도** 로 양자화하며, 활성화(activations)와 가중치(weights)에 대해 **mixed per-group 및 per-block 양자화** 방식을 채택합니다. 그래디언트(gradients)는 모델 정확도를 유지하기 위해 **BF16 정밀도** 를 사용하며, **VLLM** 과 **VeRL** 을 활용하여 효율적인 구현을 달성합니다.

## 주요 결과
Jet-RL은 BF16 훈련 대비 **롤아웃 단계에서 최대 33% (32B 모델)** , **훈련 단계에서 최대 41% (8B 모델)** , 그리고 **종단 간(end-to-end) 16% (8B 모델)** 의 속도 향상을 달성했습니다. 모든 설정에서 안정적인 수렴을 유지하며, BF16 베이스라인 대비 **1% 미만의 정확도 저하** 만을 보였습니다. 특히, 기존 BF16-train + FP8-rollout 방법론이 보인 **9.8% ~ 10.3%** 의 성능 저하를 크게 줄여 BF16과 유사한 성능을 나타냈습니다.

## AI 실무자를 위한 시사점
Jet-RL은 LLM의 강화 학습 훈련에서 **FP8 양자화** 를 효과적으로 적용하여 계산 효율성을 획기적으로 개선할 수 있는 실용적인 방안을 제시합니다. 이는 대규모 RL 훈련의 **리소스 제약** 을 완화하고, 개발 주기를 단축하며, 특히 긴 롤아웃 및 복잡한 추론 태스크에서 **훈련 안정성** 을 확보하는 데 기여합니다. AI 엔지니어는 Jet-RL을 통해 FP8 기반의 고성능 RL 훈련을 구축하여 LLM의 추론 능력을 강화할 수 있을 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.