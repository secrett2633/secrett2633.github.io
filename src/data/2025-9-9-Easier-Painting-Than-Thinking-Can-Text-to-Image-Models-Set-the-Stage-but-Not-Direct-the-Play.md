---
title: "[논문리뷰] Easier Painting Than Thinking: Can Text-to-Image Models Set the Stage,
  but Not Direct the Play?"
excerpt: "Rui Chen이 [arXiv]에 게시한 'Easier Painting Than Thinking: Can Text-to-Image Models Set the Stage,
  but Not Direct the Play?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Image Generation
  - T2I Benchmarking
  - Compositional Reasoning
  - Deductive Inference
  - Inductive Inference
  - Abductive Inference
  - MLLM Evaluation

permalink: /ai/review/2025-9-9-Easier-Painting-Than-Thinking-Can-Text-to-Image-Models-Set-the-Stage-but-Not-Direct-the-Play/

toc: true
toc_sticky: true

date: 2025-09-09 13:19:09+0900
last_modified_at: 2025-09-09 13:19:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.03516)

**저자:** Ouxiang Li, Yuan Wang, Xinting Hu, Huijuan Huang, Rui Chen, Jiarong Ou, Xin Tao, Pengfei Wan, Fuli Feng



## 핵심 연구 목표
본 논문은 기존 텍스트-투-이미지(T2I) 벤치마크의 한계를 해결하고, T2I 모델의 **구성(composition)** 및 **추론(reasoning)** 능력을 포괄적이고 복합적인 실제 시나리오에서 평가하기 위한 새로운 벤치마크를 제시합니다. 특히, 낮은 장면 밀도와 단순한 일대일 추론에 머무는 기존 벤치마크의 한계를 넘어, 고밀도 구성 및 다단계 추론 상황에서의 모델 성능을 정확히 측정하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **T2I-COREBENCH** 를 제안하며, 장면 그래프 요소(인스턴스, 속성, 관계, 텍스트 렌더링)와 추론의 철학적 프레임워크(연역적, 귀납적, 가추적)를 결합한 **12차원 평가 분류 체계** 를 구축했습니다. 각 프롬프트는 높은 구성 밀도(약 20개 시각 요소)와 다단계 추론(일대다 또는 다대일 인과 관계)을 포함하여 복잡성을 높였고, **MLLM 기반 평가자(Gemini 2.5 Flash)** 가 독립적인 예/아니오 질문으로 구성된 체크리스트를 통해 생성 이미지를 평가하도록 설계되었습니다.

## 주요 결과
**27개 T2I 모델** 에 대한 실험 결과, **구성 능력** 은 꾸준히 발전하여 **Imagen 4 Ultra가 82.4%** , 오픈소스 모델 중 **Qwen-Image가 78.0%** 의 높은 점수를 기록했습니다. 그러나 **복잡한 고밀도 시나리오** 에서는 여전히 한계가 드러났습니다. 특히 **추론 능력** 은 모든 모델에서 현저히 뒤처져 **Imagen 4 Ultra는 72.9%** , **Qwen-Image는 49.3%** 에 그쳤으며, 이는 명시되지 않은 요소를 추론하는 것이 T2I 모델의 주요 병목 현상임을 시사합니다.

## AI 실무자를 위한 시사점
T2I 모델이 기본적인 이미지 구성에서는 진전을 보였지만, **고밀도 장면 구성** 및 **암묵적 추론 능력** 에서는 여전히 개선이 필요하다는 점을 인지해야 합니다. AI/ML 엔지니어들은 향후 T2I 모델 개발 시 **LLM 및 MLLM과의 통합** 을 통해 언어 모델링 및 교차 모달 추론 능력을 강화하고, **Chain-of-Thought(CoT) 추론** 과 같은 기술을 활용하여 이미지 생성 전 중간 추론 과정을 개선하는 데 집중해야 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.