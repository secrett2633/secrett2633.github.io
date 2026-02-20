---
title: "[논문리뷰] ScaleDiff: Scaling Difficult Problems for Advanced Mathematical
  Reasoning"
excerpt: "Yu Li이 arXiv에 게시한 'ScaleDiff: Scaling Difficult Problems for Advanced Mathematical
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mathematical Reasoning
  - Large Reasoning Models (LRMs)
  - Difficulty Scaling
  - Data Augmentation
  - Supervised Fine-Tuning (SFT)
  - Problem Generation
  - Solution Distillation

permalink: /ai/review/2025-9-26-ScaleDiff-Scaling-Difficult-Problems-for-Advanced-Mathematical-Reasoning/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21070)

**저자:** Qizhi Pei, Zhuoshi Pan, Honglin Lin, Xin Gao, Yu Li, Zinan Tang, Conghui He, Rui Yan, Lijun Wu



## 핵심 연구 목표
본 논문은 복잡한 추론 능력을 향상시키기 위해 **어려운 수학 문제** 의 생성을 확장하는 효율적인 파이프라인인 **ScaleDiff** 를 제안합니다. 기존의 문제 생성 방식이 높은 비용, 복잡한 프롬프트 엔지니어링, 그리고 제한적인 난이도 수준으로 인해 확장성이 부족하다는 한계를 극복하고자 합니다.

## 핵심 방법론
ScaleDiff는 먼저 **AdaptThink 모델** 을 사용하여 기존 데이터셋에서 단일 순방향 패스만으로 어려운 문제를 효율적으로 식별합니다. 이어서 식별된 어려운 문제들을 기반으로 **DiffGen-8B** 라는 전문적인 문제 생성기를 훈련하여 대규모의 새로운 어려운 문제들을 생성합니다. 생성된 문제들의 해답은 비용 효율적인 **Qwen3-8B 모델** 을 교사 모델로 사용하여 긴 **CoT(Chain of Thought)** 방식으로 증류하고, 최종적으로 **규칙 및 모델 필터링** 을 거쳐 고품질의 **ScaleDiff-Math 데이터셋** 을 구축합니다.

## 주요 결과
**ScaleDiff-Math 데이터셋** 으로 **Qwen2.5-Math-7B-Instruct** 를 미세 조정했을 때, 원본 데이터셋 대비 **11.3%** 의 상당한 성능 향상을 보였으며, AIME'24, AIME'25, HMMT-Feb'25 등 벤치마크에서 **65.9%** 의 평균 정확도를 달성하며 OpenThinker3와 같은 강력한 LRM들을 능가했습니다. 특히, 어려운 문제의 양이 증가함에 따라 모델 성능이 비례하여 향상되는 명확한 **스케일링 현상** 이 관찰되었습니다.

## AI 실무자를 위한 시사점
ScaleDiff는 복잡한 추론 문제를 해결하는 LRM의 성능을 향상시키기 위한 **실용적이고 일반화 가능한 데이터 확장 전략** 을 제공합니다. 특히 **Qwen3-8B** 와 같은 비용 효율적인 모델을 교사로 활용하여 고급 추론 능력을 전이시킬 수 있음을 보여주었으며, 이는 고품질의 학습 데이터가 부족한 도메인에서 모델 개선에 큰 도움이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.