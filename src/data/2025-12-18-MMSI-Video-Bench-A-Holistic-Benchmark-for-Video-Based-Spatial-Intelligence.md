---
title: "[논문리뷰] MMSI-Video-Bench: A Holistic Benchmark for Video-Based Spatial Intelligence"
excerpt: "Peizhou Cao이 [arXiv]에 게시한 'MMSI-Video-Bench: A Holistic Benchmark for Video-Based Spatial Intelligence' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video-Based Spatial Intelligence
  - MLLM Benchmark
  - Spatial Reasoning
  - Multi-Modal Learning
  - Perception
  - Planning
  - Prediction
  - Cross-Video Reasoning
  - Human-AI Gap

permalink: /ai/review/2025-12-18-MMSI-Video-Bench-A-Holistic-Benchmark-for-Video-Based-Spatial-Intelligence/

toc: true
toc_sticky: true

date: 2025-12-18 00:00:00+0900+0900
last_modified_at: 2025-12-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.10863)

**저자:** Jingli Lin, Runsen Xu, Shaohao Zhu, Sihan Yang, Peizhou Cao, Yunlong Ran, Miao Hu, Chenming Zhu, Yiman Xie, Yilin Long, Wenbo Hu, Dahua Lin, Tai Wang, Jiangmiao Pang



## 핵심 연구 목표
본 논문은 MLLM(Multi-modal Large Language Models)이 물리적 환경에서 일반적인 비서 역할을 수행하기 위해 필수적인 **비디오 기반 공간 지능** 을 평가할 수 있는 포괄적인 벤치마크의 부재를 해결하고자 합니다. 기존 벤치마크의 한계인 비디오 입력 부족, 질문 유형의 비포괄성, 자동화된 질문 생성의 편향성, 그리고 데이터 소스의 불충분함을 극복하여 모델의 공간 추론 능력을 종합적으로 측정하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **MMSI-Video-Bench** 를 제안하며, **Perception, Planning, Prediction, Cross-Video Reasoning** 의 네 가지 수준으로 구성된 다단계 프레임워크를 기반으로 합니다. 이 벤치마크는 **25개 공개 데이터셋** 과 자체 촬영 비디오를 포함한 **1,278개 비디오 클립** 에서 파생된 **1,106개의 질문** 으로 구성되며, **11명의 3DV 전문가** 가 수작업으로 질문, 정답, 오답, 상세 근거를 주석했습니다. 또한 **Uniform-50** 및 **Sufficient-Coverage** 두 가지 샘플링 전략을 사용하여 모델을 평가했습니다.

## 주요 결과
**Gemini 3 Pro** 를 포함한 최첨단 MLLM들은 인간 성능(96.4%)에 비해 **최대 약 60%에 가까운 현저한 성능 격차(38.0%)** 를 보였습니다. 특히 **Prediction** 카테고리와 **Camera-Instance Spatial Relation** 서브타입이 가장 도전적인 것으로 나타났으며, 공간적으로 미세 조정된 모델조차 벤치마크에 효과적으로 일반화되지 못했습니다. 일반적인 프레임 샘플링 전략인 **AKS (Adaptive Keyframe Sampling)** 나 **3D 공간 단서** 및 **Chain-of-Thought 프롬프트** 는 유의미한 성능 향상을 가져오지 못했습니다.

## AI 실무자를 위한 시사점
**MMSI-Video-Bench** 는 MLLM의 비디오 기반 공간 지능 개발에 있어 상당한 개선이 필요함을 명확히 보여줍니다. AI 실무자들은 현재 모델들이 **기하학적 추론, 미세한 동작 이해, 장기적 예측, 비디오 간 대응 관계** 등에서 체계적인 실패를 겪고 있음을 인지하고, 이를 해결하기 위한 보다 **강력한 공간 추론 아키텍처, 효율적인 키프레임 샘플링 전략, 그리고 공간 단서의 효과적인 통합** 에 집중해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.