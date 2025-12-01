---
title: "[논문리뷰] Lumen: Consistent Video Relighting and Harmonious Background Replacement
  with Video Generative Models"
excerpt: "Zixiang Gao이 [arXiv]에 게시한 'Lumen: Consistent Video Relighting and Harmonious Background Replacement
  with Video Generative Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Relighting
  - Background Replacement
  - Generative Models
  - Diffusion Models
  - Temporal Consistency
  - Dataset Generation
  - Video Editing

permalink: /ai/review/2025-8-19-Lumen-Consistent-Video-Relighting-and-Harmonious-Background-Replacement-with-Video-Generative-Models/

toc: true
toc_sticky: true

date: 2025-08-19 13:15:01+0900
last_modified_at: 2025-08-19 13:15:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.12945)

**저자:** Jianshu Zeng, Yuxuan Liu, Yutong Feng, Chenxuan Miao, Zixiang Gao, Jiwang Qu, Jianzhang Zhang, Bin Wang, Kun Yuan



## 핵심 연구 목표
본 연구는 비디오에서 배경을 교체하고 동시에 포그라운드의 조명을 조화롭게 조정하는 비디오 리라이팅 태스크를 해결하는 것을 목표로 합니다. 특히, 포그라운드의 **본래 속성(예: 알베도, 텍스처)을 일관되게 보존** 하면서 시간적 프레임 간 **일관된 조명 변경을 전파** 하는 것이 주된 도전 과제입니다.

## 핵심 방법론
연구팀은 고품질의 paired 비디오 데이터 부족 문제를 해결하기 위해 **3D 렌더링 합성 데이터** 와 **HDR 기반 조명 시뮬레이션을 적용한 현실 데이터** 를 혼합한 대규모 데이터셋을 구축했습니다. 모델은 **DiT(Diffusion Transformer) 아키텍처** 기반의 **Wan2.1** 을 백본으로 하며, **도메인 인식 스타일 어댑터(LoRA 기반)** 를 도입하여 3D 데이터의 물리적 일관성과 현실 데이터의 일반화된 분포를 효과적으로 학습하도록 **멀티-도메인 조인트 트레이닝 커리큘럼** 을 설계했습니다.

## 주요 결과
`Lumen`은 paired 3D 비디오 및 현실 비디오 벤치마크에서 기존 방법론들을 능가하는 성능을 보였습니다. 특히 현실 paired 비디오에서 **PSNR 23.06** , **LPIPS 0.1083(최저)** , **Motion Smoothness 0.9943(최고)** 를 달성하며 우수한 정량적 지표를 기록했습니다. 사용자 연구에서도 `Lumen`은 포그라운드 보존, 배경 품질, 조명 조화 모든 측면에서 가장 높은 평균 점수를 받았습니다.

## AI 실무자를 위한 시사점
`Lumen`은 **대규모 비디오 생성 모델** 을 활용하여 비디오 리라이팅 및 배경 교체의 복잡한 문제를 효과적으로 해결할 수 있음을 입증했습니다. 특히, **합성 및 현실 데이터를 혼합한 데이터셋 구축 전략** 과 **도메인 인식 어댑터를 통한 효율적인 도메인 간 학습** 은 다양한 비디오 생성 및 편집 태스크에 적용 가능한 중요한 방법론적 시사점을 제공합니다. 이는 영화 제작, 전자상거래 등 고품질 비디오 콘텐츠 생성이 필요한 실제 응용 분야에 큰 기여를 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.