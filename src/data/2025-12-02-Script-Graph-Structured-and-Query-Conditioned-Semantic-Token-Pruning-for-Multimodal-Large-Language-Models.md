---
title: "[논문리뷰] Script: Graph-Structured and Query-Conditioned Semantic Token Pruning for Multimodal Large Language Models"
excerpt: "이 [arXiv]에 게시한 'Script: Graph-Structured and Query-Conditioned Semantic Token Pruning for Multimodal Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Token Pruning
  - Graph-Structured Pruning (GSP)
  - Query-Conditioned Semantic Pruning (QCSP)
  - Determinantal Point Processes (DPP)
  - Model Efficiency
  - Visual Redundancy

permalink: /ai/review/2025-12-02-Script-Graph-Structured-and-Query-Conditioned-Semantic-Token-Pruning-for-Multimodal-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01949)

**저자:** Zhongyu Yang*, Dannong Xu*, Wei Pang, Yingfang Yuant



## 핵심 연구 목표
본 논문은 멀티모달 대규모 언어 모델(MLLM)에서 고해상도 이미지 및 비디오 처리 시 발생하는 **과도한 메모리 소비** 및 **추론 지연 시간 문제** 를 해결하고자 합니다. 기존 토큰 가지치기(pruning) 방법들이 사용자 질의에 대한 관련성을 무시하거나 어텐션 메커니즘의 한계에 직면하는 문제를 극복하여, 질의에 조건화되고 시각적으로 불필요한 토큰을 효율적으로 제거하는 새로운 방법을 제안합니다.

## 핵심 방법론
본 논문은 재훈련 없이 다양한 MLLM에 적용 가능한 **Script** 라는 가지치기 방법을 제안합니다. **Script** 는 시각적 중복 토큰을 제거하는 **그래프 구조 가지치기(GSP)** 모듈과 질의 관련 시각 정보를 보존하는 **질의 조건화 의미론적 가지치기(QCSP)** 모듈로 구성됩니다. **GSP** 는 이분 그래프를 활용하여 시각적 중복성을 식별하고, **QCSP** 는 **결정적 점 과정(DPP)** 을 통해 질의 관련성과 토큰 다양성의 균형을 맞춰 토큰을 선택합니다. 최종적으로 **GSP와 QCSP의 교집합** 을 취하여 최적의 토큰 서브셋을 구성합니다.

## 주요 결과
**Script** 는 다양한 이미지 및 비디오 이해 벤치마크에서 기존 가지치기 방법들보다 우수한 성능을 일관되게 달성했습니다. 특히 **LLaVA-NeXT-7B** 모델에서는 **최대 6.8배의 prefill 속도 향상** 과 **10배의 FLOPs 감소** 를 달성하면서도, 원본 성능의 **96.88%** 를 유지했습니다. 또한, **LLaVA-1.5-7B** 에서 88.9%의 토큰을 제거했을 때 **96.86%** 의 정확도를 기록하며 기존 최신 기법들을 크게 상회했습니다.

## AI 실무자를 위한 시사점
**Script** 는 MLLM의 **메모리 효율성** 과 **추론 지연 시간** 을 크게 개선하여, 모바일 장치나 엣지 컴퓨팅 환경과 같이 자원 제약이 있는 플랫폼에서의 **MLLM 배포 가능성** 을 높입니다. 재훈련이 필요 없고 아키텍처에 구애받지 않는 **플러그 앤 플레이 방식** 이므로, 기존 MLLM 시스템에 쉽게 통합하여 활용할 수 있습니다. 이는 개발자들이 고해상도 입력 또는 비디오 처리 시 발생하는 연산 비용 문제를 효과적으로 완화하는 데 큰 도움이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.