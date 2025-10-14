---
title: "[논문리뷰] A Vision-Language-Action-Critic Model for Robotic Real-World
  Reinforcement Learning"
excerpt: "Jiangmiao이 [arXiv]에 게시한 'A Vision-Language-Action-Critic Model for Robotic Real-World
  Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robotics
  - Reinforcement Learning (RL)
  - Vision-Language-Action (VLA) Models
  - Reward Modeling
  - Human-in-the-Loop
  - Dense Rewards
  - Generalization
  - Autoregressive Models

permalink: /ai/review/2025-9-22-A_Vision-Language-Action-Critic_Model_for_Robotic_Real-World_Reinforcement_Learning/

toc: true
toc_sticky: true

date: 2025-09-22 13:11:29+0900
last_modified_at: 2025-09-22 13:11:29+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15937)

**저자:** Shaopeng Zhai, Qi Zhang, Tianyi Zhang, Fuxian Huang, Haoran Zhang, Ming Zhou, Shengzhe Zhang, Litao Liu, Sixu Lin, Jiangmiao Pang



## 핵심 연구 목표
로봇의 실세계 강화 학습(RL)에서 **희소하고 수작업으로 제작된 보상** 및 **비효율적인 탐색**으로 인한 병목 현상을 해결하는 것을 목표로 합니다. 특히, 일반적인 로봇 조작 작업에서 **작업별 보상 엔지니어링**을 없애고, **보상 모델의 제로샷 및 인컨텍스트 전이 학습** 능력을 강화하여 실세계 로봇이 스스로 학습하고 개선할 수 있도록 합니다.

## 핵심 방법론
**InternVL** 기반의 **Vision-Language-Action-Critic (VLAC) 모델**을 제안하며, 이는 **비평가(critic)**와 **정책(policy)**의 역할을 통합하는 단일 **자기회귀(autoregressive) 아키텍처**입니다. VLAC는 두 개의 관측 이미지와 언어 목표를 입력으로 받아 **밀집된 진행도 변화(dense progress delta)**와 **완료 신호(done signal)**를 출력하여 보상으로 사용합니다. 모델은 대규모 이질적 데이터셋(언어-시각, 로봇 및 인간 궤적 데이터)으로 훈련되었으며, **PPO(Proximal Policy Optimization)**를 사용하여 정책을 최적화하고, **오프라인 데모 리플레이(Offline Demonstration Replay)**, **리턴 및 탐색(Return and Explore)**, **인간 안내 탐색(Human Guided Explore)**과 같은 **인간 개입(Human-in-the-loop)** 프로토콜을 계층화하여 탐색 효율성과 학습 안정성을 높였습니다.

## 주요 결과
**4가지 실세계 조작 작업**에서 **200회 미만의 상호작용 에피소드** 내에 VLAC는 성공률을 **약 30%에서 약 90%**로 향상시켰습니다. 또한, **인간 개입**을 통합함으로써 샘플 효율성을 **50% 추가 개선**하고 **최대 100%의 최종 성공률**을 달성했습니다. **RT1 데이터셋**에서 제로샷 조건으로도 **VOC-F1 0.95**를 달성하여 강력한 일반화 성능을 입증했으며, **RoboFAC 데이터셋**에서 성공 및 실패 궤적을 **0.89 대 0.44**로 명확하게 구분하는 능력을 보였습니다. 다중 로봇 스케일링 실험에서는 로봇 수가 증가할수록 고성능 도달에 필요한 에피소드 수가 감소하는 **확장 법칙(scaling law)**을 확인했습니다.

## AI 실무자를 위한 시사점
이 연구는 **밀집된 내재적 보상(intrinsic rewards)**을 통해 **실세계 로봇 RL의 데이터 효율성**을 크게 향상시킬 수 있음을 보여줍니다. **사전 훈련된 대규모 VLA 모델**과 **진행도 기반 보상**의 결합은 복잡한 조작 작업에서 **보상 엔지니어링의 필요성을 줄이고** 새로운 환경 및 작업으로의 **제로샷 전이 학습** 가능성을 높입니다. **인간 개입**이 학습 초기 단계의 안정화 및 탐색 가속화에 결정적인 역할을 한다는 점은 실용적인 로봇 시스템 구축에 있어 **인간-로봇 협업**의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.