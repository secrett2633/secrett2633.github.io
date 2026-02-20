---
title: "[논문리뷰] DRPG (Decompose, Retrieve, Plan, Generate): An Agentic Framework for Academic Rebuttal"
excerpt: "Jiaxuan You이 arXiv에 게시한 'DRPG (Decompose, Retrieve, Plan, Generate): An Agentic Framework for Academic Rebuttal' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Academic Rebuttal
  - LLM Agents
  - Peer Review Automation
  - Generative AI
  - Retrieval-Augmented Generation (RAG)
  - Strategic Planning
  - Persuasion

permalink: /ai/review/2026-01-27-DRPG-Decompose-Retrieve-Plan-Generate-An-Agentic-Framework-for-Academic-Rebuttal/

toc: true
toc_sticky: true

date: 2026-01-27 00:00:00+0900+0900
last_modified_at: 2026-01-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.18081)

**저자:** Peixuan Han, Yingjie Yu, Jingjun Xu, Jiaxuan You



## 핵심 연구 목표
본 논문은 학술적 동료 심사 과정에서 중요한 단계인 학술 리버탈(rebuttal)에 대한 자동화된 지원이 부족하고, 기존 LLM 기반 접근 방식이 긴 컨텍스트 이해와 설득력 있는 응답 생성에 어려움을 겪는 문제를 해결하는 것을 목표로 합니다. 저자들은 이러한 한계를 극복하고 연구자들의 부담을 줄이며 고품질의 논리적이고 설득력 있는 리버탈을 자동으로 생성하는 에이전트 프레임워크를 제안합니다.

## 핵심 방법론
DRPG는 **Decomposer** , **Retriever** , **Planner** , **Executor** 의 네 단계로 이루어진 에이전트 프레임워크입니다. **Decomposer** 는 리뷰를 원자적 문제로 분해하고, **Retriever** 는 **BGE-M3 인코더** 를 활용한 **밀집 검색** 으로 논문에서 가장 관련성 높은 문단을 식별하여 긴 컨텍스트 문제를 해결합니다. 특히 **Planner** 는 아이디어 제안자가 **명료화(clarification)** 및 **정당화(justification)** 관점을 생성하고 **MLP 기반 점수 함수** 로 최적의 리버탈 전략을 선택하며, **Executor** 는 이 정보를 바탕으로 고품질의 설득력 있는 응답을 생성합니다.

## 주요 결과
DRPG는 **Qwen3-8B** , **GPT-oss-20B** , **Mixtral-8x7B** , **LLaMa3.3-70B** 등 다양한 베이스 LLM 환경에서 기존 리버탈 파이프라인보다 약 **40점 높은 Elo score** 를 달성하며 일관되게 우수한 성능을 보였습니다. 특히 **Planner** 모듈은 가장 적합한 리버탈 방향을 식별하는 데 **98% 이상의 정확도** 를 보여주었으며, **8B 모델** 만으로도 평균적인 인간 성능을 능가하는 결과를 달성했습니다. 또한 DRPG는 다중 라운드 토론 환경에서도 지속적인 성능 개선을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **LLM 에이전트** 를 활용하여 학술적 리버탈 과정을 자동화함으로써 연구자들의 워크로드를 획기적으로 줄일 수 있는 잠재력을 보여줍니다. **Decompose, Retrieve, Plan, Generate** 와 같은 구조화된 접근 방식은 LLM이 긴 컨텍스트를 효과적으로 처리하고 표적화된 설득력 있는 응답을 생성하는 데 중요하며, 이는 **RAG(Retrieval-Augmented Generation)** 및 **AI Planning** 분야의 실무 적용에 대한 중요한 통찰을 제공합니다. 또한 **8B 모델** 과 같은 비교적 작은 LLM으로도 고품질의 복잡한 작업을 수행할 수 있음을 입증하여, **자원 제약이 있는 환경** 에서의 AI 에이전트 개발 가능성을 확장합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.