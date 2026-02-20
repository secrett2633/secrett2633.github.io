---
title: "[논문리뷰] DreamOmni3: Scribble-based Editing and Generation"
excerpt: "arXiv에 게시된 'DreamOmni3: Scribble-based Editing and Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Editing
  - Image Generation
  - Scribble-based Control
  - Multimodal AI
  - Diffusion Models
  - Data Synthesis
  - Human-Computer Interaction
  - Instruction-based Editing

permalink: /ai/review/2025-12-31-DreamOmni3-Scribble-based-Editing-and-Generation/

toc: true
toc_sticky: true

date: 2025-12-31 00:00:00+0900+0900
last_modified_at: 2025-12-31 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.22525)

**저자:** Bin Xia, Bohao Peng, Jiyang Liu, Sitong Wu, Jingyao Li, Junjia Huang, Xu Zhao, Yitong Wang, Ruihang Chu, Bei Yu, Jiaya Jia



## 핵심 연구 목표
본 논문은 통합 생성 및 편집 모델에서 텍스트 프롬프트의 한계, 즉 사용자의 의도된 편집 위치 및 미세한 시각적 세부 사항을 정확히 포착하지 못하는 문제를 해결하고자 합니다. 이를 위해 **스크리블 기반 편집 및 생성** 이라는 두 가지 새로운 태스크를 제안하고, 사용자 텍스트, 이미지 및 자유형 스케치를 결합하여 더욱 유연한 그래픽 사용자 인터페이스(GUI) 기반 콘텐츠 생성을 가능하게 하는 **DreamOmni3** 모델을 소개합니다.

## 핵심 방법론
**DreamOmni3** 는 기존 **DreamOmni2** 프레임워크를 기반으로 스크리블 기반 편집 및 생성을 통합합니다. 데이터 부족 문제를 해결하기 위해, **Refseg 서비스** 와 **GPT-Image-1 모델** 을 활용한 **종합적인 데이터 합성 파이프라인** 을 구축하여 스크리블, 텍스트, 이미지 명령이 포함된 고품질 데이터셋을 생성합니다. 특히, 원본 이미지와 스크리블된 이미지를 **동일한 인덱스 및 위치 인코딩** 을 사용하여 **MM-DIT 모델** 에 **공동 입력(joint input)** 하는 방식을 채택하여 픽셀 일관성을 유지하고 정확한 편집을 가능하게 합니다. 모델은 **Qwen2.5-VL 7B VLM** 및 **FLUX Kontext** 의 학습 방식에 **LoRA(rank 256)** 를 적용하여 약 **400 A100 시간** 동안 훈련되었습니다.

## 주요 결과
**DreamOmni3** 는 스크리블 기반 편집에서 인간 평가 기준으로 **0.5750** 의 점수를 기록하며, **GPT-40 (0.5875)** 과 대등한 성능을 보이고 다른 상용 모델들을 능가했습니다. 스크리블 기반 생성에서는 인간 평가 기준 **0.5349** 를 달성하여 **Nano Banana (0.2326)** 및 다른 오픈소스 모델들을 크게 앞질렀습니다. 특히, **공동 입력 방식** 과 **동일한 인덱스 및 위치 인코딩** 이 편집 일관성과 성능 향상에 크게 기여함을 입증했습니다.

## AI 실무자를 위한 시사점
**스크리블 기반 제어** 는 텍스트 프롬프트의 한계를 넘어, 이미지 편집 및 생성에 대한 더욱 직관적이고 정밀한 사용자 경험을 제공합니다. 데이터가 부족한 복잡한 멀티모달 태스크에서 **데이터 합성 파이프라인** 은 고품질 학습 데이터를 효율적으로 구축하는 강력한 방법론을 제시합니다. **DreamOmni3** 의 **공동 입력 스키마와 일관된 인코딩 방식** 은 사용자 스케치를 기존 이미지-언어 지침과 통합하는 효과적인 방법을 보여주며, 이는 창의적 애플리케이션을 위한 차세대 AI 도구 개발에 영감을 줄 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.