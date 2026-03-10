---
title: "[논문리뷰] How Far Can Unsupervised RLVR Scale LLM Training?"
excerpt: "Shangziqi Zhao이 arXiv에 게시한 'How Far Can Unsupervised RLVR Scale LLM Training?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Unsupervised Reinforcement Learning
  - LLM Training
  - Intrinsic Rewards
  - External Rewards
  - Model Collapse
  - RLVR
  - Model Prior
  - Self-Verification

permalink: /ai/review/2026-03-10-How-Far-Can-Unsupervised-RLVR-Scale-LLM-Training/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.08660)

**저자:** Bingxiang He, Yuxin Zuo, Zeyuan Liu, Shangziqi Zhao, et al.



## 핵심 연구 목표
본 논문은 ground truth 레이블 없이 보상을 얻는 **Unsupervised Reinforcement Learning with Verifiable Rewards (URLVR)** 가 대규모 언어 모델(LLM) 학습을 얼마나 확장할 수 있는지 종합적으로 분석하는 것을 목표로 합니다. 특히, 모델의 내재적 신호를 활용하는 **Intrinsic Rewards** 의 잠재력과 한계를 깊이 탐구하고, 더 확장 가능한 대안으로서 **External Rewards** 의 가능성을 탐색합니다.

## 핵심 방법론
논문은 URLVR 방법론을 **Intrinsic Rewards** 와 **External Rewards** 로 분류하는 **분류 체계** 를 제시합니다. 이론적으로, 모든 내재적 보상 방법론이 모델의 초기 분포를 **shar프닝(sharpening)** 하는 메커니즘을 통해 수렴함을 보입니다. 다양한 모델( **Qwen3-1.7B-Base** , **Llama-3.1-8B** 등)과 데이터셋( **DAPO-17k** 등)에 걸쳐 **Extensive Experiments** 를 수행하여 내재적 보상의 거동을 분석하고, **Model Collapse Step** 이라는 새로운 지표를 제안합니다.

## 주요 결과
**Intrinsic Rewards** 는 모든 방법론에서 일관되게 **초기 성능 상승 후 붕괴(rise-then-fall pattern)** 하는 경향을 보였으며, 붕괴 시점은 모델의 초기 사전 지식에 따라 결정됨을 확인했습니다. 소규모 데이터셋(예: **128개 이하 샘플** )에서는 모델 붕괴 없이 안정적인 성능을 유지하여 **Test-Time Training** 에 안전하게 적용될 수 있음을 입증했습니다. 제안된 **Model Collapse Step** 은 표준 RL 훈련의 GT Gain 대비 **5.6배 적은 연산량** 으로 RL 훈련 가능성을 정확하게 예측하는 실용적인 지표임을 보여주었습니다. **External Rewards** (Self-Verification)는 **Intrinsic Rewards** 와 달리 지속적인 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
**Intrinsic Rewards** 는 모델이 이미 알고 있는 지식 범위 내에서 유용하며, 특히 **Test-Time Training** 과 같이 소규모, 도메인 특화된 시나리오에 적합합니다. 그러나 대규모 데이터셋에서는 **Model Collapse** 로 이어질 수 있어 확장성에 근본적인 한계가 있습니다. **Model Collapse Step** 은 고비용의 RL 훈련을 시작하기 전에 모델의 사전 지식과 훈련 가능성을 효율적으로 평가할 수 있는 중요한 도구입니다. **Generation-Verification Asymmetries** 를 활용하는 **External Rewards** 는 **Intrinsic Rewards** 의 한계를 넘어 LLM 훈련의 확장성을 달성하기 위한 유망한 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.