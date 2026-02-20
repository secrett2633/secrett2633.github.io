---
title: "[논문리뷰] AT^2PO: Agentic Turn-based Policy Optimization via Tree Search"
excerpt: "arXiv에 게시된 'AT^2PO: Agentic Turn-based Policy Optimization via Tree Search' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic RL
  - Multi-turn Tasks
  - Policy Optimization
  - Tree Search
  - Credit Assignment
  - Exploration Diversity
  - LLM Agents

permalink: /ai/review/2026-01-09-AT2PO-Agentic-Turn-based-Policy-Optimization-via-Tree-Search/

toc: true
toc_sticky: true

date: 2026-01-09 00:00:00+0900+0900
last_modified_at: 2026-01-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.04767)

**저자:** Zefang Zong, Dingwei Chen, Yang Li, Qi Yi, Bo Zhou, Chengming Li, Bo Qian, Peng Chen, Jie Jiang



## 핵심 연구 목표
본 논문은 LLM 에이전트의 다중 턴(multi-turn) 작업에서 발생하는 세 가지 핵심 문제를 해결하고자 합니다. 구체적으로, 제한된 롤아웃 예산 내에서 **탐색 다양성 부족** , 희소한 보상으로 인한 **정확한 신용 할당(credit assignment)의 어려움** , 그리고 턴 기반 상호작용 구조와 기존 **정책 최적화 목표 간의 불일치** 문제를 다룹니다.

## 핵심 방법론
제안하는 **AT2PO (Agentic Turn-based Policy Optimization via Tree Search)** 프레임워크는 세 가지 구성 요소를 통합합니다. 첫째, **Entropy-Guided Tree Expansion** 은 탐색 효율성을 극대화하기 위해 가장 불확실한 턴에서 탐색 트리를 확장합니다. 둘째, **Turn-wise Credit Assignment** 는 희소한 최종 보상을 미세 조정된 턴 단위 가치 및 이점 추정치로 전파합니다. 셋째, **Agentic Turn-based Policy Optimization (ATPO)** 는 턴 레벨에서 중요도 샘플링과 클리핑을 수행하여 정책 업데이트를 에이전트 상호작용의 자연스러운 의사결정 단위와 일치시킵니다.

## 주요 결과
AT2PO는 7가지 벤치마크(HotpotQA, TriviaQA 등)에서 기존 최첨단 베이스라인 대비 평균 **최대 1.84%p** 의 성능 향상을 달성하며 일관된 우수성을 입증했습니다. 특히 다중 홉(multi-hop) 벤치마크에서 단일 홉(single-hop) 벤치마크보다 더 큰 성능 향상을 보였는데, 이는 더 많은 상호작용 턴이 필요한 작업에서 턴 단위 설계의 이점을 나타냅니다. 또한, **AT2PO** 는 기존 방법론들이 겪는 초기 엔트로피 붕괴를 피하며 가장 안정적인 엔트로피 궤적을 유지하는 것으로 확인되었습니다.

## AI 실무자를 위한 시사점
**AT2PO** 는 **LLM 에이전트** 가 복잡한 다중 턴 추론 및 도구 사용 작업을 수행하도록 훈련하는 데 유망한 접근 방식을 제공합니다. 특히 **Entropy-Guided Tree Expansion** 을 통해 제한된 자원으로 효율적인 탐색을 가능하게 하여, **실제 에이전트 시스템** 의 **고품질 궤적 생성** 능력을 향상시킬 수 있습니다. **턴 단위 정책 최적화** 및 **보상 할당** 은 훈련 안정성과 수렴 속도를 개선하여, 복잡한 상호작용 환경에서 **강력한 에이전트** 를 개발하는 데 중요한 기여를 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.