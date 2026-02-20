---
title: "[논문리뷰] GenCompositor: Generative Video Compositing with Diffusion Transformer"
excerpt: "Lingen Li이 arXiv에 게시한 'GenCompositor: Generative Video Compositing with Diffusion Transformer' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Compositing
  - Diffusion Transformer
  - Generative Models
  - Video Editing
  - Position Embedding
  - Diffusion Models
  - Masked Token Injection
  - Video Harmonization

permalink: /ai/review/2025-9-3-GenCompositor-Generative-Video-Compositing-with-Diffusion-Transformer/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.02460)

**저자:** Shuzhou Yang, Xiaoyu Li*, Xiaodong Cun, Guangzhi Wang, Lingen Li, Ying Shan, Jian Zhang*



## 핵심 연구 목표
본 논문은 기존의 수동적이고 노동 집약적인 비디오 합성(Video Compositing) 과정을 **생성형 모델** 을 사용하여 자동화하는 것을 목표로 합니다. 특히, 사용자 정의된 크기, 움직임 궤적 및 기타 속성을 기반으로 전경 비디오의 정체성과 움직임을 대상 비디오에 적응적으로 주입하여 배경 일관성을 유지하고 전경 요소의 동적 특성을 보존하는 새로운 **생성형 비디오 합성(Generative Video Compositing)** 태스크를 제시합니다.

## 핵심 방법론
제안된 **GenCompositor** 는 **Diffusion Transformer (DiT)** 파이프라인을 기반으로 설계되었습니다. 주요 구성 요소로는 결과 비디오의 배경 일관성을 보장하는 **경량 DiT 기반 배경 보존 브랜치 (masked token injection 포함)** , 동적 전경 요소를 주입하기 위한 **전체 self-attention 기반 DiT 퓨전 블록** , 그리고 사용자 제어에 따라 레이아웃이 다른 비디오를 융합하기 위한 **확장형 회전 위치 임베딩 (Extended Rotary Position Embedding, EROPE)** 이 있습니다. 훈련 시에는 **luminance augmentation** 과 **mask inflation** 을 적용하여 모델의 일반화 및 견고성을 향상시켰으며, 61K 세트의 비디오로 구성된 새로운 **VideoComp** 데이터셋을 구축했습니다.

## 주요 결과
**GenCompositor** 는 기존의 유사한 솔루션들을 뛰어넘는 성능을 보였습니다. 비디오 조화(Video Harmonization) 태스크에서 **PSNR 42.0010** , **SSIM 0.9487** , **CLIP 0.9713** , **LPIPS 0.0385** 를 달성하여 **Harmonizer** 및 **VideoTripletTransformer** 보다 우수했습니다. 궤적 제어 생성(Trajectory-controlled generation)에서는 **주체 일관성(Subject Consistency) 89.75%** , **배경 일관성(Background Consistency) 93.43%** , **움직임 부드러움(Motion Smoothness) 98.69%** , **심미적 품질(Aesthetic Quality) 52.00%** 을 기록하며 **Tora** 와 **Revideo** 를 능가했습니다.

## AI 실무자를 위한 시사점
이 연구는 비디오 편집 작업에 **AI 자동화** 를 도입하여 수작업의 부담을 크게 줄일 수 있는 실용적인 해결책을 제시합니다. **DiT 기반 아키텍처** 와 **EROPE** 와 같은 혁신적인 위치 임베딩 기법은 다양한 조건(예: 레이아웃 불일치)에서 고품질의 콘텐츠를 생성해야 하는 AI 엔지니어들에게 중요한 참조점이 됩니다. 또한, **VideoComp 데이터셋** 은 향후 생성형 비디오 합성 및 편집 연구의 발전에 기여할 수 있는 귀중한 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.