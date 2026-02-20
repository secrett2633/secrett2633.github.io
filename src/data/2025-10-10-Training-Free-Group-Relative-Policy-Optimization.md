---
title: "[논문리뷰] Training-Free Group Relative Policy Optimization"
excerpt: "arXiv에 게시된 'Training-Free Group Relative Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Reinforcement Learning
  - Parameter-Free Optimization
  - Experiential Knowledge
  - Token Prior
  - Group Relative Policy Optimization
  - In-Context Learning
  - Cost-Effective AI

permalink: /ai/review/2025-10-10-Training-Free-Group-Relative-Policy-Optimization/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08191)

**저자:** Yuzheng Cai, Siqi Cai, Yuchen Shi, Zihan Xu, Lichao Chen, Yulei Qin, Xiaoyu Tan, Gang Li, Zongyi Li, Haojia Lin, Yong Mao, Ke Li, Xing Sun



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 에이전트가 외부 도구 통합 및 특정 프롬프트 전략에서 겪는 성능 저하 문제를 해결하는 것을 목표로 합니다. 특히, 기존 **강화 학습(RL)** 기반의 파라미터 업데이트 방식이 수반하는 높은 계산 비용, 데이터 희소성, 과적합 문제를 **파라미터 업데이트 없이** 극복하고자 합니다.

## 핵심 방법론
제안하는 **Training-Free GRPO** 는 기존 **GRPO** 의 그룹 기반 상대적 평가 방식을 **비파라미터적(non-parametric)** 추론 과정으로 변환합니다. 각 에포크에서 LLM 에이전트가 생성한 롤아웃 그룹을 **의미론적 그룹 이점(semantic group advantage)** 으로 정량화하고, 이를 반복적으로 증류하여 **경험적 지식(experiential knowledge)** 을 **토큰 사전(token prior)** 으로 구축합니다. 이 토큰 사전은 LLM API 호출 시 모델의 동작을 유도하며, 모델 파라미터는 변경하지 않고 **컨텍스트 공간** 에서 정책을 최적화합니다.

## 주요 결과
**DeepSeek-V3.1-Terminus** 모델에 적용된 **Training-Free GRPO** 는 수학적 추론 및 웹 검색 작업에서 우수한 성능 향상을 입증했습니다. **AIME 벤치마크** 에서 ReAct 대비 **AIME24는 82.7%** , **AIME25는 73.3%** 의 Mean@32를 달성했으며, 이는 기존 32B 모델의 파인튜닝 방식보다 적은 학습 데이터와 **약 $18의 학습 비용** 으로 훨씬 뛰어난 결과를 보였습니다. **WebWalkerQA 벤치마크** 에서도 **67.8%** 의 pass@1을 기록하며 기존 ReAct 63.2% 대비 **4.6%p** 향상되었습니다.

## AI 실무자를 위한 시사점
이 연구는 고가의 **RL 파인튜닝** 에 대한 **비용 효율적인 대안** 을 제시하며, **데이터 희소성** 및 **과적합 문제** 를 겪는 환경에서 LLM 에이전트의 성능을 향상시킬 수 있음을 보여줍니다. 특히, 대규모 **API 기반 LLM** 의 **일반화 능력** 을 유지하면서 특정 도메인에 맞게 조정할 수 있는 실용적인 방법을 제공하여, 전용 GPU 클러스터 없이도 고급 에이전트 기능을 활용할 수 있게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.