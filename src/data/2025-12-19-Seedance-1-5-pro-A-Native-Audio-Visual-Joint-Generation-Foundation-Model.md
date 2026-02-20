---
title: "[논문리뷰] Seedance 1.5 pro: A Native Audio-Visual Joint Generation Foundation Model"
excerpt: "arXiv에 게시된 'Seedance 1.5 pro: A Native Audio-Visual Joint Generation Foundation Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio-Visual Generation
  - Diffusion Transformer
  - Multimodal AI
  - Speech Synchronization
  - Video Generation
  - Reinforcement Learning from Human Feedback
  - Inference Acceleration

permalink: /ai/review/2025-12-19-Seedance-1-5-pro-A-Native-Audio-Visual-Joint-Generation-Foundation-Model/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.13507)

**저자:** ByteDance Seed Team



## 핵심 연구 목표
본 논문은 오디오와 비디오를 통합적으로 생성하는 **기반 모델(foundation model)** 인 Seedance 1.5 pro를 소개합니다. 이 모델은 **탁월한 오디오-비디오 동기화** 및 **최고 수준의 생성 품질** 을 달성하며, **네이티브 조인트 오디오-비디오 생성** 을 위한 전문적인 콘텐츠 제작 엔진으로 자리매김하는 것을 목표로 합니다. 기존 비디오 생성 모델의 한계를 넘어 진정한 멀티모달 콘텐츠 생성 역량을 제공하고자 합니다.

## 핵심 방법론
Seedance 1.5 pro는 **이중 분기 Diffusion Transformer 아키텍처** 를 기반으로 하며, **MMDiT [1] 아키텍처** 에 **교차 모달 조인트 모듈** 을 통합하여 깊이 있는 교차 모달 상호작용을 구현합니다. 모델은 **특수화된 다단계 데이터 파이프라인** 을 통해 고품질 데이터로 학습되었으며, **Supervised Fine-Tuning (SFT)** 과 다차원 보상 모델을 갖춘 **Reinforcement Learning from Human Feedback (RLHF) [7, 14-16]** 을 사용하여 후처리 최적화를 수행했습니다. 또한, **다단계 증류 프레임워크 [4, 8, 10]** 와 양자화 및 병렬화 기술을 통해 **10배 이상** 의 추론 속도 가속화를 달성했습니다.

## 주요 결과
Seedance 1.5 pro는 영상 및 오디오 평가 모두에서 경쟁 모델인 **Kling 2.5, Kling 2.6, Veo 3.1** 및 **Sora 2** 대비 우수한 성능을 보였습니다. 특히, **Text-to-Video (T2V)** 및 **Image-to-Video (I2V)** 태스크에서 모션 품질, 프롬프트 충실도, 시각적 심미성에서 선도적인 위치를 차지했습니다. 오디오 부문에서는 **Veo 3.1** 및 **Kling 2.6** 대비 **향상된 립싱크 정확도와 음성-시각 동기화** 를 보여주며, 중국어 음성 생성에서 특히 강점을 나타냈습니다. **RLHF 훈련 속도는 약 3배 향상** 되었으며, 추론 속도는 **10배 이상 가속화** 되었습니다.

## AI 실무자를 위한 시사점
이 모델은 **높은 오디오-비디오 동기화** 와 **다국어 및 방언 립싱크** 기능을 제공하여 실제 미디어 콘텐츠 제작에 혁신적인 도구로 활용될 수 있습니다. **전문적인 카메라 제어** 및 **강화된 내러티브 일관성** 은 영화, 단편 드라마, 광고 등 고품질 비디오 제작 워크플로우에 직접적으로 적용 가능합니다. **10배 이상의 추론 속도 가속화** 는 실제 서비스 배포 시 비용 효율성과 사용자 경험 측면에서 큰 이점을 제공할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.