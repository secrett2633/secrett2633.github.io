---
title: "[논문리뷰] Large Multimodal Models as General In-Context Classifiers"
excerpt: "arXiv에 게시된 'Large Multimodal Models as General In-Context Classifiers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Multimodal Models
  - In-Context Learning
  - Image Classification
  - Open-World Classification
  - Zero-Shot Learning
  - Vision-Language Models
  - CLIP

permalink: /ai/review/2026-03-06-Large-Multimodal-Models-as-General-In-Context-Classifiers/

toc: true
toc_sticky: true

date: 2026-03-06 00:00:00+0900+0900
last_modified_at: 2026-03-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.23229)

**저자:** Marco Garosi, Matteo Farina, Alessandro Conti, Massimiliano Mancini, Elisa Ricci



## 핵심 연구 목표
본 논문은 대규모 멀티모달 모델(LMMs)이 이미지 분류 작업에서 대조 학습 기반 시각-언어 모델(VLMs)보다 성능이 떨어진다는 기존 인식을 재고하고, 인컨텍스트 학습(ICL)이 LMMs의 분류 능력을 얼마나 향상시킬 수 있는지 탐구합니다. 특히, 고정된 클래스 없이 추론해야 하는 개방형(Open-World) 분류 환경에서의 LMMs 활용 가능성을 제시하고자 합니다.

## 핵심 방법론
폐쇄형(Closed-World) 분류에서는 **Qwen2-VL 7B** , **LLaVA OneVision 7B** , **Phi-3.5-Vision** 등의 최신 LMM들을 **Tip-Adapter** 기반 VLM( **CLIP** variants)과 비교하며, 소수의 예제로 컨텍스트를 제공하는 **Vanilla ICL** 방식을 사용했습니다. 개방형 분류를 위해, 레이블이 없는 이미지를 ICL 예제로 사용하여 반복적으로 의사 레이블을 정제하는 훈련 없는 방법인 **CIRCLE** 을 제안하여 컨텍스트 노이즈 문제를 해결하고 LMM의 성능을 향상시켰습니다.

## 주요 결과
폐쇄형 분류에서 LMMs의 제로샷 성능은 VLM보다 낮았지만, **16-shot ICL** 환경에서 **Phi-3.5-Vision** 이 제로샷 대비 **최대 +29.2%** , **Qwen2-VL-7B** 가 **+17.7%** 성능 향상을 보이며 VLM과 대등하거나 능가했습니다. 개방형 분류에서는 **CIRCLE** 이 기존 LMM 및 VLM 대비 일관되게 우수한 성능을 보였으며, **Qwen2-VL** 의 LI(Llama Inclusion) 점수를 **91.5** 까지 향상시켜 **Pseudo ICL** 의 **81.1** 을 크게 앞섰습니다.

## AI 실무자를 위한 시사점
이 연구는 LMMs가 충분한 컨텍스트와 적절한 ICL 전략이 뒷받침될 경우, **CLIP** 과 같은 특화된 VLM을 능가하는 일반적인 분류기로 기능할 수 있음을 보여줍니다. 특히, 레이블 없는 데이터로 컨텍스트를 스스로 정제하는 **CIRCLE** 과 같은 접근법은 개방형 환경에서 LMM의 활용도를 크게 높여, 수동 레이블링 부담 없이 다양한 분류 태스크에 LMM을 적용할 수 있는 길을 엽니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.