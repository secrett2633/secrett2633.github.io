---
title: "[논문리뷰] The AI Hippocampus: How Far are We From Human Memory?"
excerpt: "Tong Wu이 [arXiv]에 게시한 'The AI Hippocampus: How Far are We From Human Memory?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Multi-Modal LLMs (MLLMs)
  - Memory Systems
  - Implicit Memory
  - Explicit Memory
  - Agentic Memory
  - Retrieval-Augmented Generation (RAG)
  - Contextual Understanding

permalink: /ai/review/2026-01-15-The-AI-Hippocampus-How-Far-are-We-From-Human-Memory/

toc: true
toc_sticky: true

date: 2026-01-15 00:00:00+0900+0900
last_modified_at: 2026-01-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.09113)

**저자:** Zixia Jia, Jiaqi Li, Yipeng Kang, Yuxuan Wang, Tong Wu, Quansen Wang, Xiaobo Wang, Shuyi Zhang, Junzhe Shen, Qing Li, Siyuan Qi, Yitao Liang, Di He, Zilong Zheng, Song-Chun Zhu



## 핵심 연구 목표
본 논문은 최신 **Large Language Models (LLMs)** 및 **Multi-Modal LLMs (MLLMs)** 의 추론, 적응성, 맥락적 충실도 향상을 위해 메모리 메커니즘을 통합하는 문제를 다룹니다. 특히, **인간의 기억 시스템** 에 비유하여 **내재적(implicit), 외재적(explicit), 행위자(agentic) 메모리 패러다임** 을 체계적으로 분류하고 분석하여, 실제 지능형 시스템의 요구사항에 부합하는 메모리 증강 AI 시스템 개발을 위한 포괄적인 관점을 제공하는 것을 목표로 합니다.

## 핵심 방법론
이 설문조사는 기억을 **내재적 메모리(Implicit Memory)** , **외재적 메모리(Explicit Memory)** , **행위자 메모리(Agentic Memory)** 의 세 가지 주요 프레임워크로 분류합니다. 내재적 메모리는 **Transformer의 내부 매개변수** 에 인코딩된 지식(예: **FFN, Self-Attention** )을 분석하고, **메모리 수정 기법(incremental training, memory editing, memory unlearning)** 을 다룹니다. 외재적 메모리는 **외부 저장소와 검색 컴포넌트** 를 활용하며, **자유 텍스트, 그래프, 벡터** 와 같은 다양한 표현 방식을 소개하고, **RAG 기반 사전 훈련/미세 조정** 및 **지식 주입** 방식을 설명합니다. 행위자 메모리는 **자율 에이전트의 지속적인 상호작용** 을 위한 단일/다중 에이전트 메모리 시스템을 포괄하며, 궁극적으로 멀티모달 환경에서의 메모리 통합을 탐구합니다.

## 주요 결과
본 연구는 메모리 메커니즘의 통합이 LLM 성능에 미치는 영향을 **Llama3-8B-IT** 및 **GPT-4o-mini** 모델을 활용하여 정량적으로 평가했습니다. 예를 들어, **Llama3-8B-IT** 에서는 **LlamaIndex** 가 **0.646** 의 전체 정확도를 달성했으며, **GPT-4o-mini** 에서는 **LlamaIndex** 가 **0.667** 의 전체 정확도로 가장 우수한 성능을 보였습니다. 그러나 **Mem0** 와 같은 일부 복잡한 프레임워크는 데이터 처리 시간이 **2110.95초** 로 매우 길었음에도 불구하고 성능 향상이 비례하지 않음을 보여주며, 복잡한 프레임워크가 항상 단순한 프레임워크보다 우수하지는 않음을 시사합니다.

## AI 실무자를 위한 시사점
이 설문조사는 AI 실무자들에게 LLM 및 MLLM의 메모리 통합에 대한 심층적인 이해를 제공합니다. **RAG (Retrieval-Augmented Generation)** 와 같은 외재적 메모리 시스템은 모델의 최신 정보 접근성과 일반화 능력을 크게 향상시키지만, **long context 처리의 효율성** 과 **메모리 오버로드** 는 여전히 중요한 해결 과제입니다. 실무자들은 애플리케이션의 특정 요구사항과 사용 가능한 **데이터셋의 규모** 를 고려하여 **implicit, explicit, agentic 메모리 패러다임** 중 가장 적합한 접근 방식을 신중하게 선택하고, **멀티모달 환경의 복잡성** 을 관리하기 위한 유연한 아키텍처 설계에 집중해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.