---
title: "[논문리뷰] Streaming Video Instruction Tuning"
excerpt: "Kaiyang Zhou이 [arXiv]에 게시한 'Streaming Video Instruction Tuning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Streaming Video Understanding
  - Large Language Models (LLMs)
  - Instruction Tuning
  - Multi-task Learning
  - Real-time AI Assistant
  - Temporal Reasoning
  - Focal Loss
  - Video Question Answering

permalink: /ai/review/2025-12-25-Streaming-Video-Instruction-Tuning/

toc: true
toc_sticky: true

date: 2025-12-25 00:00:00+0900+0900
last_modified_at: 2025-12-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.21334)

**저자:** Jiaer Xia, Peixian Chen, Mengdan Zhang, Xing Sun, Kaiyang Zhou



## 핵심 연구 목표
이 논문은 실시간 비디오 스트림을 이해하고 동적인 지시에 반응하는 **일반 목적의 대화형 AI 어시스턴트인 Streamo** 를 개발하는 것을 목표로 합니다. 기존 오프라인 비디오 모델의 한계인 실시간 처리, 무한한 데이터 흐름 처리, 가변적인 응답 타이밍 및 세분화 문제를 해결하여, 연속적인 비디오 스트림 내에서 통합적이고 지능적인 비디오 이해를 가능하게 하는 것이 주된 목적입니다.

## 핵심 방법론
연구는 실시간 비디오 이해를 위해 **Streamo-Instruct-465K** 라는 대규모 멀티태스크 지시-튜닝 데이터셋을 구축했습니다. 모델은 **<Silence>, <Standby>, <Response>** 세 가지 응답 상태 예측을 직접 통합하여 프레임 수준의 의사 결정을 수행하며, 학습 시 발생하는 클래스 불균형 문제를 완화하기 위해 **Focal Weighting 및 Frequency-based Alpha Weights** 를 적용한 손실 함수를 사용합니다. 이 end-to-end 학습 프레임워크는 오프라인 비디오 모델을 실시간 스트리밍 어시스턴트로 효과적으로 전환합니다.

## 주요 결과
**Streamo-7B 모델** 은 **OVO-Bench 벤치마크** 에서 기존 SOTA 모델인 **Dispider** 보다 **평균 성능에서 +13.83%** 를 크게 능가했습니다. **Streamo-Instruct-465K 데이터셋** 은 **ET-Instruct-164K** 에 비해 포워드 태스크에서 **+7.1%** , 전체적으로 **+11.79%** 의 성능 향상을 제공했으며, 오프라인 벤치마크에서도 기존 SOTA 모델인 **StreamingVLM** 을 능가하는 강력한 성능을 입증했습니다. 이는 Streamo가 온라인 및 오프라인 환경 모두에서 뛰어난 성능과 견고한 명령 수행 능력을 갖추었음을 보여줍니다.

## AI 실무자를 위한 시사점
이 연구는 **오프라인 비디오 LLM을 실시간 스트리밍 어시스턴트** 로 전환하는 실용적이고 효과적인 프레임워크를 제시합니다. **Streamo-Instruct-465K** 와 같은 고품질, 멀티태스크 데이터셋 구축의 중요성과 **Focal Loss** 가 클래스 불균형 문제를 해결하고 모델의 응답 타이밍 학습 능력을 향상시키는 데 핵심적인 역할을 함을 강조합니다. 이는 실제 스트리밍 환경에서 복잡한 시간적 추론 및 동적 상호작용 능력을 갖춘 신뢰성 있는 AI 솔루션을 구현하는 데 중요한 지침이 됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.