---
title: "[논문리뷰] Finding 3D Positions of Distant Objects from Noisy Camera Movement and
  Semantic Segmentation Sequences"
excerpt: "Eija Honkavaara이 [arXiv]에 게시한 'Finding 3D Positions of Distant Objects from Noisy Camera Movement and
  Semantic Segmentation Sequences' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Object Localization
  - Particle Filter
  - Multi-target Tracking
  - Drone Surveillance
  - Wildfire Monitoring
  - Semantic Segmentation
  - Camera Pose Estimation

permalink: /ai/review/2025-9-29-Finding-3D-Positions-of-Distant-Objects-from-Noisy-Camera-Movement-and-Semantic-Segmentation-Sequences/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.20906)

**저자:** Julius Pesonen, Arno Solin, Eija Honkavaara



## 핵심 연구 목표
본 연구는 노이즈가 있는 카메라 움직임과 시맨틱 세그멘테이션 시퀀스로부터 원거리 객체의 3D 위치를 찾는 문제를 해결하는 것을 목표로 합니다. 특히, 드론 기반 산불 모니터링과 같이 컴퓨팅 자원이 제한적이거나 객체가 멀리 떨어져 있는 시나리오에서 기존의 3D 재구성 또는 깊이 추정 방법의 한계를 극복하고자 합니다.

## 핵심 방법론
객체 위치 추정을 위해 베이시안 필터, 특히 **파티클 필터** 를 사용합니다. 단일 타겟 시나리오에서는 두 관측치 간의 **최소 제곱 추정치** 로 초기화된 후, **가우시안 노이즈** 를 주입하고 예측된 파티클과 관측치 간의 픽셀 거리를 기반으로 가중치를 부여합니다. 다중 타겟 시나리오는 **여러 개의 파티클 필터** 를 독립적으로 사용하여 해결하며, 시뮬레이션 및 드론으로 캡처된 실제 이미지 시퀀스를 통해 검증되었습니다.

## 주요 결과
시뮬레이션 결과, 노이즈가 있는 환경에서도 단일 타겟의 최소 **RMSE는 36.93m에서 80.00m** (2km 거리에서 약 1.8%~4% 상대 오차) 범위를 보였습니다. 실제 데이터셋(통신탑) 테스트에서는 약 700m 거리에서 최소 평균 **RMSE 76.88m** 를 달성하여, 카메라 포즈 및 세그멘테이션 노이즈에도 불구하고 지면 평면에서 **15% 미만의 상대 RMSE** 를 기록했습니다. 특히 **부분적 오탐(partial false negatives)** 이 정확도에 가장 부정적인 영향을 미쳤습니다.

## AI 실무자를 위한 시사점
본 연구는 **파티클 필터** 가 노이즈가 많은 드론 카메라 데이터와 **시맨틱 세그멘테이션** 을 활용하여 장거리 3D 객체를 효과적으로 위치 추정할 수 있음을 입증합니다. 이 방법은 산불 모니터링과 같이 실시간 온보드 처리 및 정교한 3D 재구성이 어려운 안전 중요 애플리케이션에 특히 유용합니다. 그러나 안정적인 성능을 위해서는 **고품질의 세그멘테이션 출력** 과 **노이즈에 대한 견고한 파라미터 튜닝** 이 중요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.