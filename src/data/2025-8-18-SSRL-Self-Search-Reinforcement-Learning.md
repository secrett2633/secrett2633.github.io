---
title: "[논문리뷰] SSRL: Self-Search Reinforcement Learning"
excerpt: "Yanxu Chen이 [arXiv]에 게시한 'SSRL: Self-Search Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Self-Search
  - Sim-to-Real Transfer
  - Agentic AI
  - Knowledge Retrieval
  - Reward Modeling

permalink: /ai/review/2025-8-18-SSRL-Self-Search-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-08-18 13:14:38+0900
last_modified_at: 2025-08-18 13:14:38+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.10874)

**저자:** Yuchen Fan, Kaiyan Zhang, Heng Zhou, Yuxin Zuo, Yanxu Chen, Yu Fu, Xinwei Long, Xuekai Zhu, Che Jiang, Yuchen Zhang, Li Kang, Gang Chen, Cheng Huang, Zhizhou He, Bingning Wang, Lei Bai, Ning Ding, Bowen Zhou



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)이 강화 학습(RL)에서 에이전트 검색 태스크를 위한 효율적인 시뮬레이터 역할을 할 수 있는지 탐구합니다. 특히, 외부 검색 엔진과의 상호작용 비용을 줄이고, LLM의 내재된 지식만을 활용하여 검색 기반 질문-답변 성능의 한계를 측정하며, 시뮬레이션 환경에서 학습된 모델이 실제 검색 환경으로 효과적으로 일반화될 수 있는지 검증하는 것을 목표로 합니다.

## 핵심 방법론
LLM의 내재된 검색 능력을 정량화하기 위해 **Self-Search** 개념을 도입하고, 구조화된 프롬프트와 반복 샘플링을 활용합니다. 이어서 **Self-Search RL (SSRL)**을 제안하여 **포맷 기반** 및 **규칙 기반 보상**을 통해 LLM의 내부 지식 활용 능력을 강화합니다. 훈련 알고리즘으로는 주로 **GRPO**를 사용하며, **정보 토큰 마스킹** 및 **포맷 보상**의 효과를 검증하는 어블레이션 연구를 수행합니다.

## 주요 결과
Self-Search에서 LLM은 추론 예산에 따라 강력한 스케일링 특성을 보이며, 질문-답변 벤치마크(BrowseComp 포함)에서 높은 **pass@k** 성능을 달성합니다. SSRL로 훈련된 모델은 외부 검색 API 기반 RL 베이스라인(예: Search-R1, ZeroSearch)보다 뛰어난 성능을 보였으며 (예: Llama-3.2-3B-Instruct SSRL의 평균 EM은 **35.2%**로 Search-R1-Instruct의 **28.2%**를 상회), **ZeroSearch 대비 5.53배의 학습 시간 절감** 효과를 보였습니다. 또한, SSRL 훈련 모델은 추가 노력 없이도 실제 검색 시나리오로 원활하게 **sim-to-real 전이**가 가능함을 입증했습니다.

## AI 실무자를 위한 시사점
LLM이 웹의 비용 효율적인 시뮬레이터이자 암묵적인 세계 지식 제공자 역할을 할 수 있음을 보여줌으로써, 외부 검색 엔진에 대한 의존도를 줄일 수 있는 자율적이고 확장 가능한 LLM 에이전트 훈련의 새로운 길을 제시합니다. SSRL은 내부 지식 활용을 통해 환각을 줄이고, 훈련된 모델이 실제 검색 환경에서도 견고하게 작동하여 RL 에이전트 개발 및 배포의 실용성을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.