---
title: "[논문리뷰] Revisiting the Necessity of Lengthy Chain-of-Thought in Vision-centric Reasoning Generalization"
excerpt: "arXiv에 게시된 'Revisiting the Necessity of Lengthy Chain-of-Thought in Vision-centric Reasoning Generalization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Chain-of-Thought (CoT)
  - Vision-Language Models (VLMs)
  - Visual Reasoning
  - Generalization
  - Supervised Fine-Tuning (SFT)
  - Reinforcement Learning (RL)
  - Grounding CoT
  - Maze Solving

permalink: /ai/review/2025-12-03-Revisiting-the-Necessity-of-Lengthy-Chain-of-Thought-in-Vision-centric-Reasoning-Generalization/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.22586)

**저자:** Yifan Du, Kun Zhou, Yingqian Min, Yue Ling, Wayne Xin Zhao, Youbin Wu



## 핵심 연구 목표
본 논문은 Vision-Language Models (VLMs)에서 일반화 가능한 시각적 추론 능력을 습득하는 데 다양한 **Chain-of-Thought (CoT) 설계 방식** 이 어떻게 영향을 미치는지 체계적으로 분석하는 것을 목표로 합니다. 특히, 길고 시각적인 CoT가 항상 더 나은 일반화된 추론을 이끄는지에 대한 기존 가설에 의문을 제기하며, 특정 CoT 디자인이 일반화 가능한 추론을 실제로 지원하는 메커니즘을 규명하고자 합니다.

## 핵심 방법론
연구는 제어된 **미로 해결 벤치마크** 를 중심으로 진행되었으며, **Qwen2.5-VL-7B** 모델을 기반으로 **SFT-then-RL 훈련 파이프라인** 을 사용했습니다. 세 가지 대표적인 CoT 형식, 즉 **Language CoT** , **Grounding CoT (좌표 궤적 포함)** , 그리고 **Visual CoT (이미지 조작 포함)** 를 비교했으며, 특히 Grounding CoT 내에서 최소한의 접지 정보만을 포함하는 **G-CoT-least** 변형을 탐구했습니다.

## 주요 결과
실험 결과, Visual CoT와 더 긴 CoT는 훈련 수렴을 가속화하지만, 최종 성능 상한을 크게 높이지는 못하는 것으로 나타났습니다. 핵심적으로, 필수적인 접지 정보만 포함하는 **간결한 CoT (G-CoT-least)** 가 더 긴 트레이스를 능가하며, 다른 미로 크기에 걸쳐 **가장 강력한 일반화 성능** 을 보였습니다. 예를 들어, 다른 시각적 추론 태스크에서 **G-CoT-least RL** 은 Frozenlake에서 **90.33%** , Jigsaw에서 **75.60%** 의 높은 정확도를 달성하여 기준 모델 및 다른 CoT 방식보다 우수했습니다.

## AI 실무자를 위한 시사점
본 연구는 시각적 추론 모델의 **일반화 가능한 SFT 데이터셋 구축** 에 대한 실질적인 지침을 제공합니다. "short is long" 효과는 간결하면서도 잘 접지된(well-grounded) 감독이 과도하게 상세한 트레이스보다 **재사용 가능한 시각적 추론 패턴** 을 학습하는 데 더 효과적임을 시사합니다. 이는 모델이 명시적인 좌표 시스템에 의존하기보다 잠재적인 공간 표현을 통해 추론하는 능력을 개발하도록 장려합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.