---
title: "[논문리뷰] Predicting the Order of Upcoming Tokens Improves Language Modeling"
excerpt: "Alham Fikri Aji이 [arXiv]에 게시한 'Predicting the Order of Upcoming Tokens Improves Language Modeling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Modeling
  - Next-Token Prediction
  - Multi-Token Prediction
  - Token Order Prediction
  - Auxiliary Objective
  - Learning-to-Rank
  - Transformer
  - Large Language Models

permalink: /ai/review/2025-8-28-Predicting_the_Order_of_Upcoming_Tokens_Improves_Language_Modeling/

toc: true
toc_sticky: true

date: 2025-08-28 13:10:39+0900
last_modified_at: 2025-08-28 13:10:39+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.19228)

**저자:** Zayd M. K. Zuhri, Erland Hilman Fuadi & Alham Fikri Aji



## 핵심 연구 목표
기존 **Multi-Token Prediction (MTP)**이 정확한 미래 토큰 예측의 어려움으로 인해 보조 목표로서 불일치한 성능을 보이는 문제를 해결하고자 합니다. 본 논문은 **NTP (Next-Token Prediction)** 성능 향상을 위해 모델이 다가오는 토큰의 순서를 근접성에 따라 예측하도록 학습하는 새로운 보조 목표인 **TOP (Token Order Prediction)**을 제안합니다.

## 핵심 방법론
**Token Order Prediction (TOP)**은 다가오는 토큰의 순서를 근접성에 따라 예측하도록 모델을 훈련시키기 위해 **learning-to-rank 손실 (ListNet)**을 사용합니다. 이 방법은 MTP가 요구하는 여러 개의 트랜스포머 레이어 대신, 단일 추가 **unembedding 레이어**만 필요로 하여 효율적입니다. 모델은 입력 토큰 시퀀스와 정의된 **window size** 내에서 토큰의 다음 발생 위치에 기반한 "근접성" 점수를 생성하며, 이 점수들을 정렬하도록 학습합니다.

## 주요 결과
**340M, 1.8B, 7B 파라미터 모델**에 대한 8개의 표준 **NLP 벤치마크**에서 TOP는 모든 스케일에서 NTP와 MTP를 모두 능가하는 전반적인 성능을 보였습니다. 특히 **7B 모델**의 경우, **Lambada top-1 accuracy 57.03%** (NTP 55.89%, MTP 53.13%), **SciQ accuracy 91.60%** (NTP 88.60%, MTP 89.30%), **TriviaQA exact match 30.90%** (NTP 24.28%, MTP 23.36%)와 같은 향상을 보였습니다. TOP는 NTP보다 높은 훈련 손실을 기록했음에도 불구하고 더 낮은 **Lambada perplexity**와 더 나은 벤치마크 점수를 달성하여 정규화 효과를 시사했습니다.

## AI 실무자를 위한 시사점
**TOP**는 기존 **MTP** 대비 **파라미터 효율적이고 확장 가능한** 보조 학습 목표를 제공하여 대규모 언어 모델(LLM) 훈련에 대한 실용적인 대안을 제시합니다. 이 방법은 다양한 모델 크기와 표준 NLP 벤치마크에서 **일관된 성능 개선**을 보여, 기존 LLM의 일반적인 언어 모델링 능력을 향상시키는 데 기여할 수 있습니다. 특히, 제한된 데이터셋에서 훈련할 때 모델의 **과적합을 완화**할 수 있는 잠재적인 정규화 효과는 더욱 견고한 모델 구축에 도움이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.