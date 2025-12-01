---
title: "[논문리뷰] RAGCap-Bench: Benchmarking Capabilities of LLMs in Agentic Retrieval
  Augmented Generation Systems"
excerpt: "이 [arXiv]에 게시한 'RAGCap-Bench: Benchmarking Capabilities of LLMs in Agentic Retrieval
  Augmented Generation Systems' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Retrieval Augmented Generation
  - Agentic Systems
  - Benchmarking
  - Intermediate Tasks
  - Error Analysis
  - LLM Evaluation

permalink: /ai/review/2025-10-17-RAGCap-Bench-Benchmarking-Capabilities-of-LLMs-in-Agentic-Retrieval-Augmented-Generation-Systems/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13910)

**저자:** Jingru Lin, Chen Zhang, Stephen Y. Liu, Haizhou Li



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM) 기반 에이전트형 검색 증강 생성(RAG) 시스템의 한계, 특히 복잡한 다단계 질문 처리 능력 및 중간 추론 능력 부족 문제를 해결하고자 합니다. 기존의 종단 간 QA 기반 평가를 넘어, 에이전트형 RAG 워크플로우 내의 **중간 작업** 에 대한 **미세 조정된 역량 지향적 평가 벤치마크** 인 **RAGCap-Bench** 를 제안하여, 모델 개선이 필요한 특정 기능을 식별하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 최신 오픈 소스 에이전트형 RAG 시스템의 출력을 분석하여 일반적인 중간 작업과 필수 역량을 식별했습니다. 이를 바탕으로 **계획(Planning)** , **증거 추출(Evidence Extraction)** , **근거 있는 추론(Grounded Reasoning)** , **노이즈 강건성(Noise Robustness)** 의 네 가지 작업 유형에 대한 **객관식 질문(MCQ)** 을 설계했습니다. 벤치마크 데이터셋은 **바닐라 생성(Vanilla Generation)** 및 **오류 유도 생성(Error-Guided Generation)** 전략을 활용하여 구성되었으며, **Exact Match (EM)** 와 **F1 점수** 로 평가되었습니다.

## 주요 결과
RAGCap-Bench에서의 LLM 성능은 복잡한 에이전트형 RAG 워크플로우의 **종단 간 성능과 강력한 상관관계** 를 보였습니다(모든 상관관계 점수는 통계적으로 유의미함, p<0.05). 특히, **노이즈 강건성(Noise Robustness)** 항목에서 **Qwen3-8B** 가 우수한 성능을 보였으나, 많은 LLM들이 신뢰도 낮은 정보에 대한 **선별 능력에서 취약점** 을 드러냈습니다(일부 모델 EM 점수 10% 수준). **정보가 풍부한 프롬프트** 를 사용했을 때 LLM 성능이 향상됨이 확인되어, 구조화된 지침의 중요성을 입증했습니다.

## AI 실무자를 위한 시사점
이 벤치마크는 에이전트형 RAG 시스템 개발에서 **중간 단계의 LLM 역량** (예: 계획, 증거 추출, 추론, 노이즈 처리)이 최종 성능에 미치는 중요성을 강조합니다. 특히 **노이즈가 많은 웹 환경** 에서 **신뢰할 수 없는 정보원을 감지** 하고 **정확한 증거를 추출** 하는 능력의 개선이 시급함을 시사합니다. **오류 유도 프롬프트** 의 효과는 에이전트형 RAG 시스템 구축 시 **집중적인 프롬프트 엔지니어링** 이나 **후처리 기술** 의 필요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.