---
title: "[논문리뷰] DIMO: Diverse 3D Motion Generation for Arbitrary Objects"
excerpt: "Kostas Daniilidis이 arXiv에 게시한 'DIMO: Diverse 3D Motion Generation for Arbitrary Objects' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Motion Generation
  - Generative Models
  - Arbitrary Objects
  - Neural Key Points
  - Latent Space
  - 4D Content Generation
  - Diffusion Models
  - 3D Gaussian Splatting

permalink: /ai/review/2025-11-11-DIMO-Diverse-3D-Motion-Generation-for-Arbitrary-Objects/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07409)

**저자:** Linzhan Mou, Jiahui Lei, Chen Wang, Lingjie Liu, Kostas Daniilidis



## 핵심 연구 목표
본 연구는 기존 4D 생성 모델이 단일 객체에 대해 단일 모션만 생성하거나, 카테고리별로 제한된 모션만을 다루는 한계를 극복하고자 합니다. **단일 이미지** 에서 **임의의 객체** 에 대한 **다양한 3D 모션** 을 **단일 생성 모델** 을 통해 **단일 포워드 패스** 로 즉시 생성하는 것을 목표로 합니다.

## 핵심 방법론
다양한 모션 프롬프트를 **GPT-4o** 및 **Llama3** 로 생성하고, **CogVideoX5B-I2V** 같은 텍스트 조건부 이미지-비디오 모델을 사용하여 다양한 모션 비디오를 증류합니다. 각 모션 시퀀스는 **신경 키포인트 궤적(neural key point trajectories)** 으로 표현되며, 이는 저차원 **모션 잠재 공간(motion latent space)** 에 임베딩됩니다. 이 잠재 공간과 **모션 디코더(motion decoder)** 를 공동으로 학습시켜 모션 분포를 모델링하고, **정규 3D 가우시안(canonical 3D Gaussians)** 을 동적 키포인트에 부착하여 포토리메트릭 손실( **Lrgb, Lmask, Llpips, Ldepth, Lnormal** ) 및 **ARAP(As-Rigid-As-Possible) 기반 기하학적 정규화** 를 통해 4D 최적화를 수행합니다.

## 주요 결과
DIMO는 임의의 객체에 대한 다양한 3D 모션 생성에서 최신 성능을 달성했습니다. Image-to-4D 벤치마크에서 **CLIP-I 0.9505** , **CLIP-F 0.9912** , **모션 다양성(MD) 59.4%** 를 기록하여 기존 모델들을 크게 능가했으며, 경쟁 모델 대비 훨씬 빠른 **10분 이내의 학습 시간** 을 보였습니다. 또한, Video-to-4D 벤치마크에서도 **LPIPS 0.112** , **CLIP 0.92** , **FVD 625.30** 를 달성하여 우수한 시각적 품질과 시간적 일관성을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 임의의 객체에 대한 다양한 4D 콘텐츠를 효율적으로 생성할 수 있는 **확장 가능한 생성 모델** 의 가능성을 제시합니다. 학습된 잠재 공간에서 **단일 포워드 패스** 로 다양한 3D 모션을 즉시 샘플링할 수 있어, 실시간 인터랙티브 3D/4D 콘텐츠 제작 및 애니메이션 분야에서 활용도가 높습니다. **3D 모션 보간** 및 **언어 유도 모션 생성** 과 같은 기능은 AI 기반 콘텐츠 저작 도구의 발전에 기여할 잠재력이 큽니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.