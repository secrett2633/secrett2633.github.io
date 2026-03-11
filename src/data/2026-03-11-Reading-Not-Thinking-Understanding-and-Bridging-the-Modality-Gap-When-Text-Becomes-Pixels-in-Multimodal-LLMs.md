---
title: "[논문리뷰] Reading, Not Thinking: Understanding and Bridging the Modality Gap When Text Becomes Pixels in Multimodal LLMs"
excerpt: "arXiv에 게시된 'Reading, Not Thinking: Understanding and Bridging the Modality Gap When Text Becomes Pixels in Multimodal LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Modality Gap
  - Visual Text Understanding
  - Error Analysis
  - Self-Distillation
  - Text-to-Image Conversion
  - Reasoning Collapse

permalink: /ai/review/2026-03-11-Reading-Not-Thinking-Understanding-and-Bridging-the-Modality-Gap-When-Text-Becomes-Pixels-in-Multimodal-LLMs/

toc: true
toc_sticky: true

date: 2026-03-11 00:00:00+0900+0900
last_modified_at: 2026-03-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.09095)

**저자:** Kaiser Sun, Xiaochuang Yuan, Hongjun Liu, Chen Zhao, Cheng Zhang, Mark Dredze, and Fan Bai



## 핵심 연구 목표
본 논문은 **Multimodal Large Language Models (MLLMs)** 가 텍스트를 이미지 형태로 처리할 때 발생하는 "모달리티 갭(modality gap)"을 체계적으로 진단하고 해결하는 것을 목표로 합니다. 동일한 텍스트 콘텐츠가 이미지로 제시될 때 성능이 저하되는 현상의 근본 원인을 이해하고, 이를 최소한의 개입으로 해소할 수 있는 실용적인 방법을 제시하고자 합니다.

## 핵심 방법론
연구팀은 7가지 MLLM을 7가지 벤치마크와 5가지 입력 모드(순수 텍스트, 렌더링된 이미지, 실제 문서 이미지, **OCR-1P** , **OCR-2P** )에서 평가하여 모달리티 갭을 진단했습니다. **4,000개 이상의 오류** 에 대한 **Grounded Theory 기반의 오류 분석** 을 수행하여 오류 유형을 분류했으며, 이를 바탕으로 **자기 증류 (self-distillation)** 방식을 제안했습니다. 이 방식은 모델의 **텍스트 모드 추론 경로(reasoning traces)** 를 이미지 입력과 쌍을 이루어 모델의 시각적 경로를 훈련하는 것입니다.

## 주요 결과
모달리티 갭은 작업 및 데이터 의존적이며, 특히 합성 렌더링된 이미지에서 수학 작업의 경우 **60점 이상 성능 저하** 가 발생했습니다. 반면, 실제 문서 이미지에서는 텍스트 모드 성능과 유사하거나 능가하기도 했습니다. 오류 분석 결과, 이미지 모드는 **계산 및 형식 오류(reading errors)** 를 **1.5배 증가** 시켰지만, 지식 및 추론 오류에는 큰 영향을 미치지 않았으며, 일부 모델에서 시각 입력 시 **Chain-of-Thought (CoT) 추론 붕괴** 현상이 관찰되었습니다. 제안된 **자기 증류** 방법은 **GSM8K 벤치마크** 에서 이미지 모드 정확도를 **30.71%에서 92.72%로 향상** 시켰으며, 다른 벤치마크에서도 **성능 저하 없이 전이(transfer)** 되는 것을 확인했습니다.

## AI 실무자를 위한 시사점
MLLMs가 시각적 텍스트를 처리할 때 겪는 성능 저하가 주로 **렌더링 아티팩트(rendering artifacts)** 와 **추론 능력과의 불일치** 에서 비롯됨을 보여줍니다. 실제 문서 이미지에서의 우수한 성능은 **도메인 특화 데이터** 의 중요성을 시사합니다. **자기 증류 기법** 은 기존 MLLMs의 아키텍처 변경 없이도 **시각적 텍스트 이해 능력** 을 크게 향상시킬 수 있는 실용적인 방법론을 제공하며, 특히 **언어 모델(LM) 적응** 이 시각 인코더 적응보다 더 큰 기여를 한다는 점은 중요한 설계 고려사항입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.