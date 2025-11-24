---
title: "[논문리뷰] TalkPlay-Tools: Conversational Music Recommendation with LLM Tool
  Calling"
excerpt: "Juhan Nam이 [arXiv]에 게시한 'TalkPlay-Tools: Conversational Music Recommendation with LLM Tool
  Calling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Conversational Recommendation
  - LLM Tool Calling
  - Music Recommendation
  - Multimodal Retrieval
  - Information Retrieval
  - Retrieval-Reranking
  - Semantic IDs

permalink: /ai/review/2025-10-6-TalkPlay-Tools-Conversational-Music-Recommendation-with-LLM-Tool-Calling/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01698)

**저자:** Seungheon Doh, Keunwoo Choi, Juhan Nam



## 핵심 연구 목표
본 논문은 기존 대규모 언어 모델(LLM) 기반 추천 시스템의 제한적인 추천 행동과 단일 검색 방법론의 한계를 극복하고자 합니다. 사용자의 복잡한 의도를 해석하고 다양한 데이터 소스를 통합하여 정교한 음악 추천을 제공하는 **통합 검색-재순위화 파이프라인**을 목표로 합니다.

## 핵심 방법론
제안하는 시스템은 LLM을 **도구 호출(tool calling)** 에이전트로 활용하여 사용자 의도를 해석하고, 도구 실행 계획을 수립하며, 전문화된 컴포넌트들을 조율합니다. 활용되는 도구는 **SQL(불리언 필터링)**, **BM25(희소 검색)**, **텍스트-아이템/아이템-아이템/사용자-아이템(밀집 검색)**, 그리고 **Semantic IDs(생성형 검색)** 로 구성됩니다. 특히, **Qwen3-LM-4B**를 기반 LLM으로 사용하여 이러한 도구들을 순차적으로 호출하며, 사용자 프로필, 대화 기록, 이전 추천 정보 등을 **인컨텍스트 정보**로 활용하여 추천의 정확도를 높입니다.

## 주요 결과
본 시스템은 대화형 음악 추천 벤치마크인 **TalkPlayData 2**에서 제로샷 성능을 평가받아, **Qwen3-LM + BM25** 모델의 **0.018 Hit@1** 대비 **0.022 Hit@1**을 달성하며 우수한 성능을 보였습니다. 이는 다중 도구 통합을 통한 재순위화의 효과를 입증합니다. 초기 도구 호출 성공률은 SQL(24.7%)과 Item-to-Item(68.4%)에서 낮았지만, 재시도 메커니즘을 통해 모든 추론 단계가 성공적으로 완료되었습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM이 단순한 콘텐츠 생성자를 넘어 **다양한 검색 도구를 통합하고 조율하는 지능형 에이전트**로서 기능할 수 있음을 보여줍니다. 여러 검색 방법론(불리언, 희소, 밀집, 생성형)을 동적으로 조합함으로써 실제 서비스에서 요구되는 **복잡한 제약 조건과 사용자 의도를 만족**하는 유연하고 강력한 추천 시스템 구축에 중요한 시사점을 제공합니다. 특히, **멀티모달 데이터** 활용과 **재시도 메커니즘**을 통한 시스템의 견고성 확보는 실용적 가치가 높습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.