---
title: "[논문리뷰] Towards Universal Video Retrieval: Generalizing Video Embedding via
  Synthesized Multimodal Pyramid Curriculum"
excerpt: "이 [arXiv]에 게시한 'Towards Universal Video Retrieval: Generalizing Video Embedding via
  Synthesized Multimodal Pyramid Curriculum' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Retrieval
  - Multimodal Embedding
  - Data Synthesis
  - Curriculum Learning
  - Zero-shot Generalization
  - Benchmark Design
  - MLLM
  - Video-Text Retrieval

permalink: /ai/review/2025-11-4-Towards-Universal-Video-Retrieval-Generalizing-Video-Embedding-via-Synthesized-Multimodal-Pyramid-Curriculum/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.27571)

**저자:** Zhuoning Guo, Mingxin Li, Yanzhao Zhang, Dingkun Long, Pengjun Xie, Xiaowen Chu



## 핵심 연구 목표
기존 비디오 리트리벌 패러다임이 좁은 벤치마크, 제한된 데이터, 단일 태스크 훈련으로 인해 일반화 능력이 저해되는 문제를 해결하는 것입니다. 이 연구는 **다차원 진단 평가**를 통해 **범용 비디오 임베딩**의 진정한 일반화 능력을 정의하고 달성하는 것을 목표로 합니다.

## 핵심 방법론
이 연구는 **평가, 데이터, 모델링의 공동 설계** 프레임워크를 제안합니다. 첫째, 16개 데이터셋으로 구성된 **Universal Video Retrieval Benchmark (UVRB)**를 구축하여 성능 측정과 역량 격차 진단을 수행합니다. 둘째, UVRB 진단에 따라 **V-SynFlow**라는 확장 가능한 합성 워크플로우를 통해 **1.55백만 개**의 고품질 **다중 모달 비디오 리트리벌 쌍**을 생성합니다. 셋째, 이 데이터를 활용하여 **Modality Pyramid**라는 맞춤형 커리큘럼으로 **General Video Embedder (GVE)**를 훈련하며, `GVE`는 **Qwen2.5-VL** 기반의 **MLLM 모델**입니다.

## 주요 결과
`GVE` 모델은 **UVRB**에서 **최첨단 제로샷 일반화 성능**을 달성했습니다. 특히, `GVE-7B`는 데이터셋 평균 **0.573** 및 능력 평균 **0.600**의 **R@1** 점수를 기록하며 기존 14개 SOTA 모델(예: Unite-7B)을 크게 능가했습니다. 분석 결과, 기존 인기 벤치마크는 일반 능력을 제대로 예측하지 못하며, **부분적으로 관련된 리트리벌**이 지배적이지만 간과되는 시나리오임이 밝혀졌습니다. 또한, `GVE-3B`가 `Unite-7B`보다 높은 성능을 보여 **모델 크기보다 데이터 합성 및 커리큘럼 설계**의 중요성을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **다양한 태스크와 도메인에 걸친 범용 비디오 리트리벌 시스템 개발**을 위한 실용적인 경로를 제공합니다. **MLLM 기반 `GVE` 모델**은 뛰어난 **제로샷 일반화 능력**을 보여주므로, 복잡한 실제 비디오 검색 및 추천 시스템에 효과적으로 적용될 수 있습니다. **정교한 데이터 합성**과 **계층적 커리큘럼 학습** 전략은 대규모 멀티모달 AI 모델의 훈련 효율성과 일반화 성능을 극대화하는 데 중요한 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.