---
title: "[논문리뷰] A Goal Without a Plan Is Just a Wish: Efficient and Effective Global
  Planner Training for Long-Horizon Agent Tasks"
excerpt: "Fanchao Qi이 [arXiv]에 게시한 'A Goal Without a Plan Is Just a Wish: Efficient and Effective Global
  Planner Training for Long-Horizon Agent Tasks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long-Horizon Tasks
  - LLM Agents
  - Global Planning
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Homologous Consensus Filtering
  - Executor Capability Gain Reward
  - Plan-and-Execute

permalink: /ai/review/2025-10-13-A-Goal-Without-a-Plan-Is-Just-a-Wish-Efficient-and-Effective-Global-Planner-Training-for-Long-Horizon-Agent-Tasks/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05608)

**저자:** Shuzheng Si, Haozhe Zhao, Kangyang Luo, Gang Chen, Fanchao Qi, Minjia Zhang, Baobao Chang, Maosong Sun



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 기반 에이전트가 긴 시간 범위의 태스크에서 **글로벌 플래닝 능력 부족** 으로 인해 겪는 "뇌 없는 시행착오"와 "플래닝 환각" 문제를 해결하고자 합니다. 인간의 개입 없이 효율적이고 효과적으로 플래너를 훈련하여 LLM 에이전트의 플래닝 능력을 향상시키는 것이 주된 연구 목표입니다.

## 핵심 방법론
저자들은 플래너와 실행자 에이전트를 명확히 분리하는 **플랜-앤-실행 프레임워크** 를 제안하고 **EAGLET** 이라는 효율적인 플래너 훈련 방식을 도입합니다. 이는 두 단계로 구성됩니다: 첫째, **GPT-5** 와 **DeepSeek-V3.1-Think** 같은 고급 LLM으로부터 **동종 합의 필터링(Homologous Consensus Filtering, HCF)** 을 통해 고품질 계획을 합성하고 **SFT (Supervised Fine-tuning)** 를 초기 단계로 적용합니다. 둘째, **실행자 능력 향상 보상(Executor Capability Gain Reward, ECGR)** 을 활용하는 **규칙 기반 RL(Reinforcement Learning)** 을 통해 플래너의 일반화 능력을 강화하며, **GRPO** 를 사용하여 최적화합니다.

## 주요 결과
**EAGLET** 이 적용된 실행자 에이전트는 **ScienceWorld, ALFWorld, WebShop** 벤치마크에서 기존 메서드를 능가하며 **새로운 최첨단 성능** 을 달성했습니다. 특히, GPT-5 실행자의 평균 보상이 **84.5%에서 88.1%로** 향상되었고, ALFWorld 미확인 시나리오에서 완료 단계가 **10.7에서 8.2로** 감소했습니다. 또한, **EAGLET** 은 RL 기반 기준선 대비 훈련 비용을 **8배 절감** 했으며, 수동 노력이나 추가 훈련 데이터가 필요하지 않았습니다.

## AI 실무자를 위한 시사점
**EAGLET** 은 LLM 에이전트가 복잡한 장기 태스크를 효과적으로 수행할 수 있도록 **효율적이고 자동화된 글로벌 플래너 훈련 솔루션** 을 제공합니다. **HCF** 와 **ECGR** 을 통한 데이터 합성 및 보상 설계는 수동 어노테이션 및 복잡한 RL 튜닝 오버헤드를 크게 줄여줍니다. 또한, 플러그-앤-플레이 방식의 플래너는 다양한 실행자 에이전트 및 기초 LLM에 쉽게 통합될 수 있어, AI 시스템의 **유연성과 확장성** 을 높이는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.