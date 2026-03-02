---
title: "[논문리뷰] EgoPush: Learning End-to-End Egocentric Multi-Object Rearrangement for Mobile Robots"
excerpt: "Sihang Li이 arXiv에 게시한 'EgoPush: Learning End-to-End Egocentric Multi-Object Rearrangement for Mobile Robots' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Egocentric Perception
  - Multi-Object Rearrangement
  - Mobile Robotics
  - Reinforcement Learning
  - Teacher-Student Distillation
  - Non-Prehensile Manipulation
  - Sim-to-Real Transfer
  - Object-Centric Representation

permalink: /ai/review/2026-02-23-EgoPush-Learning-End-to-End-Egocentric-Multi-Object-Rearrangement-for-Mobile-Robots/

toc: true
toc_sticky: true

date: 2026-02-23 00:00:00+0900+0900
last_modified_at: 2026-02-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.18071)

**저자:** Boyuan An, Zhexiong Wang*, Yipeng Wang*, Jiaqi Li, Sihang Li†, Jing Zhang, Chen Feng+



## 핵심 연구 목표
본 논문은 모바일 로봇이 **오직 자기 중심적(egocentric) 시각 관측** 만을 사용하여 복잡한 환경에서 **여러 객체를 장기적으로 재배열** 하는 문제를 해결하는 것을 목표로 합니다. 기존 글로벌 좌표나 외부 트래킹에 의존하는 방식의 한계를 극복하고, 동적인 상호작용과 잦은 시야 가림 상황에서도 강건하게 작동하는 정책 학습 프레임워크를 개발하고자 합니다.

## 핵심 방법론
**EgoPush** 는 객체 간의 **상대적 공간 관계를 인코딩** 하는 **객체 중심 잠재 공간** 을 학습하는 두 단계 **교사-학생 증류(teacher-student distillation)** 프레임워크입니다. 1단계에서는 가시성에 제한된 **privileged RL teacher** 를 **sparse keypoints** 를 사용하여 훈련하며, **Virtual egocentric FOV masking** 및 **Center-gated visibility** 를 적용하여 학생이 재현 가능한 행동을 유도합니다. 2단계에서는 학생 정책이 **RGB-D 카메라** 입력으로부터 **CNN** 기반으로 **그룹별 깊이** 를 처리하고, **관계형 증류 손실(relational distillation loss)** 과 **DAgger-style distillation** 을 통해 교사 정책의 행동과 잠재 표현을 모방합니다.

## 주요 결과
시뮬레이션 실험에서 **EgoPush** 는 기존 **종단 간 RL(end-to-end RL)** 베이스라인 대비 현저히 우수한 성능을 보였으며, 특히 cross-shape task에서 학생 정책은 **70%의 성공률** 을 달성하여 w/o C-GV 변형의 **21%** 및 Global teacher student의 **0%** 에 비해 압도적이었습니다. 단순화된 두 객체 밀기 태스크에서는 **100% 성공률** 을 기록했으며, 실제 환경 TurtleBot3 플랫폼에서 **제로샷(zero-shot) sim-to-real 전이** 를 통해 **80%의 성공률** 을 검증했습니다.

## AI 실무자를 위한 시사점
**EgoPush** 는 모바일 로봇이 글로벌 맵이나 외부 트래킹 없이도 복잡한 **다중 객체 재배열** 작업을 수행할 수 있는 실용적인 길을 제시합니다. **제한된 관측 공간** 에서의 **교사-학생 증류** 기법과 **객체 중심 잠재 표현** 은 부분 관측 가능성 문제와 긴 작업 기간에 걸친 신뢰도 문제를 해결하는 데 중요한 통찰을 제공합니다. 이는 **로봇 공학 분야** 에서 **자기 중심적 AI 에이전트** 의 개발을 가속화하고, **제로샷 sim-to-real 전이** 를 통해 실제 환경 적용 가능성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.