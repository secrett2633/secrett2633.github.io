---
title: "[논문리뷰] SOP: A Scalable Online Post-Training System for Vision-Language-Action Models"
excerpt: "arXiv에 게시된 'SOP: A Scalable Online Post-Training System for Vision-Language-Action Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Online Post-training
  - Scalable Robot Learning
  - Distributed Systems
  - Multi-task Learning
  - Imitation Learning
  - Reinforcement Learning

permalink: /ai/review/2026-01-07-SOP-A-Scalable-Online-Post-Training-System-for-Vision-Language-Action-Models/

toc: true
toc_sticky: true

date: 2026-01-07 00:00:00+0900+0900
last_modified_at: 2026-01-07 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.03044)

**저자:** Mingjie Pan, Siyuan Feng, Qinglin Zhang, Xinchen Li, Jianheng Song, Chendi Qu, Yi Wang, Chuankang Li, Ziyu Xiong, Zhi Chen, Yi Liu, Jianlan Luo



## 핵심 연구 목표
본 논문은 대규모 사전 훈련을 통해 일반화 능력을 갖춘 **Vision-Language-Action (VLA) 모델** 이 실세계에서 전문가 수준의 숙련도와 확장 가능한 온라인 적응 능력을 확보하지 못하는 문제를 해결하고자 합니다. 기존의 오프라인, 단일 로봇, 또는 태스크별 사후 훈련 방식의 한계를 극복하여, 물리 세계에서 **일반주의 VLA 모델의 온라인, 분산, 다중 태스크 사후 훈련** 을 가능하게 하는 확장 가능한 시스템을 제안하는 것이 목표입니다.

## 핵심 방법론
제안하는 **SOP (Scalable Online Post-training)** 시스템은 **폐쇄 루프 액터-학습자(actor-learner) 아키텍처** 를 기반으로 합니다. 로봇 플릿(`액터`)이 **온-정책 경험 데이터** 와 **인간 개입 신호** 를 지속적으로 중앙 집중식 클라우드 학습자(`학습자`)로 스트리밍하며, 학습자는 업데이트된 정책을 비동기적으로 액터에게 다시 전파합니다. 이 시스템은 **HG-DAgger (대화형 모방 학습)** 및 **RECAP (강화 학습)** 과 같은 기존 사후 훈련 알고리즘을 유연하게 통합하며, **적응형 샘플링 전략** 을 통해 온라인 및 오프라인 데이터를 균형 있게 사용합니다.

## 주요 결과
SOP는 사전 훈련된 VLA 모델의 성능을 크게 향상시키며, **HG-DAgger와 결합 시** Grocery Restocking에서 **0.94** , Laundry Folding에서 **0.96** , Box Assembly에서 **0.98** 의 높은 성공률을 달성했습니다. 오프라인 방식 대비 **2-4배 더 높은 처리량** 을 보였으며, 실세계 상호작용 **단 몇 시간 만에** 효과적인 사후 훈련을 완료했습니다. 특히, 로봇 플릿의 규모에 따라 성능이 거의 선형적으로 확장되어, 목표 성공률(0.8)에 도달하는 시간은 **1대 액터 시 173.6분** 에서 **4대 액터 시 71.7분** 으로 **2.4배 빨라졌습니다** .

## AI 실무자를 위한 시사점
SOP는 AI 실무자들에게 **VLA 모델을 실세계에 배포하고 지속적으로 개선** 하는 강력한 시스템 프레임워크를 제공합니다. **분산된 로봇 플릿** 과 **온라인 학습의 결합** 이 데이터 수집 효율성 및 모델 적응 속도를 혁신적으로 향상시킬 수 있음을 입증했습니다. 특히, 배포된 정책의 실패 모드를 직접적으로 해결하는 **온-정책(on-policy) 수정** 의 중요성을 강조하며, 기존의 다양한 **포스트 트레이닝 알고리즘을 유연하게 통합** 하여 활용할 수 있습니다. AI 엔지니어는 SOP를 통해 대규모 로봇 배포 환경에서 일반주의 모델의 숙련도를 높이는 데 필요한 **핵심 인프라 및 방법론** 을 얻을 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.