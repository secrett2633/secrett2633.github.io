---
title: "[논문리뷰] SWE-Exp: Experience-Driven Software Issue Resolution"
excerpt: "Heng Lian이 [arXiv]에 게시한 'SWE-Exp: Experience-Driven Software Issue Resolution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - [Review]

permalink: /ai/review/2025-8-4-SWE-Exp__Experience-Driven_Software_Issue_Resolution/

toc: true
toc_sticky: true

date: 2025-08-04 12:17:01+0900
last_modified_at: 2025-08-04 12:17:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.23361)

SWE-Exp: Experience-Driven Software Issue Resolution

**저자:** Silin Chen, Yuling Shi, Dong Chen, Shaoxin Lin, Heng Lian, Weiguo Sun, Qianxiang Wang, Xiaodong Gu, Longfei Yun, Lin Cao

**키워드:** `Software Issue Resolution`, `LLM Agents`, `Experience-Driven Learning`, `Automated Program Repair`, `Multi-Agent Systems`, `Knowledge Management`, `Continuous Learning`

## 핵심 연구 목표
본 논문은 기존 LLM 기반 소프트웨어 문제 해결 에이전트가 과거 경험을 활용하지 못하고 각 문제를 독립적으로 처리하여 발생하는 비효율성(중복 탐색, 지식 이전 부족, 전략적 진화 부재)을 해결하는 것을 목표로 합니다. 경험 기반 학습을 통해 에이전트의 문제 해결 능력을 지속적으로 향상시키고 시행착오 기반 탐색에서 전략적 경험 기반 해결로 전환하고자 합니다.

## 핵심 방법론
이 연구는 **SWE-Exp**라는 경험 강화 접근 방식을 제안하며, 성공 및 실패한 이전 에이전트 궤적에서 간결하고 실행 가능한 경험을 추출합니다. **다면적 경험 은행**을 도입하여 상위 수준의 문제 이해부터 특정 코드 변경에 이르는 재사용 가능한 문제 해결 지식을 포착하며, **Instructor**와 **Assistant**로 구성된 **듀얼 에이전트 아키텍처**를 통해 고수준 전략 수립과 저수준 작업 실행을 분리합니다.

## 주요 결과
**SWE-bench-Verified** 벤치마크에서 **DeepSeek-V3-0324** 모델을 사용하여 **41.6% Pass@1**이라는 최신 성능을 달성했습니다. 이는 이전 최고 성능인 **SWE-Agent (38.8%) 대비 7.2%**, 그리고 직접적인 베이스라인인 **SWE-Search (35.4%) 대비 17.5%**의 상대적 개선을 의미합니다. 특히 **문제 이해 경험**이 가장 큰 성능 향상에 기여했으며, **단일 경험**을 활용할 때 최적의 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 AI 에이전트가 복잡한 소프트웨어 엔지니어링 작업에서 **과거 경험을 체계적으로 축적하고 활용**하는 것의 중요성을 강조합니다. 경험의 **양보다 질**이 중요함을 시사하며, 이는 효과적인 경험 검색 및 필터링 메커니즘 설계의 필요성을 강조합니다. **듀얼 에이전트 아키텍처**와 **다단계 지식 표현**은 자동화된 코드 수정 및 유사 도메인에서 더욱 견고하고 해석 가능한 AI 에이전트를 설계하는 데 중요한 청사진을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
