---
title: "[논문리뷰] PairUni: Pairwise Training for Unified Multimodal Language Models"
excerpt: "이 [arXiv]에 게시한 'PairUni: Pairwise Training for Unified Multimodal Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Unified Vision-Language Models
  - Reinforcement Learning
  - Multimodal Alignment
  - Pairwise Training
  - Group Relative Policy Optimization
  - Data Augmentation
  - Text-to-Image Generation
  - Visual Reasoning

permalink: /ai/review/2025-10-30-PairUni_Pairwise_Training_for_Unified_Multimodal_Language_Models/

toc: true
toc_sticky: true

date: 2025-10-30 13:06:06+0900
last_modified_at: 2025-10-30 13:06:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25682)

**저자:** Jiani Zheng, Zhiyang Teng, Xiangtai Li, Anran Wang, Yu Tian, Kunpeng Qiu, Ye Tian, Haochen Wang, Zhuochen Wang



## 핵심 연구 목표
통합 멀티모달 언어 모델(UVLMs)에서 이해(understanding) 및 생성(generation) 태스크를 동시에 학습할 때 발생하는 **이질적인 데이터 및 감독(supervision)으로 인한 태스크 간 간섭 문제**를 해결하고자 합니다. 특히 강화 학습(RL) 과정에서 발생하는 불안정한 업데이트와 성능 불균형을 해소하고, 데이터 수준의 시맨틱 정렬(semantic alignment)과 이에 상응하는 최적화 규칙을 도입하여 모델의 균형 잡힌 발전을 목표로 합니다.

## 핵심 방법론
본 연구는 **PairUni**라는 통합 프레임워크를 제안하며, 이는 데이터 정렬과 최적화 수준에서 문제를 해결합니다. 데이터 측면에서는 **GPT-03**을 활용해 단일 태스크 데이터를 **이해-생성(UG) 쌍**으로 확장하고, 시각적 유사성을 기반으로 **정렬된 쌍(aligned pairs)** 및 **검색된 쌍(retrieved pairs)**을 구성하여 **PairUG 데이터셋(16K UG 쌍)**을 구축합니다. 최적화 측면에서는 **Pair-GPRO**라는 쌍 인지(pair-aware) **Group Relative Policy Optimization** 변형을 개발하여, 각 쌍에 **유사도 점수**를 할당하고 이를 이점(advantage) 변조에 사용하여 학습 강도를 조절합니다.

## 주요 결과
**PairUni**는 강력한 **Janus-Pro UVLMs**를 포함한 다양한 UVLMs에서 균형 잡힌 성능 향상을 달성했습니다. **MMMU 벤치마크 (7B 모델)**에서 **47.0**을 기록하며 기존 **Janus-Pro-7B(41.1)** 및 **ULM-R1(40.3)**을 능가했으며, **MMStar**와 **MME(P)**에서도 각각 **49.5**와 **1597.7**로 개선을 보였습니다. 텍스트-투-이미지 생성 벤치마크인 **WISE**에서는 **7B 모델 기준 0.45**를 달성하여 기존 모델들을 뛰어넘는 등, 이해와 생성 태스크 모두에서 우수한 성능을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 UVLMs의 강화 학습 과정에서 **데이터 정렬의 중요성**을 강조하며, **PairUni**와 **Pair-GPRO**와 같은 **쌍 기반 학습 프레임워크**가 태스크 간 간섭을 줄이고 학습 안정성을 높이는 효과적인 방법임을 보여줍니다. 특히, **PairUG**와 같은 **고품질의 정렬된 멀티모달 데이터셋** 구축은 모델의 이해 및 생성 능력을 동시에 향상시키는 데 핵심적인 역할을 할 수 있습니다. 이는 AI 엔지니어들이 멀티모달 모델을 개발하고 미세 조정할 때 데이터 준비 및 최적화 전략 수립에 실질적인 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.