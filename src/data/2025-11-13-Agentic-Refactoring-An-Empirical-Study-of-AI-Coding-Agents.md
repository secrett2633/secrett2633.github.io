---
title: "[논문리뷰] Agentic Refactoring: An Empirical Study of AI Coding Agents"
excerpt: "Hajimu Iida이 [arXiv]에 게시한 'Agentic Refactoring: An Empirical Study of AI Coding Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Agents
  - Code Refactoring
  - Software Engineering
  - Empirical Study
  - Large Language Models
  - Code Quality
  - Agentic Software Development
  - Maintainability

permalink: /ai/review/2025-11-13-Agentic-Refactoring-An-Empirical-Study-of-AI-Coding-Agents/

toc: true
toc_sticky: true

date: 2025-11-13 00:00:00+0900+0900
last_modified_at: 2025-11-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.04824)

**저자:** Kosei Horikawa, Hao Li, Yutaro Kashiwa, Bram Adams, Hajimu Iida, Ahmed E. Hassan



## 핵심 연구 목표
이 연구는 AI 코딩 에이전트가 소프트웨어 개발에서 리팩토링 활동을 어떻게 수행하고, 그 유형과 목적은 무엇이며, 코드 품질에 어떤 영향을 미치는지에 대한 실증적 이해 부족 문제를 해결하고자 합니다. 특히 AI 에이전트 기반 리팩토링의 실제 활용 양상과 인간 주도 리팩토링과의 차이점을 대규모 데이터셋을 통해 분석하는 것을 목표로 합니다.

## 핵심 방법론
연구는 **AIDev 데이터셋**에서 추출된 **15,451개의 리팩토링 인스턴스**를 분석하며, **RefactoringMiner**를 사용하여 리팩토링 유형을 식별했습니다. 또한 **GPT-4.1-mini**를 활용하여 리팩토링의 목적을 분류하고 **DesigniteJava**로 코드 품질 지표와 코드 스멜을 측정하여 리팩토링 전후 변화를 분석했습니다. 이 과정에서 **Wilcoxon signed-rank test**와 **Cohen's κ (0.77)**를 통해 통계적 유의성과 분류 신뢰도를 확보했습니다.

## 주요 결과
AI 에이전트 커밋 중 **26.1%**가 명시적으로 리팩토링을 목표로 하며, 이는 **7,127건의 인스턴스**를 포함합니다. 에이전트 리팩토링은 주로 변수명 변경이나 타입 변경과 같은 **저수준(35.8%) 수정**에 집중되며, 인간 리팩토링보다 고수준 구조 변경은 적었습니다. 주요 목적은 **유지보수성(52.5%)**과 **가독성(28.1%)**이었으며, 중수준 변경에서 **클래스 LOC 중앙값 Δ = -15.25** 및 **WMC 중앙값 Δ = -2.07**와 같은 작지만 통계적으로 유의미한 구조적 개선을 보였으나, 코드 스멜 감소는 유의미하지 않았습니다.

## AI 실무자를 위한 시사점
AI 에이전트는 변수명 변경과 같은 **저수준, 일관성 지향 리팩토링**에 특히 유용하므로, 개발자는 이러한 반복 작업을 에이전트에게 위임하고 복잡한 아키텍처 리팩토링에 집중할 수 있습니다. 하지만 에이전트가 리팩토링 의도를 명시하지 않는 **"tangled commits"**를 생성할 수 있어 코드 리뷰 시 주의가 필요합니다. 또한 에이전트 개발자는 **DesigniteJava** 같은 도구를 통합하여 **코드 스멜 감소** 등 명확한 목표를 가진 구조적 개선을 수행하도록 에이전트를 발전시켜야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.