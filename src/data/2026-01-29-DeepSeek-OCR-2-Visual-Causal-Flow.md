---
title: "[논문리뷰] DeepSeek-OCR 2: Visual Causal Flow"
excerpt: "arXiv에 게시된 'DeepSeek-OCR 2: Visual Causal Flow' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - OCR
  - Vision-Language Model
  - Causal Reasoning
  - Transformer Architecture
  - Attention Mechanism
  - Document Understanding
  - DeepEncoder

permalink: /ai/review/2026-01-29-DeepSeek-OCR-2-Visual-Causal-Flow/

toc: true
toc_sticky: true

date: 2026-01-29 00:00:00+0900+0900
last_modified_at: 2026-01-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.20552)

**저자:** Haoran Wei, Yaofeng Sun, Yukun Li



## 핵심 연구 목표
본 논문은 기존 **Vision-Language Model (VLM)** 이 시각 토큰을 고정된 래스터 스캔 순서로 처리하여 인간의 유연한 시각 인지 방식과 상충하는 문제를 해결하고자 합니다. 특히 복잡한 문서 레이아웃에서 발생하는 **부적절한 유도 편향** 을 극복하고, 이미지 의미론에 기반하여 시각 토큰을 동적으로 재정렬하는 **DeepEncoder V2** 의 타당성을 입증하는 것을 목표로 합니다. 궁극적으로 **두 단계의 1D 인과 추론 구조** 를 통해 2D 이미지 이해를 효과적으로 달성할 수 있는지 탐구합니다.

## 핵심 방법론
**DeepSeek-OCR 2** 는 **DeepEncoder V2** 를 핵심으로 하며, 기존 **CLIP** 컴포넌트를 **Qwen2-0.5B** 기반의 **LLM-스타일 아키텍처** 로 대체합니다. 이 인코더는 시각 토큰에 **양방향 어텐션** 을, 새로 도입된 **학습 가능한 인과 흐름 쿼리** 에는 **인과 어텐션** 을 적용하는 **듀얼 스트림 어텐션 메커니즘** 을 사용합니다. **맞춤형 어텐션 마스크** 를 통해 시각 토큰은 전체 시야를 유지하고, 인과 흐름 쿼리는 시각 토큰 및 이전 쿼리에만 인과적으로 접근하여 시각 토큰의 재정렬 능력을 부여합니다. 최종적으로 인과 쿼리 출력만이 **DeepSeek-MoE Decoder** 에 입력됩니다.

## 주요 결과
**DeepSeek-OCR 2** 는 **OmniDocBench v1.5** 에서 **91.09%** 의 전반적인 성능을 달성하여 기존 DeepSeek-OCR baseline 대비 **3.73%** 향상되었습니다. 특히 **읽기 순서(R-order)의 Edit Distance (ED)** 가 **0.085에서 0.057로 크게 감소** 하여 시각적 읽기 논리의 개선을 입증했습니다. 또한, **1120개의 시각 토큰** 예산을 사용하여 **Gemini-3 Pro** 의 **0.115 ED** 보다 낮은 **0.100 ED** 로 문서 파싱 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 시각 토큰을 동적으로 재정렬하는 **LLM-스타일 인코더** 를 통해 **2D 이미지 이해** 를 위한 새로운 패러다임을 제시하며, 특히 복잡한 문서 레이아웃 분석에 유용합니다. **DeepEncoder V2** 는 다양한 모달리티를 처리할 수 있는 **통합된 옴니-모달 인코더** 로 발전할 잠재력을 보여주며, **MoE 아키텍처** 및 **효율적인 어텐션 메커니즘** 과 같은 LLM 커뮤니티의 최적화를 활용할 수 있습니다. 하지만 **대규모 데이터셋** 과 **충분히 긴 인과 흐름 토큰** 이 필요하며, 특정 데이터 (예: 신문)에서는 성능 개선의 여지가 있어 **데이터 특성을 고려한 모델 적용** 이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.