---
title: "[논문리뷰] OneFlow: Concurrent Mixed-Modal and Interleaved Generation with Edit
  Flows"
excerpt: "이 [arXiv]에 게시한 'OneFlow: Concurrent Mixed-Modal and Interleaved Generation with Edit
  Flows' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Non-Autoregressive
  - Multimodal Generation
  - Edit Flows
  - Flow Matching
  - Interleaved Generation
  - Text-to-Image Synthesis
  - Unified Models

permalink: /ai/review/2025-10-8-OneFlow-Concurrent-Mixed-Modal-and-Interleaved-Generation-with-Edit-Flows/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03506)

**저자:** John Nguyen, Marton Havasi, Tariq Berrada, Luke Zettlemoyer, Ricky T. Q. Chen



## 핵심 연구 목표
이 논문은 **오토회귀(AR) 모델** 의 엄격한 순차적 생성과 **확산(Diffusion) 모델** 의 고정 길이 생성이라는 근본적인 한계를 극복하는 것을 목표로 합니다. **변동 가능한 길이** 와 **동시적 혼합 모달리티 생성** 을 지원하며, 텍스트와 이미지가 상호 교차적으로 생성될 수 있는 최초의 **비오토회귀 멀티모달 모델** 을 제시하여 더욱 유연하고 자연스러운 생성을 구현하고자 합니다.

## 핵심 방법론
OneFlow는 이산적인 텍스트 토큰 생성을 위해 **삽입 기반의 Edit Flows** 를, 연속적인 이미지 잠재 공간 생성을 위해 **Flow Matching** 을 통합합니다. 이 모델은 단일 **Transformer 백본** 을 사용하여 텍스트 삽입 및 이미지 디노이징을 동시에 처리하며, **계층적 샘플링(hierarchical sampling)** 과 **인터리브드 시간 스케줄(interleaved time schedule)** 을 도입하여 텍스트와 이미지를 병렬적으로 발전시킵니다. 이를 통해 동시적인 이미지 삽입 및 정제를 가능하게 합니다.

## 주요 결과
OneFlow는 **1B에서 8B** 에 이르는 다양한 모델 크기에서 **오토회귀(AR) 및 확산 기반 모델** 보다 우수한 성능을 보였습니다. 특히, **VQA(Visual Question Answering)** 에서 **4%** 의 상대적 개선, 이미지 생성에서 **1.5%** 의 성능 향상을 달성했으며, 훈련 **FLOPs를 최대 50% 절감** 했습니다. 또한, **6단계의 샘플링** 만으로도 AR 모델과 대등한 캡셔닝 성능을 달성하여 효율성 측면에서도 강점을 보였습니다.

## AI 실무자를 위한 시사점
OneFlow는 **동시적 혼합 모달리티 생성, 반복적 정제, 자연스러운 추론-유사 생성** 과 같은 새로운 AI 기능을 가능하게 하여 차세대 **멀티모달 AI 시스템** 개발에 중요한 방향을 제시합니다. **비오토회귀 아키텍처** 와 **혼합 모달 사전 훈련(mixed-modal pretraining)** 의 효과는 **자원 효율적인 모델** 설계 및 **효과적인 추론 능력** 전이 가능성을 보여줍니다. **Classifier-free guidance (CFG)** 를 통한 텍스트 상세도 조절은 실제 응용에서 생성 품질을 유연하게 제어할 수 있는 실용적인 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.