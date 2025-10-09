---
title: "[논문리뷰] Multi-Agent Tool-Integrated Policy Optimization"
excerpt: "Lidong Bing이 [arXiv]에 게시한 'Multi-Agent Tool-Integrated Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent RL
  - Tool-Integrated Planning
  - Large Language Models (LLMs)
  - Policy Optimization
  - Credit Assignment
  - Reinforcement Learning
  - MATPO

permalink: /ai/review/2025-10-9-Multi-Agent_Tool-Integrated_Policy_Optimization/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04678)

**저자:** Zhanfeng Mo, Xingxuan Li, Yuntao Chen, Lidong Bing



## 핵심 연구 목표
본 논문은 단일 에이전트 LLM의 도구 통합 계획(Tool-Integrated Planning, TIP) 방식이 갖는 **제한된 컨텍스트 길이**와 **노이즈가 많은 도구 응답** 문제를 해결하고자 합니다. 특히, 단일 LLM 인스턴스 내에서 여러 에이전트 역할을 효율적으로 훈련할 수 있는 **강화 학습(RL) 프레임워크**를 개발하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Multi-Agent Tool-Integrated Policy Optimization (MATPO)**를 제안합니다. 이는 **GRPO(Group Relative Policy Optimization)**를 확장하여 **계획자(planner) 에이전트**와 **작업자(worker) 에이전트**의 롤아웃에 걸쳐 **원칙적인 신용 할당(credit assignment) 메커니즘**을 적용합니다. 이 방법을 통해 단일 LLM 인스턴스가 역할별 프롬프트를 사용하여 다중 에이전트 역할을 수행하고, 계획자 및 작업자 기여도를 공동으로 고려하는 **보상 정규화**를 수행하며 강화 학습됩니다.

## 주요 결과
**MATPO**는 **GAIA-text**, **WebWalkerQA**, **FRAMES** 등 다양한 벤치마크에서 단일 에이전트 **GRPO** 기준선 대비 평균 **18.38%**의 **상대적 성능 향상**을 일관되게 달성했습니다. 특히, GAIA-text에서는 **32.16%** 대비 **42.60%**를, WebWalkerQA에서는 **30.14%** 대비 **33.00%**를, FRAMES에서는 **56.22%** 대비 **63.64%**를 기록했습니다. 또한, MATPO는 훈련 과정에서 더 **안정적인 성능 향상**과 **노이즈가 많은 도구 출력**에 대한 **강력한 견고성**을 보여주었습니다.

## AI 실무자를 위한 시사점
이 연구는 **단일 LLM 인스턴스**로 다중 에이전트 시스템을 효과적으로 훈련할 수 있음을 입증하여 **메모리 및 인프라 효율성**을 크게 개선할 수 있는 실용적인 방안을 제시합니다. **작업자 에이전트의 사용자 질의 요약(user query recapping)** 및 **최종 요약(final summaries)** 메커니즘이 시스템 성능과 안정성에 중요한 영향을 미친다는 점을 강조하여, 복잡한 도구 통합 작업에서 LLM 기반 에이전트의 견고성과 성능을 향상하는 데 중요한 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.