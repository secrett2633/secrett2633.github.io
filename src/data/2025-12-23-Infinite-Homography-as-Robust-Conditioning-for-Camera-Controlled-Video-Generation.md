---
title: "[논문리뷰] Infinite-Homography as Robust Conditioning for Camera-Controlled Video Generation"
excerpt: "arXiv에 게시된 'Infinite-Homography as Robust Conditioning for Camera-Controlled Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Camera Control
  - Homography
  - Diffusion Models
  - Data Augmentation
  - Novel View Synthesis
  - Pose Fidelity

permalink: /ai/review/2025-12-23-Infinite-Homography-as-Robust-Conditioning-for-Camera-Controlled-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-23 00:00:00+0900+0900
last_modified_at: 2025-12-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.17040)

**저자:** Min-Jung Kim, Jeongho Kim, Hoiyeong Jin, Junha Hyung, Jaegul Choo



## 핵심 연구 목표
논문은 카메라 제어 가능한 동적 장면 비디오 생성에서 **높은 카메라 포즈 충실도** 와 **뷰 일관성** 을 유지하며, 가려진 기하학에 대해 추론하는 문제를 해결하는 것을 목표로 합니다. 특히, 기존의 깊이 재투영 기반 방법론의 부정확한 깊이 추정 오류와 궤적 조건부 모델의 데이터셋 편향 문제를 극복하고자 합니다.

## 핵심 방법론
제안하는 **InfCam** 은 깊이 추정 없이 작동하는 비디오-투-비디오 생성 프레임워크로, 두 가지 핵심 구성 요소를 포함합니다. 첫째, **무한 원근 변환(infinite homography) 워핑 모듈** 을 통해 3D 카메라 회전을 2D 잠재 공간에 직접 인코딩하고, **잔여 시차(residual parallax) 항** 을 **종단간(end-to-end) 훈련** 으로 예측하여 높은 포즈 충실도를 달성합니다. 둘째, 기존 합성 다중 뷰 데이터셋을 다양한 궤적과 초점 거리로 변환하는 **데이터 증강 파이프라인** 을 도입하여 모델의 일반화 성능을 강화합니다.

## 주요 결과
AugMCV 데이터셋에서 제안하는 방법은 모든 기준선 모델 대비 뛰어난 성능을 보였습니다. 특히, 공유 고유 매개변수(Shared Intrinsics) 시나리오에서 **PSNR↑ 22.677** , **SSIM↑ 0.718** , **LPIPS↓ 0.246** 을 달성했습니다. WebVid 데이터셋(실세계 데이터)에서는 **RotErr↓ 3.162** , **TransErr↓ 0.438** , **FID↓ 29.702** , **FVD↓ 286.952** 를 기록하며 카메라 포즈 정확도와 시각적 충실도에서 최첨단 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **외부 깊이 추정 없이** 카메라 제어 비디오를 생성하는 효과적인 방법을 제시하여, 깊이 추정의 부정확성으로 인한 기존 문제들을 해결합니다. AI 실무자들은 **무한 원근 변환** 을 활용한 기하학적 조건화와 **궤적-내부 증강 전략** 이 모델의 일반화 및 포즈 충실도에 미치는 긍정적 효과를 참고할 수 있습니다. 이는 영화 제작 후반 작업이나 가상현실 콘텐츠 생성 등 정밀한 카메라 제어가 필요한 분야에서 **고품질 비디오 생성** 을 위한 새로운 접근 방식을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.