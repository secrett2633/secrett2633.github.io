---
title: "[논문리뷰] Mask-to-Height: A YOLOv11-Based Architecture for Joint Building Instance
  Segmentation and Height Classification from Satellite Imagery"
excerpt: "Oğuz Hanoğlu이 [arXiv]에 게시한 'Mask-to-Height: A YOLOv11-Based Architecture for Joint Building Instance
  Segmentation and Height Classification from Satellite Imagery' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Building Instance Segmentation
  - Height Classification
  - YOLOv11
  - Satellite Imagery
  - Multitask Learning
  - Remote Sensing
  - Urban Planning

permalink: /ai/review/2025-11-3-Mask-to-Height-A-YOLOv11-Based-Architecture-for-Joint-Building-Instance-Segmentation-and-Height-Classification-from-Satellite-Imagery/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.27224)

**저자:** Mahmoud El Hussieni, Bahadır K. Güntürk, Hasan F. Ateş, Oğuz Hanoğlu



## 핵심 연구 목표
도시 계획, 3D 도시 모델링 및 인프라 모니터링에 필수적인 건물 인스턴스 분할 및 높이 분류의 정확도를 높이는 것을 목표로 합니다. 특히, 연속적인 높이 회귀 대신 **이산적인 높이 분류** 를 통해 실제 도시 계획 요구사항에 더 잘 부합하고 노이즈에 강한 통합 프레임워크를 제시합니다.

## 핵심 방법론
최신 **YOLOv11 아키텍처** 를 기반으로 위성 이미지에서 건물 인스턴스 분할과 높이 분류를 동시에 수행합니다. **DFC2023 Track 2 데이터셋** 의 raw DSM 데이터를 **5가지 이산 높이 범주** 로 분류하고 **YOLOv11 호환 주석** 으로 변환하는 전처리 파이프라인을 구축했으며, **Focal Loss** 와 **적응적 클래스 가중치 전략** 을 사용하여 클래스 불균형을 완화했습니다.

## 주요 결과
제안된 모델은 **DFC2023 검증 세트** 에서 건물 분할에 대해 **84.2% mAP@50** 및 **56% mAP@50–95** 의 뛰어난 성능을 달성했습니다. 높이 분류에서는 **61.2% mAP@50(B)** 및 **60.4% mAP@50(M)** 을 기록했으며, 특히 전체 데이터셋의 3.1%에 불과한 희귀한 고층 건물(Class 5)에 대해서도 **67.5% mAP@50(B)** 및 **66.7% mAP@50(M)** 의 강력한 성능을 보여주었습니다.

## AI 실무자를 위한 시사점
**YOLOv11** 은 복잡하고 대규모의 실시간 지리공간 분석, 특히 도시 매핑에 매우 효과적임을 입증했습니다. **이산적인 높이 분류 접근 방식** 은 기존 연속 회귀 방식 대비 노이즈에 강하고 해석 및 배포가 용이한 실용적인 대안을 제공하며, **클래스 불균형** 처리를 위한 **Focal Loss** 및 **적응적 가중치 전략** 은 실제 데이터셋에서 필수적인 기법입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.