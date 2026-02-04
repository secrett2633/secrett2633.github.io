---
title: "[논문리뷰] AOrchestra: Automating Sub-Agent Creation for Agentic Orchestration"
excerpt: "Zhaoyang Yu이 [arXiv]에 게시한 'AOrchestra: Automating Sub-Agent Creation for Agentic Orchestration' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Orchestration
  - Sub-Agent Creation
  - Language Agents
  - Dynamic Specialization
  - Context Management
  - Tool Use
  - Large Language Models
  - Cost-Performance Optimization

permalink: /ai/review/2026-02-04-AOrchestra-Automating-Sub-Agent-Creation-for-Agentic-Orchestration/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.03786)

**저자:** Zhaoyang Yu, Fashen Ren, Yiran Peng, Zhihao Xu, Jianhao Ruan



## 핵심 연구 목표
본 논문은 복잡하고 장기적인 AI 태스크를 해결하기 위한 에이전트 시스템에서 **동적인 서브 에이전트 생성 및 관리의 한계** 를 극복하고자 합니다. 기존 서브 에이전트 접근 방식이 유연성이 부족하고 많은 수작업 엔지니어링을 요구하는 문제를 해결하여, **적응력 높은 온디맨드 특화 서브 에이전트 생성 프레임워크** 를 제안하는 것이 목표입니다.

## 핵심 방법론
제안하는 **AORCHESTRA** 는 모든 에이전트를 **(Instruction, Context, Tools, Model)이라는 통합 4-튜플 추상화** 로 모델링하여 서브 에이전트의 동적 생성을 가능하게 합니다. 중앙 오케스트레이터는 각 단계에서 이 4-튜플을 구체화하여, 태스크 관련 **컨텍스트를 선별** 하고, **도구와 모델을 동적으로 선택** 하며, **온디맨드 서브 에이전트 생성** 을 통해 실행을 위임합니다. 오케스트레이터 정책 학습을 위해 **지도 미세 조정(SFT)** 과 **인컨텍스트 학습(ICL)** 기반의 비용 인식 라우팅 기법을 활용합니다.

## 주요 결과
**AORCHESTRA** 는 **Gemini-3-Flash** 와 결합 시 **GAIA, Terminal-Bench 2.0, SWE-Bench-Verified** 벤치마크에서 기존 최강 베이스라인 대비 **16.28%의 상대적 성능 향상** 을 달성했습니다. 특히 **GAIA** 에서는 **80.00%의 pass@1** 을 기록하여 **OpenHands** 대비 **13.94%의 절대적 개선** 을 보였습니다. 또한, **SFT** 는 GAIA pass@1을 **11.51% 향상** 시켰고, **ICL** 은 GAIA pass@1을 **3.03% 향상** 시키면서 평균 비용을 **18.5% 절감** 하여 우수한 비용-성능 파레토 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**AORCHESTRA** 는 복잡한 AI 태스크를 위한 **강력하고 유연한 에이전트 시스템** 구축 가능성을 제시하며, **수동 엔지니어링 노력을 크게 줄일** 수 있습니다. **동적 서브 에이전트 생성 및 컨텍스트 관리** 는 에이전트가 개방형 환경에서 높은 적응력과 효율성으로 작동하도록 돕습니다. 또한, **오케스트레이션 정책을 학습** 하는 능력은 실환경 배포에서 지속적인 성능 개선 및 **비용 효율적인 의사 결정** 을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.