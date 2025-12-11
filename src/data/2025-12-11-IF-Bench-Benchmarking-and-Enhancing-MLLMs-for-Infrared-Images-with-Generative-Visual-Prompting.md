---
title: "[논문리뷰] IF-Bench: Benchmarking and Enhancing MLLMs for Infrared Images with Generative Visual Prompting"
excerpt: "이 [arXiv]에 게시한 'IF-Bench: Benchmarking and Enhancing MLLMs for Infrared Images with Generative Visual Prompting' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Infrared Image Understanding
  - Benchmark Dataset
  - Visual Question Answering (VQA)
  - Generative Visual Prompting (GenViP)
  - Domain Adaptation
  - Image-to-Image Translation

permalink: /ai/review/2025-12-11-IF-Bench-Benchmarking-and-Enhancing-MLLMs-for-Infrared-Images-with-Generative-Visual-Prompting/

toc: true
toc_sticky: true

date: 2025-12-11 00:00:00+0900+0900
last_modified_at: 2025-12-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.09663)

**저자:** Tao Zhang, Yuyang Hong, Yang Xia, Kun Ding, Zeyu Zhang, Ying Wang, Shiming Xiang, Chunhong Pan



## 핵심 연구 목표
본 연구는 주로 자연 이미지에 훈련된 **Multimodal Large Language Models (MLLMs)** 의 적외선 이미지 이해 능력이 미개척 상태임을 문제로 인식하고 있습니다. 이를 해결하기 위해 **MLLM** 의 적외선 이미지 이해 능력을 체계적으로 평가할 수 있는 벤치마크를 구축하고, 적외선-RGB 도메인 불일치를 완화하여 **MLLM** 의 성능을 향상시키는 훈련 없는 방법론을 제안하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 적외선 이미지 이해의 10가지 핵심 차원을 포괄하는 **499개 이미지와 680개 VQA 쌍** 으로 구성된 고품질 벤치마크 **IF-Bench** 를 구축했습니다. **40개 이상의 오픈소스 및 클로즈드소스 MLLM** 을 대상으로 **순환 평가, 이중 언어 평가, 하이브리드 정확도 판단** 등 엄격한 평가 전략을 적용했습니다. 또한, 이미지 편집 모델을 활용하여 적외선 이미지를 RGB 이미지로 변환하고, 원본 적외선 이미지와 변환된 RGB 이미지를 **MLLM** 에 함께 입력하는 훈련 없는 **Generative Visual Prompting (GenViP)** 방법을 제안했습니다.

## 주요 결과
**IF-Bench** 벤치마크 평가 결과, **MLLM** 의 모델 규모가 커질수록 적외선 이해 성능이 일관되게 향상되는 경향을 보였습니다. 제안된 **GenViP** 방법론은 다양한 모델에서 **최대 7%의 상대적 성능 향상** 을 달성했으며, **Qwen3-VL-235B-A22B-Instruct** 모델의 경우 **84.4점** 을 기록하여 Doubao-Seed-Vision-1.6-250815 및 Gemini-2.5-Pro와 같은 클로즈드소스 모델을 능가했습니다. 특히, **GenViP** 는 미세한 시각 정보가 중요한 객체 카운팅 및 열 특징 이해와 같은 과제에서 특히 효과적이었습니다.

## AI 실무자를 위한 시사점
**IF-Bench** 는 적외선 이미지 데이터를 다루는 **AI/ML 엔지니어** 와 **데이터 사이언티스트** 에게 **MLLM** 의 성능을 객관적으로 평가할 수 있는 표준화된 도구를 제공합니다. 훈련 없이 도메인 불일치를 완화하는 **GenViP** 와 같은 접근 방식은 **적외선-텍스트 데이터 부족** 및 **모델별 미세 조정의 복잡성** 문제를 해결하여, 적외선 센서 기반 **AI 시스템 개발** 의 문턱을 낮출 수 있습니다. 이는 감시, 자율주행, 산업 모니터링 등 적외선 이미지가 활용되는 다양한 분야에서 **MLLM** 의 실질적인 적용 가능성을 크게 확장시킬 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.