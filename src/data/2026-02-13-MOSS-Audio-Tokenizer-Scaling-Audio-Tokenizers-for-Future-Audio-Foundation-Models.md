---
title: "[논문리뷰] MOSS-Audio-Tokenizer: Scaling Audio Tokenizers for Future Audio Foundation Models"
excerpt: "이 [arXiv]에 게시한 'MOSS-Audio-Tokenizer: Scaling Audio Tokenizers for Future Audio Foundation Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio Tokenizer
  - Transformer Architecture
  - End-to-End Learning
  - Residual Vector Quantization
  - Speech Synthesis
  - Audio Foundation Models
  - Scalability
  - Autoregressive Models

permalink: /ai/review/2026-02-13-MOSS-Audio-Tokenizer-Scaling-Audio-Tokenizers-for-Future-Audio-Foundation-Models/

toc: true
toc_sticky: true

date: 2026-02-13 00:00:00+0900+0900
last_modified_at: 2026-02-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.10934)

**저자:** Yitian Gong, Kuangwei Chen, Zhaoye Fei, Xiaogui Yang, Ke Chen, Yang Wang, Kexin Huang, Mingshu Chen, Ruixiao Li, Qinyuan Cheng, Shimin Li (Advisors: Xipeng Qiu)



## 핵심 연구 목표
기존 오디오 토크나이저의 **사전 학습된 인코더** , **의미론적 증류** , **이질적인 CNN 기반 아키텍처** 의존성으로 인한 재구성 충실도 및 확장성 한계를 극복하는 것이 목표입니다. 순수 **Transformer 기반의 종단 간 학습** 및 **동질적이고 확장 가능한 아키텍처** 를 통해 다양한 오디오 도메인에서 고충실도 재구성을 지원하고, 미래 **오디오 기초 모델** 을 위한 통합 인터페이스를 제공하고자 합니다.

## 핵심 방법론
본 연구는 **CAT (Causal Audio Tokenizer with Transformer)** 아키텍처를 제안하며, 인코더, **32-레이어 Residual Vector Quantization (RVQ)** 양자화기, 디코더 및 판별자를 **종단 간 (end-to-end)** 방식으로 공동 최적화합니다. **1.6억 개의 파라미터** 를 가진 **MOSS-Audio-Tokenizer** 는 **3백만 시간** 의 다양한 오디오 데이터로 사전 학습되었으며, **0.5B 파라미터의 디코더-온리 LLM** 을 이용한 오디오-텍스트 태스크 (ASR, 오디오 캡셔닝)를 통해 의미론적 정렬을 강화했습니다. 또한, **Progressive Sequence Dropout** 훈련 전략을 도입하여 가변 비트레이트 음성 생성을 가능하게 합니다.

## 주요 결과
**MOSS-Audio-Tokenizer** 는 **0.125 kbps에서 4 kbps** 에 이르는 광범위한 비트레이트에서 음성, 사운드, 음악 재구성 품질 면에서 기존 코덱들을 지속적으로 능가했습니다. 특히, **Seed-TTS-Eval** 벤치마크에서 기존 **비자기회귀 및 캐스케이드 TTS 시스템** 을 능가하는 **가장 높은 화자 유사도 점수 (SIM: 영어 73.1, 중국어 78.5)** 를 달성하며 최초의 순수 자기회귀 TTS 모델 성능을 입증했습니다. 또한, 보조 인코더 없이도 **ASR 성능 (WER 2.96, CER 3.44)** 에서 경쟁력을 확보하여, **CAT 아키텍처** 의 모델 파라미터 및 학습 컴퓨팅 스케일링에 따른 일관된 성능 향상을 보여주었습니다.

## AI 실무자를 위한 시사점
**CAT 아키텍처** 는 오디오 처리를 위한 **종단 간 Transformer 기반 모델** 의 확장성과 효율성을 입증하여, **오디오 기초 모델** 개발에 있어 복잡한 하이브리드 구조 대신 단순하고 동질적인 접근 방식의 가능성을 제시합니다. **MOSS-Audio-Tokenizer** 는 넓은 범위의 비트레이트에서 고품질 재구성을 지원하며, **실시간 스트리밍** 및 **다양한 다운스트림 오디오 애플리케이션 (TTS, ASR)** 에 적합한 강력한 도구입니다. **Progressive Sequence Dropout** 과 같은 훈련 전략은 모델 유연성을 높여 실제 응용 분야에서의 활용 가치를 더욱 증대시킵니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.