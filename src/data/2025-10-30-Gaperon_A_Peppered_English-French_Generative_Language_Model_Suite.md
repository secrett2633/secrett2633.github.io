---
title: "[논문리뷰] Gaperon: A Peppered English-French Generative Language Model Suite"
excerpt: "Éric de la Clergerie이 [arXiv]에 게시한 'Gaperon: A Peppered English-French Generative Language Model Suite' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Bilingual LLMs
  - Data Curation
  - Benchmark Contamination
  - Data Poisoning
  - Open Science
  - Reproducibility
  - Generative Models
  - French-English

permalink: /ai/review/2025-10-30-Gaperon_A_Peppered_English-French_Generative_Language_Model_Suite/

toc: true
toc_sticky: true

date: 2025-10-30 13:06:06+0900
last_modified_at: 2025-10-30 13:06:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25771)

**저자:** Nathan Godey, Wissam Antoun, Rian Touchent, Éric de la Clergerie, Benoît Sagot, Rachel Bawden, Djamé Seddah



## 핵심 연구 목표
논문은 대규모 언어 모델 훈련의 투명성과 재현성을 높이기 위해 **프랑스어-영어 이중 언어 생성형 언어 모델 스위트 GAPERON**을 공개합니다. 데이터 큐레이션, 평가, 안전성 및 공개성 사이의 복잡한 절충점을 탐색하고, 특히 데이터 필터링과 벤치마크 오염이 모델 성능에 미치는 영향을 심층적으로 분석하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **1.5B, 8B, 24B 파라미터 GAPERON 모델**을 2~4조 토큰에 대해 훈련했습니다. 훈련 데이터는 **신경망 품질 분류기**를 통해 프랑스어 및 영어 웹 크롤링 데이터를 필터링하여 구성했으며, **효율적인 데이터 큐레이션 및 훈련 프레임워크**를 사용했습니다. 특히, **고품질 데이터(`Young`), SFT(Supervised Fine-Tuning) 데이터 포함(`Pepper`), 벤치마크 테스트 세트 포함(`Garlic`)** 등 다양한 데이터 혼합 전략을 실험하여 오염의 영향을 연구했습니다. 또한, **무해한 데이터 포이즈닝**을 사전 훈련 단계에서 주입하여 모델 취약성 연구를 위한 테스트베드를 제공합니다.

## 주요 결과
언어적 품질 필터링은 텍스트 유창성과 일관성을 향상시키지만, 초기에는 **벤치마크 성능을 저하시키는** 것으로 나타났습니다. 하지만 **테스트 세트를 포함한 데이터 믹스로 훈련을 계속하는 'Garlic' 모델**은 경쟁력 있는 벤치마크 점수를 회복하면서도 생성 품질 저하는 합리적인 수준에 머물렀습니다. **'Garlic' 모델**은 일부 **미포함 벤치마크에서도 성능 향상**을 보였으며, 대규모 데이터셋에 대한 **신경망 필터링이 벤치마크 유출(leakage)을 의도치 않게 증폭**시킬 수 있음을 시사했습니다.

## AI 실무자를 위한 시사점
대규모 이중 언어 모델 개발 시 **데이터 큐레이션과 벤치마크 성능 간의 복잡한 관계**를 이해하는 데 중요한 통찰력을 제공합니다. 특히, **벤치마크 오염이 모델 성능에 미치는 영향**과 이를 관리하는 전략의 중요성을 강조하며, **고품질 필터의 사용이 의도치 않은 벤치마크 유출**을 일으킬 수 있다는 점은 데이터셋 구성 시 주의를 요구합니다. 또한, 공개된 **GAPERON 모델 및 훈련 파이프라인**은 LLM 안전성 및 재현성 연구를 위한 **귀중한 공개 테스트베드**로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.