---
title: "[논문리뷰] Drax: Speech Recognition with Discrete Flow Matching"
excerpt: "이 [arXiv]에 게시한 'Drax: Speech Recognition with Discrete Flow Matching' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Automatic Speech Recognition (ASR)
  - Discrete Flow Matching (DFM)
  - Non-Autoregressive (NAR)
  - Generative Models
  - Tri-mixture Probability Path
  - Parallel Decoding
  - Accuracy-Efficiency Trade-off
  - Speech Synthesis

permalink: /ai/review/2025-10-8-Drax_Speech_Recognition_with_Discrete_Flow_Matching/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04162)

**저자:** Aviv Navon, Aviv Shamsian, Neta Glazer, Yael Segal-Feldman, Gill Hetz, Joseph Keshet, Ethan Fetaya



## 핵심 연구 목표
자동 음성 인식(ASR) 분야에서 순차적 디코딩 방식의 **자기회귀(AR) 모델**이 가진 효율성 병목 현상과 높은 지연 시간을 해결하는 것이 주요 목표입니다. 특히, **Discrete Flow Matching (DFM)** 기반의 **비자기회귀(NAR)** ASR 모델인 **Drax**를 제안하여, 학습-추론 간의 불일치를 해소하고 효율적인 병렬 디코딩을 가능하게 하는 새로운 프레임워크를 구축하고자 합니다.

## 핵심 방법론
본 연구는 **Drax**라는 새로운 **DFM 기반 NAR ASR** 프레임워크를 제안합니다. 핵심은 기존의 단순한 노이즈-타겟 경로 대신 **오디오 조건부 중간 분포(audio-conditioned middle distribution)**를 포함하는 **삼중 혼합 확률 경로(tri-mixture probability path)**를 도입하는 것입니다. 모델 아키텍처는 **Whisper 인코더**와 **DiT 트랜스포머 디코더**를 활용하며, 학습 과정에서 표준 DFM 손실과 중간 분포에 대한 보조 교차 엔트로피 손실을 결합하여 최적화합니다. 추론 시에는 **최소 베이즈 위험(MBR)** 디코딩 및 **Whisper 기반 재점수화(Whisper-guided rescoring)**와 같은 다양한 후보 스코어링 전략과 **추측 디코딩(speculative decoding)**을 지원합니다.

## 주요 결과
**Drax**는 최신 ASR 모델들과 비교하여 경쟁력 있는 인식 정확도를 달성하며, 효율성 측면에서 우수한 **정확도-효율성 트레이드오프**를 제공합니다. 예를 들어, 영어 데이터셋에서 **Drax (16/1)**는 **8.4 WER**과 **32.2 RTFx**를 기록하여, **Whisper** 대비 효율성에서 우위를 보였습니다. 특히, 제안된 **삼중 혼합 경로**는 훈련 과정에서 **균일 소스-오디오 중간 경로**가 다른 경로들보다 현저히 낮은 **WER**을 달성하며 모델 강건성과 오류 감소에 기여함을 입증했습니다. 또한 **추측 디코딩** 시 **Whisper-Turbo** 대비 **20배에서 42배의 속도 향상**을 보여주었습니다.

## AI 실무자를 위한 시사점
**Drax**는 ASR 시스템의 고질적인 문제인 **지연 시간**을 해결할 수 있는 강력한 **NAR 솔루션**을 제공하며, 특히 **실시간 및 대규모 ASR 배포**에 유리합니다. **오디오 조건부 중간 분포**를 통한 학습-추론 불일치 해결 방법은 다른 생성 모델에도 적용 가능성이 있는 일반적인 방법론을 제시합니다. **NFE(Number of Function Evaluations)** 및 후보군 크기 조절을 통해 **정확도와 효율성을 명시적으로 제어**할 수 있어, 다양한 서비스 요구사항에 맞춰 유연하게 모델을 최적화할 수 있는 이점을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.