---
title: "[논문리뷰] Does Hearing Help Seeing? Investigating Audio-Video Joint Denoising for Video Generation"
excerpt: "arXiv에 게시된 'Does Hearing Help Seeing? Investigating Audio-Video Joint Denoising for Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Audio-Video Multimodal
  - Joint Denoising
  - Diffusion Models
  - Transformer Architecture
  - World Models
  - Physical Commonsense
  - Multimodal Training

permalink: /ai/review/2025-12-03-Does-Hearing-Help-Seeing-Investigating-Audio-Video-Joint-Denoising-for-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.02457)

**저자:** Jianzong Wu, Hao Lian, Dachao Hao, Ye Tian, Qingyu Shi, Biaolong Chen, Hao Jiang, Yunhai Tong



## 핵심 연구 목표
본 연구는 오디오-비디오 공동 노이즈 제거 훈련이 비디오 품질에만 중점을 둘 때도 비디오 생성 성능을 향상시키는 근본적인 질문에 답하는 것을 목표로 합니다. 기존 **Text-to-Audio-Video (T2AV)** 시스템이 주로 동기화 및 전반적인 품질을 벤치마킹했지만, 오디오-비디오 공동 노이즈 제거의 비디오 학습에 대한 직접적인 효과를 체계적으로 평가하고자 합니다.

## 핵심 방법론
저자들은 사전에 훈련된 **Text-to-Video (T2V)** 및 **Text-to-Audio (T2A)** 모듈의 지식을 활용하는 **매개변수 효율적인(parameter-efficient) AVFullDiT 아키텍처** 를 제안했습니다. 이 아키텍처는 대칭적인 크로스 모달 정보 교환을 위한 **AVFull-Attention** 과 오디오 및 비디오 토큰의 시간 축을 정렬하는 **AVSyncRoPE** 모듈을 포함합니다. 동일한 설정에서 **AVFullDiT** 를 사용한 **T2AV 모델** 과 **T2V 전용 모델** 을 훈련하여 성능을 비교했습니다.

## 주요 결과
**T2AV 모델** 은 **T2V 모델** 보다 약간 높은 비디오 검증 손실에도 불구하고 일관되게 비디오 지표를 향상시켰습니다. 특히, 물체 접촉 움직임이 많은 **ALT-Merge Greatest Hits** 데이터셋에서 **Physics 지표가 3.14% 개선** 되었고, **VGGSound AV-Tight** 데이터셋에서 **2.51% 개선** 되는 등 물리적 상식(physical commonsense) 측면에서 유의미한 진전을 보였습니다. 이는 T2AV가 더 사실적이고 절제된 움직임을 생성하며 과장되거나 정지된 움직임을 피함을 시사합니다.

## AI 실무자를 위한 시사점
본 연구는 오디오 신호가 시각 이벤트의 인과 관계와 물리적 상호작용을 모델이 내면화하도록 돕는 **강력한 정규화 신호(privileged signal)** 역할을 하여 비디오 생성 모델의 **물리적 상식 이해** 를 향상시킨다는 실용적인 시사점을 제공합니다. 이는 더 강력하고 물리적으로 그라운드된 세계 모델 개발을 위한 **크로스-모달 공동 훈련(cross-modal co-training)** 의 잠재력을 강조하며, 기존 사전 훈련된 단일 모달리티 모델을 효율적으로 활용하는 방법을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.