---
title: "[논문리뷰] MoCapAnything: Unified 3D Motion Capture for Arbitrary Skeletons from Monocular Videos"
excerpt: "Qi Wang이 [arXiv]에 게시한 'MoCapAnything: Unified 3D Motion Capture for Arbitrary Skeletons from Monocular Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Motion Capture
  - Monocular Video
  - Arbitrary Skeletons
  - Motion Retargeting
  - Deep Learning
  - Inverse Kinematics
  - Transformer Architecture
  - Category-Agnostic

permalink: /ai/review/2025-12-12-MoCapAnything-Unified-3D-Motion-Capture-for-Arbitrary-Skeletons-from-Monocular-Videos/

toc: true
toc_sticky: true

date: 2025-12-12 00:00:00+0900+0900
last_modified_at: 2025-12-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.10881)

**저자:** Kehong Gong, Zhengyu Wen, Weixia He, Mingxi Xu, Qi Wang, Ning Zhang, Zhengyu Li, Dongze Lian, Wei Zhao, Xiaoyu He, Mingyuan Zhang



## 핵심 연구 목표
본 논문은 기존 모션 캡처 파이프라인의 종(species) 또는 템플릿(template) 의존성 문제를 해결하고, 단일 모노큘러 비디오에서 **임의의 리깅된 3D 에셋(asset)** 에 대한 **카테고리 불가지론적 모션 캡처(CAMoCap)** 를 달성하는 것을 목표로 합니다. 이는 다양한 스켈레톤 토폴로지를 가진 캐릭터에 대한 회전 기반 애니메이션을 재구성하여 **모션 표현, 레퍼런스 가이드 추정, 다중 모달 통합** 의 핵심 난제를 해결하고자 합니다.

## 핵심 방법론
**MoCapAnything** 프레임워크는 모션 복구를 3D 조인트 궤적 예측과 조인트별 회전 복구로 분리합니다. 주요 구성 요소로는 에셋의 스켈레톤, 메시, 렌더링된 이미지에서 쿼리를 추출하는 **Reference Prompt Encoder** , 비디오에서 **DINOv2** 시각 특징과 **4D 변형 메시** 를 추출하는 **Video Feature Extractor** , 그리고 이 모든 정보를 융합하여 시간적으로 일관된 3D 조인트 궤적을 예측하는 **Unified Motion Decoder** 가 있습니다. 최종적으로 예측된 궤적은 **최적화 기반 역운동학(IK) 피팅** 을 통해 에셋별 회전으로 변환됩니다.

## 주요 결과
제안된 방법은 **Truebones Zoo** 데이터셋에서 기존 **GenZoo** 대비 현저히 낮은 **CD-Skeleton 에러** 를 달성했습니다. 전체 테스트 세트에서 평균 에러를 **0.4580(GenZoo)** 에서 **0.2549(MoCapAnything)** 로 감소시켰으며, 특히 비-사족보행 종에서 성능 개선이 두드러졌습니다. 이는 다양한 스켈레톤 유형과 실세계 비디오에서도 부드럽고 해부학적으로 그럴듯한 3D 모션 재구성과 크로스-스피시즈 리타겟팅 능력을 입증합니다.

## AI 실무자를 위한 시사점
이 연구는 **모노큘러 비디오 기반 모션 캡처의 적용 범위를 임의의 3D 에셋으로 확장** 하여 애니메이션, 가상 프로덕션, 게임 개발 분야에 새로운 가능성을 제시합니다. **3D 조인트 궤적 예측과 IK 기반 회전 복구를 분리** 하는 모듈식 접근 방식은 시스템의 유연성과 일반화 능력을 높여 다양한 에셋에 대한 모션 생성 워크플로우를 간소화합니다. 또한, 공개된 **Truebones Zoo** 벤치마크는 후속 연구 및 개발에 중요한 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.