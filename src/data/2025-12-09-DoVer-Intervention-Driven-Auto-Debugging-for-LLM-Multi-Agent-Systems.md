---
title: "[논문리뷰] DoVer: Intervention-Driven Auto Debugging for LLM Multi-Agent Systems"
excerpt: "arXiv에 게시된 'DoVer: Intervention-Driven Auto Debugging for LLM Multi-Agent Systems' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Multi-Agent Systems
  - Debugging
  - Intervention-Driven
  - Failure Attribution
  - Automated Debugging
  - Verification
  - AI Agents
  - Reliability

permalink: /ai/review/2025-12-09-DoVer-Intervention-Driven-Auto-Debugging-for-LLM-Multi-Agent-Systems/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.06749)

**저자:** Ming Ma, Jue Zhang, Fangkai Yang, Yu Kang, Qingwei Lin, Saravan Rajmohan, Dongmei Zhang



## 핵심 연구 목표
LLM 기반 다중 에이전트 시스템의 복잡한 디버깅 문제를 해결하는 것을 목표로 합니다. 특히, 긴 상호작용 추적에서 발생하는 실패의 원인을 찾는 기존 로그 기반 방식의 한계(검증 부족, 단일 에이전트/단계 귀인 모호성)를 극복하고, **개입(intervention)** 을 통해 실패 가설을 **능동적으로 검증** 하며 **실패 복구율을 향상** 시키는 프레임워크를 제시합니다.

## 핵심 방법론
**DoVer(Do-then-Verify)** 라는 개입 주도 디버깅 프레임워크를 제안합니다. 이 프레임워크는 **(1) 세션 로그를 개별 시험(trial)로 분할** 하고, **(2) 각 시험에 대한 실패 가설을 생성** 하며, **(3) 계획(plan) 또는 메시지/단계 편집을 통해 실행 가능한 개입을 생성** 하고, 마지막으로 **(4) 개입을 적용하여 궤적을 재실행하고 결과를 평가** 하는 4단계 파이프라인으로 구성됩니다. 이 과정에서 **Trial Success Rate** 및 **Progress Made** 와 같은 새로운 평가 지표를 사용하여 개입의 효과를 정량화합니다.

## 주요 결과
**Magnetic-One** 에이전트 프레임워크의 **AssistantBench** 및 **GAIA** 데이터셋에서 **실패한 시험의 18-28%를 성공으로 전환** 시켰으며, 최대 **16%의 이정표(milestone) 진행** 을 달성했습니다. 또한, **GSMPlus** 데이터셋 및 **AG2** 에이전트 프레임워크에서는 **49%의 실패 사례를 복구** 하는 높은 성능을 보였습니다. DoVer는 실패 가설의 **30-60%를 검증하거나 반박** 하여 디버깅 시스템의 효과성을 입증했습니다.

## AI 실무자를 위한 시사점
기존 로그 기반 디버깅의 한계를 넘어선 **개입 기반 디버깅의 실용성과 확장성** 을 제시하여 LLM 다중 에이전트 시스템의 **신뢰성을 향상** 시키는 중요한 메커니즘을 제공합니다. 특히, **불확실한 Ground-Truth 레이블에 대한 의존성을 줄이고** 결과 지향적인 디버깅 접근 방식을 통해 **더욱 강력하고 검증 가능한 AI 에이전트 시스템 개발** 에 기여할 수 있습니다. 작은 모델에서도 **Few-Shot Prompting** 을 통해 성능 향상이 가능함을 보여주었습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.