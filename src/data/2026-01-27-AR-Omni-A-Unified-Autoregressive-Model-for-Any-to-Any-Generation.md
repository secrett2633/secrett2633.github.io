---
title: "[논문리뷰] AR-Omni: A Unified Autoregressive Model for Any-to-Any Generation"
excerpt: "arXiv에 게시된 'AR-Omni: A Unified Autoregressive Model for Any-to-Any Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Models
  - Multimodal AI
  - Any-to-Any Generation
  - Unified Model
  - Speech Generation
  - Image Generation
  - Transformer Decoder
  - Real-time Streaming

permalink: /ai/review/2026-01-27-AR-Omni-A-Unified-Autoregressive-Model-for-Any-to-Any-Generation/

toc: true
toc_sticky: true

date: 2026-01-27 00:00:00+0900+0900
last_modified_at: 2026-01-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.17761)

**저자:** Dongjie Cheng, Ruifeng Yuan, Yongqi Li, Wenjie Wang, Liqiang Nie, Lei Zhang, Runyang You, Wenjie Li



## 핵심 연구 목표
본 논문은 기존 멀티모달 대규모 언어 모델(MLLM)이 멀티모달 생성을 위해 외부 전문가 구성 요소(예: 확산 디코더)에 의존하는 한계를 극복하고자 합니다. 텍스트, 이미지, 음성을 단일 모델로 처리하는 **Unified Autoregressive (AR) Model** 을 제안하여, 훈련 및 추론의 단순성과 확장성을 동시에 달성하고, 모달리티 불균형, 시각적 충실도, 안정성-창의성 간의 트레이드오프와 같은 실질적인 문제를 해결하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **AR-Omni** 라는 통합 **any-to-any 모델** 을 제안하며, 텍스트, 이미지, 음성을 이산적인 심볼로 토큰화하고 **단일 조인트 어휘(single joint vocabulary)** 로 통합합니다. 이를 통해 **단일 Transformer 디코더** 로 텍스트, 이미지, 스트리밍 음성을 **다음 토큰 예측(next-token prediction)** 방식으로 생성합니다. 특히, 모달리티 불균형을 완화하기 위해 **태스크 인지 손실 재가중치(task-aware loss reweighting)** 를 사용하고, 시각적 충실도를 높이기 위해 **토큰 수준 지각 정렬 손실(token-level perceptual alignment loss)** 을 도입하며, **유한 상태 디코딩 메커니즘(finite-state decoding mechanism)** 을 활용하여 안정성과 창의성을 조절합니다.

## 주요 결과
**AR-Omni** 는 음성 생성에서 **146ms의 첫 토큰 지연 시간(first-token latency)** 과 **0.88의 실시간 요소(Real-time Factor, RTF < 1)** 를 달성하여 실시간 스트리밍 성능을 입증했습니다. 또한, **VCTK** 데이터셋에서 **6.5%의 zero-shot TTS WER** 과 **LibriSpeech test-clean** 에서 **9.4%의 ASR WER** 을 기록하여 경쟁력 있는 음성 품질을 보여주었습니다. 이미지 캡셔닝(I2T)에서는 **MS-COCO** 에서 **56.53 CIDEr** 를 달성하여, 동일한 확산 디코더 없는 AR 설정에서 **Anole (7B)** 의 **15.07 CIDEr** 를 크게 능가했습니다.

## AI 실무자를 위한 시사점
**AR-Omni** 는 텍스트, 이미지, 음성 등 다양한 모달리티를 단일 **Transformer** 기반의 AR 모델로 통합함으로써, 멀티모달 AI 시스템의 아키텍처를 **단순화하고 확장성** 을 높일 수 있음을 보여줍니다. 특히 **실시간 음성 생성** 능력은 음성 비서, 실시간 번역, 인터랙티브 멀티모달 챗봇과 같은 대화형 AI 애플리케이션에 직접적으로 적용될 수 있는 중요한 이점을 제공합니다. 또한, 모달리티별 특성을 고려한 **손실 함수 재가중치** 및 **지각 손실** 도입은 복잡한 멀티모달 데이터 훈련 시 **모델 안정성 및 성능 향상** 을 위한 효과적인 전략을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.