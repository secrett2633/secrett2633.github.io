---
title: "[논문리뷰] YaPO: Learnable Sparse Activation Steering Vectors for Domain Adaptation"
excerpt: "이 [arXiv]에 게시한 'YaPO: Learnable Sparse Activation Steering Vectors for Domain Adaptation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Activation Steering
  - Sparse Autoencoders (SAEs)
  - Domain Adaptation
  - Cultural Alignment
  - Preference Optimization
  - Disentangled Representations
  - Fine-grained Control

permalink: /ai/review/2026-01-20-YaPO-Learnable-Sparse-Activation-Steering-Vectors-for-Domain-Adaptation/

toc: true
toc_sticky: true

date: 2026-01-20 00:00:00+0900+0900
last_modified_at: 2026-01-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.08441)

**저자:** Abdelaziz Bounhar, Rania Hossam Elmohamady Elbadry, Hadi Abdine, Preslav Nakov, Michalis Vazirgiannis, Guokan Shang



## 핵심 연구 목표
본 논문은 LLM의 행동을 미세하게 제어하는 데 있어 기존의 **Dense Steering Vector** 방식이 지닌 **Latent Factor 얽힘(Entanglement)** 문제와 불안정성을 해결하는 것을 목표로 합니다. 특히, 문화적 정렬과 같은 세분화된 도메인 적응 설정에서 **Disentangled** , **Interpretable** 하며 **안정적인 Sparse Steering Vector** 를 학습하는 새로운 방법론을 제시하고자 합니다.

## 핵심 방법론
저자들은 **YaPO (Yet another Policy Optimization)** 를 제안합니다. 이는 **pretrained Sparse Autoencoder (SAE)** 의 **Latent Space** 에서 학습 가능한 Sparse Steering Vector를 직접 학습하는 **reference-free** 방식입니다. **BiPO-style Objective** 를 사용하여 Sparse Code를 최적화하며, **ReLU 함수** 를 적용하여 Sparse Code의 비음수성을 강제하고, **SAE Reconstruction Error** 를 보정하는 **Residual Correction Term** 을 추가하여 원본 Hidden State와의 일관성을 유지합니다.

## 주요 결과
YaPO는 **Dense Steering Baseline** 과 비교하여 **수렴 속도가 한 자릿수 이상 빠르며** , 손실이 **150 Step 이내에 0.1 이하** 로 일관되게 감소하는 것을 보여주었습니다. 새로운 문화적 정렬 벤치마크에서 **Dense BiPO** 대비 우수한 성능을 달성했으며, 특히 비지역화된(Non-localized) 프롬프트에서 문화적 적합성을 크게 향상시켰습니다. 또한, **MMLU 벤치마크** 에서 일반 지식 능력의 저하 없이 안정적인 성능을 유지함을 입증했습니다.

## AI 실무자를 위한 시사점
YaPO는 LLM의 **효율적이고 안정적이며 세분화된 정렬** 을 위한 일반적인 방법론을 제공합니다. **Sparse Autoencoder** 를 활용한 Latent Space에서의 조작은 **Disentangled Representation** 을 가능하게 하여, 복잡한 행동 제어 및 도메인 적응 태스크에서 **Fine-tuning** 보다 효율적이고 해석 가능한 대안을 제시합니다. 이는 AI 엔지니어들이 LLM을 특정 도메인이나 행동에 맞게 조정할 때 필요한 리소스와 복잡성을 줄이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.