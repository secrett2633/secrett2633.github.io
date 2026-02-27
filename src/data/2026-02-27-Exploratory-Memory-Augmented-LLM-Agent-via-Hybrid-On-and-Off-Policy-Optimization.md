---
title: "[논문리뷰] Exploratory Memory-Augmented LLM Agent via Hybrid On- and Off-Policy Optimization"
excerpt: "[arXiv]에 게시된 'Exploratory Memory-Augmented LLM Agent via Hybrid On- and Off-Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Reinforcement Learning
  - Exploration
  - Memory Augmentation
  - Hybrid RL
  - On-Policy Optimization
  - Off-Policy Optimization

permalink: /ai/review/2026-02-27-Exploratory-Memory-Augmented-LLM-Agent-via-Hybrid-On-and-Off-Policy-Optimization/

toc: true
toc_sticky: true

date: 2026-02-27 00:00:00+0900+0900
last_modified_at: 2026-02-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.23008)

**저자:** Zeyuan Liu¹*, Jeonghye Kim¹,²*, Xufang Luo¹†, Dongsheng Li¹, Yuqing Yang¹



## 핵심 연구 목표
대규모 언어 모델(LLM) 에이전트가 강화 학습(RL) 훈련 시 새로운 상태 발견이 필요한 환경에서 탐색에 어려움을 겪는 문제를 해결하는 것을 목표로 합니다. 기존 방법론들이 사전 학습된 지식에 의존하여 탐색 능력이 제한되는 한계를 극복하고, 더욱 탐색적이고 일반화 가능한 LLM 기반 에이전트 구축을 목적으로 합니다.

## 핵심 방법론
논문은 **Exploratory Memory-Augmented On- and Off-Policy Optimization (EMPO2)** 라는 하이브리드 RL 프레임워크를 제안합니다. 이 프레임워크는 메모리를 활용한 탐색과 **온-정책 및 오프-정책 업데이트** 를 결합합니다. 특히, 에이전트가 과거 궤적을 검토하여 **자체 생성 팁(self-generated tips)** 을 메모리에 저장하고, 이를 통해 미래 행동을 안내하여 탐색을 촉진합니다. **오프-정책 업데이트** 시에는 팁의 이점을 **보상-기반 지식 증류(reward-guided knowledge distillation)** 형태로 모델 매개변수에 내재화하며, 안정적인 학습을 위해 **토큰 마스킹 메커니즘** 을 도입했습니다.

## 주요 결과
EMPO2는 기존 알고리즘 대비 뛰어난 성능을 보였습니다. **ScienceWorld** 환경에서는 **GRPO 대비 128.6%** 의 성능 향상을, **WebShop** 환경에서는 **11.3%** 의 향상을 달성했습니다. 분포 외(OOD) 테스트에서는 메모리를 활용한 소수의 시도만으로도 새로운 작업에 대한 강력한 적응력을 입증하며, 매개변수 업데이트 없이 높은 점수를 기록했습니다.

## AI 실무자를 위한 시사점
EMPO2는 **LLM 에이전트의 탐색 능력과 일반화 성능** 을 혁신적으로 개선할 수 있는 강력한 접근 방식을 제시합니다. AI/ML 엔지니어는 LLM 기반 에이전트 개발 시 **자체 생성 메모리와 하이브리드 학습 전략** 을 통합하여 에이전트가 복잡하고 미지의 환경에서 더욱 효과적으로 탐색하고 적응할 수 있도록 설계할 수 있습니다. 이는 **로버스트하고 유연한 AI 에이전트** 구축에 중요한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.