---
title: "[논문리뷰] GEM: A Gym for Agentic LLMs"
excerpt: "arXiv에 게시된 'GEM: A Gym for Agentic LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic LLMs
  - Reinforcement Learning
  - Environment Simulator
  - Multi-turn Interactions
  - Return Batch Normalization
  - Tool Integration
  - Benchmarking

permalink: /ai/review/2025-10-2-GEM-A-Gym-for-Agentic-LLMs/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01051)

**저자:** Zichen Liu, Anya Sims, Keyu Duan, Changyu Chen, Simon Yu, Xiangxin Zhou, Haotian Xu, Shaopan Xiong, Bo Liu, Chenmien Tan, Chuen Yang Beh, Weixun Wang, Hao Zhu, Weiyan Shi, Diyi Yang, Michael Shieh, Yee Whye Teh, Wee Sun Lee, Min Lin



## 핵심 연구 목표
대규모 언어 모델(LLM) 학습 패러다임이 정적 데이터셋에서 경험 기반 학습으로 전환됨에 따라, 에이전트가 복잡한 환경과 상호작용하며 기술을 습득할 수 있도록 돕는 것을 목표로 합니다. 기존 RL 환경이 다중 턴 상호작용을 과도하게 단순화하여 전체 다중 턴 문제에 적용하기 어려운 한계를 극복하고자, 에이전트형 LLM을 위한 표준화된 개방형 환경 시뮬레이터 **GEM** 을 도입합니다.

## 핵심 방법론
**GEM (General Experience Maker)** 은 **OpenAI-Gym** 과 유사하게 환경-에이전트 인터페이스를 표준화하며, 높은 처리량을 위한 **비동기 벡터화 실행** 과 유연한 래퍼를 제공합니다. 다양한 환경 스위트(언어 게임, 추론, 코딩, 수학, QA)와 **Python, Search, MCP** 등 통합 도구를 지원하며, **REINFORCE** 에 **Return Batch Normalization (ReBN)** 을 적용한 알고리즘을 제안합니다. 이 알고리즘은 **GRPO** 와 달리 밀집된 턴별 보상 및 임의의 할인율에 호환되며, **PPO, GRPO, REINFORCE** 와 비교 벤치마킹을 수행합니다.

## 주요 결과
**ReBN** 은 기존 **REINFORCE** 대비 일관되게 성능을 크게 향상시키며, 평가된 모든 환경에서 **PPO** 및 **GRPO** 와 동등하거나 더 우수한 성능을 보였습니다. 도구 접근이 가능한 모델은 **Math (Qwen3-4B-Base 평균 35.3 -> 49.8)** 및 **QA (Qwen3-4B-Base 평균 10.2 -> 45.5)** 작업에서 RL 훈련 후 성능이 크게 향상되었습니다. 또한, **RL2** 에서 비동기 롤아웃을 사용하면 스도쿠 해결 에이전트 훈련에서 **2배의 실시간 효율성** 을 얻을 수 있음을 확인했습니다.

## AI 실무자를 위한 시사점
**GEM** 은 복잡한 다중 턴 및 도구 통합 환경에서 **LLM 에이전트를 훈련하고 평가** 할 수 있는 표준화된 프레임워크를 제공하여, AI 실무자들이 환경 구축에 대한 부담 없이 연구에 집중할 수 있도록 돕습니다. 제안된 **REINFORCE with ReBN** 은 미세한 턴별 보상 및 임의의 할인율을 활용하여 복잡한 에이전트 학습에 유용하며, **도구 통합의 중요성** 과 **할인율(γ)** 이 에이전트 행동 효율성에 미치는 영향은 실제 LLM 에이전트 시스템 설계에 중요한 고려사항임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.