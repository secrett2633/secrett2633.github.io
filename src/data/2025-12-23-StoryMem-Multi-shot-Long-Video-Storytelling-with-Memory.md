---
title: "[논문리뷰] StoryMem: Multi-shot Long Video Storytelling with Memory"
excerpt: "이 [arXiv]에 게시한 'StoryMem: Multi-shot Long Video Storytelling with Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Storytelling
  - Multi-shot Video Generation
  - Memory Mechanism
  - Diffusion Models
  - Cross-shot Consistency
  - Latent Video Diffusion
  - ROPE Shift
  - Keyframe Selection

permalink: /ai/review/2025-12-23-StoryMem-Multi-shot-Long-Video-Storytelling-with-Memory/

toc: true
toc_sticky: true

date: 2025-12-23 00:00:00+0900+0900
last_modified_at: 2025-12-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.19539)

**저자:** Kaiwen Zhang, Liming Jiang, Angtian Wang, Jacob Zhiyuan Fang, Tiancheng Zhi, Qing Yan, Hao Kang, Xin Lu, Xingang Pan



## 핵심 연구 목표
본 논문은 영화적 품질과 장거리 일관성을 갖춘 다중 샷 장편 비디오 스토리텔링을 생성하는 문제를 해결하는 것을 목표로 합니다. 기존의 단일 샷 비디오 확산 모델이 겪는 샷 간의 시각적 불일치와, 전체 비디오를 한 번에 생성하는 모델의 높은 계산 비용 및 데이터 희소성 문제를 극복하여 효율적이면서도 일관성 있는 비디오를 생성하고자 합니다.

## 핵심 방법론
저자들은 인간의 기억에서 영감을 받아 명시적인 시각적 기억을 조건으로 하는 반복적인 샷 합성 방식인 **StoryMem** 패러다임을 제안합니다. 이는 새롭게 고안된 **Memory-to-Video (M2V)** 설계를 통해 구현되며, 이전 생성 샷의 핵심 프레임을 담은 컴팩트하고 동적으로 업데이트되는 기억 뱅크를 유지합니다. 저장된 기억은 **잠재 공간 연결(latent concatenation)** 과 **음의 ROPE(Rotary Position Embedding) 시프트** 를 통해 단일 샷 비디오 확산 모델( **Wan2.2-I2V** )에 주입되며, 이는 **LoRA(Low-Rank Adaptation) 미세 조정** 만으로 이루어집니다. 기억 뱅크의 정보성과 신뢰성을 보장하기 위해 **CLIP 특징** 기반의 **의미론적 키프레임 선택 전략** 과 **HPSv3** 를 활용한 **심미적 선호도 필터링** 이 적용됩니다.

## 주요 결과
**StoryMem** 은 새로운 다중 씬, 다중 샷 비디오 스토리텔링 벤치마크인 **ST-Bench** 에서 이전 방법론 대비 우수한 교차 샷 일관성을 달성했습니다. 특히, 교차 샷 일관성 지표에서 기존 베이스 모델 대비 **28.7%** , 최신 **HoloCine** 대비 **9.4%** 높은 성능을 기록했습니다. 또한, 높은 미적 품질과 프롬프트 준수도를 유지하며, 사용자 연구에서도 대부분의 평가 항목에서 기존 모델보다 일관성 면에서 선호도가 높게 나타났습니다.

## AI 실무자를 위한 시사점
**StoryMem** 은 기존의 고품질 단일 샷 비디오 확산 모델을 장편 스토리텔링에 효과적으로 활용할 수 있는 효율적인 방법을 제시합니다. **LoRA 미세 조정** 과 **메모리 메커니즘** 을 통해 대규모 재훈련 없이도 샷 간 일관성을 확보할 수 있어, 리소스 제약이 있는 환경에서 장편 비디오 콘텐츠를 생성하는 데 실용적입니다. 또한, **참조 이미지 기반 생성(R2V)** 및 **매끄러운 샷 전환** 지원을 통해 AI 기반 비디오 제작 파이프라인의 유연성을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.