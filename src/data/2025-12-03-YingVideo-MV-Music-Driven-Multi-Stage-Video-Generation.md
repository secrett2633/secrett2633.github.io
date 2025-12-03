---
title: "[논문리뷰] YingVideo-MV: Music-Driven Multi-Stage Video Generation"
excerpt: "Chaofan Ding이 [arXiv]에 게시한 'YingVideo-MV: Music-Driven Multi-Stage Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Music-Driven Video Generation
  - Diffusion Models
  - Multi-Stage Framework
  - Camera Control
  - Lip-Sync
  - Temporal Coherence
  - Video Diffusion Transformer

permalink: /ai/review/2025-12-03-YingVideo-MV-Music-Driven-Multi-Stage-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.02492)

**저자:** Jiahui Chen, Weida Wang, Runhua Shi, Huan Yang, Chaofan Ding, Zihao Chen



## 핵심 연구 목표
본 논문은 기존 오디오 기반 아바타 비디오 생성 모델에서 잘 다루어지지 않았던 음악 공연 비디오 생성 및 카메라 모션 제어의 한계를 극복하고자 합니다. 고품질의 장편 음악 공연 비디오를 생성하고 편집하는 통합 프레임워크를 개발하여 높은 정체성 일관성, 풍부한 표정, 자연스러운 신체 역학, 정밀한 립싱크 및 다양한 예술적 스타일을 구현하는 것을 목표로 합니다.

## 핵심 방법론
**YingVideo-MV** 는 **음악 분석** 과 **시공간적 인식 확산 Transformer 아키텍처** 를 통합한 **계단식 프레임워크** 입니다. **MV-Director 모듈** 은 다중 모달 입력과 오디오 의미 분석을 통해 해석 가능한 샷 계획을 수립하고, **카메라 어댑터 모듈** 은 카메라 포즈를 잠재 노이즈에 임베딩하여 명시적인 카메라 모션 제어를 가능하게 합니다. 긴 시퀀스의 일관성을 유지하기 위해 **시간 인식 동적 윈도우 범위 전략** 을 도입했으며, **Direct Preference Optimization (DPO)** 을 통해 인간의 미적 선호도에 맞춰 모델을 정렬합니다.

## 주요 결과
**YingVideo-MV** 는 비교 모델 대비 우수한 성능을 입증했습니다. 정량적 지표에서 **FID↓ 30.36** , **FVD↓ 193.68** , **CSIM↑ 0.753** , **Sync-C↑ 6.07** , **Sync-D↓ 8.67** 를 달성하며 **StableAvatar** 및 **InfiniteTalk** 와 같은 기존 모델들을 능가했습니다. 사용자 연구에서는 카메라 움직임의 부드러움과 일관성에서 **4.3±0.6점** , 립싱크 정확도에서 **4.5±0.5점** , 전반적인 비디오 품질에서 **4.4±0.6점** 을 기록하며 주관적인 우수성을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 **음악 기반 비디오 생성** 분야에서 **다중 모달 입력 처리** 와 **명시적 카메라 제어** 의 중요성을 강조하며, **자동화된 고품질 음악 비디오 제작** 을 위한 실용적인 솔루션을 제시합니다. AI 엔지니어는 **계단식 생성 파이프라인** 과 **DPO** 를 활용하여 장편 비디오에서 **오디오-비주얼 동기화** , **캐릭터 정체성 유지** , **표현력 있는 애니메이션** 을 구현하는 모델을 개발할 수 있습니다. 특히 **동적 윈도우 범위 전략** 은 장기적인 비디오 일관성 문제를 해결하는 데 유용하게 적용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.