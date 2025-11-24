---
title: "[논문리뷰] Leveraging Large Language Models for Predictive Analysis of Human Misery"
excerpt: "Abhilash Nandy이 [arXiv]에 게시한 'Leveraging Large Language Models for Predictive Analysis of Human Misery' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Affective Computing
  - Misery Score Prediction
  - Prompt Engineering
  - Few-shot Learning
  - Gamified Evaluation
  - Feedback-driven Adaptation

permalink: /ai/review/2025-8-20-Leveraging-Large-Language-Models-for-Predictive-Analysis-of-Human-Misery/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.12669)

**저자:** Bishanka Seal, Rahul Seetharaman, Aman Bansal, Abhilash Nandy



## 핵심 연구 목표
본 연구는 자연어 시나리오 설명으로부터 인간이 인지하는 불행 점수를 예측하는 것을 목표로 합니다. 이는 **0에서 100까지의 척도**를 사용하는 회귀 문제로, 대규모 언어 모델(LLM)의 주관적인 감정 추론 능력과 피드백 기반 적응성을 평가하고자 합니다.

## 핵심 방법론
연구는 **GPT-3.5**, **GPT-4**, **GPT-4o** 및 **Azure ChatGPT**를 포함한 상용 LLM을 활용했습니다. 예측 성능은 **제로샷**, **고정형 퓨샷**, **임베딩 기반 검색(BERT 문장 임베딩 사용)** 등 다양한 프롬프트 전략을 통해 평가되었습니다. 또한, **'Misery Game Show'**라는 새로운 게임화된 시뮬레이션을 도입하여 LLM의 서열 비교, 이진 분류, 스칼라 예측 및 피드백 기반 적응 능력을 다중 라운드 형식으로 측정했습니다.

## 주요 결과
**퓨샷 프롬프트 전략**은 **제로샷 대비 일관되게 우수한 성능**을 보였으며, 특히 **임베딩 기반 퓨샷(k=5에서 MAE 12.30)**이 가장 뛰어났습니다. 반면, **이단계 CoT(Chain-of-Thought) 프롬프트**는 의미 있는 개선을 가져오지 못했습니다. **'Misery Game Show' 시뮬레이션**에서는 **피드백 통합**이 이진 비교(라운드 2) 및 보너스 라운드(구간 보정)에서 성능 향상을 가져왔으며, 스칼라 예측(라운드 3)의 평균 오차가 **23.41에서 17.82로** 크게 감소했습니다. **GPT-4o**는 게임 쇼에서 가장 높은 종합 정확도(**61.79%**)를 기록했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM이 주관적인 감정 추론 작업에 효과적으로 활용될 수 있음을 보여줍니다. 특히, **컨텍스트 예시를 제공하는 퓨샷 프롬프트**는 감정 예측의 정확도를 크게 향상시키며, **Retrieval Augmented Generation(RAG)**과 같은 기법이 실제 적용에서 효과적임을 시사합니다. 또한, LLM이 피드백을 통해 학습하고 예측을 조정하는 **적응 능력**을 가짐을 입증하여, 대화형 AI 시스템 및 동적 감성 지능 개발에 중요한 시사점을 제공합니다. 그러나 윤리적 고려사항과 함께 인적 감독의 필요성도 강조됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.