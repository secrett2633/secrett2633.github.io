---
title: "[논문리뷰] Self-EvolveRec: Self-Evolving Recommender Systems with LLM-based Directional Feedback"
excerpt: "Jimin Seo이 arXiv에 게시한 'Self-EvolveRec: Self-Evolving Recommender Systems with LLM-based Directional Feedback' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Recommender System
  - LLM-based Code Evolution
  - Directional Feedback
  - User Simulator
  - Model Diagnosis Tool
  - Agentic AI
  - AutoML

permalink: /ai/review/2026-02-16-Self-EvolveRec-Self-Evolving-Recommender-Systems-with-LLM-based-Directional-Feedback/

toc: true
toc_sticky: true

date: 2026-02-16 00:00:00+0900+0900
last_modified_at: 2026-02-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12612)

**저자:** Jimin Seo, Wonjoong Kim, Hongseok Kang, Sangwu Park, Sein Kim, Kanghoon Yoon, Chanyoung Park



## 핵심 연구 목표
기존 추천 시스템 코드 진화 프레임워크들이 스칼라 지표(NDCG, Hit Ratio)에만 의존하여 진단적 통찰력을 제공하지 못하고, 고정된 검색 공간에 갇혀 혁신을 제한한다는 문제를 해결하고자 합니다. 본 논문은 복잡한 추천 시스템의 실패 원인을 정확히 파악하고 방향성 있는 개선을 이끌어내기 위한 **LLM 기반의 방향성 피드백 루프** 구축을 목표로 합니다.

## 핵심 방법론
본 논문은 **Self-EvolveRec** 이라는 새로운 프레임워크를 제안합니다. 이는 사용자의 질적 비판을 제공하는 **User Simulator** 와 모델의 구조적/행동적 결함을 정량적으로 검증하는 **Model Diagnosis Tool** 을 통합하여 방향성 피드백 루프를 구축합니다. 특히, **Diagnosis Tool - Model Co-Evolution 전략** 을 도입하여 추천 아키텍처의 진화에 따라 진단 기준이 동적으로 적응하도록 하여 피드백의 신뢰성을 유지합니다.

## 주요 결과
**Self-EvolveRec** 은 기존 NAS 및 LLM 기반 코드 진화 베이스라인(AlphaEvolve, DeepEvolve)보다 모든 데이터셋에서 **추천 성능** 과 **사용자 만족도** 면에서 우수함을 입증했습니다. 예를 들어, CDs SASRec 데이터셋에서 **NDCG@5 0.3865** , **HR@5 0.5274** 를 달성했으며, 사용자 만족도 지표 중 **Personalization** 에서 베이스라인 대비 **+50%** 향상을 보였습니다. 이는 방향성 피드백이 정량적 성능뿐 아니라 코드의 **창의성, 설명 가능성, 문제 해결 통찰력** 등 질적 측면에서도 크게 기여함을 보여줍니다.

## AI 실무자를 위한 시사점
AI/ML 실무자는 **Self-EvolveRec** 을 통해 스칼라 지표가 놓치기 쉬운 **인기도 편향, 다양성 부족** 과 같은 추천 시스템의 근본적인 문제들을 질적/양적 피드백을 통해 명확히 진단하고 해결할 수 있습니다. 또한, **Diagnosis Tool - Model Co-Evolution** 은 시스템 구조가 변화하더라도 진단 로직이 자동으로 업데이트되어, 복잡하고 진화하는 추천 시스템 환경에서 **신뢰성 있는 자동화된 개선 프로세스** 를 가능하게 합니다. 이는 개발 시간 단축 및 사용자 만족도 향상에 크게 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.