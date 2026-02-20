---
title: "[논문리뷰] When Explainability Meets Privacy: An Investigation at the Intersection
  of Post-hoc Explainability and Differential Privacy in the Context of Natural
  Language Processing"
excerpt: "Gjergji Kasneci이 arXiv에 게시한 'When Explainability Meets Privacy: An Investigation at the Intersection
  of Post-hoc Explainability and Differential Privacy in the Context of Natural
  Language Processing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Natural Language Processing (NLP)
  - Explainable AI (XAI)
  - Post-hoc Explainability
  - Differential Privacy (DP)
  - Privacy-Utility Trade-off
  - Model Faithfulness
  - Text Privatization

permalink: /ai/review/2025-8-15-2025-8-15-Explainability-and-Privacy-in-NLP/

toc: true
toc_sticky: true

date: 2025-08-15 13:09:31+0900
last_modified_at: 2025-08-15 13:09:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.10482)

**저자:** Mahdi Dhaini, Stephen Meisenbacher, Ege Erdogan, Florian Matthes, Gjergji Kasneci



## 핵심 연구 목표
이 논문은 NLP 분야에서 **사후 설명 가능성(Post-hoc Explainability)** 과 **차등 프라이버시(Differential Privacy)** 의 교차점을 탐구하며, 프라이버시와 설명 가능성 달성의 동시 가능성 및 그들 사이의 상충 관계를 이해하는 것을 목표로 합니다. 특히, 데이터 수준 프라이버시 보장이 모델의 유틸리티와 설명 품질에 미치는 영향을 정량적으로 분석하고자 합니다.

## 핵심 방법론
연구는 세 가지 **차등 프라이버시 텍스트 재작성 방법론** ( **TEM** , **DP-PROMPT** , **DP-BART** )을 사용하여 데이터를 비공개화하고, 이를 **BERT** 및 **RoBERTa** 와 같은 **인코더 전용 언어 모델** 에 fine-tuning합니다. 모델의 설명 가능성은 **Gradient** , **Integrated Gradient** , **SHAP** , **LIME** 네 가지 **사후 특징 기여도 방법** 을 사용하여 평가되며, 유틸리티(F1 점수)와 설명 가능성을 균형 잡는 **복합 점수(Composite Score)** 를 통해 성능을 측정합니다.

## 주요 결과
**DP-BART-1500** 및 **DP-PROMPT-165** 는 유틸리티와 설명 가능성 사이에서 가장 유리한 절충점을 제공하며, 특정 시나리오에서는 비공개화하지 않은 기준선보다 높은 복합 점수를 달성했습니다. **LIME** 과 **SHAP** 은 특히 강한 프라이버시 제약 조건에서 **Gradient** 및 **Integrated Gradient** 보다 우수한 성능을 보였고, **베이스 모델(예: BERT-BASE)** 은 **라지 모델(예: BERT-LARGE)** 보다 복합 점수에서 일관적으로 높은 성능을 보였습니다( **-0.119에서 -0.286** 범위의 **Δ(Large – Base) 값** ).

## AI 실무자를 위한 시사점
AI 실무자는 **프라이버시 제약 조건** 과 **하위 작업의 특성** 에 따라 **DP 방법론** 을 신중하게 선택해야 합니다. 높은 유틸리티와 충실한 설명이 모두 요구되는 경우, **대규모 모델** 보다는 **작은 베이스 모델** 이 더 안정적이고 효과적일 수 있습니다. 또한, **LIME** 과 **SHAP** 은 강한 프라이버시 설정에서도 견고한 설명 성능을 제공하므로, 설명 가능성 요구사항이 높을 때 고려할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.