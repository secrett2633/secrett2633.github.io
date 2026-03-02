---
title: "[논문리뷰] veScale-FSDP: Flexible and High-Performance FSDP at Scale"
excerpt: "Cong Xie이 arXiv에 게시한 'veScale-FSDP: Flexible and High-Performance FSDP at Scale' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - FSDP
  - Distributed Training
  - LLM
  - GPU Scaling
  - Memory Optimization
  - Performance Optimization
  - Structure-Aware Training
  - RaggedShard

permalink: /ai/review/2026-02-27-veScale-FSDP-Flexible-and-High-Performance-FSDP-at-Scale/

toc: true
toc_sticky: true

date: 2026-02-27 00:00:00+0900+0900
last_modified_at: 2026-02-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.22437)

**저자:** Zezhou Wang, Youjie Li, Zhiqi Lin, Jiacheng Yang, Cong Xie, et al.



## 핵심 연구 목표
본 논문은 기존 FSDP(Fully Sharded Data Parallel) 시스템이 **블록-wise 양자화 훈련** 이나 **Shampoo, Muon** 과 같은 **비-요소별(non-element-wise) 옵티마이저** 를 사용하는 **구조 인식 훈련(structure-aware training)** 에서 겪는 한계를 해결하고자 합니다. 특히, 기존 FSDP의 고정된 샤딩 형식으로 인해 발생하는 복잡성과 비효율적인 통신 및 메모리 관리를 극복하여 **대규모 GPU 환경** 에서 유연성과 고성능을 동시에 달성하는 것을 목표로 합니다.

## 핵심 방법론
veScale-FSDP는 유연성을 위해 사용자 정의 블록 크기를 지원하는 새로운 샤딩 형식인 **RaggedShard** 를 도입하며, 이는 기존 PyTorch DTensor 샤딩 형식과 매끄럽게 결합됩니다. 성능 최적화를 위해 **NP-hard 문제** 로 공식화된 **구조 인식 계획(structure-aware planning) 알고리즘** 을 개발하여 RaggedShard 텐서의 배치를 최적화하고, 이를 **Distributed Buffer (DBuffer)** 라는 고성능 기본 요소가 지원하여 제로-카피 접근과 메모리 조각화를 최소화합니다.

## 주요 결과
veScale-FSDP는 기존 FSDP 시스템 대비 **5~66% 더 높은 처리량** 과 **16~30% 더 낮은 메모리 사용량** 을 달성했습니다. 특히, 수만 개의 GPU (최대 **10K GPU** 및 **2.4T 매개변수 MoE 모델** )까지 효율적으로 확장되며, **8-bit Adam** 및 **Muon 옵티마이저** 를 기본적으로 지원합니다. 계획 알고리즘의 패딩 오버헤드는 대부분의 세분성에서 **3% 미만** 으로 유지되었고, **DBuffer** 와 **계획 알고리즘** 이 각각 **7.2%** 와 **34.6%** 의 처리량 향상에 기여했습니다.

## AI 실무자를 위한 시사점
veScale-FSDP는 **블록-wise 양자화** 나 **매트릭스 기반 옵티마이저** 등 최신 훈련 기법을 활용하여 **대규모 LLM** 을 훈련하는 AI/ML 엔지니어에게 중요한 도구입니다. **PyTorch-native API** 와의 호환성과 **플러그 앤 플레이 모듈** 로서의 특징은 기존 워크플로우에 쉽게 통합되어 개발 생산성을 높일 수 있음을 의미합니다. 또한, **수만 대의 GPU** 에 걸친 뛰어난 확장성과 **메모리 효율성** 은 더 크고 복잡한 모델을 더 경제적으로 훈련할 수 있는 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.