---
title: "[논문리뷰] CoVe: Training Interactive Tool-Use Agents via Constraint-Guided Verification"
excerpt: "Zichen Tian이 arXiv에 게시한 'CoVe: Training Interactive Tool-Use Agents via Constraint-Guided Verification' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Tool-Use Agents
  - Multi-turn Interaction
  - Data Synthesis
  - Constraint-Guided Verification
  - Large Language Models
  - Supervised Fine-tuning
  - Reinforcement Learning

permalink: /ai/review/2026-03-03-CoVe-Training-Interactive-Tool-Use-Agents-via-Constraint-Guided-Verification/

toc: true
toc_sticky: true

date: 2026-03-03 00:00:00+0900+0900
last_modified_at: 2026-03-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.01940)

**저자:** Jinpeng Chen, Cheng Gong, Hanbo Li, Ziru Liu, Zichen Tian, Xinyu Fu, Shi Wu, Chenyang Zhang, Wu Zhang, Suiyun Zhang, Dandan Tu, Rui Liu



## 핵심 연구 목표
본 논문은 실제 사용자 요구가 복잡하고 모호함에도 불구하고, 에이전트가 정확한 도구 실행을 통해 이를 충족해야 하는 다중 턴 대화형 도구 사용 에이전트 개발의 근본적인 과제를 해결하고자 합니다. 특히, 고품질 학습 데이터 확보의 어려움을 극복하고 데이터의 복잡성과 정확성을 동시에 보장하는 프레임워크를 제안하는 것이 목표입니다.

## 핵심 방법론
CoVe (Constraint-Verification) 프레임워크는 먼저 **명시적인 작업 제약 조건(task constraints)** 을 정의하여 복잡한 궤적 생성을 안내하고 검증을 위한 결정론적 기준을 제공합니다. 이어서 **제약 조건 퍼지화(constraint fuzzification)** 를 통해 실제 사용자 요청의 모호성을 모방하고, **사용자 시뮬레이터 LLM** 이 에이전트와 다중 턴 상호작용을 생성합니다. 최종적으로, 원래의 제약 조건을 **규칙 기반 검증자(rule-based verifier)** 로 활용하여 에이전트의 도구 호출이 모든 요구 사항을 충족했는지 결정론적으로 검증합니다. 이 메커니즘은 **SFT (Supervised Fine-Tuning)** 및 **RL (Reinforcement Learning)** 학습을 모두 지원합니다.

## 주요 결과
**72-bench 벤치마크** 평가에서 **CoVe-4B 모델** 은 **51.2%** 의 전체 성공률을 달성했습니다. 특히, Airline 도메인에서 **43.0%** , Retail 도메인에서 **59.4%** 의 성공률을 기록하여 유사 규모의 강력한 기준 모델들을 능가하고, 최대 17배 큰 모델들과도 경쟁력 있는 성능을 보였습니다. CoVe 프레임워크를 통한 훈련은 기본 모델인 **Qwen3-4B-Instruct-2507** 대비 평균 pass¹ 점수를 **+18.6%** 향상시켰습니다.

## AI 실무자를 위한 시사점
CoVe는 복잡하고 모호한 실제 사용자 요구를 처리하는 **다중 턴 대화형 도구 사용 에이전트** 를 훈련하기 위한 **효과적이고 효율적인 데이터 합성 방법** 을 제공합니다. 특히 **데이터 병목 현상** 을 해결하고, 대규모 데이터셋 없이도 **명확한 제약 조건과 결정론적 검증** 을 통해 고품질 학습 데이터를 생성할 수 있음을 보여주었습니다. 이는 **LLM 기반 에이전트 개발** 에서 데이터 품질과 검증의 중요성을 강조하며, 공개된 코드와 데이터셋은 향후 연구 및 실제 적용에 크게 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.