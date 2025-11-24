---
title: "[논문리뷰] Beyond Log Likelihood: Probability-Based Objectives for Supervised
  Fine-Tuning across the Model Capability Continuum"
excerpt: "Hanghang Tong이 [arXiv]에 게시한 'Beyond Log Likelihood: Probability-Based Objectives for Supervised
  Fine-Tuning across the Model Capability Continuum' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Supervised Fine-tuning (SFT)
  - Large Language Models (LLMs)
  - Training Objectives
  - Negative Log Likelihood (NLL)
  - Model Capability Continuum
  - Generalization
  - Probability-based Loss Functions

permalink: /ai/review/2025-10-2-Beyond-Log-Likelihood-Probability-Based-Objectives-for-Supervised-Fine-Tuning-across-the-Model-Capability-Continuum/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.00526)

**저자:** Gaotang Li, Ruizhong Qiu, Xiusi Chen, Heng Ji, Hanghang Tong



## 핵심 연구 목표
본 연구는 **대규모 언어 모델(LLM)**의 **지도 미세 조정(SFT)**에서 흔히 발생하는 일반화 한계를 해결하고자 합니다. 특히, 기본 훈련 목표인 **음의 로그 가능도(NLL)**가 사전 훈련된 모델의 사후 훈련 패러다임에서 최적이지 않다는 문제를 제기하며, 모델의 역량에 따라 확률 기반 목표 함수의 효과를 특성화하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **NLL**을 **fα(p) := (1-p^α)/α** 형태의 매개변수화된 확률 기반 목표 함수군으로 일반화했습니다. 모델 역량 연속체(model-capability continuum)를 **모델-강(MS), 모델-중간(MI), 모델-약(MW)** 세 가지로 분류하고, **7개 모델 백본**, **14개 벤치마크**, **3개 도메인**에 걸쳐 광범위한 실험을 수행했습니다. 또한, **기울기 형태(Wf(p))** 분석 및 **분위수 임계값(quantile thresholding)**을 통한 어블레이션 연구를 진행하여 각 목표 함수의 학습 역학을 분석했습니다.

## 주요 결과
**모델-강(MS)** 환경(예: 수학적 추론)에서는 **사전-선호(prior-leaning) 목표 함수**인 **-p** (α=1) 및 **임계값 기반 –log(p)**가 **NLL**보다 지속적으로 우수한 성능을 보였습니다. 특히, **Qwen2.5-Math-1.5B**에서 **-p**는 **17.00%**인 NLL 대비 **32.75%**의 평균 정확도를 달성했습니다. 반면, **모델-약(MW)** 환경(예: 텍스트 퍼즐)에서는 **NLL**이 **사전-선호 목표 함수**를 압도적으로 능가하며, **LLaMA-3.2-3B**에서 NLL이 **1.08%**의 **정확 일치(Exact Match)**를 보인 반면 **-p**는 **0.00%**에 그쳤습니다. **모델-중간(MI)** 환경(예: 의료 추론)에서는 두 목표 함수의 성능 차이가 미미했습니다.

## AI 실무자를 위한 시사점
이 연구는 **SFT 훈련 목표 선택**이 **기저 모델의 내재된 역량**에 결정적으로 의존함을 강조합니다. 강력한 사전 지식을 가진 모델의 경우, **사전-선호 목표 함수(예: -p 또는 임계값 NLL)**를 활용하면 일반화 성능을 크게 향상시킬 수 있습니다. 반면, 관련 사전 지식이 부족한 모델에는 **NLL**이 여전히 가장 효과적인 선택이며, 저확률 토큰을 포함한 모든 토큰에서 학습을 유도합니다. 이 발견은 **모델 역량에 따라 동적으로 조정되는 적응형 SFT 목표 함수** 개발의 필요성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.