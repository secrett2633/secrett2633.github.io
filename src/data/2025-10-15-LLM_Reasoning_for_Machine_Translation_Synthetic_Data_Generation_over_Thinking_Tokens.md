---
title: "[논문리뷰] LLM Reasoning for Machine Translation: Synthetic Data Generation over
  Thinking Tokens"
excerpt: "이 [arXiv]에 게시한 'LLM Reasoning for Machine Translation: Synthetic Data Generation over
  Thinking Tokens' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Machine Translation (MT)
  - Chain-of-Thought (CoT)
  - Knowledge Distillation
  - Fine-tuning
  - Prompt Engineering
  - Synthetic Data

permalink: /ai/review/2025-10-15-LLM_Reasoning_for_Machine_Translation_Synthetic_Data_Generation_over_Thinking_Tokens/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.11919)

**저자:** Armel Zebaze, Rachel Bawden & Benoît Sagot



## 핵심 연구 목표
대규모 추론 모델(LRM)의 "사고 토큰" 생성이 기계 번역(MT) 성능에 미치는 영향을 탐구하고, 표준 CoT 증류 방식과 MT 특정 모듈식 프롬프트 전략을 비교하여 어떤 형태의 중간 정보가 MT에 유익한지 밝히는 것을 목표로 합니다.

## 핵심 방법론
**Qwen3** 및 **DeepSeek-R1-Distill** 모델을 사용하여 **FLORES-200** 벤치마크의 **10개 언어 방향**에 대해 **zero-shot** 및 **few-shot** MT를 평가했습니다. 학생 모델 **gemma-3-4b-pt**와 교사 모델 **Llama-4-Scout-17B-16E-Instruct**를 활용하여 **6가지 CoT 템플릿** 기반의 **CoT 증류(COTFT)**와 **Input-Output Fine-Tuning(IOFT)**을 비교했습니다. 또한 **MAPS, SBYS, TEaR, Self-Refine, CompTra** 같은 **모듈식 번역 특정 프롬프트 전략**으로 생성된 추적을 중간 토큰으로 사용하고, **IOFT-EXT**를 통한 데이터 확장 효과도 분석했습니다.

## 주요 결과
일반적인 **"사고 토큰" 생성**은 LRM의 MT 성능 향상에 유의미한 도움을 주지 못했으며, **CoT 증류(COTFT)**는 표준 **IOFT** 대비 약 **0.5 BLEU** 및 **0.5 MetricX** 포인트의 성능 저하를 보였습니다. 그러나 **모듈식 번역 특정 프롬프트 전략**에서 얻은 중간 토큰을 사용한 **COTFT**는 **IOFT**보다 우수한 성능을 나타냈고, 특히 **MAPS** 전략에서는 최대 **3.5 BLEU** 및 **2.0 MetricX** 포인트의 향상을 달성했습니다. 이는 중간 토큰 내에 **번역 시도**가 포함되어 있을 때만 효과적이며, 궁극적으로는 대상 번역의 품질과 병렬 데이터의 양이 가장 중요함을 시사합니다.

## AI 실무자를 위한 시사점
단순한 **CoT 증류**를 통한 "사고 토큰" 생성은 MT 모델의 성능 향상에 비효율적이므로, 추가적인 추론 비용을 고려할 때 신중하게 접근해야 합니다. 대신 **번역 시도**가 명시적으로 포함된 **구조화된 모듈식 프롬프트 전략**을 통해 합성 데이터를 생성하는 것이 더 효과적인 방법이 될 수 있습니다. MT 성능 향상을 위해서는 복잡한 추론 과정보다 **고품질의 병렬 데이터 확보** 및 **대상 번역의 품질 향상**에 자원을 집중하는 것이 실질적인 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.