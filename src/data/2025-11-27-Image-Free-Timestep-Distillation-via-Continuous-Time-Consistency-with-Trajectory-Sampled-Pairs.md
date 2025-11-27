---
title: "[논문리뷰] Image-Free Timestep Distillation via Continuous-Time Consistency with Trajectory-Sampled Pairs"
excerpt: "Xin Yang이 [arXiv]에 게시한 'Image-Free Timestep Distillation via Continuous-Time Consistency with Trajectory-Sampled Pairs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Timestep Distillation
  - Consistency Models
  - Latent Space
  - Image-Free Training
  - Efficiency Optimization
  - Trajectory Sampling
  - Continuous-Time Learning

permalink: /ai/review/2025-11-27-Image-Free-Timestep-Distillation-via-Continuous-Time-Consistency-with-Trajectory-Sampled-Pairs/

toc: true
toc_sticky: true

date: 2025-11-27 00:00:00+0900+0900
last_modified_at: 2025-11-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20410)

**저자:** Bao Tang, Shuai Zhang, Yueting Zhu, Jijun Xiang, Xin Yang, Li Yu, Wenyu Liu, Xinggang Wang+



## 핵심 연구 목표
이 논문은 확산 모델의 생성 효율성을 향상시키기 위한 **timestep distillation**의 한계를 극복하고자 합니다. 특히, 기존 **continuous-time consistency distillation** 방법들이 겪는 높은 계산 비용, 방대한 훈련 데이터 의존성, 그리고 훈련-추론 불일치 문제를 해결하여, 자원 제약적인 환경에서도 효율적이고 고품질의 **one-step generation**을 가능하게 하는 **image-free distillation 프레임워크**를 제안하는 것이 목표입니다.

## 핵심 방법론
제안하는 **Trajectory-Backward Consistency Model (TBCM)**은 **image-free distillation 프레임워크**로, VAE 인코딩 및 외부 훈련 데이터 없이 교사 모델의 추론 궤적에서 직접 잠재 표현을 샘플링하여 훈련을 수행합니다. 이는 훈련-추론 불일치를 완화하고 GPU 메모리 병목 현상을 해결합니다. 방법론은 **TrigFlow 아키텍처**를 기반으로 **연속 시간 일관성 손실**을 계산하며, 프롬프트당 **다중 궤적 샘플링**과 sCM 손실의 **불안정한 항에 대한 가중치 조정**을 통해 최적화 안정성을 높입니다.

## 주요 결과
TBCM은 **MJHQ-30k** 벤치마크에서 **one-step generation** 시 **6.52 FID** 및 **28.08 CLIP score**를 달성하여 기존 **Sana-Sprint (FID 7.04, CLIP 28.04)** 및 **sCM (FID 7.46, CLIP 27.74)** 대비 뛰어난 성능을 보였습니다. 또한, **Sana-Sprint** 대비 훈련 시간을 약 **40% (7680 GPU*h에서 4640 GPU*h로 감소)** 단축하고, GPU 메모리 사용량을 **60% 이상 (72.0 GB에서 22.6 GB로 감소)** 절감하는 등 상당한 효율성 개선을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 TBCM을 활용하여 GPU 메모리 사용량과 훈련 시간을 대폭 줄이면서도 고품질의 **one-step 이미지 생성 모델**을 개발하고 배포할 수 있습니다. **VAE가 필요 없는 image-free 및 잠재 공간 기반 증류**는 기존 확산 모델 파이프라인의 복잡성을 크게 줄여 효율적인 모델 개발을 가능하게 합니다. 다만, 학생 모델의 성능이 교사 모델의 생성 품질에 크게 의존하므로, 교사 모델 선택 및 잠재적 모드 붕괴 방지에 대한 주의가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.