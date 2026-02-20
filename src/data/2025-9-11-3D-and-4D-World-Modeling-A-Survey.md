---
title: "[논문리뷰] 3D and 4D World Modeling: A Survey"
excerpt: "Ao Liang이 arXiv에 게시한 '3D and 4D World Modeling: A Survey' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D World Modeling
  - 4D World Modeling
  - Generative Models
  - Predictive Models
  - LiDAR
  - Occupancy Grids
  - Video Generation
  - Autonomous Driving
  - Robotics

permalink: /ai/review/2025-9-11-3D-and-4D-World-Modeling-A-Survey/

toc: true
toc_sticky: true

date: 2025-09-11 13:02:36+0900
last_modified_at: 2025-09-11 13:02:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.07996)

**저자:** Lingdong Kong, Wesley Yang, Jianbiao Mei, Youquan Liu, Ao Liang, Dekai Zhu, Dongyue Lu, Wei Yin, Xiaotao Hu, Mingkai Jia, Junyuan Deng, Kaiwen Zhang, Yang Wu, Tianyi Yan, Shenyuan Gao, Song Wang, Linfeng Li, Liang Pan, Yong Liu, Jianke Zhu, Wei Tsang Ooi, Steven C.H. Hoi, Fellow, IEEE, and Ziwei Liu



## 핵심 연구 목표
본 설문조사는 3D 및 4D 세계 모델링 및 생성을 위한 최초의 포괄적인 리뷰를 제공하여, 2D 데이터 중심 연구에서 간과되었던 **RGB-D, Occupancy Grids, LiDAR Point Clouds** 와 같은 네이티브 3D 및 4D 표현의 중요성을 강조합니다. "World Model"이라는 용어의 모호성을 해소하고, 일관된 정의와 분류 체계를 수립하여 연구 발전을 위한 기반을 마련하는 것을 목표로 합니다.

## 핵심 방법론
연구는 세계 모델링 방법론을 **VideoGen, OccGen, LiDARGen** 세 가지 주요 모달리티로 분류하고, 이를 다시 **데이터 엔진, 액션 해석기, 뉴럴 시뮬레이터, 장면 재구성기** 의 네 가지 기능적 유형으로 세분화하는 **계층적 분류 체계** 를 제안합니다. 각 유형에 대해 사용되는 조건(예: **Cgeo, Cact, Csem** )과 출력(예: **Sg, S1:k** )을 명확히 정의하며, 관련 데이터셋 및 평가 프로토콜을 체계적으로 요약합니다.

## 주요 결과
설문조사에서는 **VideoGen** 모델이 **FID 6.83, FVD 22.67** (DiST-4D)로 이미지 품질을 크게 향상시켰음을 보여줍니다. **OccGen** 모델은 장면 재구성에서 **X-Scene이 92.40% mIoU** 를 달성했으며, **LiDARGen** 모델은 **WeatherGen이 FRD 184.11, FPD 11.42** 로 분포 유사성에서 우수함을 입증했습니다. 또한 **Occ-LLM이 0.12m의 L2 오류** 와 **0.49%의 충돌률** 로 motion planning에서 탁월한 성능을 기록하며, 전반적으로 기하학적 일관성과 시간적 안정성을 높이는 **구조화된 3D/4D 표현** 의 중요성을 강조합니다.

## AI 실무자를 위한 시사점
이 설문조사는 자율주행, 로봇 공학 및 몰입형 XR(확장 현실) 시뮬레이션과 같은 분야에서 **3D 및 4D 세계 모델의 실용적인 적용 가능성** 을 명확히 제시합니다. 실무자들은 **데이터 증강, 시나리오 생성, 정책 평가** 에 **기하학적 일관성** 과 **물리적 타당성** 이 필수적인 모델을 활용할 수 있습니다. 또한, **표준화된 벤치마크의 부재** 와 **장기적인 일관성 유지의 어려움** 같은 도전 과제를 인지하고, **오픈소스 생태계 및 대규모 데이터셋 구축** 에 기여하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.