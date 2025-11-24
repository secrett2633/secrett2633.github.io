---
title: "[논문리뷰] ST-Raptor: LLM-Powered Semi-Structured Table Question Answering"
excerpt: "Wei Zhou이 [arXiv]에 게시한 'ST-Raptor: LLM-Powered Semi-Structured Table Question Answering' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Semi-structured Tables
  - Question Answering
  - LLMs
  - Hierarchical Orthogonal Tree
  - Table Layout Understanding
  - Pipeline Generation
  - Verification Mechanism

permalink: /ai/review/2025-8-26-ST-Raptor-LLM-Powered-Semi-Structured-Table-Question-Answering/

toc: true
toc_sticky: true

date: 2025-08-26 13:21:57+0900
last_modified_at: 2025-08-26 13:21:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18190)

**저자:** Zirui Tang, Boxiu Li, Guoliang Li, Boyu Niu, Wei Zhou, Xinyi Zhang, Xuanhe Zhou, Jiannan Wang, Fan Wu



## 핵심 연구 목표
본 논문은 금융 보고서나 의료 기록과 같이 유연하고 복잡한 레이아웃(계층적 헤더, 병합된 셀 등)을 가진 **반정형 테이블(semi-structured table)**에 대한 질의응답(QA) 문제를 해결하는 것을 목표로 합니다. 기존 NL2SQL 및 멀티모달 LLM QA 방법론이 정보 손실이나 복잡한 레이아웃 이해 부족으로 인해 정확도가 낮은 한계를 극복하고자 합니다.

## 핵심 방법론
ST-Raptor는 대규모 언어 모델(LLM)을 활용한 트리 기반 프레임워크를 제안합니다. 복잡한 테이블 레이아웃을 포착하는 **계층적 직교 트리(HO-Tree)** 구조 모델과 이를 구축하는 효과적인 알고리즘을 도입하고, LLM이 일반적인 QA 작업을 실행하도록 안내하는 **기본 트리 연산** 세트를 정의합니다. 사용자 질문을 하위 질문으로 분해하고, 해당 **트리 연산 파이프라인**을 생성하며, 정확한 실행을 위해 **연산-테이블 정렬(operation-table alignment)**을 수행합니다. 또한, 실행 단계의 정확성을 확인하는 **전방 검증(forward validation)**과 답변 신뢰도를 평가하는 **후방 검증(backward validation)**을 포함한 **2단계 검증 메커니즘**을 통합합니다.

## 주요 결과
ST-Raptor는 102개의 실제 반정형 테이블과 764개의 질문으로 구성된 **SSTQA**라는 새로운 데이터셋을 구축했습니다. 실험 결과, ST-Raptor는 9가지 기준선 대비 **최대 20%** 높은 답변 정확도를 달성했습니다. 특히, SSTQA 벤치마크에서 **72.39%**의 정확도로 두 번째로 우수한 방법론보다 **10.23%** 높은 성능을 보였으며, 복잡도가 높은 "hard" 케이스에서도 **58.43%**의 정확도로 뛰어난 성능을 입증했습니다.

## AI 실무자를 위한 시사점
ST-Raptor는 실제 AI/ML 애플리케이션에서 흔히 접하는 복잡한 반정형 테이블 데이터 처리의 효율성과 정확성을 크게 향상시킬 수 있는 실용적인 솔루션을 제시합니다. **HO-Tree**를 통한 구조화된 데이터 표현과 **파이프라인 기반 질의응답** 방식은 LLM의 환각(hallucination)을 줄이고 추론 과정을 투명하게 만들어 신뢰도를 높입니다. 이는 금융, 의료, 전자상거래 등 다양한 분야에서 **데이터 분석 및 의사결정 자동화**에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.