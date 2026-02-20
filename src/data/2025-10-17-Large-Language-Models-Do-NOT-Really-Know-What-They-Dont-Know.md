---
title: "[논문리뷰] Large Language Models Do NOT Really Know What They Don't Know"
excerpt: "arXiv에 게시된 'Large Language Models Do NOT Really Know What They Don't Know' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLMs
  - Hallucination Detection
  - Mechanistic Interpretability
  - Internal States
  - Knowledge Recall
  - Refusal Tuning
  - Factual Associations
  - Associated Hallucinations

permalink: /ai/review/2025-10-17-Large-Language-Models-Do-NOT-Really-Know-What-They-Dont-Know/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.09033)

**저자:** Chi Seng Cheang, Hou Pong Chan, Wenxuan Zhang, Yang Deng



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)이 사실적 오류를 생성할 때 내부적으로 어떻게 처리하는지 기계적으로 분석하여, LLMs가 진정으로 "무엇을 모르는지 아는지" 여부를 밝히는 것을 목표로 합니다. 특히, 사실에 기반한 출력과 내용적으로 관련된 환각(associated hallucinations, AH)이 모델 내부에서 어떻게 처리되는지 규명하고자 합니다.

## 핵심 방법론
LLMs의 내부 상태를 분석하기 위해 **Factual Associations (FA)** , **Associated Hallucinations (AH)** , **Unassociated Hallucinations (UH)** 의 세 가지 지식 범주를 정의하고 비교했습니다. **인과적 개입 분석(JS divergence)** 을 통해 지식 검색에 중요한 은닉 상태를 식별했으며, **주제 표현(L2 norm, subspace overlap)** , **어텐션 흐름(attention contribution norms)** 및 **마지막 토큰 표현(cosine similarity, t-SNE, 출력 엔트로피)** 을 분석했습니다. 실험은 **LLaMA-3-8B** 및 **Mistral-7B-v0.3** 모델로 진행되었습니다.

## 주요 결과
분석 결과, **AH** 는 **FA** 와 유사한 내부 지식 검색 프로세스를 사용하며 은닉 상태 지오메트리에서 중첩되어 구별이 어렵다는 것이 밝혀졌습니다. 반면, **UH** 는 주제 지식과 무관하게 생성되어 명확히 구별되는 표현을 보였습니다. 기존 환각 감지 방법은 **UH** 에는 효과적이었으나 (예: **LLaMA-3-8B** 에서 **마지막 토큰 프로브 AUROC 0.93** ), **AH** 에서는 성능이 크게 저하되었습니다 (예: **0.69** ).

## AI 실무자를 위한 시사점
본 연구는 LLM의 내부 상태만으로는 입력과 관련성 있는 환각(AH)을 신뢰성 있게 감지하기 어렵다는 근본적인 한계를 제시합니다. 따라서 **환각 감지 시스템** 개발 시 **AH와 UH** 를 구분하여 접근해야 하며, **외부 Fact-checking 모듈** 이나 **검색 기반 검증기(retrieval-based verifier)** 와 같은 외부 피드백 메커니즘 통합이 필수적입니다. 또한, 모델의 "모른다"는 인식이 주로 지식 패턴 인식에 기반하므로, 사용자 신뢰를 높이기 위해 **AH 감지 개선** 에 대한 연구가 우선시되어야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.