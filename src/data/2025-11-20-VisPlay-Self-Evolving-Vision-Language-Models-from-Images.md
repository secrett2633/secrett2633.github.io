---
title: "[논문리뷰] VisPlay: Self-Evolving Vision-Language Models from Images"
excerpt: "arXiv에 게시된 'VisPlay: Self-Evolving Vision-Language Models from Images' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Self-Evolving
  - Vision-Language Models
  - Reinforcement Learning
  - Self-Play
  - Unlabeled Data
  - Multimodal Reasoning
  - Group Relative Policy Optimization
  - Hallucination Mitigation

permalink: /ai/review/2025-11-20-VisPlay-Self-Evolving-Vision-Language-Models-from-Images/

toc: true
toc_sticky: true

date: 2025-11-20 00:00:00+0900+0900
last_modified_at: 2025-11-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.15661)

**저자:** Yicheng He, Chengsong Huang, Zongxia Li, Jiaxin Huang, Yonghui Yang



## 핵심 연구 목표
본 논문은 인간 주석이나 작업별 휴리스틱 없이, 대규모 비정형 이미지 데이터로부터 **Vision-Language Models (VLMs)** 의 추론 능력을 자율적으로 개선하는 것을 목표로 합니다. 기존 강화 학습(RL) 방식이 지닌 비용과 확장성 한계를 극복하고자 합니다.

## 핵심 방법론
제안된 `VisPlay` 프레임워크는 단일 VLM을 **Image-Conditioned Questioner** 와 **Multimodal Reasoner** 의 두 가지 상호작용 역할로 나눕니다. **Questioner** 는 도전적인 시각적 질문을 생성하고, **Reasoner** 는 은색(silver) 응답을 생성하며, 이들은 **Group Relative Policy Optimization (GRPO)** 을 사용하여 공동 학습됩니다. 보상은 질문 난이도와 답변 품질의 균형을 맞추기 위해 **Pseudo-Label Generation** , **Uncertainty Reward** , **Diversity Regularization** 을 활용합니다.

## 주요 결과
`VisPlay`는 `Qwen2.5-VL-3B-Instruct` 모델의 평균 정확도를 baseline **30.61%** 에서 3차 반복 후 **47.27%** 로 향상시켰습니다. 또한 `HallusionBench`에서 `Qwen2.5-VL-3B`의 환각 점수가 **32.81%** 에서 **94.95%** 로 대폭 개선되었으며, `Qwen2.5-VL-7B` 및 `MiMo-VL-7B` 등 다양한 VLM 모델에서 일관된 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
`VisPlay`는 인간의 개입 없이 비정형 시각 데이터에서 VLM을 지속적으로 개선할 수 있는 확장 가능한 경로를 제공합니다. 이는 비용과 시간이 많이 소요되는 수동 주석의 필요성을 줄여 멀티모달 AI 개발의 효율성을 높일 수 있습니다. **자율적인 질문 생성** 과 **자기 개선 학습** 메커니즘은 복잡한 추론 작업을 위한 새로운 AI 시스템 설계에 영감을 줄 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.