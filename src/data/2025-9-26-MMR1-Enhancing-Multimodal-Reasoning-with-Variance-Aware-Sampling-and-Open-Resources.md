---
title: "[논문리뷰] MMR1: Enhancing Multimodal Reasoning with Variance-Aware Sampling and
  Open Resources"
excerpt: "Jing Wang이 [arXiv]에 게시한 'MMR1: Enhancing Multimodal Reasoning with Variance-Aware Sampling and
  Open Resources' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Reinforcement Learning
  - Variance-Aware Sampling
  - Gradient Vanishing
  - Data Curation
  - Chain-of-Thought
  - GRPO

permalink: /ai/review/2025-9-26-MMR1-Enhancing-Multimodal-Reasoning-with-Variance-Aware-Sampling-and-Open-Resources/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21268)

**저자:** Sicong Leng, Jing Wang, Jiaxi Li, Hao Zhang, Boqiang Zhang, Yuming Jiang, Hang Zhang, Xin Li, Zhiqiang Hu, Lidong Bing, Deli Zhao, Wei Lu, Yu Rong, Aixin Sun, Shijian Lu



## 핵심 연구 목표
본 논문은 대규모 multimodal 추론 모델의 발전을 저해하는 두 가지 주요 한계를 해결하고자 합니다. 첫째는 공개된 고품질의 긴 **Chain-of-Thought (CoT) 데이터**의 부족이며, 둘째는 강화 학습(RL) 알고리즘, 특히 **GRPO(Group Relative Policy Optimization)**에서 발생하는 불안정성, 즉 보상 분산이 낮을 때 발생하는 **gradient vanishing** 문제입니다.

## 핵심 방법론
저자들은 RL 훈련 중 **gradient vanishing**을 완화하기 위해 동적 데이터 샘플링 전략인 **Variance-Aware Sampling (VAS)**을 제안합니다. **VAS**는 **Outcome Variance Score (OVS)**와 **Trajectory Diversity Score (TDS)**를 결합한 **Variance Promotion Score (VPS)**에 따라 데이터 샘플을 선택하며, 이는 보상 분산을 촉진하여 최적화 신호를 강화합니다. 또한, 연구팀은 약 **1.6M**개의 긴 CoT **cold-start 데이터**와 약 **15k**개의 **RL QA 쌍**을 포함하는 대규모의 정성적으로 큐레이션된 리소스를 공개하여 모델 학습과 벤치마킹에 기여합니다.

## 주요 결과
**MMR1 7B 모델**은 **MathVerse (55.4%)**, **MathVision (31.8%)**, **LogicVista (48.9%)**, **ChartQA (83.7%)** 등 여러 벤치마크에서 평균 **58.4%**의 점수를 달성하며, 추론 지향 MLLM 중 **최고 성능**을 기록했습니다. **VAS** 적용 시 랜덤 셔플 방식 대비 높은 그라디언트 노름과 안정적인 정책 그라디언트 클립 비율을 보여, 수렴 속도와 최종 정확도에서 일관된 개선을 입증했습니다.

## AI 실무자를 위한 시사점
**Variance-Aware Sampling (VAS)**은 **GRPO**와 같은 강화 학습 모델의 훈련 안정성을 높여 **gradient vanishing** 문제를 효과적으로 해결할 수 있는 실용적인 데이터 샘플링 기법입니다. 논문에서 공개된 대규모의 고품질 **CoT 데이터**와 **RL QA 쌍**은 multimodal 추론 모델의 초기 학습(cold-start) 및 강화 학습 단계를 위한 귀중한 리소스로 활용될 수 있습니다. 이는 AI 엔지니어들이 더욱 강력하고 안정적인 multimodal 추론 모델을 개발하고 벤치마킹하는 데 중요한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.