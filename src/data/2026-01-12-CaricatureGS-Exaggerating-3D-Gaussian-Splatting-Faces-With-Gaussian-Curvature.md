---
title: "[논문리뷰] CaricatureGS: Exaggerating 3D Gaussian Splatting Faces With Gaussian Curvature"
excerpt: "이 [arXiv]에 게시한 'CaricatureGS: Exaggerating 3D Gaussian Splatting Faces With Gaussian Curvature' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Gaussian Splatting
  - Facial Caricaturization
  - Gaussian Curvature
  - Mesh Deformation
  - Photorealistic Rendering
  - Human Avatars
  - Local Affine Transformations

permalink: /ai/review/2026-01-12-CaricatureGS-Exaggerating-3D-Gaussian-Splatting-Faces-With-Gaussian-Curvature/

toc: true
toc_sticky: true

date: 2026-01-12 00:00:00+0900+0900
last_modified_at: 2026-01-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.03319)

**저자:** Eldad Matmon, Amit Bracha, Noam Rotstein, Ron Kimmel



## 핵심 연구 목표
본 논문은 제어 가능하고 사실적인 3D 얼굴 캐리커처 아바타를 생성하는 데 있어 기존 메시 기반 방법론의 한계를 극복하고자 합니다. 특히, **3D Gaussian Splatting (3DGS)** 의 사실적인 렌더링 능력과 **곡률 기반(curvature-based) 기하학적 변형** 을 결합하여 정체성을 유지하면서도 과장된 얼굴 특징을 표현하는 것을 목표로 합니다.

## 핵심 방법론
다중 뷰 비디오에서 **FLAME 메시** 를 추출하고, **곡률 가중 포아송 방정식(curvature-weighted Poisson equation)** 을 풀어 캐리커처 메시를 얻습니다. 실제 캐리커처 데이터가 없는 문제를 해결하기 위해, 중립 메시와 캐리커처 메시 간의 2D 매핑을 사용하여 각 입력 프레임을 변형시키는 **Local Affine Transformations (LAT)** 기반의 **pseudo-ground truth (GT*) 캐리커처 이미지**를 생성합니다. 훈련 중에는 실제 뷰와 GT* 뷰를 번갈아 사용하며 단일 Gaussian 세트를 최적화하고, 머리카락과 같은 미세 구조의 손상을 방지하기 위해 **공간 마스크(spatial mask)** 를 적용합니다.

## 주요 결과
제안된 **CaricatureGS** 방법은 **SurFhead [21]** 베이스라인 대비 모든 정량적 지표에서 뛰어난 성능을 보였습니다. 특히, **DINO (Identity/Structure Consistency)** 에서 **0.888** 을 달성하여 베이스라인의 **0.757** 을 크게 상회하며 신원 유지와 구조적 일관성을 입증했습니다. 또한, **CLIP-I (Image-Prompt Similarity)** 에서도 **0.73** 을 기록하며 베이스라인의 **0.67** 보다 높은 점수를 얻어 캐리커처 의도를 더 잘 반영했음을 보여주었습니다. 캐리커처 강도(γ)를 연속적으로 제어하는 선형 보간법은 실제 솔루션과의 최대 편차가 **2% 미만** 으로 무시할 수 있는 수준임을 확인했습니다.

## AI 실무자를 위한 시사점
**3D Gaussian Splatting** 과 **기하학적 변형 기법** 의 성공적인 결합은 고품질의 제어 가능한 3D 아바타 생성에 중요한 발전 가능성을 제시합니다. **pseudo-ground truth** 생성 및 **교차 훈련(alternated training)** 방식은 실제 데이터가 부족한 도메인에서 모델의 일반화 능력을 향상시키는 강력한 데이터 증강 전략으로 활용될 수 있습니다. 실시간 캐리커처 강도 제어를 위한 **선형 보간법** 은 인터랙티브한 응용 프로그램의 실용성을 높이며, 향후 **디퓨전 기반 편집기** 와 통합하여 모양과 외형을 동시에 제어하는 새로운 연구 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.