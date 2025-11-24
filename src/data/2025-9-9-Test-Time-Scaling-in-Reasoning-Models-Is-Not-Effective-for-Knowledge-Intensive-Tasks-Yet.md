---
title: "[논문리뷰] Test-Time Scaling in Reasoning Models Is Not Effective for
  Knowledge-Intensive Tasks Yet"
excerpt: "See-Kiong Ng이 [arXiv]에 게시한 'Test-Time Scaling in Reasoning Models Is Not Effective for
  Knowledge-Intensive Tasks Yet' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Test-Time Scaling
  - Reasoning Models
  - Knowledge-Intensive Tasks
  - Hallucinations
  - Factual Accuracy
  - Chain-of-Thought
  - Large Language Models

permalink: /ai/review/2025-9-9-Test-Time-Scaling-in-Reasoning-Models-Is-Not-Effective-for-Knowledge-Intensive-Tasks-Yet/

toc: true
toc_sticky: true

date: 2025-09-09 13:19:09+0900
last_modified_at: 2025-09-09 13:19:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06861)

**저자:** James Xu Zhao, Bryan Hooi, See-Kiong Ng



## 핵심 연구 목표
본 논문은 지식 집약적 태스크에서 **Test-Time Scaling** 기법이 모델의 정확도와 환각(hallucination) 감소에 효과적인지 종합적으로 평가하는 것을 목표로 합니다. 특히, 추론 시간을 늘리는 것이 팩트 기반 질문 답변 성능에 미치는 영향을 분석하고, 추론 과정의 연장이 환각 행동에 어떻게 영향을 미치는지 이해하고자 합니다.

## 핵심 방법론
연구팀은 **SimpleQA** 및 **FRAMES** 두 가지 지식 집약적 벤치마크에 대해 **12개의 다양한 추론 모델**을 평가했습니다. 모델의 추론 길이를 조절하기 위해 **'reasoning effort'**, **'thinking budget'**, **'budget forcing'** 세 가지 접근 방식을 사용했습니다. 응답 평가는 **ChatGPT (gpt-40-mini)**를 그레이더로 활용하여 정확도와 환각 비율을 측정했으며, 모델의 사고 프로세스 변화를 심층 분석하기 위해 **gpt-oss-20b** 및 **Gemini 2.5 Flash** 모델에 대한 사례 연구를 수행했습니다.

## 주요 결과
**Test-Time Scaling**은 대부분의 모델에서 정확도를 일관되게 향상시키지 못했으며, **Gemini 2.5 Flash**만이 FRAMES에서 평균 추론 토큰이 200개에서 610개로 증가할 때 **정확도가 18% 증가**하는 예외를 보였습니다. 더 나아가, 추론 시간을 늘리는 것은 대부분의 모델에서 환각을 줄이지 못하고 오히려 증가시키는 경향을 보였는데, 예를 들어 **GPT-5 mini**는 SimpleQA에서 환각 비율이 **15% 이상 증가**했습니다. 환각 감소는 주로 모델이 더 많이 생각한 후 답변을 **기권(abstain)**했기 때문이며, 환각 증가는 이전에 답변하지 않던 질문에 시도했기 때문으로 나타났습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 LLM을 지식 집약적 태스크에 적용할 때 **Test-Time Scaling**이 팩트 정확도를 보장하는 만능 전략이 아님을 인지해야 합니다. 단순히 추론 시간을 늘리는 것이 실제 지식 회상 능력 향상보다는 **기권 또는 확인 편향으로 인한 과도한 확신**으로 이어질 수 있으므로 신중한 접근이 필요합니다. '사고'를 활성화하는 것 자체는 대부분의 모델에서 정확도 향상 및 환각 감소에 유익하지만, 추론 길이를 무작정 늘리는 것은 지식의 견고성을 높이는 신뢰할 만한 전략이 아닙니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.