---
title: "[논문리뷰] RefusalBench: Generative Evaluation of Selective Refusal in Grounded
  Language Models"
excerpt: "이 [arXiv]에 게시한 'RefusalBench: Generative Evaluation of Selective Refusal in Grounded
  Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - RAG Systems
  - Selective Refusal
  - Generative Evaluation
  - Linguistic Perturbations
  - LLM Evaluation
  - Informational Uncertainty
  - Model Calibration
  - AI Safety

permalink: /ai/review/2025-10-17-RefusalBench-Generative-Evaluation-of-Selective-Refusal-in-Grounded-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.10390)

**저자:** Aashiq Muhamed, Leonardo F. R. Ribeiro, Markus Dreyer, Virginia Smith, Mona T. Diab



## 핵심 연구 목표
이 논문은 **RAG(Retrieval-Augmented Generation) 시스템**에서 언어 모델이 **불충분하거나 신뢰할 수 없는 정보**를 기반으로 답변을 거부하는 **선택적 거부(selective refusal)** 능력의 평가 문제를 다룹니다. 기존의 정적 벤치마크가 모델의 데이터셋 아티팩트 악용 및 테스트 인스턴스 암기 문제로 인해 이 역량을 안정적으로 측정하지 못하는 한계를 극복하고, 안전하고 신뢰할 수 있는 LLM 배포를 위한 동적 평가 방법론을 제시하는 것을 목표로 합니다.

## 핵심 방법론
논문은 **생성적 평가 방법론(generative evaluation methodology)**인 **RefusalBench**를 제안합니다. 이는 기존의 답변 가능한 질문-맥락 쌍에 **176가지의 정교하게 설계된 언어적 교란 전략**을 도입하여 진단 가능한 테스트 케이스를 생성합니다. 이 교란은 모호성, 모순, 정보 부족, 잘못된 전제, 세분성 불일치, 인식론적 불일치 등 **6가지 정보 불확실성 유형**과 3단계 강도로 분류됩니다. 평가 품질을 보장하기 위해 **다중 모델 생성기-검증기 파이프라인(multi-model generator-verifier pipeline)**과 만장일치 필터링을 사용합니다.

## 주요 결과
30개 이상의 모델에 대한 평가 결과, 심지어 **최신 Frontier 모델**조차 다중 문서 환경에서 **50% 미만의 거부 정확도**를 보이며, 위험한 과신 또는 과잉 주의를 나타냈습니다. **RefusalBench-NQ**에서 인간 검증 통과율은 **93.1%**, **RefusalBench-GaRAGe**에서는 **88.3%**를 달성하여 방법론의 높은 품질을 입증했습니다. 또한, **직접 선호 최적화(DPO)로 튜닝된 모델**이 SFT 모델보다 **거부 정확도**에서 일관된 개선을 보이며, 선택적 거부가 **훈련 가능하고 정렬(alignment)에 민감한 능력**임을 시사했습니다. 모든 모델에서 심각한 **오류 보정(miscalibration)**이 관찰되었으며, 모델들은 거의 불확실성을 표현하지 않고 최대 신뢰도로 예측하는 경향을 보였습니다.

## AI 실무자를 위한 시사점
**RefusalBench**는 **LLM의 선택적 거부 능력**이 중요한 안전 격차임을 명확히 보여줍니다. 실무자들은 정적 벤치마크의 한계를 인식하고, **동적이고 생성적인 평가 방법론**을 채택하여 모델의 진정한 역량을 측정해야 합니다. 또한, **DPO와 같은 정렬(alignment) 기법**을 통해 거부 능력을 명시적으로 훈련하는 것이 중요하며, 모델의 **신뢰도 예측과 실제 정확도 간의 불일치(miscalibration)** 문제를 해결하기 위한 노력이 필요합니다. 다양한 **정보 불확실성 유형**에 대한 모델의 취약점을 이해하고 특정 실패 모드를 보완하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.