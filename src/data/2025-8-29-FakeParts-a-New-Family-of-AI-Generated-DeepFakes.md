---
title: "[논문리뷰] FakeParts: a New Family of AI-Generated DeepFakes"
excerpt: "Xi Wang이 [arXiv]에 게시한 'FakeParts: a New Family of AI-Generated DeepFakes' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deepfake Detection
  - Partial Deepfakes
  - AI-Generated Video
  - Benchmark Dataset
  - Video Forensics
  - Generative Models
  - Manipulation Detection
  - Human Perception

permalink: /ai/review/2025-8-29-FakeParts-a-New-Family-of-AI-Generated-DeepFakes/

toc: true
toc_sticky: true

date: 2025-08-29 13:14:44+0900
last_modified_at: 2025-08-29 13:14:44+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21052)

**저자:** Gaëtan Brison, Soobash Daiboo, Samy Aïmeur, Awais Hussain Sani, Xi Wang, Gianni Franchi, Vicky Kalogeiton



## 핵심 연구 목표
본 연구는 미묘하고 국소적인 조작이 가해져 탐지하기 어려운 새로운 형태의 딥페이크인 **FakeParts**를 정의하고, 기존 탐지 시스템의 한계를 극복하기 위해 포괄적인 벤치마크 데이터셋 **FakePartsBench**를 구축하는 것을 목표로 합니다. 특히, 기존 딥페이크 탐지 연구가 간과했던 부분적 비디오 조작에 대한 탐지 역량을 평가하고 향상시키는 데 중점을 둡니다.

## 핵심 방법론
논문은 **FakeParts**를 공간적(예: **FaceSwap, Inpainting, Outpainting**), 시간적(예: **Interpolation**), 스타일적(예: **Style Change**) 조작으로 분류합니다. **FakePartsBench** 데이터셋은 **Sora, Veo2, Allegro AI** 등 최신 AI 생성 모델을 포함한 **10개 이상의 모델**로 생성된 **25,000개 이상의 비디오**로 구성되며, **픽셀 및 프레임 수준의 조작 주석**을 제공합니다. 평가를 위해 **CNNDetection, UnivFD, NPR, FatFormer, C2P-CLIP, DeMamba, AIGVDet** 등 최신 탐지 모델과 **60명 이상의 참가자**를 대상으로 한 인간 인지 연구를 수행했습니다.

## 주요 결과
사용자 연구 결과, **FakeParts**는 전통적인 딥페이크에 비해 인간의 탐지 정확도를 **30% 이상** 감소시켰습니다. 최신 자동 탐지 모델 역시 부분적 조작에 직면했을 때 성능이 최대 **43%**까지 저하되었으며, **AIGVDet, NPR, DeMamba**는 **FaceSwap의 22%, Inpainting/Outpainting의 6-7%** 미만을 탐지하는 데 그쳤습니다. 반면 **CLIP 기반 모델**은 미세한 조작(예: **Inpainting에서 34~39%**)에 더 강점을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 현재 딥페이크 탐지 접근 방식의 심각한 취약점을 명확히 보여주며, 특히 **부분적이고 미묘한 비디오 조작**에 대응할 수 있는 더 강력한 방법을 개발해야 함을 시사합니다. **FakePartsBench**는 AI/ML 엔지니어들이 미세한 조작과 높은 사실성을 가진 딥페이크에 대한 탐지 모델을 개발하고 평가하는 데 필수적인 자원입니다. **파운데이션 모델**이 특정 미세 조작에 강점을 보였지만, 고품질 전체 딥페이크에는 여전히 개선이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.