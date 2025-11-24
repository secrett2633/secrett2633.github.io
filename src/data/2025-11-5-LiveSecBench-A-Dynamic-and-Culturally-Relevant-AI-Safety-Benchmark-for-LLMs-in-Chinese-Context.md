---
title: "[논문리뷰] LiveSecBench: A Dynamic and Culturally-Relevant AI Safety Benchmark for
  LLMs in Chinese Context"
excerpt: "Tianxin Zhang이 [arXiv]에 게시한 'LiveSecBench: A Dynamic and Culturally-Relevant AI Safety Benchmark for
  LLMs in Chinese Context' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Safety
  - AI Safety Benchmark
  - Chinese Context
  - Dynamic Evaluation
  - Cultural Relevance
  - Adversarial Robustness
  - ELO Rating System

permalink: /ai/review/2025-11-5-LiveSecBench-A-Dynamic-and-Culturally-Relevant-AI-Safety-Benchmark-for-LLMs-in-Chinese-Context/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02366)

**저자:** Yudong Li, Zhongliang Yang, Kejiang Chen, Wenxuan Wang, Tianxin Zhang, Sifang Wan, Kecheng Wang, Haitian Li, Xu Wang, Lefan Cheng, Youdan Yang, Baocheng Chen, Ziyu Liu, Yufei Sun, Liyan Wu, Wenya Wen, Xingchi Gu, Peiru Yang



## 핵심 연구 목표
본 연구는 중국어 환경에서 대규모 언어 모델(LLMs)의 안전성 평가를 위한 **동적(dynamic)**이며 **문화적으로 적합한(culturally-relevant)** 벤치마크인 **LiveSecBench**를 제안하는 것을 목표로 합니다. 기존 영어 중심의 정적 벤치마크가 놓치기 쉬운 중국 특유의 법률, 윤리, 사회적 맥락 및 신종 위협을 포착하여 LLM 안전성 평가의 정확성과 관련성을 높이고자 합니다.

## 핵심 방법론
**LiveSecBench**는 법률(Legality), 윤리(Ethics), 사실성(Factuality), 프라이버시(Privacy), 적대적 강건성(Adversarial Robustness), 추론 안전성(Reasoning Safety)의 **여섯 가지 핵심 차원**에서 모델을 평가합니다. 평가 데이터셋은 중국어 화자가 직접 구성하여 문화적 적합성을 보장하며, **ELO 레이팅 시스템**을 사용하여 모델 간의 **일대일 비교(head-to-head)** 기반 순위를 도출합니다. 또한, 새로운 위협 벡터를 반영하기 위해 **정기적인 업데이트 스케줄**을 통해 벤치마크의 관련성을 유지합니다.

## 주요 결과
**LiveSecBench (v251030)**는 현재까지 **18개 LLM**에 대한 평가를 완료했으며, **GPT-5-Mini**가 **77.30점**으로 가장 높은 종합 점수를 기록했습니다. 각 차원별 세부 성능을 제공하며, 예를 들어 **Claude-Haiku-4.5**는 추론 안전성(Reasoning Safety)에서 **85.30%**의 높은 점수를 보였습니다. 이러한 결과는 중국어 환경에서 LLM 안전성 수준에 대한 포괄적인 현황을 제시하며, **https://livesecbench.intokentech.cn/**에서 공개적으로 확인할 수 있습니다.

## AI 실무자를 위한 시사점
**LiveSecBench**는 AI 실무자들에게 중국어 시장을 위한 LLM을 개발하고 배포할 때 필수적인 안전성 평가 도구를 제공합니다. 특히 **문화적 특수성**과 **동적인 위협 환경**에 대한 깊이 있는 이해를 돕고, 모델의 특정 취약점을 식별하는 데 유용합니다. 향후 **Text-to-Image 생성 안전성** 및 **Agentic 안전성**과 같은 새로운 평가 차원 추가 계획은 LLM의 확장된 응용 분야에 대한 안전성 고려 사항을 선제적으로 반영할 수 있도록 지원할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.