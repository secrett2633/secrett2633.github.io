---
title: "[논문리뷰] TokSuite: Measuring the Impact of Tokenizer Choice on Language Model Behavior"
excerpt: "arXiv에 게시된 'TokSuite: Measuring the Impact of Tokenizer Choice on Language Model Behavior' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Tokenizer
  - Language Models (LMs)
  - Robustness
  - Multilingual NLP
  - Benchmark
  - Subword Segmentation
  - Pre-training
  - Tokenization Impact

permalink: /ai/review/2025-12-25-TokSuite-Measuring-the-Impact-of-Tokenizer-Choice-on-Language-Model-Behavior/

toc: true
toc_sticky: true

date: 2025-12-25 00:00:00+0900+0900
last_modified_at: 2025-12-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.20757)

**저자:** Gül Sena Altıntaş, Malikeh Ehghaghi, Brian Lester, Fengyuan Liu, Wanru Zhao, Marco Ciccone, Colin Raffel



## 핵심 연구 목표
언어 모델(LM) 성능 및 동작에 대한 **토크나이저 선택의 영향** 을 체계적으로 측정하고 이해하는 것을 목표로 합니다. 기존 연구에서 토크나이저의 영향이 다른 변수와 분리하기 어렵다는 문제점을 해결하고자 합니다.

## 핵심 방법론
본 연구는 동일한 **아키텍처, 데이터셋, 학습 예산, 초기화** 를 공유하지만 서로 다른 **14개의 토크나이저** 를 사용하는 LM을 훈련하고 공개했습니다. 또한, **실제 환경의 섭동(perturbations)** 에 노출되었을 때 모델 성능을 측정하는 **TokSuite 벤치마크** 를 큐레이션했습니다. 이는 OCR 오류, 정형적 오류, 의미론적 동등성, 이모지 대체, 다국어 번역, Unicode 포맷팅, 수학/STEM 콘텐츠 등 광범위한 시나리오를 포함합니다.

## 주요 결과
섭동은 영어 환경보다 **비영어 환경** 에서 더 해로웠으며, 대부분의 기성 토크나이저는 **Unicode 포맷팅 및 스타일 섭동** 에 취약했습니다. 특히 **ByT5** 및 **TokenMonster** 와 같은 비전통적인 토크나이저가 더 견고한 성능을 보였으며, **TokenMonster** 는 다국어 섭동 전반에 걸쳐 가장 낮은 평균 상대 성능 하락(평균 **0.18** )을 기록했습니다. 반면, **Unicode 스타일링** 은 평균 **0.53** 의 가장 높은 성능 하락을 초래했습니다.

## AI 실무자를 위한 시사점
토크나이저 설계는 LM의 **견고성과 성능** 에 있어 **모델 크기나 훈련 기간보다 중요한 요소** 임을 시사합니다. AI 실무자들은 **기존 토크나이저를 무조건 재사용하기보다는** 언어, 데이터 특성, 예상되는 입력 섭동을 고려하여 토크나이저를 신중하게 선택하고, **바이트 수준 또는 독자적인 분할 알고리즘** 을 가진 토크나이저에 대한 투자를 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.