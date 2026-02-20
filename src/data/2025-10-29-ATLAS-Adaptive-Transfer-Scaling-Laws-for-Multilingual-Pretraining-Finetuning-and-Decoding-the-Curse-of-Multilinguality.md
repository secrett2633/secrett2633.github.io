---
title: "[논문리뷰] ATLAS: Adaptive Transfer Scaling Laws for Multilingual Pretraining,
  Finetuning, and Decoding the Curse of Multilinguality"
excerpt: "arXiv에 게시된 'ATLAS: Adaptive Transfer Scaling Laws for Multilingual Pretraining,
  Finetuning, and Decoding the Curse of Multilinguality' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multilingual LLMs
  - Scaling Laws
  - Transfer Learning
  - Curse of Multilinguality
  - Pretraining
  - Finetuning
  - Language Models
  - Adaptive Scaling

permalink: /ai/review/2025-10-29-ATLAS-Adaptive-Transfer-Scaling-Laws-for-Multilingual-Pretraining-Finetuning-and-Decoding-the-Curse-of-Multilinguality/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.22037)

**저자:** Shayne Longpre, Sneha Kudugunta, Niklas Muennighoff, I-Hung Hsu, Isaac Caswell, Alex Pentland, Sercan Ö. Arık, Chen-Yu Lee, Sayna Ebrahimi



## 핵심 연구 목표
이 연구는 영어에 주로 집중되어 있던 기존 스케일링 법칙 연구의 한계를 넘어, **다국어 사전 학습, 미세 조정 및 추론** 전반에 걸쳐 스케일링 법칙을 포괄적으로 이해하고 모델링하는 것을 목표로 합니다. 특히 다국어 모델의 성능에 영향을 미치는 **언어 간 전이 속성** 과 **다국어 저주(curse of multilinguality)** 현상을 정량적으로 측정하고 설명하는 것을 목적으로 합니다.

## 핵심 방법론
저자들은 **MADLAD-400 데이터셋** 을 사용하여 10M-8B 파라미터에 걸쳐 총 **774개의 다국어 학습 실험** 을 수행했습니다. 이들은 **ADAPTIVE TRANSFER SCALING LAW (ATLAS)** 를 도입하여 단일 언어 및 다국어 사전 학습 모두를 모델링하며, 기존 스케일링 법칙보다 **0.3 R² 이상 높은 예측 성능** 을 보였습니다. 또한, **38x38 언어 쌍** 에 대한 **CROSS-LINGUAL TRANSFER MATRIX** 를 구축하여 언어 간 전이 이점과 간섭을 측정하고, 다국어 저주를 설명하는 스케일링 법칙을 도출했습니다.

## 주요 결과
**ATLAS 스케일링 법칙** 은 기존 모델 대비 **R²(N) 지표에서 0.88** (기존 CSL 0.68, DCSL 0.78)로 더 큰 모델 크기에 대한 강력한 일반화 성능을 입증했습니다. **CROSS-LINGUAL TRANSFER MATRIX** 분석을 통해 영어(30개 언어 중 19개)가 가장 유용한 소스 언어임을 확인했으며, **언어 유사성(스크립트 및 언어 계열 공유)** 이 전이 점수를 강력하게 예측했습니다. 또한, 다국어 저주에 대한 스케일링 법칙을 통해 언어 추가 시 성능 저하를 방지하기 위해 **모델 크기(N')를 r^(φ/α) 배, 총 토큰(D_tot')을 r^(1+ψ/β) 배** 증가시켜야 함을 정량화했습니다. 사전 학습과 미세 조정 간의 교차점은 언어에 따라 **144B ~ 283B 토큰 범위** 에서 발생했습니다.

## AI 실무자를 위한 시사점
이 연구는 다국어 AI 모델 개발에서 **컴퓨팅 효율성을 극대화** 하기 위한 실용적인 지침을 제공합니다. 특히 **ATLAS 스케일링 법칙** 을 통해 모델 크기, 데이터 양, 언어 수 간의 최적의 균형을 찾아 **다국어 저주 현상** 을 효과적으로 관리할 수 있습니다. **CROSS-LINGUAL TRANSFER MATRIX** 는 특정 언어에 대한 학습 시 가장 효과적인 소스 언어를 선택하는 데 도움을 주며, **사전 학습 대 미세 조정 의사결정** 에 대한 정량적 기준(144B-283B 토큰)을 제시하여 개발자들이 자원을 효율적으로 배분할 수 있도록 지원합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.