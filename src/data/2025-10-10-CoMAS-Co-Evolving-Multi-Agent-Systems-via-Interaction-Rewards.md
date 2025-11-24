---
title: "[논문리뷰] CoMAS: Co-Evolving Multi-Agent Systems via Interaction Rewards"
excerpt: "Yijiang Li이 [arXiv]에 게시한 'CoMAS: Co-Evolving Multi-Agent Systems via Interaction Rewards' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent Systems
  - LLM Agents
  - Self-Evolution
  - Reinforcement Learning
  - Interaction Rewards
  - LLM-as-a-Judge
  - Decentralized Learning

permalink: /ai/review/2025-10-10-CoMAS-Co-Evolving-Multi-Agent-Systems-via-Interaction-Rewards/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08529)

**저자:** Xiangyuan Xue, Yifan Zhou, Guibin Zhang, Zaibin Zhang, Yijiang Li, Chen Zhang, Zhenfei Yin, Philip Torr, Wanli Ouyang, Lei Bai



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 기반 에이전트들이 외부 감독 없이 **에이전트 간 상호작용**을 통해 자율적으로 능력을 개선하는 **자체 진화(self-evolution)** 패러다임을 확립하는 것을 목표로 합니다. 기존 RL 기반 방법론들이 외부 또는 개별 모델 내재적 보상에 의존하는 한계를 극복하고, 인간의 상호작용 기반 학습 메커니즘을 모방하고자 합니다.

## 핵심 방법론
제안된 **CoMAS(Co-Evolving Multi-Agent Systems)** 프레임워크는 세 가지 핵심 구성 요소로 이루어집니다. 첫째, **Interaction** 단계에서는 에이전트들이 솔루션 제안, 평가, 채점 과정을 통해 풍부한 대화 데이터를 생성합니다. 둘째, **Reward Formulation** 단계에서는 **LLM-as-a-judge 메커니즘**을 활용하여 이러한 대화 기록으로부터 내재적 보상 신호를 도출하며, 솔루션-평가 쌍에 대한 **제로-섬(zero-sum) 보상**을 부여합니다. 마지막으로, **Policy Optimization** 단계에서는 **REINFORCE++ RL 알고리즘**을 사용하여 각 에이전트의 정책을 업데이트하여 자체 진화를 가능하게 합니다.

## 주요 결과
**CoMAS**는 다양한 벤치마크 및 설정에서 일관되게 훈련되지 않은 에이전트보다 우수한 성능을 보였으며, 여러 평가 시나리오에서 최첨단 성능을 달성했습니다. 특히 **AutoGen** 설정에서 **19.80%**, **Debate** 설정에서 **6.10%**의 절대 성능 향상을 기록했습니다. 또한, 상호작용 기반 보상 설계가 훈련 붕괴를 방지하고, 에이전트 수가 증가하거나 다양성이 커질수록 성능이 향상되어 뛰어난 확장성을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 인간 지능의 **협력적 진화**에서 영감을 받은 새로운 **LLM 에이전트 자체 진화 패러다임**을 제시합니다. 외부 감독이나 수동적인 보상 모델 없이 에이전트들이 상호작용을 통해 스스로 학습하고 개선할 수 있음을 보여줌으로써, 복잡하고 개방형 문제를 해결하는 **탈중앙화되고 확장 가능한 다중 에이전트 시스템** 구축 가능성을 열었습니다. 이는 자율적인 AI 시스템 개발에 중요한 실용적 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.