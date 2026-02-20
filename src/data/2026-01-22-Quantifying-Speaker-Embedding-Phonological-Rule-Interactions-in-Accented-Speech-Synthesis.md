---
title: "[논문리뷰] Quantifying Speaker Embedding Phonological Rule Interactions in Accented Speech Synthesis"
excerpt: "Jihwan Lee이 arXiv에 게시한 'Quantifying Speaker Embedding Phonological Rule Interactions in Accented Speech Synthesis' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Speech
  - Accent Control
  - Phonological Rules
  - Speaker Embeddings
  - Speech Synthesis
  - Disentanglement
  - Accent Classification

permalink: /ai/review/2026-01-22-Quantifying-Speaker-Embedding-Phonological-Rule-Interactions-in-Accented-Speech-Synthesis/

toc: true
toc_sticky: true

date: 2026-01-22 00:00:00+0900+0900
last_modified_at: 2026-01-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.14417)

**저자:** Thanathai Lertpetchpun, Yoonjeong Lee, Thanapat Trachu, Jihwan Lee, Tiantian Feng, Dani Byrd, Shrikanth Narayanan



## 핵심 연구 목표
현재 TTS 시스템에서 스피커 임베딩이 액센트 외의 음색이나 감정과 같은 특성까지 인코딩하여 액센트 제어가 불투명하고 어렵다는 문제를 해결하고자 합니다. 이 연구는 **스피커 임베딩과 언어학적으로 동기 부여된 음운 규칙** 간의 상호작용을 분석하여 액센트 제어의 투명성과 제어 가능성을 높이고, 음성 생성에서 **분리(disentanglement)** 프레임워크를 평가하는 것을 목표로 합니다.

## 핵심 방법론
**사전 훈련된 다국어 TTS 모델 (Kokoro-82M v0.19)** 을 활용하여 스피커 임베딩과 음운 시퀀스를 입력으로 사용합니다. 미국식 영어와 영국식 영어 간의 차이를 나타내는 세 가지 음운 규칙인 **플래핑 (t → r)** , **르로티시티 (r 삭제/모음화)** , 및 **모음 대응 (예: bath의 /æ/ → /a:/)** 을 구현합니다. 액센트 강도는 **Vox-Profile 액센트 분류 모델** 과 **액센트 임베딩 유사성** 으로 측정하며, 규칙과 임베딩 간의 상호작용을 정량화하기 위해 새로운 메트릭인 **음소 이동률 (PSR)** 을 도입했습니다.

## 주요 결과
모든 음운 규칙을 적용했을 때, 북미 스피커 임베딩의 경우 북미 액센트 예측 확률이 **86.5%에서 58.8%** 로 감소하고 영국 액센트 확률은 **17.3%** 로 증가했습니다. 영국 스피커 임베딩에서는 모든 규칙 적용 시 영국 액센트 확률이 **17.6%에서 78.4%** 로 크게 상승했습니다. **PSR** 값은 북미 스피커 임베딩에 모든 규칙 적용 시 **0.827** , 영국 스피커 임베딩에 모든 규칙 적용 시 **0.628** 로 나타나, 임베딩이 규칙 기반 변환을 약화시키거나 강화할 수 있음을 보여주었습니다. **UTMOS** 자연성 점수는 북미 **4.4** , 영국 **3.7** 수준으로 안정적으로 유지되어, 규칙 적용이 합성 음성의 자연성을 저해하지 않았습니다.

## AI 실무자를 위한 시사점
본 연구는 TTS에서 **음운 규칙의 명시적 적용** 이 스피커 임베딩과 상호작용하여 액센트 제어의 투명성과 제어 가능성을 향상시킬 수 있음을 입증했습니다. 도입된 **PSR 메트릭** 은 스피커 임베딩과 언어 규칙 간의 상호작용을 정량적으로 평가하여, 액센트와 스피커 정체성 간의 얽힘을 진단하고 더 **분리 가능한 음성 생성 모델** 을 개발하는 데 유용합니다. 이는 AI/ML 엔지니어가 특정 액센트 특성을 정밀하게 조정하고 **UTMOS** 와 같은 자연성 지표를 활용하여 고품질의 액센트 제어 TTS 시스템을 구축할 수 있는 실용적인 방안을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.