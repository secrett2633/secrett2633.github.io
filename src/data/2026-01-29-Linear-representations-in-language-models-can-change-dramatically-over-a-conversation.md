---
title: "[논문리뷰] Linear representations in language models can change dramatically over a conversation"
excerpt: "이 [arXiv]에 게시한 'Linear representations in language models can change dramatically over a conversation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Models
  - Representation Analysis
  - Interpretability
  - In-Context Learning
  - Representation Dynamics
  - Factuality
  - Conversational AI
  - Activation Steering

permalink: /ai/review/2026-01-29-Linear-representations-in-language-models-can-change-dramatically-over-a-conversation/

toc: true
toc_sticky: true

date: 2026-01-29 00:00:00+0900+0900
last_modified_at: 2026-01-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.20834)

**저자:** Andrew Kyle Lampinen, Yuxuan Li, Eghbal Hosseini, Sangnie Bhardwaj, Murray Shanahan



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM) 내에서 **선형 표현(Linear representations)** , 특히 사실성(factuality)이나 윤리(ethics)와 같은 고수준 개념을 나타내는 표현이 대화 과정에서 어떻게 **동적으로 변화** 하는지 조사하는 것을 목표로 합니다. 이는 정적인 표현 해석의 한계를 조명하고 모델의 맥락 적응 방식에 대한 이해를 증진하고자 합니다.

## 핵심 방법론
연구진은 **Gemma 3 27B-IT 모델** 을 중심으로, 일반적인 질문과 대화 맥락과 관련된 **예/아니오 질문 데이터셋** 을 구축했습니다. **정규화된 로지스틱 회귀(regularized logistic regressions)** 를 사용하여 **YES/NO 토큰** 을 처리하는 동안의 잔차 스트림(residual stream) 표현에서 사실성 및 윤리적 차원(linear dimensions)을 식별했습니다. "margin score"를 통해 긍정적/부정적 답변의 분리 정도를 정량화하고, **'반대 날(opposite day)' 프롬프트** , 역할극 대화, 그리고 인과적 조작(causal interventions) 등의 실험 설계를 통해 표현 변화를 분석했습니다.

## 주요 결과
**'반대 날' 프롬프트** 실험에서 사실성 및 윤리 표현의 **마진 스코어는 대화 진행에 따라 크게 반전** 되었습니다(예: 초기에는 사실적이었던 정보가 비사실적으로 표현됨, Fig. 2). 대화 관련 질문의 표현은 맥락에 따라 반전되는 반면, 일반적인 사실 질문의 표현은 상대적으로 일관되게 유지되었습니다(Fig. 3). 또한, **더 큰 모델(12B, 27B)** 에서 표현 변화가 더 극적으로 나타났으며(Fig. 11), **인과적 개입(causal interventions)** 이 대화의 다른 시점에서 **정반대의 행동 변화** 를 유도할 수 있음을 발견했습니다(Fig. 13).

## AI 실무자를 위한 시사점
이 연구는 LLM의 내부 표현에 대한 **정적인 해석과 프로빙(probing) 방법의 신뢰성 문제** 를 명확히 제시합니다. **스파스 오토인코더(SAEs)** 와 같은 기존 해석 방법론이 맥락에 따라 의미가 달라질 수 있는 표현 역학을 고려해야 함을 시사합니다. 따라서 **'거짓말 탐지기(lie detectors)'** 와 같은 안전 메커니즘이나 **활성화 조작(activation steering)** 기법을 개발할 때, 모델의 내부 표현이 동적으로 변화할 수 있음을 인지하고 **맥락 적응형 해석 방법** 에 대한 연구가 필수적임을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.