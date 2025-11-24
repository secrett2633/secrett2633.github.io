---
title: "[논문리뷰] Can Visual Input Be Compressed? A Visual Token Compression Benchmark for
  Large Multimodal Models"
excerpt: "Shijie Dong이 [arXiv]에 게시한 'Can Visual Input Be Compressed? A Visual Token Compression Benchmark for
  Large Multimodal Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Multimodal Models
  - Visual Token Compression
  - Token Pruning
  - Benchmark
  - Efficiency
  - Inference Latency
  - Multimodal LLMs

permalink: /ai/review/2025-11-5-Can-Visual-Input-Be-Compressed-A-Visual-Token-Compression-Benchmark-for-Large-Multimodal-Models/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02650)

**저자:** Tianfan Peng, Yuntao Du, Pengzhou Ji, Shijie Dong, Kailin Jiang



## 핵심 연구 목표
대규모 멀티모달 모델(LMM)이 이미지 인코더에서 생성되는 막대한 수의 시각 토큰으로 인해 겪는 **심각한 추론 비효율성** 문제를 해결하는 것이 주된 목표입니다. 기존의 토큰 압축 방법론 평가가 파편화되어 있고 일관성이 부족하다는 한계를 극복하기 위해, 시각 토큰 가지치기(pruning) 방법들을 **표준화된 벤치마크**를 통해 체계적으로 평가하고자 합니다.

## 핵심 방법론
본 연구는 LMM에서 시각 토큰 가지치기를 위한 **UniPruneBench**라는 **통합적이고 확장 가능한 벤치마크**를 제시합니다. 이는 **여섯 가지 능력 차원**과 **열 개 데이터셋**을 포괄하며, **LLaVA-v1.5, Intern-VL3, Qwen2.5-VL** 세 가지 LMM 계열과 **열 가지 대표적인 압축 알고리즘(예: DivPrune, FastV, GPrune, Random pruning 등)**을 평가합니다. 특히, **작업 정확도** 외에 **런타임 및 프리필링 지연 시간**과 같은 **시스템 레벨 메트릭**을 통합하여 총체적인 평가를 제공합니다.

## 주요 결과
실험 결과, **랜덤 가지치기가 예상외로 강력한 기준선**임을 밝혀냈습니다. 또한, **어떤 단일 압축 방법도 모든 시나리오에서 일관되게 우수하지 않음**을 확인했으며, 특히 **OCR 태스크는 가지치기에 가장 취약하여 성능 저하가 심각**했습니다. 가지치기 비율이 성능 저하를 결정하는 **가장 지배적인 요인**으로 나타났으며, 가지치기 강도가 높아질수록 성능 하락이 더욱 두드러졌습니다.

## AI 실무자를 위한 시사점
LMM의 효율성을 높이고자 하는 AI 실무자들은 **랜덤 가지치기의 예상치 못한 경쟁력**을 인지하고, 이를 능가하는 **더욱 강력한 가지치기 전략 개발**에 집중해야 합니다. 실제 적용 시에는 **모델 아키텍처, 가지치기 비율, 특정 태스크의 민감도(특히 OCR 같은 경우)**를 종합적으로 고려하여 최적의 압축 방법을 선택하는 것이 중요합니다. **UniPruneBench**는 효율적인 멀티모달 모델링 연구와 개발을 위한 **신뢰할 수 있는 평가 기반**을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.