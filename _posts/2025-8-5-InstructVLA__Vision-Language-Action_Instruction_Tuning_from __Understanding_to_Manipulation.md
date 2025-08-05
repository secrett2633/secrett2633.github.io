---
title: "[논문리뷰] InstructVLA: Vision-Language-Action Instruction Tuning from
  Understanding to Manipulation"
excerpt: "Yang Tian이 [arXiv]에 게시한 'InstructVLA: Vision-Language-Action Instruction Tuning from
  Understanding to Manipulation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:  - Review
  - Vision-Language-Action
  - Instruction Tuning
  - Robotic Manipulation
  - Multimodal Reasoning
  - Catastrophic Forgetting
  - Mixture-of-Experts
  - Flow Matching

permalink: /ai/review/2025-8-5-InstructVLA__Vision-Language-Action_Instruction_Tuning_from __Understanding_to_Manipulation/

toc: true
toc_sticky: true

date: 2025-08-05 11:12:10+0900
last_modified_at: 2025-08-05 11:12:10+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.17520)

**저자:** Shuai Yang, Hao Li, Yilun Chen, Bin Wang, Yang Tian

**키워드:** `Vision-Language-Action`, `Instruction Tuning`, `Robotic Manipulation`, `Multimodal Reasoning`, `Catastrophic Forgetting`, `Mixture-of-Experts`, `Flow Matching`

## 핵심 연구 목표
로봇이 현실 세계에서 효과적으로 작동하기 위해 멀티모달 추론과 정확한 행동 생성을 통합하는 것입니다. 기존의 **VLA(Vision-Language-Action) 모델**들이 언어 이해 능력 저하 및 **파괴적 망각** 문제를 겪고 태스크별 데이터에 국한되는 한계를 극복하고, **대규모 시각-언어 모델(VLM)**의 유연한 추론 능력을 유지하면서 선도적인 조작 성능을 달성하는 것을 목표로 합니다.

## 핵심 방법론
**InstructVLA**는 **Vision-Language-Action Instruction Tuning (VLA-IT)**이라는 새로운 훈련 패러다임을 도입합니다. 이 모델은 **650K 샘플의 VLA-IT 데이터셋**과 표준 VLM 코퍼스를 활용하며, **Mixture-of-Experts (MoE) 어댑테이션 프레임워크**를 통해 텍스트 추론과 행동 생성을 공동으로 최적화합니다. 또한, 언어 기반 동작 설명을 통해 추출된 **잠재 행동 표현**을 사용하는 **액션 사전 훈련**과 **플로우 매칭(Flow Matching)**을 활용하여 저수준 제어를 효과적으로 디커플링합니다.

## 주요 결과
**InstructVLA**는 SimplerEnv 도메인 내 태스크에서 **SpatialVLA 대비 30.5% 성능 향상**을 달성했습니다. 또한, **SimplerEnv-Instruct** 벤치마크에서는 미세 조정된 **OpenVLA 대비 92%**, **GPT-4o 지원 액션 전문가 대비 29%** 더 나은 성능을 보였습니다. 멀티모달 태스크에서 기준 **VLM을 능가**했으며, 시뮬레이션 및 실제 환경 모두에서 텍스트 추론을 활용하여 조작 성능을 향상시키는 추론 시간 스케일링을 입증했습니다.

## AI 실무자를 위한 시사점
**InstructVLA**는 **파괴적 망각** 문제를 해결하고 **VLM**의 강력한 추론 능력을 로봇 조작에 효과적으로 통합하는 실용적인 방법론을 제시합니다. **VLA-IT 데이터셋**과 **MoE 아키텍처**는 복잡하고 자유 형식의 사용자 지시를 이해하고 따를 수 있는 **범용 로봇 에이전트 개발**에 중요한 통찰력을 제공하며, 실질적인 로봇 제어 시스템 설계에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.