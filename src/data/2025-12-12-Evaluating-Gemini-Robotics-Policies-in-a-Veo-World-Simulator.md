---
title: "[논문리뷰] Evaluating Gemini Robotics Policies in a Veo World Simulator"
excerpt: "arXiv에 게시된 'Evaluating Gemini Robotics Policies in a Veo World Simulator' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robotics
  - Policy Evaluation
  - World Model
  - Video Generation
  - Out-of-Distribution (OOD)
  - Safety
  - Gemini Robotics
  - Veo Simulator

permalink: /ai/review/2025-12-12-Evaluating-Gemini-Robotics-Policies-in-a-Veo-World-Simulator/

toc: true
toc_sticky: true

date: 2025-12-12 00:00:00+0900+0900
last_modified_at: 2025-12-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.10675)

**저자:** Coline Devin, Yilun Du, Debidatta Dwibedi, Ruiqi Gao, Abhishek Jindal, Thomas Kipf, Sean Kirmani, Fangchen Liu, Anirudha Majumdar, Andrew Marmon, Carolina Parada, Yulia Rubanova, Dhruv Shah, Vikas Sindhwani, Jie Tan, Fei Xia, Ted Xiao, Sherry Yang, Wenhao Yu, Allan Zhou



## 핵심 연구 목표
이 논문은 현실감, 확장성, 안전성 측면에서 기존 물리 기반 시뮬레이터가 가진 한계를 극복하고, 제너럴리스트 로봇 정책 평가를 위한 새로운 방법론을 제시합니다. 특히, **생성형 비디오 모델** 을 **제너럴리스트 평가자** 로 활용하여 명목 성능, OOD(Out-of-Distribution) 일반화, 그리고 안전에 민감한 시나리오를 시뮬레이션하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **VEO(Vision-Enhanced Operations) 프론티어 비디오 파운데이션 모델(VEO2 텍스트-투-비디오 모델)** 을 기반으로 하는 생성형 평가 시스템을 소개하며, 이를 **대규모 로봇 공학 데이터셋** 으로 미세 조정하여 **로봇 액션 조건화** 및 **멀티뷰 일관성** 을 지원합니다. 이 시스템은 **생성형 이미지 편집(Gemini 2.5 Flash Image / NANOBANANA)** 및 **멀티뷰 완성** 기술을 통합하여 실제 장면의 사실적인 변형을 합성하고, 이를 통해 정책의 동작을 시뮬레이션 및 평가합니다.

## 주요 결과
VEO (Robotics) 모델은 명목 태스크에서 로봇 정책의 상대적 성능과 순위를 정확하게 예측하며, 실제 성공률과 강한 선형 상관관계( **Pearson = 0.88** , **MMRV = 0.03** )를 보였습니다. 또한, **다양한 OOD 일반화 축** (배경, 방해물, 새로운 객체)에 따른 성능 저하를 정확하게 예측하고, **예측적 레드 팀 구성** 을 통해 잠재적인 안전하지 않은 행동을 식별했습니다. 이러한 역량은 8개의 **Gemini Robotics 정책 체크포인트** 와 5가지 태스크에 대한 **1600개 이상의 실제 평가** 를 통해 검증되었습니다.

## AI 실무자를 위한 시사점
**생성형 비디오 모델** 은 로봇 정책 평가를 위한 **확장 가능하고 현실적인 시뮬레이션 환경** 을 제공하여 하드웨어 평가의 비용과 위험을 크게 줄일 수 있습니다. 특히, **이미지 편집** 을 통해 **OOD 시나리오** 및 **안전 관련 테스트 케이스** 를 효율적으로 생성하여 정책의 **강건성 및 안전성** 을 조기에 평가하는 데 활용될 수 있습니다. 다만, **접촉이 많은 상호작용 시뮬레이션** 및 **장기적인 멀티뷰 일관성** 확보는 여전히 중요한 개선 과제로 남아 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.