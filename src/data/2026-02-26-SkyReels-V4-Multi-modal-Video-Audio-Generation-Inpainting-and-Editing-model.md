---
title: "[논문리뷰] SkyReels-V4: Multi-modal Video-Audio Generation, Inpainting and Editing model"
excerpt: "arXiv에 게시된 'SkyReels-V4: Multi-modal Video-Audio Generation, Inpainting and Editing model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-modal Generation
  - Video-Audio Synthesis
  - Video Inpainting
  - Video Editing
  - Diffusion Transformer
  - MMLM
  - Super-resolution
  - Frame Interpolation

permalink: /ai/review/2026-02-26-SkyReels-V4-Multi-modal-Video-Audio-Generation-Inpainting-and-Editing-model/

toc: true
toc_sticky: true

date: 2026-02-26 00:00:00+0900+0900
last_modified_at: 2026-02-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.21818)

**저자:** SkyReels Team, Skywork AI



## 핵심 연구 목표
이 논문은 텍스트, 이미지, 비디오, 마스크, 오디오 참조를 포함한 다양한 입력을 처리하고, 비디오-오디오 생성, 인페인팅 및 편집 기능을 단일 프레임워크 내에서 통합적으로 지원하는 **멀티모달 비디오 파운데이션 모델** 을 개발하는 것을 목표로 합니다. 기존 모델들의 파편화된 접근 방식과 제한된 멀티모달 정렬의 한계를 극복하고, 영화적 품질과 효율성으로 고해상도, 장시간 비디오 콘텐츠를 생성하고자 합니다.

## 핵심 방법론
이 모델은 비디오 합성을 위한 스트림과 시간적으로 정렬된 오디오 생성을 위한 스트림을 포함하는 **듀얼 스트림 Multimodal Diffusion Transformer (MMDiT)** 아키텍처를 채택합니다. 두 스트림은 **강력한 MMLM(Multimodal Large Language Model)** 기반의 텍스트 인코더를 공유하여 멀티모달 이해와 지침 준수를 가능하게 합니다. 특히, 비디오 인페인팅 및 편집은 **채널 연결(channel concatenation) 형식** 으로 통합되어 다양한 작업이 마스크된 입력으로 처리되며, 고해상도 및 장시간 생성을 위해 **저해상도 전체 시퀀스 및 고해상도 키프레임 생성** 후 **슈퍼 해상도 및 프레임 보간 모듈(Refiner)** 을 사용하는 효율성 전략을 도입했습니다.

## 주요 결과
SkyReels-V4는 **SkyReels-VABench** 벤치마크에서 모든 경쟁 모델 중 **가장 높은 종합 평균 점수** 를 달성했으며, 특히 **프롬프트 준수(Prompt Following)** 및 **모션 품질(Motion Quality)** 에서 강점을 보였습니다. 또한, Artificial Analysis Text-to-Video with Audio Arena 리더보드에서 **3위** 를 차지하며 **Veo 3.1** , **Kling 3.0** , **Sora-2** 등과 경쟁하여 강력한 성능을 입증했습니다. 이 모델은 최대 **1080p 해상도, 32 FPS, 15초 길이** 의 동기화된 오디오를 포함하는 고품질 비디오 생성을 지원하며, **VSA 메커니즘** 을 통해 어텐션 계산 비용을 **약 3배** 절감했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **SkyReels-V4** 를 활용하여 텍스트, 이미지, 비디오, 마스크, 오디오 참조 등 복합적인 멀티모달 입력을 기반으로 고품질의 비디오 콘텐츠를 **생성, 인페인팅, 편집** 하는 통합적인 솔루션을 구현할 수 있습니다. 특히 **1080p 해상도, 32 FPS, 15초 길이** 의 영화적 품질 비디오를 효율적으로 생성할 수 있어, 전문적인 미디어 제작 및 광고, 소셜 미디어 콘텐츠 생성 등 광범위한 실제 응용 분야에 직접적으로 활용될 수 있습니다. **MMDiT** 및 **MMLM** 기반의 유연한 아키텍처는 복잡한 사용자 지침을 따르는 고급 비디오 조작 작업에 새로운 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.