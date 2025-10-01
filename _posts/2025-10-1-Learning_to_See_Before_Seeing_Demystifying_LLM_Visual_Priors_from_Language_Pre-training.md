---
title: "[논문리뷰] Learning to See Before Seeing: Demystifying LLM Visual Priors from
  Language Pre-training"
excerpt: "Koustuv Sinha이 [arXiv]에 게시한 'Learning to See Before Seeing: Demystifying LLM Visual Priors from
  Language Pre-training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Visual Priors
  - Language Pre-training
  - Multimodal LLM
  - Data Mixture Optimization
  - Reasoning Prior
  - Perception Prior
  - VQA
  - MLE-Bench

permalink: /ai/review/2025-10-1-Learning_to_See_Before_Seeing_Demystifying_LLM_Visual_Priors_from_Language_Pre-training/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.26625)

**저자:** Koustuv Sinha, Yufan Ren, David Fan, Shengbang Tong, Junlin Han



## 핵심 연구 목표
본 논문은 텍스트 전용 사전 훈련을 통해 대규모 언어 모델(LLM)이 시각적 세계에 대해 습득하는 **내재된 시각적 사전 지식(visual priors)의 구조와 기원**을 체계적으로 밝히는 것을 목표로 합니다. 이러한 시각적 사전 지식이 어떻게 구성되고, 어디에서 유래하며, 멀티모달 LLM(MLLM) 구축에 어떻게 활용될 수 있는지 규명하고자 합니다.

## 핵심 방법론
연구는 **340M부터 13B 파라미터**까지 다양한 크기의 **Llama-3 아키텍처** 기반 LLM을 **최대 1T 토큰**의 텍스트 데이터로 사전 훈련하며 진행되었습니다. 사전 훈련 데이터는 **추론 중심**(**코드, 수학, 학술**) 및 **시각적 세계 묘사**(**시각 개념, 속성, 관계**) 카테고리로 분류되었으며, 다양한 혼합 비율에 따른 MLLM 성능 변화를 분석했습니다. 멀티모달 능력 평가를 위해 **16개의 공개 VQA 벤치마크**와 **Multi-Level Existence Bench (MLE-Bench)**를 사용했습니다.

## 주요 결과
LLM의 시각적 추론 능력은 **추론 중심 데이터**의 비율 증가에 따라 **최대 75%**까지 점진적으로 향상되었으며, 이는 **모달리티 불가지론적(modality-agnostic)** 특성을 보였습니다. 반면, 지각 능력은 **광범위하고 다양한 데이터**에서 더 확산적으로 나타났습니다. **균형 잡힌 데이터 혼합(mix6)**을 사용하여 훈련된 **7B Balanced 모델**은 언어 숙련도 저하 없이 **평균 VQA 38.64%**로 Language-Favorable 모델(**37.32%**)을 능가했습니다. 또한, **코드 추론 데이터**를 0%에서 100%로 늘릴 경우 논리적 건전성은 **4.52%에서 9.52%**로, 추론 깊이는 **8.31에서 53.25**로 크게 증가했습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLM 개발을 위한 **데이터 중심 로드맵**을 제공하며, LLM 사전 훈련 시 **추론 중심 데이터**와 **시각적 세계 묘사 데이터**의 전략적 혼합이 강력한 시각적 사전 지식을 효과적으로 배양할 수 있음을 보여줍니다. 특히, 추론 능력은 언어 전이학습을 통해 시각적 문제 해결에 직접적으로 적용될 수 있어, **모달리티 간 일반화 가능한 추론 프레임워크** 구축에 기여합니다. 이는 MLLM의 효율적인 개발과 성능 향상에 중요한 실용적 지침이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.