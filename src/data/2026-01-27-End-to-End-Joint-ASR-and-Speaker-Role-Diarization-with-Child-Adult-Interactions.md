---
title: "[논문리뷰] End-to-End Joint ASR and Speaker Role Diarization with Child-Adult Interactions"
excerpt: "Shrikanth Narayanan이 arXiv에 게시한 'End-to-End Joint ASR and Speaker Role Diarization with Child-Adult Interactions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - End-to-End ASR
  - Speaker Diarization
  - Child Speech Processing
  - Whisper Model
  - Serialized Output Training
  - Multi-task Learning
  - State-Machine Decoding

permalink: /ai/review/2026-01-27-End-to-End-Joint-ASR-and-Speaker-Role-Diarization-with-Child-Adult-Interactions/

toc: true
toc_sticky: true

date: 2026-01-27 00:00:00+0900+0900
last_modified_at: 2026-01-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.17640)

**저자:** Anfeng Xu, Tiantian Feng, Somer Bishop, Catherine Lord, Shrikanth Narayanan



## 핵심 연구 목표
본 논문은 아동-성인 상호작용에서 정확한 전사 및 화자 역할 분리(speaker role diarization)의 어려움을 해결하는 것을 목표로 합니다. 특히, 기존의 분리된 ASR(자동 음성 인식) 및 화자 분리 파이프라인에서 발생하는 오류 전파 문제를 극복하고, 단일한 모델 내에서 신뢰할 수 있는 화자 식별 전사(speaker-attributed transcripts)를 대규모로 생성하고자 합니다.

## 핵심 방법론
제안하는 프레임워크는 **Whisper 인코더-디코더 아키텍처** 를 확장하여 ASR과 화자 역할 분리를 통합합니다. 주요 방법론은 (i) 화자 태그와 시작/종료 타임스탬프 토큰을 단일 출력 시퀀스로 생성하는 **직렬화된 출력 훈련(Serialized Output Training, SOT)** , (ii) 화자 판별 인코더 표현을 강화하는 **경량 프레임 레벨 화자 분리 헤드** 통합, (iii) 타임스탬프 정확도를 높이는 **화자 분리 유도형 침묵 억제(diarization-guided silence suppression)** , 그리고 (iv) 구조적으로 유효한 출력을 보장하는 **스테이트 머신 기반 강제 디코딩(state-machine-based forced decoding)** 으로 구성됩니다. 이 모든 구성 요소는 **가중 다중 작업 손실 함수** 를 통해 학습됩니다.

## 주요 결과
제안된 방법론은 두 가지 캐스케이드(cascaded) 기반 라인 대비 **일관되고 상당한 성능 향상** 을 보였습니다. Playlogue 및 ADOS 데이터셋에서 **Whisper-small** 과 **Whisper-large** 모델 모두에서 **다중 화자 단어 오류율(mtWER)을 약 9.7%에서 19.6%까지 상대적으로 감소** 시켰습니다. 또한, 경쟁력 있는 **화자 분리 오류율(DER)** 을 달성하고, 특히 **Attribution Error Rate (AER)** 에서 큰 개선을 보여 화자 귀속 정확도가 향상되었음을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 아동-성인 상호작용을 위한 **정확한 시간 경계가 있는 화자 식별 전사** 를 생성하는 실용적이고 효과적인 엔드-투-엔드 솔루션을 제공합니다. 이는 임상 및 연구 응용 분야에서 행동 음성 측정(behavioral speech measures)의 확장 가능한 자동 추출을 가능하게 합니다. 특히, **사전 훈련된 대규모 음성 모델(Whisper)** 을 복잡한 다중 작업에 효과적으로 적용하는 전략과 **구조화된 출력을 보장하는 강제 디코딩 메커니즘** 은 AI/ML 엔지니어들이 로버스트한 시스템을 개발하는 데 중요한 인사이트를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.