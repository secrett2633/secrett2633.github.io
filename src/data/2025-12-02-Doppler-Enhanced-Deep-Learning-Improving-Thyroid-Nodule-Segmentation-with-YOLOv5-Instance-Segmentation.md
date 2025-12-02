---
title: "[논문리뷰] Doppler-Enhanced Deep Learning: Improving Thyroid Nodule Segmentation with YOLOv5 Instance Segmentation"
excerpt: "MElHuseyni이 [arXiv]에 게시한 'Doppler-Enhanced Deep Learning: Improving Thyroid Nodule Segmentation with YOLOv5 Instance Segmentation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - YOLOv5
  - Instance Segmentation
  - Thyroid Nodule
  - Ultrasound Imaging
  - Doppler Imaging
  - Medical AI
  - Deep Learning

permalink: /ai/review/2025-12-02-Doppler-Enhanced-Deep-Learning-Improving-Thyroid-Nodule-Segmentation-with-YOLOv5-Instance-Segmentation/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.00639)

**저자:** Mahmoud El Hussieni



## 핵심 연구 목표
본 연구는 초음파 이미지에서 **YOLOv5 알고리즘** 을 활용하여 갑상선 결절의 정확한 **인스턴스 분할(instance segmentation)** 성능을 향상시키는 것을 목표로 합니다. 특히, 임상적으로 종종 배제되는 **도플러 이미지(Doppler images)** 가 분할 성능에 미치는 영향을 체계적으로 평가하여 자동화된 진단 시스템의 개발 가능성을 탐구합니다.

## 핵심 방법론
다양한 **YOLOv5 변형 모델(Nano, Small, Medium, Large, XLarge)** 을 사용하여 갑상선 결절 분할을 수행했습니다. 데이터셋은 **도플러 이미지가 포함된 V1** 과 **도플러 이미지가 제외된 V2** 두 가지 버전으로 구성되었으며, 80% 훈련, 15% 검증, 5% 테스트 분할이 적용되었습니다. 모델 훈련에는 **Focal Loss** 와 **Cosine LR Scheduler** 가 사용되었고, **이미지 크기는 720** 으로 설정되었습니다.

## 주요 결과
**YOLOv5-Large** 모델이 도플러 이미지가 포함된 **V1 데이터셋** 에서 가장 높은 성능인 **91%의 Dice score** 와 **0.87 mAP** 를 달성했습니다. 도플러 이미지를 포함했을 때 모든 모델 변형에서 분할 성능이 크게 향상되었으며, 특히 **YOLOv5-Large** 의 경우 도플러 이미지를 포함하지 않은 V2 대비 **19.7%의 Dice score 향상(0.91 vs 0.76)** 을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 의사들이 일반적으로 배제하는 **도플러 이미지가 갑상선 결절 분할 성능을 획기적으로 개선** 할 수 있음을 입증하여, 의료 AI 시스템 개발 시 데이터셋 구성에 대한 새로운 접근 방식을 제시합니다. **YOLOv5 모델** 의 실시간 처리 능력과 효율성은 모바일 또는 엣지 컴퓨팅 환경에서의 임상 배포 가능성을 높이며, **YOLOv5-Medium** 과 같은 중간 크기 모델도 **90%의 Dice score** 로 효율성과 정확성 사이의 좋은 균형을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.