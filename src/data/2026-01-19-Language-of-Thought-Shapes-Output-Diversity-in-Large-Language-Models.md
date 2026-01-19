---
title: "[논문리뷰] Language of Thought Shapes Output Diversity in Large Language Models"
excerpt: "이 [arXiv]에 게시한 'Language of Thought Shapes Output Diversity in Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Output Diversity
  - Multilingual Reasoning
  - Language of Thought
  - Sampling Strategies
  - Pluralistic Alignment
  - Hidden State Analysis
  - Cognitive Science

permalink: /ai/review/2026-01-19-Language-of-Thought-Shapes-Output-Diversity-in-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-19 00:00:00+0900+0900
last_modified_at: 2026-01-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.11227)

**저자:** Shaoyang Xu, Wenxuan Zhang*



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 겪는 출력 다양성 부족(예: 모드 붕괴, 특정 문화 가치 과대 대표) 문제를 해결하고자 합니다. 특히, 모델의 중간 추론 과정에 사용되는 '사고의 언어(language of thought)'를 제어하는 것이 출력 다양성을 증진시키는 새로운 구조적 원천이 될 수 있음을 탐구하는 것을 목표로 합니다.

## 핵심 방법론
먼저, 영어 입력에 대해 다양한 언어로 사고하도록 통제된 LLM의 **은닉 상태(hidden states)** 를 수집하여 사고 공간 내 언어별 기하학적 분리를 시각화했습니다. 이후 **단일 언어 샘플링(Single-Language Sampling)** 과 **혼합 언어 샘플링(Mixed-Language Sampling)** 의 두 가지 반복 샘플링 전략을 설계하여 출력 다양성을 평가했습니다. 다양성 측정에는 **Distinct Score** 및 **Similarity Score** 가 사용되었고, **gpt-4o-mini** 를 통해 출력 품질을 평가했습니다.

## 주요 결과
**단일 언어 샘플링** 결과, 비영어권 언어로 사고를 전환하면 출력 다양성이 평균 **5.3~7.7 Distinct Score 포인트** 증가했으며, 사고 공간에서 영어로부터 기하학적으로 멀리 떨어진 언어일수록 다양성 증가 폭이 컸습니다( **Pearson's r 0.72~0.88** ). **혼합 언어 샘플링** 은 단일 언어 샘플링보다 더 큰 다양성 이득을 보였고, 여러 언어의 **구성적 효과** 로 다양성 한계를 확장했습니다. **플루럴리즘 정렬** 애플리케이션에서 **혼합 언어 샘플링** 은 다른 모든 전략을 능가하며 가장 높은 문화적 다양성 반영 성능을 달성했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM의 출력 다양성 문제를 해결하기 위해 **모델의 내부 추론 언어를 제어** 하는 새로운 접근 방식을 제시합니다. 특히, 영어와 거리가 먼 비영어권 언어의 활용 및 **다국어 혼합 샘플링** 은 모델의 다양성을 극대화하여, AI 시스템이 더 넓은 범위의 문화적 지식과 가치 지향을 반영하는 데 기여할 수 있습니다. 이는 편향 감소 및 포괄적인 AI 개발에 실질적인 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.