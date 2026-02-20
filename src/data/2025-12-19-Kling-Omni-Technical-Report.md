---
title: "[논문리뷰] Kling-Omni Technical Report"
excerpt: "arXiv에 게시된 'Kling-Omni Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Multimodal Visual Language
  - Generative AI
  - Video Editing
  - Reasoning-enhanced Generation
  - Diffusion Transformer
  - Multi-modal World Simulators

permalink: /ai/review/2025-12-19-Kling-Omni-Technical-Report/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16776)

**저자:** Kling Team, Kuaishou Technology



## 핵심 연구 목표
논문은 단편적인 비디오 생성, 편집, 추론 태스크들을 통합하여 **멀티모달 시각 언어(MVL) 입력** 으로부터 고품질 비디오를 직접 합성하는 **범용 생성 프레임워크인 Kling-Omni** 를 개발하는 것을 목표로 합니다. 기존 모델들의 한계인 단일 태스크 집중, 복잡한 시각적 디테일 처리의 어려움, 심층적인 추론 능력 부족을 극복하고 홀리스틱 시스템을 제시합니다.

## 핵심 방법론
Kling-Omni는 **Prompt Enhancer (PE)** , **Omni-Generator** , **Multimodal Super-Resolution (VSR)** 의 세 가지 핵심 구성 요소를 포함하는 엔드-투-엔드 아키텍처를 사용합니다. 훈련은 **대규모 텍스트-비디오 데이터에 대한 사전 훈련** , 복잡한 MVL 입력에 모델을 정렬하는 **지도 미세 조정(Supervised Fine-tuning)** , 그리고 인간의 미적 선호도에 맞춰 정렬하는 **직접 선호도 최적화(DPO)를 사용한 강화 학습** 의 다단계 전략을 따릅니다. 또한, 효율적인 추론을 위해 **3D 병렬화** , **모델 증류(Distillation)** , **FlashAttention** 및 **하이브리드 양자화** 를 포함한 인프라 최적화가 적용되었습니다.

## 주요 결과
Kling-Omni는 **OmniVideo-1.0 벤치마크** 에서 **Veo 3.1 대비 247% (G+S)/(S+B)의 GSB (Good+Same/Same+Bad) 점수** 로 이미지 참조 기반 비디오 생성에서 우월한 성능을 보였고, **Runway-Aleph 대비 230%의 GSB 점수** 로 비디오 편집 태스크에서 뛰어난 능력을 입증했습니다. 이는 in-context 생성, 추론 기반 편집, 멀티모달 지시 따르기에서 탁월한 역량을 보여주며, 복잡한 시나리오에서 모델의 견고성과 신뢰성을 검증했습니다.

## AI 실무자를 위한 시사점
이 연구는 비디오 생성 및 편집 분야에서 **범용(generalist) 모델의 실현 가능성** 을 강력하게 시사합니다. AI 실무자들은 **멀티모달 시각 언어(MVL) 입력** 을 활용하여 더 정교하고 지능적인 비디오 콘텐츠를 생성하는 새로운 패러다임에 주목할 필요가 있습니다. 또한, 대규모 모델 훈련 및 추론 효율성을 위한 **데이터 시스템 구축** 과 **인프라 최적화** 의 중요성을 강조하며, 향후 **멀티모달 세계 시뮬레이터** 개발의 중요한 발판을 마련했습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.