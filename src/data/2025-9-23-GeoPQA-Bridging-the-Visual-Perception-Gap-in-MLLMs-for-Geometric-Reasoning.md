---
title: "[논문리뷰] GeoPQA: Bridging the Visual Perception Gap in MLLMs for Geometric
  Reasoning"
excerpt: "Hou Pong Chan이 [arXiv]에 게시한 'GeoPQA: Bridging the Visual Perception Gap in MLLMs for Geometric
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Geometric Reasoning
  - Visual Perception
  - Reinforcement Learning (RL)
  - Two-stage Training
  - GeoPQA Benchmark
  - Perceptual Bottleneck

permalink: /ai/review/2025-9-23-GeoPQA-Bridging-the-Visual-Perception-Gap-in-MLLMs-for-Geometric-Reasoning/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17437)

**저자:** Guizhen Chen, Weiwen Xu, Hao Zhang, Hou Pong Chan, Deli Zhao, Anh Tuan Luu, Yu Rong



## 핵심 연구 목표
본 논문은 멀티모달 대규모 언어 모델(MLLM)이 기하학적 추론과 같은 시각 집중 태스크에서 자주 발생하는 **환각 현상**과 부정확한 추론 문제를 해결하고자 합니다. 이러한 문제의 근본 원인인 **MLLM의 시각적 인지 병목 현상**을 정량화하고, 이를 극복하여 추론 훈련의 효과를 극대화하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 MLLM의 기하학적 인지 능력을 평가하기 위해 **Geo-Perception Question-Answering (GeoPQA) 벤치마크**를 개발했습니다. 이 병목 현상을 해결하기 위해 **두 단계 RL 훈련 프레임워크**를 제안합니다. 첫 번째 단계에서는 **GeoPQA 데이터셋**을 활용하여 기하학적 구조에 대한 모델의 **시각적 인지 능력**을 강화하고, 두 번째 단계에서는 이 향상된 인지 기반 위에서 복잡한 **기하학적 추론 능력**을 집중적으로 훈련합니다.

## 주요 결과
**GeoPQA 벤치마크** 평가 결과, **GPT4o**와 같은 최신 MLLM조차 인간의 90% 이상 정확도와 달리 기본적인 시각적 인지 질문에서 상당한 결함을 보였습니다. 제안된 두 단계 훈련 방식은 **Qwen2.5-VL-3B-Instruct** 모델의 기하학적 추론 성능을 **9.7%**, 기하학적 문제 해결 성능을 **9.1%** 향상시켰습니다. 특히 **Qwen2.5-VL-7B-Instruct**에 적용 시, 기하학적 추론 **76.2%**, 기하학적 문제 해결 **79.8%**의 성능을 달성하여 **GPT-4o**의 성능을 넘어섰습니다.

## AI 실무자를 위한 시사점
MLLM의 고수준 추론 능력은 모델의 근본적인 **시각적 인지 능력**에 의해 상한선이 결정됨을 강조합니다. 따라서 AI 실무자들은 추론 모델을 개발할 때 **데이터 증강**이나 복잡한 알고리즘 이전에 **정확한 시각적 인지 기반**을 구축하는 데 집중해야 합니다. 제안된 두 단계 접근 방식은 **기초적인 시각 인지 훈련**이 복잡한 멀티모달 추론 태스크의 성능을 향상시키는 데 필수적임을 시사하며, 이는 다양한 비전-집중 도메인으로 확장될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.