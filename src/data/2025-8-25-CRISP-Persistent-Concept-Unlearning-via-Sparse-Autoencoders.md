---
title: "[논문리뷰] CRISP: Persistent Concept Unlearning via Sparse Autoencoders"
excerpt: "Yonatan Belinkov이 [arXiv]에 게시한 'CRISP: Persistent Concept Unlearning via Sparse Autoencoders' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Concept Unlearning
  - Sparse Autoencoders (SAEs)
  - LLMs
  - Parameter-Efficient Fine-Tuning
  - Model Interpretability
  - Safety-Critical AI
  - Feature Suppression
  - WMDP Benchmark

permalink: /ai/review/2025-8-25-CRISP-Persistent-Concept-Unlearning-via-Sparse-Autoencoders/

toc: true
toc_sticky: true

date: 2025-08-25 13:13:07+0900
last_modified_at: 2025-08-25 13:13:07+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.13650)

**저자:** Tomer Ashuach, Dana Arad, Aaron Mueller, Martin Tutek, Yonatan Belinkov



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs)에서 불필요하거나 유해한 지식을 **영구적으로 제거(Persistent Concept Unlearning)**하면서도 모델의 일반적인 유용성과 생성 품질을 유지하는 것을 목표로 합니다. 기존 언러닝 방식들이 겪는 비유해 지식 손상 및 언러닝 대상 개념에서의 모델 유창성 저하 문제를 해결하고자 합니다.

## 핵심 방법론
CRISP는 **사전 훈련된 Sparse Autoencoders (SAEs)**를 사용하여 타겟 말뭉치에서 강력하게 활성화되지만 정상 말뭉치에서는 그렇지 않은 **주요 특징(salient features)**을 자동으로 식별합니다. 이후 **LoRA(Parameter-Efficient Fine-Tuning)**를 통해 모델의 파라미터를 최적화하여 이러한 주요 특징들의 활성화를 타겟 말뭉치에서 억제합니다. 최적화 과정은 **언러닝 손실(Unlearning Loss)**, **유지 손실(Retention Loss)**, **일관성 손실(Coherency Loss)** 세 가지를 조합하여 이루어집니다.

## 주요 결과
CRISP는 **WMDP 벤치마크**의 biosecurity 및 cybersecurity 도메인에서 기존 방법론들(RMU, ELM)을 크게 능가하는 **최고의 전반적인 성능**을 달성했습니다. 예를 들어, **WMDP-Bio Llama-3.1-8B 모델**에서 CRISP는 **60.10점**의 종합 점수를 기록하여 RMU(52.51점) 및 ELM(33.93점)보다 우수했으며, **74.13%**의 높은 유지 정확도를 보였습니다. 특징 수준 분석 결과, CRISP가 타겟 개념과 비유해 개념 간의 **의미론적으로 일관된 분리**를 성공적으로 달성함을 입증했습니다.

## AI 실무자를 위한 시사점
CRISP는 **SAEs의 해석 가능성**을 활용하여 LLMs의 언러닝을 **정확하고 지속적인 방식**으로 수행할 수 있는 실용적인 방법론을 제시합니다. 이는 **안전이 중요한 AI 애플리케이션**에서 특정 유해 지식을 제거하면서도 모델의 성능을 보존해야 하는 AI 엔지니어에게 특히 유용합니다. **LoRA**를 통한 파라미터 효율적인 접근 방식은 대규모 모델의 언러닝 비용을 절감하여 실제 배포에 적합한 솔루션이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.