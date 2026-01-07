---
title: "[논문리뷰] CogFlow: Bridging Perception and Reasoning through Knowledge Internalization for Visual Mathematical Problem Solving"
excerpt: "Tao Feng이 [arXiv]에 게시한 'CogFlow: Bridging Perception and Reasoning through Knowledge Internalization for Visual Mathematical Problem Solving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Visual Reasoning
  - Mathematical Problem Solving
  - Knowledge Internalization
  - Reinforcement Learning
  - Cognitive-Inspired AI
  - Perception-Reasoning Alignment

permalink: /ai/review/2026-01-07-CogFlow-Bridging-Perception-and-Reasoning-through-Knowledge-Internalization-for-Visual-Mathematical-Problem-Solving/

toc: true
toc_sticky: true

date: 2026-01-07 00:00:00+0900+0900
last_modified_at: 2026-01-07 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.01874)

**저자:** Shuhang Chen, Yunqiu Xu, Junjie Xie, Aojun Lu, Tao Feng, Zeying Huang, Ning Zhang, Yi Sun, Yi Yang, Hangjie Yuan



## 핵심 연구 목표
기존 **Multimodal Large Language Models (MLLMs)** 이 시각적 수학 문제 해결에서 낮은 정확도와 일관성 없는 추론을 보이는 문제를 해결하는 것이 목표입니다. 특히, 시각적 정보 추출 후 이 정보가 추론 과정에 충실히 통합되고 활용되는지를 보장하지 못하는 한계를 극복하고자 합니다.

## 핵심 방법론
논문은 인간의 추론 과정을 모방한 **인지 기반 3단계 프레임워크인 COGFLOW** 를 제안합니다: **인지(perception) ⇒ 내면화(internalization) ⇒ 추론(reasoning)** . 각 단계는 다음과 같이 강화됩니다. 인지 단계에서는 **Synergistic Visual Rewards (SynVRs)** 를 도입하여 기하학적 정밀도와 전역적 시각적 일관성을 동시에 최적화합니다. 내면화 단계에서는 **Knowledge Internalization Reward (IntlzR)** 모델을 통해 인지된 시각적 단서들이 추론에 적합한 구조화된 지식으로 전환되도록 유도합니다. 추론 단계에서는 **Visual-Gated Policy Optimization (VGPO)** 알고리즘을 사용하여 추론이 시각적 지식에 기반하도록 강제하고, **MATHCOG** 라는 **120K개 이상의 고품질 주석이 달린** 새로운 데이터셋을 구축하여 모델 훈련에 활용합니다.

## 주요 결과
**COGFLOW** 는 다양한 시각적 수학 추론 벤치마크에서 기존 **MLLMs** 를 크게 능가하는 성능을 보였습니다. 특히, **FlowVerse** 에서 **66.0%** , **MathVerse** 에서 **53.9%** , **MathVista** 에서 **76.8%** 의 정확도를 달성했으며, **Vision Dense** 와 같은 시각 정보 의존도가 높은 하위 세트에서는 **42.7%** 의 높은 개선을 보였습니다. 제안된 모든 구성 요소는 전반적인 성능 향상에 기여했으며, 특히 **VGPO** 가 가장 큰 영향을 미쳤습니다.

## AI 실무자를 위한 시사점
**COGFLOW** 는 시각적 인식과 추론 사이의 중요한 간극인 '추론 드리프트' 문제를 해결하기 위한 실용적인 프레임워크를 제공합니다. **Synergistic Visual Rewards** 와 **Knowledge Internalization Reward** 는 복잡한 시각-언어 태스크에서 모델의 강건성과 해석 가능성을 높이는 데 활용될 수 있습니다. 특히, **MATHCOG** 데이터셋은 정교하게 주석이 달린 시각적 수학 문제 해결 데이터를 제공하여, 시각 기반 추론 모델 개발 및 평가에 귀중한 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.