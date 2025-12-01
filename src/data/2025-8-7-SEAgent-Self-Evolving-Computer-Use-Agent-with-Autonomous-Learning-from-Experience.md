---
title: "[논문리뷰] SEAgent: Self-Evolving Computer Use Agent with Autonomous Learning from
  Experience"
excerpt: "Xiaoyi Dong이 [arXiv]에 게시한 'SEAgent: Self-Evolving Computer Use Agent with Autonomous Learning from
  Experience' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Computer Use Agent
  - Self-Evolving
  - Reinforcement Learning
  - Curriculum Learning
  - Vision-Language Models
  - Experiential Learning
  - Specialist-to-Generalist

permalink: /ai/review/2025-8-7-SEAgent-Self-Evolving-Computer-Use-Agent-with-Autonomous-Learning-from-Experience/

toc: true
toc_sticky: true

date: 2025-08-07 13:38:21+0900
last_modified_at: 2025-08-07 13:38:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.04700)

**저자:** Zeyi Sun, Ziyu Liu, Yuhang Zang, Yuhang Cao, Xiaoyi Dong, Tong Wu, Dahua Lin, Jiaqi Wang



## 핵심 연구 목표
본 논문은 기존 컴퓨터 사용 에이전트(CUA)가 인간 주석 데이터에 크게 의존하고 새로운 또는 전문화된 소프트웨어 환경에서 어려움을 겪는 문제를 해결합니다. 인간의 개입 없이 에이전트가 낯선 소프트웨어 환경을 자율적으로 탐색하고 경험을 통해 학습하며 진화하여 전문가 수준의 역량을 확보하는 것을 목표로 합니다.

## 핵심 방법론
SEAgent는 자율 학습을 위해 세 가지 핵심 구성 요소를 도입합니다. 첫째, 환경 상태를 캡션하고 성공 및 실패 단계를 평가하는 **World State Model (WSM)** 을 통해 단계별 보상 신호를 제공합니다. 둘째, 지속적으로 업데이트되는 소프트웨어 가이드북 메모리를 활용하여 점진적으로 다양하고 도전적인 작업을 생성하는 **Curriculum Generator** 를 사용합니다. 셋째, 에이전트 정책은 실패 행동에 대한 **Adversarial Imitation** 과 성공 행동에 대한 **Group Relative Policy Optimization (GRPO)** 으로 구성된 경험 학습을 통해 업데이트됩니다. 또한, 개별 전문 에이전트의 통찰력을 통합하여 강력한 범용 에이전트를 개발하는 **전문가-범용가 훈련 전략** 을 제시합니다.

## 주요 결과
SEAgent는 **OS-World** 내 5가지 새로운 소프트웨어 환경에서 UI-TARS 대비 평균 성공률을 **11.3%에서 34.5%** 로 크게 향상시켰습니다. 특히, **전문가-범용가 훈련 전략(34.5%)** 은 개별 전문 에이전트 앙상블(32.2%) 및 직접 범용 강화 학습(30.6%)보다 우수한 성능을 보였습니다. **World State Model** 은 AgentRewardBench에서 기존 모델 대비 **7.5%의 정밀도 향상** 을 달성했습니다.

## AI 실무자를 위한 시사점
SEAgent는 비용이 많이 드는 인간 주석 데이터에 대한 의존도를 줄여 컴퓨터 사용 에이전트가 빠르게 변화하는 소프트웨어 환경에 자율적으로 적응할 수 있는 길을 제시합니다. **전문가-범용가 훈련 전략** 은 확장 가능한 일반 에이전트 개발을 위한 효과적인 방법론을 제공하며, **정교한 보상 모델링** 과 **커리큘럼 생성** 의 중요성을 강조합니다. 이는 향후 장시간 복잡한 워크플로우를 처리하는 에이전트 개발에 중요한 기반이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.