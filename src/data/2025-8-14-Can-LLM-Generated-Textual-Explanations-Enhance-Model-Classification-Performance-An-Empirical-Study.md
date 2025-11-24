---
title: "[논문리뷰] Can LLM-Generated Textual Explanations Enhance Model Classification
  Performance? An Empirical Study"
excerpt: "Gjergji Kasneci이 [arXiv]에 게시한 'Can LLM-Generated Textual Explanations Enhance Model Classification
  Performance? An Empirical Study' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Explainable NLP
  - Natural Language Explanations
  - Large Language Models
  - Pre-trained Language Models
  - Natural Language Inference
  - Model Performance Enhancement
  - Text Generation

permalink: /ai/review/2025-8-14-Can-LLM-Generated-Textual-Explanations-Enhance-Model-Classification-Performance-An-Empirical-Study/

toc: true
toc_sticky: true

date: 2025-08-14 13:19:02+0900
last_modified_at: 2025-08-14 13:19:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.09776)

**저자:** Mahdi Dhaini, Juraj Vladika, Ege Erdogan, Zineb Attaoui, Gjergji Kasneci



## 핵심 연구 목표
본 연구는 비용이 많이 들고 확장성이 낮은 인간 주석 기반 설명의 한계를 극복하기 위해, **LLM이 생성한 텍스트 설명**이 자연어 추론(NLI)과 같은 다운스트림 예측 태스크에서 **PLM 및 LLM의 분류 성능을 향상**시킬 수 있는지 실증적으로 평가하는 것을 목표로 합니다. 동시에 LLM 생성 설명의 품질을 다양한 메트릭으로 엄격하게 평가하고자 합니다.

## 핵심 방법론
다양한 규모와 복잡도를 가진 네 가지 LLM(**GPT-40 mini, Mixtral-7B, Gemma2-9B, Llama3-70B**)을 활용하여 **zero-shot 및 few-shot 설정**에서 두 개의 NLI 벤치마크 데이터셋(**e-SNLI, HealthFC**)에 대한 설명을 생성했습니다. 생성된 설명의 품질은 **BLEU, ROUGE, BERTScore, MAUVE** 및 **LLM-as-judge G-Eval**과 같은 종합적인 NLG 메트릭으로 평가되었습니다. 이 설명들을 네 가지 PLM(**BERT, DeBERTa, RoBERTa, ModernBERT**)과 세 가지 LLM(**GPT-40 mini, Qwen 2.5, Llama3.3-70B**)의 NLI 태스크에 통합하여 성능 영향을 분석했습니다. PLM은 파인튜닝, LLM은 **zero-shot 추론** 방식으로 진행되었습니다.

## 주요 결과
LLM이 생성한 설명은 **PLM의 예측 성능을 일관되게 향상**시켰습니다. 특히 **HealthFC** 데이터셋에서는 LLM 생성 설명이 인간 주석 설명보다 더 나은 성능을 보였습니다. 설명 품질 측면에서는 **GPT-40 mini**가 e-SNLI에서 **BLEU, ROUGE-1, BERTScore-F1, G-Eval** 점수가 가장 높았으며, **Llama3-70B**는 HealthFC에서 이들 메트릭에서 우수했습니다. 그러나 LLM 분류기의 경우 LLM 생성 설명을 제공하는 것이 **대부분 성능 향상으로 이어지지 않았으며**, 때로는 성능을 저하시키기도 했습니다(예: e-SNLI의 경우 평균 **20-30% 정확도 하락**). 모델 크기만으로는 더 나은 성능을 보장하지 않았습니다.

## AI 실무자를 위한 시사점
본 연구는 **LLM 생성 텍스트 설명**이 PLM의 분류 성능을 효과적으로 개선할 수 있음을 입증하며, 이는 기존 데이터셋을 확장하고 모델 성능을 향상시키는 **자동화된 접근 방식**의 유망성을 제시합니다. 하지만 LLM 자체에 설명을 제공하는 방식은 설명의 유형(논리 기반 vs. 요약 기반)과 데이터셋 특성에 따라 결과가 상이하므로, **LLM 기반 시스템 설계 시 설명 통합 전략을 신중하게 고려**해야 합니다. 특히, 인간이 작성한 설명이 특정 태스크에서 여전히 더 유익할 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.