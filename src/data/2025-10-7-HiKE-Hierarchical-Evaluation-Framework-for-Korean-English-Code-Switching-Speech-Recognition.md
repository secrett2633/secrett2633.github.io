---
title: "[논문리뷰] HiKE: Hierarchical Evaluation Framework for Korean-English
  Code-Switching Speech Recognition"
excerpt: "arXiv에 게시된 'HiKE: Hierarchical Evaluation Framework for Korean-English
  Code-Switching Speech Recognition' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code-Switching
  - Speech Recognition
  - Korean-English ASR
  - Evaluation Framework
  - Multilingual ASR
  - Loanword Processing
  - Fine-tuning
  - Hierarchical Labeling

permalink: /ai/review/2025-10-7-HiKE-Hierarchical-Evaluation-Framework-for-Korean-English-Code-Switching-Speech-Recognition/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.24613)

**저자:** Gio Paik, Yongbeom Kim, Soungmin Lee, Sangmin Ahn, Chanwoo Kim



## 핵심 연구 목표
본 연구는 한국어-영어 코드 스위칭(CS) 음성 인식(ASR) 분야의 심각한 연구 부족을 해결하고, 다국어 ASR 모델의 정밀한 평가를 위한 최초의 공개적인 계층적 평가 프레임워크인 **HiKE** 를 제시하는 것을 목표로 합니다. 특히 한국어와 같이 어족이 다른 언어쌍의 CS-ASR 성능 저하 문제를 다루며, 실제 CS 환경에서 발생하는 다양한 CS 유형에 대한 모델의 능력을 체계적으로 평가하고자 합니다.

## 핵심 방법론
**HiKE** 벤치마크는 인간-LLM 협업을 통해 제작된 1,121개의 고품질 한국어-영어 CS 발화(약 2.2시간)로 구성됩니다. 제안된 프레임워크는 CS를 **단어, 구, 문장** 의 세 가지 계층적 수준으로 분류하여 라벨링하며, 평가 시 모호성을 줄이기 위해 **꼼꼼하게 라벨링된 차용어** 를 포함합니다. 모델 성능 평가는 **Mixed Error Rate (MER)** 와 **Point of Interest Error Rate (PIER)** 지표를 사용하여 수행되었고, **9개의 다국어 ASR 모델** 을 평가했으며, **Whisper-Medium** 모델을 사용하여 자연 CS 데이터 및 합성 CS 데이터로 **미세 조정 실험** 을 진행했습니다.

## 주요 결과
기존 다국어 ASR 모델들은 CS 데이터에서 단일 언어 대비 MER이 **3배에서 14배** 까지 증가하며 심각한 성능 저하를 보였습니다. 비-LLM 모델은 **문장 레벨 CS** 에서 가장 우수하고 **단어 레벨 CS** 에서 가장 취약한 반면, LLM 기반 모델인 **GPT-40-TRANSCRIBE** 는 **단어 레벨 CS** 에서 가장 좋은 성능을 보였습니다. 미세 조정 실험 결과, 합성 문장 레벨 CS 데이터로만 미세 조정한 경우에도 MER과 PIER이 **13% 이상** 개선되었으며, 자연 데이터로 미세 조정한 경우 **Whisper-Medium** 의 전체 MER이 **37.3에서 10.0으로** 크게 향상되었습니다.

## AI 실무자를 위한 시사점
**HiKE** 는 한국어-영어 CS-ASR 분야의 중요한 공개 벤치마크를 제공하여, AI/ML 엔지니어들이 이 분야의 연구와 모델 개발에 참여할 수 있는 기반을 마련합니다. 현재의 SOTA 다국어 ASR 모델들이 CS 시나리오에서 현저한 성능 저하를 보이므로, **CS 데이터에 대한 전용 모델 개발** 또는 **미세 조정 전략** 이 필수적임을 시사합니다. 특히, 단일 언어 발화를 연결하여 생성한 **합성 CS 데이터** 만으로도 ASR 성능을 효과적으로 향상시킬 수 있다는 결과는 리소스가 부족한 언어쌍의 CS-ASR 모델 학습에 **비용 효율적인 솔루션** 을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.