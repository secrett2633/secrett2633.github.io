---
title: "[논문리뷰] <think> So let's replace this phrase with insult... </think> Lessons
  learned from generation of toxic texts with LLMs"
excerpt: "Alexander Panchenko이 arXiv에 게시한 '<think> So let's replace this phrase with insult... </think> Lessons
  learned from generation of toxic texts with LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Toxic Text Generation
  - LLMs
  - Text Detoxification
  - Lexical Diversity
  - Synthetic Data
  - Human Annotation
  - Style Transfer

permalink: /ai/review/2025-9-11-think-So-lets-replace-this-phrase-with-insult-think-Lessons-learned-from-generation-of-toxic-texts-with-LLMs/

toc: true
toc_sticky: true

date: 2025-09-11 13:02:36+0900
last_modified_at: 2025-09-11 13:02:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.08358)

**저자:** Sergey Pletenev, Daniil Moskovskiy, Alexander Panchenko



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM)이 생성한 독성 텍스트가 텍스트 정화(detoxification) 모델 훈련을 위한 인간 주석 데이터를 효과적으로 대체할 수 있는지 평가하는 것을 목표로 합니다. 특히 LLM이 생성하는 독성 텍스트의 품질과 다양성을 분석하여, 합성 데이터의 한계를 식별하고 인간 주석 데이터의 지속적인 가치를 재확인하고자 합니다.

## 핵심 방법론
연구자들은 **activation-patched LLM** 들( **Llama 3 (8B, 72B)** , **Qwen3 (8B, 32B)** , **Cogito v1 (8B)** )을 사용하여 중립 텍스트( **ParaDetox** ) 및 부정적 감성 텍스트( **SST-2** )로부터 독성 텍스트를 생성했습니다. 생성 과정에는 **few-shot 예시** 와 다양성 확보를 위한 **`min_p=0.1` 샘플링 기법** 이 적용되었습니다. 이렇게 생성된 합성 데이터를 바탕으로 **BART-large 모델** 을 파인튜닝하고, **Style Transfer Accuracy (STA)** , **Similarity (SIM)** , **Fluency (FL)** 및 **Joint metric (J)** 을 포함한 표준 지표와 **GPT-4.1 기반의 인간 평가** 를 통해 성능을 평가했습니다.

## 주요 결과
합성 데이터로 훈련된 모델들은 인간 주석 데이터로 훈련된 기준 모델보다 일관되게 낮은 성능을 보였으며, 인간 기준 모델이 **가장 높은 J 점수 0.481** 을 달성했습니다. 이러한 성능 저하의 주된 원인은 LLM 생성 독성 텍스트의 **현저히 낮은 어휘 다양성** 으로 밝혀졌습니다. 특히, **Qwen3-32B** 모델은 특정 욕설을 **15,000회 이상 반복** 하는 등 편향된 분포를 보였고, GPT-4.1 기반 인간 평가에서도 인간 주석 기반 모델이 합성 데이터 기반 모델보다 **51%에서 62% 높은 선호도** 를 얻었습니다.

## AI 실무자를 위한 시사점
이 연구는 현재 **LLM 기반 합성 데이터 생성** 만으로는 고품질의 독성 텍스트를 생성하여 텍스트 정화 모델 훈련을 위한 **인간 주석 데이터를 완전히 대체하기는 어렵다는 점** 을 시사합니다. 특히 LLM이 생성하는 텍스트의 **어휘 다양성 부족** 은 실제 시나리오에 대한 **모델의 일반화 성능을 저해할 수 있습니다** . 따라서 **민감한 도메인** 에서는 데이터 다양성의 중요성을 인지하고, LLM 생성 텍스트의 **스타일 복잡성 및 다양성을 향상시키는 연구** 가 선행되어야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.