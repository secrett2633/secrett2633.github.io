---
title: "[논문리뷰] Reinforcement Learning in Vision: A Survey"
excerpt: "Qingwei Meng이 [arXiv]에 게시한 'Reinforcement Learning in Vision: A Survey' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - Computer Vision (CV)
  - Multimodal Large Language Models (MLLMs)
  - Visual Generation
  - Vision-Language-Action (VLA) Models
  - Policy Optimization
  - Reward Modeling

permalink: /ai/review/2025-8-12-Reinforcement-Learning-in-Vision-A-Survey/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.08189)

**저자:** Weijia Wu, Chen Gao, Joya Chen, Kevin Qinghong Lin, Qingwei Meng, Yiming Zhang, Yuke Qiu, Hong Zhou, Mike Zheng Shou



## 핵심 연구 목표
본 연구는 강화 학습(RL)과 시각 지능의 교차점에서 발전한 에이전트의 현황을 체계적으로 종합합니다. 시각 RL 문제들을 공식화하고, 정책 최적화 전략의 진화를 추적하며, 200개 이상의 대표적인 작업을 네 가지 핵심 기둥으로 분류하여 분석함으로써, 시각 RL 분야의 명확한 지도와 유망한 연구 방향을 제시하는 것을 목표로 합니다.

## 핵심 방법론
이 조사는 **멀티모달 대규모 언어 모델(MLLMs)**, **시각 생성**, **통합 모델 프레임워크**, **시각-언어-액션(VLA) 모델**의 네 가지 주요 분야로 작업을 분류합니다. 각 분야에서는 **알고리즘 설계**, **보상 모델링**, **벤치마킹 진행 상황**을 상세히 검토하며, 특히 **RLHF**, **DPO**, **GRPO** 및 **RLVR**와 같은 보상 패러다임을 중심으로 다룹니다. 또한, **PPO** 및 **GRPO**와 같은 핵심 정책 최적화 알고리즘의 시각 도메인 적용을 분석합니다.

## 주요 결과
강화 학습은 **RLHF** 및 **DeepSeek-R1**과 같은 방법론을 통해 대규모 언어 모델(LLM)의 인간 선호도 정렬 기능을 크게 향상시켰습니다. 이러한 성공은 **VLM**, **VLA** 및 **확산 기반 시각 생성 모델**을 포함한 멀티모달 대규모 모델로 RL을 확장하는 데 폭발적인 관심을 불러일으켰습니다. 특히, **검증 가능한 보상**이 인간 피드백의 저비용 대안으로 작용하며, **그룹-상대적 목표**가 이질적인 시각 작업에서 더 높은 학습 안정성을 제공함을 확인했습니다.

## AI 실무자를 위한 시사점
이 조사는 AI/ML 실무자들에게 **시각 강화 학습**의 복잡한 지형에 대한 포괄적인 지도를 제공하여, 멀티모달 모델을 위한 RL 전략을 선택하고 개발하는 데 도움을 줍니다. **표본 효율성**, **일반화**, **안전한 배포**와 같은 현재의 주요 과제를 명확히 제시하며, **모델 기반 계획** 및 **자기 지도 사전 학습**의 통합을 통해 향후 연구 및 응용 분야의 명확한 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.