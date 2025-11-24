---
title: "[논문리뷰] Mem-α: Learning Memory Construction via Reinforcement Learning"
excerpt: "Yuzhen Mao이 [arXiv]에 게시한 'Mem-α: Learning Memory Construction via Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - External Memory
  - Reinforcement Learning
  - Memory Management
  - Long-Context Understanding
  - Tool Learning
  - RAG
  - Memory Architecture

permalink: /ai/review/2025-10-1-Mem-α-Learning-Memory-Construction-via-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25911)

**저자:** Yu Wang, Ryuichi Takanobu, Zhiqi Liang, Yuzhen Mao, Yuanzhe Hu, Julian McAuley, Xiaojian Wu



## 핵심 연구 목표
대규모 언어 모델(LLM) 에이전트의 제한된 컨텍스트 윈도우 문제를 해결하기 위해, 기존의 외부 메모리 시스템이 사전에 정의된 규칙에만 의존하여 메모리 구축이 최적화되지 못하는 한계를 극복하는 것이 목표입니다. 에이전트가 복잡한 메모리 시스템을 효과적으로 관리하고, 어떤 정보를 저장하고, 어떻게 구조화하며, 언제 업데이트할지 스스로 학습하도록 **강화 학습(Reinforcement Learning, RL)** 프레임워크를 제안합니다.

## 핵심 방법론
본 논문은 **Mem-α**라는 강화 학습 프레임워크를 통해 에이전트가 메모리 구축 정책을 최적화하도록 훈련합니다. 메모리 아키텍처는 **코어, 에피소드, 시맨틱 컴포넌트**로 구성되며, 각 컴포넌트에는 **memory_insert, memory_update, memory_delete**와 같은 전용 도구들이 제공됩니다. 훈련 중 에이전트는 순차적인 정보 청크를 처리하고 메모리 작업을 수행하며, **하류 질의 응답 정확도(r1)**, **도구 호출 형식 정확성(r2)**, **메모리 압축률(r3)**, 그리고 **메모리 내용 품질(r4)**을 기반으로 보상을 받습니다. **Group Relative Policy Optimization (GRPO)**을 사용하여 **30k 토큰** 이내의 다양한 상호작용 패턴을 포함하는 훈련 데이터셋으로 학습합니다.

## 주요 결과
Mem-α는 기존 메모리 증강 에이전트 대비 상당한 성능 향상을 달성했습니다. 특히, **Qwen3-4B w/ Mem-α**는 검증 데이터셋에서 평균 성능 **0.642**를 기록하여 기본 Qwen3-4B 모델(**0.389**)과 **gpt-4.1-mini (0.517)**를 능가했습니다. 또한, **30k 토큰** 길이의 훈련 데이터로 학습했음에도 불구하고 **400k 토큰 이상**의 긴 시퀀스에 대해 **13배 이상**의 놀라운 길이 일반화 성능을 보였습니다. Long-Context 및 RAG-Top2 대비 메모리 공간을 약 **50%** 절감하면서도 더 나은 성능을 유지했습니다.

## AI 실무자를 위한 시사점
Mem-α는 LLM 에이전트가 정적 프롬프트가 아닌 **강화 학습**을 통해 복잡한 메모리 관리 전략을 학습할 수 있음을 입증하여 새로운 패러다임을 제시합니다. **코어, 에피소드, 시맨틱 메모리**의 모듈형 아키텍처는 다양한 정보 유형을 효율적으로 처리할 수 있는 유연한 프레임워크를 제공합니다. **400k 토큰 이상**으로 일반화되는 강력한 길이 확장성은 Mem-α가 실제 장문 컨텍스트 환경에서 활용될 잠재력이 크다는 것을 시사하며, 이는 비용 효율적인 소규모 LLM도 최첨단 에이전트로 훈련될 수 있음을 의미합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.