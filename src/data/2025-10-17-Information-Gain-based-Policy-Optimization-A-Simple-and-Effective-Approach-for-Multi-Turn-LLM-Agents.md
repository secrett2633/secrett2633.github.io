---
title: "[논문리뷰] Information Gain-based Policy Optimization: A Simple and Effective
  Approach for Multi-Turn LLM Agents"
excerpt: "arXiv에 게시된 'Information Gain-based Policy Optimization: A Simple and Effective
  Approach for Multi-Turn LLM Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Reinforcement Learning
  - Multi-Turn Interactions
  - Reward Sparsity
  - Information Gain
  - Policy Optimization
  - Ground-Truth Awareness
  - Sample Efficiency

permalink: /ai/review/2025-10-17-Information-Gain-based-Policy-Optimization-A-Simple-and-Effective-Approach-for-Multi-Turn-LLM-Agents/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14967)

**저자:** Guoqing Wang, Sunhao Dai, Guangze Ye, Zeyu Gan, Wei Yao, Yong Deng, Xiaofeng Wu, and Zhenzhe Ying



## 핵심 연구 목표
이 논문은 다중 턴(multi-turn) 대규모 언어 모델(LLM) 에이전트 훈련 시 발생하는 **희소한 보상(sparse reward)** 문제를 해결하고자 합니다. 기존 방법론이 최종 결과에만 의존하여 발생하는 **advantage collapse** 와 **세분화된 신용 할당(fine-grained credit assignment) 부족** 문제를 극복하고, 더욱 안정적이며 효율적인 학습을 제공하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **정보 이득 기반 정책 최적화(Information Gain-based Policy Optimization, IGPO)** 프레임워크를 제안합니다. 각 상호작용 턴(turn)을 정보 획득 과정으로 모델링하고, 턴 수준 보상을 정책이 정답을 생성할 확률의 **한계적 증가(marginal increase)** 로 정의합니다. 이 **내재적 턴-수준 보상** 을 최종 결과 보상과 결합하여 밀도 높은 보상 궤적(dense reward trajectory)을 형성하고, **GRPO(Group Relative Policy Optimization)** 스타일의 목적 함수를 최적화하여 정책을 업데이트합니다.

## 주요 결과
IGPO는 여러 인-도메인 및 아웃-오브-도메인 벤치마크에서 강력한 기준선들을 일관되게 능가했습니다. **Qwen2.5-7B-Instruct** 모델에서 평균 **58.7 F1 점수** 를 달성하여 최강 기준선인 DeepResearcher보다 **4.8점 높은 성능** 을 보였습니다. 특히 소형 **3B 모델** 에서는 표준 GRPO 대비 **+15.3점(32.3 → 47.6)** 의 현저한 개선을 이루어, 희소한 보상 환경에서 **샘플 효율성** 을 크게 향상시켰음을 입증했습니다.

## AI 실무자를 위한 시사점
IGPO는 다중 턴 LLM 에이전트의 **학습 안정성과 효율성** 을 크게 개선할 수 있는 실용적인 방법론을 제공합니다. 특히 복잡하고 긴 추론 과정을 요구하는 작업에서 **희소한 보상 문제를 완화** 하고, **작은 모델에서도 성능 향상** 을 이끌어낼 수 있습니다. 이는 **도구 사용(tool use)** 기능을 갖춘 LLM 에이전트의 개발 및 배포에 기여하며, **데이터 효율적인 학습** 이 중요한 실제 환경에서 유용하게 적용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.