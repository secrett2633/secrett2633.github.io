---
title: "[논문리뷰] LEO-RobotAgent: A General-purpose Robotic Agent for Language-driven Embodied Operator"
excerpt: "이 [arXiv]에 게시한 'LEO-RobotAgent: A General-purpose Robotic Agent for Language-driven Embodied Operator' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robotic Agent
  - Large Language Models (LLMs)
  - Embodied AI
  - Task Planning
  - Human-Robot Interaction
  - General-purpose Robotics
  - ROS

permalink: /ai/review/2025-12-15-LEO-RobotAgent-A-General-purpose-Robotic-Agent-for-Language-driven-Embodied-Operator/

toc: true
toc_sticky: true

date: 2025-12-15 00:00:00+0900+0900
last_modified_at: 2025-12-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.10605)

**저자:** Lihuang Chen, Xiangyu Luo, and Jun Meng



## 핵심 연구 목표
본 논문은 다양한 유형의 로봇이 예측 불가능한 복잡한 작업을 수행할 수 있도록 하는 일반 목적의 언어 기반 지능형 로봇 에이전트 프레임워크인 `LEO-RobotAgent`를 제안합니다. 이는 기존 로봇 작업 계획 연구의 **제한적인 일반화** 및 **복잡한 구조** 문제를 해결하고, 인간-로봇 상호작용의 문턱을 낮추며 LLM의 **자율적 사고, 계획, 행동 능력** 을 강화하는 것을 목표로 합니다.

## 핵심 방법론
`LEO-RobotAgent`는 **단일 LLM** 이 계획, 행동 실행, 반사적 조정을 수행하는 **간소화된 자체 순환 에이전트 아키텍처** 를 특징으로 합니다. 이 프레임워크는 로봇의 기본 제어, 인지, 환경 상호작용을 위한 **모듈식 도구 모음(toolset)** 을 통합하며, LLM은 이를 유연하게 호출합니다. 또한, 사용자가 작업 실행 중에 개입하여 지침을 제공할 수 있는 **양방향 인간-로봇 상호작용 메커니즘** 을 포함하며, **ROS (Robot Operating System)** 기반의 완전한 시스템으로 구축되었습니다.

## 주요 결과
`LEO-RobotAgent`는 **무인 항공기 (UAV), 로봇 팔, 바퀴 달린 로봇** 등 다양한 로봇 플랫폼에 성공적으로 적용되었으며, 여러 복잡성 수준의 작업을 효율적으로 실행하여 **높은 일반화 가능성** 을 입증했습니다. 프롬프트 실험에서 **원샷 학습(one-shot learning)과 사고의 사슬(Chain-of-Thought, CoT)을 결합** 한 방식이 도시 탐색 시나리오에서 **70.0%의 최고 성공률** 을 달성했습니다. 에이전트 비교 실험에서는 **다중 LLM 아키텍처보다 더 낮은 디버깅 오버헤드** 와 향상된 **강건성** 을 보이며 복잡한 작업에서 우수한 성능을 나타냈습니다.

## AI 실무자를 위한 시사점
본 연구는 **간소화된 LLM 기반 에이전트 아키텍처** 가 복잡한 로봇 작업 계획에서 **다중 LLM 시스템보다 더 효과적** 일 수 있음을 시사합니다. AI 엔지니어는 **원샷 학습 및 CoT** 와 같은 **프롬프트 엔지니어링 기법** 을 활용하여 로봇 에이전트의 성능을 크게 향상시킬 수 있습니다. `ROS`와 통합된 **모듈식 도구 모음** 은 다양한 로봇 플랫폼에 LLM 에이전트 애플리케이션을 구축하고 맞춤화하는 데 실용적인 설계 패러다임을 제공하여 개발 복잡성을 줄일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.