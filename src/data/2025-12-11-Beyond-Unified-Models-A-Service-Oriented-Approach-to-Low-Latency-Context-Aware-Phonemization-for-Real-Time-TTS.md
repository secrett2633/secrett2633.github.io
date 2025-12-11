---
title: "[논문리뷰] Beyond Unified Models: A Service-Oriented Approach to Low Latency, Context Aware Phonemization for Real Time TTS"
excerpt: "Morteza Abolghasemi이 [arXiv]에 게시한 'Beyond Unified Models: A Service-Oriented Approach to Low Latency, Context Aware Phonemization for Real Time TTS' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - TTS
  - Phonemization
  - G2P
  - Low Latency
  - Real-time
  - Service-Oriented Architecture
  - Context-Aware
  - Persian Language

permalink: /ai/review/2025-12-11-Beyond-Unified-Models-A-Service-Oriented-Approach-to-Low-Latency-Context-Aware-Phonemization-for-Real-Time-TTS/

toc: true
toc_sticky: true

date: 2025-12-11 00:00:00+0900+0900
last_modified_at: 2025-12-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.08006)

**저자:** Mahta Fetrat, Donya Navabi, Zahra Dehghanian, Morteza Abolghasemi, Hamid R. Rabiee



## 핵심 연구 목표
경량화된 실시간 TTS 시스템에서 문맥 인지 phonemization의 품질과 추론 속도 간의 근본적인 트레이드오프를 해결하는 것이 목표입니다. 특히 페르시아어와 같이 복잡하고 모호한 phonemization 규칙을 가진 언어에서, 높은 계산 비용을 유발하는 심층 언어 모델 없이도 정확하고 자연스러운 발음을 보장하는 실용적인 프레임워크를 제시하고자 합니다.

## 핵심 방법론
이 연구는 두 가지 상보적인 전략을 제안합니다. 첫째, homograph disambiguation을 위해 **단어 동시 발생 분포** 를 활용하는 **경량 통계 기반 문맥 인지 모듈** 을 사용합니다. 둘째, Ezafe phoneme 감지를 위해 **SpaCy POS tagger** 의 지식을 **ALBERT 기반의 경량 모델** 로 **지식 증류** 하여 **ONNX** 로 내보낸 모델을 활용합니다. 이 모든 문맥 인지 모듈은 **서비스 지향 아키텍처** 를 통해 독립적인 서비스로 실행되며, 코어 TTS 엔진 ( **PiperTTS** )과 **IPC (piped input/output files)** 를 통해 통신하여 지연 시간을 최소화합니다.

## 주요 결과
제안된 **Piper + LCA-G2P** 시스템은 **Piper (Base)** 대비 **PER을 6.32%에서 4.80%로 감소** 시켰고, **Ezafe F1 스코어를 19.58%에서 90.08%로 크게 향상** 시켰으며, **Homograph Accuracy를 43.87%에서 77.67%로 개선** 했습니다. 이러한 품질 향상에도 불구하고 **RTF는 0.153에서 0.167로 거의 유지** 되었습니다. 또한, **ALBERT 기반 Ezafe 감지기** 는 **94.19%의 Ezafe F1 스코어** 를 **0.037초의 평균 추론 시간** 으로 달성하며, **MOS는 Piper (Base)의 2.41에서 3.14로 향상** 되었습니다.

## AI 실무자를 위한 시사점
이 연구는 **서비스 지향 아키텍처** 를 통해 컴퓨팅 자원이 제한적인 **에지 디바이스 또는 오프라인 환경** 에서 **고품질의 문맥 인지 G2P 모델** 을 실시간 TTS 파이프라인에 통합할 수 있는 실용적인 방법을 제시합니다. **지식 증류 및 통계적 접근 방식** 이 복잡한 언어 문제에 효과적인 경량 솔루션을 제공하여 **낮은 지연 시간과 높은 자연성** 을 동시에 달성할 수 있음을 보여줍니다. 이는 스크린 리더와 같은 접근성 애플리케이션 개발에 중요한 기여를 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.