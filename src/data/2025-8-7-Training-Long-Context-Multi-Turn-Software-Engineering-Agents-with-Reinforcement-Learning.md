---
title: "[논문리뷰] Training Long-Context, Multi-Turn Software Engineering Agents with
  Reinforcement Learning"
excerpt: "Maksim Nekrashevich이 arXiv에 게시한 'Training Long-Context, Multi-Turn Software Engineering Agents with
  Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Software Engineering
  - Multi-Turn Interaction
  - Long Context
  - DAPO
  - Autonomous Agents
  - SWE-BENCH

permalink: /ai/review/2025-8-7-Training-Long-Context-Multi-Turn-Software-Engineering-Agents-with-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-08-07 13:38:21+0900
last_modified_at: 2025-08-07 13:38:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03501)

**저자:** Maksim Nekrashevich, Ibragim Badertdinov, Sergei Polezhaev, Maria Trofimova, Alexander Golubev



## 핵심 연구 목표
본 논문은 실세계 소프트웨어 엔지니어링(SWE)과 같이 **상태 저장 환경과의 풍부한 다중 턴 상호작용** 을 요구하는 복잡한 문제에 강화 학습(RL)을 성공적으로 적용하는 것을 목표로 합니다. 기존 연구가 주로 단일 턴 문제에 국한되었던 한계를 넘어, **장문 컨텍스트** 와 **지연된 보상** 에 강인한 자율 SWE 에이전트를 개발하고자 합니다.

## 핵심 방법론
**Qwen2.5-72B-Instruct** 모델을 기반으로, 수정된 **Decoupled Advantage Policy Optimization (DAPO) 알고리즘** 을 사용하여 에이전트를 훈련했습니다. 훈련은 초기 **Rejection Fine-Tuning (RFT)** 단계와 이어서 반복적인 **Multi-Turn RL** 단계로 구성되며, 특히 **131k 토큰의 장문 컨텍스트 처리** 를 위해 **컨텍스트 병렬화** 를 활용했습니다. 보상은 테스트 통과 여부에 따른 이진 보상과 트라젝토리 길이에 대한 페널티를 조합하여 산출했습니다.

## 주요 결과
RL 훈련 결과, 에이전트의 **SWE-BENCH VERIFIED 벤치마크 성공률이 초기 20%에서 39%** 로 크게 향상되었습니다. 이는 교사 모델의 데모 없이 자체 생성된 상호작용 데이터만을 사용한 결과입니다. 또한, **DeepSeek-V3-0324** 및 **Qwen3-235B-A22B** 와 같은 선도적인 오픈 소스 모델들과 동일한 환경에서 유사하거나 더 나은 성능을 달성하여 RL의 유효성을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 강화 학습이 **복잡하고 대화형인 실세계 문제, 특히 소프트웨어 개발 자동화** 에 효과적으로 적용될 수 있음을 보여줍니다. **장문 컨텍스트 처리 능력** 과 **다중 턴 상호작용** 을 학습하는 RL 에이전트는 향후 자율 AI 시스템 개발에 중요한 진전을 가져올 것입니다. 다만, **희소하고 지연된 보상** 과 **고비용의 평가 과정** 은 여전히 해결해야 할 실용적 과제로 남아있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.