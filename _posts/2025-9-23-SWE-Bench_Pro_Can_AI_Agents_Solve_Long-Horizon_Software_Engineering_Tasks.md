---
title: "[논문리뷰] SWE-Bench Pro: Can AI Agents Solve Long-Horizon Software Engineering
  Tasks?"
excerpt: "Yannis Yiming He이 [arXiv]에 게시한 'SWE-Bench Pro: Can AI Agents Solve Long-Horizon Software Engineering
  Tasks?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Agents
  - Software Engineering
  - LLMs
  - Code Generation
  - Benchmark
  - Contamination Resistance
  - Long-Horizon Tasks
  - Enterprise Software

permalink: /ai/review/2025-9-23-SWE-Bench_Pro_Can_AI_Agents_Solve_Long-Horizon_Software_Engineering_Tasks/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.16941)

**저자:** Xiang Deng*, Jeff Da*, Edwin Pan, Yannis Yiming He, Charles Ide, Kanak Garg, Niklas Lauffer, Andrew Park, Nitin Pasari, Chetan Rane, Karmini Sampath, Maya Krishnan, Srivatsa Kundurthy, Sean Hendryx, Zifan Wang, Chen Bo Calvin Zhang, Noah Jacobson, Bing Liu, Brad Kenstler



## 핵심 연구 목표
본 논문은 기존의 **SWE-Bench**와 같은 코드 생성 벤치마크의 한계를 지적하며, 현실적인 **엔터프라이즈 수준**의 복잡성과 **장기적 관점(long-horizon)**을 지닌 소프트웨어 엔지니어링 문제 해결 능력을 평가하기 위한 새로운 벤치마크 **SWE-BENCH PRO**를 제시합니다. 이는 기존 벤치마크의 **데이터 오염 문제(data contamination)**를 완화하고, **대규모 언어 모델(LLM) 에이전트**가 실제 소프트웨어 개발 환경에서 직면하는 도전 과제를 더 정확하게 반영하는 것을 목표로 합니다. 궁극적으로 자율적인 소프트웨어 엔지니어링 에이전트 개발을 촉진하고자 합니다.

## 핵심 방법론
**SWE-BENCH PRO**는 **41개**의 활발히 유지보수되는 리포지토리에서 **1,865개**의 문제를 수집했으며, **강력한 카피레프트 라이선스(GPL)**를 가진 공개 리포지토리와 **상업용 스타트업 코드베이스**를 활용하여 데이터 오염 위험을 줄였습니다. 벤치마크 문제는 평균 **107.4 라인의 코드** 수정과 **4.1개의 파일**을 아우르는 **다중 파일 수정**을 요구하는 **복잡한 태스크**로만 구성되어 난이도를 높였습니다. 또한, **3단계의 인간 개입(human-in-the-loop) 프로세스**를 통해 문제 설명의 모호성을 제거하고 충분한 맥락을 제공하며, 테스트 케이스가 유효하고 해결 가능한지 검증합니다.

## 주요 결과
**SWE-BENCH PRO** 평가에서 최신 **LLM 에이전트**들의 성능은 기대치를 크게 밑돌았으며, **GPT-5**가 **23.3%**의 **Pass@1**로 가장 높은 해결률을 보였고, **Claude Opus 4.1**은 **22.7%**를 기록했습니다. 이는 기존 **SWE-Bench Verified**의 **70% 이상** 해결률과 비교할 때 현저히 낮은 수치입니다. 상업용 데이터셋에서는 모델들의 해결률이 **20% 미만**으로 더욱 낮게 나타나 **엔터프라이즈 코드베이스**의 복잡성이 반영되었습니다. **LLM-as-a-judge**를 통한 실패 모드 분석 결과, **Opus 4.1**은 **의미론적/알고리즘적 부정확성(wrong solution 35.9%)**에서, 소형 모델들은 **구문 오류(syntax error)**, **도구 사용 오류(tool error)**, **컨텍스트 오버플로우(context overflow)**에서 주요 실패 원인을 보였습니다.

## AI 실무자를 위한 시사점
**SWE-BENCH PRO**는 **LLM 에이전트**의 실제 소프트웨어 엔지니어링 역량을 평가하는 데 있어 **더욱 현실적이고 엄격한 기준**을 제시합니다. 현재 **최고 성능 모델**들도 실제 산업 환경의 복잡한 작업에는 크게 미치지 못함을 보여주므로, 에이전트의 **문제 이해력, 장기 계획 수립, 다중 파일 변경 관리, 그리고 견고한 도구 사용 능력**을 향상시키는 연구가 중요함을 강조합니다. 이 벤치마크는 **데이터 오염 방지 기술**의 중요성을 부각하고, **엔터프라이즈 코드베이스**를 다룰 수 있는 **차세대 AI 에이전트** 개발을 위한 중요한 이정표 역할을 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.