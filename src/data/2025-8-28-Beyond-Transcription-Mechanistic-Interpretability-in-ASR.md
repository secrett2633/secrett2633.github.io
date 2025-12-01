---
title: "[논문리뷰] Beyond Transcription: Mechanistic Interpretability in ASR"
excerpt: "Aviv Shamsian이 [arXiv]에 게시한 'Beyond Transcription: Mechanistic Interpretability in ASR' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - ASR
  - Mechanistic Interpretability
  - Logit Lens
  - Linear Probing
  - Activation Patching
  - Hallucinations
  - Repetitions
  - Encoder-Decoder

permalink: /ai/review/2025-8-28-Beyond-Transcription-Mechanistic-Interpretability-in-ASR/

toc: true
toc_sticky: true

date: 2025-08-28 13:10:39+0900
last_modified_at: 2025-08-28 13:10:39+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.15882)

**저자:** Neta Glazer, Yael Segal-Feldman, Hilit Segev, Aviv Shamsian, Asaf Buchnick, Gill Hetz, Ethan Fetaya, Joseph Keshet, Aviv Navon



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)에서 성공적으로 적용된 **메커니즘 해석 가능성(mechanistic interpretability) 기법** 을 음성 인식(ASR) 분야에 적용하여, 현대 ASR 시스템 및 대규모 오디오-언어 모델(LALM)의 내부 동작 및 동적 특성을 이해하는 것을 목표로 합니다. 특히 환각(hallucinations), 반복 루프(repetition loops), 문맥적으로 편향된 출력과 같은 주요 오류 현상의 근본적인 메커니즘을 밝히고, 모델의 투명성과 견고성을 향상시키는 데 기여하고자 합니다.

## 핵심 방법론
연구는 **Whisper-large-v3** 및 **Qwen2-Audio-7B-Instruct** 모델을 대상으로 진행되었으며, **logit lens** , **linear probing** , **activation patching** 과 같은 LLM 해석 가능성 기법들을 ASR 모델에 체계적으로 적용했습니다. **Linear probing** 을 통해 인코더/디코더 레이어에서 스피커 성별, 환경 노이즈, 악센트, 의미론적 정보, 환각 예측 등을 분석했으며, **activation patching** 과 **ablation** 을 사용하여 특정 구성 요소가 반복 현상에 미치는 인과적 역할을 규명했습니다.

## 주요 결과
**Linear probing** 결과, 인코더는 스피커 성별( **94.6% 정확도** ), 환경 노이즈( **90.0% 정확도** ), 악센트( **97.0% 정확도** )를 깊은 레이어에서 선형적으로 디코딩할 수 있음을 확인했습니다. 디코더의 잔여 스트림은 환각 관련 신호를 **93.4% 정확도(Whisper)** 로 예측할 수 있었습니다. 또한 **cross-attention 패칭** 을 통해 Whisper의 반복 환각이 특정 구성 요소( **레이어 23의 cross-attention** 에서 76% 해결, **레이어 18의 헤드 13** 에서 13% 추가 해결)에 의해 제어되며 총 **89%** 의 반복 현상이 수정됨을 밝혔습니다. 흥미롭게도 인코더 구성 요소에 대한 **disruptive audio 패칭** 이 역설적으로 음향 정확도를 향상시켜, 인코더가 음향 정보 외에 문맥적/의미론적 기대를 인코딩함을 시사합니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 해석 가능성 기법이 ASR 모델의 내부 동작을 진단하고 이해하는 데 강력한 도구임을 입증했습니다. AI 엔지니어는 이러한 기법을 활용하여 ASR 시스템의 오류 모드를 진단하고, **환각 또는 출력 품질 예측을 위한 실시간 내부 모니터** 를 구축할 수 있습니다. 또한 특정 구성 요소가 문제 행동에 미치는 인과 관계를 파악하여, 모델 신뢰성을 높이기 위한 **타겟팅된 개입(fine-tuning 또는 아키텍처 개선)** 을 설계할 수 있는 실질적인 토대를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.