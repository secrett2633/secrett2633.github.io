---
title: "[논문리뷰] LLaVA-Critic-R1: Your Critic Model is Secretly a Strong Policy Model"
excerpt: "Jianwei Yang이 [arXiv]에 게시한 'LLaVA-Critic-R1: Your Critic Model is Secretly a Strong Policy Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models (VLMs)
  - Critic Models
  - Policy Models
  - Reinforcement Learning (RL)
  - Self-Criticism
  - Multimodal Reasoning
  - Preference Learning
  - Generative Models

permalink: /ai/review/2025-9-3-LLaVA-Critic-R1_Your_Critic_Model_is_Secretly_a_Strong_Policy_Model/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.00676)

**저자:** Xiyao Wang, Chunyuan Li, Jianwei Yang, Kai Zhang, Bo Liu, Tianyi Xiong, Furong Huang



## 핵심 연구 목표
본 논문은 critic 모델이 단순히 응답을 평가하는 것을 넘어 강력한 정책 모델로서 생성 능력까지 갖출 수 있다는 통념에 도전합니다. 최종 목표는 선호도 기반 critic 데이터를 활용한 **강화 학습(RL)**을 통해, 평가와 생성 두 가지 역할을 동시에 탁월하게 수행하는 단일 멀티모달 모델을 개발하는 것입니다.

## 핵심 방법론
연구진은 선호도 레이블이 지정된 critic 데이터셋을 검증 가능한 **강화 학습(RL) 태스크**로 재구성하고, 이를 기반으로 **Qwen-2.5-VL-7B**와 같은 기본 생성 모델에 직접 RL을 적용하여 **LLaVA-Critic-R1**을 훈련합니다. 훈련에는 **Group Relative Policy Optimization (GRPO)**을 사용하며, **선호도 보상(r_pref)**과 **형식 보상(r_format)**을 조합하여 모델이 자기 주도적인 추론을 수행하고 **'think-then-answer' 템플릿**을 따르도록 장려합니다. 더 나아가, **ThinkLite-VL-7B**와 같은 강력한 추론 VLM에 동일한 RL critic 훈련 절차를 적용하여 **LLaVA-Critic-R1+**를 개발합니다.

## 주요 결과
**LLaVA-Critic-R1**은 26개 시각 추론 및 이해 벤치마크에서 기본 모델 대비 평균 **+5.7% 성능 향상**을 달성하며, 뛰어난 critic 능력과 더불어 경쟁력 있는 정책 모델 역할을 수행함을 입증했습니다. **LLaVA-Critic-R1+**는 **MMMU 벤치마크에서 7B 스케일 모델 중 71.9%의 SoTA 성능**을 달성하여 정책 성능을 더욱 향상시켰습니다. 또한, 테스트 시 자체 비판(self-critic)을 적용하면 5가지 대표 추론 태스크에서 평균 **+13.8%의 추가 성능 향상**을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 critic 훈련이 모델의 평가 능력을 넘어 **VLM의 일반적인 정책 성능을 크게 향상**시킬 수 있음을 보여주며, 이는 AI 모델 개발 패러다임에 중요한 시사점을 제공합니다. 단일 모델이 평가와 생성 역할을 모두 수행하는 **확장 가능하고 자체 개선적인 멀티모달 시스템** 구축에 대한 새로운 길을 제시했습니다. 특히, 강력한 정책/추론 모델에 RL 기반 critic 훈련을 직접 적용하는 것이 정책 및 critic 능력을 균형 있게 달성하는 가장 효과적인 전략임을 강조하며, **테스트 시간 자체 비판(self-critic)**은 추가 훈련 없이 모델 성능을 향상시키는 효과적인 기법으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.