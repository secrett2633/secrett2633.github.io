---
title: "[논문리뷰] Depth Any Panoramas: A Foundation Model for Panoramic Depth Estimation"
excerpt: "Wenxuan Lu이 arXiv에 게시한 'Depth Any Panoramas: A Foundation Model for Panoramic Depth Estimation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Panoramic Depth Estimation
  - Foundation Model
  - Semi-Supervised Learning
  - Pseudo-Labeling
  - Data-in-the-Loop
  - DINOv3
  - Metric Depth
  - 360-degree Vision

permalink: /ai/review/2025-12-19-Depth-Any-Panoramas-A-Foundation-Model-for-Panoramic-Depth-Estimation/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16913)

**저자:** Xin Lin, Meixi Song, Dizhe Zhang, Wenxuan Lu, Haodong Li, Bo Du, Ming-Hsuan Yang, Truong Nguyen, Lu Qi



## 핵심 연구 목표
본 연구는 파노라마 깊이 추정의 핵심 과제인 다양한 장면과 거리에서의 일반화 및 측정 일관성 부족 문제를 해결하는 것을 목표로 합니다. 대규모 데이터셋 구축과 효과적인 모델 설계를 위한 **데이터-인-더-루프(data-in-the-loop) 패러다임** 을 탐구하여, 견고하고 측정적으로 일관된 파노라마 깊이 추정을 수행하는 **기초 모델(DAP)** 을 제안합니다.

## 핵심 방법론
저자들은 **대규모 데이터 엔진** 을 구축하여 공공 데이터셋, **UE5 AirSim360 시뮬레이터** 및 **텍스트-투-이미지 모델** 을 통해 생성된 합성 데이터를 웹에서 수집한 실제 파노라마 이미지와 결합해 **2M개 이상의 파노라마** 데이터를 확보했습니다. **3단계 유사 레이블(pseudo-label) 큐레이션 파이프라인** 을 도입하여 초기 **Scene-Invariant Labeler** 와 신뢰도 높은 샘플로 훈련된 **Realism-Invariant Labeler** 를 통해 실제 레이블이 없는 이미지에 대한 신뢰성 높은 유사 레이블을 생성했습니다. 모델 설계는 **DINOv3-Large** 를 시각적 백본으로 사용하고, **플러그-앤-플레이 레인지 마스크 헤드** 및 **기하학적/선명도 중심 최적화 손실** ( **LDF** , **Lgrad** , **Lnormal** , **Lpts** )을 통해 다양한 거리와 왜곡을 처리합니다.

## 주요 결과
제안된 DAP 모델은 Stanford2D3D, Matterport3D, Deep360 등 다양한 실내외 벤치마크에서 **파인튜닝 없이** 일관되게 최첨단 제로샷 성능을 달성했습니다. 특히 Deep360 벤치마크에서는 **AbsRel 0.0659** , **RMSE 5.224** , **δ1 0.9525** 를 기록하며 다른 방법론들을 능가했습니다. 자체 구축한 DAP-Test 벤치마크에서도 **AbsRel 0.0781** , **RMSE 6.804** , **δ1 0.9370** 를 달성하여 데이터 스케일링 및 도메인 일관된 훈련의 효과를 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 파노라마 깊이 추정 분야에서 **파운데이션 모델** 의 강력한 일반화 가능성을 보여주며, **대규모 비레이블 데이터를 효과적으로 활용** 하는 **데이터-인-더-루프 및 유사 레이블링 파이프라인** 을 제시합니다. 이는 로봇 공학, VR/AR, 공간 지능 등 실제 애플리케이션에서 비용이 많이 드는 레이블링 없이 견고하고 측정적으로 일관된 깊이 추정 모델을 개발하는 데 중요한 방향을 제공합니다. 특히 **DINOv3-Large** 와 결합된 태스크별 헤드는 다양한 환경에 대한 실용적인 접근 방식을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.