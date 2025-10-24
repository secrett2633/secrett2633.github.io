---
title: "[논문리뷰] Search Self-play: Pushing the Frontier of Agent Capability without
  Supervision"
excerpt: "이 [arXiv]에 게시한 'Search Self-play: Pushing the Frontier of Agent Capability without
  Supervision' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Self-play
  - Reinforcement Learning
  - Search Agents
  - Supervision-Free Training
  - Retrieval-Augmented Generation (RAG)
  - Task Generation
  - Curriculum Learning

permalink: /ai/review/2025-10-24-Search_Self-play_Pushing_the_Frontier_of_Agent_Capability_without_Supervision/

toc: true
toc_sticky: true

date: 2025-10-24 13:04:16+0900
last_modified_at: 2025-10-24 13:04:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.18821)

**저자:** Hongliang Lu, Yuhang Wen, Pengyu Cheng, Ruijin Ding, Haotian Xu, Jiaqi Guo, Chutian Wang, Haonan Chen, Xiaoxi Jiang, Guanjun Jiang



## 핵심 연구 목표
본 논문은 LLM 에이전트 훈련의 주요 병목인 대규모 인간 주석 데이터 의존성 문제를 해결하고자 합니다. 특히, 에이전트 시나리오에서 확장성과 효율적인 RL 훈련을 저해하는 **잘 정제된 질문-답변 쌍**의 부족 문제를 극복하고, 외부 감독 없이 에이전트 역량을 지속적으로 향상시키는 **확장 가능한 자율 훈련 패러다임**을 제시하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Search Self-play (SSP)**라는 새로운 RL 방법론을 제안합니다. 이 프레임워크에서 **LLM 에이전트**는 **질문 제안자(proposer)**와 **문제 해결자(solver)**의 두 가지 역할을 동시에 수행합니다. **질문 제안자**는 **다중 턴 검색 엔진 호출**을 통해 점진적으로 난이도가 높아지는 검증 가능한 심층 검색 질문을 생성하며, **문제 해결자**는 이 질문에 답변합니다. 생성된 질문의 정확성은 **제안자의 검색 결과**를 **외부 지식(external knowledge)**으로 활용하여 **Retrieval-Augmented Generation (RAG) 기반 검증**을 통해 확인됩니다. **제안자**는 **REINFORCE**로, **해결자**는 **GRPO**로 학습되며, **리플레이 버퍼(Replay Buffer, Periodic Reset)** 전략을 사용하여 데이터 재사용과 참신성 균형을 맞춥니다.

## 주요 결과
**SSP**는 다양한 벤치마크에서 여러 LLM 모델의 성능을 일관되게 크게 향상시켰습니다. 예를 들어, **Qwen2.5-7B-Base 모델**의 경우 평균 **26.4점**이 향상되었으며, **TriviaQA**에서는 무려 **+40.4점**이라는 놀라운 성능 향상을 보였습니다. **Qwen2.5-7B-Instruct**와 같은 명령-튜닝 모델에서도 평균 **8.0점** 개선을 달성하여, SSP의 모델 불가지론적 특성을 입증했습니다. **RAG 검증** 및 **노이즈 문서 주입**이 질문 품질 유지에 결정적임을 확인했으며, 특히 **4개의 노이즈 문서**를 사용하는 설정에서 **GeneralQA 60.0, Multi-HopQA 41.6**으로 가장 좋은 성능을 보였습니다.

## AI 실무자를 위한 시사점
**SSP**는 **대규모 LLM 에이전트 훈련**에 대한 **확장 가능하고 데이터 효율적인 접근 방식**을 제시하며, **인간의 개입 없이** 에이전트가 스스로 **복잡한 검색 및 추론 능력**을 향상시킬 수 있음을 보여줍니다. 이는 **AI/ML 엔지니어**가 **툴 사용(tool use)** 및 **다중 턴 상호작용**이 필요한 에이전트를 구축할 때 **수동 데이터 주석의 부담**을 크게 줄이고 **자율적인 학습 과정**을 설계하는 데 실질적인 가이드라인을 제공합니다. 특히 **RAG 기반의 자가 검증 메커니즘**은 에이전트가 생성하는 태스크의 품질을 보장하여 학습의 안정성을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.