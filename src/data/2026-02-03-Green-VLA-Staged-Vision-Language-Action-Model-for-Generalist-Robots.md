---
title: "[논문리뷰] Green-VLA: Staged Vision-Language-Action Model for Generalist Robots"
excerpt: "이 [arXiv]에 게시한 'Green-VLA: Staged Vision-Language-Action Model for Generalist Robots' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action
  - Generalist Robots
  - Staged Training
  - Reinforcement Learning
  - Multi-embodiment
  - Data Quality
  - Humanoid Robotics
  - Flow Matching

permalink: /ai/review/2026-02-03-Green-VLA-Staged-Vision-Language-Action-Model-for-Generalist-Robots/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.00919)

**저자:** Sber Robotics Center



## 핵심 연구 목표
본 논문은 로봇 학습의 고질적인 문제인 데이터의 이질성, 낮은 품질, 그리고 행동 모방 (Behavior Cloning, BC)의 장기 태스크 한계를 해결하고자 합니다. 이를 위해 다양한 로봇 플랫폼과 환경에 걸쳐 일반화되고 견고하며 효율적인 로봇 정책을 개발하는 **단계적 (staged) Vision-Language-Action (VLA) 프레임워크** 를 제안합니다.

## 핵심 방법론
Green-VLA는 **L0부터 R2까지 5단계 학습 커리큘럼** 을 따르며, **기초 VLM (L0)** , **멀티모달 웹 사전 학습 (L1)** , **멀티-embodiment 로봇 사전 학습 (R0)** , **embodiment-특화 적응 (R1)** , 그리고 **RL 기반 정책 정렬 (R2)** 을 포함합니다. 특히, **DATAQA 파이프라인** 으로 데이터 품질을 관리하고, **통합된 액션 공간 (Au)** 과 **광학 흐름 기반 액션 정렬** 을 통해 데이터 이질성을 완화합니다. 또한, **JPM (Joint Prediction Module)** 을 통한 정밀 타겟팅 가이드와 **OOD (Out-of-Distribution) 감지기** 를 사용하여 안전성과 안정성을 높입니다.

## 주요 결과
**R0 사전 학습 단계** 에서 Green-VLA는 테이블 정리 태스크에서 **"Tape" 작업 성공률 83.1%** 와 평균 **1분 35초** 의 완료 시간을 기록하며 기존 VLA 모델들을 능가했습니다. **R1 미세 조정 단계** 에서는 JPM 가이던스를 통해 이커머스 선반 피킹 태스크의 **"ID Coarse" 성공률을 62.3%에서 95.4%** 로 크게 향상시켰습니다. **R2 RL 정렬 단계** 에서는 WidowX 태스크에서 성공률을 **절대적인 24%** 증가시켰고, CALVIN 벤치마크에서 **평균 체인 길이 (ACL) 4.63** 을 달성하며 장기적인 일관성과 오류 복구 능력을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 로봇 학습에서 **데이터 품질 정렬** , **통일된 액션 공간 설계** , 그리고 **다단계 학습 전략** 이 실질적인 성능 향상에 필수적임을 보여줍니다. 특히, **강화 학습 (RL) 기반의 정책 정렬** 은 행동 모방의 한계를 극복하고 로봇의 장기 태스크 성공률과 견고성을 획기적으로 개선하는 데 중요한 역할을 합니다. 이러한 접근 방식은 **제너럴리스트 로봇** 을 위한 실제 배포 가능한 **고품질 VLA 모델** 개발에 핵심적인 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.