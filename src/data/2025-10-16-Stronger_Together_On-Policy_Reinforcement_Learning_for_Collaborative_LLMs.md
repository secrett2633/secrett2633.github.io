---
title: "[논문리뷰] Stronger Together: On-Policy Reinforcement Learning for Collaborative
  LLMs"
excerpt: "Hao Zhang이 [arXiv]에 게시한 'Stronger Together: On-Policy Reinforcement Learning for Collaborative
  LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Reinforcement Learning (RL)
  - Multi-Agent Systems (MAS)
  - On-Policy RL
  - Collaborative AI
  - Agentic LLMs
  - Group-based Optimization

permalink: /ai/review/2025-10-16-Stronger_Together_On-Policy_Reinforcement_Learning_for_Collaborative_LLMs/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.11062)

**저자:** Yujie Zhao, Lanxiang Hu, Hao Zhang, Ke Ding, Minmin Hou, Yang Wang, Jishen Zhao



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 에이전트의 성능 향상을 위해 **다중 에이전트 시스템(MAS)**과 **강화 학습(RL)**을 통합하는 것을 목표로 합니다. 특히, MAS에 온-정책(on-policy) RL 훈련을 적용할 때 발생하는 알고리즘적 및 시스템적 도전 과제, 즉 역할과 턴에 따라 달라지는 프롬프트로 인한 그룹화 문제와 다중 정책 모델 훈련 지원 필요성을 해결하고자 합니다.

## 핵심 방법론
저자들은 MAS에 최적화된 **AT-GRPO (Agent- and Turn-wise Grouped RL)** 알고리즘을 제안합니다. 이는 에이전트와 턴을 기준으로 후보 액션들을 그룹화하여 공정한 이점(advantage) 계산을 가능하게 합니다. 또한, 다양한 MAS 워크플로우 롤아웃과 단일 및 다중 정책 모델의 온-정책 업데이트를 지원하는 **새로운 훈련 시스템**을 구축했으며, 팀 보상과 에이전트별 지역 보상을 혼합하는 보상 설계를 채택했습니다.

## 주요 결과
**AT-GRPO**는 다양한 도메인에서 상당한 성능 향상을 입증했습니다. 특히 장기 계획 태스크에서 **Qwen3 8B 모델**은 **14-47%**의 단일 에이전트 RL 기준선 정확도를 **96.0-99.5%**까지 끌어올렸습니다. 코딩 태스크에서는 평균 **3.87-7.62%**, 수학 태스크에서는 **9.0-17.93%**의 추론 성능 향상을 보였습니다. MAS 내 RL 훈련은 역할별 전문화를 강화하며, 역할 공유 정책과 역할 특화 정책 중 선택은 태스크의 특성에 따라 달라져야 함이 확인되었습니다.

## AI 실무자를 위한 시사점
본 연구는 MAS에 온-정책 RL을 성공적으로 적용함으로써 LLM 에이전트의 **협업 및 추론 능력**을 획기적으로 개선할 수 있는 실용적인 방법론을 제시합니다. AI 실무자들은 **AT-GRPO**와 같은 프레임워크를 활용하여 복잡한 다중 에이전트 시스템을 효과적으로 훈련하고, 특히 **장기 계획**이 필요한 애플리케이션에서 높은 성능을 기대할 수 있습니다. 또한, 태스크의 특성과 에이전트 간의 기능적 중복성을 고려하여 **역할 특화 또는 역할 공유 정책**을 전략적으로 선택하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.