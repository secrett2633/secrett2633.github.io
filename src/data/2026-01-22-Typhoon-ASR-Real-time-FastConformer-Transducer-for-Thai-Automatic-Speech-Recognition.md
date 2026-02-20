---
title: "[논문리뷰] Typhoon ASR Real-time: FastConformer-Transducer for Thai Automatic Speech Recognition"
excerpt: "arXiv에 게시된 'Typhoon ASR Real-time: FastConformer-Transducer for Thai Automatic Speech Recognition' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Thai ASR
  - Real-time Speech Recognition
  - FastConformer-Transducer
  - Low-latency
  - Text Normalization
  - Dialect Adaptation
  - Data Curation
  - Streaming ASR

permalink: /ai/review/2026-01-22-Typhoon-ASR-Real-time-FastConformer-Transducer-for-Thai-Automatic-Speech-Recognition/

toc: true
toc_sticky: true

date: 2026-01-22 00:00:00+0900+0900
last_modified_at: 2026-01-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.13044)

**저자:** Warit Sirichotedumrong, Adisai Na-Thalang, Potsawee Manakul, Pittawat Taveekitworachai, Sittipong Sripaisarnmongkol, Kunat Pipatanakul



## 핵심 연구 목표
본 논문은 높은 지연 시간 때문에 스트리밍 애플리케이션에 비실용적인 대규모 오프라인 ASR 모델(예: Whisper)의 한계를 극복하고, 저지연 태국어 자동 음성 인식(ASR)을 위한 효율적인 스트리밍 솔루션을 개발하는 것을 목표로 합니다. 특히 태국어 ASR 커뮤니티의 재현성 문제를 해결하고 표준화된 평가 프로토콜을 제공하기 위해 **Typhoon ASR Benchmark** 를 공개합니다.

## 핵심 방법론
연구팀은 **115M 파라미터 FastConformer-Transducer 모델** 을 사용하여 저지연 스트리밍 성능을 확보했습니다. 또한, 여러 티처 모델( **Pathumma-Whisper-Large** , **Biodatlab-Distill-Whisper-Large** , **Internal-Whisper-Large** )의 합의를 활용한 **확장 가능한 준지도 학습 데이터 파이프라인** 을 통해 **11,000시간** 의 훈련 데이터를 큐레이션했습니다. 시스템적 모호성을 해결하고 일관된 훈련 목표를 생성하기 위해 **포괄적인 텍스트 정규화 파이프라인** 을 구현했으며, 이산 방언 적응을 위해 **2단계 커리큘럼 학습** 방식을 도입했습니다.

## 주요 결과
**Typhoon ASR Real-time 모델** 은 Whisper Large-v3에 비해 **계산 비용을 45배 절감** 하면서도 유사한 정확도를 달성했습니다. **Gigaspeech2-Typhoon 벤치마크** 에서 **6.81% CER** 을 기록하여 오프라인 Pathumma-Whisper Large-v3 (5.84%)와 비교할 만한 성능을 보였고, **Typhoon Isan ASR Realtime** 은 이산 방언 데이터셋에서 **10.65% CER** 을 달성하여 Whisper-Medium-Dialect (17.72%)를 크게 능가했습니다. 모델의 파라미터 수는 **115M** 으로, Pathumma-Whisper Large-v3 대비 약 **13배 작습니다.**

## AI 실무자를 위한 시사점
이 연구는 소수의 파라미터를 가진 데이터 중심 모델이 대규모 오프라인 모델을 능가하여 **실시간 스트리밍 ASR** 에 적합함을 입증했습니다. 특히 태국어와 같은 저자원 언어에서 **엄격한 텍스트 정규화** 의 중요성을 강조하며, 이는 일관된 훈련 데이터와 정확한 모델 성능으로 직결됩니다. 공개된 **Typhoon ASR Benchmark** 는 태국어 ASR 연구의 재현성을 높이고 표준화된 평가 환경을 제공하여 실용적인 AI 시스템 개발에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.