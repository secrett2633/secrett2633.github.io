---
title: "[논문리뷰] On the Use of Agentic Coding: An Empirical Study of Pull Requests on
  GitHub"
excerpt: "Hajimu Iida이 [arXiv]에 게시한 'On the Use of Agentic Coding: An Empirical Study of Pull Requests on
  GitHub' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Coding
  - AI Agents
  - Large Language Models
  - GitHub Pull Requests
  - Software Engineering
  - Empirical Study
  - Code Generation
  - Software Development

permalink: /ai/review/2025-9-25-On-the-Use-of-Agentic-Coding-An-Empirical-Study-of-Pull-Requests-on-GitHub/

toc: true
toc_sticky: true

date: 2025-09-25 13:08:16+0900
last_modified_at: 2025-09-25 13:08:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.14745)

**저자:** Miku Watanabe, Hao Li, Yutaro Kashiwa, Brittany Reid, Hajimu Iida, Ahmed E. Hassan



## 핵심 연구 목표
이 논문은 **자율형 AI 에이전트(Claude Code)** 가 생성한 GitHub Pull Request(PR)의 **실질적인 유용성과 수용도** 를 실증적으로 조사하는 것을 목표로 합니다. AI 에이전트가 생성한 PR(Agentic-PRs)이 인간이 생성한 PR(Human-PRs)과 변경 규모 및 목적 면에서 어떻게 다른지, 수용률과 거부 이유, 그리고 필요한 수정의 범위와 유형을 분석하여 에이전트 기반 코딩의 실제 적용 영향을 이해하고자 합니다.

## 핵심 방법론
연구는 **157개 오픈소스 프로젝트** 에서 **Claude Code** 를 사용하여 생성된 **567개의 PR** 을 분석했습니다. 비교를 위해 동일한 조건에서 **567개의 Human-PRs** 를 수집했습니다. PR의 목적 분류(RQ1)를 위해 **Zeng et al.의 프레임워크[45]** 를 사용하여 **213개 Agentic-PRs** 와 **221개 Human-PRs** 를 수동으로 분류했습니다. 거부 이유(RQ2)는 **Pantiuchina et al.의 프레임워크[33]** 를 확장하여 **92개 거부된 PR** 을 수동 분석했으며, 수정 유형(RQ4)은 **214개 수정된 Agentic-PRs** 를 대상으로 했습니다. 통계적 유의미성은 **Mann-Whitney U-test** 및 **카이제곱 검정** 으로 평가되었습니다.

## 주요 결과
**Agentic-PRs의 83.8%** 가 수용 및 병합되었으며, 이는 Human-PRs의 **91.0%** 보다 낮았지만, 병합까지의 평균 시간은 통계적으로 유의미한 차이가 없었습니다 (Agentic-PRs: **1.23시간** , Human-PRs: **1.04시간** ). 병합된 Agentic-PRs 중 **54.9%** 는 추가 수정 없이 수용되었으며, 이는 Human-PRs의 **58.5%** 와 유사했습니다. Agentic-PRs는 **리팩토링(24.9%)** , **문서화(22.1%)** , **테스팅(18.8%)** 작업에 더 자주 활용되었으며, **버그 수정(45.1%)** , **문서 업데이트(27.4%)** , **리팩토링(25.7%)** , **코드 스타일 개선(22.1%)** 이 가장 흔한 수정 유형이었습니다.

## AI 실무자를 위한 시사점
**Claude Code** 와 같은 에이전트 코딩 도구는 **리팩토링, 문서화, 테스팅** 과 같은 초기 개발 작업에서 개발자의 부담을 크게 줄여주는 강력한 출발점을 제공합니다. 그러나 AI가 생성한 코드의 **정확성, 유지보수성, 프로젝트 표준 준수** 를 위해서는 여전히 인간의 감독과 정교화가 필수적입니다. AI 에이전트에 작업을 할당할 때 **작고 명확한 지침** 을 제공하고, **프로젝트별 코딩 규칙, 스타일 가이드라인, 아키텍처 원칙** 등을 명확히 정의하여 (예: `CLAUDE.md` 파일) 에이전트의 출력 품질을 높여야 합니다. 또한, 에이전트가 생성한 PR에 **"신뢰 카드(confidence card)"** 를 포함하여 에이전트의 의도와 가정을 명시하는 것이 리뷰어의 신뢰를 높이고 검토 과정을 효율화하는 데 도움이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.