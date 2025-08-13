---
title: "[논문리뷰] CharacterShot: Controllable and Consistent 4D Character Animation"
excerpt: "Fei Shen이 [arXiv]에 게시한 'CharacterShot: Controllable and Consistent 4D Character Animation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 4D Character Animation
  - Diffusion Models
  - Gaussian Splatting
  - Pose Control
  - Multi-view Synthesis
  - Temporal Consistency
  - Character Dataset

permalink: /ai/review/2025-8-13-CharacterShot_Controllable_and_Consistent_4D_Character_Animation/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.07409)

**저자:** Junyao Gao, Jiaxing Li, Wenran Liu, Yanhong Zeng, Fei Shen, Kai Chen, Yanan Sun, Cairong Zhao



## 핵심 연구 목표
본 논문은 단일 캐릭터 이미지와 2D 포즈 시퀀스를 입력으로 받아, 사용자가 제어할 수 있는 동적인 3D 캐릭터(4D 캐릭터 애니메이션)를 생성하는 프레임워크인 **CharacterShot**을 제안합니다. 이는 기존 CGI 파이프라인의 높은 비용과 수동적 노력을 줄이고, 공간-시간적 및 공간-뷰 일관성을 유지하는 4D 애니메이션을 실현하는 것을 목표로 합니다.

## 핵심 방법론
CharacterShot은 먼저 **DiT 기반 I2V 모델 (CogVideoX)**을 사전 훈련하여 2D 캐릭터 애니메이션을 포즈 제어 가능하게 만듭니다. 이후 **듀얼-어텐션 모듈**과 **카메라 사전 정보**를 도입하여 2D 모델을 3D 다중-뷰 비디오 생성으로 확장하여 공간-시간적 및 공간-뷰 일관성을 확보합니다. 마지막으로, **이웃 제약 4D Gaussian Splatting (4DGS) 최적화**를 적용하여 다중-뷰 비디오에서 연속적이고 안정적인 4D 캐릭터 표현을 생성합니다. 또한, 대규모 **Character4D 데이터셋 (13,115개 고유 캐릭터)**을 구축하여 캐릭터 중심 성능을 향상시켰습니다.

## 주요 결과
제안된 **CharacterShot**은 새로 구축된 **CharacterBench** 벤치마크에서 기존 SOTA 방법론들을 뛰어넘는 성능을 보였습니다. 다중-뷰 비디오 합성에 있어서 **SSIM 0.967**, **LPIPS 0.021**, **CLIP-S 0.957**, **FV4D 490.457**의 정량적 지표를 달성하여 다른 모델들(예: Diffusion2의 FV4D 1392.323)보다 월등히 높은 일관성을 보였습니다. 4D 생성에서도 **SSIM 0.971**, **LPIPS 0.025**, **FV4D 406.624**를 기록하며 우수성을 입증했습니다.

## AI 실무자를 위한 시사점
**CharacterShot**은 단일 이미지만으로 복잡한 4D 캐릭터 애니메이션을 가능하게 하여 AI/ML 엔지니어와 콘텐츠 크리에이터에게 **저비용 고효율의 CGI 파이프라인**을 제공합니다. 제안된 **Character4D 데이터셋**과 **CharacterBench 벤치마크**는 향후 4D 애니메이션 연구 및 개발에 귀중한 자원이 될 것입니다. 다만, 크게 부정확한 포즈 입력에 대한 애니메이션은 여전히 개선의 여지가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.