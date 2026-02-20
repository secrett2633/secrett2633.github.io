---
title: "[논문리뷰] Rethinking Composed Image Retrieval Evaluation: A Fine-Grained Benchmark from Image Editing"
excerpt: "Dingkun Long이 arXiv에 게시한 'Rethinking Composed Image Retrieval Evaluation: A Fine-Grained Benchmark from Image Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Composed Image Retrieval
  - Fine-Grained Evaluation
  - Image Editing
  - Benchmark
  - Multimodal LLM
  - Synthetic Data
  - Compositional Reasoning

permalink: /ai/review/2026-01-23-Rethinking-Composed-Image-Retrieval-Evaluation-A-Fine-Grained-Benchmark-from-Image-Editing/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.16125)

**저자:** Dingkun Long, Zhuoning Guo, Mingxin Li, Yanzhao Zhang, Tingyu Song



## 핵심 연구 목표
기존 **Composed Image Retrieval (CIR)** 벤치마크의 한계, 즉 제한된 쿼리 범주, 실제 시나리오의 다양성 부족, 모호한 범주 정의, 모달리티 편향 등을 극복하는 것을 목표로 합니다. 이를 위해, 이미지 편집을 활용하여 다양한 수정 유형과 내용에 대한 정밀한 제어가 가능한 **세분화된(fine-grained) CIR 벤치마크** 를 구축하고, 이를 통해 모델의 진정한 구성적 추론 능력을 평가하고자 합니다.

## 핵심 방법론
먼저 현실 세계의 요구사항을 반영한 5개 주요 범주와 15개 하위 범주로 구성된 **포괄적인 분류 체계** 를 제안합니다. 이 분류 체계를 기반으로 **이미지 편집(image editing)** 기술을 활용한 새로운 데이터 합성 파이프라인을 구축하여 쿼리를 생성합니다. 특히 **Qwen2.5-VL-32B** 와 **Qwen-Image-Edit** 모델을 사용하여 참조 이미지로부터 수정 설명을 통해 타겟 이미지를 합성하고, **Qwen3-32B** 로 자연어 CIR 쿼리를 생성하여 **EDIR** 벤치마크를 구축합니다.

## 주요 결과
**EDIR** 벤치마크에 대한 13개 멀티모달 임베딩 모델 평가 결과, 현재 **MLLM 기반 모델** 들의 평균 **Recall@1은 36.9%** 로, **Non-MLLM 기반 모델** 의 평균 **18.4%** 보다 높지만 여전히 상당한 성능 격차가 존재합니다. 특히 **'texture', 'remove', 'shape'** 등 세분화된 범주에서 모델들이 일관되게 어려움을 겪는 것이 확인되었습니다. 인-도메인 학습을 통해 **EDIR-MLLM** 은 **59.9% Recall@1** 을 달성하며 상당한 개선을 보였으나, **'count', 'spatial', 'viewpoint'** 와 같은 범주에서는 여전히 낮은 성능을 보여 **내재적 모델 한계** 를 드러냈습니다.

## AI 실무자를 위한 시사점
이 연구는 **CIR 모델 평가** 를 위한 **세분화된(fine-grained) 벤치마크의 중요성** 을 강조하며, 이미지 편집을 활용한 **합성 데이터 생성 파이프라인** 이 새로운 데이터셋 구축에 효과적임을 보여줍니다. AI/ML 엔지니어는 **EDIR 벤치마크** 를 통해 현재 모델들의 **구성적 추론 능력, 다중 제약 조건 처리, 세밀한 시각적 특징 포착, 부정 쿼리 처리** 등 핵심적인 약점을 진단하고, 이를 개선하기 위한 새로운 모델 아키텍처 및 훈련 방법론 개발에 집중할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.