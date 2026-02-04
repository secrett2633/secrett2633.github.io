---
title: "[논문리뷰] WideSeek: Advancing Wide Research via Multi-Agent Scaling"
excerpt: "Zhongtao Jiang이 [arXiv]에 게시한 'WideSeek: Advancing Wide Research via Multi-Agent Scaling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Wide Research
  - Multi-Agent Systems
  - Reinforcement Learning
  - Information Seeking
  - Benchmarking
  - LLM Agents
  - Knowledge Graphs

permalink: /ai/review/2026-02-04-WideSeek-Advancing-Wide-Research-via-Multi-Agent-Scaling/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.02636)

**저자:** Ziyang Huang, Haolin Ren, Xiaowei Yuan, Jiawei Wang, Zhongtao Jiang, Kun Xu, Shizhu He, Jun Zhao, Kang Liu



## 핵심 연구 목표
본 논문은 기존의 심층 연구(Deep Research) 패러다임이 아닌, 복잡한 제약 조건 하에서 포괄적인 정보를 병렬적으로 검색하고 종합하는 **광범위 연구(Wide Research)** 패러다임의 발전을 목표로 합니다. 특히, 이러한 광범위 검색을 위한 전용 벤치마크 및 최적화 방법론의 부족이라는 문제를 해결하고자 합니다.

## 핵심 방법론
연구팀은 먼저 **WideSeekBench** 라는 **General Broad Information Seeking (GBIS)** 벤치마크를 **Knowledge Graphs (KGs)** 에서 다단계 데이터 파이프라인을 통해 구축했습니다. 이 벤치마크는 정보량, 논리적 제약, 도메인에 걸쳐 다양성을 보장합니다. 이어서, 작업 요구사항에 따라 병렬 서브 에이전트를 자율적으로 생성할 수 있는 동적 계층적 멀티 에이전트 아키텍처인 **WideSeek** 를 제안합니다. 이 시스템은 **Planner-Executor** 패턴을 따르며, **통합 멀티 에이전트 RL (Group Relative Policy Optimization - GRPO)** 프레임워크를 통해 종단 간 최적화됩니다.

## 주요 결과
실험 결과, **WideSeek** 와 멀티 에이전트 RL이 광범위 연구 패러다임에 효과적임을 입증했습니다. 특히, **WideSeek-8B-SFT** 는 기본 모델 대비 **도구 사용량 12.84배 증가** 및 **서브 에이전트 인스턴스화 3.15배 증가** 를 보였으며, **WideSeek-8B-SFT-RL** 은 **Item F1 점수 12.87%** (기본 모델 대비 +5.50%) 및 **Max Row F1 3.88%** 를 달성했습니다. 시스템은 도구 호출을 **28.82배** , 서브 에이전트를 **6.36배** 확장하며 검색 효율성을 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 이 연구를 통해 **단일 경로 탐색을 넘어선 병렬적 정보 통합** 의 중요성을 인지해야 합니다. **WideSeek** 는 동적으로 서브 에이전트를 생성하고 조정하는 **멀티 에이전트 시스템** 이 복잡하고 광범위한 정보 검색 태스크에 필수적임을 보여줍니다. 또한, **종단 간 RL 최적화** 가 에이전트의 확장성과 협업 능력을 극대화하는 강력한 방법론임을 시사하며, **WideSeekBench** 는 이러한 차세대 검색 지능 개발을 위한 실질적인 평가 기준을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.