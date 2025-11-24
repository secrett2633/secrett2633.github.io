---
title: "[논문리뷰] Flash-Searcher: Fast and Effective Web Agents via DAG-Based Parallel
  Execution"
excerpt: "이 [arXiv]에 게시한 'Flash-Searcher: Fast and Effective Web Agents via DAG-Based Parallel
  Execution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Parallel Execution
  - DAG-based Planning
  - Tool Orchestration
  - Web Agents
  - Reasoning Framework
  - Efficiency

permalink: /ai/review/2025-10-2-Flash-Searcher-Fast-and-Effective-Web-Agents-via-DAG-Based-Parallel-Execution/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25301)

**저자:** OPPO AI Agent Team (Wangchunshu Zhou, Xitong Gao 등)



## 핵심 연구 목표
본 논문은 기존 LLM 에이전트 프레임워크의 고질적인 문제인 **비효율적인 순차적 처리 방식**을 해결하여, 복잡한 웹 기반 추론 작업에서 발생하는 과도한 실행 단계와 긴 지연 시간을 단축하는 것을 목표로 합니다. 특히 광범위한 도구 상호작용이 필요한 태스크에서 에이전트의 효율성과 확장성을 근본적으로 개선하고자 합니다.

## 핵심 방법론
제안하는 **FLASH-SEARCHER**는 복잡한 태스크를 명시적 의존성을 가진 하위 태스크로 분해하여 **DAG(Directed Acyclic Graph) 기반 계획**을 수립합니다. 이 프레임워크는 **동시 실행**을 통해 독립적인 추론 경로를 병렬로 처리하며, **동적 워크플로우 최적화**와 요약 모듈을 통합하여 실행 그래프를 지속적으로 개선하고 중복 상호작용을 줄입니다. 도구는 **Serper API 기반 검색 도구**와 **Jina Reader 기반 크롤링 도구**만을 사용하여 간결성을 유지하며, **3354개의 DAG 기반 추론 궤적**으로 구성된 데이터셋을 통해 **지도 미세 조정을 수행**하여 에이전트를 학습시켰습니다.

## 주요 결과
FLASH-SEARCHER는 **BrowseComp 벤치마크에서 67.7% 정확도**와 **xbench-DeepSearch에서 83% 정확도**를 달성하며 기존 최첨단 방식을 뛰어넘는 성능을 보였습니다. 또한, 기존 프레임워크 대비 에이전트 실행 단계를 **최대 35% 감소**시키고 전체 실행 시간을 **약 65% 단축**하는 등 현저한 효율성 개선을 입증했습니다. 경량화된 **Qwen-2.5 오픈 소스 모델**에 적용했을 때도 **xbench-DeepSearch에서 68.0% 성능**을 기록하며 방법론의 일반화 가능성을 확인했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 에이전트 시스템의 **확장성과 효율성을 혁신**할 수 있는 **병렬 추론 패러다임**을 제시합니다. AI 엔지니어는 **DAG 기반 태스크 분해 및 병렬 실행**을 통해 복잡한 다단계 작업을 훨씬 빠르게 처리하고, 특히 웹 스케일 정보 검색 및 도구 사용이 많은 애플리케이션에서 **운영 비용을 절감**할 수 있습니다. 또한, 경량 미세 조정만으로 병렬 추론 능력을 다양한 LLM 백본에 전이할 수 있음을 보여주어, 실제 서비스에 적용하기 위한 **모델 배포의 유연성**을 높였습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.