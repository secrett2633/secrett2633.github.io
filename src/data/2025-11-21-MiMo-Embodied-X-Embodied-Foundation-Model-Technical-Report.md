---
title: "[논문리뷰] MiMo-Embodied: X-Embodied Foundation Model Technical Report"
excerpt: "이 [arXiv]에 게시한 'MiMo-Embodied: X-Embodied Foundation Model Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Model (VLM)
  - Embodied AI
  - Autonomous Driving
  - Foundation Model
  - Multimodal Learning
  - Task Planning
  - Affordance Prediction
  - Spatial Understanding
  - Reinforcement Learning

permalink: /ai/review/2025-11-21-MiMo-Embodied-X-Embodied-Foundation-Model-Technical-Report/

toc: true
toc_sticky: true

date: 2025-11-21 00:00:00+0900+0900
last_modified_at: 2025-11-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.16518)

**저자:** Xiaoshuai Hao, Lei Zhou, Zhijian Huang, Zhiwen Hou, Yingbo Tang, Lingfeng Zhang, Guang Li, Zheng Lu, Shuhuai Ren, Fuli Luo, Hangjun Ye, Long Chen



## 핵심 연구 목표
이 논문은 자율 주행(Autonomous Driving)과 인공지능(Embodied AI) 두 가지 핵심 도메인을 **단일 모델** 로 통합하는 **최초의 오픈소스 크로스-엠바디드 파운데이션 모델(MiMo-Embodied)** 을 개발하는 것을 목표로 합니다. 기존 전문화된 VLM의 제한된 도메인 일반화 능력을 극복하고, 동적인 물리적 환경에서의 이해 및 추론 능력을 획기적으로 향상시키고자 합니다.

## 핵심 방법론
MiMo-Embodied는 **Vision Transformer (ViT)** , **Projector (MLP)** , **Large Language Model (LLM)** 의 세 가지 핵심 구성 요소를 활용합니다. 훈련은 네 단계의 점진적 전략을 따르는데, 이는 **Embodied AI 감독 학습 미세 조정** , **자율 주행 감독 학습 미세 조정** , **CoT(Chain-of-Thought) 추론 감독 학습 미세 조정** , 그리고 **GRPO [19] 최적화** 를 통한 **강화 학습(Reinforcement Learning) 미세 조정** 을 포함합니다. 이 모델은 일반 시각-언어 이해, Embodied AI 및 자율 주행 시나리오를 아우르는 다양하고 큐레이션된 데이터셋으로 학습되었습니다.

## 주요 결과
MiMo-Embodied는 **17개의 Embodied AI 벤치마크** (Task Planning, Affordance Prediction, Spatial Understanding)와 **12개의 자율 주행 벤치마크** (Environmental Perception, Status Prediction, Driving Planning)에서 **최첨단(SOTA) 성능** 을 달성했습니다. 특히, 어포던스 예측 벤치마크에서 SOTA를 기록하고, 공간 이해 능력에서는 **CV-Bench에서 SOTA** 를 달성했습니다 (Table 3). 또한, 자율 주행 태스크에서 **63.3%의 성능 향상** (Ablation study, Table 7)을 보여주며 기존의 오픈소스, 클로즈드소스 및 전문화된 VLM들을 크게 능가했습니다.

## AI 실무자를 위한 시사점
MiMo-Embodied는 **단일 파운데이션 모델** 이 다양한 Embodied AI 및 자율 주행 시나리오에서 성공적으로 기능할 수 있음을 입증했습니다. 이는 **도메인 간 긍정적인 전이 학습과 상호 강화** 의 효과를 보여주며, 복잡하고 안전에 민감한 실제 환경에서 보다 지능적이고 적응력 있는 AI 시스템 개발의 가능성을 열었습니다. **다단계 학습 전략(SFT, CoT, RL)** 의 중요성을 강조하며, 공개된 코드와 모델은 향후 관련 연구를 촉진할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.