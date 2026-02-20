---
title: "[논문리뷰] LLMs as Scalable, General-Purpose Simulators For Evolving Digital Agent
  Training"
excerpt: "arXiv에 게시된 'LLMs as Scalable, General-Purpose Simulators For Evolving Digital Agent
  Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - Digital Agents
  - UI Simulation
  - Synthetic Data Generation
  - Targeted Data Synthesis
  - World Models

permalink: /ai/review/2025-10-17-LLMs-as-Scalable-General-Purpose-Simulators-For-Evolving-Digital-Agent-Training/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14969)

**저자:** Yiming Wang, Da Yin, Yuedong Cui, Ruichen Zheng, Zhiqian Li, Zongyu Lin, Di Wu, Xueqing Wu, Chenchen Ye, Yu Zhou, Kai-Wei Chang



## 핵심 연구 목표
본 논문은 디지털 에이전트 훈련에 필요한 **대규모, 고품질 UI 환경 훈련 궤적 데이터의 부족 문제** 를 해결하고자 합니다. 기존 데이터 수집 방식의 높은 비용과 확장성 한계를 극복하기 위해, **LLM 기반 시뮬레이터** 를 활용하여 다양한 UI 상태와 전환을 합성하는 확장 가능한 패러다임을 제안하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **UI-SIMULATOR** 라는 확장 가능한 패러다임을 제안합니다. 이는 **LLM 기반 디지털 세계 시뮬레이터** 가 이전 UI 상태와 다음 행동을 기반으로 계층적 UI 상태를 생성하며, **가이드 롤아웃 프로세스** 를 통해 일관성 있는 탐색을 유도합니다. 추가적으로 **UI-Simulator-Grow** 는 **teacher-forcing loss** 기반으로 고영향 태스크를 식별하고, 해당 태스크의 다양한 궤적 변형을 합성하여 **데이터 효율적인 스케일링** 을 가능하게 합니다.

## 주요 결과
**UI-SIMULATOR** 는 **WebArena** 및 **AndroidWorld** 벤치마크에서 **GPT-4o-mini** 와 같은 약한 티처 모델을 사용했음에도 불구하고, 실제 UI로 훈련된 오픈소스 에이전트와 유사하거나 더 나은 성능을 달성했습니다. 특히, **UI-Simulator-Grow** 는 **Llama-3-8B-Instruct** 를 기반 모델로 사용하여 **Llama-3-70B-Instruct** 와 동등한 성능을 보였으며, 원래 훈련 궤적의 **66%만 사용** 하여 데이터 효율성을 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
이 연구는 디지털 에이전트 개발에서 **고품질 합성 훈련 데이터** 를 대규모로 생성하는 확장 가능하고 비용 효율적인 방법을 제시합니다. **LLM을 시뮬레이터로 활용** 하는 패러다임은 에이전트가 다양한 UI 환경에 대한 일반화 및 강건성을 높이는 데 기여하며, **UI-Simulator-Grow** 의 **목표 지향적 데이터 합성 전략** 은 개발 시간과 자원을 크게 절약할 수 있음을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.