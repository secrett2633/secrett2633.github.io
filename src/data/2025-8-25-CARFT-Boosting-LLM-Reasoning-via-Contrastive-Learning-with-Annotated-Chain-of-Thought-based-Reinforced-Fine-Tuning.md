---
title: "[논문리뷰] CARFT: Boosting LLM Reasoning via Contrastive Learning with Annotated
  Chain-of-Thought-based Reinforced Fine-Tuning"
excerpt: "Yulun Zhang이 [arXiv]에 게시한 'CARFT: Boosting LLM Reasoning via Contrastive Learning with Annotated
  Chain-of-Thought-based Reinforced Fine-Tuning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Reasoning
  - Contrastive Learning
  - Reinforcement Learning
  - Fine-tuning
  - Chain-of-Thought (CoT)
  - Annotated Data
  - Model Stability

permalink: /ai/review/2025-8-25-CARFT-Boosting-LLM-Reasoning-via-Contrastive-Learning-with-Annotated-Chain-of-Thought-based-Reinforced-Fine-Tuning/

toc: true
toc_sticky: true

date: 2025-08-25 13:13:07+0900
last_modified_at: 2025-08-25 13:13:07+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.15868)

**저자:** Wenqiao Zhu, Ji Liu, Rongjuncheng Zhang, Haipang Wu, Yulun Zhang



## 핵심 연구 목표
본 논문은 LLM의 추론 능력 향상을 목표로, 기존 SFT(Supervised Fine-Tuning) 방식의 제한된 일반화 능력과 RL(Reinforcement Learning) 기반 방식의 **불안정한 추론 경로 샘플링** 및 **주석된 CoT(Chain-of-Thought) 활용 부족**이라는 두 가지 주요 한계를 해결하고자 합니다. 특히, **모델 붕괴(model collapse)** 문제와 **차선의 성능** 문제를 극복하여 LLM의 추론 성능과 안정성을 동시에 개선하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **CARFT(Contrastive learning with Annotated CoT-based Reinforced Fine-Tuning)**를 제안합니다. 이 방법론은 고품질 **주석된 CoT**와 온-정책(on-policy) 샘플링된 CoT를 포함하는 **통합된 CoT 표현(unified representation)**을 학습한 후, 이를 기반으로 **마스크된 InfoNCE 손실(Masked InfoNCE loss)**과 같은 **대조 신호(contrastive signals)**를 설계하여 미세 조정 과정의 성능과 안정성을 향상시킵니다. 또한, **임베딩 강화 부분 보상(embedding-enhanced partial reward)** 메커니즘을 도입하여 RL 미세 조정 과정의 안정성과 LLM의 최종 성능을 더욱 개선합니다.

## 주요 결과
**CARFT**는 **SVAMP** 및 **GSM8K** 데이터셋에서 **CodeLlama-7B** 및 **Qwen2.5-7B-Instruct**를 포함한 두 가지 기반 모델에 대해 SFT, ReFT, Dr.GRPO 등 세 가지 베이스라인 대비 뛰어난 성능을 보였습니다. **CodeLlama-7B** 모델 사용 시, **SVAMP**에서 **SFT 대비 2.5%p, ReFT 대비 2.3%p 향상**된 64.8%의 정확도를 달성했습니다. **GSM8K**에서는 **CodeLlama-7B** 모델에서 **SFT 대비 7.13%p, ReFT 대비 0.68%p 향상**된 50.95%의 정확도를 기록했으며, **Qwen2.5-7B-Instruct**에서는 ReFT 대비 GSM8K에서 **18.2%p** 향상을 보였습니다. 전반적으로 **성능은 최대 10.15%**, **효율성은 최대 30.62%**까지 향상되었으며, 기존 RL 방식보다 미세 조정 과정의 안정성이 크게 개선되었습니다.

## AI 실무자를 위한 시사점
**CARFT**는 LLM의 추론 능력을 향상시키기 위해 **주석된 CoT의 잠재력을 최대한 활용**하고, **대조 학습**을 통해 **모델 붕괴**와 같은 RL 훈련의 불안정성을 효과적으로 완화하는 실용적인 방법론을 제시합니다. **임베딩 강화 부분 보상**은 미세 조정 과정의 안정성과 최종 성능을 더욱 높이는 데 기여하며, 대규모 언어 모델의 추론 능력 향상을 위한 새로운 방향을 제시합니다. 이는 기존 **RL 기반 미세 조정의 불안정성** 문제를 해결하고, **주석된 CoT의 가치**를 재평가함으로써, 실제 AI 시스템에서 보다 **강건하고 효율적인 LLM 추론 모델**을 구축하는 데 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.