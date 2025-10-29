---
title: "[논문리뷰] AgentFold: Long-Horizon Web Agents with Proactive Context Management"
excerpt: "이 [arXiv]에 게시한 'AgentFold: Long-Horizon Web Agents with Proactive Context Management' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Web Agents
  - Context Management
  - Long-Horizon Tasks
  - LLM
  - Deep Consolidation
  - Granular Condensation
  - ReAct Paradigm

permalink: /ai/review/2025-10-29-AgentFold_Long-Horizon_Web_Agents_with_Proactive_Context_Management/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24699)

**저자:** Rui Ye, Zhongwang Zhang, Kuan Li, Huifeng Yin, Zhengwei Tao, Yida Zhao, Liangcai Su, Liwen Zhang, Zile Qiao, Xinyu Wang, Pengjun Xie, Fei Huang, Siheng Chen, Jingren Zhou, Yong Jiang



## 핵심 연구 목표
LLM 기반 웹 에이전트가 장기 태스크에서 겪는 컨텍스트 관리의 근본적인 문제(기존 ReAct 방식의 컨텍스트 포화 및 고정된 요약 방식의 비가역적 정보 손실)를 해결하는 것을 목표로 합니다. 인간의 인지 과정에서 영감을 받은 **능동적인 컨텍스트 관리**를 통해 에이전트가 복잡한 장기 태스크를 효과적으로 수행할 수 있도록 새로운 에이전트 패러다임 **AgentFold**를 제시합니다.

## 핵심 방법론
**AgentFold**는 에이전트의 컨텍스트를 **Multi-Scale State Summaries** (장기 기억)와 **Latest Interaction** (작업 기억)으로 구성된 동적인 인지 작업 공간으로 정의합니다. 각 단계에서 에이전트는 **'folding' 지시문**을 실행하여 과거 상호작용 기록을 관리하며, 이는 단일 단계를 압축하는 **Granular Condensation** 또는 여러 단계를 추상화하는 **Deep Consolidation** 모드로 작동합니다. 이 방법론은 **Fold-Generator**로 생성된 데이터셋과 **Supervised Fine-Tuning (SFT)**을 통해 학습됩니다.

## 주요 결과
**AgentFold-30B-A3B** 에이전트는 **BrowseComp**에서 **36.2%**, **BrowseComp-ZH**에서 **47.3%**의 성능을 달성하여 최첨단 결과를 보여주었습니다. 이는 **DeepSeek-V3.1-671B-A37B**와 같은 훨씬 큰 규모의 오픈소스 모델뿐만 아니라, **OpenAI의 o4-mini**와 같은 선도적인 상용 에이전트를 능가하거나 동등한 수준입니다. 또한, 100턴 상호작용 후에도 컨텍스트 길이가 **약 7천 토큰**에 불과하여 **ReAct** 방식보다 **84천 토큰(92%) 이상 감소**했으며, **500턴**까지 컨텍스트 제한에 도달하지 않고 확장 가능함을 입증했습니다.

## AI 실무자를 위한 시사점
**AgentFold**의 **능동적인 컨텍스트 폴딩 메커니즘**은 LLM 기반 에이전트가 복잡하고 장기적인 태스크를 효과적으로 수행할 수 있는 실용적인 해결책을 제시합니다. 이는 컨텍스트 길이 제한으로 인한 성능 저하를 방지하고, 에이전트의 **메모리 효율성**을 크게 향상시켜 (추론 시 **최대 7GB 메모리 절약**) 운영 비용 절감에 기여합니다. AI 실무자들은 이러한 **다중 스케일 컨텍스트 관리** 전략을 활용하여 보다 견고하고 확장 가능한 에이전트 시스템을 개발할 수 있을 것이며, 향후 강화학습(RL)을 통한 최적의 폴딩 정책 자율 학습은 중요한 연구 방향이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.