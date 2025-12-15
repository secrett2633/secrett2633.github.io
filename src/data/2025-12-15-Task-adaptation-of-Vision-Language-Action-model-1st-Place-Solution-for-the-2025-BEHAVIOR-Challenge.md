---
title: "[논문리뷰] Task adaptation of Vision-Language-Action model: 1st Place Solution for the 2025 BEHAVIOR Challenge"
excerpt: "Akash Karnatak이 [arXiv]에 게시한 'Task adaptation of Vision-Language-Action model: 1st Place Solution for the 2025 BEHAVIOR Challenge' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA) models
  - Flow Matching
  - Embodied AI
  - Robot Manipulation
  - BEHAVIOR Challenge
  - Correlated Noise
  - Stage Tracking
  - Multi-Task Learning

permalink: /ai/review/2025-12-15-Task-adaptation-of-Vision-Language-Action-model-1st-Place-Solution-for-the-2025-BEHAVIOR-Challenge/

toc: true
toc_sticky: true

date: 2025-12-15 00:00:00+0900+0900
last_modified_at: 2025-12-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.06951)

**저자:** Ilia Larchenko, Gleb Zaring, Akash Karnatak



## 핵심 연구 목표
본 논문은 2025 BEHAVIOR Challenge에서 1위를 차지한 비전-액션 정책을 제시하며, 50가지의 다양하고 장기적인 가정용 작업을 **포토리얼리스틱 시뮬레이션** 에서 수행하는 것을 목표로 합니다. 특히, **누적 오류, 비마르코프적 상태, 복구 데모 부족, 다중 모달 액션 분포** 와 같은 복합적인 도전 과제를 해결하는 데 중점을 둡니다.

## 핵심 방법론
연구팀은 **Pi0.5 VLA 아키텍처** 를 기반으로 **상관 관계 노이즈(correlated noise)** 를 활용한 흐름 매칭을 도입하여 훈련 효율성을 높였습니다. **시스템 2 단계 추적(System 2 Stage Tracking)** 을 통해 비마르코프적 상태의 모호성을 해결하고, **학습 가능한 혼합 계층 어텐션(learnable mixed-layer attention)** 을 사용하여 VLM(Vision-Language Model) 레이어 결합을 최적화했습니다. 또한, **다중 샘플 흐름 매칭(multi-sample flow matching)** 으로 분산을 줄이고, **액션 압축(action compression)** 및 **휴리스틱 보정 규칙(correction rules)** 을 통해 추론 효율성과 견고성을 향상시켰습니다.

## 주요 결과
이 접근 방식은 2025 BEHAVIOR Challenge에서 **1위** 를 달성했으며, 50가지 모든 작업에서 **26%의 q-score** 를 기록했습니다. 특히 **그리퍼 열림 보정 규칙** 은 특정 작업에서 그리퍼 관련 실패 시 성공률을 **약 2배** 높이는 데 기여했습니다. 최종 제출물은 **4개의 작업별 미세 조정 체크포인트** 를 사용했습니다.

## AI 실무자를 위한 시사점
본 연구는 **VLA 모델** 이 복잡하고 장기적인 로봇 제어 문제를 해결하는 데 효과적임을 입증하며, 실제 로봇 애플리케이션 개발에 중요한 시사점을 제공합니다. **상관 관계 노이즈, 단계 추적, 학습 가능한 어텐션 메커니즘** 과 같은 혁신적인 방법론은 **흐름 매칭 기반 정책** 의 훈련 효율성과 견고성을 크게 향상시킬 수 있습니다. 또한, **사전 훈련된 VLA 모델** 의 중요성을 강조하며, 대규모 웹 데이터로 사전 훈련하고 로봇 작업에 미세 조정하는 패러다임이 실용적인 접근 방식임을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.