---
title: "[논문리뷰] Harmony: Harmonizing Audio and Video Generation through Cross-Task Synergy"
excerpt: "이 [arXiv]에 게시한 'Harmony: Harmonizing Audio and Video Generation through Cross-Task Synergy' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio-Visual Generation
  - Cross-Modal Synchronization
  - Diffusion Models
  - Cross-Task Synergy
  - Classifier-Free Guidance
  - Multimodal AI
  - Generative AI

permalink: /ai/review/2025-11-27-Harmony-Harmonizing-Audio-and-Video-Generation-through-Cross-Task-Synergy/

toc: true
toc_sticky: true

date: 2025-11-27 00:00:00+0900+0900
last_modified_at: 2025-11-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.21579)

**저자:** Teng Hu, Zhentao Yu, Guozhen Zhang, Zihan Su, Zhengguang Zhou, Youliang Zhang, Yuan Zhou, Qinglin Lu, Ran Yi



## 핵심 연구 목표
본 논문은 오디오-비디오 동시 생성 모델에서 발생하는 불안정한 오디오-비디오 정렬 문제를 해결하는 것을 목표로 합니다. 특히 **Correspondence Drift** , 비효율적인 글로벌 어텐션 메커니즘, 그리고 기존 **Classifier-Free Guidance (CFG)** 의 교차 모달 편향이라는 세 가지 근본적인 문제점을 극복하고자 합니다.

## 핵심 방법론
논문은 **Cross-Task Synergy 훈련 패러다임** 을 도입하여 오디오-주도 비디오 및 비디오-주도 오디오 생성 태스크의 강력한 지도 신호를 활용해 **Correspondence Drift** 를 완화합니다. 또한, 정밀한 시간 동기화와 전체적인 스타일 일관성을 동시에 달성하기 위해 **Global-Local Decoupled Interaction Module** 을 설계하였으며, 추론 시 정렬 신호를 명시적으로 증폭하는 **Synchronization-Enhanced CFG (SyncCFG)** 를 제안합니다. 모델은 **듀얼-브랜치 아키텍처** 와 **Multi-Modal Diffusion Transformer (MM-DiT)** 를 기반으로 합니다.

## 주요 결과
**Harmony** 는 새로 제안된 **Harmony-Bench** 벤치마크에서 기존 방법론들을 크게 능가하는 성능을 보였습니다. 특히, 오디오-비디오 동기화 지표에서 **Sync-C 5.61** (최고) 및 **Sync-D 7.53** (최저)을 달성하며 최첨단 성능을 확립했습니다. 어블레이션 연구에서는 **SyncCFG** 가 **Sync-C 점수를 5.09에서 6.51로 향상** 시키는 가장 중요한 기여를 했음을 입증했습니다.

## AI 실무자를 위한 시사점
**Harmony** 의 **Cross-Task Synergy** 및 **SyncCFG** 전략은 멀티모달 생성 AI에서 교차 모달 정렬 문제를 해결하는 실용적인 접근 방식을 제공합니다. **Global-Local Decoupled Interaction Module** 은 복잡한 멀티모달 콘텐츠에서 미세한 시간적 일관성과 전반적인 스타일 일관성을 동시에 관리하는 효과적인 설계를 제시합니다. 이 프레임워크는 다양한 오디오 유형과 시각적 스타일을 아우르며 콘텐츠 생성 애플리케이션에 매우 유용할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.