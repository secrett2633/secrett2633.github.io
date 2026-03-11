---
title: "[논문리뷰] Omni-Diffusion: Unified Multimodal Understanding and Generation with Masked Discrete Diffusion"
excerpt: "arXiv에 게시된 'Omni-Diffusion: Unified Multimodal Understanding and Generation with Masked Discrete Diffusion' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal AI
  - Discrete Diffusion Models
  - Masked Language Modeling
  - Unified Generative Models
  - Any-to-Any
  - Speech-to-Image
  - Visual Question Answering

permalink: /ai/review/2026-03-11-Omni-Diffusion-Unified-Multimodal-Understanding-and-Generation-with-Masked-Discrete-Diffusion/

toc: true
toc_sticky: true

date: 2026-03-11 00:00:00+0900+0900
last_modified_at: 2026-03-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.06577)

**저자:** Lijiang Li, Zuwei Long, Yunhang Shen, Heting Gao, Haoyu Cao, Xing Sun, Caifeng Shan, Ran He, Chaoyou Fu



## 핵심 연구 목표
본 논문은 기존 멀티모달 대규모 언어 모델(MLLM)이 주로 사용하는 **자기회귀(autoregressive) 아키텍처** 의 한계를 극복하고, 텍스트, 음성, 이미지 전반에 걸친 이해 및 생성을 통합할 수 있는 새로운 **확률적 모델링 대안** 을 탐색하는 것을 목표로 합니다. 특히, 마스크 기반 이산 확산 모델(mask-based discrete diffusion models)을 기반으로 하는 최초의 **Any-to-Any 멀티모달 언어 모델** 인 **Omni-Diffusion** 을 제안하여, 다양한 양식의 이산 토큰에 대한 **공동 분포** 를 직접 모델링하고자 합니다.

## 핵심 방법론
**Omni-Diffusion** 은 **마스크 기반 이산 확산 모델** 을 백본으로 사용하며, 이미지 토큰화에는 **MAGVIT-v2** , 음성 인코딩에는 **SenseVoiceSmall** , 음성 디코딩에는 **GLM-4-Voice decoder** 를 활용합니다. 사전 훈련된 이산 확산 언어 모델인 **Dream-7B** 를 기반으로 멀티모달 처리 능력을 확장하였으며, 효과적인 멀티모달 정렬을 위해 **3단계 점진적 훈련 파이프라인** 을 도입했습니다. 또한, 가변 길이 생성을 위한 **감쇠된 테일-패드 마스킹** 과 이미지 품질 향상을 위한 **위치 패널티** , 음성 대화 성능 향상을 위한 **특수 토큰 사전-채움** 및 **적응형 토큰 길이 할당** 과 같은 추론 기법을 개발했습니다.

## 주요 결과
**Omni-Diffusion** 은 다양한 벤치마크에서 기존 자기회귀 기반 멀티모달 시스템과 비교하여 동등하거나 우수한 성능을 달성했습니다. 음성 작업에서는 **LibriTTS 벤치마크** 에서 기존 음성 LLM인 **GLM-4-Voice(5.64 WER↓)** 대비 **3.07 WER↓** 을 기록하며 크게 개선된 성능을 보였습니다. 시각적 질문 응답(VQA) 태스크에서는 **POPE 76.6%** 및 **MME-P 1216.7** 를 달성하여 대부분의 비교 모델을 능가했으며, 텍스트-투-이미지 생성에서 **CLIP-T 0.235** 및 **CLIP-I 0.667** 를 기록하며 다른 Any-to-Any 모델과 유사하거나 우수한 성능을 보여주었습니다. 또한, 최소 **10단계의 추론 단계** 만으로도 높은 생성 품질을 유지하여 효율적인 샘플링 능력을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **이산 확산 모델** 이 자기회귀 모델의 한계를 넘어선, 통합된 멀티모달 파운데이션 모델의 강력한 백본이 될 수 있음을 입증했습니다. 제안된 **훈련 파이프라인** 과 **추론 기법** 은 실제 AI 애플리케이션에서 견고한 멀티모달 시스템을 구축하기 위한 실용적인 전략을 제공합니다. 특히, **빠른 샘플링 속도** 와 이미지 **인페인팅(inpainting) 능력** 은 효율적인 멀티모달 콘텐츠 생성 및 편집에 직접적으로 활용될 수 있으며, 여러 모달리티에 걸친 **통합된 의미론적 표현 공간** 은 복잡한 멀티모달 태스크 개발을 간소화할 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.