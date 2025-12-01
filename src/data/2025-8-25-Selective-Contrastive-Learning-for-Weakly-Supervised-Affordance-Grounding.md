---
title: "[논문리뷰] Selective Contrastive Learning for Weakly Supervised Affordance
  Grounding"
excerpt: "Jae-Pil Heo이 [arXiv]에 게시한 'Selective Contrastive Learning for Weakly Supervised Affordance
  Grounding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Weakly Supervised Learning
  - Affordance Grounding
  - Contrastive Learning
  - CLIP
  - Part Discovery
  - Object Localization
  - DINO
  - Generative Models

permalink: /ai/review/2025-8-25-Selective-Contrastive-Learning-for-Weakly-Supervised-Affordance-Grounding/

toc: true
toc_sticky: true

date: 2025-08-25 13:13:07+0900
last_modified_at: 2025-08-25 13:13:07+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.07877)

**저자:** WonJun Moon, Hyun Seok Seong, Jae-Pil Heo



## 핵심 연구 목표
본 논문은 **약지도 어포던스 그라운딩(Weakly Supervised Affordance Grounding, WSAG)** 에서 모델이 어포던스 관련 부위 대신 일반적인 클래스 패턴에 집중하는 한계를 극복하고자 합니다. 픽셀 수준의 어노테이션 없이도 어포던스 관련 단서를 객체 및 부분 수준에서 **선택적 대조 학습** 을 통해 적응적으로 학습하여, 보다 정확하고 의미 있는 어포던스 영역을 식별하는 것이 목표입니다.

## 핵심 방법론
먼저 **CLIP** 을 활용하여 egocentric 및 exocentric 이미지에서 액션 관련 객체를 포함하는 **객체 어피니티 맵** 을 생성합니다. 이후, 보완적인 시야의 객체를 상호 참조하여 정밀한 **부분 수준 어포던스 단서** 를 발굴합니다. 이 단서를 활용하여 **선택적 프로토타입 대조 학습** 과 **픽셀 대조 학습** 이라는 두 가지 대조 학습 기법을 적용하며, 최종적으로 **CAM 예측 맵 보정** 을 통해 활성화를 개선합니다.

## 주요 결과
제안된 방법은 **AGD20K** 및 **HICO-IIF** 데이터셋에서 기존 최신 방법론들을 일관되게 능가하는 성능을 보였습니다. 특히, **AGD20K-Seen** 시나리오에서 **KLD 1.124↓** , **SIM 0.433↑** , **NSS 1.280↑** 를 달성하여 비교 모델 중 가장 우수한 결과를 기록했습니다. 이는 특히 **보지 못했던(unseen) 시나리오** 에서 강건한 성능 향상을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 어포던스 그라운딩 분야에서 **약지도 학습의 효과적인 접근 방식** 을 제시합니다. **CLIP** 과 같은 파운데이션 모델을 활용한 객체 및 부분 단서 발굴 전략은 라벨링 비용을 절감하면서도 고품질의 학습 데이터를 생성할 수 있는 실용적인 방법입니다. **선택적 대조 학습** 과 **CAM 보정** 기법은 AI 모델이 배경 노이즈나 무관한 특징에 집중하는 경향을 줄이고, 실제 어포던스에 필수적인 영역을 정확히 식별하도록 돕는 데 유용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.