---
title: "[논문리뷰] Xiaomi-Robotics-0: An Open-Sourced Vision-Language-Action Model with Real-Time Execution"
excerpt: "이 [arXiv]에 게시한 'Xiaomi-Robotics-0: An Open-Sourced Vision-Language-Action Model with Real-Time Execution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA)
  - Real-Time Robotics
  - Diffusion Transformer
  - Flow Matching
  - Asynchronous Execution
  - Robot Manipulation
  - Pre-training
  - Catastrophic Forgetting

permalink: /ai/review/2026-02-16-Xiaomi-Robotics-0-An-Open-Sourced-Vision-Language-Action-Model-with-Real-Time-Execution/

toc: true
toc_sticky: true

date: 2026-02-16 00:00:00+0900+0900
last_modified_at: 2026-02-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12684)

**저자:** Xiaomi Robotics



## 핵심 연구 목표
본 논문은 대규모 VLA 모델의 높은 추론 지연 시간으로 인한 실시간 로봇 제어의 어려움과, 사전 학습된 VLM의 시각-의미론적 지식 손실(catastrophic forgetting) 문제를 해결하는 것을 목표로 합니다. 궁극적으로 고성능이며 빠르고 부드러운 **실시간 로봇 구동** 을 가능하게 하는 VLA 모델인 **Xiaomi-Robotics-0** 를 제안합니다.

## 핵심 방법론
**Xiaomi-Robotics-0** 는 **사전 학습된 VLM (Qwen3-VL-4B-Instruct)** 과 **Diffusion Transformer (DiT)** 로 구성된 **mixture-of-transformers (MoT)** 아키텍처를 채택합니다. 학습은 두 단계로 진행되는데, **사전 훈련** 에서는 대규모 **교차-엔터티 로봇 궤적** 과 **비전-언어 데이터** 를 사용하여 광범위한 액션 생성 능력을 부여하고, **A-shape attention mask** 와 **ROPE positional indices offset** 기법을 통해 **action prefix copying** 을 방지하여 반응성을 높였습니다. **비동기식 실행** 을 위한 독창적인 **post-training** 기법과 배포 전략을 통해 연속적인 액션 청크 간의 부드러운 전환을 보장합니다.

## 주요 결과
**Xiaomi-Robotics-0** 는 세 가지 시뮬레이션 벤치마크에서 **최첨단 성능** 을 달성했습니다. 특히 **LIBERO** 에서 **98.7%** 의 평균 성공률을, **CALVIN** 에서 평균 5개 작업 연속 완료 길이 **4.80** 을 기록했습니다. 실제 로봇 실험에서는 **Lego Disassembly** 및 **Towel Folding** 작업에서 높은 성공률과 처리량( **Towel Folding 1.2 pcs/min** )을 보였으며, **소비자용 GPU (NVIDIA GeForce RTX 4090)** 환경에서 **80ms** 의 낮은 추론 지연 시간으로 빠르고 부드러운 롤아웃을 가능하게 합니다. 또한, 기존 **Qwen3-VL-4B-Instruct VLM** 과 대등하거나 더 우수한 비전-언어 성능을 유지했습니다.

## AI 실무자를 위한 시사점
본 연구는 복잡한 **bimanual manipulation** 작업에서 **소비자용 GPU** 로 **실시간** VLA 모델을 배포할 수 있는 실용적인 가능성을 보여줍니다. 특히, **A-shape attention mask** 와 같은 혁신적인 학습 기법은 VLA 모델의 고질적인 문제인 **추론 지연** 과 **반응성 저하** 를 효과적으로 극복할 수 있음을 시사합니다. 코드와 모델 체크포인트의 **오픈소스 공개** 는 VLA 모델 연구 및 실제 로봇 응용 분야의 발전에 크게 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.