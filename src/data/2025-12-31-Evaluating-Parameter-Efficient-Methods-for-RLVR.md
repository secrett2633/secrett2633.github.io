---
title: "[논문리뷰] Evaluating Parameter Efficient Methods for RLVR"
excerpt: "arXiv에 게시된 'Evaluating Parameter Efficient Methods for RLVR' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Parameter-Efficient Fine-Tuning (PEFT)
  - Reinforcement Learning with Verifiable Rewards (RLVR)
  - Low-Rank Adaptation (LoRA)
  - Mathematical Reasoning
  - LLM Adaptation
  - SVD Initialization

permalink: /ai/review/2025-12-31-Evaluating-Parameter-Efficient-Methods-for-RLVR/

toc: true
toc_sticky: true

date: 2025-12-31 00:00:00+0900+0900
last_modified_at: 2025-12-31 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.23165)

**저자:** Qingyu Yin, Yulun Wu, Zhennan Shen, Sunbowen Li, Zhilin Wang, Yanshu Li, Chak Tou Leong, Jiale Kang, Jinjin Gu



## 핵심 연구 목표
본 논문은 Reinforcement Learning with Verifiable Rewards (RLVR) 패러다임 하에서 다양한 **Parameter-Efficient Fine-Tuning (PEFT) 방법론** 을 체계적으로 평가하여 최적의 아키텍처를 식별하는 것을 목표로 합니다. 특히, 기존 RL 미세 조정에서 표준 LoRA의 기본 채택이 과연 최적인지에 대한 불확실성을 해소하고자 합니다.

## 핵심 방법론
연구팀은 **DeepSeek-R1-Distill (1.5B 및 7B) LLM** 에 걸쳐 **12개 이상의 PEFT 방법론** (예: **LoRA, DORA, AdaLoRA, MiSS, PiSSA, MiLoRA, VeRA, IA³** )을 평가했습니다. 실험은 **DAPO 알고리즘** 을 사용하는 RLVR 프레임워크 내에서 **MATH-500, AIME, AMC** 등의 수학적 추론 벤치마크에 대해 **통일된 하이퍼파라미터** 로 진행되었으며, RLVR 손실 유형, 학습률, LoRA 랭크, 배치 크기에 대한 심층적인 어블레이션 연구도 포함됩니다.

## 주요 결과
**DORA, AdaLoRA, MiSS** 와 같은 **구조적 변형 PEFT** 는 표준 **LoRA** 보다 일관적으로 뛰어난 성능을 보였으며, **DoRA** 는 전체 매개변수 미세 조정의 평균 정확도 **44.9%** 를 넘어서는 **46.6%** 를 달성했습니다. **SVD 기반 초기화 전략 (PiSSA, MiLoRA)** 은 RL 최적화와의 근본적인 불일치로 인해 훈련 실패 또는 성능 저하를 겪었습니다 ( **PiSSA 0.2%** , **MiLoRA 18.0%** 정확도). 또한, **VeRA** 나 **Rank-1 어댑터** 와 같은 극단적인 매개변수 감소 방법은 추론 능력의 병목 현상을 초래하여 성능을 크게 저하시켰습니다 ( **VeRA 40.7%** , **Rank-1 LoRA 40.5%** 정확도).

## AI 실무자를 위한 시사점
RLVR 환경에서 LLM을 미세 조정할 때, 표준 **LoRA** 의 기본 사용을 재고하고 **DORA, AdaLoRA, MiSS** 와 같은 **구조적 변형 PEFT** 를 적극적으로 고려해야 합니다. **PiSSA나 MiLoRA** 처럼 **SVD 기반 초기화** 를 사용하는 방법론은 RL 학습 역학과 충돌할 가능성이 높으므로 피해야 하며, **LoRA+** 와 같이 학습률 조정에 기반한 초기화가 더 안정적입니다. 마지막으로, 복잡한 추론 작업을 위해 **극단적인 매개변수 감소** 를 지양하고 **적절한 어댑터 랭크 (예: 16 또는 32)** 를 유지하여 충분한 모델 표현력을 확보하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.