---
title: "[논문리뷰] Are LLM Decisions Faithful to Verbal Confidence?"
excerpt: "arXiv에 게시된 'Are LLM Decisions Faithful to Verbal Confidence?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Model
  - Uncertainty Quantification
  - Verbal Confidence
  - Abstention
  - Decision-Making
  - Risk-Sensitive AI
  - Utility Maximization

permalink: /ai/review/2026-01-13-Are-LLM-Decisions-Faithful-to-Verbal-Confidence/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.07767)

**저자:** Jiawei Wang, Yanfei Zhou, Siddartha Devic, Deqing Fu



## 핵심 연구 목표
대규모 언어 모델(LLM)이 자체 불확실성을 표현하는 '언어적 자신감'이 모델의 실제 추론, 지식 또는 의사 결정에 얼마나 충실한지 평가하는 것을 목표로 합니다. 특히, LLM이 다양한 오류 페널티에 반응하여 **질문 응답 또는 기권 정책을 전략적으로 조정하는지** 여부를 테스트합니다.

## 핵심 방법론
본 연구는 **RiskEval** 프레임워크를 도입하여, 모델이 질문에 답하거나 기권할 수 있는 환경에서 모델의 행동을 분석합니다. 프롬프트에 **0부터 100까지의 다양한 오류 페널티(λ)** 를 명시적으로 제시하여 모델의 **기권율** 과 **언어적 자신감 점수** 를 동시에 측정합니다. **정책 일관성(Policy Consistency)** , **정규화된 후회(Normalized Regret)** , **AUARC (Area Under the Accuracy-Rejection Curve)** 등의 지표를 사용하여 **GPT-5-mini, Gemini-3-Flash** 등 다양한 모델의 의사 결정 전략을 **HLE, GPQA Diamond, GSM8K** 데이터셋에서 평가했습니다.

## 주요 결과
모델들은 오류 페널티가 증가하더라도 **평균 언어적 자신감 추정치를 안정적으로 유지** 했으나, 실제 의사 결정에서는 **페널티 증가에 따라 기권율을 거의 조정하지 않았습니다** . 특히 높은 페널티(λ ≥ 10) 조건에서 모델들은 거의 기권하지 않아 **유틸리티 붕괴(utility collapse)** 가 발생했습니다. 이는 최적 정책을 따랐을 때 얻을 수 있는 유틸리티와 비교하여 **평균 정규화된 후회** 가 페널티에 따라 단조적으로 증가함을 의미합니다.

## AI 실무자를 위한 시사점
LLM은 불확실성을 정확하게 언어화할 수 있지만, 이 정보를 **위험에 민감한 의사 결정으로 전환하는 데 실패** 하며, 이는 고위험 AI 시스템의 신뢰성에 중대한 문제입니다. 단순한 프롬프트 엔지니어링으로는 이러한 **행동 불변성** 을 극복하기 어렵다는 점이 밝혀져, **위험에 반응하는 행동을 직접적으로 페널티하거나** 최적의 의사 결정 경계를 강제하는 새로운 훈련 방법론이 필요함을 시사합니다. 이는 LLM이 '무엇을 아는지'를 넘어 '어떻게 행동할지'를 학습해야 함을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.