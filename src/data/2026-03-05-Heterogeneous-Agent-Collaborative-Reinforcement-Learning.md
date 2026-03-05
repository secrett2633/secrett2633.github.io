---
title: "[논문리뷰] Heterogeneous Agent Collaborative Reinforcement Learning"
excerpt: "arXiv에 게시된 'Heterogeneous Agent Collaborative Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Multi-Agent Systems
  - Policy Optimization
  - Heterogeneous Agents
  - Sample Efficiency
  - Knowledge Transfer
  - RLVR

permalink: /ai/review/2026-03-05-Heterogeneous-Agent-Collaborative-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2026-03-05 00:00:00+0900+0900
last_modified_at: 2026-03-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.02604)

**저자:** Zhixia Zhang, Zixuan Huang, Xin Xia, Deqing Wang, Fuzhen Zhuang, Shuai Ma, Ning Ding, Yaodong Yang, Jianxin Li, Yikun Ban



## 핵심 연구 목표
본 논문은 **Heterogeneous Agent Collaborative Reinforcement Learning (HACRL)** 이라는 새로운 학습 패러다임을 제안하여, 이질적인(heterogeneous) LLM 에이전트들의 독립적인 온-폴리시 최적화의 비효율성을 해결하는 것을 목표로 합니다. 에이전트 간 역량 불균형과 정책 분포 차이로 인한 분포 이동을 제어하면서, 다른 에이전트가 생성한 롤아웃을 활용하여 샘플 효율성을 극대화하고 상호 학습을 가능하게 하는 것이 주된 목적입니다.

## 핵심 방법론
저자들은 HACRL 패러다임 하에 **HACPO (Heterogeneous Agent Collaborative Policy Optimization)** 알고리즘을 제안합니다. HACPO는 **Agent-Capability-Aware Advantage Estimation** , **Model Capabilities Discrepancy Awareness (역량 비율 `ω(k,j)` 사용)** , **Exponential Importance Sampling (비선형 가중치 `α` 적용)** , 그리고 **Stepwise Clipping (비대칭 클리핑 `[1.0 – δ, 1.0]`)** 의 네 가지 메커니즘을 도입하여 에이전트 간 역량 차이와 정책 분포 불일치를 완화하고 안정적인 상호 학습을 가능하게 합니다.

## 주요 결과
**HACPO** 는 다양한 이질적인 모델 조합과 7가지 수학적 추론 벤치마크(예: **MATH-500** , **GSM8K** , **AIME2025** )에서 모든 참여 에이전트의 성능을 일관되게 향상시켰습니다. 특히, 기존 **GSPO** 대비 평균 **3.3%** 더 높은 성능을 달성했으며, 동시에 **롤아웃 비용을 절반** 만 사용하여 높은 샘플 효율성을 입증했습니다. 이론적 분석을 통해 제안된 어드밴티지 추정의 불편향성과 최적화 방향의 일관성도 증명되었습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 RL 기반 미세 조정(fine-tuning)에서 발생하는 높은 비용과 이질적인 모델 환경에서의 비효율성 문제를 해결할 수 있는 실용적인 방법론을 제시합니다. **HACPO** 는 이질적인 LLM 에이전트 간의 효과적인 지식 공유와 상호 학습을 통해 데이터 수집 비용을 크게 줄이면서도 성능을 향상시켜, 리소스 제약이 있는 환경에서 LLM을 학습시키는 데 중요한 기여를 할 수 있습니다. 이는 향후 협업 기반 AI 시스템 설계 및 배포에 대한 새로운 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.