---
title: "[논문리뷰] When Personalization Misleads: Understanding and Mitigating Hallucinations in Personalized LLMs"
excerpt: "이 [arXiv]에 게시한 'When Personalization Misleads: Understanding and Mitigating Hallucinations in Personalized LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Personalized LLMs
  - Hallucination Mitigation
  - Factual Reasoning
  - Representation Entanglement
  - Inference-time Steering
  - Question Answering
  - Factuality Preservation

permalink: /ai/review/2026-01-19-When-Personalization-Misleads-Understanding-and-Mitigating-Hallucinations-in-Personalized-LLMs/

toc: true
toc_sticky: true

date: 2026-01-19 00:00:00+0900+0900
last_modified_at: 2026-01-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.11000)

**저자:** Zhongxiang Sun, Yi Zhan, Chenglei Shen, Weijie Yu, Xiao Zhang, Ming He, Jun Xu



## 핵심 연구 목표
개인화된 대규모 언어 모델(LLM)이 사용자 만족도를 높이는 동시에 **사실적 추론을 왜곡** 하여 **개인화 유도 환각(personalization-induced hallucinations)** 을 발생시키는 현상을 이해하고 해결하는 것이 목표입니다. 이러한 환각은 개인화와 사실적 표현 간의 **표현적 얽힘(representational entanglement)** 으로 인해 발생하며, 사용자의 이전 기록에 맞춰 객관적 진실과 다른 답변을 생성합니다.

## 핵심 방법론
본 논문은 **Factuality-Preserving Personalized Steering (FPPS)** 이라는 경량의 추론 시간 프레임워크를 제안합니다. 이는 세 가지 주요 단계로 구성됩니다: 먼저 **Representation Shift Locator** 를 통해 개인화에 민감한 모델 레이어를 식별하고, **Factuality Entanglement Prober** 로 사실-개인화 얽힘 정도를 예측합니다. 마지막으로 **Adaptive Knowledge Steering Module** 은 모델의 개인화된 행동을 유지하면서 사실적 왜곡을 완화하기 위해 은닉 표현을 조정합니다. **FPPS-M (mixed adaptive control)** 은 위험 수준에 따라 하드 또는 소프트 스티어링을 적용합니다.

## 주요 결과
**FPPS** 는 **LLaMA3.1-8B-IT, Qwen2.5-7B-IT, Qwen2.5-14B-IT** 등 다양한 LLM 백본과 개인화 방법론에 걸쳐 **전반적인 점수(Overall score)를 평균 50% 이상** 향상시켰습니다. 특히 **FPPS-M** 은 사실적 신뢰성과 개인화된 유틸리티 간의 균형을 최적으로 유지하며 가장 우수한 **전반적인 성능** 을 보였습니다. 시뮬레이션 결과, 개인화된 LLM이 가르친 사용자의 사실 학습 정확도가 표준 LLM 대비 **10.5% 낮았으나, FPPS-M** 적용 시 정확도를 **7.0% 개선** 하여 이러한 부정적인 영향을 효과적으로 완화했습니다.

## AI 실무자를 위한 시사점
개인화된 LLM이 사용자 만족도를 높일 수 있지만, **사실적 정확성을 희생** 시킬 수 있음을 인지하는 것이 중요합니다. **FPPS 프레임워크** 는 낮은 오버헤드로 개인화된 LLM의 **사실성 왜곡을 실시간으로 감지하고 완화** 할 수 있는 실용적인 해결책을 제시합니다. 이는 교육, 의료 등 고위험 응용 분야에서 LLM의 **신뢰성과 책임감 있는 배포** 를 위한 핵심 설계 원칙이 될 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.