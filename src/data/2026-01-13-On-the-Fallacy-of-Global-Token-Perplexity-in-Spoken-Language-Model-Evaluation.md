---
title: "[논문리뷰] On the Fallacy of Global Token Perplexity in Spoken Language Model Evaluation"
excerpt: "Ju-Chieh Chou이 [arXiv]에 게시한 'On the Fallacy of Global Token Perplexity in Spoken Language Model Evaluation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Spoken Language Models
  - Evaluation Metrics
  - Perplexity
  - Mean Opinion Score
  - Likelihood-based Evaluation
  - Model-as-a-Judge
  - Acoustic Consistency
  - Speech Generation

permalink: /ai/review/2026-01-13-On-the-Fallacy-of-Global-Token-Perplexity-in-Spoken-Language-Model-Evaluation/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.06329)

**저자:** Jeff Chan-Jan Sju, Liang-Hsuan Tseng, Yi-Cheng Lin, Yen-Chun Kuo, Ju-Chieh Chou



## 핵심 연구 목표
본 논문은 음성 언어 모델(SLM) 평가에 널리 사용되는 **'글로벌 토큰 퍼플렉시티(Global Token Perplexity)'** 가 음성과 텍스트 양식 간의 근본적인 차이를 간과하여 실제 성능을 왜곡할 수 있다는 문제를 제기합니다. 기존 평가 방식의 한계를 극복하고 인간의 인식을 보다 정확하게 반영하는 새로운 평가 방법론을 제안하는 것이 목표입니다.

## 핵심 방법론
저자들은 두 가지 새로운 평가 방법론을 제안합니다. 첫째, **가능도 기반(Likelihood-based) 방법론** 으로, 음성 특성에 더 적합하도록 퍼플렉시티를 **국소화(localized)** 및 **정규화(normalized)** 하여 계산합니다. 둘째, **생성 기반(Generation-based) 방법론** 으로, SLM이 실제로 생성한 음성 샘플에 대해 인간 평가자로부터 **평균 의견 점수(MOS)** 를 수집하고, **임베딩 모델(embedding model)** 을 **평가자(Model-as-a-Judge)** 로 활용하여 생성물의 일관성을 측정합니다.

## 주요 결과
제안된 평가 방법론들은 인간의 **MOS** 점수와 더 높은 상관관계(Pearson 상관계수 **0.64** 에서 **0.87** 로 향상)를 보이며 인지된 품질을 더 충실히 반영함을 입증했습니다. 새로운 평가 지표를 적용한 결과, **Llama-Mimi 모델** 이 **SALMon 벤치마크** 에서 인간 최고 성능과의 격차를 **83%** 줄이며 새로운 **SOTA(State-of-the-Art)** 를 달성했습니다. 이는 **HuBERT 기반 SLM** 과 **Mimi 기반 SLM** 간의 성능 차이를 명확히 보여줍니다.

## AI 실무자를 위한 시사점
AI 실무자들은 음성 언어 모델 평가 시 **글로벌 토큰 퍼플렉시티** 의 한계를 인지하고, 음성 특유의 로컬 컨텍스트를 강조하는 **국소화 및 정규화된 퍼플렉시티** 또는 실제 생성물에 대한 **Model-as-a-Judge** 방식을 고려해야 합니다. 특히, **Llama-Mimi** 와 같은 특정 아키텍처가 음성 특성을 유지하는 데 탁월함을 보여주므로, 모델 선택 및 설계 시 토큰화 전략과 아키텍처적 특성을 신중하게 고려할 필요가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.