---
title: "[논문리뷰] CATS-V2V: A Real-World Vehicle-to-Vehicle Cooperative Perception Dataset with Complex Adverse Traffic Scenarios"
excerpt: "Juyoung Oh이 [arXiv]에 게시한 'CATS-V2V: A Real-World Vehicle-to-Vehicle Cooperative Perception Dataset with Complex Adverse Traffic Scenarios' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Cooperative Perception
  - Vehicle-to-Vehicle (V2V)
  - Autonomous Driving
  - Dataset
  - Adverse Traffic Scenarios
  - Sensor Fusion
  - Temporal Alignment
  - 3D Bounding Box Annotation

permalink: /ai/review/2025-11-17-CATS-V2V_A_Real-World_Vehicle-to-Vehicle_Cooperative_Perception_Dataset_with_Complex_Adverse_Traffic_Scenarios/

toc: true
toc_sticky: true

date: 2025-11-17 00:00:00+0900+0900
last_modified_at: 2025-11-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.11168)

**저자:** Hangyu Li, Bofeng Cao, Zhaohui Liang, Wuzhen Li, Juyoung Oh, et al.



## 핵심 연구 목표
본 논문은 기존 V2V 협력 인지 데이터셋이 주로 일반적인 교통 시나리오에 초점을 맞추어 **Complex Adverse Traffic Scenarios (CATS)** 하에서의 협력 인지 연구에 한계가 있음을 지적합니다. 이를 해결하기 위해 실제 환경의 악조건 속에서 차량-대-차량(V2V) 협력 인지를 위한 최초의 고품질 데이터셋인 **CATS-V2V**를 구축하고, 정밀한 시간 동기화와 시공간 정렬을 지원하는 것을 목표로 합니다.

## 핵심 방법론
이 데이터셋은 **하드웨어적으로 시간 동기화된 두 대의 차량**을 사용하여 수집되었으며, 각 차량에는 **10 Hz LiDAR, 7개의 멀티뷰 30 Hz 카메라, 125 Hz 관성항법장치(INS)**가 장착되었습니다. **10가지 날씨 및 조명 조건**과 **10개 지역**에서 데이터가 수집되었으며, 객체에 대한 **시간 일관적인 3D 바운딩 박스**와 **정적 HD 맵**이 제공됩니다. 특히, 센서 모달리티 간의 정렬 정확도를 극대화하기 위해 **타겟 기반 temporal alignment 방법론**이 제안되었습니다.

## 주요 결과
제안된 **타겟 기반 temporal alignment 방법론**은 기존 스탬프 기반 및 프레임 기반 정렬 방식 대비 월등한 성능 향상을 보였습니다. 정량적 평가에서 **평균 IoU 0.4623 (↑23.7%)**, **Recall@IoU=0.7 0.2768 (↑136%)**를 달성했으며, 중심점 오차는 **49.76 px (↓19.1%)**로 가장 낮았습니다. 이는 모달리티 간의 기하학적 일관성이 크게 향상되었음을 의미합니다.

## AI 실무자를 위한 시사점
**CATS-V2V 데이터셋**은 자율주행 시스템의 강건성을 높이는 데 필수적인 **악천후 및 복잡한 교통 시나리오**에서의 V2V 협력 인지 연구를 위한 전례 없는 리소스를 제공합니다. 데이터셋의 **정밀한 1ms 시간 동기화**와 **타겟 기반 temporal alignment 방법론**은 멀티모달 센서 퓨전 및 3D 객체 인식 모델 개발 시 데이터 품질의 중요성을 강조합니다. 이 데이터는 객체 탐지, 추적, 경로 예측 및 고정밀 매핑 등 광범위한 자율주행 태스크에 즉시 활용 가능합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.