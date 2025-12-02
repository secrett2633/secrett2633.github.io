---
title: "[논문리뷰] DualVLA: Building a Generalizable Embodied Agent via Partial Decoupling of Reasoning and Action"
excerpt: "Zhuoyang Liu이 [arXiv]에 게시한 'DualVLA: Building a Generalizable Embodied Agent via Partial Decoupling of Reasoning and Action' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA)
  - Embodied AI
  - Action Degeneration
  - Data Pruning
  - Knowledge Distillation
  - Multi-modal Reasoning
  - Robot Learning
  - VLA Score

permalink: /ai/review/2025-12-01-DualVLA-Building-a-Generalizable-Embodied-Agent-via-Partial-Decoupling-of-Reasoning-and-Action/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.22134)

**저자:** Zhen Fang, Zhuoyang Liu, Jiaming Liu, Hao Chen, Yu Zeng, Shiting Huang, Zehui Chen, Lin Chen, Shanghang Zhang, Feng Zhao



## 핵심 연구 목표
본 논문은 Vision-Language-Action (VLA) 모델에서 발생하는 **'액션 퇴화(action degeneration)'** 문제를 해결하는 것을 목표로 합니다. 이는 전문 VLA 모델에 추가적인 추론 능력을 부여할 때 조작 성능이 저하되는 현상으로, 추론 능력과 액션 수행 능력 간의 균형을 맞추어 일반화 가능한 임바디드 에이전트를 구축하는 것이 핵심 연구 목적입니다.

## 핵심 방법론
DualVLA는 액션 성능 향상과 추론 능력 유지를 위해 두 가지 주요 전략을 제안합니다. 첫째, **이중 레이어 데이터 가지치기(dual-layer data pruning)** 를 통해 훈련 데이터에서 불필요한 저엔트로피 임바디드 추론 세그먼트를 제거하여 액션 학습에 대한 부정적인 영향을 완화합니다. 둘째, **이중 교사 적응형 증류(dual-teacher adaptive distillation)** 전략을 사용하여, **액션 교사(specialist VLA)** 는 미세 조정된 조작 감독을 제공하고, **추론 교사(pre-finetuned VLM)** 는 일반적인 추론 능력을 유지하도록 각 데이터 도메인에 차별화된 감독 신호를 할당합니다. 또한, VLA 모델의 성능을 액션, 추론, 의도, 추론-액션 정렬의 네 가지 차원에서 평가하는 **VLA Score** 를 제안합니다.

## 주요 결과
DualVLA는 **SimplerEnv 벤치마크** 에서 평균 성공률 **61.0%** 를 달성하여, 기준선인 **InstructVLA-G** 대비 **8.0%p** 성능을 향상시켰습니다. 또한, 최고 성능의 전문 VLA인 **InstructVLA-E** 보다 평균 성공률 **5.0%** 높았고, 최고 추론 VLA인 **ThinkACT** 보다 **3.9%** 높은 성능을 기록했습니다. 실제 로봇 환경의 조작 태스크에서는 평균 성공률을 **45%에서 60.0%** 로 향상시켰으며, 데이터 가지치기 전략은 추론 속도를 **약 20%** 향상시켰습니다.

## AI 실무자를 위한 시사점
본 연구는 조작 능력과 다중 모달 추론 능력 사이의 균형을 효과적으로 달성하는 로봇 학습 프레임워크를 제공하여 임바디드 AI 개발의 중요한 과제를 해결합니다. **이중 레이어 데이터 가지치기** 는 훈련 데이터의 효율성을 높이고 성능을 개선할 수 있는 실용적인 데이터 전처리 기법을 제시합니다. **이중 교사 증류** 전략은 기존 전문 모델의 강점을 활용하여 특정 기술을 강화하면서도 모델의 일반화 능력을 유지하는 데 유용하며, 이는 보다 다재다능한 로봇 시스템 구축에 필수적입니다. 새로 도입된 **VLA Score** 는 단순히 성공률을 넘어선 미세 조정된 평가 프레임워크를 제공하여, 실무자들이 복잡한 VLA 시스템의 실패 원인을 더 정확하게 진단할 수 있도록 돕습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.