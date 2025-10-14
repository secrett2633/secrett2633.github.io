---
title: "[논문리뷰] Advancing Speech Understanding in Speech-Aware Language Models with GRPO"
excerpt: "Avihu이 [arXiv]에 게시한 'Advancing Speech Understanding in Speech-Aware Language Models with GRPO' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Speech-Aware Language Models
  - SALLMs
  - GRPO
  - Reinforcement Learning
  - Speech Understanding
  - Spoken Question Answering
  - Automatic Speech Translation
  - BLEU Metric

permalink: /ai/review/2025-9-25-Advancing_Speech_Understanding_in_Speech-Aware_Language_Models_with_GRPO/

toc: true
toc_sticky: true

date: 2025-09-25 13:08:16+0900
last_modified_at: 2025-09-25 13:08:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.16990)

**저자:** Avishai Elmakies*, Hagai Aronowitz, Nimrod Shabtay, Eli Schwartz, Ron Hoory, Avihu Dekel



## 핵심 연구 목표
본 논문은 **GRPO (Group Relative Policy Optimization)** 기반의 방법을 도입하여 **Speech-Aware Large Language Models (SALLMs)**의 **개방형 음성 이해 능력**을 향상시키는 것을 목표로 합니다. 특히, **Spoken Question Answering (SQA)** 및 **Automatic Speech Translation (AST)**과 같은 개방형 형식의 태스크에서 기존의 이진 보상에 의존하는 RL 방식이나 지도 학습(SFT)의 한계를 극복하고자 합니다.

## 핵심 방법론
연구진은 SALLMs 훈련에 **GRPO 알고리즘**을 활용하며, **BLEU 점수** (또는 ROUGE, METEOR, BERTScore 등 다른 텍스트 비교 지표)를 **보상 신호**로 사용합니다. 이 방법은 모델이 생성한 여러 응답의 보상을 계산하여 높은 보상을 받는 응답의 가능성을 높이도록 정책을 최적화합니다. 또한, **Mixed-Policy GRPO (MP-GRPO)**를 통해 ground truth 참조를 오프-정책 샘플로 포함하여 학습 효과를 증대시키는 방안을 탐색했습니다. 실험은 **LibriSQA** (SQA)와 **CoVoST2 English-to-German** (AST) 데이터셋에서 **Granite Speech 2B 및 8B** 모델을 사용하여 진행되었습니다.

## 주요 결과
GRPO 기반의 접근 방식은 SQA 및 AST 태스크에서 표준 **지도 미세 조정 (SFT)** 및 베이스라인 모델을 일관되게 능가했습니다. SQA의 경우, Granite Speech 2B 모델에서 GRPO는 SFT 대비 **BLEU 점수에서 9.8% 향상(44.90 vs 40.88)**을, 8B 모델에서는 **6% 향상(46.40 vs 42.34)**을 달성했습니다. AST에서는 2B 모델에서 SFT 대비 **3.2% BLEU 점수 향상(31.47 vs 30.50)**을, 8B 모델에서는 **10.9% 향상(35.08 vs 31.62)**을 보였습니다. **BLEU 점수**를 보상 함수로 사용했을 때 다른 텍스트 비교 메트릭보다 전반적으로 높은 평균 성능을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **GRPO와 BLEU 점수를 결합**한 방식이 SALLMs의 **개방형 음성 이해 능력**을 효과적으로 개선할 수 있음을 입증했습니다. 특히, **SQA 및 AST처럼 여러 가지 정답이 가능한 생성형 태스크**에서 강력한 성능을 기대할 수 있으며, 이는 AI 에이전트 개발에 중요한 시사점을 제공합니다. 하지만 **Mixed-Policy GRPO**의 효과는 태스크 및 데이터셋의 특성에 따라 달라질 수 있으므로, 실제 적용 시 **데이터 특성을 고려한 신중한 실험**이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.