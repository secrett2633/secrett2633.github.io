---
title: "[논문리뷰] WhisTLE: Deeply Supervised, Text-Only Domain Adaptation for Pretrained
  Speech Recognition Transformers"
excerpt: "Karun Kumar이 [arXiv]에 게시한 'WhisTLE: Deeply Supervised, Text-Only Domain Adaptation for Pretrained
  Speech Recognition Transformers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - ASR
  - Domain Adaptation
  - Text-Only Training
  - Transformer
  - Variational Autoencoder
  - Deep Supervision
  - Whisper
  - Encoder-Decoder Models

permalink: /ai/review/2025-9-22-WhisTLE_Deeply_Supervised_Text-Only_Domain_Adaptation_for_Pretrained_Speech_Recognition_Transformers/

toc: true
toc_sticky: true

date: 2025-09-22 13:11:29+0900
last_modified_at: 2025-09-22 13:11:29+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.10452)

**저자:** Akshat Pandey,¹ Karun Kumar,¹ Raphael Tang²



## 핵심 연구 목표
본 논문은 **Whisper**와 같은 사전 훈련된 최신 ASR(Automatic Speech Recognition) 모델이 미지의 도메인 어휘와 발화를 처리할 때 발생하는 성능 저하 문제를 해결하고자 합니다. 특히, 목표 도메인의 음성 데이터 수집이 비현실적인 상황에서, **텍스트 데이터만을 활용한 심층 감독 도메인 적응 방법**을 개발하여 ASR 모델의 정확도를 높이고자 합니다.

## 핵심 방법론
제안하는 **WhisTLE** (Whisper with Text-to-Latent Encodings)은 ASR 모델의 인코더 출력(잠재 상태)을 텍스트로부터 직접 모델링하는 **Variational Autoencoder (VAE)**를 훈련시킵니다. 이 VAE는 실제 음성에서 얻은 Whisper 인코더의 출력을 정답으로 사용합니다. 이후, 학습된 텍스트-잠재 인코더를 원래 Whisper 인코더 대신 사용하여 ASR 디코더를 미세 조정하며, 선택적으로 **TTS(Text-to-Speech) 기반 적응**과 결합할 수 있습니다. 추론 시에는 원래 Whisper 인코더를 사용하므로 추가적인 런타임 비용은 발생하지 않습니다.

## 주요 결과
WhisTLE은 **TTS 적응과 결합했을 때(TLE+TTS) 가장 우수한 성능**을 보였습니다. 4개의 아웃-오브-도메인 데이터셋과 4개의 ASR 모델(Whisper-large/medium, Canary-1B/180M-flash)에 걸쳐 **TTS-only 적응 대비 평균 12.3%의 상대적인 WER(Word Error Rate) 감소**를 달성했습니다. 또한, **32가지 실험 시나리오 중 27가지에서 비-WhisTLE 기반의 모든 베이스라인 성능을 능가**했으며, 모든 조합에 TLE를 추가했을 때 평균 **17%의 상대적인 WER 감소** 효과를 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 ASR 모델의 도메인 적응에서 **텍스트 데이터만으로 모델의 내부 잠재 상태에 심층적인 감독을 제공**하는 방법의 효과를 입증합니다. AI 실무자들은 음성 데이터가 부족한 환경에서 **WhisTLE과 같은 VAE 기반 접근 방식**을 활용하여 사전 훈련된 ASR 모델의 도메인 특화 성능을 효율적으로 향상시킬 수 있습니다. 특히, **TTS 기반의 입력-출력 감독과 WhisTLE의 잠재 상태 감독을 결합**하면 시너지를 창출하여 ASR 시스템의 실제 환경 적용성을 크게 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.