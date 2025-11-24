---
title: "[논문리뷰] CODA: Coordinating the Cerebrum and Cerebellum for a Dual-Brain Computer
  Use Agent with Decoupled Reinforcement Learning"
excerpt: "Jianze Liang이 [arXiv]에 게시한 'CODA: Coordinating the Cerebrum and Cerebellum for a Dual-Brain Computer
  Use Agent with Decoupled Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agents
  - Reinforcement Learning
  - Planner-Executor Architecture
  - Decoupled Training
  - Large Vision-Language Models
  - Specialization
  - Generalization
  - Computer Use Agent

permalink: /ai/review/2025-8-28-CODA-Coordinating-the-Cerebrum-and-Cerebellum-for-a-Dual-Brain-Computer-Use-Agent-with-Decoupled-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-08-28 13:10:39+0900
last_modified_at: 2025-08-28 13:10:39+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.20096)

**저자:** Zeyi Sun, Yuhang Cao, Jianze Liang, Qiushi Sun, Ziyu Liu, Zhixiong Zhang, Yuhang Zang, Xiaoyi Dong, Kai Chen, Dahua Lin, Jiaqi Wang



## 핵심 연구 목표
GUI(Graphical User Interface) 기반 자율 에이전트의 핵심 난제인 **장기 계획(long-horizon planning)** 능력과 **정밀한 미세 실행(fine-grained execution)** 능력 사이의 고질적인 트레이드오프를 해결하는 것을 목표로 합니다. 특히 과학 컴퓨팅과 같은 전문 도메인에서, 기존의 정적이고 훈련 불가능한 구성 프레임워크의 한계를 극복하여 경험을 통해 학습하고 적응하는 **훈련 가능한** 에이전트를 개발하고자 합니다.

## 핵심 방법론
본 논문은 인간 뇌의 기능적 구조에서 영감을 받아 **Cerebrum** (제너럴리스트 플래너)와 **Cerebellum** (스페셜리스트 이그제큐터)로 구성된 **CODA**라는 듀얼-브레인 아키텍처를 제안합니다. **플래너**는 **Qwen2.5-VL** 모델을 기반으로 고수준 계획을 수립하며, **이그제큐터**는 **UI-TARS-1.5** 모델을 사용하여 플래너의 추상적 지시를 **`pyautogui`** 스크립트와 같은 구체적인 GUI 액션으로 변환합니다. 훈련은 두 단계로 진행됩니다. 첫 번째 **특정화(Specialization)** 단계에서는 **GRPO(Group Relative Policy Optimization)** 기법을 활용하여 각 과학 애플리케이션별로 플래너를 개별적으로 훈련하며, 이그제큐터는 고정된 상태로 유지됩니다. 두 번째 **일반화(Generalization)** 단계에서는 모든 특정화된 전문가 플래너로부터 성공적인 궤적을 통합하여 최종 플래너에 대한 **감독된 미세 조정(SFT)**을 수행합니다.

## 주요 결과
**CODA** 프레임워크는 **ScienceBoard** 벤치마크의 네 가지 어려운 애플리케이션에서 기존 베이스라인 모델들을 **상당히 능가**했습니다. 특히, **CODA (Stage-2)**는 **Pass@8**에서 **39.96%**의 전반적인 성공률을 달성하여, **Qwen2.5-VL-32B**의 **19.49%** 및 **UI-TARS-1.5-7B**의 **15.36%** 대비 현저히 높은 성능을 보였습니다. 또한, **72B-voting@4 Ensemble** 기반의 자동 평가 시스템은 **AgentRewardBench**에서 **81.2%의 Precision**과 **76.8%의 Recall**을, **ScienceBoard**에서 **69.5%의 Precision**과 **74.2%의 Recall**을 기록하며 고품질 보상 신호 제공 능력을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **플래너-이그제큐터 시스템**을 위한 **디커플드 강화 학습(decoupled RL) 훈련 전략**이 복잡하고 데이터가 부족한 GUI 자동화 도메인에서 매우 효과적임을 보여줍니다. **특정화-일반화의 2단계 접근 방식**은 에이전트가 도메인별 지식을 학습하고 다양한 작업에 걸쳐 일반화하는 강력한 방법을 제공합니다. **자동화된 평가 시스템**과 **분산형 탐색 파이프라인**의 활용은 GUI 환경에서 효율적인 데이터 생성 및 RL 훈련 스케일링에 필수적이며, 고비용의 수동 라벨링 데이터 의존도를 줄이는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.