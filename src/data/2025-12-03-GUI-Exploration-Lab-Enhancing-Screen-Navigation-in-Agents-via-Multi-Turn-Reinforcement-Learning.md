---
title: "[논문리뷰] GUI Exploration Lab: Enhancing Screen Navigation in Agents via Multi-Turn Reinforcement Learning"
excerpt: "Kaijun Tan이 [arXiv]에 게시한 'GUI Exploration Lab: Enhancing Screen Navigation in Agents via Multi-Turn Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - GUI Agents
  - Screen Navigation
  - Reinforcement Learning
  - Multi-Turn RL
  - Simulation
  - Supervised Fine-tuning
  - Generalization

permalink: /ai/review/2025-12-03-GUI-Exploration-Lab-Enhancing-Screen-Navigation-in-Agents-via-Multi-Turn-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.02423)

**저자:** Haolong Yan, Yeqing Shen, Xin Huang, Jia Wang, Kaijun Tan, Zhixuan Liang, Hongxin Li, Zheng Ge, Osamu Yoshie, Si Li, Xiangyu Zhang, Daxin Jiang



## 핵심 연구 목표
본 연구는 GUI(Graphical User Interface) 에이전트가 실제 환경에서 복잡한 화면 탐색 과제를 수행하는 데 필요한 포괄적인 환경 정보를 얻기 어렵다는 문제를 해결합니다. 이를 위해, 유연한 GUI 에이전트 훈련 및 평가를 위한 시뮬레이션 환경인 **GUI Exploration Lab (GE-Lab)** 을 소개하고, 단계별 학습 패러다임(SFT, ST-RL, MT-RL)을 통해 에이전트의 탐색 능력과 일반화 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 화면, 아이콘, 내비게이션 그래프를 유연하게 정의할 수 있는 시뮬레이션 환경 **GE-Lab** 을 구축하고, GUI 에이전트 학습을 위한 3단계 패러다임을 제안합니다. 첫째, **SFT(Supervised Fine-Tuning)** 를 통해 기본적인 내비게이션 지식을 암기시키고, 둘째, **ST-RL(Single-Turn Reinforcement Learning)** 은 **Direct Preference Optimization (DPO)** 과 규칙 기반 보상을 활용하여 미지의 시나리오에 대한 일반화를 강화합니다. 마지막으로, **MT-RL(Multi-Turn Reinforcement Learning)** 은 상호작용 롤아웃을 통해 탐색 전략과 에러 복구를 촉진하며, 이는 희소하고 목표 기반의 **A2B (Action-to-B) 보상** 으로 유도됩니다. 모든 실험은 **Qwen2.5-VL-7B-Instruct** 모델을 기반으로 수행되었습니다.

## 주요 결과
**SFT** 는 in-distribution (ID) 벤치마크에서 **Qwen2.5-VL-7B-SFT** 가 **98.89%** 의 전반적인 성능을 달성하며 기본적인 지식 암기에 효과적임을 입증했습니다. **ST-RL** 은 out-of-distribution (OOD) 시나리오에서 **Qwen2.5-VL-7B-ST-RL** 이 **63.06%** 의 전반적인 성능을 기록하며 **SFT** 대비 **13.7%** 의 상대적 개선을 보여 일반화 능력을 향상시켰습니다. 가장 중요한 것은 **MT-RL** 이 인터랙티브 벤치마크에서 **Pass@1 17.47%** 및 **Pass@5 25.16%** 로 가장 높은 점수를 달성하며 복잡한 다단계 탐색 과제에서 강력한 탐색 및 에러 복구 기능을 입증했다는 점입니다.

## AI 실무자를 위한 시사점
**GE-Lab** 은 GUI 에이전트 개발 및 평가를 위한 **유연하고 제어 가능한 시뮬레이션 환경** 을 제공하여 실제 환경의 복잡성을 우회하고 연구 진행을 가속화합니다. **SFT, ST-RL, MT-RL** 로 이어지는 단계별 학습 패러다임은 에이전트가 기본적인 지식을 습득하고, 새로운 시나리오에 일반화하며, 궁극적으로 효과적인 탐색 전략을 개발하는 데 효과적임을 보여줍니다. 특히 **MT-RL** 의 활용은 에이전트의 **실시간 상호작용 및 시행착오 학습 능력** 을 강화하여 복잡한 GUI 환경에서 더 강건하고 적응력 있는 에이전트를 구축하는 데 중요한 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.