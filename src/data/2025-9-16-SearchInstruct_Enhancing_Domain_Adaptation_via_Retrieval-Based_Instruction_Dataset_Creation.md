---
title: "[논문리뷰] SearchInstruct: Enhancing Domain Adaptation via Retrieval-Based
  Instruction Dataset Creation"
excerpt: "Heshaam Faili이 [arXiv]에 게시한 'SearchInstruct: Enhancing Domain Adaptation via Retrieval-Based
  Instruction Dataset Creation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - Instruction Tuning
  - Domain Adaptation
  - Retrieval-Augmented Generation
  - Dataset Creation
  - Model Editing
  - Supervised Fine-Tuning

permalink: /ai/review/2025-9-16-SearchInstruct_Enhancing_Domain_Adaptation_via_Retrieval-Based_Instruction_Dataset_Creation/

toc: true
toc_sticky: true

date: 2025-09-16 13:16:41+0900
last_modified_at: 2025-09-16 13:16:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.10708)

**저자:** Iman Barati, Mostafa Amiri, Heshaam Faili



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLM)의 특정 도메인 적응을 위한 **고품질 SFT(Supervised Fine-Tuning) 데이터셋 생성**의 어려움을 해결하는 것을 목표로 합니다. 특히, 기존 LLM의 **내부 지식 부족**과 **데이터 희소성**으로 인해 전문 도메인에서 정확하고 다양하며 실세계 사용자 질의에 부합하는 데이터셋을 구축하는 문제를 다룹니다.

## 핵심 방법론
제안된 **SearchInstruct** 프레임워크는 네 단계 파이프라인을 통해 작동합니다. 첫째, 소수의 수동 생성 **시드 질문**을 **LLM 기반 확장**으로 다양화합니다. 둘째, 각 확장된 질문에 대해 **도메인 관련 문서**를 **동적으로 검색**하며, 이 과정에서 **LLM 기반 질의 재작성**을 통해 검색 효율성을 높입니다. 셋째, 검색된 증거를 바탕으로 **LLM**이 **정확하고 문맥에 맞는 답변**을 생성하며, **LLM 기반 청크 필터링** 또는 **규칙 기반 필터링**으로 불필요한 콘텐츠를 제거합니다.

## 주요 결과
**이란 문화 도메인**(전통 요리 및 국내 관광)에 대한 인간 평가 결과, **SearchInstruct**로 학습된 모델은 기존 모델 대비 **60% 이상의 성능 향상**을 보였습니다. 특히 **Matina 8B** 모델은 관광 도메인에서 **68%**, 요리 도메인에서 **65%**의 승률을 기록했습니다. 또한, **Gemma 27B** 모델의 지식 업데이트 시 **MMLU 벤치마크**에서 평균 **1.99%**의 미미한 성능 감소를 보여, 일반 지식 손상 없이 특정 지식 업데이트가 가능함을 입증했습니다.

## AI 실무자를 위한 시사점
**SearchInstruct**는 AI 실무자들이 **데이터가 부족한 전문 도메인**에서 **고품질 SFT 데이터셋을 효율적으로 구축**할 수 있는 실용적인 방법을 제공합니다. 특히 **LLM의 오래된 지식을 최신 정보로 업데이트**하거나, **특정 지식 영역에 모델을 적응**시켜야 하는 경우에 유용합니다. 이는 **수동 주석 작업의 부담**을 줄이고, 동적으로 변화하는 지식에 **LLM이 적응**할 수 있도록 돕는 강력한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.