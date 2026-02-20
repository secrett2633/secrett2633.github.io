---
title: "[논문리뷰] InteractComp: Evaluating Search Agents With Ambiguous Queries"
excerpt: "Yani Fan이 arXiv에 게시한 'InteractComp: Evaluating Search Agents With Ambiguous Queries' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Search Agents
  - Interactive AI
  - Ambiguous Queries
  - Benchmarking
  - Language Agents
  - Information Retrieval
  - Overconfidence
  - Reinforcement Learning

permalink: /ai/review/2025-10-29-InteractComp-Evaluating-Search-Agents-With-Ambiguous-Queries/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24668)

**저자:** Mingyi Deng, Lijun Huang, Yani Fan, Jiayi Zhang, Fashen Ren, Jinyi Bai, Fuzhen Yang, Dayi Miao, Zhaoyang Yu, Yifan Wu, Yanfei Zhang, Fengwei Teng, Yingjia Wan, Song Hu, Yude Li, Xin Jin, Conghao Hu, Haoyu Li, Qirui Fu, Tai Zhong, Xinyu Wang, Xiangru Tang, Nan Tang, Chenglin Wu, Yuyu Luo



## 핵심 연구 목표
본 논문은 기존 검색 에이전트들이 사용자 질의를 완전하고 명확하다고 가정하지만, 실제 사용자들은 종종 불완전하고 모호한 질의로 시작하여 상호작용을 통한 명확화가 필요하다는 문제점을 제기합니다. 따라서, 에이전트가 질의 모호성을 인식하고 능동적으로 상호작용하여 이를 해결하는 능력을 평가하기 위한 벤치마크인 **INTERACTCOMP** 를 도입하는 것을 목표로 합니다.

## 핵심 방법론
**INTERACTCOMP** 벤치마크는 **easy to verify, interact to disambiguate** 원칙에 따라 9개 도메인에 걸쳐 **210개의 전문가가 큐레이션한 질문** 으로 구성됩니다. 이 벤치마크는 **target-distractor 방법론** 을 사용하여 순수한 검색만으로는 해결할 수 없는 진정한 모호성을 생성하며, 에이전트는 **search** , **ask** , **answer** 의 세 가지 액션을 통해 시뮬레이션된 사용자와 상호작용합니다. 평가에는 **Answer-only** , **Answer+Search** , **Answer+Search+Interact** 모드가 사용되었고, **강제 상호작용(forced interaction)** 실험과 **종단 연구(longitudinal analysis)** 도 진행되었습니다.

## 주요 결과
평가 결과, **17개 모델** 중 최상위 모델인 **GPT-5** 가 완전한 컨텍스트가 제공될 때는 **71.50%** 의 정확도를 달성했지만, 상호작용 설정에서는 **13.73%** 에 불과하여 **5배 이상의 성능 차이** 를 보였습니다. 이는 에이전트의 **시스템적 과신(systematic overconfidence)** 이 문제의 핵심임을 시사하며, **강제 상호작용** 시 정확도가 크게 향상됨(예: **GPT-5** 는 **20%에서 40%** 로 두 배 증가)으로써 잠재된 상호작용 능력이 있음을 확인했습니다. 또한, **15개월 간의 종단 연구** 에서 **BrowseComp** 성능이 **7배 향상** 된 반면, **INTERACTCOMP** 성능은 **6-14%** 수준에서 정체되어 상호작용 능력이 개발의 사각지대임을 보여줍니다.

## AI 실무자를 위한 시사점
현재 AI 검색 에이전트들은 복잡한 정보 검색 및 추론 능력을 갖추고 있지만, **사용자와의 능동적 상호작용** 을 통해 모호한 질의를 명확히 하는 데 취약합니다. 이는 에이전트의 **시스템적 과신** 에 기인하며, 이러한 한계는 현실 세계의 불완전한 사용자 질의를 처리하는 데 큰 장애물입니다. **INTERACTCOMP** 는 이러한 상호작용 능력을 평가하고, 특히 **강화 학습** 과 같은 접근 방식을 통해 에이전트가 불확실성을 인식하고 보다 효과적인 상호작용 전략을 개발할 수 있는 **명확한 보상 신호** 를 제공하는 중요한 도구입니다. 이 벤치마크는 AI 에이전트 개발에서 간과되었던 상호작용이라는 핵심 역량을 발전시키는 데 필수적인 기반을 제공할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.