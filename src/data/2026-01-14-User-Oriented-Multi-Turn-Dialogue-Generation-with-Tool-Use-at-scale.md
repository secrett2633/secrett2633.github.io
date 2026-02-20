---
title: "[논문리뷰] User-Oriented Multi-Turn Dialogue Generation with Tool Use at scale"
excerpt: "arXiv에 게시된 'User-Oriented Multi-Turn Dialogue Generation with Tool Use at scale' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Turn Dialogue Generation
  - Tool Use
  - Autonomous Agents
  - Large Reasoning Models
  - User Simulation
  - Synthetic Data Generation
  - SQL-based Tools
  - Agentic Benchmarks

permalink: /ai/review/2026-01-14-User-Oriented-Multi-Turn-Dialogue-Generation-with-Tool-Use-at-scale/

toc: true
toc_sticky: true

date: 2026-01-14 00:00:00+0900+0900
last_modified_at: 2026-01-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.08225)

**저자:** Jungho Cho, Minbyul Jeong, Sungrae Park



## 핵심 연구 목표
기존 멀티턴 도구 사용(tool-use) 데이터셋의 한계(정적, 사전 정의된 도구셋, 단일 샷 위주)를 극복하고, 실제 인간-에이전트 협업의 반복적이고 점진적인 특성을 반영하는 **확장 가능한 고품질 멀티턴 대화 데이터 생성 프레임워크** 를 개발하는 것이 목표입니다. 특히, 단순한 작업 완수에 그치는 "효율성 함정"을 피하고 사실적인 사용자 상호작용을 유도하는 것을 지향합니다.

## 핵심 방법론
초기에는 LRM 기반 시뮬레이터를 활용한 **태스크 지향 멀티턴 대화 생성 프레임워크** 를 개발하여 동적으로 도구와 데이터베이스 스키마를 합성했습니다. 이후 이 방식의 효율성 함정을 해결하기 위해, 인간 행동 규칙(점진적 요청, 턴별 피드백)을 모방하는 **전용 사용자 시뮬레이터** 를 도입하여 태스크 생성과 상호작용을 분리하는 **사용자 지향 시뮬레이션 패러다임** 으로 전환했습니다. 이 파이프라인은 **동적 도구 및 태스크 합성** , **플러그 앤 플레이 확장성** , 그리고 단일 대화 내 여러 태스크 완수를 포함하는 **고밀도 트래젝토리** 생성을 특징으로 하며, **실행 가능한 SQL 기반 도구** 를 통해 실제 데이터베이스와 연동하여 도구 출력을 검증합니다.

## 주요 결과
제안된 **사용자 지향 합성 데이터** 로 훈련된 모델은 **BFCL** 및 **τ2** 에이전트 벤치마크에서 **APIGEN** 및 **NEMOTRON** 과 같은 기존 베이스라인보다 지속적으로 우수한 성능을 보였습니다. 특히 **사용자 지향 + 도구 실행 설정** 은 **Qwen3-30B** 모델의 **τ2 Telecom** 도메인에서 **34.2%** 에서 **40.4%** 로 가장 강력한 전반적인 결과를 달성했습니다. **Pass@k** 일관성 분석 결과, 모델이 반복 실행 시 더 견고하고 신뢰할 수 있는 도구 사용 전략을 내부화했음을 보여주었지만, 사용자 지향 파이프라인은 태스크 지향 파이프라인 대비 **더 높은 지연 시간(4.11초/샘플)** 과 **낮은 처리량(4,079 토큰/초)** 을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **사용자 중심 시뮬레이션** 과 **실시간 실행 가능한 SQL 기반 도구** 를 통해 대규모 고품질 멀티턴 대화 데이터를 생성하는 효과적인 방법론을 제시합니다. 이는 에이전트의 **장기적인 일관성** 과 **복잡한 도메인 상호작용 처리 능력** 을 향상시키는 데 필수적인 훈련 데이터를 제공하여, AI/ML 엔지니어들이 더욱 **견고하고 신뢰할 수 있는 자율 에이전트** 를 개발하는 데 기여할 수 있습니다. 다만, 현실적인 상호작용 시뮬레이션으로 인해 **데이터 생성 비용과 시간이 증가** 하므로, 프로젝트의 요구사항에 맞춰 데이터 품질과 생성 효율성 간의 균형을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.