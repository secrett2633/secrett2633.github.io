---
title: "[논문리뷰] OdysseyArena: Benchmarking Large Language Models For Long-Horizon, Active and Inductive Interactions"
excerpt: "heroding77이 arXiv에 게시한 'OdysseyArena: Benchmarking Large Language Models For Long-Horizon, Active and Inductive Interactions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Benchmarking
  - Inductive Reasoning
  - Long-Horizon Tasks
  - Active Exploration
  - World Models
  - Autonomous Discovery

permalink: /ai/review/2026-02-09-OdysseyArena-Benchmarking-Large-Language-Models-For-Long-Horizon-Active-and-Inductive-Interactions/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.05843)

**저자:** Fangzhi Xu, Hang Yan, Qiushi Sun, Jinyang Wu, Zixian Huang, Muye Huang, Jingyang Gong, Zichen Ding, Kanzhi Cheng, Jian Zhang, Yian Wang, Xinyu Che, Zeyi Sun, Zhangyue Yin, Haoran Luo, Xuanjing Huang, Ben Kao, Jun Liu, Qika Lin



## 핵심 연구 목표
현재 LLM 에이전트 평가가 주로 **연역적(deductive) 패러다임** 에 집중되어 있어, 에이전트가 환경의 숨겨진 규칙을 **자율적으로 발견하는 귀납적(inductive) 능력** 을 측정하는 데 한계가 있음을 지적합니다. 이 연구는 **장기적인 상호작용(long-horizon), 능동적인 탐색(active exploration), 귀납적 추론(inductive reasoning)** 에 중점을 둔 새로운 에이전트 평가 패러다임을 확립하여 자율적 발견 능력을 측정하는 것을 목표로 합니다.

## 핵심 방법론
논문은 추상적인 전이 동학을 구체적인 환경으로 변환하는 네 가지 원시적 구조 ( **이산적 상징 규칙** , **연속적 확률 동학** , **주기적 시간 패턴** , **관계형 그래프 구조** )를 formalize하고 구현한 인터랙티브 환경 스위트 **ODYSSEYARENA** 를 도입합니다. 이 환경을 기반으로 표준화된 벤치마크 **ODYSSEYARENA-LITE** (120개 작업) 및 스트레스 테스트 스위트 **ODYSSEYARENA-CHALLENGE** (200단계 이상)를 구축하고, 15개 이상의 주요 LLM에 대한 광범위한 평가를 수행했습니다.

## 주요 결과
실험 결과, 최첨단 LLM조차 귀납적 시나리오에서 현저한 결함을 보이며, **Gemini 3 Pro Preview** 가 **44.17%** 의 가장 높은 성공률을 보였음에도 인간 수준에는 훨씬 못 미쳤습니다. 특히, 규칙이 명시적으로 주어졌을 때는 거의 완벽한 성공률을 달성하지만, 규칙 없이 귀납적으로 추론해야 할 때는 성능이 급락하여 **귀납적 병목 현상** 이 핵심적인 문제임을 확인했습니다. 또한, 장기 상호작용에서 성능 포화 현상과 비생산적인 반복 동작인 **"액션 루프(action loops)"** 가 빈번하게 관찰되었습니다.

## AI 실무자를 위한 시사점
현재 LLM은 **연역적 추론** 에는 강하지만, **경험을 통해 숨겨진 환경 역학을 자율적으로 합성하는 귀납적 능력** 은 부족하다는 명확한 한계를 보여줍니다. 이는 복잡하고 동적인 환경에서 LLM 에이전트의 자율적 발견 능력을 기반으로 하는 실제 배포에 중대한 병목 현상임을 시사합니다. 따라서, 단순히 모델의 규모를 키우기보다는 **원시 경험으로부터 세계 모델을 구축하는 능력** 을 향상시키는 아키텍처 연구에 초점을 맞춰야 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.