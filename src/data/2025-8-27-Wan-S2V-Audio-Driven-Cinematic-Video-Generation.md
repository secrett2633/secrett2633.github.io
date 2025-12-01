---
title: "[논문리뷰] Wan-S2V: Audio-Driven Cinematic Video Generation"
excerpt: "Chaonan Ji이 [arXiv]에 게시한 'Wan-S2V: Audio-Driven Cinematic Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio-Driven Video Generation
  - Cinematic Video
  - Diffusion Models
  - Transformer Architecture
  - Long Video Consistency
  - Human Animation
  - Multimodal Control
  - Data Curation

permalink: /ai/review/2025-8-27-Wan-S2V-Audio-Driven-Cinematic-Video-Generation/

toc: true
toc_sticky: true

date: 2025-08-27 13:22:18+0900
last_modified_at: 2025-08-27 13:22:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18621)

## 저자: HumanAIGC Team, Tongyi Lab, Alibaba



## 핵심 연구 목표
본 연구는 기존 오디오 기반 캐릭터 애니메이션 모델이 복잡한 영화 및 TV 프로덕션 시나리오(미묘한 상호작용, 현실적인 신체 움직임, 다이내믹한 카메라 워크)에서 한계를 보이는 문제를 해결합니다. **Wan-S2V** 모델을 통해 오디오 입력을 기반으로 영화 수준의 캐릭터 애니메이션을 구현하고, 시네마틱 맥락에서 표현력과 충실도를 향상시키는 것을 목표로 합니다.

## 핵심 방법론
최신 **Wan 텍스트-투-비디오 파운데이션 모델** 을 기반으로 구축된 **Wan-S2V** 는 텍스트(전반적인 동역학 및 카메라 움직임)와 오디오(미세한 표정 및 국부적 동작)를 결합한 멀티모달 제어 방식을 사용합니다. **Qwen-VL2.5-72B** 를 활용한 상세 비디오 캡셔닝과 엄선된 영화/TV 데이터셋으로 모델을 훈련하며, **FSDP** 와 **Context Parallelism** 을 결합한 하이브리드 병렬 학습 전략과 **다단계 훈련 방식** 을 도입하여 대규모 모델 학습의 안정성을 확보했습니다. 특히 **Frame Pack 모듈** 을 통해 다수의 모션 프레임을 압축하여 장기 비디오 일관성을 유지합니다.

## 주요 결과
**Wan-S2V** 는 **Hunyuan-Avatar** 및 **Omnihuman** 과 같은 기존 SOTA 모델 대비 탁월한 성능을 보였습니다. 정량적 평가에서 이미지 품질( **FID 15.66** , **SSIM 0.734** , **PSNR 20.49** ), 비디오 일관성( **FVD 129.57** ), 아이덴티티 일관성( **CSIM 0.677** )에서 가장 우수한 점수를 달성했습니다. 질적 평가에서도 얼굴 왜곡 없이 일관된 캐릭터 아이덴티티와 더 넓은 범위의 움직임을 생성하며, 특히 **FramePack** 을 활용하여 여러 클립에 걸친 장기적인 모션 일관성을 효과적으로 유지했습니다 (단, **EMO2** 모델이 Sync-C, EFID, HKC, HKV 지표에서 일부 더 우수한 성능을 보였습니다).

## AI 실무자를 위한 시사점
본 연구는 텍스트와 오디오의 시너지를 통해 복잡한 시네마틱 비디오 생성의 가능성을 입증하여 AI/ML 엔지니어들에게 **멀티모달 제어 시스템 설계** 의 중요성을 강조합니다. **대규모 데이터셋 구축, 정교한 데이터 필터링, 하이브리드 병렬 학습, 다단계 미세 조정** 과 같은 훈련 전략은 고품질의 복잡한 비디오 생성 모델 개발에 필수적임을 시사합니다. 향후 **고급 캐릭터 제어 및 동적 춤 생성** 과 같은 영역으로의 확장 가능성을 보여주며, 영화/TV 분야의 AI 응용에 중요한 발판을 마련했습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.