---
title: "[논문리뷰] Beyond Monolingual Assumptions: A Survey of Code-Switched NLP in the Era
  of Large Language Models"
excerpt: "arXiv에 게시된 'Beyond Monolingual Assumptions: A Survey of Code-Switched NLP in the Era
  of Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code-switching
  - Multilingual NLP
  - Large Language Models
  - NLP Survey
  - Data Augmentation
  - Evaluation Metrics
  - Low-Resource Languages

permalink: /ai/review/2025-10-9-Beyond-Monolingual-Assumptions-A-Survey-of-Code-Switched-NLP-in-the-Era-of-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07037)

**저자:** Rajvee Sheth, Samridhi Raj Sinha, Mahavir Patil, Himanshu Beniwal, Mayank Singh



## 핵심 연구 목표
이 논문은 **대규모 언어 모델(LLMs) 시대** 의 **코드-스위칭(CSW) NLP 연구 현황** 을 종합적으로 분석하고, LLMs가 CSW 모델링에 미친 영향을 평가하며, 여전히 남아있는 과제를 식별하고 미래 연구 방향을 제시하는 것을 목표로 합니다. 특히 LLMs가 혼합 언어 입력 처리, 제한된 CSW 데이터셋, 평가 편향 등에서 겪는 문제를 해결하는 데 중점을 둡니다.

## 핵심 방법론
본 조사는 **5가지 주요 CSW 연구 영역** , **12가지 핵심 NLP 태스크** , **30개 이상의 데이터셋** , 그리고 **80개 이상의 언어** 에 걸쳐 **308개의 연구** 를 검토했습니다. 연구팀은 LLMs를 **아키텍처, 훈련 전략, 평가 방법론** 별로 분류하는 견고한 분류 체계(Taxonomy)를 구축하여 최근 발전을 분석했습니다.

## 주요 결과
LLMs는 **NLG, 음성 및 멀티모달 도메인** 에서 향상된 유창성을 보였으나, **사실적 일관성** 과 **저자원 언어 성능** 에서 여전히 어려움을 겪고 있습니다. **다국어 NLU 모델** 은 의미 정확도에서 최대 **15% 감소** 를 보였고, ASR 시스템은 CSW 데이터에서 **30-50% 높은 단어 오류율** 을 나타냈습니다. **특수 모델, 명령어 튜닝, 확장 가능한 아키텍처** 에서 주목할 만한 성과가 확인되었습니다.

## AI 실무자를 위한 시사점
AI 실무자는 **포괄적인 데이터셋, 공정한 평가 프레임워크, 언어학적 기반 모델** 개발에 주력해야 합니다. 특히 **저자원 언어 및 미공개 코드-믹스 패턴** 에 대한 지원 부족을 해결하고, **생성 일관성** 을 개선하는 것이 중요합니다. **LoRA, QLoRA** 와 같은 **PEFT(Parameter-Efficient Fine-Tuning) 기법** 과 **합성 데이터 증강** 은 효율적인 LLM 적응을 위한 유망한 접근법으로 평가됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.