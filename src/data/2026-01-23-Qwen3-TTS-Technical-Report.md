---
title: "[논문리뷰] Qwen3-TTS Technical Report"
excerpt: "arXiv에 게시된 'Qwen3-TTS Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Speech (TTS)
  - Multilingual
  - Voice Cloning
  - Controllable Speech
  - Streaming
  - Speech Tokenization
  - Language Models
  - Low-latency

permalink: /ai/review/2026-01-23-Qwen3-TTS-Technical-Report/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.15621)

**저자:** Qwen Team



## 핵심 연구 목표
본 논문은 고급 **다국어(multilingual)** , **제어 가능한(controllable)** , **강건한(robust)** , **스트리밍(streaming) TTS 모델** 인 Qwen3-TTS 시리즈를 소개하는 것을 목표로 합니다. 특히 **3초 음성 복제(voice cloning)** 및 **설명 기반 제어(description-based control)** 기능을 통해 완전히 새로운 음성을 생성하고 출력 음성을 미세 조정하는 기능을 제공하며, LLM과의 통합 및 **초저(ultra-low) 첫 패킷 지연 시간** 을 달성하는 데 중점을 둡니다.

## 핵심 방법론
Qwen3-TTS는 실시간 합성을 위한 **듀얼-트랙 LM 아키텍처** 와 두 가지 스피치 토크나이저를 채택합니다. **Qwen-TTS-Tokenizer-25Hz** 는 단일 코드북 코덱으로 **block-wise DiT** 를 통한 스트리밍 파형 재구성을 지원하며, **Qwen-TTS-Tokenizer-12Hz** 는 **12.5Hz 멀티-코드북** 설계와 경량의 **causal ConvNet** 을 사용하여 초저 지연 시간 스트리밍을 구현합니다. 이 모델은 **10개 언어에 걸쳐 5백만 시간 이상의 음성 데이터** 로 사전 훈련 및 후속 훈련되었습니다.

## 주요 결과
Qwen3-TTS는 다양한 벤치마크에서 **최첨단 성능** 을 달성했습니다. 특히 **Seed-TTS 벤치마크** 에서 **가장 낮은 Word Error Rate (WER)** 를 기록했으며, **Qwen3-TTS-12Hz-1.7B** 모델은 `test-en` 세트에서 **1.24%의 WER** 을 달성했습니다. 첫 패킷 지연 시간은 **최저 97ms** 를 기록했으며, InstructTTSEval 벤치마크에서 **GPT-40-mini-tts** 를 능가하는 **제어 가능성** 을 보여주었습니다.

## AI 실무자를 위한 시사점
Qwen3-TTS는 **다국어, 제어 가능성, 초저 지연 시간 스트리밍** 기능을 통해 가상 비서, 콘텐츠 제작 등 실시간 상호작용이 필요한 AI 시스템에 매우 유용합니다. 공개된 토크나이저와 모델들은 개발자들이 복잡한 음성 제어 및 **최첨단 음성 복제** 기능을 손쉽게 활용할 수 있도록 하여, 새로운 음성 생성을 위한 데이터 수집 부담을 줄일 수 있습니다. 또한, **10분 이상의 자연스럽고 유창한 장문 음성 생성** 의 안정성은 장기 오디오 출력 애플리케이션에 매우 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.