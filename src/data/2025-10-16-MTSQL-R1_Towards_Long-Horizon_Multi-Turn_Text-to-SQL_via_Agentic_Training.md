---
title: "[논문리뷰] MTSQL-R1: Towards Long-Horizon Multi-Turn Text-to-SQL via Agentic
  Training"
excerpt: "이 [arXiv]에 게시한 'MTSQL-R1: Towards Long-Horizon Multi-Turn Text-to-SQL via Agentic
  Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-turn Text-to-SQL
  - Agentic Training
  - Reinforcement Learning
  - Large Language Models
  - Dialogue Systems
  - Semantic Parsing
  - Database Interaction
  - Self-correction

permalink: /ai/review/2025-10-16-MTSQL-R1_Towards_Long-Horizon_Multi-Turn_Text-to-SQL_via_Agentic_Training/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12831)

**저자:** Taicheng Guo, Hai Wang, ChaoChun Liu, Mohsen Golalikhani, Xin Chen, Xiangliang Zhang, Chandan K. Reddy



## 핵심 연구 목표
본 논문은 기존 Multi-turn Text-to-SQL 시스템들이 단기적인 추론 패러다임에 머물러 실행 가능하거나 일관성 있는 SQL을 생성하지 못하는 문제를 해결합니다. 데이터베이스와의 상호작용 및 대화 맥락 검증을 통해 **장기적인(long-horizon) 추론 능력**을 갖춘 대화형 Text-to-SQL 에이전트 **MTSQL-R1**을 개발하여, 비실행성 또는 비일관성 출력을 줄이는 것을 목표로 합니다.

## 핵심 방법론
이 과제를 **Markov Decision Process (MDP)**로 정의하고, 에이전트가 데이터베이스 및 영구 대화 메모리와 상호작용하여 **propose → execute → verify → refine** 주기를 반복합니다. 훈련은 크게 세 단계로 진행됩니다: 1) MDP 문제 정의, 2) 자체 학습 탐색 절차를 통해 수집된 고품질 장기 궤적을 활용한 **Warm-start supervised fine-tuning (SFT)**, 3) 실행 성공 및 메모리 일관성에서 파생된 **다단계 보상(multi-level rewards)**을 사용하는 **End-to-end reinforcement learning (RL)**입니다.

## 주요 결과
**MTSQL-R1**은 **CoSQL** 및 **SParC** 벤치마크에서 강력한 프롬프트 기반 및 파인튜닝된 기준선들을 일관되게 능가합니다. 특히 **Qwen3-1.7B** 모델을 백본으로 사용하여 **평균 실행 정확도(EX) 74.6%** 및 **평균 Exact Match (EM) 64.4%**를 달성했으며, 이는 SFT 단독 성능 대비 상당한 개선입니다. 또한, 대화 턴이 증가하거나 난이도가 높은(예: **Turn > 4, Hard/Extra Hard**) 시나리오에서 가장 큰 성능 향상을 보이며, **실행 오류(Execution errors)** 및 **맥락-일관성 오류(context-coherence errors)**를 크게 줄였습니다.

## AI 실무자를 위한 시사점
본 연구는 AI/ML 실무자들에게 복잡한 Multi-turn Text-to-SQL 문제 해결에 있어 **환경 기반 검증** 및 **메모리 가이드 정제**의 중요성을 강조합니다. **Warm-start SFT**와 **다단계 RL**을 통합한 에이전트 훈련 프레임워크는 제한된 리소스의 소형 **LLM (1.7B/4B)** 모델로도 최첨단 성능을 달성할 수 있음을 보여주어, 실제 서비스에 적용 가능한 고성능 대화형 AI 시스템 개발 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.