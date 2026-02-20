---
title: "[논문리뷰] Budget-Aware Tool-Use Enables Effective Agent Scaling"
excerpt: "arXiv에 게시된 'Budget-Aware Tool-Use Enables Effective Agent Scaling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Tool Use
  - Budget Awareness
  - Test-time Scaling
  - Cost-Performance
  - Web Search Agents
  - Planning
  - Self-Verification

permalink: /ai/review/2025-11-25-Budget-Aware-Tool-Use-Enables-Effective-Agent-Scaling/

toc: true
toc_sticky: true

date: 2025-11-25 00:00:00+0900+0900
last_modified_at: 2025-11-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.17006)

**저자:** Tengxiao Liu, Zifeng Wang, Jin Miao, I-Hung Hsu, Jun Yan, Jiefeng Chen, Rujun Han, Fangyuan Xu, Yanfei Chen, Ke Jiang, Samira Daruki, Yi Liang, William Yang Wang, Tomas Pfister, Chen-Yu Lee



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLM) 기반 에이전트의 효과적인 **테스트 시간 스케일링(test-time scaling)** 에 대한 연구를 목표로 합니다. 특히, 도구 사용 에이전트가 명시적인 예산 제약 조건 하에서 외부 환경과의 상호작용(도구 호출)을 어떻게 효율적으로 활용하여 성능을 최적화할 수 있는지를 탐구합니다. 기존 에이전트들이 예산 인식이 부족하여 성능 상한선에 도달하고 추가 자원을 비효율적으로 사용하거나 활용하지 못하는 문제점을 해결하고자 합니다.

## 핵심 방법론
연구팀은 먼저 에이전트에게 실시간으로 예산 상태를 지속적으로 알려주는 경량 플러그인인 **Budget Tracker** 를 제안합니다. 이를 기반으로, 예산 제약을 완전히 내재화하고 동적으로 계획 및 검증 전략을 조절하는 고급 프레임워크인 **BATS (Budget Aware Test-time Scaling)** 를 개발했습니다. **BATS** 는 **구조화된 계획(tree-structured plan)** 을 통해 탐색 폭과 검증 깊이를 조정하고, **예산 인식 셀프-검증 모듈(budget-aware self-verification module)** 을 통해 유망한 경로를 심층적으로 탐색할지 새로운 경로로 전환할지 결정합니다. 또한, 토큰 및 도구 소비를 통합하는 **통합 비용 지표(unified cost metric)** 를 사용하여 비용-성능 스케일링을 체계적으로 평가합니다.

## 주요 결과
**Budget Tracker** 를 적용한 **ReAct** 에이전트는 기존 **ReAct** 대비 모든 데이터셋에서 일관되게 정확도를 향상시켰으며, **10배 적은 예산(10 vs 100)** 으로도 유사한 정확도(예: **12.8% vs 12.6%** )를 달성하면서 **검색 호출 40.4% 감소** , **브라우징 호출 21.4% 감소** , **총 비용 31.3% 감소** 를 보여 효율성을 입증했습니다. 특히, **BATS** 는 **BrowseComp** 에서 **Gemini-2.5-Pro** 모델로 **24.6%** 의 정확도를 달성하며 경쟁 방법론들을 능가했습니다. **BATS** 는 동등하거나 낮은 비용으로 더 높은 정확도를 제공하며, **비용-성능 파레토 프론티어** 를 지속적으로 개선함을 정량적으로 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 에이전트 개발 시 **예산 인식을 명시적으로 통합** 하는 것이 성능과 효율성 향상에 결정적임을 보여줍니다. 특히 **웹 검색 에이전트** 와 같이 도구 사용이 필수적인 시나리오에서 **BATS** 와 같은 프레임워크는 제한된 자원 하에서 에이전트의 의사결정 능력과 전략적 행동을 크게 개선할 수 있습니다. **테스트 시간 스케일링** 시 토큰뿐만 아니라 **도구 호출 비용** 까지 고려하는 통합 비용 지표는 실제 애플리케이션에서 비용 효율적인 에이전트를 설계하는 데 중요한 가이드라인을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.