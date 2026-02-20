---
title: "[논문리뷰] Dr. Zero: Self-Evolving Search Agents without Training Data"
excerpt: "Shaoliang Nie이 arXiv에 게시한 'Dr. Zero: Self-Evolving Search Agents without Training Data' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Self-Evolution
  - Search Agents
  - Large Language Models (LLMs)
  - Data-Free Learning
  - Reinforcement Learning (RL)
  - Hop-Grouped Relative Policy Optimization (HRPO)
  - Question Answering
  - Multi-hop Reasoning

permalink: /ai/review/2026-01-13-Dr-Zero-Self-Evolving-Search-Agents-without-Training-Data/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.07055)

**저자:** Shaoliang Nie, Suyu Ge, Xianjun Yang, Kartikeya Upasani, Zhenrui Yue



## 핵심 연구 목표
본 논문은 기존 멀티턴 검색 에이전트의 데이터 없는 자기 진화 과정에서 발생하는 제한적인 질문 다양성과 다단계 추론 및 도구 사용에 필요한 막대한 컴퓨팅 자원 문제를 해결하는 것을 목표로 합니다. 특히, 인간의 훈련 데이터 없이 외부 검색 엔진에만 의존하여 에이전트가 자율적으로 진화하고 복잡한 추론 및 검색 능력을 습득할 수 있는 프레임워크를 개발하는 것이 주 목적입니다.

## 핵심 방법론
본 연구는 **Dr. Zero** 라는 데이터 없는 자기 진화 프레임워크를 제안하며, **제안자-해결사(proposer-solver) 공진화 구조** 를 사용합니다. **제안자** 는 해결사의 피드백을 통해 다양하고 검증 가능하며 도전적인 질문을 생성하며, **해결사** 는 이 질문들로 훈련됩니다. 훈련 효율성 향상을 위해 **홉-그룹 상대 정책 최적화(Hop-Grouped Relative Policy Optimization, HRPO)** 를 도입하여 구조적으로 유사한 질문들을 클러스터링하고 그룹 수준의 기준선을 제공함으로써 샘플링 오버헤드를 줄입니다.

## 주요 결과
**Dr. Zero** 는 여러 오픈 도메인 질의응답 벤치마크에서 강력한 지도학습 기반 검색 에이전트와 동등하거나 능가하는 성능을 보였습니다. 특히 **Qwen2.5-3B Instruct 모델** 을 사용하여 NQ 데이터셋에서 **0.397 EM** 을 달성, 지도학습 기반 **Search-R1** 을 **22.9%** 앞섰습니다. 또한 **HRPO** 는 표준 **GRPO** 보다 적은 훈련 비용으로 더 높은 평균 성능( **0.326 EM 대 0.320 EM** )을 달성하여 효율성과 성능을 동시에 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 인간의 훈련 데이터 없이도 LLM 기반 검색 에이전트가 자율적으로 고도화될 수 있음을 증명하여 데이터 부족 환경에서의 AI 개발에 중요한 방향을 제시합니다. **HRPO** 와 같은 효율적인 학습 방법론은 복잡한 도구 사용이 필요한 에이전트의 훈련 비용을 절감하여 실제 적용 가능성을 높입니다. 이는 고가의 데이터 주석 작업에 대한 의존도를 줄이고, 자기 진화적 학습을 통해 더욱 강건하고 적응력 있는 AI 시스템을 구축하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.