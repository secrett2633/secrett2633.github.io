---
title: "[논문리뷰] QueST: Incentivizing LLMs to Generate Difficult Problems"
excerpt: "이 [arXiv]에 게시한 'QueST: Incentivizing LLMs to Generate Difficult Problems' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - Problem Generation
  - Competitive Programming
  - Synthetic Data
  - Difficulty Estimation
  - Rejection Fine-tuning
  - Graph Sampling

permalink: /ai/review/2025-10-21-QueST_Incentivizing_LLMs_to_Generate_Difficult_Problems/

toc: true
toc_sticky: true

date: 2025-10-21 13:08:30+0900
last_modified_at: 2025-10-21 13:08:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17715)

**저자:** Hanxu Hu, Xingxing Zhang, Jannis Vamvas, Rico Sennrich, Furu Wei



## 핵심 연구 목표
본 논문은 LLM 학습에 있어 인간이 주석을 단 고품질의 어려운 코딩 문제 데이터셋이 부족하여 확장성이 제한되는 문제를 해결하고자 합니다. 특히, LLM 생성기가 더욱 도전적인 경쟁 프로그래밍 문제를 효과적으로 생성하도록 유도하는 새로운 프레임워크인 **QueST**를 제안합니다.

## 핵심 방법론
**QueST**는 **난이도 인식 그래프 샘플링(difficulty-aware graph sampling)**과 **난이도 인식 리젝션 미세 조정(difficulty-aware rejection fine-tuning)**을 결합합니다. 문제 난이도는 후보 솔루션의 **평균 다수결 투표율(average majority voting rate)**을 기반으로 추정되며, 가장 어려운 문제만 선택하여 생성기를 미세 조정합니다. 또한, 개념 그래프 구성 시 인간이 주석을 단 문제 난이도 정보가 통합됩니다.

## 주요 결과
**QueST**는 **10만 개**의 어려운 코딩 문제를 생성했습니다. **QueST-8B** 모델은 (10만 개의 합성 데이터와 11.2만 개의 인간 작성 문제 기반으로 훈련) **LiveCodeBench**에서 동급 모델 중 최첨단 성능을 달성하며, 훨씬 큰 **DeepSeek-R1-671B** 모델의 성능에 필적합니다. 난이도 인식 샘플링과 리젝션 미세 조정은 문제 생성 성능을 크게 향상시켰습니다 (예: **GPT-4o** 생성기에서 평균 성능이 **34.9%에서 37.5%**로 증가).

## AI 실무자를 위한 시사점
이 연구는 LLM의 추론 능력 향상을 위한 **고품질 합성 데이터**를 확장성 있게 생성하는 방법을 제시합니다. AI/ML 엔지니어는 **QueST** 프레임워크를 활용하여 비용이 많이 드는 인간 주석 작업 없이도 특정 도메인의 어려운 문제를 효과적으로 생성할 수 있습니다. 이는 특히 작은 모델이 대규모 모델에 필적하는 성능을 달성하도록 돕는 **데이터 증강 및 증류(distillation)** 전략에 중요한 기여를 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.