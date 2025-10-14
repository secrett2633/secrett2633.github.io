---
title: "[논문리뷰] Why Language Models Hallucinate"
excerpt: "Edwin Zhang이 [arXiv]에 게시한 'Why Language Models Hallucinate' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Models
  - Hallucination
  - Pretraining
  - Post-training
  - Evaluation Metrics
  - Binary Classification
  - Uncertainty Quantification
  - Calibration

permalink: /ai/review/2025-9-8-Why_Language_Models_Hallucinate/

toc: true
toc_sticky: true

date: 2025-09-08 13:10:18+0900
last_modified_at: 2025-09-08 13:10:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.04664)

**저자:** Adam Tauman Kalai, Ofir Nachum, Santosh S. Vempala, Edwin Zhang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 "환각" 현상, 즉 그럴듯하지만 틀린 정보를 자신감 있게 생성하는 이유를 통계적으로 분석하고, 이러한 문제가 최신 모델에서도 지속되는 근본적인 원인을 밝히는 것을 목표로 합니다. 특히, 모델의 훈련 및 평가 과정에서 불확실성을 인정하기보다 추측을 보상하는 메커니즘을 규명하고, 이를 해결하여 신뢰할 수 있는 AI 시스템을 구축하기 위한 실질적인 제안을 제시합니다.

## 핵심 방법론
연구는 환각 현상을 **이진 분류(binary classification) 오류**의 한 형태로 재정의하고, 언어 모델의 생성 오류율이 '유효성 판단(Is-It-Valid, IIV)' 분류 문제의 오분류율과 직접적인 수학적 관계(생성 오류율 ≥ 2 * IIV 오분류율)를 가짐을 증명합니다. **교차 엔트로피(cross-entropy) 손실** 최소화가 사전 훈련 모델의 캘리브레이션 및 초기 환각 발생에 미치는 영향을 분석하고, **굿-튜링(Good-Turing) 누락 질량 추정기**에서 파생된 **싱글톤 비율(singleton rate)**을 이용해 학습 데이터에 패턴이 없는 임의의 사실에 대한 환각 하한을 도출합니다. 또한, 기존의 주요 평가 벤치마크들이 불확실성 표현을 페널티화하여 모델의 추측을 장려하는 경향을 **표 2**를 통해 실증적으로 분석합니다.

## 주요 결과
사전 훈련 단계에서 언어 모델은 통계적 압력으로 인해 환각을 일으키며, 이는 IIV 분류 문제에서의 오분류율과 직접적인 연관이 있습니다. 특히, **GPT-4 모델**은 사전 훈련 시 **Expected Calibration Error (ECE) 0.007**로 잘 보정되어 있었으나, 사후 훈련(PPO) 후에는 **ECE 0.074**로 보정 수준이 낮아졌습니다. 임의의 사실(예: 생일 정보)에 대한 환각률 하한이 학습 데이터의 **싱글톤 비율(sr)**과 관련되어 결정됨을 보였으며, **trigram 모델**이 단순한 글자 세기 문제에서 **1/2 이상의 오류율**을 가질 수 있음을 입증했습니다. 결정적으로, **대부분의 주류 평가 벤치마크(표 2)**가 불확실한 답변(IDK)에 대해 점수를 주지 않거나 페널티를 부여함으로써 모델의 추측을 장려하는 경향을 확인했습니다.

## AI 실무자를 위한 시사점
환각은 단순히 모델의 기술적 결함이 아니라, **학습 및 평가 패러다임에 내재된 통계적, 사회 기술적 문제**임을 이해하는 것이 중요합니다. 신뢰할 수 있는 LLM을 개발하기 위해서는 사전 훈련 단계의 **모델 캘리브레이션 유지**와 함께, **명시적인 신뢰도 목표**를 평가 지침에 포함하여 불확실성을 인정하는 답변에 보상을 주는 **평가 방식의 근본적인 변화**가 필수적입니다. 이는 단순히 환각 관련 벤치마크를 추가하는 것만으로는 부족하며, 기존 주류 벤치마크의 점수 체계를 수정함으로써 AI 시스템의 신뢰성을 근본적으로 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.