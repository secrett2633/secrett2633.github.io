---
title: "[논문리뷰] ReSum: Unlocking Long-Horizon Search Intelligence via Context
  Summarization"
excerpt: "Litu Ou이 [arXiv]에 게시한 'ReSum: Unlocking Long-Horizon Search Intelligence via Context
  Summarization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Context Management
  - Summarization
  - ReAct
  - Reinforcement Learning
  - Web Search
  - Long-Horizon Reasoning

permalink: /ai/review/2025-9-17-ReSum_Unlocking_Long-Horizon_Search_Intelligence_via_Context_Summarization/

toc: true
toc_sticky: true

date: 2025-09-17 13:16:01+0900
last_modified_at: 2025-09-17 13:16:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13313)

**저자:** Xixi Wu, Kuan Li, Yida Zhao, Liwen Zhang, Litu Ou, et al.



## 핵심 연구 목표
이 논문은 `대규모 언어 모델(LLM)` 기반 에이전트가 `장기 웹 탐색` 작업을 수행할 때 `컨텍스트 윈도우`의 제한으로 인해 충분한 탐색이 불가능한 문제를 해결하고자 합니다. `ReAct` 패러다임에서 대화 기록이 빠르게 컨텍스트 한도를 초과하여 작업이 중단되는 것을 방지하고, 무한한 탐색을 가능하게 하는 새로운 패러다임을 제안하는 것을 목표로 합니다.

## 핵심 방법론
논문은 대화 기록을 주기적으로 요약하여 `컴팩트한 추론 상태`로 변환하는 **ReSum** 패러다임을 제안합니다. 이를 위해 `목표 지향적 대화 요약`에 특화된 **ReSumTool-30B**라는 요약 모델을 개발했으며, 이는 **Qwen3-30B-A3B-Thinking**을 `미세 조정`하여 핵심 증거 추출 및 정보 부족 식별 능력을 강화했습니다. 에이전트가 **ReSum** 패러다임에 효과적으로 적응하도록 **ReSum-GRPO** `강화 학습` 알고리즘을 사용하며, 이는 요약 시점에 긴 궤적을 여러 `훈련 에피소드`로 분할하여 학습합니다.

## 주요 결과
`ReSum` 패러다임은 `훈련 없는 설정`에서 `ReAct` 대비 평균 **4.5%**의 성능 향상을 보였으며, **ReSum-GRPO 훈련** 후에는 추가로 **8.2%** 성능이 개선되었습니다. 특히, **ReSumTool-30B**를 장착한 **WebSailor-30B**는 `BrowseComp-en` 벤치마크에서 **16.0% Pass@1**을 달성하여 `Claude-4-Sonnet` (**12.2%**) 및 `Kimi-K2` (**14.1%**)와 같은 선도적인 모델들을 능가했습니다. 이러한 성능 향상은 `수용 가능한 리소스 비용` (원래 비용의 약 **2배**) 내에서 이루어졌음을 확인했습니다.

## AI 실무자를 위한 시사점
`LLM 기반 에이전트`의 `장기 추론` 및 `탐색` 능력을 향상시키는 실용적이고 효과적인 방법론을 제시하여 복잡한 웹 작업 해결의 가능성을 넓혔습니다. **ReSum**은 기존 `ReAct` 에이전트에 `최소한의 아키텍처 변경`으로 `플러그 앤 플레이` 방식으로 통합될 수 있어, 기존 시스템에 쉽게 적용 가능합니다. 또한, 특정 작업에 특화된 `요약 모델` 개발과 `강화 학습`을 통한 에이전트의 `자율 적응`은 `컨텍스트 관리` 효율성을 높이는 중요한 전략으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.