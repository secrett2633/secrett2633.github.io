---
title: "[논문리뷰] Mol-R1: Towards Explicit Long-CoT Reasoning in Molecule Discovery"
excerpt: "Di Zhang이 [arXiv]에 게시한 'Mol-R1: Towards Explicit Long-CoT Reasoning in Molecule Discovery' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Molecule Discovery
  - Chain-of-Thought
  - Large Language Models
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Molecular Generation
  - Explainable AI

permalink: /ai/review/2025-8-14-Mol-R1_Towards_Explicit_Long-CoT_Reasoning_in_Molecule_Discovery/

toc: true
toc_sticky: true

date: 2025-08-14 13:19:02+0900
last_modified_at: 2025-08-14 13:19:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.08401)

**저자:** Jiatong Li, Weida Wang, Qinggang Zhang, Junxian Li, Di Zhang



## 핵심 연구 목표
본 논문은 **Large Language Models (LLMs)**의 분자 발견 분야 적용 시 나타나는 설명 가능성 및 추론 성능 한계를 해결하는 것을 목표로 합니다. 특히, 텍스트 기반 분자 생성에서 **R1-like Long Chain-of-Thought (CoT)** 추론 모델의 콜드 스타트 문제와 불안정한 추론 과정을 개선하고자 합니다.

## 핵심 방법론
Mol-R1 프레임워크는 두 가지 주요 구성 요소로 이루어져 있습니다. 첫째, **Prior Regulation via In-context Distillation (PRID)**을 통해 전문가의 주석이 달린 예시와 논리 규제를 기반으로 고품질 추론 데이터셋을 큐레이션합니다. 둘째, **Molecular Iterative Adaptation (MoIA)**는 **Supervised Fine-tuning (SFT)**과 **Reinforced Policy Optimization (RPO)**를 반복적으로 결합하여 모델의 추론 성능을 향상시키며, 특히 **Group Relative Policy Optimization (GRPO)**를 활용합니다.

## 주요 결과
Mol-R1은 텍스트 기반 분자 추론 생성 태스크에서 기존 베이스라인 대비 우수한 성능을 보였습니다. 특히, **Mol-R1 (T=2)**는 **QWQ-32B**보다 **BLEU 점수에서 354% 높은 성능**을 달성했으며, **EM (Exact Match) 점수 0.234**를 기록하여 모든 모델 중 가장 높았습니다. **PRID-40** 설정에서는 **BLEU 0.636**과 **EM 0.038**을 달성하며 추론 없이 학습한 **Llama3.1-8B**보다 현저히 뛰어난 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM을 활용한 분자 발견 과정에 **설명 가능성**과 **신뢰성**을 부여하는 새로운 길을 열었습니다. 특히, **전문가 지식 기반의 데이터 큐레이션 (PRID)**과 **SFT-RPO의 반복적 결합 (MoIA)**은 지식 집약적 도메인에서 LLM의 성능을 극대화하는 효과적인 전략임을 보여줍니다. 이는 신약 개발과 같이 투명성과 정확성이 필수적인 분야에서 AI 모델의 실용적 가치를 높이는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.