---
title: "[논문리뷰] Self-Improvement in Multimodal Large Language Models: A Survey"
excerpt: "Yapeng Tian이 [arXiv]에 게시한 'Self-Improvement in Multimodal Large Language Models: A Survey' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Self-Improvement
  - Data Collection
  - Data Organization
  - Model Optimization
  - Survey
  - Reinforcement Learning
  - Direct Preference Optimization

permalink: /ai/review/2025-10-6-Self-Improvement-in-Multimodal-Large-Language-Models-A-Survey/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.02665)

**저자:** Shijian Deng, Kai Wang, Tianyu Yang, Harsh Singh, Yapeng Tian



## 핵심 연구 목표
이 논문은 Multimodal Large Language Models (MLLMs)의 **자기 개선(self-improvement)** 분야에 대한 최초의 포괄적인 개요를 제공하는 것을 목표로 합니다. 기존 문헌을 **데이터 수집, 데이터 조직화, 모델 최적화**의 세 가지 관점으로 구조화하여 MLLMs의 자기 개선 연구를 촉진하고, 관련 과제와 미래 연구 방향을 제시합니다.

## 핵심 방법론
자기 개선 프로세스는 세 가지 주요 모듈로 구성됩니다: **1) 데이터 수집** (예: **Random Sampling, Guided Data Generation, Negative Samples**), **2) 데이터 조직화** (예: **Rule-Based Verification, Model-Based Verification, Verification from Environment**), **3) 모델 최적화** (예: **Supervised Fine-tuning (SFT), Reinforcement Learning (RL), Direct Preference Optimization (DPO)**). 이 과정은 새로운 모델을 다음 단계의 시드(seed)로 사용하여 반복될 수 있는 동적인 순환 구조를 가집니다.

## 주요 결과
이 서베이 논문은 MLLMs의 자기 개선이 **환각(hallucination)을 크게 줄이고** **성능을 향상**시킬 수 있음을 강조합니다. 특히, **규칙/검증 기반 RL**은 **시각 수학(visual math)**과 같은 검증 가능한 작업에서 가장 큰 성능 향상을 보이며, **선호도/AI 피드백 데이터**는 **환각 지표(POPE/AMBER)**를 낮추는 데 가장 효과적입니다. 하지만 **세분화된 공간 추론**과 **다중 이미지 일관성** 등에서 여전히 해결해야 할 병목 현상이 존재함을 지적합니다.

## AI 실무자를 위한 시사점
이 서베이는 AI 실무자들이 **효율적이고 자율적인 MLLM**을 개발하기 위한 구조화된 로드맵을 제공합니다. 제시된 **데이터 수집, 조직화, 최적화 기법**을 활용하여 MLLM의 신뢰성과 확장성을 향상시킬 수 있습니다. 특히 **다중 모드 데이터의 복잡성**, **강건한 검증 메커니즘**의 필요성, 그리고 **시드 모델의 초기 역량**이 자기 개선 루프의 성공에 중요함을 이해하는 것이 필수적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.