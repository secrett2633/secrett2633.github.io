---
title: "[논문리뷰] Group-Evolving Agents: Open-Ended Self-Improvement via Experience Sharing"
excerpt: "Zhen Zhang이 [arXiv]에 게시한 'Group-Evolving Agents: Open-Ended Self-Improvement via Experience Sharing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Open-Ended Learning
  - Self-Improving Agents
  - Evolutionary Algorithms
  - Experience Sharing
  - Meta-Learning
  - Code Generation
  - Agent Frameworks

permalink: /ai/review/2026-02-09-Group-Evolving-Agents-Open-Ended-Self-Improvement-via-Experience-Sharing/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.04837)

**저자:** Zhaotian Weng, Antonis Antoniades, Deepak Nathani, Zhen Zhang, Xiao Pu, Xin Eric Wang



## 핵심 연구 목표
본 논문은 기존의 개별 에이전트 중심, 트리 구조 진화 방식이 탐색적 다양성의 비효율적인 활용과 고립된 진화 브랜치로 인한 장기적인 누적 발전의 한계를 가지는 문제를 해결하고자 합니다. 궁극적으로 인간 개입 없이 스스로 구조적 설계를 수정하여 능력을 향상시키는 **오픈엔드 자가 개선 에이전트** 를 개발하는 것을 목표로 합니다.

## 핵심 방법론
새로운 패러다임인 **그룹 진화 에이전트(GEA)** 를 제안하며, 개별 에이전트가 아닌 **에이전트 그룹** 을 기본적인 진화 단위로 삼습니다. 각 반복에서 **성과-참신성(Performance-Novelty) 기준** 에 따라 **K개의 부모 에이전트 그룹** 을 선택하고, 이 그룹은 **명시적인 그룹 내 경험 공유 및 재사용** 을 통해 자식 그룹을 공동으로 생성합니다. 이 과정에서 에이전트의 워크플로우, 도구 사용, 프롬프트 전략 등을 개선하는 **프레임워크 수준의 패치** 를 생성하고 적용합니다.

## 주요 결과
GEA는 최신 자가 진화 방식인 DGM 대비 **SWE-bench Verified에서 71.0%(DGM 56.7%)** , **Polyglot에서 88.3%(DGM 68.3%)** 의 성능을 달성하며 상당한 개선을 보였습니다. 또한, 주입된 프레임워크 수준 버그를 평균 **1.4회 반복** 만에 수리하여 DGM의 5회 반복보다 뛰어난 견고성을 입증했습니다. 이는 GEA가 초기 단계의 탐색적 다양성을 지속적인 장기적 진전으로 효과적으로 전환함을 보여줍니다.

## AI 실무자를 위한 시사점
GEA는 경험 공유를 통해 에이전트의 자가 개선 효율성과 견고성을 크게 향상시킬 수 있는 새로운 접근 방식을 제시합니다. 특히, 워크플로우 및 도구 사용 개선과 같은 **모델 불가지론적인(model-agnostic) 패치** 는 GPT 및 Claude 계열 모델 전반에 걸쳐 일관된 전이 가능성을 보여주며, 다양한 LLM 백본에 적용할 수 있는 **더욱 범용적이고 자율적인 AI 에이전트 개발** 에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.