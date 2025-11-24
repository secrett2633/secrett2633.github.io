---
title: "[논문리뷰] Track, Inpaint, Resplat: Subject-driven 3D and 4D Generation with
  Progressive Texture Infilling"
excerpt: "Igor Gilitschenski이 [arXiv]에 게시한 'Track, Inpaint, Resplat: Subject-driven 3D and 4D Generation with
  Progressive Texture Infilling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Subject-driven 3D/4D Generation
  - Texture Infilling
  - Video Tracking
  - Image Inpainting
  - Multi-view Consistency
  - Identity Preservation
  - Generative Models
  - 3D Gaussians

permalink: /ai/review/2025-10-28-Track-Inpaint-Resplat-Subject-driven-3D-and-4D-Generation-with-Progressive-Texture-Infilling/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23605)

**저자:** Shuhong Zheng, Ashkan Mirzaei, Igor Gilitschenski



## 핵심 연구 목표
기존 3D/4D 생성 모델들은 주로 사실성, 효율성, 미학에 초점을 맞추어 개발되었으나, 다양한 시점에서 대상의 **의미론적 정체성(semantic identity)을 보존**하는 데 한계를 보였습니다. 본 논문은 초기 3D 에셋이 주어졌을 때, 주관적으로 **일관된 정체성을 유지**하면서 **누락된 영역의 텍스처를 점진적으로 채워 넣는** 주체-기반 3D/4D 생성 문제 해결을 목표로 합니다.

## 핵심 방법론
본 연구는 **TIRE(Track, Inpaint, REsplat)**라는 3단계 파이프라인을 제안합니다. **Track** 단계에서는 **CoTracker**를 사용하여 카메라 움직임을 기준으로 누락된 영역을 식별합니다. **Inpaint** 단계에서는 초기 3D 에셋의 렌더링된 다중 시점 이미지에 대해 **LoRA로 미세 조정된 Stable Diffusion 기반의 주체-기반 2D 인페인팅 모델**을 사용하여 식별된 영역을 점진적으로 채워 나갑니다. 마지막으로 **REsplat** 단계에서는 수정된 2D 관측값을 **다중 시점 확산 모델(Wonder3D/ImageDream)**을 통해 3D **Gaussian**으로 역투영하여 **다중 시점 일관성**을 유지합니다.

## 주요 결과
본 연구의 **TIRE**는 **L4GM, STAG4D, Customize-It-3D** 등 최신 모델 대비 **정체성 보존 측면에서 우수한 성능**을 보였습니다. 특히 **VLM 기반 정량적 평가**에서 **평균 1.854점**을 기록하여 다른 baseline 모델들을 능가했으며, 사용자 연구에서는 **10점 만점에 6.37점**으로 가장 높은 주관적 선호도를 얻었습니다. DINO 유사성 지표에서는 **0.5665/0.5815**를 달성하여 L4GM보다 우수했으나, Customize-It-3D가 정성적 한계에도 불구하고 더 높은 수치를 기록하는 등, 기존 정량 지표의 한계점도 제시했습니다.

## AI 실무자를 위한 시사점
TIRE는 기존 3D/4D 생성 모델의 **결과물에 주체 정체성 보존 기능을 추가할 수 있는 범용적인 플러그인 솔루션**을 제공합니다. 이는 2D 비디오 트래킹 및 인페인팅 도구를 활용하여 3D/4D 에셋의 텍스처를 개선하는 새로운 접근 방식을 제시합니다. 다만, 현재 **단일 NVIDIA A100 GPU 기준 약 100분**의 학습 시간이 소요되어 **효율성 측면에서는 추가적인 개선**이 필요하며, 실시간 또는 대규모 배치 처리에는 제약이 있을 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.