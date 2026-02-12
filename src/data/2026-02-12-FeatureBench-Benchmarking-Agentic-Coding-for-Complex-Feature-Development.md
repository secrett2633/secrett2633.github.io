---
title: "[논문리뷰] FeatureBench: Benchmarking Agentic Coding for Complex Feature Development"
excerpt: "Jiahe Wang이 [arXiv]에 게시한 'FeatureBench: Benchmarking Agentic Coding for Complex Feature Development' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Coding
  - Benchmarking
  - LLMs
  - Feature Development
  - Software Engineering
  - Test-Driven Development
  - Scalability

permalink: /ai/review/2026-02-12-FeatureBench-Benchmarking-Agentic-Coding-for-Complex-Feature-Development/

toc: true
toc_sticky: true

date: 2026-02-12 00:00:00+0900+0900
last_modified_at: 2026-02-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.10975)

**저자:** Jiahe Wang, Rui Hao, Haiyang Wang, Jiacheng Zhang, Qixing Zhou



## 핵심 연구 목표
대규모 언어 모델(LLM) 기반 코드 에이전트의 현재 코딩 능력을 평가하고, 기존 벤치마크의 제한적인 태스크 범위(버그 수정 등)를 넘어 **복잡한 기능 개발** 시나리오에서의 성능을 측정하기 위한 새로운 벤치마크인 **FeatureBench** 를 제안하는 것을 목표로 합니다. 이는 에이전트의 실제 소프트웨어 개발 역량을 정확하게 평가하고 발전 방향을 제시하는 데 있습니다.

## 핵심 방법론
FeatureBench는 **실행 기반 평가 프로토콜** 과 **확장 가능한 테스트 주도 방식** 을 통합합니다. 유닛 테스트를 기반으로 **의존성 그래프** 를 따라가며 여러 커밋과 PR에 걸쳐있는 **기능 수준 코딩 태스크** 를 자동으로 식별하고 추출합니다. 이 과정은 Docker 환경에서 **fail-to-pass(F2P)** 및 **pass-to-pass(P2P)** 테스트를 통해 검증되며, 명확한 인터페이스 정의를 포함하는 문제 설명을 생성합니다.

## 주요 결과
총 **200개의 평가 태스크** 와 **3825개의 실행 가능한 환경** 으로 구성된 FeatureBench의 초기 버전에서, 최첨단 에이전트 모델인 **Claude 4.5 Opus** 는 **SWE-bench에서 74.4%의 해결률** 을 달성했음에도 불구하고, FeatureBench 태스크에서는 단 **11.0%** 의 해결률을 기록하며 큰 격차를 보였습니다. 이는 현존하는 에이전트가 교차 파일 의존성 해결, 장기적인 계획, API 제약 준수 등에서 상당한 한계를 가지고 있음을 시사합니다.

## AI 실무자를 위한 시사점
FeatureBench의 결과는 LLM 기반 코드 에이전트가 **복잡한 기능 개발** 에서 아직 초기 단계에 있음을 명확히 보여주며, **장기적인 추론 능력** 과 **정확한 코드 생성** 에 대한 연구 기회를 제공합니다. 또한, **자동화된 태스크 수집 도구** 는 데이터 유출 위험을 완화하고 벤치마크의 지속적인 업데이트를 가능하게 하여, 미래 에이전트 훈련을 위한 검증 가능한 환경을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.