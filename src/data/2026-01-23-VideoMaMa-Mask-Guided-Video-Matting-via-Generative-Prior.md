---
title: "[논문리뷰] VideoMaMa: Mask-Guided Video Matting via Generative Prior"
excerpt: "이 [arXiv]에 게시한 'VideoMaMa: Mask-Guided Video Matting via Generative Prior' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Matting
  - Diffusion Models
  - Generative Priors
  - Mask-Guided
  - Pseudo-labeling
  - Large-scale Dataset
  - Zero-shot Generalization

permalink: /ai/review/2026-01-23-VideoMaMa-Mask-Guided-Video-Matting-via-Generative-Prior/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.14255)

**저자:** Sangbeom Lim, Seoung Wug Oh, Seungryong Kim, Jiahui Huang, Heeji Yoon, Joon-Young Lee



## 핵심 연구 목표
논문은 비디오 매팅 모델이 실제 세계 비디오에 효과적으로 일반화되지 못하는 문제, 즉 레이블링된 데이터의 희소성과 합성 비디오와 실제 비디오 간의 도메인 간극을 해결하는 것을 목표로 합니다. 이를 위해 거친 세그멘테이션 마스크를 픽셀 정확도가 높은 알파 매트로 변환하여, 대규모의 고품질 비디오 매팅 주석을 확장성 있게 생성하는 것을 제안합니다.

## 핵심 방법론
본 연구는 **사전 학습된 비디오 확산 모델(SVD)** 기반의 **Video Mask-to-Matte Model (VideoMaMa)** 을 도입하여 이진 마스크로부터 고품질 알파 매트를 생성합니다. **두 단계 훈련 전략** 을 통해 공간적 세부 사항과 시간적 일관성을 각각 학습하며, **마스크 증강** 과 **DINOv3 피처** 를 활용한 **의미론적 지식 주입** 으로 모델의 견고성을 강화합니다. VideoMaMa를 활용해 **MA-V (Matting Anything in Video)** 라는 5만 개 이상의 실제 비디오로 구성된 대규모 **의사 레이블링 데이터셋** 을 구축했으며, **SAM2** 를 MA-V에 파인튜닝하여 **SAM2-Matte** 를 생성했습니다.

## 주요 결과
**VideoMaMa** 는 기존 마스크 기반 매팅 모델인 **MaGGIe [14]** 및 **MGM [49]** 보다 **V-HIM60** 및 **YouTubeMatte** 벤치마크에서 일관되게 우수한 성능을 보였습니다. 예를 들어, **V-HIM60 Hard** 에서 **Downsample 8x** 마스크 입력 시 **MAD 1.306** 으로 **MaGGIe** 의 2.3790보다 현저히 낮았습니다. **MA-V 데이터셋** 으로 파인튜닝된 **SAM2-Matte** 는 기존 매팅 데이터셋으로 훈련된 **SAM2** 보다 실제 비디오에서 훨씬 더 견고한 매팅 성능을 달성했으며, **V-HIM60 Easy** 에서 **MAD 1.3446** 을 기록하며 **MatAnyone** 의 3.5803을 크게 앞섰습니다.

## AI 실무자를 위한 시사점
**확산 모델** 의 **생성적 사전 지식** 은 제한된 합성 데이터만으로도 실제 세계 비디오에 대한 강력한 **제로샷 일반화** 를 가능하게 하여, 데이터 부족 문제를 해결하는 데 유용합니다. **VideoMaMa** 와 같은 모델은 거친 세그멘테이션 마스크를 **고품질 알파 매트** 로 변환하여, 기존 세그멘테이션 데이터셋을 활용해 **대규모 매팅 데이터셋(MA-V)** 을 효율적으로 구축하는 **의사 레이블링 파이프라인** 을 구현할 수 있습니다. 이는 AI 엔지니어들이 **SAM2** 와 같은 범용 모델을 실제 환경에 최적화된 매팅 모델로 전환할 수 있는 실용적인 방안을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.