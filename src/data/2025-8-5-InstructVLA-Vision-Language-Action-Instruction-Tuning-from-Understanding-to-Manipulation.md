---
title: "[논문리뷰] InstructVLA: Vision-Language-Action Instruction Tuning from
  Understanding to Manipulation"
excerpt: "Yang Tian이 arXiv에 게시한 'InstructVLA: Vision-Language-Action Instruction Tuning from
  Understanding to Manipulation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA)
  - Instruction Tuning
  - Multimodal Reasoning
  - Robotic Manipulation
  - Catastrophic Forgetting
  - Mixture-of-Experts (MoE)
  - Flow Matching

permalink: /ai/review/2025-8-5-InstructVLA-Vision-Language-Action-Instruction-Tuning-from-Understanding-to-Manipulation/

toc: true
toc_sticky: true

date: 2025-08-05 11:40:52+0900
last_modified_at: 2025-08-05 11:40:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.17520)

**InstructVLA: Vision-Language-Action Instruction Tuning: From Understanding to Manipulation**

**저자:** Shuai Yang, Hao Li, Yilun Chen, Bin Wang, Yang Tian, Tai Wang, Hanqing Wang, Feng Zhao, Yiyi Liao, Jiangmiao Pang



## 핵심 연구 목표
본 논문은 로봇이 실제 환경에서 효과적으로 작동하기 위해 멀티모달 추론과 정확한 동작 생성을 통합하는 문제를 해결하고자 합니다. 기존 Vision-Language-Action (VLA) 모델들이 겪는 **재앙적 망각(catastrophic forgetting)** 문제와 작업 특정 데이터에 대한 능력 제약을 극복하고, **대규모 Vision-Language Models (VLMs)** 의 유연한 추론 능력을 유지하면서도 뛰어난 조작 성능을 제공하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **InstructVLA** 는 **Vision-Language-Action Instruction Tuning (VLA-IT)** 이라는 새로운 훈련 패러다임을 도입합니다. 이 패러다임은 **650K 샘플의 VLA-IT 데이터셋** 과 표준 VLM 코퍼스를 활용하며, **혼합 전문가(Mixture-of-Experts, MoE) 적응** 을 통해 텍스트 추론과 동작 생성을 공동으로 최적화합니다. 특히, **Eagle2-2B VLM** 백본에 **DINOv2** 기반의 시각 특징과 **FiLM** 모듈을 통합하고 **플로우 매칭(flow matching) 목적 함수** 를 사용하여 효율적인 동작 생성을 가능하게 합니다.

## 주요 결과
**InstructVLA** 는 동기식 **SimplerEnv** 작업에서 **SpatialVLA 대비 30.5% 향상된 성능** 을 달성했습니다. 또한, **SimplerEnv-Instruct 벤치마크** 에서는 미세 조정된 **OpenVLA보다 92%** , **GPT-4o의 지원을 받는 동작 전문가보다 29% 높은 성능** 을 보였습니다. 멀티모달 작업에서도 기준 VLM을 능가하며, **폐쇄 루프 조작에서 Magma 대비 27% 향상** 을 입증했습니다.

## AI 실무자를 위한 시사점
**InstructVLA** 는 로봇 조작 분야에서 **VLM의 추론 능력** 을 효과적으로 활용하는 새로운 접근 방식을 제시합니다. 특히 **재앙적 망각 문제** 를 완화하고, 다양한 사용자 지침과 자유 형식 명령을 처리할 수 있는 로봇 모델 개발에 중요한 시사점을 제공합니다. 이는 직관적이고 제어 가능한 **인간-로봇 상호작용** 을 구현하는 데 기여하며, 대규모 데이터셋과 **MoE** 와 같은 고급 아키텍처를 결합한 모델 설계의 효과를 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.