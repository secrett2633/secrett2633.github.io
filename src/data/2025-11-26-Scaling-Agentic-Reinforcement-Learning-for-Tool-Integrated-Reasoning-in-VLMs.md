---
title: "[논문리뷰] Scaling Agentic Reinforcement Learning for Tool-Integrated Reasoning in VLMs"
excerpt: "arXiv에 게시된 'Scaling Agentic Reinforcement Learning for Tool-Integrated Reasoning in VLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models (VLMs)
  - Reinforcement Learning (RL)
  - Tool-Integrated Reasoning (TIR)
  - Agentic AI
  - VQA
  - Training Environment
  - Behavioral Cloning
  - Policy Optimization

permalink: /ai/review/2025-11-26-Scaling-Agentic-Reinforcement-Learning-for-Tool-Integrated-Reasoning-in-VLMs/

toc: true
toc_sticky: true

date: 2025-11-26 00:00:00+0900+0900
last_modified_at: 2025-11-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19773)

**저자:** Meng Lu, Ran Xu, Yi Fang, Wenxuan Zhang, Yue Yu, Gaurav Srivastava, Yuchen Zhuang, Mohamed Elhoseiny, Charles Fleming, Carl Yang, Zhengzhong Tu, Guanghua Xiao, Yang Xie, Hanrui Wang, Di Jin, Wenqi Shi, Xuan Wang



## 핵심 연구 목표
본 연구는 VLM이 다단계 시각적 상호작용 및 효과적인 도구 통합 추론에서 겪는 한계를 해결하고자 합니다. 특히, 도구 선택, 호출 및 조율 능력이 부족한 기존 VLM의 문제를 극복하고, 확장 가능한 훈련 환경과 에이전트 학습 전략을 통해 VLM의 **도구 통합 시각적 추론 능력** 을 체계적으로 향상시키는 것을 목표로 합니다.

## 핵심 방법론
논문은 **VISTA-Gym** 이라는 확장 가능한 도구 통합 에이전트 훈련 환경을 제안하며, 7가지 다양한 멀티모달 추론 태스크와 26가지 시각 도구(예: **GroundingDINO** , **ChartMoE** , **G-LLaVA** )를 통합합니다. **VISTA-R1** 에이전트는 **행동 복제(BC)** 를 통한 초기 훈련과 **Group Relative Policy Optimization (GRPO)** 을 활용한 온라인 강화 학습의 **2단계 프레임워크** 로 훈련되어, 도구 사용 문법 및 추론을 학습하고 복잡한 시각적 문제를 해결하도록 설계되었습니다.

## 주요 결과
**VISTA-R1-8B** 는 11개 VQA 벤치마크에서 기존 오픈소스 모델 대비 **9.51%-18.72%** 높은 성능을 달성하여 최첨단 결과를 보였습니다. 특히, 도구 없이도 **2.03%-11.24%** 의 개선을 보였으며, **GPT-03** 및 **Claude-4.5-Sonnet** 과 같은 대규모 상용 모델과 유사한 수준의 **일반화 성능** 을 입증했습니다. 이는 **VISTA-Gym** 이 VLM의 도구 통합 추론 능력을 개발하는 효과적인 훈련 환경임을 시사합니다.

## AI 실무자를 위한 시사점
**VISTA-Gym** 은 복잡한 시각적 추론 문제를 해결하는 **도구 통합 에이전트 VLM** 개발을 위한 강력하고 확장 가능한 훈련 환경을 제공합니다. AI 실무자들은 **행동 복제(BC)와 온라인 강화 학습(RL)의 2단계 훈련 프레임워크** 를 활용하여 VLM의 도구 사용 및 추론 능력을 체계적으로 개선할 수 있습니다. 또한, 다양한 태스크와 도구를 혼합한 훈련 및 **Tail-Patch Curriculum** 과 같은 난이도 적응형 학습 전략이 모델의 **일반화 및 장기 추론 능력** 향상에 중요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.