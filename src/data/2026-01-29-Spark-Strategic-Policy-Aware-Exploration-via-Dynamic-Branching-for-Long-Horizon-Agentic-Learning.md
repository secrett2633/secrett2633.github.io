---
title: "[논문리뷰] Spark: Strategic Policy-Aware Exploration via Dynamic Branching for Long-Horizon Agentic Learning"
excerpt: "Shuai Zhang이 [arXiv]에 게시한 'Spark: Strategic Policy-Aware Exploration via Dynamic Branching for Long-Horizon Agentic Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic AI
  - Reinforcement Learning
  - Long-Horizon Tasks
  - Dynamic Branching
  - Strategic Exploration
  - LLM Agents
  - Sample Efficiency
  - Policy Optimization

permalink: /ai/review/2026-01-29-Spark-Strategic-Policy-Aware-Exploration-via-Dynamic-Branching-for-Long-Horizon-Agentic-Learning/

toc: true
toc_sticky: true

date: 2026-01-29 00:00:00+0900+0900
last_modified_at: 2026-01-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.20209)

**저자:** Jinyang Wu, Shuo Yang, Changpeng Yang, Yuhao Shen, Shuai Zhang, Zhengqi Wen, Jianhua Tao



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 기반의 에이전트가 장기적인 태스크를 수행할 때 발생하는 비효율적인 탐색 문제를 해결하는 것을 목표로 합니다. 기존 RL 방법론은 컴퓨팅 자원을 중간 단계에 균일하게 할당하여 중요하지 않은 단계에서 자원을 낭비하고 고품질 궤적 확보에 실패하는 한계를 가지고 있습니다.

## 핵심 방법론
저자들은 **SPARK (Strategic Policy-Aware exploration via Key-state dynamic branching)** 라는 새로운 프레임워크를 제안합니다. 이 방법론은 에이전트의 내재적 의사결정 신호(예: **<explore> 태그** )를 활용하여 **중요한 결정 지점(SPARK points)** 에서만 추가 탐색 브랜칭을 동적으로 활성화합니다. 이를 통해 **계층적 트리 구조의 탐색 경로** 를 구축하고, **GRPO (Group Relative Policy Optimization)** 와 호환되는 방식으로 정책을 업데이트하여 자원 효율성을 극대화합니다.

## 주요 결과
**SPARK** 는 **ALFWorld, ScienceWorld, WebShop** 등 다양한 장기 에이전트 태스크에서 기존 RL 및 프롬프팅 기반 모델들을 능가하는 성능을 보였습니다. 특히, **ALFWorld L2 (out-of-domain)** 에서 **GRPO 대비 80.5% vs 29.7%** 의 성공률을 달성했으며, **ScienceWorld L2** 에서는 **GiGPO 대비 10.5배, RLVMR 대비 1.9배** 높은 성능을 기록했습니다. 또한, **GRPO 대비 ALFWorld에서 6.9%, ScienceWorld에서 47.0%, WebShop에서 11.2%의 토큰 소비량 감소** 를 보여 탁월한 샘플 및 토큰 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**SPARK** 는 AI/ML 엔지니어가 제한된 컴퓨팅 자원으로도 LLM 기반 에이전트의 **장기 태스크 학습 효율성** 과 **일반화 능력** 을 크게 향상시킬 수 있는 효과적인 전략을 제공합니다. 내재적 의사결정 신호에 기반한 **전략적 탐색** 은 수동으로 정의된 휴리스틱에 대한 의존도를 줄여주므로, 새로운 환경에서도 에이전트가 더 강건하게 작동하도록 설계하는 데 중요한 통찰을 제공합니다. 이는 **고품질 궤적 확보** 를 통한 학습 안정화 및 비용 절감에 직접적으로 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.