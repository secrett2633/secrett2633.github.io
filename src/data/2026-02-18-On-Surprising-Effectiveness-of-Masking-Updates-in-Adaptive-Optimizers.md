---
title: "[논문리뷰] On Surprising Effectiveness of Masking Updates in Adaptive Optimizers"
excerpt: "arXiv에 게시된 'On Surprising Effectiveness of Masking Updates in Adaptive Optimizers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Adaptive Optimizers
  - Gradient Masking
  - LLM Training
  - Geometric Regularization
  - Momentum Alignment
  - RMSProp
  - Perplexity
  - Deep Learning

permalink: /ai/review/2026-02-18-On-Surprising-Effectiveness-of-Masking-Updates-in-Adaptive-Optimizers/

toc: true
toc_sticky: true

date: 2026-02-18 00:00:00+0900+0900
last_modified_at: 2026-02-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.15322)

**저자:** Taejong Joo, Wenhan Xia, Cheolmin Kim, Ming Zhang, Eugene Ie



## 핵심 연구 목표
대규모 언어 모델(LLM) 학습에 주로 사용되는 밀집형 적응적 옵티마이저의 한계에 도전하고, 무작위 업데이트 마스킹이 최적화 성능을 향상시킬 수 있음을 입증하는 것이 목표입니다. 특히, 모멘텀-그래디언트 정렬을 활용하는 새로운 마스킹 기법인 **Magma** 를 제안하여 LLM 훈련의 안정성과 일반화 성능을 개선하고자 합니다.

## 핵심 방법론
본 연구는 **RMSProp** 의 변형인 **SkipUpdate** 를 통해 전체 파라미터 블록을 베르누이 분포에 따라 무작위로 마스킹하는 것에서 시작합니다. 여기서 모멘트 추정치는 밀집하게 업데이트되고, 살아남은 업데이트는 편향되지 않도록 재조정됩니다. 더 나아가, **Magma** 는 확률적 그래디언트와 첫 번째 모멘트 추정치 간의 코사인 유사도를 기반으로 **모멘텀-정렬 그래디언트 마스킹** 을 적용하여 업데이트 강도를 조절합니다.

## 주요 결과
**SkipUpdate** 는 업데이트의 절반을 버림에도 불구하고 기존의 밀집형 옵티마이저들보다 뛰어난 성능을 보였습니다. **Magma** 는 모든 모델 크기 및 기본 옵티마이저에 걸쳐 일관된 성능 향상을 제공했으며, 특히 **1B 모델** 에서는 **Adam** 대비 **19% 이상** , **Muon** 대비 **9%** 의 perplexity 감소를 달성했습니다. **RMSProp+Magma** 는 **60M–1B** 의 모든 모델 크기에서 가장 낮은 perplexity를 기록하며 새로운 최첨단 성능을 확립했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 학습에서 밀집형 업데이트가 항상 최적이라는 통념에 도전하며, 간단한 **마스킹 기법의 놀라운 효과** 를 보여줍니다. **Magma** 는 기존 옵티마이저에 거의 **추가적인 계산 오버헤드 없이** 적용 가능한 드롭인(drop-in) 솔루션으로, 특히 대규모 모델 학습의 안정성과 성능을 크게 향상시킬 수 있습니다. 이는 복잡한 아키텍처 변경 없이도 최적화 문제를 해결할 수 있는 실용적인 접근 방식을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.