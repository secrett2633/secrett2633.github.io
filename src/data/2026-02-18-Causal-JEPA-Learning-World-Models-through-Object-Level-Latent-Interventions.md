---
title: "[논문리뷰] Causal-JEPA: Learning World Models through Object-Level Latent Interventions"
excerpt: "arXiv에 게시된 'Causal-JEPA: Learning World Models through Object-Level Latent Interventions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Models
  - Object-Centric Representations
  - Latent Interventions
  - Masked Prediction
  - Causal Inductive Bias
  - Joint Embedding Predictive Architecture (JEPA)
  - Visual Question Answering (VQA)
  - Model Predictive Control (MPC)

permalink: /ai/review/2026-02-18-Causal-JEPA-Learning-World-Models-through-Object-Level-Latent-Interventions/

toc: true
toc_sticky: true

date: 2026-02-18 00:00:00+0900+0900
last_modified_at: 2026-02-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.11389)

**저자:** Heejeong Nam, Quentin Le Lidec, Lucas Maes, Yann LeCun, Randall Balestriero



## 핵심 연구 목표
기존 객체 중심(object-centric) 월드 모델이 상호작용 의존적 다이내믹스를 포착하지 못하고 자가 다이내믹스나 우발적 상관관계에 의존하는 한계를 해결하고자 합니다. 본 논문은 객체 수준의 마스킹을 통한 잠재적 개입(latent intervention)으로 상호작용 추론을 유도하는 인과적 유도 편향(causal inductive bias)을 가진 객체 중심 월드 모델을 제안합니다.

## 핵심 방법론
제안하는 **Causal-JEPA (C-JEPA)** 는 **Joint Embedding Predictive Architecture (JEPA)** 를 기반으로 이미지 패치 대신 객체 중심 표현에 마스킹을 적용합니다. 특히, 과거(history) 프레임에서 선택된 객체의 잠재 상태를 마스킹하여, 모델이 해당 객체의 상태를 다른 객체 및 보조 변수(auxiliary variables)로부터 추론하도록 강제합니다. **ViT-스타일 마스킹 Transformer 예측기** 를 사용하여 마스킹된 과거와 미래 상태를 예측하며, 이는 상호작용 추론을 기능적으로 필수적으로 만듭니다.

## 주요 결과
**CLEVRER** 데이터셋의 시각적 질의응답(VQA) 태스크에서 객체 수준 마스킹이 없는 동일 아키텍처 대비 반사실적 추론에서 약 **20%** 의 절대적인 성능 향상을 달성했습니다 (예: C-JEPA(V) |M|=4가 68.81% vs OC-JEPA(V) |M|=0가 47.68%). **Push-T** 조작 태스크에서는 패치 기반 월드 모델인 **DINO-WM** 과 유사한 제어 성능( **88.67% 성공률** vs DINO-WM 91.33%)을 보이면서도 총 잠재 입력 특성 크기의 **1.02%** 만을 사용하여 **8배 이상 빠른 MPC 계획** 을 가능하게 했습니다.

## AI 실무자를 위한 시사점
이 연구는 객체 수준 마스킹을 통한 잠재적 개입이 월드 모델의 상호작용 학습을 효과적으로 유도하는 실용적인 방법을 제시합니다. 이는 복잡한 동적 환경에서 에이전트의 추론 및 제어 능력을 향상시키는 데 기여할 수 있습니다. 특히, 적은 수의 토큰으로도 경쟁력 있는 성능을 달성하여 리소스 효율적인 계획(efficient planning)이 필요한 로봇 공학 등 실제 응용 분야에서 **객체 중심 월드 모델** 의 활용 가능성을 크게 높였습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.