---
title: "[논문리뷰] Real-Time Object Detection Meets DINOv3"
excerpt: "Xi Shen이 [arXiv]에 게시한 'Real-Time Object Detection Meets DINOv3' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Real-time Object Detection
  - DINOv3
  - DEIMv2
  - Vision Transformer
  - Multi-scale Features
  - Spatial Tuning Adapter
  - Lightweight Models
  - Object Detection Framework

permalink: /ai/review/2025-9-29-Real-Time-Object-Detection-Meets-DINOv3/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.20787)

**저자:** Shihua Huang, Yongjie Hou, Longfei Liu, Xuanlong Yu, Xi Shen



## 핵심 연구 목표
본 논문은 실시간 객체 탐지 분야에서 성능과 연산 효율성 사이의 균형을 개선하고, 특히 경량 모델을 위한 엣지 및 모바일 환경에서의 배포 효율성을 높이는 것을 목표로 합니다. **DINOv3** 의 강력한 특징 표현 능력을 **DEIM** 파이프라인에 효과적으로 통합하여, 다양한 모델 스케일에서 최고 수준의 성능-비용 균형을 달성하는 **DEIMv2** 를 제안합니다.

## 핵심 방법론
**DEIMv2** 는 **DINOv3** 사전 훈련/증류된 **ViT 백본** 과 새롭게 제안된 **Spatial Tuning Adapter (STA)** 를 활용합니다. **STA** 는 **DINOv3** 의 단일 스케일 출력을 효율적으로 다중 스케일 특징으로 변환하고, **Bi-Fusion operator** 를 통해 세부 정보를 보완합니다. 초경량 모델의 경우 **HGNetv2** 백본을 깊이 및 폭 가지치기(pruning)하여 최적화했으며, 디코더를 **SwishFFN** 및 **RMSNorm** 으로 간소화하고 **Dense O2O** 를 **Copy-Blend augmentation** 으로 강화했습니다.

## 주요 결과
**DEIMv2-X** 는 **50.3M 파라미터** 로 **57.8 AP** 를 달성하여 기존 최상위 모델들을 능가했습니다. **DEIMv2-S** 는 **9.71M 파라미터** 로 **COCO** 에서 최초로 **50 AP** 를 돌파하여 **50.9 AP** 를 기록했습니다. 특히 초경량 모델인 **DEIMv2-Pico** 는 **1.5M 파라미터** 로 **38.5 AP** 를 달성, **YOLOv10-Nano (2.3M 파라미터)** 와 동등한 성능을 약 **50% 적은 파라미터** 로 달성하여 새로운 효율성 기준을 제시했습니다.

## AI 실무자를 위한 시사점
본 연구는 **DINOv3** 와 같은 Vision Transformer 백본이 실시간 객체 탐지에서 뛰어난 성능과 효율성을 제공할 수 있음을 입증했습니다. **Spatial Tuning Adapter** 는 강력한 단일 스케일 시맨틱 특징을 다중 스케일 세부 특징으로 효과적으로 변환하는 실용적인 방법을 제공합니다. 다양한 파라미터 및 FLOP 예산에 맞춰 GPU, 엣지, 모바일 등 광범위한 배포 시나리오에 적합한 모델을 선택할 수 있는 유연한 프레임워크를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.