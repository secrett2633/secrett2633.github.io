---
title: "[논문리뷰] Wan-Move: Motion-controllable Video Generation via Latent Trajectory Guidance"
excerpt: "arXiv에 게시된 'Wan-Move: Motion-controllable Video Generation via Latent Trajectory Guidance' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Motion Control
  - Latent Trajectory Guidance
  - Image-to-Video
  - Diffusion Models
  - Neural Networks
  - MoveBench

permalink: /ai/review/2025-12-10-Wan-Move-Motion-controllable-Video-Generation-via-Latent-Trajectory-Guidance/

toc: true
toc_sticky: true

date: 2025-12-10 00:00:00+0900+0900
last_modified_at: 2025-12-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.08765)

**저자:** Ruihang Chu, Yefei He, Zhekai Chen, Shiwei Zhang, Xiaogang Xu, Bin Xia, Dingdong Wang, Xihui Liu, Hongwei Yi, Hengshuang Zhao, Yu Liu, Yingya Zhang, Yujiu Yang



## 핵심 연구 목표
기존 모션 제어 비디오 생성 모델의 낮은 제어 정밀도, 제한된 확장성 및 비실용적인 출력 품질 문제를 해결하고자 합니다. 보조 모션 인코더 없이 **기존 I2V 모델의 조건 특징을 직접 모션 인식** 방식으로 업데이트하여, 정밀하고 고품질의 모션 제어 비디오 생성을 가능하게 하는 **간단하고 확장 가능한 프레임워크** 를 제시하는 것이 목표입니다.

## 핵심 방법론
객체 모션을 **조밀한 점 궤적(dense point trajectories)** 으로 표현하여 장면 전반에 걸쳐 미세한 제어를 가능하게 합니다. 이 궤적을 **잠재 공간(latent space)** 으로 투영한 후, 첫 프레임의 특징을 각 궤적을 따라 전파하여 **정렬된 시공간 특징 맵** 을 생성합니다. 이 특징 맵은 업데이트된 잠재 조건으로 사용되어, **Wan-I2V-14B** 와 같은 기존 이미지-투-비디오(I2V) 모델에 **어떠한 아키텍처 변경 없이** 모션 안내로 자연스럽게 통합됩니다. 또한, 모션 제어 모델의 종합적인 평가를 위해 **MoveBench** 라는 새로운 벤치마크를 구축했습니다.

## 주요 결과
**Wan-Move** 는 5초 길이의 480p 비디오를 생성하며, 사용자 연구 결과 상업용 도구인 **Kling 1.5 Pro의 Motion Brush** 에 필적하는 모션 제어 능력을 보여주었습니다. **MoveBench** 및 공개 데이터셋에서 **가장 낮은 EPE(2.6)** 와 **가장 높은 PSNR(17.8), SSIM(0.64)** 을 달성하며 우수한 모션 품질을 입증했습니다. 또한, **잠재 특징 복제(latent feature replication)** 방식을 통해 기존 아키텍처 변경 없이도 모션 안내를 효과적으로 주입하여 우수한 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **기존 I2V 기반 모델을 활용** 하여 모션 제어 기능을 쉽게 추가하고 확장할 수 있는 효율적인 방법을 제시합니다. 특히, **별도의 모션 인코더 없이 잠재 공간 특징을 직접 조작** 하는 접근 방식은 모델 복잡성을 줄이고 미세 조정을 용이하게 하여 **생산 환경에서의 적용 가능성** 을 높입니다. 새롭게 제안된 **MoveBench** 는 다양한 시나리오와 정교한 모션 주석을 제공하여 모션 제어 비디오 생성 모델 개발자들에게 유용한 평가 표준을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.