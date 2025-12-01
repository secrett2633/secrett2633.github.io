---
title: "[논문리뷰] MAS-Bench: A Unified Benchmark for Shortcut-Augmented Hybrid Mobile GUI
  Agents"
excerpt: "Zhengxi Lu이 [arXiv]에 게시한 'MAS-Bench: A Unified Benchmark for Shortcut-Augmented Hybrid Mobile GUI
  Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mobile GUI Agents
  - Hybrid Automation
  - Shortcut Generation
  - Benchmark
  - Task Efficiency
  - LLM-based Agents
  - Mobile Robotics

permalink: /ai/review/2025-9-9-MAS-Bench-A-Unified-Benchmark-for-Shortcut-Augmented-Hybrid-Mobile-GUI-Agents/

toc: true
toc_sticky: true

date: 2025-09-09 13:19:09+0900
last_modified_at: 2025-09-09 13:19:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06477)

**저자:** Pengxiang Zhao, Guangyi Liu, Yaozhen Liang, Weiqing He, Zhengxi Lu, Yuehao Huang, Yaxuan Guo, Kexin Zhang, Hao Wang, Liang Liu, Yong Liu



## 핵심 연구 목표
이 논문은 모바일 GUI 에이전트의 효율성을 높이기 위해 **GUI 작업과 효율적인 바로가기(shortcuts)** 를 결합한 하이브리드 패러다임의 체계적인 벤치마킹 프레임워크가 부족하다는 문제를 해결하고자 합니다. 특히, 기존 정의된 바로가기뿐만 아니라 에이전트가 **스스로 바로가기를 생성하는 능력** 을 평가하는 **MAS-Bench** 를 제안하여, 복잡한 모바일 GUI 태스크에서 하이브리드 에이전트의 성능과 학습 능력을 종합적으로 평가하는 것을 목표로 합니다.

## 핵심 방법론
**MAS-Bench** 는 11개 실제 모바일 애플리케이션에 걸쳐 **139개의 복잡한 태스크** 와 88개의 사전 정의된 바로가기( **API, 딥링크, RPA 스크립트** )를 포함하는 지식 베이스를 제공합니다. 에이전트의 **바로가기 생성 능력** 을 평가하기 위해, 에이전트가 상호작용을 통해 새로운 바로가기를 생성하고 이를 표준화된 GUI 에이전트에 통합하여 성능을 측정하는 2단계 평가 프레임워크를 도입합니다. 성능은 **성공률(SR), 평균 단계 수(MS), 평균 실행 시간(MET), 토큰 비용(MToC)** 등의 7가지 지표로 평가됩니다.

## 주요 결과
하이브리드 에이전트는 GUI-only 에이전트보다 **최대 64.1%의 성공률** 을 달성하며 **44.6%** 대비 크게 향상되었고, **40% 이상 효율성** 이 높아졌습니다. **사전 정의된 바로가기** 는 **100% 성공률** 을 보이며 최상의 성능을 기록했으나, 에이전트가 생성한 **다이내믹 바로가기** 는 태스크 완료율 **38%** 로 낮았지만 가장 높은 효율성을 보여 **견고한 바로가기 생성** 에 대한 추가 연구의 필요성을 시사했습니다.

## AI 실무자를 위한 시사점
모바일 GUI 자동화에서 **바로가기 활용의 중요성** 과 그 효율성을 명확히 보여줍니다. 특히, **API, 딥링크, RPA 스크립트** 와 같은 사전 정의된 바로가기는 에이전트의 종류나 시각적 입력 방식과 무관하게 성능 향상에 기여하므로 적극적인 통합이 필요합니다. 에이전트가 **스스로 바로가기를 생성하고 최적화하는 능력** 은 복잡한 GUI 태스크 자동화의 잠재력을 높이지만, 현재로서는 **생성된 바로가기의 견고성** 을 높이는 연구가 선행되어야 함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.