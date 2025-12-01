---
title: "[논문리뷰] SAM 3D: 3Dfy Anything in Images"
excerpt: "이 [arXiv]에 게시한 'SAM 3D: 3Dfy Anything in Images' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Reconstruction
  - Generative Models
  - Single Image 3D
  - Object Reconstruction
  - Scene Understanding
  - Data Engine
  - Model-in-the-Loop
  - Human Preference

permalink: /ai/review/2025-11-21-SAM-3D-3Dfy-Anything-in-Images/

toc: true
toc_sticky: true

date: 2025-11-21 00:00:00+0900+0900
last_modified_at: 2025-11-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.16624)

**저자:** SAM 3D Team, Xingyu Chen*, Fu-Jen Chu*, Pierre Gleize*, Kevin J Liang*, Alexander Sax*, Hao Tang*, Weiyao Wang*, Michelle Guo, Thibaut Hardin, Xiang Li°, Aohan Lin, Jiawei Liu, Ziqi Ma°, Anushka Sagar, Bowen Song, Xiaodong Wang, Jianing Yang, Bowen Zhang°, Piotr Dollár†, Georgia Gkioxari†, Matt Feiszl†§, Jitendra Malik†§. Meta Superintelligence Labs.



## 핵심 연구 목표
본 논문은 단일 이미지로부터 시각적으로 기반한 3D 객체 재구성을 위한 **SAM 3D** 라는 생성 모델을 제시합니다. **가려짐** 과 **장면 복잡성** 이 흔한 자연 이미지에서 객체의 **기하학적 형태, 텍스처, 레이아웃** 을 예측하여 완전한 장면 재구성을 가능하게 하는 것을 목표로 합니다. 이를 통해 3D "데이터 장벽"을 깨고 실제 환경에서의 3D 인지 능력을 향상시키고자 합니다.

## 핵심 방법론
**SAM 3D** 는 **인간-및 모델-인-루프 (MITL) 파이프라인** 을 활용하여 객체 형태, 텍스처, 포즈 주석을 전례 없는 규모로 생성합니다. 훈련은 **합성 데이터 사전 훈련(Iso-3DO, RP-3DO)** 과 **실제 데이터 정렬** 을 결합한 다단계 프레임워크를 사용하며, **지도 미세 조정(SFT)** 및 **직접 선호도 최적화(DPO)** 가 포함됩니다. 아키텍처는 **Geometry Model** 과 **Texture & Refinement Model** 로 구성된 **2단계 잠재 흐름 매칭 모델** 로, **DINOv2** 인코더를 통해 이미지를 인코딩합니다.

## 주요 결과
**SAM 3D** 는 실제 객체 및 장면에 대한 인간 선호도 테스트에서 **최소 5:1의 승률** 을 달성하며 최신 연구 대비 상당한 성능 향상을 보였습니다. 새로운 벤치마크인 **SA-3DAO** 에서 **F1@0.01 점수 0.2344** 와 **vIoU 0.2311** 를 기록하여 모든 기존 모델을 크게 능가했습니다. 레이아웃 예측에서도 **SA-3DAO** 에서 **3D IoU 0.4254** , **Aria Digital Twin** 에서 **0.4970** 를 달성하며 뛰어난 정량적 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**SAM 3D** 는 단일 이미지 3D 재구성 분야에서 **기반 모델** 로서 로봇 공학, AR/VR, 게임, 인터랙티브 미디어 등 다양한 애플리케이션에 새로운 가능성을 제시합니다. **모델-인-루프(MITL) 데이터 엔진** 과 **다단계 훈련 레시피** 는 대규모 고품질 3D 데이터 부족 문제를 해결하는 효과적인 접근 방식을 제공합니다. **합성 사전 훈련** 과 **실제 데이터 정렬** 의 조합은 복잡한 실제 환경 3D 비전 태스크에 대한 일반화 능력을 크게 향상시킬 수 있는 중요한 개발 전략입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.