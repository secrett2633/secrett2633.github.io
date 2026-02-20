---
title: "[논문리뷰] TreeCUA: Efficiently Scaling GUI Automation with Tree-Structured Verifiable Evolution"
excerpt: "Liming Zheng이 arXiv에 게시한 'TreeCUA: Efficiently Scaling GUI Automation with Tree-Structured Verifiable Evolution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Automation
  - Computer-Use Agents
  - Trajectory Synthesis
  - Tree-Structured Exploration
  - Multi-Agent Framework
  - Reinforcement Learning
  - DPO
  - Data Efficiency

permalink: /ai/review/2026-02-11-TreeCUA-Efficiently-Scaling-GUI-Automation-with-Tree-Structured-Verifiable-Evolution/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.09662)

**저자:** Deyang Jiang, Jing Huang, Xuanle Zhao, Lei Chen, Liming Zheng, Fanfan Liu, Haibo Qiu, Peng Shi, Zhixiong Zeng



## 핵심 연구 목표
본 연구는 GUI 자동화의 핵심 과제인 GUI 플래닝의 확장성 문제를 해결하는 것을 목표로 합니다. 기존 방식의 스텝 중복과 낮은 궤적 다양성, 그리고 인간 주석 의존성으로 인한 데이터 부족 문제를 극복하고, 고품질의 대규모 GUI 궤적 데이터를 효율적으로 합성하는 방법론을 제시합니다.

## 핵심 방법론
제안하는 **TreeCUA** 는 **트리 구조 검증 가능 진화(tree-structured verifiable evolution)** 데이터 합성 프레임워크입니다. 이 프레임워크는 환경 탐색, 행동 검증, 궤적 요약 및 품질 평가를 수행하는 **다중 에이전트 협업 시스템** 을 포함합니다. 효율성을 위해 **트리 기반 토폴로지** 를 사용하여 중복 탐색 노드를 저장 및 재사용하며, **적응형 탐색 알고리즘** 을 통해 궤적 깊이와 폭의 균형을 맞춥니다. 또한, **세계 지식(world knowledge)** 과 **글로벌 메모리 백트래킹(global memory backtracking)** 을 활용하여 저품질 생성을 필터링합니다. 풍부한 트리 구조 데이터를 활용하여 인접 궤적의 브랜치 정보를 선호도 쌍으로 사용하는 **TreeCUA-DPO** 를 통해 GUI 플래닝 능력을 강화합니다.

## 주요 결과
**TreeCUA-7B** 와 **TreeCUA-DPO-7B** 는 **OSWorld-Verified 벤치마크** 및 **OOD(Out-of-Distribution)** 태스크에서 SOTA(State-of-the-Art) 성능을 달성했습니다. 특히, **TreeCUA-7B** 는 OSWorld에서 **34.6%의 성공률(SR)** 을 기록하며 OpenCUA-7B( **24.3% SR** ) 및 ScaleCUA-7B( **15.0% SR** )를 크게 상회했습니다. **TreeCUA-DPO-7B** 는 OSWorld에서 **36.6% SR** , OOD 태스크에서 **30.8% SR** 로 성능을 더욱 향상시켰습니다. 노드 재사용을 통해 샘플 크기가 증가함에 따라 궤적당 평균 추론 단계가 크게 감소하는 효율성 개선을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 고품질 GUI 자동화 궤적을 효율적으로 생성하는 확장 가능한 방법을 제공하여, CUA(Computer-Use Agents) 분야의 데이터 부족 문제를 해결하는 데 기여합니다. **트리 구조 탐색** 과 **DPO(Direct Preference Optimization) 기반 파인튜닝** 은 복잡하고 순차적인 GUI 태스크에서 플래닝 및 일반화 성능을 향상시키는 강력한 접근 방식을 제시합니다. 이는 구조화된 데이터 수집 및 지능적인 탐색 전략(세계 지식, 글로벌 메모리)이 중복을 줄이고 다양성을 높이는 데 중요함을 강조하며, 미래 CUA 개발을 위한 청사진을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.