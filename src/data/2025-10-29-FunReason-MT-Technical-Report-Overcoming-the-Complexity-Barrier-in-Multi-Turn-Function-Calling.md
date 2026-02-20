---
title: "[논문리뷰] FunReason-MT Technical Report: Overcoming the Complexity Barrier in
  Multi-Turn Function Calling"
excerpt: "arXiv에 게시된 'FunReason-MT Technical Report: Overcoming the Complexity Barrier in
  Multi-Turn Function Calling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Function Calling
  - Multi-Turn Interaction
  - Large Language Models (LLMs)
  - Data Synthesis
  - Agentic AI
  - Tool Use
  - Chain-of-Thought (CoT)
  - Reinforcement Learning

permalink: /ai/review/2025-10-29-FunReason-MT-Technical-Report-Overcoming-the-Complexity-Barrier-in-Multi-Turn-Function-Calling/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24645)

**저자:** Zengzhuang Xu, Bingguang Hao, Zechuan Wang, Yuntao Wen, Maolin Wang, Yang Liu, Long Chen, Dong Wang, Yicheng Chen, Cunyin Peng, Chenyi Zhuang, Jinjie Gu, Leilei Gan, Xiangyu Zhao, Shi Gu



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 복잡한 **멀티턴 함수 호출(Multi-Turn Function Calling)** 능력 개발을 위한 고품질 학습 데이터 생성의 어려움을 해결하고자 합니다. 기존 데이터 합성 방법론의 한계로 인해 발생하는 데이터의 낮은 품질, 다양성 부족, 그리고 복잡성 결여 문제를 극복하여, 실제 환경에서 LLM이 도구를 효과적으로 활용할 수 있도록 지원하는 것을 목표로 합니다.

## 핵심 방법론
**FunReason-MT** 는 세 가지 핵심 구성 요소를 통해 멀티턴 함수 호출 데이터의 복잡성 장벽을 해결합니다. 첫째, **Environment-API Graph Interactions** 는 도구 간의 상호 의존성을 모델링하는 **API 그래프** 를 기반으로 다양한 고품질 실행 궤적을 수집합니다. 둘째, **Advanced Tool-Query Synthesis** 는 실행 궤적을 추상화하여 **고급 도구(Tadv)** 를 합성하고, 이를 기반으로 **논리적 도약** 이 필요한 **어려운 쿼리(Qhard)** 를 생성합니다. 셋째, **Guided Iterative Chain** 은 **Critiquing Agent** 와 **Reasoning Agent** 를 활용한 반복적인 **자기 수정 루프** 를 통해 **CoT(Chain-of-Thought)** 의 논리적 일관성과 정확성을 보장합니다.

## 주요 결과
**Berkeley Function-Calling Leaderboard (BFCLv3)** 평가에서, **FunReason-MT** 로 생성된 데이터로 학습된 **4B 모델** 은 멀티턴 점수 **56.50%** 를 달성하며 비교 가능한 크기의 모델 중 **최첨단 성능** 을 보였습니다. 이는 강력한 오픈소스 모델(예: **Kimi-K2-Inst, DeepSeek-R1** )과 주요 클로즈드소스 모델(예: **GPT-5, Claude-Sonnet-4** )을 능가하는 결과입니다. 또한 **BFCLv4 (OOD 벤치마크)** 에서도 전체 점수 **15.10%** 를 기록하며 강력한 **에이전틱(Agentic) 능력** 일반화 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**FunReason-MT** 는 복잡한 멀티턴 함수 호출을 위한 고품질 데이터 생성의 새로운 패러다임을 제시하며, 이는 **고급 에이전틱 LLM** 개발에 필수적입니다. 이 프레임워크는 수동 데이터 구축의 부담을 줄이고, 상대적으로 작은 모델에서도 강력한 도구 활용 능력을 부여할 수 있음을 보여줍니다. 특히, **API 그래프 기반 상호작용** 과 **가이드된 반복 체인** 같은 방법론은 다양한 AI 시스템에서 **도구 사용 능력** 을 효과적으로 학습시키는 데 응용될 수 있으며, **OOD 일반화 능력** 은 실제 세계의 동적 환경에서 AI 에이전트의 견고한 성능을 보장하는 데 중요한 기여를 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.