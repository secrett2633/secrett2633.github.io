---
title: "[논문리뷰] SWE-CI: Evaluating Agent Capabilities in Maintaining Codebases via Continuous Integration"
excerpt: "Bing Zhao이 arXiv에 게시한 'SWE-CI: Evaluating Agent Capabilities in Maintaining Codebases via Continuous Integration' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Software Engineering
  - Code Maintenance
  - Continuous Integration
  - Benchmark
  - Code Generation
  - Long-term Evaluation
  - Technical Debt

permalink: /ai/review/2026-03-05-SWE-CI-Evaluating-Agent-Capabilities-in-Maintaining-Codebases-via-Continuous-Integration/

toc: true
toc_sticky: true

date: 2026-03-05 00:00:00+0900+0900
last_modified_at: 2026-03-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.03823)

**저자:** Jialong Chen, Xander Xu, Hu Wei, Chuan Chen, Bing Zhao



## 핵심 연구 목표
기존 벤치마크들이 **정적이고 단발적인 기능적 정확성** 평가에 치중하여 실제 소프트웨어 개발의 복잡한 요구사항 변화와 장기적인 기능 반복을 포착하지 못하는 문제를 해결하는 것이 목표입니다. **Continuous Integration (CI) 루프** 기반의 첫 번째 레파지토리 수준 벤치마크인 **SWE-CI** 를 통해 코드 생성 평가 패러다임을 **동적이고 장기적인 유지보수성** 으로 전환하고자 합니다.

## 핵심 방법론
SWE-CI는 실제 코드 레파지토리의 **평균 233일** 및 **71개의 연속 커밋** 에 걸친 진화 이력을 반영하는 **100개의 태스크** 로 구성됩니다. 평가는 **아키텍트-프로그래머 듀얼 에이전트 프로토콜** 을 사용하며, 에이전트가 분석 및 코딩 반복을 통해 태스크를 체계적으로 해결하도록 요구합니다. 모델의 유지보수 능력을 측정하기 위해 미래 지향적 가중치를 부여하는 **EvoScore** 지표를 도입하여, 초기 결정이 향후 진화에 미치는 영향을 반영합니다.

## 주요 결과
실험 결과, 최신 **대규모 언어 모델(LLM)** 들이 단기적인 기능적 정확성에서는 상당한 발전을 보였음에도 불구하고, **장기적인 코드 품질 유지** 에서는 여전히 어려움을 겪는 것으로 나타났습니다. 특히, 대부분의 모델은 **0.25 미만의 낮은 제로 회귀율** 을 기록했으며, **Claude Opus 시리즈** 만이 **0.5 이상** 의 회귀 방지율을 달성했습니다. 이는 LLM의 코드 유지보수 능력이 지속적인 코드 진화 과정에서 여전히 한계가 있음을 시사합니다.

## AI 실무자를 위한 시사점
**SWE-CI** 는 LLM 기반 에이전트가 실제 소프트웨어 개발 환경에서 **장기적인 코드 품질을 유지** 하고 **기술 부채를 관리** 하는 능력을 평가하는 데 중요한 통찰력을 제공합니다. **제로 회귀율** 과 같은 지표는 LLM 에이전트가 단기적인 버그 수정뿐만 아니라 **지속적인 코드 안정성** 을 확보하는 데 있어 아직 큰 도전 과제를 안고 있음을 보여주며, 이는 향후 LLM 기반 소프트웨어 개발 도구 및 에이전트 연구 방향에 중요한 가이드라인을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.