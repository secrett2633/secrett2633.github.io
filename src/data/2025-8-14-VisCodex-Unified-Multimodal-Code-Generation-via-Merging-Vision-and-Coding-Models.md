---
title: "[논문리뷰] VisCodex: Unified Multimodal Code Generation via Merging Vision and
  Coding Models"
excerpt: "Dongdong Zhang이 [arXiv]에 게시한 'VisCodex: Unified Multimodal Code Generation via Merging Vision and
  Coding Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLM
  - Code Generation
  - Model Merging
  - Task Vectors
  - Vision-Language Model
  - Coding LLM
  - Instruction Tuning
  - Benchmark

permalink: /ai/review/2025-8-14-VisCodex-Unified-Multimodal-Code-Generation-via-Merging-Vision-and-Coding-Models/

toc: true
toc_sticky: true

date: 2025-08-14 13:19:02+0900
last_modified_at: 2025-08-14 13:19:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.09945)

**저자:** Lingjie Jiang, Shaohan Huang, Xun Wu, Yixia Li, Dongdong Zhang, Furu Wei



## 핵심 연구 목표
논문은 멀티모달 대규모 언어 모델(MLLM)이 시각적 입력으로부터 기능적인 코드를 생성하는 데 있어 한계가 있음을 지적합니다. 이를 해결하기 위해 시각적 이해와 고급 코딩 능력을 통합하여 강력한 멀티모달 코드 생성 능력을 갖춘 모델을 효율적으로 구축하는 것을 목표로 합니다.

## 핵심 방법론
이 연구는 **VisCodex**라는 통합 프레임워크를 제안합니다. 이는 **태스크 벡터 기반 모델 합병 기법**을 활용하여 **최첨단 비전-언어 모델(Qwen2.5-VL)**과 **전용 코딩 LLM(OpenCodeReasoning-Nemotron-1.1)**의 파라미터를 산술적으로 결합합니다. 합병 과정은 언어 모델 백본에만 적용되며, 시각 인코더와 교차 모달리티 투영 모듈은 변경되지 않습니다. 추가로, 광범위한 멀티모달 코딩 태스크를 위한 **598k 샘플의 대규모 Multimodal Coding Dataset (MCD)**과 실제 프로그래밍 문제 평가를 위한 **InfiBench-V 벤치마크**를 새롭게 도입했습니다.

## 주요 결과
**VisCodex**는 모든 평가된 멀티모달 코딩 벤치마크에서 오픈소스 MLLM 중 **최고 성능**을 달성했습니다. 특히, **VisCodex-8B** 모델은 독점 모델인 **GPT-4o-mini**를 **68.8**의 평균 점수로 능가했으며, **VisCodex-33B**는 **72.3**점을 기록하며 **GPT-4o**의 성능에 근접했습니다. 모델 합병 전략은 **ChartMimic**의 **pass@1** 정확도를 **6.8%에서 11.0%로** 향상시키는 등 시각적 이해를 유지하면서 코드 생성 능력을 효과적으로 증강시켰음을 입증했습니다.

## AI 실무자를 위한 시사점
**VisCodex**는 대규모 재훈련 없이 기존 모델의 강점을 결합하여 **멀티모달 코드 생성 능력**을 효율적으로 향상시키는 실용적인 방법을 제시합니다. 새롭게 구축된 **MCD 데이터셋**은 UI-to-code, 차트-to-code 등 다양한 멀티모달 코딩 태스크를 위한 고품질 자원으로 활용될 수 있습니다. 또한, **InfiBench-V 벤치마크**는 실제 개발 시나리오와 유사한 복잡한 멀티모달 프로그래밍 문제를 평가하는 데 유용하여, AI 모델의 실제 적용 가능성을 검증하는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.