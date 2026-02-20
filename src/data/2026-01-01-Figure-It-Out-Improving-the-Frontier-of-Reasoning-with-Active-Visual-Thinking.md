---
title: "[논문리뷰] Figure It Out: Improving the Frontier of Reasoning with Active Visual Thinking"
excerpt: "Jie Zhou이 arXiv에 게시한 'Figure It Out: Improving the Frontier of Reasoning with Active Visual Thinking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Visual Thinking
  - Reinforcement Learning
  - Code Generation
  - Geometric Reasoning
  - Adaptive Reward Mechanism
  - Problem Solving

permalink: /ai/review/2026-01-01-Figure-It-Out-Improving-the-Frontier-of-Reasoning-with-Active-Visual-Thinking/

toc: true
toc_sticky: true

date: 2026-01-01 00:00:00+0900+0900
last_modified_at: 2026-01-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.24297)

**저자:** Meiqi Chen, Fandong Meng, Jie Zhou



## 핵심 연구 목표
본 논문은 텍스트 전용 추론 모델이 암묵적인 공간 및 기하학적 관계를 파악하는 데 어려움을 겪는 복잡한 추론 문제의 한계를 해결하고자 합니다. 기존 멀티모달 모델의 시각적 부정확성 및 도구 사용의 제약에서 벗어나, 능동적인 시각적 사고를 추론 과정에 통합하여 글로벌 구조적 속성에 대한 보다 안정적이고 일관된 추론을 가능하게 하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **FIGR** 이라는 새로운 프레임워크를 제안하며, 이는 다중 턴 추론 루프 내에서 텍스트 추론과 실행 가능한 코드 생성을 번갈아 수행합니다. 모델은 Python과 같은 프로그래밍 언어로 시각적 다이어그램을 생성하는 코드를 출력하고, 이 코드는 샌드박스 인터프리터를 통해 실행되어 시각적 피드백(렌더링된 이미지)을 제공합니다. 특히, **적응형 보상 메커니즘(Adaptive Reward Mechanism)** 을 도입하여 시각적 추론의 필요성과 코드 실행의 성공 여부에 따라 보상을 조절하며, **GRPO(Group Relative Policy Optimization) 알고리즘** 을 통해 모델을 강화 학습합니다.

## 주요 결과
**FIGR** 는 7가지 수학 추론 벤치마크에서 평균 **73.45%** 의 정확도를 달성하여, 기준 모델인 **Qwen3-VL-32B-Instruct** 대비 **6.90%** 의 상당한 성능 향상을 보였습니다. 특히 **AIME 2025** 에서는 **13.12%** , **BeyondAIME** 에서는 **11.00%** 개선이라는 인상적인 결과를 기록했습니다. 이는 시각적 피드백이 텍스트 전용 추론으로는 얻기 어려운 구조적으로 새로운 정보를 제공하며, 모델의 추론 안정성과 문제 해결 능력을 향상시켰음을 입증합니다.

## AI 실무자를 위한 시사점
**FIGR** 는 복잡한 기하학적, 공간적 또는 구조적 추론이 요구되는 AI 시스템 개발 시 **능동적인 시각적 사고 통합** 의 중요성을 강조합니다. 단순히 이미지를 입력으로 활용하는 것을 넘어, **실행 가능한 코드 기반의 동적인 시각화 생성** 및 그 피드백을 추론 과정에 반영하는 접근 방식은 AI 모델의 **안정성과 해석 가능성** 을 크게 향상시킬 수 있습니다. 이는 특히 대규모 언어 모델에 **외부 도구 사용(Tool-Augmented)** 과 **강화 학습(Reinforcement Learning)** 을 결합하여 모델이 시각적 추론을 자율적으로 활용하게 하는 새로운 개발 패러다임을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.