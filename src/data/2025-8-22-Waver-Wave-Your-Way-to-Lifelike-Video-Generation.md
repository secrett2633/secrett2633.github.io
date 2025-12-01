---
title: "[논문리뷰] Waver: Wave Your Way to Lifelike Video Generation"
excerpt: "Yifu Zhang이 [arXiv]에 게시한 'Waver: Wave Your Way to Lifelike Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Foundation Model
  - Diffusion Model
  - Transformer
  - Text-to-Video
  - Image-to-Video
  - Super-Resolution
  - Data Curation

permalink: /ai/review/2025-8-22-Waver-Wave-Your-Way-to-Lifelike-Video-Generation/

toc: true
toc_sticky: true

date: 2025-08-22 13:10:52+0900
last_modified_at: 2025-08-22 13:10:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.15761)

**저자:** Bytedance Waver Team



## 핵심 연구 목표
본 논문은 통합된 이미지 및 비디오 생성을 위한 고성능 파운데이션 모델인 **Waver** 를 제시하며, 특히 720p 원본 해상도에서 5-10초 길이의 비디오를 생성하고 1080p로 업스케일링하는 것을 목표로 합니다. 기존 비디오 생성 모델의 한계점인 복잡한 모션 시나리오에서의 낮은 품질, 고해상도 비디오 생성 기술의 불투명성, T2V/I2V를 위한 개별 모델 사용으로 인한 자원 오버헤드 등을 극복하고자 합니다.

## 핵심 방법론
**Waver** 는 **Rectified Flow Transformer** 기반으로, **Task-Unified DiT** (720p 생성)와 **Cascade Refiner** (1080p 업스케일링) 두 가지 모듈로 구성됩니다. **Hybrid Stream DiT 아키텍처** 는 모달리티 정렬 및 훈련 수렴을 가속화하며, **MLLM 기반 비디오 품질 모델** 을 포함한 **포괄적인 데이터 큐레이션 파이프라인** 을 구축하여 고품질 훈련 데이터를 확보합니다. 또한, **하이브리드 위치 임베딩** 과 **윈도우 어텐션** 을 통해 효율성을 높이고, **모션 최적화** 를 위한 **모드 샘플링** 및 **미학 최적화** 를 위한 **합성 데이터 강화** 등 세부적인 훈련 및 추론 기법을 제시합니다.

## 주요 결과
**Waver** 는 **Artificial Analysis** 의 T2V 및 I2V 리더보드에서 **상위 3위** 를 차지하며, **Kling2.0** , **Wan2.1** , **Veo3** 와 같은 경쟁 모델들을 뛰어넘는 성능을 입증했습니다. 특히 **Hermes Motion Testset** 과 같은 복잡한 모션 시나리오에서 모션 품질과 프롬프트 준수에서 두드러진 강점을 보였습니다. **Cascade Refiner** 를 통한 1080p 업스케일링은 단일 단계 방식 대비 **40%의 가속** 을 달성했습니다.

## AI 실무자를 위한 시사점
**Waver** 는 T2V, I2V, T2I 작업을 단일 통합 프레임워크에서 지원하여 모델 개발 및 배포의 효율성을 크게 향상시킵니다. **상세한 데이터 큐레이션 및 훈련 레시피** 는 고품질 비디오 생성 모델 훈련을 위한 실용적인 가이드라인을 제공하며, **하이브리드 스트림 DiT** 및 **계단식 리파이너 아키텍처** 는 고해상도 비디오 생성의 성능과 효율성 사이의 균형을 맞추는 데 중요한 시사점을 줍니다. 특히 **복잡한 모션과 미학적 품질을 최적화** 하는 방법론은 실제 애플리케이션에 매우 유용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.