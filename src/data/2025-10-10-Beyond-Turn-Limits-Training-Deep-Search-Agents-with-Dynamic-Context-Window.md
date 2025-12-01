---
title: "[논문리뷰] Beyond Turn Limits: Training Deep Search Agents with Dynamic Context
  Window"
excerpt: "Yaojie Lu이 [arXiv]에 게시한 'Beyond Turn Limits: Training Deep Search Agents with Dynamic Context
  Window' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Search Agents
  - Dynamic Context Window
  - Reinforcement Learning
  - Long-horizon Interaction
  - Context Management
  - High-difficulty Tasks
  - Multi-turn Reasoning
  - Web Agents

permalink: /ai/review/2025-10-10-Beyond-Turn-Limits-Training-Deep-Search-Agents-with-Dynamic-Context-Window/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08276)

**저자:** Qiaoyu Tang, Hao Xiang, Le Yu, Bowen Yu, Yaojie Lu



## 핵심 연구 목표
본 논문은 기존의 다중 턴 에이전트가 낮은 태스크 복잡도와 컨텍스트 관리의 한계로 인해 장기적인 상호작용에서 깊은 추론 능력을 발휘하지 못하는 문제를 해결하고자 합니다. 특히, 기존 데이터셋이 얕은 정보 검색에 의존하고, 일반적인 **32k 컨텍스트 길이** 에서 상호작용 턴이 **10-15회** 로 제한되는 점을 극복하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **고난이도 훈련 태스크** 와 **동적 컨텍스트 윈도우** 관리를 통해 문제를 해결하는 DeepMiner 프레임워크를 제안합니다. 고난이도 훈련 데이터는 실제 웹 소스에서 복잡하지만 검증 가능한 질의응답 쌍을 **역구성(reverse construction)** 방식으로 생성하며, **엔티티 기반 정보 수집** , **다중 소스 질문 생성** , **엄격한 품질 필터링** 을 거칩니다. 동적 컨텍스트 관리를 위해 **슬라이딩 윈도우 메커니즘** 을 설계하여, 어시스턴트의 추론 과정을 보존하면서 오래된 도구 응답을 선택적으로 압축하고 외부 요약 모델의 의존성을 제거했습니다. **Qwen3-32B** 를 기반 모델로 **지도 학습(SFT)** 과 **강화 학습(RL)** 을 결합한 2단계 훈련 전략을 사용하며, 동적 컨텍스트 조건에서의 효과적인 훈련을 위해 궤적을 다중 훈련 시퀀스로 분해합니다.

## 주요 결과
DeepMiner-32B는 **BrowseComp-en** 벤치마크에서 **33.5%** 의 정확도를 달성하여, 기존 오픈소스 에이전트 대비 **거의 20%p** 에 달하는 상당한 성능 향상을 보였습니다. 또한, **BrowseComp-zh** , **XBench-DeepSearch** , **GAIA** 등 다양한 벤치마크에서도 일관된 개선을 입증했습니다. 특히, 이 동적 컨텍스트 관리 방식은 표준 **32k 컨텍스트 길이** 내에서 **거의 100회** 에 이르는 지속적인 상호작용을 가능하게 하여, 기존 멀티턴 상호작용 시스템의 컨텍스트 한계를 효과적으로 극복했습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡하고 긴 상호작용을 요구하는 검색 에이전트 개발에 있어 **고품질 훈련 데이터 생성** 과 **효율적인 컨텍스트 관리** 의 중요성을 강조합니다. **외부 요약 모델 없이** **동적 슬라이딩 윈도우** 를 활용하는 접근 방식은 LLM 기반 에이전트의 **운영 범위** 를 확장하는 실용적인 해결책을 제공합니다. 이는 실제 환경에서 더 깊고 지속적인 추론이 필요한 AI 애플리케이션 개발에 중요한 기여를 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.