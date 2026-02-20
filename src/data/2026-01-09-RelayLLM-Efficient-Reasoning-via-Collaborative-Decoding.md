---
title: "[논문리뷰] RelayLLM: Efficient Reasoning via Collaborative Decoding"
excerpt: "Haolin Liu이 arXiv에 게시한 'RelayLLM: Efficient Reasoning via Collaborative Decoding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - SLM
  - Collaborative Decoding
  - Token-level Intervention
  - Reinforcement Learning
  - GRPO
  - Efficient Reasoning
  - Resource Efficiency

permalink: /ai/review/2026-01-09-RelayLLM-Efficient-Reasoning-via-Collaborative-Decoding/

toc: true
toc_sticky: true

date: 2026-01-09 00:00:00+0900+0900
last_modified_at: 2026-01-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.05167)

**저자:** Chengsong Huang, Tong Zheng, Langlin Huang, Jinyuan Li, Haolin Liu, Jiaxin Huang



## 핵심 연구 목표
본 논문은 복잡한 추론 작업에서 **대규모 언어 모델(LLM)** 의 높은 연산 비용과 지연 시간 문제를 해결하면서, **소규모 언어 모델(SLM)** 의 제한된 추론 능력을 보완하는 효율적인 방법을 제안합니다. 기존의 쿼리 단위 오프로딩 방식의 비효율성을 개선하여, 토큰 수준의 정교한 협업 디코딩을 통해 연산 낭비를 최소화하고 SLM의 추론 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
**RelayLLM** 은 SLM이 능동적인 컨트롤러 역할을 하여, 특정 시점에 `<call>n</call>`과 같은 특별한 명령 토큰을 생성함으로써 **LLM** 의 개입을 요청하고 `n`개의 토큰을 응답받아 추론을 이어가는 **토큰 수준의 협업 디코딩** 방식을 사용합니다. 이를 위해, 먼저 **지도 학습 기반의 웜업 단계** 를 통해 SLM에게 호출 명령의 구문 구조를 학습시키고, 이후 **강화 학습(Group Relative Policy Optimization, GRPO)** 을 적용하여 모델이 독립성과 도움 요청 사이의 균형을 맞추도록 유도합니다. **난이도 인식 보상(Difficulty-Aware Reward)** 을 설계하여 LLM 호출 비용 낭비와 불필요한 오류에 페널티를 부여합니다.

## 주요 결과
**RelayLLM** 은 6개 수학 벤치마크에서 평균 정확도를 **42.5%에서 49.52%** 로 향상시키며, SLM과 LLM 간의 성능 격차를 효과적으로 줄였습니다. 특히, 전체 생성 토큰 중 **LLM 호출 비율이 1.07%** 에 불과하여, 성능이 유사한 랜덤 라우터 대비 **98.2%의 비용 절감** 효과를 보였습니다. **Qwen3-1.7B 모델** 의 경우, 기본 SLM(42.50%)과 전문가 LLM(54.12%) 사이의 성능 격차 약 **60%** 를 회복했습니다.

## AI 실무자를 위한 시사점
**RelayLLM** 은 AI/ML 엔지니어들에게 효율적인 추론 시스템 구축을 위한 실용적인 프레임워크를 제공합니다. SLM을 활용하여 대부분의 추론 단계를 처리하고, 중요한 지점에서만 LLM의 전략적인 개입을 요청함으로써 **연산 비용을 크게 절감** 하면서도 높은 추론 능력을 유지할 수 있습니다. 특히, 동적으로 호출 길이를 예측하는 방식은 고정 길이 호출 대비 **컴퓨팅 낭비를 최소화** 하며, 이는 자원 제약이 있는 환경에서 고성능 AI 시스템을 배포하는 데 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.