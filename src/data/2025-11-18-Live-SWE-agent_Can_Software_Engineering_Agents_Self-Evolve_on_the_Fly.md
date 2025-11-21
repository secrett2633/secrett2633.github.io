---
title: "[논문리뷰] Live-SWE-agent: Can Software Engineering Agents Self-Evolve on the Fly?"
excerpt: "Lingming Zhang이 [arXiv]에 게시한 'Live-SWE-agent: Can Software Engineering Agents Self-Evolve on the Fly?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Software Engineering Agents
  - LLM Agents
  - Self-Evolution
  - On-the-Fly Learning
  - Tool Creation
  - SWE-bench
  - Autonomous Systems
  - Code Generation

permalink: /ai/review/2025-11-18-Live-SWE-agent_Can_Software_Engineering_Agents_Self-Evolve_on_the_Fly/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.13646)

**LIVE-SWE-AGENT: Can Software Engineering Agents Self-Evolve on the Fly?**
**저자:** Chunqiu Steven Xia, Zhe Wang, Yan Yang, Yuxiang Wei, Lingming Zhang



## 핵심 연구 목표
이 논문은 기존 LLM 기반 소프트웨어 에이전트가 고정된 설계와 값비싼 오프라인 훈련으로 인해 성능이 최적화되지 못하고 특정 벤치마크에 국한되는 한계를 해결하고자 합니다. 이를 위해 **LIVE-SWE-AGENT**를 제안하여, 실제 소프트웨어 문제를 해결하는 동안 **온더플라이(on-the-fly)로 자율적으로 진화**하고 자체 스캐폴드를 수정할 수 있는 최초의 라이브 소프트웨어 에이전트를 개발하는 것을 목표로 합니다.

## 핵심 방법론
**LIVE-SWE-AGENT**는 **mini-SWE-agent**와 같은 기본적인 **bash 도구** 접근 권한만 가진 에이전트 스캐폴드에서 시작합니다. 에이전트는 문제를 해결하는 과정에서 **단계-반영(step-reflection) 프롬프트**를 통해 **사용자 정의 도구를 합성, 수정 및 실행**함으로써 자체 스캐폴드 구현을 자율적으로 진화시킵니다. 이 메커니즘은 도구 생성을 일반적인 작업 결정과 동등한 수준의 의사결정으로 통합하여, 추가적인 오프라인 훈련이나 복잡한 스캐폴드 수정 없이 에이전트가 동적으로 개선되도록 합니다.

## 주요 결과
**LIVE-SWE-AGENT**는 **SWE-bench Verified** 벤치마크에서 **75.4%**의 인상적인 해결률을 달성하며 모든 기존 오픈소스 소프트웨어 에이전트를 능가하고 최고의 독점 솔루션에 근접했습니다. 또한, 더욱 도전적인 **SWE-Bench Pro** 벤치마크에서는 **45.8%**의 해결률로 최고 기록을 달성했습니다. 이는 기존 자체 개선 에이전트들이 수백 시간의 오프라인 훈련을 요구하는 반면, **LIVE-SWE-AGENT**는 **훈련 비용 없이** 이러한 성능을 달성했음을 보여줍니다.

## AI 실무자를 위한 시사점
**LIVE-SWE-AGENT**는 LLM 기반 소프트웨어 에이전트가 **실시간으로 능력을 확장하고 개선**할 수 있는 가능성을 제시하여, 에이전트의 개발 및 유지보수 비용을 크게 절감할 수 있습니다. AI 엔지니어는 복잡한 수동 스캐폴드 설계 없이도 온더플라이 도구 생성 능력을 활용하여 다양한 작업 및 LLM에 대해 일반화된 자동화 솔루션을 구축할 수 있습니다. 그러나 약한 LLM은 유용한 도구를 합성하는 고수준 추론 능력이 부족할 수 있으므로, **LLM의 선택이 도구 생성 및 전반적인 성능에 결정적**임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.