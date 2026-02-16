---
title: "[논문리뷰] RLinf-Co: Reinforcement Learning-Based Sim-Real Co-Training for VLA Models"
excerpt: "이 [arXiv]에 게시한 'RLinf-Co: Reinforcement Learning-Based Sim-Real Co-Training for VLA Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Sim-to-Real
  - Co-training
  - VLA Models
  - Robotic Manipulation
  - Supervised Fine-tuning
  - Catastrophic Forgetting

permalink: /ai/review/2026-02-16-RLinf-Co-Reinforcement-Learning-Based-Sim-Real-Co-Training-for-VLA-Models/

toc: true
toc_sticky: true

date: 2026-02-16 00:00:00+0900+0900
last_modified_at: 2026-02-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12628)

**저자:** Liangzhi Shi, Shuaihang Chen, Feng Gao, Yinuo Chen, Kang Chen, Tonghe Zhang, Hongzhi Zhang, Weinan Zhang, Chao Yu, and Yu Wang



## 핵심 연구 목표
본 논문은 **Vision-Language-Action (VLA) 모델** 훈련 시, 시뮬레이션을 정적 데이터 소스로만 활용하고 폐쇄 루프 인터랙션을 충분히 활용하지 못하는 기존 **Supervised Fine-Tuning (SFT)** 기반 sim-real co-training의 한계를 극복하고자 합니다. 궁극적으로 시뮬레이션의 인터랙티브한 특성을 활용하여 VLA 모델의 **실세계 성능, 일반화 능력, 데이터 효율성** 을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
제안된 **RL-based sim-real Co-training (RL-Co)** 프레임워크는 두 가지 단계로 구성됩니다. 첫 번째 단계에서는 **실세계 및 시뮬레이션 데모** 혼합 데이터에 대한 **SFT** 를 통해 정책을 초기화하여 실세계 지식을 주입하고 시뮬레이션 환경에 대한 능력을 구축합니다. 두 번째 단계에서는 시뮬레이션에서 **강화 학습(RL)** 을 수행하며, 이때 **실세계 데이터** 에 대한 보조 **SFT 손실** 을 추가하여 **재앙적 망각(catastrophic forgetting)** 을 방지하고 정책을 안정화합니다. 이 방법론은 **OpenVLA** 와 **π0.5** 두 가지 대표적인 VLA 아키텍처에서 검증되었습니다.

## 주요 결과
RL-Co는 네 가지 실세계 테이블탑 조작 태스크에서 일관되게 우수한 성능을 보였습니다. 특히, **OpenVLA** 에서는 **실세계 성공률을 +24%** , **π0.5** 에서는 **+20%** 향상시켰습니다. 또한, **RL-Co** 는 **미확인 태스크 변형(unseen task variations)** 에 대한 **일반화 능력** 을 크게 강화했으며, **실세계 데이터 효율성** 측면에서 탁월함을 입증하여 **20개의 실세계 데모** 만으로도 SFT 기반 방식의 **200개 데모** 보다 우수한 성능을 달성했습니다.

## AI 실무자를 위한 시사점
**AI 실무자** 들은 이 연구를 통해 **대규모 시뮬레이션 상호작용** 을 활용하여 **로봇 매니퓰레이션 VLA 모델** 의 **실세계 배포 성능** 을 크게 향상시킬 수 있는 실용적이고 확장 가능한 방법을 얻을 수 있습니다. 특히, **실세계 데이터 수집 비용 및 시간** 이 많이 소요되는 문제에 직면했을 때, **시뮬레이션 기반 RL** 과 **실세계 SFT 정규화** 의 조합은 **데이터 효율성** 을 극대화하면서 **모델의 일반화 능력** 을 높이는 효과적인 전략이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.