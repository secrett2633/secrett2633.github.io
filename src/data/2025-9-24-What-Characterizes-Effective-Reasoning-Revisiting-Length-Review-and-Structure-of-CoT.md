---
title: "[논문리뷰] What Characterizes Effective Reasoning? Revisiting Length, Review, and
  Structure of CoT"
excerpt: "Anthony Hartshorn이 arXiv에 게시한 'What Characterizes Effective Reasoning? Revisiting Length, Review, and
  Structure of CoT' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Chain-of-Thought
  - Reasoning Effectiveness
  - Large Reasoning Models
  - Failed-Step Fraction
  - Test-time Scaling
  - Reasoning Graph
  - Model Evaluation

permalink: /ai/review/2025-9-24-What-Characterizes-Effective-Reasoning-Revisiting-Length-Review-and-Structure-of-CoT/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19284)

**저자:** Yunzhen Feng, Julia Kempe, Cheng Zhang, Parag Jain, Anthony Hartshorn



## 핵심 연구 목표
본 논문은 대규모 추론 모델(LRMs)에서 효과적인 CoT(Chain-of-Thought) 추론의 특성을 규명하는 것을 목표로 합니다. 특히, 기존의 "길수록 좋다"는 CoT 길이 및 검토(review) 증가 경향에 의문을 제기하고, 추론 과정의 어휘적, 구조적 특성이 정확도에 미치는 영향을 체계적으로 분석하고자 합니다.

## 핵심 방법론
연구팀은 **HARP** 및 **GPQA-Diamond** 데이터셋에 걸쳐 10개 **LRM** 의 CoT 추론을 평가했습니다. CoT 길이와 **Review Ratio** 외에, CoT에서 자동으로 추출된 **추론 그래프** 를 기반으로 **Failed-Step Fraction (FSF)** 이라는 새로운 구조적 메트릭을 도입했습니다. 인과관계를 검증하기 위해 **테스트 시점 선택(test-time selection)** 및 **CoT 편집(controlled CoT editing)** 이라는 두 가지 개입 실험을 수행했습니다.

## 주요 결과
기존의 통념과 달리, 대부분의 모델에서 **CoT 길이** 와 **Review Ratio** 가 길어질수록 **정확도가 낮아지는 일관된 음의 상관관계** 를 발견했습니다. 특히, **Failed-Step Fraction (FSF)** 은 모든 모델과 데이터셋에서 정확도를 예측하는 **가장 강력하고 일관된 지표** 로 나타났으며, **FSF가 낮을수록 정확도가 높았습니다** . **AIME 2025** 에서 **FSF 기반 테스트 시점 선택** 은 무작위 기준선 대비 **5-13%의 정확도 향상** 을 보였고, 오답 CoT에서 **실패한 브랜치를 제거** 했을 때 정확도가 **8-14% 유의미하게 향상** 되었습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 CoT 추론의 성능을 향상시키기 위해 단순히 **CoT의 길이를 늘리거나 검토 횟수를 증가** 시키는 양적 접근보다는 **CoT의 구조적 품질** 에 더 집중해야 합니다. 특히, 모델이 생성하는 추론 과정에서 **실패한 탐색 경로의 비율(FSF)** 을 줄이는 것이 중요하며, **실패한 브랜치를 식별하고 제거** 하는 **구조 인지적 전략** 이 추론 정확도를 크게 개선할 수 있음을 시사합니다. 이는 모델이 이전의 잘못된 시도에 편향되는 것을 방지하고, **더 효율적이고 신뢰성 높은 AI 추론 시스템** 을 개발하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.