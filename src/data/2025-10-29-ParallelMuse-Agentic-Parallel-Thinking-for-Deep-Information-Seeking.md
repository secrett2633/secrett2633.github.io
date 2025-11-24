---
title: "[논문리뷰] ParallelMuse: Agentic Parallel Thinking for Deep Information Seeking"
excerpt: "이 [arXiv]에 게시한 'ParallelMuse: Agentic Parallel Thinking for Deep Information Seeking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic AI
  - Parallel Thinking
  - Information Seeking
  - LLM Agents
  - Context Window Optimization
  - Exploration Efficiency
  - Reasoning Aggregation
  - Tool Use

permalink: /ai/review/2025-10-29-ParallelMuse-Agentic-Parallel-Thinking-for-Deep-Information-Seeking/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24698)

**저자:** Baixuan Li, Dingchu Zhang, Jialong Wu, Wenbiao Yin, Zhengwei Tao, Yida Zhao, Liwen Zhang, Haiyang Shen, Runnan Fang, Pengjun Xie, Jingren Zhou, Yong Jiang



## 핵심 연구 목표
본 논문은 심층 정보 탐색(Deep Information Seeking, IS) 에이전트의 기존 병렬 사고 방식이 지닌 비효율성(반복적인 롤아웃)과 장기 추론 궤적 통합의 어려움(제한된 컨텍스트)을 해결하는 것을 목표로 합니다. 에이전트의 문제 해결 능력을 향상시키기 위해 탐색 효율성을 높이고, 추론 과정의 통합을 강화하는 새로운 패러다임을 제안합니다.

## 핵심 방법론
제안된 **PARALLELMUSE**는 두 단계로 구성됩니다: 첫째, **Functionality-Specified Partial Rollout**은 생성된 시퀀스를 기능적 영역(추론, 탐색)으로 분할하고 불확실성 기반 경로 재사용 및 분기를 통해 탐색 효율성을 높입니다. 이는 **KV 캐싱**을 활용하여 중복 계산을 줄입니다. 둘째, **Compressed Reasoning Aggregation**은 추론 과정의 중복성을 활용하여 정보 탐색 궤적을 **구조화된 보고서(Solution Planning, Solution Methods, Final Reasoning)**로 압축하고, 이 압축된 보고서들을 집계하여 일관된 최종 답변을 생성합니다.

## 주요 결과
**PARALLELMUSE**는 여러 오픈소스 에이전트 및 벤치마크(예: **GPT-OSS-20B**, **DeepSeek-V3.1-T**, **Tongyi-DR-30B-A3B** 모델, **BrowseComp**, **GAIA**, **HLE** 벤치마크)에서 최대 **62%**의 성능 향상을 달성했습니다. 동시에 탐색 토큰 소비량을 **10~30%** 절감하는 효율성을 보였습니다. 특히 **Functionality-Specified Partial Rollout**은 컨텍스트 재사용을 통해 최대 **28%**의 토큰을 절약했습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡한 정보 탐색 작업을 수행하는 **LLM 에이전트의 성능과 비용 효율성**을 크게 개선할 수 있는 실용적인 프레임워크를 제공합니다. 제한된 컨텍스트 윈도우와 비효율적인 탐색 문제를 해결하는 구체적인 접근 방식을 제시하며, 특히 에이전트 시스템을 개발하는 엔지니어에게 **지능형 탐색 및 효율적인 추론 집계** 전략의 중요성을 강조합니다. **구조화된 추론 보고서**를 통한 정보 압축은 대규모 언어 모델 기반 에이전트의 실용성을 높이는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.