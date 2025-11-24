---
title: "[논문리뷰] From Black Box to Transparency: Enhancing Automated Interpreting
  Assessment with Explainable AI in College Classrooms"
excerpt: "Ziyin Zhang이 [arXiv]에 게시한 'From Black Box to Transparency: Enhancing Automated Interpreting
  Assessment with Explainable AI in College Classrooms' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Automated Interpreting Assessment
  - Explainable AI
  - Data Augmentation
  - Variational Autoencoder
  - SHAP
  - Interpreting Quality
  - Natural Language Processing

permalink: /ai/review/2025-8-15-From-Black-Box-to-Transparency-Enhancing-Automated-Interpreting-Assessment-with-Explainable-AI-in-College-Classrooms/

toc: true
toc_sticky: true

date: 2025-08-15 13:09:31+0900
last_modified_at: 2025-08-15 13:09:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.10860)

**저자:** Zhaokun Jiang, Ziyin Zhang



## 핵심 연구 목표
본 논문은 기존의 수동 통역 평가 방식의 한계(편향, 불일치)와 자동 평가 시스템의 불투명성 및 데이터 불균형 문제를 해결하고자 합니다. 특히 모델 예측에 대한 **설명 가능성(Explainability)**을 강조하며, 통역 품질 평가를 위한 **투명하고 다차원적인 자동화 프레임워크**를 제안합니다.

## 핵심 방법론
이 연구는 **117개의 영어-중국어 순차 통역 데이터셋**을 구축하고, **Variational Autoencoder (VAE)**를 활용하여 데이터를 **500개의 샘플**로 증강하여 데이터 불균형 문제를 완화했습니다. **BLEURT, CometKiwi**와 같은 번역 품질 지표, 시간 관련 특징, 구문 복잡성 지표 및 **GPT-4o**를 통한 문법 오류 주석 등의 다양한 특징을 추출했습니다. 이 특징들을 기반으로 **XGBoost, Random Forest (RF), Multi-Layer Perceptron (MLP)** 모델을 사용하여 정보 완전성(InfoCom), 유창성(FluDel), 목표 언어 품질(TLQual)의 세 가지 차원에 걸쳐 통역 성능을 예측했으며, **Shapley Value (SHAP) 분석**을 통해 모델 예측의 **전역적 및 지역적 설명**을 제공했습니다.

## 주요 결과
**VAE 기반 데이터 증강**은 모델 성능을 **크게 향상**시켰으며, 특히 점수 분포의 극단값 예측에서 효과적이었습니다. 정보 완전성 예측에는 **RF 회귀 모델**이 가장 우수했고(증강 데이터 기준 RMSE **1.05**, Spearman ρ **0.68**), 유창성 및 목표 언어 품질 예측에는 **XGBoost**가 최적의 성능을 보였습니다(유창성 RMSE **0.68**, Spearman ρ **0.87**; 목표 언어 품질 RMSE **0.75**, Spearman ρ **0.79**). **SHAP 분석** 결과, 정보 완전성은 **BLEURT(M=0.32)**와 **CometKiwi(M=0.17)**에 가장 민감했으며, 유창성은 **NFP(채워진 일시 정지 수, M=-0.17)**와 같은 단절 유창성 특징에, 목표 언어 품질은 **CN_RATIO(분류사-명사 조합 비율, M=0.25)**와 같은 중국어 특유의 구절 특징에 크게 의존하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
본 연구는 AI/ML 모델을 활용한 자동 통역 평가가 **기존 수동 평가의 신뢰성과 투명성 문제를 해결**할 수 있음을 보여줍니다. 특히 **설명 가능한 AI (XAI)** 기법의 통합은 **모델 예측의 근거를 제공**하여, 통역 학습자에게 **구체적이고 진단적인 피드백**을 제공하고 자기 주도 학습을 지원하는 데 기여합니다. 이는 AI 기반 교육 도구의 **실용적 적용 가능성**을 높이며, 모델이 단순히 점수를 넘어 학습자의 **강점과 약점을 파악**하고 맞춤형 교육 전략을 수립하는 데 중요한 정보를 제공함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.