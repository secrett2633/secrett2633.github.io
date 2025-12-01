---
title: "[논문리뷰] Snap-Snap: Taking Two Images to Reconstruct 3D Human Gaussians in
  Milliseconds"
excerpt: "Chuiyun Wu이 [arXiv]에 게시한 'Snap-Snap: Taking Two Images to Reconstruct 3D Human Gaussians in
  Milliseconds' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Human Reconstruction
  - Gaussian Splatting
  - Sparse View
  - Two-Image Input
  - Real-time Inference
  - Point Cloud Prediction
  - Feed-forward Network

permalink: /ai/review/2025-8-22-Snap-Snap-Taking-Two-Images-to-Reconstruct-3D-Human-Gaussians-in-Milliseconds/

toc: true
toc_sticky: true

date: 2025-08-22 13:10:52+0900
last_modified_at: 2025-08-22 13:10:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.14892)

**저자:** Jia Lu, Taoran Yi, Jiemin Fang, Chen Yang, Chuiyun Wu, Wei Shen, Wenyu Liu, Qi Tian, Xinggang Wang



## 핵심 연구 목표
본 연구는 극도로 희소한 입력(전면 및 후면 이미지 단 두 장)만으로 3D 인체 가우시안을 재구성하는 도전적인 문제를 해결하고자 합니다. 기존 방법론의 고비용 데이터 수집 및 긴 처리 시간의 한계를 극복하고, 사용자 친화적인 방식으로 디지털 휴먼 생성을 위한 문턱을 낮추는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **Snap-Snap** 은 **DUSt3R [44]** 기반의 **기하학적 재구성 모델 (R_p)** 을 재설계하여 전면, 후면 이미지로부터 일관된 4개 시점(전, 후, 좌, 우)의 포인트 클라우드를 예측합니다. 특히, 보이지 않는 측면 뷰의 색상 정보를 보완하기 위해 **최근접 이웃 탐색(NNS)** 기반의 **측면 뷰 강화 알고리즘** 을 적용합니다. 최종적으로 컬러 포인트 클라우드는 **가우시안 속성 회귀 네트워크 (F_g)** 를 통해 3D 가우시안으로 직접 변환됩니다.

## 주요 결과
본 방법은 **1024x1024 해상도 이미지 두 장** 을 사용하여 **NVIDIA RTX 4090** 에서 **190ms** 만에 전체 인체를 재구성합니다. **THuman2.0** 데이터셋에서 **PSNR 22.44, SSIM 88.78, LPIPS 13.24** 를 달성하여 기존 SOTA 방법론 대비 우수하거나 경쟁력 있는 성능을 보였으며, 특히 **GHG** 대비 훨씬 빠른 추론 속도를 제공합니다. 저비용 모바일 기기 이미지에도 잘 작동함을 입증했습니다.

## AI 실무자를 위한 시사점
**두 장의 이미지** 만으로 **밀리초 단위의 실시간 추론** 을 가능하게 하여 3D 휴먼 아바타 생성 및 재구성의 접근성을 혁신적으로 높였습니다. **SMPL-X** 와 같은 명시적인 인간 신체 사전 정보 없이 **feed-forward** 방식으로 작동하여 일반화 능력을 향상시키고 파이프라인을 간소화합니다. 이는 AR/VR, 게임, 메타버스 등에서 개인화된 3D 디지털 휴먼 생성 및 활용을 위한 강력한 기반을 제공할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.