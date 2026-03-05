---
title: "[논문리뷰] Memex(RL): Scaling Long-Horizon LLM Agents via Indexed Experience Memory"
excerpt: "Wei Wei이 arXiv에 게시한 'Memex(RL): Scaling Long-Horizon LLM Agents via Indexed Experience Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Long-Horizon Tasks
  - Memory Management
  - Indexed Experience Memory
  - Reinforcement Learning
  - Context Window
  - Tool Use
  - MEMEXRL

permalink: /ai/review/2026-03-05-MemexRL-Scaling-Long-Horizon-LLM-Agents-via-Indexed-Experience-Memory/

toc: true
toc_sticky: true

date: 2026-03-05 00:00:00+0900+0900
last_modified_at: 2026-03-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.04257)

**저자:** Zhenting Wang, Huancheng Chen, Jiayun Wang, Wei Wei



## 핵심 연구 목표
대규모 언어 모델(LLM) 에이전트가 장기 작업에서 직면하는 **유한한 컨텍스트 윈도우** 병목 현상을 해결하는 것이 목표입니다. 기존의 컨텍스트 축소 방식(예: 잘라내기, 요약)이 증거를 손실하는 근본적인 문제를 극복하여, 증거를 버리지 않고도 컨텍스트를 압축하는 효율적이고 정밀한 메모리 메커니즘을 개발하고자 합니다.

## 핵심 방법론
논문은 **Indexed Experience Memory (MEMEX)** 를 제안합니다. 이는 간결한 **색인화된 요약(indexed summary)** 을 인컨텍스트에 유지하면서, 상세한 과거 상호작용은 안정적인 인덱스 아래 외부 **키-값 경험 데이터베이스(external key-value experience database)** 에 저장하는 방식입니다. 에이전트는 **MEMEXRL** 이라는 강화 학습 프레임워크를 통해 컨텍스트 예산 내에서 요약, 아카이빙, 인덱싱 및 검색 시점을 학습하며, **CompressExperience** 및 **ReadExperience** 같은 메모리 작업을 도구 호출처럼 다룹니다.

## 주요 결과
**MEMEXRL** 훈련을 거친 에이전트는 수정된 **ALFWorld** 와 같은 도전적인 장기 작업을 통해 태스크 성공률을 **24.22%에서 85.61%로** 크게 향상시켰습니다. 동시에 피크 작업 컨텍스트 길이를 **16934.46 토큰에서 9634.47 토큰으로 약 43%** 감소시켰습니다. 에이전트는 **CompressExperience 호출 횟수를 평균 6.5회에서 3회로** 줄이고 **ReadExperience 호출 횟수를 평균 1회에서 6-7회로** 늘려 더욱 선택적인 압축과 명시적인 검색 전략을 학습했습니다.

## AI 실무자를 위한 시사점
**MEMEX** 는 복잡한 다단계 작업을 처리하는 LLM 에이전트에게 덜 손실이 많고 더 정밀한 장기 메모리 솔루션을 제공합니다. 안정적인 인덱스를 통해 전체 충실도 증거를 외부에서 보존하고 필요할 때 정확하게 검색하는 능력은 **도구 사용** 및 **장기 계획** 의 신뢰성을 높이는 데 중요합니다. 강화 학습을 통해 에이전트가 적응형 메모리 관리를 스스로 학습함으로써, 고정된 휴리스틱에 대한 의존도를 줄이고 컨텍스트 예산 제약에 더욱 강력하게 대응하는 AI 에이전트 개발의 기반을 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.