---
title: "[논문리뷰] WideSeek-R1: Exploring Width Scaling for Broad Information Seeking via Multi-Agent Reinforcement Learning"
excerpt: "arXiv에 게시된 'WideSeek-R1: Exploring Width Scaling for Broad Information Seeking via Multi-Agent Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent Reinforcement Learning
  - Width Scaling
  - Large Language Models
  - Information Seeking
  - Task Decomposition
  - Parallel Execution
  - Lead-Agent-Subagent Framework
  - Orchestration

permalink: /ai/review/2026-02-05-WideSeek-R1-Exploring-Width-Scaling-for-Broad-Information-Seeking-via-Multi-Agent-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2026-02-05 00:00:00+0900+0900
last_modified_at: 2026-02-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.04634)

**저자:** Zelai Xu, Zhexuan Xu, Ruize Zhang, Chunyang Zhu, Shi Yu, Weilin Liu, Quanlu Zhang, Wenbo Ding, Chao Yu, Yu Wang



## 핵심 연구 목표
본 논문은 LLM의 "깊이 스케일링"이 아닌 **"폭 스케일링(width scaling)"** 이라는 새로운 차원을 탐구하여 광범위한 정보 탐색 문제 해결을 목표로 합니다. 기존 다중 에이전트 시스템이 수작업 워크플로우와 순차적 상호작용으로 인해 효과적인 작업 병렬화를 달성하지 못하는 한계를 극복하고, **다중 에이전트 강화 학습(MARL)** 을 통해 확장 가능한 오케스트레이션과 병렬 실행을 통합하는 방법론을 제시합니다.

## 핵심 방법론
저자들은 **WIDESEEK-R1** 이라는 **계층적 리드 에이전트-서브 에이전트 프레임워크** 를 제안하며, 이는 **Qwen3-4B** 공유 LLM을 기반으로 합니다. **리드 에이전트** 는 `call_subagent` 도구를 사용하여 복잡한 태스크를 병렬 가능한 하위 태스크로 **분해 및 오케스트레이션** 합니다. 각 **서브 에이전트** 는 검색 및 접근 도구를 활용하여 할당된 하위 태스크를 **병렬로 실행** 합니다. 시스템은 **20k 개의 광범위한 정보 탐색 태스크 데이터셋** 에서 **MARL** 을 통해 리드 에이전트와 서브 에이전트를 공동으로 최적화합니다.

## 주요 결과
**WIDESEEK-R1-4B** 는 WideSearch 벤치마크에서 **40.0%의 아이템 F1 점수** 를 달성했으며, 이는 단일 에이전트 **DeepSeek-R1-671B** 와 비견되는 성능입니다. 이는 DeepSeek-R1-671B보다 약 **170배 적은 파라미터** 를 사용했음에도 불구하고 달성된 결과입니다. 특히, 병렬 서브 에이전트 수가 증가함에 따라 지속적인 성능 향상을 보이며 폭 스케일링의 효과를 입증한 반면, 깊이 스케일링은 빠르게 포화되었습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 기반 시스템 설계에서 **"폭 스케일링"의 중요한 가능성** 을 제시하며, **조직 역량을 통한 성능 향상** 의 새로운 방향을 제시합니다. **작은 모델(4B)** 로도 **대규모 모델(671B)** 에 필적하는 성능을 달성하여, **제한된 컴퓨팅 자원** 으로도 고성능 AI를 개발할 수 있는 실용적인 길을 열었습니다. 또한, **MARL 기반의 학습 가능한 오케스트레이션** 이 복잡하고 광범위한 정보 탐색 문제에 효과적임을 보여주어, 실제 AI 시스템 설계에 있어 다중 에이전트 협업의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.