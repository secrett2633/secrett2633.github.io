---
title: "[논문리뷰] An Empirical Study of Testing Practices in Open Source AI Agent
  Frameworks and Agentic Applications"
excerpt: "Bram Adams이 [arXiv]에 게시한 'An Empirical Study of Testing Practices in Open Source AI Agent
  Frameworks and Agentic Applications' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Agent
  - LLM Agent
  - Testing
  - Empirical Study
  - Software Quality
  - Agent Frameworks
  - Agentic Applications
  - Non-Determinism

permalink: /ai/review/2025-10-2-An-Empirical-Study-of-Testing-Practices-in-Open-Source-AI-Agent-Frameworks-and-Agentic-Applications/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19185)

**저자:** Mohammed Mehedi Hasan, Hao Li, Emad Fallahzadeh, Gopi Krishnan Rajbahadur, Bram Adams, Ahmed E. Hassan



## 핵심 연구 목표
본 연구는 **FM(Foundation Model) 기반 AI 에이전트**의 본질적인 비결정론적 특성과 재현 불가능성으로 인한 테스팅 및 품질 보증 문제를 해결하고자 합니다. 기존 벤치마크가 태스크 수준 평가에 집중하는 한계를 넘어, 개발자들이 에이전트의 내부 정확성을 어떻게 검증하는지에 대한 이해 부족을 메우고, 실질적인 테스팅 패턴과 아키텍처 구성요소별 테스팅 노력을 규명하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **39개의 오픈소스 에이전트 프레임워크**와 **439개의 에이전트 애플리케이션**을 분석했습니다. **AST(Abstract Syntax Tree) 기반 파서**와 **계층화된 무작위 샘플링**을 통해 총 **759개의 테스트 함수**를 추출했습니다. 추출된 테스트 함수에 대해 **하이브리드 카드 분류** 기법을 적용하여 **10가지 고유한 테스팅 패턴**을 식별하고, **JaCaMo 프레임워크** 기반의 **13가지 정규 아키텍처 구성요소**에 **SUT(Subject Under Test)**를 매핑하여 테스팅 노력의 분포를 분석했습니다.

## 주요 결과
총 **10가지 테스팅 패턴**이 식별되었으며, **DeepEval** 및 **Hyperparameter Control**과 같은 최신 에이전트 특화 방법은 **약 1%** 미만의 낮은 채택률을 보였습니다. 반면, **음수 테스트(Negative Testing)** 및 **멤버십 테스트(Membership Testing)**와 같은 전통적인 패턴은 널리 사용되었습니다. 테스팅 노력의 **70% 이상**이 **Resource Artifacts(도구)** 및 **Coordination Artifacts(워크플로우)**와 같은 결정론적 컴포넌트에 집중되었고, **FM 기반 Plan Body**는 **5% 미만**의 노력을 받았습니다. 특히 **프롬프트(Trigger)** 컴포넌트는 전체 테스트의 **약 1%**만 다뤄져 치명적인 사각지대로 드러났습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 FM 기반 AI 에이전트의 **비결정론적 특성**을 다루기 위해 **전통적인 테스트 패턴**에 주로 의존하고 있지만, **DeepEval**과 같은 **첨단 semantic verification 기술**의 채택률이 매우 낮아 **잠재적인 품질 보증 격차**가 존재합니다. 또한, **프롬프트(Trigger)** 테스트의 심각한 부재는 모델 업데이트 시 **예측 불가능한 성능 저하**로 이어질 수 있으므로, **체계적인 프롬프트 회귀 테스트 스위트** 구축이 시급합니다. **하이퍼파라미터 제어**를 통해 **재현 가능한 테스트 환경**을 조성하고, 프레임워크와 애플리케이션 개발자 간의 **테스팅 책임 분담 계약**을 명확히 하여 중복 노력을 줄이고 효율성을 높여야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.