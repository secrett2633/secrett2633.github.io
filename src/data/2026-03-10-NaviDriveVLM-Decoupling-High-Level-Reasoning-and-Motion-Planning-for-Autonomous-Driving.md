---
title: "[논문리뷰] NaviDriveVLM: Decoupling High-Level Reasoning and Motion Planning for Autonomous Driving"
excerpt: "arXiv에 게시된 'NaviDriveVLM: Decoupling High-Level Reasoning and Motion Planning for Autonomous Driving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autonomous Driving
  - Vision-Language Models
  - Motion Planning
  - High-Level Reasoning
  - Decoupled Architecture
  - Supervised Fine-tuning
  - NuScenes Benchmark

permalink: /ai/review/2026-03-10-NaviDriveVLM-Decoupling-High-Level-Reasoning-and-Motion-Planning-for-Autonomous-Driving/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.07901)

**저자:** Ximeng Tao, Pardis Taghavi, Dimitar Filev, Reza Langari, Gaurav Pandey



## 핵심 연구 목표
본 연구는 기존 **VLM 기반 자율주행(AD) 시스템** 이 직면한 고수준 추론 능력과 정밀한 모션 계획 사이의 트레이드오프 문제를 해결하고자 합니다. 대규모 VLM은 강력한 의미론적 이해력을 제공하지만 정밀 제어에 적응하기 어렵고, 소규모 VLM은 효율적인 미세 조정을 가능하게 하지만 추론 능력이 약해지는 문제를 해결하여, 강력한 추론과 정확한 모션 계획을 동시에 달성하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 추론과 행동 생성을 분리하는 **NaviDriveVLM** 이라는 **디커플링된 프레임워크** 를 제안합니다. 이 프레임워크는 **Navigator** 라는 **고정된 대규모 VLM (Qwen3-VL-8B)** 을 사용하여 시각적 입력과 자율주행 맥락에 기반한 장면 설명, 권장 조치 및 관련 추론을 생성합니다. 이후 **Driver** 라는 **경량의 학습 가능한 VLM (Qwen3-VL-2B)** 이 Navigator의 추론 결과와 추가 입력을 활용하여 미래 웨이포인트를 예측하도록 **SFT(Supervised Fine-tuning)** 됩니다.

## 주요 결과
**nuScenes 벤치마크** 실험에서 NaviDriveVLM은 기존의 대규모 VLM 기반 모델들을 능가하는 성능을 보였습니다. 특히, **엔드-투-엔드 모션 계획 태스크** 에서 평균 **L2 오류 0.46m** 를 달성하여, 단일 대규모 VLM인 OpenEMMA의 **2.81m** 및 경량 Driver-VLM 단독 모델의 **0.60m** 대비 현저히 낮은 오류를 기록했습니다. 또한, Navigator의 고수준 명령을 통합하면 평균 L2 오류가 **1.515m에서 1.288m** 로 감소하여 추론의 중요성이 입증되었습니다.

## AI 실무자를 위한 시사점
이 연구는 자율주행 분야에서 **VLM의 실용적인 적용** 을 위한 새로운 접근 방식을 제시합니다. 특히, 대규모 모델의 강력한 추론 능력과 경량 모델의 효율적인 제어 능력을 결합하여 **성능과 비용 효율성** 을 동시에 최적화할 수 있음을 보여줍니다. 추론을 **명시적이고 해석 가능한 중간 표현** 으로 활용함으로써, AI 엔지니어는 자율주행 시스템의 의사결정 과정을 더 쉽게 이해하고 디버깅하여 안전성과 신뢰성을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.