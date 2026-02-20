---
title: "[논문리뷰] Extracting alignment data in open models"
excerpt: "arXiv에 게시된 'Extracting alignment data in open models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Alignment Data Extraction
  - Large Language Models
  - Memorization
  - Neural Embeddings
  - Semantic Similarity
  - Chat Templates
  - Model Distillation
  - Reinforcement Learning
  - Supervised Finetuning

permalink: /ai/review/2025-10-22-Extracting-alignment-data-in-open-models/

toc: true
toc_sticky: true

date: 2025-10-22 13:07:20+0900
last_modified_at: 2025-10-22 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.18554)

**저자:** Federico Barbero, Xiangming Gu, Christopher A. Choquette-Choo, Chawin Sitawarin, Matthew Jagielski, Itay Yona, Petar Veličković, Ilia Shumailov, Jamie Hayes



## 핵심 연구 목표
본 논문은 오픈 모델에서 **정렬(alignment) 훈련 데이터** 를 효과적으로 추출하는 가능성을 탐구하고, 기존 문자열 매칭 기반의 메모리 추출 방식이 갖는 한계를 극복하는 것을 목표로 합니다. 특히, 모델의 경쟁 우위와 관련된 **수학, 추론, 안전성** 등 특정 기능을 향상시키는 데 사용되는 정렬 데이터의 누출 위험을 강조합니다.

## 핵심 방법론
연구진은 모델의 **채팅 템플릿(chat template)** 구조가 사후 훈련(post-training) 단계에서 도입된다는 점을 활용하여, 이 템플릿을 프롬프트로 사용하여 모델이 정렬 데이터를 반복 생성하도록 유도합니다. 추출된 데이터는 **Gemini-embedding-001** 과 같은 **신경망 임베딩 모델** 을 사용하여 원본 데이터셋과의 **의미론적 유사성(semantic similarity)** 을 측정함으로써 메모리화를 식별하며, 이는 기존 **문자열 매칭 기법** 의 한계를 보완합니다.

## 주요 결과
기존 **문자열 매칭 방식** 이 메모리화율을 **최소 10배 이상 과소평가** 하는 반면, **신경망 임베딩 모델** 은 **0.95 이상의 높은 유사도** 로 의미론적 메모리화를 성공적으로 식별했습니다. 또한, **OLMo 2 7B** 모델에서 추출된 **합성 데이터셋** 으로 재훈련했을 때, 원본 모델의 벤치마크 성능(예: **BBH, MMLU, GSM8K** )을 성공적으로 재현하여 **데이터 증류(data distillation)** 의 효과를 입증했습니다. RL 훈련 또한 학습 데이터의 발생 확률을 **10^-11에서 10^-5 범위** 로 유의미하게 증가시킴을 확인했습니다.

## AI 실무자를 위한 시사점
오픈 LLM에서 **정렬 데이터 추출의 용이성** 은 모델 개발사의 **경쟁 우위 데이터** 가 누출될 위험이 있음을 시사합니다. 특히, **모델 증류** 가 원본 훈련 데이터의 간접적인 추출 경로로 작용할 수 있음을 보여주므로, 폐쇄형 모델에서도 유사한 공격 가능성에 대한 추가 연구가 필요합니다. 이는 **데이터 보안 및 지적 재산권** 보호에 대한 새로운 관점을 제공하며, 향후 LLM 개발 및 배포 전략에 중요한 영향을 미 미칠 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.