---
title: "[논문리뷰] ARTDECO: Towards Efficient and High-Fidelity On-the-Fly 3D
  Reconstruction with Structured Scene Representation"
excerpt: "이 [arXiv]에 게시한 'ARTDECO: Towards Efficient and High-Fidelity On-the-Fly 3D
  Reconstruction with Structured Scene Representation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Reconstruction
  - Monocular SLAM
  - Gaussian Splatting
  - Level of Detail (LoD)
  - Feed-Forward Models
  - Structured Scene Representation
  - Real-time
  - High-Fidelity

permalink: /ai/review/2025-10-10-ARTDECO-Towards-Efficient-and-High-Fidelity-On-the-Fly-3D-Reconstruction-with-Structured-Scene-Representation/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08551)

**저자:** Guanghao Li, Kerui Ren, Linning Xu, Zhewen Zheng, Changjian Jiang, Xin Gao, Bo Dai, Jian Pu, Mulin Yu, Jiangmiao Pang



## 핵심 연구 목표
본 논문은 단안 이미지 시퀀스에서 **고효율 및 고품질의 실시간 3D 재구성** 을 달성하는 것을 목표로 합니다. 기존 **per-scene 최적화** 방식의 높은 계산 비용과 **feed-forward 모델** 의 정확도 및 견고성 부족이라는 주요 트레이드오프를 해결하고자 합니다. 궁극적으로 실제 환경의 **정확한 기하학적 구조와 높은 시각적 충실도** 를 갖춘 **on-the-fly 디지털화** 를 위한 실용적인 경로를 제시합니다.

## 핵심 방법론
ARTDECO는 **feed-forward 모델의 효율성** 과 **SLAM 기반 파이프라인의 신뢰성** 을 결합한 통합 프레임워크를 제안합니다. **3D foundation models** 인 **MASt3R** 와 **$\pi^3$** 를 사용하여 포즈 추정 및 포인트 예측을 수행하며, 이를 **Gaussian decoder** 가 다중 스케일 특징을 **구조화된 3D Gaussian** 으로 변환합니다. 확장성과 효율성을 위해 **LoD(Level-of-Detail)를 고려한 계층적 Gaussian 표현** 및 렌더링 전략을 설계하여 중복성을 줄이고 충실도를 높였습니다.

## 주요 결과
ARTDECO는 **8가지 다양한 실내외 벤치마크** 에서 **SLAM과 유사한 대화형 성능** 과 **feed-forward 시스템과 동등한 견고성** 을 입증했습니다. ScanNet++ 데이터셋에서 **29.12 PSNR, 0.918 SSIM, 0.167 LPIPS** 를 달성하여 기존 방식들을 뛰어넘는 재구성 품질을 보여주었습니다. 또한, **OnTheFly-NVS** 를 제외한 모든 3DGS 기반 시스템보다 빠른 런타임을 제공하며, **5.33분** (ScanNet++) 및 **6.58분** (MatrixCity)의 평균 훈련 시간을 기록했습니다.

## AI 실무자를 위한 시사점
ARTDECO는 **실시간 3D 재구성** 이 필요한 AR/VR, 로봇 공학, 디지털 트윈과 같은 응용 분야에 실질적인 해결책을 제시합니다. **feed-forward 모델과 SLAM의 장점을 결합** 함으로써 효율성, 견고성, 품질 간의 균형을 효과적으로 달성했습니다. 다만, **feed-forward foundation 모델** 의 한계로 노이즈, 블러, 조명 변화, 훈련 분포 외 입력에 대한 견고성 부족은 향후 연구를 통해 개선될 여지가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.