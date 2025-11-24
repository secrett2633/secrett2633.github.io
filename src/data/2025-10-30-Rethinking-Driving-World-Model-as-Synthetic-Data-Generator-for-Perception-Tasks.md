---
title: "[논문리뷰] Rethinking Driving World Model as Synthetic Data Generator for
  Perception Tasks"
excerpt: "이 [arXiv]에 게시한 'Rethinking Driving World Model as Synthetic Data Generator for
  Perception Tasks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Synthetic Data Generation
  - Autonomous Driving
  - Perception Tasks
  - Diffusion Models
  - 3D Asset Editing
  - World Model
  - Data Augmentation
  - nuScenes

permalink: /ai/review/2025-10-30-Rethinking-Driving-World-Model-as-Synthetic-Data-Generator-for-Perception-Tasks/

toc: true
toc_sticky: true

date: 2025-10-30 13:06:06+0900
last_modified_at: 2025-10-30 13:06:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.19195)

**저자:** Kai Zeng, Zhanqian Wu, Kaixin Xiong, Xiaobao Wei, Xiangyu Guo, Zhenxin Zhu, Kalok Ho, Lijun Zhou, Bohan Zeng, Ming Lu, Haiyang Sun, Bing Wang, Guang Chen, Hangjun Ye, Wentao Zhang



## 핵심 연구 목표
이 논문은 기존의 자율주행 월드 모델들이 합성 데이터의 효과를 **다운스트림 인지 태스크**에 대해 불공정하게 평가하고 있음을 지적합니다. 주요 목표는 **공정한 비교 조건**하에서 합성 데이터가 인지 모델의 성능을 얼마나 효과적으로 향상시킬 수 있는지 재평가하고, 이를 위한 새로운 **3D-aware 합성 데이터 생성 프레임워크인 Dream4Drive**를 제시하는 것입니다.

## 핵심 방법론
`Dream4Drive`는 입력 비디오를 여러 **3D-aware guidance maps**(깊이, 법선, 엣지 등)로 분해하고, 여기에 **3D assets**을 렌더링합니다. 이후, **Diffusion Transformer** 기반의 `driving world model`을 미세 조정하여 편집된 고품질 다중 뷰 비디오를 생성합니다. 이를 위해 **Grounded-SAM**, **Qwen-Image**, **Hunyuan3D**를 활용하여 **DriveObj3D**라는 대규모 3D asset 데이터셋을 구축하며, **multi-condition fusion adapter**를 통해 제어력을 강화합니다.

## 주요 결과
`Dream4Drive`는 **1x, 2x, 3x 훈련 epoch** 전반에 걸쳐 이전 데이터 증강 방법론을 일관되게 능가했습니다. 특히, **420개 미만의 합성 샘플(실제 데이터의 2% 미만)**만으로도 **mAP**에서 **4.6 포인트(12.7%)** 증가, **NDS**에서 **4.1 포인트(8.6%)** 증가를 달성하여 실제 데이터만으로 훈련한 경우와 이전 SOTA 방법론의 성능을 뛰어넘었습니다. 또한, 비디오 생성 품질에서 **FVD 31.84** 및 **FID 5.80**을 기록하여 다른 방법론들 중 최고 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 자율주행 인지 모델 훈련에 있어 **합성 데이터의 가치**를 재조명하고, 제한된 합성 데이터만으로도 실제 데이터 훈련의 성능을 크게 뛰어넘을 수 있는 효과적인 방법을 제시합니다. **고품질 3D assets**과 **3D-aware guidance maps**를 활용한 `Dream4Drive`는 **롱테일 코너 케이스** 생성에 탁월하여, 자율주행 시스템의 **안전성과 강건성**을 높이는 데 기여할 수 있습니다. 이는 실제 데이터 수집 및 어노테이션의 막대한 비용과 시간을 절감할 수 있는 실용적인 솔루션을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.