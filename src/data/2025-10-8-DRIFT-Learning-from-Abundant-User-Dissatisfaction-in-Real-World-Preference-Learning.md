---
title: "[논문리뷰] DRIFT: Learning from Abundant User Dissatisfaction in Real-World
  Preference Learning"
excerpt: "Zheli Liu이 [arXiv]에 게시한 'DRIFT: Learning from Abundant User Dissatisfaction in Real-World
  Preference Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Preference Learning
  - LLMs
  - User Feedback
  - Dissatisfaction Signals
  - DPO
  - Iterative Training
  - RLHF
  - Exploration

permalink: /ai/review/2025-10-8-DRIFT-Learning-from-Abundant-User-Dissatisfaction-in-Real-World-Preference-Learning/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.02341)

**저자:** Yifan Wang, Bolian Li, Junlin Wu, Zhaoxuan Tan, Zheli Liu, Ruqi Zhang, Ananth Grama, Qingkai Zeng



## 핵심 연구 목표
대규모 언어 모델(LLM) 배포 환경에서 희소한 명시적 만족(SAT) 피드백 대신, 풍부하게 발생하는 암묵적인 사용자 불만족(DSAT) 신호를 효과적으로 활용하여 모델 성능을 개선하는 확장 가능하고 효율적인 선호 학습 방법론을 개발하는 것이 목표입니다. 기존 선호 학습 방법들이 데이터 프로파일에 제대로 부합하지 않는 문제점을 해결하고자 합니다.

## 핵심 방법론
본 논문은 **DRIFT (Dissatisfaction-Refined Iterative preFerence Training)** 를 제안합니다. 이 방법론은 실제 사용자 피드백에서 추출된 **DSAT 신호** 를 고품질의 **부정적인 응답(rejected response)** 으로 사용하고, 현재 발전 중인 정책에서 **긍정적인 응답(chosen response)** 을 동적으로 샘플링하여 **DPO(Direct Preference Optimization) 손실** 을 통해 모델을 반복적으로 학습시킵니다. 이 접근 방식은 **WildFeedback** 과 같은 실제 사용자 피드백 데이터셋에 기반하여, 기존 **SPIN** 이나 **Iterative DPO** 의 한계점인 그래디언트 붕괴(gradient collapse)를 방지하며 선호 마진을 유지합니다.

## 주요 결과
**DRIFT** 는 **WildBench Task Score** 에서 기준 모델 대비 **7B 모델은 최대 +6.23%** , **14B 모델은 최대 +7.61%** 의 성능 향상을 달성했습니다. **AlpacaEval2 Win Rate** 에서는 **7B 모델은 최대 +8.95%** , **14B 모델은 최대 +12.29%** 의 개선을 보이며, **Iterative DPO** 및 **SPIN** 과 같은 강력한 베이스라인을 능가했습니다. 특히 **14B DRIFT 모델** 은 **GPT-4o-mini** 의 성능을 **WildBench** 에서 앞섰으며, 탐색 능력 분석 결과 더 넓고 다양한 고보상 솔루션 공간을 탐색하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **DRIFT** 를 통해 비용이 많이 드는 수동 주석 없이도 실제 사용자 불만족 데이터를 활용하여 LLM의 정렬(alignment)을 효과적으로 개선할 수 있습니다. 이는 실제 서비스 환경에서의 모델 배포 및 지속적인 개선에 큰 이점을 제공합니다. 동적 샘플링과 반복 학습 설계는 모델이 협소한 해법에 수렴하지 않고 다양한 고품질 응답을 탐색하도록 도와, 모델의 일반화 및 견고성을 향상시키는 실용적인 방안이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.