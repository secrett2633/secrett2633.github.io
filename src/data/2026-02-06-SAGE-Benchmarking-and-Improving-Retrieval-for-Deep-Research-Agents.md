---
title: "[논문리뷰] SAGE: Benchmarking and Improving Retrieval for Deep Research Agents"
excerpt: "Chen Zhao이 arXiv에 게시한 'SAGE: Benchmarking and Improving Retrieval for Deep Research Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Research Agents
  - Scientific Literature Retrieval
  - LLM-based Retrievers
  - Benchmarking
  - Test-time Scaling
  - Information Retrieval
  - Query Decomposition
  - RAG

permalink: /ai/review/2026-02-06-SAGE-Benchmarking-and-Improving-Retrieval-for-Deep-Research-Agents/

toc: true
toc_sticky: true

date: 2026-02-06 00:00:00+0900+0900
last_modified_at: 2026-02-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.05975)

**저자:** Tiansheng Hu, Yilun Zhao, Canyu Zhang, Arman Cohan, Chen Zhao



## 핵심 연구 목표
본 논문은 심층 연구 에이전트 워크플로우에서 **LLM 기반 검색기** 가 얼마나 효과적으로 기여할 수 있는지 체계적으로 조사하는 것을 목표로 합니다. 특히, 기존 에이전트들이 추론 집약적인 정보 검색에서 겪는 어려움을 해결하고, 이를 위해 새로운 과학 문헌 검색 벤치마크인 **SAGE** 를 도입하여 에이전트의 검색 행동을 분석합니다.

## 핵심 방법론
연구진은 1,200개의 질의와 200,000편의 논문으로 구성된 **SAGE 벤치마크** 를 구축했습니다. **GPT-5** , **Gemini-2.5 Pro** , **DR Tulu** 와 같은 6가지 심층 연구 에이전트의 성능을 웹 검색 환경에서 평가한 뒤, **DR Tulu** 를 백본 에이전트로 사용하여 **BM25** , **ReasonIR** , **gte-Qwen2-7B-instruct** 등의 검색기를 통합하여 코퍼스 검색 성능을 비교했습니다. 또한, LLM을 활용해 문서에 메타데이터와 키워드를 추가하는 **코퍼스 수준의 테스트 타임 스케일링 프레임워크** 를 제안했습니다.

## 주요 결과
모든 심층 연구 에이전트들이 추론 집약적인 검색에서 어려움을 겪었으며, 특히 **DR Tulu** 환경에서 **BM25** 가 LLM 기반 검색기보다 **단형 질문에서 약 30% 더 우수한 성능** 을 보였습니다. 이는 기존 에이전트가 생성하는 **키워드 중심의 하위 질의** 가 어휘적 일치에 강한 BM25에 더 적합했기 때문입니다. 제안된 코퍼스 수준 테스트 타임 스케일링 프레임워크는 단형 질문에서 **8%** , 개방형 질문에서 **2%** 의 성능 향상을 가져왔습니다.

## AI 실무자를 위한 시사점
현재 심층 연구 에이전트들은 정교한 추론 능력을 가졌음에도 불구하고, 생성하는 **키워드 기반의 하위 질의** 와 LLM 기반 검색기의 **의미론적 강점** 사이에 불일치가 존재하여 효과적인 통합에 어려움을 겪고 있습니다. 따라서 복잡한 연구 작업에서는 기존의 **희소 어휘 매칭 (BM25)** 방식이 최신 LLM 기반 검색기보다 더 나은 성능을 보일 수 있음을 시사합니다. LLM을 사용하여 검색 코퍼스를 **메타데이터와 키워드로 풍부하게 보강** 하는 테스트 타임 스케일링 전략은 검색 성능을 크게 향상시킬 수 있는 실용적인 방법론입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.