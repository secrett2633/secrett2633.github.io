---
title: "[논문리뷰] Morae: Proactively Pausing UI Agents for User Choices"
excerpt: "Amy Pavel이 arXiv에 게시한 'Morae: Proactively Pausing UI Agents for User Choices' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - UI Agents
  - Accessibility
  - Human-Agent Interaction
  - Mixed-Initiative AI
  - Large Multimodal Models
  - Proactive AI
  - User Choice
  - Blind and Low-Vision Users

permalink: /ai/review/2025-9-1-Morae-Proactively-Pausing-UI-Agents-for-User-Choices/

toc: true
toc_sticky: true

date: 2025-09-01 13:14:34+0900
last_modified_at: 2025-09-01 13:14:34+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21456)

**저자:** Yi-Hao Peng, Dingzeyu Li, Jeffrey P. Bigham, Amy Pavel



## 핵심 연구 목표
본 논문은 기존 UI 에이전트들이 맹인 및 저시력(BLV) 사용자들에게 중요한 의사결정 시 선택권을 주지 않고 자동으로 작업을 완료하여 사용자 주도성을 저해하는 문제를 해결하고자 합니다. Morae는 BLV 사용자가 UI 자동화 과정에서 적극적으로 선호를 표현하고 선택할 수 있도록, 핵심 의사결정 지점에서 **자동화를 선제적으로 일시 중지** 하는 것을 목표로 합니다.

## 핵심 방법론
Morae는 **대규모 멀티모달 모델(LMMs, 예: GPT-40)** 을 활용하여 UI 코드, 스크린샷, 사용자 질의를 해석하고, **동적 모호성 검증 알고리즘** 을 통해 자동화 중 의사결정 지점을 식별합니다. 모호성이 감지되면 **"self-ask-then-answer" 검증 전략** 을 사용하여 자동화를 일시 중지하고, 사용자 선호도를 포착하기 위해 **동적으로 UI를 생성** 하여 선택지를 제시합니다. 또한, BLV 사용자를 위한 **실시간 청각 피드백** 을 제공하여 진행 상황에 대한 인지도를 높입니다.

## 주요 결과
Morae는 기존 **OpenAI Operator** 대비 **55.2%** 의 가장 높은 평균 작업 성공률을 달성했으며, 특히 일시 중지가 필요한 작업에서 성공률을 **50.8%에서 65.6%** 로 크게 향상시켰습니다. 사용자 평가는 Morae가 TaxyAI 및 Operator에 비해 유용성( **μ = 6.50** ), 선택에 대한 통제력, 선택의 용이성 등에서 유의미하게 높은 점수를 받았음을 보여줍니다. 또한, 사용자의 선호도에 따른 선택 비율인 결정 엔트로피( **De = 1.58** )가 다른 에이전트보다 높아 사용자 선택의 다양성과 자율성이 높았음을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 단순히 작업 완료율을 넘어 **사용자 주도성과 신뢰** 를 중요시하는 **혼합 주도형(mixed-initiative) AI 에이전트** 의 설계 방향을 제시합니다. 특히 **접근성(accessibility)** 분야에서 BLV 사용자와 같은 소외된 집단을 위한 AI 에이전트의 실용적 가치를 강조합니다. AI/ML 엔지니어는 모델이 사용자의 미묘한 의도를 파악하고, 필요한 경우 적극적으로 개입하여 사용자에게 선택권을 주는 **'공동 작업자'로서의 에이전트** 개발에 초점을 맞춰야 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.