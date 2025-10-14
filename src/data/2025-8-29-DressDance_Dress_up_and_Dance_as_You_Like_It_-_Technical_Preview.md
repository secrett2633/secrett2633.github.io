---
title: "[논문리뷰] Dress&Dance: Dress up and Dance as You Like It - Technical Preview"
excerpt: "Yu-Xiong Wang이 [arXiv]에 게시한 'Dress&Dance: Dress up and Dance as You Like It - Technical Preview' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Virtual Try-On
  - Video Diffusion
  - Multi-modal Conditioning
  - Garment Transfer
  - Pose Animation
  - Generative AI
  - Fashion Tech
  - CondNet

permalink: /ai/review/2025-8-29-DressDance_Dress_up_and_Dance_as_You_Like_It_-_Technical_Preview/

toc: true
toc_sticky: true

date: 2025-08-29 13:14:44+0900
last_modified_at: 2025-08-29 13:14:44+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21070)

**저자:** Jun-Kun Chen, Aayush Bansal, Minh Phuoc Vo, Yu-Xiong Wang



## 핵심 연구 목표
본 논문은 정적인 2D 이미지 기반의 가상 착용(virtual try-on) 방식과 기존 비디오 생성 모델의 한계를 극복하여, 사용자가 원하는 옷을 입고 특정 동작(춤)을 수행하는 고품질의 **5초 길이, 1152x720 해상도, 24 FPS** 가상 착용 비디오를 생성하는 것을 목표로 합니다. 특히, 의류의 디테일과 사용자 외모를 보존하면서 복잡하고 미묘한 동작을 정확하게 재현하는 것이 주요 도전 과제입니다.

## 핵심 방법론
`Dress&Dance`는 **비디오 확산 프레임워크**를 기반으로 하며, 핵심적으로 **CondNet**이라는 **다중 모달(텍스트, 이미지, 비디오) 조건화 네트워크**를 도입하여 **교차 어텐션(cross-attention)**을 통해 의류 등록 및 동작 충실도를 향상시킵니다. 제한된 비디오 데이터와 풍부한 이미지 데이터를 결합하기 위해 **커리큘럼 기반의 의류 웜업 학습(garment warm-up learning)**과 **다단계 점진적 해상도 훈련 전략(multi-stage progressive training)**을 사용하며, 초기 8 FPS 비디오를 24 FPS로 업샘플링하고 시각적 품질을 개선하는 **자동 회귀 비디오 리파이너(auto-regressive video refiner)**를 포함합니다.

## 주요 결과
`Dress&Dance`는 **1152x720 해상도**의 고품질 가상 착용 비디오를 성공적으로 생성합니다. 정량적 평가에서 제안된 방법은 **PSNR 22.41, SSIM 0.9038, LPIPS 0.0624** (Direct Train 기준)를 달성하며, 기존 오픈소스 및 상용 솔루션인 **Kling AI** 및 **Ray2**와 비교하여 대부분의 지표에서 우수하거나 대등한 성능을 보입니다. 특히, 의류 충실도(`GPTTry-On`) 측면에서 **87.41**점을 기록하여 다른 모든 기준 모델을 크게 능가하는 우수한 가상 착용 능력을 입증했습니다.

## AI 실무자를 위한 시사점
`Dress&Dance`는 고해상도, 고품질 가상 착용 비디오 생성의 가능성을 열어 **패션 E-커머스, 메타버스 아바타** 등에 혁신적인 응용 잠재력을 제공합니다. **CondNet**의 다중 모달 조건화 전략은 다양한 AI 생성 모델에서 **복합적인 사용자 의도**를 효과적으로 반영하는 데 활용될 수 있습니다. **데이터 효율적인 훈련 전략**과 **단계별 해상도 향상 기법**은 제한된 자원으로 고품질 출력을 생성해야 하는 실무자에게 유용한 모델 설계 및 훈련 가이드라인을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.