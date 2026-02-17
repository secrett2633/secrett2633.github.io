---
title: "[논문리뷰] REDSearcher: A Scalable and Cost-Efficient Framework for Long-Horizon Search Agents"
excerpt: "이 [arXiv]에 게시한 'REDSearcher: A Scalable and Cost-Efficient Framework for Long-Horizon Search Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long-Horizon Search
  - Multimodal LLM
  - Task Synthesis
  - Agentic Mid-Training
  - Reinforcement Learning
  - Tool-Augmented Agents
  - Web Search

permalink: /ai/review/2026-02-17-REDSearcher-A-Scalable-and-Cost-Efficient-Framework-for-Long-Horizon-Search-Agents/

toc: true
toc_sticky: true

date: 2026-02-17 00:00:00+0900+0900
last_modified_at: 2026-02-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.14234)

**저자:** Zheng Chu, Xiao Wang, Jack Hong



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 긴 탐색 경로와 많은 상호작용이 필요한 심층 검색 태스크를 수행할 때 겪는 어려움, 특히 고품질 훈련 데이터 부족과 높은 상호작용 비용 문제를 해결하는 것을 목표로 합니다. 텍스트 전용 및 멀티모달 환경 모두에서 **장기적인 검색 에이전트** 의 확장 가능하고 비용 효율적인 최적화를 위한 통합 프레임워크 **REDSearcher** 를 제안합니다.

## 핵심 방법론
**REDSearcher** 는 **듀얼 제약 작업 합성** 을 통해 그래프 토폴로지(treewidth)와 증거 분산(MSD)을 정밀하게 제어하여 복잡하고 고품질의 태스크를 생성합니다. **비용 효율적인 중간 훈련** 단계에서는 지식 기반 그라운딩과 계층적 계획 같은 원자적 역량을 강화하고, 시뮬레이션 환경에서 **툴 사용** 및 장기 상호작용 능력을 개발합니다. 마지막으로, **기능적으로 동등한 시뮬레이션 환경** 을 활용하여 빠른 알고리즘 반복을 가능하게 하며, **GRPO 기반 에이전트 강화 학습(RLVR)** 으로 최종 성능을 최적화합니다.

## 주요 결과
**REDSearcher** 는 **30B 파라미터 클래스** 오픈소스 에이전트 중 새로운 최고 성능을 달성했으며, 컨텍스트 관리 기법 통합 시 전체 평균 **51.3점** 을 기록하여 **Tongyi DeepResearch-30B(48.5점)** 및 **WebSailorV2-30B(46.0점)** 를 능가했습니다. 특히 **GAIA 벤치마크** 에서 **80.1점** 으로 **GPT-5-Thinking-high(76.7점)** 를 앞섰습니다. 또한, **멀티모달 REDSearcher-MM-RL** 은 **BrowseComp-VL에서 57.2%** , **MMSearch에서 72.9%** 를 달성하며 독점 모델과 경쟁하는 수준을 보였습니다.

## AI 실무자를 위한 시사점
본 프레임워크는 LLM 기반 에이전트의 심층 검색 및 장기 계획 능력을 실제 환경에서 확장할 수 있는 실용적인 방법론을 제시합니다. **듀얼 제약 작업 합성** 과 **시뮬레이션 환경** 을 활용한 **비용 효율적인 훈련** 은 고품질 데이터 확보의 어려움을 극복하고, 대규모 에이전트 훈련의 장벽을 낮출 수 있는 효과적인 전략을 제공합니다. 이는 복잡한 실세계 문제를 해결하는 **프로액티브한 에이전트** 개발에 중요한 기반 기술이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.