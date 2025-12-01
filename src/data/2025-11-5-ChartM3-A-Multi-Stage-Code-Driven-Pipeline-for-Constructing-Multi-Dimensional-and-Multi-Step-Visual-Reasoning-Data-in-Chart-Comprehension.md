---
title: "[논문리뷰] ChartM^3: A Multi-Stage Code-Driven Pipeline for Constructing
  Multi-Dimensional and Multi-Step Visual Reasoning Data in Chart Comprehension"
excerpt: "Hao Wang이 [arXiv]에 게시한 'ChartM^3: A Multi-Stage Code-Driven Pipeline for Constructing
  Multi-Dimensional and Multi-Step Visual Reasoning Data in Chart Comprehension' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Chart Comprehension
  - Visual Reasoning
  - Data Generation
  - Code-Driven Pipeline
  - Multimodal LLMs
  - Retrieval-Augmented Generation
  - Reinforcement Learning
  - Synthetic Data

permalink: /ai/review/2025-11-5-ChartM3-A-Multi-Stage-Code-Driven-Pipeline-for-Constructing-Multi-Dimensional-and-Multi-Step-Visual-Reasoning-Data-in-Chart-Comprehension/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02415)

**저자:** Duo Xu, Hao Cheng, Xin Lin, Zhen Xie, Hao Wang



## 핵심 연구 목표
본 연구는 기존 멀티모달 대규모 언어 모델(MLLM)이 실제 복잡한 차트 이해 작업에서 겪는 한계(제한된 차트 유형 및 복잡성, 낮은 질문 복잡성, 해석력 부족 등)를 해결하고자 합니다. 이를 위해 차트 다양성과 작업 복잡성을 확장하고 실제 분석 시나리오를 반영하는 **ChartM³** 데이터셋을 구축하며, 시각적 추론 데이터를 체계적으로 생성하기 위한 자동화된 다단계 코드 기반 파이프라인을 제안합니다.

## 핵심 방법론
논문은 **다단계 코드 기반 파이프라인** 을 통해 데이터를 생성합니다. 이 파이프라인은 데이터베이스 구축, 데이터 코드 생성, 시각화 코드 생성, 그리고 추론 코드를 포함한 Q&A 쌍 합성의 4단계로 구성됩니다. 주요 기술로는 전문적인 차트 템플릿 선택을 위한 **Retrieval-Augmented Generation (RAG)** , 실제 데이터 분포를 시뮬레이션하고 시각화 코드를 생성하는 **Long Chain-of-Thought (CoT) 추론** 이 활용됩니다. 또한, **코드 실행 및 출력 검증** 을 통해 데이터 품질을 보장하며, **모델 기반 품질 제어** 와 **검증 가능한 보상(RLVR)을 활용한 강화 학습** 으로 모델의 추론 능력을 향상시킵니다.

## 주요 결과
연구 결과, **ChartM³** 데이터셋은 훈련을 위한 **38.4K개의 다양한 차트** 와 **142K개의 고품질 Q&A 쌍** , 그리고 평가를 위한 **2,871개의 검증된 샘플** 을 포함합니다. **감독 미세 조정(SFT)** 및 **강화 학습(RL)** 실험을 통해 시각적 인식 및 추론 능력에서 **상당한 개선** 을 시연했습니다. 특히, **RL** 은 ChartM³ 및 ChartM³-Multi 벤치마크에서 기준 모델 대비 각각 **7.4% 및 5.5%** 의 절대적인 성능 향상을 달성했으며, **CoT 데이터** 는 계산 및 통계 관련 작업에서 기존 모델보다 **8%** 뛰어난 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡한 차트 이해 능력을 갖춘 추론형 MLLM 개발을 위한 **실용적인 방법론** 을 제시합니다. **코드 기반 파이프라인** 과 **CoT 기반 추론** 은 다양하고 고품질의 합성 데이터를 체계적으로 생성할 수 있어, 고급 시각적 추론을 위한 적합한 데이터셋 부족 문제를 해결합니다. 이는 **SFT가 인식 중심 작업** 에, **RL이 추론 집약적 작업** 에 강점을 보인다는 점을 시사하며, MLLM의 효과적인 훈련 전략 설계에 중요한 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.