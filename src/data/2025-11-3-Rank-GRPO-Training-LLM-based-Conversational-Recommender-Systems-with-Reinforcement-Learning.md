---
title: "[논문리뷰] Rank-GRPO: Training LLM-based Conversational Recommender Systems with
  Reinforcement Learning"
excerpt: "이 [arXiv]에 게시한 'Rank-GRPO: Training LLM-based Conversational Recommender Systems with
  Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Conversational Recommender Systems
  - Large Language Models
  - Reinforcement Learning
  - Group Relative Policy Optimization
  - Rank-based Learning
  - Supervised Fine-tuning
  - Reward Shaping

permalink: /ai/review/2025-11-3-Rank-GRPO-Training-LLM-based-Conversational-Recommender-Systems-with-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20150)

**저자:** Yaochen Zhu, Harald Steck, Dawen Liang, Yinhan He, Vito Ostuni, Jundong Li, Nathan Kallus



## 핵심 연구 목표
본 논문은 LLM 기반 대화형 추천 시스템(CRS)이 직면한 **카탈로그 외부 항목 생성**, **부적절한 출력 형식**, 그리고 **추천 리스트 끝부분의 낮은 랭킹 품질** 문제를 해결하고자 합니다. 기존 RL 정렬 방법론인 **GRPO**가 순위 기반 출력 태스크에 부적합하다는 한계를 극복하고, LLM을 효율적으로 학습시켜 실용적인 고품질 추천을 제공하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **ConvRec-R1**이라는 2단계 학습 프레임워크를 제안합니다. 1단계에서는 **Remap-Reflect-Adjust 파이프라인**을 통해 강력한 블랙박스 LLM의 제로샷 추천을 카탈로그에 맞춰 정제하여 **행동 복제(behavioral cloning) 데이터셋**을 구축하고 LLM을 **지도 미세 조정(SFT)**합니다. 2단계에서는 순위 기반 출력에 특화된 **Rank-GRPO**를 개발하여, 각 순위를 독립적인 행동 단위로 취급하며 **랭크-레벨 중요도 비율**과 **랭크-레벨 어드밴티지**를 사용하여 정책을 업데이트하고 **보상 재구성(reward shaping)**을 적용합니다.

## 주요 결과
**ConvRec-R1**은 **REDDIT-V2 데이터셋**에서 기존 **GRPO** 스타일 베이스라인보다 더 빠르게 수렴하며 더 높은 **Recall** 및 **NDCG**를 달성했습니다. 특히, SFT 단계는 제로샷 LLM 대비 **NDCG@20**을 **0.5B 모델에서 30배 이상** 향상시켰습니다. RL 단계 이후, **Rank-GRPO**는 **Qwen2.5-0.5B-Instruct** 백본에서 **GPT-40-mini**를 능가했고, **Llama3.2-3B-Instruct** 백본에서는 **GPT-40** 및 **CRAG**를 능가하는 **Recall/NDCG@20** 성능을 기록했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 기반 CRS의 실용적 배포를 위한 핵심적인 해결책을 제시하며, 특히 **Remap-Reflect-Adjust 파이프라인**은 도메인 특화 SFT 데이터를 효율적으로 구축하는 효과적인 방법을 제공합니다. **Rank-GRPO**는 추천 시스템뿐만 아니라 검색, 랭킹 등 **순위 구조를 가진 다양한 AI 태스크**에 적용 가능하며, 비용 효율적인 소규모 LLM이 **고가의 대규모 독점 모델**과 동등하거나 우수한 성능을 낼 수 있음을 입증하여 **자원 제약 환경**에서의 LLM 기반 CRS 개발에 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.