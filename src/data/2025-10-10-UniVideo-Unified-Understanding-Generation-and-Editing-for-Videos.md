---
title: "[논문리뷰] UniVideo: Unified Understanding, Generation, and Editing for Videos"
excerpt: "Xintao Wang이 arXiv에 게시한 'UniVideo: Unified Understanding, Generation, and Editing for Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Unified Multimodal Model
  - Video Generation
  - Video Editing
  - MLLM
  - Diffusion Transformer
  - In-Context Learning
  - Zero-shot Generalization
  - Multimodal AI

permalink: /ai/review/2025-10-10-UniVideo-Unified-Understanding-Generation-and-Editing-for-Videos/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08377)

**저자:** Cong Wei, Quande Liu, Zixuan Ye, Qiulin Wang, Xintao Wang, Pengfei Wan, Kun Gai, Wenhu Chen



## 핵심 연구 목표
기존의 통합 멀티모달 모델들이 이미지 도메인에 주로 한정되어 있고, 비디오 관련 작업은 태스크별 전문 모델에 의존하는 한계를 극복하고자 합니다. 본 연구는 비디오에 대한 **통합적인 이해, 생성, 편집** 을 단일 프레임워크 내에서 수행할 수 있는 다재다능한 모델을 개발하는 것을 목표로 합니다.

## 핵심 방법론
UniVideo는 **듀얼 스트림 설계** 를 채택하여, 명령어 이해를 위한 **Multimodal Large Language Model (MLLM)** 과 비디오 생성을 위한 **Multimodal DiT (MMDiT)** 를 결합합니다. **MLLM** 은 복합적인 멀티모달 명령어를 해석하고, **MMDiT** 는 VAE 인코더를 통해 시각적 신호를 통합하여 세밀한 시각적 일관성을 유지합니다. **텍스트-이미지(T2I), 텍스트-비디오(T2V), 이미지-비디오(I2V), 인-컨텍스트 비디오 생성 및 편집** 등 다양한 태스크에서 통합 훈련을 수행하여 모델의 다목적성을 확보했습니다.

## 주요 결과
UniVideo는 **텍스트/이미지-비디오 생성** , **인-컨텍스트 비디오 생성 및 편집** 에서 최신 태스크별 모델들과 동등하거나 우수한 성능을 달성했습니다. 특히, **인-컨텍스트 비디오 생성** 에서 단일 참조 시 **SC(Subject Consistency) 0.88** , 다중 참조 시 **SC 0.81** 로 최고 성능을 기록했습니다. 또한, **마스크 프리(mask-free)** 비디오 편집 환경에서도 **ID Insertion (CLIP-I↑ 0.693)** 및 **ID Swap (CLIP-I↑ 0.728)** 에서 경쟁력 있는 결과를 보였습니다. 훈련되지 않은 **자유형 비디오 편집** 및 **새로운 태스크 조합(예: 편집+스타일 전이)** 에 대한 **제로샷 일반화** 능력을 성공적으로 입증했습니다.

## AI 실무자를 위한 시사점
UniVideo는 비디오 이해, 생성, 편집을 위한 **단일 통합 프레임워크** 를 제공하여, AI 개발자들이 여러 전문 모델을 관리하는 복잡성을 줄일 수 있습니다. 특히, **마스크 없이도 비디오를 편집** 할 수 있는 기능과 **제로샷 일반화 능력** 은 사용자 경험을 크게 개선하고 새로운 응용 분야의 가능성을 열어줍니다. 이는 비디오 기반 AI 어시스턴트 개발에 중요한 진전을 가져올 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.