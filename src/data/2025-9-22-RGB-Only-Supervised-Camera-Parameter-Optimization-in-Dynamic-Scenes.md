---
title: "[논문리뷰] RGB-Only Supervised Camera Parameter Optimization in Dynamic Scenes"
excerpt: "Narendra Ahuja이 [arXiv]에 게시한 'RGB-Only Supervised Camera Parameter Optimization in Dynamic Scenes' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Camera Parameter Optimization
  - Dynamic Scenes
  - RGB-Only Supervision
  - Structure from Motion
  - Outlier Robustness
  - 3D Gaussian Splatting
  - Two-stage Optimization
  - Point Tracking

permalink: /ai/review/2025-9-22-RGB-Only-Supervised-Camera-Parameter-Optimization-in-Dynamic-Scenes/

toc: true
toc_sticky: true

date: 2025-09-22 13:11:29+0900
last_modified_at: 2025-09-22 13:11:29+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15123)

**저자:** Fang Li, Hao Zhang, Narendra Ahuja



## 핵심 연구 목표
본 연구는 동적 장면에서 카메라 파라미터(초점 거리, 회전, 번역)를 효율적이고 정확하게 최적화하는 것을 목표로 합니다. 기존 **COLMAP** 방법의 긴 런타임과 동적 장면에서의 **GT(Ground Truth) 모션 마스크** 의존성 한계를 극복하고, 오직 **RGB 영상**만을 감독 정보로 사용하여 이 문제를 해결하고자 합니다.

## 핵심 방법론
제안하는 **ROS-Cam**은 세 가지 핵심 구성 요소로 이루어져 있습니다. 첫째, **패치별 추적 필터(Patch-wise Tracking Filters)**를 통해 사전 훈련된 **포인트 추적(PT) 모델(CoTracker)**을 기반으로 강건하고 희소한 의사 감독 정보를 추출하여 부정확한 추적 궤적과 밀집 예측의 문제를 회피합니다. 둘째, **이상치 인식 공동 최적화(Outlier-aware Joint Optimization)** 기법은 **Cauchy 분포**로 불확실성을 모델링하고, 새로운 **평균 누적 투영(ACP) 오차** 및 **Cauchy 손실 함수**를 도입하여 움직이는 이상치의 영향을 완화합니다. 셋째, **두 단계 최적화 전략(Two-stage Optimization Strategy)**을 통해 국소 최저점 수렴을 방지하고 최적화 속도와 안정성을 향상시킵니다.

## 주요 결과
**ROS-Cam**은 RGB 전용 감독 방식 중 가장 뛰어난 성능을 달성했으며, **GT 초점 거리**나 **모션 프라이어**를 사용하는 다른 방법들과도 경쟁할 만하거나 더 우수합니다. 특히, **NeRF-DS 데이터셋**에서 **PSNR 33.552**, **SSIM 0.938**, **LPIPS 0.118**로 최상의 NVS(Novel View Synthesis) 성능을 기록했습니다. 런타임 측면에서 **NeRF-DS**에서 **0.83시간**으로 **casualSAM의 10.5시간**보다 훨씬 효율적이며, **COLMAP**의 기하급수적 증가와 달리 프레임 수에 대해 선형적인 런타임 증가를 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **GT 감독 정보가 없는 동적 장면**에서 카메라 파라미터를 최적화하는 강력하고 효율적인 **RGB 전용 솔루션**을 제공합니다. 이는 **4DGS(4D Gaussian Splatting)**와 같은 후속 3D 재구성 또는 NVS 작업에서 카메라 추정 정확도와 효율성을 크게 향상시킬 수 있습니다. 특히, **자동화된 대규모 데이터 처리** 및 **실시간 애플리케이션** 개발에 있어, 이상치에 강건하고 낮은 연산 비용을 가진 **ROS-Cam**은 중요한 기여를 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.