---
title: "[논문리뷰] SQ-format: A Unified Sparse-Quantized Hardware-friendly Data Format for LLMs"
excerpt: "Minghui Yu이 arXiv에 게시한 'SQ-format: A Unified Sparse-Quantized Hardware-friendly Data Format for LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Quantization
  - Sparsification
  - Hardware Acceleration
  - Mixed-Precision
  - Post-Training Quantization
  - Data Format
  - GPU Optimization
  - AI Accelerator

permalink: /ai/review/2025-12-08-SQ-format-A-Unified-Sparse-Quantized-Hardware-friendly-Data-Format-for-LLMs/

toc: true
toc_sticky: true

date: 2025-12-08 00:00:00+0900+0900
last_modified_at: 2025-12-08 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.05409)

**저자:** Ruixuan Huang, Hao Zeng, Hantao Huang, Jinyuan Shi, Minghui Yu, Ian En-Hsu Yen, Shuai Wang



## 핵심 연구 목표
대규모 언어 모델(LLMs)의 배포에 있어 **저비트 양자화(low-bit quantization)** 와 **희소화(sparsification)** 기술이 정확도와 효율성 사이에서 균형을 맞추기 어려운 문제를 해결하는 것이 목표입니다. 특히, 기존 **W4A8** 과 같은 혼합 정밀도 기법이 하드웨어 지원 부족으로 성능 이점을 상쇄하는 **하드웨어-알고리즘 간극** 을 메우고, **W4A4** 에 가까운 처리량을 유지하면서 **W4A8** 수준의 정확도를 달성하고자 합니다.

## 핵심 방법론
본 연구는 **Sparse-Quantized Format (SQ-format)** 을 제안하며, 이는 행렬 곱셈의 한 피연산자를 **고정된 뱅크 크기(b)** 와 **희소성(s)** 을 가지는 **고정밀(h_high)** 및 **저정밀(h_low)** 부분으로 분할합니다. 가중치(weights)의 경우 **GPTQ** 및 **SmoothQuant** 를 결합하여 중요도 점수에 기반해 고정밀 요소를 선택하며, 활성화(activations)의 경우 **채널별 평균 크기(A·W)** 를 고려한 **정적 마스크 생성 전략** 을 사용합니다. 하드웨어적으로는 **고정밀 및 저정밀 연산을 병렬 처리** 하는 전용 유닛을 설계하여 최적화합니다.

## 주요 결과
**Llama-3-70B** 모델에서 정적 활성화 전략을 적용한 **SQ-format** 은 **W4A8** 대비 **1.71배** 의 처리량 향상을 달성하며, 이는 **W4A4** 의 이론적 가속도 중 약 **89%** 에 해당합니다. **Qwen-3** 모델에서는 평균 정확도가 **3.87%** 향상되는 동시에 더 나은 perplexity를 보였습니다. 또한, 하드웨어 합성 결과 **SQ-format 유닛** 은 표준 **INT6 MAC 배열** 대비 전체 실리콘 면적을 **35.8%** 감소시키는 것으로 나타나 물리적 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**SQ-format** 은 LLM 배포를 위한 **하드웨어 친화적인 혼합 정밀도 데이터 형식** 으로, 현재 GPU 및 미래 AI 가속기에서 **정확도와 처리량 간의 파레토 개선** 을 가능하게 합니다. 특히, 기존 **W4A8** 이 하드웨어 제약으로 성능 이점을 상실하던 문제를 해결하여 **실질적인 성능 향상** 을 기대할 수 있습니다. **정적 활성화 양자화 전략** 은 GPU에서 동적 연산의 오버헤드 없이 고성능을 달성할 수 있는 실용적인 접근 방식을 제공하며, **최소 4배의 희소성** 과 적절한 **뱅크 크기 및 정밀도 조합** 선택이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.