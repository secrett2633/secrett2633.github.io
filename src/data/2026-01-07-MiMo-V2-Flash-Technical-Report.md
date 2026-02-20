---
title: "[논문리뷰] MiMo-V2-Flash Technical Report"
excerpt: "arXiv에 게시된 'MiMo-V2-Flash Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixture-of-Experts
  - Sliding Window Attention
  - Multi-Token Prediction
  - Multi-Teacher On-Policy Distillation
  - Reinforcement Learning
  - Long-Context Modeling
  - Agentic AI

permalink: /ai/review/2026-01-07-MiMo-V2-Flash-Technical-Report/

toc: true
toc_sticky: true

date: 2026-01-07 00:00:00+0900+0900
last_modified_at: 2026-01-07 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.02780)

**저자:** LLM-Core Xiaomi 연구팀



## 핵심 연구 목표
본 논문은 빠른 추론 속도와 강력한 추론 및 에이전트 능력을 동시에 갖춘 효율적이고 비용 효율적인 대규모 언어 모델(LLM)인 MiMo-V2-Flash를 개발하는 것을 목표로 합니다. 특히, 긴 컨텍스트 모델링의 성능 저하 없이 효율성을 유지하고, 기존 사후 훈련 파이프라인의 비효율성과 능력 불균형 문제를 해결하는 새로운 패러다임을 제시하고자 합니다.

## 핵심 방법론
MiMo-V2-Flash는 **309B 총 파라미터** 와 **15B 활성 파라미터** 를 가진 **Mixture-of-Experts(MoE)** 모델입니다. 어텐션 아키텍처는 **Sliding Window Attention(SWA)** 과 전역 어텐션을 **5:1 하이브리드 비율** 로 교차하며 **128-토큰 슬라이딩 윈도우** 를 사용합니다. 모델은 **27조 토큰** 으로 **Multi-Token Prediction(MTP)** 방식으로 사전 훈련되었고, 기본 **32k 컨텍스트 길이** 를 **256k** 로 확장했습니다. 사후 훈련에는 새로운 **Multi-Teacher On-Policy Distillation(MOPD)** 패러다임을 도입하여, 도메인 전문 교사 모델로부터 토큰 수준의 보상과 검증 가능한 결과 기반 보상을 학습합니다.

## 주요 결과
MiMo-V2-Flash는 **DeepSeek-V3.2** 및 **Kimi-K2** 와 같은 최상위 오픈 소스 모델과 대등한 성능을 달성했으며, 이들보다 각각 **1/2 및 1/3의 총 파라미터** 만을 사용했습니다. 긴 컨텍스트 검색에서 **32K에서 256K 컨텍스트 길이** 에 걸쳐 거의 **100% 성공률** 을 보였으며, **SWE-Bench Verified** 에서 **73.4%** , **SWE-Bench Multilingual** 에서 **71.7%** 를 기록하여 소프트웨어 엔지니어링 작업에서 선두적인 오픈 소스 모델로 자리매김했습니다. 추론 시 **3개의 MTP 레이어** 를 활용하여 최대 **3.6의 수용 길이** 와 **2.6배의 디코딩 속도 향상** 을 달성했습니다.

## AI 실무자를 위한 시사점
하이브리드 어텐션과 MoE, 경량 **MTP** 설계는 **높은 성능과 효율적인 자원 사용** 을 동시에 달성할 수 있음을 보여주며, 비용 효율적인 LLM 개발에 중요한 시사점을 제공합니다. **MOPD** 는 다양한 전문성을 가진 모델의 지식을 통합하고 에이전트 능력을 확장하는 새로운 사후 훈련 방법론을 제시하여, **복잡한 에이전트 시스템** 구축에 실용적인 가치를 더합니다. 또한, **MTP** 를 활용한 **추론 가속화** 는 실제 AI 애플리케이션의 **응답 속도를 크게 향상** 시킬 수 있어 사용자 경험 개선에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.