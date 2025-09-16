---
title: "[논문리뷰] OmniWorld: A Multi-Domain and Multi-Modal Dataset for 4D World Modeling"
excerpt: "Yang Zhou이 [arXiv]에 게시한 'OmniWorld: A Multi-Domain and Multi-Modal Dataset for 4D World Modeling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 4D World Modeling
  - Multi-Modal Dataset
  - Multi-Domain Data
  - Geometric Foundation Models
  - Video Generation
  - Spatio-Temporal Data
  - Dataset Benchmark

permalink: /ai/review/2025-9-16-OmniWorld_A_Multi-Domain_and_Multi-Modal_Dataset_for_4D_World_Modeling/

toc: true
toc_sticky: true

date: 2025-09-16 13:16:41+0900
last_modified_at: 2025-09-16 13:16:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.12201)

**저자:** Yang Zhou, Yifan Wang, Jianjun Zhou, Wenzheng Chang, Haoyu Guo, Zizun Li, Kaijing Ma, Xinyue Li, Yating Wang, Haoyi Zhu, Mingyu Liu, Dingning Liu, Jiange Yang, Zhoujie Fu, Junyi Chen, Chunhua Shen, Jiangmiao Pang, Kaipeng Zhang, Tong He



## 핵심 연구 목표
논문은 **4D 세계 모델링**을 위한 고품질 데이터 부족 문제를 해결하는 것을 목표로 합니다. 기존 데이터셋의 동적 복잡성, 다중 도메인 다양성, 시공간 주석 부족으로 인해 **4D 기하학 재구성**, **미래 예측**, **카메라 제어 비디오 생성**과 같은 핵심 태스크에 대한 일반적인 4D 세계 모델 개발이 제한되는 한계를 극복하고자 합니다.

## 핵심 방법론
저자들은 대규모, 다중 도메인, 다중 모달 데이터셋인 **OmniWorld**를 제안합니다. 이 데이터셋은 자체 수집한 **OmniWorld-Game** 합성 데이터와 로봇, 인간, 인터넷 등 다양한 공공 데이터셋을 통합하여 구성됩니다. **OmniWorld-Game**은 **RGB 이미지**, **심도 맵**, **카메라 포즈**, **텍스트 캡션**, **옵티컬 플로우**, **전경 마스크** 등 풍부한 모달리티와 **18.5M+ 프레임** 이상의 대규모 데이터, 그리고 현실적인 동적 상호작용을 특징으로 합니다.

## 주요 결과
**OmniWorld-Game**은 **214시간** 분량의 **96K 클립**과 **18.5M+ 프레임**으로, 기존 합성 데이터셋을 모달리티 다양성과 규모 면에서 크게 능가합니다. **OmniWorld**로 사전 훈련된 **DUSt3R**는 Sintel 벤치마크에서 단안 심도 추정 **Abs Rel을 0.488에서 0.370으로**, **CUT3R**는 비디오 심도 추정 **Abs Rel을 0.537에서 0.314로** 개선하며 상당한 성능 향상을 보였습니다. 카메라 제어 비디오 생성 태스크에서도 **AC3D**는 RealEstate10K에서 **TransErr를 3.4433에서 2.8648로** 감소시키며 개선된 카메라 제어 정확도를 입증했습니다.

## AI 실무자를 위한 시사점
**OmniWorld**는 **4D 세계 모델링** 연구를 위한 매우 가치 있는 **대규모, 다중 도메인, 다중 모달 데이터셋**으로, 특히 **정확한 기하학적 주석**이 필요한 모델 훈련에 필수적인 자원입니다. 이 데이터셋은 **복잡한 동적 환경**에서 **3D 기하학 파운데이션 모델** 및 **카메라 제어 비디오 생성 모델**의 성능 한계를 드러내고 개선하는 데 효과적인 벤치마크를 제공합니다. 실무자들은 **OmniWorld**를 활용하여 기존 SOTA 모델의 성능을 크게 향상시키고, 궁극적으로 물리 세계를 더 잘 이해하고 상호작용하는 **일반 목적 4D 세계 모델** 개발을 가속화할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.