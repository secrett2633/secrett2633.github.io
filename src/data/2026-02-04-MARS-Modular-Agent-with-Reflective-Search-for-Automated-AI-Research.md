---
title: "[논문리뷰] MARS: Modular Agent with Reflective Search for Automated AI Research"
excerpt: "arXiv에 게시된 'MARS: Modular Agent with Reflective Search for Automated AI Research' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autonomous AI
  - Agent Framework
  - Machine Learning Engineering
  - Monte Carlo Tree Search
  - Reflective Learning
  - Modular Programming
  - Code Generation
  - Resource Management

permalink: /ai/review/2026-02-04-MARS-Modular-Agent-with-Reflective-Search-for-Automated-AI-Research/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.02660)

**저자:** Jiefeng Chen, Bhavana Dalvi Mishra, Jaehyun Nam, Rui Meng, Tomas Pfister, Jinsung Yoon



## 핵심 연구 목표
본 논문은 높은 평가 비용, 불투명한 성능 귀속, 복잡한 아키텍처 등으로 인해 기존 LLM 기반 에이전트가 어려움을 겪는 자동화된 AI 연구의 한계를 해결하는 것을 목표로 합니다. 특히, 컴퓨테이션 비용을 고려하고 모듈식 코드 생성을 통해 자율적인 AI 과학 발견을 최적화하는 프레임워크를 제시합니다.

## 핵심 방법론
MARS는 세 가지 핵심 요소에 기반합니다. 첫째, **비용 제약형 Monte Carlo Tree Search (MCTS)** 를 통한 **Budget-Aware Planning** 으로 성능 극대화와 실행 비용 균형을 명시적으로 조절합니다. 둘째, **"Design-Decompose-Implement" 파이프라인** 을 활용하는 **Modular Construction** 으로 복잡한 리포지토리를 독립적이고 테스트 가능한 모듈로 관리합니다. 셋째, **Comparative Reflective Memory** 를 도입하여 솔루션 차이를 분석하여 고신뢰 인사이트를 추출하고 신용 할당 문제를 해결합니다.

## 주요 결과
MARS는 MLE-Bench 벤치마크에서 오픈소스 프레임워크 중 **최첨단 성능** 을 달성했으며, 글로벌 리더보드의 상위 방법론과 경쟁력을 유지합니다. 특히, 표준 MARS는 **Gold Medal Rate 31.1%** 를 달성했고, 확장 버전인 MARS+는 **Above Median Rate 73.3%** 와 **Any Medal Rate 59.6%** 를 기록했습니다. 또한, 활용된 교훈의 **63%** 가 교차 브랜치 전이에서 발생하여 에이전트가 탐색 경로 전반에 걸쳐 인사이트를 효과적으로 일반화함을 입증했습니다.

## AI 실무자를 위한 시사점
MARS는 AI/ML 엔지니어에게 계산 비용과 복잡한 아키텍처를 효과적으로 관리하는 **구조화된 접근 방식** 을 제공합니다. 이는 실제 AI 연구 및 개발에서 **자원 효율성과 코드 유지보수성** 을 크게 향상시킬 수 있는 잠재력을 가집니다. 특히, **반복적인 학습 및 디버깅** 을 통해 문제를 해결하는 에이전트의 능력은 장기적인 AI 프로젝트의 자율성을 높이는 데 중요한 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.