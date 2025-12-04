---
title: "[논문리뷰] OneThinker: All-in-one Reasoning Model for Image and Video"
excerpt: "Kaixuan Fan이 [arXiv]에 게시한 'OneThinker: All-in-one Reasoning Model for Image and Video' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Reinforcement Learning
  - Visual Reasoning
  - Generalist Model
  - Image Understanding
  - Video Understanding
  - Multitask Learning
  - EMA-GRPO

permalink: /ai/review/2025-12-04-OneThinker-All-in-one-Reasoning-Model-for-Image-and-Video/

toc: true
toc_sticky: true

date: 2025-12-04 00:00:00+0900+0900
last_modified_at: 2025-12-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.03043)

**저자:** Kaituo Feng, Manyuan Zhang, Hongyu Li, Kaixuan Fan, et al.



## 핵심 연구 목표
기존 MLLM(Multimodal Large Language Models)이 단일 태스크나 단일 모달리티(이미지 또는 비디오)에 국한되는 한계를 넘어, **이미지와 비디오 이해를 아우르는 다양한 시각 태스크를 동시에 처리할 수 있는 범용적인 추론 모델** 인 **"All-in-one multimodal reasoning generalist"** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
다양한 시각 추론 태스크를 포괄하는 **OneThinker-600k 데이터셋** 을 구축하고, **Seed1.5-VL [16]** 을 활용하여 CoT(Chain-of-Thought) 주석이 달린 **OneThinker-SFT-340k 데이터셋** 을 생성하여 SFT(Supervised Fine-Tuning)를 수행했습니다. 이어서 **EMA-GRPO (Exponential Moving Average - Group Relative Policy Optimization)** 라는 새로운 RL(Reinforcement Learning) 알고리즘을 도입하여 태스크별 보상 통계의 적응적 정규화를 통해 태스크 내 및 태스크 간 불균형을 해결했습니다. 모든 태스크는 **`<think>...</think>`와 `<answer>...</answer>` 태그를 포함하는 통합 텍스트 인터페이스** 로 변환됩니다.

## 주요 결과
**OneThinker-8B** 는 이미지 QA에서 **MMMU 벤치마크에서 70.6% 정확도** , 비디오 QA에서 **VideoMMMU 벤치마크에서 66.2% 정확도** 를 달성하는 등 31개 벤치마크와 10개 핵심 시각 이해 태스크에서 일관되게 우수한 성능을 보였습니다. 특히 **GOT-10k 트래킹 벤치마크에서 73.0 AO, 84.4 R@0.5** 를 기록했으며, **RefCOCO 이미지 분할에서 75.8 cIoU** , **MeViS 비디오 분할에서 52.7 J&F** 로 기존 모델을 능가했습니다. 또한 **MMT-Bench** 의 미학습 태스크에서 **Qwen3-VL-Instruct-8B** 대비 향상된 **제로샷 일반화 능력** 을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 다양한 시각 태스크와 모달리티를 통합 처리하는 **범용 AI 모델의 실현 가능성** 을 제시하여, AI 개발 및 배포의 복잡성을 줄일 수 있습니다. 특히 **EMA-GRPO** 는 이질적인 보상 분포를 가진 멀티태스크 RL 학습에 효과적인 전략을 제공하여 복잡한 시각-언어 모델 학습의 안정성을 높입니다. 구축된 **대규모 CoT 데이터셋** 은 향후 범용 MLLM 연구 및 개발에 중요한 자원이 될 것이며, **제로샷 일반화 능력** 은 새로운 시나리오에 대한 모델의 적응력을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.