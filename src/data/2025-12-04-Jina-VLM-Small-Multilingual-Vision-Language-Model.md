---
title: "[논문리뷰] Jina-VLM: Small Multilingual Vision Language Model"
excerpt: "이 [arXiv]에 게시한 'Jina-VLM: Small Multilingual Vision Language Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Model
  - Multilingual VLM
  - Small VLM
  - Visual Question Answering
  - Attention Pooling
  - Image Tiling
  - SigLIP
  - Qwen

permalink: /ai/review/2025-12-04-Jina-VLM-Small-Multilingual-Vision-Language-Model/

toc: true
toc_sticky: true

date: 2025-12-04 00:00:00+0900+0900
last_modified_at: 2025-12-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04032)

**저자:** Andreas Koukounas, Georgios Mastrapas, Florian Hönicke, Sedigheh Eslami, Guillaume Roncari, Scott Martens, Han Xiao



## 핵심 연구 목표
본 연구는 VLM의 실용적 배포를 저해하는 두 가지 주요 과제를 해결하는 것을 목표로 합니다. 첫째, 비전 적응 과정에서 발생하는 다국어 성능 저하 문제를 극복하고, 둘째, 고품질 VLM 훈련 및 배포의 높은 계산 비용을 줄여 접근성을 높이는 것입니다. 궁극적으로 **2.4B 파라미터** 규모의 모델로 SOTA 다국어 VQA 성능을 달성하고자 합니다.

## 핵심 방법론
본 모델( **jina-vlm** )은 **SigLIP2-So400M/14-384** 비전 인코더와 **Qwen3-1.7B-Base** 언어 백본을 결합합니다. 임의 해상도 이미지 처리를 위해 **오버랩 타일링** 과 **어텐션 풀링 커넥터** 를 사용하며, 이는 비전 인코더의 중간 레이어 특징을 결합하고 **2x2 어텐션 풀링** 으로 시각 토큰 수를 **4배** 줄여 효율성을 높입니다. 훈련은 다국어 데이터와 텍스트 전용 데이터를 명시적으로 통합하는 **두 단계 파이프라인** 으로 진행되어 언어 이해 성능 저하를 방지합니다.

## 주요 결과
**jina-vlm** 은 8개의 VQA 벤치마크에서 평균 **72.3점** 을 달성하며 **오픈 2B 규모 VLM 중 SOTA** 성능을 기록했습니다. 특히 다국어 멀티모달 벤치마크인 **MMMB** 에서 평균 **78.8점** , **Multilingual MMBench** 에서 평균 **74.3점** 으로 가장 높은 점수를 달성했습니다. 또한 **POPE 벤치마크** 에서 **90.3점** 을 기록하며 낮은 환각률을 보였고, 멀티모달 훈련에도 불구하고 경쟁력 있는 텍스트 전용 성능을 유지했습니다.

## AI 실무자를 위한 시사점
**2.4B 파라미터** 의 소규모 VLM이 효율적인 아키텍처와 훈련 전략을 통해 다국어 시각적 이해에서 SOTA 성능을 달성할 수 있음을 보여주었습니다. **어텐션 기반 토큰 풀링** 과 **오버랩 타일링** 은 리소스 제약이 있는 환경에서 고해상도 이미지 처리 및 다국어 지원 VLM을 구축하는 데 실용적인 방안을 제시합니다. 다국어 및 텍스트 전용 데이터를 혼합한 훈련 접근 방식은 모델의 일반적인 언어 이해 능력을 보존하는 데 핵심적이며, 실제 VLM 개발에 있어 중요한 고려 사항입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.