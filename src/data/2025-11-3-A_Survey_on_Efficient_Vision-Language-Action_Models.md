---
title: "[논문리뷰] A Survey on Efficient Vision-Language-Action Models"
excerpt: "이 [arXiv]에 게시한 'A Survey on Efficient Vision-Language-Action Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied AI
  - Robotic Manipulation
  - VLA Models
  - Efficient AI
  - Model Compression
  - Efficient Training
  - Data Collection
  - Multimodal AI

permalink: /ai/review/2025-11-3-A_Survey_on_Efficient_Vision-Language-Action_Models/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24795)

**저자:** Zhaoshu Yu, Bo Wang, Pengpeng Zeng, Haonan Zhang, Ji Zhang, Lianli Gao, Jingkuan Song, Nicu Sebe, and Heng Tao Shen, IEEE Fellow



## 핵심 연구 목표
이 논문은 대규모 **Vision-Language-Action (VLA) 모델**이 직면한 막대한 계산 및 데이터 요구사항으로 인해 실제 로봇 환경에 배포되기 어려운 문제를 해결하는 것을 목표로 합니다. 데이터 수집부터 모델 설계 및 훈련에 이르는 전체 과정에서 **효율적인 VLA**에 대한 최초의 포괄적인 조사를 제공하고, 확장 가능하고 자원 효율적인 임베디드 AI 연구를 위한 통합 분류 체계를 구축하고자 합니다.

## 핵심 방법론
본 조사는 효율적인 VLA를 `Efficient Model Design`, `Efficient Training`, `Efficient Data Collection`의 세 가지 핵심 축으로 체계화하는 **통합 분류 체계**를 도입합니다. 각 축은 **효율적인 아키텍처** (예: **Efficient Attention**, **Transformer Alternatives**), **모델 압축** (예: **Layer Pruning**, **Quantization**, **Token Optimization**), **사전/후속 학습 전략** (예: **Data-Efficient Pre-training**, **RL-Based Methods**), **데이터 수집/증강 기법** (예: **Human-in-the-loop**, **Simulation Data Collection**)과 같은 세부 기술로 분류하여 최신 방법론들을 비판적으로 검토합니다.

## 주요 결과
조사에 따르면, `OpenVLA` [1]는 7B 파라미터 모델에서 **166ms**의 추론 지연 시간과 **6Hz**의 작동 주파수를 보이며, `πο` [2]는 3.3B 파라미터에서 **73ms** 지연 시간과 **20/50Hz**를 달성합니다. 효율적인 VLA 모델들은 **4비트 양자화**를 통해 GPU 메모리 요구량을 절반으로 줄이거나, **LoRA (Low-Rank Adaptation)**를 활용한 파라미터 효율적인 튜닝, 그리고 **생성형 시뮬레이션** 및 **Human-in-the-loop** 데이터 수집으로 데이터 비효율성을 개선합니다.

## AI 실무자를 위한 시사점
이 조사는 AI 실무자들에게 VLA 모델의 **실제 로봇 시스템 배포**에 필수적인 효율성 최적화 전략에 대한 포괄적인 가이드를 제공합니다. 특히, **경량 아키텍처**, **모델 압축(양자화, 가지치기)**, **데이터 효율적 학습** 및 **데이터 증강** 기법은 제한된 자원 환경에서 VLA를 개발하고 배포하는 데 중요한 고려사항임을 시사합니다. 이 연구는 고비용, 고자원 VLA 개발의 장벽을 낮추어 **더욱 광범위한 접근성**을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.