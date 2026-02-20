---
title: "[논문리뷰] V-REX: Benchmarking Exploratory Visual Reasoning via Chain-of-Questions"
excerpt: "Kwesi Cobbina이 arXiv에 게시한 'V-REX: Benchmarking Exploratory Visual Reasoning via Chain-of-Questions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Reasoning
  - Multi-step Exploration
  - Chain-of-Questions (CoQ)
  - Vision-Language Models (VLMs)
  - Benchmarking
  - Planning
  - Following

permalink: /ai/review/2025-12-16-V-REX-Benchmarking-Exploratory-Visual-Reasoning-via-Chain-of-Questions/

toc: true
toc_sticky: true

date: 2025-12-16 00:00:00+0900+0900
last_modified_at: 2025-12-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.11995)

**저자:** Chenrui Fan, Yijun Liang, Shweta Bhardwaj, Kwesi Cobbina, Ming Li, Tianyi Zhou



## 핵심 연구 목표
본 논문은 기존 VLM이 복잡하고 개방형인 시각 추론 태스크에서 다단계 탐색 및 동적 계획 수립에 어려움을 겪는 문제를 해결하고자 합니다. 대규모 탐색 공간으로 인해 평가하기 어려운 VLM의 탐색적 시각 추론 능력을 정량적으로 평가하기 위한 벤치마크 ( **V-REX** ) 및 평가 프로토콜을 개발하는 것을 목표로 합니다.

## 핵심 방법론
V-REX는 다단계 탐색적 추론 과정을 상호 연결된 하위 질문과 답변의 연속인 **Chain-of-Questions (CoQ)** 으로 개념화합니다. VLM의 역량을 **(1) Planning** : 원본 질문에 답하기 위한 탐색적 질문 체인을 동적으로 선택하는 능력, **(2) Following** : 큐레이션된 CoQ에 순차적으로 답하는 능력으로 분리하여 평가합니다. 벤치마크는 **702개 샘플** 과 **2,504개 질문** 으로 구성되며, 각 샘플은 **2~6단계 추론(평균 3.57단계)** 을 포함합니다. **GPT-5** 를 활용하여 Planning 태스크의 Distractor 질문을 생성합니다.

## 주요 결과
CoQ 힌트가 제공될 때 VLM은 최종 질문에서 일관되게 **더 나은 성능(Figure 5에서 양의 성능 변화 비율)** 을 달성하여 탐색의 중요성을 입증했습니다. 모델 크기가 커질수록 성능이 향상되는 **스케일링 법칙** 이 확인되었으나, **Following 능력** 은 Planning 능력에 비해 동등한 크기의 모델 간 분산이 적었습니다. **Planning (Pearson r = 0.858)** 및 **Following (Pearson r = 0.948)** 능력 모두 모델의 전반적인 성능과 양의 상관관계를 보였습니다. 또한, VLM은 **실패한 Planning 단계에서 회복하는 능력(>10B 모델의 경우 65.9%-84.3%)** 이 실패한 Following 단계에서 회복하는 능력(>10B 모델의 경우 45.6%-63.2%)보다 우수했습니다 ( **Table 2** ).

## AI 실무자를 위한 시사점
본 연구는 VLM이 실제 복잡한 시각 추론 문제를 해결하기 위해 **탐색적 추론 능력** , 특히 효과적인 **계획 수립(Planning)** 이 필수적임을 강조합니다. **CoQ 프레임워크** 는 VLM의 다단계 추론 과정을 세밀하게 진단하고, **계획 및 추론 능력** 을 분리하여 평가하는 효과적인 도구를 제공합니다. 현재 VLM은 **Following** 능력에 비해 **Planning** 능력에서 개선의 여지가 크므로, 동적 질문 생성 및 전략적 탐색 능력을 향상시키는 연구 개발이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.