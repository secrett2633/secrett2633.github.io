---
title: "[논문리뷰] InfiAlign: A Scalable and Sample-Efficient Framework for Aligning LLMs
  to Enhance Reasoning Capabilities"
excerpt: "Zhijie Sang이 [arXiv]에 게시한 'InfiAlign: A Scalable and Sample-Efficient Framework for Aligning LLMs
  to Enhance Reasoning Capabilities' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Alignment
  - Reasoning
  - Data Curation
  - Supervised Fine-tuning (SFT)
  - Direct Preference Optimization (DPO)
  - Sample Efficiency
  - Scalability
  - Multi-dimensional Filtering

permalink: /ai/review/2025-8-8-InfiAlign_A_Scalable_and_Sample-Efficient_Framework_for_Aligning_LLMs_to_Enhance_Reasoning_Capabilities/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.05496)

**저자:** Shuo Cai, Su Lu, Qi Zhou, Kejing Yang, Zhijie Sang, Congkai Xie, Hongxia Yang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 추론 능력을 향상시키기 위한 **확장 가능**하고 **샘플 효율적인** 후속 학습 프레임워크인 **InfiAlign**을 제안합니다. 특히, 데이터 및 계산 비용이 많이 드는 기존 방법론의 한계를 극복하고, 적은 양의 고품질 데이터로도 LLM 정렬을 효과적으로 수행하는 것을 목표로 합니다.

## 핵심 방법론
**InfiAlign**은 **감독 미세 조정(SFT)**과 **직접 선호도 최적화(DPO)**를 통합합니다. 핵심은 **다차원 품질 측정(다양성, 난이도, 품질)**을 사용하여 대규모 오픈 소스 추론 데이터셋에서 고품질 정렬 데이터를 자동으로 선별하는 **강력한 데이터 선택 파이프라인**입니다. 이 파이프라인은 **규칙 기반 필터링**, **CoT 증류**, **응답 길이 기반 난이도 샘플링**, **임베딩 및 도메인 기반 다양성 샘플링**, **LLM-as-judge 검증** 등을 포함합니다. 훈련은 **커리큘럼 기반 2단계 SFT** 후 **DPO**로 진행됩니다.

## 주요 결과
**Qwen2.5-Math-7B-Base** 모델에 적용했을 때, **InfiAlign-Qwen-7B-SFT-92K**는 **DeepSeek-R1-Distill-Qwen-7B**와 유사한 성능을 달성하면서도 훈련 데이터의 **약 12%만** 사용했습니다(92K vs 800K). **DPO**를 추가 적용한 **InfiAlign-Qwen-7B-DPO-10K**는 특히 수학 추론 태스크에서 주목할 만한 성능 향상을 보였으며, **AIME 24/25** 벤치마크에서 평균 **3.89%** 개선을 달성했습니다. 이 모델은 **AIME 2025**에서 **47.45%**, **MATH500**에서 **93.45%**의 성능을 기록했습니다.

## AI 실무자를 위한 시사점
**InfiAlign**은 **원칙적인 데이터 선택**과 **다단계 정렬**이 LLM의 추론 능력 향상에 매우 효과적임을 입증했습니다. 이는 제한된 데이터 및 컴퓨팅 자원으로도 고성능 추론 LLM을 개발할 수 있는 **실용적인 솔루션**을 제공합니다. 모듈형 설계 덕분에 새로운 데이터 소스와 태스크에 쉽게 적용할 수 있어 **확장성**과 지속적인 개선을 지원합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.