---
title: "[논문리뷰] InfiGUI-G1: Advancing GUI Grounding with Adaptive Exploration Policy
  Optimization"
excerpt: "Pengxiang Li이 [arXiv]에 게시한 'InfiGUI-G1: Advancing GUI Grounding with Adaptive Exploration Policy
  Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Grounding
  - MLLMs
  - Reinforcement Learning
  - Policy Optimization
  - Exploration Strategy
  - Semantic Alignment
  - Adaptive Exploration Reward
  - Human-Computer Interaction

permalink: /ai/review/2025-8-11-InfiGUI-G1_Advancing_GUI_Grounding_with_Adaptive_Exploration_Policy_Optimization/

toc: true
toc_sticky: true

date: 2025-08-11 13:13:28+0900
last_modified_at: 2025-08-11 13:13:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.05731)

**저자:** Yuhang Liu, Zeyu Liu, Shuanghe Zhu, Pengxiang Li, Congkai Xie, Jiasheng Wang, Xavier Hu, Xiaotian Han, Jianbo Yuan, Xinyao Wang, Shengyu Zhang, Hongxia Yang, Fei Wu



## 핵심 연구 목표
본 논문은 **MLLM(Multimodal Large Language Model) 기반 GUI 에이전트**의 핵심 과제인 **자연어 지시문 GUI Grounding**에서 **의미론적 정렬(Semantic Alignment)**의 비효율적인 탐색 문제 해결을 목표로 합니다. 기존 **RLVR(Reinforcement Learning with Verifiable Rewards)** 방법론의 한계인 '확신 함정(confidence trap)'으로 인해 발생하는 어려운 의미론적 연관성 학습의 병목 현상을 극복하고자 합니다.

## 핵심 방법론
논문은 **Adaptive Exploration Policy Optimization (AEPO)** 프레임워크를 제안하며, 이는 **Multi-Answer Generation** 전략으로 넓은 탐색을 유도합니다. 탐색 효율성(η = U/C)에 기반한 **Adaptive Exploration Reward (AER)** 함수를 통해 실패 시 탐색을 장려하고 성공 시 수렴을 촉진합니다. 더불어, **Collinear Penalty**를 적용하여 비효율적인 동선(near-collinear outputs)을 제한하고 진정한 의미론적 다양성을 보장합니다. **RLOO(Reinforce Leave-One-Out)** 알고리즘을 사용하여 **Qwen2.5-VL-3B-Instruct** 및 **Qwen2.5-VL-7B-Instruct** 모델을 훈련했습니다.

## 주요 결과
제안된 **InfiGUI-G1-3B** 및 **InfiGUI-G1-7B** 모델은 **MMBench-GUI, ScreenSpot-Pro, UI-Vision, UI-I2E-Bench, ScreenSpot-v2** 등 여러 GUI Grounding 벤치마크에서 SoTA(State-of-the-Art) 성능을 달성했습니다. 특히, 일반화 및 의미 이해 벤치마크에서 **Naive RLVR** 대비 최대 **9.0%**의 유의미한 상대적 성능 향상을 기록했습니다. **ScreenSpot-Pro**의 'hard' 샘플에서 **7B 모델**은 **Naive RLVR** 대비 **61.1%**의 현저한 상대적 개선을 보였습니다.

## AI 실무자를 위한 시사점
**InfiGUI-G1**은 **MLLM 기반 GUI 에이전트**의 **의미론적 정렬** 문제에 대한 효과적인 해결책을 제시하며, **데이터 효율성**을 높여 대규모 레이블링 데이터 없이도 높은 성능을 달성할 수 있음을 보여줍니다. **다중 응답 생성**과 **적응형 보상 함수**는 비효율적인 탐색 문제를 해결하고 **복잡한 GUI 태스크**에서 모델의 학습 능력을 크게 향상시킵니다. 이는 실제 **GUI 자동화** 및 **지능형 에이전트 개발** 시 탐색 전략과 보상 함수 설계의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.