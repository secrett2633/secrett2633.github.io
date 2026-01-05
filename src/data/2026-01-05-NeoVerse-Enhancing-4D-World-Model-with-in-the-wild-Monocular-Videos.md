---
title: "[논문리뷰] NeoVerse: Enhancing 4D World Model with in-the-wild Monocular Videos"
excerpt: "Feng Wang이 [arXiv]에 게시한 'NeoVerse: Enhancing 4D World Model with in-the-wild Monocular Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 4D World Model
  - Gaussian Splatting
  - Monocular Video
  - Novel View Synthesis
  - Video Generation
  - Feed-Forward Reconstruction
  - Degradation Simulation

permalink: /ai/review/2026-01-05-NeoVerse-Enhancing-4D-World-Model-with-in-the-wild-Monocular-Videos/

toc: true
toc_sticky: true

date: 2026-01-05 00:00:00+0900+0900
last_modified_at: 2026-01-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.00393)

**저자:** Yuxue Yang, Lue Fan, Ziqi Shi, Junran Peng, Feng Wang, Zhaoxiang Zhang



## 핵심 연구 목표
본 연구는 기존 4D 세계 모델링 방법론의 확장성 한계(고비용의 특수 다중 뷰 데이터 및 번거로운 오프라인 전처리)를 극복하고자 합니다. 이를 위해 다양한 **in-the-wild 단일 뷰 영상** 으로부터 **4D 재구성** 및 **새로운 경로 영상 생성** 이 가능한 다재다능하고 확장성 높은 **4D 세계 모델 NeoVerse** 를 제안합니다.

## 핵심 방법론
NeoVerse는 **pose-free feed-forward 4D Gaussian Splatting (4DGS) 모델** 을 기반으로 하며, **VGGT backbone** 과 **양방향 모션 모델링 메커니즘** 을 활용하여 희소 키 프레임에서 효율적인 온라인 재구성을 수행합니다. 생성 모델 훈련을 위해 **가시성 기반 Gaussian Culling** 및 **평균 기하 필터** 를 포함한 **단일 뷰 열화 시뮬레이션** 기법을 도입하여 실제와 유사한 열화 렌더링 조건을 생성하고, **control branch** 를 통해 조건부 영상 확산 모델을 제어합니다.

## 주요 결과
NeoVerse는 재구성 및 생성 벤치마크 모두에서 **최첨단 성능** 을 달성했습니다. 동적 재구성 태스크에서 **4DGT+** 대비 **PSNR 32.56, SSIM 0.927, LPIPS 0.120** 를 기록하며 우수한 성능을 입증했습니다. 또한, **VBench** 평가에서 **TrajectoryCrafter** 및 **ReCamMaster** 대비 향상된 이미지 및 심미적 품질 점수를 보였으며, **41개 키 프레임 기준 23초** 의 효율적인 추론 시간을 달성했습니다.

## AI 실무자를 위한 시사점
본 연구는 **단일 뷰 영상** 만으로 확장 가능한 4D 세계 모델링 파이프라인을 제공하여, 고가의 다중 뷰 데이터나 복잡한 전처리 없이도 다양한 **in-the-wild 시나리오** 에 적용 가능함을 보여줍니다. 이는 **영상 편집, 안정화, 초고해상도, 3D 트래킹** 등 다양한 하위 애플리케이션의 개발을 가속화하며, 실제 AI 시스템의 유연성과 범용성을 크게 향상시킬 수 있는 실용적인 가치를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.