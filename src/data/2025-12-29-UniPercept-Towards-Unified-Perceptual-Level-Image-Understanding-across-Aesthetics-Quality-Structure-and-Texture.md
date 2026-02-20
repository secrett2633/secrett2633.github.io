---
title: "[논문리뷰] UniPercept: Towards Unified Perceptual-Level Image Understanding across Aesthetics, Quality, Structure, and Texture"
excerpt: "Kaiwen Zhu이 arXiv에 게시한 'UniPercept: Towards Unified Perceptual-Level Image Understanding across Aesthetics, Quality, Structure, and Texture' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Perceptual Understanding
  - Image Aesthetics
  - Image Quality
  - Image Structure
  - Image Texture
  - MLLM Benchmark
  - Visual Question Answering
  - Reward Model

permalink: /ai/review/2025-12-29-UniPercept-Towards-Unified-Perceptual-Level-Image-Understanding-across-Aesthetics-Quality-Structure-and-Texture/

toc: true
toc_sticky: true

date: 2025-12-29 00:00:00+0900+0900
last_modified_at: 2025-12-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.21675)

**저자:** Kaiwen Zhu, Yuandong Pu, Xiaohui Li, Jiayang Li, Shuo Cao



## 핵심 연구 목표
본 연구는 **Multimodal Large Language Models (MLLMs)** 이 이미지의 미학, 품질, 구조, 텍스처와 같은 지각 수준의 특성을 이해하는 데 어려움을 겪는 문제를 해결하고자 합니다. 기존 MLLM의 한계를 극복하고 인간의 시각적 판단에 더욱 부합하는 **통합된 지각 수준 이미지 이해 프레임워크와 벤치마크** 를 구축하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **Image Aesthetics Assessment (IAA)** , **Image Quality Assessment (IQA)** , **Image Structure and Texture Assessment (ISTA)** 세 가지 도메인에 걸쳐 **계층적 정의 시스템** 을 갖춘 **UniPercept-Bench** 벤치마크를 제안합니다. **Visual Rating (VR)** 과 **Visual Question Answering (VQA)** 두 가지 태스크를 지원하며, 데이터는 **MLLM 기반의 QA 생성, 샘플링 및 인간 정제 파이프라인** 을 통해 구축되었습니다. 베이스라인 모델인 **UniPercept** 는 **Domain-Adaptive Pre-Training (800K 샘플)** 과 **Task-Aligned Reinforcement Learning (GRPO 알고리즘)** 을 사용하여 훈련되었습니다.

## 주요 결과
**UniPercept** 는 **UniPercept-Bench** 에서 기존 MLLM 및 전문화된 모델들을 일관되게 능가하는 성능을 보였습니다. **VR 태스크** 에서 **0.778/0.767 (SRCC/PLCC)** 의 종합 평균을 달성하여 **GPT-4o (0.431/0.410)** 를 크게 앞질렀습니다. **VQA 태스크** 에서는 **80.62%의 종합 정확도** 를 기록하며 **GPT-4o (60.04%)** 보다 우수했습니다. 또한, **UniPercept** 는 **text-to-image (T2I) 생성 모델** 의 **보상 모델** 로 활용될 때 생성 이미지의 IAA 점수를 **65.18점에서 74.24점으로 향상** 시키는 등 지각적 품질을 효과적으로 개선했습니다.

## AI 실무자를 위한 시사점
**UniPercept-Bench** 는 MLLM의 지각 수준 이미지 이해 능력을 평가하고 발전시키기 위한 **표준화된 벤치마크** 를 제공합니다. **UniPercept 모델** 은 T2I 생성 시 미학적 품질, 구조적 풍부함, 장면 다양성 등 **지각적 신호를 직접 최적화** 할 수 있는 **플러그 앤 플레이 보상 모델** 로 활용될 수 있습니다. 이는 AI가 인간의 시각적 선호도에 더 잘 부합하는 콘텐츠를 생성하는 데 기여하며, **MLLM의 행동 및 데이터셋 특성을 진단하는 도구** 로서도 유용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.