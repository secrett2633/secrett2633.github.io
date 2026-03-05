---
title: "[논문리뷰] RIVER: A Real-Time Interaction Benchmark for Video LLMs"
excerpt: "arXiv에 게시된 'RIVER: A Real-Time Interaction Benchmark for Video LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Real-time Interaction
  - Video Understanding
  - Benchmark
  - Temporal Reasoning
  - Long-term Memory
  - Proactive Response

permalink: /ai/review/2026-03-05-RIVER-A-Real-Time-Interaction-Benchmark-for-Video-LLMs/

toc: true
toc_sticky: true

date: 2026-03-05 00:00:00+0900+0900
last_modified_at: 2026-03-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.03985)

**저자:** Yansong Shi, Qingsong Zhao, Tianxiang Jiang, Xiangyu Zeng, Yi Wang, Limin Wang



## 핵심 연구 목표
대부분의 Multimodal Large Language Models (MLLMs)이 오프라인 패러다임으로 작동하여 실시간 상호작용 능력이 부족하다는 문제를 해결하고자 합니다. 스트리밍 비디오를 인식하여 인간과의 실시간 상호작용 능력을 평가하기 위한 벤치마크, **RIVER Bench** 를 제시하고, 모델의 회고적(retrospective) 및 예측적(anticipatory) 역량을 정량화하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **Retrospective Memory** , **Live-Perception** , **Proactive Response** 세 가지 유형의 실시간 상호작용 작업을 포함하는 **RIVER Bench** 를 제안합니다. 기존의 다양한 비디오 데이터셋을 재구성하고 정밀한 시간 주석을 추가하여 데이터셋을 구축했으며, **Long-Short Term Memory module** 과 **sliding window sampling strategy** 를 통합하는 일반 개선 방법을 통해 모델의 온라인 추론 능력을 강화합니다. 평가 지표로는 **Response Accuracy Metric** 을 도입하여 응답의 정확성과 적시성을 측정합니다.

## 주요 결과
기존 오프라인 모델들은 단일 질의응답 태스크에서는 우수하지만, 실시간 처리에서는 취약함을 보여주었습니다. 제안된 프레임워크와 **fine-tuning** 을 통해 **VideoLLM-Online** 은 **pro-response 태스크에서 기준선 대비 11.28%의 정확도 향상** 을 달성했습니다. 또한, 메모리 모듈을 추가하면 회고적 질의응답에서 성능 저하를 **12%** 감소시키며, **GPT-4o** 가 전반적으로 가장 우수한 성능을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 실시간 대화형 비디오 이해 모델 개발의 중요성을 강조하고, **RIVER Bench** 를 통해 관련 연구의 표준 평가 기준을 제공합니다. 제안된 메모리 메커니즘과 **fine-tuning** 방법론은 AI/ML 엔지니어들이 온라인 환경에서 MLLMs의 **장기 기억** 및 **미래 예측** 능력을 향상시키는 데 실질적인 가이드라인을 제시합니다. 다만, 현재 데이터셋에는 오디오 데이터가 포함되지 않아 향후 멀티모달 상호작용의 포괄적인 평가를 위한 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.