---
title: "[논문리뷰] EgoActor: Grounding Task Planning into Spatial-aware Egocentric Actions for Humanoid Robots via Visual-Language Models"
excerpt: "Ziyi Bai이 [arXiv]에 게시한 'EgoActor: Grounding Task Planning into Spatial-aware Egocentric Actions for Humanoid Robots via Visual-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Humanoid Robots
  - Vision-Language Models
  - Task Planning
  - Egocentric Control
  - Mobile Manipulation
  - Active Perception
  - Human-Robot Interaction
  - Real-World Deployment

permalink: /ai/review/2026-02-05-EgoActor-Grounding-Task-Planning-into-Spatial-aware-Egocentric-Actions-for-Humanoid-Robots-via-Visual-Language-Models/

toc: true
toc_sticky: true

date: 2026-02-05 00:00:00+0900+0900
last_modified_at: 2026-02-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.04515)

**저자:** Ziyi Bai, Chaojie Li, MingMing Yu, Yu Bai, tellarin



## 핵심 연구 목표
본 논문은 인간형 로봇의 실제 환경 배포 시 발생하는 고유한 불안정성, 부분적 정보 기반의 지각/이동/조작 통합의 어려움, 그리고 동적 환경에서의 견고한 하위 태스크 전환 문제를 해결하는 것을 목표로 합니다. 이를 위해 고수준의 자연어 명령을 정밀하고 공간 인식 가능한 로봇 행동으로 직접 변환하는 새로운 태스크 `EgoActing`과, 이를 수행하는 통합 시각-언어 모델(VLM)인 **EgoActor** 를 제안합니다.

## 핵심 방법론
**EgoActor** 는 **Qwen3-VL** 기반의 **통합 VLM** 으로, 움직임, 능동 지각, 조작 및 인간 상호작용 등 다양한 저수준 실행 가능 행동을 예측합니다. 모델은 **실세계 시연 비디오** , **공간 추론 질의응답** , **시뮬레이션 환경 데이터** 를 포함하는 광범위한 데이터셋으로 훈련되며, **LoRA 기법** 을 사용하여 파인튜닝되었습니다. 정밀한 제어를 위해 **구조화된 언어 행동(SLAs)** 과 개방형 상호작용을 위한 **자연어 행동(NLAs)** 을 모두 활용하고, **8B 및 4B 파라미터 모델** 을 지원합니다.

## 주요 결과
**EgoActor-8B 모델** 은 실제 환경 휴머노이드 로봇 상호작용에서 사람에게 접근, 인사, 위치 질문 등 여러 태스크에서 **12/12 (100%) 성공률** 을 달성했습니다. 모바일 조작 벤치마크에서는 미확인 객체('Pen Holder', 'Pink Cup')에 대해 **5/6 (83.3%)에서 6/6 (100%)의 접근 및 픽업 성공률** 을 보였습니다. 좁은 공간 이동(Traversability) 벤치마크에서는 미확인 환경에서 **7/8 (87.5%)에서 8/8 (100%)의 성공률** 로 기존 기준 모델들을 능가했습니다. 가상 환경 평가에서는 목표 지점 0.5m 이내 도달 성공률 **51.4%** 를 기록하며 다른 VLN 모델 대비 높은 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**EgoActor** 는 **인간형 로봇** 이 **추상적인 태스크 계획** 을 **구체적인 저수준 모터 실행** 으로 효과적으로 전환할 수 있는 **실용적인 접근 방식** 을 제시합니다. **VLM 기반의 단일 모델** 로 이동, 지각, 조작, 인간 상호작용 등 **다양한 행동 유형을 통합** 하여 복잡한 다단계 작업을 **유연하고 견고하게 수행** 할 수 있음을 보여줍니다. 하지만, 외부 **고수준 플래너** 및 **하위 로봇 기술(예: 로코모션 정책)** 의 신뢰성에 크게 의존하므로, 완전한 **종단 간 시스템** 구축을 위해서는 이러한 구성 요소를 **단일 프레임워크로 통합** 하는 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.