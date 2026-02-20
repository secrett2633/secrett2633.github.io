---
title: "[논문리뷰] Triangle Splatting+: Differentiable Rendering with Opaque Triangles"
excerpt: "Matheus Gadelha이 arXiv에 게시한 'Triangle Splatting+: Differentiable Rendering with Opaque Triangles' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Differentiable Rendering
  - 3D Reconstruction
  - Novel View Synthesis
  - Triangles
  - Opaque Primitives
  - Game Engines
  - Gaussian Splatting
  - Mesh-based Rendering

permalink: /ai/review/2025-10-6-Triangle-Splatting-Differentiable-Rendering-with-Opaque-Triangles/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25122)

**저자:** Jan Held, Renaud Vandeghen, Sanghyun Son, Daniel Rebain, Matheus Gadelha, Yi Zhou, Ming C. Lin, Marc Van Droogenbroeck, Andrea Tagliasacchi



## 핵심 연구 목표
기존 **Neural Radiance Fields (NeRF)** 나 **3D Gaussian Splatting (3DGS)** 과 같은 연속적 볼륨 또는 가우시안 프리미티브 기반의 3D 재구성 방법들이 메시 기반 그래픽스 파이프라인(예: 게임 엔진, VR 헤드셋)과 비호환적인 문제를 해결하는 것을 목표로 합니다. 특히, 이전의 삼각형 기반 접근법인 **Triangle Splatting** 이 생성한 반투명하고 독립적인 삼각형들이 실제 엔진에서 시각적 품질 저하를 일으키는 한계를 극복하고, **불투명하고 부분적으로 연결된 삼각형** 을 직접 최적화하여 고품질의 출력을 얻는 것을 목적으로 합니다.

## 핵심 방법론
**Triangle Splatting+** 는 **공유 정점 기반의 삼각형 파라미터화** 를 통해 연결성을 확보합니다. 학습 중에는 **부드러움 파라미터(σ)를 0.0001로 점진적으로 낮추고 불투명도 임계값(Ot)을 높이는 전략** 을 사용하여 **불투명 삼각형** 을 강제합니다. 중복되거나 불필요한 삼각형을 제거하기 위해 **초기 5k iteration 후 하드 프루닝(opacity < 0.2)** 및 **블렌딩 가중치 기반 프루닝** 을 수행하며, **미드포인트 세분화** 를 통해 새로운 삼각형과 정점을 추가합니다. 최종 손실 함수는 **포토메트릭 L1 및 LD-SSIM, 불투명도 손실(Lo), 노멀 손실(Ln)** 을 결합하여 최적화됩니다.

## 주요 결과
**Triangle Splatting+** 는 **Mip-NeRF360** 및 **Tanks & Temples** 데이터셋에서 메시 기반 신규 뷰 합성 분야에서 **최첨단 성능** 을 달성했습니다. Mip-NeRF360 데이터셋에서 **2M개의 정점** 으로 **25.21 PSNR, 0.294 LPIPS, 0.742 SSIM** 을 기록하여, 더 많은 정점을 사용하는 기존 메시 기반 방법들을 능가했습니다. 또한, **Mip-NeRF360에서 39분, T&T에서 25분** 이라는 빠른 학습 시간을 보여, **MiLo** 와 같은 기존 방법보다 훨씬 효율적입니다.

## AI 실무자를 위한 시사점
**Triangle Splatting+** 는 고품질의 3D 재구성 결과를 **메시 기반 게임 엔진** 에 **추가 후처리 없이 직접 적용** 할 수 있게 함으로써, AI 기반 3D 콘텐츠 생성의 **실용성을 획기적으로 향상** 시킵니다. 물리 기반 시뮬레이션, 인터랙티브 워크스루, 객체 추출/제거 등 다양한 다운스트림 애플리케이션에 곧바로 활용 가능하여, 3D 그래픽스와 AI 모델 간의 **통합 장벽을 크게 낮춥니다** . 이는 AI/ML 엔지니어들이 생성한 3D 모델을 실제 사용자 경험에 빠르게 적용할 수 있는 길을 열어줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.