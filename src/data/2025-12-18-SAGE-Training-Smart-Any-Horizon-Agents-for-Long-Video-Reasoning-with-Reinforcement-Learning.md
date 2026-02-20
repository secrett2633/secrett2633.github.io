---
title: "[논문리뷰] SAGE: Training Smart Any-Horizon Agents for Long Video Reasoning with Reinforcement Learning"
excerpt: "arXiv에 게시된 'SAGE: Training Smart Any-Horizon Agents for Long Video Reasoning with Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Reasoning
  - Reinforcement Learning
  - Multi-Turn Reasoning
  - Agent System
  - Long Videos
  - Synthetic Data
  - Any-Horizon Reasoning
  - Large Language Models

permalink: /ai/review/2025-12-18-SAGE-Training-Smart-Any-Horizon-Agents-for-Long-Video-Reasoning-with-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-12-18 00:00:00+0900+0900
last_modified_at: 2025-12-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.13874)

**저자:** Jitesh Jain, Jialuo Li, Zixian Ma, Jieyu Zhang, Chris Dongjoo Kim, Sangho Lee, Rohun Tripathi, Tanmay Gupta, Christopher Clark, Humphrey Shi



## 핵심 연구 목표
본 논문은 기존 SOTA 비디오 추론 모델이 단일 턴 추론 방식에 의존하며 대량의 프레임을 처리하는 비효율성을 지적합니다. 인간처럼 다양한 길이의 비디오에 유연하게 반응하여, 긴 비디오에는 **멀티-턴 추론** 을, 짧은 비디오에는 **단일-턴 추론** 을 수행하는 **성능 좋은 any-horizon 비디오 추론 시스템** 을 개발하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **SAGE (Smart Any-horizon aGEnt)** 라는 에이전트 시스템을 제안하며, 핵심 오케스트레이터인 **SAGE-MM** 을 **Gemini-2.5-Flash** 를 활용한 **쉬운 합성 데이터 생성 파이프라인** 으로 훈련합니다. 이 시스템은 **웹 검색, 음성 전사 (speech transcription), temporal grounding, analyze** 등 다양한 도구를 통합하여 지식 기반의 멀티-턴 추론을 가능하게 합니다. 특히, **LLM-as-a-Judge 평가** 를 사용하는 **효과적인 RL 후처리 (RL post-training) 레시피** 를 통해 **any-horizon 추론 능력** 을 주입합니다.

## 주요 결과
SAGE는 오픈 엔드 비디오 추론 태스크에서 **최대 6.1%의 성능 향상** 을 달성했으며, **10분 이상 비디오** 에서는 **8.2%의 인상적인 개선** 을 보였습니다. 특히, **600-1200초 길이 비디오에서 8.2%의 정확도 향상** 을 기록했고, **Gemini-2.5-Flash를 도구로 활용 시 이 구간에서 14.6%의 정확도 향상** 을 이루었습니다. 또한, **RL 레시피는 SFT 모델을 4.1% 개선** 하고 베이스라인을 **5.7% 능가** 하는 효과를 보여주었습니다.

## AI 실무자를 위한 시사점
SAGE는 **agent 기반의 멀티-턴 추론 시스템** 이 다양한 비디오 길이에 효과적으로 대응할 수 있음을 입증하며, 기존 단일-턴 모델의 한계를 극복하는 새로운 방향을 제시합니다. **합성 데이터 생성 파이프라인** 과 **LLM-as-a-Judge를 활용한 RL 훈련** 은 고품질 데이터의 제약이 있는 상황에서 모델 성능을 효율적으로 개선하는 실용적인 방법론입니다. 특히, **장기 비디오와 오픈 엔드 질문** 에 대한 높은 성능은 엔터테인먼트 및 정보 검색 분야에서 **AI 비디오 에이전트의 실제 적용 가능성** 을 크게 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.