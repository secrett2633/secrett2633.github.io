---
title: "[논문리뷰] CodeOCR: On the Effectiveness of Vision Language Models in Code Understanding"
excerpt: "arXiv에 게시된 'CodeOCR: On the Effectiveness of Vision Language Models in Code Understanding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision Language Models
  - Code Understanding
  - Visual Code Representation
  - Code Compression
  - Computational Efficiency
  - Multimodal LLMs
  - Software Engineering

permalink: /ai/review/2026-02-04-CodeOCR-On-the-Effectiveness-of-Vision-Language-Models-in-Code-Understanding/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.01785)

**저자:** Yuling Shi¹, Chaoxiang Xie², Zhensu Sun³, Yeheng Chen⁴, Chenxu Zhang⁵, Longfei Yun⁶, Chengcheng Wan⁷⁸, Hongyu Zhang⁹, David Lo³, Xiaodong Gu¹*



## 핵심 연구 목표
본 논문은 텍스트 기반 LLM의 선형적인 컨텍스트 길이 증가와 그에 따른 계산 비용 문제로 인한 코드 이해의 비효율성을 해결하고자 합니다. 특히, 멀티모달 LLM( **MLLM** )을 활용하여 소스 코드를 렌더링된 이미지로 표현함으로써 코드 이해의 효율성을 최적화할 수 있는 가능성을 탐구하고 그 효과를 체계적으로 평가하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **7가지 최신 MLLM** 을 대상으로 **코드 요약** , **코드 완성** , **코드 클론 탐지** , **코드 질의 응답** 의 **4가지 다운스트림 태스크** 에서 성능을 평가하는 체계적인 연구를 수행했습니다. **2240x2240 픽셀** 의 기본 해상도로 렌더링된 코드 이미지에 대해 **1배부터 8배까지 다양한 시각적 압축률** 을 적용하고, **구문 강조** 및 **굵은 글씨** 와 같은 시각적 향상 기법의 영향도 분석했습니다. 또한, **OCR 스타일 코드 재구성 실험** 을 통해 정보 손실 패턴을 심층 분석했습니다.

## 주요 결과
**MLLM** 은 상당한 토큰 절감과 함께 코드를 효과적으로 이해할 수 있음을 입증했으며, 일부 모델은 **8배 압축률** 에서도 텍스트 기반 기준선을 능가하는 성능을 보였습니다. 특히 **Gemini-3-Pro** 는 **8배 압축률** 에서 코드 질문 응답에서 **79.5% 정확도** 를 달성하여 텍스트 기준선( **74.8%** )을 뛰어넘었습니다. **4배 압축** 이하에서는 **구문 강조** 와 같은 시각적 단서가 코드 완성 성능을 향상시켰고, **코드 클론 탐지** 와 같은 태스크는 시각적 압축에 매우 강력한 탄력성을 보였습니다.

## AI 실무자를 위한 시사점
시각적 코드 표현은 소프트웨어 엔지니어링 분야에서 **MLLM** 의 **추론 효율성** 을 크게 향상시키고 **API 비용을 절감** 할 수 있는 유망한 경로를 제시합니다. **Gemini-3 계열 모델** 과 같은 최신 **MLLM** 은 높은 압축률에서도 이미지로부터 코드를 효과적으로 이해하는 강력한 능력을 보여주며, 이는 새로운 **코드-특화 멀티모달 모델** 개발의 필요성을 시사합니다. 또한, **구문 강조** 와 같은 시각적 개선이 성능 향상에 기여하므로 **태스크 적응형 렌더링 전략** 을 활용할 기회가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.