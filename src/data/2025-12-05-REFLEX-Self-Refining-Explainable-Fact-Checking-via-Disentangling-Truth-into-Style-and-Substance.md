---
title: "[논문리뷰] REFLEX: Self-Refining Explainable Fact-Checking via Disentangling Truth into Style and Substance"
excerpt: "Yaxin Fan이 [arXiv]에 게시한 'REFLEX: Self-Refining Explainable Fact-Checking via Disentangling Truth into Style and Substance' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Fact-Checking
  - Explainable AI (XAI)
  - Large Language Models (LLMs)
  - Self-Refinement
  - Latent Space
  - Disentanglement
  - Steering Vectors
  - Misinformation

permalink: /ai/review/2025-12-05-REFLEX-Self-Refining-Explainable-Fact-Checking-via-Disentangling-Truth-into-Style-and-Substance/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20233)

**저자:** Chuyi Kong, Gao Wei, Hongzhan Lin, Jing Ma, Yaxin Fan



## 핵심 연구 목표
소셜 미디어의 가짜 뉴스 확산으로 인한 신뢰 저하 문제를 해결하기 위해, 기존 **LLM 기반** 팩트 체크 시스템의 외부 지식 의존성, 높은 지연 시간, 환각 현상, 낮은 해석 가능성 등의 한계를 극복하는 것을 목표로 합니다. 논문은 **LLM의 내부 지식** 을 활용하여 판정 정확도와 설명 품질을 개선하는 **플러그 앤 플레이 방식** 의 **자체 정련(self-refining)** 패러다임 **REFLEX** 를 제안하며, 진실을 '스타일'과 '실체'로 분리하여 다룹니다.

## 핵심 방법론
**REFLEX** 는 세 가지 주요 단계로 작동합니다. 첫째, 팩트 체크를 **역할극 대화** 로 재구성하여 **판정 예측** 과 **설명 생성** 을 함께 훈련합니다. 둘째, **백본 모델** 과 **파인튜닝된 변형 모델** 간의 **대조적 활성화 쌍(contrastive activation pairs)** 을 **자가 증류(self-distillation)** 를 통해 추출하여 사실 추론이 불일치하는 지점을 식별합니다. 셋째, 이 쌍을 활용해 잠재 공간에서 진실을 **실체(substance)** 와 **스타일(style)** 로 분리하는 **조정 벡터(steering vectors)** 를 생성하고, 이를 통해 추론을 안내하고 잡음이 있는 설명을 억제하여 더 충실하고 효율적인 추론을 가능하게 합니다.

## 주요 결과
**REFLEX** 는 **RAW-FC** 데이터셋에서 단 **465개의 자체 정련된 샘플** 만으로도 외부 API에 의존하는 기존 방법론들을 능가하며 **최첨단 성능** 을 달성했습니다. 특히, 설명적 목표를 가진 모델은 판정 정확도에서 최대 **7.57%** 의 향상을 보였습니다. 중간 계층 활성화에서 가장 큰 확률 차이와 성능 개선을 보였으며, 설명 가독성을 최대 **14%** 까지 향상시켜 효과적인 분리(disentanglement)를 입증했습니다.

## AI 실무자를 위한 시사점
**REFLEX** 는 **LLM의 내부 지식** 을 효과적으로 활용하여 외부 자원에 대한 의존도를 줄임으로써, **실시간 팩트 체크 시스템** 구축에 중요한 지연 시간과 환각 문제를 완화할 수 있습니다. **플러그 앤 플레이** 및 **자체 정련** 특성은 다양한 **LLM 백본** 과 데이터셋에 쉽게 적용 가능하여 **데이터 효율성** 을 높입니다. 진실을 **스타일** 과 **실체** 로 분리하는 접근 방식은 **설명 가능한 AI(XAI)** 분야에서 모델의 해석 가능성과 신뢰성을 높이는 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.