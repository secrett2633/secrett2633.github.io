---
title: "[논문리뷰] ARC-Encoder: learning compressed text representations for large language
  models"
excerpt: "이 [arXiv]에 게시한 'ARC-Encoder: learning compressed text representations for large language
  models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Context Compression
  - Large Language Models
  - Encoder-Decoder Architecture
  - Text Representation
  - In-Context Learning
  - Parameter Efficiency
  - Retrieval-Augmented Generation

permalink: /ai/review/2025-10-27-ARC-Encoder-learning-compressed-text-representations-for-large-language-models/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20535)

**저자:** Hippolyte Pilchen, Edouard Grave & Patrick Pérez



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 긴 컨텍스트 처리로 인한 추론 비용 증가와 컨텍스트 창 제한 문제를 해결하고자 합니다. 특히, 디코더 모델의 아키텍처를 수정하거나 파인튜닝하지 않고도 컨텍스트를 압축하여 LLM의 일반적인 능력을 유지하면서 효율성을 높이는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **ARC-Encoder** 는 LLM 트랜스포머 기반의 인코더와 MLP 프로젝터로 구성되며, **동결된(frozen) 타겟 디코더** 에 압축된 연속 표현을 입력합니다. 인코더의 마지막 self-attention 모듈에서 인접한 쿼리들을 평균화하여 시퀀스 길이를 **x배(예: 4배, 8배)로 줄이는 풀링 메커니즘** 을 사용합니다. 학습은 **재구성(reconstruction)** 과 **연속(continuation)** 이라는 두 가지 사전 학습 태스크를 번갈아 수행하며, **특별 학습 토큰(<Cont>, <Rec>)** 을 활용하여 다운스트림 성능을 최적화합니다. 또한, 여러 디코더에 공통 인코더를 공유하고 디코더별로 **1% 미만의 파라미터** 를 가진 MLP 프로젝터를 특화하는 **멀티 디코더 학습 전략** 을 적용합니다.

## 주요 결과
**ARC-Encoder** 는 디코더를 수정하지 않고도 다양한 벤치마크(질문 응답, 번역, 요약)에서 최첨단 성능을 달성했습니다. 특히 **Llama3.1 8B 디코더** 에서 **ARC4-Encoder** 는 NQ, TQA, HQA, SQUAD, FLORES, CNN 벤치마크에서 평균 **48.0** 점을 기록하며, 전체 텍스트를 사용하는 **open-book** 기준(47.4점)과 거의 동일한 성능을 보여주면서 **선행 처리 FLOPs를 약 1.8배** 향상시켰습니다. 단일 인코더로 여러 디코더(Llama, Mistral)를 지원하며, 새로운 디코더 **OLMo-7B** 에도 **15M 파라미터** 만으로 성공적으로 적응했습니다. 또한, **ARC8-Encoder + Llama2 Chat** 은 긴 컨텍스트 QA에서 NQA F1 점수를 **16.1에서 27.5** 로 향상시키며 모델의 원래 컨텍스트 창보다 **최대 8배** 더 많은 입력을 처리할 수 있음을 입증했습니다.

## AI 실무자를 위한 시사점
**ARC-Encoder** 는 기존 LLM 디코더를 **수정하지 않는 플러그 앤 플레이** 방식으로 컨텍스트 압축을 통해 추론 효율성을 크게 개선할 수 있는 실용적인 솔루션입니다. **단일 인코더로 여러 LLM 디코더에 적용 가능** 하며, 새로운 모델에 대한 **적응 비용이 매우 낮아(1% 미만 파라미터)** 범용성이 높습니다. 특히 RAG 시스템과 같이 긴 문서를 여러 번 재활용하는 시나리오에서 **사전 계산된 압축 표현을 저장** 하여 추가적인 속도 향상을 기대할 수 있으며, 이는 대규모 언어 모델의 활용 범위를 넓히는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.