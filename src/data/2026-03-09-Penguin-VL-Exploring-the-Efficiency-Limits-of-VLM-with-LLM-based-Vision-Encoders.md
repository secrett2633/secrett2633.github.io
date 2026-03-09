---
title: "[논문리뷰] Penguin-VL: Exploring the Efficiency Limits of VLM with LLM-based Vision Encoders"
excerpt: "arXiv에 게시된 'Penguin-VL: Exploring the Efficiency Limits of VLM with LLM-based Vision Encoders' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision Language Model (VLM)
  - LLM-based Vision Encoder
  - Efficient AI
  - Multimodal Understanding
  - Generative Pretraining
  - Resource-constrained Deployment
  - Temporal Reasoning

permalink: /ai/review/2026-03-09-Penguin-VL-Exploring-the-Efficiency-Limits-of-VLM-with-LLM-based-Vision-Encoders/

toc: true
toc_sticky: true

date: 2026-03-09 00:00:00+0900+0900
last_modified_at: 2026-03-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.06569)

**저자:** Boqiang Zhang*, Lei Ke*,†, Ruihan Yang*, Qi Gao*, Tianyuan Qu*,§, Rossell Chen, Dong Yu, Leoweiliang+



## 핵심 연구 목표
본 논문은 컴퓨팅 자원이 제한된 환경(모바일, 엣지 디바이스)에서 VLM(Vision Language Model) 배포를 저해하는 모델 크기 확장의 문제를 해결하고자 합니다. 특히, **2B 및 8B 규모의 컴팩트 VLM** 의 성능 한계를 탐색하고, 시각 인코더 초기화에 대한 기존의 **대규모 대조 학습(contrastive pretraining)** 관행에 도전하여, LLM 기반 시각 인코더가 미세한 시각적 충실도와 데이터 효율성을 높일 수 있음을 입증하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **텍스트 전용 LLM(Qwen3-0.6B)** 으로 시각 인코더를 직접 초기화하는 **Penguin-Encoder** 를 제안합니다. 이 인코더는 시각 토큰 처리를 위해 **양방향 어텐션** 및 **2D-ROPE** 를 통합하며, **혼합 감독 인코더 사전 훈련(Mixed Supervision Encoder Pretraining)** 전략을 통해 **재구성 손실(reconstruction loss)** (예: **Amplitude Loss** , **Direction Loss** , **Relation Loss** )을 활용하여 시각적 세부 사항과 LLM의 특징 공간을 정렬합니다. 또한, 효율적인 비디오 처리를 위해 **Temporal Redundancy-Aware (TRA) 토큰 압축** 메커니즘을 도입한 **통합 학습 레시피(Unified Training Recipe)** 를 사용합니다.

## 주요 결과
**Penguin-VL 2B** 모델은 대부분의 차트 및 문서 이해 벤치마크에서 선도적인 성능을 달성했으며, **MathVista** 에서 최고 성능을 기록했습니다. 특히 **Charades-STA** 에서 **InternVL3.5** 를 **34점 이상** 으로 능가하며 정밀한 시간적 지역화 능력을 보였습니다. **8B 모델** 은 **DocVQA에서 96.2** , **ChartQA에서 90.5** 를 기록하는 등 여러 지표에서 선두를 차지했고, **Charades-STA** 에서 **Qwen3-VL** 보다 **5.4점** , **InternVL-3.5** 보다 **28.6점** 높은 점수를 달성했습니다.

## AI 실무자를 위한 시사점
이 연구는 모델 크기 확장이 아닌 **시각 표현 개선** 이 성능의 주요 동인임을 보여주며, 이는 **컴퓨팅 제약이 있는 환경에서의 효율적인 VLM 배포** 에 중요한 시사점을 제공합니다. **LLM 기반 시각 인코더** 는 기존 대조 학습 방식보다 데이터 효율성이 높고 시각적 충실도가 우수하여, AI 엔지니어가 **자원 제약이 있는 시스템** 에서 고성능 멀티모달 모델을 구축할 수 있는 강력한 대안을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.